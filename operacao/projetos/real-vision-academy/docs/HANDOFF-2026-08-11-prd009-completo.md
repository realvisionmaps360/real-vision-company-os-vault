---
id: HANDOFF-2026-08-11-prd009-completo
title: Handoff — PRD-009 completo (rotas, tela da aula, trilha), publicado, aguardando teste do Felipe
type: handoff
project: real-vision-academy
created: 2026-08-11
updated: 2026-08-11
status: pronto para a próxima sessão
related:
  - PRD-009-trilha-gamificada
  - PRD-008-leitor-narrado-design
  - DECISIONS
  - TIMELINE
  - HANDOFF-2026-08-10-prd009
---

# Handoff — PRD-009 fechado, falta o teste real do Felipe

> Continuação de [[HANDOFF-2026-08-10-prd009]]. Aquele handoff deixava o PRD-009 especificado e pronto
> pra começar. **Nesta sessão os 4 blocos foram codados e publicados.**

## Onde estamos, em três linhas

O [[PRD-009-trilha-gamificada]] está **codado e publicado em `main`, código pronto** — trilha por módulo
em vez do grid antigo, tela própria por aula, leitor migrado pra `/ler`. Testado com a conta real de aluno
(dados reais, sem mock) e zero erros de console. **Falta só o Felipe confirmar em aparelho real** — a
Vercel deste projeto bloqueia verificação automatizada headless partindo deste ambiente (achado antigo,
reconfirmado, ver seção própria abaixo).

## O que aconteceu nesta sessão

1. **Bloco 1 — Rotas.** Leitor em tela cheia migrou de `/academy/curso/:slug/aula/:lessonId` pra
   `.../ler`. Rota antiga virou stopgap (aponta pro leitor também) até o Bloco 2 construir a tela real.
   5 pontos de código corrigidos (as linhas do PRD tinham deslocado desde a Fase C do PRD-008, como o
   handoff anterior já avisava). Publicado em `599836a`.
2. **Bloco 2 — Tela da aula.** `LessonPage.tsx` nova — título, `MaterialsList` reusado, cartão de abrir
   aula narrada ou player de vídeo inline. `NarratedLessonCard` extraído pra componente compartilhado
   (antes só existia dentro da `CoursePage`).
3. **Bloco 3 — A trilha (D-040/D-041).** `CoursePage.tsx` reescrita: módulos em acordeão, bolinha
   numerada por aula, cor por estado (concluída = âmbar cheio + check, atual = anel âmbar, não concluída =
   apagada mas sempre clicável). `CourseSyllabus.tsx` removido, ficou órfão com a troca.
   Blocos 2 e 3 publicados juntos em `805103d`.
4. **Bloco 4 — Verificação.** Build limpo nos 3 blocos. Testado com o perfil Playwright salvo da conta
   real de aluno (`smarthomefg@gmail.com`, **não** a conta admin), curso Profissional 360, dados reais
   (40 aulas, progresso real). Caminho completo testado ponta a ponta: trilha → bolinha não concluída →
   tela da aula → botão → leitor em `/ler`. Print 390px revisado a olho (D-039). Zero erros de console em
   qualquer etapa.

Nenhuma decisão nova — D-040 a D-042 já estavam fechadas na sessão anterior, esta foi execução pura.

## Estado do repositório

| Item | Valor |
|---|---|
| Repo | `operacao/projetos/_RV-Internos/sites/real-vision-site` (canônico) |
| `main` publicado | `805103d` (em cima de `599836a`, Bloco 1) |
| Pendências não comitadas de antes | `docs/academy/README.md` e `docs/seo-internacional/STATUS.md` — não são minhas, não toquei |

**Já dei `git push origin main` nos dois commits.** O deploy no ar depende do gatilho automático da
Vercel (GitHub → Vercel já configurado neste projeto) — não precisa de nenhuma ação manual adicional.

## Armadilha confirmada de novo — Vercel bloqueia verificação automatizada

A mesma trava do handoff anterior: `curl` puro e Playwright headless partindo deste ambiente batem no
"Vercel Security Checkpoint" (HTTP 403). **Não tentei insistir** — testei tudo em `npm run dev` local
(servidor Vite, não a Vercel), que não tem essa proteção. Detalhe completo na skill `rv-academy`.

**Pra você testar agora:**
1. Abrir `https://[o domínio da Academy]/academy/curso/profissional-360` (ou qualquer curso) no celular.
2. Deve aparecer a **trilha** — módulos em acordeão, bolinhas numeradas, não mais o grid de 3 colunas
   antigo.
3. Clicar numa bolinha (mesmo não concluída — navegação é livre) → abre a **tela da aula**, com título,
   materiais em acordeão e o cartão/botão de abrir.
4. Se a aula for narrada: o botão abre o leitor de tela cheia igual já funcionava antes.

## Aprendizado desta sessão (registrado em memória, não repetir)

Usei o Browser pane nativo (`mcp__Claude_Browser__*`) pra testar as rotas dos Blocos 1 e 2, antes de
lembrar que existe regra permanente do Felipe (16/07/2026) de usar **exclusivamente Playwright MCP** pra
qualquer interação com navegador — inclusive verificação de build, não só navegação explícita pedida por
ele. Corrigi a partir do Bloco 3, usando scripts Playwright com o perfil de aluno já salvo
(`.playwright-rv-aluno`). Memória `feedback_browser_playwright_exclusivo.md` atualizada pra deixar isso
explícito: checar a regra ANTES de qualquer ação de navegador, não confiar em lembrar no meio da tarefa.

## O que fazer na próxima sessão

Depois que o Felipe confirmar o PRD-009 em aparelho real:

1. Fechar o PRD-009 de vez (atualizar `status` pra "aprovado" na tabela de blocos).
2. Retomar os Blocos pendentes do [[PRD-008-leitor-narrado-design]]: **5** (popup de seleção de texto),
   **6** (Media Session + PWA) e **7** (verificação final).

Se o Felipe reportar algum problema no teste, tratar como prioridade — não avançar pro PRD-008 antes.

## Documentos relacionados
- [[PRD-009-trilha-gamificada]] — status por bloco atualizado
- [[PRD-008-leitor-narrado-design]] — próximo passo, Blocos 5-7
- [[TIMELINE]] — entrada completa de 2026-08-11
- [[HANDOFF-2026-08-10-prd009]] — handoff anterior desta mesma sequência
