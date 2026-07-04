# Marketing + Criativos — Google Ads + Higgsfield + Blog

> Estratégia completa de aquisição paga + produção de criativos visuais + conteúdo SEO.

## Funil completo

```
[Anúncio Google] → [Página /socio-digital] → [Form diagnóstico] →
[Call 30min] → [Proposta] → [Pagamento setup] →
[Implementação 4h] → [Cliente ativo + MRR]
```

### Métricas alvo por etapa (D+30)

| Etapa | Métrica alvo |
|---|---|
| Impressão → Clique | CTR > 2% (Search) / > 1% (Performance Max) |
| Clique → Form submetido | > 5% |
| Form → Call agendada | > 60% |
| Call → Proposta aceita | > 30% |
| Proposta → Pagamento setup | > 80% (já filtrado) |

**Custo por lead alvo:** < R$ 100
**Custo por cliente alvo:** < R$ 700 (CAC), payback em 2 meses

---

## Estratégia Google Ads

### Campanha 1 — Search (Pesquisa)

**Objetivo:** capturar intenção ativa (pessoa já está procurando solução).

**Grupos de anúncios:**

#### Grupo "IA para empresas"
- **Keywords (phrase + exact):**
  - "ia para pequena empresa"
  - "ia empresarial"
  - "automatizar minha empresa com ia"
  - "contratar ia para empresa"
  - "chatgpt para empresa"
  - "claude para empresa"
- **Lance:** CPC manual com cap R$ 4,00
- **Negative keywords:** "grátis", "tutorial", "curso", "gratis", "free"

#### Grupo "Automação de tarefas"
- **Keywords:**
  - "automatizar tarefas repetitivas"
  - "software automação empresarial"
  - "ferramenta para automatizar trabalho"
  - "como automatizar processos da empresa"
- **Lance:** CPC R$ 3,00

#### Grupo "Funcionário digital / Assistente virtual"
- **Keywords:**
  - "assistente virtual empresa"
  - "funcionário digital"
  - "secretária virtual ia"
  - "trabalhador digital"
- **Lance:** CPC R$ 3,50

#### Grupo "Nicho — Pousada/Restaurante"
- **Keywords:**
  - "ia para pousada"
  - "automação pousada"
  - "ia para restaurante"
  - "automação restaurante"
- **Lance:** CPC R$ 5,00 (nicho específico converte mais)

**Responsive Search Ads — 15 headlines + 4 descriptions por grupo:**

Pool de headlines:
1. Sócio Digital — IA na sua empresa
2. Implementação Remota em 4h
3. Tenha uma IA que conhece sua empresa
4. R$ 2.500 + R$ 400/mês
5. Diagnóstico Grátis 30min
6. Para Pousadas, Restaurantes, E-commerce
7. Real Vision | Sócio Digital
8. IA que executa pela sua empresa
9. Treinamento ao vivo incluso
10. Sem instalar nada — fazemos remoto
11. Hospedagem premium inclusa
12. Cancele quando quiser
13. Sem fidelidade
14. Garantia de 7 dias
15. Atendimento humano direto

Pool de descriptions:
1. Tenha um Sócio Digital que executa pela sua empresa. Implementação remota em 4h. Diagnóstico grátis.
2. IA personalizada pro seu negócio, treinamento ao vivo, acompanhamento mensal. A partir de R$ 400/mês.
3. Não é ChatGPT genérico. É uma IA que conhece sua empresa, seu tom, seus clientes. Fale com a gente.
4. Pousada, restaurante, e-commerce, festival, agência. Sócio Digital pro seu nicho. Comece com diagnóstico grátis.

**Sitelink extensions:**
- Como funciona → /socio-digital#como-funciona
- Pricing → /socio-digital#tiers
- FAQ → /socio-digital#faq
- Diagnóstico grátis → /socio-digital#cta

**Callout extensions:**
- Implementação em 4h
- Hospedagem inclusa
- Suporte ao vivo
- Garantia de 7 dias
- Sem fidelidade

**Structured snippet extensions:**
- Serviços: Pousada, Restaurante, E-commerce, Festival, Agência
- Marcas: Real Vision, Sócio Digital, Vision Cloud

### Campanha 2 — Performance Max

**Objetivo:** capturar demanda latente em todos os canais Google (YouTube, Display, Discover, Maps, Search).

