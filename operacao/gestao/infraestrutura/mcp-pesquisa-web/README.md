# MCPs de Pesquisa Web — Real Vision

> Pasta guarda-chuva para os MCPs (Model Context Protocol) que dão ao Claude Code
> acesso a busca e coleta de dados na internet, sem depender só das ferramentas
> nativas (WebSearch/WebFetch). Cada ferramenta fica documentada na sua própria
> subpasta.

## Por que isso existe

A partir de 20/07/2026, Felipe decidiu montar um conjunto próprio de
ferramentas de pesquisa/coleta web pra uso recorrente — prospecção, pesquisa
de intenção de busca, varreduras de conteúdo, mapeamento de concorrência. São
processos que vão se repetir com frequência tanto internamente na Real Vision
quanto em entregas pra clientes, e também viram conteúdo do curso (Real Vision
Academy) — por isso mapeados aqui como processo, não só como configuração
técnica solta.

## Ferramentas instaladas

| Ferramenta | O que faz | Status | Pasta |
|---|---|---|---|
| **SearXNG** | Motor de metabusca privado (agrega Google/Bing/DuckDuckGo etc, sem rastreamento) | ✅ Ativo desde 20/07/2026 | [`searxng/`](searxng/README.md) |
| **Firecrawl** | Converte páginas web em Markdown limpo pra IA ler (scraping) | ✅ Ativo desde 20/07/2026 (plano cloud) | [`firecrawl/`](firecrawl/README.md) |
| **Google Maps** | Busca/dados de negócios locais direto do Google Maps | ✅ Ativo desde 20/07/2026 (testado) | [`google-maps/`](google-maps/README.md) |

## Onde a configuração real vive

Os MCPs são registrados no arquivo `.mcp.json` na raiz do projeto onde o
Claude Code está rodando (ex: `Desktop\Real Vision\.mcp.json`). Esse arquivo
**não** é o mesmo em todo projeto — se for usar essas ferramentas em outro
repositório (ex: `visionflow`), precisa registrar de novo lá.

`.mcp.json` está no `.gitignore` do vault (contém API keys em texto puro) —
por isso as chaves nunca aparecem aqui na documentação, só instruções de como
reconfigurar caso precise.

## Quando usar cada um

- **Precisa de uma lista/pesquisa de algo na web** (leads, concorrência,
  informação geral) → SearXNG
- **Precisa ler o conteúdo completo de uma página específica** (site de
  cliente, concorrente, artigo) → Firecrawl
- **Precisa de dados de negócios locais** (endereço, avaliação, horário) →
  Google Maps (quando instalado)

## Faz parte de um controle maior

Esta pasta cobre só as ferramentas de pesquisa web. O catálogo com **todos**
os MCPs conectados na Real Vision (Supabase, Google Ads, Gmail, Canva, Wix
etc.) fica em
[`../CONTROLE-MCPS.md`](../CONTROLE-MCPS.md).

## Relevância para o curso

Esse processo de "montar sua própria infraestrutura de pesquisa com IA" é
material direto pro curso — mostra como sair da dependência de ferramentas
pagas/limitadas e construir capacidade própria. Ver `operacao/cursos/` pra
onde esse conteúdo deve entrar quando for roteirizado.
