# Handoff para IA externa — Betão / Pousada Cajueiro

> Este documento existe pra o Felipe colar numa IA externa (ChatGPT ou outra) como material de
> apoio sobre este cliente específico. É a primeira vez que essa pasta física é criada — antes
> deste documento não havia nenhum arquivo local dedicado ao Betão, só registros espalhados no
> Supabase do VisionFlow e em documentos de campanha do vault. Este documento consolida tudo isso
> num único lugar. **Não presume qual vai ser a tarefa da conversa externa** (proposta de site,
> mensagem de retomada de contato, diagnóstico) — isso o Felipe define lá fora. Quando a conversa
> gerar algo útil (texto, decisão, plano), ele volta pro Claude Code pra virar ação real no vault
> e/ou no VisionFlow.

---

## 1. Quem é a Real Vision (contexto rápido pra IA externa)

Real Vision 360 é uma operação de presença digital integrada para negócios locais, fundada por
Felipe Garcia. Produto principal: **Sócio Digital**, reunindo 5 pilares — sites profissionais,
Google Meu Negócio, Tour Virtual 360° (Pano2VR + Street View), fotografia/drone e automações de
IA. Atua em cidades da Bahia (Itacaré, Barra Grande, Maraú, Igrapiúna, Ituberá) e também na
Suíça/Itália/Bósnia. O Betão é cliente da frente de Tour Virtual 360°, captado na região de
Igrapiúna/BA.

---

## 2. Identificação do cliente

| Campo | Valor |
|---|---|
| Nome | Betão |
| Negócio | Pousada Cajueiro |
| Segmento | Pousada |
| Localização | Igrapiúna, Bahia |
| WhatsApp | +55 73 99954-0693 |
| ID no VisionFlow (Supabase `ghwjetvazmdlaqidgxqi`) | `8cc5a60d-086a-482b-be5e-46c3140cb2dd` |
| Status pipeline (VisionFlow) | `entregue` (não arquivado) |
| Segmentação campanha reativação | Grupo A (vencido há +6 meses) / Cenário B (tour online, vencido, sem gancho Universo Paralello) |

---

## 3. Linha do tempo consolidada (VisionFlow + vault)

| Data | Fato | Fonte |
|---|---|---|
| 23/01/2025 | Tour virtual 360° realizado e entregue (linkado no Google Meu Negócio) | Capivara da campanha de reativação + entidade wiki |
| 27/04/2026 | Registro do cliente criado no VisionFlow atual (Supabase `ghwjetvazmdlaqidgxqi`). Status pulou de lead → proposta → negócio fechado → entregue no mesmo dia — isso é characteristico de **migração/import retroativo**, não histórico real de negociação nova | `activities` (VisionFlow) |
| 26/06/2026 | "Capivara" (pesquisa de diagnóstico) preenchida pra campanha de reativação de tours vencidos: GMN atualizado e organizado, tour ainda online mas com o período de 1 ano vencido, WhatsApp certo no perfil. Ponto de atenção: link da bio do Instagram aponta pro WhatsApp em vez de apontar pro tour | `03-CLIENTES-REATIVACAO - Corrigido.md` |
| 26/06/2026 | Email 1 e WhatsApp 1 da campanha de reativação **escritos e prontos**, mas ainda **não aprovados nem enviados** por essa campanha formal (ver checklist na seção 5) | `03-CLIENTES-REATIVACAO - Corrigido.md` |
| 13/07/2026 | Felipe contatou o cliente diretamente (fora da campanha formal) avisando do vencimento do tour. Betão respondeu manifestando **interesse em criar um site** e informou que **a filha é quem decide as questões técnicas** | `activities` (VisionFlow) |
| 13/07/2026 | Segundo contato no mesmo dia: Betão estava com hóspedes na pousada e não conseguiu dar seguimento à decisão | `activities` (VisionFlow) |
| 20/07/2026 | Tarefa "Entrar em contato com Betão para retomar os próximos passos" — concluída | `tasks` (VisionFlow) |
| 21/07/2026 | Tarefa "Enviar mensagem de lembrete ao cliente sobre website e contato com a filha" — concluída | `tasks` (VisionFlow) |
| 03/08/2026 | Tarefa "Entrar em contato com o cliente" — concluída | `tasks` (VisionFlow) |
| **29/08/2026** | Tarefa "Entrar em contato com o cliente novamente" — **status: A FAZER, em atraso** (hoje é 08/09/2026) | `tasks` (VisionFlow) |
| 02/09/2026 | Campanha separada de coleta de WhatsApp/newsletter: Betão é o contato #69 da lista, mensagem C (pedindo confirmação de email) enviada, aguardando resposta. **Essa campanha é sobre newsletter geral, não sobre venda de tour/site** — não confundir com a campanha de reativação | `08-COLETA-WHATSAPP.md` |

**Leitura do estado atual:** existe uma conversa real já em andamento (não é abordagem fria) — o
cliente já demonstrou interesse verbal em site próprio, mas a decisão final depende da filha dele,
não dele diretamente. O próximo passo pendente é retomar esse contato, que está atrasado desde
29/08/2026.

---

## 4. Diagnóstico da presença digital (26/06/2026, pode estar desatualizado)

