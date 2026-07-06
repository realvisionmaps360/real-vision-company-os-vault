# Wood Art — App de Placas Personalizadas · Spec Técnica + Custos

> Documento interno de engenharia/precificação. Base para a linha de item na proposta comercial.
> Cliente: William (Wood Art). Dossiê: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]]
> Criado: 06/07/2026 · Valor-hora de referência: **R$120/h**
> ⚠️ Estimativas de horas são da Real Vision. Custos de infraestrutura são faixas de mercado (jul/2026), confirmadas na hora de construir. Nada aqui é chute de preço final ao cliente — o preço fecha depois que o William confirmar o escopo.
> 🎯 **Objetivo desta fase:** reunir as informações principais para montar a proposta comercial. Nenhuma construção/produção começa ainda.

---

## 1. O que é o app

Ferramenta onde o **cliente final da Wood Art monta e compra sozinho** a placa personalizada, do começo ao fim, sem o William no meio do orçamento manual.

**Jornada do cliente:**
1. Escolhe o **tamanho** e o **tipo de madeira/acabamento**.
2. **Monta a arte** — digita o texto/gravação e, se quiser, gera uma sugestão de arte com auxílio de IA (o mesmo tipo de arte que o William já faz hoje via ChatGPT, agora dentro do app).
3. **Pré-visualiza** a placa pronta.
4. **Paga** dentro do app.
5. Informa **endereço e dados de entrega**.

**O que acontece nos bastidores:** o pedido cai num **painel interno de produção** da Wood Art — com a arte final e as especificações (tamanho, material, texto) — onde a equipe organiza a fila e executa. É a esteira que automatiza o negócio.

---

## 2. Dois cenários de formato (PWA × Nativo)

O William falou em "app que o cliente baixa". Existem dois caminhos para isso, com custo e prazo bem diferentes:

| | **A — Web app / PWA** ✅ recomendado | **B — App nativo (Play/App Store)** |
|---|---|---|
| Como o cliente "baixa" | Abre o link no navegador e instala como app (ícone na tela) | Baixa na Play Store / App Store |
| Base de código | Uma só (reaproveita a stack do site próprio) | Separada do site; 2 plataformas ou React Native |
| Prazo estimado | ~170–200h | ~340–420h |
| Custo único (× R$120/h) | **~R$20.400 a R$24.000** | **~R$40.800 a R$50.400** |
| Custo mensal | Menor (só hospedagem + manutenção) | Igual + contas de desenvolvedor das lojas |
| Taxas de loja | Nenhuma | 15–30% em vendas via loja + contas anuais/únicas |
| Manutenção | Um código só | Dobrada (duas plataformas) |
| Atualização | Instantânea (deploy) | Passa por revisão das lojas |

**Recomendação: cenário A (PWA).** Entrega a mesma experiência de "app instalado" pelo navegador, custa e demora quase metade, reaproveita o site próprio (Frente 3) e não paga taxa de loja. O app nativo só se justifica se o William fizer questão de estar dentro da Play Store/App Store — o que não é necessário para vender placas personalizadas.

O restante da spec detalha o **cenário A**.

---

## 3. Stack proposta (cenário PWA)

- **Frontend:** React + Vite + Tailwind (mesma base do site próprio / referência Brazilcomp) — PWA instalável.
- **Backend / Banco:** Supabase — pedidos, catálogo de tamanhos e materiais, estoque, status de produção, autenticação.
- **Pagamento:** API do Mercado Pago (conta do próprio William) — cartão, Pix, boleto.
- **Frete:** API dos Correios — cálculo de valor/prazo no checkout e geração de etiqueta.
- **Geração de arte:** API OpenAI (imagem/texto) — o cliente gera/ajusta a arte com auxílio de IA dentro do app.
- **Painel interno de produção:** fila de pedidos com arte final + especificações, status (recebido → em produção → enviado), acessível à equipe.
- **Deploy:** Vercel · **Domínio:** a confirmar se se aplica (ver seção 5.2 — William já tem woodartstore.com.br; depende do formato final).

---

## 4. Integrações necessárias

