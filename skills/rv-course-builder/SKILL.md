# Skill: rv-course-builder
## Arquiteto de Cursos Profissionais

**Versão:** 1.0  
**Criada:** 01/07/2026  
**Persona:** Arquiteto de Design Instrucional

---

## O que faz

Transforma um **brief do curso** em uma **arquitetura pedagógica completa**:

- ✅ Estrutura de 6 módulos (padrão RV)
- ✅ Grade-mestra (CONCEITO.md) com preços e bônus
- ✅ Templates de roteiros pronto pra gravar (MODULO-N-tema.md)
- ✅ Sugestão de cronograma e estratégia de lançamento
- ✅ Integração clara entre módulos (progressão pedagógica)

**Não faz:** Gerar conteúdo dos roteiros. Essa parte é com você.

---

## Quando Usar

```
Felipe: "vamos estruturar o novo curso de [tema]"
Felipe: "preciso montar a grade desse curso de capacitação"
Felipe: "/rv-course-builder [tema]"
```

**Saída esperada:** Pasta do curso + CONCEITO.md + 6 templates de módulo, prontos pra preencher.

---

## Inputs que a Skill Coleta

Se Felipe não disser tudo, a skill pergunta:

1. **Título/tema do curso**
   - Exemplo: "Do Zero a Agentes"

2. **Público-alvo**
   - Exemplo: "Colaboradores não-técnicos de PMEs"

3. **Objetivo final** (o que o aluno consegue fazer ao terminar)
   - Exemplo: "Automatizar fluxos com Claude Code"

4. **Duração esperada** (em semanas ou meses)
   - Exemplo: "8 semanas"

5. **Os 4 pilares/ferramentas/temas principais**
   - Exemplo: "Claude Code, Integrações, Agentes, Escalabilidade"

6. **Faixa de preço** (opcional)
   - Exemplo: "R$ 500–1.500"

---

## Fluxo da Skill

### Passo 1: Coletar Brief
```
Skill pergunta (via chat):
- Qual é o título do curso?
- Quem é o público?
- Qual é o objetivo final?
- Quanto tempo (6 semanas, 12 semanas)?
- Quais são os 4 pilares?
```

Felipe fornece as respostas (pode ser tudo junto ou separado).

### Passo 2: Mapear Arquitetura Pedagógica
A skill internamente:
- Define Módulo 0 (mentalidade + contexto)
- Sequencia os 4 pilares (Módulos 1–4)
- Design do Módulo 5 (integração + ação)
- Identifica progressão (pré-requisitos, reforço cruzado)

**Princípio:** Sempre 6 módulos. Sempre 4–8 aulas por módulo. Sempre ~5 minutos por aula.

### Passo 3: Gerar Estrutura de Aulas
Para cada módulo, a skill estima:
- Número de aulas (~4–8)
- Duração total (20–40 min)
- Título de cada aula (estrutura geral)
- Gancho central (por que esse módulo?)
- Aula "quanto cobrar" (monetização integrada)

### Passo 4: Render CONCEITO.md
A skill gera um arquivo pronto pra copiar+colar com:
- Visão geral do curso (parágrafo)
- Grade completa (tabela)
- Preços (workshops, curso, mentoria, enterprise)
- Bônus padrão (templates, certificado, comunidade)
- Cronograma estimado
- Progressão pedagógica (visual)

### Passo 5: Render Templates de Roteiros
A skill cria arquivos vazios:
```
operacao/cursos/NN-course-name/
├── MODULO-0-mentalidade.md
├── MODULO-1-[tema].md
├── MODULO-2-[tema].md
├── MODULO-3-[tema].md
├── MODULO-4-[tema].md
├── MODULO-5-integracao.md
└── README.md
```

Cada template segue este padrão:

```markdown
# MÓDULO X: [TEMA]

## 📌 Gancho
[Frase que prende — por que esse módulo importa]

## 🎯 Objetivo do Módulo
[O que o aluno consegue fazer ao terminar]

---

## AULA 1: [Título]
**Duração:** ~5 minutos | **Resultado:** [o que consegue fazer]

### Gancho
[Frase que prende]

### Passos na Tela
1. [Ação 1]
2. [Ação 2]
3. [Ação 3]
(tópicos, não script — Felipe ajusta a fala)

### Fecho
[Conecta com próxima aula]

---

## AULA 2: [Título]
...

---

## 💰 Quanto Cobrar por Isso?
[Range de preço + justificativa]
```

### Passo 6: Sugerir Estratégia & Cronograma
A skill cria:
- **TIMELINE.md** (sugestão de cronograma)
- **ESTRATEGIA-LANCAMENTO.md** (sugestão de marketing)

---

## Outputs (O que a Skill Entrega)

### 1. **CONCEITO.md** ✅
- Visão do curso (1 parágrafo)
- Grade (tabela: módulo | aulas | duração | tópicos)
- Público-alvo refinado
- Preços (workshopAvulso / cursoCompleto / mentoria / enterprise)
- Bônus (templates, certificado, comunidade, atualizações)
- Cronograma estimado
- Progressão pedagógica (explicado)
- Metodologia (formato de aula)
- Status & próximos passos

