# Templates Operacionais — Sócio Digital

> Todos os documentos que o Felipe usa repetidamente no dia a dia do serviço.
> Cada template deve virar versão editável em `operacao/projetos/socio-digital/templates-editaveis/` (Notion, Google Docs ou arquivo Word) na Etapa 4 da execução.

---

## Template 1 — Briefing inicial do cliente

Usado na call de diagnóstico de 30min.

```markdown
# Briefing — [Nome do Cliente]
**Data:** [YYYY-MM-DD]
**Atendido por:** Felipe Garcia
**Nicho:** [pousada / restaurante / e-commerce / festival / agência / comércio / outro]
**Tier sugerido:** [Essencial / Profissional / Empresarial]

## Empresa
- Razão social:
- Nome fantasia:
- CNPJ:
- Site atual: (se tiver)
- Instagram: @
- Outras redes:
- Localização:
- Tempo de operação:
- Tamanho da equipe:

## Operação atual
- Quem vai ser o operador principal (dono ou funcionário)?
- Nome do operador:
- Quantas horas/dia ele passa no computador?
- Que ferramentas ele usa hoje? (planilhas, Trello, WhatsApp, ERP, sistema X, etc)
- Maior dor operacional do dia a dia:
- Segunda maior dor:

## Processos identificados pra delegar à IA
Liste 3 a 5 processos repetitivos que o cliente faz hoje manualmente:
1.
2.
3.
4.
5.

## Infraestrutura
- Computador principal: [Mac / Windows / Linux] [especificações relevantes]
- Internet: [velocidade aproximada]
- Outros dispositivos:
- Cliente tem WhatsApp Business: [sim / não]
- Cliente tem Google Workspace: [sim / não]
- Cliente tem Instagram pro / Facebook Business: [sim / não]

## Filtro de qualificação (marcar)
- [ ] CNPJ ativo
- [ ] Usa computador no dia a dia
- [ ] Internet estável
- [ ] Aceita investir mínimo R$ 2.900 no início
- [ ] Tem pelo menos 1 processo repetitivo claro
- [ ] Cliente OU funcionário disponível pra 4h de treinamento

**Passou no filtro?** [sim / não]
**Se não, motivo:**

## Decisão
- Tier escolhido:
- Valor total proposto: R$ ___ setup + R$ ___ /mês
- Data prevista de implementação:
- Pagamento: [PIX 50% adiantado + 50% no dia / outro]

## Observações livres
[notas]
```

---

## Template 2 — Proposta comercial

Enviada por e-mail e/ou WhatsApp em até 48h após o briefing.

```
Olá [Nome],

Conforme conversamos, segue a proposta personalizada do Sócio Digital pra [Nome da Empresa].

═══════════════════════════════════════════════
O QUE VAMOS IMPLEMENTAR
═══════════════════════════════════════════════

[Resumo curto — 3 a 5 linhas explicando o que vai ser feito específico pro nicho do cliente, mencionando 2 a 3 dos processos identificados no briefing.]

Exemplo: "Vamos instalar no seu computador uma IA treinada pra sua pousada. Ela vai responder os reviews automaticamente no Google Meu Negócio, atualizar as descrições dos quartos quando você mudar preço, e gerar posts de Instagram com base nas fotos da diária. Você delega como faria com um sócio — ela executa, você revisa."

═══════════════════════════════════════════════
ESCOPO DO TIER [ESSENCIAL / PROFISSIONAL / EMPRESARIAL]
═══════════════════════════════════════════════

[Listar entregáveis do tier conforme 02-SERVICO-COMPLETO.md, com checkmarks ✓]

═══════════════════════════════════════════════
INVESTIMENTO
═══════════════════════════════════════════════

→ Setup (one-time): R$ _____
→ Mensalidade: R$ _____/mês

INCLUSOS NO MENSAL:
✓ Hospedagem Vision Cloud (1 site, SSL, deploy automático)
✓ [horas] de suporte/mês
✓ Relatório mensal com insight estratégico
✓ Atualização de skills personalizadas
[demais itens conforme tier]

═══════════════════════════════════════════════
CRONOGRAMA
═══════════════════════════════════════════════

1. Aceite + pagamento 50% do setup → até [data]
2. Implementação remota → [data], bloco de 4h
3. Início da operação → imediatamente após implementação
4. Primeiro relatório mensal → [data + 30 dias]

═══════════════════════════════════════════════
FORMA DE PAGAMENTO
═══════════════════════════════════════════════

→ 50% do setup à vista (PIX) — pra confirmar agendamento
→ 50% restante do setup no início da implementação (PIX)
→ Mensalidade: dia [X] de cada mês (PIX recorrente ou boleto)

Importante: o plano Pro do Claude (USD ~20/mês = ~R$ 100) é pago direto por você à Anthropic. A gente configura, mas o pagamento não passa pela Real Vision — assim você nunca fica refém da gente.

═══════════════════════════════════════════════
GARANTIA
═══════════════════════════════════════════════

Se em 7 dias após a implementação você não tiver delegado pelo menos 1 tarefa pra sua IA, devolvemos 100% do setup. Sem perguntas.

═══════════════════════════════════════════════
VALIDADE
═══════════════════════════════════════════════

Esta proposta vale por 7 dias corridos a partir de hoje.

Qualquer dúvida me chama no WhatsApp.

Topa fechar?

— Felipe Garcia
Real Vision
[whatsapp]
[email]
```

