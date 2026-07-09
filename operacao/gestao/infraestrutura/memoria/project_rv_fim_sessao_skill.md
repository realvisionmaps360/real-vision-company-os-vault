---
name: project-rv-fim-sessao-skill
description: Skill rv-fim-sessao — maestro de fim de sessão que unifica session-handoff + rv-visionflow-handoff + atualização da FICHA-CLIENTE
metadata: 
  node_type: memory
  type: project
  originSessionId: 79f5f531-48b2-4404-a556-19b4c375977e
---

Skill `rv-fim-sessao` criada em 29/06/2026 — maestro de encerramento de sessão. Com um comando orquestra três artefatos conforme o momento: (1) SEMPRE atualiza `FICHA-CLIENTE.md` + `<CLIENTE>-TIMELINE.md` do cliente (fecha o círculo com o início da próxima sessão); (2) gera o texto do VisionFlow se for sessão de cliente (reaproveita [[rv-visionflow-handoff]]); (3) gera o bilhete técnico estilo [[session-handoff]] se a obra ficou pela metade antes de um /clear.

**Why:** as duas skills de fim de sessão (session-handoff = continuidade técnica pro próximo Claude; rv-visionflow-handoff = memória de relacionamento pro CRM) serviam públicos opostos e nunca foram amarradas; e a FICHA-CLIENTE não era atualizada no fim, então o círculo início→fim não fechava.

**How to apply:** Felipe diz "fim de sessão"/"encerrar" → carregar `rv-fim-sessao` junto com `realvision`. Confirmar com Felipe antes de gravar na ficha/timeline. Índice do ciclo completo em `operacao/gestao/infraestrutura/obsidian/CICLO-Sessao.md`. Decisões: escopo só do FIM; skills antigas mantidas e referenciadas; doc na pasta obsidian infra. Relacionado: [[project_rv_visionflow_handoff_skill]], [[feedback_obsidian_base_conhecimento]].
