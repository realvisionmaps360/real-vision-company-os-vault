---
name: rv-wiki
description: Wiki inteligente do Company OS da Real Vision. Ingere documentos, responde perguntas com base no que foi registrado, e faz varreduras de saúde da base de conhecimento. Ativar quando Felipe jogar material novo para a wiki, quiser consultar algo no Company OS, ou pedir para limpar/auditar a base.
---

# RV Wiki — Base de Conhecimento Inteligente

O Claude lê o Company OS da Real Vision e mantém uma wiki organizada no Obsidian. Felipe joga material bruto, o Claude processa e conecta tudo. A wiki cresce com o tempo e vira o "segundo cérebro" da operação.

## Regras absolutas

- **Claude NUNCA edita `raw/`.** Se um arquivo de entrada tiver erro, a correção vai na wiki com referência.
- **Felipe NUNCA edita `wiki/` à mão.** Se quiser mudar algo na wiki, pede ao Claude.
- **Toda afirmação cita uma fonte.** `[[wiki/sources/<pagina>]]` ou `[externo: URL]`.
- **Toda página nova entra no índice e no log.** Sem exceção.
- **Antes de varrer o Company OS inteiro:** estimar o volume de arquivos e avisar Felipe antes de consumir contexto em massa.

## Onde fica

```
Desktop\Real Vision\operacao\gestao\infraestrutura\obsidian\
  raw/              ← Felipe joga aqui (PDFs, transcrições, artigos, screenshots)
    attachments/    ← imagens coladas do Obsidian
  wiki/             ← Claude escreve aqui, Felipe só lê
    index.md        ← catálogo de todas as páginas
    log.md          ← histórico cronológico de ingestas
    concepts/       ← ideias, frameworks, metodologias
    entities/       ← pessoas, empresas, projetos, produtos
    sources/        ← uma página por documento ingerido
    questions/      ← perguntas abertas, contradições
```

Se a pasta `wiki/` não existir ainda, criar a estrutura antes do primeiro ingest.

## Gatilhos (linguagem natural)

| O Felipe diz... | O Claude faz... |
|---|---|
| "ingere isso", "adiciona à wiki", "lê o que tem em raw/" | Workflow 1 — Ingest |
| "o que a wiki sabe sobre X?", "consulta a wiki sobre X", "pergunta pra wiki" | Workflow 2 — Query |
| "limpa a wiki", "varre a wiki", "verifica órfãos", "audita a base" | Workflow 3 — Lint |
| "ingere o Company OS todo", "varre tudo" | Workflow 4 — Ingest em massa (com estimativa de custo primeiro) |

## Schema das páginas (frontmatter obrigatório)

```yaml
---
type: concept | entity | source | question
title: "Título legível"
aliases: []
date_created: YYYY-MM-DD
date_updated: YYYY-MM-DD
source_count: 0
tags: []
status: stub | draft | stable
---
```

Páginas de `source` também têm: `source_file`, `source_url`, `author`, `date_published`, `date_ingested`.

## Regras de nomenclatura

- Nomes de arquivo em **kebab-case** sem espaços: `proposta-comercial.md`, não `Proposta Comercial.md`
- Substantivos no **singular**: `cliente`, não `clientes`
- Datas **nunca no nome do arquivo** — ficam no frontmatter
- Links internos sempre com `[[wikilink]]`, nunca Markdown puro
- Uma ideia por página — se crescer demais, dividir e backlinkar

## Categorias da Real Vision (adaptar ao ingerar)

Usar estas categorias para classificar conceitos e entidades:

- **clientes** — pessoas e empresas atendidas
- **servicos** — site, tour-360, gmb, fotografia, drone, ia, automação
- **prospeccao** — métodos, cidades, campanhas
- **operacao** — processos internos, skills, ferramentas
- **financeiro** — precificação, pacotes, histórico
- **marketing** — copy, posicionamento, canais
- **tecnologia** — stack, MCPs, automações, código

---

## Workflow 1 — Ingest (um documento)

**Gatilho:** "ingere isso", "ingere raw/[arquivo]", "adiciona à wiki"

1. **Identificar o alvo.** Se só um arquivo novo em `raw/`, usar ele. Se vários, perguntar qual. Nunca adivinhar.
2. **Ler o documento completo.** PDFs, transcrições, artigos — sem pular. Para documentos longos, fazer notas durante a leitura.
3. **Criar `wiki/sources/<kebab-titulo>.md`** com:
   - TL;DR em 3 linhas
   - Afirmações-chave (cada uma com evidência)
   - Entidades mencionadas (pessoas, empresas, projetos)
   - Conceitos introduzidos ou aprofundados
   - Perguntas abertas que o documento levanta
   - Citações diretas que vale preservar
