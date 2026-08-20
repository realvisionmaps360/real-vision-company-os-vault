# Plano — Reestruturação da campanha Drone & Digital Unterentfelden

> Escrito em 19.08.2026. **Nada foi executado na sessão que escreveu este plano.**
> A execução acontece em sessão nova, a partir deste documento.
> Ponto de entrada da campanha: [[HANDOFF]] · Decisões no LBOS: [[DEC-2026-002]], [[DEC-2026-003]]

---

## Contexto — por que a campanha muda

A campanha foi desenhada para vender uma foto 360° aérea a **CHF 20** para 24 negócios de
5035 Unterentfelden ([[DEC-2026-002]], [[DEC-2026-003]]). Tudo está pronto e nada foi enviado:
foto capturada em 13.08.2026, landing no ar, formulário funcionando, 24 textos aprovados.

Ela travou por uma razão que não é técnica. A pesquisa em
`operacao/gestao/juridico-fiscal/PESQUISA-PAGAMENTOS-SUICA-2026-08-14.md` mostrou que o Felipe,
brasileiro sem status de residência na Suíça, não tem como receber por esse trabalho de forma
legal e simples. E, mais duro que isso, a seção 2 daquela pesquisa cita o SEM dizendo que
**atividade lucrativa "remunerada ou não" exige autorização**. Ou seja, tirar o preço não
resolve sozinho a questão de trabalho.

O que resolve é a combinação de três fatos:

1. **O voo já aconteceu.** 13.08.2026, é passado, não se repete nesta rodada.
2. **Tudo que sobrou é remoto e digital.** Email, landing, entrega de arquivo. Nada executado
   fisicamente em solo suíço.
3. **Sem dinheiro, some a metade fiscal inteira do problema.** Sem TWINT, sem conta suíça, sem
   nota, sem IVA.

A campanha então deixa de ser venda e vira **validação de mercado**, que é exatamente o que o
próprio `operacao/prospeccao/ACQUISITION-OPERATING-SYSTEM.md` já mandava fazer:

- Seção 13: *"Visual (porta de entrada / upsell): 360°, fotografia, drone. Serve para negócios
  frios ou **cidades novas ainda não validadas** (tripwire), nunca como critério principal."*
- Seção 6, portões humanos: *"**1ª abordagem de um segmento/mercado/ângulo NOVO**: validar a
  oferta antes de escalar."* A Suíça é mercado novo. Esta rodada **é** esse portão.
- Seção 4, sub-score `score_remote`: *"Dá para entregar 100% remoto?"* Dado o impedimento legal,
  isso deixou de ser um score e virou a pergunta central da campanha.

**Resultado esperado:** 24 negócios suíços recebem uma foto aérea de graça, sem contrapartida
obrigatória. Em troca (voluntária) a Real Vision recebe a resposta de 4 perguntas que decidem se
existe operação suíça, e uma base de emails com consentimento explícito.

---

## Decisões travadas em 19.08.2026

| # | Decisão | Origem |
|---|---|---|
| 1 | Oferta **gratuita**, sem preço em lugar nenhum | Felipe, 19.08 |
| 2 | Newsletter **desacoplada**: foto sai sem condição, opt-in é checkbox separado e opcional | Felipe, 19.08 |
| 3 | Assinatura **só do Felipe** (sem Romana) | Felipe, 19.08 |
| 4 | **Uma** forma de entregar a foto: download na própria landing | Felipe, 19.08 |
| 5 | Publicação no perfil do Google **não é prometida a ninguém**. Quem pedir, o Felipe ensina em conversa privada, e pode cobrar | Felipe, 19.08 |
| 6 | Instalar analytics para medir cliques na landing | Felipe, 19.08 |

### Decisões tomadas pelo agente (Felipe não respondeu — reverter se discordar)

