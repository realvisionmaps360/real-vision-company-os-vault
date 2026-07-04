# Briefing — Página `/socio-digital`

> Documento auto-contido pro **Claude Design** renderizar o visual da página.
> Ao enviar pro Claude Design, anexar também: `contexto/DESIGN.md` + `contexto/VOZ.md` + 2–3 links de inspiração visual.

## Metadados

- **URL:** `/socio-digital` (decisão pendente — `01-PLANO-MESTRE.md`)
- **Título da aba (`<title>`):** Sócio Digital | Real Vision — IA que executa pela sua empresa
- **Meta description:** Tenha um Sócio Digital que conhece sua empresa de cor e executa tarefas no seu computador — sem salário, sem férias, sem demissão. Implementação remota em 4 horas.
- **Idioma:** PT-BR
- **Audiência primária:** donos de PMEs (pousada, restaurante, e-commerce, festival, agência)
- **Audiência secundária:** funcionários que recebem o link do dono

## Princípios visuais

Seguir `contexto/DESIGN.md`. Reforçar:

- Paleta Real Vision conforme `DESIGN.md` (HSL com identidade clara — nada de azul Tailwind padrão)
- Fonte primária: **Inter** ou **Outfit**
- Glassmorphism em cards (`backdrop-blur` + bordas semitransparentes)
- Animações suaves (`transition-all duration-300`) em hover
- Mobile-first com `text-wrap: balance` em títulos
- Gradients sofisticados em CTAs e títulos hero
- Dark/light coeso (preferência: dark com acentos)
- Microinterações em CTAs (escala leve no hover, glow)

## Estrutura da página (9 seções)

### 1. Hero

**Layout:** split — texto à esquerda (60% width), visual à direita (40%)
**Visual à direita:** mockup de um laptop (3D ou flat) com:
- Tela 1: estrutura de pastas aberta (`empresa/`, `contexto/`, `DIARIO.md` etc)
- Tela 2 (overlap): chat com IA (`> Responda os 3 reviews novos do GMN com tom acolhedor` → resposta gerada)

**Copy:**
```
Eyebrow: NOVO SERVIÇO REAL VISION

Headline (h1):
Tenha um Sócio Digital
que executa pela sua empresa.

Subheadline:
Instalamos uma IA no seu computador que conhece sua empresa de cor.
Ela responde clientes, organiza tarefas, escreve textos, gera relatórios.
Sem salário, sem férias, sem demissão.

CTA primário (gradient): Quero meu Sócio Digital →
CTA secundário (ghost): Como funciona ↓
```

### 2. O problema (dor)

**Layout:** 3 cards em grid horizontal (1 coluna em mobile), cada um com ícone grande no topo
**Background:** sutil gradient ou textura

**Copy:**
```
Headline (h2):
Você tá fazendo trabalho que uma IA podia fazer.

Card 1 — [ícone: relógio]
Título: Tempo desperdiçado
Descrição: Você passa horas respondendo as mesmas perguntas, atualizando planilhas, escrevendo posts. Trabalho que não cresce o seu negócio — só te impede de crescer.

Card 2 — [ícone: cifrão]
Título: Custo de funcionário
Descrição: Contratar custa caro: salário, encargos, férias, treinamento, atestado, rotatividade. E ainda precisa de gerenciamento.

Card 3 — [ícone: cérebro com engrenagem]
Título: Decisão lenta
Descrição: Você precisa de dados pra decidir, mas eles tão espalhados em e-mail, WhatsApp, papel, planilha. Quando organiza, já passou a hora.
```

### 3. A solução — Como funciona

**Layout:** timeline horizontal com 4 etapas. Linha conectando os pontos. Em mobile, vira vertical.

**Copy:**
```
Headline (h2):
Funciona como um sócio. Não como um software.

Subheadline:
4 etapas. Em 4 horas você tem uma IA rodando na sua empresa.

Etapa 1 — Briefing (30 min, grátis)
Você nos conta seu negócio numa call rápida. Identificamos o que dá pra delegar à IA.

Etapa 2 — Implementação (4h)
Logamos remoto no seu computador, instalamos a IA, criamos a estrutura e treinamos você ao vivo.

Etapa 3 — Operação (todo dia)
Você delega tarefas pra IA como faria com um sócio. Ela executa. Você revisa quando quiser.

Etapa 4 — Acompanhamento (todo mês)
A gente analisa o que sua IA fez no mês e te manda 1 insight estratégico pra crescer.
```

