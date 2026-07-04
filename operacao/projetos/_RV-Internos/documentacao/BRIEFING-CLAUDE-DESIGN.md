# Briefing — Nova Home Real Vision (para Claude Design)

> **Data:** 2026-05-25
> **Fase:** 4 de 4 (briefing visual final)
> **Inputs anteriores:** AUDITORIA-HOME.md · NOVA-HOME-ARQUITETURA.md · COPY-HOME.md
> **Destino:** Claude Design (claude.ai/design) → exportar componente React → colar no Lovable

---

## Como usar este documento

1. Abra **Claude Design** (`claude.ai/design` ou via support.claude.com).
2. Cole o **Prompt 1 — Setup e Hero** primeiro. Itere visualmente.
3. Cole os prompts seguintes na ordem, seção por seção (Sócio Digital → Serviços → ... → Footer).
4. No final, peça pra Claude Design **exportar como componente React + Tailwind para Lovable** (instruções no final deste doc).

Trabalhar seção-por-seção é mais leve e dá mais controle. A alternativa (prompt único gigante) tende a comprometer a qualidade visual.

---

## Contexto da marca (cole isso PRIMEIRO no Claude Design)

```
═══════════════════════════════════════════════════════════════
CONTEXTO DA MARCA — REAL VISION 360
═══════════════════════════════════════════════════════════════

Marca: Real Vision 360
Tagline: Presença digital integrada para negócios locais e globais
Posicionamento: Consultor de presença digital — não agência criativa
Tom: Direto, técnico, resultado-focado, sem hipérbole
Público: PMEs locais (pousadas, restaurantes, eventos) + clientes globais

ESTILO VISUAL:
- Dark theme premium (já é o tema do site atual — manter)
- Identidade tipográfica forte com headings em CAPS
- Visual estratégico (foge de fotografia genérica/decorativa)
- Mistura tech sutil + natureza (negócios locais costeiros + IA/sistemas)
- Espaçamento generoso entre seções (respiração)
- Glass morphism leve no header sticky
- Detalhes em cor de destaque (a definir — sugiro verde-água ou azul-elétrico
  para casar com a estética 360°/tecnologia, mas seguir o que já existe no site)

REGRAS DE COPY:
- Headlines curtas e diretas
- Sem palavras como "incrível", "sensacional", "100% satisfeitos"
- Resultado mensurável > promessa abstrata
- VOZ: consultor estratégico, não vendedor

STACK DE SAÍDA (importante):
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (para animações leves)
- Componentes funcionais, props tipadas
- Mobile-first responsivo
- Exportar para colar no Lovable (real-vision-core)
═══════════════════════════════════════════════════════════════
```

---

## Prompt 1 — Setup, NAV e HERO

```
═══════════════════════════════════════════════════════════════
PROMPT 1 — NAV STICKY + HERO ABOVE THE FOLD
═══════════════════════════════════════════════════════════════

Crie a parte ABOVE THE FOLD da home da Real Vision, contendo NAV
sticky + HERO. Dark theme premium.

NAV (sticky, glass morphism leve no scroll):
- Esquerda: logo "Real Vision" (texto temporário em CAPS bold,
  depois substituo pelo SVG)
- Centro: menu — Serviços · Sócio Digital · Portfólio · Blog · Contato
- Direita:
  - Ícone de globo cinza (placeholder seletor de idioma)
  - Botão CTA "Falar com Felipe" (estilo outline com hover preenchido)

HERO (full-width, altura ~85vh em desktop):
- Layout duas colunas: 60% texto à esquerda, 40% visual à direita

  Coluna esquerda:
  - Headline grande, CAPS, 2 linhas:
    "SISTEMAS DIGITAIS QUE TRABALHAM
     ENQUANTO VOCÊ DORME."
  - Subheadline (peso normal, cinza claro, 1 parágrafo):
    "Site, Google Meu Negócio, tour 360° e Sócio Digital — uma única
     arquitetura para o seu negócio ser encontrado, escolhido e lembrado."
  - Linha de CTAs:
    - Primário (preenchido, cor de destaque): "Quero meu diagnóstico grátis"
    - Secundário (texto + seta): "Ver projetos →"
  - Abaixo dos CTAs, linha fina de social proof (separadores em cinza):
    "30+ tours publicados · 10+ websites entregues · 10+ cidades atendidas"

  Coluna direita:
  - Placeholder de tour 360° — bordas arredondadas, leve sombra,
    overlay de play sutil. Pode ser um mockup escuro com gradiente
    (vou substituir pelo embed real do tour do Universo Paralello)
  - Tag flutuante no canto: "Tour ao vivo · Universo Paralello"

ESTILO:
- Background: dark (#0a0a0a ou similar)
- Texto principal: branco quase puro
- Texto secundário: cinza 60% opacidade
- Botão primário: cor de destaque forte (sugestão: #00D9A3 verde-água
  ou usar a cor atual do site)
- Tipografia: sans-serif moderna (Inter, Manrope ou similar)
- Headings em CAPS com tracking expandido leve

ANIMAÇÃO:
- Fade-in + slide-up leve no hero ao carregar (Framer Motion)
- Nav muda de transparente pra glass morphism ao rolar 80px
═══════════════════════════════════════════════════════════════
```

