# Timeline — Campanha Google Ads "SLM vs LLM" → Comunidade WhatsApp

Primeira campanha de tráfego pago da Real Vision. Ver briefing completo em [[CAMPANHA-SLM-LLM-WHATSAPP-2026-07]]. Playbook técnico: [[PLAYBOOK-GOOGLE-ADS-CONTA-NOVA]].

## 12/07/2026 — Publicação do tracking + H2, resolução do vínculo GA4↔Ads, criação da campanha

**Contexto:** sessão retomada de um handoff anterior. Faltavam 3 coisas pra destravar a campanha: vínculo GA4↔Google Ads, publicar em produção o H2 do post + tracking do CTA do WhatsApp, e criar a campanha na interface.

**1. Vínculo GA4 ↔ Google Ads — resolvido com volta e meia**
- Confusão inicial: GA4 (conta `realvisionmaps360@gmail.com`) e Google Ads (conta `felipegarciajericoacoara@gmail.com`) são contas Google diferentes — o modal de vínculo pelo lado do Ads só lista propriedades GA4 registradas no mesmo e-mail, por isso aparecia vazio.
- **Solução que funcionou:** dentro do GA4 → Admin → Vinculações do Google Ads → "Criar um vínculo" → opção **"Solicitar acesso a outras contas do Google Ads"** → digitar o Customer ID da conta Ads → enviar solicitação. Do lado do Google Ads, a solicitação aparece em Ferramentas → Central de dados → Google Analytics (GA4) → aba **"Recebido"** → botão **Revisar** → aprovar.
- Isso vinculou o GA4 à conta administradora (MCC) `359-167-3566`. **Mas a campanha roda numa conta filha diferente (`414-120-1211`)** — ver seção "Estrutura de conta" abaixo, isso gerou confusão adicional.

**2. Publicação em produção**
- H2 do post `diferenca-entre-llm-e-slm` alterado de "A conta que as Big Techs preferem que você não faça" para "SLM vs LLM: a conta que as Big Techs preferem que você não faça" (só o título, texto do parágrafo intacto) — decidido e aprovado numa sessão anterior, só faltava publicar.
- Tracking de clique `blog_cta_whatsapp_click` no CTA final do post (`BlogPost.tsx`) — código já existia, só faltava publicar.
- `git pull` → conferido diff → `npm run build` (passou limpo) → commit → `git push origin main` → deploy automático via Vercel.
- Verificado ao vivo com JS injetado no navegador: evento `blog_cta_whatsapp_click` disparando corretamente com `post_slug` e `button_text` certos.

**3. Criação da campanha — o processo real (não bateu com o documento original)**
- Documento antigo assumia o fluxo clássico "Campanhas → + Criar → Escolher meta → link 'sem orientação'". **Esse link não existe mais** para contas 100% novas sem nenhuma campanha e sem forma de pagamento configurada — o Google força um assistente linear ("Criar sua primeira campanha") sem atalho.
- Passo a passo real que funcionou, documentado em detalhe no [`PLAYBOOK-GOOGLE-ADS-CONTA-NOVA.md`](PLAYBOOK-GOOGLE-ADS-CONTA-NOVA.md) desta mesma pasta.
- Erro cometido no meio do caminho: escolher "Enviar formulário de lead" como meta levou a campanha pro tipo **Performance Max** (automatizado, não o que queríamos) — precisou abortar o rascunho e recomeçar clicando em **"Pular"** na tela de metas, o que libera a escolha manual do tipo "Pesquisa".
- Forma de pagamento: optamos por **Pix** em vez de cartão. Pesquisado e confirmado que no Brasil o Pix no Google Ads funciona como saldo pré-pago manual — sem risco de cobrança inesperada, só risco de a campanha pausar se o saldo acabar (aceitável pro Felipe).
- **A campanha foi publicada como ATIVA automaticamente** pelo assistente simplificado, sem dar opção de ficar pausada (diferente do fluxo clássico documentado antes). Felipe deu aprovação explícita para deixar ativa depois do fato consumado.

**Resultado no fim da sessão:**
- Campanha `RV - Blog LLM vs SLM - WhatsApp`, conta `414-120-1211`, status `ENABLED`, orçamento R$7/dia — confirmado via API (`mcp__google-ads-mcp__search_search`).
- Grupo de anúncios único criado (equivalente ao "Grupo A — O que é" do briefing).

