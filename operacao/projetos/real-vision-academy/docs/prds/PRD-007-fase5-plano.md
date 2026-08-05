---
id: PRD-007-fase5-plano
title: Plano Detalhado da Fase 5 — Aula Narrada na Academy
type: plan
status: concluído
project: real-vision-academy
phase: fase-5
owner: master-visionair
created: 2026-07-30
updated: 2026-08-04
depends_on:
  - PRD-007-plano-execucao
  - PRD-007-arquitetura-leitor-narrado
  - PRD-007-fase5-sql
related:
  - PRD-002-modelo-de-dados
  - KNOWN_ISSUES
  - TIMELINE
---

# Plano Detalhado — Fase 5 do PRD-007

> **Navegação:** [[PRD-007-curso-narrado-sincronizado]] (produto) ·
> [[PRD-007-arquitetura-leitor-narrado]] (técnica) · [[PRD-007-plano-execucao]] (as 8 fases) ·
> [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] (o SQL deste plano) · [[PRD-002-modelo-de-dados]] (RLS) ·
> [[KNOWN_ISSUES]] (KI-30 a KI-33, achados aqui)

> **Este documento é auto-suficiente.** Foi escrito para uma sessão nova conseguir executar a Fase 5 sem
> depender do histórico da conversa em que foi planejado. Se algum passo aqui parecer depender de
> contexto que não está escrito, o documento está incompleto — avise o Felipe em vez de adivinhar.

> **✅ FASE 5 CONCLUÍDA (30/07/2026).** SQL do Passo 0 rodado pelo Felipe, Passos 1-7 implementados e
> verificados ponta a ponta, commit `de0e0cf` no `main`. KI-30, KI-31, KI-32 e KI-34 fechados. Resultado
> completo em [[PRD-007-plano-execucao]] (§Fase 5), [[CONTEXT]] e [[TIMELINE]].
>
> *(O aviso original desta caixa dizia "Nada aqui foi implementado", verdadeiro só no momento em que o
> plano foi escrito. Ficou desatualizado por 5 dias e em 04/08/2026 levou uma sessão a re-planejar
> trabalho pronto — corrigido na abertura do [[PRD-008-leitor-narrado-design]].)*

## Objetivo

Um aluno matriculado abre a aula 0.1 do Profissional 360 e a experiência funciona: lê o texto enquanto
ouve a voz do Felipe, com a frase narrada destacada e a tela acompanhando sozinha; controla velocidade,
±15s e clique na frase; sai no meio e volta de onde parou; e a aula só conta como concluída se ele
realmente ouviu.

Atende os critérios de aceite #1, #2, #3, #4, #6 e #8 do §14 do [[PRD-007-curso-narrado-sincronizado]].
O #5 (segundo plano) é Fase 6. O #7 (identidade visual) e o #9/#10 (aula real + build limpo) saem junto.

## Ponto de partida (o que já existe e deve ser reusado, não recriado)

| Peça | Onde | Situação |
|---|---|---|
| Destaque de frase (spans + `data-frag`) | `src/components/narration/NarratedSpans.tsx` | Fase 4, no `main` (`63ab090`). Exporta `renderNarratedSpans(narration, formatText)`, `narratedSpanClassName(isActive)`, tipos `NarrationContext` e `NarrationFragment` |
| Auto-scroll com proteção de 1,5s | `src/hooks/useNarrationAutoScroll.ts` | Fase 4, no `main`. `useNarrationAutoScroll(enabled, activeFragIndex)` |
| Player de áudio do blog | `src/components/blog/AudioTextSync.tsx` | Referência de wiring de `<audio>`. **Não alterar** — ver §"Decisão: player novo" |
| Gate de matrícula | `src/hooks/useEnrollment.ts` | Reusa como está |
| URL assinada de bucket privado | `src/components/academy/MaterialsList.tsx` | Padrão D-010: `createSignedUrl` chamado do client, sem função serverless |
| Renovação de URL assinada | `src/components/academy/LessonPlayer.tsx` | Padrão `staleTime: 45 * 60 * 1000` para URL de 1h (KI-24) |
| Progresso de aula | `src/hooks/useProgress.ts` | Reusa a mutation `setCompleted` — não duplicar |
| Árvore do curso | `src/hooks/useCourse.ts` | Estende (e corrige — ver E1/E2) |
| Admin CRUD | `src/components/academy/CourseEditor.tsx` | Ganha os campos da aula narrada |

