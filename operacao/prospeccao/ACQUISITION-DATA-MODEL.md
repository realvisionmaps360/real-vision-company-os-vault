# Sistema de Aquisição — Modelo de Dados Completo

> **Status:** ✅ Congelado · **Data:** 24/06/2026 · **Missão:** Mission 3
> **Aprovado por:** Felipe Garcia
> **Relacionado:** [[ACQUISITION-CLAUDE]] (Mission 1) · [[ACQUISITION-SYSTEM-ARCHITECTURE]] (Mission 2) · [[ACQUISITION-MISSION3-KICKSTART]] (construção)
> **Próxima etapa:** construção do banco (Supabase, SQL, RLS) conforme checklist do Kickstart

---

## Por que este documento existe

A Mission 2 desenhou a arquitetura — onde os dados vivem e quais os princípios. Este documento detalha **exatamente** o que vai dentro: cada tabela, cada campo, cada índice, cada regra. É a fonte da verdade para construir o banco e para qualquer agente que precise entender o contrato de acesso.

---

# PARTE A — Operação de negócio

## A.1 — A vida de um lead (7 estágios)

Todo negócio que entra no funil percorre os mesmos estágios. O banco existe para registrar e dar ritmo a isto:

1. **Descoberta** — abre-se uma campanha (cidade + segmento + oferta). O agente busca negócios em fontes públicas. Cada negócio encontrado vira um **prospect** (após checar duplicata). Sabemos: nome, cidade, segmento, contato, prioridade grosseira.
2. **Qualificação** — sinais de necessidade (site fraco/ausente, Google parado, sem automação) cruzados com sinais de capacidade (estabelecido, premium). Se faltar info → `pesquisa_pendente` + nota do que falta. Identificar **todas** as oportunidades do negócio, não só a da campanha.
3. **Pontuação** — Opportunity Score 0-100 (Need + Authority/Size + Remote Fit + Contactability, 0-25 cada). Define ordem de abordagem. Cada mudança de score fica no histórico de eventos.
4. **Abordagem** — agente escreve rascunhos; Felipe/Romana enviam. Cada envio → evento `abordado_wa` / `abordado_email`. Status → `abordado`. Define próxima data de follow-up.
5. **Follow-up** — se não respondeu até a data, novo rascunho. Depois de N toques → `sem_resposta`.
6. **Resposta** — agente resume + recomenda próximo passo. Status → `interessado` / `sem_interesse` / `reuniao_marcada` / `proposta_enviada`.
7. **Handover / Terminal** — agente monta pacote; Felipe/Romana criam card no VisionFlow; agente grava `visionflow_client_id` + evento `handover_feito`. Estados terminais: `ganho` / `perdido`. **Nada é apagado.**

## A.2 — Os atores e regras de acesso

**Agentes — operadores primários** (via Supabase MCP): `clarisso` (achar+qualificar), `rv-prospeccao` (abordar), `acquisition-claude` (maestro/score/relatório), e futuros agentes. O fluxo normal é inteiramente operado por agentes.

**Humanos — ownership de emergência** (Felipe e Romana): no fluxo normal, não operam o banco diretamente — toda ação humana no funil é informada ao agente, que registra o evento. **Felipe e Romana sempre retêm acesso direto ao banco.** Em emergência, erro de agente, decisão estratégica ou intervenção pontual, podem agir diretamente no Supabase sem passar pelo agente. Toda ação humana direta também vira evento (`actor_type = human`), garantindo rastreabilidade total.

## A.3 — Os princípios que nunca mudam (travados na Mission 2)

- **Uma ficha por negócio.** Dedup obrigatório antes de criar qualquer linha.
- **Histórico append-only.** Toda ação vira evento; nada é sobrescrito.
- **Separação dura do VisionFlow.** O Acquisition DB **nunca escreve** no VisionFlow. A passagem é sempre manual.
- **Desacoplado das ofertas.** O lead carrega catálogo de oportunidades, não oferta fixa.