### 4. Casos de uso por nicho

**Layout:** tabs horizontais — cliente clica no nicho dele e revela exemplos. Em mobile, vira accordion.

**Copy:**
```
Headline (h2):
Veja como funciona no seu ramo.

Subheadline:
Customizamos pro seu nicho no setup. Aqui alguns exemplos.

Tab "Pousada":
✓ Responde reviews automaticamente no Google Meu Negócio
✓ Atualiza descrições no site quando você muda preço
✓ Gera posts de Instagram com base nas fotos da diária
✓ Manda WhatsApp pra hóspedes antigos com oferta personalizada

Tab "Restaurante":
✓ Categoriza pedidos do iFood / WhatsApp / balcão
✓ Responde avaliações negativas com diplomacia
✓ Gera posts diários com prato do dia
✓ Atualiza cardápio em todos os canais quando você muda preço

Tab "E-commerce":
✓ Escreve descrições de produto SEO em segundos
✓ Responde dúvidas frequentes de clientes
✓ Categoriza fotos novas automaticamente
✓ Gera relatório semanal de o que vendeu e o que não vendeu

Tab "Festival":
✓ Gera press releases pra mídia
✓ Atualiza FAQ com base em dúvidas que chegam
✓ Cria posts de divulgação com tom da marca
✓ Categoriza inscrições por critério

Tab "Outro":
"Não viu o seu? Conta pra gente — montamos do zero." [CTA: agendar diagnóstico]
```

### 5. Os 3 tiers — Pricing

**Layout:** 3 cards lado a lado. Card do meio (Profissional) com destaque visual (escala 1.05, badge "Mais escolhido", borda em gradient).

**Copy:**
```
Headline (h2):
Escolha o plano do seu Sócio Digital.

Subheadline:
Todos incluem hospedagem Vision Cloud, treinamento ao vivo e acompanhamento mensal.

═══════════════════════════════════════════════════════
CARD 1 — Essencial
═══════════════════════════════════════════════════════
"Pra quem opera sozinho ou tem 1 funcionário-chave."

R$ 2.500 setup
+ R$ 400/mês

✓ 1 usuário
✓ 2h treinamento ao vivo
✓ 1h suporte/mês
✓ Skill base do seu nicho
✓ Hospedagem Vision Cloud inclusa
✓ Relatório mensal com insight estratégico

CTA: Quero o Essencial →

═══════════════════════════════════════════════════════
CARD 2 — Profissional [BADGE: MAIS ESCOLHIDO]
═══════════════════════════════════════════════════════
"Pra equipes de 2 a 4 pessoas com processos compartilhados."

R$ 4.500 setup
+ R$ 800/mês

✓ Até 4 usuários
✓ Sincronização Vision (tempo real entre máquinas)
✓ Skill customizada profunda do seu nicho
✓ 3h treinamento + 2 vídeos personalizados
✓ 3h suporte/mês
✓ Revisão trimestral de processo
✓ Hospedagem Vision Cloud inclusa
✓ Tudo do Essencial

CTA: Quero o Profissional →

═══════════════════════════════════════════════════════
CARD 3 — Empresarial
═══════════════════════════════════════════════════════
"Pra equipes 5+ com operação complexa e integrações."

R$ 8.000 setup
+ R$ 1.500/mês

✓ 5+ usuários (orçamento conforme equipe)
✓ Até 3 agentes automatizados
✓ Integrações: FB Ads, WhatsApp Business, Google Ads, Higgsfield
✓ Skills múltiplas customizadas
✓ Suporte prioritário (< 4h)
✓ Call mensal de revisão
✓ Hospedagem Vision Cloud inclusa
✓ Tudo do Profissional

CTA: Quero o Empresarial →
```

Abaixo dos cards, em texto pequeno:
```
* Plano Pro do Claude (USD 20/mês) pago direto pelo cliente à Anthropic — não passa pela Real Vision, você nunca fica refém da gente.
```

### 6. Diferenciais

**Layout:** 4 cards em grid 2x2. Cada card com ícone + título + descrição curta.

