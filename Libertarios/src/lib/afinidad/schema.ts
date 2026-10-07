import { z } from "zod";
import type {
  Dataset,
  DeputyAttribution,
  Party,
  Quote,
  ProgrammeStance,
  Question,
  RecordStance,
  SaidVsDid,
  Source,
  Stance,
} from "@/data/afinidad/types";

/**
 * Esquema zod del dataset de afinidad.
 *
 * Los tipos de `types.ts` dicen qué forma tiene un dato; este fichero dice
 * cuándo un dato puede puntuar. La regla de fondo es la del repo —no inventar
 * datos—: una celda que dice `verificado` sin cita y sin enlace que un humano
 * pueda abrir no es un dato verificado, es una opinión con etiqueta. Por eso el
 * esquema la rechaza en vez de dejarla pasar al cálculo.
 */

/** Máximo de palabras de una cita: cita literal, no resumen del programa. */
export const MAX_QUOTE_WORDS = 60;
/** Máximo de palabras de una cita de hemeroteca. */
export const MAX_HEMEROTECA_WORDS = 50;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** Códigos INE de comunidad y ciudad autónoma: 01 a 19. */
export const INE_REGION = /^(0[1-9]|1[0-9])$/;

/**
 * URL de una votación en los datos abiertos del Congreso:
 * `https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion{N}/{AAAAMMDD}/Votacion{NNN}/…`
 * Se exige este patrón —y no una URL cualquiera de congreso.es— porque es el
 * único que lleva el voto por diputado en JSON y se puede comprobar por máquina.
 */
export const CONGRESO_VOTE_URL =
  /^https:\/\/www\.congreso\.es\/webpublica\/opendata\/votaciones\/Leg(\d{2})\/Sesion(\d+)\/(\d{8})\/Votacion(\d+)\/?/;

const LEG_NUMBER = { XIV: 14, XV: 15 } as const;

/**
 * Comprueba que la URL de una votación apunta a la misma votación que dicen
 * los campos. Un error frecuente al copiar es dejar la URL de otra votación de
 * la misma sesión; con esto no pasa.
 */
export function voteUrlMatches(v: {
  legislature: "XIV" | "XV";
  session: number;
  date: string;
  number: number;
  url: string;
}): string | null {
  const m = CONGRESO_VOTE_URL.exec(v.url);
  if (!m) return "la URL no sigue el patrón de datos abiertos de congreso.es";
  const [, leg, session, ymd, num] = m;
  if (Number(leg) !== LEG_NUMBER[v.legislature]) return "la legislatura de la URL no coincide";
  if (Number(session) !== v.session) return "la sesión de la URL no coincide";
  if (ymd !== v.date.replace(/-/g, "")) return "la fecha de la URL no coincide";
  if (Number(num) !== v.number) return "el número de votación de la URL no coincide";
  return null;
}

