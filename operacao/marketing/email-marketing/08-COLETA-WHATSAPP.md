# Coleta de emails via WhatsApp — controle

**Número usado:** esse WhatsApp Business é o número principal do Felipe Garcia — as mensagens estão sendo mandadas pra pessoas que já são contatos existentes nesse número principal, não é um número secundário/comercial separado.

Objetivo: captar o email de cada contato do WhatsApp Business pra newsletter (projeto Hermes / email marketing). Não é mais prospecção de lead — é captação de email de toda a rede, incluindo família de 1º grau (ver regra atualizada abaixo).

Destino final dos emails confirmados: Supabase `ghwjetvazmdlaqidgxqi`, tabela `email_contatos` (coluna `tags` marca a categoria: amigo / familia / cliente).

## Regra de cobertura (atualizada 02/09/2026)

**Mandar pra todos.** Não filtrar contato por "qualidade" da relação, tipo de interação ou se parece frio/comercial — a única checagem é: já existe conversa registrada no WhatsApp (qualquer tipo, mesmo mínima)? Se sim, manda. A única razão válida pra NÃO mandar de novo é já ter mandado antes nesta campanha e a pessoa ainda não ter respondido — nesse caso não duplica, só espera. Grupos e bots automáticos continuam fora. Família de 1º grau também entra na campanha normalmente — ver regra revisada abaixo, que muda a exclusão anterior.

## Templates aprovados (02/09/2026, template A revisado 02/09/2026, abertura "Bom dia" a partir do Lote 8)

**A — Amigo/conhecido casual**
> Bom dia, [nome]! Beleza? To criando aqui uma newsletter pra mandar novidade sobre tecnologia, IA e o que ando fazendo (site, tour 360, automação) — nada de spam, só parada boa de vez em quando. Posso te botar na lista? Me manda seu email aí 👇

**Correção 02/09/2026:** removida a expressão "uns projetos loucos que ando fazendo" a pedido do Felipe. Válido a partir daqui — mensagens já enviadas com a versão antiga não são reenviadas.

**Correção 02/09/2026 (Lote 8):** abertura trocada pra "Bom dia" a pedido do Felipe (era "E aí" / "Oi"). Vale pros templates A, B e C a partir do Lote 8 — mensagens já enviadas não são reenviadas.

**B — Família não-imediata / carinhoso**
> Oi [nome], tudo bem? To organizando uma lista de email pra mandar novidade sobre o que eu ando fazendo — projetos, viagens, essas coisas. Nada de trabalho chato, só pra manter contato. Pode me passar seu email? Quero te colocar na lista ✌️

**C — Cliente/profissional (tom Real Vision)**
> Oi [nome], tudo bem? Aqui é o Felipe, da Real Vision. To organizando nossa lista de contatos pra newsletter — presença digital, tendências, novidades que podem ajudar seu negócio. Envio esporádico, sem spam. Posso confirmar seu email pra te adicionar?

Regra: nenhum emoji de coração (💛❤️ etc) em nenhum template.

**Importante (correção 02/09/2026):** mesmo quando o email já aparece no histórico da conversa, é obrigatório mandar mensagem pedindo autorização/confirmação — nunca adicionar email à lista sem o contato confirmar que pode usar aquele endereço. Variante de confirmação (mesmo tom A/B/C, só troca o final):

> [abertura no tom certo] ... Vi aqui que seu email é [email] — posso usar esse mesmo pra te colocar na lista?

## Regra de exclusão de família (revisada 02/09/2026)

**Decisão nova de hoje (02/09/2026):** família de 1º grau **entra** na campanha normalmente, como qualquer outro contato — a regra antiga de excluir todo mundo desse grupo foi revogada. A única exclusão por já ter email confirmado é: **Pai (Acacio)**, **Mãe (Lucy Mae / Maria Luci)** e **Romana** — os três já têm email na base por outro canal, não precisam de novo disparo.

**Liberados hoje** (antes estavam na lista de exclusão de família, agora recebem mensagem normalmente): Drenka Mama, Tata Mile Loznjakovic, Gê Prima, Diego Primo, Victor Iberg (irmão da namorada).

**Continuam bloqueados, mas por motivo separado** — pedido explícito do Felipe, não é regra de família: **Christine Garcia** e **Vitoria Morais**.

Débora e Cibele Irmã (irmãs do Felipe, família de 1º grau) já tinham recebido mensagem antes mesmo de existir qualquer exclusão de família no processo — o que hoje é simplesmente o comportamento correto sob a regra nova, não mais uma exceção. Ver registro delas no Lote 1/3 abaixo.

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| — | Cibele Irmã | Família (irmã) | Não encontrado | Mensagem (template B, "Oi Cibele...") enviada antes da exclusão ser identificada (regra antiga, hoje revogada) | ⏳ aguardando resposta |

