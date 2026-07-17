---
name: rv-prospeccao
description: Playbook completo de prospeccao da Real Vision 360 — oferta de entrada 360 (R$25) e chatbot IA white-label B2B2B para agencias.
---

# rv-prospeccao — Playbook de Prospecção

Skill para replicar campanhas de prospeccao da Real Vision. Inclui dois playbooks: (1) oferta de entrada 360 (foto aerea por R$25 para negocios locais) e (2) chatbot IA white-label B2B2B para agencias de marketing digital.

---

## Playbook 1 — Oferta de Entrada 360°

### O que e a oferta

**Tripwire:** publicar uma foto 360° aerea navegavel (igual Street View) no perfil do Google Meu Negocio do cliente por **R$25**.

- Objetivo real: **nao e lucrar R$25** — e abrir a porta para upsell (site, tour completo, GMB, automacoes)
- Publicacao via **Pano2VR / Street View Studio** — Felipe publica sozinho, **nao precisa de acesso do cliente**
- Cliente so precisa dar: **autorizacao verbal + Pix**

**PIX fixo:** CPF 389.729.498-25 · Felipe Garcia · Nubank

### Quando usar este playbook

- Felipe esta em uma nova cidade e quer captar clientes locais rapidamente
- Alvo: pousadas, restaurantes, atracoes turisticas, comercio local — qualquer negocio com perfil no Google Maps
- Nao usar para clientes ja cadastrados no VisionFlow

### Fluxo completo

#### Etapa 1 — Definir alvo

Perguntar ao Felipe:
- Qual cidade?
- Qual segmento? (pousadas, restaurantes, bares, etc.)
- Quantos contatos quer tentar? (recomendado: 30-50 por rodada)

#### Etapa 2 — Pesquisar contatos

**Metodo: terminal + curl (Yahoo/Bing)** para buscar negocios locais.

Queries que funcionam:
```
pousada [cidade] WhatsApp telefone contato [ano]
restaurante [cidade] WhatsApp reservas site
[nome do negocio] Paraty WhatsApp Instagram
```

Para cada contato, levantar:
- Nome do negocio (exato, como aparece no Google Maps)
- WhatsApp (prioridade) — verificar se parece numero de celular (9 digitos)
- E-mail (secundario — alguns sao invalidos, verificar se parece real)
- Se nao achar: Instagram + site oficial como fallback

**Licoes aprendidas em Paraty:**
- Muitos numeros fixos (ex: 3371-XXXX) NAO tem WhatsApp — nao vale tentar
- E-mails de dominio `.com.br` antigos as vezes ja nao existem
- Numeros com `99XXX-XXXX` ou `98XXX-XXXX` (celular) = mais confiavel para WA
- Fontes mais confiaveis: site oficial do negocio > booking.com/TripAdvisor > Google Maps
- Prioridade alta: negocios no centro historico / area turistica principal

#### Etapa 3 — Criar o documento de contatos + registrar campanha no banco

**Banco primeiro:** antes de criar o arquivo de contatos, registrar a campanha e os prospects no banco `rv-acquisition` (`gexacmtkjqectfqwhunv`). Seguir o contrato em `operacao/prospeccao/ACQUISITION-CONTRACT.md`:

1. INSERT em `campaigns` com o codigo `[cidade]-[segmento]-[ano-mes]`
2. Para cada negocio: dedup + INSERT em `prospects` + evento `encontrado` + score + `prospect_services`
3. INSERT em `campaign_prospects` vinculando prospect `<->` campanha

**Arquivo de contatos** e a camada humana de trabalho — gerada apos o banco:

Arquivo em: `operacao/prospeccao/[cidade]-[segmento]-contatos.md`

Estrutura por pousada:
```
#### [N]. [Nome do Negocio]
**WhatsApp:** [(XX) XXXXX-XXXX](https://wa.me/55XXXXXXXXXXX) · **E-mail:** [email] · ☐ WA · ☐ Email

`[mensagem WA pronta]`
```

#### Etapa 4 — Gerar mensagens personalizadas

