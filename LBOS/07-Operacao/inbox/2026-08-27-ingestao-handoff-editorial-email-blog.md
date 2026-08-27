---
data: 2026-08-27
origem: pacote de handoff do ChatGPT da Romana (projeto LBOS), entregue por Felipe em 27/08/2026
confiabilidade: media
tipo: conhecimento
projeto: real-vision-email-marketing
prioridade: alta
responsavel: "[[Felipe Garcia]]"
referencia: ["[[operacao/marketing/email-marketing/README]]", "[[04-CALENDARIO-EDITORIAL]]", "[[PROCESSO-EDITORIAL-EMAIL-BLOG-CHATGPT-VOZ]]"]
tags: [lbos/entrada]
---

# Ingestão — handoff editorial blog → email

Nota de entrada do Fluxo do Documento Vivo. Registra **onde** a informação foi parar, não o
conteúdo dela (o conteúdo tem dono no Company OS, este nó só referencia).

## O que entrou

Pacote de 4 arquivos produzido no ChatGPT da Romana dentro do projeto LBOS, recebido via Google
Drive:

1. `01-PRD-FINAL-EDITORIAL-EMAIL-BLOG-REAL-VISION.md`
2. `02-PLANO-EXECUCAO-HANDOFF-LBOS-CLAUDE-CODE.md`
3. `03-MANIFESTO-EXPORT-CHATGPT-VOZ.md`
4. `PROCESSO-EDITORIAL-EMAIL-BLOG-CHATGPT-VOZ.md` (rascunho anterior)

Confiabilidade **média** porque o pacote misturava decisões reais do Felipe, fatos verificados em
fonte oficial e lembranças de direções antigas que precisavam de remapeamento. O próprio manifesto
avisava disso.

## Onde o conteúdo foi parar

O LBOS **referencia**, não absorve. Nada de `operacao/` ganhou frontmatter LBOS.

| Conteúdo | Dono |
|---|---|
| Estado editorial (posts, ganchos, status) | `operacao/marketing/email-marketing/04-CALENDARIO-EDITORIAL.md`, seção 6 |
| Processo de blog → email | `operacao/marketing/email-marketing/PROCESSO-EDITORIAL-EMAIL-BLOG-CHATGPT-VOZ.md` |
| Estratégia de email | `00-ESTRATEGIA.md` — **não foi tocado**, continua fonte única |
| Entrada de contato na lista | `07-COMO-ADICIONAR-CONTATOS.md` (novo) |

## Análise de impacto — apresentada e decidida

As seis perguntas foram respondidas e mostradas ao Felipe antes de qualquer nó mudar, conforme o
§31. Classificação: documental **alto** · operacional **alto** · estratégico **médio** ·
cronograma **alterado** · financeiro indireto · risco **novo identificado**.

Decisões do Felipe em 27/08:

1. Restaurar o `04-CALENDARIO-EDITORIAL.md` perdido e seguir com ele, em vez de criar arquivo novo
2. Fazer merge da branch `docs/processo-editorial-email-blog-chatgpt-voz` no main
3. Aprovar os ganchos um por um: 4 aprovados, 2 descartados
4. Trocar a cadência de semanal para **5 em 5 dias**
5. Disparar a campanha 004 email 1 no mesmo dia

## Risco novo que este handoff revelou

Cinco documentos criados em 21/08 **sumiram sem nunca terem sido commitados**. Três voltaram de uma
cópia em `TEMP/`; dois tiveram que ser reescritos do zero. Causa: o `.gitignore` do vault só versiona
`.md`, e ninguém commitou.

Não é risco teórico — já se materializou uma vez, custou trabalho real. Merece nó de risco próprio
se voltar a acontecer.

## O que ficou pendente

- Fase 2 do ciclo (emails 5 a 8) não escrita — trava a cadência em 16/09
- P.S. do email 4 promete conteúdo que hoje está no email 9
- Contatos de teste sujando a métrica
- Funções `hermes-campanha` e `hermes-test-send` desativadas mas ainda listadas no Supabase
- BIMI inviável no curto prazo: Gmail exige VMC, que exige marca registrada e ~US$ 1.000/ano

## Critério de término — atingido

O teste do plano de execução era: *um Claude Code novo, sem esta conversa, consegue abrir o Vault e
dizer qual post vem a seguir, o que já foi aprovado, por que foi aprovado e quais regras de copy
seguir?*

Sim. `README.md` da pasta → `04-CALENDARIO-EDITORIAL.md` seção 6 → `PROCESSO-EDITORIAL`. O
conhecimento não depende mais de nenhuma conversa.

## Relacionados

- Referencia: [[operacao/marketing/email-marketing/README]]
- Entra por: [[INBOX]]
- Regido por: [[FLUXO-DOCUMENTO-VIVO]]
