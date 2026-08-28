/**
 * Gerador do indice do VisionVault.
 *
 * Le todos os `_PAINEL.md` do vault, valida contra o schema, resolve os wikilinks dos
 * documentos referenciados e emite JSON estatico em `painel/`.
 *
 *   node build.ts             emite os arquivos
 *   node build.ts --dry-run   valida e reporta, sem escrever nada
 *
 * Principio: e tolerante por arquivo. Um `_PAINEL.md` malformado nao pode derrubar os outros —
 * ele entra no indice com `erro_schema` e o processo sai com codigo 1 para avisar o CI, mas o
 * indice ainda e publicado com os projetos validos.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import fg from "fast-glob";
import matter from "gray-matter";

import { Painel } from "./schema.ts";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
/** `PAINEL_VAULT` existe para testar o gerador contra um vault de mentira, sem sujar o real. */
const VAULT = process.env.PAINEL_VAULT
  ? path.resolve(process.env.PAINEL_VAULT)
  : path.resolve(AQUI, "..", "..");
const SAIDA = path.join(VAULT, "painel");
const DRY_RUN = process.argv.includes("--dry-run");

/** Pastas que nunca entram: instrucao de agente, temporarios, repos de codigo. */
const IGNORAR = [
  "**/node_modules/**",
  "**/.git/**",
  "**/.claude/**",
  "**/.agents/**",
  "**/.obsidian/**",
  "**/skills/**",
  "**/TEMP/**",
  "**/loja-imagens/**",
  "**/tools/**",
];

const hashCaminho = (c: string) => createHash("sha1").update(c).digest("hex").slice(0, 16);

/**
 * O parser de YAML transforma `2026-08-27` em `Date`. O contrato do painel trabalha com
 * string ISO em todo lugar, entao normaliza antes de validar — recursivamente, para pegar
 * tambem as datas dentro de `itens[]` e `pendencias[]`.
 */
function normalizarDatas(valor: unknown): unknown {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10);
  if (Array.isArray(valor)) return valor.map(normalizarDatas);
  if (valor && typeof valor === "object") {
    return Object.fromEntries(
      Object.entries(valor as Record<string, unknown>).map(([k, v]) => [k, normalizarDatas(v)])
    );
  }
  return valor;
}

/** Normaliza para o formato do vault: relativo, com barra normal. */
const paraVault = (abs: string) => path.relative(VAULT, abs).split(path.sep).join("/");

/**
 * Data do ultimo commit que tocou a pasta. E o que permite detectar painel defasado:
 * se a pasta mudou depois do `atualizado_em` declarado, o resumo provavelmente mente.
 */
