---
id: PRD-008-leitor-narrado-design
title: PRD-008 — Design Aprovado do Leitor de Aula Narrada
type: prd
status: em execução
project: real-vision-academy
phase: fase-8
owner: master-visionair
created: 2026-08-04
updated: 2026-08-11
progress: "Blocos 0 a 4, Fase A/A-2, Fase B e Fase C TODAS no ar e APROVADAS pelo Felipe em aparelho real (10/08) · PRD-009 (trilha) fechado e aprovado em aparelho real (11/08) · Bloco 5 ESPECIFICADO em 11/08, plano em PRD-008-bloco5-plano-execucao + SQL em PRD-008-bloco5-grifos, zero código escrito — próximo passo é o Felipe rodar o SQL · depois Blocos 6 e 7 · detalhe em CONTEXT"
depends_on:
  - PRD-007-curso-narrado-sincronizado
  - PRD-007-arquitetura-leitor-narrado
  - PRD-007-fase5-plano
related:
  - DECISIONS
  - KNOWN_ISSUES
  - ROADMAP
  - TIMELINE
---

# PRD-008 — Design Aprovado do Leitor de Aula Narrada

> **Navegação:** [[PRD-007-curso-narrado-sincronizado]] (produto original) ·
> [[PRD-007-arquitetura-leitor-narrado]] (técnica) · [[PRD-007-fase5-plano]] (a base funcional, concluída) ·
> [[DECISIONS]] (D-025 a D-030) · [[KNOWN_ISSUES]] · [[ROADMAP]] (Fase 8) · [[CONTEXT]]

## Por que este documento existe

A [[PRD-007-fase5-plano|Fase 5 do PRD-007]] entregou a aula narrada **funcionando**: o aluno matriculado
abre a aula 0.1, lê enquanto ouve, a frase destaca, a tela acompanha, a posição é salva e a aula conclui
por escuta real. Está no ar desde 30/07/2026 (commit `de0e0cf`).

O que existe é funcional, **não é o produto final** — um player de 352 linhas grudado no topo da coluna do
meio da página do curso. Em 02/08/2026 chegou o design aprovado
(`TEMP/design_handoff_leitor_narrado`), alta fidelidade, mobile e desktop, já reconciliado com esse código.

**Ele não é uma repintura.** Pede oito capacidades que não existem hoje: player fixo no rodapé com estado
recolhido/expandido, painel de aulas, painel de configurações de leitura (tamanho de letra, 3 temas,
auto-scroll), marcadores coloridos por frase, pesquisa interna à aula, materiais dentro do player, popup
ao selecionar texto e um modo imersivo exclusivo do celular. É trabalho do tamanho da Fase 5 inteira.

## Objetivo

Ter o leitor **100% pronto antes de gravar os módulos restantes**, para que publicar uma aula nova seja só
subir conteúdo — sem reabrir código.

## Decisões

| # | Decisão | Motivo |
|---|---|---|
| **D-025** | Rota própria em tela cheia (`/academy/curso/:slug/aula/:lessonId`), **fora** do `AcademyShell` | O design tem cabeçalho de 60px próprio e player fixo no rodapé da viewport — não convive com a sidebar + grid de 3 colunas do `CoursePage`. Precedente: `/academy/admin` já fica fora da casca |
| **D-026** | Cada frase é um elemento de bloco próprio, não span inline | O protótipo renderiza `<p data-i>` por frase. O destaque do design (`padding 8px 14px`, raio 10px, `box-shadow: inset 3px 0 0`) não funciona em span inline que quebra linha. Os dados reais têm 82 blocos para 97 frases (1,18 por bloco) — a estrutura de parágrafo praticamente não se perde |
| **D-027** | `NarratedSpans.tsx` **não** é reusado pelo leitor novo; fica intocado servindo o blog | O commit `34cd211` mudou o blog **de propósito** para destacar o bloco inteiro. O design da Academy exige o oposto: destaque por frase. Mexer no componente compartilhado regride o blog. `useNarrationAutoScroll` segue reusado 100% |
| **D-028** | Temas claro/sépia escopados na área de leitura — variáveis CSS locais, nunca `:root` | Confirmado pelo Felipe. O site é escuro por identidade ([[DESIGN]]); mexer em `:root` vazaria para todas as telas |
| **D-029** | Lista de aulas navega de verdade entre aulas do curso | Confirmado pelo Felipe. Amplia o escopo do PRD-007 (que era só a 0.1) de propósito: quando a 0.2 for cadastrada, entra na lista funcionando sem tocar em código |
| **D-030** | Media Session + PWA (a antiga Fase 6 do PRD-007) vem **por último**, depois do design | Esse código mora dentro do player. Feito antes, seria refeito durante a reforma |

