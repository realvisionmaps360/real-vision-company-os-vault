---
name: feedback-skill-realvision-primeiro
description: "Sempre invocar a skill `realvision` antes de qualquer skill específica do negócio (rh-real-vision, proposta-comercial, etc) numa sessão sobre Real Vision"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4fea74cb-1db5-46c4-bc7f-bb32af06484d
---

Toda sessão que envolver Real Vision deve começar carregando a skill `realvision` ANTES de qualquer skill específica do negócio (ex: `rh-real-vision`, `proposta-comercial`). Se uma skill específica for acionada primeiro e a `realvision` ainda não rodou na sessão, carregar a `realvision` em seguida — não pular.

**Why:** Felipe me corrigiu em 2026-05-25 depois de eu rodar só a `rh-real-vision` quando ele disse "vamos trabalhar na real vision, mexer com as contratações". A descrição da skill `realvision` diz explicitamente "use no início de qualquer sessão onde Felipe quiser trabalhar em projetos da empresa" — eu pulei porque a `rh-real-vision` pareceu mais específica. A `realvision` carrega o KNOWLEDGE_BASE.md e o contexto fundacional que todas as skills específicas pressupõem.

**How to apply:** Quando Felipe mencionar "Real Vision", "RV", o site, ou qualquer pilar do negócio (tours 360, drone, GMB, etc), invocar `realvision` primeiro. Se ele disparar uma skill específica direto (ex: pede algo de RH), invocar `realvision` antes ou em paralelo no mesmo turno. Regra estrutural também está na CLAUDE.md global em `C:\Users\Computador\.claude\CLAUDE.md`.

**Recorrência (2026-07-06):** mesmo erro se repetiu com a skill `wood-art` — ela também instrui no próprio arquivo "carregue sempre junto com `realvision`", mas isso é só texto dentro do arquivo da skill, não um gatilho automático do sistema. Eu li a instrução e não agi sobre ela. Toda skill de cliente (`wood-art`, `solarium`, `manahh`, `hallan-magnolia`, etc) tem essa mesma instrução embutida — o hábito certo é: ao carregar qualquer skill de cliente, chamar `Skill(realvision)` no mesmo turno, sem depender de lembrar de ler a instrução dentro do arquivo.
