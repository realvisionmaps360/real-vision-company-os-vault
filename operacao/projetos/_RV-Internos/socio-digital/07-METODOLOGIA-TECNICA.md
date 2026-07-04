# Metodologia Técnica — Sócio Digital

> Documento interno. Descreve como o produto funciona por baixo do capô — stack, lógica de entrega e diferencial da camada de IA. Não publicar esse conteúdo diretamente para clientes (adaptar a linguagem).

---

## O problema que resolvemos

A maioria dos negócios ainda funciona com planilhas e anotações em papéis. Os donos não querem pagar por ferramentas externas caras, mas também não têm condições de investir em um software sob medida. O resultado disso são negócios que ficam travados nessa situação por anos, perdendo eficiência e dinheiro todos os dias.

---

## A metodologia de entrega (2 semanas)

Existe uma oportunidade enorme para quem sabe usar inteligência artificial para resolver problemas reais de negócios. Usando Claude Code e Supabase, você pode transformar completamente a operação de uma empresa em apenas duas semanas.

**Semana 1 — Diagnóstico:**
Entrar no negócio e identificar o maior gargalo operacional.

**Semana 2 — Construção:**
Construir uma ferramenta personalizada que resolve esse problema de forma definitiva. Um banco de dados real, com uma interface funcional, publicada no domínio do cliente.

---

## O diferencial: camada MCP

O que realmente diferencia esse modelo de negócio é a aplicação de uma camada de inteligência artificial por cima de tudo, utilizando MCP (Model Context Protocol).

Com o MCP, o cliente não tem apenas mais uma ferramenta no seu arsenal. Ele tem uma ferramenta que responde perguntas sobre os dados do negócio dele em tempo real:

- "Quais clientes estão com pagamento atrasado?" → Claude responde na hora.
- "Qual foi o melhor vendedor do trimestre?" → Claude responde na hora.

Isso é inteligência artificial aplicada a problemas reais de negócios.

---

## Modelo de cobrança (referência interna)

| Componente | Valor |
|---|---|
| Setup (construção da solução) | R$ 5.000 |
| Mensalidade (manutenção + funcionalidades ativas) | R$ 1.500/mês |

**Com apenas 5 clientes nesse modelo:** R$ 7.500/mês de receita recorrente previsível.

> **Nota:** Os valores acima são referência para o posicionamento Empresarial/Avançado. Cruzar com a tabela de tiers em `02-SERVICO-COMPLETO.md` para calibrar proposta por cliente.

---

## Por que a camada MCP é inegociável

Sem ela, você só está adicionando mais uma ferramenta nas tantas que o cliente já utiliza.

Com ela, você entrega **inteligência**, não apenas mais um software.

Essa é a diferença entre ser mais um prestador de serviços e se tornar um parceiro estratégico de negócios usando inteligência artificial.

---

## Stack técnico (interno — não revelar para clientes)

- **Motor de IA:** Claude Code (Anthropic)
- **Banco de dados:** Supabase (PostgreSQL)
- **Protocolo de integração:** MCP (Model Context Protocol)
- **Interface de uso:** Terminal / Claude Code CLI na máquina do cliente
- **Contexto da empresa:** Pastas Company OS com documentos reais da operação

---

## Linguagem pública vs. interna

| Interno | Público (para clientes) |
|---|---|
| Claude Code | IA instalada no seu computador |
| Supabase | Banco de dados do negócio |
| MCP | Camada de inteligência conectada aos seus dados |
| Company OS | Estrutura de contexto da sua empresa |
| Anthropic | — (não mencionar) |
