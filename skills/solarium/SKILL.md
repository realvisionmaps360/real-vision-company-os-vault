---
name: solarium
description: Carrega o contexto completo do cliente Solarium Aarau (Gabriel Iberg) — primeiro cliente internacional da Real Vision, na Suíça. Use SEMPRE que Felipe disser "Solarium", "Solarium Aarau", "Gabriel", "Aarau", "cliente da Suíça", ou for trabalhar no site, no tour 360°, na landing page de Meta Ads ou em qualquer entrega desse cliente. Carrega histórico, status, modelo de negócio, assets e próximos passos.
---

# Solarium Aarau — Dossiê do Cliente

> Carregue sempre junto com a skill `realvision`. Idioma de trabalho com o cliente: **alemão (Hochdeutsch)**. Romana Loznjakovic é co-responsável pela comunicação em alemão.

---

## Quem é

- **Cliente:** Gabriel Iberg
- **Negócio:** Solarium & Collarium® Aarau — estúdio de bronzeamento self-service
- **Local:** Ziegelrain 18, 5000 Aarau, Suíça
- **Contato:** Tel. 079 888 83 55 · solariumaarau@gmail.com
- **Horário:** Mo–So 06:00–24:00
- **Marco:** **primeiro cliente internacional da Real Vision** — referência para expansão na Suíça/Europa.

### Modelo de negócio (importante para conversão)
1. Cliente chega **sem reserva**
2. Compra créditos na máquina (cartão / TWINT / dinheiro / Bitcoin ATM)
3. Escolhe a máquina e usa
4. **NÃO existe agendamento** — a conversão é **visita física**, não reserva online.

---

## O que já foi entregue ✅

- **Tour Virtual 360°** (Pano2VR) — entregue em 2026
- **Site institucional** — live em **https://aarau-solarium.ch**
  - Stack: React + Vite + Tailwind + Shadcn/UI + i18n **DE/EN** · Deploy Vercel
  - 8 rotas: `/`, `/wie-funktioniert-es`, `/geraete`, `/vitamin-d`, `/tipps`, `/tour-360`, `/kontakt`, legais
  - Origem: projeto Lovable (já migrado para repo próprio)

### Onde está o código
- **Repo local:** `operacao/projetos/solariumaarau`
- **Repo GitHub:** `https://github.com/realvisionmaps360/solariumaarau-12006307`
- ⚠️ Antes de mexer no código: `git pull` no repo local + checar `git status`.
- ⚠️ Site em produção — **nunca** publicar sem OK explícito do Felipe.

### Pasta do cliente (documentação)
`operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/`
- `AUDITORIA-CRO-SOLARIUM.md` — auditoria CRO completa do site (baseada em código real)
- `RELATORIO-LANDING-PAGE-META-ADS.md` — contexto e escopo da landing page
- `TIMELINE-DESENVOLVIMENTO-LANDING-PAGE.md` — cronograma de 7 fases
- `Proposta_Angebotsübersicht Solarium Aarau.pdf` — proposta (Angebotsübersicht)

---

## Projeto em andamento 🟡 — Landing Page para Meta Ads

**Pedido:** Gabriel quer uma landing page focada em conversão para campanhas de Meta Ads ("mais clientes novos"). Não substitui o site — roda em paralelo.

- **Rota planejada:** `/willkommen` (ou `/erste-besuch`)
- **Objetivo:** converter tráfego frio (Meta Ads / QR) em **primeira visita física**
- **Escopo de conteúdo/branding/fotos:** reaproveitar 100% do que já existe (9 fotos de estúdio + tour 360° + componentes React).
- **Estrutura sugerida (da auditoria CRO):** Hero com urgência ("Jetzt geöffnet", endereço, "Route starten") → 3 passos → prova social (Google Reviews) → bônus de boas-vindas (50→55, 100→120, 200→250 CHF) → preview tour 360° → CTA final com mapa.
- **Faixa de preço discutida:** CHF 1.000–1.500 (varia com tracking + ad management + manutenção).

### Escopo definitivo (decisões tomadas em 28/06/2026)

Gabriel respondeu em 17/06 via WhatsApp: *"É tudo muito complexo; gostaria de deixar por sua conta a forma como vamos organizar isso."* — delegou 100% das decisões à Real Vision.

| Ponto | Decisão |
|-------|---------|
| **Domínio** | Rota `/willkommen` no site atual (zero custo extra, mesmo Vercel/repo) |
| **Tracking** | Meta Pixel + GA4 INCLUÍDOS — obrigatório para qualquer campanha |
| **Gestão de ads** | NÃO incluída — Gabriel gere os próprios; add-on futuro opcional |
| **Manutenção** | Projeto único — entrega e fim; pontual cobrado à parte |

**Preço: a definir com Romana** (referência Felipe: ~CHF 300)
- Romana confirma antes do envio da proposta ao Gabriel

### Histórico financeiro (VisionFlow — todos em BRL, pagos)
- 2 Vídeos YouTube + Tour: R$6.400
- Novo Site: R$2.553
- Tour Correção: R$638
- Anuidade Hospedagem: R$1.021
- Total histórico: R$10.612 (~CHF 1.930)

### Status atual (28/06/2026)
Fase 0 ✅ Concluída. **Desenvolvimento em andamento.** Próximo passo: `/willkommen` sendo construída → deploy Vercel provisório → enviar link + proposta (preço a confirmar com Romana) ao Gabriel.

---

## Pontos pendentes herdados do site atual
- **Impressum incompleto:** nome do proprietário (`[Name]`) e UID (`[UID-Nummer]`) são placeholders.
- **Sem prova social:** nenhum Google Reviews/depoimento no site (maior oportunidade de CRO).
- Quick wins listados na auditoria (CTA do hero, "Aberto agora", bônus no topo, preview 360° na home).

---

## Como trabalhar este cliente
- **Comunicação com Gabriel:** sempre em **alemão**, via Romana.
- **Código:** ativar `frontend-design` + `motion` + `vercel-react`; reaproveitar componentes existentes.
- **Copy alemã:** revisar contra o tom do site atual; padrão Hochdeutsch.
- **Decisões/novos fatos:** avisar Felipe antes de atualizar Company OS.
- Ao retomar, **comece confirmando se Gabriel já respondeu as 4 perguntas** — é o que destrava tudo.
