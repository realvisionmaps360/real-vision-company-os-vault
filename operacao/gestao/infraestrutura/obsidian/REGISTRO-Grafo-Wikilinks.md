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

### ✅ Etapa 3 — Comercial (`operacao/comercial/`) — CONCLUÍDA 31/07/2026
- 15/15 arquivos linkados (de 5 antes)
- README vira hub geral: linka templates, `[[contrato-rv]]`, `[[termos-condicoes]]` e os 2 clusters de parceiros
- Quarteto contrato/termos (PT+EN) ganhou link pro conceito correspondente na wiki + volta pro README
- SOCIO_DIGITAL_COPY_NOVA.md: corrigido link quebrado `[[CONCEITO]]` (ambíguo — 4 arquivos com esse nome no vault) pro caminho completo `[[operacao/cursos/03-socio-digital/CONCEITO]]`
- `parceiros/ari-ilhabela/`: BRIEFING-PARCERIA-ARI vira hub local, linka os outros 6 docs (WHATSAPP, PROPOSTA, EMAIL, KIT, CONTRATO, ANALISE); sem entity em `wiki/entities` pra Ari — fora de escopo criar
- `parceiros/hallan-letice/`: proposta linkada ao README + entity existente `[[hallan-lavanderia-magnolia]]`

### ✅ Etapa 4 — Prospecção (`operacao/prospeccao/`) — CONCLUÍDA 31/07/2026
- 14/14 arquivos linkados (de 8 antes)
- README já era hub parcial (linkava os 6 ACQUISITION-*); adicionado `[[VOICE-AI-INTEGRATION-PLAN]]` (estava órfão do hub) + as 3 listas de contato que faltavam na tabela (SBC agências, SBC petshops, Av. Paulista) + link pro conceito espelho `[[acquisition-system]]`
- Todos os 6 ACQUISITION-* + TIMELINE + VOICE-AI-INTEGRATION-PLAN ganharam link de volta pro `[[README]]` (só linkavam uns aos outros, nenhum apontava pro hub)
- As 5 listas de contato (Paraty pousadas/restaurantes, SBC agências/petshops, Av. Paulista) estavam 100% órfãs — todas ganharam `[[README]]`; as 2 de Paraty também `[[campanha-paraty-2026]]`
- Fechado o ciclo wiki↔pasta: `wiki/concepts/acquisition-system.md` ganhou link de volta pro `[[operacao/prospeccao/README|Prospecção — README]]` (antes só citava fontes textuais soltas, sem wikilink pra pasta operacional)

### ✅ Etapa 5 — Cursos (`operacao/cursos/`) — CONCLUÍDA 31/07/2026
- 16/16 arquivos linkados
- README geral: adicionado curso 04 (faltava na tabela, totalmente órfão)
- Corrigidos 3 wikilinks ambíguos/quebrados: `[[CONCEITO]]` e `[[README]]` sem caminho completo são ambíguos (4x `CONCEITO.md` e 5x `README.md` no vault inteiro) — trocados por caminho completo tipo `[[03-socio-digital/README|README]]`; corrigida sintaxe quebrada `CONCEITO\|Empresa com IA` (barra invertida antes do pipe) em `03-socio-digital/CONCEITO.md`
- Curso 01 (sem README próprio): CONCEITO.md assumido como hub — mesma lógica da regra 4 do plano original (pastas sem doc central "oficial" usam o mais central como hub, sem criar arquivo novo)
- Curso 02: `MODULO-1-google-meu-negocio.md` ganhou link de volta pro módulo anterior + README (só recebia links, não devolvia)
- Curso 03: `GUIA-3-PERGUNTAS.md` ganhou link pro hub certo + TIMELINE
- Curso 04: totalmente órfão antes — README↔CONCEITO linkados entre si + pro índice geral
- Fechado o ciclo wiki↔pasta: `wiki/sources/cursos-real-vision.md` ganhou seção linkando os 4 hubs físicos (antes só resumia em texto solto, sem wikilink pra pasta); `wiki/concepts/socio-digital.md` ganhou link pro curso 03 (produto e curso são conceitos distintos, mas relacionados)

### Fora de escopo permanente
Memória (`operacao/gestao/infraestrutura/memoria/`) e skills (`skills/`) — arquivos de referência técnica do agente, não fazem sentido como nodes de grafo de conhecimento do negócio. Regra formalizada em `AGENTS.md` seção 3.

### ✅ Rodada de varredura/correção — 31/07/2026
Segunda varredura confirmou etapas 3-5 em 100% e achou docs de negócio criados **depois** que etapas 1-2 fecharam (não regressão, arquivo novo):
- Cliente Alexis Lafatas: 8 docs novos em `docs/` (analytics, before/after SEO, snapshots) linkados ao TIMELINE (hub)
- Cliente Fabiano/Manáh: `SCRIPT-AUDIO-WHATSAPP.md` linkado à FICHA-CLIENTE
- Cliente William/Wood Art: 2 docs de revisão da Romana (`revisao-romana/`) linkados à FICHA-CLIENTE
- `real-vision-site/docs/academy/README.md`: linkado ao hub real em `real-vision-academy/docs/CONTEXT.md`
- `jogo-da-terra/`: 4 arquivos novos (`FINAL DO JOGO EARTH GAME.md` + 3 `referencias/*` que já eram citados em texto puro no README, viraram wikilink de verdade) linkados ao README
- `documentacao/INCIDENTE-404-CLEANURLS-BLOG-OG-2026-07-16.md`: linkado ao `BLOG-POSTS-PIPELINE.md` (relação causal real — incidente foi causado por mudança no blog)
- `INFRA-TOURS-REDIRECT.md`: fica sem link — não achei doc relacionado de verdade na pasta, forçar link seria conexão falsa
- Confirmado fora de escopo (código de repo de cliente/projeto, não conhecimento de negócio): todo `README.md`/`.lovable/plan.md`/docs técnicos dentro de `site/`, `entrega-final/`, `prototipo/` — Brazilcomp, Conecta Saúde, Flávia/Vila dos Corais, Hallan, MSV-Aarau, `real-vision-site/CLAUDE.md`+`PONYTAIL.md`, `visionflow/.lovable/`
- Contagem final: clientes 82/104 (22 restantes = código de repo, fora de escopo confirmado), projetos internos 78/142 (64 restantes = canal-youtube 51 + código de repo + intencionais)
- **Padrão virou regra permanente**: `AGENTS.md` seção 3 ganhou bloco "Wikilinks (padrão permanente)" — todo `.md` novo em `operacao/` deve linkar pro hub da pasta daqui pra frente, sem precisar de rodada de varredura manual

---

## Plano concluído — 31/07/2026
Todas as 5 etapas do plano original fechadas (clientes, projetos internos, comercial, prospecção, cursos). `canal-youtube/` (34 arquivos, projeto próprio maior) segue fora de escopo por decisão do Felipe — não virou etapa própria.

Pendências que sobraram, se algum dia valer retomar:
- Decidir se `canal-youtube/` vira etapa própria
- Erros de encoding pré-existentes em vários arquivos `wiki/*.md` (acentos corrompidos tipo "Condi��es") — fora do escopo deste projeto, mas atrapalham leitura
- Seção "Conexões" duplicada em `wiki/sources/cursos-real-vision.md` (bug pré-existente, não criado por este trabalho)

## Conexões
- Plano completo: `C:\Users\Computador\.claude\plans\agora-vamos-trabalhar-nos-eager-panda.md`
- Config técnica de sync: [[REGISTRO-Tecnico]]
- Índice: [[README]]
