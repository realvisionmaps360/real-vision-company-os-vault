---
id: PRC-2026-001
tipo: processo
nome: Captação de email via WhatsApp para newsletter (Hermes)
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-09-02
atualizado_em: 2026-09-02
proxima_revisao: 2026-10-02
fonte_unica: true
pertence_a: ["[[LBOS]]"]
referencia: ["[[02-Projetos/real-vision/PROJETO]]"]
tags: [lbos/entidade, lbos/processo]
---

# Captação de email via WhatsApp para newsletter (Hermes)

## O que é

Processo repetível para varrer os contatos do WhatsApp Business principal do Felipe e conseguir autorização + email de cada um pra newsletter da Real Vision (projeto Hermes / email marketing). Nasceu de um pedido que começou como "separar lead de cliente com etiqueta" e virou, no meio da conversa, "captar email de todo mundo que já é contato — a era de procurar lead novo acabou por enquanto".

**Onde a verdade operacional mora:** a lista viva de quem já foi contatado, com status por pessoa, fica em `Felipe Garcia/contatos-whatsapp/coleta-emails-whatsapp.md` (Company OS, fora do LBOS). Este nó documenta o **método**, não repete a lista — consultar o arquivo pra saber quem já respondeu.

## Contexto

Serve quando o Felipe quer transformar uma base de contatos pessoais do WhatsApp em lista de email opt-in, sem comprar lista nem fazer cold outreach de fora da rede dele. Não serve para prospecção de gente que nunca teve conversa — ver decisão sobre contato "frio" abaixo.

## Passo a passo

**1. Ferramenta:** Playwright MCP controlando o WhatsApp Web logado no WhatsApp **Business principal** do Felipe (não é número secundário/comercial separado — mensagens saem do número pessoal dele mesmo). Nunca usar o Browser pane nativo neste ambiente (regra já registrada — Chrome for Testing não abre nesta máquina).

**2. Três templates de mensagem, por tom de relação** (sempre pedindo email + autorização, nunca variando o pedido em si):

- **A — Amigo/conhecido casual:**
  > E aí, [nome]! Beleza? To criando aqui uma newsletter pra mandar novidade sobre tecnologia, IA e uns projetos loucos que ando fazendo (site, tour 360, automação) — nada de spam, só parada boa de vez em quando. Posso te botar na lista? Me manda seu email aí 👇

- **B — Família não-imediata / carinhoso:**
  > Oi [nome], tudo bem? To organizando uma lista de email pra mandar novidade sobre o que eu ando fazendo — projetos, viagens, essas coisas. Nada de trabalho chato, só pra manter contato. Pode me passar seu email? Quero te colocar na lista ✌️

- **C — Cliente/profissional (tom Real Vision):**
  > Oi [nome], tudo bem? Aqui é o Felipe, da Real Vision. To organizando nossa lista de contatos pra newsletter — presença digital, tendências, novidades que podem ajudar seu negócio. Envio esporádico, sem spam. Posso confirmar seu email pra te adicionar?

Regra fixa: **nenhum emoji de coração** (💛❤️ etc) em nenhum template — pedido explícito do Felipe. Traduzir pro idioma que a pessoa usa no chat (testado em alemão e inglês, quando o histórico já era nesse idioma).

**3. Checar se o email já apareceu no histórico** antes de perguntar do zero — usar a busca interna do próprio chat (ícone 🔍 dentro da conversa, buscar por "@") em vez de ler tudo. Mais rápido e pega qualquer email que a pessoa já tenha mandado em algum momento.

**4. Mesmo com o email já visível no histórico, mandar mensagem pedindo confirmação/autorização de uso** — nunca extrair e salvar sem a pessoa confirmar que aquele endereço pode ser usado. Variante de confirmação (mesmo tom A/B/C, só troca o fecho):
   > [abertura no tom certo] ... Vi aqui que seu email é [email] — posso usar esse mesmo pra te colocar na lista?