## Lote 1 — primeiros 10 contatos (02/09/2026)

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| 1 | Vitor Vieira | Amigo | Sim, viitor.vieira@gmail.com | Felipe já pediu confirmação diretamente (fora do fluxo do Claude) | ✅ confirmado ("Mano coloca ai viitor.vieira@gmail.com") — salvo no Supabase 02/09/2026 |
| 2 | Mike The Guy (+41 79 360 93 04) | Amigo | Sim, mikey.mp3@gmail.com | Felipe já pediu confirmação diretamente (fora do fluxo do Claude) | ✅ confirmado ("mikey.mp3@gmail.com") — já estava salvo no Supabase como "Mikkel (Mike)" |
| 3 | Flávia Andrade — Pousada Barra Grande | Cliente | Achado no chat era login admin do site (administracao@clisam.com.br), não confiável como email pessoal | Mandada msg C às 05:06 pra confirmar email pessoal | ⏳ aguardando resposta |
| 4 | Moreno — Pousada Galeão | Cliente | Sim, mgazzaniga76@gmail.com (17/06/2026) | Mandada msg C de confirmação (pedindo autorização pra usar esse email) | ⏳ aguardando resposta |
| 5 | Solarium-Aarau (Gabriel Iberg) | Cliente | Sim, solarium-aarau@gmx.ch (email oficial pedido por eles) | Mandada msg C de confirmação | ⏳ aguardando resposta |
| 6 | Hallan (permuta) | Amigo/parceria | Não encontrado (busca "@" no chat vazia) | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 7 | Kamila Guimaraes — Restaurante Ademar Paraty | Prospect/Cliente | Não encontrado (busca "@" no chat vazia) | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 8 | Paula Fotógrafa Barra Grande | Profissional (recrutamento freelancer) | Não encontrado, conversa curta (só o anúncio OLX enviado por Felipe) | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 9 | Felipe Saturnino | Amigo | Não encontrado (busca "@" no chat vazia) | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 10 | Alexis (cliente La Fatas, gráfica na Suíça) | Cliente | Não encontrado — só o email do Felipe (realvisionmaps360@gmail.com) apareceu no histórico, dela não | Mandada msg C em alemão pedindo email | ⏳ aguardando resposta |

