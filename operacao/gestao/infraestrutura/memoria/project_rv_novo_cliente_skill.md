---
name: project-rv-novo-cliente-skill
description: "Skill de onboarding de cliente novo — consulta Supabase, anti-duplicata, cria pasta+docs+skill"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1576a30f-a036-4668-84bd-6995ecfdfce0
---

Skill `rv-novo-cliente` criada em 29/06/2026. Dispara quando Felipe apresenta um cliente novo (print do VisionFlow, nome, ou "novo cliente").

Fluxo: extrai termo → consulta Supabase VisionFlow (`ghwjetvazmdlaqidgxqi`, tabela `clients`, colunas `nome`/`empresa`/`status_pipeline`/`contato`/`localizacao`) → **anti-duplicata** (0 = pede nome; 1 = confirma "é este?"; 2+ = pergunta qual; checa se pasta já existe) → só após OK cria pasta `Nome - Empresa` + `<CLIENTE>-PROJETO.md` + `<CLIENTE>-TIMELINE.md` + skill por-cliente (modelo `solarium`).

Carregar sempre com `realvision`; pré-voo de [[feedback_supabase_mcp_proxima_vez]] se tocar no banco. Templates embutidos na própria skill. Relacionado: [[project_solarium_aarau]], [[project_sunbite_site]].
