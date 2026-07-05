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
