---
id: PRD-002
title: PRD — Modelo de Dados da Academy
type: prd
status: implemented
project: real-vision-academy
phase: fase-2
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
depends_on:
  - ARCHITECTURE
related:
  - DECISIONS
  - CHANGELOG
---

# PRD-002 — Modelo de Dados da Academy (Fase 2)

> Schema aplicado no Supabase `xomtfkbvathddfpbknyo` em 2026-07-17 via Management API.
> Genérico para N cursos. Nomes em inglês, snake_case, preços em centavos.

## Tabelas

| Tabela | Campos principais | Observações |
|---|---|---|
| `courses` | `slug` (unique), `title`, `description`, `cover_url`, `price_cents`, `currency` (default `BRL`), `published` (default false) | Preço no curso (D-003: compra única) |
| `modules` | `course_id` FK cascade, `sort_order`, `title` | Ordenação por `sort_order` |
| `lessons` | `module_id` FK cascade, `sort_order`, `title`, `video_ref`, `duration_seconds` | `video_ref` genérico — formato final depende de D-006 (vídeo) |
| `materials` | `lesson_id` FK cascade, `type` (`md_prompt`/`pdf`/`link`/`download`), `title`, `url`, `content` | `content` guarda o texto dos prompts `.md` |
| `enrollments` | `user_id` FK profiles, `course_id` FK, `source` (`purchase`/`manual`), unique(user, course) | Matrícula = acesso |
| `lesson_progress` | PK (`user_id`,`lesson_id`), `completed`, `completed_at` | Base do progresso da Fase 3 |
| `orders` | `user_id`, `course_id`, `amount_cents`, `currency`, `status` (`pending`/`paid`/`failed`/`refunded`), `gateway`, `external_id` | Preenchida pelo webhook Stripe (Fase 4, service role) |

`profiles` (Fase 1) é reusada como está — coluna `role` (`student`/`admin`) governa o admin.

## RLS

Função helper `public.is_admin()` (security definer) → `profiles.role = 'admin'` do `auth.uid()`.

- **Catálogo (`courses`/`modules`/`lessons`):** SELECT público apenas do que pertence a curso
  `published`; escrita (ALL) só admin.
- **`materials`:** SELECT só admin ou usuário com `enrollment` no curso da aula; escrita só admin.
- **`enrollments`:** usuário lê as próprias; admin gerencia todas (concessão manual pelo painel).
- **`profiles` (ajuste da Fase 2):** adicionada `profiles_admin_select` — admin lê todos os perfis
  (necessário para o painel listar alunos e conceder matrícula por e-mail; a política da Fase 1
  restringia ao próprio registro).
- **`lesson_progress`:** usuário lê/escreve/apaga só o próprio; admin lê.
- **`orders`:** usuário lê os próprios; escrita via service role (webhook) ou admin.

Total: 17 policies novas. SQL fonte: aplicado direto (sem arquivo de migração no repo — banco é a
fonte de verdade; recriável a partir deste PRD).

## Verificação feita (2026-07-17) — anon + autenticada
Teste com usuários descartáveis (admin + student, removidos após o teste):
- Anon: SELECT `courses` 200 (só publicados); INSERT bloqueado (42501); `enrollments`/`materials` não vazam.
- Student: INSERT em `courses` → 403; não vê curso despublicado; sem matrícula não lê `materials`.
- Admin: criou curso→módulo→aula→material→preço e concedeu matrícula (tudo 201 via RLS, sem service role).
- Student matriculado (curso publicado): lê `materials` e grava o próprio `lesson_progress` (201).
- Comportamento notável (correto): material de curso **despublicado** fica invisível até para aluno
  matriculado — a policy de `materials` atravessa a de `lessons`, que exige curso publicado.
- Painel `/academy/admin` verificado no preview via Playwright: guard de login, bloqueio de não-admin
  por role, CRUD completo e concessão de matrícula por e-mail funcionando.

## Fora deste PRD
- Tabelas de comunidade — **adiadas** (ver [[DECISIONS]] D-009).
- Storage de arquivos (pdf/download) — decidir na Fase 3 junto com D-006.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[DECISIONS]]
- [[CHANGELOG]]
