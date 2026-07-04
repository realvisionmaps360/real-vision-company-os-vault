# Telas do Jogo — Design

> Foco atual do projeto (decisão de 04/07/2026). Este documento lista as telas do MVP, o fluxo entre elas e a direção visual. Status: 🟡 rascunho para discussão — nada aprovado ainda.

---

## 1. Direção visual (proposta)

- **Moldura Game Boy:** a área de jogo vive dentro de uma estética retrô consistente — pixel art, caixa de diálogo clássica com texto aparecendo letra por letra e setinha piscando
- **A cor conta a história:** a paleta do mundo segue o estágio da Grande Obra do jogador — do quase preto-e-branco (Calcinação/nigredo) até cores quentes e douradas (Coagulação/rubedo). A ficha, os menus e a aura do personagem acompanham
- **Pouco texto na tela, sempre:** telas limpas, uma ideia por vez — o jogo é sobre atenção, o design tem que praticar o que prega

## 2. Inventário de telas do MVP

| # | Tela | O que acontece nela | Observações |
|---|---|---|---|
| 1 | **Título** | Logo do jogo + "Iniciar jornada" / "Continuar" | Nome do jogo ainda em aberto (Q4) |
| 2 | **Criação do Buscador** | Escolher aparência do personagem (opções pixel art), nome | Simples no MVP: 4–6 variações de sprite; avatar com foto do jogador é Fase 3 |
| 3 | **O Globo** | A Terra girando; destinos desbloqueados brilham; ao escolher, animação de viagem até o local: linha atravessando o mapa → mergulho → **tela preta mostrando o ANO** do evento → abre com um diálogo entre dois personagens | No MVP só Alexandria acesa; os outros pontos aparecem apagados (desejo de progressão). O ano situa o jogador no tempo; o diálogo de abertura é a porta de entrada do capítulo |
| 4 | **Cenário (o jogo em si)** | Mapa pixel art navegável; bonequinho anda; NPCs pelo cenário; ao se aproximar de uma rodinha, aparece o botão de ouvir | O coração do jogo |
| 5 | **Conversa** | Caixa de diálogo clássica embaixo; NPCs conversam entre si; campo de texto para o jogador intervir; reações de "ouvido" ou "ignorado" | A mecânica de interrupção precisa ser LEGÍVEL: o jogador tem que entender por que foi ignorado. Ao ser interrompido com fala não pertinente, o NPC vira e olha para o personagem do jogador antes de retomar a conversa — fica visualmente claro que ele está incomodando |
| 6 | **Ficha do Buscador** | Atributos, estágio da Grande Obra (com o símbolo alquímico), aura atual, cor de progressão | O "espelho" do jogador |
| 7 | **Conquistas** | Troféus e medalhas (bloqueadas em silhueta, desbloqueadas com brilho) | Estilo galeria de RPG clássico |
| 8 | **Diário** | Duas abas: padrões registrados + Diário de Sinais (sincronicidades) | Entrada rápida, sem fricção |
| 9 | **Pausa/Ajustes** | Som, idioma (PT no MVP, preparado pra mais), conta, sair | Mínimo necessário |

Fora do MVP (anotadas pra não perder): tela de assinatura (entra quando a cobrança entrar), álbum de cards arquetípicos (Fase 3), área social (Fase 5).

## 3. Fluxo entre as telas

```
Título → (1ª vez) Criação do Buscador → O Globo → [viagem: linha no mapa + mergulho → tela preta com o ANO → diálogo de abertura] → Cenário
                                            ↑          ↓ (aproximar de NPCs)
                                            └──────  Conversa
Do Cenário, botão de menu abre: Ficha · Conquistas · Diário · Ajustes
Fim de capítulo → volta ao Globo (novo destino aceso = recompensa visual)
```

## 4. Como vamos trabalhar o design (proposta de método)

1. **Validar este inventário** — Felipe corta/adiciona telas
2. **Uma tela por vez, em imagem:** eu gero mockups visuais (desenhos navegáveis das telas) pra você reagir em cima de algo concreto — começando pela tela 5 (Conversa), que é o coração e o maior risco de design
3. Cada tela aprovada ganha sua seção neste documento com a imagem de referência e as regras dela
4. Só depois do conjunto aprovado a gente parte pro protótipo jogável

## 5. Telas aprovadas

### Tela 5 — Conversa (aprovada em 04/07/2026)

![Mockup da tela Conversa](../design/mockup-tela-5-conversa.png)

Regras da tela:
- Cenário ocupa o alto; caixa de diálogo clássica embaixo (borda dupla, nome de quem fala, texto letra por letra, setinha piscando)
- Paleta segue o estágio do jogador (capítulo 1 = quase P&B); o jogador é o único ponto de cor quente (túnica/aura dourada)
- Interrupção legível: NPC interrompido vira e olha para o jogador + balão "..." + linha pontilhada de olhar + feedback textual ("ignorado · seja pertinente")
- Campo de fala do jogador embaixo, com botão de enviar dourado
- Filosofia visual: [[../design/FILOSOFIA-VISUAL|Nigredo Luminoso]]
- Nota: sprites do mockup são blocos de estudo — arte final dos personagens vem em etapa própria

### Tela 4 — Cenário (aprovada em 04/07/2026)

![Mockup da tela Cenário](../design/mockup-tela-4-cenario.png)

Regras da tela:
- Cenário com pontos de referência (fachada, obelisco, palmeiras, braseiro) pra dar sensação de lugar
- Rodinhas de NPCs com balãozinho "..." quando estão conversando
- Botão OUVIR aparece só por proximidade (borda dourada = interativo); rodinha longe fica sem botão — a regra de alcance é visível na tela
- Jogador é o único ponto de cor quente; joystick virtual no canto inferior esquerdo; menu no topo direito

### Tela 3 — O Globo + sequência de viagem (aprovada em 04/07/2026)

![Storyboard do Globo e viagem](../design/mockup-tela-3-globo-viagem.png)

Regras da sequência (3 momentos):
1. **O Globo:** Terra girando no espaço, continentes cinza; só destinos desbloqueados acesos (anéis dourados pulsando + etiqueta); os demais aparecem apagados. Pergunta "PARA ONDE?" + botão VIAJAR
2. **Mergulho:** zoom no globo, linha dourada tracejada atravessa o mapa até o destino pulsando; vinheta escura e riscos de velocidade
3. **O Ano:** tela preta com o ANO em tipografia pixel gigante (número em claro, "a.C./d.C." em brasa); o diálogo de abertura entre dois personagens surge do preto antes de a cena clarear pro cenário
- Nota: o ano 283 a.C. do mockup é placeholder — ano oficial de cada capítulo se define com o roteiro
