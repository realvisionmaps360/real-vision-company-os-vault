# Plano de Integração de IA de Voz no Sistema de Prospecção (Acquisition OS)

> **Status:** 📋 Planejamento — Aguardando validação do Felipe
> **Data:** 05/07/2026
> **Relacionado:** [[ACQUISITION-OPERATING-SYSTEM]] · [[ACQUISITION-CLAUDE]] · [[rv-prospeccao]] · [[ACQUISITION-DATA-MODEL]]

---

## 1. Contexto e Oportunidade

O vídeo transcrito descreve **duas arquiteturas** para fazer chamadas de voz com IA para prospecção:

| Opção | Tecnologia | Voz PT-BR | Custo | Limite Simultâneo | Infra Necessária |
|-------|------------|-----------|-------|-------------------|------------------|
| **Opção 1** | **Ultravox** (gratuito até 30 min/mês, depois paga por min) | ✅ Tem voz PT | Grátis até 30 min/mês | 5 chamadas simultâneas | **SIP** (ex: Tentec, Twilio) — Ultravox **não tem número próprio** |
| **Opção 2** | **Gemini Live API** (voz nativa) | ✅ Tem vozes PT | Pay-per-use (input/output tokens + audio) | Sem limite duro citado | **Número de telefone** (Twilio, Tentec, etc.) |

**Oportunidade para Real Vision:** Usar IA de voz para **escalar a prospecção ativa** (cold calling) mantendo o **portão humano** (Felipe/Romana decidem quem ligar, aprovam script, recebem resumo).

---

## 2. Onde Encaixa no Acquisition OS (Pontos de Integração)

### 2.1 Fluxo Atual (Resumo do ACQUISITION-OPERATING-SYSTEM)

```
Lead Discovery → Business Analysis → Opportunity ID → Scoring → Outreach Prep
                                                    ↓
                                            Human Approval (Gate)
                                                    ↓
                                            Human Sends WhatsApp/Email
                                                    ↓
                                            Follow-up Engine → Response Engine → Handover → VisionFlow
```

### 2.2 Novo Canal: **Voice AI Outreach** (Paralelo ao WhatsApp/Email)

```
                                    ┌─────────────────────────────────────┐
                                    │  OUTREACH PREPARATION (Seção 5)     │
                                    │  acquisition-claude prepara tudo    │
                                    └──────────────┬──────────────────────┘
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    ▼                              ▼                              ▼
           ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
           │   WHATSAPP      │            │     EMAIL       │            │    VOICE AI     │
           │  (rascunho WA)  │            │ (rascunho Gmail)│            │  (novo canal)   │
           └────────┬────────┘            └────────┬────────┘            └────────┬────────┘
                    │                              │                              │
                    ▼                              ▼                              ▼
           ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
           │ HUMAN APPROVES  │            │ HUMAN APPROVES  │            │ HUMAN APPROVES  │
           │ & SENDS         │            │ & SENDS         │            │ CALL LIST +     │
           └────────┬────────┘            └────────┬────────┘            │ SCRIPT +        │
                    │                              │                     │ APPROVES CALL   │
                    ▼                              ▼                     └────────┬────────┘
           ┌─────────────────┐            ┌─────────────────┐                  │
           │  Lead responde  │            │  Lead responde  │                  ▼
           │  (evento resp)  │            │  (evento resp)  │         ┌─────────────────┐
           └────────┬────────┘            └────────┬────────┘         │ VOICE AI AGENT  │
                    │                              │                 │ FAZ LIGAÇÕES    │
                    ▼                              ▼                 │ (Ultravox/Gemini)│
           ┌─────────────────────────────────────────────────┐        └────────┬────────┘
           │         RESPONSE DECISION ENGINE (Seção 8)      │                  │
           │   (resumo + próximo passo + handover check)     │                  ▼
           └─────────────────────────────────────────────────┘         ┌─────────────────┐
                                                                        │ CALL OUTCOME    │
                                                                        │ (evento chamada)│
                                                                        └────────┬────────┘
                                                                                 │
                                                                                 ▼
                                                                        ┌─────────────────┐
                                                                        │ RESPONSE ENGINE │
                                                                        │ processa outcome│
                                                                        └────────┬────────┘
                                                                                 │
                                                                                 ▼
                                                                        ┌─────────────────┐
                                                                        │ HANDOVER /      │
                                                                        │ FOLLOW-UP /     │
                                                                        │ ARQUIVAR        │
                                                                        └─────────────────┘
```