**Dados da aula 0.1 já gravados no banco** (Fase 3, `lesson_id` `37c49e32-b60e-4716-b02b-1a90b26f78f1`):
`format = 'narrated'`, `audio_path` apontando para `course-materials`, `content_blocks` com 82 blocos
(todos `type: "paragraph"`), `sync_map` com 97 fragmentos `{text, begin, end}` e `blockMap` de 82 chaves
("0" a "81") ligando índice de bloco → índices de fragmento. Último `end` = 738.88s (12min18.9s).

---

## Os 8 erros que a revisão encontrou

O primeiro desenho da Fase 5 foi revisado antes de virar código. A revisão achou 8 problemas — 3 graves.
Estão listados aqui com o **porquê de cada um ter passado batido**, que é a parte que evita repetir.

### E1 — grave. O gate por view não funciona para aluno nenhum hoje

`lessons_gated` foi criada na Fase 3 com `security_invoker = true`. Isso significa que as policies de RLS
de `lessons` e `modules` **continuam valendo por baixo da view**, aplicadas como o usuário que chama. A
policy de catálogo libera SELECT só do que pertence a curso `published` ([[PRD-002-modelo-de-dados]],
seção RLS). O Profissional 360 está `published = false` (pré-venda, confirmado pelo Felipe em 30/07/2026).

Resultado: a view devolve **zero linhas** para o aluno matriculado. Não importa o que esteja escrito no
`WHERE` dela — o bloqueio é na tabela de baixo, antes.

[[PRD-002-modelo-de-dados]] já documentava o sintoma, na seção de verificação: *"material de curso
despublicado fica invisível até para aluno matriculado — a policy de `materials` atravessa a de `lessons`,
que exige curso publicado"*.

**Por que passou batido:** o [[PRD-007-plano-execucao]] e a arquitetura mandam copiar o padrão
`prompts_gated`/`skills_gated`, chamando de "caminho conhecido e testado neste projeto". Mas aquele padrão
funciona por um motivo que não se repete aqui: a tabela crua `prompts` tem policy
`prompts_select_authenticated ... using (true)` — qualquer autenticado lê a linha inteira, e a view só
redige **coluna**. Em `lessons` a RLS bloqueia **linha**. O padrão não transfere.

**Consequência se não corrigir:** a Fase 5 pareceria funcionar para o Felipe (admin tem policy `ALL`, que
cobre SELECT) e estaria 100% quebrada para o primeiro aluno pagante — o erro mais caro possível, porque só
aparece em produção, com cliente real.

**Isso já é um bug de produção hoje, independente da Fase 5.** A KI-18 liberou a compra em pré-venda; quem
comprar e for matriculado manualmente abre o curso e vê zero aulas. Registrado como KI-31.

**Correção:** [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]], blocos 0.1 a 0.3 — duas funções helper
`security definer`, duas policies novas (`modules_select_enrolled`, `lessons_select_enrolled`) e a view
recriada com `where c.published = true or is_admin() or is_enrolled_course(...)`. As duas metades são
necessárias: policy sem view não passa pelo `WHERE`; view sem policy não passa pela RLS.

### E2 — grave. `useCourse.ts` vaza o conteúdo pago

`src/hooks/useCourse.ts` faz `.from("modules").select("*, lessons(*, materials(*))")` — `*` na tabela
crua `lessons`, não na view. Como a RLS é por linha, no dia em que o curso for publicado qualquer
visitante que abrir a página do curso recebe `content_blocks`, `audio_path` e `sync_map` junto do
catálogo. Quebra o critério de aceite #6.

