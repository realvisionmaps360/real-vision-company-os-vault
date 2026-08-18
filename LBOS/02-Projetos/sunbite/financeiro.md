---
tipo: apoio
nome: Financeiro
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-17
pertence_a: ["[[02-Projetos/sunbite/PROJETO]]"]
tags: [lbos/apoio]
---

# Financeiro

Só referências para `03-Financeiro/`. Nenhum valor é repetido aqui (Fonte Única).

## Fontes únicas da Sunbite

| Nó | O que é dono |
|---|---|
| [[sunbite-unit-economics]] | Preço de venda vigente e custo por porção |
| [[sunbite-caixa]] | Fundo de troco e saldo da caixa |
| [[REC-2026-004]] | Receita da operação de 18/07/2026 |
| [[REC-2026-003]] | Receita da operação de 15/08/2026 |
| [[DES-2026-002]] | Morango — compra de 6 kg |
| [[DES-2026-003]] | Copos rPET 300 ml |
| [[DES-2026-004]] | Morango — 8 kg do fazendeiro, operação de 15/08 |

## Padrão por operação

Cada operação futura gera:

- **um nó `REC-`** com a receita do dia, separada por dinheiro e TWINT, mais data, local, horário e estoque
- **um nó `DES-`** por compra relevante daquele dia

O checklist de fechamento que alimenta esses nós está em [[02-Projetos/sunbite/checklist]].

## Onde o modelo ainda não fecha

O custo real por Sunbite **não é calculável hoje** — falta chocolate, toppings, chantilly, embalagem complementar, transporte, energia e mão de obra. O que falta e como coletar está em [[02-Projetos/sunbite/dados-pendentes]], e o risco que isso representa em [[RSC-2026-003]].

## Relacionados

- Pertence a: [[02-Projetos/sunbite/PROJETO]]
- Dados pendentes: [[02-Projetos/sunbite/dados-pendentes]]