const url = z.string().url().refine((u) => /^https?:\/\//.test(u), "debe ser http(s)");
const isoDate = z.string().regex(ISO_DATE, "fecha AAAA-MM-DD");
const nonEmpty = z.string().trim().min(1);

export const positionSchema = z.union([
  z.literal(-2),
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);
export const confidenceSchema = z.enum(["alta", "media", "baja"]);
export const statusSchema = z.enum(["verificado", "pendiente", "sin-posicion", "contested"]);

const year = z.number().int().min(1977).max(2100);

/** Traducciones opcionales de campos de texto (`DataI18n`): solo cadenas no vacías. */
const dataI18n = <K extends string>(keys: readonly K[]) => {
  const fields = z
    .object(Object.fromEntries(keys.map((k) => [k, nonEmpty.optional()])) as Record<K, z.ZodOptional<typeof nonEmpty>>)
    .strict();
  return z.object({ ca: fields.optional(), gl: fields.optional(), eu: fields.optional() }).strict().optional();
};

export const sourceSchema: z.ZodType<Source> = z.object({
  url,
  title: nonEmpty,
  date: isoDate.optional(),
  year: year.optional(),
  page: z.string().optional(),
  archiveUrl: url.optional(),
});

/*
 * Los programas que se usan pueden ser de 2023 mientras no se publiquen los de
 * 2026 (actualización del plan), y la UI tiene que poder decir de qué año es
 * cada cita. Por eso, en lo que puntúa, la fecha o el año son obligatorios.
 */
const datedSource = (s: Source) => !!s.date || typeof s.year === "number";

/*
 * En celdas que no puntúan (pendiente, sin-posicion) la fuente puede faltar:
 * precisamente no se encontró. El tipo exige el objeto, así que se acepta con
 * URL vacía en lugar de inventar un enlace de relleno.
 */
const looseSourceSchema = z.object({
  url: z.union([url, z.literal("")]),
  title: z.string(),
  date: isoDate.optional(),
  year: year.optional(),
  page: z.string().optional(),
  archiveUrl: url.optional(),
});

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Estados que entran en el cálculo. `contested` puntúa con la media. */
export const SCORING_STATUSES = ["verificado", "contested"] as const;
const scores = (status: string) => (SCORING_STATUSES as readonly string[]).includes(status);

export const programmeStanceSchema: z.ZodType<ProgrammeStance> = z
  .object({
    position: positionSchema,
    status: statusSchema,
    confidence: confidenceSchema,
    quote: z.string(),
    source: looseSourceSchema,
    note: z.string().optional(),
    reviewer: z.object({ position: positionSchema, agrees: z.boolean() }).optional(),
  })
  .superRefine((s, ctx) => {
    if (scores(s.status)) {
      // Lo que puntúa debe poder comprobarse: cita literal y documento abierto.
      if (!s.quote.trim()) ctx.addIssue({ code: "custom", path: ["quote"], message: "cita obligatoria si puntúa" });
      if (!sourceSchema.safeParse(s.source).success)
        ctx.addIssue({ code: "custom", path: ["source", "url"], message: "fuente con URL obligatoria si puntúa" });
      else if (!datedSource(s.source))
        ctx.addIssue({ code: "custom", path: ["source", "date"], message: "fecha o año del programa obligatorio si puntúa" });
    }
    if (wordCount(s.quote) > MAX_QUOTE_WORDS)
      ctx.addIssue({ code: "custom", path: ["quote"], message: `cita de más de ${MAX_QUOTE_WORDS} palabras` });
    if (s.status === "pendiente" && !s.note?.trim())
      ctx.addIssue({ code: "custom", path: ["note"], message: "si está pendiente, la nota dice qué se buscó" });
    if (s.status === "contested") {
      // «Contested» no es una opinión del codificador: es el resultado de una
      // revisión ciega que discrepó en más de un punto. Sin revisor no lo es.
      if (!s.reviewer)
        ctx.addIssue({ code: "custom", path: ["reviewer"], message: "contested exige la posición del revisor" });
      else if (Math.abs(s.reviewer.position - s.position) <= 1)
        ctx.addIssue({ code: "custom", path: ["reviewer"], message: "contested exige desacuerdo > 1" });
    }
    if (s.status === "verificado" && s.reviewer && Math.abs(s.reviewer.position - s.position) > 1)
      ctx.addIssue({ code: "custom", path: ["status"], message: "desacuerdo > 1 con el revisor: debe ser contested" });
  });

const voteEvidenceSchema = z
  .object({
    kind: z.literal("votacion"),
    legislature: z.enum(["XIV", "XV"]),
    session: z.number().int().positive(),
    date: isoDate,
    number: z.number().int().positive(),
    title: nonEmpty,
    groupVote: z.enum(["si", "no", "abstencion", "ausente"]),
    url,
  })
  .superRefine((v, ctx) => {
    const err = voteUrlMatches(v);
    if (err) ctx.addIssue({ code: "custom", path: ["url"], message: err });
  });

const evidenceSchema = z.union([
  voteEvidenceSchema,
  z.object({
    kind: z.literal("boe"),
    reference: z.string().regex(/^BOE-[A-Z]-\d{4}-\d+$/, "referencia BOE tipo BOE-A-2023-12345"),
    title: nonEmpty,
    url,
    date: isoDate,
    role: z.enum(["gobierno", "apoyo"]),
  }),
  z.object({
    kind: z.literal("otro-parlamento"),
    chamber: nonEmpty,
    title: nonEmpty,
    date: isoDate,
    vote: z.enum(["si", "no", "abstencion"]),
    url,
  }),
]);

export const recordStanceSchema: z.ZodType<RecordStance> = z
  .object({
    position: positionSchema,
    status: statusSchema,
    confidence: confidenceSchema,
    evidence: z.array(evidenceSchema),
    note: z.string().optional(),
  })
  .superRefine((s, ctx) => {
    if (scores(s.status)) {
      if (s.evidence.length === 0 || !s.evidence[0].url)
        ctx.addIssue({ code: "custom", path: ["evidence"], message: "evidence[0].url obligatoria si puntúa" });
      // La ausencia no es posición (AFINIDAD-DATOS.md): si todo lo que hay son
      // ausencias, no hay dato que puntuar.
      if (s.evidence.length > 0 && s.evidence.every((e) => e.kind === "votacion" && e.groupVote === "ausente"))
        ctx.addIssue({ code: "custom", path: ["evidence"], message: "solo ausencias: no hay dato" });
    }
    if (s.status === "pendiente" && !s.note?.trim())
      ctx.addIssue({ code: "custom", path: ["note"], message: "si está pendiente, la nota dice qué se buscó" });
  });

export const anchorSchema = z
  .object({
    legislature: z.enum(["XIV", "XV"]),
    session: z.number().int().positive(),
    date: isoDate,
    number: z.number().int().positive(),
    title: nonEmpty,
    url,
    agreeMeans: z.enum(["si", "no"]),
  })
  .superRefine((a, ctx) => {
    const err = voteUrlMatches(a);
    if (err) ctx.addIssue({ code: "custom", path: ["url"], message: err });
  });

export const questionSchema: z.ZodType<Question> = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id en minúsculas, dígitos y guiones"),
  order: z.number().int().nonnegative(),
  topic: nonEmpty,
  text: z.object({
    es: nonEmpty,
    ca: z.string().optional(),
    gl: z.string().optional(),
    eu: z.string().optional(),
  }),
  label: z.string().min(1).max(48).optional(),
  rationale: nonEmpty,
  i18n: dataI18n(["label", "rationale"] as const),
  // Cada ítem corresponde a una votación ancla real; si no, no entra.
  anchors: z.array(anchorSchema).min(1, "cada pregunta necesita una votación ancla"),
});