---

## Prompt 2 — Barra de Números

```
═══════════════════════════════════════════════════════════════
PROMPT 2 — BARRA DE CREDIBILIDADE (NÚMEROS)
═══════════════════════════════════════════════════════════════

Logo abaixo do Hero, faixa horizontal compacta com 4 métricas.

Background: ligeiramente diferente do hero (um pouco mais claro
ou com bordas finas em cima e embaixo).

Pequeno texto centralizado acima dos números:
"Resultado verificável, não promessa." (itálico, cinza médio)

4 colunas com números grandes em destaque + label:

10+              30+              10+              5+
websites         tours publicados  cidades          segmentos
entregues        no Street View    atendidas        de negócio

ESTILO:
- Números enormes, peso bold, cor de destaque
- Labels em CAPS pequeno, cinza claro
- Linhas verticais separadoras finas entre colunas
- Padding vertical generoso
- Em mobile: vira grid 2x2
═══════════════════════════════════════════════════════════════
```

---

## Prompt 3 — Sócio Digital (seção protagonista)

```
═══════════════════════════════════════════════════════════════
PROMPT 3 — SEÇÃO SÓCIO DIGITAL (PROTAGONISTA DA HOME)
═══════════════════════════════════════════════════════════════

Esta é a seção MAIS IMPORTANTE da página. Precisa de identidade
visual própria dentro do dark theme — um leve diferencial pra
puxar o olhar.

ESTRUTURA:

Topo da seção (centralizado):
- Tag pequena com borda arredondada: "🚀 LANÇAMENTO 2026"
- Headline grande em CAPS, 2 linhas:
  "CONHEÇA O SÓCIO DIGITAL.
   O PRIMEIRO FUNCIONÁRIO DE IA."
- Subheadline (peso normal, máximo 3 linhas, cinza claro):
  "O Sócio Digital é instalado no seu computador, aprende a
   rotina do seu negócio e executa tarefas operacionais com
   você no comando. Implementação remota, treinamento ao vivo,
   acompanhamento mensal com insight estratégico. Hospedagem
   Vision Cloud inclusa em todos os planos."

GRID DE 3 CARDS (side-by-side em desktop, stack em mobile):

Card 1 — ESSENCIAL
- Tag superior: "Para começar"
- Preço grande: R$ 2.500 (setup)
- Mensalidade: R$ 400/mês
- Descrição (1 linha): "Pra 1 pessoa. Você ou seu funcionário-chave
  delegando rotina pra IA."
- 3 bullets (com check):
  · 1 call de briefing + 2h de treinamento ao vivo
  · Hospedagem Vision Cloud inclusa
  · 1h de suporte/mês + relatório com insight
- Microcopy pequeno: "Plano Pro do Claude pago direto pelo cliente"

Card 2 — PROFISSIONAL (DESTACADO — borda iluminada, leve elevação)
- Tag superior: "⭐ Mais escolhido" (em cor de destaque)
- Preço grande: R$ 4.500 (setup)
- Mensalidade: R$ 800/mês
- Descrição: "Pra equipes de 2 a 4 pessoas. Toda a empresa
  sincronizada e operando com IA."
- 3 bullets:
  · Sincronização Vision entre todos os computadores
  · 3h de treinamento + 2 vídeos personalizados
  · 3h de suporte/mês + revisão trimestral
- Microcopy: "Resposta de suporte em < 8h úteis"

Card 3 — EMPRESARIAL
- Tag superior: "Pra escalar"
- Preço grande: R$ 8.000 (setup)
- Mensalidade: R$ 1.500/mês
- Descrição: "Pra equipes de 5+ ou operações complexas. Agentes
  automatizados, integrações externas, suporte prioritário."
- 3 bullets:
  · 3 agentes automatizados rodando em background
  · Integrações: FB Ads, WhatsApp, Google Ads
  · Suporte prioritário (< 4h úteis)
- Microcopy: "Call de revisão mensal incluída"

ABAIXO DOS CARDS (centralizado):
- Botão grande, cor de destaque, sombra:
  "Quero meu diagnóstico grátis (30 min)"
- Microcopy abaixo (itálico, cinza claro):
  "Sem compromisso. Em 30 minutos a gente mapeia sua rotina e
   te mostra o que daria pra delegar."

ESTILO:
- Esta seção pode ter um leve glow/aurora no background
  (gradient sutil em movimento ou estático)
- Cards com fundo levemente mais claro que a página
- Card destacado (Profissional): borda em cor de destaque +
  leve scale up + sombra mais forte
- Animação no hover dos cards (lift suave)
═══════════════════════════════════════════════════════════════
```

