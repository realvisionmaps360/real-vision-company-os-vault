# 06 — Manual de Email Marketing (escola do Felipe)

> Felipe nunca trabalhou com email marketing antes. Este manual existe pra ele aprender fazendo,
> em 6 níveis, sem pular etapa. Quem for ajudar a planejar próximos passos escreve na mesma lógica:
> conceito → por que importa → o que fazer na prática → como saber que passou de nível.

| Nível | Nome | Status em 21/08/2026 |
|---|---|---|
| 1 | A caixa: quem recebe, quem responde | ✅ Concluído — caixas confirmadas ativas |
| 2 | A lista: quem pode receber | 🟡 Em andamento — 28 contatos, todos legítimos |
| 3 | O disparo: mandar sem cair no spam | 🟡 Em andamento — SPF/DKIM/DMARC ok, campanha 004 escrita, ainda não disparada |
| 4 | A leitura: o que os números dizem | ⬜ Ainda não aplicado — sem disparo real ainda |
| 5 | O teste: A/B e segmentação | ⬜ |
| 6 | O sistema: automação e autonomia | ⬜ (ver [[05-SISTEMA-RESPOSTA-PERSONALIZADA]]) |

---

## Nível 1 — A caixa: quem recebe, quem responde

Duas caixas diferentes: a de SAÍDA em massa (Resend, não recebe nada) e a caixa normal
(`contato@realvisionmaps.com`, recebe respostas). Se a caixa normal não existir, a resposta da
pessoa simplesmente some.

**Estado real do domínio (checado por DNS em 21/08/2026):** `realvisionmaps.com` tem MX próprio
(Hostinger), Resend configurado em `send.realvisionmaps.com` com DKIM e DMARC verificados. As
caixas `contato@` e `adm@` foram confirmadas ativas pelo Felipe no mesmo dia.

## Nível 2 — A lista: quem pode receber

Lista não é "todo mundo que eu tenho o email". É quem tem relação: cliente ativo (relação
comercial) ou quem marcou a caixinha num formulário. Nunca lista comprada/raspada no motor quente.
Hoje: 28 contatos ativos em `email_contatos`.

**Regra do descadastro:** facilitar, não esconder. Quem descadastra ia marcar como spam de
qualquer jeito — descadastro não machuca reputação, spam machuca muito.

## Nível 3 — O disparo: mandar sem cair no spam

O Gmail entrega email que as pessoas abrem e respondem. As três checagens: SPF (quem pode mandar
em seu nome), DKIM (assinatura que prova autenticidade), DMARC (o que fazer com quem falsifica).
A Real Vision já tem as três.

**Regras 2026 dos provedores (fato externo, verificado por pesquisa):** SPF+DKIM+DMARC alinhados
obrigatório, descadastro em um clique (RFC 8058) obrigatório em marketing, taxa de reclamação de
spam abaixo de 0,3% (alvo seguro abaixo de 0,1%). Quem cumpre tem ~89% de inbox placement; quem
não cumpre vê 22-34% indo pro spam.

O que derruba email na aba Promoções: muitas imagens/links, palavras de dinheiro no corpo
("grátis", "promoção", "desconto"), email que ninguém abre nem responde.

## Nível 4 — A leitura: o que os números dizem

| Número | Referência saudável |
|---|---|
| Entrega | acima de 98% |
| Abertura | 25-45% em lista pequena e quente |
| Clique | 2-5% |
| Resposta | o mais importante pra RV, com 28 contatos 3 respostas valem mais que 15 aberturas |
| Descadastro | abaixo de 0,5% |

Métrica confiável só existe a partir de 20/08/2026 (webhook do Resend). Campanha 002 aparece com
abertura zero, isso é ausência de medição, não ausência de leitura.

## Nível 5 — O teste: A/B e segmentação

Testar uma coisa só por vez. Com 28 contatos, A/B não tem significância estatística ainda — serve
pra criar o hábito de registro, vira decisão real acima de algumas centenas de contatos.
Segmentação é a alavanca de maior ROI: cliente com tour vencido ≠ site em dia, Brasil ≠ Suíça,
por segmento de negócio, por quem já interagiu com email anterior.

## Nível 6 — O sistema: automação e autonomia

Ver [[05-SISTEMA-RESPOSTA-PERSONALIZADA]]. Preço e escopo sempre passam pelo Felipe, em qualquer
nível de autonomia.

---

## Glossário rápido

| Termo | Em português claro |
|---|---|
| MX | O endereço do correio do domínio. Sem ele, ninguém consegue mandar email pro domínio. |
| SPF | Lista de quem pode mandar email em nome do domínio. |
| DKIM | Assinatura digital que prova que o email é autêntico. |
| DMARC | A regra do que fazer com quem falsifica o domínio. |
| Bounce | Email que voltou porque o endereço não existe ou a caixa está cheia. |
| Warm-up | Aquecer o domínio subindo o volume de envio aos poucos. |
| Preview text | O trecho que aparece na caixa de entrada depois do assunto. |
| Reverse Lead Magnet | Em vez de pedir uma call, entregar algo pronto na hora. |
| RFC 8058 | O padrão técnico do descadastro em um clique. |

---

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-21 | Documento criado | Sessão `email1` — consolidação do projeto de email marketing |
| 2026-08-26 | Documento restaurado | O arquivo foi criado em 21/08 mas nunca commitado e sumiu do disco. Restaurado a partir da cópia preservada em `TEMP/pacote-email-marketing-2026-08-21/`. Conteúdo idêntico ao original; só o cabeçalho perdeu a marca "cópia de 21/08/2026". |
