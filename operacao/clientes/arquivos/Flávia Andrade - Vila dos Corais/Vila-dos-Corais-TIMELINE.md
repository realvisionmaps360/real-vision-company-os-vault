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

### 20/08/2026 — Sessão "corais 2": diagnóstico do tráfego pago e treino pra pessoa de contato da cliente
- Felipe informou que a Flávia delegou o assunto tráfego pago pra pessoa de contato da cliente, da equipe dela. Reunião marcada pra 21/08/2026, onde Felipe vai treinar a pessoa de contato da cliente e decidir se a Real Vision assume a gestão como serviço formal, e por quanto.
- Pra treinar antes da reunião, reproduzimos ao vivo o erro que o Felipe vinha tomando no botão "Anunciar" do Perfil da Empresa — usando a conta própria da Real Vision 360 como teste, **nenhum acesso à conta da cliente foi usado**.
- Causa raiz confirmada: o "Anunciar" só oferece contas de primeiro nível (no caso, uma cancelada e a MCC), nunca a conta filha real onde campanha pode existir. Fluxo clássico direto em `ads.google.com`, entrando na conta filha certa, funciona normalmente.
- Rodado também um case study sobre o estado atual (20/08/2026) do produto Campanha Inteligente no mercado: API do Google Ads bloqueou criação de campanha nova desde 03/08/2026 (só API, não confirmado pra interface web), Google empurrando pra Performance Max, outros usuários reportando o mesmo tipo de erro em fóruns oficiais.
- Detalhe técnico completo e fontes em [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]].

## Tempo investido (continuação)
| Data | Sessão | Duração estimada |
|---|---|---|
| 20/08/2026 | Diagnóstico do erro no "Anunciar" + case study de mercado + registro pra reunião com a pessoa de contato da cliente | ~2h |

## Próximos marcos
- ~~Lançar R$700 manualmente no VisionFlow~~ — encerrado em 09/09/2026, ver entrada daquela data.
- Confirmar itens finais do Perfil Google (post inicial, link de avaliação).
- Preencher CNPJ/endereço/representante da Real Vision no contrato e gerar versão final.
- Reunião 21/08/2026 com a pessoa de contato da cliente: treino de tráfego pago + decisão de negócio (pegar o serviço e por quanto) — ver [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]].

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

### 07/09/2026 — Tráfego pago contratado: proposta enviada e aceita direto com a Flávia

O plano da reunião com a pessoa de contato da cliente (`PLANO-DECK-REUNIAO-CONTATO-CLIENTE-2026-08-31.md`) ficou obsoleto: **a pessoa de contato da cliente saiu do processo**, Felipe negociou direto com a Flávia. Proposta comercial `PropostaViladosCorais-GoogleAds-2026-09-07.html` enviada e **aceita**.

- Escopo: gestão de Google Ads, ciclo fechado de 3 meses, sem renovação automática, sem garantia de reservas.
- Investimento à Real Vision: R$2.400 (R$600 implementação em duas parcelas de R$300 + R$600/mês × 3 de gestão). Verba de mídia (R$1.000–1.500/mês, referência) é paga direto ao Google, fora da Real Vision.
- Flávia pagou a primeira parcela de R$300 via Pix em 07/09/2026, dando início ao trabalho — ver [[FICHA-CLIENTE]] → "Tráfego pago" para os próximos passos.

### 09/09/2026 — Plano de execução documentado (sessão na nuvem, para executar localmente)

Sessão de planejamento que levantou o estado real de três frentes e escreveu o handoff completo em [[PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09]].