### 2.3 Eventos Novos no Banco (`prospect_events`)

| Evento | Quando | Campos Extras (`detail` JSONB) |
|--------|--------|-------------------------------|
| `voice_call_approved` | Humano aprova lista de ligação | `call_list_id`, `script_version`, `approved_by`, `channel: "voice_ai"` |
| `voice_call_initiated` | IA inicia ligação | `call_id`, `provider` (ultravox/gemini), `sip_trunk`, `prospect_id` |
| `voice_call_completed` | Ligação termina (qualquer outcome) | `call_id`, `duration_sec`, `outcome` (answered/no_answer/busy/voicemail/failed), `transcript`, `summary`, `interest_level` (none/low/medium/hot), `next_action` |
| `voice_call_handover_recommended` | IA detecta lead quente | `call_id`, `prospect_id`, `reason`, `suggested_next_step` |

### 2.4 Novos Campos em `prospects` (ou `prospect_contacts`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `voice_call_consent` | boolean | Opt-in explícito para receber ligação de IA (LGPD) |
| `preferred_contact_channel` | enum | Adicionar `'voice_ai'` como opção junto com `whatsapp`, `email` |
| `last_voice_call_at` | timestamp | Última tentativa de ligação |
| `voice_call_count` | int | Contador de tentativas de voz (respeitar limite de 3 toques/ciclo igual WhatsApp) |

---

## 3. Arquitetura Técnica

### 3.1 Opção 1: Ultravox + SIP (Recomendada para começar — gratuito até 30 min/mês)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ARQUITETURA ULTRAVOX + SIP                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────┐  │
│  │ Acquisition  │────▶│   n8n /      │────▶│   Ultravox   │────▶│  SIP  │  │
│  │   Claude     │     │   Python     │     │   Agent      │     │ Trunk │  │
│  │  (orquestra) │     │  (workflow)  │     │  (prompt +   │     │(Tentec│  │
│  └──────────────┘     └──────────────┘     │   tools)     │     │/Twilio)    │
│        ▲                   ▲                └──────┬───────┘     └───────┘  │
│        │                   │                       │                         │
│        │            ┌──────┴──────┐                │                         │
│        │            │  Prospect   │                │                         │
│        │            │  Data +     │                ▼                         │
│        │            │  Script     │         ┌──────────────┐                │
│        │            └─────────────┘         │   PSTN /     │                │
│        │                                    │   Mobile     │                │
│        │                                    │   Network    │                │
│        │                                    └──────┬───────┘                │
│        │                                           │                        │
│        │                  ┌────────────────────────┘                        │
│        │                  ▼                                                 │
│        │         ┌─────────────────┐                                       │
│        │         │  Call Webhook   │                                       │
│        │         │  (n8n/Python)   │                                       │
│        │         │  → transcript   │                                       │
│        │         │  → summary      │                                       │
│        │         │  → outcome      │                                       │
│        │         │  → prospect_    │                                       │
│        │         │    events       │                                       │
│        │         └────────┬────────┘                                       │
│        │                  │                                               │
│        └──────────────────┘                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Componentes:**

| Componente | Papel | Tech Sugerida |
|------------|-------|---------------|
| Orquestrador | Prepara lista, script, dispara workflow, recebe webhook | **n8n** (visual, webhook nativo) OU **Python script** (mais controle) |
| Ultravox Agent | Executa a conversa de voz | Ultravox Cloud (grátis 30min/mês) |
| SIP Trunk | Conecta Ultravox à rede telefônica | **Tentec** (tem tutoria na comunidade terça 15h) ou **Twilio** |
| Webhook Receiver | Recebe resultado, grava no Supabase, dispara Response Engine | n8n webhook endpoint / Python FastAPI |

