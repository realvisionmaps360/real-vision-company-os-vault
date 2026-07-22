---
name: visionflow
description: "CRM interno da Real Vision. Ativar em qualquer sessão de desenvolvimento do VisionFlow: correções de UI, novas features, banco de dados, mobile UX. Cobre stack, schema Supabase, padrões de componente, sistema de design e decisões já tomadas. Inclui feature IA Insights (analisar observações com Claude e gerar cards de aprovação)."
---

# VisionFlow — CRM Interno Real Vision

Guia completo para desenvolver o VisionFlow. Contém stack, estrutura, padrões mobile, sistema de design e histórico de decisões.

---

## 1. O que é o VisionFlow

CRM interno usado por Felipe e time da Real Vision para gerenciar o pipeline de clientes, registrar atividades, controlar tarefas, finanças e entregas. Acesso restrito — Google OAuth via Supabase.

**Usuários:** Felipe (admin) + colaboradoras (acesso limitado por cliente)  
**Deploy:** Vercel  
**Repo local:** `C:\Users\Computador\Desktop\Real Vision\operacao\projetos\_RV-Internos\visionflow`

---

## 2. Stack técnica

| Tecnologia | Versão | Papel |
|---|---|---|
| React | 18.3 | Framework |
| TypeScript | 5.8 | Tipagem |
| Vite | 5.4 | Build/dev (porta 8080) |
| Tailwind CSS | 3.4 | Estilos |
| shadcn/ui | — | Componentes (Radix UI base) |
| Supabase JS | 2.x | Backend + Auth |
| TanStack Query | 5.x | Cache de dados |
| React Router | 6.x | Roteamento (SPA) |
| Embla Carousel | 8.x | Carrosséis mobile |
| dnd-kit | 6.x | Drag & drop (Kanban desktop) |
| Lucide React | 0.462 | Ícones |
| Sonner | 1.7 | Toasts |
| next-themes | 0.3 | Dark/light mode |

---

## 3. Banco de dados Supabase

**Project ID:** `ghwjetvazmdlaqidgxqi`  
**Auth:** Google OAuth via Supabase Auth (`AuthContext.tsx`). ⚠️ `docs/AUTH_REACTIVATION_GUIDE.md` é da fase PRÉ-migração Lovable→Supabase (RLS desabilitado, tabelas antigas, `user_id` fictício) — não usar como referência do estado atual.

### Tabelas principais

| Tabela | Descrição |
|---|---|
| `clients` | Clientes no pipeline |
| `activities` | **Diário do cliente** (não existe tabela `diary_entries` — o Diário é a própria `activities`; Observações fixadas também moram aqui, ver [[project_visionflow_diario_observacoes]]) |
| `client_services` | Serviços contratados por cliente |
| `deliveries` | Entregas/links por cliente |
| `finances` | Pagamentos e valores |
| `tasks` | Tarefas/lembretes (vinculados a cliente ou internos; não é `reminders`) |
| `files` | Arquivos por cliente |
| `team_members` | Usuários do sistema (admin/collaborator) |
| `client_assignments` | Quais colaboradores acessam quais clientes (não é `client_access`) |
| `client_checklist` | Itens de checklist por cliente (não é `checklist_items`) |
| `client_pending_updates` | Fila de propostas da IA Insights (pending/applied/rejected) |

**RLS: status a CONFIRMAR com Felipe.** Esta skill dizia "RLS ativo em todas as tabelas", mas `docs/TIMELINE.md` lista "Fase 2B — Segurança (RLS)" como PENDENTE ("Prioridade: alta antes de qualquer acesso externo"). Não presumir nenhum dos dois lados até confirmar diretamente no projeto (`list_tables`/`get_advisors` via MCP Supabase) ou com o Felipe. Antes de qualquer migration, verificar o MCP Supabase conectado.

---

## 4. Estrutura de pastas

```
src/
  pages/           → 12 páginas (KanbanBoard, ClientDetail, Reminders, Calendario, Search, Profile, Admin...)
  components/
    mobile/        → BottomNav, MobileKanban, MoveClientSheet
    client/        → 9 componentes das abas (ClientInfo, ClientTimeline, ClientEntregas...)
    kanban/        → KanbanCard, KanbanColumn, AddClientDialog
    ui/            → 50+ componentes shadcn/ui
  hooks/           → useCrmData, useIsMobile, useTheme, useToast
  contexts/        → AuthContext (sessão, roles, canOpenClient)
  types/           → crm.ts (Client, KanbanColumn, Reminder, Finance...)
  store/           → crmStore (estado global com Supabase)
  lib/             → utils, phone, checklist, exportClient
```

---

## 5. Rotas do app

| Rota | Componente | Proteção |
|---|---|---|
| `/login` | Login | Pública |
| `/` | KanbanBoard | Admin/Collaborator |
| `/cliente/:id` | ClientDetail | Admin/Collaborator com acesso |
| `/lembretes` | Reminders | Admin/Collaborator |
| `/calendario` | Calendario | Admin/Collaborator |
| `/buscar` | Search | Admin/Collaborator |
| `/perfil` | Profile | Admin/Collaborator |
| `/arquivados` | Archived | Admin/Collaborator |
| `/admin` | Admin | Admin only |

