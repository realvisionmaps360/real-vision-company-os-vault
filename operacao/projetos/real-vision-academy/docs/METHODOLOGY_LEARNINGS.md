---
id: METHODOLOGY_LEARNINGS
title: Aprendizados da Metodologia — Real Vision Academy
type: methodology
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-19
---

# Aprendizados da Metodologia

> A Academy é o **primeiro projeto de validação** da metodologia Master Visionair (docs viva no
> Obsidian + fluxo planejar→documentar→aprovar→implementar). Registrar aqui apenas aprendizados
> **concretos e observáveis** sobre a própria metodologia — não é diário do projeto (isso é
> [[TIMELINE]]). Objetivo: decidir o que replicar em projetos futuros da Real Vision.

## O que avaliar continuamente
- Velocidade para recuperar contexto no início de uma sessão.
- Facilidade para localizar informação.
- Redução de decisões contraditórias e de retrabalho.
- Clareza para começar uma nova sessão / outra IA assumir o projeto.
- Consistência entre documentação e implementação.
- Custo de manter a própria documentação (vale o esforço?).

## Aprendizados registrados

### 2026-07-17 — Fase 2 executada a frio, sem histórico de chat
- **`CONTEXT.md` como porta de entrada única: validado.** Sessão nova (Fable 5, zero histórico de
  chat) leu só `CONTEXT.md` → `ARCHITECTURE.md` §3/§7 → `ROADMAP.md` Fase 2 → `DECISIONS.md`, e
  reconstruiu contexto suficiente para executar a fase inteira (schema + RLS + painel admin) sem
  perguntar nada que já estivesse documentado. Confirma a aposta do setup inicial.
- **Credencial operacional em `TEMP/ggg.txt` é frágil entre sessões.** A "Nota operacional" do
  `CONTEXT.md` apontava pro arquivo, mas ele já tinha sido limpo quando a sessão seguinte precisou —
  Felipe teve que recolar o PAT. Funciona, mas depende de lembrete manual toda vez. Considerar: manter
  o PAT lá até o fim do projeto (risco baixo, é só Management API) em vez de "limpar após uso", ou
  documentar de forma que sobreviva a limpezas.
- **Hook estreito virando compartilhado espalha bugs adormecidos.** `useIsAdmin` foi criado só para a
  página `/academy/admin` com `.single()` (lança erro se não achar perfil). Quando uma tarefa
  *seguinte* (login no header) reusou o mesmo hook globalmente, o erro (406 pra usuário sem linha em
  `profiles`) passou a aparecer em toda página — sintoma só ficou visível ao ampliar o raio de uso, não
  na criação original. Lição pra Fase 3 (que vai criar `useEnrollment`/`useProgress` também
  compartilhados): tratar ausência de linha como caso normal (`.maybeSingle()`) desde a criação do
  hook, não só quando o bug aparecer.

### 2026-07-19 — Passo 6: diálogo nativo do navegador trava automação, teste manual do Felipe achou bug real
- **`confirm()` nativo do navegador bloqueia clique automatizado no Browser pane.** Ao testar exclusão
  de item no `LibraryManager.tsx` (usa `confirm()` do browser, mesmo padrão de `CourseEditor.tsx`), o
  clique automatizado no botão "Excluir" não conseguia sozinho fechar o diálogo de confirmação nativo
  — Felipe, acompanhando a mesma aba ao vivo, precisou confirmar manualmente duas vezes. Lição pra
  próximas verificações com CRUD que usa `confirm()`/`prompt()` nativo: avisar o Felipe antes de clicar
  em qualquer ação destrutiva no preview, porque a automação não fecha esses diálogos sozinha.
- **Teste manual do Felipe (não automação) achou o bug real (KI-22).** A verificação automatizada
  cobriu CRUD do admin e o caso "com membership ativa" — mas só pegou o caso "grátis vê truncado"
  quando o próprio Felipe testou manualmente com uma conta separada, porque criar uma conta descartável
  via signup automatizado esbarrou em validação de e-mail (domínios falsos tipo `@example.com` ou
  domínios inventados são rejeitados pelo Supabase) e rate limit de confirmação. Lição: quando a
  automação não consegue simular um segundo usuário real (signup + confirmação de e-mail), pedir pro
  Felipe testar manualmente com passo a passo explícito é mais rápido e mais confiável do que insistir
  em contornar a automação — e ele encontrou um bug de cache (queryKey sem `user.id`) que a automação
  sozinha, testando com uma conta só, não teria exposto.
- **Escopo mudou no meio do planejamento, plano em arquivo absorveu a mudança sem retrabalho.** O plano
  original do passo 6 (uma tabela `prompts`, cadastro manual via SQL) virou duas tabelas + admin CRUD
  depois que Felipe revisou e pediu mais (Prompts + Skills, campo `description`, tela de admin). Como o
  plano vivia num arquivo (`plans/*.md`, mecanismo do harness) e não só na cabeça, reescrever a seção
  antes de codar foi rápido e o plano final ficou coerente — nenhuma parte do código foi escrita antes
  da aprovação da versão final.

### 2026-07-18 — Fase 3: seed de teste descartável revelou um falso alarme e validou D-006/D-010
- **"Verificar antes de criar" (padrão da Fase 2) se pagou de novo:** `lesson_progress` já existia
  no banco desde a Fase 2 — checar salvou de recriar/duplicar RLS.
- **Consulta dentro da mesma transação/CTE pode mentir sobre efeito de trigger.** Ao testar o KI-11
  com um seed de aluno via múltiplas CTEs encadeadas, o `SELECT` final (mesma query) leu `NULL` pro
  perfil que o trigger deveria ter criado — parecia bug. Uma consulta **separada**, rodada depois,
  confirmou o perfil certinho. Lição: nunca confiar num `SELECT` de verificação que roda dentro do
  mesmo `INSERT` que dispara o trigger — sempre validar em uma query à parte.
- **Ponytail se pagou na prática (D-010):** o plano previa uma função serverless
  (`api/material-sign.ts`) pra assinar materiais; na hora de implementar, ficou claro que a policy
  de RLS do Storage + `createSignedUrl` no client resolvia igual, sem servidor nem segredo extra.
  Escada "recurso nativo da plataforma > código próprio" funcionou puxando pra trás um item já
  planejado.

### 2026-07-17 — Setup inicial
- **Frontmatter + backlinks desde o dia 1:** criar a teia de `[[ ]]` junto com os docs (não depois)
  custou pouco e já deixou o `PROJECT_INDEX` navegável. A validar: se isso realmente acelera a
  próxima sessão.
- **`CONTEXT.md` como porta de entrada única:** aposta central da metodologia. Medir nas próximas
  sessões se ler só o CONTEXT basta para retomar sem reler tudo.
- **Obsidian CLI instalado mas exige app aberto:** na prática, a edição direta dos `.md` foi mais
  confiável para *criar* a fundação. A validar se o CLI agrega em *navegação/busca* nas próximas fases.
- **Overhead a vigiar:** 12 documentos é muito para um projeto que ainda não tem código. Observar se
  algum vira burocracia (candidatos a fundir: CHANGELOG × TIMELINE cedo demais). Propor melhoria
  antes de mudar a metodologia (regra do adendo §11).
