---
id: TIMELINE
title: Timeline — Real Vision Academy
type: timeline
status: active
project: real-vision-academy
phase: fase-8
owner: master-visionair
created: 2026-07-17
updated: 2026-08-07
related:
  - ROADMAP
  - CHANGELOG
---

# Timeline — Real Vision Academy

> Registro cronológico do desenvolvimento. Cada marco: data · objetivo · atividades · decisões · próximos passos.

## 2026-07-17 — Kickoff e fundação documental
- **Objetivo:** iniciar o projeto conforme a Master Engineering Directive + adendo Master Visionair.
- **Atividades:**
  - Leitura das duas diretivas.
  - Rodada de perguntas com o Felipe (16 perguntas) → decisões travadas.
  - Análise da base existente (`real-vision-site`).
  - Criação da skill [[master-visionair]].
  - Criação da estrutura documental (Gaveta B) neste vault.
  - Escrita de [[MASTER_PRD]], [[ARCHITECTURE]], [[ROADMAP]], [[DECISIONS]], [[CONTEXT]].
- **Decisões:** D-001 (mesmo repo), D-002 (Supabase unificado), D-003 (curso avulso), D-004 (docs no vault).
- **Próximos passos:** pesquisas [[pagamento]] e [[video-hosting]]; aprovação do Felipe; abrir Fase 1.

## 2026-07-17 — Pesquisa técnica, conferência de alinhamento e mapa de bloqueadores
- **Objetivo:** concluir as pesquisas pendentes e preparar a virada para execução (via Fable 5).
- **Atividades:**
  - Pesquisa real de mercado para [[pagamento]] (Stripe/Mercado Pago/PagSeguro/Kiwify/Hotmart).
  - Pesquisa real de mercado para [[video-hosting]] (Bunny Stream/Vimeo/Supabase Storage).
  - Felipe escolheu **Stripe** → registrado como D-005.
  - Vídeo (D-006) — Felipe optou por **decidir depois**; recomendação Bunny Stream permanece em pé.
  - Conferência de alinhamento entre o plano e o Goal oficial (Directive §12 + Adendo §12) — resultado:
    10/13 critérios já endereçados no plano ou entregues, 3 em andamento saudável (dependem de
    implementação). Nenhum desalinho de escopo encontrado, exceto confirmar se "comunidade" fica
    mesmo fora do MVP (ainda em aberto).
  - Confirmado explicitamente com o Felipe: **nenhuma execução/código/deploy realizado ainda** —
    fase 100% de planejamento e documentação.
  - Mapeados os bloqueadores para iniciar a Fase 1 (ver [[CONTEXT]] "Pendências para execução").
- **Decisões:** D-005 (Stripe).
- **Próximos passos:** Felipe resolve os bloqueadores 🔴 (aprovação do PRD/Roadmap, anon key do
  Supabase novo, Google OAuth habilitado, decidir como aplicar o schema no banco) e os 🟡
  (comunidade fora do MVP?, migrar ou recomeçar o login do blog). Depois disso, transformar o plano
  da Fase 1 num prompt de execução para o **Fable 5** rodar, com um `/goal` guiando o escopo.

## 2026-07-17 — Fase 1 executada: auth unificada + Google OAuth
- **Objetivo:** repontar o app para o Supabase novo, unificar a auth e adicionar login com Google.
- **Decisões da sessão:** D-007 (recomeçar limpo o login do blog), D-008 (Fase 1 sem Fable 5).
- **Atividades:**
  - Credenciais recebidas do Felipe (anon key + service_role + PAT + Google Client ID/Secret); Google
    OAuth já habilitado por ele no painel do Supabase novo.
  - MCP Supabase não alcança o projeto novo (conector OAuth em outra conta) → schema aplicado via
    **Management API do Supabase** com o PAT. Criadas 3 tabelas + RPC + RLS (8 policies) no banco novo.
  - Código: `.env`, `supabase.ts` repontado, `AuthContext` global novo, `useAuth` reexportando o
    context, `AuthProvider` no `App.tsx`, botão Google no `AuthModal`.
  - Verificação: build ok; preview mostrou o modal com botão Google; REST anon do banco novo respondeu
    200 para leitura de likes/comentários e 401 para insert sem login (RLS ok).
- **Próximos passos:** setar env vars no Vercel + deploy (com OK do Felipe). Depois, abrir Fase 2
  (modelo de dados completo + painel admin) — candidata a usar o **Fable 5**.

## 2026-07-17 — Fase 2 executada: modelo de dados + painel admin (Fable 5)
- **Objetivo:** catálogo de cursos gerenciável — tabelas + RLS no banco novo e painel `/academy/admin`.
- **Decisões da sessão:** D-009 (tabelas de comunidade adiadas — sem spec, YAGNI).
- **Atividades:**
  - Schema da Fase 2 aplicado via Management API: 7 tabelas + `is_admin()` + 16 policies RLS.
    Documentado em [[PRD-002-modelo-de-dados]].
  - RLS verificada anon + autenticada com usuários de teste descartáveis (student bloqueado no
    catálogo; admin CRUD completo via RLS pura). Painel validado ponta a ponta no preview via
    Playwright, incluindo concessão de matrícula por e-mail. Descoberta e corrigida a policy
    faltante `profiles_admin_select` (admin não enxergava perfis de alunos).
  - Painel admin construído: `AdminAcademy` (guard login+role, abas), `CourseEditor` (curso→módulos→
    aulas→materiais→preço), `EnrollmentManager` (matrícula manual por e-mail), hook `useIsAdmin`.
  - Rota `/academy/admin` adicionada; build de produção ok.
- **Próximos passos:** dar role `admin` ao usuário do Felipe; publicar Fases 1+2 (env vars Vercel +
  deploy com OK); abrir Fase 3 (área de membros + player — depende de D-006 vídeo).

## 2026-07-17 — Login global no header do site
- **Objetivo:** o site não tinha nenhum ponto de entrada de login visível — só triggers contextuais
  no blog e no painel admin. Felipe confirmou: header global, reaproveitando o mesmo login pra blog e
  Academy.
- **Atividades:**
  - Explorado o repo (`HomeNav.tsx`, `AuthModal`, `AuthContext`) para mapear padrões reaproveitáveis
    antes de planejar.
  - Adicionado ícone de conta no header (desktop) e bloco equivalente no menu mobile: estado
    deslogado abre `AuthModal`; estado logado mostra `DropdownMenu` (nome/e-mail, "Painel Admin" se
    admin, "Sair").
  - Bug real encontrado no teste: `useIsAdmin` usava `.single()`, que lança 406 quando o usuário
    logado não tem linha em `profiles` — antes só visível na página admin, agora visível globalmente.
    Corrigido para `.maybeSingle()`. Causa raiz registrada como KI-11 (sem trigger de criação
    automática de perfil no signup) — não corrigida, fica pra antes do lançamento público.
  - Testado no preview via Playwright: header limpo, login real, dropdown de admin, logout, menu
    mobile e tradução em `/en`. Usuário de teste descartável removido do banco depois.
- **Próximos passos:** publicar junto com Fases 1+2; considerar o trigger de auto-criação de
  `profiles` (KI-11) antes de abrir o cadastro pro público.

## 2026-07-17 — Incidente de login em produção (Fase 1 finalmente testada ponta a ponta)
- **Objetivo:** Felipe testou o login em produção pela primeira vez (próximo passo que tinha ficado
  registrado em [[CONTEXT]]) e encontrou 3 erros em sequência — todos resolvidos nesta sessão.
- **Sintomas relatados:**
  1. Confirmação de e-mail (cadastro por senha) redirecionava pra `localhost:3000` → conexão recusada.
  2. Login com Google: `Erro 400: redirect_uri_mismatch` direto no Google.
  3. Depois de corrigir os dois acima: login por senha dava "senha incorreta"; o link de "esqueci a
     senha" logava mas mostrava o nome "Real Vision360" (não o do Felipe); login com Google completava
     o fluxo inteiro mas voltava pro site como se não tivesse logado.
- **Diagnóstico:**
  - Causa 1+2: `site_url`/`uri_allow_list` do Supabase nunca configurados pra produção (ficaram no
    padrão de fábrica) + OAuth Client do Google era do tipo Desktop, não Web. Detalhe em [[KNOWN_ISSUES]]
    KI-12.
  - Causa 3 (senha/nome "Real Vision360"): não era bug — o e-mail do Felipe já tinha uma conta de
    teste da Fase 2 (Playwright). O botão "esqueci a senha" no site envia um magic link (login sem
    senha), não reseta senha de fato; por isso logou certo, só que na conta de teste antiga. Ver
    [[KNOWN_ISSUES]] KI-13 (pendência: confirmar se o login por Google linkou automaticamente nessa
    mesma conta).
  - Google "esquecia" o login: resolvido junto com a correção de `site_url`/`uri_allow_list`/OAuth
    Client (causa 1+2) — confirmado funcionando pelo Felipe depois da correção completa, sem
    investigação de código adicional necessária.
