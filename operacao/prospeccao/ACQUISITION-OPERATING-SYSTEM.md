# Sistema de Aquisição — Operating System (Decision Engine)

> **Status:** ✅ Congelado · **Data:** 24/06/2026 · **Missão:** Mission 4
> **Aprovado por:** Felipe Garcia
> **Relacionado:** [[ACQUISITION-CLAUDE]] (papel — M1) · [[ACQUISITION-SYSTEM-ARCHITECTURE]] (arquitetura — M2) · [[ACQUISITION-DATA-MODEL]] (schema — M3) · VisionFlow (destino do handover)
> **Convenção:** prosa em português; status, serviços e campos em inglês (igual M3).

---

## Por que este documento existe

As Missões 1–3 definiram **quem** o Acquisition Claude é (papel), **onde** os dados vivem (arquitetura) e **o que** é o schema (8 tabelas). Faltava o **como**: a lógica de negócio que faz o agente decidir sozinho no dia a dia.

Este é o **manual operacional permanente** do departamento de aquisição. O objetivo é simples e ambicioso: **o Acquisition Claude sabe o que fazer em quase todo cenário de aquisição sem precisar perguntar ao Felipe ou à Romana.** Ele só interrompe um humano nos pontos onde a decisão é genuinamente humana (os *portões* da Seção 6).

**O que este documento NÃO faz:** não escreve código, não redesenha o banco, não altera as Missões 1–3. Ele consome o schema congelado e os transforma em decisões.

### Princípios que governam todas as decisões (herdados das M1–M3)

1. **O objetivo nunca é vender um serviço — é construir uma relação de longo prazo.** Cada negócio é analisado pelo seu **potencial digital completo**, não por uma oferta isolada.
2. **Claude prepara a venda; quem vende é o humano.** Tudo que sai para o cliente é **rascunho**. Felipe ou Romana enviam.
3. **Uma ficha por negócio.** Dedup obrigatório antes de criar qualquer linha.
4. **Histórico é append-only.** Toda ação vira evento; nada se perde, nada é sobrescrito.
5. **Separação dura do VisionFlow.** Aquisição é o topo do funil (frio → morno); VisionFlow é o fundo (morno → cliente). A fronteira é o handover manual.
6. **Sem dado inventado.** Preço, prazo, portfólio, números — só o que está no Company OS.

### Como ler cada seção

Toda seção segue o mesmo molde:
**Objetivo · Inputs · Outputs · Decisões (IF → THEN) · Responsabilidades · Próximos caminhos · Erros a evitar.**

---

# 1. Lead Discovery

**Objetivo.** Encher o topo do funil com negócios que cabem no ICP (Seção 13), sem desperdiçar esforço em quem nunca vai virar cliente de longo prazo.

**Inputs.** Alvo da rodada (cidade + segmento + oferta-âncora, vindo de uma `campaign`) · fontes públicas (WebSearch, WebFetch, Google Places, Apollo quando autorizado) · o ICP · o banco (`prospects`, para dedup).

**Outputs.** `prospects` novos (após dedup) com a info mínima preenchida · evento `encontrado` · linha em `campaign_prospects` com `priority` · `discovery_notes` quando falta info.

### Quais negócios buscar

- Negócios com **espaço físico** e operação estabelecida: pousadas, hotéis pequenos/médios, restaurantes, bares, eventos, condomínios, hubs comerciais, operadoras de turismo, comércio local relevante.
- Que dê para **atender 100% remoto** (carro-chefe: site, automação, IA, GMB). Deslocamento físico (foto/drone) é complemento, nunca o filtro de entrada.
- Que mostrem **lacuna digital visível** (sinal de necessidade) **e** algum sinal de porte/recorrência (sinal de capacidade).

### Quais negócios ignorar (ou rebaixar)

- **Redes e franquias** — a decisão não é local; o esforço de aquisição local não acha o decisor.
- **Hotéis grandes (100+ quartos)** — costumam ter fotógrafo e agência próprios.
- **Altíssimo padrão que já tem tudo** (site forte, GMB impecável, automação) — pouca lacuna.
- **Negócios sem presença física** ou sem operação real para sustentar uma relação digital.
- Qualquer ficha com `do_not_contact = true`.

### Indústrias prioritárias

Os segmentos-âncora da Real Vision (turismo e hospitalidade em primeiro lugar: pousadas, restaurantes, eventos, condomínios, hubs). Esses convertem porque a Real Vision tem portfólio e prova social neles (ver EMPRESA.md).

### Info mínima para criar um `prospect`

Só cria ficha quando tem, no mínimo: **`business_name` + `city` + (pelo menos um canal de contato OU um identificador digital — `phone_e164`/`email`/`website_domain`/`instagram`)**.

- **IF** falta o canal de contato mas o negócio existe e é relevante **→ THEN** criar a ficha mesmo assim com `current_status = pesquisa_pendente` e anotar em `discovery_notes` exatamente o que falta.
- **IF** falta até o nome ou a cidade **→ THEN** não criar ficha; é ruído.

### Red flags que rebaixam prioridade na hora

| Red flag | Efeito |
|---|---|
| Só telefone fixo (8 dígitos), sem celular/WhatsApp | `score_contactability` baixo |
| E-mail de domínio antigo `.com.br` com cara de inativo | tratar como contato frágil; buscar canal alternativo |
| Sinais de fechamento (avaliações param há 1+ ano, "fechado permanentemente") | rebaixar para Tier C / arquivar |
| Já é cliente (cruzar com VisionFlow) | **não prospectar** — fora do escopo de aquisição |
| Já recebeu abordagem recente (ficha existe, `last_contacted_at` próximo) | não reabordar; respeitar cadência |

**Responsabilidades.** `clarisso` executa a busca e cria as fichas; `acquisition-claude` define o alvo, o ICP e a prioridade.

**Próximos caminhos.** Ficha criada → **Business Analysis (Seção 2)**. Falta info → `pesquisa_pendente` (retomar busca).

**Erros a evitar.** Criar ficha duplicada (sempre dedup antes) · gastar tempo em anti-ICP · criar fichas sem nenhum identificador (lixo no banco) · buscar sem uma `campaign` aberta (perde rastreabilidade).

---

# 2. Business Analysis

**Objetivo.** Transformar um negócio cru em um diagnóstico estruturado: onde ele está digitalmente, do que precisa, e quão pronto está para uma relação de longo prazo.

**Inputs.** A ficha do `prospect` · website, GMB, Instagram, avaliações, qualquer presença pública.

**Outputs.** `score_reasons` preenchido · base para os 4 sub-scores (Seção 4) · base para as oportunidades (Seção 3) · evento `qualificado`.

### As 10 lentes de análise

