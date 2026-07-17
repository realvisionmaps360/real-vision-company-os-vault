# Aprovações — formato dos registros

Esta pasta guarda os **registros de aprovação** que o hook `.claude/hooks/proteger-youtube-mcp.cjs` consulta antes de liberar uma ferramenta de escrita do YouTube MCP. Cada registro é um `.json` (não sincroniza no vault — só `.md` sincroniza; são tokens operacionais efêmeros, não conhecimento permanente).

## Formato

```json
{
  "operation_id": "PUB-2026-07-14-001",
  "action": "upload_video",
  "resource": "sites-carro-chefe",
  "level": "D",
  "approved_phrase": "APROVO A PUBLICAÇÃO PÚBLICA DO VÍDEO sites-carro-chefe",
  "approved_at": "2026-07-14T18:00:00-03:00",
  "expires_at": "2026-07-15T18:00:00-03:00",
  "used": false
}
```

- `action`: nome exato da ferramenta MCP (ex.: `upload_video`, `delete_video`).
- `resource`: identificador do recurso (video_id, playlist_id, comment_id) — precisa bater exatamente com o parâmetro da chamada.
- Ações destrutivas (`delete_video`, `delete_playlist`, `delete_comment`) exigem **dois** arquivos, com `aprovacao1` e `aprovacao2` no nome do arquivo.
- O hook marca `used: true` depois de liberar — nunca apaga o arquivo (auditoria permanece).
- Um registro só é criado depois que Felipe responde, literalmente, a frase de aprovação exigida (`.claude/rules/seguranca-e-aprovacoes.md`). Nunca a partir de aprovação genérica.

## Limite honesto deste controle

Este hook é uma barreira técnica de defesa em profundidade — impede que uma chamada de escrita passe sem um arquivo de aprovação correspondente já existir em disco. Ele não substitui o julgamento de quem opera a sessão: o registro só deve ser criado em resposta direta e literal à frase de aprovação do Felipe, nunca por interpretação frouxa de "tá bom, pode ir".