**WhatsApp — template padrao:**
```
Oi! Aqui e o Felipe, da Real Vision 360. Somos Guias Locais do Google e contribuidores do Street View — andamos pelo Brasil atualizando imagens de cidades e regioes no Google Maps.

Nossa equipe esteve em [CIDADE] esses dias atualizando as imagens aereas da regiao. Aproveitamos pra oferecer tambem pro comercio local: incluir uma dessas fotos 360 diretamente no perfil do Google do negocio.

Quase nenhum[a] [SEGMENTO] de [CIDADE] tem foto 360 no perfil — a maioria fica com a galeria vazia. Com a imagem, toda vez que alguem abre o perfil d[a/o] [NOME DO NEGOCIO] no Google vai se deparar com uma panoramica aerea de [CIDADE] a 500 metros de altura, navegaveis tipo Street View.

Conheca nosso trabalho: realvisionmaps.com/sobre

Se quiserem a foto no perfil de voces, e R$25. So precisamos da sua autorizacao e do Pix — CPF 389.729.498-25 (Felipe Garcia, Nubank). Eu publico automaticamente e fica online em alguns dias e fica la pra sempre.

Se nao tiver interesse no momento, nao precisa responder. Abraco!
```

**E-mail — template padrao (sem assinatura — Felipe coloca a propria):**
```
Ola!

Sou o Felipe, da Real Vision 360. Somos Guias Locais do Google e contribuidores do Street View — percorremos o Brasil atualizando imagens de cidades e regioes diretamente no Google Maps.

Nossa equipe esteve em [CIDADE] recentemente atualizando as imagens aereas da regiao. Aproveitamos para oferecer tambem para os negocios locais: a possibilidade de incluir uma dessas imagens 360 no perfil do Google do estabelecimento.

Quase nenhum[a] [SEGMENTO] de [CIDADE] tem fotos 360 anexadas ao perfil — a galeria fica vazia para a maioria. Com a imagem, toda vez que alguem abrir o perfil da [NOME] no Google vai se deparar com uma panoramica aerea a 500 metros de altura, navegaveis tipo Street View.

Veja nosso trabalho completo em: realvisionmaps.com/sobre

Se quiserem a foto no perfil de voces, e R$25. So precisamos da sua autorizacao e do Pix — CPF 389.729.498-25 (Felipe Garcia, Nubank). Eu publico automaticamente e a imagem fica online em alguns dias e fica la pra sempre.

Se nao tiver interesse no momento em nada do que oferecemos, nao precisa responder a esta mensagem.
```

**Assunto do e-mail:** `Foto 360 aerea no perfil do Google — [Nome do Negocio]`

#### Etapa 5 — Criar rascunhos no Gmail

- Usar `htmlBody` (nao `body`) para evitar que links virem URLs longas do Google
- **NAO incluir assinatura** — Felipe coloca a propria assinatura do adm@realvisionmaps.com
- Remetente: Felipe troca para `adm@realvisionmaps.com` antes de enviar
  - Como trocar: abrir rascunho em tela cheia -> clicar na linha "De:" -> selecionar alias

#### Etapa 6 — Felipe envia manualmente

- WhatsApp: copia do documento e manda um a um
- E-mail: abre cada rascunho no Gmail, muda "De:" para adm@realvisionmaps.com, envia
- Marcar checkbox no documento conforme envia
- **Apos cada envio confirmado:** registrar no banco evento `abordado_wa` ou `abordado_email` + atualizar `last_contacted_at` + setar `next_followup_date` (+4 dias) + `current_status = 'abordado'`

#### Etapa 7 — Follow-up (3-4 dias depois)

Se nao respondeu, WhatsApp simples:
```
Oi! Passei aqui pra ver se tinham visto minha mensagem sobre a foto 360 no perfil do Google. Qualquer duvida estou a disposicao. Abraco!
```

#### Etapa 8 — Quando responder positivamente

1. Confirmar autorizacao + PIX recebido
2. Buscar perfil do negocio no Google Maps pelo nome
3. Publicar via Pano2VR / Street View Studio
4. Avisar cliente quando ficar online
5. Registrar no VisionFlow (status "Entregue")
6. Retomar em 2-3 dias para upsell (site, tour completo, GMB)

### Priorizacao de alvos

**Alta prioridade:**
- Centro historico / area turistica principal
- Perfil Google Maps com galeria vazia ou fotos de baixa qualidade
- Negocio sem site profissional (ainda mais potencial de upsell)

