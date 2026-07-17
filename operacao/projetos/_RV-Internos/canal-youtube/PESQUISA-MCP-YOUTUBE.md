---
título: Estruturação inicial — Canal do YouTube da Real Vision
status: em planejamento / pesquisa
início: 2026-07-13
---

# Objetivo

Definir como conectar o canal do YouTube da Real Vision ao Claude Code, para apoiar a criação e gestão de conteúdo do canal (novo projeto ainda em estruturação).

Canal atual da Real Vision: https://www.youtube.com/@RealVisionMaps

# Pesquisa feita (13/07/2026)

Não existe integração oficial da Anthropic para YouTube. O que existe são **servidores MCP** (protocolo criado pela Anthropic) feitos pela comunidade, conectados ao Claude Code via `claude mcp add`.

## Opção 1 — Gestão completa do canal (upload, editar, responder comentários)
Repositório: [mrchevyceleb/youtube-mcp](https://github.com/mrchevyceleb/youtube-mcp)
- 22 ferramentas, feito especificamente para Claude Code/Cursor
- Exige OAuth2 (login Google da conta dona do canal) + criar credenciais no Google Cloud Console (Client ID/Secret)
- Permite: listar/editar vídeos, subir vídeo, mexer em thumbnail, criar/editar playlist, responder e apagar comentários, ver analytics (visualizações, retenção, top vídeos)
- Setup mais trabalhoso, mas dá acesso de escrita real ao canal

## Opção 2 — Só consultar dados (sem escrever nada)
Repositório: [ZubeidHendricks/youtube-mcp-server](https://github.com/ZubeidHendricks/youtube-mcp-server)
- 10 ferramentas, só leitura
- Exige só uma API Key do YouTube Data API v3 (bem mais simples que OAuth — sem login, sem permissão de escrita)
- Permite: buscar vídeos, pegar transcript/legenda, ver detalhes de canal, listar vídeos de um canal, ver playlists
- Ideal para: analisar concorrentes, puxar transcript de vídeo pra virar blog post (rv-blogpost), pesquisar tendências

## Opção 3 — Via Composio (gerenciado, sem clonar repo)
[Composio YouTube MCP](https://composio.dev/toolkits/youtube/framework/claude-code)
- Composio gera uma URL de MCP hospedada; conecta com `claude mcp add --transport http`
- Mais fácil (não precisa mexer em Google Cloud Console), mas depende de terceiro (Composio) ter acesso à conta

# Recomendação (ainda não decidida)

Opção 2 (só leitura, API Key) é a mais simples pra começar — resolve puxar transcript de vídeo pra virar blog post, analisar performance, pesquisar conteúdo de concorrentes. Opção 1 só vale a pena se quisermos o Claude Code postando/editando vídeos e respondendo comentários direto — nesse caso, cada ação de escrita (postar comentário, subir vídeo) deve pedir confirmação, nunca automático.

# Decisões tomadas

_(ainda nenhuma — Felipe está pesquisando e vai estruturar aqui)_

# Próximos passos

- [ ] Definir objetivo do canal/projeto (o que o canal vai fazer, público, formato de vídeo)
- [ ] Decidir qual opção de MCP usar (ou nenhuma, por enquanto)
- [ ] Se Opção 1 ou 2: criar projeto no Google Cloud Console e gerar credenciais
