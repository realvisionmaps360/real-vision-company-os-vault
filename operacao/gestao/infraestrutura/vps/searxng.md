# SearXNG — Instância Privada no VPS

**Status:** ✅ Instalado e funcionando
**Data:** 22/07/2026
**Responsável:** Thomas Anderson (Hermes Agent)

## O que é
Motor de busca privativo, open source. Agrega resultados de Google, DuckDuckGo, Brave, Bing, Wikipedia, GitHub, YouTube e mais — sem rastreamento. Instância própria no VPS, sem logs, sem censura.

## Acessos

| Recurso | URL |
|---------|-----|
| UI Web | http://187.77.36.202:8888 |
| API JSON | http://187.77.36.202:8888/search?q=termo&format=json |
| Healthcheck | http://187.77.36.202:8888/healthz |

## Localização no VPS
- **Pasta:** `/opt/searxng-vps/`
- **Docker compose:** `docker compose -f /opt/searxng-vps/docker-compose.yml`
- **Config:** `settings.yml` com `use_default_settings: true` + personalizações PT-BR

## Configuração
- **Cache:** Valkey 8 (Redis-compatível, persistente, 256mb, LRU)
- **Rate limit:** 5 req/s IP (burst 10)
- **Idioma:** pt-BR
- **Safe search:** Moderado
- **Image proxy:** Ligado
- **Porta:** 8888

## Como usar via código
```python
import requests
BASE = "http://187.77.36.202:8888"
r = requests.get(f"{BASE}/search", params={"q": "sua busca", "format": "json"})
data = r.json()
```

## Próximos passos sugeridos
1. Domínio próprio: `busca.realvisionmaps.com`
2. SSL/HTTPS via Nginx + Let's Encrypt
3. Autenticação Basic Auth
4. Usar API pra alimentar agentes de IA com buscas sem bloqueio

## Notas técnicas
- Versão `latest` do SearXNG quebrou com formato antigo de `plugins` no settings.yml — resolvido removendo seção (defaults cobrem)
- Skill Hermes: `searxng-vps-deploy` com passo a passo
- Docker compose warning: `version` field obsoleto (cosmético, ignorar)