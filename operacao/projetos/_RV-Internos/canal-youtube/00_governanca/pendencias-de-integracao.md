---
status: ativo
última atualização: 2026-07-14
---

# Pendências de Integração

## MCP do YouTube — instalado, conectado e confirmado com dado real

**Status (14/07/2026): concluído.**
- [x] Documentação real lida via `gh api` — confirmado: `mrchevyceleb/youtube-mcp`, uma única ferramenta MCP `youtube` com 22 ações via parâmetro `action`. Ver `.claude/rules/operacao-youtube-mcp.md`.
- [x] Projeto no Google Cloud Console criado, APIs habilitadas, OAuth Client ID (Desktop app) gerado — feito pelo Felipe
- [x] Repositório clonado e buildado em `C:\Users\Computador\.local\mcp-servers\youtube-mcp\dist\index.js`
- [x] Vulnerabilidades de dependência corrigidas (`npm audit fix`) — sobrou 1 baixa, irrelevante
- [x] `.env` local escrito com Client ID/Secret (nunca sincroniza, protegido pelo `.gitignore` do próprio repo)
- [x] `npm run auth` rodado pelo Felipe — `tokens.json` gerado com `access_token` e `refresh_token` válidos
- [x] Servidor registrado em `.mcp.json` na raiz do projeto (não em `.claude/mcp.json`, que não é lido por este ambiente) — aponta pra um lançador (`run.cjs`) que lê o `.env` na hora, sem duplicar o secret em nenhum arquivo de config do Claude Code
- [x] **Bug real encontrado e corrigido no código do repositório**: `src/index.ts` registrava a ferramenta com `zodToJsonSchema(routerSchema) as any` como schema — formato incompatível com o que `server.tool()` espera (precisa de um ZodRawShape cru). Isso fazia o parâmetro `action` chegar como `undefined` em toda chamada. Confirmado contra o `node_modules/@modelcontextprotocol/sdk` (v1.27.1) instalado e o README oficial do SDK. Corrigido, rebuildado, testado.
- [x] Ferramenta real confirmada: `mcp__youtube__youtube`, schema completo (`action` + `params`)
- [x] Testado com chamada real de leitura (`get_channel`, `list_videos`) — retornou dado real do canal (215 inscritos, 34 vídeos, 18.269 views). Snapshot salvo em `05_metricas/baseline-do-canal.md`.
- [x] Hook `proteger-youtube-mcp.cjs` registrado em `.claude/settings.local.json` (raiz do projeto, `hooks.PreToolUse`, matcher `mcp__youtube__youtube`) — confirmado ativo na mesma sessão, sem precisar reiniciar (leitura passou normal). Ação de escrita real não foi testada contra o canal (não faz sentido arriscar só para "provar" — lógica já validada com chamadas simuladas idênticas).
- [x] Arquivo de credenciais (`youtube jeizon.json`) removido da `TEMP/` — já copiado pro `.env` do servidor.

**Esta pendência está fechada.** Próxima etapa fora do escopo técnico: decidir se as duas correções feitas no repositório clonado (schema do router + argumento de linha de comando no auth) viram um Pull Request pro `mrchevyceleb/youtube-mcp` original — isso é ação pública, precisa aprovação explícita separada antes de eu abrir.

**Nota técnica registrada:** o script interativo `npm run auth` (`src/auth-setup.ts`) foi corrigido localmente para aceitar o código de autorização como argumento de linha de comando (`npm run auth -- "codigo"`), porque o prompt interativo padrão não funcionou bem colando um código longo no PowerShell. Ambas as correções (essa e a do schema) são só no arquivo local clonado, fora do vault — considerar propor como PR pro repositório original (`mrchevyceleb/youtube-mcp`) numa decisão separada, já que é uma ação pública (Felipe precisa aprovar antes).

**Agora que o servidor está live:** qualquer ação de escrita real (upload, editar, publicar, apagar, responder comentário) só deve ocorrer seguindo a matriz de aprovações — nenhuma chamada de escrita foi feita até aqui, só leitura.

## Documento-base "O Algoritmo do YouTube Mudou"

**Status:** resolvido em 14/07/2026 — Felipe forneceu o arquivo (estava em `TEMP/`). Conteúdo incorporado em `01_pesquisas/fontes/sintese-fontes-externas.md`, classificado como fonte nível 6 (ver `fontes-e-niveis-de-confianca.md`).

## Hooks de segurança

**Status: ativo.** `.claude/hooks/proteger-youtube-mcp.cjs` registrado em `.claude/settings.local.json` (raiz do projeto) desde 14/07/2026, com aprovação do Felipe. 4 casos simulados + 1 chamada real de leitura confirmaram o comportamento esperado: leitura passa, escrita sem aprovação bloqueia, escrita com aprovação válida passa (e marca o registro como usado), exclusão com só 1 das 2 aprovações continua bloqueada.

## Público-alvo

**Status:** hipótese exploratória, não validada. Ver `02_banco-de-ideias/hipoteses-de-publico.md`.
