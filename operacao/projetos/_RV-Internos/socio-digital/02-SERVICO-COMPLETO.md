# Serviço Sócio Digital — Especificação Completa

> Fonte da verdade pra escopo, preços, entregáveis e processo. Toda proposta comercial e página de marketing puxa daqui.

## Posicionamento

- **Nome do serviço:** Sócio Digital
- **Marca-mãe:** Real Vision
- **Tagline:** *"Sócio Digital — o parceiro de IA que executa pela sua empresa."*
- **Promessa:** *"Tenha uma IA que conhece sua empresa de cor e executa tarefas no seu computador como um funcionário — sem salário, sem férias, sem demissão."*

**Para quem é:**
Donos de PMEs com volume diário de tarefas operacionais repetitivas (pousadas, restaurantes, e-commerces, festivais, agências, comércio local com presença digital).

**Para quem NÃO é:**
- Empresas sem computador funcionando como hub operacional
- Empresas sem internet estável
- Donos que não querem aprender a delegar pra IA
- Empresas onde toda decisão precisa passar pelo dono (sem rotina delegável)

## Tiers detalhados

### Essencial — R$ 2.500 setup + R$ 400/mês

**Pra quem:** 1 usuário (geralmente o dono ou 1 funcionário-chave).

**Setup (one-time):**
- 1 call de briefing (30 min)
- Instalação remota do Claude Code (cliente paga plano Pro direto à Anthropic, USD 20/mês)
- Criação da estrutura base de pastas (Company OS adaptado pro nicho)
- Configuração inicial da skill `[cliente]-style` (contexto + voz)
- 2h de treinamento ao vivo (call de implementação)
- Documento PDF personalizado de tutorial pós-call

**Mensalidade inclui:**
- Hospedagem **Vision Cloud** (1 site, SSL, deploy automático, suporte ao domínio)
- 1h de suporte/mês (chat, vídeo ou call)
- Relatório mensal com **1 insight estratégico** baseado no Diário de Operação do cliente
- Atualização mensal das skills personalizadas
- Acesso ao painel de auto-atendimento (FAQ + vídeos)

**Limites:**
- Sem agentes automatizados complexos
- Sem integrações externas (FB Ads, WhatsApp, etc)
- Sem sincronização multiusuário
- Suporte resposta em < 24h úteis

### Profissional — R$ 4.500 setup + R$ 800/mês

**Pra quem:** equipe pequena (2 a 4 pessoas).

**Tudo do Essencial +:**
- **Sincronização Vision** (interno: Nextcloud Files) — pasta da empresa sincronizada em tempo real entre todos os computadores da equipe
- Skill customizada específica do nicho (pousada, restaurante, e-commerce, festival, agência)
- 3h de treinamento ao vivo + 2 vídeos personalizados gravados (pro cliente revisitar)
- 3h de suporte/mês
- Revisão trimestral de processo (call de 1h pra recalibrar)
- Suporte com resposta em < 8h úteis

**Adicional cobrado à parte:**
- Cada usuário extra acima de 4 → **orçar** (custo de infra + serviço de configuração)
- Migração de site externo pra Vision Cloud → R$ 800–1.500

### Empresarial — R$ 8.000 setup + R$ 1.500/mês

**Pra quem:** equipes médias (5+ pessoas) ou empresas com operação complexa.

**Tudo do Profissional +:**
- Até **3 agentes automatizados** configurados (rodam em background, executam rotinas)
- **Integrações externas:** FB Ads MCP, WhatsApp Business, Google Ads, Higgsfield, etc
- Skills múltiplas customizadas (uma por departamento ou processo)
- Suporte **prioritário** (resposta em < 4h úteis)
- 1 call de revisão mensal (1h)

**Adicional cobrado à parte:**
- Cada agente automatizado complexo acima de 3 → R$ 800 por agente
- Cada nova integração externa pós-implementação → R$ 600 por integração

## Metodologia técnica de entrega

> Contexto interno. Descreve como o produto funciona por baixo do capô. Usar na capacitação de novos operadores e como base para copy avançado — nunca revelar stack por nome pro cliente.

### O problema que o Sócio Digital resolve

A maioria dos negócios ainda funciona com planilhas e anotações em papel. Os donos não querem pagar por ferramentas externas caras, mas também não têm condições de investir em software sob medida. O resultado são negócios travados nessa situação por anos, perdendo eficiência e dinheiro todos os dias — não por falta de vontade, mas por falta de solução acessível.

Existe uma oportunidade enorme para quem sabe usar inteligência artificial para resolver problemas reais de negócios. Com a stack correta, é possível transformar completamente a operação de uma empresa em apenas duas semanas.

### As duas semanas de implementação

