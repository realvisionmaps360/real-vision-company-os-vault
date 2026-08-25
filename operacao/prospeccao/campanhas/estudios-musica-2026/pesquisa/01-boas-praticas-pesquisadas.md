# Pesquisa de boas práticas — campanha Estúdios de Música

> Data da pesquisa: 18/08/2026. Feita antes de desenhar o plano de execução, a pedido do Felipe.
> Tudo aqui é **PESQUISA** (verificado em fonte externa nesta data), salvo onde marcado.

---

## 1. Legalidade da prospecção fria no Brasil (LGPD)

**PESQUISA.** Cold email B2B é legal no Brasil. A base legal é o **legítimo interesse**
(LGPD, art. 7º, IX). Não exige consentimento prévio para e-mail corporativo.

Requisitos para a base se sustentar:

1. O e-mail precisa ser **corporativo**, não pessoal.
2. O conteúdo precisa ser **relevante para o destinatário**, não oferta aleatória.
3. Precisa ter **opção de descadastro** visível e funcional.
4. O remetente precisa **se identificar claramente**.
5. Precisa haver **registro documentado** do porquê aquele contato é relevante.

O item 5 é o que quase todo mundo ignora e é o que salva numa fiscalização.

**Implicação direta:** o campo `score_reasons` da tabela `prospects` já serve exatamente
para isso. Ele deixa de ser só priorização interna e vira **prova de legítimo interesse**.
Não é trabalho novo, é o mesmo trabalho cumprindo duas funções.

**Contexto de risco.** A ANPD saiu do modo educativo e passou a fiscalizar de fato desde
2024-2025. Multas de até R$ 50 milhões ou 2% do faturamento. Não é motivo para não
prospectar. É motivo para prospectar com registro.

Fontes: eesier.com.br/cold-email-lgpd · fullsalessystem.com/blog/lgpd-2026-prospeccao-b2b-compliance · disparoemassa.com.br/blog/lgpd-email-marketing-b2b-o-que-pode-e-o-que-nao-pode

---

## 2. Entregabilidade de e-mail em 2026, mudou e mudou feio

**PESQUISA.** Google, Yahoo e Microsoft (este desde 05/05/2025) endureceram as regras de
remetente. Desde **novembro de 2025 o Gmail passou a rejeição dura**: mensagem não conforme
leva erro 5xx permanente e nem chega na caixa.

| Exigência | Detalhe |
|---|---|
| SPF, DKIM e DMARC | Os três, passando **e alinhados** com o domínio do From. Dois de três não basta mais |
| Descadastro em um clique | Cabeçalhos `List-Unsubscribe` e `List-Unsubscribe-Post` (RFC 8058). Tem que funcionar sem login e ser honrado em 2 dias |
| Taxa de reclamação de spam | Abaixo de **0,3%** |
| Taxa de bounce | Abaixo de **2%** |
| Regra de volume | As regras de bulk sender valem a partir de 5.000 e-mails/dia por domínio |

Referência de resultado: remetente conforme fica em torno de 89% de entrega na caixa.
Não conforme vê 22% a 34% do volume cair em spam. Penalidade de 3x a 7x.

**Volume seguro por caixa: 30 a 50 e-mails por dia.** Caixa antiga com boa reputação
aguenta 80 a 100.

**Implicação direta:**

- Nosso volume é baixo, não caímos na regra de bulk sender. Mas autenticação vale para
  todo mundo, e taxa de reclamação nos afeta igual.
- **Antes do primeiro envio, checar SPF/DKIM/DMARC do domínio remetente.** Vira item
  obrigatório de checklist. Se enviarmos de `realvisionmaps.com`, o domínio principal da
  empresa entra em jogo. Reputação queimada afeta e-mail de cliente, não só prospecção.
- **HIPÓTESE a validar com o Felipe:** usar subdomínio dedicado de envio, para isolar a
  reputação da campanha do domínio principal. É prática padrão. Não é decisão minha.
- Descadastro em um clique precisa existir mesmo em e-mail escrito à mão, um a um.

Fontes: powerdmarc.com/bulk-email-sender-requirements · redsift.com/guides/bulk-email-sender-requirements · inboxkit.com/learn/google-yahoo-sender-requirements-2026 · messageflow.com/blog/email-deliverability-2026

