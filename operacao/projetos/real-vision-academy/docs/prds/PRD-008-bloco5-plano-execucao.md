---
id: PRD-008-bloco5-plano-execucao
title: PRD-008 Bloco 5 — Plano de execução do popup de seleção de texto
type: plano-execucao
status: em execução — passos 5.1 a 5.3 concluídos
project: real-vision-academy
phase: fase-8
owner: master-visionair
created: 2026-08-11
updated: 2026-08-11
progress: "SQL rodado e confirmado (4 policies). Passos 5.1 (MarkerColorPopup extraído), 5.2 (readerHighlightSegments + 10/10 vitest) e 5.3 (refactor do ReadingArea/SentenceParagraph, pixel-idêntico) concluídos e verificados — build limpo, Blocos 1/2/3/4 sem regressão real. Sessão pausada de propósito antes do passo 5.4. Ver TIMELINE 2026-08-11 e o bilhete de retomada."
depends_on:
  - PRD-008-leitor-narrado-design
related:
  - DECISIONS
  - KNOWN_ISSUES
  - TIMELINE
  - PRD-009-trilha-gamificada
---

# PRD-008 · Bloco 5 — Plano de execução

> **Navegação:** [[PRD-008-leitor-narrado-design]] (o PRD pai) · [[PRD-008-bloco5-grifos]] (o SQL) ·
> [[DECISIONS]] · [[KNOWN_ISSUES]] · [[TIMELINE]]

> **Escrito no Opus para ser executado no Sonnet.** Tudo que exige decisão já está decidido aqui — a
> execução não precisa redecidir nada. Se durante a execução aparecer uma pergunta que este documento não
> responde, **parar e perguntar ao Felipe** em vez de improvisar.

## Por que este documento existe

O [[PRD-008-leitor-narrado-design]] nomeia o Bloco 5 numa linha só ("Popup de seleção de texto"), sem
especificação. Em 11/08/2026, depois de o Felipe aprovar o [[PRD-009-trilha-gamificada]] em aparelho real,
esta sessão fechou a spec com ele e leu o código a fundo antes de planejar.

**A leitura do código mudou o tamanho do bloco.** O que parecia trabalho de front-end virou mudança de
schema mais um refactor no elemento mais sensível do leitor. E apareceram 5 conflitos de gesto que o PRD
não previa — três deles atingindo gestos que o Felipe já aprovou em aparelho e que estão guardados por
teste de regressão.

## O que o Felipe decidiu (11/08/2026)

1. Ao selecionar um trecho, aparece um popup pequeno com **3 ícones**: copiar · grifar · pular o áudio
   pro trecho.
2. O ícone de grifar abre um **segundo popup com as 4 cores** (reusa `BOOKMARK_COLORS`).
3. O grifo age sobre **o trecho selecionado**, não a frase inteira, e dá pra ter **vários grifos na mesma
   frase**.
4. O botão "Marcar frase" do painel do player (D-048) **continua existindo** e convive com o grifo novo.
   São dois sistemas, tabela nova — sem migração do que já existe.
5. O popup abre **depois de uma pausa curta** (é assim que se resolve o conflito com o duplo toque).
6. **Tocar num trecho já grifado** abre um popup com as 4 cores + lixeira.

## Os 5 conflitos de gesto — o principal achado desta sessão

Nenhum destes aparece no Playwright. Todos estourariam só quando o Felipe testasse no celular. Três
atingem gestos aprovados e guardados por regressão (D-033, D-034, D-035).

| # | O conflito | Solução decidida |
|---|---|---|
| 1 | **O duplo toque já seleciona a palavra** — comportamento nativo do navegador. Como o duplo toque pula o áudio (D-034), o popup abriria toda vez que o aluno pulasse a narração | Popup abre só após **400ms de seleção parada**, mais uma **janela de supressão de 900ms** após duplo toque, que também limpa a seleção residual |
| 2 | **Terminar uma seleção dispara `click` no container**, que hoje alterna cabeçalho e barra (D-033) | Guarda no `aoTocar`: havendo seleção viva, ignora. Com popup aberto, o toque fecha o popup e para aí — o toque seguinte volta a alternar |
| 3 | **Tocar num grifo** briga com o toque simples do chrome **e** com o duplo toque da frase | `stopPropagation` + a mesma janela de 250ms que o código já usa; o duplo toque cancela o popup do grifo. **D-034 ganha** |
| 4 | **Frases sem áudio** (`fragIndex` negativo, sem mapa de sincronização) não têm destino de seek | Grifar e copiar funcionam; o ícone de pular é **omitido** (popup de 2 ícones), não desabilitado — ícone morto a 390px é ruído e convida ao toque |
| 5 | **Seleção atravessando duas frases** | Popup de **1 ícone: só copiar**. Grifo cruzado seria N linhas no banco, com falha parcial e sem unidade de remoção — o aluno tocaria num pedaço, removeria só ele, e pareceria bug |