| # | Decisão | Motivo |
|---|---|---|
| 7 | **PostHog em modo cookieless**, não GA4 | Sem cookie = sem banner de consentimento. Com público suíço, banner significa perder quem recusa, e numa amostra de 24 isso inviabiliza a leitura. PostHog já é a ferramenta do site RV e faz autocapture de clique nativamente. Se preferir GA4, a propriedade do site é `G-1VP9HCG1SZ` |
| 8 | ~~Download entrega **uma foto aérea normal (JPG plano)**~~ | ~~É o que o dono abre e entende sem explicação. O panorama equiretangular só serve pra subir no Google e depende dos metadados XMP corretos, o que vira suporte manual~~ |

> **Decisão 8 REVERTIDA pelo Felipe em 19.08.2026.** O download entrega o **panorama
> equiretangular** (`unterentfelden-luftaufnahme-360-13-08-2026.jpg`, já em `landing/site/public/`).
> Motivo: a Real Vision é especialista em 360 — dar a imagem plana entrega menos do que temos.
> Os metadados XMP GPano do arquivo foram **verificados em 19.08** e estão íntegros
> (`ProjectionType`, `UsePanoramaViewer`, `FullPanoWidth/HeightPixels`, `CroppedArea*`), então o
> Google Unternehmensprofil aceita o arquivo por arrasto direto, sem tratamento nosso.
> **Consequência na landing:** entra uma seção curta em alemão com os dois usos autônomos —
> (a) incorporar no próprio site via iframe, como fizemos na landing; (b) arrastar a foto pra
> dentro do perfil do Google pelo notebook. Quem não souber fazer entra em contato, e aí vale a
> decisão 5 (Felipe ensina em privado, pode cobrar). A landing **não promete** que executamos.
| 9 | **Remover** o bloco "lista de espera" do fim da página | O opt-in do formulário principal já cobre. Tirar elimina um segundo formulário, a Edge Function `capture-community-lead` e um segundo ponto de CORS |
| 10 | Landing construída **direto em alemão**, com tradução PT em documento separado para o Felipe aprovar | Os 24 emails são em alemão. Construir em PT e traduzir depois é fazer duas vezes |

---

## As 4 perguntas do questionário

Descartado tudo que o levantamento do Apify já respondeu (quem tem site, quantas fotos, perfil
reivindicado, avaliações). Perguntar o que já sabemos queima a boa vontade. Sobraram só as que
apenas o dono responde, e cada uma muda uma decisão real:

| # | Pergunta (PT) | Pergunta (DE) | Lente | O que decide |
|---|---|---|---|---|
| 1 | Como seus clientes novos te encontram hoje? | Wie finden neue Kundinnen und Kunden Sie heute? | Lente 5, jornada | Se na Suíça é boca a boca e não Google, o carro-chefe da RV não serve lá do jeito que serve no Brasil |
| 2 | O que mais te incomoda hoje na sua presença digital? | Was stört Sie heute an Ihrem digitalen Auftritt am meisten? | Lentes 1, 2, 7 | Vira a copy de toda campanha suíça futura, nas palavras deles |
| 3 | Você trabalharia com um prestador que atende 100% online, sem visita presencial? | Würden Sie mit einem Dienstleister arbeiten, der zu 100% online arbeitet, ohne Besuch vor Ort? | `score_remote` | **A pergunta que decide se existe operação suíça.** Se a resposta for não, o impedimento de trabalho vira irrelevante: não há mercado remoto |
| 4 | Uma foto aérea como essa, você usaria? Onde? | Würden Sie eine solche Luftaufnahme nutzen? Wo? | Valida o tripwire | Se ninguém usa, a porta de entrada na Suíça é outra |

Formato: 1, 2 e 4 abertas (textarea curto). A 3 é rádio: `sim / não / depende`.
Nenhuma obrigatória — o download acontece de qualquer jeito.

**Critério de sucesso, definido antes do envio:** 6 ou mais respostas dos 24 = sinal positivo,
vale ir atrás da autorização de trabalho. 2 ou menos = a resposta é não, e economizamos meses.

