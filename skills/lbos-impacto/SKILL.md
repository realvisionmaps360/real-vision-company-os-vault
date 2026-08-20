---
name: lbos-impacto
description: Passo 4 do pipeline LBOS e ponto de parada obrigatório. Responde "o que muda por causa disso?" — percorre as arestas e apresenta a análise ao Felipe ANTES de qualquer atualização. Use depois de `lbos-relacionamentos` e antes de `lbos-atualizacao`. Nunca pular. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Impacto

**Responsabilidade única:** descobrir o que muda. Responde: *o que muda por causa disso?*

Não atualiza nada. Só descobre e apresenta.

> **Esta skill é o ponto de parada do sistema.** Nenhum nó é alterado antes do resultado dela ser mostrado ao Felipe e aprovado. O §36 da spec é explícito: o sistema recomenda, quem decide é ele.

## As seis perguntas (§31)

Todas respondidas. Sempre. Mesmo que a resposta seja "nenhum".

1. Quais projetos são afetados?
2. Quais objetivos dependem disso?
3. Alguma previsão financeira muda?
4. Existe decisão que precisa ser revisada?
5. Existe tarefa nova?
6. Algum risco aumentou ou diminuiu?

## Como descobrir

Percorrer as arestas a partir do nó novo, em profundidade:

```
Nó novo
  → quem ele aponta (frontmatter)
  → quem aponta pra ele (obsidian backlinks)
  → repetir nos vizinhos até parar de encontrar impacto
```

Onde não há aresta, o impacto **não chega**. Isso é feature: se tudo impactasse tudo, o sistema viraria ruído.

## Classificar o impacto (§32)

| Tipo | Exemplo |
|---|---|
| Financeiro | Receita nova muda o fluxo de caixa |
| Operacional | Nasce tarefa |
| Estratégico | Prioridade muda |
| Documental | Contrato precisa de atualização |
| Cronograma | Prazo do casamento muda |
| Risco | Dependência apareceu ou sumiu |

## Formato da apresentação ao Felipe

```markdown
## Análise de impacto — <informação>

**Entra como:** <tipo> · <projeto> · confiabilidade <nível>

| # | Pergunta | Resposta |
|---|---|---|
| 1 | Projetos afetados | |
| 2 | Objetivos dependentes | |
| 3 | Previsão financeira | |
| 4 | Decisões a revisar | |
| 5 | Tarefas novas | |
| 6 | Riscos | |

**Nós a atualizar:** <lista>
**Nós que só recebem referência:** <lista>
**Nós que não mudam:** <lista, com o porquê>

Confirma?
```

## Regras

- **Nunca pular, nunca resumir.** As seis perguntas, sempre
- **Nunca atualizar.** Nem "só um campinho". Atualização é da `lbos-atualizacao`, depois do OK
- **Dizer "nenhum impacto" é resposta válida** e importante. Evita atualização cosmética
- **Confiabilidade `baixa`** entra na apresentação com aviso explícito

## Entrega

A tabela acima, apresentada ao Felipe. Aguardar confirmação. Só então `lbos-atualizacao`.
