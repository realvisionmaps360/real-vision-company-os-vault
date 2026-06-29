# Sunbite.ch — Linha do Tempo do Projeto

> Dossiê completo em [[SUNBITE-PROJETO]]. Datas em fuso da Suíça/Brasil conforme registro do VisionFlow.

---

## 2026

### 29/05/2026 — Início
- Lead "Romana" criado no VisionFlow.
- Cliente: Romana Loznjakovic / Sunbite.ch / Aarau, Suíça.

### 11/06/2026 — Onboarding
- Checklist de onboarding criado no VisionFlow (itens pendentes).

### 12/06/2026 — Serviços definidos
- Serviço **Website** adicionado (status: em andamento).
- Serviço **site** registrado.

### 16/06/2026 — Status
- Status do cliente alterado para **Em desenvolvimento**.

### jun/2026 — Site principal
- Briefing da marca (estética retrô, creme + vermelho, "Made for Sunny Days").
- Desenvolvimento do site `sunbite.ch`: React + Vite + Tailwind v4 + framer-motion.
- Seções construídas: Hero, Produto, Ingredientes, Sobre Romana, Onde encontrar, Eventos, Galeria, FAQ, CTA, Footer.
- BookSection redesenhada (design editorial, cards com reveal, ícones via Canva MCP).

### 27/06/2026 — Convite digital v1 (ao vivo)
- Criado `sunbite.ch/invitation` — HTML standalone, 4 cards flip 3D, toggle DE/EN, Motion.js.
- Encoding UTF-8 corrigido, caminhos de assets absolutos, preço CHF 5.—.
- Logo `logo-oficial.png` corrigido/centrado.

### 29/06/2026 — Convite: paleta da marca + fix mobile-first
- Cores dos 4 cards migradas para a paleta da marca: fundo creme `#F5EBDA` + vermelho `#8B1515` (capa mantém chocolate escuro para o efeito de revelação).
- Botões, price-badge e wordmark ajustados à nova paleta.
- **Fix mobile rodada 1:** `min-height: 100dvh` + `--vh` JS + scene `min(92vw, 380px)`.
- **Fix mobile rodada 2:** `body { height: 100dvh }` (container flex fixo) + card `92vw × min(175%, 82dvh)` → card preenche a tela no celular.
- Commits e push para `main` → deploy Vercel.

---

## Próximos marcos
- Ver pendências em [[SUNBITE-PROJETO]] (QR real, links Maps/360°, versão DE do site, datas FindUs).
- **18/07/2026 — Grand Opening** (data do evento no convite).
