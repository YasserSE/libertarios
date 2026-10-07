import { describe, expect, it } from "vitest";
import { FLOW_TABLES } from "@/i18n/afinidad/flow";
import { RESULT_TABLES } from "@/i18n/afinidad/result";
import { TRANSPARENCY_TABLES } from "@/i18n/afinidad/transparency";
import { DVH_TABLES } from "@/i18n/afinidad/dvh";
import { SEO_TABLES } from "@/i18n/afinidad/seo";
import { METHODOLOGY_TABLES } from "@/i18n/afinidad/methodology";
import { dataset } from "@/data/afinidad";
import { DVH_KNOWN_GAPS, dvhSearchLog, type DvhSearchLogTranslation } from "@/data/afinidad/dichos-hechos/busqueda";
import { searchLogCa } from "@/data/afinidad/dichos-hechos/busqueda-i18n/ca";
import { searchLogGl } from "@/data/afinidad/dichos-hechos/busqueda-i18n/gl";
import { searchLogEu } from "@/data/afinidad/dichos-hechos/busqueda-i18n/eu";
import { localizeDataset } from "@/lib/afinidad/localize";

/**
 * «¿A quién votar?» entero en las cuatro lenguas: ninguna clave de ca, gl o eu
 * puede faltar (caería al castellano en mitad de una página) ni ser idéntica al
 * castellano (casi siempre es una clave copiada sin traducir).
 *
 * Las coincidencias legítimas (nombres propios, siglas, palabras que se
 * escriben igual: «Programa», «A favor», «Hemeroteca»…) van en `SAME_OK`, por
 * lengua y con la ruta completa de la clave, para que cada una sea una
 * decisión explícita y no un hueco que pasa desapercibido.
 */

type Lang = "ca" | "gl" | "eu";
const LANGS: Lang[] = ["ca", "gl", "eu"];

const TABLES = {
  flow: FLOW_TABLES,
  result: RESULT_TABLES,
  transparency: TRANSPARENCY_TABLES,
  dvh: DVH_TABLES,
  seo: SEO_TABLES,
  methodology: METHODOLOGY_TABLES,
} as const;

