---
id: DECISIONS
title: Decisões Arquiteturais — Real Vision Academy
type: decisions
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-08-10
related:
  - ARCHITECTURE
  - MASTER_PRD
---

# Decisões Arquiteturais — Real Vision Academy

> Registro append-only. Cada decisão: contexto · problema · decisão · justificativa · impacto.

## D-001 — Academy no mesmo repo do site, rota `/academy`
- **Data:** 2026-07-17
- **Contexto:** A diretiva exige "expansão natural", não sistema paralelo.
- **Problema:** Repo separado ou dentro do site?
- **Decisão:** Mesmo repositório `real-vision-site`, servida em `realvisionmaps.com/academy`.
- **Justificativa:** Reuso de design system, componentes, i18n e infra de deploy; consistência total.
- **Impacto:** Academy compartilha build/deploy Vercel do site; código organizado em `src/pages/academy`.

## D-002 — Supabase novo unifica todos os usuários finais
- **Data:** 2026-07-17
- **Contexto:** O site hoje usa o Supabase do VisionFlow (`ghwjetvazmdlaqidgxqi`) para login/like do blog.
  Felipe criou um Supabase novo (`xomtfkbvathddfpbknyo`, conta email smarthome, "realvision academy").
- **Problema:** O banco novo atende só a Academy ou também o blog?
- **Decisão:** O banco novo vira o **banco único de usuários finais** (blog + Academy). O Supabase do
  VisionFlow volta a ser 100% CRM interno.
- **Justificativa:** Um login só para o visitante em todo o site; separação limpa entre público
  (Academy/blog) e interno (CRM); evita duas contas de usuário no mesmo front.
- **Impacto:** Fase 1 precisa repontar `supabase.ts` e migrar a auth/likes do blog para o banco novo.

## D-003 — Curso avulso (compra única) no MVP
- **Data:** 2026-07-17
- **Decisão:** Modelo de compra única por curso. Assinatura fica para o futuro.
- **Justificativa:** Simplicidade; alinhado ao primeiro produto (Profissional 360).

## D-004 — Documentação viva no vault (Gaveta B), não no repo de código
- **Data:** 2026-07-17
- **Decisão:** Docs em `operacao/projetos/real-vision-academy/docs/` (vault Obsidian). Repo tem só um
  ponteiro (`docs/academy/README.md`).
- **Justificativa:** Backlinks Obsidian, leitura no mobile, navegação via Obsidian CLI — o que o adendo
  Master Visionair exige.
- **Impacto:** Metodologia conduzida pela skill [[master-visionair]].

## D-005 — Gateway de pagamento: Stripe
- **Data:** 2026-07-17
- **Contexto:** Pesquisa [[pagamento]] comparou Stripe, Mercado Pago, PagSeguro e plataformas prontas
  (Hotmart/Kiwify), para curso avulso com área de membros própria.
- **Decisão:** **Stripe** como gateway do MVP.
- **Justificativa:** Checkout transparente (dentro do site — consistência visual), menor taxa efetiva
  entre os gateways (~3,9–4,9%), melhor DX/API, destrava assinatura e internacional no futuro.
- **Impacto:** Fase 4 constrói checkout + webhook server-side (Vercel function) → cria matrícula.
  Avaliar habilitar Pix via Stripe depois do lançamento, com dado real.

## D-006 — Hospedagem de vídeo: Bunny Stream
- **Data:** 2026-07-17 (pesquisa) · decidido em 2026-07-18
- **Contexto:** Pesquisa [[video-hosting]] comparou YouTube não-listado, Vimeo, Bunny Stream e
  Supabase Storage, para vídeos de curso pago (exige proteger contra acesso sem matrícula).
- **Decisão:** **Bunny Stream** para os vídeos das aulas + **Supabase Storage** para materiais
  complementares (prompts `.md`, PDFs).
- **Justificativa:** Custo baixíssimo no volume da Academy (~US$1–5/mês) e a melhor proteção de
  conteúdo pago das opções avaliadas (link com expiração + trava de download), contra ~US$12–33/mês
  do Vimeo por proteção equivalente ou inferior. YouTube não serve (sem trava nenhuma).
- **Impacto:** Destrava a Fase 3 (player/área de membros). Setup inicial: conta Bunny Stream +
  biblioteca de vídeo + integração de link com expiração no player.

## D-007 — Login do blog: recomeçar limpo (sem migrar dados)
- **Data:** 2026-07-17
- **Contexto:** A auth/likes/comentários do blog rodavam no Supabase do VisionFlow. Ao repontar para o
  banco novo, era preciso decidir migrar os dados existentes ou recomeçar do zero.
- **Decisão:** **Recomeçar limpo.** Tabelas recriadas vazias no banco novo; dados antigos ficam no
  Supabase do VisionFlow como arquivo (não migrados).
- **Justificativa:** Simplicidade; volume de likes/comentários do blog é baixo; evita risco de migração.
- **Impacto:** Ao publicar, likes/comentários antigos do blog em produção deixam de aparecer. Esperado.

## D-008 — Fase 1 executada direto no Claude Code (sem Fable 5)
- **Data:** 2026-07-17
- **Contexto:** Felipe cogitou usar o Fable 5 para construir tudo de uma vez.
- **Decisão:** Fase 1 (mecânica: repontar config, tela de auth, ativar provider) feita direto no Claude
  Code. Fable 5 fica reservado para fases com muitas decisões de arquitetura acumuladas (Fase 2/3).
- **Justificativa:** Fable custa 10x input / 50x output vs. Sonnet; o ganho dele só compensa em trabalho
  longo e denso em decisões. Regra registrada na skill [[master-visionair]].
- **Impacto:** Fase 1 concluída nesta sessão.

## D-009 — Tabelas de comunidade: adiadas (não criadas na Fase 2)
- **Data:** 2026-07-17
- **Contexto:** O escopo "2B" pedia preparar tabelas de comunidade na Fase 2 sem construir UI, mas não
  existe spec de comunidade.
- **Problema:** Criar schema sem spec ou adiar?
- **Decisão:** **Adiar.** Nenhuma tabela de comunidade criada. Felipe confirmou a recomendação.
- **Justificativa:** YAGNI — schema sem spec vira retrabalho quase certo; adicionar tabelas depois no
  Supabase é trivial, sem custo de adiar.
- **Impacto:** Comunidade entra só após spec própria (novo PRD + decisão). Ver [[ROADMAP]] "Futuro".

## D-010 — Materiais: assinatura client-side via RLS de Storage (sem função serverless)
- **Data:** 2026-07-18
- **Contexto:** O plano da Fase 3 previa `api/material-sign.ts` (Vercel function + service role key)
  para assinar URLs dos materiais no bucket privado `course-materials`.
- **Problema:** A função exigiria a `SUPABASE_SERVICE_ROLE_KEY` circulando no ambiente (e não seria
  testável antes de configurá-la no Vercel), sendo que o Storage do Supabase já suporta a mesma
  guarda nativamente.
