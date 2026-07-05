---
name: client-briefing-generator
description: Gera briefing completo de prospecção (10 lentes, score, lead_offer, rascunhos WA/Email) a partir de nome/cidade/segmento
category: prospecao
version: 1.0
author: Felipe Garcia
created: 2026-07-05
---

# Client Briefing Generator — Gerador de Briefing de Prospecção

Skill para transformar um lead cru (nome + cidade + segmento) em um dossiê completo pronto para abordagem: 10 lentes, score 0-100, lead_offer, rascunhos WA/Email personalizados.

## Quando usar
- Sempre que surgir lead novo para abordar (nova cidade, indicação, visita de campo)
- Antes de criar rascunhos de outreach (Seção 5 - ACQUISITION-OPERATING-SYSTEM.md)
- Para validar se lead vale o esforço (score < 40 = não abordar)

## Inputs
- `nome_negocio` (obrigatório — como aparece no Google Maps)
- `cidade` (obrigatório)
- `segmento` (obrigatório: pousada / restaurante / evento / condominio / hub / comercio / outro)
- `link_gmb_ou_site` (opcional — acelera pesquisa)
- `campaign_id` (opcional — default: última campanha ativa)

## Passo a passo

### 1. Dedup + Criar/Atualizar prospect no banco
```sql
-- 1. Buscar se já existe (dedup por nome + cidade)
SELECT * FROM prospects 
WHERE business_name ILIKE '<nome_negocio>' AND city ILIKE '<cidade>';

-- 2. Se não existe → INSERT
INSERT INTO prospects (business_name, city, segment, website_domain, instagram, phone_e164, email, discovery_notes, current_status)
VALUES ('<nome>', '<cidade>', '<segmento>', '<site>', '<insta>', '<fone>', '<email>', 'Criado via client-briefing-generator', 'novo')
RETURNING id;

-- 3. Vincular à campanha
INSERT INTO campaign_prospects (campaign_id, prospect_id, priority, opportunity_score)
VALUES ('<campaign_id>', '<prospect_id>', 'media', NULL);
```

### 2. Pesquisa das 10 lentes (Seção 2 - ACQUISITION-OPERATING-SYSTEM.md)
Para cada lente, buscar evidência real (WebSearch, site, GMB, Instagram, avaliações):

| # | Lente | O que buscar | Onde anotar |
|---|-------|--------------|-------------|
| 1 | **Website** | Existe? Profissional? Mobile? Rápido? Atualizado? Wix/WordPress/custom? | `score_reasons.lens_1` |
| 2 | **GMB** | Reivindicada? Fotos? Horário? Posts? Respostas a reviews? Nota? | `score_reasons.lens_2` |
| 3 | **Branding** | Logo, identidade, consistência visual entre canais | `score_reasons.lens_3` |
| 4 | **Reviews** | Quantidade, nota, frequência, respondem? | `score_reasons.lens_4` |
| 5 | **Customer journey** | Como descobre → decide → reserva? Onde quebra? | `score_reasons.lens_5` |
| 6 | **Trust** | Passa segurança online? Prova social? Tour 360°? | `score_reasons.lens_6` |
| 7 | **Digital maturity** | 0=nada a 5=ecossistema completo | `score_reasons.lens_7` |
| 8 | **Automation opp** | Atende WA na mão? Reservas manuais? Processos repetitivos? | `score_reasons.lens_8` |
| 9 | **AI opportunities** | Chatbot 24/7 resolveria dúvidas/reservas? | `score_reasons.lens_9` |
| 10 | **Growth opp** | Multi-unidade? Expansão? Sazonalidade? | `score_reasons.lens_10` |

**Regra:** Se faltar info decisiva → `pesquisa_pendente` + `discovery_notes` — NÃO chutar.

