---
name: rv-visionflow
description: "Guia operacional para sessoes de trabalho no VisionFlow — CRM interno da Real Vision 360 (React + Supabase). Cobré schema do banco, regras de insercao JWT, deploy Vercel e sincronia codigo/banco. Use SEMPRE quando Felipe for trabalhar no VisionFlow: codigo, banco, deploy, correcao de bug ou nova feature."
---

# Skill: rv-visionflow

Guia operacional para qualquer sessão de trabalho no VisionFlow — o CRM interno da Real Vision 360.

---

## O que é o VisionFlow

CRM interno construído em React + Supabase. Repositório local em:
`C:\Users\Computador\Desktop\Real Vision\operacao\projetos\visionflow`

GitHub: `realvisionmaps360/visionflow-crm-48fe197a`
Deploy: Vercel (auto-deploy a cada push na branch `main`)
Banco: Supabase project `ghwjetvazmdlaqidgxqi`

---

## PRÉ-VOO OBRIGATÓRIO (toda sessão VisionFlow)

Execute ANTES de qualquer ação — código ou banco:

```
1. git status         → verificar se há arquivos modificados não commitados
2. git pull           → garantir que o código local está atualizado
3. Verificar MCP Supabase conectado (project_id: ghwjetvazmdlaqidgxqi)
4. Verificar migrations pendentes no Supabase
   → Migration commitada não é migration aplicada. Olhar `supabase/migrations/`
   e confirmar no Dashboard (SQL Editor) se as migrations mais recentes já
   rodaram. Se não, aplicar manualmente ou via `supabase db push`.
```

### Por que o git status é obrigatório?

**Incidente de 23/06/2026 — tela branca do Eduardo Barqueiro:**

Arquivos foram modificados localmente (`ClientInsights.tsx`, `usePendingUpdates.ts`) para suportar `client_services` como tipo de sugestão de IA, mas **nunca foram commitados**. A Vercel continuou servindo o código antigo.

Quando dados com `target_table = 'client_services'` foram inseridos no banco, a versão antiga do VisionFlow tentou renderizar e travou (`TypeError: Cannot read properties of undefined (reading 'icon')`). Resultado: tela branca na ficha do cliente.

**Regra derivada:** código e banco precisam estar em sincronia. Se há arquivos modificados não commitados e você vai inserir dados que dependem desses arquivos → commitar e fazer push PRIMEIRO.

---

## Regras de trabalho

- **Nunca inserir dados no banco que dependem de código não deployado**
- Antes de inserir dados via MCP Supabase: confirmar que o git está limpo (sem `M` no `git status`)
- Ao adicionar novo tipo a um `Record<TipoEnum, ...>` no código: commitar + push antes de usar esse tipo no banco
- Toda sessão com banco: MCP Supabase deve estar conectado

---

## Estrutura do banco (tabelas principais)

| Tabela | O que guarda |
|---|---|
| `clients` | Ficha do cliente (nome, empresa, status_pipeline...) |
| `activities` | Diário — entradas manuais (`source='manual'`) e de sistema (`source='sistema'`) |
| `tasks` | Tarefas/lembretes vinculados ao cliente |
| `client_files` | Links de arquivos (Google Drive, Vercel, etc.) |
| `client_services` | Serviços contratados pelo cliente |
| `finances` | Movimentações financeiras por cliente |
| `client_checklist` | Checklist de onboarding |
| `client_pending_updates` | Sugestões da IA aguardando aprovação (aba Insights) |

---

## Inserção manual via MCP Supabase

Ao inserir dados diretamente no banco (fora do app), sempre usar transação com JWT simulado para não quebrar triggers de auditoria:

```sql
BEGIN;
SET LOCAL request.jwt.claims = '{"sub":"<user-id>","email":"<email>"}';
INSERT INTO ... ;
COMMIT;
```

O `user_email` é obrigatório nos triggers. Sem o JWT simulado, o insert falha com `null value in column "user_email"`.

---

## Tipos de `activity_category` (tabela activities)

`communication` · `meeting` · `visit` · `internal` · `status_change` · `delivery` · `financial` · `system` · `other`

- `source = 'manual'` → aparece no Diário
- `source = 'sistema'` → aparece na Timeline

---

## Tipos de `recurrence` (tabela tasks)

`nenhuma` · `mensal` · `anual`

Usar exatamente esses valores. Qualquer outro valor quebra a renderização do card de tarefa (crash em `FREQ_META[n.frequencia].icon`).

---

## `client_pending_updates` — target_table válidos

`finances` · `tasks` · `clients` · `client_checklist` · `activities` · `client_services` · `files`

Inserir qualquer outro valor quebra a aba Insights (crash em `AREA_META[item.targetTable].icon`).

## PITFALL: Código commitado + migration não aplicada

A Vercel deploya automaticamente o código do frontend, mas **migrations do Supabase são manuais** (via Dashboard ou `supabase db push`). Um commit pode conter código que depende de colunas/tabelas que ainda não existem no banco.

**Incidente — 15/07/2026 — Arquivos (files table):**
Migration `20260715193000_add_created_by_updated_at_to_files.sql` foi commitada e pusheada, mas NUNCA aplicada no Supabase. Resultado:
- O código do frontend (`ClientArquivos.tsx`) tentava ler `created_by` e `created_at` → colunas não existiam → metadata de autor/data nunca aparecia
- O `addFile()` tentava inserir `created_by` → Supabase ignorava ou falhava silenciosamente
- A feature parecia quebrada mesmo com o código deployado

**Regra derivada:** Feature completa = código deployado + migration aplicada + teste no ambiente. Nunca assumir que migration foi aplicada só porque o commit existe.

## PITFALL: Naming collision em DROP POLICY (PostgreSQL 42710)

Migration SQLs que recriam policies (DROP + CREATE) podem falhar com erro 42710 se o nome da policy no DROP nao bater com o nome real no banco.

**Causa:** O banco pode ter policies nomeadas com ou sem prefixo Admin. Ex: `Insert files` vs `Admin insert files`. O Supabase gera nomes diferentes dependendo se a policy foi criada por migration anterior ou manualmente.

**Solucao:** Sempre dropar AMBAS as variacoes antes de recriar:
```sql
DROP POLICY IF EXISTS "Insert files" ON public.files;
DROP POLICY IF EXISTS "Admin insert files" ON public.files;
```

**Verificacao pre-migration:** `SELECT * FROM pg_policies WHERE tablename = 'files';`

## PITFALL: Ao adicionar nova área ao sistema de IA

Toda vez que uma nova área for adicionada ao `analyze-notes`, atualizar obrigatoriamente em 4 lugares:

1. **TypeScript** — `PendingTargetTable`, `AREA_TO_TABLE`, `ALLOWED_FIELDS`, `AREA_META`, `applyToTarget` (usePendingUpdates.ts + ClientInsights.tsx)
2. **Edge Function** — enum da TOOL, `AREA_TO_TABLE`, `ALLOWED_FIELDS`, `SYSTEM_PROMPT` (analyze-notes/index.ts)
3. **Banco** — CHECK constraint `client_pending_updates_target_table_check` via `apply_migration`
4. **Deploy** — `supabase functions deploy analyze-notes` + `git push origin main`

Esquecer o item 3 causa **Edge Function 400 silencioso**: o banco rejeita o INSERT, a função retorna 400, o app exibe "Erro ao analisar".

**Incidente:** 29/06/2026 — área `arquivo -> files` adicionada ao código mas constraint não atualizado.

---

## Deploy

Push para `main` → Vercel deploya automaticamente em ~1-2 minutos.
Verificar em: https://vercel.com (projeto visionflow-crm)