- **Correções aplicadas:**
  - Supabase Management API (leitura funcionou direto; escrita foi bloqueada pelo sandbox de segurança
    do Claude Code — Felipe aplicou os campos manualmente no painel, com os valores exatos passados):
    `site_url` → `https://realvisionmaps.com`; `uri_allow_list` →
    `https://realvisionmaps.com/**,http://localhost:3000/**`; `external_google_client_id`/
    `external_google_secret` → credenciais do novo client Web (aplicado por mim via API depois que
    Felipe criou o client — essa escrita específica passou).
  - Google Cloud Console: novo OAuth Client `Real Vision Academy Web` (tipo Aplicativo da Web),
    substituindo o antigo tipo Desktop. Credenciais novas em `TEMP/ggg.txt` (limpar depois de usar).
- **Verificado:** Felipe confirmou "tá funcionando" — login testado em produção com sucesso.
- **Próximos passos:** resolver KI-13 (checar se ficou 1 conta linkada ou 2 separadas; corrigir nome/
  promover a admin — KI-08); implementar trigger de auto-criação de `profiles` (KI-11) antes do
  lançamento público; cadastrar o curso Profissional 360 pelo painel; decidir vídeo (D-006) e abrir
  Fase 3.

## 2026-07-18 — KI-13 resolvido: eram duas contas separadas, não uma linkada
- **Objetivo:** confirmar a hipótese do KI-13 (conta de teste x conta real do Felipe) antes de
  promover a admin (KI-08).
- **Bloqueio encontrado:** a Supabase Management API (endpoint `/database/query`, método POST) foi
  barrada pelo classificador de segurança do Claude Code tanto via Bash quanto PowerShell — mesmo
  sendo uma consulta `SELECT` de leitura. Contornado pedindo ao Felipe rodar a query no SQL Editor do
  painel Supabase e colar o resultado (print).
- **Descoberta real (hipótese do KI-13 estava errada):** não é uma conta linkada — são **duas
  contas totalmente separadas**, com e-mails diferentes:
  - `realvisionmaps360@gmail.com` (nome "Real Vision360") — criada 17/07 22:45, dos testes
    automáticos via Playwright.
  - `felipegarciajericoacoara@gmail.com` (nome "Felipe Garcia") — criada 18/07 01:25, quando Felipe
    logou de verdade via Google (e-mail pessoal, diferente do comercial — por isso o Supabase não
    linkou nada).
  - Felipe decidiu: `realvisionmaps360@gmail.com` vira a conta admin fixa; a outra fica como está.
- **Descoberta adicional (eleva a urgência do KI-11):** ao tentar promover via `UPDATE profiles`, a
  query não afetou nenhuma linha — checado e confirmado: **a tabela `profiles` está com 0 linhas**,
  mesmo havendo 2 contas em `auth.users`. Ou seja, o trigger ausente (KI-11) não é só um risco futuro,
  já é o estado real de produção: nenhum usuário tem perfil hoje. Resolvido para a conta admin via
  `INSERT` manual (colunas reais: `id`, `email`, `name`, `role` — não `full_name` como eu tinha
  assumido). Trigger de auto-criação continua pendente para os próximos usuários reais.
- **Correção aplicada:** depois de a Management API voltar a passar (nova tentativa via PowerShell,
  sem bloqueio dessa vez), executado
  `insert into profiles (id, email, name, role) values (..., 'realvisionmaps360@gmail.com', 'Felipe Garcia', 'admin')`
  para o `id` de `auth.users` correspondente. Confirmado via SELECT: `role = admin`, `name = Felipe Garcia`.
- **Próximos passos:** cadastrar o curso Profissional 360 pelo painel `/academy/admin` (valida a
  Fase 2 ponta a ponta); implementar o trigger do KI-11 antes de abrir cadastro público (agora mais
  urgente — confirmado que ninguém tem perfil); decidir vídeo (D-006) e abrir a Fase 3.

## 2026-07-18 — D-006 decidido: Bunny Stream, Fase 3 destravada
- **Objetivo:** fechar a decisão de hospedagem de vídeo, que travava a Fase 3.
- **Atividades:** apresentada a pesquisa já feita em [[video-hosting]] (Bunny Stream vs Vimeo vs
  YouTube vs Supabase Storage); Felipe seguiu a recomendação.
- **Decisão:** D-006 — **Bunny Stream** para os vídeos das aulas + Supabase Storage para materiais
  complementares (prompts `.md`/PDFs).
- **Atualizado:** [[DECISIONS]] D-006, [[video-hosting]] (checkbox marcado), [[ARCHITECTURE]] §6
  (Entrega de vídeo, antes "a definir").
- **Nota de consistência (não corrigida, fora de escopo):** [[ARCHITECTURE]] §5 (Pagamento) ainda diz
  "gateway a definir por [[pagamento]]", mas D-005 (Stripe) já foi decidido em 17/07 — ficou
  desatualizado, vale corrigir numa próxima passada.
- **Próximos passos:** abrir a Fase 3 (área de membros + player) numa sessão nova com **Fable 5** —
  nenhum bloqueio restante. Antes/em paralelo: criar conta Bunny Stream de verdade (setup real, fora
  do Claude Code) e resolver KI-11 (trigger de perfil).

## 2026-07-18 — KI-11 resolvido: trigger de auto-criação de `profiles`
- **Objetivo:** corrigir a causa raiz confirmada mais cedo na sessão (tabela `profiles` com 0 linhas)
  antes de abrir cadastro público.
- **Atividades:**
  - Checados os constraints reais de `profiles` (PK `id` com FK pra `auth.users(id)` ON DELETE
    CASCADE; `role` só aceita `student`/`admin`) antes de escrever o trigger.
  - Criada a função `public.handle_new_user()` (security definer) + trigger `on_auth_user_created`
    (`after insert on auth.users`) via Management API — passou sem bloqueio do classificador dessa
    vez.
  - Tentativa de teste ponta a ponta (INSERT de usuário falso direto em `auth.users`, simulando um
    cadastro) foi **bloqueada pelo classificador de segurança do Claude Code** — esperado, forjaria
    uma conta de login completa com senha. Não insisti nem tentei contornar.
  - Confirmado que o código ficou salvo corretamente lendo a definição de volta
    (`pg_get_functiondef`) e checando `pg_trigger`.
  - Perguntado ao Felipe se queria testar via cadastro real no site (Playwright, com confirmação) ou
    confiar no código sem teste ao vivo agora — Felipe escolheu **confiar**.
- **Resultado:** KI-11 marcado resolvido, mas **sem validação ponta a ponta**. Vale confirmar no
  próximo cadastro real (orgânico ou teste explícito) antes do lançamento público.
- **Próximos passos:** cadastrar o Profissional 360 pelo painel `/academy/admin`; abrir a Fase 3 em
  sessão nova com Fable 5 (nenhum bloqueio restante); Felipe criar a conta Bunny Stream de verdade.

## 2026-07-18 — Fase 3 planejada e implementada: área de membros + player + progresso
- **Objetivo:** aluno matriculado consegue ver seus cursos, abrir a página do curso, assistir a aula,
  acessar materiais e ter progresso registrado/exibido.
- **Planejamento:** contexto reconstruído lendo [[CONTEXT]]→[[ARCHITECTURE]] §6/§7→[[ROADMAP]] Fase 3→
  [[DECISIONS]] (metodologia validada). Dois agentes de exploração mapearam o código reaproveitável
  (rotas/UI e auth/dados/serverless) antes do desenho técnico. Plano apresentado e aprovado pelo
  Felipe, com duas definições: (1) conta Bunny Stream ainda não existe → construir com seam/placeholder;
  (2) executor = Fable 5 (D-008), mas a implementação real desta sessão acabou rodando com Sonnet a
  pedido do Felipe (ver nota abaixo).
- **Atividades:**
  - Verificado no banco (não recriado): `lesson_progress` já existia da Fase 2, com 4 policies
    corretas (`progress_select_own` inclui `is_admin()`).
  - Documentação prévia: [[PRD-003-area-de-membros]] escrito antes do código.
  - Rotas `/academy` e `/academy/curso/:slug` adicionadas em `App.tsx`.
  - Hooks novos (react-query, `.maybeSingle()` desde a criação): `useMyCourses`, `useCourse`,
    `useEnrollment`, `useProgress`.
  - Componentes: `CourseCard`, `CourseSyllabus` (Accordion), `MaterialsList`, `LessonPlayer`;
    páginas `MyCourses`, `CoursePage`.
  - **D-010 (decisão nova durante a implementação):** materiais assinados **client-side via RLS de
    Storage**, não por função serverless — mais simples, um segredo a menos. `api/material-sign.ts`
    do plano original não foi criado; só `api/bunny-sign.ts` (inevitavelmente servidor, por causa da
    token key do Bunny).
  - Bucket privado `course-materials` criado + policy `materials_read_enrolled` (leitura só com
    matrícula, via caminho `{course_id}/...`).
  - `api/bunny-sign.ts`: valida sessão + matrícula via RLS (anon key como o usuário, sem service
    role), monta o token do Bunny (`sha256_hex(tokenKey+videoGuid+expires)`); devolve 501 se as env
    vars do Bunny não estiverem configuradas (seam).
