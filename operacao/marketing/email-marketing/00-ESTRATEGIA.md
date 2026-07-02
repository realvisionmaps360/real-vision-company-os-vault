# Estratégia de Email Marketing da Real Vision — Base de Conhecimento

> Documento-fonte. Tudo que aprendemos para construir o **Hermes**, o agente de email
> marketing da Real Vision. Criado em 23/06/2026.

---

## 1. Por que agora

A RV nunca teve email marketing, mas já tem ~35 clientes no VisionFlow e histórico de
prospecção. Email tem o melhor ROI do marketing (Hormozi: ~35–45x) porque o contato já
custou caro pra ser adquirido — o email só "lembra que você existe". É a hora de implementar.

A "transformação" que a RV vende **não é desconto** (não somos e-commerce). É
**presença digital que traz cliente**: o negócio do cliente sendo encontrado e escolhido
no Google. Esse é o nosso "furo na parede" (a gente vende o resultado, não a ferramenta).

---

## 2. As 4 mentes (o Megazord)

| Peça | Mestre | O que entrega |
|---|---|---|
| 🧠 Cérebro / estratégia | **Jeff Walker** (Fórmula do Lançamento) | narrativa, 9 gatilhos mentais, sequência em camadas, evento/escassez. Vende transformação. |
| 🎤 Voz / qualidade | **Alex Hormozi** | cada email paga por si, recompensa cada passo, estrutura fixa, "pareça email pessoal" pra chegar na caixa certa. |
| ⚙️ Corpo / máquina | **Ferdy (OmniSend)** | captura, automação por comportamento, segmentos, DNS, atribuição. |
| 🦾 Sistema nervoso / IA | **Lead Gen Jay** | rodar tudo no Claude Code via skills encadeadas, banco próprio, skills que se auto-melhoram, reverse lead magnet. |

### 2.1 Jeff Walker — os 9 gatilhos mentais
Autoridade · Reciprocidade · Confiança · Expectativa · Empatia · Eventos & Rituais ·
Comunidade · Escassez · Prova Social.
O segredo: **empilhar gatilhos em sequência ao longo do tempo** (email dá esse tempo).
- **Sequência de pré-lançamento (3 conteúdos):** 1) A Oportunidade ("por quê") → 2) A
  Transformação ("o quê", ensina de verdade) → 3) A Posse ("como", e abre a oferta).
- **Escassez fecha a venda:** maioria das vendas nas últimas 24h (abrir/fechar carrinho).