E dois achados técnicos que definem a arquitetura:

- **A frase é renderizada como texto puro** dentro de um `<p>` (ReadingArea linha 193). Pra grifar
  sub-trechos ela precisa passar a renderizar **segmentos**. É a mudança de maior risco de regressão do
  bloco — mexe no elemento que sustenta o destaque da narração, o `boxDecorationBreak: clone` e o
  auto-scroll.
- **`lesson_bookmarks` tem `unique (user_id, lesson_id, frag_index)`** — uma cor por frase. Vários grifos
  numa frase exigem tabela nova. Como os dois sistemas convivem (decisão 4), eles pintam **camadas
  diferentes do DOM**: o marcador pinta o `<p>`, o grifo pinta um `<span>` dentro dele. Por isso **nenhuma
  regra de precedência atual muda** — uma frase pode ser ativa + hit + marcada + ter 3 grifos ao mesmo
  tempo.

## Passo 5.0 — SQL

Arquivo: [[PRD-008-bloco5-grifos]]. **KI-29: escrita no banco nunca por MCP ou Management API** — o Felipe
roda no SQL Editor e confirma as 4 linhas de policy. **Nada de front-end antes disso**: hook sem tabela só
gera 404 no console e polui o diagnóstico do resto.

Três escolhas de schema que precisam de justificativa registrada:

- **Sem `check (frag_index >= 0)`**, ao contrário do Bloco 3 — frases sem áudio têm índice negativo e
  continuam grifáveis (conflito 4).
- **`quote` gravado junto com os offsets.** Não é redundância, é âncora de conferência. Se
  `text.slice(start,end) !== quote`, a renderização tenta **uma** relocação por `indexOf`; se falhar, o
  grifo é ignorado **só naquele render**. **Nunca apagar do banco automaticamente** — dado do aluno não
  some por bug de conteúdo.
- **`unique (user_id, lesson_id, frag_index, start_offset, end_offset)`** — regrifar o mesmo trecho troca
  a cor por upsert, mesma semântica do Bloco 3.

**Sobre o risco de offset:** o texto publicado é imutável por **KI-23** — reeditar exigiria regravar o
áudio e regerar o mapa, e sem isso o destaque da frase ativa (Bloco 1) já quebra. O grifo não cria
fragilidade nova, herda a que já sustenta o leitor. A alternativa (ancorar só por texto + "ocorrência N")
falha em repetição — "360" aparece dezenas de vezes na aula — e custa varredura a cada render.

## Passos de execução

Um por vez, cada um fechando com `npm run build` limpo. **Os passos 5.1 a 5.3 não entregam nada visível,
de propósito** — são o refactor arriscado isolado, pra quebrar sozinho se for quebrar, longe da feature.

| # | O quê | Como se verifica |
|---|---|---|
| **5.1** | Extrair `MarkerColorPopup.tsx` do `BottomPlayer.tsx` (linhas ~339-361), sem feature nova | `verify-bloco3.mjs` verde + print 390px do painel idêntico |
| **5.2** | `readerHighlightSegments.ts` — módulo puro `buildSegments(text, highlights)` + teste vitest | `npm test` (vitest já configurado no `package.json`) |
| **5.3** | `data-frag-any` em todas as frases + extrair `SentenceParagraph` + renderizar por segmentos, com a lista **sempre vazia** | Refactor puro, saída idêntica. `verify-bloco1/2/3/4` verdes + print 390px comparado |
| **5.4** | `useLessonHighlights.ts` + pintura do grifo | Inserir linha à mão no SQL Editor e ver o grifo aparecer, inclusive dois na mesma frase |
| **5.5** | `readerSelection.ts` + `SelectionPopup.tsx` (modo ações) + efeito `selectionchange` | Conflitos 1 e 2 |
| **5.6** | Modo cores na seleção + toque no grifo com cores e lixeira | Conflito 3 |
| **5.7** | Arestas: multi-parágrafo copy-only, frase sem áudio, fechar no scroll, `Escape` | Conflitos 4 e 5 |
| **5.8** | `tests/verify-bloco5.mjs` + regressão completa + prints 390px | D-039 completo |

### Detalhes que a execução não pode inventar

