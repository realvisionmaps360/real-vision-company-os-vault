# rv-fim-sessao

> Skill de encerramento de sessão. Arquivo real: `.claude-skills/rv-fim-sessao/SKILL.md`
> Ver índice do ciclo: [[CICLO-Sessao]]

## O que faz

Maestro do fim de sessão. Decide automaticamente o que produzir:

- **Sempre:** atualiza a FICHA-CLIENTE.md do cliente (linha do tempo + status)
- **Se sessão com cliente:** gera texto pro VisionFlow (via [[rv-visionflow-handoff]])
- **Se obra ficou pela metade:** gera bilhete técnico pré-`/clear` (via `session-handoff`)

## Como usar

```
/rv-fim-sessao
```

Carrega junto com `realvision` em toda sessão de cliente.

## Relacionadas

- [[rv-visionflow-handoff]] — resumo pro CRM
- [[rv-novo-cliente]] — cria a ficha no início
- [[PROTOCOLO-Sessao-Contexto]] — carregamento no início da sessão
