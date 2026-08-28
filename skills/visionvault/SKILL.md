---
name: visionvault
description: Skill de engenharia do VisionVault — o painel PWA que lê o Company OS em modo leitura. Use SEMPRE que Felipe disser "VisionVault", "o painel", "painel do Company OS", "o app do vault", ou for mexer no app, no gerador do índice (`tools/painel/`), num arquivo `_PAINEL.md`, ou incluir um projeto novo no painel. Carregar junto com `realvision`. Para o CRM, use `visionflow` — são apps diferentes.
---

# VisionVault — painel do Company OS

App instalável (PWA) que mostra o estado real dos projetos que vivem como markdown no vault.
**É só leitura.** O app nunca escreve no vault.

**No ar:** https://visionvault-gold.vercel.app
**Código:** `operacao/projetos/_RV-Internos/sites/visionvault` (repo git próprio — **está no
`.gitignore` do vault**, então nada de lá vai para o GitHub do Company OS. Documentação sobre o
projeto mora fora, em `operacao/projetos/_RV-Internos/visionvault/`)
**Gerador:** `tools/painel/` na raiz do vault
**Projeto Vercel:** `felipes-projects-26a2b9dd/visionvault`

---

## 1. Como o dado chega na tela

```
_PAINEL.md no vault  →  push em main  →  GitHub Action  →  branch órfão `painel-dist`
                                                              ↓
                              app React  ←  /api/painel/*  ←  GitHub API (token só no servidor)
```

O app **não interpreta o vault**. Toda a inteligência está em dois lugares: no momento em que o
agente escreve o `_PAINEL.md`, e no gerador que valida e resolve links. O app só desenha.

Isso foi decisão consciente: 58% de `operacao/` não tem frontmatter, e onde `status` existe ele
tem ~40 valores de ocorrência única, alguns frases inteiras. Parser heurístico sobre essa prosa
seria frágil e mentiria em silêncio.

---

## 2. O contrato `_PAINEL.md`

Um por projeto, na raiz da pasta dele. **Só o frontmatter é lido** — o corpo é nota para humano.

Vocabulário de `status` e das arestas vem de `LBOS/00-Sistema/CONVENCOES.md` (§4 e §5).
Não inventar valor novo: se faltar, propõe lá primeiro.

Definição normativa executável: `tools/painel/schema.ts` (Zod). Se um `_PAINEL.md` não passa
nele, o arquivo está errado — não o schema.

### Campos comuns

`id` · `tipo: painel` · `painel_versao: 1` · `visualizacao` · `nome` · `resumo` · `area` ·
`prioridade` · `destaque` · `status` · `saude` · `proximo_passo` (+ `_prazo`) · `bloqueio` ·
`alerta` · `atualizado_em` · `atualizado_por` · `metricas[]` · `documentos[]` · `pendencias[]` ·
arestas (`pertence_a`, `depende_de`, `afeta`) · `tags`

Datas **sempre ISO** (`AAAA-MM-DD`), inclusive dentro de `itens[]`. O `DD/MM/AAAA` do corpo do
vault não entra aqui — formatar é trabalho da UI.

`saude` (`ok|atencao|risco`) é separado de `status` de propósito: um projeto pode estar `ativo`
e `risco` ao mesmo tempo. É o campo que dá panorama de verdade.

`documentos[].caminho` é relativo à raiz do vault, com `/`, terminando em `.md`.

### As três visualizações

| `visualizacao` | Desenha | Usar quando |
|---|---|---|
| `pipeline-conteudo` | Kanban com colunas declaradas | Fila de itens que andam por etapas (blog) |
| `campanha-cadencia` | Timeline vertical com data e estado por peça | Sequência disparada no tempo (email) |
| `checklist` | Lista com pendente/feito/bloqueado | Tudo que não couber nos outros |

**Antes de criar uma quarta**, verifique se `checklist` resolve. Molde novo só quando o formato
existente distorce a leitura do projeto — não por gosto.

### Modelos vivos

- `operacao/marketing/email-marketing/_PAINEL.md` — `campanha-cadencia`
- `operacao/projetos/_RV-Internos/documentacao/_PAINEL.md` — `pipeline-conteudo`

---

## 3. Incluir um projeto novo no painel

1. Ler a pasta inteira do projeto — nunca leitura parcial.
2. Escolher a `visualizacao` que menos distorce o que aquele projeto é.
3. Escrever o `_PAINEL.md` com o **estado real**, sem inventar nada. Sem dado, campo omitido.
4. `cd tools/painel && node build.ts --dry-run` — precisa sair 0.
5. Commit e push no main. A Action publica em ~2 min.
6. Conferir no app.

---

## 4. A regra que não se quebra

