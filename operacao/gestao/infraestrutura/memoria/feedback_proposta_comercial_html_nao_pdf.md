---
name: feedback-proposta-comercial-html-nao-pdf
description: "proposta-comercial (skill) gera HTML autocontido, nunca PDF — mesma decisão do rv-relatorio"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02d9be4-2d8a-468d-8a34-75da78c50d75
---

A skill `proposta-comercial` gera a proposta final em **HTML autocontido** (scroll contínuo), nunca em PDF. Corrigido em 07/07/2026 — a skill ainda estava com `anthropic-skills:pdf` na Etapa 3, ficou desatualizada depois que a decisão de abandonar PDF foi tomada só para o [[project_rv_relatorio_html_migracao]] (03/07/2026) e nunca replicada na proposta.

**Why:** HTML fica mais bonito de ler no navegador/celular do que PDF paginado, e é mais barato/rápido de gerar (sem depender de renderização Chrome/PDF).

**How to apply:** ao usar a skill `proposta-comercial`, a Etapa 3 monta o HTML no scratchpad, reaproveita os logos de `skills/rv-relatorio/assets/brand/` e o script `skills/rv-relatorio/assets/finalize.ps1` para embutir imagens em base64 (se houver). Nome do arquivo final: `proposta-[nome-empresa-slug]-[data].html`, salvo em `operacao/comercial/propostas/`. Se no futuro outra skill de documento de cliente for criada, checar se ela também precisa dessa mesma correção (não assumir que só rv-relatorio e proposta-comercial usam PDF).
