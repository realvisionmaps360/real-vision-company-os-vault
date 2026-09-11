# Passo a passo — dar acesso da conta de Google Ads da Vila dos Corais à Real Vision

Roteiro para o Felipe gravar a tela e mandar para a cliente. Duas partes separadas
de propósito: a **Parte A** é o que o Felipe faz, a **Parte B** é o que a cliente faz.
Só a Parte B entra no vídeo dela.

Cliente: [[FICHA-CLIENTE]] · Projeto: [[02-Projetos/vila-dos-corais/PROJETO]]

> ⚠️ **Só vale se o Felipe escolher vincular a conta que a cliente já tem.** Em
> 10/09/2026 a decisão registrada foi outra: criar uma conta **nova** dentro da MCC
> `359-167-3566` (ver `Vila-dos-Corais-TIMELINE.md`, entrada "GA4 conversão marcada;
> Google Ads travado"). Os dois caminhos não se somam. Não mandar este roteiro para a
> cliente antes dessa escolha.

---

## Antes de tudo: por que isso é preciso

A conta de anúncios **não é** o Gmail. O Gmail é a chave; a conta de anúncios é uma
coisa separada que nasce a partir dele. No caso da Vila dos Corais essa conta **já
existe**: ela nasceu sozinha no dia em que a cliente colocou os R$ 200 na aba de
anúncios do Perfil da Empresa. Está amarrada ao Gmail dela.

Não vamos criar conta nova. Vamos pedir para a conta que já existe ser **gerenciada**
pela conta de administrador da Real Vision (MCC `359-167-3566`), do mesmo jeito que se
faz com qualquer cliente.

**Por que não criar uma conta nova:** o vínculo entre o Perfil da Empresa e a campanha
só pode ser feito no momento em que a campanha é criada — o Google não deixa refazer
depois. Conta nova jogaria fora esse vínculo e todo o histórico dos R$ 200.

**O que a cliente NÃO precisa fazer:** passar senha, passar cartão, ou sair da conta
dela. Ela continua dona de tudo. O que ela dá é permissão de gestão, e pode tirar
quando quiser.

---

## Parte A — o que o Felipe faz primeiro (não entra no vídeo)

Sem isso, não existe convite para ela aceitar.

1. Entrar em `ads.google.com` logado como **`felipegarciajericoacoara@gmail.com`** e,
   no seletor de conta do topo, conferir que está na **MCC `359-167-3566`**
   ("Felipe Garcia Real Vision conta google ads claude"). **Não** usar a `414-120-1211`
   (conta filha onde rodam as campanhas da própria Real Vision) nem a `156-292-4356`
   (cancelada) — convite de vínculo só sai da MCC.
2. Clicar no ícone **Contas** → **Configurações da subconta**.
3. Clicar no botão de **adição (+)**.
4. Escolher **Vincular conta existente**.
5. Digitar o **número de identificação de cliente** da conta dela (os 10 dígitos, no
   formato `000-000-0000`).
6. Clicar em **Enviar solicitação**.

> **Falta o número dela.** Sem os 10 dígitos não dá para enviar o convite. Duas formas
> de conseguir, na ordem de preferência:
>
> - **Pedir para ela.** É o caminho limpo: o número aparece no canto superior direito
>   da tela dela, ao lado do nome da conta, assim que ela entra em `ads.google.com`.
>   Vale pedir junto com o vídeo — é a primeira coisa do roteiro da Parte B.
> - **Entrar com o Gmail dela.** Funciona, mas é acesso à conta de outra pessoa. Se for
>   por aqui, é o Felipe quem entra — nunca a IA.

---

## Parte B — roteiro do vídeo para a cliente

Fale devagar e mostre o cursor. A tela do Google Ads muda de lugar de vez em quando,
então vale dizer "procure por" em vez de "está exatamente aqui".

### Passo 1 — entrar

> "Abre o navegador e digita **ads.google.com**. Entra com o seu Gmail, o mesmo que a
> gente usa para o Google da pousada."

### Passo 2 — achar o número da conta

> "No canto de cima, do lado direito, tem o nome da conta e embaixo um número com dez
> dígitos, tipo 123-456-7890. Esse número é o endereço da sua conta de anúncios. Me
> manda ele no WhatsApp."

Esse é o número que você precisa para a Parte A. Se você já tiver o número, pule este
passo no vídeo.

### Passo 3 — abrir onde ficam as permissões

> "Agora procura, no menu, a palavra **Administrador**. Dentro dela, clica em
> **Acesso e segurança**."

### Passo 4 — a aba certa

> "Vai aparecer uma fileira de abas. Clica na aba **Administradores**."

### Passo 5 — aceitar

> "Aí você vai ver uma linha escrito **Pedido de vinculação**, com o nome Real Vision.
> Do lado direito, na coluna **Ações**, clica em **Aceitar**."

### Passo 6 — confirmar que deu certo

> "Pronto. Se aparecer a Real Vision na lista de administradores, deu certo. Você vai
> receber um e-mail de confirmação também."

---

## Se ela não achar o pedido na tela

Tem um caminho alternativo, e às vezes é mais fácil:

> "Procura no seu e-mail um convite do Google Ads. Abre e clica no link de aceitar.
> Dá no mesmo."

Se não achar nem o e-mail nem o pedido na tela, provavelmente o convite ainda não foi
enviado (Parte A) ou foi enviado para o número de conta errado. Nesse caso, confira o
número antes de mandá-la procurar de novo.

---

## Depois que ela aceitar

O acesso sozinho não deixa a campanha pronta. Ficam faltando três coisas, na ordem:

1. Ligar o GA4 do site (`G-8P07EHPVYR`) à conta de anúncios dela.
2. Marcar o `whatsapp_click` como conversão **principal** — o evento já dispara no site,
   conferido no código em 10/09/2026.
3. Montar a campanha de Pesquisa e levar para aprovação antes de qualquer gasto.

Sem os dois primeiros, o Google otimiza no escuro: gasta o dinheiro sem saber quais
cliques viraram conversa no WhatsApp.

---

## Fontes

- [Contas de admin: vincular contas às suas contas de admin](https://support.google.com/google-ads/answer/7459601?hl=pt-BR)
- [Gerenciar o acesso à conta do Google Ads](https://support.google.com/google-ads/answer/6372672?hl=pt-BR)

## Relacionados

- [[Vila-dos-Corais-TIMELINE]]
- [[02-Projetos/vila-dos-corais/trafego-pago-pesquisa]]
- Skill de arquitetura de campanha: `skills/rv-trafego-pago/SKILL.md`
