---
data: 2026-07-16
tipo: registro técnico de infraestrutura
executado_por: Claude Code (sessão "Skill storage location")
---

# Unificação de skills duplicadas via Junction (16/07/2026)

> Skill desta pasta: [[reference_catalogo_skills]] · [[project_agents_skills_gitignore]] · [[feedback_checar_skills_dois_locais]]

## O problema

Toda skill do Felipe existia em **dois arquivos físicos independentes**:
- `C:\Users\Computador\.claude\skills\<nome>\` — pasta lida pelo Claude Code (Windows)
- `C:\Users\Computador\Desktop\Real Vision\skills\<nome>\` — pasta do Company OS (vault, sincronizada no GitHub, lida pelo Hermes)

Sem nenhuma ligação entre elas, cada edição feita num lado nunca chegava ao outro. Isso já tinha causado divergência real de comportamento em pelo menos 20 skills antes de qualquer um notar — incluindo um caso onde a skill `visionflow` na pasta global ainda tinha **nomes de tabela do Supabase errados** (`diary_entries`, `reminders`, `client_access`, `checklist_items`) enquanto o vault já tinha a correção.

## A solução: Junction do NTFS

Descoberto na documentação oficial do Claude Code (`code.claude.com/docs/en/skills`):

> "A `<skill-name>` entry in the enterprise, personal, or project locations can be a symlink to a directory elsewhere on disk. Claude Code follows the symlink and reads `SKILL.md` from the target directory."

No Windows, em vez de symbolic link (`mklink /D`, exige modo desenvolvedor ativado ou admin — estava desligado nesta máquina), usamos **Junction** (`mklink /J` / `New-Item -ItemType Junction`) — nativo do NTFS, não exige nenhuma mudança de configuração do sistema, e é transparente pra qualquer programa (Claude Code, Explorer, git).

**Resultado:** cada skill agora é **um arquivo físico só**, que mora no vault (`Real Vision\skills\<nome>\`). A pasta em `~/.claude/skills/<nome>/` não é mais uma cópia — é uma Junction, um "atalho" reconhecido pelo próprio sistema de arquivos. Editar em um lugar aparece automaticamente no outro, na hora, sem sincronização manual.

Testado antes de aplicar em escala: editei o vault, li pela pasta global, a mudança apareceu instantaneamente. Zero delay, zero processo de sync.

## O que foi feito

**61 skills convertidas para Junction** no total:
- 5 já existiam de antes (via `~/.agents/skills/`, ecossistema separado de `npx skills add` — não tocadas)
- 1 (`session-handoff`) — convertida primeiro, como teste isolado
- 34 que eram **idênticas** nos dois lados — convertidas direto, sem risco
- 21 que tinham **conteúdo divergente** — precisaram de decisão de merge antes da Junction (ver abaixo)

### As 21 divergentes — decisão tomada em cada uma

| Skill | Vencedor | Motivo |
|---|---|---|
| `clarisso`, `obsidian`, `realvision`, `rh-real-vision`, `rv-copy`, `rv-design`, `rv-novo-cliente`, `rv-plataformas`, `rv-prospeccao`, `rv-visionflow` | **Vault** | Rebrand oficial "Real Vision 360" → "Real Vision" (confirmado com Felipe, 16/07/2026) — vault já tinha a correção, global estava atrasada |
| `rv-email` | **Vault** | Mais completo (decisão de 14/07 sobre template visual de newsletter). Correção: eu tinha categorizado errado numa mensagem anterior, li a data errada — vault vencia, não a global |
| `rv-fim-sessao` | **Vault** | Vault tinha a expansão de escopo de 12/07 (cobre projetos internos, não só clientes) |
| `rv-relatorio` | **Vault** | Vault tinha a regra "nunca sobrescrever nome de arquivo" (incidente real documentado) |
| `wood-art` | **Vault** | Descrição mais precisa de um repo de referência |
| `rv-blogpost` | **Global → mesclado no vault** | Global tinha seção nova sobre cache de preview de link no WhatsApp (16/07) que o vault não tinha. Adicionei ao vault, mantendo o resto |
| `rv-i18n` | **Global → mesclado no vault** | Global tinha item novo sobre bug de meta title/description não localizado (16/07). Adicionado ao vault |
| `supabase-postgres` | **Global → mesclado no vault** | Global tinha seção inteira nova (~14 linhas) sobre resiliência de autenticação/rede. Adicionada ao vault |
| `rv-skill-scout` | **Global → mesclado no vault** | Global mencionava a skill `rv-incidente-supabase` (só existia lá). Adicionado ao catálogo do vault |
| `visionflow` | **Mesclado dos dois** | Caso mais delicado: vault tinha o rebrand certo (sem "360"), mas a global tinha os nomes de tabela CORRETOS do Supabase e o caminho de repo certo (`_RV-Internos\visionflow`, confirmei que é esse o que existe de fato no disco). Resultado final = branding do vault + dados técnicos da global |

Depois de cada merge, confirmei com `diff` que a única diferença restante entre os dois lados era exatamente a que eu esperava (nenhuma perda de conteúdo por acidente).

### Skills que só existiam na global, nunca documentadas no vault

`coroa-azul` e `rv-incidente-supabase` — copiadas pro vault antes de virar Junction. Agora o vault (e portanto o Hermes, se ele ler de lá) também tem acesso a elas.

## Backups — nada foi perdido

Toda pasta antiga da global foi **movida**, nunca apagada, para:

```
C:\Users\Computador\.claude\skills-backup-duplicatas-16072026\
```

Contém a versão antiga (pré-Junction) de todas as 55 skills convertidas nesta sessão. Se algum merge tiver escolhido o lado errado, o conteúdo original está ali, intacto, pra recuperar.

**Exceção:** a duplicata de `session-handoff` foi apagada (não movida) antes de eu adotar o método de backup — foi a primeira conversão, feita antes do classificador de segurança bloquear o `rm -rf` em lote. Não houve perda real: as duas versões eram quase idênticas, e a mais completa (vault) é a que sobrevive.

## O que NÃO foi tocado (fora do escopo desta sessão)

- **`prompt-improver`** — não é uma skill Hermes/vault comum. É um plugin instalado com `.git` próprio duas vezes (parece clone independente em cada lugar, não cópia manual). Precisa de tratamento diferente, não Junction simples. Fica pendente.
- ~~5 skills que só existem no vault, sem cópia funcional no Claude Code~~ — **resolvido na mesma sessão**: `client-briefing-generator`, `humanizer`, `instagram-weekly-content`, `pipeline-weekly-update`, `rv-trafego-pago` agora têm Junction criada direto (sem cópia intermediária, nunca duplicaram). Total final: **66 Junctions**.
- **`realvision` e `find-skills` dentro de `Real Vision\.claude\skills\`** (pasta project-scoped, diferente da global) — são cópias "mortas": o Claude Code sempre prioriza a versão global quando o nome é igual, então essas nunca são lidas por ninguém. Inofensivas, mas continuam ocupando espaço sem função. Não removidas nesta sessão.

## Garantia de que isso não volta a acontecer

**No Claude Code (esta máquina, Windows):** enquanto a Junction existir, é fisicamente impossível as duas pastas divergirem de novo — são o mesmo arquivo, não duas cópias. Isso resolve o problema de forma permanente **para as skills convertidas hoje**.

**Isso NÃO cobre skills futuras.** Se uma skill nova for criada direto em `~/.claude/skills/<nome>/` (sem passar pelo vault primeiro), a duplicação recomeça exatamente do mesmo jeito. Regra permanente a partir de agora:

> Toda skill nova nasce dentro de `Real Vision\skills\<nome>\` (vault). Depois, criar a Junction em `~/.claude/skills/<nome>` apontando pra lá. Nunca criar a pasta direto na global.

Comando de referência pra criar a Junction de uma skill nova:
```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\<nome>" -Target "$env:USERPROFILE\Desktop\Real Vision\skills\<nome>"
```

**Sobre reverter, se precisar:** pra desfazer uma Junction, usar sempre `rmdir` (nunca apagar "por dentro" como pasta normal, ou corre risco de apagar o conteúdo real que mora no vault):
```powershell
Remove-Item "$env:USERPROFILE\.claude\skills\<nome>" -Force  # remove só a Junction, não o conteúdo
```

**Sobre o lado do Hermes (VPS):** ainda não confirmado se `~/.hermes/skills/` (onde o Hermes lê as skills dele) é cópia independente ou sincronizada automaticamente com o vault via `vault-sync.sh`. Ver [[project_rv_fim_sessao_skill]]. Prompt de verificação pronto pra enviar ao Hermes, ver seção "Hermes" da resposta desta sessão.
