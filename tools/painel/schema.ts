/**
 * Contrato do `_PAINEL.md` — definicao normativa.
 *
 * Este arquivo e a fonte unica do que o VisionVault entende. O gerador valida contra ele
 * e o app consome os tipos derivados. Se um `_PAINEL.md` nao passa aqui, ele esta errado.
 *
 * Vocabulario de `status` e das arestas vem de LBOS/00-Sistema/CONVENCOES.md (secoes 4 e 5).
 * Nao inventar valor novo sem atualizar aquele documento primeiro.
 */
import { z } from "zod";

/** Datas sempre ISO. O `DD/MM/AAAA` do corpo do vault nao entra no frontmatter. */
const dataISO = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "data precisa ser AAAA-MM-DD")
  .nullable()
  .optional();

/** CONVENCOES.md secao 4 — vocabulario fechado. */
export const Status = z.enum([
  "ideia",
  "planejado",
  "ativo",
  "bloqueado",
  "pausado",
  "concluido",
  "arquivado",
  "cancelado",
]);

/**
 * Leitura editorial do agente, separada de `status` de proposito: um projeto pode estar
 * `ativo` e `risco` ao mesmo tempo. E o que da "panorama" de verdade.
 */
export const Saude = z.enum(["ok", "atencao", "risco"]);

export const Area = z.enum([
  "marketing",
  "comercial",
  "clientes",
  "produto",
  "gestao",
  "pessoal",
]);

export const Metrica = z.object({
  rotulo: z.string().min(1),
  valor: z.union([z.number(), z.string()]),
  formato: z.enum(["numero", "moeda_brl", "percentual", "texto"]).default("numero"),
  tendencia: z.enum(["subindo", "estavel", "caindo"]).nullable().optional(),
});

export const Documento = z.object({
  titulo: z.string().min(1),
  /** Caminho relativo a raiz do vault, sempre com `/`. Nunca caminho do Windows. */
  caminho: z
    .string()
    .min(1)
    .refine((c) => !c.includes("\\"), "use / e nao \\ no caminho")
    .refine((c) => c.endsWith(".md"), "so documentos .md sao servidos")
    .refine((c) => !c.startsWith("/") && !c.includes(".."), "caminho precisa ser relativo e sem .."),
  papel: z.enum(["principal", "referencia", "timeline", "ficha"]).default("referencia"),
});

export const Pendencia = z.object({
  texto: z.string().min(1),
  prazo: dataISO,
});

/** Aresta do grafo. Lista de wikilinks: `["[[Alvo]]"]`. */
const aresta = z.array(z.string()).optional();

/** Campos que todo painel carrega, independente da visualizacao. */
const comum = {
  id: z.string().min(1),
  tipo: z.literal("painel"),
  painel_versao: z.literal(1),
  nome: z.string().min(1),
  resumo: z.string().max(200).optional(),
  area: Area,
  prioridade: z.enum(["alta", "media", "baixa"]).default("media"),
  destaque: z.boolean().default(false),

  status: Status,
  saude: Saude.default("ok"),
  proximo_passo: z.string().optional(),
  proximo_passo_prazo: dataISO,
  bloqueio: z.string().optional(),
  alerta: z.string().optional(),
  atualizado_em: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "atualizado_em precisa ser AAAA-MM-DD"),
  atualizado_por: z.enum(["claude", "felipe"]).default("claude"),
  proxima_revisao: dataISO,

  metricas: z.array(Metrica).max(4).default([]),
  documentos: z.array(Documento).default([]),
  pendencias: z.array(Pendencia).default([]),

  pertence_a: aresta,
  participa_de: aresta,
  depende_de: aresta,
  afeta: aresta,
  documenta: aresta,
  referencia: aresta,
  tags: z.array(z.string()).default([]),
};

/** Kanban. As colunas sao declaradas pelo projeto; a UI so renderiza o que vier. */
export const PipelineConteudo = z.object({
  ...comum,
  visualizacao: z.literal("pipeline-conteudo"),
  colunas: z.array(z.string()).min(1),
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        titulo: z.string().min(1),
        coluna: z.string().min(1),
        tema: z.string().optional(),
        objetivo: z.string().optional(),
        cta: z.string().optional(),
        idioma: z.string().optional(),
        data_alvo: dataISO,
        data_publicacao: dataISO,
        url: z.string().url().nullable().optional(),
        caminho: z.string().optional(),
        nota: z.string().optional(),
      })
    )
    .default([]),
  backlog: z.array(z.string()).default([]),
});

/** Timeline vertical de pecas com data e estado. */
export const CampanhaCadencia = z.object({
  ...comum,
  visualizacao: z.literal("campanha-cadencia"),
  canal: z.enum(["email", "whatsapp", "misto"]).default("email"),
  publico: z.string().optional(),
  tamanho_publico: z.number().optional(),
  inicio: dataISO,
  fim_previsto: dataISO,
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        ordem: z.number(),
        titulo: z.string().min(1),
        estado: z.enum(["rascunho", "aprovado", "agendado", "enviado", "cancelado"]),
        data: dataISO,
        gancho: z.string().optional(),
        ativo: z.string().optional(),
        caminho: z.string().optional(),
        metricas: z.record(z.number()).optional(),
        nota: z.string().optional(),
      })
    )
    .default([]),
});

/** Molde generico, para o que nao couber nos outros. Evita forcar projeto em molde errado. */
export const Checklist = z.object({
  ...comum,
  visualizacao: z.literal("checklist"),
  itens: z
    .array(
      z.object({
        id: z.string().min(1),
        titulo: z.string().min(1),
        estado: z.enum(["pendente", "feito", "bloqueado"]),
        data: dataISO,
        nota: z.string().optional(),
      })
    )
    .default([]),
});

export const Painel = z.discriminatedUnion("visualizacao", [
  PipelineConteudo,
  CampanhaCadencia,
  Checklist,
]);

/** @typedef {z.infer<typeof Painel>} Painel */
