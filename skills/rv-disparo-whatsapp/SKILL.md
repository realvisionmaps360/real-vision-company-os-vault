---
name: rv-disparo-whatsapp
description: Preferências fixas do Felipe para disparo de mensagens via WhatsApp Web usando o Chrome in Claude. Use SEMPRE que Felipe pedir para "mandar mensagem no WhatsApp", "disparar" pra um grupo/lista de contatos, ou "acessar meu WhatsApp" para enviar algo.
---

# rv-disparo-whatsapp — Preferências de Disparo via WhatsApp

Skill de preferências operacionais. Não é um playbook de copy (para o texto da mensagem em si, ver `rv-copy`) — é sobre **como executar o envio**.

## Qual navegador/ferramenta usar

**Sempre usar Chrome in Claude** (`mcp__claude-in-chrome__*`), nunca o Browser pane nativo do Claude Code (ver [[reference_playwright_mcp_instalado]] — mesma lógica: o WhatsApp Web precisa do navegador real do Felipe, já logado, não de uma sessão nova).

Fluxo de conexão:
1. `tabs_context_mcp` (ou `navigate` direto) para abrir/achar a aba.
2. Navegar para `web.whatsapp.com`.
3. Aguardar carregar — se aparecer só o splash screen, dar `wait` de alguns segundos e tirar novo screenshot. Não precisa escanear QR Code: a sessão já fica logada no perfil do Chrome do Felipe.

## Qual WhatsApp é esse

**O WhatsApp Web que abre nesse Chrome é o pessoal do Felipe, número final 1924** (WhatsApp Business, aparece como "WhatsApp Business" na aba). Não é o Hermes/Thomas Anderson (esse é outro ecossistema, via VPS) nem nenhum WhatsApp de cliente. Se um dia o Felipe disser "usa o outro WhatsApp" ou mencionar outro número, perguntar qual — não assumir.

## Como localizar e enviar para múltiplos contatos (disparo 1:1)

Quando o pedido é "manda essa mensagem pra cada um dos membros de um grupo" (não é mensagem NO grupo, é 1:1 pra cada membro), o processo tem duas fases separadas — **extrair a fila de uma vez** e só depois **disparar contato por contato**. Não misturar as duas (não reabrir o painel de membros a cada envio — é lento e desnecessário).

### Fase 1 — extrair a fila (uma vez só, para toda a leva)

1. Abrir o grupo → clicar no cabeçalho → "Dados do grupo".
2. Rolar até a lista de membros → clicar em "Ver tudo (mais N)" → abre o modal "Pesquisar membros".
3. Com o modal aberto (sem digitar nada no campo de busca), usar `read_page` com `ref_id` do container da lista (`filter: "all"`) para ler os membros renderizados — a lista é virtualizada, então só ~13-20 itens aparecem por vez no DOM.
4. Rolar (`scroll`) dentro do modal e repetir o `read_page` a cada rolagem, anotando os números novos (ainda não constam no CONTROLE-ENVIOS.md da campanha) até juntar a quantidade pedida (ex: 20).
5. **Sempre excluir:** administradores do grupo (tag "Admin do grupo") e qualquer nome que o Felipe apontar explicitamente (ex: "menos a Tati e o Renan"). Contatos com nome (não só número) são válidos como alvo — só admin/excluído fica de fora.
6. Salvar a fila extraída num arquivo temporário na pasta da campanha (ex: `TEMP-levaN.md`, com tabela `# | Número | Status`) **antes** de começar a mandar qualquer mensagem. Isso é o que permite continuar de onde parou se a sessão cair no meio.

### Fase 2 — disparar (um contato por vez, usando a fila salva)

Não usar mais o painel "Dados do grupo" nesta fase — é mais rápido pela busca de nova conversa:

1. Clicar no ícone de "Nova conversa" (lápis, canto superior — ou `ref` do botão "Nova conversa").
2. Clicar no campo de busca e digitar o número completo com código do país: `+55 DD NNNNN-NNNN`.
3. Aguardar ~2s o resultado aparecer (é busca assíncrona) e clicar no resultado.
4. Aguardar o chat carregar (~2-3s — se clicar/digitar cedo demais, o texto pode cair na conversa anterior ainda aberta; **sempre confirmar pelo cabeçalho do chat, no screenshot, que o número é o esperado antes de clicar em enviar**).
5. Clicar no campo de mensagem, digitar. Usar `shift+Return` para quebra de linha (Enter sozinho **envia** a mensagem no WhatsApp Web — nunca usar `\n` cru no `type`).
6. Tirar screenshot pra confirmar que o texto está no chat certo, então clicar no botão de enviar (seta, canto inferior direito).
7. Repetir para o próximo número da fila salva na Fase 1.

Esses passos (2-6) podem ir num único `browser_batch` por contato — só o clique final de enviar fica separado, depois de conferir o screenshot.

**Ritmo:** um contato por vez, manual — não existe modo "broadcast automático" no WhatsApp Web sem risco de o número ser marcado como spam. Antes de dar sequência a uma leva grande (10+ contatos), **sempre confirmar com o Felipe o volume** ("quantos agora?") antes de disparar — não presumir "manda pra todo mundo".

## Registro obrigatório

Toda campanha de disparo em massa deve ter um arquivo de controle em `operacao/prospeccao/campanhas/[nome-da-campanha]/CONTROLE-ENVIOS.md`, listando: nome/perfil, número, resultado (entregue / resposta automática / resposta manual), e qual foi o último contato enviado — para retomar de onde parou na próxima sessão. Ver exemplo em [[project_conecta_negocios_whatsapp]] (campanha `conecta-negocios-whatsapp`).

Ao fim de cada leva: consolidar os resultados direto no CONTROLE-ENVIOS.md e apagar o `TEMP-levaN.md` da Fase 1 (ele é só rascunho de trabalho, não fica no repositório).

## Regras de ouro que também valem aqui

- Nunca inventar destinatário — a lista de contatos vem sempre de uma fonte real (grupo do WhatsApp, planilha, VisionFlow), nunca gerada.
- Mensagem de prospecção segue `contexto/VOZ.md` e a skill `rv-copy` — revisar antes de sair enviando em massa.
- Isso é comunicação com terceiros: mesmo com autorização geral do Felipe pra campanha, qualquer mudança de mensagem-modelo ou público-alvo é boa prática confirmar antes de rodar uma leva nova.
