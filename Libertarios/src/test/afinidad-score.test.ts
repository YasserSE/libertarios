import { describe, it, expect } from "vitest";
import type { Answers, Dataset, Party, Position, Question, Stance, UserPosition, VoteEvidence } from "@/data/afinidad/types";
import { USER_POSITIONS } from "@/data/afinidad/types";
import {
  MIN_LENS_ITEMS,
  SHRINK_K,
  shrunkMean,
  IMPORTANT_WEIGHT,
  MIN_ANSWERS,
  NEUTRAL_PARTY_FACTOR,
  OPPOSITE_SIDE_FACTOR,
  PARTY_POSITIONS,
  SAME_SIDE_FACTOR,
  agreement,
  coherence,
  computeAffinity,
  contradictions,
  promiseVsRecord,
  surprise,
} from "@/lib/afinidad/score";
import {
  BLOC_COVERAGE_TOLERANCE,
  DOMINANCE_MAX_SHARE,
  DOMINANCE_MIN_SHARE,
  DOMINANCE_USERS,
  ITEM_MIN_PER_SIDE,
  RESPONSE_STYLE_MAX_GAP,
  checkBlocCoverage,
  checkDominance,
  comparableParties,
  checkItemBalance,
  checkOppositeVoter,
  checkPartyBalance,
  checkPerfectVoter,
  checkResponseStyle,
  checkSchemaAndExclusion,
  checkSymmetry,
  randomAnswers,
  seededRandom,
} from "@/lib/afinidad/checks";
import { decodeAnswers, decodeResultParams, encodeAnswers, encodeResultParams } from "@/lib/afinidad/encode";
import { validateDataset } from "@/lib/afinidad/schema";
import { getResultStrings, measureLabel, surpriseSentence, topicLabel } from "@/i18n/afinidad/result";
import { hiddenCount, visiblePartyIds } from "@/lib/afinidad/select";
import { sampleDataset as ds, sampleQuestions } from "./fixtures/afinidad-sample";

/*
 * El fixture tiene 5 preguntas; los votantes perfectos solo pueden responder
 * las celdas no nulas de cada partido (3–5), así que esos tests rebajan el
 * mínimo de respuestas. El resto usa el mínimo por defecto del motor.
 */
const SMALL = { minAnswers: 3 };
const LENSES = ["programme", "record"] as const;

const a = (value: UserPosition, important = false) => ({ value, important });
const all = (value: UserPosition): Answers => Object.fromEntries(ds.questions.map((q) => [q.id, a(value)]));

/** Dataset sintético mínimo para casos que el fixture no cubre. */
function makeDataset(nQuestions: number, parties: { id: string; name?: string; positions: (Position | null)[] }[]): Dataset {
  const questions: Question[] = Array.from({ length: nQuestions }, (_, i) => ({
    ...sampleQuestions[0],
    id: `s${i + 1}`,
    order: i + 1,
    topic: `Tema ${i + 1}`,
  }));
  const stances: Stance[] = parties.flatMap((p) =>
    p.positions.map((pos, i) => ({
      partyId: p.id,
      questionId: `s${i + 1}`,
      programme:
        pos === null
          ? null
          : { position: pos, status: "verificado" as const, confidence: "alta" as const, quote: "x", source: { url: "https://example.org", title: "x", year: 2023 } },
      record: null,
    })),
  );
  return {
    version: "test",
    parties: parties.map((p) => ({ ...ds.parties[0], id: p.id, name: p.name ?? p.id })) as Party[],
    questions,
    stances,
  };
}