**Custos estimados (Opção 1 - Ultravox):**
- Ultravox: **Grátis até 30 min/mês**, depois ~$0, depois ~$0,05-0,10/min
- Tentec SIP: ~R$ 0,10-0,20/min (confirmar na tutoria terça 15h)
- n8n Cloud: ~$20/mês (ou self-host grátis)
- **Total estimado: < R$ 100/mês para centenas de ligações**

---

### 3.2 Opção 2: Gemini Live API + Twilio/Tentec (Mais robusto, sem limite de 5 simultâneas)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ARQUITETURA GEMINI LIVE + TWILIO                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────┐  │
│  │ Acquisition  │────▶│   n8n /      │────▶│   Gemini     │────▶│ Twilio│  │
│  │   Claude     │     │   Python     │     │  Live API    │     │ Voice │  │
│  └──────────────┘     └──────────────┘     │  (WebSocket) │     └───────┘  │
│        ▲                   ▲                └──────┬───────┘                │
│        │                   │                       │                        │
│        │            ┌──────┴──────┐                │                        │
│        │            │  Prospect   │                ▼                        │
│        │            │  Data +     │         ┌──────────────┐                │
│        │            │  Prompt     │         │   Twilio     │                │
│        │            └─────────────┘         │   Voice      │                │
│        │                                    │   Webhook    │                │
│        │                                    └──────┬───────┘                │
│        │                                           │                        │
│        │                  ┌────────────────────────┘                        │
│        │                  ▼                                                 │
│        │         ┌─────────────────┐                                       │
│        │         │  Webhook        │                                       │
│        │         │  Receiver       │                                       │
│        │         │  → transcript   │                                       │
│        │         │  → summary      │                                       │
│        │         │  → outcome      │                                       │
│        │         └────────┬────────┘                                       │
│        │                  │                                               │
│        └──────────────────┘                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diferenças-chave:**
- **Gemini Live** = WebSocket bidirecional (streaming de áudio real-time)
- **Twilio** = Fornece o número de telefone + PSTN + webhooks nativos
- **Sem limite de 5 simultâneas** do Ultravox
- **Custo**: Gemini input/output tokens + audio tokens + Twilio per-minute (~$0.014/min + tokens)

**Recomendação:** Começar com **Opção 1 (Ultravox + Tentec)** — custo quase zero, comunidade tem tutoria terça 15h. Migrar para Gemini se volume escalar ou precisar >5 simultâneas.

---

## 4. Fluxo de Aprovação Humana (Portão Obrigatório)

> **Regra do Acquisition OS (Seção 6):** "Enviar qualquer mensagem externa" é portão humano. Ligação de IA = mensagem externa.

### 4.1 Fluxo de Aprovação

```
┌─────────────────────────────────────────────────────────────────┐
│                  VOICE AI APPROVAL FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Acquisition Claude seleciona leads (score ≥ 60)             │
│     │                                                            │
│     ▼                                                            │
│  2. Gera "Call Pack" por lead:                                  │
│     - Nome negócio + cidade + segmento                          │
│     - Telefone (E.164 validado)                                 │
│     - Opportunity Score + motivos                               │
│     - Lead Offer (ex: diagnóstico 30min / tour 360° R$25)       │
│     - Script personalizado (template + variáveis)               │
│     - Histórico prévio (se houver)                              │
│     │                                                            │
│     ▼                                                            │
│  3. Entrega para Felipe/Romana via:                             │
│     - Arquivo Markdown em `operacao/prospeccao/voice-calls/`    │
│     - OU mensagem Telegram estruturada (bot)                    │
│     - OU card no VisionFlow (se já tiver integração)            │
│     │                                                            │
│     ▼                                                            │
│  4. ☐ HUMANO APROVA: "Aprovar ligação para [Negócio]"           │
│     ☐ HUMANO REJEITA: "Não ligar agora" (motivo opcional)       │
│     ☐ HUMANO EDITA: Ajusta script/oferta antes de aprovar       │
│     │                                                            │
│     ▼                                                            │
│  5. Se APROVADO:                                                │
│     - Registra evento `voice_call_approved`                     │
│     - Dispara workflow n8n/Python com lista aprovada            │
│     - IA de voz faz as ligações (sequencial ou paralelo ≤5)     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Formato do "Call Pack" (Markdown para aprovação humana)

```markdown
# 📞 Voice AI Call Pack — Campanha: paraty-pousadas-2026-07
**Gerado em:** 2026-07-05 09:00 | **Agente:** acquisition-claude
**Total leads:** 12 | **Canal:** voice_ai (Ultravox + Tentec SIP)

