---
title: William — Wood Art
tags:
  - cliente
  - diagnostico
status: diagnostico
data_inicio: 2026-07-03
servicos: []
---

# William — Wood Art

## Contexto
William é dono da Wood Art, empresa de placas de madeira personalizadas, tábuas e placas maiores, em expansão. Também é dono de uma empresa de usinagem separada (madeira + metal sob demanda). Já existe no VisionFlow, mas reconciliação de duplicata está pendente (Supabase indisponível em 03/07/2026).

## Serviços contratados
- Nenhum ainda — cliente em fase de diagnóstico.

## Entregas realizadas
> A proposta comercial tem 2 entregas separadas: **1ª App de Placas** e **2ª Website**. Não misturar as duas na apresentação nem na precificação.

- 06/07/2026 — **1ª entrega (App):** spec técnica + custos do App de Placas: [[WOOD-ART-APP-PLACAS-SPEC]]. PWA recomendado vs. nativo, stack, integrações. Total de horas ainda pendente de confirmação de escopo com o William.
- 06/07/2026 — **2ª entrega (Website):** diagnóstico do site Wix atual + avaliação do Brazilcomp + pesquisa "dá para fazer tudo dentro do Wix?": [[WOOD-ART-SITE-DIAGNOSTICO]]. Achados no Wix atual: rodapé com links mortos, página de Contato com dados mock, página órfã de template em inglês publicada no menu. Brazilcomp avaliado como reaproveitável (~70% da infra pronta). Pesquisa confirmou que o Wix não sustenta o projeto (banco fechado, backend limitado, e a própria Wix descontinua pagamento server-to-server em set/2026) — migração é a recomendação.
- 06/07/2026 — **3ª entrega (Chatbot IA):** spec conceitual + custos: [[WOOD-ART-CHATBOT-IA-SPEC]]. Assistente humanizado treinado na base da Wood Art, mostra produtos no chat, integra com Google Merchant Center, transfere para ramais da equipe. Canais: WhatsApp, Telegram, site, Instagram ou qualquer link. Custo: R$1.800 desenvolvimento + R$300/mês manutenção + R$250 por integração de plataforma adicional. Entrega independente das outras duas.
- 06/07/2026 — **4ª entrega (Prospecção de Leads — restaurantes):** spec de processo: [[WOOD-ART-PROSPECCAO-LEADS-SPEC]]. Duas frentes de aquisição independentes: prospecção ativa (Apollo + Vibe Prospecting + metodologia `rv-prospeccao`) e tráfego pago (Frente 6, já existente). Modelo confirmado: RV entrega só a planilha de contatos, William aborda por conta própria. Preço ainda pendente de definição.
- 06/07/2026 — **5ª entrega (Financeiro/ROI):** [[WOOD-ART-FINANCEIRO-ROI]]. Painel administrativo unificando vendas do site + ML + Shopee, lógica de cálculo de payback sem números fechados (pendente: valor do investimento e taxa de recompra), e Google Merchant Center expandido (cadastro único abre Shopping Ads + listagens gratuitas + superfícies de IA).
- 06/07/2026 — **6ª entrega (Mercado Suíço):** [[WOOD-ART-MERCADO-SUICO]]. Pesquisa exploratória + plano de cálculo de custo de exportação (frete, alfândega, câmbio, food-safe, validação de demanda). Etapa futura, não faz parte do escopo atual. Decisão tomada: peças de usinagem vendem como categoria na mesma loja da Wood Art, não em site separado.
- 06/07/2026 — **Complemento à 2ª entrega (Website):** registrado em [[WOOD-ART-SITE-DIAGNOSTICO]] o texto de proposta respondendo à pergunta do William sobre onde vender a usinagem, e a explicação de que Google Analytics, SEO e GEO fazem parte do pacote do site.

## Próximos passos
**1ª entrega (App):**
- Confirmar com o William o escopo do configurador (tamanhos, materiais, opções de personalização) — define o total de horas/valor do app.
- Confirmar se domínio próprio se aplica ou se ele já usa o dele.

**2ª entrega (Website):**
- Confirmar com o William: migrar para site próprio vs. corrigir pontualmente o Wix atual vs. não fazer nada agora — ver opções e pesquisa técnica em [[WOOD-ART-SITE-DIAGNOSTICO]].

**3ª entrega (Chatbot IA):**
- Confirmar com o William: canal prioritário, multi-plataforma ou não, e volume esperado de conversas — ver [[WOOD-ART-CHATBOT-IA-SPEC]].

**4ª entrega (Prospecção de Leads):**
- Confirmar com o William: região(ões)-alvo e volume de contatos por rodada — ver [[WOOD-ART-PROSPECCAO-LEADS-SPEC]].
- Precificar o serviço (sem valor de referência ainda).

**Geral:**
- Reconciliar duplicata no VisionFlow quando o Supabase voltar.
- Ver as 11 frentes detalhadas em [[WOOD-ART-FRENTES-DE-TRABALHO]]
- Montar a proposta comercial final consolidando as 6 entregas já documentadas (skill `proposta-comercial`)

## Observações
- Idioma: PT-BR
- Hoje vende via Mercado Livre (~R$80k/mês em mercadoria, R$20k/mês de taxa, R$4k/mês em anúncios) e Shopee (~R$170k/mês faturamento, R$50k/mês de taxa, R$6k/mês em anúncios) — dados usados só para embasar ROI, não republicar sem necessidade. O site próprio vai incluir painel administrativo financeiro unificando site + ML + Shopee — ver [[WOOD-ART-FINANCEIRO-ROI]].
- Maior gargalo dele hoje: depender das taxas de Mercado Livre/Shopee, sem canal de venda próprio.
