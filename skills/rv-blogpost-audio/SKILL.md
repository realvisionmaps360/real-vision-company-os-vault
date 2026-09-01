---
name: rv-blogpost-audio
description: Produz a narração sincronizada de um post do blog da Real Vision (RV Voice Sync) — converte o áudio gravado pelo Felipe, alinha com o texto do post via Aeneas no Docker, gera o sync map e registra o post no catálogo. Use quando Felipe mandar um arquivo de áudio junto com um link/slug de post do blog, ou disser "narrar esse post", "narração do blog", "áudio sincronizado", "botar esse áudio no post", "mais um post narrado". NÃO usar para escrever o post (use rv-blogpost) nem para a Academy (o áudio de curso pago tem bucket privado e caminho próprio).
---

# RV BlogPost Audio — a linha de produção das narrações

Transforma um `.m4a` gravado pelo Felipe na experiência narrada do post: áudio tocando, frase
acendendo em âmbar no texto, página rolando junto.

**Só funciona em português** (D-8). EN e DE não mostram o convite.

## Antes de começar — o que precisa estar de pé

| Ferramenta | Para quê | Checar |
|---|---|---|
| **ffmpeg** | converter e cortar o áudio | `ffmpeg -version` |
| **Docker** | roda o Aeneas (alinhamento) | `docker info` — não basta `--version`, o daemon precisa responder |
| **Whisper** | transcrever para conferir o que foi narrado | `whisper --help` |
| **Node** | os scripts desta skill | já vem com o repo |

