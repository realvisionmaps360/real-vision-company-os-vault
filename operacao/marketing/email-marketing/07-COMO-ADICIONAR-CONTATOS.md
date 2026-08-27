# 07 — Como adicionar gente na lista (processo permanente)

> A lista é o ativo. O email é só o que sai dela. Este documento é o processo fixo de entrada de
> contato novo — vale pra amigo, cliente, lead de formulário e indicação. Não tem exceção.

---

## A regra que não se quebra

**Ninguém entra na lista sem ter dito que quer.** Não é frescura legal, é sobrevivência técnica:
quem não pediu marca como spam, e reclamação de spam acima de 0,3% derruba a entregabilidade de
todo mundo — inclusive dos clientes que pediram. Uma pessoa irritada custa mais do que dez
contatos a mais valem.

Consentimento não precisa de formulário assinado. Precisa de um **sim rastreável**: um "pode
mandar" no WhatsApp já serve, desde que fique registrado de quem veio e quando.

---

## Caminho 1 — amigos e conhecidos (o teu caso agora)

O jeito certo é o mais simples: **pergunta antes**. Manda a mensagem, espera o sim, aí adiciona.

Pedir permissão não é só cumprir regra. É o primeiro contato quente: quem responde "manda sim"
abre o primeiro email com expectativa, não com estranhamento.

### Mensagem pra mandar (WhatsApp)

> Fala [NOME], beleza?
>
> Tô começando a mandar um email a cada 5 dias sobre presença digital — como negócio local
> aparece no Google, o que muda com IA, essas coisas. Curto, uma ideia por email, sem encher.
>
> Posso te incluir? Se não for teu tema, fala tranquilo que eu não mando.

Se a pessoa responder que sim, ela entra. Se não responder, **não entra** — silêncio não é sim.

### Depois do sim

Me manda a lista nesse formato, uma pessoa por linha:

```
Nome Completo | email@dominio.com | quando ele autorizou
```

Exemplo:

```
João Silva | joao@gmail.com | 27/08 WhatsApp
Maria Souza | maria@empresa.com.br | 27/08 WhatsApp
```

Eu cadastro com `origem_consentimento` descrevendo exatamente isso, checo duplicata contra os
contatos que já existem, e te confirmo quantos entraram.

**Não precisa esperar juntar muita gente.** Manda de 2 em 2, de 10 em 10, do jeito que vier.

---

## Caminho 2 — clientes da Real Vision

Quem tem ou teve relação comercial entra com `origem_consentimento = relacao_comercial`. É a
base dos 22 contatos que já existem hoje. Não precisa pedir permissão de novo, mas o descadastro
tem que estar visível no email — e está.

---

## Caminho 3 — formulário no site (o que faz a lista crescer sozinha)

Já existe uma função publicada (`capture-community-lead`) que grava direto na lista quando alguém
preenche o formulário da comunidade no blog, com `origem_consentimento = blog-<slug-do-post>`.

Esse é o único caminho que escala sem trabalho manual. Os outros dois dependem de você lembrar de
pedir. Vale tratar como prioridade depois que a Fase 1 estiver rodando.

---

## O que nunca fazer

- Comprar lista. Nunca, em nenhuma circunstância.
- Raspar email de site, de Google Maps, de Instagram e jogar na lista quente.
- Adicionar quem trocou cartão numa feira sem ter falado que ia mandar email.
- Adicionar de novo quem já se descadastrou. O sistema bloqueia sozinho, mas nem tente.

Prospecção fria é outro canal, com outra ferramenta e outro texto. **Não se mistura com a lista
de newsletter.** Misturar as duas queima o domínio.

---

## Estado da lista hoje (27/08/2026)

| Origem | Contatos |
|---|---|
| `relacao_comercial` | 22 |
| `teste` | 3 |
| `manual` | 2 |
| `sócia Real Vision 360` | 1 |
| **Total ativo** | **28** |

Os 3 de `teste` são endereços de teste, não são gente de verdade. Vale limpar antes de tirar
métrica séria de abertura — senão eles distorcem a conta pra cima ou pra baixo sem motivo.

---

## Relacionados

- [[04-CALENDARIO-EDITORIAL]] — o que vai ser mandado e quando
- [[06-MANUAL-APRENDIZADO]] — nível 2 do manual explica por que a lista funciona assim
- [[05-SISTEMA-RESPOSTA-PERSONALIZADA]] — o que fazer quando a pessoa responde

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-27 | Documento criado | Felipe vai começar a trazer contatos de amigos e precisava de um processo fixo, repetível, que não dependa de lembrar as regras a cada vez |
