# Integração Google Ads API + MCP Server

## Status: aplicação de acesso básico enviada — aguardando revisão do Google (06/07/2026)

## Objetivo
Conectar o Claude Code à API do Google Ads via MCP Server oficial (read-only), para consultar métricas e relatórios de campanhas por linguagem natural, sem precisar navegar na interface do Google Ads. Motivação inicial: campanha de tráfego pago para o blog post [Diferença entre LLM e SLM](https://realvisionmaps.com/blog/diferenca-entre-llm-e-slm).

## O que já foi feito (06/07/2026)

1. **Conta MCC criada** — "Felipe Garcia Real Vision conta google ads claude", ID `359-167-3566`, uso: "Gerenciar minhas contas", tipo de empresa: Anunciante.
2. **Developer Token obtido** — nível "Conta de teste" (funciona só com contas de teste, sem gastar dinheiro real).
3. **Solicitação de Acesso Básico enviada** — formulário "Google Ads API Token Application" preenchido e submetido. Prazo de revisão: até 3 dias úteis (pode demorar mais em casos complexos).
   - Conta de contato: `realvisionmaps360@gmail.com`
   - MCC ID informado: `359-167-3566`
   - Documento de design anexado: gerado a partir do modelo oficial da Google (Sample Design Documentation), adaptado para a Real Vision — descreve o uso como ferramenta interna, read-only, sem UI externa, via MCP + Claude.
   - Tipo de acesso: Internal users only
   - Capacidade marcada: Reporting (nenhuma de criação/gerenciamento de conta ou campanha)
   - Tipo de campanha suportado: Search

## Observação importante encontrada no processo
- A conta "Real Vision Google ADS Account" original (156-292-4356) está **cancelada** — não pode ser usada.
- A conta de anúncio ativa correta do Felipe é `felipegarciajericoacoara@gmail.com`.
- A Central de API (API Center) só é acessível a partir de uma conta **MCC** (gerenciadora), não de conta de anúncio comum — foi por isso que a primeira tentativa falhou com a mensagem "disponível apenas para contas de administrador".

## Próximos passos (assim que aprovado)

1. Criar projeto no Google Cloud Console (ex: `real-vision-ads-mcp`), habilitar a Google Ads API.
2. Criar credenciais OAuth (tipo Desktop App) — obter Client ID e Client Secret.
3. Configurar o `settings.json` do Claude Code com o servidor MCP:

```json
{
  "mcpServers": {
    "google-ads-mcp": {
      "command": "pipx",
      "args": [
        "run",
        "--spec",
        "git+https://github.com/googleads/google-ads-mcp.git",
        "google-ads-mcp"
      ],
      "env": {
        "GOOGLE_PROJECT_ID": "SEU_PROJECT_ID",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "SEU_DEVELOPER_TOKEN"
      }
    }
  }
}
```

4. Primeira autenticação OAuth (login via navegador).
5. Testar com prompt simples: "quais contas do Google Ads eu tenho acesso?"

Ferramentas disponíveis no MCP: `list_accessible_customers`, `search` (GAQL), `get_resource_metadata`. Servidor é **estritamente read-only** — não cria, pausa ou edita campanhas/lances.

## Fontes
- [Google Ads API - Developer Toolkit MCP Server](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server?hl=pt-br)
- Repo oficial: github.com/googleads/google-ads-mcp
