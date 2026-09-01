# ESTADO — Narração nos posts do blog

> **Primeiro arquivo a ler em toda sessão nova deste projeto.**
> Ver também: [[DECISOES]] · [[NARRACAO-SINCRONIZADA-BLOG]] (playbook técnico, move pra cá no Bloco 5) · [[BLOG-POSTS-PIPELINE]]

**Objetivo:** levar o leitor narrado da Academy (PRD-008) para os posts do blog, com entrada suave dentro da própria página do post.

> ## 🟢 DOIS POSTS NO AR — o segundo desde 01/09/2026
> `site-maior-ativo-era-ia` (25/08, commit `eacdae6`) e
> `google-meu-negocio-guia-completo-negocios-locais` (01/09, commit `a9ebf6e`) estão
> narrando para qualquer visitante em `realvisionmaps.com`.
>
> **A pendência da Vercel caiu.** Verificado em produção em 01/09: o áudio dos posts é
> servido do bucket Supabase, não de `public/audio/`. A `VITE_BLOG_AUDIO_BASE` está no
> build. Ver [[AUDIO-NO-SUPABASE]], que ficou histórico.
>
> **Sobra dali uma gordura:** os dois `.mp3` continuam no repositório sem serem usados
> (13 MB). Podem sair num commit de limpeza — decisão do Felipe.

**Repositório:** `operacao/projetos/_RV-Internos/sites/real-vision-site`
**Plano completo:** `C:\Users\Felipe Garcia\.claude\plans\perfeito-me-fa-a-as-mellow-hollerith.md`

---

## Onde paramos

| Bloco | O que é | Situação |
|---|---|---|
| 0 | Separar o motor de áudio (nada muda na tela) | **Feito e aprovado — 25/08/2026** |
| 1 | A entrada suave no post | **Feito e aprovado no celular — 25/08/2026** |
| 2 | A barrinha que some e volta | **Feito e testado — 25/08/2026** |
| 3 | Os controles | **Feito e testado — 25/08/2026** |
| 4 | Áudio no Supabase + qualquer post | **Feito — 25/08/2026.** Falta só a variável na Vercel, que trava a saída do `.mp3` do repositório (ver [[AUDIO-NO-SUPABASE]]) |
| 5 | A linha de produção das narrações | **Fechado — 01/09/2026.** Segundo post narrado ponta a ponta, skill `rv-blogpost-audio` criada, publicado e verificado em produção |
| 6 | Verificação final e publicação | **Feito — 25/08/2026.** Publicado e verificado em produção; a variável da Vercel se resolveu (confirmado 01/09). Falta só o Felipe conferir a Academy no celular (área logada) |

---

## Bloco 0 — o que foi feito (25/08/2026)

Nasceu `src/hooks/useNarrationEngine.ts`: o encanamento do áudio que não sabe o que é
aula, curso nem login. Recebe um endereço de áudio e a lista de frases; devolve
tocar/pausar, pular segundos, pular frase, qual frase está ativa, volume e a conversa com
o controle de mídia do sistema (notificação do Android, tela de bloqueio).

`src/hooks/useNarratedAudio.ts` deixou de fazer isso e virou consumidor. Ficou só com o
que é da Academy: a URL assinada do Supabase que se renova sozinha, a contabilização de
escuta real, retomar de onde parou e tentar de novo quando a URL falha. **A interface que
ele devolve é a mesma de antes** — o `NarratedLessonPage` não mudou uma linha.

Também nasceu `src/hooks/useNarrationEngine.test.tsx`, a rede de segurança do motor: 8
testes que simulam o áudio e conferem frase ativa, play/pause, pular frase nas pontas,
±15s e o aviso de tempo pra quem está ouvindo. Como Academy e blog vão dividir esse
motor, é este teste que avisa se um bloco futuro quebrar a Academy.

**Zero mudança visual.** Nenhum componente foi tocado.

### Verificação

- `npx tsc --noEmit` limpo
- `npm run build` limpo
- `npm run test` — 19 testes passando (11 de antes + 8 novos)
- Academy abrindo no navegador em 390px, zero erro de console

