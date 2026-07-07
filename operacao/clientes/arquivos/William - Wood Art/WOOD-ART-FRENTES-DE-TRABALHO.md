
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

**O que é:** loja virtual própria, adaptada à realidade do William, reaproveitando a arquitetura já criada para o cliente Dorival (repo Brazilcomp) como base técnica — integração via API com a conta Mercado Pago do William, arquitetura própria da Real Vision, conexão com API dos Correios para envio, banco de dados, cadastro de produtos e gestão de estoque. **O custo do "website" apresentado ao William já inclui essa loja virtual — não é item separado.** Estrutura pensada para comportar mais de uma categoria de produto (placas Wood Art + peças de usinagem, ver item 10) na mesma loja.

**Por que importa:** objetivo principal do William hoje é captar mais clientes e fugir das taxas do Mercado Livre e Shopee, vendendo direto pelo próprio site — hoje ele só usa o gateway nativo do Wix, sem gateway próprio. O site também vai incluir um painel administrativo financeiro unificado (vendas do site + Mercado Livre + Shopee num só lugar) — detalhado em [[WOOD-ART-FINANCEIRO-ROI]].

**Status atual:** ideia definida, nada construído. Ver opinião sobre reaproveitamento do Brazilcomp em [[WOOD-ART-PROJETO]].

**Decisão pendente:** precificar o desenvolvimento separadamente e montar pacotes de proposta. Também é preciso convencer o William de que ter sua própria experiência de compra é a melhor saída a longo prazo — construir esse argumento na proposta.

---

## 4. Chatbot com IA

**O que é:** assistente de vendas com IA, humanizado, treinado com a base de dados da Wood Art (produtos, dúvidas frequentes) — tira dúvidas como um vendedor, mostra produtos dentro do próprio chat, integra conceitualmente com o Google Merchant Center, e transfere para os ramais certos da equipe quando precisa de toque humano. Pode atuar em WhatsApp, Telegram, site, Instagram ou qualquer link, com custo de integração por plataforma. Spec completa + custos em [[WOOD-ART-CHATBOT-IA-SPEC]].

**Por que importa:** atendimento automatizado escalável, sem depender do William ou da equipe estarem disponíveis o tempo todo; acesso rápido à informação é fator decisivo na escolha de onde comprar.

**Status atual:** spec conceitual pronta (06/07/2026) — entrega independente do App de Placas e do Website, pode ir no WhatsApp da operação atual do William sem depender das outras duas frentes.

**Decisão pendente:** canal prioritário de lançamento, se quer multi-plataforma desde já ou começar por um canal, volume esperado de conversas (define custo real de manutenção) — ver [[WOOD-ART-CHATBOT-IA-SPEC]].

---

## 5. Ferramenta de prospecção de leads (restaurantes)

**O que é:** prospecção B2B voltada a restaurantes, para vender tábuas e placas maiores de madeira personalizada — público diferente do B2C que o William atende hoje. É uma das duas frentes de aquisição possíveis para esse público (a outra é tráfego pago, item 6 abaixo). Processo detalhado + ferramentas (Apollo, Vibe Prospecting, metodologia `rv-prospeccao`) em [[WOOD-ART-PROSPECCAO-LEADS-SPEC]].

**Por que importa:** William pediu para testar essa frente — é um público B2B diferente do B2C que ele atende hoje.

**Status atual:** spec de processo pronta (06/07/2026, sem execução de busca real ainda). Modelo de entrega confirmado: RV pesquisa e entrega **apenas a planilha de contatos**, William aborda por conta própria.

**Decisão pendente:** região(ões)-alvo e volume de contatos por rodada — ver [[WOOD-ART-PROSPECCAO-LEADS-SPEC]].

---

## 6. Tráfego pago (Google Ads)

**O que é:** orçamento e escopo de tráfego pago no Google Ads, para vender fora do Mercado Livre. É a segunda frente de aquisição possível para o público de restaurantes (a primeira é prospecção ativa, item 5 acima) — podem rodar em paralelo ou separado.

**Por que importa:** hoje esse é o maior gargalo do William — toda a venda depende de marketplaces com taxas altas.

**Status atual:** pedido do cliente, sem escopo definido ainda.

**Decisão pendente:** orçamento mensal de mídia, público-alvo, e se roda em paralelo com o lançamento do site próprio (site precisa existir antes do tráfego fazer sentido).

**Modelo de cobrança:** ainda em estudo pela Real Vision — a forma de cobrar a gestão de tráfego depende de dados que só o William pode definir: duração das campanhas, plataforma(s) escolhida(s), orçamento mensal de mídia que ele está disposto a investir. O custo mensal da gestão de tráfego pago pela RV só pode ser calculado depois desses três dados confirmados. Reforça-se: esta frente é etapa futura, só depois do site/loja estarem no ar.

---

## 7. Dados financeiros do cliente (referência para ROI)

- **Mercado Livre:** vende em média R$80.000/mês em mercadoria; paga R$20.000/mês de taxa; gasta R$4.000/mês em anúncios.
- **Shopee:** paga em média R$50.000/mês de taxa; fatura R$170.000/mês; gasta R$6.000/mês em anúncios na plataforma.

**Por que importa:** esses números embasam o argumento de ROI da migração para canal próprio — quanto ele economizaria em taxas versus o investimento em site + tráfego pago. Lógica do cálculo (sem números fechados, pendente de dados) e o painel financeiro unificado que vai organizar tudo isso: [[WOOD-ART-FINANCEIRO-ROI]].

