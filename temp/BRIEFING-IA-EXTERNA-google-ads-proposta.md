# Briefing para IA externa — PRD de proposta de Google Ads (Real Vision 360)

> Este documento existe pra o Felipe colar numa IA externa (ChatGPT ou outra) junto com os
> arquivos desta mesma pasta. O objetivo da conversa lá fora é amadurecer um **PRD (documento de
> requisitos)** de uma oferta/proposta de Google Ads pra cliente. Quando o PRD estiver pronto, o
> Felipe traz o **texto** de volta pro Claude Code, que usa isso pra montar a proposta comercial
> de verdade dentro do Company OS (vault). Esta pasta `temp/` é descartável — não é fonte de
> verdade, é só o material de apoio pra essa conversa externa.

---

## 1. Como ler os arquivos anexados

Os `.md` desta pasta vêm de um Obsidian Vault (o "Company OS" da Real Vision). Duas coisas vão
aparecer que merecem explicação pra não confundir a IA externa:

- **Frontmatter YAML** (bloco `---` no topo de alguns arquivos, com campos como `id`, `status`,
  `criado_em`): é metadado interno de organização do vault. Trate como contexto, não como algo
  que precisa ser preenchido ou replicado no PRD.
- **Wikilinks** `[[nome-do-arquivo]]`: é a sintaxe do Obsidian pra linkar outro nó do vault. Não
  são URLs clicáveis nem existem fora do vault — se um arquivo referenciar `[[algo]]` que não
  está nesta pasta, trate como "existe mais contexto sobre isso no sistema de origem, mas não foi
  trazido pra esta conversa". Nunca invente o conteúdo do que está atrás de um wikilink que não
  foi anexado.

---

## 2. O que está nesta pasta

### `google-ads/` — como a Real Vision estrutura e opera campanhas de Google Ads

| Arquivo | O que é |
|---|---|
| `passo_a_passo_campanha_simplificada_google_ads.md` | Passo a passo simplificado de como montar uma campanha |
| `GOOGLE-ADS-MCP-INTEGRACAO.md` | Detalhe técnico de como a conta Google Ads foi conectada via MCP (uso interno Claude Code — contexto técnico, não é algo pra propor a cliente) |
| `CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md` | Briefing real de uma campanha própria da Real Vision (referência de como um briefing de campanha é levantado) |
| `TIMELINE-campanha-slm-llm.md` | Timeline de execução dessa mesma campanha — decisões, erros e correções ao longo do tempo |
| `PLAYBOOK-GOOGLE-ADS-CONTA-NOVA.md` | Passo a passo de como lidar com uma conta de Google Ads 100% nova (assistente guiado do Google, armadilhas de publicar campanha ativa sem querer) |

### `juridico-comercial/` — contratos, termos e copy comercial da Real Vision

| Arquivo | O que é |
|---|---|
| `README.md` | Índice da pasta comercial do vault |
| `CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md` | Template mestre de contrato de prestação de serviços (PT) |
| `SERVICE-AGREEMENT-TEMPLATE-v1.0-EN.md` | Mesmo template, em inglês |
| `TERMOS-E-CONDICOES-GERAIS-v1.1-PT.md` | Termos e condições gerais (PT) |
| `GENERAL-TERMS-CONDITIONS-v1.1-EN.md` | Termos e condições gerais (EN) |
| `SOCIO_DIGITAL_COPY_NOVA.md` | Copy de venda do produto "Sócio Digital" — referência de tom e posicionamento comercial |

**Não existe hoje um template de proposta comercial genérico e em branco no vault** — as propostas
existentes (Hallan/Letice, Ari Ilhabela, Wood Art, Solarium) são todas específicas de cliente e
não foram trazidas pra esta pasta porque este PRD ainda não tem cliente definido. Se o Felipe
quiser um exemplo real de estrutura de proposta como referência de formato, ele pede pro Claude
Code separadamente.

---

## 3. Skill `rv-trafego-pago` consolidada — regras de Google Ads da Real Vision

Isto **não é uma cópia do arquivo da skill** — é um resumo escrito por extenso dos parâmetros e
regras que valem pra qualquer campanha de Google Ads da Real Vision, pra a IA externa ter o
mesmo contexto operacional que o Claude Code tem quando monta uma campanha internamente.

### Escopo
Arquitetura de campanhas de **tráfego pago (Google Ads Search)** de forma documentada,
replicável e segura. Não cobre SEO orgânico nem GA4 básico (isso é de outra skill). **Regra
inegociável:** nunca cria conta, ativa campanha, define orçamento real ou mexe com pagamento
sozinha — toda decisão de gasto passa por aprovação explícita do Felipe, sempre, mesmo que algo
parecido já tenha sido aprovado antes.

### Pré-requisito inegociável: tracking de conversão validado ANTES de qualquer campanha
1. GA4 instalado no site (tag `gtag.js` ou GTM).
2. Evento de conversão definido — o que conta como conversão pra aquela campanha (clique no
   WhatsApp, formulário, leitura completa de conteúdo, etc.) — nunca assumir, sempre perguntar
   qual é o objetivo de negócio.
