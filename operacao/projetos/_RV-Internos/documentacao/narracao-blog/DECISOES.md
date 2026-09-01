# DECISÕES — Narração nos posts do blog

> Ver também: [[ESTADO]] · [[NARRACAO-SINCRONIZADA-BLOG]]

Decisões numeradas, com data e o porquê. Não reabrir sem motivo novo.

---

## Tomadas no plano (24/08/2026, com o Felipe)

| # | Decisão | Por quê |
|---|---|---|
| D-1 | Sem tela nova — o leitor acontece dentro da página do post | Trocar de tela quebra a leitura e perde o contexto do post |
| D-2 | Entrada suave, com animação, não corte seco | A transição é o que faz parecer acabado |
| D-3 | Barra some sozinha depois de alguns segundos, **só no celular** | Tela pequena; no desktop sobra espaço, então nada some |
| D-4 | Saída sempre visível | Ninguém pode ficar preso no modo narrado |
| D-5 | Painel enxuto: play/pause, −15s, +15s, sair | v1 sem marcadores, materiais nem velocidade |
| D-6 | Sem login, sem progresso salvo | O blog é público e anônimo |
| D-7 | Áudio no Supabase Storage público | Áudio novo sem publicar o site de novo |
| D-8 | Só português | EN e DE simplesmente não mostram o botão |
| D-9 | Motor único entre Academy e blog | Evita dois códigos parecidos que divergem com o tempo |
| D-10 | Iteração visual obrigatória a cada bloco | Print em 390px, revisão do Felipe, ajuste até ficar bom |

---

## Bloco 0 — 25/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-11 | O motor se chama `useNarrationEngine`, em `src/hooks/` | Nome neutro: não é da Academy nem do blog. Fica ao lado dos outros hooks compartilhados (`useNarrationAutoScroll`, `useImmersiveChrome`) |
| D-12 | `useNarratedAudio` continua existindo com a mesma interface | O `NarratedLessonPage` tem 700+ linhas apoiadas nela; mudar a interface no Bloco 0 seria arriscar a Academy sem ganho nenhum |
| D-13 | `formatTime` segue sendo exportado por `useNarratedAudio` (re-export do motor) | Quatro componentes da Academy importam de lá; trocar o caminho de import seria mexer em arquivo que não precisava mudar |
| D-14 | O motor recebe os avisos de tempo/duração/pausa por função opcional | É como a contabilização de escuta da Academy continua funcionando sem o motor saber que existe aula. O blog simplesmente não passa nada |
| D-15 | As funções de aviso ficam guardadas por referência dentro do motor | Quem consome costuma passar função nova a cada render; sem isso, os listeners do áudio se re-registrariam à toa |
| D-16 | Teste automatizado do motor entra já no Bloco 0 | O motor virou o ponto único de falha dos dois lados. É o teste que avisa se um bloco futuro quebrar a Academy — o risco número um do projeto |

---

## Bloco 1 — 25/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-17 | A barra do rodapé do blog é peça própria, não o `BottomPlayer` da Academy | O da Academy carrega velocidade, materiais, marcadores e nome de aula — tudo que D-5 e D-6 tiram do blog. Usá-lo agora seria passar meia dúzia de props vazias. **A ser reavaliado no Bloco 3**, que é o bloco dos controles: ou o `BottomPlayer` entra de vez, ou a barra do blog cresce até ele |
| D-18 | Só a **saída** compensa o scroll; a entrada não | O convite fica no topo do post, então na entrada não há posição de leitura a defender. Compensar ali brigaria com o auto-scroll que leva à primeira frase |
| D-19 | A compensação mede o topo do corpo do texto a cada quadro | A primeira tentativa media a altura do bloco de cima com `ResizeObserver` e deixava passar o que mudava fora dele (o respiro do artigo) — 14px de deslize. Medindo a âncora que precisa ficar parada, caiu pra 2-6px |
| D-20 | O que sai de cena **encolhe**, não fica com espaço vazio | Manter a altura evitaria qualquer pulo, mas deixaria buracos no post pra quem rolasse pra cima. Encolher + compensar dá o mesmo resultado sem buraco |
| D-21 | O destaque acende o **parágrafo**, não cada frase | O texto é um span por frase e o destaque já era do parágrafo inteiro. Pintados um a um, os fundos se encostavam em posições fracionárias de pixel e o bloco saía costurado, com degraus de tom. Um retângulo só resolve |
| D-22 | A folga do destaque vem de sombra espalhada, não de padding | Padding mudaria a altura das linhas entre os dois modos e desmontaria a compensação de scroll. A sombra dá o respiro sem ocupar espaço |
| D-23 | O `<audio>` fica montado o tempo todo, com `preload="none"` | O play precisa sair de dentro do clique (browser só libera som em gesto do usuário) e o `preload="none"` garante que nada é baixado até alguém aceitar o convite |
| D-24 | `data-frag-active` entra no `NarratedSpans`, que é compartilhado | O visual do blog precisava saber qual trecho está tocando sem se apoiar no nome de uma classe utilitária. É atributo aditivo: a Academy não muda em nada |
| D-25 | No desktop o índice lateral devolve a largura ao sair de cena | Só apagar deixava o texto encostado à direita do centro da tela |

---