---

## 8. Google Merchant Center

**O que é:** cadastro dos produtos do William no Google Merchant Center, para aparecerem em buscas e Google Shopping. Um único cadastro abre elegibilidade para múltiplas superfícies de venda — Shopping Ads, listagens orgânicas gratuitas, e superfícies emergentes de compra via IA. Detalhamento em [[WOOD-ART-FINANCEIRO-ROI]].

**Por que importa:** mais um canal de descoberta de produto, complementar ao site próprio, sem taxa por venda.

**Status atual:** verificar viabilidade.

**Decisão pendente:** repassar ao William o que precisa ser feito, quanto custa e por que é importante — mesma filosofia a aplicar em toda a proposta comercial.

---

## 9. Mercado suíço

**O que é:** pesquisa do mercado suíço de placas de madeira estilizadas, para avaliar viabilidade de exportação.

**Por que importa:** possível expansão internacional — a RV já tem experiência com o mercado suíço (clientes Solarium Aarau, Sunbite).

**Status atual:** pesquisa exploratória feita em 06/07/2026 — ver [[WOOD-ART-MERCADO-SUICO]] (existe mercado, mas nicho seletivo/patriótico; ângulo de entrada realista é personalização sob encomenda, não exotismo tropical; frete/alfândega/câmbio são o risco central, ainda não calculado).

**Decisão pendente:** esta é uma etapa futura, condicionada ao William decidir expandir — não faz parte do escopo atual da proposta. Plano de cálculo de custo (frete, alfândega, câmbio) documentado em [[WOOD-ART-MERCADO-SUICO]].

---

## 10. Linha de usinagem (peças sob demanda)

**O que é:** empresa separada do William, com placas de madeira e peças de metal sob demanda — vendida hoje só via Shopee e Mercado Livre.

**Por que importa:** William tem dificuldade em encontrar clientes fora desses marketplaces; precisa de estratégia de marketing e tráfego pago própria para achar o público-alvo dessas peças.

**Status atual:** dependência total de Shopee/ML hoje.

**Decisão pendente:** estratégia de aquisição de clientes específica para esse produto — separada da estratégia da Wood Art (placas personalizadas).

**Recomendação (06/07/2026):** vender as peças de metal como categoria dentro da mesma loja virtual da Wood Art (item 3), não em site separado. O backend (banco, admin, pagamento, frete) já está sendo construído do zero para a loja principal — duplicar isso num segundo site dobraria custo de desenvolvimento/manutenção e dividiria a autoridade de domínio/SEO à toa. O tráfego pago pode rodar em campanhas separadas dentro do mesmo Google Ads, mirando o público de usinagem sem precisar de uma segunda infraestrutura.

**Nota de longo prazo:** ao estruturar o sistema do William, será necessário analisar qual produto tem melhor venda, mais fluxo, é mais simples/barato de produzir e tem maior potencial — esse cálculo é um processo de longo prazo, feito aos poucos com o cliente, não uma decisão desta fase.

---

## 11. Estratégia comercial geral

**O que é:** fechar tudo em várias etapas, entregando os sistemas aos poucos — mas o Felipe está aberto a outras abordagens de sequenciamento. Isso deve ser apresentado ao William como **sugestão da Real Vision**, não imposição — ele decide a ordem final.

**Por que importa:** o volume de frentes é grande demais para uma entrega única; faseamento reduz risco e permite validar cada entrega antes da próxima.

**Status atual:** análise de sequenciamento feita em 06/07/2026, com base nas dependências técnicas já documentadas em cada frente.

**Ordem recomendada e porquê:**

1. **Website / loja própria** (item 3, incl. categoria usinagem) — base técnica de quase tudo (painel admin, catálogo, Mercado Pago, Correios, estoque). Merchant Center (8) precisa do feed de produtos dela; tráfego pago (6) só faz sentido com ela no ar; usinagem (10) entra como categoria dentro da mesma loja. Fazer primeiro evita retrabalho nas frentes seguintes.
2. **App de Placas Personalizadas** (item 1) — o configurador é uma feature construída em cima da loja (catálogo/checkout) do passo 1, não uma infraestrutura própria.
3. **Chatbot IA** (item 4) **+ Prospecção de leads** (item 5) — em paralelo aos passos 1 e 2. São as únicas duas frentes explicitamente independentes (não dependem do site nem do app), baratas e rápidas — entregam valor visível ao William enquanto a parte maior é construída.
4. **Google Merchant Center** (item 8) — ativado assim que o site tiver catálogo/feed pronto (pré-requisito técnico).
5. **Tráfego pago / Google Ads** (item 6) — por último entre as frentes ativas; não faz sentido pagar anúncio direcionando tráfego para o Wix atual ou para um site que ainda não existe.

**Fora do escopo desta fase:** mercado suíço (item 9) e a estratégia de longo prazo de produto-piloto da usinagem (nota do item 10) — futuros, condicionados a decisão do William.

**Decisão pendente:** apresentar esta ordem ao William como recomendação da RV, deixando explícito que ele pode escolher outro sequenciamento.

---

## Primeiro passo acordado

Antes de qualquer proposta ou decisão de escopo: **analisar a fundo a realidade atual do cliente**. Nada listado acima está decidido — este documento é o mapa de ideias para embasar essa análise e, na sequência, a proposta comercial.
