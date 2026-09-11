# Plano de Execução — Tráfego Pago Vila dos Corais

> **Documento de handoff.** Escrito em 09/09/2026 numa sessão na nuvem (Opus) para ser
> executado numa sessão local (Sonnet). Contém tudo que já foi pesquisado — quem executar
> **não precisa refazer a investigação**, só seguir as fases.
>
> Cliente: [[FICHA-CLIENTE]] · Histórico: [[Vila-dos-Corais-TIMELINE]] · Projeto no LBOS: `PRJ-2026-005`

---

## Contexto — por que este plano existe

Flávia Andrade (Vila dos Corais) aceitou a proposta de **gestão de Google Ads** e pagou os
**R$300** da primeira parcela da implementação em **07/09/2026** (Pix). O trabalho começou.

Proposta: `PropostaViladosCorais-GoogleAds-2026-09-07.html` (na pasta desta cliente, não
versionada no git porque o vault só rastreia `.md`).

| Item | Valor |
|---|---|
| Implementação | R$600 — R$300 no início (**pago 07/09**) + R$300 quando a campanha for ao ar |
| Gestão | R$600/mês × 3 meses |
| **Total à Real Vision** | **R$2.400** |
| Verba de mídia (paga direto ao Google, fora da RV) | R$1.000–1.500/mês, referência preliminar |

Ciclo fechado de 3 meses, sem renovação automática, sem comissão sobre a verba, sem garantia
de número de reservas.

**Mudança de interlocutor:** o deck `PLANO-DECK-REUNIAO-CONTATO-CLIENTE-2026-08-31.md` está obsoleto.
A pessoa de contato da cliente saiu do processo — Felipe fechou direto com a Flávia.

### Os três problemas que este plano resolve

1. **O pagamento não aparece no VisionFlow.** Só foi registrado no vault (Markdown). O painel
   que o Felipe realmente olha continua mostrando R$2.200.
2. **O processo não está documentado como playbook.** O Felipe quer que este projeto vire
   material replicável — pra ensinar no curso da Real Vision Academy e pra aplicar no próximo
   cliente de tráfego pago, refinando a cada rodada, seguindo as diretrizes do LBOS.
3. **A cliente não tem por onde responder o que precisamos dela.** Faltam materiais (fotos,
   vídeos) e acessos (conta Google Ads). Ela não tem intimidade com tecnologia — precisa de
   uma interface visual simples, um link só, salvo na conversa do WhatsApp.

---

## Skills por fase (rv-skill-scout aplicado)

Ativar no início de cada fase, não todas de uma vez. Emitir o aviso `*→ skill X ativada*`
conforme a `rv-skill-scout` manda.

| Fase | Skills | Por quê |
|---|---|---|
| **Todas** | `realvision` | Contexto e voz da marca — sempre primeiro em qualquer tarefa do negócio |
| **0 — Pasta** | `obsidian` · `rv-novo-cliente` | `rv-novo-cliente` carrega a convenção de pasta e docs base; `obsidian` pros wikilinks |
| **1 — VisionFlow** | `rv-visionflow` · `supabase-postgres` | A receita do JWT simulado está na `rv-visionflow`; `supabase-postgres` pro cuidado com RLS/trigger |
| **2 — LBOS + playbook** | `lbos` · `lbos-memoria` · `lbos-impacto` · `lbos-atualizacao` · `rv-trafego-pago` · `obsidian` | O LBOS exige o fluxo de Documento Vivo com ponto de parada; `rv-trafego-pago` é onde o playbook vai morar |
| **3 — Mini-app** | `rv-copy` · `rv-design` · `artifact-capabilities` · `artifact-design` | `rv-copy` pro texto que a cliente lê; `artifact-capabilities` **antes** de escrever qualquer código com `db` |
| **4 — Fechamento** | `superpowers` · `rv-fim-sessao` | Git/push e atualização de ficha/timeline no fim |

**Lacuna encontrada na `rv-skill-scout`:** não existe entrada de "tráfego pago" no
*Mapeamento por tipo de tarefa* (a skill só aparece no *Mapa de skills locais*). Corrigir na
Fase 2 — adicionar a entrada, conforme o gatilho de skill modificada da própria scout.

---

## FASE 0 — Estruturar a pasta da cliente (PC ↔ vault)

Pedido do Felipe em 09/09/2026: alinhar a pasta dela no PC com a do vault. **Fazer primeiro**,
antes das outras fases — é o que garante que o resto da sessão trabalha em cima do material completo.

### O que o vault tem hoje (versionado no git)

