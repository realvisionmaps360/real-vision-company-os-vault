---
id: CONTEXT
title: Contexto Atual — Real Vision Academy
type: context
status: active
project: real-vision-academy
phase: fase-8
owner: master-visionair
created: 2026-07-17
updated: 2026-08-07
related:
  - MASTER_PRD
  - ARCHITECTURE
  - ROADMAP
  - DECISIONS
  - PRD-007-curso-narrado-sincronizado
  - PRD-008-leitor-narrado-design
---

# Contexto Atual — Real Vision Academy

> Primeiro documento a ler para reconstruir o contexto. Mantido curto e atualizado ao fim de cada etapa.

## Fase 8 (2026-08-07) — Design do Leitor Narrado: BLOCOS 0 A 3 FEITOS E VERIFICADOS

Design aprovado do leitor narrado ([[PRD-008-leitor-narrado-design]]), construído em 7 blocos, um por vez,
cada um fechando com verificação no Playwright + aval do Felipe antes do seguinte. Repo:
`operacao/projetos/_RV-Internos/sites/real-vision-site`, **branch `feat/leitor-narrado-design`** (5
commits, **nada pushado, nada mergeado no `main`**).

### Onde parou

| Bloco | Estado |
|---|---|
| 0 — preparo (Playwright, baseline, PRD-008 aberto) | ✅ commit `b8d2f38` |
| 1 — rota em tela cheia + leitura + player de rodapé | ✅ **verificado ponta a ponta** (07/08/2026). Commits `e907393` + `d92357e` |
| 2 — painéis (lista, configurações, materiais) + pesquisa interna | ✅ **verificado ponta a ponta** (07/08/2026). Commit `811d18c` |
| 3 — marcadores por frase | ✅ **verificado ponta a ponta** (07/08/2026). Commit `5cec0d7` |
| **4 — modo imersivo do celular** | ⏳ **próximo** — fecha só com aparelho real na mão do Felipe |
| 5 a 7 | não iniciados |

### Bloco 3 — o que ficou pronto (07/08/2026)

Os dois SQLs foram rodados pelo Felipe no SQL Editor e conferidos por print: `lesson_bookmarks` com as 4
policies (select/insert/update/delete) e os 3 materiais de teste (link, prompt, pdf) na aula 0.1.

- `src/hooks/useLessonBookmarks.ts` — `user.id` no queryKey (KI-22/KI-27). Marcar de novo é **upsert** pelo
  `unique (user_id, lesson_id, frag_index)`: troca a cor, não duplica linha. O popup do Bloco 5 vai chamar
  o mesmo `setBookmark` sem reescrever nada.
- `src/components/academy/narrated/BookmarksPanel.tsx` — cartão com trecho, tempo, "Ir ao trecho", lixeira
  e **as 4 cores dentro do cartão**. A troca de cor mora ali de propósito: o popup de seleção que o design
  usa para isso é do Bloco 5, e sem essa saída o aluno marcaria tudo em âmbar.
- "Marcar frase" no player expandido age sobre a **frase que está tocando** — é a que o aluno vê destacada.
- Precedência de destaque no `ReadingArea`: ativa > resultado atual > resultado de busca > marcada.

Verificação: `node tests/verify-bloco3.mjs desktop|mobile` — **17/17 nos dois**, incluindo persistência
após reload (prova que gravou no banco, não só no estado da tela). Regressão sem quebra: Bloco 1 32/32,
Bloco 2 47/47, banner 7/7. `tsc`, ESLint e build limpos.

**Achado fechado:** o painel de Materiais agora renderiza com dado real (599 caracteres, não mais o estado
vazio) — era pendência registrada no Bloco 2.

