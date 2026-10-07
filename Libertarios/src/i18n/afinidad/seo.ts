/*
 * Textos para compartir y para buscadores de «¿A quién votar? Objetivamente»:
 * títulos y descripciones de cada página, la tarjeta OG genérica y el JSON-LD.
 *
 * Las cuatro tablas están completas: `ca`, `gl` y `eu` se tipan como
 * `SeoStrings`, así que una clave nueva en `es` sin traducir no compila.
 * ⚠️ Los textos ca, gl y eu son traducción automática PENDIENTE DE REVISIÓN
 * NATIVA (ver `docs/AFINIDAD-CAMBIOS.md`).
 *
 * Límites (los comprueba `afinidad-seo.test.ts`): títulos ≤ 60 caracteres y
 * descripciones ≤ 155 con `{n}` = 15, que es lo que cabe sin recorte en las
 * vistas previas de WhatsApp, X y Google. Mismas reglas de redacción que el
 * resto del módulo: sin adjetivos valorativos y los partidos descritos por lo
 * que dicen y votan.
 *
 * Solo cadenas, sin React: lo importan la ruta OG y `generateMetadata`.
 */
import { pick } from "./lang";

const es = {
  introTitle: "¿A quién votar el 29-N? Lo que prometen vs. lo que votan",
  introDescription:
    "{n} preguntas, 3 minutos: descubre qué partido piensa como tú según su programa y según lo que vota en el Congreso. Sin afiliación, con fuentes.",
  resultTitle: "Mi resultado: {party}",
  resultTitleGeneric: "Mi resultado · ¿A quién votar? Objetivamente",
  resultDescription:
    "Mi afinidad con cada partido, por programa y por votos en el Congreso. Haz el test: {n} preguntas, 3 minutos.",
  dvhTitle: "Dijeron vs. hicieron: promesas frente a hechos",
  dvhDescription:
    "Lo que cada partido prometió y lo que hizo después, con fecha y fuente. Incluye lo cumplido. El mismo criterio para todos.",
  partyTitle: "{party}: programa y votos en el Congreso",
  partyDescription:
    "Qué promete {party} en su programa y qué ha votado en el Congreso, pregunta a pregunta y con la fuente de cada dato.",
  // Tarjeta OG genérica (1200×630)
  ogHeadlineLead: "¿A quién votar?",
  ogHeadlineAccent: "Objetivamente.",
  ogLine: "{n} preguntas · 3 minutos · programa vs. votos · sin afiliación",
  ogKicker: "Elecciones generales · 29-N-2026",
  ogAlt: "¿A quién votar? Objetivamente: una mano deposita una papeleta en una urna",
  ogResultAlt: "Mi resultado en «¿A quién votar? Objetivamente»: los tres partidos más afines",
};

