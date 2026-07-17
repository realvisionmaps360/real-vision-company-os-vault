# Playbook — Criar campanha numa conta Google Ads nova (sem histórico)

Descoberto na marra em 12/07/2026, criando a campanha "RV - Blog LLM vs SLM - WhatsApp". A interface do Google Ads muda com frequência — isso aqui documenta o comportamento **daquela data**; se algo não bater, é sinal de que o Google mudou de novo e este playbook precisa de uma revisão rápida, não de ser jogado fora.

## Contexto: por que isso é diferente do fluxo "normal"

Contas de anúncio que **já têm** pelo menos uma campanha criada mostram o menu lateral completo (Campanhas, Metas, Ferramentas, etc.) e o criador de campanha clássico, que tem um link/botão **"Criar uma campanha sem meta de orientação"** logo na primeira tela.

Contas **100% novas** (nunca criaram campanha, nem preencheram forma de pagamento) são forçadas por um assistente linear chamado "Criar sua primeira campanha" (`/aw/signup/aboutyourbusiness`). Esse assistente **não tem esse atalho** — é preciso passar por ele por completo pelo menos uma vez.

## Como identificar em qual conta você está

Estrutura da Real Vision: uma conta **administradora/MCC** (`359-167-3566`, "Felipe Garcia Real Vision conta google ads claude") gerencia contas **filhas** de anúncio de verdade (ex: `414-120-1211`). O seletor de conta no topo da tela troca entre elas — **preste atenção no número**, é fácil ficar na conta MCC por engano e ver "Não há dados" achando que é bug.

Pra trocar: clica na seta ▼ ao lado do nome/número da conta no topo → busca pelo Customer ID (formato `XXX-XXX-XXXX`) → seleciona.

## Passo a passo do assistente de conta nova

1. **Adicionar informações comerciais** (obrigatório antes de tudo)
   - "Para onde as pessoas devem ir?" → escolhe **"Seu site"** e digita a URL real (`https://realvisionmaps.com`, não a página específica ainda)
   - ⚠️ **Cuidado:** o navegador pode autopreencher esse campo com lixo (nesta sessão veio um link do Booking.com). Sempre conferir antes de avançar.
   - Nome da empresa: preencher normalmente

2. **Escolher meta** — aparecem 3 cards (Enviar formulário de lead / Leads de chamadas / Engajamentos na loja) +, se rolar mais, mais opções (Reconhecimento da marca, Vendas, Promoção de app, etc.)
   - **Nenhuma dessas serve pra campanha de tráfego/conteúdo.** Escolher qualquer uma delas leva direto pro tipo de campanha **Performance Max** (automatizado, sem controle manual de palavras-chave) — não é o que queremos numa campanha de Pesquisa pura.
   - **O que fazer:** rolar até o fim da lista de metas → tem um link **"Pular"** perto dos botões Voltar/Avançar. Clicar em Pular.

3. **Escolher tipo de campanha** (só aparece depois do "Pular")
   - Tela "Escolha um tipo de campanha" com opções: Vídeo (recomendado), Pesquisar, e outras via "Veja mais".
   - Selecionar **"Pesquisar"**.

4. **Selecionar palavras-chave**
   - Campo "URL final" já vem preenchido com a home — trocar pela página de destino real (URL específica do post/landing page).
   - Colar as palavras-chave (uma por linha, com aspas/colchetes já formatados) no campo de texto único. **Esse fluxo simplificado só cria um grupo de anúncios por vez** — se o briefing tem mais de um grupo, os outros precisam ser adicionados depois, manualmente, já com a campanha criada.

5. **"Mais configurações"** (painel lateral, abre ao lado da tela de palavras-chave)
   - Locais / Idiomas: geralmente já vêm certos (herdados da conta), conferir mesmo assim.
   - Segmentos de público-alvo: pode deixar vazio, "Observação (recomendado)" já é o padrão seguro.
   - **Redes:** por padrão vêm marcadas "Rede de parceiros de pesquisa" e "Rede de Display" — **desmarcar as duas** se o objetivo é campanha de Pesquisa pura (evita gasto fora do Google Search).
   - Clicar em "Concluído".