describe("afinidad: esquema y fixture", () => {
  it("el fixture sintético valida contra el esquema", () => {
    const r = validateDataset(ds);
    expect(r.ok ? [] : r.errors).toEqual([]);
  });

  it("test 8: rechaza lo verificado sin cita, sin URL o con URL de votación que no cuadra", () => {
    const withCell = (patch: (s: Stance) => Stance): Dataset => ({
      ...ds,
      stances: ds.stances.map((s, i) => (i === 0 ? patch(s) : s)),
    });
    const bad: Dataset[] = [
      withCell((s) => ({ ...s, programme: { ...s.programme!, quote: "" } })),
      withCell((s) => ({ ...s, programme: { ...s.programme!, source: { url: "", title: "x", year: 2023 } } })),
      withCell((s) => ({ ...s, programme: { ...s.programme!, source: { url: "https://example.org/p.pdf", title: "x" } } })),
      withCell((s) => ({ ...s, record: { ...s.record!, evidence: [] } })),
      withCell((s) => ({
        ...s,
        record: { ...s.record!, evidence: [{ ...(s.record!.evidence[0] as VoteEvidence), url: "https://example.org/votacion" }] },
      })),
      withCell((s) => ({
        ...s,
        record: { ...s.record!, evidence: [{ ...(s.record!.evidence[0] as VoteEvidence), session: 1 }] },
      })),
      withCell((s) => ({ ...s, programme: { ...s.programme!, status: "contested" } })),
      withCell((s) => ({ ...s, programme: { ...s.programme!, status: "pendiente", note: "" } })),
      withCell((s) => ({ ...s, programme: { ...s.programme!, position: 3 as unknown as Position } })),
      withCell((s) => ({ ...s, record: { ...s.record!, evidence: [{ ...(s.record!.evidence[0] as VoteEvidence), groupVote: "ausente" }] } })),
      { ...ds, stances: [...ds.stances, ds.stances[0]] },
      { ...ds, quotes: [{ ...ds.quotes![0], text: Array(51).fill("palabra").join(" ") }] },
      { ...ds, parties: [{ ...ds.parties[0], status: "quizá" as unknown as Party["status"] }, ...ds.parties.slice(1)] },
    ];
    for (const d of bad) expect(validateDataset(d).ok).toBe(false);
  });

  it("test 8: pendiente y sin-posicion no influyen en el cálculo", () => {
    expect(checkSchemaAndExclusion(ds).problems).toEqual([]);
  });
});

describe("afinidad: métrica direccional", () => {
  it("tabla exacta: (1 − |u − p| / 4) × lado (1 mismo lado, ½ partido en 0, 0 contrario)", () => {
    // Filas: respuesta −2, −1, +1, +2; columnas: partido −2, −1, 0, +1, +2.
    const table = USER_POSITIONS.map((u) => PARTY_POSITIONS.map((p) => agreement(u, p)));
    expect(table).toEqual([
      [1, 0.75, 0.25, 0, 0],
      [0.75, 1, 0.375, 0, 0],
      [0, 0, 0.375, 1, 0.75],
      [0, 0, 0.25, 0.75, 1],
    ]);
    // Posiciones no enteras (media de `contested`): misma regla.
    expect(agreement(2, 1.5)).toBe(0.875);
    expect(agreement(1, -0.5)).toBe(0);
    expect(SAME_SIDE_FACTOR).toBe(1);
    expect(NEUTRAL_PARTY_FACTOR).toBe(0.5);
    expect(OPPOSITE_SIDE_FACTOR).toBe(0);
  });

  it("simétrica al cambiar de signo, y el centro nunca supera al mismo lado", () => {
    for (const u of USER_POSITIONS)
      for (const p of PARTY_POSITIONS) {
        expect(agreement(-u, -p)).toBe(agreement(u, p));
        if (p !== 0 && Math.sign(p) === Math.sign(u)) expect(agreement(u, p)).toBeGreaterThan(agreement(u, 0));
        if (p !== 0 && Math.sign(p) !== Math.sign(u)) expect(agreement(u, p)).toBeLessThan(agreement(u, 0));
      }
  });

  it("la intensidad cuenta: ±1 frente a ±2 cambia la cifra de forma visible", () => {
    // Entre «a favor» y «muy a favor» hay al menos 20 puntos de acuerdo (antes, 12,5).
    expect(agreement(2, 2) - agreement(2, 1)).toBeGreaterThanOrEqual(0.2);
    // Y una abstención vale menos para quien opina con fuerza.
    expect(agreement(1, 0) - agreement(2, 0)).toBeGreaterThanOrEqual(0.1);
    // Partido «muy a favor» de todo: quien responde «muy a favor» a 15 preguntas
    // le da ≥ 15 puntos más que quien responde «a favor» a las mismas.
    const d = makeDataset(15, [
      { id: "fuerte", name: "Aaa", positions: Array(15).fill(2) },
      { id: "suave", name: "Zzz", positions: Array(15).fill(1) },
    ]);
    const all = (v: UserPosition): Answers => Object.fromEntries(d.questions.map((q) => [q.id, a(v)]));
    const strong = computeAffinity(all(2), d, "programme");
    const mild = computeAffinity(all(1), d, "programme");
    const score = (r: typeof strong, id: string) => r.ranking.find((e) => e.partyId === id)!.score!;
    expect(score(strong, "fuerte") - score(mild, "fuerte")).toBeGreaterThanOrEqual(0.15);
    // Y el orden se invierte: con ±2 va delante el partido ±2; con ±1, el ±1.
    expect(strong.ranking[0].partyId).toBe("fuerte");
    expect(mild.ranking[0].partyId).toBe("suave");
  });

  it("exporta las constantes que cita la metodología", () => {
    expect(MIN_LENS_ITEMS).toBe(5);
    expect(MIN_ANSWERS).toBe(8);
    expect(IMPORTANT_WEIGHT).toBe(2);
  });

  it("contested puntúa con la media del codificador y el revisor", () => {
    const r = computeAffinity(all(1), ds, "programme");
    const b = r.ranking.find((e) => e.partyId === "partido-b")!;
    expect(b.details.find((d) => d.questionId === "q5")!.position).toBe(1);
  });

  it("«Esto me importa» pesa el doble", () => {
    // A en programa: q1 +2, q2 −1. Con +2 en ambas: 1 y 0. Si q1 importa, (2·1+0)/3.
    const answers: Answers = { q1: a(2, true), q2: a(2), q3: "skip", q4: "skip", q5: "skip" };
    const r = computeAffinity(answers, ds, "programme", { minAnswers: 2 });
    // Media (2·1 + 0)/3, encogida hacia 0,5 con K respuestas neutras.
    expect(r.ranking.find((e) => e.partyId === "partido-a")!.score).toBeCloseTo(shrunkMean(2, 3));
  });
});

