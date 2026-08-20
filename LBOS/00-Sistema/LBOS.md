---
id: SIS-2026-000
tipo: processo
nome: LBOS — Life & Business Operating System
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-09-06
versao_lbos: "1.0"
fase_atual: "1 — Fundação"
fonte_unica: true
referencia: ["[[AGENTS]]"]
tags: [lbos/sistema, lbos/raiz]
---

# LBOS — Life & Business Operating System

Cérebro externo do Felipe e da Romana. Um único lugar onde vida pessoal, finanças, documentação e negócios se conectam — para que nenhuma decisão seja tomada sem o contexto todo.

Versão vigente: **1.0** · Fase atual: **1 — Fundação**

---

## Comece por aqui

| Documento | Para quê |
|---|---|
| [[ARQUITETURA]] | Como o sistema funciona na prática |
| [[CONVENCOES]] | Como escrever um nó corretamente |
| [[LBOS-v1.0]] | A especificação oficial, congelada |
| [[VERSIONAMENTO]] | Como o sistema evolui sem se quebrar |
| [[FLUXO-DOCUMENTO-VIVO]] | Os 7 passos que tornam o sistema vivo |
| [[SINCRONIA-GIT]] | Como sincronizar Suíça ↔ Brasil |
| [[HANDOFF-IA-EXTERNA]] | Como trazer uma sessão de IA externa (ChatGPT etc.) pro LBOS |

---

## Índice global (§24)

### 00 — Sistema
O sistema falando de si mesmo. Spec, arquitetura, convenções, templates, dashboards.

### 01 — Objetivos
Só objetivos. Nunca tarefas. Anual, trimestral, mensal, financeiro, pessoal.

### 02 — Projetos
Cada projeto com o mesmo esqueleto. Vida própria, contexto compartilhado.
`casamento` · `real-vision` · `sunbite`

### 03 — Financeiro
Fonte única de qualquer valor. Nenhum outro documento repete número — todos referenciam.

### 04 — Documentos
Armazenamento puro. Certidões, contratos, traduções, notas. Zero interpretação.

### 05 — Conhecimento
A wiki. Processos, tutoriais, aprendizados, pesquisa, legislação.

### 06 — Pessoas
Quem importa e como se conecta ao resto.

### 07 — Operação
A porta de entrada. `inbox/` recebe tudo que ainda não foi classificado.

### 08 — Decisões
Toda decisão relevante, rastreável: problema, alternativas, motivo, impacto, revisão.

### 09 — Arquivo
Encerrados. Nada é apagado, só aposentado.

---

## Os cinco princípios (§5)

**Fonte Única da Verdade** — uma informação existe em um lugar só. O resto referencia.

**Documento Vivo** — nenhum documento está pronto. Todos evoluem.

**Atualização Inteligente** — informação nova dispara a pergunta: o que mais muda por causa disso?

**Contexto Compartilhado** — um cliente novo da Real Vision pode mexer no cronograma do casamento. E deve.

**Histórico** — nenhuma decisão importante se perde.

---

## A regra que sustenta tudo

> Relação estrutural vai no frontmatter. Menção contextual vai no corpo.

Se a conexão está só no texto, é prosa: você entende, a máquina não propaga. Se está no frontmatter, é aresta do grafo: entra nas Bases, na análise de impacto, no raciocínio da IA.

---

## Fluxo de entrada

Nenhuma informação entra solta.

```
inbox → classificar → identificar entidades → mapear relações
      → analisar impacto → atualizar o que muda → registrar
```

O sistema **recomenda**. Quem decide é o Felipe.

---

## Estado da implementação

| Fase | O que entrega | Status |
|---|---|---|
| 0 — Higiene | Cofre limpo e indexado | ✅ concluída |
| 1 — Fundação | Estrutura, convenções, 15 templates | ✅ concluída |
| 2 — Entidades | Primeiros nós reais e arestas | ✅ concluída |
| 3 — Documento Vivo | Fluxo de 7 passos + 3 Bases | ✅ construída · validação pendente |
| 4 — Skills | 9 skills do pipeline + skill mestre | ✅ concluída |
| 5 — Missão 1 | Absorção de `Felipe Garcia/` | ⬜ aguarda decisão sobre a regra 6 do `AGENTE.md` |

---

## Fronteira com o Company OS

O LBOS mora no mesmo cofre que o Company OS e **referencia** ele — nunca move, nunca reescreve. `operacao/`, `contexto/`, `skills/` e [[AGENTS]] seguem as próprias regras.

Mesmo cofre significa mesmo grafo. Era essa a razão da escolha: cofre separado quebraria todo link entre vida e negócio, que é exatamente o que o sistema existe para criar.

---

## Relacionados

- Regido por: [[LBOS-v1.0]]
- Implementado por: [[ARQUITETURA]]
- Normatizado por: [[CONVENCOES]]
- Versionado por: [[VERSIONAMENTO]]
- Referencia: [[AGENTS]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Nó raiz criado | Fase 1 — Fundação | Ponto de entrada do sistema para humanos e IA | LBOS no mesmo cofre do Company OS, referenciando sem absorver |
