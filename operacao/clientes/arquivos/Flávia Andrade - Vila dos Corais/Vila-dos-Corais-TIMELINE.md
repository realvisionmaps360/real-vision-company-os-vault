# Vila dos Corais — Linha do Tempo do Projeto

> Ficha de contexto em [[FICHA-CLIENTE]].

## 2026
### 06/01/2026 — Início do projeto
- Conversa e planejamento com Flávia começam. Proposta assinada por Felipe no mesmo dia.

### 09/01/2026 e 10/03/2026 — Pagamentos do pacote
- R$1.200 (09/01) + R$1.000 (10/03) registrados no VisionFlow. Pacote contratado: Website (R$1.300) + Perfil Google Meu Negócio (R$300) + Instagram (R$600) = R$2.200.

### 20/02/2026 — Site pronto
- Website entregue.

### 16/06/2026 — Situação inicial documentada
- `VilaDosCorais_Situacao_2026-06-16.pdf` registrado na pasta do cliente.

### 14/08/2026 — Verificação no Google Search Console
- Tentativa inicial via Tag HTML falhou ("Não foi possível encontrar seu site").
- Diagnóstico: certificado SSL do domínio `viladoscorais.com.br` na Vercel estava com erro de emissão (CAA check deu timeout nos nameservers da Locaweb).
- Confirmado que HTTP respondia normal mas HTTPS falhava no handshake — por isso o GSC (que exige HTTPS) não conseguia validar.
- Vercel resolveu sozinha após retry (sem precisar trocar nameservers/DNS provider).
- Propriedade verificada com sucesso via Tag HTML.
- `viladoscorais.com.br/sitemap.xml` retornou 404 — sitemap ainda não configurado no projeto.

### 14/08/2026 — Sitemap configurado, enviado e indexação solicitada
- Criado `public/sitemap.xml` estático (site só tem a rota pública `/`; `/secure` é área privada, fora do sitemap) e referenciado no `robots.txt`.
- Commit e push pro repo (`viladoscorais.com.br` na Vercel) com aprovação do Felipe — deploy confirmado no ar.
- Propriedade do Search Console estava verificada na conta `smarthomefg@gmail.com` (não `realvisionmaps360@gmail.com` — ver [[reference_gsc_multiplas_contas_google]] no sistema de memória). Sitemap enviado por lá, status "Processado".
- Indexação da home (`https://viladoscorais.com.br/`) solicitada manualmente via Inspeção de URL pelo Felipe.

### 14/08/2026 — GA4 instalado do zero
- Confirmado que o site não tinha nenhuma tag de analytics instalada.
- Propriedade GA4 "Vila dos Corais" criada na conta `realvisionmaps360@gmail.com` (measurement ID `G-8P07EHPVYR`) — conta diferente da usada no Search Console (`smarthomefg@gmail.com`).
- Tag `gtag.js` adicionada no `index.html` do site, commit e push com aprovação do Felipe, deploy confirmado no ar.

## Tempo investido
| Data | Sessão | Duração estimada |
|---|---|---|
| 14/08/2026 | Diagnóstico SSL/DNS + verificação GSC | ~1h |
| 14/08/2026 | Sitemap.xml + envio GSC + indexação da home | ~30min |
| 14/08/2026 | Instalação do GA4 do zero | ~20min |

### 13-14/07/2026 — Cobrança de R$700
- Tarefa de cobrança criada e concluída no VisionFlow, mas sem lançamento financeiro correspondente.

### 17/08/2026 — Sincronização Prioridade 4 (handoff PRD memory-dump)
- Felipe confirma: R$700 cobrados em 13-14/07 foram pagos (falta lançar no VisionFlow — inserção direta via SQL bloqueada pelo gatilho de auditoria).
- Data de início oficial confirmada: 06/01/2026 (planejamento) / 20/02/2026 (site pronto). `data_inicio` da FICHA-CLIENTE corrigido.
- Escopo do contrato confirmado: só os 3 itens já entregues (Website + Perfil Google + Instagram), sem os itens recorrentes da proposta original.
- Perfil Google Meu Negócio: bloqueio do vídeo de verificação resolvido segundo Felipe. Listagem confirmada ativa no Google Maps (5.0, 9 avaliações). Itens finos do escopo original (post inicial, link de avaliação) ainda não confirmados como concluídos.

