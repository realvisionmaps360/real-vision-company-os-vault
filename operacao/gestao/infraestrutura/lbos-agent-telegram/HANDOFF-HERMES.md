# Handoff — Instalar o agente LBOS no Telegram

**Para:** Thomas Anderson (Hermes Agent)
**De:** Claude Code + Felipe Garcia
**Data:** 2026-08-10
**Contexto completo:** [[README|README desta pasta]]

## Sua parte nisso

Você vai instalar e deixar de pé, na VPS, uma sessão do Claude Code conectada a um bot do Telegram. Essa sessão vai ser o jeito do Felipe alimentar o LBOS (`LBOS/` no vault) pelo celular.

**Você não vai mexer no conteúdo do LBOS.** Sua parte é só a infraestrutura: instalar, configurar, subir o serviço e ajustar o script de sincronia. Quem escreve nos arquivos do LBOS é o agente que você vai deixar rodando.

Você continua fazendo tudo o que já faz hoje. Nada do que já existe (SearXNG, OpenReply, sua própria WebUI) é desligado ou substituído.

## Antes de começar — pré-voo obrigatório

Rodar e **reportar os números antes de instalar qualquer coisa**:

```bash
free -h
df -h /
nproc
node --version
```

O último registro que temos é de 01/08/2026: 1.4 GB de RAM livre e 33 GB de disco livre. **Se a RAM livre estiver abaixo de 800 MB, pare e avise** — a instalação não deve prosseguir sem o Felipe decidir o que fazer.

## Passo 1 — Instalar o Bun

O plugin oficial do Telegram roda em Bun.

```bash
curl -fsSL https://bun.sh/install | bash
```

Garantir que `bun` está no PATH do usuário `hermeswebui` e confirmar com `bun --version`.

## Passo 2 — Instalar o Claude Code

Node já existe via nvm. Então:

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

## Passo 3 — Guardar o token do Claude

O Felipe vai fornecer um token que começa com algo do tipo `sk-ant-oat...` (gerado por `claude setup-token`, vale 1 ano).

```bash
mkdir -p ~/.claude
touch ~/.claude/lbos-agent.env
chmod 600 ~/.claude/lbos-agent.env
```

Escrever dentro do arquivo (uma linha):

```
CLAUDE_CODE_OAUTH_TOKEN=<valor que o Felipe forneceu>
```

**Nunca ecoar esse valor de volta no chat, nem em log, nem em confirmação.** Confirme só que o arquivo existe e tem permissão 600 — nada além disso.

## Passo 4 — Ligar as skills do LBOS

O agente precisa das skills, e elas moram fora da pasta `LBOS/`. Resolver por symlink (mesmo padrão já documentado em `contexto/SKILL-SYNC-PROCESS.md`):

```bash
mkdir -p ~/.claude/skills
VAULT=/workspace/real-vision-company-os-vault
for s in lbos lbos-entrada lbos-classificacao lbos-relacionamentos \
         lbos-impacto lbos-atualizacao lbos-consistencia \
         lbos-planejamento lbos-memoria lbos-auditoria; do
  ln -sfn "$VAULT/skills/$s" "$HOME/.claude/skills/$s"
done
ls -la ~/.claude/skills/
```

Assim, quando o vault sincroniza, as skills atualizam sozinhas.

## Passo 5 — Configurar o escopo de acesso

Criar `~/.claude/settings.json`. Objetivo: o agente só lê e escreve dentro de `LBOS/`, e não trava esperando aprovação que ninguém vai dar (não tem gente no terminal).

```json
{
  "permissions": {
    "allow": [
      "Read(/workspace/real-vision-company-os-vault/LBOS/**)",
      "Edit(/workspace/real-vision-company-os-vault/LBOS/**)",
      "Write(/workspace/real-vision-company-os-vault/LBOS/**)"
    ],
    "deny": [
      "Read(/workspace/real-vision-company-os-vault/operacao/**)",
      "Read(/workspace/real-vision-company-os-vault/contexto/**)",
      "Read(/workspace/real-vision-company-os-vault/Felipe Garcia/**)",
      "Edit(/workspace/real-vision-company-os-vault/operacao/**)",
      "Edit(/workspace/real-vision-company-os-vault/contexto/**)",
      "Write(/workspace/real-vision-company-os-vault/operacao/**)",
      "Write(/workspace/real-vision-company-os-vault/contexto/**)",
      "Bash(git push:*)",
      "Bash(git commit:*)",
      "Bash(rm:*)"
    ]
  }
}
```