| Integração | Para quê | O que exige |
|---|---|---|
| Mercado Pago | Receber pagamento no app | Conta + credenciais de API do William |
| Correios | Calcular frete e gerar etiqueta | Contrato/credenciais Correios do William |
| OpenAI | Geração de arte assistida por IA | Chave de API |
| Notificação de pedido | Avisar equipe + cliente (email/WhatsApp) | Serviço de email (Resend) e/ou WhatsApp |
| Export para produção | Levar o pedido ao chão de fábrica | Definir com o William como a equipe recebe hoje |

---

## 5. Custos

### 5.1 Custo único — desenvolvimento (cenário PWA)

Estimativa por bloco de trabalho × R$120/h:

| Bloco | Horas | Valor |
|---|---|---|
| Configurador (seleção de tamanho/material + pré-visualização) | 4h | R$480 |
| Geração de arte assistida por IA (integração + editor) | 4h | R$480 |
| Backend + banco (catálogo, estoque, pedidos, auth) | 5h | R$600 |
| Painel interno de produção (fila + status + export) | 4h | R$480 |
| Integração pagamento (Mercado Pago) | 3h | R$360 |
| Integração frete (Correios) | 2h | R$240 |
| Notificações (email/WhatsApp) | 3h | R$360 |
| Deploy PWA (instalável) + testes + ajustes | 7h | R$840 |
| **Total** | **32h** | **R$3.840** |

**⚠️ Total pendente de confirmação.** Essa estimativa só fecha depois que o William responder o que o configurador vai efetivamente oferecer (seção 6) — mais opções de personalização = mais horas. O número acima pode subir ou descer dependendo dessa resposta.

> Precificação segue a filosofia [[feedback_proposta_fecha_total_divide_partes]] — fecha o total redondo e divide em pacotes depois. Âncora de mercado RV em [[project_rv_reativacao_skill]].

### 5.2 Valor mensal a cobrar do William (manutenção do app)

**R$150 a R$300/mês** — cobrado pela Real Vision para manter o app rodando (suporte + atualizações). Esse valor é separado do custo único de desenvolvimento da seção 5.1.

**Custo de infraestrutura por trás desse valor (referência interna, não repassar linha a linha ao cliente):**
- Vercel: começa grátis; ~R$110/mês se precisar do plano Pro por volume.
- Supabase: começa grátis; ~R$140/mês no Pro conforme crescer.
- OpenAI: por arte gerada (estimativa ~R$0,25–0,50 por geração de imagem), variável conforme uso.
- Mercado Pago: taxa por transação — não é custo da RV, sai do checkout do William.

> No início (poucos pedidos), Vercel e Supabase ficam nos planos grátis — o R$150–300/mês cobrado é majoritariamente margem de manutenção, não repasse de custo de infra.

**Domínio — a confirmar:** William já tem o domínio woodartstore.com.br. Só faz sentido cobrar/provisionar domínio novo se a solução for um site acessado por link próprio. Se o app for pensado como instalável direto no celular (ícone, sem depender de visitar um endereço novo), domínio pode não se aplicar aqui — decidir isso faz parte de definir o formato final com o William.

---

## 6. Decisão em aberto — escopo do configurador

O total de horas depende do **que o cliente vai poder escolher no app**. Cada opção a mais é mais trabalho. Pergunta a levar ao William, com uma versão-padrão sugerida:

**Versão-padrão sugerida (a confirmar/ajustar com ele):**
- Tamanhos: lista fechada (ex: 3–5 tamanhos padrão).
- Tipo de madeira/acabamento: 2–4 opções.
- Texto/gravação: livre, com escolha de fonte (2–3 fontes).
- Arte: gerar com IA a partir de uma descrição **ou** enviar a própria imagem.
- Moldura/borda: opcional (sim/não).

Quanto mais itens e mais variações, mais horas — a estimativa da seção 5.1 assume essa versão-padrão.

---

## 7. Riscos e pontos a alinhar

- **Ligação com a produção física:** como a equipe recebe o pedido hoje e como quer receber (o painel precisa refletir o processo real da fábrica).
- **Escopo do configurador** (seção 6) — define o número final de horas.
- **Credenciais de API** (Mercado Pago, Correios, OpenAI) precisam vir do William para integrar.

---

## Próximo passo

Com o escopo do configurador confirmado pelo William, este documento vira uma linha de item fechada na proposta comercial (skill `proposta-comercial`). A frente seguinte da cadeia é o **site próprio + clone Brazilcomp + relatório do Wix atual** — ver [[WOOD-ART-FRENTES-DE-TRABALHO]].
