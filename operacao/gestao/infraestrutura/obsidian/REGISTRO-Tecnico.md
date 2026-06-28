# Registro Técnico — Sincronização Obsidian + Git + GitHub

> Log técnico da integração, para troubleshooting futuro. Se algo quebrar, comece por aqui.
> Criado em 28/06/2026. Versão simples para o Felipe: [[GUIA-Sincronizacao]]. Índice: [[README]].

---

## Estado do sistema (configuração atual)

| Item | Valor |
|---|---|
| **Vault do Obsidian** | `C:\Users\Computador\Desktop\Real Vision\` (raiz do Company OS) |
| **Repositório** | `real-vision-company-os-vault` — **privado** |
| **Conta GitHub** | `realvisionmaps360` |
| **URL** | https://github.com/realvisionmaps360/real-vision-company-os-vault |
| **Branch** | `main` |
| **Plugin Obsidian** | Git (by Vinzent) — `obsidian-git` |
| **O que versiona** | Apenas arquivos `.md` de todo o Company OS |
| **Token (mobile)** | Personal Access Token **classic**, escopo `repo`, validade **90 dias** |

---

## Estratégia de sincronização (decisão "Opção A")

Sincronizar **o Company OS inteiro, mas só os `.md`**. Motivo: o celular e uma futura VPS (Hermes) precisam da base de conhecimento em texto, sem o peso de imagens/vídeos/repos de código.

### Regras do `.gitignore` (raiz)
Lógica: **ignora tudo (`*`)** e **libera só** o que interessa.

```gitignore
*                # ignora tudo por padrão
!*/              # ...mas permite entrar nas pastas
!*.md            # ...e versiona arquivos .md
!.gitignore      # ...e o próprio .gitignore (pra regra viajar p/ celular/VPS)

# Bloqueios explícitos:
operacao/projetos/                              # repos de código internos
operacao/clientes/arquivos/MSV-Aarau/site/      # repo de site de cliente
loja-imagens/  TEMP/  .obsidian/  .claude/
.env  *.env  node_modules/  .git/  *.log
*.png *.jpg *.jpeg *.gif *.mp4 *.mp3 *.pdf *.zip *.rar *.7z
```

### Por que `.obsidian/` é bloqueado
A pasta `.obsidian/` guarda o "estado da janela" (que aba estava aberta, layout). Se ela subisse, dois aparelhos brigariam por esse estado a cada abertura → conflitos constantes. Por isso ela fica **fora** do Git e o plugin é configurado em cada aparelho separadamente.

### Repos git internos (não podem virar "repo dentro de repo")
Mapeados em 28/06/2026 — todos caem em caminhos já bloqueados:
- `operacao/projetos/rv-cartaodigital-paraty-onboard/.git`
- `operacao/projetos/solariumaarau/.git`
- `operacao/projetos/sunbite-site/.git`
- `operacao/projetos/_RV-Internos/real-vision-site/.git`
- `operacao/projetos/_RV-Internos/visionflow/.git`
- `operacao/clientes/arquivos/MSV-Aarau/site/.git`

> Pré-voo antes de qualquer `git init` futuro na raiz: rodar `find . -name .git` e garantir que todo repo interno está dentro de um caminho ignorado.

---

## Configuração do plugin (`.obsidian/plugins/obsidian-git/data.json`)

Valores que importam:

```json
"autoSaveInterval": 5,      // commit-and-sync a cada 5 min
"autoPushInterval": 5,      // PUSH a cada 5 min  ← corrigido de 0 nesta sessão
"autoPullInterval": 5,      // pull a cada 5 min
"autoPullOnBoot": true,     // pull ao abrir
"pullBeforePush": true,     // puxa antes de empurrar (evita conflito)
"syncMethod": "merge"
```

---

## Histórico de problemas resolvidos (28/06/2026)

1. **Celular não recebia as notas do PC.**
   - Causa: `autoPushInterval` estava em **0** (push desligado). O PC fazia commit local mas nunca empurrava pro GitHub; o celular puxava de um cofre desatualizado.
   - Correção: `autoPushInterval` **0 → 5** + `git push` manual para destravar os commits pendentes (o PC estava 2 commits à frente do `origin`).

2. **Botão "Clone an existing remote repo" não existia nas configurações (Android).**
   - Causa: a interface do plugin mudou. O clone saiu das configurações e foi para a **paleta de comandos**.
   - Correção: clonar via paleta → "Obsidian Git: Clone an existing remote repo".

3. **Dois cofres no Obsidian.**
   - O cofre correto é **"Real Vision"** (`Desktop\Real Vision`). O "Obsidian Vault" (`Documents`) é um vazio padrão — ignorar.

---

## Problemas comuns e como resolver (referência)

| Sintoma | Causa provável | Solução |
|---|---|---|
| Um aparelho não recebe novidades | `autoPushInterval` em 0 | Voltar para 5; rodar "Commit-and-sync" |
| Erro de autenticação / pede senha | Token de 90 dias venceu | Gerar novo token classic (escopo `repo`) e refazer a URL no celular |
| "Merge conflict" | Os dois aparelhos editaram a mesma nota offline | Fazer `Pull`, resolver o trecho marcado `<<<<<<<`, commitar |
| Arquivo grande recusado no push | Algum não-`.md` escapou do `.gitignore` | Conferir o `.gitignore`; remover do índice com `git rm --cached` |
| "repo dentro de repo" no init | Um `.git` interno não estava ignorado | Adicionar o caminho ao `.gitignore` antes do `git init` |

---

## Comandos de referência (executados nesta sessão)
```bash
git init -b main
# .gitignore ajustado (+ !.gitignore)
git add -A
git commit -m "Sincronizacao inicial do Company OS (somente .md)"
gh repo create real-vision-company-os-vault --private --source=. --remote=origin --push
git push origin main      # destravar commits pendentes do plugin
```

> Este registro é material-fonte do **Módulo 3** do [[CONCEITO|Curso Sócio Digital]] (Obsidian + sincronização no celular).
