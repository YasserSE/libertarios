import type { Quote } from "../types";

/**
 * Hemeroteca del PNV (Grupo Parlamentario Vasco (EAJ-PNV), «GV (EAJ-PNV)»).
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. Todas se pronunciaron en castellano.
 * `videoUrl` es el clip de la intervención en congreso.es.
 *
 * Nota: el DSCD núm. 265 (XIV) imprime el apellido del orador como
 * «BARANDARIAN BENITO»; el diputado es Íñigo Barandiaran Benito.
 */

const dscd = (leg: 14 | 15, num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L${leg}/CONG/DS/PL/DSCD-${leg}-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

const VIVIENDA = dscd(14, "265", 28, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda");

export const quotes: Quote[] = [
  {
    partyId: "pnv",
    questionId: "vivienda-tope-alquiler",
    speaker: "Íñigo Barandiaran Benito",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2023-04-27",
    text: "salvo en aspectos muy concretos en los que el Estado debería dotar a las comunidades autónomas de cobertura para decidir sus propias políticas públicas, esta ley se extralimita en sus competencias e invade las de las comunidades autónomas.",
    source: VIVIENDA,
    videoUrl: "https://app.congreso.es/v1/14723327I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "vivienda-tope-alquiler",
    speaker: "Íñigo Barandiaran Benito",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2023-04-27",
    text: "hay un compromiso en el Parlamento para regular medidas de control de los precios de alquiler en cuanto exista un paraguas jurídico para ello; y esta ley no sirve para eso.",
    source: VIVIENDA,
    videoUrl: "https://app.congreso.es/v1/14723327I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "impuesto-grandes-fortunas",
    speaker: "Idoia Sagastizabal Unzetabarrenetxea",
    role: "Diputada del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2022-06-07",
    text: "Nosotros creemos que no necesitan crear este impuesto cuando ya existe el impuesto sobre el patrimonio y tan solo requiere su modificación.",
    source: dscd(14, "191", 10, "2022-06-07", "DSCD Pleno núm. 191 (XIV), 7-6-2022 — Proposición de Ley del Impuesto sobre grandes fortunas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/14706255I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputada do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "amnistia",
    speaker: "Mikel Legarda Uriarte",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2024-03-14",
    text: "Este es el contexto de trasfondo y creemos que ha llegado el momento de afrontar con un nuevo punto de vista y con una nueva mirada diferente a la penal y a la de orden público lo que es un conflicto constitucional irresuelto",
    source: dscd(15, "32", 6, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730167I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "irpf-inflacion",
    speaker: "Idoia Sagastizabal Unzetabarrenetxea",
    role: "Diputada del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2024-04-09",
    // El PNV se abstuvo en la votación de la PNL.
    text: "Mi grupo es partidario de la deflactación de la tarifa, porque deflactar no es bajar los impuestos, como están diciendo algunos, es soportar la misma tributación que soportaríamos si la inflación no existiese",
    source: dscd(15, "36", 49, "2024-04-09", "DSCD Pleno núm. 36 (XV), 9-4-2024 — PNL del GP para deflactar el IRPF"),
    videoUrl: "https://app.congreso.es/v1/15731498I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputada do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "nuclear",
    speaker: "Idoia Sagastizabal Unzetabarrenetxea",
    role: "Diputada del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2025-06-17",
    text: "La nuclear, por tanto, seguirá aportando hasta el año 2035, y es que diez años es mucho tiempo en términos tecnológicos, sobre todo para avanzar, para ir compensando esa falta de nuclear.",
    source: dscd(15, "123", 13, "2025-06-17", "DSCD Pleno núm. 123 (XV), 17-6-2025 — Proposición de Ley del GP sobre la aportación de la energía nuclear"),
    videoUrl: "https://app.congreso.es/v1/15755818I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputada do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "jornada-37-5",
    speaker: "Idoia Sagastizabal Unzetabarrenetxea",
    role: "Diputada del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2025-09-10",
    text: "En cuanto al impacto en el empleo, la evidencia nos demuestra que reducir la jornada no destruye empleo. En Euskadi, la mayoría de los convenios ya han fijado jornadas de 37,5 horas e incluso 35 en el sector público, sin que ello haya frenado la economía ni reducido el empleo",
    source: dscd(15, "135", 144, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758447I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputada do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "okupacion-desalojo",
    speaker: "Mikel Legarda Uriarte",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2026-05-19",
    text: "Pero a nuestro grupo parlamentario no lo encontrarán en la atribución a otros poderes públicos, distintos del judicial, de facultades para la recuperación de la propiedad, salvo en el caso de delito flagrante",
    source: dscd(15, "185", 13, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773349I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "prostitucion-abolicion",
    speaker: "Joseba Andoni Agirretxea Urresti",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2024-05-21",
    text: "Porque lo que ustedes plantean aquí evidentemente es un castigo al proxenetismo, un castigo a los proxenetas, pero un abandono absoluto de las personas prostituidas, prostitutas o en ámbitos de prostitución",
    source: dscd(15, "40", 26, "2024-05-21", "DSCD Pleno núm. 40 (XV), 21-5-2024 — Proposición de Ley Orgánica del GS para prohibir el proxenetismo en todas sus formas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15733410I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "impuesto-banca",
    speaker: "Idoia Sagastizabal Unzetabarrenetxea",
    role: "Diputada del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2024-04-09",
    text: "No cuestionamos ni la existencia de beneficios ni que se tenga que tributar por ellos en un momento dado, cuestionamos la forma en la que se quieren gravar esos beneficios, señora Belarra. Lo que traen hoy aquí supone un ataque al autogobierno de Euskadi y de Nafarroa.",
    source: dscd(15, "36", 23, "2024-04-09", "DSCD Pleno núm. 36 (XV), 9-4-2024 — Proposición de Ley del GMx sobre los beneficios caídos del cielo de la gran banca (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15731475I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputada do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "oficina-anticorrupcion",
    speaker: "Mikel Legarda Uriarte",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2025-09-16",
    text: "votaremos a favor de su toma en consideración en atención a la cuestión de fondo abordada, que no es otra que la lucha contra la lacra de la corrupción en el uso de los recursos públicos en beneficio privado.",
    source: dscd(15, "136", 21, "2025-09-16", "DSCD Pleno núm. 136 (XV), 16-9-2025 — Proposición de Ley del GSUMAR de creación de la Oficina de prevención de la corrupción (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15758683I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
  {
    partyId: "pnv",
    questionId: "ceuta-embajador-marruecos",
    speaker: "Mikel Legarda Uriarte",
    role: "Diputado del Grupo Parlamentario Vasco (EAJ-PNV)",
    date: "2026-09-16",
    text: "hemos censurado ampliamente la gestión del Gobierno del presidente Sánchez en la crisis vivida en Ceuta. Por lo no hecho antes del 30 y 31 de julio; por la inacción durante prácticamente todo agosto; por la deferente indulgencia que muestra con la pasividad de Marruecos durante el julio pasado",
    source: dscd(15, "205", 137, "2026-09-16", "DSCD Pleno núm. 205 (XV), 16-9-2026 — Moción consecuencia de interpelación urgente del GP sobre la crisis de Ceuta (173/000189)"),
    videoUrl: "https://app.congreso.es/v1/15778512I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Basc (EAJ-PNV)" },
      gl: { role: "Deputado do Grupo Parlamentario Vasco (EAJ-PNV)" },
      eu: { role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua" },
    },
  },
];
