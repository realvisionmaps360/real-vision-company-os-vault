# Nova Arquitetura da Home — Real Vision

> **Data:** 2026-05-25
> **Fase:** 2 de 4 (arquitetura de seções)
> **Input:** AUDITORIA-HOME.md + CRO framework + F-pattern + funil de conversão
> **Objetivo:** definir a ordem, função e lógica de cada seção da nova home
> **Decisões base confirmadas:**
> - Objetivo: conversão direta de venda
> - Sócio Digital: protagonista absoluto
> - Idiomas: PT-BR agora, trilíngue (PT/EN/DE) depois

---

## Princípio orientador

A home nova segue uma jornada psicológica em 5 zonas:

```
ZONA 1 — GANCHO       → "Isso é pra mim?"           (3 segundos acima do fold)
ZONA 2 — DESEJO       → "Quero isso"                 (scroll 1–2)
ZONA 3 — CONFIANÇA    → "Eles entregam mesmo"        (scroll 3–4)
ZONA 4 — DECISÃO      → "Faz sentido pra mim"        (scroll 5–6)
ZONA 5 — CONVERSÃO    → "Vou falar com eles"         (scroll 7)
```

A visita fria termina em lead qualificado ou compra direta. Cada seção serve a uma etapa — nenhuma seção existe por estética.

---

## Mapa de seções — ordem definitiva

| # | Seção | Zona | Objetivo CRO |
|---|---|---|---|
| 0 | NAV | — | Orientação + CTA sempre visível |
| 1 | HERO | 1 | Ganchar em 5s, qualificar, converter ou empurrar pro scroll |
| 2 | BARRA DE NÚMEROS | 1/2 | Prova social imediata (quem rola após hero) |
| 3 | SÓCIO DIGITAL | 2 | Lançar o 6º pilar, gerar desejo, capturar intenção |
| 4 | SERVIÇOS | 2/3 | Mostrar o ecossistema completo (Sócio Digital lidera) |
| 5 | PORTFÓLIO | 3 | Prova de entrega real — "eles já fizeram" |
| 6 | DEPOIMENTOS | 3 | Voz do cliente — "eles entregam mesmo" |
| 7 | COMO FUNCIONA | 3/4 | Tirar ansiedade do processo — "é simples começar" |
| 8 | PARA QUEM É | 4 | Qualificar + criar identificação imediata |
| 9 | BLOCO FELIPE | 4 | Autoridade do fundador — "sei de onde veio isso" |
| 10 | FAQ | 4 | Tratar objeções restantes antes de pedir a ação |
| 11 | CTA FORM | 5 | Converter com baixa fricção |
| 12 | LOJA | — | Diversificação de receita para quem não converteu |
| 13 | FOOTER | — | Orientação final + contato + social |

---

## Seção a seção — especificação funcional

---

### 0 · NAV

**Função:** orientação permanente + CTA sempre acessível

**Elementos obrigatórios:**
- Logo Real Vision (esquerda)
- Menu: Serviços / Portfólio / Sócio Digital / Blog / Contato
- CTA fixo à direita: **"Falar com Felipe"** (abre WhatsApp ou ancora pro form)
- Placeholder visual do seletor de idioma (ícone de globo cinza/desabilitado) — anotação interna: ativar na iteração i18n

**Comportamento:** sticky no scroll, com leve blur no fundo (glass morphism sobre o dark)

**Nota CRO:** o "Falar com Felipe" no nav deve estar em todos os breakpoints. Em mobile, colapsa o menu mas o CTA permanece visível.

---

### 1 · HERO

**Função:** ganchar em 5 segundos, comunicar proposta única, empurrar para a próxima seção ou converter direto

**Headline (a definir na Fase 3, estrutura abaixo):**
- Formato: **resultado concreto + para quem**
- Padrão: *"[Resultado mensurável] para [tipo de negócio] — sem [dor]"*
- Não pode ser genérica: "presença digital forte" está proibida

**Subheadline:** 1 frase. Não uma lista. Comunica o método ou diferencial principal.

**CTA primário (1 único):** botão grande, cor de destaque — copy com verbo + benefício implícito
- Candidatos para Fase 3: "Quero minha presença digital", "Falar com Felipe agora", "Ver como funciona"
- Descartar: "Solicitar Orçamento" (fraco, não promete nada)

**CTA secundário (menor, menor peso):** "Ver projetos" → ancora na seção de portfólio

**Visual:** tour 360° Universo Paralello permanece (diferencial visual único, mantido da auditoria)

