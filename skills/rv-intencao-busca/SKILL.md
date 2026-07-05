---
name: rv-intencao-busca
description: Pesquisa de intenção de busca (réplica gratuita do AnswerThePublic) via Google Autocomplete. Use antes de escrever qualquer blog post, sempre em conjunto com a rv-blogpost, ou quando o Felipe pedir "pesquisa de palavra-chave", "perguntas que as pessoas fazem sobre X", "intenção de busca", "AnswerThePublic", "FindQuestions".
---

# RV Intenção de Busca

Skill que gera a matriz de perguntas reais que pessoas digitam no Google sobre um assunto — a mesma matéria-prima que ferramentas pagas como AnswerThePublic vendem, só que de graça.

## O que é

O AnswerThePublic não tem API (confirmado no suporte oficial deles, abril/2026) e custa de US$20 a US$199/mês. Mas os dados que ele mostra vêm de uma fonte pública e gratuita: o **Google Autocomplete** — o mesmo sistema que sugere frases quando você começa a digitar no Google. Esta skill consulta esse sistema diretamente.

## Pra que serve

Alimentar a criação de blog posts por intenção de busca (ver `rv-blogpost`) para qualquer cliente da Real Vision, em qualquer idioma/região, sem custo de assinatura. Também serve para validar rapidamente se um nicho tem volume de perguntas reais antes de prometer uma estratégia de conteúdo a um cliente.

## Como funciona

Script: `scripts/pesquisar_intencao.py` (Python puro, só biblioteca padrão — sem dependências para instalar).

```bash
python scripts/pesquisar_intencao.py "leinwandbild" --hl de --gl ch
python scripts/pesquisar_intencao.py "tour 360" --hl pt --gl br
python scripts/pesquisar_intencao.py "canvas print" --hl en --gl us
```

- `--hl` = idioma (pt, de, en...) · `--gl` = região (br, ch, us...)
- Expande o termo-base com prefixos de pergunta (quem/o quê/como/por quê/onde/quando — em pt, de e en), preposições (para/sem/com — e equivalentes) e comparações (vs/ou/oder)
- Devolve um JSON agrupado em `base`, `perguntas`, `preposicoes`, `comparacoes` — cada item é uma frase real buscada por alguém

Testado ao vivo em 04/07/2026 com o termo "leinwandbild" (`hl=de&gl=ch`, cliente Lafatas) — retornou perguntas reais como *"wie hängt man ein leinwandbild auf"*, *"leinwandbild ohne rahmen aufhängen"*, *"leinwandbild oder acrylglas"*.

## Cruzamento com Search Console

Quando o cliente já tem Search Console conectado, priorize as perguntas da matriz que **cruzam com consultas que já têm impressões reais** no site dele — é o dado mais forte que existe, mais confiável que qualquer ferramenta de terceiros. (Não existe MCP de Search Console instalado — exportar manualmente do painel e ler com `openpyxl`, conforme já documentado na skill `rv-lafatas`.)

## Fallback manual (economiza tokens)

O pipeline cobre o Google. Duas fontes complementares não têm API e não devem ser adivinhadas por tentativa e erro:

- **AnswerThePublic** (answerthepublic.com) — visão consolidada e visual das mesmas perguntas, mas paga.
- **FindQuestions.com** — puxa perguntas do **Reddit** (fonte diferente do Google), freemium (mostra prévia, pede email para lista completa).

Se depois de rodar o pipeline os dados ainda parecerem insuficientes, **não tente repetidamente acessar esses sites via ferramenta automatizada** (paywall/bloqueio desperdiça tentativas). Em vez disso, diga ao Felipe o passo a passo exato:

> "Entra em [site], digita '[termo]' no campo de busca, clica em '[botão]', e me manda de volta a lista de perguntas que aparecer."

Ele faz a consulta manual e cola o resultado de volta — mais rápido e mais barato que tentar automatizar um site fechado.

## Skills relacionadas

- `rv-blogpost` — consumidora principal; toda criação de post novo passa por aqui primeiro (ver seção "Fase 0" na SKILL.md dela)
- `marketing-seo` — schema/analytics técnico; não faz pesquisa de palavra-chave, isso vive aqui
- `rv-lafatas` — primeiro cliente onde esse pipeline foi usado de verdade (documento "Próximo Passo", 04/07/2026)