**Pendente de humano:** o Felipe abrir uma aula narrada no celular e confirmar que está
igual. A área logada da Academy não é alcançável por verificação automatizada.

### Arquivos

| Arquivo | O que houve |
|---|---|
| `src/hooks/useNarrationEngine.ts` | novo — o motor |
| `src/hooks/useNarrationEngine.test.tsx` | novo — rede de segurança |
| `src/hooks/useNarratedAudio.ts` | virou consumidor; `formatTime` segue exportado daqui, quem importava não mudou |

---

## Bloco 1 — o que foi feito (25/08/2026)

O post ganhou um convite discreto logo abaixo do compartilhar: um botão com o tempo da
narração. Ao aceitar, o post vira experiência narrada **na própria página** — sem trocar
de tela, sem modal.

**O que entra em cena:** o trecho que está tocando acende num retângulo âmbar e o texto ao
redor recua; a página acompanha sozinha; e uma barra no rodapé com tocar/pausar, o tempo,
progresso arrastável e o botão de sair. Esc também sai.

**O que sai de cena:** voltar ao blog, autor e data, curtir, compartilhar, capa, índice
lateral, a chamada do fim, tags, comentários, navegação entre posts e o rodapé. Tudo
encolhendo junto, não sumindo de um quadro pro outro.

**A posição de leitura na saída** foi o ponto delicado. Voltar tudo aquilo devolve mais de
600px acima do texto — o parágrafo que a pessoa estava ouvindo seria empurrado pra fora da
tela. Durante a transição, a cada quadro, o topo do corpo do texto é medido e a janela rola
na mesma medida. Medido em três rodadas de entrar e sair: **2 a 6px de deslize**.

### Arquivos

| Arquivo | O que é |
|---|---|
| `src/components/blog/narrated/useBlogNarration.ts` | novo — liga/desliga o modo narrado e segura o texto no lugar |
| `src/components/blog/narrated/ListenInvite.tsx` | novo — o convite |
| `src/components/blog/narrated/NarrationBar.tsx` | novo — a barra do rodapé |
| `src/components/blog/narrated/NarrationCollapse.tsx` | novo — o pedaço da página que recua |
| `src/components/blog/narrated/NarratedReadingStyles.tsx` | novo — o visual do texto narrado |
| `src/pages/BlogPost.tsx` | ligou tudo |
| `src/components/narration/NarratedSpans.tsx` | ganhou `data-frag-active` (aditivo; Academy não muda) |
| `src/components/blog/AudioTextSync.tsx` | **removido** — o player de waveform saiu de cena |

### Verificação

- `npx tsc --noEmit` e `npm run build` limpos
- `npm run test` — 19 passando
- Entrar e sair 3x seguidas: sempre volta inteiro (capa, comentários, rodapé), sem pulo
- Post em inglês: nenhum convite, nenhum áudio carregado (D-8)
- Post sem narração: página intacta, nada injetado
- Zero erro de console em 390px e em 1280px

**Pendente:** o Felipe olhar os prints e dizer se a experiência está gostosa de usar.

---

## Bloco 2 — o que foi feito (25/08/2026)

A barra virou duas camadas, como a da Academy: o **filete de progresso nunca sai da tela**
e a linha de controles monta em cima dele. No celular, 4 segundos tocando e a linha de
controles se recolhe sozinha — sobra o filete e o texto fica com a tela inteira. Um toque
em qualquer lugar traz os controles de volta, e a contagem recomeça do zero. No desktop
nada se recolhe.

O `useImmersiveChrome`, que é da Academy, ganhou uma opção (`recolherSozinhoMs`) que só o
blog usa. Sem ela o hook se comporta exatamente como sempre — **a Academy continua
chamando com um argumento só e o D-032 de lá (nada de timer de ocioso) segue valendo**.

### Verificação

| O que | Resultado |
|---|---|
| Barra com controles → depois de 4s | 64px → 4px (só o filete) |
| Toque na tela | volta a 64px |
| Pausar | volta a 64px, com o Sair alcançável |
| Desktop, 6s tocando | segue em 64px, não recolhe |
| Toque num link do texto | revela a barra **e** o clique chega ao link |
| `tsc`, `build`, 19 testes | limpos |

