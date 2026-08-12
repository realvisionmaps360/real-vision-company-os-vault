---
id: HANDOFF-2026-08-12-bloco5-fechado
title: Handoff — Bloco 5 do PRD-008 fechado (grifo por trecho), próximo é o Bloco 6
type: handoff
project: real-vision-academy
created: 2026-08-12
updated: 2026-08-12
status: pronto para a próxima sessão
related:
  - PRD-008-leitor-narrado-design
  - PRD-008-bloco5-plano-execucao
  - DECISIONS
  - TIMELINE
  - CONTEXT
---

# Handoff — Bloco 5 fechado, próximo é o Bloco 6

## Como começar a próxima sessão

Diga **"carrega o contexto"** ou **"vamos trabalhar na Academy"**. Skills a ativar:

- `rv-academy` — engenharia da plataforma (harness, armadilhas, regra do "verificado" D-039)
- `realvision` — contexto geral da empresa
- `supabase-postgres` — se a sessão mexer em schema/RLS
- `frontend-design` + `web-design-guidelines` — se mexer em layout/visual

## Onde estamos, em três linhas

O **Bloco 5** do [[PRD-008-leitor-narrado-design]] (grifo por trecho de texto na aula narrada) está
**completo, testado pelo Felipe em aparelho real e publicado** — `main` em `4d5c497`. Dois bugs achados no
teste em aparelho já foram corrigidos na mesma sessão. A próxima coisa a fazer é o **Bloco 6** (Media
Session + `manifest.json` PWA), zero código escrito.

## O que aconteceu nesta sessão (12/08/2026), resumido

Sessão retomou do passo 5.4, pendente da sessão de 11/08.

1. Passos **5.4 a 5.8** executados um a um, cada um fechando com build limpo + Playwright verde + print
   390px — passo a passo completo em [[PRD-008-bloco5-plano-execucao]].
2. Publicado em 4 commits antes do teste em aparelho.
3. **Felipe testou no celular e achou 2 bugs**, nenhum visível no Playwright:
   - O menu nativo do Android ("Copiar/Compartilhar/Selecionar tudo") nascia por cima do popup de seleção.
     Resolvido virando **barra fixa** acima do player, em vez de flutuar sobre o texto (D-053).
   - O painel "Marcadores" (ícone do cabeçalho) não mostrava os grifos, só os marcadores antigos do Bloco 3.
     Corrigido — o painel agora lista os dois, em seções separadas (D-055).
4. Os dois corrigidos, verificados e publicados na mesma sessão (`af1b593`, `d6ce743`).
5. `tests/verify-bloco5.mjs` escrito no padrão dos outros blocos — **36/37 mobile e desktop**.
6. Documentação fechada: [[PRD-008-leitor-narrado-design]] (tabela de blocos), [[DECISIONS]] (D-051 a
   D-055), [[TIMELINE]] (o dia inteiro), skill `rv-academy` e [[CONTEXT]].

## Decisões novas que a próxima sessão precisa saber

Todas em [[DECISIONS]], detalhadas — resumo rápido:

- **D-051** — grifo (`lesson_highlights`) e marcador (`lesson_bookmarks`) são sistemas separados de
  propósito, nunca vão ser unificados numa tabela só.
- **D-052** — popup de seleção nasce do `selectionchange`, debounce 400ms + supressão 900ms pós-duplo-toque.
- **D-053** — a barra de ações do grifo é **fixa acima do player**, não flutua sobre a seleção. Se pensar em
  mexer no posicionamento dela, leia esta decisão primeiro — existe por causa do menu nativo do Android.
- **D-054** — grifo tem filete de contorno **só** quando a frase está ativa (contraste no tema escuro).
- **D-055** — painel "Marcadores" lista marcadores E grifos, seções separadas só quando os dois coexistem.

## O que NÃO foi resolvido (ficou pendente, de propósito)

- **Conflito 4 nunca foi provado por robô.** A aula 0.1 (a única usada nos testes) não tem nenhuma frase
  sem áudio, então o caminho "popup de 2 ícones, sem pular" do `verify-bloco5.mjs` sempre falha por
  ausência de cenário — não é bug. Se algum dia sobrar tempo, testar numa aula que tenha frase sem
  sincronização, ou aceitar que só o olho do Felipe prova esse caminho.
- **8 scripts de teste antigos** (`verify-blocoC4-C7`, `verify-aluno`, `verify-conclusao`, `verify-full`,
  `verify-banner-regressao`) continuam apontando pra rota antiga do leitor, de antes do PRD-009 mover pra
  `/ler`. Sinalizado desde 11/08, ainda não corrigido — fora do escopo de qualquer sessão até agora.

## Próximo passo grande: Bloco 6

**Media Session + `manifest.json` (PWA).** Zero código escrito, zero spec fechada com o Felipe ainda.
Antes de codar, provavelmente vale uma sessão só de especificação (como foi feito com o Bloco 5) — ver o
padrão em [[PRD-008-bloco5-plano-execucao]] como referência de como fechar escopo antes de abrir o Sonnet
pra executar.

Depois do Bloco 6 vem o **Bloco 7** (verificação final e publicação) — aí o PRD-008 inteiro fecha.

## Onde tudo vive (lembrete rápido — detalhe completo na skill `rv-academy`)

| O quê | Caminho |
|---|---|
| Código | `operacao/projetos/_RV-Internos/sites/real-vision-site` |
| Harness de verificação | `tests/verify-bloco*.mjs` |
| Documentação do projeto | `operacao/projetos/real-vision-academy/docs/` |
| Perfil de teste (aluno) | `RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno"` |

**Atenção:** essa conta de teste (`smarthomefg@gmail.com`) já tem **dados reais** — marcadores e grifos que
o Felipe fez testando em aparelho. Qualquer script novo de verificação precisa limpar só o que ele mesmo
cria (ver o padrão do `finally` em `tests/verify-bloco5.mjs`), nunca mexer no que já está lá.

## Documentos relacionados
- [[PRD-008-leitor-narrado-design]]
- [[PRD-008-bloco5-plano-execucao]]
- [[DECISIONS]]
- [[TIMELINE]]
- [[CONTEXT]]
