---
name: lbos-entrada
description: Passo 1 do pipeline LBOS. Recebe qualquer informação bruta e transforma em nota estruturada no inbox, sem classificar nem organizar. Use quando Felipe jogar informação solta — ideia, recado, valor, decisão tomada, novidade de cliente — e ela precisar entrar no LBOS. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Entrada

**Responsabilidade única:** transformar informação bruta em nota estruturada no inbox.

Não classifica. Não relaciona. Não analisa impacto. Não atualiza nada.

## O que fazer

1. Criar `LBOS/07-Operacao/inbox/AAAA-MM-DD-assunto-curto.md`
2. Registrar a informação **como veio**, sem interpretar
3. Preencher só três campos: `data`, `origem`, `confiabilidade`
4. Passar adiante para `lbos-classificacao`

## Modelo

```markdown
---
data: 2026-08-06
origem: conversa com o Felipe
confiabilidade: alta
---

Texto solto, do jeito que chegou.
```

## Confiabilidade

| Valor | Quando |
|---|---|
| `alta` | Documento oficial, e-mail recebido, o Felipe afirmou |
| `media` | Terceiro confiável, pesquisa própria |
| `baixa` | Ouvi dizer, estimativa, suposição |

Marcar `baixa` não impede a entrada. Impede que vire base de decisão sem checagem.

## Regras

- **Não interpretar.** "Achei que ele quis dizer X" não entra. O que ele disse, entra
- **Não descartar.** Informação que parece irrelevante hoje vira contexto em dois meses
- **Não classificar.** Não é seu trabalho. `tipo`, `projeto` e `prioridade` vêm no passo 2
- **Valor sensível nunca aqui.** Senha, token, chave — apontar o caminho do `.env`, nunca registrar

## Entrega

Caminho da nota criada + uma frase do que foi capturado. Nada mais.
