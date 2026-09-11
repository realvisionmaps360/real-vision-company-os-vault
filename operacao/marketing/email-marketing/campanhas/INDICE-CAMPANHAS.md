# Índice de Campanhas

> Toda campanha disparada pela Real Vision, em ordem. O `sequencia_id` é reservado aqui antes do
> disparo pra nunca haver dois usos do mesmo número.

---

## Campanhas

| ID | Nome | Quando | Contatos | Estado |
|---|---|---|---|---|
| 001 | Primeira comunicação | — | — | disparada (antes do registro estruturado) |
| 002 | Seu site é o maior ativo digital | 20/07/2026 | 31 | disparada · **modelo visual de referência** |
| 003 | — | — | — | disparada (antes do registro estruturado) |
| 004 | Ciclo 1 · Fase 1 — Semear Autoridade | 27/08 a 11/09/2026 | 25-47 | **completa — emails 1, 2, 3 e 4 disparados** |
| 005 | Ciclo 1 · Fase 2 — Transformação | previsto 16/09 | — | ⬜ não escrita |
| 006 | Ciclo 1 · Fase 3 — Posse e oferta | — | — | ⬜ não escrita |

---

## Campanha 002 — a régua

`002-site-maior-ativo-digital.html`

Disparada em 20/07/2026 para 31 contatos. É o **modelo visual oficial** de todo email da Real
Vision: masthead em imagem (`masthead-002.png`, grid-bg com o logo embutido), CTA como link
sublinhado âmbar, sem foto de hero solta, assinatura com a foto do Felipe.

Aparece com abertura zero no banco. **Isso é ausência de medição, não ausência de leitura** — o
webhook do Resend só passou a existir em 20/08/2026 e não preenche retroativo.

---

## Campanha 004 — Fase 1

| # | Arquivo | Assunto A | Post / ativo | Data |
|---|---|---|---|---|
| 1 | `004-01-google-parou-de-mandar-cliente.html` | Seu site foi lido hoje, só não por gente | `site-maior-ativo-era-ia` | **27/08 ✅ disparado** |
| 2 | `004-02-o-que-a-gente-ve-no-seu-gmn.html` | 3 coisas que matam seu Google Meu Negócio | `google-meu-negocio-guia-completo` | **01/09 ✅ disparado** |
| 3 | `004-03-tour-360-eventos.html` | Tour virtual 360° aplicado a eventos | portfólio + blog post Universo Paralello 18° | **07/09 ✅ disparado** (47 enviados) |
| 4 | `004-04-solarium-aarau.html` | Do Brasil à Suíça | portfólio + post Solarium Aarau | **11/09 ✅ disparado (47 enviados)** |

### Disparo do email 1 — 27/08/2026, 11h32 UTC

- **28 enviados, 0 falhas.** Confirmado em `email_envios` (`variante_ab = A`)
- Assunto usado: "Seu site foi lido hoje, so nao por gente"
- Teste visual antes do disparo: `smarthomefg@gmail.com`, `resend_id 6b5db43c-0dd8-408a-b8bf-e25dcdeee3f2`,
  aprovado por Felipe com print (logo carregou, assinatura carregou, descadastro visível)
- Texto reescrito por Felipe na hora, antes do disparo: parágrafo do 51% mais direto, ponte nova
  para "é obrigatório ter site", menção à narração em áudio do post, e o P.S. trocado de "semana
  que vem" para "daqui a poucos dias" por causa da nova cadência

### Catch-up do email 1 — 07/09/2026

- **24 enviados, 0 falhas, 0 duplicados.** Contatos captados via WhatsApp entre 01/09 e 04/09/2026
  (depois do disparo original), que por isso não tinham recebido o email 1.
- Antes do envio, corrigido um problema real: 6 desses contatos estavam salvos com
  `status = 'confirmado'` em vez de `'ativo'` — o mecanismo de disparo (script e função) só
  considera `'ativo'`, então ficariam pra sempre fora de qualquer campanha sem essa correção.
  Normalizados pra `'ativo'` antes do envio.
- Mecanismo: função temporária `hermes-catchup-004-01` (mesmo padrão da `hermes-campanha` — chamada
  via anon key, nenhum segredo saiu do Supabase), com checagem de duplicidade contra `email_envios`
  embutida antes de cada envio. Rodado primeiro em modo dry-run (conferido: 24/24, 0 pulados),
  depois disparo real. Desativada (410) logo em seguida.
- Lista completa de nome/email/telefone em
  [[../09-LISTA-CAPTADOS-WHATSAPP|09-LISTA-CAPTADOS-WHATSAPP]].