Para cada negócio, o agente passa por estas lentes e anota o que vê (vira `score_reasons` e alimenta `prospect_services`):

| # | Lente | O que checar | Sinal de oportunidade |
|---|---|---|---|
| 1 | **Website** | Existe? É profissional? Mobile? Rápido? Atualizado? | Sem site / site fraco → `website` ou `landing_page` |
| 2 | **Google Business (GMB)** | Ficha reivindicada? Fotos? Horário? Posts? Respostas a reviews? | Parado/vazio → `google_business` / `google_management` |
| 3 | **Branding** | Logo, identidade, consistência visual entre canais | Inconsistente → entra no escopo do site / cartão digital |
| 4 | **Reviews** | Quantidade, nota, frequência, se respondem | Muitas reviews boas = negócio vivo e estabelecido (capacidade); reviews sem resposta = `google_management` |
| 5 | **Customer journey** | Como um cliente descobre → decide → reserva/compra? Onde quebra? | Sem caminho claro até a conversão → site + booking + chatbot |
| 6 | **Trust (confiança)** | O negócio passa segurança online antes do cliente chegar? | Pouca prova social / sem 360 → tour 360°, fotografia |
| 7 | **Digital maturity** | Quão digital ele já é (0 = nada, 5 = ecossistema completo)? | Baixa maturidade + capacidade = melhor lead |
| 8 | **Automation opportunities** | Atende WhatsApp na mão? Reservas manuais? Processos repetitivos? | `whatsapp_automation`, `crm`, automação de processo |
| 9 | **AI opportunities** | Dá para um chatbot responder dúvidas/reservas 24/7? | `ai_chatbot` + gestão mensal do chatbot |
| 10 | **Growth opportunities** | Várias unidades? Expansão? Sazonalidade a suavizar? | Multi-unidade → relação maior; sazonalidade → automação/SEO |

### Regras de leitura (IF → THEN)

- **IF** não tem site **E** não tem GMB ativo **→ THEN** maturidade digital baixa: necessidade alta (`score_need` alto), prioridade de presença básica primeiro.
- **IF** tem site bom mas GMB parado **→ THEN** oportunidade é `google_management` + automação, não refazer o site.
- **IF** atende reservas/dúvidas manualmente no WhatsApp **→ THEN** marcar `ai_chatbot` + `whatsapp_automation` como oportunidades.
- **IF** muitas reviews boas + posicionamento premium **→ THEN** capacidade alta (`score_authority` alto) — vale o carro-chefe (Sócio Digital), não só o tripwire.
- **IF** falta informação para qualquer lente decisiva **→ THEN** `pesquisa_pendente` + `discovery_notes`; não chutar.

**Responsabilidades.** `acquisition-claude` (com apoio do `clarisso`) executa a análise e escreve `score_reasons`.

**Próximos caminhos.** Análise completa → **Opportunity Identification (Seção 3)**. Falta info → `pesquisa_pendente`.

**Erros a evitar.** Olhar só uma lente (ex: só o site) e perder o resto do potencial · confundir "negócio simples" com "sem oportunidade" · inventar fragilidades que não viu para inflar score.

---

# 3. Opportunity Identification

**Objetivo.** Para cada negócio, mapear **todas** as oportunidades (não uma), escolher por onde começar e estimar o tamanho da relação de longo prazo.

**Inputs.** O diagnóstico das 10 lentes (Seção 2) · o catálogo de `services`.

**Outputs.** Linhas em `prospect_services` (uma por oportunidade, `opportunity_status = identificada`) · `lead_offer` na ficha (o serviço conduzido **agora**) · evento `qualificado`/`nota`.

### O catálogo de serviços (vocabulário governado da M3)

O agente sempre fala em termos de `services.code`. O catálogo é **lista viva** — itens da oferta comercial que ainda não têm code viram **linha nova no catálogo** durante a construção (mecanismo já previsto na M3; não é mudança de schema).

| Categoria | Serviços (a oferta comercial → `services.code`) |
|---|---|
| **presenca_digital** (carro-chefe) | Website → `website` · Landing Page → `landing_page` · Cartão Digital → `digital_business_card`* · Gestão Mensal de Site → `website_management`* · Google Business Setup/Otimização → `google_business` · Gestão GMB → `google_management` |
| **automacao** (carro-chefe) | Chatbot IA → `ai_chatbot` · Gestão Mensal de Chatbot → `chatbot_management`* · WhatsApp Automation → `whatsapp_automation` · CRM → `crm` · Automação de Processos → `business_process_automation`* |
| **infraestrutura** (suporte) | Hosting → `hosting` · Domínio → `domain_management`* · Booking → `booking_integration`* |
| **midia** (porta de entrada / upsell) | Tour 360° → `360_tour` · Fotografia → `photography` · Drone Foto → `drone_photography`* · Drone Vídeo → `drone_video`* · Vídeo → `videography` |
| **âncora de relação** | Sócio Digital → `digital_partner` |

\* *itens a registrar como linha nova no catálogo `services` na construção (Mission 5) — code proposto.*

### Classificação das oportunidades

Para cada negócio o agente preenche três camadas:

- **Primary Opportunity** — a maior dor resolvível **agora**, que abre a relação. Vira o `lead_offer`.
- **Secondary Opportunities** — o que faz sentido logo depois, no mesmo ciclo (especialmente as **gestões mensais**, que são a receita recorrente).
- **Future Opportunities** — o que faz sentido daqui a meses (ex: tour 360° quando o site já estiver no ar; expansão para outra unidade).

### Regra de ouro do recorrente

> **Todo serviço de "build" tem uma gestão mensal correspondente. Sempre que identificar um build, identificar também a gestão como Secondary Opportunity.**
> `website` → `website_management` · `ai_chatbot` → `chatbot_management` · `google_business` → `google_management`.
> É aqui que mora a relação de longo prazo. Vender só o build e esquecer a gestão é perder o objetivo do sistema.

### Escolha do 1º serviço recomendado (IF → THEN)

- **IF** negócio tem capacidade alta (premium/multi-unidade) **E** lacuna ampla **→ THEN** Primary = `digital_partner` (Sócio Digital), com diagnóstico gratuito de 30 min como porta.
- **IF** capacidade média **E** sem site **→ THEN** Primary = `website` (ou `landing_page` se for negócio de oferta única) + gestão como secundária.
- **IF** site ok mas presença no Google fraca **→ THEN** Primary = `google_business`/`google_management`.
- **IF** dor central é atendimento manual **→ THEN** Primary = `ai_chatbot` + `whatsapp_automation`.
- **IF** negócio frio / não estabelecido / cidade nova ainda não validada **→ THEN** Primary = tripwire `360_tour` (R$25) como porta de entrada barata, com upsell planejado como Future.

