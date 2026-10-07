import { describe, it, expect } from "vitest";
import type { DeputyAttribution, Party } from "@/data/afinidad/types";
import {
  attributeDeputy,
  checkVoteInfo,
  findVoteFiles,
  formatVoteReport,
  isCongresoVoteJson,
  majority,
  normalizeVote,
  parseCongresoDate,
  parseVoteUrl,
  tallyByGroup,
  tallyByParty,
  type CongresoVoteJson,
} from "../../scripts/lib/congreso-vote";
import { parties as realParties } from "@/data/afinidad/parties";
import { deputies as realDeputies } from "@/data/afinidad/deputies";
import { parseRobots } from "../../scripts/lib/polite-fetch";
import real from "./fixtures/congreso-votacion-leg15-s202-v001.json";

/*
 * Recuento de votaciones con una respuesta REAL del Congreso, guardada tal
 * cual el 2026-10-06:
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion202/20260930/Votacion001/VOT_20260930153547.json
 * (PNL del GP sobre el Pacto Europeo de Migración y Asilo). Se eligió porque
 * el Mixto vota dividido (sí, no y abstención), que es el caso difícil.
 *
 * Los partidos y la tabla de diputados de abajo son de PRUEBA para ejercitar
 * la lógica de atribución; no son el dataset ni su fuente.
 */

const src = { url: "https://example.org/prueba", title: "prueba", year: 2026 };
const party = (id: string, congressGroup?: string): Party => ({
  id,
  name: id,
  short: id,
  color: "#000000",
  initials: id.slice(0, 2),
  scope: "estatal",
  bloc: "otro",
  parliamentary: true,
  inclusionReason: "prueba",
  inclusionSource: src,
  congressGroup,
  status: "confirmada",
});
const dep = (deputy: string, partyId: string, from = "2023-12-01", to?: string): DeputyAttribution => ({
  legislature: "XV",
  deputy,
  partyId,
  group: "GMx",
  from,
  to,
  source: src,
});

describe("congreso.es · forma y cabecera", () => {
  it("reconoce el JSON real", () => {
    expect(isCongresoVoteJson(real)).toBe(true);
    expect(isCongresoVoteJson({ informacion: {} })).toBe(false);
  });

  it("fecha sin ceros → ISO", () => {
    expect(parseCongresoDate("30/9/2026")).toBe("2026-09-30");
    expect(parseCongresoDate("2026-09-30")).toBeNull();
  });

  it("valores de voto, con y sin tilde", () => {
    expect(normalizeVote("Sí")).toBe("si");
    expect(normalizeVote("Si")).toBe("si");
    expect(normalizeVote("Abstención")).toBe("abstencion");
    expect(normalizeVote("No vota")).toBe("ausente");
    expect(normalizeVote("Quizá")).toBeNull();
  });

  it("la cabecera coincide con la URL y detecta otra votación", () => {
    const ref = parseVoteUrl(
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion202/20260930/Votacion001/",
    );
    expect(ref).toEqual({ legislature: "XV", session: 202, date: "2026-09-30", number: 1 });
    expect(checkVoteInfo(real, ref!)).toEqual([]);
    expect(checkVoteInfo(real, { ...ref!, number: 2 })).toHaveLength(1);
    expect(checkVoteInfo(real, { session: 201, date: "2026-09-29", number: 1 })).toHaveLength(2);
  });

  it("encuentra el VOT_….json en la página del día", () => {
    const html =
      '<a href="/webpublica/opendata/votaciones/Leg15/Sesion202/20260930/Votacion001/VOT_20260930153547.json">' +
      '<a href="/webpublica/opendata/votaciones/Leg15/Sesion202/20260930/Votacion010/VOT_20260930160000.json">' +
      '<img src="/webpublica/opendata/votaciones/Leg15/Sesion043/20240530/Votacion037/VOT_20240627132510.png">';
    const ref = { legislature: "XV" as const, session: 202, date: "2026-09-30", number: 1 };
    expect(findVoteFiles(html, ref).json).toBe(
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion202/20260930/Votacion001/VOT_20260930153547.json",
    );
    // Votación por llamamiento: solo imagen, sin JSON.
    const llamamiento = findVoteFiles(html, { legislature: "XV", session: 43, date: "2024-05-30", number: 37 });
    expect(llamamiento.json).toBeUndefined();
    expect(llamamiento.png).toMatch(/Votacion037/);
  });
});

