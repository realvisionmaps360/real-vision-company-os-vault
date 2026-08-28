/**
 * Contrato do `_PAINEL.md` — definicao normativa.
 *
 * Este arquivo e a fonte unica do que o VisionVault entende. O gerador valida contra ele
 * e o app consome os tipos derivados. Se um `_PAINEL.md` nao passa aqui, ele esta errado.
 *
 * Vocabulario de `status` e das arestas vem de LBOS/00-Sistema/CONVENCOES.md (secoes 4 e 5).
 * Nao inventar valor novo sem atualizar aquele documento primeiro.
 */
import { z } from "zod";

/** Datas sempre ISO. O `DD/MM/AAAA` do corpo do vault nao entra no frontmatter. */
const dataISO = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "data precisa ser AAAA-MM-DD")
  .nullable()
  .optional();

/** CONVENCOES.md secao 4 — vocabulario fechado. */
export const Status = z.enum([
  "ideia",
  "planejado",
  "ativo",
  "bloqueado",
  "pausado",
  "concluido",
  "arquivado",
  "cancelado",
]);

/**
 * Leitura editorial do agente, separada de `status` de proposito: um projeto pode estar
 * `ativo` e `risco` ao mesmo tempo. E o que da "panorama" de verdade.
 */
export const Saude = z.enum(["ok", "atencao", "risco"]);

export const Area = z.enum([
  "marketing",
  "comercial",
  "clientes",
  "produto",
  "gestao",
  "pessoal",
]);

/** Caminho relativo a raiz do vault, sempre com `/`. Nunca caminho do Windows. */
const caminhoDoVault = z
  .string()
  .min(1)
  .refine((c) => !c.includes("\\"), "use / e nao \\ no caminho")
  .refine((c) => c.endsWith(".md"), "so documentos .md sao servidos")
  .refine((c) => !c.startsWith("/") && !c.includes(".."), "caminho precisa ser relativo e sem ..");

/**
 * Texto do botao "?" daquele item exato. Existe porque a explicacao geral do projeto nao
 * resolve a duvida pontual ("o que conta como falha no envio?") — e essa duvida some se
 * a resposta so mora na cabeca de quem escreveu o arquivo.
 */
const ajuda = z.string().max(300).optional();

/**
 * De onde saiu o numero. Metrica sem procedencia vira folclore: ninguem sabe se "28 contatos"
 * foi contado no banco hoje ou copiado de um .md que envelheceu.
 *
 *   documento -> um .md do vault. O gerador serve esse arquivo, entao o app consegue linkar.
 *   banco     -> tabela/consulta fora do vault. Nao ha destino clicavel dentro do app;
 *                `descricao` diz onde conferir e `url` (se houver) leva ao painel externo.
 *
 * Caso real: "Contatos ativos: 28" vem da tabela `email_contatos` no Supabase do VisionFlow.
 * Os `.md` da pasta sao espelho daquele numero, nao a fonte dele.
 */
export const FonteMetrica = z.discriminatedUnion("tipo", [
  z.object({
    tipo: z.literal("documento"),
    caminho: caminhoDoVault,
  }),
  z.object({
    tipo: z.literal("banco"),
    descricao: z.string().min(1).max(300),
    url: z.string().url().optional(),
  }),
]);

export const Metrica = z.object({
  rotulo: z.string().min(1),
  valor: z.union([z.number(), z.string()]),
  formato: z.enum(["numero", "moeda_brl", "percentual", "texto"]).default("numero"),
  tendencia: z.enum(["subindo", "estavel", "caindo"]).nullable().optional(),
  fonte: FonteMetrica.optional(),
  /** Quando aquele numero foi apurado. Sem isso nao da pra saber se e de hoje ou de maio. */
  apurado_em: dataISO,
  ajuda,
});

export const Documento = z.object({
  titulo: z.string().min(1),
  caminho: caminhoDoVault,
  papel: z.enum(["principal", "referencia", "timeline", "ficha"]).default("referencia"),
  ajuda,
});

export const Pendencia = z.object({
  texto: z.string().min(1),
  prazo: dataISO,
  ajuda,
});

/** Aresta do grafo. Lista de wikilinks: `["[[Alvo]]"]`. */
const aresta = z.array(z.string()).optional();

