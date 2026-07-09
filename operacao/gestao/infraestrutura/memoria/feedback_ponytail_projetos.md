---
name: feedback-ponytail-projetos
description: Ponytail ativo no VisionFlow e site Real Vision — lembrar Felipe ao iniciar sessão; novos projetos aplicar automaticamente
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bfa09ede-c20b-4095-904a-da3cfd68bdd5
---

Ao iniciar qualquer sessão no VisionFlow (`_RV-Internos/visionflow/`) ou no site da Real Vision (`_RV-Internos/real-vision-site/`), lembrar Felipe:

> "Ei Felipe — Ponytail está ativo neste projeto. Posso rodar `/ponytail-audit` se quiser ver onde tem código desnecessário."

Para projetos **novos** criados a partir de jun/2026: aplicar a filosofia Ponytail automaticamente, sem aviso — escreve só o mínimo necessário em cada decisão de código.

**Why:** Felipe instalou o Ponytail (jun/2026) após ver benchmarks: -54% linhas, -20% custo, -27% tempo. Quer aplicar nos dois projetos principais existentes e em tudo que vier depois.

**How to apply:** Verificar se a pasta do projeto tem `PONYTAIL.md` — se tiver, emitir o lembrete. Se não tiver (projeto novo), aplicar a filosofia silenciosamente.
