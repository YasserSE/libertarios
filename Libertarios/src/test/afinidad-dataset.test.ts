import { describe, it, expect } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { dataset, assemblyProblems, mergeStances } from "@/data/afinidad";
import { programmeStanceFiles } from "@/data/afinidad/stances/programme";
import { recordStanceFiles } from "@/data/afinidad/stances/record";
import { quoteFiles } from "@/data/afinidad/hemeroteca";
import { saidVsDidFiles } from "@/data/afinidad/dichos-hechos";
import { dvhSearchLog } from "@/data/afinidad/dichos-hechos/busqueda";
import type { Answers, Lens, Stance } from "@/data/afinidad/types";
import { validateDataset, voteUrlMatches } from "@/lib/afinidad/schema";
import { visiblePartyIds } from "@/lib/afinidad/select";
import {
  checkBlocCoverage,
  checkDominance,
  checkItemBalance,
  checkOppositeVoter,
  checkPartyBalance,
  checkPerfectVoter,
  checkSchemaAndExclusion,
  checkSymmetry,
  randomAnswers,
  seededRandom,
  type CheckResult,
} from "@/lib/afinidad/checks";

/*
 * Las comprobaciones de `checks.ts` sobre el dataset REAL (WP5).
 *
 * Qué falla siempre y qué solo avisa, y por qué:
 * - Esquema (y test 8) y ensamblaje: fallan siempre. Un dato sin fuente o una
 *   celda duplicada no se puede publicar nunca.
 * - Simetría (test 3): falla siempre. No depende de los datos sino del motor:
 *   si invertir signos cambia el ranking, el cálculo trata distinto a un lado.
 * - Votante perfecto/opuesto (1, 2), equilibrio (5, 6, 7) y dominancia: avisan
 *   en local y fallan con `STRICT=1` (CI de publicación). Dependen de que el
 *   dataset esté completo; mientras WP3/WP4 lo rellenan, fallarían por huecos
 *   legítimos. Y si fallan con datos reales, se arregla el cuestionario o se
 *   busca la fuente, nunca tocando posiciones (AFINIDAD-DATOS.md §6).
 */

const STRICT = process.env.STRICT === "1";
const LENSES: Lens[] = ["programme", "record"];
const EMPTY = dataset.parties.length === 0 || dataset.questions.length === 0 || dataset.stances.length === 0;

/** Falla con STRICT=1; si no, deja el problema en la salida del test. */
function soft(name: string, r: CheckResult) {
  if (r.ok) return;
  const msg = `${name}:\n  - ${r.problems.join("\n  - ")}`;
  if (STRICT) expect.fail(msg);
  else console.warn(`[afinidad · aviso, falla con STRICT=1] ${msg}`);
}

/** Une los resultados de varias lentes (los mensajes ya dicen la lente). */
const merge = (rs: CheckResult[]): CheckResult => {
  const problems = rs.flatMap((r) => r.problems);
  return { ok: problems.length === 0, problems };
};

function hard(name: string, r: CheckResult) {
  expect(r.problems, name).toEqual([]);
}

