# Wood Art — Linha do Tempo do Projeto

> Dossiê completo em [[WOOD-ART-PROJETO]].

## 2026

### 03/07/2026 — Levantamento inicial das 11 frentes de trabalho
- Felipe trouxe o histórico completo do William: app de placas personalizadas, diagnóstico do site Wix atual, ideia de loja virtual própria reaproveitando a arquitetura do Brazilcomp, chatbot IA, prospecção de leads para restaurantes, tráfego pago, dados financeiros de ML/Shopee, Google Merchant Center, mercado suíço e linha de usinagem.
- William já existe no VisionFlow, mas o Supabase estava indisponível no momento — pasta criada como cliente novo, com pendência de reconciliar duplicata quando o banco voltar.
- Pasta do cliente criada com PROJETO, TIMELINE, FICHA-CLIENTE e doc de frentes de trabalho detalhado.
- Meta acordada: proposta comercial pronta → depois, versão em slides.

> A proposta comercial tem 2 entregas separadas: **1ª App de Placas** e **2ª Website**. Cuidado para não misturar as duas.

### 06/07/2026 — 1ª entrega: spec técnica + custos do App de Placas
- Analisadas as anotações do Felipe (`TEMP/woodart store will.md`) com o detalhamento das 11 frentes.
- Produzido o documento [[WOOD-ART-APP-PLACAS-SPEC]]: jornada do cliente, comparativo PWA × app nativo (recomendação: PWA), stack, integrações e custos.
- Valor-hora definido: R$120. Estimativa de desenvolvimento recalculada: 32h / R$3.840 — **total ainda pendente**, depende do escopo do configurador que o William vai confirmar.
- Valor mensal de manutenção a cobrar do William: R$150–300/mês (separado do custo único de dev). Domínio: a confirmar se se aplica.
- Objetivo desta fase reforçado: reunir informações para a proposta, sem iniciar construção.
- Próxima frente confirmada: 2ª entrega, o site próprio + clone Brazilcomp + relatório do Wix atual.

### 06/07/2026 — 2ª entrega: diagnóstico do site Wix + avaliação do Brazilcomp + pesquisa Wix
- Navegação ao vivo em woodartstore.com.br: confirmados 4 links de rodapé mortos, página de Contato com telefone/e-mail mock do template Wix (`(11) 3456-7890` / `info@meusite.com`), e uma página órfã do template ("Inquiry Services Page", em inglês, com fotos de stock genéricas) publicada no menu principal. Fotos de paisagismo/piscina desconexas do produto na seção "Clientes satisfeitos".
- Avaliada a arquitetura do Brazilcomp (repo do cliente Dorival): stack React/Vite/Supabase idêntica à usada hoje pela RV; ~70% da infra de e-commerce (cadastro, carrinho, frete, Mercado Pago, pedidos, admin) já pronta e reaproveitável. Falta apenas o configurador de personalização, catálogo/copy/fotos e integração com a produção física do William.
- **Pesquisa feita:** Felipe tinha dito ao William que ia estudar se o Wix já é avançado o bastante para dar conta de tudo sem migrar. Pesquisado o estado do Velo (backend do Wix), integração Mercado Pago e apps de configurador de produto. Confirmado: configurador simples até dá para existir via app de terceiro (Kickflip, Zakeke), mas o Wix tem banco de dados fechado (sem Postgres/MySQL nos planos básicos), backend com recursos travados (~400MB RAM, ~200 req/min), e a própria Wix está descontinuando pagamento server-to-server em 30/09/2026 — fecha a porta para o checkout controlado que o Brazilcomp já tem pronto. **Confirma a intuição do Felipe: não vale a pena tentar construir tudo dentro do Wix.**
- Documento produzido: [[WOOD-ART-SITE-DIAGNOSTICO]]. Conclusão: migração é tecnicamente viável e recomendável; decisão final (migrar vs. corrigir o Wix vs. não fazer nada) fica para o William, na proposta.

### 06/07/2026 — 3ª entrega: spec conceitual + custos do Chatbot com IA
- Produzido o documento [[WOOD-ART-CHATBOT-IA-SPEC]]: conceito (assistente humanizado treinado na base da Wood Art, mostra produto no chat, integra com Google Merchant Center, transfere para ramais da equipe), canais possíveis (WhatsApp, Telegram, site, Instagram, qualquer link) e estrutura de custo — R$1.800 desenvolvimento (custo único), R$300/mês manutenção, R$250 por integração de plataforma adicional.
- Confirmado: é entrega independente do App de Placas e do Website — pode ir no WhatsApp da operação atual do William sem depender das outras duas frentes; se o site próprio existir depois, o mesmo bot pode ser integrado nele por custo adicional.
- Correção de processo: a skill `realvision` não havia sido carregada junto com `wood-art` no início da sessão (regra da própria skill e de [[feedback_skill_realvision_primeiro]]) — corrigido nesta sessão antes de criar o documento.

