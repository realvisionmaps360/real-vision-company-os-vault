# Acquisition Contract — Regras de Acesso ao Banco

> **Versão:** 1.0 · **Data:** 25/06/2026
> **Banco:** `rv-acquisition` · Project ID: `gexacmtkjqectfqwhunv`
> **Relacionado:** [ACQUISITION-DATA-MODEL.md](ACQUISITION-DATA-MODEL.md) · [ACQUISITION-CLAUDE.md](ACQUISITION-CLAUDE.md)

Este é o contrato único que todos os agentes seguem ao operar o Acquisition DB. Qualquer agente novo — clarisso, rv-prospeccao, acquisition-claude, e futuros — segue estas regras sem exceção.

---

## Regra 1 — Dedup obrigatório antes de criar prospect

**Antes de qualquer INSERT em `prospects`, fazer a checagem em 3 camadas:**

```sql
-- Camada 1: dedup primário (nome + cidade)
SELECT id FROM prospects
WHERE name_normalized = '[nome_normalizado]'
  AND city_normalized = '[cidade_normalizada]';

-- Camada 2: dedup por telefone (se disponível)
SELECT id FROM prospects WHERE phone_e164 = '[telefone_e164]';

-- Camada 3: dedup por email (se disponível)
SELECT id FROM prospects WHERE email = '[email]';
```

- **Se encontrou:** NÃO criar nova linha. Registrar evento no prospect existente (ver Regra 2).
- **Se não encontrou:** criar nova linha + registrar evento `encontrado`.

**Normalização:**
- `name_normalized` = minúsculo + remover acentos + trim (ex: "Pousada do Forte" → `pousada do forte`)
- `city_normalized` = mesma lógica (ex: "Paraty" → `paraty`, "São Paulo" → `sao paulo`)

**Dedup fuzzy (nomes similares):**
```sql
-- Checar nomes com similaridade > 80%
SELECT id, business_name, similarity(name_normalized, '[nome_normalizado]') AS sim
FROM prospects
WHERE city_normalized = '[cidade_normalizada]'
  AND similarity(name_normalized, '[nome_normalizado]') > 0.8
ORDER BY sim DESC LIMIT 5;
```
Se retornar resultado, apresentar ao Felipe antes de criar nova linha.

---

## Regra 2 — Toda ação gera evento

**Toda ação no funil vira uma linha em `prospect_events`. Nunca UPDATE/DELETE nessa tabela.**

Campos obrigatórios em todo evento:
- `prospect_id` — UUID do prospect
- `event_type` — tipo da ação (lista abaixo)
- `actor` — nome do agente ou humano (`clarisso`, `rv-prospeccao`, `acquisition-claude`, `felipe`, `romana`)
- `actor_type` — `ai_agent` ou `human`
- `occurred_at` — quando o fato aconteceu (pode ser retroativo)
- `summary` — texto curto legível (ex: "WA enviado para Pousada do Forte")

Campo opcional mas recomendado:
- `detail` (jsonb) — payload estruturado; estender sem migração; ex: `{"draft_id": "...", "channel": "wa"}`

**Tipos de evento disponíveis:**

| event_type | Quando usar |
|---|---|
| `encontrado` | Prospect criado pela primeira vez |
| `qualificado` | Score calculado e registrado |
| `score_atualizado` | Score mudou (`detail: {score_before, score_after}`) |
| `rascunho_criado` | Rascunho de mensagem gerado (WA ou email) |
| `abordado_wa` | WA enviado (confirmado por Felipe/Romana) |
| `abordado_email` | Email enviado (confirmado) |
| `follow_up` | Follow-up enviado |
| `resposta_recebida` | Prospect respondeu (`detail: {response_text}`) |
| `status_mudou` | Status do funil mudou (`detail: {old_status, new_status}`) |
| `handover_recomendado` | Acquisition Claude gerou pacote de handover |
| `handover_feito` | Felipe/Romana criaram card no VisionFlow |
| `nota` | Observação livre |

