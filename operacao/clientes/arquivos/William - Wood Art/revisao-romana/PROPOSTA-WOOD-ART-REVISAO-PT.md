# Proposta Comercial — Wood Art (para revisão da Romana)

> Documento extraído do HTML final `PROPOSTA-COMERCIAL-WOOD-ART_09-07-2026_final.html` para facilitar a revisão de texto.
> Cada bloco tem um ID entre colchetes — ao devolver o texto revisado, mantenha os IDs intactos para sabermos exatamente onde recolocar cada trecho no template HTML.
> Os blocos marcados **[ACCORDION]** são textos que ficam escondidos atrás do botão "Saber mais" no site — não aparecem de cara, só quando o cliente clica.

---

## [capa]

Real Vision 360
Proposta Comercial
**Wood Art**
William Maciejewski — Presença Digital Integrada
Placas de Madeira Personalizadas

realvisionmaps.com
09 de Julho de 2026

---

## [secao-1-sumario-executivo]

Run-head: ● Wood Art / Real Vision 360
Eyebrow: Visão Geral
### Sumário Executivo

### [secao-1-cenario-atual] O Cenário Atual

A Wood Art fatura cerca de **R$ 250.000/mês** através das plataformas digitais (R$ 80.000 no Mercado Livre e R$ 170.000 na Shopee). No entanto, a empresa deixa cerca de **R$ 70.000/mês em taxas** nas mãos dos marketplaces — um impacto de quase **R$ 840.000 por ano**.

### [secao-1-diagnostico-tecnico] O Diagnóstico Técnico

Foi feito um investimento recente de R$ 2.000 na plataforma Wix, mas o site atual apresenta falhas críticas:

- **Gargalos de Conteúdo:** Links mortos no rodapé, página de contato com e-mails fictícios de template e página órfã em inglês no meio do site
- **Invisibilidade Local:** Wood Art não possui presença no Google Maps — clientes que buscam no ABC não encontram a oficina
- **Limitação de Escala:** Wix tem banco de dados fechado e infraestrutura travada — não sustenta automações futuras

### [secao-1-estrategia-proposta] A Estratégia Proposta

Criação de um ecossistema digital proprietário em módulos independentes, para que o William decida o ritmo ideal de implementação:

- **Fase Base:** Migração para plataforma própria, eliminando taxas de checkout e travamentos
- **Fase de Automação:** App + Chatbot — automatizar orçamentos manuais e atendimento
- **Fase de Atração:** Google Maps, Google Shopping e prospecção B2B

---

## [secao-2-fases-intro]

Run-head: ● Escopo / 8 Fases
Eyebrow: Escopo
### Fases da Proposta

Cada fase é independente — o William decide o que faz sentido agora. Clique em "Saber mais" para ver os detalhes de cada fase.

---

### [fase-01] FASE 01 — Website + Loja Virtual Própria

**O que é?** Migração do site atual (Wix) para um site/loja próprio, construído do zero com a stack da Real Vision (React + Vite + Tailwind + Supabase + Mercado Pago). A loja virtual já está incluída neste valor. A linha de usinagem (peças de metal) vende como categoria dentro da mesma loja.

**Pra que serve?** Substituir o site Wix atual por uma plataforma que o William controla de verdade — sem banco de dados fechado, sem taxa de 1% do Wix no checkout, sem risco de lock-in. É a base técnica para tudo que vem depois.

**Valor indicativo:** R$ 6.500 (pacote fechado, com ~22% de desconto sobre a soma dos módulos)
**Manutenção mensal:** R$ 500/mês · Hospedagem VisionCloud: R$ 100/mês · Manutenção + 2 posts blog: R$ 400/mês

**[fase-01-accordion] [ACCORDION — "Saber mais — detalhes da entrega"]**

O que a loja inclui (ordenado pela jornada do cliente):

1. Página institucional (home, sobre, "Nossa História", contato real)
2. Catálogo/loja (produto, carrinho, checkout Mercado Pago, frete Correios)
3. Painel do cliente (login, histórico de pedidos)
4. Painel administrativo (gestão de produtos, controle de estoque e **painel de status de produção** para a equipe da oficina organizar a fila de execução dos pedidos)
5. Controle completo de vendas — pedido, status, código de rastreio
6. Gestão de estoque
7. E-mails automáticos ao cliente: confirmado → pago → enviado → entregue
8. Financeiro
9. Blog
10. Google Analytics + Search Console (SEO/GEO)

**Configurador de Personalização:** Criação dos campos inteligentes na página do produto para o cliente selecionar o tamanho, tipo de madeira e digitar o texto da gravação antes de comprar. Essa estrutura é a base que deixará o site pronto para o aplicativo com IA na Fase 2.