**Copy:**
```
Headline (h2):
Por que Sócio Digital e não outra ferramenta.

Diferencial 1 — Implementação remota completa
A gente loga no seu computador e configura tudo. Você não instala nada, não baixa nada, não estuda nada antes.

Diferencial 2 — IA personalizada pro seu negócio
Não é ChatGPT genérico. A IA conhece sua empresa, seus clientes, seu tom de voz, seu processo.

Diferencial 3 — Treinamento ao vivo
Você aprende a delegar e a perguntar do jeito certo. Em 4 horas tá apto a tocar sozinho.

Diferencial 4 — Vision Cloud incluso
Seu site rodando rápido e seguro na nossa hospedagem própria, sem custo extra. Toda burocracia técnica fica com a gente.
```

### 7. Prova social

**Layout:** carrossel horizontal de depoimentos. Em mobile, vira slide deslizável.

**Versão 1 — Lançamento (sem clientes ainda):**
```
Headline (h2):
A Real Vision já usa isso internamente há 6 meses.

Quote (grande, com aspas decorativas):
"Implementei o Sócio Digital na própria Real Vision há 6 meses. Hoje eu delego 80% das tarefas operacionais pra IA e foco em estratégia. Quero levar isso pros meus clientes."

— Felipe Garcia, Fundador da Real Vision

[Bloco visual lateral com estatística destacada]
20h/semana
economizadas em tarefas operacionais
```

**Versão 2 — Pós-piloto (substitui versão 1 quando tiver cliente real):**
```
Headline (h2):
Quem já tem um Sócio Digital.

Carrossel com 2–3 depoimentos:
- Cliente piloto (foto, nome, empresa, depoimento curto)
- Felipe (testemunho como caso interno)
- Próximos clientes conforme entrarem
```

### 8. FAQ

**Layout:** accordion vertical. Pergunta com ícone + sinal de expandir.

**Adicionar Schema markup FAQPage no `<head>`.**

**Copy:**
```
Headline (h2):
Perguntas frequentes.

1. Quanto tempo leva pra implementar?
   → 3 a 4 horas em call remota. Você reserva um turno do dia, a gente faz tudo junto.

2. Preciso entender de IA pra usar?
   → Não. A gente te ensina ao vivo a fazer as perguntas certas. Em 4 horas você tá pronto pra usar sozinho.

3. Posso cancelar quando quiser?
   → Sim. Contratos mensais. Só pedimos 30 dias de aviso prévio antes do próximo ciclo.

4. E se eu mudar de computador?
   → A gente migra junto. Cobramos só a hora de implementação.

5. Quem paga o plano Pro do Claude?
   → Você (USD ~20/mês). A gente configura, mas o pagamento é direto seu — assim você nunca fica refém da gente.

6. Funciona pra qualquer ramo?
   → Sim. A gente customiza pro seu nicho no setup. Pousada, restaurante, e-commerce, festival, agência — todos funcionam.

7. Meu funcionário pode usar em vez de mim?
   → Pode. Tier Essencial é pra 1 pessoa (você ou ele). Tiers Profissional/Empresarial são pra equipe.

8. Quando começo a ver resultado?
   → Primeira semana você já delega tarefa básica. Em 1 mês tá rodando no modo automático.

9. Meus dados ficam seguros?
   → Sim. Tudo fica no seu computador (ou na sua Sincronização Vision em tier Profissional+). Você é dono dos dados. A gente nunca acessa sem sua autorização explícita.

10. Tem garantia?
    → Sim. Se em 7 dias após a implementação você não tiver delegado pelo menos 1 tarefa pra sua IA, devolvemos 100% do setup. Sem perguntas.
```

### 9. CTA final

**Layout:** banner full-width com gradient forte + form simples ao centro

**Copy:**
```
Headline (h2 grande, gradient):
Pronto pra ter seu Sócio Digital?

Subheadline:
Comece com uma call gratuita de 30 minutos. A gente diagnostica o que dá pra delegar pra IA na sua empresa e te manda uma proposta personalizada.

Form (centralizado, máximo 500px de largura):
[Nome completo]
[Nome da empresa]
[WhatsApp (com máscara)]
[E-mail]
[Nicho — dropdown: Pousada / Restaurante / E-commerce / Festival / Agência / Outro]
[Maior dor operacional hoje — textarea, opcional]

CTA do form: Agendar diagnóstico grátis →

Microcopy abaixo do form:
✓ Resposta em até 4h úteis  ✓ Sem compromisso  ✓ 100% gratuito
```

