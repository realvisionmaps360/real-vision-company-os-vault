---
name: feedback-rv-relatorio-tamanhos-imagem
description: Tamanhos de imagem travados por tipo de print nos relatórios HTML da rv-relatorio (04/07/2026)
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bbbba8af-3964-43cd-8480-5ae500de070f
---

Nos relatórios de cliente gerados pela skill `rv-relatorio`, usar sempre os 3 tamanhos abaixo por tipo de print — não reabrir essa discussão a cada relatório novo:

- **Print recortado só no card/perfil** (ex.: card do perfil do Google Meu Negócio): classe `.shot-img` padrão, `max-width:480px`.
- **Print de página inteira** (ex.: painel completo do Search Console, do Analytics): classe `.shot-img.wide`, `max-width:600px` (25% maior).
- **Comparação antes/depois lado a lado** (`.compare-photos`): cada figura `max-width:338px` (30% maior que o primeiro teste, 260px).

**Por quê:** Felipe testou o relatório do Lafatas em 2 rodadas (ver [[project_rv_relatorio_html_migracao]]) e travou esses tamanhos como padrão definitivo depois de comparar visualmente — não são arbitrários, refletem o tipo de conteúdo de cada print (recorte pequeno vs. página inteira densa).

**Como aplicar:** os 3 tamanhos já estão embutidos em `~/.claude/skills/rv-relatorio/assets/template.html` (CSS + exemplos na paleta de componentes). Ao montar um relatório novo, só escolher a classe certa por tipo de imagem, sem reinventar o tamanho.

O relatório do Lafatas (`Lafatas_Relatorio-SEO_04-07-26.html` / `Lafatas_Bericht-SEO_04-07-26.html`, na pasta `operacao/clientes/arquivos/Alexis Lafatas - Lafatas Grafik/`) é a referência viva desse padrão — citado no SKILL.md da `rv-relatorio`.
