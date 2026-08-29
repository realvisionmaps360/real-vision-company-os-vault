# DESIGN — Real Vision

> Source of truth para identidade visual do site oficial. Atualizado em mai/2026.

---

## Paleta de cores

> **Conferido contra o CSS de produção em 29/08/2026** (site rodando local + Playwright lendo
> estilos computados). Três linhas desta tabela estavam desatualizadas e foram corrigidas — ver
> "Correções de 29/08/2026" no fim do arquivo.

| Token | Hex | Uso |
|---|---|---|
| Amber (base) | `#C58B2A` | Base do gradiente. É o âmbar real do site, não `#F5A623` |
| Amber (high) | `#E5C07B` | Topo do gradiente, hover de link e texto |
| Amber (low) | `#9E6F1E` | Fim do gradiente |
| Background | `#090b11` | Fundo do body (`--background: 222 33% 5%`) |
| Band | `#0c1018` | Faixa de credibilidade e seções alternadas |
| Section | `#0f131e` | Superfície de seção (`--rv-section`) |
| Surface | `#161c2b` | Base dos gradientes de card, não cor chapada |
| Ink | `#0a0c11` | Tailwind custom — fundo profundo |
| Ink-2 | `#11141b` | Surface secundária (Tailwind custom) |
| Text principal | `#ffffff` | Títulos e texto primário |
| Text muted | `#A8A8B0` | Subtítulos, parágrafos |
| Text dim | `#7A7A85` | Labels, metadados |
| Border sutil | `rgba(255,255,255,0.06)` | Divisores, bordas de cards |

**Variáveis CSS no projeto (`src/index.css`):**
```css
--rv-amber: #C58B2A;
--rv-amber-hi: #E5C07B;
--rv-amber-lo: #9E6F1E;
--rv-bg: #0a0d14;
--rv-surface: #161c2b;
```

**Tailwind custom (`tailwind.config.ts`):**
```ts
ink: "#0a0c11"
"ink-2": "#11141b"
amber: { DEFAULT: "#f5a524", soft: "#fbbf24" }
```

---

## Tipografia

### Fontes importadas (`index.html`)
```html
family=Bebas+Neue
family=Inter:wght@300;400;500;600
family=JetBrains+Mono:wght@400;500
family=Archivo:wght@400;500;700;800;900  ← disponível para uso específico
family=Geist:wght@300;400;500;600        ← disponível para uso específico
```

### Sistema de fontes — padrão do site

| Uso | Fonte | Tailwind class | Inline CSS |
|---|---|---|---|
| Títulos / headings grandes | **Bebas Neue** | `font-heading` / `font-display` | `'Bebas Neue', Impact, sans-serif` |
| Corpo / parágrafos | **Inter** | `font-body` / `font-sans` | `'Inter', system-ui, sans-serif` |
| Labels monospace / eyebrows | **JetBrains Mono** | `font-mono` | `'JetBrains Mono', ui-monospace, monospace` |

> **Regra para componentes com inline CSS:** sempre declarar com fallbacks (`'Bebas Neue', Impact, sans-serif`). Nunca referenciar fontes que não estão importadas no `index.html` (ex: Saira Condensed, DM Sans — foram removidas em mai/2026).

---

## Logo

- Header (fundo escuro): `src/assets/logo-header.png`
- Footer: `src/assets/logo-footer.png`
- Branco (geral): `src/assets/rv-logo-white.png`
- Preto (geral): `src/assets/rv-logo-black.png`
- Favicon: `contexto/ativos/favicon.png`
- Símbolo isolado: `src/assets/mark.png`

---

## Navegação — menu header (ordem oficial)

```
Portfólio | Serviços | Contato | Formação | Sobre Nós | Blog | Loja
```

| Item | Rota |
|---|---|
| Portfólio | `/portfolio` |
| Serviços | `/servicos` |
| Contato | `/contato` |
| Formação | `/profissional-360` |
| Sobre Nós | `/sobre` |
| Blog | `/blog` |
| Loja | `/loja` (botão separado no desktop) |

> Ordem definida em 11/08/2026 junto com o menu mobile v2 (Painel Editorial) — prioriza prova (Portfólio) e conversão (Serviços, Contato) no topo.

---

## Páginas existentes

