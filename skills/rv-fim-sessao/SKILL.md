---
name: rv-fim-sessao
description: Maestro de fim de sessão da Real Vision 360 — e ponto de entrada padrão pra "handoff"/"session handoff" dentro do contexto Real Vision. Use SEMPRE que Felipe disser "fim de sessão", "encerrar sessão", "vamos encerrar", "fechar a sessão do cliente X", "terminamos por hoje", "wrap up", "handoff", "session handoff", ou /rv-fim-sessao. Orquestra os artefatos de encerramento conforme o assunto da sessão: (1) cliente RV → SEMPRE atualiza FICHA-CLIENTE.md + TIMELINE do cliente + texto do VisionFlow; (2) projeto interno RV ou assunto pessoal do Felipe → SEMPRE grava documentação permanente (TIMELINE do projeto + playbook de conhecimento reutilizável, se houver + atualização da skill relacionada); (3) fora do escopo RV/pessoal → sugere organização, não presume; (4) em qualquer caso, se a obra ficou pela metade, complementa com o bilhete técnico efêmero estilo session-handoff. Carregar sempre junto com a skill realvision.
---

# Skill: rv-fim-sessao — Maestro de Fim de Sessão

> Um único comando que fecha a sessão direito. Decide o que produzir conforme o assunto tratado.
> Carregue sempre junto com `realvision`. Índice do ciclo completo em [[CICLO-Sessao]].

---

## A ideia em uma frase

No início da sessão eu **leio** a documentação existente (FICHA-CLIENTE.md pra cliente, ou TIMELINE/README do projeto pra assunto interno/pessoal).
No fim da sessão eu **escrevo** de volta nela — assim a próxima sessão começa sabendo de tudo, e o conhecimento reutilizável vira parte permanente do Company OS (não fica preso num chat que será limpo). O círculo fecha.

---

## As peças que isso orquestra

| | `session-handoff` | `rv-visionflow-handoff` | Documentação permanente (esta skill) |
|---|---|---|---|
| **Pra quem** | Próximo Claude (depois de `/clear`), continuidade técnica no meio de uma tarefa | VisionFlow / Felipe | Company OS — memória permanente, reutilizável, pode virar conteúdo ou oferta futura |
| **Saída** | Bilhete técnico no chat (nunca salva arquivo) | Texto pra colar em Observações do CRM | Arquivos `.md` gravados (TIMELINE, playbook, skill) |
| **Conteúdo** | Planos, tarefas, arquivos mexidos, servidores, branches | ENTREGA, COMUNICACAO, TAREFA, STATUS, FINANCEIRO | O que foi feito/decidido + conhecimento reutilizável descoberto |
| **Quando aparece** | Só se sobrou trabalho técnico pela metade antes de um `/clear` | Só sessão de cliente | Sempre, pra qualquer sessão dentro de RV ou do âmbito pessoal do Felipe |

Não se sobrepõem — cada peça cobre uma coisa. `session-handoff` continua existindo exatamente como sempre foi (efêmero, chat-only) — ele é **complementar** à documentação permanente, nunca o único artefato de uma sessão interna/pessoal como era antes.

---

## Procedimento

### Passo 0 — Identificar o assunto da sessão

Classificar em uma das quatro categorias abaixo antes de decidir o que fazer:

1. **Cliente RV** → Passos 1, 2, 3 (inalterados, ver abaixo).
2. **Projeto interno RV** (ex: campanha de tráfego, jogo da Terra, VisionFlow, site institucional) **ou assunto pessoal do Felipe** (pasta `Felipe Garcia/` — finanças, viagens, contratos pessoais) → Passo 1b (documentação permanente de projeto).
3. **Fora do escopo RV/pessoal** (assunto que não pertence a nenhuma estrutura existente do Company OS) → **não presumir pasta nem criar nada**. Sugerir ao Felipe uma forma de organizar aquilo e perguntar antes de gravar qualquer arquivo.
4. **Em qualquer uma das três categorias acima, meio complementar:** se restou trabalho técnico pela metade e o Felipe vai dar `/clear`, gerar *também* o bilhete efêmero (Passo 4) — nunca substitui o que foi decidido nas categorias 1-3, sempre soma.

Se ambíguo entre as categorias, **perguntar** ao Felipe.

### Passo 1 — SE for cliente: atualizar a `FICHA-CLIENTE.md`
Arquivo: `operacao/clientes/arquivos/<Nome> - <Empresa>/FICHA-CLIENTE.md`.

- Acrescentar uma linha datada em **"Entregas realizadas"** (o que foi entregue/feito nesta sessão).
- Reescrever **"Próximos passos"** com o estado atual.
- **NUNCA apagar histórico** — só acrescentar ou atualizar (regra cirúrgica do AGENTS item 3).
- Se a ficha não existir ainda, avisar e sugerir rodar `[[rv-novo-cliente]]` antes.

> Esta é a memória que eu leio no início da próxima sessão. É o passo que fecha o círculo.

### Passo 2 — SE for cliente: atualizar a `<CLIENTE>-TIMELINE.md`
Mesma pasta do cliente. Acrescentar entrada datada do marco da sessão, com link `[[<CLIENTE>-PROJETO]]`.

Também perguntar/estimar quanto tempo foi investido na sessão e acrescentar uma linha na tabela `## Tempo investido` (criar a seção se ainda não existir). Objetivo: acumular histórico de horas por cliente para calcular o custo/hora real do Felipe como programador. Regra ativa desde 30/06/2026 — ver exemplo em `Alexis Lafatas - Lafatas Grafik/TIMELINE.md`.

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