Duas coisas propositais aqui:

- **O agente não commita nem dá push.** Quem faz isso é o `vault-sync.sh`. Um só responsável pelo git evita dois processos brigando pelo mesmo repositório
- **`rm` bloqueado.** A regra do Company OS é nunca apagar nota — só arquivar em `09-Arquivo/`

> Se ao subir o serviço o agente ficar parado pedindo aprovação a cada escrita, a sintaxe de permissão pode ter mudado de versão. Confirmar em `https://code.claude.com/docs/en/settings` antes de inventar solução. **Não** use `--dangerously-skip-permissions` como atalho — isso derruba justamente a trava de escopo que é o ponto deste setup.

## Passo 6 — Instalar e configurar o plugin do Telegram

Abrir uma sessão do Claude Code a partir da pasta do LBOS:

```bash
cd /workspace/real-vision-company-os-vault/LBOS
set -a; source ~/.claude/lbos-agent.env; set +a
claude
```

Dentro da sessão:

```
/plugin install telegram@claude-plugins-official
/reload-plugins
/telegram:configure <token que o Felipe forneceu pelo BotFather>
```

Isso grava o token do bot em `~/.claude/channels/telegram/.env`.

## Passo 7 — Parear e travar o acesso

Ainda com o Claude Code aberto, relançar com o canal ativo:

```bash
claude --channels plugin:telegram@claude-plugins-official
```

1. Pedir ao Felipe que mande uma mensagem qualquer pro bot no Telegram
2. O bot responde com um código de 6 caracteres
3. Na sessão, rodar `/telegram:access pair <código>`
4. **Imediatamente depois**, travar: `/telegram:access policy allowlist`

O passo 4 é obrigatório. Sem ele, qualquer pessoa que descobrir o bot consegue parear e conversar com o LBOS do Felipe.

## Passo 8 — Deixar de pé 24/7

Criar `/etc/systemd/system/lbos-agent.service`:

```ini
[Unit]
Description=Agente LBOS - Claude Code via Telegram
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=hermeswebui
WorkingDirectory=/workspace/real-vision-company-os-vault/LBOS
EnvironmentFile=/home/hermeswebui/.claude/lbos-agent.env
ExecStart=/bin/bash -lc 'claude --channels plugin:telegram@claude-plugins-official'
Restart=always
RestartSec=15

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now lbos-agent
systemctl status lbos-agent
```

Escolhemos systemd em vez de tmux de propósito: sobrevive a reboot da VPS sem ninguém precisar reconectar.

> O `ExecStart` acima pode precisar do caminho absoluto do `claude` (descobrir com `which claude`) se o PATH do serviço não pegar o nvm. Ajustar se o serviço não subir.

## Passo 9 — Ajustar o script de sincronia

Editar `/home/hermeswebui/.hermes/scripts/vault-sync.sh`. **Ler o que está lá antes de mudar e reportar o conteúdo atual** — não reescrever por cima às cegas.

Mudanças pedidas:

1. **Frequência:** de 1 hora (8h-20h) para **10 em 10 minutos, 24 horas**. No crontab do `hermeswebui`: `*/10 * * * *`
2. **Trava de conflito:** se o `git pull --rebase` der conflito, rodar `git rebase --abort`, mandar aviso no Telegram e **encerrar sem tentar resolver**
3. **Aviso de falha no push:** mesma coisa — avisa e para
4. **Nunca `--force`**, em nenhuma circunstância

Esqueleto da lógica (adaptar ao script real, sem quebrar o que ele já faz):

