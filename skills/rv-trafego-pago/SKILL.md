---
name: rv-trafego-pago
description: Arquitetura de campanhas de tráfego pago (Google Ads) da Real Vision — estrutura de campanha/grupo de anúncios/keywords, tracking de conversão e checklist de pré-lançamento. Use SEMPRE que Felipe falar em criar campanha de Google Ads, tráfego pago, Search Ads, orçamento de anúncio, ou pedir para planejar/lançar uma campanha (própria ou de cliente). NÃO executa lances nem gasta orçamento sozinha — toda decisão de ativar/pausar/gastar passa por aprovação explícita do Felipe.
---

# RV Tráfego Pago — Arquiteto de Campanhas Google Ads

## Escopo desta skill

Arquitetar campanhas de **tráfego pago** (hoje: Google Ads Search) de forma documentada, replicável e segura. Cobre: estrutura da conta, tracking de conversão, briefing de campanha, e checklist de pré-lançamento.

**Não cobre** SEO orgânico, schema markup ou GA4 básico — isso é escopo da skill [`marketing-seo`](../05-marketing-seo/SKILL.md), que esta skill assume como pré-requisito e complementa.

**Regra inegociável:** esta skill nunca cria conta de anúncio, ativa campanha, define orçamento real ou fornece dados de pagamento sozinha. Toda ação que envolva gasto de dinheiro é apresentada como proposta e aguarda aprovação explícita na conversa — mesmo que Felipe já tenha aprovado algo parecido antes.

---

## Pré-requisito: tracking correto ANTES de qualquer campanha

Nunca proponha ativar uma campanha se o tracking de conversão não estiver validado. Ordem de verificação:

1. **GA4 instalado** — confirmar tag `gtag.js` ou GTM no `<head>` do site (ver `marketing-seo` seção 2).
2. **Eventos de conversão definidos** — o que conta como conversão para essa campanha? (ex: clique no WhatsApp, envio de formulário, leitura completa de um blog post, tempo mínimo na página). Não assumir — perguntar ao Felipe qual é o objetivo de negócio da campanha antes de definir o evento.
3. **Vínculo GA4 ↔ Google Ads** — verificar via `mcp__google-analytics__list_google_ads_links` se a propriedade GA4 do site já está linkada à conta de anúncio. Sem esse vínculo, conversões do site não aparecem no Google Ads.
4. **Conversão marcada como "Principal" no Google Ads** — sem isso, o algoritmo de lances não otimiza para o resultado certo.

Se qualquer um desses 4 pontos falhar, o próximo passo é corrigir o tracking — não lançar a campanha mesmo assim "pra já começar".

---

## Estrutura de conta Google Ads da Real Vision

```
MCC 359-167-3566 (Felipe Garcia Real Vision conta google ads claude)
 └─ Conta de anúncio "Real Vision 360 - Ads" (uma por anunciante: RV própria, ou por cliente)
     └─ Campanha (uma por objetivo de negócio, nunca misturar objetivos diferentes)
         └─ Grupo de anúncios (um por tema/intenção de busca)
             └─ Palavras-chave + Anúncios responsivos de pesquisa
```

**Regra de organização:** uma campanha nova por cliente ou por objetivo próprio da RV (ex: "RV - Blog LLM vs SLM", "RV - Institucional Sites", "Cliente X - Leads"). Nunca empilhar objetivos diferentes na mesma campanha — quebra a otimização de lances e a leitura de relatório.

---

## Briefing obrigatório antes de montar qualquer campanha

Colete estas respostas do Felipe antes de desenhar a estrutura (não inventar nenhuma):

| Campo | Pergunta |
|---|---|
| Objetivo | O que essa campanha precisa gerar? (lead, contato WhatsApp, leitura de conteúdo, venda direta) |
| Página de destino | Qual URL exata recebe o clique? |
| Público-alvo | Localização, idioma, perfil de quem deve ver o anúncio |
| Orçamento diário proposto | Nunca definir sozinho — perguntar o teto que Felipe está disposto a testar |
| Duração do teste | Quanto tempo antes de reavaliar (padrão sugerido: 14 dias, mas confirmar) |
| Palavras-chave semente | 5-10 termos que o Felipe acredita que o público busca (validar/expandir com dados, nunca substituir por achismo) |

---

## Estrutura de um grupo de anúncios (Search)

- **Palavras-chave**: mix de correspondência de frase (`"termo"`) e exata (`[termo]`); evitar ampla sem controle de negativação no início.
- **Palavras-chave negativas**: sempre revisar termos que geram cliques irrelevantes (ex: "grátis", "curso", "como fazer" quando o objetivo é venda de serviço).
- **Anúncios responsivos de pesquisa (RSA)**: mínimo 3 títulos e 2 descrições únicas por grupo, refletindo a intenção específica daquele grupo — nunca reciclar o mesmo texto genérico em grupos diferentes.
- **Extensões**: sitelink, chamada (WhatsApp/telefone), e snippet estruturado sempre que aplicável.

