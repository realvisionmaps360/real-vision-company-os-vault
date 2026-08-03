# Firecrawl — Leitor/Scraper de Páginas Web

## O que é

Serviço que converte uma página web (mesmo com JavaScript pesado) em Markdown
limpo, pronto pra IA ler. Usado quando o SearXNG te dá a lista de sites e você
precisa ler o conteúdo de um deles de verdade.

## Como está montado

**Plano cloud com API key** (decisão de 20/07/2026 — mais rápido de manter
que self-hosted, tem cota grátis mensal). Se um dia a cota grátis não bastar
mais, dá pra migrar pra self-hosted (Docker) sem trocar de ferramenta, só
apontando o MCP pra um servidor local em vez do cloud.

## Registro no Claude Code

Está no `.mcp.json` do projeto (chave real omitida aqui de propósito — nunca
colar API key em arquivo versionado):

```json
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp"],
  "env": {
    "FIRECRAWL_API_KEY": "fc-..."
  }
}
```

A chave real está guardada só no `.mcp.json` local (gitignored). Se precisar
trocar de chave ou reinstalar em outra máquina: pega uma nova em
https://www.firecrawl.dev (painel → API Keys) e substitui o valor lá.

## Créditos

Cada `firecrawl_scrape` simples consome ~1 crédito. Não existe ferramenta MCP
pra consultar saldo — o jeito é entrar em firecrawl.dev → Dashboard → Usage e
ver manualmente. Se o uso crescer (curso, prospecção em volume), vale
considerar upgrade de plano ou migrar pra self-hosted.

## Quando usar

- Ler o conteúdo completo de UM site específico (cliente, concorrente,
  landing page) → `firecrawl_scrape`
- Mapear todas as URLs de um site antes de decidir o que ler →
  `firecrawl_map`
- Extrair dado estruturado específico (preço, nome, etc) de várias páginas →
  `firecrawl_extract`

## Instalado em

20/07/2026, junto com o SearXNG. Ver [`../README.md`](../README.md) pro
contexto geral.