**`data-frag` vs `data-frag-any` (passo 5.3).** Hoje frases sem áudio **não recebem `data-frag`**
(ReadingArea linha 138). Dar `data-frag` a elas quebraria `useNarrationAutoScroll`, o seletor de frase
ativa dos testes e os `querySelector('[data-frag="N"]')` do `NarratedLessonPage`. **Adicionar
`data-frag-any` em todas as frases** e usar só ele na segmentação e na leitura de seleção. `data-frag`
continua exclusivo das narráveis, exatamente como hoje.

**O `<p>` não muda (passo 5.3).** Nem `key`, nem `data-frag`, nem `role`/`tabIndex`/`aria-label`, nem
`onDoubleClick`/`onKeyDown`, nem **uma linha do objeto `style`** — incluindo `boxDecorationBreak: clone`,
`WebkitBoxDecorationBreak` e a cadeia de precedência `ativa > hit atual > hit > marcada` (linhas 119-133).
Só o **filho** muda: `segments.length === 0 ? text : segments.map(...)`. Lista vazia mantém o caminho
antigo, que é o caso da esmagadora maioria das frases.

Como `useMemo` não pode ser chamado dentro de um `.map()` (regra dos hooks), extrair um subcomponente
`SentenceParagraph` no mesmo arquivo. É refactor mecânico: mover o corpo do map sem mudar uma linha de
estilo.

**Nenhum espaço entre segmentos.** É o bug mais provável do bloco — um espaço a mais muda o texto e
desloca as quebras de linha da frase. O `<span data-hl>` leva `boxDecorationBreak: clone` (mesmo motivo do
`<p>`: grifo que vira linha), `padding` só vertical, e **nada** de padding/margin horizontal nem
`display:inline-block` — qualquer um dos três altera a métrica do texto.

**Invariante do módulo de segmentos (5.2):** `segments.map(s => s.text).join("") === text`. Sobreposição
de grifos resolve por "o mais recente pinta por cima", escrevendo num array de posições — sem spans
aninhados. Testes mínimos: sem grifo → lista vazia; grifo no meio → 3 segmentos; grifo colado no
início/fim → sem segmento vazio; dois disjuntos → 5 segmentos; dois sobrepostos → o novo domina a
interseção; `quote` deslocado → relocação; `quote` inexistente → some só ele; offsets fora do texto →
clamp sem crash.

**Por que `selectionchange` e não `mouseup`/`touchend` (passo 5.5).** No celular a seleção nasce de um
long-press e depois é **ajustada arrastando as alças**, muito depois do `touchend`. Com `touchend` o popup
abriria sobre a seleção provisória de uma palavra e com offsets errados. `selectionchange` dispara a cada
ajuste e o debounce de 400ms reinicia — o popup abre sobre a seleção **final**, que é literalmente o que o
Felipe pediu.

**Por que o debounce sozinho não basta.** Depois de um duplo toque a palavra fica selecionada **e
estável**, então o timer de 400ms dispararia normalmente e o popup abriria — exatamente o bug que se quer
evitar. Daí a janela de supressão: o `onDoubleClick` do `<p>` grava o instante, e o callback de abrir
confere a janela (900ms) e, dentro dela, **limpa a seleção** além de não abrir — senão o resíduo azul da
palavra fica na tela durante o seek. A checagem tem que estar no **abrir** (t+400ms), não no agendar: no
desktop o `selectionchange` chega **antes** do `dblclick` do React. Deixar `SUPRESSAO_MS = 900` nomeada e
comentada — é a única constante que pode precisar de ajuste em aparelho lento.

**Posicionamento e z-index (passo 5.5).** `position: fixed`, `z-[45]` — acima do cabeçalho e da barra
(z-40), abaixo do `ReaderPanel` (z-50, teto). **Nenhum z-index existente muda.** Centraliza no
`getBoundingClientRect()` do Range, com clamp de 8px nas bordas; se não couber acima (top < 70, a faixa do
cabeçalho), vira pra baixo. **Rolar fecha o popup** — reposicionar dá jank no celular e briga com
`useNarrationAutoScroll`, que pode arrastar o texto debaixo dele. Fechar é o comportamento nativo do
Android e do iOS.

**Pular o áudio usa `controls.playFromFragment`**, não `seekToFragment` — é o mesmo verbo do duplo toque
(D-034), pra o gesto novo não se comportar diferente do gesto que já existe.

**Na extração do `MarkerColorPopup` (5.1):** os `aria-label` precisam continuar exatamente
`Marcar com a cor #F5A623` — `verify-bloco3.mjs` depende dessa string. É o único risco da extração, e o
próprio teste do Bloco 3 pega.

## Verificação em loop