### Long-term client potential

Marcar (em `score_reasons` / `prospect_services.notes`) o potencial: **Alto** (multi-serviço + gestões mensais + multi-unidade), **Médio** (1 build + 1 gestão), **Baixo** (provável transação única, ex: só o tripwire).

**Responsabilidades.** `acquisition-claude` decide Primary/Secondary/Future e o `lead_offer`.

**Próximos caminhos.** Oportunidades mapeadas → **Opportunity Score (Seção 4)** → fila de outreach.

**Erros a evitar.** Identificar uma oportunidade só (perde o potencial completo) · esquecer a gestão mensal · empurrar carro-chefe para quem só comporta tripwire (e vice-versa) · usar nomes livres em vez do `services.code`.

---

# 4. Opportunity Score

**Objetivo.** Traduzir o diagnóstico em um número que **ordena a fila**: quem o humano aborda primeiro, quem espera, quem fica para depois, quem arquiva.

**Inputs.** As 10 lentes (Seção 2) · ICP (Seção 13).

**Outputs.** `opportunity_score` (0–100) + os 4 sub-scores (0–25 cada) + `score_reasons` + `score_updated_at` · evento `score_atualizado` (com `score_before`/`score_after` no `detail`).

### Os 4 sub-scores (travados na M1/M3, 0–25 cada)

| Sub-score | Pergunta | Sobe quando |
|---|---|---|
| `score_need` | Quão urgente é a necessidade? | site fraco/ausente, GMB parado, sem automação |
| `score_authority` | Porte e poder de decisão? | estabelecido, premium, multi-unidade, decisor identificado |
| `score_remote` | Dá para entregar 100% remoto? | carro-chefe remoto; sem dependência de deslocamento |
| `score_contactability` | Fácil de falar com o decisor? | WhatsApp direto, e-mail válido, decisor acessível |

### Faixas de score → ação

| Faixa | Significado | Ação |
|---|---|---|
| **80–100** | Lead quente, fit forte | **Prioridade imediata** — topo da fila, rascunho ainda nesta semana |
| **60–79** | Bom lead | **Abordagem padrão** — entra na rodada normal da campanha |
| **40–59** | Fit parcial | **Oportunidade futura / nutrir** — revisitar na próxima campanha ou quando surgir info nova |
| **0–39** | Fit fraco | **Arquivar/pular** — mantém ficha, não aborda |
| `pesquisa_pendente` | Score **desconhecido** (falta info) | Completar a pesquisa **antes** de decidir — não é o mesmo que score baixo |

### Decisões (IF → THEN)

- **IF** `opportunity_score >= 80` **→ THEN** `priority = alta` em `campaign_prospects`; rascunho prioritário.
- **IF** `60–79` **→ THEN** `priority = media`; entra na fila normal.
- **IF** `40–59` **→ THEN** `priority = baixa`; status segue mas marcar como oportunidade futura; só abordar se houver capacidade sobrando (Seção 14).
- **IF** `< 40` **→ THEN** não abordar; ficha permanece para histórico (não apagar).
- **IF** dois leads empatam no total **→ THEN** desempata por `score_need` (urgência), depois `score_authority` (tamanho da relação).
- **IF** chega info nova que muda a realidade do negócio **→ THEN** re-pontuar e registrar evento `score_atualizado` (o histórico de score mora nos eventos, nunca se perde).

**Responsabilidades.** `acquisition-claude` pontua, re-pontua e ordena a fila — **sozinho** (não é portão humano).

**Próximos caminhos.** Score alto/médio → **Outreach Preparation (Seção 5)**. Score baixo → arquivo. Score desconhecido → `pesquisa_pendente`.

**Erros a evitar.** Inflar score sem evidência · esquecer de re-pontuar quando o cenário muda · tratar `pesquisa_pendente` como score 0 (são coisas diferentes) · pontuar sem escrever `score_reasons` (some a justificativa).

---

# 5. Outreach Preparation

**Objetivo.** Garantir que todo rascunho que chega ao Felipe/Romana esteja **pronto para enviar** — personalizado, no canal certo, para a pessoa certa, com a oferta certa.

**Inputs.** Ficha qualificada + score + oportunidades + `preferred_contact_channel` + `prospect_contacts`.

**Outputs.** Rascunho (WhatsApp pronto para copiar e/ou rascunho no Gmail) · evento `rascunho_criado` · `next_followup_date` provisória.

### Checklist pré-rascunho (os 5 itens do brief)

Antes de escrever qualquer mensagem, confirmar:

1. **Info suficiente?** Nome, cidade, segmento, ao menos um canal válido, e o diagnóstico da Seção 2 feito.
2. **Decisor correto?** O contato é dono/gerente/quem decide? (checar `contact_role` e `prospect_contacts`).
3. **Proposta de valor personalizada?** A mensagem cita algo real do negócio (a lacuna que vimos), não um template cru.
4. **Serviço recomendado definido?** O `lead_offer` está claro e é o 1º serviço da Seção 3.
5. **Canal de comunicação?** Usar `preferred_contact_channel`; default = WhatsApp; e-mail como reforço/alternativa.

### Se faltar informação (IF → THEN)

- **IF** falta o **canal** (sem WhatsApp/e-mail válido) **→ THEN** não rascunhar ainda; voltar para discovery achar o canal; status `pesquisa_pendente`.
- **IF** falta saber **quem é o decisor** **→ THEN** rascunhar uma mensagem de descoberta leve ("com quem falo sobre o site/Google de vocês?") em vez da oferta cheia.
- **IF** falta o **diagnóstico** (não analisei o negócio) **→ THEN** fazer a Seção 2 primeiro; nunca rascunhar oferta genérica.
- **IF** está tudo presente **→ THEN** gerar o rascunho personalizado, no tom consultivo (nunca venda dura), com a porta certa (diagnóstico grátis para carro-chefe; R$25 para tripwire).

### Padrão de tom e oferta (herdado da `rv-prospeccao`)

- Consultivo, curto, sem assinatura no corpo (Felipe coloca a dele).
- Carro-chefe → porta = **diagnóstico gratuito de 30 min**.
- Tripwire → porta = **foto 360° por R$25** (CPF/Pix fixos do playbook).
- **Nunca** cotar preço de serviço maior no rascunho (Seção 6).

**Responsabilidades.** `acquisition-claude` orquestra; `rv-prospeccao` fornece os templates; o **envio é humano**.

**Próximos caminhos.** Rascunho pronto → fila de envio do humano → quando enviado, status `abordado` (Seção 7). Falta info → `pesquisa_pendente`.