### Passo 1b — SE for projeto interno RV ou assunto pessoal: gravar documentação permanente

Isso substitui, pra esse tipo de sessão, o que antes só virava bilhete efêmero perdido no chat. Segue o mesmo padrão já usado em `jogo-da-terra/` (README índice + TIMELINE + `docs/DECISOES.md`) e criado nesta sessão para `campanha-google-ads-slm-llm/` (TIMELINE + PLAYBOOK).

1. **Localizar a pasta do projeto/assunto.** Se não existir ainda, perguntar ao Felipe o nome/local antes de criar — nunca inventar caminho.
2. **Convenção de pasta:** um documento-índice (`README.md` ou dossiê do projeto) + `TIMELINE.md`. Se o projeto já tiver essa estrutura, reaproveitar; não recriar do zero.
3. **Sempre:** acrescentar uma entrada datada na `TIMELINE.md` com o que foi feito/decidido nesta sessão — o quê, por quê, o que ficou pendente. Nunca apagar entradas anteriores.
4. **Só se a sessão gerou conhecimento reutilizável** (um processo descoberto na marra, uma pegadinha de plataforma resolvida, uma decisão que vai se repetir em sessões futuras — teste Ponytail: não documentar sessão trivial que não vai ser consultada de novo):
   - Criar ou atualizar um documento de conhecimento na mesma pasta (playbook, `DECISOES.md`, ou o nome que já for convenção naquele projeto).
   - Atualizar a skill relacionada com esse aprendizado (a skill existente do projeto/tema, ou propor criar uma nova via `rv-skill-scout` se não houver nenhuma ainda) — resumo do que foi aprendido + link de volta pra pasta/documento.
5. **Reverse-link pasta↔skill:** garantir que o documento-índice do projeto tenha uma linha apontando pra skill responsável (ex: `> Skill desta pasta: \`rv-trafego-pago\``). Hoje o vínculo só existe num sentido (skill → pasta); esse passo fecha o outro sentido. Se o documento-índice ainda não tiver essa linha, adicionar.
6. Confirmar com o Felipe antes de gravar (mesma regra de aprovação do Passo 5).

### Passo 4 — SE a obra ficou pela metade: gerar o bilhete técnico (complementar, qualquer categoria)
Quando há trabalho em aberto e Felipe vai dar `/clear`, produzir o bilhete no **formato exato** de `[[session-handoff]]`:
chat-only, nunca salva arquivo, caminhos absolutos, seções: Where it started · Decisions locked + what shipped · Key files · Running state · Verification · Deferred + open questions · Pick up here.

Isso soma à documentação permanente (Passos 1-3 ou 1b) — nunca a substitui.

### Passo 5 — Confirmar antes de escrever no Company OS
Antes de gravar em qualquer arquivo permanente (FICHA/TIMELINE de cliente no Passo 1-2, ou TIMELINE/playbook/skill de projeto no Passo 1b), **mostrar ao Felipe** o que será escrito e esperar OK (regra 3 do AGENTS).
O texto do VisionFlow (Passo 3) e o bilhete técnico (Passo 4) são sempre só exibidos — Felipe usa manualmente, nunca viram arquivo.

### Passo 6 — Sincronizar com o GitHub (auto-commit + push)
Após todas as gravações e confirmações do Felipe, **rodar o script de sync do vault**:

```
bash ~/.hermes/scripts/vault-sync.sh
```

O script:
- Só comita se houver mudanças (seguro contra execução sem trabalho)
- Usa a mensagem `vault auto-sync · <data>` no commit
- Pusha silenciosamente para o GitHub
- O cron job de 1h já protege contra sessões interrompidas; este passo garante o sync **imediato** ao fechar a sessão

**Mensagem ao Felipe após o sync:** `✅ Vault sincronizado com o GitHub.`

---

## Regras herdadas (referenciar, não duplicar)

- Sessão que tocou o banco → seguir pré-voo de `[[rv-visionflow]]` (git status + git pull + MCP conectado).
- Filtro de conteúdo do CRM → `[[rv-visionflow-handoff]]`.
- Formato do bilhete técnico → `[[session-handoff]]` (continua existindo como componente efêmero — chat-only, nunca grava arquivo, mesmo comportamento de sempre).
- Nunca inventar dados; idioma PT-BR com Felipe; revisar tom contra VOZ.md.
- Filosofia Ponytail (simplicidade) aplica ao Passo 1b: nem toda sessão gera um playbook — só quando há conhecimento genuinamente reutilizável.
- Ao final, mostrar **links markdown clicáveis** dos arquivos atualizados.

---

## Quando NÃO usar

- Só quero o texto do CRM, sem mexer em arquivo → `rv-visionflow-handoff` direto.
- Relatório formal pro cliente em PDF → `rv-relatorio`.
- Assunto claramente fora da Real Vision e do âmbito pessoal do Felipe, sem nenhuma estrutura de pasta prévia → esta skill ainda é o ponto de entrada, mas o resultado é uma sugestão de organização, não uma gravação automática.

---

*Skill criada em 29/06/2026 — maestro do ciclo de sessão. Ampliada em 12/07/2026 pra cobrir documentação permanente de projetos internos e assuntos pessoais, não só clientes. Ver [[CICLO-Sessao]].*
