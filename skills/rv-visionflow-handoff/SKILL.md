---
name: rv-visionflow-handoff
description: Handoff técnico do VisionFlow — roadmap, próximos passos e pendências do CRM interno da Real Vision 360. Use quando Felipe precisar retomar o desenvolvimento do VisionFlow após uma pausa, ou quando houver mudança de contexto entre sessões de código do VisionFlow.
---

# Skill: rv-visionflow-handoff

**Data:** 28/06/2026  
**Versão:** 1.0  
**Função:** Gerar handoff estruturado de sessão de cliente para copiar/colar em Observações do VisionFlow

---

## O que é

Skill que **captura o contexto de uma sessão de trabalho com um cliente** e gera um **texto estruturado** pronto pra copiar/colar no campo de Observações do VisionFlow.

Quando esse texto é colocado em Observações e Felipe clica "Analisar com IA", a IA do VisionFlow processa e gera automaticamente cards nas abas certas (Diário, Tarefas, Status, etc.).

---

## Invocação

```bash
/rv-visionflow-handoff
# ou
/rv-visionflow-handoff "Modular Festival"
# ou
/rv-visionflow-handoff modular-festival
```

Se nenhum cliente for passado, a skill **infere do contexto da conversa**.

---

## Regra Principal — O que VAI e o que NÃO VAI para o VisionFlow

**VisionFlow é gestão de relacionamento com cliente.** Só entra o que é relevante para acompanhar o cliente — não é repositório técnico nem espelho da documentação interna.

### VAI para o VisionFlow
- `STATUS` — mudança de situação do projeto/cliente
- `ENTREGA` — o que foi entregue **ao cliente** ou está pronto para ele ver
- `COMUNICACAO` — decisões acordadas com o cliente, mensagens recebidas/enviadas
- `TAREFA` — próximas ações que envolvem pessoas (Felipe, Romana, o cliente)
- `FINANCEIRO` — valores novos discutidos/acordados (só quando for informação nova, não histórico já documentado)

### NÃO VAI para o VisionFlow
- Skills criadas, arquivos gerados, documentos internos criados na sessão
- Histórico financeiro que já está registrado em documentos
- Detalhes técnicos de código (branches, commits, estrutura de arquivos)
- Observações internas de qualidade ("reviews são placeholders", "Impressum incompleto") — essas ficam no doc do cliente
- Qualquer coisa que já está em RELATORIO.md, TIMELINE.md ou AUDITORIA.md

**Regra de ouro:** se a informação é útil para Felipe lembrar como está o relacionamento com o cliente — vai. Se é detalhe de execução que já está documentado em arquivo — fica lá.

---

## Como Funciona

### 1️⃣ Contexto da Sessão
A skill lê tudo o que foi conversado nesta sessão sobre um cliente e **filtra** o que é relevante para gestão de cliente:
- Que mudança de status aconteceu?
- O que foi entregue ou mostrado ao cliente?
- Que decisões foram acordadas com o cliente?
- Quais são as próximas ações que pessoas precisam tomar?

### 2️⃣ Estrutura em Observações
Transforma em texto estruturado com os tipos:
- `STATUS` — mudança de situação do cliente/projeto
- `ENTREGA` — o que foi construído/entregue (para o cliente ver)
- `COMUNICACAO` — o que foi acordado com o cliente
- `TAREFA` — próxima ação (com responsável e prazo se souber)
- `FINANCEIRO` — valor novo discutido (só se for novidade)

### 3️⃣ Texto Pronto
Retorna texto simples, direto, sem markdown excessivo. Felipe copia, cola em Observações do VisionFlow, clica "Analisar com IA".

---

## Formato de Saída

```
OBSERVACOES — [Cliente] | [Data]

[TIPO] [Resumo da ação]
[Contexto/detalhes da ação]
[Próximos passos, se houver]

[TIPO] [Resumo da ação]
[Contexto/detalhes]
```

### Exemplo Real: Modular Festival

```
OBSERVACOES — Modular Festival | 28/06/2026

[COMUNICACAO] Email de prospecção enviado
Email enviado para office@modularfestival.com com assunto "We'll be in Melchtal in September".
Propostas: Tour Virtual 360° + Sunbite (food bike).
Referência: Universo Paralello 18° como case similar.
Felipe e Romana estarão na Suíça em setembro — viabilidade real confirmada.
Próximo: Follow-up em 05/07/2026 se sem resposta.

[TAREFA] Follow-up agendado
Sem resposta até 05/07 → enviar mensagem de acompanhamento.
Prioridade: média.

[STATUS] Lead — esperando resposta
Cliente em análise. Qualificado para tour virtual + parceria.
```

---

## Quando Usar