**Semana 1 — Diagnóstico:**
Entrar no negócio e identificar o maior gargalo operacional. Quais tarefas consomem mais tempo sem gerar crescimento? Onde o dono trava? O que se repete toda semana sem variação real?

**Semana 2 — Construção:**
Construir a solução personalizada: banco de dados real com uma interface funcional, publicada no domínio do cliente, com toda a estrutura de contexto da empresa (histórico de clientes, processos, voz da marca, métricas de referência).

### O diferencial: camada de inteligência nos dados (MCP)

O que diferencia o Sócio Digital de qualquer outra ferramenta é a camada de IA conectada diretamente aos dados do negócio via MCP (Model Context Protocol).

Com essa camada, o cliente não tem apenas mais uma ferramenta. Ele tem uma ferramenta que **responde perguntas sobre os dados do negócio em tempo real**:

- "Quais clientes estão com pagamento atrasado?" → resposta em segundos
- "Qual foi o melhor vendedor do trimestre?" → resposta na hora
- "Quais produtos não venderam esse mês?" → na hora

Isso é inteligência artificial aplicada a problemas reais de negócios — não automação genérica.

Sem essa camada, você só está adicionando mais uma ferramenta nas tantas que o cliente já usa. Com ela, você entrega **inteligência**, não apenas software. Essa é a diferença entre ser mais um prestador de serviços e se tornar um parceiro estratégico.

### Linguagem pública vs. stack interno

| Linguagem pública (para clientes) | Stack interno (nunca revelar) |
|---|---|
| "IA instalada no seu computador" | Claude Code (Anthropic) |
| "Banco de dados do negócio" | Supabase (PostgreSQL) |
| "Camada de inteligência nos dados" | MCP (Model Context Protocol) |
| "Sincronização Vision" | Nextcloud |
| "Vision Cloud" | Hostinger + Vercel |

---

## Brinde — Vision Cloud (todos os tiers)

Hospedagem premium da Real Vision inclusa em todos os tiers (1 site).

**O que o cliente vê:**
- Hospedagem rápida e segura, com SSL, deploy automático e suporte
- Domínio próprio (cliente paga o registro do domínio: ~R$ 40–60/ano)
- Backups diários
- 99.9% uptime garantido
- Toda burocracia técnica resolvida pela Real Vision

**O que o cliente NÃO vê (info interna):**
- Stack por baixo: Hostinger (hospedagem) + Vercel (deploy contínuo)
- Margem da Real Vision sobre custo Hostinger

**Upsell:**
- Cliente com site existente em WordPress/Wix/etc → migração paga (R$ 800–1.500)
- Cliente sem site → contratar criação de site nova (serviço Real Vision separado)

## Filtro de cliente (qualificação)

### Critérios mínimos (todos obrigatórios)

- [ ] Empresa tem CNPJ ativo (não vendemos pra PF)
- [ ] Cliente usa computador no dia a dia da operação
- [ ] Internet estável no local de trabalho (mínimo 50 Mbps)
- [ ] Disposição pra investir mínimo R$ 2.900 (setup + 1 mês) no início
- [ ] Existe pelo menos 1 processo repetitivo claramente identificado
- [ ] Cliente OU funcionário disponível pra ser treinado (4h de call)
- [ ] Aceita pagar plano Pro do Claude direto (USD ~20/mês)

### Red flags (descartar)

- Cliente quer "IA que faça tudo automaticamente, sem nenhum treinamento"
- Cliente não consegue descrever o que faz no dia a dia
- Cliente reclama do preço antes de entender o valor
- Sem máquina principal de trabalho
- Quer pagar parcelado em 6+ vezes
- Quer testar 30 dias grátis antes de pagar

### Sinais verdes (cliente ideal)

- Já usa Google Workspace ou similar (familiaridade digital)
- Já mencionou "perco muito tempo em X"
- Já contratou outras automações antes (valoriza a categoria)
- Tem volume — não é 5 clientes/mês, é 50+
- Indicado por cliente atual de outro pilar Real Vision

## Processo de entrega (passo a passo)

### Etapa 1 — Diagnóstico (30 min, grátis)

- Felipe faz call de descoberta com lead
- Preenche template de briefing (ver `05-TEMPLATES-OPERACIONAIS.md`)
- Identifica: nicho, processos repetitivos, tier ideal, infraestrutura disponível
- Se cliente passa nos critérios mínimos → vai pra Etapa 2
- Se não passa → gentilmente declinar e indicar outro serviço Real Vision (ou nada)

### Etapa 2 — Proposta (24–48h)

- Felipe gera proposta personalizada (template em `05-TEMPLATES-OPERACIONAIS.md`)
- Envia por e-mail e/ou WhatsApp
- Inclui prazo de validade (7 dias corridos)
- Negociação se preciso

### Etapa 3 — Aceite + pagamento inicial

