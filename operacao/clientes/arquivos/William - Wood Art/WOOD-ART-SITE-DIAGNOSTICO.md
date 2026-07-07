# Wood Art — Diagnóstico do Site Atual (Wix) + Avaliação Brazilcomp

> Documento interno de diagnóstico. Base para a linha de item na proposta comercial.
> Cliente: William (Wood Art). Dossiê: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]] · App de Placas: [[WOOD-ART-APP-PLACAS-SPEC]]
> Criado: 06/07/2026
> 🎯 **Objetivo desta fase:** reunir evidências reais do site atual e avaliar a viabilidade técnica de reaproveitar o Brazilcomp. Nenhuma construção começa ainda — decisão de migrar ou não é do William.

> ⚠️ **Este documento é a 2ª entrega da proposta ao William: o WEBSITE.** É separada da 1ª entrega, o **App de Placas Personalizadas** ([[WOOD-ART-APP-PLACAS-SPEC]]). São duas frentes distintas com escopo, horas e decisões próprias — não misturar as duas na hora de apresentar ou precificar. O app é a ferramenta de personalização/venda self-service; o website é a loja virtual própria que substitui (ou não) o Wix atual.

---

## 1. Site atual — woodartstore.com.br (Wix)

Navegação ao vivo feita em 06/07/2026. Achados confirmados com evidência (não é opinião solta):

### 1.1 Rodapé com links mortos
Os 4 links do rodapé (**Nossa história, Fale conosco, Políticas de Privacidade, Trocas e Devoluções**) não navegam para lugar nenhum — são texto estático, sem destino. Testado clique a clique, nenhum reage.

### 1.2 Página de contato com dados falsos (mock)
O item **CONTATO** do menu principal *funciona* tecnicamente (é uma página real, `/contact-10`), mas mostra dado de exemplo do template Wix, nunca preenchidos:

- Email: `info@meusite.com`

Ou seja: qualquer cliente que tentar ligar ou mandar e-mail pelo site cai em contato fictício. Isso é mais grave do que "informação faltando" — é informação errada publicada.

### 1.3 Página órfã do template, em inglês, no menu principal
O item de menu **"Inquiry Services Page"** (nome em inglês, destoando do resto do site em PT) leva a uma página inteira de template Wix nunca adaptada: título "Nossos serviços", 3 blocos genéricos de consultoria ("Projeto Personalizado", "Planejamento de Solução", "Pacote Orientação Especializada") com **fotos borradas/genéricas de stock**, sem nenhuma relação com placas de madeira. Está publicada e visível para qualquer visitante.

### 1.4 Imagens de stock desconexas do produto
Na seção "Clientes satisfeitos" da home, as imagens usadas são fotos de **paisagismo/arquitetura residencial** (piscina, jardim, varanda) — nada a ver com placas de madeira personalizadas. Aparenta ser imagem de banco de imagens genérica deixada pelo desenvolvedor anterior, nunca substituída pelas fotos reais do produto/cliente.

### 1.5 O que funciona bem (para não subestimar o que já existe)
- Catálogo de produtos com preços carrega normalmente (tábuas, placas, petisqueiras — 10+ itens visíveis).
- Identidade visual (logo, paleta madeira/dourado) está definida e é consistente nas páginas testadas.
- Rodapé mostra CNPJ e endereço reais da empresa (`51.320.796/0001-09`, Estrada Poney Club 1717, SBC/SP) — isso está correto, ao contrário do e-mail/telefone de contato.
- Navegação por categoria (Tábuas, Placas Rústicas) existe e filtra.

### 1.6 Leitura geral
O diagnóstico anterior ("desenvolvedor não terminou o trabalho") se confirma com evidência concreta: não é um site quebrado, é um site **publicado antes de terminar a revisão de conteúdo** — sobrou template genérico do Wix junto com conteúdo real do William. Isso prejudica a credibilidade de um negócio que hoje fatura ~R$250k/mês somando ML+Shopee (ver [[WOOD-ART-FRENTES-DE-TRABALHO]], item 7) — o site próprio é a vitrine que deveria sustentar esse volume, e hoje não sustenta.

