---
name: earth-game
description: Skill do EARTH GAME — o primeiro jogo da Real Vision (RPG pixel art Android baseado em Manly P. Hall). Carrega o contexto do projeto, a filosofia visual Nigredo Luminoso, a paleta oficial e o método de mockup por tela. Ativar em qualquer sessão de trabalho no jogo: design, mockups, roteiro, decisões ou (futuramente) código.
---

# EARTH GAME — Skill do Projeto

## O que é o projeto

**EARTH GAME** (nome oficial desde 04/07/2026; falta checar disponibilidade Play Store/domínio). RPG de celular (Android) que transforma autoconhecimento em aventura pixel art. NPCs guiados por IA; progressão medida por mudança de percepção, não por pontos. História baseada em *The Secret Teachings of All Ages* de Manly P. Hall (1928, domínio público), com personagem próprio do jogador.

**Pasta do projeto:** `C:\Users\Computador\Desktop\Real Vision\operacao\projetos\_RV-Internos\jogo-da-terra\`

## Fontes de verdade (ler antes de qualquer trabalho)

| Arquivo | Quando consultar |
|---|---|
| `docs/DECISOES.md` | SEMPRE primeiro — o que já foi decidido e o que está aberto |
| `docs/TELAS.md` | Design das telas (9 telas do MVP aprovadas em mockup) |
| `docs/GAME-DESIGN.md` | Mecânicas, estágios, sistema de conversa |
| `docs/STACK.md` | Tecnologia proposta (Q10 — aguarda OK) |
| `design/FILOSOFIA-VISUAL.md` | Manifesto estético completo |
| `docs/LIVRO-BASE.md` | Índice do livro do Hall + biografia verificada |

## Filosofia visual: Nigredo Luminoso

- Mundo começa quase preto-e-branco (Calcinação); cores esquentam com a progressão do jogador até o dourado (Coagulação)
- **O jogador é o único ponto de cor quente da tela** (túnica/aura dourada)
- Uma ideia por tela; pouco texto sempre; caixa de diálogo clássica (borda dupla, texto letra por letra, setinha piscando)
- Emoção legível no sprite: quem ouve se inclina, quem foi incomodado VIRA E OLHA
- Dourado = interativo (borda de botão ativo, destino desbloqueado, brasa)

### Paleta oficial (nomes usados nos scripts)

```
INK    (22, 20, 25)    contorno / texto
COAL   (43, 41, 48)    sombra escura
ASH    (86, 84, 92)    cinza médio
STONE  (126, 123, 126) pedra
BONE   (188, 184, 176) claro
PAPER  (225, 221, 209) caixa de diálogo
EMBER  (214, 160, 72)  a brasa (acento único)
EMBERD (140, 106, 58)  brasa apagada
DARK   (10, 9, 12)     preto de tela (ano, título)
```

## Nível gráfico

⚠️ Os mockups de 04/07/2026 (blocos 160×320) são **estudos de layout e mecânica**, NÃO o acabamento final.

**Referência oficial de acabamento (aprovada 04/07/2026):** `design/conceito-grafico-biblioteca.png` — pixel art moderna estilo Sea of Stars/Eastward: personagens ~48–64px expressivos, iluminação volumétrica (raios de janela, braseiro), cenários com camadas de profundidade, poeira/partículas. Toda arte nova é cobrada contra esse padrão.

**Pipeline de arte:** cenários e personagens gerados por IA de imagem (MCP Higgsfield, modelo `nano_banana_pro`, prompt em inglês descrevendo a paleta nigredo + brasa única) com retoque; **textos, botões e UI são sempre renderizados pelo próprio jogo** (nítidos, traduzíveis) — nunca "assados" na imagem gerada.

**Prompt-base que funcionou** (adaptar a cena, manter o resto): "Modern high-end pixel art game scene, vertical mobile game screenshot ... (style of Sea of Stars, Eastward) ... Mostly desaturated palette - charcoal, ash grey, bone white (alchemical nigredo mood) - with ONE warm accent: golden ember light ... The player is a young seeker wearing a golden-amber tunic with a faint glowing aura - the only warm-colored character ... Crisp pixels, rich lighting and shading, multiple depth layers, masterful modern pixel art, no blur."

## Método de mockup (validado em 04/07/2026)

1. Uma tela (ou sequência) por vez; sequências animadas viram storyboard de 3 quadros lado a lado
2. Script Python/PIL no scratchpad: desenhar na grade lógica (160×320 por painel), ampliar ×5–6 com `Image.NEAREST` (nunca suavizar)
3. Cada painel numa imagem própria + colagem no final (evita vazamento entre painéis)
4. Renderizar → olhar a imagem → 1 passe de refino (nada vaza da borda, texto cabe, mecânica legível) → enviar ao Felipe
5. Aprovou → a tela ganha seção em `docs/TELAS.md` com a imagem e as regras; PNG fica em `design/`
6. Toda decisão nova → linha em `docs/DECISOES.md` com data e origem

## Regras do projeto

- Filosofia Ponytail ativa (o mínimo que resolve; deleção antes de adição)
- **Nenhuma decisão de produto vira código sem OK do Felipe** — stack (Q10) ainda aguarda aprovação
- Linguagem simples com o Felipe: nada de jargão técnico
- Dados do livro/biografia: só o que está em `docs/LIVRO-BASE.md` (verificado) — não inventar fatos históricos; anos de capítulo são placeholder até o roteiro fechar