- **VisionFlow:** confirmado que o pagamento de R$300 existe só no vault — a tabela `finances` da cliente (`client_id 4cda08fe-2334-4d3d-bdc4-278cb399a64d`) tem apenas as 2 linhas antigas (R$1.200 + R$1.000). Os R$700 de julho também seguem sem lançar. `client_services` está vazia para ela.
- **Gatilho de auditoria destravado:** a crença registrada em 17/08/2026 de que o lançamento via SQL era impossível está incompleta. A `skills/rv-visionflow/SKILL.md` (linhas 73-84) documenta a receita com `SET LOCAL request.jwt.claims` que resolve o erro `null value in column "user_email"`. Felipe autorizou usar esse caminho.
- **Playbook replicável:** decidido expandir a skill `rv-trafego-pago` existente (já é documento vivo com notas por caso) em vez de criar skill nova. Conteúdo fica no Company OS; o nó LBOS só referencia, nunca copia.
- **App de acompanhamento da cliente:** decidido usar Artifact com capability `db` — página de link único pra Flávia, com botões grandes, ajuda por bloco e formulário, sem depender de infraestrutura nova.
- Nada executado nesta sessão além da documentação — a execução acontece numa sessão local seguindo o plano.
- **R$700 de julho encerrados:** Felipe confirmou que já estavam embutidos no pagamento de R$1.000 de 10/03/2026. Não lançar linha nova no VisionFlow. As datas não reconciliam (cobrança em julho, pagamento em março) e ele decidiu deixar assim para acertar no futuro — deixa de ser pendência a partir de agora.

### 09/09/2026 (parte 2) — O mini-app virou Portal do Projeto: PRD recebido e arquitetura definida

Sessão de arquitetura (Opus). O mini-app previsto no [[PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09]]
(Fase 3, Artifact com `db`) **foi substituído** por uma solução dentro do próprio ecossistema da
cliente.

- **Como chegou aqui:** a sessão "flavia42" gerou o briefing `miniappviladoscoraisspec.md`, que
  foi levado a uma ferramenta externa e voltou como PRD v2.0, agora salvo em
  [[PRD-PORTAL-PROJETO-2026-09-09]].
- **Mudança de decisão:** app separado deixou de fazer sentido ao se confirmar que a cliente já
  tem site, repositório, Supabase, login e área privada de datas. O portal passa a ser uma rota
  privada dentro de `viladoscorais.com.br`, acompanhando os 3 meses do contrato de Google Ads.
- **Auditoria técnica feita** (exigência do §37 do PRD) e registrada em
  [[PLANO-ARQUITETURA-PORTAL-2026-09-09]]. Três achados que o PRD não previa:
  1. o clone local está **5 commits atrás** do `origin/main` — o `.env` dele ainda aponta pro
     Supabase antigo do Lovable (`zilfvhgeqniddxskpgdp`), corrigido no commit `b80ebf8` remoto;
  2. **não existe modelo de dois papéis.** O enum `app_role` tem um único valor (`admin`),
     `user_roles` tem uma linha só (a Flávia) e Felipe não tem conta no Supabase da cliente. A
     matriz de permissões do §8 do PRD precisa ser construída, não reaproveitada;
  3. **não existe evento de conversão.** O GA4 está instalado desde 14/08, mas sem evento de
     clique no WhatsApp — a tela Campanha depende de criá-lo, o que é pré-requisito da Fase 2.
- **Isolamento da calculadora resolvido por construção:** ela lê `house_settings` e
  `date_settings` com chave anônima, sem autenticação. Como o portal usa tabelas novas com
  prefixo `portal_`, o requisito do §11 é atendido pela arquitetura, não por disciplina.
- **7 decisões (D-A a D-G)** aguardam o Felipe antes da implementação — rota, modelo de papéis,
  prefixo de tabelas, conta do Felipe, forma de acesso da cliente, PWA e nome do portal.
- Nada de código foi escrito nesta sessão. A implementação começa numa sessão Sonnet, pela
  Fase 0 (sincronizar o repo).

### 10/09/2026 — Portal implementado: Fase 0 e Fase 1 no ar (branch `feat/portal-projeto`)

**As 7 decisões foram fechadas** (ver [[PLANO-ARQUITETURA-PORTAL-2026-09-09]] §3): rota
`/projeto`, papel `gestor` no enum, prefixo `portal_`, conta do Felipe criada agora,
acesso **só por link de WhatsApp** (sem atalho na `/admin`, que não foi tocada),
PWA só com `manifest.webmanifest`, e nome **"Acompanhamento do Projeto"**.

