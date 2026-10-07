import { describe, it, expect } from "vitest";
import {
  AFINIDAD_LOCALES,
  LOCALES,
  LOCALE_META,
  SITE_LOCALES,
  isAfinidadPath,
  isLocale,
  localisePath,
  matchLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pick } from "@/i18n/afinidad/lang";
import {
  isPublicationEmbargoed,
  parseSubscribeForm,
  toResponseRow,
} from "@/lib/afinidad/aggregate-rules";
import { encodeResultParams } from "@/lib/afinidad/encode";
import type { Answers, Question } from "@/data/afinidad/types";

/**
 * Infraestructura de «¿A quién votar?» (WP9): veda electoral, validación de
 * la lista de avisos, respuestas anónimas e idiomas gl/eu.
 */

describe("veda de publicación (art. 69.7 LOREG)", () => {
  // Noviembre de 2026 es horario de invierno: Madrid = UTC+1.
  it("empieza el 24-nov a las 00:00 de Madrid, ni un milisegundo antes", () => {
    expect(isPublicationEmbargoed(new Date("2026-11-23T22:59:59.999Z"))).toBe(false);
    expect(isPublicationEmbargoed(new Date("2026-11-23T23:00:00.000Z"))).toBe(true);
  });

  it("dura hasta las 21:00 de Madrid (cierre en Canarias) del día de la votación, inclusive", () => {
    expect(isPublicationEmbargoed(new Date("2026-11-29T20:00:00.000Z"))).toBe(true);
    expect(isPublicationEmbargoed(new Date("2026-11-29T20:00:00.001Z"))).toBe(false);
  });

  it("cubre los días intermedios y no afecta a otras fechas", () => {
    expect(isPublicationEmbargoed(new Date("2026-11-26T12:00:00+01:00"))).toBe(true);
    expect(isPublicationEmbargoed(new Date("2026-11-13T12:00:00+01:00"))).toBe(false); // campaña: se puede
    expect(isPublicationEmbargoed(new Date("2026-11-30T09:00:00+01:00"))).toBe(false);
    expect(isPublicationEmbargoed(new Date("2027-11-26T12:00:00+01:00"))).toBe(false);
  });

  it("ante una fecha inválida, se trata como veda", () => {
    expect(isPublicationEmbargoed(new Date("no es una fecha"))).toBe(true);
  });
});

describe("«Avísame»: validación del formulario", () => {
  const form = (fields: Record<string, string>) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.set(k, v);
    return fd;
  };

  it("acepta correo + casilla marcada y normaliza el correo", () => {
    const r = parseSubscribeForm(form({ email: "  Ana@Ejemplo.ES ", consent: "on", locale: "gl" }));
    expect(r).toEqual({ ok: true, data: { email: "ana@ejemplo.es", consent: "on", locale: "gl" } });
  });

  it("sin consentimiento afirmativo, rechaza (también «false» y vacío)", () => {
    for (const consent of [undefined, "", "false", "off", "1"]) {
      const fields: Record<string, string> = { email: "ana@ejemplo.es" };
      if (consent !== undefined) fields.consent = consent;
      expect(parseSubscribeForm(form(fields))).toEqual({ ok: false, error: "consent-required" });
    }
  });

  it("rechaza correos no válidos con un código, no con una frase", () => {
    for (const email of ["", "ana", "ana@", "@ejemplo.es", `${"a".repeat(250)}@x.es`]) {
      expect(parseSubscribeForm(form({ email, consent: "on" }))).toEqual({ ok: false, error: "invalid-email" });
    }
  });

  it("un idioma fuera de los cuatro cae a castellano en vez de rechazar", () => {
    const r = parseSubscribeForm(form({ email: "ana@ejemplo.es", consent: "on", locale: "pt" }));
    expect(r.ok && r.data.locale).toBe("es");
  });
});