## Schema markup (JSON-LD) — colocar no `<head>`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sócio Digital",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Real Vision",
    "url": "https://realvisionmaps.com",
    "telephone": "[Felipe: a definir]",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Itacaré",
      "addressRegion": "BA",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.youtube.com/@RealVisionMaps"
    ]
  },
  "description": "Implementação remota de IA empresarial: estrutura organizacional + treinamento ao vivo + acompanhamento mensal com insight estratégico. Tenha um Sócio Digital que executa pela sua empresa.",
  "areaServed": "BR",
  "serviceType": "Implementação de IA empresarial",
  "offers": [
    {
      "@type": "Offer",
      "name": "Essencial",
      "price": "2500",
      "priceCurrency": "BRL",
      "description": "Setup completo + R$ 400/mês de mensalidade. 1 usuário."
    },
    {
      "@type": "Offer",
      "name": "Profissional",
      "price": "4500",
      "priceCurrency": "BRL",
      "description": "Setup completo + R$ 800/mês de mensalidade. Até 4 usuários com Sincronização Vision."
    },
    {
      "@type": "Offer",
      "name": "Empresarial",
      "price": "8000",
      "priceCurrency": "BRL",
      "description": "Setup completo + R$ 1.500/mês de mensalidade. 5+ usuários, agentes automatizados, integrações externas."
    }
  ]
}
```

Adicionar **segundo bloco JSON-LD** com `FAQPage` (todas as 10 perguntas do FAQ acima).

## SEO

- **Title tag:** Sócio Digital | Real Vision — IA que executa pela sua empresa
- **Meta description:** já especificada acima
- **Keywords primárias:** sócio digital, ia para empresas, implementação ia empresa, automação com ia, claude code para empresa
- **Keywords secundárias:** funcionário digital ia, assistente virtual empresa, automatizar tarefas repetitivas, ia para pousada, ia para restaurante
- **H1 único:** "Tenha um Sócio Digital que executa pela sua empresa."
- **H2s:** uma por seção (já marcados acima)
- **URL canônica:** `https://realvisionmaps.com/socio-digital`
- **Open Graph image:** mockup do hero (1200x630px, gerar no Higgsfield depois)
- **Twitter Card:** summary_large_image

## Checklist técnico (antes de publicar)

- [ ] Mobile-first (Lighthouse mobile ≥ 90)
- [ ] Desktop Lighthouse ≥ 95
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Schema markup validado em https://validator.schema.org/
- [ ] Form integrado com destino definido (VisionFlow CRM ou e-mail Felipe)
- [ ] WhatsApp click-to-chat no header (link `https://wa.me/[número]`)
- [ ] Pixel Facebook Ads instalado (pra remarketing futuro)
- [ ] Google Analytics 4 + Google Tag Manager configurados
- [ ] Evento de conversão GA4 disparado no submit do form ("diagnostico_agendado")
- [ ] Sitemap atualizado com nova URL
- [ ] OG tags + Twitter Card validados em https://www.opengraph.xyz/
- [ ] Teste em Chrome, Safari, Firefox (mobile e desktop)
- [ ] Imagens com `loading="lazy"` (exceto hero)
- [ ] Imagens em WebP (com fallback PNG/JPG)
- [ ] Alt text em todas as imagens
- [ ] Link interno: do header "Soluções" pra /socio-digital
- [ ] Link interno: dos blog posts pra /socio-digital
- [ ] Validar contraste WCAG AA mínimo

## Próximo passo

Quando este briefing for enviado pro Claude Design:

1. Anexar `contexto/DESIGN.md` (paleta + fontes + componentes existentes)
2. Anexar `contexto/VOZ.md` (tom de comunicação oficial)
3. Anexar 2–3 links de inspiração visual (decisão pendente do Felipe — ver `06-EXECUCAO-PROXIMOS-PASSOS.md`)
4. Pedir ao Claude Design: mockup React/HTML completo, mobile + desktop, com placeholders pros assets visuais (mockup laptop, ícones, etc)
5. Receber: código React/HTML/Tailwind funcional
6. Eu (Claude Code) integro no `real-vision-core`, ajusto, faço build, faço deploy