### 06/07/2026 — 4ª entrega: spec de processo da Prospecção de Leads (restaurantes)
- Produzido o documento [[WOOD-ART-PROSPECCAO-LEADS-SPEC]]: processo de prospecção B2B para restaurantes (público diferente do B2C que o William atende hoje), usando Apollo, Vibe Prospecting e a metodologia da `rv-prospeccao`. Nenhuma busca real foi executada — só descrição do processo, para orçar a proposta.
- Duas frentes de aquisição confirmadas como independentes: prospecção ativa (esta entrega) e tráfego pago (Frente 6, já existente no dossiê) — podem rodar juntas ou separadas.
- Modelo de entrega confirmado por Felipe: a RV pesquisa e entrega **só a planilha de contatos**, o William aborda por conta própria. Variações (RV também aborda; William comprar o Sócio Digital) registradas como nota, não como decisão atual.
- Preço desta frente ainda **pendente de precificação** — não há valor definido para esse serviço específico.

### 06/07/2026 — 5ª entrega: documento financeiro/ROI + painel admin unificado
- Produzido o documento [[WOOD-ART-FINANCEIRO-ROI]], consolidando 3 frentes: painel administrativo financeiro (nova ideia do Felipe — site próprio vai centralizar vendas do site + Mercado Livre + Shopee via integração de API), lógica de cálculo de ROI/payback sem números fechados (pendente: valor do investimento e taxa de recompra dos clientes — nenhum dos dois o Felipe sabe hoje), e versão expandida do Google Merchant Center (cadastro único abre elegibilidade para Shopping Ads, listagens gratuitas e superfícies de IA).
- Cross-links atualizados em [[WOOD-ART-FRENTES-DE-TRABALHO]] (itens 3, 7 e 8), [[WOOD-ART-PROJETO]] e [[FICHA-CLIENTE]].
- Nenhum número de ROI foi calculado — documento é insumo para a proposta comercial, cálculo real fica pendente dos dois dados em aberto.

### 06/07/2026 — 6ª entrega: pesquisa exploratória do mercado suíço + decisão sobre linha de usinagem
- Produzido o documento [[WOOD-ART-MERCADO-SUICO]]: pesquisa externa sobre o mercado suíço de madeira personalizada (preço/margem, fator "Swiss Made", segmentos de demanda, barreiras técnicas), análise crítica da Real Vision (ângulo de entrada real é personalização sob encomenda, não exotismo tropical; frete/alfândega/câmbio são risco central ainda não calculado) e plano de próximos passos para o cálculo de custo de exportação (frete, tributos, câmbio, certificação food-safe, validação de demanda). Nenhum número foi calculado ainda — é etapa futura, condicionada ao William decidir expandir.
- Decisão registrada: as peças de metal (linha de usinagem, item 10) vendem como categoria dentro da mesma loja virtual da Wood Art, não em site separado — evita duplicar infraestrutura (banco, admin, pagamento, frete) que já está sendo construída do zero.
- Reforço documentado em [[WOOD-ART-SITE-DIAGNOSTICO]] e [[WOOD-ART-FRENTES-DE-TRABALHO]] (itens 3, 9 e 10): o custo do "website" sempre inclui a loja virtual embutida, não é item separado; e o seletor de idioma (alemão) é uma evolução natural da arquitetura do site (feito do zero, já usa i18next no Brazilcomp), mas não deve ser incentivado nesta fase.

### 06/07/2026 — 7ª entrega: resposta sobre usinagem + Analytics/SEO/GEO no site
- Registrado em [[WOOD-ART-SITE-DIAGNOSTICO]] (seções 5.1 e 5.2) o texto de referência para a proposta comercial, respondendo pergunta direta do William sobre onde vender as peças de usinagem (mesma loja, categoria separada — já decidido na sessão anterior) e explicando, em linguagem simples, por que Google Analytics, SEO e GEO fazem parte do pacote do site.
- Confirmado com Felipe: a comunicação clara e o "porquê" por trás de cada decisão técnica são parte do padrão de atendimento da Real Vision — todo texto de proposta deve explicar o raciocínio, não só a decisão.

### 07/07/2026 — 8ª entrega: Frente 11 (estratégia comercial/sequenciamento) + custos novos + precificação do site

