import { extraRow } from "./extra-dvh";
import { EXTRA } from "./extra-votes";
import { fromDataset, fromExtra, govRow } from "./party-video";
import type { Explainer, ExplainerScene } from "./types";

/**
 * Vídeos neutrales «lo que prometen y lo que votan» (formato de vivienda-partidos)
 * con las votaciones de `extra-votes.ts`. `npm run check` compara la voz con las filas.
 */
const src = (id: string, what: string) => `Programas · Congreso, ${what}, ${new Date(EXTRA[id].date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }).replace(/ /g, "-").replace(".", "").replace("sept", "sep")}`;
const grid = (id: string, title: string, what: string, rail: number, script: string, min = 6.5): ExplainerScene => ({
  rail,
  min,
  script,
  scene: { kind: "partyGrid", title, question: EXTRA[id].question, rows: fromExtra(EXTRA[id], {}), source: src(id, what) },
});
const hook = (topic: string | string[], script: string, sub: string): ExplainerScene => ({
  rail: -1,
  min: 3.5,
  script,
  scene: { kind: "headline", lines: typeof topic === "string" ? ["Hablemos", "de", topic] : topic, highlight: 2, sub, subCue: "prometen" },
});
/** Cierre: el punch, a quién mandárselo y «más comparaciones en el perfil». */
const ending = (rail: number, punch: string, who: string, title: string[], shareTo: string): ExplainerScene => ({
  rail,
  min: 3.5,
  script: `${punch} ¿Conoces a ${who}? Mándaselo. Y más comparaciones, en el perfil.`,
  scene: { kind: "ending", title, cta: [], body: "Más comparaciones en el perfil.", shareTo },
});
const UNDECIDED = ["alguien que no sabe a quién votar", ["¿Duda a", "quién", "votar?"], "Alguien que no sabe a quién votar"] as const;

export const PENSIONES_GOV = { pp: "pp-pensiones-2012", psoe: "psoe-fondo-reserva-5000-2023" } as const;
export const pensionesPartidos: Explainer = {
  id: "pensiones-partidos",
  header: "PAPELETA · PENSIONES",
  rail: ["SUBIDA", "OTRA VEZ", "TRABAJAR", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    hook("pensiones.", "Hablemos de pensiones: todos prometen protegerlas… pero mira lo que votan.", "Qué prometen PP, PSOE, Vox, Sumar y Podemos… y qué votan."),
    grid("pensiones-omnibus-2026", "Subir las pensiones", "decreto ómnibus", 0,
      "Enero de 2026: un decreto sube las pensiones un 2,7 %, junto a otras medidas. PSOE, Sumar y Podemos votaron sí. PP y Vox, no… y el decreto cayó."),
    grid("pensiones-revalorizacion-2026", "La subida, sola", "decreto de pensiones", 1,
      "Un mes después, la subida va sola en otro decreto. Ahora el PP vota sí. ¿Y Vox? Otra vez no."),
    grid("pension-y-trabajo-2025", "Pensión y trabajo", "decreto de compatibilidad", 2,
      "¿Cobrar la pensión y seguir trabajando? PP, PSOE y Sumar votaron sí. Vox y Podemos, no."),
    {
      rail: 3,
      min: 7,
      script: "¿Y cuando gobiernan? Rajoy subió las pensiones un 1 %… y once meses después anuló la compensación por el IPC. Sánchez prometió 5.000 millones al año para la hucha de las pensiones: puso 3.600 y 4.400.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          govRow("pp", PENSIONES_GOV.pp, "Pensiones al día con el IPC en 2012: subió un 1 % y anuló la compensación", "Rajoy, investidura 2011 · BOE", "rajoy"),
          govRow("psoe", PENSIONES_GOV.psoe, "5.000 M€ al año al Fondo de Reserva: 3.604 en 2024 y 4.373 en 2025", "Sánchez, investidura 2023 · Seguridad Social", "sánchez"),
        ],
        source: "«Dijeron vs. hicieron» · BOE · Seguridad Social",
      },
    },
    ending(4, "¿Quién protege tu pensión? No siempre quien lo promete.", "algún pensionista", ["¿Algún", "pensionista", "cerca?"], "Tu abuela, tu padre, tu vecino jubilado"),
  ],
};

