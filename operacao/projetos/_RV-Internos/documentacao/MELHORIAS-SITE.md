# Melhorias Planejadas — Site Real Vision

**Análise feita em:** 20/05/2026
**Páginas avaliadas:** `/portfolio` e `/servicos`
**Status:** documentado para implementação futura — não mexer sem autorização explícita do Felipe

---

## O que está forte (manter)

### Narrativa de "sistema integrado"
Não vende serviços soltos — vende uma arquitetura de presença digital com 4 pilares (Site + Google + Tour + Imagem). Isso posiciona como **consultor de presença digital para negócio local**, não como "fotógrafo 360 comum".

### Frase de posicionamento
> "Não criamos apenas páginas bonitas. Criamos sistemas digitais funcionais."

### Portfólio com peso
Universo Paralello 18° é cliente reconhecido nacionalmente. HUB Ilha do Contrato e Itacaré Virtual mostram modelo de negócio, não só foto.

### Processos numerados
6 passos pra site, 7 pra tour 360°. Passa profissionalismo.

### Menção a GEO
Falar de GEO (Generative Engine Optimization) ao lado de SEO é vantagem competitiva real no nicho em 2026.

---

## O que está fraco (ajustar)

### 1. Contradição geográfica — CRÍTICO
- Meta description diz: "São Paulo e região"
- Portfólio mostra: 100% Bahia
- **Ação:** decidir se atende SP, BA ou ambos. Atualizar meta tags e copy do hero.

### 2. "Tríade do Sucesso" sem explicação
- Mencionada no projeto Vila Mandela mas sem página/seção própria
- **Ação:** criar página dedicada — vira ativo de marca e diferencial

### 3. Página de serviços é muralha de texto
- Muito conteúdo bom amontoado verticalmente
- **Ação:** sub-páginas por pilar OU acordeões/tabs pra deixar navegável

### 4. CTAs repetitivos
- Cada seção termina com "Solicitar..." mas todos vão pro mesmo destino
- **Ação:** CTAs específicos por serviço (ex: "Solicitar orçamento de Tour 360°" abre form pré-filtrado)

### 5. Números genéricos
- "30+ projetos / 5+ segmentos / 10+ cidades / 100% clientes satisfeitos"
- **Ação:** trocar por métricas verificáveis:
  - "30+ tours publicados no Street View do Google"
  - Média real de avaliações no Google
  - Etc.

### 6. Identidade pessoal sumiu
- Felipe é o cara — guia local que virou empresário de tecnologia. É narrativa de autoridade.
- **Ação:** criar página "Sobre o Felipe" com a história Local Guide → câmera 360 → drone → vibe coder → engenheiro de IA

### 7. Pilar de IA invisível
- Felipe cria agentes de IA mas no site só aparece como item da Loja Virtual
- **Ação:** elevar Agentes de IA a pilar próprio ou ao menos página dedicada

---

## Posicionamento sugerido para 2026

> "Construímos a presença digital integrada de negócios locais — do Google ao site, do tour ao agente de IA — pra que você seja encontrado, escolhido e lembrado."

---

## Prioridade de implementação

| Prioridade | Item | Esforço | Impacto |
|---|---|---|---|
| Alta | Resolver contradição SP vs BA | Baixo | Alto |
| Alta | Página "Sobre o Felipe" | Médio | Alto |
| Média | Página da Tríade do Sucesso | Médio | Alto |
| Média | Pilar de Agentes de IA em destaque | Médio | Médio |
| Baixa | Trocar números genéricos por métricas reais | Baixo | Médio |
| Baixa | Quebrar página de serviços em sub-páginas | Alto | Médio |
| Baixa | CTAs específicos por serviço | Médio | Médio |

---

## Próximas melhorias planejadas (pós-redesign da home)

### 🌍 Internacionalização — i18n trilíngue (PT-BR / EN / DE)
- **Status:** Planejamento — executar após home refeita
- **Stack:** `react-i18next` ou `next-intl` (avaliar compatibilidade Lovable)
- **Idiomas:**
  - 🇧🇷 Português (padrão)
  - 🇺🇸 English
  - 🇩🇪 Deutsch (para mercado Suíça/Alemanha — Solarium Aarau é primeiro cliente DE-CH)
- **Posicionamento do seletor:** a definir no redesign da home — opções:
  - Topo direito do header (padrão em sites institucionais)
  - Footer (menos intrusivo, mas menos visível)
  - Modal de entrada com detecção de geolocalização
- **Roteamento:** rotas `/`, `/en`, `/de` (recomendado pra SEO) vs query string (`?lang=en`)
- **Estrutura de arquivos:**
  - `/public/locales/pt-BR/`
  - `/public/locales/en/`
  - `/public/locales/de/`
- **Conteúdo a traduzir:** todos os textos da home + páginas internas + meta tags + alt das imagens
- **SEO:** hreflang tags em todas as páginas
- **Ordem de execução:**
  1. Implementar estrutura técnica (i18n setup)
  2. Traduzir home primeiro (Sócio Digital em inglês já é prioridade global)
  3. Traduzir páginas internas
  4. Configurar SEO internacional (hreflang, sitemaps por idioma)

### 🔗 Integração Sócio Digital no ecossistema completo
- **Documento de referência:** `operacao/projetos/INTEGRACAO-SOCIO-DIGITAL.md`
- **Status:** documentação pronta — executar após home refeita
- **Pendências cobertas no documento:**
  - Atualizar `contexto/EMPRESA.md` (5 → 6 pilares)
  - Atualizar `CLAUDE.md` global (knowledge base)
  - Atualizar skill `realvision`
  - Criar página `/socio-digital`
  - Decidir sobre Vision Cloud (sub-página ou só menção)
