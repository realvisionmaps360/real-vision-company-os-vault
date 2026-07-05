---
name: marketing-seo
description: Estratégias de SEO Local, Schema markup, rastreamento de conversões (GA4) e tags de busca.
---

# 📈 Marketing & SEO Strategy

Este playbook detalha os requisitos para otimização de mecanismos de busca (SEO) e rastreamento de tráfego, garantindo visibilidade local e mensuração de resultados.

> Pesquisa de palavra-chave e intenção de busca (matriz de perguntas reais, tipo AnswerThePublic) não vive aqui — ver skill `rv-intencao-busca`. Esta skill cobre a parte técnica (schema, tags, analytics); a de conteúdo/palavra-chave é o pipeline gratuito via Google Autocomplete.

---

## 1. SEO Local e Schema Markup
* **JSON-LD Estruturado:** Sempre adicione um script JSON-LD de dados estruturados apropriado na página inicial (ex: `LocalBusiness`, `TanningSalon`, `Store`):
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TanningSalon",
    "name": "Nome da Empresa",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Exemplo 123",
      "addressLocality": "Cidade",
      "postalCode": "1234",
      "addressCountry": "CH"
    },
    "telephone": "+41XXXXXXXXX",
    "openingHoursSpecification": [...]
  }
  </script>
  ```
* **Tags Metas de Geolocalização:** Inclua tags de mapeamento geográfico no `<head>` para reforçar a busca por localidade (ex: `geo.region`, `geo.position`, `ICBM`).

---

## 2. Rastreamento e Analytics (GTM & GA4)
* **Google Tag Manager (GTM):** Instale o container padrão no cabeçalho (`<head>`) e no início do corpo (`<body>`) do site principal para gerenciar tags de conversão do Meta/Google Ads de forma unificada.
* **Tours Virtuais 360°:** 
  - **⚠️ IMPORTANTE:** Não instale o Google Tag Manager (GTM) completo dentro do container de tours virtuais 360°. O GTM pode gerar lentidão e conflito de scripts em frames de tour virtual.
  - **Regra:** Para tours virtuais 360°, injete apenas o código direto e leve do **Google Analytics 4 (GA4)** para coletar as métricas de cliques e interações internas.

---

## 3. SEO Básico (Sitemaps e Metadados)
* **Tags de Título e Descrição:** Toda página precisa de tags exclusivas configuradas. O título deve ser objetivo (com limite de ~60 caracteres) e a descrição atraente (com limite de ~155 caracteres).
* **Robots.txt e Sitemap.xml:** Garanta a presença do sitemap na raiz pública e referencie-o no arquivo robots.txt para controle de crawl-budget.
