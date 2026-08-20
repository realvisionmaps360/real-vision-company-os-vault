---
tipo: apoio
nome: Pesquisa — Tráfego Pago (Google Ads via Perfil da Empresa)
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-18
atualizado_em: 2026-08-18
pertence_a: ["[[02-Projetos/vila-dos-corais/PROJETO]]"]
confiabilidade: alta
tags: [lbos/apoio, lbos/pesquisa]
---

# Pesquisa — Tráfego Pago (Google Ads via Perfil da Empresa)

**Só pesquisa e registro. Nada foi executado, nenhum acesso foi pedido, nenhuma campanha foi tocada.** Continuar na sessão "corais 2".

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

## Fontes

- [Google Ads API Won't Allow You To Create Smart Campaigns After August 3 — Search Engine Roundtable](https://www.seroundtable.com/google-ads-api-smart-campaigns-disallow-41567.html)
- [Vincular o Perfil da empresa a uma campanha inteligente — Ajuda do Google Ads](https://support.google.com/google-ads/answer/9847136?hl=pt-BR)
- [Ajustar o orçamento da sua campanha (app Google Ads) — Ajuda do Google Ads](https://support.google.com/google-ads/answer/4597819?hl=pt-BR)
- [Anunciar sua empresa no Google — Ajuda do Perfil da empresa no Google](https://support.google.com/business/answer/7025532?hl=pt-BR)
- Skill interna: `rv-trafego-pago` (`skills/rv-trafego-pago/SKILL.md`) — briefing obrigatório, checklist de pré-lançamento e estrutura de conta MCC já usados pela Real Vision.

## Relacionados
- Pertence a: [[02-Projetos/vila-dos-corais/PROJETO]]
- Ver também: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/FICHA-CLIENTE.md` → seção "Visão de futuro"
