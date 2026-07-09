---
name: feedback-skill-scout-gatilho-nova-skill
description: rv-skill-scout agora tem gatilho obrigatório de auto-mapeamento sempre que uma skill nova é criada
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3f7bc05c-67f3-4e6a-a293-b345430c7b92
---

Sempre que uma skill nova for criada ou modificada significativamente (por `skill-creator` ou qualquer fluxo), a `rv-skill-scout` deve automaticamente: mapear onde ela se encaixa na realidade da Real Vision, atualizar sua própria tabela "Mapa de skills locais" + mapeamento por tipo de tarefa + README, e retornar um veredito curto ao Felipe (onde entra / como é chamada / se sobrepõe a alguma skill existente) antes de considerar a tarefa concluída.

**Why:** a skill `wix-seo-autopilot` (pipeline de blog via Arvow API) foi criada em outra sessão e nunca apareceu na tabela da rv-skill-scout — ficou órfã, quase foi reaproveitada num serviço (blog automatizado) que está fora do escopo contratado do cliente Lafatas. Felipe mandou apagar a skill (Arvow considerado "lixo", blog não está no escopo) e pediu que isso não se repita.

**How to apply:** todo `skill-creator` ou criação manual de skill deve terminar com esse retorno estruturado, mesmo que pareça óbvio. Ver seção "Gatilho: nova skill criada" em `~/.claude/skills/rv-skill-scout/SKILL.md`. [[project_rv_skill_scout_wix_incident]]
