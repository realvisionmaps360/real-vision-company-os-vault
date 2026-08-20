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

### 19/08/2026 — Sunbite entra no portfólio da Real Vision
- Case publicado em `realvisionmaps.com/portfolio/sunbite`, em PT/EN/DE. Commit `48a28f4` no `real-vision-core`.
- Enquadrado como **projeto da própria casa**: a marca foi criada pela co-fundadora e a Real Vision construiu tudo do zero, do posicionamento ao software.
- Ângulo central do case: **negócio móvel não tem endereço** — como ser encontrado sem ter onde ficar. Segundo problema, surgido já com a operação rodando: controlar caixa na rua com dinheiro + TWINT e sem sinal garantido, o que originou o PDV.
- Escopo registrado no case: identidade visual, landing page DE/EN, Google Meu Negócio, Instagram, SEO/GEO, gestão via Company OS + Sócio Digital, e **PDV próprio para celular** (offline-first com sincronização, separa Bargeld de TWINT, interface PT/DE).
- Galeria: food bike, 2 telas do site em alemão, 2 composições do PDV. Prints verticais de celular emoldurados em 4:3 para não serem cortados pela galeria do site.
- Criada a categoria de serviço **"Sistema Sob Medida"** (`customSoftware`) no portfólio — primeiro case da Real Vision com software próprio.
- Confirmado no site e na arquitetura: **topping custa CHF 0.50, Schlagrahm incluído**. Ver divergência apontada abaixo.
- Tempo da sessão: ~1h30 (análise do padrão do portfólio, produção de imagens, redação trilíngue, verificação e publicação).

---

## Pendências levantadas nesta sessão
- **Divergência de preço do Schlagrahm.** O doc `Arquitetura/SUNBITE — 00 Visão Geral.md` (linha 41) diz que o chantilly é *incluído gratuitamente*; o site e o PDV cobram **+CHF 0.50**. Um dos dois está desatualizado — confirmar com a Romana e corrigir a fonte errada.
- **Seção "Sobre Romana" segue oculta** no site desde 28/07/2026 (pedido de sigilo). O case do portfólio cita "nossa co-fundadora" sem nome nem foto, publicado com aprovação do Felipe em 19/08/2026.

---

## Próximos marcos
- Ver pendências em [[SUNBITE-PROJETO]] (QR real, links Maps/360°, versão DE do site, datas FindUs).
- **18/07/2026 — Grand Opening** (data do evento no convite).
