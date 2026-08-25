# O que você precisa fazer

> Cinco tarefas. Nenhuma demora mais que uns minutos.
> Ordem sugerida: 1, 2 e 3 destravam a próxima sessão. A 4 e a 5 podem esperar.

---

## 1. Buscar os arquivos que faltam (o mais importante)

**O problema:** este notebook não tem o Company OS. Faltam quatro skills que todos os
documentos mandam usar, e alguns arquivos de apoio.

**O que fazer:**

1. Abra o `PROMPT-PARA-O-VAULT.md`, que está nesta mesma pasta.
2. Copie o conteúdo inteiro.
3. Cole no Claude que tem acesso ao vault.
4. Ele monta uma pasta chamada `pacote-campanha-estudios`.
5. Baixe, descompacte se vier zipado, e coloque a pasta **dentro** de
   `campanha-acquisition-amp`.

**Como saber que deu certo:** dentro de `pacote-campanha-estudios` tem uma pasta `skills`
com quatro pastas dentro dela.

---

## 2. Instalar o Supabase no Claude Desktop

**O problema:** sem isso, não consigo ler nem gravar nada no banco de prospects. A fase de
coleta de verdade fica parada.

**O que fazer:**

1. No Claude Desktop, abra as configurações e vá na lista de connectors ou MCPs.
2. Procure por **Supabase**.
3. Se já estiver na lista, veja se está conectado. Se estiver, pronto, não faça mais nada.
4. Se não estiver, adicione.
5. Ele vai pedir uma chave de acesso. Pegue no painel do Supabase, no projeto
   **rv-acquisition**, em Settings e depois API.
6. Cole a chave **na tela do Claude Desktop**, nunca no chat comigo.

**Como saber que deu certo:** me diga que instalou. Eu faço uma consulta de teste que só
lê, não escreve nada, e te confirmo.

**Se der errado:** pode ser que precise fechar e abrir o Claude Desktop pra ele enxergar.

---

## 3. Ver quanto sobrou de crédito na Apify

**O problema:** a Apify está conectada e funcionando, mas não consigo ver o saldo. E sem
saber o saldo eu não sei quanto posso coletar.

**O que fazer:**

1. Entre em `console.apify.com`.
2. Vá em **Billing**.
3. Me diga quanto sobrou do crédito deste mês.

**Coisa boa que descobri:** a Apify mudou a forma de cobrar desde a campanha da Suíça.
Agora cobra por evento. Achei duas opções que custam 50 vezes mais caro que as outras no
seu plano atual, e já deixei registrado pra gente não usar nenhuma das duas. Isso sozinho
economiza bastante.

---

## 4. Três decisões que só você pode tomar

Não precisa responder agora. Mas até você responder, essas partes ficam paradas.

**a) Que tipo de estúdio é o alvo?**

"Estúdio de música" no Brasil são três negócios diferentes:

- **Estúdio de gravação** — grava, mixa, masteriza. Provavelmente tem mais verba.
- **Estúdio de ensaio** — aluga sala por hora pra banda. Muitos, mas ticket baixo.
- **Escola de música com estúdio** — tem mais verba, mas precisa de outro tipo de site.

Muda tudo: onde eu busco, o que eu escrevo, quanto cobra. Preciso saber qual.

**b) O que acontece no ano 2?**

Os R$ 1.500 cobrem o primeiro ano com domínio e hospedagem dentro. Depois disso, o quê?
Não vou inventar valor. Mas o cliente vai perguntar, e a gente precisa ter resposta antes
de mandar a primeira mensagem.

**c) De qual e-mail a gente vai enviar?**

Explico o porquê no item 5.

---

## 5. Um alerta que a pesquisa levantou

Você pediu pra eu pesquisar a melhor forma de fazer tudo isso antes de planejar. Fiz. Duas
coisas apareceram que mudam o plano, e você precisa saber.

### WhatsApp na abertura é arriscado

O plano original previa abrir contato por e-mail e WhatsApp. A política atual do Meta é
clara: mandar mensagem pra número que veio de raspagem, sem a pessoa ter pedido, é
exatamente o comportamento que mais derruba conta em 2026. E o app grátis do WhatsApp
Business é o que mais leva bloqueio.

O que está em risco não é a campanha. É **o número de WhatsApp que a Real Vision usa com
cliente de verdade**. Perder ele custa mais caro que a campanha inteira.

**Minha recomendação:** abre por e-mail. Quando o cara responder ou clicar, aí sim vai pro
WhatsApp. Aí a conversa foi ele que começou, e o risco some. É decisão sua, mas eu não
recomendo o contrário.

### O e-mail precisa de configuração antes do primeiro envio

Desde novembro de 2025 o Gmail passou a **rejeitar de vez** e-mail de remetente mal
configurado. Não vai pra spam, simplesmente não chega.

Precisa de três configurações no DNS do domínio (SPF, DKIM e DMARC), todas certas e
combinando entre si. Eu consigo verificar se estão. Se faltar alguma, você precisa mexer no
DNS, e eu te passo exatamente o quê.

**A pergunta é:** enviar de qual domínio? Se for o `realvisionmaps.com` principal e algo
der errado, a reputação do domínio que você usa com cliente é que sofre. A prática de
mercado é criar um subdomínio só pra campanha, tipo `contato.realvisionmaps.com`, pra
isolar o risco. Me diga o que prefere.

---

## Resumo

| # | Tarefa | Trava o quê |
|---|---|---|
| 1 | Pegar o pacote do vault pelo Drive | Método de abordagem e de copy |
| 2 | Instalar o Supabase no Claude Desktop | Toda a fase de coleta no banco |
| 3 | Ver o saldo da Apify | Dimensionar a coleta |
| 4 | Três decisões: tipo de estúdio, ano 2, domínio | Escolha da cidade e a copy |
| 5 | Decidir sobre o WhatsApp | O desenho dos canais |

O 1, o 2 e o 3 são os que valem a pena fazer antes da próxima sessão.