### 1.7 Auditoria SEO e GEO do site atual (Wix)

Leitura técnica feita em 07/07/2026 no código-fonte da home (`woodartstore.com.br`), usando o checklist da skill `05-marketing-seo`.

**O que já está bem:**
- `robots.txt` e `sitemap.xml` existem e estão referenciados corretamente
- Meta title, meta description, canonical e Open Graph básico (title/description/url) presentes
- Schema JSON-LD de `LocalBusiness` já implementado, com endereço completo (São Bernardo do Campo-SP) e telefone — isso ajuda SEO local e também GEO (IA generativa cita negócios com dados estruturados claros)
- Schema `WebSite` com `SearchAction` (habilita sitelinks search box no Google)

**Problemas encontrados:**
1. **Nenhum `<h1>` na página inteira** (confirmado: 0 ocorrências) — o sinal semântico mais forte de "do que a página trata" está ausente, tanto para Google quanto para IA generativa resumir a página.
2. **Sem `og:image`** — link compartilhado no WhatsApp/Instagram/LinkedIn não mostra nenhuma imagem de preview, o que derruba CTR em compartilhamento.
3. **Meta description genérica e sem geolocalização** — não menciona cidade/região nem tem CTA; oportunidade perdida tanto para SEO local quanto para GEO (que se apoia em contexto geográfico explícito).
4. **Title com keyword duplicada** — "tabuas e placas personalizadas em madeira | placas personalizadas em madeira" repete a mesma keyword, parecendo keyword stuffing.
5. **45 de 58 imagens sem `alt` text** (13/58 com alt) — ruim para acessibilidade, SEO de imagem, e para IAs que leem a página via alt text.
6. **Sem tags de geo (`geo.region`, `geo.position`)** no `<head>` — reforço de localidade ausente.
7. **Sitemap de páginas institucionais é curto** (home, contato, sobre, brindes corporativos, bares/restaurantes) — catálogo de produtos fica em sitemap separado, não auditado a fundo nesta rodada.

**Leitura geral:** o site não está "quebrado" em SEO — o básico funciona (schema, sitemap, meta tags) — mas está longe do ideal. Para GEO, o `LocalBusiness` schema é o ponto mais forte hoje; o resto (H1 ausente, alt text quase inexistente, copy sem geolocalização) ainda não dá munição suficiente para uma IA generativa "entender" e recomendar a Woodart com confiança.

**Implicação de precificação (ver seção 4):**
- Se o William escolher a **opção 2 (melhorias pontuais no Wix)**: os 7 pontos acima entram como itens de correção técnica de SEO/GEO, além dos críticos de conteúdo já listados (1.1 a 1.4) — ampliando levemente o escopo (e o preço) dessa opção, mas dentro da mesma lógica de "remendo no Wix".
- Se o William escolher a **opção 1 (migração para site próprio)**: esses pontos já nascem resolvidos por padrão de construção da Real Vision (H1 correto, alt text em toda imagem, geo tags, og:image) — não é item à parte, é parte do que já vem embutido no novo site (reforça a seção 5.2 abaixo).

---

## 2. Avaliação técnica — reaproveitamento do Brazilcomp

Repositório de referência: `github.com/realvisionmaps360/brazilcomp-2-97cf7219` (cliente Dorival).

### 2.1 Stack (confirmado via `package.json`)
React 18 + Vite + TypeScript + Tailwind + shadcn/ui (Radix) + Supabase (`@supabase/supabase-js`) + TanStack Query + i18next. Deploy via Vercel (`vercel.json` presente).

**Leitura:** é exatamente a stack que a Real Vision já usa em projetos recentes (Conecta Saúde, cartões digitais) — curva de adaptação baixa, sem tecnologia nova a aprender.

