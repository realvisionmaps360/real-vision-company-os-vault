---
id: TIMELINE
title: Timeline — Real Vision Academy
type: timeline
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ROADMAP
  - CHANGELOG
---

# Timeline — Real Vision Academy

> Registro cronológico do desenvolvimento. Cada marco: data · objetivo · atividades · decisões · próximos passos.

## 2026-07-17 — Kickoff e fundação documental
- **Objetivo:** iniciar o projeto conforme a Master Engineering Directive + adendo Master Visionair.
- **Atividades:**
  - Leitura das duas diretivas.
  - Rodada de perguntas com o Felipe (16 perguntas) → decisões travadas.
  - Análise da base existente (`real-vision-site`).
  - Criação da skill [[master-visionair]].
  - Criação da estrutura documental (Gaveta B) neste vault.
  - Escrita de [[MASTER_PRD]], [[ARCHITECTURE]], [[ROADMAP]], [[DECISIONS]], [[CONTEXT]].
- **Decisões:** D-001 (mesmo repo), D-002 (Supabase unificado), D-003 (curso avulso), D-004 (docs no vault).
- **Próximos passos:** pesquisas [[pagamento]] e [[video-hosting]]; aprovação do Felipe; abrir Fase 1.

## 2026-07-17 — Pesquisa técnica, conferência de alinhamento e mapa de bloqueadores
- **Objetivo:** concluir as pesquisas pendentes e preparar a virada para execução (via Fable 5).
- **Atividades:**
  - Pesquisa real de mercado para [[pagamento]] (Stripe/Mercado Pago/PagSeguro/Kiwify/Hotmart).
  - Pesquisa real de mercado para [[video-hosting]] (Bunny Stream/Vimeo/Supabase Storage).
  - Felipe escolheu **Stripe** → registrado como D-005.
  - Vídeo (D-006) — Felipe optou por **decidir depois**; recomendação Bunny Stream permanece em pé.
  - Conferência de alinhamento entre o plano e o Goal oficial (Directive §12 + Adendo §12) — resultado:
    10/13 critérios já endereçados no plano ou entregues, 3 em andamento saudável (dependem de
    implementação). Nenhum desalinho de escopo encontrado, exceto confirmar se "comunidade" fica
    mesmo fora do MVP (ainda em aberto).
  - Confirmado explicitamente com o Felipe: **nenhuma execução/código/deploy realizado ainda** —
    fase 100% de planejamento e documentação.
  - Mapeados os bloqueadores para iniciar a Fase 1 (ver [[CONTEXT]] "Pendências para execução").
- **Decisões:** D-005 (Stripe).
- **Próximos passos:** Felipe resolve os bloqueadores 🔴 (aprovação do PRD/Roadmap, anon key do
  Supabase novo, Google OAuth habilitado, decidir como aplicar o schema no banco) e os 🟡
  (comunidade fora do MVP?, migrar ou recomeçar o login do blog). Depois disso, transformar o plano
  da Fase 1 num prompt de execução para o **Fable 5** rodar, com um `/goal` guiando o escopo.

## 2026-07-17 — Fase 1 executada: auth unificada + Google OAuth
- **Objetivo:** repontar o app para o Supabase novo, unificar a auth e adicionar login com Google.
- **Decisões da sessão:** D-007 (recomeçar limpo o login do blog), D-008 (Fase 1 sem Fable 5).
- **Atividades:**
  - Credenciais recebidas do Felipe (anon key + service_role + PAT + Google Client ID/Secret); Google
    OAuth já habilitado por ele no painel do Supabase novo.
  - MCP Supabase não alcança o projeto novo (conector OAuth em outra conta) → schema aplicado via
    **Management API do Supabase** com o PAT. Criadas 3 tabelas + RPC + RLS (8 policies) no banco novo.
  - Código: `.env`, `supabase.ts` repontado, `AuthContext` global novo, `useAuth` reexportando o
    context, `AuthProvider` no `App.tsx`, botão Google no `AuthModal`.
  - Verificação: build ok; preview mostrou o modal com botão Google; REST anon do banco novo respondeu
    200 para leitura de likes/comentários e 401 para insert sem login (RLS ok).
- **Próximos passos:** setar env vars no Vercel + deploy (com OK do Felipe). Depois, abrir Fase 2
  (modelo de dados completo + painel admin) — candidata a usar o **Fable 5**.

## 2026-07-17 — Fase 2 executada: modelo de dados + painel admin (Fable 5)
- **Objetivo:** catálogo de cursos gerenciável — tabelas + RLS no banco novo e painel `/academy/admin`.
- **Decisões da sessão:** D-009 (tabelas de comunidade adiadas — sem spec, YAGNI).
- **Atividades:**
  - Schema da Fase 2 aplicado via Management API: 7 tabelas + `is_admin()` + 16 policies RLS.
    Documentado em [[PRD-002-modelo-de-dados]].
  - RLS verificada anon + autenticada com usuários de teste descartáveis (student bloqueado no
    catálogo; admin CRUD completo via RLS pura). Painel validado ponta a ponta no preview via
    Playwright, incluindo concessão de matrícula por e-mail. Descoberta e corrigida a policy
    faltante `profiles_admin_select` (admin não enxergava perfis de alunos).
  - Painel admin construído: `AdminAcademy` (guard login+role, abas), `CourseEditor` (curso→módulos→
    aulas→materiais→preço), `EnrollmentManager` (matrícula manual por e-mail), hook `useIsAdmin`.
  - Rota `/academy/admin` adicionada; build de produção ok.
- **Próximos passos:** dar role `admin` ao usuário do Felipe; publicar Fases 1+2 (env vars Vercel +
  deploy com OK); abrir Fase 3 (área de membros + player — depende de D-006 vídeo).

## 2026-07-17 — Login global no header do site
- **Objetivo:** o site não tinha nenhum ponto de entrada de login visível — só triggers contextuais
  no blog e no painel admin. Felipe confirmou: header global, reaproveitando o mesmo login pra blog e
  Academy.
- **Atividades:**
  - Explorado o repo (`HomeNav.tsx`, `AuthModal`, `AuthContext`) para mapear padrões reaproveitáveis
    antes de planejar.
  - Adicionado ícone de conta no header (desktop) e bloco equivalente no menu mobile: estado
    deslogado abre `AuthModal`; estado logado mostra `DropdownMenu` (nome/e-mail, "Painel Admin" se
    admin, "Sair").
  - Bug real encontrado no teste: `useIsAdmin` usava `.single()`, que lança 406 quando o usuário
    logado não tem linha em `profiles` — antes só visível na página admin, agora visível globalmente.
    Corrigido para `.maybeSingle()`. Causa raiz registrada como KI-11 (sem trigger de criação
    automática de perfil no signup) — não corrigida, fica pra antes do lançamento público.
  - Testado no preview via Playwright: header limpo, login real, dropdown de admin, logout, menu
    mobile e tradução em `/en`. Usuário de teste descartável removido do banco depois.
- **Próximos passos:** publicar junto com Fases 1+2; considerar o trigger de auto-criação de
  `profiles` (KI-11) antes de abrir o cadastro pro público.

## Documentos relacionados
- [[ROADMAP]]
- [[CHANGELOG]]
- [[CONTEXT]]
