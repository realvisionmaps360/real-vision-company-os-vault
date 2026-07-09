---
name: feedback-visionflow-git-antes-banco
description: "No VisionFlow, sempre verificar git status antes de inserir dados no banco — código e banco precisam estar em sincronia"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0f61d61a-49fd-411c-afbf-3795157c50b0
---

No VisionFlow, rodar `git status` ANTES de qualquer inserção no banco via MCP Supabase.

**Por que:** Em 23/06/2026, arquivos foram modificados localmente mas não commitados. Dados foram inseridos no banco dependendo desse código novo. A Vercel continuou servindo o bundle antigo. Resultado: tela branca (crash `TypeError: Cannot read properties of undefined (reading 'icon')`) na ficha do cliente Eduardo Barqueiro.

**How to apply:** Se `git status` mostrar arquivos com `M` (modificados): commitar e fazer push ANTES de inserir dados que dependem desse código. A Vercel demora ~1-2 min para redeployar após o push.

Ver [[feedback_supabase_mcp_proxima_vez]] para o checklist completo de pré-voo do VisionFlow.