**Pendente:** o Felipe usar no celular e dizer se 4 segundos é o tempo certo — é o número
mais provável de precisar de ajuste.

---

## Bloco 3 — o que foi feito (25/08/2026)

A barra ficou completa para o que o blog precisa: **voltar 15s, tocar/pausar, avançar 15s,
o tempo, e sair**. No fim da narração o play vira "ouvir de novo". As setas do teclado,
com o progresso em foco, também saltam 15s.

**D-17 resolvido: a barra do blog não virou o `BottomPlayer` da Academy.** O de lá tem
quatro saltos, materiais, marcadores, velocidade e painel expandido, não tem botão de
sair, e a geometria dele conta com a faixa imersiva que aqui não existe. O que foi
repetido é a linguagem visual — mesmo âmbar, mesmo play de 46px, mesmo desenho de salto —
não o componente.

### Dois defeitos corrigidos de passagem

1. **O relógio marcava "8:04 / 8:03" no fim.** O browser às vezes só anuncia a duração
   real num `durationchange` posterior ao `loadedmetadata`; o motor agora escuta os dois
   (com teste novo), e a barra nunca mostra além do fim.
2. **O áudio podia continuar tocando sem interface** se a narração fosse desligada por
   algum caminho que não o botão Sair. Agora sair do modo narrado sempre pausa.

### Verificação

| O que | Resultado |
|---|---|
| −15s / +15s pelos botões | 100s → 115s → 100s |
| Setas do teclado no progresso | mesmo salto de 15s |
| Fim da narração | play vira "ouvir de novo"; clicar reinicia e toca |
| Relógio no fim | "8:04 / 8:04" |
| Sair | sempre pausa o áudio |
| `tsc`, `build`, 21 testes | limpos |

**Pendente:** o Felipe testar no celular.

---

## Bloco 4 — o que foi feito (25/08/2026)

### Metade pronta: o catálogo

O `BlogPost.tsx` não conhece mais nenhum post específico. Nasceu
`src/data/blog-audio/index.ts`: registre a narração ali e o convite aparece sozinho
naquele post, só em português. Narrar um post novo deixou de exigir mexer na página.

O endereço do áudio passou a ser montado a partir de uma base configurável
(`VITE_BLOG_AUDIO_BASE`). Sem a variável, do próprio site, como hoje; com ela, de fora —
é o caminho pro áudio ir pro Supabase sem publicar o site de novo.

Entrou também o teste do catálogo: post com áudio, post sem áudio, inglês, alemão, post
inexistente e a montagem do endereço. **27 testes no total.**

De quebra: o `.env.example` que faltava. O `.gitignore` ignorava `.env*` inteiro, então nem
o modelo sem valores entrava no git.

### Metade dois: o áudio saiu do repositório (quase)

O Felipe criou o bucket público `blog-audio` no Supabase "realvision academy" (conta
`smarthomefg@gmail.com`) e subiu o `.mp3`. Confirmado: HTTP 200, `audio/mpeg`, 6,58 MB, sem
autenticação. A variável foi ligada no `.env` local e **o post narra com o áudio vindo do
Supabase, com a sincronia do texto intacta**.

**Falta um passo, que é do Felipe:** a mesma variável na Vercel
(`VITE_BLOG_AUDIO_BASE`, ver [[AUDIO-NO-SUPABASE]]). Enquanto ela não existe lá, o site
publicado continua servindo de `public/audio/` — por isso **o `.mp3` ainda não saiu do
repositório**. Ele é a única rede de segurança que resta; sai depois da publicação do
Bloco 6, com o áudio do Supabase confirmado no ar.

---

## Publicação — 25/08/2026

Publicado com autorização explícita do Felipe. Seis commits, de `ab859fa` a `eacdae6`.