export type SeoStrings = typeof es;

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const ca: SeoStrings = {
  introTitle: "A qui votar el 29-N? El que prometen vs. el que voten",
  introDescription:
    "{n} preguntes, 3 minuts: descobreix quin partit pensa com tu segons el seu programa i segons el que vota al Congrés. Sense afiliació, amb fonts.",
  resultTitle: "El meu resultat: {party}",
  resultTitleGeneric: "El meu resultat · A qui votar? Objectivament",
  resultDescription:
    "La meva afinitat amb cada partit, pel programa i pels vots al Congrés. Fes el test: {n} preguntes, 3 minuts.",
  dvhTitle: "Van dir vs. van fer: promeses davant fets",
  dvhDescription:
    "El que cada partit va prometre i el que va fer després, amb data i font. Inclou el que s'ha complert. El mateix criteri per a tothom.",
  partyTitle: "{party}: programa i vots al Congrés",
  partyDescription:
    "Què promet {party} al seu programa i què ha votat al Congrés, pregunta a pregunta i amb la font de cada dada.",
  ogHeadlineLead: "A qui votar?",
  ogHeadlineAccent: "Objectivament.",
  ogLine: "{n} preguntes · 3 minuts · programa vs. vots · sense afiliació",
  ogKicker: "Eleccions generals · 29-N-2026",
  ogAlt: "A qui votar? Objectivament: una mà diposita una papereta en una urna",
  ogResultAlt: "El meu resultat a «A qui votar? Objectivament»: els tres partits més afins",
};

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const gl: SeoStrings = {
  introTitle: "A quen votar o 29-N? O que prometen vs. o que votan",
  introDescription:
    "{n} preguntas, 3 minutos: descobre que partido pensa coma ti segundo o seu programa e segundo o que vota no Congreso. Sen afiliación, con fontes.",
  resultTitle: "O meu resultado: {party}",
  resultTitleGeneric: "O meu resultado · A quen votar? Obxectivamente",
  resultDescription:
    "A miña afinidade con cada partido, polo programa e polos votos no Congreso. Fai o test: {n} preguntas, 3 minutos.",
  dvhTitle: "Dixeron vs. fixeron: promesas fronte a feitos",
  dvhDescription:
    "O que cada partido prometeu e o que fixo despois, con data e fonte. Inclúe o cumprido. O mesmo criterio para todos.",
  partyTitle: "{party}: programa e votos no Congreso",
  partyDescription:
    "Que promete {party} no seu programa e que votou no Congreso, pregunta a pregunta e coa fonte de cada dato.",
  ogHeadlineLead: "A quen votar?",
  ogHeadlineAccent: "Obxectivamente.",
  ogLine: "{n} preguntas · 3 minutos · programa vs. votos · sen afiliación",
  ogKicker: "Eleccións xerais · 29-N-2026",
  ogAlt: "A quen votar? Obxectivamente: unha man deposita unha papeleta nunha urna",
  ogResultAlt: "O meu resultado en «A quen votar? Obxectivamente»: os tres partidos máis afíns",
};

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const eu: SeoStrings = {
  introTitle: "Nori bozkatu azaroaren 29an? Agindutakoa vs. bozkatutakoa",
  introDescription:
    "{n} galdera, 3 minutu: jakin zein alderdik pentsatzen duen zuk bezala, bere programaren eta Kongresuko botoen arabera. Afiliaziorik gabe, iturriekin.",
  resultTitle: "Nire emaitza: {party}",
  resultTitleGeneric: "Nire emaitza · Nori bozkatu? Objektiboki",
  resultDescription:
    "Nire afinitatea alderdi bakoitzarekin, programaren eta Kongresuko botoen arabera. Egin testa: {n} galdera, 3 minutu.",
  dvhTitle: "Esan zutena eta egin zutena: hitzak eta egintzak",
  dvhDescription:
    "Alderdi bakoitzak agindu zuena eta gero egin zuena, data eta iturriarekin. Betetakoa ere bai. Irizpide bera guztientzat.",
  partyTitle: "{party}: programa eta botoak Kongresuan",
  partyDescription:
    "Zer agintzen duen {party} alderdiak bere programan eta zer bozkatu duen Kongresuan, galderaz galdera eta iturriarekin.",
  ogHeadlineLead: "Nori bozkatu?",
  ogHeadlineAccent: "Objektiboki.",
  ogLine: "{n} galdera · 3 minutu · programa vs. botoak · afiliaziorik gabe",
  ogKicker: "Hauteskunde orokorrak · 2026-11-29",
  ogAlt: "Nori bozkatu? Objektiboki: esku batek boto-txartela hautestontzian sartzen du",
  ogResultAlt: "Nire emaitza «Nori bozkatu? Objektiboki» testean: hiru alderdi hurbilenak",
};

const DICTS: Record<"es" | "ca" | "gl" | "eu", SeoStrings> = { es, ca, gl, eu };

/** Textos para un idioma; uno sin traducción del módulo (pt, fr…) cae al castellano. */
export function getSeoStrings(locale: string | null | undefined): SeoStrings {
  return pick<SeoStrings>(DICTS, locale ?? "es");
}

/** Las cuatro tablas sin mezclar, para el test de completitud (`afinidad-i18n.test.ts`). */
export const SEO_TABLES = { es, ca, gl, eu } as const;
