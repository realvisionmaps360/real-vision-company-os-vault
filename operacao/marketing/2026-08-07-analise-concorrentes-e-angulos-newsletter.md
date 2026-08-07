# Análise de Concorrentes + Ângulos de Newsletter

> **Data:** 07/08/2026
> **Motivo:** Felipe pediu ângulos "mais atuais e relevantes, coisas fodas que a gente faz",
> menos abrangentes — e uma análise de concorrentes pra ligar o discurso deles com o nosso.
> **Status:** pesquisa. Nenhum email escrito ou disparado.
> Relacionado: [[2026-08-07-automacao-newsletter-3x-semana-PESQUISA]] · [[00-ESTRATEGIA]] · [[icp-real-vision]]

---

## Limite desta pesquisa (ler antes)

O proxy de egress desta sessão **bloqueia o acesso direto aos sites dos concorrentes**. Consegui
buscar, mas não abrir as páginas. Então o que está aqui vem de resultados de busca e trechos
citados, não de leitura integral dos sites. **É suficiente pra mapear discurso, não pra auditar
preço, portfólio ou entrega.** Uma sessão com egress liberado fecharia isso.

---

## 1. O mapa — o mercado está partido em dois campos

Não existe pesquisa de concorrente anterior no vault. Esta é a primeira.

### Campo 1 — As empresas de tour virtual 360

Tour Brasil 360 (**+4.500 projetos**), SpaceTour360, WeVisit, PRO360, Vila 360, VR360, 3603D,
Dado Design 360, Neoproduções, Top Tour Virtual.

**O que vendem:** o tour como produto avulso. Volume.

**O discurso, quase palavra por palavra em todos:**
- *"vendedor 24 horas"* / *"vendedor silencioso"*
- *"diferencial competitivo"*
- *"reduz deslocamento, otimiza visitas presenciais"*
- *"mais visibilidade no Google, principalmente publicado no Google Maps"*
- *"o cliente entra no seu espaço pelo celular e reduz dúvidas"*

**O pressuposto escondido:** todos assumem que **já tem alguém olhando o tour**. Toda a promessa
é sobre *converter quem chegou*. Nenhum deles fala sobre **como a pessoa chega**.

### Campo 2 — As agências de marketing hoteleiro

Tribuzana, Hospedin, HotelB2C, Hotel Academy, Divulggare, Vorbi, RD Station (conteúdo), M45.

**O que vendem:** reserva direta e menos dependência de OTA.

**O discurso e as tendências que eles publicam pra 2026:**
- Fortalecer **reserva direta**, motor próprio integrado ao site e ao PMS
- **Reduzir dependência de Booking/OTA**
- **Automação inteligente**: check-in digital, chatbot híbrido IA + humano
- Automação de ambiente (luz, ar, eficiência energética)
- Mobile e personalização por IA

**E — importante — eles já começaram a falar de busca por IA.** Achei títulos como *"Seu hotel no
ChatGPT e outras ferramentas de IA"* (Hotelier News) e serviços prometendo fazer o hotel aparecer
no ChatGPT, Gemini e Perplexity. A frase que mais se repete:

> *"A jornada que antes começava no Google agora começa com conversas em ferramentas de IA como
> o ChatGPT, onde o hóspede pergunta onde se hospedar, o que fazer e como chegar."*

---

## 2. O buraco — e é exatamente onde a Real Vision está

Os dois campos falam de coisas diferentes e **nenhum dos dois liga os dois lados**:

| | Campo 1 (tour 360) | Campo 2 (marketing hoteleiro) | **Real Vision** |
|---|---|---|---|
| Tour 360 | ✅ é o produto | ❌ não faz | ✅ faz |
| Google Meu Negócio / Maps | menciona de passagem | às vezes | ✅ faz |
| Site próprio estruturado | ❌ | ✅ | ✅ faz |
| Automação / agente de IA | ❌ | ✅ (chatbot) | ✅ faz |
| **Ser encontrado POR IA (GEO)** | ❌ | 🟡 começando a falar | ✅ **é a tese** |
| **Ligar tour+GMB+site como uma coisa só** | ❌ | ❌ | ✅ **ninguém mais faz** |

**A frase que resume o buraco:**