---

## Prompt 4 — Grid de Serviços (6 pilares)

```
═══════════════════════════════════════════════════════════════
PROMPT 4 — GRID DE SERVIÇOS (6 PILARES, HIERARQUIA ASSIMÉTRICA)
═══════════════════════════════════════════════════════════════

Headline da seção (CAPS, centralizado):
"SEIS PILARES. UMA ÚNICA ARQUITETURA."

Subheadline (parágrafo curto, cinza claro):
"A Real Vision não vende serviço solto. Vende sistema digital
integrado pro seu negócio ser encontrado, escolhido e lembrado."

GRID ASSIMÉTRICO:
- 1 card GRANDE ocupando 2 colunas (Sócio Digital)
- 5 cards normais distribuídos em grid (2 ou 3 por linha)

CARD GRANDE — SÓCIO DIGITAL
- Ícone destacado (símbolo de IA — sugiro circuito/neurônio estilizado)
- Tag pequena: "6º PILAR · NOVO"
- Título: "Sócio Digital" (mais bold/maior que os outros)
- Descrição (2 linhas): "Seu primeiro funcionário de IA, instalado
  no seu computador. Executa rotina, libera tempo."
- CTA: "Conhecer planos →" (ancora pra seção 3)

CARDS NORMAIS (mesmo template):
- Ícone no topo
- Título do serviço em CAPS pequeno
- Descrição (2 linhas)
- CTA específico (texto + seta)

Card 1 — Sites Profissionais
"Landing pages, sites institucionais e e-commerces que convertem.
Estrutura pensada pra SEO e GEO."
CTA: "Ver sites entregues →"

Card 2 — Google Meu Negócio
"Otimização estratégica da sua ficha. Mais visualizações, mais
cliques, mais reservas."
CTA: "Ver como otimizamos →"

Card 3 — Tour Virtual 360°
"Captação, montagem e publicação no Google Street View. Cliente
visita seu espaço antes de chegar."
CTA: "Entrar em um tour →"

Card 4 — Fotografia & Drone
"Material visual estratégico com equipamentos próprios. Foto de
produto, drone aéreo, vídeo institucional."
CTA: "Ver portfólio visual →"

Card 5 — Automações & Agentes de IA
"Chatbots, integrações e automação de processos. Pra quem quer
escalar sem aumentar equipe."
CTA: "Ver casos de automação →"

ESTILO:
- Cards com fundo levemente diferenciado, bordas suaves
- Hover: leve glow na borda + ícone anima
- Card grande tem peso visual diferente (background sutilmente
  diferente, borda mais forte)
═══════════════════════════════════════════════════════════════
```

