---
name: rv-entrega
description: Checklist de pré-entrega de sites Real Vision. Use quando Felipe disser "vamos entregar o site", "checar antes de entregar", "pré-entrega do site", "auditoria antes de entregar" ou /rv-entrega. Roda o /improve no repositório do cliente, apresenta os achados e guia a decisão do que corrigir antes de liberar para o cliente.
---

# Skill: rv-entrega — Pré-entrega de Sites

> Auditoria obrigatória antes de qualquer site sair para o cliente.
> O `/improve` faz a análise técnica. Você decide o que corrigir.

---

## Quando usar

- Site de cliente pronto para entregar
- Antes de passar o link final para o cliente
- Após mudanças grandes no código (redesign, nova funcionalidade)

---

## Procedimento

### Passo 1 — Identificar o repositório
Perguntar ao Felipe (ou inferir do contexto):
- Qual cliente?
- Caminho do repositório local: `operacao/clientes/arquivos/<Nome-Cliente>/site/`

### Passo 2 — Rodar o `/improve` no repositório

Navegar até a pasta do site do cliente e invocar:

```
/improve quick
```

Usar `quick` por padrão (cobre bugs, segurança e testes — o suficiente para pré-entrega).
Se Felipe quiser análise mais profunda, usar `/improve` (standard) ou `/improve deep`.

### Passo 3 — Apresentar os achados por prioridade

Organizar o relatório em três blocos:

**🔴 Crítico — bloqueia a entrega**
Bugs que quebram funcionalidade, dados expostos, formulários inseguros.

**🟡 Importante — corrigir antes se possível**
Performance pesada, SEO básico ausente (meta title/description), imagens sem alt text.

**🟢 Opcional — melhorias futuras**
Refatorações, acessibilidade avançada, otimizações de código.

### Passo 4 — Felipe decide o que corrigir

Para cada item crítico: corrigir agora antes de entregar.
Para itens importantes: Felipe decide (tempo vs. qualidade).
Para opcionais: registrar como backlog no `PROJETO.md` do cliente.

### Passo 5 — Confirmar entrega

Após correções aplicadas:
- Rodar o site localmente e confirmar que tudo funciona
- Confirmar URL de produção está apontando correta
- Avisar Felipe que está liberado para enviar ao cliente

---

## O que o `/improve` audita em sites Real Vision

| Categoria | O que verifica |
|---|---|
| Bugs | Erros no código, links quebrados, lógica incorreta |
| Segurança | Variáveis de ambiente expostas, formulários sem validação |
| Performance | Imagens pesadas, scripts bloqueantes, fontes não otimizadas |
| SEO | Meta tags, title, description, Open Graph |
| Acessibilidade | Alt text em imagens, contraste, semântica HTML |
| Dependências | Pacotes desatualizados com vulnerabilidades conhecidas |

---

## Importante

- O `/improve` **nunca mexe no código** — só analisa e escreve planos
- Para executar as correções dos planos: `/improve execute <plano>`
- Esta skill é **separada** do `rv-fim-sessao` — encerramento de sessão é feito à parte

---

*Skill criada em 30/06/2026. Ver também: [[improve]], [[rv-fim-sessao]].*
