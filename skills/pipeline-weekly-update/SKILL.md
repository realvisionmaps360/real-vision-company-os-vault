---
name: pipeline-weekly-update
description: Atualiza pipeline de prospecção — pontua leads, ordena fila, lista follow-ups, gera métricas semanais
category: prospecao
version: 1.0
author: Felipe Garcia
created: 2026-07-05
---

# Pipeline Weekly Update — Atualização Semanal de Prospecção

Skill para rodar toda 2ª feira (ou sob demanda) e deixar o pipeline de aquisição priorizado, com follow-ups em dia e métricas claras.

## Quando usar
- Toda 2ª feira 8h (scheduled job)
- Sob demanda quando Felipe pedir "atualiza o pipeline"
- Antes de semana de prospecção ativa

## Inputs
- `campaign_id` (opcional, default: última campanha ativa em `campaigns`)
- `foco_semana` (opcional: cidade/segmento para filtrar)

## Passo a passo

### 1. Buscar dados da campanha
```sql
-- Campaign ativa
SELECT * FROM campaigns WHERE status = 'ativa' ORDER BY created_at DESC LIMIT 1;

-- Prospects da campanha com eventos e scores
SELECT p.*, cp.priority, cp.opportunity_score, cp.score_need, cp.score_authority, cp.score_remote, cp.score_contactability,
       cp.next_followup_date, cp.followup_count, cp.current_status,
       pe.event_type, pe.detail, pe.created_at as event_date
FROM prospects p
JOIN campaign_prospects cp ON p.id = cp.prospect_id
LEFT JOIN prospect_events pe ON p.id = pe.prospect_id
WHERE cp.campaign_id = '<campaign_id>'
ORDER BY cp.opportunity_score DESC NULLS LAST;
```

### 2. Recalcular scores (Seção 4 - ACQUISITION-OPERATING-SYSTEM.md)
Para cada prospect, aplicar as 4 sub-pontuações (0-25 cada):

| Sub-score | Pergunta | Sobe quando |
|-----------|----------|-------------|
| `score_need` | Quão urgente é a necessidade? | site fraco/ausente, GMB parado, sem automação |
| `score_authority` | Porte e poder de decisão? | estabelecido, premium, multi-unidade, decisor identificado |
| `score_remote` | Dá para entregar 100% remoto? | carro-chefe remoto; sem dependência de deslocamento |
| `score_contactability` | Fácil de falar com o decisor? | WhatsApp direto, e-mail válido, decisor acessível |

**Total = soma dos 4 (0-100)**

### 3. Atualizar prioridade na fila
```sql
UPDATE campaign_prospects SET
  opportunity_score = <total>,
  score_need = <v>,
  score_authority = <v>,
  score_remote = <v>,
  score_contactability = <v>,
  priority = CASE
    WHEN <total> >= 80 THEN 'alta'
    WHEN <total> >= 60 THEN 'media'
    WHEN <total> >= 40 THEN 'baixa'
    ELSE 'arquivar'
  END,
  score_updated_at = NOW(),
  score_reasons = '<json com razões por lente>'
WHERE prospect_id = '<id>' AND campaign_id = '<campaign_id>';
```

### 4. Identificar follow-ups vencendo
Query: `next_followup_date <= fim_da_semana AND current_status IN ('abordado', 'sem_resposta') AND do_not_contact = false`

Para cada: gerar rascunho de follow-up (template `rv-prospeccao` Etapa 7) → salvar como evento `follow_up_rascunho`

### 5. Identificar leads prontos para handover
Status `interessado` OU `reuniao_marcada` OU `proposta_enviada` **SEM** `visionflow_client_id` preenchido

Para cada: montar pacote de handover (Seção 9) → recomendar ao Felipe

### 6. Calcular métricas da semana (Seção 10)
| Métrica | Como calcular |
|---------|---------------|
| **Reach** | `COUNT(DISTINCT prospect_id) WHERE evento = 'abordado_wa' OR 'abordado_email' AND created_at >= inicio_semana` |
| **Response rate** | `respostas / abordados` |
| **Hot rate** | `(interessado + reuniao_marcada + proposta_enviada) / abordados` |
| **Handover rate** | `handovers / abordados` |
| **Tempo médio** | `AVG(created_at_handover - created_at_abordagem)` dos handovers da semana |

### 7. Gerar relatório textual (formato M1 - 7 partes)
1. **Leads novos + score** — quantos, distribuição de score
2. **Abordados/rascunhos prontos** — lista com prioridade
3. **Respostas + próximo passo** — cada resposta processada
4. **Prontos para VisionFlow** — pacotes de handover montados
5. **Follow-ups vencendo** — lista com rascunhos
6. **Números** — reach, response rate, hot rate, handover rate, tempo médio
7. **1–3 recomendações** — do learning loop (Seção 15)

### 8. Salvar snapshot
```sql
INSERT INTO report_snapshots (campaign_id, week_start, report_json, metrics_json)
VALUES ('<campaign_id>', '<monday_date>', '<relatorio_completo>', '<metricas>');
```

## Tools necessárias
- `supabase_mcp` (VisionFlow project: `ghwjetvazmdlaqidgxqi`)
- `read_file` para `operacao/prospeccao/ACQUISITION-OPERATING-SYSTEM.md` (Seções 2, 3, 4, 7, 9, 10, 15)
- `read_file` para `skills/rv-prospeccao/SKILL.md` (templates follow-up)

## Safety boundaries
- **Só lê/escreve no banco interno VisionFlow** (tabelas: `prospects`, `campaign_prospects`, `prospect_events`, `campaigns`, `report_snapshots`)
- **NÃO envia mensagem externa** (WhatsApp, email, etc.)
- **NÃO cria card no VisionFlow** (handover é portão humano)
- **NÃO cota preço** (portão humano)

## Verificação antes de entregar
- [ ] Todos os prospects da campanha têm `opportunity_score` atualizado?
- [ ] `priority` reflete as faixas (80-100 alta, 60-79 media, 40-59 baixa, <40 arquivar)?
- [ ] Follow-ups vencendo listados com rascunho?
- [ ] Leads quentes sem handover identificados?
- [ ] Métricas batem com eventos da semana?
- [ ] `score_reasons` preenchido para cada prospect pontuado?
- [ ] Snapshot salvo em `report_snapshots`?

## Erros comuns a evitar
- Não re-pontuar quando chega info nova (sempre registrar evento `score_atualizado` com before/after)
- Tratar `pesquisa_pendente` como score 0 (são coisas diferentes — `pesquisa_pendente` = completar pesquisa ANTES de pontuar)
- Esquecer de resetar `followup_count` no cenário "talvez depois" (+30 dias)
- Inflar score sem evidência nas `score_reasons`
- Pontuar sem ter feito as 10 lentes (Seção 2)

## Formato de saída
**Relatório textual** (entregue no Telegram/Chat) + **Lista priorizada** (pronta para rascunho de abordagem) + **Métricas JSON** (salvas no banco)

---

## Como ativar
```
/pipeline-weekly-update
```
ou mencionar "atualiza pipeline", "pipeline semanal", "segunda feira pipeline".

Sempre carregar `realvision` primeiro.