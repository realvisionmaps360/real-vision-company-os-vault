# Campanha Google Ads — "SLM vs LLM" → Comunidade WhatsApp

> Primeira campanha de tráfego pago da Real Vision. Status: **em preparação, nada ativado ainda.**

## Briefing (confirmado com Felipe em 12/07/2026)

| Campo | Valor |
|---|---|
| Objetivo | Tráfego pro post "LLM x SLM" → clique no CTA → entrar no grupo de WhatsApp da comunidade |
| Não é | Geração de lead de venda nem contato comercial direto |
| Página de destino | `https://realvisionmaps.com/blog/diferenca-entre-llm-e-slm` |
| Público | Brasil inteiro, português |
| Orçamento | **R$100 total** (não é por dia) |
| Duração | 14 dias → ~R$7/dia |
| Conversão | Clique no botão "Entrar na comunidade no WhatsApp" do CTA final do post |

## Por que essa estratégia (pesquisa de palavras-chave)

Pesquisa feita com AnswerThePublic + Google Autocomplete (12/07/2026): a sigla **"SLM" sozinha é poluída** no Brasil — a maior parte do volume é sobre carro (Gol G3), escola (Maple Bear) e faculdade (São Leopoldo Mandic), nada a ver com IA. Só termos **compostos** com "LLM" ou "IA" indicam intenção real de busca sobre o assunto do post.

**Termos com intenção de IA confirmada:**
- `slm vs llm` (maior volume relativo, 40 no AnswerThePublic)
- `o que é slm e llm`
- `diferença entre llm e slm`
- `o que é slm ia`
- `o que é um llm` / `o que significa llm`
- Em inglês (buscador técnico): `slm vs llm architecture`, `slm vs llm use cases`, `slm vs llm parameter size`

**Decisão:** usar só correspondência de frase `" "` e exata `[ ]` nesses termos compostos. Nunca `[slm]` sozinho.

## Estrutura da campanha

**Tipo:** Rede de Pesquisa, criada no modo **"criar sem orientação de meta" → Tráfego do site**. As 3 metas do assistente simplificado (formulário de lead / chamadas / loja) não servem — nenhuma mede "clique pro WhatsApp".

### Grupo de anúncios A — "O que é"
Palavras-chave:
- `"o que é slm e llm"`
- `"o que é slm ia"`
- `[o que é um llm]`
- `"diferença entre llm e slm"`
- `"o que significa llm"`

### Grupo de anúncios B — "Comparação"
Palavras-chave:
- `"slm vs llm"`
- `"slm vs llm architecture"`
- `"slm vs llm use cases"`
- `"small language model vs large language model"`

### Palavras-chave negativas (aplicar na campanha inteira)
`gol`, `g3`, `maple bear`, `"são leopoldo mandic"`, `curso`, `faculdade`, `vaga`, `emprego`, `pdf`, `download`, `paper`, `artigo científico`

### Anúncios (RSA — textos finais, revisados contra VOZ.md)

**Grupo A — "O que é"**

Títulos (máx. 30 caract.):
1. `O que é SLM e LLM? Entenda` (26)
2. `Diferença entre LLM e SLM` (25)
3. `SLM na IA: o que significa` (27)
4. `LLM explicado sem jargão` (24)
5. `Real Vision explica: IA` (23)

Descrições (máx. 90 caract.):
1. `Explicamos sem jargão técnico. Leia o artigo e entre na comunidade.` (69)
2. `LLM x SLM: qual roda no seu bolso e qual mora na nuvem. Artigo grátis.` (72)

**Grupo B — "Comparação"**

Títulos (máx. 30 caract.):
1. `SLM vs LLM: a diferença real` (29)
2. `IA pequena ou IA gigante?` (26)
3. `Small Language Model direto` (28)
4. `LLM x SLM: arquitetura e uso` (28)
5. `Real Vision explica: IA` (23)

Descrições (máx. 90 caract.):
1. `Arquitetura, uso e custo: LLM x SLM comparados sem enrolação.` (63)
2. `Entenda a diferença e entre na comunidade Real Vision sobre IA.` (65)

Sem hipérboles ("incrível", "sensacional"), CTA sempre "leia/entenda" — nunca "contrate" (objetivo é comunidade, não venda).

### Extensões
Sitelink pro blog geral e pra página "Sobre". Sem extensão de chamada (não é o objetivo desta campanha).

## Tracking de conversão

- Evento GA4 **`blog_cta_whatsapp_click`** implementado em `BlogPost.tsx` (12/07/2026) — dispara em qualquer clique nos botões do CTA final do post, com `post_slug` e `button_text` (diferencia "Entrar na comunidade" de "Falar com a Real Vision"). Testado localmente, funcionando. **Ainda não publicado em produção.**
- **Bloqueio atual:** propriedade GA4 `realvisionmaps.com` (properties/506885567) **não está vinculada** à conta Google Ads 414-120-1211 (`list_google_ads_links` retornou vazio em 12/07/2026). Felipe tentando vincular via "Ferramentas → Central de dados → Conectar um produto → Google Analytics (GA4)" — modal travando em carregamento (Chrome e Firefox). Em investigação, resolver antes de marcar a conversão como principal.

## Passo a passo — criar a campanha na tela (Google Ads, conta 414-120-1211)

> Siga na ordem. Se travar em algum passo (tela diferente do esperado, botão não aparece, erro), me manda print + o número do passo — eu respondo pontual, sem precisar reexplicar tudo de novo.

