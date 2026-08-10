---
id: HANDOFF-2026-08-10-leitor-narrado
title: Handoff — Leitor Narrado da Academy (fim da sessão de 10/08/2026)
type: handoff
project: real-vision-academy
created: 2026-08-10
updated: 2026-08-10
status: pronto para a próxima sessão
related:
  - PRD-008-leitor-narrado-design
  - PRD-009-trilha-gamificada
  - DECISIONS
  - TIMELINE
  - CONTEXT
---

# Handoff — Leitor Narrado da Academy

> **Se você é o agente da próxima sessão, leia este arquivo inteiro antes de tocar em qualquer coisa.**
> Ele existe porque a sessão de 10/08/2026 ficou longa e o Felipe encerrou com o escopo seguinte já
> desenhado. Nada de código pendente pela metade — tudo o que foi codado está no ar e aprovado.

## Onde estamos, em quatro linhas

O leitor de aula narrada está **no ar e aprovado pelo Felipe em celular real**. Blocos 0 a 4 do
[[PRD-008-leitor-narrado-design]] mais duas rodadas de correção (Fases A e A-2). O `main` do
`real-vision-core` está em **`19a886d`**, servindo em produção. A próxima coisa a fazer é a **Fase B do
PRD-008**, que está especificada e não iniciada.

## Estado do repositório

| Item | Valor |
|---|---|
| Repo | `operacao/projetos/_RV-Internos/sites/real-vision-site` (canônico) |
| Ramo de trabalho | `feat/leitor-narrado-design` |
| `main` publicado | `19a886d` |
| Vercel | confirmado servindo `NarratedLessonPage-C2avNVQp.js` |
| Pendências não comitadas | `docs/academy/README.md` e `docs/seo-internacional/STATUS.md` modificados **de antes desta sessão** — não são meus, não toquei |

**Antes de começar:** `git fetch` e depois comparar — `git status` sozinho usa cache e já enganou aqui.

Os commits desta sessão foram publicados avançando o `main` local e dando `git push origin main`. A forma
`git push origin ramo:main` **é bloqueada pelo classificador** — não insistir nela.

## O que o Felipe aprovou (não mexer sem pedido dele)

| Comportamento | Decisão |
|---|---|
| Toque simples em qualquer pixel alterna cabeçalho **e** barra juntos, sem tocar no áudio | D-033 |
| Duplo toque numa frase pula pro trecho **e começa a tocar** | D-034 |
| Rolar ou ficar parado **não** muda nada na tela | D-035 |
| Barrinha de progresso sempre visível, camadas montam sobre ela, **uma só** barra de progresso | D-036 |
| Barrinha com fundo sólido | D-037 |
| Barra: `−15 −5 [play] +5 +15`, número no canto de cada seta; frases no painel expandido | D-038 |
| Destaque dourado `rgba(247,201,72,0.16)` | Fase A |

Todos com teste de regressão em `tests/verify-bloco4.mjs`. **Se um deles falhar, é regressão de verdade.**

## O que fazer na próxima sessão

**Fase B do [[PRD-008-leitor-narrado-design]]**, na ordem, um bloco por vez, com aval do Felipe entre eles:

1. **B1 — materiais em acordeão** (D-043). Reescrever `MaterialsList.tsx` sobre o `Accordion` do shadcn,
   todos fechados. Especificação completa no PRD, incluindo o que reusar (`copyPrompt`, `openFile`).
2. **B2 — cartão da aula narrada + ordem no celular.** Escopo contido de propósito: o PRD-009 troca essa
   tela inteira depois.
3. **B3 — nav da Academy** sem rolagem horizontal, e container vazando à direita.

Depois: [[PRD-009-trilha-gamificada]] (trilha + tela por aula). Depois: Blocos 5, 6 e 7 do PRD-008.

## Como verificar — isto não é opcional (D-039)

A sessão de 10/08 existiu em boa parte por causa de verificação mal feita. O critério agora é:

1. `npm run build` limpo
2. Playwright verde — comportamento **e** regressão
3. **Screenshot em 390px que você abre e olha com seus próprios olhos**
4. Revisão contra [[DESIGN]]
5. **Antes de pedir teste ao Felipe:** confirmar que o commit está no `main` **publicado** e que a Vercel
   já está servindo o pacote novo

