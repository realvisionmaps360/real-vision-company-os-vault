---
status: v1
última atualização: 2026-07-14
---

# Riscos e Controles

| Risco | Controle |
|---|---|
| Ação de escrita indevida no canal público (upload, edição, exclusão) sem aprovação | Matriz de aprovações Nível C/D/E + hooks de bloqueio (quando MCP instalado) |
| Apresentar hipótese de terceiro como fato confirmado | Etiqueta obrigatória de nível de confiança em toda afirmação estratégica |
| Perder decisão/aprendizado por não documentar | Regra de documentação obrigatória — toda sessão registra em `07_decisoes/` |
| `.claude/` (regras/hooks) não sincronizar e se perder numa outra máquina | Cópia sincronizável dos documentos críticos em `00_governanca/` (este arquivo, matriz de aprovações, fontes) |
| Confundir capacidade do MCP com o que o README do repositório promete | Regra: sempre inventariar ferramentas reais em tempo de execução antes de assumir |
| Excluir arquivo do vault por engano | Regra de ouro herdada: nunca apagar, sempre criar versão nova |
| Conteúdo polêmico de propósito prejudicando distribuição (sinal de satisfação do espectador) | Regra de voz: sem polêmica proposital para gerar comentário |