---

## Prompt 5 — Portfólio com filtros

```
═══════════════════════════════════════════════════════════════
PROMPT 5 — PORTFÓLIO (PROJETOS REAIS)
═══════════════════════════════════════════════════════════════

Headline (CAPS, centralizado):
"PROJETOS REAIS. RESULTADOS VERIFICÁVEIS."

Subheadline:
"Mais de 30 entregas em 10+ cidades, do interior da Bahia ao
primeiro cliente na Suíça."

Filtros (chips clicáveis, abaixo do subheadline, centralizados):
[Todos] [Tour 360°] [Site] [Sistema Integrado] [Internacional]

Grid de 6 cards (2 colunas em tablet, 3 em desktop):

Card 1 — UNIVERSO PARALELLO 18°
Tipo: Festival · Local: Pratigi (BA)
Mini descrição: "Tour virtual + HUB digital do maior festival de
música eletrônica do Brasil."

Card 2 — SOLARIUM AARAU 🇨🇭
Tipo: Tour Virtual · Local: Aarau (Suíça)
Tag de destaque: "1º INTERNACIONAL"
Mini descrição: "Primeiro cliente fora do Brasil. Tour 360°
entregue com publicação no Street View."

Card 3 — CONDOMÍNIO VILA MANDELA
Tipo: Sistema Integrado · Local: Itacaré (BA)
Mini descrição: "Aplicação completa da Tríade do Sucesso: site +
GMN + tour 360°."

Card 4 — HUB ILHA DO CONTRATO
Tipo: HUB · Local: Igrapiúna (BA)
Mini descrição: "Portal imersivo unindo múltiplos negócios da
região num só ambiente digital."

Card 5 — CASA AMARELA
Tipo: Landing + Tour · Local: Barra Grande (BA)
Mini descrição: "Página de conversão com tour virtual integrado.
Foco em reserva direta."

Card 6 — ITACARÉ VIRTUAL
Tipo: Portal · Local: Itacaré (BA)
Mini descrição: "Portal imersivo da cidade. Negócios locais
unidos numa única experiência."

CTA pós-grid (centralizado, botão preenchido):
"Quero um projeto assim"

ESTILO:
- Cards com imagem de capa do projeto (placeholder por enquanto:
  gradient + ícone categoria)
- Overlay escuro no hover com mini-descrição expandida
- Tag de destaque (1º INTERNACIONAL) com cor diferente no card 2
- Filtros animados (chip selecionado fica com cor de destaque)
═══════════════════════════════════════════════════════════════
```

---

## Prompt 6 — Depoimentos (placeholders)

```
═══════════════════════════════════════════════════════════════
PROMPT 6 — DEPOIMENTOS (COM PLACEHOLDERS MARCADOS)
═══════════════════════════════════════════════════════════════

Headline:
"QUEM JÁ TRABALHOU COM A GENTE."

3 cards de depoimento horizontais, com nota de placeholder:

Cada card:
- Tag pequena no canto superior direito: "🔒 Exemplo — em coleta"
  (cor cinza, fonte pequena, opacidade 70%)
- Foto: silhueta neutra (placeholder cinza com ícone de usuário)
- Aspas decorativas grandes no fundo (sutil)
- Texto do depoimento (em itálico):
  "[Aguardando depoimento real do cliente. Real Vision vai coletar
   e publicar com autorização.]"
- Linha divisória
- Nome: "Cliente Real Vision"
- Empresa: variar entre os 3 cards:
  - Card 1: "Pousada — Litoral Baiano"
  - Card 2: "Festival — Bahia"
  - Card 3: "Tour 360° — Internacional"

Abaixo dos cards, microcopy centralizado (itálico, cinza):
"Depoimentos verificados em coleta. Próxima atualização: ao
receber autorização de cada cliente."

ESTILO:
- Cards mais sóbrios que o resto (essa seção é "espera ativa")
- Tag de placeholder bem visível mas não invasiva
- Opacidade dos cards levemente reduzida (uns 90%) pra sinalizar
  que é provisório
═══════════════════════════════════════════════════════════════
```

---