---

## Template 3 — Checklist da Call de Implementação (4h)

Felipe segue este checklist na call de implementação. Imprimir ou abrir em segunda tela.

```markdown
# Implementação — [Cliente]
**Data:** [YYYY-MM-DD]
**Horário:** [HH:MM] (início) — [HH:MM] (fim previsto)
**Tier:** [Essencial / Profissional / Empresarial]
**Operador (cliente):** [nome]
**Ferramenta de acesso remoto:** [TeamViewer / AnyDesk]

## Pré-call (Felipe, 30min antes da call começar)

- [ ] Confirmar recebimento da 1ª parcela do setup
- [ ] Confirmar agendamento da 2ª parcela
- [ ] Abrir briefing do cliente em outra aba
- [ ] Conferir checklist específico do tier (este documento)
- [ ] Testar TeamViewer/AnyDesk (verificar última versão)
- [ ] Conferir credenciais da conta Claude Anthropic (cliente já criou e ativou Pro)
- [ ] Preparar template do nicho do cliente em outra pasta
- [ ] Tomar café ☕

## Hora 1 (00:00 – 01:00) — Configuração inicial

Cliente acompanhando pela tela compartilhada.

- [ ] Conectar remoto na máquina do cliente
- [ ] Confirmar Claude Pro ativo na conta do cliente
- [ ] Baixar e instalar Claude Code (versão atual: confirmar antes)
- [ ] Configurar Claude Code com a conta do cliente
- [ ] Criar pasta raiz da empresa:
  - Windows: `C:\Users\[cliente]\Documents\[Nome da Empresa]\`
  - Mac: `~/Documents/[Nome da Empresa]/`
- [ ] Criar estrutura base (espelho simplificado do Company OS Real Vision):
  ```
  [Nome da Empresa]/
  ├── AGENTS.md
  ├── CLAUDE.md
  ├── contexto/
  │   ├── EMPRESA.md
  │   ├── VOZ.md
  │   └── (outros conforme nicho)
  ├── operacao/
  │   └── (subpastas conforme nicho)
  ├── DIARIO.md
  └── .claude/
      └── skills/
          └── [cliente]-style/
              └── SKILL.md
  ```
- [ ] Inicializar git local (opcional)

## Hora 2 (01:00 – 02:00) — Contexto + skill personalizada

- [ ] Preencher `contexto/EMPRESA.md` JUNTO com o cliente (entrevista guiada):
  - História da empresa
  - Produtos/serviços
  - Diferenciais
  - Público
  - Concorrentes
  - Stack atual
- [ ] Preencher `contexto/VOZ.md`:
  - Tom (formal / casual / técnico)
  - Palavras que usa
  - Palavras que evita
  - Exemplos de comunicação certa e errada
- [ ] Criar/preencher skill `[empresa]-style/SKILL.md`:
  - Frontmatter (name, description)
  - When to use this skill
  - Knowledge base do nicho
  - Templates de resposta
- [ ] Configurar AGENTS.md / CLAUDE.md global:
  - Regras de trabalho
  - Idioma
  - Aprovações necessárias
- [ ] Criar `DIARIO.md` inicial:
  - Cabeçalho explicando o que é
  - Primeira entrada de teste
- [ ] **Tier Profissional+:** Configurar Nextcloud (apresentar como "Sincronização Vision")
  - Cliente Nextcloud Desktop instalado em cada máquina da equipe
  - Pasta da empresa apontando pro servidor Nextcloud
  - Testar sincronização (criar arquivo em uma máquina, ver aparecer em outra)

## Hora 3 (02:00 – 03:00) — Treinamento ao vivo

Cliente assume o controle do mouse/teclado. Felipe orienta.

- [ ] Demonstrar como abrir o Claude Code
- [ ] Mostrar como fazer pergunta simples ("resuma o que tem no DIARIO.md")
- [ ] Mostrar como pedir tarefa simples ("escreva uma resposta acolhedora pra esse review: [colar review]")
- [ ] Mostrar como pedir tarefa complexa ("crie um relatório das últimas reservas baseado no arquivo X")
- [ ] Mostrar como o cliente atualiza contexto (adiciona info na pasta `contexto/` ou cria nova subpasta)
- [ ] Mostrar onde fica o `DIARIO.md` e como consultar
- [ ] Cliente executa **3 tarefas reais sozinho** com Felipe observando:
  1. Tarefa 1: [definir conforme nicho]
  2. Tarefa 2: [definir conforme nicho]
  3. Tarefa 3: [definir conforme nicho]
- [ ] Tirar dúvidas

## Hora 4 (03:00 – 04:00) — Extras + Vision Cloud + finalização

- [ ] **Tier Empresarial:** configurar até 3 agentes automatizados
  - Definir tarefas pra cada agente
  - Configurar gatilhos
  - Testar cada um
- [ ] **Tier Empresarial:** configurar integrações
  - FB Ads MCP (se aplicável)
  - WhatsApp MCP (se aplicável)
  - Google Ads MCP (se aplicável)
  - Outras
- [ ] Configurar Vision Cloud (incluído em todos os tiers):
  - Apontar domínio do cliente pra hospedagem Hostinger (apresentar como "Vision Cloud")
  - SSL ativo (auto)
  - Deploy de placeholder ou site real (se cliente tem)
  - Testar acesso e velocidade
- [ ] Tirar print da estrutura final (pra incluir no PDF de tutorial)
- [ ] Confirmar com cliente que tudo tá funcionando
- [ ] Agendar primeiro acompanhamento (D+30)
- [ ] Despedir o cliente

## Pós-call (Felipe, no mesmo dia ou D+1)

- [ ] Gerar PDF personalizado com tutorial específico do cliente
  - Capa com nome da empresa
  - Print da estrutura criada
  - Lista das 3 tarefas que ele executou na call (referência)
  - 5 exemplos de novas tarefas que ele pode pedir
  - Como acessar o DIARIO.md
  - Canal de suporte
- [ ] Enviar por e-mail: PDF + link suporte + link calendário pra agendar suporte
- [ ] Enviar mensagem WhatsApp curta agradecendo e confirmando próximos passos
- [ ] Salvar tudo em `operacao/clientes/[nome-cliente]/`:
  - Briefing
  - Proposta aceita
  - Print da estrutura
  - PDF gerado
  - Contrato/recibo
- [ ] Atualizar VisionFlow (CRM) com status "implementado"
- [ ] Marcar calendário Google: e-mail D+7, relatório D+30
- [ ] Agendar lembrete pra suporte mensal conforme tier
```

