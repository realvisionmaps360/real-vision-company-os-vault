# Briefing — landing page Drone & Digital Unterentfelden

> Ler o `HANDOFF.md` da pasta pai antes. Este arquivo cobre só a página.
>
> **⚠️ Documento histórico a partir de 19.08.2026.** Ele descreve o briefing da **primeira**
> versão da página (portuguesa, com preço). A página foi reescrita em 19.08 por
> [[DEC-2026-004]] e hoje é outra coisa. Mantido porque o método, a identidade visual e o
> requisito do 360° continuam valendo — mas **modelo comercial e idioma aqui estão revogados**.
>
> **Para a versão atual, ler:** `TRADUCAO-PT-LANDING-2026-08-19.md` (o que a página diz hoje,
> em português) · `site/README.md` (como ela funciona) ·
> `../PLANO-REESTRUTURACAO-2026-08-19.md` (o que mudou, frente a frente).

---

## O que mudou em 19.08.2026 (leia antes do resto)

| Este briefing dizia | Vale hoje? |
|---|---|
| "Português na versão inicial, alemão depois" | ❌ A página é **só em alemão** (`de-CH`), escrita direto, sem versão portuguesa |
| Preço de CHF 20, duas variantes de pagamento | ❌ **Não existe preço.** Oferta gratuita, piloto datado de agosto de 2026 |
| Publicação da foto no perfil do Google do cliente | ❌ Não prometemos mais. O dono faz sozinho, ou pede ajuda em privado |
| Formulário de solicitação (endereço + forma de pagamento) | ❌ Virou questionário de 4 perguntas, todas voluntárias, com opt-in separado |
| Bloco de lista de espera no fim | ❌ Removido |
| Simplicidade, design system, requisito do 360°, degradação sem link morto | ✅ **Continuam valendo integralmente** |

---

## Decisões já tomadas pelo Felipe

Não reabrir, apenas cumprir:

1. **Simples.** Página curta, uma coisa por seção, sem excesso.
2. ~~**Português na versão inicial.**~~ **Revogado em 19.08** — a página é construída direto em
   alemão suíço, porque os 24 emails são em alemão. Construir em PT e traduzir depois era fazer
   duas vezes. A conferência do Felipe acontece pelo documento de tradução, não pelo site.
3. **Design system do site da Real Vision.** Fonte de verdade: `contexto/DESIGN.md` no vault.
4. **O link da imagem 360° tem que estar visível e clicável**, abrindo a imagem 360° no navegador.
   Este é o requisito central da página, não um detalhe.
5. **Domínio da Real Vision depois.** Construir sem assumir endereço final.
6. **(19.08) O download da imagem segue o mesmo padrão de degradação do 360°:** constante única no
   topo, e se ficar vazia o botão não renderiza — nunca aponta pra `#`.

---

## O requisito central: o link do 360°

O Felipe está gravando o tour 360° de Unterentfelden agora. A página tem que ter um ponto óbvio
onde a pessoa clica e a imagem 360° abre no navegador.

- O link vai numa **constante única no topo do código**, não espalhado. Trocar em um lugar só.
- Enquanto o link não existir, deixar a constante vazia e a página tem que **degradar sem quebrar**:
  ou esconde o bloco, ou mostra estado de "em breve". Não deixar botão morto apontando para `#`.
- Preferir **abrir em aba nova** (`target="_blank" rel="noopener"`), porque a experiência 360° é
  imersiva e tirar a pessoa da página perde a conversão.
- Se o embed em `iframe` funcionar bem na plataforma de tours do Felipe, oferecer as duas coisas:
  o embed na página e o botão de abrir em tela cheia. Se o embed for problemático, só o botão.

---

## Identidade visual

De `contexto/DESIGN.md`. Não inventar cor nem fonte nova.

| Token                              | Valor                                                             |
| ---------------------------------- | ----------------------------------------------------------------- |
| Fundo                              | `#0a0d14`                                                         |
| Surface (cards, seções alternadas) | `#161c2b`                                                         |
| Accent                             | `#F5A623` — âmbar, **nunca substituir por outra cor de destaque** |
| Texto principal                    | `#ffffff`                                                         |
| Texto muted                        | `#A8A8B0`                                                         |
| Texto dim                          | `#7A7A85`                                                         |
| Borda sutil                        | `rgba(255,255,255,0.06)`                                          |

| Uso               | Fonte                                                          |
| ----------------- | -------------------------------------------------------------- |
| Títulos           | **Bebas Neue**, uppercase — padrão em todas as páginas do site |
| Corpo             | **Inter** (300 a 600)                                          |
| Labels e eyebrows | **JetBrains Mono**, uppercase, letter-spacing amplo, cor âmbar |

Declarar sempre com fallback: `'Bebas Neue', Impact, sans-serif`. Nunca referenciar fonte que não
está importada. Cards: fundo `rgba(20,20,28,0.85)`, borda `rgba(255,255,255,0.08)`, backdrop-blur.

