import type { Position, ProgrammeStance, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Chunta Aragonesista (WP3).
 *
 * En las generales de 2023 CHA concurrió dentro de la candidatura de Sumar
 * Aragón (sin programa propio: su web solo enlaza actos de «Sumar Aragón»), así
 * que se usa el programa propio oficial más reciente que se ha podido leer.
 *
 * El programa de las autonómicas de Aragón del 8-F-2026 está enlazado desde
 * https://www.chunta.org/aragon26/ pero el PDF
 * (https://www.chunta.org/wp-content/uploads/2026/02/Programa-electoral.pdf)
 * devuelve 404 el 2026-10-06 y la única copia en la Wayback Machine es la
 * página de error. Por eso se usa el «Programa electoral — Elecciones
 * autonómicas 2023» (154 págs.), alojado por el propio partido. Cuando se
 * recupere el de 2026, rehacer por diff.
 *
 * Páginas: número de página del PDF (coincide con la paginación impresa).
 */

const SOURCE = {
  url: "https://www.chunta.org/wp-content/uploads/2026/01/Programa-CHA-2023.pdf",
  title: "Chunta Aragonesista — Programa electoral, elecciones autonómicas 2023",
  year: 2023,
};

const CONTEXT =
  "Programa de autonómicas de Aragón 2023; en las generales de 2023 CHA concurrió dentro de Sumar sin programa propio, y el PDF del programa de autonómicas 2026 no está disponible (404, sin copia en Wayback).";

function sinPosicion(questionId: string, searched: string): Stance {
  return {
    partyId: "cha",
    questionId,
    programme: {
      position: 0,
      status: "sin-posicion",
      confidence: "media",
      quote: "",
      source: { ...SOURCE },
      note: `No trata el asunto. ${CONTEXT} Leído completo (154 págs.). Buscado: ${searched}.`,
    },
    record: null,
  };
}

/**
 * Revisión ciega del 2026-10-06 (docs/AFINIDAD-REVISION.md): posición que dio
 * el revisor a cada celda verificada viendo solo enunciado, cita y fuente, sin
 * la posición del codificador. `agrees` = diferencia ≤ 1 (docs/AFINIDAD-DATOS.md §4).
 */
const REVISOR: Record<string, Position> = {
  "jornada-37-5": 2,
  "nuclear": -2,
  "gasto-defensa": -2,
  "impuesto-grandes-fortunas": 1,
  "tauromaquia-patrimonio": -1,
  "prostitucion-abolicion": 2,
  "impuesto-banca": 1,
};

const revisor = (questionId: string, position: Position): { reviewer?: ProgrammeStance["reviewer"] } => {
  const r = REVISOR[questionId];
  return r === undefined ? {} : { reviewer: { position: r, agrees: Math.abs(r - position) <= 1 } };
};

function verificado(
  questionId: string,
  position: -2 | -1 | 1 | 2,
  confidence: "alta" | "media",
  quote: string,
  page: string,
  note: string,
): Stance {
  return {
    partyId: "cha",
    questionId,
    programme: {
      position,
      status: "verificado",
      ...revisor(questionId, position),
      confidence,
      quote,
      source: { ...SOURCE, page },
      note: `${CONTEXT} ${note}`,
    },
    record: null,
  };
}

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "alquiler, precio, renta, tope, limitar, zonas tensionadas (págs. 52-53: ley de vivienda aragonesa, parque público de alquiler, ayudas; nada sobre limitar la renta de contratos privados)",
  ),
  sinPosicion(
    "irpf-inflacion",
    "IRPF, deflactar, inflación, tramos (pág. 110 pide «Incrementar la tributación en el IRPF para las rentas más altas», no la actualización con la inflación)",
  ),
  verificado(
    "jornada-37-5",
    2,
    "media",
    "Potenciar la jornada laboral de 4 días, sin que la misma suponga aumentar la jornada diaria, ni reducciones salariales, con el objetivo de alcanzar una jornada laboral de 35 horas semanales.",
    "106",
    "Pide una reducción mayor (35 horas) y sin reducción salarial; confianza media porque no menciona las 37,5 horas del enunciado. En la pág. 94 también: «Universalizar la jornada laboral de 35 horas en el ámbito de la administración pública aragonesas y empresas públicas».",
  ),
  sinPosicion("amnistia", "amnistía, procés, Cataluña, represión"),
  verificado(
    "nuclear",
    -2,
    "alta",
    "abandonando progresivamente la energía generada en reactores nucleares, procediendo al cierre inmediato de todas las centrales nucleares peligrosas y obsoletas.",
    "62",
    "Fragmento final de la medida «Impulsar un nuevo modelo energético…» (apartado «Nuevo modelo energético»).",
  ),
  verificado(
    "gasto-defensa",
    -2,
    "media",
    "Fomentar la cultura de la Paz, aprobando una ley propia en las Cortes de Aragón, solicitando la finalización de misiones militares y eliminando la inversión en investigación y desarrollo de la industria militar con fondos públicos o en centros de investigación públicos, así como la inversión en armamento.",
    "85",
    "Apartado «Cultura de la paz y la solidaridad internacionalista». Confianza media: el programa es de mayo de 2023 y se opone a la inversión en armamento en general, no al aumento concreto de los últimos años.",
  ),
  verificado(
    "impuesto-grandes-fortunas",
    1,
    "media",
    "Recuperar el Impuesto sobre el Patrimonio o sustituirlo por otro que grave la riqueza patrimonial.",
    "110",
    "Apartado «Modelo fiscal aragonés». +1 y no +2: apoya gravar la riqueza patrimonial, pero no habla de un impuesto estatal específico sobre patrimonios de más de 10 millones.",
  ),
  sinPosicion(
    "okupacion-desalojo",
    "okupación, ocupación ilegal, usurpación, desalojo (págs. 145-146 solo hablan de informar a personas vulnerables para evitar el desalojo o desahucio de su vivienda familiar)",
  ),
  sinPosicion("inmigracion-competencias-cataluna", "competencias de inmigración, Generalitat, Cataluña, delegación"),
  verificado(
    "tauromaquia-patrimonio",
    -1,
    "media",
    "Eliminar todas aquellas subvenciones dirigidas a la tauromaquia o espectáculos con animales.",
    "151",
    "Apartado «Regular los espectáculos con animales». La medida anterior de la misma página pide «Suprimir las declaraciones de Bien de Interés Cultural, Turístico o Fiesta de Interés de la Comunidad Autónoma de Aragón donde se produzca maltrato animal», y otra «Prohibir el acceso de menores de edad a corridas de toros o escuelas taurinas». −1 y no −2: no pide expresamente derogar la protección legal estatal (Ley 18/2013).",
  ),
  sinPosicion(
    "prisiones-agentes-autoridad",
    "prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad (pág. 15 solo pide «Reclamar las competencias en materia de gestión penitenciaria» y la sanidad penitenciaria)",
  ),
  verificado(
    "prostitucion-abolicion",
    2,
    "alta",
    "La persecución del proxenetismo en todas sus formas, incluido el no coactivo, que llevará consigo la introducción de nuevos delitos en el código penal, como la tercería locativa o el rufianismo (lover-boy). – La sanción penal de la demanda y compra de sexo de cualquier naturaleza.",
    "123",
    "Dos de los tres pilares de la «Ley Integral para la Abolición de la Prostitución» que propone (apartado «Medidas contra el sistema de prostitución y la trata»); el tercero dice: «Se eliminará la sanción administrativa a las mujeres en situación de prostitución». Coincide con los tres elementos del enunciado. Se han quitado los guiones de partición de línea («de-litos»).",
  ),
  verificado(
    "impuesto-banca",
    1,
    "media",
    "Implantar un nuevo impuesto a las entidades financieras, sobre depósitos bancarios de las personas y empresas con domicilio fiscal en Aragón, para garantizar su contribución a la financiación de los servicios públicos en Aragón.",
    "110",
    "Apartado «Modelo fiscal aragonés». Quiere gravar más a la banca, pero con un impuesto autonómico sobre depósitos, no con el gravamen temporal sobre márgenes ni el 75 % sobre beneficios extraordinarios del enunciado: +1.",
  ),
  sinPosicion("registro-lobbies", "lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa, puertas giratorias"),
  sinPosicion("iva-primera-vivienda", "IVA, superreducido, primera vivienda, compra de vivienda, adquisición, Transmisiones Patrimoniales, Actos Jurídicos Documentados, fiscalidad de la vivienda (págs. 52-53: solo pide «medidas fiscales» que eximan de tributar las ayudas al alquiler y la rehabilitación y explorar reducciones del IRPF por alquiler; nada sobre los impuestos de la compra)"),
];