**Erros a evitar.** Mandar template genérico · escrever para a pessoa errada · cotar preço · prometer prazo · rascunhar sem ter feito o diagnóstico · ignorar o `preferred_contact_channel`.

---

# 6. Human Approval — o que Claude decide vs. o que precisa de humano

**Objetivo.** Deixar explícito onde está a autonomia (quase tudo) e onde estão os **portões humanos** (poucos, mas inegociáveis). Esta é a seção que torna possível "decidir sem perguntar" sem perder o controle.

### Claude decide e executa SOZINHO (sem perguntar)

- Quem buscar e quem ignorar (discovery, ICP).
- Dedup, criar/atualizar `prospects`, registrar **todo** evento.
- Pontuar e re-pontuar; definir `priority` e a ordem da fila.
- Identificar todas as oportunidades + escolher `lead_offer` e o 1º serviço.
- **Escrever** rascunhos personalizados (WhatsApp e e-mail).
- Definir e agendar `next_followup_date`; incrementar `followup_count`.
- Resumir respostas recebidas + recomendar o próximo passo.
- Recomendar handover e **montar o pacote** pronto.
- Gerar o relatório semanal e rodar o learning loop.
- Mover lead para oportunidade futura ou estado terminal interno (`sem_resposta`, `sem_interesse`).
- Ajustar defaults operacionais do learning loop (ordem da fila, variante de template, canal padrão).

### SEMPRE precisa de Felipe ou Romana (portões)

| Portão | Por quê |
|---|---|
| **Enviar qualquer mensagem externa** | Tudo é rascunho; o disparo é humano (regra congelada M1) |
| **Qualquer preço, desconto, prazo ou escopo comprometido** | Preço é decisão do Felipe |
| **Fechar negócio / contrato / termos** | É de `rv-contrato` + Felipe |
| **Criar o card no VisionFlow (handover)** | Handover é manual (M2) |
| **Reativar um `do_not_contact`** | Só humano religa |
| **1ª abordagem de um segmento/mercado/ângulo NOVO** | Validar a oferta antes de escalar |
| **Falar direto com o cliente** | Claude nunca fala com cliente |
| **Mudança estratégica** (redefinir ICP, trocar oferta-âncora, mudar limites de capacidade) | Decisão de dono |

### Regra de decisão (IF → THEN)

- **IF** a ação está na lista "decide sozinho" **→ THEN** executar e registrar evento (`actor_type = ai_agent`).
- **IF** a ação cruza um portão **→ THEN** **parar, preparar tudo pronto, e recomendar** ao humano — nunca executar o passo do portão.
- **IF** estiver em dúvida se algo é portão **→ THEN** tratar como portão (errar para o lado seguro).

**Erros a evitar.** Enviar mensagem "porque parecia óbvio" · cotar preço para destravar uma conversa · criar o card no VisionFlow sozinho · reabordar um opt-out.

---

# 7. Follow-up Engine

**Objetivo.** Manter o funil em movimento com a quantidade certa de toques — nem esquecer, nem encher o saco.

**Inputs.** `current_status`, `next_followup_date`, `followup_count`, `last_response_summary`, `do_not_contact`.

**Outputs.** Novos rascunhos de follow-up · evento `follow_up` · atualização de `next_followup_date`/`followup_count`/status.

### Cadência padrão (sem resposta)

| Toque | Quando | Conteúdo |
|---|---|---|
| T0 — abordagem | dia 0 | Oferta personalizada (Seção 5) → status `abordado` |
| Follow-up 1 | T+4 dias | Nudge curto ("viram minha mensagem?") |
| Follow-up 2 | T+10 dias do T0 | Ângulo de valor diferente / trocar de canal (WA↔e-mail) |
| Encerrar ciclo | após FU2 sem resposta | status `sem_resposta` → **oportunidade futura** |

- **Máximo: 3 toques por ciclo de campanha** (1 abordagem + 2 follow-ups).
- "Sem resposta" **não** é `do_not_contact`. É um lead que esfriou e volta na próxima rodada (~60–90 dias) com novo ângulo.

### Lógica por cenário (IF → THEN)

| Resposta do lead | THEN |
|---|---|
| **Sem resposta** (passou da data) | Próximo follow-up até o limite; depois `sem_resposta` + futura |
| **"Talvez depois"** | status fica `interessado` morno; `next_followup_date` = +30 dias; `followup_count` reseta |
| **"Depois da temporada"** | agendar reinício para o **fim da sazonalidade** informada (anotar a data real em `discovery_notes`) |
| **"Depois das festas/feriado"** | reinício para ~1ª semana após o feriado citado |
| **"Já tenho agência"** | status `sem_interesse`; **não** insistir no mesmo serviço; marcar Future = revisão/complemento; reabordar em ~6 meses com ângulo diferente |
| **"Sem orçamento agora"** | status `interessado` morno; oferecer a porta mais barata (tripwire/diagnóstico); reinício +60 dias |
| **"Interessado"** | parar follow-up automático; resumir + **recomendar handover** (Seção 9) |
| **"Quero proposta"** | status `proposta_enviada` (após humano); **portão de preço** → recomendar ao Felipe; handover |
| **"Quero reunião"** | status `reuniao_marcada` (após humano confirmar); handover |
| **Parou de responder no meio** | tratar como "sem resposta" a partir do último toque; respeitar o limite de 3 |
| **Respondeu meses depois** | **reabrir** o lead: `followup_count` reseta, status volta para `interessado`/`abordado` conforme o teor, registrar evento `resposta_recebida` — o histórico antigo continua na timeline |

### Stop conditions (parar de seguir)

- Atingiu o máximo de toques sem resposta → `sem_resposta`.
- `sem_interesse` explícito → parar (guardar Future se fizer sentido).
- `do_not_contact = true` → parar imediatamente, para sempre (até humano religar).
- Virou `interessado`/`reuniao_marcada`/`proposta_enviada` → sai do follow-up, entra em handover.

### Restart conditions (voltar a seguir)

- Nova campanha na cidade/segmento (lead frio volta com ângulo novo).
- Data combinada chegou ("depois da temporada/festas").
- O lead respondeu (mesmo meses depois) → reabre e reseta o contador.

**Responsabilidades.** `acquisition-claude` agenda e rascunha; o **envio é humano**; `rv-prospeccao` dá o texto do nudge.

**Próximos caminhos.** Resposta positiva → Response Engine (Seção 8) → Handover (Seção 9). Sem resposta → futura.

**Erros a evitar.** Passar de 3 toques (vira spam) · esquecer um follow-up vencido (a query semanal pega isso) · reabordar `do_not_contact` · perder a data combinada de reinício · seguir abordando quem já virou `interessado`.

---

# 8. Response Decision Engine

