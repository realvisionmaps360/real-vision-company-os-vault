# Workflow — gerador-skills-carrosseis

17 passos. Entrevista linear (uma pergunta por vez, com recomendação default em cada), seguida de materialização dos arquivos e smoke-test obrigatório.

Regra geral da entrevista: **sempre apresentar uma recomendação default explícita.** Para escolhas técnicas (libs, formato, lib AI), listar prós e contras curtos. Para escolhas estéticas (estilo visual, par tipográfico), 1 linha de descrição por opção basta.

## Step 1 — Nome da skill filha

Pedir slug em formato `carrossel-imagens-<descritor>`. Validar:

- `^carrossel-imagens-[a-z0-9-]+$`
- Não existe ainda em `ibeia-marketing/skills/`. Se existir, oferecer: incrementar sufixo (`-v2`) ou abortar pro user escolher outro nome.

Recomendação default: derivar do estilo macro depois que ele for escolhido (ex.: `carrossel-imagens-claymorphism` se step 2 escolher claymorphism). Mas pedir confirmação explícita do nome final no fim da entrevista (step 14).

## Step 2 — Estilo visual macro

Apresentar as 10 opções de `references/estilos-visuais.md` com 1 linha de descrição cada. Pedir 1 escolha.

Recomendação default: **glassmorphism canônico ibe.IA** (já existe variação no editorial), só mudar se o usuário articular preferência clara.

Persistir escolha em `<slug>.config` mental (será usada no design-system.md da filha).

## Step 3 — Tem imagens?

Pergunta binária: sim / não.

Recomendação default: **sim** (carrosseis com imagem performam melhor no feed). Se não, pular steps 4-7.

## Step 4 — Modalidades de imagem habilitadas

Se step 3 = sim. Multi-select entre `print`, `svg`, `ai`, `none`.

Recomendação default: **print + svg + ai** (mesma combinação do `carrossel-imagens-ticket-comimagens`). Se o estilo escolhido em step 2 é terminal/brutalism/swiss-grid, oferecer `svg` apenas como recomendação alternativa (estilos minimalistas casam melhor com SVG).

Anotar pra step 12: `image-gen/svg-guide.md` só será materializado se `svg` está habilitado.

## Step 5 — Estilo das imagens AI

Se `ai` habilitado em step 4. Apresentar as 10 opções de `references/estilos-imagens-ai.md`.

Recomendação default: **Pixar 3D animation** (atual padrão ibe.IA), mas explicar que é escolha pessoal e não precisa ser este se o estilo macro pede outro registro (ex.: terminal-mono casa melhor com line-art ou risograph).

Persistir o estilo + preamble (frase canônica a anexar em todo prompt) para o `image-gen/style-bible.md` da filha.

## Step 6 — Aspect ratios por arquétipo

Defaults canônicos: capa = `3:4`, conteúdo = `16:9`, CTA = N/A (mockup é arquivo fornecido). Oferecer mudança.

Recomendação default: **manter os defaults** (casam com canvas 1080×1440).

## Step 7 — Modelo AI

Se `ai` habilitado.

Recomendação default: **`final` (google/gemini-3.1-flash-image-preview)** via OpenRouter. Único modelo testado e estável no fluxo ibe.IA.

Se o user quiser outro: persistir como override em `image-gen/config.yaml` da filha mas manter `final` como fallback.

## Step 8 — Header/footer

Apresentar as 6 opções de `references/header-footer.md`. Inclui:

1. Nenhum (edge-to-edge, default)
2. Mono strip topo: "Instituto Brasileiro de Educação em IA" + "@ibe.ia" + data
3. Footer só: "@ibe.ia" pequeno bottom-right
4. Foto circular do criador + @handle no topo
5. Logo da marca + data
6. Custom (pedir descrição livre)

Recomendação default: **nenhum** (regra do Renato: slides respiram do topo ao fundo sem faixa institucional). Se step 2 escolheu editorial-magazine, recomendar opção 2 (header strip casa com o estilo).

## Step 9 — Paleta hero

Opções:

1. Canônica completa (laranja `#F84F2E`, roxo `#AF6DFF`, azul `#0058D4`, verde `#84CC16` opcional)
2. Subset (escolher 2-3 cores)
3. Cor fixa única (sem alternância)
4. Paleta custom alinhada ao estilo escolhido (pedir cores)

