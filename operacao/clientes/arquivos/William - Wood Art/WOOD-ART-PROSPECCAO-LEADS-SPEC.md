# Wood Art — Prospecção de Leads (Restaurantes) · Spec de Processo

> Documento interno de diagnóstico. Base para a linha de item na proposta comercial.
> Cliente: William (Wood Art). Dossiê: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]] (itens 5 e 6) · App de Placas: [[WOOD-ART-APP-PLACAS-SPEC]] · Website: [[WOOD-ART-SITE-DIAGNOSTICO]] · Chatbot: [[WOOD-ART-CHATBOT-IA-SPEC]]
> Criado: 06/07/2026
> ⚠️ Nenhuma busca real foi executada ainda — este documento descreve o processo para orçar a proposta, não um resultado de campo.
> 🎯 **Objetivo desta fase:** descrever como a Real Vision faria essa prospecção e com quais ferramentas, para o William decidir escopo. Nenhuma execução começa ainda.

---

## 1. O que é

O William pediu para testar prospecção B2B focada em **restaurantes** — um público diferente do B2C que ele atende hoje (cliente final via ML/Shopee/Wix) — para vender **tábuas e placas maiores personalizadas** (item de cardápio, decoração, apresentação de prato).

---

## 2. Duas frentes de aquisição possíveis (independentes entre si)

Existem dois caminhos para captar restaurantes como clientes. Não são excludentes — dá pra fazer um, o outro, ou os dois:

### 2.1 Prospecção ativa (esta frente — detalhada abaixo)
Buscar restaurantes, levantar contato e abordar diretamente oferecendo o produto. Trabalho de pesquisa + contato, sem investimento em mídia.

### 2.2 Tráfego pago (Google Ads)
Já é a **Frente 6** do dossiê ([[WOOD-ART-FRENTES-DE-TRABALHO]]) — o William já havia pedido isso antes. É um canal de aquisição diferente: em vez de a RV buscar e abordar um a um, o restaurante encontra o William por anúncio. Ver detalhes na Frente 6, não duplicados aqui.

**As duas frentes podem rodar em paralelo ou em sequência** — decisão comercial do William, não técnica.

---

## 3. Como funciona a prospecção ativa (processo — nenhuma busca executada ainda)

A Real Vision tem ferramentas próprias para esse tipo de trabalho, já usadas em outras campanhas (ver skill `rv-prospeccao`, usada na campanha de Paraty/jun-2026 com pousadas):

| Ferramenta | Para quê serve | Encaixe neste caso |
|---|---|---|
| **Apollo** (MCP de prospecção B2B) | Busca por empresa/organização e cargo — acha o decisor (dono, gerente) de redes/grupos de restaurante | Mais forte se o alvo forem redes ou grupos com mais de uma unidade |
| **Vibe Prospecting** (MCP de enriquecimento de negócio local) | Dados de negócio local, parecido com informação de Google Maps — nome, endereço, contato | Mais adequado para restaurante individual, busca por região/cidade |
| **Metodologia de campo** (WebSearch + Instagram + Google Maps, mesmo método da `rv-prospeccao`) | Busca manual complementar quando a ferramenta automática não encontra contato direto (WhatsApp, e-mail) | Fallback para preencher os contatos que as ferramentas acima não pegarem |

**Processo, em linhas gerais:**
1. Definir a região/cidade e o volume de restaurantes-alvo por rodada (referência da RV em campanhas anteriores: 30-50 contatos por rodada).
2. Rodar a busca (Apollo e/ou Vibe Prospecting, complementado por busca manual quando necessário).
3. Para cada restaurante: nome do negócio, contato (WhatsApp prioritário, e-mail secundário), região.
4. Consolidar tudo numa planilha organizada.

Nenhuma dessas buscas foi rodada ainda — isso é a descrição do processo para o William entender o que está comprando, não um resultado de campo.

---

## 4. Modelo de entrega confirmado

**Decisão fechada:** a Real Vision pesquisa e entrega **apenas a planilha de contatos** (nome do restaurante, contato, região) para o William abordar por conta própria. A RV não manda as mensagens neste modelo.

**Variações possíveis (registradas aqui, não são a decisão atual):**
- RV também aborda os leads (manda as mensagens) — modelo de serviço mais completo, não é o confirmado agora.
- William comprar o **Sócio Digital** (Claude Code configurado na máquina dele, com o Company OS e skills do próprio negócio) e rodar a prospecção sozinho, sem depender da RV pesquisar pra ele a cada rodada.

---

## 5. Decisões pendentes a levar ao William

- Qual(is) região(ões)/cidade(s) mirar como restaurante-alvo.
- Volume de contatos desejado por rodada (referência RV: 30-50).
- Confirmar que o modelo é só a planilha (sem apoio de abordagem) — se ele quiser mais que isso, é outro escopo/preço.

---

## 6. Custo

**A combinar na proposta.** Ainda não existe um valor fechado pela Real Vision para este serviço específico (planilha de prospecção B2B) — vai ser apresentado ao William como item "a combinar", condicionado à região e ao volume de contatos por rodada (seção 5).

Referência interna para quando for orçar: os outros documentos do William usam **R$120/h** como valor-hora de desenvolvimento (ver [[WOOD-ART-APP-PLACAS-SPEC]]) — pode servir de base para estimar o tempo de pesquisa/curadoria da planilha, mas o preço final desta frente ainda precisa ser calculado.

---

## 7. Relação com as outras frentes

Esta é uma entrega independente do App de Placas, do Website e do Chatbot IA — não depende de nenhuma delas para existir. Relaciona-se apenas com a Frente 6 (tráfego pago), como um canal de aquisição alternativo/complementar para o mesmo objetivo: o William vender tábuas e placas maiores para o público de restaurantes.

---

## Próximo passo

Com a região e o volume confirmados pelo William, este documento vira uma linha de item fechada na proposta comercial (skill `proposta-comercial`) — ao lado das outras entregas, como uma frente independente.