- Cliente paga **50% do setup adiantado** (PIX)
- Cliente confirma forma de pagamento da mensalidade (PIX recorrente ou boleto)
- Cliente cria conta no Claude Anthropic e ativa plano Pro (Felipe orienta por chat)
- Agenda dia/hora do bloco de implementação (4h corridas, geralmente manhã ou tarde)

### Etapa 4 — Implementação remota (3–4h)

Detalhamento completo no checklist em `05-TEMPLATES-OPERACIONAIS.md`.

- Cliente paga o **50% restante** no início da call
- Felipe loga remoto na máquina do cliente (TeamViewer ou AnyDesk)
- Hora 1: instalação + estrutura base de pastas
- Hora 2: contexto + skill personalizada do nicho
- Hora 3: treinamento ao vivo (cliente executa tarefas reais)
- Hora 4: finalização + Vision Cloud configurada + PDF gerado

### Etapa 5 — Pós-venda imediato

- Felipe gera e envia o PDF de tutorial personalizado em ≤ 24h
- Felipe envia link do suporte (canal direto)
- Felipe envia **e-mail D+7** (template em `05-TEMPLATES-OPERACIONAIS.md`) — checa se cliente tá conseguindo delegar
- Felipe agenda o **primeiro relatório mensal** (D+30)

### Etapa 6 — Acompanhamento mensal (recorrente)

- IA atualiza `DIARIO.md` automaticamente toda vez que executa algo relevante (skill configurada na Etapa 4)
- Felipe lê o `DIARIO.md` ao final do mês
- Felipe envia **relatório mensal** com 1 insight estratégico (template em `05-TEMPLATES-OPERACIONAIS.md`)
- Conforme tier:
  - Essencial: 1h suporte/mês sob demanda
  - Profissional: 3h suporte + revisão trimestral
  - Empresarial: 3h+ suporte prioritário + call mensal de revisão

### Etapa 7 — Iteração contínua

- Cliente pede ajustes → Felipe atualiza skills/templates (dentro da cota de suporte)
- Felipe identifica oportunidade de upsell → propõe (novo agente, nova integração, upgrade de tier)
- A cada 90 dias: pesquisa de NPS interna

## Métricas customizadas por nicho

O `DIARIO.md` do cliente tem template específico do nicho dele. Exemplos do que a IA loga automaticamente:

### Pousada
- Reviews respondidas (Google Meu Negócio, Booking, Airbnb)
- Reservas processadas / categorizadas
- Posts publicados (Instagram, Facebook)
- Hóspedes antigos reativados via WhatsApp
- Atualizações no site (preços, fotos, descrições)

### Restaurante
- Cardápios atualizados (em todos os canais)
- Pedidos categorizados (iFood, WhatsApp, balcão)
- Avaliações respondidas
- Posts de promoção criados
- Estoque crítico sinalizado

### E-commerce
- Descrições de produto geradas (com SEO)
- Atendimentos automatizados (FAQ)
- Categorização de pedidos
- Análises semanais de venda (best sellers, ralos)
- Posts de divulgação

### Festival / Evento
- Press releases gerados
- Posts de divulgação (multiplataforma)
- Inscrições processadas e categorizadas
- FAQ atualizado com base em dúvidas frequentes
- Newsletter mensal pra base

### Agência (sub-clientes)
- Relatórios mensais gerados pra cada sub-cliente
- Contas de mídia paga monitoradas (com sinalização de alerta)
- Briefings de campanha gerados a partir de inputs

## Custos internos e margem

### Cliente Essencial
- Setup: ~2h Felipe (custo de oportunidade R$ 400 a R$ 200/h)
- Mensal: ~1h suporte + Vision Cloud (~R$ 30/mês Hostinger)
- **Margem mensal:** ~R$ 170 (42%)
- **Margem do setup:** ~R$ 2.100 (84%)

### Cliente Profissional
- Setup: ~4h Felipe (R$ 800)
- Mensal: Nextcloud (~R$ 50/mês infra) + 3h suporte
- **Margem mensal:** ~R$ 350 (44%)
- **Margem do setup:** ~R$ 3.700 (82%)

### Cliente Empresarial
- Setup: ~8h Felipe (R$ 1.600)
- Mensal: integrações + 4h+ suporte prioritário
- **Margem mensal:** ~R$ 800 (53%)
- **Margem do setup:** ~R$ 6.400 (80%)

### Premissa
Felipe trabalha com 5 clientes ativos:
- 2 Essencial: R$ 800/mês recorrente
- 2 Profissional: R$ 1.600/mês
- 1 Empresarial: R$ 1.500/mês
- **MRR total:** R$ 3.900
- **Receita anual de setups:** R$ 25.000 (estimando 5 setups/ano + upgrades)
- **Receita anual recorrente:** R$ 46.800
- **Total ano:** R$ 71.800 só desse pilar