```
operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/
├── FICHA-CLIENTE.md                            ← hub da pasta
├── Vila-dos-Corais-TIMELINE.md
├── PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09.md   ← este documento
└── PLANO-DECK-REUNIAO-CONTATO-CLIENTE-2026-08-31.md     ← obsoleto, manter (nunca apagar nota)
```

### O que existe só localmente (não versionado — o `.gitignore` do vault libera só `.md`)

- `PropostaViladosCorais-GoogleAds-2026-09-07.html` — a proposta aceita
- `site/` — repositório do site da cliente (ignorado explicitamente no `.gitignore`)

### Arquivos citados nos documentos mas ausentes desta máquina

Confirmar no PC do Felipe se existem e onde estão. Estão referenciados na TIMELINE/FICHA mas
não foram encontrados no vault:

| Arquivo | Citado em |
|---|---|
| `Vila-dos-Corais-Avaliacoes.html` | página de avaliação com QR code (17/08/2026) |
| `ViladosCorais_Contrato_17-08-26.html` | rascunho de contrato, faltam CNPJ/endereço/representante |
| `VilaDosCorais_Situacao_16-06-26.pdf` | documento de situação inicial |
| `Porposta Comercial Flávia Andrade 2 (1).pdf` | proposta original do pacote de R$2.900 (nome com typo no original) |

### Como estruturar

- **Convenção de pasta:** `Nome - Empresa` (já correta).
- **Convenção de deliverable HTML — DECIDIDO em 09/09/2026:** os arquivos ficam com os nomes
  diferentes mesmo, como estão. **Não renomear nada.** As duas formas coexistindo
  (`ViladosCorais_Contrato_17-08-26.html` e `PropostaViladosCorais-GoogleAds-2026-09-07.html`)
  são aceitas — renomear arquivo já entregue quebraria referência nos documentos sem ganho real.
- **Não versionar HTML/PDF à força.** O `.gitignore` ignorar tudo que não é `.md` é
  intencional — os binários e entregáveis vivem no PC/Drive, o vault carrega o conhecimento.
- **Regra de wikilink:** todo `.md` novo nesta pasta linka pro hub ([[FICHA-CLIENTE]]) e o hub
  linka de volta. Já aplicado neste documento.
- **Nunca apagar** nada da pasta, nem o deck obsoleto da pessoa de contato da cliente — regra de ouro do Company OS.

### `PROJETO.md` — DECIDIDO: não mexer

A `rv-novo-cliente` prevê `<CLIENTE>-PROJETO.md` como doc base, e esta pasta não tem. Felipe
decidiu em 09/09/2026: **não mexer nisso.** A FICHA + a TIMELINE + o nó do LBOS (`PRJ-2026-005`)
já cobrem o estado do projeto. Não criar o arquivo — assunto encerrado, não reabrir.

---

## FASE 1 — Lançar o pagamento no VisionFlow

**Decidido pelo Felipe:** usar a receita SQL com JWT simulado (ele mesmo autorizou), não a
interface.

### Fatos já confirmados (não precisa reinvestigar)

- **Projeto Supabase:** `ghwjetvazmdlaqidgxqi`
- **`client_id` da Flávia:** `4cda08fe-2334-4d3d-bdc4-278cb399a64d`
  (nome "Flávia Andrade", empresa "Vila dos Corais", `status_pipeline: desenvolvimento`)
- **Schema real de `finances`** (verificado via `list_tables`):

| Coluna | Tipo |
|---|---|
| `id` | uuid PK, default `gen_random_uuid()` |
| `client_id` | uuid, FK → `clients.id` |
| `descricao` | text, default `''` |
| `valor` | numeric, default `0` |
| `data` | timestamptz, default `now()` |
| `status` | enum `payment_status` = `pago` \| `pendente` |
| `moeda` | enum `currency_code` = `BRL` \| `CHF` |
| `taxa_cambio` | numeric, nullable |
| `created_at` | timestamptz |

- **Estado atual da tabela pra ela:** exatamente 2 linhas — R$1.200 (09/01/2026) e R$1.000
  (10/03/2026), ambas `pago`. Nada mais.
- **`client_services`:** **zero linhas** pra ela. Nenhum serviço registrado, nem os antigos.
- **`deliveries`:** 3 linhas, todas `entregue` (Website, Instagram, Perfil Google).

### O gatilho de auditoria — resolvido, não é bloqueio

A crença registrada no vault de que "o gatilho de auditoria exige usuário autenticado pela
interface" (que travou os R$700 em agosto) está **incompleta**. A `skills/rv-visionflow/SKILL.md`
(linhas 73-84) documenta a receita que resolve:

```sql
BEGIN;
SET LOCAL request.jwt.claims = '{"sub":"<user-id>","email":"<email>"}';
INSERT INTO ... ;
COMMIT;
```

O trigger grava em `audit_logs` e lê o claim JWT da sessão Postgres pra preencher
`user_email` (NOT NULL). Sem o `SET LOCAL`, o insert estoura. A sessão de 17/08/2026
simplesmente não conhecia essa seção da skill.

### Passos

1. Descobrir o `user_id` e `email` reais do Felipe pra montar o claim:
   ```sql
   select id, email from auth.users;
   ```
   (candidato esperado: `realvisionmaps360@gmail.com` — confirmar antes de usar)
2. Rodar a transação com o `SET LOCAL` correto, inserindo:
   - `descricao`: `Google Ads — implementação (1ª parcela)`
   - `valor`: `300`
   - `data`: `2026-09-07`
   - `status`: `pago`
   - `moeda`: `BRL`
3. Validar com `SELECT` mostrando as linhas de `finances` daquele `client_id` — a skill
   `rv-visionflow` é explícita: validar com insert real, nunca só leitura.
4. Conferir no painel (`https://visionflow.realvisionmaps.com`) que o card "Total" subiu.

### Os R$700 de julho — RESOLVIDO, não mexer

**Decisão do Felipe em 09/09/2026:** os R$700 já estavam embutidos no pagamento de R$1.000
registrado em 10/03/2026. **Não lançar linha nova.** Ele reconhece que o registro não fecha
perfeitamente (a cobrança dos R$700 é datada de 13-14/07, depois do pagamento de março) e
decidiu deixar como está — conserta no futuro, não agora.

Os registros antigos que pedem "lançar R$700 manualmente" em [[FICHA-CLIENTE]],
[[Vila-dos-Corais-TIMELINE]] e `LBOS/02-Projetos/vila-dos-corais/checklist.md` estão
**superados por esta decisão**. Não tratar como pendência.

### Uma decisão que ainda precisa do Felipe

- **As parcelas futuras.** A tabela tem status `pendente` e o painel tem um card "Pendente"
  hoje zerado. Lançar as 4 parcelas restantes (R$300 + 3× R$600) como `pendente` faria o
  painel mostrar o contrato real (Total R$4.600 / Pago R$2.500 / Pendente R$2.100). Ou ele
  prefere lançar só quando cada uma for paga? Perguntar antes de executar.

**Não fazer:** nenhum espelhamento automático vault ↔ VisionFlow. O Felipe pediu
explicitamente "só adicione lá agora, não faz espelhamento de nada por enquanto".

---

## FASE 2 — Playbook replicável (LBOS + expandir `rv-trafego-pago`)

**Decidido pelo Felipe:** expandir a skill `rv-trafego-pago` existente, **não** criar skill nova.

### Por que ali e não em outro lugar

A `rv-trafego-pago` já é um documento vivo — a partir da linha 105 ela acumula notas por caso
real (a nota do botão "Anunciar" de 20/08/2026 nasceu justamente deste cliente). É o padrão
"refina a cada rodada" que o Felipe descreveu. Adicionar seções novas ali segue o que já existe.

### Regra de fronteira do LBOS (não violar)

`ARQUITETURA.md:144-156` — a ponte LBOS ↔ Company OS é de **mão única**: nós do LBOS
referenciam o Company OS via a chave `referencia:`; o Company OS nunca ganha frontmatter LBOS.

Na prática:
- **Conteúdo do playbook** → Company OS (`skills/rv-trafego-pago/SKILL.md`)
- **Nó do LBOS** (`LBOS/02-Projetos/vila-dos-corais/PROJETO.md`) → só uma linha nova no
  `## Histórico` + `atualizado_em` corrigido. **Nunca copiar o conteúdo do playbook pra lá.**

### O fluxo dos 7 passos — o passo 5 é ponto de parada obrigatório

1. **Memória** (`lbos-memoria`) — já feito nesta sessão: `PRJ-2026-005` existe;
   `trafego-pago-pesquisa.md` existe como nó de apoio. Não criar duplicata.
