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

## D-006 — Hospedagem de vídeo: Bunny Stream
- **Data:** 2026-07-17 (pesquisa) · decidido em 2026-07-18
- **Contexto:** Pesquisa [[video-hosting]] comparou YouTube não-listado, Vimeo, Bunny Stream e
  Supabase Storage, para vídeos de curso pago (exige proteger contra acesso sem matrícula).
- **Decisão:** **Bunny Stream** para os vídeos das aulas + **Supabase Storage** para materiais
  complementares (prompts `.md`, PDFs).
- **Justificativa:** Custo baixíssimo no volume da Academy (~US$1–5/mês) e a melhor proteção de
  conteúdo pago das opções avaliadas (link com expiração + trava de download), contra ~US$12–33/mês
  do Vimeo por proteção equivalente ou inferior. YouTube não serve (sem trava nenhuma).
- **Impacto:** Destrava a Fase 3 (player/área de membros). Setup inicial: conta Bunny Stream +
  biblioteca de vídeo + integração de link com expiração no player.

## D-007 — Login do blog: recomeçar limpo (sem migrar dados)
- **Data:** 2026-07-17
- **Contexto:** A auth/likes/comentários do blog rodavam no Supabase do VisionFlow. Ao repontar para o
  banco novo, era preciso decidir migrar os dados existentes ou recomeçar do zero.
- **Decisão:** **Recomeçar limpo.** Tabelas recriadas vazias no banco novo; dados antigos ficam no
  Supabase do VisionFlow como arquivo (não migrados).
- **Justificativa:** Simplicidade; volume de likes/comentários do blog é baixo; evita risco de migração.
- **Impacto:** Ao publicar, likes/comentários antigos do blog em produção deixam de aparecer. Esperado.

## D-008 — Fase 1 executada direto no Claude Code (sem Fable 5)
- **Data:** 2026-07-17
- **Contexto:** Felipe cogitou usar o Fable 5 para construir tudo de uma vez.
- **Decisão:** Fase 1 (mecânica: repontar config, tela de auth, ativar provider) feita direto no Claude
  Code. Fable 5 fica reservado para fases com muitas decisões de arquitetura acumuladas (Fase 2/3).
- **Justificativa:** Fable custa 10x input / 50x output vs. Sonnet; o ganho dele só compensa em trabalho
  longo e denso em decisões. Regra registrada na skill [[master-visionair]].
- **Impacto:** Fase 1 concluída nesta sessão.

## D-009 — Tabelas de comunidade: adiadas (não criadas na Fase 2)
- **Data:** 2026-07-17
- **Contexto:** O escopo "2B" pedia preparar tabelas de comunidade na Fase 2 sem construir UI, mas não
  existe spec de comunidade.
- **Problema:** Criar schema sem spec ou adiar?
- **Decisão:** **Adiar.** Nenhuma tabela de comunidade criada. Felipe confirmou a recomendação.
- **Justificativa:** YAGNI — schema sem spec vira retrabalho quase certo; adicionar tabelas depois no
  Supabase é trivial, sem custo de adiar.
- **Impacto:** Comunidade entra só após spec própria (novo PRD + decisão). Ver [[ROADMAP]] "Futuro".

## D-010 — Materiais: assinatura client-side via RLS de Storage (sem função serverless)
- **Data:** 2026-07-18
- **Contexto:** O plano da Fase 3 previa `api/material-sign.ts` (Vercel function + service role key)
  para assinar URLs dos materiais no bucket privado `course-materials`.
- **Problema:** A função exigiria a `SUPABASE_SERVICE_ROLE_KEY` circulando no ambiente (e não seria
  testável antes de configurá-la no Vercel), sendo que o Storage do Supabase já suporta a mesma
  guarda nativamente.
- **Decisão:** **Policy de RLS em `storage.objects`** (`materials_read_enrolled`: leitura só se
  existe matrícula no curso extraído do caminho `{course_id}/...`) + `createSignedUrl` chamado
  **direto do client** com a sessão do aluno. A função serverless ficou só onde é inevitável:
  `api/bunny-sign.ts` (token key do Bunny é segredo de servidor).
- **Justificativa:** Recurso nativo da plataforma > código próprio (escada Ponytail); um segredo a
  menos; menos um endpoint pra manter; testável de imediato. Segurança equivalente — a policy roda
  no banco.
- **Impacto:** `api/material-sign.ts` não existe. `SUPABASE_SERVICE_ROLE_KEY` não é necessária na
  Fase 3 (o `bunny-sign` valida sessão e matrícula com a anon key, como o usuário, via RLS).

## D-011 — Fase 4 (MVP): checkout manual via WhatsApp, não Stripe
- **Data:** 2026-07-18
- **Contexto:** D-005 (Stripe) decidiu o gateway formal, mas [[pagamento]] registra uma decisão mais
  recente do Felipe, informal, direto no documento de pesquisa: não mexer em gateway agora, o site
  monta o pedido com os dados da compra e manda pro WhatsApp do Felipe (mesmo número cadastrado no
  site), que confirma o pagamento manualmente. Confirmado de novo com o Felipe nesta sessão, depois
  de eu ter corrigido `ARCHITECTURE.md` §5 pra Stripe achando que D-005 ainda valia como está.
- **Decisão:** Fase 4 do MVP usa **fluxo manual via WhatsApp**, reaproveitando o padrão que a Loja do
  site já usa (`src/components/shop/CartDrawer.tsx`): monta uma mensagem com os dados do pedido e
  abre `wa.me/5511912931924?text=...` com tudo pré-preenchido. Nenhum SDK de pagamento, nenhum
  webhook. Grava um registro em `orders` (`status: pending`) no clique de compra; Felipe confirma o
  pagamento pelo WhatsApp e concede a matrícula manualmente pelo `EnrollmentManager.tsx` (já existe,
  não precisa criar nada novo ali).
- **Justificativa:** Simplicidade — reusa código e schema que já existem, sem custo de integração de
  gateway agora. Felipe pode migrar pra Stripe depois, com volume real, sem essa decisão travar o
  lançamento do curso.
- **Impacto:** D-005 (Stripe) não foi descartado — vira upgrade futuro, não escopo do MVP. Escopo real
  da Fase 4: botão "Comprar" na landing (`Profissional360.tsx`) e/ou `CoursePage.tsx`, insert em
  `orders`, link `wa.me` formatado. Trabalho leve — não densificado em decisão, então não se enquadra
  na regra do Fable 5 (D-008); cabe em qualquer modelo, feito nesta sessão foi só o escopo, a
  implementação ficou pra próxima. `ARCHITECTURE.md` §5 e `ROADMAP.md` Fase 4 atualizados.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[MASTER_PRD]]
- [[CONTEXT]]
