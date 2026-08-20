# Passo 1 — Chave do Web3Forms (para as respostas chegarem no seu email)

> **Quem faz:** Felipe. O Claude Code não cria contas nem preenche credenciais.
> **Tempo:** ~2 minutos.
> **Sem isso:** a página funciona, mas manda as respostas pelo WhatsApp em vez do email.

---

## 1. O que fazer

Gerar uma chave de acesso gratuita no Web3Forms, que é o serviço que recebe as respostas do Saulo e encaminha pro seu email.

## 2. Onde entrar

**https://web3forms.com**

## 3. Qual configuração procurar

Na própria página inicial tem um campo pedindo email, com um botão do tipo **"Create Access Key"**.

## 4. Qual valor inserir

O **email onde você quer receber as respostas**. É pra esse endereço que tudo vai chegar — escolha o que você realmente lê.

## 5. Resultado esperado

Você recebe um email do Web3Forms com uma **Access Key** — um código no formato:

```
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Talvez precise confirmar o email antes. Confira a caixa de spam.

## 6. Como confirmar que funcionou

Me manda a chave. Eu coloco no arquivo `.env` do projeto, gero a build e testamos um envio real — você deve receber o email com as respostas em segundos.

---

## Sobre a chave

- Ela **fica visível** no código da página — é assim que o serviço funciona, e é seguro: a chave só serve para mandar email pra você, não dá acesso a nada.
- Fica no arquivo `.env`, que está no `.gitignore` e **não vai pro repositório**.
- Trocar de email depois = gerar chave nova e trocar uma linha.

## Limites do plano grátis

- **250 envios por mês.** Para um questionário enviado a um cliente, sobra muito.
- Histórico de 30 dias no painel deles — mas o email fica no seu inbox de qualquer jeito.

---

## O que acontece quando o Saulo enviar

1. Ele toca em **Enviar respostas**.
2. A página manda pro Web3Forms sem sair da tela.
3. Você recebe um email com assunto **"Questionário respondido — AMP Estúdio"** e as respostas formatadas.
4. Ele vê uma tela de confirmação.
5. Se der qualquer erro, aparece pra ele um link de reserva pra mandar pelo WhatsApp — a resposta não se perde.
