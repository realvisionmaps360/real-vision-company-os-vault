---
id: DECISIONS
title: Decisões Arquiteturais — Real Vision Academy
type: decisions
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ARCHITECTURE
  - MASTER_PRD
---

# Decisões Arquiteturais — Real Vision Academy

> Registro append-only. Cada decisão: contexto · problema · decisão · justificativa · impacto.

## D-001 — Academy no mesmo repo do site, rota `/academy`
- **Data:** 2026-07-17
- **Contexto:** A diretiva exige "expansão natural", não sistema paralelo.
- **Problema:** Repo separado ou dentro do site?
- **Decisão:** Mesmo repositório `real-vision-site`, servida em `realvisionmaps.com/academy`.
- **Justificativa:** Reuso de design system, componentes, i18n e infra de deploy; consistência total.
- **Impacto:** Academy compartilha build/deploy Vercel do site; código organizado em `src/pages/academy`.

## D-002 — Supabase novo unifica todos os usuários finais
- **Data:** 2026-07-17
- **Contexto:** O site hoje usa o Supabase do VisionFlow (`ghwjetvazmdlaqidgxqi`) para login/like do blog.
  Felipe criou um Supabase novo (`xomtfkbvathddfpbknyo`, conta email smarthome, "realvision academy").
- **Problema:** O banco novo atende só a Academy ou também o blog?
- **Decisão:** O banco novo vira o **banco único de usuários finais** (blog + Academy). O Supabase do
  VisionFlow volta a ser 100% CRM interno.
- **Justificativa:** Um login só para o visitante em todo o site; separação limpa entre público
  (Academy/blog) e interno (CRM); evita duas contas de usuário no mesmo front.
- **Impacto:** Fase 1 precisa repontar `supabase.ts` e migrar a auth/likes do blog para o banco novo.

## D-003 — Curso avulso (compra única) no MVP
- **Data:** 2026-07-17
- **Decisão:** Modelo de compra única por curso. Assinatura fica para o futuro.
- **Justificativa:** Simplicidade; alinhado ao primeiro produto (Profissional 360).

## D-004 — Documentação viva no vault (Gaveta B), não no repo de código
- **Data:** 2026-07-17
- **Decisão:** Docs em `operacao/projetos/real-vision-academy/docs/` (vault Obsidian). Repo tem só um
  ponteiro (`docs/academy/README.md`).
- **Justificativa:** Backlinks Obsidian, leitura no mobile, navegação via Obsidian CLI — o que o adendo
  Master Visionair exige.
- **Impacto:** Metodologia conduzida pela skill [[master-visionair]].

## D-005 — Gateway de pagamento: Stripe
- **Data:** 2026-07-17
- **Contexto:** Pesquisa [[pagamento]] comparou Stripe, Mercado Pago, PagSeguro e plataformas prontas
  (Hotmart/Kiwify), para curso avulso com área de membros própria.
- **Decisão:** **Stripe** como gateway do MVP.
- **Justificativa:** Checkout transparente (dentro do site — consistência visual), menor taxa efetiva
  entre os gateways (~3,9–4,9%), melhor DX/API, destrava assinatura e internacional no futuro.
- **Impacto:** Fase 4 constrói checkout + webhook server-side (Vercel function) → cria matrícula.
  Avaliar habilitar Pix via Stripe depois do lançamento, com dado real.

## D-006 — Hospedagem de vídeo: PENDENTE
- **Data:** 2026-07-17
- **Status:** Felipe optou por **decidir depois**. Recomendação em aberto: **Bunny Stream** (vídeo) +
  Supabase Storage (materiais/prompts). Ver [[video-hosting]].
- **Impacto:** Só trava a Fase 3 (player/área de membros). Não bloqueia Fases 1–2.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[MASTER_PRD]]
- [[CONTEXT]]
