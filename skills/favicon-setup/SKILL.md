---
name: favicon-setup
description: Diretrizes oficiais do Google Search para configuração e indexação de favicons em projetos React.
---

# 🎨 Configuração e Indexação de Favicons no Google Search

Este guia reúne as boas práticas oficiais do Google Search Central para configurar e publicar o favicon (ícone do site) de forma que ele seja exibido perfeitamente nos resultados do Google e nas abas do navegador.

---

## 1. Diretrizes Técnicas do Google (Requisitos Oficiais)

Para que o Google exiba seu favicon nos resultados de pesquisa (mobile e desktop):

### 📏 Dimensões e Formatos
* **Proporção:** O ícone deve ser estritamente quadrado (proporção 1:1).
* **Mínimo:** `8x8px` (porém o Google recomenda tamanhos maiores para boa exibição em alta densidade).
* **Tamanhos Recomendados:** Múltiplos de 48px (ex: `48x48px`, `96x96px`, `144x144px`, `192x192px`).
* **Formatos Suportados:** PNG, SVG ou o clássico ICO.

### 🌐 Tag HTML no `<head>`
O favicon deve ser declarado na página inicial do site utilizando a tag `<link>`:
```html
<!-- Exemplo Clássico ICO -->
<link rel="icon" href="/favicon.ico" />

<!-- Exemplo Alta Resolução PNG (Recomendado) -->
<link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
```
* O atributo `href` pode usar caminhos relativos (ex: `/favicon.png`) ou caminhos absolutos (ex: `https://seusite.ch/favicon.png`).

### 🔒 Acessibilidade para Rastreamento (SEO)
* **Sem Bloqueio de Robôs:** A URL do favicon e a página inicial **não** podem ser bloqueadas no arquivo `robots.txt` para o agente `Googlebot-Image` ou `Googlebot`.
* **Conteúdo Adequado:** O Google não exibe imagens consideradas inapropriadas (pornografia, símbolos de ódio, etc.). Se houver violação, o Google exibirá um ícone genérico padrão.
* **URL Estável:** Evite mudar constantemente a URL do arquivo para que o Google não precise reindexar o ícone frequentemente.

---

## 2. Configurando em projeto React (Claude Code)

1. **Colocar o arquivo na pasta `public/`:**
   - Salvar o favicon (PNG 192x192 ou ICO) em `public/favicon.png` (ou `public/favicon.ico`).
2. **Declarar no `index.html`:**
   ```html
   <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
   ```
3. **Verificar no `vite.config.ts` / `next.config.js`** que `public/` está sendo servido (comportamento padrão em Vite e Next.js).
4. **Deploy via Vercel:** o arquivo em `public/` é automaticamente servido na raiz do domínio.

---

## 3. Resolução de Problemas e Cache do Google

Se o site ainda exibir um ícone antigo:

* **Forçar Reindexação via Search Console:**
  - Acesse o [Google Search Console](https://search.google.com/search-console).
  - Cole a URL da página inicial na ferramenta de **Inspeção de URL**.
  - Clique em **Solicitar Indexação** (*Request Indexing*) para avisar ao Google que a página mudou e precisa ser rastreada novamente.
* **Limpeza de Cache Local:**
  - Limpe o cache do navegador pressionando `Ctrl + F5` ou abrindo em uma aba anônima.
* **Verificação do Código Fonte:**
  - Acesse seu site, clique com o botão direito e selecione "Exibir código fonte da página".
  - Verifique se a tag `<link rel="icon"...>` aponta para o caminho correto do seu arquivo.
