---
name: rv-mcp-controle
description: Meta-skill que mantém o controle de tudo que é instalado no ambiente Real Vision — MCPs (ferramentas externas conectadas), plugins do Claude Code, skills novas e APIs — status, cota/limite de uso, e onde cada um está documentado. Também guarda o perfil de ambiente da máquina (SO, Desktop App vs CLI, Node) pra qualquer instalação nova já começar sabendo como esse PC funciona. Use quando conectar/instalar algo novo (MCP, plugin, skill, API), quando Felipe perguntar se algo está funcionando ou perto de estourar cota, ou no início de sessões que mexem em infraestrutura/conectores.
---

# RV MCP Controle — Guardião dos Conectores e Instalações

Mantém vivo o catálogo de tudo que é conectado ou instalado no ambiente da
Real Vision — MCPs, plugins do Claude Code, skills, APIs — pra nunca perder
o controle do que está ativo, qual tem risco de cota, e onde cada coisa foi
configurada. Mesmo espírito da `rv-skill-scout`, mas para instalações em
geral, não só skills locais.

**Antes de qualquer instalação nova, checar a seção "Ambiente" no
`CONTROLE-MCPS.md`** — ela diz se o Claude Code aqui é Desktop App ou CLI,
qual SO, e outras informações que mudam o comando certo a usar (ex: o
Desktop App não expõe `claude` no PATH do terminal).

## Onde vive tudo

- **Catálogo mestre (MCPs + ambiente, resumo):**
  `operacao/gestao/infraestrutura/CONTROLE-MCPS.md` — inclui a seção
  "Ambiente" com SO, tipo de instalação do Claude Code, Node, etc.
- **Documentação detalhada das ferramentas de pesquisa web:**
  `operacao/gestao/infraestrutura/mcp-pesquisa-web/` (uma subpasta por
  ferramenta)
- **Configuração real dos MCPs locais:** `.mcp.json` na raiz de cada projeto
  (contém chave de API — nunca copiar o valor da chave pra dentro da
  documentação)
- **Plugins do Claude Code:** não têm catálogo próprio ainda — quando o
  primeiro for instalado de fato, criar seção "Plugins" nesta skill e no
  `CONTROLE-MCPS.md` seguindo o mesmo padrão de tabela usado para os MCPs
- **Skills locais novas:** continuam sob responsabilidade da
  `rv-skill-scout` (mapeamento) — esta skill só entra se a skill nova
  depender de um MCP/plugin/API externo

## Template padrão pra documentar um MCP

Toda subpasta de MCP segue esta ordem de seções:

1. **O que é** — em uma frase, sem jargão
2. **Status** — ✅ ativo e testado / 🟡 ativo com pendência / 🔴 com problema
3. **Cota / risco de limite** — onde checar uso real; nunca inventar número
4. **Registro no Claude Code** — trecho do `.mcp.json` (se for local),
   chave sempre oculta
5. **Quando usar** — casos de uso concretos
6. **Instalado em** — data + link de volta pro guarda-chuva/catálogo

## Regra central

Um MCP só é considerado "pronto" depois de: (1) testado com um caso real,
não só configurado; (2) documentado no padrão acima; (3) com uma linha
atualizada no `CONTROLE-MCPS.md`.

## Gatilho — MCP novo conectado (automático, sem Felipe precisar pedir)

Sempre que um MCP novo for registrado ou testado pela primeira vez:

1. Testar com um caso de uso real (não só confirmar que "carregou")
2. Criar ou atualizar o README da ferramenta seguindo o template acima
3. Atualizar a linha correspondente no `CONTROLE-MCPS.md` (criar categoria
   nova na tabela se for um tipo de ferramenta que ainda não existe lá)
4. Avisar Felipe em linguagem simples, sem jargão técnico — o que a
   ferramenta faz, se está funcionando, e se tem algum cuidado de custo/cota

## Quando usar esta skill

- Felipe pede pra conectar/instalar um MCP, plugin, skill dependente de API
  externa, ou qualquer ferramenta nova
- Felipe pergunta "isso tá funcionando?", "a chave tá boa?", "tá perto do
  limite?" sobre qualquer ferramenta externa
- Início de sessão que vai mexer em infraestrutura, `.mcp.json`, ou
  conectores de conta
- Antes de sugerir qualquer comando de terminal pra instalar algo —
  checar primeiro a seção "Ambiente" pra saber se o comando faz sentido
  neste PC (ex: Desktop App vs CLI standalone)

## Regras de ouro

- **Nunca inventar número de cota ou limite.** Se não souber o valor real,
  o campo fica "verificar no painel de [serviço]"
- **Nunca duplicar documentação que já existe em outro lugar** (ex:
  Supabase já tem a skill `rv-incidente-supabase` — o catálogo mestre só
  linka pra ela, não recria o conteúdo)
- **Linguagem sempre sem jargão técnico** ao reportar status pro Felipe —
  ele não é técnico, então status vira "tá funcionando" / "falta um passo
  seu" / "com problema", não termos como "endpoint" ou "autenticação OAuth"
