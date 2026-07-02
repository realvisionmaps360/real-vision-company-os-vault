# Sócio Digital — Nova Copy
> Copy de venda do serviço descrito em [[CONCEITO|Curso 03 — Sócio Digital]]
> Reescrita em 28/05/2026
> Substitui o conteúdo genérico de ServicoSocioDigital.tsx
> Baseado no vídeo "A Crise e a Oportunidade da Inteligência Artificial"

---

## O que mudou

A versão anterior mostrava uma tabela de tiers (Essencial/Profissional/Premium) genérica.
O problema: não explica o QUE é o produto de verdade.

A nova copy parte do real: instalamos Claude Code no computador do cliente, configuramos os agentes para o contexto específico do negócio dele, e damos treinamento 1:1 ao vivo. É um mix de entrega técnica + mentoria aplicada.

---

## Nova copy para ServicoSocioDigital.tsx

```tsx
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnóstico (30 min, grátis)",
    desc: "Call de descoberta. Identificamos o maior gargalo operacional e o que dá pra delegar imediatamente.",
  },
  {
    step: "02",
    title: "Instalação e configuração (4h ao vivo)",
    desc: "Entramos remoto no seu computador. Instalamos Claude Code, construímos a estrutura de contexto do negócio e treinamos você ao vivo.",
  },
  {
    step: "03",
    title: "Primeira semana operando",
    desc: "Você começa a delegar. A IA aprende com as correções. No fim da semana, já está rodando com supervisão mínima.",
  },
  {
    step: "04",
    title: "Acompanhamento mensal",
    desc: "Relatório do que sua IA executou no mês + 1 insight estratégico baseado nos dados reais da operação.",
  },
];

const WHAT_IT_IS = [
  "Claude Code instalado diretamente no seu computador",
  "Treinado com o contexto real da sua empresa (processos, voz, clientes, dados)",
  "Conectado ao banco de dados do seu negócio",
  "Treinamento 1:1 ao vivo — 4 horas, tudo configurado na sua frente",
  "Você pergunta, ela responde. Você manda executar, ela executa.",
];

const WHATSAPP_DIAGNOSTICO = "https://wa.me/5511912931924?text=Quero%20agendar%20um%20diagn%C3%B3stico%20gratuito%20do%20S%C3%B3cio%20Digital";
```

### JSX Component (ServicoSocioDigital.tsx — versão nova)

```tsx
export default function ServicoSocioDigital() {
  return (
    <div className="space-y-10 py-4">

      {/* Intro direta */}
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-foreground/90 font-medium">
          Não é um chatbot. Não é mais uma ferramenta.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          É Claude Code instalado no computador do seu negócio — treinado com o contexto real
          da sua operação e conectado ao seu banco de dados. Em 4 horas ao vivo, instalamos,
          configuramos e te ensinamos a delegar. Na semana seguinte, você já está liberando horas.
        </p>
      </div>

      {/* O que inclui */}
      <div className="rounded-[4px] border border-foreground/10 bg-card p-5 space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">O que você recebe</p>
        <ul className="space-y-2">
          {WHAT_IT_IS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Como funciona */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Como funciona</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="rounded-[4px] border border-foreground/10 bg-card p-4 space-y-1">
              <span className="text-xs text-accent font-mono">{s.step}</span>
              <p className="text-sm font-medium text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta de vagas */}
      <div className="rounded-[4px] border border-foreground/10 bg-card p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vagas limitadas por mês — cada novo Sócio Digital passa por diagnóstico antes da implementação.
            O processo inteiro leva duas semanas. Você não instala nada antes.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="rounded-[4px]">
          <a href={WHATSAPP_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
            Agendar diagnóstico gratuito
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-[4px]">
          <a href="/blog/fim-das-tarefas-repetitivas-socio-digital-real-vision" rel="noopener noreferrer">
            Ver como funciona na prática →
          </a>
        </Button>
      </div>
    </div>
  );
}
```

---

## Prompt para Lovable (adicionar ao site)

```
═══════════════════════════════════════════════════════
REESCREVER COPY DO SÓCIO DIGITAL — ServicoSocioDigital.tsx
═══════════════════════════════════════════════════════

No arquivo src/components/servicos/items/ServicoSocioDigital.tsx, substitua TODO o conteúdo pelo seguinte:

[cole o TSX Component acima]

Mantenha os imports existentes (Check, Sparkles, Button, cn).
Não altere nenhum outro arquivo.
═══════════════════════════════════════════════════════
```