describe("afinidad: tests 1–4 (neutralidad del motor)", () => {
  it.each(LENSES)("test 1: el votante perfecto de cada partido lo pone 1.º al 100 %  (%s)", (lens) => {
    const r = checkPerfectVoter(ds, lens, SMALL);
    expect(r.problems).toEqual([]);
  });

  it("test 1: partidos indistinguibles se señalan", () => {
    const twin = makeDataset(4, [
      { id: "x", positions: [2, -1, 1, -2] },
      { id: "y", positions: [2, -1, 1, -2] },
      { id: "z", positions: [-2, 1, -1, 2] },
    ]);
    const r = checkPerfectVoter(twin, "programme", SMALL);
    expect(r.ok).toBe(false);
    expect(r.indistinguishable).toContainEqual(["x", "y"]);
  });

  it.each(LENSES)("test 2: el votante opuesto deja al partido el último entre usables (%s)", (lens) => {
    expect(checkOppositeVoter(ds, lens, SMALL).problems).toEqual([]);
  });

  it.each(["programme", "record", "combined"] as const)("test 3: invertir signos no cambia el ranking (%s)", (mode) => {
    const rnd = seededRandom(3);
    const list = Array.from({ length: 50 }, () => randomAnswers(ds, rnd, "uniform"));
    list.push(all(2), all(-1));
    expect(checkSymmetry(ds, list, mode).problems).toEqual([]);
  });

  it.each(["programme", "record", "combined"] as const)("test 4: responder igual a todo no da ganador claro (%s)", (mode) => {
    expect(checkResponseStyle(ds, mode).problems).toEqual([]);
  });

  it("3 posiciones coincidentes no superan a 15 al 90 %", () => {
    const d = makeDataset(15, [
      // 3 celdas, todas iguales a la respuesta: 100 % sobre el 20 % de cobertura.
      { id: "pocas", name: "Aaa", positions: [2, 2, 2, ...Array(12).fill(null)] },
      // 15 celdas: 9 × (+2) y 6 × (+1) → (9 + 6·0,75)/15 = 0,9.
      { id: "muchas", name: "Zzz", positions: [...Array(9).fill(2), ...Array(6).fill(1)] },
    ]);
    const answers: Answers = Object.fromEntries(d.questions.map((q) => [q.id, a(2)]));
    const r = computeAffinity(answers, d, "programme");
    expect(r.ranking[0].partyId).toBe("muchas");
    // 0,9 sin encoger; con K respuestas neutras, (13,5 + K·0,5)/(15 + K).
    expect(r.ranking[0].score).toBeCloseTo(shrunkMean(13.5, 15));
    const pocas = r.ranking.find((e) => e.partyId === "pocas")!;
    expect(pocas.score).toBeCloseTo(shrunkMean(3, 3));
    expect(pocas.usable).toBe(false);
  });
});