| Rota | Componente | Notas |
|---|---|---|
| `/` | `Index.tsx` | Home com hero, tours, serviços, blog preview |
| `/sobre` | `About.tsx` | 5 seções: Hero, Origem, Evolução, Time, CTA |
| `/servicos` | `Services.tsx` | Hero + accordion de serviços |
| `/portfolio` | `Portfolio.tsx` | Grid de projetos |
| `/portfolio/:slug` | `ProjectDetail.tsx` | Detalhe do projeto |
| `/blog` | `Blog.tsx` | Lista de posts |
| `/blog/:slug` | `BlogPost.tsx` | Post individual |
| `/contato` | `Contact.tsx` | Formulário de contato |
| `/loja` | `Shop.tsx` | Loja de produtos |
| `/loja/:slug` | `ShopProduct.tsx` | Produto individual |
| `/profissional-360` | `Profissional360.tsx` | Formação/curso |
| `/obrigado` | `ThankYou.tsx` | Pós-formulário |
| `/sitelp` | `SiteLP.tsx` | LP de venda do pilar Sites. Destino do rodapé dos sites de cliente e do tráfego pago. Só em PT |

---

## Estilo visual geral

- **Tema:** dark (fundo quase preto `#0a0d14`)
- **Accent:** âmbar/dourado (`#F5A623`) — nunca substituir por outra cor de destaque
- **Headings:** Bebas Neue, uppercase, bold — padrão em TODAS as páginas
- **Componentes inline CSS:** padrão com `<style>{css}</style>` dentro do componente
- **Eyebrows / labels:** monospace (JetBrains Mono), uppercase, letter-spacing amplo, cor âmbar
- **Cards:** fundo `rgba(20,20,28,0.85)`, borda `rgba(255,255,255,0.08)`, backdrop-blur
- **Idiomas:** PT (padrão), EN, DE — rotas `/en/...` e `/de/...`


---

## Correções de 29/08/2026

Conferência feita com o `real-vision-core` rodando local e Playwright lendo os estilos computados,
durante a construção da rota `/sitelp`. **Onde este documento divergia do CSS, o CSS venceu.**

| O que dizia antes | O que o CSS de produção faz |
|---|---|
| Amber primary `#F5A623` chapado | O site **não usa âmbar chapado em botão nenhum**. Todo CTA é a rampa `#E5C07B → #C58B2A → #9E6F1E` |
| Background `#0a0d14` | O body é `#090b11`. `#0a0d14` é o fundo do `.grid-bg` do hero |
| Surface `#161c2b` para seções alternadas | Seção alternada é `#0c1018`. `#161c2b` é só a base dos gradientes de card |

### O que faltava e agora está registrado

| Item | Valor de produção | Onde vive |
|---|---|---|
| Raio de borda | 12px (14px no submit de formulário) | `--radius: 0.75rem` |
| Container | `max-w-[1320px]`, padding 24px / 40px em `lg` | `CredibilityBar.tsx` |
| Ritmo vertical de seção | 144 a 160px | medido nas seções da home |
| h1 / h2 | Bebas 77.76px / 72px, line-height 1.0, tracking -0.01em / -0.025em | computado |
| Botão primário | gradiente + glow + shine sweep no hover, **texto branco**, altura 48px | `.btn-amber` |
| Card | `linear-gradient(180deg, rgba(22,28,43,.45), rgba(15,19,30,.55))` | `.svc-card` |

### Componentes nomeados do `src/index.css`

Antes de escrever CSS novo, checar se já existe: `.btn-amber`, `.btn-premium`, `.grid-bg`,
`.live-dot`, `.pulse`, `.text-amber-grad`, `.img-treatment`, `.svc-card`, `.svc-card-big`,
`.proj-card`, `.price-card`, `.check-dot`, `.callout`, `.chip`, `.testim-card`, `.fit-yes`,
`.fit-no`, `.founder-photo`, `.badge-pill`, `.faq-item`, `.faq-trigger`, `.faq-icon`,
`.faq-panel`, `.form-input`, `.form-select`, `.form-submit`, `.loja-banner`, `.footer-link`,
`.footer-icon`, `.footer-title`.

**Pegadinha registrada:** `.btn-amber` declara `position: relative` e vence a classe `.fixed`
do Tailwind. Elemento fixo que use `.btn-amber` precisa de `position: fixed` inline.

### Ativos de marca

O `contexto/ativos/README.md` lista todos os logos como "A adicionar". **Eles existem**, no
`real-vision-core`: `src/assets/logo-header.png`, `logo-footer.png`, `mark.png`,
`rv-logo-white.png`, `rv-logo-black.png` e `public/favicon.ico`.
