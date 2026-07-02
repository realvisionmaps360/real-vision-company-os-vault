# Auditoria CRO Completa — Solarium Aarau

> Ficha do cliente: [[FICHA-CLIENTE]]

**Data:** 2026-06-24  
**Objetivo:** Aumentar visitas físicas e clientes recorrentes  
**Site:** https://www.aarau-solarium.ch  
**Stack:** React + Vite + i18n (DE/EN) + Tailwind + Shadcn/UI + Vercel

---

## 1. Análise do Repositório

### Arquitetura
- **Tipo:** SPA React (Vite), roteamento com React Router
- **Páginas:** 8 rotas públicas + páginas legais
- **Internacionalização:** PT-BR não implementado, apenas DE e EN
- **Deploy:** Vercel com `vercel.json`

### Páginas existentes
| Rota | Página | Propósito |
|------|--------|-----------|
| `/` | `Index.tsx` | Homepage — hero, 3 passos, fluxo visual, vídeo, bônus, Collarium, VitaminD, Bitcoin |
| `/wie-funktioniert-es` | `WieFunktioniertEs.tsx` | Como funciona em detalhe — principal CTA do header |
| `/geraete` | `Geraete.tsx` | Cabines + preços interativos + FAQ |
| `/vitamin-d` | `VitaminD.tsx` | Conteúdo educacional sobre Vitamina D |
| `/tipps` | `Tipps.tsx` | Dicas de uso + tabela por tipo de pele |
| `/tour-360` | `Tour360.tsx` | Tour virtual + galeria com 9 fotos |
| `/kontakt` | `Kontakt.tsx` | Contato, mapa, formulário (→ WhatsApp) |
| `/impressum`, `/datenschutz`, `/agb` | `Legal.tsx` | Páginas legais |

---

## 2. Inventário de Assets

### Imagens (todas `.webp`, otimizadas)
| Arquivo | Usado em |
|---------|----------|
| `hero-collarium.webp` | Homepage hero, VitaminD |
| `hero-fachada.webp` | WieFunktioniertEs hero |
| `geraete-hero.webp` | Geraete hero |
| `kontakt-hero.webp` | Kontakt hero |
| `tipps-hero.webp` | Tipps hero |
| `kabine-1/2/3/5.webp` | Cards de cabines em Geraete |
| `studio/foto-01` até `foto-09.webp` | Galeria no Tour360 (9 fotos reais do estúdio) |
| `studio-control-terminal.webp` | Fluxo visual na Homepage e WieFunktioniertEs |
| `studio-control.webp` | WieFunktioniertEs (passo 3) |
| `vitamind-bodies.webp` | Silhuetas VitaminD |
| `vitamind-collarium.webp` | Studio section VitaminD |
| `vitamind-winter.webp` | Sessão inverno VitaminD |
| `twint.webp`, `credit-card.webp`, `note-10chf.webp` | Métodos de pagamento |
| `bitcoin-atm-kypro.webp`, `logo-bitcoin.webp`, `logo-ethereum.webp` | Bitcoin ATM section |
| `studiokarte.webp`, `suncash-machine.webp` | Pagamento com dinheiro |
| `tour-preview.webp` | Preview do tour 360° |
| `solarium-logo.webp` | Header logo |

### Assets ocultos / não utilizados
- `solarium-teaser.webp` — importado mas sem uso visível
- `vitamind-bodies-raw.webp` — versão "raw" não usada

---

## 3. Inventário de Componentes

### Componentes customizados (reutilizáveis)
| Componente | Funcionalidade |
|------------|---------------|
| `CabinePriceSelector.tsx` | Seletor interativo de tempo + cálculo de preço |
| `WhatsAppButton.tsx` | Chatbot flutuante com quick replies |
| `PageHero.tsx` | Hero genérico com parallax |
| `SpotlightCard.tsx` | Card com efeito spotlight |
| `InteractiveHoverButton.tsx` | Botão com efeito hover animado |
| `NavLink.tsx` | Link de navegação com estado ativo |
| `ScrollToTop.tsx` | Scroll para o topo na troca de rota |
| `VitaminDBodies.tsx` | Silhuetas visuais |
| `SEOManager.tsx` | Gerencia `<title>` e `<meta description>` |
| `LanguageSwitcher.tsx` | Troca DE/EN |
| `TikTokIcon.tsx` | Ícone SVG TikTok |