**Social proof acima do fold (abaixo dos CTAs):**
- 3 micro-KPIs em linha: ex: `30+ projetos entregues · 10+ cidades · 1º cliente internacional`
- Não usar "100% satisfeitos" (auditoria identificou como genérico inaceitável)

**Nota CRO:** nenhuma menção a lista de serviços aqui. Hero faz UMA coisa: ganha a atenção e direciona.

---

### 2 · BARRA DE NÚMEROS

**Função:** ancorar credibilidade antes que o visitante role para o conteúdo principal

**Formato:** barra horizontal, fundo diferenciado (ligeiramente mais claro ou com borda), 4–5 métricas em linha

**Métricas candidatas (verificáveis — a confirmar com Felipe):**
- `30+` tours publicados no Google Street View
- `10+` cidades atendidas
- `5+` segmentos de negócio
- `1` cliente internacional (Suíça)
- `desde 2022` (ou ano de fundação real)

**Nota:** nenhum número inventado. Se algum não for verificável, cortar. Menos mas verdadeiro.

---

### 3 · SÓCIO DIGITAL ⭐ (seção protagonista)

**Função:** lançar o 6º pilar, criar desejo, capturar intenção de compra

**Por que vem antes dos outros serviços:** é o produto de maior receita recorrente, o mais diferenciado e o que tem menos concorrência direta no Brasil. Merece visibilidade máxima enquanto o visitante ainda está quente.

**Estrutura da seção:**

**Bloco de abertura:**
- Tag: `NOVO` ou `LANÇAMENTO`
- Headline da seção: algo como *"Seu primeiro funcionário digital — trabalha 24h, não tira férias, conhece sua empresa de cor"*
- Sub: promessa em 2 linhas

**Três cards de tier (side-by-side ou accordion no mobile):**

| Tier | Setup | Mensal | Destaque |
|---|---|---|---|
| Essencial | R$ 2.500 | R$ 400/mês | 1 pessoa |
| Profissional | R$ 4.500 | R$ 800/mês | 2–4 pessoas ⭐ Mais escolhido |
| Empresarial | R$ 8.000 | R$ 1.500/mês | 5+ pessoas |

- Todos incluem: hospedagem Vision Cloud + implementação ao vivo + acompanhamento mensal
- Destacar o Profissional como recomendado (âncora de preço)

**CTA específico:** "Quero meu Sócio Digital" → abre diagnóstico (call ou form, a decidir por Felipe)

**Nota de design:** seção com identidade visual própria dentro do dark theme — pode ter fundo levemente diferente, ícone ou mascote da IA, cor de destaque própria.

---

### 4 · SERVIÇOS

**Função:** mostrar o ecossistema completo — visitante entende que Real Vision é sistema, não serviço isolado

**Estrutura:**
- 6 cards (Sócio Digital em destaque — card maior, posição de liderança)
- Os 5 originais: Sites / Google Meu Negócio / Tour 360° / Foto & Drone / Automações IA
- Cada card: ícone + nome do serviço + 1 frase de benefício (não feature) + CTA específico

**CTA de cada card deve ser específico:**
- Sites → "Ver projetos de site"
- Tour 360° → "Ver tour ao vivo"
- Sócio Digital → "Conhecer planos"
- (não todos "Saiba mais")

**Hierarquia visual obrigatória:** Sócio Digital não pode ter o mesmo peso que os outros 5. Grid assimétrico: 1 card grande (Sócio Digital) + 5 cards normais.

---

### 5 · PORTFÓLIO

**Função:** prova de entrega real — "eles já fizeram isso pra alguém como eu"

**Manutenção da estrutura atual + adições:**
- Manter Universo Paralello (cliente reconhecido)
- **Adicionar Solarium Aarau** — primeiro case internacional, diferencial global
- Manter diversidade de segmentos

**Organização sugerida:** filtros por categoria (Tour 360° / Site / Sistema Integrado) — permite que visitante veja só o que interessa

**CTA pós-portfólio:** obrigatório — "Quero um projeto assim" → ancora no form

---

### 6 · DEPOIMENTOS

**Função:** voz do cliente — diminui risco percebido, aumenta confiança

**Estado atual:** REFAZER — Mariana/Carlos/Ana são placeholders que não correspondem a clientes reais