describe("afinidad: mínimo de respuestas con dato por lente (MIN_LENS_ITEMS)", () => {
  // 15 preguntas, todas respondidas +2. La cifra se enseña desde 5 respuestas
  // con dato, sea cual sea el porcentaje de cobertura.
  const fifteen = (positions: (Position | null)[]) => positions.concat(Array(15 - positions.length).fill(null));
  const d = makeDataset(15, [
    { id: "cuatro", name: "Aaa", positions: fifteen([2, 2, 2, 2]) },
    { id: "cinco", name: "Bbb", positions: fifteen([2, 2, 2, 2, 1]) },
    // 9 × (+2) y 6 × (+1): (9 + 6·0,75)/15 = 0,9 sin encoger.
    { id: "quince", name: "Zzz", positions: [...Array(9).fill(2), ...Array(6).fill(1)] },
  ]);
  const answers: Answers = Object.fromEntries(d.questions.map((q) => [q.id, a(2)]));

  it("con 5 respuestas con dato hay cifra (aunque sea un 33 % de cobertura); con 4, «datos insuficientes»", () => {
    const r = computeAffinity(answers, d, "programme");
    const cinco = r.ranking.find((e) => e.partyId === "cinco")!;
    const cuatro = r.ranking.find((e) => e.partyId === "cuatro")!;
    expect(cinco.usable).toBe(true);
    expect(cinco.items).toBe(5);
    expect(cinco.coverage).toBeCloseTo(5 / 15);
    expect(cuatro.usable).toBe(false);
    expect(cuatro.items).toBe(4);
    // Los «datos insuficientes» van detrás aunque su porcentaje sea del 100 %.
    expect(r.ranking[r.ranking.length - 1].partyId).toBe("cuatro");
  });

  it("con el encogimiento, 5 de 5 coincidencias no llegan al 100 % ni ganan a 15 al 90 %", () => {
    const r = computeAffinity(answers, d, "combined");
    // cinco: (4 + 0,75)/5 = 0,95 sin encoger; quince: 0,9. Encogidas, quince va delante.
    expect(r.ranking.filter((e) => e.usable).map((e) => e.partyId)).toEqual(["quince", "cinco"]);
    const pair = makeDataset(15, [
      { id: "pocos", name: "Aaa", positions: fifteen([2, 2, 2, 2, 2]) },
      { id: "muchos", name: "Zzz", positions: [...Array(9).fill(2), ...Array(6).fill(1)] },
    ]);
    const rp = computeAffinity(answers, pair, "combined");
    const pocos = rp.ranking.find((e) => e.partyId === "pocos")!;
    expect(pocos.score).toBeCloseTo(shrunkMean(5, 5));
    expect(pocos.score!).toBeLessThan(1);
    expect(rp.ranking[0].partyId).toBe("muchos");
  });

  it("la fórmula de encogimiento: (Σ w·acuerdo + K·0,5) / (Σ w + K), y K = 0 es la media simple", () => {
    expect(SHRINK_K).toBe(3);
    expect(shrunkMean(5, 5)).toBeCloseTo((5 + 1.5) / 8);
    expect(shrunkMean(15, 15)).toBeCloseTo((15 + 1.5) / 18);
    expect(shrunkMean(0, 5)).toBeCloseTo(1.5 / 8);
    const r = computeAffinity(answers, d, "programme", { shrinkK: 0 });
    expect(r.ranking.find((e) => e.partyId === "cinco")!.score).toBeCloseTo(4.75 / 5);
  });
});

describe("afinidad: tests 5–7 (equilibrio del dataset, sobre el fixture)", () => {
  it.each(LENSES)("test 5: cada ítem tiene partidos a ambos lados (%s)", (lens) => {
    // Con 3 partidos el mínimo realista es 1 por lado; el dataset real usa 2.
    expect(checkItemBalance(ds, lens, 1).problems).toEqual([]);
    expect(checkItemBalance(ds, lens, 2).ok).toBe(false);
  });

  it.each(LENSES)("test 6: ningún partido tiene todo del mismo signo (%s)", (lens) => {
    expect(checkPartyBalance(ds, lens).problems).toEqual([]);
  });

  it.each(LENSES)("test 7: cobertura por bloque dentro de ±20 %% (%s)", (lens) => {
    expect(checkBlocCoverage(ds, lens).problems).toEqual([]);
  });

  it("dominancia: la simulación reparte victorias y es repetible", () => {
    const r1 = checkDominance(ds, { n: 500, seed: 1 });
    const r2 = checkDominance(ds, { n: 500, seed: 1 });
    expect(r1.shares).toEqual(r2.shares);
    for (const profile of ["uniform", "moderate"] as const) {
      const total = Object.values(r1.shares[profile]).reduce((s, x) => s + x, 0) + r1.noWinner[profile];
      expect(total).toBeCloseTo(1);
    }
    // Sobre 3 partidos ficticios el umbral de 35 % no es alcanzable: solo se
    // avisa. El test del dataset real (WP5) falla con STRICT=1.
    if (!r1.ok) console.warn(`[afinidad fixture] dominancia: ${r1.problems.join("; ")}`);
  });

  it("dominancia y votante perfecto: un partido sin cobertura no compite y no «falla»", () => {
    // «vacio» solo tiene 2 de 8 posiciones: sale «datos insuficientes» para
    // todo el mundo. Antes contaba como «gana al 0 %» y como votante perfecto
    // sin datos; ahora se lista aparte y los umbrales se aplican al resto.
    const d = makeDataset(8, [
      { id: "x", positions: [2, -1, 1, -2, 2, -1, 1, -2] },
      { id: "y", positions: [-2, 1, -1, 2, -2, 1, -1, 2] },
      { id: "w", positions: [1, 2, -2, -1, 1, 2, -2, -1] },
      { id: "vacio", positions: [2, 2, null, null, null, null, null, null] },
    ]);
    const dom = checkDominance(d, { n: 400, mode: "programme" });
    expect(dom.notComparable).toEqual(["vacio"]);
    expect(dom.comparable).toEqual(["x", "y", "w"]);
    expect(dom.shares.uniform.vacio).toBe(0);
    expect(dom.problems.join()).not.toMatch(/vacio/);
    const pv = checkPerfectVoter(d, "programme");
    expect(pv.notComparable).toEqual(["vacio"]);
    expect(pv.problems.join()).not.toMatch(/vacio/);
    // En el modo combinado basta con que una de las dos lentes tenga cobertura.
    expect(comparableParties(d, "combined")).toEqual(["x", "y", "w"]);
    expect(comparableParties(d, "record")).toEqual([]);
  });

  it("los umbrales de equidad son constantes exportadas (la metodología las cita)", () => {
    expect([DOMINANCE_MAX_SHARE, DOMINANCE_MIN_SHARE, DOMINANCE_USERS]).toEqual([0.35, 0.02, 10_000]);
    expect([BLOC_COVERAGE_TOLERANCE, RESPONSE_STYLE_MAX_GAP, ITEM_MIN_PER_SIDE]).toEqual([0.2, 0.15, 2]);
  });

  it("dominancia: detecta un partido que gana siempre", () => {
    const lopsided = makeDataset(8, [
      { id: "p", positions: [2, 2, 2, 2, 2, 2, 2, 2] },
      { id: "q", positions: [2, 2, 2, 2, 2, 2, 2, 2] },
      { id: "r", positions: [2, 2, 2, 2, 2, 2, 2, -2] },
    ]);
    expect(checkDominance(lopsided, { n: 300, mode: "programme" }).ok).toBe(false);
  });
});

