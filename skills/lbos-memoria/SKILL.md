---
name: lbos-memoria
description: Skill auxiliar do LBOS. Responde "isso já aconteceu antes?" — busca no grafo por precedentes, decisões relacionadas e documentos parecidos antes de criar qualquer coisa nova. Use no início de qualquer tarefa no LBOS e sempre que houver risco de duplicar trabalho. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Memória

**Responsabilidade única:** evitar repetição.

Responde quatro perguntas:

- Isso já aconteceu antes?
- Existe documento parecido?
- Existe decisão relacionada?
- Já resolvemos esse problema?

## Quando rodar

**Antes** de criar qualquer nó. Sempre. É mais barato descobrir que já existe do que descobrir depois que duplicou.

Também quando o Felipe pergunta "a gente já viu isso?" ou parece estar reabrindo uma decisão fechada.

## Como buscar

```bash
obsidian search query="<termo>"
obsidian backlinks file="<no-relacionado>"
```

Buscar por: nome da entidade, sinônimos, pessoa envolvida, projeto, valor, data aproximada.

Ampliar antes de concluir que não existe. Nome diferente para a mesma coisa é a causa mais comum de duplicata.

## Onde procurar precedente

| Onde | O quê |
|---|---|
| `08-Decisoes/` | Decisão já tomada sobre isso |
| `09-Arquivo/` | Versão antiga, projeto encerrado |
| `05-Conhecimento/` | Aprendizado registrado |
| `## Histórico` dos nós | Quando e por que mudou |
| Company OS | Contexto de negócio |

## Decisão reaberta

Se o Felipe está reabrindo algo já decidido, mostrar a decisão original com **problema, motivo e data** — e a data de revisão.

Não é para travar mudança. É para ele decidir com o raciocínio antigo na mão, em vez de refazê-lo do zero. Às vezes o motivo original continua válido; às vezes venceu. As duas coisas só aparecem se alguém mostrar.

## Regras

- **Nunca afirmar "não existe" sem ter buscado** por pelo menos três termos diferentes
- **Precedente não é ordem.** Mostrar, não impor
- **Memória recuperada reflete o que era verdade quando foi escrita.** Checar se ainda vale antes de recomendar

## Entrega

Lista de precedentes com data, onde está e o que dizia. Ou "nada encontrado", com os termos buscados.
