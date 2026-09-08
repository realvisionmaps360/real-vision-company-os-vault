---
id: PRJ-2026-002
tipo: projeto
nome: Real Vision — operação
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-09-08
proxima_revisao: 2026-12-08
prazo: continuo
pertence_a: ["[[LBOS]]"]
afeta: ["[[OBJ-casamento-suica]]"]
referencia: ["[[AGENTS]]", "[[EMPRESA]]", "[[VOZ]]", "[[TIME]]", "[[DESIGN]]"]
tags: [lbos/entidade, lbos/projeto]
---

# Real Vision — operação

> **Nó-ponte.** Este projeto não gerencia a Real Vision — quem faz isso é o Company OS, em `operacao/`. Ele existe para que a operação da empresa tenha um endereço no grafo do LBOS e as receitas dela alcancem os objetivos pessoais.

## O que é

Ponto de contato entre o LBOS e o Company OS. Desenvolver a Real Vision como empresa totalmente remota é objetivo secundário da spec (§4).

## Escopo

**Dentro:** conexões entre a operação da empresa e o resto da vida — receitas que financiam objetivos, prazos que colidem com o casamento, decisões que afetam os dois lados.

**Fora:** tudo que o Company OS já faz. Clientes, propostas, entregas, skills e prospecção **não se movem e não se duplicam**.

## Onde a verdade mora

| Assunto | Fonte oficial |
|---|---|
| Regras, tom, workflows | [[AGENTS]] |
| O que a empresa vende | [[EMPRESA]] |
| Tom de voz | [[VOZ]] |
| Quem é quem | [[TIME]] |
| Identidade visual | [[DESIGN]] |
| Status de clientes | `operacao/clientes/` |
| Projetos e repositórios | `operacao/projetos/` |
| Campanhas de prospecção | `operacao/prospeccao/` |
| Campanha Drone & Digital Unterentfelden | `operacao/prospeccao/campanhas/drone-digital-unterentfelden/` |

Consultar sempre a fonte. Nunca copiar para cá.

## Clientes Real Vision já estruturados no LBOS

> **A carteira não vive aqui.** Por [[DEC-2026-005]] (08/09/2026), cliente é uma coisa só e mora em `operacao/clientes/`. Os dois abaixo já estavam no grafo antes da decisão e continuam; novos clientes só entram se houver motivo de grafo — receita que financia objetivo, prazo que colide com outro projeto, risco que atravessa vida e negócio.

| Cliente | Nó LBOS | Desde | Status |
|---|---|---|---|
| Flávia Andrade — Vila dos Corais | [[02-Projetos/vila-dos-corais/PROJETO]] | 2026-08-13 | Ativo — migração de domínio para a Vercel **concluída** em 13-14/08/2026, Search Console verificado |
| Eduardo Barqueiro — Paraty Onboard | [[02-Projetos/paraty-onboard/PROJETO]] | 2026-08-17 | Ativo — site reconectado, falta migrar pro domínio próprio e subir o canal do YouTube |

