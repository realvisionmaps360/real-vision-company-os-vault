# Registro Técnico — Sincronização Obsidian via GitHub

Log de configuração para troubleshooting futuro. Se a sincronização quebrar, este documento descreve o estado exato montado e como reverter/corrigir.

> Guia em linguagem simples (passo a passo do usuário): [[GUIA-Sincronizacao-Obsidian]]

## Resumo

- **Data:** 28/06/2026
- **Executado por:** Claude Code + Felipe Garcia
- **Objetivo:** manter a base de conhecimento (Company OS) sincronizada entre Desktop e Android (e futura VPS Hermes) via GitHub.
- **Estratégia:** Opção A — sincronizar o Company OS **inteiro, somente arquivos `.md`**.

## Estado do sistema

- **Vault do Obsidian:** raiz `C:\Users\Computador\Desktop\Real Vision\` (a `.obsidian/` vive na raiz).
- **Repositório:** `realvisionmaps360/real-vision-company-os-vault`
- **Visibilidade:** PRIVATE
- **Branch:** `main`
- **URL:** https://github.com/realvisionmaps360/real-vision-company-os-vault
- **Autenticação Desktop:** via `gh` CLI (conta `realvisionmaps360`, já logada; credenciais no keyring do Windows).
- **Autenticação Android:** Personal Access Token classic, escopo `repo`, validade **90 dias**, embutido na URL de clone dentro do plugin Git. **Nunca é commitado.**
- **Volume versionado:** 100 arquivos (99 `.md` + o `.gitignore`).

## Regras do `.gitignore` (o que sobe e o que NÃO sobe)

A lógica é: **ignora tudo (`*`), libera só `.md` e pastas para navegação**, mais o próprio `.gitignore`.

**Bloqueado de propósito (não sobe):**
- `.obsidian/` — config local de janela; subir causaria conflito entre aparelhos.
- `.claude/`, `.env`, `*.env`, `node_modules/`, `*.log`
- `operacao/projetos/` — contém repos git internos (ver abaixo).
- `operacao/clientes/arquivos/MSV-Aarau/site/` — repo git interno.
- `loja-imagens/`, `TEMP/` — arquivos grandes/temporários.
- Binários: `*.png *.jpg *.jpeg *.gif *.mp4 *.mp3 *.pdf *.zip *.rar *.7z`

**Sobe (esperado):** todo `.md` fora dos paths acima — inclui `Felipe Garcia/`, `contexto/`, `operacao/comercial/`, `operacao/prospeccao/`, `operacao/rh/`, etc. Decisão consciente da Opção A.

## Repos git internos mapeados (todos bloqueados)

Por que bloquear: evitar "repo dentro de repo" (Git trata como submódulo e não versiona o conteúdo corretamente).

- `operacao/projetos/rv-cartaodigital-paraty-onboard/.git`
- `operacao/projetos/solariumaarau/.git`
- `operacao/projetos/sunbite-site/.git`
- `operacao/projetos/_RV-Internos/real-vision-site/.git`
- `operacao/projetos/_RV-Internos/visionflow/.git`
- `operacao/clientes/arquivos/MSV-Aarau/site/.git`

## Comandos executados (na raiz do vault)

```bash
# pré-voo: confirmar repos internos
find . -name ".git" -not -path './.git/*'

# .gitignore: adicionado "!.gitignore"

git init -b main
git add -A
git -c user.name="Real Vision" -c user.email="realvisionmaps360@gmail.com" \
    commit -m "Sincronizacao inicial do Company OS (somente .md)"
gh repo create real-vision-company-os-vault --private --source=. --remote=origin --push
```

## Problemas comuns e como resolver

- **Celular parou de sincronizar / erro de autenticação (401):** o token de 90 dias provavelmente venceu. Gerar token novo (GitHub → Settings → Developer settings → Tokens classic, escopo `repo`) e atualizar a credencial no plugin Git do celular. Ver [[GUIA-Sincronizacao-Obsidian]].
- **Conflito de merge:** ocorre ao editar a mesma nota nos dois aparelhos sem sincronizar antes. Hábito de prevenção: deixar o app puxar (`pull`) ao abrir, antes de editar. Para resolver, comparar as duas versões e mesclar manualmente — não apagar às cegas.
- **Push recusado por arquivo grande:** algum binário escapou do `.gitignore`. Conferir as regras de bloqueio acima; o repo deve conter **só `.md`**. Comando de auditoria: `git ls-tree -r origin/main --name-only | grep -v '\.md$'` — só deve retornar `.gitignore`.
- **Aviso "LF will be replaced by CRLF":** inofensivo (Windows usa quebra de linha diferente). Não é erro.
- **Novo repo git interno criado no futuro dentro do vault:** adicionar o caminho ao `.gitignore` antes do próximo commit, senão vira submódulo quebrado.

## Verificação de saúde (rodar quando quiser conferir)

```bash
cd "C:\Users\Computador\Desktop\Real Vision"
git status                                  # deve estar limpo
gh repo view real-vision-company-os-vault --json visibility   # deve ser PRIVATE
git ls-tree -r origin/main --name-only | wc -l                # contagem de arquivos
```

---

Relacionados: [[GUIA-Sincronizacao-Obsidian]] · [[AGENTS]]
