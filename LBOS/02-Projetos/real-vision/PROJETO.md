---
id: PRJ-2026-002
tipo: projeto
nome: Real Vision — operação
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-21
proxima_revisao: 2026-09-06
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

Índice de quais clientes/projetos da Real Vision já têm nó próprio no LBOS (com `PROJETO.md`, checklist, histórico etc.) — não é a lista completa de clientes da empresa, essa mora em `operacao/clientes/`. Aqui só entra quem já foi trazido pro grafo.

| Cliente | Nó LBOS | Desde | Status |
|---|---|---|---|
| Flávia Andrade — Vila dos Corais | [[02-Projetos/vila-dos-corais/PROJETO]] | 2026-08-13 | Ativo — migração de domínio pro Vercel em andamento |
| Eduardo Barqueiro — Paraty Onboard | [[02-Projetos/paraty-onboard/PROJETO]] | 2026-08-17 | Ativo — site reconectado, falta migrar pro domínio próprio e subir o canal do YouTube |

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
- Decidido por: [[DEC-2026-002]], [[DEC-2026-003]]
- Tarefas: [[TAR-2026-002]], [[TAR-2026-003]], [[TAR-2026-004]], [[TAR-2026-005]], [[TAR-2026-011]]
- Conhecimento gerado: [[prospeccao-google-maps-apify]], [[georreferenciar-print-de-mapa]], [[landing-de-campanha-com-captura-propria]], [[mapeamento-canais-comunicacao-local-prospeccao]]
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
