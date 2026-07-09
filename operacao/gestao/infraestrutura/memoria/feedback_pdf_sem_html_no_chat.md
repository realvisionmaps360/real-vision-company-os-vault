---
name: feedback_pdf_sem_html_no_chat
description: "Ao gerar PDFs com rv-relatorio ou qualquer skill de documento, não mostrar o HTML montado no chat — só avisar quando o PDF estiver pronto."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c55320aa-92b2-4ea9-b646-83a4e5baf5ba
---

Não mostrar o HTML gerado no chat ao criar PDFs com rv-relatorio ou skills similares. Ir direto ao render e avisar quando o PDF estiver pronto.

**Why:** Mostrar o HTML no chat é desnecessário, gasta tokens e polui a conversa. Felipe só precisa do PDF final.

**How to apply:** Em qualquer sessão que use rv-relatorio (ou qualquer outra skill de geração de PDF): montar o HTML silenciosamente, renderizar, e informar apenas "PDF pronto em [caminho]". Não fazer display do código HTML na resposta.
