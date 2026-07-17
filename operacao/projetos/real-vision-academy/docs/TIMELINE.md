---
id: TIMELINE
title: Timeline — Real Vision Academy
type: timeline
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ROADMAP
  - CHANGELOG
---

# Timeline — Real Vision Academy

> Registro cronológico do desenvolvimento. Cada marco: data · objetivo · atividades · decisões · próximos passos.

## 2026-07-17 — Kickoff e fundação documental
- **Objetivo:** iniciar o projeto conforme a Master Engineering Directive + adendo Master Visionair.
- **Atividades:**
  - Leitura das duas diretivas.
  - Rodada de perguntas com o Felipe (16 perguntas) → decisões travadas.
  - Análise da base existente (`real-vision-site`).
  - Criação da skill [[master-visionair]].
  - Criação da estrutura documental (Gaveta B) neste vault.
  - Escrita de [[MASTER_PRD]], [[ARCHITECTURE]], [[ROADMAP]], [[DECISIONS]], [[CONTEXT]].
- **Decisões:** D-001 (mesmo repo), D-002 (Supabase unificado), D-003 (curso avulso), D-004 (docs no vault).
- **Próximos passos:** pesquisas [[pagamento]] e [[video-hosting]]; aprovação do Felipe; abrir Fase 1.

## 2026-07-17 — Pesquisa técnica, conferência de alinhamento e mapa de bloqueadores
- **Objetivo:** concluir as pesquisas pendentes e preparar a virada para execução (via Fable 5).
- **Atividades:**
  - Pesquisa real de mercado para [[pagamento]] (Stripe/Mercado Pago/PagSeguro/Kiwify/Hotmart).
  - Pesquisa real de mercado para [[video-hosting]] (Bunny Stream/Vimeo/Supabase Storage).
  - Felipe escolheu **Stripe** → registrado como D-005.
  - Vídeo (D-006) — Felipe optou por **decidir depois**; recomendação Bunny Stream permanece em pé.
  - Conferência de alinhamento entre o plano e o Goal oficial (Directive §12 + Adendo §12) — resultado:
    10/13 critérios já endereçados no plano ou entregues, 3 em andamento saudável (dependem de
    implementação). Nenhum desalinho de escopo encontrado, exceto confirmar se "comunidade" fica
    mesmo fora do MVP (ainda em aberto).
  - Confirmado explicitamente com o Felipe: **nenhuma execução/código/deploy realizado ainda** —
    fase 100% de planejamento e documentação.
  - Mapeados os bloqueadores para iniciar a Fase 1 (ver [[CONTEXT]] "Pendências para execução").
- **Decisões:** D-005 (Stripe).
- **Próximos passos:** Felipe resolve os bloqueadores 🔴 (aprovação do PRD/Roadmap, anon key do
  Supabase novo, Google OAuth habilitado, decidir como aplicar o schema no banco) e os 🟡
  (comunidade fora do MVP?, migrar ou recomeçar o login do blog). Depois disso, transformar o plano
  da Fase 1 num prompt de execução para o **Fable 5** rodar, com um `/goal` guiando o escopo.

## Documentos relacionados
- [[ROADMAP]]
- [[CHANGELOG]]
- [[CONTEXT]]