/** Campos que todo painel carrega, independente da visualizacao. */
const comum = {
  id: z.string().min(1),
  tipo: z.literal("painel"),
  painel_versao: z.literal(1),
  nome: z.string().min(1),
  resumo: z.string().max(200).optional(),

  /*
   * Bloco de compreensao. Nasceu do problema real: as telas do painel so faziam sentido
   * pra quem escreveu o `_PAINEL.md`. `resumo` diz o estado ("Fase 1 em curso"); estes
   * campos dizem o que a coisa E, coisa que o estado pressupoe mas nunca explica.
   */

  /** Obrigatorio. 1-2 frases em portugues leigo: o que a pessoa esta olhando. */
  o_que_e: z.string().min(1).max(400),
  /** O problema que o projeto resolve. */
  para_que_serve: z.string().max(400).optional(),
  /** O operacional em 3-5 passos, cada passo uma frase. */
  como_funciona: z.array(z.string()).max(8).default([]),
  /*
   * `objetivo_final` e opcional DE PROPOSITO. Decisao do Felipe em 28/08/2026: por enquanto
   * fica em aberto em todos os paineis. Quando ausente, a UI mostra "Objetivo final nao
   * declarado" — isso e o comportamento desejado, nao erro de preenchimento. Nao torne
   * obrigatorio sem falar com ele.
   */
  objetivo_final: z.string().max(400).optional(),
  /** Como sabemos que chegou la. So faz sentido junto com `objetivo_final`. */
  objetivo_final_criterio: z.string().max(300).optional(),

  area: Area,
  prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
  destaque: z.boolean().default(false),

  status: Status,
  saude: Saude.default("ok"),
  proximo_passo: z.string().optional(),
  proximo_passo_prazo: dataISO,
  bloqueio: z.string().optional(),
  alerta: z.string().optional(),
  atualizado_em: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "atualizado_em precisa ser AAAA-MM-DD"),
  atualizado_por: z.enum(["claude", "felipe"]).default("claude"),
  proxima_revisao: dataISO,

  metricas: z.array(Metrica).max(4).default([]),
  documentos: z.array(Documento).default([]),
  pendencias: z.array(Pendencia).default([]),

  pertence_a: aresta,
  participa_de: aresta,
  depende_de: aresta,
  afeta: aresta,
  documenta: aresta,
  referencia: aresta,
  tags: z.array(z.string()).default([]),
};

/**
 * Coluna do kanban. Aceita as duas formas no frontmatter e sempre normaliza para objeto,
 * pra UI nunca precisar saber qual delas o autor usou:
 *
 *   colunas: [ideia, rascunho]                          forma curta, dos paineis que ja existem
 *   colunas: [{id: ideia, ajuda: "so um titulo ainda"}]  forma longa, com explicacao por coluna
 *
 * A forma curta continua valida de proposito — trocar por objeto obrigatorio quebraria
 * painel que hoje funciona, sem ganho nenhum pra quem nao tem o que explicar.
 */
export const ColunaPipeline = z
  .union([
    z.string().min(1),
    z.object({
      id: z.string().min(1),
      rotulo: z.string().min(1).optional(),
      ajuda,
    }),
  ])
  .transform((c) => (typeof c === "string" ? { id: c } : c));

/** Kanban. As colunas sao declaradas pelo projeto; a UI so renderiza o que vier. */
export const PipelineConteudo = z.object({
  ...comum,
  visualizacao: z.literal("pipeline-conteudo"),
  colunas: z.array(ColunaPipeline).min(1),
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        titulo: z.string().min(1),
        coluna: z.string().min(1),
        tema: z.string().optional(),
        objetivo: z.string().optional(),
        cta: z.string().optional(),
        idioma: z.string().optional(),
        data_alvo: dataISO,
        data_publicacao: dataISO,
        url: z.string().url().nullable().optional(),
        caminho: z.string().optional(),
        nota: z.string().optional(),
        ajuda,
      })
    )
    .default([]),
  backlog: z.array(z.string()).default([]),
});

/** Timeline vertical de pecas com data e estado. */
export const CampanhaCadencia = z.object({
  ...comum,
  visualizacao: z.literal("campanha-cadencia"),
  canal: z.enum(["email", "whatsapp", "misto"]).default("email"),
  publico: z.string().optional(),
  tamanho_publico: z.number().optional(),
  inicio: dataISO,
  fim_previsto: dataISO,
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        ordem: z.number(),
        titulo: z.string().min(1),
        estado: z.enum(["rascunho", "aprovado", "agendado", "enviado", "cancelado"]),
        data: dataISO,
        gancho: z.string().optional(),
        ativo: z.string().optional(),
        caminho: z.string().optional(),
        metricas: z.record(z.number()).optional(),
        nota: z.string().optional(),
        ajuda,
      })
    )
    .default([]),
});

/** Molde generico, para o que nao couber nos outros. Evita forcar projeto em molde errado. */
export const Checklist = z.object({
  ...comum,
  visualizacao: z.literal("checklist"),
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        titulo: z.string().min(1),
        estado: z.enum(["pendente", "feito", "bloqueado"]),
        data: dataISO,
        nota: z.string().optional(),
        ajuda,
      })
    )
    .default([]),
});

export const Painel = z.discriminatedUnion("visualizacao", [
  PipelineConteudo,
  CampanhaCadencia,
  Checklist,
]);

/** @typedef {z.infer<typeof Painel>} Painel */