describe("dataset real de afinidad · esquema", () => {
  it("pasa validateDataset", () => {
    const v = validateDataset(dataset);
    expect(v.ok ? [] : v.errors).toEqual([]);
  });

  it("los ficheros de programa y hechos se unen sin conflictos", () => {
    expect(assemblyProblems).toEqual([]);
  });

  /*
   * Un fichero de datos que existe pero no está en su índice no llega al
   * dataset y, por tanto, tampoco pasa por validateDataset: sus errores (p. ej.
   * una URL de votación de otra sesión) quedarían escondidos hasta el día que
   * alguien lo registre. Por eso se exige que todos estén registrados.
   */
  it.each([
    ["stances/programme", programmeStanceFiles, "stances"],
    ["stances/record", recordStanceFiles, "stances"],
    ["hemeroteca", quoteFiles, "quotes"],
    ["dichos-hechos", saidVsDidFiles, "saidVsDid"],
  ] as const)("todos los ficheros de %s están registrados en su índice", async (dir, registered, exportName) => {
    const base = join(process.cwd(), "src/data/afinidad", dir);
    const files = readdirSync(base).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "busqueda.ts");
    const missing: string[] = [];
    for (const f of files) {
      const mod = (await import(/* @vite-ignore */ join(base, f))) as Record<string, unknown>;
      if (!(registered as readonly unknown[]).includes(mod[exportName])) missing.push(f);
    }
    expect(missing).toEqual([]);
  });

  it("el registro de búsqueda de «Dijeron vs. hicieron» cubre a cada partido con entradas y solo a partidos existentes", () => {
    const ids = new Set(dataset.parties.map((p) => p.id));
    const logged = dvhSearchLog.map((l) => l.partyId);
    expect(logged.filter((id) => !ids.has(id))).toEqual([]);
    expect(new Set(logged).size).toBe(logged.length);
    const withEntries = new Set((dataset.saidVsDid ?? []).map((e) => e.partyId));
    expect(Array.from(withEntries).filter((id) => !logged.includes(id))).toEqual([]);
  });

  it("las votaciones citadas en «Dijeron vs. hicieron» apuntan a la votación de sus campos", () => {
    // Lo valida el esquema (voteEvidenceSchema); se repite aquí para que el
    // mensaje diga qué entrada falla aunque cambie el esquema.
    const bad: string[] = [];
    for (const e of dataset.saidVsDid ?? [])
      for (const ev of e.did.evidence)
        if (ev.kind === "votacion") {
          const err = voteUrlMatches(ev);
          if (err) bad.push(`${e.id}: ${err}`);
        }
    expect(bad).toEqual([]);
  });

  it.skipIf(!EMPTY)("dataset vacío: se omiten las comprobaciones de equilibrio y neutralidad", () => {
    // No es un fallo: WP2–WP4 aún no han entregado datos. En cuanto haya
    // partidos, preguntas y celdas, el bloque de abajo se ejecuta solo.
    console.info("[afinidad] dataset vacío: comprobaciones 1–3, 5–8 y dominancia omitidas.");
    expect(EMPTY).toBe(true);
  });
});

