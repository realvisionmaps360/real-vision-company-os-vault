# Skill Sync Process — Hermes ↔ Vault

> **Regra de ouro:** O vault é o repositório permanente e versionado. O Hermes lê via symlink. Nunca os dois soltos.

## Arquitetura

```
VAULT (source of truth)
  /workspace/real-vision-company-os-vault/skills/<skill-name>/
    ├── SKILL.md
    ├── references/
    └── scripts/

HERMES (leitura via symlink)
  ~/.hermes/skills/real-vision/<categoria>/<skill-name>/
    └── → symlink apontando pro vault
```

## Fluxo para criar uma skill nova

1. **Criar o arquivo físico no vault primeiro**
   ```bash
   mkdir -p /workspace/real-vision-company-os-vault/skills/<skill-name>
   # Escrever SKILL.md com frontmatter YAML (name, description obrigatórios)
   ```

2. **Criar o symlink no Hermes**
   ```bash
   mkdir -p ~/.hermes/skills/real-vision/<categoria>/<skill-name>
   rm -rf ~/.hermes/skills/real-vision/<categoria>/<skill-name>
   ln -s /workspace/real-vision-company-os-vault/skills/<skill-name> \
         ~/.hermes/skills/real-vision/<categoria>/<skill-name>
   ```

3. **Verificar que carrega**
   ```bash
   skill_view(name="real-vision/<categoria>/<skill-name>")
   ```

## Exceções (skills que ficam SÓ no Hermes)

Skills que são **infraestrutura específica do Hermes** e não fazem sentido como nota do Company OS:
- `prompt-improver` — hooks do Claude Code
- `memory-loader` — contexto de sessão do Hermes
- `obsidian-cli-test` — teste interno
- `proposta-comercial`, `rv-aquisition`, `visionflow-file-attachments` — Hermes-only

Essas skills **não** ganham symlink e **não** precisam de entrada no vault.

## Fluxo para editar uma skill existente

1. Editar o arquivo no vault (via Obsidian no Windows ou diretamente no Linux)
2. Commit + push no GitHub
3. `vault-sync.sh` (ou git pull manual) → atualiza o clone
4. Symlink do Hermes aponta pra versão nova **automaticamente**
5. **Não precisa copiar nada, não precisa rodar script de sync**

## O que NÃO fazer

- ❌ Criar skill nova direto em `~/.hermes/skills/` sem criar no vault primeiro
- ❌ Copiar skill do vault pro Hermes em vez de criar symlink
- ❌ Editar os dois lados independentemente (cria drift)
- ❌ Apagar o arquivo no vault — se o symlink quebrar, a skill some

## Verificação periódica

```bash
# Listar symlinks quebrados
find ~/.hermes/skills/real-vision -type l ! -exec test -e {} \; -print
```

## Histórico

- **2026-07-17**: Migração vault→Hermes concluída. 35 skills symlinkadas, 24 skills mantidas como reais (pendentes de merge manual). Regra documentada neste arquivo.