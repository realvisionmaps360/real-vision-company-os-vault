---
id: PRD-007-arquitetura-leitor-narrado
title: Arquitetura do Leitor Narrado — PRD-007
type: architecture
status: em revisão
project: real-vision-academy
phase: discovery
owner: master-visionair
created: 2026-07-30
updated: 2026-07-30
depends_on:
  - PRD-007-curso-narrado-sincronizado
related:
  - ARCHITECTURE
  - DECISIONS
  - KNOWN_ISSUES
  - PRD-002-modelo-de-dados
---

# Arquitetura do Leitor Narrado — PRD-007

> **Navegação:** [[PRD-007-curso-narrado-sincronizado]] (produto) · [[PRD-007-plano-execucao]] (fases) ·
> [[ARCHITECTURE]] (arquitetura geral da Academy) · [[PRD-002-modelo-de-dados]] (schema atual) ·
> [[DECISIONS]] · [[KNOWN_ISSUES]] · [[NARRACAO-SINCRONIZADA-BLOG]] (pipeline do blog)

> Documento técnico único do PRD-007, deliberadamente não fatiado em seis arquivos: o
> [[METHODOLOGY_LEARNINGS]] já registrou que documento demais para projeto sem código vira burocracia.
> Cobre leitor, dados, segurança, segundo plano, pipeline e gamificação.
>
> **Nada aqui foi implementado.** Onde há suposição minha, está marcado **a validar**.

## 1. Estado auditado do código (30/07/2026)

Repo: `operacao/projetos/_RV-Internos/real-vision-site`, branch `main`, sincronizado com o remoto.

### Reaproveitável direto

| Peça | Arquivo | Situação |
|---|---|---|
| Player de áudio | `src/components/blog/AudioTextSync.tsx` | Funciona no ar. `<audio>` nativo via `ref`, sem lib. Busca linear no array de fragmentos por `timeupdate`. Waveform decorativa determinística |
| Highlight + auto-scroll | `src/pages/BlogPost.tsx` | Lógica correta, **acoplada ao blog** — ver §2 |
| Gate de matrícula | `src/hooks/useEnrollment.ts` + RLS | Reusa como está |
| Sessão / tiers | `src/contexts/AuthContext.tsx`, D-015 | Reusa como está |
| Storage protegido | `src/components/academy/MaterialsList.tsx` + policy `materials_read_enrolled` | **É o padrão do áudio pago.** Ver §4 |
| Progresso | `src/hooks/useProgress.ts` | Existe, insuficiente — ver §3 |
| Árvore do curso | `src/hooks/useCourse.ts` | Estende com os campos novos |
| Admin CRUD | `src/components/academy/CourseEditor.tsx` | Ganha os campos da aula narrada |

### Lacunas confirmadas

- **PWA inexistente:** sem `manifest.json`, sem service worker, sem `vite-plugin-pwa`. Construção nova.
- **`lessons` sem campo de texto:** só `title`, `sort_order`, `video_ref`, `duration_seconds`.
- **`lesson_progress` sem posição:** PK (`user_id`,`lesson_id`) + `completed` + `completed_at`.
- **Gamificação:** nada.
- **Áudio:** o único MP3 do projeto é `public/audio/site-maior-ativo-era-ia.mp3` — público, do blog.

## 2. O leitor

### 2.1 Extrair o que hoje está acoplado ao blog

A parte visual do sync não vive no player — vive dentro do `BlogPost.tsx`:

- `renderBlock(block, index, narration)` quebra o bloco em `<span>` por frase quando há narração
  (linhas ~40 a ~135);
- cada `<span>` recebe `data-frag={índiceGlobal}` e a classe de destaque condicional;
- um `useEffect` (~483) acha `[data-frag="N"]` no DOM e chama `scrollIntoView({ block: "center" })`;
- a proteção contra briga com o usuário guarda o timestamp do último `wheel`/`touchmove` num `useRef` e
  cede a vez se o aluno mexeu a tela há menos de 1,5s.

