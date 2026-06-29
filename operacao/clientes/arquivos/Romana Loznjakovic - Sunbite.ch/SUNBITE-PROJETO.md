---
title: Sunbite.ch — Dossiê do Projeto
tags:
  - cliente
  - ativo
  - suica
status: desenvolvimento
data_inicio: 2026-05-01
servicos:
  - site
  - convite-digital
  - identidade-visual
aliases:
  - Sunbite
  - Romana
---

# Sunbite.ch — Dossiê do Projeto

> Cliente da Real Vision 360. Carregue sempre junto com a skill `realvision`.
> Para trabalho no código do site, ativar a skill `sunbite-site`.
> Idioma de trabalho com a cliente: Inglês / Alemão (Hochdeutsch).

Ficha resumida: [[FICHA-CLIENTE]] · Linha do tempo: [[SUNBITE-TIMELINE]]

---

## Quem é

- **Cliente:** Romana Loznjakovic (co-fundadora da Real Vision 360; parceira pessoal do Felipe)
- **Negócio:** SUNBITE — food bike de sobremesas premium
- **Produto único:** Strawberry Chocolate Cups (morangos frescos + chocolate suíço premium) + limonada caseira
- **Mercado:** Suíça (Aarau e região)
- **Contato:** +41 76 583 52 22
- **Localização:** Aarau, Suíça
- **VisionFlow:** id `a1bbaea7-0081-48d1-bdeb-b945aa4794b1` · status `desenvolvimento`
- **Posicionamento:** "Made for Sunny Days" · estética ==retrô-elegante creme + vermelho==

---

## O que foi construído

### 1. Site principal — `sunbite.ch`

Stack obrigatória (detalhes completos na skill `sunbite-site`):

| Tecnologia | Detalhe |
|---|---|
| React 18+ | novo JSX transform |
| Vite | template react-ts |
| TypeScript | strict |
| Tailwind CSS | **v4** (CSS-first via `@theme {}`) — nunca v3 |
| framer-motion | scroll animations (`whileInView`, `viewport: {once:true}`) |
| Fonts | Playfair Display + Plus Jakarta Sans + Pacifico (logo) |

**Design system (tokens em `src/index.css`):**
- `--color-brand: #841412` (vermelho) · `--color-cream: #F5E6C8` · `--color-ink: hsl(1 25% 12%)`
- `--font-display: Playfair Display` · `--font-body: Plus Jakarta Sans` · `--font-script: Pacifico`

**Seções (em ordem):** Header · Hero · Produto (`#product`) · Ingredientes · Sobre Romana (`#about`) · Onde encontrar (`#find-us`) · Eventos/Book (`#book`) · Galeria (`#gallery`) · FAQ · Final CTA · Footer.

- Todo copy centralizado em `src/content.ts`; links em `src/links.ts` (nunca hardcodar).
- BookSection com design editorial (cards com reveal de tagline no hover/tap), ícones SVG inline, grid responsivo sem media queries.

### 2. Convite digital — `sunbite.ch/invitation`

Página **HTML standalone** (não React) para o ==Grand Opening: 18. Juli 2026==.

- **Arquivo:** `public/invitation/index.html` (CSS + JS inline, Motion.js v11 via CDN)
- **4 cards com flip 3D** (face → back) + fly-off entre cards + progress dots
- **Bilíngue DE/EN** com toggle no topo
- **Paleta da marca aplicada** (jun/2026): fundo creme `#F5EBDA`, vermelho `#8B1515`
- **Capa (face):** fundo chocolate escuro para efeito de revelação; logo circular `logo-oficial.png` centrado
- Card 1: mensagem de revelação poética · Card 2: data/hora/local + botões Maps e 360° · Card 3: produto + preço ==CHF 5.—== · Card 4: encerramento + QR placeholder + restart
- **Fix mobile-first (29/06/2026):** `body { height: 100dvh }` + `--vh` JS (iOS), card `92vw × min(175%, 82dvh)`
- Partículas flutuantes + shimmer + reduced-motion guard

**Assets do convite** (`public/invitation/assets/`):
- `logo-oficial.png` — logo circular Sunbite.ch
- `strawberry-cup.png` — copo de morango com chocolate
- `logo-wordmark-tight.png` — wordmark (card 3)

---

## Onde está o código

- **Repo local:** `operacao/projetos/sunbite-site`
- **GitHub:** `realvisionmaps360/sunbite-site`
- **Deploy:** Vercel (auto-deploy a cada push em `main`)
- **URLs:** `https://sunbite.ch` · `https://sunbite.ch/invitation`

> [!danger] Produção ativa
> Site em produção — **nunca** publicar sem OK explícito do Felipe.
> Antes de mexer: `git pull` + `git status`.

### Pasta do cliente (documentação)

`operacao/clientes/arquivos/Romana Loznjakovic - Sunbite.ch/`
- [[SUNBITE-PROJETO]] — este dossiê
- [[SUNBITE-TIMELINE]] — linha do tempo do projeto
- [[FICHA-CLIENTE]] — contexto resumido para início de sessão
- `dados.json` — export do VisionFlow
- `arquivos/fotos/` — logos e fotos da marca

---

## Pendências conhecidas

> [!todo] Convite digital
> - [ ] Toggle DE/EN pequeno demais no mobile — aumentar área clicável ≥ ==44×44px==
> - [ ] QR Code real no card 4 (hoje é placeholder)
> - [ ] Links reais de Google Maps e Tour 360° nos botões do card 2
> - [ ] Endereço exato do evento (hoje "Am Aareufer, Aarau")

> [!todo] Site principal
> - [ ] Versão Alemã (DE) completa (copy em `content.ts`, seletor reservado no Header)
> - [ ] Datas reais de aparições na FindUsSection
> - [ ] Foto real da Romana na RomanaSection (substituir `emblem.jpg`)
> - [ ] Regenerar ícones Private Celebrations e Markets no Canva quando quota resetar

---

## Como trabalhar este cliente

- Código do site → ativar `sunbite-site` + `02-frontend-design` + `motion` + `vercel-react`
- Copy → ativar `rv-copy`; revisar contra a VOZ.md; sem em-dash, capitalização correta
- Comunicação com a cliente: Inglês / Alemão
- Decisões e fatos novos → avisar Felipe antes de atualizar o Company OS
