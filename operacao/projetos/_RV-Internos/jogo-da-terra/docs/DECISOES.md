# Decisões — O Jogo da Terra

> Registro vivo: toda decisão tomada em sessão entra aqui com data. Perguntas abertas ficam numeradas (Q1, Q2...) até serem respondidas pelo Felipe.
> Última atualização: 04/07/2026.

---

## Decisões tomadas

| Data | Decisão | Origem |
|---|---|---|
| 04/07/2026 | O projeto existe: primeiro jogo da Real Vision, Android, começa gratuito, depois R$ 100/ano | Felipe (áudio de abertura do projeto) |
| 04/07/2026 | História de progressão baseada na vida e obra de Manly P. Hall | Felipe |
| 04/07/2026 | Estética Game Boy / pixel art (Pokémon, Zelda) | Brainstorm (IDEIAS SOLTAS) |
| 04/07/2026 | NPCs com IA reagem à aura/atributos do jogador: idolatram ou **ignoram** (nunca desprezam) | Felipe |
| 04/07/2026 | Sistema de skills/atributos estilo RPG, evolução por achievements | Felipe |
| 04/07/2026 | Filosofia do jogo = filosofia da Real Vision: abrir a mente das pessoas | Felipe |
| 04/07/2026 | Pasta do projeto: `operacao/projetos/_RV-Internos/jogo-da-terra/` | Sessão de criação |
| 04/07/2026 | **Q1 respondida:** SIM — escada própria de 7 estágios (opção a), sem usar nomes/método do vídeo | Felipe |
| 04/07/2026 | **Q2 respondida:** opção A — assinatura cobrada pelo Google na Play Store (~15% de taxa) | Felipe |
| 04/07/2026 | **Q3 respondida:** opção B — capítulos/mundos fechados; costura entre eles = o **Globo** com animação de viagem até o local | Felipe |
| 04/07/2026 | **Q5 respondida:** PT primeiro, mas construído preparado pra tradução desde o dia 1 | Felipe |
| 04/07/2026 | **Q6 respondida:** o formato mais simples e barato que entrega o MVP, com as ferramentas que já temos — detalhado em [[STACK]] | Felipe |
| 04/07/2026 | **Q7 respondida:** opção A — termos "que dão medo" apresentados de forma sutil e abrangente, educando enquanto joga | Felipe |
| 04/07/2026 | **Q8 respondida:** faseamento aprovado; MVP da Fase 1 começa APENAS pelo capítulo "A Simbologia do Corpo Humano"; ainda estamos em design, nada de código antes do design fechar | Felipe |
| 04/07/2026 | Conceito central (seção 1 do GAME-DESIGN) validado | Felipe |
| 04/07/2026 | História desvinculada do nome do Manly P. Hall: jogador cria o próprio personagem; livro entra como fonte creditada discretamente nos créditos | Felipe |
| 04/07/2026 | Progressão por conversas: perguntas-chave destravam estágios; IA analisa o que o jogador expressa; achievements/troféus/medalhas acumuláveis | Felipe |
| 04/07/2026 | Regra de interrupção nas rodinhas: fala pertinente = NPCs ouvem e respondem; não pertinente = terminam de falar, ignoram e seguem | Felipe |
| 04/07/2026 | MOSS-TTSD aprovado como motor de voz da fábrica, mas **adiado como projeto futuro** (Fase 4); PC do Felipe (GTX 1060 3GB) não roda o modelo — quando chegar a hora, GPU de nuvem por hora. Ver [[FERRAMENTA-VOZ-MOSS-TTSD]] | Felipe |
| 04/07/2026 | Foco atual do projeto: **design das telas do jogo** | Felipe |
| 04/07/2026 | Sequência de viagem definida: linha atravessando o mapa + mergulho → tela preta mostrando o ANO do evento → diálogo de abertura entre dois personagens | Felipe (áudio) |
| 04/07/2026 | Legibilidade da interrupção: ao ignorar o jogador, o NPC vira e olha para o personagem antes de retomar a conversa — sinal visual de que ele está incomodando | Felipe (áudio) |
| 04/07/2026 | **Q4 respondida: o nome do jogo é EARTH GAME** — pendência prática: checar disponibilidade na Google Play Store e domínio antes do lançamento | Felipe |
| 04/07/2026 | Gráficos: pixel art SIM, mas com acabamento moderno ("gráficos legais") — os mockups de blocos eram estudo de layout, não o nível visual final; direção gráfica a definir com arte-conceito | Felipe |
| 04/07/2026 | **Design do MVP completo:** as 9 telas aprovadas em mockup (Conversa, Cenário, Globo+viagem e as 6 de apoio); filosofia visual "Nigredo Luminoso" (quase P&B + brasa dourada, jogador como único ponto de cor quente); imagens em `design/` | Felipe |

---

## Perguntas abertas (para o Felipe decidir)

> Q1, Q2, Q3, Q5, Q6, Q7 e Q8 foram respondidas em 04/07/2026 — ver tabela de decisões acima.

### Q4 — Nome do jogo (RESPONDIDA em 04/07/2026)
**EARTH GAME.** Falta só a checagem prática de disponibilidade na Play Store e domínio antes do lançamento — ver tabela de decisões.

### Q9 — Escolher a escada de progressão (NOVA)
Proposta principal: **A Grande Obra** (7 operações alquímicas: Calcinação → Dissolução → Separação → Conjunção → Fermentação → Destilação → Coagulação). Alternativa: **Graus dos Mistérios** (Dormente → ... → Hierofante). Detalhes e justificativa no [[GAME-DESIGN]] seção 2. *Recomendo a Grande Obra.*

### Q10 — Aprovar a stack (NOVA)
Proposta completa em [[STACK]]: React + Phaser + Capacitor + Supabase + API do Claude (modelo pequeno) + Google Play Billing; conteúdo pré-fabricado na produção, IA ao vivo só nas interações do jogador. Falta o OK do Felipe.
