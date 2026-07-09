---
name: project-rv-relatorio-skill
description: Skill rv-relatorio — gera relatórios/documentos de cliente em PDF com identidade RV e capa honeycomb
metadata: 
  node_type: memory
  type: project
  originSessionId: 97da19c2-bcd0-4421-9334-5b7046f4bcec
---

Skill **`rv-relatorio`** criada em 11/06/2026 (em `~/.claude/skills/rv-relatorio/`). Gera relatórios e documentos de cliente da Real Vision em **PDF A4 retrato**, com identidade da marca e **capa honeycomb** (colmeia de hexágonos mascarando uma foto do cliente, contínua entre os hexágonos).

- **Duas capas** salvas no template, escolhidas por relatório: **A** escura+âmbar (`cover=a`) · **B** clara (`cover=b`). Miolo sempre claro.
- Arquivos: `assets/template.html` (2 capas + builder da colmeia + paleta de componentes: checklist, tabela de status, etapas, opção A/B, timeline, callout), `assets/render.ps1` (HTML→PDF via Chrome headless), `assets/brand/` (logos white/black/mark).
- Princípio: Felipe dita o conteúdo na hora; lê a pasta do cliente se houver, mas não depende. Texto do cliente é intocável — só design.
- **Render no Windows:** Chrome headless EXIGE `--user-data-dir` temporário (senão repassa pra instância aberta e não gera arquivo); retorna exit code 1 mesmo gerando o PDF (confiar no Test-Path); Read não abre PDF aqui (sem poppler) → verificar via PNG screenshot.
- Primeiro relatório feito com ela: BrazilComp — Alinhamento do Projeto (capa clara), em `operacao/clientes/arquivos/Dorival  Martins - Brazilcomp/` — usar como exemplo real.

Relacionada a [[project-rv-blogpost-skill]] e [[project-gnomo-monstro-skill]] (skills de capacidade da RV). Segue [[feedback-skill-realvision-primeiro]] (ativar `realvision` antes).