- **Decisão:** **Policy de RLS em `storage.objects`** (`materials_read_enrolled`: leitura só se
  existe matrícula no curso extraído do caminho `{course_id}/...`) + `createSignedUrl` chamado
  **direto do client** com a sessão do aluno. A função serverless ficou só onde é inevitável:
  `api/bunny-sign.ts` (token key do Bunny é segredo de servidor).
- **Justificativa:** Recurso nativo da plataforma > código próprio (escada Ponytail); um segredo a
  menos; menos um endpoint pra manter; testável de imediato. Segurança equivalente — a policy roda
  no banco.
- **Impacto:** `api/material-sign.ts` não existe. `SUPABASE_SERVICE_ROLE_KEY` não é necessária na
  Fase 3 (o `bunny-sign` valida sessão e matrícula com a anon key, como o usuário, via RLS).

## D-011 — Fase 4 (MVP): checkout manual via WhatsApp, não Stripe
- **Data:** 2026-07-18
- **Contexto:** D-005 (Stripe) decidiu o gateway formal, mas [[pagamento]] registra uma decisão mais
  recente do Felipe, informal, direto no documento de pesquisa: não mexer em gateway agora, o site
  monta o pedido com os dados da compra e manda pro WhatsApp do Felipe (mesmo número cadastrado no
  site), que confirma o pagamento manualmente. Confirmado de novo com o Felipe nesta sessão, depois
  de eu ter corrigido `ARCHITECTURE.md` §5 pra Stripe achando que D-005 ainda valia como está.
- **Decisão:** Fase 4 do MVP usa **fluxo manual via WhatsApp**, reaproveitando o padrão que a Loja do
  site já usa (`src/components/shop/CartDrawer.tsx`): monta uma mensagem com os dados do pedido e
  abre `wa.me/5511912931924?text=...` com tudo pré-preenchido. Nenhum SDK de pagamento, nenhum
  webhook. Grava um registro em `orders` (`status: pending`) no clique de compra; Felipe confirma o
  pagamento pelo WhatsApp e concede a matrícula manualmente pelo `EnrollmentManager.tsx` (já existe,
  não precisa criar nada novo ali).
- **Justificativa:** Simplicidade — reusa código e schema que já existem, sem custo de integração de
  gateway agora. Felipe pode migrar pra Stripe depois, com volume real, sem essa decisão travar o
  lançamento do curso.
- **Impacto:** D-005 (Stripe) não foi descartado — vira upgrade futuro, não escopo do MVP. Escopo real
  da Fase 4: botão "Comprar" na landing (`Profissional360.tsx`) e/ou `CoursePage.tsx`, insert em
  `orders`, link `wa.me` formatado. Trabalho leve — não densificado em decisão, então não se enquadra
  na regra do Fable 5 (D-008); cabe em qualquer modelo, feito nesta sessão foi só o escopo, a
  implementação ficou pra próxima. `ARCHITECTURE.md` §5 e `ROADMAP.md` Fase 4 atualizados.

## D-012 — Certificado de conclusão: liberação manual, sem serviço novo
- **Data:** 2026-07-18
- **Contexto:** A landing promete certificado desde a Fase 2, mas não havia spec nem tabela. Ao decidir
  construir dentro da Fase 5, era preciso escolher gatilho de liberação, formato e onde gerar o PDF.
- **Decisão:** Liberação **manual pelo admin** (coluna `enrollments.certificate_issued_at`, botão no
  painel de Matrículas) — não automática ao completar 100%. Certificado é uma página HTML com a
  identidade visual da RV; o aluno usa a função nativa de imprimir do navegador pra gerar o PDF
  (mesmo padrão do `rv-relatorio`). Nenhuma biblioteca nova instalada.
- **Justificativa:** Recurso nativo da plataforma > dependência nova (escada Ponytail); liberação manual
  dá controle ao Felipe sobre quem recebe, sem exigir lógica de "conclusão" ainda não definida.
- **Impacto:** 1 coluna nova em `enrollments`. Rota `/academy/certificado/:id`. Painel admin ganhou aba
  de liberação. Pendente: decidir entre 2 mockups de design (escuro/claro) e formalizar como padrão.

## D-013 — Anuidade (membership) como entitlement novo, separado da matrícula
- **Data:** 2026-07-19
- **Contexto:** A área de membros evolui para um hub com comunidade (ver [[PRD-006-hub-comunidade]]).
  Felipe quer cobrar uma anuidade pelo acesso à comunidade + Mentor IA, mantendo os cursos como
  produtos avulsos (D-003).
- **Problema:** A anuidade dá acesso a tudo (modelo assinatura) ou é um direito à parte dos cursos?
- **Decisão:** Anuidade é um **entitlement próprio** (`memberships`), **independente** de `enrollments`.
  Duas trilhas ortogonais: **Membro** (anuidade → comunidade + Biblioteca de Prompts + Mentor IA futuro)
  e **Aluno** (matrícula → curso adquirido). A pessoa pode ter uma, outra, ou as duas.
- **Justificativa:** Reusa `enrollments`, que já existe pros cursos; separa a receita de comunidade da
  de curso; modelagem simples (uma tabela nova).
- **Impacto:** Nova tabela `memberships`. D-003 (curso avulso) permanece válida — a anuidade é produto
  novo, não a substitui. "Comprar curso dá X meses de anuidade de brinde" fica como gatilho futuro,
  fora do MVP.

## D-014 — Comunidade nativa no Supabase (não plataforma pronta)
- **Data:** 2026-07-19
- **Contexto:** D-009 adiou as tabelas de comunidade por falta de spec. Agora há spec
  ([[PRD-006-hub-comunidade]]). Referência estrutural: Circle (comunidade ibe.IA / Sem Codar).
- **Problema:** Construir a comunidade nativa no nosso Supabase, ou usar Circle/Skool e integrar?
- **Decisão:** **Nativa**, dentro do `/academy`, no Supabase da Academy (`xomtfkbvathddfpbknyo`).
- **Justificativa:** Tudo nosso, integração total com cursos/progresso/tiers, zero custo de plataforma,
  zero vendor lock-in (filosofia RV). Recria a estrutura do Circle com a marca própria.
- **Impacto:** Atualiza D-009 (deixa de ser "adiado sem spec"). Banco: `spaces`, `posts`, `comments`,
  `reactions` + extensão de `profiles`. Mais trabalho de dev, assumido conscientemente.

## D-015 — Nomenclatura de tiers de acesso
- **Data:** 2026-07-19
- **Decisão:** **Visitante** (não logado) · **Usuário** (logado, grátis) · **Membro** (anuidade ativa) ·
  **Aluno** (matrícula em curso). Gating do conteúdo da comunidade por `min_tier` (`free`/`member`).
