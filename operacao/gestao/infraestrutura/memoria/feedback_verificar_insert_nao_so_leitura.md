---
name: verificar-insert-nao-so-leitura
description: "Teste manual pós-migração de schema precisa cobrir insert/delete de verdade, não só leitura"
metadata:
  type: feedback
---

Depois de qualquer migração de coluna/schema (trocar chave, renomear campo), "testei e funcionou" só vale se o teste cobriu um **insert ou delete de verdade** — não só um select. Um select vazio parece "correto" mesmo quando todo insert está quebrado por uma constraint (ex: coluna antiga ainda `NOT NULL` depois de trocar de chave, ver [[project_blog_comentarios_supabase_bug]]).

**Por quê:** no incidente do blog (26/07/2026), a verificação registrada no `STATUS.md` foi "like count 0 correto" — um falso positivo, porque só testou leitura. O bug (insert quebrando por `post_slug NOT NULL`) ficou invisível até o usuário reportar dias depois.

**Como aplicar:** ao validar qualquer mudança que envolva escrita no banco (curtir, comentar, criar registro), o teste manual tem que efetivamente clicar/enviar e confirmar que o dado persistiu — não só que a página carregou sem erro visível.