**Media prioridade:**
- Negocios perto do centro, com contato direto

**Baixa / pular:**
- Hoteis grandes (100+ quartos) — provavelmente tem fotografos profissional
- Redes / franquias — decisao nao e local
- Negocios de altissimo padrao (R$1000+/noite) — provavelmente ja tem tudo

### Segmentos a expandir na Fase 2

Para aplicar o mesmo playbook em outros segmentos da mesma cidade ou nova cidade:
- Restaurantes e bares
- Pousadas e hoteis (ja testado)
- Atracoes turisticas (passeios de barco, trilhas, cachoeiras)
- Lojas e boutiques de artesanato
- Espacos de eventos

Adaptar: trocar "pousada" por segmento na mensagem, e o gancho ("quase nenhum restaurante de [cidade] tem...").

---

## Playbook 2 — Chatbot IA White-Label B2B2B

### O que e

Vender chatbot de IA (site, Instagram, WhatsApp) como produto white-label para **agencias de marketing digital**. A agencia revende com markup de 100% para os clientes dela. Voce instala, configura e mantem. A agencia nao mexe em tecnologia.

### Quando usar este playbook

- Felipe quer prospectar **agencias** (nao clientes finais)
- Oferta nao e tripwire de R$25 — e produto de receita recorrente
- Publico alvo: donos de agencia de marketing digital (2-15 pessoas), full-service ou regionais

### Ferramentas de prospeccao disponiveis

| Ferramenta | Uso | Capacidade | Limitacao |
|---|---|---|---|
| **Terminal + curl (Yahoo/Bing)** | Buscar agencias por cidade e segmento | Encontrar nomes, sites, contatos | Buscadores bloqueiam scraping pesado (captcha) |
| **Resend** | Disparo de email automatizado | Envio com tracking, sequencia programada | Precisa de API key configurada |
| **Gmail** (manual) | Envio manual de emails | Sem limite de volume, mais pessoal | Manual, sem automacao |
| **Supabase VisionFlow** | Registrar leads e campanhas | Estrutura de banco pra acompanhamento | Precisa dos dados |
| **n8n** | Pipeline completo de prospeccao | Automatizar busca/envio/registro | Ainda nao configurado pra prospeccao |

### Regra de ouro do primeiro contato (aprendida em 05/07/2026 — confirmada pelo Felipe)

**Email 1 = se apresentar + fazer perguntas apenas. ZERO venda.**

O primeiro email nao oferece nada. Ele cria rapport. Parece que voce esta fazendo uma pesquisa de mercado genuina. A venda vem no Email 2.

**Framing validado:** "Cliente mistério" — voce se passa por empresario procurando servico. Isso:
- Remove a pressao de venda
- Faz a agencia responder naturalmente (quer ajudar um potencial cliente)
- Revela se eles tem o servico ou nao
- Cria abertura natural para o Email 2 (se nao tem, voce oferece a parceria)

### Estrutura da sequencia fria para agencias

**Email 1 — Rapport (so perguntas):**
- Se apresenta de forma simples ("Aqui e o Felipe, da Real Vision")
- Contexto minimo do que faz
- 1-2 perguntas genuinas sobre o dia a dia da agencia
- Tom: curioso, nao vendedor
- CTA: responder as perguntas (nao comprar nada)

**Email 2 — Oferta (2-4 dias depois):**
- Se respondeu: agradece e mostra como o chatbot resolve a dor que ela mencionou
- Se nao respondeu: retoma com "sem resposta ainda, mas vou ser direto"
- Apresenta o chatbot white-label como solucao
- Destaca: inteligencia real (nao menu de botoes), conversa humanizada, entende contexto, chama ramal, conhece o setor do cliente
- **NAO mencionar tour 360 nem outros upsells** — sao produtos separados
- Urgencia: "padrao de 2026 e responder em segundos"
- CTA: "me responde SIM que eu te mostro"

### Dores da agencia (para usar no copy)

- Cliente pede chatbot e ela nao tem o que oferecer
- Perde receita recorrente que podia entrar todo mes
- Terceiriza pra fornecedor generico sem controle
- Quer aumentar ticket medio sem aumentar carga da equipe

