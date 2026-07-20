---
id: PRD-006
title: PRD — Hub da Área de Membros + Comunidade v1
type: prd
status: approved
project: real-vision-academy
phase: 6
owner: master-visionair
created: 2026-07-19
updated: 2026-07-19
depends_on:
  - ARCHITECTURE
  - PRD-002-modelo-de-dados
related:
  - DECISIONS
  - ROADMAP
  - KNOWN_ISSUES
  - PRD-005-area-de-membros
---

# PRD-006 — Hub da Área de Membros + Comunidade v1

> Plano **aprovado pelo Felipe em 2026-07-19**. Nasceu da decisão de transformar o `/academy` de
> "grade de cursos" num **ecossistema/hub**: aprende, aplica, encontra parceiros, acompanha evolução —
> tudo num lugar. Referência estrutural: comunidade ibe.IA / Sem Codar (plataforma Circle), recriada
> com a identidade da Real Vision. O curso passa a ser **uma parte** da experiência, não o todo.
> Decisões que fundamentam este PRD: [[DECISIONS]] D-013 (anuidade), D-014 (comunidade nativa),
> D-015 (nomenclatura de tiers).

## Modelo de acesso — duas trilhas independentes

A pessoa pode ter uma, outra, ou as duas. São direitos ortogonais:

| Direito | Como se ganha | Dá acesso a |
|---|---|---|
| **Membro** (anuidade) | paga a anuidade — `memberships` (novo) | Comunidade completa + Biblioteca de Prompts completa + Mentor IA (fase futura) |
| **Aluno** (matrícula) | compra o curso X — `enrollments` (já existe) | O curso X: player, materiais, progresso, certificado |

Não se confundem: comprar o Profissional 360 **não** dá anuidade automática, e ser Membro **não** dá
curso automático. (Regra de "curso dá X meses de anuidade de brinde" fica como gatilho futuro, fora
deste MVP.) A decisão D-003 (curso avulso) permanece válida; a anuidade é um **produto novo**, não a
substitui.

## Nomenclatura de tiers (D-015)

| Tier | Estado | Vê |
|---|---|---|
| **Visitante** | não logado | catálogo público, blog |
| **Usuário** | logado, grátis | comunidade parcial (canais abertos), prévia da Biblioteca de Prompts. Sem cursos, sem Mentor IA |
| **Membro** | anuidade ativa | comunidade completa, Biblioteca de Prompts completa, Mentor IA (futuro) |
| **Aluno** | matrícula em curso | o curso adquirido (independente do tier acima) |

Gating por `min_tier` nas tabelas de conteúdo da comunidade (`free` | `member`).

## O que já existe (não duplicar)

`/academy` (Meus Cursos), página do curso, player Bunny com seam, progresso, certificado (D-012),
compra via WhatsApp (D-011), painel admin, auth unificada. Tudo isso **encaixa dentro da casca nova**,
não é refeito. Ver [[PRD-003-area-de-membros]] e [[CONTEXT]].

## Fase 0 — pré-requisito duro ✅ resolvida (2026-07-19)

**Trigger de auto-criação de `profiles`.** A comunidade exige que todo usuário tenha uma linha em
`profiles` no cadastro. **Verificação ao vivo (2026-07-19):** o trigger **já existia** —
`on_auth_user_created` → `handle_new_user()` (SECURITY DEFINER, fallback de nome, `on conflict do
nothing`, role `student`), criado na Fase 3; a afirmação original deste PRD ("não há trigger") vinha
do KI-11 desatualizado. Restava **1 usuário órfão** (conta pessoal do Felipe, criada antes do
trigger) — backfill executado via `INSERT ... SELECT` genérico. Estado final verificado: 4 usuários,
4 perfis. Nada mais a fazer nesta fase.

## Escopo do MVP — telas

| # | Tela | Rota | Notas |
|---|---|---|---|
| 1 | Casca do hub (sidebar estilo Circle) | envolve `/academy` | blocos: Início · Aprender · Comunidade · Prompts · Conta. Envolve o que já existe. |
| 2 | Dashboard | `/academy` | progresso agregado, "continuar de onde parei", próximas aulas, avisos, atividade recente da comunidade |
| 3 | Comunidade (feed + espaços) | `/academy/comunidade` | canais iniciais: Apresente-se, Dúvidas, Vitrine, Vagas & Parcerias, Sugestões |
| 4 | Post individual | `/academy/comunidade/post/:id` | corpo, comentários, curtidas |
| 5 | Perfil público do membro | `/academy/membro/:handle` | foto, empresa, cidade, segmento, links, conquistas (placeholder), posts |
| 6 | Biblioteca de Prompts | `/academy/prompts` | navegável por nicho/categoria, gating `free`/`member` |
| 7 | Conta (perfil + senha) | `/academy/conta` | absorve o Bloco B do [[PRD-005-area-de-membros]] |

