---
type: source
title: "Acquisition Timeline — Missões 1 a 5"
aliases: ["acquisition-timeline"]
date_created: 2026-06-30
date_updated: 2026-06-30
source_count: 0
source_file: "operacao/prospeccao/ACQUISITION-TIMELINE.md"
date_ingested: 2026-06-30
tags: [prospeccao, aquisicao]
status: stable
---

# Acquisition Timeline — Missões 1 a 5

## TL;DR
Registro cronológico das Missions de construção do sistema de aquisição da Real Vision 360. 4 missions concluídas; Mission 5 é a operação contínua.

## Missions

### ? Mission 1 — Papel Acquisition Claude (jun/2026)
Definiu o papel do Acquisition Claude como maestro do funil. Criou o Opportunity Score (0-100) com 4 sub-scores. Campanha Paraty executada durante a mission: 35 pousadas, 31 WA + 17 emails.

### ? Mission 2 — Arquitetura (20/06/2026)
Banco separado do VisionFlow. Handover manual. Modelo de dados aprovado: `prospects`, `prospect_events`, `campaigns`, `campaign_prospects`.

### ? Mission 3 — Banco Construído (24-25/06/2026)
8 tabelas especificadas e construídas. Banco `rv-acquisition` (`gexacmtkjqectfqwhunv`) em produção. Dedup por `pg_trgm`.

### ? Mission 4 — Operating System (24/06/2026)
Manual operacional com 15 seções. Faixas de score (80–100 imediato / 60–79 padrão / 40–59 futura / <40 arquiva). Follow-up de 3 toques. 9 portões humanos definidos.

### ?? Mission 5 — Operação Contínua (futura)
Primeira rodada Sócio Digital no novo banco + relatório semanal automatizado + São Tomé das Letras como segunda campanha.

## Conexões
- [[acquisition-system]]
- [[campanha-paraty-2026]]
- [[opportunity-score]]

## Conexões
- [[acquisition-system]]
- [[campanha-paraty-2026]]
- [[opportunity-score]]
- [[rv-empresa]]
