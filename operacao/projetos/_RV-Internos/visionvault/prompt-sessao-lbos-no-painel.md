# Prompt — sessão "LBOS no VisionVault"

Criado em 28/08/2026 na sessão `visionvault3`. Cole o bloco abaixo inteiro numa sessão nova.
Contexto do projeto: [[TIMELINE]] · [[_PAINEL]] · `LBOS/02-Projetos/visionvault/PROJETO.md`

---

Ative as skills `realvision`, `visionvault` e `lbos` antes de qualquer leitura de arquivo, e me
mostre quais carregou e por quê.

Vamos executar o próximo passo declarado em `LBOS/02-Projetos/visionvault/PROJETO.md`: **colocar o
próprio LBOS no VisionVault**. O LBOS é o candidato natural porque é a única parte do vault
formalmente tipada — dos 142 markdowns de `LBOS/`, ~121 já têm frontmatter com `id`, `tipo`,
`status` e arestas declaradas.

## Antes de escrever qualquer coisa, leia

1. `LBOS/00-Sistema/CONVENCOES.md` — seções 2 (campos obrigatórios), 3 (padrão de ID),
   4 (vocabulário de `status`) e 5 (vocabulário de relações). É o contrato do grafo.
2. `tools/painel/schema.ts` — é a definição normativa do que o VisionVault entende. Se um
   `_PAINEL.md` não passa nele, está errado. Repare que o schema já declara que o vocabulário de
   `status` e de arestas **vem do CONVENCOES.md**: os dois documentos precisam continuar de acordo.
3. `skills/visionvault/SKILL.md` seção 2 (o contrato `_PAINEL.md`) e o fluxo de publicação.
4. Os três `_PAINEL.md` que já existem, como referência de tom e de nível de detalhe:
   `operacao/marketing/email-marketing/`, `operacao/projetos/_RV-Internos/documentacao/` e
   `operacao/projetos/_RV-Internos/visionvault/`.

## O trabalho, em três partes

**Parte 1 — fechar a tipagem que falta.** Estes 21 arquivos de `LBOS/` estão sem frontmatter:

- `LBOS/02-Projetos/casamento/`: checklist, cronograma, documentos, HISTORICO, planejamento
- `LBOS/02-Projetos/real-vision/`: checklist, cronograma, documentos, financeiro, HISTORICO,
  planejamento, riscos
- `LBOS/02-Projetos/sunbite/documentos.md`
- `LBOS/02-Projetos/_TEMPLATE-PROJETO/` (7 arquivos)
- `LBOS/04-Interagente/README.md`, `LBOS/CLAUDE.md`, `LBOS/README.md`

Antes de tipar em massa, **me apresente a classificação proposta e espere meu OK**: qual `tipo`
recebe cada grupo, se `_TEMPLATE-PROJETO/` deve ser tipado (é molde, não nó — talvez fique fora de
propósito) e se `CLAUDE.md`/`README.md` são nós do grafo ou infraestrutura. IDs seguem o padrão da
seção 3 do CONVENCOES, sem reaproveitar número já usado. Use a skill `lbos-classificacao` se
ajudar a decidir o `tipo`, e `lbos-consistencia` para conferir as arestas depois.

Há também 4 arquivos em `LBOS/06-Pessoas/` com **espaço no nome** (`Felipe Garcia.md` etc.), o que
contraria a seção 8 do CONVENCOES. Não renomeie: wikilink aponta para eles. Só me diga o tamanho do
estrago se renomear, e eu decido.

**Parte 2 — o `_PAINEL.md` do LBOS.** Escreva `LBOS/_PAINEL.md` seguindo o schema, com métricas que
tenham procedência de verdade (`fonte`), não número solto. Candidatas: nós tipados sobre o total,
projetos ativos, decisões registradas, nós sem revisão vencida. Métrica que você não conseguir
sustentar com uma fonte declarada, não coloque — o padrão de procedência foi decidido na sessão
anterior justamente porque "28 contatos ativos" ficou um mês errado no painel.

**Parte 3 — a visualização em grafo.** O LBOS é o primeiro projeto do painel cujo valor está nas
arestas, não numa lista. Antes de escrever código, me mostre o que você pretende desenhar e por
quê — quero decidir com você se vale um tipo de visualização novo no app ou se as existentes já
resolvem. Não comece a implementar sem esse aceite.

## Regras que valem o tempo todo

- **Nunca apague nota do vault.** Se achar que algo precisa ser refeito, crie arquivo novo e
  mantenha o original.
- **Mudança cirúrgica.** Não "melhore" nó adjacente que não foi pedido.
- O VisionVault é **só leitura** sobre o vault. O app nunca escreve.
- Antes de dar por pronto: `npm run build` no app precisa passar com a trava anti-vazamento, e o
  gerador (`tools/painel/`) precisa validar todos os `_PAINEL.md`.
- Verifique em 390px e 1280px antes de dizer que está verificado. Playwright verde não basta.
- Ao fim, atualize `operacao/projetos/_RV-Internos/visionvault/TIMELINE.md` e o `PROJETO.md` do
  LBOS (`PRJ-2026-007`), incluindo o registro da sessão anterior que ficou faltando: métrica com
  procedência entregue, base de contatos 28 → 24 ativos, segredos movidos para variáveis de
  ambiente.
