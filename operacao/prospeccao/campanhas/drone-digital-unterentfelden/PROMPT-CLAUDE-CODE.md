# Mensagem para colar no Claude Code

Copie o bloco abaixo e cole na sessão do Claude Code com o vault aberto.

---

```
Vamos construir a landing page da campanha Drone & Digital Unterentfelden.

Todo o contexto está em operacao/prospeccao/campanhas/drone-digital-unterentfelden/. Leia nesta ordem,
antes de escrever qualquer linha de código:

1. HANDOFF.md — o que é a campanha, em que pé está, os números do levantamento
2. landing/BRIEFING-LANDING.md — o que construir, com as decisões já fechadas
3. contexto/DESIGN.md e contexto/VOZ.md — identidade visual e tom de voz da Real Vision

Decisões já tomadas, não reabrir:

- Página SIMPLES e curta
- Versão inicial em PORTUGUÊS (é a que eu reviso; o alemão vem depois)
- Design system do site da Real Vision: fundo #0a0d14, accent âmbar #F5A623,
  Bebas Neue nos títulos, Inter no corpo, JetBrains Mono nas labels
- O link da imagem 360° tem que estar visível e clicável, abrindo no navegador.
  Esse é o requisito central da página.
- Formulário via Web3Forms, chave no .env (mesmo processo do PASSO-1-CHAVE-EMAIL.md)
- Domínio da Real Vision vem depois, não assuma endereço final

O link do tour 360° de Unterentfelden: vou te passar. Deixe numa constante única
no topo do código, e faça a página degradar sem quebrar enquanto ela estiver vazia
(sem botão morto apontando para #).

Duas coisas que eu quero decidir com você antes de você começar a codar:

1. A landing page entra como rota nova do site real-vision-core (React + Tailwind,
   dá para usar as rotas /de/ que já existem), ou é uma página solta em HTML único
   para eu subir separado? Me diga o trade-off e recomende uma.
2. O tour 360° abre melhor embutido em iframe na página, ou só como botão que abre
   em aba nova? Depende da plataforma de tour que eu uso — me pergunte o que precisar
   saber sobre ela.

Me pergunte antes de executar. Não quero que você presuma nada que eu não confirmei,
principalmente URL.
```

---

## Por que a última linha está aí

Nesta sessão eu presumi que o projeto na Vercel se chamaria `drone-unterentfelden`, coloquei
`https://drone-unterentfelden.vercel.app` nos 24 rascunhos do Gmail e não perguntei. O endereço
não existia e deu 404.

Os rascunhos estão no Gmail com esse link quebrado. **Nada foi enviado.** A seção 6 do `HANDOFF.md`
tem os três caminhos para corrigir, e `emails/gerador-emails.py` regera os 24 textos numa passada
mudando só a constante `URL` no topo.

---

## Depois que a página estiver no ar

1. Traduzir para alemão (os 24 emails estão em alemão e apontam para ela)
2. Conectar ao domínio da Real Vision
3. Corrigir o link nos 24 rascunhos do Gmail
4. Revisar email por email, apagando o bloco em português de cada um
5. Enviar