---

## Frente 1 — Landing page

**Pasta:** `landing/site/` · **No ar:** https://drone-unterentfelden.vercel.app
**Stack:** Vite estático, sem framework. Design system em `contexto/DESIGN.md`.

### `index.html` — o que sai, o que entra

| Seção | Ação |
|---|---|
| `<head>` | `lang="pt-BR"` → `lang="de-CH"`. Reescrever `<title>` e `<meta description>` (a description atual cita "CHF 20"). Manter `noindex, nofollow` |
| **Hero** | Remover `<span class="hero-price">CHF 20</span>`. Novo H1 e subtítulo em alemão. CTA vira o download, não "quero minha foto" |
| **Prova** (`.stats`) | Os 4 cards atuais (`13.08.26` / `1º` / `VITALÍCIA` / `ZERO`) não servem mais. `ZERO trabalho pra você — a gente cuida de tudo` virou **falso** (não publicamos mais no Google de ninguém). Trocar pelos números verdadeiros do levantamento: **64** negócios verificados, **23** perfis não reivindicados, **0** com foto aérea, **13.08.2026** data da captura. Manter a nota de origem |
| **O que você recebe** (`.offer`) | O item 02, "Publicação no Google", **sai**. Reescrever como: a imagem, o link navegável, e o direito de usar livremente |
| **Tour 360°** (`.tour-section`) | Mantém. Deixou de ser amostra e virou o presente. Adicionar aqui o **botão de download** |
| **Como funciona** (`.how`) | Os 4 passos falam de aprovação e publicação no Google. Substituir por 2 passos: baixe a imagem / se quiser, responda 4 perguntas |
| **Preço** (`.price`) | **Seção inteira removida.** No lugar entra "Warum kostenlos" com o motivo verdadeiro: a RV está entrando no mercado suíço e quer entender a necessidade antes de oferecer |
| **Formulário** | Campos `endereco` e o rádio `pagamento` saem. Entram as 4 perguntas + checkbox de opt-in separado |
| **Nota de privacidade** | Hoje diz *"sem repasse e sem newsletter"* — **conflita direto com o opt-in**. Tem que ser reescrita antes de qualquer coleta |
| **Lista de espera** (`.waitlist`) | Removida (decisão 9) |
| **Rodapé** | Mantém |

### `src/main.js`

- Manter `TOUR_URL` como constante única no topo (o padrão de degradação sem link morto de
  [[landing-de-campanha-com-captura-propria]] é bom e fica).
- Adicionar `DOWNLOAD_URL` seguindo **o mesmo padrão**: se vazia, o botão de download não
  renderiza, em vez de apontar pra `#`.
- `setupForm()`: trocar o payload pelos novos campos (4 respostas + `consentimento` booleano).
- `setupWaitlist()` e a constante `WAITLIST_ENDPOINT`: removidos.
- Adicionar `initAnalytics()` e as chamadas de evento (ver Frente 3).

### `src/style.css`

Só o que os blocos removidos deixarem órfão (`.price*`, `.waitlist*`, `.radio-group`) e o que os
novos exigirem (checkbox de consentimento, botão de download). **Não refatorar nada além disso.**

### Arquivo do download

**RESOLVIDO em 19.08.2026.** O arquivo já está em
`landing/site/public/unterentfelden-luftaufnahme-360-13-08-2026.jpg` (3,1 MB, panorama
equiretangular, XMP GPano verificado e íntegro). `DOWNLOAD_URL` aponta pra ele.
O padrão de degradação continua valendo: se a constante ficar vazia, o botão não renderiza.

---

## Frente 2 — Edge Function `drone-unterentfelden-lead`

Projeto Supabase `ghwjetvazmdlaqidgxqi` (mesmo do Hermes). O código **não vive no repo**, é
gerenciado via MCP Supabase. Ler a versão atual antes de alterar.

Mudanças:

