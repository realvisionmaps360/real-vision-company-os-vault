# Protocolo de Contexto de Sessão — Obsidian CLI

> Como o Claude carrega o contexto de um cliente automaticamente ao iniciar uma sessão.
> Criado em 29/06/2026. Ver também: [[README]] · [[GUIA-Sincronizacao]] · [[REGISTRO-Tecnico]]

---

## A ideia em uma frase

Cada cliente tem um arquivo `FICHA-CLIENTE.md` na sua pasta dentro da vault. Ao iniciar uma sessão sobre um cliente, o Claude lê esse arquivo com o `obsidian-cli` — sem Felipe precisar colar o contexto na mão.

---

## Como usar (Felipe)

No início de uma sessão, basta dizer:

> "Vamos trabalhar com [Nome do Cliente]"

O Claude automaticamente executa:

```bash
obsidian read path="operacao/clientes/arquivos/[Nome do Cliente]/FICHA-CLIENTE.md" vault="Real Vision"
```

E carrega: quem é o cliente, serviços contratados, histórico de entregas e próximos passos.

---

## Onde ficam as fichas

```
operacao/clientes/arquivos/
├── Eduardo Barqueiro/
│   └── FICHA-CLIENTE.md
├── Romana Loznjakovic - Sunbite.ch/
│   └── FICHA-CLIENTE.md
├── Gabriel Iberg - Solarium Aarau/
│   └── FICHA-CLIENTE.md
└── [outros clientes]/
    └── FICHA-CLIENTE.md
```

---

## Estrutura da FICHA-CLIENTE.md

```markdown
---
title: [Nome do cliente]
tags:
  - cliente
  - ativo
status: ativo
data_inicio: YYYY-MM-DD
servicos: []
---

# [Nome do cliente]

## Contexto

## Serviços contratados

## Entregas realizadas

## Próximos passos

## Observações
```

---

## Requisito técnico: habilitar o Obsidian CLI

O CLI do Obsidian vem embutido no app — não é instalado separado. Para ativar:

1. Atualizar o Obsidian para versão **1.12.7 ou superior** (baixar o instalador novo em obsidian.md)
2. No Obsidian: **Settings → General → Command line interface → Ativar**
3. Seguir o prompt de registro (adiciona o comando `obsidian` ao PATH do sistema)
4. Reiniciar o terminal
5. Testar: `obsidian --version`

> O Obsidian precisa estar **aberto** para o CLI funcionar. Se não estiver, ele abre automaticamente no primeiro comando.

---

## Quando criar/atualizar a FICHA-CLIENTE.md

| Momento | Ação |
|---|---|
| Novo cliente | `rv-novo-cliente` cria a ficha automaticamente |
| Ao final de cada sessão | Atualizar Entregas realizadas + Próximos passos |
| Handoff do VisionFlow | Copiar o resumo para a ficha também |

---

## Integração com outras skills

- **[[skills/rv-novo-cliente]]** — cria a ficha ao cadastrar cliente novo
- **[[skills/rv-fim-sessao]]** — o maestro de encerramento: ao final da sessão atualiza esta ficha (fecha o círculo com este protocolo) e gera os demais artefatos
- **[[skills/rv-visionflow-handoff]]** — ao final da sessão, o resumo vai pro VisionFlow E pra ficha
- **[[skills/obsidian-cli]]** — a skill que ensina os comandos do CLI

> Visão geral do ciclo completo (início → durante → fim) em [[CICLO-Sessao]].

> Para a explicação técnica completa do CLI, ver [[REGISTRO-Tecnico]] e a skill `obsidian-cli`.
