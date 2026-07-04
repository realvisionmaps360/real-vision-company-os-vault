# Estratégia de Venda — O Jogo da Terra

> Documento vivo. Última atualização: 04/07/2026.

---

## 1. Modelo proposto pelo Felipe (ponto de partida)

- **Preço:** R$ 100/ano (licença anual)
- **Promoção de lançamento:** gratuito por ~1 mês
- **Canais:** loja virtual do site da Real Vision + Google Play (Android)

---

## 2. ⚠️ O ponto de atenção mais importante: a regra de cobrança do Google

**A regra:** para apps distribuídos na Google Play, qualquer conteúdo digital consumido *dentro do app* (assinaturas, desbloqueio de níveis, moedas etc.) **precisa ser cobrado pelo sistema de pagamento do próprio Google**, que fica com **15%** da receita (para quem fatura menos de US$ 1 milhão/ano). Vender a assinatura só no nosso site e desbloquear o app na Play Store **viola essa política** e pode derrubar o app da loja.

*(No Brasil há disputas em andamento sobre essa regra, e a política tem exceções e mudanças recentes — precisamos verificar o estado atual dela na época do lançamento, antes de decidir.)*

### Os três caminhos possíveis

| Caminho | Como funciona | Prós | Contras |
|---|---|---|---|
| **A. Assinatura pelo Google** | App na Play Store, assinatura anual de R$ 100 cobrada dentro do app pelo Google | Alcance da Play Store; cobrança e renovação automáticas; confiança do usuário | Google fica com ~15% (R$ 15 de cada 100); loja RV vira só vitrine que aponta pro app |
| **B. App web (fora da Play Store)** | O jogo roda no navegador do celular (instalável como atalho, o chamado PWA); venda 100% pela loja RV | 100% da receita; controle total; mesma tecnologia | Sem a vitrine da Play Store; instalação menos familiar pro público geral |
| **C. Híbrido (recomendado estudar)** | Versão gratuita/demo na Play Store (capítulo 1 grátis) + assinatura completa em qualquer canal permitido | Play Store como funil de descoberta; loja RV como canal principal | Exige cuidado fino com a política do Google; duas versões pra manter |

🟡 **Decisão pendente (Q2 em [[DECISOES]]).** Sugestão: começar pelo caminho A puro (simplicidade primeiro) e evoluir pro C se fizer sentido.

---

## 3. A "conta de padaria" da IA 🔴

R$ 100/ano ÷ 12 = **R$ 8,33/mês por usuário** de teto para TODOS os custos (IA, servidor, taxa do Google).

Custo estimado por tipo de recurso de IA (ordem de grandeza, a refinar com números reais na fase de orçamento):

| Recurso | Custo relativo | Cabe no teto? |
|---|---|---|
| Analisar resposta de texto do jogador | Centavos por interação | ✅ Sim, com folga |
| Chat do mentor (texto) | Centavos por conversa | ✅ Sim, com uso moderado |
| Gerar imagem (avatar, cards) | Mais caro por unidade | 🟡 Só em momentos especiais (1 por nível, não por sessão) |
| Voz sintética dos NPCs | Caro se for tudo em tempo real | 🔴 Precisa de estratégia: pré-gerar os áudios das conversas fixas e só usar voz ao vivo nas respostas dinâmicas |
| Transcrição do áudio do jogador | Barato | ✅ Sim |

**Conclusão preliminar:** o modelo fecha se os recursos caros (imagem, voz ao vivo) forem *eventos raros e especiais* — o que, por sinal, é melhor design de jogo (recompensa rara vale mais).

---

## 4. Integração com a loja do site RV

Análise feita em 04/07/2026 no repositório do site (sincronizado com o GitHub):

- A loja (`/loja`) já existe e já tem a categoria **"Produtos Digitais"** e o tipo de produto **"digital"** prontos.
- Cada produto é um cadastro no arquivo de produtos do site, com nome, preço, descrição, fotos, e status — que pode ser **"em-breve"** (perfeito para pré-lançamento) ou "disponível".
- Já existe carrinho e página individual de produto.

**Plano em 3 momentos:**

1. **Pré-lançamento:** cadastrar o jogo na loja com status "em breve" + página de captura de interessados (lista de espera por e-mail → integra com o Hermes, nosso sistema de e-mail).
2. **Lançamento (mês grátis):** produto na loja com preço R$ 0 + selo de promoção "primeiro mês de lançamento", botão levando pra Play Store (ou pro app web, conforme decisão Q2).
3. **Pós-promoção:** preço R$ 100/ano; o papel exato do botão de compra depende do caminho escolhido na seção 2.

---

## 5. Publicação na Google Play — o processo em passos simples

1. **Conta de desenvolvedor Google Play** — taxa única de US$ 25 (~R$ 140). Pode ser em nome da Real Vision.
2. **Preparar o app** — ícone, capturas de tela, descrição, classificação etária (o jogo tem temas filosóficos — classificação livre ou 10+), política de privacidade publicada no site (obrigatório, ainda mais usando microfone e foto do usuário).
3. **Testes internos** — a Play Store exige uma fase de teste com testadores antes de contas pessoais novas publicarem (regra para contas criadas depois de 2023: 12 testadores por 14 dias). Isso encaixa perfeito com a ideia do mês de lançamento gratuito.
4. **Revisão do Google** — primeira publicação leva de alguns dias a 2 semanas.
5. **Lançamento** — público, com a promoção ativa.

---

## 6. Estratégia de divulgação (esboço inicial, a desenvolver)

- **Blog do site RV** — posts sobre a filosofia do jogo (já temos a skill rv-blogpost e o post GEO como referência de tráfego)
- **YouTube da RV** — devlog da criação do jogo ("construindo um jogo com IA") — documentar o processo É conteúdo
- **E-mail (Hermes)** — lista de espera do pré-lançamento
- **O mês grátis como motor** — meta: volume de downloads e avaliações na Play Store durante a promoção, para o algoritmo da loja trabalhar a favor depois

---

## 7. Pendências desta frente

Ver [[DECISOES]] — em especial Q2 (canal de cobrança) e Q6 (orçamento de IA).
