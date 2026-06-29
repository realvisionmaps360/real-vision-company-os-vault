---
title: Guia das Skills Obsidian — Real Vision
tags:
  - obsidian
  - skills
  - referencia
date: 2026-06-29
---

# Guia das Skills Obsidian — Real Vision 360

> Documento de referência das 4 skills do repositório kepano/obsidian-skills instaladas no Claude Code da Real Vision.
> Criado em 29/06/2026. Ver também: [[README]] · [[PROTOCOLO-Sessao-Contexto]]

---

## Visão geral

| Skill | O que faz | Quando usar |
|---|---|---|
| `obsidian-markdown` | Escreve notas no formato do Obsidian | Toda vez que criar/editar um `.md` |
| `obsidian-cli` | Controla o Obsidian pelo terminal | Início de sessão, leitura de fichas, automações |
| `obsidian-bases` | Cria views de banco de dados dentro do Obsidian | Dashboards de clientes, tarefas, projetos |
| `defuddle` | Extrai conteúdo limpo de páginas da web | Pesquisa de concorrentes, artigos, referências |

---

## 1. obsidian-markdown

### O que é
Guia de toda a sintaxe especial que o Obsidian adiciona ao Markdown comum. O Obsidian vai além do texto simples: ele tem links internos que se atualizam sozinhos, caixas coloridas de aviso, propriedades de busca e muito mais.

### Principais funções

**Wikilinks** — links entre notas que o Obsidian rastreia automaticamente:
```
[[Nome da Nota]]              → abre a nota
[[Nome da Nota|Texto]]        → abre com texto diferente
[[Nome da Nota#Seção]]        → abre direto numa seção
```

**Callouts** — caixas destacadas visualmente:
```
> [!danger] Produção ativa
> Nunca publicar sem OK do Felipe.

> [!todo] Pendências
> - [ ] Tarefa 1
> - [ ] Tarefa 2
```
Tipos disponíveis: `note`, `tip`, `warning`, `danger`, `todo`, `info`, `example`, `quote`

**Frontmatter** — metadados invisíveis no topo do arquivo:
```yaml
---
status: ativo
servicos: [site, tour-360]
tags: [cliente, suica]
---
```

**Highlights** — marca texto em amarelo no modo leitura:
```
Reunião com o cliente em ==29/06/2026==
Preço fechado: ==R$ 1.500==
```

### Como se aplica na Real Vision hoje

- **Fichas de cliente** (`FICHA-CLIENTE.md`): frontmatter com status e serviços → filtrável em views `.base`
- **Dossiês de projeto**: callouts `[!danger]` para avisos de produção, `[!todo]` para pendências organizadas por área
- **Documentação interna** (PROTOCOLO, GUIAS): wikilinks conectam os documentos sem precisar de pastas manuais
- O documento `SUNBITE-PROJETO.md` já foi atualizado com todos esses recursos como exemplo

---

## 2. obsidian-cli

### O que é
Uma ferramenta de terminal que permite ao Claude controlar o Obsidian enquanto ele está aberto. Em vez de só ler e escrever arquivos `.md`, o Claude consegue interagir com o Obsidian como se estivesse usando o aplicativo.

> **Requisito:** Obsidian 1.12.7+ com "Interface de linha de comando" ativada em Configurações → Sobre → Avançado.
> Verificar instalação: `obsidian version` (deve retornar `1.12.7`)

### Principais funções

**Leitura de notas:**
```bash
obsidian read file="FICHA-CLIENTE"
obsidian read path="operacao/clientes/arquivos/Sunbite/FICHA-CLIENTE.md"
```

**Criação e edição:**
```bash
obsidian create name="Nova Nota" content="# Título" silent
obsidian append file="SUNBITE-TIMELINE" content="- 29/06: reunião de briefing"
```

**Busca na vault:**
```bash
obsidian search query="Grand Opening" limit=10
obsidian tags sort=count counts
```

**Tarefas:**
```bash
obsidian tasks daily todo          # tarefas de hoje
obsidian tasks file="SUNBITE-PROJETO" todo   # tarefas de um cliente
```

**Propriedades:**
```bash
obsidian property:set name="status" value="entregue" file="SUNBITE-PROJETO"
```

### Como se aplica na Real Vision hoje

**Protocolo de início de sessão** — quando Felipe diz "vamos trabalhar com [Cliente]", o Claude executa:
```bash
obsidian read path="operacao/clientes/arquivos/[Cliente]/FICHA-CLIENTE.md" vault="Real Vision"
```
E carrega automaticamente: quem é o cliente, o que foi entregue, próximos passos.