### Diferenciais do chatbot (mencionar no Email 2)

- **Inteligencia real** — conversa humanizada, entende contexto, nao e menu de botoes
- **Chama ramal** — integra com telefonia do cliente
- **Conhece o setor** — a IA entende o negocio do cliente e responde como a melhor atendente
- **Base editavel** — cliente atualiza o conhecimento do bot por interface simples
- **White-label** — agencia revende com a marca dela
- **Zero trabalho tecnico** — voce instala, configura e mantem

### O que NAO fazer

- Primeiro email ja vendendo — o Felipe rejeitou essa abordagem em 05/07/2026
- Misturar tour 360 no pitch de chatbot — sao upsells separados
- Usar linguagem de "agencia criativa" ou "solucao incrivel" (viola VOZ.md)
- Enviar sem o Felipe aprovar o texto antes

---

## Learnings desta sessão (05-06/07/2026)

### Modelo local (Ollama) — restricoes de hardware

| Modelo | Tamanho | RAM minima | Funciona no servidor (4GB)? |
|---|---|---|---|
| `llama3.1:8b` | 4.9 GB | ~6 GB | **NÃO** (trava, timeout) |
| `qwen2.5:1.5b` | ~1 GB | ~2 GB | **SIM** |
| `llama3.2:1b` | ~1 GB | ~2 GB | **SIM** |
| `deepseek-coder:1.5b` | ~1 GB | ~2 GB | **SIM** |

**Regra:** servidor Hermes tem 4GB RAM total (~1.7GB disponivel). Modelos >3GB vao travar. Usar modelos 1-2B para inferencia local.

### Cron jobs OpenRouter (free tier)

**Problema:** `max_tokens` default (65536) excede limite da conta free (~37k tokens) → HTTP 402.

**Fix aplicado:** `max_tokens: 8000` nos cronjobs:
- `pipeline-weekly-update` (job_id: 4c442fb260d3)
- `morning-checkin` (job_id: 6e75b75f9b0a)  
- `instagram-weekly-content` (job_id: 0b9262076aed)

**Schedule corrigido:** `pipeline-weekly-update` era `0 8 * * 1` (8h UTC = 5h BRT) → ajustado para `0 11 * * 1` (11h UTC = 8h BRT).

### Email deliverability (Resend + Gmail)

**Problema 1:** Email cai em Promocoes/Spam
- Dominio novo sem reputacao
- Enviar pra proprio email = suspeito pro Gmail

**Problema 2:** Resposta falha (Delivery Status Notification Failure)
- `From: contato@realvisionmaps.com` + `Reply-To: seu@gmail.com`
- Responder tenta mandar pro `contato@...` que nao tem caixa de entrada (MX)

**Solucoes testadas:**
1. **Opcao A (melhor teste):** Voce manda manual do Gmail real → testa Inbox + resposta
2. **Opcao B:** Verificar `realvisionmaps360@gmail.com` no Resend como sender verificado → `From: Felipe <realvisionmaps360@gmail.com>` → resposta cai no seu Gmail
3. **Opcao C:** Configurar inbound no Resend (MX records) — mais complexo

### Estrutura validada de email frio para agencias (B2B2B)

**Email 1 — Rapport (ZERO venda):**
```
Assunto: Procurando agencia que faca chatbot com IA

Oi, [Nome da agencia].

Tenho uma empresa de tecnologia e to procurando agencia de marketing digital que ofereca chatbot com IA pro meu site e WhatsApp.

Voces trabalham com isso? Se nao, conhecem quem faca?

Felipe
```
- Se apresenta como cliente (cliente mistério)
- Pergunta aberta, sem pressão
- CTA: responder as perguntas

**Email 2 — Oferta (2-4 dias depois):**
- Se respondeu: agradece + mostra como resolve a dor
- Se nao: "sem resposta ainda, mas vou ser direto"
- Apresenta chatbot white-label
- Destaques: inteligencia real, chama ramal, conhece setor, base editavel, white-label, zero trabalho tecnico
- **NAO** menciona tour 360
- Urgencia: "padrao 2026 = responder em segundos"
- CTA: "me responde SIM que eu te mostro"

### Skill `pipeline-weekly-update` criada