### Biblioteca UI (Shadcn — completa)
Accordion, Alert, Badge, Button, Card, Dialog, Drawer, Form, Input, Label, Select, Sheet, Skeleton, Tabs, Textarea, Toast — maioria não usada ativamente.

---

## 4. Inventário de Copy (DE)

### Mensagens-chave por página

**Homepage:**
- Hero: *"Solarium & Collarium® Aarau — Modern. Einfach. Selbstbedienung."*
- CTA primário: *"Wie funktioniert es?"*
- Bônus: *"Mehr bräunen – mehr Bonus erhalten"*

**Como funciona:**
- Pagamento recomendado: Karte / TWINT
- Pagamento alternativo: Bargeld + Studiokarte

**Geräte:**
- *"Unsere Geräte — Leistungsfähige und top-gewartete Solarien und Collarien"*
- 4 cabines com preços interativos

**Kontakt:**
- Horário: Mo–So 06:00–24:00
- Endereço: Ziegelrain 18, 5000 Aarau
- Telefone: 079 888 83 55
- Email: solariumaarau@gmail.com

---

## 5. Elementos de Confiança Existentes

✅ **Já presentes:**
- Horário em destaque (footer e Kontakt)
- Endereço físico com Google Maps
- Telefone clicável
- 2 vídeos tutoriais reais no YouTube
- Galeria com 9 fotos reais
- Tour Virtual 360°
- Chatbot WhatsApp
- Logos de pagamento
- FAQ em 3 páginas
- Equipamentos Ergoline nomeados
- Instagram e TikTok
- Tabela de tipos de pele

❌ **Ausentes (oportunidades):**
- Nenhum Google Reviews
- Nenhum depoimento de cliente
- Nenhum número de clientes atendidos
- Nenhuma foto do proprietário/equipe
- Nenhum selo de higiene
- "Aberto agora" em tempo real

---

## 6. Análise de Conversão Atual

### Objetivo do site
Converter visitante online → visita física ao estúdio.

### Problemas críticos identificados

**A. CTA principal leva para longe da conversão**
O botão do hero é *"Wie funktioniert es?"* — leva o usuário para página explicativa antes de qualquer incentivo. Um primeiro visitante precisa de motivação para visitar, não mais leitura.

**B. Nenhuma urgência ou gatilho de visita imediata**
Nada na homepage diz: *"Estamos abertos AGORA até meia-noite"*, *"Venha hoje sem reserva"*, *"5 minutos do centro"*. Horário existe no footer mas é apenas informação.

**C. Bônus enterrado no meio da página**
A proposta de bônus (50→55, 100→120, 200→250 CHF) é diferencial poderoso, mas aparece na 5ª seção e nunca é usada como argumento de aquisição.

**D. WhatsApp chatbot não otimizado para conversão**
O chatbot existe mas não tem quick reply direto tipo *"Quero visitar hoje"* ou *"Como chegar?"*. Fluxo inicial não foi mapeado para objetivo de visita física.

**E. Página de contato exige demais**
Formulário pede nome + email + mensagem para enviar via WhatsApp. Fricção desnecessária para quem quer apenas endereço ou horário.

**F. Nenhuma prova social visível**
Nem na homepage, nem em nenhuma página existe avaliação, star rating, ou testemunho. Para negócio de visita física, prova social é o maior acelerador.

**G. Tour 360° isolado**
Tour virtual é ativo poderoso para reduzir ansiedade do primeiro visitante, mas está em rota separada. Deveria ter preview na homepage.

**H. Impressum incompleto**
Nome do proprietário aparece como placeholder `[Name]` e UID como `[UID-Nummer]`. Afeta confiança se visitantes acessarem página legal.

---

## 7. Oportunidades Perdidas

