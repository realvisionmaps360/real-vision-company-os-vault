# O que é este arquivo — Código do Site (Versão 1)

Este é o código-fonte completo do seu site na versão que ficou no ar desde fevereiro de 2026, com checkout integrado via Shopify.

## O que tem aqui dentro

É um projeto de site feito na tecnologia React (usada por boa parte dos sites modernos). Dentro da pasta você vai encontrar:
- A parte visual do site (páginas, componentes, estilos).
- A conexão com o banco de dados (pasta de "integrações").
- Os arquivos de configuração do projeto.

Esse tipo de projeto não abre "pronto" num navegador — ele precisa ser processado por um desenvolvedor e publicado numa hospedagem (o site rodava na Vercel).

## O que fazer com ele

Você vai precisar de alguém com conhecimento técnico (um desenvolvedor) para colocar esse código no ar de novo. De forma resumida, os passos são:

1. Criar uma conta de hospedagem (o site usava a Vercel, mas pode ser qualquer serviço equivalente).
2. Criar um banco de dados novo (o site usava o Supabase; existe um plano gratuito).
3. Preencher o arquivo `.env.example` com as informações do banco de dados novo — esse arquivo mostra o nome de cada informação necessária, sem valores reais, porque o banco de dados anterior era de uma conta da Real Vision e não é repassado.
4. Publicar o projeto e reconectar o domínio.

## Observação

Sozinho, este arquivo não coloca o site no ar — ele precisa de alguém técnico para configurar a hospedagem e o banco de dados novos.