export const partySchema: z.ZodType<Party> = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,32}$/, "id en minúsculas, dígitos y guiones"),
  name: nonEmpty,
  short: nonEmpty,
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "color #rrggbb"),
  initials: nonEmpty,
  scope: z.enum(["estatal", "autonomica"]),
  regions: z.array(z.string().regex(INE_REGION, "código INE de CCAA")).optional(),
  bloc: z.enum(["izquierda", "derecha", "nacionalista", "otro"]),
  parliamentary: z.boolean(),
  inclusionReason: nonEmpty,
  inclusionSource: sourceSchema,
  congressGroup: z.string().optional(),
  congressGroupByLegislature: z
    .object({ XIV: nonEmpty.optional(), XV: nonEmpty.optional() })
    .strict()
    .optional(),
  inGovernment: z
    .array(z.object({ from: isoDate, to: isoDate.optional(), level: z.literal("estatal") }))
    .optional(),
  status: z.enum(["confirmada", "por-confirmar"]),
  recordNote: z.string().optional(),
  i18n: dataI18n(["inclusionReason", "recordNote"] as const),
});

export const quoteSchema: z.ZodType<Quote> = z
  .object({
    partyId: nonEmpty,
    questionId: nonEmpty,
    speaker: nonEmpty,
    role: z.string().optional(),
    date: isoDate,
    text: nonEmpty,
    source: z.object({
      url,
      title: nonEmpty,
      date: isoDate.optional(),
      year: year.optional(),
      page: z.string().optional(),
      archiveUrl: url.optional(),
      kind: z.enum(["diario-sesiones", "video-congreso", "partido", "prensa"]),
    }),
    videoUrl: url.optional(),
    videoStart: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/, "marca de tiempo hh:mm:ss").optional(),
    contrastsWithRecord: z.boolean().optional(),
    i18n: dataI18n(["role"] as const),
  })
  .superRefine((q, ctx) => {
    if (wordCount(q.text) > MAX_HEMEROTECA_WORDS)
      ctx.addIssue({ code: "custom", path: ["text"], message: `cita de más de ${MAX_HEMEROTECA_WORDS} palabras` });
  });