6. **Criar anúncios**
   - O Google pré-preenche títulos genéricos (ex: puxando do site) — **apagar e colar os textos reais** do briefing (títulos + descrições).
   - Caminho de exibição: campos pequenos (15 caracteres cada), opcional mas ajuda a relevância.
   - Sitelinks: aparecem em "Mais tipos de recursos" → "Sitelinks" → "+ Novo recurso" — preencher texto do link + 2 linhas de descrição por sitelink.
   - **Não abrir os outros 7 itens** de "Mais tipos de recursos" (Promoções, Preços, Mensagens, Frases de destaque, Snippets, formulários de lead, Aplicativos) a menos que o briefing peça.
   - ⚠️ **Atenção especial em "Chamadas":** o Google pode pré-sugerir uma extensão de chamada usando o telefone cadastrado na conta, sem você pedir. Se o objetivo da campanha não é ligação, abrir esse item e conferir — se nada estiver de fato selecionado (marcado), só cancelar sem aplicar.
   - "Opções de URL do anúncio" (modelo de acompanhamento, sufixo, parâmetro personalizado): deixar em branco a menos que exista uma ferramenta externa de tracking exigindo isso — o tracking GA4 nativo não precisa.

7. **Definir estratégia de lances**
   - Se a conversão ainda não estiver validada/marcada como principal no Google Ads, **não escolher "Conversões"** (é a opção padrão pré-selecionada) — trocar para **"Cliques"**. Voltar pra otimizar por conversão só depois que o tracking estiver 100% validado.

8. **Definir orçamento**
   - O Google sugere valores mais altos com aviso amarelo de "orçamento baixo comparado a outros anunciantes" — **ignorar esse aviso** se o orçamento já foi combinado com o Felipe.

9. **Forma de pagamento**
   - **Pix no Brasil = saldo pré-pago manual.** Sem cobrança automática recorrente — você recarrega antes, e o Google desconta conforme os cliques. Se o saldo acabar, a campanha simplesmente pausa (sem dívida, sem cobrança inesperada). Boa opção se o Felipe quiser controle total do gasto e não se importar com a campanha pausar sozinha.
   - Cartão de crédito = cobrança automática recorrente, sem risco de pausa por saldo.
   - Perguntar ao Felipe qual prefere; não assumir.

10. **Tela final "Comece a alcançar mais pessoas"**
    - A campanha já foi criada e enviada **nesse ponto** — a mensagem "Seus anúncios serão veiculados após a revisão" é o sinal.
    - **⚠️ Diferente do fluxo clássico, esse assistente NÃO oferece a opção de ficar pausada.** A campanha nasce **ATIVA** (status `ENABLED`). Se a regra do projeto é "criar pausada, ativar só com aprovação explícita", isso precisa ser resolvido de duas formas:
      - Verificar o status assim que a campanha for criada (via `mcp__google-ads-mcp__search_search` no resource `campaign`, campo `campaign.status`) e pausar manualmente na interface (clicar na bolinha verde ao lado do nome da campanha) **antes** de pedir aprovação — ou
      - Avisar o Felipe com antecedência, antes de começar o assistente, que essa conta específica vai publicar direto e pedir o aval logo no início do processo, não no fim.
    - A tela também oferece instalar uma **segunda tag do Google** (`AW-XXXXXXXXXX`, específica da conta Ads) no site — **opcional** se o GA4 já estiver vinculado à conta de Ads e as conversões vierem por lá. Pode pular clicando no X.

## Pós-criação (o que falta sempre)

Como esse fluxo simplificado não cobre tudo do briefing completo, depois de criar a campanha ainda é preciso, manualmente, já dentro da campanha criada:
- Adicionar grupos de anúncios extras (além do primeiro criado no assistente)
- Adicionar palavras-chave negativas em nível de campanha
- Renomear a campanha (o assistente cria com nome genérico tipo "Campaign #1")
- Marcar a conversão como principal, se ainda não estiver
