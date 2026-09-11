---
name: rv-rotinas-claude
description: Como criar Rotinas (Claude Code/Desktop) da maneira certa para disparos e tarefas agendadas da Real Vision — Local vs Nuvem, template de instruções, e o incidente de duplicidade de 11/09/2026 que originou esta skill. Use quando Felipe pedir para "criar uma rotina", "agendar um disparo", "programar isso pra rodar sozinho" ou for repetir o padrão de disparo automático de email/WhatsApp.
---

# Rotinas Claude — Guia Real Vision

> Nasceu do incidente de 11/09/2026: duas rotinas (uma Local, uma Nuvem) foram criadas
> separadamente para o mesmo disparo (Email 4, campanha 004), ambas agendadas para o mesmo
> horário, chamando a mesma function — risco real de disparo duplicado pros 47 contatos.
> Regra daqui pra frente: **uma tarefa agendada = uma rotina, e ela é sempre Nuvem.**

---

## Local vs Nuvem — a decisão mais importante

| | **Local** | **Nuvem** |
|---|---|---|
| Onde roda | Só com o Claude Desktop aberto e o computador ligado/conectado | Infraestrutura da Anthropic, independente do seu computador |
| Garante o horário? | **Não** — se o PC estiver desligado ou o Desktop fechado na hora marcada, não dispara | Sim |
| Quando usar | Nunca para algo com hora certa que precisa acontecer sem falta (disparo de campanha, cobrança, etc.) | Sempre que o resultado importa de verdade |

**Regra de ouro:** se a tarefa tem um horário que *precisa* acontecer (disparo de email, ação num prazo), a rotina é **Nuvem**, sem exceção. Local só serve para automações de conveniência onde "não rodou hoje, tudo bem, roda amanhã" é aceitável.

---

## Uma tarefa = uma rotina

Nunca crie duas rotinas (Local + Nuvem, ou duas Nuvem) para a mesma tarefa "por garantia". Isso não aumenta a confiabilidade — cria risco de **execução dupla** se as duas rodarem perto uma da outra. A proteção contra duplicidade que existe nas functions (checagem em `email_envios` antes de cada envio) depende de timing e não é garantia absoluta contra corrida.

Antes de criar uma rotina nova, **confira em `claude.ai/code/routines` (ou na aba Rotinas do Desktop) se já não existe uma rotina ativa pra mesma tarefa.** Se existir, edita a existente em vez de criar outra.

---

## Onde criar

- **Claude Desktop:** aba **Code** → **Rotinas** → **Nova rotina** → escolher **Nuvem** (nunca Local para tarefas com hora certa)
- **Terminal (CLI local, fora de sessão web):** comando `/schedule`, ex: `/schedule hoje às 9h, dispara o email 4/4 da campanha 004...` — ele pergunta os detalhes e salva como Nuvem por padrão
- **Não funciona:** de dentro de uma sessão Claude Code na *web* (`claude.ai/code/session_...`) — `/schedule` é bloqueado lá, tem que ser Desktop local ou terminal local

Gerenciar depois: `/schedule list`, `/schedule update`, `/schedule run` no terminal, ou direto na tela da rotina no Desktop/web.

---

## Template de instruções para disparo (email ou WhatsApp)

Baseado no que funcionou no disparo do Email 4 (campanha 004, 11/09/2026). Adapte os nomes de function/arquivo para cada campanha.

```
Você é um agente automatizado, sem acesso a nenhuma conversa anterior. Sua única tarefa
é disparar o [NOME DO CONTEÚDO] via [Supabase Edge Function / mecanismo], que já está
pronto, testado e aprovado pelo Felipe (o fundador).

PASSO 0 - Checar se já foi disparado: antes de qualquer coisa, olhe o arquivo
[caminho do índice/histórico no vault] no repositório clonado. Se já existir registro
de disparo real (não teste) para este envio, NÃO dispare de novo — reporte que já
estava feito e pare aqui.

PASSO 1 - Disparar o envio real (rode via Bash):

curl -s -X POST '[URL da function]' \
  -H 'Authorization: Bearer [anon key pública do projeto Supabase]' \
  -H 'Content-Type: application/json' \
  -d '{"dry_run": false}'

A chave no header Authorization é a chave pública (anon) do projeto Supabase da Real
Vision — não é segredo, pode aparecer em texto puro. A função contém toda a lógica:
envia só para contatos ativos, personaliza por contato, e tem checagem de duplicidade
embutida.

PASSO 2 - Conferir o resultado (JSON: dry_run, total, enviados, pulados, erros,
detalhes). Se 'erros' = 0 e 'enviados' > 0, funcionou. Se 'enviados' = 0 e 'pulados'
= 'total', já tinha sido enviado antes (não é problema). Se 'erros' > 0 ou o curl
falhar, PARE e reporte no resultado final — não tente resolver sozinho nem chamar a
função de novo.

PASSO 3 - Documentar (só se Passo 1 funcionou, 'enviados' > 0 e 'erros' = 0): no
repositório clonado (raiz = vault da Real Vision), edite [arquivo do índice], atualize
a linha/coluna relevante com a data de hoje e o número real de 'enviados', e adicione
uma seção curta registrando data/hora UTC, enviados/pulados/erros, e a frase
"Disparado automaticamente pela rotina agendada [NOME DA ROTINA], criada em [DATA]."

Depois de editar, faça commit (só desse arquivo) e push pro branch main:

git add [arquivo]
git commit -m "docs: registra disparo automático de [NOME]

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push origin main

REGRAS IMPORTANTES: não mexa em nenhum outro arquivo do repositório. Não dispare
nenhum outro envio. Não chame nenhuma outra função do Supabase. Não delete nada. Se
o Passo 1 não funcionar (erro real), NÃO faça o Passo 3 — só relate o problema.
```

**Por que o Passo 0 importa:** é a diferença entre essa versão e a rotina original do
incidente — sem ele, clicar "Executar agora" por engano, ou duas rotinas ativas ao
mesmo tempo, disparam de novo sem checar histórico primeiro (a checagem de duplicidade
da function é por contato, não impede a rotina inteira de rodar de novo à toa).

---

## Checklist antes de ativar uma rotina Nuvem

- [ ] É a única rotina para essa tarefa específica (nenhuma outra ativa cobrindo o mesmo disparo)?
- [ ] Tipo = Nuvem (não Local), se o horário importa de verdade?
- [ ] Repositório certo selecionado (vault da Real Vision)?
- [ ] Instruções incluem o Passo 0 (checar se já foi feito)?
- [ ] Instruções incluem "pare e reporte" em caso de erro, sem tentar de novo sozinho?
- [ ] Horário conferido no fuso certo (America/Sao_Paulo)?
- [ ] Depois de rodar: conferir a execução na aba Rotinas e no histórico do vault?

---

## Relacionados

- [[../rv-email/SKILL|rv-email]] — estratégia e redação de campanhas de email
- `operacao/marketing/email-marketing/campanhas/INDICE-CAMPANHAS.md` — histórico de disparos da campanha 004

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-09-11 | Skill criada | Incidente de duas rotinas (Local + Nuvem) duplicadas para o mesmo disparo do Email 4, campanha 004 — risco de envio duplicado pros 47 contatos identificado antes do disparo |
