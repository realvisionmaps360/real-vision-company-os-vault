# Sistema de Aquisição — Timeline de Missões

> Registro cronológico do que foi feito, aprovado e o que vem a seguir.
> Pasta: `operacao/prospeccao/`

---

## ✅ Mission 1 — Papel Acquisition Claude
**Data:** Junho 2026 · **Status:** Aprovada e ativa

**O que foi criado:** [`ACQUISITION-CLAUDE.md`](ACQUISITION-CLAUDE.md)

**O que define:**
- O papel do Acquisition Claude como maestro do funil de aquisição
- Skills acionadas: `clarisso` (achar+qualificar) · `rv-prospeccao` (abordar) · `rv-relatorio`
- Opportunity Score (0-100) com 4 sub-scores de 25 (Need / Authority-Size / Remote Fit / Contactability)
- Status do funil e gatilhos de handover pro VisionFlow
- Entregável semanal: texto de 7 partes
- Linha de passagem: Interessado / Reunião marcada / Proposta enviada → VisionFlow

**Campanha executada durante a Mission 1:**
- Paraty — Pousadas (junho 2026): 35 pesquisadas, 31 WA + 17 email enviados; arquivos em `paraty-pousadas-contatos.md` e `paraty-restaurantes-contatos.md`

---

## ✅ Mission 2 — Arquitetura do Sistema
**Data:** 20/06/2026 · **Status:** Aprovada · **Banco ainda não construído**

**O que foi criado:** [`ACQUISITION-SYSTEM-ARCHITECTURE.md`](ACQUISITION-SYSTEM-ARCHITECTURE.md)

**Decisões travadas:**
- Banco de dados próprio (Supabase separado do VisionFlow) como fonte única
- Handover manual: agente prepara o pacote; Felipe/Romana criam o card no VisionFlow
- `potential_services` (catálogo vivo de 12 serviços) desacopla o sistema das ofertas atuais

**Modelo de dados aprovado:**
- `prospects` — ficha canônica, dedup por nome+cidade, campo `potential_services`
- `prospect_events` — histórico append-only (nada se perde)
- `campaigns` + `campaign_prospects` — mesmo negócio em múltiplas campanhas sem duplicar

**Catálogo de serviços:** Website · Landing Page · Google Business · Google Management · AI Chatbot · WhatsApp Automation · CRM · 360 Tour · Photography · Videography · Hosting · Digital Partner

---

## ✅ Mission 3 — Modelo de Dados + Banco Construído
**Data:** 24/06/2026 (modelo) · 25/06/2026 (banco) · **Status:** ✅ Banco ativo em produção

**O que foi criado:** [`ACQUISITION-DATA-MODEL.md`](ACQUISITION-DATA-MODEL.md)

**Decisões travadas nesta missão:**
- 8 tabelas especificadas com todos os campos, tipos e índices
- `services` + `prospect_services` substituem o array `potential_services` (cada oportunidade tem ciclo próprio)
- `report_snapshots` guarda memória de cada relatório semanal para tendência nos 3 anos
- `prospect_contacts` suporta vários decisores por negócio
- Índice `pg_trgm` para dedup fuzzy de nomes (ex: "Pousada do Forte" vs "Hotel Pousada do Forte Paraty")
- 3 campos adicionais em `prospects`: `preferred_contact_channel`, `last_response_summary`, `do_not_contact`
- Campo `actor_type` em `prospect_events`: distingue ação de agente (`ai_agent`) de intervenção humana (`human`)
- **Regra de acesso:** agentes são operadores primários; Felipe e Romana retêm ownership de emergência e acesso direto ao banco — toda intervenção humana direta também vira evento (`actor_type = human`)

**Banco construído em 25/06/2026:** projeto `rv-acquisition` (`gexacmtkjqectfqwhunv`), 8 tabelas, RLS, dedup testado. Checklist em [`ACQUISITION-MISSION3-KICKSTART.md`](ACQUISITION-MISSION3-KICKSTART.md).

**Próxima etapa:** Fase 2 — escrever `ACQUISITION-CONTRACT.md` + atualizar skills (`clarisso`, `rv-prospeccao`, `ACQUISITION-CLAUDE.md`) + migrar Paraty.

---

## ✅ Mission 4 — Operating System (Decision Engine)
**Data:** 24/06/2026 · **Status:** Congelado

**O que foi criado:** [`ACQUISITION-OPERATING-SYSTEM.md`](ACQUISITION-OPERATING-SYSTEM.md)

**O que define:** o manual operacional permanente — a lógica de negócio que faz o Acquisition Claude decidir sozinho em quase todo cenário, sem perguntar ao Felipe/Romana. 15 seções (Objetivo · Inputs · Outputs · Decisões IF→THEN · Responsabilidades · Próximos caminhos · Erros a evitar):

1. Lead Discovery · 2. Business Analysis · 3. Opportunity Identification · 4. Opportunity Score · 5. Outreach Preparation · 6. Human Approval · 7. Follow-up Engine · 8. Response Decision Engine · 9. Handover Engine · 10. Weekly Operating Cycle · 11. Mistake Prevention · 12. Decision Rules (biblioteca mestre) · 13. Ideal Customer Profile (ICP) · 14. Capacity Management · 15. Continuous Learning Loop

**Parâmetros travados:** faixas de score (80–100 imediato · 60–79 padrão · 40–59 futura · <40 arquiva) · follow-up de 3 toques (T0 → +4d → +10d) · portões humanos (enviar/cotar/fechar/card VisionFlow/religar opt-out/mercado novo/falar com cliente/mudança estratégica) · ICP Tier A/B/C/Anti · limites de capacidade WIP (~120 ativos · ~25 abordagens/sem · 4 reuniões/sem · 3 propostas/sem).

**Não fez:** código, redesenho de banco, redesenho das M1–M3.

---

## 🔲 Mission 5 — Operação contínua (futura)
**Status:** Após construção do banco (Mission 3 build)

- Primeira rodada Sócio Digital no novo banco
- Relatório semanal automatizado via consulta ao banco
- Expansão para São Tomé das Letras como segunda campanha
