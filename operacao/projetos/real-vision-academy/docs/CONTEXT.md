---
id: CONTEXT
title: Contexto Atual — Real Vision Academy
type: context
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-19
related:
  - MASTER_PRD
  - ARCHITECTURE
  - ROADMAP
  - DECISIONS
---

# Contexto Atual — Real Vision Academy

> Primeiro documento a ler para reconstruir o contexto. Mantido curto e atualizado ao fim de cada etapa.

## Fase 6 em curso (2026-07-19) — Hub + Comunidade v1
Decidido evoluir o `/academy` de grade de cursos para um **hub/ecossistema** com **comunidade nativa**
(referência estrutural: Circle / ibe.IA). Plano completo em [[PRD-006-hub-comunidade]] — **aprovado pelo
Felipe em 2026-07-19**. Modelo de acesso: duas trilhas ortogonais — **Membro** (anuidade → comunidade +
Mentor IA futuro) e **Aluno** (matrícula → curso). Decisões novas: D-013 (anuidade), D-014 (comunidade
nativa), D-015 (nomenclatura de tiers). Execução: Opus 4.8, fase por fase.
**Fase 0 fechada (2026-07-19):** o trigger de `profiles` já existia da Fase 3 (KI-11 estava resolvido;
o PRD é que citava a versão velha); backfill de 1 órfão executado → 4 usuários / 4 perfis, verificado.
**Passo 2 fechado (2026-07-19):** `profiles` estendido (`handle`, `company`, `city`, `segment`, `links`,
`headline`, `bio`, `avatar_url`) + view `public.public_profiles` (segura, sem email/role) + telas
`/academy/conta` e `/academy/membro/:handle`. Verificado ponta a ponta (build, RLS/segurança por fora do
app, fluxo autenticado completo via Playwright). Detalhe em [[TIMELINE]].
**Passo 3 fechado (2026-07-19):** tabela `memberships` (status active/expired) + hook `useMembership()`.
**Passo 4 fechado (2026-07-19):** casca `AcademyShell` (sidebar Início/Aprender/Comunidade/Prompts/
Conta) + `Dashboard.tsx` em `/academy`.
**Passo 5 fechado (2026-07-19):** Comunidade v1 — tabelas `spaces`/`posts`/`comments`/`reactions` + RLS
por tier + telas `/academy/comunidade` e `/academy/comunidade/post/:id`. Verificado ponta a ponta
(gate de canal `member`, post, curtida, comentário). Detalhe em [[TIMELINE]].
**Passo 6 fechado (2026-07-19):** Biblioteca de Prompts + Skills — escopo ampliado na revisão (duas
tabelas separadas `prompts`/`skills`, campo `description`, cadastro por tela de admin em vez de SQL
manual). Views `prompts_gated`/`skills_gated` com redação de coluna por tier + hooks `usePrompts`/
`useSkills` + `PromptsPage.tsx` (`/academy/prompts`) + abas de admin em `AdminAcademy.tsx`. Bug de
cache entre contas achado e corrigido (KI-22). Verificado ponta a ponta (admin CRUD + aluno com/sem
membership). Detalhe em [[TIMELINE]].
**MVP da Fase 6 (Hub + Comunidade) fechado** — passos 3 a 6 do [[PRD-006-plano-execucao]] concluídos.
Roteiros dos cursos: Felipe decidiu **não** mexer agora. Ideia da automação de Instagram (captação →
recompensa na biblioteca) registrada em [[IDEAS]], sem implementação.
**Próximo passo:** nenhum item de código aberto no momento — aguardar Felipe decidir a próxima fase
(ver "Futuro" no [[ROADMAP]]: gamificação, Mentor IA, marketplace, i18n, etc.) ou retomar pendências
antigas (Bunny Stream real, conteúdo do Profissional 360, Stripe).

## Fase atual
**Fase 3 (área de membros + player + progresso) implementada e verificada ponta a ponta** (2026-07-18).
`/academy` (Meus Cursos), `/academy/curso/:slug`, player Bunny Stream com seam/placeholder, materiais
por Storage assinado, progresso — tudo testado no preview com curso e aluno de teste descartáveis
(removidos ao final). Falta só a conta Bunny Stream real para reprodução de vídeo ponta a ponta.

## Objetivo em andamento
Felipe criar a conta Bunny Stream de verdade (Library ID + token key + vídeo de teste) para ligar o
player. Em paralelo: cadastrar o curso Profissional 360 pelo painel `/academy/admin` com conteúdo real.

## Última etapa concluída (2026-07-18) — Fase 3 implementada e verificada
Rotas, hooks (`useMyCourses`/`useCourse`/`useEnrollment`/`useProgress`, todos com `.maybeSingle()`),
`CourseCard`/`CourseSyllabus`/`MaterialsList`/`LessonPlayer`, bucket `course-materials` com RLS por
matrícula, `api/bunny-sign.ts` com seam (devolve 501 sem credencial, player mostra placeholder).
Decisão nova D-010: materiais assinados client-side via RLS de Storage (sem função serverless extra).
Verificado via Playwright: gates deslogados, login, "Meus Cursos", sumário, player com placeholder,
material inline + PDF (RLS negando sem sessão), marcar progresso (0%→33%, avança pra próxima aula).
**KI-11 validado ponta a ponta com sucesso** (trigger cria o perfil do aluno automaticamente — um
falso alarme de visibilidade entre CTEs na primeira checagem foi descartado por consulta separada).
Detalhe completo em [[TIMELINE]], [[PRD-003-area-de-membros]] e [[KNOWN_ISSUES]] (KI-11, KI-14/15/16).