---

## 1. Pousada Vila do Mar — Paraty/RJ
**Score:** 82 (Need: 22, Authority: 20, Remote: 25, Contact: 15)
**Telefone:** +55 24 99999-8888 (WhatsApp confirmado)
**Lead Offer:** Diagnóstico gratuito 30 min (Sócio Digital)
**Oportunidades:** Primary: digital_partner | Secondary: website_management, google_management | Future: 360_tour
**Histórico:** Novo lead, nunca abordado
**Script Personalizado:**
> "Oi, aqui é da Real Vision. Vi que a Pousada Vila do Mar não tem tour 360 no Google e o site tá desatualizado. A gente faz um diagnóstico grátis de 30 min pra mostrar como um Sócio Digital resolve isso tudo junto. Topa?"

☐ **APROVAR**  ☐ **REJEITAR**  ☐ **EDITAR SCRIPT**

---

## 2. Pousada do Sol — Paraty/RJ
...
```

---

## 5. Script / Prompt do Agente de IA de Voz

### 5.1 Princípios (Herdados do `rv-prospeccao` e `ACQUISITION-OPERATING-SYSTEM`)

1. **Consultivo, não venda dura** — "Vi que X, acho que podemos ajudar com Y"
2. **Porta de entrada clara** — Diagnóstico grátis 30 min (carro-chefe) OU Tour 360° R$25 (tripwire)
3. **Nunca cota preço de carro-chefe** — "O valor certo sai do diagnóstico"
4. **Curto e respeitoso** — Máx 2-3 minutos, aceita "não" na hora
5. **Português natural, tom Felipe** — Direto, técnico, sem rodeios (ver `contexto/VOZ.md`)

### 5.2 Prompt Base para Ultravox / Gemini

```markdown
# System Prompt — Real Vision Voice AI Prospector

## Identidade
Você é um agente de prospecção da Real Vision, empresa de presença digital integrada (sites, Google Meu Negócio, tours 360°, foto/drone, automações com IA). Você liga para negócios locais (pousadas, restaurantes, eventos, condomínios) no Brasil.

## Tom e Estilo
- Direto, técnico, sem rodeios — como o Felipe falaria
- Consultivo: "Vi que X... acho que podemos ajudar com Y"
- Curto: ligação de 2-3 minutos no máximo
- Respeitoso: se disser "não tem interesse", agradeça e desligue

## Oferta (Porta de Entrada) — ESCOLHA UMA POR LEAD
**Carro-chefe (score alto, negócio estabelecido):**
> "Diagnóstico gratuito de 30 minutos — a gente olha seu site, Google, automações e te mostra o que faz sentido pro seu negócio. Sem compromisso."

**Tripwire (score médio/baixo, porta barata):**
> "A gente publica uma foto 360° aérea no seu Google Meu Negócio por R$25. Fica lá pra sempre, o cliente navega tipo Street View. Só precisa da sua autorização e um Pix."

## Fluxo da Conversa

1. **ABERTURA (15s)**
   - Identifique-se: "Oi, [Nome do negócio]? Aqui é da Real Vision."
   - Contexto: "A gente é Guia Local do Google e contribuidor do Street View — atualizamos imagens de cidades no Google Maps."
   - Gancho personalizado (use a variável `hook`): "Vi que [fato específico: site desatualizado / sem tour 360 / GMB parado]."

2. **OFERTA (30s)**
   - Apresente a porta de entrada (diagnóstico OU tour 360° R$25)
   - Explique o benefício rápido: "Ajuda o cliente a confiar antes de chegar / melhora posicionamento no Google"

3. **QUALIFICAÇÃO LEVE (30s)**
   - "Quem cuida da parte digital aí? É você ou tem mais alguém?"
   - "Faz sentido marcar o diagnóstico / autorizar o tour?"

