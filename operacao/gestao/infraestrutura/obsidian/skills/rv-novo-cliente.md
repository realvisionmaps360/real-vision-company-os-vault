# rv-novo-cliente

> Skill de onboarding de cliente novo. Arquivo real: `.claude-skills/rv-novo-cliente/SKILL.md`

## O que faz

Ao receber um print do VisionFlow ou a frase "novo cliente":

1. Consulta o Supabase para evitar duplicata
2. Cria a pasta do cliente em `operacao/clientes/arquivos/[Nome]/`
3. Cria a FICHA-CLIENTE.md e a TIMELINE
4. Cria skill por-cliente se necessário

## Como usar

```
/rv-novo-cliente
```

Ou simplesmente dizer "novo cliente" com os dados.

## Relacionadas

- [[rv-fim-sessao]] — atualiza a ficha ao final da sessão
- [[PROTOCOLO-Sessao-Contexto]] — como a ficha é lida nas sessões seguintes
