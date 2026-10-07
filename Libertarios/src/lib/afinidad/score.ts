import { USER_POSITIONS } from "@/data/afinidad/types";
import type {
  AnswerValue,
  Answers,
  Bloc,
  Dataset,
  Lens,
  Party,
  ProgrammeStance,
  Question,
  RecordStance,
  Stance,
  UserPosition,
} from "@/data/afinidad/types";

/**
 * Motor de afinidad (plan §3). Funciones puras: sin React, sin red, sin
 * almacenamiento. Lo que calcula la página de resultados es exactamente lo que
 * se publica en la metodología, y los tests lo ejercitan sin navegador.
 *
 * Tres principios que el código no debe perder:
 *
 * 1. **Programa y Hechos nunca se mezclan.** Cada lente da su propio ranking.
 *    Promediarlas escondería justo lo que el usuario necesita ver: que un
 *    partido dice una cosa y vota otra.
 * 2. **Un hueco no es un cero.** Una celda sin dato verificado no entra en el
 *    cálculo; lo que baja es la cobertura, no la afinidad. Con menos de
 *    `MIN_LENS_ITEMS` respuestas con dato, el partido se marca «datos
 *    insuficientes»; con más, se enseña la cifra y «basado en X de Y».
 * 3. **Saltar no es ser moderado.** «No sé» no cuenta: no hay punto medio en
 *    la escala de la persona (4 puntos), así que no se puede confundir un
 *    salto con una respuesta tibia. El 0 existe solo en los partidos.
 */

/**
 * Preguntas respondidas con dato del partido que hacen falta para enseñar su
 * cifra en una lente (decisión del dueño, 2026-10-07). Sustituye al umbral del
 * 70 % de cobertura, que escondía a partidos cuyo programa de 2023 calla en
 * muchas preguntas (el PSOE salía «datos insuficientes» en programa). La
 * cobertura se sigue calculando y se enseña siempre junto a cada barra
 * («basado en X de Y respuestas»). Con menos de 5, «datos insuficientes»: así
 * 3 coincidencias perfectas no pueden ganar a 15 respuestas al 90 %.
 */
export const MIN_LENS_ITEMS = 5;
/**
 * Encogimiento hacia el neutro (decisión del dueño, 2026-10-07). La afinidad
 * de una lente es `(Σ w·acuerdo + K·0,5) / (Σ w + K)`: como si a las
 * respuestas reales se sumaran K respuestas «neutras» a 0,5. Con pocas
 * preguntas la cifra se acerca a 0,5; con muchas, apenas cambia. Sin esto, un
 * partido puntuado sobre 5 preguntas ganaba a demasiada gente solo por azar
 * (más varianza que uno con 15). Con K = 3, 5 de 5 coincidencias perfectas
 * dan un 81 % y 15 de 15, un 92 %. Es la estimación honesta y es la que se
 * enseña.
 */
export const SHRINK_K = 3;
/** Valor hacia el que se encoge: ni acuerdo ni desacuerdo. */
export const SHRINK_PRIOR = 0.5;

/** Media ponderada encogida hacia `SHRINK_PRIOR` con `k` respuestas ficticias. */
export function shrunkMean(weightedSum: number, weightSum: number, k: number = SHRINK_K): number {
  return (weightedSum + k * SHRINK_PRIOR) / (weightSum + k);
}
/**
 * Respuestas mínimas para dar resultado. Con menos, cualquier ranking es ruido.
 * Si el dataset tiene menos preguntas (el fixture), se exige responderlas todas.
 */
export const MIN_ANSWERS = 8;
/** Peso de una pregunta marcada «Esto me importa». */
export const IMPORTANT_WEIGHT = 2;
/** Distancia máxima entre dos posiciones de −2 a +2. */
export const MAX_DISTANCE = 4;
/**
 * Factor de lado del acuerdo (ver `agreement`). Mismo lado: cuenta toda la
 * cercanía en la escala. Partido en 0 explícito (abstención, ambivalencia):
 * la mitad, porque no está de tu lado aunque tampoco enfrente. Lado contrario:
 * nada, sea cual sea la intensidad.
 */
