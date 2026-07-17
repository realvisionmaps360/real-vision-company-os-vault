---
status: ativo
---

# Registro de Decisões

## 2026-07-14 — MCP do YouTube: Opção 1 escolhida, ainda não instalada
**Decisão:** quando o MCP do YouTube for instalado, será a Opção 1 (`mrchevyceleb/youtube-mcp`, OAuth2, 22 ferramentas, gestão completa). Hooks de segurança serão desenhados para essa nomenclatura de ferramenta.
**Quem decidiu:** Felipe
**Impacto:** todas as skills que dependem de escrita no canal ficam bloqueadas até a instalação + teste dos hooks.

## 2026-07-14 — Fontes de terceiro adotadas como playbook tático
**Decisão:** o material "O Algoritmo do YouTube Mudou" + os 3 vídeos do MrBeast são adotados como playbook tático a implementar desde o primeiro vídeo, mesmo sendo fonte nível 6 (opinião de terceiro, não confirmada oficialmente).
**Quem decidiu:** Felipe ("esse cara que fez esse vídeo é uma autoridade no youtube")
**Impacto:** táticas específicas (onda de momento, microrredirecionamento, timing, autoridade temática, satisfação do espectador, regra dos 100) entram como critério de checklist de publicação. Ver `01_pesquisas/fontes/sintese-fontes-externas.md`.

## 2026-07-14 — Implantação do Sistema Operacional do Canal aprovada
**Decisão:** estrutura completa de pastas, governança, regras e skills aprovada e implantada.
**Quem decidiu:** Felipe ("aprovado")
**Impacto:** ver `00_governanca/` para todos os documentos criados nesta rodada.

## 2026-07-14 — MCP do YouTube instalado e autorizado
**Decisão/execução:** servidor `mrchevyceleb/youtube-mcp` clonado, buildado e autorizado (OAuth2 concluído pelo Felipe, `tokens.json` gerado) em `C:\Users\Computador\.local\mcp-servers\youtube-mcp`.
**Quem decidiu/executou:** Felipe (credenciais e login OAuth) + Claude Code (clone, build, config)
**Correção de rota:** a leitura da documentação real revelou que o servidor expõe 1 ferramenta MCP (`youtube`) com 22 ações via parâmetro `action`, não 22 ferramentas separadas como se supunha antes de instalar — hook e regras já corrigidos para esse formato.
**Impacto:** falta reiniciar a sessão do Claude Code para o servidor conectar, inventariar a ferramenta real, testar o hook contra ela, e pedir aprovação separada para ativar o hook em `.claude/settings.json`.

## 2026-07-14 — MCP conectado, bug real corrigido, confirmado com dado do canal
**Decisão/execução:** primeira tentativa de conexão falhou porque o servidor foi registrado em `.claude/mcp.json` (arquivo que este ambiente não lê) — corrigido para `.mcp.json` na raiz do projeto, usando um lançador (`run.cjs`) que lê o `.env` local em vez de duplicar o Client ID/Secret em qualquer config do Claude Code (ajuste feito depois que o classificador de permissão bloqueou duas tentativas de gravar o segredo em arquivos sem consentimento explícito para aquele arquivo específico — bloqueio correto).

Na reconexão, a ferramenta apareceu mas toda chamada retornava "Unknown action: undefined". Investigação no código-fonte real (não suposição) achou a causa: `src/index.ts` registrava a ferramenta passando `zodToJsonSchema(routerSchema) as any` como schema, formato incompatível com o que `server.tool()` do SDK realmente espera (confirmado no `node_modules/@modelcontextprotocol/sdk` v1.27.1 instalado e no README oficial do `modelcontextprotocol/typescript-sdk`). Corrigido localmente, rebuildado, testado com chamada real (`get_channel`) — retornou dado real do canal.
**Quem decidiu/executou:** Claude Code (diagnóstico e correção, a pedido do Felipe pra parar de adivinhar e checar fonte oficial)
**Impacto:** MCP 100% funcional para leitura. Primeiro snapshot salvo em `05_metricas/baseline-do-canal.md` (215 inscritos, 34 vídeos, 18.269 views). Pendência ativa de prioridade alta: hook de bloqueio ainda não registrado em `.claude/settings.json` — nenhuma barreira técnica existe hoje contra uma chamada de escrita real, só o julgamento de quem opera a sessão.
**Pendência derivada:** avaliar propor as duas correções (schema do router + argumento de linha de comando no auth) como PR pro repositório original `mrchevyceleb/youtube-mcp` — ação pública, precisa aprovação explícita separada antes de abrir.

## 2026-07-14 — Hook de segurança ativado
**Decisão:** ativar o hook `proteger-youtube-mcp.cjs` em `.claude/settings.local.json` (raiz do projeto), bloqueando por padrão qualquer ação de escrita do YouTube MCP sem registro de aprovação correspondente em `00_governanca/aprovacoes/`.
**Quem decidiu:** Felipe ("Sim, ativa agora")
**Impacto:** confirmado ativo na mesma sessão (chamada de leitura passou normal, sem precisar reiniciar). Nenhuma chamada de escrita foi testada contra o canal real — desnecessário e arriscado, a lógica já tinha sido validada com simulação idêntica. Arquivo de credenciais removido da `TEMP/` no mesmo momento, por aprovação também.
