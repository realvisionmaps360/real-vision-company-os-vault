---
id: METHODOLOGY_LEARNINGS
title: Aprendizados da Metodologia — Real Vision Academy
type: methodology
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
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