export const SAME_SIDE_FACTOR = 1;
export const NEUTRAL_PARTY_FACTOR = 0.5;
export const OPPOSITE_SIDE_FACTOR = 0;
/** Posiciones de partido de la tabla de acuerdo (la metodología la genera con ellas). */
export const PARTY_POSITIONS = [-2, -1, 0, 1, 2] as const;
/**
 * Distancia mínima para hablar de «tu partido te contradice». Con 1 punto
 * (de acuerdo frente a muy de acuerdo) no hay contradicción, hay matiz.
 */
export const MIN_CONTRADICTION_DISTANCE = 2;
/**
 * Brecha mínima programa–hechos para listar un ítem como «prometen una cosa y
 * votan otra». Además se exige que el signo cambie (a favor → abstención o en
 * contra), para que un +2 → +1 no se presente como incumplimiento.
 */
export const PROMISE_GAP_THRESHOLD = 2;

const EPS = 1e-9;

// ─── Celdas ────────────────────────────────────────────────────────────────

/**
 * Posición con la que puntúa una celda, o `null` si no puntúa.
 *
 * Solo `verificado` y `contested` entran. `contested` puntúa con la media del
 * codificador y el revisor ciego (por eso puede ser no entera). En la lente de
 * hechos no hay revisor en el contrato: si WP4 marca `contested`, la posición
 * guardada ya debe ser la media redondeada que se decida, y se usa tal cual.
 */
export function effectivePosition(cell: ProgrammeStance | RecordStance | null | undefined): number | null {
  if (!cell) return null;
  if (cell.status === "verificado") return cell.position;
  if (cell.status === "contested") {
    const reviewer = "reviewer" in cell ? cell.reviewer : undefined;
    return reviewer ? (cell.position + reviewer.position) / 2 : cell.position;
  }
  return null;
}

type Index = {
  cells: Map<string, Stance>;
  questions: Question[];
  questionById: Map<string, Question>;
  partyById: Map<string, Party>;
};

// El dataset es estático; indexarlo una vez por objeto evita recorrer todas las
// celdas por cada partido y pregunta en cada render.
const indexCache = new WeakMap<Dataset, Index>();

function indexOf(dataset: Dataset): Index {
  const cached = indexCache.get(dataset);
  if (cached) return cached;
  const cells = new Map<string, Stance>();
  for (const s of dataset.stances) cells.set(`${s.partyId}|${s.questionId}`, s);
  const questions = [...dataset.questions].sort((a, b) => a.order - b.order);
  const idx: Index = {
    cells,
    questions,
    questionById: new Map(questions.map((q) => [q.id, q])),
    partyById: new Map(dataset.parties.map((p) => [p.id, p])),
  };
  indexCache.set(dataset, idx);
  return idx;
}

/** Posición que puntúa de un partido en una pregunta y lente, o `null`. */
export function cellPosition(dataset: Dataset, partyId: string, questionId: string, lens: Lens): number | null {
  const s = indexOf(dataset).cells.get(`${partyId}|${questionId}`);
  return s ? effectivePosition(s[lens]) : null;
}

/** La celda tal cual, para enseñar la fuente. */
export function getStance(dataset: Dataset, partyId: string, questionId: string): Stance | undefined {
  return indexOf(dataset).cells.get(`${partyId}|${questionId}`);
}