Recomendação default: **canônica completa minus verde** (verde olive ficou pesado como fundo full-bleed em testes anteriores; manter como cor de detalhe se necessário, não como hero).

## Step 10 — Par tipográfico (display + corpo)

Apresentar os 6 pares de `references/pares-tipograficos.md`. Inclui:

1. Sora + Plus Jakarta Sans (canônica ibe.IA)
2. Fraunces + Source Serif 4 (atual ticket)
3. Anton + Spectral (editorial)
4. Inter Tight + Inter (minimal moderno)
5. Playfair Display + Lato (clássico editorial)
6. Space Grotesk + IBM Plex Sans (tech)

Recomendação default: **par que casa com o estilo macro escolhido em step 2.** Mapping interno:

- glassmorphism → Sora + Plus Jakarta
- ticket / editorial-magazine → Fraunces + Source Serif 4
- swiss/grid → Inter Tight + Inter
- brutalism → Anton + IBM Plex Mono
- claymorphism → Sora + Plus Jakarta
- neo-newspaper → Playfair Display + Lato
- terminal/mono → IBM Plex Mono + IBM Plex Mono
- (outros) → recomendar o par mais próximo do registro

## Step 11 — Arquétipos disponíveis

Opções:

1. Mínimo: `capa`, `conteudo`, `cta` (3 arquétipos)
2. Expandido: `capa`, `conteudo-claro`, `conteudo-escuro`, `conteudo-hero`, `cta` (5 arquétipos, como editorial)
3. Custom: user adiciona ou remove

Recomendação default: **mínimo (3 arquétipos)** se o estilo é simples; **expandido (5)** se o estilo é editorial-magazine ou pede alternância visual entre slides.

Para cada arquétipo escolhido, persistir specs em `archetypes.md` da filha (baseline em `references/arquetipos-baseline.md`).

## Step 12 — Composição do slide CTA

Opções:

1. Só texto (título + chamada + CTA URL)
2. Texto + foto circular do criador (pedir path da foto opcional)
3. Texto + mockup (pedir path do mockup opcional)
4. Texto + checklist (lista de bullets com ícone ✅)
5. Combinação (ex.: texto + foto + checklist)

Recomendação default: **só texto** (mais limpo, sem dependência de assets externos). Se o user mencionou produto específico ou aula, recomendar opção 3 ou 4.

## Step 13 — Plug de curso opcional no CTA

Pergunta binária: a skill filha deve suportar campo `plug:` no slide CTA pra mencionar Formação em Vibe Coding / Automakers / AI Scale?

Recomendação default: **sim**, formato `plug: { texto, url }`. Tratado como footer pequeno no CTA, sem itálico (regra global de carrossel).

## Step 14 — Resumo das escolhas

Mostrar todas as decisões em bloco único:

```
Skill nova: carrossel-imagens-<slug>

Estilo visual macro:       <escolha step 2>
Tem imagens:               <sim/não>
Modalidades:               <print/svg/ai/none>
Estilo AI:                 <escolha step 5>
Aspect ratios:             capa <ar1>, conteudo <ar2>
Modelo AI:                 <modelo>
Header/footer:             <escolha step 8>
Paleta hero:               <escolha step 9>
Par tipográfico:           <display> + <corpo>
Arquétipos:                <lista>
CTA composição:            <escolha step 12>
Plug de curso:             <sim/não>

ok materializar a skill com essas escolhas? (s/n/voltar)
```

Loop até "s". Se "voltar", perguntar qual step revisitar.

## Step 15 — Materializar arquivos da skill filha

Criar diretório `ibeia-marketing/skills/<slug>/`. Preencher cada arquivo a partir do template correspondente em `templates/`, substituindo placeholders pelas escolhas:

