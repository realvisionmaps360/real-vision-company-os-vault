---
name: feedback-skill-realvision-paths
description: Caminhos corretos do Company OS da Real Vision — a pasta antiga Documents\Real Vision Staff não existe mais
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4fea74cb-1db5-46c4-bc7f-bb32af06484d
---

O knowledge base da Real Vision NÃO está mais em `C:\Users\Computador\Documents\Real Vision Staff\`. Essa pasta não existe.

O Company OS correto é `C:\Users\Computador\Desktop\Real Vision\`, com a seguinte estrutura:

| Arquivo | Conteúdo |
|---|---|
| `AGENTS.md` | Regras de trabalho — ler primeiro |
| `contexto\EMPRESA.md` | Empresa, portfólio, metodologia, visão estratégica |
| `contexto\TIME.md` | Estrutura do time, contratações |
| `contexto\VOZ.md` | Tom de comunicação, linguagem |
| `contexto\DESIGN.md` | Paleta, fontes, logo |
| `contexto\ativos\` | Logos, fotos, fontes |
| `operacao\rh\` | Processo seletivo, vagas, candidatas |
| `operacao\projetos\real-vision-site` | Repo local do site (sincronizar com git pull antes de usar) |
| `operacao\projetos\visionflow` | CRM interno |

**Why:** Em 2026-05-25, a skill `realvision` tentou ler `Documents\Real Vision Staff\KNOWLEDGE_BASE.md` e falhou — arquivo não existe. O contexto migrou para a estrutura de Company OS em `Desktop\Real Vision\`. A skill foi corrigida na mesma data.

**How to apply:** Se qualquer skill ou instrução mencionar `Documents\Real Vision Staff`, ignorar esse path e usar `Desktop\Real Vision\` como raiz. Verificar com Glob antes de tentar ler qualquer arquivo de contexto se houver dúvida sobre existência.