/**
 * Acuerdo direccional de 0 a 1 entre una respuesta y una posición:
 *
 *   acuerdo = (1 − |u − p| / 4) × factor de lado
 *
 * con factor 1 si están del mismo lado, ½ si el partido está en 0 y 0 si están
 * en lados contrarios. Tabla (filas: respuesta; columnas: partido −2…+2):
 *
 *   u = +1 → 0 · 0 · 0,375 · 1 · 0,75
 *   u = +2 → 0 · 0 · 0,25 · 0,75 · 1
 *
 * Historia (AFINIDAD-CAMBIOS.md):
 * - `1 − |u − p| / 4` a secas daba al centro el 72 % de las victorias: un
 *   partido con todo a 0 quedaba a media distancia de cualquiera.
 * - La versión 2026.10.0–1 (mismo signo `1 − |u − p| / 8`, contrario 0, partido
 *   en 0 → 0,5 siempre) arregló eso, pero dejó la intensidad casi sin efecto:
 *   «a favor» frente a «muy a favor» costaba 12,5 puntos y una abstención
 *   valía lo mismo para quien está «muy a favor» que para quien está «a favor».
 *   Aquí cuesta 25 puntos, y la abstención vale 0,375 frente a ±1 y 0,25 frente
 *   a ±2. Que el 0 dependa de la intensidad es además lo que impide que un
 *   partido que no se moja gane a los usuarios moderados (simulación en
 *   AFINIDAD-CAMBIOS.md, versión 2026.10.2).
 * - Lado contrario = 0 también frente a ±1: graduarlo (p. ej. 0,25 para +1
 *   frente a −1) hacía que el votante opuesto de un partido moderado tuviera a
 *   otro partido por detrás y daba más victorias a un partido ficticio «±1 en
 *   todo»; se simuló y se descartó.
 *
 * Simétrica al cambiar de signo respuesta y posición. Admite posiciones no
 * enteras (medias de `contested`).
 */
export function agreement(answer: number, position: number): number {
  const side =
    Math.abs(position) < EPS
      ? NEUTRAL_PARTY_FACTOR
      : Math.sign(answer) === Math.sign(position)
        ? SAME_SIDE_FACTOR
        : OPPOSITE_SIDE_FACTOR;
  return Math.max(0, 1 - Math.abs(answer - position) / MAX_DISTANCE) * side;
}

// Solo valores de la escala de 4 puntos; cualquier otro (un 0 de un formato
// antiguo, un número fuera de rango) se trata como no respondido.
const isAnswered = (a: unknown): a is AnswerValue =>
  typeof a === "object" &&
  a !== null &&
  (USER_POSITIONS as readonly number[]).includes((a as AnswerValue).value);

/** Preguntas respondidas (no saltadas) que existen en el dataset, en orden. */
export function answeredQuestions(answers: Answers, dataset: Dataset): Question[] {
  return indexOf(dataset).questions.filter((q) => isAnswered(answers[q.id]));
}

// ─── Afinidad ──────────────────────────────────────────────────────────────

export interface QuestionMatch {
  questionId: string;
  answer: UserPosition;
  important: boolean;
  /**
   * Posición con la que puntúa la celda (media si contested). En el modo
   * combinado, la media de las lentes que entran en la cifra.
   */
  position: number;
  agreement: number;
  weight: number;
}

export interface PartyAffinity {
  partyId: string;
  /** 0–1. `null` si no hay ni una celda comparable: nunca se pinta como 0. */
  score: number | null;
  /** Fracción de tus respuestas con dato del partido en esta lente. */
  coverage: number;
  /** Respuestas con dato del partido en esta lente (lo que dice «basado en X de Y»). */
  items: number;
  usable: boolean;
  /** Empate exacto de `score` con otro partido de la lista. */
  tie: boolean;
  /** Posición 1-based en `ranking`. */
  rank: number;
  details: QuestionMatch[];
  /**
   * Solo en el modo combinado: de qué sale la cifra. «programa» cuando no hay
   * historial suficiente, y la UI debe decirlo.
   */
  basis?: "ambas" | "programa" | "hechos";
}

/** Una lente o la cifra por defecto (media de las dos cuando existen). */
export type RankingMode = Lens | "combined";

export interface AffinityResult {
  lens: RankingMode;
  /** Número de preguntas respondidas (sin contar saltadas). */
  answered: number;
  /** Mínimo exigido en este dataset; si `answered` no llega, nadie es usable. */
  minAnswers: number;
  enoughAnswers: boolean;
  ranking: PartyAffinity[];
}

export interface AffinityOptions {
  /** Limita el cálculo a estos partidos (ver `select.ts`). Por defecto, todos. */
  partyIds?: readonly string[];
  /** Por defecto `min(MIN_ANSWERS, nº de preguntas)`. */
  minAnswers?: number;
  /** Encogimiento hacia el neutro; por defecto `SHRINK_K`. Solo para calibrarlo en las comprobaciones. */
  shrinkK?: number;
}