### 2.2 O que já está pronto e é reaproveitável (confirmado via `BRAZILCOMP-2.0-ARQUITETURA-LEGADO.md`)
- Cadastro/login (CPF/CNPJ, Google, recuperação de senha)
- Catálogo de produtos com busca, filtros e página de detalhe
- Carrinho persistente (visitante via localStorage, logado via banco) com merge automático no login
- Frete real via API (Frenet) com regra de frete grátis configurável
- Checkout completo com **Mercado Pago** (preferência de pagamento + webhook validado por HMAC + idempotência)
- Pedidos com linha do tempo de status (confirmado → pago → separando → enviado → entregue)
- E-mails transacionais via Resend (confirmação, envio, cancelamento)
- Painel admin com gestão de pedidos (mudança de status, código de rastreio)
- Suporte pós-venda (abertura de chamado vinculado ao pedido)

Isso é a base inteira de e-commerce que o William precisaria do zero — já construída, testada e rodando em produção para outro cliente.

### 2.3 O que falta construir especificamente para o William (não existe no Brazilcomp)
- **Configurador de placa personalizada** (o "brick" que falta — feature nova, é o coração do pedido do William)
- CRUD completo de produtos + gestão de estoque no painel admin (o Brazilcomp também ainda não tem isso pronto — está listado como pendência dele, ver seção "O que ainda NÃO existe" do doc de arquitetura)
- Todo o catálogo, copy, fotos e identidade visual — refeitos do zero para a marca Wood Art
- Integração com o processo de produção física da fábrica do William (ver [[WOOD-ART-APP-PLACAS-SPEC]], seção 7)

### 2.4 Conclusão da avaliação
**Tecnicamente viável e recomendável.** O Brazilcomp resolve ~70% da infraestrutura de e-commerce (conta, carrinho, frete, pagamento, pedido, admin) que o William precisaria pagar do zero. O trabalho real fica concentrado no que é específico da Wood Art: configurador de personalização, catálogo/copy/fotos, e conexão com a produção. Isso reduz a estimativa de horas do zero — mas **ainda não foi feita a estimativa de horas fechada desta frente** (fica para quando a proposta comercial for montada, junto com a decisão do William sobre migrar ou não do Wix).

---

## 3. Pesquisa — dá pra fazer tudo dentro do Wix? (respondendo o que foi prometido ao William)

Felipe disse ao William que ia estudar se o Wix avançou o suficiente para dar conta de tudo que o projeto precisa, sem precisar migrar. Pesquisa feita em 06/07/2026 sobre o estado atual da plataforma (Velo, integrações, limites técnicos):

### 3.1 O que o Wix consegue hoje, de fato
- **Configurador de personalização:** existe um mercado de apps prontos para isso — Kickflip, Zakeke, DesignNBuy, Roomle — que adicionam personalização em tempo real (texto, cor, prévia visual) a produtos Wix Stores, via app instalado, sem código. Ou seja: **um configurador simples e genérico dá, sim, para existir dentro do Wix.**
- **Mercado Pago:** é um provedor de pagamento oficialmente suportado pelo Wix Stores (integração nativa via "Connecting Mercado Pago as a Payment Provider"). Funciona no modo Checkout Pro — o cliente é redirecionado para o ambiente do Mercado Pago, paga lá, e volta. É o modelo mais simples e limitado, não o checkout embutido e controlado por webhook que o Brazilcomp usa.
- **Velo (o "modo desenvolvedor" do Wix):** permite escrever backend em JavaScript, criar funções HTTP e conectar a serviços externos — não é só arrasta-e-solta.

