# 05 — Sistema de Resposta Personalizada (proposta de arquitetura)

> **Status: PROPOSTA. Nada implementado.** Aplica o princípio do Lead Gen Jay (skills encadeadas +
> banco próprio + auto-melhoria + Reverse Lead Magnet) dentro das 3 outras mentes que já governam
> o Hermes (Walker, Hormozi, Ferdy).

---

## 1. O problema que isso resolve

O disparo em massa é 1→28. A venda acontece no 1→1 depois da resposta. Hoje esse 1→1 depende
inteiro do Felipe: ele lê, ele interpreta, ele responde. Isso não escala e, pior, o aprendizado
morre na cabeça dele, não vira dado que o Hermes possa usar depois.

```
massa (calendário 04)  →  interação  →  dossiê do contato  →  resposta 1:1  →  registro  →  aprendizado
```

---

## 2. Onde cada mente entra

| Mente | Papel no 1:1 |
|---|---|
| **Ferdy** | Detecta o evento (abriu, clicou, respondeu, ficou inativo) e decide o ramo. |
| **Walker** | Decide em que ponto da narrativa aquela pessoa está. |
| **Hormozi** | Escreve a resposta: curta, uma ideia, recompensa no topo, CTA sem ambiguidade. |
| **Jay** | Guarda tudo no banco, critica a própria resposta antes de entregar, ganha autonomia conforme acerta. |

---

## 3. O dossiê: o formulário de perguntas e respostas

Cada contato ganha um dossiê vivo, preenchido de três fontes: VisionFlow (serviços contratados),
comportamento de email (o que abriu/clicou) e as respostas do próprio contato.

1. Que negócio é, em que cidade, que segmento?
2. Quais dos 12 serviços ele já tem com a RV? (VisionFlow)
3. Qual dor ele já verbalizou, com as palavras dele?
4. O que ele já disse "não", e por quê (preço, tempo, não vê valor, já tem alguém)?
5. Como ele decide: sozinho, com sócio, com a família?
6. Canal preferido: email, WhatsApp, telefone?
7. Sazonalidade do negócio dele
8. Qual é o próximo passo natural pra ele, não o que a gente quer vender

**A pergunta 8 é o coração.** Transforma resposta genérica em resposta pessoal.

---

## 4. Reverse Lead Magnet — o que a RV consegue entregar na hora

| Oferta | Esforço real | Pra quem |
|---|---|---|
| Análise do Google Meu Negócio dele (3 pontos que fazem perder cliente) | ~15 min | qualquer negócio local |
| Print de como o site dele apareceria com arquitetura GEO | ~20 min | quem tem site fraco |
| Mini-tour 360° de demonstração | alto, só se já houver captura na cidade | pousada/restaurante na rota |
| Diagnóstico de 1 página: onde ele aparece hoje vs. onde deveria | ~30 min | lead quente |

**Regra:** só oferecer o que dá pra entregar em até 48h.

---

## 5. Banco próprio (princípio Jay) — tabelas propostas, não criadas ainda

| Tabela | Guarda |
|---|---|
| `email_dossies` | um registro por contato, com as 8 respostas da seção 3 |
| `email_interacoes` | cada resposta recebida, texto bruto + classificação |
| `email_respostas_1a1` | cada resposta que o Hermes redigiu: rascunho, versão aprovada, e o delta |
| `email_aprendizado` | regras destiladas do delta |

**A tabela `email_respostas_1a1` é a mais importante.** É o delta entre o que o Hermes escreveu e o
que o Felipe mandou que ensina o sistema a pensar como ele.

---

## 6. Escada de autonomia

| Nível | O que o Hermes faz | Como sai desse nível |
|---|---|---|
| 0 — hoje | Nada automático. Felipe responde tudo. | — |
| 1 — rascunho | Classifica, monta o dossiê, escreve rascunho. Felipe edita e envia. | 20 respostas com delta |
| 2 — rascunho confiável | Escreve; Felipe só aprova sem editar na maioria dos casos. | delta médio abaixo de ~20% em 10 seguidas |
| 3 — autonomia parcial | Envia sozinho casos simples. Preço/escopo/objeção continuam com o Felipe. | decisão explícita do Felipe |

**Nível 3 nunca cobre preço nem escopo.**

---

## 7. Skills encadeadas

```
rv-email (mestre)
 ├─ estratégia  → lê o dossiê + o ponto da narrativa (Walker) → decide o ângulo
 ├─ copy        → escreve na voz (Hormozi + VOZ.md)
 ├─ crítica     → roda o loop de auto-crítica já existente na rv-email
 └─ disparo     → Resend / rascunho no Gmail, sempre com aprovação
```

Não exige skill nova agora — a `rv-email` já tem as quatro etapas dentro dela.

---

## 8. Digest diário via cron (Hermes no VPS) — ainda não implementado

O que falta:
1. Confirmar caixas `contato@`/`adm@` recebem — **✅ JÁ CONFIRMADO em 21/08/2026**.
2. Cron no VPS lendo caixa + banco e montando o digest.
3. Canal de entrega: **decidido — Telegram**, fica pro final da fila.

---

## 9. Ordem de implementação sugerida

1. Resolver o endereço de resposta — ✅ feito
2. Criar as 4 tabelas do banco próprio
3. Escrever e disparar o email 1 do ciclo 1 — ✅ escrito, aguardando disparo real
4. Registrar as primeiras respostas à mão, com delta
5. Só depois: digest diário por cron via Telegram

---

## 10. Decisões já confirmadas pelo Felipe (21/08/2026)

1. Endereço de resposta: caixas `contato@` e `adm@realvisionmaps.com` já existem na Hostinger e recebem
2. Digest diário: Telegram, fica pro final da fila de implementação
3. Capacidade de agenda: 1 projeto novo por mês → 3 vagas no trimestre
4. Ciclo 1 vai pra lista geral inteira, sem segmentar ainda

---

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-21 | Documento criado | Sessão `email1` — consolidação do projeto de email marketing |
| 2026-08-26 | Documento restaurado | O arquivo foi criado em 21/08 mas nunca commitado e sumiu do disco. Restaurado a partir da cópia preservada em `TEMP/pacote-email-marketing-2026-08-21/`. Conteúdo idêntico ao original; só o cabeçalho perdeu a marca "cópia de 21/08/2026". |
