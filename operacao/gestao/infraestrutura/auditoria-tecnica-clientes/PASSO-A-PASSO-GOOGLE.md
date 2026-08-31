---
title: Passo a Passo — Google Search Console e GA4 (pra Felipe)
tags: [infraestrutura, auditoria, google-search-console, ga4]
id: PRC-011
tipo: processo
pertence_a: ["[[operacao/gestao/README]]"]
atualizado_em: 2026-08-28
---

# Passo a Passo — Google Search Console e GA4

> Roteiro fixo que a skill [[rv-auditoria-tecnica-site]] entrega toda vez que a parte de configuração exige login/ação manual do Felipe direto na tela do Google. Linguagem sem jargão técnico.

## 1. Verificar o site no Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console).
2. Clique em "Adicionar propriedade".
3. Escolha "Prefixo do URL" (mais simples) e cole o endereço completo do site (ex: `https://nomedosite.com`).
4. O Google vai pedir uma forma de verificação. A mais simples: baixar o arquivo HTML que ele oferece e me avisar — eu subo esse arquivo no site pra confirmar que é seu.
5. Depois de confirmado, o site aparece no painel.

## 2. Enviar o sitemap

1. Dentro da propriedade do site no Search Console, menu lateral → "Sitemaps".
2. Cole `sitemap.xml` no campo (o endereço completo fica `nomedosite.com/sitemap.xml`).
3. Clique em "Enviar".
4. Leva de algumas horas a alguns dias pro Google processar — não é instantâneo.

## 3. Conferir quantas páginas estão indexadas

1. No Search Console, menu "Páginas" (ou "Cobertura").
2. Veja quantas páginas estão em "Indexadas" vs. "Não indexadas" — e por quê (o Google explica o motivo de cada página fora).
3. Alternativa rápida, sem precisar do painel: digite `site:nomedosite.com` na busca do Google. Aparece uma lista do que o Google já indexou.

## 4. Conferir o favicon na busca real

1. Faça a busca `site:nomedosite.com` no Google (ou busque o nome do site direto).
2. Olhe o ícone ao lado do resultado — se aparecer o ícone certo da marca, está ok. Se aparecer um ícone genérico (globo, letra, ou o ícone padrão do navegador), o favicon não está sendo lido corretamente.
3. Se estiver errado: confirme com a IA que o arquivo de favicon está publicado certo no site, depois force a atualização em Search Console → "Inspeção de URL" → cole a URL da home → "Solicitar indexação".
4. Pode demorar dias pra o Google atualizar o ícone na busca, mesmo depois de corrigido.

## 5. Conferir o Google Analytics (GA4)

1. Acesse [analytics.google.com](https://analytics.google.com).
2. Confirme que existe uma propriedade com o nome do cliente/site.
3. Menu "Relatórios" → "Tempo real" → abra o site em outra aba e veja se aparece 1 usuário ativo agora. Se aparecer, o GA4 está capturando dados.
4. Se não aparecer nada: avise a IA, o problema normalmente é a tag do GA4 não estar instalada certa no código do site (ela confirma isso lendo o código).

## 6. Conferir o PostHog (quando o projeto usa)

1. Acesse [app.posthog.com](https://app.posthog.com) (ou o self-host, se for o caso).
2. Confirme que existe um projeto com o nome do cliente.
3. Menu "Activity" — veja se há eventos recentes chegando.
4. Se não houver: mesma lógica do GA4, o problema costuma ser a tag não instalada — a IA confirma lendo o código.

---

*Criado em 29/07/2026. Ver também: [[METODOLOGIA]], [[INDICE-CLIENTES]].*