**Antes de começar:** resolver o vínculo GA4 ↔ Ads (seção acima) e publicar o tracking do WhatsApp em produção. Sem isso, dá pra montar a campanha inteira mesmo assim (ela fica pausada), mas a conversão não vai aparecer até esses dois estarem prontos — não é bloqueante pra montar a estrutura.

### 1. Abrir o criador de campanha correto
1. No menu lateral, clique em **Campanhas**.
2. Clique no botão **+ Criar** (ou **+ Nova campanha**).
3. Quando aparecer a tela "Escolha uma meta para esta campanha" (a mesma dos 3 cards: Formulário de lead / Chamadas / Loja) — **não clique em nenhuma dessas três**. Procure o link/botão **"Criar uma campanha sem meta de orientação"** (costuma ficar abaixo dos cards ou como opção secundária).

### 2. Tipo de campanha e objetivo
4. Selecione tipo de campanha **Pesquisa** (Search).
5. Objetivo: **Tráfego do site**.
6. Informe a URL do site quando pedido: `https://realvisionmaps.com/blog/diferenca-entre-llm-e-slm`.

### 3. Configurações gerais da campanha
7. Nome da campanha: `RV - Blog LLM vs SLM - WhatsApp` (segue o padrão "uma campanha por objetivo" da conta).
8. Redes: deixar só **Rede de Pesquisa** marcada. Desmarcar "Rede de Display" e parceiros de pesquisa se vier marcado por padrão (evita gasto fora do Google Search).
9. Local: **Brasil** (não deixar "todos os países" nem cidade específica).
10. Idioma: **Português**.
11. Orçamento: **R$7/dia** (equivale a ~R$100 em 14 dias — ajuste manualmente se o campo pedir orçamento diário).
12. Lances: escolher a opção manual/mais simples disponível (ex: "Cliques" ou "Maximizar cliques") — **não** escolher estratégias baseadas em conversão ainda, porque a conversão não está validada.

### 4. Grupos de anúncios e palavras-chave
13. Criar o **Grupo de anúncios A** com o nome `O que é` e colar as palavras-chave da seção "Grupo de anúncios A" acima (uma por linha, já com as aspas/colchetes).
14. Criar o **Grupo de anúncios B** com o nome `Comparação` e colar as palavras-chave da seção "Grupo de anúncios B" acima.
15. Ir em **Palavras-chave negativas** (nível de campanha) e colar a lista da seção "Palavras-chave negativas" acima.

### 5. Anúncios
16. Dentro de cada grupo, clicar em **+ Anúncio → Anúncio responsivo de pesquisa**.
17. Colar os títulos e descrições da seção "Anúncios (RSA)" correspondente ao grupo (A ou B).
18. URL final do anúncio: a mesma página de destino do post.

### 6. Extensões (opcional, pode pular na primeira versão)
19. Sitelinks: blog geral (`/blog`) e página "Sobre" (`/sobre`), se quiser configurar agora — não é bloqueante pra criar a campanha pausada.

### 7. Antes de finalizar
20. Confira se a campanha está marcada como **pausada** (geralmente é o estado padrão até você clicar em "Ativar" separadamente — não clique em ativar).
21. Salve/publique a campanha pausada.
22. Me avisa que chegou até aqui — a partir daí a gente roda o checklist de pré-lançamento abaixo antes de cogitar ativar.

## Checklist de pré-lançamento

- [x] Tracking de conversão codificado e testado localmente (`blog_cta_whatsapp_click`)
- [x] Deploy do tracking em produção — publicado 12/07/2026
- [x] Vínculo GA4 ↔ Google Ads resolvido — 13/07/2026, ver detalhe abaixo
- [x] Evento marcado como conversão no GA4 e importado/marcado como principal no Google Ads — 13/07/2026, categoria "Contato"
- [x] Página de destino testada (carrega rápido, sem erro)
- [x] Orçamento confirmado: R$100 total, 14 dias — ✅ já confirmado
- [x] Palavras-chave negativas aplicadas — 13/07/2026, 12 termos em nível de Campanha
- [x] Mínimo 3 títulos + 2 descrições por grupo escritos e revisados — Grupo A "O que é" (criado 12/07) e Grupo B "Comparação" (criado 13/07)
- [ ] Extensões configuradas — não feito, não bloqueante
- [x] Campanha criada como **pausada** (nasceu ativa pelo assistente simplificado em 12/07, foi pausada manualmente pelo Felipe)
- [x] Este documento atualizado com o resultado final

## Resultado final (13/07/2026)

**Campanha ATIVADA.** Bloqueio do vínculo GA4↔Ads (linha 89 acima) resolvido: a causa raiz era que o GA4 estava vinculado à MCC `359-167-3566` e à conta `156-292-4356`, mas não à conta que roda a campanha, `414-120-1211`. Resolvido solicitando vínculo direto a essa conta e aprovando do lado do Ads. Detalhe completo do processo em [`TIMELINE.md`](../campanha-google-ads-slm-llm/TIMELINE.md), entrada de 13/07/2026.

Status confirmado via API (`mcp__google-ads-mcp__search_search`): campanha `ENABLED`, R$7/dia, 2 grupos de anúncios ativos, conversão `blog_cta_whatsapp_click` importada e marcada como principal.

Só depois desse checklist completo: perguntar "Posso ativar a campanha com R$100 total em 14 dias?" — nunca ativar como parte de outra tarefa.