### 3.2 Onde o Wix trava — as evidências que sustentam o "não vale a pena"
- **Banco de dados fechado:** o Wix usa "Coleções" próprias, não um Postgres/MySQL de verdade. Conectar a um banco externo **não está disponível no plano gratuito**, não permite índices customizados para consultas mais complexas, e no plano básico o limite é de 1.000 itens somando todas as coleções. Para o volume de pedidos/estoque que o William já movimenta (R$250k/mês em ML+Shopee), isso é uma limitação estrutural, não um detalhe.
- **Backend com recursos travados:** no plano de entrada, o backend roda em um contêiner "micro" com ~1 vCPU e 400MB de RAM, e limite de ~200 requisições por minuto por app. É infraestrutura pensada para sites institucionais com lógica leve — não para uma esteira de produção com controle de estoque, status de pedido e integrações simultâneas (pagamento + frete + IA de geração de arte, que é exatamente o que o App de Placas precisa).
- **Pagamento server-to-server sendo descontinuado:** a própria Wix está **depreciando em 30/09/2026** os métodos de criação de transação e tokenização de cartão via backend (Velo) — ou seja, o caminho para pagamentos iniciados/controlados pelo servidor (o modelo seguro que o Brazilcomp usa: pedido nasce no servidor, webhook valida e confirma) está sendo fechado pelo próprio Wix, não é limitação temporária.
- **Checkout customizado + Mercado Pago:** não existe documentação de um checkout headless/customizado com Mercado Pago dentro do Wix — só o redirecionamento padrão (Checkout Pro). O controle fino de webhook/HMAC/idempotência que o Brazilcomp já tem pronto **não é replicável dentro do Wix**.
- **Lock-in de infraestrutura:** tudo roda dentro da nuvem do próprio Wix. Dá para exportar dados de coleção em JSON, mas não dá para "tirar o site de dentro do Wix" — ele não vira um projeto de código próprio, independente, hospedado onde a Real Vision quiser (Vercel, por exemplo).

### 3.3 Conclusão da pesquisa
**Confirma a intuição do Felipe: o Wix não vale a pena para o que o projeto precisa.** Um configurador simples de personalização até dá para existir dentro do Wix via app de terceiro — mas o resto do que o Wood Art precisa (estoque real, painel de produção ligado à fábrica, checkout controlado por servidor, volume de dados de um negócio de R$250k/mês) esbarra em limites estruturais da plataforma, que a própria Wix está reduzindo ainda mais em 2026 (fim do pagamento server-to-server). Continuar no Wix restringe o projeto a um site de vitrine com loja simples — não sustenta o app de placas nem o painel de produção que o William quer.

