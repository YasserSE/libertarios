import { describe, it, expect } from "vitest";
import {
  MAX_ANSWER,
  answerOptions,
  quadrantQuestions,
  scoreQuadrant,
} from "@/data/quadrantQuestions";
import {
  REFERENCE_SETS,
  getReferenceSet,
  nearestReferences,
} from "@/data/quadrantReferences";

const byAxis = (axis: "economic" | "social") =>
  quadrantQuestions.filter((q) => q.axis === axis);

describe("quadrant instrument", () => {
  it("has unique ids and a balanced number of items per axis", () => {
    const ids = quadrantQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(byAxis("economic")).toHaveLength(byAxis("social").length);
  });

  /**
   * The defect that made the old test worthless: 15 of 16 items scored
   * libertarian on agreement, so anyone with a tendency to agree — a well
   * documented response bias — landed in the libertarian quadrant regardless of
   * belief. Keying must stay balanced within each axis.
   */
  it("keys agreement in both directions, evenly, on every axis", () => {
    for (const axis of ["economic", "social"] as const) {
      const items = byAxis(axis);
      const forward = items.filter((q) => q.direction === 1).length;
      const reverse = items.filter((q) => q.direction === -1).length;
      expect(Math.abs(forward - reverse)).toBeLessThanOrEqual(1);
      expect(reverse).toBeGreaterThan(0);
    }
  });

  it("puts a respondent who agrees with everything at the centre, not at an extreme", () => {
    // With balanced keying, blanket agreement must cancel out. Under the old
    // instrument this produced a near-maximum libertarian score.
    const agreeAll = Object.fromEntries(quadrantQuestions.map((q) => [q.id, 2]));
    const score = scoreQuadrant(agreeAll);
    expect(Math.abs(score.economic)).toBeLessThanOrEqual(10);
    expect(Math.abs(score.social)).toBeLessThanOrEqual(10);
  });

  it("reaches +100 only for someone who answers consistently pro-liberty", () => {
    const consistent = Object.fromEntries(
      quadrantQuestions.map((q) => [q.id, q.direction * MAX_ANSWER]),
    );
    expect(scoreQuadrant(consistent)).toMatchObject({ economic: 100, social: 100 });

    const opposite = Object.fromEntries(
      quadrantQuestions.map((q) => [q.id, -q.direction * MAX_ANSWER]),
    );
    expect(scoreQuadrant(opposite)).toMatchObject({ economic: -100, social: -100 });
  });

  /**
   * The old scorer read a missing answer as `answers[id] || 0` and still divided
   * by the full item count, so skipping questions dragged the result toward the
   * centre and made a partial test look moderate.
   */
  it("divides by answered items, so skipping does not fake moderation", () => {
    const oneEach = {
      [byAxis("economic")[0].id]: byAxis("economic")[0].direction * MAX_ANSWER,
      [byAxis("social")[0].id]: byAxis("social")[0].direction * MAX_ANSWER,
    };
    const score = scoreQuadrant(oneEach);
    expect(score).toMatchObject({ economic: 100, social: 100 });
    expect(score.answeredEconomic).toBe(1);
    expect(score.answeredSocial).toBe(1);
  });

  it("returns a neutral position when nothing is answered", () => {
    expect(scoreQuadrant({})).toMatchObject({ economic: 0, social: 0 });
  });

  it("keeps every score inside the quadrant's range", () => {
    for (const option of answerOptions) {
      const all = Object.fromEntries(quadrantQuestions.map((q) => [q.id, option.value]));
      const { economic, social } = scoreQuadrant(all);
      for (const v of [economic, social]) {
        expect(v).toBeGreaterThanOrEqual(-100);
        expect(v).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("quadrant references", () => {
  it("has unique ids across every set", () => {
    const ids = REFERENCE_SETS.flatMap((s) => s.points.map((p) => p.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps every reference inside the plotted range", () => {
    for (const set of REFERENCE_SETS) {
      for (const p of set.points) {
        expect(p.economic).toBeGreaterThanOrEqual(-100);
        expect(p.economic).toBeLessThanOrEqual(100);
        expect(p.social).toBeGreaterThanOrEqual(-100);
        expect(p.social).toBeLessThanOrEqual(100);
      }
    }
  });

  it("states the basis for every set, since the placements are interpretations", () => {
    for (const set of REFERENCE_SETS) {
      expect(set.basis.length).toBeGreaterThan(30);
      expect(set.points.length).toBeGreaterThan(0);
    }
  });

  it("finds the nearest references and can filter by kind", () => {
    const [closest] = nearestReferences({ economic: -100, social: -100 }, { limit: 1 });
    expect(closest.id).toBe("kp");

    const parties = nearestReferences(
      { economic: 90, social: 90 },
      { kinds: ["party-es"], limit: 2 },
    );
    expect(parties).toHaveLength(2);
    expect(parties.every((p) => p.kind === "party-es")).toBe(true);
    expect(parties[0].distance).toBeLessThanOrEqual(parties[1].distance);
  });
});

/**
 * La primera versión de estas coordenadas era generosa: España en +28, Francia
 * en +22, el PP en +45. Dos países con el Estado rondando la mitad del PIB no
 * caen del lado del libre mercado, y ningún partido con representación en el
 * Congreso ha reducido nunca el gasto público. Estas pruebas fijan la
 * calibración estricta para que no se relaje por descuido al añadir puntos.
 */
describe("calibración estricta del eje económico", () => {
  const country = (id: string) =>
    getReferenceSet("country")!.points.find((p) => p.id === id)!;
  const partyEs = (id: string) => getReferenceSet("party-es")!.points.find((p) => p.id === id)!;

  it("sitúa a los Estados grandes en el lado intervencionista", () => {
    // Gasto público sobre PIB: Francia ~57 %, España ~47 %, Italia ~55 %.
    for (const id of ["fr", "es", "it", "de"]) {
      expect(country(id).economic).toBeLessThan(0);
    }
    expect(country("fr").economic).toBeLessThan(country("es").economic);
  });

  it("no deja a ningún país cerca del extremo libertario", () => {
    // Ni siquiera Singapur, el de menor gasto público, merece un +70.
    for (const c of getReferenceSet("country")!.points) {
      expect(c.economic).toBeLessThanOrEqual(60);
    }
  });

  it("reserva el extremo del cuadrante a quien lo defiende de verdad", () => {
    const extremes = REFERENCE_SETS.flatMap((s) => s.points).filter((p) => p.economic >= 80);
    expect(extremes.length).toBeGreaterThan(0);
    // Solo pensadores y el partido explícitamente libertario, nunca un país.
    expect(extremes.every((p) => p.kind !== "country")).toBe(true);
  });

  it("deja claro qué partidos españoles se acercan al liberalismo y cuáles no", () => {
    // El P-LIB es el único explícitamente libertario; Cs fue lo más cerca que
    // llegó al Congreso.
    expect(partyEs("plib").economic).toBeGreaterThan(70);
    expect(partyEs("cs").economic).toBeGreaterThan(20);

    // PP y Vox usan retórica liberal pero gobiernan y proponen Estados grandes.
    for (const id of ["pp", "vox"]) {
      expect(partyEs(id).economic).toBeLessThan(20);
    }
    expect(partyEs("vox").economic).toBeLessThan(partyEs("cs").economic);
  });

  it("da identidad visual a cada referencia", () => {
    for (const set of REFERENCE_SETS) {
      for (const p of set.points) {
        expect(Boolean(p.image || p.emoji || p.initials)).toBe(true);
      }
    }
  });
});

/**
 * Un cuadrante vacío enseña algo falso.
 *
 * Con 12 de 17 pensadores en la esquina libertaria y ninguno en los dos
 * cuadrantes inferiores, el gráfico sugería que nadie con formación económica
 * ha defendido nunca el control social — ni desde la planificación ni desde el
 * mercado. Hay economistas en las cuatro combinaciones y deben verse las cuatro.
 */
describe("cobertura de los cuatro cuadrantes", () => {
  const quadrantOf = (p: { economic: number; social: number }) =>
    `${p.economic >= 0 ? "E+" : "E-"}${p.social >= 0 ? "S+" : "S-"}`;

  it("tiene economistas o figuras en los cuatro cuadrantes", () => {
    const covered = new Set(getReferenceSet("thinker")!.points.map(quadrantOf));
    expect(Array.from(covered).sort()).toEqual(["E+S+", "E+S-", "E-S+", "E-S-"]);
  });

  it("no concentra más de la mitad del conjunto en un solo cuadrante", () => {
    const points = getReferenceSet("thinker")!.points;
    const counts = new Map<string, number>();
    for (const p of points) counts.set(quadrantOf(p), (counts.get(quadrantOf(p)) ?? 0) + 1);
    for (const n of Array.from(counts.values())) {
      expect(n / points.length).toBeLessThanOrEqual(0.6);
    }
  });

  it("cubre también los cuatro cuadrantes con países y con partidos europeos", () => {
    for (const kind of ["country", "party-eu"] as const) {
      const covered = new Set(getReferenceSet(kind)!.points.map(quadrantOf));
      expect(covered.size, `${kind} deja cuadrantes vacíos`).toBe(4);
    }
  });
});