> As empresas de tour vendem um "vendedor 24 horas" que convence **quem já chegou**.
> As agências de marketing brigam por **reserva direta**.
> Ninguém está dizendo que **o tour 360 e o Google Meu Negócio são a estrutura que a IA lê**
> quando alguém pergunta ao ChatGPT onde se hospedar em Barra Grande.

Esse é o território da Real Vision, e é defensável por um motivo simples: pra ocupá-lo você
precisa fazer os dois lados. O Campo 1 não tem site nem automação. O Campo 2 não tem câmera 360
nem publica no Street View.

**Honestidade sobre a vantagem:** GEO na hotelaria **não é território virgem** — o Campo 2 já
começou a falar. A vantagem da RV não é ter chegado primeiro no assunto. É ser a única que
**executa as duas metades**. O discurso tem que ser esse, não "descobrimos o GEO".

---

## 3. O que a Real Vision faz que dá conteúdo bom (inventário real)

Garimpado de `operacao/projetos/` e `operacao/gestao/`. Tudo verificado no vault.

| # | Coisa | Status real | Serve pra qual público |
|---|---|---|---|
| 1 | **Sócio Digital** — Claude Code instalado no computador do cliente, Company OS adaptado, treinamento ao vivo (R$ 2.500–8.000 setup) | Documentado, Fase 0 | Empresário em geral |
| 2 | **Hermes** — agente de IA próprio rodando no VPS da RV, não em nuvem de terceiro | No ar | Nerd / posicionamento |
| 3 | **MCP de pesquisa web self-hospedado** — SearXNG + Firecrawl + Google Maps próprios | No ar | Nerd / posicionamento |
| 4 | **Instagram: comentário → DM automática** (OpenReply self-hospedado no VPS) | Instalado, falta publicar o app | Dono de negócio local |
| 5 | **Relatório mensal automático** — GA4 → HTML → rascunho no Gmail, dia 1º às 9h | Rodando (Solarium + Conectando Saúde) | Cliente com plano mensal |
| 6 | **Playbook Google Ads em conta nova** — descoberto na marra, documentado | Documentado | Empresário |
| 7 | **Auditoria técnica de clientes** — metodologia própria | Documentado | Cliente |
| 8 | **Site próprio: 21 posts em PT/EN/DE com arquitetura GEO** | No ar | Todos |
| 9 | **Esta newsletter** — automação com aprovação por 1 toque | Sendo construída agora | Todos |
| 10 | **Jogo da Terra** — RPG mobile com personagens guiados por IA, baseado em Manly P. Hall | Fase 0, sem código | Público de reflexão |

---

## 4. Os 5 ângulos novos

Construídos em cima do buraco da seção 2 + o inventário da seção 3.
Público: ~20 clientes ativos (pousadas premium BA, restaurantes, negócios locais).

### A. "Perguntei pro ChatGPT onde se hospedar em Barra Grande"

**A ideia:** rodar a pergunta de verdade — *"onde me hospedar em Barra Grande?"*, *"melhor pousada
em Itacaré"*, *"pousada com tour virtual na Península de Maraú"* — e contar o que a IA respondeu.
Sem retoque. Se um cliente aparecer, ótimo. Se nenhum aparecer, **melhor ainda** — é o email.

**Por que é o mais forte:** é local, é atual, é verificável, e o leitor consegue **reproduzir em 30
segundos** no celular dele. Nenhuma agência de tour 360 fez esse teste, porque o produto delas nem
entra nessa conta.

**Prova de Campo:** ⚠️ **precisa ser executada.** Não consegui rodar aqui — o egress desta sessão
bloqueia. Você faz em 2 minutos, ou eu faço numa sessão com acesso liberado.

**Destino:** `/blog/site-maior-ativo-era-ia`

---

### B. "Te venderam um vendedor 24 horas. Mas o comprador mudou de porta."

**A ideia:** pegar o clichê literal do mercado — *"vendedor 24 horas"*, que **todas** as empresas de
tour 360 usam — e virar do avesso. O tour convence quem já chegou na sua página. A pergunta que
ninguém faz: **como a pessoa chega?** Hoje ela cada vez mais pergunta pra uma IA, e a IA não
*olha* o tour — ela lê a estrutura em volta dele.

**Por que é forte:** ataca um discurso que o cliente **já ouviu de outro fornecedor**. Reposiciona
o tour de "produto bonito" pra "peça de um sistema" — sem desmerecer o tour, que a RV também vende.