describe("congreso.es · recuento", () => {
  it("por grupo cuadra con los totales oficiales", () => {
    const g = tallyByGroup(real);
    expect(g.GP).toMatchObject({ si: 136, no: 0, abstencion: 0, ausente: 1, total: 137 });
    expect(g.GVOX).toMatchObject({ abstencion: 32, total: 32 });
    expect(g.GMx).toMatchObject({ si: 1, no: 6, abstencion: 2, ausente: 0, total: 9 });
    const sum = Object.values(g).reduce(
      (a, t) => ({ si: a.si + t.si, no: a.no + t.no, abs: a.abs + t.abstencion, nv: a.nv + t.ausente }),
      { si: 0, no: 0, abs: 0, nv: 0 },
    );
    expect(sum).toEqual({
      si: real.totales.afavor,
      no: real.totales.enContra,
      abs: real.totales.abstenciones,
      nv: real.totales.noVotan,
    });
  });

  it("mayoría: entre quienes votan, con aviso por debajo de 2/3 y empate", () => {
    const g = tallyByGroup(real);
    expect(majority(g.GP)).toEqual({ vote: "si", strong: true });
    expect(majority(g.GVOX)).toEqual({ vote: "abstencion", strong: true });
    // 6 de 9 es justo 2/3: «menos de dos tercios» no se cumple, así que es fuerte.
    expect(majority(g.GMx)).toEqual({ vote: "no", strong: true });
    expect(majority({ si: 5, no: 4, abstencion: 0, ausente: 0, desconocido: 0, total: 9 })).toEqual({ vote: "si", strong: false });
    expect(majority({ si: 0, no: 0, abstencion: 0, ausente: 3, desconocido: 0, total: 3 }).vote).toBe("ausente");
    expect(majority({ si: 2, no: 2, abstencion: 0, ausente: 0, desconocido: 0, total: 4 }).vote).toBe("empate");
  });

  it("por partido: grupo propio, atribución por diputado en el Mixto y no atribuidos aparte", () => {
    const parties = [party("pp", "GP"), party("sumar", "GSUMAR"), party("coalicion", "GSUMAR"), party("podemos"), party("upn")];
    const deputies = [
      dep("Belarra Urteaga, Ione", "podemos"),
      dep("Sánchez Serna, Javier", "podemos"),
      dep("Santana Perera, Noemí", "podemos"),
      dep("Velarde Gómez, Martina", "podemos"),
      dep("CATALÁN  HIGUERAS, Alberto", "upn"), // mayúsculas y espacios: se normalizan
    ];
    const r = tallyByParty(real, "XV", parties, deputies);
    expect(r.byParty.pp.tally).toMatchObject({ si: 136, ausente: 1 });
    expect(r.byParty.podemos.tally).toMatchObject({ no: 4, total: 4 });
    expect(r.byParty.podemos.via).toEqual(["diputado"]);
    expect(r.byParty.upn.tally).toMatchObject({ si: 1, total: 1 });
    // Dos partidos con el mismo grupo heredan el mismo historial.
    expect(r.byParty.coalicion.tally).toEqual(r.byParty.sumar.tally);
    expect(r.unattributedMixto.map((d) => d.diputado).sort()).toEqual([
      "Micó Micó, Àgueda",
      "Ortega Smith-Molina, Francisco Javier",
      "Rego Candamil, Néstor",
      "Valido García, Cristina",
    ]);
  });

  it("la atribución respeta el intervalo de fechas", () => {
    const d = [dep("Belarra Urteaga, Ione", "podemos", "2023-12-01", "2026-01-01")];
    expect(attributeDeputy("Belarra Urteaga, Ione", "2026-09-30", "XV", d)).toBeUndefined();
    expect(attributeDeputy("Belarra Urteaga, Ione", "2025-06-01", "XV", d)?.partyId).toBe("podemos");
    expect(attributeDeputy("Belarra Urteaga, Ione", "2025-06-01", "XIV", d)).toBeUndefined();
  });

  it("formato del informe de `npm run afinidad:vote`", () => {
    const out = formatVoteReport(real, {
      legislature: "XV",
      parties: [party("pp", "GP")],
      deputies: [dep("Belarra Urteaga, Ione", "podemos")],
    });
    const lines = out.split("\n");
    expect(lines[0]).toBe("Votación XV · sesión 202 · nº 1 · 2026-09-30");
    expect(out).toContain("POR GRUPO");
    expect(lines.find((l) => l.startsWith("GMx "))).toBe("GMx                    1     6      2         0      9  no");
    expect(lines.find((l) => l.startsWith("pp "))).toBe("pp                   136     0      0         1    137  sí                  vía grupo");
    expect(out).toContain("Mixto sin atribuir en deputies.ts");
    expect(lines).toContain("GMx             No          Belarra Urteaga, Ione [podemos]");
  });
});

