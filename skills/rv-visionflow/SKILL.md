# Skill: rv-visionflow

Guia operacional para qualquer sessão de trabalho no VisionFlow — o CRM interno da Real Vision.

---

## O que é o VisionFlow

CRM interno construído em React + Supabase. Repositório local em:
`C:\Users\Computador\Desktop\Real Vision\operacao\projetos\_RV-Internos\visionflow`

GitHub: `realvisionmaps360/visionflow-crm-48fe197a`
Deploy: Vercel, projeto `visionflow-crm` (owner: Felipe's projects) — URL: `https://visionflow.realvisionmaps.com`
Banco: Supabase project `ghwjetvazmdlaqidgxqi`

**⚠️ Deploy NÃO é automático por push (incidente 16/07/2026, ver `docs/INCIDENTS.md`).** O projeto no Vercel não tem integração Git conectada — `git push` sozinho não publica nada. Antes de dizer pro Felipe que "subiu", ou: (a) rode `npx vercel --prod` da pasta do repo (requer `npx vercel link --yes --project visionflow-crm --scope felipes-projects-26a2b9dd` uma vez), ou (b) confirme que a integração Git já foi conectada no painel (`npx vercel project inspect visionflow-crm` deve mostrar uma seção "Git").

---

## PRÉ-VOO OBRIGATÓRIO (toda sessão VisionFlow)

Execute ANTES de qualquer ação — código ou banco:

```
1. git status         → verificar se há arquivos modificados não commitados
2. git pull           → garantir que o código local está atualizado
3. Verificar MCP Supabase conectado (project_id: ghwjetvazmdlaqidgxqi)
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

**Push para `main` NÃO deploya sozinho** — o projeto Vercel não tem Git conectado (incidente 16/07/2026). Duas opções:

1. **Deploy manual (funciona hoje):** `npx vercel --prod` de dentro do repo. Primeira vez, linkar antes: `npx vercel link --yes --project visionflow-crm --scope felipes-projects-26a2b9dd`.
2. **Correção definitiva (fazer uma vez):** painel do Vercel → projeto `visionflow-crm` → Settings → Git → Connect Git Repository → `realvisionmaps360/visionflow-crm-48fe197a`, branch `main`. Depois disso, push volta a deployar sozinho de verdade.

Verificar status: `npx vercel ls visionflow-crm` (idade do deployment mais recente) ou https://vercel.com (projeto visionflow-crm).
