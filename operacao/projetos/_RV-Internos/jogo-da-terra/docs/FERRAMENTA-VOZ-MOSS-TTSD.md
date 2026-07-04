# Análise — MOSS-TTSD como motor de voz do jogo

> Avaliação feita em 04/07/2026 a pedido do Felipe. Repositório: https://github.com/OpenMOSS/MOSS-TTSD
> Veredito curto: **é a ferramenta certa — mas para a FÁBRICA, não para dentro do app.** Encaixa perfeitamente no plano de custo que já desenhamos em [[STACK]].

---

## 1. O que é (o "job core" deles)

**OpenMOSS** é um grupo de pesquisa acadêmico (Prof. Xipeng Qiu — Universidade de Fudan + Shanghai Innovation Institute, ligado à MOSI.AI). Não é uma startup de produto: é um laboratório de ponta em modelos de IA de código aberto, com dezenas de modelos (LLMs, visão, fala, robótica). Isso é **bom pra gente**: ciência aberta, licença permissiva, sem risco de a empresa "fechar o produto" amanhã.

**MOSS-TTSD** (o "D" é de *Dialogue*) é o modelo específico de **transformar roteiro em diálogo falado** — não é um TTS comum que lê texto em voz única. Ele foi feito exatamente para o que o Felipe descreveu: pegar um texto/transcrição e transformar numa **conversa natural entre várias pessoas**, com vozes diferentes, entonação e ritmo de papo de verdade.

Casos de uso oficiais deles: podcasts com IA, audiobooks, dublagem, diálogos de entretenimento. **É literalmente o nosso caso de uso.**

## 2. Ficha técnica (o que importa pra nós)

| Item | Valor | O que significa pro jogo |
|---|---|---|
| Português | ✅ suportado (20 idiomas) | Não precisamos gambiarra pra PT |
| Vozes num mesmo diálogo | 1 a 5 falantes (tags `[S1]`…`[S5]`) | Nossas rodinhas de 2–3 NPCs cabem com folga |
| Clonagem de voz | ✅ zero-shot (com amostra curta) | Dá pra dar uma voz fixa e consistente a cada NPC (Hipátia sempre com a mesma voz) |
| Licença | **Apache 2.0** | Uso comercial permitido — podemos usar no produto pago sem pagar royalties |
| Roda offline/local | ✅ (`python inference.py`) | Custo por uso = ZERO; roda no nosso PC |
| Tamanho | **8 bilhões de parâmetros** | ⚠️ modelo grande — precisa de GPU boa (ver ponto crítico abaixo) |
| Duração | até ~60 min de diálogo por sessão | Sobra pra qualquer conversa do jogo |
| Saída | WAV 24/32kHz | Áudio de qualidade, é só empacotar no app |

## 3. O ponto crítico — onde ele encaixa (e onde NÃO encaixa)

Aqui está a reflexão honesta que o Felipe pediu:

### ✅ Onde ele é PERFEITO: a Fábrica (pré-produção)
No nosso plano de custo ([[STACK]] seção 1), as conversas dos NPCs são **fabricadas antes**, por nós, e entram no app como áudios prontos. O MOSS-TTSD é a máquina ideal dessa fábrica:

1. Pegamos um trecho do livro do Manly P. Hall (ex.: a simbologia do corpo humano)
2. Com o Claude Code, viramos aquilo num roteiro de conversa entre Hipátia e um discípulo
3. O MOSS-TTSD transforma o roteiro em **áudio de podcast real**, com as vozes dos personagens
4. Esse áudio entra no jogo como arquivo pronto → **custo de operação zero**, roda até sem internet no celular do jogador

Isso resolve de uma vez a parte mais cara que tínhamos adiado pra Fase 4 (voz dos NPCs) — e traz ela pra perto, porque o custo sai da conta por-usuário e vira trabalho de produção nosso.

### ❌ Onde ele NÃO encaixa: dentro do app, ao vivo
Um modelo de 8 bilhões de parâmetros **não roda no celular do jogador**. Ele precisa de uma GPU parruda. Então ele **não substitui** a IA ao vivo que julga a interrupção do jogador e gera a reação na hora — essa parte continua sendo o modelo de texto pequeno via nosso servidor ([[STACK]]).

**A arquitetura fica assim, e é linda:**
- **Voz dos NPCs (o que eles falam de base):** pré-gravada com MOSS-TTSD na fábrica → tocando no app, custo zero
- **Reação à interrupção do jogador (dinâmica):** texto gerado ao vivo pelo modelo pequeno. Numa fase futura, esse texto de reação também pode virar voz — aí sim precisaríamos de voz ao vivo (MOSS-TTSD num servidor com GPU, ou uma voz mais leve). Mas no MVP, a reação pode ser em texto na caixa de diálogo enquanto o áudio-base é falado.

## 4. A GPU do Felipe — respondido em 04/07/2026 ❌ local não roda

**Placa do PC: GTX 1060 com 3 GB de VRAM.** Modelo de 8B precisa de ~16 GB (mínimo realista quantizado: 6–8 GB). Ou seja: **não roda nesta máquina** — nem adianta baixar (daria erro de memória).

**Planos B documentados (para quando a fase de voz chegar):**
- (a) **GPU na nuvem por hora** (RunPod, Modal, Colab Pro) — só nos dias de produção de áudio; custo baixo e esporádico → *caminho recomendado*
- (b) **MOSS-TTS-Nano** (0.1B, 80x menor) — roda em máquina fraca, mas é voz única; o diálogo seria montado juntando falas
- (c) API paga pronta (ElevenLabs etc.) — zero infra, custo por minuto gerado

## 5. Decisão (04/07/2026): PROJETO FUTURO 📦

Felipe decidiu: **tudo desta frente fica anotado como projeto futuro.** A voz dos NPCs já estava na Fase 4 do faseamento — nada muda no MVP (que é 100% texto). Quando a Fase 4 chegar, retomamos este documento e testamos primeiro na demo online (ouvir 1 minuto em português antes de investir em GPU de nuvem).

**Ideia irmã anotada (fora do jogo):** usar o MOSS-TTSD também para transformar posts do blog da RV em "podcasts" de 2 vozes para redes sociais (conecta com o plano de expansão Instagram/TikTok). Mesma fábrica, outro produto — avaliar quando a frente de social media abrir.

## 6. Links

- Repo: https://github.com/OpenMOSS/MOSS-TTSD
- Modelo (download): https://huggingface.co/OpenMOSS-Team/MOSS-TTSD-v1.0
- Demo pra ouvir antes: https://huggingface.co/spaces/OpenMOSS-Team/MOSS-TTSD
- Organização: https://github.com/OpenMOSS