describe("afinidad: test 9 (huecos, cobertura y empates)", () => {
  it("saltar no finge moderación: no es lo mismo que responder", () => {
    const base: Answers = { q1: a(2), q2: a(-1), q3: a(1), q4: a(-2), q5: a(1) };
    const withSkip: Answers = { ...base, q5: "skip" };
    const full = computeAffinity(base, ds, "record");
    const skipped = computeAffinity(withSkip, ds, "record", { minAnswers: 4 });
    expect(full.answered).toBe(5);
    expect(skipped.answered).toBe(4);
    // A en hechos: q1..q4 casi idénticos a sus respuestas; q5 saltada no le resta ni le suma.
    const aFull = full.ranking.find((e) => e.partyId === "partido-a")!;
    const aSkip = skipped.ranking.find((e) => e.partyId === "partido-a")!;
    expect(aSkip.details.map((d) => d.questionId)).toEqual(["q1", "q2", "q3", "q4"]);
    expect(aSkip.score).not.toBe(aFull.score);
  });

  it("un hueco baja la cobertura, no la afinidad; con menos respuestas con dato que el mínimo no es usable", () => {
    // C no tiene hechos en q2 (pendiente): 4 de 5. El fixture tiene 5
    // preguntas, así que el mínimo es min(MIN_LENS_ITEMS, 5) = 5: C se queda corto.
    const r = computeAffinity(all(1), ds, "record");
    const c = r.ranking.find((e) => e.partyId === "partido-c")!;
    expect(c.coverage).toBeCloseTo(0.8);
    expect(c.items).toBe(4);
    expect(c.usable).toBe(false);
    expect(c.score).not.toBeNull();
    // Con un mínimo de 4 respuestas, 4 con dato bastan.
    const r4 = computeAffinity(all(1), ds, "record", { minAnswers: 4 });
    expect(r4.ranking.find((e) => e.partyId === "partido-c")!.usable).toBe(true);
    // A no tiene programa en q5 y C... respondiendo solo q2, q5: A cubre 1/2.
    const few = computeAffinity({ q2: a(1), q5: a(1) }, ds, "programme", { minAnswers: 2 });
    const aEntry = few.ranking.find((e) => e.partyId === "partido-a")!;
    expect(aEntry.coverage).toBe(0.5);
    expect(aEntry.usable).toBe(false);
    expect(aEntry.score).not.toBeNull();
    expect(few.ranking[few.ranking.length - 1].partyId).toBe("partido-a");
  });

  it("sin el mínimo de respuestas nadie es usable", () => {
    const r = computeAffinity({ q1: a(2), q2: a(2) }, ds, "programme");
    expect(r.enoughAnswers).toBe(false);
    expect(r.ranking.every((e) => !e.usable)).toBe(true);
    const none = computeAffinity({}, ds, "programme");
    expect(none.ranking.every((e) => e.score === null && !e.usable)).toBe(true);
  });

  it("los empates son exactos, se marcan y se resuelven igual siempre", () => {
    const d = makeDataset(4, [
      { id: "zeta", name: "Zeta", positions: [2, 1, -1, -2] },
      { id: "alfa", name: "Alfa", positions: [2, 1, -1, -2] },
      { id: "otro", name: "Otro", positions: [-2, -1, 1, 2] },
    ]);
    const answers: Answers = { s1: a(2), s2: a(1), s3: a(-1), s4: a(-2) };
    const r1 = computeAffinity(answers, d, "programme");
    const r2 = computeAffinity(answers, { ...d, parties: [...d.parties].reverse() }, "programme");
    expect(r1.ranking.map((e) => e.partyId)).toEqual(["alfa", "zeta", "otro"]);
    expect(r2.ranking.map((e) => e.partyId)).toEqual(["alfa", "zeta", "otro"]);
    expect(r1.ranking[0].tie && r1.ranking[1].tie).toBe(true);
    expect(r1.ranking[2].tie).toBe(false);
  });

  it("combined promedia programa y hechos y dice de qué sale", () => {
    const answers = all(1);
    const p = computeAffinity(answers, ds, "programme");
    const rec = computeAffinity(answers, ds, "record");
    const c = computeAffinity(answers, ds, "combined");
    for (const e of c.ranking) {
      const ps = p.ranking.find((x) => x.partyId === e.partyId)!;
      const rs = rec.ranking.find((x) => x.partyId === e.partyId)!;
      if (ps.usable && rs.usable) {
        expect(e.basis).toBe("ambas");
        expect(e.score).toBeCloseTo((ps.score! + rs.score!) / 2);
      }
    }
    // Sin historial, solo programa.
    const noRecord: Dataset = { ...ds, stances: ds.stances.map((s) => ({ ...s, record: null })) };
    const only = computeAffinity(answers, noRecord, "combined");
    expect(only.ranking.every((e) => e.basis === "programa")).toBe(true);
  });

  it("filtra por partidos visibles", () => {
    const r = computeAffinity(all(1), ds, "programme", { partyIds: ["partido-b", "no-existe"] });
    expect(r.ranking.map((e) => e.partyId)).toEqual(["partido-b"]);
  });
});