- **Total acumulado do email 1: 52 enviados** (28 originais + 24 do catch-up).

### Disparo do email 2 — 01/09/2026, 16:23 UTC

- **25 enviados** (`email_envios`, sequência `004-02 - 3 coisas que matam seu Google Meu Negocio`).
- Disparado por uma function temporária (`hermes-batch-004-02`), sem que esta sessão registrasse o
  disparo aqui nem no [[02-TIMELINE]] na hora — só foi confirmado em 07/09, direto no banco, quando
  o Felipe perguntou pelo status da campanha. A function já estava desativada (corpo esvaziado,
  responde 410) quando foi conferida.

### Teste visual do email 3 e do email 4 — 07/09/2026

- Como o E3 atrasou (previsto 06/09, não disparou), o Felipe pediu pra ver os dois antes de aprovar.
- Function `hermes-campanha` reativada temporariamente (mesmo destinatário travado no código,
  `realvisionmaps360@gmail.com`, chamada via anon key do projeto — nenhum segredo saiu do Supabase),
  usada pros dois testes, e desativada de novo (410) na sequência.
- E3 (rascunho Ilha do Contrato): `resend_id 1d32a38c-8a5c-41ad-8fc1-64011bed0b1f`.
- E4: `resend_id 272645f3-acaf-4065-a784-7188da2454c5`.
- Nenhum dos dois foi disparado pra lista real — só o teste. Falta aprovação do Felipe.

### E3 trocado de gancho — 07/09/2026

- Felipe achou o texto da Ilha do Contrato fraco depois de ver o teste. Pediu pra trocar pelo
  case do **Universo Paralello 18°** (festival de música eletrônica, Praia de Pratigí-BA):
  conceito **Destino 360°**, 81 panoramas (maior cobertura 360° de festival de música no Brasil),
  reconhecimento do DJ Alok, link pro blog post de bastidores. Título definido pelo Felipe:
  "Tour virtual 360° aplicado a eventos".
- Novo arquivo: `004-03-tour-360-eventos.html`. O antigo `004-03-ilha-do-contrato.html` foi mantido
  no disco (não apagado), só não é mais o que vai pra lista.
- Sem foto no corpo do email — decisão do Felipe, mantém o padrão dos outros 3 emails da fase.
- Teste visual reenviado com o texto final: `resend_id b24604f6-8816-4dbb-8044-4dbbff38af93`,
  `realvisionmaps360@gmail.com`. Function `hermes-campanha` desativada de novo depois do envio.
- Felipe aprovou o texto ("ficou bom") logo em seguida.

### Disparo do email 3 pra lista real — 07/09/2026

- **47 enviados, 0 falhas, 0 duplicados.** Primeiro disparo real do E3 (até aqui só teste). Decisão
  do Felipe: pular o catch-up do email 2 pros 24 contatos captados via WhatsApp e ir direto pro
  email 3 com toda a lista ativa atual, em vez de um catch-up por etapa.
- Achado no meio do caminho: **Flávia Andrade (Vila dos Corais)** tinha confirmado o email por
  WhatsApp em 02/09 e nunca foi salva — a varredura de confirmações buscava só domínio comum
  (@gmail/@hotmail/etc.), e o dela é `@clisam.com.br`. Corrigida e adicionada antes do disparo (ver
  [[../08-COLETA-WHATSAPP]], seção "Achado 07/09/2026"). **Pendência maior ainda aberta:** ~152
  linhas do documento de coleta seguem "aguardando resposta" sem revarredura completa — decisão do
  Felipe foi não travar este disparo por isso, mas o re-check completo continua pendente.
- Nome do contato `mikey.mp3@gmail.com` corrigido de "Mikkel (Mike)" pra "Mickel Angelo" antes do
  envio, a pedido do Felipe.
- Mecanismo: função temporária `hermes-blast-004-03` (mesmo padrão — anon key, checagem de
  duplicidade embutida, busca `status='ativo'` dinamicamente em vez de lista fixa). Dry-run
  conferido (47/47, 0 pulados) antes do envio real. Desativada (410) em seguida.
- **Total acumulado do email 3: 47 enviados.**

### CTA passa a apontar pra `/links-uteis/` — 07/09/2026