---

## 6. Mobile — padrões e componentes

**Breakpoint mobile:** `768px` (hook `useIsMobile()` em `src/hooks/use-mobile.tsx`)

**Navegação:** `BottomNav` (`src/components/mobile/BottomNav.tsx`) — 5 abas fixas no rodapé, visível apenas em mobile (`md:hidden`)

**Pipeline:** `MobileKanban` (`src/components/mobile/MobileKanban.tsx`) — carrossel Embla com 6 colunas (Lead, Proposta, Recusado, Desenvolvimento, Entregue, Recorrente)

**Mover cliente:** `MoveClientSheet` — bottom sheet com lista de colunas destino

**Abas da ficha do cliente:** carrossel Embla com 9 painéis — swipe para trocar, scroll automático na aba ativa

**Safe areas iOS:**
- `pb-safe` → `padding-bottom: env(safe-area-inset-bottom)`
- `pb-nav` → padding que soma altura do BottomNav + safe area
- Inputs com `font-size: 16px` no mobile (previne zoom automático iOS)

---

## 7. Ordem das abas — ficha do cliente

**Arquivo:** `src/pages/ClientDetail.tsx` — array `TABS` + array `panels` (devem estar na mesma ordem)

**Ordem atual correta (confirmada em 16/06/2026):**
```
1. Informações   (info)
2. Tarefas       (notificacoes)  ← segundo mais usado, subiu da posição 9
3. Diário        (diario)
4. Timeline      (timeline)
5. Checklist     (checklist)
6. Financeiro    (financeiro)
7. Serviços      (servicos)
8. Entregas      (entregas)
9. Arquivos      (arquivos)
```

---

## 8. Sistema de design do CRM

### Cores CSS (definidas em `src/index.css`)
- `--primary: 221 83% 53%` — azul principal
- `--brand-gold: 36 90% 50%` — ouro (logo/destaque)
- `--background: 210 20% 98%` — fundo bege claro
- `--shadow-elegant` e `--shadow-card` — sombras customizadas

### Kanban — cores por coluna
```
lead        → blue-500
proposta    → amber-500
recusado    → slate-500
desenvolvimento → purple-500
entregue    → green-600
recorrente  → indigo-500
```

### Dark mode
Suportado via `next-themes` com `class` no `<html>`. Toggle em `useTheme()`.

---

## 9. Touch targets e legibilidade — regras obrigatórias

- **Touch target mínimo:** 44×44px (Apple HIG) — usar `h-11 w-11` no Tailwind
- **Texto mínimo mobile:** 12px (`text-xs`) — nunca abaixo de 11px
- **Texto ideal mobile:** 14px (`text-sm`) para labels e rótulos
- **Ícones mínimos:** 16px (`h-4 w-4`) — nunca `h-3 w-3` em mobile
- **Ícones ideais:** 20px (`h-5 w-5`) para ações primárias

### Anti-padrões identificados (a corrigir)
- `text-[9px]` → `text-xs` em badges
- `text-[10px]` → `text-xs` em contadores
- `text-[11px]` → `text-xs` em labels
- `h-3 w-3` → `h-4 w-4` em ícones de metadados
- `h-9 w-9` (36px) → `h-11 w-11` (44px) em botões de ação

---

## 10. Fluxo principal de uso (Felipe)

```
Login (Google) → Pipeline (Kanban) → Abrir cliente → Informações → Tarefas → Diário
                                                    ↘ Mover de etapa (bottom sheet)
Aba Lembretes (BottomNav) → ver tarefas do dia
Aba Calendário → ver agenda mensal
```

---

## 11. Decisões já tomadas

- **Backend:** Supabase próprio (não Firebase, não outro)
- **UI base:** shadcn/ui — não instalar bibliotecas alternativas de componentes
- **Carrossel:** Embla Carousel — não trocar por Swiper ou similar
- **Deploy:** Vercel — `npm run build` + push no GitHub trigger deploy automático
- **Lovable:** ABANDONADO — não mencionar, não sugerir
- **Ordem das abas:** confirmada em 16/06/2026 (ver seção 7)
- **Verificação visual:** Chrome DevTools → modo dispositivo → iPhone SE (375px) e iPhone 14 (390px)

### Vercel — deploy

```bash
# Na raiz do projeto
npm run build
vercel --prod
```

O `vercel.json` já existe com rewrite SPA (`/* → /index.html`).

### ⚠️ Pitfall: Edge Functions + pg_cron