Detalhe que **não pode ser perdido na extração**: os `<span>` usam o texto **já processado no pipeline**
(o mesmo que o Aeneas alinhou), não uma requebra do texto original por regex em runtime. É o que garante
que o destaque bate com o áudio.

**Proposta:** extrair essa lógica para um componente/hook genérico consumido pelos dois contextos — blog e
Academy. Blog e curso passam a compartilhar o leitor; o que difere é de onde vêm os dados (arquivo público
vs. banco protegido) e o encadeamento com progresso.

Risco de mexer no blog: o post que está no ar é o único consumidor hoje, então a superfície de regressão é
pequena — mas a extração precisa terminar com o post do blog verificado igual a antes.

### 2.2 O que falta no player

Sobre o `AudioTextSync.tsx` atual: velocidade de reprodução, ±15s, clique na frase para seek, integração
com Media Session API, salvamento de posição, e o botão "Continuar de onde parei".

O `<audio>` nativo cobre velocidade (`playbackRate`) e seek (`currentTime`) sem dependência nova —
a escada Ponytail resolve no passo 4 (recurso nativo da plataforma).

## 3. Modelo de dados

Estende o modelo do [[PRD-002-modelo-de-dados]]. **Nenhuma tabela de catálogo nova.** Nomes abaixo são
**proposta**, a confirmar na aprovação.

### `lessons` — colunas novas

| Coluna | Papel |
|---|---|
| `format` | `video` (padrão, comportamento atual) ou `narrated`. Governa qual leitor renderiza |
| `content_blocks` | `jsonb` — o conteúdo estruturado da aula, no mesmo espírito dos `contentBlocks` do blog |
| `audio_path` | Caminho do MP3 no bucket privado (não URL — a URL é assinada na hora) |
| `sync_map` | `jsonb` — fragmentos (`text`/`begin`/`end`) + o mapa que liga bloco → frases |

`format` com default `video` mantém tudo que existe funcionando sem tocar em aula nenhuma.

`content_blocks` e `sync_map` juntos na aula, e não em tabela separada, porque são sempre lidos juntos,
sempre pela mesma consulta, e nunca fazem sentido isolados. Tabela separada aqui só adicionaria join.

### `lesson_progress` — colunas novas

| Coluna | Papel |
|---|---|
| `last_position_seconds` | Onde o aluno parou. Alimenta "Continuar de onde parei" |
| `listened_seconds` | Quanto do áudio foi **efetivamente ouvido** (§6) |

### RLS

O `sync_map` e o `content_blocks` são conteúdo pago e viajam na mesma linha de `lessons`, que hoje tem
SELECT público para curso publicado. **Isso vazaria a aula inteira.**

Duas saídas, a decidir na revisão:

- **(a) Coluna gated por view** — `lessons` continua pública para o catálogo (título, ordem, duração), e o
  conteúdo pago sai por uma view que exige matrícula. É o padrão que a Fase 6 já usa em
  `prompts_gated`/`skills_gated`, então é caminho conhecido e testado neste projeto. **Recomendado.**
- **(b) Tabela `lesson_content` separada**, com policy própria por matrícula, no espírito de `materials`.
  Mais tabelas, mas o gate fica óbvio na leitura do schema.

Recomendo (a) por reuso de padrão existente. A escolha muda pouco código e nada de experiência.

## 4. Áudio protegido

Reusa integralmente o padrão de D-010, já validado:

- bucket **privado** (a decidir: novo `course-audio` ou o `course-audio` dentro do `course-materials`
  atual), caminho `{course_id}/{lesson_id}/{arquivo}.mp3`;
- policy de leitura em `storage.objects` exigindo matrícula no curso extraído do caminho — mesma forma da
  `materials_read_enrolled`;
