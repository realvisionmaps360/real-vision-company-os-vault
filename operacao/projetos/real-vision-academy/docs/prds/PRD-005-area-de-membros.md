---
id: PRD-005
title: PRD — Área de Membros (entrada + resumo + perfil)
type: prd
status: draft
project: real-vision-academy
phase: 5
owner: master-visionair
created: 2026-07-18
updated: 2026-07-18
depends_on:
  - ARCHITECTURE
  - PRD-002-modelo-de-dados
related:
  - DECISIONS
  - ROADMAP
  - KNOWN_ISSUES
---

# PRD-005 — Área de Membros (entrada + resumo + perfil)

> Plano aguardando aprovação do Felipe (2026-07-18). Nasceu de um bug relatado: aluno loga e não é
> levado a lugar nenhum. Investigação mostrou que `/academy` (`MyCourses.tsx`) já existe e já tem
> progresso por curso + certificado — só falta porta de entrada e alguns complementos.

## O que já existe (não duplicar)

| Peça | Onde | Status |
|---|---|---|
| Grid "Meus Cursos" | `src/pages/academy/MyCourses.tsx`, rota `/academy` | ✅ Fase 3 |
| Progresso por curso (X de Y aulas, %) | `CourseCard.tsx` via `useMyCourses.ts` | ✅ Fase 3 |
| Player + registro de progresso por aula | `CoursePage.tsx` | ✅ Fase 3 |
| Certificado (botão no card + página) | `CourseCard.tsx` + `/academy/certificado/:id` | ✅ Fase 5, D-012 |
| Comunidade | — | ❌ sem spec (D-009), fora deste PRD |

## Problema

1. **Bug (KI-21):** o menu do cabeçalho (`HomeNav.tsx`) não tem nenhum link para `/academy`. Só
   admin vê "Painel Admin". Aluno comum loga, o modal fecha, e não há caminho nenhum até a área de
   membros a partir do header — só digitando a URL direto.
2. **Lacuna de conteúdo:** `MyCourses.tsx` é só a lista de cursos. Não existe visão geral ("como
   estou indo no total"), nem lugar pra ver/editar dados básicos da conta.

## Escopo — Bloco A (correção do bug, sem decisão pendente)

- Adicionar item **"Meus Cursos"** no dropdown de conta do `HomeNav.tsx`, visível pra **qualquer**
  usuário logado (não só admin), apontando pra `/academy`. Replicar no menu mobile.
- Sem impacto em produção além de UI — pode entrar assim que aprovado, não depende de nova decisão.

## Escopo — Bloco B (evolução do `/academy`)

1. **Resumo agregado no topo de `MyCourses.tsx`:** total de cursos matriculados, % médio concluído,
   botão "Continuar de onde parei" → leva pra próxima aula não concluída do curso mais recente
   acessado.
   - **Decisão pendente:** critério de "mais recente" — por `lesson_progress.updated_at` mais
     recente (precisa existir esse campo) ou por `enrollments.created_at`? A verificar no schema
     antes de codar.
2. **Perfil básico da conta:** ver nome/e-mail, trocar senha. Pode ser seção dentro de `MyCourses.tsx`
   ou rota nova `/academy/perfil`.
   - **Decisão pendente:** troca de senha via fluxo nativo do Supabase (`updateUser`, sem UI extra
     além de um form) ou só link "esqueci a senha" que já existe no `AuthModal`? Recomendo o nativo
     — é recurso já disponível no SDK, sem tabela nova.
3. **Comunidade:** confirmado fora de escopo aqui (D-009). Só entra com PRD próprio depois de spec.

## Fora de escopo

- Certificado (já resolvido, D-012).
- Progresso por curso/aula (já existe, Fase 3).
- Comunidade (D-009, sem spec).
- Qualquer mudança de banco além do necessário pro item 1 do Bloco B (a confirmar se precisa).

## Sequência de implementação sugerida

1. Bloco A (bug) — aplicar direto, é reuso de link, zero decisão pendente.
2. Registrar KI-21 resolvido após o deploy.
3. Bloco B, item 2 (perfil) — mais simples, decisão já recomendada acima, só falta confirmação.
4. Bloco B, item 1 (resumo agregado) — checar schema (`lesson_progress.updated_at` existe?) antes de
   fechar o critério de "continuar de onde parei".

## Documentos relacionados
- [[ARCHITECTURE]]
- [[ROADMAP]]
- [[KNOWN_ISSUES]] — KI-21
- [[DECISIONS]] — D-009, D-012
