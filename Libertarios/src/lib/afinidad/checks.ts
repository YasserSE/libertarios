import {
  USER_POSITIONS,
  type Answers,
  type Dataset,
  type Lens,
  type Stance,
  type UserPosition,
} from "@/data/afinidad/types";
import { validateDataset } from "./schema";
import { MIN_ANSWERS, MIN_LENS_ITEMS, cellPosition, computeAffinity, type AffinityOptions, type RankingMode } from "./score";

/**
 * Comprobaciones de neutralidad y de integridad, reutilizables.
 *
 * Están aquí y no dentro de un test porque deben correr dos veces: sobre el
 * fixture sintético (`afinidad-score.test.ts`) y sobre el dataset real
 * (`afinidad-dataset.test.ts`, WP5). La metodología las enlaza como prueba de
 * que el resultado no está predeterminado: cualquiera puede ejecutarlas.
 *
 * Cada función devuelve `{ ok, problems }` con los problemas en castellano, en
 * vez de lanzar, para que un test pueda decidir si falla o solo avisa.
 */

export interface CheckResult {
  ok: boolean;
  problems: string[];
}

const result = (problems: string[]): CheckResult => ({ ok: problems.length === 0, problems });
const LENSES: Lens[] = ["programme", "record"];

// ─── Umbrales de equidad (los cita la metodología; no se escriben a mano allí) ─

/** Dominancia: ningún partido comparable gana a más de esta fracción de usuarios sintéticos. */
export const DOMINANCE_MAX_SHARE = 0.35;
/** Dominancia: ningún partido comparable gana a menos de esta fracción. */
export const DOMINANCE_MIN_SHARE = 0.02;
/** Usuarios sintéticos por perfil en la simulación de dominancia. */
export const DOMINANCE_USERS = 10_000;
/** Test 7: la cobertura de cada bloque puede alejarse de la media como mucho esto. */
export const BLOC_COVERAGE_TOLERANCE = 0.2;
/** Test 4: distancia máxima entre el 1.º y la mediana si se contesta lo mismo a todo. */
export const RESPONSE_STYLE_MAX_GAP = 0.15;
/** Test 5: partidos mínimos a cada lado de cada pregunta. */
export const ITEM_MIN_PER_SIDE = 2;
/**
 * Test 1: cifra mínima del votante perfecto. Con el encogimiento hacia el
 * neutro (`SHRINK_K`) ya no es el 100 %: 5 de 5 coincidencias dan un 81 % con
 * K = 3. Lo que se exige es que salga 1.º y por encima de este umbral.
 */
export const PERFECT_VOTER_MIN_SCORE = 0.75;

/**
 * Fracción de las preguntas del dataset con dato que puntúa del partido en una
 * lente. Es la cobertura de quien contesta todo, como los usuarios sintéticos.
 */
export function datasetCoverage(dataset: Dataset, partyId: string, lens: Lens): number {
  if (dataset.questions.length === 0) return 0;
  const n = dataset.questions.filter((q) => cellPosition(dataset, partyId, q.id, lens) !== null).length;
  return n / dataset.questions.length;
}

/**
 * Partidos que pueden salir en un ranking (usables) para quien responde todas
 * las preguntas: al menos `MIN_LENS_ITEMS` preguntas con dato que puntúa en la
 * lente (la misma regla que el motor), o en alguna de las dos en el modo
 * combinado (que cae a la que exista).
 *
 * Las comprobaciones de dominancia y de votante perfecto solo tienen sentido
 * sobre ellos: un partido sin datos sale «datos insuficientes» para todo el
 * mundo, así que no «pierde» la dominancia con un 0 %: ni siquiera compite. Su
 * hueco lo señalan las comprobaciones de cobertura (test 7) y la UI.
 */
export function comparableParties(dataset: Dataset, mode: RankingMode, partyIds?: readonly string[]): string[] {
  const need = Math.min(MIN_LENS_ITEMS, dataset.questions.length);
  const ok = (id: string, lens: Lens) =>
    dataset.questions.filter((q) => cellPosition(dataset, id, q.id, lens) !== null).length >= need;
  return (partyIds ?? dataset.parties.map((p) => p.id)).filter((id) =>
    mode === "combined" ? ok(id, "programme") || ok(id, "record") : ok(id, mode),
  );
}

