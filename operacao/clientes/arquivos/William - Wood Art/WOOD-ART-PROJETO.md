# Wood Art — Dossiê do Projeto

> Cliente da Real Vision. Carregue sempre junto com a skill `realvision`.
> Idioma de trabalho com o cliente: PT-BR.

## Quem é
- **Cliente:** William
- **Negócio:** Wood Art — placas de madeira personalizadas, tábuas e placas maiores. William também é dono de uma empresa de usinagem separada (peças de madeira e metal sob demanda), atendendo hoje apenas via Shopee/Mercado Livre.
- **Local:** a confirmar
- **Contato:** a confirmar
- **VisionFlow:** William já existe no banco do VisionFlow, mas o **Supabase está indisponível no momento desta criação**. Por decisão do Felipe (03/07/2026), a pasta foi criada como se fosse cliente novo. **Pendência: reconciliar duplicata no VisionFlow assim que o Supabase voltar** (não inventar id/status até lá).

## O que foi entregue
- Nenhuma entrega ainda — cliente em fase de diagnóstico.

## Onde está o código
- Nenhum código próprio do William ainda.
- Referência interna de arquitetura: repo GitHub do projeto Brazilcomp — `https://github.com/realvisionmaps360/brazilcomp-2-97cf7219` (site + painel administrativo). Ideia do Felipe: usar como base técnica (banco de dados, painel admin, integração Mercado Pago, cadastro/estoque) e adaptar para a realidade do William — não é cópia direta, precisa de configurador de placa personalizada (feature nova) e todo o catálogo/copy refeitos. Ainda não validado tecnicamente; avaliação fica para a fase de protótipo/proposta.

## Pendências conhecidas
Ver detalhamento completo em [[WOOD-ART-FRENTES-DE-TRABALHO]]. Resumo das 11 frentes levantadas em 03/07/2026:

1. App de criação de placas personalizadas (self-service + integração com produção interna) — spec técnica + custos em [[WOOD-ART-APP-PLACAS-SPEC]]
2. Diagnóstico do site atual no Wix (avaliação negativa) — decisão pendente: migrar ou não
3. Loja virtual própria (Mercado Pago + Correios + estoque), reaproveitando arquitetura do Brazilcomp
4. Chatbot IA para vendas (WhatsApp/Telegram/site)
5. Ferramenta de prospecção de leads (restaurantes — tábuas e placas grandes)
6. Tráfego pago Google Ads
7. Dados financeiros de referência (ML e Shopee) para embasar ROI
8. Google Merchant Center
9. Pesquisa de mercado suíço (exportação)
10. Linha de usinagem — estratégia de tráfego e marketing separada
11. Estratégia comercial geral — entrega faseada, análise de produto-piloto de longo prazo

## Como trabalhar este cliente
- Fase atual: **diagnóstico** — só `realvision` + `rv-novo-cliente` ativas. Skills de execução (`proposta-comercial`, site, tráfego pago etc.) só entram após decisão concreta de escopo com o William.
- Meta final desta cadeia de trabalho: proposta comercial pronta → depois, versão em slides (skill `frontend-slides`) para apresentação ao cliente.
- Nunca inventar dados de contato, preço ou prazo — só o que vier da sessão ou do Company OS.
