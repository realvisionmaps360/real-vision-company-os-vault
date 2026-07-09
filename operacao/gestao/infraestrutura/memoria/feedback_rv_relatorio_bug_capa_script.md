---
name: feedback-rv-relatorio-bug-capa-script
description: Bug corrigido na skill rv-relatorio — foto de capa referenciada dentro de <script> nunca era embutida pelo finalize.ps1
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d56a502-a3cc-461d-a8c3-352894b98768
---

O `finalize.ps1` da skill [[project_rv_relatorio_html_migracao]] só embute imagens que estão em atributos `src=""` de tags `<img>`. O script da colmeia (honeycomb) referenciava a foto de capa como uma string dentro do `<script>` (`var IMG="arquivo.png"`), então nunca era detectada nem embutida — a capa ficava sem imagem no HTML final sempre que não fosse um dos 3 logos fixos.

**Correção aplicada em 03/07/2026** (`assets/template.html` e `SKILL.md`, ambos em `~/.claude/skills/rv-relatorio/`): adicionada uma tag `<img id="hive-source" src="{{COVER_IMAGE}}" style="display:none">` logo após `<body>`. O `finalize.ps1` embute essa tag normalmente (é um `src=""` de verdade); o script então lê `document.getElementById("hive-source").src` (já em base64) em vez do caminho de arquivo puro.

**Why:** descoberto ao gerar a proposta comercial do [[project_solarium_aarau]] — Felipe percebeu que a foto da fachada não aparecia na capa. O padrão antigo (script com caminho de arquivo direto) provavelmente afetou relatórios anteriores feitos com fotos de capa customizadas (não os 3 logos).

**How to apply:** sempre que usar `rv-relatorio` com uma foto de capa própria do cliente (não só os logos padrão), confirmar que o template já tem a tag `hive-source` — se estiver montando um HTML do zero sem copiar o template atualizado, replicar esse padrão.
