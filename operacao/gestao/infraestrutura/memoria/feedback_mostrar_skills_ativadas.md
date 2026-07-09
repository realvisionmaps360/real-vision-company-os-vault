---
name: feedback-mostrar-skills-ativadas
description: "Sempre mostrar linha \"→ skills ativadas: X, Y\" no início da resposta quando skills forem carregadas"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3f7bc05c-67f3-4e6a-a293-b345430c7b92
---

Sempre que uma ou mais skills forem ativadas via Skill tool, incluir no início da resposta de texto uma linha visível no formato:

`→ skills ativadas: nome1, nome2`

**Why:** Felipe viu esse padrão em outra interface (print de um app tipo FleetView) e quer visibilidade imediata de quais skills entraram em ação, sem precisar inferir pelos tool calls do transcript.

**How to apply:** Regra global, vale para qualquer projeto/sessão, não só Real Vision. Aplicar toda vez que Skill for chamada, antes do restante do texto de resposta.
