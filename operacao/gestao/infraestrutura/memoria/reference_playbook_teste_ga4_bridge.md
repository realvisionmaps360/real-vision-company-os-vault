---
name: playbook-teste-ga4-bridge
description: "Passo a passo pra testar/diagnosticar a integração MCP do Google Analytics (GA4) num site de cliente, incluindo os erros mais comuns encontrados na prática"
metadata: 
  node_type: memory
  type: reference
  originSessionId: ae89b8dc-1f82-487b-bd12-c2d46c3e3e30
---

Playbook validado em jul/2026 no cliente [[project_conecta_saude_migracao]] — usar sempre que for testar ou diagnosticar a ponte MCP do Google Analytics num site novo.

## Passo a passo

1. `get_account_summaries` — lista contas/propriedades GA4 acessíveis. Se der erro `SERVICE_DISABLED` da Google Analytics Admin API, é preciso habilitar em `console.developers.google.com/apis/api/analyticsadmin.googleapis.com` (o próprio Felipe precisa clicar, é ação de infraestrutura Google Cloud — não é algo que eu resolvo sozinho)
2. `run_report` com janela de 7 e depois 90 dias — se vier `row_count: 0` nas duas, **não presuma que "não tem tráfego"**. Pode ser propriedade sem a tag instalada, mesmo que exista há meses
3. Pra confirmar se é falta de tag ou falta de tráfego: `run_realtime_report` enquanto o cliente (ou eu, via browser) acessa o site ativamente. Se não aparecer ninguém em tempo real com alguém navegando ao vivo, é falta de tag — não é questão de esperar
4. Checar o código-fonte do site (WebFetch na URL, ou olhar `index.html` do repositório) procurando `gtag.js`, `googletagmanager.com` ou GTM — confirma se a tag existe de fato no que está publicado
5. **Cuidado:** o repositório de código que o cliente te passa pode não ser o que está publicado de verdade. Sempre confirmar onde o domínio está hospedado de verdade antes de mexer no código (ver [[reference_diagnostico_hospedagem_real]])

## Erro raiz mais comum encontrado

Cliente contratou site via Lovable, o plano Pro venceu, o cliente migrou pra Claude Code + GitHub mas nunca migrou a **hospedagem** — o domínio continua apontando pro Lovable antigo. A tag do GA4 colada no repo GitHub não tem efeito nenhum até a hospedagem ser migrada de verdade.