2. **Classificação** — o playbook é conhecimento operacional do Company OS, não entidade LBOS nova.
3. **Entidades** — nenhuma nasce. Só o `PROJETO.md` existente é tocado.
4. **Relações** — nenhuma aresta nova do vocabulário fechado. Só histórico e `atualizado_em`.
5. **IMPACTO — PARAR AQUI.** Apresentar as 6 perguntas ao Felipe e esperar resposta antes de
   escrever qualquer coisa. Respostas já levantadas nesta sessão, a confirmar com ele:

   | # | Pergunta | Resposta levantada |
   |---|---|---|
   | 1 | Quais projetos são afetados? | `PRJ-2026-005` Vila dos Corais |
   | 2 | Quais objetivos dependem disso? | Nenhum objetivo registrado no LBOS aponta pra cá |
   | 3 | Alguma previsão financeira muda? | Sim — serviço novo de R$2.400, primeira parcela recebida |
   | 4 | Existe decisão a revisar? | Sim — a de 20/08 ("decisão de negócio adiada") está resolvida |
   | 5 | Existe tarefa nova? | Sim — passos 2 a 5 da proposta (materiais, acessos, reunião, campanha no ar) |
   | 6 | Algum risco aumentou/diminuiu? | Nenhum novo registrado |

6. **Atualização** — só depois do OK:
   - `LBOS/02-Projetos/vila-dos-corais/PROJETO.md`: corrigir `atualizado_em` (hoje
     `2026-08-17`, defasado — o histórico já vai até 01/09) + linha nova no `## Histórico`.
   - `skills/rv-trafego-pago/SKILL.md`: seção nova no mesmo padrão das notas existentes,
     cobrindo o que **já é fato**: como estruturar proposta de implementação + gestão mensal,
     como abordar cliente que já tem Campanha Inteligente ativa com verba própria, e a
     estrutura de parcelamento que funcionou. **Não inventar** o que ainda não aconteceu — o
     restante do playbook (onboarding, acompanhamento semanal, relatório final) vai sendo
     escrito conforme o trabalho real acontece, ao longo dos 3 meses.
   - `skills/rv-skill-scout/SKILL.md`: adicionar a entrada faltante no *Mapeamento por tipo de
     tarefa*, algo como:
     `### Tráfego pago / Google Ads para cliente` →
     `realvision` + `rv-trafego-pago` + `marketing-seo` (tracking é pré-requisito) + `rv-relatorio` (proposta).
7. **Registro** — linha de histórico nos nós tocados.

### Material de curso (Real Vision Academy)

O Felipe quer isso como aula também. **Ainda não executar** — a `rv-course-builder` monta
curso inteiro de 6 módulos, e aqui o material provavelmente é **um módulo dentro** de um curso
existente (`operacao/cursos/`, hoje com 01 a 04). Isso é uma decisão dele: curso novo `05-` ou
módulo dentro de um existente. Perguntar quando o playbook tiver massa crítica — não agora,
com uma parcela paga e nenhuma campanha no ar.

---

## FASE 3 — Mini-app da Flávia (Artifact + capability `db`)

**Decidido pelo Felipe:** Artifact com capability `db`, sem tocar no VisionFlow/Supabase.

### O que é

Uma página publicada, link único, mandado uma vez no WhatsApp dela e salvo na conversa. Ela
reabre o mesmo link sempre que precisar fazer algo pra campanha.

**Regra de ouro desta fase:** a página fala com a **cliente**, não com a Real Vision. Nada de
LBOS, Company OS, VisionFlow, "playbook", "skill", nomes de ferramenta interna. Nada de
linguagem informal demais nem de jargão técnico. Ela precisa abrir e entender em 5 segundos.

### Arquitetura

- `capabilities: {db: {}}` — declarar na chamada do Artifact.
- **Carregar a skill `artifact-capabilities` antes de escrever qualquer linha que use `claude.use("db")`** — o contrato é a autoridade, não a memória.
- Estado em coleção **compartilhada** (`clientes/vila-dos-corais/...`), **não** em
  `data/users/` (esse prefixo é privado por viewer — o Felipe não conseguiria ler o que ela
  respondeu) e **não** em `localStorage` (não sai do navegador dela).
- Sem dado sensível. A parte de "acessos" pergunta **se ela já deu o acesso**, nunca pede
  senha, login ou credencial.

### Estrutura da página (v1)

**3 blocos ativos:**

| Bloco | O que faz |
|---|---|
| 📸 **Fotos e vídeos pra campanha** | Explica em linguagem simples o que serve de material e pede pra mandar no WhatsApp. Botão "já mandei" grava no `db`. Sem upload na v1 — evita complexidade desnecessária |
| 🔑 **Acessos necessários** | Explica passo a passo o que ela precisa fazer pra dar acesso da conta Google Ads. Botão "já fiz" grava no `db` |
| 📋 **Formulário** | Perguntas objetivas, traduzidas do briefing da `rv-trafego-pago` pra linguagem leiga: quem ela quer atrair, épocas do ano que mais importam, quanto ela topa investir por mês no Google |