Local: `~/.hermes/skills/pipeline-weekly-update/SKILL.md`
- Gera relatorio semanal 7 partes do banco `rv-acquisition`
- Segue ACQUISITION-OPERATING-SYSTEM.md (Secao 10 + 15)
- Inclui: follow-ups, respostas, leads quentes, capacity check, learning loop, snapshot no banco
- Entrega formatado pro Telegram

---

## Configuracao do Gmail

`adm@realvisionmaps.com` ja esta configurado como alias em `realvisionmaps360@gmail.com`:
- SMTP: smtp.hostinger.com · Porta 465 · SSL
- Para usar em novos e-mails: abrir compose em tela cheia -> clicar em "De:" -> selecionar alias
- Para definir como padrao: Configuracoes -> Contas e importacao -> "usar como padrao" ao lado do alias

---

## Monitoramento de atividade do banco rv-acquisition (keep-alive)

O Supabase pausa projetos com "atividade insuficiente por mais de 7 dias" — atividade = conexoes de banco, queries, chamadas de API.

### Como verificar status
```bash
### Skill `pipeline-weekly-update` criada

Local: `~/.hermes/skills/pipeline-weekly-update/SKILL.md`
- Gera relatorio semanal 7 partes do banco `rv-acquisition`
- Segue ACQUISITION-OPERATING-SYSTEM.md (Secao 10 + 15)
- Inclui: follow-ups, respostas, leads quentes, capacity check, learning loop, snapshot no banco
- Entrega formatado pro Telegram

---

### Cron jobs OpenRouter (free tier) — fix aplicado

**Problema:** `max_tokens` default (65536) excede limite da conta free (~37k tokens) → HTTP 402.

**Fix aplicado:** `max_tokens: 8000` nos cronjobs:
- `pipeline-weekly-update` (job_id: 4c442fb260d3)
- `morning-checkin` (job_id: 6e75b75f9b0a) 
- `instagram-weekly-content` (job_id: 0b9262076aed)

**Schedule corrigido:** `pipeline-weekly-update` era `0 8 * * 1` (8h UTC = 5h BRT) → ajustado para `0 11 * * 1` (11h UTC = 8h BRT).

### Supabase keep-alive monitoring

**Automatização:** Cron job `pipeline-weekly-update` roda toda 2a feira 8h BRT, acessa banco `rv-acquisition`, recalcula scores, gera relatório — garante atividade semanal automática.

**Verificação manual:** `npx supabase projects list` retorna status `INACTIVE` se >7 dias sem atividade.

### Sinais de alerta
- `last_event_at` em `prospect_events` > 7 dias atras
- `npx supabase projects list` retorna status `INACTIVE` para o projeto
- Email do Supabase: "Your project has not seen sufficient activity for more than 7 days"

---

## Resultados da campanha Paraty (junho 2026)

| Canal | Enviados | Obs |
|---|---|---|
| WhatsApp | 31 | Alguns numeros fixos sem WA |
| E-mail | 17 | Alguns enderecos invalidos/inexistentes |
| Total alcancado | ~48 | De 35 pousadas pesquisadas |

**Licoes operacionais:**
- Numeros com 8 digitos (fixo) raramente tem WhatsApp — priorizar celulares
- E-mails de dominio customizado antigo (.com.br) tem maior taxa de bounce
- Construir lista de 35 + rascunhos no Gmail + mensagens WA prontas levou ~1 sessao
- Fluxo funciona: documento unico com tudo junto (WA + email + checkboxes) e o formato certo

---

## Modelo local (Ollama) — instalação e validação (06/07/2026)

| Modelo | Tamanho | RAM necessária | Funciona no servidor (4GB)? | Status |
|---|---|---|---|---|
| `llama3.1:8b` | 4.9 GB | ~6 GB | **NÃO** (trava, timeout) | Removido |
| `llama3.2:1b` | ~1.3 GB | ~2 GB | **SIM** ✅ | **Ativo (padrão)** |
| `qwen2.5:1.5b` | ~1 GB | ~2 GB | **SIM** | Alternativa |
| `deepseek-coder:1.5b` | ~1 GB | ~2 GB | **SIM** | Alternativa |

**Hardware confirmado:** servidor Hermes tem 4GB RAM total (~1.7GB disponível). Modelos >3GB travam (OOM/timeout). Usar modelos 1-2B para inferência local.

**Instalação Ollama realizada (Hostinger VPS — sem sudo, via Console web):**
```bash
# Download direto do binário (não usar install.sh)
curl -L https://github.com/ollama/ollama/releases/download/v0.31.1/ollama-linux-amd64.tar.zst -o /tmp/ollama.tar.zst
# Extrair (requer zstd: pip install zstandard)
# Binário em /tmp/bin/ollama
# Iniciar servidor: /tmp/bin/ollama serve &
# Baixar modelo: /tmp/bin/ollama pull llama3.2:1b
```

**Configuração Hermes → Ollama** (`~/.hermes/config.yaml`):
```yaml
model:
  default: llama3.2:1b
  provider: ollama
  base_url: http://localhost:11434
