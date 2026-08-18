---
tipo: apoio
nome: Historico
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-10
atualizado_em: 2026-08-17
pertence_a: ["[[02-Projetos/sunbite/PROJETO]]"]
tags: [lbos/apoio, lbos/historico]
---

# Historico

Linha do tempo completa do projeto. Nada e perdido (spec 20).

| Data | O que mudou | Motivo | Impacto | Decisao |
|---|---|---|---|---|
| 2026-08-10 | Planejamento, checklist, cronograma e riscos preenchidos pela primeira vez (saíram do template vazio); criados [[RSC-2026-001]] e [[TAR-2026-001]] | Handoff externo (sessão ChatGPT) trouxe a missão de definir onde a Sunbite opera no fim de semana de 15-16/08, com 5 planos (A-E) mapeados | Projeto ganha primeira operação real e primeiro risco/tarefa formais no grafo. Prazo apertado: 5 dias entre a captura e a operação | Ordem de prioridade A→B→C/D/E; prazo-limite 13/08 pra ativar o Plano B se o Streetfood não responder |
| 2026-08-15 | **Operação realizada.** Sábado, ~18h00 às ~23h30, na margem da Aare — Schiffländestrasse 43, 5000 Aarau (`47.394094, 8.039383`), o **Plano C** do planejamento. Esgotou o estoque e vendeu o último copo. Receita bruta CHF 450,90 ([[REC-2026-003]]) a CHF 7,50/copo. Estoque: 8 kg de morango do fazendeiro por CHF 75, comprados no mesmo dia ([[DES-2026-004]]) | Execução do planejamento de 10/08 | [[RSC-2026-001]] não se materializou e foi encerrado; [[TAR-2026-001]] concluída. Primeira receita da Sunbite com preço cheio | Não houve operação no domingo 16/08. Local específico usado não foi registrado — pendente com a Romana |
| 2026-08-15 | **Falha de segurança no retorno.** Bateria informada como 100% zerou por volta da meia-noite; Felipe empurrou a bike em trecho escuro e em subida. Freio identificado como fraco | Relatado por Felipe em 17/08/2026 | Nasce [[RSC-2026-002]] com probabilidade e severidade `alta` — trava novas operações até diagnóstico. Nasce [[TAR-2026-006]], com mensagem em bósnio pro pai da Romana | Compra de bateria só depois do diagnóstico técnico, nunca antes |
| 2026-08-17 | **Ingestão dos dados financeiros e de produto.** Criados [[REC-2026-004]], [[REC-2026-003]], [[DES-2026-002]], [[DES-2026-003]], [[DES-2026-004]], [[sunbite-unit-economics]], [[sunbite-caixa]], [[sunbite-ficha-tecnica-produto]] e [[Mama]] | Dump de dados da Romana (via ChatGPT) repassado por Felipe, complementado por dados que só ele tinha | Sunbite passa a ter receita, custo unitário parcial e ficha de produto rastreáveis. Receita bruta acumulada confirmada: CHF 930,60 em dois dias | Adotada a regra dos 4 níveis (CONFIRMADO / CALCULADO / ESTIMATIVA / DESCONHECIDO). Estimativas antigas de COGS gravadas como superadas em vez de apagadas |
| 2026-08-17 | **Divergência de preço corrigida.** O projeto registrava CHF 5,00 como preço unitário; esse era o promocional da abertura. Preço vigente é CHF 7,50 + CHF 0,50 por topping | Felipe confirmou o preço praticado em 15/08 | [[02-Projetos/sunbite/PROJETO]] corrigido. O convite em `sunbite.ch/invitation` ainda mostra CHF 5 — é produção, virou [[TAR-2026-010]] | Nada publicado no site sem OK explícito do Felipe |
| 2026-08-17 | Criado [[RSC-2026-003]] — operar e escalar sem conhecer a margem real | A ingestão revelou receita confirmada sem nenhum custo total apurado; o chocolate, provável segundo maior custo, é desconhecido | Trava decisões de escala (loja virtual, mais operações, equipamento) até o primeiro COGS real | Coleta de dados priorizada pelo chocolate ([[TAR-2026-009]]) |
| 2026-08-17 | **Incidente de colisão de ID, corrigido no mesmo dia.** A receita da abertura da Sunbite foi criada como `REC-2026-002`, ID que uma sessão paralela já tinha alocado ao Paraty Onboard minutos antes — o arquivo do Eduardo foi sobrescrito | Três sessões trabalhando em paralelo no mesmo vault; o escaneamento de IDs feito no início da sessão ficou desatualizado | Arquivo do Paraty restaurado íntegro a partir do transcript da sessão de origem; receita da Sunbite realocada para [[REC-2026-004]] e todas as referências corrigidas. Nenhum dado perdido | Alocar ID exige reescanear o vault imediatamente antes de escrever, não no começo da sessão |
| 2026-08-17 | Checklist operacional reutilizável criado; [[02-Projetos/sunbite/dados-pendentes]] criado a partir da estrutura de coleta da Romana | Felipe pediu checklist reutilizável e decidiu que dado faltante vira pergunta pra Romana, não suposição | Toda operação futura passa a produzir fechamento verificável | Contagem física de copos e toppings passa a ser obrigatória — não se deduz volume da receita |

## Relacionados
- Pertence a: [[02-Projetos/sunbite/PROJETO]]
