# Hard Rules — não negociáveis em qualquer skill filha gerada

Toda skill `carrossel-imagens-<slug>` gerada pelo `gerador-skills-carrosseis` herda estas regras. Não são opcionais, não são escolhidas durante a entrevista, não dependem do estilo visual escolhido. Vão diretamente para os arquivos gerados (SKILL.md, workflow.md, design-system.md, CSS) como cláusulas literais.

## Canvas e formato

- **Canvas único: 1080×1440 pixels (aspect 3:4).** Sem variação por estilo. Sem 4:5, sem 1:1, sem 9:16.
- **Viewport do Playwright export: `{ width: 1080, height: 1440 }`** com `deviceScaleFactor: 2`. Sem variação.
- **CSS canvas tokens:** `--canvas-w: 1080px; --canvas-h: 1440px;`.

## Tipografia

- **Tamanho mínimo do corpo: 36px.** Única exceção: `.fonte-externa` / `.atribuicao` em 24px.
- **`font-style: italic` proibido em qualquer texto de slide.** Ênfase usa `<em>` reestilizado (accent color, sem itálico) ou `<strong>` (peso aumentado).
- **Letter-spacing negativo** assina templates ibe.IA: `-0.07em` em display, `-0.02em` em corpo. Quando o estilo escolhido pede tracking neutro ou positivo (raro, mas válido em swiss/grid), documentar o desvio em `identidade-derivada.md`.
- **Web fonts via `@import` no topo do CSS** (não `<link>` no HTML). Facilita o `document.fonts.ready` no export.

## Texto e roteiro

- **Em-dashes (`—`) proibidos** em qualquer texto user-facing produzido pela skill filha: texto de slide, roteiro-exemplo, legenda, copy do CTA. Substituir por ponto, vírgula, dois-pontos, hífen simples ou reformular. Hard error no Step 1 do workflow da filha.
- **Quebra de linha por sentença.** Todo `.`, `?` ou `!` finalizador de sentença vira split em `<p>` no render. Exceções: títulos de uma frase só (capa, CTA), itens de lista já isolados, abreviações (`Sr.`, `etc.`, `Inc.`) que não terminam sentença.
- **Fidelidade ao roteiro: zero invenção de texto novo na renderização.** O renderer só formata; nunca reescreve, resume ou expande.
- **PT-BR em texto de slide e legenda; EN em prompts AI** sempre. Não misturar idioma no mesmo prompt.

## Estrutura de arquivos da skill filha

- **9 arquivos canônicos:** SKILL.md, workflow.md, design-system.md, identidade-derivada.md, archetypes.md, css/template.css, image-gen/{config.yaml,prompts.md,style-bible.md}, scaffold/{_export.js,preview.html,roteiro-exemplo.md}, tests/roteiro-dummy.md. Adicionar `image-gen/svg-guide.md` se modalidade svg habilitada.
- **`identidade-derivada.md` obrigatório** mesmo quando a skill filha não desvia da canônica ibe.IA (nesse caso documenta "sem desvio: paleta, fontes e tom canônicos preservados").

## Output de carrossel (pasta vN/)

- **Output mora fora da skill**, em `Marketing/Conteudo/<YYYY-MM-DD>-<carrossel-slug>/vN/` onde N é a próxima versão não usada.
- **Nunca sobrescrever `vN/` existente.** Sempre bumpar para `v(N+1)`.
- **Idempotência:** rodar 2× a skill no mesmo roteiro produz o mesmo resultado. Se `imagem.arquivo` aponta para arquivo existente em disco, pular geração.
- **Persistir decisões no próprio `roteiro.md`** após Step 2 do workflow. Reescrever apenas o bloco `## Slide NN` afetado, preservar o resto do arquivo (frontmatter, outros slides, racional editorial) byte-a-byte sem normalização colateral.

## Modalidades de imagem (quando habilitadas)

