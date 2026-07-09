---
name: blog-comentarios-supabase-bug
description: "Comentários do blog não carregavam no preview — confirmado que é bug interno do Supabase, não do código"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0e79101c-9021-4854-a119-f1f2c51c5e57
---

Em 03/07/2026, ao testar o post novo "diferença entre LLM e SLM" (feature de comentários com curtidas, commit `80f6ec9`), a seção de comentários ficou travada em "Carregando comentários..." no ambiente de teste.

Felipe confirmou que entrou no painel do Supabase e verificou que é um **problema interno do próprio Supabase** (eles já estão cientes e tentando resolver) — não é bug no código do site nem na integração feita.

**Como aplicar:** se o sintoma voltar a aparecer, não investigar como bug de código primeiro — checar status do Supabase / aguardar resolução deles. Projeto usado: `ghwjetvazmdlaqidgxqi` (mesmo do [[project_visionflow_migracao]]).