// ─── Utilidades ────────────────────────────────────────────────────────────

/** El mismo dataset con todas las posiciones (y revisores) cambiadas de signo. */
export function negateDataset(dataset: Dataset): Dataset {
  const neg = <T extends { position: number }>(c: T): T => ({ ...c, position: (c.position === 0 ? 0 : -c.position) as T["position"] });
  return {
    ...dataset,
    stances: dataset.stances.map(
      (s): Stance => ({
        ...s,
        programme: s.programme
          ? { ...neg(s.programme), reviewer: s.programme.reviewer && neg(s.programme.reviewer) }
          : null,
        record: s.record ? neg(s.record) : null,
      }),
    ),
  };
}

export function negateAnswers(answers: Answers): Answers {
  const out: Answers = {};
  for (const [k, a] of Object.entries(answers))
    out[k] = a === "skip" ? a : { ...a, value: -a.value as UserPosition };
  return out;
}

/**
 * Lo que respondería alguien idéntico al partido en una lente. Un 0 del
 * partido no tiene equivalente en la escala de 4 puntos y se salta; una media
 * no entera (contested) se redondea alejándose de 0.
 */
export function perfectAnswers(dataset: Dataset, partyId: string, lens: Lens, invert = false): Answers {
  const out: Answers = {};
  for (const q of dataset.questions) {
    const p = cellPosition(dataset, partyId, q.id, lens);
    if (p === null || p === 0) continue;
    const v = (Math.sign(p) * Math.min(2, Math.ceil(Math.abs(p))) * (invert ? -1 : 1)) as UserPosition;
    out[q.id] = { value: v, important: false };
  }
  return out;
}

/** Generador pseudoaleatorio con semilla (mulberry32): simulaciones repetibles. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pct = (x: number) => `${Math.round(x * 1000) / 10} %`;

// ─── Tests 1–4 del plan (motor sobre un dataset) ───────────────────────────

/**
 * Test 1: quien responde exactamente lo que dice P sale con P 1.º y con al
 * menos `PERFECT_VOTER_MIN_SCORE` (no el 100 %: la cifra se encoge hacia el
 * neutro con pocas respuestas). Si otro partido empata, los dos son indistinguibles con estas
 * preguntas y se informa: no es un fallo del motor, es un aviso sobre el
 * cuestionario.
 */
export function checkPerfectVoter(
  dataset: Dataset,
  lens: Lens,
  opts: AffinityOptions = {},
): CheckResult & { indistinguishable: [string, string][]; notComparable: string[] } {
  const problems: string[] = [];
  const indistinguishable: [string, string][] = [];
  const all = opts.partyIds ?? dataset.parties.map((x) => x.id);
  const need = Math.min(MIN_LENS_ITEMS, opts.minAnswers ?? Math.min(MIN_ANSWERS, dataset.questions.length));
  // Un partido con menos posiciones (no nulas) que MIN_LENS_ITEMS no puede
  // tener votante perfecto: no compite en esta lente (misma regla que el
  // motor). No es un fallo del motor, es falta de datos, y la señalan la
  // cobertura (test 7) y la UI.
  const notComparable: string[] = [];
  for (const p of all) {
    const answers = perfectAnswers(dataset, p, lens);
    const n = Object.keys(answers).length;
    if (n < need) {
      notComparable.push(p);
      continue;
    }
    // Quien solo responde lo que el partido dice puede quedarse por debajo del
    // mínimo general de respuestas (8); se rebaja a las que tiene, y nunca por
    // debajo de MIN_LENS_ITEMS, para probar el motor y no el mínimo.
    const r = computeAffinity(answers, dataset, lens, {
      ...opts,
      minAnswers: Math.min(opts.minAnswers ?? Math.min(MIN_ANSWERS, dataset.questions.length), n),
    });
    const me = r.ranking.find((e) => e.partyId === p);
    if (!me || !me.usable) {
      problems.push(`${p} (${lens}): sin datos suficientes para un votante perfecto`);
      continue;
    }
    if ((me.score ?? 0) < PERFECT_VOTER_MIN_SCORE - 1e-9)
      problems.push(`${p} (${lens}): votante perfecto al ${pct(me.score ?? 0)} (mín. ${pct(PERFECT_VOTER_MIN_SCORE)})`);
    const top = r.ranking[0];
    if (top.partyId !== p && !(me.tie && Math.abs((top.score ?? 0) - (me.score ?? 0)) < 1e-9))
      problems.push(`${p} (${lens}): su votante perfecto tiene a ${top.partyId} 1.º`);
    for (const o of r.ranking)
      if (o.partyId !== p && o.usable && Math.abs((o.score ?? -1) - (me.score ?? -2)) < 1e-9)
        indistinguishable.push([p, o.partyId]);
  }
  for (const [a, b] of indistinguishable) problems.push(`${a} y ${b} son indistinguibles en ${lens}`);
  return { ...result(problems), indistinguishable, notComparable };
}

