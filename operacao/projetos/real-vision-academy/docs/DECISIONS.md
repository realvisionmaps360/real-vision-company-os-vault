---
id: DECISIONS
title: Decisões Arquiteturais — Real Vision Academy
type: decisions
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-08-07
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

## Documentos relacionados
- [[ARCHITECTURE]]
- [[MASTER_PRD]]
- [[CONTEXT]]
- [[PRD-008-leitor-narrado-design]]
- [[PRD-006-hub-comunidade]]
- [[PRD-007-curso-narrado-sincronizado]] · [[PRD-007-arquitetura-leitor-narrado]] · [[PRD-007-plano-execucao]]