3. GA4 vinculado à conta do Google Ads (sem isso, conversão do site não aparece no Ads).
4. Conversão marcada como "Principal" no Google Ads (senão o algoritmo de lances não otimiza pro
   resultado certo).

Se qualquer um desses 4 pontos falhar, o próximo passo é corrigir o tracking — nunca lançar a
campanha mesmo assim "pra já começar".

### Estrutura de conta
```
MCC (conta administradora)
 └─ Conta de anúncio (uma por anunciante: a própria Real Vision, ou uma por cliente)
     └─ Campanha (uma por objetivo de negócio — nunca misturar objetivos diferentes)
         └─ Grupo de anúncios (um por tema/intenção de busca)
             └─ Palavras-chave + Anúncios responsivos de pesquisa (RSA)
```
Regra de organização: campanha nova por cliente ou por objetivo próprio, nunca empilhar
objetivos diferentes na mesma campanha (quebra otimização de lance e leitura de relatório).

### Briefing obrigatório antes de desenhar qualquer campanha (nunca inventar nenhuma resposta)
| Campo | Pergunta |
|---|---|
| Objetivo | O que a campanha precisa gerar (lead, contato WhatsApp, leitura de conteúdo, venda direta)? |
| Página de destino | Qual URL exata recebe o clique? |
| Público-alvo | Localização, idioma, perfil de quem deve ver o anúncio |
| Orçamento diário | Nunca definir sozinho — é o teto que o cliente/Felipe topa testar |
| Duração do teste | Padrão sugerido 14 dias, mas sempre confirmar |
| Palavras-chave semente | 5-10 termos que se acredita que o público busca — validar/expandir com dados, nunca substituir por achismo |

### Estrutura de um grupo de anúncios (Search)
- Palavras-chave: mix de frase (`"termo"`) e exata (`[termo]`); evitar ampla sem negativação no
  início.
- Palavras-chave negativas: revisar sempre termos que geram clique irrelevante (ex: "grátis",
  "curso", "como fazer" quando o objetivo é venda de serviço).
- Anúncios responsivos de pesquisa: mínimo 3 títulos e 2 descrições únicas por grupo — nunca
  reciclar texto genérico entre grupos diferentes.
- Extensões: sitelink, chamada (WhatsApp/telefone) e snippet estruturado sempre que aplicável.

### Checklist de pré-lançamento (obrigatório antes de pedir aprovação de gasto)
- [ ] Tracking de conversão validado
- [ ] Página de destino carrega rápido e sem erro
- [ ] Orçamento diário confirmado explicitamente
- [ ] Palavras-chave negativas básicas aplicadas
- [ ] Pelo menos 3 títulos e 2 descrições por grupo de anúncios
- [ ] Extensões de anúncio configuradas
- [ ] Campanha criada **pausada** — nunca ativa por padrão
- [ ] Briefing documentado

Só depois do checklist completo é que se pergunta sobre orçamento e ativação — nunca como parte
de outra tarefa.

### Armadilhas operacionais já mapeadas (relevantes pra dimensionar prazo/risco numa proposta)
- **Conta 100% nova:** o Google força um assistente guiado que publica a campanha **ativa direto**,
  sem opção de pausa, e empurra pra Performance Max se qualquer meta pré-pronta for escolhida.
  Isso muda o momento em que o orçamento precisa ser aprovado (no início do processo, não no fim).
- **MCC vs. conta filha:** campanha nunca é criada na conta administradora (MCC), só na conta
  filha. Confundir as duas é causa comum de "sumiço" de dado que na real é só estar olhando a
  conta errada.
- **Vínculo GA4 ↔ Google Ads entre contas Google diferentes:** se e-mail do GA4 e da conta Ads são
  diferentes, o vínculo só funciona pedindo pelo lado do GA4 (não pelo lado do Ads).
- **Botão "Anunciar" do Perfil da Empresa não funciona pra conta gerenciada por MCC** — sempre
  termina em erro pra praticamente todo cliente da Real Vision. Caminho certo é sempre entrar
  direto em ads.google.com e criar pelo fluxo clássico.
- **Conversão de "clique solto"** (quando o objetivo é social/comunidade, não comercial direto)
  não é um ativo controlável — vale considerar uma squeeze page de captura antes do link final.

---

## 4. Regras de honestidade que valem também nesta conversa externa

- **Zero invenção de dado.** Preço, prazo, nome de cliente, número de campanha — se não estiver
  nos arquivos anexados ou o Felipe não disser agora, marcar como "a definir", nunca inventar.
- **Marcar proveniência.** No PRD final, deixar claro o que é fato confirmado (veio dos arquivos
  ou do Felipe), o que é pesquisa feita nesta conversa, e o que é hipótese ainda não validada.
- **Não decidir preço/orçamento de campanha.** Isso sempre passa por aprovação explícita do
  Felipe — o PRD pode propor uma faixa, nunca fechar um número como definitivo.

---

## 5. O que trazer de volta pro Claude Code

Só o **texto do PRD** (não precisa ser um arquivo formatado) — o Claude Code usa isso, mais o
Company OS, pra montar a proposta comercial de verdade dentro do vault. Não é necessário que a
IA externa gere contrato, termos ou proposta finalizada — os templates anexados aqui são só
referência de tom e estrutura, a peça final é responsabilidade do Claude Code.