**Objetivo.** Para cada resposta do cliente, decidir o próximo passo certo — registrando, resumindo e rascunhando, sem cruzar portões.

**Inputs.** O texto da resposta · a ficha + oportunidades.

**Outputs.** Evento `resposta_recebida` (+ `last_response_summary`) · novo status · rascunho de réplica · recomendação de próximo passo (e de handover, se for o caso).

### Árvores de decisão (situações do brief)

**Cliente só quer Google.**
→ Atender o pedido (rascunho focado em `google_business`/`google_management`). **E** registrar as outras oportunidades como Future. Plantar o próximo passo de forma leve ("o Google rende muito mais quando conecta com o site/automação — depois te mostro"). Status → `interessado`. Não empurrar tudo de uma vez.

**Cliente só quer Website.**
→ Conduzir o `website`. **Sempre** anexar a gestão mensal (`website_management`) como Secondary no mesmo papo (é o recorrente). 360/foto como Future para enriquecer o site. Status → `interessado` → handover.

**Cliente só quer AI/chatbot.**
→ Conduzir `ai_chatbot` + `chatbot_management`. Mapear `whatsapp_automation`/`crm` como Secondary. Status → `interessado` → handover.

**Cliente só quer 360.**
→ É a porta de entrada: entregar o tripwire/tour e **planejar o upsell** (site, GMB, automação) como Future explícito na ficha. Status → conforme o caso; registrar a venda do `360_tour` em `prospect_services` (`vendida`) e seguir nutrindo o resto.

**Cliente pede preço imediatamente.**
→ **Portão de preço.** Claude **não cota**. Rascunhar resposta que (a) valoriza o interesse, (b) explica que o preço certo sai do **diagnóstico gratuito de 30 min** (porque depende do escopo real), (c) convida para esse diagnóstico. Sinalizar ao Felipe que houve pedido de preço. Status → `interessado`.

**Cliente pede reunião.**
→ Status → `reuniao_marcada` (após humano confirmar horário). Recomendar **handover** (Seção 9) com o pacote pronto. Claude prepara o briefing da reunião; quem conduz é Felipe/Romana.

**Cliente rejeita um serviço.**
→ Não insistir nesse serviço. Marcar aquela oportunidade como `descartada` em `prospect_services`. Verificar se outra oportunidade do mesmo negócio faz sentido **agora**; se sim, pivotar com cuidado; se não, status `sem_interesse` + Future.

**Cliente poderia se beneficiar de outro serviço.**
→ Registrar a nova oportunidade em `prospect_services` (`identificada`). Introduzir só **depois** de entregar valor no primeiro (sequência, não enxurrada). Anotar como Future/Secondary.

**Cliente tem várias unidades/locais.**
→ Sinal forte de relação grande (`score_authority` ↑). Tratar como **um** negócio na ficha canônica, com as unidades anotadas (`notes`/`prospect_contacts`). Oportunidade natural = `digital_partner` (Sócio Digital) cobrindo as unidades. Potencial de longo prazo = Alto.

**Existem vários decisores.**
→ Registrar cada um em `prospect_contacts` (com `role`); marcar o principal `is_primary = true`. Direcionar o rascunho ao decisor com mais poder/acesso. Não disparar para todos ao mesmo tempo (parece spam interno).

### Regra geral (IF → THEN)

- **IF** a resposta é positiva e concreta (interesse/reunião/proposta) **→ THEN** atualizar status + recomendar handover.
- **IF** é objeção **→ THEN** aplicar o cenário da Seção 7 + registrar a objeção (alimenta o learning loop, Seção 15).
- **IF** pede algo que é portão (preço, fechar) **→ THEN** preparar e recomendar ao humano, nunca executar.
- **IF** pede para não receber mais mensagens **→ THEN** `do_not_contact = true` imediatamente.

**Responsabilidades.** `acquisition-claude` interpreta, resume, rascunha e recomenda; humano envia e decide portões.

**Próximos caminhos.** Quente → Handover. Objeção → Follow-up futuro. Opt-out → terminal.

**Erros a evitar.** Cotar preço para "fechar" · despejar todos os serviços de uma vez · ignorar a objeção (não registrar) · perder o histórico ao reabrir.

---

# 9. Handover Engine

**Objetivo.** Passar para o VisionFlow exatamente os leads que esquentaram — com tudo que a venda precisa — e **só** esses.

**Inputs.** Status do lead · ficha completa + histórico + oportunidades.

**Outputs.** **Pacote de handover** (texto pronto para virar card) · recomendação ao humano · após o card: `visionflow_client_id` + `handover_at` + evento `handover_feito` + status `handover_visionflow`.

### Quando recomendar handover (gatilhos travados M1/M2)

- **IF** status vira `interessado`, `reuniao_marcada` **ou** `proposta_enviada` **→ THEN** recomendar handover e montar o pacote.

### O que SEMPRE acompanha o pacote

1. Nome do negócio + cidade + segmento.
2. Contato principal (canal + decisor) e demais decisores relevantes.
3. `opportunity_score` + os 4 sub-scores + `score_reasons`.
4. **Todas** as oportunidades (`prospect_services`): Primary, Secondary, Future — com a gestão mensal destacada.
5. Histórico curto (timeline resumida: quando foi abordado, o que respondeu).
6. `last_response_summary` (a última resposta, na íntegra do resumo).
7. Próximo passo sugerido (ex: "agendar diagnóstico de 30 min", "preparar proposta de Website + gestão").

### Quando NÃO passar (IF → THEN)

- **IF** o lead ainda está frio (`novo`, `abordado`, `sem_resposta`) **→ THEN** não passar — handover só com lead morno/quente.
- **IF** é só curiosidade sem intenção real **→ THEN** manter em aquisição (nutrir), não poluir o VisionFlow.
- **IF** faltam dados essenciais do pacote **→ THEN** completar antes de recomendar (handover incompleto trava a venda).
- **IF** é `sem_interesse`/`do_not_contact` **→ THEN** nunca passar.
- **IF** já foi passado (`visionflow_client_id` preenchido) **→ THEN** não duplicar; só registrar `nota` se houver novidade.

### Depois do handover

- Felipe/Romana criam o card no VisionFlow (portão humano).
- Claude grava `visionflow_client_id`, `handover_at`, evento `handover_feito`, status `handover_visionflow`.
- A ficha **permanece** no Acquisition DB como histórico. Aquisição **para** de conduzir; VisionFlow assume.

**Responsabilidades.** `acquisition-claude` recomenda e monta; **humano cria o card**; depois Claude registra a ligação.

**Erros a evitar.** Passar lead frio · passar com pacote incompleto · criar o card sozinho · duplicar handover · continuar tocando o lead depois de entregue.

---

# 10. Weekly Operating Cycle

