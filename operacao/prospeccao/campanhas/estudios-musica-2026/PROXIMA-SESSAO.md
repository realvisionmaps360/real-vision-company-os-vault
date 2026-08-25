# Próxima sessão — ponto de retomada

> Sessão anterior: 18/08/2026. Nada foi executado além de leitura, organização e pesquisa.
> Nenhum crédito gasto, nenhum prospect criado, nenhuma coleta rodada, Company OS intocado.

---

## Frase para começar

```text
Retomando a campanha de estúdios de música. Leia PROXIMA-SESSAO.md e siga o
PLANO-DE-EXECUCAO.md a partir da F2.
```

---

## O que já está pronto

| Item | Onde |
|---|---|
| Workspace organizado conforme a especificação §2 | esta pasta |
| Auditoria de ambiente completa | `relatorios/01-auditoria-ambiente.md` |
| Pesquisa de boas práticas, com 7 correções ao plano | `pesquisa/01-boas-praticas-pesquisadas.md` |
| Plano de execução das 5 fases | `PLANO-DE-EXECUCAO.md` |
| Regras do projeto e decisões travadas | `CLAUDE.md` |
| Passo a passo do Felipe | `PARA-O-FELIPE.md` |
| Prompt para buscar o pacote do vault | `PROMPT-PARA-O-VAULT.md` |
| Skill de instalação de MCP, global | `~/.claude/skills/mcp-install/SKILL.md` |
| MCP da Apify conectado e validado, tier FREE | verificado em 18/08/2026 |

---

## Leitura obrigatória ao abrir a sessão

1. `CLAUDE.md` — regras e as decisões já travadas
2. `relatorios/01-auditoria-ambiente.md` — o que funciona e o que está bloqueado
3. `pesquisa/01-boas-praticas-pesquisadas.md` §7 — as 7 mudanças que a pesquisa impôs
4. `PLANO-DE-EXECUCAO.md` — o roteiro

Não é preciso reler os 15 documentos de `contexto/` inteiros. Consultar sob demanda:
`aquisicao-contract.md` antes de tocar no banco, `aquisicao-operating-system.md` para ICP e
score, `03-institucional-VOZ.md` antes de escrever qualquer texto.

---

## Primeira coisa a fazer

**Checar três estados antes de decidir por onde começar:**

1. A pasta `pacote-campanha-estudios/` chegou? Se sim, integrar as skills.
2. O Felipe instalou o MCP do Supabase? Se sim, validar com uma consulta que só lê.
3. Ele informou o saldo da Apify?

**Se nada disso chegou, começar a F2 mesmo assim.** A F2 tem trabalho real que não depende
de nenhum dos três: ler o esquema de entrada do actor, mapear campo a campo contra o que a
campanha exige, e desenhar as duas configs (descoberta barata e enriquecimento). Tudo custo
zero. Não travar esperando.

---

## Decisões pendentes do Felipe

| # | Decisão | Trava |
|---|---|---|
| D1 | Tipo de estúdio: gravação, ensaio, ou escola com estúdio | F3 inteira |
| D2 | Aceita e-mail na abertura e WhatsApp só depois da resposta? | F5 |
| D3 | Qual domínio envia o e-mail, e se usa subdomínio dedicado | F5 e a checagem de DNS |
| D4 | O que acontece no ano 2, a renovação | Desenho da oferta |
| D5 | Orçamento e teto do primeiro teste pago na Apify | F2.4 |
| D6 | Critério de sucesso da amostra, definido antes de rodar | F4 e F5 |

---

## Bloqueios conhecidos

| # | Bloqueio | Trava |
|---|---|---|
| B1 | Company OS ausente nesta máquina: faltam `rv-prospeccao`, `clarisso`, `rv-copy`, `rv-relatorio`, `DESIGN.md` | Método de abordagem e copy |
| B2 | MCP do Supabase ausente | F4 inteira |
| B3 | Saldo de crédito da Apify desconhecido | Dimensionar a F2 |
| B4 | Export de clientes do VisionFlow ausente | O cruzamento de "já é cliente" no dedup |
| L2 | Códigos `website_management` e `domain_management` não constam na lista oficial do `aquisicao-contract.md` | Gravar `prospect_services` corretamente |

---

## Regras que não podem ser esquecidas

- Nada inventado. Marcar sempre FATO, PESQUISA ou HIPÓTESE.
- Antes de gastar crédito da Apify: declarar o custo e esperar aprovação.
- Antes de qualquer INSERT em `prospects`: dedup nas 3 camadas.
- **Não usar** os eventos da Apify de US$ 0,10 (business leads enrichment e verificação de
  e-mail). No tier FREE custam 50 vezes o do enriquecimento comum.
- `score_reasons` é prioridade **e** prova de legítimo interesse sob a LGPD. Sempre
  preencher com motivo objetivo.
- Nenhuma mensagem sai sem revisão humana frase a frase.
- Instalação de MCP segue a skill `mcp-install`: pergunta primeiro se já existe na
  interface do Claude Desktop, nunca instala por CLI.

---

## Decisões já travadas pelo Felipe em 18/08/2026

Prevalecem sobre os documentos congelados do Acquisition System:

- Estúdio de música entra como segmento novo, fora dos segmentos-âncora do ICP.
- Oferta-âncora é `website` direto, não o tripwire `360_tour`.
- Preço pode aparecer no primeiro contato.
- Preço: R$ 1.500 no primeiro ano, incluindo site, domínio e hospedagem.
- São Bernardo do Campo fica fora desta rodada.
