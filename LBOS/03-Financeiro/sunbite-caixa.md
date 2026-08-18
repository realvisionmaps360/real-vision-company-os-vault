---
tipo: apoio
nome: Sunbite — Caixa e fundo de troco
status: ativo
responsavel: "[[Romana Loznjakovic]]"
criado_em: 2026-08-17
atualizado_em: 2026-08-17
proxima_revisao: 2026-09-17
moeda: CHF
fonte_unica: true
pertence_a: ["[[02-Projetos/sunbite/PROJETO]]"]
tags: [lbos/apoio, lbos/financeiro]
---

# Sunbite — Caixa e fundo de troco

## A regra que já causou confusão uma vez

> **Fundo de troco NUNCA é receita.**
>
> O dinheiro dentro da caixa é fundo de troco + venda acumulada. Só a parte que **entrou** naquele dia é receita. Contar o saldo total como faturamento infla o resultado e quebra qualquer cálculo de margem.

Receita de um dia = contagem física no fim − saldo que já estava lá no começo.

## Fundo de troco inicial

| Origem | Valor |
|---|---|
| [[Romana Loznjakovic]] (banco) | CHF 350,00 |
| [[Mama]] | CHF 20,00 |
| **Total do fundo** | **CHF 370,00** |

Esse dinheiro **não pertence ao resultado da Sunbite**. É capital de giro emprestado ao caixa e, em algum momento, precisa ser devolvido ou formalizado como aporte.

## Movimentação

| Data | Evento | Entrada em dinheiro | Saldo da caixa |
|---|---|---|---|
| — | Fundo de troco montado | +370,00 | 370,00 |
| 18/07/2026 | Operação — [[REC-2026-004]] | +246,70 | 616,70 |
| 15/08/2026 | Operação — [[REC-2026-003]] | +172,40 | **789,10** |

**Saldo atual: CHF 789,10**, sendo CHF 370,00 de fundo de troco e **CHF 419,10 de venda acumulada em dinheiro**.

Nada foi retirado da caixa entre 18/07 e 15/08 — o saldo de abertura do segundo dia bateu exatamente com o fechamento do primeiro. Confirmado por Felipe em 17/08/2026.

## TWINT

O TWINT não passa pela caixa física. Total recebido até aqui: CHF 233,00 (18/07) + CHF 278,50 (15/08) = **CHF 511,50**, cada valor sob seu nó de receita.

**Desconhecido:** se o TWINT cobra taxa por transação, e quantas transações houve em cada dia.

## Detalhe que vale acompanhar

Nos dois dias, o total do TWINT caiu exato na grade de preços (múltiplo de CHF 0,50) e o dinheiro não: sobraram CHF 0,20 em 18/07 e CHF 0,40 em 15/08.

Explicação mais provável: gorjeta em moedas. Outras hipóteses: limonada vendida a preço diferente, ou imprecisão no troco. Pequeno em valor, mas é o motivo de **não dar pra contar copos vendidos a partir do dinheiro**.

## Relacionados

- Pertence a: [[02-Projetos/sunbite/PROJETO]]
- Receitas: [[REC-2026-004]], [[REC-2026-003]]
- Fundo aportado por: [[Romana Loznjakovic]], [[Mama]]
- Custos e preços: [[sunbite-unit-economics]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-17 | Nó criado | Ingestão do dump da Romana; a confusão entre saldo e receita foi explicitamente sinalizada por ela | Fixa a separação entre fundo de troco e faturamento, que já tinha gerado erro antes | Regra "fundo de troco nunca é receita" gravada no topo do nó, não em nota de rodapé |
