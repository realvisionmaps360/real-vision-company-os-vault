---
tipo: apoio
nome: Pesquisa — Tráfego Pago (Google Ads via Perfil da Empresa)
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-18
atualizado_em: 2026-08-20
pertence_a: ["[[02-Projetos/vila-dos-corais/PROJETO]]"]
confiabilidade: alta
tags: [lbos/apoio, lbos/pesquisa]
---

# Pesquisa — Tráfego Pago (Google Ads via Perfil da Empresa)

**Só pesquisa, diagnóstico e treino. Nada foi executado na conta da cliente, nenhum acesso à conta dela foi pedido, nenhuma campanha dela foi tocada.** Sessão "corais 2" (20/08/2026) avançou o diagnóstico técnico e a pesquisa de mercado, mas a decisão de negócio (pegar o serviço formalmente e por quanto) ficou pra próxima sessão — ver seção 6.

## 1. O que aconteceu (fato, 18/08/2026)

Felipe avisou a cliente que o Perfil da Empresa no Google estava pronto. Ela respondeu que colocou **R$ 200,00 dentro do próprio Perfil da Empresa, na aba de anúncios**, e perguntou se funciona e qual o próximo passo. Ela já queria fazer tráfego pago desde o início do projeto — isso não é pedido novo, é retomada de algo que ela já tinha manifestado interesse.

Felipe vê isso como o momento natural de a Real Vision deixar de ser só "quem fez o site" e passar a ser também **gestora de tráfego** pra essa cliente — mas não sabe como esse produto específico (anúncio de dentro do Perfil da Empresa) funciona por dentro, e pediu pesquisa antes de decidir qualquer coisa.

## 2. O que é, tecnicamente

O que aparece como "aba de anúncios" dentro do Perfil da Empresa é a **Campanha Inteligente** (Smart Campaign / antigo Google Ads Express) — um produto simplificado do Google Ads, pensado pra pequeno negócio local ativar sozinho, sem precisar entender a interface completa do Google Ads.

- Ao criar a campanha, o Google **cria (ou usa) uma conta de Google Ads própria**, vinculada ao mesmo e-mail que é dono/gestor do Perfil da Empresa. A campanha não existe "dentro" do Perfil da Empresa — ela vive numa conta de Google Ads de verdade, só que a ativação inicial acontece pela tela simplificada do Perfil.
- **O vínculo entre Perfil da Empresa e Campanha Inteligente só pode ser feito na criação.** Não dá pra pegar uma campanha já existente e linkar depois — isso é regra do próprio Google.
- O orçamento (os R$200 que ela colocou) é um orçamento diário ou mensal que ela mesma define e pode alterar a qualquer momento — não é um pagamento único, é recorrente até ela mudar ou pausar.
- O Google usa IA pra otimizar lance, posicionamento e formato do anúncio a partir de: localização da empresa, orçamento e "temas" de anúncio (ela não escolhe palavra-chave manualmente, como no Google Ads tradicional).

## 3. Fato crítico pra decisão: Google está descontinuando esse produto

Segundo reportagem do Search Engine Roundtable (checar fonte oficial do Google antes de qualquer decisão comercial — essa foi via imprensa especializada, não documentação primária): **a partir de 3 de agosto de 2026, a API do Google Ads parou de permitir criar Campanhas Inteligentes novas.** Campanhas já existentes continuam podendo ser editadas via API. O Google está empurrando quem cria campanha nova pra **Performance Max** no lugar.

**O que isso muda pra decisão do Felipe:**
- A campanha da cliente **já existe** — pode ser gerenciada/otimizada normalmente, inclusive por API (então as ferramentas que a Real Vision já tem — `mcp__google-ads-mcp__*`, hoje só leitura — conseguem enxergar essa conta se a Real Vision ganhar acesso a ela).
- Mas se a estratégia da Real Vision for "oferecer isso pra outros clientes no futuro" como produto replicável, esse caminho específico (Campanha Inteligente via Perfil da Empresa) está sendo fechado pelo próprio Google — o caminho recomendado pelo Google pra campanha nova é Performance Max, que é bem mais complexo que a Campanha Inteligente (exige feed de produtos/serviços, criativos, orçamento maior pra funcionar bem — não é "ativar e pronto" como a Campanha Inteligente).
- Isso não impede nada pra ESSA cliente agora — só é um dado importante pra pensar se vale a pena construir um serviço em cima de um produto que o Google está encerrando.

## 4. Como a Real Vision assumiria a gestão dessa campanha (caminho técnico, não executado)

