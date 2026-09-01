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

**Camadas do `src/`** (desde 01/09/2026, quando o Supabase virou segunda fonte de dados):
`vault/` lê o Company OS via `/api` · `dados/` lê o Supabase direto, com a sessão do usuário ·
`lib/` são utilidades puras · `components/`, `pages/`, `contexts/` como antes. Fonte nova de
dados entra em `dados/`, não espalhada nas telas.
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

`id` · `tipo: painel` · `painel_versao: 1` · `visualizacao` · `nome` · `resumo` · `o_que_e` ·
`para_que_serve` · `como_funciona` · `objetivo_final` (+ `_criterio`) · `area` · `prioridade` ·
`destaque` · `status` · `saude` · `proximo_passo` (+ `_prazo`) · `bloqueio` · `alerta` ·
`atualizado_em` · `atualizado_por` · `metricas[]` · `documentos[]` · `pendencias[]` ·
arestas (`pertence_a`, `depende_de`, `afeta`) · `tags`

Datas **sempre ISO** (`AAAA-MM-DD`), inclusive dentro de `itens[]`. O `DD/MM/AAAA` do corpo do
vault não entra aqui — formatar é trabalho da UI.

`saude` (`ok|atencao|risco`) é separado de `status` de propósito: um projeto pode estar `ativo`
e `risco` ao mesmo tempo. É o campo que dá panorama de verdade.

`documentos[].caminho` é relativo à raiz do vault, com `/`, terminando em `.md`.

### O bloco de compreensão (obrigatório desde 28/08/2026)

Nasceu de um problema real: Felipe abriu o painel do blog e não entendeu a própria tela. O
`resumo` diz o **estado** ("Ciclo 1, Fase 1 em curso"); ele pressupõe que o leitor já sabe o que
a coisa é. Esses campos dizem o que a coisa **é**:

| Campo | Obrigatório | O que escrever |
|---|---|---|
| `o_que_e` | **sim** | 1-2 frases em português leigo. O que a pessoa está olhando. |
| `para_que_serve` | não | O problema que o projeto resolve. Por que ele existe. |
| `como_funciona` | não | Lista de 3 a 5 passos do operacional, cada passo uma frase. |
| `objetivo_final` (+ `_criterio`) | não | Onde isso termina, e como saberemos que chegou. |

Escreva para quem nunca abriu a pasta do projeto. Sem sigla interna, sem nome de arquivo, sem
jargão técnico. "A fila de posts do blog" e não "backlog do pipeline editorial".

> **`objetivo_final` fica em aberto de propósito.** Decisão do Felipe em 28/08/2026: por
> enquanto, nenhum painel declara objetivo final. Quando o campo está ausente, a UI mostra
> "Objetivo final não declarado" em âmbar. Isso é o comportamento desejado, não esquecimento.
> Não preencha por conta própria e não torne o campo obrigatório sem falar com ele.

### `ajuda` — o "?" de cada item

Campo opcional em `metricas[]`, `pendencias[]`, `documentos[]`, `itens[]` e nas colunas do
kanban. Vira um botão "?" ao lado daquele item exato na tela.