**Por que passou batido:** a Fase 3 criou a view e verificou que ela existe no `information_schema`, mas
nenhuma UI consumia a view ainda — a Fase 3 registrou isso explicitamente como pendência ("teste de acesso
real só é possível depois que a Fase 5 tiver o leitor"). O hook nunca foi migrado para a view.

**Correção:** Passo 3 abaixo. Registrado como KI-30.

### E3 — grave. `.eq("completed", true)` sozinho desmarca tudo que já foi concluído

`useProgress.ts` grava com `upsert({user_id, lesson_id})` — sem mandar `completed` — e lê contando a
existência da linha. Se o default da coluna for `false` (não dá para verificar daqui: o MCP Supabase não
alcança o projeto `xomtfkbvathddfpbknyo`, KI-20/KI-29), as linhas existentes valem `false`. Adicionar o
filtro sem backfill faria toda aula já concluída voltar a "não concluída", para todos os alunos.

**Correção:** o backfill vem **antes**, no bloco 0.4 do SQL, e é preservador de comportamento — hoje
"linha existe" **é** a definição de concluída, então marcar `completed = true` nessas linhas só escreve
explicitamente o que o sistema já considera verdade.

### E4 — grave. `useMyCourses.ts` tem a mesma leitura e quase ficou de fora

`src/hooks/useMyCourses.ts` (linhas 46-49) lê `lesson_progress` sem filtrar `completed` — idêntico ao
`useProgress.ts`. Corrigir um e não o outro faz a página do curso e o painel "Meus Cursos" discordarem
sobre quantas aulas o aluno concluiu.

**Por que passou batido:** o plano inicial foi escrito olhando só o hook que a Fase 5 toca diretamente.
E3 e E4 são o mesmo defeito em dois lugares — registrados juntos como KI-32.

### E5 — médio. Corrida que desfaz a conclusão

O desenho inicial mandava o flush de progresso gravar sempre `completed: isCompleted`. Sequência real:
escuta cruza 80% → `onComplete()` → grava `completed = true` → 1 segundo depois o aluno pausa → o flush
ainda enxerga a prop `isCompleted` velha (`false`, porque o React ainda não re-renderizou) e grava `false`
por cima. A aula "desconclui" sozinha.

**Correção:** o flush **nunca** escreve `completed`. A segurança do INSERT vem do `default false` posto no
bloco 0.4 do SQL. A única rota que marca conclusão continua sendo `onComplete` → `setCompleted.mutate`.

### E6 — médio. Denominador errado dos 80%

O desenho inicial usava `lesson.duration_seconds` (campo manual do admin, preenchido à mão, pode estar
nulo) como denominador da regra de escuta. Nulo ou zero → divisão por zero → `NaN` → ou nunca conclui, ou
conclui na hora.

**Correção:** usar a duração real do elemento `<audio>` (evento `loadedmetadata`), com fallback no `end`
do último fragmento do `sync_map`, e não avaliar conclusão enquanto não houver duração válida.

### E7 — médio. Detectar seek por limiar de tempo é chute

O desenho inicial distinguia "escuta real" de "seek" só pelo tamanho do salto entre dois `timeupdate`.
Frágil nos dois sentidos: um clique numa frase próxima produz salto pequeno (contaria como escuta), e um
tick estrangulado produz salto grande (descartaria escuta real).

**Correção:** o navegador avisa quando houve seek, pelo evento `seeked`. Zerar a referência nesse evento —
seek nunca gera delta. O limiar continua existindo, mas só como guarda contra tick estrangulado, e por
isso pode ser generoso (5s).

### E8 — cosmético, sem correção nesta fase

O `**negrito**` existe em `content_blocks` mas **não** existe nos `fragments` do `sync_map` — o pipeline
da Fase 2 removeu os asteriscos antes de mandar o texto para o Aeneas. Como os 82 blocos da 0.1 estão
todos no `blockMap`, a aula inteira renderiza a partir dos fragmentos. Logo: **nenhum negrito aparece na
tela**. Consertar exige regerar os artefatos de sincronização, o que é território do KI-23 (texto
congelado depois da gravação). Fica registrado como KI-33, não corrigido.

### Nota de segurança (não é erro, é decisão explícita)

`renderNarratedSpans` usa `dangerouslySetInnerHTML`. Até agora o texto vinha do repositório, escrito pelo
Felipe. Agora vem do banco. Continua sendo conteúdo que só admin escreve (RLS de escrita em `lessons` é
admin-only), então o nível de confiança é o mesmo — mas passa a ser uma escolha consciente, registrada
aqui, em vez de um acidente.

---

## Passo 0 — SQL (Felipe roda, é pré-requisito absoluto)

Arquivo pronto: [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]].

Roda no SQL Editor do Supabase. **Não tentar via Management API** — escrita é sempre bloqueada pelo
classificador do Claude Code (KI-29); insistir só queima tempo.