4. **Tocar 10–15 páginas relacionadas:**
   - Se a página existe: adicionar referência na seção "Fontes-chave", tecer novos dados no corpo, atualizar `date_updated` e `source_count`.
   - Se não existe e o tema é central: criar stub a partir do template de concept ou entity.
   - Adicionar `[[backlinks]]` nos dois sentidos.
5. **Atualizar `wiki/index.md`** com a nova source e qualquer página nova criada.
6. **Registrar em `wiki/log.md`:** `## [YYYY-MM-DD] ingest | Título` → link da source, páginas tocadas, resumo de uma linha.
7. **Reportar ao Felipe:** o que foi criado, o que foi atualizado, contradições ou perguntas abertas que o documento levantou.

## Workflow 2 — Query (consulta)

**Gatilho:** "o que a wiki sabe sobre X?", "consulta a wiki", "pergunta pra wiki"

1. **Buscar na wiki.** Usar Grep em `wiki/` — tags, títulos e corpo. Rede ampla; o objetivo é achar vizinhos relevantes, não só match exato.
2. **Sintetizar com citações.** Responder citando `[[wikilinks]]` para cada afirmação. Distinguir certeza de inferência. Sinalizar contradições.
3. **Promover respostas valiosas.** Se a resposta é não-trivial e vai ser repetida, criar página em `wiki/questions/` (ou `wiki/concepts/` se virou ideia estável). Backlinkar as fontes. Adicionar ao `index.md`.
4. **Nunca inventar.** Se a wiki não cobre algo, dizer claramente. Conhecimento externo entra com `[externo: URL]`.

## Workflow 3 — Lint (auditoria)

**Gatilho:** "limpa a wiki", "varre a wiki", "verifica órfãos"

Varrer em busca de:

- **Páginas órfãs** — zero `[[backlinks]]` apontando para elas. Linkar ou deletar.
- **Links quebrados** — `[[wikilinks]]` que não existem. Criar stubs ou corrigir typos.
- **Contradições** — duas páginas com afirmações incompatíveis. Criar página em `wiki/questions/`.
- **Afirmações desatualizadas** — `date_updated` antiga, fontes superadas.
- **Backlinks faltando** — source menciona entidade X mas página de X não cita a source.
- **Frontmatter incompleto** — campos obrigatórios faltando, `type` errado, `source_count` incorreto.
- **Drift de índice/log** — páginas no disco que não estão no `index.md`, ou ingestas que não foram ao `log.md`.

Reportar como lista priorizada. Não corrigir destrutivamente sem confirmar com Felipe. Correções triviais (backlink faltando) podem ser feitas diretamente.

## Workflow 4 — Ingest em massa (Company OS)

**Gatilho:** "ingere o Company OS todo", "varre tudo", "processa tudo"

> **Atenção de custo:** varrer o Company OS inteiro é pesado. Antes de qualquer coisa:

1. **Contar os arquivos.** `Get-ChildItem -Recurse -Filter "*.md" | Measure-Object`
2. **Estimar o custo:** cada ~50 arquivos de tamanho médio = aproximadamente 10–15% da cota de 5h. Comunicar ao Felipe antes de começar.
3. **Receber OK** antes de iniciar.
4. **Processar em lotes** de 20–30 arquivos, reportando progresso a cada lote.
5. **Priorizar** pastas de maior valor: `clientes/`, `prospeccao/`, `comercial/` antes de configurações e infra.

**Ordem recomendada para primeira varredura:**
1. `operacao/clientes/arquivos/` — fichas e dossiês
2. `operacao/prospeccao/` — campanhas e contatos
3. `operacao/comercial/` — contratos, termos, propostas
4. `operacao/marketing/` — email marketing, blog
5. `operacao/cursos/` — conteúdo dos cursos
6. Resto (infra, gestão, tools)

---

## Exemplos de uso na Real Vision

**Reunião com cliente → wiki atualizada:**
> Felipe transcreve a reunião, joga em `raw/reuniao-solarium-jun.md`, fala "ingere isso". O Claude lê, atualiza a página do Gabriel, a página de "clientes-suica", a página de "tour-360", e registra as decisões e próximos passos.

**Pesquisa de mercado → wiki aprende:**
> Felipe joga um artigo sobre precificação de tours 360° em `raw/`. O Claude ingere, cria `wiki/concepts/precificacao-tour-360.md`, conecta com os clientes que têm tour, atualiza a metodologia de proposta.

**Consulta antes de uma proposta:**
> Felipe fala "o que a wiki sabe sobre pousadas em Paraty?". O Claude varre a wiki e responde citando a campanha de prospecção, os contatos feitos, os preços praticados — tudo do que realmente aconteceu.

**Auditoria trimestral:**
> "Limpa a wiki." O Claude encontra 3 páginas órfãs, 1 contradição de preço entre dois documentos, e 5 backlinks faltando. Reporta e pede OK antes de corrigir.
