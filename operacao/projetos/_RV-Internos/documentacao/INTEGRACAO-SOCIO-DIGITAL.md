# Integração Sócio Digital → Ecossistema Real Vision

> **Status:** Pendente — fazer depois que a home for refeita
> **Criado:** 2026-05-25

## O que precisa ser integrado

O projeto **Sócio Digital** (em `operacao/projetos/socio-digital/`) é o **6º pilar de serviço** da Real Vision. A documentação já existe e está completa, mas o ecossistema ainda fala em **5 pilares**. Tudo abaixo precisa ser atualizado:

### 1. `contexto/EMPRESA.md`
- Trocar "cinco pilares" → **"seis pilares"** em todas as ocorrências
- Adicionar Sócio Digital à lista de pilares (com tagline + promessa)
- Incluir pricing resumido (Essencial / Profissional / Empresarial)
- Adicionar à seção de modelo de receita (recorrente vs avulso)

### 2. Site real-vision-core
- Adicionar Sócio Digital ao grid de serviços da home
- Criar página `/socio-digital` (briefing já existe em `socio-digital/03-PAGINA-SERVICO-BRIEFING.md`)
- Atualizar menu de navegação se necessário
- Adicionar Sócio Digital ao funil de captura

### 3. Skill `realvision`
- Atualizar o contexto loader para mencionar Sócio Digital
- Adicionar à tabela de pilares no SKILL.md

### 4. Knowledge Base global (CLAUDE.md em `~/.claude/`)
- Atualizar a seção "O que é a Real Vision" — listar 6 pilares
- Mencionar a estratégia de receita recorrente

### 5. BLOG-POSTS-PIPELINE.md
- Já tem 3 posts de Sócio Digital + 1 de Vision Cloud (mantém)
- Verificar se a ordem de publicação faz sentido

### 6. Vision Cloud (sub-marca)
- Vision Cloud é apresentado como brinde — precisa de seção própria na home?
- Verificar se vira sub-página `/vision-cloud` ou fica só como menção

## Dependências antes de integrar

1. Felipe decidir as 5 decisões bloqueantes em `socio-digital/01-PLANO-MESTRE.md`:
   - URL da página (`/socio-digital` recomendado)
   - Funil (call de diagnóstico recomendado)
   - Cliente piloto
   - Orçamento Google Ads
   - Inspirações visuais
2. Home refeita (esse projeto atual)
3. Página `/socio-digital` publicada

## Ordem sugerida de execução

1. Refazer a home (agora) — já incluindo bloco de Sócio Digital
2. Decisões bloqueantes do Sócio Digital
3. Página `/socio-digital` no Lovable
4. Atualizar EMPRESA.md + CLAUDE.md + skill realvision
5. Publicar 1º blog post
6. Marketing pago + cliente piloto
