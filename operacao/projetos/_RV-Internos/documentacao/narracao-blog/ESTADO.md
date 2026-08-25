# ESTADO — Narração nos posts do blog

> **Primeiro arquivo a ler em toda sessão nova deste projeto.**
> Ver também: [[DECISOES]] · [[NARRACAO-SINCRONIZADA-BLOG]] (playbook técnico, move pra cá no Bloco 5) · [[BLOG-POSTS-PIPELINE]]

**Objetivo:** levar o leitor narrado da Academy (PRD-008) para os posts do blog, com entrada suave dentro da própria página do post.

> ## 🟢 NO AR desde 25/08/2026
> Publicado em `realvisionmaps.com` (commit `eacdae6`). O post `site-maior-ativo-era-ia`
> está narrando para qualquer visitante.
>
> **Uma pendência:** o site publicado serve o áudio de `public/audio/`, não do Supabase —
> a variável `VITE_BLOG_AUDIO_BASE` não chegou ao build da Vercel. Ver
> [[AUDIO-NO-SUPABASE]]. Nada quebrado; o `.mp3` continua no repositório e é ele que está
> tocando no ar.

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
| 5 | A linha de produção das narrações | — (depende de ffmpeg + Python + Docker e de o Felipe gravar) |
| 6 | Verificação final e publicação | **Feito — 25/08/2026.** Publicado e verificado em produção; falta só a Academy (área logada) e a variável da Vercel |

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

## Próximo bloco

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