/** Test 2: quien responde lo contrario de P tiene a P el último entre los usables. */
export function checkOppositeVoter(dataset: Dataset, lens: Lens, opts: AffinityOptions = {}): CheckResult {
  const problems: string[] = [];
  for (const p of opts.partyIds ?? dataset.parties.map((x) => x.id)) {
    const r = computeAffinity(perfectAnswers(dataset, p, lens, true), dataset, lens, opts);
    const usable = r.ranking.filter((e) => e.usable);
    const me = usable.find((e) => e.partyId === p);
    if (!me) continue;
    const last = usable[usable.length - 1];
    if (last.partyId !== p && Math.abs((last.score ?? 0) - (me.score ?? 0)) > 1e-9)
      problems.push(`${p} (${lens}): su votante opuesto lo deja por delante de ${last.partyId}`);
  }
  return result(problems);
}

/**
 * Test 3: cambiar de signo respuestas y posiciones no cambia el ranking. Si
 * cambiara, el motor trataría distinto un lado del eje que el otro.
 */
export function checkSymmetry(
  dataset: Dataset,
  answersList: Answers[],
  mode: RankingMode,
  opts: AffinityOptions = {},
): CheckResult {
  const problems: string[] = [];
  const negated = negateDataset(dataset);
  answersList.forEach((answers, i) => {
    const a = computeAffinity(answers, dataset, mode, opts).ranking;
    const b = computeAffinity(negateAnswers(answers), negated, mode, opts).ranking;
    const same =
      a.length === b.length &&
      a.every(
        (e, j) =>
          e.partyId === b[j].partyId &&
          e.usable === b[j].usable &&
          ((e.score === null && b[j].score === null) || Math.abs((e.score ?? 0) - (b[j].score ?? 0)) < 1e-9),
      );
    if (!same) problems.push(`respuestas #${i} (${mode}): el ranking cambia al invertir signos`);
  });
  return result(problems);
}

/**
 * Test 4: quien contesta lo mismo a todo (siempre +2, siempre −1…) no debe
 * recibir un ganador claro: es un estilo de respuesta, no una ideología. La
 * distancia entre el 1.º y la mediana debe quedar en `maxGap` (15 puntos).
 */
export function checkResponseStyle(
  dataset: Dataset,
  mode: RankingMode,
  maxGap = RESPONSE_STYLE_MAX_GAP,
  opts: AffinityOptions = {},
): CheckResult {
  const problems: string[] = [];
  for (const v of USER_POSITIONS) {
    const answers: Answers = Object.fromEntries(dataset.questions.map((q) => [q.id, { value: v, important: false }]));
    const scores = computeAffinity(answers, dataset, mode, opts)
      .ranking.filter((e) => e.usable)
      .map((e) => e.score as number);
    if (scores.length < 2) continue;
    const sorted = [...scores].sort((a, b) => a - b);
    const mid = sorted.length / 2;
    const median = sorted.length % 2 ? sorted[Math.floor(mid)] : (sorted[mid - 1] + sorted[mid]) / 2;
    const gap = sorted[sorted.length - 1] - median;
    if (gap > maxGap + 1e-9) problems.push(`todo ${v > 0 ? "+" : ""}${v} (${mode}): 1.º − mediana = ${pct(gap)}`);
  }
  return result(problems);
}