## Prompt 7 — Como Funciona (4 etapas)

```
═══════════════════════════════════════════════════════════════
PROMPT 7 — COMO FUNCIONA (PROCESSO EM 4 ETAPAS)
═══════════════════════════════════════════════════════════════

Headline:
"QUATRO ETAPAS. ZERO MISTÉRIO."

Subheadline:
"Da primeira conversa até o suporte pós-entrega, todo projeto da
Real Vision segue o mesmo processo."

4 cards numerados em linha horizontal (com setas conectoras
entre eles em desktop, ou stack vertical em mobile):

01 · DIAGNÓSTICO
"A gente entende seu negócio antes de propor qualquer coisa. Call
de 30 minutos pra mapear sua rotina, seu público e o que falta na
sua presença digital atual."

02 · PLANEJAMENTO
"Você recebe a proposta com escopo, prazo, investimento e o que
cada entrega vai gerar de resultado. Sem letra miúda. Sem
surpresa."

03 · PRODUÇÃO
"Captação, desenvolvimento e revisão. Você acompanha o progresso
em tempo real e participa das decisões críticas."

04 · ENTREGA + SUPORTE
"Publicação, treinamento de uso e suporte ativo. A Real Vision
não desaparece depois do go-live."

ESTILO:
- Número grande no topo (peso bold, cor de destaque, opacidade 30%)
- Título da etapa em CAPS abaixo do número
- Descrição em peso normal
- Conectores sutis (linha pontilhada com seta) entre os cards
- Animação: ao rolar até a seção, números aparecem em sequência
═══════════════════════════════════════════════════════════════
```

---

## Prompt 8 — Para Quem É / Não É

```
═══════════════════════════════════════════════════════════════
PROMPT 8 — PARA QUEM É / PARA QUEM NÃO É
═══════════════════════════════════════════════════════════════

Headline (CAPS):
"REAL VISION É PRA TODO MUNDO? NÃO."

Subheadline:
"Trabalhamos melhor com quem se reconhece nessa lista."

LAYOUT: 2 colunas side-by-side (em mobile: empilhadas)

COLUNA ESQUERDA — verde sutil no fundo, ícone ✅
Título: "É pra você se..."
Lista (cada item com check verde):
- Você tem negócio físico ou digital com público local ou global
- Quer ser encontrado primeiro no Google da sua cidade
- Entende que presença digital é investimento, não despesa
- Tá disposto a delegar rotina operacional pra IA
- Quer resultado mensurável, não promessa bonita

COLUNA DIREITA — vermelho/rosa sutil no fundo, ícone ❌
Título: "Não é pra você se..."
Lista (cada item com X vermelho/rosa):
- Tá procurando "site bonito" sem se importar com conversão
- Quer o mais barato do mercado
- Não tem tempo nem disposição pra acompanhar o projeto
- Acha que IA "faz tudo sozinha" sem treinamento
- Quer pagar só depois de "ver dar certo"

ESTILO:
- Backgrounds bem sutis (10% opacidade da cor)
- Divisória vertical entre colunas
- Itens com check/X coloridos, texto branco
═══════════════════════════════════════════════════════════════
```

---

## Prompt 9 — Bloco Felipe (autoridade do fundador)

```
═══════════════════════════════════════════════════════════════
PROMPT 9 — BLOCO FELIPE (AUTORIDADE DO FUNDADOR)
═══════════════════════════════════════════════════════════════

Headline:
"QUEM ESTÁ POR TRÁS."

LAYOUT: 2 colunas
- Esquerda (40%): foto do Felipe (placeholder por enquanto:
  círculo cinza grande, vou substituir pela foto real depois)
- Direita (60%): bio em 3 parágrafos curtos

Parágrafo 1:
"Felipe Garcia começou como Local Guide do Google em Itacaré —
mapeando ruas, fotografando estabelecimentos, ajudando turista
a achar pousada. Em poucos anos virou um dos perfis mais ativos
da Bahia."

Parágrafo 2:
"A câmera 360° veio depois. Depois o drone. Depois o
desenvolvimento WEB / IA. Cada ferramenta virou pilar de serviço
— e a Real Vision nasceu da combinação de tudo isso num único
sistema."

Parágrafo 3:
"Hoje, Felipe lidera a Real Vision atendendo de pousada em Maraú
a Solarium na Suíça. A operação está num ponto de virada: do
estúdio do fundador pra empresa com método, equipe e clientes em
três continentes."

ABAIXO DA BIO — mini-badges em linha:
[ 🗺️ Local Guide Google ]
[ 📷 Câmera 360° + Drone ]
[ 🤖 Engenheiro de IA ]
[ 🇨🇭 1º cliente internacional ]

ESTILO:
- Foto com borda sutil em cor de destaque
- Parágrafos com bom espaçamento entre linhas
- Badges com fundo sutil + borda fina + ícone à esquerda do texto
═══════════════════════════════════════════════════════════════
```