- `createSignedUrl` chamado **do client**, com a sessão do aluno. Sem função serverless, sem service role
  key. O `api/bunny-sign.ts` continua sendo a única exceção, porque o segredo do Bunny é de servidor.

**Ponto de atenção (KI-24):** URL assinada expira. Aula de 20 min com pausa de uma hora = link morto no
meio. Tratamento: expiração generosa em relação à duração da aula + renovação automática quando a URL
está perto de expirar — o `LessonPlayer.tsx` já faz exatamente isso para o Bunny (`staleTime` de 45 min
para URL de 1h). Mesmo padrão, aplicado ao áudio.

**Limite honesto (KI-25):** o navegador precisa do MP3 para tocar, então um aluno determinado consegue
extraí-lo. Isso vale para qualquer áudio na web, inclusive nas plataformas grandes. A proteção real é
impedir acesso **sem matrícula**, não impedir cópia por quem pagou. Se isso for inaceitável, muda o escopo
e precisa ser dito antes.

## 5. Segundo plano no Android — RESOLVIDO: PWA (D-021, 30/07/2026)

### 5.1 O que o teste em campo mostrou

Teste executado pelo Felipe no próprio celular (Chrome Android), com os 8 min de narração do post
`site-maior-ativo-era-ia`, que já estava no ar. **Todos os cenários passaram:**

| Cenário | Resultado |
|---|---|
| Tela apagada por 2 min | Áudio continuou |
| Controles na tela de bloqueio | Apareceram |
| Trocar para outro app 2 min e voltar | Áudio continuou, destaque no lugar certo |
| Tudo de novo com **economia de bateria ligada** | Passou |

O cenário de economia de bateria era o que mais importava, porque é onde o Android corta agressivamente
trabalho em segundo plano. Passar ali remove a dúvida principal.

**Decisão: PWA + Media Session API. Capacitor descartado.**

### 5.2 O que sobrou de trabalho (menos do que o rascunho supunha)

Os controles no sistema já aparecem **sem nada implementado** — é comportamento padrão do Chrome. Então
falta apenas:

- **Media Session API** para os metadados: título da aula, curso e capa nos controles, em vez do rótulo
  genérico do navegador. É acabamento, não viabilidade.
- **`manifest.json` + ícones** para instalabilidade (ícone na tela inicial do Android).
- **Service worker: fora do escopo.** O teste provou que o áudio em segundo plano **não depende dele**.
  Offline está fora do MVP, e ele carrega o risco do KI-26 (servir build velha no site inteiro). Só volta
  à mesa se a instalabilidade exigir, e nesse caso com escopo estreito e política de cache explícita.

### 5.3 O que ainda vale reverificar na Fase 6

Duas coisas ficaram como observação, não como dúvida aberta:

- O retorno correto do destaque após trocar de app foi **reportado**, não medido. O comportamento depende
  de recalcular a frase ativa a partir de `audio.currentTime` quando a aba volta a ficar visível (o
  `timeupdate` é estrangulado em segundo plano). Confirmar dentro da Academy, com aula real.
- O teste usou **áudio público** do blog. Na Academy o áudio vem por URL assinada de bucket privado.
  Confirmar que o segundo plano se comporta igual com o áudio protegido, principalmente na renovação da
  URL (KI-24).

## 6. Gamificação mínima — a regra de escuta real

Regra: a aula só conta como concluída quando `listened_seconds` alcança uma fração da duração do áudio
(proposta: 80%, a confirmar).

Como medir sem dar pra burlar: acumular tempo ouvido **por avanço contínuo do áudio**, não por tempo de
tela aberta. Somar apenas incrementos pequenos e plausíveis a cada `timeupdate` — um salto grande significa
seek, não escuta, e não soma. Deixar tocando de fundo continua contando (a pessoa pode estar ouvindo de
verdade, é áudio); o que não conta é arrastar a barra até o fim.