export const inmigracionPartidos: Explainer = {
  id: "inmigracion-partidos",
  header: "PAPELETA · INMIGRACIÓN",
  rail: ["PAPELES", "ARRAIGO", "MENORES", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    hook("inmigración.", "Hablemos de inmigración: qué prometen los partidos… y qué votan, que no siempre cuadra.", "Qué prometen PP, PSOE, Vox, Sumar y Podemos… y qué votan."),
    grid("regularizacion-ilp-2024", "Regularización", "iniciativa popular", 0,
      "¿Tramitar una ley para dar papeles a los inmigrantes que ya viven aquí sin ellos? Votaron sí todos… menos Vox. Sí: el PP también.", 7),
    grid("arraigo-vox-2025", "Arraigo", "ley de Vox", 1,
      "¿Restringir el arraigo, la vía para regularizarse tras años aquí? Vox y PP votaron sí. PSOE, Sumar y Podemos, no. Se rechazó por ocho votos."),
    grid("reparto-menores-2024", "Menores que llegan solos", "reforma de Extranjería", 2,
      "¿Repartir entre comunidades a los menores que llegan solos? PSOE, Sumar y Podemos votaron sí. PP y Vox, no… y no salió por seis votos."),
    {
      rail: 3,
      min: 7,
      script: "¿Y cuando gobiernan? Sumar prometió cerrar todos los CIE: en 2026, el Gobierno del que forma parte creó uno nuevo en Algeciras. Y prometió una regularización permanente por ley: hubo una única, por decreto, con plazo hasta junio.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          extraRow("sumar-cie-2023", "Cerrar todos los CIE: en 2026, nuevo CIE en Algeciras", "Programa 2023, p. 105 · BOE, Orden INT/63/2026", "cie"),
          extraRow("sumar-regularizacion-2023", "Regularización permanente por ley: una única, por decreto, hasta junio de 2026", "Programa 2023, p. 104 · BOE, RD 316/2026", "regularización"),
        ],
        source: "Programas · BOE · Congreso",
      },
    },
    ending(4, "¿Quién dice una cosa y vota otra? Ya lo has visto.", UNDECIDED[0], [...UNDECIDED[1]], UNDECIDED[2]),
  ],
};

export const sanidadEducacionPartidos: Explainer = {
  id: "sanidad-educacion-partidos",
  header: "PAPELETA · SANIDAD Y EDUCACIÓN",
  rail: ["SALUD", "TARJETA", "0-3 AÑOS", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    hook(["Hablemos de", "sanidad y", "educación."], "Hablemos de sanidad y educación: todos prometen defenderlas. Veamos qué votan.", "Qué prometen PP, PSOE, Vox, Sumar y Podemos… y qué votan."),
    grid("agencia-salud-publica-2025", "Salud pública", "proyecto de ley", 0,
      "¿Crear una Agencia Estatal de Salud Pública? El PP la llevaba en su programa… y votó no. PSOE, Sumar y Podemos, sí. Con el no de PP, Vox y Junts, la ley cayó.", 7),
    grid("tarjeta-sanitaria-2024", "Tarjeta sanitaria", "ley de Vox", 1,
      "¿Una tarjeta sanitaria que sirva en toda España? La propuso Vox. El PP, que también la promete, se abstuvo. PSOE, Sumar y Podemos, no."),
    grid("escuelas-0-3-2026", "Escuelas de 0 a 3 años", "moción", 2,
      "¿Más plazas públicas de 0 a 3 años, con menos alumnos por aula? Los cinco prometen guarderías gratuitas o universales. PP y Vox votaron no… y la moción perdió por un voto.", 7),
    {
      rail: 3,
      min: 7,
      script: "¿Y cuando gobiernan? El PSOE prometió una ley con un máximo de 120 días para operarse: no hubo ley, y la espera media sigue en 122 días. Sumar prometió pasar MUFACE a la sanidad pública: el Gobierno renovó el concierto con aseguradoras privadas hasta 2027.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          extraRow("psoe-listas-espera-2023", "Ley con 120 días máximo para operarse: no hubo ley; espera media, 122 días", "Programa 2023, p. 201 · Ministerio de Sanidad, SISLE dic-2025", "psoe"),
          extraRow("sumar-muface-2023", "Integrar MUFACE en la sanidad pública: concierto con Adeslas y Asisa hasta 2027", "Programa 2023, p. 92 · Función Pública, abr-2025", "muface"),
        ],
        source: "Programas · Congreso · Ministerio de Sanidad · Función Pública",
      },
    },
    ending(4, "¿Quién defiende de verdad lo que promete? Ya lo has visto.", "algún médico, enfermera o profe", ["¿Algún", "médico o", "profe?"], "Ese médico, enfermera o profe que conoces"),
  ],
};