1. A cliente precisaria dar acesso da conta de Google Ads dela (a que nasceu junto com a Campanha Inteligente) pra conta MCC da Real Vision (`359-167-3566` — mesma estrutura já usada pela skill `rv-trafego-pago`), do mesmo jeito que se faz com qualquer conta de anúncio de cliente.
2. Depois do acesso, dá pra ver via `mcp__google-ads-mcp__*` (read-only) o que ela configurou: orçamento, tema dos anúncios, desempenho até agora.
3. Falta confirmar (pré-requisito da skill `rv-trafego-pago`, nunca pular): o GA4 do site está instalado (**sim**, `G-8P07EHPVYR`, confirmado 14/08/2026) — mas o vínculo GA4 ↔ Google Ads dessa conta específica da cliente **ainda não existe e não foi verificado**, e nenhum evento de conversão foi definido pra essa campanha (ex: clique no WhatsApp da calculadora de reservas — ver o case do site).
4. A decisão de "seguir com Campanha Inteligente" vs. "migrar pra Performance Max/Search dentro da estrutura normal da Real Vision" ainda não foi tomada — depende do Felipe entender o trade-off (Campanha Inteligente = simples, mas Google está descontinuando; Performance Max/Search = mais controle e alinhado com o resto da operação da Real Vision, mas dá mais trabalho de setup).

## 5. Perguntas em aberto pro Felipe decidir na sessão "corais 2"

- Quer pedir acesso de gestor à conta de Google Ads da cliente, só pra diagnosticar o que ela já configurou (sem mexer em nada)?
- Isso vira um serviço novo formal (gestão de tráfego pago), com um preço/mensalidade à parte do que já foi contratado? Ou é um "favor" pontual pra ajudar a entender o R$200 que ela já gastou?
- Mantém a Campanha Inteligente dela como está, ou propõe migrar pra uma campanha Search normal dentro da estrutura que a Real Vision já usa (MCC `359-167-3566`)?
- Isso é candidato a virar oferta padrão da Real Vision pra outros clientes (ligado à visão de crescer pro condomínio inteiro, ver `FICHA-CLIENTE.md` → "Visão de futuro"), ou fica só pra essa cliente?

## 6. Atualização — sessão "corais 2" (20/08/2026)

### 6.1 Fato novo: Flávia delegou pra Evelin
Felipe avisou que a Flávia delegou o assunto tráfego pago pra uma pessoa da equipe dela, **Evelin**, que vai receber uma "aula" sobre o tema. Reunião marcada pra **21/08/2026**, onde Felipe também decide, junto com o que foi levantado aqui: (1) se a Real Vision pega esse trabalho como serviço formal, e (2) quanto cobrar. Nenhuma das duas coisas foi decidida ainda — fica pra essa reunião/próxima sessão.

### 6.2 Diagnóstico técnico do erro no botão "Anunciar" — confirmado ao vivo
Felipe tentou repetidamente abrir a Campanha Inteligente pelo botão "Anunciar" do Perfil da Empresa (testando com e-mails diferentes) e sempre batia num erro 404 em `ads.google.com/aw/campaigns/new/express`. Pra treinar antes de ensinar a Evelin, reproduzimos o fluxo ao vivo (via Claude in Chrome, no navegador real do Felipe) — **usando a própria conta "Real Vision 360" como sandbox, não a da cliente**.

Causa raiz confirmada: a tela de contas que o "Anunciar" oferece só mostra contas de primeiro nível — no caso da Real Vision, a conta `156-292-4356` (cancelada, cobrança pendente) e a MCC `359-167-3566` ("Administrador"). Uma MCC nunca hospeda campanha — só suas contas filhas hospedam. A conta filha real (`414-120-1211`, ativa) só aparece se você entrar direto em `ads.google.com`, entrar na MCC, e usar o seletor de conta **interno** do Google Ads pra trocar pra ela — coisa que o atalho "Anunciar" nunca oferece como opção. Testamos o fluxo clássico ("Nova campanha" de dentro da conta `414-120-1211`) e funcionou sem erro, chegando normalmente na tela "Qual é o objetivo da sua campanha?".

**Conclusão prática:** o botão "Anunciar" do Perfil da Empresa é estruturalmente incompatível com contas organizadas em MCC (o modelo que a Real Vision usa pra todos os clientes, incluindo a Vila dos Corais se um dia a campanha dela for gerenciada por aqui). Isso é uma limitação de estrutura de conta, não um bug pontual — ver nota também adicionada na skill `rv-trafego-pago`.