---

## Prompt 10 — FAQ (accordion)

```
═══════════════════════════════════════════════════════════════
PROMPT 10 — FAQ (7 PERGUNTAS EM ACCORDION)
═══════════════════════════════════════════════════════════════

Headline:
"PERGUNTAS QUE A GENTE RECEBE DIRETO."

Layout: lista vertical de accordions (1 por linha, full width
centralizado com max-width controlado pra leitura confortável).

Cada item do accordion:
- Pergunta visível (CAPS curto ou só primeira letra maiúscula —
  recomendo primeira letra maiúscula pra leitura mais natural)
- Ícone + à direita (vira × quando aberto)
- Resposta expandida com animação suave

7 itens:

1. Vocês atendem minha cidade ou só Bahia?
"Atendemos no Brasil inteiro e fora dele. A base é Bahia, mas
captação 360° presencial está disponível mediante deslocamento.
Sites, Google Meu Negócio, automações e Sócio Digital são
entregues 100% remoto pra qualquer lugar."

2. Qual o prazo de entrega?
"Depende do escopo. Site institucional: 2–4 semanas. Tour 360°
pós-captação: 1–2 semanas. Sócio Digital: implementação em 4h
(mais 7 dias até cliente delegar a primeira tarefa). Tudo está
documentado na proposta antes de fechar."

3. Preciso contratar tudo junto ou posso começar por um serviço?
"Pode começar pelo que faz mais sentido pro seu momento. A maior
parte dos clientes começa por um pilar (geralmente tour 360° ou
Google Meu Negócio) e adiciona os outros depois."

4. O que exatamente é o Sócio Digital?
"É a implementação de um agente de IA (Claude Code) no seu
próprio computador, treinado com a rotina do seu negócio. Ele
executa tarefas como funcionário — escreve e-mail, redige
proposta, organiza informação, gera relatório. Não é SaaS. Você
é o dono da operação."

5. Qual o investimento mínimo pra começar?
"Depende do pilar. Pacotes de tour 360° começam em R$ 1.500.
Sites em R$ 3.500. Sócio Digital Essencial em R$ 2.500 setup +
R$ 400/mês. Todo orçamento sai depois do diagnóstico — não
vendemos pacote fechado sem entender o negócio."

6. Tem garantia de resultado?
"A Real Vision garante a entrega técnica (publicação, indexação,
configuração funcional) e o suporte ativo. Resultado de mercado
depende de fatores que envolvem você — manutenção do conteúdo,
atendimento ao cliente, operação. A gente acompanha de perto pra
maximizar a chance."

7. Como funciona o suporte depois da entrega?
"Todo cliente Real Vision tem canal direto pelo WhatsApp. Tempo
de resposta varia por contrato (de 4h a 24h úteis, dependendo do
plano). Sócio Digital tem mensalidade que inclui suporte
recorrente e relatório mensal."

ESTILO:
- Accordions com borda inferior fina (separador entre itens)
- Animação de expansão suave (chevron rotaciona ao abrir)
- Estado aberto: leve highlight na borda esquerda em cor de destaque
═══════════════════════════════════════════════════════════════
```

---

## Prompt 11 — CTA Form final