```bash
VAULT=/workspace/real-vision-company-os-vault
cd "$VAULT" || exit 1

avisa() {
  source /home/hermeswebui/.claude/channels/telegram/.env
  curl -s -X POST \
    "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="<ID do Felipe>" \
    -d text="$1" > /dev/null
}

git fetch origin || { avisa "⚠️ LBOS sync: git fetch falhou"; exit 1; }

if ! git pull --rebase origin main; then
  git rebase --abort
  avisa "⚠️ LBOS sync PAROU: conflito no rebase. Precisa de resolução manual."
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "vault auto-sync · $(date +%F\ %H:%M)"
  if ! git push origin main; then
    avisa "⚠️ LBOS sync: push falhou. Vault local está à frente do GitHub."
    exit 1
  fi
fi
```

## O que NÃO fazer

- ❌ Não mexer em nada dentro de `LBOS/` — o conteúdo é do agente e do Felipe
- ❌ Não usar `git push --force` em hipótese alguma (já apagou commit uma vez, em 25/07/2026, no `real-vision-site`)
- ❌ Não ecoar tokens no chat, log ou mensagem de confirmação
- ❌ Não instalar isso em Docker — a VPS está apertada de RAM, processo direto é mais leve
- ❌ Não desligar nem alterar o que já roda (SearXNG, OpenReply, sua própria WebUI)

## O que reportar de volta

1. Os números do pré-voo (RAM, disco, CPU)
2. Versões instaladas: `bun --version`, `claude --version`
3. Conteúdo original do `vault-sync.sh` **antes** de qualquer alteração
4. `systemctl status lbos-agent` depois de subir
5. Quanto de RAM o serviço está consumindo depois de 1h de pé
6. Qualquer passo que falhou — **sem improvisar solução alternativa sem perguntar**

## Verificação de ponta a ponta

Só considerar pronto quando todos passarem:

| # | Teste | Resultado esperado |
|---|---|---|
| 1 | `systemctl status lbos-agent` | `active (running)` |
| 2 | Felipe manda "oi" pro bot | Responde como o agente do LBOS, não genérico |
| 3 | Pedir pra ler algo do LBOS (ex: "quais projetos existem?") | Lista casamento, real-vision, sunbite |
| 4 | Pedir pra ler algo **fora** do escopo (ex: "o que tem no AGENTS.md?") | **Recusa** e explica que só enxerga o LBOS |
| 5 | Mandar informação nova de verdade (ex: uma despesa) | Roda o pipeline, mostra o impacto e **espera o OK** — não grava direto |
| 6 | Aprovar | Grava e diz exatamente qual arquivo mudou |
| 7 | Esperar ~10 min, `git log` no PC do Felipe | Commit `vault auto-sync` aparece |
| 8 | Abrir o Obsidian no PC | O nó novo está lá, com frontmatter correto |
| 9 | Criar um conflito de propósito (editar o mesmo arquivo nos dois lados) | Sync **para** e manda aviso no Telegram — não força nada |
| 10 | `free -h` depois de 1h rodando | RAM livre estável, sem tendência de queda |

Os testes **4** e **9** são os mais importantes — são eles que provam que as duas travas de segurança (escopo e sincronia) funcionam de verdade.

## Se der errado

| Sintoma | Primeiro lugar a olhar |
|---|---|
| Bot não responde | `systemctl status lbos-agent` e `journalctl -u lbos-agent -n 50` |
| Responde mas não lê arquivo | `settings.json` — provavelmente o caminho do `allow` está errado |
| Trava pedindo permissão | Mesma coisa, e conferir a doc de settings |
| Sync parou | Rodar o script na mão e ler a saída |
| VPS engasgando | `free -h` e `docker stats` — se for RAM, parar o serviço e avisar |

**Desligar tudo sem estrago:**

```bash
sudo systemctl stop lbos-agent
sudo systemctl disable lbos-agent
```

O vault não é afetado. O que o agente já escreveu continua lá, versionado.

## Relacionados

- Pertence a: [[README|README desta pasta]]
- Sistema que este agente alimenta: [[LBOS]]
- Regra de sincronia detalhada: `LBOS/00-Sistema/SINCRONIA-GIT.md`
