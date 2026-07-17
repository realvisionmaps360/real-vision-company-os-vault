---
name: instagram-weekly-content
description: "Gera o conteudo semanal do Instagram da Real Vision -- copy + briefings Higgsfield (feed 1:1, Reels 9:16, portrait 4:5) alinhado ao pipeline de aquisicao, blog posts e lancamentos. Roda toda 2a feira via cron job. Carregar junto com: realvision, rv-copy, rv-prospeccao, rv-blogpost."
---

# Instagram Weekly Content -- Real Vision 360

## Objetivo
Produzir toda 2a feira o pacote semanal de Instagram: **copy final validada contra VOZ.md** + **3 briefings JSON para Higgsfield** (feed carousel 1:1, Reels 9:16, portrait carousel 4:5) + hashtags estrategicas + CTAs WhatsApp pre-preenchidos + LOG.md para rastreamento.

**Entrega:** Texto para Telegram aguardando aprovacao do Felipe -> apos OK, gerar no Higgsfield -> agendar posts.

## Quando usar
- Cron job `instagram-weekly-content` (toda 2a feira, 08:00 BRT / 11:00 UTC)
- Quando Felipe disser "conteudo semanal Instagram", "post pro Instagram essa semana", "Higgsfield briefing"
- Sempre que houver lancamento, campanha de prospeccao ativa, ou blog post novo no pipeline

## Skills necessarias (carregar JUNTO no inicio)
- `realvision` -- contexto da empresa, VOZ, DESIGN, EMPRESA
- `rv-copy` -- principios Hormozi, loop de auto-critica, regras de escrita
- `rv-prospeccao` -- 10 lentes de analise de dor, playbooks ativos
- `rv-blogpost` -- pipeline de posts em andamento (Fase 0: intencao de busca)

---

## Fluxo de Execucao (Passo a Passo)

### PASSO 0 -- Carregar Contexto (sempre primeiro)
1. Ler `contexto/VOZ.md` -- tom, palavras certas/proibidas, estrutura
2. Ler `contexto/DESIGN.md` -- brand kit (cores, fontes, logo, style)
3. Ler `contexto/EMPRESA.md` -- portfolio, oferta principal (Socio Digital), pilares
4. Ler `operacao/prospeccao/ACQUISITION-OPERATING-SYSTEM.md` -- hot leads (score 80-100), ICP Tier A
5. Ler `operacao/projetos/_RV-Internos/socio-digital/04-MARKETING-CRIATIVOS.md` -- blog posts pipeline, conceitos de criativo Higgsfield
6. Verificar se ha data sazonal/evento da semana (ex: Dia do Turismo, alta temporada BA)

### PASSO 1 -- Definir Tema da Semana
**Prioridade (ordem decrescente):**
1. **Hot leads no pipeline** -- segmento/cidade dos leads score 80-100 (ex: pousadas Paraty, restaurantes Itacare)
2. **Blog posts em andamento** -- tema do post 1/2/3 do pipeline Socio Digital
3. **Lancamento ativo** -- curso Socio Digital, servico, campanha prospeccao
4. **Sazonalidade** -- alta temporada (dez-mar BA), eventos (Universo Paralello), datas comemorativas

**Regra:** Tema deve ter **dor concreta validada** nas 10 lentes, nao "assunto generico".

### PASSO 2 -- Pesquisar Dor Concreta (10 Lentes + rv-intencao-busca)
Para o tema escolhido, passar pelas **10 lentes do ACQUISITION-OS (Secao 2)**:

| Lente | O que extrair para o copy |
|-------|---------------------------|
| 1. Website | "site fraco/lento/nao atualiza/precisa pagar agencia pra mudar preco" |
| 2. GMB | "ficha parada, fotos antigas, reviews sem resposta, horario errado" |
| 3. Branding | "logo Canva, cores diferentes Instagram vs site vs fisico" |
| 4. Reviews | "X reviews, Y sem resposta, ultima resposta ha Z meses" |
| 5. Customer Journey | "acha no Google -> site sem foto -> WhatsApp -> demora -> concorrente" |
| 6. Trust | "concorrente tem tour 360, eu tenho 3 fotos escuras" |
| 7. Digital Maturity | "nivel 1/5, WhatsApp pessoal, planilha Excel, posta 'quando da'" |
| 8. Automation | "responde tudo na mao: cotacao, reserva, duvida, review, toalha" |
| 9. AI Opportunity | "queria chatbot, agencia cobrou R$15k, precisa programador" |
| 10. Growth | "cheio na alta, vazio na baixa, nao captura lead, nao reativa" |

