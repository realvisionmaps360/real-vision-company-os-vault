# Fazenda Coroa Azul — Dossiê do Projeto

> Cliente da Real Vision 360. Carregue sempre junto com a skill `realvision`.
> Idioma de trabalho com o cliente: PT-BR.

## Quem é
- **Cliente:** Francisco
- **Negócio:** Fazenda Coroa Azul — 285 hectares, Ilhéus (BA), tradição familiar desde 1832. Produção artesanal de cacau há ~10 anos: chocolate bean-to-bar (70% e 50% ao leite) e cacauína (mel de cacau, produto premium, transporte congelado). Produção sob demanda em micro-lotes (~150kg/batelada), sem escala industrial. Vende por indicação para RJ, SP, Brasília, Florianópolis e já teve experiência internacional. Clientes: restaurantes, hotéis, cafeterias, pequenos revendedores (alguns com produto personalizado white-label).
- **Local:** Ilhéus, Bahia
- **Contato:** +55 73 98803-2043 · email —
- **VisionFlow:** id `9792a700-fe08-49c3-96ec-9e17d54114f1` · status `proposta`

## Dor principal
Perde tempo respondendo perguntas repetidas no WhatsApp (origem, preço, prazo, envio). Quer estrutura digital que "se venda sozinha" — filtra curioso de comprador, só leva até ele o contato qualificado.

## O que foi entregue
- Nenhuma entrega ainda — cliente em fase de proposta.

## Histórico de propostas
- **14/05/2026** — Proposta estratégica modular completa enviada (`propostas/Proposta_Fazenda-Coroa-Azul_14-05-26.pdf`), válida até 29/05/2026. 7 módulos (Landing, Site Institucional, Loja Virtual, Painel Admin, Chatbot A/B, Blog, Tour 360°), 3 pacotes fechados (Essencial R$9.300 / Estratégico R$22.700 / Ecossistema R$30.300) + parceria contínua a partir de R$580/mês.
- **Resposta do cliente (3 áudios, ver `RESPOSTA-CLIENTE-AUDIOS.md`)**: proposta ficou grande/cara demais pro momento dele. Quer começar leve (landing ou algo "mais tecnológico que landing"), testar chatbot, evoluir aos poucos. Loja virtual e custo fixo mensal são objeção clara agora. Quer decidir domínio ("Fazenda Coroa Azul" x "Coroa Azul Cacau e Chocolate").

## Onde está o código
- Ainda não há site/repo — projeto não iniciado.

## Pendências conhecidas
- [x] Remontar proposta em formato de entrada gradual (fases), respeitando objeção de custo fixo — ver `propostas/Proposta-Coroa-Azul-Landing-Chatbot_14-07-26.html`
- [ ] Felipe revisar/aprovar a nova proposta antes de enviar ao Francisco
- [ ] Decidir e registrar domínio com o cliente (indicativo: "Fazenda Coroa Azul")
- [ ] Validar lógica de preço "sob consulta" mesmo em landing page simples

## Proposta enxuta — 14/07/2026 (v4, aguardando aprovação do Felipe)
`propostas/Proposta-Coroa-Azul-Landing-Chatbot_14-07-26_v4.html` — estilo acordeon (mesmo padrão da Wood Art). Versão de referência atual. Ajustes da v4:
- **Capa mobile corrigida:** kicker e eyebrow quebravam de forma estranha em telas pequenas — agora empilham/reduzem letter-spacing corretamente, sem quebra de linha ruim (checado via inspeção de layout, sem overflow horizontal).
- **Imagem do domínio removida:** trocada por um bloco de texto organizado (tabela 1/2/5 anos + legenda) dentro do "Saber mais" da Landing Page — a imagem do print do registro.br não ficava legível/bem enquadrada em mobile e desktop.

Só 2 frentes:
- **Landing Page (versão de entrada):** R$ 1.700 implantação, sem mensalidade. Item "História" (antes "Abertura") na estrutura. Texto explica que é versão de entrada — RV entrega landing pages em diferentes níveis, valor acompanha o nível.
- **Chatbot com IA (Assistente):** mesma inteligência na landing e no WhatsApp; R$ 1.500 implantação + **R$ 300/mês fixo** (subiu de R$180), com ressalva de reajuste conjunto se o volume de mensagens crescer muito acima do previsto. **Cláusula de proteção nova:** implantação inclui treinamento inicial + até 2 rodadas de ajuste fino nos primeiros 15 dias após o go-live; depois disso, ampliação de perguntas/mudança de tom vira serviço extra orçado à parte.
- **Hospedagem da Landing Page: R$ 300/ano** (não mensal — corrigido de "sem mensalidade" na v2). Callout explica por que não há mensalidade de manutenção: site essencialmente estático, diferente de clientes que alteram dados com frequência ou pedem relatório mensal de acesso.
- **FAQ nova seção:** 6 perguntas/respostas (pedido, prazo, cacauína congelada, regiões, personalização white-label, preço sob consulta) — mesmo conteúdo vira base de conhecimento do chatbot.
- **Domínio (texto, sem imagem na v4):** `fazendacoroaazul.com.br` disponível — R$40/1 ano · R$76/2 anos · R$184/5 anos, valor pago pelo cliente, registro feito em nome/CPF dele pela Real Vision.
- Total implantação: R$ 3.200.
- Bloco "Fora do escopo desta proposta" **removido completamente** (v3, a pedido do Felipe) — não menciona mais loja virtual/site completo/etc.
- Sumário executivo não cita detalhes pessoais do cliente nem menciona a proposta original.
- Próximos passos: texto voltou pro tamanho curto original (v1); em vez de mais texto, ganhou um **hover visual generoso** nos containers (elevação + sombra âmbar + borda mais forte ao passar o mouse).
- Versões anteriores (`_14-07-26.html` sem sufixo = v1, `_v2.html`, `_v3.html`) mantidas na pasta como histórico — não são mais a referência.

## Como trabalhar este cliente
- Skills: `realvision` + `rv-copy` (proposta) + `rv-relatorio`/`proposta-comercial` quando for montar a próxima versão.
- Cliente sensível a custo fixo — qualquer proposta nova precisa ancorar em "sem risco financeiro" e caminho de entrada barato.
- Preço não pode aparecer exposto no site (pedido dele desde a 1ª proposta) — manter "sob consulta" / liberado via chatbot.
