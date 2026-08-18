---
id: CON-2026-006
tipo: conhecimento
nome: Sunbite — Ficha técnica do produto e capacidade operacional
status: ativo
responsavel: "[[Romana Loznjakovic]]"
criado_em: 2026-08-17
atualizado_em: 2026-08-17
proxima_revisao: 2026-09-17
confiabilidade: alta
fonte_unica: true
pertence_a: ["[[02-Projetos/sunbite/PROJETO]]"]
referencia: ["[[SUNBITE-PROJETO]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# Sunbite — Ficha técnica do produto e capacidade operacional

Gramaturas, composição e capacidade. **Nenhum valor em CHF aqui** — preços e custos vivem em [[sunbite-unit-economics]].

## Porção padrão

| Componente | Por copo | Nível |
|---|---|---|
| Morango | 140 g | CONFIRMADO |
| Chocolate | 40-50 g | CONFIRMADO (faixa, não valor único) |
| Topping | ~5 g | CONFIRMADO, aproximado |
| Copo | 300 ml rPET | CONFIRMADO |
| Chantilly | opcional, grátis | CONFIRMADO |

**Pendência de padronização:** o chocolate está numa faixa de 40 a 50 g. Uma diferença de 10 g por copo muda o custo do insumo em 25%. Vale fixar um número único e medir.

## Toppings disponíveis

- Lâminas de amêndoa tostada
- Coco tostado
- Mini marshmallows
- Chantilly (grátis, não conta como topping pago)

## Rendimento — morango

1 kg rende ~7,14 porções.

| Porções | Morango |
|---|---|
| 10 | 1,4 kg |
| 25 | 3,5 kg |
| 50 | 7 kg |
| 57 | 8 kg |
| 80 | 11,2 kg |
| 100 | 14 kg |
| 200 | 28 kg |

## Rendimento — chocolate

| Porções | Chocolate (40 g) | Chocolate (50 g) |
|---|---|---|
| 10 | 0,4 kg | 0,5 kg |
| 50 | 2,0 kg | 2,5 kg |
| 57 | 2,3 kg | 2,9 kg |
| 80 | 3,2 kg | 4,0 kg |
| 100 | 4,0 kg | 5,0 kg |
| 200 | 8,0 kg | 10,0 kg |

Todas as linhas acima são CALCULADO — conversão matemática direta das gramaturas confirmadas. Não são previsão de consumo real, que depende de desperdício e sobra.

## Capacidade operacional

| Recurso | Capacidade | Nível |
|---|---|---|
| Foodbike elétrica | bateria + inversor, ~7 h de operação | ESTIMATIVA de projeto — **desmentida na prática**, ver [[RSC-2026-002]] |
| Refrigeração | geladeira ~60 L, ~80 porções planejadas | ESTIMATIVA de projeto |
| Pagamento | dinheiro + TWINT | CONFIRMADO |

> A autonomia de ~7 h nunca foi validada em campo. Em 15/08 a bateria zerou no retorno depois de uma jornada de ~18h às ~23h30 mais deslocamento. Tratar os 7 h como número de catálogo, não como autonomia real.

## O teto real ainda não foi testado

A geladeira comporta ~80 porções, mas a operação de 15/08 saiu com estoque para ~57 e esgotou. **A capacidade máxima da bike nunca foi usada até o limite.** A próxima operação tem espaço para ~23 porções a mais sem nenhum investimento — só comprando mais morango.

## Relacionados

- Pertence a: [[02-Projetos/sunbite/PROJETO]]
- Custos e preços: [[sunbite-unit-economics]]
- Referencia (Company OS): [[SUNBITE-PROJETO]]
- Risco de capacidade/segurança: [[RSC-2026-002]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-17 | Nó criado | Ingestão do dump da Romana | Separa especificação de produto (gramaturas) de valores financeiros, respeitando a Fonte Única | Autonomia de 7 h rebaixada a estimativa de catálogo depois do episódio de 15/08 |