- **Audiência custom:** "pessoas que pesquisaram automação empresarial nos últimos 30 dias"
- **Sinais de audiência adicionais:** segmento "donos de pequenos negócios", interesses "marketing digital", "empreendedorismo", "tecnologia"
- **Assets necessários:**
  - 5 imagens horizontais (1.91:1)
  - 5 imagens quadradas (1:1)
  - 5 imagens verticais (4:5)
  - 5 vídeos (mix de 16:9, 9:16, 1:1)
  - 5 logos
  - 5 headlines curtos (até 30 chars)
  - 5 headlines longos (até 90 chars)
  - 4 descriptions
- **Final URL:** `/socio-digital`
- **Conversão alvo:** "diagnostico_agendado" (configurado no GA4)

### Campanha 3 — YouTube Ads (futura, fase 2)

**Objetivo:** awareness + remarketing pra quem visitou a landing mas não converteu.

- Vídeo de 15–30s com hook forte ("Você tá fazendo trabalho que uma IA podia fazer")
- Skippable in-stream
- Audiência: visitantes do site + lookalike + custom intent

### Orçamento sugerido (primeiros 30 dias)

| Campanha | Orçamento mensal | Lance médio |
|---|---|---|
| Search | R$ 1.500 | CPC R$ 3–5 |
| Performance Max | R$ 1.500 | CPA alvo R$ 250 |
| **Total** | **R$ 3.000** | — |

**Meta:** 30 leads no mês 1 (CPL R$ 100), 10 calls feitas, 3 propostas, 1 cliente fechado.

### Tags de conversão obrigatórias (antes de ligar a campanha)

- GA4 instalado + evento `diagnostico_agendado` no submit do form
- Pixel Facebook instalado (pra remarketing futuro)
- Google Ads tag de conversão configurada (puxa do GA4)
- LinkedIn Insight tag (futura, fase 2)

---

## Criativos com Higgsfield (via MCP)

### Stack disponível (confirmado 2026-05-24)

| Modelo | Provider | Tipo | Uso recomendado |
|---|---|---|---|
| Marketing Studio Image | Higgsfield | Imagem 1k–4k | Anúncios estáticos, todas aspect ratios |
| Marketing Studio Video | Higgsfield | Vídeo 4–15s | TikTok/Reels/Shorts ready, áudio opcional |
| Seedance 2.0 | Bytedance | Vídeo | Identidade consistente, multi-cena |
| GPT Image 1.5 | OpenAI | Imagem | Melhor pra renderizar texto na imagem |
| Nano Banana Pro | Google | Imagem 4k | Fotorrealismo premium |
| Grok Imagine | xAI | Vídeo | Text/image to video com áudio |

### Setup inicial (Etapa 1 da execução)

```
# 1. Brand kit Real Vision
show_marketing_studio({
  action: 'create',
  type: 'brand_kit',
  brand_kit: {
    brand_name: 'Real Vision',
    tagline: 'Sócio Digital — o parceiro de IA que executa pela sua empresa',
    industry: 'Tecnologia / Marketing Digital',
    tone_of_voice: ['direto', 'técnico', 'sem rodeios', 'premium'],
    brand_values: ['execução', 'transparência', 'autonomia do cliente'],
    colors: [<paleta de contexto/DESIGN.md>],
    fonts: [<fontes de contexto/DESIGN.md>],
    website_url: 'https://realvisionmaps.com',
    social_links: { youtube: 'https://www.youtube.com/@RealVisionMaps' }
  }
})

# 2. Avatar Felipe (uploadar foto via media_upload primeiro)
show_marketing_studio({
  action: 'create',
  type: 'avatar',
  avatars: [{
    name: 'Felipe Garcia',
    medias: [{ value: '<media_id da foto>', url: '<url>' }]
  }]
})

# 3. Webproduct "Sócio Digital"
show_marketing_studio({
  action: 'fetch',
  type: 'webproduct',
  url: 'https://realvisionmaps.com/socio-digital'
})
```

### 10 conceitos de criativo (briefings prontos)

#### Conceito 1 — "O computador trabalhando sozinho" (vídeo)

- **Modelo:** Marketing Studio Video
- **Formato:** 9:16, 8s, áudio gerado
- **Cena:** Dono de empresa olha pro computador. Tela mostra atividades acontecendo sozinhas (e-mails sendo respondidos, posts criados, planilhas se preenchendo). Time-lapse acelerado.
- **Voz over:** "Enquanto você toca seu negócio, seu Sócio Digital executa."
- **Texto na tela:** "Tem IA fazendo trabalho da sua empresa agora?"
- **CTA:** "Quero meu Sócio Digital" → /socio-digital
- **Canais:** YouTube Shorts, Performance Max, Reels (fase 2)