**Catálogo, Textos e Fotos:** Organização das fotos reais da oficina e criação de textos altamente persuasivos (copywriting) para valorizar o produto premium da Wood Art.

**Gestão Inteligente de Estoque:** Controle automático de disponibilidade para as peças de usinagem e limitação por matéria-prima para as placas (evitando que um cliente compre um tipo de madeira que acabou na oficina).

**Conexão com a Produção Física:** O pedido não gera apenas um e-mail de venda; ele cria uma ordem de serviço digital dentro do painel para a sua equipe saber exatamente o que cortar, entalhar e produzir, organizando a fila da oficina automaticamente.

**[fase-01-callout-wix] Callout — "Por que migrar e não corrigir o Wix"**

O Wix sustenta um site vitrine simples, mas:

- Banco de dados fechado (sem Postgres real) — não permite criar relacionamentos complexos de dados
- Backend travado (~400MB RAM, ~200 req/min) — não sustenta app + estoque + IA
- Pagamento server-to-server descontinuado em 30/09/2026 — fecha a porta para checkout controlado
- Lock-in de infraestrutura — não dá para "tirar o site de dentro do Wix"

**[fase-01-tabela] "Breakdown de investimento (opção 1 — migração completa)"**

| Item | Valor |
|---|---|
| Site institucional + blog (páginas, SEO on-page, formulário de contato) | R$ 2.000 |
| Loja virtual + checkout (Mercado Pago, Correios, carrinho, cálculo de frete) | R$ 2.500 |
| Configurador de personalização (seleção de tamanho, madeira, texto de gravação) | R$ 1.500 |
| Painel administrativo + gestão de produção (pedidos, estoque, fila da oficina) | R$ 1.500 |
| Catálogo inicial, textos e fotos (copywriting, SEO dos produtos) | R$ 833 |
| **Soma dos módulos** | **R$ 8.333** |
| Desconto de ~22% (pacote fechado) | −R$ 1.833 |
| **Total a pagar** | **R$ 6.500** |

**[fase-01-callout-alternativa] Callout — "Opção alternativa — correção pontual no Wix"**

**A partir de R$ 1.500** — cobre: correção dos links mortos do rodapé, substituição do e-mail mock pelo real, remoção da página órfã em inglês, troca das imagens de stock por fotos reais, ajustes de SEO (H1 ausente, alt text, geo tags, og:image).

⚠️ Opção mais barata e rápida, mas **não sustenta o resto do projeto** (app de placas integrado ao site, painel de produção, estoque real).

---

### [fase-02] FASE 02 — App de Placas Personalizadas

**O que é?** Um aplicativo (PWA — Progressive Web App, instalável como app pelo navegador) onde o cliente final da Wood Art monta e compra sozinho a placa personalizada, do começo ao fim, sem o William precisar fazer orçamento manual.

**Pra que serve?** Automatizar a esteira de vendas personalizadas — o cliente escolhe tamanho, madeira, monta a arte (com auxílio de IA), paga, e o pedido cai direto no painel de produção da equipe.

**Valor indicativo:** R$ 2.700 a R$ 3.600 (depende do escopo do configurador)
**Manutenção mensal:** R$ 150 a R$ 300/mês · Pendente: William precisa confirmar o escopo do configurador

**[fase-02-accordion] [ACCORDION]**

Jornada do cliente:

- Escolhe tamanho e tipo de madeira/acabamento
- Monta a arte — digita o texto/gravação, gera sugestão com IA
- Pré-visualiza a placa pronta
- Paga dentro do app (Mercado Pago — cartão, Pix, boleto)
- Informa endereço e dados de entrega

Nos bastidores: o pedido cai num painel interno de produção da Wood Art com a arte final e especificações — a equipe organiza a fila e executa.

**Por que PWA em vez de App Nativo?**

- Mesma experiência de "app instalado" pelo navegador
- Reaproveita 100% da stack do site próprio (React + Vite + Tailwind)
- Sem taxa de loja de aplicativos (15-30%)
- Atualização instantânea (não passa por revisão das lojas)
- App nativo só se justifica se o William fizer questão de estar na Play Store/App Store

Stack proposta: React + Vite + Tailwind (PWA), Supabase (banco/pedidos/auth), Mercado Pago, Correios, OpenAI (geração de arte), Vercel (deploy)

Upgrade para Google Play (Opcional): Embora seja um PWA, a arquitetura permite que, no futuro, a gente "envolva" esse mesmo app e o publique diretamente na Google Play Store com baixo custo de adaptação.

