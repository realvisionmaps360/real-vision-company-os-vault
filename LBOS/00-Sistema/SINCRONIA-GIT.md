---
id: SIS-2026-004
tipo: processo
nome: Sincronia Git — Suíça ↔ Brasil ↔ VPS
status: planejado
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-10
proxima_revisao: 2026-08-24
fonte_unica: true
pertence_a: ["[[LBOS]]"]
referencia: ["[[operacao/gestao/infraestrutura/lbos-agent-telegram/README]]"]
tags: [lbos/sistema, lbos/processo]
---

# Sincronia Git — Suíça ↔ Brasil ↔ VPS

> **Status: não executar ainda (nó manual) / desenhado, aguardando implementação (nó VPS).** O procedimento manual entre PC e notebook segue não executado. O terceiro nó — sincronia automática na VPS — foi desenhado em 10/08/2026 junto com o [agente do LBOS no Telegram](../../operacao/gestao/infraestrutura/lbos-agent-telegram/README.md), mas só entra em operação quando a VPS estiver configurada (ver `HANDOFF-HERMES.md` na mesma pasta). Este documento existe para que, quando cada parte entrar em operação, o procedimento seja seguido e não improvisado.

## Situação

O Company OS vive em três lugares:

| Ponto | Onde | Como sincroniza | Estado |
|---|---|---|---|
| PC — Brasil | `Desktop\Real Vision` | Manual, com o Felipe presente | Última versão sincronizada antes da viagem |
| Notebook — Suíça | `Desktop\Real Vision` | Manual, com o Felipe presente | Recebeu o LBOS inteiro em 06/08/2026 |
| VPS Hostinger | `/workspace/real-vision-company-os-vault/` | Automático, `vault-sync.sh` via cron | Já sincroniza o Company OS de hora em hora (8h-20h); passa a sincronizar o LBOS a cada 10 min, 24h, quando o agente do Telegram entrar em operação |

Enquanto o nó manual (PC↔notebook) não subir, os dois divergem. Isso é aceitável e intencional — o risco só aparece na hora de juntar. O nó da VPS é um caso diferente: ele já existe e já roda automaticamente, então as regras abaixo valem a partir do momento em que a frequência subir para 10 minutos.

## Procedimento (executar com o Felipe presente)

```bash
git fetch origin
```
Sem `fetch` antes, `git status` responde por cache e mente sobre o estado do remoto.

```bash
git status
```
Revisar **tudo** que foi criado. Nada entra no commit sem ter sido olhado.

```bash
git pull --rebase origin main
```
Conflito se resolve à mão, arquivo por arquivo. Nunca com force.

```bash
git add LBOS/
git commit -m "feat(lbos): implementa LBOS v1.0 — fundação, entidades e skills"
git push origin main
```

Depois, no PC do Brasil: `git pull` e conferir o hash do commit.

## Procedimento — nó automático (VPS)

Diferente do nó manual acima, este roda sozinho, sem o Felipe presente. A trava não está em pedir confirmação a cada ciclo — está em **nunca resolver conflito sozinho**.

```
1. git fetch origin
2. git pull --rebase origin main
   ├─ conflito? → git rebase --abort, avisa o Felipe pelo Telegram, PARA
   └─ limpo?    → segue
3. Tem mudança local (o agente do Telegram escreveu algo)? → commit
   mensagem: "vault auto-sync · <data> <hora>"
4. git push origin main
   └─ falhou?   → avisa pelo Telegram, PARA
```

Roda a cada 10 minutos, 24h, via cron do usuário `hermeswebui` (`*/10 * * * *`). Não é um script novo — é o `vault-sync.sh` que já existe e já sincroniza o resto do Company OS de hora em hora, com a frequência aumentada e a trava de conflito adicionada. Detalhe de implementação: `operacao/gestao/infraestrutura/lbos-agent-telegram/HANDOFF-HERMES.md`.

**Por que o push automático aqui não quebra a trava abaixo:** a regra "confirmação literal do Felipe" existe pra decisão humana em cima de um diff — resolver conflito, decidir o que sobe. O nó da VPS nunca toma essa decisão: só empurra quando o histórico está limpo (nada pra decidir), e qualquer situação que exigiria julgamento humano faz o script parar e chamar o Felipe — exatamente o que a regra manual pede, só que automaticamente. A automação decide "posso empurrar sem risco?", nunca "como resolver isso?".

## Travas

Valem para os três nós:

- **`git push --force` é proibido, em qualquer nó, manual ou automático.** Em 25/07/2026 um force-push apagou commit no `real-vision-site`. Não repetir
- **Push e merge do nó manual exigem confirmação literal do Felipe.** Aprovação geral de sessão não vale
- **O nó automático nunca resolve conflito.** Se o rebase não for limpo, aborta e avisa — não tenta ser esperto
- **Conferir o hash depois do push manual.** Se não bater com o local, parar e investigar antes de qualquer coisa
- **`TEMP/` não sobe.** Inclui `TEMP/vault-duplicado-06-08-2026/`

## Antes de rodar, confirmar

**Nó manual (PC ↔ notebook):**
- [ ] LBOS validado pelo Felipe no notebook
- [ ] `git fetch` executado
- [ ] Diff revisado arquivo por arquivo
- [ ] Felipe autorizou o push com estas palavras, nesta sessão

**Nó automático (VPS), antes de subir a frequência para 10 min:**
- [ ] `vault-sync.sh` testado manualmente uma vez, com resultado conferido
- [ ] Aviso via Telegram testado (forçar um conflito de propósito e checar se a mensagem chega)
- [ ] Confirmado que o script nunca usa `--force` em nenhum caminho de código
- [ ] Allowlist do bot já travada (ver `HANDOFF-HERMES.md`) — não faz sentido automatizar sync antes de travar quem fala com o agente

---

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[AGENTS]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Sessão rodando no notebook da Suíça, sem git | Evita divergência silenciosa entre as duas máquinas | Zero operação de rede até o LBOS estar validado |
| 2026-08-10 | Adicionado terceiro nó (VPS automatizada) | Agente do LBOS no Telegram precisa de sincronia rápida (10 min) num ponto de escrita novo, a VPS | Passa de dois pontos manuais pra três pontos, um deles automático | Push automático só quando o rebase está limpo; qualquer conflito para o processo e avisa o Felipe pelo Telegram — nunca resolve sozinho, nunca força |