**Pendente (resolvido em 13/07, ver seção abaixo):**
- [x] Criar segundo grupo de anúncios "Comparação"
- [x] Aplicar lista de palavras-chave negativas
- [x] Marcar `blog_cta_whatsapp_click` como conversão principal no GA4 e importar/confirmar no Google Ads
- [ ] Atualizar o checklist final em `CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md`

## 13/07/2026 — Fechamento das pendências e ativação

**Contexto:** sessão retomada pra resolver as 3 pendências deixadas em 12/07. Feito tudo direto na interface do Google Ads (conta `414-120-1211`) com Felipe passando os prints e a sessão guiando passo a passo.

**1. Grupo de anúncios "Comparação" criado**
- Palavras-chave: `"slm vs llm"`, `"slm vs llm architecture"`, `"slm vs llm use cases"`, `"small language model vs large language model"`.
- Anúncio responsivo de pesquisa com os 5 títulos e 2 descrições do briefing, URL final `https://realvisionmaps.com/blog/diferenca-entre-llm-e-slm`.
- Detalhe: o Google pré-preencheu o campo de títulos com sugestões do Grupo A por engano — precisou substituir manualmente pelos títulos certos do Grupo B.

**2. Palavras-chave negativas aplicadas**
- As 12 da lista do briefing (gol, g3, maple bear, "são leopoldo mandic", curso, faculdade, vaga, emprego, pdf, download, paper, artigo científico), em nível de **Campanha**.

**3. Vínculo GA4 ↔ Ads resolvido e conversão importada**
- Causa raiz do bloqueio anterior: o GA4 (`realvisionmaps360@gmail.com`) já estava vinculado à MCC `359-167-3566` e à conta `156-292-4356`, mas **não** à conta que efetivamente roda a campanha, `414-120-1211`. Por isso a conversão nunca aparecia do lado do Ads.
- Resolvido pelo mesmo fluxo de antes: GA4 → Admin → Vínculos de produtos → Vinculações da Google Ads → Vincular → "Solicitar acesso a outras contas do Google Ads" → ID `414-120-1211` → Enviar. Do lado do Ads (login `felipegarciajericoacoara@gmail.com`) → Ferramentas → Central de dados → Google Analytics (GA4) → aba Recebido → Aprovar.
- Evento `blog_cta_whatsapp_click` só apareceu pra marcar como conversão no GA4 depois de ter disparado pelo menos uma vez em produção (antes disso não aparecia nem em "Eventos recentes").
- Importado no Google Ads via Metas → Criar → Ação de conversão → Conversões em um site → fonte GA4 (não "Tag do Google") → evento `blog_cta_whatsapp_click` → categoria **Contato**.
- Confirmado via API (`mcp__google-ads-mcp__search_search`, resource `conversion_action`): `realvisionmaps.com (web) blog_cta_whatsapp_click`, tipo `GOOGLE_ANALYTICS_4_CUSTOM`, status `ENABLED`, `primary_for_goal: true`.

**4. Checklist técnico validado 100% via API antes da ativação**
- Campanha `PAUSED` → orçamento R$7,00/dia confirmado.
- 2 grupos de anúncios `ENABLED` ("O que é" e "Comparação"), cada um com o anúncio certo e a URL final correta.
- Conversão principal `ENABLED`.

**5. Campanha ativada**
- Felipe aprovou explicitamente a ativação. Ativada na interface (Felipe clicou), confirmado via API: `campaign.status: ENABLED`.
- **Status atual: rodando**, R$7/dia, ~14 dias (R$100 total).

**Pendente:**
- [ ] Atualizar o checklist final em `CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md`
- [ ] Acompanhar performance nos próximos dias (cliques, custo, conversões de `blog_cta_whatsapp_click`)

## 22/07/2026 — Diagnóstico: zero conversão em 9 dias, tráfego pago não aparece no GA4

Contexto: campanha ativa desde 13/07, R$7/dia, 9 dias rodando. Felipe pediu status.

**Números do Google Ads (via API, 13-21/07):**
- Gasto: R$77,45 | Cliques: 57 | Impressões: 1126 | CTR ~5%
- Conversões: 0 em todos os 9 dias