### 3. Calcular 4 sub-scores + opportunity_score (Seção 4)
| Sub-score | Pergunta | Evidência das lentes |
|-----------|----------|---------------------|
| `score_need` (0-25) | Quão urgente a necessidade? | Lentes 1, 2, 6, 7 (site fraco, GMB parado, sem trust, maturidade baixa) |
| `score_authority` (0-25) | Porte/poder de decisão? | Lentes 3, 4, 10 (branding pro, reviews boas, multi-unidade) |
| `score_remote` (0-25) | Entrega 100% remoto? | Segmento (turismo/hospitalidade = sim), sem dependência de foto/drone |
| `score_contactability` (0-25) | Fácil falar com decisor? | WhatsApp celular (9 dígitos), email válido, decisor identificado |

**Total = soma (0-100)**

### 4. Identificar oportunidades (Seção 3 - Regra de Ouro)
**Primary Opportunity** (lead_offer — porta de entrada AGORA):
- IF capacidade alta (premium/multi-unidade) + lacuna ampla → `digital_partner` (Sócio Digital) — porta: diagnóstico grátis 30min
- IF capacidade média + **sem site** → `website` / `landing_page` — porta: diagnóstico grátis
- IF site ok + **GMB fraco** → `google_business` / `google_management` — porta: diagnóstico grátis
- IF dor central = **atendimento manual WA** → `ai_chatbot` + `whatsapp_automation` — porta: diagnóstico grátis
- IF negócio frio / cidade nova não validada → `360_tour` (R$25) — porta: tripwire

**Secondary Opportunities** (gestão mensal — SEMPRE):
- `website` → `website_management`
- `google_business` → `google_management`
- `ai_chatbot` → `chatbot_management`
- `360_tour` → (futuro: site/GMB/automação)

**Future Opportunities** (daqui meses):
- Tour 360° quando site no ar
- Expansão para outras unidades
- Fotografia/drone para enriquecer site

Salvar em `prospect_services` (uma linha por oportunidade, `opportunity_status = 'identificada'`)

### 5. Gerar rascunhos personalizados (Seção 5 + rv-prospeccao)

**WhatsApp (template rv-prospeccao Etapa 4):**
```
Oi! Aqui é o Felipe, da Real Vision. Somos Guias Locais do Google e contribuidores do Street View — andamos pelo Brasil atualizando imagens de cidades e regiões no Google Maps.

Nossa equipe esteve em [CIDADE] esses dias atualizando as imagens aéreas da região. Aproveitamos pra oferecer também pro comércio local: incluir uma dessas fotos 360° diretamente no perfil do Google do negócio.

Quase nenhum[a] [SEGMENTO] de [CIDADE] tem foto 360° no perfil — a maioria fica com a galeria vazia. Com a imagem, toda vez que alguém abre o perfil d[a/o] [NOME DO NEGÓCIO] no Google vai se deparar com uma panorâmica aérea de [CIDADE] a 500 metros de altura, navegável tipo Street View. Bonito e ainda ajuda o visitante a se localizar antes de sair de casa.

Conheça nosso trabalho: realvisionmaps.com/sobre

Se quiserem a foto no perfil de vocês, é R$25. Só precisamos da sua autorização e do Pix — CPF 389.729.498-25 (Felipe Garcia, Nubank). Eu publico automaticamente e fica online em alguns dias e fica lá pra sempre.

Se não tiver interesse no momento, não precisa responder. Abraço!
```
> **Adaptar:** Para carro-chefe (diagnóstico grátis), trocar oferta por "diagnóstico gratuito de 30min — eu pesquiso seu negócio no Google e te mostro o que o cliente vê antes de decidir."

**Email (template rv-prospeccao Etapa 4):**
- Assunto: `Foto 360° aérea no perfil do Google — [Nome do Negócio]` (ou `Diagnóstico grátis — [Nome] no Google`)
- HTML body (sem assinatura — Felipe coloca a dele)
- Remetente: `adm@realvisionmaps.com` (alias configurado)

### 6. Checklist de info faltante (Seção 5)
- [ ] Canal válido? (WhatsApp celular 9 dígitos OU email válido)
- [ ] Decisor identificado? (dono/gerente — `contact_role`)
- [ ] Diagnóstico completo? (10 lentes preenchidas)
- [ ] Lead_offer definido?

Se faltar → NÃO rascunhar oferta cheia. Rascunhar mensagem de descoberta leve ("com quem falo sobre o site/Google de vocês?").

