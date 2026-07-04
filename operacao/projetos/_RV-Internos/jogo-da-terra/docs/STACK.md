# Stack — O Jogo da Terra

> Com o que o jogo vai ser construído, explicado em linguagem simples. Princípio norteador (decisão Q6, 04/07/2026): **o formato mais simples e barato que entrega o MVP**, usando ferramentas que já dominamos.
> Última atualização: 04/07/2026. Status: 🟡 proposta — aguardando OK do Felipe.

---

## 1. A regra de ouro do custo

O truque que faz este jogo ser barato de operar: **separar o que é fabricado antes do que acontece ao vivo.**

| Momento | O que é | Quem paga | Custo |
|---|---|---|---|
| **Na fábrica** (nós, durante o desenvolvimento) | Transformar capítulos do livro em diálogos entre NPCs, roteiros, perguntas-chave, cenários, sprites | Nós, uma vez só | Praticamente zero (Claude Code já faz isso; é o nosso trabalho de produção) |
| **Ao vivo** (dentro do app, jogador jogando) | Analisar a interrupção do jogador, julgar pertinência, gerar a reação dos NPCs, avaliar respostas às perguntas-chave | Custo por uso | Centavos por interação usando modelo de texto pequeno e rápido |

Ou seja: 90% do conteúdo do jogo é **pré-fabricado** (as conversas dos NPCs que o jogador escuta são roteiros prontos, escritos por nós com IA na produção). A IA ao vivo só entra quando o jogador se expressa — que é exatamente o momento que importa.

**Sobre a "IA offline que transforma texto em diálogo"** que o Felipe mencionou: essa categoria de ferramenta (modelos locais que viram transcrição em conversa entre várias vozes) é perfeita para a *fábrica* — rodando no nosso PC, custo zero. O candidato analisado e recomendado é o **MOSS-TTSD** (OpenMOSS/Fudan, Apache 2.0, suporta português, até 5 vozes por diálogo) — análise completa em [[FERRAMENTA-VOZ-MOSS-TTSD]]. Não roda dentro do app (modelo de 8B precisa de GPU); roda na produção e o app recebe o áudio pronto. Pré-requisito a confirmar: a placa de vídeo do PC do Felipe.

---

## 2. As peças da stack (proposta)

### O jogo em si (o que a pessoa vê e toca)
- **React + Vite + TypeScript** — a mesma base do site da RV e do VisionFlow. Interface, menus, caixas de diálogo, ficha do personagem, diário.
- **Phaser** — biblioteca gratuita e consagrada de jogos 2D para web. Cuida do mapa pixel art, do bonequinho andando, das colisões e animações. É o padrão do mercado pra esse estilo de jogo.
- **Tailwind CSS + nosso padrão de design** — visual das telas fora do mapa.
- **react-i18next desde o dia 1** (decisão Q5): todos os textos do jogo em arquivos de tradução separados, PT primeiro; ligar EN no futuro é configuração, não reforma.

### Virar aplicativo Android
- **Capacitor** — ferramenta gratuita que embrulha o jogo web num app Android de verdade, com acesso a microfone, notificações e à cobrança da Play Store. Mesmo código = app Android + versão web (demo no site da RV de brinde).

### A memória do jogo (contas e progresso)
- **Supabase** — mesmo sistema do VisionFlow: login dos jogadores, progresso salvo na nuvem, estágio da Obra, atributos, achievements. Plano gratuito aguenta o lançamento.

### A inteligência ao vivo
- **API do Claude (modelo pequeno/rápido — hoje, Haiku)** para: julgar pertinência da interrupção, gerar a reação dos NPCs, avaliar perguntas-chave. Modelos pequenos custam centavos e são ótimos nisso.
- **Funções no Supabase (Edge Functions)** — o app nunca fala direto com a IA; ele fala com o nosso servidor, que guarda a chave secreta e controla o gasto (limite de interações por jogador/dia = proteção da conta de padaria).

### Cobrança (decisão Q2: assinatura pelo Google)
- **Google Play Billing via plugin do Capacitor** — assinatura anual de R$ 100 cobrada pelo Google (taxa ~15%). O mês gratuito de lançamento vira "teste grátis" da própria assinatura — o Google já tem esse recurso pronto.

### Ferramentas de produção (a fábrica)
- **Claude Code** — roteiros, diálogos, código, tudo.
- **Aseprite ou Piskel** (baratíssimo/grátis) — editor de pixel art para sprites e cenários; IA de imagem pode gerar bases que refinamos.
- **Git + GitHub (repo privado novo)** — versionamento desde o primeiro dia, padrão dos nossos projetos.

---

## 3. O que NÃO entra no MVP (e por quê)

| Adiado | Motivo | Quando volta |
|---|---|---|
| Voz dos NPCs (áudio) | Caro e complexo ao vivo; exige a fábrica de áudio pronta | Fase 4 |
| Responder por áudio (microfone) | Depende de transcrição + o fluxo de interrupção por voz | Fase 4 |
| Avatar com o rosto do jogador | Geração de imagem custa mais; primeiro validar o coração do jogo | Fase 3 |
| Cenários gerados por IA em tempo real | Idem; no MVP os cenários são pré-fabricados | Fase 3+ |
| Área social | Precisa de massa de jogadores primeiro | Fase 5 |

No MVP, toda a interação do jogador é por **texto** — que já prova a mágica do jogo (NPCs que ouvem ou ignoram) pelo menor custo possível.

---

## 4. Estimativa de custo de operação do MVP

| Item | Custo mensal estimado |
|---|---|
| Supabase (plano free) | R$ 0 |
| Vercel/hospedagem da versão web | R$ 0 (plano free) |
| IA ao vivo (modelo pequeno, ~30 interações/dia por jogador ativo) | Centavos por jogador/mês |
| Conta Google Play | US$ 25 uma única vez |

Com teto de R$ 8,33/mês por assinante (R$ 100/ano), o MVP em texto opera com **folga grande** — margem para crescer as features de IA depois.

---

## 5. Próximos passos técnicos (quando o design fechar)

1. Criar o repositório `jogo-da-terra` (privado) — código separado do Company OS
2. Esqueleto do projeto: React + Vite + Phaser + i18n + Capacitor
3. Protótipo jogável mínimo: bonequinho andando num cenário de Alexandria + uma rodinha de conversa com roteiro fixo + uma interrupção julgada pela IA
4. Esse protótipo é o teste de fogo: se a sensação de "eles me ouviram!" funcionar, o resto do jogo é expansão
