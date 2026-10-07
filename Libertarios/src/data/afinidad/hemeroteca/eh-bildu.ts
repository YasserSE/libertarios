import type { Quote } from "../types";

/**
 * Hemeroteca de EH Bildu (Grupo Parlamentario Euskal Herria Bildu, «GEH Bildu»).
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. Todas las citas elegidas se pronunciaron
 * en castellano. `videoUrl` es el clip de la intervención en congreso.es.
 */

const dscd = (leg: 14 | 15, num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L${leg}/CONG/DS/PL/DSCD-${leg}-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

export const quotes: Quote[] = [
  {
    partyId: "eh-bildu",
    questionId: "amnistia",
    speaker: "Jon Iñarritu García",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2024-03-14",
    text: "una norma excepcional, cierto, pero justa al mismo tiempo, que saca de los tribunales lo que nunca debió llegar a ellos.",
    source: dscd(15, "32", 6, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730168I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "vivienda-tope-alquiler",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2023-04-27",
    text: "Nosotros hemos alcanzado un acuerdo con el Gobierno para apoyar esta ley de vivienda porque creemos que por fin se reconoce el derecho a la vivienda, se interviene y regula el mercado del alquiler topando los alquileres, se pone coto a la especulación y a los abusos",
    source: dscd(14, "265", 26, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda"),
    videoUrl: "https://app.congreso.es/v1/14723326I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "jornada-37-5",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2025-09-10",
    text: "Por solidaridad de clase, por la solidaridad de clase que la izquierda soberanista independentista vasca ha tenido siempre, nosotros vamos a rechazar las enmiendas a la totalidad y acompañaremos el proceso para implantar una reducción de la jornada laboral.",
    source: dscd(15, "135", 146, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758448I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Jon Iñarritu García",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2025-09-23",
    text: "En primer lugar, en Euskal Herria Bildu creemos que la cesión de competencias a un territorio que así lo reclama mayoritariamente es algo de sentido común y algo positivo.",
    source: dscd(15, "138", 20, "2025-09-23", "DSCD Pleno núm. 138 (XV), 23-9-2025 — Proposición de Ley Orgánica de delegación en Cataluña de competencias en inmigración"),
    videoUrl: "https://app.congreso.es/v1/15759118I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "impuesto-grandes-fortunas",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2022-06-07",
    text: "Y creemos que va en la buena dirección; aunque también decimos que es parcial, que no es suficiente, que no consigue arreglar todo, creemos que es un buen paso en la buena dirección.",
    source: dscd(14, "191", 9, "2022-06-07", "DSCD Pleno núm. 191 (XIV), 7-6-2022 — Proposición de Ley del Impuesto sobre grandes fortunas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/14706254I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "okupacion-desalojo",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2026-05-19",
    text: "Ustedes nuevamente se plantean castigar a los más débiles utilizando al poder público y su capacidad legislativa, retorciendo las leyes a favor de los más poderosos.",
    source: dscd(15, "185", 13, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773350I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "gasto-defensa",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2026-06-10",
    text: "Y lo hacíamos no contra un ejército por una bandera, sino contra todos los ejércitos, y ya entonces decíamos que los gastos militares, para políticas sociales.",
    source: dscd(15, "190", 88, "2026-06-10", "DSCD Pleno núm. 190 (XV), 10-6-2026 — Moción del GMx (Sr. Rego Candamil) sobre la reversión del incremento del gasto militar"),
    videoUrl: "https://app.congreso.es/v1/15775083I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "prostitucion-abolicion",
    speaker: "Isabel Pozueta Fernández",
    role: "Diputada del Grupo Parlamentario Euskal Herria Bildu",
    date: "2024-05-21",
    text: "Pero, no, el PSOE solo presenta una propuesta para penar, atacar y desproteger a quienes trabajan en la prostitución, condenándolas a una mayor exclusión y a una inseguridad.",
    source: dscd(15, "40", 27, "2024-05-21", "DSCD Pleno núm. 40 (XV), 21-5-2024 — Proposición de Ley Orgánica del GS para prohibir el proxenetismo en todas sus formas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15733411I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputada do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "impuesto-banca",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2024-04-09",
    text: "Dicho esto, vamos a apoyar la iniciativa porque creemos que hay que gravar más a los beneficios extraordinarios, a esos beneficios que se llamaron beneficios caídos del cielo.",
    source: dscd(15, "36", 24, "2024-04-09", "DSCD Pleno núm. 36 (XV), 9-4-2024 — Proposición de Ley del GMx sobre los beneficios caídos del cielo de la gran banca (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15731476I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "registro-lobbies",
    speaker: "Oskar Matute García de Jalón",
    role: "Diputado del Grupo Parlamentario Euskal Herria Bildu",
    date: "2026-09-16",
    text: "Es, en definitiva, arrojar luz sobre eso que en muchas ocasiones desde esta tribuna hemos señalado como un poder en la sombra: aquellos que no se presentan a las elecciones pero que gobiernan",
    source: dscd(15, "205", 72, "2026-09-16", "DSCD Pleno núm. 205 (XV), 16-9-2026 — Convalidación del Real Decreto-ley 21/2026, de transparencia e integridad de los grupos de interés"),
    videoUrl: "https://app.congreso.es/v1/15778466I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Euskal Herria Bildu" },
      gl: { role: "Deputado do Grupo Parlamentario Euskal Herria Bildu" },
      eu: { role: "Euskal Herria Bildu Talde Parlamentarioko diputatua" },
    },
  },
];
