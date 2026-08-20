---
id: HANDOFF-2026-08-12-bloco7-verificacao-final
title: Handoff — Bloco 7 do PRD-008 (verificação final) interrompido, sem fechar
type: handoff
project: real-vision-academy
created: 2026-08-12
updated: 2026-08-12
status: pronto para a próxima sessão
related:
  - PRD-008-leitor-narrado-design
  - KNOWN_ISSUES
  - DECISIONS
  - TIMELINE
  - CONTEXT
---

# Handoff — Bloco 7 (verificação final) interrompido, sem fechar

## Como começar a próxima sessão

Diga **"carrega o contexto"** ou **"vamos trabalhar na Academy"**. Skills a ativar:

- `rv-academy` — engenharia da plataforma (harness, armadilhas, regra do "verificado" D-039)
- `realvision` — contexto geral da empresa

## Onde estamos, em três linhas

O Bloco 6 do [[PRD-008-leitor-narrado-design]] está **no ar, testado em aparelho e aprovado**. O Bloco 7
("verificação final e publicação", que fecha o PRD-008 inteiro) foi **iniciado e interrompido** — tentei
rodar a bateria completa de testes automatizados (todos os `verify-bloco*.mjs` em sequência, mobile e
desktop) e o harness quebrou por um problema de estado de teste, não por bug de código. **Nenhum código
mudou nesta sessão. Nada novo foi publicado** — o `main` está exatamente como estava no fim da sessão do
Bloco 6.

## O que aconteceu, em detalhe

1. Rodei `npm run build` — limpo.
2. Rodei os testes de regressão em sequência (`verify-bloco1` a `verify-bloco5`, `verify-blocoB1-B3`,
   `verify-blocoC2` a `C7`, `verify-banner-regressao`, `verify-aluno`), mobile e desktop.
3. **Blocos 1 a 5 passaram quase inteiros** — só 2 checagens de auto-scroll no Bloco 1 (`scrollY` não
   mudou entre duas medições) e 1 falha pontual no Bloco 5, nenhuma investigada a fundo ainda.
4. A partir do `verify-blocoB2` em diante, os testes passaram a travar esperando o texto da aula aparecer
   (`[data-frag]` nunca fica visível). Investiguei manualmente: a aula de teste (0.1, conta
   `smarthomefg@gmail.com`) tinha sido marcada como **100% ouvida** pelo próprio `verify-bloco1` (que ouve
   a aula inteira de propósito, pra testar o indicador de progresso). Uma aula já concluída mostra
   "Ouvir de novo" em vez do leitor ativo — comportamento correto para o aluno, mas nenhum script de teste
   prevê esse estado. Registrado como **KI-38**.
5. `verify-blocoB1` reportou FALHOU na checagem "seção 'Materiais da aula' presente" — não dá pra saber
   ainda se é regressão real ou o mesmo problema do KI-38 (painel de materiais não monta com a aula em
   estado "concluída") ou se o teste ficou desatualizado depois da Fase C reorganizar os materiais em
   acordeão. **Não investigado.** Registrado como **KI-39**.
6. Durante a investigação manual eu derrubei o dev server sozinho três vezes ao matar `chrome.exe` de
   forma ampla demais tentando destravar o perfil persistente do Playwright — perda de tempo, sem impacto
   em código ou dados. Uma pasta órfã (`UsersFelipe Garcia.playwright-rv-aluno/`) vazou pra dentro do
   repo por um path mal escapado — já removida, `git status` limpo.
7. Felipe decidiu pausar a automação e retomar em outra sessão, testando o Bloco 6 (já publicado) direto
   no aparelho quando quiser, sem pressa pelo Bloco 7.

## O que falta pra fechar o Bloco 7

- [ ] Resolver **KI-38**: decidir entre resetar `lesson_progress` da conta de teste antes de rodar a
      bateria, ou ensinar os scripts a clicar em "Ouvir de novo" quando presente.
- [ ] Investigar **KI-39** (materiais ausentes no blocoB1) — pode ser regressão real, vale checar antes
      de assumir que é só ruído do KI-38.
- [ ] Rodar a bateria completa limpa (mobile + mobile+desktop) depois dos dois pontos acima resolvidos.
- [ ] Screenshot em 390px revisado a olho (padrão D-039) — ainda não feito nesta rodada.
- [ ] Teste final do Felipe em aparelho real, cobrindo o leitor inteiro de ponta a ponta (não só o Bloco
      6 isolado) — esse é o critério que realmente fecha o Bloco 7 e o PRD-008.

## Nada para testar "online" nesta sessão

Não há build novo nem commit novo — o Bloco 6 já estava publicado e aprovado antes desta sessão começar.
Testar em produção agora é revisitar o que já está no ar (ver checklist do Bloco 7 acima, item de teste
final), não uma novidade desta sessão.

## Documentos relacionados
- [[PRD-008-leitor-narrado-design]] · [[KNOWN_ISSUES]] (KI-38, KI-39) · [[DECISIONS]] · [[TIMELINE]]