**Objetivo.** Dar ritmo semanal previsível à aquisição e medir se está funcionando.

**Inputs.** O banco inteiro (`prospects`, `prospect_events`, `campaigns`, `prospect_services`) · o `report_snapshot` da semana anterior.

**Outputs.** O **relatório semanal** (texto de 7 partes da M1) persistido em `report_snapshots` · a fila priorizada da semana · as recomendações.

### Rotina da semana (ordem)

1. **Follow-ups vencendo** — query: `next_followup_date <= fim_da_semana AND current_status IN (abordado, sem_resposta) AND do_not_contact = false`. Rascunhar todos.
2. **Respostas a processar** — todo `resposta_recebida` não tratado → resumir + decidir (Seção 8).
3. **Leads quentes** — `interessado`/`reuniao_marcada`/`proposta_enviada` sem handover → montar pacote (Seção 9).
4. **Capacity check** — comparar o pipeline com os limites da Seção 14 antes de abrir nova abordagem.
5. **Nova abordagem** — só dentro da capacidade; priorizar score 80–100 e Tier A.
6. **Mover para futura** — quem estourou o follow-up vira oportunidade futura.
7. **Learning loop** — rodar a Seção 15 e anexar as recomendações.
8. **Gerar e salvar** o relatório (`report_snapshots`).

### O relatório semanal (7 partes — formato M1, não muda)

Leads novos + score · Abordados/rascunhos prontos · Respostas + próximo passo · Prontos para VisionFlow · Follow-ups vencendo · Números (encontrados · abordados · responderam · passaram) · 1–3 recomendações.

### Como medir sucesso (métricas, todas derivadas do banco)

| Métrica | Como |
|---|---|
| **Reach** | nº abordados na semana |
| **Response rate** | respostas ÷ abordados |
| **Hot rate** | (interessado+reunião+proposta) ÷ abordados |
| **Handover rate** | handovers ÷ abordados |
| **Tempo médio** abordagem → quente | dos eventos |
| **Tendência** | comparar com os `report_snapshots` anteriores |

### Decisões (IF → THEN)

- **IF** response rate caindo 2 semanas seguidas **→ THEN** o learning loop revisa template/canal/segmento.
- **IF** muitos quentes parados sem handover **→ THEN** priorizar montar pacotes antes de abrir novos leads.
- **IF** capacidade no limite **→ THEN** não abrir nova abordagem (Seção 14).

**Responsabilidades.** `acquisition-claude` roda o ciclo inteiro sozinho; entrega o relatório ao Felipe/Romana.

**Erros a evitar.** Abrir leads novos com o fundo do funil entupido · pular o capacity check · não salvar o snapshot (perde a tendência) · contar números na mão em vez de consultar o banco.

---

# 11. Mistake Prevention

**Objetivo.** Regras explícitas que blindam o sistema contra os erros que destroem um funil ao longo dos anos.

| Risco | Regra de prevenção (IF → THEN) |
|---|---|
| **Outreach duplicado** | **IF** `last_contacted_at` recente OU `status_in_campaign = abordado` **→ THEN** não reabordar |
| **Prospect duplicado** | **IF** vai criar ficha **→ THEN** dedup obrigatório: `name_normalized + city_normalized`, depois phone/email/domain, depois fuzzy (`pg_trgm`). Se existe → evento, não nova linha |
| **Follow-up esquecido** | **IF** roda o ciclo semanal **→ THEN** a query de follow-ups vencendo é o passo 1, sempre |
| **Contatar quem optou por sair** | **IF** `do_not_contact = true` **→ THEN** ignorar em toda automação; só humano religa |
| **Priorização ruim** | **IF** ordenar a fila **→ THEN** por `opportunity_score` desc + Tier do ICP; nunca por ordem de chegada |
| **Recomendar serviço errado** | **IF** escolher `lead_offer` **→ THEN** tem que sair do diagnóstico das 10 lentes; nada de chute |
| **Perder histórico** | **IF** qualquer ação acontece **→ THEN** vira evento append-only com `actor`/`actor_type`; nunca UPDATE/DELETE em `prospect_events` |
| **Informação inconsistente** | **IF** atualizar a ficha **→ THEN** o "último estado" denormalizado tem que bater com o último evento; a verdade é a timeline |
| **Over-contact** | **IF** `followup_count >= 3` no ciclo **→ THEN** parar; vira futura |
| **Trabalho desnecessário** | **IF** lead é anti-ICP ou score < 40 **→ THEN** não investir esforço de abordagem |
| **Ação humana fora do agente** | **IF** Felipe/Romana agirem direto no banco (emergência) **→ THEN** também vira evento (`actor_type = human`) para não furar a timeline |

**Erros a evitar (meta-regra).** Quando duas regras conflitarem, vencem, nesta ordem: (1) `do_not_contact`, (2) portões humanos, (3) capacidade, (4) prioridade por score.

---

# 12. Decision Rules — biblioteca mestre IF → THEN

**Objetivo.** Um índice único de regras que cobre o ciclo inteiro, para o Acquisition Claude sempre saber o próximo passo. (Resumo executável; o detalhe está nas seções acima.)

### Descoberta & criação
- IF negócio cabe no ICP e tem info mínima → criar `prospect` (após dedup) + evento `encontrado`.
- IF falta canal de contato → `pesquisa_pendente` + `discovery_notes`.
- IF é anti-ICP / já é cliente / `do_not_contact` → não criar/abordar.
- IF ficha já existe → registrar evento, não duplicar.

### Qualificação & score
- IF diagnóstico das 10 lentes feito → preencher `score_reasons` + 4 sub-scores → evento `qualificado`.
- IF score ≥ 80 → `priority = alta`. IF 60–79 → `media`. IF 40–59 → `baixa`/futura. IF < 40 → arquivar.
- IF info nova muda o cenário → re-pontuar + evento `score_atualizado`.

### Oportunidade
- IF identificou um build → identificar a gestão mensal junto (recorrente).
- IF capacidade alta + lacuna ampla → Primary = `digital_partner`.
- IF negócio frio / cidade nova → Primary = tripwire `360_tour`.

### Preparação & abordagem
- IF checklist (5 itens) ok → gerar rascunho + evento `rascunho_criado`.
- IF falta decisor → rascunho de descoberta. IF falta diagnóstico → fazer Seção 2 primeiro.
- IF rascunho enviado (humano) → status `abordado` + evento `abordado_wa`/`abordado_email` + setar `next_followup_date`.

### Follow-up
- IF sem resposta e passou a data → próximo follow-up até 3 toques; depois `sem_resposta` + futura.
- IF "talvez/depois da temporada/festas" → agendar reinício na data real; resetar contador.
- IF "já tem agência" → `sem_interesse`; reabordar em ~6 meses com ângulo novo.
- IF respondeu meses depois → reabrir, resetar contador.