## A.4 — Diagrama de status

```
novo → pesquisa_pendente → (qualificado) → abordado → sem_resposta
                                              │            │
                                              ▼            ▼
                                        sem_interesse   follow_up (volta a abordado)
                                              │
                              ┌───────────────┼─────────────────┐
                              ▼               ▼                 ▼
                        interessado   reuniao_marcada    proposta_enviada
                              └───────────────┴─────────────────┘
                                              ▼
                                    handover_visionflow → ganho / perdido
```

`pesquisa_pendente` = sem info suficiente para qualificar; o agente anota o que falta.
`ganho`/`perdido` = estados terminais; o lead permanece como histórico imutável.

---

# PARTE B — As 8 tabelas

**Convenção:** nomes de tabela/coluna em inglês, valores de enum em português. PKs `uuid` (`gen_random_uuid()`). Timestamps em `timestamptz`.

---

## Tabela 1 — `prospects`

Ficha canônica. **Uma linha por negócio, para sempre.** Coração do dedup e do funil.

| Grupo | Campo | Tipo | Notas |
|---|---|---|---|
| **Identidade** | `id` | uuid PK | |
| | `business_name` | text NOT NULL | Nome oficial do negócio |
| | `name_normalized` | text NOT NULL | Minúsculo, sem acento — **chave de dedup primária** |
| | `city` | text NOT NULL | |
| | `city_normalized` | text NOT NULL | Minúsculo, sem acento |
| | `region` | text | Estado/província |
| | `country` | text DEFAULT 'BR' | |
| | `segment` | text | pousada · restaurante · food_truck · evento · condominío… |
| **Contato** | `phone_e164` | text | Telefone principal (formato E.164) |
| | `whatsapp_e164` | text | WhatsApp (pode diferir do telefone) |
| | `email` | text | |
| | `website_domain` | text | Sem http:// nem www |
| | `instagram` | text | Handle sem @ |
| | `contact_name` | text | Nome do decisor/responsável |
| | `contact_role` | text | dono · gerente · reservas… |
| | `preferred_contact_channel` | text | `wa` / `email` / `call` / `instagram` — canal preferido; setado quando o prospect indica ou o agente aprende na prática |
| **Score** | `opportunity_score` | int CHECK 0-100 | Score total (último estado) |
| | `score_need` | int CHECK 0-25 | Necessidade |
| | `score_authority` | int CHECK 0-25 | Porte / capacidade de decisão |
| | `score_remote` | int CHECK 0-25 | Fit para entrega remota |
| | `score_contactability` | int CHECK 0-25 | Facilidade de contato |
| | `score_reasons` | text | Motivos em texto livre (ex: "site desatualizado · contato direto disponível") |
| | `score_updated_at` | timestamptz | |
| **Oportunidades** | `lead_offer` | text FK→`services.code` | Serviço conduzido **agora** nesta abordagem |
| **Funil** | `current_status` | text NOT NULL | Enum: ver A.4 |
| | `owner` | text | `felipe` / `romana` |
| | `next_followup_date` | date | Data do próximo follow-up |
| | `followup_count` | int DEFAULT 0 | Quantos follow-ups já aconteceram |
| | `last_contacted_at` | timestamptz | Último toque enviado |
| | `last_event_at` | timestamptz | Último evento registrado (qualquer) |
| | `last_response_summary` | text | Texto curto da última resposta recebida; atualizado a cada evento `resposta_recebida` |
| | `do_not_contact` | bool DEFAULT false | Quando `true`, agentes ignoram este lead em follow-ups automáticos; só humanos podem reativar |
| **Ligação** | `source` | text | `websearch` · `google_places` · `apollo` · `indicacao` · `instagram`… |
| | `discovery_notes` | text | O que falta para qualificar (`pesquisa_pendente`) |
| | `visionflow_client_id` | uuid | Null até o handover; liga os dois sistemas sem fundir |
| | `handover_at` | timestamptz | |
| | `created_by_agent` | text | Agente que criou o registro |
| | `created_at` | timestamptz DEFAULT now() | |
| | `updated_at` | timestamptz DEFAULT now() | |