---

## Regra 3 — Nunca escrever no VisionFlow

O Acquisition DB **nunca escreve** no banco do VisionFlow (`ghwjetvazmdlaqidgxqi`). 

O handover é sempre manual:
1. Acquisition Claude gera o pacote (texto pronto para colar no card)
2. Felipe ou Romana criam o card no VisionFlow
3. O agente então atualiza `prospects.visionflow_client_id` e registra evento `handover_feito`

---

## Regra 4 — Registrar todas as oportunidades identificadas

Ao qualificar um prospect, identificar **todas** as oportunidades — não só a da campanha atual.

Para cada oportunidade identificada, inserir em `prospect_services`:

```sql
INSERT INTO prospect_services (prospect_id, service_code, opportunity_status, identified_by_agent)
VALUES ('[id]', '[code]', 'identificada', '[agente]')
ON CONFLICT (prospect_id, service_code) DO NOTHING;
```

Códigos disponíveis: `website` · `landing_page` · `google_business` · `google_management` · `ai_chatbot` · `whatsapp_automation` · `crm` · `360_tour` · `photography` · `videography` · `hosting` · `digital_partner`

A oportunidade **conduzida agora** fica em `prospects.lead_offer` (FK para `services.code`).

---

## Regra 5 — Status do funil (transições válidas)

```
novo → pesquisa_pendente → (qualificado) → abordado → sem_resposta
                                             │
                               ┌─────────────┼─────────────────┐
                               ▼             ▼                 ▼
                         sem_interesse  interessado    reuniao_marcada
                                             │                 │
                                             └────────┬────────┘
                                                      ▼
                                           proposta_enviada
                                                      ▼
                                           handover_visionflow → ganho / perdido
```

Toda mudança de status → evento `status_mudou` com `detail: {old_status, new_status}`.

---

## Regra 6 — Respeitar `do_not_contact`

Antes de qualquer ação de follow-up automático, checar:

```sql
SELECT do_not_contact FROM prospects WHERE id = '[id]';
```

Se `do_not_contact = true`, **não gerar rascunho nem follow-up**. Só Felipe ou Romana podem reativar.

---

## Query do relatório semanal (7 partes)

```sql
-- 1. Leads novos na semana
SELECT COUNT(*) FROM prospect_events
WHERE event_type = 'encontrado' AND occurred_at >= '[inicio_semana]';

-- 2. Abordados na semana
SELECT COUNT(DISTINCT prospect_id) FROM prospect_events
WHERE event_type IN ('abordado_wa', 'abordado_email') AND occurred_at >= '[inicio_semana]';

-- 3. Respostas recebidas
SELECT COUNT(DISTINCT prospect_id) FROM prospect_events
WHERE event_type = 'resposta_recebida' AND occurred_at >= '[inicio_semana]';

-- 4. Prontos para handover (status quente)
SELECT COUNT(*) FROM prospects
WHERE current_status IN ('interessado', 'reuniao_marcada', 'proposta_enviada')
  AND handover_at IS NULL;

-- 5. Follow-ups vencendo esta semana
SELECT COUNT(*) FROM prospects
WHERE next_followup_date <= CURRENT_DATE + INTERVAL '7 days'
  AND current_status IN ('abordado', 'sem_resposta')
  AND do_not_contact = false;

-- 6. Números gerais por status
SELECT current_status, COUNT(*) FROM prospects GROUP BY current_status ORDER BY COUNT(*) DESC;

-- 7. Por dono
SELECT owner, COUNT(*) FROM prospects WHERE current_status NOT IN ('ganho','perdido','handover_visionflow')
GROUP BY owner;
```

---

## Referência rápida de IDs

| Sistema | Project ID | Uso |
|---|---|---|
| `rv-acquisition` | `gexacmtkjqectfqwhunv` | Acquisition DB — este contrato |
| `visionflow` | `ghwjetvazmdlaqidgxqi` | CRM — só leitura de `visionflow_client_id` |
