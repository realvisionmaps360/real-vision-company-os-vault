# SKILL — Sunbite Site Development

> Ativa automaticamente ao trabalhar em `operacao/projetos/sunbite-site`.
> Carregue esta skill sempre que Felipe pedir para mexer, revisar ou expandir o site da Sunbite.

---

## O que é o projeto

Site oficial da **SUNBITE** — food bike de sobremesas premium da Romana (parceira pessoal do Felipe).
Produto único: Strawberry Chocolate Cups (morangos frescos + chocolate suíço premium).
Mercado: Suíça (Aarau e região). Idioma: Inglês primeiro, Alemão depois.

**URL local:** `C:\Users\Computador\Desktop\Real Vision\operacao\projetos\sunbite-site`
**Deploy:** Vercel (ainda não configurado — pendente)

---

## Stack obrigatória

| Tecnologia | Versão / detalhe |
|---|---|
| React | 18+ com novo JSX transform |
| Vite | react-ts template |
| TypeScript | strict mode |
| Tailwind CSS | **v4** com `@tailwindcss/vite` (CSS-first via `@theme {}`) |
| framer-motion | scroll animations (`whileInView`, `viewport: {once: true}`) |
| Google Fonts | Playfair Display + Plus Jakarta Sans (carregadas no HTML) |

**NUNCA** instalar Tailwind v3 — o projeto usa v4 com sintaxe CSS-first.

---

## Design system (tokens)

```css
/* Definidos em src/index.css dentro de @theme {} */
--color-brand:      #841412        /* vermelho principal */
--color-brand-dark: hsl(1 75% 18%)
--color-cream:      #F5E6C8        /* creme da marca */
--color-cream-soft: hsl(40 55% 96%) /* fundo suave */
--color-ink:        hsl(1 25% 12%) /* texto escuro */
--color-ink-muted:  hsl(1 10% 42%) /* texto secundário */

--font-display: 'Playfair Display', Georgia, serif
--font-body:    'Plus Jakarta Sans', system-ui, sans-serif
--font-script:  'Pacifico', cursive  /* logo */
```

Em Tailwind v4 esses tokens viram utilitários automaticamente: `bg-brand`, `text-cream`, `font-display`, etc.

---

## Estrutura do site (seções em ordem)

| Seção | Componente | ID anchor | Background |
|---|---|---|---|
| Header | `Header.tsx` | — | transparente → cream-soft/90 ao scroll |
| Hero | `HeroSection.tsx` | — | `bg-brand` |
| Produto | `ProductSection.tsx` | `#product` | `bg-cream` |
| Ingredientes | `IngredientsSection.tsx` | — | `bg-brand` |
| Sobre Romana | `RomanaSection.tsx` | `#about` | `bg-cream` |
| Onde encontrar | `FindUsSection.tsx` | `#find-us` | `bg-cream-soft` |
| Eventos (Book) | `BookSection.tsx` | `#book` | `#F5E6C8` (inline) |
| Galeria | `GallerySection.tsx` | `#gallery` | `bg-cream-soft` |
| FAQ | `FAQSection.tsx` | — | `bg-cream` |
| Final CTA | `FinalCTASection.tsx` | — | `bg-brand` |
| Footer | `Footer.tsx` | — | `bg-brand-dark` |

**Header nav:** About · Gallery · Find Us · Book (4 itens, nessa ordem)

---

## Regras de código

### CSS / Tailwind v4 — armadilha crítica

Seletores de elemento nu no `index.css` fora de `@layer` têm precedência MAIOR que utilitários Tailwind v4.
**Nunca adicionar** `margin: 0` em `h1, h2, h3` — isso bloqueia todas as classes `mb-*` e `mt-*` nesses elementos.

```css
/* ✅ CERTO — só tipografia */
h1, h2, h3 {
  font-family: var(--font-display);
  text-wrap: balance;
}

/* ❌ ERRADO — mata utilitários de margem */
h1, h2, h3 {
  margin: 0; /* NÃO FAZER */
}
```

### Animações de scroll

