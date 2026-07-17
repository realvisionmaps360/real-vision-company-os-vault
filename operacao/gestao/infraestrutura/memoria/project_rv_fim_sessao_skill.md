---
name: project-rv-fim-sessao-skill
description: Skill rv-fim-sessao — maestro de fim de sessão que unifica session-handoff + rv-visionflow-handoff + atualização da FICHA-CLIENTE
metadata: 
  node_type: memory
  type: project
  originSessionId: 79f5f531-48b2-4404-a556-19b4c375977e
---

Skill `rv-fim-sessao` criada em 29/06/2026 — maestro de encerramento de sessão. **Ampliada em 12/07/2026** pra ser também o ponto de entrada padrão de "handoff"/"session handoff" dentro da Real Vision (antes esses gatilhos iam direto pro bilhete efêmero, sem gravar nada permanente). Com um comando orquestra o artefato certo conforme o assunto da sessão:

1. **Cliente RV** → SEMPRE atualiza `FICHA-CLIENTE.md` + `<CLIENTE>-TIMELINE.md` (fecha o círculo com o início da próxima sessão) + gera o texto do VisionFlow (reaproveita [[rv-visionflow-handoff]]).
2. **Projeto interno RV ou assunto pessoal do Felipe** (pasta `Felipe Garcia/`) → SEMPRE grava documentação permanente: entrada datada na `TIMELINE.md` do projeto, e — só se a sessão gerou conhecimento reutilizável — um documento de conhecimento (playbook/`DECISOES.md`) + atualização da skill relacionada, com link de volta pra pasta (reverse-link pasta↔skill, que antes só existia num sentido).
3. **Fora do escopo RV/pessoal** → sugere organização, não presume nem cria nada.
4. **Em qualquer caso**, se a obra ficou pela metade antes de um `/clear`, complementa (nunca substitui) com o bilhete técnico estilo [[session-handoff]].

**Why:** as duas skills de fim de sessão originais (session-handoff = continuidade técnica pro próximo Claude; rv-visionflow-handoff = memória de relacionamento pro CRM) serviam públicos opostos e nunca foram amarradas; a FICHA-CLIENTE não era atualizada no fim, então o círculo início→fim não fechava pra clientes. Depois, ficou claro numa sessão de projeto interno (campanha Google Ads "SLM vs LLM", 12/07/2026) que sessões internas/pessoais tinham o mesmo problema e pior: nem existia um passo automático pra documentar — o conhecimento reutilizável (ex: um playbook de como criar campanha numa conta Google Ads nova) só foi salvo porque o Felipe pediu explicitamente. Ele quer que isso vire automático, porque esse conhecimento é ativo valioso: eficiência interna, futura oferta a clientes, matéria-prima de conteúdo.

**How to apply:** Felipe diz "fim de sessão"/"encerrar"/"handoff"/"session handoff" → carregar `rv-fim-sessao` junto com `realvision`. Confirmar com Felipe antes de gravar em qualquer arquivo permanente. Índice do ciclo completo em `operacao/gestao/infraestrutura/obsidian/CICLO-Sessao.md`. Decisões: bilhete efêmero (`session-handoff`) mantido como componente complementar, nunca removido; skill global `session-handoff` (fora do escopo RV) intocada; sem backfill retroativo de reverse-links em pastas já existentes — só daqui pra frente. Relacionado: [[project_rv_visionflow_handoff_skill]], [[feedback_obsidian_base_conhecimento]], [[feedback_handoff_nomenclatura]].