### 6.3 Pesquisa de mercado — estado do produto hoje (20/08/2026)
Case study completo rodado nessa sessão sobre o que há de mais recente sobre Campanha Inteligente / Smart Campaign:

- **03/08/2026** — confirmado por múltiplas fontes independentes (Search Engine Land, Search Engine Roundtable, Digital Phablet, Relevant Audience, e o próprio blog de desenvolvedores do Google Ads de jun/2026): a **API** do Google Ads parou de permitir **criar** Campanha Inteligente nova. Campanhas já existentes continuam rodando e podem ser editadas.
- Google recomenda migrar pra **Performance Max** como alternativa principal (Pesquisa e Demand Gen como secundárias).
- **Ponto não confirmado publicamente:** nenhuma fonte (nem oficial, nem imprensa especializada) confirma se essa descontinuação também derruba o fluxo da **interface web** — o caminho do botão "Anunciar" especificamente. A causa do erro de vocês foi comprovadamente estrutural (seção 6.2), não necessariamente essa descontinuação.
- **Sinal de que o problema é mais amplo que a Real Vision:** encontramos reclamações de outros usuários em fóruns oficiais do Google, em 2026, com o mesmo tipo de erro tentando anunciar pelo Perfil da Empresa (threads em PT-BR e ES). O próprio Google mantém uma página inteira só de "Problemas comuns ao vincular o Google Ads ao Perfil da Empresa" — sinal de que esse encaixe é historicamente instável.

### 6.4 Veredito
O "Anunciar" do Perfil da Empresa é hoje um produto em fim de vida, mal encaixado em estrutura de MCC, sem suporte confiável documentado — não vale a pena ensinar a Evelin a depender dele. Caminho recomendado, já validado ao vivo: entrar direto em `ads.google.com`, escolher a conta filha certa, e criar campanha de Pesquisa pelo fluxo clássico — igual ao que a Real Vision já faz pros outros clientes (skill `rv-trafego-pago`).

### 6.5 Pendente pra próxima sessão
- Decisão de negócio: pegar a gestão de tráfego pago da Vila dos Corais como serviço formal (preço/mensalidade à parte) ou não.
- Se sim, quanto cobrar.
- Montar a pauta real da reunião com a Evelin a partir do que está registrado aqui.
- As 4 perguntas em aberto da seção 5 continuam todas sem resposta.

## Fontes

- [Google Ads API Won't Allow You To Create Smart Campaigns After August 3 — Search Engine Roundtable](https://www.seroundtable.com/google-ads-api-smart-campaigns-disallow-41567.html)
- [Google Ads API to stop supporting new Smart Campaign creation — Search Engine Land](https://searchengineland.com/google-ads-api-to-stop-supporting-new-smart-campaign-creation-480999)
- [Google Ads Developer Blog — Changes to Support for Smart Campaigns in the Google Ads API (jun/2026)](https://ads-developers.googleblog.com/2026/06/changes-to-support-for-smart-campaigns.html)
- [Google Ads deprecations: 2026 to 2027 timeline — Relevant Audience](https://www.relevantaudience.com/google-ads-en/google-ads-deprecations-2026-2027-timeline/)
- [Smart Campaigns overview — Google Ads API Docs](https://developers.google.com/google-ads/api/docs/smart-campaigns/overview)
- [Problemas comuns ao vincular o Google Ads ao Perfil da Empresa — Ajuda do Google Ads](https://support.google.com/google-ads/answer/14232717?hl=pt-BR)
- [Vincular o Perfil da empresa a uma campanha inteligente — Ajuda do Google Ads](https://support.google.com/google-ads/answer/9847136?hl=pt-BR)
- [Ajustar o orçamento da sua campanha (app Google Ads) — Ajuda do Google Ads](https://support.google.com/google-ads/answer/4597819?hl=pt-BR)
- [Anunciar sua empresa no Google — Ajuda do Perfil da empresa no Google](https://support.google.com/business/answer/7025532?hl=pt-BR)
- Skill interna: `rv-trafego-pago` (`skills/rv-trafego-pago/SKILL.md`) — briefing obrigatório, checklist de pré-lançamento, estrutura de conta MCC e (novo, 20/08/2026) a nota sobre o "Anunciar" não alcançar conta filha.

## Relacionados
- Pertence a: [[02-Projetos/vila-dos-corais/PROJETO]]
- Ver também: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/FICHA-CLIENTE.md` → seção "Visão de futuro"
