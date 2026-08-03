---
name: rv-instagram-automacao
description: "Automacao tecnica do Instagram da Real Vision -- publicar/ler via MCP (instagram-mcp-server) e o fluxo comentario->DM automatica (self-hospedar OpenReply no VPS). Use quando Felipe disser 'publicar no Instagram', 'postar reels', 'automacao de comentario', 'DM automatica', 'instagram_manage_messages', ou mexer no projeto instagram-mcp. NAO usar pra copy/conteudo semanal (isso e instagram-weekly-content)."
---

# Instagram Automação Técnica — Real Vision 360

## Escopo desta skill

Cobre a **infraestrutura técnica** de conectar `@realvisionmaps360` à API da Meta: publicar, ler dados, e a automação comentário → DM. Projeto vivo em `operacao/projetos/_RV-Internos/instagram-mcp/`.

**Não confundir com `instagram-weekly-content`** — aquela skill cuida de copy/briefing de conteúdo semanal (o quê postar). Esta skill cuida de como postar/automatizar via API (o mecanismo técnico).

## Documentos do projeto (sempre carregar antes de agir)

- [`README.md`](../../operacao/projetos/_RV-Internos/instagram-mcp/README.md) — lista de ferramentas MCP e status de cada uma
- [`HANDOFF.md`](../../operacao/projetos/_RV-Internos/instagram-mcp/HANDOFF.md) — pendências ativas, sempre ler primeiro pra saber onde parou
- [`PROJETO-INTEGRACAO-INSTAGRAM.md`](../../operacao/projetos/_RV-Internos/instagram-mcp/PROJETO-INTEGRACAO-INSTAGRAM.md) — arquitetura das 3 frentes (publicar/ler, DM manual, DM automática)
- [`INSTALACAO-OPENREPLY.md`](../../operacao/projetos/_RV-Internos/instagram-mcp/INSTALACAO-OPENREPLY.md) — passo a passo técnico da Frente 3
- [`TIMELINE.md`](../../operacao/projetos/_RV-Internos/instagram-mcp/TIMELINE.md) — histórico narrado, ler antes de repetir troubleshooting já feito

## As 3 frentes (aprendizado-chave, 31/07/2026)

| Frente | O quê | Onde roda | Status |
|---|---|---|---|
| 1. Publicar/ler | Foto, reel, perfil, insights, comentários | MCP, sob demanda (Claude Code) | Funcionando, 11/14 ferramentas confirmadas |
| 2. DM manual | Ler/enviar DM via comando do Felipe | MCP, sob demanda | Bloqueado — Pendência #1 (Page Access Token) no HANDOFF |
| 3. DM automática | Comentou palavra-chave → DM sozinha, 24h | Servidor sempre ligado (self-hospedado) | OpenReply instalado e funcionando (HTTPS, webhook, OAuth validados) — só falta publicar o app (bloqueado por falta de página de Política de Privacidade no site, ver HANDOFF) |

**Por que MCP não serve pra Frente 3:** exige processo persistente escutando webhook público 24h. Sessão do Claude Code roda sob demanda — isso é limitação estrutural, não de permissão. Nunca propor "fazer pelo MCP" pra automação de comentário/DM em tempo real.

## Aprendizados técnicos que evitam retrabalho

### Publicação de imagem
- `image_url` precisa ser **pública** (HTTPS) — API não aceita upload de arquivo local
- Proporção obrigatória: entre **4:5 e 1.91:1**. Logo institucional geralmente é larga demais (ex: 2.58:1) — falha. Preferir fotos já publicadas no site/portfólio, que já têm proporção correta, em vez de gerar arquivo novo.
- **Não existe endpoint pra editar legenda de post publicado.** Único jeito é apagar (manual, no app) e republicar. Confirmar isso ANTES de prometer "edito a legenda depois".
- Host de imagem: nunca usar serviço anônimo tipo catbox/imgur pra teste — classificador de segurança do Claude Code bloqueia por padrão de risco. Preferir: arquivo já público no site da RV, ou (se precisar hospedar algo novo) infra própria (Supabase Storage já configurado, não host de terceiro anônimo).