- **Justificativa:** Linguagem única entre Felipe, docs e código; evita confundir "usuário" com
  "membro" — uma fonte clássica de bug de controle de acesso.
- **Impacto:** Coluna `min_tier` nas tabelas de conteúdo; a UI diferencia o que cada tier enxerga.

## D-016 — Aula narrada e aula em vídeo coexistem
- **Data:** 2026-07-30
- **Contexto:** O [[PRD-007-curso-narrado-sincronizado]] propõe uma modalidade de aula com texto + áudio
  narrado sincronizado. O Profissional 360 foi desenhado como screencast, e a conta Bunny Stream já está
  paga, configurada (Library `707363`) e validada em produção (KI-14).
- **Problema:** O narrado substitui o vídeo ou é formato adicional?
- **Decisão:** **Coexistem.** Cada aula declara o próprio formato. Bunny Stream continua sendo a entrega
  de vídeo; narrado é formato novo ao lado.
- **Justificativa:** Felipe confirmou. Os formatos servem conteúdos diferentes: aula de mentalidade,
  mercado e precificação não tem tela pra mostrar (narrado é melhor); aula de ferramenta na prática tem
  o valor exatamente em ver a tela (vídeo é melhor). Substituir jogaria fora infra paga e validada.
- **Impacto:** Coluna de formato em `lessons` com default no comportamento atual — nenhuma aula existente
  muda. A Academy passa a saber renderizar dois leitores.

## D-017 — Texto das aulas vem dos roteiros do curso
- **Data:** 2026-07-30
- **Decisão:** O conteúdo de leitura é escrito a partir dos roteiros do curso, adaptado para leitura —
  **não** transcrição de fala nem texto novo sem relação com a grade.
- **Justificativa:** A grade ([[02-profissional-360/CONCEITO|CONCEITO]]) e os roteiros já carregam a progressão pedagógica decidida.
- **Impacto:** O texto da aula narrada é **final palavra por palavra**, porque cumpre três papéis: o que
  Felipe lê na gravação, o que aparece na tela, e o que o alinhamento sincroniza. Formato diferente do
  roteiro em tópicos do Módulo 1, e isso é intencional.

## D-018 — Conteúdo pago no banco e em bucket privado, nunca em arquivo do repo
- **Data:** 2026-07-30
- **Contexto:** No blog, texto e mapa de sincronização vivem em `src/data/` e o MP3 em `public/`. O
  rascunho do PRD-007 não especificava onde o conteúdo pago ficaria.
- **Problema:** Reusar o padrão do blog para conteúdo de curso pago?
- **Decisão:** **Não.** Texto e mapa vão para o banco com gate de matrícula; áudio para bucket privado com
  URL assinada, reusando o padrão de D-010 (`createSignedUrl` no client + policy em `storage.objects`).
- **Justificativa:** No blog funciona porque é conteúdo público. Em curso pago, texto no código-fonte é
  conteúdo baixável sem pagar por qualquer visitante. Restrição de segurança, não preferência.
- **Impacto:** Gate obrigatório sobre o conteúdo pago, porque `lessons` hoje tem SELECT público para
  catálogo (KI-28). Recomendação: view com exigência de matrícula, padrão `prompts_gated`/`skills_gated`
  da Fase 6. Limite honesto assumido: quem pagou consegue extrair o MP3 (KI-25) — a proteção real é
  contra acesso **sem** matrícula.

## D-019 — Gamificação do MVP: só progresso com escuta real
- **Data:** 2026-07-30
- **Contexto:** O PRD-006 jogou gamificação inteira para fora do MVP; o PRD-007 a traz de volta com uma
  lista longa (XP, badges, missões, sequência, recompensas).
- **Problema:** Quanto de gamificação entra antes de saber se a experiência de leitura narrada funciona?
- **Decisão:** **Mínimo.** Progresso por módulo/curso + aula concluída **apenas com escuta real** do
  áudio. XP, badges, missões e sequência ficam fora.
- **Justificativa:** Felipe escolheu o escopo mínimo. A regra de escuta real é o que cumpre a exigência
  do PRD de "gamificação que reforça o aprendizado, não decoração" — deixar a barra correr até o fim não
  conclui a aula.
- **Impacto:** Duas colunas em `lesson_progress` (última posição, tempo ouvido). Medição por avanço
  contínuo do áudio, persistida em lote (~15s), não a cada `timeupdate`.

## D-020 — Mapa de sincronização gerado por script, não à mão
- **Data:** 2026-07-30
- **Contexto:** No blog, o mapa bloco→frases foi montado manualmente. Bateu 65/65 fragmentos em um post,
  mas o próprio playbook marca esse passo como o mais arriscado do pipeline.
- **Problema:** Repetir o processo manual na Academy ou automatizar antes da primeira aula?
- **Decisão:** **Automatizar antes da primeira aula.** Script gera frases e mapa, com validação
  automática (contagem de fragmentos + último `end` = duração do áudio).
- **Justificativa:** Felipe escolheu automatizar antes. Erro de contagem aqui significa áudio destacando
  a frase errada — o defeito mais visível possível para um aluno pagante. E o curso passa de 40 aulas.
- **Impacto:** Script novo em `scripts/`. Validação com gabarito conhecido: rodar sobre o post do blog e
  comparar com o mapa manual.

## D-021 — Áudio em segundo plano no Android: PWA, sem wrapper nativo
- **Data:** 2026-07-30 (aberta e **fechada no mesmo dia**, com teste em aparelho real)
- **Status:** ✅ **RESOLVIDA — PWA aprovada. Capacitor fora do escopo.**
- **Contexto:** Requisito do PRD: áudio continua tocando com a tela desligada, com controles no sistema.
  O site **não tem PWA nenhuma** hoje (sem manifest, sem service worker, sem `vite-plugin-pwa`).
- **Problema:** PWA atende com confiabilidade, ou precisa de wrapper nativo (Capacitor)?
- **Teste executado (Felipe, celular real, Chrome Android):** roteiro do §5.3 de
  [[PRD-007-arquitetura-leitor-narrado]], usando os 8 min de narração do post `site-maior-ativo-era-ia`
  que já está no ar. Resultado — **todos os passos passaram**:
  - tela apagada por 2 min: áudio continuou;
  - controles apareceram na tela de bloqueio;
  - troca para outro app por 2 min e volta: áudio continuou e o destaque voltou ao lugar certo;
  - **repetido com economia de bateria ligada: passou também** (era o cenário mais rigoroso).
- **Decisão:** **PWA + Media Session API.** Nenhum wrapper nativo, nenhum build Android, nenhuma
  dependência nova de empacotamento.
- **Justificativa:** O comportamento foi verificado no aparelho do Felipe, não inferido. Passar com
  economia de bateria ligada remove a principal dúvida (o Android corta mais coisa nesse modo). Capacitor
  custaria build Android, assinatura de app e mais um artefato para manter, sem resolver problema que
  exista.
