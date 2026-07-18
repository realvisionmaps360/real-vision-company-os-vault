---
id: KNOWN_ISSUES
title: Problemas Conhecidos & Riscos — Real Vision Academy
type: known_issues
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ARCHITECTURE
---

# Problemas Conhecidos, Limitações e Riscos

> Lista centralizada. Atualizar quando surgir novo risco ou quando um item for resolvido.

## Técnicos (base atual)
- **KI-01 — ✅ RESOLVIDO (Fase 1, 2026-07-17).** `supabase.ts` repontado pro banco novo; recomeço
  limpo (D-007), sem migração de dados.
- **KI-02 — ✅ RESOLVIDO (2026-07-17, testado ponta a ponta em produção).** Google OAuth habilitado
  no painel + botão no `AuthModal` + `signInWithGoogle` no `AuthContext`. Testado em produção pelo
  Felipe e falhou 2x antes de funcionar — causa raiz e correção em KI-12.
- **KI-12 — ✅ RESOLVIDO (2026-07-17).** Incidente de login em produção (2 causas empilhadas):
  1. `site_url` do projeto Supabase novo ainda no padrão de fábrica (`http://localhost:3000`) e
     `uri_allow_list` vazio — qualquer `redirectTo`/`emailRedirectTo` caía de volta em `localhost:3000`
     (confirmação de e-mail e OAuth "voltavam" pro PC do Felipe, conexão recusada). Corrigido via
     Supabase Management API: `site_url` → `https://realvisionmaps.com`, `uri_allow_list` →
     `https://realvisionmaps.com/**,http://localhost:3000/**`.
  2. O OAuth Client do Google configurado no provider era do tipo **Desktop** ("ID do cliente para
     Computador"), que não tem/aceita `redirect_uri` customizado — causava `Erro 400:
     redirect_uri_mismatch` direto no Google, antes de chegar no Supabase. Corrigido criando um client
     novo tipo **Aplicativo da Web** (`Real Vision Academy Web`) com
     `https://xomtfkbvathddfpbknyo.supabase.co/auth/v1/callback` nos redirect URIs autorizados;
     Client ID/Secret atualizados no provider Google do Supabase.
  - Detalhe completo em [[TIMELINE]] (entrada "Incidente de login em produção").
- **KI-13 — ✅ RESOLVIDO (2026-07-18).** Hipótese original estava errada: não linkou. São **duas
  contas separadas**, e-mails diferentes — `realvisionmaps360@gmail.com` (teste Playwright) e
  `felipegarciajericoacoara@gmail.com` (login real do Felipe via Google, e-mail pessoal). Felipe
  escolheu `realvisionmaps360@gmail.com` como conta admin fixa; a outra ficou como está. Detalhe
  completo em [[TIMELINE]].
- **KI-03 — ✅ RESOLVIDO (Fase 1).** `AuthContext` global criado (listener único); `useAuth` agora
  consome o context.
- **KI-04 — ✅ RESOLVIDO (Fase 1).** Fluxo de like/comentário auditado e recriado no banco novo com
  RLS; verificado no preview (leitura 200, insert sem login 401).
- **KI-07 — ✅ RESOLVIDO (2026-07-17).** `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` setadas no
  Vercel (produção) e Fases 1+2 publicadas com OK do Felipe. Likes/comentários antigos de produção
  somem (esperado, D-007).

## Operacionais / pendências de acesso
- **KI-05 — ✅ RESOLVIDO.** Credenciais recebidas. Nota: o MCP Supabase não alcança o projeto novo
  (conector OAuth em outra conta) → usar a **Management API** com o PAT (ver [[CONTEXT]] "Nota
  operacional"). Segredos em `TEMP/ggg.txt` — limpar após uso.

## Fase 2
- **KI-08 — ✅ RESOLVIDO (2026-07-18).** `realvisionmaps360@gmail.com` promovido a `role = 'admin'`
  (via `INSERT` em `profiles`, ver KI-11 — não existia linha pra dar `UPDATE`). Detalhe em [[TIMELINE]].
- **KI-11 — ✅ RESOLVIDO + TESTADO PONTA A PONTA (2026-07-18, Fase 3).** Função
  `public.handle_new_user()` (security definer) + trigger `on_auth_user_created` em `after insert on
  auth.users` → insere automaticamente em `profiles` (`id`, `email`, `name` a partir de
  `raw_user_meta_data` ou do prefixo do e-mail, `role = 'student'`). Validado com um cadastro real:
  Felipe rodou o `INSERT` em `auth.users` do aluno de teste da Fase 3 pelo SQL Editor do painel
  (bloqueio do classificador para essa ação, contornado pedindo para ele rodar manualmente — mesmo
  padrão de outras vezes). Consulta imediata (dentro da mesma transação/CTE) mostrou
  `profile_criado_pelo_trigger = NULL`, o que gerou suspeita de falha — mas uma consulta separada
  logo depois confirmou a linha criada em `profiles` com os dados corretos (`role: student`, nome a
  partir do prefixo do e-mail). O NULL foi um falso alarme de visibilidade dentro da mesma query com
  CTEs (o trigger é `AFTER INSERT`; o `SELECT` final da mesma call não necessariamente enxerga o
  efeito colateral do trigger no mesmo snapshot). **Trigger funcionando corretamente**, confirmado.
- **KI-09 — Sem arquivo de migração no repo.** O schema da Fase 2 foi aplicado direto no banco via
  Management API; a fonte para recriação é [[PRD-002-modelo-de-dados]] (contém o desenho completo).
- **KI-10 — Upload de arquivos não existe no admin.** Materiais tipo `pdf`/`download` aceitam URL;
  storage (Supabase Storage vs. outro) será decidido na Fase 3 junto com D-006.

## Fase 3
- **KI-14 — ✅ RESOLVIDO + VALIDADO PONTA A PONTA (2026-07-18).** Conta Bunny Stream criada
  (Library ID `707363`); env vars setadas no Vercel; player testado em produção via Playwright —
  iframe com URL assinada (`token`+`expires`) tocando o vídeo de teste. Esquema do token confirmado
  correto: `sha256_hex(tokenKey + videoGuid + expires)`. Detalhe completo em [[TIMELINE]].
- **KI-15 — Token de cor divergente: `--accent` (#C58B2A) × spec/admin (#F5A623).** O CSS var
  `--accent` do site é `38 65% 47%` (≈`#C58B2A`), mas o `CLAUDE.md` do repo (e o DESIGN.md) definem o
  amber oficial como `#F5A623` — que é o que o painel admin e a nova área do aluno usam (hardcoded).
  Não corrigido (fora de escopo, mudança afetaria o site inteiro). Decidir no futuro qual prevalece e
  unificar.
- **KI-16 — Upload de materiais só pelo painel do Supabase (sem UI) + assinatura sem teste com
  arquivo real.** O bucket privado `course-materials` e a policy de leitura por matrícula existem
  (verificados no banco), e o `MaterialsList` assina no client (D-010) — mas nenhum arquivo real foi
  enviado ainda (a tentativa de obter a service key pra subir um PDF de teste foi bloqueada pelo
  classificador). Fluxo atual: subir arquivo pelo painel Supabase (Storage → course-materials) no
  caminho `{course_id}/{lesson_id}/{arquivo}` e colar esse caminho no campo URL do material no admin.
  Evolução natural (fase futura): upload direto no painel admin (atualiza KI-10).

## Metodologia
- **KI-06 — Obsidian CLI exige Obsidian aberto.** O comando `obsidian` está instalado, mas só opera
  com o app aberto. Fallback: edição direta dos `.md` (mesma estrutura). Ver [[master-visionair]].
- **KI-17 — Cuidado ao apagar `TEMP/ggg.txt`: pode conter mais de uma credencial.** Em 2026-07-18 o
  arquivo foi apagado (aprovado pelo Felipe como "credenciais do Bunny") sem ler o conteúdo antes —
  na prática também guardava o PAT da Supabase Management API (conta smarthome), exigindo gerar um
  PAT novo na hora para destravar a sessão. **Regra daqui pra frente:** sempre ler arquivos
  `TEMP/*.txt` de credenciais antes de apagar, mesmo com aprovação — o nome/contexto do arquivo pode
  não listar tudo que ele guarda.
- **KI-17b — `curl` via Bash (Windows) corrompe acentuação em queries pra Management API.** Passar
  SQL com `à`, `ç`, `õ`, `°`, `—` etc. direto como argumento `-d '...'` no Bash tool deste PC gera
  perda real de dado (caracteres viram `�` no banco, não é só exibição). Causa: encoding do
  argumento de linha de comando no Git Bash/Windows, não da API. **Fluxo seguro confirmado:** montar
  a query em um heredoc (`--data-binary @- <<'EOF' ... EOF`) ou gravar em arquivo e usar `-d @arquivo`
  — nunca inline com `-d '...'` quando o texto tem acentuação. Para conferir se o dado gravou certo,
  salvar a resposta em arquivo (`-o arquivo.json`) e ler com a ferramenta de leitura de arquivo — o
  console do PowerShell 5.1 exibe mojibake (`Ã©`, `Ã£`) mesmo quando o dado no banco está correto, o
  que pode levar a "corrigir" algo que não estava quebrado.

## Fase 4
- **KI-18 — ✅ RESOLVIDO (2026-07-18).** A policy de catálogo (`courses` SELECT só `published = true`)
  bloqueava a compra durante a pré-venda — aluno autenticado não conseguia ler o curso pra montar o
  pedido, mesmo logado, porque o Profissional 360 é intencionalmente não publicado ainda. Nova policy
  `courses_select_authenticated_presale` (SELECT, `to authenticated`, `using (true)`) libera leitura
  do curso pra qualquer autenticado, publicado ou não — módulos/aulas/materiais continuam gated como
  antes (`published` + matrícula), só o "cartão" do curso (título/preço/slug) ficou visível antes de
  publicar. Detalhe em [[TIMELINE]].
- **KI-19 — ✅ RESOLVIDO (2026-07-18).** `CourseEditor.tsx` — campo de preço era `type="number"`,
  rejeitava vírgula (padrão BR) e zerava o valor silenciosamente. Trocado pra
  `type="text" inputMode="decimal"` com normalização de vírgula pra ponto no `onChange`.
- **KI-20 — Organização Supabase do Felipe já no limite de 2 projetos ativos grátis** (VisionFlow +
  rv-acquisition). O projeto da Academy (conta smarthome, `xomtfkbvathddfpbknyo`) fica de fora do MCP
  por esse motivo — não é só questão de reconectar o conector, é limite real do plano free (confirmado
  em [Supabase Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq)). Mudanças de
  schema/RLS nesse projeto continuam precisando ser rodadas manualmente pelo Felipe (SQL Editor) ou
  via Management API com PAT — mesma raiz de KI-05.

## Decisões em aberto (não são problemas, mas travam fases)
- Nenhuma no momento — pagamento (D-005, Stripe) e vídeo (D-006, Bunny Stream) já decididos.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[CONTEXT]]
