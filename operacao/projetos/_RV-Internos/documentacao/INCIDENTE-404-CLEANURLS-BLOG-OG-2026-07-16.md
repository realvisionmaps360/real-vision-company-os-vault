# Incidente — 404 em todas as páginas internas do site (16/07/2026)

## Resumo

No dia 16/07/2026, uma melhoria no blog (corrigir a imagem de preview do WhatsApp/Facebook de cada post) quebrou o site inteiro: qualquer página aberta direto pela URL — `/blog`, `/servicos/sites`, qualquer rota que não fosse a home — passou a retornar 404 do próprio Vercel, antes mesmo do site carregar.

Detectado por Felipe ao abrir `/blog` e ver a tela de erro `404: NOT_FOUND` do Vercel. Corrigido no mesmo dia, ~2h depois do deploy que causou o problema.

## Linha do tempo

- **16/07 18:26** — commit `ef5937d` ("Fix: og:image do blog sempre a capa do post, nao a imagem generica") deployado em produção
- **16/07 ~21:00** — Felipe percebe 404 ao abrir `/blog`
- **16/07 22:04 (UTC)** — diagnóstico concluído, causa raiz identificada
- **16/07 22:15 (UTC)** — commit `b9e7808` deployado, site normalizado, rotas testadas ao vivo

## Causa raiz

O objetivo da mudança original era legítimo: bots de redes sociais (WhatsApp, Facebook) não executam JavaScript, então as tags `og:image`/`og:title` que o React define em tempo de execução nunca eram vistas por eles — o preview do link sempre mostrava a imagem genérica da home. A solução foi um script pós-build (`scripts/generate-blog-og.mjs`) que gera, pra cada post e cada idioma, um `index.html` estático já com as tags corretas.

Essa mudança trouxe dois problemas não testados antes do deploy:

**1. `"cleanUrls": true` adicionado ao `vercel.json` no mesmo commit**
O site é uma SPA (React Router) com uma regra de rewrite que existia desde maio (`{"source": "/(.*)", "destination": "/index.html"}`) — ela manda qualquer URL pro `index.html`, que então decide internamente qual página mostrar. O `cleanUrls: true` interferiu nesse fallback: o Vercel passou a devolver 404 direto (`X-Vercel-Error: NOT_FOUND`) pra qualquer rota que não fosse a raiz, sem nunca chegar a servir o `index.html`.

**2. Pasta `dist/blog/` sem `index.html` próprio**
O script criava `dist/blog/<slug>/index.html` para cada post, mas nunca um `dist/blog/index.html` para a listagem em si. Isso por si só já quebrava especificamente a rota `/blog` — mesmo que o problema 1 não existisse — porque o Vercel encontra a pasta `blog/` no sistema de arquivos e não cai no rewrite genérico.

## Por que não foi pego antes de publicar

- O build (`npm run build`) terminava sem erro — os dois problemas são de *roteamento em produção*, não de compilação.
- Navegar pelo próprio site (clicar nos links do menu) continuava funcionando normal, porque a troca de página nesse caso é feita pelo React Router no navegador, não pelo servidor.
- O bug só aparece quando a página é acessada **direto pela URL**: link externo, digitar o endereço, F5, ou um crawler/bot acessando — exatamente o padrão de acesso que a própria correção (preview de link) tinha como alvo.

## Correção aplicada

Commit `b9e7808` no repo `real-vision-core`:
1. Removida a linha `"cleanUrls": true` do `vercel.json`.
2. `scripts/generate-blog-og.mjs` passou a gravar também um `index.html` (cópia do shell padrão da SPA) na raiz de `dist/blog/`, `dist/en/blog/` e `dist/de/blog/`.

Testado ao vivo depois do deploy: `/blog`, `/en/blog` e `/servicos/sites` voltaram a 200.

## Checklist de prevenção (aplicar sempre que mexer em `vercel.json` ou em scripts de build/rotas)

- [ ] Nunca reativar `cleanUrls` no `vercel.json` sem testar ao vivo pelo menos 2-3 rotas internas **direto pela URL** (não só navegando dentro do site) numa preview deployment antes de ir pra produção.
- [ ] Qualquer script que crie pastas dentro de `dist/` (ex: uma pasta por post, por categoria, por idioma) precisa sempre deixar um `index.html` na raiz de cada pasta — não só nas subpastas finais (leaf).
- [ ] Depois de qualquer mudança em `vercel.json`, em scripts de build (`scripts/*.mjs`) ou em rotas: testar a rota **digitando a URL direto** (equivalente a abrir um link de fora ou dar F5), não só clicando dentro do site — é esse tipo de acesso que expõe problema de rewrite/roteamento do servidor.
- [ ] Build sem erro (`npm run build`) não é suficiente pra validar mudança de roteamento — só garante que o código compila, não que o Vercel vai servir a rota certa.

Regra espelhada em `CLAUDE.md` do repo `real-vision-site`.
