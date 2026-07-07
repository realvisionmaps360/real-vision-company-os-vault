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
- 07/07/2026 — **8ª entrega (Frente 11 — estratégia comercial):** ordem de sequenciamento recomendada registrada em [[WOOD-ART-FRENTES-DE-TRABALHO]] item 11 (Website → App de Placas → Chatbot IA + Prospecção em paralelo → Merchant Center → Tráfego pago). Custos novos incorporados: VisionCloud R$100/mês + manutenção R$400/mês (total R$500/mês, com blog incluso), Wix R$1.000, Google Meu Negócio do zero R$300, prospecção "a combinar", tráfego pago com cobrança pendente de 3 respostas do William. Ideia de precificação do site (R$4.500 final, mostrando desconto sobre módulos separados) registrada como pendente de cálculo em [[WOOD-ART-SITE-DIAGNOSTICO]] seção 8.1.
- 07/07/2026 — **9ª entrega (consolidação para a proposta):** 6 agentes em paralelo analisaram cada frente com a lente "o que entra na proposta comercial", consolidados em [[WOOD-ART-PROPOSTA-CONSOLIDADO]]. Cálculo do valor dos módulos do Website feito e registrado na seção 8.1 de [[WOOD-ART-SITE-DIAGNOSTICO]]: soma dos módulos R$5.760 (catálogo/loja, painel admin, painel do cliente, estoque, página institucional, analytics/SEO/GEO, deploy) vs. valor fechado R$4.500 — desconto de ~22% mostrado na proposta.
- 07/07/2026 — **10ª entrega (revisão do Felipe no consolidado):** reordenação da lista "o que a loja inclui" pela jornada do cliente; adicionado controle de vendas e e-mails automáticos ao cliente (já existiam na base técnica, faltava documentar); custos do Website reordenados (correção → migração → mensalidade); App de Placas e Chatbot IA deixaram de ter preço fechado (agora faixa/variável, dependendo do escopo real); Google Meu Negócio virou item próprio da proposta (antes enterrado no financeiro); Google Merchant Center incorporado ao painel financeiro unificado. Nova funcionalidade documentada na skill `proposta-comercial`: link de detalhe em overlay (modal), não em nova aba — usado para os problemas do Wix.

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

**Próxima etapa (não iniciada):**
- Felipe revisa [[WOOD-ART-PROPOSTA-CONSOLIDADO]] (documento-ponte pronto).
- Confirmar com o William os pendentes de cada frente (escopo do configurador, decisão Website, canal do chatbot, região da prospecção).
- Só depois: montar o texto final da proposta comercial (skill `proposta-comercial`) → versão em slides.

**Geral:**
- Reconciliar duplicata no VisionFlow quando o Supabase voltar.
- Ver as 11 frentes detalhadas em [[WOOD-ART-FRENTES-DE-TRABALHO]]

## Observações
- Idioma: PT-BR
- Hoje vende via Mercado Livre (~R$80k/mês em mercadoria, R$20k/mês de taxa, R$4k/mês em anúncios) e Shopee (~R$170k/mês faturamento, R$50k/mês de taxa, R$6k/mês em anúncios) — dados usados só para embasar ROI, não republicar sem necessidade. O site próprio vai incluir painel administrativo financeiro unificando site + ML + Shopee — ver [[WOOD-ART-FINANCEIRO-ROI]].
- Maior gargalo dele hoje: depender das taxas de Mercado Livre/Shopee, sem canal de venda próprio.