**Versão nova:**
- Pedir 3–5 depoimentos a clientes reais: Universo Paralello, Vila Mandela, Solarium Aarau, Casa Amarela, Barra Club
- Formato ideal: foto do cliente + nome + empresa + depoimento específico (com número ou resultado mencionado)
- Se não tiver depoimentos reais prontos no momento do redesign: **remover a seção** ou exibir 1 real com nota "Mais em breve"

**Nunca:** depoimentos genéricos sem atribuição real. Quebra confiança se o visitante perceber.

---

### 7 · COMO FUNCIONA

**Função:** tirar ansiedade do processo — "é simples começar"

**Posição:** movido para depois do portfólio (auditoria identificou que vinha cedo demais — o interesse precisa estar aquecido primeiro)

**Estrutura:** mantém as 4 etapas originais + copy melhorado
1. Diagnóstico
2. Planejamento
3. Produção
4. Entrega e Suporte

**Melhoria de copy:** cada etapa ganha 2–3 linhas explicando o que o cliente recebe nessa fase (não só o nome da etapa)

---

### 8 · PARA QUEM É / PARA QUEM NÃO É

**Função:** qualificação — visitante se identifica, lead ruim se filtra sozinho

**Formato:** duas colunas

| ✅ É pra você se... | ❌ Não é pra você se... |
|---|---|
| Tem negócio físico com público local | Quer só um logo bonito |
| Quer ser encontrado no Google primeiro | Não investe em presença digital |
| Precisa de resultado, não de promessa | Quer fazer tudo na base do improviso |
| Está em Bahia, São Paulo, ou no exterior | Busca o mais barato do mercado |

**Efeito psicológico:** exclusividade + qualificação + filtragem natural de leads ruins

**Nota:** adaptar copy final à VOZ Real Vision (direto, sem hipérbole)

---

### 9 · BLOCO FELIPE

**Função:** autoridade do fundador — quem está por trás, por que confiar

**Narrativa:** trajetória real de Local Guide → câmera 360° → drone → vibe coder → engenheiro de IA → fundador da Real Vision

**Elementos:**
- Foto do Felipe (pode ser a foto dele + Romana ou só ele nesse bloco)
- Texto curto: 3–4 linhas, primeira pessoa ou terceira, na VOZ da Real Vision
- Credenciais verificáveis: "Local Guide nível X / X tours no Street View / 1 cliente internacional"
- 1 frase de posicionamento pessoal (a definir na Fase 3)

**Nota:** NÃO é "sobre a empresa" genérico. É "por que o Felipe construiu isso e por que ele é a pessoa certa para o seu negócio."

---

### 10 · FAQ

**Função:** tratar objeções restantes antes de pedir a ação final

**Perguntas obrigatórias (a redigir na Fase 3):**

1. Vocês atendem minha cidade / meu segmento?
2. Qual o prazo de entrega?
3. Preciso contratar tudo junto ou posso começar por um serviço?
4. O que é o Sócio Digital — é um robô ou um serviço?
5. Qual o investimento mínimo?
6. Tenho garantia de resultado?
7. Como funciona o suporte depois da entrega?

**Formato:** accordion (expandível) — não mostra tudo de uma vez, reduz carga visual

---

### 11 · CTA FORM

**Função:** conversão — transformar o visitante aquecido em lead qualificado

**Manter:**
- Baixa fricção
- Headline de valor: "Pronto para fortalecer sua presença digital?" (ou variação melhorada na Fase 3)
- Promessa de tempo de resposta: "em até 24h úteis"

**Adicionar (necessário para poder responder o lead):**
- Campo: **Nome** (obrigatório)
- Campo: **WhatsApp ou E-mail** (obrigatório — sem isso o form é inútil)
- Campo: **Cidade** (manter — qualifica geograficamente)
- Campo: **Que tipo de negócio você tem?** (dropdown, opcional — pousada / restaurante / evento / outro)

**CTA do botão:** não "Enviar" nem "Solicitar Orçamento" — usar verbo de valor (a definir na Fase 3)

**Nota:** 4 campos continua sendo baixa fricção se o layout for limpo. 5+ seria alto. Ficamos em 4.

---

### 12 · LOJA

**Função:** diversificação de receita — visitante que não comprou serviço pode comprar equipamento ou curso

**Manter:** box atual "Equipamentos, Serviços e Formação 360" + "Visitar Loja"

**Posição:** logo antes do footer — quem chegou até aqui e ainda não converteu tem uma última opção de engajamento

---

### 13 · FOOTER

**Função:** orientação final, contato, social