// ─── Tests 5–8 del plan (equilibrio del dataset) ───────────────────────────

/** Test 5: en cada ítem hay al menos `minPerSide` partidos a cada lado. */
export function checkItemBalance(dataset: Dataset, lens: Lens, minPerSide = ITEM_MIN_PER_SIDE): CheckResult {
  const problems: string[] = [];
  for (const q of dataset.questions) {
    let pos = 0;
    let neg = 0;
    for (const p of dataset.parties) {
      const x = cellPosition(dataset, p.id, q.id, lens);
      if (x === null) continue;
      if (x > 0) pos++;
      else if (x < 0) neg++;
    }
    if (pos < minPerSide || neg < minPerSide)
      problems.push(`${q.id} (${lens}): ${pos} a favor y ${neg} en contra (mínimo ${minPerSide} por lado)`);
  }
  return result(problems);
}

/** Test 6: ningún partido tiene todas sus posiciones del mismo signo. */
export function checkPartyBalance(dataset: Dataset, lens: Lens): CheckResult {
  const problems: string[] = [];
  for (const p of dataset.parties) {
    const xs = dataset.questions
      .map((q) => cellPosition(dataset, p.id, q.id, lens))
      .filter((x): x is number => x !== null);
    if (xs.length < 2) continue;
    if (xs.every((x) => x > 0) || xs.every((x) => x < 0))
      problems.push(`${p.id} (${lens}): todas sus posiciones tienen el mismo signo`);
  }
  return result(problems);
}

/**
 * Test 7: la cobertura de cada bloque está a ± `tolerance` de la media. Si un
 * bloque tuviera muchos más huecos, sus partidos saldrían como «datos
 * insuficientes» más a menudo, y eso ya es un sesgo.
 */
export function checkBlocCoverage(dataset: Dataset, lens: Lens, tolerance = BLOC_COVERAGE_TOLERANCE): CheckResult & {
  coverage: Record<string, number>;
} {
  const cov = (ids: string[]) => {
    const total = ids.length * dataset.questions.length;
    if (total === 0) return 0;
    let n = 0;
    for (const id of ids) for (const q of dataset.questions) if (cellPosition(dataset, id, q.id, lens) !== null) n++;
    return n / total;
  };
  const overall = cov(dataset.parties.map((p) => p.id));
  const coverage: Record<string, number> = {};
  const problems: string[] = [];
  for (const bloc of Array.from(new Set(dataset.parties.map((p) => p.bloc)))) {
    coverage[bloc] = cov(dataset.parties.filter((p) => p.bloc === bloc).map((p) => p.id));
    if (Math.abs(coverage[bloc] - overall) > tolerance + 1e-9)
      problems.push(`bloque ${bloc} (${lens}): cobertura ${pct(coverage[bloc])} frente a ${pct(overall)} de media`);
  }
  return { ...result(problems), coverage };
}

/**
 * Test 8: el esquema (cita+URL en lo verificado, patrón congreso.es…) y que lo
 * que no puntúa no influye: se cambian las posiciones de las celdas
 * `pendiente`/`sin-posicion` y el resultado debe ser idéntico.
 */
export function checkSchemaAndExclusion(dataset: Dataset): CheckResult {
  const v = validateDataset(dataset);
  const problems = v.ok ? [] : [...v.errors];
  const flip = <T extends { status: string; position: number } | null>(c: T): T =>
    c && (c.status === "pendiente" || c.status === "sin-posicion")
      ? ({ ...c, position: c.position === 2 ? -2 : 2 } as T)
      : c;
  const mutated: Dataset = {
    ...dataset,
    stances: dataset.stances.map((s) => ({ ...s, programme: flip(s.programme), record: flip(s.record) })),
  };
  const rnd = seededRandom(8);
  for (let i = 0; i < 20; i++) {
    const answers = randomAnswers(dataset, rnd, "uniform");
    for (const lens of LENSES) {
      const a = computeAffinity(answers, dataset, lens).ranking;
      const b = computeAffinity(answers, mutated, lens).ranking;
      if (a.some((e, j) => e.partyId !== b[j].partyId || e.score !== b[j].score)) {
        problems.push(`celdas pendiente/sin-posicion influyen en el cálculo (${lens})`);
        return result(problems);
      }
    }
  }
  return result(problems);
}