---

## 3. WhatsApp para prospecção fria, o achado mais importante

**PESQUISA.** Aqui a pesquisa contradiz o plano da sessão, e eu recomendo mudança.

O consenso das fontes é direto: **WhatsApp não é canal de prospecção fria.** Sem opt-in
explícito, o resultado esperado é bloqueio pelos destinatários e queda da nota de qualidade
do número.

O que mudou em 2026:

| Item | Estado |
|---|---|
| Enforcement do Meta | Mais agressivo. O **app grátis do WhatsApp Business é o que mais leva bloqueio** |
| Limite inicial de conta não verificada | Caiu de 1.000 para **250** mensagens, desde outubro/2025 |
| Nota de qualidade | Verde, amarelo, vermelho, por número, baseada em reclamação e bloqueio numa janela recente. Vermelho é risco de restrição |
| Contato a lista raspada | Citado explicitamente como o pior caso de uso, porque o destinatário não sabe como você obteve o número |

Nossos contatos virão de raspagem do Google Maps. É literalmente o cenário descrito.

**A estrutura de menor risco é a conversa iniciada pelo destinatário**: link click-to-chat,
QR code, ou o cara respondendo um e-mail e chamando no WhatsApp depois.

**Recomendação (HIPÓTESE, decisão do Felipe): inverter a ordem dos canais.**

1. **E-mail é o canal de abertura.** Legal sob legítimo interesse, sem risco de banimento
   de conta, e é o canal que a campanha Unterentfelden já validou.
2. **WhatsApp entra depois**, quando o prospect responde ou clica. Aí a conversa é iniciada
   por ele e o risco cai a quase zero.
3. Se o Felipe quiser WhatsApp na abertura mesmo assim: **número separado**, nunca o número
   comercial principal, volume baixíssimo, e aceitar que o número pode queimar.

O que está em risco não é a campanha. É o número de WhatsApp que a Real Vision usa com
cliente real. Perder ele custa mais caro que a campanha inteira.

Fontes: whatsappbusiness.com/policy · saysimple.com/blog/whatsapp-business-app-account-blocks-2026 · chatarmin.com/en/blog/whats-app-messaging-limits · whapi.cloud/blog/how-to-avoid-whatsapp-ban-2026

---

## 4. Coleta via Apify

**PESQUISA.** As fontes confirmam o método que o Unterentfelden já tinha descoberto na
marra, o que é bom sinal:

- **Fatiar a área geográfica** em blocos menores ou múltiplas consultas, para escapar do
  teto de resultados por consulta do Google. Depois **deduplicar por `placeId`**.
- **Descoberta barata primeiro, enriquecimento caro só nos únicos.** Exatamente a lição já
  registrada no handoff de Unterentfelden.
- Taxa de acerto de e-mail via varredura do site do negócio: **40% a 70%**, variando por
  vertical. Esperar que boa parte dos estúdios não renda e-mail.
- Aviso recorrente: o custo sobe mais rápido do que se espera quando se encadeia actor com
  etapa de enriquecimento. Medir **custo por negócio útil**, não por lugar raspado.

**FATO, verificado por mim no MCP da Apify em 18/08/2026:** o actor
`compass/crawler-google-places` mudou para cobrança **pay-per-event**. Nota 4,71, 34.790
usuários por mês, atualizado em 17/08/2026. Preços no tier **FREE**, que é o da conta:

| Evento | US$ |
|---|---|
| Lugar raspado | 0,004 |
| Filtro aplicado, por lugar e por filtro | 0,001 |
| Detalhe adicional do lugar | 0,002 |
| Enriquecimento de contato da empresa | 0,002 |
| Business leads enrichment | **0,10** |
| Verificação de e-mail | **0,10** |
| Review raspada | 0,0005 |
| Início do actor | 0,00005 |

**Os dois eventos de US$ 0,10 são armadilha no tier FREE.** Custam 25 a 50 vezes mais que
os outros e caem para US$ 0,005 e US$ 0,004 já no tier BRONZE. Regra prática: no plano
atual, **não usar** business leads enrichment nem verificação de e-mail. O enriquecimento
de contato da empresa a US$ 0,002 resolve o mesmo problema por uma fração do preço.