---

## Template 4 — Diário de Operação (cliente)

Arquivo `DIARIO.md` que vive na pasta do cliente. A IA atualiza sozinha (configurado na skill durante a implementação).

```markdown
# Diário de Operação — [Nome da Empresa]

> A IA atualiza este arquivo automaticamente toda vez que executa uma tarefa relevante.
> Você pode consultar a qualquer momento.
> O Felipe (Real Vision) lê este arquivo no fim do mês pra gerar seu relatório estratégico.

---

## YYYY-MM-DD

- [HH:MM] — [Categoria] — [Descrição curta da tarefa]
  - Detalhe relevante (opcional)
  - Link/arquivo gerado (opcional)

### Exemplo (pousada)

- 09:14 — Reviews GMN — Respondi 3 reviews positivas (5★) e 1 neutra (3★)
  - Review da Maria (5★) — destaquei a vista do mar
  - Review do João (5★) — agradeci o feedback sobre o café da manhã
  - Review da Sandra (5★) — convidei pra voltar no inverno
  - Review do Pedro (3★) — pedi desculpa pelo barulho da obra ao lado e ofereci 10% off na próxima

- 10:32 — Site — Atualizei descrição do quarto "Suíte Master" com novo preço (R$ 450)
  - Arquivo: site/quartos/suite-master.md

- 14:07 — Instagram — Gerei 2 posts da diária de Itacaré, agendados pra terça e quinta
  - Post 1: foto da praia ao pôr do sol + legenda
  - Post 2: foto do café da manhã + legenda

- 16:45 — WhatsApp — Listei 12 hóspedes que ficaram em 2026 e ainda não voltaram
  - Sugiro: campanha de reativação com 10% off
  - Lista salva em: operacao/marketing/lista-reativacao-2026-05.md

---

## YYYY-MM-DD

[próximo dia, próxima entrada...]
```