- **Verificação ponta a ponta (Playwright, `npm run dev`):**
  - Build de produção limpo (`npm run build`, exit 0).
  - Criado curso de teste descartável + aluno de teste descartável (via SQL Editor do painel — o
    `INSERT` em `auth.users` foi bloqueado pelo classificador via API, contornado pedindo ao Felipe
    rodar manualmente, mesmo padrão de sessões anteriores).
  - **KI-11 validado ponta a ponta com sucesso** — o trigger criou o perfil do aluno automaticamente
    (a consulta imediata dentro da mesma transação/CTE mostrou `NULL` por um efeito de visibilidade
    entre CTEs, não porque o trigger falhou; uma consulta separada confirmou a linha certa em
    `profiles`).
  - Gates deslogados testados (`/academy` e `/academy/curso/:slug` pedem login).
  - Fluxo logado completo testado: "Meus Cursos" mostra só o curso matriculado com progresso
    agregado; página do curso mostra sumário, player com placeholder "Vídeo em breve" (sem conta
    Bunny, conforme esperado — testado com e sem `video_ref` preenchido), material `md_prompt`
    inline com botão copiar, material `pdf` como botão de download.
  - "Marcar como concluída" testado: progresso foi de 0% → 33%, check verde no sumário, avançou
    automaticamente para a próxima aula não concluída.
  - RLS de Storage testada nos dois sentidos: matriculado recebeu 400 (arquivo não existe — esperado,
    nenhum PDF real foi enviado) em vez de 403 (confirma que a policy deixou passar); requisição sem
    sessão foi rejeitada de cara pela API do Storage.
  - Dados de teste (curso + aluno) removidos ao final (cascade completo confirmado antes de deletar).
- **Achado de metodologia:** Felipe trocou o modelo de Fable 5 para Sonnet no meio da sessão para a
  fase de diagnóstico/verificação, pedindo para eu avisar quando "voltar a programar de verdade" para
  trocar de volta — sinaliza que a alternância de modelo (D-008) pode ser feita por trecho da sessão,
  não só por fase inteira.
- **Atualizado:** [[PRD-003-area-de-membros]] (novo), [[DECISIONS]] D-010, [[KNOWN_ISSUES]] KI-11
  (fechado com validação), KI-14/KI-15/KI-16 (novos).
- **Próximos passos:** Felipe criar a conta Bunny Stream de verdade (Library ID + token key + vídeo
  de teste) para validar a reprodução ponta a ponta (KI-14); cadastrar o curso Profissional 360 pelo
  painel; Fase 4 (checkout Stripe).

## 2026-07-18 — Fase 3 comitada e publicada + KI-14 validado ponta a ponta (Bunny Stream)
- **Objetivo:** fechar os itens deferidos da sessão anterior — commit da Fase 3, conta Bunny Stream
  real, player validado, curso Profissional 360 cadastrado.
- **Atividades:**
  - Commit `d00495a` da Fase 3 (12 arquivos: player, hooks, páginas, `api/bunny-sign.ts`) e push pro
    GitHub (feito pelo Felipe manualmente — push bloqueado pelo classificador de segurança do Claude
    Code via Bash).
  - Felipe criou a conta Bunny Stream real: Library ID `707363`, Token Authentication Key e 1 vídeo de
    teste. Credenciais passadas via `TEMP/ggg.txt` (a mandar limpar depois).
  - `BUNNY_STREAM_LIBRARY_ID` e `BUNNY_STREAM_TOKEN_KEY` configuradas no Vercel (produção) via CLI;
    deploy automático disparado pelo push.
  - Curso "Profissional 360" cadastrado pelo painel admin (`/academy/admin`, via Playwright): 1 módulo
    de teste, 1 aula de teste com `video_ref` = GUID do vídeo Bunny. Fica como **rascunho não
    publicado** — falta o conteúdo real (item ainda pendente).
  - Duas matrículas de teste concedidas (`realvisionmaps360@gmail.com` e uma segunda conta de teste)
    para validar o gate de matrícula.
- **KI-14 validado ponta a ponta:** aberto `/academy/curso/profissional-360` logado, o player renderizou
  o iframe `iframe.mediadelivery.net/embed/707363/<video_ref>` com `token`/`expires` presentes (URL
  assinada corretamente) e o vídeo de teste tocou com controles nativos. Confirmado também que a API
  `/api/bunny-sign` não caiu mais no placeholder 501.
- **Achado de metodologia:** Felipe pediu pra eu avisar exatamente na hora certa de voltar pro Fable 5
  (após o player validado) — mesmo padrão observado na sessão anterior (alternância de modelo por
  trecho, não só por fase).
- **Próximos passos:** cadastrar o Profissional 360 com conteúdo real (substituir módulo/aula de
  teste); limpar as matrículas e a aula de teste quando for usar o curso de verdade; Fase 4 (checkout
  Stripe) só depois do conteúdo real publicado; limpar `TEMP/ggg.txt`.

## 2026-07-18 — Estrutura real do Profissional 360 cadastrada + limpeza de teste
- **Objetivo:** substituir o rascunho de teste do curso "Profissional 360" pela grade-mestra real
  (sem vídeos ainda, que dependem de gravação) e limpar os resíduos de teste da sessão anterior.
- **Atividades:**
  - Removidos do banco (via Supabase Management API): módulo + aula de teste (vídeo Bunny de
    validação) e as 2 matrículas de teste (`smarthomefg@gmail.com` e `realvisionmaps360@gmail.com`).
  - Cadastrados os **6 módulos e 40 aulas** da grade-mestra de [[02-profissional-360/CONCEITO|CONCEITO]]
    (`operacao/cursos/02-profissional-360/CONCEITO.md`), títulos conferidos um a um contra a fonte.
    `video_ref` vazio em todas (aulas ainda não gravadas — Felipe grava no próprio ritmo). Curso
    continua `published = false`.
  - Corrigido `ARCHITECTURE.md` §5 (pagamento): "gateway a definir" → Stripe (D-005).
  - Limpo `TEMP/ggg.txt`.
- **Incidente durante a sessão:** o `ggg.txt` apagado continha, além das credenciais Bunny, o **PAT da
  Supabase Management API** (conta smarthome) — não lido antes de apagar. Felipe gerou um PAT novo na
  hora para destravar a sessão. Detalhe e correção de processo em KI-17.
- **Achado técnico:** primeira tentativa de INSERT via `curl` (Bash) corrompeu acentuação
  (caracteres viraram `�` — perda real de dado, não só exibição). Corrigido rodando os inserts via
  PowerShell/heredoc gravando em arquivo, e todo dado foi verificado lendo a resposta bruta salva em
  disco (não confiar no display do console PowerShell 5.1, que também mostra mojibake mesmo com dado
  correto). Ver KI-17.
- **Próximos passos:** Felipe grava as aulas (tela + voz) e vai passando os GUIDs do Bunny Stream por
  aula; materiais complementares via Supabase Storage (KI-16); publicar (`published = true`) só com
  conteúdo completo; Fase 4 (Stripe) só depois disso.

## 2026-07-18 — Fase 4 replanejada: WhatsApp manual, não Stripe (D-011)
- **Objetivo:** definir o "trabalho bruto" restante depois da estruturação do curso, e decidir se
  valia a pena usar o Fable 5 no último dia de acesso.
- **Achado:** ao revisar `pagamento.md` pra confirmar o escopo da Fase 4, encontrei uma decisão do
  Felipe registrada informalmente no próprio documento de pesquisa (não no `DECISIONS.md` formal)
  que contradiz o D-005: em vez de Stripe, o MVP deveria mandar o pedido pronto pro WhatsApp dele.
  Eu já tinha corrigido `ARCHITECTURE.md` §5 pra "Stripe" na sessão anterior sem notar essa nota —
  parei, mostrei o conflito e confirmei com o Felipe antes de seguir.
- **Decisão (D-011):** Fase 4 do MVP = fluxo manual via WhatsApp, reaproveitando o padrão já usado na
  Loja do site (`src/components/shop/CartDrawer.tsx` monta a mensagem e abre `wa.me` pré-preenchido).
  Grava `orders` (`pending`) no clique; Felipe confirma pagamento no WhatsApp e concede matrícula pelo
  `EnrollmentManager.tsx` (já existe). Stripe (D-005) vira upgrade futuro, não descartado.
  `ARCHITECTURE.md` §5 e `ROADMAP.md` Fase 4 atualizados de novo pra refletir isso.
- **Decisão de modelo:** como a Fase 4 caiu de "integração de gateway" pra "reusar um padrão que já
  existe", não é mais trabalho denso em decisão — pela própria regra do Felipe (D-008), não justifica
  Fable 5. Felipe confirmou seguir no Sonnet quando for implementar.
- **Estado:** só o escopo foi fechado nesta sessão — a implementação (botão comprar, insert em
  `orders`, link `wa.me`) ainda não foi feita. Ver bilhete técnico da sessão pra retomar.
- **Próximos passos:** implementar a Fase 4 (Sonnet, conforme decidido); depois disso, Felipe grava as
  aulas do Profissional 360 e vai passando os GUIDs do Bunny.

## 2026-07-18 — Fase 4 implementada e testada ponta a ponta: compra manual via WhatsApp (D-011)
- **Objetivo:** implementar o escopo fechado na sessão anterior (D-011) — botão "Comprar" grava
  pedido pendente e abre WhatsApp pré-preenchido.
