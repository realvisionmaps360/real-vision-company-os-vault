# Sistema de Aquisição — Arquitetura (Real Vision)

> **Status:** Desenho aprovado · **Data:** 20/06/2026 · **Missão:** Mission 2
> **Relacionado:** [[ACQUISITION-CLAUDE]] (papel — Mission 1) · VisionFlow (CRM — destino do handover)
> **Escopo deste documento:** define *onde* e *como* os dados de aquisição vivem. **A construção do banco é a Mission 3** — este doc é o projeto, não a implementação.

---

## 1. Problema que esta arquitetura resolve

A Mission 1 definiu o **papel** Acquisition Claude (maestro de `clarisso` + `rv-prospeccao` + `rv-relatorio`; pontua, rastreia, recomenda handover, gera relatório semanal). Faltava a **arquitetura de longo prazo** para sustentar isso ao longo de anos.

Furos do estado atual:

- **Sem fonte única da verdade** — dados espalhados em 3 padrões de arquivo (`prospeccao/*-contatos.md`, o `*-tracker.md` previsto-mas-inexistente, pastas `clientes/prospeccao/[Nome]/`).
- **Dedup frágil** — depende do agente conferir nome/cidade na mão; quebra rumo a 1.000+.
- **Histórico preso em texto corrido** (checkboxes) — difícil consultar/somar, fácil perder.
- **Pasta Real Vision não está no git** — arquivo solto não tem rede de segurança de versão.
- **Oportunidades múltiplas por negócio não modeladas** — um negócio pode precisar de site + GMB + tour + automação ao mesmo tempo, e isso se perde.

---

## 2. Decisões (Felipe, 20/06/2026)

1. **Banco de dados próprio** (Supabase separado do VisionFlow) como fonte única — só os agentes acessam, via Supabase MCP. Felipe nunca escreve SQL.
2. **Handover manual** — o agente prepara o pacote pronto; Felipe ou Romana criam o card no VisionFlow.

---

## 3. Princípios

1. **Aquisição é o topo do funil (frio → morno). VisionFlow é o fundo (morno → cliente/projeto).** Separação dura: bancos diferentes. A fronteira é o handover.
2. **Um negócio = uma ficha canônica.** Dedup no nível do negócio. O mesmo negócio passa por várias campanhas/ofertas ao longo do tempo **sem virar duplicado**.
3. **Agentes são os únicos operadores do banco.** A camada humana de trabalho (rascunhos, mensagens prontas) continua em arquivos markdown.
4. **Histórico é append-only.** Toda ação/mudança vira um evento, nunca sobrescreve — é o que garante "nunca perder informação".
5. **Desacoplado das ofertas atuais.** O lead carrega um **catálogo de oportunidades** (`potential_services`), não uma oferta fixa. Acquisition Claude identifica várias oportunidades dentro do mesmo negócio, e o sistema absorve serviços novos sem mudar a estrutura.

---

## 4. Onde mora cada coisa

| Camada | Onde | Papel |
|---|---|---|
| **Fonte da verdade** | Acquisition DB (Supabase próprio, projeto novo) | Identidade, status, score, histórico de todo lead |
| **Camada de trabalho humana** | `operacao/prospeccao/[cidade]-[segmento]-contatos.md` | Mensagens prontas + checkboxes que Felipe copia/envia — **gerada a partir do banco** |
| **Destino do handover** | VisionFlow (Supabase `ghwjetvazmdlaqidgxqi`, já existe) | Gestão ativa da venda/projeto depois que o lead esquenta |

Os 3 padrões de arquivo de hoje convergem: as pastas `clientes/prospeccao/[Nome]/` são aposentadas/absorvidas; tudo nasce do `prospects` + arquivo de campanha.

---

## 5. Modelo de dados (Acquisition DB)

### `prospects` — ficha canônica do negócio (uma linha por negócio; coração do dedup)

| Grupo | Campos |
|---|---|
| Identidade | `business_name`, `name_normalized` (minúsculo, sem acento — chave de dedup), `city`, `region`, `country`, `segment` |
| Contato (dedup secundário) | `phone_e164`, `email`, `website_domain`, `instagram` |
| Qualificação | `opportunity_score` (0-100) + `score_need` / `score_authority` / `score_remote` / `score_contactability` (0-25 cada) + `score_reasons` |
| Funil | `current_status` (enum), `owner` (felipe/romana), `next_followup_date` |
| Oportunidades | `potential_services` (lista multivalor — **todas** as oportunidades identificadas no negócio) + `lead_offer` (a oportunidade conduzida **agora**) |
| Origem/ligação | `source`, `visionflow_client_id` (preenchido só no handover — liga os dois sistemas sem fundir), `created_at`, `updated_at` |

**Dedup:** índice único em (`name_normalized`, `city`) + checagem por phone/email/domain **antes** de criar qualquer linha.

### Catálogo de serviços (vocabulário de `potential_services` / `lead_offer`)

Lista viva — dá pra adicionar serviços sem mexer na estrutura:

`Website` · `Landing Page` · `Google Business` · `Google Management` · `AI Chatbot` · `WhatsApp Automation` · `CRM` · `360 Tour` · `Photography` · `Videography` · `Hosting` · `Digital Partner`

As ofertas de hoje viram só itens deste catálogo: tripwire R$25 = `360 Tour` / `Photography`; Sócio Digital = `Digital Partner`.

### `prospect_events` — linha do tempo append-only (o histórico do lead)

Uma linha por toque/mudança. Nada é sobrescrito.