O site real da Real Vision é React + Tailwind (`real-vision-core`), com `ink: #0a0c11`,
`ink-2: #11141b`, `amber: { DEFAULT: "#f5a524", soft: "#fbbf24" }` no `tailwind.config.ts`.
Se a landing entrar como rota do site, seguir esses tokens. Se for página solta, HTML único
autocontido com CSS inline serve.

---

## Tom do texto

De `contexto/VOZ.md`: direto, técnico, consultivo. A Real Vision fala como consultor, não como
vendedor, e **não usa hipérbole**.

Evitar: "incrível", "sensacional", "transformar", superlativo sem embasamento, "agência criativa".

Usar: visibilidade no Google, conversão, presença digital integrada, tour 360°, resultado mensurável.

Estrutura de cada bloco: ponto direto primeiro, contexto só o necessário para decidir, CTA sem ambiguidade.

---

## Conteúdo da página

### Herói

- Eyebrow: `DRONE & DIGITAL UNTERENTFELDEN`
- Título curto que entregue a ideia numa frase. A versão anterior usava
  "Seu negócio visto de cima. Direto no seu perfil do Google." — serve como ponto de partida.
- Subtítulo: uma foto 360° aérea do estabelecimento, publicada no perfil do Google Meu Negócio,
  mais o link da experiência navegável. Sem assinatura, sem contrato.
- CTA principal + o preço visível: **CHF 20 por estabelecimento**

### Prova (números reais do levantamento)

Estes números são de medição própria em 13.08.2026, não são estimativa. Podem ser afirmados.
Se a área mudar, recontar antes de reusar.

| Número | Legenda |
|---|---|
| 64 | negócios verificados em Unterentfelden |
| 23 | perfis do Google não reivindicados pelos donos |
| 1 a 3 | fotos que um perfil típico do bairro tem |
| 0 | com foto 360° aérea |

Incluir a nota de origem: *levantamento próprio, 13.08.2026, dados públicos do Google Maps,
bairro Distelberg / 5035 Unterentfelden.*

### O que o cliente recebe — três itens

1. Foto 360° aérea do local. Captura no local, cerca de 15 minutos, ele não precisa preparar nada.
2. Publicação dessa foto no perfil do Google Meu Negócio.
3. Link da versão navegável, livre para usar no site, no WhatsApp ou como QR code na porta.

### O 360° de exemplo

A seção do requisito central. Mostra o tour de Unterentfelden. É a prova de que a entrega existe.

### Como funciona — quatro passos

1. Ele responde ou preenche o formulário; confirmamos se o local permite o voo
2. Visita de cerca de 15 minutos, depende do tempo, ele não precisa estar presente
3. Ele vê o resultado antes da publicação
4. Publicação no perfil e entrega do link

### Preço

CHF 20 por estabelecimento, uma vez. Sem assinatura, sem contrato. **Paga só depois de aprovar.**
Justificativa do preço, que é verdadeira e vale dizer: sai barato porque o bairro todo é fotografado
na mesma rodada.

### Formulário

Campos: estabelecimento, nome, email, endereço do local, observação opcional.

Usar **Web3Forms**, que já é o padrão do Felipe — o processo de gerar a chave está documentado em
`PASSO-1-CHAVE-EMAIL.md` na raiz do vault. A Access Key fica em `.env`, e `.env` está no
`.gitignore`. A chave aparece no código da página, e isso é esperado: ela só serve para mandar email
para o Felipe.

Se a chave não estiver configurada, o formulário tem que avisar em vez de falhar em silêncio.

Nota de privacidade curta e honesta: os dados vão só para a Real Vision, uso apenas para esta
solicitação, sem repasse e sem newsletter.

### Rodapé

Real Vision 360, link para `realvisionmaps.com`, e a menção de que é uma ação no bairro
Distelberg / 5035 Unterentfelden.

---

## Cuidados de conteúdo

- **Não prometer publicação oficial no Google Street View.** A oferta é foto 360° no perfil do
  Google Meu Negócio mais o link do tour na plataforma do Felipe. Se ele for Trusted Photographer
  e quiser afirmar Street View, é decisão dele, não presumir.
- **Não afirmar que o perfil de alguém está abandonado.** Falar em condicional. O dado dos 23 não
  reivindicados é agregado do bairro, não acusação individual.
- Os números da seção de prova precisam ser recontados se a área mudar.

---

## Versão alemã

A versão que efetivamente vai para os negócios precisa estar em **alemão**, porque os 24 emails
estão em alemão e apontam para esta página. Mandar um email em alemão que abre numa página em
português quebra a credibilidade.

Sequência: construir em português, Felipe aprova, traduzir para alemão, e aí o link dos emails
aponta para a versão alemã. O site da Real Vision já tem rotas `/en/` e `/de/`, então cabe na
estrutura existente.

Padrão suíço no alemão: **sempre `ss`, nunca `ß`**. Tratamento `Sie`.

Há um rascunho em alemão em `referencia-v1-alema.html`. Foi **descartado** por ser longo demais e por
ter sido feito antes destas decisões. Serve só como referência de texto e de aplicação da paleta,
não como base para copiar.
