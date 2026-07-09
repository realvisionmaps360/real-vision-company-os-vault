---
name: feedback-pasta-raiz-limpa
description: "Regra de higiene da pasta raiz Desktop\\Real Vision — arquivos temporários vão em TEMP/, raiz é sagrada"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 24f0dbe5-153c-4246-8d04-d6ab774e6f6b
---

Arquivos temporários (screenshots, HTMLs provisórios, qualquer lixo de trabalho gerado durante uma sessão) devem ir obrigatoriamente para `TEMP/` dentro de `Desktop\Real Vision\`. A raiz da pasta só pode ter estrutura permanente.

**Why:** A pasta acumulou 13 PNGs de screenshots e 11 arquivos de 0 KB criados acidentalmente por ferramentas durante sessões de trabalho (25/06/2026). Felipe já havia pedido antes que a pasta ficasse limpa. A regra também foi documentada no item 7 de `AGENTS.md`.

**How to apply:** Antes de criar qualquer arquivo temporário (screenshot, preview, HTML de teste), checar se o caminho é `TEMP/` ou uma subpasta de trabalho. Ao final de qualquer sessão, limpar o que foi jogado em `TEMP/`. Nunca criar arquivo solto na raiz `Desktop\Real Vision\`.