/**
 * Afinidad de cada partido con las respuestas.
 *
 * `lens` = "programme" | "record" da cada lente por separado (las dos barras
 * del titular). "combined" es el orden por defecto: media de programa y hechos
 * cuando ambas tienen datos suficientes (≥ `MIN_LENS_ITEMS`); si no, la que los tenga.
 *
 * Orden: primero los partidos con datos suficientes; dentro de cada grupo,
 * afinidad desc → cobertura desc → nombre. Los «datos insuficientes» van
 * detrás aunque su porcentaje sea alto, porque un 100 % sobre tres preguntas no
 * es comparable con un 90 % sobre quince.
 */
export function computeAffinity(
  answers: Answers,
  dataset: Dataset,
  lens: RankingMode,
  opts: AffinityOptions = {},
): AffinityResult {
  const idx = indexOf(dataset);
  const answered = answeredQuestions(answers, dataset);
  const minAnswers = opts.minAnswers ?? Math.min(MIN_ANSWERS, idx.questions.length);
  const enoughAnswers = answered.length >= minAnswers && answered.length > 0;
  // Con menos preguntas que MIN_LENS_ITEMS (el fixture) se exigen las mínimas respuestas.
  const minItems = Math.min(MIN_LENS_ITEMS, minAnswers);
  const k = opts.shrinkK ?? SHRINK_K;
  const parties = opts.partyIds
    ? opts.partyIds.map((id) => idx.partyById.get(id)).filter((p): p is Party => !!p)
    : dataset.parties;

  const rows = parties.map((p) => {
    const entry =
      lens === "combined"
        ? combinedEntry(answers, dataset, p.id, answered, enoughAnswers, minItems, k)
        : lensEntry(answers, dataset, p.id, answered, lens, enoughAnswers, minItems, k);
    return { party: p, entry };
  });

  rows.sort((x, y) => {
    const a = x.entry;
    const b = y.entry;
    if (a.usable !== b.usable) return a.usable ? -1 : 1;
    const sa = a.score ?? -1;
    const sb = b.score ?? -1;
    if (Math.abs(sa - sb) > EPS) return sb - sa;
    if (Math.abs(a.coverage - b.coverage) > EPS) return b.coverage - a.coverage;
    return compareNames(x.party, y.party);
  });

  const ranking = rows.map((r, i) => ({ ...r.entry, rank: i + 1 }));
  for (const e of ranking) {
    if (e.score === null) continue;
    e.tie = ranking.some((o) => o !== e && o.score !== null && Math.abs(o.score - e.score!) <= EPS);
  }
  return { lens, answered: answered.length, minAnswers, enoughAnswers, ranking };
}

function lensEntry(
  answers: Answers,
  dataset: Dataset,
  partyId: string,
  answered: Question[],
  lens: Lens,
  enoughAnswers: boolean,
  minItems: number,
  k: number,
): PartyAffinity {
  const details: QuestionMatch[] = [];
  for (const q of answered) {
    const a = answers[q.id] as AnswerValue;
    const position = cellPosition(dataset, partyId, q.id, lens);
    if (position === null) continue;
    details.push({
      questionId: q.id,
      answer: a.value,
      important: !!a.important,
      position,
      agreement: agreement(a.value, position),
      weight: a.important ? IMPORTANT_WEIGHT : 1,
    });
  }
  const score = weightedMean(details, k);
  const coverage = answered.length > 0 ? details.length / answered.length : 0;
  return {
    partyId,
    score,
    coverage,
    items: details.length,
    usable: enoughAnswers && score !== null && details.length >= minItems,
    tie: false,
    rank: 0,
    details,
  };
}

function weightedMean(details: QuestionMatch[], k: number): number | null {
  const wSum = details.reduce((s, d) => s + d.weight, 0);
  return wSum > 0 ? shrunkMean(details.reduce((s, d) => s + d.weight * d.agreement, 0), wSum, k) : null;
}