**Índices e constraints:**
```sql
UNIQUE (name_normalized, city_normalized)           -- dedup primário
INDEX ON phone_e164                                 -- dedup secundário
INDEX ON email                                      -- dedup secundário
INDEX ON website_domain                             -- dedup secundário
INDEX ON current_status
INDEX ON owner
INDEX ON next_followup_date
INDEX ON opportunity_score DESC
CREATE EXTENSION IF NOT EXISTS pg_trgm;
INDEX GIN (name_normalized gin_trgm_ops)            -- dedup fuzzy de nomes
```

---

## Tabela 2 — `prospect_events`

Linha do tempo append-only. **Nunca UPDATE/DELETE.** Reconstrói a vida inteira de qualquer lead.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `prospect_id` | uuid FK→`prospects` NOT NULL | |
| `campaign_id` | uuid FK→`campaigns` | Null se ação fora de campanha |
| `event_type` | text NOT NULL | `encontrado` · `qualificado` · `score_atualizado` · `rascunho_criado` · `abordado_wa` · `abordado_email` · `follow_up` · `resposta_recebida` · `status_mudou` · `handover_recomendado` · `handover_feito` · `nota` |
| `channel` | text | `wa` · `email` · `call` · `instagram` · null |
| `summary` | text | Texto curto legível por humanos |
| `detail` | jsonb | Payload estruturado: `{old_status, new_status, draft_ref, score_before, score_after, response_text, …}` — mecanismo de extensão sem migração |
| `actor` | text NOT NULL | Nome do agente (`clarisso`, `rv-prospeccao`, `acquisition-claude`, …) ou do humano (`felipe`, `romana`) |
| `actor_type` | text NOT NULL | `ai_agent` / `human` — distingue ação normal de intervenção humana direta |
| `occurred_at` | timestamptz NOT NULL | Quando o fato aconteceu (pode ser retroativo) |
| `created_at` | timestamptz DEFAULT now() | Quando o registro foi inserido |

**Índices:**
```sql
INDEX ON (prospect_id, occurred_at DESC)   -- linha do tempo de um lead
INDEX ON event_type                         -- filtrar por tipo
INDEX ON occurred_at                        -- relatório semanal (WHERE occurred_at >= semana)
INDEX ON campaign_id                        -- todos os eventos de uma campanha
INDEX ON actor_type                         -- "tudo que o Felipe fez manualmente"
```

**Nota:** o histórico de score mora aqui (`event_type = score_atualizado`, `detail = {score_before, score_after, sub_scores_before, sub_scores_after}`). Não precisa de tabela separada.

---

## Tabela 3 — `campaigns`

Uma rodada de prospecção = cidade + segmento + oferta + período.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `code` | text UNIQUE NOT NULL | Slug humano: `paraty-pousadas-2026-06` |
| `name` | text NOT NULL | Nome legível |
| `city` | text NOT NULL | |
| `region` | text | |
| `country` | text DEFAULT 'BR' | |
| `segment` | text | Segmento alvo |
| `offer` | text | Oferta conduzida: `360 Tour R$25` · `Digital Partner`… |
| `channel_plan` | text[] | Canais planejados: `['wa', 'email']` |
| `status` | text DEFAULT 'planejada' | `planejada` · `ativa` · `encerrada` |
| `goal_count` | int | Quantos prospects abordar nesta rodada |
| `notes` | text | Observações da rodada |
| `started_at` | timestamptz | |
| `ended_at` | timestamptz | |
| `created_by_agent` | text | |
| `created_at` | timestamptz DEFAULT now() | |
| `updated_at` | timestamptz DEFAULT now() | |