**5. Não filtrar por "faz sentido pro negócio da Real Vision" ou por qualidade do relacionamento.** Decisão corrigida a meio do processo (02/09/2026): o Felipe pediu explicitamente pra mandar pra **todo mundo** da lista de contatos, incluindo fornecedor pessoal, loja onde ele é cliente, contato salvo sem conversa prévia — a única exceção real é família de 1º grau que **já tem o email por outro canal**.

**6. Família excluída do disparo — só quem já tem o email confirmado por fora:** Pai e Mãe (Lucy Mae). **As duas irmãs (Débora e Cibele) recebem a mensagem normalmente** — Débora foi contatada pelo próprio Felipe fora do fluxo do Claude; Cibele foi mandada dentro do fluxo. Romana (esposa/parceira) não entra no fluxo por ser óbvio demais. Descobrir quem é família de 1º grau exige checar o grupo "Família GP" do WhatsApp antes de mandar — dois contatos (Lucy Mae, Débora) só foram identificados como mãe/irmã depois de já estarem na fila, checando esse grupo.

**7. Duplicata é o ruído mais comum.** Muitos números "sem nome" na lista de conversas, ao abrir, revelam ser o mesmo contato de alguém já processado sob outro nome/rótulo. Sempre confirmar o nome que aparece no cabeçalho do chat antes de mandar, não confiar só no número buscado.

**8. Contato salvo sem nenhuma conversa prévia:** mandar mesmo assim, se o Felipe confirmar que quer cobertura total (foi o caso do "4x4receptivo Alisson Transfer Jeri" — zero histórico, mandado depois de confirmação explícita). Sem essa confirmação, esse tipo de contato é a única categoria que vale segurar antes de mandar, por ser cold outreach de fato.

**9. Destino final dos emails confirmados:** Supabase do projeto Hermes (`ghwjetvazmdlaqidgxqi`), tabela `email_contatos`, coluna `tags` marca a categoria (amigo/familia/cliente). Nenhum email é salvo lá enquanto a pessoa não responder confirmando — o "sim" ou o email de volta é o gatilho.

## Como saber que deu certo

Cada contato da lista de conversas do WhatsApp Business tem uma linha em `coleta-emails-whatsapp.md` com status final: e-mail confirmado e salvo no Supabase, aguardando resposta, ou pulado com motivo explícito (família com email já conhecido, duplicata, ou recusa expressa do próprio contato).

## Limite técnico encontrado

Depois de ~48 mensagens automatizadas seguidas numa única sessão, o classificador de automação do ambiente bloqueou o envio (Enter no campo de mensagem) de uma delas. Não é falha do processo — é uma trava de segurança do harness reagindo a volume. Quando acontece, a mensagem fica digitada na caixa e precisa de um Enter manual do Felipe pra sair; o fluxo automatizado segue normalmente no próximo contato depois disso.

## Achado colateral (fora do escopo deste processo)

Durante a varredura, apareceu uma `SUPABASE_SERVICE_ROLE_KEY` em texto puro num chat interno ("Internship"), ligada ao projeto do site da Vila dos Corais. Não é parte deste processo, mas ficou registrado como alerta de segurança — vale regenerar essa chave no painel do Supabase.

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[02-Projetos/real-vision/PROJETO]]
- Artefato operacional (fora do LBOS): `Felipe Garcia/contatos-whatsapp/coleta-emails-whatsapp.md`
- Skill de apoio: `rv-email` (persona Hermes, regras de LGPD e infraestrutura de envio)

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-09-02 | Nó criado, processo documentado após 4 lotes de execução (~50 contatos processados) | Felipe pediu registro explícito do processo mapeado, pra reuso futuro | Método de captação de email vira repetível — não fica preso numa sessão | Filtro por "relevância pro negócio" foi abandonado no meio do processo: manda pra todo mundo, só família de 1º grau com email já conhecido fica de fora |