4. **FECHAMENTO / PRÓXIMO PASSO**
   - **Se SIM (interessado):**
     - Diagnóstico: "Perfeito, vou passar pro Felipe (sócio) te chamar no WhatsApp pra agendar os 30 min. Qual o melhor WhatsApp?"
     - Tour 360°: "Ótimo, o Felipe manda o link do Pix (CPF 389.729.498-25) e a gente publica em poucos dias."
   - **Se TALVEZ/DEPOIS:** "Sem problema. Quando for melhor momento, é só falar com a gente. Tenha um bom dia!"
   - **Se NÃO:** "Entendido, obrigado pelo tempo. Bom trabalho!"

5. **ENCERRAMENTO**
   - Sempre agradeça, deseje bom dia/tarde
   - Não insista após "não" claro

## Regras Duras (NUNCA VIOLAR)
- ❌ NUNCA cotar preço de site, Sócio Digital, automação, gestão mensal
- ❌ NUNCA prometer prazo de entrega
- ❌ NUNCA pedir dados sensíveis (CNPJ, bancários) na ligação
- ❌ NUNCA falar que é IA — se perguntar, diga "Sou da equipe da Real Vision"
- ✅ SEMPRE registrar interesse para handover humano
- ✅ SEMPRE capturar WhatsApp válido se houver interesse

## Variáveis de Entrada (preenchidas por lead)
- `business_name`: string
- `city`: string
- `segment`: string (pousada/restaurante/eventos/condomínio)
- `hook`: string (fato observado: "seu site não carrega no celular", "não tem foto 360 no Google", "GMB sem post há 6 meses")
- `lead_offer`: "diagnostico_gratis" | "tour_360_25"
- `opportunity_score`: number (0-100)
- `primary_opportunity`: string (service code)
- `secondary_opportunities`: string[]
- `previous_history`: string (resumo se houver)

