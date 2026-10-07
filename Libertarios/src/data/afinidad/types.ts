/**
 * Contrato de datos de «¿A quién votar? Objetivamente».
 *
 * Es la única interfaz entre los paquetes de trabajo (ver
 * `docs/AFINIDAD-PLAN.md` §2): quien escribe datos, quien los valida y quien
 * los pinta programan contra estos tipos y nada más. Por eso los campos del
 * plan no se renombran ni se quitan; lo que hay al final son tipos auxiliares
 * derivados, que no añaden información nueva al dataset.
 *
 * Las reglas que los tipos no pueden expresar (cita obligatoria si
 * `verificado`, patrón de URL de congreso.es…) viven en
 * `src/lib/afinidad/schema.ts`. Las reglas de codificación —qué es un +2, cómo
 * se traduce un voto— están en `docs/AFINIDAD-DATOS.md`.
 *
 * Incluye la actualización del 2026-10-06 del plan: escala de usuario de 4
 * puntos sin punto medio, `Party.status`, `Party.recordNote`, hemeroteca
 * (`Quote`) y atribución de voto por diputado para el Grupo Mixto.
 */

export type Scope = "estatal" | "autonomica";
export type Lang = "es" | "ca" | "gl" | "eu";
/** Lenguas a las que se traducen los textos del dataset (el castellano es la fuente). */
export type TranslatedLang = Exclude<Lang, "es">;
/**
 * Traducciones opcionales de los campos de texto de una entrada. Lo que falte
 * cae al castellano (`src/lib/afinidad/localize.ts`). Nunca se traducen citas
 * literales (`quote`, `said.text`, `Quote.text`): se publican tal como se
 * dijeron o escribieron.
 */
export type DataI18n<T> = Partial<Record<TranslatedLang, Partial<T>>>;

export interface Party {
  id: string;
  name: string;
  short: string;
  color: string;
  initials: string;
  scope: Scope;
  /** Códigos INE de CCAA donde se presentan (solo partidos regionales). */
  regions?: string[];
  /** Solo para «tu sorpresa»; el criterio se publica en la metodología. */
  bloc: "izquierda" | "derecha" | "nacionalista" | "otro";
  /** Escaño en el Congreso XV. */
  parliamentary: boolean;
  /** Qué rama del criterio de inclusión cumple, con fuente. */
  inclusionReason: string;
  inclusionSource: Source;
  /** Nombre del grupo en el JSON de congreso.es. */
  congressGroup?: string;
  /**
   * Grupo en una legislatura concreta cuando no es `congressGroup` (p. ej.
   * Podemos y Sumar votaban en la XIV dentro de «GCUP-EC-GC»). Opcional: si
   * falta, vale `congressGroup`. Si el grupo es el Mixto/Plural, el voto se
   * atribuye solo por diputado (`deputies.ts`).
   */
  congressGroupByLegislature?: Partial<Record<"XIV" | "XV", string>>;
  inGovernment?: { from: string; to?: string; level: "estatal" }[];
  /**
   * «por-confirmar» para coaliciones aún no registradas ante la Junta
   * Electoral; la UI lo indica y el resultado no lo oculta.
   */
  status: "confirmada" | "por-confirmar";
  /**
   * Cómo se atribuye su historial cuando no es el de un grupo propio (p. ej.
   * «votaciones del grupo GSUMAR» o «voto por diputado en el Mixto»). Se
   * muestra tal cual junto a la barra de Hechos.
   */
  recordNote?: string;
  /** Traducciones de `inclusionReason` y `recordNote`. */
  i18n?: DataI18n<{ inclusionReason: string; recordNote: string }>;
}

export interface Question {
  id: string;
  order: number;
  topic: string;
  text: Record<"es", string> & Partial<Record<Exclude<Lang, "es">, string>>;
  /**
   * Nombre corto de la medida (≤ 6 palabras, p. ej. «impuesto a patrimonios
   * >10 M€»), para la rejilla del resultado y «Tu sorpresa». Solo castellano:
   * en las demás lenguas se usa el tema. Describe la medida, no la juzga.
   */
  label?: string;
  /** Qué mide; se muestra en la revisión, nunca antes de responder. */
  rationale: string;
  /** Traducciones de `label` y `rationale` (el enunciado ya va en `text`). */
  i18n?: DataI18n<{ label: string; rationale: string }>;
  anchors: Array<{
    legislature: "XIV" | "XV";
    session: number;
    date: string;
    number: number;
    title: string;
    url: string;
    agreeMeans: "si" | "no";
  }>;
}

export type Position = -2 | -1 | 0 | 1 | 2;
export type Confidence = "alta" | "media" | "baja";
export type Status = "verificado" | "pendiente" | "sin-posicion" | "contested";

export interface Source {
  url: string;
  title: string;
  /** AAAA-MM-DD. En celdas que puntúan y en citas se exige `date` o `year`. */
  date?: string;
  /** Año del documento (p. ej. programa 2023) cuando no hay fecha exacta. */
  year?: number;
  page?: string;
  archiveUrl?: string;
}

