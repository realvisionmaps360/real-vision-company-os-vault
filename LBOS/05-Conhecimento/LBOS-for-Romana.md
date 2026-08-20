---
id: CON-2026-001
tipo: conhecimento
nome: LBOS for Romana — project overview and required data
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-09-06
confiabilidade: alta
fonte: sessão de construção do LBOS, 06/08/2026
idioma: EN
pertence_a: ["[[LBOS]]"]
referencia: ["[[02-Projetos/sunbite/PROJETO]]", "[[OBJ-casamento-suica]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# LBOS — Life & Business Operating System

Project overview and required data · Version 1.0 · 6 August 2026

---

# Part 1 — The project

## Purpose

LBOS is a single system that holds all information about our personal life, finances, documents and businesses, and keeps track of how those areas affect each other.

It replaces the current situation, where information is spread across chats, files and memory, and decisions are made without full context.

## How it works

Every piece of information is stored once, in one place, as a connected record. Records are linked to each other by defined relationships.

```
Sunbite  →  revenue  →  cash flow  →  consulate fee  →  wedding
```

When one record changes, the system identifies every other record affected by it and reports the impact before anything is updated.

## Operating rules

| Rule | Meaning |
|---|---|
| Single source of truth | Each number exists in one file only. All other documents reference it |
| Nothing is deleted | Records are archived, never erased. Past decisions are kept with their reasoning |
| The system recommends | It reports impact and waits. It never changes anything on its own |
| Everything is traceable | Every change records date, reason and impact |

## Current scope

**Primary objective:** formalise the marriage in Switzerland.

**In scope now:** wedding process, Sunbite revenue planning, Real Vision revenue, documents, decisions.

**Out of scope for now:** household and living costs. These will be added in a later version, once the current scope is working.

## Status

The wedding process is **paused** since 31 July 2026, due to insufficient funds. The constraint is no longer paperwork — it is revenue.

Two revenue sources are registered:

| Source | Value | Reliability |
|---|---|---|
| Solarium Aarau — landing page (Gabriel) | CHF 600 | **Medium** — proposal not yet sent, client has not confirmed |
| **Sunbite** | to be defined | **Primary source** |

Sunbite is classified as the primary source because it operates in Swiss francs, in the city where we both are, and does not depend on a third party's decision.

## Open items

- **Consulate cost is not final.** The July documentation records BRL 1.984 + 533 = 2.517. This excludes apostille and sworn translation, so the actual figure is higher and needs to be confirmed
- **Birth certificate validity expired on 11 August 2026** and the consulate appointment was never made. If expired, the document chain restarts, which adds cost and time. Requires confirmation in Brazil

---

# Part 2 — Information required from Romana

Felipe operates the system and enters all data. No action is required from Romana beyond providing and confirming the information below.

The system currently holds one Sunbite figure: **CHF 5.00 per cup** (selling price). Everything else is missing, which prevents any revenue forecast.

## 1. Cost per unit

What we pay to produce one serving.

| Item | Needed |
|---|---|
| Strawberries | cost and supplier |
| Premium Swiss chocolate | cost per unit |
| Cups, sticks, napkins, packaging | cost per unit |
| Lemonade | cost per serving |
| Ice and cooling | cost per selling day |

**Purpose:** selling price minus unit cost gives the actual margin. Revenue alone does not fund the wedding — margin does.

## 2. Sales volume

- Units sold on a good day (sunny, high-traffic location)
- Units sold on a slow day
- Actual figures from the Grand Opening, 18 July 2026, if recorded

**Purpose:** converts margin into a number of selling days required to reach the target.

## 3. Operating frequency

- Realistic number of selling days per month
- Constraints: weather, permits, availability
- **Winter:** the brand is positioned as "Made for Sunny Days". Whether operations stop in winter, or a different format applies, changes the annual forecast significantly

**Purpose:** converts per-day figures into monthly income.

## 4. Locations

- Locations used so far, and results at each
- Target locations not yet secured
- Permit requirements and cost per location
- Contacts already established

**Purpose:** locations are the variable most under our control. Additional locations increase selling days directly.

## 5. Fixed costs

Costs incurred regardless of sales.

- Bike — purchased outright, or outstanding balance
- Insurance, licences, permits
- Storage, transport, fuel
- Website, domain, recurring subscriptions

**Purpose:** fixed costs raise the minimum number of selling days needed to break even.

---

# Part 3 — Output

Once the data above is entered, the system produces three figures, updated automatically as reality changes:

| Output | Definition |
|---|---|
| **Earn** | Realistic monthly Sunbite income |
| **Spend** | Amount available for discretionary spending in Switzerland |
| **Save** | Amount reserved for São Paulo and the consulate |

And an **estimated date** for when the reserve is complete — recalculated whenever revenue or costs change.

## Next step

Provide the available data from existing records, including approximate figures. Estimates are accepted and marked as such, then refined as actual results come in.

---

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[02-Projetos/sunbite/PROJETO]], [[OBJ-casamento-suica]], [[DEC-2026-001]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Felipe precisa apresentar o LBOS à Romana e levantar os dados da Sunbite | Destrava a previsão de caixa do objetivo principal | Escrito em inglês, para ela acompanhar a leitura |
| 2026-08-06 | Reescrito em tom profissional | Primeira versão ficou narrativa demais | Documento passa a ser descrição objetiva do projeto e dos dados necessários | Sem narrativa pessoal; estrutura de documento técnico |
