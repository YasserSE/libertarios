import type { Explainer } from "./types";
import { fromDataset, govRow } from "./party-video";

/**
 * «Impuestos: lo que prometen y lo que votan». Neutral, solo datos del test.
 * `npm run check` comprueba que la voz y las filas cuadran.
 */
export const IMPUESTOS_GOV = { pp: "pp-irpf-2011", psoe: "psoe-presupuestos-2026" } as const;

export const impuestosPartidos: Explainer = {
  id: "impuestos-partidos",
  header: "PAPELETA · IMPUESTOS",
  rail: ["IRPF", "FORTUNAS", "BANCA", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    {
      rail: -1,
      min: 3.5,
      script: "Hablemos de impuestos: todos dicen que los bajarán… o que pagarán los ricos. Veamos qué votan de verdad.",
      scene: { kind: "headline", lines: ["Hablemos", "de", "impuestos."], highlight: 2, sub: "Qué prometen, qué votan… y quién dice una cosa y hace otra.", subCue: "todos" },
    },
    {
      rail: 0,
      min: 6,
      script: "¿Subir los tramos del IRPF con la inflación, para que no pagues más solo porque sube el IPC? PP y Vox votaron sí. PSOE, Sumar y Podemos, no.",
      scene: {
        kind: "partyGrid",
        title: "IRPF y la inflación",
        question: "Los tramos del IRPF deben actualizarse cada año con la inflación.",
        rows: fromDataset("irpf-inflacion", {}),
        source: "Programas · Congreso, proposición del PP, 9-abr-2024",
      },
    },
    {
      rail: 1,
      min: 7,
      script: "¿Un impuesto fijo a los patrimonios de más de 10 millones? Sumar y Podemos, sí. PP y Vox, no. ¿Y el PSOE? También votó no… aunque ese mismo año, con el PSOE en el Gobierno, se aprobó uno temporal.",
      scene: {
        kind: "partyGrid",
        title: "Grandes fortunas",
        question: "Un impuesto estatal específico sobre los patrimonios de más de 10 millones de euros.",
        rows: fromDataset("impuesto-grandes-fortunas", {}),
        source: "Programas · Congreso, proposición de Unidas Podemos, 7-jun-2022",
      },
    },
    {
      rail: 2,
      min: 6,
      script: "¿Gravar al 75 % los beneficios extra de la banca por la subida de tipos? Sumar y Podemos, sí. PSOE, PP y Vox, no.",
      scene: {
        kind: "partyGrid",
        title: "Impuesto a la banca",
        question: "Duplicar el gravamen a la banca y gravar al 75 % sus beneficios extraordinarios.",
        rows: fromDataset("impuesto-banca", {}),
        source: "Programas · Congreso, proposición del Grupo Mixto, 9-abr-2024",
      },
    },
    {
      rail: 3,
      min: 7,
      script: "¿Y cuando gobiernan? Rajoy dijo que su intención era no subir impuestos: once días después subió el IRPF. Y Sánchez prometió presentar los Presupuestos de 2026: no llegó a presentarlos.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          govRow("pp", IMPUESTOS_GOV.pp, "«Mi intención es no subir los impuestos»: once días después, subida del IRPF", "Rajoy, investidura 2011 · BOE", "rajoy"),
          govRow("psoe", IMPUESTOS_GOV.psoe, "Presentar los Presupuestos de 2026: ningún proyecto llegó al Congreso", "Sánchez, Congreso 2025 · Congreso", "sánchez"),
        ],
        source: "«Dijeron vs. hicieron» · BOE · Congreso",
      },
    },
    {
      rail: 4,
      min: 3.5,
      script: "¿Quién te sube y quién te baja los impuestos? Ya lo has visto. ¿Conoces a alguien que no sabe a quién votar? Mándaselo. Y más comparaciones, en el perfil.",
      scene: { kind: "ending", title: ["¿Duda a", "quién", "votar?"], cta: [], body: "Más comparaciones en el perfil.", shareTo: "Alguien que no sabe a quién votar" },
    },
  ],
};
