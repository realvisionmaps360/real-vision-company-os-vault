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

## Skill operacional: `superpowers`
Ativar em toda fase de implementação (Fase 1 em diante) — não necessária na Fase 0 (só documentação).
Cobre: checkpoints de git (commit em pontos claros, `git status` antes de commitar pra não subir lixo
de build), build de produção antes de fechar cada fase (evita quebrar o deploy na Vercel), e
diagnóstico de porta/cache do PowerShell quando o ambiente local travar.

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

## Fase 4 — Checkout e pagamento ✅ concluída (2026-07-18)
- **Objetivo:** vender o curso avulso.
- **Escopo (D-011, MVP):** botão "Comprar" na landing (`Profissional360.tsx`); grava `orders`
  (`pending`); monta mensagem e abre `wa.me` pré-preenchido, reaproveitando o padrão de
  `CartDrawer.tsx` da Loja. Sem gateway, sem webhook — Stripe (D-005) fica pra depois.
- **Conclusão:** aluno consegue iniciar a compra pelo site; Felipe confirma pagamento no WhatsApp e
  concede a matrícula pelo admin (`EnrollmentManager.tsx`, já existe). Testado ponta a ponta —
  detalhe em [[TIMELINE]] e [[CHANGELOG]].

## Fase 5 — Conteúdo & lançamento do Profissional 360 (em andamento)
- **Objetivo:** curso pronto para venda.
- **Escopo:** produção/carga do conteúdo (vídeos + prompts), revisão de copy (ver [[realvision]]/VOZ),
  testes ponta a ponta, publicação.
- **Decisão 18/07/2026:** a landing promete "Comunidade exclusiva" e "Certificado Real Vision" como
  incluídos na compra, mas nenhum dos dois tinha spec/tabela até então (D-009 na Fase 2 adiou
  "comunidade" por YAGNI; "certificados" também listado em "Futuro" abaixo). Felipe decidiu manter
  a promessa na oferta e planejar a construção dentro da própria Fase 5, em vez de tirar da página.
  Certificado é mais simples (tela/PDF gerado ao concluir o curso, sem tabela nova); comunidade seguirá
  sem spec até ser desenhada.

## Futuro (exige novo planejamento)
Assinatura · comunidade · certificados · trilhas · tutor de IA · i18n (EN/DE) · ferramentas digitais.
Ver [[IDEAS]].

## Documentos relacionados
- [[MASTER_PRD]]
- [[ARCHITECTURE]]
- [[TIMELINE]]
- [[IDEAS]]