#### Conceito 2 — "Versus estagiário" (imagem)

- **Modelo:** GPT Image 1.5 (precisa renderizar texto bem)
- **Formato:** 1:1 + variação 4:5
- **Layout:** Split vertical
  - Esquerda: foto de estagiário cansado, balão com lista de tarefas pendentes
  - Direita: ícone de IA, mesma lista mas tudo com checkmark verde
- **Headline:** "Estagiário: R$ 2.500/mês. Sócio Digital: R$ 400/mês. Mesmo trabalho."
- **Canais:** Display, Performance Max

#### Conceito 3 — "A IA que conhece sua empresa" (vídeo)

- **Modelo:** Marketing Studio Video
- **Formato:** 1:1, 6s
- **Cena:** Zoom em telinha de chat. Pergunta: "Quantas reservas tivemos no fim de semana?" Resposta da IA detalhada e contextual com nomes e datas reais (simulados).
- **Texto na tela:** "Não é ChatGPT genérico. É um Sócio Digital treinado pra sua empresa."
- **Canais:** Performance Max, Display

#### Conceito 4 — "Implementação em 4h" (imagem)

- **Modelo:** Nano Banana Pro (fotorrealismo)
- **Formato:** 16:9 + 1:1
- **Cena:** Relógio analógico mostrando 4 horas + laptop sendo configurado + ícone de checkmark grande
- **Headline:** "Em 4 horas, você tem uma IA rodando na sua empresa."
- **Subheadline:** "Sem instalar nada, sem aprender nada complicado. A gente faz tudo remoto."
- **Canais:** Display, Performance Max

#### Conceito 5 — "Para pousadas" (vídeo nicho)

- **Modelo:** Marketing Studio Video
- **Formato:** 9:16, 10s
- **Cena:** Pousada à beira-mar (Itacaré como referência visual — palmeiras, redes, vista pro mar). Tela do laptop mostrando reviews sendo respondidos, posts sendo criados.
- **Voz over:** "Sua pousada precisa de um Sócio Digital."
- **Texto na tela:** "Reviews respondidos, posts criados, hóspedes reativados — sem você levantar da rede."
- **Canais:** YouTube Shorts, Reels (segmentação geográfica BA)

#### Conceito 6 — "Para restaurantes" (vídeo nicho)

- **Modelo:** Marketing Studio Video
- **Formato:** 9:16, 8s
- **Cena:** Cozinha de restaurante movimentada (panelas, vapor, movimento). Tela do tablet exibindo IA gerenciando pedidos, respondendo avaliações.
- **Voz over:** "Sua cozinha tá lotada. Seu Sócio Digital tá respondendo as avaliações."
- **Canais:** YouTube Shorts, Performance Max

#### Conceito 7 — "Day in the life com IA" (vídeo)

- **Modelo:** Marketing Studio Video ou Seedance 2.0 (consistência de personagem)
- **Formato:** 9:16, 12s
- **Cena:** 4 momentos do dia do dono — café da manhã (delega tarefa), reunião (delega outra), almoço (delega outra), fim do dia (vê tudo feito).
- **Texto final:** "Um dia comum com um Sócio Digital."
- **Canais:** YouTube Ads in-stream, Performance Max

#### Conceito 8 — "9 tarefas em 4 minutos" (imagem)

- **Modelo:** Marketing Studio Image
- **Formato:** 1:1 + 4:5
- **Layout:** Grid 3x3 com 9 ícones de tarefas (responder e-mail, criar post, gerar relatório, atualizar site, responder review, etc) — todos com checkmark verde brilhante
- **Headline:** "9 tarefas. 4 minutos. 1 Sócio Digital."
- **Canais:** Display, Performance Max

#### Conceito 9 — "Felipe testimonial" (vídeo)

- **Modelo:** Marketing Studio Video usando avatar Felipe
- **Formato:** 9:16, 15s + variação 16:9 pra YouTube
- **Cena:** Felipe falando direto pra câmera (talking head, fundo gradient Real Vision)
- **Roteiro:** "Sou Felipe Garcia, fundador da Real Vision. Há 6 meses instalei um Sócio Digital na minha própria empresa. Hoje delego 80% das tarefas operacionais e foco em estratégia. Quer que a gente faça o mesmo com a sua?"
- **CTA na tela:** "Agendar diagnóstico grátis"
- **Canais:** YouTube Ads in-stream, Reels (fase 2)

#### Conceito 10 — "Comparativo financeiro" (imagem)