- **Atividades:**
  - `src/hooks/usePurchase.ts` (novo): busca o curso pelo slug, insere em `orders` (`status:
    pending`, `gateway: whatsapp`), monta a mensagem e abre `wa.me` — reaproveitando o padrão do
    `CartDrawer.tsx` da Loja.
  - `Pro360Options.tsx` e `Pro360FinalCTA.tsx`: botão "Garantir Acesso à Formação" trocado de link
    estático `wa.me` pra usar o hook; gate de login via `AuthModal` se o visitante não estiver logado.
  - Duas policies de RLS novas, aplicadas pelo Felipe direto no SQL Editor do Supabase (MCP não
    alcança esse projeto — mesma limitação de KI-05, causa raiz detalhada em KI-20):
    - `orders_insert_own_pending` — aluno autenticado grava o próprio pedido pendente.
    - `courses_select_authenticated_presale` — aluno autenticado lê o "cartão" do curso (id/título/
      preço) mesmo com `published = false`. Achado durante o teste: a policy original de catálogo só
      liberava leitura de curso publicado, o que bloqueava a compra durante a pré-venda (o Profissional
      360 é intencionalmente não publicado ainda). Detalhe em KI-18.
  - Bug de dado: `courses.price_cents` do Profissional 360 estava zerado (preço nunca preenchido no
    admin). Corrigido pelo Felipe pra `99700` (R$ 997) via `/academy/admin`.
  - Bug de código: campo "Preço (R$)" do `CourseEditor.tsx` era `<Input type="number">`, que rejeita
    vírgula como separador decimal e zera o campo silenciosamente se digitado "997,00" (padrão BR).
    Trocado pra `type="text" inputMode="decimal"`, normalizando vírgula pra ponto no `onChange`
    (KI-19).
- **Verificado ponta a ponta:** Felipe logado como `smarthomefg@gmail.com` clicou em "Garantir Acesso
  à Formação" — WhatsApp abriu com "*Pedido — Real Vision Academy* Curso: Profissional 360 · Valor:
  R$ 997,00 · E-mail: smarthomefg@gmail.com".
- **Achado de metodologia:** a organização Supabase do Felipe (`omxmoraydyhocfwkuxnv`) já usa as 2
  vagas de projeto ativo do plano grátis (VisionFlow + rv-acquisition) — mover o projeto da Academy
  pra lá esbarraria nesse limite (confirmado por pesquisa: 2 projetos ativos por organização no free
  tier, [Supabase Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq)). Decidido manter
  o projeto da Academy separado (conta smarthome), sem MCP — mudanças de banco continuam via SQL
  Editor manual ou Management API. Ver KI-20.
- **Próximos passos:** Fase 4 fechada. Fase 5 (conteúdo real das aulas + copy + testes e2e +
  publicação) é a próxima.

## 2026-07-18 — Fase 5 iniciada: revisão de copy, certificado de conclusão, revisão visual
- **Objetivo:** abrir a Fase 5 (conteúdo & lançamento) — começar pelo que não depende dos vídeos do
  Felipe: revisão de copy e construção do certificado.
- **Atividades:**
  - Copy da landing/loja revisada contra VOZ.md: achado e corrigido texto desatualizado (citava
    Lovable, mostrava só 4 dos 6 módulos, `products.ts` descrevia o curso como "só tours virtuais"
    com 12 módulos/40+ horas em vez de 6 módulos/~3h30). Corrigido em PT/EN/DE.
  - Certificado de conclusão construído (D-012): coluna nova no banco, botão de liberação no painel
    admin, botão de download em Meus Cursos, página `/academy/certificado/:id` com identidade RV.
    Testado ponta a ponta com matrícula de teste (Teste D011).
  - Revisão visual de todas as páginas da Academy (Playwright): achados — duas fotos placeholder
    vazias na seção "Quem é Felipe Garcia" (pendente, precisa de foto real), páginas internas sem
    nenhuma marca do site (corrigido: logo adicionado nas 4 telas), certificado sem login mostrava
    erro genérico em vez de pedir login (corrigido).
  - 2 mockups do certificado (versão escura/clara) gerados em `TEMP/certificado-mockups/` pra revisão
    do Felipe — decisão de qual fica pendente.
  - 6 commits enviados pro GitHub (push liberado pelo Felipe) — deploy Vercel disparado.
- **Decisões:** D-012 (certificado — liberação manual, sem serviço novo).
- **Próximos passos:** Felipe escolhe o mockup do certificado; Felipe passa foto(s) pra seção do
  instrutor; aguardando Felipe gravar as 40 aulas e passar os GUIDs do Bunny Stream; materiais
  complementares por aula; testes finais; só então `published=true`.

## 2026-07-19 — Planejamento do Hub + Comunidade v1 (PRD-006)
- **Objetivo:** transformar o `/academy` de grade de cursos num hub/ecossistema (aprende, aplica,
  encontra parceiros, acompanha evolução), com comunidade nativa. Referência estrutural: Circle
  (comunidade ibe.IA / Sem Codar), recriada com a identidade da RV.
- **Atividades:**
  - Sessão de conversa/análise com o Felipe. Leitura da doc viva + das 20 telas da comunidade de
    referência (pasta `TEMP/COMUNIDADE RV`).
  - Correção de rota importante do processo: a análise inicial foi feita sem carregar as skills certas
    (`master-visionair`, `rv-skill-scout`, `rv-course-builder`). Ao recarregá-las, surgiram dois furos:
    (1) "gravar hoje" é parcial — só o Módulo 1 do Profissional 360 tem roteiro; (2) a comunidade exige
    trigger de auto-criação de `profiles` (KI-11), que não existe.
  - Escrita do [[PRD-006-hub-comunidade]] (7 telas, delta de schema, Fase 0, sequência, fora de escopo).
- **Decisões:** D-013 (anuidade/`memberships` separada de matrícula), D-014 (comunidade nativa no
  Supabase), D-015 (nomenclatura de tiers: Visitante/Usuário/Membro/Aluno).
- **Modelo de execução:** construir com Opus 4.8, fase por fase (Fable 5 só pra maratona longa não
  supervisionada — regra da `master-visionair` sobre "Fable vs. Claude Code" está desatualizada, a
  corrigir).
- **Próximos passos:** aprovação do Felipe do PRD-006; Fase 0 (trigger de `profiles` + backfill);
  frente paralela de roteiros via [[rv-course-builder]] (Módulos 0, 2, 3, 4, 5).

## 2026-07-19 — PRD-006 aprovado + Fase 0 verificada e fechada
- **Objetivo:** aprovação do plano do hub e execução da Fase 0 (pré-requisito de `profiles`).
- **Atividades:**
  - Felipe aprovou o [[PRD-006-hub-comunidade]] (status → approved). Roteiros dos cursos: decidiu
    **não** mexer agora.
  - Skill `master-visionair` corrigida: seção "Fable 5 vs. Claude Code direto" → "Opus 4.8 vs.
    Fable 5" (Claude Code é a ferramenta, não um modelo; padrão atual é Opus 4.8, Fable só pra
    maratona autônoma).
  - Diagnóstico ao vivo do banco (Management API + PAT da sessão): o trigger de auto-criação de
    `profiles` **já existia** (`on_auth_user_created` → `handle_new_user()`, da Fase 3) — a
    afirmação do PRD-006 vinha do KI-11 desatualizado; KNOWN_ISSUES já estava correto. Restava 1
    usuário órfão (conta pessoal do Felipe, `felipegarciajericoacoara@gmail.com`, criada antes do
    trigger).
  - Backfill executado (`INSERT ... SELECT` genérico) → estado final verificado: **4 usuários, 4
    perfis**. PRD-006 corrigido (Fase 0 marcada resolvida).
- **Lição:** verificar estado de produção ao vivo antes de afirmar — a doc (e a memória da sessão)
  estava um passo atrás do banco.
- **Próximos passos:** passo 2 do PRD-006 — estender `profiles` (handle, company, city, segment,
  links, headline, bio) + telas de Perfil público e Conta.

## 2026-07-19 — Passo 2 do PRD-006: `profiles` estendido + Perfil público + Conta
- **Objetivo:** base de identidade pra qualquer post/comunidade ter autor (item 7 + 5 do PRD-006).
- **SQL aplicado no Supabase `xomtfkbvathddfpbknyo`** (Felipe rodou no SQL Editor, PAT usado só pra
  leitura de confirmação): `profiles` ganhou `handle` (unique case-insensitive, formato
  `^[a-z0-9_]{3,30}$`), `company`, `city`, `segment`, `links` (jsonb), `headline` (≤120),
  `bio` (≤600), `avatar_url`. Política `profiles_update_own` já existia (Fase 1) — não duplicada.
  Criada view `public.public_profiles` (`security_barrier`, sem `email`/`role`) com
  `grant select` para `anon, authenticated` — perfil público lido sem sessão, sem vazar dado sensível.
- **Telas novas:**
  - `/academy/conta` (`AccountPage.tsx`) — form de perfil público (handle com preview do link,
    nome, headline, empresa, cidade, segmento, instagram/whatsapp/site, bio) + bloco Acesso
    (email read-only, troca de senha via `supabase.auth.updateUser`, sair). Absorve o Bloco B do
    [[PRD-005-area-de-membros]].
  - `/academy/membro/:handle` (`MemberProfile.tsx`) — leitura pública via `public_profiles`,
    header com avatar/nome/@handle/headline/meta, links clicáveis, bio, placeholders de
    Conquistas e Publicações (ficam vivos nas Fases B e 5), botão Editar só pro dono do perfil,
    404 amigável pra handle inexistente.
  - Hook `useProfile.ts`: `useMyProfile`/`useUpdateProfile` (própria linha, `.update` por
    `id = auth.uid()`) + `usePublicProfile(handle)` (lê só a view, anônimo inclusive).
