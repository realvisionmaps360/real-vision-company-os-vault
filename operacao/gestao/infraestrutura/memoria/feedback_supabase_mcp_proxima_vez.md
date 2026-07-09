---
name: feedback-supabase-mcp-proxima-vez
description: PRÉ-VOO OBRIGATÓRIO — verificar MCP Supabase conectado antes de qualquer sessão VisionFlow com banco
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3c5c534b-7729-46da-bf2c-26466319a850
---

Toda sessão do VisionFlow que envolva banco de dados (migrações, consultas, inserts, verificações de schema) deve começar verificando se o MCP do Supabase está conectado. O MCP está instalado nas configurações do Claude Code do Felipe — não precisa instalar, só verificar se aparece nas ferramentas disponíveis.

**Why:** Na sessão de 15/06/2026, a regra estava anotada mas não foi aplicada — eu li o contexto e fui direto ao plano sem checar. Felipe questionou explicitamente. Na sessão de 15/06 (Fase 1), o MCP já estava instalado e foi usado para verificar o schema do banco via `execute_sql` (project_id: ghwjetvazmdlaqidgxqi) antes de qualquer código.

**How to apply:**
1. Ao abrir qualquer sessão do VisionFlow, checar se `mcp__6b2358e1-0bc1-4c7d-87cc-36490e99143c__execute_sql` está disponível.
2. Se sim → usar o MCP para qualquer operação de banco (nunca pedir para Felipe copiar SQL manualmente).
3. Se não → avisar Felipe antes de continuar; não propor copiar/colar como alternativa padrão.
4. Project ID do Supabase VisionFlow: `ghwjetvazmdlaqidgxqi`
