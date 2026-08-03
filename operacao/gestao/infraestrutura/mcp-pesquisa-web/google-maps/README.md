# Google Maps — Dados de Negócios Locais

## O que é

MCP que consulta a API do Google Maps direto — busca de lugares, endereço,
avaliação, horário de funcionamento, coordenadas. Útil pra prospecção
(mapear negócios de uma cidade/região) e pra enriquecer fichas de cliente com
dado real do Google.

## Status

✅ **Ativo e testado** — API key registrada, conector reiniciado e validado
com busca real (agências de marketing em São Bernardo do Campo: nome,
telefone, site, endereço e nota trazidos corretamente).

⚠️ **Quebrou entre 20/07 e 27/07/2026** — key continuava válida, mas o
projeto Cloud (`proven-airship-503011-u9`, "Google Maps MCP") só tinha
Places API (New) e Routes API habilitadas. O pacote usado por este MCP
(`@cablate/mcp-google-map`) precisa das APIs **clássicas**: Geocoding,
Places, Directions, Distance Matrix, Elevation, Time Zone, Static Maps.
Corrigido em 27/07/2026 habilitando todas via `gcloud services enable`.
Se voltar a dar erro `REQUEST_DENIED` / "API is not activated", checar
essa lista primeiro.

## Cota / risco de limite

Cobrança liga depois da cota grátis mensal do Google Cloud (Places API +
Routes API). Verificar uso em console.cloud.google.com → APIs e Serviços →
Painel. Sem histórico de consumo ainda (recém-ativado em 20/07/2026) — vale
checar depois de um mês de uso normal pra saber a média real.

## Como pegar a API key

1. Acessa https://console.cloud.google.com
2. Cria (ou usa) um projeto
3. Ativa a **"Places API"** (e "Maps JavaScript API" se for usar também)
4. Vai em **APIs e Serviços → Credenciais → Criar credencial → Chave de API**
5. Copia a chave gerada
6. Cola no `.mcp.json` no lugar de `COLE_SUA_CHAVE_AQUI`

⚠️ A Google cobra depois de passar a cota grátis mensal — vale colocar um
limite de gasto no console pra não ter surpresa.

## Registro no Claude Code

Está no `.mcp.json` do projeto:

```json
"google-maps": {
  "command": "npx",
  "args": ["-y", "@cablate/mcp-google-map", "--stdio"],
  "env": {
    "GOOGLE_MAPS_API_KEY": "(chave real, não exposta aqui)"
  }
}
```

## Quando usar

- Mapear negócios de um segmento numa cidade (prospecção)
- Puxar dado verificado (endereço, nota, horário) de um lead específico
- Complementar o que o SearXNG/Firecrawl trazem com dado estruturado do Maps

## Instalado em

20/07/2026 — config adicionada e testada no mesmo dia. Ver
[`../README.md`](../README.md) pro contexto geral, e
[`../../CONTROLE-MCPS.md`](../../CONTROLE-MCPS.md) pro catálogo de todos os
MCPs da Real Vision.
