---
id: PRC-004
tipo: processo
pertence_a: ["[[operacao/gestao/README]]"]
atualizado_em: 2026-08-28
---

# Controle de MCPs — Real Vision 360

> Catálogo mestre de todas as ferramentas externas (MCP) conectadas ao
> Claude Code na Real Vision. Serve pra responder rápido: "isso tá
> funcionando?", "tá perto de estourar cota?", "onde foi configurado?".
> Documentação detalhada de cada uma fica na pasta/skill própria — aqui é
> só o resumo e o link.

**Regra de ouro:** nenhum número de cota é chutado. Quando não sabemos o
limite real, o campo fica "verificar no painel de [serviço]" em vez de um
número inventado.

**Legenda de status:** ✅ ativo e testado · 🟡 ativo mas com pendência ·
🔴 com problema conhecido · ⚪ conectado, sem documentação própria ainda

---

## Ambiente (PC do Felipe — Desktop)

> Contexto de máquina que qualquer instalação nova (MCP, plugin, skill, API)
> precisa considerar antes de sugerir um comando. Atualizar só quando algo
> mudar de verdade (troca de PC, upgrade de SO, etc) — não é pra virar lista
> de versões efêmeras de pacotes.

| Item | Valor | Observação |
|---|---|---|
| Sistema operacional | Windows 10 Home 10.0.19045 | |
| Claude Code | **Desktop App** (não é o CLI standalone) | Instalado em `AppData\Local\Claude` + `AppData\Roaming\Claude`. **Não expõe o comando `claude` no PATH do terminal** — comandos tipo `claude plugin install` ou `claude mcp add` não funcionam direto no cmd/PowerShell aqui. Ver nota abaixo. |
| Node.js | v24.15.0, em `C:\Program Files\nodejs\node.exe` | Instalado globalmente, fora do escopo do Desktop App |
| npm global | `C:\Users\Computador\AppData\Roaming\npm` | Sem pacotes Claude instalados aqui (verificado 22/07/2026) |
| Config de MCPs locais | `.mcp.json` na raiz de cada projeto | Ver seção "Onde cada tipo de MCP é configurado" abaixo |
| gcloud CLI | Instalado (pra Google Ads MCP) | ADC em `C:\Users\Computador\.config\gcloud\` |

**Nota — CLI vs Desktop App:** se algo pedir pra rodar `claude <comando>`
no terminal (marketplace de plugin, `claude mcp add`, etc), primeiro checar
se o Desktop App tem equivalente na própria interface (Configurações/
Conectores). Só instalar o CLI standalone via
`npm install -g @anthropic-ai/claude-code` com aprovação explícita do
Felipe — os dois podem conviver, mas é uma instalação a mais pra manter.

## Ferramentas de pesquisa web

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| SearXNG | Busca privada (agrega Google/Bing/DuckDuckGo) | ✅ Ativo | Sem limite — roda local via Docker | [`mcp-pesquisa-web/searxng/`](mcp-pesquisa-web/searxng/README.md) |
| Firecrawl | Lê o conteúdo completo de uma página (scraping) | ✅ Ativo | firecrawl.dev → Dashboard → Usage (créditos por chamada) | [`mcp-pesquisa-web/firecrawl/`](mcp-pesquisa-web/firecrawl/README.md) |
| Google Maps | Dados de negócios locais (endereço, telefone, nota, avaliações) | ✅ Ativo e testado (27/07/2026) — quebrou entre 20/07 e 27/07 por faltar Geocoding/Directions/etc habilitadas no projeto Cloud, corrigido | console.cloud.google.com → APIs e Serviços → Painel (projeto `proven-airship-503011-u9`) | [`mcp-pesquisa-web/google-maps/`](mcp-pesquisa-web/google-maps/README.md) |

## Automação de navegador

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| Playwright | Abre um navegador de verdade: navega, clica, preenche formulário, tira print, lê erros do site | ✅ Ativo e testado (07/08/2026) | Sem cota — roda 100% local, sem chave de API, custo zero | [`mcp-playwright/`](mcp-playwright/README.md) |

## Dados internos

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| Supabase | Banco de dados (VisionFlow e outros projetos) | ✅ Ativo | Painel do Supabase → Project → Usage | Skill [`rv-incidente-supabase`](../../../skills/rv-incidente-supabase/SKILL.md) — já cobre diagnóstico de status/outage/cota |

## Marketing e prospecção

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| Google Ads | Consultar e gerenciar campanhas de anúncio | ✅ Voltou a funcionar (testado 27/07/2026) — token que estava expirado (21/07) foi resolvido | Painel do Google Ads | Só na memória do Claude Code por enquanto — sem doc no vault ainda |
| Google Analytics | Relatórios e métricas do site | ⚪ Conectado | Painel do GA4 | Sem doc própria ainda |
| Apollo.io / Vibe Prospecting | Prospecção de leads B2B | ⚪ Conectado | Painel da Apollo.io → Uso/Créditos | Sem doc própria ainda |

## Produtividade

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| Gmail | Ler e criar rascunho de email | ⚪ Conectado | Não tem cota relevante (uso normal de conta Google) | Sem doc própria ainda |
| Google Calendar | Consultar e criar eventos de agenda | ⚪ Conectado | Não tem cota relevante | Sem doc própria ainda |

## Sites e mídia

| MCP | Pra que serve | Status | Onde checar cota/uso | Documentação |
|---|---|---|---|---|
| Wix | Gerenciar sites de clientes hospedados no Wix | ⚪ Conectado | Painel da Wix | Sem doc própria ainda |
| Canva | Criar/editar artes e designs | ⚪ Conectado | Painel da Canva → Uso | Sem doc própria ainda |
| Higgsfield | Geração de imagem/vídeo/áudio/voz por IA | ⚪ Conectado | Painel da Higgsfield → Créditos | Sem doc própria ainda |
| YouTube | Consultar dados/vídeos do canal | ⚪ Conectado | — | Sem doc própria ainda |

---

## Onde cada tipo de MCP é configurado

- **Ferramentas de pesquisa web** (SearXNG, Firecrawl, Google Maps) e outras
  locais (YouTube): registradas no `.mcp.json` na raiz do projeto — precisa
  reconfigurar se for usar em outro repositório.
- **As demais** (Gmail, Calendar, Supabase, Analytics, Wix, Canva, Apollo,
  Higgsfield): conectores de conta/plataforma do Claude Code, não aparecem
  no `.mcp.json`.
- **Exceção: Google Ads.** Diferente do grupo acima, está registrado como
  servidor local em `C:\Users\Computador\.mcp.json` (binário
  `google-ads-mcp.exe`), autenticado via Google Cloud ADC — não é conector
  de conta do Claude Code.

## Google Ads MCP — autenticação (nota técnica, 21/07/2026)

O MCP roda local e usa `GOOGLE_APPLICATION_CREDENTIALS` apontando pra
`C:\Users\Computador\.config\gcloud\application_default_credentials.json`
(ADC do gcloud). Esse token expirou em 21/07/2026 ("Token has been expired
or revoked") e a renovação exigiu mais passos do que o esperado:

1. **gcloud CLI não estava instalado** neste PC — precisou instalar (Felipe
   baixou/instalou manualmente pelo instalador oficial do Google).
2. `gcloud auth application-default login` sozinho **não é suficiente**: o
   escopo `https://www.googleapis.com/auth/adwords` está sendo bloqueado
   pelo Google pro client ID genérico do gcloud CLI ("Este app está
   bloqueado"). É obrigatório usar um **OAuth Client ID próprio** (tipo
   Desktop app) criado no projeto `real-vision-ads-mcp` do Google Cloud
   Console, e passar `--client-id-file=<caminho do client secret>` no
   comando de login.
3. Client secret próprio salvo em:
   `C:\Users\Computador\.config\gcloud\google-ads-oauth-client.json`
   (fora do vault — nunca deixar em `TEMP/`, é segredo).
4. **Pendência:** mesmo com o client próprio, a última tentativa ainda
   voltou com `ACCESS_TOKEN_SCOPE_INSUFFICIENT` — o login parece ter caído
   de novo no fluxo do client genérico em vez do `.bat` com
   `--client-id-file`. Precisa repetir o login lendo com calma a janela
   preta do `.bat` até o fim (ela tem `pause`, não fecha sozinha) antes de
   considerar resolvido.
5. Script pronto pra repetir o login (duplo-clique):
   `C:\Users\Computador\Desktop\login-google-ads.bat`

## Quando uma ferramenta "⚪ sem documentação" for usada de verdade

Segue o padrão da pasta [`mcp-pesquisa-web/`](mcp-pesquisa-web/README.md):
criar uma subpasta com README próprio (O que é → Status → Cota/risco →
Registro → Quando usar → Instalado em) e atualizar a linha dela nesta
tabela. Ver skill `rv-mcp-controle` pra esse processo automático.
