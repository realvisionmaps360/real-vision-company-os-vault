---
name: confirmar-projeto-supabase-antes-migrar
description: "Nunca rodar DDL/migração em projeto Supabase sem confirmar contra .env do repo — MCP não cobre todos os projetos"
metadata:
  type: feedback
---

Antes de rodar qualquer `ALTER TABLE`/migração via MCP Supabase, confirmar o `project_id` real batendo com o `.env` (`VITE_SUPABASE_URL`) do repo em questão — nunca assumir que é o mesmo projeto de outro sistema só porque estão na mesma organização.

**Por quê:** em 26/07/2026, migrei acidentalmente `blog_comments`/`blog_post_likes` no projeto `ghwjetvazmdlaqidgxqi` (Vision Flow CRM) achando que era o do site, porque esse projeto por coincidência tinha tabelas com o mesmo nome e dados parecidos (resíduo de setup antigo). O projeto real do site é `xomtfkbvathddfpbknyo` — que o MCP Supabase nem enxerga (não está na lista de `list_projects`). Peguei o erro a tempo e revertei, mas só porque o Felipe percebeu a inconsistência e pediu confirmação.

**Como aplicar:** antes de qualquer DDL, rodar `grep VITE_SUPABASE_URL .env` no repo do projeto (ou consultar `STATUS.md`/skill relacionada) e comparar com o `project_id` que vai receber a migração. Se o MCP não listar o projeto certo (`list_projects`), avisar o usuário e pedir que rode a SQL manualmente no painel — não presumir que outro projeto "parecido" serve.
