---
name: feedback-links-arquivos-entrega
description: "Sempre mostrar links clicáveis dos arquivos criados no final de cada entrega, e cruzar links entre arquivos relacionados estilo Obsidian"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f0d79fa4-c51f-43b0-a7c7-047e8ff2d85e
---

Ao final de qualquer entrega que crie ou modifique arquivos, mostrar os links clicáveis no chat usando sintaxe markdown (caminho relativo ao working directory).

**Why:** Felipe quer poder clicar diretamente no arquivo sem precisar navegar manualmente. Pedido explícito em 25/06/2026.

**How to apply:**
- No final da resposta, listar cada arquivo criado/modificado como link markdown clicável
- Usar caminho relativo ao working directory (`C:\Users\Computador\Desktop\Real Vision\`)
- **CRÍTICO:** caminhos com espaços (ex: `Alexis Lafatas - Lafatas Grafik/`) quebram o markdown. Sempre envolver com `< >`: `[nome](<caminho com espacos/arquivo.md>)`
- Quando arquivos são relacionados (ex: TIMELINE + relatório do mesmo cliente), adicionar cross-links em **markdown padrão** `[Nome](arquivo.md)` — NUNCA usar `[[duplo colchete]]` pois só funciona no Obsidian, não no Claude Code
- Formato da seção no chat:

```
---
**Arquivos entregues:**
- [Nome do arquivo](caminho/relativo/arquivo.md)
- [Outro arquivo](caminho/relativo/outro.md)
```
