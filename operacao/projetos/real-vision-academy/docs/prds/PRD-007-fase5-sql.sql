-- PRD-007 — Fase 5: destrava o acesso do aluno matriculado + sanea lesson_progress
-- Rodar no SQL Editor do Supabase (projeto xomtfkbvathddfpbknyo).
-- NÃO tentar via Management API pelo Claude Code — escrita é sempre bloqueada pelo classificador (KI-29).
--
-- Por que este SQL existe (detalhe em PRD-007-fase5-plano.md e em KNOWN_ISSUES KI-31/KI-32):
--
--   1. A view lessons_gated foi criada na Fase 3 com `security_invoker = true`. Isso significa que as
--      policies de RLS de lessons/modules CONTINUAM valendo por baixo, aplicadas como o usuário que
--      chama. A policy de catálogo só libera curso com published = true. O Profissional 360 está
--      published = false (pré-venda, KI-18). Resultado: a view devolve ZERO LINHAS para o aluno
--      matriculado, não importa o que esteja escrito no WHERE dela.
--      Isso não é só um bloqueio da Fase 5 — é um bug de produção que já existe: a KI-18 liberou a
--      compra em pré-venda, mas quem comprar e for matriculado abre o curso e não vê aula nenhuma.
--
--   2. lesson_progress hoje só tem linha quando a aula está concluída (o código grava com
--      upsert({user_id, lesson_id}) e lê contando a existência da linha). A Fase 5 cria pela primeira
--      vez uma linha "em andamento" (posição salva antes de concluir). Sem sanear a coluna `completed`
--      antes, o aluno abriria a aula e ela apareceria concluída no primeiro save de posição.
--
-- Regra que passa a valer depois deste SQL: MATRÍCULA libera o conteúdo; `published` governa só a
-- vitrine. É a semântica correta para curso pago — quem pagou acessa, publicado ou não.


-- ============================================================================
-- 0.1 — Funções helper de matrícula (security definer, no espírito de is_admin())
-- ============================================================================
-- São security definer de propósito: uma policy que consulta outra tabela sofre a RLS DELA também
-- (é o que PRD-002 descreve em "a policy de materials atravessa a de lessons"). Isolar a checagem
-- dentro de uma função security definer evita esse encadeamento e deixa a regra legível.

create or replace function public.is_enrolled_course(p_course_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.enrollments e
    where e.user_id = auth.uid()
      and e.course_id = p_course_id
  );
$$;

create or replace function public.is_enrolled_module(p_module_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.modules m
    join public.enrollments e on e.course_id = m.course_id
    where m.id = p_module_id
      and e.user_id = auth.uid()
  );
$$;

grant execute on function public.is_enrolled_course(uuid) to authenticated, anon;
grant execute on function public.is_enrolled_module(uuid) to authenticated, anon;

-- Para anônimo, auth.uid() é null e as duas funções devolvem false. Nada muda para visitante.


-- ============================================================================
-- 0.2 — Policies novas: aluno matriculado lê módulos e aulas do curso que comprou,
--        mesmo com o curso ainda não publicado
-- ============================================================================
-- As policies de catálogo existentes (SELECT público de curso publicado) continuam intactas.
-- Estas são ADITIVAS — no Postgres, várias policies permissivas de SELECT se somam com OR.

drop policy if exists modules_select_enrolled on public.modules;
create policy modules_select_enrolled on public.modules
  for select to authenticated
  using (public.is_enrolled_course(modules.course_id));

drop policy if exists lessons_select_enrolled on public.lessons;
create policy lessons_select_enrolled on public.lessons
  for select to authenticated
  using (public.is_enrolled_module(lessons.module_id));


-- ============================================================================
-- 0.3 — Recriar lessons_gated com o filtro corrigido
-- ============================================================================
-- Mesma view da Fase 3 (PRD-007-fase3-sql.sql), com duas mudanças:
--   a) o WHERE deixa de exigir published = true e passa a aceitar admin ou matriculado;
--   b) o EXISTS repetido 3x nos CASE foi trocado pela função helper — mesmo resultado, menos repetição.
-- Sem 0.2, esta mudança sozinha não resolve nada (a RLS de baixo continua barrando a linha).
-- Sem esta, as policies de 0.2 sozinhas também não (o WHERE da view filtra por fora).

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
    when public.is_admin() or public.is_enrolled_course(m.course_id)
    then l.content_blocks
    else null
  end as content_blocks,
  case
    when public.is_admin() or public.is_enrolled_course(m.course_id)
    then l.audio_path
    else null
  end as audio_path,
  case
    when public.is_admin() or public.is_enrolled_course(m.course_id)
    then l.sync_map
    else null
  end as sync_map