export interface ProgrammeStance {
  position: Position;
  status: Status;
  confidence: Confidence;
  /** Literal, ≤ 60 palabras; obligatoria si verificado. */
  quote: string;
  /** Programa oficial, con página. */
  source: Source;
  /** Si pendiente: qué se buscó. */
  note?: string;
  reviewer?: { position: Position; agrees: boolean };
}

export interface RecordStance {
  position: Position;
  status: Status;
  confidence: Confidence;
  evidence: Array<
    | {
        kind: "votacion";
        legislature: "XIV" | "XV";
        session: number;
        date: string;
        number: number;
        title: string;
        groupVote: "si" | "no" | "abstencion" | "ausente";
        url: string;
      }
    | {
        kind: "boe";
        reference: string;
        title: string;
        url: string;
        date: string;
        role: "gobierno" | "apoyo";
      }
    | {
        kind: "otro-parlamento";
        chamber: string;
        title: string;
        date: string;
        vote: "si" | "no" | "abstencion";
        url: string;
      }
  >;
  note?: string;
}

export interface Stance {
  partyId: string;
  questionId: string;
  programme: ProgrammeStance | null;
  record: RecordStance | null;
}

/**
 * Hemeroteca: lo que dijo el partido o su portavoz, con fecha y fuente. No
 * puntúa nunca; se enseña junto a lo que votaron. Fuente preferida: Diario de
 * Sesiones del debate de la votación ancla; prensa solo como último recurso.
 */
export interface Quote {
  partyId: string;
  questionId: string;
  speaker: string;
  role?: string;
  date: string;
  /** Literal, ≤ 50 palabras. */
  text: string;
  source: Source & { kind: "diario-sesiones" | "video-congreso" | "partido" | "prensa" };
  videoUrl?: string;
  /** Marca de tiempo dentro del vídeo, p. ej. «01:23:45». */
  videoStart?: string;
  contrastsWithRecord?: boolean;
  /** Traducción de `role` (la cita `text` no se traduce nunca). */
  i18n?: DataI18n<{ role: string }>;
}

/**
 * Partidos sin código de grupo propio (Podemos, BNG, CC, UPN, Compromís…):
 * su voto se atribuye por diputado, y cada atribución lleva su fuente.
 */
export interface DeputyAttribution {
  legislature: "XIV" | "XV";
  /** Nombre como aparece en el JSON de votaciones de congreso.es. */
  deputy: string;
  partyId: string;
  /** Grupo parlamentario en el que se sienta (p. ej. «GMx»). */
  group: string;
  /** Intervalo en que la atribución es válida (cambios de grupo). */
  from: string;
  to?: string;
  source: Source;
}

export const DATASET_VERSION = "2026.10.1";

// ─── Tipos auxiliares (derivados; no amplían el contrato del plan) ─────────

export type Bloc = Party["bloc"];
export type Anchor = Question["anchors"][number];
export type Evidence = RecordStance["evidence"][number];
export type VoteEvidence = Extract<Evidence, { kind: "votacion" }>;

/** Las dos lentes se calculan y se muestran por separado, nunca mezcladas. */
export type Lens = "programme" | "record";

/**
 * Escala de la persona: 4 puntos sin punto medio (actualización 2026-10-06).
 * El 0 queda solo para partidos (abstención o ambivalencia textual).
 */
export type UserPosition = -2 | -1 | 1 | 2;
export const USER_POSITIONS: readonly UserPosition[] = [-2, -1, 1, 2];

/** Una respuesta: valor y si la persona marcó «Esto me importa». */
export interface AnswerValue {
  value: UserPosition;
  important: boolean;
}
/** «skip» y la ausencia de clave significan lo mismo: no cuenta. */
export type Answer = AnswerValue | "skip";
export type Answers = Record<string, Answer>;

/** Contexto opcional declarado al inicio. Ausente = «Prefiero no decirlo». */
export interface AnswerContext {
  /** Código INE de la comunidad autónoma, dos dígitos («01»–«19»). */
  region?: string;
  /** Id del partido al que suele votar. */
  usualVote?: string;
}

/** Lo que `src/data/afinidad/index.ts` une y exporta. */
/**
 * «Dijeron vs. hicieron»: un compromiso público explícito y lo que el partido
 * hizo después. Recoge tanto promesas cumplidas como incumplidas, con el mismo
 * criterio para todos los partidos: si solo se listaran las incumplidas, la
 * selección misma sería un sesgo. No puntúa.
 */
/**
 * Estado de una iniciativa (ficha de congreso.es u otro registro oficial):
 * «caducada», «rechazada», «en tramitación»… Es la prueba primaria de un
 * «no-hecho». Vive en una unión propia de «Dijeron vs. hicieron» y NO en
 * `RecordStance.evidence`: una iniciativa que no llegó a votarse no dice qué
 * votó nadie, así que no puede puntuar en Hechos. Así los consumidores de
 * `Evidence` (motor, fichas, validador) no cambian.
 */
