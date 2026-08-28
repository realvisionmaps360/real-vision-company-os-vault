---
id: RSC-2026-004
tipo: risco
nome: Riscos do VisionVault
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-28
atualizado_em: 2026-08-28
proxima_revisao: 2026-09-15
afeta: ["[[VisionVault — painel do Company OS]]"]
pertence_a: ["[[VisionVault — painel do Company OS]]"]
tags: [lbos/entidade, lbos/risco]
---

# Riscos do VisionVault

## O que é

Os riscos vivos do painel. O primeiro é o que decide se o projeto inteiro vale alguma coisa.

## Contexto

### 1. O painel envelhece e mente — risco central

O `_PAINEL.md` depende de o agente atualizá-lo ao fim de cada sessão. Sessões terminam
abruptamente, e o Felipe às vezes trabalha sem o Claude. O gerador não tem como saber que o
resumo ficou velho.

Um painel que mostra "próximo passo: escrever o email 4" três semanas depois de o email 4 ter
sido enviado é **pior que não ter painel**, porque é confiável na aparência.

**Mitigação ativa:** o card mostra há quanto tempo foi atualizado — normal até 7 dias, âmbar até
21, vermelho depois. E o gerador compara a data do resumo com o último commit da pasta,
marcando `defasado` quando a pasta mudou depois. A defasagem fica visível em vez de silenciosa.

**Mitigação pendente:** issue automática semanal listando painéis vencidos.

**Aceite de escopo:** só entra no painel projeto que passa por sessão de agente com regularidade.
Painel com 30 projetos e 20 mortos é ruído.

### 2. Vazamento do Company OS

O `dist/` é servido publicamente pela Vercel, sem autenticação. Um `index.json` importado direto
no app, ou uma variável de servidor com prefixo `VITE_`, exporia o vault inteiro a quem tiver a URL.

**Mitigação ativa:** `npm run build` roda uma trava que pega texto real do índice e falha o build
se aparecer no `dist/`. Todo conteúdo passa por `/api/*` autenticado. `X-Robots-Tag: noindex` e
`robots.txt` bloqueando tudo.

### 3. Token do GitHub expira em 90 dias

Vence por volta de **26/11/2026**. Quando vencer, o painel para de ler o vault, e o erro se parece
com sessão expirada — o Felipe pensaria em fazer login de novo.

**Mitigação ativa:** o servidor devolve 502 com mensagem própria para falha de leitura do vault,
distinta de 401 de sessão.

**Mitigação pendente:** lembrete no calendário antes do vencimento.

### 4. Cota do Supabase

O projeto do VisionFlow apareceu com aviso de *grace period* encerrado em 28/08/2026. Se a cota
estourar, o projeto para de servir requisições — e leva junto o login do VisionVault, que agora
depende dele.

**Mitigação:** nenhuma técnica. É decisão de billing do Felipe.

### 5. Divergência de schema entre gerador e app

O gerador vive no repo do vault e o app é deployado separado. Se os dois divergirem, o app pode
receber um formato que não entende.

**Mitigação ativa:** `painel_versao` no índice. O app recusa versão desconhecida.

## Relacionados

- Afeta: [[VisionVault — painel do Company OS]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-28 | Riscos levantados na entrega da v1 | Painel entrou em produção | — | Defasagem visível em vez de silenciosa |