**Output:** 1 paragrafo "DOR MAIS AGUDA" em primeira pessoa do dono do negocio (pain is the pitch).

**Opcional:** Rodar `rv-intencao-busca` com termo-chave do tema (ex: "ia para pousada", "automatizar restaurante") para enriquecer vocabulario da dor.

### PASSO 3 -- Escrever Copy (rv-copy Loop)
Para cada formato (feed, Reels, portrait), aplicar o **loop de auto-critica Hormozi** ate passar nos 11 checks:

**Estrutura obrigatoria por peca:**
1. **Hook** -- primeira linha prende sem introducao generica (maior esforco aqui)
2. **Dor concreta** -- momento especifico, termos do leitor, numeros reais
3. **Especificidade** -- "mais clientes" -> "estrangeiros que pesquisam no Google Maps"
4. **Value Equation** -- Rapido (4h), Facil (zero codigo, a gente faz), Sem risco (garantia 7 dias 100%)
5. **CTA WhatsApp** -- link pre-preenchido contextual a peca

**Checks finais (VOZ.md + rv-copy Regras):**
- [ ] Zero travessao/em-dash entre frases (usar ponto final ou virgula natural)
- [ ] Capitalizacao correta (toda frase e inicio do texto em maiuscula)
- [ ] Nomes de marca exatos: "Socio Digital", "Real Vision", "Claude Code", "Google Meu Negocio", "Universo Paralello" (2 L), "Pano2VR"
- [ ] Tom consultor, nao vendedor
- [ ] Zero hipérbole: nada de "incrivel", "sensacional", "fantastico", "transformador"
- [ ] Zero "agencia criativa" / "fotografo de tour"
- [ ] Zero superlativo sem prova ("o melhor", "100% satisfacao")
- [ ] Estrutura: ponto direto -> contexto necessario -> CTA clara
- [ ] Dados rastreaveis ao Company OS ou sessao (nada inventado)
- [ ] Operacionalizavel: leitor sabe exatamente o proximo passo

### PASSO 4 -- Gerar 3 Briefings Higgsfield (JSON)
Usar **brand kit do DESIGN.md**:

```json
{
  "bg_color": "#0a0d14",
  "accent_color": "#F5A623",
  "accent_muted": "#C58B2A",
  "surface_color": "#161c2b",
  "text_primary": "#ffffff",
  "text_muted": "#A8A8B0",
  "text_dim": "#7A7A85",
  "font_heading": "Bebas Neue",
  "font_body": "Inter",
  "font_mono": "JetBrains Mono",
  "logo_path": "src/assets/rv-logo-white.png"
}
```

**3 Briefings obrigatorios:**

| Formato | Aspect Ratio | Uso | Slides/Duracao |
|---------|-------------|-----|----------------|
| **Feed Carousel** | 1:1 (1080x1080) | Educativo, carousel 5 slides | 5 slides PNG + MP4 |
| **Reels** | 9:16 (1080x1920) | Storytelling visual, video 30-45s | 1 MP4 H.264 |
| **Portrait Carousel** | 4:5 (1080x1350) | Objecoes "Mitos vs Realidade", 5 slides | 5 slides PNG + MP4 |

Cada briefing deve conter: `slide_specs`/`scenes` com `headline`, `body`, `overlay_text`, `visual`, `accent_element`, `text_style`, `audio_cue` (Reels), `export_specs`.

