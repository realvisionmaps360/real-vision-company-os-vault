---
name: feedback-verificar-antes-afirmar
description: Nunca afirmar estado do site como fato sem verificar em tempo real — auditorias ficam desatualizadas
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 709f0ede-68e5-4ec1-a4bb-403016a8e2b9
---

Nunca afirmar que algo "está faltando" ou "não existe" no site do cliente com base em auditorias antigas. Auditorias ficam desatualizadas em horas.

**Why:** Em 27/06/2026, durante o trabalho no site lafatas.ch, afirmei que a og:image estava ausente com base na auditoria de 25/06. O site JÁ TINHA a og:image configurada. Felipe ficou com raiva porque estava usando essas informações para apresentar ao cliente. Erro de confiança real.

**How to apply:** Antes de dizer "o site não tem X", verificar o estado atual usando Playwright, screenshot, ou pedir ao Felipe para confirmar o que vê na tela. Sempre dizer "a auditoria de [data] mostrou X — vamos confirmar se ainda é o caso" em vez de afirmar como fato presente. Quando não tiver certeza, dizer explicitamente que não tem certeza.
