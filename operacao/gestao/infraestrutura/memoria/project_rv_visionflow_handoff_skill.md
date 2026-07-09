---
name: skill-rv-visionflow-handoff-handoff-estruturado-de-cliente
description: Skill CLI que gera texto estruturado de sessão de cliente para copiar/colar em Observações do VisionFlow
metadata: 
  node_type: memory
  type: project
  originSessionId: 9f3e3d5a-a44a-4ff3-90a0-4c105cce3a32
---

## O que é

Skill `rv-visionflow-handoff` que **captura contexto de uma sessão de trabalho com cliente** e gera um **texto estruturado pronto pra copiar/colar** no campo de Observações do VisionFlow.

Quando esse texto é colocado em Observações e Felipe clica "Analisar com IA", a IA do VisionFlow processa e **gera automaticamente cards** nas abas certas (Diário, Tarefas, Status, etc.).

## Invocação

```bash
/rv-visionflow-handoff
# ou
/rv-visionflow-handoff "Modular Festival"
```

## Como Funciona

1. **Lê contexto da sessão atual** (conversa com Felipe sobre um cliente)
2. **Identifica cliente alvo** (passado como argumento ou inferido)
3. **Estrutura em observações** com tipos: COMUNICACAO, ENTREGA, FINANCEIRO, STATUS, TAREFA, OBSERVACAO
4. **Retorna texto simples** (sem markdown) pronto pra copiar/colar

## Arquivo da Skill

`~/.claude/skills/rv-visionflow-handoff/SKILL.md` — contém guia completo de uso + exemplos

## Workflow Completo

```
Sessão de Cliente
    ↓
Felipe: /rv-visionflow-handoff
    ↓
Claude: retorna TEXTO ESTRUTURADO
    ↓
Felipe: copia e cola em Observações do VisionFlow
    ↓
Felipe: clica "Analisar com IA"
    ↓
IA do VisionFlow: processa e gera CARDS
    ↓
Cards: aparecem em "Insights"
    ↓
Felipe: aprova e TUDO GRAVA nas abas certas
✅ DONE
```

## Formato de Saída

```
OBSERVACOES — [Cliente] | [Data]

[TIPO] [Resumo]
[Contexto/detalhes]
[Próximos passos]

[TIPO] [Resumo]
[Contexto]
```

## Tipos Válidos

- **COMUNICACAO** — email, call, mensagem, comunicado
- **ENTREGA** — arquivo pronto, serviço completado
- **FINANCEIRO** — valor, pagamento, faturamento
- **STATUS** — mudança de pipeline, qualificação
- **TAREFA** — ação futura necessária
- **OBSERVACAO** — contexto/anotação importante

## Quando Usar

✅ No final de uma sessão de cliente pra documentar o que foi feito  
✅ Antes de fechar conversa para deixar tudo registrado  
✅ Para facilitar handoff entre sessões — "o que a gente fez foi..."

## Dependências

Nenhuma! A skill roda usando apenas:
- Contexto da conversa atual (já em memória)
- Lógica de análise de texto (integrada)

## Vantagens

✅ Uma ação = múltiplos registros (não precisa entrar em 4 abas diferentes)  
✅ Documentação automática (contexto completo fica registrado)  
✅ Rastreável (Felipe vê o que foi processado)  
✅ Controlado (Felipe aprova ANTES de qualquer coisa gravar)  
✅ Rápido (2-3 minutos total)

## Futuro

- Acionamento automático ao final de sessão de cliente
- Integração UI no VisionFlow (botão direto na ficha)
- Variações: handoff comprimido vs. detalhado
- Export: PDF do handoff

---

**Criada em:** 28/06/2026  
**Versão:** 1.0  
**Status:** Produção ✅
