---
id: PRD-006-plano-execucao
title: Plano de Execução — PRD-006 (passos 3 a 6)
type: plano
status: concluido
project: real-vision-academy
phase: 6
owner: master-visionair
created: 2026-07-19
depends_on:
  - PRD-006-hub-comunidade
related:
  - DECISIONS
  - ROADMAP
  - TIMELINE
---

# Plano de Execução — PRD-006 (passos 3 a 6)

> **Como funciona:** este documento detalha os 4 passos que faltam do MVP do Hub. Felipe lê o
> conjunto inteiro e aprova. Só depois começo a codar — **um passo por vez**, com aprovação entre
> cada passo. Nada é executado antes desta aprovação. O passo 1 (Fase 0 — trigger de `profiles`) e o
> passo 2 (perfil público + Conta) já estão prontos; ver [[TIMELINE]].

Banco: Supabase `xomtfkbvathddfpbknyo` (Academy). Repo: `real-vision-site`.
Padrões: [[supabase-postgres]] (RLS em toda tabela, índice em toda FK, client singleton) e o que já
existe no projeto (`enrollments`, `profiles`, `useEnrollment.ts`, `useProfile.ts`) — reuso, não invento.

---

## Passo 3 — `memberships` + gating por tier (fundação de acesso)

**Objetivo:** distinguir quem só está logado (**Usuário**) de quem pagou a anuidade (**Membro**).
Pré-requisito de todo o resto — comunidade e prompts vão consultar isso pra decidir o que mostrar.

**3.1 — Tabela `memberships`** (SQL a rodar no SQL Editor):

```sql
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('active', 'expired')),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index memberships_user_id_idx on public.memberships(user_id);

alter table public.memberships enable row level security;

-- Cada usuário só lê a própria linha. Sem insert/update/delete pelo client:
-- concessão de anuidade é manual pelo admin (mesmo padrão de enrollments / D-011).
create policy memberships_select_own
  on public.memberships
  for select
  to authenticated
  using (user_id = auth.uid());
```

**3.2 — Hook `useMembership()`** (`src/hooks/useMembership.ts`, espelha `useEnrollment.ts`):
retorna `isMember`, `loading` e `error` **separados**. O `error` fica fora do `isMember` de
propósito — erro transitório (rede/backend fora do ar) não pode virar falso "não é Membro"; quem
gatear conteúdo checa `error` antes. Consulta `memberships` do usuário com `status = 'active'`.

**Fora deste passo:** cobrança da anuidade (segue manual/WhatsApp, D-011), qualquer UI de "seja
Membro", e o gating em si de `spaces`/`prompts` (as tabelas só existem nos passos 5–6).

**Critério de conclusão:** SQL aplicado; `npm run build` limpo; teste via SQL: `insert` de teste com
`status='active'` e `expires_at` no futuro → hook dá `isMember=true`; sem linha ou `expired` →
`false`. Nenhuma tela consome o hook ainda, então não há verificação de preview neste passo.

---

## Passo 4 — Casca do hub + Dashboard

**Objetivo:** transformar `/academy` numa casca com sidebar (estilo Circle), envolvendo tudo que já
existe sem refazer.

**Escopo:**
- **Casca (item 1 do PRD):** layout com sidebar de blocos — Início · Aprender · Comunidade · Prompts ·
  Conta. Envolve as telas atuais (`/academy` Meus Cursos, página do curso, player). Componente de
  layout novo; sem tabela nova.
- **Dashboard (item 2, rota `/academy`):** progresso agregado, "continuar de onde parei", próximas
  aulas, avisos, atividade recente da comunidade (esta última fica placeholder até o passo 5 existir).
- **Reuso:** link "Meus Cursos" no header (Bloco A do PRD-005 / KI-21).

**Sem tabelas novas** — só leitura do que já existe (`enrollments`, `lesson_progress`, `courses`).

**Critério:** `npm run build` limpo; navegação pela sidebar funciona; Dashboard mostra progresso real
do aluno; verificado no preview.

---

## Passo 5 — Comunidade v1

**Objetivo:** feed + espaços + post + comentário + curtida, com gating por tier.

**5.1 — Tabelas** (SQL, com RLS e `min_tier`):
- `spaces` — `slug`, `name`, `icon`, `min_tier` (free/member), `sort_order`.
- `posts` — `space_id` FK, `author_id` FK, `title`, `body`, `created_at`.
- `comments` — `post_id` FK, `author_id` FK, `body`.
- `reactions` — `post_id`|`comment_id`, `user_id` (unique por par).

**RLS por tier:** conteúdo com `min_tier = 'member'` só é lido se existe `memberships` ativo do
usuário (mesma lógica de matrícula, D-010). O gate distingue negação real de erro transitório (usa o
`error` do passo 3, não trata timeout como bloqueio).