## Lote 2 — contatos 11-20 (02/09/2026)

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| 11 | ~~+55 19 99701-3824~~ | — | — | Pulado — é o mesmo número da Paula Fotógrafa (#8, duplicata) | — |
| 12 | ~~Lucy Mae~~ | Família | — | Pulado — descoberta como mãe do Felipe (grupo Família GP) | — |
| 13 | Guilherme T. Weber Rooftop | Amigo/negócio | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 14 | Damien Snowboarder | Amigo (EN) | Não encontrado | Mandada msg A em inglês | ⏳ aguardando resposta |
| 15 | Saulo (AMP Estúdio & Escola de Música) | Lead/Cliente | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 16 | Eduardo Macario | Amigo | Não encontrado (só Instagram nos grupos) | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 17 | +55 28 99933-9279 (lead da LIVE de IA) | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 18 | Eduardo Pires Barqueiro Paraty | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 19 | Dorivas | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 20 | ~~Vitoria Morais~~ | — | — | Pulado — pedido explícito do Felipe | — |
| 21 | ~~Christine Garcia~~ | — | — | Pulado — pedido explícito do Felipe | — |
| 22 | Nikola Bruda | Amigo (DE) | Não encontrado | Mandada msg A em alemão (pedido do Felipe) | ⏳ aguardando resposta |
| 23 | William Primo | Família não-imediata (primo) | Não encontrado | Mandada msg B pedindo email | ⏳ aguardando resposta |
| 24 | Italo Nogueira | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |

Total de mensagens novas enviadas no lote 2: 10 (Guilherme, Damien, Saulo, Eduardo Macario, +55 28 99933-9279, Eduardo Pires, Dorivas, Nikola, William Primo, Italo Nogueira).

## Lote 3 — contatos 25-44 (02/09/2026, 20 processados)

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| 25 | Débora | Família (irmã) | Não encontrado | **Correção 02/09/2026:** mensagem (template B, "Oi irmã...") já tinha sido enviada antes de ela ser identificada como família/excluída (regra antiga, hoje revogada). Deixada como está, sem reenvio. | ⏳ aguardando resposta |
| 26 | Celina | Amigo (DE) | Não encontrado | Mandada msg A em alemão | ⏳ aguardando resposta |
| 27 | Florian (+41 79 101 16 24) | Amigo (DE) | Não encontrado | Mandada msg A em alemão | ⏳ aguardando resposta |
| 28 | Quintal Mangô | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 29 | O MANA'H (cliente Fabiano) | Cliente | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 30 | Adriano — Presidente Associação Moradores Ilha do Contrato | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 31 | Ismael Mr P | Amigo/prospect | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 32 | André Luth Barra Grande | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 33 | Wendell (contato salvo como "Cliente") | Cliente | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 34 | Teteus | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 35 | Francisco — Presidente Associação Empresários do Rudge | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 36 | Bela Tintas Castelo | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 37 | 🚒🛟🧯 Pintor | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 38 | Tati Instituto Conecta | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 39 | DanSantos Ilha Do Contrato | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 40 | Bruna Bessa Maré Alta Trips | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 41 | Dalecio Oficina Mecânica IAN | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 42 | Gustavo Serrano McFly Digital | Amigo/peer | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 43 | Reginaldo Zaglia | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 44 | Miller Gomes | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 45 | Humberto Melo | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |

Total de mensagens novas enviadas no lote 3: 20.

**Contatos pulados neste lote** (todos por serem grupos, bots automáticos, duplicatas ou família): Knowledge EXCHANGE, Internship (chat próprio com assistente), Thomas - Real Vision, Friends✨, Seguros Promo, Facebook, RL Vision Ricardo IPTV, K2 Network "LIXO", Alice-0800, Seu Sushi na Ilha, Gabriel Iberg (duplicata do Solarium-Aarau), Débora (irmã).

## Lote 4 — contatos 46+ (02/09/2026, parcial)

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| 46 | Dog Sp | Prospect/desconhecido | Não encontrado | Mandada msg C genérica | ⏳ aguardando resposta |
| 47 | Strawberry Farm | Fornecedor pessoal (morangos) | Não encontrado | **Correção 02/09/2026:** mensagem já tinha sido enviada (template C em alemão) antes de ser marcada como "fora de escopo". Recebeu resposta automática de horário de atendimento (é conta comercial). Deixada como está. | ⏳ aguardando resposta real |
| 48 | ~~+55 11 98234-7448~~ | — | — | Pulado — duplicata do Saulo | — |
| 49 | ~~+55 11 98967-1569~~ | — | — | Pulado — duplicata do Eduardo Macario | — |
| 50 | ~~+55 24 99292-2237~~ | — | — | Pulado — duplicata do Eduardo Pires Barqueiro | — |
| 51 | Viajando.com | Prospect | Não encontrado | Mandada msg C genérica | ⏳ aguardando resposta |
| 52 | Tatiana Férias Itacaré | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 53 | ANTONIO CLAUDIO | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 54 | Guto Academia | Prospect | Não encontrado | Mandada msg C genérica | ⏳ aguardando resposta |
| 55 | Marisa Auto Vidros | Fornecedor pessoal (loja onde Felipe é cliente) | Não encontrado | **Correção 02/09/2026:** mensagem já tinha sido enviada antes de ser marcada como "fora de escopo". Recebeu resposta automática de horário de atendimento (é conta comercial). Deixada como está. | ⏳ aguardando resposta real |
| 56 | Kezia Costa quintal Mango | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 57 | 4x4receptivo Alisson Transfer Jeri | Prospect | Não encontrado | **Correção 02/09/2026:** mensagem (template A) já tinha sido enviada antes de ser marcada como cold outreach. Deixada como está. | ⏳ aguardando resposta |

**Total de mensagens novas enviadas no lote 4: 6** (menos que os 20 pedidos — ver nota abaixo).

**Importante — a lista de contatos "quentes" está no fim.** A partir daqui, o que sobra na lista de conversas do WhatsApp é majoritariamente:
- Números sem nome salvo que, ao abrir, viram duplicata de gente já processada (aconteceu 3x neste lote)
- Contatos puramente familiares (Pai, Drenka Mama, Tata Mile, Diego Primo, Victor Iberg, Gê Prima — já excluídos)
- Contatos salvos sem nenhuma conversa real (frio demais pra esse tipo de mensagem)
- Fornecedores/lojas onde o Felipe é cliente, não prospect (autopeças, morango) — sem relação com o público-alvo da newsletter
- Grupos e bots automáticos (Facebook, Seguros Promo, K2 Network "LIXO", Alice-0800, Seu Sushi na Ilha)

Restam ainda sem checar: `+41 79 791 42 32`, `+41 78 269 24 96`, `+55 11 91894-1402`, `Grupo OLX`, e a leva de números `+55 11 9XXXX-XXXX` no final da lista de conversas (7-8 sem nome, ainda não abertos) — mas o retorno esperado é baixo (muita chance de duplicata ou contato frio).

## Achado fora do escopo — segurança

No chat "Internship" (02/09/2026) apareceu uma **SUPABASE_SERVICE_ROLE_KEY em texto puro**, colada num comando PowerShell pra reset de senha do site da Flávia/Vila dos Corais (projeto `xcymehoyqppdgvrhytfj`). Chave de acesso total ao banco exposta em conversa de WhatsApp — recomendado regenerar essa chave no painel do Supabase assim que possível.

## Resumo do Lote 1

- **Emails confirmados sem precisar de mensagem nova** (Felipe já tratou direto): nenhum ainda — todos os 10 contatos receberam ou vão receber mensagem de confirmação/pedido.
- **Emails já conhecidos, aguardando confirmação de uso**: Vitor (viitor.vieira@gmail.com), Mike (mikey.mp3@gmail.com), Moreno (mgazzaniga76@gmail.com), Solarium-Aarau (solarium-aarau@gmx.ch).
- **Email pedido do zero, aguardando resposta**: Flávia, Hallan, Kamila, Paula, Felipe Saturnino, Alexis.
- **Nenhum email foi salvo no Supabase `email_contatos` ainda** — só salvar depois que cada contato confirmar (responder "sim"/mandar o email de novo).

Atualizado durante o processamento — não fechar até todas as linhas terem status final. Próximo passo: esperar as respostas, salvar no Supabase os confirmados, e decidir se continua pro Lote 2 (próximos 10).

## Achado retroativo — Ben (+41 79 791 42 32)

Contato que estava na lista de "sem checar" do Lote 4 já tinha sido mensageado (template A em inglês) e respondeu com 👍👍 confirmando o email antes desta sessão. **Salvo no Supabase `email_contatos` em 02/09/2026** (nome: Ben, email: Roestib@gmail.com, tag: amigo, status: confirmado).

## Lote 5 — contatos 58+ (02/09/2026)

| # | Contato | Categoria | Email já tinha? | Ação | Status |
|---|---|---|---|---|---|
| 58 | +41 78 269 24 96 | Desconhecido | Não encontrado | **Correção 02/09/2026:** inicialmente pulado por parecer outreach frio; reenviado após decisão de mandar pra todos. Mandada msg C genérica | ⏳ aguardando resposta |
| 59 | +55 11 91894-1402 (Renan — suporte técnico) | Desconhecido | Não encontrado | **Correção 02/09/2026:** inicialmente pulado por ser assunto de suporte técnico (CGNAT); reenviado após decisão de mandar pra todos. Mandada msg C pedindo email | ⏳ aguardando resposta |
| 60 | Francisco — Fazenda Coroa Azul | Cliente | Não (ficha só tinha "email —") | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 61 | Henrique pinturas | Amigo/contratado | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 62 | Elizeo (da câmera) | Amigo/conhecido | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 63 | William Tibia | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 64 | Letice Hallan | Amigo/parceria (esposa do Hallan) | Não encontrado | Mandada msg A pedindo email | Resposta automática de horário de atendimento — **é conta comercial, não pessoal**. Aguardando resposta real |
| 65 | +55 11 98271-2051 (Connecta Digital) | Amigo/peer profissional | Não encontrado | Mandada msg A genérica (sem nome) | ⏳ aguardando resposta |
| 66 | +55 88 9690-4477 | Desconhecido | Não encontrado | Mandada msg A genérica (sem nome) | Resposta automática de bot ("Professor Gilson") — provável conta comercial. Aguardando resposta real |
| 67 | +55 11 93405-1572 | Desconhecido | Não encontrado | Mandada msg A genérica (sem nome) | ⏳ aguardando resposta |
| 68 | +55 11 97507-3270 | Desconhecido | Não encontrado | **Correção 02/09/2026:** inicialmente pulado por ter só resposta automática de bot no histórico; reenviado após decisão de mandar pra todos. Mandada msg C genérica | ⏳ aguardando resposta |
| 69 | Betão — Pousada Cajueiros Ilha | Cliente (reativação) | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 70 | Didier — BarraGrande.Net / Casa dos Cajus | Cliente (reativação) | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 71 | Fernanda — Restaurante Siribar | Cliente (reativação, amiga próxima) | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 72 | Getúlio Pratigí | Cliente (reativação) | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 73 | Ian Marques — Terui Barra Club | Cliente (reativação) | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 74 | Lucas Vasconcellos Criolo | Amigo próximo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 75 | Renan Queiroz (Vereador, família Garcia) | Amigo/família não-imediata | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 76 | Filipi Felix Tattoo | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 77 | Maycon Douglas Yanomami | Amigo | Não encontrado | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 78 | Pedro — Ação Humana Ancestral (Paraty Mirim) | Prospect | Não encontrado | Mandada msg C pedindo email | ⏳ aguardando resposta |

**Nenhum contato pulado neste lote** — todos os 21 (#58-78) receberam mensagem, incluindo os 3 que tinham sido pulados por julgamento próprio (#58, #59, #68) e revertidos após a auditoria de 02/09/2026 (ver seção "Auditoria" abaixo).

**Nota:** Betão, Didier, Fernanda, Getúlio e Ian Marques (Terui) também fazem parte da campanha separada de reativação de clientes (`rv-reativacao`, tour 360 vencido). A mensagem daqui é sobre a newsletter, tema distinto — não substitui nem conflita com a campanha de reativação.

## Auditoria 02/09/2026 — conferência completa da lista

Felipe apontou que o documento estava dizendo "pulado" pra contatos que na verdade já tinham recebido mensagem. Foi feita uma varredura completa de todos os chats dos Lotes 1-5 (mensagens + respostas) pra corrigir. Achados:

1. **Discrepâncias corrigidas** (documento dizia "pulado", mas mensagem já tinha sido enviada): Strawberry Farm (#47), Marisa Auto Vidros (#55), 4x4receptivo Alisson (#57), Cibele Irmã (fora de tabela), Débora (#25). Todas corrigidas acima — nenhuma foi reenviada, só documentadas como já enviadas.
2. **Contatos pulados por julgamento próprio, revertidos e reenviados** (#58, #59, #68 do Lote 5) — ver acima.
3. **Confirmações de email encontradas e salvas no Supabase:** Vitor Vieira (viitor.vieira@gmail.com), Ben/+41 79 791 42 32 (Roestib@gmail.com). Mike The Guy já estava salvo com outro nome ("Mikkel (Mike)").
4. **Contas comerciais identificadas** (respondem com bot/horário de atendimento, não são contato pessoal): Letice Hallan, +55 88 9690-4477 ("Professor Gilson"), Ismael Mr P ("4tons comunicação visual"). Deixadas na lista aguardando resposta real de um humano.
5. **Regra nova salva:** ver seção "Regra de cobertura" no topo do documento — mandar pra todos, só não duplicar quem já foi mandado e está aguardando resposta.

## Lote 6 — contatos 79-98 (02/09/2026)

Christine Garcia confirmada como BLOQUEADA (pedido explícito reforçado) — segue fora de qualquer envio. Michele Prima liberada pelo Felipe apesar de ser prima (família não-imediata) — recebeu template B.

| # | Contato | Categoria | Ação | Status |
|---|---|---|---|---|
| 79 | Agnaldo — Brasil Oriente Viagens | Prospect | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 80 | +55 11 95350-5040 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 81 | Flávio Saturnino | Amigo | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 82 | Roosevelt Escritor | Amigo | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 83 | +55 11 94066-9590 | Conta comercial c/ interação humana real | Mandada msg C genérica | ⏳ aguardando resposta |
| 84 | Maaiikkee | Amigo (contato distinto do "Mike The Guy") | Mandada msg A genérica | ⏳ aguardando resposta |
| 85 | +55 19 99014-3494 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 86 | +55 11 99120-5366 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 87 | +55 62 9940-3938 | Conta comercial (agendamento) | Mandada msg C genérica | ⏳ aguardando resposta |
| 88 | +55 11 97385-2000 | Profissional (psiquiatra, contato pessoal do Felipe) | Mandada msg C genérica | ⏳ aguardando resposta |
| 89 | Entre Costas — Jundiaí (clínica Dr. Henrique) | Prospect | Mandada msg C genérica | ⏳ aguardando resposta |
| 90 | +55 11 91967-8664 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 91 | +55 61 9626-8613 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 92 | +55 86 9989-0026 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 93 | +55 61 9903-1050 (psiquiatra Thaissa Cruvinel) | Profissional | Mandada msg C genérica | ⏳ aguardando resposta |
| 94 | Emerson Santos Pratigí | Cliente (reativação — Pousada Recanto da Natureza) | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 95 | Loggica Ricardo | Amigo/peer | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 96 | Diogo — RioTur360° | Peer profissional (tour 360) | Mandada msg A pedindo email | ⏳ aguardando resposta |
| 97 | Kelly | Cliente (reativação — Pizzaria Baiana) | Mandada msg C pedindo email | ⏳ aguardando resposta |
| 98 | Michele Prima | Família não-imediata (prima), liberada pelo Felipe | Mandada msg B pedindo email | ⏳ aguardando resposta |

**Pulado:** Christine Garcia (bloqueio confirmado 02/09/2026).

Total de mensagens novas enviadas no lote 6: 20. A partir daqui o template A usado é a versão revisada (sem "projetos loucos que ando fazendo").

## Lote 7 — contatos 99-128 (02/09/2026)

| # | Contato | Categoria | Ação | Status |
|---|---|---|---|---|
| 99 | +55 85 9218-6360 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| — | ~~Luiz Otavio~~ | — | Pulado — bot de vendas (Kommo CRM) insistente; Felipe já mandou parar de mandar mensagem | — |
| 100 | +55 11 95357-2821 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 101 | +55 11 99418-9259 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 102 | +55 12 99620-8378 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| — | ~~Pizzaria Baiana~~ | — | Pulado — duplicata do negócio da Kelly (já mensageada #97) | — |
| 103 | Mateus Oliveira — Pousada Recanto Da Natureza Serinhaém | Amigo (distinto do Emerson, mesma pousada) | Mandada msg A | ✅ confirmado (teusz.oliveira7@gmail.com) — salvo no Supabase |
| 104 | Maaike Souza | Amigo (distinto do "Maaiikkee") | Mandada msg C | ⏳ aguardando resposta |
| 105 | Ari Ufólogo Ilha Bela | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 106 | Messias Rosário Serinhaem | Cliente (reativação — Restaurante Pôr do Sol) | Mandada msg C | ⏳ aguardando resposta |
| 107 | +55 11 4122-6190 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 108 | Thiago Ochiro | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 109 | Pretinha Pessoal (Jucélia — Fazenda Coqueirais) | Cliente (reativação) | Mandada msg C | ⏳ aguardando resposta |
| 110 | Viviane Tamara Costureira | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 111 | +55 11 98678-8703 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 112 | +55 11 4358-3425 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 113 | Paulo Henrique | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 114 | Zuleide — Pousada Sol Da Ilha | Cliente (reativação) | Mandada msg C | ⏳ aguardando resposta |
| 115 | Ramon Matos | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 116 | Anderson (filho do Antônio, Serinhaém) | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 117 | Antônio — Pratigí (Pousada Caminho da Praia) | Cliente (reativação) | Mandada msg C | ⏳ aguardando resposta |
| 118 | Adriana (do Antônio de Serinhaém) | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 119 | Erk Kiko | Amigo | Mandada msg A | ⏳ aguardando resposta |
| — | ~~Cloudfy~~ | — | Pulado — grupo de comunidade (2.517 msgs não lidas), não é contato pessoal | — |
| 120 | Nery — Mercado Pratigí | Cliente (reativação) | Mandada msg C | ⏳ aguardando resposta |
| — | ~~MindMap Ying Yang Gang~~ | — | Pulado — grupo | — |
| — | ~~Pousada Cajueiro Ilha~~ | — | Pulado — duplicata do negócio do Betão (já mensageado #69) | — |
| 121 | Alexandre Lima — Alto Paraíso | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 122 | Jair Serinhaem | Cliente (reativação) | Mandada msg C | ⏳ aguardando resposta |
| 123 | Jéssica Duarte | Amigo | Mandada msg C | ⏳ aguardando resposta |
| — | ~~+55 11 3425-0018 (A D Info)~~ | — | Pulado — bot comercial, sem interação humana | — |
| — | ~~Salve Jegue~~ | — | Pulado — grupo | — |
| — | ~~Alessandro Furtado~~ | — | Pulado — zero conversa real (só avisos de código de segurança) | — |
| — | ~~+55 11 99563-1610~~ | — | Pulado — zero conversa real | — |
| 124 | Madreverde Ananda | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 125 | +55 61 9175-7736 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 126 | Felipe M — Ilha Do Contrato | Amigo | Mandada msg A genérica | ⏳ aguardando resposta |
| 127 | Daniel Ascen | Amigo | Mandada msg A | ⏳ aguardando resposta |
| 128 | Miro Ilha Bela | Amigo | Mandada msg A | ⏳ aguardando resposta |

Total de mensagens novas enviadas no lote 7: 30 (5 pulados por serem duplicatas, grupos ou bots comerciais, 2 pulados por zero interação real, 1 pulado por pedido explícito de "não mandar mais").

## Varredura final de confirmações (02/09/2026, fim de sessão)

Conferência completa de todos os chats dos Lotes 1-7 em busca de respostas com email. Novas confirmações encontradas e salvas no Supabase:

| Contato | Email confirmado | Categoria |
|---|---|---|
| Diogo — RioTur360° | diogoluna2@hotmail.com | amigo |
| Mateus Oliveira — Pousada Recanto da Natureza | teusz.oliveira7@gmail.com | amigo |
| Flávio Saturnino | flaviosaturnino03@gmail.com | amigo |
| Michele Prima | mmachadogarcia9@gmail.com | familia |

Já confirmados em sessões anteriores (mantidos, não reprocessados): Ben/+41 79 791 42 32 (Roestib@gmail.com), Vitor Vieira (viitor.vieira@gmail.com), Mike The Guy (mikey.mp3@gmail.com, já estava salvo como "Mikkel (Mike)").

**Total de emails confirmados e salvos no Supabase até o fim desta sessão: 7.**

Nenhuma outra resposta com email novo encontrada na varredura — os demais contatos seguem "aguardando resposta".

## Varredura das mensagens mais recentes (02/09/2026, sessão de reorganização)

Nova sessão retomou o trabalho e encontrou confirmações que ficaram sem salvar. Varredura não foi o audit completo dos 158 — foi uma passada pelas conversas mais recentes (busca por `@gmail`, `@hotmail`, `@yahoo`, `@gmx`, `@outlook`, `@icloud` + lista "Tudo" ordenada por chegada) até a trilha esfriar.

| Contato | Email confirmado | Categoria |
|---|---|---|
| ANTONIO CLAUDIO (#53) | antonioclaudioc721@gmail.com | amigo |
| Italo Nogueira (#24) | italonogueira.dev@gmail.com | amigo |
| Letice Hallan (#64) | leticesn@gmail.com | amigo — resposta humana real ("belezaa, pode mandar sim"), não é mais só bot de horário |
| William Tibia (#63) | williammaciejewski@gmail.com | amigo |
| Daniel — +41 78 269 24 96 (#58) | danielcostadcr@gmail.com | amigo — nome inferido do próprio email, contato ainda salvo como "Desconhecido" antes |
| Renan Queiroz Vereador (#75) | renanmonteiroqueiroz@gmail.com | família não-imediata |
| Hallan (#6) | hallangsc@gmail.com | amigo/parceria |
| Nikola Bruda (#22) | nikolaloznjakovic7@gmail.com | amigo |
| Alex — +55 11 98271-2051 (#65) | alexvideoefoto@gmail.com | amigo/peer (Connecta Digital) |
| Tertuliano da Silva — "Pintor" 🚒🛟🧯 (#37) | tertulianodasilvatertuliano@gmail.com | prospect |
| Damien Snowboarder (#14) | damianohiltonno@gmail.com | amigo |
| William Primo (#23) | willliangc10@hotmail.com | família não-imediata (primo) |
| Roosevelt Escritor (#82) | rooseveltsoares@hotmail.com | amigo |
| Filipi Felix Tattoo (#76) | Felix.filipi@icloud.com | amigo |

**Total desta varredura: 14 salvos.** Total acumulado no Supabase: 21.

**Pendências encontradas, não salvas ainda:**
- **Emerson Santos Pratigí (#94)** — mandou o email duas vezes (07/45 hoje e 29/06) sempre como `recantopousada 6@gmail.com`, com espaço no meio. Endereço inválido como está — confirmar com ele antes de salvar, pra não gerar bounce.
- **Norabrignoccoli Nora (#135)** — respondeu "Pode sim" mas o email não apareceu na mensagem seguinte visível na varredura; precisa abrir a conversa pra achar.
- **Gabriel Iberg / Solarium-Aarau** (já no Supabase com `solariumaarau@gmail.com`) — pediu update: email oficial mudou pra `solarium-aarau@gmx.ch`. Fora do escopo desta varredura (não é contato novo), mas fica registrado.

A varredura completa dos ~140 contatos ainda sem resposta não foi feita nesta sessão — só a passada pelas conversas recentes acima.

## Lote 8 — contatos 129-158 (02/09/2026)

Abertura trocada pra "Bom dia" a partir daqui (pedido do Felipe). Bloco majoritariamente de prospects turísticos (Ilhabela) e restaurantes de Paraty (campanha de prospecção antiga).

| # | Contato | Categoria | Ação | Status |
|---|---|---|---|---|
| 129 | +55 41 9984-7420 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 130 | Renan Barbosa — Kaiak Ilha Das Cabras (Ilhabela) | Prospect turismo | Mandada msg C | ⏳ aguardando resposta |
| 131 | divan — Navegar É Preciso | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 132 | Maremar Turismo (Erica) | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 133 | Batucada Ilhabela Passeios | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 134 | +55 12 99136-3335 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 135 | Norabrignoccoli Nora | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 136 | Bombordo Turismo (Nik) | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 137 | +55 12 99706-4975 | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 138 | Capitan bola passeios | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 139 | +55 12 98246-2942 | Amigo | Mandada msg C genérica | ⏳ aguardando resposta |
| 140 | Agência Passeios no Paraíso | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| 141 | Ilhabela Guiada | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 142 | +55 12 99192-8478 | Prospect turismo | Mandada msg C genérica | ⏳ aguardando resposta |
| — | ~~+55 12 99207-6407~~ | — | Pulado — zero conversa real | — |
| 143 | +55 12 99230-4449 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 144 | +55 12 99620-1050 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 145 | +55 61 8239-8858 (Prospectagram) | Vendedor c/ interação pessoal | Mandada msg C genérica | ⏳ aguardando resposta |
| 146 | Marcio Guerreiro — Melhores Camisas (Galeria do Rock) | Amigo/prospect | Mandada msg C | ⏳ aguardando resposta |
| 147 | +55 73 8226-8885 | Desconhecido | Mandada msg C genérica | ⏳ aguardando resposta |
| 148 | Restaurante Manga Rosa (Fred) | Cliente (portfólio RV) | Mandada msg C, email já conhecido | ⏳ aguardando resposta |
| 149 | Sandra — Casa Obá | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 150 | Sr. Costinha (Antônio) | Amigo/prospect | Mandada msg C, email já conhecido (antoniocosta2215@gmail.com) | ⏳ aguardando resposta |
| 151 | Raphael — Casa Amarela (Barra Grande) | Cliente (portfólio RV) | Mandada msg C, email já conhecido (casaamarelagastrobarbg@gmail.com) | ⏳ aguardando resposta |
| 152 | Mark Bordados (Galeria do Rock) | Amigo | Mandada msg C | ⏳ aguardando resposta |
| 153 | PH OFF TRIPS! Ecoturismo (Pedro Henrique) | Prospect turismo | Mandada msg C | ⏳ aguardando resposta |
| 154 | Fazenda Bananal | Prospect (campanha Paraty 360°) | Mandada msg C genérica | ⏳ aguardando resposta |
| 155 | Pindorama Restaurante | Prospect (campanha Paraty 360°) | Mandada msg C genérica | ⏳ aguardando resposta |
| 156 | +55 24 99884-5916 (Recanto Caiçara) | Prospect (campanha Paraty 360°) | Mandada msg C genérica | ⏳ aguardando resposta |
| 157 | Armazém Mar Restaurante | Prospect (campanha Paraty 360°) | Mandada msg C genérica | ⏳ aguardando resposta |
| 158 | Gastromar | Prospect (campanha Paraty 360°) | Mandada msg C, email já conhecido (contato@gastromarparaty.com) | ⏳ aguardando resposta |

Total de mensagens novas enviadas no lote 8: 30. 1 pulado (zero interação real).

## Varredura final #2 (02/09/2026, fim de sessão)

Nenhuma confirmação de email nova encontrada além das 7 já registradas anteriormente — todos os contatos do Lote 8 seguem "aguardando resposta" (enviados nesta mesma sessão, ainda muito recentes). Sessão encerrada aqui.

Total de mensagens novas enviadas no lote 5: 18. Contatos pulados: 3 (outreach frio, suporte técnico, bot comercial).

## Relacionados

- [[07-COMO-ADICIONAR-CONTATOS]]
- [[03-SEGMENTACAO-CONTATOS]]

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-09-02 | Documento movido de `Felipe Garcia/contatos-whatsapp/coleta-emails-whatsapp.md` pra cá | Trabalho pertence ao projeto de email marketing (Hermes), não à pasta pessoal do Felipe |
| 2026-09-02 | Regra de exclusão de família reescrita | Família de 1º grau passa a entrar na campanha normalmente — só Pai/Mãe/Romana ficam fora por já terem email confirmado. Christine Garcia e Vitoria Morais continuam bloqueadas, mas por pedido explícito separado, não por regra de família |
