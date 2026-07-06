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
O item **CONTATO** do menu principal *funciona* tecnicamente (é uma página real, `/contact-10`), mas mostra dados de exemplo do template Wix, nunca preenchidos:
- Telefone: `(11) 3456-7890`
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
2. **Melhorias pontuais no Wix atual** — corrige o crítico (contato mock, links mortos, remover página órfã, trocar fotos de stock). Mais barato e rápido, mas — confirmado na pesquisa da seção 3 — **não dá para construir o resto do projeto (app de placas, painel de produção, estoque real) dentro do Wix.** Quem escolher esta opção sabe que fica só com o site institucional corrigido, sem o resto.
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

## Próximo passo

Com este diagnóstico e a spec do app de placas prontos, os dois documentos alimentam a **proposta comercial** (skill `proposta-comercial`) — como **duas linhas de entrega separadas**: 1ª o App de Placas, 2ª o Website. Antes de montar a proposta, confirmar com o William:
- Escopo do configurador do **app** (pendente, ver [[WOOD-ART-APP-PLACAS-SPEC]]) — define horas/valor da 1ª entrega
- Preferência do William entre as 3 opções do **website** (seção 4 acima) — define horas/valor da 2ª entrega
