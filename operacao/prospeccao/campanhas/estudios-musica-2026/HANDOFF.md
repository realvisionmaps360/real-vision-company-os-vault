# Estúdios de Música 2026 — handoff

> Campanha de aquisição da Real Vision 360. Estado em **18/08/2026**.
> Este documento existe para uma sessão nova continuar de onde parou, sem contexto prévio.
> Trabalho iniciado num workspace separado (notebook da Romana). A partir daqui a execução
> muda de máquina: o Felipe vai rodar a próxima fase **no outro computador, que já tem as
> permissões e os MCPs ativos**. Este HANDOFF é o que atravessa essa mudança de ambiente.

---

## 1. O que é a campanha

Vender **Website** para estúdios de música no Brasil, usando a demo do **AMP Estúdio**
como referência de produto, não como prova de cliente fechado.

- **Oferta:** Website, R$ 1.500 no primeiro ano, incluindo site, domínio e hospedagem.
- **Fora desta rodada:** São Bernardo do Campo (evita conflito comercial local com o
  AMP/Saulo).
- **Cidade final:** ainda não decidida.
- **Canais planejados na sessão:** e-mail e WhatsApp. **A pesquisa de boas práticas mudou
  essa recomendação** — ver seção 4.
- **Primeiro contato:** curto, direto, preço pode aparecer. Explicação completa só depois
  do interesse.

Esta é uma missão de **validação**, não de disparo. Nenhuma mensagem foi enviada, nenhum
prospect foi criado no `rv-acquisition`, nenhuma coleta em escala rodou.

---

## 2. Onde a campanha está agora

| Etapa | Estado |
|---|---|
| Workspace organizado (contexto/, pesquisa/, dados/, scripts/, relatorios/) | ✅ feito |
| Auditoria de ambiente (Missão 1 da especificação) | ✅ feita — ver `relatorios/01-auditoria-ambiente.md` |
| Pesquisa de boas práticas externas | ✅ feita — ver `pesquisa/01-boas-praticas-pesquisadas.md` |
| Plano de execução das 5 fases | ✅ escrito — ver `PLANO-DE-EXECUCAO.md` |
| MCP da Apify | ✅ conectado e validado nesta sessão, tier FREE |
| MCP do Supabase (`rv-acquisition`) | ❌ **ainda não instalado** — bloqueia toda a Missão 4 |
| Skills `rv-prospeccao`, `clarisso`, `rv-copy`, `rv-relatorio` | ❌ não trazidas para o workspace da Romana; podem já existir no outro computador |
| Pesquisa de mercado (Missão 3 — qual cidade) | 🔲 não iniciada |
| Amostra pequena (Missão 4) | 🔲 bloqueada até o Supabase existir |
| Copy e disparo (Missão 5) | 🔲 não iniciada — portão humano |

---

## 3. Decisões já travadas pelo Felipe em 18/08/2026

Prevalecem sobre os documentos congelados do Acquisition System (`ACQUISITION-OPERATING-SYSTEM.md`):

- Estúdio de música entra como **segmento novo**, fora dos segmentos-âncora do ICP
  (pousada, restaurante, evento, condomínio, hub, operadora de turismo). O portão de
  "1ª abordagem de mercado/segmento novo" (seção 6 do Operating System) foi considerado
  aberto pelo Felipe.
- Oferta-âncora é **`website` direto**, não o tripwire `360_tour` recomendado pela seção 3
  do Operating System para cidade ainda não validada.
- **Preço pode aparecer** no primeiro contato — diverge da seção 5/8 do Operating System,
  que reserva preço para o diagnóstico gratuito.

**Pendência real, não decidida:** o que acontece no ano 2 (renovação, gestão mensal do
site). A regra do recorrente (Operating System, seção 3) manda todo build carregar uma
gestão mensal como oportunidade secundária. Os R$ 1.500 cobrem só o ano 1. Isso precisa de
resposta antes de qualquer copy final.

---

## 4. O que a pesquisa externa mudou (18/08/2026)

Pesquisa completa, com fontes, em `pesquisa/01-boas-praticas-pesquisadas.md`. Os pontos que
mudam a execução:

1. **WhatsApp não deveria abrir contato.** A política do Meta em 2026 trata mensagem para
   número de lista raspada como o cenário que mais derruba conta — e o app grátis do
   WhatsApp Business é o mais afetado. Recomendação: e-mail abre a conversa; WhatsApp entra
   só depois que o prospect responde ou clica. Decisão ainda não confirmada pelo Felipe.
2. **E-mail precisa de SPF, DKIM e DMARC alinhados antes do primeiro envio.** Desde
   novembro/2025 o Gmail rejeita de forma permanente remetente não conforme. Falta decidir
   de qual domínio a campanha envia (o principal `realvisionmaps.com`, arriscando a
   reputação usada com cliente, ou um subdomínio dedicado).
3. **A Apify mudou para cobrança pay-per-event.** No tier FREE da conta, dois eventos
   (`business leads enrichment` e `email verification`) custam US$ 0,10 cada, contra
   US$ 0,002 do enriquecimento comum de contato. Regra travada: **não usar** os dois caros.
4. **`score_reasons` ganha função dupla.** Além de priorizar a fila, é a prova documentada
   de legítimo interesse exigida pela LGPD (art. 7º, IX) para prospecção B2B por e-mail.
