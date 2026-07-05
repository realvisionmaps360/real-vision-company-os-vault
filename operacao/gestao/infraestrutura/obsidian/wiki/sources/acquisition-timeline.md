---
type: source
title: "Acquisition Timeline � Miss�es 1 a 5"
aliases: ["acquisition-timeline"]
date_created: 2026-06-30
date_updated: 2026-06-30
source_count: 0
source_file: "operacao/prospeccao/ACQUISITION-TIMELINE.md"
date_ingested: 2026-06-30
tags: [prospeccao, aquisicao]
status: stable
---

# Acquisition Timeline � Miss�es 1 a 5

## TL;DR
Registro cronol�gico das Missions de constru��o do sistema de aquisi��o da Real Vision. 4 missions conclu�das; Mission 5 � a opera��o cont�nua.

## Missions

### ? Mission 1 � Papel Acquisition Claude (jun/2026)
Definiu o papel do Acquisition Claude como maestro do funil. Criou o Opportunity Score (0-100) com 4 sub-scores. Campanha Paraty executada durante a mission: 35 pousadas, 31 WA + 17 emails.

### ? Mission 2 � Arquitetura (20/06/2026)
Banco separado do VisionFlow. Handover manual. Modelo de dados aprovado: `prospects`, `prospect_events`, `campaigns`, `campaign_prospects`.

### ? Mission 3 � Banco Constru�do (24-25/06/2026)
8 tabelas especificadas e constru�das. Banco `rv-acquisition` (`gexacmtkjqectfqwhunv`) em produ��o. Dedup por `pg_trgm`.

### ? Mission 4 � Operating System (24/06/2026)
Manual operacional com 15 se��es. Faixas de score (80�100 imediato / 60�79 padr�o / 40�59 futura / <40 arquiva). Follow-up de 3 toques. 9 port�es humanos definidos.

### ?? Mission 5 � Opera��o Cont�nua (futura)
Primeira rodada S�cio Digital no novo banco + relat�rio semanal automatizado + S�o Tom� das Letras como segunda campanha.

## Conex�es
- [[acquisition-system]]
- [[campanha-paraty-2026]]
- [[opportunity-score]]

## Conex�es
- [[acquisition-system]]
- [[campanha-paraty-2026]]
- [[opportunity-score]]
- [[rv-empresa]]