**Investigação passo a passo:**
1. PostHog instalado no site (`src/lib/posthog.ts`) confirmado funcionando — captura autocapture geral normalmente, mas é opt-in (só grava quem aceita cookie), amostra pequena.
2. Evento de conversão `blog_cta_whatsapp_click` dispara via `gtag` (BlogPost.tsx:760), independente do consentimento de cookie do PostHog — não é a causa.
3. GA4 (property 506885567, realvisionmaps.com) checado direto via API para a página `/blog/site-maior-ativo-era-ia`, período 13-21/07: **nenhuma sessão com `sessionSourceMedium = google / cpc`.** Só orgânico, direto e referral interno.
4. Conclusão: o vínculo GA4↔Ads já foi resolvido uma vez em 13/07 (ver entrada acima) para a conta `414-120-1211` — mas os dados de hoje mostram tráfego pago não sendo atribuído no GA4. Precisa reconfirmar se o vínculo ainda está ativo, se o gclid/UTM está chegando na URL de destino, ou se há divergência entre a conta que originou o clique cobrado e a conta vinculada.

**Pendente para próxima sessão:**
- [ ] Reconfirmar vínculo GA4↔Ads na conta filha `414-120-1211` (GA4 → Admin → Vinculações do Google Ads)
- [ ] Checar se a URL final do anúncio carrega parâmetros de rastreamento (gclid) corretamente
- [ ] Se vínculo ok, investigar se é problema de atribuição/latência do GA4 (import de conversão pode levar até 24-48h) ou cliques inválidos/bot
- [ ] Depois de resolvido, reprocessar conversões perdidas se possível

## 22/07/2026 — Correção do diagnóstico + campanha pausada + 3 soluções

**Erro no diagnóstico acima:** checou GA4 na página `/blog/site-maior-ativo-era-ia` — errada. A campanha real aponta pra `/blog/diferenca-entre-llm-e-slm` (confirmado via `mcp__google-ads-mcp__search_search`, resource `ad_group_ad.ad.final_urls`). Refeito o relatório na página certa:

- Vínculo GA4↔Ads **nunca quebrou** — 3 contas linkadas, incluindo `414-120-1211`.
- `google / cpc` aparece normal: 72 sessões, 13-21/07. Tracking técnico 100% ok, gclid chega, evento dispara certo.
- `blog_cta_whatsapp_click`: 0 disparos desde 12/07 (véspera da campanha) — zero clique real, não bug.
- Achado: `blog_post_read` (scroll 75%+15s, evento criado na auditoria de 12/07) disparou **10 vezes** pra `google / cpc` (56 de `blog_scroll_depth`) — ~18% do tráfego pago leu o post inteiro. O anúncio atrai gente certa; o gargalo é só o convite final (entrar em grupo WhatsApp, compromisso alto pra tráfego frio).

**Felipe pausou a campanha em 22/07/2026** (9 dias rodados, R$77,45 gastos, 57 cliques).

**3 soluções propostas (pesquisa vault + skill `cro` + web):**
1. Marcar `blog_post_read` como conversão secundária no Google Ads — sinal de otimização mais cedo/volume maior (prática recomendada pra contas com poucas conversões/semana).
2. Reduzir fricção do CTA final: testar `wa.me` direto (conversa 1:1) como CTA primário antes do convite de comunidade; testar CTA também no meio do post, não só no final (ver `skills/cro/references/experiments.md`).
3. Amostra de 57 cliques é baixa demais pra leitura estatística confiável — completar os 14 dias/R$100 já orçados no briefing original, ou mudar oferta/página inteira (não só texto) se for redesenhar.

Memória de sessão salva: [[feedback_verificar_slug_antes_diagnostico_ga4]] e [[project_campanha_slm_llm_zero_conversao]].

**Pendente:** decisão do Felipe sobre reativar (ajuste 1 e/ou 2) ou redesenhar oferta/página (opção 3) antes de gastar de novo.

## 22/07/2026 — Squeeze page implementada: captura de email antes do link do grupo WhatsApp

**Motivação:** Felipe apontou que "só entrar na comunidade" não é ativo nenhum pra Real Vision — o clique some dentro de um grupo de WhatsApp. Decisão: capturar nome+email na lista de email marketing (Hermes) antes de liberar o link do grupo, virando um ativo que a RV controla.