Cobre: funções `is_enrolled_course`/`is_enrolled_module`, policies `modules_select_enrolled` e
`lessons_select_enrolled`, `lessons_gated` recriada com o filtro corrigido, backfill de
`lesson_progress.completed` + `set default false`, e as consultas de verificação.

**Trava:** sem o Passo 0, nada da Fase 5 é testável — a Academy mostra o curso vazio para todo mundo,
inclusive o admin. Não começar o código antes de o Felipe confirmar que rodou.

**Atenção na verificação:** o SQL Editor roda como superusuário e **não exercita RLS**. Consulta que passa
lá não prova nada sobre acesso. O teste que vale é pelo app, com sessão de cada perfil (bloco 0.5-d do
arquivo SQL).

---

## Passo 1 — `src/hooks/useProgress.ts`

Só depois do backfill do Passo 0 estar rodado.

- Query do `completedSet`: adicionar `.eq("completed", true)`.
- Branch `done: true` do `setCompleted`: mandar explícito
  `{ user_id, lesson_id, completed: true, completed_at: new Date().toISOString() }` no lugar do upsert
  sem essas colunas.
- `queryKey` e assinatura pública **não mudam**. O player narrado consome `setCompleted.mutate` por prop,
  não duplica mutation.

## Passo 2 — `src/hooks/useMyCourses.ts`

- Adicionar `.eq("completed", true)` na leitura de `lesson_progress` (linha 47). Nada mais muda.
- A leitura de `lessons` neste hook pede só `id` — não vaza coluna paga, não precisa migrar para a view.

## Passo 3 — `src/hooks/useCourse.ts`

**Tipos.** `CourseLesson` ganha:
```ts
format: "video" | "narrated";
content_blocks: LessonContentBlock[] | null;
audio_path: string | null;
sync_map: LessonSyncMap | null;
```
com dois tipos novos exportados do próprio arquivo, no formato mínimo que os dados reais têm:
```ts
export interface LessonContentBlock { type: "paragraph"; text: string }
export interface LessonSyncMap {
  fragments: NarrationFragment[];              // importado de @/components/narration/NarratedSpans
  blockMap: Record<number, number[]>;          // índice do bloco -> índices de fragmento
}
```

**Query.** Trocar a chamada única com embedding por 3 selects planos:
1. `modules` por `course_id` (como hoje, sem `lessons` embutidas);
2. `lessons_gated` com `.in("module_id", moduleIds)`;
3. `materials` com `.in("lesson_id", lessonIds)`.

Depois montar o mesmo `CourseTree` agrupando no client (lessons por `module_id`, materials por
`lesson_id`), mantendo a ordenação por `sort_order`.

Por que não embutir tudo numa chamada só: não há precedente no projeto de embedding do PostgREST
atravessando uma view — `usePrompts`/`useSkills`, os únicos consumidores de view gated hoje, fazem select
plano. Três round-trips numa página que carrega uma vez por sessão é troca aceitável por certeza.

**`queryKey`.** De `["course", slug]` para `["course", slug, user?.id]`, com o hook passando a chamar
`useAuthContext()` (mesmo padrão de `useProgress`/`useEnrollment`). A partir daqui o cache do TanStack
Query guarda conteúdo pago; sem `user.id` na chave, trocar de conta no mesmo navegador podia servir cache
de matriculado para não-matriculado. É a classe de bug do KI-22/KI-27, agora com dado sensível.

**Consumidor.** Único: `src/pages/academy/CoursePage.tsx` (verificado por busca em 30/07/2026). O
`CourseEditor.tsx` do admin tem query própria (`admin-course-tree`) contra tabelas cruas e não é afetado.

## Passo 4 — `src/hooks/useNarratedListenProgress.ts` (novo)

O coração da regra de escuta real (§6 da arquitetura).

**Assinatura:** `useNarratedListenProgress(lessonId, isCompleted, onComplete)`.
Repare: **sem** `durationSeconds` — a duração entra depois, por um setter que o player chama no
`loadedmetadata` (correção do E6).

**Constantes no topo do arquivo:**
```ts
const COMPLETION_RATIO = 0.8;          // §6 do PRD propõe 80%; adotado aqui
const MAX_TICK_DELTA_SECONDS = 5;      // guarda contra tick estrangulado, não detector de seek
const FLUSH_EVERY_SECONDS = 15;        // §6 do PRD: "persistir a cada ~15s"
```