**Os três furos da auditoria, reconferidos antes de codar:**

| Furo | Desfecho |
|---|---|
| Repo 5 commits atrás, `.env` no Supabase do Lovable | Resolvido. `git pull`, HEAD em `254d309`, `.env` em `xcymehoyqppdgvrhytfj` |
| Sem modelo de dois papéis | Resolvido. `app_role` ganhou `gestor`; hoje existem 2 contas: `administracao@clisam.com.br` (admin) e `realvisionmaps360@gmail.com` (gestor) |
| Sem evento de conversão | Resolvido. `whatsapp_click` implementado e verificado disparando |

Achado extra: a conta da Flávia entrou por último em 07/09 com a marca de troca de senha
ativa — o reset pendente de 01/09 já tinha sido feito. Item encerrado.

**Banco (5 migrações):** tabelas `portal_project`, `portal_info`, `portal_checklist`,
`portal_weekly`, `portal_history`, todas com RLS. A cliente lê tudo do projeto mas só
escreve no que é dela; a Real Vision publica a semana. A restrição de escrita fica num
**gatilho no banco**, não no front — requisição montada na mão não passa por cima.
Também entrou `UNIQUE(user_id)` em `user_roles`, que é o que torna o `LIMIT 1` do
`get_current_user_role()` determinístico sem reescrever a função.

**Front:** `/projeto` (Agora / Já feito / Depois) e `/projeto/informacoes`. O
`ProtectedRoute` passou a receber a lista de papéis; `/admin` continua exatamente como era.
O estado `'nao-admin'` virou `'sem-acesso'` — com dois papéis, o nome antigo reintroduzia
a ambiguidade que causou o loop de 01/09.

**Três defeitos encontrados e corrigidos durante o teste** (nenhum apareceria sem abrir
o navegador):

1. **Login do gestor ficava preso.** O `SecurePage` só navegava quando o papel era
   `admin`; quem entrava como `gestor` autenticava e não ia a lugar nenhum. Lição
   registrada na skill `rv-portao-auth` §5.1.
2. **O gatilho de histórico quebrava todo UPDATE** em `portal_info`, `portal_project` e
   `portal_weekly`. `CASE` dentro de atribuição plpgsql compila como uma query só, então
   `NEW.titulo` era exigido de tabelas que não têm essa coluna. Na prática, a Flávia não
   conseguiria responder o briefing. Trocado por `IF/ELSIF`.
3. **"Desfazer confirmação" mentia:** devolvia o item para "a cliente avisou que enviou",
   mesmo quando ela nunca tinha dito nada.

**Textos aprovados pelo Felipe** com dois ajustes: fotos vão por **Google Drive**, não
WhatsApp (qualidade original, sem compressão); e o acesso ao Perfil da Empresa já entra
como resolvido, porque a Real Vision já gerencia pela conta `viladoscoraisalgodoes@gmail.com`.

**Verificado no navegador (Claude in Chrome, com o Playwright MCP fora do ar):** login do
gestor com **1 consulta de papel** (a assinatura do ping-pong seria dezenas); calculadora
**intacta** — 15 a 18/09, 3 noites, R$ 4.500, com a mensagem do WhatsApp correta; evento
`whatsapp_click` disparando com origem; persistência sobrevivendo a refresh.

**Pendente antes de publicar:** teste como a Flávia (a metade do sistema que ela usa),
teste em tela de celular (a ferramenta de redimensionar não funcionou nesta máquina —
`innerWidth` continuou 1920), marcar `whatsapp_click` como conversão no GA4, e vincular
Google Ads ao GA4. Nada foi para produção: tudo vive na branch `feat/portal-projeto`.

**Herdado e ainda aberto:** a chave `service_role` exposta em 01/09 continua sem rotacionar.

### 10/09/2026 (continuação) — GA4 conversão marcada; Google Ads travado esperando chave de acesso

