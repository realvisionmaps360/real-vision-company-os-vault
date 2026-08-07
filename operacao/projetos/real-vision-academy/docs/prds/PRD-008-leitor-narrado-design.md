---
id: PRD-008-leitor-narrado-design
title: PRD-008 — Design Aprovado do Leitor de Aula Narrada
type: prd
status: em execução
project: real-vision-academy
phase: fase-8
owner: master-visionair
created: 2026-08-04
updated: 2026-08-07
progress: "Blocos 0 a 3 concluídos e verificados (32/32, 47/47 e 17/17, desktop e mobile) · Bloco 4 (modo imersivo do celular) é o próximo · detalhe em CONTEXT"
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

| # | Bloco | Depende de |
|---|---|---|
| 0 | Preparo: Playwright, baseline de build, esta documentação | ✅ concluído |
| 1 | Rota em tela cheia + área de leitura + player de rodapé | ✅ verificado 07/08/2026 — 32/32 desktop e mobile |
| 2 | Painéis (lista, configurações, materiais) + pesquisa interna | ✅ verificado 07/08/2026 — 47/47 desktop e mobile |
| 3 | Marcadores por frase | ✅ verificado 07/08/2026 — 17/17 desktop e mobile |
| 4 | Modo imersivo do celular | Bloco 2 · fecha só com aparelho real |
| 5 | Popup de seleção de texto | Blocos 2 e 3 |
| 6 | Media Session + `manifest.json` | Blocos 1-5 |
| 7 | Verificação final e publicação | todos |

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