- `prospect_id`, `event_type` (`encontrado`, `qualificado`, `score_atualizado`, `rascunho_criado`, `abordado_wa`, `abordado_email`, `follow_up`, `resposta_recebida`, `status_mudou`, `handover_recomendado`, `handover_feito`, `nota`)
- `channel` (wa/email), `summary` (texto curto), `detail` (jsonb — payload estruturado: status antigo/novo, id do rascunho, etc.)
- `agent` (`clarisso` / `rv-prospeccao` / `acquisition-claude` / `felipe` / `romana`), `occurred_at`

A ficha guarda só o "último estado" (denormalizado) para filtro rápido; a verdade do histórico está aqui.

### `campaigns` + `campaign_prospects` (join)

Uma campanha = uma rodada de prospecção (cidade + segmento + oferta + data). O join muitos-para-muitos permite o mesmo negócio entrar em campanhas sucessivas (ex: tripwire e depois Sócio Digital) **sem duplicar**.

### Status do funil (`current_status`)

`novo` · `pesquisa_pendente` · `abordado` · `sem_resposta` · `sem_interesse` · `interessado` · `reuniao_marcada` · `proposta_enviada` · `handover_visionflow` · `ganho` · `perdido`

(Mesmos status da Mission 1 + estados terminais.) `pesquisa_pendente` = sem informação suficiente para qualificar; o agente anota o que falta e retoma.

---

## 6. Respostas aos 7 pontos de avaliação

1. **Como armazenar** → Acquisition DB próprio; `prospects` como ficha canônica operada pelos agentes via MCP; arquivos de campanha como camada humana gerada do banco.
2. **Um arquivo mestre basta?** → **Não.** Funciona com ~48 contatos, quebra rumo a 1.000+: falha em dedup em escala, agentes simultâneos, histórico consultável e durabilidade (sem git na pasta). Por isso o banco.
3. **Follow-ups** → `next_followup_date` na ficha + evento `follow_up`. "Vencendo esta semana" = consulta `next_followup_date <= hoje AND status IN (abordado, sem_resposta)`. Agente propõe rascunho → Felipe envia → agente registra evento e seta a próxima data.
4. **Histórico** → `prospect_events` append-only. Status, mensagens, respostas e mudanças de score viram eventos com quem/quando. A vida inteira do lead é reconstruível.
5. **Relatório semanal** → uma consulta ao banco gera o texto de 7 partes da Mission 1 (novos, abordados, respostas, prontos pro VisionFlow, follow-ups vencendo, números, recomendações). Por ser consulta, é exato e sem contagem manual. Continua em texto.
6. **Acesso de futuros agentes** → **contrato único** para todos (clarisso, rv-prospeccao, Acquisition Claude, futuros):
   - (a) **antes de criar prospect, fazer dedup** (nome_normalizado+cidade, depois phone/email/domain) — se existe, registrar evento em vez de criar linha;
   - (b) **toda ação gera evento** com o campo `agent`;
   - (c) **nunca escrever no VisionFlow** (handover é manual).

   Agente novo só segue o mesmo contrato; sem mudar o banco.
7. **Organização após anos** → ficha canônica + eventos append-only = sem drift nem duplicado acumulando; `campaigns` particionam por tempo/lugar (rodadas antigas "fecham", não somem); estados terminais filtram lead morto sem perdê-lo; backups do Supabase substituem o git ausente; arquivos de campanha são descartáveis/regeneráveis e o banco é o registro permanente; export periódico (CSV/JSON) pro Company OS como arquivo morto.

---

## 7. Handover (manual)

- **Gatilho:** status vira `interessado` / `reuniao_marcada` / `proposta_enviada`.
- Acquisition Claude gera o **pacote de handover** (negócio, contato, score + motivos, histórico curto, próximo passo sugerido) — pronto pra colar num card do VisionFlow.
- Felipe/Romana criam o card no VisionFlow.
- O agente seta `prospects.visionflow_client_id`, registra evento `handover_feito`, status → `handover_visionflow`.
- A ficha **permanece** no Acquisition DB como histórico, marcada como entregue. Aquisição para de conduzir; VisionFlow assume. Separação limpa, ligação rastreável, sem duplicar dado além do id.

---

## 8. Cobertura dos requisitos

| Requisito | Onde é resolvido |
|---|---|
| 1.000+ prospects | Banco relacional + índices |
| Múltiplos agentes de IA | Contrato de acesso único via MCP |
| Follow-ups | `next_followup_date` + evento `follow_up` |
| Relatório semanal | Consulta de 7 partes ao banco |
| Histórico de lead | `prospect_events` append-only |
| Handover pro VisionFlow | Pacote manual + `visionflow_client_id` |
| Impedir lead duplicado | Ficha canônica + dedup obrigatório |
| Impedir perda de informação | Append-only + backups Supabase |
| Aquisição separada do VisionFlow | Bancos diferentes; fronteira no handover |
| Múltiplas oportunidades por lead | `potential_services` (catálogo vivo) + `lead_offer` |

---

## 9. Próxima missão (Mission 3 — construção)

Fora do escopo deste documento. Quando autorizada, faria:

1. Criar o projeto Supabase novo (Acquisition DB).
2. Rodar o SQL das tabelas (`prospects`, `prospect_events`, `campaigns`, `campaign_prospects`).
3. Escrever os ajudantes de dedup/registro de evento.
4. Atualizar [[ACQUISITION-CLAUDE]] + as 3 skills (`clarisso`, `rv-prospeccao`, `rv-relatorio`) com o contrato de acesso.
5. Migrar os dados de Paraty como a primeira campanha.
