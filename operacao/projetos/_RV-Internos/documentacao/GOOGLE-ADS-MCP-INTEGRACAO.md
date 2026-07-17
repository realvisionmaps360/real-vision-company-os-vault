# Integração Google Ads API + MCP Server

## Status: ✅ MCP conectado e funcionando (11/07/2026) — MCC ativa mas sem contas de anúncio filhas ainda

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

## Google Cloud + OAuth (concluído 06/07/2026)

- Projeto criado: `real-vision-ads-mcp`
- Google Ads API habilitada
- Credenciais OAuth (Desktop app) criadas
- Arquivo de credenciais salvo em: `TEMP/client_secret_865189378753-8qnls48uloe5msmdg94shil5h82rmmu4.apps.googleusercontent.com.json` (pasta `TEMP/` está no `.gitignore` do vault — nunca sobe pro GitHub)
- Client ID: `865189378753-8qnls48uloe5msmdg94shil5h82rmmu4.apps.googleusercontent.com`
- Client Secret: guardado apenas no arquivo JSON local acima — **não duplicar em outros arquivos do vault**

## Observação importante encontrada no processo
- A conta "Real Vision Google ADS Account" original (156-292-4356) está **cancelada** — não pode ser usada.
- A conta de anúncio ativa correta do Felipe é `felipegarciajericoacoara@gmail.com`.
- A Central de API (API Center) só é acessível a partir de uma conta **MCC** (gerenciadora), não de conta de anúncio comum — foi por isso que a primeira tentativa falhou com a mensagem "disponível apenas para contas de administrador".

## ATUALIZAÇÃO 11/07/2026 — MCP conectado e testado com sucesso

Depois do pedido de acesso de 06/07, seguimos direto pra conectar o MCP (o acesso básico da API ainda não precisa ter sido aprovado para o Developer Token nível "conta de teste" funcionar em `list_accessible_customers` e consultas GAQL básicas).

### Descoberta crítica: contas Google cruzadas

O motivo de tudo travar no início: duas peças da integração estavam em **contas Google diferentes**, e ninguém tinha percebido:

| Peça | Vive na conta |
|---|---|
| Projeto Google Cloud `real-vision-ads-mcp` (app OAuth, Client ID/Secret) | `realvisionmaps360@gmail.com` |
| MCC `359-167-3566` ("Felipe Garcia Real Vision conta google ads claude") | `felipegarciajericoacoara@gmail.com` |

Isso significa: pra gerar um refresh token que enxergue a MCC, o login OAuth (a etapa "escolha uma conta Google" no navegador) **tem que ser feito logando com `felipegarciajericoacoara@gmail.com`** — não com a `realvisionmaps360`. Confundir essas duas contas foi a causa de horas perdidas tentando autenticar.

### Como o MCP realmente autentica (lendo o código-fonte)

A documentação pública do repo sugere um `google-ads.yaml`, mas **o servidor instalado via pip (`ads_mcp/utils.py`) NÃO lê esse arquivo**. Ele usa **Application Default Credentials (ADC)** do Google + variáveis de ambiente:

- `GOOGLE_APPLICATION_CREDENTIALS` → caminho para um JSON de credenciais no formato `authorized_user` (client_id, client_secret, refresh_token)
- `GOOGLE_ADS_DEVELOPER_TOKEN` (env)
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (env) → ID da MCC sem traços, ex: `3591673566`
- `GOOGLE_CLOUD_PROJECT` (env, opcional mas recomendado)

Sem essas variáveis, o servidor sobe (mostra "Starting MCP server... stdio" no terminal) mas quebra silenciosamente na primeira chamada de ferramenta — e o Claude Code, ao tentar registrar o servidor, desiste sem aviso de erro visível.

### Passo a passo que funcionou (sem precisar instalar `gcloud`)