## Blocos de execução

Um bloco por vez. Cada um fecha com build limpo, verificação no Playwright e aval do Felipe antes do
seguinte começar.

| # | Bloco | Estado |
|---|---|---|
| 0 | Preparo: Playwright, baseline de build, esta documentação | ✅ concluído |
| 1 | Rota em tela cheia + área de leitura + player de rodapé | ✅ no ar · 23/23 |
| 2 | Painéis (lista, configurações, materiais) + pesquisa interna | ✅ no ar · 47/47 |
| 3 | Marcadores por frase | ✅ no ar · 17/17 |
| 4 | Modo imersivo do celular | ✅ no ar · 27/27 mobile, 8/8 desktop · **aprovado pelo Felipe em aparelho real, 10/08/2026** |
| A | Correções do 1º teste em aparelho | ✅ no ar (`ea28825`) |
| A-2 | Gesto virou interruptor + pilha do rodapé | ✅ no ar (`19a886d`) · aprovado |
| B | Materiais em acordeão · cartão da aula narrada · nav sem rolagem horizontal | ✅ no ar (`c2198b5`) · aprovado |
| C | Nav com Cursos/Materiais · duplo clique na aula · cartão redesenhado · materiais do player em acordeão · painel sem navegar-por-frase + volume arrastável + popup de cor · frase não esconde atrás do menu · título em letreiro | ✅ no ar (`f4dca32`) · **aprovado pelo Felipe em aparelho real, 10/08/2026** |
| 5 | Popup de seleção de texto | **em execução** — SQL rodado, passos 5.1-5.3 concluídos e verificados (plano em [[PRD-008-bloco5-plano-execucao]]). Falta 5.4 a 5.8 |
| 6 | Media Session + `manifest.json` | Blocos 1-5 |
| 7 | Verificação final e publicação | todos |

> **Atenção ao ler os blocos 1-4 acima.** Entre 07 e 10/08/2026 eles estiveram marcados como
> "verificados" quando o que existia era Playwright verde **no localhost**, com o ramo
> `feat/leitor-narrado-design` nunca juntado ao `main`. O Felipe testou no celular e avaliou o player
> velho da Fase 5. Ver **D-039** — o critério de "verificado" mudou por causa disso.

## Fases de correção pós-teste em aparelho (10/08/2026)

O primeiro teste real do Felipe gerou duas rodadas de correção. As duas estão **no ar e aprovadas**.

### Fase A — `ea28825`

- Gesto: toque na frase ativa escondia o chrome, duplo toque trazia de volta (o antigo mapa).
- Morreram o timer de ocioso de 10s e o esconder-por-rolagem — **D-035**.
- Painel expandido passou a fechar por toque fora; antes o aluno ficava preso nele.
- Destaque da frase ativa saiu do âmbar diluído (`rgba(245,166,35,0.07)`, lia como marrom sujo) pra
  dourado. **Duas tentativas:** `rgba(229,192,123,0.16)` também foi reprovada no print por ler como bege
  acinzentado — `AMBER_LIGHT` é dourado *dessaturado*. O valor final `rgba(247,201,72,0.16)` sobe o croma
  em vez da opacidade.
- `box-decoration-break: clone` consertou o canto cortado do destaque quando a frase quebra linha.

### Fase A-2 — `19a886d`

Reescreve o gesto da Fase A: **D-033**, **D-034**, **D-036**, **D-037**, **D-038**. A Fase A estava
implementada corretamente; a especificação é que estava errada.

## Estado do gesto e do rodapé (o que vale hoje)

| Gesto | Efeito |
|---|---|
| Toque simples em qualquer pixel | Alterna cabeçalho **e** barra juntos. Não mexe no áudio |
| Duplo toque numa frase | Pula pro trecho e **começa a tocar** |
| Rolar / ficar parado | **Nada acontece** — regressão guardada em teste |

| Camada do rodapé | Conteúdo | Quando |
|---|---|---|
| 1 | Barrinha de progresso + nome da aula + % | Sempre na tela |
| 2 | Barra de controles `−15 −5 [play] +5 +15` | Monta sobre a 1, no toque |
| 3 | Painel expandido (frases, velocidade, volume, materiais, marcar) | Monta sobre a 2 |