**Nota de teste:** marcar a frase 0 não prova nada (ela começa em 0:00, então "tempo no cartão" e "Ir ao
trecho move o áudio" passariam vazios). O `verify-bloco3` entra em 90s de propósito.

### Verificação — como rodar (a sessão do Playwright já está salva)

O login já foi feito em 07/08/2026 e o perfil persistente guarda a sessão: **não precisa logar de novo**,
a menos que `node tests/whoami.mjs` volte `{"logged":false}`.

```bash
npm run dev
```
Em outro terminal (PowerShell 5.1 **não aceita `&&`** — rodar uma linha por vez):
```bash
node tests/whoami.mjs
node tests/verify-full.mjs desktop
node tests/verify-full.mjs mobile
node tests/verify-bloco2.mjs desktop
node tests/verify-bloco2.mjs mobile
node tests/verify-bloco3.mjs desktop
node tests/verify-bloco3.mjs mobile
node tests/verify-banner-regressao.mjs desktop
```

**A sessão salva vale por porta.** O login mora no `localStorage` de `localhost:8080`; se o Vite subir na
8081 (porta ocupada), `whoami` devolve `{"logged":false}` e todo teste falha no portão de matrícula. Não é
sessão expirada — é origem diferente. Derrubar quem estiver na 8080 e subir o dev ali.

Resultado desta sessão: **Bloco 1 32/32 no desktop e 32/32 no mobile**, **Bloco 2 47/47 e 47/47**,
regressão do banner 7/7 nos dois, mais 14/14 em retomada/conclusão. `tsc`, ESLint e build limpos.

O que ficou provado do Bloco 1: destaque por frase (não por bloco — D-026/D-027) acompanhando o áudio,
clique na frase faz seek, auto-scroll com a trava de 1,5s, ±15s, ±1 frase, 6 presets de velocidade,
volume, "Continuar de onde parei", conclusão automática ao cruzar 80% de escuta **sem** botão manual, e o
antigo E5 (um `pause` logo depois não desfaz a conclusão — persistiu após reload).

### Correção que saiu desta sessão — banner de consentimento cobria o player

O `ConsentBanner` é global (`App.tsx`), fixo no rodapé com `z-[100]`; o player do leitor também é fixo no
rodapé, com `z-40`. Enquanto o banner estivesse na tela, **play, velocidade e volume ficavam inclicáveis**
para qualquer aluno que ainda não tivesse respondido ao consentimento. Não era hipótese: o Playwright
tentou clicar 60 vezes e o banner interceptou todas.

Solução (commit `d92357e`): a rota do leitor publica a altura da sua barra em `--rv-bottom-inset` e o
banner se posiciona a partir dela, empilhando acima em vez de cobrir. Sem a variável, comportamento
idêntico ao anterior — home e blog verificados. A altura é **medida com ResizeObserver, não fixa**: a barra
tem 79px (76 + fio de progresso + borda) e cresce com o banner de erro do áudio; um valor fixo deixava 3px
de sobreposição.

### Decisões tomadas no Bloco 2 (não estavam no design)

- **Busca normaliza acento** — digitar `profissao` acha "profissão". Teclado de celular sem acento é o caso
  comum do aluno.
- **Pesquisar não move o áudio** — traz a ocorrência pra tela e deixa o aluno decidir clicando na frase.
  Pular a narração a cada tecla digitada seria hostil.
- **"Restaurar padrão" não mexe na velocidade** — o hook do Bloco 1 resetava tudo, incluindo os 1,5× do
  player. O painel é de leitura (letra, tema, rolagem); quem ouve em 1,5× não perde isso ao mudar a fonte.
  Nasceu daí o `resetReading` em `useReaderPreferences`.

### Arquivos do leitor (não apagar sem entender por quê)

- `src/pages/academy/NarratedLessonPage.tsx` — a rota, o estado dos painéis e a lógica da pesquisa.
- `src/components/academy/narrated/` — `ReaderHeader`, `ReadingArea`, `BottomPlayer`, `ReturnToNarration`,
  `readerTheme.ts` (Bloco 1) + `ReaderPanel`, `LessonListPanel`, `ReadingSettingsPanel`, `MaterialsPanel`,
  `ReaderSearchBar`, `readerSentences.ts` (Bloco 2).
- `readerSentences.ts` — **a regra que achata blocos em frases mora só aqui.** Saiu do `ReadingArea` porque
  a pesquisa precisa exatamente da mesma lista; duplicar faria a busca apontar pra índices que não existem
  na tela.
- `src/hooks/useNarratedAudio.ts` — wiring de áudio da Fase 5 (URL assinada renovável, `audioUrl` nas deps
  do efeito de listeners — **KI-34, não perder de novo**).
- `src/hooks/useReaderPreferences.ts` — fonte/tema/auto-scroll/velocidade em `localStorage`.
- `src/components/academy/NarratedLessonPlayer.tsx` — **o player antigo da Fase 5, ainda no repo de
  propósito.** Só remover depois que o leitor novo estiver publicado. Volta atrás = trocar o `CoursePage.tsx`
  de volta pra ele.
- `tests/` — `login.mjs`, `whoami.mjs`, `smoke.mjs`, `find-lesson.mjs`, `reset-progress.mjs`,
  `verify-full.mjs`, `verify-bloco2.mjs`, `verify-conclusao.mjs`, `verify-banner-regressao.mjs`.

### Achados registrados, não corrigidos (fora do escopo dos blocos)

- **`lesson_progress.completed_at` vem preenchido mesmo com `completed = false`** — a coluna parece ter
  default `now()`. Não quebra o leitor (a tela lê `completed`), mas qualquer relatório futuro que conte
  "aulas concluídas" por `completed_at` vai mentir. Mudança de schema, não mexida.
- **`npm run build` dispara IndexNow** — `[notify-indexnow] 87 URLs enviadas, status 403`. Comportamento
  pré-existente do projeto: todo build local avisa um serviço externo, e o 403 sugere chave inválida.

### Detalhes operacionais que custaram tempo

- **PowerShell 5.1 não aceita `&&`.** Comando com `&&` dá `ParserError`. Passar uma linha por vez.
- **O header renderiza as variantes desktop E mobile**, escondendo uma por CSS. Em teste, seletor sem
  `:visible` mira no elemento invisível e trava.
- **O navegador normaliza estilo inline** (`inset 0 0 0 1px #F5A623` vira `rgb(...) 0px 0px 0px 1px inset`).
  Testar por `style*=` não funciona; usar `getComputedStyle`.
- **Arquivos-lixo do shell** (`banner`, `text`, `null))`, `r.json())`, `setTimeout(r`) aparecem na raiz do
  repo quando um comando é mal interpretado. Sempre vazios. Conferir com `ls -la` e remover antes do commit
  — já aconteceu em duas sessões seguidas.

## Fase 7 (2026-07-30) — Curso Narrado Sincronizado: FASES 0-5 FEITAS, FASE 6 A SEGUIR
Nova modalidade de aula: texto estruturado + áudio narrado pelo Felipe, frase destacada e auto-scroll —
a experiência do RV Voice Sync (já no ar em 1 post do blog) trazida pra dentro do curso **pago**.
Documentação: [[PRD-007-curso-narrado-sincronizado]] (produto),
[[PRD-007-arquitetura-leitor-narrado]] (técnica), [[PRD-007-plano-execucao]] (as 8 fases) e
[[PRD-007-fase5-plano]] (o passo a passo detalhado da fase atual).

**Escopo do MVP: uma aula só** — a 0.1 "O que é um Profissional 360°" (D-023).

### Onde parou

| Fase | Estado |
|---|---|
| 0 — conteúdo gravado | ✅ Felipe narrou a 0.1 (12min19s), texto congelado em [[MODULO-0-bem-vindo]] |
| 1 — teste Android | ✅ PWA aprovada em aparelho real, Capacitor descartado (D-021) |
| 2 — pipeline de sincronização | ✅ 82 blocos / 97 frases, último fragmento bate com a duração (0.01s) |
| 3 — banco e storage | ✅ colunas novas, view `lessons_gated`, áudio no bucket `course-materials` |
| 4 — leitor genérico | ✅ implementado, verificado e **pushado** (`63ab090`) |
| 5 — a aula na Academy | ✅ implementada e verificada ponta a ponta (30/07/2026), casos positivo e negativo |
| **6 — Media Session + PWA** | ⏳ **fase atual**, aguardando Felipe validar a aula real primeiro |
| 7 — verificação e publicação | ⏳ |

Da Fase 4 nasceram duas peças reutilizáveis pelo blog e pela Academy:
`src/components/narration/NarratedSpans.tsx` e `src/hooks/useNarrationAutoScroll.ts`.

### Antes de tocar na Fase 5 — três coisas que quebram se ignoradas

A revisão do plano da Fase 5 (30/07/2026, antes de virar código) achou 8 problemas. Três são graves, e
**dois já são bugs de produção hoje**, independentes desta fase:

- **KI-31 — o mais perigoso.** `lessons_gated` é `security_invoker = true`, então a RLS de
  `lessons`/`modules` continua valendo por baixo e exige curso publicado. O Profissional 360 está
  `published = false` (pré-venda). Resultado: a view devolve **zero linha** para aluno matriculado. Como
  admin tem policy `ALL`, tudo funciona no teste do Felipe e quebra só com aluno pagante. **O SQL do Passo
  0 do [[PRD-007-fase5-plano]] é pré-requisito absoluto** — sem ele a Academy mostra o curso vazio.
- **KI-30.** `useCourse.ts` lê a tabela crua `lessons`, não a view. RLS é por linha, não por coluna: o
  conteúdo pago vaza no dia em que o curso for publicado.
- **KI-32.** `useProgress.ts` e `useMyCourses.ts` tratam "linha existe" como "aula concluída". A Fase 5
  cria a primeira linha "em andamento" e expõe isso. Corrigir o filtro **sem** o backfill do SQL
  desmarcaria toda aula já concluída.

Também vale saber: **KI-33** — o `**negrito**` não aparece na renderização narrada (o pipeline removeu os
asteriscos dos fragmentos). É esperado, não é bug de CSS.

**Decisões:** D-016 (vídeo e narrado coexistem), D-017 (texto dos roteiros, final palavra por palavra),
D-018 (conteúdo pago no banco + bucket privado, **nunca** em arquivo do repo), D-019 (conclusão por escuta
real), D-020 (mapa por script), D-021 (PWA, Capacitor fora), D-022/D-023 (só a aula 0.1), D-024 (texto = o
que foi gravado). Em 30/07/2026 o Felipe decidiu ainda: curso segue `published = false`, e em aula narrada
o botão manual "Marcar como concluída" some, trocado por indicador passivo "Ouvido: X%".

**Ainda não existe PWA no site** — sem `manifest.json`, sem service worker, sem `vite-plugin-pwa`. É
construção nova na Fase 6.

**Próximo passo:** Felipe ouvir a aula 0.1 do início ao fim no preview e validar a experiência, depois
decidir se parte pra Fase 6 (Media Session + PWA) ou fica só na 0.1 por enquanto.

## Fase 6 (2026-07-19) — Hub + Comunidade v1
Decidido evoluir o `/academy` de grade de cursos para um **hub/ecossistema** com **comunidade nativa**
(referência estrutural: Circle / ibe.IA). Plano completo em [[PRD-006-hub-comunidade]] — **aprovado pelo
Felipe em 2026-07-19**. Modelo de acesso: duas trilhas ortogonais — **Membro** (anuidade → comunidade +
Mentor IA futuro) e **Aluno** (matrícula → curso). Decisões novas: D-013 (anuidade), D-014 (comunidade
nativa), D-015 (nomenclatura de tiers). Execução: Opus 4.8, fase por fase.
**Fase 0 fechada (2026-07-19):** o trigger de `profiles` já existia da Fase 3 (KI-11 estava resolvido;
o PRD é que citava a versão velha); backfill de 1 órfão executado → 4 usuários / 4 perfis, verificado.
**Passo 2 fechado (2026-07-19):** `profiles` estendido (`handle`, `company`, `city`, `segment`, `links`,
`headline`, `bio`, `avatar_url`) + view `public.public_profiles` (segura, sem email/role) + telas
`/academy/conta` e `/academy/membro/:handle`. Verificado ponta a ponta (build, RLS/segurança por fora do
app, fluxo autenticado completo via Playwright). Detalhe em [[TIMELINE]].
**Passo 3 fechado (2026-07-19):** tabela `memberships` (status active/expired) + hook `useMembership()`.
**Passo 4 fechado (2026-07-19):** casca `AcademyShell` (sidebar Início/Aprender/Comunidade/Prompts/
Conta) + `Dashboard.tsx` em `/academy`.
**Passo 5 fechado (2026-07-19):** Comunidade v1 — tabelas `spaces`/`posts`/`comments`/`reactions` + RLS
por tier + telas `/academy/comunidade` e `/academy/comunidade/post/:id`. Verificado ponta a ponta
(gate de canal `member`, post, curtida, comentário). Detalhe em [[TIMELINE]].
**Passo 6 fechado (2026-07-19):** Biblioteca de Prompts + Skills — escopo ampliado na revisão (duas
tabelas separadas `prompts`/`skills`, campo `description`, cadastro por tela de admin em vez de SQL
manual). Views `prompts_gated`/`skills_gated` com redação de coluna por tier + hooks `usePrompts`/
`useSkills` + `PromptsPage.tsx` (`/academy/prompts`) + abas de admin em `AdminAcademy.tsx`. Bug de
cache entre contas achado e corrigido (KI-22). Verificado ponta a ponta (admin CRUD + aluno com/sem
membership). Detalhe em [[TIMELINE]].
**MVP da Fase 6 (Hub + Comunidade) fechado** — passos 3 a 6 do [[PRD-006-plano-execucao]] concluídos.
Roteiros dos cursos: Felipe decidiu **não** mexer agora. Ideia da automação de Instagram (captação →
recompensa na biblioteca) registrada em [[IDEAS]], sem implementação.
**Próximo passo:** nenhum item de código aberto no momento — aguardar Felipe decidir a próxima fase
(ver "Futuro" no [[ROADMAP]]: gamificação, Mentor IA, marketplace, i18n, etc.) ou retomar pendências
antigas (Bunny Stream real, conteúdo do Profissional 360, Stripe).

## Etapa anterior (2026-07-18) — Fase 3
**Fase 3 (área de membros + player + progresso) implementada e verificada ponta a ponta** (2026-07-18).
`/academy` (Meus Cursos), `/academy/curso/:slug`, player Bunny Stream com seam/placeholder, materiais
por Storage assinado, progresso — tudo testado no preview com curso e aluno de teste descartáveis
(removidos ao final). Falta só a conta Bunny Stream real para reprodução de vídeo ponta a ponta.

## Objetivo em andamento
Felipe criar a conta Bunny Stream de verdade (Library ID + token key + vídeo de teste) para ligar o
player. Em paralelo: cadastrar o curso Profissional 360 pelo painel `/academy/admin` com conteúdo real.

## Última etapa concluída (2026-07-18) — Fase 3 implementada e verificada
Rotas, hooks (`useMyCourses`/`useCourse`/`useEnrollment`/`useProgress`, todos com `.maybeSingle()`),
`CourseCard`/`CourseSyllabus`/`MaterialsList`/`LessonPlayer`, bucket `course-materials` com RLS por
matrícula, `api/bunny-sign.ts` com seam (devolve 501 sem credencial, player mostra placeholder).
Decisão nova D-010: materiais assinados client-side via RLS de Storage (sem função serverless extra).
Verificado via Playwright: gates deslogados, login, "Meus Cursos", sumário, player com placeholder,
material inline + PDF (RLS negando sem sessão), marcar progresso (0%→33%, avança pra próxima aula).
**KI-11 validado ponta a ponta com sucesso** (trigger cria o perfil do aluno automaticamente — um
falso alarme de visibilidade entre CTEs na primeira checagem foi descartado por consulta separada).
Detalhe completo em [[TIMELINE]], [[PRD-003-area-de-membros]] e [[KNOWN_ISSUES]] (KI-11, KI-14/15/16).

## Etapa anterior (2026-07-18) — KI-13 resolvido, Felipe promovido a admin
Hipótese do KI-13 estava errada: não linkou, eram **duas contas separadas** com e-mails diferentes
(`realvisionmaps360@gmail.com` do teste Playwright vs `felipegarciajericoacoara@gmail.com` do login
real via Google). Felipe escolheu `realvisionmaps360@gmail.com` como conta admin fixa. Ao promover,
descoberto que a tabela `profiles` estava com **0 linhas** — KI-11 (sem trigger de auto-criação) não é
mais só um risco futuro, é o estado real de produção agora. Resolvido para a conta admin via `INSERT`
manual; segue pendente para os próximos usuários reais. Detalhe completo em [[TIMELINE]] e
[[KNOWN_ISSUES]] (KI-08, KI-11, KI-13).

## Etapa anterior (2026-07-17) — Incidente de login em produção, resolvido
Primeiro teste de login em produção (o próximo passo que tinha ficado pendente) revelou 3 problemas
em cadeia, todos corrigidos na sessão — detalhe completo em [[TIMELINE]] e [[KNOWN_ISSUES]] (KI-12,
KI-13):
- `site_url`/`uri_allow_list` do Supabase nunca configurados pra produção (ficaram em
  `localhost:3000`) → corrigido.
- OAuth Client do Google era do tipo Desktop (sem suporte a redirect URI custom) → client novo criado
  tipo Web, credenciais atualizadas no Supabase.
- E-mail do Felipe já tinha uma conta de teste da Fase 2 (Playwright, nome "Real Vision360") — não é
  bug, mas precisa de limpeza: confirmar se o login Google linkou nessa mesma conta antes de promover
  a admin (KI-08).
- Felipe confirmou: **login funcionando em produção** (Google e e-mail/senha).

## Etapa anterior (2026-07-17) — Fase 2
- 7 tabelas do catálogo criadas no banco novo via Management API (`courses`→`orders`) + função
  `is_admin()` + 17 policies RLS (inclui `profiles_admin_select`). Detalhe em [[PRD-002-modelo-de-dados]].
- Painel `/academy/admin` construído (guard login+role admin): CRUD curso→módulos→aulas→materiais→
  preço + concessão manual de matrícula por e-mail.
- Comunidade: tabelas **adiadas** (D-009, sem spec).
- Verificado: build ok; RLS testada anon + autenticada (admin CRUD ok, student bloqueado); painel
  validado ponta a ponta no preview via Playwright (curso completo + matrícula manual).
- **Atenção:** ninguém tem role `admin` ainda — promover o usuário do Felipe via SQL (KI-08).

## Decisões recentes
- D-006: hospedagem de vídeo = **Bunny Stream** + Supabase Storage (materiais). Destrava a Fase 3.
- D-007: recomeçar limpo o login do blog (sem migrar dados).
- D-008: Fase 1 feita direto no Claude Code; Fable 5 reservado para Fase 2/3.
- D-009: tabelas de comunidade adiadas (sem spec, YAGNI).
- D-010: materiais assinados client-side via RLS de Storage, sem função serverless extra
  (`api/material-sign.ts` do plano original não foi criado).

## Bloqueios
- Nenhum bloqueio duro pro código. Player de vídeo real depende da conta Bunny Stream (Felipe, fora
  do Claude Code — KI-14).

## Pendências
- [ ] Felipe criar a conta Bunny Stream + biblioteca de vídeo (Library ID + token key + vídeo de
  teste) para ligar o player de verdade (KI-14).
- [ ] Cadastrar o curso Profissional 360 pelo painel com conteúdo real (valida Fase 2 e 3 ponta a
  ponta com dado real, não só o curso de teste descartável já removido).
- [ ] Conta Stripe + chaves + produto/preço — Fase 4.
- [ ] Conteúdo do Profissional 360 (vídeos + prompts `.md`) — Fase 5.

## Próximos passos
1. Felipe cria a conta Bunny Stream e passa as credenciais (Library ID + token key + `video_ref` de
   teste) para ligar e validar o player de verdade.
2. Cadastrar o Profissional 360 pelo painel `/academy/admin` com conteúdo real.
3. Abrir a Fase 4 (checkout Stripe) quando a Fase 3 estiver com vídeo real validado.

## Nota operacional (importante para a próxima sessão)
Para rodar SQL no banco novo (`xomtfkbvathddfpbknyo`), o MCP Supabase **não serve** (conector OAuth
apontando para outra conta/organização). Usar a **Management API** com um PAT da conta smarthome:
`POST https://api.supabase.com/v1/projects/xomtfkbvathddfpbknyo/database/query` com
`Authorization: Bearer <PAT sbp_...>`. O PAT não fica salvo em arquivo no repo — gerar um novo em
supabase.com (conta smarthome → Account → Access Tokens) quando precisar, e usar só na sessão. Ver
KI-17 no [[KNOWN_ISSUES]] para o cuidado com acentuação nas queries via Bash.

## Documentos a consultar para continuar
[[MASTER_PRD]] · [[ARCHITECTURE]] · [[ROADMAP]] · [[DECISIONS]] · [[KNOWN_ISSUES]]
