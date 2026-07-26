---
name: blog-comentarios-supabase-bug
description: "Comentários/curtidas do blog quebradas duas vezes — histórico dos dois incidentes e projeto Supabase correto"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0e79101c-9021-4854-a119-f1f2c51c5e57
---

**Correção importante:** o projeto Supabase do site (`real-vision-site`) é **`xomtfkbvathddfpbknyo`**, não `ghwjetvazmdlaqidgxqi` (esse é o Vision Flow CRM, ver [[project_visionflow_migracao]]). Essa memória tinha o projeto errado até 26/07/2026 — corrigido depois de uma sessão em que isso causou confusão real (migração acidental rodada no projeto do VisionFlow, revertida a tempo).

**Incidente 1 (03/07/2026):** comentários travados em "Carregando..." — Felipe confirmou no painel que era instabilidade interna do próprio Supabase, não bug de código.

**Incidente 2 (26/07/2026):** curtir não fazia nada, comentar dava "Não foi possível enviar". Causa raiz: migração `post_slug`→`post_id` (mesma sessão, ver `docs/seo-internacional/STATUS.md` do repo do site) deixou a coluna antiga `post_slug` como `NOT NULL` — todo insert quebrava com erro de constraint, escondido pela mensagem genérica da UI (nenhum `console.error` nos catches). Fix: `ALTER TABLE ... ALTER COLUMN post_slug DROP NOT NULL` nas duas tabelas + logging de erro real adicionado em `BlogComments.tsx`/`usePostLike.ts` (commit `f9747b0`).

**MCP Supabase não enxerga `xomtfkbvathddfpbknyo`** — só tenho acesso via MCP a `ghwjetvazmdlaqidgxqi` (VisionFlow), `gexacmtkjqectfqwhunv` (rv-acquisition) e 2 projetos inativos. Qualquer alteração de schema no Supabase do site precisa ser rodada pelo Felipe direto no SQL Editor do painel.

**Como aplicar:** se o sintoma voltar, checar (nessa ordem): 1) status do Supabase (Incidente 1), 2) se alguma migração recente deixou coluna `NOT NULL` órfã (Incidente 2), 3) sempre confirmar em qual projeto Supabase (`xomtfkbvathddfpbknyo`) — nunca assumir que é o mesmo do VisionFlow.
