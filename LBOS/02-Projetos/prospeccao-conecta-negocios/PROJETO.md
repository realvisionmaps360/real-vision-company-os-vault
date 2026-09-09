---
id: PRJ-2026-008
tipo: projeto
nome: Prospecção Conecta Negócios (WhatsApp → Email)
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-09-09
atualizado_em: 2026-09-09
proxima_revisao: 2026-09-16
prazo: continuo
pertence_a: ["[[LBOS]]", "[[02-Projetos/real-vision/PROJETO]]"]
depende_de: []
gera_receita: []
gera_despesa: []
afeta: []
referencia:
  - "[[operacao/prospeccao/campanhas/conecta-negocios-whatsapp/CONTROLE-ENVIOS|CONTROLE-ENVIOS]]"
  - "[[operacao/marketing/email-marketing/09-LISTA-CAPTADOS-WHATSAPP|09-LISTA-CAPTADOS-WHATSAPP]]"
  - "[[operacao/marketing/email-marketing/campanhas/INDICE-CAMPANHAS|INDICE-CAMPANHAS]]"
  - "[[operacao/marketing/email-marketing/_PAINEL|_PAINEL email marketing]]"
tags: [lbos/entidade, lbos/projeto]
---

# Prospecção Conecta Negócios (WhatsApp → Email)

## O que é

Frente de aquisição pessoal do Felipe: disparo 1:1 pelo WhatsApp Business/pessoal (número final 1924) para membros do grupo **"📍CONECTA NEGÓCIOS - Grupo Oficial"** (Instituto Conecta, 1.021 membros) e contatos pessoais/clientes já salvos no WhatsApp do Felipe. Parte desses contatos confirma email na conversa e vira lead na base de **Email Marketing (Projeto Hermes)** — é a origem real dos contatos novos que entraram na campanha 004 entre 01/09 e 04/09/2026.

Este nó é o elo que faltava no grafo: sem ele, a campanha de email não tinha rastro de **de onde** os contatos novos vieram. Toda a operação factual (números, mensagens, resultados) continua só no Company OS — este nó referencia, nunca copia.

| | |
|---|---|
| Canal de origem | WhatsApp (1:1, fora do grupo) |
| Canal de destino | Email (campanha 004, Hermes) |
| Fonte única do disparo WhatsApp | `operacao/prospeccao/campanhas/conecta-negocios-whatsapp/CONTROLE-ENVIOS.md` |
| Fonte única dos leads captados | `operacao/marketing/email-marketing/09-LISTA-CAPTADOS-WHATSAPP.md` |
| Fonte única da cadência de email | `operacao/marketing/email-marketing/campanhas/INDICE-CAMPANHAS.md` + `_PAINEL.md` |

## Por que este nó existe (a falha que ele corrige)

Sessão de 09/09/2026: o Felipe apontou que a origem dos contatos novos da campanha de email (o disparo WhatsApp que ele fez com os próprios contatos pessoais/clientes) não estava referenciada em lugar nenhum que amarrasse as duas pontas — WhatsApp e email viviam em documentos separados sem aresta entre eles. Sintoma do problema maior: documentos que não se atualizam sozinhos e ficam sem dono claro de "isso mudou, o que mais precisa mudar".

Achado na mesma sessão, como prova do problema: `_PAINEL.md` da campanha de email ainda tinha a pendência **"Ajustar o P.S. do email 4"** listada como aberta, mas o P.S. já tinha sido removido pelo Felipe no reescrito de 07/09/2026 (ver comentário no HTML do `004-04-solarium-aarau.html`). Corrigido nesta sessão — ver [[HISTORICO]].

## Fluxo Documento Vivo aplicado aqui

Esta frente passa a seguir os 7 passos de [[FLUXO-DOCUMENTO-VIVO]] sempre que algo mudar:

1. **Entrada** — qualquer novo envio, resposta ou contato captado é registrado no Company OS no mesmo dia (não no fim da campanha).
2. **Classificação** — todo contato novo captado via WhatsApp é marcado com a origem (`whatsapp-conecta-negocios` ou `whatsapp-pessoal`) na tabela `09-LISTA-CAPTADOS-WHATSAPP.md`.
3. **Entidades** — este nó (`PRJ-2026-008`) é o dono da relação WhatsApp→Email. Não criar nó novo pra isso de novo.
4. **Relações** — `referencia` os documentos-fonte no Company OS (nunca copia número/email pra dentro do LBOS).
5. **Impacto** — antes de qualquer disparo novo pra lista real, checar: a lista de contatos ativos mudou? algum painel ficou desatualizado (como o caso do P.S.)? Perguntar ao Felipe se achar divergência, não presumir.
6. **Atualização seletiva** — só os documentos realmente afetados (painel, índice, controle de envios) — nunca reescrever tudo por precaução.
7. **Registro** — toda sessão que mexer nessa frente ganha linha nova em [[HISTORICO]] deste nó, além da atualização normal no Company OS.

## Trava contra a falha de "documento não atualizado"

Regra prática adotada a partir de 09/09/2026: **antes de declarar qualquer disparo/campanha "pronto para aprovação"**, conferir se o painel (`_PAINEL.md`) e o índice (`INDICE-CAMPANHAS.md`) da campanha batem com o arquivo real do email (HTML) — não confiar de memória em qual pendência já foi resolvida. Mesmo padrão que já existe pra template de email (ver `skills/rv-email/SKILL.md`), estendido aqui para pendências de painel.

## Relacionados
- Pertence a: [[LBOS]]
- Campanha de origem (WhatsApp): `operacao/prospeccao/campanhas/conecta-negocios-whatsapp/CONTROLE-ENVIOS.md`
- Campanha de destino (Email): `operacao/marketing/email-marketing/` — ver skill `rv-email`
- [[HISTORICO]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-09-09 | Nó criado | Felipe pediu metodologia de documento vivo aplicada a esta frente, pra evitar falha de documento desatualizado (achada no mesmo pedido: pendência do P.S. do E4 já resolvida mas não marcada) | Cria a aresta que faltava entre a campanha WhatsApp e a campanha de email — rastro completo da origem dos contatos novos | Nó vive em `02-Projetos/`, referencia o Company OS sem duplicar dado nenhum |
