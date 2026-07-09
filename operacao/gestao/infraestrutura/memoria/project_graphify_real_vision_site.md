---
name: project-graphify-real-vision-site
description: "Graphify instalado no repo do site da Real Vision — grafo de código pronto, mas precisa atualização manual (hook de git não instalado)"
metadata: 
  node_type: memory
  type: project
  originSessionId: ae071865-ce21-4749-97e8-25887f85f745
---

Instalado em 02/07/2026 no repo do site (`operacao/projetos/_RV-Internos/real-vision-site` — não `operacao/projetos/real-vision-site`, esse caminho foi corrigido no CLAUDE.md global). Graphify é ferramenta CLI/MCP (não skill do Claude Code) que extrai o código em um grafo de conhecimento (`graphify-out/graph.json`) para eu consultar em vez de ler o repo inteiro toda vez.

**Estado atual:**
- Grafo gerado: 910 nós, 1292 arestas, 85 comunidades (`graphify-out/graph.json`)
- Integração com Claude Code ativa (`graphify claude install` rodado) — seção adicionada ao `CLAUDE.md` do projeto + hook PreToolUse em `.claude/settings.json` que me lembra de consultar o grafo antes de mexer no código
- **Hook de git NÃO instalado** (`graphify hook install` foi bloqueado pelo classificador de segurança do Claude Code por criar execução persistente via post-commit/post-checkout; Felipe não confirmou explicitamente esse passo)

**Pendência — atualização manual do grafo:** como não há hook automático, o grafo fica desatualizado conforme o código muda. Antes de sessões de trabalho pesado nesse repo, rodar:
```
cd operacao/projetos/_RV-Internos/real-vision-site
graphify update .
```
(não precisa de API key para `update` — só `extract` inicial e `label`/`cluster-only` com nomeação de comunidades via LLM precisam.)

**Detalhes técnicos do ambiente:**
- Instalado via pipx, mas o nome do venv é `graphifyy` (dois "y"), não `graphify` — para injetar dependências: `pipx inject graphifyy <pacote>`
- Backend usado: `claude` (precisa de `ANTHROPIC_API_KEY` — Felipe usa a chave da conta de API dele, não a assinatura do Claude Code)
- Dois arquivos de imagem no repo têm extensão errada (`.jpg` mas são PNG por dentro): `src/assets/blog-fotografia-profissional.jpg` e `src/assets/blog-site-cover.jpg` — causam falha na extração semântica de imagens (não afeta a extração de código). Não foram renomeados para não arriscar quebrar imports no build.

**Custo:** extração inicial custou ~$0.58 (chave de API própria do Felipe, $5 de crédito).

Ver também [[project_repos_estrutura]] para estrutura geral de repos.
