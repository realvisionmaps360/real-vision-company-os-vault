---
id: CONTEXT
title: Contexto Atual — Real Vision Academy
type: context
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - MASTER_PRD
  - ARCHITECTURE
  - ROADMAP
  - DECISIONS
---

# Contexto Atual — Real Vision Academy

> Primeiro documento a ler para reconstruir o contexto. Mantido curto e atualizado ao fim de cada etapa.

## Fase atual
**Fases 1+2 publicadas em produção** (2026-07-17, OK explícito do Felipe): auth unificada + Google
OAuth, modelo de dados + painel admin, e o ponto de entrada de login global no header. Próxima:
**Fase 3** (área de membros + player + progresso) — depende de D-006 (vídeo).

## Objetivo em andamento
Destravar a Fase 3 (decidir hospedagem de vídeo, D-006) e resolver as pendências pós-publicação
(promover Felipe a admin, trigger de auto-criação de `profiles`).

## Última etapa concluída (2026-07-17) — Fase 2
- 7 tabelas do catálogo criadas no banco novo via Management API (`courses`→`orders`) + função
  `is_admin()` + 17 policies RLS (inclui `profiles_admin_select`). Detalhe em [[PRD-002-modelo-de-dados]].
- Painel `/academy/admin` construído (guard login+role admin): CRUD curso→módulos→aulas→materiais→
  preço + concessão manual de matrícula por e-mail.
- Comunidade: tabelas **adiadas** (D-009, sem spec).
- Verificado: build ok; RLS testada anon + autenticada (admin CRUD ok, student bloqueado); painel
  validado ponta a ponta no preview via Playwright (curso completo + matrícula manual).
- **Atenção:** ninguém tem role `admin` ainda — promover o usuário do Felipe via SQL (KI-08).

## Decisões recentes
- D-007: recomeçar limpo o login do blog (sem migrar dados).
- D-008: Fase 1 feita direto no Claude Code; Fable 5 reservado para Fase 2/3.
- D-009: tabelas de comunidade adiadas (sem spec, YAGNI).

## Bloqueios
- Nenhum bloqueio duro. Publicação da Fase 1 depende só de env vars no Vercel + OK de deploy.

## Pendências
- [ ] **Promover o Felipe a admin** no banco novo após o 1º login em produção (KI-08).
- [ ] Criar trigger de auto-criação de `profiles` no signup (KI-11) — recomendado antes do lançamento público.
- [ ] Testar o Google OAuth ponta a ponta em produção (redirect real do Google).
- [ ] Cadastrar o curso Profissional 360 pelo painel (valida o critério da Fase 2 ponta a ponta).
- [ ] Hospedagem de vídeo: decidir até a Fase 3 (D-006 pendente). Recomendação: Bunny Stream.
- [ ] Conta Stripe + chaves + produto/preço — Fase 4.
- [ ] Conteúdo do Profissional 360 (vídeos + prompts `.md`) — Fase 5.

## Próximos passos
1. Felipe loga no site em produção (botão "Entrar" no header) → promover a admin via SQL (KI-08) →
   cadastrar o Profissional 360 pelo painel `/academy/admin`.
2. Decidir vídeo (D-006) e abrir a **Fase 3** (área de membros + player).

## Nota operacional (importante para a próxima sessão)
Para rodar SQL no banco novo (`xomtfkbvathddfpbknyo`), o MCP Supabase **não serve** (conector OAuth
apontando para outra conta/organização). Usar a **Management API** com o PAT da conta smarthome:
`POST https://api.supabase.com/v1/projects/xomtfkbvathddfpbknyo/database/query` com
`Authorization: Bearer <PAT sbp_...>`. O PAT/keys estão em `TEMP/ggg.txt` (limpar após uso).

## Documentos a consultar para continuar
[[MASTER_PRD]] · [[ARCHITECTURE]] · [[ROADMAP]] · [[DECISIONS]] · [[KNOWN_ISSUES]]