Gravação em lote, não a cada segundo — o `timeupdate` dispara ~4x por segundo e não se escreve no banco
nessa frequência. Proposta: persistir a cada ~15s de escuta e ao pausar/sair.

Progresso por módulo e por curso: o `useProgress.ts` já calcula percentual sobre a lista de aulas. Estende,
não reescreve.

## 7. Pipeline de conteúdo

Passo a passo, comandos, parâmetros do Aeneas e decisões já tomadas (Aeneas vs. WhisperX, Docker vs.
nativo, granularidade por frase): [[NARRACAO-SINCRONIZADA-BLOG]]. **Não duplicado aqui de propósito** —
aquele arquivo é o playbook vivo.

O que muda para a Academy:

| Etapa | Blog hoje | Academy |
|---|---|---|
| Texto | Manual, de `blog-posts.ts` | Do roteiro da aula, adaptado para leitura |
| Frases + mapa | **Montado à mão** | **Script automatizado** (D-020) |
| Destino | Arquivo no repo + `public/` | Banco (texto + mapa) + bucket privado (áudio) |
| Validação | Visual | Contagem de fragmentos + último `end` = duração do áudio, automática |

### O script (D-020)

Justificativa: o playbook já marca o `blockMap` manual como o passo mais arriscado. Bateu 65/65 em um
post, mas o Módulo 0 são 4 aulas e o curso inteiro passa de 40 — erro de contagem aqui significa o áudio
destacando a frase errada, que é o defeito mais visível possível para o aluno pagante.

Responsabilidade: receber o conteúdo estruturado da aula, extrair o texto narrável na ordem, quebrar em
frases, gerar o `.txt` que o Aeneas espera, e depois consumir o `syncmap.json` produzindo fragmentos +
mapa bloco→frases prontos, com a validação automática acima. Aeneas continua rodando no Docker como já
roda.

## 8. Riscos registrados

Vão para [[KNOWN_ISSUES]] a partir de KI-23:

| # | Risco |
|---|---|
| KI-23 | Editar o texto depois de gravar quebra o sync inteiro — exige regravar e realinhar. Sem solução técnica; mitiga-se travando o texto **antes** da gravação |
| KI-24 | URL assinada do áudio expira no meio de aula longa com pausa |
| KI-25 | Áudio pago é um MP3 que o navegador precisa baixar — limite real de proteção |
| KI-26 | Service worker pode servir versão velha do site inteiro |
| KI-27 | Herdado de KI-22: `useSpaces`/`useCommunityPosts`/`useReactions` têm `queryKey` sem `user.id`. Os hooks novos deste PRD **nascem** com `user.id` na chave |
| KI-28 | `lessons` com SELECT público não pode carregar conteúdo pago na mesma linha sem gate (§3) |

Também vale registrar, fora de escopo: divergência de cor `--accent` (#C58B2A) × `#F5A623` (KI-15, já
aberto) — a Academy hardcoda o segundo, e o leitor novo herda essa inconsistência se ninguém decidir.

## 9. O que este documento não decide

- Nomes finais de colunas e a escolha entre view gated e tabela separada (§3).
- Percentual exato de escuta para concluir a aula (§6).
- Se o bucket de áudio é novo ou reusa o existente (§4).

São detalhes de implementação, decididos na aprovação da Fase 3 do [[PRD-007-plano-execucao]]. Nenhum
bloqueia as fases anteriores.

**PWA vs. Capacitor saiu desta lista** — fechado em 30/07/2026 com teste em aparelho real (§5).

## Documentos relacionados
- [[PRD-007-curso-narrado-sincronizado]]
- [[ARCHITECTURE]] · [[DECISIONS]] · [[KNOWN_ISSUES]]
- [[PRD-002-modelo-de-dados]] · [[PRD-006-hub-comunidade]]
- [[NARRACAO-SINCRONIZADA-BLOG]] (fora deste vault)