O loop é: **cada passo fecha com build + teste + print antes de o seguinte começar**, e o passo 5.8 roda
tudo junto de novo.

### O que o robô prova — `tests/verify-bloco5.mjs`

Copiar a estrutura de `verify-bloco3.mjs` (perfil de aluno via `RV_PROFILE`, coleta de console/pageerror,
array de checks, exit code). **Limpar os próprios grifos no fim** — o harness do Bloco 3 já custou tempo
por não limpar quando morre no meio, e a rodada seguinte quebrava com estado sujo.

Selecionar por script exige API real de `Range`/`Selection` pra disparar `selectionchange` — clique
simulado não serve.

**Comportamento novo:** popup aparece após 700ms e **não** aparece em 200ms (prova o debounce) · 3 botões ·
grifar abre 4 cores · a cor aplicada bate no `getComputedStyle` · o `span` contém exatamente o trecho
selecionado (prova os offsets) · **`p.textContent` idêntico ao de antes de grifar** (pega o bug do espaço)
· dois grifos na mesma frase · persistem após reload · tocar no grifo abre cores + lixeira · remover limpa
sem sujar o texto · pular move o `currentTime` · seleção cruzando dois `<p>` mostra 1 botão · scroll fecha
· `Escape` fecha.

**Regressão — é aqui que mora o risco real:**

- **D-034:** duplo toque pula o áudio **e** o popup não aparece depois de 900ms **e** o cabeçalho não pisca
- **D-034 sobre grifo:** mesmo teste numa frase que já tem grifo
- **D-033:** toque simples alterna cabeçalho e barra juntos
- **D-033 + seleção:** selecionar **não** altera o cabeçalho; um toque fecha o popup e o cabeçalho
  **continua como estava**; o toque seguinte aí sim alterna
- **D-035:** rolar sem seleção não abre nada
- `verify-bloco1/2/3/4` e `verify-blocoB*`/`C*` verdes em mobile **e** desktop

### O que só o olho do Felipe pega (D-039)

Teste de robô prova que **não quebrou**. Não prova que **está bom**.

1. **Contraste do grifo sobre a frase que está tocando.** A frase ativa já tem fundo âmbar + filete âmbar;
   um grifo âmbar pode **sumir dentro dela**. É o risco visual nº 1 e nenhum robô enxerga. Conferir nos 3
   temas do leitor.
2. Grifo virando linha — cantos arredondados nos dois pedaços, altura de linha inalterada.
3. Popup nascendo sob o cabeçalho, sob a `ImmersiveStrip`, ou saindo pela borda numa seleção na primeira
   ou última linha.
4. As alças nativas de seleção do Android convivendo com o popup — ficam acima de tudo no sistema.
5. Sujeira visual com 4 grifos de 4 cores diferentes na mesma frase.
6. Alcance do polegar: 3 ícones de 40px a 390px.

## Arquivos

**Novos:** `src/hooks/useLessonHighlights.ts` · `src/components/academy/narrated/readerHighlightSegments.ts`
(+ `.test.ts`) · `src/components/academy/narrated/readerSelection.ts` ·
`src/components/academy/narrated/MarkerColorPopup.tsx` ·
`src/components/academy/narrated/SelectionPopup.tsx` · `tests/verify-bloco5.mjs` ·
[[PRD-008-bloco5-grifos]] (o SQL, já escrito)

**Tocados:** `ReadingArea.tsx` (maior risco) · `NarratedLessonPage.tsx` · `BottomPlayer.tsx`

**Reusados sem tocar:** `BOOKMARK_COLORS`/`BookmarkColor` de `useLessonBookmarks.ts` (fonte única — é a
mesma paleta do `check` no banco, não redefinir) · `buildSentences` de `readerSentences.ts` ·
`controls.playFromFragment` de `useNarratedAudio.ts` · o padrão de hook do `useLessonBookmarks.ts`

## Ao fechar o bloco

1. Atualizar a tabela de blocos de [[PRD-008-leitor-narrado-design]]
2. Registrar as decisões novas em [[DECISIONS]] — **conferir o último número usado**, a numeração já
   colidiu uma vez. O último hoje é **D-050**
3. Escrever o dia no [[TIMELINE]], incluindo o que **não** foi corrigido
4. Bloco só fecha com o aval do Felipe em aparelho real (D-039)

## Documentos relacionados
- [[PRD-008-leitor-narrado-design]] · [[PRD-008-bloco5-grifos]] · [[PRD-009-trilha-gamificada]]
- [[DECISIONS]] · [[KNOWN_ISSUES]] · [[TIMELINE]]
