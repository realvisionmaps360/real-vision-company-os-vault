---
id: ROADMAP
title: Roadmap — Real Vision Academy
type: roadmap
status: draft
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
depends_on:
  - MASTER_PRD
  - ARCHITECTURE
related:
  - TIMELINE
---

# Roadmap — Real Vision Academy

> Fases de desenvolvimento. Cada fase só começa após a anterior concluída, documentada e aprovada.
> Sequência pensada para minimizar risco e retrabalho.

## Fase 0 — Planejamento e fundação documental ✅ (em curso)
- **Objetivo:** documentação de fundação + skill [[master-visionair]] + pesquisas técnicas.
- **Critério de conclusão:** [[MASTER_PRD]], [[ARCHITECTURE]], [[ROADMAP]] escritos; [[pagamento]] e
  [[video-hosting]] concluídas; Felipe aprova.

## Fase 1 — Auth unificada + Google OAuth
- **Objetivo:** um login só para todos os usuários finais no Supabase novo.
- **Escopo:** repontar `supabase.ts`; migrar auth/likes do blog; adicionar Google OAuth;
  criar `AuthContext` global; ajustar `AuthModal`/`useAuth`.
- **Dependências:** anon key do Supabase novo + Google OAuth habilitado no painel.
- **Riscos:** migração da auth do blog sem quebrar likes/comentários existentes.
- **Conclusão:** login Google + e-mail/senha funcionando; blog segue curtindo/comentando no banco novo.

## Fase 2 — Modelo de dados + painel admin
- **Objetivo:** catálogo de cursos gerenciável.
- **Escopo:** tabelas (`courses`/`modules`/`lessons`/`materials`/`enrollments`/`lesson_progress`/
  `orders`/`profiles`) + RLS; painel `/academy/admin` (CRUD).
- **Conclusão:** Felipe cadastra o Profissional 360 completo pelo admin.

## Fase 3 — Área de membros + player + progresso
- **Objetivo:** aluno consome o curso.
- **Escopo:** `/academy` (meus cursos), página do curso, player de vídeo, materiais complementares
  (prompts `.md`), registro/exibição de progresso.
- **Conclusão:** aluno matriculado assiste, baixa prompts e vê progresso.

## Fase 4 — Checkout e pagamento
- **Objetivo:** vender o curso avulso.
- **Escopo:** integração do gateway escolhido; webhook server-side → cria matrícula; página de
  compra + pós-compra.
- **Conclusão:** compra real gera acesso automático.

## Fase 5 — Conteúdo & lançamento do Profissional 360
- **Objetivo:** curso pronto para venda.
- **Escopo:** produção/carga do conteúdo (vídeos + prompts), revisão de copy (ver [[realvision]]/VOZ),
  testes ponta a ponta, publicação.

## Futuro (exige novo planejamento)
Assinatura · comunidade · certificados · trilhas · tutor de IA · i18n (EN/DE) · ferramentas digitais.
Ver [[IDEAS]].

## Documentos relacionados
- [[MASTER_PRD]]
- [[ARCHITECTURE]]
- [[TIMELINE]]
- [[IDEAS]]