### Resposta
- IF interesse/reunião/proposta → atualizar status + recomendar handover.
- IF pede preço → não cotar; oferecer diagnóstico; sinalizar humano.
- IF rejeita um serviço → `descartada` nessa oportunidade; avaliar pivô.
- IF multi-unidade → `digital_partner`; potencial Alto.
- IF vários decisores → registrar todos; falar com o principal.
- IF pede opt-out → `do_not_contact = true`.

### Portões (sempre humano)
- IF enviar / cotar / fechar / criar card VisionFlow / religar opt-out / 1ª vez em mercado novo / falar com cliente → preparar e recomendar; nunca executar.

### Handover
- IF status quente → montar pacote completo + recomendar.
- IF frio / incompleto / sem interesse → não passar.
- IF card criado (humano) → gravar `visionflow_client_id` + evento `handover_feito` + status `handover_visionflow`.

### Ciclo & capacidade
- IF roda a semana → follow-ups vencendo primeiro; capacity check antes de novos leads.
- IF capacidade no limite → segurar topo do funil.

### Aprendizado
- IF fim da semana → rodar learning loop + salvar `report_snapshot`.
- IF mudança estratégica sugerida → recomendar ao Felipe (portão).

---

# 13. Ideal Customer Profile (ICP)

**Objetivo.** Definir com precisão o cliente que a Real Vision quer — e o que não quer — para que discovery, score e fila apontem todos para o mesmo lugar.

**Inputs.** EMPRESA.md (posicionamento, segmentos, portfólio) · priorização validada na `rv-prospeccao`.

**Outputs.** Tier de fit (A/B/C/Anti) que alimenta `score_authority`/`score_remote` e a ordem da fila — **sem criar campo novo** (é uma leitura do score + `score_reasons`).

### As camadas

**Tier A — cliente ideal (prioridade máxima).**
Negócio **estabelecido** + posicionamento **premium** **ou** **multi-unidade** + **lacuna digital clara** (site fraco/ausente, GMB parado, sem automação) + **decisor acessível** + **atende 100% remoto**.
Segmentos-âncora: **pousadas, restaurantes, eventos, condomínios, hubs comerciais, operadoras de turismo** (onde a Real Vision tem portfólio e prova social).

**Tier B — bom cliente.**
Estabelecido, com 1–2 lacunas digitais claras, mas com menos sinais de porte ou de recorrência. Vale a abordagem padrão.

**Tier C — baixa prioridade.**
Fit fraco (pouca lacuna, pouca capacidade, ou contato difícil). Mantém ficha; raramente abordado; entra só com capacidade sobrando.

**Anti-ICP — pular (não abordar).**
- Redes e franquias (decisão não é local).
- Hotéis grandes (100+ quartos) com fotógrafo/agência próprios.
- Altíssimo padrão que já tem tudo.
- Sem presença física para sustentar relação digital.
- `do_not_contact = true`.

### Indicadores positivos (somam fit)

- Negócio **estabelecido**, com operação real e histórico (reviews antigas, presença consistente).
- **Potencial de recorrência**: builds que abrem espaço para gestão mensal (site, chatbot, GMB).
- **Fit remoto**: carro-chefe (site, automação, IA, GMB) resolve sem depender de deslocamento.
- **Lacuna digital visível**: sem site ou site fraco, GMB parado, atendimento manual no WhatsApp.
- **Decisor acessível**: WhatsApp direto ou e-mail válido, dono/gerente identificável.
- **Porte ou recorrência**: multi-unidade, posicionamento premium, sinal de expansão.
- Segmento-âncora (pousada, restaurante, evento, condomínio, hub, operadora de turismo) — onde a Real Vision já tem portfólio e prova social.

### Indicadores desqualificantes (tiram ou reduzem fit)

- Rede/franquia — decisão não é local.
- Hotel grande (100+ quartos) — costuma ter fotógrafo/agência própria.
- Já tem presença digital forte em tudo — pouca lacuna para vender.
- Sem presença física / sem operação real para sustentar relação de longo prazo.
- Só telefone fixo, sem WhatsApp/celular — contactabilidade baixa.
- Sinais de fechamento (reviews paradas há 1+ ano, "fechado permanentemente").
- Já é cliente Real Vision (cruzar com VisionFlow) — fora do escopo de aquisição.
- `do_not_contact = true`.

### ICP × categorias de oferta

O fit do ICP também se mede pela oferta que o negócio comporta (catálogo completo na Seção 3):

- **Core (carro-chefe)** — Website, Landing Page, Cartão Digital, Chatbot IA, gestão mensal. É o que define Tier A/B: negócio comporta e sustenta uma relação recorrente nessas frentes.
- **Supporting (suporte)** — Google Business, sistemas de reserva, hosting, domínio, CRM, automações. Reforça o fit, mas raramente é a porta de entrada sozinho.
- **Visual (porta de entrada / upsell)** — 360°, fotografia, drone. Serve para negócios frios ou cidades novas ainda não validadas (tripwire), nunca como critério principal de Tier.

### Decisões (IF → THEN)

- **IF** Tier A **→ THEN** topo da fila + tende ao carro-chefe (`digital_partner`/site+gestão).
- **IF** Tier B **→ THEN** fila padrão.
- **IF** Tier C **→ THEN** só com folga de capacidade; muitas vezes só o tripwire.
- **IF** Anti-ICP **→ THEN** não abordar (mantém ficha por histórico).

**Responsabilidades.** `acquisition-claude` classifica o tier no ato da qualificação. Redefinir o ICP é **portão estratégico** (Felipe).

**Próximos caminhos.** Tier define prioridade na fila (Seção 4) e o tipo de oferta (Seção 3).

**Erros a evitar.** Gastar a semana em Tier C/Anti-ICP · oferecer carro-chefe a quem só comporta tripwire · alterar o ICP sem o Felipe.

---

# 14. Capacity Management

**Objetivo.** Respeitar a capacidade real de execução (Felipe + Romana) e nunca encher o funil mais rápido do que dá para entregar. Aquisição que gera mais do que o time atende vira frustração e cliente mal atendido.

**Inputs.** Contagens do banco por status · os limites (diais que o Felipe ajusta).

**Outputs.** Decisão de **abrir ou segurar** nova abordagem na semana.

### Limites WIP (work-in-progress) propostos — ajustáveis pelo Felipe

