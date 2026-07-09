---
name: feedback-proposta-cidade-do-cliente
description: "Capa da proposta comercial usa sempre a cidade do cliente, nunca a base da Real Vision"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7c973133-f80a-483d-b1ec-c72ffa5b908f
---

Na capa das propostas comerciais (`proposta-comercial`), o rodapé com cidade + data deve sempre usar a **cidade do cliente**, nunca a base de operação da Real Vision (São Bernardo do Campo-SP ou Aarau-Suíça) nem a cidade de outro projeto de portfólio.

**Why:** a proposta do William (Wood Art, São Bernardo do Campo-SP) foi gerada em 07/07/2026 com "Bahia" na capa — errado. A causa foi um campo `[Cidade]` ambíguo no `SKILL.md` da `proposta-comercial`, sem instrução de origem, e a IA chutou "Bahia" puxando de outros projetos de portfólio concentrados lá, sem checar a pasta do cliente (que já tinha a cidade certa em `WOOD-ART-SITE-DIAGNOSTICO.md`).

**How to apply:** ao gerar qualquer proposta comercial, perguntar a cidade do cliente na Etapa 1 de coleta de dados (ou puxar de arquivo já existente na pasta do cliente, confirmando com o Felipe) antes de montar a capa. Corrigido no `SKILL.md` da `proposta-comercial` em 08/07/2026. Ver [[project_william_wood_art]].
