# Agente LBOS no Telegram

> Status: **planejado, aguardando execução**. Desenhado em 10/08/2026. Ainda não instalado na VPS — falta o Felipe gerar os tokens (§"O que falta") e o Hermes executar o `HANDOFF-HERMES.md` desta pasta.

## O que é

Um bot de Telegram que dá ao Felipe acesso remoto ao [[LBOS]] (Life & Business Operating System, `LBOS/` na raiz do vault) — conversar com ele de qualquer lugar, incluir informação nova, e receber confirmação do que foi salvo, sem precisar abrir o Claude Code no computador.

Não é um bot escrito do zero. É o plugin oficial da Anthropic — **Claude Code Channels**, `telegram@claude-plugins-official` — conectando uma sessão real do Claude Code (rodando na VPS) ao Telegram. Como é uma sessão real, ela carrega o `LBOS/CLAUDE.md` e pode invocar as skills `lbos-*` que já existem — nenhuma lógica de classificação/impacto/atualização precisou ser reescrita.

## Por que existe

O LBOS só podia ser alimentado sentado no computador. Isso contraria o próprio princípio do sistema (`FLUXO-DOCUMENTO-VIVO.md`: *"Registrar precisa ser barato. Se custar esforço, o Felipe não registra, e o sistema morre de fome."*). Decidido em sessão de 10/08/2026, depois de pesquisa sobre o caminho mais atual/oficial pra isso.

## Arquitetura

```
Felipe (celular)
   ↓ mensagem no bot
Telegram
   ↓
Plugin oficial (Bun) rodando na VPS
   ↓
Sessão do Claude Code (cwd = LBOS/, escopo travado)
   ↓ carrega LBOS/CLAUDE.md + skills lbos-*
Classifica → mapeia relação → mostra impacto → espera o OK
   ↓ depois do OK
Escreve o nó em LBOS/
   ↓
vault-sync.sh (a cada 10 min) → GitHub → PC Brasil e notebook Suíça
```

O "pensamento" roda na nuvem da Anthropic (autenticação por assinatura Claude Pro do Felipe) — o processo na VPS só faz a ponte, é leve.

## ⚠️ Escopo — exceção temporária

O agente só enxerga a pasta `LBOS/`, nunca o resto do Company OS. Isso contraria o princípio "mesmo cofre, mesmo grafo" do `ARQUITETURA.md` §8 do próprio LBOS — é uma decisão consciente e temporária do Felipe, pra entender o funcionamento antes de abrir o acesso completo. Detalhada em `LBOS/CLAUDE.md`.

## Onde cada coisa mora na VPS

| Item | Caminho |
|---|---|
| Vault | `/workspace/real-vision-company-os-vault/` |
| Pasta de trabalho do agente | `/workspace/real-vision-company-os-vault/LBOS/` |
| Token do Claude (assinatura Pro, via `claude setup-token`) | `~/.claude/lbos-agent.env` (modo 600) |
| Token do bot (via BotFather) | `~/.claude/channels/telegram/.env` (criado pelo plugin) |
| Skills | symlink de `~/.claude/skills/lbos*` → `skills/` do vault |
| Serviço 24/7 | `/etc/systemd/system/lbos-agent.service` |
| Script de sincronia (compartilhado com o resto do vault) | `/home/hermeswebui/.hermes/scripts/vault-sync.sh` |

Passo a passo completo de instalação: [`HANDOFF-HERMES.md`](HANDOFF-HERMES.md), escrito pra o Hermes Agent executar.

## Bot dedicado

Bot novo, só pra isso — não reaproveita o `@rv_updater_bot`, que é de outra automação (alerta de lead de blog, ver [[../telegram-alertas/README|telegram-alertas/README]]). Allowlist trava só o Felipe nesta primeira fase.

## Operação (depois de instalado)

**Reiniciar:**
```bash
sudo systemctl restart lbos-agent
```

**Ver o que houve de errado:**
```bash
journalctl -u lbos-agent -n 50
```

**Desligar sem afetar o resto** (o vault não é impactado — o que já foi escrito continua lá, versionado):
```bash
sudo systemctl stop lbos-agent
sudo systemctl disable lbos-agent
```

**Renovar o token do Claude:** o token gerado por `claude setup-token` vale 1 ano a partir da instalação (~agosto/2027). Repetir o comando no PC do Felipe e atualizar `~/.claude/lbos-agent.env` na VPS.

## O que falta (checklist)

- [ ] Felipe: criar o bot no BotFather
- [ ] Felipe: confirmar o próprio ID do Telegram (`@userinfobot`)
- [ ] Felipe: gerar o token com `claude setup-token`
- [ ] Felipe: levar os dois tokens até a VPS (preferir terminal do hPanel — nunca colar token em chat, ver `HANDOFF-HERMES.md`)
- [ ] Hermes: executar `HANDOFF-HERMES.md` de ponta a ponta
- [ ] Rodar a verificação de ponta a ponta (10 testes, incluindo forçar um conflito de propósito) antes de considerar pronto

## Relacionados

- Sistema que este agente alimenta: [[LBOS]]
- Como o escopo dele é travado: `LBOS/CLAUDE.md`
- Como a sincronia de 10 em 10 min funciona: `LBOS/00-Sistema/SINCRONIA-GIT.md`
- Ordem de serviço técnica: [[HANDOFF-HERMES]]
- Outro bot de Telegram já existente, propósito diferente: [[../telegram-alertas/README|telegram-alertas/README]]
- Referencia: [[AGENTS]]
