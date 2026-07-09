---
name: project-acquisition-mission3-modelo
description: Aquisição Mission 3 — banco rv-acquisition construído e populado em 25/06/2026; todas as fases concluídas
metadata: 
  node_type: memory
  type: project
  originSessionId: ec8841ba-1f12-42cf-9bc2-1cc85e323b07
---

Mission 3 do Sistema de Aquisição **totalmente concluída em 25/06/2026**.

**Banco:** `rv-acquisition` · Project ID: `gexacmtkjqectfqwhunv` · Região: `sa-east-1`
**URL:** `https://gexacmtkjqectfqwhunv.supabase.co`

**As 8 tabelas criadas e populadas:**
1. `prospects` — ficha canônica (dedup: `name_normalized` + `city_normalized`); índice `pg_trgm` fuzzy
2. `prospect_events` — histórico append-only; `actor` + `actor_type` (`ai_agent`/`human`)
3. `campaigns` — rodadas de prospecção
4. `campaign_prospects` — join com estado por rodada (prioridade, WA/email sent)
5. `services` — catálogo 12 serviços (pré-populado)
6. `prospect_services` — status por oportunidade por lead
7. `report_snapshots` — memória dos relatórios semanais
8. `prospect_contacts` — vários decisores por negócio

**RLS ativo:** só `service_role` escreve.

**Contrato de agentes:** `operacao/prospeccao/ACQUISITION-CONTRACT.md` — dedup 3 camadas, tipos de evento, queries do relatório semanal, regra `do_not_contact`.

**Skills atualizadas:** `clarisso` (Passo 4 — registrar no banco) · `rv-prospeccao` (Etapa 3 e 6 — banco antes do arquivo de contatos).

**Migração Paraty concluída:**
- 35 pousadas importadas como prospects
- Campanha `paraty-pousadas-2026-06` criada (status: `encerrada`)
- 32 em `sem_resposta` · 3 em `pesquisa_pendente` (Arte Colonial, Ouro, Apple House)
- 25 eventos `abordado_wa` · 15 eventos `abordado_email`

**Próxima etapa (Mission 5):** primeira rodada Sócio Digital no novo banco; relatório semanal via consulta ao banco.

**Why:** banco separado do VisionFlow garante separação topo/fundo de funil. Suporta 1.000+ prospects sem mudança de estrutura.

**How to apply:** ao iniciar nova campanha de prospecção, verificar MCP Supabase conectado com project_id `gexacmtkjqectfqwhunv`. Seguir `ACQUISITION-CONTRACT.md` para todas as operações de banco.
