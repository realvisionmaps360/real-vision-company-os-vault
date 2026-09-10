---
id: PRJ-2026-005
tipo: projeto
nome: Vila dos Corais
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-09-09
proxima_revisao: 2026-09-13
prazo: continuo
pertence_a: ["[[LBOS]]", "[[02-Projetos/real-vision/PROJETO]]"]
depende_de: []
gera_receita: []
gera_despesa: []
afeta: []
referencia: ["[[05-Conhecimento/sites-clientes-migracao-dominio-builder-antigo|CON-2026-004]]"]
tags: [lbos/entidade, lbos/projeto]
---

# Vila dos Corais

## O que é

Cliente Real Vision — **Flávia Andrade**, pousada Vila dos Corais, em Algodões, Península de Maraú (BA). A Real Vision cuida do site institucional (`viladoscorais.com.br`), originalmente construído em Lovable, hoje com repositório próprio na Real Vision.

Dossiê completo do cliente (propostas, relatórios, ativos visuais): `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/`. Este nó não repete o conteúdo de lá — só referencia.

| | |
|---|---|
| Site | `viladoscorais.com.br` |
| Repositório | `github.com/realvisionmaps360/viladoscorais` |
| Hospedagem | Vercel |
| Origem | Migrado do Lovable |

## Escopo

**Dentro:** manutenção técnica do site (favicon, indexação Google, SEO básico), auditoria técnica periódica, gestão de Google Ads por 3 meses (contratada 07/09/2026) e o Portal do Projeto que acompanha esse contrato.
**Fora:** frentes não solicitadas pela cliente até o momento (não presumir escopo maior sem pedido explícito).
**Em avaliação (Prioridade 4, handoff 17/08/2026):** formalização de contrato, revisão do Perfil da Empresa no Google, inclusão no portfólio — nenhum ainda confirmado como escopo ativo, ver [[checklist]].

## Dependências (§22)

Nenhuma até o momento.

## Documentos da pasta
- [[planejamento]] — estratégia e abordagem
- [[cronograma]] — datas e marcos
- [[checklist]] — o que falta fazer
- [[riscos]] — o que pode dar errado
- [[documentos]] — referências para `04-Documentos/`
- [[financeiro]] — referências para `03-Financeiro/`
- [[trafego-pago-pesquisa]] — pesquisa sobre a Campanha Inteligente que a cliente ativou sozinha (18/08/2026), continuar em "corais 2"
- [[HISTORICO]] — linha do tempo completa

Documentos do Portal do Projeto (moram no Company OS, aqui só referenciados):
`operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/PRD-PORTAL-PROJETO-2026-09-09.md` (produto) e
`.../PLANO-ARQUITETURA-PORTAL-2026-09-09.md` (arquitetura e fases).

## Relacionados
- Pertence a: [[LBOS]]
- Cliente: Flávia Andrade — ver `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-13 | Nó criado | Primeira estruturação da Vila dos Corais dentro do LBOS | Cliente passa a ter rastro no grafo pessoal/negócio | Estrutura só referencia `operacao/clientes/`, nunca move os arquivos originais |
| 2026-08-13 | Achado: domínio nunca migrou do Lovable pra Vercel; site publicado nunca foi o repo GitHub | Investigação do favicon no Google revelou causa raiz maior que o pedido original | Projeto criado na Vercel + domínio adicionado; falta só o registro DNS na Locaweb | Felipe confirmou: migrar de vez pra Vercel (ver [[checklist]] e [[HISTORICO]]) |
| 2026-08-14 | Migração concluída: registro A trocado, SSL certificado, Search Console verificado, sitemap enviado, GA4 instalado do zero | Conclusão do trabalho iniciado em 13/08 | Site 100% servido pela Vercel, sem pendência técnica de indexação | Fonte única do detalhe: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/Vila-dos-Corais-TIMELINE.md` |
| 2026-08-17 | Nó sincronizado com o Company OS (estava parado em 13/08); Prioridade 4 do handoff `2026-08-17-prd-memory-dump-operacional.md` abre 4 frentes novas (pacote/datas, contrato, Perfil Google, portfólio) | Handoff PRD 2026-08-17 | Escopo do projeto pode crescer — pendente decisão do Felipe em cada frente (ver [[HISTORICO]] e [[checklist]]) | Nenhuma decisão tomada; perguntas levantadas ao Felipe nesta sessão |
| 2026-08-18 | Cliente ativou sozinha uma Campanha Inteligente (R$200) dentro do Perfil da Empresa e perguntou o próximo passo; Felipe vê chance de virar gestora de tráfego dela também | Cliente tomou a iniciativa após receber aviso de que o Perfil estava pronto | Possível serviço novo (tráfego pago) — pesquisa registrada em [[trafego-pago-pesquisa]], nenhum acesso pedido, nenhuma campanha tocada | Decisão adiada pro Felipe na próxima sessão ("corais 2") |
| 2026-08-20 | Sessão "corais 2": Flávia delegou o assunto tráfego pago pra Evelin (equipe dela), que vai receber treino de Felipe; reunião marcada pra 21/08/2026. Diagnóstico técnico do erro no botão "Anunciar" confirmado ao vivo (causa: estrutura de conta MCC, não descontinuação) + case study sobre o estado atual do produto Campanha Inteligente | Preparação de Felipe pra treinar a Evelin antes da reunião | Nenhum acesso à conta da cliente foi usado — teste feito só na conta própria da Real Vision. Detalhe completo em [[trafego-pago-pesquisa]] | Decisão de negócio (pegar o serviço formal + preço) segue pendente, agora pra reunião de 21/08/2026 |
| 2026-09-09 | Flávia aceitou a proposta de gestão de Google Ads e pagou os R$300 da 1ª parcela (07/09/2026); Evelin saiu do processo, Felipe fechou direto com a Flávia | Fechamento comercial após a pesquisa e o diagnóstico técnico das sessões anteriores | Serviço novo de R$2.400 (R$600 implementação + R$600/mês × 3 de gestão); pagamento ainda só no vault, falta lançar no VisionFlow; próximos passos: materiais, acessos, reunião estratégica, campanha no ar — ver `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09.md` | Decisão de negócio de 20/08 (contratar o serviço formal) está resolvida — a proposta foi aceita e paga |
| 2026-09-09 | Mini-app descartado; escopo passa a ser o **Portal do Projeto** — rota privada dentro do site da própria cliente. PRD v2.0 recebido de ferramenta externa e auditoria técnica do repositório concluída | A cliente já possui site, repositório, Supabase, login e área privada de datas — app paralelo deixou de fazer sentido | Escopo técnico do projeto cresce: tabelas novas `portal_*`, papel novo no Supabase e evento de conversão no GA4. Nenhum arquivo do fluxo público de reserva será alterado | Documentos no Company OS (`PRD-PORTAL-PROJETO-2026-09-09.md` e `PLANO-ARQUITETURA-PORTAL-2026-09-09.md`); 7 decisões (D-A a D-G) aguardando Felipe antes de qualquer código |