### 17/08/2026 (continuação) — Portfólio, contrato e página de avaliação
- Página de avaliação criada (`Vila-dos-Corais-Avaliacoes.html`): link de avaliação do Google + QR code + botão de copiar, pra hóspedes.
- Case de portfólio da Real Vision escrito em PT/EN/DE — versão inicial tinha a história errada (tratava como "resgate de site quebrado"); corrigido depois que Felipe esclareceu: cliente não tinha site nenhum, Real Vision construiu do zero com calculadora de reservas + checkout WhatsApp + painel de gestão própria + fotógrafo local coordenado. Ainda local, pendente push pro site em produção.
- Contrato de prestação de serviços gerado em HTML (`ViladosCorais_Contrato_2026-08-17.html`), mesma correção de escopo aplicada. Faltam CNPJ/endereço/representante da Real Vision (Felipe ainda não passou) e confirmar número do contrato (`RV-2026-002`, proposto).
- Regra fixada: nunca expor o nome pessoal da cliente em material público — só "Vila dos Corais"/"a proprietária". Felipe decidiu não pedir autorização prévia dela pro portfólio (Termos §8.4 já cobre).

### 18/08/2026 — Cliente ativa Campanha Inteligente sozinha
- Felipe avisou a cliente que o Perfil da Empresa estava pronto; ela respondeu que colocou R$200 numa Campanha Inteligente (Smart Campaign) dentro do próprio Perfil, e perguntou o próximo passo — quer tráfego pago desde o início.
- Pesquisa registrada em [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]]: o que é o produto, aviso de que o Google parou de permitir criar Campanhas Inteligentes novas via API desde 03/08/2026, como a Real Vision assumiria a gestão. Nada executado — decisão adiada pra sessão "corais 2".

## Tempo investido (continuação)
| Data | Sessão | Duração estimada |
|---|---|---|
| 17/08/2026 | Sincronização LBOS + VisionFlow + correção FICHA/TIMELINE + contrato + portfólio + página de avaliação + correção da história | ~3h |
| 18/08/2026 | Pesquisa tráfego pago (Campanha Inteligente) + handoff de fim de sessão | ~30min |

### 19/08/2026 — Case publicado no portfólio em produção
- Felipe confirmou publicação ("pode online") e escolheu converter as imagens pra WebP antes do commit.
- Convertidas as 4 imagens (`viladoscorais-capa/1/2/3`) de JPG pra WebP via `sharp-cli` — redução de ~70% no peso (ex: `-3.jpg` 1,3MB → 369KB).
- `npm run build` validado sem erro; preview local (`localhost:8080/portfolio/vila-dos-corais`) conferido — imagens carregando 200 OK, card aparecendo no grid `/portfolio`, sem erro de console.
- Commit `7a4ccaf` ("feat(portfolio): adiciona case Vila dos Corais") isolado — não incluiu 2 mudanças soltas de outra sessão (`docs/academy/README.md`, `docs/seo-internacional/STATUS.md`) que estavam no working tree.
- Push pro `main` do repo `real-vision-core` — Vercel dispara deploy automático.

### 19/08/2026 (continuação) — Revisão do case: fotos, legibilidade e compartilhar
- Felipe revisou o case publicado e pediu 3 ajustes: trocar as fotos da galeria (eram da casa, não do projeto), dividir o texto de "Solução Aplicada" em parágrafos com negrito, e replicar a barra de compartilhar também no topo da página (mesmo padrão do blog).
- Fotos novas: 3 prints de tela enviados por Felipe (calculadora de reservas, checkout WhatsApp, painel de login) substituíram as fotos genéricas da casa na galeria — convertidas pra WebP, com legendas visíveis no lightbox.
- Texto de "Solução Aplicada" dividido em 4 parágrafos com termos-chave em negrito (função `boldify`, mesmo padrão já usado no blog).
- Barra de "Compartilhar" duplicada no topo da página (`ShareButtons`, mesmo componente do rodapé).
- Build e preview local testados sem erro antes do push (lightbox conferido mostrando a imagem e legenda corretas). Commit `a12ddd9` no `main` do `real-vision-core` — Vercel dispara deploy automático.

### 20/08/2026 — Sessão "corais 2": diagnóstico do tráfego pago e treino pra Evelin
- Felipe informou que a Flávia delegou o assunto tráfego pago pra Evelin, da equipe dela. Reunião marcada pra 21/08/2026, onde Felipe vai treinar a Evelin e decidir se a Real Vision assume a gestão como serviço formal, e por quanto.
- Pra treinar antes da reunião, reproduzimos ao vivo o erro que o Felipe vinha tomando no botão "Anunciar" do Perfil da Empresa — usando a conta própria da Real Vision 360 como teste, **nenhum acesso à conta da cliente foi usado**.
- Causa raiz confirmada: o "Anunciar" só oferece contas de primeiro nível (no caso, uma cancelada e a MCC), nunca a conta filha real onde campanha pode existir. Fluxo clássico direto em `ads.google.com`, entrando na conta filha certa, funciona normalmente.
- Rodado também um case study sobre o estado atual (20/08/2026) do produto Campanha Inteligente no mercado: API do Google Ads bloqueou criação de campanha nova desde 03/08/2026 (só API, não confirmado pra interface web), Google empurrando pra Performance Max, outros usuários reportando o mesmo tipo de erro em fóruns oficiais.
- Detalhe técnico completo e fontes em [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]].

