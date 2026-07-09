---
name: feedback-prompt-improver-nao-executar
description: "Quando Felipe invoca a skill de criar/melhorar prompts, entregar só o prompt refinado — nunca executar a tarefa diretamente"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7c30771e-fb8f-4d78-9bca-0c7157f5ad13
---

Quando Felipe pede para usar a skill de criar prompts (prompt-improver ou qualquer skill de refinamento de prompt), a entrega deve ser **apenas o prompt refinado**, bem estruturado e pronto para ele usar — não a execução da tarefa em si.

**Why:** Felipe quer ter controle sobre o prompt antes de qualquer execução. Já aconteceu duas vezes de eu pular essa etapa e ir direto à execução, o que gerou frustração.

**How to apply:** Se Felipe invoca `/prompt-improver` ou diz "usa a skill de criar prompt", o output da sessão deve terminar com o prompt refinado em texto/markdown. Só executar depois que ele explicitamente aprovar o prompt e pedir para rodar.
