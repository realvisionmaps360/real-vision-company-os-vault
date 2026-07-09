---
name: project_rv_contrato_skill
description: Skill rv-contrato (Real Vision Contract Manager) — gera contratos de cliente em PDF a partir do template oficial + Termos anexados; templates salvos no Company OS
metadata: 
  node_type: memory
  type: project
  originSessionId: 4166f468-aef4-4b88-b1b4-07235ecee8fb
---

Criada em 19/06/2026 a skill **rv-contrato** (Real Vision Contract Manager), em `~/.claude/skills/rv-contrato/`. Gatilho: "We have a new client" / "temos um novo cliente" → coleta dados → revisão pré-contrato (OK do Felipe) → gera PDF → salva em **dois lugares**: `operacao/comercial/contratos/` e a pasta do cliente.

**Templates oficiais salvos** em `operacao/comercial/` (v1.0, junho 2026, pareiam com Termos v1.1):
- `SERVICE-AGREEMENT-TEMPLATE-v1.0-EN.md` (verbatim, como o Felipe enviou)
- `CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md` (tradução fiel — pendente revisão do Felipe)

**Design:** capa azul-marinho limpa (sem foto) + miolo branco legível + filetes laranja nas seções. Reusa o pipeline do [[project_rv_relatorio_skill]] — `render.ps1` (Chrome headless, `--user-data-dir`) copiado para `assets/`, mesmos logos/tokens. Template HTML flui e o Chrome pagina sozinho (contrato tem tamanho variável). **Anexo A:** os Termos vão sempre anexados ao final (mesmo idioma, com carimbo de versão) — resolve o maior risco jurídico (anexar, não só referenciar).

**Regras duras codificadas:** nunca criar do zero, nunca remover seções, só serviços selecionados, condições especiais só na §12, Termos sempre anexados, não inventar dados, checkpoint humano antes de gerar.

**Pendências (NÃO inventar):** dados da Real Vision como contratante — `RV_CNPJ`, `RV_ADDRESS`, `RV_REPRESENTATIVE`, `RV_SIGNATORY` — ainda não estão no Company OS; pedir ao Felipe na 1ª geração real. Melhorias jurídicas (multa/juros por atraso, rescisão/kill-fee, indenização, cláusula GDPR p/ clientes UE/Suíça) ficaram **deferidas** como possível v1.1 do contrato — decisão à parte, não alterar o template sozinho.

Relação: consulta de cláusulas = [[project_rv_termos_skill]]; proposta vem antes = proposta-comercial. Detecção de gap jurídico veio da revisão em [[feedback_analise_antes_executar]].