### 7. Registrar eventos + atualizar status
```sql
-- Evento 'encontrado' + 'qualificado'
INSERT INTO prospect_events (prospect_id, event_type, detail, actor_type)
VALUES ('<id>', 'encontrado', '{"source": "client-briefing-generator"}', 'ai_agent'),
       ('<id>', 'qualificado', '{"lead_offer": "<code>", "score": <total>}', 'ai_agent');

-- Atualizar campaign_prospects
UPDATE campaign_prospects SET
  opportunity_score = <total>,
  score_need = <v>, score_authority = <v>, score_remote = <v>, score_contactability = <v>,
  priority = CASE WHEN <total> >= 80 THEN 'alta' WHEN <total> >= 60 THEN 'media' WHEN <total> >= 40 THEN 'baixa' ELSE 'arquivar' END,
  lead_offer = '<service_code>',
  score_reasons = '<json completo das 10 lentes>',
  score_updated_at = NOW()
WHERE prospect_id = '<id>';
```

## Tools necessárias
- `web_search` (site, GMB, Instagram, avaliações, concorrentes)
- `supabase_mcp` (VisionFlow: `ghwjetvazmdlaqidgxqi` — tabelas `prospects`, `campaign_prospects`, `prospect_events`, `prospect_services`, `campaigns`)
- `read_file`: `operacao/prospeccao/ACQUISITION-OPERATING-SYSTEM.md` (Seções 2, 3, 4, 5), `skills/rv-prospeccao/SKILL.md` (templates WA/Email)

## Safety boundaries
- **Pesquisa + diagnóstico + rascunho + salva no banco** — NÃO envia mensagem externa
- Você **aprova rascunho** → **você envia** (WhatsApp copia/cola, Email abre rascunho no Gmail)
- Não inventar dados — se não viu, marca `pesquisa_pendente`
- Dedup obrigatório antes de criar prospect
- Não cotar preço no rascunho (portão humano)

## Verificação antes de entregar
- [ ] 10 lentes preenchidas com evidência real (ou `pesquisa_pendente` anotado)?
- [ ] 4 sub-scores calculados + total 0-100?
- [ ] `lead_offer` segue regras IF→THEN da Seção 3?
- [ ] Rascunho WA cita dor real do negócio (não template cru)?
- [ ] Rascunho Email sem assinatura, HTML body, remetente adm@realvisionmaps.com?
- [ ] Dedup feito (prospect não duplicado)?
- [ ] `prospect_services` preenchido: Primary + Secondary (gestão!) + Future?
- [ ] Eventos registrados (`encontrado`, `qualificado`)?
- [ ] Checklist de faltante honesto (canal, decisor, diagnóstico)?

## Erros comuns a evitar
- Inventar fragilidades não vistas para inflar score
- Oferecer carro-chefe (`digital_partner`) para quem só comporta tripwire (`360_tour`)
- Rascunho genérico sem personalização (não citou nome, cidade, lacuna real)
- Esquecer gestão mensal como Secondary Opportunity (regra de ouro)
- Não fazer dedup → prospect duplicado
- Cotar preço no rascunho (portão humano)
- Tratar `pesquisa_pendente` como score 0

## Formato de saída
**Dossiê Markdown** (salvo em `operacao/clientes/arquivos/<Nome> - <Empresa>/BRIEFING-PROSPECCAO.md`) contendo:
1. Dados básicos (nome, cidade, segmento, canais)
2. 10 lentes + evidências
3. Score breakdown (4 sub-scores + total + prioridade)
4. Oportunidades: Primary / Secondary / Future
5. Lead_offer recomendado + porta
6. Rascunho WhatsApp (pronto para copiar)
7. Rascunho Email (HTML pronto para Gmail)
8. Checklist de info faltante
9. Próximo passo recomendado

---

## Como ativar
```
/client-briefing-generator "Nome do Negócio" "Cidade" "Segmento" [link_gmb]
```
ou mencionar "briefing prospecção", "novo lead", "diagnóstico lead".

Sempre carregar `realvision` + `rv-prospeccao` primeiro.