-- PRD-007 — Fase 3: colunas da aula narrada + gate de matrícula
-- Rodar no SQL Editor do Supabase (projeto xomtfkbvathddfpbknyo) ou via Management API.
-- Decisões aprovadas por Felipe em 30/07/2026:
--   1. nomes de coluna: os propostos na arquitetura (§3 do PRD-007-arquitetura-leitor-narrado)
--   2. gate de conteúdo pago: view (mesmo padrão de prompts_gated/skills_gated)
--   3. áudio: reaproveita o bucket course-materials existente (não cria bucket novo)

-- 1) Colunas novas em lessons
alter table public.lessons
  add column if not exists format text not null default 'video',
  add column if not exists content_blocks jsonb,
  add column if not exists audio_path text,
  add column if not exists sync_map jsonb;

-- 2) Colunas novas em lesson_progress
alter table public.lesson_progress
  add column if not exists last_position_seconds numeric not null default 0,
  add column if not exists listened_seconds numeric not null default 0;

-- 3) View gated: catálogo (título/ordem/duração/format) sempre visível para curso publicado;
--    conteúdo pago (content_blocks/audio_path/sync_map) só para quem tem matrícula ou é admin.
create or replace view public.lessons_gated
with (security_invoker = true) as
select
  l.id,
  l.module_id,
  l.sort_order,
  l.title,
  l.video_ref,
  l.duration_seconds,
  l.format,
  case
    when public.is_admin() or exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = m.course_id
    ) then l.content_blocks
    else null
  end as content_blocks,
  case
    when public.is_admin() or exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = m.course_id
    ) then l.audio_path
    else null
  end as audio_path,
  case
    when public.is_admin() or exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = m.course_id
    ) then l.sync_map
    else null
  end as sync_map
from public.lessons l
join public.modules m on m.id = l.module_id
join public.courses c on c.id = m.course_id
where c.published = true;

grant select on public.lessons_gated to authenticated, anon;

-- Validação depois de rodar (compare com o critério de aceite da Fase 3 do PRD-007-plano-execucao):
--   1. select * from lessons_gated onde a sessão NÃO tem matrícula → content_blocks/audio_path/sync_map = null
--   2. mesma query com sessão matriculada → os 3 campos vêm preenchidos
--   3. sessão anônima → title/sort_order/duration_seconds ainda aparecem (catálogo continua público)
--   4. lessons com format default 'video' → nenhuma aula de vídeo existente muda de comportamento
