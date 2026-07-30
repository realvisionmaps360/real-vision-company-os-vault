-- Passo 6 — Biblioteca de Prompts + Skills
-- Rodar no SQL Editor do projeto Supabase xomtfkbvathddfpbknyo (Academy)
-- Pré-requisito: função public.is_active_member() já existe (criada no Passo 5)
--                 função public.is_admin() já existe (criada na Fase 2)

-- ============================================================
-- PROMPTS
-- ============================================================

create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text not null,
  body_md text not null,
  min_tier text not null check (min_tier in ('free', 'member')) default 'member',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index prompts_category_idx on public.prompts(category);

alter table public.prompts enable row level security;

-- Metadado (título/descrição/categoria) sempre visível pra autenticado — o corpo é redigido na view.
create policy prompts_select_authenticated on public.prompts
  for select to authenticated using (true);

-- Cadastro/edição/remoção só admin (mesmo padrão de courses).
create policy prompts_admin_all on public.prompts
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create view public.prompts_gated
with (security_invoker = true) as
select
  id,
  category,
  title,
  description,
  min_tier,
  sort_order,
  created_at,
  case
    when min_tier = 'free' or public.is_active_member() then body_md
    else left(body_md, 220) || '…'
  end as body_md,
  (min_tier = 'member' and not public.is_active_member()) as locked
from public.prompts;

grant select on public.prompts_gated to authenticated;

-- ============================================================
-- SKILLS
-- ============================================================

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text not null,
  body_md text not null,
  min_tier text not null check (min_tier in ('free', 'member')) default 'member',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index skills_category_idx on public.skills(category);

alter table public.skills enable row level security;

create policy skills_select_authenticated on public.skills
  for select to authenticated using (true);

create policy skills_admin_all on public.skills
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create view public.skills_gated
with (security_invoker = true) as
select
  id,
  category,
  title,
  description,
  min_tier,
  sort_order,
  created_at,
  case
    when min_tier = 'free' or public.is_active_member() then body_md
    else left(body_md, 220) || '…'
  end as body_md,
  (min_tier = 'member' and not public.is_active_member()) as locked
from public.skills;

grant select on public.skills_gated to authenticated;