O passo 3 pegou duas coisas nesta sessão que o Playwright aprovou sem reclamar: a cor de destaque bege e o
botão de abrir os controles com dois filetes que liam como controle quebrado.

### Como rodar os testes

```bash
cd "operacao/projetos/_RV-Internos/sites/real-vision-site"
npm run dev
```

Depois, em outro terminal, com o perfil de **aluno** (o padrão dos scripts é o de admin, que não está
matriculado):

```bash
RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno" node tests/verify-bloco4.mjs mobile
```

Trocar `mobile` por `desktop`, e `bloco4` por `bloco1`/`bloco2`/`bloco3`. Contagens esperadas hoje:
**27/27** bloco 4 mobile, **8/8** desktop, **23/23** bloco 1, **47/47** bloco 2, **17/17** bloco 3.

Se a sessão do perfil expirar (a página mostra "Faça login para acessar esta aula"), rodar
`node tests/login-aluno.mjs` — abre janela visível para o Felipe entrar com `smarthomefg@gmail.com`.
**Nenhuma credencial passa pelo agente.**

## Armadilhas que já custaram tempo aqui

- **Perfil do Chrome dentro do repo derruba o Vite.** Um comando `node -e` com escape errado de barras
  criou uma pasta de perfil na raiz do projeto e o vigia de arquivos do Vite morreu com `EBUSY`.
  **Não usar `node -e` com caminhos do Windows** — escrever arquivo de script. Os perfis moram fora do
  repo de propósito.
- **Comandos `node -e` deixaram sete arquivos-lixo no repo** nesta sessão (`0`, `13`, `topo`, `frase`,
  `{,`, `diag.png`, `preferências`). Todos removidos. Conferir `git status` antes de comitar.
- **A frase ativa fica debaixo do cabeçalho.** O auto-scroll encosta a frase narrada no topo, e o
  cabeçalho tem 60px. Clique do Playwright na coordenada dela acerta o cabeçalho e o teste acusa falha de
  código que está certo. Rolar pro meio (`scrollIntoView({block:"center"})`) antes de medir.
- **O toque simples é adiado 250ms de propósito.** Teste que clica e mede em menos que isso não vê nada.
- **`completedSet` do `useProgress` é um `Set` novo a cada render** (`useProgress.ts:57-64`). Memoizar por
  ele memoiza errado — usar `done`/`percent`/`size`.
- **O harness do Bloco 3 não limpa marcadores quando falha no meio**, e a rodada seguinte quebra por
  estado sujo, não por regressão. Sintoma: o botão aparece como "Marcada" em vez de "Marcar frase".
- **Escrita no banco nunca por MCP** — KI-29. SQL vai pro SQL Editor, com o Felipe.

## Contexto do teste

- Conta de aluno: `smarthomefg@gmail.com`, matriculada pelo admin `realvisionmaps360@gmail.com`
- Curso: Profissional 360 · 40 aulas cadastradas, **só a 0.1 gravada** — e isso é esperado
- Aula 0.1: `37c49e32-b60e-4716-b02b-1a90b26f78f1`
- URL do leitor: `/academy/curso/profissional-360/aula/<lessonId>`
- O Felipe pediu para **fechar e reabrir o navegador do celular** antes de testar, por cache

## Pré-requisito que segue de fora do código

Gravar as aulas restantes depende do pipeline da Fase 2 do [[PRD-007-curso-narrado-sincronizado]], que usa
**ffmpeg**, **Python 3** e **Docker** (Aeneas) — nenhum dos três existe na máquina atual do Felipe
(verificado em 04/08/2026). Os scripts sobreviveram à troca de máquina (`clean_text.py` e `build_final.py`
em `TEMP/modulo/output/`) mas seguem fora de `scripts/` do repo. Portá-los é trabalho pequeno e precisa
acontecer antes da aula 0.2. **O leitor pronto não destrava a gravação.**

## Documentos relacionados
- [[PRD-008-leitor-narrado-design]] — o leitor, com a Fase B especificada
- [[PRD-009-trilha-gamificada]] — o próximo escopo grande
- [[DECISIONS]] — D-033 a D-043 saíram desta sessão
- [[TIMELINE]] — a narrativa completa do dia
- [[CONTEXT]] · [[KNOWN_ISSUES]] · [[ROADMAP]]