/**
 * Pruebas de «lo que hicieron»: las mismas que en Hechos (con la misma
 * validación de URL de votación), el estado de una iniciativa (prueba primaria
 * de un «no-hecho») y un dato estadístico oficial con su organismo y valor.
 */
const didEvidenceSchema = z.union([
  evidenceSchema,
  z.object({
    kind: z.literal("iniciativa"),
    title: nonEmpty,
    url,
    status: nonEmpty,
    date: isoDate,
  }),
  // Dato estadístico oficial (INE, ministerios, Tribunal de Cuentas, AIReF…).
  // Solo aquí: no es una votación y nunca puntúa.
  z.object({
    kind: z.literal("dato-oficial"),
    title: nonEmpty,
    url,
    date: isoDate,
    publisher: nonEmpty,
    value: nonEmpty,
  }),
]);

/** Identificador de una entrada de «Dijeron vs. hicieron»: va en la URL (`#dvh-<id>`). */
export const SAID_VS_DID_ID = /^[a-z0-9][a-z0-9-]{0,79}$/;

/**
 * «Dijeron vs. hicieron»: un compromiso público y lo que el partido hizo
 * después. No puntúa, pero se enseña con una etiqueta (cumple / contradice /
 * parcial), así que pide lo mismo que lo que sí puntúa: cita literal corta con
 * fuente abierta y un hecho con prueba enlazada. Las votaciones del Congreso se
 * validan con el mismo patrón que las de Hechos (`voteEvidenceSchema`): una URL
 * que apunta a otra votación sería una acusación sin base.
 */
export const saidVsDidSchema: z.ZodType<SaidVsDid> = z
  .object({
    id: z.string().regex(SAID_VS_DID_ID, "id en minúsculas, dígitos y guiones (máx. 80)"),
    partyId: nonEmpty,
    questionId: nonEmpty.optional(),
    topic: nonEmpty,
    said: z.object({
      speaker: nonEmpty,
      role: z.string().optional(),
      date: isoDate,
      text: nonEmpty,
      source: z.object({
        url,
        title: nonEmpty,
        date: isoDate.optional(),
        year: year.optional(),
        page: z.string().optional(),
        archiveUrl: url.optional(),
        kind: z.enum(["diario-sesiones", "video-congreso", "partido", "gobierno", "programa", "prensa"]),
      }),
      videoUrl: url.optional(),
      videoStart: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/, "marca de tiempo hh:mm:ss").optional(),
    }),
    did: z.object({
      date: isoDate,
      summary: nonEmpty,
      // Sin prueba enlazada no hay «hicieron»: hay una opinión sobre lo que hicieron.
      evidence: z.array(didEvidenceSchema).min(1, "al menos una prueba enlazada del hecho"),
    }),
    verdict: z.enum(["cumple", "contradice", "parcial", "no-hecho"]),
    note: z.string().optional(),
    i18n: dataI18n(["topic", "summary", "note", "role"] as const),
  })
  .superRefine((e, ctx) => {
    if (wordCount(e.said.text) > MAX_HEMEROTECA_WORDS)
      ctx.addIssue({ code: "custom", path: ["said", "text"], message: `cita de más de ${MAX_HEMEROTECA_WORDS} palabras` });
    // Lo que se hizo tiene que ser posterior (o del mismo día) a lo que se dijo;
    // si no, no es un compromiso que se cumpla o se incumpla. Las fechas ISO se
    // comparan bien como texto.
    if (e.said.date > e.did.date)
      ctx.addIssue({ code: "custom", path: ["did", "date"], message: "lo que hicieron es anterior a lo que dijeron" });
    // «Parcial» sin explicar qué parte es una etiqueta vacía: el matiz va en la nota.
    if (e.verdict === "parcial" && !e.note?.trim())
      ctx.addIssue({ code: "custom", path: ["note"], message: "«parcial» exige una nota con el matiz" });
    // «No lo hicieron» solo vale si podían hacerlo (gobernaban o lo firmaron en
    // un acuerdo de coalición o investidura); si no, sería culpar a un partido
    // de no hacer lo que no estaba en su mano. La nota dice por qué podía.
    if (e.verdict === "no-hecho" && !e.note?.trim())
      ctx.addIssue({
        code: "custom",
        path: ["note"],
        message: "«no-hecho» exige una nota que explique por qué el partido podía hacerlo",
      });
  });