**O que foi construído:**
- **Edge Function `capture-community-lead`** (projeto Supabase `ghwjetvazmdlaqidgxqi`, mesmo do Hermes/VisionFlow) — pública (`verify_jwt: false`, igual `hermes-send`), recebe `{nome, email, origem}`, valida, aplica rate limit por IP (tabela nova `lead_capture_rate_limit`, 5 tentativas/10min), insere em `email_contatos` (trata email duplicado como sucesso, não erro), devolve `{ok:true}`. CORS liberado pra `realvisionmaps.com` e `localhost` (dev).
- **Componente `CommunityLeadModal.tsx`** (`src/components/`) — modal com nome+email (padrão visual do `AuthModal.tsx` existente), chama a Edge Function, dispara evento GA4 `community_lead_captured` no sucesso, abre o link do grupo WhatsApp em nova aba.
- **`BlogPost.tsx`** — o botão "Entrar na comunidade no WhatsApp" (detectado pelo href conter `chat.whatsapp.com`, só existe nesse post) agora abre o modal em vez de ir direto pro link; o botão "Falar com a Real Vision" (`wa.me` direto) continua sem alteração, sem captura.

**Por que essa arquitetura:** a Real Vision já tem toda a infra de email marketing (Hermes/Resend) rodando no projeto Supabase `ghwjetvazmdlaqidgxqi` (tabela `email_contatos`). O site público usa um projeto Supabase diferente e isolado (decisão de segurança pós-incidente de RLS de 12/07/2026) — em vez de furar esse isolamento com uma chave de banco no bundle público, a captura passa por uma Edge Function pública sem autenticação (mesmo padrão de segurança do `hermes-send`), que só ela tem acesso de escrita (via service role, do lado do servidor).

**Testado localmente (`npm run dev`, localhost:8080):**
- Build (`npm run build`) passou limpo.
- Fluxo completo testado no navegador: abrir post → clicar CTA → modal abre → preencher nome+email → submit → requisição POST confirmada (`window.fetch` interceptado) → linha inserida em `email_contatos` (confirmado via SQL, depois removida por ser só teste) → modal fecha.
- Achado durante o teste: CORS da function só liberava `realvisionmaps.com` — corrigido pra aceitar `localhost` também, senão não dava pra testar antes de publicar.

**Não feito ainda (aguardando OK do Felipe):**
- [ ] Deploy em produção (`git push`) — nada foi commitado/publicado ainda, só testado local
- [ ] Marcar `community_lead_captured` como conversão no Google Ads (troca o alvo de otimização do clique solto pro lead capturado de verdade)
- [ ] Decidir se reativa a campanha depois do deploy, e com qual ajuste (ver soluções 1/2/3 acima)

## 22/07/2026 — Deploy da squeeze page + coluna de tags em `email_contatos`

Felipe testou o modal local com sucesso (`Felipe Gracinha / dronevideomakerjeri@gmail.com`) e aprovou o deploy, junto com um pedido maior de organizar toda a base de contatos por categoria (clientes por serviço, mensalidade/anuidade a vencer, nicho como pousada, origem de campanha).

- **Migration aplicada** em `email_contatos`: coluna `tags text[] not null default '{}'` + índice GIN — cobre segmentação de contatos sem `cliente_id` (leads de blog/campanha/nicho). Segmentação de clientes existentes (tipo de serviço, mensalidade/anuidade) continua via join com `client_services`/`tasks`, sem duplicar dado.
- **Edge Function `capture-community-lead`** atualizada (v3): agora grava `tags: ['lead-<origem>']` em cada insert.
- **Deploy em produção:** commit `bcdcf58`, push feito, Vercel publicando.
- **Novo documento:** [`03-SEGMENTACAO-CONTATOS.md`](../../../marketing/email-marketing/03-SEGMENTACAO-CONTATOS.md) — taxonomia de tags + queries de segmento derivado. Skill `rv-email` atualizada com referência.
- Conversão `community_lead_captured` ainda não existe no Ads — só aparece no GA4 depois de disparar em produção pelo menos uma vez; marcar como conversão é passo manual na interface (fora do meu acesso, que é só leitura via API).

**Pendente:**
- [ ] Confirmar no GA4 que `community_lead_captured` disparou em produção, depois marcar como conversão no Ads
- [ ] Decidir se reativa a campanha SLM/LLM agora que a squeeze page está no ar
- [ ] Decidir se a linha de teste do Felipe (`dronevideomakerjeri@gmail.com`, `origem_consentimento='teste'`) fica ou é removida do banco de produção
- [ ] Reclassificar os 22 contatos `relacao_comercial` com tags de nicho — Felipe revisa cliente a cliente (não é algo pra inferir sozinho)