**Um defeito real apareceu na verificação final**, e vale registrar porque quase passou:
o teste do catálogo lia o `.env` da máquina, então ficou vermelho assim que o Supabase
entrou em uso. Ao consertar o teste, apareceu o defeito de verdade — `VITE_BLOG_AUDIO_BASE=`
**vazia** (o que sai de copiar o `.env.example` sem preencher) passava pelo `??` e virava
base vazia, montando `/arquivo.mp3`, caminho errado, áudio que não carrega. Corrigido, com
teste dos quatro casos: sem base, base vazia, base configurada e base com barra sobrando.

### Verificado no site publicado

| O que | Resultado |
|---|---|
| Post narrado em PT | convite aparece, modo narrado entra, áudio toca, destaque acompanha |
| Post em inglês | nenhum convite, nenhum áudio carregado |
| Post sem narração | intacto, comentários e curtir funcionando |
| Console | sem erros |

**Não verificado por aqui:** a Academy (área logada, sem alcance automatizado) — pedido ao
Felipe.

### A variável da Vercel não chegou ao build

O pacote publicado tem `"/audio"` embutido e nenhuma referência ao Supabase — prova de que
`VITE_BLOG_AUDIO_BASE` não existia no momento do build. O site funciona porque o `.mp3`
ainda está no repositório.

Não é urgente e não quebra nada. Quando for resolvido (ver [[AUDIO-NO-SUPABASE]]), basta
uma nova publicação e aí sim o `.mp3` pode sair do repositório.

---

## Publicação do segundo post — 01/09/2026

O trabalho do Bloco 5 tinha ficado parado no disco desde 26/08: os arquivos gerados,
verificados e nunca commitados. Esta sessão só fechou o que faltava — **nada do pipeline
foi rodado de novo**. O `.m4a` que o Felipe trouxe pra esta sessão é a mesma gravação de
agosto (489,93s, idêntica ao `completo.mp3` já processado), não uma regravação.

Publicado no commit **`a9ebf6e`**: o sync map do post, o registro no catálogo e o `.mp3`
em `public/audio/`.

### O que a verificação em produção revelou

O post narrado abriu em `realvisionmaps.com` e o áudio veio **do bucket Supabase** —
`https://xomtfkbvathddfpbknyo.supabase.co/storage/v1/object/public/blog-audio/…`.

Isso encerra a pendência que estava aberta desde 25/08: a `VITE_BLOG_AUDIO_BASE` está no
build da Vercel. Os dois `.mp3` também já estão no bucket (checados por HTTP, os dois 200).

Consequência: o `.mp3` commitado nesta sessão **não é usado por ninguém**. Foi commitado
porque a decisão da sessão ainda era a do post anterior, tomada antes de a verificação
mostrar o contrário. Não quebra nada — é rede de segurança se a variável cair. Se o Felipe
quiser, os 13 MB dos dois arquivos saem num commit de limpeza.

### Verificação desta sessão (390px, Playwright)

| O que | Resultado |
|---|---|
| `tsc`, `npm run test`, `npm run build` | limpos; 30 testes |
| Convite | "Ouvir este post — 8 minutos" |
| Áudio | 469,212s, `readyState 4`, sem erro |
| 6 instantes conferidos contra o `.srt` | texto aceso correto nos 6 |
| Âncoras (300s lista de erros, 380s métricas) | não acendem — correto |
| Negrito | 22 dos 27 spans com `<strong>` |
| Sair | pausa e devolve capa, comentários e rodapé |
| EN (`google-business-profile-complete-guide`) | sem convite, sem áudio |
| Console | 0 erros (2 avisos do React Router, pré-existentes) |
| Produção, pós-deploy | convite aparece, áudio do Supabase, destaque correto em 2:00 |

Print: `TEMP/audio-gmn/gmn-narrado-390-verificacao-01-09.png`.

### O que ficou pra próxima sessão

- **`site-maior-ativo-era-ia` continua sem os negritos** no modo narrado (fragmentos
  salvos sem os `**`, antes da D-45). Conserta rodando o pipeline de novo nele — decisão
  do Felipe de deixar pra depois, tomada nesta sessão.
- Os dois `.mp3` no repositório, agora sem uso (ver acima).
- O Felipe conferir uma aula narrada da Academy no celular — pendência do Bloco 0, que
  verificação automatizada não alcança.

