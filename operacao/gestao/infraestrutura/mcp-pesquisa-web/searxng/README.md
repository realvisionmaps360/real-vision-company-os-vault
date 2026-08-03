# SearXNG — Motor de Busca Privado

## O que é

Motor de metabusca open source. Agrega resultados de Google, Bing, DuckDuckGo
e outros, sem rastrear nada. Roda 100% local via Docker, sem custo por busca
nem limite de uso.

## Como está montado neste PC

Dois containers Docker:

1. **`searxng`** — o motor de busca em si, rodando permanentemente na porta
   `8080`. Sobe uma vez e fica ligado (persiste enquanto o Docker Desktop
   estiver aberto).
2. **MCP do SearXNG** (`isokoliuk/mcp-searxng`) — não fica ligado o tempo
   todo. O Claude Code liga esse container sozinho toda vez que precisa
   buscar algo, e ele se desliga automaticamente depois (flag `--rm`).

## Configuração aplicada

Por padrão o SearXNG só devolve resultado em HTML. Foi habilitado o formato
JSON (necessário pra IA ler) editando o `settings.yml` dentro do container:

```yaml
search:
  formats:
    - html
    - json
```

## Registro no Claude Code

Está no `.mcp.json` do projeto:

```json
"searxng": {
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "-e", "SEARXNG_URL=http://host.docker.internal:8080",
    "isokoliuk/mcp-searxng:latest"
  ]
}
```

## Comandos úteis

```bash
# Ver se o motor de busca está rodando
docker ps --filter name=searxng

# Reiniciar se parar de responder
docker restart searxng

# Testar direto no navegador
http://localhost:8080
```

## Troubleshooting

- **Se o Docker Desktop foi fechado**, o container `searxng` para junto —
  precisa abrir o Docker Desktop de novo antes de usar.
- **Se a busca não retornar nada**, confirma que o formato JSON ainda está
  habilitado (`docker exec searxng cat /etc/searxng/settings.yml` — deve
  aparecer o bloco `search: formats:` no final do arquivo).

## Instalado em

20/07/2026, junto com o Firecrawl. Ver [`../README.md`](../README.md) pro
contexto geral.
