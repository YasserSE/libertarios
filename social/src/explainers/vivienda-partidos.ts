import { dvh, VERDICT_LABEL } from "../data";
import { fromDataset } from "./party-video";
import type { DvhRow, Explainer, GridRow } from "./types";

/**
 * «Vivienda: lo que dicen y lo que hacen». Neutral: solo datos del test
 * (Libertarios/public/afinidad/datos-*.json). Las filas se calculan aquí; el
 * guion de voz las resume y `npm run check` comprueba que guion y datos cuadran.
 */
export { PARTIES } from "./party-video";
export const HOUSING_QUESTIONS = ["vivienda-tope-alquiler", "iva-primera-vivienda", "okupacion-desalojo"] as const;

export const grid = (q: string, cues: Record<string, string>): GridRow[] => fromDataset(q, cues);

/** «Dijo / hizo» de los dos partidos que han gobernado. `npm run check` comprueba veredicto y cifras. */
export const GOV_DVH = { pp: "pp-deduccion-vivienda-2011", psoe: "psoe-vivienda-183000-2023" } as const;
const govRows = (): DvhRow[] => [
  { partyId: "pp", topic: "Recuperar la deducción por vivienda: la recuperó en 2011 y la quitó desde 2013", verdict: VERDICT_LABEL[dvh(GOV_DVH.pp)!.verdict], counts: "Rajoy, investidura 2011 · BOE", cue: "rajoy" },
  { partyId: "psoe", topic: "183.000 viviendas asequibles: 32.444 protegidas terminadas desde 2024, de todas las administraciones", verdict: VERDICT_LABEL[dvh(GOV_DVH.psoe)!.verdict], counts: "Sánchez, investidura 2023 · Ministerio de Vivienda", cue: "sánchez" },
];

export const viviendaPartidos: Explainer = {
  id: "vivienda-partidos",
  header: "PAPELETA · VIVIENDA",
  rail: ["ALQUILER", "IVA", "OKUPACIÓN", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    {
      rail: -1,
      min: 3.5,
      script: "Hablemos de vivienda: qué prometen los partidos, qué votan… y quién te podría estar engañando.",
      scene: { kind: "headline", lines: ["Hablemos", "de", "vivienda."], highlight: 2, sub: "Qué prometen, qué votan… y quién te podría estar engañando.", subCue: "prometen" },
    },
    {
      rail: 0,
      min: 6,
      script: "¿Topar el alquiler en zonas tensionadas? PSOE, Sumar y Podemos lo prometen, y votaron a favor de la ley de vivienda. PP y Vox, ni lo prometen ni lo votaron.",
      scene: {
        kind: "partyGrid",
        title: "Topar el alquiler",
        question: "En zonas tensionadas, la ley debe limitar el precio de los nuevos alquileres.",
        rows: grid("vivienda-tope-alquiler", { psoe: "psoe", sumar: "sumar", podemos: "podemos", pp: "pp", vox: "vox" }),
        source: "Programas · Congreso, ley de vivienda, 27-abr-2023",
      },
    },
    {
      rail: 1,
      min: 6,
      script: "¿Bajar el IVA de la primera vivienda del 10 al 4 %? En una moción, PP y Vox votaron sí. Sumar y Podemos, no. Y el PSOE se abstuvo.",
      scene: {
        kind: "partyGrid",
        title: "IVA de la primera vivienda",
        question: "El IVA de la primera vivienda nueva debe bajar del 10 % al 4 %.",
        rows: grid("iva-primera-vivienda", { pp: "pp", vox: "vox", sumar: "sumar", podemos: "podemos", psoe: "psoe" }),
        source: "Programas · Congreso, moción no vinculante, 10-sep-2026",
      },
    },
    {
      rail: 2,
      min: 7,
      script: "¿Desalojar a los okupas en 24 horas? PP y Vox votaron sí. Sumar y Podemos, no. Y ojo: el PSOE promete desalojos en 48 horas. ¿Votó la ley del PP? No.",
      scene: {
        kind: "partyGrid",
        title: "Okupación",
        question: "Desalojo si en 24 horas los ocupantes no acreditan un título legal.",
        rows: grid("okupacion-desalojo", { pp: "pp", vox: "vox", sumar: "sumar", podemos: "podemos", psoe: "psoe" }),
        source: "Programas · Congreso, ley del PP, 19-may-2026",
      },
    },
    {
      rail: 3,
      min: 7,
      script: "¿Y cuando gobiernan? Rajoy prometió recuperar la deducción por vivienda: la recuperó… y un año después la quitó. Sánchez prometió 183.000 viviendas asequibles: la estadística oficial cuenta 32.000 protegidas terminadas desde 2024, de todas las administraciones.",
      scene: { kind: "dvhList", title: "Cuando gobiernan", rows: govRows(), source: "«Dijeron vs. hicieron» · BOE · Ministerio de Vivienda" },
    },
    {
      rail: 4,
      min: 3.5,
      script: "¿Quién te engaña? Ya lo has visto: a veces cumplen… y a veces no. ¿Conoces a alguien que no sabe a quién votar? Mándaselo. Y más comparaciones, en el perfil.",
      scene: { kind: "ending", title: ["¿Duda a", "quién", "votar?"], cta: [], body: "Más comparaciones en el perfil.", shareTo: "Alguien que no sabe a quién votar" },
    },
  ],
};