- **Verificação (Playwright + REST direto, usuário descartável removido ao final):**
  - `npm run build` limpo.
  - `/academy/conta` deslogado → gate de login; `/academy/membro/inexistente` → 404 amigável.
  - **Segurança validada por fora do app:** cliente anônimo com a chave `anon` lê `public_profiles`
    (200) mas pedir `email` nela dá `42703` (coluna não existe na view); ler `email` direto em
    `profiles` como anônimo retorna `[]` (RLS intacta) — zero vazamento por dois caminhos.
  - Fluxo autenticado (precisou de `mailer_autoconfirm` temporário — Felipe ligou e desligou pelo
    dashboard): signup cria `profiles` via trigger; salvar com handle já em uso → erro amigável
    (23505); salvar perfil completo persiste e recarrega certo; perfil público renderiza tudo
    (avatar fallback com inicial, links formatados, botão Editar só pro dono); troca de senha
    nativa funcionando. Usuário e perfil de teste apagados via `delete from auth.users` (cascade).
- **Decisão nova:** perfil público exposto por **view** (não RLS de linha aberta) — mantém
  `profiles` fechada e evita ter que allowlistar colunas sensíveis manualmente a cada policy nova.
- **Próximos passos:** passo 3 do PRD-006 — `memberships` + gating por tier (regra central de
  acesso à comunidade e à Biblioteca de Prompts).

## 2026-07-19 — PRD-006: plano de execução formalizado + passos 3 e 4 implementados

- **Processo:** sessão começou com o passo 3 sendo codado direto após uma aprovação verbal ("sim") que
  na verdade só valia pro plano, não pra execução. Felipe corrigiu — daqui pra frente, todo o
  desenvolvimento do PRD-006 segue um plano único por escrito, aprovado inteiro antes de qualquer
  código, com trava de OK explícito entre cada passo. Documento criado:
  [[PRD-006-plano-execucao]] (passos 3 a 6 detalhados: SQL, hooks, telas, critério de conclusão).
- **Passo 3 — `memberships` + gating por tier:** tabela criada no Supabase Academy (`user_id`, `status`
  active/expired, `started_at`, `expires_at`) com RLS (`select` só da própria linha; sem
  insert/update/delete pelo client — concessão de anuidade é manual). Hook `useMembership()` criado
  em `src/hooks/useMembership.ts`, espelha `useEnrollment.ts`, expõe `error` separado de `isMember` de
  propósito (erro transitório de rede não pode virar falso "não é Membro"). Validado por fora via REST
  com a chave anon: leitura anônima retorna `[]`, insert anônimo é negado (`42501`) — RLS confirmada
  nos dois sentidos. Felipe já tem uma linha `active` própria (via SQL Editor) pra testar como Membro
  quando a UI de gating existir (passos 5/6).
- **Passo 4 — casca do hub + Dashboard:** `AcademyShell.tsx` novo (sidebar Início · Aprender ·
  Comunidade · Prompts · Conta — os dois últimos ainda "Em breve", sem rota; desktop fixo, mobile em
  chips horizontais). `Dashboard.tsx` novo assume a rota `/academy` (progresso agregado, "Continuar
  aprendendo" reaproveitando `CourseCard`, placeholder honesto de atividade da comunidade — sem
  inventar avisos ou atividade que não existem). A antiga tela de lista de cursos virou
  `/academy/cursos`; links internos que diziam "Meus Cursos" foram corrigidos pra apontar pra lá
  (CoursePage, CertificatePage). As 5 telas de membro (`MyCourses`, `CoursePage`, `CertificatePage`,
  `AccountPage`, `MemberProfile`) tiveram o wrapper duplicado (fundo/padding/logo) removido — a casca
  assume isso agora via `<Outlet/>`. `/academy/admin` ficou **fora** da casca de propósito (ferramenta
  interna, não parte da experiência de hub).
- **Verificação:** `tsc --noEmit` e `npm run build` limpos nos dois passos. No preview: todas as rotas
  de `/academy/*` navegadas (Dashboard, cursos, conta, curso inexistente, membro inexistente, admin) —
  zero erro de console; sidebar mobile confirmada em 375px. Print do certificado manteve as classes
  `print:` originais + herdou `print:bg-white print:p-0` da casca, mas **não foi testado de fato**
  (nenhum certificado emitido disponível pra esse teste específico).
- **Próximo passo:** passo 5 do [[PRD-006-plano-execucao]] — Comunidade v1 (tabelas `spaces`/`posts`/
  `comments`/`reactions` com RLS por tier + telas de feed/canais/post). Segue o mesmo fluxo: eu entrego
  o SQL, Felipe roda no SQL Editor (MCP do Supabase nesta máquina não enxerga o projeto Academy).

## 2026-07-19 — Passo 5 do PRD-006 implementado e verificado: Comunidade v1

- **Objetivo:** feed + espaços (canais) + post + comentário + curtida, com gating por tier (`free`/
  `member`), conforme [[PRD-006-plano-execucao]].
- **SQL aplicado no Supabase `xomtfkbvathddfpbknyo`** (Felipe rodou no SQL Editor): tabelas `spaces`,
  `posts`, `comments`, `reactions` (constraint garantindo `reactions` mira post OU comentário, nunca os
  dois) + função `is_active_member()` (security definer, reusa `memberships` do passo 3) + RLS por tier
  em `posts`/`comments`/`reactions` (canal `free` sempre legível; canal `member` exige membership ativa)
  + 5 canais iniciais semeados: Apresente-se/Dúvidas/Sugestões (`free`), Vitrine/Vagas & Parcerias
  (`member`). Um erro de execução no meio do caminho (`relation "memberships" already exists`) foi só
  o Felipe colando o documento inteiro em vez do bloco SQL do passo — resolvido reenviando o bloco
  isolado.
- **Código:** hooks `useSpaces`, `useCommunityPosts` (`usePosts`/`usePost`/`useCreatePost`),
  `useComments`, `useReactions` (`useTogglePostReaction`) — todos em react-query, espelhando
  `useEnrollment`/`useProfile`. Telas `ComunidadePage.tsx` (chips de canal, composer, feed, gate visual
  pros canais `member`) e `PostPage.tsx` (post + comentários + curtida). Rotas `/academy/comunidade` e
  `/academy/comunidade/post/:id`; nav "Comunidade" do `AcademyShell` ativada.
- **Verificação ponta a ponta (Playwright, logado com conta sem membership ativa):** os 5 canais
  aparecem com cadeado nos dois `member`; clicar em canal `member` sem ser Membro mostra o gate (RLS
  bloqueando de verdade, não só UI); post criado em canal `free` aparece no feed na hora; curtida vai de
  0→1 e persiste; comentário aparece e atualiza o contador; zero erro de console.
- **Bug achado e corrigido durante o teste:** autor sem `handle` no perfil gerava link quebrado
  `/academy/membro/undefined` (feed, post e comentários). Corrigido pra exibir texto "Membro" sem link
  quando não há `handle`. `tsc --noEmit` e `npm run build` limpos depois da correção.
- **Pendência deixada no ar:** 1 post de teste ("Teste de verificação Passo 5", canal Apresente-se)
  sem UI de exclusão ainda (fora do escopo do MVP) — remover via SQL Editor quando conveniente.
- **Próximo passo:** passo 6 do [[PRD-006-plano-execucao]] — Biblioteca de Prompts (tabela `prompts` +
  view `prompts_gated` com redação de coluna por tier, distinto do gate de linha inteira usado no passo
  5). Plano detalhado já escrito no documento, aguardando início em sessão nova.

## 2026-07-19 — Passo 6 do PRD-006 implementado e verificado: Biblioteca de Prompts + Skills

- **Objetivo:** biblioteca navegável por categoria, com prévia truncada pra grátis e conteúdo completo
  pra Membro, conforme [[PRD-006-plano-execucao]].
- **Mudança de escopo pedida por Felipe na revisão do plano:** em vez de uma tabela `prompts` só-leitura
  com cadastro manual via SQL, virou (1) **duas tabelas separadas** — `prompts` e `skills`, mesmo
  schema; (2) campo **`description`** novo (resumo curto, sempre visível, sem gate) além do corpo
  completo; (3) cadastro por **tela de admin** (CRUD), não mais manual.
- **SQL aplicado no Supabase `xomtfkbvathddfpbknyo`** (Felipe rodou no SQL Editor,
  `PRD-006-passo6-sql.sql`): tabelas `prompts`/`skills` (`category`, `title`, `description`, `body_md`,
  `min_tier` free/member, `sort_order`) + RLS (metadado sempre legível pra autenticado; `insert`/
  `update`/`delete` só admin via `is_admin()`) + views `prompts_gated`/`skills_gated`
  (`security_invoker = true`) que redigem `body_md` por coluna (trunca em 220 caracteres + flag
  `locked`), reusando `is_active_member()` do passo 5.