// ─── Dominancia ────────────────────────────────────────────────────────────

export type SyntheticProfile = "uniform" | "moderate";

/**
 * Un usuario sintético. «uniform»: cada respuesta al azar entre las cuatro, y
 * un 20 % marcadas como importantes. «moderate»: 80 % de ±1 y 20 % de ±2, con
 * el lado al azar; es el perfil que más castigaba la métrica antigua.
 */
export function randomAnswers(dataset: Dataset, rnd: () => number, profile: SyntheticProfile): Answers {
  const out: Answers = {};
  for (const q of dataset.questions) {
    let value: UserPosition;
    if (profile === "uniform") value = USER_POSITIONS[Math.floor(rnd() * 4)];
    else value = ((rnd() < 0.5 ? -1 : 1) * (rnd() < 0.8 ? 1 : 2)) as UserPosition;
    out[q.id] = { value, important: profile === "uniform" && rnd() < 0.2 };
  }
  return out;
}

export interface DominanceResult extends CheckResult {
  /** Fracción de victorias por partido y perfil (empates repartidos). */
  shares: Record<SyntheticProfile, Record<string, number>>;
  /** Fracción de usuarios sin ningún partido usable. */
  noWinner: Record<SyntheticProfile, number>;
  /** Partidos sobre los que se aplican los umbrales (ver `comparableParties`). */
  comparable: string[];
  /** Partidos sin cobertura suficiente en el modo: no compiten y no se juzgan. */
  notComparable: string[];
}

/**
 * Dominancia: ningún partido comparable (con cobertura suficiente en el modo,
 * `comparableParties`) debe ganar a más del 35 % ni a menos del 2 % de
 * usuarios sintéticos. Si uno gana casi siempre, la métrica o el cuestionario
 * empujan hacia él, conteste lo que conteste la gente. En local, avisar; en CI
 * con `STRICT=1`, fallar (lo decide el test que la llame).
 */
export function checkDominance(
  dataset: Dataset,
  opts: AffinityOptions & {
    n?: number;
    seed?: number;
    mode?: RankingMode;
    maxShare?: number;
    minShare?: number;
  } = {},
): DominanceResult {
  const {
    n = DOMINANCE_USERS,
    seed = 2026,
    mode = "combined",
    maxShare = DOMINANCE_MAX_SHARE,
    minShare = DOMINANCE_MIN_SHARE,
    ...affinity
  } = opts;
  const ids = affinity.partyIds ?? dataset.parties.map((p) => p.id);
  const comparable = comparableParties(dataset, mode, ids);
  const notComparable = ids.filter((id) => !comparable.includes(id));
  const problems: string[] = [];
  const shares = {} as DominanceResult["shares"];
  const noWinner = {} as DominanceResult["noWinner"];
  (["uniform", "moderate"] as const).forEach((profile, k) => {
    const rnd = seededRandom(seed + k);
    const wins: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
    let none = 0;
    for (let i = 0; i < n; i++) {
      const ranking = computeAffinity(randomAnswers(dataset, rnd, profile), dataset, mode, affinity).ranking;
      const top = ranking[0];
      if (!top || !top.usable) {
        none++;
        continue;
      }
      const winners = ranking.filter((e) => e.usable && Math.abs((e.score ?? 0) - (top.score ?? 0)) < 1e-9);
      for (const w of winners) wins[w.partyId] += 1 / winners.length;
    }
    shares[profile] = Object.fromEntries(ids.map((id) => [id, wins[id] / n]));
    noWinner[profile] = none / n;
    for (const id of comparable) {
      const s = shares[profile][id];
      if (s > maxShare) problems.push(`${id} gana al ${pct(s)} de usuarios ${profile} (máx. ${pct(maxShare)})`);
      if (s < minShare) problems.push(`${id} gana al ${pct(s)} de usuarios ${profile} (mín. ${pct(minShare)})`);
    }
  });
  return { ...result(problems), shares, noWinner, comparable, notComparable };
}