### Reels/vídeo
- MP4, codec H.264 (HEVC aceito), máx 90 segundos, proporção 9:16 pra elegibilidade na aba Reels
- Google Drive **não funciona** como `video_url`, mesmo com link "público" — Drive serve página HTML de preview + tela de verificação de vírus em arquivo grande, quebra o fetch da Meta. Precisa de storage de verdade (S3, Cloudflare R2, Supabase Storage, ou CDN).

### Permissões — correção importante sobre `instagram_manage_messages`
Advanced Access/App Review só é obrigatório quando o app atende **conta de terceiro**. Pra conta própria da RV, **Standard Access em modo Development já basta** — mas a permissão precisa ser pedida pelo fluxo real de **Instagram Business Login** (OAuth do app conectando), não pelo seletor genérico do Graph API Explorer, que tem limitações de UI próprias. Antes de assumir "precisa de App Review, semanas de espera", testar esse caminho primeiro.

### Comentário → DM automática — não construir do zero
Existe solução open source pronta e testada: **[OpenReply](https://github.com/diwenne/openreply)** (MIT, 628 estrelas) — implementa webhook receiver, validação HMAC, fila, worker, tudo com a API oficial da Meta. Antes de escrever esse tipo de serviço na mão (webhook + fila + banco), verificar se dá pra self-hospedar uma solução open source existente. Bate com o princípio "open source sempre que possível" do `AGENTS.md`.

**Arquitetura decidida:** self-hospedar o `docker-compose` do OpenReply (Postgres + Redis + app + worker) no VPS Hostinger, com domínio próprio, em vez do Vercel+Railway padrão do projeto — zero vendor lock-in, zero custo adicional. Hermes Agent assume rodar/manter.

### Publicar app na Meta (self-hospedado) — pré-requisitos que travam sem avisar
- **Certificado SSL:** se a Meta recusar validar webhook mesmo com o endpoint respondendo certo, checar `curl -v` (não `curl -sk`, que mascara erro de confiança) antes de desconfiar do código. Certificado self-signed é sintoma clássico de Let's Encrypt ter batido rate limit (5 falhas/hora por domínio) por ter tentado emitir antes do DNS propagar — resolve sozinho após 1h + reforçar o challenge (reiniciar Traefik com cache limpo, no nosso caso).
- **Política de Privacidade:** o botão "Publicar" do app fica desabilitado sem uma URL pública de Política de Privacidade vinculada. Checar se o site do cliente/RV já tem essa página **antes** de chegar nessa etapa, pra não travar no fim do processo.
- **Testador do Instagram:** convite só funciona aceito pelo app do Instagram no celular, nunca pelo site — e é por app específico (mesma conta como testadora em app novo exige convite novo, mesmo se já foi testadora de outro app antes).

## Erros comuns (pitfalls)

| Erro | Como evitar |
|---|---|
| Assumir que qualquer imagem serve pra publicar | Checar proporção (4:5 a 1.91:1) antes de tentar |
| Tentar host anônimo pra imagem/vídeo de teste | Vai ser bloqueado pelo classificador — usar infra própria |
| Achar que dá pra editar legenda depois | Não existe no API — avisar isso antes de publicar |
| Propor construir automação de DM dentro do Claude Code | Estruturalmente impossível (sem processo 24h) — sempre servidor externo |
| Escrever webhook receiver customizado do zero | Verificar OpenReply (ou equivalente open source) primeiro |
| Assumir App Review obrigatório pra `instagram_manage_messages` | Testar Standard Access via Instagram Business Login antes |
| Confundir Instagram User Access Token com Page Access Token | Só o Page Access Token lê histórico de conversa/DM |
| Desconfiar do código quando Meta recusa validar webhook | Testar certificado SSL com `curl -v` primeiro — self-signed é causa comum |
| Chegar na etapa de publicar sem checar Política de Privacidade antes | Confirmar cedo se o site já tem essa página pública |

## Como testar se fez certo

Depois de qualquer mudança nesse projeto:
1. `instagram_get_profile` responde sem erro → token válido
2. Se publicou: post apareceu no feed real, ID retornado bate com o que aparece no app
3. Se mexeu em permissão: re-testar a ferramenta MCP específica que estava travada, não assumir que "deve ter resolvido"
4. Documentos atualizados: HANDOFF.md reflete o estado real, TIMELINE.md tem entrada da sessão, sem duplicar conteúdo entre os dois