**Prova de Campo:** ✅ **confirmada** — a pesquisa de concorrentes desta sessão. As frases estão
documentadas na seção 1.

**Destino:** `/blog/do-maps-ao-fechamento-tour-virtual-google-site`

---

### C. "Dia 1º, 9h da manhã, o relatório do seu site já está pronto. Ninguém clicou em nada."

**A ideia:** mostrar a automação de relatório mensal funcionando — GA4 puxa os dados, monta o HTML
com a identidade da RV, salva na pasta do cliente e deixa o rascunho no Gmail. Todo dia 1º.

**Por que é forte:** o Campo 2 inteiro está publicando "automação inteligente é tendência pra 2026".
A RV **já opera isso desde julho**. É a diferença entre escrever sobre a tendência e estar dentro
dela. E pra quem tem plano mensal, é valor que ele paga e talvez não saiba que existe.

**Prova de Campo:** ✅ **confirmada** — rodando pro Solarium Aarau e Conectando Saúde.
⚠️ Mas o Solarium está fora por decisão do Felipe (07/08). Escrever **sem nomear cliente** —
"dois clientes com plano mensal" resolve.

**Destino:** `/blog/fim-das-tarefas-repetitivas-socio-digital-real-vision`

---

### D. "Comentou no post, recebeu no direct. Sem ninguém digitando."

**A ideia:** a automação de Instagram — comentário com palavra-chave dispara DM automática, 24h por
dia, rodando em servidor próprio.

**Por que é forte:** é a dor mais concreta de dono de pousada — perder mensagem no Instagram. E o
Campo 2 vende "chatbot híbrido" como tendência 2026; isso é a versão que já está instalada.

**Prova de Campo:** 🟡 **parcial** — o OpenReply está instalado e validado no VPS (HTTPS, webhook,
OAuth), mas o app ainda não foi publicado na Meta, travado por falta da página de Política de
Privacidade no site. **Escrever isso como "está no ar" seria mentira.** Ou o email conta como
bastidor honesto ("montando isso essa semana, esbarrei nisso"), ou espera destravar.

**Destino:** `/blog/fim-das-tarefas-repetitivas-socio-digital-real-vision`

---

### E. "Eu rodo meu próprio buscador. Vou explicar por quê."

**A ideia:** a RV opera SearXNG + Firecrawl próprios no VPS, e o Hermes roda em servidor próprio em
vez de nuvem de terceiro. Ligar com a tese do post sobre o hack da OpenAI/Hugging Face: quem
controla seus dados.

**Por que é forte:** opinião com risco, dá pra discordar, gera resposta — e resposta melhora
entregabilidade no Gmail. Diferencia de qualquer concorrente dos dois campos, que revendem
ferramenta de terceiro.

**Prova de Campo:** ✅ **confirmada** — infra própria documentada em
`operacao/gestao/infraestrutura/mcp-pesquisa-web/`.

**Ressalva:** é o mais distante da dor de dono de pousada. Melhor como 4º ou 5º email, não como
abertura da cadência.

---

## 5. Recomendação de ordem

| Posição | Ângulo | Por quê |
|---|---|---|
| 1º | **B** — "vendedor 24 horas" | Prova de campo pronta hoje, ataca discurso que o cliente já ouviu, e não depende de nada |
| 2º | **A** — ChatGPT em Barra Grande | O mais forte de todos, mas exige rodar o teste antes |
| 3º | **C** — relatório automático | Valor concreto pra quem já paga mensal |
| 4º | **D** — Instagram | Só depois de destravar, ou como bastidor honesto |
| 5º | **E** — buscador próprio | Posicionamento, público mais nerd |

**B é o único que dá pra escrever hoje sem depender de nada.** Por isso ele abre.

---

## 6. Pendências

- [ ] Rodar o teste do ChatGPT (ângulo A) — precisa de sessão com egress liberado ou o Felipe faz
- [ ] Confirmar se pode citar Solarium Aarau nos próximos (bloqueado em 07/08)
- [ ] Destravar Política de Privacidade no site pra liberar o app do Instagram (ângulo D)
- [ ] Refazer a análise de concorrentes com egress liberado — auditar preço e portfólio, não só discurso

---

> Pesquisa. Nada disparado, nada alterado em produção.