1. **Novos campos:** `pergunta_1`, `pergunta_2`, `pergunta_3`, `pergunta_4`, `consentimento` (bool).
   Campos removidos: `endereco`, `pagamento`.
2. **A gravação em `email_contatos` passa a ser condicional.** Hoje salva todo mundo com a tag
   `lead-drone-unterentfelden`. Novo comportamento: só grava em `email_contatos` **se
   `consentimento === true`**, com data e origem do consentimento registradas. Quem só respondeu
   as perguntas sem marcar o checkbox **não entra na base de email marketing**. Isso é o que
   torna o desacoplamento real e não decorativo.
3. **As respostas do questionário** vão para a notificação Resend ao Felipe de qualquer forma
   (é o dado da pesquisa), com `reply_to` apontando pro respondente, como já faz hoje.
4. Manter rate limit (`lead_capture_rate_limit`, 5/10min por IP) e o honeypot `botcheck`.

**CORS:** travado hoje em `https://drone-unterentfelden.vercel.app`. Só mexer se o domínio mudar.

---

## Frente 3 — Analytics

PostHog, mesmo padrão do site RV (`src/lib/posthog.ts` de lá), mas **em modo cookieless**:
`persistence: "memory"`, sem banner de consentimento.

Variáveis de ambiente, **mesmos nomes** do site RV para não inventar convenção nova:

```
VITE_POSTHOG_PROJECT_TOKEN=
VITE_POSTHOG_HOST=
```

`.env` no `.gitignore`, `.env.example` com os nomes vazios. Valores no painel do PostHog — o
Felipe pega e coloca, **nunca colar no chat** (regra permanente do `AGENTS.md`, seção 3).

### Plano de medição — os eventos que respondem "quantos clicaram"

| Evento | Dispara quando |
|---|---|
| `$pageview` | automático |
| `tour_open` | clica em "abrir em nova aba" ou no botão de tela cheia do 360° |
| `download_click` | clica no botão de download da foto |
| `form_submit` | envia o questionário com sucesso |
| `newsletter_optin` | envia com o checkbox marcado |

Com autocapture ligado, qualquer clique não previsto também é registrado.

---

## Frente 4 — Os 24 emails

**Gerador:** `emails/gerador-emails.py`. Regenerar pelo script, nunca editar os 24 à mão.

### Armadilha conhecida

O script lê `eligible.tsv` do diretório atual, e **esse arquivo não está na pasta**. Existe
`dados/elegiveis-30.csv` (separador `;`). Primeiro passo da regeneração é reconstruir o TSV a
partir do CSV, respeitando a ordem de colunas que o script espera
(`name, cat, addr, dom, ems, phone, claim, rc, sc, imgs`). Sem isso o script não roda.

### O que muda no script

| Trecho | Ação |
|---|---|
| `URL` | Aponta para a landing (mudar se o subdomínio próprio entrar) |
| Bloco "Konkret bekommen Sie drei Dinge" | Vira dois itens: a imagem, e o link navegável. **O item 2 atual, "Die Einbindung dieser Aufnahme in Ihr Google Unternehmensprofil", sai** |
| `Der Einführungspreis ... CHF 20 pro Betrieb` | **Removido** |
| Variante 1 / Variante 2 de pagamento | **Removidas** |
| CTA final (pede link do perfil + variante) | Vira: baixe a imagem e, se quiser, responda 4 perguntas |
| `claim_de` (parágrafo do perfil não reivindicado) | **Sai.** Prometia configurar o perfil, que não fazemos mais |
| `FIXED_DE` | **Mantém.** É o parágrafo verdadeiro sobre o que a imagem mostra, corrigido em 13.08 |
| `fotos_line()` | **Mantém.** Observação concreta e verificável, personaliza sem inventar |
| `GREET` | **Mantém.** Nominal só onde pessoa e gênero estão confirmados |
| Bloco PT abaixo da linha de `=` | **Mantém.** É o que o Felipe lê e apaga antes de enviar |