- **Impacto:** Fase 6 do [[PRD-007-plano-execucao]] **encolhe** — controles já aparecem nativamente, então
  o trabalho vira `manifest.json` + ícones (instalabilidade) e Media Session apenas para os metadados
  (título/capa da aula em vez de rótulo genérico do navegador). Service worker segue **fora** do escopo,
  porque offline não está no MVP e ele traz o risco do KI-26. Nenhuma fase fica travada.
- **Aprendizado de método:** a decisão custou 10 minutos de teste com um artefato que já existia (o post
  do blog), em vez de dias de análise ou de construir para descobrir depois. Registrado em
  [[METHODOLOGY_LEARNINGS]].

## D-022 — Prova inicial: Módulo 0 do Profissional 360
- **Data:** 2026-07-30
- **Contexto:** O PRD exige provar "uma aula real" antes de qualquer expansão.
- **Decisão:** Módulo 0, "Bem-vindo à Profissão 360°".
- **Justificativa:** Felipe escolheu. É o início real do curso, e é conteúdo de mentalidade sem tela pra
  mostrar — o caso em que o formato narrado é melhor que vídeo, não apenas diferente.
- **Impacto:** O roteiro do Módulo 0 não existia; foi escrito nesta sessão em
  [[MODULO-0-bem-vindo]] (4 aulas), aguardando revisão do Felipe.

## D-023 — MVP é uma aula só: a 0.1
- **Data:** 2026-07-30
- **Contexto:** D-022 escolheu o Módulo 0 (4 aulas) como prova.
- **Problema:** Construir o módulo inteiro ou só uma aula?
- **Decisão:** **Só a aula 0.1 — "O que é um Profissional 360°".** As aulas 0.2, 0.3 e 0.4 entram depois
  da experiência validada e aprovada.
- **Justificativa:** Felipe reduziu o escopo. O objetivo do MVP é provar que o app funciona, e para isso
  uma aula basta; 4 aulas multiplicariam gravação e processamento antes de saber se a experiência presta.
- **Impacto:** Fora do MVP: listagem e navegação entre aulas narradas, importação em lote. O texto das 4
  aulas fica escrito e pronto no vault, mas só a 0.1 precisa ser revisada e gravada agora.

## D-024 — Texto final da aula 0.1 é o que foi gravado, não o roteiro original
- **Data:** 2026-07-30
- **Contexto:** Felipe gravou a narração da 0.1 sem seguir [[MODULO-0-bem-vindo]] palavra por palavra —
  improvisou boa parte, incluindo um trecho final com metáfora de "reino astral" ausente do roteiro.
- **Decisão:** o texto transcrito da gravação **substitui** o roteiro anterior como conteúdo oficial da
  aula, incluindo o trecho da metáfora — mantido como gravado, confirmado explicitamente por Felipe.
- **Justificativa:** KI-23 (mudar o texto depois de gravar quebra o sync) força tratar o áudio como fonte
  de verdade. Reescrever o texto pra bater com o roteiro antigo exigiria regravar a aula inteira.
- **Impacto:** as linhas "Objetivo" e "Resultado da aula" no topo da seção, que citam "quatro pilares",
  não foram atualizadas — não descrevem mais o conteúdo com precisão. Revisão fica pendente, sem OK do
  Felipe pra reescrever o resumo editorial. Roteiro anterior preservado no histórico do git (nunca
  apagado, AGENTS regra 6).

## D-025 — Aula narrada abre em rota própria de tela cheia, fora do `AcademyShell`
- **Data:** 2026-08-04
- **Contexto:** o design aprovado ([[PRD-008-leitor-narrado-design]]) tem cabeçalho de aula de 60px
  próprio e player fixo no rodapé da viewport. Hoje a aula abre dentro do `AcademyShell` (sidebar
  Início/Aprender/Comunidade) e do grid de 3 colunas do `CoursePage`.
- **Decisão:** rota nova `/academy/curso/:slug/aula/:lessonId`, registrada **fora** do bloco
  `<Route element={<AcademyShell />}>`. `CoursePage` continua existindo e leva pra lá.
- **Justificativa:** os dois formatos não convivem — cabeçalho próprio, rodapé fixo e modo imersivo do
  celular exigem a viewport inteira. Já há precedente no projeto: `/academy/admin` fica fora da casca.
- **Impacto:** `NarratedLessonPlayer.tsx` (o player embutido da Fase 5) é substituído e removido.

## D-026 — Cada frase é um elemento de bloco próprio, não span inline
- **Data:** 2026-08-04
- **Contexto:** hoje o leitor renderiza 82 parágrafos com as frases como `<span>` inline dentro. O design
  pede frase com `padding 8px 14px`, raio 10px e `box-shadow: inset 3px 0 0` — o protótipo usa `<p>` por
  frase.
- **Decisão:** o leitor da Academy renderiza **uma frase por elemento de bloco**, com `data-frag`.
- **Justificativa:** `inset box-shadow` em span inline que quebra linha renderiza errado. E o custo é
  baixo: os dados reais têm 82 blocos para 97 frases (1,18 por bloco), então a estrutura de parágrafo
  praticamente não se perde.
- **Impacto:** habilita destaque, marcador, resultado de busca e clique por frase — quatro estados que o
  design exige e o span inline não suporta bem.

## D-027 — `NarratedSpans.tsx` não é reusado pelo leitor novo
- **Data:** 2026-08-04
- **Contexto:** a Fase 4 extraiu `NarratedSpans.tsx` justamente para ser compartilhado entre blog e
  Academy. Mas o commit `34cd211` depois mudou o blog **de propósito** para destacar o **bloco inteiro**
  (`isBlockActive` aplicado a todos os spans), e o design da Academy exige o oposto: destaque por frase.
- **Decisão:** o leitor novo renderiza suas próprias frases (D-026); `NarratedSpans.tsx` fica **intocado**
  servindo o blog. `useNarrationAutoScroll` continua reusado 100%, sem alteração.
- **Justificativa:** mexer no componente compartilhado regride um comportamento do blog que foi escolhido
  deliberadamente. Reverter para não regredir custaria mais que duplicar ~30 linhas de renderização.
- **Impacto:** aceita duplicação pequena e conhecida em troca de risco zero no blog em produção.

## D-028 — Temas claro e sépia escopados na área de leitura, nunca em `:root`
- **Data:** 2026-08-04
- **Contexto:** o design tem 3 temas de leitura (Real Vision escuro, Claro, Sépia). O site inteiro é
  escuro por identidade de marca ([[DESIGN]]).
- **Decisão:** os temas trocam variáveis CSS **locais** num wrapper com `data-reader-theme`. `:root` não é
  tocado. Confirmado explicitamente pelo Felipe.