Experiência Nativa no iOS (Apple/iPhone): A Apple não permite a publicação simplificada de PWAs na App Store sem reescrita em código nativo. No entanto, o Safari suporta PWAs perfeitamente — o cliente instala com dois cliques (Compartilhar → Adicionar à Tela de Início).

**[fase-02-callout-ia] Callout — "Observação sobre o módulo de IA (OpenAI)"**

O custo das requisições de IA varia conforme o uso. Implementaremos travas de segurança por usuário (limite de 3 a 5 gerações por sessão). O consumo de créditos da API será repassado diretamente na estrutura de custos operacionais (pay-as-you-go).

---

### [fase-03] FASE 03 — Chatbot com IA

**O que é?** Um assistente de vendas com IA, treinado na base de dados da Wood Art (produtos, dúvidas frequentes, processo de compra), que atende clientes como se fosse um vendedor humano — tira dúvidas, mostra produtos na conversa, e transfere para a equipe quando precisa de humano.

**Pra que serve?** Atendimento 24/7 sem depender do William ou da equipe estarem online. Cliente tira dúvida e recebe recomendação de produto em qualquer horário.

**Desenvolvimento + Treinamento da IA:** R$ 2.900 (custo único). Inclui o cadastro e treinamento do robô nas **80 informações mais importantes do seu negócio**.
**Manutenção mensal:** R$ 350/mês

**[fase-03-accordion] [ACCORDION]**

Como funciona?

- Treinado com o catálogo real da Wood Art (produtos, preços, FAQs)
- Mostra produtos dentro do chat (imagem + info), não só texto
- Identifica quando precisa de humano e transfere para o ramal certo
- Atende múltiplos clientes simultaneamente, sem fila

Entrega independente: não depende do App nem do Website. Pode ir direto no WhatsApp da operação atual do William. Se o site próprio for construído depois, o mesmo bot pode ser integrado nele (custo adicional de integração, não bot novo).

Canais possíveis: WhatsApp (mais natural, onde William já atende), Telegram, site (widget de chat), Instagram DM, qualquer link/QR code

**[fase-03-callout-custos] Callout — "Alinhamento importante sobre custos de terceiros"**

Assistentes com IA consomem processamento em nuvem por volume de texto (tokens). Os custos reais de consumo da API de IA (estimado entre R$ 0,05 a R$ 0,15 por atendimento longo) e a ferramenta de disparo do WhatsApp (média estável de R$ 60 a R$ 99/mês fixos da API de conexão) serão vinculados diretamente ao faturamento pré-pago da própria Wood Art.

---

### [fase-04] FASE 04 — Google Meu Negócio

**O que é?** Criação e otimização do perfil estratégico da Wood Art no Google Meu Negócio — o painel que aparece no topo das pesquisas do Google e no Google Maps quando alguém busca por "placa de madeira personalizada" ou "usinagem de metal" na região.

**Pra que serve?** Hoje a Wood Art não existe no Google Maps (confirmado por busca real). Cada cliente que pesquisa na sua região encontra os concorrentes, menos você. Ao lado do tráfego pago, este perfil é a principal fonte de visitas gratuitas que você terá.

**Valor:** R$ 300 (criação e posicionamento do perfil do zero)

**[fase-04-accordion] [ACCORDION]**

O que está incluído:

- Criação, configuração e verificação oficial do perfil junto ao Google
- Cadastro estratégico de palavras-chave: nome, segmento, endereço físico/região de atendimento, telefone e horários corretos
- Galeria inicial de alta conversão: fotos reais dos produtos prontos, da oficina e processos de fabricação
- Ativação dos botões de ação rápida: "Acessar Website" e "Chamar no WhatsApp"
- Geração do link direto de avaliações: para enviar aos clientes atuais e acumular "5 estrelas"

Por que fazer agora: É o investimento mais barato, com o maior potencial de retorno imediato. Enquanto o site é desenvolvido nos bastidores, o perfil no Google Maps já gera visibilidade local orgânica.

Pré-requisito para fases seguintes: Este perfil estruturado é obrigatório para alimentar o Google Merchant Center, que exibirá as placas com foto e preço na aba "Shopping" do Google.

---

### [fase-05] FASE 05 — Google Merchant Center

**O que é?** Integração e homologação da sua loja virtual dentro do Google Merchant Center. É a plataforma oficial que coloca as fotos, preços e links das suas placas de madeira e peças de usinagem direto na aba "Shopping" do Google e nas buscas de imagens.

**Pra que serve?** Garantir que os produtos cadastrados no seu site apareçam de forma automática na maior vitrine de compras do mundo. Canal complementar que funciona sem taxas por transação.

