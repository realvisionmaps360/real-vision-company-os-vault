
> Levantamento completo feito em 03/07/2026. Dossiê principal em [[WOOD-ART-PROJETO]].
> Nenhuma frente está decidida ainda — este documento organiza as ideias para a análise e a proposta comercial.

---

## 1. Aplicativo de criação de placas personalizadas

**O que é:** app onde o cliente final cria sozinho a arte da placa — escolhe tamanho, define o texto/gravação, paga dentro do app, informa endereço e dados de entrega. As informações seguem para um sistema interno onde a equipe do William organiza a produção.

**Por que importa:** tira o William do meio do processo de orçamento manual e cria uma esteira de produção automatizada.

**Status atual:** ideia inicial, nada desenvolvido.

**Decisão pendente:** escopo do configurador (quais opções de personalização), e como integrar com o sistema de produção interno da Wood Art.

---

## 2. Situação atual do site (Wix)

**O que é:** site atual, feito por terceiro há 1-2 meses (investimento de R$2.000), com loja virtual nova (1 venda até agora). Wix cobra 1% de taxa no checkout.

**Diagnóstico feito (navegação completa):**
- Rodapé com botões não clicáveis (Nossa História, Fale Conosco, Política de Privacidade) — só texto, não levam a lugar nenhum
- Navegação confusa, difícil saber em qual página está
- Quase nenhuma informação sobre os produtos
- Página de contato com e-mail mock em vez do e-mail real — inadmissível
- Site desorganizado no geral, indicando que o desenvolvedor não terminou o trabalho

**Por que importa:** é a primeira impressão do cliente final — hoje está prejudicando a credibilidade da marca.

**Status atual:** avaliação já comunicada ao William; foi dito que migração é recomendável, mas com análise mais precisa antes (Wix é limitado).

**Decisão pendente:** a proposta comercial deve apresentar as opções (migrar totalmente vs. melhorias pontuais no Wix), para o William escolher — inclusive a opção de ele não querer sair do Wix.

---

## 3. Novo site / loja virtual própria

**O que é:** loja virtual própria, adaptada à realidade do William, reaproveitando a arquitetura já criada para o cliente Dorival (repo Brazilcomp) como base técnica — integração via API com a conta Mercado Pago do William, arquitetura própria da Real Vision, conexão com API dos Correios para envio, banco de dados, cadastro de produtos e gestão de estoque.

**Por que importa:** objetivo principal do William hoje é captar mais clientes e fugir das taxas do Mercado Livre e Shopee, vendendo direto pelo próprio site — hoje ele só usa o gateway nativo do Wix, sem gateway próprio.

**Status atual:** ideia definida, nada construído. Ver opinião sobre reaproveitamento do Brazilcomp em [[WOOD-ART-PROJETO]].

**Decisão pendente:** precificar o desenvolvimento separadamente e montar pacotes de proposta. Também é preciso convencer o William de que ter sua própria experiência de compra é a melhor saída a longo prazo — construir esse argumento na proposta.

---

## 4. Chatbot com IA

**O que é:** chatbot de vendas diretas via WhatsApp, Telegram ou chat dentro do próprio site.

**Por que importa:** atendimento automatizado escalável, sem depender do William ou da equipe estarem disponíveis o tempo todo.

**Status atual:** ideia inicial.

**Decisão pendente:** canal prioritário (WhatsApp vs Telegram vs site) e escopo (responder dúvidas vs. fechar vendas).

---

## 5. Ferramenta de prospecção de leads (restaurantes)

**O que é:** ferramenta de prospecção voltada a restaurantes, para vender tábuas e placas maiores de madeira personalizada.

**Por que importa:** William pediu para testar essa frente — é um público B2B diferente do B2C que ele atende hoje.

**Status atual:** pedido do William, ainda não testado.

**Decisão pendente:** qual ferramenta/metodologia usar (a RV já tem experiência com prospecção via `rv-prospeccao`/Apollo — avaliar reaproveitamento).

---

## 6. Tráfego pago (Google Ads)

**O que é:** orçamento e escopo de tráfego pago no Google Ads, para vender fora do Mercado Livre.

**Por que importa:** hoje esse é o maior gargalo do William — toda a venda depende de marketplaces com taxas altas.

**Status atual:** pedido do cliente, sem escopo definido ainda.

**Decisão pendente:** orçamento mensal de mídia, público-alvo, e se roda em paralelo com o lançamento do site próprio (site precisa existir antes do tráfego fazer sentido).

---

## 7. Dados financeiros do cliente (referência para ROI)

- **Mercado Livre:** vende em média R$80.000/mês em mercadoria; paga R$20.000/mês de taxa; gasta R$4.000/mês em anúncios.
- **Shopee:** paga em média R$50.000/mês de taxa; fatura R$170.000/mês; gasta R$6.000/mês em anúncios na plataforma.

**Por que importa:** esses números embasam o argumento de ROI da migração para canal próprio — quanto ele economizaria em taxas versus o investimento em site + tráfego pago.

---

## 8. Google Merchant Center

**O que é:** cadastro dos produtos do William no Google Merchant Center, para aparecerem em buscas e Google Shopping.

**Por que importa:** mais um canal de descoberta de produto, complementar ao site próprio.

**Status atual:** verificar viabilidade.

**Decisão pendente:** repassar ao William o que precisa ser feito, quanto custa e por que é importante — mesma filosofia a aplicar em toda a proposta comercial.

---

## 9. Mercado suíço

**O que é:** pesquisa do mercado suíço de placas de madeira estilizadas, para avaliar viabilidade de exportação.

**Por que importa:** possível expansão internacional — a RV já tem experiência com o mercado suíço (clientes Solarium Aarau, Sunbite).

**Status atual:** pesquisa ainda não iniciada.

**Decisão pendente:** nenhuma ainda — é etapa de pesquisa exploratória, não de execução.

---

## 10. Linha de usinagem (peças sob demanda)

**O que é:** empresa separada do William, com placas de madeira e peças de metal sob demanda — vendida hoje só via Shopee e Mercado Livre.

**Por que importa:** William tem dificuldade em encontrar clientes fora desses marketplaces; precisa de estratégia de marketing e tráfego pago própria para achar o público-alvo dessas peças.

**Status atual:** dependência total de Shopee/ML hoje.

**Decisão pendente:** estratégia de aquisição de clientes específica para esse produto — separada da estratégia da Wood Art (placas personalizadas).

**Nota de longo prazo:** ao estruturar o sistema do William, será necessário analisar qual produto tem melhor venda, mais fluxo, é mais simples/barato de produzir e tem maior potencial — esse cálculo é um processo de longo prazo, feito aos poucos com o cliente, não uma decisão desta fase.

---

## 11. Estratégia comercial geral

**O que é:** fechar tudo em várias etapas, entregando os sistemas aos poucos — mas o Felipe está aberto a outras abordagens de sequenciamento.

**Por que importa:** o volume de frentes é grande demais para uma entrega única; faseamento reduz risco e permite validar cada entrega antes da próxima.

---

## Primeiro passo acordado

Antes de qualquer proposta ou decisão de escopo: **analisar a fundo a realidade atual do cliente**. Nada listado acima está decidido — este documento é o mapa de ideias para embasar essa análise e, na sequência, a proposta comercial.