function ultimoCommitDaPasta(pastaRelativa: string): string | null {
  try {
    const saida = execFileSync(
      "git",
      [
        "log",
        "-1",
        "--format=%cI",
        "--",
        pastaRelativa,
        // O proprio painel nao conta como "a pasta mudou". Sem esta exclusao, o commit
        // que atualiza o resumo marca o resumo como defasado — o alerta dispararia
        // justamente quando o dado acabou de ser posto em dia, e viraria ruido ignorado.
        `:(exclude)${pastaRelativa}/_PAINEL.md`,
      ],
      { cwd: VAULT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    return saida ? saida.slice(0, 10) : null;
  } catch {
    return null; // sem git, sem cross-check. Nao e motivo pra falhar o build.
  }
}

/** Indice nomeDoArquivo -> caminhos[], para resolver wikilinks como o Obsidian faz. */
async function construirIndiceDeNomes() {
  const todos = await fg("**/*.md", { cwd: VAULT, ignore: IGNORAR, dot: false });
  const porNome = new Map<string, string[]>();
  for (const caminho of todos) {
    const nome = path.basename(caminho, ".md").toLowerCase();
    const lista = porNome.get(nome) ?? [];
    lista.push(caminho);
    porNome.set(nome, lista);
  }
  return { todos, porNome };
}

/**
 * Resolve um alvo de wikilink pela regra do Obsidian: caminho exato vence, senao nome unico
 * vence, senao o mais proximo na arvore de pastas em relacao ao documento de origem.
 */
function resolverAlvo(
  alvo: string,
  origem: string,
  indice: { todos: string[]; porNome: Map<string, string[]> }
): string | null {
  const limpo = alvo.split("#")[0].trim().replace(/\\/g, "/");
  if (!limpo) return null;

  const comExtensao = limpo.endsWith(".md") ? limpo : `${limpo}.md`;
  if (indice.todos.includes(comExtensao)) return comExtensao;

  const candidatos = indice.porNome.get(path.basename(limpo, ".md").toLowerCase()) ?? [];
  if (candidatos.length === 0) return null;
  if (candidatos.length === 1) return candidatos[0];

  // Desempate: quantos segmentos de pasta o candidato compartilha com a origem.
  const segmentosOrigem = path.dirname(origem).split("/");
  let melhor = candidatos[0];
  let melhorPontos = -1;
  for (const candidato of candidatos) {
    const segmentos = path.dirname(candidato).split("/");
    let pontos = 0;
    while (pontos < segmentos.length && segmentos[pontos] === segmentosOrigem[pontos]) pontos++;
    if (pontos > melhorPontos) {
      melhorPontos = pontos;
      melhor = candidato;
    }
  }
  return melhor;
}

/**
 * Reescreve `[[Alvo]]` e `[[Alvo|texto]]` em links markdown resolvidos.
 * O app nao precisa saber nada sobre wikilink — chega pronto.
 *
 *   servido    -> /doc/<hash>          navegavel
 *   fora       -> #fora                existe no vault, mas nao e publicado no painel
 *   quebrado   -> #quebrado            nao existe
 */
function resolverWikilinks(
  markdown: string,
  origem: string,
  indice: { todos: string[]; porNome: Map<string, string[]> },
  servidos: Set<string>
) {
  const encontrados: string[] = [];
  const texto = markdown.replace(/\[\[([^\]]+)\]\]/g, (_todo, dentro: string) => {
    const [alvoBruto, rotulo] = dentro.split("|");
    const alvo = resolverAlvo(alvoBruto, origem, indice);
    const label = (rotulo ?? alvoBruto).trim();

    if (!alvo) return `[${label}](#quebrado)`;
    encontrados.push(alvo);
    if (!servidos.has(alvo)) return `[${label}](#fora)`;
    return `[${label}](/doc/${hashCaminho(alvo)})`;
  });
  return { texto, encontrados };
}

async function main() {
  const indice = await construirIndiceDeNomes();
  const arquivos = await fg("**/_PAINEL.md", { cwd: VAULT, ignore: IGNORAR });

  if (arquivos.length === 0) {
    console.error("Nenhum _PAINEL.md encontrado. Nada a gerar.");
    process.exit(1);
  }

  const projetos: any[] = [];
  const erros: string[] = [];

  for (const arquivo of arquivos.sort()) {
    const bruto = await fs.readFile(path.join(VAULT, arquivo), "utf8");
    const data = normalizarDatas(matter(bruto).data) as Record<string, unknown>;
    const pasta = path.dirname(arquivo);

    const resultado = Painel.safeParse(data);

    if (!resultado.success) {
      const detalhe = resultado.error.issues
        .map((i) => `  ${i.path.join(".") || "(raiz)"}: ${i.message}`)
        .join("\n");
      erros.push(`${arquivo}\n${detalhe}`);
      projetos.push({
        id: (data as any)?.id ?? arquivo,
        nome: (data as any)?.nome ?? path.basename(pasta),
        pasta,
        erro_schema: detalhe,
      });
      continue;
    }

    const painel = resultado.data;
    const commitDaPasta = ultimoCommitDaPasta(pasta);
    // O caso perigoso: a pasta mudou depois do resumo. O resumo provavelmente mente.
    const defasado = Boolean(commitDaPasta && commitDaPasta > painel.atualizado_em);

    projetos.push({
      ...painel,
      pasta,
      arquivo,
      commit_da_pasta: commitDaPasta,
      defasado,
    });
  }

  // Documentos servidos: os listados + os apontados pelos itens. Whitelist estrita.
  const servidos = new Set<string>();
  for (const p of projetos) {
    for (const d of p.documentos ?? []) servidos.add(d.caminho);
    for (const i of p.itens ?? []) if (i.caminho) servidos.add(i.caminho);
    // Fonte de metrica do tipo `documento` entra na whitelist pelo mesmo caminho dos
    // `documentos[]`: uma vez servido, ele ganha hash e aparece na arvore, e o app
    // resolve o link igual ja faz com os documentos listados.
    // Fonte `banco` nao resolve nada — nao existe destino clicavel dentro do app.
    for (const m of p.metricas ?? []) {
      if (m.fonte?.tipo === "documento") servidos.add(m.fonte.caminho);
    }
  }

  // Um nivel de vizinhos: evita beco sem saida na navegacao sem explodir o tamanho.
  // Documento explicitamente listado entra sempre; vizinho puxado por wikilink so entra
  // se for de tamanho razoavel — em `referencias/` moram livros inteiros de 400 KB, que
  // ninguem vai ler no celular e que sozinhos multiplicariam o peso do painel.
  const LIMITE_VIZINHO = 120 * 1024;
  const sementes = [...servidos];
  const grandesIgnorados: string[] = [];

  for (const caminho of sementes) {
    try {
      const bruto = await fs.readFile(path.join(VAULT, caminho), "utf8");
      const { encontrados } = resolverWikilinks(bruto, caminho, indice, servidos);
      for (const alvo of encontrados) {
        if (servidos.has(alvo)) continue;
        const info = await fs.stat(path.join(VAULT, alvo)).catch(() => null);
        if (info && info.size > LIMITE_VIZINHO) {
          grandesIgnorados.push(`${alvo} (${Math.round(info.size / 1024)}kb)`);
          continue;
        }
        servidos.add(alvo);
      }
    } catch {
      // documento listado que nao existe — reportado abaixo
    }
  }

  const documentos: any[] = [];
  const ausentes: string[] = [];

  for (const caminho of [...servidos].sort()) {
    let bruto: string;
    try {
      bruto = await fs.readFile(path.join(VAULT, caminho), "utf8");
    } catch {
      ausentes.push(caminho);
      continue;
    }
    const { content, data } = matter(bruto);
    const { texto } = resolverWikilinks(content, caminho, indice, servidos);
    documentos.push({
      hash: hashCaminho(caminho),
      caminho,
      titulo: (data as any)?.title ?? (data as any)?.nome ?? path.basename(caminho, ".md"),
      frontmatter: data ?? {},
      markdown: texto,
      bytes: Buffer.byteLength(texto, "utf8"),
    });
  }

  // Arvore de pastas dos documentos servidos, para a aba Arquivos.
  const arvore = documentos.map((d) => ({
    hash: d.hash,
    caminho: d.caminho,
    titulo: d.titulo,
    bytes: d.bytes,
  }));

  const indexJson = {
    gerado_em: new Date().toISOString(),
    painel_versao: 1,
    projetos: projetos.map(({ ...p }) => p),
    arvore,
    avisos: {
      documentos_ausentes: ausentes,
      paineis_com_erro: projetos.filter((p) => p.erro_schema).map((p) => p.id),
    },
  };

  console.log(`Paineis lidos:      ${arquivos.length}`);
  console.log(`Projetos validos:   ${projetos.filter((p) => !p.erro_schema).length}`);
  console.log(`Documentos servidos:${documentos.length}`);
  console.log(`Defasados:          ${projetos.filter((p) => p.defasado).length}`);
  if (ausentes.length) console.log(`Documentos ausentes:\n  ${ausentes.join("\n  ")}`);
  if (grandesIgnorados.length) {
    console.log(`Vizinhos grandes ignorados:\n  ${grandesIgnorados.join("\n  ")}`);
  }

  if (erros.length) {
    console.error("\nErros de schema:\n" + erros.join("\n\n"));
  }

  if (DRY_RUN) {
    console.log("\n--dry-run: nada foi escrito.");
    process.exit(erros.length ? 1 : 0);
  }

  await fs.rm(SAIDA, { recursive: true, force: true });
  await fs.mkdir(path.join(SAIDA, "docs"), { recursive: true });
  await fs.writeFile(path.join(SAIDA, "index.json"), JSON.stringify(indexJson));
  for (const doc of documentos) {
    await fs.writeFile(path.join(SAIDA, "docs", `${doc.hash}.json`), JSON.stringify(doc));
  }
  await fs.writeFile(
    path.join(SAIDA, "manifest.json"),
    JSON.stringify({
      gerado_em: indexJson.gerado_em,
      painel_versao: 1,
      documentos: documentos.length,
      projetos: projetos.length,
    })
  );

  console.log(`\nEscrito em ${paraVault(SAIDA)}/`);
  process.exit(erros.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