1. Instalar dependência mínima: `pip install google-auth-oauthlib`
2. Rodar um script Python pequeno usando `InstalledAppFlow.from_client_secrets_file(...).run_local_server()` — isso abre o navegador, pede login e autorização, e imprime o `refresh_token` no terminal
3. **No navegador, logar com a conta certa** (`felipegarciajericoacoara@gmail.com` para a MCC)
4. **Pré-requisito obrigatório:** no [Google Cloud Console → Tela de consentimento OAuth](https://console.cloud.google.com/apis/credentials/consent) do projeto `real-vision-ads-mcp` (acessado logado como `realvisionmaps360@gmail.com`, dona do projeto), adicionar a conta que vai logar (`felipegarciajericoacoara@gmail.com`) em **Usuários de teste** — senão dá erro 403 `access_denied` (app em modo Testing só aceita emails cadastrados)
5. Com o refresh token em mãos, montar o JSON de credenciais ADC:
   ```json
   {
     "type": "authorized_user",
     "client_id": "<CLIENT_ID>",
     "client_secret": "<CLIENT_SECRET>",
     "refresh_token": "<REFRESH_TOKEN>"
   }
   ```
   Salvo em: `C:\Users\Computador\.config\gcloud\application_default_credentials.json`
6. Instalar o servidor de forma fixa (não usar `pipx run --spec ...` toda vez — reinstala do zero e é lento): `pipx install "git+https://github.com/googleads/google-ads-mcp.git"` → expõe `google-ads-mcp.exe` em `C:\Users\Computador\.local\bin\`

### Onde registrar o servidor no Claude Code (armadilha encontrada)

O `~/.claude/settings.json` tem uma seção `mcpServers`, mas **nesse ambiente ela não é o mecanismo ativo de conexão** — servidores como o `claude-flow` (que funciona) estão registrados em `C:\Users\Computador\.mcp.json`, um arquivo separado. Foi só ao registrar o `google-ads-mcp` **também nesse `.mcp.json`** (mesmo formato do `claude-flow`) que o servidor conectou de verdade e as ferramentas apareceram (`mcp__google-ads-mcp__customers_list_accessible_customers`, `search_search`, `metadata_get_resource_metadata`).

Configuração funcional final (em `C:\Users\Computador\.mcp.json`):
```json
{
  "mcpServers": {
    "google-ads-mcp": {
      "command": "C:\\Users\\Computador\\.local\\bin\\google-ads-mcp.exe",
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\Computador\\.config\\gcloud\\application_default_credentials.json",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "ugKNXUpgM-WU2SJWZJl8kA",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "3591673566",
        "GOOGLE_CLOUD_PROJECT": "real-vision-ads-mcp"
      }
    }
  }
}
```
(A mesma entrada também ficou espelhada em `~/.claude/settings.json`, sem prejuízo — só o `.mcp.json` é que realmente importa aqui.)

### Resultado do teste real (`customers_list_accessible_customers`)

| Conta | ID | Status |
|---|---|---|
| Real Vision Google ADS Account (antiga) | `156-292-4356` | ❌ Cancelada (`CUSTOMER_NOT_ENABLED`) |
| Felipe Garcia Real Vision conta google ads claude | `359-167-3566` | ✅ Ativa (BRL), é a MCC (gerente) |

**Importante: a MCC está ativa mas vazia** — ainda não gerencia nenhuma conta de anúncio filha. Para rodar a campanha do blog post, o próximo passo é **criar uma conta de anúncio dentro da MCC**.

## ATUALIZAÇÃO 12/07/2026 — Conta de anúncio em criação + auditoria de pré-lançamento

- Iniciada a criação de uma conta de anúncio nova dentro da MCC (ID provisório `414-120-1211`), com Perfil da Empresa "Real Vision 360°" e páginas de referência (site, LinkedIn, YouTube, Instagram). **Fluxo pausado antes da etapa de orçamento/pagamento** — nada foi ativado, por decisão explícita de não gastar ainda.
- Rodada auditoria de segurança + tracking do site antes de qualquer campanha real. Achado crítico (RLS desligado em tabelas do CRM, exposto via chave anon do site público) e achado de spam em `blog_comments` já corrigidos. Tracking de leitura do blog (GA4) implementado. Detalhes completos: [`AUDITORIA-SEGURANCA-TRACKING-SITE-2026-07-12.md`](./AUDITORIA-SEGURANCA-TRACKING-SITE-2026-07-12.md).
- Criada a skill `rv-trafego-pago` (`Real Vision/skills/rv-trafego-pago/SKILL.md`) para arquitetar a estrutura da campanha antes de lançar.

## Próximos passos

1. Retomar e concluir a criação da conta de anúncio dentro da MCC `359-167-3566` (ID provisório `414-120-1211`), logado como `felipegarciajericoacoara@gmail.com` — parar antes de confirmar orçamento/pagamento até aprovação explícita do Felipe.
2. Confirmar vínculo GA4 ↔ Google Ads (`mcp__google-analytics__list_google_ads_links`) e marcar `blog_post_read` como conversão.
3. Configurar a campanha de Search para o blog post [Diferença entre LLM e SLM](https://realvisionmaps.com/blog/diferenca-entre-llm-e-slm), seguindo o briefing e checklist da skill `rv-trafego-pago`.
4. Confirmar se o pedido de Acesso Básico à API (enviado 06/07) já foi aprovado — necessário para métricas de campanhas reais além da conta de teste.

Ferramentas disponíveis no MCP hoje: `customers_list_accessible_customers`, `search_search` (GAQL), `metadata_get_resource_metadata`. Servidor é **estritamente read-only** — não cria, pausa ou edita campanhas/lances.

## Fontes
- [Google Ads API - Developer Toolkit MCP Server](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server?hl=pt-br)
- Repo oficial: github.com/googleads/google-ads-mcp