- **Decisão do Felipe, vale pra todo email novo daqui pra frente:** o link do CTA não vai mais
  direto pro post/portfólio específico. Aponta pra `https://realvisionmaps.com/links-uteis/`
  (página estilo linktree da Real Vision: WhatsApp direto, Site, Portfólio, Blog, YouTube).
  O texto do CTA continua prometendo o conteúdo específico (ex: "Ver os bastidores do Universo
  Paralello 18°"), só o destino mudou.
- Regra gravada em `skills/rv-email/SKILL.md` (seção Regras de Voz), pra não se perder em sessões
  futuras — inclusive pra Fase 2 e 3, ainda não escritas.
- Aplicado nos dois emails ainda não disparados: `004-03-tour-360-eventos.html` e
  `004-04-solarium-aarau.html`. Emails 1 e 2 não foram mexidos — já saíram, link antigo fica como
  histórico.
- **Reenviados com o link corrigido:** E3 `resend_id 2d59d01a-64d2-42d3-9390-47d2e7c7cd2a`, E4
  `resend_id 01230280-c989-458f-95e9-dfb5ea5efe43`, ambos pra `realvisionmaps360@gmail.com`.
  Function `hermes-campanha` desativada de novo depois do envio. Falta só a aprovação do Felipe
  pra disparar os dois pra lista.

### CORREÇÃO 07/09/2026 (mesmo dia, depois do disparo real do E3) — a decisão acima estava errada

O que ficou registrado acima ("CTA aponta pra `/links-uteis/`") não era a intenção real do Felipe.
O destino `/links-uteis/` era pra entrar no **link da assinatura** ("realvisionmaps.com", rodapé do
email), não no **CTA principal**. Como o CTA já tinha ido assim pro E3 (disparado pros 47 antes do
Felipe notar o erro), o problema virou real: o texto prometia "ver os bastidores" e entregava uma
página de links genérica.

**Correção aplicada:**
1. `/links-uteis/` (site) ganhou o post do Universo Paralello 18° como **primeiro item da lista** —
   mitigação pra quem já recebeu o E3 e clicar hoje.
2. CTA principal do E3 e do E4 voltou a apontar direto pro conteúdo específico (post do blog / case).
3. O link da assinatura ("realvisionmaps.com") em E3 e E4 agora É o link pra `/links-uteis/` —
   essa era a intenção original.
4. Emails 1 e 2 (já disparados antes dessa decisão existir) não foram mexidos.
5. Conferido: a regra errada nunca chegou a ser gravada em `skills/rv-email/SKILL.md` (a nota
   anterior dizia que sim, mas não achei o texto lá). Gravada agora a regra corrigida: link da
   assinatura → `/links-uteis/`, CTA → direto pro conteúdo.
6. Push do `/links-uteis/` (site) feito — commit `3014762`, post do Universo Paralello 18° já é o
   primeiro item da página em produção.
7. Novo teste do E4 com os links corrigidos, mandado só pro `realvisionmaps360@gmail.com`
   (`resend_id a432000d-1a1c-40a6-bda5-b1debc99f291`) — envio avulso, não gravado em `email_envios`
   (mesmo padrão dos testes anteriores). E4 segue **não disparado** pra lista real, aguardando
   aprovação do Felipe depois de conferir esse teste.

### Reenvio do teste do E4 — 09/09/2026

- Ao corrigir o painel (`_PAINEL.md`), reenviado o teste do E4 pro `realvisionmaps360@gmail.com`
  pra confirmação final antes do disparo real. `resend_id eb935cd4-2f01-4a6f-bd43-5371642c6626`.
  Mecanismo: função `hermes-teste-004-04` reativada temporariamente (mesmo padrão — destinatário
  travado no código, só `RESEND_API_KEY`, nenhum outro segredo exposto), chamada via anon key
  público do projeto, desativada (410) logo em seguida.
- Conteúdo idêntico ao HTML atual em disco (`004-04-solarium-aarau.html`): CTA direto pro post do
  blog, link da assinatura pra `/links-uteis/`, sem P.S.
- **E4 segue não disparado pra lista real.** Aguardando o Felipe conferir este teste e aprovar.

### Disparo do email 4 pra lista real — 11/09/2026, ~12h10 UTC

- **47 enviados, 0 pulados, 0 erros.** Dry-run rodado antes (47/47 `seria_enviado`), depois disparo
  real via `hermes-blast-004-04`, chamada diretamente via `pg_net` (extensão de HTTP assíncrono do
  Postgres) porque a sessão que disparou não tinha egress HTTP direto liberado para o domínio do
  Supabase — só a chave anon pública saiu, nenhum segredo exposto.
- **Duas rotinas agendadas (Local e Nuvem) foram criadas antes pra esse disparo, ambas pro mesmo
  horário (hoje, 9h BRT) — decisão foi manter só a Nuvem.** A rotina Local foi apagada. A rotina
  Nuvem, porém, **sumiu da lista sem disparar** antes das 9h (motivo não identificado — pode ter
  sido apagada sem querer durante a edição do texto, ou falha da plataforma, ainda em research
  preview). Como o horário programado já tinha passado, o disparo foi feito manualmente nesta
  sessão em vez de esperar a rotina ser recriada.
- Romana Loznjakovic confirmada na lista (`status='ativo'`) e recebeu (`resend_id
  027bde4b-2404-4f47-b181-5ea568dce033`) — checagem feita antes do disparo porque ela relatou não
  ter recebido os emails anteriores. O banco mostra que ela recebeu e abriu E1, E2 e E3
  (`email_envios`), o que contradiz o relato dela — hipótese mais provável é abertura de imagem
  pré-carregada pelo Gmail em spam/promoções sem leitura real; vale confirmar com ela onde os
  emails anteriores caíram.
- Nova skill criada por causa desse episódio: `skills/rv-rotinas-claude/SKILL.md` — cobre Local vs
  Nuvem, regra de "uma tarefa = uma rotina", e template de instruções com checagem de duplicidade
  (Passo 0) antes de disparar.
- **Total acumulado do email 4: 47 enviados.**

---

## Incidente de 21/08/2026 — template errado

Registrado aqui porque não pode se repetir.

O primeiro teste visual do email 1 saiu com **dois** problemas:

1. **Remetente errado** — saiu pelo Gmail pessoal em vez do domínio, porque não havia acesso ao
   `HERMES_SECRET`. Contornado com uma função temporária (`hermes-test-send`).
2. **Cabeçalho errado** — usava o `template-newsletter.html` da skill, que estava desatualizado e
   **nunca tinha sido o modelo real**. O modelo real sempre foi o da campanha 002.

Os dois `resend_id` do episódio: o teste corrigido final foi
`27ac474a-4e5b-4109-82e3-9030539464f4`.

**Regra que nasceu daí:** antes de qualquer teste visual, comparar contra um email real já
disparado. Não confiar de memória em qual template está ativo.

**Rastro que ficou:** a função `hermes-test-send` foi esquecida ativa em produção por seis dias,
com chave fraca embutida e acesso ao `RESEND_API_KEY`. Desativada em 27/08/2026.

---

## Relacionados

- [[README]] — hub da pasta
- [[04-CALENDARIO-EDITORIAL]] — o que vem depois
- [[02-TIMELINE]] — histórico completo

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-21 | Versão original criada | Sessão `email1` |
| 2026-08-27 | **Reescrito do zero** | O original se perdeu sem cópia. Reconstruído e atualizado com o disparo real da campanha 004 |
| 2026-09-07 | E2 marcado como disparado; registrado o teste visual de E3 e E4 | Confirmado no banco que o E2 saiu em 01/09 sem que o índice fosse atualizado na hora |
| 2026-09-07 | E3 trocado de gancho e aprovado; CTA de E3 e E4 passa a apontar pra /links-uteis/ | Felipe achou o gancho antigo fraco e decidiu centralizar todo link de email numa página só |
| 2026-09-07 | Catch-up do E1 pros 24 contatos captados via WhatsApp | Felipe pediu pra fechar a lacuna sem duplicar nem esquecer ninguém; corrigido também status `confirmado` → `ativo` de 6 contatos que ficariam fora de qualquer disparo futuro |
| 2026-09-07 | E3 disparado pra lista real (47) | Felipe decidiu pular o catch-up do E2 e ir direto pro E3 com a lista toda; Flávia Andrade (Vila dos Corais) achada e corrigida no meio do caminho (confirmação de email perdida desde 02/09 por ponto cego de busca por domínio) |
| 2026-09-09 | Painel corrigido (E3 estava "agendado" mas já tinha sido disparado; pendência do P.S. do E4 seguia aberta já resolvida); novo teste do E4 reenviado pro email de teste | Felipe pediu documento vivo pro LBOS + aprovação do E4; achada divergência entre painel e estado real ao criar [[../../../LBOS/02-Projetos/prospeccao-conecta-negocios/PROJETO|PRJ-2026-008]] |
| 2026-09-11 | E4 disparado pra lista real (47), campanha 004 completa | Rotina agendada (Nuvem) sumiu antes de disparar às 9h; disparo feito manualmente via `pg_net`. Romana confirmada na lista após relatar não ter recebido os anteriores — banco mostra que recebeu e abriu E1/E2/E3, contradição não resolvida |