- **Justificativa:** mexer em `:root` vazaria o tema claro para todas as telas do site.
- **Impacto:** verificação de cada bloco inclui checar que o resto da Academy segue escuro.

## D-029 — A lista de aulas navega de verdade entre aulas
- **Data:** 2026-08-04
- **Contexto:** [[D-023]] limitou o MVP à aula 0.1, e "listagem/navegação entre aulas narradas" estava
  explicitamente fora do escopo do PRD-007. O design tem um painel curso → módulos → aulas.
- **Decisão:** o painel navega de verdade. Amplia o escopo do PRD-007 de propósito.
- **Justificativa:** o objetivo do Felipe é gravar os módulos restantes logo depois desta reforma. Deixar
  o painel só decorativo obrigaria reabrir o código na primeira aula nova.
- **Impacto:** custo pequeno agora (a `CourseTree` já vem inteira do `useCourse`), evita retrabalho certo.

## D-030 — Media Session e PWA vêm depois do design, não antes
- **Data:** 2026-08-04
- **Contexto:** a Fase 6 do [[PRD-007-plano-execucao]] (Media Session + `manifest.json`) estava planejada
  como próxima, antes de o design chegar.
- **Decisão:** vira o **Bloco 6** do [[PRD-008-leitor-narrado-design]], depois de toda a reforma visual.
- **Justificativa:** esse código mora dentro do player. Implementado antes, seria refeito durante a
  reforma. Depois, é feito uma vez só, sobre o player final.
- **Impacto:** a Fase 6 do PRD-007 deixa de existir como fase separada; o critério de aceite #5 do §14 do
  PRD-007 passa a ser fechado no Bloco 6.

## D-031 — Barra fixa de rodapé publica sua altura em `--rv-bottom-inset`
- **Data:** 2026-08-07
- **Contexto:** o `ConsentBanner` é global e fixo no rodapé com `z-[100]`; o player do leitor narrado
  também é fixo no rodapé, com `z-40`. O banner cobria play, velocidade e volume (KI-35).
- **Decisão:** a rota que tem barra fixa de rodapé publica a altura dela na variável CSS
  `--rv-bottom-inset` (medida com `ResizeObserver`, nunca fixa), e o banner se posiciona a partir dela.
- **Justificativa:** as alternativas eram piores. Esconder o banner no leitor mataria o pedido de
  consentimento naquela rota; subir o z-index do player só inverteria o problema, com o player cobrindo
  Aceitar/Recusar. Empilhar mantém os dois usáveis. Medir em vez de fixar porque a barra tem 79px (não os
  76 do design) e cresce com o banner de erro do áudio.
- **Impacto:** sem a variável, comportamento idêntico ao anterior — home e blog verificados. Qualquer
  barra fixa de rodapé futura deve seguir o mesmo padrão.

## D-032 — Pesquisa interna não move o áudio, e normaliza acento
- **Data:** 2026-08-07
- **Contexto:** Bloco 2 do [[PRD-008-leitor-narrado-design]]. O design não define o que a busca faz com a
  narração nem como trata acentuação.
- **Decisão:** pesquisar traz a ocorrência para a tela e **não** mexe na posição do áudio; o aluno decide
  clicando na frase. A busca normaliza acento — `profissao` encontra "profissão".
- **Justificativa:** pular a narração a cada tecla digitada seria hostil com quem só quer conferir um
  trecho enquanto ouve. E o teclado de celular sem acento é o caso comum do aluno.
- **Impacto:** vale também para o "Buscar" do popup de seleção (Bloco 5), que alimenta esta mesma busca.

## D-033 — Toque simples é interruptor puro, e o chrome é um grupo só
- **Data:** 2026-08-10
- **Contexto:** o Bloco 4 tinha sido entregue com um mapa de gesto em que o toque na frase fazia seek, o
  toque na frase **já ativa** escondia o chrome, e o duplo toque o trazia de volta. Passou nos 17 testes
  e falhou no dedo do Felipe: ele entrava no modo limpo e não conseguia mais alternar.
- **Decisão:** um toque em **qualquer pixel** alterna o chrome — à vista some, escondido volta. O toque
  simples **não mexe no áudio**. E "chrome" é cabeçalho de cima **e** barra de baixo juntos, um grupo só:
  *"a barra de controles vai ser a mesma coisa que o cabeçalho lá de cima"*.
- **Justificativa:** o mapa anterior embutia dois significados no mesmo toque, separados por um estado
  invisível (qual frase está ativa). Ninguém aprende isso usando. Interruptor é o gesto que o aluno já
  conhece de leitor de PDF e de player de vídeo.
- **Impacto:** a implementação anterior estava **correta** — a especificação estava errada. Lição de
  método: gesto se valida no dedo, não em asserção de teste.

## D-034 — Duplo toque numa frase pula pro trecho E começa a tocar
- **Data:** 2026-08-10
- **Contexto:** com o seek fora do toque simples (D-033), ele precisava de casa nova.
- **Decisão:** duplo toque numa frase = "quero ouvir daqui". Pula pro início do fragmento e garante o
  play. Nasceu o `playFromFragment` em `useNarratedAudio` — `seekToFragment` + `togglePlay` pausaria se
  já estivesse tocando, o que contradiz o gesto.
- **Justificativa:** separar os dois gestos por **número de toques**, não por estado, eliminou a briga
  pelo primeiro clique do duplo toque. Com o toque simples barato (só anima o chrome), ele pode ser
  adiado 250ms e cancelado pelo duplo — adiamento que era inaceitável enquanto ele fazia seek.
- **Impacto:** `verify-bloco1` teve o teste de seek trocado de `click` para `dblclick`.

## D-035 — O chrome só muda por gesto explícito
- **Data:** 2026-08-10
- **Contexto:** a versão anterior escondia o chrome ao rolar com o dedo e depois de 10s de ociosidade.
  Nada disso foi pedido; foi invenção da implementação.
- **Decisão:** sem timer de ocioso e sem esconder por rolagem. A tela nunca se mexe sozinha.
- **Justificativa:** o aluno rola pra ler; a tela reagir ao ato de ler é hostil. E timer torna o estado
  imprevisível — o Felipe trazia o chrome de volta e ele fugia sozinho.
- **Impacto:** as duas ficaram como **teste de regressão** em `verify-bloco4`. Se voltarem, falha.

## D-036 — Pilha do rodapé: a barrinha nunca sai, as camadas montam sobre ela
- **Data:** 2026-08-10
- **Contexto:** existiam **duas** barras de progresso (a faixa fina do modo limpo e outra dentro da barra
  de controles), e a fina **desaparecia** quando a de controles aparecia.
- **Decisão:** três camadas empilhadas — (1) barrinha de progresso + nome da aula + porcentagem, **sempre
  na tela**; (2) barra de controles, monta sobre a 1; (3) painel expandido, monta sobre a 2. A barrinha é
  a **única** barra de progresso do mobile; o filete interno da barra de controles virou `sm:block`.
