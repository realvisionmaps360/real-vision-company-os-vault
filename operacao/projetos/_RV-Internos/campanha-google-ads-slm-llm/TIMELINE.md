# Timeline — Campanha Google Ads "SLM vs LLM" → Comunidade WhatsApp

Primeira campanha de tráfego pago da Real Vision. Ver briefing completo em [`CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md`](../documentacao/CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md).

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