### Modelo do email (texto aprovado em 19.08)

```
Betreff: 360°-Luftaufnahme von Unterentfelden für [Betrieb]

Guten Tag

Ich bin Felipe von Real Vision 360. Am 13.08.2026 habe ich das Quartier
Distelberg in Unterentfelden per Drohne in 360° aufgenommen. [Betrieb] an
der [Strasse] liegt mitten in dieser Aufnahme.

Die Aufnahme gehört Ihnen, kostenlos. Sie zeigt, wo Ihre Adresse im
Quartier liegt und wie die Umgebung aussieht. Sie können sie frei
verwenden: auf Ihrer Website, in Ihrem Google-Profil oder in den sozialen
Medien.

Warum kostenlos: Real Vision 360 arbeitet seit Jahren in Brasilien und
baut gerade den Schritt in den Schweizer Markt auf. Bevor ich hier etwas
anbiete, möchte ich verstehen, was Betriebe wie Ihrer wirklich brauchen.
Ihre Einschätzung ist mir im Moment mehr wert als ein Auftrag.

Deshalb meine Bitte: vier kurze Fragen, etwa zwei Minuten.

[Link]

Dort finden Sie auch die begehbare 360°-Aufnahme und den Download.

Freundliche Grüsse
Felipe Garcia
Real Vision 360
realvisionmaps.com

P.S. Die Aufnahme bekommen Sie in jedem Fall. Die Fragen sind freiwillig.
```

**Tradução PT, para o Felipe conferir o sentido:** *"Sou o Felipe da Real Vision 360. Em
13.08.2026 fotografei o bairro Distelberg em Unterentfelden com drone, em 360°. O [negócio] na
[rua] está no meio dessa imagem. A imagem é sua, de graça. Mostra onde seu endereço fica no
bairro e como é o entorno. Use livremente: no site, no perfil do Google ou nas redes. Por que de
graça: a Real Vision trabalha no Brasil há anos e está entrando no mercado suíço agora. Antes de
oferecer algo aqui, quero entender do que negócios como o seu realmente precisam. Sua opinião
vale mais pra mim agora do que um pedido. Por isso o pedido: quatro perguntas curtas, uns dois
minutos. [link]. Lá você também encontra a imagem 360° navegável e o download. P.S. A imagem
você recebe de qualquer jeito. As perguntas são voluntárias."*

Regras de alemão suíço que valem para tudo: sempre `ss`, nunca `ß`. Tratamento `Sie`.
Fecho `Freundliche Grüsse`. Data sempre absoluta, nunca "hoje".

### Email de teste — pendência aberta

O Felipe pediu o modelo no email de teste dele. O teste de 13.08 foi para
`smarthomefg@gmail.com` e `romana.loznjakovic@gmail.com`. **Confirmar o endereço com ele antes
de disparar** — não presumir.

### Os 24 rascunhos no Gmail

Continuam com o texto de **antes** da revisão de 13.08. Serão regravados com a versão nova, não
com a de agosto. O Felipe revisa um a um e apaga o bloco em português antes de enviar.

---

## Frente 5 — Documentação

### LBOS (`LBOS/`)

**Regra inquebrável: nunca editar nem apagar [[DEC-2026-002]] e [[DEC-2026-003]].** O modelo
comercial novo nasce como nó próprio.

- **Criar `LBOS/08-Decisoes/DEC-2026-004.md`** — "Campanha Unterentfelden passa de venda a
  validação de mercado gratuita". `decide_sobre` e `altera` apontando para [[DEC-2026-002]] e
  [[DEC-2026-003]]. Seguir `00-Sistema/CONVENCOES.md`, com as 6 perguntas de impacto respondidas
  e aprovadas pelo Felipe **antes** de escrever.
- **Atualizar [[TAR-2026-005]]** — nova lista de "falta", nova definição de "como saber que
  terminou" (agora é a taxa de resposta, não os 24 enviados).
