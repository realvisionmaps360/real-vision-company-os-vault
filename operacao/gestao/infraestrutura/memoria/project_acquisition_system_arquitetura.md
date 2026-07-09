---
name: project_acquisition_system_arquitetura
description: "Mission 2 — arquitetura do sistema de aquisição: banco próprio + ficha canônica + eventos + handover manual"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4ad1ce3b-3fa1-4f28-bfb6-973a524ffc24
---

Arquitetura de longo prazo do sistema de aquisição da Real Vision, aprovada por Felipe em 20/06/2026. Doc oficial: `operacao/prospeccao/ACQUISITION-SYSTEM-ARCHITECTURE.md`. **Só o desenho está pronto — a construção é a Mission 3 (ainda não feita).**

Decisões-chave:
- **Banco de dados próprio** (Supabase **separado** do VisionFlow) como fonte única — só agentes acessam via MCP; Felipe nunca escreve SQL. Aquisição (topo do funil) fica separada da gestão de clientes (VisionFlow, fundo do funil); a fronteira é o handover.
- **Handover manual:** o agente prepara o pacote pronto e seta `visionflow_client_id`; Felipe/Romana criam o card no VisionFlow.
- **Modelo:** `prospects` (uma ficha canônica por negócio, dedup por nome_normalizado+cidade) + `prospect_events` (histórico append-only, nunca sobrescreve) + `campaigns`/`campaign_prospects` (mesmo negócio entra em campanhas sucessivas sem duplicar).
- **Contrato de acesso único** para todo agente: dedup antes de criar, todo ato vira evento, nunca escrever no VisionFlow.

Catálogo de oportunidades por lead → [[project_catalogo_servicos]]. Papel do agente → [[project_acquisition_claude_role]]. Por que banco e não arquivo: entre outros motivos, [[reference_company_os_nao_git]].
