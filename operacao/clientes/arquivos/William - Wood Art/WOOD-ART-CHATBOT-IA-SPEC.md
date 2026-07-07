# Wood Art — Chatbot com IA · Spec Conceitual + Custos

> Documento interno de diagnóstico/precificação. Base para a linha de item na proposta comercial.
> Cliente: William (Wood Art). Dossiê: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]] · App de Placas: [[WOOD-ART-APP-PLACAS-SPEC]] · Website: [[WOOD-ART-SITE-DIAGNOSTICO]]
> Criado: 06/07/2026
> ⚠️ Estimativas de custo são a referência de mercado da Real Vision (jul/2026). O valor final fecha depois que o William confirmar a demanda real (volume de conversas, complexidade das respostas, quantas plataformas).
> 🎯 **Objetivo desta fase:** reunir as informações principais para montar a proposta comercial. Nenhuma construção começa ainda.

---

## 1. O que é

Um assistente de vendas com IA, treinado com a base de dados da própria Wood Art — produtos, dúvidas frequentes, processo de compra — para atender como se fosse um vendedor humano:
- Tira dúvidas do cliente em tempo real.
- Mostra os produtos dentro da própria conversa (não só texto — cards/imagens de produto no chat).
- Sabe transferir a conversa para o ramal certo da equipe interna quando o assunto exige toque humano.

**Por que importa:** acesso rápido e em massa à informação é um fator decisivo na hora do cliente escolher onde comprar. O bot cobre esse atendimento 24/7 sem depender do William ou da equipe estarem disponíveis, e libera o time para focar só no que realmente precisa de humano.

---

## 2. Esta é uma entrega independente

O Chatbot com IA **não depende** do App de Placas (1ª entrega) nem do Website novo (2ª entrega) para existir:
- Pode ir direto no WhatsApp da operação atual do William, sem esperar nenhuma das outras duas frentes.
- Se o site próprio (Frente 3, ver [[WOOD-ART-SITE-DIAGNOSTICO]]) for construído depois, o mesmo bot pode ser integrado nele também — é um custo de integração adicional, não um bot novo.

Ou seja: é possível vender esta peça sozinha, ou como complemento de qualquer uma das outras duas.

---

## 3. Canais de integração possíveis

O bot pode atuar em qualquer um destes canais, com custo de integração próprio para cada um:

| Canal                 | Observação                                                                     |
| --------------------- | ------------------------------------------------------------------------------ |
| WhatsApp              | Canal onde o William já atende hoje — ponto de partida mais natural            |
| Telegram              | Alternativa/complemento ao WhatsApp                                            |
| Site (widget de chat) | Se/quando o site próprio existir (Frente 3)                                    |
| Instagram (DM)        | Atendimento direto pelas mensagens do Instagram                                |
| Qualquer link/lugar   | O bot pode ser embutido onde o William quiser (ex: link direto, QR code, etc.) |

O William pode escolher começar por um canal só e ir expandindo — não precisa decidir tudo de uma vez.

---

## 4. Capacidades / integrações conceituais

- **Base de conhecimento treinada:** catálogo de produtos, preços, dúvidas frequentes e processo da Wood Art alimentam a IA.
- **Produtos dentro do chat:** o bot mostra o produto (imagem + info) na própria conversa, não só descreve em texto. ( pode ter mais custo para desenvolver)
- **Google Merchant Center:** integração conceitual para puxar/sincronizar dados de produto entre o Merchant Center e o bot (ver também item 8 de [[WOOD-ART-FRENTES-DE-TRABALHO]]).( pode ter mais custo para desenvolver)
- **Transferência para a equipe:** o bot identifica quando precisa de humano e encaminha para o ramal certo da equipe interna do William.
- **Atendimento em massa e simultâneo:** múltiplos clientes atendidos ao mesmo tempo, sem fila.

---

## 5. Estrutura de custo (sem valor fechado — depende da necessidade real do negócio)

**⚠️ Não apresentar preço fixo de desenvolvimento na proposta.** O custo real depende de: quantas integrações o William quer, que tipo de bot (canal, tom, complexidade das respostas), e principalmente **quanto trabalho de treinamento do modelo é necessário** para o bot ficar "redondinho" — isso não é um custo simples de programação, é um processo iterativo:
- Treinar o bot na base real da Wood Art exige que o William envie dados e material (catálogo completo, dúvidas reais de clientes, casos de atendimento) — quanto mais dado, melhor e mais preciso fica o resultado.
- Esse investimento de tempo e ajuste fino faz parte do valor entregue, não é trabalho "de graça" antes do desenvolvimento em si — é parte do que está sendo vendido.

| Item | Valor | Tipo |
|---|---|---|
| Desenvolvimento do bot (base + treinamento) | **sem valor fechado — depende do escopo e do volume de dados/treino necessário** | Custo único |
| Manutenção mensal (bot online) | **R$300/mês** (referência — ajusta conforme volume de conversas e uso de API de IA) | Recorrente |
| Integração por plataforma adicional | **R$250** cada | Custo único, por canal além do primeiro (este valor está confirmado, independente do escopo do bot) |

**Como funciona a integração adicional:** o desenvolvimento cobre o bot e sua primeira integração (ex: WhatsApp). Se o William quiser o mesmo bot também no site, ou também no Instagram, cada plataforma extra soma R$250 — não é um bot novo, é uma nova porta de entrada para o mesmo cérebro.

*Exemplo:* bot no WhatsApp (incluso no desenvolvimento) + site próprio depois = +R$250. Bot no WhatsApp + site + Instagram = +R$250 × 2.

**⚠️ Valor final pendente de confirmação.** O custo real (desenvolvimento + treinamento, e a manutenção mensal, que inclui uso de API de IA) depende do volume de conversas, da complexidade das respostas e de quanto material o William vai fornecer para o treinamento — isso só se define entendendo a demanda dele.


---

## 6. Decisões pendentes a levar ao William

- Canal prioritário de lançamento (WhatsApp é o mais natural, dado que é onde ele já atende hoje).
- Quer multi-plataforma desde o início, ou prefere começar por um canal e expandir depois?
- Volume esperado de conversas/mês (define o custo real de manutenção).
- Nível de autonomia do bot: só tira dúvida, ou também fecha venda dentro da conversa?

---

## Próximo passo

Com a demanda confirmada pelo William, este documento vira uma linha de item fechada na proposta comercial (skill `proposta-comercial`) — ao lado do App de Placas e do Website, como uma 3ª entrega independente.
