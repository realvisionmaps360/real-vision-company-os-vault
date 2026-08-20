---
tipo: apoio
nome: Histórico
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
pertence_a: ["[[02-Projetos/vila-dos-corais/PROJETO]]"]
tags: [lbos/apoio]
---

# Histórico

Linha do tempo completa do projeto — todo evento relevante, não só os registrados na tabela enxuta do `PROJETO.md`.

## 2026-08-13 — Primeira estruturação no LBOS + diagnóstico do favicon

Felipe pediu para trazer a cliente Flávia (Vila dos Corais) para dentro do LBOS e resolver um problema pontual: o favicon dela ainda aparecia como o padrão do Lovable no índice do Google.

**Diagnóstico feito:**
- Código do site (`index.html`) e arquivos em `public/` já usam favicon customizado (coral, `#5B8C8D`) desde 17/07/2026 — não é mais o do Lovable.
- Site ao vivo confirmado servindo o favicon correto (200 OK em `/favicon.svg`, `/favicon.png`, `/favicon.ico`).
- `robots.txt` não bloqueia Googlebot.
- Print de `site:viladoscorais.com.br` no Google confirmou visualmente: a SERP ainda mostra o ícone genérico antigo (Lovable/gpt-engineer) — cache do Google desatualizado, não bug no site.
- Só 1 página indexada no Google.

**Conclusão:** não havia nada a corrigir no código. O bloqueador é forçar o Google a reindexar via Search Console.

**Tentativa de reindexação:** login no Google Search Console pediria senha da conta — ação que a IA não executa. Passo a passo entregue ao Felipe para ele fazer a solicitação de indexação manualmente.

## 2026-08-13 — Causa raiz real: domínio nunca migrou do Lovable

Felipe abriu verificação de propriedade no Search Console (método "Arquivo HTML"). Optamos pelo método de meta tag em vez disso — mais simples de aplicar via código.

Adicionei a meta tag `google-site-verification` no `index.html` do repo `viladoscorais`, commitei (`6d14fef`) e fiz push — mas a tag não apareceu no site em produção mesmo após o deploy. Investigando, descobri: o domínio `viladoscorais.com.br` nunca foi apontado pro deploy Vercel do repositório. O DNS (gerenciado na Locaweb, `ns1.locaweb.com.br`) ainda tinha o registro A apontando pro hosting do próprio Lovable (`185.158.133.1`, confirmado via `ipinfo.io` — hostname `lovable-app-cd-1-4.p.l5e.io`).

Isso explica o problema desde a raiz: não era cache do Google, o site publicado de fato **nunca saiu do Lovable**. O repositório GitHub/Vercel existia e estava com o favicon certo, mas não recebia tráfego nenhum do domínio real.

**Correção aplicada:**
- Criado projeto na Vercel a partir do repo (`felipes-projects-26a2b9dd/site`)
- Domínio `viladoscorais.com.br` adicionado ao projeto
- Vercel pede: registro A `viladoscorais.com.br → 76.76.21.21` na Locaweb (ou trocar nameservers — optamos por manter nameservers na Locaweb e só trocar o A record, menos invasivo)

**Pendente:** Felipe trocar o registro A no painel da Locaweb — acesso de DNS não é algo que a IA deve mexer sem confirmação explícita adicional, e login em painel de terceiros seguiria a mesma regra do Search Console.

## 2026-08-14 — Migração concluída (detalhe fica no Company OS)

Não duplicado aqui — fonte única é `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/Vila-dos-Corais-TIMELINE.md` e `FICHA-CLIENTE.md`. Resumo:
- SSL do domínio resolveu sozinho após retry da Vercel (era timeout do CAA check nos nameservers da Locaweb, não precisou trocar nameservers).
- Propriedade verificada no Search Console via Tag HTML (conta `smarthomefg@gmail.com`).
- `sitemap.xml` criado, publicado e enviado — status "Processado".
- GA4 instalado do zero (conta `realvisionmaps360@gmail.com`, measurement ID `G-8P07EHPVYR`).
- FICHA-CLIENTE.md registra: "Nenhum pendente no momento."

## 2026-08-17 — Sincronização + abertura da Prioridade 4 (handoff PRD memory-dump)

Handoff em `LBOS/07-Operacao/inbox/2026-08-17-prd-memory-dump-operacional.md` pede 4 ações pra essa cliente: confirmar pacote/datas, formalizar contrato, revisar Perfil Google, avaliar portfólio.