---

## Bloco 5 — o que foi feito (26/08/2026, no PC do Brasil)

Segundo post narrado: **`google-meu-negocio-guia-completo-negocios-locais`**. O processo inteiro
rodou do zero e virou a skill **`rv-blogpost-audio`** (`skills/rv-blogpost-audio/`), com os três
scripts do pipeline dentro dela.

### A descoberta que mudou o processo

O Felipe **não lê o post literalmente**. Ele narra títulos, cards, listas de erro, métricas e
modalidades — blocos que o playbook original mandava pular por "não fazerem sentido narrados" —
e improvisa comentários que não existem em bloco nenhum.

Isso quebra a premissa do Aeneas, que assume que o texto entregue é a transcrição do áudio. Na
primeira tentativa, com só os 29 trechos de prosa, mediu-se **14 segundos de deriva** no trecho
das métricas: o destaque ficava aceso na frase errada por um quarto de minuto.

A saída foi separar as unidades em duas categorias:

- **Destacável** — `paragraph`, `highlight`, `list`. Entra no `blockMap` e acende na tela.
- **Âncora** — títulos, cards, listas de erro, métricas, modalidades e os improvisos. Vai para o
  Aeneas para segurar a régua do alinhamento, mas não entra no `blockMap`: o `BlogPost.tsx` só
  sabe destacar os três tipos de cima. O áudio passa por elas sem acender nada.

Com as âncoras no lugar, a deriva típica caiu para **menos de 2 segundos**.

### O que a transcrição virou

O Whisper deixou de ser opcional. É ele que revela o que foi realmente narrado, onde cada
improviso caiu e onde cortar. Farol rápido: duração dividida por número de unidades entre 6 e 10
segundos é saudável — este post começou marcando 17s por unidade, que foi o sinal de alarme.

### Dois defeitos corrigidos de passagem

1. **O negrito sumia no modo narrado.** O `renderNarratedSpans` desenha o parágrafo a partir do
   texto do fragmento e passa por `boldify` — e os fragmentos do primeiro post foram salvos sem
   os `**`. Agora o texto vai para o Aeneas limpo e é salvo com os marcadores. **O post
   `site-maior-ativo-era-ia` continua com o defeito**; conserta rodando o pipeline de novo nele.
2. **A posição do improviso importa.** Um comentário que o Felipe fez no meio da lista de
   elementos essenciais foi colocado no fim do bloco e custou 6s de erro em duas unidades
   destacáveis. Daí o campo `depoisDe` no `improvisos.json`.

### Sobre o áudio deste post

Gravação de 8min10s. Os últimos ~25s são uma chamada final que não existe no texto do post
("é só entrar em contato com a gente no fim desse post... muito obrigado"). Cortada com ffmpeg
(D-44), porque não havia nada para acender e só atrapalhava o alinhamento. Áudio final: **7min49s,
6,39 MB**.

### Verificação

| O que | Resultado |
|---|---|
| Fim do último fragmento x duração do MP3 | 469,20s x 469,21s |
| Deriva conferida contra a transcrição | típica < 2s; pior destacável 4,1s |
| Convite, entrada, áudio, destaque | ok em 390px e 1280px |
| 6 instantes espalhados conferidos contra o `.srt` | texto aceso correto em todos |
| Negrito no modo narrado | preservado |
| Sair | devolve capa, comentários e rodapé; pausa o áudio |
| Mesmo post em EN | nenhum convite, nenhum áudio carregado |
| `tsc` + `npm run test` | limpos, 30 testes |

**Pendente de humano:** o Felipe olhar os prints e ouvir o post narrado de ponta a ponta — a
deriva de 4s numa unidade é o tipo de coisa que só o ouvido julga.

### Arquivos