**5.2 — Telas:** Comunidade (feed + canais, `/academy/comunidade`), Post individual
(`/academy/comunidade/post/:id`). Canais iniciais: Apresente-se, Dúvidas, Vitrine, Vagas & Parcerias,
Sugestões.

**Critério:** Usuário grátis vê canais abertos; Membro vê tudo; posts/comentários/curtidas funcionam
com RLS por tier; build limpo; verificado no preview.

**Status (19/07/2026):** código pronto — hooks (`useSpaces`, `useCommunityPosts`, `useComments`,
`useReactions`) + telas (`ComunidadePage`, `PostPage`) + rotas + nav do `AcademyShell`. `tsc --noEmit`
e `npm run build` limpos. Canais decididos: Apresente-se/Dúvidas/Sugestões = `free`, Vitrine/Vagas &
Parcerias = `member`. Falta: Felipe rodar o SQL abaixo no SQL Editor do projeto `xomtfkbvathddfpbknyo`,
depois verificação completa no preview (com login real).

```sql
-- Passo 5 — Comunidade v1: spaces, posts, comments, reactions

create table public.spaces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text,
  min_tier text not null check (min_tier in ('free', 'member')) default 'free',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index posts_space_id_idx on public.posts(space_id);
create index posts_author_id_idx on public.posts(author_id);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index comments_post_id_idx on public.comments(post_id);
create index comments_author_id_idx on public.comments(author_id);

create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint reactions_one_target check (
    (post_id is not null and comment_id is null) or (post_id is null and comment_id is not null)
  )
);
create unique index reactions_post_user_uidx on public.reactions(post_id, user_id) where post_id is not null;
create unique index reactions_comment_user_uidx on public.reactions(comment_id, user_id) where comment_id is not null;
create index reactions_post_id_idx on public.reactions(post_id);
create index reactions_comment_id_idx on public.reactions(comment_id);

-- Helper: usuário logado é Membro ativo agora? (mesma checagem do useMembership, passo 3)
create or replace function public.is_active_member()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.memberships
    where user_id = auth.uid() and status = 'active' and expires_at > now()
  );
$$;

alter table public.spaces enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;

-- spaces: lista sempre visível pra autenticado (o gate é no conteúdo, não na lista de canais)
create policy spaces_select_authenticated on public.spaces
  for select to authenticated using (true);

-- posts: leitura livre em canal free; canal member exige membership ativa
create policy posts_select_by_tier on public.posts
  for select to authenticated using (
    exists (
      select 1 from public.spaces s
      where s.id = posts.space_id
        and (s.min_tier = 'free' or public.is_active_member())
    )
  );
create policy posts_insert_by_tier on public.posts
  for insert to authenticated with check (
    author_id = auth.uid()
    and exists (
      select 1 from public.spaces s
      where s.id = posts.space_id
        and (s.min_tier = 'free' or public.is_active_member())
    )
  );

-- comments: segue o tier do canal do post
create policy comments_select_by_tier on public.comments
  for select to authenticated using (
    exists (
      select 1 from public.posts p join public.spaces s on s.id = p.space_id
      where p.id = comments.post_id
        and (s.min_tier = 'free' or public.is_active_member())
    )
  );
create policy comments_insert_by_tier on public.comments
  for insert to authenticated with check (
    author_id = auth.uid()
    and exists (
      select 1 from public.posts p join public.spaces s on s.id = p.space_id
      where p.id = comments.post_id
        and (s.min_tier = 'free' or public.is_active_member())
    )
  );

-- reactions: segue o tier do canal do post (curtida em post); leitura/insert/delete do próprio usuário
create policy reactions_select_by_tier on public.reactions
  for select to authenticated using (
    (post_id is not null and exists (
      select 1 from public.posts p join public.spaces s on s.id = p.space_id
      where p.id = reactions.post_id and (s.min_tier = 'free' or public.is_active_member())
    ))
    or
    (comment_id is not null and exists (
      select 1 from public.comments c join public.posts p on p.id = c.post_id join public.spaces s on s.id = p.space_id
      where c.id = reactions.comment_id and (s.min_tier = 'free' or public.is_active_member())
    ))
  );
create policy reactions_insert_own on public.reactions
  for insert to authenticated with check (user_id = auth.uid());
create policy reactions_delete_own on public.reactions
  for delete to authenticated using (user_id = auth.uid());

-- Canais iniciais
insert into public.spaces (slug, name, icon, min_tier, sort_order) values
  ('apresente-se', 'Apresente-se', 'Hand', 'free', 0),
  ('duvidas', 'Dúvidas', 'HelpCircle', 'free', 1),
  ('vitrine', 'Vitrine', 'Store', 'member', 2),
  ('vagas-parcerias', 'Vagas & Parcerias', 'Briefcase', 'member', 3),
  ('sugestoes', 'Sugestões', 'Lightbulb', 'free', 4);
```