Sessão local (Claude in Chrome conectado), retomando os 3 itens pendentes que exigem navegador.

**GA4 — feito.** Property certa é "Vila dos Corais" (ID `549997524`, conta `realvisionmaps360@gmail.com`) —
diferente da conta usada por padrão no navegador (`smarthomefg@gmail.com`), que não tem essa
property. Confirmado ali: stream `viladoscorais.com.br` recebendo tráfego nas últimas 48h, e
`whatsapp_click` **já estava marcado como evento principal (conversão)** — não precisou de ação
nova, só confirmação visual em Admin → Eventos → Eventos principais.

**Google Ads — bloqueado, não é erro, é rate limit do próprio Google.** Nenhuma das contas da
Real Vision hoje serve pra essa cliente:
- `smarthomefg@gmail.com` não tem acesso a nenhuma conta Ads.
- `realvisionmaps360@gmail.com` só enxerga `Real Vision Google ADS Account` (156-292-4356),
  **cancelada, cobrança pendente**.
- A MCC `359-167-3566` (nome real: "Felipe Garcia Real Vision conta google ads claude") só é
  acessível pela conta `felipegarciajericoacoara@gmail.com` — achada por tentativa, trocando
  `authuser` na URL do Google Ads até aparecer. Ela tem 1 conta gerenciada hoje: `Real Vision`
  (414-120-1211), a mesma usada como sandbox no diagnóstico de 20/08 — não é uma conta dedicada
  da Vila dos Corais.

Decisão do Felipe (opção 2 de duas propostas): criar conta Ads nova dentro dessa MCC antes de
voltar ao GA4 pra vincular. Ao tentar "Criar nova conta", o Google pede verificação humana
(reCAPTCHA "Não sou um robô") — **ação que a IA nunca executa** (regra fixa, sem exceção, mesmo
com pedido direto do Felipe). Felipe tentou resolver manualmente duas vezes; nas duas o Google
devolveu ao formulário sem criar nada. Na segunda tentativa apareceu o motivo real: o Google Ads
exige uma **chave de acesso (passkey)** cadastrada na conta antes de liberar ações sensíveis
(criar conta, vincular contas, adicionar usuário) — Felipe cadastrou a passkey em
`felipegarciajericoacoara@gmail.com`, mas o próprio Google avisa que **leva de 1 a 2 dias pra
conectar**. Não é bug, não é erro de execução — é rate limit conhecido do Google Ads.

**Pendente, retomar depois de 1-2 dias (a partir de 10/09):**
- Voltar em `ads.google.com` com `felipegarciajericoacoara@gmail.com`, entrar na MCC
  `359-167-3566`, Contas → Adicionar conta → Criar nova conta, criar a conta dedicada da Vila
  dos Corais (Pesquisa, sem Campanha Inteligente — ver [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]]).
  Se voltar a pedir reCAPTCHA depois da janela de 1-2 dias, é o Felipe que resolve.
- Depois disso, voltar no GA4 (property "Vila dos Corais") → Admin → Vínculos de produtos →
  Contas vinculadas do Google Ads → Vincular, escolhendo a conta nova (não a 156-292-4356
  cancelada).

**Login como a Flávia — feito, funciona.** `administracao@clisam.com.br` (papel `admin`, dela)
logou normal em `/secure`, caiu em `/admin` ("Bem-vinda Flávia", preços/calendário intactos) e
`/projeto` carregou certo pra esse papel: bloco "Agora" mostrando "Preparando a campanha", os 3
cards (Perguntas da campanha 0/3, Fotos da casa via Google Drive, Fotos da praia), e a lista
"Depois" com as 4 etapas futuras. Senha digitada pelo próprio Felipe na tela — a IA nunca digita
senha de cliente.