**Estado inicial.** `useQuery` com `queryKey: ["narrated-lesson-progress", user?.id, lessonId]` buscando
`last_position_seconds` e `listened_seconds` de `lesson_progress` (0/0 se não houver linha). Alimenta o
botão "continuar de onde parei".

**Refs, não state** (nada pode re-renderizar a cada `timeupdate`, que dispara ~4x por segundo):
`lastReportedTimeRef`, `listenedSecondsRef` (inicializado do fetch), `unsavedDeltaRef`, `durationRef`.

**API exposta ao player:**
- `setDuration(seconds)` — chamado no `loadedmetadata`. O player passa `audio.duration`; se vier `NaN` ou
  0, cai no fallback do `end` do último fragmento.
- `markSeeked(currentTime)` — chamado no evento `seeked`. Zera `lastReportedTimeRef` para o tempo atual,
  de modo que o próximo tick não gere delta. É a detecção de seek de verdade (correção do E7).
- `reportTime(currentTime)` — chamado no `timeupdate`:
  - `delta = currentTime - lastReportedTimeRef.current`;
  - soma em `listenedSecondsRef` e `unsavedDeltaRef` **só** se `0 < delta <= MAX_TICK_DELTA_SECONDS`;
  - a posição a persistir atualiza **sempre**, mesmo quando o delta não conta como escuta — "onde parei" é
    sobre posição, não sobre escuta;
  - `lastReportedTimeRef.current = currentTime` sempre;
  - se `durationRef.current > 0` e `listenedSecondsRef.current / durationRef.current >= COMPLETION_RATIO`
    e `isCompleted` ainda for `false`, chama `onComplete()` na hora (é transição única, não espera flush).
- `listenedRatio` — para o indicador passivo "Ouvido: X%" na UI.
- `lastPositionSeconds` — para o botão "continuar de onde parei".

**Flush** (upsert em `lesson_progress`), em 4 gatilhos: `unsavedDeltaRef >= FLUSH_EVERY_SECONDS`, evento
`pause`, `visibilitychange` (aba escondida) e unmount do componente.
Payload: **somente** `{ user_id, lesson_id, last_position_seconds, listened_seconds }`.
**Nunca mandar `completed`** — é a correção do E5.

Velocidade de reprodução não distorce a contagem: o acumulador soma segundos de **áudio**, não de relógio.
Ouvir a 2x soma os mesmos 738s de conteúdo, na metade do tempo de parede. Correto.

## Passo 5 — `src/components/academy/NarratedLessonPlayer.tsx` (novo)

### Decisão: player novo, não estender o `AudioTextSync.tsx`

`AudioTextSync.tsx` é o único consumidor de produção do post narrado do blog, verificado e no `main`.
Genericizá-lo para carregar o que só a Academy precisa (URL assinada renovável, retomar posição,
contabilizar escuta, velocidade, ±15s) reabriria um componente fechado, sem ganho — o blog nunca vai
consumir nada disso.

O que a Fase 4 extraiu **para** ser compartilhado — `NarratedSpans` e `useNarrationAutoScroll`, que são a
parte cara e testada — é reusado 100%, sem alteração. Sobra duplicar ~50 linhas de wiring de `<audio>`
(play/pause/mute/progresso). Preço menor que acoplar dois contextos com requisitos divergentes. Se um
terceiro consumidor aparecer, aí sim vale extrair um `useAudioPlayer(src)` comum — regra de extrair na
terceira repetição, não na segunda com requisitos diferentes.

### Responsabilidades

**URL assinada.** `supabase.storage.from("course-materials").createSignedUrl(lesson.audio_path, 3600)` via
`useQuery`, `queryKey: ["narrated-audio-url", user?.id, lesson.id]`, `staleTime: 45 * 60 * 1000` (mesmos
números do padrão Bunny; atende KI-24).
Na renovação, trocar `audio.src` **imperativamente** (via ref, restaurando `currentTime` e o estado de
reprodução em seguida). Trocar via prop declarativa reiniciaria o áudio do zero. Não afeta a 0.1 (12 min
« 45 min), mas é a forma certa de não repetir o ponto cego que existe hoje no iframe do Bunny.

