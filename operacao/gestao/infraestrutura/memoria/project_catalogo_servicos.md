---
name: project_catalogo_servicos
description: Catálogo de serviços da Real Vision (12 itens) usado como vocabulário de oportunidades por lead
metadata: 
  node_type: memory
  type: project
  originSessionId: 4ad1ce3b-3fa1-4f28-bfb6-973a524ffc24
---

Catálogo oficial de serviços da Real Vision (definido por Felipe em 20/06/2026 ao desenhar o sistema de aquisição). É uma **lista viva** — pode crescer sem mexer em estrutura:

`Cartão Digital` · `Website` · `Landing Page` · `Google Business` · `Google Management` · `AI Chatbot` · `WhatsApp Automation` · `CRM` · `360 Tour` · `Photography` · `Videography` · `Hosting` · `Digital Partner`

**Cartão Digital** (adicionado jun/2026): página de perfil e links do negócio — alternativa profissional ao Linktree. Inclui foto circular, descrição, botões glassmorphism (WhatsApp, Instagram, Tour Virtual, etc.), domínio próprio. Stack: Vite + React + Tailwind. Hierarquia de sites: Cartão Digital → Landing Page → Site Completo → Loja Virtual.

No sistema de aquisição ([[project_acquisition_system_arquitetura]]), cada lead carrega `potential_services` (todas as oportunidades identificadas no negócio) + `lead_offer` (a que está sendo conduzida agora). Isso desacopla o sistema das ofertas atuais: tripwire R$25 = `360 Tour`/`Photography`; Sócio Digital = `Digital Partner` — viram só itens do catálogo. Acquisition Claude pode flagar várias oportunidades dentro do mesmo negócio.