- **Modelo:** GPT Image 1.5 (precisa de tabela bem renderizada)
- **Formato:** 1:1 + 4:5
- **Layout:** Tabela comparando 3 opções
  - Colunas: Funcionário CLT | Estagiário | **Sócio Digital**
  - Linhas: Custo mensal | Horas trabalhadas | Férias | Atestado | Treinamento | Escalabilidade | Custo de demissão
- **Headline:** "Faça as contas."
- **Conclusão visual:** coluna Sócio Digital toda em verde, vencendo em todas as linhas
- **Canais:** Display, Performance Max

### Aspect ratios necessários por canal

| Canal | Formato | Aspect ratio |
|---|---|---|
| Google Search | Texto apenas | — |
| Google Display | Banner/imagem | 1.91:1, 1:1, 4:5 |
| YouTube Ads in-stream | Vídeo | 16:9 |
| YouTube Shorts | Vídeo | 9:16 |
| Performance Max | Mix | Todos os acima |
| Remarketing display | Banner | 300x250, 728x90, 160x600 |
| Instagram Feed (fase 2) | Imagem/vídeo | 1:1 ou 4:5 |
| Instagram Stories/Reels (fase 2) | Vídeo | 9:16 |

### Cronograma de produção dos criativos

| Semana | Output |
|---|---|
| 1 | Brand kit + avatar Felipe + 3 imagens estáticas (conceitos 2, 4, 8) |
| 2 | 3 vídeos curtos (conceitos 1, 3, 9) |
| 3 | 4 vídeos nicho (conceitos 5, 6, 7, 10 — onde aplicável) |
| 4 | Iteração baseada em métricas das primeiras semanas de campanha |

### Validação antes de subir nas campanhas

Pra cada criativo, usar `virality_predictor` do Higgsfield (se disponível pro tipo de conteúdo) e descartar criativos com score abaixo de X (definir após teste).

### Onde salvar os criativos prontos

`operacao/projetos/socio-digital/criativos-higgsfield/`
- `imagens/`
- `videos/`
- `LOG.md` (registro de cada criativo gerado: id, aspect ratio, conceito, canal, status)

---

## Blog Posts (4 posts iniciais)

Pipeline completo em [`../BLOG-POSTS-PIPELINE.md`](../BLOG-POSTS-PIPELINE.md). Resumo:

### Post 1 — Conceito (tráfego frio)

**Título:** "Como pequenas empresas estão substituindo planilhas e tarefas manuais por um Sócio Digital"

- 1.500 palavras
- 5 H2s
- 1 case (Real Vision como exemplo)
- FAQ schema (3 perguntas)
- Internal link: 3x pra /socio-digital
- CTA final: "Agendar diagnóstico grátis"

### Post 2 — Custo (conversão)

**Título:** "Por que ter um Sócio Digital custa 10x menos que contratar um estagiário (e trabalha 24h)"

- 1.500 palavras
- Tabela comparativa estagiário vs Sócio Digital
- Cálculo ROI mês a mês
- Internal link: 3x pra /socio-digital
- CTA: "Calcule sua economia + agende diagnóstico"

### Post 3 — Case (prova social)

**Título:** "O fim das tarefas repetitivas: como instalei um Sócio Digital na minha empresa e economizei 20h/semana"

- 1.800 palavras
- 1ª pessoa (Felipe)
- Prints e exemplos reais
- Estrutura: antes / durante / depois
- CTA: "Quero o mesmo na minha empresa"

### Post 4 — Vision Cloud (fase 2, pós-lançamento)

**Título:** "Vision Cloud: a hospedagem premium da Real Vision (rápida, segura, sem burocracia)"

- Apresenta marca Vision Cloud sem expor stack
- Como a Real Vision assume toda burocracia técnica
- CTA: /socio-digital (Vision Cloud incluso) ou /vision-cloud (futuro)

---

## Calendário sugerido de lançamento

| Semana | Marketing |
|---|---|
| 1 | Página `/socio-digital` publicada |
| 2 | Post 1 publicado + share orgânico LinkedIn/WhatsApp |
| 3 | Post 2 publicado + começa produção criativos Higgsfield |
| 4 | Post 3 publicado + campanha Search Google Ads no ar |
| 5 | Performance Max ligado (criativos prontos) |
| 6 | Iteração: pausa criativos ruins, escala bons |
| 7 | 1º cliente fechado (meta) |
| 8 | Post 4 (Vision Cloud) + estudo de caso piloto publicado |