- **Justificativa:** palavras do Felipe, *"cada um monta em cima do outro"*. Dois medidores da mesma
  grandeza podiam divergir e não havia motivo pra existirem.
- **Impacto:** geometria da pilha derivada de `STRIP_H` (exportado por `ImmersiveStrip`) em vez dos
  76/94/40 cravados. Qualquer camada nova de rodapé se posiciona a partir dessa constante.

## D-037 — A barrinha tem fundo sólido
- **Data:** 2026-08-10
- **Contexto:** ela usava degradê pra transparente, com a intenção de "deixar o texto respirar até a borda".
- **Decisão:** fundo sólido (`var(--rd-bg)`).
- **Justificativa:** o efeito prático da intenção bonita era o texto desfilando atrás do nome da aula
  enquanto rolava. Reprovado no teste em aparelho.
- **Impacto:** `verify-bloco4` tinha uma asserção exigindo o oposto (`faixa sem fundo sólido`) —
  invertida de propósito.

## D-038 — A barra de controles tem quatro saltos de tempo; frase vai pro painel
- **Data:** 2026-08-10
- **Contexto:** a barra recolhida tinha frase anterior / play / próxima frase, e os saltos de 15s moravam
  só no painel expandido. O Felipe pediu 15s **e** 5s para cada lado.
- **Decisão:** barra = `−15  −5  [play]  +5  +15`, com o número no canto superior direito de cada seta.
  Os botões de frase descem pro painel expandido; os de 15s sobem pra barra. O círculo âmbar do play não
  muda. Único item redesenhado: o botão de abrir os controles.
- **Justificativa:** cinco itens é o teto de uma barra de celular. Ícone com "15" desenhado dentro fica
  ilegível a 19px, e rótulo ao lado dobraria a largura — quatro botões não caberiam.
- **Impacto:** o "espaço vazio" que o Felipe notou tinha causa: no mobile o bloco da esquerda (tempo +
  régua) é `hidden sm:flex`, e os blocos restantes esticavam com `flex-1`. Cinco botões resolvem por
  conteúdo.

## D-039 — Nenhum bloco é "verificado" sem print de 390px revisado a olho
- **Data:** 2026-08-10
- **Contexto:** os Blocos 1 a 4 foram declarados "verificados 17/17, 32/32" com base em Playwright. O
  Felipe testou e achou container vazando, cor de destaque reprovada, itens quebrando linha e rolagem
  horizontal na nav. **Todos passaram no teste**, porque nada disso é asserção dele. Pior: o ramo
  `feat/leitor-narrado-design` nunca tinha sido juntado ao `main`, então o teste no celular caiu no
  player velho da Fase 5.
- **Decisão:** bloco só fecha com os quatro — `npm run build` limpo · Playwright verde · **screenshot em
  390px que o agente abre e olha** · revisão contra [[DESIGN]]. E antes de pedir teste ao Felipe,
  **confirmar em que endereço o código está rodando** e que o commit está no `main` publicado.
- **Justificativa:** teste de robô prova que não quebrou, não que está bom. Confundir os dois custou uma
  rodada inteira de avaliação do Felipe sobre uma tela que já havia sido reformada.
- **Impacto:** valeu na hora. Foi olhando o print que a primeira versão do botão de abrir os controles
  (dois filetes flanqueando a seta) foi reprovada, e que a primeira tentativa de cor dourada foi
  reprovada por ler como bege acinzentado. Nenhuma das duas acusou nada no Playwright.

## D-040 — Trilha gamificada: um nó por aula, módulos em acordeão
- **Data:** 2026-08-10 · **Status:** decidido, execução em [[PRD-009-trilha-gamificada]]
- **Contexto:** a `CoursePage` joga o sumário na lateral, que no celular cai depois do conteúdo todo. O
  Felipe quer navegação estilo Duolingo.
- **Decisão:** cada bolinha da trilha é uma **aula**; os **módulos são acordeões** que agrupam as
  bolinhas. Níveis de cor por estado — concluída acesa, não concluída com opacidade baixa.
- **Justificativa:** a proposta inicial era um nó por módulo, por causa das 40 aulas do curso. O Felipe
  preferiu aula, com o acordeão do módulo resolvendo o comprimento da trilha. Reaproveita o `Accordion`
  do shadcn já usado em `CourseSyllabus`.
- **Impacto:** substitui a `CoursePage` atual. Nasce quase toda vazia — só a aula 0.1 está gravada, e
  isso é esperado.

## D-041 — Navegação livre: aula não concluída fica apagada, nunca travada
- **Data:** 2026-08-10 · **Status:** decidido, execução em [[PRD-009-trilha-gamificada]]
- **Decisão:** a trilha mostra visualmente onde o aluno está, mas ele abre qualquer aula quando quiser.
- **Justificativa:** curso pago com aula bloqueada gera reclamação e pedido de reembolso. O ganho
  motivacional da gamificação vem do progresso visível, não do bloqueio.

## D-042 — Uma tela por aula, e os materiais moram nela
- **Data:** 2026-08-10 · **Status:** decidido, execução em [[PRD-009-trilha-gamificada]]
- **Decisão:** trilha → **tela da aula** (materiais + botão de ouvir) → leitor em tela cheia. Os materiais
  saem da tela do curso. O `MaterialsPanel` **dentro** do leitor continua existindo.
- **Justificativa:** consultar material sem sair da narração é útil; a tela da aula é a casa principal
  dos materiais, não a única.
- **Impacto:** o leitor precisa mudar de rota — ver [[PRD-009-trilha-gamificada]].

## D-043 — Materiais em acordeão, todos fechados
- **Data:** 2026-08-10
- **Contexto:** hoje `md_prompt` renderiza o `<pre>` inteiro sempre (ocupando meia tela) e os outros tipos
  são um card que dispara o arquivo direto no clique.
- **Decisão:** os três nascem **fechados**, iguais. Clicar abre o container e revela o botão dentro —
  copiar prompt, baixar PDF, abrir link.
- **Justificativa:** pedido do Felipe. Um prompt escancarado empurra tudo pra baixo e esconde o resto.
- **Impacto:** `openFile` (com a URL assinada do bucket privado `course-materials`) não muda — só deixa
  de ser disparado pelo clique no card.

## D-044 — Sumário sobe pra antes do conteúdo no celular, cartão perde altura fixa
- **Data:** 2026-08-10
- **Contexto:** `CourseSyllabus` e o bloco de conteúdo (cartão + título + materiais) eram os dois únicos
  itens do grid da `CoursePage`. No celular o grid empilha em ordem de DOM, e o sumário — que deveria
  ajudar a navegar entre aulas — ficava depois de tudo, inclusive dos materiais.