Geometria derivada de `STRIP_H`, exportado por `ImmersiveStrip.tsx`. Barra de progresso única no mobile.

## Fase B — publicada e testada em aparelho real, 10/08/2026

Três frentes, todas apontadas pelo Felipe no teste de 10/08/2026. **Status: publicada no `main`
(`c2198b5`) e testada por ele no celular — foi esse teste que gerou a rodada de feedback da Fase C, logo
abaixo.** Decisões de implementação em [[DECISIONS]] D-044 e D-045.

### B1 — Materiais em acordeão (**D-043**)

`src/components/academy/MaterialsList.tsx` é hoje uma lista chapada (`space-y-3`), **sem estado de
aberto/fechado**:

- `type === "md_prompt"` (linhas 57-76) renderiza o `<pre>` inteiro **sempre**, com `max-h-64` e rolagem
  interna como única contenção. É o que ocupa meia tela e empurra o resto pra baixo.
- Todos os outros tipos (linhas 78-90) são um `<button>` que chama `openFile` **direto no clique** — sem
  passo intermediário.

Reescrever sobre o **`Accordion` do shadcn**, que já existe no projeto e já é usado em
`CourseSyllabus.tsx:27`. Mesmo padrão, `type="multiple"`, mas **sem `defaultValue`** — todos nascem
fechados. Dentro de cada item aberto:

| Tipo | Conteúdo revelado |
|---|---|
| `md_prompt` | o `<pre>` + botão de copiar — reusar `copyPrompt` (linhas 27-31) |
| `pdf` · `download` | botão que chama `openFile` (linhas 33-51) |
| `link` | botão que abre em nova aba |

`openFile` **não muda** — inclui a URL assinada de 1h do bucket privado `course-materials`. Só deixa de
ser disparado pelo clique no card.

Rótulos existentes em `TYPE_LABEL` (linhas 8-13): `md_prompt` → "Prompt", `pdf` → "PDF", `link` → "Link",
`download` → "Download". `type` é `string` solta, então valor desconhecido cai no ramo de arquivo com o
tipo cru como rótulo — manter esse comportamento.

*Nota: materiais **não têm** `sort_order` no schema, e `useCourse` não os ordena (linhas 84-89). A ordem
é a que o banco devolver. Não corrigir nesta fase; registrar se incomodar.*

**Feito:** `MaterialsList.tsx` reescrito sobre `Accordion`, `type="multiple"`, sem `defaultValue`. Verificado
12/12 mobile e 12/12 desktop em `tests/verify-blocoB1.mjs`, sem regressão no bloco 1 (23/23).

### B2 — Cartão da aula narrada e ordem no celular

`NarratedLessonCard` (`CoursePage.tsx:20-38`) é um `aspect-video` com ícone de 48px centralizado — no
celular fica desproporcional, e foi a primeira coisa que o Felipe estranhou. Redesenhar seguindo
[[DESIGN]].

O grid de `CoursePage.tsx:115` (`grid items-start gap-6 lg:grid-cols-3`) empilha no celular e joga o
`CourseSyllabus` (linha 170) depois do conteúdo inteiro. Corrigir a ordem no mobile.

> **Escopo contido de propósito:** o [[PRD-009-trilha-gamificada]] substitui esta tela pela trilha. Aqui
> se faz o mínimo pra ela não ficar quebrada no intervalo — não vale redesenho profundo do que vai ser
> trocado.

**Feito (D-044):** `NarratedLessonCard` perdeu o `aspect-video` fixo, virou altura natural com padding.
Grid da `CoursePage` ganhou `order-1`/`order-2` — sumário passa a vir ANTES do bloco de conteúdo no celular
(não depois, como pedido originalmente cogitava — ver justificativa em D-044 sobre por que a divisão em
3 blocos foi descartada). Desktop sem mudança visual. Verificado 9/9 mobile e 8/8 desktop em
`tests/verify-blocoB2.mjs`, sem regressão no bloco 1 (23/23).

### B3 — Nav da Academy

`src/components/academy/AcademyShell.tsx:78` — `<nav className="flex gap-1.5 overflow-x-auto pb-1">` com
**cinco** chips `shrink-0` (Início, Aprender, Comunidade, Prompts, Conta). Não cabem em 390px, daí a
rolagem horizontal que o Felipe chamou de horrível. Também corrigir o container vazando à direita.

