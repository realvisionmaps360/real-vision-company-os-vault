---
id: KNOWN_ISSUES
title: Problemas Conhecidos & Riscos — Real Vision Academy
type: known_issues
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ARCHITECTURE
---

# Problemas Conhecidos, Limitações e Riscos

> Lista centralizada. Atualizar quando surgir novo risco ou quando um item for resolvido.

## Técnicos (base atual)
- **KI-01 — ✅ RESOLVIDO (Fase 1, 2026-07-17).** `supabase.ts` repontado pro banco novo; recomeço
  limpo (D-007), sem migração de dados.
- **KI-02 — ✅ RESOLVIDO (Fase 1).** Google OAuth habilitado no painel + botão no `AuthModal` +
  `signInWithGoogle` no `AuthContext`. Falta só testar o redirect real em produção.
- **KI-03 — ✅ RESOLVIDO (Fase 1).** `AuthContext` global criado (listener único); `useAuth` agora
  consome o context.
- **KI-04 — ✅ RESOLVIDO (Fase 1).** Fluxo de like/comentário auditado e recriado no banco novo com
  RLS; verificado no preview (leitura 200, insert sem login 401).
- **KI-07 — ✅ RESOLVIDO (2026-07-17).** `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` setadas no
  Vercel (produção) e Fases 1+2 publicadas com OK do Felipe. Likes/comentários antigos de produção
  somem (esperado, D-007).

## Operacionais / pendências de acesso
- **KI-05 — ✅ RESOLVIDO.** Credenciais recebidas. Nota: o MCP Supabase não alcança o projeto novo
  (conector OAuth em outra conta) → usar a **Management API** com o PAT (ver [[CONTEXT]] "Nota
  operacional"). Segredos em `TEMP/ggg.txt` — limpar após uso.

## Fase 2
- **KI-08 — Nenhum usuário tem role `admin` ainda.** O painel `/academy/admin` só libera com
  `profiles.role = 'admin'`. Ao Felipe logar pela primeira vez no banco novo, promover via SQL:
  `update profiles set role = 'admin' where email = '<email do Felipe>';`
- **KI-11 — Nenhuma linha em `profiles` é criada automaticamente no signup.** Não existe trigger em
  `auth.users` nem insert client-side em `signUp`/`signInWithGoogle`. Um usuário real que se cadastra
  hoje fica sem perfil até alguém inserir manualmente — isso já afetava `BlogComments.tsx` (Fase 1,
  nome do autor) e agora também o `useIsAdmin` global (Infra login, 2026-07-17; mitigado com
  `.maybeSingle()` para não gerar erro, mas o usuário seguirá sem nome/role até ter perfil). Fix
  correto: trigger `on auth.users insert` → cria `profiles` automaticamente. Não implementado ainda —
  fora do escopo das tarefas já entregues.
- **KI-09 — Sem arquivo de migração no repo.** O schema da Fase 2 foi aplicado direto no banco via
  Management API; a fonte para recriação é [[PRD-002-modelo-de-dados]] (contém o desenho completo).
- **KI-10 — Upload de arquivos não existe no admin.** Materiais tipo `pdf`/`download` aceitam URL;
  storage (Supabase Storage vs. outro) será decidido na Fase 3 junto com D-006.

## Metodologia
- **KI-06 — Obsidian CLI exige Obsidian aberto.** O comando `obsidian` está instalado, mas só opera
  com o app aberto. Fallback: edição direta dos `.md` (mesma estrutura). Ver [[master-visionair]].

## Decisões em aberto (não são problemas, mas travam fases)
- Gateway de pagamento → [[pagamento]].
- Hospedagem de vídeo → [[video-hosting]].

## Documentos relacionados
- [[ARCHITECTURE]]
- [[CONTEXT]]