---

## Passo 6 — Biblioteca de Prompts

**Objetivo:** biblioteca navegável por categoria, com prévia pra grátis e conteúdo completo pra Membro.

**Diferença de gating vs. Passo 5:** em `spaces`/`posts`, o bloqueio é de **linha inteira** (RLS barra o
`select` do post inteiro). Em `prompts`, o requisito é de **coluna** — item `member` continua visível na
lista (título, categoria), só o `body_md` completo é que fica escondido pra quem é grátis, trocado por
uma prévia truncada. RLS de tabela não faz redação de coluna sozinha, por isso o padrão aqui é uma
**view** com `security_invoker = true` (mesmo padrão de `public_profiles` do passo 2) que aplica um
`case` no corpo — evita duplicar lógica de tier em cada client.

**6.1 — Tabela + view** (SQL a rodar no SQL Editor):

```sql
create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  body_md text not null,
  min_tier text not null check (min_tier in ('free', 'member')) default 'member',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index prompts_category_idx on public.prompts(category);

alter table public.prompts enable row level security;

-- Metadado (título/categoria) sempre visível pra autenticado — o corpo é redigido na view abaixo.
create policy prompts_select_authenticated on public.prompts
  for select to authenticated using (true);

-- Reusa is_active_member() criada no passo 5.
create view public.prompts_gated
with (security_invoker = true) as
select
  id,
  category,
  title,
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
```

Sem `insert`/`update`/`delete` pelo client — cadastro de prompt é manual via SQL Editor (mesmo padrão de
`memberships`/matrícula manual, sem admin CRUD nesta v1; YAGNI até haver volume que justifique um painel).

**6.2 — Hook `usePrompts()`** (`src/hooks/usePrompts.ts`, espelha `useSpaces.ts`): consulta
`prompts_gated` ordenado por `sort_order`; retorna `prompts`, `loading`, `error`. Categorias pra os
chips de filtro vêm do próprio array (`[...new Set(prompts.map(p => p.category))]`), sem tabela nova.

**6.3 — Tela** (`/academy/prompts`, `PromptsPage.tsx`): chips de categoria (mesmo padrão visual dos
canais da Comunidade) + lista em accordion (reusa `components/ui/accordion.tsx`, já usado em
`CourseSyllabus`). Cada item expande o `body_md` (truncado ou completo, conforme `locked`); item
`locked` mostra CTA "Torne-se Membro" no lugar do texto completo, sem esconder o item da lista.

**Nav:** ativar o item "Prompts" no `AcademyShell.tsx` (`NAV_ITEMS`) — hoje é `{ label: "Prompts", icon:
Sparkles }` sem `to`, cai no badge "Em breve"; troca pra `{ label: "Prompts", icon: Sparkles, to:
"/academy/prompts" }`, mesmo padrão do que foi feito com "Comunidade" no passo 5.

**Critério:** grátis vê a lista completa de categorias/títulos mas corpo truncado + CTA nos itens
`member`; Membro vê tudo completo; `tsc --noEmit` e `npm run build` limpos; verificado no preview
logado (com e sem membership ativa, mesmo padrão de teste do passo 5).

**Status (19/07/2026): ✅ concluído e verificado.** Escopo ampliado na revisão do plano com Felipe:
duas tabelas separadas `prompts`/`skills` (em vez de uma só), campo `description` novo, e cadastro por
tela de admin (`LibraryManager.tsx`, abas "Prompts"/"Skills" em `AdminAcademy.tsx`) em vez de manual
via SQL. Verificação ponta a ponta: admin criou/editou/excluiu itens de teste nas duas tabelas; aluno
sem membership viu item `free` completo e item `member` truncado com cadeado + CTA. Bug de cache entre
contas (queryKey sem `user.id`) achado e corrigido durante o teste — ver [[KNOWN_ISSUES]] KI-22. Detalhe
completo em [[TIMELINE]].

---

## Ordem e travas

1. Passo 3 → sua aprovação → passo 4 → sua aprovação → passo 5 → sua aprovação → passo 6.
2. Cada passo fecha com `npm run build` limpo + verificação no preview (quando há UI) antes do próximo.
3. Qualquer SQL: eu te entrego o script, **você** roda no SQL Editor (o MCP desta sessão não enxerga o
   banco Academy).
4. Nada de push/deploy sem seu OK explícito.

## Pendência fora do código
Confirmar no painel Supabase que **Confirm email** (Authentication → Providers → Email) está **ligado**
de novo — foi desligado temporariamente no passo 2 pra testar signup.

## Documentos relacionados
- [[PRD-006-hub-comunidade]] · [[ROADMAP]] · [[TIMELINE]] · [[DECISIONS]] (D-013, D-014, D-015)