| Limite | Valor inicial | Onde medir |
|---|---|---|
| **Prospects ativos** (`abordado` + `sem_resposta` + `interessado` pedindo atenção) | **~120** total (~60 por dono) | `current_status` |
| **Nova abordagem por semana** | **~25 rascunhos** | eventos `abordado_*` da semana |
| **Reuniões por semana** | **4** | status `reuniao_marcada` |
| **Propostas por semana** | **3** | status `proposta_enviada` |
| **Follow-ups vencendo por semana** | **~20** | `next_followup_date` na semana, status `abordado`/`sem_resposta` |

**Base dos números.** Provisórios, calculados sobre ~35h/semana de capacidade operacional de Felipe + Romana (tempo de aquisição, não de entrega de projeto). Referência aproximada: 25 rascunhos de abordagem (~10min cada) + 20 follow-ups (~5min cada) + preparação de 4 reuniões e 3 propostas ficam dentro de poucas horas semanais dedicadas à aquisição — o resto da capacidade é fundo de funil e entrega. **Ajustar livremente conforme a realidade real do time.**

### Regra-mãe (IF → THEN)

> **O gargalo é o fundo do funil (reuniões → propostas → entrega), não o topo.**

- **IF** as reuniões **ou** as propostas da semana estão no limite **→ THEN** **segurar** nova abordagem; priorizar mover os já-quentes para handover.
- **IF** prospects ativos ≥ limite **→ THEN** não abrir leads novos; trabalhar a base (follow-ups + respostas).
- **IF** há folga em todos os limites **→ THEN** abrir nova abordagem, começando por score 80–100 / Tier A.
- **IF** o Felipe/Romana avisam que estão sobrecarregados **→ THEN** reduzir os limites temporariamente e registrar `nota`.

**Responsabilidades.** `acquisition-claude` checa a capacidade **antes** de cada rodada de abordagem (passo 4 do ciclo semanal). Mudar os limites é **portão estratégico**.

**Próximos caminhos.** Com folga → discovery/abordagem. Sem folga → foco no fundo do funil.

**Erros a evitar.** Abrir 50 leads quando há 10 reuniões represadas · ignorar o capacity check para "bater número" · manter limites altos quando o time está no limite real.

---

# 15. Continuous Learning Loop

**Objetivo.** A cada semana, aprender com o que aconteceu e melhorar a aquisição da semana seguinte — para a estratégia ficar mais afiada ao longo dos anos.

**Inputs.** `prospect_events` (a verdade do que aconteceu) + `report_snapshots` (tendência) — **sem schema novo**; tudo é derivado.

**Outputs.** Um bloco de aprendizados anexado ao relatório semanal + ajustes operacionais aplicados + recomendações estratégicas para o Felipe.

### O que o loop mede (todas as semanas)

| Pergunta | Como (derivado dos eventos) |
|---|---|
| Quais **segmentos** converteram melhor? | response/hot rate por `segment` |
| Qual **1º serviço** (`lead_offer`) puxou mais resposta? | response rate por `lead_offer` |
| Qual **canal** rendeu mais? | response rate por `channel` (wa vs email) |
| Quais **mensagens** funcionaram melhor? | comparar variantes de template pelos eventos `abordado_*` → `resposta_recebida` |
| Quais **objeções** apareceram mais? | taxonomia dos `resposta_recebida` (já tem agência / sem orçamento / sem tempo / depois…) |
| Quais **scores** realmente levaram a reunião/proposta/venda? | comparar `opportunity_score` no momento da abordagem (`score_atualizado` mais próximo do evento `abordado_*`) contra o status final alcançado (`reuniao_marcada`/`proposta_enviada`/`ganho`) — valida se o score da Seção 4 está calibrado |

### O que o loop faz com isso (IF → THEN)

**Ajustes operacionais — Claude aplica sozinho:**
- **IF** um canal rende consistentemente mais **→ THEN** vira `preferred_contact_channel` padrão para o segmento.
- **IF** uma variante de mensagem converte mais **→ THEN** promovê-la a template padrão da próxima rodada.
- **IF** um 1º serviço puxa mais resposta num segmento **→ THEN** recomendá-lo primeiro com mais frequência nesse segmento.
- **IF** uma objeção é recorrente **→ THEN** antecipá-la no próprio template (tratar antes de aparecer).

**Mudanças estratégicas — Claude recomenda, Felipe decide (portão):**
- **IF** um segmento converte mal de forma consistente **→ THEN** recomendar despriorizá-lo no ICP/discovery.
- **IF** os dados sugerem trocar a oferta-âncora ou os limites de capacidade **→ THEN** recomendar ao Felipe — não aplicar sozinho.

### Onde o aprendizado vive

No próprio `report_snapshots.recommendations` (semana a semana) e nas `notes` de `campaigns`/`prospect_services`. A tendência de 3 anos sai de comparar os snapshots — sem precisar de tabela nova.

**Responsabilidades.** `acquisition-claude` roda o loop no fim do ciclo semanal (passo 7) e separa o que aplica do que recomenda.

**Próximos caminhos.** Ajustes alimentam a próxima semana de discovery/abordagem; recomendações estratégicas vão para o Felipe.

**Erros a evitar.** Mudar a estratégia sozinho (é portão) · tirar conclusão de amostra pequena (esperar volume) · aprender e não aplicar (loop morto) · medir na mão em vez de derivar dos eventos.

---

# Apêndice — Mapa de cobertura

**Todo status do funil tem entrada e saída definidas:**

| Status | Entra quando | Sai para |
|---|---|---|
| `novo` | ficha criada | `pesquisa_pendente` / `abordado` |
| `pesquisa_pendente` | falta info | volta ao fluxo quando completa |
| `abordado` | humano enviou 1ª mensagem | `sem_resposta` / `interessado` / `sem_interesse` / `reuniao_marcada` / `proposta_enviada` |
| `sem_resposta` | estourou os 3 toques | futura → reabre em nova campanha ou se responder |
| `sem_interesse` | recusou | futura (~6 meses) ou terminal |
| `interessado` | resposta positiva | `reuniao_marcada` / `proposta_enviada` / `handover_visionflow` |
| `reuniao_marcada` | reunião confirmada (humano) | `handover_visionflow` |
| `proposta_enviada` | proposta enviada (humano) | `handover_visionflow` |
| `handover_visionflow` | card criado (humano) | `ganho` / `perdido` (no VisionFlow) |
| `ganho` / `perdido` | terminal | permanece como histórico imutável |

**Portões humanos (resumo):** enviar · cotar/prazo/escopo · fechar/contrato · criar card VisionFlow · religar `do_not_contact` · 1ª vez em mercado novo · falar com cliente · mudança estratégica (ICP/oferta/capacidade).

**Este documento é o manual operacional permanente do departamento de aquisição da Real Vision.** Consistente com as Missões 1–3 (congeladas). A próxima missão é a operação contínua com o banco construído.