Redesenhar contra [[DESIGN]] — grade que quebra linha, ou barra inferior fixa estilo app. **Cuidado:** se
virar barra inferior fixa, ela entra no mesmo território da pilha de rodapé do leitor; o leitor fica fora
do `AcademyShell` (D-025), então não colidem, mas vale conferir.

**Feito (D-045):** grade escolhida em vez de barra fixa (justificativa em D-045). `nav` virou
`grid grid-cols-3 gap-1.5` — os 5 chips quebram em duas linhas (3 + 2), sem `overflow-x-auto`. Verificado
16/16 mobile e 4/4 desktop em `tests/verify-blocoB3.mjs`, sem regressão no bloco 1 (23/23).

## Fase C — feedback do Felipe depois de testar a Fase B em aparelho real (10/08/2026)

**Status: publicada no `main` (`f4dca32`) e APROVADA pelo Felipe em aparelho real, na mesma sessão do
pedido — "tudo está perfeito, deu tudo certo".** Decisões em [[DECISIONS]] D-046 a D-050.

| Item | O quê | Decisão |
|---|---|---|
| Nav | +"Cursos" · "Prompts"→"Materiais" · "Aprender" desabilitado até a trilha existir | — |
| Sumário | Duplo clique numa aula narrada abre ela direto (aula em vídeo só seleciona, como já era) | — |
| Cartão | `NarratedLessonCard` com glow radial, anéis atrás do ícone, duração do áudio | — |
| Materiais do player | `MaterialsPanel` (dentro da aula) vira acordeão — mesmo padrão do B1, sem abas | — |
| Painel expandido | Linha "Navegar por frase" removida | **D-046**, desfaz D-041 |
| Painel expandido | Volume ganha arraste, além dos botões | **D-047** |
| Painel expandido | "Marcar frase" abre popup de 4 cores em vez de marcar direto | **D-048** |
| Auto-scroll | Frase ativa centraliza no espaço livre acima do painel expandido, não na tela inteira | **D-049** |
| Título | Letreiro: parado 5s → desliza → parado 5s → repete, no cabeçalho e no rodapé fixo | **D-050** |

**Verificado:** build limpo. Testes novos por item — `tests/verify-blocoC2.mjs` (3/3),
`verify-blocoC4.mjs` (3/3), `verify-blocoC5.mjs` (4/4), `verify-blocoC6.mjs` (2/2),
`verify-blocoC7.mjs` (5/5). Sem regressão: bloco1 24/24, bloco2 47/47, bloco3 17/17 (desktop e mobile),
bloco4 27/27 mobile + 8/8 desktop, B1/B2/B3 12/12 + 9/9 + 18/18. Print de cada item revisado a olho
(D-039), **e aprovado no aparelho real do Felipe** — o critério que realmente fecha um bloco.

## Restrições herdadas (valem em todos os blocos)

- Hook novo nasce com `user.id` no `queryKey` — KI-22/KI-27, sem exceção.
- Nenhuma linha do texto da aula muda — KI-23, o mapa de sincronização quebra.
- Escrita no banco **nunca** por MCP ou Management API — KI-29. SQL vai pro SQL Editor, com o Felipe.
- O `**negrito**` invisível na renderização narrada é esperado — KI-33, não é bug de CSS desta reforma.

## Fora de escopo

TTS ou voz artificial, troca de voz/idioma, tradução, dicionário, upload de documento, leitor genérico de
PDF, sincronização palavra a palavra, gamificação além de progresso e conclusão por escuta real.

## Pré-requisito para gravar os módulos (fora do código)

O leitor pronto não basta. Cada aula gravada passa pelo pipeline da Fase 2 do PRD-007, que usa **ffmpeg**,
**Python 3** e **Docker** (Aeneas) — nenhum dos três existe na máquina atual do Felipe (verificado em
04/08/2026). Os scripts do pipeline **sobreviveram à troca de máquina** — `clean_text.py` e
`build_final.py` estão em `TEMP/modulo/output/` (verificado em 04/08/2026) — mas seguem fora de
`scripts/` do repositório do site, como a própria Fase 2 registrou como pendência. Portá-los é trabalho
pequeno e precisa acontecer antes da aula 0.2.

## Documentos relacionados
- [[PRD-007-curso-narrado-sincronizado]] · [[PRD-007-arquitetura-leitor-narrado]] · [[PRD-007-fase5-plano]]
- [[DECISIONS]] · [[KNOWN_ISSUES]] · [[ROADMAP]] · [[CONTEXT]] · [[TIMELINE]]