| Oportunidade | Impacto |
|---|---|
| Google Reviews widget na homepage | Alto — prova social para visita física |
| "Aberto até meia-noite" no hero | Alto — urgência e diferenciação |
| Bônus como argumento de 1ª visita | Alto — incentivo à conversão |
| Preview do tour 360° na homepage | Médio — reduz ansiedade |
| Quick reply "Como chegar?" no chatbot | Médio — atalho para visita |
| CTA "Venha hoje" após o bônus | Médio — fecha o funil |
| Foto exterior do estúdio na homepage | Médio — reconhecimento físico |
| Número de sessões/clientes como social proof | Médio — validação de escala |
| `solarium-teaser.webp` (não usada) | Baixo — asset disponível |

---

## 8. Quick Wins (Implementar Agora)

**QW1 — Adicionar horário + endereço no hero**
Abaixo do subtítulo, uma linha: `📍 Ziegelrain 18, Aarau · Mo–So 06:00–24:00 · Sem reserva`

**QW2 — Trocar CTA do hero**
De: *"Wie funktioniert es?"* Para: *"Jetzt besuchen"* com link para `/kontakt`

**QW3 — Mover Bônus para o topo**
Colocar tabela de bônus após os 3 passos, antes do fluxo visual.

**QW4 — Preview do Tour 360°**
Adicionar seção compacta com `tour-preview.webp`, entre Collarium e Bitcoin.

**QW5 — Quick reply "Wie komme ich hin?" no chatbot**
Adicionar resposta com endereço + link Google Maps.

**QW6 — Completar Impressum**
Preencher nome e UID nos campos legais.

**QW7 — Simplificar contato para visita**
Botões "Direkt anrufen" e "Route starten" no topo da seção, antes do formulário.

---

## 9. High-Impact Changes

**H1 — Bloco de Google Reviews na homepage**
Adicionar entre Bônus e Collarium 3 reviews reais do Google com estrelas.

**H2 — Seção "Por que visitar hoje?" no hero**
Após CTA principal, 3 bullets:
- ⏰ Aberto todos os dias 06:00–24:00
- 📍 5 minutos do centro de Aarau
- 🎁 Bônus de até 50 CHF no primeiro carregamento

**H3 — Landing page específica para primeira visita**
*(detalhes na seção abaixo)*

**H4 — Widget "Aberto agora" dinâmico**
Componente que verifica horário local e exibe status em tempo real.

---

## 10. Estrutura Sugerida para Landing Page

> Baseada 100% em componentes e assets existentes.

**Objetivo:** Converter tráfego frio (Meta Ads, QR code) em primeira visita física.

**Rota sugerida:** `/willkommen` ou `/erste-besuch`

### Estrutura:

**Seção 1 — Hero com urgência**
- Headline: *"Perfekte Bräune – heute noch, ohne Anmeldung"*
- Sub: *"Täglich von 06:00 bis 24:00 – Ziegelrain 18, Aarau"*
- Badge: "● Jetzt geöffnet"
- CTA primário: "Route starten" → Google Maps
- CTA secundário: "Wie funktioniert es?"

**Seção 2 — 3 passos simplificados**
- Reusar SpotlightCard + copy existente

**Seção 3 — Prova social**
- 3 Google Reviews reais + estrelas

**Seção 4 — Bônus de boas-vindas**
- Cards existentes mostrando vantagem de 1ª visita

**Seção 5 — Tour 360° preview**
- `tour-preview.webp` + link

**Seção 6 — CTA final com mapa**
- Mapa embed + "Route starten" + horários

---

## Resumo de Prioridades

| # | Ação | Esforço | Impacto |
|---|------|---------|---------|
| 1 | Adicionar horário + endereço no hero | Baixo | Alto |
| 2 | Trocar CTA do hero para visita | Baixo | Alto |
| 3 | Widget "Aberto agora" dinâmico | Baixo | Alto |
| 4 | Google Reviews na homepage | Médio | Muito alto |
| 5 | Quick reply "Como chegar?" no chatbot | Baixo | Médio |
| 6 | Completar Impressum | Mínimo | Médio (confiança) |
| 7 | Preview do Tour 360° | Baixo | Médio |
| 8 | Landing page `/willkommen` | Médio | Muito alto (tráfego pago) |

---

**Análise 100% baseada em código real — zero suposição.**
