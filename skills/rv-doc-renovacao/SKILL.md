---
name: rv-doc-renovacao
description: Gera o documento simples de renovação de tour virtual 360° pra clientes da campanha de reativação — mostra desde quando o cliente tem o tour, quando venceu, valor pago pela renovação e nova data de vencimento, mais um bloco de oferta (upsell) e condições resumidas. Use SEMPRE que Felipe disser "monta o documento de renovação do cliente X", "gera o contrato simples", "documento de renovação", ou passar dados de um cliente da reativação (nome, negócio, data de criação do tour, valor pago) pedindo pra formalizar. Formato HTML profissional, SEM honeycomb e SEM fotos — só logotipo Real Vision. NÃO usar pro contrato jurídico completo (isso é rv-contrato) nem pra criar as mensagens de reativação em si (isso é rv-reativacao).
---

# RV Doc Renovação — Documento simples de renovação de tour 360°

Skill criada em 28/07/2026, a partir da sessão em que o primeiro documento (Ian Marques & Teruí Marques — Barra Club) foi montado do zero. Consolida o padrão pra replicar rápido nos próximos clientes da campanha de reativação (`rv-reativacao`).

> Carregar sempre junto com `realvision` primeiro (contexto da empresa) e `rv-reativacao` se o cliente for da campanha (pra puxar tipo de negócio, portfólio de referência e histórico).

## O que é / o que não é

- **É:** um resumo simples e profissional — não um contrato jurídico. Mostra o que já está combinado (tour ativo, datas, valor pago) e abre espaço pra oferecer mais serviços.
- **Não é:** o contrato de prestação de serviços completo (15 seções, Termos anexados) — isso é a skill `rv-contrato`, usada só quando o cliente vai fechar um projeto novo e maior.
- **Visual:** mesma identidade de marca do `rv-relatorio` (cores, fontes Bebas Neue/Inter/JetBrains Mono, estrutura de seções), mas **sem** a capa honeycomb e **sem nenhuma foto do cliente** — decisão explícita do Felipe (28/07/2026: "vai ser mais profissional"). O único elemento visual de marca é o **logotipo Real Vision**, embutido em base64 (branco no cabeçalho escuro, preto no bloco de assinatura final).

## Fluxo (sempre nesta ordem — .md antes do .html)

### 1. Coletar os dados do cliente
Perguntar (ou receber já pronto) só o que falta:
- Nome(s) do(s) cliente(s) — pode ser mais de uma pessoa (ex.: dois sócios/irmãos). **Nunca supor sobrenome** não confirmado — perguntar.
- Nome do negócio.
- Data de criação do tour virtual 360°.
- Data de vencimento do 1º ano (criação + 1 ano).
- Valor pago pela renovação.
- Data em que o pagamento foi feito (pode ser diferente da data do documento — perguntar se não for óbvio).
- Nova data de vencimento (data de vencimento anterior + 1 ano).
- Tipo de negócio (pousada, restaurante, bar/espaço de eventos, cartão digital) — pra escolher a referência de portfólio certa (ver tabela em `rv-reativacao`).
- Forma de pagamento aceita (regra atual, confirmada 28/07/2026: **Pix ou cartão de crédito** — não mudar sem o Felipe confirmar de novo).

### 2. Rascunhar em `.md` primeiro
Montar um `.md` na pasta do cliente (`operacao/clientes/arquivos/<Cliente>/`) com todos os dados preenchidos, nas seções: dados do cliente, linha do tempo do tour, texto de abertura, oferta (upsell), condições resumidas. Mostrar pro Felipe e esperar o **"pode fazer"** antes de virar HTML — nunca gerar o HTML direto sem esse checkpoint.

### 3. Montar o HTML a partir do template
Copiar `assets/template.html` (já tem os logos embutidos em base64 — não precisa de script de finalize, diferente do `rv-relatorio`) e preencher os placeholders:

| Placeholder | Conteúdo |
|---|---|
| `{{NEGOCIO}}` | Nome do negócio (title case) |
| `{{NEGOCIO_UPPER}}` | Nome do negócio em caixa alta (aparece 3x, no run-head de cada seção) |
| `{{CLIENTES_NOMES}}` | "Fulano & Sicrano" (h2 da capa) |
| `{{SAUDACAO_NOMES}}` | "Fulano e Sicrano" (saudação, sem &) |
| `{{DATA_DOCUMENTO}}` | Data de hoje, por extenso (ex.: "28 Julho 2026") |
| `{{DATA_CRIACAO}}` | Data de criação do tour |
| `{{DATA_VENCIMENTO_ANTERIOR}}` | Vencimento do 1º ano |
| `{{VALOR_PAGO}}` | Valor pago (ex.: "R$ 100,00") |
| `{{DATA_PAGAMENTO}}` | Data em que o pagamento foi feito |
| `{{DATA_VENCIMENTO_NOVA}}` | Novo vencimento |
| `{{DOMINIO_EXEMPLO}}` | Sugestão de domínio (ex.: "barraclub.com.br") |
| `{{TIPO_NEGOCIO}}` | Tipo de negócio, no plural (ex.: "bares e espaços de eventos") |
| `{{PORTFOLIO_NOME}}` | Nome do case de portfólio (ver tabela `rv-reativacao`) |
| `{{PORTFOLIO_LINK}}` | URL completa do portfólio |
| `{{PORTFOLIO_LINK_TEXTO}}` | URL sem `https://`, pra exibir no texto do link |
| `{{FORMAS_PAGAMENTO}}` | "Pix ou cartão de crédito" (padrão atual) |

