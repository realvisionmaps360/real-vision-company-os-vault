# Máquinas de trabalho — o que tem instalado em cada notebook

Projetos da Real Vision (a Vila dos Corais primeiro) são tocados em **dois notebooks**.
Cada um tem ferramentas diferentes, e o que funciona num pode não funcionar no outro.
O Felipe avisa na conversa sempre que trocar de máquina; a sessão que começa deve abrir
este arquivo e conferir em qual está.

Criado em 11/09/2026. Colunas marcadas **a conferir** não foram medidas — preencher na
próxima vez que uma sessão rodar naquela máquina, em vez de supor.

---

## Regra de toda troca de máquina

1. **`git pull` no vault e no repositório do projeto antes de qualquer coisa.** Em
   11/09/2026 o vault do notebook da Romana estava dias atrás do outro: três conflitos, e
   três afirmações erradas escritas porque a sessão não enxergava o que tinha sido feito
   na outra máquina.
2. No PowerShell do Windows **não existe `&&`** para juntar comandos. Passar um comando
   por linha para o Felipe rodar.
3. Senha de teste e credencial ficam **fora do git**, em arquivo local de cada máquina —
   não se copiam sozinhas de uma para a outra.

---

## Comparativo

| | Notebook do Felipe | Notebook da Romana |
|---|---|---|
| Pasta do usuário | `C:\Users\Felipe Garcia\` | `C:\Users\Felip\` (usuário do Windows: `Romana`) |
| Sistema | a conferir | Windows 11 Home |
| Terminal | a conferir | PowerShell 5 (sem `&&`) + Git Bash |
| Node / npm | a conferir | Node 24.18.0 · npm 11.16.0 |
| Git | a conferir · identidade `Felipe GarciaPC <realvisionmaps360@gmail.com>` | Git 2.54.0 · **sem identidade global** — configurada só dentro do repo `viladoscorais` |
| Claude Code | a conferir | 2.1.191 |
| Python | a conferir | **não instalado** (o comando abre a Microsoft Store) |
| GitHub CLI (`gh`) | a conferir | não instalado |
| Vercel CLI | a conferir | não instalado |
| Supabase CLI | a conferir | não instalado |
| Navegador para a IA testar tela | **Claude in Chrome** (usado em 09 e 10/09). Playwright MCP estava fora do ar em 10/09. O redimensionar do Claude in Chrome falhou em 09/09 e funcionou em 10/09 | **Playwright** — `playwright-cli` 0.1.19 global e Playwright MCP, ambos funcionando. Celular (390px) e computador testados em 10/09 |
| Supabase pela IA (MCP) | enxerga o projeto da **Vila dos Corais** (`xcymehoyqppdgvrhytfj`) — foi daí que saíram as migrações e o usuário de teste | enxerga **só o Sunbite PDV**. Não enxerga o banco da Vila dos Corais |
| Skills | a conferir | Nenhuma skill da Real Vision registrada: todas são lidas direto de `real-vision-company-os-vault/skills/`. Locais: `mcp-install`, `motion-framer`, `playwright-cli`, `sunbite-pdv`, `sunbite-site` |
| Commit/push no vault pela IA | a conferir | **bloqueado** pela trava automática de permissão do Claude Code. O Felipe roda os comandos. No repositório do site o push funciona |
| Login de teste do painel | `TEMP/vila-corais-login-teste.txt` preenchido | `TEMP/vila-corais-login-teste.txt` existe, mas **sem a senha** — login feito pelo Felipe direto na janela do Playwright |

## Onde fica cada repositório

| | Notebook do Felipe | Notebook da Romana |
|---|---|---|
| Vault (Company OS) | a conferir | `Documents\BUSINESS\Real Vision\real-vision-company-os-vault` |
| Site da Vila dos Corais | a conferir | `Documents\BUSINESS\Real Vision\projetos\viladoscorais` (clonado em 10/09) |

## Consequência prática para a Vila dos Corais

- Tarefa que precisa **mexer no banco** da cliente (migração, usuário, consulta com
  permissão de dono): notebook do Felipe.
- Tarefa que precisa **testar tela no celular**: notebook da Romana é o mais confiável
  hoje.
- Tarefa de **só código de tela + push do site**: qualquer um dos dois.

## Relacionados

- Projeto: `LBOS/02-Projetos/vila-dos-corais/PROJETO.md`
- Timeline do cliente: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/Vila-dos-Corais-TIMELINE.md`
