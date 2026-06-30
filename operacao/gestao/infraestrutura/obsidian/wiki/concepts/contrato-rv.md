---
type: concept
title: Contrato Real Vision — Service Agreement v1.0
aliases: [contrato, service agreement, contrato RV]
date_created: 2026-06-29
date_updated: 2026-06-29
source_count: 1
tags: [comercial, contrato, juridico]
status: stable
---

# Contrato Real Vision — Service Agreement v1.0

Contrato padrão da Real Vision para formalização de serviços. Gerado pela skill `rv-contrato`.

## Estrutura

1. **Capa** (navy) com logo e dados do cliente
2. **Resumo Executivo** (pág. 2) — dashboard 2×2:
   - Serviços contratados
   - Entregas previstas
   - Prazo
   - Investimento
3. Termos de Serviço anexados (v1.1, jun/2026)

## Placeholders do template

`CLIENT_NAME`, `CLIENT_COMPANY`, `CLIENT_ADDRESS`, `PROJECT_SCOPE`, `TOTAL_VALUE`, `START_DATE`, `DELIVERY_DATE`, `EXEC_SERVICE_ITEM`, `EXEC_DELIVERABLE_ITEM`, `EXEC_DURATION`

## Arquivos

- Template PT: `operacao/comercial/CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md`
- Template EN: `operacao/comercial/SERVICE-AGREEMENT-TEMPLATE-v1.0-EN.md`
- Termos PT: `operacao/comercial/TERMOS-E-CONDICOES-GERAIS-v1.1-PT.md`
- Termos EN: `operacao/comercial/GENERAL-TERMS-CONDITIONS-v1.1-EN.md`
- Demo gerado: `operacao/comercial/contratos/PousadaDasFlores_Contrato_20-06-26.pdf`

## Como gerar

Ativar a skill `rv-contrato` com dados do cliente. Output: PDF com capa + resumo executivo + termos.

## Conceitos relacionados

- [[termos-condicoes]]
- [[socio-digital]]
