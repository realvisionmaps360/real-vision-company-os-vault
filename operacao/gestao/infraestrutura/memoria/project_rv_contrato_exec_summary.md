---
name: project_rv_contrato_exec_summary
description: "Decisão de design: página de Resumo Executivo (dashboard de cards) adicionada ao template de contrato RV em jun/2026"
metadata: 
  node_type: memory
  type: project
  originSessionId: 96318ac7-d0ea-4eca-bd21-8155bd215bf5
---

Em 20/06/2026, após revisão do `CONTRATO-DEMO.pdf`, o Felipe aprovou a adição de uma **página de Resumo Executivo** (pág. 2, logo após a capa navy) no template oficial de contrato da Real Vision.

**O que é:** dashboard 2×2 + faixa de próximos passos. O cliente abre o PDF e em 30 segundos entende: (1) o que comprou, (2) o que será entregue, (3) prazo, (4) investimento, (5) próximos passos — antes de chegar nas 15 cláusulas jurídicas.

**Layout escolhido:** Dashboard de cards (grid 2×2):
- Card 1: Serviços Contratados
- Card 2: O que será entregue
- Card 3: Prazo (datas navy + duração)
- Card 4: Investimento Total (valor grande em Bebas Neue âmbar)
- Faixa navy: Próximos Passos (1 Assinar → 2 Pagar entrada → 3 Agendar início)
- Disclaimer no rodapé: caráter informativo, vinculante são as cláusulas.

**Por que:** melhoria de experiência do cliente; as 15 seções jurídicas permanecem intactas e na ordem.

**Onde está implementado:**
- Core: `~/.claude/skills/rv-contrato/assets/contrato-template.html` (CSS `.exec-*` + seção `.exec-page`)
- SKILL.md atualizado com novos placeholders obrigatórios e instrução de montagem.
- Demo: `operacao/comercial/CONTRATO-DEMO.html` + PDF regereado.

**Novos placeholders adicionados ao template:**
`EXEC_SERVICE_ITEM`, `EXEC_DELIVERABLE_ITEM`, `START_DATE_SHORT`, `DELIVERY_DATE_SHORT`, `EXEC_DURATION`
(reutilizam `PROJECT_VALUE` e `PAYMENT_STRUCTURE` já existentes)

**Também adicionado:** `tr.total` na tabela do §9 (Investimento) para destacar o valor total com linha âmbar — estava no CSS desde o início mas nunca usado.

**How to apply:** ao gerar qualquer contrato novo, a página de resumo executivo é obrigatória (preencher os novos placeholders listados acima). Não é opcional.
