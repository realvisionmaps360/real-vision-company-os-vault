---
id: CHANGELOG
title: Changelog — Real Vision Academy
type: changelog
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - TIMELINE
---

# Changelog — Real Vision Academy

> Histórico de alterações. Formato: data + o que mudou.

## [Publicação] — 2026-07-17 — Fases 1+2 + login global em produção
- OK explícito do Felipe ("pode publicar tudo").
- Commit `7e9526f` (+ `f4efc4d` ajuste de `.gitignore`) direto em `main`, push pro GitHub
  (`realvisionmaps360/real-vision-core`) — deploy automático via integração Vercel.
- `.vercel` local linkado ao projeto de produção correto (`real-vision-website` →
  realvisionmaps.com); **atenção:** o primeiro `vercel link` criou por engano um projeto vazio
  chamado `real-vision-site` na conta — corrigido religando ao projeto certo, mas o projeto vazio
  stray ficou na conta Vercel (não deletado; Felipe pode remover em vercel.com se quiser).
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` setadas em Production no Vercel (antes só existiam
  como fallback hardcoded no código).
- Verificado em produção: `realvisionmaps.com` (200, botão "Entrar" no header) e
  `realvisionmaps.com/academy/admin` (200, guard de login ativo).

## [Fase 1] — 2026-07-17 — Auth unificada + Google OAuth
### Banco (Supabase novo `xomtfkbvathddfpbknyo`)
- Criadas as tabelas `profiles`, `blog_post_likes`, `blog_comments` (vazias — recomeço limpo, D-007).
- Criada RPC `increment_comment_like(uuid)` (security definer).
- RLS ativa nas 3 tabelas (8 policies): leitura pública de likes/comentários; escrita restrita ao
  próprio usuário; `profiles` só o próprio registro. Verificado: insert de like sem login → 401.
### Código (`real-vision-site`)
- `.env` local com `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` do banco novo (gitignored).
- `src/lib/supabase.ts` — fallback repontado do VisionFlow para o banco novo.
- `src/contexts/AuthContext.tsx` (novo) — provider global de sessão (listener único) + `signInWithGoogle`.
- `src/hooks/useAuth.ts` — passou a reexportar o context (fonte única de sessão; API preservada).
- `src/App.tsx` — app envolvido em `<AuthProvider>`.
- `src/components/AuthModal.tsx` — botão "Continuar com Google" + divisor acima do form e-mail/senha.
- Build de produção validado; modal + leitura do banco novo verificados no preview.
### Pendente para publicar (não feito nesta sessão — sem deploy)
- Setar `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` no Vercel (produção).
- Push/deploy só com OK explícito do Felipe.

## [Infra] — 2026-07-17 — Botão de login global no header do site
### Código (`real-vision-site`)
- `src/components/home/HomeNav.tsx` — ícone de conta entre o seletor de idioma e o CTA "Falar com
  Felipe" (desktop) e bloco equivalente no menu mobile. Estados: loading (skeleton), deslogado (abre
  `AuthModal`), logado (`DropdownMenu` com nome/e-mail, "Painel Admin" se `role=admin`, "Sair").
  Único `AuthModal` global reaproveitado por todo o site — antes só existia dentro do fluxo de
  like/comentário do blog e do guard do `/academy/admin`.
- `src/hooks/useIsAdmin.ts` — **bugfix**: trocado `.single()` por `.maybeSingle()`. Usuário logado
  sem linha em `profiles` (não existe criação automática no signup) causava erro 406 sequestrado
  silenciosamente pelo react-query, mas agora que o hook roda globalmente (header) o erro aparecia
  em toda página. `.maybeSingle()` resolve sem lançar; `isAdmin` continua `false` corretamente.
- Traduções `nav.login`/`nav.logout`/`nav.account`/`nav.adminPanel` em `pt`/`en`/`de`.
- Build de produção validado; testado no preview via Playwright: header limpo (deslogado → modal),
  login real → dropdown com "Painel Admin" (usuário admin) → "Sair" volta ao estado deslogado; menu
  mobile confirmado (390×844); tradução `/en` confirmada ("Log in"). Screenshots em
  `TEMP/header-logged-out-clean.png`, `TEMP/auth-modal-opened.png`, `TEMP/dropdown-admin.png`,
  `TEMP/mobile-menu-logged-out.png`.

## [Fase 2] — 2026-07-17 — Modelo de dados + painel admin
### Banco (Supabase novo `xomtfkbvathddfpbknyo`)
- Criadas 7 tabelas: `courses`, `modules`, `lessons`, `materials`, `enrollments`, `lesson_progress`,
  `orders` (conforme [[PRD-002-modelo-de-dados]]). `profiles` da Fase 1 reusada.
- Criada função `public.is_admin()` (security definer) + RLS ativa nas 7 tabelas (17 policies,
  incluindo `profiles_admin_select` — correção descoberta no teste: admin precisa ler perfis dos
  alunos para o painel de matrículas funcionar).
- RLS verificada anon + autenticada (usuários de teste descartáveis, removidos): student não escreve
  no catálogo (403), não vê despublicados, não lê materiais sem matrícula; admin faz o CRUD completo
  e concede matrícula via RLS pura. Detalhe em [[PRD-002-modelo-de-dados]].
- Tabelas de comunidade **não** criadas — adiadas por decisão D-009.
### Código (`real-vision-site`)
- `src/hooks/useIsAdmin.ts` (novo) — lê `profiles.role` do usuário logado.
- `src/pages/academy/AdminAcademy.tsx` (novo) — painel `/academy/admin`: guard por login + role
  admin, abas Cursos e Matrículas, criação de curso.
- `src/components/academy/CourseEditor.tsx` (novo) — CRUD de curso (título, slug, descrição, capa,
  preço, publicado) + módulos + aulas (ordenação ↑↓) + materiais (dialog por aula).
- `src/components/academy/EnrollmentManager.tsx` (novo) — concessão manual de matrícula por e-mail
  + listagem/remoção.
- `src/App.tsx` — rota `/academy/admin` (lazy, PT; fora do menu).
- Build de produção validado; painel verificado no preview via Playwright (login → CRUD curso→
  módulo→aula→material→preço → concessão de matrícula por e-mail, com toasts de confirmação).
  Prints em `TEMP/admin-curso-editor.png` e `TEMP/admin-matriculas.png`.

## [Não versionado] — 2026-07-17
### Adicionado
- Skill `master-visionair` (`Real Vision/skills/master-visionair/SKILL.md`).
- Estrutura documental da Academy (Gaveta B): PROJECT_INDEX, CONTEXT, MASTER_PRD, ARCHITECTURE,
  ROADMAP, TIMELINE, CHANGELOG, DECISIONS, KNOWN_ISSUES, IDEAS, METHODOLOGY_LEARNINGS, GLOSSARY +
  pastas `diagrams/`, `prds/`, `research/`, `references/`.
- Ponteiro `docs/academy/README.md` no repo do site.

## Documentos relacionados
- [[TIMELINE]]
