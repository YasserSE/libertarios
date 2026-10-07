import type { Dataset, Lang, Party, Question, Quote, SaidVsDid, TranslatedLang } from "@/data/afinidad/types";

/**
 * Textos del dataset en la lengua de la página.
 *
 * Las entradas llevan sus traducciones en `i18n` (ver `DataI18n` en
 * `types.ts`). Aquí se sustituyen los campos traducidos y se deja el resto tal
 * cual, para que los componentes sigan leyendo `party.inclusionReason`,
 * `entry.topic`… sin saber de idiomas. Lo que no tenga traducción cae al
 * castellano.
 *
 * Nunca se tocan las citas literales (`said.text`, `Quote.text`, `quote` de
 * programa): se publican tal como se dijeron o escribieron.
 *
 * Excepción: `Question.label` NO cae al castellano. Fuera del castellano, si
 * falta la traducción se quita, y quien pinta usa el tema traducido (ver
 * `rowLabel` y `measureLabel` en `i18n/afinidad/result.ts`): mejor el tema en
 * la lengua de la página que una etiqueta en otra.
 *
 * El JSON abierto (`/api/afinidad/datos.json`) y el panel de administración
 * usan el dataset sin localizar: es la fuente y lleva todas las lenguas.
 */

const isTranslated = (lang: string): lang is TranslatedLang => lang === "ca" || lang === "gl" || lang === "eu";

export function localizeParty(p: Party, lang: string): Party {
  if (!isTranslated(lang)) return p;
  const tr = p.i18n?.[lang];
  if (!tr) return p;
  return {
    ...p,
    inclusionReason: tr.inclusionReason ?? p.inclusionReason,
    recordNote: p.recordNote === undefined ? undefined : (tr.recordNote ?? p.recordNote),
  };
}

export function localizeQuestion(q: Question, lang: string): Question {
  if (!isTranslated(lang)) return q;
  const tr = q.i18n?.[lang];
  return { ...q, label: tr?.label, rationale: tr?.rationale ?? q.rationale };
}

export function localizeQuote(q: Quote, lang: string): Quote {
  if (!isTranslated(lang)) return q;
  const role = q.i18n?.[lang]?.role;
  return role && q.role !== undefined ? { ...q, role } : q;
}

export function localizeSaidVsDid(e: SaidVsDid, lang: string): SaidVsDid {
  if (!isTranslated(lang)) return e;
  const tr = e.i18n?.[lang];
  if (!tr) return e;
  return {
    ...e,
    topic: tr.topic ?? e.topic,
    said: e.said.role !== undefined && tr.role ? { ...e.said, role: tr.role } : e.said,
    did: tr.summary ? { ...e.did, summary: tr.summary } : e.did,
    note: e.note === undefined ? undefined : (tr.note ?? e.note),
  };
}

const cache = new WeakMap<Dataset, Map<Lang, Dataset>>();

/** El dataset con los textos en `lang` (memorizado por dataset y lengua). */
export function localizeDataset(dataset: Dataset, lang: string): Dataset {
  if (!isTranslated(lang)) return dataset;
  let byLang = cache.get(dataset);
  if (!byLang) {
    byLang = new Map();
    cache.set(dataset, byLang);
  }
  const hit = byLang.get(lang);
  if (hit) return hit;
  const out: Dataset = {
    ...dataset,
    parties: dataset.parties.map((p) => localizeParty(p, lang)),
    questions: dataset.questions.map((q) => localizeQuestion(q, lang)),
    quotes: dataset.quotes?.map((q) => localizeQuote(q, lang)),
    saidVsDid: dataset.saidVsDid?.map((e) => localizeSaidVsDid(e, lang)),
  };
  byLang.set(lang, out);
  return out;
}
