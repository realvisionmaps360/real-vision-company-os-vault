# Exemplo Prático: Como Usar rv-visionflow-handoff

**Cenário:** Felipe acabou de terminar uma sessão de trabalho com o cliente "Modular Festival"

---

## Passo a Passo

### 1. Sessão com Cliente (essa conversa)

Felipe conversa comigo sobre Modular Festival:
- Análise do briefing
- Estrutura da proposta
- Discussão sobre tour virtual 360°
- Próximos passos agendados

(Essa é a conversa que estamos tendo AGORA)

---

### 2. Ao Final da Sessão

Felipe digita:
```
/rv-visionflow-handoff
```

Ou (se houver ambiguidade):
```
/rv-visionflow-handoff "Modular Festival"
```

---

### 3. Eu Gero o Handoff

Analiso o contexto da sessão e retorno:

```
OBSERVACOES — Modular Festival | 28/06/2026

[COMUNICACAO] Email de prospecção enviado
Email enviado para office@modularfestival.com em 28/06/2026 com assunto "We'll be in Melchtal in September".
Propostas apresentadas: Tour Virtual 360° + Sunbite (food bike da Romana).
Referência enviada: Universo Paralello 18° como case de sucesso em festivais psytrance.
Contexto: Felipe e Romana estarão na Suíça em setembro — viabilidade logística confirmada.
Próximo passo: Follow-up em 05/07/2026 se sem resposta do festival.

[TAREFA] Follow-up agendado para Modular Festival
Sem resposta até 05/07 → enviar mensagem de acompanhamento para office@modularfestival.com.
Prioridade: média (não urgente, mas importante pra qualificação).

[STATUS] Lead — esperando resposta do cliente
Festival qualificado para tour virtual. Proposta com viabilidade real.
Status mudou para: Lead (em análise).

[OBSERVACAO] Documentação do caso Modular Festival
Relatório completo em: operacao/clientes/arquivos/Modular Festival/RELATORIOS.md
AGB (Termos) disponível em: modularfestival.com/agb
Festival é underground/alternativo, similar ao Universo Paralello no Brasil.
```

---

### 4. Felipe Copia o Texto

Seleciona tudo acima e copia (Ctrl+C).

---

### 5. Vai pro VisionFlow

Abre o VisionFlow: https://visionflow.realvisionmaps.com/clientes/modular-festival

---

### 6. Cola em Observações

Clica no campo de **Observações** e cola o texto (Ctrl+V):

```
[tela do VisionFlow mostrando o campo preenchido]
```

---

### 7. Salva as Observações

Clica no botão **[Salvar observações]**

---

### 8. Clica em "Analisar com IA"

Aparece um botão azul **[Analisar com IA]** abaixo das observações.

Felipe clica nele.

---

### 9. IA Processa (alguns segundos)

A Edge Function `analyze-notes` no Supabase:
1. Lê o texto das observações
2. Envia pra Claude (IA do VisionFlow)
3. Claude detecta as informações estruturadas
4. Gera propostas de cards

---

### 10. Cards Aparecem em "Insights"

Abaixo aparece a seção **"Atualizações sugeridas pela IA"** com 4 cards:

#### Card 1 — Comunicação
```
📅 ACTIVITIES
Email enviado para office@modularfestival.com
Type: communication | Polarity: positive
Payload: {
  "title": "Email enviado para office@modularfestival.com",
  "description": "Email de prospecção...",
  "type": "communication"
}
```

#### Card 2 — Tarefa
```
📋 TASKS
Follow-up: Modular Festival
Due: 05/07/2026 | Priority: média
Payload: {
  "title": "Follow-up: Modular Festival",
  "description": "Sem resposta até 05/07...",
  "due_date": "2026-07-05",
  "priority": "media"
}
```

#### Card 3 — Status
```
👤 CLIENTS
Status → Lead (esperando resposta)
Operation: update
Payload: {
  "status_pipeline": "Lead - esperando resposta"
}
```

#### Card 4 — Observação
```
📌 ACTIVITIES (Observação)
Documentação do caso Modular Festival
Type: internal
Payload: {
  "type": "internal",
  "description": "[Full context do caso]"
}
```

---

### 11. Felipe Revisa e Aprova

Para cada card:
- [ ] Lê o que a IA sugeriu
- [ ] Se tiver erro, clica **[Editar]** e corrige
- [ ] Clica **[Aprovar]**

Ou clica **[Aprovar tudo]** se estiver ok.

---

### 12. Cards Gravam no Banco

Cada aprovação executa:
- Activity criada no Diário
- Task criada em Tarefas
- Clients atualizado (status)
- Activity adicionada em Observações (contexto)

---

### 13. Resultado Visual

Quando Felipe abre a ficha de Modular Festival depois:

**Aba Diário:**
```
28/06 — Email enviado para office@modularfestival.com
        [tour 360° + sunbite propostos]

28/06 — Documentação do caso Modular Festival
        [full context aqui]
```

**Aba Tarefas:**
```
Follow-up: Modular Festival
Due: 05/07/2026 | Priority: média
Status: aberta
```

**Aba Calendário:**
```
05/07 — Follow-up: Modular Festival
```

**Aba Dados:**
```
Status Pipeline: Lead - esperando resposta
```

---

## Vantagens Desse Workflow

✅ **Uma ação = múltiplos registros** — ao invés de entrar em 4 abas diferentes

✅ **Documentação automática** — contexto completo fica registrado

✅ **Rastreável** — Felipe consegue ver exatamente o que foi processado

✅ **Controlado** — Felipe aprova ANTES de qualquer coisa gravar

✅ **Rápido** — tudo em 2-3 minutos (conversa + handoff + colar + aprovar)

---

## Próxima Vez

Na próxima sessão com Modular Festival (quando responderem ou quando Felipe quiser fazer follow-up), ele faz:

```
/rv-visionflow-handoff "Modular Festival"
```

E o novo handoff é gerado com o contexto daquela nova sessão, completando o histórico.

---

*Workflow completo — prático, eficiente, controlado*