describe("afinidad: tarjetas del resultado", () => {
  it("coherencia y promesa vs. hechos", () => {
    expect(coherence("partido-a", ds)).toEqual({ value: 1 - 0.25 / 4, items: 4 });
    const b = promiseVsRecord(ds, "partido-b");
    expect(b.items).toBe(5);
    expect(b.mismatches.map((m) => m.questionId)).toEqual(["q5"]);
    expect(promiseVsRecord(ds, "partido-c").mismatches.map((m) => m.questionId)).toEqual(["q5"]);
    expect(promiseVsRecord(ds, "partido-a").mismatches).toEqual([]);
    expect(coherence("no-existe", ds)).toEqual({ value: null, items: 0 });
  });

  it("contradicciones: mayor distancia primero, solo con dato y sin partidos en 0", () => {
    // Respuestas de A en programa; B le contradice en casi todo.
    const answers: Answers = { q1: a(2), q2: a(-1, true), q3: a(1), q4: a(-2), q5: a(-2) };
    const c = contradictions(answers, ds, "partido-b");
    expect(c).toHaveLength(3);
    expect(c[0].distance).toBe(4);
    expect(c.every((x) => x.distance >= 2)).toBe(true);
    expect(contradictions(answers, ds, "partido-a")).toEqual([]);
  });

  it("tu sorpresa: partido de otro bloque que coincide más en una pregunta", () => {
    const answers: Answers = { q1: a(2), q2: a(1), q3: a(1), q4: a(-2), q5: a(1) };
    const r = computeAffinity(answers, ds, "programme");
    const s = surprise(r, ds, "izquierda", "partido-a")!;
    expect(s.referencePartyId).toBe("partido-a");
    expect(["partido-b", "partido-c"]).toContain(s.partyId);
    expect(s.agreement).toBeGreaterThan(s.referenceAgreement);
    // Sin bloque declarado: el del 1.º del ranking.
    const s2 = surprise(r, ds, undefined);
    expect(s2?.referencePartyId).toBe(r.ranking[0].partyId);
  });
});

/**
 * «Tu sorpresa» con alcance. Caso real que lo motivó: alguien en contra de
 * subir impuestos en general, pero a favor del impuesto a grandes patrimonios,
 * leía «En impuestos coincides más con X» por UNA pregunta. Ahora eso es una
 * «medida»; el tema solo cuando se gana en dos o más preguntas del tema y en
 * la media.
 */
