# HANDOFF-HERMES — OpenReply no VPS

> Criado em 01/08/2026 · Sessão interrompida para Felipe testar webhook na Meta
> Próxima sessão: retomar daqui

---

## Estado atual dos containers

| Container | Status | Observação |
|-----------|--------|------------|
| `openreply-postgres-1` | ✅ Up (healthy) | Postgres 16, banco `openreply` criado |
| `openreply-redis-1` | ✅ Up (healthy) | Redis 7, BullMQ configurado |
| `openreply-worker-1` | ✅ Up | **DM Worker started** — mas quebra ao conectar no banco |
| `openreply-app-1` | ❌ Restarting loop | Entrypoint não consegue rodar migração |

## Problemas identificados (2)

### 1. App: entrypoint com `sh: prisma: not found`

**Causa raiz:** o `npx prisma` não acha o binário do Prisma CLI no container. Precisa usar caminho direto:
```
node /app/node_modules/prisma/build/index.js migrate deploy
```

**Status:** o script `scripts/docker-entrypoint.sh` **já foi corrigido** localmente no workspace com o caminho direto, mas a imagem Docker ainda não foi reconstruída — o build foi interrompido no meio (Ctrl+C).

**Próximo passo:** rodar `docker compose build app` e depois `docker compose up -d` para aplicar a correção.

### 2. Worker e App: "Invalid URL" na conexão com Postgres

**Causa raiz:** a senha do Postgres `2hOQh80c7fD/DK5+2oyNTA==` contém caracteres especiais (`+`, `/`) que precisam ser percent-encoded na URL de conexão.

**DATABASE_URL atual (quebrada):**
```
postgresql://openreply:2hOQh80c7fD/DK5+2oyNTA==@postgres:5432/openreply
```

**DATABASE_URL corrigida:**
```
postgresql://openreply:2hOQh80c7fD%2FDK5%2B2oyNTA%3D%3D@postgres:5432/openreply
```
(ou alternativamente: gerar nova senha sem caracteres especiais via `openssl rand -base64 16 | tr '+/' '_-'`)

**Próximo passo:** atualizar `DB_PASSWORD` e `DATABASE_URL` no `.env` do VPS antes do próximo build.

## O que já funciona

- ✅ DNS: `ig-automacao.realvisionmaps.com` → A → 187.77.36.202
- ✅ Traefik: labels configuradas no `docker-compose.yml` para rotear o subdomínio com HTTPS automático
- ✅ Postgres + Redis: rodando e saudáveis
- ✅ Worker started: `[DM Worker] Started` nos logs
- ✅ Resend: conta criada, chave inserida, domínio `realvisionmaps.com` verificado
- ✅ App Meta: `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `FACEBOOK_APP_SECRET` configurados no `.env`
- ✅ `.env` completo com todos os segredos (NUNCA commitar — valores salvos no arquivo do VPS)

## O que NÃO testei ainda

- ❌ `https://ig-automacao.realvisionmaps.com` retorna HTTP 000 (esperado: app em restart loop)
- ❌ `/api/health` não responde
- ❌ Webhook da Meta não foi registrado (redirect OAuth + callback URL + publicação Live)

## Checklist próxima sessão

1. Reconstruir imagens: `docker compose build --parallel`
2. Subir containers: `docker compose up -d`
3. Verificar: `curl https://ig-automacao.realvisionmaps.com/api/health`
4. Se health retornar OK → Felipe pode configurar webhook e redirect OAuth no app Meta
5. Se continuar quebrando → ajustar DATABASE_URL (percent-encoding ou senha nova)

## Arquivos relevantes

- `/opt/openreply/Dockerfile` — app image (multi-stage, standalone Next.js)
- `/opt/openreply/Dockerfile.worker` — worker image (tsx runtime)
- `/opt/openreply/docker-compose.yml` — Traefik labels + 4 serviços
- `/opt/openreply/.env` — variáveis de ambiente (com segredos, sem placeholder)
- `/opt/openreply/scripts/docker-entrypoint.sh` — entrypoint do app (migration + server start)