**Valor indicativo:** R$ 650 (taxa única de engenharia e homologação do feed)

**[fase-05-accordion] [ACCORDION]**

Como funciona na prática:

- **Sincronização Automática:** Feed de dados automatizado no banco de dados do novo site. Você cadastra o produto uma vez; o sistema avisa o Google e atualiza preços, fotos e estoque de forma 100% automática.
- **Pronto para Buscas por IA:** Esse feed alimenta os novos motores de busca por IA do Google. Quando alguém pedir recomendações, seus produtos aparecem como indicação oficial com foto e link direto.

Elegibilidade Orgânica e Paga: Deixaremos a conta configurada tanto para as listagens gratuitas do Google quanto preparada para receber anúncios patrocinados (Google Shopping Ads), caso decida investir em tráfego pago no futuro.

---

### [fase-06] FASE 06 — Tráfego Pago — Google Ads

**O que é?** Planejamento, criação e gestão das campanhas de anúncios patrocinados no Google Ads. É a estratégia de pagar para a sua marca aparecer no topo do Google no exato momento em que alguém busca por placas personalizadas ou usinagem de metal.

**Pra que serve?** Romper a dependência de marketplaces como Mercado Livre e Shopee. Com a loja própria estruturada, os anúncios atraem clientes qualificados direto para o seu ambiente, aumentando a sua margem de lucro por venda.

**Valor indicativo:** A partir de R$ 600/mês pela gestão estratégica (ajustado conforme o teto da verba mensal de anúncios escolhida)

**[fase-06-accordion] [ACCORDION]**

Como funciona na prática?

- **Estratégia Bifocal (B2C + B2B):** Campanhas separadas — uma para cliente final (placas decorativas) e outra para empresas/indústrias (usinagem de metal)
- **Rastreamento Avançado de Vendas:** Integração da API de Conversão do Google Ads no backend do novo site. Saber exatamente quais anúncios geram vendas reais
- **Otimização e Escala:** Curadoria semanal de termos de busca, negativando cliques inúteis e focando nas palavras-chave com maior retorno
- **Transparência:** Relatórios mensais simplificados mostrando o quanto foi investido e o quanto retornou em faturamento direto

**[fase-06-callout-ordem] Callout — "Por que é a última fase do ecossistema"**

Não faz sentido financeiro investir em anúncios enviando pessoas para o site Wix atual (com links quebrados e problemas de conversão). Primeiro arrumamos a casa, depois abrimos as portas para o tráfego.

Pendentes para alinhar com o William:

- Definição do orçamento inicial de mídia (verba paga direto ao Google, ex: R$ 20 ou R$ 50 por dia)
- Alinhamento se iniciaremos apenas pela rede de pesquisa ou com Google Shopping (Fase 5) em paralelo

---

### [fase-07] FASE 07 — Prospecção de Leads — Restaurantes (B2B)

**O que é?** Pesquisa e captação de restaurantes como novo canal B2B para vender tábuas e placas maiores de madeira personalizada — público diferente do B2C que o William atende hoje no ML/Shopee.

**Pra que serve?** Abrir uma nova frente de receita B2B sem aumentar a dependência de marketplaces. Restaurantes são compradores recorrentes de tábuas e peças decorativas de madeira.

**Valor:** a combinar — depende da região e volume por rodada

**[fase-07-accordion] [ACCORDION]**

Modelo de entrega (confirmado com Felipe):

- A Real Vision pesquisa e entrega **apenas a planilha de contatos** (nome, WhatsApp/e-mail, região)
- William aborda os leads por conta própria
- NÃO inclui abordagem ativa pela RV nem fechamento de vendas

Ferramentas e metodologia: Apollo.io + Vibe Prospecting + metodologia rv-prospeccao

Pendente para fechar o valor: região(ões)-alvo e volume de contatos por rodada

Diferença entre prospecção e tráfego pago: são duas frentes de aquisição complementares — a prospecção é ativa (RV entrega contatos, William aborda), o tráfego pago é passivo (anúncio atrai o cliente). Podem rodar juntas ou separadas.

---

### [fase-08] FASE 08 — Painel Financeiro Unificado

**Diferencial Exclusivo:** incluso no valor da Fase 1.

**O que é?** Uma central de inteligência financeira integrada diretamente no painel administrativo do seu novo site. Ela unifica e padroniza os dados de vendas da sua loja própria com as vendas do Mercado Livre e da Shopee em um único lugar.