## Tempo investido (continuação)
| Data | Sessão | Duração estimada |
|---|---|---|
| 20/08/2026 | Diagnóstico do erro no "Anunciar" + case study de mercado + registro pra reunião com Evelin | ~2h |

## Próximos marcos
- Lançar R$700 manualmente no VisionFlow.
- Confirmar itens finais do Perfil Google (post inicial, link de avaliação).
- Preencher CNPJ/endereço/representante da Real Vision no contrato e gerar versão final.
- Reunião 21/08/2026 com Evelin: treino de tráfego pago + decisão de negócio (pegar o serviço e por quanto) — ver [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]].

### 01/09/2026 — Correção do login e migração do banco para conta própria

**Problema relatado:** Flávia não conseguia entrar no painel (`/secure`). A senha
falhava e ela precisava pedir redefinição toda vez, num ciclo que nunca terminava.
Print dela mostrava `404: NOT_FOUND` da Vercel.

**Diagnóstico — três defeitos somados:**
1. Não existia `vercel.json`. Acesso direto a qualquer rota interna dava 404 da
   plataforma. Confirmado por teste HTTP: `/` respondia 200, `/secure` e
   `/reset-password` respondiam 404. Ela não conseguia nem chegar no login por link.
2. A tela de "criar nova senha" nunca tinha sido construída — nenhuma chamada
   `updateUser` no código inteiro. O link do email apontava para `/secure` (tela de
   login) e o app entrava direto no painel usando a sessão de recuperação, **sem
   nunca gravar a senha**. Daí o loop.
3. A conta dela foi criada por script com senha aleatória de 24 caracteres exibida
   uma única vez. Provavelmente ninguém nunca teve essa senha.

Defeito secundário: o login mostrava "Email ou senha incorretos" para qualquer erro,
escondendo excesso de tentativas e email não confirmado. Foi isso que manteve o
problema real invisível.

**Correções (commit `794b0ab`):**
- `vercel.json` com rewrite de SPA + headers de segurança + `noindex` em `/secure` e `/admin`
- `DefinirSenhaPage.tsx` — uma tela servindo duas rotas: `/redefinir-senha` (link do
  email) e `/primeiro-acesso` (troca obrigatória da senha provisória). Medidor de
  força, aviso de link expirado, `updateUser` de verdade com erro tratado
- `useAuth.ts` — `redirectTo` corrigido, `updatePassword`, evento `PASSWORD_RECOVERY`,
  e a chamada RPC tirada de dentro do callback de `onAuthStateChange` (padrão
  desaconselhado pelo Supabase, travava a tela em "Carregando...")
- `ProtectedRoute.tsx` — desvio para `/primeiro-acesso` quando a marca está ativa
- `SecurePage.tsx` — mensagens de erro honestas

**Migração de banco (commit `b80ebf8`):** descobriu-se que o projeto Supabase
`zilfvhgeqniddxskpgdp` foi criado pelo Lovable e **ninguém da Real Vision tinha
acesso ao painel** — sem backup, sem como corrigir permissão ou recuperar dados.
Risco maior que o problema original.

- Dados exportados com a chave pública antes de qualquer mudança (backup em
  `backup-banco-2026-09-01/`)
- Projeto novo `xcymehoyqppdgvrhytfj` criado na conta Real Vision, região São Paulo
- Estrutura recriada idêntica (tabelas, políticas RLS, funções, triggers)
- Dados migrados e conferidos: preço base R$2.000, 180 datas, 13 bloqueadas,
  145 com preço especial, de 10/01/2026 a 16/01/2027
- Conta `administracao@clisam.com.br` recriada com senha provisória `viladoscorais`,
  email confirmado, papel de admin e marca de troca obrigatória. Login testado.

**Verificação de segurança:** as políticas RLS do banco estão corretas — leitura
pública nas tabelas de preço (a calculadora precisa), escrita só para administrador.

**Pendente:** SMTP próprio (o email de recuperação ainda usa o serviço embutido do
Supabase, limitado a poucos envios por hora).

## Tempo investido (continuação)
| Data | Sessão | Duração estimada |
|---|---|---|
| 01/09/2026 | Diagnóstico do login + correção das 3 falhas + migração completa do banco para conta própria | ~3h |

### 01/09/2026 (continuação) — Loop de login: causa raiz encontrada e corrigida