Cruzamento direto com o VisionFlow (Supabase, projeto `ghwjetvazmdlaqidgxqi`) nesta sessão — o export estático `operacao/clientes/CLIENTES_VISIONFLOW_2026-05-24.md` na pasta do cliente está desatualizado:
- **Financeiro:** tabela `finances` mostra R$1.200 (09/01) + R$1.000 (10/03) = R$2.200, ambos status `pago`. Existe uma tarefa separada "Enviar mensagem cobrando R$700" (criada 13/07, marcada `concluída` 14/07) sem nenhum lançamento correspondente em `finances` — o banco não confirma se os R$700 foram de fato recebidos.
- **Entregas (`deliveries`):** Website `entregue`, Instagram `entregue`, "Perfil Google eu Negócio" `em_andamento` — sem nenhuma atualização desde 15/05/2026. Confirma que o Perfil Google segue sem finalizar.
- **Checklist técnico (`client_checklist`):** criado em bloco em 15/06/2026, nunca atualizado desde então — ainda mostra `ga4`, `search_console`, `favicon`, `seo_basico` como `pendente`, embora o Company OS já mostre tudo isso resolvido em 14/08. O VisionFlow não reflete o trabalho feito depois de 15/06.
- **Data de início:** três datas diferentes aparecem nas fontes — proposta assinada por Felipe em 06/01/2026, lead criado no VisionFlow em 27/04/2026, `data_inicio` na FICHA-CLIENTE em 16/06/2026. Nenhuma foi confirmada como a oficial pro contrato.

Nenhuma decisão tomada — perguntas levantadas ao Felipe no chat desta sessão.

**Respostas do Felipe (mesma sessão, 17/08/2026):**
- Os R$700 foram pagos — só não estavam registrados no VisionFlow.
- Início real: 06/01/2026 (começaram a conversar/planejar); site pronto 20/02/2026.
- Escopo do contrato: só os 3 itens já entregues (Website + Perfil Google + Instagram), sem os recorrentes da proposta original.
- Perfil Google: o bloqueio do vídeo de verificação foi resolvido — pode seguir finalizando.

Registrado em `FICHA-CLIENTE.md` e `Vila-dos-Corais-TIMELINE.md`. Tentativa de lançar o R$700 direto no VisionFlow via SQL falhou (gatilho de auditoria exige usuário autenticado pela interface) — fica pendente pro Felipe lançar manualmente.

## 2026-08-17 (continuação) — Correção: o site nasceu com a Real Vision, não foi resgate de site quebrado

A primeira versão do case de portfólio e do contrato descreveu o projeto como "site já existia, quebrado, migrado do Lovable" — Felipe corrigiu: a cliente **não tinha site nem presença digital nenhuma** antes da Real Vision. O site foi construído do zero (usando Lovable como ferramenta de criação), com escopo bem maior que um "site institucional":

- Calculadora de reservas na home (datas, hóspedes, valor por sazonalidade) — estilo Airbnb
- Checkout via WhatsApp com mensagem pré-preenchida, sem intermediário nem taxa de plataforma
- Painel administrativo próprio da cliente (login exclusivo em `/secure`) pra gerir datas e preços sozinha
- Fotos profissionais coordenadas com fotógrafo local (cliente não mora na propriedade)

A migração de domínio Lovable→Vercel (13-14/08) continua sendo um fato real, só que é um detalhe técnico de infraestrutura — não a origem do projeto nem o "desafio" principal do case.

**Cliente é dona de só uma casa** (Casa Estrela do Mar) dentro do Condomínio Vila dos Corais — o nome "Vila dos Corais" no site/portfólio é o condomínio, não uma empresa dela.

**Decisão do Felipe sobre portfólio:** não pedir autorização prévia da cliente (Termos §8.4 já cobre isso) — mas **nunca expor o nome pessoal dela** em material público. Regra fixada pra qualquer entrega futura desse cliente.

**Visão de futuro (guardar pra continuar depois):** o sistema foi construído pensando em crescer — a estrutura permite no futuro replicar o mesmo modelo (calculadora + WhatsApp + painel próprio) pros donos das outras casas do mesmo condomínio, cada um virando cliente Real Vision.

Corrigido em: `operacao/projetos/_RV-Internos/sites/real-vision-site/src/data/projects.ts` (case de portfólio), `ViladosCorais_Contrato_17-08-26.html` (Seção 5 e 12), `FICHA-CLIENTE.md`.

## Relacionados
- Pertence a: [[02-Projetos/vila-dos-corais/PROJETO]]
