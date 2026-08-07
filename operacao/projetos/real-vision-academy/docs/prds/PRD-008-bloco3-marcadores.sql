-- =====================================================================
-- PRD-008 · Bloco 3 — Marcadores por frase
-- Rodar no SQL Editor do Supabase (projeto xomtfkbvathddfpbknyo), logado
-- como o Felipe. Escrita no banco NUNCA por MCP ou Management API (KI-29).
--
-- Idempotente: pode rodar de novo sem quebrar.
-- =====================================================================

-- 1. Tabela ------------------------------------------------------------
create table if not exists public.lesson_bookmarks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  lesson_id   uuid not null references public.lessons (id) on delete cascade,
  frag_index  integer not null check (frag_index >= 0),
  -- as 4 cores do design; texto livre deixaria a UI receber cor desconhecida
  color       text not null check (color in ('#F5A623', '#5FBF7F', '#5B9BD5', '#C77DBB')),
  created_at  timestamptz not null default now(),
  -- uma marcação por frase por aluno: marcar de novo troca a cor, não duplica
  unique (user_id, lesson_id, frag_index)
);

create index if not exists lesson_bookmarks_user_lesson_idx
  on public.lesson_bookmarks (user_id, lesson_id);

-- 2. RLS ---------------------------------------------------------------
alter table public.lesson_bookmarks enable row level security;

-- O aluno só enxerga e mexe nos próprios marcadores. Não há policy de admin:
-- marcador é anotação pessoal, ninguém mais precisa ler.
drop policy if exists lesson_bookmarks_select_own on public.lesson_bookmarks;
create policy lesson_bookmarks_select_own
  on public.lesson_bookmarks for select
  using (user_id = auth.uid());

-- INSERT exige matrícula no curso da aula, seguindo o padrão de `materials`
-- (D-010/D-018): sem isso, alguém sem matrícula poderia gravar linhas.
drop policy if exists lesson_bookmarks_insert_own on public.lesson_bookmarks;
create policy lesson_bookmarks_insert_own
  on public.lesson_bookmarks for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1
        from public.lessons l
        join public.modules m on m.id = l.module_id
        join public.enrollments e on e.course_id = m.course_id
       where l.id = lesson_bookmarks.lesson_id
         and e.user_id = auth.uid()
    )
  );

drop policy if exists lesson_bookmarks_update_own on public.lesson_bookmarks;
create policy lesson_bookmarks_update_own
  on public.lesson_bookmarks for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists lesson_bookmarks_delete_own on public.lesson_bookmarks;
create policy lesson_bookmarks_delete_own
  on public.lesson_bookmarks for delete
  using (user_id = auth.uid());

-- 3. Conferência -------------------------------------------------------
-- Deve devolver 4 linhas (select/insert/update/delete).
select policyname, cmd
  from pg_policies
 where schemaname = 'public'
   and tablename = 'lesson_bookmarks'
 order by cmd;