**Problema relatado:** depois das correções da manhã, a Flávia digitava email e senha
e a tela ficava presa em "Carregando..." para sempre, sem erro nenhum.

**Reproduzido ao vivo em produção**, com a conta `administracao@clisam.com.br`:

| Medição | Resultado |
|---|---|
| `POST /auth/v1/token?grant_type=password` | 200 — senha e conta corretas |
| `get_current_user_role` com token real | 200, retorna `"admin"` |
| Chamadas do mesmo RPC durante o login no browser | **~200 em poucos segundos**, todas 200 |
| URL ao final | continuava `/secure` |
| Erros no console | **nenhum** |

Ou seja: banco, senha, permissão e infraestrutura estavam todos corretos. Defeito
100% de front-end.

**Causa raiz — ping-pong entre `/secure` e `/admin`:** `isAdmin` era booleano e
começava em `false`, então "ainda não sei" era indistinguível de "não é admin".
Como cada tela chamava `useAuth()` por conta própria (sem contexto compartilhado),
o `ProtectedRoute` montava um estado zerado e, no render em que a sessão já tinha
resolvido mas a consulta de papel ainda não, concluía "não é admin" e devolvia pro
login. O login conferia de novo e mandava pro painel. Loop infinito, uma consulta
ao banco por volta.

O commit `8592cdf` da manhã tinha tentado fechar essa brecha, mas fechou pela metade:
o marcador `checkingRole` também começava em `false`.

**Correção (commit `758efbc`):**
- `papel` com quatro estados (`checando` | `admin` | `nao-admin` | `erro`) — ninguém decide nada enquanto estiver `checando`
- `AuthProvider` único em volta das rotas: uma sessão, um listener, uma consulta
- a consulta lê `error` e `status`; rede/5xx/402/429 viram `erro` ("não sei"), nunca `nao-admin`
- guarda de tempo de 8s e circuit breaker de 2 tentativas
- `ProtectedRoute` mostra tela honesta com "Tentar de novo" em vez de spinner eterno, e não expulsa a usuária por falha de rede
- `SecurePage` manda direto pro destino certo quando a senha é provisória
- `scripts/resetar-senha-cliente.mjs` — reset da senha provisória (chave de serviço vem do ambiente, nunca do arquivo)

**Verificação:**
- Local: login completo vai direto pro `/primeiro-acesso` com **1 chamada** de `get_current_user_role` — era ~200
- Com a rota da consulta pendurada: tela de erro aparece após 8s, sem spinner eterno e sem logout
- Felipe entrou no painel com uma senha de teste dele e confirmou que funciona
- Produção: deploy provado pelo conteúdo do pacote servido (`index-ClGJK06m.js` contém a tela de erro nova); `/admin` sem sessão redireciona na hora pro `/secure` com **zero** chamadas de papel

**Conhecimento registrado:** skill nova `rv-portao-auth` (como construir e consertar
portão de login com papel em React + Supabase, com receita de diagnóstico e
checklist) e skill nova `vila-dos-corais` (contexto da cliente). Referências cruzadas
adicionadas em `supabase-postgres` e `rv-incidente-supabase`.

**Pendente:** a senha da conta é hoje uma senha de teste do Felipe, com a troca
obrigatória já consumida. Rodar `scripts/resetar-senha-cliente.mjs` para gerar a
provisória antes de mandar o acesso pra cliente. SMTP próprio continua pendente.

**Verificação completa dos dois fluxos de senha (produção, 01/09/2026):**

| O que | Resultado |
|---|---|
| Login com provisória → tela "Bem-vinda, Flávia!" | ✅ 1 consulta de papel |
| Criar a senha nova ali → grava e desloga de propósito | ✅ |
| Login com a senha nova → painel abre com os dados (diária R$2.000, calendário) | ✅ |
| Link de recuperação → tela "Nova senha" (antes ia pro login sem gravar) | ✅ |
| Salvar pelo link → senha nova funciona no login seguinte | ✅ |
| Link já usado → tela "Link expirado", sem falhar calado | ✅ |
| Conta devolvida ao estado de entrega (provisória + troca obrigatória) | ✅ conferido |

Script novo `scripts/gerar-link-recuperacao.mjs` (commit `254d309`): gera o link de
recuperação sem disparar email — usado no teste acima e útil pra entregar o link
direto à cliente enquanto o SMTP próprio não existe.

⚠️ **Incidente de credencial:** a chave `service_role` do projeto
`xcymehoyqppdgvrhytfj` foi colada no chat durante esta sessão. **Precisa ser
rotacionada** (Project Settings → API Keys → gerar nova). Rotacionar não afeta o
site, que usa só a chave pública `anon`.
