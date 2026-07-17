# Canal YouTube Real Vision — CLAUDE.md

Sistema Operacional do canal [@RealVisionMaps](https://www.youtube.com/@RealVisionMaps). Este arquivo é o que toda sessão precisa saber; procedimentos extensos vivem nas skills (`.claude/skills/`) e regras específicas em `.claude/rules/`.

## Antes de qualquer coisa

1. Confirme que está em `operacao/projetos/_RV-Internos/canal-youtube/`.
2. Leia `00_governanca/pendencias-de-integracao.md` — pode haver decisão em aberto que muda o que é possível fazer.
3. Nunca chame uma ferramenta de escrita do YouTube MCP sem aprovação explícita da etapa correspondente (ver `.claude/rules/seguranca-e-aprovacoes.md`).

## O que este canal é

Reforça o posicionamento da Real Vision como autoridade em presença digital integrada, sites/apps para negócios, IA aplicada a negócios locais, e tecnologia para geração de demanda. Público-alvo ainda é **hipótese**, não conclusão — ver `02_banco-de-ideias/hipoteses-de-publico.md`.

## Fontes e nível de confiança

Toda afirmação estratégica carrega uma etiqueta de confiança (confirmada / sustentada por dado / plausível / não confirmada / contradita). Nunca apresente hipótese como fato. Detalhe completo em `.claude/rules/fontes-e-evidencias.md` e `00_governanca/fontes-e-niveis-de-confianca.md`.

## MCP do YouTube

Ainda **não está instalado**. A decisão registrada é: Opção 1 (`mrchevyceleb/youtube-mcp`, OAuth2, 22 ferramentas de leitura+escrita). Enquanto não for instalado, qualquer skill que dependa dele deve avisar isso claramente e não simular resultado. Ver `.claude/rules/operacao-youtube-mcp.md`.

## Matriz de autonomia (resumo)

- **Nível A** (sem aprovação): ler, pesquisar, criar rascunho/documento interno, analisar dados já disponíveis.
- **Nível B** (plano + aprovação): mudanças estruturais amplas, renomeação em massa, mudança neste CLAUDE.md ou nas regras/hooks.
- **Nível C** (aprovação específica): qualquer alteração de metadado público do canal (título, descrição, tags, thumbnail, playlist).
- **Nível D** (aprovação imediatamente anterior): publicar vídeo publicamente. Frase exigida: `APROVO A PUBLICAÇÃO PÚBLICA DO VÍDEO [ID/slug]`.
- **Nível E** (dupla aprovação + backup): excluir vídeo/playlist/comentário/arquivo. Frases exigidas: `APROVO EXCLUSÃO 1 — OPERAÇÃO [ID]` e `APROVO EXCLUSÃO 2 — OPERAÇÃO [ID]`.

Detalhe completo, incluindo o que NUNCA conta como aprovação implícita, em `.claude/rules/seguranca-e-aprovacoes.md`.

## Organização

Pastas numeradas (`00_` a `99_`) = fonte de verdade, sincroniza no Git do vault. `.claude/` (regras, skills, hooks) fica **só nesta máquina** — o `.gitignore` da raiz do Company OS bloqueia toda pasta `.claude/`. Se uma decisão ou aprendizado precisa sobreviver e sincronizar, ele mora em `00_governanca/` ou `07_decisoes/`, nunca só dentro de `.claude/`.

Cada vídeo tem pasta própria em `04_videos/AAAA-MM-DD_slug-do-video/`, arquivos nomeados `AAAA-MM-DD_slug_tipo-vNN.ext`.

## Nunca

- Inventar dado de audiência, concorrente ou resultado. Se não veio do MCP, do Company OS ou da sessão atual, é hipótese — rotule como tal.
- Fazer upload, editar, publicar, apagar ou responder comentário sem a aprovação do nível correspondente.
- Apagar arquivo do vault. Crie versão nova (`-v02`, `-revisado`), nunca sobrescreva/delete o original.
