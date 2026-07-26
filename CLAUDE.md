@AGENTS.md

## Claude Code — Específico Desta Ferramenta

Todas as regras, tom, workflows e convenções da Real Vision estão em [`AGENTS.md`](AGENTS.md), importado acima — é a fonte única, lida também pelo Hermes Agent. Esta seção cobre só o que é específico de rodar em **Claude Code** (não se aplica ao Hermes, que tem seu próprio ecossistema de ferramentas e skills).

### Acesso a Ferramentas Externas (MCP)
O acesso muda conforme o ambiente/sessão — **verifique o que está disponível antes de dizer que algo não é possível.** Hoje, dependendo da sessão, pode haver acesso via MCP a: GitHub, Google Workspace (Gmail, Calendar), Supabase, Wix, Higgsfield (imagem/vídeo/áudio/voz), Canva, Apollo.io e Vibe Prospecting (leads), além de busca e leitura web (WebSearch/WebFetch).

- **Se uma ferramenta que deveria estar disponível não aparecer**, avise em vez de assumir que "não tenho acesso" — pode ser instabilidade momentânea do servidor MCP, não ausência real de acesso.
- **Links `docs.google.com` ou `drive.google.com` privados** só funcionam se houver conector Google Workspace ativo na sessão; se não houver, peça o texto colado ou o arquivo.

### Skills: vault (`skills/`) vs Hermes (`~/.hermes/skills/`)
Duas fontes distintas — não confundir:
- **`skills/` no vault** (este repositório) — skills do Claude Code, carregadas automaticamente pelo ambiente onde o vault está aberto. Ver seção 4 do `AGENTS.md` para os principais workflows.
- **`~/.hermes/skills/` no VPS** — skills locais do Hermes Agent (Thomas Anderson), não visíveis a partir do vault nem do Claude Code. Se precisar confirmar o que existe lá, pergunte ao Felipe ou rode `hermes skills list` na sessão do Hermes.

### `rv-skill-scout` — Ativação Automática, Sem Precisar Pedir
O raciocínio de `skills/rv-skill-scout/SKILL.md` roda **por padrão em toda tarefa nova**, não só quando alguém lembra de chamar ou quando há dúvida sobre qual skill usar. Felipe não deve precisar pedir "roda o skill scout" — isso acontece sozinho, antes de qualquer leitura de arquivo, edição ou resposta de execução.

- **Antes de começar a executar**, rodar mentalmente o mapeamento do `rv-skill-scout` e mostrar na tela, em poucas linhas, quais skills estão ativas e por quê (formato já definido na skill: `Skills ativas para essa tarefa: • nome — motivo breve`).
- **Tarefas triviais** (corrigir typo, responder dúvida pontual, renomear variável) seguem podendo pular esse aviso — overhead maior que o benefício, como já previsto na própria skill.
- **Perguntas puramente conversacionais** (sem execução de tarefa) também não precisam do aviso.
- Isso não substitui os demais gatilhos do `rv-skill-scout` (detecção de skill nova, sugestão de virar skill) — só torna o aviso inicial automático em vez de sob demanda.

---

> Versão: 3.0 — Julho 2026. Consolidado com `AGENTS.md` para eliminar duplicação entre Claude Code e Hermes (os dois liam versões ligeiramente diferentes das mesmas regras, o que causava desalinhamento). `AGENTS.md` agora é a fonte única — este arquivo só importa e complementa.