---

## Checklist de pré-lançamento (obrigatório apresentar antes de pedir aprovação de gasto)

- [ ] Tracking de conversão validado (ver seção acima)
- [ ] Página de destino carrega rápido e sem erro (testar antes)
- [ ] Orçamento diário confirmado explicitamente por Felipe
- [ ] Palavras-chave negativas básicas aplicadas
- [ ] Pelo menos 3 títulos e 2 descrições por grupo de anúncios
- [ ] Extensões de anúncio configuradas
- [ ] Campanha criada como **pausada** — nunca ativa por padrão
- [ ] Resumo do briefing documentado em `operacao/projetos/_RV-Internos/documentacao/` ou na pasta do cliente

Só depois desse checklist completo, perguntar: "Posso ativar a campanha com orçamento de R$ X/dia?" — nunca ativar como parte de outra tarefa.

---

## Ferramentas disponíveis

- `mcp__google-ads-mcp__*` — **estritamente read-only** (consulta contas, campanhas, métricas via GAQL). Não cria nem edita nada — toda criação de campanha/grupo/anúncio é feita manualmente na interface do Google Ads, guiada passo a passo nesta sessão.
- `mcp__google-analytics__*` — consulta de propriedades GA4, vínculos com Google Ads, relatórios de conversão.

Ver [`GOOGLE-ADS-MCP-INTEGRACAO.md`](../../operacao/projetos/_RV-Internos/documentacao/GOOGLE-ADS-MCP-INTEGRACAO.md) para detalhes técnicos de como o MCP foi conectado.

---

## Como usar esta skill

1. Confirmar objetivo de negócio com Felipe (briefing acima)
2. Validar tracking de conversão (pré-requisito, nunca pular)
3. Propor estrutura de campanha/grupos/palavras-chave para revisão
4. Guiar a criação passo a passo na interface do Google Ads (esta skill não cria nada sozinha)
5. Rodar o checklist de pré-lançamento
6. Só então perguntar sobre orçamento e ativação — aguardar aprovação explícita
7. Documentar a campanha criada

---

## Estrutura de conta Google Ads — atenção a contas MCC vs conta filha

A conta administradora (MCC) `359-167-3566` gerencia contas filhas de anúncio de verdade (ex: `414-120-1211`). Campanhas são criadas dentro da conta filha, nunca na MCC — é fácil confundir e achar que "não há dados" é bug quando na verdade é só estar olhando a conta errada. Sempre conferir o número da conta no seletor do topo antes de diagnosticar qualquer coisa.

## Contas 100% novas exigem um assistente linear diferente

Se a conta de anúncio nunca criou nenhuma campanha nem tem forma de pagamento configurada, o Google força um assistente guiado ("Criar sua primeira campanha") sem o atalho clássico "criar campanha sem meta de orientação". Esse assistente tem armadilhas (ex: escolher qualquer meta pré-pronta leva pro tipo Performance Max em vez de Pesquisa) e **publica a campanha como ativa direto, sem opção de ficar pausada** — o que quebra a regra de "criar sempre pausada" desta skill. Playbook completo, passo a passo, com todas as pegadinhas descobertas: [`PLAYBOOK-GOOGLE-ADS-CONTA-NOVA.md`](../../operacao/projetos/_RV-Internos/campanha-google-ads-slm-llm/PLAYBOOK-GOOGLE-ADS-CONTA-NOVA.md).

**Consequência prática para a regra de pausa:** se a conta é nova (sem histórico de campanha), avisar o Felipe *antes* de começar o assistente que a publicação pode sair ativa direto, e pedir a aprovação de orçamento logo no início do processo — não no fim, como o fluxo normal permite.

## Vínculo GA4 ↔ Google Ads entre contas Google diferentes

Se a propriedade GA4 e a conta Google Ads estão em e-mails/contas Google diferentes, o modal de vínculo pelo lado do Ads (Central de dados → Google Analytics → Vincular) só lista propriedades do mesmo e-mail — fica vazio mesmo estando tudo certo. **Caminho que funciona:** pelo lado do GA4 (Admin → Vinculações do Google Ads → Criar vínculo → "Solicitar acesso a outras contas do Google Ads" → Customer ID da conta Ads). A solicitação aparece do lado do Ads em Central de dados → Google Analytics (GA4) → aba "Recebido" → Revisar → aprovar.

## Última campanha criada — referência

`RV - Blog LLM vs SLM - WhatsApp` (12/07/2026), conta `414-120-1211`, ver timeline completa em [`TIMELINE.md`](../../operacao/projetos/_RV-Internos/campanha-google-ads-slm-llm/TIMELINE.md) e briefing original em [`CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md`](../../operacao/projetos/_RV-Internos/documentacao/CAMPANHA-SLM-LLM-WHATSAPP-2026-07.md).
