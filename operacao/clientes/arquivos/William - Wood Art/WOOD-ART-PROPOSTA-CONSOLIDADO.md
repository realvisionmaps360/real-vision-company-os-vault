---
title: Wood Art — Consolidado para a Proposta Comercial
tags:
  - cliente
  - proposta
status: pronto-para-redacao
data: 2026-07-07
---

# Wood Art — Consolidado para a Proposta Comercial

> Documento-ponte entre o diagnóstico (11 frentes) e o texto final da proposta (skill `proposta-comercial`). Extraído por agentes em paralelo em 07/07/2026, cada um filtrando "o que vira proposta" vs. "o que fica interno". Fonte de verdade continua sendo os documentos de frente individuais — este arquivo resume e aponta pra eles.
>
> Dossiê completo: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]] · Ficha: [[FICHA-CLIENTE]]

---

## Ordem recomendada de apresentação (sequenciamento — Frente 11)

1. **Website / loja própria** — base técnica de tudo
2. **App de Placas Personalizadas** — configurador construído em cima da loja
3. **Chatbot IA + Prospecção de Leads** — em paralelo, independentes do site/app
4. **Google Merchant Center** — depende do catálogo do site pronto
5. **Tráfego pago** — por último, não faz sentido anunciar sem site no ar

Fora do escopo desta fase: Mercado Suíço (etapa futura, condicionada à decisão do William de exportar) e usinagem como linha separada (vende como categoria dentro da mesma loja — ver seção Website abaixo).

---

## 1. Website / Loja Própria

**Fonte:** [[WOOD-ART-SITE-DIAGNOSTICO]]

**O que é:** migração do site atual (Wix, com falhas reais de conteúdo — links mortos, contato falso, página em inglês esquecida) para um site/loja próprio, reaproveitando ~70% da arquitetura já validada da Real Vision (login, carrinho, frete, Mercado Pago, pedidos, painel admin).

**Por que migrar em vez de corrigir:** o Wix sustenta um site vitrine simples, mas trava no volume e nas integrações que o projeto precisa (banco de dados fechado, backend limitado, e a própria Wix descontinua pagamento server-to-server em 30/09/2026).

**A loja virtual inclui, por padrão:** blog, painel admin, painel do cliente, gestão de produtos e estoque, financeiro, página institucional, Google Analytics e Search Console — a linha de usinagem (peças de metal) entra como categoria dentro da mesma loja, não como site separado.

**Custos:**
- Correção pontual no Wix (opção 2): a partir de **R$1.000**
- Manutenção mensal (qualquer opção com site próprio): **R$500/mês** (R$100 hospedagem + R$400 manutenção, já com 2 posts de blog/mês)
- Migração completa (opção 1) — valor final: **R$4.500**, apresentado com breakdown de módulos (soma R$5.760) mostrando desconto de ~22% — ver seção 8.1 de [[WOOD-ART-SITE-DIAGNOSTICO]]

**Confirmado vs. pendente:** decisão do William entre as 3 opções (migrar / corrigir Wix / não fazer nada agora) ainda em aberto.

**Não entra na proposta:** nome do cliente/repo de referência (Brazilcomp/Dorival), stack técnica detalhada, números brutos de limite do Wix.

---

## 2. App de Placas Personalizadas

**Fonte:** [[WOOD-ART-APP-PLACAS-SPEC]]

**O que é:** app (PWA) onde o cliente final monta e compra sozinho a placa personalizada — escolhe tamanho/madeira, monta a arte com ajuda de IA, paga e informa entrega. Pedido cai automaticamente no painel de produção da equipe.

**Por que PWA:** mesma experiência de app instalado, mais barato e rápido que nativo, sem taxa de loja de aplicativos.

**Custos:**
- Desenvolvimento: **R$3.840** (32h × R$120/h)
- Manutenção mensal: **R$150 a R$300/mês**

**Confirmado vs. pendente:** valor de desenvolvimento só fecha depois que o William confirmar o escopo do configurador (quantos tamanhos, madeiras, acabamentos, moldura opcional) — mais opções, mais horas. Também pendente: se o domínio atual (woodartstore.com.br) se aplica ao app.