- **Código:** hooks `usePrompts`/`useSkills` (espelham `useSpaces`) consultando as views gated;
  `LibraryManager.tsx` — CRUD genérico parametrizado por tabela (`prompts`/`skills`), usado nas duas
  abas novas do `AdminAcademy.tsx` (ao lado de "Cursos"/"Matrículas"); `PromptsPage.tsx`
  (`/academy/prompts`) com alternância Prompts/Skills + chips de categoria + accordion. Nav "Prompts"
  do `AcademyShell` ativada (saiu do badge "Em breve").
- **Bug achado e corrigido durante o teste:** `queryKey` das duas hooks não incluía `user.id`
  (`["prompts"]`/`["skills"]`) — ao trocar de conta na mesma aba do navegador (sem recarregar), o
  react-query servia o cache da conta anterior, mostrando um item `member` destravado pra uma conta
  sem membership. Corrigido incluindo `user?.id` no `queryKey`. Ver [[KNOWN_ISSUES]] KI-22 (inclui
  suspeita não confirmada do mesmo padrão em `useSpaces`/`useCommunityPosts`/`useReactions`).
- **Verificação ponta a ponta:** admin (conta `realvisionmaps360@gmail.com`) criou/editou/excluiu
  prompt e skill de teste pelo painel — RLS de admin funcionando; Felipe testou manualmente com conta
  descartável sem membership em `/academy/prompts` — item `free` completo, item `member` com cadeado +
  texto truncado + CTA "Torne-se Membro" (confirmado após a correção do bug de cache). `tsc --noEmit` e
  `npm run build` limpos.
- **Itens de teste removidos** do banco (2 prompts + 1 skill usados só pra verificação).
- **Ideia registrada, fora de escopo:** automação de Instagram (comentário → DM → cadastro → recompensa
  na biblioteca) discutida com Felipe, documentada em [[IDEAS]], não implementada.
- **MVP da Fase 6 (Hub + Comunidade) fechado** — todos os passos do [[PRD-006-plano-execucao]] (3 a 6)
  concluídos e verificados.

## 2026-07-30 — Fase 7 (PRD-007 Curso Narrado Sincronizado): documentação completa, D-021 fechada

**Objetivo:** transformar o prompt inicial + rascunho do PRD-007 numa documentação executável, sem
escrever código nenhum (regra explícita do prompt de Felipe).

**Atividades:**
- Leitura de toda a documentação da Academy ([[CONTEXT]], [[MASTER_PRD]], [[ARCHITECTURE]],
  [[DECISIONS]], [[ROADMAP]], [[KNOWN_ISSUES]], [[METHODOLOGY_LEARNINGS]]) + auditoria do código real do
  `real-vision-site` (não presumir a partir do rascunho do PRD).
- Achados da auditoria: site **sem PWA nenhuma**; `lessons` sem campo de texto; `lesson_progress` sem
  posição/escuta; gamificação inexistente; **`lessons` tem SELECT público** — texto pago ali vazaria sem
  matrícula (virou KI-28).
- Perguntas em blocos ao Felipe → decisões D-016 a D-020, D-022, D-023 registradas.
- Escritos: [[PRD-007-curso-narrado-sincronizado]] (produto), [[PRD-007-arquitetura-leitor-narrado]]
  (técnica), [[PRD-007-plano-execucao]] (7 fases com aceite/teste/rollback/trava).
- Escopo do MVP reduzido por Felipe pra **uma aula só**: 0.1 "O que é um Profissional 360°" (D-023).
- Escrito o texto final da aula 0.1 (e das 0.2/0.3/0.4, fora do MVP mas prontas) em [[MODULO-0-bem-vindo]],
  a partir de [[CONTEXTO-PARA-IA-ROTEIRISTA]] e das credenciais publicadas no site (`/sobre`).
- **Fase 1 do plano (teste de segundo plano no Android) executada por Felipe no celular real:** 5/5
  cenários passaram, incluindo economia de bateria. **D-021 fechada: PWA aprovada, Capacitor descartado.**
  A Fase 6 do plano encolheu de "fazer funcionar" para "metadados + instalabilidade".
- Wikilinks aplicados em todos os documentos novos e nos que citavam arquivos do projeto em texto puro —
  Felipe pediu explicitamente depois de abrir o Obsidian. Corrigida ambiguidade de `[[CONCEITO]]`
  (existe em 4 cursos diferentes no vault).

**Decisões (ver [[DECISIONS]] para o registro completo):** D-016 (vídeo e narrado coexistem) · D-017
(texto vem dos roteiros, final palavra por palavra) · D-018 (conteúdo pago no banco/bucket, nunca em
arquivo do repo) · D-019 (gamificação mínima: escuta real) · D-020 (mapa de sincronização por script) ·
D-021 (PWA, resolvida) · D-022 (Módulo 0 como prova) · D-023 (MVP = só a aula 0.1).

**Riscos novos:** KI-23 a KI-28, ver [[KNOWN_ISSUES]] — destaque para KI-23 (editar texto pós-gravação
quebra o sync) e KI-28 (gate obrigatório sobre `lessons`).

**Estado ao final da sessão:** documentação 100% aprovada por Felipe. **Zero código escrito, zero
schema alterado, zero dependência instalada** — conforme a regra do prompt inicial. Nenhuma decisão
travando fase.

**Próximos passos:** Felipe revisa o texto da 0.1, grava e envia o MP3. Isso destrava a Fase 2 (pipeline)
do [[PRD-007-plano-execucao]]. A Fase 4 (extrair o leitor de dentro do `BlogPost.tsx`) não depende do
áudio e pode começar antes.

## 2026-07-30 — Fix do highlight no blog + Fases 0, 2 e 3 do PRD-007 executadas e verificadas

**Objetivo:** processar o áudio real que Felipe gravou pra aula 0.1, deixar tudo pronto no banco e
storage, seguindo o plano de fases aprovado na sessão anterior.

**Atividades:**
- **Fix de produção (fora do PRD-007):** Felipe reportou que o destaque da narração sincronizada do blog
  (`site-maior-ativo-era-ia`) acendia só a frase exata, deixando o resto do parágrafo apagado. Corrigido em
  `src/pages/BlogPost.tsx` (`renderNarratedSpans`) pra acender o bloco inteiro (todas as frases do mesmo
  `blockMap`) enquanto o áudio está em qualquer uma delas. Testado no preview (simulação via
  `audio.currentTime`), build limpo, commitado (`34cd211`, não pushado).
- **Fase 0 concluída:** Felipe gravou a narração da 0.1 livremente, sem seguir o roteiro palavra por
  palavra (`TEMP/profisssaooo/Aula 0.1.m4a`, 12min19s). Texto real transcrito e ajustado (só
  acentuação/digitação) em [[MODULO-0-bem-vindo]] — ver D-024.
- **Fase 2 concluída:** pipeline de áudio rodado — `ffmpeg` (mp3), limpeza de texto (script Python,
  `TEMP/modulo/output/clean_text.py`), Aeneas via Docker (`oyekamal/aeneas-docker`), 82 blocos/97 frases,
  último fragmento bate com a duração real do áudio (diferença de 0.01s). Playbook
  [[NARRACAO-SINCRONIZADA-BLOG]] atualizado com a segunda replicação (ver nota lá).
- **Fase 3 concluída:** SQL rodado por Felipe no SQL Editor (`PRD-007-fase3-sql.sql` +
  `PRD-007-fase3-update-aula01.sql`) — colunas novas em `lessons`/`lesson_progress`, view `lessons_gated`
  (gate por matrícula), áudio subido no bucket `course-materials` existente. Tudo **verificado por leitura
  direta no banco** (schema, dados da aula, tamanho do arquivo no storage), não presumido.
- **Achado operacional confirmado (2ª vez):** qualquer tentativa automática de escrita no banco via
  Management API (Bash ou PowerShell) é bloqueada pelo classificador de segurança do Claude Code, mesmo
  com o PAT correto — só leitura passa. Ver KI-29.

**Decisões:** D-024 (texto da aula 0.1 = o que foi gravado, não o roteiro antigo).

**Riscos:** KI-29 novo (escrita no banco sempre bloqueada, não insistir — ir direto pro SQL Editor). KI-28
resolvido (view `lessons_gated` criada e verificada).

**Estado ao final da sessão:** Fases 0, 1, 2 e 3 do [[PRD-007-plano-execucao]] concluídas e verificadas.
Nenhuma UI ainda consome essas colunas (isso é Fase 5). Token de Management API usado na sessão removido
do `.env`; Felipe avisado para revogar no painel do Supabase.

**Pendências deixadas no ar:** linhas "Objetivo"/"Resultado da aula" em [[MODULO-0-bem-vindo]] ainda
descrevem o roteiro antigo (fala em "quatro pilares") — marcado pra revisão do Felipe, não mexido sem OK
dele. Script de limpeza de texto ainda em Python solto no TEMP, não portado pra `scripts/` do repo. Teste
do script genérico contra o gabarito do blog (critério de aceite da Fase 2) não foi rodado.

**Próximos passos:** Fase 4 do [[PRD-007-plano-execucao]] (extrair o leitor de dentro do `BlogPost.tsx`
pra um componente reutilizável) — independente, pode começar quando Felipe quiser.

## 2026-07-30 — Fase 4 do PRD-007 executada e publicada + Fase 5 planejada e revisada

**Objetivo:** fechar a Fase 4 (leitor genérico) e deixar a Fase 5 pronta para execução em sessão nova.