describe("afinidad: alcance de «Tu sorpresa»", () => {
  // s1–s3: tema «impuestos»; s4: otro tema. X (izquierda) a favor de todo;
  // R (derecha, tu referencia) en contra de todo.
  const build = (): Dataset => {
    const d = makeDataset(4, [
      { id: "x", positions: [2, 2, 2, 2] },
      { id: "r", positions: [-2, -2, -2, -2] },
    ]);
    return {
      ...d,
      questions: d.questions.map((q, i) => ({ ...q, topic: i < 3 ? "impuestos" : "defensa" })),
      parties: d.parties.map((p) => ({ ...p, bloc: p.id === "x" ? ("izquierda" as const) : ("derecha" as const) })),
    };
  };

  it("una sola pregunta ganada en el tema: «medida», con la coincidencia del tema entero", () => {
    const d = build();
    // A favor solo del primer impuesto; en contra de los otros dos.
    const answers: Answers = { s1: a(2), s2: a(-2), s3: a(-2), s4: a(-2) };
    const r = computeAffinity(answers, d, "programme", SMALL);
    const s = surprise(r, d, "derecha", "r")!;
    expect(s.partyId).toBe("x");
    expect(s.questionId).toBe("s1");
    expect(s.scope).toBe("medida");
    expect(s.questionIds).toEqual(["s1"]);
    // En el tema, X coincide en 1 de 3 y R en 2 de 3.
    expect(s.topicAgreement.party).toBeCloseTo(1 / 3);
    expect(s.topicAgreement.reference).toBeCloseTo(2 / 3);
  });

  it("dos o más preguntas ganadas y mejor media en el tema: «tema»", () => {
    const d = build();
    const answers: Answers = { s1: a(2), s2: a(2), s3: a(-2), s4: a(-2) };
    const s = surprise(computeAffinity(answers, d, "programme", SMALL), d, "derecha", "r")!;
    expect(s.scope).toBe("tema");
    expect([...s.questionIds].sort()).toEqual(["s1", "s2"]);
    expect(s.topicAgreement.party!).toBeGreaterThan(s.topicAgreement.reference!);
  });

  it("dos preguntas ganadas pero peor media en el tema: sigue siendo «medida»", () => {
    // Cuatro preguntas del tema; X gana en dos por poco y pierde dos por mucho.
    const d0 = makeDataset(5, [
      { id: "x", positions: [1, 1, 2, 2, 0] },
      { id: "r", positions: [2, 2, -1, -1, 0] },
    ]);
    const d: Dataset = {
      ...d0,
      questions: d0.questions.map((q, i) => ({ ...q, topic: i < 4 ? "impuestos" : "defensa" })),
      parties: d0.parties.map((p) => ({ ...p, bloc: p.id === "x" ? ("izquierda" as const) : ("derecha" as const) })),
    };
    // Tú: +1 en s1–s2 (X a +1 coincide de lleno; R a +2, algo menos) y −2 en s3–s4.
    const answers: Answers = { s1: a(1), s2: a(1), s3: a(-2), s4: a(-2), s5: a(1) };
    const s = surprise(computeAffinity(answers, d, "programme", SMALL), d, "derecha", "r")!;
    expect(s.questionIds.length).toBeGreaterThanOrEqual(2);
    expect(s.topicAgreement.party!).toBeLessThan(s.topicAgreement.reference!);
    expect(s.scope).toBe("medida");
  });
});

describe("afinidad: frase de «Tu sorpresa»", () => {
  const t = getResultStrings("es");
  it("medida: nombra la medida y añade el contexto del tema", () => {
    const out = surpriseSentence(
      t,
      { scope: "medida", topic: "impuestos", topicAgreement: { party: 1 / 3, reference: 2 / 3 } },
      { party: "X", ref: "R", label: "impuesto a patrimonios >10 M€" },
    );
    expect(out.main).toBe("En «impuesto a patrimonios >10 M€» coincides más con X que con R.");
    expect(out.context).toBe(
      "Es una medida concreta. En el conjunto de impuestos coincides un 33\u202f% con X y un 67\u202f% con R.",
    );
  });

  it("tema: nombra el tema con las dos cifras", () => {
    const out = surpriseSentence(
      t,
      { scope: "tema", topic: "modelo-territorial", topicAgreement: { party: 0.8, reference: 0.4 } },
      { party: "X", ref: "R", label: "—" },
    );
    expect(out.main).toBe("En modelo territorial coincides más con X que con R (80\u202f% frente a 40\u202f%).");
    expect(out.context).toBeNull();
  });

  it("sin coincidencia de tema calculable: solo la medida; sin `label`, el enunciado", () => {
    const out = surpriseSentence(
      t,
      { scope: "medida", topic: "impuestos", topicAgreement: { party: null, reference: 0.5 } },
      { party: "X", ref: "R", label: measureLabel({ text: { es: "Enunciado completo." } }, "ca") },
    );
    expect(out.main).toContain("«Enunciado completo.»");
    expect(out.context).toBeNull();
    // Etiqueta solo en castellano: el catalán cae a ella.
    expect(measureLabel({ label: "corta", text: { es: "larga", ca: "llarga" } }, "ca")).toBe("corta");
    // Tema sin traducir: identificador legible.
    expect(topicLabel(t, "tema-nuevo")).toBe("tema nuevo");
  });
});