- Produzida a análise de sequenciamento da Frente 11 (item 11 de [[WOOD-ART-FRENTES-DE-TRABALHO]]): ordem recomendada — 1º Website/loja própria, 2º App de Placas, 3º Chatbot IA + Prospecção de leads em paralelo, 4º Google Merchant Center, 5º Tráfego pago; Mercado suíço e estratégia de longo prazo da usinagem fora do escopo desta fase. Registrado como sugestão da RV, decisão final é do William.
- Felipe passou dados novos de precificação, incorporados nos documentos-fonte:
  - Hospedagem VisionCloud (servidor próprio da RV): **R$100/mês**
  - Manutenção geral do site: **R$400/mês** (já inclui pacote de 2 posts de blog/mês com estratégia SEO) — total **R$500/mês**, ver [[WOOD-ART-SITE-DIAGNOSTICO]] seção 8
  - Corrigir o Wix (opção 2): **R$1.000** — seção 4 do mesmo documento
  - Prospecção de leads: custo passou de "pendente" para **"a combinar na proposta"** — [[WOOD-ART-PROSPECCAO-LEADS-SPEC]]
  - Tráfego pago: registrado que o modelo de cobrança depende de 3 respostas do William (duração, plataforma, orçamento de mídia) — [[WOOD-ART-FRENTES-DE-TRABALHO]] item 6
  - Achado novo: Wood Art não tem perfil no Google Meu Negócio (não aparece no Google Maps) — criar do zero custa **R$300** — [[WOOD-ART-FINANCEIRO-ROI]] seção 3
  - ROI reforçado como estimativa explícita na proposta, não cálculo fechado
- **Ideia de precificação do Website (opção 1 — migração completa):** valor final de **R$4.500**, mas apresentado na proposta como soma de módulos separados com desconto até chegar nesse valor (efeito de "está barato"). Cálculo do valor de cada módulo ainda **pendente** — registrado em [[WOOD-ART-SITE-DIAGNOSTICO]] seção 8.1.
- Ativadas nesta sessão: `rv-skill-scout` (mapeou skills para a próxima etapa: `proposta-comercial`, `rv-copy`, `karpathy-guidelines`) e `rv-termos` (checagem "modo proposta" — cláusulas 1, 2, 4, 7, 9, 11 e 12 relevantes para este projeto; nenhuma atualização nos Termos foi necessária).
- **Sessão pausada aqui por decisão do Felipe** — a análise dos documentos por agentes em paralelo e a montagem do `.md` consolidado da proposta ficam para a próxima etapa, ainda não iniciadas.

## Tempo investido

| Data | Sessão | Horas |
|---|---|---|
| 06/07/2026 | Spec técnica + custos do App de Placas | 1h |
| 06/07/2026 | Diagnóstico do site Wix + avaliação Brazilcomp | 1h |
| 06/07/2026 | Correção App×Site + pesquisa técnica Wix (Velo, limites, Mercado Pago) | 0h30 |
| 06/07/2026 | Spec conceitual + custos do Chatbot com IA | 0h30 |
| 06/07/2026 | Spec de processo da Prospecção de Leads (restaurantes) | 0h30 |
| 06/07/2026 | Documento financeiro/ROI + painel admin unificado | 0h30 |
| 06/07/2026 | Pesquisa mercado suíço + decisão linha de usinagem | 0h30 |
| 06/07/2026 | Texto de proposta: usinagem + Analytics/SEO/GEO | 0h20 |
| 07/07/2026 | Sequenciamento Frente 11 + custos novos (VisionCloud, Wix, GMN) + ideia de precificação do site | 1h |

## Próximos marcos
**1ª entrega (App):**
- Confirmar com o William o escopo do configurador (define horas/valor final do app)
- Confirmar se domínio próprio se aplica ou se ele usa o dele

**2ª entrega (Website):**
- Confirmar com o William: migrar para site próprio vs. corrigir o Wix atual vs. não fazer nada agora

**3ª entrega (Chatbot IA):**
- Confirmar com o William: canal prioritário, se quer multi-plataforma desde já, e volume esperado de conversas — ver [[WOOD-ART-CHATBOT-IA-SPEC]]

**4ª entrega (Prospecção de Leads):**
- Confirmar com o William: região(ões)-alvo e volume de contatos por rodada — ver [[WOOD-ART-PROSPECCAO-LEADS-SPEC]]
- Precificar o serviço (sem valor de referência ainda)

**Geral:**
- Reconciliar duplicata no VisionFlow (tentado em 06/07/2026, MCP Supabase com timeout de conexão — retomar quando resolver)
- Montar a proposta comercial (skill `proposta-comercial`) — com as três entregas como linhas separadas
- Gerar versão em slides da proposta aprovada (skill `frontend-slides`)
