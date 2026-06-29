---
name: rv-fim-sessao
description: Maestro de fim de sessão da Real Vision 360. Use SEMPRE que Felipe disser "fim de sessão", "encerrar sessão", "vamos encerrar", "fechar a sessão do cliente X", "terminamos por hoje", "wrap up", ou /rv-fim-sessao. Orquestra três artefatos de encerramento: (1) SEMPRE atualiza a FICHA-CLIENTE.md + TIMELINE do cliente — memória que fecha o círculo com o início da próxima sessão; (2) gera o texto do VisionFlow se for sessão de cliente; (3) gera o bilhete técnico estilo session-handoff se a obra ficou pela metade e Felipe vai dar /clear. Carregar sempre junto com a skill realvision.
---

# Skill: rv-fim-sessao — Maestro de Fim de Sessão

> Um único comando que fecha a sessão direito. Decide o que produzir conforme o momento.
> Carregue sempre junto com `realvision`. Índice do ciclo completo em [[CICLO-Sessao]].

---

## A ideia em uma frase

No início da sessão eu **leio** a `FICHA-CLIENTE.md` (via `[[PROTOCOLO-Sessao-Contexto]]`).
No fim da sessão eu **escrevo** de volta nela — assim a próxima sessão começa sabendo de tudo. O círculo fecha.

---

## As duas skills que isso unifica (e por que se completam)

| | `session-handoff` | `rv-visionflow-handoff` |
|---|---|---|
| **Pra quem** | Próximo Claude (depois de `/clear`) | VisionFlow / Felipe |
| **Saída** | Bilhete técnico no chat (nunca salva arquivo) | Texto pra colar em Observações do CRM |
| **Conteúdo** | Planos, tarefas, arquivos mexidos, servidores, branches | ENTREGA, COMUNICACAO, TAREFA, STATUS, FINANCEIRO |
| **Objetivo** | Continuidade do trabalho técnico | Memória do relacionamento com o cliente |

Não se repetem — uma cuida da obra, a outra do cliente. Esta skill é o maestro que entrega o artefato certo (ou os três) sem o Felipe ter que lembrar qual chamar.

---

## Procedimento

### Passo 0 — Identificar o cliente
Inferir do contexto da sessão qual cliente foi trabalhado. Se ambíguo, **perguntar** ao Felipe.
Se a sessão foi interna (sem cliente), **pular os Passos 1, 2 e 3** — vai direto ao Passo 4 se houver obra pela metade.

### Passo 1 — SEMPRE: atualizar a `FICHA-CLIENTE.md`
Arquivo: `operacao/clientes/arquivos/<Nome> - <Empresa>/FICHA-CLIENTE.md`.

- Acrescentar uma linha datada em **"Entregas realizadas"** (o que foi entregue/feito nesta sessão).
- Reescrever **"Próximos passos"** com o estado atual.
- **NUNCA apagar histórico** — só acrescentar ou atualizar (regra cirúrgica do AGENTS item 3).
- Se a ficha não existir ainda, avisar e sugerir rodar `[[rv-novo-cliente]]` antes.

> Esta é a memória que eu leio no início da próxima sessão. É o passo que fecha o círculo.

### Passo 2 — Atualizar a `<CLIENTE>-TIMELINE.md`
Mesma pasta do cliente. Acrescentar entrada datada do marco da sessão, com link `[[<CLIENTE>-PROJETO]]`.

### Passo 3 — SE for cliente: gerar o texto do VisionFlow
Reaproveitar integralmente a lógica e o **filtro** de `[[rv-visionflow-handoff]]`:

- **VAI:** `STATUS` · `ENTREGA` · `COMUNICACAO` · `TAREFA` · `FINANCEIRO` (só novidade).
- **NÃO VAI:** detalhes técnicos (commits, branches, estrutura), skills/docs internos criados, qualquer coisa já registrada em RELATORIO/TIMELINE/AUDITORIA.

Formato de saída:
```
OBSERVACOES — <Cliente> | <Data>

[TIPO] <Resumo>
<Contexto/detalhes>
<Próximos passos, se houver>
```
**Só exibir** no chat — Felipe copia e cola em Observações do VisionFlow, depois clica "Analisar com IA".

### Passo 4 — SE a obra ficou pela metade: gerar o bilhete técnico
Quando há trabalho em aberto e Felipe vai dar `/clear`, produzir o bilhete no **formato exato** de `[[session-handoff]]`:
chat-only, nunca salva arquivo, caminhos absolutos, seções: Where it started · Decisions locked + what shipped · Key files · Running state · Verification · Deferred + open questions · Pick up here.

### Passo 5 — Confirmar antes de escrever no Company OS
Antes de gravar na ficha/timeline (Passos 1 e 2), **mostrar ao Felipe** o que será escrito e esperar OK (regra 3 do AGENTS).
O texto do VisionFlow (Passo 3) e o bilhete técnico (Passo 4) são sempre só exibidos — Felipe usa manualmente.

---

## Regras herdadas (referenciar, não duplicar)

- Sessão que tocou o banco → seguir pré-voo de `[[rv-visionflow]]` (git status + git pull + MCP conectado).
- Filtro de conteúdo do CRM → `[[rv-visionflow-handoff]]`.
- Formato do bilhete técnico → `[[session-handoff]]`.
- Nunca inventar dados; idioma PT-BR com Felipe; revisar tom contra VOZ.md.
- Ao final, mostrar **links markdown clicáveis** dos arquivos atualizados.

---

## Quando NÃO usar

- Só quero o texto do CRM, sem mexer em arquivo → `rv-visionflow-handoff` direto.
- Só quero o bilhete pra dar `/clear` numa sessão técnica sem cliente → `session-handoff` direto.
- Relatório formal pro cliente em PDF → `rv-relatorio`.

---

*Skill criada em 29/06/2026 — maestro do ciclo de sessão. Ver [[CICLO-Sessao]].*
