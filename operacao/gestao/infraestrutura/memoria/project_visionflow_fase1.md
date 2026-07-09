---
name: project-visionflow-fase1
description: VisionFlow Fase 1 concluída em 15/06/2026 — features entregues e estado atual do frontend e banco
metadata:
  node_type: memory
  type: project
  originSessionId: 86215b5e-60d3-47bf-bb2e-4d674424aadf
---

Fase 1 do VisionFlow concluída em 15/06/2026. Toda a implementação foi **apenas frontend** — o banco já estava no estado-alvo antes de começarmos (as tabelas novas existiam desde a migração).

## Features entregues (commits no branch main)

| Feature | Arquivos principais |
|---|---|
| Campo email na ficha do cliente (ver + editar) | `ClientInfo.tsx`, `crmStore.ts`, `crm.ts` |
| Aba Serviços — pacotes de serviço por cliente | `ClientServices.tsx` (novo), `useCrmData.ts` |
| Aba Diário — feed cronológico unificado + nova entrada | `ClientDiario.tsx` (novo), `useCrmData.ts` |
| Tarefas: renomear + descrição + hora + tarefa interna | `Reminders.tsx`, `ClientNotificacoes.tsx`, `Header.tsx`, `BottomNav.tsx` |
| Calendário: visão mês + agenda + recorrentes | `Calendario.tsx` (novo), `App.tsx`, `BottomNav.tsx` |
| Busca inclui email | `Search.tsx` |

## Estado atual do banco (Supabase ghwjetvazmdlaqidgxqi)

Tabelas ativas: `clients` (com `email`), `activities`, `tasks`, `client_services`, `deliveries`, `files`, `finances`, `client_checklist`, `user_roles`, `client_assignments`, `allowed_emails`, `audit_logs`.

Sem tabelas legadas — `notes` e `timeline_events` nunca foram criadas no banco novo. O diário (`activities`) tem 286 entradas (273 sistema + 13 observações pinadas).

## Abas da ficha do cliente (ordem atual)

Informações → Checklist → Serviços → Diário → Timeline → Entregas → Arquivos → Financeiro → Tarefas

## Navegação mobile (BottomNav — 5 itens)

Pipeline → Tarefas → Calendário → Buscar → Perfil

## Feature IA Insights (entregue 16/06/2026)

Felipe escreve texto livre nas Observações → clica "Analisar com IA" → IA gera cards de proposta → Felipe aprova/recusa cada um → só o aprovado grava no CRM.

**Arquivos novos:** `src/hooks/usePendingUpdates.ts`, `src/components/client/ClientInsights.tsx`, `supabase/functions/analyze-notes/index.ts`  
**Tabela nova:** `client_pending_updates` (fila de propostas; RLS via can_access_client)  
**Edge Function:** `analyze-notes` (ACTIVE, ID e6db7ecd-40ce-4198-acad-bb6e6b6bb515)  
**Secret:** `ANTHROPIC_API_KEY` adicionado ao Supabase por Felipe em 16/06/2026  
**Modelo:** `claude-haiku-4-5` (constante MODEL no topo do index.ts — trocar por claude-opus-4-8 se precisar de mais qualidade)  
**Documentação completa:** `docs/FEATURE-IA-INSIGHTS.md`

## Próximas fases planejadas

- **Segurança (RLS)**: reativar políticas por usuário (admin/colaborador/tarefa interna) — estava desligada para facilitar migração
- **Calendário Fase 2**: integração com Google Calendar (tabela `task_calendar_sync` já planejada na arquitetura)

**Why:** registrar o estado exato pós-Fase 1 + IA Insights para que sessões futuras saibam o que existe e não recriem o que já foi feito.

**How to apply:** ao retomar o VisionFlow, assumir que estas features existem e estão funcionando. [[project-visionflow-migracao]]