/** Claves cuya traducción correcta coincide con el castellano. Ruta: `<tabla>.<clave>[.<subclave>…]`. */
const SAME_OK: Record<Lang, readonly string[]> = {
  ca: [
    "flow.intro.programme.title", // Programa
    "flow.context.optional", // Opcional
    "flow.question.scale.1", // A favor
    "flow.question.scale.-1", // En contra
    "flow.question.prev", // Anterior
    "flow.question.restart", // Reiniciar
    "flow.languages.label", // Idioma
    "flow.languages.names.es", // Castellano
    "flow.languages.names.ca", // Català
    "flow.languages.names.gl", // Galego
    "flow.languages.names.eu", // Euskara
    "flow.regions.10", // Comunitat Valenciana
    "flow.regions.11", // Extremadura
    "flow.regions.15", // Navarra
    "flow.regions.17", // La Rioja
    "flow.regions.18", // Ceuta
    "flow.regions.19", // Melilla
    "flow.regions.04", // Illes Balears
    "result.retakeAgain", // Repetir el test
    "result.figureProgramme", // programa
    "result.programmeYear", // programa {year}
    "result.lensProgramme", // Programa
    "result.vote_si", // sí
    "result.vote_no", // no
    "result.breakdownTitle", // Pregunta a pregunta
    "result.topics.defensa", // defensa
    "result.topics.banca", // banca
    "result.topics.cultura", // cultura
    "result.answer_m1", // En contra
    "result.answer_p1", // A favor
    "result.pos_m1", // en contra
    "result.pos_0", // ni a favor ni en contra
    "result.pos_p1", // a favor
    "result.shareNative", // Compartir
    "result.ogProgramme", // programa
    "transparency.position.2", // A favor
    "transparency.position.-2", // En contra
    "transparency.partyStatus.confirmada", // Candidatura confirmada
    "transparency.bloc.nacionalista", // Nacionalista
    "transparency.vote.si", // Sí
    "transparency.vote.no", // No
    "transparency.lens.programme", // Programa
    "transparency.lens.hemeroteca", // Hemeroteca
    "transparency.labels.note", // Nota
    "transparency.labels.boe", // BOE
    "transparency.labels.question", // Pregunta
    "transparency.labels.legislatureAbbr", // leg.
    "transparency.labels.sessionAbbr", // ses.
    "transparency.party.scopeState", // Estatal
    "transparency.party.parliamentaryYes", // Sí
    "transparency.party.parliamentaryNo", // No
    "transparency.party.quotes", // Hemeroteca
    "dvh.verdict_parcial", // Parcial
    "dvh.note", // Nota
    "dvh.officialValue", // — {value}
    "dvh.vote_si", // sí
    "dvh.vote_no", // no
    "dvh.share", // Compartir
    "dvh.filterVerdict", // Etiqueta
    "dvh.filterTopic", // Tema
    "methodology.schema", // esquema
    "methodology.layers.programmeTitle", // 1. Programa
    "methodology.layers.hemerotecaTitle", // 3. Hemeroteca
    "methodology.coding.thValue", // Valor
    "methodology.calc.question", // Pregunta {n}
    "methodology.directional.thOld", // Fórmula descartada
    "methodology.directional.thUsed", // Fórmula usada
  ],
  gl: [
    "flow.intro.minutes", // 3 minutos
    "flow.intro.programme.title", // Programa
    "flow.intro.preparing", // Test en preparación
    "flow.nav.label", // Sobre este test
    "flow.context.optional", // Opcional
    "flow.context.pendingCoalition", // coalición por confirmar
    "flow.context.back", // Atrás
    "flow.question.scale.1", // A favor
    "flow.question.scale.-1", // En contra
    "flow.question.prev", // Anterior
    "flow.question.restart", // Reiniciar
    "flow.review.edit", // Cambiar
    "flow.languages.label", // Idioma
    "flow.languages.names.es", // Castellano
    "flow.languages.names.ca", // Català
    "flow.languages.names.gl", // Galego
    "flow.languages.names.eu", // Euskara
    "flow.empty.title", // Test en preparación
    "flow.regions.12", // Galicia
    "flow.regions.15", // Navarra
    "flow.regions.16", // País Vasco
    "flow.regions.18", // Ceuta
    "flow.regions.19", // Melilla
    "flow.regions.01", // Andalucía
    "flow.regions.02", // Aragón
    "flow.regions.03", // Asturias
    "flow.regions.05", // Canarias
    "flow.regions.06", // Cantabria
    "flow.regions.09", // Cataluña
    "result.figureProgramme", // programa
    "result.insufficient", // datos insuficientes
    "result.tie", // empate
    "result.programmeYear", // programa {year}
    "result.statusPending", // coalición por confirmar
    "result.rowDetails", // Detalles de {party}
    "result.cell_match", // Coincide
    "result.cell_near", // A medias
    "result.lensProgramme", // Programa
    "result.lensRecord", // Votos
    "result.vote_abstencion", // abstención
    "result.openCongreso", // ver en congreso.es
    "result.breakdownTitle", // Pregunta a pregunta
    "result.topics.modelo-territorial", // modelo territorial
    "result.topics.prostitucion", // prostitución
    "result.topics.defensa", // defensa
    "result.topics.banca", // banca
    "result.topics.transparencia", // transparencia
    "result.topics.cultura", // cultura
    "result.answer_m1", // En contra
    "result.answer_p1", // A favor
    "result.pos_m1", // en contra
    "result.pos_p1", // a favor
    "result.contested", // posición discutida
    "result.shareNative", // Compartir
    "result.emailLabel", // Correo electrónico
    "result.submit", // Avísame
    "result.sending", // Enviando…
    "result.ogProgramme", // programa
    "result.ogRecord", // votos
    "transparency.inPreparation.title", // Datos en preparación
    "transparency.nav.json", // Descargar JSON
    "transparency.position.0", // Posición intermedia
    "transparency.position.1", // A favor con matices
    "transparency.position.2", // A favor
    "transparency.position.-2", // En contra
    "transparency.position.-1", // En contra con matices
    "transparency.status.verificado", // Verificado
    "transparency.status.contested", // Codificación discrepante
    "transparency.confidence.alta", // Confianza alta
    "transparency.confidence.media", // Confianza media
    "transparency.partyStatus.confirmada", // Candidatura confirmada
    "transparency.partyStatus.por-confirmar", // Candidatura por confirmar
    "transparency.bloc.nacionalista", // Nacionalista
    "transparency.vote.abstencion", // Abstención
    "transparency.vote.ausente", // Ausente
    "transparency.lens.programme", // Programa
    "transparency.lens.hemeroteca", // Hemeroteca
    "transparency.labels.note", // Nota
    "transparency.labels.scoredAs", // Puntúa como
    "transparency.labels.vote", // Votación
    "transparency.labels.boe", // BOE
    "transparency.labels.question", // Pregunta
    "transparency.labels.party", // Partido
    "transparency.labels.sheet", // Ficha
    "transparency.labels.sessionAbbr", // ses.
    "transparency.data.detailTitle", // Detalle por pregunta
    "transparency.data.legend", // Estados
    "transparency.party.scope", // Ámbito
    "transparency.party.scopeState", // Estatal
    "transparency.party.scopeRegional", // Autonómico
    "transparency.party.quotes", // Hemeroteca
    "dvh.verdict_parcial", // Parcial
    "dvh.inPreparationTitle", // En preparación
    "dvh.note", // Nota
    "dvh.openCongreso", // ver en congreso.es
    "dvh.initiativeStatus", // estado: {status}
    "dvh.officialValue", // — {value}
    "dvh.officialPublisher", // dato oficial de {publisher}
    "dvh.vote_abstencion", // abstención
    "dvh.share", // Compartir
    "dvh.details", // Ver detalle
    "dvh.officialData", // Dato oficial
    "dvh.filtersLabel", // Filtrar entradas
    "dvh.filterParty", // Partido
    "dvh.filterVerdict", // Etiqueta
    "dvh.filterTopic", // Tema
    "dvh.all", // Todos
    "dvh.allVerdicts", // Todas
    "dvh.resultsCount", // {n} entradas
    "dvh.resultButton", // Ver {party}
    "methodology.schema", // esquema
    "methodology.layers.h", // Tres capas de información
    "methodology.layers.programmeTitle", // 1. Programa
    "methodology.layers.hemerotecaTitle", // 3. Hemeroteca
    "methodology.coding.thValue", // Valor
    "methodology.coding.thMeaning", // Significado
    "methodology.calc.thParty", // Partido
    "methodology.calc.thWeight", // Peso
    "methodology.calc.question", // Pregunta {n}
    "methodology.directional.thParty", // Partido
    "methodology.directional.thOld", // Fórmula descartada
    "methodology.directional.thUsed", // Fórmula usada
    "methodology.directional.contrast.0", // Partido ficticio «todo 0»
    "methodology.directional.contrast.2", // Partido ficticio «+2, −2»
  ],
  eu: [
    "flow.intro.programme.title", // Programa
    "flow.languages.names.es", // Castellano
    "flow.languages.names.ca", // Català
    "flow.languages.names.gl", // Galego
    "flow.languages.names.eu", // Euskara
    "flow.regions.11", // Extremadura
    "flow.regions.18", // Ceuta
    "flow.regions.19", // Melilla
    "flow.regions.03", // Asturias
    "result.figureProgramme", // programa
    "result.lensProgramme", // Programa
    "result.ogProgramme", // programa
    "transparency.lens.programme", // Programa
    "transparency.labels.boe", // BOE
    "transparency.labels.legislatureAbbr", // leg.
    "dvh.officialValue", // — {value}
    "methodology.layers.programmeTitle", // 1. Programa
  ],
};

