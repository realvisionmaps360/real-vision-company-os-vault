---
name: awesome-claude-skills
description: Princípios de comunicação e fluxo de trabalho entre desenvolvedores humanos e agentes de IA.
---

# 🤖 Awesome Claude & Agent Workflows

Este playbook orienta como otimizar o fluxo de trabalho com agentes de IA (como Claude, Gemini, Antigravity e Lovable), extraindo o máximo de qualidade de código, clareza lógica e prevenção de erros.

---

## 1. Princípios de Resolução de Problemas
* **Entendimento antes da Execução:** Antes de alterar arquivos de código, o agente de IA deve analisar as dependências, mapear a arquitetura e certificar-se do objetivo final do usuário.
* **Planejamento:** Para alterações complexas de arquitetura, estruturar um Plano de Implementação (`implementation_plan.md`) para revisão e aprovação prévia do usuário.
* **Raciocínio Modular:** Resolver os problemas de forma incremental, por componentes ou partes isoladas, reduzindo a complexidade de debug de builds quebrados.

---

## 2. Padrões de Qualidade de Código
* **Código Limpo e Autoexplicativo:** Escrever variáveis, funções e componentes com nomes claros e descritivos em inglês (padrão de desenvolvimento).
* **Preservação de Comentários:** Respeitar e manter intactos todos os comentários originais, documentações internas e cabeçalhos não afetados pela alteração.
* **Lints e Tipagem:** Sempre utilizar TypeScript com tipagens estritas. Corrigir erros de compilação ou lints imediatamente.

---

## 3. Comunicação Eficiente (Pair Programming)
* **Respostas Concisas:** Manter o diálogo direto e focado no problema técnico, sem explicações redundantes ou prolixas.
* **Transparência de Limitações:** Caso o agente não tenha acesso a alguma API ou arquivo, expor o problema de forma clara e propor alternativas ou comandos de diagnóstico.
* **Rastreabilidade:** Usar links absolutos clicáveis em relatórios de modificações para facilitar a navegação do desenvolvedor pelos arquivos alterados.