- **Edge Functions criadas via Dashboard (colando código) podem não ter `SUPABASE_SERVICE_ROLE_KEY` injetada** como env var — diferente do `supabase functions deploy` via CLI. Se o código da função verifica auth manualmente (`Bearer SUPABASE_SERVICE_ROLE_KEY`), vai falhar com 401 mesmo com a key correta.
- **Solução A:** configurar a env var manualmente no Dashboard (Edge Functions → Settings → Secrets).
- **Solução B:** remover a verificação de auth do código e desligar `verify_jwt: false` na Edge Function — já que a função só roda via pg_cron interno, não precisa de auth dupla.
- **`verify_jwt` deve ser `false`** para funções chamadas via pg_cron/pg_net. O padrão é `true` ao criar pelo Dashboard. Desligar em Settings → Verify JWT.

### ⚠️ Bug conhecido: HTTP 404 tratado como "online"

**Causa:** `expected_status_max = 399` no schema (`20260720180000_create_monitored_sites.sql`). Qualquer código HTTP entre 200-399 é considerado OK, incluindo 404 (Not Found).

**Correção:** alterar o default para `expected_status_max = 299`. Só respostas 2xx devem ser consideradas online — 3xx são seguidas pelo `redirect: "follow"` no código, e 4xx/5xx são erros.

**SQL de correção (rodar no SQL Editor):**
```sql
ALTER TABLE public.monitored_sites
  ALTER COLUMN expected_status_max SET DEFAULT 299;
-- Atualizar sites existentes que ainda usam 399
UPDATE public.monitored_sites
  SET expected_status_max = 299
  WHERE expected_status_max = 399;
```

---

## 12. Feature: IA Insights (entregue 16/06/2026)

**Fluxo:** Felipe escreve texto livre nas Observações → clica "Analisar com IA" → IA gera cards de proposta → Felipe aprova ou recusa cada um → só o aprovado grava no CRM.

### Tabela nova
`client_pending_updates` — fila de propostas da IA. RLS via `can_access_client`. Status: `pending` / `applied` / `rejected`.

### Arquivos
| Arquivo | Papel |
|---|---|
| `supabase/functions/analyze-notes/index.ts` | Edge Function Deno — chama Anthropic, valida, grava em pending_updates |
| `src/hooks/usePendingUpdates.ts` | Hook — fetch, analyze, approve (aplica na tabela real), reject |
| `src/components/client/ClientInsights.tsx` | UI — cards editáveis com Aprovar/Recusar |
| `src/components/client/ClientInfo.tsx` | Inclui `<ClientInsights clienteId={...} notes={savedNotes} />` abaixo das Observações |

### Modelo
`claude-haiku-4-5` (constante `MODEL` no topo da edge function). Para mais qualidade: trocar por `claude-opus-4-8`.

### Secret necessário
`ANTHROPIC_API_KEY` no Supabase → Settings → Edge Functions → Secrets.

### A IA NUNCA escreve diretamente em finances/tasks/clients/client_checklist.
Só escreve em `client_pending_updates`. O app grava nas tabelas reais ao Aprovar.

### Áreas suportadas
`financeiro` → finances | `tarefa` → tasks | `dados_cliente` → clients | `checklist` → client_checklist

### Deploy da edge function
```bash
supabase functions deploy analyze-notes --project-ref ghwjetvazmdlaqidgxqi
```

---

## 13. PITFALL: como testar RLS de verdade (não só "criei a policy")

Criar a policy não prova que ela funciona. Testar de verdade exige simular um usuário autenticado SEM a role em questão, dentro de uma transação que não deixa rastro:

```sql
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-000000000000","role":"authenticated"}';
select count(*) from public.<tabela>;  -- deve ser 0 se a policy é admin-only
rollback;
```

Usado para validar `monitored_sites`/`uptime_checks`/`status_changes` no Plano 006 Fase 2 (20/07/2026) — confirmou 0 linhas visíveis a não-admin. Rodar sempre depois de `get_advisors(type: security)`, não no lugar dele — o advisor pega policy ausente/mal configurada, mas não prova que uma policy existente está fazendo o que deveria.

## 14. PITFALL: verificar dark mode manualmente no navegador engana

Duas pegadinhas descobertas testando o Plano 006 Fase 3 (tema âmbar/dark):

1. **`useTheme()` (`src/hooks/useTheme.ts`) só aplica a classe `.dark` quando `<Header />` está montado** — ou seja, só depois de logado. Alternar `document.documentElement.classList.add('dark')` manualmente via DevTools/JS na tela de login funciona para inspecionar CSS variables (`getComputedStyle(...).getPropertyValue('--x')`), mas não reflete o app real logado.
2. **HMR do Vite pode deixar `getComputedStyle()` de um elemento específico preso num valor antigo** mesmo com a variável CSS já atualizada na raiz — um teste com elemento recém-criado (`document.createElement`) sempre reflete o valor atual; um elemento que já existia na página antes da edição pode mentir. Se o computed style de um botão/elemento parecer "errado" depois de editar `index.css` em sessão com dev server já rodando, **reiniciar o servidor** (`preview_stop` + `preview_start`) antes de desconfiar do CSS.

Sem login real disponível (Google OAuth), a verificação ficou limitada a CSS computado + build limpo — não substitui uma conferência visual do Felipe logado.

Documentação completa: `visionflow/docs/FEATURE-IA-INSIGHTS.md`
