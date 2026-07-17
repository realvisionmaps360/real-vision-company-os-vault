---
id: MASTER_PRD
title: PRD Mestre — Real Vision Academy
type: prd
status: draft
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
depends_on:
  - CONTEXT
related:
  - ARCHITECTURE
  - ROADMAP
  - DECISIONS
---

# PRD Mestre — Real Vision Academy

> Documento vivo. Fonte de verdade da visão de produto. Atualizar quando um requisito mudar.

## 1. Visão

A **Real Vision Academy** é o ambiente oficial de ensino, comunidade e distribuição de produtos
digitais da Real Vision. Nasce como **expansão natural** do site `realvisionmaps.com` (mesma base de
código, mesma identidade), não como sistema separado. Deve se tornar o principal ponto de
relacionamento entre a empresa e seus clientes/alunos, evoluindo por muitos anos.

**Princípio arquitetural central:** construir genérico. O primeiro curso é o **Profissional 360**,
mas a plataforma deve suportar N cursos, produtos e funcionalidades sem reestruturação.

## 2. Objetivos

- **Curto prazo:** vender e entregar o curso Profissional 360 em uma área de membros própria.
- **Médio prazo:** múltiplos cursos, materiais complementares, acompanhamento de progresso.
- **Longo prazo:** ecossistema completo — comunidade, certificados, trilhas, tutor de IA,
  ferramentas digitais, integrações com os demais serviços da Real Vision.

## 3. Persona (MVP)

Aluno final (público BR, PT): profissional/empreendedor local que quer aprender a metodologia 360°
da Real Vision. Compra um curso avulso, assiste no navegador, baixa materiais (prompts `.md`),
acompanha o próprio progresso.

## 4. Escopo do MVP

**Dentro do MVP:**
- Criar conta e autenticar (Google OAuth + e-mail/senha), unificado com o login do blog.
- Área de membros (`/academy`) com os cursos adquiridos.
- Comprar curso avulso (checkout via gateway a definir).
- Assistir às aulas (player de vídeo) e acessar materiais complementares (com destaque para
  **prompts em `.md`**).
- Acompanhar progresso (aula concluída / % do curso).
- Painel **admin** para o Felipe cadastrar/editar cursos, módulos, aulas e materiais.
- Idioma: **somente PT**.

**Fora do MVP (fases futuras):**
- Comunidade, certificados, trilhas de aprendizagem, tutor de IA.
- Assinatura (só curso avulso no MVP).
- i18n da Academy (EN/DE).

## 5. Requisitos funcionais (MVP)

| ID | Requisito |
|---|---|
| RF-01 | Visitante cria conta com Google ou e-mail/senha; sessão persistente e global |
| RF-02 | Usuário logado vê "Meus cursos" com o que já adquiriu |
| RF-03 | Usuário compra um curso avulso; após pagamento aprovado, ganha acesso (matrícula) |
| RF-04 | Usuário assiste às aulas em ordem, com player de vídeo |
| RF-05 | Usuário baixa/visualiza materiais complementares da aula (inclui prompts `.md`) |
| RF-06 | Sistema registra e exibe progresso (aula concluída, % do curso) |
| RF-07 | Admin cria/edita cursos, módulos, aulas, materiais e preços |
| RF-08 | Admin concede/revoga acesso manualmente (cortesia, suporte) |

## 6. Requisitos não-funcionais

- Consistência visual e técnica total com o site (design system, fontes, cores — ver [[realvision]]
  e o `CLAUDE.md` do repo do site).
- Segurança por **RLS** no Supabase: aluno só acessa o que comprou; conteúdo protegido.
- Performance dentro dos Core Web Vitals do site.
- Reuso máximo do que já existe (auth, componentes shadcn/ui, i18n). Ver [[ARCHITECTURE]].
- Documentação viva mantida por [[master-visionair]].

## 7. Critérios de sucesso

- Integra-se à arquitetura existente sem criar sistema paralelo.
- Arquitetura limpa, modular, escalável — novos cursos entram sem reestruturação.
- Documentação completa e atualizada.
- Reuso máximo de componentes/serviços existentes.

## 8. Decisões que alimentam este PRD
Ver [[DECISIONS]]. Pendências de pesquisa: [[pagamento]], [[video-hosting]].

## Documentos relacionados
- [[CONTEXT]]
- [[ARCHITECTURE]]
- [[ROADMAP]]
- [[DECISIONS]]
- [[GLOSSARY]]