/*
 * La cifra por defecto. Se promedian las dos afinidades ya calculadas —no las
 * celdas— para que la cifra combinada sea exactamente la media de las dos
 * barras que ve el usuario. Si solo una lente tiene cobertura suficiente, se
 * usa esa y `basis` lo dice.
 */
function combinedEntry(
  answers: Answers,
  dataset: Dataset,
  partyId: string,
  answered: Question[],
  enoughAnswers: boolean,
  minItems: number,
  k: number,
): PartyAffinity {
  const prog = lensEntry(answers, dataset, partyId, answered, "programme", enoughAnswers, minItems, k);
  const rec = lensEntry(answers, dataset, partyId, answered, "record", enoughAnswers, minItems, k);
  if (prog.usable && rec.usable) {
    const recByQ = new Map(rec.details.map((d) => [d.questionId, d]));
    const progByQ = new Map(prog.details.map((d) => [d.questionId, d]));
    // Detalle por pregunta: media de las lentes disponibles en esa pregunta.
    const details: QuestionMatch[] = answered.flatMap((q) => {
      const ds = [progByQ.get(q.id), recByQ.get(q.id)].filter((d): d is QuestionMatch => !!d);
      if (ds.length === 0) return [];
      return [
        {
          ...ds[0],
          position: ds.reduce((s, d) => s + d.position, 0) / ds.length,
          agreement: ds.reduce((s, d) => s + d.agreement, 0) / ds.length,
        },
      ];
    });
    return {
      ...prog,
      score: (prog.score! + rec.score!) / 2,
      coverage: Math.min(prog.coverage, rec.coverage),
      items: Math.min(prog.items, rec.items),
      details,
      basis: "ambas",
    };
  }
  if (!prog.usable && rec.usable) return { ...rec, basis: "hechos" };
  return { ...prog, basis: "programa" };
}