### 2. **MODULO-0-mentalidade.md** até **MODULO-5-integracao.md** ✅
6 templates vazios, prontos pra Felipe preencher com conteúdo.

### 3. **README.md** ✅
Índice do projeto, status, fases, links pra referências.

### 4. **TIMELINE.md** ✅ (sugestão)
- Fase 1: Estrutura pedagógica (X dias)
- Fase 2: Roteiros detalhados (X dias)
- Fase 3: Gravação (X semanas)
- Fase 4: Edição (X semanas)
- Fase 5: Pré-venda (paralelo)
- Fase 6: Lançamento

### 5. **ESTRATEGIA-LANCAMENTO.md** ✅ (sugestão)
- Fórmula Jeff Walker (teaser → core → oferta)
- Email sequence sugerido
- Blog posts pra alimentar
- Comunidade / suporte
- Métricas de sucesso

---

## Padrões que a Skill Respeita

### Pedagogia Real Vision
> **Sistema Integrado → Resultado Prático → Monetização Clara**

- NÃO é "aprenda a ferramenta"
- É "ganhe skill do mercado / monte seu negócio"
- Cada módulo termina com: "Quanto cobrar por isso?"

### Progressão Sempre
```
Mentalidade → Ferramenta 1 → Ferramenta 2 → 
Ferramenta 3/4 → Integração → Ação
```

- Pré-requisitos claros
- Reforço cruzado entre módulos
- Cada aula conecta na próxima

### Tom de Gravação
- Consultor direto (sem "incrível", "sensacional")
- Screencast (mostra enquanto faz)
- ~5 minutos por aula
- Tópicos (não script — flexibilidade de fala)
- Gancho → Passos → Fecho

### Estrutura Sempre (6 Módulos)
- **Módulo 0:** Mentalidade (4–6 aulas)
- **Módulos 1–4:** Pilares / Ferramentas (4–8 aulas cada)
- **Módulo 5:** Integração + Ação (4–6 aulas)

---

## Referências de Qualidade

A skill usa como templates:

- `operacao/cursos/02-profissional-360/CONCEITO.md` — modelo de grade
- `operacao/cursos/02-profissional-360/MODULO-1-*.md` — modelo de roteiro
- `operacao/cursos/03-socio-digital/TIMELINE.md` — modelo de cronograma
- `operacao/cursos/03-socio-digital/ESTRATEGIA-LANCAMENTO.md` — modelo de marketing

---

## Exemplo de Saída (Do Zero a Agentes)

```
Entrada (Felipe):
- Título: "Do Zero a Agentes"
- Público: "Colaboradores não-técnicos de PMEs"
- Objetivo: "Automatizar fluxos com Claude Code"
- Duração: "8–10 semanas"
- Pilares: "Claude Code, Integrações, Agentes, Análise de Dados"

Saída (Skill):
✅ operacao/cursos/04-zero-a-agentes/
   ├── README.md
   ├── CONCEITO.md (grade 6 módulos, 29 aulas, preços)
   ├── MODULO-0-mentalidade.md (template)
   ├── MODULO-1-claude-code-fundamentos.md (template)
   ├── MODULO-2-automacoes-praticas.md (template)
   ├── MODULO-3-agentes-rotinas.md (template)
   ├── MODULO-4-inteligencia-dados.md (template)
   ├── MODULO-5-escalabilidade-acao.md (template)
   ├── TIMELINE.md (sugestão)
   └── ESTRATEGIA-LANCAMENTO.md (sugestão)

Status: Pronto pra Felipe preencher os roteiros + gravar
```

---

## Checklist de Validação

Depois que a skill entrega tudo, verificar:

- ✅ CONCEITO.md tem grade clara (6 módulos)
- ✅ Cada módulo tem 4–8 aulas (~5 min cada)
- ✅ Progressão pedagógica está documentada (pré-requisitos visíveis)
- ✅ Preços estão sugeridos (workshop / curso / mentoria / enterprise)
- ✅ Bônus padrão RV incluso (templates, certificado, comunidade)
- ✅ 6 templates de roteiro criados (prontos pra preencher)
- ✅ Tom alinhado com RV (prático, direto, sem hipérbole)
- ✅ TIMELINE sugerida (com fases)
- ✅ ESTRATEGIA-LANCAMENTO sugerida

---

## Nota Importante

**Essa skill monta arquitetura, não conteúdo.**

Felipe preenche os roteiros (MODULO-N) com suas aulas específicas. A skill apenas:
- Estrutura pedagógica (6 módulos sempre)
- Sequência de aulas (título + gancho + passos)
- Fórmula de monetização
- Referências de qualidade

O **conteúdo real** (o que falar em cada aula) é com Felipe.

---

## Próximos Passos (Após a Skill)

1. Felipe lê CONCEITO.md e TIMELINE.md
2. Felipe preenche cada MODULO-N-*.md com seu conteúdo
3. Felipe grava os vídeos (screencast)
4. Felipe publica no site + VisionFlow
5. Skill `rv-educacao-simplificada` (opcional) ajuda na linguagem técnica → simples