---

## Template 5 — Relatório Mensal (Real Vision → cliente)

Enviado por e-mail no início de cada mês. Felipe gera lendo o DIARIO.md do cliente.

```
Assunto: Sócio Digital — Relatório de [mês/ano] — [Cliente]

Olá [Nome],

Aqui está o resumo do que seu Sócio Digital fez em [mês] e a recomendação estratégica do mês.

═══════════════════════════════════════════════
O QUE SUA IA FEZ ESTE MÊS
═══════════════════════════════════════════════

(Resumo numérico extraído do DIARIO.md — exemplo pra pousada:)

✓ 47 reviews respondidos no Google Meu Negócio
✓ 23 posts criados no Instagram
✓ 12 hóspedes contatados via WhatsApp
✓ 5 relatórios de ocupação gerados
✓ 18 atualizações no site (preços, fotos, descrições)
✓ 8 e-mails de cotação respondidos

Tempo estimado economizado: 22 horas no mês.

═══════════════════════════════════════════════
INSIGHT ESTRATÉGICO DO MÊS
═══════════════════════════════════════════════

(1 insight concreto baseado no log do mês — exemplo:)

Identifiquei um padrão olhando o DIARIO.md de maio:

12 dos hóspedes que deixaram review positiva nos últimos 60 dias ainda não foram convidados a reservar de novo. Histórico do setor mostra que hóspedes que recebem follow-up entre 60 e 90 dias após a estadia têm taxa de retorno 3x maior.

→ Sugestão: criar um agente automatizado que mande WhatsApp pra esse grupo com oferta de retorno (10% off na próxima estadia). Tempo de configuração: 1h. ROI esperado: 3 reservas extras no próximo mês (R$ 1.350).

Topa? Responde sim ou não que eu agendo a implementação na sua próxima call de suporte.

═══════════════════════════════════════════════
PRÓXIMA CALL DE ACOMPANHAMENTO
═══════════════════════════════════════════════

(Apenas pros tiers Profissional/Empresarial conforme cadência)

Data sugerida: [DATA]
Pauta: [revisão dos processos do mês + decisão sobre a sugestão acima]

═══════════════════════════════════════════════

Qualquer coisa, tô no WhatsApp.

— Felipe Garcia
Real Vision
```

---

## Template 6 — E-mail de pós-venda (D+7 após implementação)

Enviado 7 dias após a implementação pra checar se o cliente tá conseguindo delegar.

```
Assunto: Como tá indo seu Sócio Digital, [Nome]?

Oi [Nome],

Faz uma semana que a gente implementou seu Sócio Digital. Quero saber como tá indo:

1. Você conseguiu delegar pelo menos 3 tarefas pra ele essa semana?
2. Tá conseguindo perguntar do jeito certo (sem ficar frustrado com a resposta)?
3. Tem alguma tarefa que você queria que ele fizesse e ainda não tá rolando?

Se quiser, marca 15 minutos comigo aqui [link calendário] que a gente destrava qualquer coisa.

Lembra que você tem [Xh] de suporte/mês no seu plano. Eu prefiro usar isso agora no começo, quando faz mais diferença.

Abraço,
Felipe
Real Vision
[whatsapp]
```

---

## Template 7 — Pesquisa de NPS (D+90 e depois trimestral)

Enviado por e-mail aos 90 dias e depois a cada 90 dias.

```
Assunto: [Cliente] — pergunta rápida sobre seu Sócio Digital

Oi [Nome],

Faz 90 dias que seu Sócio Digital tá rodando. Quero uma resposta honesta:

De 0 a 10, o quanto você indicaria o Sócio Digital pra um amigo dono de empresa?

[botão 0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [botão 10]

(opcional) Por quê?
[textarea]

Sua resposta vale ouro pra gente melhorar.

Abraço,
Felipe
```