// Desempate alfabético estable y sin depender del idioma del navegador: el
// mismo enlace compartido debe dar el mismo orden en cualquier dispositivo.
function compareNames(a: Party, b: Party): number {
  const na = a.name.toLowerCase();
  const nb = b.name.toLowerCase();
  if (na !== nb) return na < nb ? -1 : 1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

// ─── Coherencia y promesa vs. hechos ───────────────────────────────────────

export interface Coherence {
  /** `1 − media|programa − hechos| / 4`; `null` sin celdas con ambos. */
  value: number | null;
  /** Celdas con programa y hechos verificados. */
  items: number;
}

/** Coherencia del partido entre lo que dice y lo que vota. */
export function coherence(partyId: string, dataset: Dataset): Coherence {
  const pairs = pairedCells(dataset, partyId);
  if (pairs.length === 0) return { value: null, items: 0 };
  const meanGap = pairs.reduce((s, p) => s + p.gap, 0) / pairs.length;
  return { value: 1 - meanGap / MAX_DISTANCE, items: pairs.length };
}

export interface PromiseGapItem {
  questionId: string;
  programme: number;
  record: number;
  /** |programa − hechos|, de 0 a 4. */
  gap: number;
}

export interface PromiseVsRecord {
  partyId: string;
  /** Brecha media |programa − hechos| (0–4); `null` sin celdas con ambos. */
  meanGap: number | null;
  items: number;
  /** Ítems donde prometen una cosa y votan otra, de mayor a menor brecha. */
  mismatches: PromiseGapItem[];
}

export function promiseVsRecord(dataset: Dataset, partyId: string): PromiseVsRecord {
  const pairs = pairedCells(dataset, partyId);
  const mismatches = pairs
    .filter((p) => p.gap >= PROMISE_GAP_THRESHOLD - EPS && Math.sign(p.programme) !== Math.sign(p.record))
    .sort((a, b) => b.gap - a.gap || a.order - b.order)
    .map(({ order, ...rest }) => rest);
  return {
    partyId,
    meanGap: pairs.length ? pairs.reduce((s, p) => s + p.gap, 0) / pairs.length : null,
    items: pairs.length,
    mismatches,
  };
}

function pairedCells(dataset: Dataset, partyId: string) {
  const out: (PromiseGapItem & { order: number })[] = [];
  for (const q of indexOf(dataset).questions) {
    const programme = cellPosition(dataset, partyId, q.id, "programme");
    const record = cellPosition(dataset, partyId, q.id, "record");
    if (programme === null || record === null) continue;
    out.push({ questionId: q.id, programme, record, gap: Math.abs(programme - record), order: q.order });
  }
  return out;
}

// ─── Tu sorpresa ───────────────────────────────────────────────────────────

export interface Surprise {
  /** Partido de fuera de tu bloque. */
  partyId: string;
  /** La pregunta con más diferencia a favor del partido sorpresa. */
  questionId: string;
  /**
   * Preguntas respondidas del mismo tema en las que el partido sorpresa supera
   * al de referencia (siempre incluye `questionId`). Con una sola, la sorpresa
   * es de una medida, no del tema.
   */
  questionIds: string[];
  topic: string;
  /**
   * Alcance de la frase. «medida» = una pregunta concreta; «tema» solo si el
   * partido sorpresa gana en al menos `MIN_TOPIC_WINS` preguntas del tema Y su
   * coincidencia media en el tema es mayor. Decir «en impuestos coincides más
   * con X» a partir de una sola pregunta generalizaba de más: quien está en
   * contra de subir impuestos en general podía leer que coincide con quien los
   * sube por estar a favor de un único impuesto.
   */
  scope: "medida" | "tema";
  agreement: number;
  /** Tu partido habitual o, si no lo dijiste, el 1.º del ranking. */
  referencePartyId: string;
  referenceAgreement: number;
  /**
   * Coincidencia media (0–1, ponderada por «me importa», sin encogimiento) en
   * TODAS tus respuestas del tema con dato de cada partido. `null` si no hay
   * ninguna. Es lo que permite poner la medida en contexto.
   */
  topicAgreement: { party: number | null; reference: number | null };
}

/** Preguntas ganadas dentro de un tema para poder hablar del tema entero. */
export const MIN_TOPIC_WINS = 2;

/** Media ponderada simple de las coincidencias de un subconjunto de preguntas. */
function plainMean(details: readonly QuestionMatch[]): number | null {
  const w = details.reduce((s, d) => s + d.weight, 0);
  if (w <= 0) return null;
  return details.reduce((s, d) => s + d.weight * d.agreement, 0) / w;
}

/**
 * «En vivienda coincides más con X que con tu partido habitual».
 *
 * Se busca, entre los partidos de otro bloque, la pregunta donde más superan
 * en coincidencia al partido de referencia. Solo se compara donde ambos tienen
 * dato: decir «coincides más con X» frente a un hueco sería inventar.
 *
 * @param userBloc bloque del voto habitual declarado; si falta, el del partido
 *   de referencia.
 * @param referencePartyId voto habitual declarado; si falta, el mejor partido
 *   usable del bloque (o el 1.º del ranking).
 */
export function surprise(
  result: AffinityResult,
  dataset: Dataset,
  userBloc: Bloc | undefined,
  referencePartyId?: string,
): Surprise | null {
  const idx = indexOf(dataset);
  const usable = result.ranking.filter((e) => e.usable);
  let ref = referencePartyId ? result.ranking.find((e) => e.partyId === referencePartyId) : undefined;
  if (!ref && userBloc) ref = usable.find((e) => idx.partyById.get(e.partyId)?.bloc === userBloc);
  if (!ref) ref = usable[0];
  if (!ref) return null;
  const bloc = userBloc ?? idx.partyById.get(ref.partyId)?.bloc;
  if (!bloc) return null;

  const refByQ = new Map(ref.details.map((d) => [d.questionId, d]));
  let best: (Omit<Surprise, "questionIds" | "scope" | "topicAgreement"> & { delta: number; order: number; rank: number }) | null = null;
  for (const e of result.ranking) {
    const party = idx.partyById.get(e.partyId);
    if (!party || party.bloc === bloc || e.partyId === ref.partyId) continue;
    for (const d of e.details) {
      const r = refByQ.get(d.questionId);
      if (!r) continue;
      const delta = d.agreement - r.agreement;
      if (delta <= EPS) continue;
      const q = idx.questionById.get(d.questionId)!;
      const cand = {
        partyId: e.partyId,
        questionId: d.questionId,
        topic: q.topic,
        agreement: d.agreement,
        referencePartyId: ref.partyId,
        referenceAgreement: r.agreement,
        delta,
        order: q.order,
        rank: e.rank,
      };
      if (!best || better(cand, best)) best = cand;
    }
  }
  if (!best) return null;
  const { delta, order, rank, ...out } = best;
  void delta;
  void order;
  void rank;

  // Contexto del tema: todas las preguntas respondidas de ese tema, no solo la
  // ganadora, para decidir si la frase puede hablar del tema o solo de la medida.
  const winner = result.ranking.find((e) => e.partyId === out.partyId)!;
  const inTopic = (d: QuestionMatch) => idx.questionById.get(d.questionId)?.topic === out.topic;
  const partyTopic = winner.details.filter(inTopic);
  const refTopic = ref.details.filter(inTopic);
  const wins = partyTopic
    .filter((d) => {
      const r = refByQ.get(d.questionId);
      return r !== undefined && d.agreement - r.agreement > EPS;
    })
    .map((d) => d.questionId);
  const topicAgreement = { party: plainMean(partyTopic), reference: plainMean(refTopic) };
  const scope: Surprise["scope"] =
    wins.length >= MIN_TOPIC_WINS &&
    topicAgreement.party !== null &&
    topicAgreement.reference !== null &&
    topicAgreement.party - topicAgreement.reference > EPS
      ? "tema"
      : "medida";
  const ordered = [out.questionId, ...wins.filter((id) => id !== out.questionId)];
  return { ...out, questionIds: ordered, scope, topicAgreement };
}

// Desempates deterministas: mayor diferencia, mayor coincidencia absoluta,
// partido mejor situado, pregunta anterior.
function better(
  a: { delta: number; agreement: number; rank: number; order: number },
  b: { delta: number; agreement: number; rank: number; order: number },
): boolean {
  if (Math.abs(a.delta - b.delta) > EPS) return a.delta > b.delta;
  if (Math.abs(a.agreement - b.agreement) > EPS) return a.agreement > b.agreement;
  if (a.rank !== b.rank) return a.rank < b.rank;
  return a.order < b.order;
}

// ─── Donde tu partido te contradice ────────────────────────────────────────

export interface Contradiction {
  questionId: string;
  answer: UserPosition;
  important: boolean;
  /** Lente de la que sale la mayor distancia (Hechos si empatan). */
  lens: Lens;
  position: number;
  /** |respuesta − posición|, de 0 a 4. */
  distance: number;
}

/**
 * Las `n` preguntas donde el partido más se aleja de tus respuestas. Por
 * pregunta se toma la lente más lejana; si empatan, Hechos, porque un voto pesa
 * más que una frase de programa. Solo cuenta distancia ≥ 2 y nunca un partido
 * en 0: una abstención no «contradice», se queda a medias.
 */
export function contradictions(answers: Answers, dataset: Dataset, partyId: string, n = 3): Contradiction[] {
  const out: (Contradiction & { order: number })[] = [];
  for (const q of answeredQuestions(answers, dataset)) {
    const a = answers[q.id] as AnswerValue;
    let pick: Contradiction | null = null;
    for (const lens of ["record", "programme"] as const) {
      const position = cellPosition(dataset, partyId, q.id, lens);
      if (position === null || Math.abs(position) < EPS) continue;
      const distance = Math.abs(a.value - position);
      if (!pick || distance > pick.distance + EPS)
        pick = { questionId: q.id, answer: a.value, important: !!a.important, lens, position, distance };
    }
    if (pick && pick.distance >= MIN_CONTRADICTION_DISTANCE - EPS) out.push({ ...pick, order: q.order });
  }
  return out
    .sort(
      (x, y) =>
        y.distance - x.distance || Number(y.important) - Number(x.important) || x.order - y.order,
    )
    .slice(0, Math.max(0, n))
    .map(({ order, ...rest }) => rest);
}