A tabela de preços de upsell (domínio R$40/ano, cartão digital a partir de R$300/ano, landing page a partir de R$800/ano, site profissional a partir de R$1.500/ano) já vem **fixa** no template — é o preço padrão da campanha de reativação, não precisa reescrever.

### 4. Salvar
Pasta do cliente: `operacao/clientes/arquivos/<Cliente>/`. Nome do arquivo: `<Nomes>_Renovacao-Tour360_<DD-MM-AA>.html` (ex.: `Ian-Marques-Terui_Renovacao-Tour360_28-07-26.html`).

### 5. Mensagem de WhatsApp
Depois do HTML aprovado, gerar um texto curto pra Felipe mandar junto com o anexo. Tom: direto, caloroso, sem hipérbole (regras de `rv-copy`/AGENTS.md — sem travessão, sem "incrível"/"sensacional").

**Padrão travado em 28/07/2026** (texto exato confirmado pelo Felipe, a partir do WA que ele realmente mandou pro Didier) — é o modelo fixo daqui pra frente, copiar a estrutura à risca:

```
Fala [Nome] blz

Só pra formalizar a renovação do tour

Segue em anexo o documento com o resumo de tudo combinado, e também as outras opções de presença digital caso faça sentido pra você mais pra frente.

Obrigado pela confiança.
```

Regras rígidas sobre esse texto:
- **Sempre só em português.** Nunca misturar outro idioma (francês, inglês etc.), mesmo que o cliente fale outra língua ou que outra skill mencione isso pro WA de reativação — essa mistura é regra de outra etapa da campanha, **não** entra no WA deste documento. Se surgir dúvida, perguntar ao Felipe antes de inventar.
- **Fechamento simples:** "Obrigado pela confiança." — ponto final, sem apelido, sem "tmj", sem nome repetido, a não ser que o Felipe peça explicitamente algo diferente pra um cliente específico (ex.: o "irmão tmj" do Getúlio foi um ajuste pontual dele, não é padrão a replicar sozinho).
- **Não inventar variações, adjetivos ou floreio.** Texto curto, direto, sem cara de "escrito por IA". Trocar só o nome do cliente — o resto do texto fica fixo.
- Não incluir datas/valores nessa mensagem — o documento em anexo já cobre isso.

### 6. Handoff pro VisionFlow
Depois de enviado, gerar o texto `OBSERVACOES` no formato da skill `rv-visionflow-handoff` (blocos `[FINANCEIRO]`, `[ENTREGA]`, `[COMUNICACAO]`, `[TAREFA]`). O `[TAREFA]` de follow-up da próxima renovação **sempre pergunta ao Felipe com quantos dias de antecedência** ele quer ser avisado (padrão usado até agora: **5 dias antes do vencimento** — não presumir que vale pra sempre, confirmar a cada cliente se não tiver sido dito).

## Diferença importante vs. `rv-relatorio`

`rv-relatorio` usa capa honeycomb (foto do cliente mascarada em hexágonos) — pensada pra relatórios de projeto/proposta, onde a identidade visual forte importa. Este documento é mais parecido com um "recibo formal": rápido de ler, sem imagem nenhuma além do logotipo, pensado pra ser enviado em massa pros ~13 clientes da campanha de reativação sem depender de foto de cada um.

## Arquivos da skill

- `assets/template.html` — template com os logos já embutidos em base64 (branco no cabeçalho, preto na assinatura) e todos os placeholders listados acima.
- `assets/brand/rv-logo-white.png` / `rv-logo-black.png` — cópia dos logos oficiais (mesma fonte de `rv-relatorio/assets/brand/`), mantidos aqui só de referência/backup — o template já usa a versão embutida, não precisa referenciar o arquivo solto.

## Histórico

- **28/07/2026** — Criada a partir da sessão do primeiro cliente (Ian Marques & Teruí Marques, Barra Club). Decisões travadas nessa sessão: sem honeycomb, sem foto, logo obrigatório (topo + assinatura final, não duplicado), links clicáveis (site, portfólio, email), data do pagamento sempre explícita na tabela, texto de "sai do ar" correto (hospedagem própria via link, não "perfil do Google").
- **28/07/2026** — Segundo cliente (Getúlio, Residencial Soares & Ferreira). Ajustado texto do template pra singular quando só há 1 cliente ("você"/"vocês" conforme o caso). Padrão de mensagem de WhatsApp trocado pro modelo mais humano e casual (ver seção 5).
- **28/07/2026** — Quarto cliente (Didier, Casa dos Cajus). Erro cometido nessa sessão: misturei francês na mensagem de WhatsApp por causa da regra especial do Didier no `rv-reativacao` (que fala de misturar PT/FR no WA da campanha de reativação) — Felipe corrigiu: essa regra não vale pro WA deste documento, que é **sempre só em português**, simples e sem inventar variação. Travado o texto exato do passo 5 a partir do WA real que ele mandou (sem "tmj"/apelido por padrão).
