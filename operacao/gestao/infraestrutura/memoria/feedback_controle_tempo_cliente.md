---
name: feedback-controle-tempo-cliente
description: "Toda sessão de cliente registra tempo investido no TIMELINE.md, para calcular custo/hora do Felipe"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8688db0d-fe1b-4b99-84e6-801eb03a297f
---

A partir de 30/06/2026, toda sessão de trabalho com cliente registra uma estimativa de horas investidas na seção `## Tempo investido` do `TIMELINE.md` do cliente.

**Why:** Felipe quer, no futuro, calcular a média de horas trabalhadas por cliente para entender o custo real da própria hora como programador — métrica que hoje não existe.

**How to apply:** A skill `rv-fim-sessao` (Passo 2) já foi atualizada para perguntar/estimar o tempo da sessão e acrescentar linha na tabela. Local escolhido: `TIMELINE.md` de cada cliente (não skill separada, não memória solta) — porque esse arquivo já é tocado a cada fim de sessão. Primeiro caso aplicado retroativamente: cliente Lafatas (~12h30 estimadas até 28/06/2026, ver `operacao/clientes/arquivos/Alexis Lafatas - Lafatas Grafik/TIMELINE.md`).