---

## Tabela 4 — `campaign_prospects`

Join muitos-para-muitos: liga negócio↔campanha e guarda o estado daquela rodada. Aqui ficam as caixinhas ☐ WA ☐ Email e a prioridade por campanha.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `campaign_id` | uuid FK→`campaigns` NOT NULL | |
| `prospect_id` | uuid FK→`prospects` NOT NULL | |
| `offer` | text | Oferta específica para este negócio nesta rodada (herda de `campaigns.offer`) |
| `priority` | text | `alta` · `media` · `baixa` |
| `status_in_campaign` | text DEFAULT 'incluido' | `incluido` · `abordado` · `respondeu` · `descartado` |
| `wa_sent_at` | timestamptz | Quando o WA foi enviado nesta campanha |
| `email_sent_at` | timestamptz | Quando o email foi enviado nesta campanha |
| `added_at` | timestamptz DEFAULT now() | |
| `added_by_agent` | text | |

```sql
UNIQUE (campaign_id, prospect_id)   -- mesmo negócio entra uma vez por campanha
INDEX ON campaign_id
INDEX ON prospect_id
```

---

## Tabela 5 — `services`

Catálogo governado dos 12 serviços da Real Vision. Vocabulário fixo: evita drift ("Site" vs "Website"). Adicionar serviço novo = nova linha, sem alterar estrutura.

| Campo | Tipo | Notas |
|---|---|---|
| `code` | text PK | Chave de negócio: `website` · `landing_page` · `google_business` · `google_management` · `ai_chatbot` · `whatsapp_automation` · `crm` · `360_tour` · `photography` · `videography` · `hosting` · `digital_partner` |
| `label` | text NOT NULL | Nome legível: "Website", "Tour 360°"… |
| `category` | text | `presenca_digital` · `automacao` · `midia` · `infraestrutura` |
| `active` | bool DEFAULT true | `false` = serviço depreciado (não some do histórico) |
| `notes` | text | |
| `created_at` | timestamptz DEFAULT now() | |

---

## Tabela 6 — `prospect_services`

Status por oportunidade. **Fonte única** das oportunidades de cada negócio — substitui o array `potential_services` da Mission 2. Cada serviço tem seu próprio ciclo de vida no lead.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `prospect_id` | uuid FK→`prospects` NOT NULL | |
| `service_code` | text FK→`services.code` NOT NULL | |
| `opportunity_status` | text NOT NULL | `identificada` · `oferecida` · `em_negociacao` · `vendida` · `descartada` |
| `est_value` | numeric(10,2) | Valor estimado do serviço para este negócio (opcional) |
| `notes` | text | |
| `identified_by_agent` | text | Agente que identificou a oportunidade |
| `created_at` | timestamptz DEFAULT now() | |
| `updated_at` | timestamptz DEFAULT now() | |

```sql
UNIQUE (prospect_id, service_code)   -- um registro por serviço por negócio
INDEX ON prospect_id
INDEX ON service_code
INDEX ON opportunity_status
```

---

## Tabela 7 — `report_snapshots`

Memória do relatório semanal. Guarda cada relatório gerado para rastrear tendência ao longo dos 3 anos. O formato de saída (texto de 7 partes da Mission 1) não muda; esta tabela só persiste o resultado.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `period_start` | date NOT NULL | |
| `period_end` | date NOT NULL | |
| `metrics` | jsonb NOT NULL | `{found, approached, replied, handed_over, followups_due, by_status: {…}, by_owner: {…}, by_service: {…}}` |
| `narrative` | text NOT NULL | O texto de 7 partes (pronto para copiar/enviar) |
| `recommendations` | text | As 1-3 recomendações da semana |
| `generated_by_agent` | text | |
| `created_at` | timestamptz DEFAULT now() | |

```sql
UNIQUE (period_start, period_end)
INDEX ON period_start DESC
```

---

