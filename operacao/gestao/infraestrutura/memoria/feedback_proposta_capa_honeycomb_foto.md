---
name: feedback-proposta-capa-honeycomb-foto
description: "proposta-comercial adota capa honeycomb do rv-relatorio; foto do cliente é obrigatória, pedir antes se faltar"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02d9be4-2d8a-468d-8a34-75da78c50d75
---

A skill `proposta-comercial` agora usa o mesmo layout e capa honeycomb (colmeia mascarando foto) da skill `rv-relatorio`, reaproveitando `template.html` e `finalize.ps1` — não é mais um template de texto solto. Ver [[feedback_proposta_comercial_html_nao_pdf]].

**Regra explícita do Felipe (07/07/2026):** a capa sempre precisa de uma foto real do cliente. Se não tiver a foto ainda na hora de gerar a proposta, **parar e pedir a ele antes** — nunca gerar com capa genérica/placeholder.

**Why:** Felipe gosta do padrão visual do `rv-relatorio` e quer que a proposta comercial siga a mesma identidade de entrega. O padrão está em evolução contínua — toda melhoria feita em `rv-relatorio` (novo componente, correção de bug, tamanho de imagem) deve ser replicada na próxima proposta gerada.

**How to apply:** na Etapa 1 da skill `proposta-comercial`, a pergunta 6 pede a foto de capa antes de seguir. Na Etapa 3, o HTML é montado a partir de `skills/rv-relatorio/assets/template.html`, escolhendo a capa A (escura) ou B (clara), e finalizado com `skills/rv-relatorio/assets/finalize.ps1`.
