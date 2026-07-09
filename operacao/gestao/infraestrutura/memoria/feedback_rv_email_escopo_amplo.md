---
name: feedback-rv-email-escopo-amplo
description: rv-email (Hermes) não é só pra campanha de marketing — é a infraestrutura real de envio (Resend+Supabase) e se aplica a qualquer situação de comunicação por email com cliente
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 74e208eb-2cc4-49d8-9e6e-f07cd51f5368
---

A skill `rv-email` (Hermes) tem escopo mais amplo do que "email marketing". Ela é a única skill da Real Vision com infraestrutura real de envio (Resend + Supabase, DNS verificado em realvisionmaps.com) — diferente de skills como `rv-relatorio`, que só geram o documento mas não têm mecanismo de disparo automático.

**Why:** No projeto do relatório mensal do Gabriel (Solarium Aarau, jul/2026), montei o rascunho de email só com base em `rv-relatorio` + `realvision` + `solarium` e esqueci de checar `rv-email`. Felipe apontou que ela também se aplicava — não pra mandar campanha, mas porque (a) tem as regras de voz/estrutura de email (assunto A/B, preview text, P.S., loop de autocrítica) que qualquer email de cliente deveria seguir, e (b) é a peça de infraestrutura que resolveria "envio automático" de verdade, se um dia isso for necessário.

**How to apply:** Sempre que a tarefa envolver **qualquer email para cliente** — não só campanha/sequência — considerar `rv-email` como candidata: pelo menos pelas regras de voz e estrutura, e potencialmente pela infraestrutura de envio se o pedido for sobre automação/recorrência. Ver também [[feedback_rv_skill_scout]].