/*
 * Las mismas reglas con parties.ts y deputies.ts REALES. Regresión de un fallo:
 * los partidos con congressGroup «GMx» leían el voto del grupo entero, así que
 * cualquier diputado del Mixto sin atribuir (Ortega Smith, Ábalos) sumaba a
 * Podemos, BNG, CC, UPN y Compromís a la vez.
 */
describe("congreso.es · recuento con el dataset real", () => {
  const GMX_PARTIES = ["podemos", "bng", "cc", "upn", "compromis"];

  it("XV: cada partido del Mixto cuenta solo a sus diputados; Ortega Smith no cuenta para nadie", () => {
    const r = tallyByParty(real, "XV", realParties, realDeputies);
    expect(r.byParty.podemos.tally).toMatchObject({ no: 4, total: 4 });
    expect(r.byParty.bng.tally).toMatchObject({ no: 1, total: 1 });
    expect(r.byParty.cc.tally).toMatchObject({ abstencion: 1, total: 1 });
    expect(r.byParty.upn.tally).toMatchObject({ si: 1, total: 1 });
    expect(r.byParty.compromis.tally).toMatchObject({ no: 1, total: 1 });
    for (const id of GMX_PARTIES) expect(r.byParty[id].via).toEqual(["diputado"]);
    expect(r.unattributedMixto).toEqual([{ diputado: "Ortega Smith-Molina, Francisco Javier", voto: "Abstención" }]);
    // Los 9 del Mixto se reparten 4+1+1+1+1 y queda 1 sin atribuir: nadie se cuenta dos veces.
    const sumMixto = GMX_PARTIES.reduce((n, id) => n + r.byParty[id].tally.total, 0);
    expect(sumMixto + r.unattributedMixto.length).toBe(tallyByGroup(real).GMx.total);
    // Ibáñez (Compromís-Sumar) sigue en GSUMAR sin atribución: cuenta para Sumar.
    expect(r.byParty.sumar.tally).toEqual(tallyByGroup(real).GSUMAR);
    expect(r.byParty["frente-amplio"].tally).toEqual(r.byParty.sumar.tally);
  });

  it("XV: Ábalos (Mixto, sin partido del test) no se filtra a ningún partido", () => {
    // Variante sintética de la votación real: fecha de 2025, cuando Ábalos
    // estaba en el Mixto, y un «Sí» suyo añadido.
    const conAbalos: CongresoVoteJson = {
      ...real,
      informacion: { ...real.informacion, fecha: "30/9/2025" },
      votaciones: [...real.votaciones, { diputado: "Ábalos Meco, José Luis", grupo: "GMx", voto: "Sí" }],
    };
    const r = tallyByParty(conAbalos, "XV", realParties, realDeputies);
    for (const id of GMX_PARTIES) expect(r.byParty[id].tally.si).toBe(id === "upn" ? 1 : 0);
    expect(r.unattributedMixto.map((d) => d.diputado)).toContain("Ábalos Meco, José Luis");
  });

  it("XV: Micó cuenta para Compromís también cuando se sentaba en GSUMAR, y no para Sumar", () => {
    // Variante sintética: marzo de 2025, Micó todavía en GSUMAR y votando «Sí»
    // mientras el resto de GSUMAR vota «No».
    const enSumar: CongresoVoteJson = {
      ...real,
      informacion: { ...real.informacion, fecha: "1/3/2025" },
      votaciones: real.votaciones.map((v) =>
        v.diputado === "Micó Micó, Àgueda" ? { ...v, grupo: "GSUMAR", voto: "Sí" } : v,
      ),
    };
    const r = tallyByParty(enSumar, "XV", realParties, realDeputies);
    expect(r.byParty.compromis.tally).toMatchObject({ si: 1, total: 1 });
    const gsumar = tallyByGroup(enSumar).GSUMAR;
    expect(r.byParty.sumar.tally.total).toBe(gsumar.total - 1);
    expect(r.byParty.sumar.tally.si).toBe(gsumar.si - 1);
  });

  it("XIV: Podemos, Sumar y Frente Amplio leen GCUP-EC-GC; el Mixto/Plural solo por diputado", () => {
    const xiv: CongresoVoteJson = {
      informacion: { sesion: 1, numeroVotacion: 1, fecha: "1/6/2021" },
      votaciones: [
        { diputado: "Díaz Pérez, Yolanda", grupo: "GCUP-EC-GC", voto: "Sí" },
        { diputado: "Echenique Robba, Pablo", grupo: "GCUP-EC-GC", voto: "Sí" },
        { diputado: "Errejón Galván, Íñigo", grupo: "GPlu", voto: "No" },
        { diputado: "Rego Candamil, Néstor", grupo: "GPlu", voto: "Abstención" },
        { diputado: "Nogueras i Camero, Míriam", grupo: "GPlu", voto: "No" },
        { diputado: "Oramas González-Moro, Ana María", grupo: "GMx", voto: "Sí" },
        { diputado: "Sayas López, Sergio", grupo: "GMx", voto: "No" },
      ],
    };
    const r = tallyByParty(xiv, "XIV", realParties, realDeputies);
    for (const id of ["podemos", "sumar", "frente-amplio"]) {
      expect(r.byParty[id].tally).toMatchObject({ si: 2, total: 2 });
      expect(r.byParty[id].via).toEqual(["grupo"]);
    }
    expect(r.byParty.bng.tally).toMatchObject({ abstencion: 1, total: 1 });
    expect(r.byParty.junts.tally).toMatchObject({ no: 1, total: 1 });
    expect(r.byParty.cc.tally).toMatchObject({ si: 1, total: 1 });
    expect(r.byParty.upn).toBeUndefined();
    expect(r.byParty.compromis).toBeUndefined();
    expect(r.unattributedMixto.map((d) => d.diputado).sort()).toEqual(["Errejón Galván, Íñigo", "Sayas López, Sergio"]);
  });
});

describe("robots.txt", () => {
  it("lee Disallow del grupo * y del nuestro, con comodines", () => {
    const rules = parseRobots(
      "User-agent: Googlebot\nDisallow: /solo-google\n\nUser-agent: *\nDisallow: /privado/\nDisallow: /*.zip$\n",
    );
    const blocked = (p: string) => rules.some((r) => r.test(p));
    expect(blocked("/privado/x")).toBe(true);
    expect(blocked("/datos/a.zip")).toBe(true);
    expect(blocked("/datos/a.zip.json")).toBe(false);
    expect(blocked("/solo-google")).toBe(false);
  });
});
