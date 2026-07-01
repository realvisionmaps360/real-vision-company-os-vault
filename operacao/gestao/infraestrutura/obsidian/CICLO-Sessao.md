# Ciclo de Sessão — Real Vision

> Índice do hábito de trabalho: como uma sessão de cliente começa, se protege e se encerra.
> Criado em 29/06/2026. Ver também: [[README]] · [[PROTOCOLO-Sessao-Contexto]] · [[REGISTRO-Tecnico]]

---

## O ciclo em uma tela

```
INÍCIO da sessão
   └─ "Vamos trabalhar com [Cliente]"
      → Claude lê a FICHA-CLIENTE.md (via PROTOCOLO-Sessao-Contexto + obsidian-cli)
      → chego sabendo: quem é, serviços, entregas, próximos passos

DURANTE a sessão
   └─ Se mexer no VisionFlow/banco → rv-visionflow protege (pré-voo git + valores válidos)

FIM da sessão
   └─ /rv-fim-sessao  → o maestro faz até 3 coisas:
      1. SEMPRE  → atualiza FICHA-CLIENTE.md + TIMELINE   (memória do próximo início)
      2. cliente → gera o texto do VisionFlow              (estilo rv-visionflow-handoff)
      3. obra a meio → bilhete técnico                     (estilo session-handoff, antes do /clear)
```

O Passo 1 do fim é o que **fecha o círculo**: a ficha que escrevo no fim é a que leio no começo da próxima.

---

## Os três artefatos de fim de sessão

| Artefato | Pra quem | O que tem | Onde mora |
|---|---|---|---|
| **FICHA-CLIENTE.md** | Claude do próximo início | Quem é, serviços, entregas, próximos passos | Pasta do cliente (vault) — permanente |
| **Texto do VisionFlow** | CRM / Felipe | ENTREGA, COMUNICACAO, TAREFA, STATUS, FINANCEIRO | Colado em Observações do VisionFlow |
| **Bilhete técnico** | Próximo Claude (pós-`/clear`) | Planos, tarefas, arquivos mexidos, servidores, branches | Só no chat — nunca vira arquivo |

Os dois primeiros são **memória de relacionamento**; o terceiro é **continuidade técnica**. Não se repetem.

---

## Qual skill faz o quê

| Skill | Papel | Momento |
|---|---|---|
| [[PROTOCOLO-Sessao-Contexto]] | Carrega a FICHA-CLIENTE do cliente | Início |
| `rv-novo-cliente` | Cria pasta + docs + ficha de cliente novo | Cadastro |
| [[rv-visionflow]] | Manual de segurança do CRM (pré-voo git, valores válidos, pitfalls) | Durante (se tocar o banco) |
| `rv-fim-sessao` | **Maestro** — orquestra os 3 artefatos de encerramento | Fim |
| `rv-visionflow-handoff` | Gera só o texto do VisionFlow | Fim (chamado pelo maestro ou direto) |
| `session-handoff` | Gera só o bilhete técnico pré-`/clear` | Fim (chamado pelo maestro ou direto) |

---

## Decisões (29/06/2026)

1. **Escopo do maestro:** só o FIM da sessão. O carregamento de início continua no `PROTOCOLO-Sessao-Contexto` + `obsidian-cli`.
2. **Skills antigas mantidas:** `session-handoff` e `rv-visionflow-handoff` não são apagadas — o `rv-fim-sessao` chama elas por dentro e elas continuam válidas avulsas.
3. **Documentação aqui:** este índice mora na pasta do Obsidian infra, com links `[[ ]]` entre os docs (regra de salvamento com índices).

---

## Conexões
- `rv-fim-sessao` sempre carrega junto com `realvision`.
- Cliente novo → `rv-novo-cliente` cria a estrutura que este ciclo consome.
- Mudou algo no fluxo? Atualizar este doc e o [[PROTOCOLO-Sessao-Contexto]].
