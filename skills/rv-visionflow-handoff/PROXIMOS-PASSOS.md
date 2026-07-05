# Próximos Passos: Usar a Skill `rv-visionflow-handoff`

**Skill:** Pronta para usar ✅  
**Data:** 28/06/2026

---

## ✅ Checklist para Começar

### 1. Entender como funciona (5 min)
- [ ] Ler `SKILL.md` (guia completo)
- [ ] Ler `exemplo-uso.md` (passo a passo real)

### 2. Teste com um cliente real (5-10 min)
- [ ] Escolha um cliente pra testar
- [ ] Ao final de uma conversa sobre esse cliente, digita:
  ```bash
  /rv-visionflow-handoff
  ```
- [ ] Skill retorna texto estruturado
- [ ] **Copia** o texto

### 3. Cola no VisionFlow (2 min)
- [ ] Abre https://visionflow.realvisionmaps.com
- [ ] Abre ficha do cliente
- [ ] Cola o texto em **Observações**
- [ ] Clica **[Salvar observações]**

### 4. Analisa com IA (1 min)
- [ ] Clica **[Analisar com IA]**
- [ ] Aguarda alguns segundos

### 5. Aprova os cards (2-5 min)
- [ ] Seção **Insights** aparece com propostas
- [ ] Para cada card:
  - [ ] Revisa se está correto
  - [ ] Clica **[Aprovar]** (ou **[Editar]** se precisar ajustar)
- [ ] Ou clica **[Aprovar tudo]** se estiver tudo ok

### 6. Validação final (1 min)
- [ ] Abre as abas do cliente (Diário, Tarefas, Status, etc.)
- [ ] Verifica se as informações aparecem corretamente

---

## 🎯 Casos de Uso Imediatos

### Modular Festival (caso da sessão)
```bash
/rv-visionflow-handoff "Modular Festival"
```
→ Gera handoff do que foi trabalhado

### Próximo cliente que você atender
```bash
/rv-visionflow-handoff
```
→ Detecta cliente automaticamente

### Qualquer cliente qualquer hora
```bash
/rv-visionflow-handoff "Casa dos Cajus"
```
→ Gera handoff da sessão atual

---

## 📋 Estrutura que Será Gerada

Quando você chamar a skill, receberá algo assim:

```
OBSERVACOES — [Nome do Cliente] | [Data]

[TIPO] [Resumo]
[Contexto/detalhes]
[Próximos passos]

[TIPO] [Resumo]
[Contexto]
```

**Tipos que podem aparecer:**
- `COMUNICACAO` — email, call, mensagem
- `ENTREGA` — arquivo, serviço pronto
- `FINANCEIRO` — valor, pagamento
- `STATUS` — mudança de pipeline
- `TAREFA` — ação futura
- `OBSERVACAO` — contexto, anotação

---

## ⚡ Comando Rápido

Simplesmente digita no final da sessão:

```bash
/rv-visionflow-handoff
```

E segue os 5 passos acima.

---

## 📞 Ajuda/Dúvidas

Se algo não funcionar:
1. Releia `SKILL.md` — seção "Troubleshooting"
2. Consulte `exemplo-uso.md` — passo a passo real
3. Verifique se o cliente existe no VisionFlow

---

## 🔄 Loop de Iteração

1. Skill em desenvolvimento (hoje ✅)
2. Teste com 1-2 clientes reais (próximos dias)
3. Feedback → Ajustes (se necessário)
4. Uso rotineiro em todas as sessões (próximas semanas)

---

## 📝 Dicas

✅ **Deixe a IA inferir cliente** se possível (mais rápido)  
✅ **Contexto maior = handoff melhor** — quanto mais você conversar, melhor a IA entende  
✅ **Sempre aprove manualmente** — você está no controle  
✅ **Reutilize em próximas sessões** — o histórico acumula e fica mais rico  

---

## 🎬 Vamos Começar?

**Próximo passo:** Chame a skill agora com um cliente real.

Depois volte e valide se funcionou. Qualquer ajuste, a gente faz.

---

*Pronto pra usar — boa sorte! 🚀*
