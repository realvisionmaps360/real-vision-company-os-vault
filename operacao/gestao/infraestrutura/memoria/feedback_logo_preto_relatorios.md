---
name: feedback-logo-preto-relatorios
description: "Padrão de logos em propostas e relatórios: capa clara = rv-logo-black.png; capa escura = rv-logo-white.png; run-head (símbolo pequeno no topo das páginas internas) = visionflow.png. Email profissional em documentos = adm@realvisionmaps.com."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a7aedd55-49ab-40d9-8762-e4b3ce6eab6b
---

## Logos em documentos de cliente (propostas, relatórios)

| Posição | Arquivo | Detalhe |
|---|---|---|
| Capa clara (Cover B) | `rv-logo-black.png` | |
| Capa escura (Cover A) | `rv-logo-white.png` | |
| Run-head — símbolo no topo de cada seção interna (fundo branco) | `mark.png` | **Obrigatório:** `style="filter:brightness(0)"` — sem isso o mark fica invisível no fundo branco |

**Why:** `visionflow.png` não existe no brand/ da skill. O `mark.png` é claro/branco e fica invisível em fundo branco sem o filtro CSS. Confirmado em 16/06/2026 pelo Felipe.

**Nota (03/07/2026):** desde a migração de PDF pra HTML (ver [[project_rv_relatorio_html_migracao]]), os 3 logos não ficam mais copiados soltos na pasta do cliente — são embutidos como base64 direto no `.html` final pelo `assets/finalize.ps1`, pra o arquivo funcionar como anexo de email autocontido.

## Email profissional em documentos

Sempre usar `adm@realvisionmaps.com` em propostas, relatórios e rodapés de documentos de cliente. Nunca usar `realvisionmaps360@gmail.com` em documentos oficiais.

**Why:** Felipe confirmou em 13/06/2026 — o Gmail é pessoal/operacional, o email profissional está funcionando normalmente e deve ser o padrão em toda comunicação de cliente.