1. `SKILL.md` — descrição + when-to-use derivados das escolhas
2. `workflow.md` — 8 passos canônicos adaptados aos arquétipos e modalidades escolhidos
3. `design-system.md` — tokens CSS gerados a partir da paleta + par tipográfico + estilo macro
4. `identidade-derivada.md` — tabela de diff vs canônica ibe.IA, preenchida automaticamente
5. `archetypes.md` — specs de cada arquétipo escolhido (baseline + ajustes por estilo)
6. `css/template.css` — stylesheet completo: web fonts `@import`, tokens, regras por arquétipo
7. `image-gen/config.yaml` — só se ai habilitado; template OpenRouter com modelo + aspect ratios
8. `image-gen/prompts.md` — só se ai habilitado; templates de prompt por arquétipo
9. `image-gen/style-bible.md` — só se ai habilitado; preamble + paleta + don'ts
10. `image-gen/svg-guide.md` — só se svg habilitado; princípios visuais alinhados ao estilo macro
11. `scaffold/_export.js` — Playwright canônico (cópia literal de `references/playwright-recipe.md`)
12. `scaffold/preview.html` — grid de PNGs adaptado ao número de arquétipos
13. `scaffold/roteiro-exemplo.md` — roteiro de demonstração com cada arquétipo preenchido
14. `tests/roteiro-dummy.md` — roteiro mínimo (1 capa, 1-2 conteúdo, 1 CTA) pro smoke-test

Toda hard rule de `hard-rules.md` aparece literalmente nos arquivos gerados (não como referência cruzada): a skill filha precisa ser autocontida.

## Step 16 — Smoke-test obrigatório

Executar o workflow da skill filha contra `tests/roteiro-dummy.md`:

1. Criar `Marketing/Conteudo/<YYYY-MM-DD>-smoke-<slug>/v1/` como pasta de output.
2. Rodar Step 3 da skill filha (prepare output folder) → copiar CSS + `_export.js` para `v1/`.
3. Se modalidade `print` ou `ai` está habilitada no roteiro-dummy, gerar imagens com gate de custo (smoke-test usa `print` com URL conhecida para evitar custo AI; se só `ai` estiver disponível, perguntar ao user se quer rodar AI no smoke ou pular).
4. Gerar `v1/carrossel.html` + `v1/preview.html`.
5. Rodar `_export.js` → produzir `v1/slide-NN.png`.
6. Validar:
   - Pelo menos 3 PNGs gerados (capa + 1 conteúdo + CTA mínimo do roteiro-dummy).
   - Cada PNG > 50KB (PNGs vazios indicam fonte não carregada ou layout quebrado).
   - Dimensões = 2160×2880 (1080×1440 × deviceScaleFactor 2).
7. Mostrar PNGs ao user (`start "<path>"` no Windows abre no visualizador).
8. Perguntar: `[a]provar entrega / [c]orrigir (descrever o que está errado)`.

Se `c`, voltar ao step relevante (geralmente CSS no step 15, item 6) e re-rodar smoke. Loop até `a`.

Copiar os PNGs aprovados para `<slug>/tests/expected-slides/` como referência de regressão futura.

## Step 17 — Entrega

Mostrar ao user:

```
Skill criada: ibeia-marketing/skills/<slug>/
Smoke-test: ok (N PNGs em tests/expected-slides/)

Próximos passos:
- Para usar: invocar a skill com um roteiro real
- Para iterar visual: editar <slug>/css/template.css e re-rodar smoke-test
- Para mudar escolhas estéticas: re-rodar o gerador (sobrescreve)
```

Não deletar `Marketing/Conteudo/<YYYY-MM-DD>-smoke-<slug>/` automaticamente; é evidência do smoke-test caso o user queira inspecionar depois.

## Common rules (não violar)

- **Sempre apresentar recomendação default explícita em cada pergunta da entrevista.** Pergunta aberta sem default é violação.
- **Para decisões técnicas, listar prós e contras curtos.** Para decisões estéticas, 1 linha de descrição por opção basta.
- **Nunca pular o smoke-test (step 16).** Skill que sai do gerador sem smoke é skill que pode estar quebrada na primeira vez que o user invocar.
- **Hard rules de `hard-rules.md` vão literalmente para os arquivos gerados**, não como referência cruzada. Skill filha é autocontida.
- **`identidade-derivada.md` é obrigatório**, mesmo quando a skill filha não desvia da canônica ibe.IA (nesse caso, documenta "sem desvio").
- **Nunca sobrescrever skill existente sem confirmação.** Se `<slug>` já existe em `ibeia-marketing/skills/`, perguntar antes (incrementar nome, abortar, ou sobrescrever explícito).
- **`node_modules` fora do Drive.** Se o smoke-test precisar instalar Playwright, fazer em `C:\Users\renat\AppData\Local\<projeto>\` e symlink, nunca dentro do Drive.
