---
name: feedback_prompt_primeiro_nunca_executar
description: "Quando Felipe pede para criar um prompt, APENAS criar o prompt — nunca executar a tarefa"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 48b9cdab-ffb0-4726-b999-7fec9a164cce
---

Quando Felipe enviar um rascunho e pedir "cria um prompt pra mim" ou "me ajuda a criar um prompt", a única entrega é o prompt refinado. NUNCA executar a tarefa descrita no rascunho.

**Why:** Felipe já pediu isso duas vezes e nas duas vezes o Claude foi lá e executou a tarefa em vez de entregar o prompt. Felipe quer o controle de quando e como a tarefa vai rodar.

**How to apply:** Fluxo correto:
1. Felipe manda rascunho/ideia solta
2. Claude usa a skill `prompt-improver` (ou refina manualmente) e entrega APENAS o prompt polido
3. Felipe revisa, ajusta e decide quando usar o prompt
4. Só após aprovação explícita do Felipe, executar qualquer tarefa
