# Supabase MCP Setup — VisionFlow (ghwjetvazmdlaqidgxqi)

> Guia para configurar os MCPs do Supabase no Hermes Agent.
> Projeto: **VisionFlow CRM** — Project ID: `ghwjetvazmdlaqidgxqi`

---

## Credenciais Necessárias

| Credencial | Onde Pegar | Status |
|------------|------------|--------|
| **Personal Access Token (PAT)** | https://supabase.com/dashboard/account/tokens → "Generate new token" | ⚠️ **PRECISA GERAR** |
| **Service Role Key** | Project Settings → API → `service_role` (secret) | ✅ Já tenho (do JWT do .env) |
| **Project URL** | Project Settings → API → Project URL | ✅ `https://ghwjetvazmdlaqidgxqi.supabase.co` |

---

## MCPs a Instalar

```bash
npm install -g @supabase/mcp-server-supabase @supabase/mcp-server-postgrest
```

| MCP Server | Binary | Auth Method |
|------------|--------|-------------|
| `@supabase/mcp-server-supabase` | `mcp-server-supabase` | `SUPABASE_ACCESS_TOKEN` (PAT) |
| `@supabase/mcp-server-postgrest` | `mcp-server-postgrest` | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |

---

## Configuração no Hermes (~/.hermes/config.yaml)

```yaml
mcp_servers:
  supabase:
    command: mcp-server-supabase
    env:
      SUPABASE_ACCESS_TOKEN: "sbp_SEU_PAT_AQUI"
    timeout: 60
  supabase-postgrest:
    command: mcp-server-postgrest
    env:
      SUPABASE_URL: "https://ghwjetvazmdlaqidgxqi.supabase.co"
      SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdod2pldHZhem1kbGFxaWRneHFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIiwiaWF0IjoxNzgxNDc2MjM0LCJleHAiOjIwOTcwNTIyMzR9.WsmmhDdwy9sO7ZDWrpwCHtA2AxBucWVOI4Ilb8uT5gs"
    timeout: 60
```

> **Nota:** O `SUPABASE_SERVICE_ROLE_KEY` acima é o do projeto `ghwjetvazmdlaqidgxqi` (extraído do JWT que estava no `.env` do repo). Se regeneraram a key no dashboard, atualize aqui.

---

## Passo a Passo Rápido (Nova Sessão)

### 1. Gere o PAT
```bash
# Abra no navegador:
# https://supabase.com/dashboard/account/tokens
# Clique "Generate new token" → nome "hermes-mcp" → copie o sbp_...
```

### 2. Instale Node.js + MCPs (se não tiver)
```bash
# Node via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm install --lts

# MCPs
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && npm install -g @supabase/mcp-server-supabase @supabase/mcp-server-postgrest
```

### 3. Edite o config do Hermes
```bash
nano /home/hermeswebui/.hermes/config.yaml
# Cole a seção mcp_servers acima
# Troque sbp_SEU_PAT_AQUI pelo seu PAT real
# Ctrl+O, Enter, Ctrl+X
```

### 4. Reinicie o Hermes
```bash
docker restart hermes-webui-xevm-hermes-webui-1
```

### 5. Teste
No chat do Hermes, peça: "lista as tabelas do Supabase" ou "roda uma query simples".

---

## Arquivos Relacionados no Repo

- `/workspace/visionflow/.env` — tem `VITE_SUPABASE_PROJECT_ID=ghwjetvazmdlaqidgxqi`
- `/workspace/visionflow/supabase/config.toml` — `project_id = "ghwjetvazmdlaqidgxqi"`
- `/workspace/visionflow/supabase/migrations/` — 4 migrations novas de uptime (006)
- `/workspace/visionflow/plans/006-dashboard-monitoramento-uptime.md` — plano que usa essas tabelas

---

## Prompt para Nova Sessão

> **Cole isto numa nova sessão do Hermes para continuar:**
>
> ```
> Preciso configurar os MCPs do Supabase pro projeto VisionFlow (project_id: ghwjetvazmdlaqidgxqi).
> 
> Já tenho:
> - Node.js + npm instalados via nvm
> - @supabase/mcp-server-supabase e @supabase/mcp-server-postgrest instalados globalmente
> - Service Role Key do projeto (extraída do JWT do .env)
> - Project URL: https://ghwjetvazmdlaqidgxqi.supabase.co
> 
> Falta: gerar Personal Access Token (PAT) no dashboard do Supabase e colocar no ~/.hermes/config.yaml na seção mcp_servers.supabase.env.SUPABASE_ACCESS_TOKEN.
> 
> Me guia no passo a passo pra gerar o PAT, editar o config, reiniciar o container e testar.
> ```