Bloco A do PRD-005 (link "Meus Cursos" no header — KI-21) entra junto, é reuso de link.

## Modelo de dados — delta (Supabase `xomtfkbvathddfpbknyo`)

Padrões [[supabase-postgres]]: `id uuid pk default gen_random_uuid()`, `timestamptz`, RLS habilitado
em toda tabela, índice em toda FK, client singleton (nunca `createClient()` fora do módulo único).

| Tabela | Papel | Campos-chave |
|---|---|---|
| `memberships` | anuidade (entitlement) | `user_id` FK, `status` (active/expired), `started_at`, `expires_at` |
| `spaces` | canais da comunidade | `slug`, `name`, `icon`, `min_tier` (free/member), `sort_order` |
| `posts` | publicações | `space_id` FK, `author_id` FK, `title`, `body`, `created_at` |
| `comments` | comentários | `post_id` FK, `author_id` FK, `body` |
| `reactions` | curtidas | `post_id`\|`comment_id`, `user_id` (unique por par) |
| `prompts` | biblioteca | `title`, `body_md`, `category`, `min_tier` |
| `profiles` (estender) | perfil público | + `handle` (unique), `company`, `city`, `segment`, `links` (jsonb), `headline`, `bio` |

**RLS por tier:** conteúdo com `min_tier = 'member'` só é lido se existe `memberships` ativo do
usuário (mesma lógica de matrícula do `enrollments`, D-010). Gate de membership tem que **distinguir
negação real de erro transitório** (status da resposta), pra instabilidade de backend não virar
bloqueio falso — regra [[supabase-postgres]].

## Fora do escopo (fases seguintes)

- **Fase B:** gamificação (XP, níveis, medalhas, ranking, streak), missões, quiz por módulo, resumo/checklist de aula por IA, roadmap personalizado.
- **Fase C:** Mentor IA (RAG treinado no conteúdo — só faz sentido depois das aulas gravadas), "Construa comigo", marketplace interno, mapa de oportunidades, IA de negociação.
- **Fase D:** IA proativa que acompanha a jornada e recomenda.

Motivo de adiar o Mentor IA: RAG precisa de corpus. Treinar antes das aulas existirem é trabalho no
vazio. É também o diferencial pago — pode esperar haver Membros pagantes.

## Sequência de implementação sugerida

1. **Fase 0** — trigger de `profiles` + backfill (destrava tudo; testável isolado).
2. Estender `profiles` + tela de Perfil público e Conta (item 7 + 5) — base pra qualquer post ter autor.
3. `memberships` + gating por tier (regra central de acesso).
4. Casca do hub (item 1) envolvendo o `/academy` atual + Dashboard (item 2).
5. Comunidade v1: `spaces`/`posts`/`comments`/`reactions` + feed/canais/post (itens 3 e 4).
6. Biblioteca de Prompts (item 6).

Cada passo fecha com `npm run build` limpo + verificação no preview antes do próximo.

## Frente paralela (não é código) — conteúdo do curso

Só o **Módulo 1** do Profissional 360 tem roteiro escrito; a grade (CONCEITO.md) existe, mas os
roteiros dos **Módulos 0, 2, 3, 4 e 5** não. Gravação flui melhor com roteiro — rodar a
[[rv-course-builder]] pra gerar os templates faltantes. Roda em paralelo à construção do hub, sem
bloquear.

## Modelo de execução

Construir com **Opus 4.8, fase por fase** (o modelo padrão atual, com aprovação do Felipe entre fases).
Fable 5 reservado só pra maratona longa não supervisionada — não é o nosso fluxo. (Regra da
`master-visionair` sobre "Fable vs. Claude Code" está desatualizada — corrigir a skill depois.)

## Critério de conclusão do MVP

Usuário grátis loga e navega comunidade parcial + prévia de prompts; Membro vê comunidade completa +
prompts completos; Aluno segue assistindo curso normalmente dentro da casca nova; posts/comentários/
curtidas funcionam com RLS por tier; perfil público exibe dados do membro; build limpo; verificado no
preview.

## Documentos relacionados
- [[ARCHITECTURE]] · [[PRD-002-modelo-de-dados]] · [[PRD-003-area-de-membros]] · [[PRD-005-area-de-membros]]
- [[DECISIONS]] — D-013, D-014, D-015 · [[ROADMAP]] · [[KNOWN_ISSUES]] — KI-11, KI-21