**Correções obrigatórias:**
- Alinhar email: usar `adm@realvisionmaps.com` (verificar com Felipe qual é o oficial)
- Adicionar YouTube: https://www.youtube.com/@RealVisionMaps
- Adicionar LinkedIn (se existir)
- Manter Instagram

**Adicionar:**
- CTA secundário no footer: "Fale com a gente" → WhatsApp ou form anchor
- Links rápidos: Serviços / Portfólio / Sócio Digital / Blog

---

## Visualização da ordem de scroll

```
┌─────────────────────────────────────────┐
│  NAV  [Logo] [Menu] [Falar com Felipe]  │  ← sticky
├─────────────────────────────────────────┤
│                                         │
│  HERO                                   │  ← ABOVE THE FOLD
│  Headline forte + 1 CTA + 3 KPIs       │
│                    [tour 360° direita]  │
│                                         │
├─────────────────────────────────────────┤
│  BARRA DE NÚMEROS                       │  ← credibilidade imediata
│  30+ projetos · 10+ cidades · Suíça     │
├─────────────────────────────────────────┤
│                                         │
│  SÓCIO DIGITAL ⭐  [NOVO]              │  ← protagonista
│  Headline lançamento                    │
│  [Essencial] [Profissional★] [Empresarial] │
│  [CTA: Quero meu Sócio Digital]         │
│                                         │
├─────────────────────────────────────────┤
│  SERVIÇOS (6 pilares)                   │  ← ecossistema
│  [SD grande] [Sites][GMN][360][Foto][IA] │
├─────────────────────────────────────────┤
│                                         │
│  PORTFÓLIO                              │  ← prova real
│  [UP] [Solarium🇨🇭] [Vila Mandela] [+]  │
│  [CTA: Quero um projeto assim]          │
│                                         │
├─────────────────────────────────────────┤
│  DEPOIMENTOS                            │  ← voz do cliente
│  (reais ou removida)                    │
├─────────────────────────────────────────┤
│  COMO FUNCIONA (4 etapas)               │  ← tirar ansiedade
├─────────────────────────────────────────┤
│  PARA QUEM É / NÃO É                   │  ← qualificação
├─────────────────────────────────────────┤
│  BLOCO FELIPE                           │  ← autoridade
├─────────────────────────────────────────┤
│  FAQ (accordion)                        │  ← objeções
├─────────────────────────────────────────┤
│                                         │
│  CTA FORM                               │  ← CONVERSÃO
│  Nome + WhatsApp + Cidade + Negócio     │
│  [CTA forte]                            │
│                                         │
├─────────────────────────────────────────┤
│  LOJA                                   │  ← diversificação
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  Links + Email correto + YT + LI + IG  │
└─────────────────────────────────────────┘
```

---

## Blog — decisão de posição

O blog NÃO entra na home como seção. Razões:
1. Tira o visitante do funil de conversão
2. A home tem objetivo único: conversão direta
3. Blog é ativo de SEO orgânico, não de conversão

**Posição correta:** link no menu de navegação (Serviços / Portfólio / Blog / Contato) + link no footer. Quem quer ler, encontra. Quem está na home, converte.

---

## Seções novas vs. existentes — resumo

| Seção | Status |
|---|---|
| NAV | Ajustar (+ CTA fixo + placeholder idioma) |
| HERO | Refazer completamente |
| BARRA DE NÚMEROS | Criar do zero |
| SÓCIO DIGITAL | Criar do zero (protagonista) |
| SERVIÇOS | Reestruturar (hierarquia + Sócio Digital) |
| PORTFÓLIO | Manter + enriquecer (Solarium Aarau + CTA pós) |
| DEPOIMENTOS | Refazer com reais (ou remover temporariamente) |
| COMO FUNCIONA | Manter + melhorar copy + mover posição |
| PARA QUEM É | Criar do zero |
| BLOCO FELIPE | Criar do zero |
| FAQ | Criar do zero |
| CTA FORM | Ajustar (+ Nome + WhatsApp) |
| LOJA | Manter |
| FOOTER | Ajustar (email + redes + CTA secundário) |
| BLOG na home | Remover (mover pro menu/footer) |

---

## Próximo passo

**Fase 3 — Copy de cada seção:** redigir o texto real de cada bloco acima na VOZ da Real Vision (direto, técnico, resultado-focado). Usar frameworks PAS / AIDA / StoryBrand por seção conforme o objetivo.

Output: `COPY-HOME.md` com o texto pronto de cada seção para usar no briefing do Claude Design.