export const deputyAttributionSchema: z.ZodType<DeputyAttribution> = z.object({
  legislature: z.enum(["XIV", "XV"]),
  deputy: nonEmpty,
  partyId: nonEmpty,
  group: nonEmpty,
  from: isoDate,
  to: isoDate.optional(),
  source: sourceSchema,
});

export const stanceSchema: z.ZodType<Stance> = z.object({
  partyId: nonEmpty,
  questionId: nonEmpty,
  programme: programmeStanceSchema.nullable(),
  record: recordStanceSchema.nullable(),
});

/**
 * El dataset completo, con las comprobaciones que cruzan ficheros: ids únicos,
 * referencias existentes y una sola celda por partido×pregunta. Las celdas
 * duplicadas son peligrosas porque el motor usaría una y la tabla de datos
 * abiertos podría enseñar la otra.
 */
export const datasetSchema: z.ZodType<Dataset> = z
  .object({
    version: nonEmpty,
    parties: z.array(partySchema),
    questions: z.array(questionSchema),
    stances: z.array(stanceSchema),
    quotes: z.array(quoteSchema).optional(),
    saidVsDid: z.array(saidVsDidSchema).optional(),
    deputies: z.array(deputyAttributionSchema).optional(),
  })
  .superRefine((d, ctx) => {
    const dup = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i);
    for (const id of dup(d.parties.map((p) => p.id)))
      ctx.addIssue({ code: "custom", path: ["parties"], message: `partido duplicado: ${id}` });
    for (const id of dup(d.questions.map((q) => q.id)))
      ctx.addIssue({ code: "custom", path: ["questions"], message: `pregunta duplicada: ${id}` });
    for (const o of dup(d.questions.map((q) => String(q.order))))
      ctx.addIssue({ code: "custom", path: ["questions"], message: `orden duplicado: ${o}` });

    const parties = new Set(d.parties.map((p) => p.id));
    const questions = new Set(d.questions.map((q) => q.id));
    const seen = new Set<string>();
    d.stances.forEach((s, i) => {
      if (!parties.has(s.partyId))
        ctx.addIssue({ code: "custom", path: ["stances", i, "partyId"], message: `partido desconocido: ${s.partyId}` });
      if (!questions.has(s.questionId))
        ctx.addIssue({ code: "custom", path: ["stances", i, "questionId"], message: `pregunta desconocida: ${s.questionId}` });
      const key = `${s.partyId}|${s.questionId}`;
      if (seen.has(key))
        ctx.addIssue({ code: "custom", path: ["stances", i], message: `celda duplicada: ${key}` });
      seen.add(key);
    });
    d.quotes?.forEach((q, i) => {
      if (!parties.has(q.partyId))
        ctx.addIssue({ code: "custom", path: ["quotes", i, "partyId"], message: `partido desconocido: ${q.partyId}` });
      if (!questions.has(q.questionId))
        ctx.addIssue({ code: "custom", path: ["quotes", i, "questionId"], message: `pregunta desconocida: ${q.questionId}` });
    });
    for (const id of dup((d.saidVsDid ?? []).map((e) => e.id)))
      ctx.addIssue({ code: "custom", path: ["saidVsDid"], message: `entrada de «dijeron vs. hicieron» duplicada: ${id}` });
    d.saidVsDid?.forEach((e, i) => {
      if (!parties.has(e.partyId))
        ctx.addIssue({ code: "custom", path: ["saidVsDid", i, "partyId"], message: `partido desconocido: ${e.partyId}` });
      if (e.questionId !== undefined && !questions.has(e.questionId))
        ctx.addIssue({ code: "custom", path: ["saidVsDid", i, "questionId"], message: `pregunta desconocida: ${e.questionId}` });
    });
    d.deputies?.forEach((a, i) => {
      if (!parties.has(a.partyId))
        ctx.addIssue({ code: "custom", path: ["deputies", i, "partyId"], message: `partido desconocido: ${a.partyId}` });
    });
  });

/** Valida y devuelve los problemas en texto legible, uno por línea. */
export function validateDataset(d: unknown): { ok: true; data: Dataset } | { ok: false; errors: string[] } {
  const r = datasetSchema.safeParse(d);
  if (r.success) return { ok: true, data: r.data };
  return { ok: false, errors: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) };
}