## Bloco 2 — 25/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-26 | O recolhimento automático entra como **opção** do `useImmersiveChrome`, não como comportamento novo | O hook é da Academy, onde D-032 proíbe timer de ocioso. Sem a opção, nada muda lá. Duplicar o hook criaria os dois códigos parecidos que o D-9 existe pra evitar |
| D-27 | 4 segundos até recolher | Três é o padrão de player de vídeo, onde a pessoa está olhando a imagem. Aqui ela pode estar lendo os controles pela primeira vez. **É o número mais provável de mudar depois do teste em aparelho** |
| D-28 | No blog o toque **só revela**, nunca esconde | Na Academy o toque alterna (D-033), porque a tela inteira é do leitor. Aqui é um post com links: um toque que escondesse a barra faria o dedo de quem queria clicar num link parecer gesto de interface |
| D-29 | O filete de progresso muda de lugar: vai pro topo da barra | Ele é a camada que nunca sai da tela. Embaixo dos controles, recolher a barra o levaria junto |
| D-30 | O espaço reservado no fim do post não muda quando a barra recolhe | Se acompanhasse a barra, o texto se mexeria sozinho toda vez que ela sumisse — exatamente o que o Bloco 2 não pode causar |

---

## Bloco 3 — 25/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-31 | **A barra do blog não é o `BottomPlayer` da Academy** — fecha o D-17 | O de lá tem quatro saltos, materiais, marcadores, velocidade e painel expandido, e **não tem botão de sair**; a geometria dele se apoia na faixa imersiva, que no blog não existe. Adaptá-lo significaria mexer num componente aprovado em aparelho pra atender um caso que ele não previa. O que se repete é a linguagem visual — âmbar, play de 46px, o salto com o número no canto — não o componente |
| D-32 | Só −15s e +15s; nada de −5/+5 como na Academy | D-5 já dizia isso. Numa tela de 390px, dois saltos + play + tempo + sair já ocupam a linha inteira |
| D-33 | No fim, o play vira "ouvir de novo" | Mesmo comportamento da Academy. Sem isso, o fim da narração deixa um botão de play que reinicia sem avisar |
| D-34 | O motor escuta `durationchange`, além de `loadedmetadata` | O browser às vezes anuncia a duração real só depois. Sem isso a duração ficava a do último fragmento do mapa e o relógio marcava "8:04 / 8:03" no fim. Vale pros dois lados — a Academy tinha o mesmo defeito latente |
| D-35 | Sair do modo narrado **sempre** pausa, não só pelo botão | Apareceu em desenvolvimento: a narração desligou por outro caminho e o áudio seguiu tocando sem nenhum controle na tela. O guarda fecha a classe inteira do problema |

---

## Bloco 4 — 25/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-36 | O endereço do áudio vem de uma **base configurável**, não de uma URL fixa | Permite virar pro Supabase mudando uma variável de ambiente, sem tocar em código. E é a saída de emergência: apagar a variável devolve o áudio pro site |
| D-37 | O `.mp3` só sai do repositório **depois** que o Supabase provar que funciona | Tirar antes deixaria o post narrado sem áudio se qualquer coisa desse errado na configuração do bucket |
| D-38 | O bucket `blog-audio` é **público**, sem URL assinada | O blog é anônimo e o áudio é o mesmo conteúdo do post que já está aberto na tela. URL assinada aqui só criaria complexidade sem proteger nada — o oposto da Academy, onde o áudio é de curso pago |
| D-39 | O catálogo é quem filtra o idioma, não a página | D-8 é regra de conteúdo, não de layout. Com o filtro no catálogo, qualquer lugar que perguntar "este post tem narração?" recebe a mesma resposta |
| D-40 | O agente **não** cria o bucket nem sobe o arquivo | O Supabase do site não está na conta alcançada pelo acesso automatizado, e criar bucket público é mudança de infraestrutura — passa pelo Felipe, no painel ([[AUDIO-NO-SUPABASE]]) |

---

## Bloco 5 — 26/08/2026

| # | Decisão | Por quê |
|---|---|---|
| D-41 | O texto entregue ao Aeneas é **tudo o que foi narrado**, não só os blocos destacáveis | O Aeneas assume que o texto é a transcrição do áudio. Sem as linhas do que foi falado a mais, ele empurra o tempo sobrando para as frases vizinhas — mediu-se 14s de deriva no trecho das métricas. Títulos, cards, listas de erro, métricas e modalidades entram como âncora |
| D-42 | Âncora **não** entra no `blockMap` | O `BlogPost.tsx` só sabe destacar `paragraph`, `highlight` e `list`. Um fragmento âncora simplesmente não acende — o áudio passa por ele com a tela parada, que é o comportamento correto. Fazer os outros tipos acenderem seria mexer em seis renderizadores aprovados para atender um caso que eles não previam |
| D-43 | **Transcrever com Whisper é passo obrigatório**, não conferência opcional | É o único jeito de saber o que foi realmente narrado. O Felipe não lê o post literalmente: reformula títulos e improvisa. Sem a transcrição, a deriva só aparece quando alguém ouve o post no ar |
| D-44 | Trecho longo narrado sem texto na tela se **corta do áudio** | Neste post, os ~25s de chamada final não existem em bloco nenhum. Não há o que acender, e mantê-los só piora o alinhamento. Improviso curto no meio do post **não** se corta: vira âncora |
| D-45 | O fragmento salvo **preserva os `**`**; quem recebe texto limpo é o Aeneas | O `renderNarratedSpans` desenha o parágrafo a partir do texto do fragmento e passa por `boldify`. Sem os marcadores, o modo narrado perde todos os negritos do post — foi o que aconteceu no `site-maior-ativo-era-ia`, que segue com o defeito até rodar o pipeline de novo |
| D-46 | Item de lista é **uma unidade**, nunca quebrado em frases | O `renderBlock` casa `fragIndices[i]` com `items[i]`. Quebrar um item em duas frases desloca todos os itens seguintes e o destaque acende no item errado |