- **Atualizar `LBOS/02-Projetos/real-vision/PROJETO.md`** — linha nova no Histórico.

### Company OS

- **Atualizar [[HANDOFF]]** desta pasta — é o ponto de entrada de qualquer sessão nova. Seções
  1, 2, 6, 8 e 10 ficam desatualizadas com essa mudança. **Incluir o link de volta para este
  plano**, que ficou pendente porque a sessão que o escreveu só tinha autorização para criar
  este arquivo.
- **Atualizar `landing/BRIEFING-LANDING.md`** — carrega o modelo antigo inteiro (preço, visita
  de 15 min, Web3Forms, nota "sem newsletter").
- **Atualizar `landing/site/README.md`** — remover a seção do `capture-community-lead`,
  documentar as variáveis de ambiente do PostHog e o `DOWNLOAD_URL`.
- **Criar nó de conhecimento no LBOS** sobre validação de mercado gratuita como porta de entrada.
  Só depois das respostas, não agora — sem resultado não há conhecimento a registrar.

### Lixo na pasta (não apagar sem OK)

`emails/` tem 3 arquivos de 0 byte com nome quebrado: `25)`, `content.split(oldS).length`,
`x.name`. São resquício de `node -e` com caminho do Windows. **Apenas reportar ao Felipe e
esperar autorização** — a regra do Company OS é nunca apagar sem aprovação explícita.

---

## Frente 6 — Jurídico (não é opcional)

1. **Nenhum voo novo.** Oberentfelden, resto de Aarau, qualquer bairro: parados até o Amt für
   Migration responder. Essa linha entra escrita na `DEC-2026-004`.
2. **Escrever para `arbeitsbewilligungen.mika@ag.ch`** (ou ligar: +41 62 835 18 60). É grátis, é
   a própria autoridade que decide, e agora a pergunta ficou fácil: "posso distribuir
   gratuitamente uma imagem que já capturei?" A pesquisa de 14.08 já lista isso como a pergunta
   aberta nº 1. Rascunhar o email em alemão para o Felipe revisar e enviar.

---

## O que o Felipe precisa entregar antes da próxima sessão

| # | Item | Bloqueia |
|---|---|---|
| 1 | ✅ **ENTREGUE 19.08** — panorama 360 em `landing/site/public/`, XMP verificado | — |
| 2 | ✅ **ENTREGUE 19.08** — PostHog no `.env` (US Cloud, `https://us.i.posthog.com`) | — |
| 3 | ✅ **CONFIRMADO 19.08** — email de teste é `smarthomefg@gmail.com`, só ele, sem a Romana | — |
| 4 | Registro **DNS na Hostinger**: `A`, nome `unterentfelden`, valor `76.76.21.21` | Só o subdomínio próprio. Não bloqueia o resto |

---

## Ordem de execução (sessão nova)

1. `DEC-2026-004` no LBOS **primeiro** — a decisão antes da execução, com as 6 perguntas de
   impacto apresentadas ao Felipe e aprovadas antes de escrever
2. Reconstruir `eligible.tsv` a partir de `dados/elegiveis-30.csv`
3. Alterar `gerador-emails.py` e regenerar os 24 emails
4. Enviar o modelo para o email de teste, esperar OK do Felipe
5. Reescrever a landing (`index.html`, `main.js`, `style.css`) em alemão
6. Documento de tradução PT ao lado, para o Felipe aprovar o conteúdo
7. Instalar e configurar o PostHog + os 5 eventos
8. Atualizar a Edge Function via MCP Supabase
9. Testar ponta a ponta (abaixo)
10. Deploy `npx vercel --prod` **só depois do OK do Felipe**
11. Atualizar [[HANDOFF]], `BRIEFING-LANDING.md`, `README.md`, [[TAR-2026-005]], `PROJETO.md`
12. Regravar os 24 rascunhos no Gmail
13. Rascunhar o email para o Amt für Migration

