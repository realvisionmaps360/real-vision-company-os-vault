# 04-Interagente — Comunicação Thomas ↔ LBOS

> Ponte entre o Hermes principal (Thomas Anderson, perfil default) e o agente LBOS (perfil lbos).
> Tudo que um precisa comunicar ao outro passa por aqui.

## Estrutura

```
04-Interagente/
├── README.md                  ← este arquivo
├── Thomas-para-LBOS/          ← Thomas escreve, LBOS lê
│   ├── 2026-08-21-0000-instrucao-exemplo.md
│   └── ...
└── LBOS-para-Thomas/          ← LBOS escreve, Thomas lê
    ├── 2026-08-21-0000-resposta-exemplo.md
    └── ...
```

## Fluxo

1. **Thomas** escreve instrução em `Thomas-para-LBOS/` → faz vault-sync (git push)
2. **LBOS** lê na próxima interação com Felipe → executa → escreve resultado em `LBOS-para-Thomas/`
3. **Thomas** lê resultado → processa → responde Felipe

## Convenções

- Nome: `YYYY-MM-DD-HHMMSS-assunto.md`
- Primeira linha = comando (ex: `## INSTRUCAO: ...` ou `## RESPOSTA: ...`)
- Timestamp em ISO 8601

## Cron

Ambos os agentes syncam o vault periodicamente. Se o LBOS não responde em 30min de uma instrução, Thomas cria lembrete de "LBOS não respondeu" na rotina.