Ordem de grandeza, como HIPÓTESE de custo: 500 estúdios descobertos, 1 filtro,
enriquecimento de contato em 200 únicos, dá 500 × 0,004 + 500 × 0,001 + 200 × 0,002 =
**US$ 2,90**. Cabe no crédito mensal, se o crédito estiver disponível.

Fontes: MCP Apify por leitura direta · blog.apify.com/best-google-maps-scrapers · use-apify.com/docs/how-to-use-apify/scrape-google-maps

---

## 5. Validar antes de escalar

**PESQUISA.** O padrão de mercado para outbound novo é **piloto de 6 a 8 semanas** testando
ICP, mensagem, sequência e qualificação, terminando com veredito claro: escalar, estreitar
ou parar.

Isso valida a estrutura da especificação da campanha, que já prevê amostra pequena antes de
escala. Duas coisas que as fontes acrescentam e vale importar:

1. **Definir o veredito antes de rodar.** Que taxa de resposta faz escalar? Que taxa faz
   parar? Decidido antes, não depois de olhar o resultado.
2. **Validar o score contra o resultado real.** O Operating System já prevê isso na seção 15,
   mas na primeira rodada não há histórico de estúdio. O score começa como hipótese, não
   como verdade calibrada.

Fontes: outboundpanda.com/outbound-pilot · databar.ai/blog/how-to-run-your-outbound-campaign · cleanlist.ai/glossary/icp-scoring

---

## 6. O mercado de estúdios no Brasil

**PESQUISA, com ressalva forte de confiabilidade.**

- A base do oHub lista **369 estúdios de gravação** no Brasil, dado de abril/2026. É um
  diretório comercial, não um censo. Serve como ordem de grandeza, não como contagem.
- O mercado fonográfico brasileiro **cresceu 14% em 2025** (Pró-Música Brasil, via Agência
  Brasil). Mercado em expansão é sinal bom de capacidade de compra.
- São Paulo aparece como concentração óbvia, mas **nenhuma fonte deu distribuição
  geográfica confiável por cidade**.

**Conclusão honesta: pesquisa de escritório não resolve a Missão 3.** Não existe dado
público bom o bastante para escolher a cidade. A escolha tem que sair de contagem própria
via Google Maps, cidade por cidade, com critério objetivo. É trabalho de coleta, não de
leitura.

**Lacuna de vocabulário a resolver antes de coletar.** "Estúdio de música" no Brasil cobre
pelo menos três negócios diferentes, com necessidades e capacidade de pagar diferentes:

| Tipo | O que é | Hipótese de fit |
|---|---|---|
| Estúdio de gravação | Grava, mixa, masteriza | Mais provável ter verba e precisar de site de portfólio |
| Estúdio de ensaio | Aluga sala por hora para banda | Volume alto, ticket baixo, raramente tem site |
| Escola de música com estúdio | Aula mais gravação | Mais verba, mas é outro tipo de site |

Isso não é detalhe. Muda categoria de busca no Google Maps, muda copy, muda preço. Precisa
ser decidido na Missão 3, antes de qualquer coleta.

Fontes: ohub.com.br/empresas/estudio-de-gravacao · agenciabrasil.ebc.com.br, mercado fonográfico 2025

---

## 7. O que a pesquisa mudou no plano

| # | Mudança | Gravidade |
|---|---|---|
| 1 | WhatsApp sai da abertura e vira canal de resposta | **Alta.** Protege o número comercial da Real Vision |
| 2 | Checar SPF, DKIM e DMARC vira pré-requisito de envio | **Alta.** Sem isso o e-mail nem chega |
| 3 | Descadastro em um clique em todo e-mail | Alta. Exigência legal e técnica |
| 4 | `score_reasons` ganha função dupla: prioridade e prova de legítimo interesse | Média |
| 5 | Proibido usar os eventos de US$ 0,10 da Apify no tier FREE | Média. Economiza dinheiro real |
| 6 | Definir o critério de sucesso antes de rodar a amostra | Média |
| 7 | Decidir qual dos três tipos de estúdio é o alvo | **Alta.** Bloqueia a coleta |
