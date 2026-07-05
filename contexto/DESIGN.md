# DESIGN — Real Vision

> Source of truth para identidade visual do site oficial. Atualizado em mai/2026.

---

## Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| Amber (primary) | `#F5A623` | CTAs, destaques, hover, accent |
| Amber (muted) | `#C58B2A` | Variação secundária amber |
| Background | `#0a0d14` | Fundo principal de todas as páginas |
| Surface | `#161c2b` | Cards, seções alternadas |
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
Sobre Nós | Serviços | Portfólio | Formação | Blog | Contato | Loja
```

| Item | Rota |
|---|---|
| Sobre Nós | `/sobre` |
| Serviços | `/servicos` |
| Portfólio | `/portfolio` |
| Formação | `/profissional-360` |
| Blog | `/blog` |
| Contato | `/contato` |
| Loja | `/loja` (botão separado no desktop) |

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

---

## Estilo visual geral

- **Tema:** dark (fundo quase preto `#0a0d14`)
- **Accent:** âmbar/dourado (`#F5A623`) — nunca substituir por outra cor de destaque
- **Headings:** Bebas Neue, uppercase, bold — padrão em TODAS as páginas
- **Componentes inline CSS:** padrão com `<style>{css}</style>` dentro do componente
- **Eyebrows / labels:** monospace (JetBrains Mono), uppercase, letter-spacing amplo, cor âmbar
- **Cards:** fundo `rgba(20,20,28,0.85)`, borda `rgba(255,255,255,0.08)`, backdrop-blur
- **Idiomas:** PT (padrão), EN, DE — rotas `/en/...` e `/de/...`
