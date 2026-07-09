---
name: project_acquisition_claude_role
description: "Mission 1 concluída — papel \"Acquisition Claude\" (maestro de prospecção) definido e aprovado"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4ad1ce3b-3fa1-4f28-bfb6-973a524ffc24
---

Mission 1 do sistema de aquisição da Real Vision está **concluída e aprovada** (jun/2026). Definiu o papel **Acquisition Claude** em `operacao/prospeccao/ACQUISITION-CLAUDE.md`.

É um maestro que aciona [[project_agente_prospeccao]] (skills `clarisso` = achar+qualificar, `rv-prospeccao` = abordar) e `rv-relatorio`. Pontua cada lead com **Opportunity Score (0-100)** = 4 sub-scores de 25 (Need / Authority-Size / Remote Fit / Contactability) + motivos. Mantém o tracker, recomenda a passagem pro VisionFlow quando o lead esquenta, e gera relatório semanal **em texto** (7 partes).

Ele **prepara a venda, não vende**: nunca fecha, nunca cota preço, nunca dispara mensagem (tudo é rascunho), nunca inventa dado. A arquitetura de dados desse sistema é a Mission 2 → [[project_acquisition_system_arquitetura]].