**Teste em tela de celular — não deu, ferramenta quebrada nesta máquina.** `resize_window` do
Claude in Chrome reporta sucesso mas não muda o viewport real: `window.innerWidth` continuou
`1366` depois de pedir `390x844` (confirmado via JS, não só visual). Mesmo defeito já registrado
na sessão de 09/09 ("a ferramenta de redimensionar não funcionou nesta máquina — innerWidth
continuou 1920") — agora confirmado que é uma falha estável da máquina/extensão, não pontual.
Visualmente a página empilha em coluna única e parece bem comportada, mas isso é o layout
normal (largura máxima do conteúdo é pequena mesmo em desktop) — **não prova nada sobre mobile
de verdade.** Pendente: testar num celular físico ou achar outra ferramenta de emulação nesta
máquina.

**Fechamento da sessão "corais ADS2":** os 3 itens que dependiam de navegador foram até onde
davam sem CAPTCHA nem senha de cliente. Retomar depois de 12/09/2026 pela conta Ads (ver acima)
— aí sim GA4 ↔ Ads e a campanha ficam desbloqueados.

### 10/09/2026 — Continuação "corais ADS2": UI do painel `/admin` e `/projeto`

- **Botão "Painel inicial" no `/admin`** — faltava caminho de volta pra `/projeto`; só tinha
  "Voltar ao site" e "Sair". Adicionado botão primário com ícone de casa
  (`src/components/admin/AdminHeader.tsx`).
- **Olho de mostrar/ocultar senha** no login (`src/pages/SecurePage.tsx`).
- Commit `f4a2176`, push feito, Felipe confirmou funcionando em produção (prints do celular real).
- Emulação mobile funcionou normal nesta sessão (375x812 confirmado via JS) — o defeito registrado
  em 09/09 parece ter sido da máquina, não do site.
- **Usuário de teste criado** no Supabase (`teste.rv@realvisionmaps360.com`, papel `admin`,
  sem vínculo com `date_settings`/reservas reais) — credencial em `TEMP/vila-corais-login-teste.txt`
  (fora do git), não repetida em chat.
- Ao criar esse usuário, bati num bug real do GoTrue: colunas internas (`email_change` etc.) como
  `NULL` em vez de `''` quebram QUALQUER login futuro daquele usuário com erro 500 silencioso
  ("Database error querying schema" pro cliente, mensagem real só aparece no log do Supabase:
  `error finding user: sql: Scan error on column index 8, name "email_change": converting NULL to
  string is unsupported"`). Corrigido no usuário de teste. **Auditado nas 3 contas reais do banco
  — nenhuma tinha o problema.** Não é a causa do bug relatado, mas é o tipo de coisa que vale
  monitorar se aparecer de novo (ver `rv-portao-auth`).
- Bug do "login trava na segunda tentativa" relatado pelo Felipe: **não reproduzido.** Felipe
  testou pessoalmente depois do deploy e logou normal de primeira. Fica em observação — se
  voltar a acontecer, o diagnóstico é contar requisições de rede (ver `rv-portao-auth` §7).

**Próximo passo — redesenho do "Início" (`/projeto`):** Felipe pediu, no papel de webdesigner
UI/UX, pra trocar a tela inicial (`src/pages/ProjetoPage.tsx`) de lista vertical de checklist
pra um hub com 4 cards de navegação no topo: **Datas** (→ `/admin`), **Site** (→ `/`), **Agora**
(status atual do projeto, com o checklist de tarefas pendentes embutido dentro do próprio card —
não numa lista solta embaixo) e **Informações** (→ `/projeto/informacoes`). Ainda não implementado
nesta sessão — combinado que a Romana/quem continuar no notebook dela pega esse próximo passo.
Skills a usar: `frontend-design` (sistema visual dos cards) + `web-design-guidelines` (revisão de
acessibilidade/toque mobile depois de montado). Mensagem de handoff self-contained deixada pro
Felipe colar no outro notebook — ver histórico da sessão "corais ADS2" se precisar do texto de novo.

### 10/09/2026 — Redesenho da tela "Início" do painel: hub de atalhos

**Problema:** a aba Início (`/projeto`) era uma lista vertical de cartões de
checklist, com um bloco "Agora" solto no topo e um rodapé fixo que só levava a
"Gerenciar datas". Muita rolagem para pouca informação, e nenhuma noção de
progresso — nem de etapa do contrato, nem de quanto do checklist já foi.

**Decisão do Felipe:** virar um hub com quatro atalhos no topo (Datas, Site,
Agora, Informações), com o checklist **embutido dentro do cartão "Agora"**, não
solto numa lista embaixo. Depois da primeira versão, pediu mais cor e um toque
de gamificação.

**O que foi feito** (commit `af962e5`, direto na `main`):
- `HubCard` (novo) — atalho com cor própria: Datas em verde-azulado, Site em
  coral, Agora em dourado, Informações em verde. Selo com o número que importa
  (3 pendências, 0/3 respondidas). Cartão inteiro é o alvo de toque, 116px.
- `ChecklistLinha` (novo) — a tarefa vira uma linha compacta que abre no toque,
  com marcador de estado (tracejado / relógio dourado / check verde). Mesmas
  regras de estado do `ChecklistCard`, que segue em uso no "Já feito".
- `TrilhaEtapas` (novo) — as cinco etapas do contrato como trilha, com a atual
  destacada e as passadas em check verde.
- Barra de progresso do checklist ("1 de 4 concluídas") dentro do cartão Agora.
- `PortalLayout` — sai o rodapé fixo de "Gerenciar datas" (virou o cartão Datas).
- `index.css` — token `--portal-gold` nos dois temas, para completar a paleta da
  casa sem inventar cor de fora.

**Skills do vault usadas:** `frontend-design` (paleta HSL, gradiente sutil,
micro-animações, mobile-first) e `web-design-guidelines`, que manda buscar as
regras da Vercel por WebFetch. A revisão contra elas rendeu quatro correções:
`transition: all` trocado por transição específica, `prefers-reduced-motion`
respeitado, selos marcados como decorativos para leitor de tela e números com
largura fixa na barra de progresso.

⚠️ Nenhuma das duas skills aparece em ListSkills/SearchSkills — existem só como
arquivo em `real-vision-company-os-vault/skills/`, não estão registradas no
Claude. Foram lidas direto do `SKILL.md`.

**Verificação (sessão real logada, Playwright):**

| O que | Resultado |
|---|---|
| Celular 390px — hub 2×2, cartão Agora, tarefa abrindo | ✅ print conferido |
| Computador 1440px — quatro atalhos lado a lado, trilha com rótulos | ✅ print conferido |
| Alvos de toque abaixo de 44px | ✅ zero (eram 3 no cabeçalho, corrigidos) |
| Erros de console | ✅ zero |
| `tsc --noEmit`, `eslint`, `npm run build` | ✅ os três limpos |

**Defeito pego no teste de celular:** os cinco nomes das etapas se atropelavam em
390px ("Campanha no ar" colidindo com "Acompanhamento semanal"). Os rótulos
passam a aparecer só a partir de `sm` — no celular ficam os números, e o nome da
etapa atual já está escrito logo acima da trilha.

**De passagem:** os botões "Sair", "Início" e "Informações" do cabeçalho tinham
36–38px de altura, abaixo do mínimo de toque. Subiram para 44px.

**Não tocado:** calculadora de reservas do site público, `/admin` (só ganhou o
link de entrada) e o esquema do Supabase — o trabalho foi só de frente.

**Higiene do repositório:** o `.env` está comitado no repo. A chave é a
`anon`/publishable, que por natureza já é pública no navegador, então não há
exposição — mas o arquivo não deveria estar versionado. Fica como pendência de
arrumação, avisada ao Felipe.

**Observação:** o handoff desta sessão dizia que faltava a chave do Supabase e
que existia um `.env.example`. Nenhum dos dois era verdade — o `.env` já vinha
preenchido no clone e funcionava.

### 10/09/2026 (continuação) — Tráfego pago fechado + briefing vira múltipla escolha

**Fato comercial que faltava registrar:** o deck "Anúncios no Google · Vila dos Corais"
**foi apresentado numa reunião online e a cliente aceitou**. O serviço de gestão de
Google Ads está contratado — projeto de 3 meses, conforme o deck: R$ 600 de
implementação + R$ 600/mês de gestão (R$ 2.400 no total). **Primeiro pagamento de
R$ 300 já recebido.**

Registrado no LBOS em [[REC-2026-005]] e no nó [[02-Projetos/vila-dos-corais/PROJETO]],
que passou a listar tráfego pago como escopo **ativo** (antes estava "em avaliação").

⚠️ **A esclarecer:** os R$ 300 não batem com nenhuma linha isolada da proposta. Pode
ser metade da implementação, um valor renegociado na reunião, ou uma entrada. Não foi
deduzido de propósito — ver a seção "A conferir" em [[REC-2026-005]].

**Mudança de processo:** o nó do LBOS vira a porta de entrada do projeto. Toda sessão
que for mexer na Vila dos Corais abre [[02-Projetos/vila-dos-corais/PROJETO]] primeiro,
antes de tocar em código. A regra está escrita no topo do próprio nó.

**Pessoa removida da documentação:** a ponte operacional que a cliente havia delegado
não faz mais parte do projeto. O nome dela saiu de toda a documentação — 19 ocorrências
em 7 arquivos, trocadas por "a pessoa de contato da cliente", e o arquivo do plano do
deck foi renomeado. Nada foi apagado: as frases seguem inteiras, só sem o nome próprio.

---

**Tela "Informações" redesenhada — o briefing virou múltipla escolha**

As 3 perguntas do briefing (`publico`, `periodos`, `investimento`) eram campos de texto
livre em branco. Escrever de cabeça "quem você mais quer receber" é difícil, e a
resposta que vem é vaga demais para virar palavra-chave de campanha.

Agora cada pergunta oferece opções em cartão, com ícone e cor, marcáveis no toque:

| Pergunta | Como responde | Opções |
|---|---|---|
| Quem você mais quer receber? | marca várias | casais, famílias com crianças, grupos de amigos, casamentos, quem fica semanas trabalhando de longe, turista de fora do país |
| Quais meses quer encher? | marca vários | alta temporada (dez–fev), Carnaval, feriados prolongados, meses parados (mar–jun), férias de julho, o ano todo |
| Quanto investir por mês? | marca uma | R$ 1.000, R$ 1.500, R$ 2.000 |

Todas mantêm um campo **"Outro — escreva do seu jeito"**, então nada foi tirado de quem
quer responder por escrito. A tela ganhou também um placar no topo ("0 de 3") com barra
de progresso, e cada cartão de pergunta mostra "Pergunta 1 de 3" e um selo verde
"Respondida" quando tem resposta.

**Nada mudou no banco.** A resposta continua sendo gravada como texto em
`portal_info.valor`, agora com as escolhas separadas por " · ". Quem lê a resposta pelo
lado da Real Vision vê a lista com check verde, item por item.

**Verificação (sessão real logada, Playwright):**

| O que | Resultado |
|---|---|
| Celular 390px — 3 perguntas, opções em coluna única | ✅ print conferido |
| Computador 1440px — opções em duas colunas | ✅ print conferido |
| Marcar e desmarcar opção, cor e check aparecendo | ✅ testado ao vivo |
| Alvos de toque abaixo de 44px | ✅ zero (cartão inteiro é o alvo, 60px) |
| `tsc`, `eslint`, `npm run build` | ✅ os três limpos |
| Briefing real da cliente | ✅ **intacto** — nenhuma resposta foi salva no teste |

Componentes novos: `src/components/portal/EscolhaOpcoes.tsx` (caixas de seleção e botões
de rádio de verdade por baixo, para teclado e leitor de tela funcionarem) e
`src/lib/opcoes-briefing.ts` (as opções em si, num arquivo só — mudar a lista não exige
mexer na tela).

---

**Passo a passo do acesso ao Google Ads criado**

Documento novo: `PASSO-A-PASSO-ACESSO-GOOGLE-ADS.md`, na pasta deste cliente. Separa o
que o Felipe faz (enviar o convite pela conta de administrador) do roteiro que ele vai
gravar em vídeo para a cliente (onde ela clica para aceitar). Caminho de menus conferido
na documentação oficial do Google, não de memória.

**O que trava hoje:** falta o **número de identificação da conta de Google Ads da
cliente** (10 dígitos). Sem ele não dá para enviar o convite. É o primeiro passo do
roteiro do vídeo — ela vê o número no canto superior direito ao entrar em
`ads.google.com`.

**Próximos passos do tráfego pago, na ordem:**
1. Cliente responde as 3 perguntas do briefing (agora em múltipla escolha).
2. Cliente manda o número da conta e aceita o convite de vínculo à MCC `359-167-3566`.
3. Ligar o GA4 (`G-8P07EHPVYR`) à conta de anúncios dela e marcar `whatsapp_click` como
   conversão principal — o evento já dispara no site, conferido no código hoje.
4. Montar a campanha de Pesquisa e levar para aprovação **antes** de qualquer gasto.

### 11/09/2026 — Os R$ 300 esclarecidos + conta certa no passo a passo

- Felipe confirmou: os R$ 300 são **metade dos R$ 600 de implementação**. A dúvida
  registrada ontem está resolvida. LBOS: [[REC-2026-005]] (recebida, confiabilidade
  alta), [[REC-2026-006]] (2ª metade, R$ 300, prevista) e [[REC-2026-007]] (gestão,
  3 × R$ 600, prevista). Datas das parcelas previstas ainda não definidas.
- `PASSO-A-PASSO-ACESSO-GOOGLE-ADS.md`: a Parte A agora diz **qual conta** usar —
  logado como `felipegarciajericoacoara@gmail.com`, na MCC `359-167-3566`, e não na
  `414-120-1211` nem na `156-292-4356`. Regra do Felipe: toda instrução de Google Ads
  cita o número da conta.
- Parte A ainda **não** foi feita: falta o número da conta de anúncios da cliente.
  Mensagem pedindo o número preparada para o Felipe enviar.

### 11/09/2026 (continuação) — Correções: o vault deste notebook estava atrasado

As entradas de 10/09 e 11/09 acima foram escritas no notebook da Romana, cuja cópia do
vault estava dias atrás do notebook do Felipe. Ao sincronizar, apareceram os registros
de 07/09, 09/09 e 10/09 feitos lá. Três afirmações das entradas deste notebook estavam
erradas e ficam corrigidas aqui (as originais foram mantidas, conforme a regra de nunca
apagar nota):

- **"O fechamento não estava documentado"** — estava. A proposta foi aceita e registrada
  em 07/09/2026 (entrada "Tráfego pago contratado" acima e `FICHA-CLIENTE.md`).
- **"R$ 300 recebidos em 10/09"** — foram pagos via **Pix em 07/09/2026**. A segunda
  metade da implementação é cobrada **quando a campanha for ao ar**. LBOS corrigido em
  [[REC-2026-005]] e [[REC-2026-006]].
- **"Falta marcar `whatsapp_click` como conversão"** — já está marcado como evento
  principal no GA4 desde 10/09 (property "Vila dos Corais", ID `549997524`). O que
  continua faltando é o **vínculo GA4 ↔ Google Ads**, que depende da conta de anúncios.

**Decisão em aberto sobre a conta de anúncios:** em 10/09 o Felipe decidiu criar uma
conta **nova** dentro da MCC `359-167-3566` (travada até a passkey de
`felipegarciajericoacoara@gmail.com` ativar, 1 a 2 dias). Em 11/09 foi preparado, neste
notebook, um passo a passo e uma mensagem no caminho contrário: **vincular a conta que a
cliente já tem** (a dos R$ 200). Os dois caminhos são incompatíveis — esperando o Felipe
escolher antes de mandar qualquer mensagem à cliente.

Registro das duas máquinas criado em `operacao/gestao/infraestrutura/maquinas-de-trabalho.md`.
