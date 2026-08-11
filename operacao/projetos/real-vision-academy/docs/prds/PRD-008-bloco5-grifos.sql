-- =====================================================================
-- PRD-008 · Bloco 5 — Grifos por trecho de texto
-- Rodar no SQL Editor do Supabase (projeto xomtfkbvathddfpbknyo), logado
-- como o Felipe. Escrita no banco NUNCA por MCP ou Management API (KI-29).
--
-- Idempotente: pode rodar de novo sem quebrar.
--
-- Convive com `lesson_bookmarks` (Bloco 3) de propósito — são dois sistemas:
-- o marcador pinta a FRASE inteira e nasce do botão do painel do player;
-- o grifo pinta um TRECHO e nasce da seleção de texto. Decisão do Felipe em
-- 11/08/2026. Ver PRD-008-bloco5-plano-execucao.md.
-- =====================================================================

-- 1. Tabela ------------------------------------------------------------
create table if not exists public.lesson_highlights (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  lesson_id    uuid not null references public.lessons (id) on delete cascade,

  -- SEM `check (frag_index >= 0)`, ao contrário de lesson_bookmarks: frases sem
  -- mapa de sincronização recebem índice negativo (-1 - blockIndex, ver
  -- readerSentences.ts) e continuam grifáveis — só não têm destino de seek.
  frag_index   integer not null,

  -- offsets de caractere DENTRO do texto da frase, intervalo [start, end)
  start_offset integer not null check (start_offset >= 0),
  end_offset   integer not null,

  -- O texto grifado, gravado junto. Não é redundância: é âncora de conferência.
  -- Se text.slice(start,end) != quote na hora de renderizar, o front tenta UMA
  -- relocação por indexOf e, se falhar, ignora o grifo NAQUELE render — nunca
  -- apaga do banco. Dado do aluno não some por bug de conteúdo.
  quote        text not null,

  -- as 4 cores do design; texto livre deixaria a UI receber cor desconhecida
  color        text not null check (color in ('#F5A623', '#5FBF7F', '#5B9BD5', '#C77DBB')),

  created_at   timestamptz not null default now(),

  constraint lesson_highlights_range_ok check (end_offset > start_offset),

  -- mesmo trecho grifado de novo = troca de cor, não linha duplicada (upsert).
  -- Ao contrário do Bloco 3, o unique inclui os offsets: é o que permite VÁRIOS
  -- grifos na mesma frase, que é o requisito central deste bloco.
  unique (user_id, lesson_id, frag_index, start_offset, end_offset)
);

create index if not exists lesson_highlights_user_lesson_idx
  on public.lesson_highlights (user_id, lesson_id);

-- 2. RLS ---------------------------------------------------------------
alter table public.lesson_highlights enable row level security;

-- O aluno só enxerga e mexe nos próprios grifos. Não há policy de admin:
-- grifo é anotação pessoal, ninguém mais precisa ler.
drop policy if exists lesson_highlights_select_own on public.lesson_highlights;
create policy lesson_highlights_select_own
  on public.lesson_highlights for select
  using (user_id = auth.uid());

-- INSERT exige matrícula no curso da aula, seguindo o padrão de `materials`
-- (D-010/D-018) e de `lesson_bookmarks` (Bloco 3): sem isso, alguém sem
-- matrícula poderia gravar linhas.
drop policy if exists lesson_highlights_insert_own on public.lesson_highlights;
create policy lesson_highlights_insert_own
  on public.lesson_highlights for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1
        from public.lessons l
        join public.modules m on m.id = l.module_id
        join public.enrollments e on e.course_id = m.course_id
       where l.id = lesson_highlights.lesson_id
         and e.user_id = auth.uid()
    )
  );

drop policy if exists lesson_highlights_update_own on public.lesson_highlights;
create policy lesson_highlights_update_own
  on public.lesson_highlights for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists lesson_highlights_delete_own on public.lesson_highlights;
create policy lesson_highlights_delete_own
  on public.lesson_highlights for delete
  using (user_id = auth.uid());

-- 3. Conferência -------------------------------------------------------
-- Deve devolver 4 linhas (select/insert/update/delete).
select policyname, cmd
  from pg_policies
 where schemaname = 'public'
   and tablename = 'lesson_highlights'
 order by cmd;
