---
name: gerador-skills-carrosseis
description: Use when the user wants to scaffold a NEW carousel-rendering skill (different visual style, different image strategy, different header/footer treatment, different typography pair) rather than reuse the existing `carrossel-imagens-editorial` / `carrossel-imagens-ticket` / `carrossel-imagens-ticket-comimagens` skills. The generator runs a linear interview (one question at a time, with default recommendation) covering visual style from 10 catalog options, AI image style from 10 catalog options, image modalities enabled (print/svg/ai/none), header & footer treatment, hero palette strategy, type pair, archetype set, CTA composition. Bakes in hard rules: canvas 1080x1440, no em-dashes, no italic, line break per `.?!` finalizador, 8-step workflow, cost gate before AI generation, CSS-before-regen, idempotent vN/ output, Playwright via CLI with `deviceScaleFactor: 2` and `document.fonts.ready`, prompts AI in English with negative inline. Materializes the new skill folder with SKILL.md, workflow.md, design-system.md, identidade-derivada.md, archetypes.md, css/template.css, image-gen/, scaffold/, tests/. Runs smoke-test against tests/roteiro-dummy.md to verify the generated skill produces valid PNGs.
---

# gerador-skills-carrosseis — meta-skill que gera skills de carrossel

Scaffolder. Entrevista o usuário sobre escolhas estéticas, monta uma skill nova `carrossel-imagens-<slug>` em `ibeia-marketing/skills/`, e roda smoke-test pra confirmar que a skill produz PNGs válidos antes de entregar.

## When to use

O usuário quer um carrossel num registro visual ou tratamento de imagem que não casa com nenhuma das skills existentes E vale a pena ter skill reusável, não um vN/ ad-hoc. Sinais que indicam usar este gerador:

- Estilo visual macro diferente dos 3 atuais (brutalism, terminal-mono, claymorphism, swiss-grid, neo-newspaper, etc.).
- Header/footer com tratamento divergente (foto+@handle, logo+data, mono institucional, nenhum).
- Par tipográfico novo (não Sora+Plus Jakarta, não Fraunces+Source Serif, não Anton+Spectral).
- Combinação de modalidades de imagem nunca usada (ex.: só print, ou só svg, ou print+ai sem svg).
- O usuário pediu literalmente uma skill nova.

## When NOT to use

- O carrossel cabe numa skill existente com ajuste pontual de CSS. Editar a existente é mais barato.
- O usuário quer apenas trocar paleta hero ou foto de capa de uma skill existente. Editar o roteiro basta.
- Carrossel one-off sem reuso previsto. Faça `vN/` ad-hoc direto, sem skill.

## Workflow

Read [workflow.md](workflow.md) e seguir os 17 passos. A entrevista é linear: uma pergunta por vez, com recomendação default em cada uma.

## Hard rules

Read [hard-rules.md](hard-rules.md). Regras não negociáveis. Toda skill filha gerada herda essas regras literalmente (copiadas nos arquivos gerados, não referenciadas).

## Catálogos de opções

Materializados durante a entrevista:

- `references/estilos-visuais.md` — 10 estilos macro
- `references/estilos-imagens-ai.md` — 10 estilos de imagem IA
- `references/pares-tipograficos.md` — 6 pares display + corpo
- `references/header-footer.md` — 6 variações de cabeçalho/rodapé
- `references/arquetipos-baseline.md` — capa, conteúdo, CTA e variações comuns
- `references/canonica-ibeia.md` — paleta + fontes ibe.IA pra referência cruzada
- `references/playwright-recipe.md` — `_export.js` canônico
- `references/image-gen-recipe.md` — chamada OpenRouter canônica

## Output

Skill filha gerada em `ibeia-marketing/skills/carrossel-imagens-<slug>/`:

```
carrossel-imagens-<slug>/
  SKILL.md
  workflow.md
  design-system.md
  identidade-derivada.md
  archetypes.md
  css/
    template.css
  image-gen/
    config.yaml
    prompts.md
    style-bible.md
    svg-guide.md          # só se modalidade svg habilitada
  scaffold/
    _export.js
    preview.html
    roteiro-exemplo.md
    imagens/              # pasta vazia
  tests/
    roteiro-dummy.md
    expected-slides/      # populada após smoke-test
```

## Smoke-test (passo 16 obrigatório)

Antes de entregar, o gerador roda o workflow da skill filha contra `tests/roteiro-dummy.md`, gera `vN/slide-*.png`, e mostra os PNGs ao usuário. Se quebrar, gerador corrige antes de marcar como pronto.

## Language

Entrevista e SKILL.md da filha em PT-BR. Prompts AI dentro da skill filha em EN. Em-dashes proibidos em qualquer texto user-facing produzido pela skill filha (slide text, legenda, roteiro-exemplo); permitidos em comentários internos e docs técnicos.