export const SEGURIDAD_GOV = { sahara: "psoe-sahara-autodeterminacion-2019", psoe: "psoe-ley-mordaza-2019", podemos: "podemos-ley-mordaza-2019" } as const;
export const seguridadPartidos: Explainer = {
  id: "seguridad-partidos",
  header: "PAPELETA · SEGURIDAD",
  rail: ["HURTOS", "POLICÍA", "CEUTA", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    hook("seguridad.", "Hablemos de seguridad en tu ciudad: qué prometen los partidos… y qué votan.", "Qué prometen PP, PSOE, Vox, Sumar y Podemos… y qué votan."),
    grid("multirreincidencia-2026", "Hurtos repetidos", "votación final de la ley", 0,
      "¿Más castigo para quien acumula hurtos? Salió adelante: PP y PSOE votaron sí. Sumar y Podemos, no. ¿Y Vox? Votó sí al empezar… y no al final.", 7),
    grid("equiparacion-policia-2024", "Sueldo de la policía", "proposición del PP", 1,
      "¿Pagar a policías y guardias civiles lo mismo que a Mossos y Ertzaintza? PP y Vox votaron sí. PSOE, Sumar y Podemos, no. Perdió por tres votos."),
    {
      rail: 2,
      min: 7,
      script: "Julio de 2026: entrada masiva de personas en Ceuta. ¿Llamar a consultas al embajador en Marruecos? PP, Vox y Sumar votaron sí. PSOE y Podemos, no.",
      scene: {
        kind: "partyGrid",
        title: "Ceuta",
        question: "Tras la entrada masiva en Ceuta, llamar a consultas al embajador en Marruecos y exigir explicaciones.",
        rows: fromDataset("ceuta-embajador-marruecos", {}),
        source: "Programas · Congreso, moción del PP, 16-sep-2026",
      },
    },
    {
      rail: 3,
      min: 6,
      script: "¿Y cuando gobiernan? El PSOE prometía autodeterminación para el Sáhara… y Sánchez apoyó el plan de Marruecos. Y PSOE y Podemos prometieron sustituir la ley mordaza: sigue vigente.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          govRow("psoe", SEGURIDAD_GOV.sahara, "Autodeterminación del Sáhara: en 2022 apoyó el plan de autonomía de Marruecos", "Programa 2019 · carta al rey de Marruecos, 2022", "sáhara"),
          govRow("psoe", SEGURIDAD_GOV.psoe, "Sustituir la «ley mordaza»: sigue vigente", "Acuerdo de Gobierno 2019 · BOE", "mordaza"),
          govRow("podemos", SEGURIDAD_GOV.podemos, "Sustituir la «ley mordaza»: sigue vigente", "Acuerdo de Gobierno 2019 · BOE", "podemos"),
        ],
        source: "«Dijeron vs. hicieron» · BOE · Moncloa",
      },
    },
    ending(4, "¿Quién te protege de verdad? No siempre quien lo promete.", UNDECIDED[0], [...UNDECIDED[1]], UNDECIDED[2]),
  ],
};

export const CORRUPCION_GOV = { pp: "pp-verdad-barcenas-kitchen-2013", abalos: "psoe-corrupcion-mocion-censura-2018", psoe: "psoe-comision-investigacion-koldo-2025" } as const;
export const corrupcionPartidos: Explainer = {
  id: "corrupcion-partidos",
  header: "PAPELETA · CORRUPCIÓN",
  rail: ["OFICINA", "LOBBIES", "GOBIERNO", "¿Y TÚ?"],
  scenes: [
    hook("corrupción.", "Hablemos de corrupción: todos prometen combatirla… veamos qué votan.", "Qué prometen PP, PSOE, Vox, Sumar y Podemos… y qué votan."),
    {
      rail: 0,
      min: 7,
      script: "¿Crear una oficina independiente contra la corrupción? PSOE, Sumar y Podemos votaron sí. PP y Vox, no. Y ojo: Vox prometía crear una.",
      scene: {
        kind: "partyGrid",
        title: "Oficina anticorrupción",
        question: "Una oficina estatal independiente contra la corrupción, con dirección elegida por el Congreso.",
        rows: fromDataset("oficina-anticorrupcion", {}),
        source: "Programas · Congreso, proposición de Sumar, 16-sep-2025",
      },
    },
    grid("lobbies-2026", "Registro de lobbies", "decreto de grupos de interés", 1,
      "¿Un registro público de quién presiona a los políticos? El PP lo prometía… y votó no, sus 137 diputados. Vox, no. Podemos, que también lo prometía, se abstuvo. Y el decreto cayó.", 7),
    {
      rail: 2,
      min: 7,
      script: "¿Y cuando gobiernan? Rajoy prometió hacer todo lo necesario para aclarar la verdad: el PP votó contra investigar la operación Kitchen. Sánchez llegó en 2018 prometiendo asumir responsabilidades por la corrupción… y en 2026 el Supremo condenó a su ministro Ábalos a 24 años de cárcel. La comisión que anunció sobre el caso Koldo nunca llegó al Pleno.",
      scene: {
        kind: "dvhList",
        title: "Cuando gobiernan",
        rows: [
          govRow("pp", CORRUPCION_GOV.pp, "«Haremos todo lo que haga falta para que la verdad se aclare»: votó contra la comisión Kitchen", "Rajoy, 2013 · Congreso", "rajoy"),
          govRow("psoe", CORRUPCION_GOV.abalos, "«Asumir responsabilidades»: en 2026, Ábalos, su ministro y secretario de Organización del PSOE, condenado a 24 años", "Sánchez, 2018 · Tribunal Supremo, 22-6-2026", "sánchez"),
          govRow("psoe", CORRUPCION_GOV.psoe, "Comisión de investigación del caso Koldo: registrada, nunca llegó al Pleno", "Sánchez, 2025 · Congreso", "koldo"),
        ],
        source: "«Dijeron vs. hicieron» · Congreso · Tribunal Supremo",
      },
    },
    ending(3, "¿Quién lucha de verdad contra la corrupción? No siempre quien lo promete.", UNDECIDED[0], [...UNDECIDED[1]], UNDECIDED[2]),
  ],
};