- **Google Meu Negócio:** em ordem, organizado, WhatsApp correto.
- **Site próprio:** nenhum além do tour hospedado no domínio da Real Vision.
- **Instagram:** link da bio aponta para o WhatsApp em vez de apontar para o tour ou site — é o
  ponto de atenção mais citado nos materiais.
- **Tour 360°:** online, mas o ciclo de 1 ano já tinha vencido em 26/06/2026 (entregue 23/01/2025).
  Sem renovação, sai do ar.

---

## 5. Textos já escritos para a campanha de reativação (não enviados ainda)

Checklist da campanha (`03-CLIENTES-REATIVACAO - Corrigido.md`): Capivara ✅ · Email 1 ✅ · WA 1 ✅
· Aprovado ⬜ · Enviado ⬜ · Resposta —

**Email 1 — assunto:** "Betão, uma atualização sobre o tour da Pousada Cajueiro"
**Preview text:** "o período de 1 ano venceu — e tem uma coisa no Instagram que vale ajustar"

> Betão e família,
>
> Passei no perfil da Pousada Cajueiro hoje. O Google Meu Negócio está ótimo, tudo organizado,
> WhatsApp no lugar certo.
>
> Mas tem uma coisa importante: o período de 1 ano do tour virtual venceu. O tour ainda está no
> ar por enquanto, mas para manter ele ativo no seu perfil do Google são R$100/ano com desconto.
> Sem renovação, ele sai do ar em breve.
>
> E uma coisa que notei no Instagram: o link na bio está indo direto para o WhatsApp, em vez de
> apontar para o tour. Quem descobre a pousada pelo Instagram e quer conhecer o espaço antes de
> reservar não encontra o tour. É exatamente o tour que convence o cliente a escolher a sua
> pousada.
>
> Veja como ficou o site com tour de uma pousada que trabalhamos: realvisionmaps.com/portfolio/vila-mandela
>
> Além da renovação do tour, aqui está o que ofereço:
> - Renovação do tour: R$100/ano
> - Domínio próprio (pousadacajueiro.com.br): R$40/ano
> - Cartão digital: a partir de R$300/ano
> - Landing page: a partir de R$800/ano
> - Site profissional com domínio e tour integrado: a partir de R$1.500/ano
>
> Me fala o que quiser fazer.
>
> Felipe, Real Vision
>
> P.S.: Com um domínio próprio, o endereço da pousada na internet ficaria algo como
> pousadacajueiro.com.br. Isso passa mais credibilidade para quem pesquisa online.

**WhatsApp 1:**

> Oi, Betão! Aqui é o Felipe, da Real Vision. Fiz o tour da Pousada Cajueiro.
>
> Te mandei um email agora (realvisionmaps360@gmail.com). O mais importante: o período de 1 ano
> do tour venceu. Para manter ele no ar são R$100/ano. Vi também uma coisa no Instagram que vale
> ajustar.
>
> Posso te explicar em dois minutos?

**Atenção:** esses preços são de junho/2026. Confirmar se ainda estão vigentes antes de reciclar
em qualquer proposta nova — não foram revalidados para este documento.

---

## 6. Lacunas conhecidas no registro (não inventar o que falta)

- **Nenhuma entrega registrada** na tabela `deliveries` do VisionFlow, mesmo o cliente estando com
  status `entregue`. Não há link do tour, nem outro ativo, catalogado no CRM.
- **Nenhum arquivo (`files`)** vinculado ao cliente no VisionFlow.
- **Nenhuma transação financeira** registrada no VisionFlow (total R$0) — o pagamento original do
  tour de jan/2025 não está documentado em nenhum sistema consultado.
- **Checklist de entrega técnica** (analytics, domínio, favicon, GMN, tour incorporado etc.) no
  VisionFlow está com as 15 etapas em "pendente" — provavelmente é só o template padrão nunca
  preenchido, não uma indicação confiável de que nada foi feito de fato.
- **Email do cliente ainda não confirmado** — está em aberto na campanha de coleta de WhatsApp
  (#69, aguardando resposta desde 02/09/2026).
- Não existe proposta comercial nem contrato formal documentado no vault para este cliente.
- Isso já tinha sido sinalizado como lacuna conhecida em `wiki/questions/clientes-sem-entregas-no-banco.md`
  (varredura de 29/06/2026), junto com dois outros clientes na mesma situação (Emerson, Messias).

---

## 7. Regras de honestidade que valem também nesta conversa externa

- **Zero invenção de dado.** Preço, prazo, decisão do cliente, se algo foi enviado ou não — se não
  estiver neste documento ou o Felipe não disser agora, marcar como "a confirmar", nunca inventar.
- **Marcar proveniência.** Se a conversa externa propuser algo novo, deixar claro o que é fato
  trazido daqui, o que é pesquisa feita na conversa e o que é hipótese ainda não validada.
- **Não fechar preço nem prazo.** Qualquer valor final passa por aprovação explícita do Felipe.

---

## 8. O que trazer de volta pro Claude Code

O texto/decisão que sair da conversa externa (mensagem de retomada, proposta de site, plano de
próximos passos). O Claude Code usa isso mais o Company OS para transformar em ação real: atualizar
o VisionFlow, escrever a mensagem final, ou criar a proposta formal dentro do vault.