**Controles.** play/pause, mute, ±15s (`clamp(cur ± 15, 0, duration)`), velocidade
(`audio.playbackRate`), barra de progresso com tempo atual/duração. Tudo com `<audio>` nativo, sem
biblioteca nova (escada Ponytail, passo 4: recurso nativo da plataforma).

**Sincronização.** `activeFragIndex` calculado no `timeupdate` (mesmo padrão do `lastFragRef` do
`AudioTextSync`: só notifica quando o índice muda), passado para `useNarrationAutoScroll(true,
activeFragIndex)`.

**Renderização do conteúdo.** Função local `renderLessonBlock` — **não** a `renderBlock` do
`BlogPost.tsx`, que é privada daquele arquivo e cobre ~12 tipos de bloco do blog irrelevantes aqui.
Suporta `paragraph` de verdade (único tipo presente nos dados reais), montando o `NarrationContext` com
`fragIndices = sync_map.blockMap[index]` e `fragments = sync_map.fragments`, e chamando
`renderNarratedSpans`. Tipo desconhecido cai em parágrafo simples sem narração — defensivo contra jsonb,
não é escopo novo.

**`formatText`.** Função local mínima de `**negrito**` → `<strong>`. Sem efeito visível hoje (E8), mas é o
que impede um bloco de fallback de mostrar asteriscos crus na tela.

**Clique na frase para seek.** `onClick` **delegado** no container que envolve os blocos:
`e.target.closest('[data-frag]')` → lê o índice → `audio.currentTime = sync_map.fragments[idx].begin`.
Feito assim de propósito, para **não** tocar em `NarratedSpans.tsx`, que a Fase 4 já fechou e verificou.

**Continuar de onde parei.** Banner com botão, visível se `lastPositionSeconds > 5`; clique faz seek +
play. Sem auto-seek silencioso ao montar — o PRD pede botão, não comportamento automático.

**Props.** `lesson`, `isCompleted`, `onComplete`. O player **não** importa `useProgress` internamente —
mesma filosofia do `LessonPlayer.tsx`, que também não sabe nada de progresso. Internamente usa
`useNarratedListenProgress` (Passo 4).

## Passo 6 — `src/pages/academy/CoursePage.tsx`

- Trocar o `<LessonPlayer lesson={selectedLesson} />` incondicional por um branch em
  `selectedLesson.format` (`"narrated"` → `NarratedLessonPlayer`, qualquer outro → `LessonPlayer`; o
  default da coluna é `video`, então toda aula existente segue igual).
- Passar `isCompleted={completedSet.has(selectedLesson.id)}` e
  `onComplete={() => setCompleted.mutate({ lessonId: selectedLesson.id, done: true })}`.
- **Decidido com o Felipe em 30/07/2026:** em aula narrada, o botão manual "Marcar como concluída"
  **some**, trocado por um indicador passivo ("Ouvido: X%"). Manter o botão clicável deixaria o aluno
  concluir sem ouvir nada, contra o critério de aceite #8. Em aula de vídeo o botão continua como está.
- `MaterialsList` segue embaixo, sem mudança, nos dois formatos.

## Passo 7 — `src/components/academy/CourseEditor.tsx`

O mínimo para cadastrar/atualizar uma aula narrada — o PRD (§8 e §12) deixa upload de arquivo e automação
do Aeneas explicitamente fora.

- `Select` de formato (`video` / `narrated`) na linha da aula, usando a mutation genérica que já existe:
  `update.mutate({ table: "lessons", id, values: { format } })`. Nenhuma mutation nova.
- Com `format === "narrated"`, um `Dialog` (mesmo padrão do `MaterialsDialog` que já vive nesse arquivo,
  não em arquivo separado) com 3 campos: `audio_path` (texto — caminho no bucket, formato
  `{course_id}/{lesson_id}/arquivo.mp3`), `content_blocks` e `sync_map` (textarea para colar o JSON que o
  pipeline da Fase 2 já gera).
- Validação: `JSON.parse` dentro de `try/catch` antes de mandar para o `update.mutate`, com toast de erro
  se o JSON for inválido.

---

## queryKeys