| Arquivo | O que é |
|---|---|
| `skills/rv-blogpost-audio/SKILL.md` | novo — o processo inteiro |
| `skills/rv-blogpost-audio/scripts/extrair.mjs` | novo — post → unidades faladas |
| `skills/rv-blogpost-audio/scripts/montar-sync.mjs` | novo — syncmap → arquivo do site |
| `skills/rv-blogpost-audio/scripts/conferir.mjs` | novo — farol de deriva |
| `src/data/blog-audio/google-meu-negocio-guia-completo-negocios-locais.ts` | novo — 65 fragmentos, 27 destacáveis |
| `src/data/blog-audio/index.ts` | segundo post registrado no catálogo |

### O que falta para este post ir ao ar

1. **O Felipe subir o `.mp3`** no bucket `blog-audio` (conta `smarthomefg@gmail.com`), com o nome
   exato `google-meu-negocio-guia-completo-negocios-locais.mp3`. O arquivo está em
   `TEMP/audio-gmn/` e também, só para o teste local, em `public/audio/` — **não commitado**.
2. **A variável na Vercel**, a mesma pendência do Bloco 4 ([[AUDIO-NO-SUPABASE]]). Enquanto ela
   não funcionar no build, publicar este post exigiria commitar mais 6,4 MB de áudio no
   repositório, que é justamente o que a D-7 quer evitar.

---

## Próximo bloco

> **Histórico — cumprido em 26/08/2026.** O aviso abaixo valeu até o Bloco 5 ser feito, no PC do
> Brasil, como planejado. Fica registrado porque a razão dele continua valendo: qualquer narração
> nova pede Docker e processamento, então é trabalho de PC, não de notebook.

# ⚠️ O Bloco 5 é no PC do Brasil, não no notebook

Decidido pelo Felipe em 25/08/2026: **o Bloco 5 fica para o PC de casa, no Brasil.** Ele
estava na Suíça, no notebook, quando os blocos 0 a 4 foram feitos — e o Bloco 5 é o único
que pede processamento pesado de verdade (alinhar áudio e texto com o Aeneas, dentro do
Docker). O PC de lá aguenta melhor.

**Não tentar rodar o Bloco 5 no notebook.** Se a sessão começar por lá, é para parar e
avisar.

## Bloco 5 — A linha de produção das narrações

Skills: `realvision`, `rv-blogpost`, `skill-creator`. Atualizar o playbook técnico
([[NARRACAO-SINCRONIZADA-BLOG]]), criar a skill `rv-blogpost-audio` e rodar o processo
inteiro uma vez num post novo, do zero.

### Antes de começar, no PC do Brasil

**1. Puxar tudo.** Dois repositórios, não um:

```
# o vault (este Company OS)
git pull

# o site
cd operacao/projetos/_RV-Internos/sites/real-vision-site
git pull origin main
```

**2. Recriar o `.env` do site.** Ele **não vai pro git**, de propósito — então não está
sincronizado. No PC do Brasil vai faltar. O modelo com os nomes das variáveis está em
`.env.example`, no repositório do site; os valores o Felipe pega no painel de cada serviço
(Supabase, PostHog). A do áudio é a única sem segredo:

```
VITE_BLOG_AUDIO_BASE=https://xomtfkbvathddfpbknyo.supabase.co/storage/v1/object/public/blog-audio
```

**3. Conferir as três ferramentas.** Gravar depende delas, e na última verificação
(04/08/2026, no notebook) **nenhuma estava instalada**:

| Ferramenta | Para quê | Checar com |
|---|---|---|
| **ffmpeg** | converter e cortar o áudio | `ffmpeg -version` |
| **Python 3** | os scripts `clean_text.py` e `build_final.py` | `python --version` |
| **Docker** | roda o Aeneas, que alinha o áudio ao texto | `docker --version` |

O que faltar, instalar antes — é o gargalo real deste bloco.

**4. O que o Felipe faz neste bloco:** escolher o post, congelar o texto e **gravar o
áudio**. O resto é conduzido.

Para começar, lá: **"vamos fazer o Bloco 5 da narração do blog"**.

---

## Duas pendências pequenas, de qualquer máquina

1. **A variável na Vercel** (ver [[AUDIO-NO-SUPABASE]]) — e depois dela, tirar o `.mp3` do
   repositório.
2. **Conferir a Academy no celular** — ela divide o motor de áudio com o blog e a área
   logada não tem verificação automatizada.