describe.skipIf(EMPTY)("dataset real de afinidad · neutralidad y equilibrio", () => {
  it("test 8: esquema y exclusión de pendiente/sin-posicion", () => {
    hard("test 8", checkSchemaAndExclusion(dataset));
  });

  it("test 3: simetría al invertir signos", () => {
    const rnd = seededRandom(3);
    const answers: Answers[] = Array.from({ length: 50 }, (_, i) =>
      randomAnswers(dataset, rnd, i % 2 ? "uniform" : "moderate"),
    );
    for (const mode of [...LENSES, "combined"] as const) hard(`test 3 (${mode})`, checkSymmetry(dataset, answers, mode));
  });

  it("test 1: votante perfecto de cada partido", () => {
    // Las dos lentes en un solo informe: con STRICT=1 el primer fallo no esconde el segundo.
    const problems: string[] = [];
    for (const lens of LENSES) {
      const r = checkPerfectVoter(dataset, lens);
      if (r.notComparable.length)
        console.info(`[afinidad] test 1 (${lens}): sin datos para votante perfecto: ${r.notComparable.join(", ")}`);
      problems.push(...r.problems.map((x) => `[${lens}] ${x}`));
    }
    soft("test 1", { ok: problems.length === 0, problems });
  });

  it("test 2: votante opuesto de cada partido", () => {
    soft("test 2", merge(LENSES.map((lens) => checkOppositeVoter(dataset, lens))));
  });

  it("test 5: equilibrio por ítem (≥ 2 partidos a cada lado)", () => {
    soft("test 5", merge(LENSES.map((lens) => checkItemBalance(dataset, lens))));
  });

  it("test 6: ningún partido con todo del mismo signo", () => {
    soft("test 6", merge(LENSES.map((lens) => checkPartyBalance(dataset, lens))));
  });

  it("test 7: cobertura por bloque a ±20 % de la media", () => {
    soft("test 7", merge(LENSES.map((lens) => checkBlocCoverage(dataset, lens))));
  });

  it(
    "dominancia: ningún partido gana a > 35 % ni < 2 % de usuarios sintéticos",
    () => {
      const r = checkDominance(dataset);
      const fmt = (o: Record<string, number>) =>
        r.comparable.map((id) => `${id} ${Math.round(o[id] * 1000) / 10} %`).join(", ");
      console.info(
        `[afinidad] dominancia (combinado) · uniforme: ${fmt(r.shares.uniform)}\n` +
          `[afinidad] dominancia (combinado) · moderado: ${fmt(r.shares.moderate)}\n` +
          `[afinidad] sin ganador: uniforme ${r.noWinner.uniform}, moderado ${r.noWinner.moderate}\n` +
          `[afinidad] no comparables (cobertura < umbral en las dos lentes): ${r.notComparable.join(", ") || "—"}`,
      );
      soft("dominancia", r);
    },
    120_000,
  );

  it(
    "dominancia por comunidad (lo que ve cada usuario: estatales + los de su comunidad)",
    () => {
      // La vista con los 32 partidos juntos no existe en la UI: un regional solo
      // sale en su comunidad (select.ts). Esta es la comprobación que importa.
      const problems: string[] = [];
      const regions = [null, ...Array.from({ length: 19 }, (_, i) => String(i + 1).padStart(2, "0"))];
      for (const region of regions) {
        const r = checkDominance(dataset, { partyIds: visiblePartyIds(dataset.parties, region), n: 4000 });
        problems.push(...r.problems.map((x) => `[${region ?? "sin comunidad"}] ${x}`));
      }
      soft("dominancia por comunidad", { ok: problems.length === 0, problems });
    },
    300_000,
  );
});

// El ensamblaje es lógica propia de index.ts: se prueba con celdas mínimas.
describe("mergeStances", () => {
  const prog = (partyId: string, questionId: string, record: Stance["record"] = null): Stance => ({
    partyId,
    questionId,
    programme: {
      position: 1,
      status: "pendiente",
      confidence: "baja",
      quote: "",
      source: { url: "", title: "" },
      note: "prueba",
    },
    record,
  });
  const rec = (partyId: string, questionId: string): Stance => ({
    partyId,
    questionId,
    programme: null,
    record: { position: -1, status: "pendiente", confidence: "baja", evidence: [], note: "prueba" },
  });

  it("une programa y hechos del mismo partido×pregunta en una celda", () => {
    const r = mergeStances([[prog("a", "q1"), prog("a", "q2")]], [[rec("a", "q1")], [rec("b", "q1")]]);
    expect(r.problems).toEqual([]);
    expect(r.stances).toHaveLength(3);
    const a1 = r.stances.find((s) => s.partyId === "a" && s.questionId === "q1");
    expect(a1?.programme?.position).toBe(1);
    expect(a1?.record?.position).toBe(-1);
    expect(r.stances.find((s) => s.partyId === "b")?.programme).toBeNull();
  });

  it("los duplicados no se resuelven en silencio: se avisa y el esquema los ve", () => {
    const r = mergeStances([[prog("a", "q1")], [prog("a", "q1")]], [[rec("a", "q1")], [rec("a", "q1")]]);
    expect(r.problems.length).toBeGreaterThanOrEqual(2);
    expect(r.stances.filter((s) => s.partyId === "a").length).toBeGreaterThan(1);
  });

  it("un fichero que trae la otra mitad se marca", () => {
    const r = mergeStances([[prog("a", "q1", rec("a", "q1").record)]], []);
    expect(r.problems.join(" ")).toMatch(/stances\/record/);
  });
});