```
═══════════════════════════════════════════════════════════════
PROMPT 11 — FORM DE CONVERSÃO FINAL
═══════════════════════════════════════════════════════════════

Esta é a zona de conversão. Precisa de destaque visual forte
mas sem ruído.

Background: levemente diferenciado (talvez gradient sutil em
cor de destaque a 5% opacidade, ou box em cor de destaque
contendo o form).

Headline grande, CAPS, centralizada:
"VAMOS COMEÇAR PELO DIAGNÓSTICO."

Subheadline (parágrafo, centralizado):
"30 minutos. Sem compromisso. Sem proposta fechada antes de
entender seu negócio."

FORM (4 campos em layout 2x2 em desktop, stack em mobile):

Linha 1:
- Campo Nome (obrigatório)
  Label: "Como podemos te chamar?"
  Placeholder: "Seu nome"

- Campo WhatsApp/E-mail (obrigatório)
  Label: "Por onde retornamos?"
  Placeholder: "WhatsApp ou e-mail"

Linha 2:
- Campo Cidade (obrigatório)
  Label: "Sua cidade"
  Placeholder: "Cidade — Estado/País"

- Campo Tipo de Negócio (opcional, dropdown)
  Label: "Que tipo de negócio você tem?"
  Opções:
  · Pousada / Hospedagem
  · Restaurante / Bar
  · Evento / Festival
  · Comércio local
  · E-commerce
  · Agência / Serviços
  · Outro

BOTÃO DE ENVIO (largura total ou destacado, cor de destaque):
"Quero meu diagnóstico grátis"

Microcopy abaixo do botão (itálico, cinza):
"Retornamos em até 24h úteis. Seus dados ficam com a Real Vision
— não compartilhamos com ninguém."

ESTILO:
- Inputs com fundo escuro, borda sutil, focus animado em cor
  de destaque
- Labels acima dos inputs (não placeholders flutuantes)
- Validação inline (verde no preenchimento correto)
- Botão com efeito leve no hover (lift + glow)
═══════════════════════════════════════════════════════════════
```

---

## Prompt 12 — Loja CTA + Footer

```
═══════════════════════════════════════════════════════════════
PROMPT 12 — LOJA CTA + FOOTER
═══════════════════════════════════════════════════════════════

BLOCO LOJA (antes do footer, faixa horizontal compacta):

Layout: 2 colunas
- Esquerda (texto):
  Headline: "MAIS QUE SERVIÇO — EQUIPAMENTO, FORMAÇÃO E
  FERRAMENTAS."
  Sub: "Câmeras 360°, treinamentos, presets e ferramentas que a
  Real Vision usa internamente, agora à venda."
- Direita: botão grande "Visitar Loja" (estilo outline)

Background: levemente diferenciado dos outros blocos.

═══════════════════════════════════════════════════════════════

FOOTER (estrutura completa):

Layout: 4 colunas em desktop, stack em mobile.

Coluna 1 — Marca
- Logo "Real Vision" (CAPS, bold)
- Tagline (1 linha, cinza claro):
  "Presença digital integrada para negócios locais e globais."

Coluna 2 — Navegação
Título: "Site"
Links (em coluna):
- Serviços
- Sócio Digital
- Portfólio
- Blog
- Sobre o Felipe
- Loja

Coluna 3 — Contato
Título: "Contato"
- WhatsApp: (telefone Felipe — placeholder)
- E-mail: adm@realvisionmaps.com
- Itacaré — Bahia — Brasil

Coluna 4 — Redes
Título: "Onde estamos"
Links com ícones:
- Instagram → @realvisionmaps
- YouTube → /@RealVisionMaps
- LinkedIn → /in/felipe-garcia-pereira-918565331

ABAIXO DAS COLUNAS (faixa central):
- CTA secundário grande: "Fale com a gente" → WhatsApp
- Logo em ícone à esquerda

LINHA FINAL (mais sutil, centralizada, fonte pequena):
"© 2026 Real Vision 360 · Construído com presença digital
integrada · Itacaré → Mundo"

ESTILO:
- Footer com background levemente diferente (mais escuro ou com
  borda superior em cor de destaque)
- Padding generoso
- Links com hover em cor de destaque
═══════════════════════════════════════════════════════════════
```

---

## Instruções de exportação pro Lovable

Quando todas as seções estiverem prontas no Claude Design, peça
**no chat do Claude Design**:

