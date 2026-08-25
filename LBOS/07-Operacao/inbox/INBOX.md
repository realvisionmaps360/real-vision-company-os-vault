---
id: SIS-2026-006
tipo: processo
nome: Inbox — porta de entrada do LBOS
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-09-06
fonte_unica: true
pertence_a: ["[[LBOS]]"]
tags: [lbos/sistema, lbos/processo]
---

# Inbox

A única porta de entrada do sistema. **Nenhuma informação entra solta** (§10).

## Como usar

Joga aqui. Cru. Sem organizar. Sem pensar onde vai.

```
07-Operacao/inbox/2026-08-06-assunto-curto.md
```

Ideia, recado, valor, foto de nota, decisão tomada no almoço, coisa que a Romana falou — tudo cabe. Registrar tem que ser barato, senão você não registra e o sistema morre de fome.

O trabalho de classificar não é seu. É do fluxo.

## O que acontece depois

A nota passa pelos [[FLUXO-DOCUMENTO-VIVO|sete passos]] e vira nó no lugar certo.

No passo 5 — análise de impacto — **o processo para** e te mostra o que muda. Nada é alterado antes do seu OK.

Processada, a nota crua vai para `09-Arquivo/`. Não se apaga.

## Modelo de nota crua

```markdown
---
data: 2026-08-06
origem:
confiabilidade:
---

O que aconteceu, em texto solto. Sem formatar.
```

Só isso. `tipo`, `projeto` e `prioridade` são preenchidos na classificação, não por você.

## Fila atual

- [[2026-08-17-prd-memory-dump-operacional]] — handoff externo (sessão ChatGPT), 8 frentes priorizadas. Prioridades 1-3 em processamento (3 sessões em paralelo, 2026-08-17); 4-8 ainda não entraram no fluxo.
- [[2026-08-20-servicos-google-merchant-loja-site]] — cadastrar serviços no Google Meu Negócio → Merchant Center → conectar com a loja do site. Levantamento do que falta já feito; nada aplicado. Não entrou no fluxo.

As 5 notas recebidas em 2026-08-10 (handoff externo, sessão ChatGPT) foram classificadas e processadas no mesmo dia, com aprovação do Felipe. Arquivadas em `09-Arquivo/`. O que geraram:

- Sunbite fim de semana → [[02-Projetos/sunbite/planejamento]], [[RSC-2026-001]], [[TAR-2026-001]]
- Festivais → [[EVT-2026-001]], [[EVT-2026-002]], [[EVT-2026-003]], [[EVT-2026-004]] (status `ideia`)
- Oportunidades Real Vision → [[TAR-2026-002]], [[TAR-2026-003]], [[TAR-2026-004]]. Ambiguidade "Fabiano" resolvida: confirmado que é o lead O Maná'h
- Pessoal (evento com amigos + Fireproof) → evento virou projeto próprio [[02-Projetos/evento-experimental/PROJETO]]; Fireproof ficou fora do grafo por decisão de simplicidade
- Melhoria de sistema → [[HANDOFF-IA-EXTERNA]]; VisionFlow decidido como só citado, sem nó próprio

---

## Relacionados

- Pertence a: [[LBOS]]
- Processado por: [[FLUXO-DOCUMENTO-VIVO]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Inbox criado | Fase 3 do LBOS | Fecha a única porta de entrada do sistema | Captura é deliberadamente barata; classificação é trabalho do fluxo |
| 2026-08-20 | Nota crua adicionada à fila: serviços Google → Merchant Center → loja do site | Felipe pediu para guardar pro futuro, não dá pra executar agora | Nenhum — só entrada, sem classificação | — |