/** Cadenas que se aceptan idénticas en cualquier tabla y lengua (vacías, solo símbolos o cifras, nombres propios). */
const isNeutral = (s: string) => s.trim() === "" || !/[A-Za-zÀ-ÿ]{2,}/.test(s);

function walk(es: unknown, tr: unknown, path: string, missing: string[], same: string[]) {
  if (typeof es === "string") {
    if (typeof tr !== "string") missing.push(path);
    else if (tr === es && !isNeutral(es)) same.push(path);
    return;
  }
  if (typeof es === "function") {
    if (typeof tr !== "function") missing.push(path);
    return;
  }
  if (Array.isArray(es)) {
    if (!Array.isArray(tr) || tr.length !== es.length) {
      missing.push(path);
      return;
    }
    es.forEach((v, i) => walk(v, tr[i], `${path}.${i}`, missing, same));
    return;
  }
  if (es && typeof es === "object") {
    if (!tr || typeof tr !== "object") {
      missing.push(path);
      return;
    }
    for (const [k, v] of Object.entries(es)) walk(v, (tr as Record<string, unknown>)[k], `${path}.${k}`, missing, same);
  }
}

describe("textos de interfaz: ca, gl y eu completos", () => {
  for (const lang of LANGS) {
    it(`${lang}: ninguna clave falta ni queda en castellano`, () => {
      const missing: string[] = [];
      const same: string[] = [];
      for (const [name, tables] of Object.entries(TABLES)) {
        const t = tables as unknown as Record<string, unknown>;
        walk(t.es, t[lang], name, missing, same);
      }
      expect(missing, `claves sin traducir en ${lang}`).toEqual([]);
      const allowed = new Set(SAME_OK[lang]);
      expect(
        same.filter((p) => !allowed.has(p)),
        `claves idénticas al castellano en ${lang} (tradúcelas o añádelas a SAME_OK si es correcto)`,
      ).toEqual([]);
    });

    it(`${lang}: SAME_OK no tiene entradas obsoletas`, () => {
      const missing: string[] = [];
      const same: string[] = [];
      for (const [name, tables] of Object.entries(TABLES)) {
        const t = tables as unknown as Record<string, unknown>;
        walk(t.es, t[lang], name, missing, same);
      }
      const current = new Set(same);
      expect(SAME_OK[lang].filter((p) => !current.has(p))).toEqual([]);
    });
  }

  it("los marcadores {x} de cada clave se conservan en la traducción", () => {
    const problems: string[] = [];
    const marks = (s: string) => (s.match(/\{[a-zA-Z0-9_]+\}/g) ?? []).sort().join(",");
    const check = (es: unknown, tr: unknown, path: string) => {
      if (typeof es === "string" && typeof tr === "string") {
        if (marks(es) !== marks(tr)) problems.push(`${path}: ${marks(es)} ≠ ${marks(tr)}`);
      } else if (es && typeof es === "object" && tr && typeof tr === "object") {
        for (const [k, v] of Object.entries(es)) check(v, (tr as Record<string, unknown>)[k], `${path}.${k}`);
      }
    };
    for (const [name, tables] of Object.entries(TABLES)) {
      const t = tables as unknown as Record<string, unknown>;
      for (const lang of LANGS) check(t.es, t[lang], `${lang}:${name}`);
    }
    expect(problems).toEqual([]);
  });
});

