---
name: rv-termos
description: Consulta os Termos de Serviço da Real Vision (GENERAL CLIENT TERMS AND CONDITIONS / TERMOS E CONDIÇÕES GERAIS). Use quando Felipe tiver um problema com um cliente, precisar saber o que os termos dizem sobre uma situação, quiser citar uma cláusula ao responder um cliente, for montar ou enviar uma proposta e precisar confirmar quais termos se aplicam, ou sempre que houver menção a "termos de serviço", "termos", "cláusula", "o que posso cobrar", "direitos do cliente", "responsabilidade", "propriedade", "cancela", "inativo", "sumiu", "mudança de escopo". NÃO usar para criar um contrato individual de cliente — para isso usar rv-contrato (sistema de contratos Real Vision).
---

# rv-termos — Consultor dos Termos de Serviço Real Vision

Esta skill transforma os Termos de Serviço da Real Vision em um guia prático. Você descreve o problema ou situação, e a skill aponta a cláusula exata que se aplica e orienta como comunicar com o cliente.

Dois modos de uso:
- **Modo problema** — cliente causou alguma coisa e você precisa saber o que os termos dizem
- **Modo proposta** — antes de enviar proposta, confirmar quais termos cobrem o serviço

---

## Onde ficam os Termos de Serviço

Ambos os arquivos estão em:

```
C:\Users\Computador\Desktop\Real Vision\operacao\comercial\
```

- Inglês (para clientes internacionais): `GENERAL-TERMS-CONDITIONS-v1.1-EN.md`
- Português (para clientes brasileiros): `TERMOS-E-CONDICOES-GERAIS-v1.1-PT.md`

Versão atual: **1.1 — Junho de 2026**

Ao ativar esta skill, leia o arquivo da versão mais adequada ao contexto do cliente antes de responder.

---

## Mapa rápido — situação → cláusula

| O que aconteceu | Cláusula | O que ela diz em resumo |
|---|---|---|
| Cliente sumiu / não responde | **Cláusula 5** | Após 30 dias sem resposta, o projeto pode ser encerrado administrativamente |
| Cliente quer mudar o escopo | **Cláusula 4** | Mudanças estruturais geram nova cotação — não estão incluídas no escopo original |
| Atraso foi causado pelo cliente | **Cláusula 2.3** | Prazo é automaticamente estendido — Real Vision não é responsável |
| Pagamento atrasado | **Cláusula 6.4** | Trabalho pode ser suspenso, acesso restrito e serviços de hospedagem pausados |
| Entrega ficou parada por cliente | **Cláusula 3.1** | Sem feedback em 7 dias = entregável aprovado automaticamente |
| Quem é dono do site / fotos / tour | **Cláusula 8** | Cliente recebe os arquivos finais após pagamento integral; Real Vision fica com metodologias e projetos brutos |
| Cliente diz que o resultado não foi o esperado (ranking, leads, receita) | **Cláusula 11** | Real Vision não garante resultados de negócio — só o esforço profissional |
| Cliente quer cancelar serviço mensal | **Cláusula 12** | Cancelamento em 30 dias após aviso escrito; valores já faturados continuam devidos |
| Problema com Google, WhatsApp, hospedagem, plataformas | **Cláusula 7** | Real Vision não é responsável por interrupções de terceiros |
| Cliente questiona proteção de dados / LGPD | **Cláusula 16** | Real Vision é operadora; cliente é o controlador; dados usados só para execução dos serviços |
| Drone não voou / sessão cancelada por clima | **Cláusula 10.2 e 10.5** | Custos de deslocamento já incorridos ficam com o cliente se o cancelamento foi por clima ou restrição |

---

## Como usar esta skill

### Modo problema com cliente

1. Leia o arquivo dos termos (`GENERAL-TERMS-CONDITIONS-v1.1-EN.md` ou PT)
2. Felipe descreve o que aconteceu
3. Identifique a cláusula no mapa acima
4. Leia a cláusula exata nos termos
5. Sugira ao Felipe como comunicar ao cliente — sempre com base no texto real da cláusula, nunca inventando

**Exemplo de resposta:**
> "Pelos Termos de Serviço, Cláusula 5.2: após 30 dias corridos de inatividade do cliente, a Real Vision pode encerrar o projeto administrativamente. Reativação fica sujeita à disponibilidade de agenda e pode ter custo adicional. Posso rascunhar a mensagem para o cliente se quiser."

### Modo proposta

Antes de enviar uma proposta, confirme com Felipe:
- O serviço está coberto pela Cláusula 1.1? (lista de serviços elegíveis)
- O escopo foi descrito de forma clara para que Cláusula 1.3 se aplique (fora do escopo = nova cotação)?
- A forma de pagamento está alinhada com Cláusula 6?
- Se for cliente internacional, a Cláusula 15.3 permite definir jurisdição específica no contrato — vale mencionar?

---

## Regra de ouro

**Nunca inventar ou parafrasear o que os termos dizem.** Sempre citar a cláusula pelo número e reproduzir o texto original (ou tradução fiel). Isso protege a Real Vision e transmite profissionalismo ao cliente.

Se a situação não estiver coberta por nenhuma cláusula, diga isso claramente — e sugira que Felipe avalie se vale atualizar os termos.

---

## Estrutura dos Termos de Serviço (referência rápida)

| Cláusula | Título |
|---|---|
| 1 | Escopo dos serviços |
| 2 | Responsabilidades do cliente |
| 3 | Processo de aprovação |
| 4 | Revisões e alterações |
| 5 | Suspensão por inatividade do cliente |
| 6 | Honorários e condições de pagamento |
| 7 | Serviços de terceiros |
| 8 | Propriedade intelectual |
| 9 | Hospedagem, domínios e infraestrutura |
| 10 | Fotografia, vídeo e drone |
| 11 | Limitação de responsabilidade |
| 12 | Serviços recorrentes |
| 13 | Confidencialidade |
| 14 | Força maior |
| 15 | Lei aplicável e jurisdição |
| 16 | Proteção de dados (LGPD) |

---

## Como ativar esta skill

```
/rv-termos
```

Ou mencionar: "termos de serviço", "termos", "cláusula", "o que posso cobrar", "direitos do cliente", "responsabilidade", "cliente sumiu", "mudança de escopo", "cancelamento", "propriedade intelectual", "LGPD".
