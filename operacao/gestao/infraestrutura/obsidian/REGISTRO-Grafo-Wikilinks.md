# Registro — Grafo e Cobertura de Wikilinks do Company OS

> Iniciado em 31/07/2026, a partir de uma reflexão sobre o vídeo "Graph Engineering" do Lucas Montano. Índice: [[README]].

---

## Contexto

Auditoria inicial mostrou que só 262 de 1293 arquivos `.md` do vault (20%) têm `[[wikilink]]` — e a maior parte disso é a wiki dedicada (`operacao/gestao/infraestrutura/obsidian/wiki/`), estruturada de propósito. As pastas operacionais (clientes, projetos internos) estavam majoritariamente órfãs no Graph View.

Duas frentes de trabalho separadas:
1. **Poluição visual do Graph View** — resolvida via config local
2. **Cobertura real de wikilink** — trabalho em etapas, plano salvo em `C:\Users\Computador\.claude\plans\agora-vamos-trabalhar-nos-eager-panda.md`

---

## Parâmetros técnicos aplicados

### Filtro do Graph View (`.obsidian/graph.json`)
```json
"search": "-path:\"operacao/gestao/infraestrutura/memoria\" -path:\"operacao/clientes/arquivos\" -path:\"operacao/cursos\" -path:\"skills\"",
"showOrphans": false
```
Exclui notas sem link nenhum + pastas operacionais sem link intencional (memória, fichas de cliente, cursos, skills).

**Importante:** `.obsidian/` é bloqueado no `.gitignore` do vault (ver [[REGISTRO-Tecnico]]) — essa mudança é **só local nesta máquina**, não sincroniza pro celular/GitHub. Se Felipe abrir o Graph View em outro aparelho, precisa aplicar o mesmo filtro lá.

### Regra de link usada nas pastas operacionais
Padrão fixo (não caso a caso), replicado em toda etapa:
- Doc central da pasta (FICHA-CLIENTE, README, ou doc mais relevante) vira "hub", linkando pra wiki/entities (se cliente) e pros demais docs da pasta
- Cada doc secundário linka de volta pro hub
- TIMELINE sempre linka pro doc central e vice-versa

---

## Status por etapa

### ✅ Etapa 1 — Clientes (`operacao/clientes/arquivos/`) — CONCLUÍDA 31/07/2026
- 71 arquivos linkados (de ~30 antes)
- 3 notas novas em `wiki/entities/`: `fabiano-manahh`, `hallan-lavanderia-magnolia`, `diogo-dinfo`
- Fora de escopo (sem `.md` na pasta): Casa Ecologica Paraty, PousadaDasFlores
- Já 100% antes de começar: William - Wood Art, Romana - Sunbite

### ✅ Etapa 2 — Projetos internos (`operacao/projetos/_RV-Internos/`) — CONCLUÍDA 31/07/2026
- 112 arquivos linkados no total
- VisionFlow: 0→20/20 (hub: `docs/PRODUTO.md`)
- Sócio Digital: 0→9/9 (cadeia sequencial 01→07 + README índice)
- jogo-da-terra: 13→15/17 (2 restantes são referências externas, fora de escopo)
- Cluster home/design (`documentacao/`): AUDITORIA-HOME → NOVA-HOME-ARQUITETURA → COPY-HOME → BRIEFING-CLAUDE-DESIGN linkados em cadeia, + MELHORIAS-SITE, INTEGRACAO-SOCIO-DIGITAL
- Cluster campanha ads (`documentacao/`): CAMPANHA-SLM-LLM-WHATSAPP ↔ AUDITORIA-SEGURANCA-TRACKING-SITE ↔ GOOGLE-ADS-MCP-INTEGRACAO ↔ LP-PRESENCA-DIGITAL-COPY
- instagram-mcp: 0→3/3
- Ignorados de propósito: `LIMPEZA-REPOS-GEMINI.md` (tópico isolado, sem relação com os outros), `real-vision-site/PLANO_I18N.md` (marcado obsoleto pelo próprio autor, aponta pra skill `rv-i18n` — não devia virar hub ativo)
- Fora do escopo original, sinalizado: `canal-youtube/` (34 arquivos, projeto próprio maior — decisão pendente se vira etapa futura)

### ⏳ Etapa 3 — Comercial (`operacao/comercial/`) — NÃO INICIADA
Candidata: linkar contratos/termos pra `wiki/concepts/termos-condicoes.md` e `contrato-rv.md`

### ⏳ Etapa 4 — Prospecção (`operacao/prospeccao/`) — NÃO INICIADA
Candidata: já tem ACQUISITION-* com alguns links; completar cobertura

### ⏳ Etapa 5 — Cursos (`operacao/cursos/`) — NÃO INICIADA
Candidata: avaliar se faz sentido linkar entre módulos e pra área de membros

### Fora de escopo permanente
Memória (`operacao/gestao/infraestrutura/memoria/`) e skills (`skills/`) — arquivos de referência técnica do agente, não fazem sentido como nodes de grafo de conhecimento do negócio.

---

## Para retomar na próxima sessão
1. Ler este arquivo + o plano completo em `C:\Users\Computador\.claude\plans\agora-vamos-trabalhar-nos-eager-panda.md`
2. Decidir se `canal-youtube/` vira etapa própria antes de seguir pra etapa 3
3. Seguir com etapa 3 (comercial) — mesmo padrão: explorar estrutura primeiro (agente Explore), depois aplicar regra de link

## Conexões
- Plano completo: `C:\Users\Computador\.claude\plans\agora-vamos-trabalhar-nos-eager-panda.md`
- Config técnica de sync: [[REGISTRO-Tecnico]]
- Índice: [[README]]
