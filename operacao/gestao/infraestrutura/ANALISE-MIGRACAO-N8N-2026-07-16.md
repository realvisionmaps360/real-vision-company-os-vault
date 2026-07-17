# Análise: quais fluxos migrar para o n8n

> **Data:** 16/07/2026
> **Origem:** varredura completa do Company OS (66 skills, 18 pastas de cliente, projetos internos, sistema de aquisição, Hermes)
> **Status:** análise. Nada construído, nada configurado. Documento para decisão do Felipe.

---

## O problema

A instância n8n (Cloudfy) está paga e ociosa.

Isso não é falta de decisão. O `CLAUDE.md` já declara n8n + Evolution API como stack oficial de automação. O `VOICE-AI-INTEGRATION-PLAN.md` já desenha o n8n como orquestrador entre o Acquisition Claude e o Ultravox. A nota `project_n8n_mcp.md` já antecipa o primeiro caso de uso: "formulário do site → notifica WhatsApp → salva no VisionFlow".

A decisão foi tomada. A implantação nunca saiu. A fatura corre.

---

## 1. Diagnóstico — o que já roda sozinho hoje

| O que | Onde | Gatilho |
|---|---|---|
| Sync das memórias | GitHub Actions (`memoria/.github/workflows/sync.yml`) | cron `0 */2 * * *` |
| Sync do vault | VPS Hostinger, `vault-sync.sh` | cron 1h, das 8h às 20h + fim de sessão |
| Relatório mensal de clientes | Scheduled task do Claude Code | cron `0 9 1 * *` |
| Lembretes (rascunhos, Brazilcomp) | Scheduled tasks do Claude Code | agendado |
| Edge Functions do Brazilcomp | Supabase (`mercadopago-webhook`, `send-order-email`, etc.) | evento/webhook |

As Edge Functions do Brazilcomp são o precedente que importa: automação event-driven, sem LLM no meio, rodando em produção há meses. O padrão funciona. Só não foi aplicado internamente.

**Todo o resto é manual.**

---

## 2. A linha vermelha — o que NUNCA vai pro n8n

Esta seção vem antes do ranking de propósito. É o filtro que valida tudo abaixo.

O Company OS repete a mesma regra em quatro documentos independentes: **Claude gera o artefato, Felipe aprova, Felipe dispara.** Está na Mission 1 da Aquisição (congelada), no `feedback_prompt_primeiro_nunca_executar`, no README do relatório mensal e na Fase 3.4 do Hermes.

Portões humanos congelados (Seção 6 do `ACQUISITION-OPERATING-SYSTEM.md`):

- Enviar qualquer mensagem externa
- Cotar preço, prazo ou escopo
- Fechar contrato
- Criar card no VisionFlow (handover é manual por decisão de arquitetura da Mission 2)
- Religar `do_not_contact`
- 1ª abordagem em mercado ou segmento novo
- Falar direto com cliente
- Mudança estratégica (ICP, oferta, capacidade)

Some-se a isso o que exige julgamento e fica no Claude: copy, escopo, interpretação de cláusula, decisão de correção de código, leitura de resposta de cliente.

**Conclusão que orienta o ranking:** o n8n não substitui o Claude na geração nem o Felipe no disparo. Ele entra no **gatilho, no transporte e na persistência** — as três coisas que hoje dependem de você lembrar de rodar um comando.

---

## 3. Ranking — do melhor ao pior candidato

### 🥇 1. Relatório mensal de clientes

| | |
|---|---|
| **Gatilho** | cron dia 1, 9h (já existe) |
| **n8n faz** | puxa GA4 → monta HTML do template → salva na pasta do cliente → cria rascunho no Gmail **com o anexo** → atualiza TIMELINE |
| **Continua com você** | revisar e disparar o email |
| **Esforço** | médio |
| **Retorno** | alto |
| **Pré-requisito** | credenciais GA4 + Gmail no n8n |

**Por que é o #1:** é o único item da lista que resolve uma dor já documentada. O README registra que anexar o HTML de 150-300KB via base64 no MCP consumiu ~230k tokens e inviabilizou o anexo — a solução atual é referenciar o caminho do arquivo e você anexar à mão. O n8n move binário sem tokenizar nada. O problema simplesmente deixa de existir.

Fila já definida: Solarium Aarau (GA4 `properties/538376459`, alemão + versão PT) e Conectando Saúde (`properties/537716669`, português).