5. Não existe dado público confiável para escolher a cidade (o diretório do oHub lista 369
   estúdios no Brasil, mas é comercial, não é censo). A Missão 3 tem que ser contagem
   própria via Google Maps, região por região.
6. **Decisão pendente e bloqueante:** "estúdio de música" cobre pelo menos três negócios
   diferentes — gravação, ensaio, escola com estúdio — com capacidade de pagar e necessidade
   diferentes. Isso muda a busca, a copy e o preço. Precisa ser decidido antes da Missão 3.

---

## 5. Fonte de verdade que este projeto usa

| Assunto | Arquivo |
|---|---|
| Escopo e missões da campanha | `ESPECIFICACAO-CAMPANHA.md` (nesta pasta) |
| Regras de dedup, eventos, acesso ao banco | [[ACQUISITION-CONTRACT]] |
| Schema das 8 tabelas | [[ACQUISITION-DATA-MODEL]] |
| ICP, score, portões humanos, capacidade | [[ACQUISITION-OPERATING-SYSTEM]] |
| Papel do agente de aquisição | [[ACQUISITION-CLAUDE]] |
| Método de levantamento em escala (Apify, dedup por placeId, lições) | campanha Drone & Digital Unterentfelden (ver índice de prospecção) |
| Tom de voz | `contexto/VOZ.md` |
| Catálogo de serviços | catálogo oficial (ver `AGENTS.md` → workflows → prospecção) |
| Referência de produto (demo AMP) | repo `amp-estudio`, skill própria em `.claude/skills/amp-estudio/SKILL.md` — **projeto separado, é peça de venda da Real Vision, não é site do cliente** |

Não copiar conteúdo dessas fontes para cá. Referenciar e ler na hora, como manda o padrão
do vault.

---

## 6. O que falta antes de coletar qualquer estúdio

Bloqueios reais, na ordem em que aparecem no plano:

1. **MCP do Supabase instalado e validado** no ambiente que vai executar. Sem isso, o dedup
   obrigatório e todo registro em `prospects`/`prospect_events` não têm onde acontecer.
2. **Export mais recente de clientes do VisionFlow** (`operacao/clientes/`), para cruzar no
   dedup — o Operating System manda rebaixar quem já é cliente Real Vision.
3. **Decisão do Felipe** sobre qual dos três tipos de estúdio é o alvo (seção 4, item 6).
4. **Decisão do Felipe** sobre a ordem dos canais (e-mail primeiro, seção 4, item 1) e sobre
   o domínio de envio (item 2).
5. Códigos `website_management` e `domain_management`, citados como "a registrar" no
   Operating System, ainda não constam na lista oficial de `service_code` do
   `ACQUISITION-CONTRACT`. Resolver antes de gravar `prospect_services`.

---

## 7. Próximos passos, na ordem

1. Confirmar com o Felipe as 4 decisões pendentes da seção 6.
2. Instalar e validar o MCP do Supabase no ambiente de execução.
3. Rodar a Missão 2 (ferramentas): mapear o schema de entrada do
   `compass/crawler-google-places` contra os campos exigidos, desenhar a config de
   descoberta barata e a de enriquecimento, e um teste real mínimo com orçamento aprovado.
4. Rodar a Missão 3 (mercados): contagem própria por região, shortlist com trade-offs,
   cidade final aprovada pelo Felipe.
5. Rodar a Missão 4 (amostra pequena) só depois do Supabase resolvido.
6. Copy e disparo (Missão 5) só depois de tudo acima, com revisão frase a frase.

Detalhe de cada fase, com tarefas e critérios, em `PLANO-DE-EXECUCAO.md`.

---

## 8. O que tem em cada pasta

```
estudios-musica-2026/
├── HANDOFF.md                          ← este arquivo
├── ESPECIFICACAO-CAMPANHA.md           escopo técnico das 5 missões, portões, regras
├── PROMPT-INICIAL.md                   prompt original que abriu a missão no Claude Code
├── PLANO-DE-EXECUCAO.md                as 5 fases, tarefas, dependências, decisões pendentes
├── PARA-O-FELIPE.md                    passo a passo sem jargão do que falta fazer manualmente
├── PROMPT-PARA-O-VAULT.md              prompt usado para buscar skills e docs do vault
├── PROXIMA-SESSAO.md                   ponto de retomada — feito para o workspace da Romana;
│                                        na sessão nova, ler como histórico, não como ambiente atual
├── pesquisa/
│   └── 01-boas-praticas-pesquisadas.md LGPD, deliverability, WhatsApp, Apify, ICP — com fontes
└── relatorios/
    └── 01-auditoria-ambiente.md        auditoria do ambiente da Romana (Missão 1) — reexecutar
                                         no ambiente novo, os achados de ferramenta mudam
```

**Nota sobre `PROXIMA-SESSAO.md` e `PARA-O-FELIPE.md`:** foram escritos assumindo que a
execução continuaria no notebook da Romana (skill `mcp-install` local, `.env` local, etc.).
Como a execução mudou para outro computador, tratar essas referências de caminho como
histórico da sessão anterior, não como estado do ambiente novo. Reexecutar a auditoria de
ambiente (seção 1 da especificação) no computador novo antes de seguir.

---

## 9. Segurança

Nenhum segredo foi commitado. Nenhum valor de chave, token ou connection string aparece em
nenhum arquivo desta pasta. Variáveis de ambiente (Supabase, Apify) ficam em `.env` local a
cada máquina, nunca no vault.