describe("textos del dataset: ca, gl y eu completos", () => {
  const filled = (v: string | undefined) => typeof v === "string" && v.trim().length > 0;

  it("cada pregunta traduce su enunciado, su etiqueta y lo que mide", () => {
    const problems: string[] = [];
    for (const q of dataset.questions)
      for (const lang of LANGS) {
        const tr = q.i18n?.[lang];
        if (!filled(q.text[lang])) problems.push(`${q.id}.text.${lang}`);
        if (!filled(tr?.rationale)) problems.push(`${q.id}.rationale.${lang}`);
        if (q.label !== undefined && !filled(tr?.label)) problems.push(`${q.id}.label.${lang}`);
      }
    expect(problems).toEqual([]);
  });

  it("cada partido traduce su motivo de inclusión y su nota de historial", () => {
    const problems: string[] = [];
    for (const p of dataset.parties)
      for (const lang of LANGS) {
        const tr = p.i18n?.[lang];
        if (!filled(tr?.inclusionReason)) problems.push(`${p.id}.inclusionReason.${lang}`);
        if (p.recordNote !== undefined && !filled(tr?.recordNote)) problems.push(`${p.id}.recordNote.${lang}`);
      }
    expect(problems).toEqual([]);
  });

  it("cada entrada de «Dijeron vs. hicieron» traduce tema, hecho, nota y cargo (nunca la cita)", () => {
    const problems: string[] = [];
    for (const e of dataset.saidVsDid ?? [])
      for (const lang of LANGS) {
        const tr = e.i18n?.[lang];
        if (!filled(tr?.topic)) problems.push(`${e.id}.topic.${lang}`);
        if (!filled(tr?.summary)) problems.push(`${e.id}.summary.${lang}`);
        if (e.note !== undefined && !filled(tr?.note)) problems.push(`${e.id}.note.${lang}`);
        if (e.said.role !== undefined && !filled(tr?.role)) problems.push(`${e.id}.role.${lang}`);
      }
    expect(problems).toEqual([]);
  });

  it("el mismo tema de «Dijeron vs. hicieron» se traduce igual en todas las entradas (los filtros agrupan por tema)", () => {
    const problems: string[] = [];
    for (const lang of LANGS) {
      const byEs = new Map<string, string>();
      for (const e of dataset.saidVsDid ?? []) {
        const tr = e.i18n?.[lang]?.topic;
        if (!tr) continue;
        const prev = byEs.get(e.topic);
        if (prev !== undefined && prev !== tr) problems.push(`${lang}: «${e.topic}» → «${prev}» / «${tr}»`);
        byEs.set(e.topic, tr);
      }
    }
    expect(problems).toEqual([]);
  });

  it("cada cita de hemeroteca con cargo lo traduce", () => {
    const problems: string[] = [];
    for (const q of dataset.quotes ?? [])
      for (const lang of LANGS)
        if (q.role !== undefined && !filled(q.i18n?.[lang]?.role)) problems.push(`${q.partyId}/${q.questionId}/${q.date}.${lang}`);
    expect(problems).toEqual([]);
  });

  it("localizar nunca toca las citas literales", () => {
    for (const lang of LANGS) {
      const loc = localizeDataset(dataset, lang);
      expect(loc.saidVsDid?.map((e) => e.said.text)).toEqual(dataset.saidVsDid?.map((e) => e.said.text));
      expect(loc.quotes?.map((q) => q.text)).toEqual(dataset.quotes?.map((q) => q.text));
      expect(loc.stances).toBe(dataset.stances);
    }
  });

  it("el registro de búsqueda tiene la misma forma en las cuatro lenguas", () => {
    const logs: Record<Lang, DvhSearchLogTranslation> = { ca: searchLogCa, gl: searchLogGl, eu: searchLogEu };
    for (const lang of LANGS) {
      const tr = logs[lang];
      expect(tr.gaps.length, `${lang}: huecos`).toBe(DVH_KNOWN_GAPS.length);
      expect(tr.log.map((l) => l.partyId), `${lang}: partidos`).toEqual(dvhSearchLog.map((l) => l.partyId));
      dvhSearchLog.forEach((es, i) => {
        const t = tr.log[i];
        expect(t.searched.length, `${lang}: ${es.partyId}.searched`).toBe(es.searched.length);
        expect(t.excluded.length, `${lang}: ${es.partyId}.excluded`).toBe(es.excluded.length);
        for (const s of [...t.searched, ...t.excluded.flatMap((x) => [x.what, x.why])])
          expect(filled(s), `${lang}: ${es.partyId} vacío`).toBe(true);
      });
      const esTexts = new Set(dvhSearchLog.flatMap((l) => [...l.searched, ...l.excluded.flatMap((x) => [x.what, x.why])]));
      const untranslated = tr.log.flatMap((l) => [...l.searched, ...l.excluded.map((x) => x.why)]).filter((s) => esTexts.has(s));
      expect(untranslated, `${lang}: textos copiados del castellano`).toEqual([]);
    }
  });
});