Existe porque a explicação geral do projeto não resolve a dúvida pontual ("o que conta como
falha no envio?"), e essa dúvida some se a resposta só mora na cabeça de quem escreveu o
arquivo. **Toda métrica e toda coluna de kanban devem ter `ajuda`** — são os elementos que mais
condensam significado em pouco texto.

Termos do próprio sistema (`ativo`, `risco`, `defasado`, os moldes de visualização) **não** vão
em `ajuda`: eles já estão definidos uma vez em `src/lib/glossario.ts` no app e a UI busca de lá.
Não repita glossário dentro do `_PAINEL.md`.

### `fonte` e `apurado_em` — de onde vem o número

Métrica sem procedência vira folclore: ninguém sabe se "28 contatos" foi contado no banco hoje
ou copiado de um `.md` que envelheceu. Duas formas:

```yaml
metricas:
  - rotulo: Contatos ativos
    valor: 27
    fonte:
      tipo: banco                                  # fora do vault, não vira link no app
      descricao: "tabela email_contatos no Supabase do VisionFlow, status = ativo"
    apurado_em: 2026-08-28
    ajuda: "27 com status ativo. 3 deles ainda são contatos de teste pendentes de limpeza."
  - rotulo: Fases entregues
    valor: "7 de 8"
    fonte:
      tipo: documento                              # .md do vault, vira link clicável
      caminho: operacao/projetos/_RV-Internos/visionvault/TIMELINE.md
```

`tipo: documento` faz o gerador servir aquele `.md`, e a métrica vira link. `tipo: banco` sem
`conjunto` não tem destino: a `descricao` aparece no "?" e o card mostra "fora do vault".

### `conjunto` — métrica de banco que abre a lista dentro do app

`fonte.banco` aceita `conjunto`, o **nome** de um conjunto de dados que o app sabe abrir:

```yaml
fonte:
  tipo: banco
  descricao: "Tabela email_contatos no Supabase do VisionFlow, contando status = ativo"
  conjunto: email-contatos-ativos
```

O card passa a abrir uma camada por cima da tela com aquela lista. Nada sai do app.

**A regra que não se quebra: o `_PAINEL.md` cita um nome, nunca uma consulta.** Tabela, colunas
e filtro vivem em `src/dados/conjuntos.ts`, num registro fechado. O motivo é de segurança: este
arquivo é texto que qualquer sessão de IA edita, e uma consulta declarada aqui seria o vault
dirigindo o que o app pergunta ao banco. Nome desconhecido não quebra nada — a métrica só não
abre. Para expor um conjunto novo, registra-se ele no app primeiro.

Quem barra leitura indevida é a **RLS do Supabase**, não código nosso — por isso o app consulta
direto do navegador com a sessão que já tem, sem chave de servidor e sem rota nova.

> **Armadilha:** com RLS, negar leitura devolve **lista vazia, não erro**. "Você não tem acesso"
> e "essa lista está vazia mesmo" chegam idênticos. `CamadaDados` separa os casos pelo que dá
> para saber com certeza (se há sessão) e, quando há, diz explicitamente que lista vazia pode
> ser regra de acesso. Não simplifique isso para um "Nenhum registro" seco.

**Caso real que justifica o campo:** o painel do email marketing dizia "Contatos ativos: 28",
número copiado de um snapshot de 22/07. Em 28/08 o banco tinha 27 ativos, porque um contato deu
bounce e o webhook o tirou da lista sozinho. Ninguém tinha como perceber.

### Colunas de kanban com explicação

`colunas` aceita as duas formas. A curta continua válida para quem não tem o que explicar:

```yaml
colunas:
  - ideia                                          # forma curta
  - id: rascunho                                   # forma longa
    rotulo: Rascunho
    ajuda: "Texto sendo escrito. Já passou pela pesquisa de intenção de busca."
```

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
4. Preencher o bloco de compreensão: `o_que_e` (obrigatório), `para_que_serve` e
   `como_funciona`. Depois reler imaginando alguém que nunca ouviu falar do projeto. Se essa
   pessoa não entenderia, reescreva antes de seguir.
5. Preencher `ajuda` em **toda métrica** e em **toda coluna de kanban**. Métrica que vem de
   número apurado leva também `fonte` e `apurado_em`.
6. `cd tools/painel && node build.ts --dry-run` — precisa sair 0.
7. Commit e push no main. A Action publica em ~2 min.
8. Conferir no app.

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

**Rolagem não resetada vira "tela preta".** Sem reset de rolagem na troca de rota, o navegador
prende a página nova no fim quando ela é mais curta que a posição anterior — e o que sobra é
fundo escuro vazio, que parece app travado, não bug de rolagem. Corrigido em
`src/components/IrAoTopo.tsx`; se aparecer tela vazia de novo, medir `window.scrollY` antes de
procurar erro de dados.

**Sem `ErrorBoundary`, todo erro vira tela preta.** Num app dark, árvore derrubada é
indistinguível de "não carregou". `src/components/ErroBoundary.tsx` envolve o `Outlet` com `key`
na rota. Não remover ao refatorar a casca.

**Variável da Vercel vence o fallback do código.** Se o app parece ignorar uma mudança de
configuração, procure uma env var antiga sobrando antes de mexer no código.

**CSS de rota preguiçosa vence o `index.css`.** A folha do React Flow entra com o chunk do Mapa,
carregado sob demanda. Estilizar componente de biblioteca lazy exige especificidade maior.

**`erasableSyntaxOnly` no tsconfig** proíbe parameter properties (`constructor(public x)`).
Declarar o campo e atribuir no corpo.

---

### As três faixas da casca (`Shell.tsx`)

| Largura | Navegação |
|---|---|
| < 768px | Barra fixa embaixo, alcance do polegar, com `env(safe-area-inset-bottom)` |
| 768–1023px | Coluna estreita de ícones — é onde vive o iPad em retrato |
| ≥ 1024px | Coluna larga, rótulo ao lado do ícone |

Só existiam duas faixas até 01/09/2026, e o iPad em retrato caía no layout de celular. Alvo
clicável mínimo de 44px (`.alvo-toque`), contorno no repouso e anel de foco âmbar em tudo que
clica. Ao mexer aqui, conferir 390px, 768px, 1024px e 1280px — não só as pontas.

---

## 8. Anti-mentira — a parte que decide se o painel vale algo

O risco central é o `_PAINEL.md` desatualizar. Um painel que mente com cara de certeza é pior
que painel nenhum. Duas defesas, ambas ativas:

1. Todo card mostra há quanto tempo foi atualizado: normal até 7 dias, âmbar até 21, vermelho depois.
2. O gerador compara `atualizado_em` com o último commit da pasta (excluindo o próprio
   `_PAINEL.md`) e marca `defasado`, que a UI mostra como "a pasta mudou depois deste resumo".

**Ao encerrar qualquer sessão de trabalho num projeto que está no painel, atualizar o
`_PAINEL.md` dele é parte do trabalho** — não item opcional.

Terceira defesa, desde 28/08/2026: métrica com `fonte` e `apurado_em` diz de onde o número veio
e quando foi contado. Sem isso, um número copiado de documento velho passa por dado de hoje. Ao
atualizar um `_PAINEL.md`, reconferir os números que têm `fonte: banco` contra o banco de
verdade, e mover o `apurado_em` junto.

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
