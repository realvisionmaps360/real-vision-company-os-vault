---
name: feedback-rv-relatorio-pdf-direto
description: "rv-relatorio migrou de PDF para HTML como formato final (03/07/2026) — vai direto ao HTML finalizado, sem PNG de preview intermediário"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 463b0825-cbda-444f-8600-cb4f86333b58
---

**Mudança estrutural (03/07/2026):** a skill `rv-relatorio` parou de gerar PDF. O documento final entregue ao cliente agora é o **HTML** (anexo de email), em layout de scroll contínuo — não existe mais paginação A4 nem `render.ps1`/Chrome headless. Script atual: `assets/finalize.ps1`, que embute logos, capa e prints como base64 (sem depender de Chrome).

Nunca gerar PNG de preview antes de finalizar o relatório. E o HTML deixou de ser "intermediário técnico descartável" — agora **é** o entregável, então **deve** ficar salvo na pasta do cliente (o oposto da regra antiga, que mandava deletar/nunca deixar o HTML lá).

**Why:** Gerar PNG consome tokens desnecessários — isso não mudou. O que mudou foi a decisão do Felipe de não entregar mais PDF: o HTML é "mais bonito, ilustra melhor, mais fácil da pessoa ver" (motivo dado por ele em 03/07/2026).

**How to apply:** Montar o HTML no scratchpad da sessão (ainda faz sentido rascunhar lá, com `<img>` em caminho relativo pra conferir no navegador), depois rodar `assets/finalize.ps1` apontando `-Out` para a pasta do cliente com nome `<Cliente>_<Tipo>_<DD-MM-AA>.html`. Esse `.html` final é o que fica salvo e é enviado — não apagar. Ver [[project_rv_relatorio_html_migracao]] para o histórico completo da migração.