- ✅ **No final de uma sessão de cliente** quando Felipe quer documentar o que foi feito
- ✅ **Antes de fechar conversa sobre um cliente** pra deixar tudo registrado
- ✅ **Para facilitar handoff** entre sessões — "o que a gente fez foi..."

**Não é para:**
- Análises retrospectivas (use `analyze` em vez disso)
- Relatórios formais (use `rv-relatorio` em vez)
- Documentação técnica (use `rv-documentation` em vez)

---

## Dicas de Uso

### 1. Deixe a IA inferir (mais rápido)
```bash
/rv-visionflow-handoff
```
Se Felipe conversou sobre um cliente, a skill **detecta automaticamente** qual é.

### 2. Seja explícito se houver ambiguidade
```bash
/rv-visionflow-handoff "Casa dos Cajus"
```

### 3. Resultado será texto puro
Copia tudo → Cola no VisionFlow em "Observações" → Clica "Analisar com IA" → Cards aparecem.

---

## Dentro do VisionFlow

Depois de colar o texto em Observações e salvar:

1. Clique no botão azul **[Analisar com IA]**
2. Aguarde alguns segundos
3. Cards aparecem em **Insights** (aba abaixo)
4. Revise cada card
5. Clique **Aprovar** para gravar

---

## Exemplos de Handoffs

### Exemplo 1: Proposta Finalizada
```
/rv-visionflow-handoff solarium-aarau

OBSERVACOES — Solarium Aarau | 28/06/2026

[ENTREGA] Proposta comercial finalizada
Proposal entregue via email em 28/06.
Arquivo: Proposta_SolariumAarau_Jun2026.pdf
Serviços: Website + Tour 360°
Valor: CHF 8.500
Status: Aguardando assinatura do cliente.
Próximo: Follow-up em 02/07 se sem resposta.

[TAREFA] Preparar contrato
Será necessário após aprovação da proposta.
Prazo: assim que Gabriel assinar.
```

### Exemplo 2: Pagamento Recebido
```
/rv-visionflow-handoff "Casa dos Cajus"

OBSERVACOES — Casa dos Cajus | 28/06/2026

[FINANCEIRO] Pagamento recebido
Valor: R$ 2.500
Referência: Website + Google Meu Negócio
Data: 28/06/2026
Método: Transferência
Status: Confirmado no banco em 15:30.

[STATUS] Primeira parcela paga
Cliente em dia. Próxima parcela: 30/07/2026.

[TAREFA] Iniciar desenvolvimento do website
Contrato assinado. Onboarding agendado para 02/07.
```

### Exemplo 3: Reunião de Brainstorm
```
/rv-visionflow-handoff paraty-onboard

OBSERVACOES — Paraty Onboard | 28/06/2026

[COMUNICACAO] Reunião de briefing — website
Discussão sobre identidade visual da pousada.
Decidido: paleta neutra (branco/madeira/verde).
Referências: 3 sites de pousadas analisados.
Eduardo aproveu direction criativa.

[OBSERVACAO] Próximas etapas
Eduardo enviará fotos do local em 30/06.
Design mockup será apresentado em 03/07.
Prazo final: website ao vivo em 15/07.

[TAREFA] Revisar fotos e começar design
Aguardando assets do cliente. Começa assim que chegar.
```

---

## Troubleshooting

### "A IA do VisionFlow não processou meu texto"
→ Certifique-se de ter clicado **"Analisar com IA"** depois de salvar as observações.

### "Os cards que aparecem estão errados"
→ Normal! Revise cada card antes de aprovar. A IA consegue melhorar com ajustes.

### "Quero editar o handoff antes de colar"
→ A skill retorna texto — você consegue copiar e **editar manualmente** antes de colar no VisionFlow.

### "Preciso adicionar mais informações ao handoff"
→ Você consegue adicionar manualmente depois. Ou roda a skill de novo com mais contexto.

---

## Integração com Fluxo VisionFlow

```
Sessão de Trabalho com Cliente
       ↓
/rv-visionflow-handoff
       ↓
Texto estruturado gerado
       ↓
Felipe copia
       ↓
Cola em "Observações" do VisionFlow
       ↓
Salva observações
       ↓
Clica "Analisar com IA"
       ↓
IA processa e gera propostas
       ↓
Cards aparecem em "Insights"
       ↓
Felipe aprova cada card (ou "Aprovar tudo")
       ↓
Dados gravam nas tabelas certas
       ↓
✅ Informações aparecem em todas as abas
   (Diário, Tarefas, Calendário, Dados, etc.)
```

---

## Futuro

- [ ] Acionamento automático: skill é acionada quando Felipe sai de uma sessão de cliente
- [ ] Integração UI: botão direto no VisionFlow
- [ ] Variações: handoff comprimido vs. detalhado
- [ ] Export: gerar PDF do handoff

---

*Skill criada em 28/06/2026*
*Versão 1.0 — Simples, rápida e efetiva*
