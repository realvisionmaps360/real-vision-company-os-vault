# rv-visionflow-handoff

> Skill de handoff para o VisionFlow. Arquivo real: `.claude-skills/rv-visionflow-handoff/SKILL.md`

## O que faz

Ao final de sessão com cliente, gera um texto estruturado pronto para colar em **Observações** no VisionFlow. A IA do VisionFlow lê e cria cards automáticos.

O que vai pro handoff: status, entregas ao cliente, decisões acordadas, tarefas com responsável.
O que **não** vai: detalhes técnicos, histórico já documentado, skills criadas, observações internas.

## Como usar

```
/rv-visionflow-handoff
```

Normalmente chamado pelo maestro [[rv-fim-sessao]], mas pode ser usado avulso.

## Relacionadas

- [[rv-fim-sessao]] — orquestra este handoff junto com a atualização da ficha