from public.lessons l
join public.modules m on m.id = l.module_id
join public.courses c on c.id = m.course_id
where c.published = true
   or public.is_admin()
   or public.is_enrolled_course(m.course_id);

grant select on public.lessons_gated to authenticated, anon;


-- ============================================================================
-- 0.4 — Sanear lesson_progress antes de a Fase 5 gravar linha "em andamento"
-- ============================================================================
-- ORDEM IMPORTA. O backfill vem ANTES de qualquer código novo entrar no ar, e antes de o código
-- passar a filtrar por completed = true.
--
-- Por que o backfill é seguro e não inventa dado: hoje a existência da linha JÁ SIGNIFICA "concluída"
-- (é assim que useProgress.ts e useMyCourses.ts leem). Marcar completed = true nessas linhas apenas
-- escreve explicitamente o que o sistema já considera verdade. Se a coluna já for true em tudo, o
-- update afeta 0 linhas — rodar de novo é inofensivo.

-- Antes: conferir quantas linhas estão fora do padrão e qual é o default atual da coluna.
select count(*) filter (where completed is true)     as ja_true,
       count(*) filter (where completed is not true) as nao_true
from public.lesson_progress;

select column_name, column_default, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'lesson_progress'
  and column_name = 'completed';

-- Backfill.
update public.lesson_progress
set completed = true,
    completed_at = coalesce(completed_at, now())
where completed is not true;

-- Default explícito: garante que a linha "em andamento" criada pela Fase 5 nasça NÃO concluída,
-- mesmo o código não mandando a coluna no payload (é de propósito que ele não manda — mandar
-- criaria uma corrida que desfaz a conclusão; ver E4 no PRD-007-fase5-plano.md).
alter table public.lesson_progress alter column completed set default false;


-- ============================================================================
-- 0.5 — Verificação (rodar e CONFERIR, não presumir a partir da policy escrita)
-- ============================================================================
-- Critério de aceite #6 do PRD exige verificação real de acesso, não leitura do SQL.

-- (a) Estrutura: default agora é false?
select column_name, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'lesson_progress' and column_name = 'completed';

-- (b) Policies novas existem?
select tablename, policyname
from pg_policies
where schemaname = 'public'
  and policyname in ('modules_select_enrolled', 'lessons_select_enrolled');

-- (c) Nenhuma linha ficou "em andamento" por engano no backfill?
select count(*) as deve_ser_zero from public.lesson_progress where completed is not true;

-- (d) TESTE DE ACESSO REAL — este é o que vale. Rodar pelo app (preview), não pelo SQL Editor:
--     o SQL Editor roda como superusuário e NÃO exercita RLS, então passar aqui não prova nada.
--
--     d1. Sessão de ADMIN     → abre o curso e vê módulos/aulas, apesar de published = false.
--     d2. Sessão de MATRICULADO (não admin) → vê as aulas E o conteúdo pago (texto/áudio/mapa).
--     d3. Sessão AUTENTICADA SEM MATRÍCULA → não vê o curso despublicado; e quando o curso for
--         publicado, vê título/ordem mas recebe null em content_blocks/audio_path/sync_map.
--     d4. ANÔNIMO → nada do curso despublicado.


-- ============================================================================
-- Rollback
-- ============================================================================
-- drop policy if exists modules_select_enrolled on public.modules;
-- drop policy if exists lessons_select_enrolled on public.lessons;
-- Recriar lessons_gated a partir de PRD-007-fase3-sql.sql (versão com where c.published = true).
-- alter table public.lesson_progress alter column completed set default true;  -- só se o default
--   original era true; conferir o resultado da consulta de 0.4 ANTES de rodar o backfill e anotar.
-- O backfill de dados NÃO tem rollback automático — por isso a consulta "antes" de 0.4 existe.
