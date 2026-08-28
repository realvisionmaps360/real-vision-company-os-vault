---
id: PRJ-2026-007
tipo: projeto
nome: VisionVault — painel do Company OS
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-27
atualizado_em: 2026-08-28
proxima_revisao: 2026-09-15
prazo:
pertence_a: ["[[Real Vision 360]]"]
participa_de: ["[[Real Vision — operação]]"]
depende_de: []
gera_receita: []
gera_despesa: []
origina_tarefa: []
afeta: []
referencia: ["[[LBOS]]", "[[CONVENCOES]]"]
tags: [lbos/entidade, lbos/projeto]
---

# VisionVault — painel do Company OS

## O que é

App instalável no celular que mostra, numa tela só, o estado real dos projetos que vivem como
markdown no vault. Quando ele termina de valer a pena, o Felipe não precisa mais abrir pasta e
caçar arquivo para saber onde parou.

Está no ar e validado em produção desde 28/08/2026: **https://visionvault-gold.vercel.app**

## Contexto

**Dentro:** ler o Company OS e desenhar. Grid de projetos ordenado por atividade, visualização
própria por tipo de projeto, leitor de markdown com wikilinks navegáveis, árvore de arquivos,
calendário das datas declaradas e mapa do grafo de projetos.

**Fora:** escrever no vault. O app nunca altera nada — o vault continua sendo a fonte de verdade
e o painel é espelho. Também fora: substituir o Obsidian, e virar CRM (isso é o VisionFlow).

O app não interpreta a prosa do vault. Cada projeto declara seu estado num `_PAINEL.md` com
frontmatter tipado, que reaproveita o vocabulário de `status` e de relações deste sistema
(`CONVENCOES.md`, §4 e §5). A razão é factual: 58% de `operacao/` não tem frontmatter nenhum, e
onde `status` existe há cerca de 40 valores de ocorrência única, alguns frases inteiras. Um parser
heurístico sobre isso mentiria em silêncio.

## Dependências (§22)

- **Vault no GitHub.** O app lê o repositório privado do Company OS. Vault que não sobe é painel
  que não atualiza.
- **Supabase do VisionFlow** (`ghwjetvazmdlaqidgxqi`) para o login Google. O projeto Supabase do
  site vive em outra conta Google, à qual o Felipe não tem acesso no dia a dia — foi o que
  travou a primeira tentativa de colocar o login no ar.
- **Token de leitura do GitHub**, com validade de 90 dias. Quando vencer, o painel para de ler o
  vault e o erro se parece com sessão expirada.
- **Disciplina de atualizar o `_PAINEL.md`** ao fim de cada sessão. É a dependência mais frágil,
  porque é humana e silenciosa — ver Riscos.

## Estado em 28/08/2026

Entregue e funcionando com dois projetos: o email marketing (Projeto Hermes) e o pipeline de blog.
Ciclo completo confirmado: editar o vault → push → a automação regera o índice → o app reflete em
cerca de dois minutos.

O painel já provou utilidade no primeiro dia ao expor um problema real que estava escondido: o
pipeline de blog registra 2 posts publicados enquanto o site tem 21.

## Próximo passo

Ligar a métrica "Contatos ativos: 28" ao documento que sustenta esse número — hoje o card é texto
morto e, para saber *quem* são os 28, ainda é preciso sair do painel. Será o primeiro caso de
**métrica com procedência**, e o padrão que sair dele vale para todas as outras.

Depois disso, **incluir o próprio LBOS no painel**. É o candidato natural: dos 1.174 markdowns do
vault, os 140 daqui são os únicos formalmente tipados (98% com frontmatter, IDs, vocabulário
fechado, arestas declaradas). O painel foi desenhado para ler exatamente esse tipo de estrutura,
então o LBOS é o projeto que menos trabalho de preparação exige e o que melhor testa o formato de
visualização em grafo.

## Relacionados

- Pertence a: [[Real Vision 360]]
- Participa de: [[Real Vision — operação]]
- Referencia: [[LBOS]] · [[CONVENCOES]] (vocabulário de status e de relações)
- Company OS: `skills/visionvault` · `tools/painel/` ·
  `operacao/projetos/_RV-Internos/visionvault/TIMELINE.md`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-27 | Projeto concebido e construído | Estado dos projetos espalhado em centenas de markdowns, sem panorama | Novo nó no grafo | Contrato `_PAINEL.md` em vez de parser heurístico |
| 2026-08-28 | Login migrado para o Supabase do VisionFlow | O projeto Supabase do site está em conta Google inacessível ao Felipe | Dependência trocada; app entrou no ar | Usar o projeto que o Felipe controla |
| 2026-08-28 | Entregue e validado em produção | — | Painel operacional com 2 projetos | LBOS eleito próximo projeto a entrar |