```

**⚠️ IMPORTANTE — Reiniciar gateway:** após alterar config.yaml, rodar `hermes gateway restart` no Console da Hostinger (pelo celular) para carregar o modelo local.

---

## Email deliverability — solução validada (Resend)

**Problema:** `contato@realvisionmaps.com` sem caixa de entrada → resposta falha (Delivery Status Notification Failure).

**Solução implementada:** Verificar `realvisionmaps360@gmail.com` como *sender verificado* no Resend:
1. Dashboard Resend → Senders → Add sender → `realvisionmaps360@gmail.com`
2. Clicar link de verificação no Gmail
3. Usar `From: Felipe <realvisionmaps360@gmail.com>` nas chamadas API
4. Resposta cai no Gmail real → teste de deliverability completo

---

## Estrutura validada de email frio B2B2B (chatbot white-label)

**Email 1 — Rapport (ZERO venda):**
```
Assunto: Procurando agência que faça chatbot com IA

Oi, [Nome da agência].

Tenho uma empresa de tecnologia e to procurando agência de marketing digital que ofereça chatbot com IA pro meu site e WhatsApp.

Vocês trabalham com isso? Se não, conhecem quem faça?

Felipe
```
- Cliente mistério (remove pressão de venda)
- Pergunta aberta, CTA: responder perguntas

**Email 2 — Oferta (2-4 dias depois):**
- Se respondeu: agradece + mostra como resolve a dor
- Se não: "sem resposta ainda, mas vou ser direto"
- Apresenta chatbot white-label
- Destaques: inteligência real, chama ramal, conhece setor, base editável, white-label, zero trabalho técnico
- **NÃO** menciona tour 360
- Urgência: "padrão 2026 = responder em segundos"
- CTA: "me responde SIM que eu te mostro"

---

## Referencias

- **Plano de Integracao Voice AI** — `references/VOICE-AI-INTEGRATION-PLAN.md`
  Arquitetura completa para integrar IA de voz (Ultravox/Gemini + SIP) no Acquisition OS como terceiro canal de outreach.

- **Configuração Ollama Local (Hostinger)** — `references/LOCAL-MODEL-SETUP.md`
  Método de instalação sem sudo, via Console web, modelo válido para 4GB RAM.

---

## Como ativar esta skill

`/rv-prospeccao`

ou mencionar "prospeccao", "campanha nova", "nova cidade", "oferta de entrada 360", "chatbot agencia", "B2B2B".

Sempre carregar `realvision` primeiro.

---\n\n## Learnings desta sessão (06/07/2026)\n\n### Modelo local (Ollama) — instalação e validação\n\n| Modelo | Tamanho | RAM necessária | Funciona no servidor (4GB)? | Status |\n|---|---|---|---|---|\n| `llama3.1:8b` | 4.9 GB | ~6 GB | **NÃO** (trava, timeout) | Removido |\n| `llama3.2:1b` | ~1.3 GB | ~2 GB | **SIM** ✅ | **Ativo (padrão)** |\n| `qwen2.5:1.5b` | ~1 GB | ~2 GB | **SIM** | Alternativa |\n| `deepseek-coder:1.5b` | ~1 GB | ~2 GB | **SIM** | Alternativa |\n\n**Hardware confirmado:** servidor Hermes tem 4GB RAM total (~1.7GB disponível). Modelos >3GB travam (OOM/timeout). Usar modelos 1-2B para inferência local.\n\n**Instalação Ollama realizada:**\n```bash\n# Download direto do binário (sem sudo)\ncurl -L https://github.com/ollama/ollama/releases/download/v0.31.1/ollama-linux-amd64.tar.zst -o /tmp/ollama.tar.zst\n# Requer zstd (pip install zstandard)\n# Extrair -> /tmp/bin/ollama\n# Iniciar servidor: /tmp/bin/ollama serve &\n# Baixar modelo: /tmp/bin/ollama pull llama3.2:1b\n```\n\n**Configuração Hermes → Ollama** (`~/.hermes/config.yaml`):\n```yaml\nmodel:\n  default: llama3.2:1b\n  provider: ollama\n  base_url: http://localhost:11434\n```\n\n### Email deliverability — solução validada (Resend)\n\n**Problema:** `contato@realvisionmaps.com` sem caixa de entrada → resposta falha (Delivery Status Notification Failure).\n\n**Solução implementada:** Verificar `realvisionmaps360@gmail.com` como *sender verificado* no Resend:\n1. Dashboard Resend → Senders → Add sender → `realvisionmaps360@gmail.com`\n2. Clicar link de verificação no Gmail\n3. Usar `From: Felipe <realvisionmaps360@gmail.com>` nas chamadas API\n4. Resposta cai no Gmail real → teste de deliverability completo\n\n### Estrutura validada de email frio B2B2B (chatbot white-label)\n\n**Email 1 — Rapport (ZERO venda):**\n```\nAssunto: Procurando agência que faça chatbot com IA\n\nOi, [Nome da agência].\n\nTenho uma empresa de tecnologia e to procurando agência de marketing digital que ofereça chatbot com IA pro meu site e WhatsApp.\n\nVocês trabalham com isso? Se não, conhecem quem faça?\n\nFelipe\n```\n- Cliente mistério (remove pressão de venda)\n- Pergunta aberta, CTA: responder perguntas\n\n**Email 2 — Oferta (2-4 dias depois):**\n- Se respondeu: agradece + mostra como resolve a dor\n- Se não: "sem resposta ainda, mas vou ser direto"\n- Apresenta chatbot white-label\n- Destaques: inteligência real, chama ramal, conhece setor, base editável, white-label, zero trabalho técnico\n- **NÃO** menciona tour 360\n- Urgência: "padrão 2026 = responder em segundos"\n- CTA: "me responde SIM que eu te mostro"\n\n### Skill `pipeline-weekly-update` criada\n\nLocal: `~/.hermes/skills/pipeline-weekly-update/SKILL.md`\n- Gera relatório semanal 7 partes do banco `rv-acquisition`\n- Segue ACQUISITION-OPERATING-SYSTEM.md (Seção 10 + 15)\n- Inclui: follow-ups, respostas, leads quentes, capacity check, learning loop, snapshot no banco\n- Entrega formatado pro Telegram\n\n### Cron jobs OpenRouter (free tier) — fix aplicado\n\n**Problema:** `max_tokens` default (65536) excede limite da conta free (~37k tokens) → HTTP 402.\n\n**Fix:** `max_tokens: 8000` nos cronjobs:\n- `pipeline-weekly-update` (job_id: 4c442fb260d3)\n- `morning-checkin` (job_id: 6e75b75f9b0a)  \n- `instagram-weekly-content` (job_id: 0b9262076aed)\n\n**Schedule corrigido:** `pipeline-weekly-update` era `0 8 * * 1` (8h UTC = 5h BRT) → ajustado para `0 11 * * 1` (11h UTC = 8h BRT).\n\n### Supabase keep-alive monitoring\n\n**Automatização:** Cron job `pipeline-weekly-update` roda toda 2ª feira 8h BRT, acessa banco `rv-acquisition`, recalcula scores, gera relatório — garante atividade semanal automática.\n\n**Verificação manual:** `npx supabase projects list` retorna status `INACTIVE` se >7 dias sem atividade.\n\n---\n\n## Referencias\n\n- **Plano de Integracao Voice AI** — `references/VOICE-AI-INTEGRATION-PLAN.md`\n  Arquitetura completa para integrar IA de voz (Ultravox/Gemini + SIP) no Acquisition OS como terceiro canal de outreach.\