⏳ **Vila dos Corais está três semanas atrás da realidade.** O Company OS registra reunião com a Evelin (21/08), deck de reunião (31/08) e, em 01/09, a correção do login e a migração completa do Supabase para conta própria, com pendência de SMTP. Nada disso chegou aos nós do LBOS. O Felipe optou em 08/09 por **agendar essa atualização para depois** — está registrado aqui para não se perder, não porque foi esquecido. Fonte: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/Vila-dos-Corais-TIMELINE.md`.

**Moreno — Pousada Galeão + Akua Bistrô** foi onboardado no Company OS em 02/09/2026 e **não entra no grafo**: a conversa parou numa pergunta sobre tour 360°, sem evolução. Volta à pauta se virar projeto.

## A cadeia que este nó viabiliza

```
Cliente → Real Vision 360 → Receita → Fluxo de Caixa → OBJ-casamento-suica
```

É o §13 da spec funcionando. Antes do LBOS essa cadeia existia só na cabeça do Felipe.

## Documentos da pasta

- [[02-Projetos/real-vision/planejamento|planejamento]]
- [[02-Projetos/real-vision/cronograma|cronograma]]
- [[02-Projetos/real-vision/checklist|checklist]]
- [[02-Projetos/real-vision/riscos|riscos]]
- [[02-Projetos/real-vision/documentos|documentos]]
- [[02-Projetos/real-vision/financeiro|financeiro]]
- [[02-Projetos/real-vision/HISTORICO|HISTORICO]]

## Relacionados

- Pertence a: [[LBOS]]
- Afeta: [[OBJ-casamento-suica]]
- Empresa: [[Real Vision 360]]
- Decidido por: [[DEC-2026-002]], [[DEC-2026-003]], [[DEC-2026-005]]
- Tarefas: [[TAR-2026-002]], [[TAR-2026-003]], [[TAR-2026-004]], [[TAR-2026-005]], [[TAR-2026-011]]
- Conhecimento gerado: [[prospeccao-google-maps-apify]], [[georreferenciar-print-de-mapa]], [[landing-de-campanha-com-captura-propria]], [[mapeamento-canais-comunicacao-local-prospeccao]], [[05-Conhecimento/coleta-email-whatsapp-newsletter|CON-2026-008 — Captação de email via WhatsApp para newsletter]]
- Referencia: [[AGENTS]], [[EMPRESA]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Nó criado | Fase 2 do LBOS | Abre a ponte entre LBOS e Company OS | Nó-ponte: referencia, nunca absorve |
| 2026-08-13 | Campanha Drone & Digital Unterentfelden entra no grafo via [[DEC-2026-002]] e [[TAR-2026-005]] | Primeira prospecção da empresa na Suíça | Cadeia Cliente → Real Vision → Receita → [[OBJ-casamento-suica]] ganha uma frente concreta | Artefatos ficam no Company OS; LBOS só referencia |
| 2026-08-13 | Primeiro cliente estruturado no LBOS: Flávia Andrade / Vila dos Corais | Felipe pediu processo completo de absorção de um cliente pro LBOS, começando por um problema real (favicon/indexação) | Nasce a tabela "Clientes Real Vision já estruturados no LBOS" — índice de quem já tem nó próprio | Cada cliente novo trazido pro grafo ganha uma linha aqui, referenciando seu `PROJETO.md` |
| 2026-08-13 | Campanha Unterentfelden avança até landing page no ar e emails prontos; modelo comercial revisado em [[DEC-2026-003]] | Sessão de execução: página publicada, formulário próprio funcionando, 24 textos reescritos, teste aprovado | Falta só domínio próprio, tradução pro alemão e regravar os rascunhos do Gmail antes de enviar | Captura coletiva sem visita individual; cliente escolhe a forma de pagamento |
| 2026-08-17 | Segundo cliente estruturado no LBOS: Eduardo Barqueiro / Paraty Onboard, via Prioridade 2 do handoff de memory dump | Site tinha sido tirado do ar em 31/07 por falta de pagamento; Eduardo pagou R$550 em 16/08 pela Opção 3 (domínio próprio + YouTube) | Site já reconectado na Vercel; nasce [[REC-2026-002]] como primeira receita ligada a este cliente | Sem débito antigo — o R$1.000 de referência do tour era permuta, nunca cobrança |
| 2026-08-19 | Campanha Unterentfelden deixa de ser venda e vira validação de mercado gratuita, por [[DEC-2026-004]] | Felipe é brasileiro sem status de residência na Suíça e não tem como receber por esse trabalho de forma legal e simples | **CHF 480 de receita potencial vão a zero.** A frente suíça deixa de alimentar [[OBJ-casamento-suica]] por receita e passa a alimentá-la por rede de contato. Some a exposição fiscal inteira | Oferta gratuita, questionário voluntário, newsletter desacoplada, nenhum voo novo até o Amt für Migration responder |
| 2026-08-21 | Nasce [[TAR-2026-011]] — controle de contratos no VisionFlow, já em estado pausado | Prioridade 5 do handoff de 17/08; Felipe simplificou o desenho junto com o Claude Code e pediu para pausar antes de codar, sem tempo agora | Nenhuma mudança em produção/banco. Desenho final (reaproveitar aba Arquivos + indicador binário) fica registrado, com 3 perguntas em aberto pra quando retomar | Rejeitada a proposta de tabela nova + aba nova; aprovado o desenho mais simples |
| 2026-09-02 | Nasce [[mapeamento-canais-comunicacao-local-prospeccao]], a partir do caso real de busca de freelancer 360°/drone em Itacaré-BA | Felipe pediu documentação explícita da metodologia para reuso no curso Profissão 360° e em prospecções futuras de clientes/parceiros em novas cidades | Metodologia de prospecção local vira ativo reutilizável do grafo, não fica presa numa sessão | Nó de conhecimento único, atualizado a cada novo caso testado — não um nó por cidade |
| 2026-09-02 | Nasce [[05-Conhecimento/coleta-email-whatsapp-newsletter\|CON-2026-008]] — processo de captação de email via WhatsApp pro projeto Hermes, ~50 contatos processados em 4 lotes | Pedido original de tagging de lead virou captação de email de toda a rede de contatos, depois de decisão do Felipe de pausar prospecção nova | Metodologia (3 tons de mensagem, checagem de email existente, exclusão só de família com email já conhecido) vira repetível; lista viva de status por contato fica fora do LBOS, em `operacao/marketing/email-marketing/08-COLETA-WHATSAPP.md` | Abandonado o filtro por "relevância pro negócio" — manda pra todo mundo da lista, exceto Pai/Mãe/Romana (já têm email por outro canal) |
| 2026-09-02 | Nó [[05-Conhecimento/coleta-email-whatsapp-newsletter\|CON-2026-008]] movido de `04-Processos/` (pasta fora da spec) pra `05-Conhecimento/`; regra de exclusão de família revisada (família de 1º grau entra na campanha, só Pai/Mãe/Romana ficam de fora por já terem email) | Reorganização de documentação e correção da regra de família no mesmo dia | Nenhum impacto financeiro ou de cronograma; corrige localização do nó no grafo e a regra vigente de exclusão | Christine Garcia e Vitoria Morais seguem bloqueadas, mas por pedido separado do Felipe, não por regra de família |