- **Ordem de preferência obrigatória: `print > svg > ai`.** AI nunca é Plan A. Antes de sugerir `ai`, descartar `print` (existe URL/imagem real?) e `svg` (é UI/diagrama estilizável?) explicitamente.
- **`tipo: print`:** Playwright CLI direto. Comando canônico: `npx playwright screenshot --browser=chromium --viewport-size=1440,2000 --full-page "<url>" "vN/imagens/sNN.png"`. Validar PNG > 10KB depois da captura (detecta login wall, rate limit, redirect silencioso). Se falhar: oferecer URL alternativa ou trocar para `none`.
- **`tipo: svg`:** skill filha escreve o SVG direto, custo zero. Geometria limpa (fills sólidos, sem gradientes complexos, raios consistentes 8-16px, strokes 2-4px). Tipografia mínima dentro do SVG (labels curtos, nunca parágrafos, nunca itálico). viewBox alinhado ao slot do arquétipo.
- **`tipo: ai`:**
  - **Gate de custo obrigatório antes de toda chamada.** Mostrar prompt completo + modelo + aspect_ratio + pedir "s/n". Vale para primeira passada, regen, prompt novo. Encadear chamadas sem aprovação é violação.
  - **CSS-antes-de-regen.** Quando user pede modificação numa imagem já gerada, primeiro checar se o ajuste é de container (crop, border, border-radius, `object-fit`/`object-position`, sombra, opacidade, escala, máscara, tint). Se for, resolver em `template.css` e re-exportar. Só regerar quando o problema é o conteúdo da imagem em si.
  - **Loop de feedback no terminal:** `[a]ceitar / [c]ss (ajustar sem regerar) / [r]egerar / [p]rompt novo`. Antes de `r`, perguntar "essa mudança não dá pra resolver via CSS?".
  - **Prompts em inglês**, densos (80-180 palavras), com sujeito + composição + cenário + iluminação + paleta + materiais + mood.
  - **Negative prompts inline no prompt principal** (Gemini via OpenRouter ignora `negative_prompt`).
  - **Aspect ratio via `--aspect-ratio`** (não `--width`/`--height` em pixels; Gemini-3.1 ignora).
  - **Personagem consistente cross-slide:** repetir descrição literal do sujeito em cada prompt do mesmo carrossel.
  - **Modelo default: `final` (google/gemini-3.1-flash-image-preview)** via `ibeia-base/skills/openrouter-image/generate.py`.

## Playwright export (canônico)

Recipe canônica do `_export.js`. Não desviar sem motivo documentado:

```js
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1440 },
    deviceScaleFactor: 2,
  });
  const fileUrl = 'file://' + path.resolve(__dirname, 'carrossel.html').split(path.sep).join('/');
  await page.goto(fileUrl);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  const slides = await page.$$('.slide');
  if (slides.length === 0) throw new Error('Nenhum .slide encontrado em carrossel.html');
  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    await slides[i].screenshot({ path: path.join(__dirname, `slide-${n}.png`) });
    console.log(`Exportado slide-${n}.png`);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
```

- **Sequência crítica:** `waitForLoadState('networkidle')` → `document.fonts.ready` → `waitForTimeout(1000)`. Sem ela, fontes web não carregam a tempo e PNG sai com fallback fonte.
- **`deviceScaleFactor: 2`** sem isso PNG sai borrado em retina.
- **Playwright via CLI**, não via MCP (regra global do usuário: MCP consome muito mais tokens).
- **`node_modules` fora do Drive.** Instalar Playwright em `C:\Users\renat\AppData\Local\<projeto>\` quando precisar. Google Drive virtualiza arquivos e quebra Node runtime.

## Estilo visual

- **Sem header/footer institucional fixo por default.** Slides respiram edge-to-edge. Cabeçalho/rodapé só aparece se a entrevista escolheu uma variação explícita.
- **Glass cards exigem ambient blur por trás.** Se o estilo escolhido usa `backdrop-filter: blur`, o `<section>` precisa ter gradient/blob ambient atrás do card. Sem ambient, glass não tem efeito.

## Workflow da skill filha (8 passos canônicos)

A skill filha sempre tem este workflow, com adaptações de estilo:

1. Read & validate roteiro (YAML frontmatter + `## Slide NN`).
2. Sugerir imagens por slide (se modalidades habilitadas) e persistir decisão no roteiro.
3. Prepare output folder `vN/`.
4. Resolver assets especiais (foto CTA, mockup, etc., conforme arquétipo CTA escolhido).
5. Gerar/capturar imagens por slide.
6. Generate `vN/carrossel.html`.
7. Generate `vN/preview.html` (grid de PNGs).
8. Export PNGs via Playwright + entrega.

## Identidade derivada

- **`identidade-derivada.md` documenta o diff vs canônica ibe.IA.** Tabela com colunas Aspecto | Canônica | Neste template | Razão. Mesmo quando não há desvio, registrar "sem desvio: paleta + fontes + tom canônicos".
- **Quando o estilo escolhido desvia muito da canônica** (brutalism, terminal, etc.), o `identidade-derivada.md` deve explicar o porquê do desvio. O gerador permite o desvio, não bloqueia.