**Não entra na proposta:** custos de infraestrutura por trás da mensalidade (Vercel, Supabase, OpenAI), comparativo técnico PWA×nativo em horas, filosofia interna de precificação.

---

## 3. Chatbot com IA

**Fonte:** [[WOOD-ART-CHATBOT-IA-SPEC]]

**O que é:** assistente com IA treinado no catálogo e nas dúvidas frequentes da Wood Art, atende no chat (WhatsApp, Instagram, site), mostra produtos na conversa e transfere para humano quando precisa.

**Por que importa:** atende 24/7 sem depender de alguém da equipe estar online; libera o time pra focar no que exige humano.

**Custos:**
- Desenvolvimento (inclui 1ª integração): **R$1.800**
- Manutenção mensal: **R$300/mês**
- Integração por plataforma adicional: **R$250** cada

**Entrega independente** — não depende do App nem do Website.

**Confirmado vs. pendente:** canal prioritário de lançamento, se quer multi-plataforma desde já, volume esperado de conversas/mês (afeta custo real de manutenção).

**Não entra na proposta:** observações de precificação interna, perguntas de descoberta formuladas como "pendências".

---

## 4. Prospecção de Leads (Restaurantes)

**Fonte:** [[WOOD-ART-PROSPECCAO-LEADS-SPEC]]

**O que é:** pesquisa e captação de restaurantes como novo canal B2B (tábuas e placas maiores) — complementar ao B2C atual (ML/Shopee/Wix) e ao tráfego pago (Frente 6), não concorrente.

**Modelo de entrega:** Real Vision entrega **só a planilha de contatos** (nome, WhatsApp/e-mail, região) — William aborda por conta própria.

**Preço:** ⚠️ sem valor fechado — "a combinar", condicionado a região e volume por rodada.

**Confirmado vs. pendente:** região(ões)-alvo e volume de contatos por rodada ainda não definidos com o William.

**Não entra na proposta:** nomes de ferramentas usadas (Apollo, Vibe Prospecting), referência ao case Paraty, valor-hora interno de R$120/h.

---

## 5. Painel Financeiro Unificado + Google Merchant Center

**Fonte:** [[WOOD-ART-FINANCEIRO-ROI]]

**Painel administrativo unificado:** ideia de reunir site + Mercado Livre + Shopee no mesmo painel financeiro. Resolve a dor de hoje (dado espalhado em 3 sistemas). **Preço e viabilidade técnica das APIs ainda pendentes** — não incluir custo na proposta sem essa confirmação.

**ROI/payback:** deve entrar como estimativa explícita (fórmula: investimento único ÷ economia mensal de taxas), nunca como número fechado — faltam 2 dados (valor final do investimento e taxa de recompra dos clientes).

**Google Merchant Center:** cadastro e listagem de produtos é gratuito; custo só existe se ativar Google Shopping Ads (orçamento do cliente). Pré-requisito: feed de produtos do site pronto.

**Google Meu Negócio (achado novo):** Wood Art não tem perfil, não aparece no Maps — criar do zero custa **R$300**.

**Não entra na proposta:** números de faturamento do William no ML/Shopee (dados internos sensíveis, servem só para calcular ROI depois).

---

## 6. Fora do escopo atual (mencionar como próximos passos, não precificar)

- **Mercado Suíço** ([[WOOD-ART-MERCADO-SUICO]]): pesquisa exploratória de exportação — nicho viável via personalização sob encomenda, mas frete/alfândega/câmbio ainda não calculados. Etapa futura, condicionada à decisão do William de expandir.
- **Idioma alemão no site:** extensão técnica natural (i18next já na stack), mas não incentivar agora — primeiro o site em português precisa existir e funcionar.
- **Tráfego pago (Google Ads):** modelo de cobrança pendente de 3 respostas do William (duração, plataforma, orçamento de mídia). Só faz sentido depois do site/app no ar.

---

## Próximo passo

Com este consolidado + o cálculo de módulos do Website (seção 8.1 de [[WOOD-ART-SITE-DIAGNOSTICO]]), os insumos estão prontos para a skill `proposta-comercial` montar o texto final. Antes de gerar a proposta em PDF:
- Felipe revisa este documento
- Confirmar com o William os pontos pendentes de cada frente (escopo do configurador, decisão Website, canal do chatbot, região da prospecção)
