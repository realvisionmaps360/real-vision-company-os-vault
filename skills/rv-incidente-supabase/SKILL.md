---
name: rv-incidente-supabase
description: Runbook de diagnóstico para incidentes de outage ou instabilidade em qualquer projeto Supabase da Real Vision (VisionFlow ou outro). Use IMEDIATAMENTE quando um app/CRM/site não carrega dados, aparece erro 522/521/523/524/502/503/504 no console, login trava ou fica em loop, ou há qualquer suspeita de instabilidade do backend Supabase -- ANTES de mexer em código ou desconfiar de bug de aplicação. Cobre checagem de billing/cota, status.supabase.com, logs via MCP Supabase, e uma tabela de decisão por código de erro (402 = cota estourada, 522/521/523/524 = timeout ou compute travado, 500/502/503 = erro de servidor, 401/403 = negação real de acesso). Ativar ANTES da skill supabase-postgres quando o sintoma for "está fora do ar" em vez de "preciso desenhar o schema".
---

# RV Incidente Supabase — Runbook de Diagnóstico de Outage

Runbook operacional para quando um projeto Supabase da Real Vision (VisionFlow ou qualquer outro) para de responder, fica lento demais, ou apresenta erros de conexão. Objetivo: descobrir SE é infraestrutura/cota antes de caçar bug no código — e, se for código, apontar que tipo de código (amplificador de outage vs. bug de lógica de fato).

Ver também: `supabase-postgres` (seção "Autenticação, Sessão e Resiliência de Rede" — como o código não deve amplificar um outage) e a skill do projeto específico (ex: `visionflow`) para contexto de schema e stack.

---

## Quando usar

- Console mostra erro 522, 521, 523, 524, 502, 503 ou 504 ao falar com `*.supabase.co`
- App trava no loading, ou entra em ciclo de login/logout
- Página/CRM que funcionava parou de carregar dados sem deploy recente correspondente
- Felipe reporta "não abre", "tela branca", "não consigo entrar", "sumiu tudo"

## Passo 1 — Descartar causa de código primeiro

```bash
git log --oneline -10
```

Sem deploy/mudança recente correlacionada ao horário do sintoma → sinal aponta para causa externa (Supabase, DNS, Vercel). Seguir para o Passo 2.

## Passo 2 — Checar billing e cota (MCP Supabase)

Via MCP Supabase conectado (nomes de ferramenta variam por ambiente: `get_organization`, `get_project`, `get_cost`):

- Qual plano? Free tem cotas apertadas de egress (5GB) e compute "Micro" (pequeno, sem burst garantido)
- Uso atual vs. cota — estourar egress repetidamente coloca o compute sob pressão real mesmo antes do bloqueio (402), já durante o *grace period*
- Checar o gráfico de "Egress por dia" (Dashboard → Usage): um pico concentrado em dias específicos aponta para uso/deploy pontual, não para o sintoma atual necessariamente — não presumir que o problema de agora é a causa do estouro do mês

## Passo 3 — Checar status.supabase.com

Buscar incidentes ativos/recentes na região do projeto, sobrepondo a janela do sintoma. Um incidente de plataforma não elimina a ação local, mas muda o diagnóstico: "parte é a Supabase, parte é nosso código."

## Passo 4 — Logs e advisors via MCP

- `get_logs` — filtrar por categoria (`auth`, `postgres`, `api`) conforme o sintoma
- `get_advisors` — a própria Supabase já sinaliza boa parte dos problemas de segurança/performance

## Tabela de decisão por código de erro

| Código | Onde aparece | Significado | Ação |
|---|---|---|---|
| **522** | Cloudflare, na frente de domínio custom (`*.realvisionmaps.com`) | "Connection timed out" — Cloudflare não completou a conexão com a origem (Supabase) dentro do timeout dela | Passo 2 (cota/compute) + Passo 3 (status page). Compute Micro sob pressão → **Restart project é gratuito** (Settings → General → Project availability) e costuma resolver um compute travado sem precisar pagar upgrade |
| **521/523/524** | Cloudflare | Variações de falha de conexão com a origem | Mesmo tratamento do 522 |
| **502/503/504** | Direto do Supabase, ou proxy | Erro de gateway/servidor — classificado como *retryable* pelo próprio SDK | Mesma investigação do 522 |
| **402** | Resposta da API Supabase | Cota excedida, fora do grace period | Confirmar plano/billing. Reduzir uso (ver egress por dia, evitar `select *`) é o caminho gratuito antes de considerar upgrade |
| **429** | Resposta da API Supabase | Rate limit | Ver volume de chamadas; não deve virar `signOut()` no app |
| **401/403 com corpo JSON de erro real** (não HTML) | Resposta da aplicação (RLS, policy, RPC) | Negação de acesso REAL — não é outage | Investigar RLS/policy/RPC. Ver `supabase-postgres` |
| **"Multiple GoTrueClient instances"** no console | Warning do SDK | Mais de um `createClient()` rodando na mesma aba | Ver padrão singleton em `supabase-postgres` |

## Regra de ouro para qualquer código de app

Nunca tratar `status === 0`, `>= 500`, `402` ou `429` como "usuário não autorizado" ou "sessão inválida". Esses códigos dizem "a infraestrutura não respondeu", não "a resposta foi não". Ver a seção de circuit breaker em `supabase-postgres/SKILL.md`.

## Resolver sem pagar upgrade (caminho padrão antes de considerar plano pago)

1. **Restart project** (Settings → General) — gratuito em qualquer plano, reinicia o compute do zero, resolve a maioria dos casos de compute travado/522 persistente.
2. **Reduzir egress** — checar "Egress por dia" no Usage para achar o pico; evitar `select('*')` em queries de alto volume; considerar cache/staleTime maior em React Query para dados que não mudam a cada segundo.
3. Só considerar upgrade de plano se os dois passos acima não resolverem e o uso real e sustentado justificar.

## Depois de resolver

Registrar o incidente em `docs/INCIDENTS.md` do projeto afetado (criar o arquivo se ainda não existir, seguindo o padrão de `docs/TIMELINE.md`): data, sintoma, causa raiz, ação tomada, e se algo neste runbook precisa de ajuste para a próxima vez.
