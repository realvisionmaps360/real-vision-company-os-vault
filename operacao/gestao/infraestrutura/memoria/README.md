# 🧠 Sistema de Memória Compartilhada — Real Vision 360

Hub centralizado de memórias e contexto que sincroniza entre:
- **Claude Code Local** (seu PC)
- **Hermes Agent** (VPS Hostinger na nuvem)
- Qualquer futuro agent que precisar de contexto Real Vision

## 📍 Localização

```
C:\Users\Computador\Desktop\Real Vision\operacao\gestao\infraestrutura\memoria\
```

## 📂 Estrutura

```
memoria/
├── README.md                ← este arquivo
├── MEMORY.md                ← índice de todas as memórias
├── .gitignore               ← configuração git
├── user/                    ← memórias sobre o usuário (Felipe)
├── feedback/                ← aprendizados e padrões (como trabalhar)
├── project/                 ← contexto de projetos e iniciativas
└── reference/               ← referências e links para recursos
```

## 🔄 Como sincronizar

### Local (seu PC)

Antes de cada sessão:
```bash
cd C:\Users\Computador\Desktop\Real Vision\operacao\gestao\infraestrutura\memoria
git pull origin main
```

Depois de cada sessão:
```bash
git add .
git commit -m "atualiza memórias — sessão [data]"
git push origin main
```

### VPS Hermes

Na nuvem (via SSH ou script):
```bash
cd ~/operacao/gestao/infraestrutura/memoria
git pull origin main
```

O Hermes acessa as memórias pelo caminho local no VPS (após clone inicial).

## 📝 Tipos de memória

| Tipo | Prefixo | Conteúdo |
|---|---|---|
| **user** | `user_*.md` | Perfil, preferências, idioma, contexto pessoal |
| **feedback** | `feedback_*.md` | Padrões de trabalho, o que funcionou/não funcionou |
| **project** | `project_*.md` | Iniciativas, projetos, status, próximos passos |
| **reference** | `reference_*.md` | Links, recursos, playbooks, referenciais |

**Exemplo de nome:** `feedback_skill_realvision_primeiro.md` (sempre carregar rv-skill antes de outras)

## 🎯 Como adicionar/atualizar

1. **Identificar tipo** — é sobre Felipe? feedback? projeto? referência?
2. **Criar arquivo** — `[tipo]_[descricao-em-kebab-case].md`
3. **Frontmatter YAML** — sempre começar com:
   ```md
   ---
   name: descricao-em-kebab-case
   description: Uma frase sobre o que essa memória armazena
   metadata:
     type: user | feedback | project | reference
   ---
   ```
4. **Atualizar MEMORY.md** — adicionar linha de índice:
   ```md
   - [Título Legível](arquivo.md) — breve descrição (~150 caracteres)
   ```

## 🔐 Segurança

- **Repo privado no GitHub:** apenas Felipe tem acesso
- **Histórico completo:** todas as versões preservadas em git
- **Sem dados sensíveis:** credenciais e secrets NUNCA vão aqui (use `.env` ou banco)
- **Sincronização automática:** PC ↔ VPS a cada commit

## 🔗 Integração com CLAUDE.md

O arquivo `CLAUDE.md` (instruções de projeto) referencia esta pasta assim:

```md
## Memórias Compartilhadas

Todas as memórias da Real Vision ficam em:
`operacao/gestao/infraestrutura/memoria/`

Sincronizam automaticamente entre Claude Code local e Hermes Agent (VPS).
Consulte `MEMORY.md` para o índice completo.
```

## 📊 Estado atual (09/07/2026)

- ✅ **87 arquivos** de memória migrados de Claude Code local
- ✅ Estrutura em `user/`, `feedback/`, `project/`, `reference/`
- ✅ MEMORY.md com índice de todas
- ⏳ Repo GitHub privado (será criado)
- ⏳ Hermes Agent configurado pra ler daí

## 🚀 Próximos passos

1. Criar repo privado `real-vision-memory` no GitHub
2. Fazer push desta pasta pro repo
3. Hermes Agent clona e referencia
4. Adicionar hook de sincronização (opcional)

---

**Última atualização:** 09/07/2026 — Migração de Claude Code local para pasta centralizada