Passos 12 e 13 podem virar sessão separada se a primeira ficar longa.

---

## Verificação

**Landing, local** (`npm run dev`, ou entrada `drone-unterentfelden` do `.claude/launch.json`):

- [ ] Nenhuma ocorrência de "CHF", "20", "Preis", "bezahlen" na página. Buscar no HTML final
- [ ] Botão de download baixa o arquivo certo. Com `DOWNLOAD_URL` vazia, o botão **não aparece**
      (nunca aponta pra `#`)
- [ ] 360° embutido carrega e o botão de tela cheia funciona
- [ ] Enviar o formulário **sem** marcar o opt-in → confirmar no Supabase que o contato **não**
      entrou em `email_contatos`, e que a notificação Resend chegou com as 4 respostas
- [ ] Enviar **com** o opt-in marcado → contato entra em `email_contatos` com data de consentimento
- [ ] Nota de privacidade descreve exatamente esse comportamento, sem contradição
- [ ] Alemão: buscar `ß` no arquivo inteiro, tem que dar zero
- [ ] Mobile em 390px de largura (regra da casa: print na largura do alvo, Playwright verde não basta)

**Analytics:**

- [ ] PostHog recebendo `$pageview` em tempo real
- [ ] Clicar em download, tour e enviar formulário → os 3 eventos aparecem no PostHog
- [ ] Nenhum cookie criado (DevTools → Application → Cookies, tem que estar vazio)

**Emails:**

- [ ] Os 24 regerados sem nenhuma menção a preço, a publicação no Google ou a variante de pagamento
- [ ] O link aponta para a URL que está no ar
- [ ] Bloco PT presente abaixo da linha de `=` em todos os 24

**Depois do deploy:**

- [ ] Abrir a URL de produção e repetir o envio do formulário (o CORS só libera o domínio real)

---

## Riscos conhecidos

| Risco | Mitigação |
|---|---|
| **Grátis ancora o preço em zero** para esses 24 | Nomear como piloto datado no texto: "Pilotphase, August 2026". O grátis fica colado no piloto, não no serviço |
| **Ninguém responde**, porque as perguntas são opcionais | É o custo aceito do desacoplamento, e é o que o torna legalmente limpo. O critério de sucesso (6 de 24) já assume taxa baixa |
| **Trocar o domínio quebra o formulário em silêncio** | O CORS está travado por domínio na Edge Function. [[landing-de-campanha-com-captura-propria]] já registra essa mordida. Atualizar os dois juntos, sempre |
| **`eligible.tsv` ausente** trava a regeneração | Passo 2 da ordem de execução existe só por causa disso |
| **Alguém pede a publicação no perfil do Google** | Não é escopo da campanha. O Felipe ensina em privado, e pode cobrar (decisão 5). A landing não promete isso em lugar nenhum |
| **Voo novo sem autorização** | Linha vermelha escrita na `DEC-2026-004`. Nenhum voo até o Amt für Migration responder |

---

## Fontes lidas para escrever este plano

[[HANDOFF]] · [[DEC-2026-002]] · [[DEC-2026-003]] · [[TAR-2026-005]] ·
`LBOS/02-Projetos/real-vision/PROJETO.md` · [[landing-de-campanha-com-captura-propria]] ·
`operacao/marketing/email-marketing/00-ESTRATEGIA.md` ·
`operacao/prospeccao/ACQUISITION-OPERATING-SYSTEM.md` ·
`operacao/gestao/juridico-fiscal/PESQUISA-PAGAMENTOS-SUICA-2026-08-14.md` ·
`landing/BRIEFING-LANDING.md` · `landing/site/{index.html,src/main.js,README.md}` ·
`emails/gerador-emails.py` · `emails/revisao-emails.md` ·
`real-vision-site/{index.html,src/lib/posthog.ts,src/components/ConsentBanner.tsx}`