**Fontes consultadas:**
- [Velo Docs — dev.wix.com](https://dev.wix.com/docs/velo)
- [Data Features | Velo](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/limits-and-optimization/data-features)
- [Developer Tools Features | Velo](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/limits-and-optimization/developer-tools-features)
- [Developer Changelog — dev.wix.com](https://dev.wix.com/docs/changelog)
- [Connecting Mercado Pago as a Payment Provider — Wix Support](https://support.wix.com/en/article/connecting-mercadopago-as-a-payment-provider)
- [Wix — Mercado Pago Developers](https://www.mercadopago.com.br/developers/pt/docs/wix/connection)
- [Adding a Product Configurator to a Wix Stores Site | Velo](https://dev.wix.com/docs/develop-websites/articles/code-tutorials/wix-e-commerce-stores/adding-a-product-configurator-to-a-wix-stores-site)
- [Kickflip product configurator — Wix App Market](https://www.wix.com/app-market/web-solution/kickflip-customize-products)

---

## 4. Decisão pendente a levar ao William (frente Website)

A proposta comercial deve apresentar as opções, não decidir por ele:

1. **Migrar totalmente para site próprio** (reaproveitando arquitetura Brazilcomp) — resolve taxa de 1% do Wix, dá controle total, sustenta o App de Placas e o painel de produção, mas exige desenvolvimento e catálogo novos.
2. **Melhorias pontuais no Wix atual** — a partir de **R$1.000**, cobrindo as correções listadas na seção 1 (contato mock, links mortos, página órfã, fotos de stock) e os ajustes de SEO/GEO da seção 1.7. Mais barato e rápido, mas — confirmado na pesquisa da seção 3 — **não dá para construir o resto do projeto (app de placas, painel de produção, estoque real) dentro do Wix.** Quem escolher esta opção sabe que fica só com o site institucional corrigido, sem o resto.
3. **Não fazer nada agora** — opção do William, deve estar na mesa.

Nenhuma dessas ainda está decidida. Este documento existe para embasar a proposta, não para fechar escopo.

---

## 5. O que a entrega "Website" (2ª frente) inclui — resumo para apresentar ao William

> Para deixar claro na proposta que App (1ª entrega) e Website (2ª entrega) são coisas separadas.

- Diagnóstico completo do site Wix atual, com os problemas reais encontrados (seção 1 acima)
- Resposta à dúvida que o Felipe levou ao William: dá para fazer tudo dentro do Wix? Não — motivos técnicos na seção 3
- Recomendação de migração para site próprio, reaproveitando ~70% da infraestrutura já pronta no Brazilcomp (login, carrinho, frete, Mercado Pago, pedidos, painel admin)
- O que ainda falta construir especificamente para a Wood Art: catálogo/copy/fotos, CRUD de produtos e estoque, e a conexão do site com o App de Placas (1ª entrega) e com a produção física
- As 3 opções de caminho (seção 4), para o William escolher — sem estimativa de horas fechada ainda

> ⚠️ **Importante para a proposta:** sempre que o custo do "website" for apresentado ao William, deixar claro que **a loja virtual já está embutida nesse valor** — não é um item à parte. O site que a Real Vision entrega já nasce como loja online, com cadastro de todos os produtos da Wood Art (e futuramente da linha de usinagem, ver [[WOOD-ART-FRENTES-DE-TRABALHO]] item 10). Site sem loja não é a proposta.

### 5.1 Resposta à pergunta do William sobre a linha de usinagem

William perguntou especificamente se as peças de metal da usinagem deveriam ter um site próprio ou entrar na mesma loja da Wood Art. Texto de referência para a proposta (linguagem simples, sem jargão técnico):

> "Como o seu site vai ser construído do zero, especialmente pra sua marca, ele não é uma vitrine fechada — é uma estrutura flexível. Isso significa que as peças de usinagem podem entrar como uma seção própria dentro da mesma loja, com sua página e seus filtros, sem precisar criar um site novo do zero pra isso. Resultado: um único lugar pra cuidar, um único investimento de manutenção, e os anúncios pagos continuam podendo ser direcionados separadamente pra cada público — quem procura placa personalizada e quem procura peça de usinagem."

Justificativa técnica por trás (não vai na proposta, fica registrada aqui): duplicar o backend (banco, admin, pagamento, frete) num segundo site dobraria custo de desenvolvimento e manutenção, e dividiria a autoridade de domínio/SEO à toa — ver decisão completa em [[WOOD-ART-FRENTES-DE-TRABALHO]], item 10.

### 5.2 Analytics, SEO e GEO — parte do pacote do site

Junto com a loja virtual, a entrega do site inclui: acesso configurado ao Google Analytics, SEO e GEO. Texto de referência para a proposta:

> "Junto com o site, a gente já deixa configurado o acesso ao Google Analytics — assim você vai poder ver, com dados reais, qual página está trazendo mais visita, quais produtos estão vendendo melhor, e de onde vem esse cliente. Isso é o que permite tomar decisão baseada em fato, não em achismo: onde investir mais, o que tirar do catálogo, pra onde direcionar o próximo anúncio."

- **SEO** — aparecer bem no Google quando alguém busca "placa de madeira personalizada" ou termos parecidos.
- **GEO** — aparecer bem quando alguém pergunta isso pra uma inteligência artificial (ChatGPT, Gemini) em vez de buscar no Google. Referência de linguagem já usada pela Real Vision: post [site-maior-ativo-era-ia](https://realvisionmaps.com) (blog RV, ver [[project_blog_geo]] na memória).

## 6. Evolução natural — idioma alemão (não é escopo agora)

Como o site vai ser construído do zero com código próprio (não uma plataforma fechada como o Wix), adicionar um seletor de idioma (ex.: alemão, mirando o mercado suíço — ver [[WOOD-ART-MERCADO-SUICO]]) é tecnicamente uma extensão natural da mesma arquitetura (o Brazilcomp já usa `i18next`, ver seção 2.1). **Isso não deve ser incentivado nem apresentado como parte do escopo atual** — é uma etapa futura, condicionada ao William decidir expandir para exportação. A analogia certa para a proposta: antes de pensar em receber visita estrangeira, primeiro se arruma a casa — o site/loja virtual em português precisa existir e funcionar bem primeiro.

## 8. Custos de operação mensal do site

O site é entregue com: blog, painel admin, painel do cliente, gestão de produtos, estoque, financeiro, loja virtual, página "Nossa História", Google Analytics e Google Search Console já instalados.

Manter tudo isso no ar tem dois custos mensais separados:

- **Hospedagem (VisionCloud, servidor próprio da Real Vision): R$100/mês**
- **Manutenção geral do site: R$400/mês** — já inclui o pacote de 2 posts de blog por mês, escritos com estratégia de SEO para ranquear na primeira página do Google.

**Total mensal: R$500/mês**, separado do custo único de desenvolvimento do site (a definir conforme a opção escolhida na seção 4).

### 8.1 Estratégia de precificação do custo único (opção 1 — migração completa)

**Ideia do Felipe (07/07/2026):** valor final de **R$4.500** pelo sistema completo (site + loja virtual própria). Em vez de apresentar só esse número fechado, a proposta deve mostrar o preço de cada sistema/módulo separado primeiro (ex.: catálogo/loja, painel admin, painel do cliente, gestão de estoque, blog, financeiro, página institucional, analytics/SEO/GEO), somar tudo, e então mostrar o desconto até chegar nos R$4.500 — para o William perceber visualmente o quanto está economizando ao contratar o pacote fechado em vez dos módulos soltos.

**Pendente para a próxima etapa:** calcular o valor individual de cada módulo/sistema (hoje só o App de Placas tem breakdown de horas por bloco, ver [[WOOD-ART-APP-PLACAS-SPEC]] seção 5.1 — o Website ainda não tem essa quebra). Isso alimenta a montagem final da proposta (skill `proposta-comercial`), não foi calculado ainda nesta sessão.

**Cálculo feito em 07/07/2026** — mesma lógica de horas × R$120/h já usada no App de Placas, aplicada aos módulos do site descritos na seção 8 acima. Estimativa apoiada no reaproveitamento de ~70% do Brazilcomp (seção 2): a maior parte do trabalho é ajuste/adaptação, não construção do zero.

| Módulo | Horas estimadas | Valor (R$120/h) |
|---|---|---|
| Catálogo/loja (produto, carrinho, checkout Mercado Pago, frete Correios) | 12h | R$1.440 |
| Painel administrativo (pedidos, produtos, integração ML/Shopee) | 10h | R$1.200 |
| Painel do cliente (login, histórico de pedidos) | 6h | R$720 |
| Gestão de estoque | 5h | R$600 |
| Página institucional (home, sobre, "Nossa História", contato real) | 4h | R$480 |
| Analytics/SEO/GEO (GA4, Search Console, correção dos achados da seção 1.7) | 5h | R$600 |
| Deploy, testes e ajustes finais | 6h | R$720 |
| **Total dos módulos somados** | **48h** | **R$5.760** |

> Blog não entra nesta tabela como módulo do custo único — já está incluso na manutenção mensal de R$400/mês (seção 8). Painel financeiro unificado (site + ML + Shopee) também não entra aqui: custo/viabilidade técnica ainda pendente, ver [[WOOD-ART-FINANCEIRO-ROI]].

**Apresentação na proposta:** mostrar a soma dos módulos (R$5.760), depois o valor fechado do pacote (**R$4.500**), destacando a economia de **R$1.260 (~22%)** ao contratar o site completo em vez dos módulos separados.

⚠️ Este cálculo é estimativa de apoio à argumentação de desconto — não substitui nem reabre o valor final de R$4.500 já decidido pelo Felipe (fecha o total primeiro, divide depois).

## Próximo passo

Com este diagnóstico e a spec do app de placas prontos, os dois documentos alimentam a **proposta comercial** (skill `proposta-comercial`) — como **duas linhas de entrega separadas**: 1ª o App de Placas, 2ª o Website. Antes de montar a proposta, confirmar com o William:
- Escopo do configurador do **app** (pendente, ver [[WOOD-ART-APP-PLACAS-SPEC]]) — define horas/valor da 1ª entrega
- Preferência do William entre as 3 opções do **website** (seção 4 acima) — define horas/valor da 2ª entrega
