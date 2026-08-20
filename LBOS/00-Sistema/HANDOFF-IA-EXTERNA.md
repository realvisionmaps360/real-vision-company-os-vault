---
id: SIS-2026-007
tipo: processo
nome: Handoff de IA Externa para o LBOS
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-10
atualizado_em: 2026-08-10
proxima_revisao: 2026-11-06
versao_lbos: "1.0"
fonte_unica: true
pertence_a: ["[[LBOS]]"]
referencia: []
tags: [lbos/sistema, lbos/processo]
---

# Handoff de IA Externa para o LBOS

Como levar uma conversa de raciocínio/pesquisa feita fora do Claude Code (ChatGPT ou outra IA) até o LBOS, sem perder informação e sem quebrar o fluxo do Documento Vivo. Nasceu da sessão de 10/08/2026, que fez isso manualmente pela primeira vez e funcionou.

---

## 1. Quando usar

Felipe usa uma IA externa como oficina de raciocínio — despeja ideias, pesquisa, amadurece hipóteses. No fim, quer trazer isso pro LBOS sem reconstruir do zero nem perder o que já foi decidido/pesquisado na conversa.

```
conversa bruta → handoff estruturado → Claude Code inspeciona o vault
      → fluxo do Documento Vivo → impacto → aprovação → integração
```

Isso **não substitui o Inbox** — é uma forma externa de produzir entrada pra ele.

---

## 2. O que mandar pra IA externa no início da sessão

**Sempre:**

| Arquivo | Por quê |
|---|---|
| [[LBOS]] | Nó raiz, contexto geral |
| [[ARQUITETURA]] | Como o grafo funciona |
| [[CONVENCOES]] | Vocabulário fechado — sem isso a IA externa inventa relação/status |
| [[FLUXO-DOCUMENTO-VIVO]] | Os 7 passos, pra ela saber que existe um processo do outro lado |
| Este documento (`HANDOFF-IA-EXTERNA`) | O molde de saída que ela deve seguir |

**Só se a sessão for claramente sobre Real Vision:** `contexto/EMPRESA.md`, `contexto/VOZ.md` — não mandar por padrão, só quando o assunto pedir.

**Nunca mandar:** `LBOS-v1.0.md` (spec congelada, não é pra IA externa editar nem opinar sobre ela), dado financeiro sensível fora do que já está no vault.

---

## 3. Mensagem inicial pra colar na IA externa

```
Você está me ajudando a pensar/pesquisar sobre [assunto]. Isso vai
depois virar entrada pro meu sistema pessoal (LBOS), operado por outra
IA (Claude Code) que segue regras rígidas de não inventar dado e não
duplicar entidade.

Anexei os documentos que definem como esse sistema funciona. Sua
função aqui é:
1. Me ajudar a pensar, pesquisar e organizar o raciocínio
2. NÃO decidir estrutura do LBOS, NÃO inventar tipo de entidade,
   status ou relação — isso é vocabulário fechado (ver CONVENCOES)
3. Marcar claramente o que é fato que eu disse, o que é pesquisa sua,
   e o que é hipótese não confirmada
4. No fim da sessão, quando eu pedir, gerar um documento .md de
   handoff seguindo o modelo da seção 4 do HANDOFF-IA-EXTERNA
```

---

## 4. Molde do documento de handoff de saída

Estrutura que funcionou na sessão de 10/08/2026 (`TEMP/handoff-chatgpt-claude-code-lbos-2026-08-10.md`):

1. **Instrução principal ao Claude Code** — ler os documentos-âncora antes de mexer em qualquer coisa; não recriar entidade existente; não editar a spec congelada; não inventar vocabulário; preservar a fronteira com o Company OS; mostrar conflito em vez de escolher sozinho; nunca inventar ID; não fazer operação remota sem autorização
2. **Contexto operacional da sessão** — o que essa conversa foi, em uma frase
3. **Um bloco por assunto** — cada tema da conversa vira uma seção própria, com o que é fato confirmado, o que é pesquisa, o que é hipótese, e o que já foi executado (pra não recriar tarefa que já foi feita)
4. **Backlog resumido** — lista curta agrupada por prioridade/área, no fim do documento
5. **Análise de impacto que o Claude deve executar** — lembrete das 6 perguntas do §31, mesmo que redundante com o FLUXO-DOCUMENTO-VIVO
6. **Controle de qualidade** — duplicata, ID, status, relação, wikilink, órfão, fonte única
7. **Resultado esperado** — deixar explícito que o Claude Code deve **diagnosticar antes de alterar** e só integrar depois do OK
8. **Nota de procedência** — deixar claro que o documento mistura fato, pesquisa e hipótese, e que confiabilidade varia por item

---

## 5. O que acontece do lado do Claude Code

Já documentado em [[FLUXO-DOCUMENTO-VIVO]] — o handoff vira entrada no `07-Operacao/inbox/`, passa pelos 7 passos, para no passo 5 (impacto) até o Felipe aprovar, só então atualiza e arquiva a nota crua em `09-Arquivo/`.

**Regra crítica:** o handoff nunca é fonte soberana sobre o vault. É entrada. Quem manda é o estado real do repositório e as regras do LBOS — se o handoff disser uma coisa e o vault disser outra, o conflito é mostrado, não resolvido em silêncio.

---

## Relacionados

- Pertence a: [[LBOS]]
- Implementa: [[FLUXO-DOCUMENTO-VIVO]]
- Normatizado por: [[CONVENCOES]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-10 | Documento criado | Felipe gostou do resultado do primeiro handoff externo (ChatGPT → Claude Code) e pediu pra formalizar o processo, melhorado, pra próxima vez | Sessões futuras de IA externa já começam sabendo o que anexar e que formato de saída produzir | Lista mínima de anexos fixada em 4 documentos + este; Company OS só entra se o assunto for Real Vision |