**Fase 4 — concluída, verificada e pushada (`63ab090`):**
- Extraídos do `src/pages/BlogPost.tsx` dois arquivos reutilizáveis pelo blog e pela Academy:
  `src/components/narration/NarratedSpans.tsx` (tipos `NarrationContext`/`NarrationFragment`,
  `narratedSpanClassName`, `renderNarratedSpans` — que recebe `formatText` por parâmetro em vez de
  importar o `boldify` do blog, pra não acoplar a peça genérica ao processamento de texto do blog) e
  `src/hooks/useNarrationAutoScroll.ts` (o par de `useEffect` de scroll manual + `scrollIntoView` com a
  trava de 1,5s, extração 1:1).
- Extraído só o que é narração — o `renderBlock` continua no `BlogPost.tsx`, tratando os ~12 tipos de
  bloco do blog que não têm relação com narração. `BlogPost.tsx` ficou 44 linhas menor.
- Verificado no preview (`/blog/site-maior-ativo-era-ia`, 65 fragmentos): forçando `timeupdate` sintético
  em 3 pontos, confirmados os 3 comportamentos — destaque + auto-scroll (`scrollY` 0 → 642), `wheel`
  bloqueando o auto-scroll por 1,5s (`scrollY` ficou 0 com fragmento novo ativo), e retomada automática
  depois da janela (`scrollY` 974). Build e lint limpos (os 2 warnings de `exhaustive-deps` já existiam,
  em efeitos não tocados).
- Limpeza: removidos 5 arquivos vazios com nomes quebrados na raiz do repo do site (`)`, `,`, `6{f`, `{,`,
  `Histórico`) — sobra de comando de shell mal escapado em sessão anterior.

**Fase 5 — planejada e revisada, nada implementado.** A revisão do plano, feita antes de virar código,
achou **8 problemas — 3 graves, sendo dois deles bugs que já existem em produção hoje**:
- **KI-30** — `useCourse.ts` lê a tabela crua `lessons` em vez da view `lessons_gated`; como RLS é por
  linha e não por coluna, o conteúdo pago vaza no dia em que o curso for publicado.
- **KI-31** — `lessons_gated` é `security_invoker = true`, então a RLS de `lessons`/`modules` continua
  valendo por baixo e exige curso publicado. Com o Profissional 360 em `published = false`, a view devolve
  zero linha para aluno matriculado. A KI-18 liberou a **compra** em pré-venda, mas quem comprar não
  consegue abrir aula nenhuma. Como admin tem policy `ALL`, o defeito é invisível no teste do Felipe e só
  aparece com aluno pagante. O padrão `prompts_gated` que o PRD mandou copiar não transfere: lá a tabela
  crua é `using (true)` e a view redige **coluna**; aqui a RLS bloqueia **linha**.
- **KI-32** — `useProgress.ts` e `useMyCourses.ts` tratam "linha existe" como "aula concluída". A Fase 5
  cria a primeira linha "em andamento" e expõe o defeito; corrigir o filtro sem backfill desmarcaria toda
  aula já concluída.
- **KI-33** — o `**negrito**` some na renderização narrada (existe em `content_blocks`, não existe nos
  `fragments`). Não corrigido de propósito — regerar os artefatos é território do KI-23.
- Mais 4 problemas de desenho corrigidos no plano antes de virar código: corrida que desfazia a conclusão
  (flush gravando `completed` com prop velha), denominador dos 80% vindo de campo manual que pode ser
  nulo, detecção de seek por limiar em vez do evento `seeked`, e o `queryKey` de `useCourse` sem `user.id`
  agora que o cache passa a guardar conteúdo pago.

**Decisões do Felipe nesta sessão:** (1) Profissional 360 segue `published = false`; (2) em aula narrada o
botão manual "Marcar como concluída" some, trocado por indicador passivo "Ouvido: X%" — manter o botão
deixaria concluir sem ouvir, contra o critério de aceite #8.