## Etapa anterior (2026-07-18) — KI-13 resolvido, Felipe promovido a admin
Hipótese do KI-13 estava errada: não linkou, eram **duas contas separadas** com e-mails diferentes
(`realvisionmaps360@gmail.com` do teste Playwright vs `felipegarciajericoacoara@gmail.com` do login
real via Google). Felipe escolheu `realvisionmaps360@gmail.com` como conta admin fixa. Ao promover,
descoberto que a tabela `profiles` estava com **0 linhas** — KI-11 (sem trigger de auto-criação) não é
mais só um risco futuro, é o estado real de produção agora. Resolvido para a conta admin via `INSERT`
manual; segue pendente para os próximos usuários reais. Detalhe completo em [[TIMELINE]] e
[[KNOWN_ISSUES]] (KI-08, KI-11, KI-13).

## Etapa anterior (2026-07-17) — Incidente de login em produção, resolvido
Primeiro teste de login em produção (o próximo passo que tinha ficado pendente) revelou 3 problemas
em cadeia, todos corrigidos na sessão — detalhe completo em [[TIMELINE]] e [[KNOWN_ISSUES]] (KI-12,
KI-13):
- `site_url`/`uri_allow_list` do Supabase nunca configurados pra produção (ficaram em
  `localhost:3000`) → corrigido.
- OAuth Client do Google era do tipo Desktop (sem suporte a redirect URI custom) → client novo criado
  tipo Web, credenciais atualizadas no Supabase.
- E-mail do Felipe já tinha uma conta de teste da Fase 2 (Playwright, nome "Real Vision360") — não é
  bug, mas precisa de limpeza: confirmar se o login Google linkou nessa mesma conta antes de promover
  a admin (KI-08).
- Felipe confirmou: **login funcionando em produção** (Google e e-mail/senha).

## Etapa anterior (2026-07-17) — Fase 2
- 7 tabelas do catálogo criadas no banco novo via Management API (`courses`→`orders`) + função
  `is_admin()` + 17 policies RLS (inclui `profiles_admin_select`). Detalhe em [[PRD-002-modelo-de-dados]].
- Painel `/academy/admin` construído (guard login+role admin): CRUD curso→módulos→aulas→materiais→
  preço + concessão manual de matrícula por e-mail.
- Comunidade: tabelas **adiadas** (D-009, sem spec).
- Verificado: build ok; RLS testada anon + autenticada (admin CRUD ok, student bloqueado); painel
  validado ponta a ponta no preview via Playwright (curso completo + matrícula manual).
- **Atenção:** ninguém tem role `admin` ainda — promover o usuário do Felipe via SQL (KI-08).

## Decisões recentes
- D-006: hospedagem de vídeo = **Bunny Stream** + Supabase Storage (materiais). Destrava a Fase 3.
- D-007: recomeçar limpo o login do blog (sem migrar dados).
- D-008: Fase 1 feita direto no Claude Code; Fable 5 reservado para Fase 2/3.
- D-009: tabelas de comunidade adiadas (sem spec, YAGNI).
- D-010: materiais assinados client-side via RLS de Storage, sem função serverless extra
  (`api/material-sign.ts` do plano original não foi criado).

## Bloqueios
- Nenhum bloqueio duro pro código. Player de vídeo real depende da conta Bunny Stream (Felipe, fora
  do Claude Code — KI-14).

## Pendências
- [ ] Felipe criar a conta Bunny Stream + biblioteca de vídeo (Library ID + token key + vídeo de
  teste) para ligar o player de verdade (KI-14).
- [ ] Cadastrar o curso Profissional 360 pelo painel com conteúdo real (valida Fase 2 e 3 ponta a
  ponta com dado real, não só o curso de teste descartável já removido).
- [ ] Conta Stripe + chaves + produto/preço — Fase 4.
- [ ] Conteúdo do Profissional 360 (vídeos + prompts `.md`) — Fase 5.

## Próximos passos
1. Felipe cria a conta Bunny Stream e passa as credenciais (Library ID + token key + `video_ref` de
   teste) para ligar e validar o player de verdade.
2. Cadastrar o Profissional 360 pelo painel `/academy/admin` com conteúdo real.
3. Abrir a Fase 4 (checkout Stripe) quando a Fase 3 estiver com vídeo real validado.

## Nota operacional (importante para a próxima sessão)
Para rodar SQL no banco novo (`xomtfkbvathddfpbknyo`), o MCP Supabase **não serve** (conector OAuth
apontando para outra conta/organização). Usar a **Management API** com um PAT da conta smarthome:
`POST https://api.supabase.com/v1/projects/xomtfkbvathddfpbknyo/database/query` com
`Authorization: Bearer <PAT sbp_...>`. O PAT não fica salvo em arquivo no repo — gerar um novo em
supabase.com (conta smarthome → Account → Access Tokens) quando precisar, e usar só na sessão. Ver
KI-17 no [[KNOWN_ISSUES]] para o cuidado com acentuação nas queries via Bash.

## Documentos a consultar para continuar
[[MASTER_PRD]] · [[ARCHITECTURE]] · [[ROADMAP]] · [[DECISIONS]] · [[KNOWN_ISSUES]]
