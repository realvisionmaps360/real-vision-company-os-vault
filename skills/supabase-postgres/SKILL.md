---
name: supabase-postgres-best-practices
description: Diretrizes e boas práticas para estruturação, performance e segurança no PostgreSQL e Supabase.
---

# 🗄️ Supabase & PostgreSQL Best Practices

Este playbook reúne as boas práticas essenciais para garantir que os bancos de dados criados com PostgreSQL e gerenciados via Supabase sejam seguros, performáticos e escaláveis.

---

## 1. Segurança e RLS (Row Level Security)

* **Habilitar RLS:** Sempre habilite o Row Level Security em todas as tabelas de produção para evitar vazamento de dados:
  ```sql
  alter table public.sua_tabela enable row level security;
  ```
* **Políticas Restritivas:** Escreva políticas explícitas de acesso para os diferentes papéis (`authenticated`, `anon`, ou funções de proprietários de conta).
* **Nunca use Bypass nas Apps:** A chave de serviço (`service_role` key) possui permissões de administrador (ignora o RLS). Use-a apenas em scripts backend seguros (Edge Functions) e nunca a exponha no frontend. No client do frontend, use sempre a `anon` key combinada com RLS.

---

## 2. Modelagem e Chaves

* **UUIDs como Chave Primária:** Use UUIDs gerados automaticamente como chaves primárias para IDs de registros:
  ```sql
  id uuid primary key default gen_random_uuid()
  ```
* **Relações e Chaves Estrangeiras:** Defina integridade referencial com ações explícitas (ex: `on delete cascade` ou `on delete set null`).
* **Tipos de Data e Hora:** Sempre use `timestamptz` (timestamp with time zone) para campos de auditoria (`created_at`, `updated_at`).

---

## 3. Performance e Índices

* **Índices em Chaves Estrangeiras:** Crie índices em todas as colunas que servem de chave estrangeira (`foreign keys`) e em colunas usadas frequentemente em filtros de consultas (`where` e `order by`):
  ```sql
  create index idx_sua_tabela_usuario_id on public.sua_tabela(usuario_id);
  ```
* **Consultas Eficientes:** Evite `select *` em produção. Recupere apenas as colunas necessárias para reduzir o overhead de rede e processamento.
* **Paginação:** Utilize paginação baseada em cursor para tabelas grandes, em vez de `offset` simples, para manter a consistência da busca em tempo real.

---

## 4. Autenticação, Sessão e Resiliência de Rede

* **Client em singleton, sempre.** Um único `createClient()` por app, exportado de um único módulo (ex: `src/integrations/supabase/client.ts`) e importado em todo o resto do código. Nunca chamar `createClient()` de novo em outro arquivo — isso é a causa mais comum do warning "Multiple GoTrueClient instances detected", que gera comportamento de auth imprevisível.
* **O auto-refresh do SDK tenta para sempre, por padrão — isso é esperado, não um bug.** O `@supabase/auth-js` roda um ticker interno a cada 30s (`AUTO_REFRESH_TICK_DURATION_MS`) e, por design, reitenta indefinidamente um refresh de token que falhar por erro classificado como *retryable* (rede, timeout, 5xx). Não desabilitar `autoRefreshToken` para "resolver" isso — o problema nunca é o SDK tentar de novo, é o CÓDIGO DO APP reagir mal a cada tentativa que falha.
* **Nunca trate erro de rede/timeout/5xx como "não autorizado".** Qualquer checagem de permissão via RPC ou query (ex: `is_allowed_user()`, `can_access_client()`) precisa distinguir:
  - **Negação real:** a requisição chegou ao backend e ele respondeu "não" (`status` 200 com `data === false`, ou um erro de aplicação reconhecível).
  - **Erro transiente/de infraestrutura:** a requisição não completou (`status === 0`, fetch falhou) ou o servidor/gateway falhou (`status >= 500`, cota estourada `402`, rate limit `429`). Isso é AUSÊNCIA de resposta, não uma resposta negativa — trate como "não sei", nunca como "não".
  - O jeito mais robusto de checar isso numa chamada `supabase.rpc()`/`.from()` é olhar o `status` que a própria resposta já traz (`const { data, error, status } = await supabase.rpc(...)`), sem precisar adivinhar pelo texto da mensagem.
  - Para chamadas diretas de `supabase.auth.*` (não RPC/query), o SDK expõe `isAuthRetryableFetchError(error)` / `AuthRetryableFetchError` (via `@supabase/supabase-js`) — confirme que a classe existe na versão instalada (`node_modules\@supabase\auth-js`) antes de depender dela, pode mudar entre versões.
* **Todo gate de autenticação precisa do próprio circuit breaker.** Se uma checagem de acesso falhar de forma transiente repetidas vezes seguidas numa janela curta, pare de tentar imediatamente e mostre um estado de "sem conexão" — não deixe o SDK insistir a cada ~30s enquanto o app também insiste em deslogar a cada tentativa. Sem isso, uma instabilidade pontual do backend vira uma avalanche (logout força reautenticação → reautenticação gera nova checagem → checagem falha de novo) bem na hora em que o backend já está sob pressão.
* **Suspeita de outage/instabilidade?** Ver skill `rv-incidente-supabase` — runbook de billing/cota, status.supabase.com, logs, e tabela de decisão por código de erro.