**Documentos gerados:** [[PRD-007-fase5-plano]] (plano detalhado, auto-suficiente) e
[[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] (SQL pronto para o SQL Editor). [[PRD-007-plano-execucao]] e
[[KNOWN_ISSUES]] atualizados.

**Estado ao final da sessão:** Fases 0-4 concluídas. Fase 5 documentada, **zero código escrito, zero SQL
rodado**.

**Próximos passos:** (1) Felipe roda o Passo 0 do [[PRD-007-fase5-plano]] no SQL Editor — pré-requisito
absoluto, sem ele a Academy mostra o curso vazio para todo mundo; (2) implementar os Passos 1 a 7 do mesmo
documento.

## 2026-07-30 — PRD-007 Fase 5: aula narrada implementada e verificada
- **Objetivo:** implementar e verificar a Fase 5 do curso narrado sincronizado (aula 0.1) conforme
  [[PRD-007-fase5-plano]].
- **Pré-requisito:** Felipe rodou [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] no SQL Editor do Supabase —
  `deve_ser_zero = 0` confirmado antes de qualquer código.
- **Atividades:**
  - Passo 1 — `useProgress.ts`: filtro `.eq("completed", true)` na leitura + upsert explícito com
    `completed`/`completed_at`.
  - Passo 2 — `useMyCourses.ts`: mesmo filtro (KI-32).
  - Passo 3 — `useCourse.ts` migrado pra view `lessons_gated`, 3 selects planos, `user.id` no `queryKey`.
  - Passo 4 — `useNarratedListenProgress.ts` (novo): regra de escuta real, refs sem re-render, `seeked`
    zera delta, flush nunca escreve `completed`.
  - Passo 5 — `NarratedLessonPlayer.tsx` (novo): player próprio, reusa `NarratedSpans` +
    `useNarrationAutoScroll` da Fase 4, URL assinada renovável, controles completos.
  - Passo 6 — `CoursePage.tsx`: branch por `format`, botão manual de conclusão some em aula narrada.
  - Passo 7 — `CourseEditor.tsx`: select de formato + dialog "Narração" (audio_path + JSONs validados).
  - Verificação via Playwright no preview local, logada como admin (`realvisionmaps360@gmail.com`)
    matriculado manualmente pelo painel `/academy/admin`.
- **Bug achado e corrigido na própria verificação (KI-34):** o `useEffect` que liga os listeners de áudio
  (`timeupdate`/`play`/`pause`/`seeked`/`loadedmetadata`) não tinha `audioUrl` nas dependências — como o
  player mostra um placeholder enquanto a URL assinada carrega, a tag `<audio>` real só existe no DOM
  depois, e o efeito nunca reconectava à ref. Sintoma: áudio tocava de verdade, mas destaque de frase,
  tempo exibido e "Ouvido: X%" ficavam travados. Corrigido adicionando `audioUrl` ao array de dependências.
- **Verificado com sucesso:** view libera conteúdo com curso `published=false` (KI-31), texto+áudio não
  vazam sem matrícula (KI-30), destaque de frase sincroniza, duração real carrega (12:18), banner
  "Continuar de onde parei" grava e restaura posição, escuta simulada até ~82% dispara conclusão automática
  sem botão manual, indicador "Ouvido: 100%" e "Aula concluída" aparecem, percentual bate entre
  `/academy/curso/...` (1 de 40 · 3%) e `/academy/cursos` (mesmo número) — KI-32 sem regressão.
- **Caso negativo verificado (mesma sessão, conta não-admin do Felipe):** curso mostra a vitrine (nome,
  mesmo despublicado) mas exibe "Você não está matriculado"; no nível de rede, a query de `modules` já
  vem vazia — nenhuma chamada chega a `lessons_gated`. Zero `<audio>`, zero fragmento de texto no DOM.
  Fase 5 considerada 100% fechada — os 10 critérios de aceite do §14 do PRD-007 (exceto o #5, Fase 6)
  verificados.
- **Deploy:** commit `de0e0cf` no `main`, push confirmado pelo Felipe, Vercel builda automaticamente.
- **Próximos passos:** Felipe validar a experiência da aula real em produção (ouvir do início ao fim) e
  decidir sobre a Fase 6 (Media Session + PWA).

## 2026-08-07 — PRD-008 Fase 8: Blocos 1 e 2 verificados ponta a ponta + correção do banner
- **Objetivo:** destravar a verificação do Bloco 1 (que dependia de login humano) e executar o Bloco 2.
- **Atividades:**
  - **Login resolvido.** O `tests/login.mjs` da sessão anterior tinha aberto a janela mas o contexto
    expirou antes do Felipe concluir. Desta vez ele logou com `realvisionmaps360@gmail.com` e o perfil
    persistente (`C:\Users\Felipe Garcia\.playwright-rv-profile`) guardou a sessão — `whoami.mjs` voltou
    `{"logged":true}`. **Nenhuma credencial passou pelo agente**; próximas sessões reusam o perfil.
  - **Aula localizada por captura de rede:** a página do curso usa botões, não links, então o id não
    aparece no HTML. `tests/find-lesson.mjs` intercepta a resposta do Supabase. Aula 0.1 =
    `37c49e32-b60e-4716-b02b-1a90b26f78f1`, 97 frases, áudio de 739s.
  - **Bloco 1 verificado: 32/32 no desktop (1280×900) e 32/32 no mobile (390×844).** Destaque por frase
    com a barra âmbar acompanhando o áudio, clique na frase faz seek, auto-scroll com a trava de 1,5s
    respeitando o scroll manual, ±15s exatos, ±1 frase, 6 presets (1,5× aplicando no áudio), volume e
    mudo, preferências persistindo, sem scroll horizontal, player não cobre a última frase, zero erro de
    console.
  - **Os três testes que estavam bloqueados rodaram (14/14).** A aula estava marcada como concluída desde
    a Fase 5, o que travava a conclusão por escuta e o "Continuar de onde parei". Com autorização explícita
    do Felipe, a linha de `lesson_progress` foi apagada (estado anterior registrado antes: `completed
    true`, `last_position 338`, `listened 1038`). Resultado: "Você parou em 4:43" com Retomar funcionando,
    a aula **concluiu sozinha** ao cruzar 80% de escuta sem botão manual, e o **antigo E5 passou** — um
    `pause` logo depois não desfez a conclusão, que persistiu após reload.
  - **Bug real achado e corrigido — o banner de consentimento cobria o player.** `ConsentBanner` é global,
    fixo no rodapé, `z-[100]`; o player do leitor é fixo no rodapé, `z-40`. Play, velocidade e volume
    ficavam **inclicáveis** para qualquer aluno que ainda não tivesse respondido ao consentimento. Três
    caminhos avaliados: esconder o banner no leitor (mataria o consentimento na rota), subir o z-index do
    player (aí o player cobriria Aceitar/Recusar) e **empilhar** — o escolhido. A rota publica a altura da
    barra em `--rv-bottom-inset` e o banner se posiciona a partir dela. Altura **medida com ResizeObserver**:
    um valor fixo de 76px deixava 3px de sobreposição, porque a barra tem 79px. Regressão verificada em
    home e blog, nos dois formatos (7/7).
  - **Bloco 2 implementado e verificado: 47/47 no desktop e 47/47 no mobile.** Casca única de painel
    (bottom sheet no mobile, lateral de 400px no desktop, scrim, Esc, trava de rolagem), lista de aulas
    com progresso e navegação real (D-029), configurações de leitura (15–26px com travas, 3 temas
    verificados como **não vazando** pro resto do site — D-028, switch de rolagem, restaurar padrão),
    painel de materiais com as três abas, e pesquisa interna com atalho `/`, contador e navegação circular.
- **Decisões novas (Bloco 2, não estavam no design):** busca normaliza acento (`profissao` acha
  "profissão"); pesquisar **não** move o áudio; "restaurar padrão" **não** mexe na velocidade (nasceu daí
  o `resetReading`).
- **Refatoração:** a regra que achata blocos em frases saiu do `ReadingArea` para `readerSentences.ts` —
  a pesquisa precisa exatamente da mesma lista, e duplicar faria a busca apontar pra índices inexistentes.
- **Commits (branch `feat/leitor-narrado-design`, nada pushado):** `d92357e` (correção do banner + harness
  de verificação) e `811d18c` (Bloco 2).
- **Achados registrados, não corrigidos:** `materials` da aula 0.1 está vazia (os três cards nunca
  renderizaram com dado real); `lesson_progress.completed_at` vem preenchido mesmo com `completed = false`
  (default `now()` no schema — enganaria relatório futuro); `npm run build` dispara IndexNow com status 403.
- **Próximos passos:** Felipe roda `PRD-008-bloco3-marcadores.sql` (destrava o Bloco 3) e, opcionalmente,
  `PRD-008-materiais-teste.sql` (1 prompt + 1 link + 1 arquivo genéricos para conferir o painel de
  Materiais com dado real). Depois, código do Bloco 3.

## 2026-08-10 — Primeiro teste em aparelho real. Duas rodadas de correção, tudo no ar e aprovado

Sessão longa, em Opus 5. O leitor saiu do localhost e foi para produção; o Felipe testou no celular pela
primeira vez.

### O achado que reenquadrou tudo

Os sete commits do PRD-008 (Blocos 0 a 4) estavam no ramo `feat/leitor-narrado-design` e **nunca tinham
sido juntados ao `main`**. Os blocos estavam documentados como "verificados 32/32, 47/47, 17/17" com base
em Playwright rodando **no localhost**. O Felipe foi testar em `realvisionmaps.com` e avaliou, com todo
cuidado, o **player velho da Fase 5** — uma tela que já havia sido reformada.

Publicado com autorização explícita dele: `60ed8f6` → `4322086`. O `main` estava parado no "Add Microsoft
Clarity tracking script"; o merge foi fast-forward, sem conflito.

Daí saiu **D-039**: teste de robô prova que não quebrou, não que está bom. Playwright aprovou container
vazando, cor de destaque reprovada, item quebrando linha e rolagem horizontal na nav, porque nada disso é
asserção dele.

### Fase A — `ea28825`

O modo imersivo só sabia **acender** o chrome: o toque no texto chamava `mostrar`, e não existia gesto que
apagasse. O Felipe entrava no modo limpo e não conseguia mais alternar. Junto disso, dois comportamentos
que ninguém pediu e que mexiam a tela sozinha enquanto ele lia: esconder ao rolar com o dedo e timer de
ocioso de 10s (**D-035**, agora regressão em teste).

Também: painel expandido passou a fechar por toque fora (o aluno ficava preso nele); destaque foi de âmbar
diluído pra dourado; `box-decoration-break: clone` consertou o canto cortado.

**A cor precisou de duas tentativas, e a segunda foi reprovada por mim mesmo no print** —
`rgba(229,192,123,0.16)` lia como bege acinzentado, porque `AMBER_LIGHT` é dourado *dessaturado* e diluir
sobre fundo escuro tira o amarelo. O valor final `rgba(247,201,72,0.16)` sobe croma, não opacidade.

### Fase A-2 — `19a886d` — aprovado pelo Felipe

Ao usar a Fase A, ficou claro que **a implementação estava correta e a especificação estava errada**. O
Felipe redesenhou o gesto para algo mais simples (**D-033**, **D-034**) e, no caminho, apontou dois
defeitos de arquitetura no rodapé que a implementação anterior tinha introduzido (**D-036**, **D-037**):

- toque simples em qualquer pixel alterna cabeçalho **e** barra juntos, e não mexe no áudio
- duplo toque numa frase pula pro trecho **e começa a tocar** — nasceu o `playFromFragment`
- três camadas de rodapé empilhadas, com a barrinha **sempre** na tela e **uma só** barra de progresso
- barrinha com fundo sólido: o degradê deixava o texto desfilar atrás do nome da aula
- barra com `−15 −5 [play] +5 +15`, número no canto de cada seta; botões de frase desceram pro painel
  (**D-038**)

**A solução dele resolveu um problema técnico de graça.** Com o seek fora do toque simples, os dois gestos
deixaram de brigar pelo primeiro clique do duplo toque, e o toque simples pôde ser adiado 250ms e
cancelado pelo duplo — adiamento que era inaceitável enquanto ele fazia seek.

### Verificação

27/27 bloco 4 mobile · 8/8 desktop · 23/23 bloco 1 · 47/47 bloco 2 · 17/17 bloco 3. Print dos três
estados da pilha em 390px revisado a olho — e foi olhando que a primeira versão do botão de abrir os
controles (dois filetes flanqueando a seta) foi reprovada por ler como controle quebrado.

`verify-bloco4` foi **reescrito duas vezes** nesta sessão; duas asserções hoje afirmam o **oposto** do que
afirmavam (toque na frase escondia o chrome; barrinha era transparente).

### Duas falhas de teste que não eram regressão

- **Bloco 3** falhava por **estado sujo**: dois marcadores órfãos de uma rodada que morreu no meio, antes
  do passo de limpeza. Removidos pela própria interface. O harness não limpa quando falha — vale melhorar.
- **Bloco 1** falhava em "destaque avança junto com o áudio" com 6s cravados de espera. **A frase 0 desta
  aula dura ~10,5s** (medido) — o teste parava dentro dela. Agora espera o evento, teto de 20s.

### Escopo novo fechado com o Felipe

[[PRD-009-trilha-gamificada]] escrito e especificado, **zero código**: trilha estilo Duolingo com um nó
por aula e módulos em acordeão (**D-040**), navegação livre (**D-041**), uma tela por aula com os
materiais dentro (**D-042**). Mais a Fase B do [[PRD-008-leitor-narrado-design]], detalhada no próprio
PRD: materiais em acordeão (**D-043**), cartão da aula narrada e nav sem rolagem horizontal.

### Próximo passo

**Fase B do PRD-008**, na ordem B1 → B2 → B3. Depois [[PRD-009-trilha-gamificada]]. Depois os Blocos 5, 6
e 7 do PRD-008. Handoff em
`operacao/projetos/real-vision-academy/docs/HANDOFF-2026-08-10-leitor-narrado.md`.

### Achados registrados, não corrigidos

- `docs/` tem dois arquivos-lixo de sessões anteriores: `[[PRD-007-fase5-sql` e `setCompleted.mutate({`.
  Não removidos — regra de nunca apagar nota do vault sem OK do Felipe.
- `npm run build` segue disparando IndexNow com status 403.
- Materiais não têm `sort_order`; a ordem é a que o banco devolver.

## Documentos relacionados
- [[ROADMAP]]
- [[CHANGELOG]]
- [[CONTEXT]]
- [[PRD-008-leitor-narrado-design]] · [[PRD-009-trilha-gamificada]] · [[DECISIONS]]
