---
name: project_email_marketing_hermes
description: Projeto Hermes — agente de email marketing da Real Vision (em construção); onde estão os docs e a regra de atualizar o timeline
metadata: 
  node_type: memory
  type: project
  originSessionId: d86d101e-46d8-4c16-a298-821f374c59c8
---

Projeto **Hermes** — primeiro agente de email marketing da Real Vision (iniciado 23/06/2026).

**Síntese de 4 fontes ("Megazord"):** Jeff Walker (estratégia/9 gatilhos), Hormozi (voz/qualidade/deliverability), Ferdy/OmniSend (máquina/automação), Lead Gen Jay (rodar tudo no Claude Code via skills + banco próprio + skills que se auto-melhoram + reverse lead magnet).

**Decisões (23/06/2026):**
- Nome do agente: **Hermes**; skill será `rv-email`.
- Plataforma: **Resend + Supabase**.
- Público prioritário: **clientes ativos** (relação + upsell; motor "quente", LGPD ok).
- Banco: **tabelas dedicadas só pro email** (separadas do CRM, provável no projeto VisionFlow `ghwjetvazmdlaqidgxqi`).
- Diferencial: email guiado por IA lendo o VisionFlow + reverse lead magnet RV (mini-tour 360°/análise GMN) ligado a [[project_agente_prospeccao]].

**Docs (source of truth):** `operacao/marketing/email-marketing/` → `00-ESTRATEGIA.md`, `01-PLANO-EXECUCAO.md`, `02-TIMELINE.md`.

**Regra ativa:** ao final de toda sessão de trabalho no email marketing, ATUALIZAR o `02-TIMELINE.md` e marcar checkboxes no `01-PLANO-EXECUCAO.md`. Quando os 7 itens da "Definition of Done" estiverem ✅, enviar ao Felipe uma mensagem proativa de PARABÉNS.

Próximo passo: Felipe vai dar OK pra iniciar a Fase 1 (criar a skill do Hermes). Relacionado: [[project_catalogo_servicos]], [[project_visionflow_migracao]].
