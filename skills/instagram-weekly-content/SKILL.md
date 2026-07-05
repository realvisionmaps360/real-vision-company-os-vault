---
name: instagram-weekly-content
description: Gera copy + briefings de criativo para 1 post no Instagram da Real Vision
category: marketing
version: 1.0
author: Felipe Garcia
created: 2026-07-05
---

# Instagram Weekly Content — Post Semanal do Instagram

Skill para gerar copy persuasiva (estilo Hormozi via rv-copy) + 3 briefings de criativo prontos para Higgsfield Marketing Studio.

## Quando usar
- Toda 2ª feira 10h (scheduled job) — ou manual quando Felipe definir tema
- Quando precisar de post para alimentar presença digital / prova social / prospecção passiva

## Inputs
- `tema_da_semana` (ex: "SEO para pousadas", "Tour 360° vende mais", "Sócio Digital case", "Google Meu Negócio para restaurantes")
- Se vazio: Hermes sugere baseado em:
  - Pipeline quente (segmento/cidade dos leads 80-100)
  - Blog posts em andamento (rv-blogpost pipeline)
  - Datas sazonais / eventos do setor

## Passo a passo

### 1. Pesquisar dor concreta do público (Fase 0 - rv-blogpost + rv-prospeccao)
- Rodar `rv-intencao-busca` com termo-base do tema → matriz de intenção (perguntas reais, volume, concorrência)
- Consultar `rv-prospeccao` playbook: quais dores reais apareceram nas 10 lentes dos leads quentes?
- Exemplo: "Pousada em Itacaré não aparece no Google → hóspede reserva concorrente com tour 360°"

### 2. Aplicar rv-copy loop (11 checks - skills/rv-copy/SKILL.md)
Estrutura obrigatória:
```
HOOK (maior alavanca) → primeira linha prende sem introdução genérica
DOR CONCRETA → momento específico, termos do leitor ("quando alguém pesquisa pousada no celular...")
ESPECIFICIDADE → "40 fotos do concorrente vs. 0 suas" (não "melhoramos presença")
VALUE EQUATION → Rápido (tour no ar em X dias) + Fácil (você não mexe em nada) + Sem risco (aprova antes)
CTA WHATSAPP CONTEXTUAL → link wa.me com mensagem pré-preenchida sobre o tema
```

### 3. Cruzar com VOZ.md (regras inegociáveis)
- [ ] **ZERO travessão (—) entre frases** → usar ponto final ou vírgula natural
- [ ] **ZERO hipérbole** ("incrível", "sensacional", "fantástico", "o melhor", "100%")
- [ ] **Tom consultor** — convence pela precisão, não empolgação
- [ ] **Capitalização correta** → toda frase e início do texto em MAIÚSCULA
- [ ] **Marcas exatas** → "Universo Paralello" (2 L), "Real Vision", "Sócio Digital", "Tríade do Sucesso"
- [ ] **Estrutura** → ponto direto primeiro, contexto só o necessário, CTA clara
- [ ] **Nada inventado** → tudo rastreável ao Company OS ou sessão

### 4. Gerar 3 briefings para Higgsfield Marketing Studio
Salvar em `operacao/projetos/socio-digital/criativos-higgsfield/LOG.md`