```
═══════════════════════════════════════════════════════════════
EXPORTAÇÃO PARA LOVABLE
═══════════════════════════════════════════════════════════════

Por favor, exporte tudo como código React + TypeScript + Tailwind
preparado pra colar no Lovable, seguindo estas regras:

1. Estrutura de arquivos:
   - Um componente por seção:
     src/components/home/HeroNew.tsx
     src/components/home/CredibilityBar.tsx
     src/components/home/SocioDigitalSection.tsx
     src/components/home/ServicesGrid.tsx
     src/components/home/PortfolioGrid.tsx
     src/components/home/TestimonialsPlaceholders.tsx
     src/components/home/ProcessSteps.tsx
     src/components/home/AudienceFilter.tsx
     src/components/home/FelipeBlock.tsx
     src/components/home/FAQAccordion.tsx
     src/components/home/ContactForm.tsx
     src/components/home/StoreCallout.tsx
     src/components/home/FooterNew.tsx

2. Página principal:
   - src/pages/Home.tsx (orquestra todas as seções acima)

3. Animações:
   - Framer Motion para fade-in / slide-up
   - Stagger nos cards

4. Tipos TypeScript:
   - Defina interfaces para props quando aplicável
   - Use enums ou union types para variantes

5. Tailwind:
   - Use classes Tailwind padrão
   - Para cor de destaque, use uma variável CSS configurável
     (--accent-primary) que eu possa ajustar depois

6. Acessibilidade:
   - aria-labels nos botões CTA
   - alt em imagens
   - Estrutura semântica (header, main, section, footer)

7. Imagens/ícones:
   - Use lucide-react para ícones
   - Para imagens, deixe placeholders comentados:
     // TODO: substituir por imagem real em /assets/

8. Não inclua:
   - Bibliotecas além das já mencionadas
   - Backend / API calls
   - Lógica de submit do form (só estrutura visual + handlers stub)

Quero o código pronto pra colar dentro do real-vision-core (Lovable).
═══════════════════════════════════════════════════════════════
```

---

## Após exportar — instruções pro Lovable

Quando você (Felipe) tiver o código exportado do Claude Design,
abre o **Lovable** e cola este
prompt:

```
═══════════════════════════════════════════════════════════════
INSTRUÇÕES PARA O LOVABLE — INTEGRAR NOVA HOME
═══════════════════════════════════════════════════════════════

Vou colar a seguir o código de uma home completamente nova,
gerada no Claude Design. Por favor:

1. Crie os componentes em src/components/home/ conforme o código
   abaixo.

2. Substitua o conteúdo de src/pages/Home.tsx (ou Index.tsx) pela
   nova orquestração.

3. Mantenha a estrutura de rotas e o layout global (App.tsx,
   providers, etc).

4. Ajuste apenas o necessário pra integrar — não refaça nada que
   já funciona.

5. Após colar, faça o deploy de teste e me confirme se tudo
   renderizou.

CÓDIGO:
[colar aqui o output completo do Claude Design]
═══════════════════════════════════════════════════════════════
```

---

## Checklist final antes de iniciar o Claude Design

- [ ] Confirmar paleta exata (cor de destaque) — opção: manter a
      atual do site ou definir nova (verde-água #00D9A3 sugerido)
- [ ] Confirmar tipografia (Inter / Manrope / outra)
- [ ] Felipe escolher uma das 3 opções de logo (se for atualizar)
- [ ] Confirmar telefone Felipe pro footer
- [ ] Confirmar URL do tour 360° do hero (Universo Paralello)

---

## Próximos passos pós-deploy

1. Deploy de teste no Lovable
2. Felipe revisa e aponta ajustes
3. Iterações no Claude Design (componentes específicos)
4. Aprovação final
5. Pedir depoimentos reais aos clientes (Universo Paralello,
   Vila Mandela, Solarium Aarau, Casa Amarela)
6. Substituir depoimentos placeholder
7. Iniciar Fase i18n (PT/EN/DE) conforme MELHORIAS-SITE.md
8. Iniciar integração Sócio Digital no ecossistema
   (INTEGRACAO-SOCIO-DIGITAL.md)
