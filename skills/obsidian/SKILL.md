---
name: obsidian
description: Skill mestre do vault Obsidian da Real Vision. Carrega quando Felipe falar em Obsidian, vault, wiki, backlinks, varredura do Company OS, ou "abre o Obsidian". Explica onde fica tudo, quais sub-skills usar e como criar conexões entre documentos.
---

# Obsidian — Real Vision

O vault do Obsidian É o Company OS da Real Vision. Todos os documentos `.md` da operação vivem aqui e são sincronizados automaticamente com o celular via GitHub privado.

## Onde fica

```
C:\Users\Computador\Desktop\Real Vision\
  └── operacao\gestao\infraestrutura\obsidian\
        ├── README.md                    ← índice geral da infra Obsidian
        ├── CICLO-Sessao.md              ← fluxo início → fim de sessão
        ├── GUIA-Sincronizacao.md        ← setup PC/celular
        ├── GUIA-Skills-Obsidian.md      ← quais skills existem e quando usar
        ├── PROTOCOLO-Sessao-Contexto.md ← como carregar FICHA-CLIENTE no início
        ├── REGISTRO-Tecnico.md          ← logs e troubleshooting
        ├── skills\                      ← cópias das skills relacionadas (referência)
        └── wiki\                        ← BASE DE CONHECIMENTO (Claude escreve, Felipe lê)
              ├── index.md               ← catálogo de todas as páginas
              ├── log.md                 ← histórico de ingestas (append-only)
              ├── concepts\              ← ideias, frameworks, metodologias RV
              ├── entities\              ← clientes, pessoas, projetos
              ├── sources\               ← documentos ingeridos (um por arquivo)
              └── questions\             ← dúvidas abertas, contradições
```

**Regra de ouro:** `wiki/` é território do Claude. Felipe só lê. Se quiser mudar algo, pede ao Claude.

## Sub-skills — qual usar para quê

| Skill | Quando usar |
|---|---|
| `rv-wiki` | Ingestar documentos, consultar a wiki, auditar backlinks, varrer o Company OS |
| `obsidian-cli` | Controlar o vault pelo terminal (ler nota, criar, buscar, ver backlinks) |
| `obsidian-markdown` | Escrever `.md` correto: frontmatter, callouts, wikilinks, highlights |
| `obsidian-bases` | Criar views de banco de dados (`.base`) para dashboards de clientes/projetos |

Para trabalho no vault: **sempre carregar `rv-wiki` primeiro.**

## Estado atual da wiki (29/06/2026)

| Pasta | Conteúdo | Status |
|---|---|---|
| `entities/` | 36 clientes + Felipe Garcia | ✅ feito |
| `concepts/` | acquisition-system, campanha-paraty, contrato-rv, icp, opportunity-score, socio-digital | ✅ feito |
| `sources/` | acquisition-claude-role, acquisition-timeline, acquisition-operating-system | ✅ feito |
| `questions/` | clientes-sem-entregas-no-banco, nery-tour-vencido | ✅ feito |
| `contexto/` (EMPRESA, TIME, VOZ, DESIGN) | — | ⏳ pendente |
| `operacao/marketing/` (Hermes, email) | — | ⏳ pendente |
| `operacao/projetos/` (VisionFlow, cursos) | — | ⏳ pendente |

## Backlinks — como funcionam e como criar

**O que é:** quando o arquivo A tem `[[B]]` no corpo, o Obsidian mostra em B que "A me referencia". Isso cria a teia do gráfico.

**Problema hoje:** as 36 entidades de clientes existem como ilhas — não apontam para conceitos como `[[icp-real-vision]]` ou `[[campanha-paraty-2026]]`.

**Padrão de backlink para entidades de clientes:**

Adicionar no final de cada `wiki/entities/<cliente>.md`, na seção `## Conexões`:

```md
## Conexões
- Perfil: [[icp-real-vision]]           ← se for cliente do ICP
- Campanha: [[campanha-paraty-2026]]    ← se participou de campanha
- Contrato: [[contrato-rv]]             ← se tem contrato ativo
- Serviços: [[tour-360]], [[website]]   ← conforme o que foi entregue
```

**Padrão de backlink para conceitos:**

Nos arquivos de `wiki/concepts/`, adicionar seção `## Clientes Relacionados` com links para as entidades que pertencem ao conceito.

**Protocolo de execução segura:**
1. Editar 1 arquivo de teste
2. Mostrar ao Felipe para aprovação
3. Aplicar o padrão nos demais em lote

## Sincronização

- **GitHub privado:** `real-vision-company-os-vault`
- **Sincronização:** automática a cada 5 min (PC + celular via Obsidian Git)
- **O que sincroniza:** apenas `.md` e `.gitignore` — sem PDFs, imagens, vídeos ou código
- **Repos de código bloqueados por nome (não pasta inteira):** dentro de `operacao/projetos/`, cada repositório de código (VisionFlow, real-vision-site, solariumaarau, sunbite-site, rv-cartaodigital-paraty-onboard) tem uma linha própria no `.gitignore`. Pastas de projeto que só têm `.md` ficam visíveis automaticamente — ver [[REGISTRO-Tecnico]] (mudança de 04/07/2026).
- **Segurança:** todo arquivo tem histórico de versão no git. Nada é perdido permanentemente.

## Portabilidade para outras IAs

O vault é baseado em arquivos `.md` puros — o formato mais universal que existe. Qualquer IA com acesso à pasta pode ler, editar e expandir o mesmo vault. Os wikilinks `[[]]` são um padrão aberto, não dependem do Obsidian ou da Anthropic. O sistema foi construído para ser portátil.

## Próximos passos da varredura

Ordem recomendada para continuar o Workflow 4 da `rv-wiki`:

1. `contexto/` → 4 arquivos → criar `wiki/concepts/rv-empresa`, `rv-time`, `rv-voz`, `rv-design`
2. `Felipe Garcia/AGENTE.md` → `wiki/entities/felipe-garcia`
3. `operacao/marketing/email-marketing/` → `wiki/concepts/hermes-email-marketing`
4. `operacao/projetos/` (VisionFlow, cursos) → `wiki/sources/`
5. **Criar backlinks** nos 36 clientes (após itens acima estarem ingéstados)
