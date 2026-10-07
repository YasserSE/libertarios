import type { Quote } from "../types";

/**
 * Hemeroteca del BNG.
 *
 * Su único diputado, Néstor Rego Candamil, se sentaba en el Grupo Plural en la
 * XIV legislatura y en el Grupo Mixto en la XV (atribución en `../deputies.ts`).
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. Las intervenciones en gallego se citan
 * en el original; la traducción al castellano que imprime el propio DSCD va en
 * un comentario. `videoUrl` es el clip de la intervención en congreso.es.
 */

const dscd = (leg: 14 | 15, num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L${leg}/CONG/DS/PL/DSCD-${leg}-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

const SPEAKER = "Néstor Rego Candamil";
const ROLE_XV = "Diputado del BNG (Grupo Parlamentario Mixto)";
const ROLE_XV_I18N: Quote["i18n"] = {
  ca: { role: "Diputat del BNG (Grup Parlamentari Mixt)" },
  gl: { role: "Deputado do BNG (Grupo Parlamentario Mixto)" },
  eu: { role: "BNGko diputatua (Talde Parlamentario Mistoa)" },
};
const ROLE_XIV = "Diputado del BNG (Grupo Parlamentario Plural)";
const ROLE_XIV_I18N: Quote["i18n"] = {
  ca: { role: "Diputat del BNG (Grup Parlamentari Plural)" },
  gl: { role: "Deputado do BNG (Grupo Parlamentario Plural)" },
  eu: { role: "BNGko diputatua (Talde Parlamentario Plurala)" },
};

export const quotes: Quote[] = [
  {
    partyId: "bng",
    questionId: "amnistia",
    speaker: SPEAKER,
    role: ROLE_XV,
    date: "2024-03-14",
    // DSCD (p. 4): «En primer lugar, esta ley trata de Cataluña, pero no solo sobre Cataluña; representa
    // la voluntad de avanzar en la democratización del Estado español y apuesta por resolver los
    // conflictos políticos por vías políticas y nunca por la vía judicial.»
    text: "Primeiro: esta lei vai sobre Cataluña, mais non só sobre Cataluña. Representa a vontade de avanzar na democratización do Estado español e a aposta por resolver os conflitos políticos por vías políticas e nunca pola vía xudicial.",
    source: dscd(15, "32", 4, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730165I",
    i18n: ROLE_XV_I18N,
  },
  {
    partyId: "bng",
    questionId: "vivienda-tope-alquiler",
    speaker: SPEAKER,
    role: ROLE_XIV,
    date: "2023-04-27",
    // Néstor Rego se abstuvo en la votación del dictamen.
    text: "Parece que la presión electoral se traduce en una ley más efectista que efectiva en la garantía del derecho a una vivienda digna.",
    source: dscd(14, "265", 21, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda"),
    videoUrl: "https://app.congreso.es/v1/14723320I",
    i18n: ROLE_XIV_I18N,
  },
  {
    partyId: "bng",
    questionId: "jornada-37-5",
    speaker: SPEAKER,
    role: ROLE_XV,
    date: "2025-09-10",
    // DSCD (p. 143): «Al final, lo realmente transformador sería ir a un horizonte de 35 horas
    // semanales, con una perspectiva futura de 32 horas.»
    text: "o realmente transformador sería ir a un horizonte de 35 horas semanais, mesmo coa perspectiva futura das 32 horas e 4 días de traballo.",
    source: dscd(15, "135", 142, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758445I",
    i18n: ROLE_XV_I18N,
  },
  {
    partyId: "bng",
    questionId: "inmigracion-competencias-cataluna",
    speaker: SPEAKER,
    role: ROLE_XV,
    date: "2025-09-23",
    // DSCD (p. 17): «Lo que nos sorprende es la incapacidad de la izquierda española a la hora de asumir
    // que en este Estado existen naciones, como Cataluña o como Galicia, que aspiran a tener todas las
    // competencias.» (El original gallego dice «O que non sorprende»; se cita tal cual.)
    text: "O que non sorprende é a incapacidade da esquerda española á hora de asumir que neste Estado existen nacións como Cataluña ou como a Galiza que aspiran a ter todas as competencias",
    source: dscd(15, "138", 17, "2025-09-23", "DSCD Pleno núm. 138 (XV), 23-9-2025 — Proposición de Ley Orgánica de delegación en Cataluña de competencias en inmigración"),
    videoUrl: "https://app.congreso.es/v1/15759115I",
    i18n: ROLE_XV_I18N,
  },
  {
    partyId: "bng",
    questionId: "tauromaquia-patrimonio",
    speaker: SPEAKER,
    role: ROLE_XV,
    date: "2025-10-07",
    // DSCD (p. 10): «En todo caso, este es un paso positivo, que esperamos que no se quede aquí, para
    // acabar con esta práctica de tortura y símbolo de españolidad.»
    text: "En todo caso, este é un paso positivo que esperemos que non fique aquí para acabar con esta práctica de tortura e símbolo de españolidade.",
    source: dscd(15, "140", 9, "2025-10-07", "DSCD Pleno núm. 140 (XV), 7-10-2025 — Proposición de Ley (ILP) para la derogación de la Ley 18/2013 de la Tauromaquia"),
    videoUrl: "https://app.congreso.es/v1/15759953I",
    i18n: ROLE_XV_I18N,
  },
  {
    partyId: "bng",
    questionId: "gasto-defensa",
    speaker: SPEAKER,
    role: ROLE_XV,
    date: "2026-06-10",
    // Autor de la moción. DSCD (p. 87): «Cada céntimo que va a armamento es un céntimo que se detrae de
    // la protección social y de la necesaria mejora de los servicios públicos, por mucho que se empeñe
    // este Gobierno en negarlo»
    text: "Cada céntimo que vai a armamento é un céntimo que se detrae da protección social e da necesaria mellora dos servizos públicos, por moito que se empeñe o goberno en negalo",
    source: dscd(15, "190", 85, "2026-06-10", "DSCD Pleno núm. 190 (XV), 10-6-2026 — Moción del GMx (Sr. Rego Candamil) sobre la reversión del incremento del gasto militar"),
    videoUrl: "https://app.congreso.es/v1/15774759I",
    i18n: ROLE_XV_I18N,
  },
];
