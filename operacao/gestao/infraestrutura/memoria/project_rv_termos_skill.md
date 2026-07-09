---
name: project-rv-termos-skill
description: Skill rv-termos criada para consultar os Termos de Serviço gerais da Real Vision — mapa de cláusulas para problemas com clientes e checagem antes de propostas
metadata: 
  node_type: memory
  type: project
  originSessionId: ed149155-8ccb-44b0-9212-ec894c8664da
---

Skill `rv-termos` criada em 19/06/2026. Funciona como consultor jurídico interno — dado um problema ou situação com cliente, aponta a cláusula exata dos Termos de Serviço e orienta como comunicar.

**Termos de Serviço salvos em:**
- `operacao/comercial/GENERAL-TERMS-CONDITIONS-v1.1-EN.md` (inglês — clientes internacionais)
- `operacao/comercial/TERMOS-E-CONDICOES-GERAIS-v1.1-PT.md` (português — clientes brasileiros)

**Skill em:** `C:\Users\Computador\.claude\skills\rv-termos\SKILL.md`

**Dois modos:**
- Modo problema: cliente sumiu, mudou escopo, atrasou pagamento, questiona propriedade → skill aponta cláusula
- Modo proposta: antes de enviar proposta, confirmar cobertura dos termos

**Nota:** "rv-contrato" ficou reservado para o sistema de contratos individuais de clientes (a ser criado).

**Why:** Felipe precisava de um atalho para consultar os Termos de Serviço em situações de conflito ou negociação sem ter que abrir o arquivo e ler 16 seções manualmente.

**How to apply:** Sempre que Felipe mencionar problema com cliente, cancelamento, disputa de propriedade, atraso de pagamento, mudança de escopo ou palavras "termos"/"cláusula"/"responsabilidade", ativar a skill rv-termos.