**Nenhum byte do vault entra no bundle do Vite.** O `dist/` é servido publicamente pela Vercel,
sem autenticação. Todo conteúdo passa por `/api/*`, que valida a sessão antes de responder.

`npm run build` roda `scripts/verificar-vazamento.mjs`: ele pega texto real do índice gerado e
falha o build se qualquer trecho aparecer no `dist/`. Se você precisar contornar essa trava,
quase certamente está prestes a vazar o Company OS.

Corolário: variável de servidor **nunca** leva prefixo `VITE_`. Com o prefixo, o Vite embute.

---

## 5. Autenticação

Supabase do **VisionFlow** (`ghwjetvazmdlaqidgxqi`), não o do site. O projeto do site
(`xomtfkbvathddfpbknyo`) vive em outra conta Google que o Felipe não acessa — não dá para
configurar Redirect URL lá. Ver `reference_supabase_projeto_site_outra_conta` na memória.

Login Google → JWT ES256 → `api/_lib/auth.ts` valida assinatura via JWKS + allowlist de email
(`PAINEL_EMAILS_PERMITIDOS`). Nenhum segredo de assinatura no servidor.

Endereço novo do app exige adicionar em *Redirect URLs* do projeto Supabase. O wildcard
`https://dominio/**` **não casa** com a URL sem barra final — por isso o app manda
`${window.location.origin}/`.

---

## 6. Variáveis de ambiente

| Variável | Onde | Para quê |
|---|---|---|
| `SUPABASE_PROJECT_REF` | servidor | Validar assinatura do JWT |
| `PAINEL_EMAILS_PERMITIDOS` | servidor | Quem pode ler o Company OS |
| `GITHUB_VAULT_TOKEN` | servidor | PAT fine-grained, Contents Read-only, só o repo do vault |
| `VAULT_REPO` · `VAULT_BRANCH` | servidor | Padrões já apontam para o vault |

URL e chave anon do Supabase têm fallback no código (a anon é pública por design).

> **Armadilha conhecida:** gravar variável por pipe no PowerShell insere um BOM invisível no
> valor. Já quebrou a autenticação inteira com um "token inválido" mudo. O código sanitiza
> (`limpar()` em `auth.ts` e `vault.ts`), mas confira com `vercel env ls` depois de gravar.

---

## 7. Armadilhas que já custaram tempo

**Service worker servindo versão antiga.** Sem `skipWaiting` + `clientsClaim`, o app instalado
fica preso na versão velha até fechar todas as abas — o que num celular não acontece. Já está
configurado; ao testar uma correção, limpe o SW antes de concluir que "o deploy não subiu":

```js
const r = await navigator.serviceWorker.getRegistrations();
for (const x of r) await x.unregister();
for (const k of await caches.keys()) await caches.delete(k);
```

**Variável da Vercel vence o fallback do código.** Se o app parece ignorar uma mudança de
configuração, procure uma env var antiga sobrando antes de mexer no código.

**CSS de rota preguiçosa vence o `index.css`.** A folha do React Flow entra com o chunk do Mapa,
carregado sob demanda. Estilizar componente de biblioteca lazy exige especificidade maior.

**`erasableSyntaxOnly` no tsconfig** proíbe parameter properties (`constructor(public x)`).
Declarar o campo e atribuir no corpo.

---

## 8. Anti-mentira — a parte que decide se o painel vale algo

O risco central é o `_PAINEL.md` desatualizar. Um painel que mente com cara de certeza é pior
que painel nenhum. Duas defesas, ambas ativas:

1. Todo card mostra há quanto tempo foi atualizado: normal até 7 dias, âmbar até 21, vermelho depois.
2. O gerador compara `atualizado_em` com o último commit da pasta (excluindo o próprio
   `_PAINEL.md`) e marca `defasado`, que a UI mostra como "a pasta mudou depois deste resumo".

**Ao encerrar qualquer sessão de trabalho num projeto que está no painel, atualizar o
`_PAINEL.md` dele é parte do trabalho** — não item opcional.

---

## 9. Comandos

```bash
# gerar o índice localmente (na raiz do vault)
cd tools/painel && node build.ts

# validar sem escrever
node build.ts --dry-run

# rodar o app (modo local: sem login, lê o painel/ do disco)
cd operacao/projetos/_RV-Internos/sites/visionvault && npm run dev

# build com a trava de vazamento
npm run build

# publicar
vercel deploy --prod --yes
```

`PAINEL_VAULT=<caminho>` aponta o gerador para um vault de mentira, para testar sem sujar o real.

## Relacionados

- Skills: `realvision` · `visionflow` · `lbos`
- Nó LBOS: `LBOS/02-Projetos/visionvault/PROJETO.md` (`PRJ-2026-007`)
- Timeline: `operacao/projetos/_RV-Internos/visionvault/TIMELINE.md`
