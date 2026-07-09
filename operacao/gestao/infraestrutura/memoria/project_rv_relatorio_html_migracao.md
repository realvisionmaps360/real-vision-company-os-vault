---
name: project-rv-relatorio-html-migracao
description: rv-relatorio migrou de PDF para HTML como formato final de entrega (03/07/2026)
metadata: 
  node_type: memory
  type: project
  originSessionId: ac903d92-402c-441f-be24-de7b548a3e59
---

Em 03/07/2026, Felipe decidiu que a skill `rv-relatorio` deixa de entregar relatórios de cliente em PDF e passa a entregar **HTML direto** — mais bonito, ilustra melhor (imagens maiores, sem limite de página A4) e mais fácil do cliente ver.

**Decisões tomadas:**
- **Entrega:** anexo de email (`.html`), igual ao PDF antes — não vira link hospedado.
- **Layout:** scroll contínuo (landing page única), abandonou a metáfora de "páginas A4" com quebra.
- **Portabilidade:** o `.html` final precisa ser autocontido (funciona como anexo aberto localmente) — logos, capa honeycomb e prints de evidência são embutidos como base64 pelo novo `assets/finalize.ps1`. Fontes continuam via Google Fonts CDN (aceitável, cliente abre com internet).

**O que mudou tecnicamente:**
- `assets/template.html` reescrito: sem `.page{width:210mm...}`, sem `@page`/`@media print` — virou seções empilhadas (`section.sec`) de largura fluida.
- `assets/render.ps1` (Chrome headless → PDF) foi removido e substituído por `assets/finalize.ps1`, que varre o HTML por `<img src="arquivo.png">` local e embute como base64 (não depende mais de Chrome/Edge nem de `--user-data-dir`).
- Nome de arquivo final: `<Cliente>_<Tipo>_<DD-MM-AA>.html` (era `.pdf`).

**Primeiro relatório no formato novo:** teste aprovado por Felipe recriando `Lafatas_Relatorio-SEO_02-07-26.pdf` (cliente Alexis Lafatas) em HTML — salvo em `operacao/clientes/arquivos/Alexis Lafatas - Lafatas Grafik/Lafatas_Relatorio-SEO_02-07-26.html`, ao lado do PDF original (não apagado).

**Why:** pedido direto do Felipe — HTML permite melhor ilustração visual do que PDF impresso, e o cliente vê mais fácil.

**How to apply:** todo relatório novo de cliente usa o fluxo em [[project_rv_relatorio_skill]] atualizado — ver `SKILL.md` da skill `rv-relatorio`. Ver também [[feedback_rv_relatorio_pdf_direto]] e [[feedback_logo_preto_relatorios]] para as regras de execução atualizadas.
