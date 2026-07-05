---
name: superpowers
description: Ferramentas de diagnóstico, gerenciamento de ambiente local, controle de versão git e build.
---

# 🛠️ Superpowers (Git, Diagnostics & local environments)

Playbook para execução de rotinas administrativas locais, diagnóstico de erros de compilação, controle de versão Git e validações de build em ambientes locais ou de staging.

---

## 1. Controle de Versão (Git Workflow)
* **Checkpoints Claros:** Antes de iniciar modificações críticas ou após a conclusão de uma nova feature, realize commits com mensagens descritivas seguindo o padrão de commits convencionais (ex: `feat: add dynamic SEO helmet component`, `fix: correct image loading priorities`).
* **Verificação de Status:** Sempre monitore modificações não rastreadas (`git status`) para garantir que lixo de compilação não seja comitado acidentalmente.

---

## 2. Diagnóstico de Ambiente e Dependências
* **Verificação de Pacotes:** Se um componente quebrar por importações ausentes, verifique o `package.json` ou as versões instaladas usando gerenciadores de pacotes (como Bun, NPM ou Yarn).
* **Validação de Builds:** Sempre valide se o projeto compila sem erros executando comandos de build de produção (ex: `npm run build` ou `bun run build`) antes de finalizar tarefas. Isso previne que deploys na Vercel ou Netlify falhem.

---

## 3. Comandos Úteis de Terminal (Windows PowerShell)
* **Lista de Processos da Porta:** Se a porta de desenvolvimento (ex: 5173) estiver travada:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess
  ```
* **Limpeza de Cache de Módulos:**
  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```