**Blocos futuros:** desenhados na mesma grade, mas visivelmente bloqueados (opacidade
reduzida + cadeado, sem `onclick`). Não precisa decidir quantos agora — quando chegar a vez de
cada um, é só editar e republicar no mesmo link. Candidatos naturais: reunião estratégica,
campanha no ar, relatório final.

**Ícone de interrogação por bloco:** abre uma explicação curta em linguagem de gente comum.
Exemplo de tom: *"É onde o Google mostra sua casa pra quem está procurando pousada na região."*

### Design

Identidade da Real Vision, de `contexto/DESIGN.md`: fundo `#0a0d14`, âmbar `#F5A623`,
Bebas Neue nos títulos, Inter no corpo. Da `rv-design`: alvo de toque mínimo 44px, corpo nunca
abaixo de 16px, no máximo 3 campos visíveis por vez no formulário.

**Ponto de atenção sobre a voz:** o `contexto/VOZ.md` é a voz **comercial B2B** da marca
("consultores de presença digital", linguagem de conversão e ROI). Aplicar isso literalmente
numa página pra ela vai soar errado. Não existe no vault nenhuma diretriz de linguagem pra
cliente leigo — é lacuna real. **Recomendação:** escrever com frases curtas, calorosas e
concretas, e mostrar o texto pro Felipe aprovar antes de publicar.

### Limitações a comunicar ao Felipe

- O link do Artifact é um domínio `claude.ai`, não `realvisionmaps.com`. Se ele quiser marca
  própria depois, o caminho é o precedente do Cartão Digital (React + Vercel + subdomínio),
  bem mais trabalhoso.
- Não há aviso automático quando ela responde algo. O acompanhamento é sob demanda — o Felipe
  pede e a sessão consulta o `db` (`read_db`).

### Antes de mandar pra cliente

Publicar, mandar o link pro **Felipe** revisar primeiro. Ele decide quando repassar pra Flávia.

---

## FASE 4 — Fechamento

1. Atualizar [[FICHA-CLIENTE]] e [[Vila-dos-Corais-TIMELINE]] com o que foi efetivamente feito.
2. `git status`, commit e push. Lembrar: **o vault só versiona `.md`** (`.gitignore` ignora
   tudo e libera só `*.md`, pastas e exceções estreitas). HTML de proposta e o Artifact não
   entram no git — isso é intencional, não forçar `git add`.
3. Rodar o diagnóstico final da `rv-skill-scout` (seção "Diagnóstico final"): reportar o que
   foi feito, o que ficou pendente, e qualquer desvio deste plano.

---

## Próximos passos do serviço (contexto pra quem executa)

Ordem que veio da própria proposta comercial, seção 03. É isso que o mini-app da Fase 3
destrava para os passos 2 e 3:

| # | Passo | Status |
|---|---|---|
| 1 | Aprovação da proposta | ✅ feito — R$300 pagos em 07/09 |
| 2 | Materiais (fotos, vídeos, criativos) | ⬜ |
| 3 | Acessos (conta Google Ads, forma de pagamento dela) | ⬜ |
| 4 | Reunião estratégica (público, verba, datas de prioridade) | ⬜ |
| 5 | Campanha no ar → cobrar os R$300 restantes | ⬜ |

**Regra da `rv-trafego-pago` que vale pra este cliente:** o botão "Anunciar" do Perfil da
Empresa não funciona pra conta debaixo de MCC. Caminho certo: `ads.google.com` → entrar na MCC
`359-167-3566` → seletor de conta **interno** → conta filha → "Nova campanha" → "Criar uma
campanha sem orientação" → "Pesquisar". E tracking validado **antes** de qualquer campanha —
o GA4 do site já existe (`G-8P07EHPVYR`), mas o vínculo GA4 ↔ Google Ads da conta dela e o
evento de conversão (clique no WhatsApp da calculadora de reservas) ainda não.

---

## Relacionados

- [[FICHA-CLIENTE]] — ficha da cliente, seção "Tráfego pago"
- [[Vila-dos-Corais-TIMELINE]] — linha do tempo do projeto
- [[PLANO-DECK-REUNIAO-CONTATO-CLIENTE-2026-08-31]] — **obsoleto**, a pessoa de contato da cliente saiu do processo
- `LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa.md` — diagnóstico técnico do produto
- `skills/rv-trafego-pago/SKILL.md` — onde o playbook vai crescer
- `skills/rv-visionflow/SKILL.md` — receita do JWT simulado (linhas 73-84)