| Formato | Aspect Ratio | Uso | Briefing deve incluir |
|---------|--------------|-----|----------------------|
| **Imagem feed** | 1:1 | Instagram Feed, Display | Conceito visual, headline, brand kit RV (âmbar #F5A623, fundo #0a0d14, Bebas Neue/Inter) |
| **Vídeo Reels** | 9:16 | Reels, Shorts, Stories | Roteiro 8-15s, hook visual nos 3 primeiros segundos, áudio gerado opcional |
| **Imagem portrait** | 4:5 | Feed (mais área), Performance Max | Variação do feed com mais espaço vertical para legenda |

**Brand Kit Real Vision (obrigatório nos briefings):**
```json
{
  "brand_name": "Real Vision",
  "tagline": "Sócio Digital — o parceiro de IA que executa pela sua empresa",
  "industry": "Tecnologia / Marketing Digital",
  "tone_of_voice": ["direto", "técnico", "sem rodeios", "premium"],
  "brand_values": ["execução", "transparência", "autonomia do cliente"],
  "colors": ["#F5A623", "#C58B2A", "#0a0d14", "#161c2b", "#ffffff", "#A8A8B0"],
  "fonts": ["Bebas Neue", "Inter", "JetBrains Mono"],
  "website_url": "https://realvisionmaps.com",
  "social_links": { "youtube": "https://www.youtube.com/@RealVisionMaps" }
}
```

### 5. Salvar no LOG
```markdown
## YYYY-MM-DD — Tema: [tema_da_semana]
- Copy: [link/arquivo]
- Briefing 1:1: [JSON Higgsfield]
- Briefing 9:16: [JSON Higgsfield]
- Briefing 4:5: [JSON Higgsfield]
- Status: [aguardando_aprovacao / aprovado / postado]
- Postado em: [data] / Link: [url]
```

## Tools necessárias
- `web_search` (pesquisa dor/concorrente)
- `read_file`: `skills/rv-copy/SKILL.md`, `skills/rv-blogpost/SKILL.md`, `skills/rv-prospeccao/SKILL.md`, `contexto/VOZ.md`, `contexto/DESIGN.md`, `contexto/EMPRESA.md`
- `rv-intencao-busca` (script `pesquisar_intencao.py` local)
- `higgsfield_mcp` (Marketing Studio Image/Video) — para GERAR criativos após aprovação do briefing

## Safety boundaries
- **APENAS rascunha copy + briefings** — NÃO posta, NÃO publica, NÃO gasta budget de ads
- Você **aprova copy** → você **escolhe/ aprova criativo** → **você posta**
- Antes de gerar criativo no Higgsfield: mostrar briefing JSON → seu OK → gerar
- Não usar budget de Higgsfield sem aprovação

## Verificação antes de entregar (loop de auto-crítica rv-copy)
- [ ] **Dor:** nomeia dor concreta nos termos do leitor, momento específico?
- [ ] **Especificidade:** trocou vago por específico? ("mais clientes" → "estrangeiros que pesquisam no Google")
- [ ] **Value Equation:** oferta sinaliza rápido, fácil, sem risco?
- [ ] **Hook:** primeira linha prende sem introdução genérica?
- [ ] **Concisão:** dá para cortar mais palavra? Cortou advérbios? Palavra mais simples?
- [ ] **Congruência:** corpo entrega o que hook/assunto prometeu?
- [ ] **Operacionalizável:** leitor sabe próximo passo exato? (CTA WhatsApp contextual)
- [ ] **ZERO travessão entre frases** (caçou "—")?
- [ ] **Capitalização:** toda frase e início em maiúscula?
- [ ] **Marcas exatas** (Universo Paralello, Real Vision, Sócio Digital, Tríade do Sucesso)?
- [ ] **VOZ.md:** sem hipérbole, tom consultor, nada de "agência criativa" ou "fotógrafo de tour"?

## Erros comuns a evitar
- Começar com "Hoje vamos falar sobre", "Espero que esteja tudo bem", "Neste post..."
- Usar "incrível", "sensacional", "fantástico", "transformar", "revolucionário"
- Copy genérica sem dor concreta ("melhoramos sua presença digital")
- CTA genérica ("entre em contato", "saiba mais") — sem link WhatsApp contextual
- Briefing Higgsfield sem brand kit RV (cores, fontes, tom)
- Aspect ratios errados (feed = 1:1, Reels = 9:16, Portrait = 4:5)
- Não salvar no LOG.md

## Formato de saída
**Copy final (PT-BR, pronta para postar)** + **3 Briefings Higgsfield (JSON pronto para Marketing Studio)** + **Hashtags sugeridas (5-8)** + **CTA WhatsApp link** + **Arquivo de log atualizado**

---

## Como ativar
```
/instagram-weekly-content [tema_da_semana]
```
ou mencionar "post instagram", "conteúdo instagram", "instagram essa semana".

Sempre carregar `realvision` + `rv-copy` + `rv-blogpost` primeiro.