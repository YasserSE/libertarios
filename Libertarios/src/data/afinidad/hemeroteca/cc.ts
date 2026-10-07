import type { Quote } from "../types";

/**
 * Hemeroteca de Coalición Canaria.
 *
 * Diputadas: Ana Oramas González-Moro (XIV, Grupo Mixto) y Cristina Valido
 * García (XV, Grupo Mixto); atribución en `../deputies.ts`.
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. `videoUrl` es el clip de la
 * intervención en congreso.es.
 */

const dscd = (leg: 14 | 15, num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L${leg}/CONG/DS/PL/DSCD-${leg}-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

const VALIDO = "Cristina Valido García";
const ROLE_VALIDO = "Diputada de Coalición Canaria (Grupo Parlamentario Mixto)";
const ROLE_VALIDO_I18N: Quote["i18n"] = {
  ca: { role: "Diputada de Coalición Canaria (Grup Parlamentari Mixt)" },
  gl: { role: "Deputada de Coalición Canaria (Grupo Parlamentario Mixto)" },
  eu: { role: "Coalición Canariako diputatua (Talde Parlamentario Mistoa)" },
};

export const quotes: Quote[] = [
  {
    partyId: "cc",
    questionId: "amnistia",
    speaker: VALIDO,
    role: ROLE_VALIDO,
    date: "2024-03-14",
    text: "Presidenta, señorías, nosotros insistimos. Nos mantenemos en nuestra negativa a una ley que tiene muchas aristas injustificables, que no nace del interés general ni cuenta con un consenso ni con un apoyo social con el que pudiéramos siquiera pensarnos apoyarla.",
    source: dscd(15, "32", 3, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730163I",
    i18n: ROLE_VALIDO_I18N,
  },
  {
    partyId: "cc",
    questionId: "okupacion-desalojo",
    speaker: VALIDO,
    role: ROLE_VALIDO,
    date: "2026-05-19",
    text: "Y todo esto pasa porque los procedimientos se eternizan y porque tenemos que disuadir y tenemos que resolver el problema de la vivienda, que no pasa por negar la existencia de la okupación, que perjudica a propietarios y a familias y vecinos.",
    source: dscd(15, "185", 10, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773347I",
    i18n: ROLE_VALIDO_I18N,
  },
  {
    partyId: "cc",
    questionId: "vivienda-tope-alquiler",
    speaker: "Ana María Oramas González-Moro",
    role: "Diputada de Coalición Canaria (Grupo Parlamentario Mixto)",
    date: "2023-04-27",
    text: "Es una competencia exclusiva de las comunidades autónomas y hoy ustedes, en clave electoral, están haciendo una ley que es un disparate.",
    source: dscd(14, "265", 18, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda"),
    videoUrl: "https://app.congreso.es/v1/14723317I",
    i18n: {
      ca: { role: "Diputada de Coalición Canaria (Grup Parlamentari Mixt)" },
      gl: { role: "Deputada de Coalición Canaria (Grupo Parlamentario Mixto)" },
      eu: { role: "Coalición Canariako diputatua (Talde Parlamentario Mistoa)" },
    },
  },
  {
    partyId: "cc",
    questionId: "prostitucion-abolicion",
    speaker: VALIDO,
    role: ROLE_VALIDO,
    date: "2024-05-21",
    text: "Señorías, sí, creemos que hay que tomar en consideración, hay que debatir, hay que profundizar, hay que trabajar para evitar que muchos impresentables se sigan beneficiando de la explotación de mujeres, niñas y niños.",
    source: dscd(15, "40", 24, "2024-05-21", "DSCD Pleno núm. 40 (XV), 21-5-2024 — Proposición de Ley Orgánica del GS para prohibir el proxenetismo en todas sus formas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15733408I",
    i18n: ROLE_VALIDO_I18N,
  },
  {
    partyId: "cc",
    questionId: "oficina-anticorrupcion",
    speaker: VALIDO,
    role: ROLE_VALIDO,
    date: "2025-09-16",
    text: "necesitamos saber de quién va a depender, cuánto va a costar y cómo se va a garantizar su independencia, porque la independencia de un órgano como este es fundamental.",
    source: dscd(15, "136", 20, "2025-09-16", "DSCD Pleno núm. 136 (XV), 16-9-2025 — Proposición de Ley del GSUMAR de creación de la Oficina de prevención de la corrupción (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15758681I",
    i18n: ROLE_VALIDO_I18N,
  },
];
