# Narração Sincronizada do Blog (RV Voice Sync)

> Playbook técnico completo da feature de áudio narrado com highlight de texto sincronizado, testada no post `site-maior-ativo-era-ia` (29/07/2026). Guarda todos os parâmetros, comandos e decisões pra replicar em outros posts sem precisar redescobrir nada.

**Nome do projeto:** RV Voice Sync
**Status:** testado e no ar em 1 post (`site-maior-ativo-era-ia`) + replicado 1x na Academy (aula 0.1,
30/07/2026, ver seção "Replicação #2" abaixo). Ainda não é skill — isso aqui é o playbook que vai virar a
skill quando replicarmos umas 2-3 vezes.
**Repo:** `real-vision-site` (`operacao/projetos/_RV-Internos/real-vision-site`)

**Onde mais isso é usado:** este playbook é a base técnica da Fase 7 da Real Vision Academy, que leva a
narração sincronizada para dentro do **curso pago** — ver [[PRD-007-curso-narrado-sincronizado]] (produto),
[[PRD-007-arquitetura-leitor-narrado]] (o que muda do blog para a Academy) e [[PRD-007-plano-execucao]]
(fases). Conteúdo da primeira aula: [[MODULO-0-bem-vindo]].
**Diferenças na Academy:** conteúdo pago vai para o banco e bucket privado (nunca `public/`), e o passo
do `blockMap` manual vira script automatizado.

---

## O que é

Áudio MP3 narrado (voz do Felipe) abaixo do título do post. Ao dar play, a frase sendo narrada é destacada em âmbar no texto — estilo letra sincronizada do Spotify — e a tela rola sozinha pra manter essa frase sempre centralizada.

---

## Decisões já tomadas (não re-discutir sem motivo novo)

