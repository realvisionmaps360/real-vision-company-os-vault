---
name: feedback_gitignore_repos_nomeados
description: "No .gitignore da raiz do Company OS, bloquear repositório de código pelo nome específico, nunca a pasta operacao/projetos/ inteira"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6f3a0785-89fa-4d67-8803-b2f53d63dbe4
---

Regra: quando um novo projeto dentro de `operacao/projetos/` for um repositório de código (tiver `.git` próprio), adicionar uma linha nomeando esse caminho exato no `.gitignore` da raiz. Nunca reintroduzir uma exclusão genérica tipo `operacao/projetos/` bloqueando a pasta inteira.

**Why:** até 04/07/2026 o `.gitignore` bloqueava `operacao/projetos/` de uma vez, o que também escondia do vault Obsidian (e portanto do celular) 4 pastas que eram só documentação `.md` sem `.git` interno (`_RV-Internos/brasil-trip-junho-2026/`, `documentacao/`, `jogo-da-terra/`, `socio-digital/`). Felipe percebeu que o celular não via essas pastas e pediu correção — ver [[reference_company_os_git_vault]] e `operacao/gestao/infraestrutura/obsidian/REGISTRO-Tecnico.md`.

**How to apply:** a regra geral do `.gitignore` já é "ignora tudo, exceto pastas e `.md`" — então pastas de documentação pura ficam visíveis automaticamente, sem precisar de nenhuma linha. Só repositórios de código precisam de exclusão explícita e nomeada. Lista atual bloqueada: `visionflow/`, `real-vision-site/`, `solariumaarau/`, `sunbite-site/`, `rv-cartaodigital-paraty-onboard/` (todos dentro de `operacao/projetos/`) + `operacao/clientes/arquivos/MSV-Aarau/site/`.