export interface InitiativeEvidence {
  kind: "iniciativa";
  title: string;
  url: string;
  /** Estado tal como lo da la fuente, p. ej. «Caducado». */
  status: string;
  /** Fecha del estado (caducidad, rechazo, fin de plazo). */
  date: string;
}

/**
 * Dato estadístico oficial (INE, Ministerio de Vivienda, memorias del BOE,
 * Tribunal de Cuentas, AIReF…) que muestra el resultado de un hecho: p. ej.
 * cuántas viviendas se construyeron frente a las prometidas. Solo existe en
 * «Dijeron vs. hicieron» y NUNCA puntúa: no dice qué votó nadie, así que no
 * está en `Evidence` (Hechos) ni lo puede leer el motor.
 */
export interface OfficialDataEvidence {
  kind: "dato-oficial";
  /** Nombre de la serie, tabla o informe. */
  title: string;
  url: string;
  /** Fecha de publicación o del periodo del dato (AAAA-MM-DD). */
  date: string;
  /** Organismo que lo publica, p. ej. «INE». */
  publisher: string;
  /** El dato tal como lo da la fuente, con su unidad. */
  value: string;
  /**
   * Quién mide (regla de independencia de la fuente, 2026-10-07; ver
   * `docs/AFINIDAD-DATOS.md` §5 bis). Se clasifica igual para todos los
   * partidos que han gobernado:
   * - `independiente`: organismo que no depende del Gobierno que se evalúa —
   *   AIReF, Tribunal de Cuentas, Banco de España, Eurostat, OCDE, Comisión
   *   Europea o Consejo de la UE, FMI, tribunales, evaluaciones oficiales de
   *   universidades—.
   * - `estadistica-oficial`: serie estadística o registro oficial con
   *   metodología publicada —INE, series de la IGAE, estadísticas de la
   *   Seguridad Social o de un ministerio (no sus notas de prensa), texto
   *   consolidado del BOE, créditos de una ley de presupuestos—.
   * - `gobierno`: lo que el Gobierno dice de sí mismo —notas de prensa,
   *   páginas web de un ministerio, preámbulos, informes de La Moncloa,
   *   autoevaluaciones—. Se enseña, pero con etiqueta, y un «cumple» no puede
   *   apoyarse solo en esto.
   */
  sourceType: OfficialSourceType;
}

/** Quién publica un dato oficial: ver `OfficialDataEvidence.sourceType`. */
export type OfficialSourceType = "independiente" | "estadistica-oficial" | "gobierno";

/** Pruebas de «lo que hicieron»: las de Hechos, el estado de una iniciativa o un dato oficial. */
export type DidEvidence = Evidence | InitiativeEvidence | OfficialDataEvidence;

export interface SaidVsDid {
  id: string;
  partyId: string;
  /** Pregunta relacionada, si la hay; puede ser un asunto fuera de las 15. */
  questionId?: string;
  topic: string;
  said: {
    speaker: string;
    role?: string;
    date: string;
    /** Literal, ≤ 50 palabras. */
    text: string;
    source: Source & { kind: "diario-sesiones" | "video-congreso" | "partido" | "gobierno" | "programa" | "prensa" };
    videoUrl?: string;
    videoStart?: string;
  };
  did: {
    date: string;
    /** Descripción factual del hecho, sin adjetivos. */
    summary: string;
    evidence: DidEvidence[];
  };
  /**
   * «cumple»: hizo lo que dijo; «contradice»: hizo lo contrario; «parcial»:
   * matices documentados en `note`; «no-hecho»: no lo hizo, aunque podía.
   *
   * «no-hecho» existe porque sin él solo cuentan como incumplimiento los actos
   * contrarios, y eso castiga a quien gobierna frente a quien promete y no
   * ejecuta. Solo vale si el partido tenía el poder de hacerlo (gobernaba, o
   * lo firmó en un acuerdo de coalición o investidura) y hay prueba primaria de
   * que no ocurrió: ficha de la iniciativa en congreso.es caducada o rechazada,
   * plazo vencido del propio acuerdo, o fin de legislatura sin norma en el BOE.
   */
  verdict: "cumple" | "contradice" | "parcial" | "no-hecho";
  note?: string;
  /**
   * Traducciones de `topic`, `did.summary`, `note` y `said.role`. La cita
   * `said.text` no se traduce nunca.
   */
  i18n?: DataI18n<{ topic: string; summary: string; note: string; role: string }>;
}

export interface Dataset {
  version: string;
  parties: Party[];
  questions: Question[];
  stances: Stance[];
  /** Hemeroteca; opcional y sin efecto en el cálculo. */
  quotes?: Quote[];
  /** «Dijeron vs. hicieron»; opcional y sin efecto en el cálculo. */
  saidVsDid?: SaidVsDid[];
  /** Tabla diputado→partido para el voto del Grupo Mixto. */
  deputies?: DeputyAttribution[];
}