### PASSO 5 -- Hashtags Estrategicas (15 total)
- **5 Primarias:** #SocioDigital #RealVision360 #IAparaEmpresas #AutomacaoEmpresarial + 1 nicho
- **5 Secundarias:** Segmento + dor (ex: #PousadasBrasil #GestaoHoteleira #GoogleMeuNegocio #TourVirtual360 #MarketingDigitalParaPousadas)
- **3 Terciarias:** Descoberta/algoritmo (#EmpreendedorismoDigital #ProdutividadeComIA #FerramentasIA)
- **2 Geo:** Cidade/regiao ativa (ex: #Itacare #Bahia)

### PASSO 6 -- CTAs WhatsApp Pre-preenchidos (1 por peca)
Formato: `https://wa.me/5511912931924?text=[mensagem_URL_encoded]`

| Peca | Mensagem |
|------|----------|
| Feed | "Quero agendar diagnostico gratuito do Socio Digital" |
| Reels | "Vi o Reels do Socio Digital e quero saber como funciona na minha pousada" |
| Portrait | "Quero ver os numeros na minha realidade com o Socio Digital" |
| Stories | "Oi Felipe, vi nos Stories e quero o diagnostico gratis" |

### PASSO 7 -- Salvar LOG.md
Arquivo: `operacao/projetos/socio-digital/criativos-higgsfield/LOG.md`

Conteudo:
- Semana / Tema
- Briefings gerados (checklist)
- Brand kit aplicado
- Status de aprovacao (aguardando Felipe / aprovado / gerado no Higgsfield / agendado)
- Proximos passos
- Sugestao tema semana seguinte

### PASSO 8 -- Entregar para Telegram (aguardar aprovacao)
Formato da mensagem:
```
INSTAGRAM SEMANAL -- [DD/MM a DD/MM]
Tema: [tema escolhido + justificativa baseada em hot leads/blog pipeline]

Copy final (3 pecas) -- validada VOZ.md (11 checks)
3 Briefings Higgsfield JSON (feed 1:1, Reels 9:16, portrait 4:5)
Hashtags (15) + CTAs WhatsApp (4 links)
LOG.md template

Aguardando seu "pode gerar" para rodar no Higgsfield.
```

---

## Regras de Ouro

1. **NUNCA gerar no Higgsfield sem aprovacao explicita do Felipe.** O briefing e o entregavel; a geracao vem depois.
2. **Copy passa pelo loop rv-copy COMPLETO.** Se reprovar em qualquer check, reescrever e rodar de novo.
3. **Dor vem das 10 lentes + dados reais.** Nada de "dores genericas de marketing".
4. **Brand kit e LEI.** Cores, fontes, style do DESIGN.md -- sem improvisacao.
5. **Tema justificado.** Sempre explicar POR QUE esse tema (hot lead X, blog post Y, lancamento Z).
6. **Zero invenção.** Numeros, precos, portfolio, clientes -- so do Company OS.

---

## Referencias

- `references/brand-kit.md` -- Brand kit extraido do DESIGN.md para colar nos briefings
- `references/higgsfield-briefing-template.json` -- Template base dos 3 briefings
- `references/hashtag-bank.md` -- Banco de hashtags por segmento/tema
- `references/cta-templates.md` -- Templates de CTA WhatsApp por peca/campanha

---

## Erros Comuns (Pitfalls)

| Erro | Como evitar |
|------|-------------|
| Gerar briefing sem validar copy contra VOZ.md | Rodar loop rv-copy ANTES de montar briefing |
| Usar cores/fontes erradas no briefing | Sempre copiar brand kit de `references/brand-kit.md` |
| Tema generico ("dicas de IA") sem dor concreta | Obrigar PASSO 2: 10 lentes + pain is the pitch |
| Esquecer CTA WhatsApp pre-preenchido | Checklist PASSO 6 obrigatorio |
| Gerar no Higgsfield antes do "pode gerar" | Regra de ouro #1 -- aguardar aprovacao explicita |
| Hashtags aleatorias | Usar banco `references/hashtag-bank.md` + regra 5+5+3+2 |
| Nao salvar LOG.md | PASSO 7 e obrigatorio, nao opcional |

---

## Como testar se fez certo

Apos entregar no Telegram, o Felipe deve conseguir:
1. Ler a copy e nao achar nada que viole VOZ.md
2. Ver os 3 briefings JSON e colar direto no Higgsfield MCP
3. Ver os links WhatsApp e clicar -- abrem com mensagem certa
4. Ver o LOG.md e saber exatamente o status de cada peca
5. Entender por que esse tema (hot lead / blog post / lancamento)

Se qualquer um falhar -> revisar o passo correspondente.