## Tabela 8 — `prospect_contacts`

Decisores e canais adicionais por negócio. O contato **principal** fica na `prospects`; os demais (gerente, reservas, sócio) ficam aqui.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | |
| `prospect_id` | uuid FK→`prospects` NOT NULL | |
| `name` | text | |
| `role` | text | `dono` · `gerente` · `reservas` · `socio`… |
| `phone_e164` | text | |
| `whatsapp_e164` | text | |
| `email` | text | |
| `is_primary` | bool DEFAULT false | True = contato que o agente deve usar por padrão |
| `notes` | text | Ex: "ligar primeiro para pegar WhatsApp" |
| `created_at` | timestamptz DEFAULT now() | |

```sql
INDEX ON prospect_id
```

---

# PARTE C — Como cada requisito é atendido

| Requisito | Onde é resolvido |
|---|---|
| Prospect discovery | `campaigns` abre a rodada; `clarisso` cria `prospects` (após dedup) + evento `encontrado`; `campaign_prospects` registra prioridade e inclusão |
| Qualification | `score_*` + `score_reasons`; status `pesquisa_pendente` + `discovery_notes` quando falta info; evento `qualificado` |
| Scoring | `opportunity_score` + 4 sub-scores na ficha (último estado); histórico de mudanças em `prospect_events` (`score_atualizado`) |
| Follow-ups | `next_followup_date` + `followup_count` + `do_not_contact`; evento `follow_up`; query: `next_followup_date <= fim_semana AND status IN (abordado, sem_resposta) AND do_not_contact = false` |
| Lead history | `prospect_events` append-only + `last_response_summary` na ficha |
| Campaign tracking | `campaigns` + `campaign_prospects` (prioridade + WA/email sent + status por rodada) |
| Handover to VisionFlow | pacote gerado → card manual no VisionFlow; `visionflow_client_id` + `handover_at` + evento `handover_feito`; ficha permanece como histórico |
| Weekly reporting | consulta ao banco gera texto de 7 partes; persistido em `report_snapshots` |
| Future AI agents | `actor` + `actor_type` em todo evento; `detail` jsonb (extensão sem migração); `services` como catálogo de linhas; contrato de acesso único (Mission 2) |
| 1.000+ prospects | banco relacional + índices; `prospect_events` chega a ~30k linhas em 3 anos — trivial para Postgres |

---

# PARTE D — O que muda vs. Mission 2

- **Mantido igual:** as 4 tabelas do núcleo, os nomes, os status, o Opportunity Score, dedup, append-only, handover manual, separação do VisionFlow.
- **Detalhado:** todos os campos, tipos e índices; estado por campanha em `campaign_prospects`; histórico de score em eventos.
- **Adicionado (aprovado 20/06/2026):** tabelas `services`, `prospect_services`, `report_snapshots`, `prospect_contacts`; índice `pg_trgm`.
- **Adições finais (aprovado 24/06/2026):** 3 campos em `prospects` (`preferred_contact_channel`, `last_response_summary`, `do_not_contact`); campo `actor_type` em `prospect_events`; regras de acesso: agentes = operadores primários, humanos = ownership de emergência com acesso direto garantido.

---

# PARTE E — Próxima etapa (construção)

Este documento é o projeto. A construção segue o checklist em [[ACQUISITION-MISSION3-KICKSTART]]:

1. Criar projeto Supabase `rv-acquisition` (separado do VisionFlow `ghwjetvazmdlaqidgxqi`).
2. Rodar o SQL das 8 tabelas com índices e RLS.
3. Escrever [[ACQUISITION-CONTRACT]] com as regras de acesso para todos os agentes.
4. Atualizar `clarisso`, `rv-prospeccao` e [[ACQUISITION-CLAUDE]] com o contrato.
5. Migrar os dados de Paraty como primeira campanha.
6. Documentar a query do relatório semanal em [[ACQUISITION-CONTRACT]].