Bônus: hoje adicionar cliente à lista exige editar a tabela **e** o prompt da scheduled task. No n8n, vira uma linha.

---

### 🥈 2. Follow-up Engine da Aquisição

| | |
|---|---|
| **Gatilho** | `next_followup_date <= hoje` |
| **n8n faz** | query no Supabase → monta a fila do dia → prepara o rascunho → registra o evento |
| **Continua com você** | ler e enviar |
| **Esforço** | médio |
| **Retorno** | alto |
| **Pré-requisito** | banco `gexacmtkjqectfqwhunv` (já ativo em produção) |

**Por que é o #2:** regra de data pura — T+4 dias, T+10 dias, máximo 3 toques. Já está escrita como IF→THEN na Seção 7 do Operating System. Zero julgamento no gatilho. O banco já existe, com RLS e dedup `pg_trgm`.

Limite WIP registrado: ~20 follow-ups vencendo por semana. Isso é tempo seu, toda semana, gasto em consulta e lembrança.

---

### 🥉 3. Campanha de Reativação (13 tours vencidos)

| | |
|---|---|
| **Gatilho** | data do tour + 12 meses |
| **n8n faz** | detecta vencimento → abre a ficha → agenda a sequência (email → WhatsApp em 3 dias) |
| **Continua com você** | Hermes escreve, você aprova e envia |
| **Esforço** | baixo |
| **Retorno** | alto |
| **Pré-requisito** | datas dos tours em tabela (hoje estão em markdown) |

**Por que é o #3:** o gatilho é aritmética. Hoje mora na sua memória. Fila conhecida (13 clientes, segmentos A/B/C), oferta definida (R$100 reativação por 1 ano + upsell cartão digital), sequência definida.

Receita recorrente que depende de você lembrar de uma data é receita que vaza.

---

### 4. Formulário do site → WhatsApp → VisionFlow

| | |
|---|---|
| **Gatilho** | submit do formulário (webhook) |
| **n8n faz** | recebe → notifica seu WhatsApp (Evolution API) → grava no VisionFlow |
| **Continua com você** | responder o lead |
| **Esforço** | baixo |
| **Retorno** | médio |
| **Pré-requisito** | Evolution API de pé + URL pública do n8n |

**Por que aqui:** é o caso de uso que o próprio `project_n8n_mcp.md` antecipa. É o "hello world" da instância — valida webhook, Evolution API e Supabase de uma vez só. Retorno médio, mas destrava os outros.

---

### 5. Weekly Operating Cycle da Aquisição

| | |
|---|---|
| **Gatilho** | semanal, 8 passos em ordem |
| **n8n faz** | queries no Supabase → `report_snapshots` → capacity check |
| **Continua com você** | decidir o que fazer com cada lead |
| **Esforço** | alto |
| **Retorno** | alto |
| **Pré-requisito** | #2 de pé + Fase 2 (migrar Paraty do markdown pro banco) |

Alto valor, mas tem dependência real. A campanha de Paraty (35 pousadas pesquisadas, 31 WhatsApp + 17 emails enviados em jun/2026) ainda está em markdown, fora do banco.

---

### 6. Disparo do Hermes

| | |
|---|---|
| **Gatilho** | sequência agendada |
| **n8n faz** | chama a Edge Function `hermes-send` via HTTP |
| **Continua com você** | aprovar a lista e o texto (Fase 3.4) |
| **Esforço** | baixo |
| **Retorno** | médio |
| **Pré-requisito** | **lista de clientes ativos + consentimento LGPD** |

**Tecnicamente é trivial:** a Edge Function `hermes-send` está deployed (v4), autenticada por `HERMES_SECRET`, registra cada envio no banco e injeta link de descadastro LGPD automaticamente. O teste chegou na inbox em 23/06. Resend verificado, domínio com SPF/DKIM/DMARC, região São Paulo.

Cai para o #6 porque o bloqueio da Fase 3 não é técnico. É a lista e o consentimento — e isso depende de você, não de ferramenta. Automatizar o transporte de uma sequência que não existe não entrega nada.

---

### 7. Monitoramento Google Ads + saldo Pix

| | |
|---|---|
| **Gatilho** | diário |
| **n8n faz** | consulta saldo e performance → alerta no WhatsApp se saldo < X |
| **Continua com você** | recarregar, ajustar lance |
| **Esforço** | baixo |
| **Retorno** | baixo-médio |

