---
id: ARCHITECTURE
title: Arquitetura — Real Vision Academy
type: architecture
status: draft
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
depends_on:
  - MASTER_PRD
related:
  - DECISIONS
  - ROADMAP
  - KNOWN_ISSUES
---

# Arquitetura — Real Vision Academy

> Visão técnica. Atualizar sempre que uma decisão mudar a estrutura. Ver [[DECISIONS]].

## 1. O que já existe (base analisada em 2026-07-17)

Repo: `operacao/projetos/_RV-Internos/real-vision-site` — **React + Vite + TypeScript + Tailwind +
shadcn/ui + react-i18next + React Router v6**. Deploy Vercel. Supabase JS instalado.

**Reaproveitável:**
- `src/lib/supabase.ts` — client Supabase centralizado (hoje aponta pro projeto do VisionFlow).
- `src/hooks/useAuth.ts` — `signUp`, `signInWithPassword`, `signInWithMagicLink`, `signOut`.
- `src/components/AuthModal.tsx` — modal de cadastro/login (e-mail/senha + magic link).
- shadcn/ui completo, Framer Motion, @tanstack/react-query, Resend (e-mail), i18next.
- `src/App.tsx` — padrão de rotas: PT na raiz, `/en/*` e `/de/*` para idiomas.
- `src/pages/Profissional360.tsx` + rota `/profissional-360` — landing do curso (já existe).

**Lacunas (a implementar nas fases):**
- Sem **Google OAuth** (só e-mail/senha + magic link).
- Sem **AuthContext global** — cada componente usa `useAuth` isolado; área de membros precisa de um
  provider único de sessão.
- `supabase.ts` aponta pro Supabase do VisionFlow → repontar pro Supabase novo da Academy.

## 2. Decisões estruturais

- **Mesmo repo, rota `/academy`** (não sistema separado). Ver [[DECISIONS]] D-001.
- **Supabase novo `xomtfkbvathddfpbknyo`** como banco único de usuários finais (blog + Academy).
  VisionFlow volta a ser 100% CRM interno. Ver [[DECISIONS]] D-002.
- Segurança por **RLS**: matrícula controla acesso ao conteúdo.

## 3. Modelo de dados (rascunho, genérico para N cursos)

> Preliminar — detalhar em `prds/PRD-002-modelo-de-dados.md`. Nomes em inglês, snake_case.

| Tabela | Papel |
|---|---|
| `profiles` | Perfil do usuário final (1:1 com `auth.users`); nome, opt-in de marketing, role (`student`/`admin`) |
| `courses` | Curso (slug, título, descrição, capa, preço, status publicado) |
| `modules` | Módulo de um curso (ordem, título) |
| `lessons` | Aula de um módulo (ordem, título, referência do vídeo, duração) |
| `materials` | Material complementar de uma aula (tipo: `md_prompt`/`pdf`/`link`/`download`, url/conteúdo) |
| `enrollments` | Matrícula: qual usuário tem acesso a qual curso (origem: compra/cortesia; data) |
| `lesson_progress` | Progresso: usuário × aula (concluída, timestamp) |
| `orders` | Pedido de compra (usuário, curso, valor, status, gateway, id externo do pagamento) |

**RLS resumida:** `profiles`/`enrollments`/`lesson_progress`/`orders` — cada usuário lê/escreve só os
próprios registros. `courses`/`modules`/`lessons` — leitura pública dos publicados; conteúdo/materiais
protegidos exigem matrícula ativa. Escrita em catálogo só para `role = admin`.

## 4. Autenticação (unificada)

- Um único projeto Supabase para todos os usuários finais.
- Provedores: **Google OAuth** + e-mail/senha (+ magic link já existente).
- **AuthContext global** (novo) provê `session`/`user`/`role` para todo o app; `useAuth` passa a
  consumir o context em vez de instanciar listeners soltos.
- Migração da auth/likes do blog para o banco novo — planejar em `prds/PRD-001-auth-unificada.md`.

## 5. Pagamento

Curso avulso. Gateway a definir por [[pagamento]]. Fluxo previsto: checkout → webhook confirma
pagamento → cria `enrollment` → libera acesso. O webhook exige função server-side (Vercel
serverless function — o repo já usa `@vercel/node`).

## 6. Entrega de vídeo

A definir por [[video-hosting]]. Requisito: proteção razoável do conteúdo pago + custo controlado +
boa DX de player.

## 7. Painel admin

Rota protegida (`/academy/admin`) visível só para `role = admin`. CRUD de cursos/módulos/aulas/
materiais/preços e concessão manual de matrícula. Reusa componentes shadcn/ui.

## 8. Estrutura de código proposta (dentro do repo do site)

```
src/
├── pages/academy/          # rotas da Academy (/academy, /academy/curso/:slug, /academy/admin...)
├── components/academy/      # componentes específicos da Academy (player, card de curso, progresso)
├── hooks/                   # useAuth (estendido), useEnrollment, useProgress...
├── lib/supabase.ts          # repontar pro Supabase novo
└── contexts/AuthContext.tsx # provider global de sessão (novo)
```

## Documentos relacionados
- [[MASTER_PRD]]
- [[DECISIONS]]
- [[ROADMAP]]
- [[KNOWN_ISSUES]]
- [[pagamento]]
- [[video-hosting]]
