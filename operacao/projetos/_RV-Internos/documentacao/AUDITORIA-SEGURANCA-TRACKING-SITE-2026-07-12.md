# Auditoria de Segurança + Tracking do Blog — real-vision-site

## Status: ✅ Concluída (12/07/2026)

## Contexto e motivação

Preparação para a primeira campanha de tráfego pago da Real Vision (Google Ads, ver [`GOOGLE-ADS-MCP-INTEGRACAO.md`](./GOOGLE-ADS-MCP-INTEGRACAO.md)). Antes de colocar dinheiro em tráfego, Felipe pediu uma varredura de segurança e tracking do site — nada de rodar campanha sem saber se o site está seguro e se dá pra medir resultado de verdade.

Rodada via skill `improve` (`--focus security`, nível standard) no repo `real-vision-site`.

---

## 1. Skill nova criada: `rv-trafego-pago`

Local: `Real Vision/skills/rv-trafego-pago/SKILL.md`

Arquitetura de campanhas de tráfego pago (Google Ads Search), construída sobre o conhecimento de tracking da `marketing-seo`. Cobre: estrutura de conta (MCC → conta → campanha → grupo de anúncios), briefing obrigatório antes de montar campanha, checklist de pré-lançamento, e a regra inegociável de nunca ativar gasto sem aprovação explícita.

---

## 2. Achados de segurança

### 🔴 Crítico — corrigido: RLS desligado em 4 tabelas do CRM (VisionFlow)

O Supabase usado pelo site público (`ghwjetvazmdlaqidgxqi`) é o **mesmo projeto** usado pelo VisionFlow (CRM interno). A chave anon exposta no bundle JS do site público tinha acesso de leitura/escrita **irrestrito** a 4 tabelas do sistema de email marketing (Hermes):

- `email_sequencias`
- `email_contatos`
- `email_envios`
- `email_ab_testes`

Qualquer pessoa com acesso ao console do navegador no site público conseguia ler/editar essas tabelas via API REST do Supabase, sem autenticação.

**Correção aplicada** (migration `enable_rls_email_marketing_tables`): RLS ativado nas 4 tabelas, com o mesmo padrão de policy já usado em `clients`/`finances`/`files` — leitura para qualquer usuário autenticado permitido (`is_allowed_user()`), escrita só para admin (`is_admin()`). Nenhum script de automação do Hermes foi encontrado usando a chave anon nessas tabelas, então o risco de quebra é baixo.

### 🟠 Corrigido: `blog_comments` sem proteção contra spam

A policy de INSERT só validava `likes = 0` — sem rate limit, sem CAPTCHA. O honeypot do formulário era só client-side, contornável chamando a API do Supabase direto.

**Correção aplicada** (migration `rate_limit_blog_comments`): tabela de controle isolada (`blog_comments_rate_limit`, sem nenhuma policy — inacessível de fora) + trigger `BEFORE INSERT` que limita 3 comentários por IP a cada 10 minutos. O IP nunca é armazenado em texto puro, só o hash SHA-256.

### 🟡 Não corrigido ainda — dependências

`npm audit` apontou 9 vulnerabilidades (6 high, 3 moderate) em dependências transitivas de build (`minimatch`, `lodash`, `postcss`, `yaml`) — nenhuma afeta o runtime do site publicado. Corrigível com `npm audit fix` quando for conveniente.

### 🟡 Não corrigido ainda — headers de segurança

`vercel.json` não define CSP, X-Frame-Options, X-Content-Type-Options nem Referrer-Policy. Baixo risco hoje, mas vale endereçar antes do volume de tráfego pago crescer.

---

## 3. Tracking de leitura do blog (GA4)

Antes: GA4 só registrava pageview — sabia que a pessoa **entrou** no post, não se **leu**.

Implementado em `src/pages/BlogPost.tsx` (useEffect novo, sem alterar nada mais do componente): eventos customizados via `gtag`:

- `blog_scroll_depth` — dispara em 25%, 50%, 75% e 100% de rolagem (uma vez cada, por post)
- `blog_post_read` — dispara quando o leitor passa de 75% de rolagem **e** ficou pelo menos 15 segundos na página (sinal combinado, evita falso positivo de quem só rolou rápido até o fim)

Ambos os eventos carregam `post_slug`, permitindo montar público de remarketing por post específico no Google Ads (ex: "quem leu o post sobre LLM x SLM").

**Testado em navegador real** (dev server local): os 5 eventos dispararam corretamente, uma única vez cada, sem duplicação — confirmado inspecionando `window.dataLayer`.

**Próximo passo pra ativar remarketing de verdade**: confirmar que a propriedade GA4 está linkada à conta de anúncio Google Ads (`mcp__google-analytics__list_google_ads_links`) e marcar `blog_post_read` como conversão no Google Ads — ainda não feito, depende da conta de anúncio existir (ver próximos passos do doc de integração).

---

## Referências

- [`GOOGLE-ADS-MCP-INTEGRACAO.md`](./GOOGLE-ADS-MCP-INTEGRACAO.md) — status da integração Google Ads
- Skill `rv-trafego-pago` — `Real Vision/skills/rv-trafego-pago/SKILL.md`
- Skill `marketing-seo` — base de tracking/SEO usada como pré-requisito