## Saída Esperada (JSON para webhook)
{
  "call_id": "uuid",
  "prospect_id": "uuid",
  "outcome": "answered" | "no_answer" | "busy" | "voicemail" | "failed",
  "duration_sec": 120,
  "transcript": "texto completo da conversa",
  "summary": "resumo em 3 linhas: interesse? próximo passo? observação?",
  "interest_level": "none" | "low" | "medium" | "hot",
  "next_action": "handover_human" | "followup_whatsapp" | "followup_email" | "archive" | "callback_later",
  "captured_whatsapp": "55XXXXXXXXXXX" | null,
  "captured_email": "email@exemplo.com" | null,
  "decision_maker_name": "string" | null,
  "decision_maker_role": "string" | null,
  "objections": ["preco", "ja_tem_agencia", "sem_tempo", "depois_temporada"] | []
}
```

---

## 6. Integração com Acquisition OS — Fluxo Completo

### 6.1 Semana Típica (Adiciona ao Ciclo Semanal Seção 10)

| Dia | Atividade Atual | Nova Atividade Voice AI |
|-----|-----------------|-------------------------|
| Seg | Follow-ups vencendo + leads quentes | **Gerar Call Packs para leads score 60-79 (média) que não responderam WA/Email** |
| Ter | Novas abordagens WA/Email | **Enviar Call Packs para aprovação humana** |
| Qua | Processar respostas | **Receber webhooks de chamadas → processar outcomes → Response Engine** |
| Qui | Leads quentes → handover | **Leads "hot" de voz → handover imediato** |
| Sex | Learning loop + relatório | **Incluir métricas de voz no relatório semanal** |

### 6.2 Métricas de Voz no Relatório Semanal (Nova Seção)

```
### Voice AI Metrics (Semana XX)
- Ligações tentadas: 47
- Atendidas: 31 (66%)
- Caixa postal: 8
- Ocupado/Falhou: 8
- Duração média: 1m 42s
- Interest level: Hot: 3 | Medium: 7 | Low: 12 | None: 9
- Handovers recomendados: 3
- WhatsApp capturados: 10
- Custo estimado: R$ 18,50 (Ultravox + Tentec)
- Cost per hot lead: R$ 6,17
```

---

## 7. Plano de Implementação (Fases)

### Fase 1 — MVP Ultravox + Tentec (Semanas 1-2)
- [ ] Participar da tutoria Tentec (terça 15h) para contratar SIP trunk
- [ ] Criar conta Ultravox Cloud (grátis 30 min/mês)
- [ ] Configurar agente Ultravox com prompt base (Seção 5.2)
- [ ] Criar workflow n8n: Webhook → Ultravox → Webhook resultado → Supabase
- [ ] Testar 5 ligações manuais (Felipe aprova lista teste)
- [ ] Validar: transcrição PT-BR, detecção interesse, webhook funcionando

### Fase 2 — Integração Acquisition OS (Semanas 3-4)
- [ ] Adicionar campos `voice_call_*` no schema Supabase (migração)
- [ ] Criar eventos `voice_call_*` no `ACQUISITION-CONTRACT`
- [ ] Implementar geração automática de Call Packs no Acquisition Claude
- [ ] Implementar Response Engine para outcomes de voz (Seção 8 do OS)
- [ ] Adicionar seção Voice AI no relatório semanal (`rv-relatorio`)

### Fase 3 — Escala e Otimização (Mês 2+)
- [ ] A/B testar scripts (diagnóstico vs tour 360°)
- [ ] Otimizar horários de ligação por segmento
- [ ] Implementar callback agendado ("liga amanhã às 10h")
- [ ] Avaliar migração para Gemini Live se volume > 500 calls/mês ou precisar >5 simultâneas
- [ ] Integrar com WhatsApp Business API para follow-up automático pós-ligação

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **LGPD / Lei do Telemarketing (Lei 14.181/2021)** | Alta | Alto | Só ligar para leads com `voice_call_consent = true` OU enquadrar como "ligação de prospecção B2B legítima" (negócio local, relação comercial plausível). Manter opt-out imediato. |
| **Ultravox limite 5 simultâneas** | Média | Médio | Começar sequencial; se escalar, migrar para Gemini Live |
| **Qualidade voz PT-BR ruim** | Baixa | Alto | Testar vozes Ultravox PT antes; Gemini tem vozes nativas melhores |
| **Lead reclama "ligação de robô"** | Média | Médio | Script humano, curto, respeita "não"; gravar consentimento implícito no outcome |
| **Custo SIP explode** | Baixa | Médio | Monitorar custo/min na tutoria Tentec; limitar calls/dia no workflow |
| **Falso positivo de interesse** | Média | Médio | Acquisition Claude revisa TODOS outcomes "hot/medium" antes de handover |

---

## 9. Próximos Passos (Decisões do Felipe)

> **Preciso de sua validação para prosseguir:**

1. **Qual opção começar?** ☐ Ultravox + Tentec (grátis, tutoria terça) ☐ Gemini + Twilio (mais robusto)
2. **Orquestrador?** ☐ n8n Cloud ($20/mês, visual) ☐ Python self-host (grátis, mais controle)
3. **Aprovação humana via quê?** ☐ Arquivo Markdown no vault ☐ Telegram bot ☐ VisionFlow card
4. **Primeira campanha piloto?** Cidade + segmento + quantidade (ex: Paraty pousadas, 20 leads score 60-79)
5. **LGPD:** Quer implementar consentimento explícito (`voice_call_consent`) ou usar base legítima B2B?

---

## 10. Arquivos a Criar/Atualizar

| Arquivo | Ação |
|---------|------|
| `operacao/prospeccao/VOICE-AI-INTEGRATION-PLAN.md` | ✅ Criado (este doc) |
| `operacao/prospeccao/voice-calls/` | Nova pasta para Call Packs |
| `ACQUISITION-DATA-MODEL` (Mission 3) | Adicionar campos `voice_call_*` e eventos |
| `ACQUISITION-CONTRACT` | Adicionar regras de acesso para eventos de voz |
| `ACQUISITION-OPERATING-SYSTEM` | Adicionar Seção 11: Voice AI Outreach |
| `rv-prospeccao` (skill) | Adicionar fluxo de geração de Call Pack |
| `rv-relatorio` (skill) | Adicionar métricas de voz no relatório semanal |
| `clarisso` (skill) | Opcional: enriquecer telefone/E.164 validation |

---

**Próxima ação recomendada:** Participar da tutoria Tentec (terça 15h) para contratar SIP trunk e validar custo/minuto. Em paralelo, posso criar o agente Ultravox de teste e o workflow n8n básico.