- **Decisão:** `order-1`/`order-2` no Tailwind trocam a ordem visual no celular (sumário primeiro, depois
  cartão + título + materiais), sem tocar na ordem do DOM nem no grid de 3 colunas do desktop — o `order`
  do desktop reaplica a ordem original. `NarratedLessonCard` perdeu o `aspect-video` fixo (o conteúdo não
  cabia na altura forçada e espremia o ícone de 48px); virou altura natural com padding.
- **Justificativa:** o PRD cogitava dividir o bloco de conteúdo em duas partes (cartão / título+materiais)
  pra intercalar o sumário no meio. Descartado: quebra o grid de 3 colunas do desktop, que hoje depende do
  bloco de conteúdo ser um item único ocupando 2 colunas ao lado do sumário — três itens soltos forçariam
  o auto-placement do CSS Grid a abrir uma segunda linha e deixar um vão embaixo do cartão. Sumário antes
  de tudo é a correção mínima que resolve o problema descrito (estava enterrado) sem esse risco.
- **Impacto:** escopo contido de propósito — o [[PRD-009-trilha-gamificada]] troca esta tela em seguida.

## D-045 — Nav mobile da Academy vira grade, não barra inferior fixa
- **Data:** 2026-08-10
- **Contexto:** os 5 chips (Início, Aprender, Comunidade, Prompts, Conta) com `overflow-x-auto` não cabiam
  em 390px — rolagem horizontal sem indicação visual, o Felipe via o último chip cortado na borda direita
  da tela ("container vazando à direita").
- **Decisão:** `grid grid-cols-3` — os 5 chips quebram em duas linhas (3 + 2), sem rolagem.
- **Justificativa:** o PRD dava a opção de virar barra inferior fixa estilo app. Descartada por ora: entra
  no mesmo território vertical da pilha de rodapé do leitor narrado (D-036/D-037), exige folga de área
  seguro de iOS e padding extra no `main` pra nada ficar escondido atrás dela — mudança de escopo maior
  que o "sem rolagem horizontal" pedido. Grade resolve o sintoma relatado com uma troca de classe.
- **Impacto:** se a Academy ganhar uma sexta entrada de nav, reavaliar — grid-cols-3 com 6 itens forma
  duas linhas de 3, o que também funciona; a decisão que precisaria de revisão é o número da coluna, não
  a abordagem.

## D-046 — Linha "Navegar por frase" sai do painel expandido (desfaz D-041)
- **Data:** 2026-08-10
- **Contexto:** o Felipe testou a Fase B em aparelho real e pediu pra tirar a linha "Anterior/Próxima"
  do painel do leitor. D-041 (mais cedo no mesmo dia) tinha posto ela ali de propósito.
- **Decisão:** removida. O duplo toque na frase (D-034/D-040) já cobre pular pra outra frase — a linha
  virou redundante depois dessa mudança.
- **Justificativa:** pedido direto do Felipe, confirmado explicitamente antes de mexer (a mudança desfazia
  uma decisão do mesmo dia e quebrava teste de regressão).
- **Impacto:** `controls.stepSentence` (o hook por trás dos botões) continua existindo só pro atalho de
  teclado (seta pra cima/baixo) — sem UI própria no painel mobile. `tests/verify-bloco1.mjs` e
  `tests/verify-bloco4.mjs` atualizados pra checar a ausência da linha em vez da presença.

## D-047 — Volume ganha arraste, além dos botões
- **Data:** 2026-08-10
- **Decisão:** a barrinha de volume no painel expandido vira um slider de verdade — arrasta com o dedo,
  clica em qualquer ponto pra pular o volume pra lá. Os botões `−`/`+` continuam existindo.
- **Justificativa:** pedido do Felipe — "seria interessante também se... eu pudesse pegar o dedo e
  arrastar a barrinha".

## D-048 — Popup de cor no botão "Marcar frase"
- **Data:** 2026-08-10
- **Contexto:** `useLessonBookmarks.setBookmark` já aceitava `color` opcional desde o Bloco 3, com um
  comentário no próprio hook prevendo esse popup ("Bloco 5"). Sem ele, toda frase nascia marcada na cor
  padrão (âmbar), e as outras três só ficavam alcançáveis recolorindo depois no painel de marcadores.
- **Decisão:** clicar em "Marcar frase" sem marcador ainda abre um popup com as 4 cores
  (`BOOKMARK_COLORS`) em vez de marcar direto. Já marcada, o clique continua removendo — trocar de cor
  depois do fato continua sendo papel do painel de marcadores, que já faz isso.
- **Justificativa:** pedido do Felipe — "seria legal se aparecesse marcar frase quando você clicasse, e
  aparecesse um popupzinho com todas as cores diferentes que tem de marcação".

## D-049 — Frase ativa centraliza no espaço visível, não na tela inteira
- **Data:** 2026-08-10
- **Contexto:** com o painel expandido aberto, o auto-scroll (`useNarrationAutoScroll`) continuava
  mirando a frase ativa no centro da TELA INTEIRA — que, com o painel aberto, é ocupado pelos botões de
  velocidade/volume, não por texto legível. O Felipe mandou print mostrando o problema.
- **Decisão:** o hook mede a altura real do painel expandido via `data-rv-expanded-panel` (tag nova em
  `BottomPlayer.tsx`) e centraliza a frase no espaço que sobra ACIMA dele. Sem o painel aberto, o
  comportamento de sempre (centro da tela inteira) continua igual.
- **Justificativa:** pedido do Felipe, sequenciado depois do D-046 de propósito — remover a linha de
  navegar-por-frase encolhe o painel, então a conta da altura ocupada fica mais simples de acertar depois.
- **Impacto:** só afeta o auto-scroll contínuo durante a narração. Os outros `scrollIntoView` do arquivo
  (ir ao marcador, ir ao resultado de busca) não foram tocados — acontecem em momentos onde o painel
  expandido tende a estar fechado.

## D-050 — Título "letreiro": parado 5s, desliza, parado 5s, repete
- **Data:** 2026-08-10
- **Decisão:** título que não cabe no espaço fica parado 5 segundos, desliza uma vez até revelar o fim,
  fica mais 5 segundos parado, volta pro início e repete. Aplicado no título mobile do cabeçalho
  (`ReaderHeader`) e no nome da aula do rodapé fixo (`ImmersiveStrip`). Título que cabe inteiro nunca
  anima — sem efeito à toa em título curto.
- **Justificativa:** pedido do Felipe, pra deixar claro pro aluno no celular que o texto cortado tem mais
  coisa, sem precisar de um toque extra pra descobrir.
- **Impacto:** componente novo e reutilizável, `MarqueeText.tsx`. Só entrou nesses dois lugares — o
  título do cabeçalho desktop (que já não corta, tem mais espaço) não foi tocado.

## D-051 — Grifo e marcador convivem como sistemas separados
- **Data:** 2026-08-11
- **Contexto:** PRD-008 Bloco 5 — popup de seleção de texto. `lesson_bookmarks` (Bloco 3) trava em uma cor
  por frase (`unique (user_id, lesson_id, frag_index)`), e o pedido novo do Felipe é grifar **trechos**,
  com vários por frase.
