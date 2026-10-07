import type { Quote } from "../types";

/**
 * Hemeroteca de UPN.
 *
 * Solo XV legislatura: su diputado, Alberto Catalán Higueras, se sienta en el
 * Grupo Mixto (atribución en `../deputies.ts`). En la XIV, UPN concurrió dentro
 * de Navarra Suma y no se le atribuye nada (véase la nota de `../deputies.ts`).
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. `videoUrl` es el clip de la
 * intervención en congreso.es.
 */

const dscd = (num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

const SPEAKER = "Alberto Catalán Higueras";
const ROLE = "Diputado de UPN (Grupo Parlamentario Mixto)";
const ROLE_I18N: Quote["i18n"] = {
  ca: { role: "Diputat d'UPN (Grup Parlamentari Mixt)" },
  gl: { role: "Deputado de UPN (Grupo Parlamentario Mixto)" },
  eu: { role: "UPNko diputatua (Talde Parlamentario Mistoa)" },
};

export const quotes: Quote[] = [
  {
    partyId: "upn",
    questionId: "amnistia",
    speaker: SPEAKER,
    role: ROLE,
    date: "2024-03-14",
    text: "Hoy, con premeditación y alevosía, asistimos a una de las mayores ignominias a las que se ha sometido al Estado de derecho, a la Constitución y al propio sistema democrático de nuestro país",
    source: dscd("32", 3, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730162I",
    i18n: ROLE_I18N,
  },
  {
    partyId: "upn",
    questionId: "jornada-37-5",
    speaker: SPEAKER,
    role: ROLE,
    date: "2025-09-10",
    text: "Aprobamos el acuerdo, el entendimiento, la negociación, pero en ningún caso la intervención, la imposición y tampoco la amenaza.",
    source: dscd("135", 142, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758444I",
    i18n: ROLE_I18N,
  },
  {
    partyId: "upn",
    questionId: "inmigracion-competencias-cataluna",
    speaker: SPEAKER,
    role: ROLE,
    date: "2025-09-23",
    text: "Miren, atribuir a la Generalitat competencias en materia de inmigración es inconstitucional porque vulnera el artículo 149 de la Constitución, que confiere al Estado las competencias en exclusiva.",
    source: dscd("138", 16, "2025-09-23", "DSCD Pleno núm. 138 (XV), 23-9-2025 — Proposición de Ley Orgánica de delegación en Cataluña de competencias en inmigración"),
    videoUrl: "https://app.congreso.es/v1/15759114I",
    i18n: ROLE_I18N,
  },
  {
    partyId: "upn",
    questionId: "tauromaquia-patrimonio",
    speaker: SPEAKER,
    role: ROLE,
    date: "2025-10-07",
    text: "Navarra no se entendería sin los espectáculos taurinos, que son el referente principal de sus fiestas populares. Los sanfermines sin toros, señorías, no serían los sanfermines.",
    source: dscd("140", 9, "2025-10-07", "DSCD Pleno núm. 140 (XV), 7-10-2025 — Proposición de Ley (ILP) para la derogación de la Ley 18/2013 de la Tauromaquia"),
    videoUrl: "https://app.congreso.es/v1/15759952I",
    i18n: ROLE_I18N,
  },
  {
    partyId: "upn",
    questionId: "okupacion-desalojo",
    speaker: SPEAKER,
    role: ROLE,
    date: "2026-05-19",
    text: "Para que luego vengan el Gobierno y sus socios diciendo que la ocupación ilegal no es un problema.",
    source: dscd("185", 10, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773346I",
    i18n: ROLE_I18N,
  },
  {
    partyId: "upn",
    questionId: "prisiones-agentes-autoridad",
    speaker: SPEAKER,
    role: ROLE,
    date: "2026-06-11",
    text: "En esta formación política, Unión del Pueblo Navarro, siempre hemos tenido muy claro que había que proteger a los funcionarios y a los trabajadores de los centros penitenciarios españoles y que la figura de agente de la autoridad era una medida oportuna y necesaria.",
    source: dscd("191", 10, "2026-06-11", "DSCD Pleno núm. 191 (XV), 11-6-2026 — Dictamen de la Proposición de Ley Orgánica que reconoce a los funcionarios de prisiones como agentes de la autoridad (art. 80 LOGP)"),
    videoUrl: "https://app.congreso.es/v1/15775019I",
    i18n: ROLE_I18N,
  },
];