describe("respuesta anónima", () => {
  const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
    id: `q${i + 1}`,
    order: i + 1,
    topic: `T${i + 1}`,
    text: { es: `Afirmación ${i + 1}` },
    rationale: "",
    anchors: [],
  }));
  const opts = { questions, partyIds: ["partido-a", "partido-b"], currentVersion: "test-1" };

  const answers = (answered: number): Answers =>
    Object.fromEntries(
      questions.map((q, i) => [q.id, i < answered ? { value: i % 2 ? 2 : -1, important: i === 0 } : "skip"]),
    ) as Answers;

  it("convierte el enlace en una fila por posición, sin nada más", () => {
    const qs = encodeResultParams(
      { answers: answers(9), context: { region: "13", usualVote: "partido-b" } },
      questions,
      "test-1",
    ).toString();
    const row = toResponseRow(`?${qs}`, opts);
    expect(row).toEqual({
      datasetVersion: "test-1",
      answers: [-1, 2, -1, 2, -1, 2, -1, 2, -1, null],
      important: [true, false, false, false, false, false, false, false, false, false],
      region: "13",
      usualVote: "partido-b",
    });
  });

  it("descarta otra versión, enlaces corruptos y respuestas insuficientes", () => {
    const stale = encodeResultParams({ answers: answers(10) }, questions, "test-0").toString();
    expect(toResponseRow(stale, opts)).toBeNull();
    expect(toResponseRow("r=xx.0&v=test-1", opts)).toBeNull();
    expect(toResponseRow(42, opts)).toBeNull();
    expect(toResponseRow("r=" + "0".repeat(600), opts)).toBeNull();
    const few = encodeResultParams({ answers: answers(7) }, questions, "test-1").toString();
    expect(toResponseRow(few, opts)).toBeNull();
  });

  it("un voto habitual que no es un partido se descarta sin tirar la respuesta", () => {
    const qs = encodeResultParams({ answers: answers(10), context: { usualVote: "inventado" } }, questions, "test-1");
    const row = toResponseRow(qs.toString(), opts);
    expect(row?.usualVote).toBeNull();
    expect(row?.answers).toHaveLength(10);
  });
});

describe("idiomas gl y eu", () => {
  it("son locales válidos del sitio y de afinidad", () => {
    expect(LOCALES).toEqual(expect.arrayContaining(["gl", "eu"]));
    expect(isLocale("gl")).toBe(true);
    expect(isLocale("eu")).toBe(true);
    expect(AFINIDAD_LOCALES).toEqual(["es", "ca", "gl", "eu"]);
    expect(LOCALE_META.gl.htmlLang).toBe("gl-ES");
    expect(LOCALE_META.eu.htmlLang).toBe("eu-ES");
  });

  it("no se ofrecen en el selector del sitio, que no está traducido a ellos", () => {
    expect(SITE_LOCALES).not.toContain("gl");
    expect(SITE_LOCALES).not.toContain("eu");
  });

  it("el diccionario del sitio cae al castellano sin huecos", () => {
    expect(getDictionary("gl")).toEqual(getDictionary("es"));
    expect(getDictionary("eu")).toEqual(getDictionary("es"));
  });

  it("la detección por navegador solo elige gl/eu dentro de /a-quien-votar", () => {
    expect(matchLocale("gl-ES,gl;q=0.9,es;q=0.8")).toBe("es");
    expect(matchLocale("eu,en;q=0.5")).toBe("es");
    expect(matchLocale("gl-ES,gl;q=0.9,es;q=0.8", AFINIDAD_LOCALES)).toBe("gl");
    expect(matchLocale("eu,es;q=0.5", AFINIDAD_LOCALES)).toBe("eu");
    expect(matchLocale("pt-PT,pt;q=0.9", AFINIDAD_LOCALES)).toBe("es");
    expect(matchLocale("pt-BR")).toBe("pt");
  });

  it("reconoce las rutas del módulo con y sin idioma", () => {
    expect(isAfinidadPath("/a-quien-votar")).toBe(true);
    expect(isAfinidadPath("/eu/a-quien-votar/resultado")).toBe(true);
    expect(isAfinidadPath("/gl/spain")).toBe(false);
    expect(localisePath("/es/a-quien-votar/test", "eu")).toBe("/eu/a-quien-votar/test");
  });
});

describe("pick", () => {
  const table = { es: "Hola", ca: "Hola", gl: "Ola" };
  it("devuelve el idioma pedido y cae a castellano si falta", () => {
    expect(pick(table, "gl")).toBe("Ola");
    expect(pick(table, "eu")).toBe("Hola");
    expect(pick(table, "de")).toBe("Hola");
    expect(pick({ es: 0, eu: 0 }, "eu")).toBe(0);
  });
});
