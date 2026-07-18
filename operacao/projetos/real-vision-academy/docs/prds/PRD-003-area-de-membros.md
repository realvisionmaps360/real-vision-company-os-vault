---
id: PRD-003
title: PRD — Área de Membros, Player e Progresso
type: prd
status: approved
project: real-vision-academy
phase: fase-3
owner: master-visionair
created: 2026-07-18
updated: 2026-07-18
depends_on:
  - ARCHITECTURE
  - PRD-002-modelo-de-dados
related:
  - DECISIONS
  - ROADMAP
  - KNOWN_ISSUES
---

# PRD-003 — Área de Membros, Player e Progresso (Fase 3)

> Plano aprovado pelo Felipe em 2026-07-18 (sessão Fable 5). Consome o schema do
> [[PRD-002-modelo-de-dados]] — nada de tabela nova (verificado no banco: `lesson_progress`
> já existe com RLS correta, criada na Fase 2).

## Objetivo

Aluno matriculado consegue: ver seus cursos em `/academy`, abrir a página do curso, assistir a
aula no player, acessar materiais complementares (prompts `.md`, PDFs) e ter o progresso
registrado/exibido. Fora de escopo: catálogo público, checkout (Fase 4), conteúdo real (Fase 5),
i18n EN/DE, comunidade.

## Rotas (PT-only, `src/App.tsx`, acima do catch-all)

| Rota | Página | Guarda |
|---|---|---|
| `/academy` | `MyCourses` — grade "Meus Cursos" | in-component: loading → !user (AuthModal) → grade |
| `/academy/curso/:slug` | `CoursePage` — sumário + player + materiais + progresso | idem + matrícula (`useEnrollment`) |

Sem route-guard novo — mesmo padrão in-component do `AdminAcademy` (Fase 2).

## Hooks (react-query, **`.maybeSingle()` desde a criação** — lição da Fase 2)

- `useMyCourses()` — `enrollments.select("*, courses(*)")` do usuário logado.
- `useCourse(slug)` — curso por slug + árvore `modules.select("*, lessons(*, materials(*))")`
  ordenada por `sort_order` (padrão do `CourseEditor`).
- `useEnrollment(courseId)` — modelado no `useIsAdmin`: lookup com `.maybeSingle()` →
  `{ enrolled, loading }`.
- `useProgress(courseId)` — lê `lesson_progress` + mutation upsert (marcar concluída) + `%`.

## Player (Bunny Stream, D-006) — com seam

- **`api/bunny-sign.ts`** (Vercel function, molde `api/contact.ts`): valida JWT do aluno
  (`auth.getUser`), confere matrícula no curso dono da aula (service role, join
  `lessons→modules→courses→enrollments`), devolve URL de embed assinada com expiração.
  Token: `sha256_hex(tokenKey + videoGuid + expires)` →
  `https://iframe.mediadelivery.net/embed/{libraryId}/{videoGuid}?token=…&expires=…`
  (esquema a confirmar no painel Bunny quando a conta existir). `lessons.video_ref` = videoGuid.
- **`LessonPlayer.tsx`**: chama a função, renderiza iframe lazy com `aspect-ratio` reservado.
  **Seam:** sem credencial/erro → placeholder "vídeo em breve". Constrói tudo sem a conta Bunny;
  reprodução real fica travada até o Felipe criar a conta (ver [[KNOWN_ISSUES]]).

## Materiais (Supabase Storage + inline)

- Bucket privado **`course-materials`** (greenfield — banco hoje tem 0 buckets). Caminho:
  `{course_id}/{lesson_id}/{arquivo}`.
- **`api/material-sign.ts`**: mesma guarda de matrícula; `createSignedUrl(path, 3600)` via
  service role.
- Por `materials.type`: `md_prompt` → `materials.content` inline (RLS já exige matrícula),
  render markdown + botão copiar; `pdf`/`download` → caminho em `materials.url` → assinar;
  `link` → link externo direto.

## Progresso

Botão "concluir aula" → upsert em `lesson_progress` (PK `user_id`+`lesson_id`). Barra
`<Progress>` no card e no topo da página (`concluídas/total`); check por aula no sumário.
Auto-marcar no fim do vídeo = incremento pós-conta Bunny.

## Env novas (Vercel, server-only, sem `VITE_`)

`SUPABASE_SERVICE_ROLE_KEY` · `BUNNY_STREAM_LIBRARY_ID` · `BUNNY_STREAM_TOKEN_KEY` (as duas
últimas só quando a conta Bunny existir).

## Arquivos novos

`src/pages/academy/MyCourses.tsx`, `CoursePage.tsx` · `src/components/academy/CourseCard.tsx`,
`CourseSyllabus.tsx`, `LessonPlayer.tsx`, `MaterialsList.tsx` · `src/hooks/useMyCourses.ts`,
`useCourse.ts`, `useEnrollment.ts`, `useProgress.ts` · `api/bunny-sign.ts`, `api/material-sign.ts`.

Estilo: tokens semânticos do site (`bg-background`/`bg-card`/`text-accent`), não o hex
hardcoded do admin (inconsistência registrada em [[KNOWN_ISSUES]]).

## Critério de conclusão

- **Sem Bunny:** aluno matriculado vê `/academy`, abre curso, vê sumário + materiais
  (`.md` inline + PDF assinado), marca progresso e vê barra; player mostra placeholder;
  não-matriculado é negado (RLS + funções). `npm run build` limpo.
- **Com Bunny (quando a conta existir):** o mesmo + reprodução assinada ponta a ponta.

## Documentos relacionados
- [[ARCHITECTURE]] · [[PRD-002-modelo-de-dados]] · [[DECISIONS]] · [[ROADMAP]] · [[KNOWN_ISSUES]]
