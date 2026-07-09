---
name: feedback-projeto-dentro-pasta-cliente
description: "Regra global — projetos de clientes ficam dentro da pasta do próprio cliente, não em operacao/projetos/"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 460a9261-d961-4170-9ee6-1da06dbc5fd6
---

Projetos criados para clientes ficam em `operacao/clientes/arquivos/[Nome-do-Cliente]/site/` (ou subpasta equivalente), **nunca** em `operacao/projetos/`.

**Why:** Felipe quer manter tudo do cliente junto — briefing, arquivos e código — numa pasta única por cliente. Decisão tomada em jun/2026 ao iniciar projeto MSV Aarau.

**How to apply:** Sempre que criar um projeto web/app para um cliente, inicializar dentro de `operacao/clientes/arquivos/[Nome-do-Cliente]/`. Se a pasta do cliente não existir, criá-la primeiro. Isso vale para qualquer cliente, não só MSV Aarau.