A campanha "SLM vs LLM" (conta `414-120-1211`, R$7/dia) é pré-paga e pausa sozinha se o saldo acabar. Alerta simples, valor real, escopo pequeno.

---

### 8. `rv-intencao-busca`

Tecnicamente o mais limpo de todos: chamada de API pública (Google Autocomplete), zero julgamento no fetch. Seria trivial no n8n.

Fica no #8 porque é **sob demanda, não recorrente**. Automatizar o gatilho de algo que você chama quando quer rende quase nada. O n8n ganha dinheiro em cima de repetição no tempo, não em cima de facilidade técnica.

---

### 9. YouTube — análise semanal e relatório mensal

Bem especificado (`youtube-analise-semanal`, `youtube-relatorio-mensal`), gatilho claro, dados estruturados.

Fica no #9 por dois bloqueios: o MCP do YouTube não está instalado, e o público-alvo do canal ainda é hipótese não validada. Automatizar a medição antes de validar o que se mede é construir em cima de dúvida.

---

### 10. Sync FICHA-CLIENTE / TIMELINE ↔ VisionFlow

É o mais tentador da lista: toda sessão de cliente termina com você colando o texto de Observações à mão no CRM. Copy-paste puro, alta frequência.

**Fica em último não por dificuldade — por contrariar decisão sua.** O handover manual está registrado como decisão de arquitetura na Mission 2 do sistema de aquisição, e "criar card no VisionFlow" está na lista de portões humanos inegociáveis da Seção 6.

Automatizável tecnicamente. Bloqueado por escolha. Se quiser mudar, muda-se a decisão primeiro, o workflow depois.

---

## 4. Sequência recomendada

**Passo 1 — #4 (formulário do site).** Baixo risco, valida a instância inteira: webhook, Evolution API, Supabase. Se algo estiver mal configurado no Cloudfy, você descobre aqui e não no meio de um fluxo que importa.

**Passo 2 — #1 (relatório mensal).** Dor documentada, gatilho já existe, dois clientes na fila. É o primeiro workflow que devolve tempo de verdade.

**Passo 3 — #2 (follow-up engine).** Maior retorno de tempo da lista, mas exige o banco de aquisição em uso real. Depois dos dois primeiros você já vai saber operar a ferramenta.

---

## 5. Pendência antes de construir qualquer coisa

Confirmar plano e limites da instância Cloudfy:

- [ ] Quantas execuções o plano inclui por mês
- [ ] Quantos workflows ativos são permitidos
- [ ] Tem URL pública para webhook (necessário para o #4)
- [ ] Onde ficam as credenciais e como são criptografadas

**Se houver teto baixo de execução, este ranking muda.** A ordem acima prioriza tempo economizado. Com limite de execução apertado, a prioridade vira volume — e o #7 (checagem diária) sobe ou sai, dependendo do teto.

---

## Fontes

Tudo neste documento é rastreável ao Company OS. Nada inventado.

- [ACQUISITION-OPERATING-SYSTEM.md](../../prospeccao/ACQUISITION-OPERATING-SYSTEM.md) — Seções 6 (portões humanos), 7 (follow-up), 10 (ciclo semanal), 14 (capacidade)
- [relatorio-mensal-clientes/README.md](../../projetos/_RV-Internos/relatorio-mensal-clientes/README.md) — cron, gargalo do anexo base64, clientes na fila
- [03-CLIENTES-REATIVACAO - Corrigido.md](../../marketing/email-marketing/03-CLIENTES-REATIVACAO%20-%20Corrigido.md) — 13 clientes, segmentos, oferta
- [project_n8n_mcp.md](memoria/project_n8n_mcp.md) — caso de uso antecipado
- [VOICE-AI-INTEGRATION-PLAN.md](../../prospeccao/VOICE-AI-INTEGRATION-PLAN.md) — n8n como orquestrador
- `operacao/marketing/email-marketing/` — Hermes, fases 1 a 4
- `CLAUDE.md` — stack de automação declarada

---

## Observação fora do escopo

O [reference_catalogo_skills.md](memoria/reference_catalogo_skills.md) está desatualizado. Faltam: `rv-trafego-pago`, `rv-course-builder`, `client-briefing-generator`, `instagram-weekly-content`, `pipeline-weekly-update`, `humanizer`, `gnomo-monstro`, `earth-game`, `manahh`, `coroa-azul`, `wood-art`. E lista `wix-seo-autopilot`, que não existe como pasta.

Registrado aqui, não alterado.