- **Decisão:** tabela nova, `lesson_highlights`, sem migrar nada de `lesson_bookmarks`. O botão "Marcar
  frase" do painel do player (D-048) continua existindo do jeito que está.
- **Justificativa:** são dois conceitos diferentes na cabeça do aluno — marcador é "guardei esta frase pra
  achar depois", grifo é "destaquei esta parte específica". Forçar os dois na mesma tabela exigiria
  redesenhar a chave única e arriscaria o que já estava aprovado em aparelho.
- **Impacto:** os dois pintam camadas diferentes do DOM (marcador no `<p>`, grifo no `<span>` dentro dele) —
  nenhuma regra de precedência de cor existente mudou. O painel "Marcadores" (ícone do cabeçalho) passou a
  listar as duas coisas, em seções separadas quando ambas existem (ver D-055).

## D-052 — Popup nasce do `selectionchange`, com debounce e janela de supressão
- **Data:** 2026-08-11
- **Contexto:** o popup de ações precisa abrir sobre a seleção **final**, não a provisória. No celular a
  seleção nasce de um long-press e é ajustada arrastando as alças, bem depois do `touchend`.
- **Decisão:** ouvir `selectionchange` (não `mouseup`/`touchend`), com debounce de 400ms que reinicia a
  cada ajuste. Depois de um duplo toque (D-034, pula o áudio), uma janela de supressão de 900ms impede o
  popup de abrir mesmo com a palavra selecionada e estável — e limpa a seleção residual.
- **Justificativa:** o duplo toque do navegador seleciona a palavra como efeito colateral nativo. Sem a
  janela de supressão, todo duplo toque (gesto já aprovado, D-034) abriria o popup de seleção por engano.
  O debounce sozinho não bastava: a palavra fica estável depois do duplo toque, então o timer dispararia
  normalmente.
- **Impacto:** `SUPRESSAO_MS = 900` é a única constante do bloco marcada como candidata a ajuste em
  aparelho lento. A checagem da janela fica no momento de ABRIR (t+400ms), não no agendar — no desktop o
  `selectionchange` chega antes do `dblclick` do React.

## D-053 — Barra de ações fixa acima do player, não flutuante sobre a seleção
- **Data:** 2026-08-12
- **Contexto:** a primeira versão ancorava o popup no retângulo da seleção (`getBoundingClientRect`), como
  o plano original previa. Testado pelo Felipe em aparelho real: a barra nativa do Android
  ("Copiar · Compartilhar · Selecionar tudo") nasce exatamente ali e é desenhada pelo **sistema**, acima de
  qualquer camada da página — nenhum z-index resolve, e não deveria: se resolvesse, qualquer site
  conseguiria esconder o menu do usuário.
- **Decisão:** a barra de ações do grifo virou uma faixa **fixa**, sempre no mesmo lugar, logo acima do
  player (ancorada em `--rv-bottom-inset`, a mesma variável que a barra do rodapé já usa pra se
  autodimensionar).
- **Justificativa:** parar de disputar espaço com o menu nativo do Android é a única solução que não
  depende de truque de CSS. De brinde, a barra fica sempre no alcance do polegar e nunca nasce numa borda
  ruim da tela — os dois eram riscos abertos do plano original (item 3 da checklist de conferência visual).
- **Impacto:** `SelectionPopup.tsx` perdeu o `useLayoutEffect` de medição e o clamp de borda — não precisa
  mais calcular posição. "Rolar fecha o popup" (regra do plano original, pra popup flutuante) deixou de
  fazer sentido e foi removida: a barra fixa não desalinha ao rolar, e fechar só tiraria função de quem
  rola pra reler o contexto. `Escape` continua fechando.

## D-054 — Filete de contorno no grifo, só quando a frase está ativa
- **Data:** 2026-08-12
- **Contexto:** risco visual nº 1 do plano do Bloco 5 (item da lista "o que só o olho do Felipe pega",
  D-039) — grifo âmbar sobre a frase que está tocando, que já tem fundo âmbar (`--rd-hi`).
- **Decisão:** confirmado em print nos 3 temas do leitor: no tema **escuro** (o padrão) o grifo âmbar
  quase desaparece dentro do fundo dourado da frase ativa; no claro e no sépia lê bem. Corrigido com
  `box-shadow: inset 0 0 0 1px <cor do grifo>`, aplicado **só** quando `isActive` é verdadeiro.
- **Justificativa:** aplicar o filete em todo grifo (não só na frase ativa) deixava a marcação com cara de
  caixinha em vez de marca-texto — o contorno só existe pra resolver o conflito de contraste específico.
  `inset` foi escolhido sobre borda de verdade porque não ocupa espaço: borda deslocaria a quebra de linha
  da frase, que é o bug mais provável do bloco (documentado no plano original).
- **Impacto:** `ReadingArea.tsx`, dentro do `SentenceParagraph` — `boxShadow: isActive ? inset... : undefined`
  no `<span data-hl>`.

## D-055 — Painel "Marcadores" também lista os grifos, em seção separada
- **Data:** 2026-08-12
- **Contexto:** achado do Felipe testando em aparelho real: ele grifou trechos e o painel do ícone
  "Marcadores" continuava mostrando só os marcadores de frase (Bloco 3) — nunca tinha sido ligado a
  `lesson_highlights`.
- **Decisão:** o mesmo painel passa a listar as duas coisas. `HighlightsList.tsx`, componente novo com o
  mesmo visual de cartão do `BookmarksPanel` (cor, trocar cor, "Ir ao trecho", lixeira), mas separado
  porque os dados são diferentes — o grifo já grava o `quote` exato do trecho, não precisa olhar o texto
  da frase inteira. Cabeçalho de seção ("Frases marcadas" / "Trechos grifados") só aparece quando os dois
  tipos coexistem; estado vazio combinado quando nenhum dos dois tem conteúdo.
- **Justificativa:** manter D-051 (sistemas separados de dados) sem esconder do aluno onde as duas coisas
  ficam guardadas — um painel só, duas listas.
- **Impacto:** duas asserções do `verify-bloco3.mjs` presumiam que "sem marcador" era sinônimo de "painel
  vazio" — premissa que morreu com os grifos coexistindo. Trocadas para checar ausência do cartão de
  marcador especificamente (aria-label "Remover marcador"), não mais o texto de estado vazio.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[MASTER_PRD]]
- [[CONTEXT]]
- [[PRD-008-leitor-narrado-design]]
- [[PRD-009-trilha-gamificada]]
- [[PRD-006-hub-comunidade]]
- [[PRD-007-curso-narrado-sincronizado]] · [[PRD-007-arquitetura-leitor-narrado]] · [[PRD-007-plano-execucao]]
