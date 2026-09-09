---
name: rv-pacote-ia-externa
description: Empacota o contexto do Company OS numa pasta descartável em TEMP/ para o Felipe levar a uma IA externa (ChatGPT). Use SEMPRE que ele disser "monta o pacote", "exporta o contexto", "quero levar isso pro ChatGPT", "prepara o material pra outra IA", "pacote de contexto", "vou conversar com a outra IA sobre X", ou /rv-pacote-ia-externa. Copia os arquivos INTEGRAIS (cliente, projeto, institucional, jurídico, nós do LBOS) e escreve um guia de direcionamento endereçado à IA externa, com as regras das skills escritas por extenso e a explicação de como ler frontmatter e wikilinks. Cobre só a IDA — o retorno é regido por LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md. Carregar junto com `realvision`.
---

# rv-pacote-ia-externa

Monta uma pasta descartável em `TEMP/pacote-ia-externa-{YYYY-MM-DD}[-slug]/` com cópias INTEGRAIS de arquivos do Company OS, prontas pra Felipe subir numa IA externa (ChatGPT ou outra). É só a IDA — leve, sem escrita no vault. O retorno segue `LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md`.

## 1. Antes de copiar — perguntar (nunca assumir)

Se o pedido não deixar claro, perguntar em uma mensagem só:

1. **Escopo** — tudo relevante ao assunto, um cliente/projeto específico, ou uma área (marketing, prospecção, cursos, RH...)?
2. **Fonte de e-mail**, se o assunto envolver e-mail — arquivos do vault (`operacao/marketing/email-marketing/`), caixa real do Gmail (via MCP), ou os dois?
3. **Motivo** — o que ele vai fazer com a outra IA (pesquisar, redigir, revisar estratégia)? Ajusta o que entra no guia de direcionamento.

Nunca copiar dado financeiro sensível fora do que já está no vault, nem `.env`/credenciais — mesma regra de `AGENTS.md` §3.

## 2. Estrutura da pasta de saída

```
TEMP/pacote-ia-externa-{YYYY-MM-DD}[-slug]/
├── GUIA-IA-EXTERNA.md          # sempre o primeiro arquivo, ver seção 3
├── contexto/                   # cópia de contexto/EMPRESA.md, VOZ.md (só o que for relevante)
├── operacao/                   # espelha o caminho original de cada arquivo copiado
│   └── ...                     # ex: operacao/marketing/email-marketing/README.md
└── lbos/                       # só se o assunto tocar o LBOS — nós relevantes, nunca a spec congelada
```

- Preserva o caminho relativo original dentro da subpasta (`operacao/...`, `lbos/...`) — assim a IA externa consegue citar "o arquivo X" e Felipe acha na hora de reintegrar.
- Cópia é sempre INTEGRAL do arquivo — nunca resumir ou truncar no ato de copiar. Se um arquivo for grande demais pra fazer sentido (ex: export CSV de milhares de linhas), avisar Felipe em vez de cortar sozinho.
- Nunca copiar `LBOS-v1.0.md` (spec congelada) nem qualquer `.env`.

## 3. `GUIA-IA-EXTERNA.md` — o que sempre tem

Modelo (adaptar ao escopo real do pacote):

```markdown
# Guia para IA Externa — Pacote Real Vision 360

Você está ajudando o Felipe Garcia (fundador da Real Vision 360) a pensar/pesquisar
sobre [assunto]. Isso é uma cópia de trabalho do Company OS dele — um vault Obsidian
que é a fonte de verdade da empresa, normalmente operado por Claude Code.

## Sua função aqui
1. Ajudar a pensar, pesquisar, redigir ou organizar — o que o Felipe pedir.
2. NÃO inventar dado (cliente, preço, prazo, status) que não esteja nestes arquivos
   ou que ele não disser agora. Se faltar informação, pergunte.
3. Marcar claramente o que é fato dos arquivos, o que é pesquisa sua, e o que é
   hipótese não confirmada.
4. Quando ele pedir, gerar um documento de saída (handoff) que o Claude Code vai
   ler depois — sem decidir estrutura de dados por conta própria.

## Como ler estes arquivos
- Frontmatter (bloco `---` no topo de um .md) é metadado estruturado: id, tipo,
  status, datas, tags. Trate como dado, não como texto de leitura corrida.
- `[[nome-do-arquivo]]` é um wikilink — referência a outro nó do vault. Se o arquivo
  referenciado não estiver neste pacote, ele existe no Company OS mas não foi
  copiado agora; não invente o conteúdo dele.
- Cada pasta pode ter um documento raiz (README.md, FICHA-CLIENTE.md, CONCEITO.md)
  que serve de hub — os outros arquivos da pasta linkam pra ele.

## Regras das skills que geraram este material (resumo por extenso)
- Fonte Única: um dado tem um dono; o resto referencia, nunca duplica.
- Zero invenção: dado de negócio (cliente, preço, prazo) só existe se estiver
  escrito nos arquivos ou vier do Felipe agora.
- Nunca apagar: histórico de decisão fica registrado, não é substituído.
- Mudança cirúrgica: cada alteração sugerida deve ser rastreável ao pedido.

## Escopo deste pacote
[lista dos arquivos copiados, agrupados por área, com uma linha dizendo o que cada
grupo cobre]

## O que fazer no fim da sessão
Quando a conversa terminar, gere um documento de handoff .md com:
1. Instrução principal ao Claude Code (não recriar entidade existente, não inventar
   vocabulário, mostrar conflito em vez de resolver sozinho)
2. Contexto operacional da sessão em uma frase
3. Um bloco por assunto — fato confirmado / pesquisa / hipótese / o que já foi feito
4. Backlog resumido por prioridade
5. Nota de procedência (mistura fato + pesquisa + hipótese, confiabilidade varia)

Entregue esse documento pro Felipe colar de volta numa sessão de Claude Code.
```

Ajustar o guia ao escopo real — se não envolve o LBOS, tirar a seção de vocabulário fechado do LBOS; se envolve, referenciar `HANDOFF-IA-EXTERNA.md` explicitamente.

## 4. Fechamento

- Listar pro Felipe, em markdown, o caminho da pasta gerada e os arquivos que entraram (agrupados por área).
- Lembrar que é descartável: fica em `TEMP/`, ele pode apagar depois de usar.
- Não commitar nada — isso é conteúdo de trabalho, não pertence ao histórico do vault.

## Relacionados

- Retorno da IA externa pro sistema: `LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md`
- Skill mestre: `realvision`