| Decisão | Por quê |
|---|---|
| **Aeneas** (forced alignment) em vez de WhisperX | GPU do Felipe (GTX 1060 3GB) fica abaixo do mínimo do WhisperX (4GB VRAM). Aeneas não usa GPU, roda em CPU comum. |
| **Docker** em vez de instalar Aeneas nativo no Windows | Extensão C do Aeneas é experimental no Windows — várias issues abertas no GitHub oficial sobre falha de compilação/linkagem do espeak (#221, #196, #213, #315). Docker evita 100% disso. |
| Imagem `oyekamal/aeneas-docker` | Já vem com Aeneas 1.7.3.0 compilado, Python 3.8. **Usa `python3`, não `python`** (o `python` do container é 2.7 e não tem aeneas instalado). |
| Granularidade: **por frase**, não por palavra | Palavra-por-palavra exige fragmentar cada frase manualmente e tem mais risco de dessincronia. Frase é o equilíbrio certo entre esforço de setup e efeito visual. |
| Highlight só em `paragraph`, `highlight`, `list` | São os únicos tipos de bloco com prosa fluida narrável. `heading2/3`, `kpi-grid`, `two-col`, `link-card`, `image` ficam de fora — não fazem sentido narrados. |
| MP3 em `public/` (não Supabase Storage) | Conteúdo de blog é público, `public/` é o padrão já usado pra outros assets estáticos do site (vídeos, favicon). Supabase Storage só é usado hoje pra materiais protegidos da Academy. |

---

## Pipeline completo (passo a passo com comandos reais)

### 1. Narração
Felipe grava narrando o texto do post inteiro e exporta (formato de origem foi `.m4a`, mas qualquer formato que o ffmpeg leia serve).

### 2. Converter pra MP3
```bash
ffmpeg -y -i "narracao-original.m4a" -codec:a libmp3lame -qscale:a 2 <slug>.mp3
```

### 3. Extrair o texto narrável do post
Do arquivo `src/data/blog-posts.ts`, pegar o post pelo `slug`, olhar o array `contentBlocks.pt`, e concatenar **na ordem em que aparecem** só os blocos:
- `paragraph` → `block.text` inteiro
- `highlight` → `block.text` inteiro
- `list` → cada `item` do array `items`

Pular: `heading2`, `heading3`, `kpi-grid`, `two-col`, `link-card`, `image`, `error-list`, etc.

Quebrar cada bloco em frases (por `.`, `!`, `?`), removendo marcação `**bold**` (vira texto puro — o bold é reaplicado depois na renderização, não no áudio). Anotar, pra cada bloco, **quantas frases** ele gerou e **em que ordem** — isso vira o `blockMap` do passo 6.

Salvar um `.txt` com uma frase por linha (esse é o formato de fragmento que o Aeneas espera). Exemplo usado no teste: `TEMP/audio/fragments.txt`.

### 4. Baixar a imagem Docker (só na primeira vez)
```bash
docker pull oyekamal/aeneas-docker
```

### 5. Rodar o Aeneas
No Windows com Git Bash, os paths `/data/...` são mangled pelo MSYS (viram `C:/Program Files/Git/data/...`) — **preciso desativar isso** com `MSYS_NO_PATHCONV=1`. Também setar `PYTHONIOENCODING=UTF-8` pra evitar warning de encoding com acentos.

```bash
MSYS_NO_PATHCONV=1 PYTHONIOENCODING=UTF-8 docker run --rm \
  -e PYTHONIOENCODING=UTF-8 \
  -v "/c/caminho/completo/da/pasta:/data" \
  oyekamal/aeneas-docker \
  python3 -m aeneas.tools.execute_task \
  /data/<slug>.mp3 \
  /data/fragments.txt \
  "task_language=pt|is_text_type=plain|os_task_file_format=json" \
  /data/syncmap.json
```

Saída: `syncmap.json` com um `fragment` por frase, `begin`/`end` em segundos (string), na mesma ordem do `.txt`. **Validação rápida:** o `end` do último fragmento deve bater com a duração total do áudio (no teste: 483.200s = exatos 8min03s do MP3).

### 6. Simplificar o JSON e montar o `blockMap`
Script Node (não precisa de `python3` fora do container):
```js
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('syncmap.json', 'utf-8'));
const out = data.fragments.map(f => ({ text: f.lines[0], begin: parseFloat(f.begin), end: parseFloat(f.end) }));
fs.writeFileSync('<slug>.sync.json', JSON.stringify(out, null, 2), 'utf-8');
```

Depois, montar manualmente o `blockMap`: um objeto `{ [índiceDoBlocoNoArrayContentBlocks]: [índicesDasFrasesNoArrayDeFragmentos] }`. O índice do bloco é a posição dele no array `contentBlocks.pt` **contando todos os blocos, inclusive os pulados** (heading, kpi-grid, etc — eles só não entram como chave no `blockMap`).

Exemplo real (post `site-maior-ativo-era-ia`, 31 blocos no array, 65 frases narradas):
```js
{
  0:[0,1,2,3], 1:[4,5,6], 2:[7,8],
  4:[9,10,11], 5:[12,13,14],
  8:[15,16], 9:[17,18,19,20],
  // ... etc, um bloco "list" com 6 itens vira 6 índices em sequência
}
```

### 7. Arquivos finais no repo
| Arquivo | Conteúdo |
|---|---|
| `public/audio/<slug>.mp3` | Áudio final |
| `src/data/blog-audio/<slug>.ts` | Export `audioSyncMap` com `slug`, `audioSrc`, `fragments[]`, `blockMap` |
| `src/components/blog/AudioTextSync.tsx` | Componente de player (genérico, reutilizável — não precisa duplicar por post) |
| `src/pages/BlogPost.tsx` | Integração condicional (só ativa se existir `audioSyncMap` pro slug+idioma atual) |

---

## Arquitetura do componente

### Player (`AudioTextSync.tsx`)
- `<audio>` nativo controlado via `ref`, sem lib externa (nada de Howler/WaveSurfer).
- Listener em `timeupdate` faz busca linear no array de fragmentos (`begin <= t < end`) pra achar a frase ativa — 65 fragmentos é pouco, não precisa binary search.
- Waveform decorativa: 48 barrinhas com altura pseudo-aleatória determinística (função seno com seed fixo — mesmo efeito visual toda vez, sem depender de lib de áudio real).
- Visual: glassmorphism (`bg-[rgba(20,20,28,0.85)]` + `backdrop-blur-md`), glow âmbar (`blur-3xl`) quando tocando, anel pulsante (`framer-motion`) no botão de play, ícones trocam com `AnimatePresence`.
- Clique na waveform faz seek (calcula proporção do clique pela largura do track).

### Highlight no texto (`BlogPost.tsx`)
- `renderBlock()` recebe um parâmetro opcional `narration` com `{ fragIndices, fragments, activeFragIndex }`.
- Se o bloco tem narração, em vez de `dangerouslySetInnerHTML` com o texto inteiro, quebra em `<span>` por frase (uma pra cada índice de `fragIndices`), cada uma com `data-frag={índiceGlobal}` e classe condicional de destaque.
- **Isso é importante**: os `<span>` usam o **texto já processado no passo 3** (sem markdown, já em frases) — não tenta re-quebrar `block.text` em runtime via regex. Garante que o texto narrado bate exatamente com o que o Aeneas alinhou.

### Auto-scroll centralizado
- `useEffect` que dispara toda vez que `activeFragIndex` muda: acha o elemento `[data-frag="N"]` no DOM e chama `scrollIntoView({ behavior: "smooth", block: "center" })`.
- **Proteção contra briga com o usuário**: um `useRef` guarda o timestamp do último scroll manual (`wheel`/`touchmove` do usuário). Se o auto-scroll ia disparar mas o usuário mexeu a tela há menos de 1500ms, ele pula essa rodada. Evita o efeito de "puxar a tela contra a vontade" se a pessoa tá tentando ler mais na frente ou voltar.

---

## Limitações conhecidas (documentar, não são bugs)

1. **Sync é por frase, não por palavra.** Se a frase for longa, o destaque "atrasa" até ela terminar de ser dita inteira. Aceitável visualmente, mas se incomodar, dá pra subdividir frases longas em fragmentos menores no `.txt` do passo 3.
2. **Editar o texto do post depois de gravar quebra o sync.** Não tem como evitar — se o texto mudar, precisa regravar o áudio e regerar o sync map (passos 3 a 6) do zero.
3. **Blocos de card/grid não são narrados.** Post precisa ser majoritariamente `paragraph`/`highlight`/`list` pra a feature valer a pena. Se o post for muito baseado em `kpi-grid`/`two-col`, o efeito fica pobre (poucas frases destacáveis).
4. **`blockMap` é montado manualmente, com risco de erro humano.** No teste, bateu 65/65 fragmentos com o total gerado pelo Aeneas — mas é um passo propenso a erro de contagem se feito às pressas. Quando virar skill, esse é o primeiro candidato a automação (gerar o `blockMap` por script em vez de na mão).

---

## Replicação #2 — Academy, aula 0.1 (30/07/2026)

Primeira vez rodando o pipeline fora do blog. Confirma que o processo generaliza — ver [[PRD-007-plano-execucao]]
Fase 2/3 para o registro completo da sessão.

**O que mudou em relação ao passo a passo original:**
- **Texto de origem:** não veio de `blog-posts.ts`, veio de um `.md` solto que Felipe escreveu depois de
  gravar (ele improvisou boa parte da narração — texto e áudio precisam bater, não o roteiro original).
- **Limpeza de texto automatizada, não manual:** script Python (`clean_text.py`, ficou em
  `TEMP/modulo/output/`, não portado pro repo ainda) fez as correções de digitação/acentuação
  (`nao`→`não`, `voce`→`você`, `vao`→`vão`, espaço duplo, `Google`/`Instagram` maiúsculo) e quebrou o texto
  em parágrafos (por linha em branco) e frases (por `. ! ?`).
- **`blockMap` gerado automaticamente**, não montado à mão (isso é exatamente o que a D-020 do PRD-007
  pedia) — o script conta as frases de cada parágrafo na hora de gerar o `.txt`, sem passo manual de
  contagem depois.
- **Saída combinada:** em vez de `<slug>.sync.json` (fragmentos) separado do `blockMap`, os dois foram
  gravados juntos num único JSON (`{fragments: [...], blockMap: {...}}`) — mais simples de gravar numa
  coluna `jsonb` só (`sync_map`) no banco da Academy.

**Pegadinhas de encoding/pontuação encontradas ao gerar texto automaticamente** (relevantes pra quem for
escrever a versão Node/definitiva do script):
- **Reticências de 3 pontos** (`...`) quebram regex ingênuo de "colapsar pontuação duplicada" — testar
  regex de ponto duplo contra `"..."` antes de assumir que funciona; `\.{2,}` com verificação de tamanho
  (preservar exatamente 3, colapsar o resto em 1) resolveu.
- **Frase terminando em negrito** (`**texto**`) — se o código adiciona ponto final automaticamente quando
  falta, checar se o último caractere é `*`/aspas decorativas antes de decidir que falta pontuação; senão
  gera `texto.**.` (ponto sobrando depois do fechamento do negrito).
- **Validação de determinismo:** rodar o script duas vezes no mesmo insumo e comparar (`diff`) — pegou os
  dois bugs acima antes de ir pro Aeneas, sem gastar tempo de alinhamento de áudio em cima de texto errado.

**Comandos usados** (idênticos ao playbook original, só o `slug`/pasta mudou):
```bash
ffmpeg -y -i "Aula 0.1.m4a" -codec:a libmp3lame -qscale:a 2 aula-0.1.mp3

MSYS_NO_PATHCONV=1 PYTHONIOENCODING=UTF-8 docker run --rm \
  -e PYTHONIOENCODING=UTF-8 \
  -v "/c/caminho/da/pasta:/data" \
  oyekamal/aeneas-docker \
  python3 -m aeneas.tools.execute_task \
  /data/aula-0.1.mp3 /data/fragments.txt \
  "task_language=pt|is_text_type=plain|os_task_file_format=json" \
  /data/syncmap.json
```
Resultado: 82 blocos, 97 fragmentos, último `end` bateu com a duração real do áudio (diferença de 0.01s).

**Gravação no banco (Academy, não é `public/`):** ver KI-29 em [[KNOWN_ISSUES]] — escrita via Management
API é sempre bloqueada pelo Claude Code (mesmo com PAT), só leitura passa. Fluxo que funcionou: gerar o
SQL pronto (`UPDATE ... set content_blocks = '...'::jsonb`, string quotada simples porque o texto não tinha
aspas simples nenhuma) e pedir pro Felipe rodar no SQL Editor.

## Próximos passos (quando replicar)

- [x] Repetir o pipeline em mais 1-2 posts pra validar que o processo generaliza — feito na Academy (aula
  0.1, 30/07/2026), não num post de blog novo. Ainda vale rodar num post de blog pra fechar o critério
  original.
- [x] Automatizar a extração de texto + geração do `blockMap` via script — feito em Python na Replicação
  #2 (ver seção acima); falta portar pra Node dentro de `scripts/` do repo pra virar o padrão oficial.
- [ ] Decidir se o componente `AudioTextSync` precisa de ajuste pra post muito curto/muito longo
- [ ] Só depois disso: transformar em skill `rv-blogpost-audio` (ou nome similar), integrada ao fluxo do `PROCESSO-BLOG-POST-REFINADO.md`

---

## Referência rápida de comandos

```bash
# 1. Converter áudio
ffmpeg -y -i entrada.m4a -codec:a libmp3lame -qscale:a 2 saida.mp3

# 2. Baixar imagem (uma vez só)
docker pull oyekamal/aeneas-docker

# 3. Rodar alinhamento (Windows/Git Bash)
MSYS_NO_PATHCONV=1 PYTHONIOENCODING=UTF-8 docker run --rm \
  -e PYTHONIOENCODING=UTF-8 \
  -v "/c/caminho/pasta:/data" \
  oyekamal/aeneas-docker \
  python3 -m aeneas.tools.execute_task \
  /data/audio.mp3 /data/fragments.txt \
  "task_language=pt|is_text_type=plain|os_task_file_format=json" \
  /data/syncmap.json
```
