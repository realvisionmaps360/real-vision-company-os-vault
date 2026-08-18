---
id: PRJ-2026-003
tipo: projeto
nome: Sunbite
status: ativo
responsavel: "[[Romana Loznjakovic]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-17
proxima_revisao: 2026-09-06
prazo: continuo
papel_estrategico: "fonte principal de receita para o OBJ-casamento-suica"
pertence_a: ["[[LBOS]]"]
financia: ["[[OBJ-casamento-suica]]"]
afeta: ["[[02-Projetos/casamento/PROJETO]]"]
gera_receita: ["[[REC-2026-004]]", "[[REC-2026-003]]"]
gera_despesa: ["[[DES-2026-002]]", "[[DES-2026-003]]", "[[DES-2026-004]]"]
referencia: ["[[SUNBITE-PROJETO]]"]
tags: [lbos/entidade, lbos/projeto]
---

# Sunbite

> **Mudou de papel.** Deixou de ser projeto paralelo e virou o caminho principal para o objetivo número 1. Ver [[DEC-2026-001]].

## O que é

**Food bike de sobremesas premium** em Aarau, Suíça. Negócio da [[Romana Loznjakovic]], trabalhado pelos dois juntos.

| | |
|---|---|
| Produto | Strawberry Chocolate Cups — morangos frescos + chocolate suíço premium |
| Complemento | Limonada caseira |
| **Preço unitário** | ver [[sunbite-unit-economics]] — nenhum valor é repetido aqui |
| Posicionamento | "Made for Sunny Days" — retrô-elegante, creme + vermelho |
| Mercado | Aarau e região |
| Site | `sunbite.ch` · Grand Opening 18/07/2026 |

Especificação do produto (gramaturas, toppings, capacidade): [[sunbite-ficha-tecnica-produto]].
Dossiê técnico completo: `operacao/clientes/arquivos/Romana Loznjakovic - Sunbite.ch/`. Este nó não repete o conteúdo de lá.

## Por que ela é a fonte principal

Três razões: opera em francos, na cidade onde os dois estão agora; é o único negócio que depende só deles, sem esperar cliente decidir; e o preço unitário já está definido.

Comparação com a outra fonte prevista: [[REC-2026-001]] vale CHF 600, mas depende do Gabriel dizer sim.

## O que falta para virar previsão de caixa

Atualizado em 17/08/2026, depois de dois dias de operação real.

- [x] **Preço de venda** — definido, ver [[sunbite-unit-economics]]
- [x] **Receita real** — dois dias medidos: [[REC-2026-004]] e [[REC-2026-003]]
- [~] **Quanto sai por venda** — morango e copo confirmados; **chocolate, toppings e chantilly desconhecidos**. É o que trava tudo ([[RSC-2026-003]])
- [~] **Volume** — ~57-58 copos em 15/08, mas o estoque esgotou. O teto de demanda nunca foi testado
- [ ] **Frequência** — quantos dias por mês a bike sai
- [ ] **Locais** — onde a bike aparece; captação de pessoas e lugares
- [ ] **Custo fixo** — licença, seguro, equipamento, transporte
- [ ] **Sazonalidade** — o produto é "made for sunny days". O inverno de Aarau muda tudo

Com isso monta-se: quanto entra por mês · quanto pode ser gasto aqui · quanto tem que ser guardado para São Paulo.

> **Cuidado com o número bruto.** CHF 930,60 de receita em dois dias não é dinheiro disponível. Enquanto o custo real não fechar, nada disso entra como previsão de financiamento do [[OBJ-casamento-suica]].

## Ideias futuras — ainda não são projeto

- **Loja virtual no site da Sunbite** (`status: ideia`). Merchandising para capturar demanda que a operação física já gera. Primeiro produto candidato: os chapéus de morango, que clientes reais pediram para comprar ([[TAR-2026-008]]). Escopo mínimo pensado: catálogo, foto, descrição, preço, estoque, pagamento e entrega/retirada. Só vira projeto depois que os chapéus validarem a demanda **e** o custo real deles for conhecido.

> **Fora de escopo por enquanto:** custo de vida do casal. Decisão do Felipe em 06/08/2026 — entra em versão futura. O foco agora é o casamento.

## A cadeia que este projeto fecha

```
Sunbite → Receita (CHF) → Reserva → DES-2026-001 → OBJ-casamento-suica
```

## Relacionados

- Pertence a: [[LBOS]]
- Financia: [[OBJ-casamento-suica]]
- Afeta: [[02-Projetos/casamento/PROJETO]]
- Responsável: [[Romana Loznjakovic]]
- Gera receita: [[REC-2026-004]], [[REC-2026-003]]
- Gera despesa: [[DES-2026-002]], [[DES-2026-003]], [[DES-2026-004]]
- Preços e custos: [[sunbite-unit-economics]] · Caixa: [[sunbite-caixa]]
- Produto: [[sunbite-ficha-tecnica-produto]]
- Riscos ativos: [[RSC-2026-002]], [[RSC-2026-003]]
- Dados a coletar: [[02-Projetos/sunbite/dados-pendentes]]
- Referencia (Company OS): [[SUNBITE-PROJETO]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Nó criado, vazio | Fase 2 do LBOS | Reserva o lugar no grafo sem inventar conteúdo | Preencher só com o Felipe presente |
| 2026-08-06 | Preenchido com dados reais do Company OS; status `planejado` → `ativo` | Felipe apontou a Sunbite como fonte principal de receita para o casamento | Vira o caminho crítico do objetivo nº 1 | Custo de vida fica fora do escopo por ora |
| 2026-08-10 | Primeira operação real planejada: fim de semana de 15-16/08, 5 locais avaliados (planos A-E) | Handoff externo (ChatGPT) repassado por Felipe | Nasce [[RSC-2026-001]] (risco de local sem confirmação a tempo) e [[TAR-2026-001]] (mitigação, prazo 13/08) | Detalhe completo em [[02-Projetos/sunbite/planejamento]] |
| 2026-08-17 | Preço unitário deixa de ser hardcoded aqui (estava CHF 5,00, que era só a promoção de abertura) e passa a apontar para [[sunbite-unit-economics]]; adicionadas as arestas financeiras e a seção de ideias futuras | Ingestão dos dados reais de operação; o valor gravado estava errado e violava a Fonte Única | Projeto passa a ter receita e despesa rastreáveis no grafo; loja virtual registrada como ideia sem virar projeto | Preço vigente é CHF 7,50; loja virtual só avança depois dos chapéus validarem demanda e custo |
