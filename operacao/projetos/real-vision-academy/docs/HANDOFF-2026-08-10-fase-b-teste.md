---
id: HANDOFF-2026-08-10-fase-b-teste
title: Handoff — Fase B do PRD-008 codada, aguardando teste do Felipe
type: handoff
project: real-vision-academy
created: 2026-08-10
updated: 2026-08-10
status: "executado — Fase C pedida, codada e aprovada na sessão seguinte, ver [[HANDOFF-2026-08-10-prd009]]"
related:
  - PRD-008-leitor-narrado-design
  - DECISIONS
  - TIMELINE
  - HANDOFF-2026-08-10-leitor-narrado
  - HANDOFF-2026-08-10-prd009
---

# Handoff — Fase B codada, falta o teste real

> Continuação de [[HANDOFF-2026-08-10-leitor-narrado]] na mesma data. Aquele handoff descrevia a Fase B
> como "especificada, não iniciada" — agora está **codada e verificada por Playwright + print**, mas
> **não testada no aparelho do Felipe**, que é o critério que realmente fecha um bloco (D-039).

## O que foi feito nesta sessão

Os três blocos da Fase B, na ordem, cada um com build limpo + Playwright verde + print 390px revisado:

| Bloco | O quê | Decisão | Testes |
|---|---|---|---|
| B1 | `MaterialsList.tsx` em acordeão, fechado por padrão | D-043 (já existia) | 12/12 mobile, 12/12 desktop |
| B2 | Cartão sem `aspect-video` fixo + sumário antes do conteúdo no celular | D-044 (nova) | 9/9 mobile, 8/8 desktop |
| B3 | Nav de 5 chips virou `grid grid-cols-3`, sem rolagem horizontal | D-045 (nova) | 16/16 mobile, 4/4 desktop |

Sem regressão no bloco 1 (23/23) depois de cada bloco. Detalhe de cada decisão em [[DECISIONS]] D-044 e
D-045, e da execução em [[PRD-008-leitor-narrado-design]] (seção Fase B).

## Estado do repositório — LER ANTES DE QUALQUER COISA

| Item | Valor |
|---|---|
| Ramo | `feat/leitor-narrado-design` |
| Commits desta sessão (locais, **sem push**) | `b94b553` (B1) · `712c652` (B2) · `5523cbe` (B3) |
| `main` publicado | ainda `19a886d` — Fase B **não está em produção** |
| Pendências não comitadas de antes | `docs/academy/README.md` e `docs/seo-internacional/STATUS.md` — não são meus, não toquei |

O Felipe pediu explicitamente pra eu seguir executando os três blocos sem pausar pra aprovação entre eles
("pode seguir executando e a gente testa na próxima") — por isso não há push nem merge ao `main`. Isso é
proposital, não esquecimento.

**Antes de mexer:** `git fetch` e comparar — `git status` sozinho usa cache (já enganou antes nesta
mesma sessão anterior).

## O que fazer na próxima sessão

1. Rodar `npm run dev` e os três harnesses novos, perfil de aluno:
   ```bash
   RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno" node tests/verify-blocoB1.mjs mobile
   RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno" node tests/verify-blocoB2.mjs mobile
   RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno" node tests/verify-blocoB3.mjs mobile
   ```
   Confirmar que os três ainda passam (nada deveria ter mudado, mas confirmar antes de pedir teste real).
2. **Publicar pro Felipe testar em aparelho real** — precisa estar servindo em algum lugar que o celular
   dele alcance. Se for testar local, ele precisa da rede/URL de dev; se for via Vercel, o ramo precisa
   virar preview deploy ou ir pro `main` — **isso exige a aprovação explícita dele antes de qualquer push**
   (regra de ouro do AGENTS.md, seção "Aprovação antes de agir").
3. Se ele aprovar em aparelho real: só então considerar o merge/push pro `main`.
4. Se ele pedir ajuste: o ramo `feat/leitor-narrado-design` já está no estado certo pra continuar em cima
   dele, sem precisar recriar nada.
5. Depois de aprovado: [[PRD-009-trilha-gamificada]] é o próximo escopo grande (trilha estilo Duolingo,
   D-040 a D-042 já decididos, zero código). Depois, Blocos 5, 6 e 7 do PRD-008.

## Achados desta sessão, não investigados

- Arquivos-lixo vazios (`m.type()`, `html`, `0`) apareceram no `git status` durante a sessão, mesmo padrão
  já descrito nas armadilhas da skill `rv-academy` (`node -e` com caminho do Windows). Removidos antes de
  cada commit. **Não achei o comando que os gerou nesta sessão** — não usei `node -e` desta vez. Vale
  investigar se é algum hook ou ferramenta do ambiente, não necessariamente um erro meu.
- `.claude/` e `graphify-out/` aparecem como não rastreados no repo do site. Não mexi — fora de escopo.

## Documentos relacionados
- [[HANDOFF-2026-08-10-leitor-narrado]] — handoff anterior desta mesma data, com o contexto de conta de
  teste, armadilhas gerais e como rodar os harnesses mais antigos
- [[PRD-008-leitor-narrado-design]] — Fase B completa, detalhe bloco a bloco
- [[DECISIONS]] — D-044 e D-045 são novas
- [[TIMELINE]] — narrativa completa do dia, incluindo esta continuação