**Pra que serve?** Acabar com a descentralização de dados. Hoje, para ver o faturamento real, você precisa abrir três plataformas diferentes (ML, Shopee e Wix). O painel consolida tudo automaticamente, descontando as taxas de cada marketplace.

**[fase-08-accordion] [ACCORDION]**

Como funciona na prática?

- **Conexão Direta (Mercado Livre & Shopee):** Utilizaremos as APIs oficiais das plataformas. O sistema fará uma varredura automática periódica para puxar novos pedidos, valores de frete, status de entrega e as comissões cobradas.
- **Relatório de Performance do Google Ads:** Em vez de faturamento (já que o Merchant Center não processa vendas diretas), o painel exibirá as métricas de cliques, impressões e custo por conversão dos seus anúncios no Google.
- **Segurança de Dados:** Todo o fluxo de autenticação das suas contas de marketplace (chaves OAuth2) ficará guardado com criptografia no banco de dados do Supabase.

**[fase-08-callout-shopee] Callout — "Alinhamento de Prazo Técnico (Shopee)"**

A integração com o Mercado Livre é imediata. No entanto, o ecossistema da Shopee (Open Platform) exige uma homologação manual e revisão do aplicativo deles para liberação do acesso interno de dados. O desenvolvimento será feito de prontidão, mas a ativação final dependerá do tempo de aprovação deles.

---

## [secao-3-fora-escopo]

Eyebrow: Próximos Passos
### Fora do Escopo Atual

Citados como oportunidades futuras, sem precificação nesta proposta:

- **Mercado Suíço (exportação):** pesquisa exploratória já feita — existe mercado, mas frete/alfândega/câmbio ainda não calculados
- **Idioma alemão / inglês no site:** extensão técnica natural (i18next já na stack), mas primeiro o site em português precisa existir
- **Usinagem como site separado:** as peças de metal vendem como categoria dentro da mesma loja — evita duplicar infraestrutura

---

## [secao-4-investimento]

Run-head: ● Investimento / Valores consolidados

**Custos Únicos:**

| Item | Valor |
|---|---|
| Website / Loja Própria (migração completa) | R$ 6.500 |
| Alternativa: Correção pontual no Wix | a partir de R$ 1.500 |
| Google Meu Negócio | R$ 300 |
| App de Placas Personalizadas | R$ 2.700 a R$ 3.600 |
| Chatbot com IA | R$ 2.900 |
| Prospecção de Leads | A combinar |
| Google Merchant Center | R$ 650 |
| Painel Financeiro Unificado | Incluso na Fase 1 |
| Tráfego Pago (gestão Google Ads) | A partir de R$ 600/mês |

**Custos Mensais:**

| Item | Valor |
|---|---|
| Hospedagem VisionCloud | R$ 100/mês |
| Manutenção + 2 posts blog/mês | R$ 400/mês |
| Total manutenção site | R$ 500/mês |
| Manutenção App de Placas | R$ 150 a R$ 300/mês |
| Manutenção Chatbot IA | R$ 350/mês |

**[secao-4-callout] Callout — "Observação"**

App de Placas não tem valor fechado porque depende do escopo do configurador que o William ainda vai definir (tamanhos, madeiras, acabamentos). Prospecção de Leads depende de região e volume por rodada.

---

## [secao-5-cronograma]

Eyebrow: Cronograma
### Cronograma Estimado

Prazos contam a partir da aprovação de cada fase. Fases independentes podem rodar em paralelo.

1. Google Meu Negócio — 2 a 3 dias — entrega mais rápida
2. Website / Loja Própria — 3 a 4 semanas — após confirmação do escopo
3. App de Placas — 2 a 3 semanas — independente
4. Chatbot IA — 1 a 2 semanas — independente
5. Google Merchant Center — 1 semana — independente
6. Prospecção de Leads — 1 semana — independente
7. Tráfego Pago — Contínuo — só depois do site no ar

---

## [secao-6-como-seguir]

Eyebrow: Próximos passos
### Como Seguir

1. William revisa esta proposta e decide quais fases fazer agora
2. Confirmar escopo do App — quantos tamanhos, madeiras, acabamentos, opções de personalização
3. Decidir entre migrar, corrigir o Wix ou não fazer nada — recomendação técnica é migrar
4. Escolher canal do Chatbot — WhatsApp? Instagram? Site? Multi-plataforma?
5. Definir região e volume da Prospecção de leads B2B
6. Agendar call com a Real Vision para alinhar cronograma e dar o start

**[assinatura]**

Felipe Garcia
Real Vision 360
adm@realvisionmaps.com · realvisionmaps.com

---

## [rodape]

Real Vision 360 · Presença Digital Integrada · realvisionmaps.com