### 2.2 Hormozi — regras de ouro
- Cada email tem que **pagar por si** (valor útil em <60s de leitura).
- **Recompense cada passo:** abriu → recompensa no topo; leu → recompensa de novo.
- **Estrutura fixa (tipo McDonald's):** assunto reconhecível → recompensa imediata →
  1 ideia só → CTA → P.S. (2ª coisa mais lida).
- **Pareça email pessoal, não "Vegas Strip":** texto puro, 1–2 links, sem imagens
  pesadas, evitar palavras de "dinheiro" no corpo (cai em Promoções = "morte do email").
- **Descadastro fácil** (manter desinteressado derruba reputação do domínio).
- Detalhes: otimizar preview text (+24% abertura), A/B no assunto, segmentar (+700% ROI),
  escrever 12–24 emails de uma vez, pedir resposta ("responda SIM") sinaliza engajamento.
- Filosofia: **não persiga truques, alinhe-se ao objetivo da plataforma** (o Gmail quer
  entregar emails que as pessoas leem/abrem/respondem).

### 2.3 Ferdy (OmniSend) — o maquinário
- Captura: pop-up, fly-in, página, embed, **exit-intent**, segmentação na captura.
- Automação: boas-vindas → delay → **ramificação por comportamento** (abriu? caminho A;
  não abriu? caminho B); sai do fluxo ao comprar; carrinho abandonado.
- **Segmentos vivos** (se preenchem sozinhos por comportamento) ligados a automações.
- **DNS é decisivo:** trocar remetente genérico por `info@seudominio.com` com
  **SPF / DKIM / DMARC** verificados = o que tira do spam.
- **Atribuição:** medir quanto da receita veio do email vs. do site sozinho.
- A/B testing em tudo; IA pra reescrever copy e montar segmentos.

### 2.4 Lead Gen Jay — o futuro já aplicado no Claude Code
- **Skills encadeadas:** várias skills pequenas que se chamam em cadeia (estratégia →
  copy → A/B → deploy). Cada skill é só um documento editável.
- **Tenha SEU banco de dados:** registrar tudo (respostas, sim/não, vencedor de A/B,
  cargos/setores que respondem). O Claude lê esse histórico e decide o próximo passo.
- **Skills que se auto-melhoram** (autolearn/autoimprove, base Karpathy): a skill escreve,
  **critica a si mesma**, reescreve e tenta de novo até bater os critérios.
- **Estratégia ANTES da copy** (alimentar com material real → doc de estratégia: ICP,
  dores, objeções, ângulos, gatilhos de compra).
- **Qualificação + personalização em escala** usando a própria assinatura do Claude.
- **Reverse Lead Magnet** (subiu resposta de 1% → 5%): em vez de "quer uma call?",
  oferecer **algo feito sob medida na hora**.
- ⚠️ Ponto de atenção: Jay faz **cold em massa** (centenas de domínios, milhões de
  emails). NÃO replicar no domínio principal — queima reputação + risco LGPD. Usamos os
  *conceitos*, não a escala.

---

## 3. Convergência: onde os 4 concordam

1. **Dar valor antes de pedir.**
2. **Sequência > email solto.**
3. **Comportamento decide o próximo passo.**
4. **A entrega técnica (deliverability) importa.**

E se completam: Walker dá a estratégia, Hormozi a voz, Ferdy a máquina, Jay o sistema de
IA que opera e aprende sozinho. Um sem o outro falha.

---

## 4. O diferencial único da Real Vision

**Email guiado por IA conectado ao CRM (VisionFlow/Supabase).** O Hermes lê quem comprou
o quê, quem está inativo, quem recebeu proposta e não respondeu — e escreve a sequência
certa pra cada um, na voz da RV, melhorando a si mesmo. Ferramenta de prateleira não faz isso.

### Reverse Lead Magnet adaptado à RV (a sacada de ouro)
Em vez de "quer um orçamento?", oferecer algo sob medida:
- "Posso gravar um **mini-tour 360° de demonstração** do seu hotel e te mandar?"
- "Fiz uma **análise do seu Google Meu Negócio** — quer ver os 3 pontos que te fazem
  perder cliente?"
- "Montei um **print de como seu site apareceria** — quer ver?"
Conecta com a skill `rv-prospeccao`.

---

## 5. As 3 trilhas (públicos) + 2 motores

**Trilhas (públicos):**
1. **Clientes ativos** → relação + upsell (catálogo de 12 serviços). [PRIORIDADE]
2. **Prospects** → nutrir até a reunião.
3. **Newsletter pública** → autoridade (conecta com `rv-blogpost` e tese GEO).

**Motores:**
- 🔥 **QUENTE (prioridade):** clientes + newsletter, no domínio principal
  realvisionmaps.com via Resend. Base legal = relação comercial (LGPD ok), exige
  descadastro fácil.
- ❄️ **FRIO (fase futura, cautela):** prospecção. NUNCA do domínio principal — domínios
  separados, volume baixo e qualificado. Aqui entra a técnica do Jay + reverse lead magnet.

---

## 6. LGPD / consentimento (resumo)

- **Clientes atuais (VisionFlow):** seguro. Relação comercial existente = base legal
  ("legítimo interesse"). Única obrigação: **link de descadastro fácil** + tirar quem pedir.
- **Cold (lista raspada):** zona de risco (LGPD + reputação). Só com domínio separado,
  volume baixo, e avaliação jurídica. Fase futura.
- Regra prática: começar pelo motor quente (seguro). Inegociável antes do 1º disparo:
  descadastro + confirmar que são clientes reais.

---

## 7. Decisões tomadas (23/06/2026)

| Decisão | Escolha |
|---|---|
| Plataforma | **Resend + Supabase** |
| Público prioritário | **Clientes ativos** (relação + upsell) |
| Persona | Estrategista-redator, nome **Hermes** |
| Banco de dados | **Tabelas dedicadas só pro email** (separadas do CRM) |
| Skill | `rv-email` (padrão das skills rv-*) |
| Local dos arquivos | `operacao/marketing/email-marketing/` |
| Domínio (motor quente) | realvisionmaps.com (DNS na Hostinger) |
| Bilíngue | PT (Brasil) + DE/EN (Suíça) |

---

## 8. Fontes
Arquivos transcritos em `operacao/marketing/email-marketing/referencias/`:
- [[hormozi about email marketing]]
- [[ferdy korpeskoek email tutorial]]
- [[A_formula_do_lancamento_Jeff_Walker 2019]]
- [[Lead Gen Jay email future with claude code]]