**Protocolo de fim de sessão** — ao encerrar, atualiza a ficha:
```bash
obsidian append file="FICHA-CLIENTE" content="## Sessão 29/06\n- [resultado]"
```

**Busca de contexto** — encontrar informações sem abrir o Obsidian:
```bash
obsidian search query="token GitHub" limit=5
```

> Protocolo completo em [[PROTOCOLO-Sessao-Contexto]]

---

## 3. obsidian-bases

### O que é
Permite criar arquivos `.base` dentro da vault — views de banco de dados que leem as propriedades (frontmatter) dos arquivos `.md` e montam tabelas, cards ou listas filtradas e ordenadas. É como ter uma planilha que se atualiza automaticamente conforme você edita os arquivos de cliente.

### Principais funções

**Filtros** — quais notas aparecem na view:
```yaml
filters:
  and:
    - file.hasTag("cliente")
    - 'status == "ativo"'
```

**Views** — como os dados são exibidos:
- `table` — tabela com colunas
- `cards` — galeria de cards
- `list` — lista simples

**Fórmulas** — campos calculados:
```yaml
formulas:
  dias_cliente: '(now() - file.ctime).days.round(0)'
```

**Agrupamento e ordenação:**
```yaml
groupBy:
  property: status
  direction: ASC
```

### Como se aplica na Real Vision — o que criar

**`CLIENTES-ATIVOS.base`** — dashboard de todos os clientes ativos:
- Filtro: `status == "ativo"`
- Colunas: nome, serviços contratados, data de início, dias como cliente
- Agrupado por: serviço principal

**`PENDENCIAS.base`** — todas as tarefas abertas de todos os clientes:
- Filtro: `file.hasTag("cliente")`
- Mostra os arquivos com mais tarefas abertas

**`PROJETOS-STATUS.base`** — visão geral de todos os projetos:
- Filtro: `file.hasTag("projeto")`
- Colunas: status, deploy URL, data de entrega

> **Custo:** criar um `.base` é barato (< 1% de contexto, arquivo de ~40 linhas YAML). Pode ser feito a qualquer momento.

---

## 4. defuddle

### O que é
Ferramenta de terminal que extrai o conteúdo limpo de qualquer página da web — remove menus, propagandas, rodapés e deixa só o texto que importa, em formato Markdown. Funciona melhor que o WebFetch para páginas de artigos, documentações e blogs.

> **Requisito:** `npm install -g defuddle` (instalado via npm)
> Verificar: `defuddle --version`

### Principais funções

**Extrair conteúdo de URL:**
```bash
defuddle parse https://exemplo.com/artigo --md
```

**Salvar em arquivo:**
```bash
defuddle parse https://exemplo.com/artigo --md -o referencia.md
```

**Extrair metadados:**
```bash
defuddle parse https://exemplo.com -p title
defuddle parse https://exemplo.com -p description
```

### Como se aplica na Real Vision hoje

**Pesquisa de concorrentes** — quando Felipe manda uma URL de concorrente para analisar, o Claude usa o defuddle em vez do WebFetch e recebe o conteúdo limpo, economizando tokens.

**Referências de copy** — salvar artigos de marketing, páginas de inspiração como `.md` direto na vault:
```bash
defuddle parse https://referencia.com --md -o operacao/referencias/artigo.md
```

**Documentação técnica** — ler docs de ferramentas (Vercel, Supabase, Pano2VR) sem ruído de interface.

**Quando NÃO usar:** URLs terminando em `.md` (já são markdown, usar WebFetch direto) e páginas protegidas por login.

---

## Quando usar cada uma

| Situação | Skill |
|---|---|
| Criar ou editar qualquer `.md` na vault | `obsidian-markdown` |
| Iniciar sessão de cliente | `obsidian-cli` (lê a FICHA-CLIENTE) |
| Encerrar sessão de cliente | `obsidian-cli` (atualiza FICHA + TIMELINE) |
| Felipe manda uma URL pra analisar | `defuddle` |
| Pesquisar algo na vault sem abrir o Obsidian | `obsidian-cli` |
| Criar dashboard de clientes/projetos | `obsidian-bases` |
| Criar mapa visual de projeto | `json-canvas` (não coberto neste guia) |

---

## Próximos passos sugeridos

- [ ] Criar `CLIENTES-ATIVOS.base` com view de todos os clientes ativos
- [ ] Instalar defuddle: `npm install -g defuddle` e testar com uma URL de concorrente
- [ ] Aplicar o formato OFM (`obsidian-markdown`) nos demais dossiês de clientes ativos
- [ ] Configurar o protocolo de início de sessão na prática: testar `obsidian read` com um cliente

> Este guia é um documento vivo — atualizar sempre que uma skill for modificada ou um novo uso for descoberto.