Padrão para todas as seções:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6 }}
>
```

### Conteúdo

Todo copy está centralizado em `src/content.ts` (objeto `t`).
Links externos em `src/links.ts`.
**Nunca hardcodar texto ou URLs nos componentes.**

---

## BookSection — design editorial (versão atual)

Redesenhada com base em handoff do Claude Design (junho/2026).
Cards editoriais com reveal de tagline no hover/tap.

### Estado de interação
```tsx
const [hoverIdx, setHoverIdx] = useState<number | null>(null)
const [openIdx, setOpenIdx]   = useState<number | null>(null)
const isExpanded = (i: number) => hoverIdx === i || openIdx === i
```
- Desktop: hover expande
- Mobile: tap toggle (persiste até segundo tap)
- Keyboard: focus/blur

### Ícones
Todos SVG inline no componente, `viewBox="0 0 48 48"`, `width="62" height="62"`.
`fill="none" stroke="currentColor" stroke-width="2.2"` — cor herdada do wrapper via `color`.

### Arch icon window (container do ícone)
```
width: 132px; height: 132px
border-radius: 66px 66px 16px 16px  ← arco no topo, flat na base
resting bg:  rgba(132,20,18,0.055)
expanded bg: #841412
icon color resting:  #841412
icon color expanded: #F5E6C8
```

### Card expanded state
```
transform: translateY(-8px)
background: #F7ECD6
border: 1px solid rgba(132,20,18,0.42)
box-shadow: 0 24px 46px -18px rgba(74,18,12,0.42), inset 0 0 0 1px rgba(245,230,200,0.9)
transition: transform .5s cubic-bezier(.22,1,.36,1), ...
```

### Grid layout
```css
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))
/* 1 col mobile | 2 cols tablet | 3 cols desktop — sem media queries */
```

---

## Canva MCP — limitações aprendidas (importante)

| Limitação | Detalhe |
|---|---|
| Candidatos expiram rápido | Chamar `create-design-from-candidate` IMEDIATAMENTE após `generate-design` — não esperar |
| PNG transparente = Pro | Plano free não exporta PNG com `transparent_background: true` |
| Quota diária | `generate-design` tem limite diário no plano free |
| `generate-design-structured` | APENAS para presentations — não usar para ícones |
| Melhor tipo para ícones | `design_type: "logo"` |

**Fluxo correto Canva MCP para ícones:**
1. `generate-design` → obter candidates
2. `create-design-from-candidate` → IMEDIATAMENTE (mesmo turno)
3. `export-design` (PNG sem transparent_background no free)
4. `curl`/`Invoke-WebRequest` para baixar para `src/assets/`

---

## Claude Design — handoff workflow

Quando o resultado de um design Claude Design precisar ser integrado:
1. Felipe entrega ZIP
2. Extrair para `TEMP/` com `unzip`
3. Ler o `README.md` — ele tem a spec completa (tokens, estados, SVGs, comportamentos)
4. O `.html` é protótipo de referência — **não copiar diretamente**, recriar em React
5. Apagar o ZIP e a pasta TEMP depois de integrar

```bash
unzip -o "Arquivo.zip" -d "TEMP/extract"
# ler README.md
# implementar em React
# limpar:
rm -rf TEMP/extract
rm "Arquivo.zip"
```

---

## Fluxo de verificação visual

O preview server (`sunbite`) roda na porta 5173.
`preview_screenshot` tem instabilidade — usar como fallback:
1. `preview_console_logs level: error` → checar erros
2. `preview_snapshot` → confirmar estrutura/texto
3. `preview_eval: window.scrollBy(0, N)` → navegar
4. `preview_screenshot` → visual (pode timeout, tentar 2x)

---

## Próximos passos conhecidos

- [ ] Regenerar ícones Private Celebrations e Markets no Canva quando quota resetar
- [ ] Versão em Alemão (DE) — todo copy em `content.ts`, seletor no Header já reservado
- [ ] Deploy no Vercel
- [ ] Foto real da Romana na RomanaSection (substituir `emblem.jpg`)
- [ ] Datas reais de aparições na FindUsSection