| Onde | Chave |
|---|---|
| `useNarratedListenProgress` (novo) | `["narrated-lesson-progress", user?.id, lessonId]` |
| URL assinada do áudio (inline no player) | `["narrated-audio-url", user?.id, lesson.id]` |
| `useCourse` (alterada nesta fase) | `["course", slug, user?.id]` |
| `useProgress` / `useMyCourses` | já têm `user?.id`, não mudam |

Regra do projeto, herdada de KI-22/KI-27: **hook novo nasce com `user.id` no `queryKey`.** Sem exceção.
Note que `LessonPlayer.tsx` (chave `["bunny-url", lesson.id]`) não segue — é código anterior à regra, e
não é escopo desta fase corrigir.

## Fora de escopo desta fase

Media Session API e `manifest.json`/PWA (Fase 6) · listagem e navegação entre aulas narradas ·
gamificação além de concluir por escuta (XP, badges, sequência de dias) · qualquer aula além da 0.1 ·
correção do negrito perdido (E8/KI-33) · correção do `queryKey` dos hooks antigos (KI-27) ·
correção da divergência de cor `--accent` (KI-15).

## Verificação

1. **Passo 0 rodado pelo Felipe** e confirmado — pré-requisito, sem isso nada abaixo é testável.
2. `npm run build` e `npx eslint` limpos nos arquivos tocados (mesmo padrão da Fase 4).
3. **Admin:** abrir o curso no preview e confirmar que módulos e aulas aparecem apesar de
   `published = false`. Prova o E1/Passo 0.
4. **Matriculado não-admin:** abrir a 0.1 e confirmar que o texto e o áudio carregam. É o teste que o E1
   existe para destravar — não pular achando que o teste de admin já cobre.
5. **A aula em si:** destaque acompanha o áudio, auto-scroll centraliza a frase, mexer a tela pausa o
   auto-scroll por 1,5s, ±15s funciona, velocidade funciona, clique numa frase move o áudio, e o banner
   "continuar de onde parei" aparece depois de sair e voltar.
   Dá para verificar sem ouvir 12 minutos: forçar `audio.currentTime` e disparar `timeupdate` sintético,
   como foi feito na verificação da Fase 4.
6. **Escuta real:** simular avanço contínuo até ~80% com incrementos pequenos + `timeupdate` sintético;
   `onComplete` dispara, o indicador atualiza, e um `pause` logo depois **não** desfaz a conclusão — este
   último é o teste específico do E5.
7. **Caso negativo (critério #6):** mesma URL com usuário autenticado sem matrícula — sem texto, sem
   áudio, sem URL assinada. Verificar, não presumir.
8. **Regressão do E3/E4:** uma aula de vídeo já concluída continua marcada, e o percentual em "Meus
   Cursos" bate com o da página do curso.
9. **Aba Network:** a chamada de `useCourse` não pede mais `select=*` na tabela crua `lessons`.
10. Atualizar [[PRD-007-plano-execucao]] (resultado da Fase 5), [[TIMELINE]], [[CHANGELOG]] e
    [[KNOWN_ISSUES]] (fechar KI-30/KI-31/KI-32 se resolvidos).

## Em aberto (não bloqueia, decidir durante a execução)

- **`materials` de curso despublicado.** A policy de `materials` navega até `courses` de um jeito que não
  dá para inspecionar sem acesso ao banco. Pode ser que continue invisível mesmo com as policies novas. A
  aula 0.1 não tem material nenhum, então não bloqueia critério de aceite algum. Se aparecer, vira uma
  policy irmã (`materials_select_enrolled`) no mesmo padrão do Passo 0.
- **Percentual de conclusão.** O PRD deixa "80%, a confirmar". Adotado 80% como constante no código, fácil
  de mudar depois de ver a aula real rodando.
- **`MAX_TICK_DELTA_SECONDS` na Fase 6.** Com o áudio em segundo plano, o `timeupdate` é estrangulado e os
  deltas crescem — escuta real pode passar a ser descartada pelo limiar exatamente no cenário que a Fase 6
  quer validar. Reavaliar lá, não agora.

## Documentos relacionados
- [[PRD-007-curso-narrado-sincronizado]] · [[PRD-007-arquitetura-leitor-narrado]] · [[PRD-007-plano-execucao]]
- [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] · [[PRD-002-modelo-de-dados]]
- [[KNOWN_ISSUES]] · [[TIMELINE]] · [[CHANGELOG]]
