# rv-course-builder
## Arquiteto de Cursos Profissionais da Real Vision

**Ativação:** `/rv-course-builder [tema-do-curso]`

**Descrição:** Skill que transforma um brief de curso em arquitetura pedagógica completa (CONCEITO.md + 6 templates de módulo + cronograma).

---

## Como Usar

### Ativação Simples
```
Felipe: "vamos estruturar o novo curso de IA"
→ Claude ativa `rv-course-builder` automaticamente
```

### Ativação Direta
```
/rv-course-builder Do Zero a Agentes
```

---

## O que Você Fornece

1. **Título do curso** (obrigatório)
2. **Público-alvo** (ex: colaboradores não-técnicos)
3. **Objetivo final** (ex: saber automatizar com Claude Code)
4. **Duração** (ex: 8 semanas)
5. **4 pilares principais** (temas/ferramentas que vão ser os módulos 1–4)

Pode fornecer tudo junto ou a skill vai perguntar.

---

## O que a Skill Entrega

✅ **CONCEITO.md**  
Grade-mestra com 6 módulos, preços, bônus, cronograma

✅ **6 Roteiros (MODULO-0 até MODULO-5)**  
Templates vazios, prontos pra você preencher

✅ **README.md**  
Índice do projeto

✅ **TIMELINE.md**  
Cronograma estimado de gravação + lançamento

✅ **ESTRATEGIA-LANCAMENTO.md**  
Sugestão de marketing + fórmula Jeff Walker

---

## Referências & Padrão

A skill se baseia em:
- **Profissão 360°** — modelo pedagógico validado
- **Sócio Digital** — estrutura de marketing
- **Empresa com IA** — exemplo de integração

Padrão pedagógico:
- Sempre **6 módulos** (0 mentalidade + 1–4 pilares + 5 ação)
- Sempre **4–8 aulas por módulo**
- Sempre **~5 minutos por aula**
- Sempre **monetização integrada** (cada módulo tem aula "quanto cobrar")

---

## Exemplo: Do Zero a Agentes

**Input:**
```
Título: "Do Zero a Agentes: Curso Prático de IA para Pequenas Empresas"
Público: Colaboradores não-técnicos
Objetivo: Saber automatizar com Claude Code
Duração: 8 semanas
Pilares: Claude Code, Integrações, Agentes, Análise de Dados
```

**Output:**
```
📁 operacao/cursos/04-zero-a-agentes/
├── CONCEITO.md (grade 6 mod, 29 aulas, R$ 597–1.497)
├── MODULO-0-mentalidade.md (template)
├── MODULO-1-claude-code-fundamentos.md (template)
├── MODULO-2-automacoes-praticas.md (template)
├── MODULO-3-agentes-rotinas.md (template)
├── MODULO-4-inteligencia-dados.md (template)
├── MODULO-5-escalabilidade-acao.md (template)
├── README.md
├── TIMELINE.md (sugestão: 12 semanas até lançamento)
└── ESTRATEGIA-LANCAMENTO.md (sugestão: email + blog)
```

---

## Próximos Passos (Você Faz)

1. ✅ Skill monta arquitetura
2. 👤 Felipe lê CONCEITO.md + TIMELINE
3. 👤 Felipe preenche MODULO-N com seu conteúdo
4. 🎥 Felipe grava vídeos (screencast)
5. 🚀 Felipe publica no site + VisionFlow

---

## Stack & Tecnologia

- **Persona:** Arquiteto de Design Instrucional + Pedagogo
- **Referências:** Profissão 360° + Sócio Digital
- **Linguagem:** Português, simples e direto
- **Entregáveis:** Markdown (.md) — tudo pronto pra copiar+colar

---

## Dependências & Contexto

Ativa automaticamente com:
- `realvision` — contexto da empresa + voz
- Referências: cursos em `operacao/cursos/0X-*/`

---

## Versão & Changelog

**v1.0** (01/07/2026)
- ✅ Skill criada
- ✅ Padrão RV integrado (6 módulos sempre)
- ✅ CONCEITO.md + 6 roteiros
- ✅ TIMELINE + ESTRATEGIA-LANCAMENTO sugeridas
