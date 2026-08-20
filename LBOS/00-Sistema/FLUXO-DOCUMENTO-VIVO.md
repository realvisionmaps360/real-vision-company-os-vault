---
id: SIS-2026-005
tipo: processo
nome: Fluxo do Documento Vivo
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-11-06
versao_lbos: "1.0"
fonte_unica: true
pertence_a: ["[[LBOS]]"]
tags: [lbos/sistema, lbos/processo]
---

# Fluxo do Documento Vivo

O que transforma uma pasta organizada em sistema vivo. Implementa a Parte 4 da spec (§27 a §40).

**Este fluxo é obrigatório.** Toda informação que entra no LBOS passa pelos sete passos, sem atalho.

---

## Os sete passos

```
1. Entrada          → 07-Operacao/inbox/
2. Classificação    → tipo, projeto, prioridade, confiabilidade
3. Entidades        → quais nós existem, quais precisam nascer
4. Relações         → arestas tipadas
5. IMPACTO          → as 6 perguntas · ponto de parada obrigatório
6. Atualização      → só onde há impacto real
7. Registro         → histórico + sugestões
```

---

## 1. Entrada

Informação bruta cai em `07-Operacao/inbox/`, com data no nome: `2026-08-06-assunto.md`.

Registrar precisa ser barato. Se custar esforço, o Felipe não registra, e o sistema morre de fome.

Nesta etapa **não se organiza nada** — só se captura.

## 2. Classificação (§30)

Campos mínimos antes de qualquer coisa:

| Campo | Pergunta que responde |
|---|---|
| `tipo` | Que entidade isso é? |
| `projeto` | A que projeto pertence? |
| `prioridade` | `alta` · `media` · `baixa` |
| `confiabilidade` | `alta` · `media` · `baixa` — quão confiável é a fonte? |
| `origem` | De onde veio? |
| `data` | Quando aconteceu? |

`confiabilidade` existe para separar "o consulado confirmou por escrito" de "ouvi dizer". Dado de baixa confiabilidade entra, mas marcado — e nunca vira base de decisão sem checagem.

## 3. Identificar entidades

A informação vira um ou mais nós. Antes de criar qualquer coisa, procurar: já existe nó para isso?

Criar duplicata é o pior erro possível neste sistema — quebra a Fonte Única na origem.

## 4. Mapear relações

Arestas tipadas no frontmatter, usando **só** o vocabulário de [[CONVENCOES]].

Precisa de um verbo que não existe? Para. Propõe em [[CONVENCOES]]. Não inventa no arquivo.

## 5. Análise de impacto (§31) — ponto de parada

**Seis perguntas. Todas respondidas. Sempre.**

1. Quais projetos são afetados?
2. Quais objetivos dependem disso?
3. Alguma previsão financeira muda?
4. Existe decisão que precisa ser revisada?
5. Existe tarefa nova?
6. Algum risco aumentou ou diminuiu?

O impacto se classifica em: **financeiro** · **operacional** · **estratégico** · **documental** · **cronograma** · **risco** (§32).

> **Trava do sistema:** o resultado desta análise é apresentado ao Felipe **antes** do passo 6. Nenhum nó é alterado sem isso. O §36 é explícito — o sistema recomenda, quem decide é ele.

## 6. Atualização seletiva (§33)

Só se atualiza onde há impacto real. Propagação segue as arestas; onde não há aresta, o impacto não chega.

```
Receita confirmada
      ↓ impacta
Fluxo de Caixa
      ↓ financia
OBJ-casamento-suica
      ↓ afeta
Cronograma
```

A Sunbite não aparece porque não existe aresta ligando ela a essa receita. Isso é proposital: se tudo atualizasse tudo, o sistema viraria ruído e ninguém confiaria mais nele.

**Nunca duplicar.** Se o dado já tem dono (`fonte_unica: true`), os outros nós recebem referência, não cópia.

## 7. Registro e sugestões (§34, §36)

Cada nó tocado ganha linha no `## Histórico`:

| Data | O que mudou | Motivo | Impacto | Decisão |

Decisão relevante vira arquivo em `08-Decisoes/`.

E o sistema sugere — nunca executa:

> A meta financeira foi atingida. Antecipar o pagamento do consulado?
> A certidão vence em 5 dias e o consulado ainda não foi agendado.

---

## Verificação de consistência (§35)

Depois de toda atualização, cinco checagens:

- Existe informação conflitante?
- Existe documento desatualizado?
- Existe entidade sem nenhuma relação?
- Existe objetivo sem responsável?
- Existe decisão que deixou de valer?

O que falhar vira pendência em `07-Operacao/`. As Bases em `00-Sistema/bases/` automatizam parte disso.

---

## Exemplo completo (§39)

**Evento:** contrato novo fechado pela Real Vision.

1. Nota crua no inbox
2. Classificar: tipo `receita`, projeto `real-vision`, prioridade alta
3. Criar `REC-2026-0NN`; cliente já existe no Company OS
4. Arestas: `pertence_a` Real Vision · `originada_por` cliente · `financia` OBJ-casamento-suica
5. **Impacto:** fluxo de caixa sobe · meta do casamento antecipa · taxas do consulado podem ser pagas antes · nasce tarefa de emissão de nota → **apresentar ao Felipe**
6. Após o OK: atualizar fluxo de caixa e recalcular a previsão do objetivo
7. Registrar em cada nó tocado; abrir decisão se o cronograma mudou

Nenhuma etapa exigiu digitar o mesmo número duas vezes. Tudo derivou das arestas.

---

## Relacionados

- Pertence a: [[LBOS]]
- Normatizado por: [[CONVENCOES]]
- Implementa: [[LBOS-v1.0]]
- Executado em: [[INBOX]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Fase 3 do LBOS | Torna o sistema vivo em vez de só organizado | Passo 5 é ponto de parada obrigatório: nada muda sem o Felipe ver o impacto |
