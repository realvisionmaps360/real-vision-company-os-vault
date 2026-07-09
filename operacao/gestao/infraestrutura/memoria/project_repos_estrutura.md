---
name: project_repos_estrutura
description: Estrutura oficial de repos/projetos da Real Vision — onde cada projeto vive localmente
metadata: 
  node_type: memory
  type: project
  originSessionId: 55c00cdf-f4b6-4f6b-9761-f2db5e3eca8b
---

Todos os repos de projeto ficam em `Desktop\Real Vision\operacao\projetos\`. Cada subpasta é um projeto (correção 02/07/2026: `real-vision-site` e `visionflow` estão dentro de `_RV-Internos\`, não direto em `projetos\`):

| Pasta | Repo GitHub | Descrição |
|---|---|---|
| `_RV-Internos\real-vision-site` | `realvisionmaps360/real-vision-core` | Site principal (Claude Code) |
| `_RV-Internos\visionflow` | `realvisionmaps360/visionflow-crm-48fe197a` | CRM interno da Real Vision |
| `solariumaarau` | `realvisionmaps360/solariumaarau-12006307` | Projeto cliente Gabriel, Suíça (entregue) |

**Why:** Em 2026-05-25 foram encontradas cópias duplicadas nas pastas `.gemini\antigravity-backup\scratch` e `.gemini\antigravity-ide\scratch`. Essas cópias devem ser apagadas. Documento de limpeza: `operacao/projetos/LIMPEZA-REPOS-GEMINI.md`.

**How to apply:** sempre trabalhar os repos a partir de `Desktop\Real Vision\operacao\projetos\`. Nunca usar as pastas `.gemini` como referência.
