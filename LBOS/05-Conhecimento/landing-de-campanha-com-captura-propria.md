---
id: CON-2026-005
tipo: conhecimento
nome: Landing page de campanha com captura própria e copy honesta sobre o que a mídia mostra
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
proxima_revisao: 2026-11-13
confiabilidade: alta
fonte: Experiência própria — landing page e emails da campanha Drone & Digital Unterentfelden, 13/08/2026
pertence_a: ["[[LBOS]]"]
referencia: ["[[02-Projetos/real-vision/PROJETO]]", "[[prospeccao-google-maps-apify]]", "[[DEC-2026-003]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# Landing page de campanha com captura própria e copy honesta sobre o que a mídia mostra

## O que é

Método validado para pôr no ar uma landing page de campanha de prospecção em poucas horas, com formulário funcionando de verdade, **sem serviço de terceiro e sem chave exposta na página** — e com a regra de copy que impede a peça de prometer o que a mídia não entrega.

Testado na campanha Drone & Digital Unterentfelden: página no ar, formulário salvando lead na base de email da Real Vision e notificando o Felipe por email, custo adicional zero.

## Contexto

Serve quando a campanha precisa de uma página própria, separada do site principal, com um formulário que gere lead de verdade. Não serve para páginas que vão virar rota permanente do site — essas entram no `real-vision-core` normal.

Stack: **Vite** (estático, sem framework) + **Vercel** + **Supabase Edge Function** + **Resend**.

## A lição de copy que quase passou batido

**Nunca prometer o que a mídia não mostra.** É a regra mais cara desta sessão.

Os emails tinham "ângulos" por ramo de negócio, escritos antes da foto existir. Um deles dizia que a foto ajuda o cliente a ver *"onde é a entrada e onde dá pra parar o carro"*. A foto é um drone em altitude alta cobrindo o bairro inteiro: **não dá pra ver porta de entrada nem vaga de estacionamento.** Prometer isso quebra a credibilidade no exato momento em que o destinatário clica no link e compara com o que foi prometido.

A correção não foi reescrever oito ângulos diferentes. Foi **substituir todos por um parágrafo único e verdadeiro** sobre o que a imagem de fato mostra: onde o endereço fica dentro do bairro e como é o entorno.

O procedimento que evita repetir o erro:

1. Escrever a copy **depois** de olhar a mídia, nunca antes
2. Para cada afirmação, perguntar: *isso aparece na imagem?* Se não aparece, sai
3. Preferir uma afirmação genérica e verdadeira a oito específicas e inventadas
4. Especificidade só vale quando é verdadeira — é o filtro que a skill `rv-copy` já pede, mas que passa batido quando a copy é gerada por script antes da entrega existir

Sintoma de que o erro está acontecendo: a copy foi gerada por template/script, o texto varia por segmento, e ninguém comparou cada variação com a entrega real.

## Formulário sem serviço de terceiro

O padrão anterior era Web3Forms, que exige gerar uma Access Key manualmente e deixa a chave visível no código da página. Substituído por infraestrutura que a Real Vision já tinha:

**Edge Function pública no Supabase** (`verify_jwt: false`), no mesmo projeto do Hermes, que faz tudo no servidor:

1. Valida os campos e aplica rate limit por IP (tabela `lead_capture_rate_limit`, 5 tentativas / 10 min)
2. Salva o contato em `email_contatos` com tag da campanha — o lead entra na base de email marketing
3. Dispara notificação por email via **Resend** para o Felipe, com `reply_to` já apontando pro email de quem preencheu

Vantagens sobre o serviço de terceiro: zero chave na página, zero passo manual de configuração, o lead cai direto na base própria em vez de só virar um email, e o `reply_to` permite responder o cliente com um clique.

Duas funções foram usadas na mesma página:

- Função dedicada da campanha, para o formulário principal (dados completos do pedido)
- Função genérica de captura já existente (a mesma do blog), para o bloco de lista de espera — bastou liberar o CORS pro domínio novo

**Ponto de atenção que morde:** o CORS fica travado por domínio na função. Trocar o domínio da página sem atualizar a lista de origens quebra o formulário silenciosamente — o usuário preenche e nada acontece.

## Degradação sem link morto

Requisito que vale copiar: o link da mídia (tour, foto, vídeo) fica numa **constante única no topo do código**. Se estiver vazia, a seção inteira mostra estado de "em breve" em vez de renderizar um botão apontando para `#`.

Isso permitiu construir a página inteira antes de o link existir, sem deixar botão morto no ar em nenhum momento.

## Data fixa, nunca "hoje"

Erro pego em revisão: a página dizia "capturada hoje" em seis lugares diferentes. Ficaria errado no dia seguinte ao deploy. Toda referência temporal em página estática de campanha vira **data absoluta** (`13.08.2026`), nunca relativa.

Mesma regra vale para o email — mais ainda, porque email fica na caixa de entrada por semanas.

## Custo e tempo

Página no ar, formulário funcionando, testado ponta a ponta: uma sessão. Custo adicional: **zero** — Vercel no plano gratuito, Supabase e Resend já pagos e em uso pelo Hermes.

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[02-Projetos/real-vision/PROJETO]], [[prospeccao-google-maps-apify]], [[DEC-2026-003]]
- Aplicado em: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/landing/site/`
- Regras de copy da empresa: `skills/rv-copy/SKILL.md` e `contexto/VOZ.md`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-13 | Nó criado | Landing page da campanha Unterentfelden construída, publicada e testada na mesma sessão | Registra o padrão de captura própria e a regra de copy que impede prometer o que a mídia não mostra | Web3Forms substituído por Edge Function própria; ângulos por ramo substituídos por parágrafo único verdadeiro |
