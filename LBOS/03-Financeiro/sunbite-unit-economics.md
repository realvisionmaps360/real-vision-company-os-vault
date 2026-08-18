---
tipo: apoio
nome: Sunbite — Unit Economics
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-17
atualizado_em: 2026-08-17
proxima_revisao: 2026-09-17
moeda: CHF
fonte_unica: true
pertence_a: ["[[02-Projetos/sunbite/PROJETO]]"]
tags: [lbos/apoio, lbos/financeiro]
---

# Sunbite — Unit Economics

Fonte única do **preço de venda vigente** e do **custo por porção** da Sunbite.

## A regra dos 4 níveis

Método definido pela Romana em 17/08/2026. Todo número aqui carrega um destes rótulos, sempre:

| Nível | Significa | Pode virar base de decisão? |
|---|---|---|
| **CONFIRMADO** | Nota fiscal, recibo, contagem de caixa ou transação TWINT | Sim |
| **CALCULADO** | Derivado matematicamente de dado confirmado | Sim, com a premissa declarada |
| **ESTIMATIVA** | Suposição antiga de planejamento | **Não.** Nunca usar como custo real |
| **DESCONHECIDO** | Falta o dado | Não. Fica em branco, não se preenche por analogia |

> Um número sem rótulo é um bug. Se aparecer, corrigir antes de usar.

---

## Preços de venda — vigentes

| Item | Preço | Nível |
|---|---|---|
| **Copo Sunbite (padrão)** | **CHF 7,50** | CONFIRMADO — praticado em 15/08/2026, confirmado por Felipe em 17/08 |
| Topping extra (cada) | + CHF 0,50 | CONFIRMADO |
| Chantilly | Opcional / grátis | CONFIRMADO |

**Preços históricos, não vigentes:** CHF 5,00 foi promoção da abertura (18/07/2026). CHF 8,00 / 8,50 / 9,00 foram discutidos ou testados, nunca estabelecidos. Nenhum deles é o preço atual.

> Atenção: o convite digital em `sunbite.ch/invitation` ainda anuncia CHF 5.— no card 3. É produção — corrigir só com OK do Felipe. Ver [[TAR-2026-010]].

---

## Custo por porção — o que já é real

| Componente | Custo/porção | Nível | Origem |
|---|---|---|---|
| Morango (140 g @ CHF 9,38/kg) | CHF 1,31 | CONFIRMADO | [[DES-2026-004]] |
| Copo rPET 300 ml | CHF 0,24 | CONFIRMADO | [[DES-2026-003]] |
| **Subtotal conhecido** | **CHF 1,55** | CALCULADO | soma dos dois acima |
| Chocolate (40-50 g) | — | **DESCONHECIDO** | falta nota |
| Toppings (~5 g) | — | **DESCONHECIDO** | falta nota |
| Chantilly | — | **DESCONHECIDO** | falta nota |
| Tampa / talher / guardanapo | — | **DESCONHECIDO** | falta nota |

Referência alternativa de morango: [[DES-2026-002]] (6 kg @ CHF 9,17/kg → CHF 1,28/porção). Preço de hortifrúti oscila; usar sempre a compra mais recente.

**O custo real por Sunbite não é calculável hoje.** Falta o chocolate, que é provavelmente o segundo maior componente.

---

## Estimativas antigas — SUPERADAS, não usar

Registradas só pra ninguém reaproveitar por engano:

| Item | Estimativa antiga | Realidade medida |
|---|---|---|
| Morango | ~CHF 1,10 | **CHF 1,28-1,31** — subestimava |
| Chocolate | ~CHF 1,24 | desconhecido |
| Toppings | ~CHF 0,40 | desconhecido |
| Chantilly | CHF 0,40-0,60 | desconhecido |
| Copo/embalagem | ~CHF 0,50 | copo sozinho é **CHF 0,24** (o resto da embalagem segue desconhecido) |
| **COGS total** | **~CHF 3,60-3,80** | **não comprovado** |

> Nunca montar modelo financeiro em cima de CHF 3,60-3,80. As duas linhas já verificadas saíram diferentes da estimativa, uma pra mais e outra pra menos.

---

## Margem por operação — só sobre custos conhecidos

### 15/08/2026

| | Valor |
|---|---|
| Receita ([[REC-2026-003]]) | CHF 450,90 |
| Morango ([[DES-2026-004]]) | − CHF 75,00 |
| Copos (~57-58 un) | − ~CHF 13,60 |
| **Sobra sobre custos conhecidos** | **~CHF 362,30 (80,4%)** |

> **Isto não é lucro.** Ainda faltam: chocolate, toppings, chantilly, tampa/talher/guardanapo, transporte, energia, taxa de local e mão de obra. O número só serve como teto — o lucro real é menor, e não se sabe quanto.

### 18/07/2026

Não calculável. A compra completa de morango daquele dia é desconhecida — ver [[REC-2026-004]].

---

## Para fechar o modelo real, falta

Em ordem de impacto no resultado:

1. **Chocolate** — CHF/kg. Para ~57 porções a 40-50 g, o consumo foi de **2,3 a 2,9 kg**. É o buraco maior.
2. **Mão de obra** — nenhuma hora precificada para Felipe e Romana.
3. **Toppings** — CHF/kg de amêndoa, coco e marshmallow, e com que frequência o cliente escolhe.
4. **Chantilly** — custo por porção e por cápsula, se houver.
5. **Tampa, talher, guardanapo** — custo por unidade.
6. **Transporte, energia e taxa de local** — por operação.

Checklist completo de coleta em [[02-Projetos/sunbite/dados-pendentes]]. Tarefa: [[TAR-2026-009]].

## Relacionados

- Pertence a: [[02-Projetos/sunbite/PROJETO]]
- Receitas: [[REC-2026-004]], [[REC-2026-003]]
- Despesas: [[DES-2026-002]], [[DES-2026-003]], [[DES-2026-004]]
- Caixa: [[sunbite-caixa]]
- Ficha do produto: [[sunbite-ficha-tecnica-produto]]
- Risco associado: [[RSC-2026-003]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-17 | Nó criado | Ingestão do dump da Romana + dados novos do Felipe | Vira a fonte única de preço de venda e custo por porção da Sunbite | Preço vigente fixado em CHF 7,50; estimativas antigas gravadas como superadas em vez de apagadas; COGS real declarado não calculável |