describe("afinidad: selección de partidos", () => {
  it("los regionales solo salen en su comunidad o con «ver todos»", () => {
    expect(visiblePartyIds(ds.parties)).toEqual(["partido-a", "partido-b"]);
    expect(visiblePartyIds(ds.parties, "01")).toEqual(["partido-a", "partido-b"]);
    expect(visiblePartyIds(ds.parties, "09")).toEqual(["partido-a", "partido-b", "partido-c"]);
    expect(visiblePartyIds(ds.parties, null, { showAll: true })).toHaveLength(3);
    expect(visiblePartyIds(ds.parties, null, { include: ["partido-c"] })).toHaveLength(3);
    expect(hiddenCount(ds.parties, "01")).toBe(1);
  });
});

describe("afinidad: test 10 (enlace)", () => {
  const qs = ds.questions;

  it("ida y vuelta, con importancia y saltos", () => {
    const answers: Answers = { q1: a(-2), q2: a(-1, true), q3: "skip", q4: a(1), q5: a(2, true) };
    const raw = encodeAnswers(answers, qs);
    // Bits 1 y 4 → 2 + 16 = 18, que en base 36 es «i».
    expect(raw).toBe("01s23.i");
    expect(decodeAnswers(raw, qs)).toEqual(answers);
    // Lo no respondido viaja como saltado.
    expect(decodeAnswers(encodeAnswers({ q1: a(1) }, qs), qs)).toEqual({
      q1: a(1),
      q2: "skip",
      q3: "skip",
      q4: "skip",
      q5: "skip",
    });
  });

  it("el orden lo da `order`, no la posición en el array", () => {
    const shuffled = [...qs].reverse();
    const answers: Answers = { q1: a(-2), q2: a(-1), q3: a(1), q4: a(2), q5: "skip" };
    expect(encodeAnswers(answers, shuffled)).toBe(encodeAnswers(answers, qs));
  });

  it.each([
    null,
    undefined,
    "",
    "01s23",
    "01s2.0",
    "01s234.0",
    "01s24.0", // 4 ya no existe: escala de 4 puntos
    "01x23.0",
    "01s23.00", // ceros a la izquierda: dos enlaces para lo mismo
    "01s23.v", // 31: bits fuera de rango
    "01s23.4", // bit 2 = pregunta saltada marcada como importante
    "01s23.-1",
    "01s23.i.i",
  ])("rechaza entradas corruptas: %s", (raw) => {
    expect(decodeAnswers(raw as string | null, qs)).toBeNull();
  });

  it("parámetros completos: versión, contexto y aviso de versión distinta", () => {
    const answers: Answers = { q1: a(2), q2: a(1), q3: a(-1), q4: a(-2), q5: a(1, true) };
    const params = encodeResultParams({ answers, context: { region: "09", usualVote: "partido-c" } }, qs, "fixture-1");
    expect(params.get("v")).toBe("fixture-1");
    const ok = decodeResultParams(params, qs, { currentVersion: "fixture-1", partyIds: ds.parties.map((p) => p.id) })!;
    expect(ok.answers).toEqual(answers);
    expect(ok.context).toEqual({ region: "09", usualVote: "partido-c" });
    expect(ok.stale).toBe(false);

    // Objeto `searchParams` de una página, con versión antigua y contexto inválido.
    const page = { r: params.get("r")!, v: "2025.1.0", ca: "99", vh: "inventado" };
    const old = decodeResultParams(page, qs, { currentVersion: "fixture-1", partyIds: ["partido-a"] })!;
    expect(old.stale).toBe(true);
    expect(old.version).toBe("2025.1.0");
    expect(old.context).toEqual({});

    expect(decodeResultParams({ r: "basura" }, qs)).toBeNull();
    // Sin contexto declarado («Prefiero no decirlo»), no aparece en el enlace.
    const bare = encodeResultParams({ answers }, qs);
    expect(bare.has("ca") || bare.has("vh")).toBe(false);
  });
});
