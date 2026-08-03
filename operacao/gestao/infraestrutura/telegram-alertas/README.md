# Bot Telegram — aviso de novo email capturado (lead de blog)

> Status: **documentado, não implementado**. Pausado por sessão com token baixo em 22/07/2026. Continuar aqui no Claude Code (não no Hermes VPS — ver decisão abaixo).

## Objetivo

Depois de publicar a squeeze page (captura de nome+email antes do link do grupo WhatsApp no post do blog — ver `operacao/marketing/email-marketing/03-SEGMENTACAO-CONTATOS.md`), Felipe quer ser avisado em tempo real no Telegram toda vez que um novo email for salvo em `email_contatos` vindo de alguém que leu um post do blog. Mensagem com: nome, email, total de contatos ativos na lista.

## Decisão de onde implementar

Cheguei a desenhar um handoff pro Hermes Agent (Thomas Anderson, VPS) fazer isso. A consulta a ele mudou a decisão: ele **não tem CLI do Supabase nem o código-fonte** das Edge Functions (`hermes-send`, `capture-community-lead`) — as duas foram sempre deployadas via Claude Code + MCP Supabase, nunca pelo VPS. Não faz sentido duplicar lógica lá.

**Implementação vai ser feita aqui (Claude Code)**, direto na Edge Function `capture-community-lead` já existente e mantida por aqui.

> Nota sobre o Hermes Agent (Thomas Anderson): é o agente que roda no VPS Hostinger (`/workspace/real-vision-company-os-vault/`, usuário `hermeswebui`), diferente do Hermes/skill `rv-email` daqui do Claude Code (persona de copywriting de email marketing). Confirmado em 22/07/2026: tem acesso de saída à internet (`api.telegram.org` responde) mas não tem CLI/código das Edge Functions — não é o lugar certo pra essa automação específica.

## Segurança — atenção antes de continuar

A resposta do Hermes Agent trouxe um **Personal Access Token do Supabase em texto puro** dentro do chat (log de conversa). Recomendação: rotacionar esse token (Supabase Dashboard → Access Tokens → revoke + gerar novo) antes de considerar essa credencial ainda válida. Não foi usado em nada até agora.

## Credenciais já confirmadas (22/07/2026 — não precisa refazer)

- Bot Telegram criado via BotFather: `@rv_updater_bot` (id `8623754098`)
- `TELEGRAM_CHAT_ID`: `1896611341` (Felipe Garcia, @realvisionmaps) — confirmado consultando `https://api.telegram.org/bot<TOKEN>/getUpdates` depois do Felipe mandar `/start` pro bot
- `TELEGRAM_BOT_TOKEN`: Felipe já tem o valor (gerado pelo BotFather quando criou o bot) — **ainda não cadastrado no Supabase**

## O que falta fazer, em ordem

### 1. Felipe cadastra os secrets no Supabase

Não dá pra fazer isso via MCP — o MCP Supabase disponível aqui não tem tool pra gerenciar secrets de Edge Function (só `apply_migration`, `execute_sql`, `deploy_edge_function`, `list/get_edge_functions`).

Passo a passo: Dashboard do projeto `ghwjetvazmdlaqidgxqi` → Edge Functions → `capture-community-lead` → aba **Secrets** → adicionar:
- `TELEGRAM_BOT_TOKEN` = (o valor que o Felipe já tem, gerado pelo BotFather)
- `TELEGRAM_CHAT_ID` = `1896611341`

### 2. Editar a Edge Function `capture-community-lead`

Ler o código atual com `get_edge_function` (MCP Supabase, projeto `ghwjetvazmdlaqidgxqi`, slug `capture-community-lead`) — já grava `tags` desde 22/07/2026. Adicionar, **logo após o insert bem-sucedido e antes do `return`**:

- **Escopo:** só dispara pra lead de blog — `origem` começando com `blog-` (é o valor que `CommunityLeadModal.tsx` já manda pro campo `origem`). Não dispara pra outras origens (`relacao_comercial`, `manual`, etc.) nem pra email duplicado (código de erro `23505` do Postgres, já tratado hoje como sucesso silencioso — não deve virar notificação).
- **Mensagem** via método `sendMessage` da API do Telegram (`https://api.telegram.org/bot<TOKEN>/sendMessage`, `chat_id` + `text`): nome do lead, email do lead, e a contagem total de `email_contatos` com `status='ativo'` no momento (rodar um `select count(*)` logo antes de montar a mensagem — não usar valor fixo/cacheado).
- **Falha no envio ao Telegram não pode quebrar o insert.** O lead já foi salvo no banco, isso é o que importa de verdade. Se o `fetch` pro Telegram falhar (token errado, timeout, etc.), só logar com `console.error` — a resposta pro frontend continua `{ok: true}` normalmente, sem expor esse erro pro usuário do site.

### 3. Deploy

Via `mcp__supabase__deploy_edge_function` (mesmo fluxo já usado quando a coluna `tags` foi adicionada em 22/07/2026 — reenviar o `index.ts` completo, o MCP versiona automaticamente).

### 4. Testar de ponta a ponta

- Preencher o modal `CommunityLeadModal` em produção com um dado de teste identificável (nome tipo "Teste XYZ")
- Confirmar chegada da mensagem no Telegram do Felipe (`@rv_updater_bot`) com nome/email/contagem corretos
- Confirmar que um erro proposital (ex: simular token errado) não derruba o insert do lead — o dado tem que continuar sendo salvo mesmo se o Telegram falhar

## Fora de escopo (não fazer sem pedido novo do Felipe)

- Notificar outras origens de contato além de lead de blog (pode virar pedido futuro)
- Qualquer trabalho no VPS/Hermes Agent — decidido que essa automação fica só no Claude Code
- Resolver se `tasks.recurrence` (mensal/anual) é confiável como "mensalidade/anuidade a vencer" — pendência separada, registrada em `operacao/marketing/email-marketing/03-SEGMENTACAO-CONTATOS.md`, aguardando Felipe organizar isso antes de qualquer segmentação nova baseada nisso

## Arquivos relevantes

- Edge Function: `capture-community-lead` (projeto Supabase `ghwjetvazmdlaqidgxqi`) — sem código local no vault, só via MCP/Dashboard
- Frontend: `operacao/projetos/_RV-Internos/real-vision-site/src/components/CommunityLeadModal.tsx`
- Doc de segmentação de contatos (contexto irmão deste projeto): `operacao/marketing/email-marketing/03-SEGMENTACAO-CONTATOS.md`
- Timeline da campanha que originou tudo isso: `operacao/projetos/_RV-Internos/campanha-google-ads-slm-llm/TIMELINE.md`
