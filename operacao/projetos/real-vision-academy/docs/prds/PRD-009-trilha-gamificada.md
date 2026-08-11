---
id: PRD-009-trilha-gamificada
title: PRD-009 — Trilha Gamificada do Curso + Tela por Aula
type: prd
status: aprovado
project: real-vision-academy
phase: fase-9
owner: master-visionair
created: 2026-08-10
updated: 2026-08-11
progress: "Blocos 1-4 completos. Publicado em main (599836a, 805103d), testado com conta real de aluno e APROVADO pelo Felipe em aparelho real em 11/08/2026. Próximo: Blocos 5-7 do [[PRD-008-leitor-narrado-design]]. Ver [[TIMELINE]] 2026-08-11."
depends_on:
  - PRD-008-leitor-narrado-design
related:
  - DECISIONS
  - KNOWN_ISSUES
  - ROADMAP
  - TIMELINE
  - CONTEXT
---

# PRD-009 — Trilha Gamificada do Curso + Tela por Aula

> **Navegação:** [[PRD-008-leitor-narrado-design]] (o leitor, que esta trilha passa a alimentar) ·
> [[DECISIONS]] (D-040 a D-043) · [[ROADMAP]] · [[CONTEXT]] · [[TIMELINE]]

## Por que este documento existe

Em 10/08/2026 o Felipe testou a Academy no celular pela primeira vez. Além dos defeitos do leitor
(corrigidos nas Fases A e A-2 do [[PRD-008-leitor-narrado-design]]), ele apontou um problema que **não é
de acabamento, é de arquitetura de navegação**:

- O sumário do curso (`CourseSyllabus`) vive na coluna lateral de um grid de 3 colunas. No celular esse
  grid empilha, e o sumário **cai depois do conteúdo todo** — o aluno quase não chega nele.
- Os materiais da aula moram junto com o player, na mesma tela do curso, competindo por espaço.
- Não existe nenhuma sensação de progressão. Com 40 aulas cadastradas, o aluno não tem para onde olhar.

A proposta dele, literal: *"a gente tinha que fazer aquele negócio mesmo de gamificar igual no estilo do
Duolingo, aí a pessoa vai passando pelos módulos"* — uma trilha vertical, de cima para baixo, com o que
já foi concluído aceso e o que não foi mais apagado.

## Objetivo

Trocar a tela do curso por uma **trilha de progressão** e dar a cada aula uma **tela própria**, de modo
que o caminho do aluno seja: trilha → aula → leitor. Materiais e o botão de ouvir passam a viver na tela
da aula.

## Decisões (fechadas com o Felipe em 10/08/2026)

Registradas em [[DECISIONS]]:

| # | Decisão |
|---|---|
| **D-040** | Cada bolinha da trilha é uma **aula**. Os **módulos são acordeões** que agrupam as bolinhas. Cor por estado |
| **D-041** | **Navegação livre.** Aula não concluída fica apagada, nunca travada |
| **D-042** | **Uma tela por aula.** Materiais e botão de ouvir moram nela. O `MaterialsPanel` dentro do leitor continua existindo |

Contexto de por que não foi um nó por módulo: essa era a recomendação inicial, por causa do comprimento
de uma trilha com 40 bolinhas. O Felipe preferiu aula, com o acordeão do módulo resolvendo o comprimento.

## Rotas

Hoje o leitor ocupa `/academy/curso/:slug/aula/:lessonId` (`App.tsx:114`, fora do `AcademyShell` por
D-025). A tela da aula precisa desse endereço, porque é ela que semanticamente **é** a aula.

| Rota | Tela | Dentro do `AcademyShell`? |
|---|---|---|
| `/academy/curso/:slug` | Trilha do curso — substitui a `CoursePage` | sim |
| `/academy/curso/:slug/aula/:lessonId` | Tela da aula: materiais + botão de ouvir | sim |
| `/academy/curso/:slug/aula/:lessonId/ler` | Leitor em tela cheia (o de hoje) | **não** — D-025 |

Três links internos apontam para a rota antiga e precisam ganhar `/ler`: `CoursePage.tsx:122`,
`NarratedLessonPage.tsx:74` e `NarratedLessonPage.tsx:113`.

> Alunos que salvaram o link da aula narrada vão cair na tela da aula em vez do leitor. Aceitável — a tela
> da aula tem o botão de ouvir logo à vista, e ninguém está matriculado além da conta de teste.

## A trilha

Componente novo. **Não precisa de hook novo** — consome o que já existe:

- `useCourse(slug)` → `tree.modules[].lessons[]`. Tipos verbatim em `src/hooks/useCourse.ts:6-32`
- `useProgress(courseId, lessonIds)` → `completedSet`, `done`, `total`, `percent`

Estrutura: módulos como `Accordion` do shadcn — o mesmo padrão já usado em
`src/components/academy/CourseSyllabus.tsx:27` — e dentro de cada módulo as aulas como bolinhas
numeradas num caminho vertical.

Estados visuais (D-040/D-041):

| Estado | Aparência |
|---|---|
| Concluída | âmbar cheio |
| Atual (primeira não concluída) | âmbar com anel |
| Não concluída | opacidade baixa, **clicável** |

**Armadilha conhecida:** `completedSet` é um `Set` **novo a cada render** (`useProgress.ts:57-64`). Se a
trilha memoizar por ele, memoiza errado. Usar `done`/`percent`, ou `completedSet.size`, como dependência.

**A trilha nasce quase toda vazia e isso é esperado.** São 40 aulas cadastradas e só a 0.1 gravada.
`useCourse` lê da view `lessons_gated`, que já trata aula sem conteúdo.

## A tela da aula

Título da aula, o acordeão de materiais (**reuso direto** do que a Fase B do PRD-008 vai construir em
`MaterialsList.tsx`), e o botão que abre o leitor.

`CoursePage` deixa de renderizar `MaterialsList` (hoje em `CoursePage.tsx:161`).

## Fora de escopo

Bloqueio de aula por pré-requisito (D-041 decidiu contra), ofensiva/streak, pontos, medalhas, ranking
entre alunos, e qualquer gamificação além do estado visual de progresso. Nada de redesenho da nav da
Academy — isso é Fase B do [[PRD-008-leitor-narrado-design]].

## Restrições herdadas

- Hook novo nasce com `user.id` no `queryKey` — KI-22/KI-27, sem exceção.
- Escrita no banco **nunca** por MCP ou Management API — KI-29. SQL vai pro SQL Editor, com o Felipe.
- Nenhum bloco fecha sem print de 390px revisado a olho — **D-039**.

## Blocos de execução

| # | Bloco | Depende de | Status |
|---|---|---|---|
| 1 | Rotas: leitor vai pra `/ler`, tela da aula nasce no endereço antigo | — | ✅ publicado (`599836a`) |
| 2 | Tela da aula: título + materiais em acordeão + botão de ouvir | Bloco 1 · Fase B do PRD-008 | ✅ publicado (`805103d`) |
| 3 | A trilha: módulos em acordeão, bolinhas por aula, estados de cor | Bloco 2 | ✅ publicado (`805103d`) |
| 4 | Verificação final e publicação | todos | ✅ **aprovado pelo Felipe em aparelho real, 11/08/2026** |

## Documentos relacionados
- [[PRD-008-leitor-narrado-design]] · [[DECISIONS]] · [[ROADMAP]] · [[CONTEXT]] · [[TIMELINE]]
- [[KNOWN_ISSUES]] · [[ARCHITECTURE]] · [[MASTER_PRD]]