O Aeneas roda em Docker de propósito: a extensão C dele é experimental no Windows (issues
#221, #196, #213, #315 sobre falha de compilação do espeak). Imagem: `oyekamal/aeneas-docker`
— **usa `python3`, não `python`** (o `python` do container é 2.7 e não tem aeneas).

Não usa WhisperX/GPU: a GTX 1060 3GB do Felipe fica abaixo do mínimo de 4GB VRAM. Aeneas é CPU.

E antes de tudo, no repositório do site:

```bash
git pull origin main
npm install
```

O `.env` **não vai pro git**. Se faltar, o modelo está em `.env.example`; a única variável sem
segredo é a do áudio:

```
VITE_BLOG_AUDIO_BASE=https://xomtfkbvathddfpbknyo.supabase.co/storage/v1/object/public/blog-audio
```

## O pipeline, em 9 passos

Trabalhe numa pasta temporária, ex. `TEMP/audio-<apelido>/`. Os scripts abaixo estão em
`scripts/` desta skill e esperam ser rodados de dentro dessa pasta.

### 1. Converter para MP3

```bash
ffmpeg -y -i "gravacao.m4a" -codec:a libmp3lame -qscale:a 2 <slug>.mp3
```

### 2. Transcrever — este passo não é opcional

```bash
whisper <slug>.mp3 --model base --language pt --output_format srt --output_dir .
```

**Por que sempre transcrever:** o Felipe não lê o post literalmente. Ele narra títulos, cards,
listas e métricas que o texto trata como estrutura, e improvisa comentários que não existem em
lugar nenhum. O Aeneas assume que o texto entregue É a transcrição do áudio — todo trecho falado
sem linha correspondente vira tempo empurrado para as frases vizinhas. Num post real isso deu
**14 segundos de deriva**. A transcrição é o que revela isso antes de virar problema.

**Farol rápido:** divida a duração do áudio pelo número de unidades. Entre 6 e 10 segundos por
unidade é saudável. Muito acima disso, tem fala sem texto correspondente.

### 3. Extrair as unidades faladas

```bash
node <skill>/scripts/extrair.mjs <slug-pt> [improvisos.json]
```

Produz `fragments.txt` (o que o Aeneas alinha), `unidades.json` (o que vai pro site) e
`blockmap.json`.

**Duas categorias de unidade:**

- **Destacável** — `paragraph` e `highlight` (uma unidade por frase) e `list` (uma unidade por
  ITEM, nunca quebrada em frases: o `renderBlock` casa `fragIndices[i]` com `items[i]`).
  Entram no `blockMap` e acendem na tela.
- **Âncora** — `heading2`, `heading3`, `two-col`, `error-list`, `metric-grid`, `modalities` e os
  improvisos. Entram no `fragments.txt` para segurar a régua do alinhamento, mas **não** no
  `blockMap`: o `BlogPost.tsx` só sabe destacar os três tipos de cima. O áudio passa por elas
  sem acender nada, o que é o comportamento correto.

### 4. Mapear os improvisos

Compare a transcrição com o texto do post. Todo trecho falado que não existe em bloco nenhum vira
uma entrada em `improvisos.json`:

```json
[
  { "bloco": 8, "depoisDe": "**Avaliações**", "linhas": ["Ou seja, aqui a gente sempre orienta..."] },
  { "bloco": 23, "linhas": ["Porque não sei se vocês sabem, o Google é..."] }
]
```

`depoisDe` posiciona o improviso **no meio** do bloco, logo após a unidade que começa com aquele
texto. Sem ele, entra no fim do bloco. **A posição importa:** um improviso colocado no fim de um
bloco quando na verdade foi dito no meio custou 6s de erro em duas unidades destacáveis.

Rode o passo 3 de novo depois de montar o arquivo.

### 5. Decidir o que fazer com o que sobra

Trecho longo narrado que não tem texto na tela (abertura, fecho, chamada final) — o caminho
normal é **cortar do áudio**, porque não há nada para acender e ele só atrapalha o alinhamento:

```bash
ffmpeg -y -i completo.mp3 -t <segundos> -c copy <slug>.mp3
```

O instante do corte sai do `.srt`. Improviso curto no meio do post não se corta: vira âncora.

### 6. Alinhar com o Aeneas

No Git Bash o `MSYS_NO_PATHCONV=1` é obrigatório, senão `/data` vira `C:/Program Files/Git/data`:

```bash
MSYS_NO_PATHCONV=1 PYTHONIOENCODING=UTF-8 docker run --rm \
  -e PYTHONIOENCODING=UTF-8 \
  -v "/c/caminho/completo/da/pasta:/data" \
  oyekamal/aeneas-docker \
  python3 -m aeneas.tools.execute_task \
  /data/<slug>.mp3 /data/fragments.txt \
  "task_language=pt|is_text_type=plain|os_task_file_format=json" \
  /data/syncmap.json
```

**Validação imediata:** o `end` do último fragmento tem que bater com a duração do MP3.

### 7. Conferir a deriva

```bash
node <skill>/scripts/conferir.mjs <slug-pt>
```

Compara cada unidade com a legenda do Whisper mais parecida. É farol, não veredito — legenda
quebrada no meio da frase gera falso alarme. O que se busca: desvio típico abaixo de ~2s e nenhuma
surpresa nas unidades **destacáveis**. Caso suspeito, confirme abrindo o `.srt` no instante
indicado antes de mexer em qualquer coisa.

### 8. Gerar o arquivo do site e registrar

```bash
node <skill>/scripts/montar-sync.mjs <slug-pt>
```

Escreve `src/data/blog-audio/<slug>.ts`. Depois, registre no catálogo `src/data/blog-audio/index.ts`:

```ts
import { audioSyncMap as apelidoDoPost } from "./<slug>";
// ...
{
  slug: apelidoDoPost.slug,
  audioFile: "<slug>.mp3",
  fragments: apelidoDoPost.fragments,
  blockMap: apelidoDoPost.blockMap,
},
```

Registrado no catálogo, o convite aparece sozinho naquele post. **Não se mexe no `BlogPost.tsx`.**

### 9. Verificar de verdade, no navegador

Regra do Felipe: navegador é **Playwright MCP**, com confirmação dele antes de cada ação.

Para testar antes de o áudio estar no Supabase: copie o `.mp3` para `public/audio/` e comente a
`VITE_BLOG_AUDIO_BASE` no `.env` (o código trata valor vazio como ausente e serve do próprio site).
**Descomente depois.**

Checklist:

- [ ] convite aparece com a duração certa
- [ ] entra no modo narrado, áudio toca, destaque acende
- [ ] pular para 5 ou 6 instantes espalhados e conferir o texto aceso contra o `.srt`
- [ ] os pontos de âncora não acendem nada (é o esperado, não é defeito)
- [ ] negrito preservado no texto narrado
- [ ] sair devolve capa, comentários e rodapé, e pausa o áudio
- [ ] mesmo post em EN: nenhum convite, nenhum áudio carregado
- [ ] `npx tsc --noEmit` e `npm run test` limpos
- [ ] console sem erro novo (o 400 do refresh de token do Supabase é pré-existente)

## Onde o áudio mora

O bucket é **`blog-audio`**, público, no projeto Supabase "realvision academy"
(`xomtfkbvathddfpbknyo`) — conta **`smarthomefg@gmail.com`**, não a `realvisionmaps360@gmail.com`.

**O agente não sobe o arquivo:** o MCP Supabase não alcança essa conta. Quem sobe é o Felipe, pelo
painel, e o nome no bucket tem que ser exatamente o do `audioFile` do catálogo.

O `.mp3` **não vai para o repositório**. Desde 01/09/2026 isso vale de verdade: verificou-se em
produção que a `VITE_BLOG_AUDIO_BASE` está no build da Vercel e o site publicado serve do bucket.
Os dois arquivos que ainda estão em `public/audio/` são resquício e não são usados por ninguém.

## Armadilhas já pagas

| Armadilha | O que acontece | Saída |
|---|---|---|
| Narrar sem transcrever | deriva de 14s no meio do post, invisível até alguém ouvir | passo 2, sempre |
| Improviso no lugar errado | 6s de erro nas unidades vizinhas | `depoisDe` no `improvisos.json` |
| Quebrar item de lista em frases | destaque acende no item errado | uma unidade por item |
| Salvar fragmento sem os `**` | modo narrado perde todos os negritos do post | `montar-sync.mjs` usa `unidades.json` |
| `python` em vez de `python3` no container | "No module named aeneas" | `python3` |
| Esquecer `MSYS_NO_PATHCONV=1` | `/data` vira caminho do Git for Windows | prefixo obrigatório |
| Commitar o `.mp3` | +6MB no repo e contraria a D-7 | fica fora até a Vercel resolver |

## Documentação viva

Estado, decisões numeradas e histórico do projeto:
`operacao/projetos/_RV-Internos/documentacao/narracao-blog/` — `ESTADO.md`, `DECISOES.md`,
`AUDIO-NO-SUPABASE.md`. Playbook técnico original:
`operacao/projetos/_RV-Internos/documentacao/NARRACAO-SINCRONIZADA-BLOG.md`.

**Atualize o `ESTADO.md` a cada post narrado.**

## Posts narrados

| Post | Quando | Observação |
|---|---|---|
| `site-maior-ativo-era-ia` | 29/07/2026 | primeiro; fragmentos sem `**`, perde negrito no modo narrado |
| `google-meu-negocio-guia-completo-negocios-locais` | 26/08/2026, publicado 01/09/2026 | primeiro com âncoras e negrito preservado; fecho de 25s cortado. Commit `a9ebf6e` |
