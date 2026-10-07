import type { Confidence, Position, ProgrammeStance, Stance } from "../../types";

/**
 * Geroa Bai — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa Elecciones al Parlamento de Navarra 2023» (164 págs.),
 * publicado por el Parlamento de Navarra entre los programas de las
 * candidaturas. No se ha localizado un programa propio de Geroa Bai para las
 * generales de 2023, así que se usa el más reciente localizado (autonómicas del
 * 28-5-2023). Páginas = página del PDF (coinciden con la numeración impresa).
 * Leído con extracción de texto y búsqueda por palabras clave; cada cita se ha
 * cotejado con el texto de su página.
 */

const SOURCE = {
  url: "https://parlamentodenavarra.es/sites/default/files/contenido-estatico-archivos/Geroa%20Bai.pdf",
  title: "Geroa Bai — Programa Elecciones al Parlamento de Navarra 2023",
  year: 2023,
};

const CONTEXT =
  "Programa de las elecciones al Parlamento de Navarra 2023; no se ha localizado programa propio de Geroa Bai para las generales de 2023.";

/**
 * Revisión ciega del 2026-10-06 (docs/AFINIDAD-REVISION.md): posición que dio
 * el revisor a cada celda verificada viendo solo enunciado, cita y fuente, sin
 * la posición del codificador. `agrees` = diferencia ≤ 1 (docs/AFINIDAD-DATOS.md §4).
 */
const REVISOR: Record<string, Position> = {
  "vivienda-tope-alquiler": 1,
  "jornada-37-5": 1,
};

const revisor = (questionId: string, position: Position): { reviewer?: ProgrammeStance["reviewer"] } => {
  const r = REVISOR[questionId];
  return r === undefined ? {} : { reviewer: { position: r, agrees: Math.abs(r - position) <= 1 } };
};

const verified = (
  questionId: string,
  position: Position,
  confidence: Confidence,
  quote: string,
  page: string,
  note: string,
): Stance => ({
  partyId: "geroa-bai",
  questionId,
  programme: { position, status: "verificado", ...revisor(questionId, position), confidence, quote, source: { ...SOURCE, page }, note: `${CONTEXT} ${note}` },
  record: null,
});

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "geroa-bai",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: { ...SOURCE },
    note: `${CONTEXT} El programa no trata el asunto. Buscado: ${searched}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  verified(
    "vivienda-tope-alquiler",
    1,
    "media",
    "Desarrollar normativa, fiscal y operativamente el marco regulatorio de los precios de las rentas de vivienda de alquiler a través herramientas como el Registro de Contratos de Arrendamientos o el índice de Sostenibilidad de los Alquileres (ISA).",
    "104",
    "Regulación de rentas por índice de referencia; el punto siguiente concreta «un marco fiscal de medidas progresivas de incentivo o penalización» según se ajusten o superen el ISA, no un tope legal en zonas tensionadas: +1.",
  ),
  noPosition("irpf-inflacion", "«IRPF», «deflact», «inflación» (solo incentivos y exenciones puntuales en el IRPF navarro)"),
  verified(
    "jornada-37-5",
    1,
    "media",
    "medidas como la adopción de horarios laborales adecuados (políticas decididas de teletrabajo, limitación y control de horas extraordinarias, reducciones de jornada laboral, pudiendo explorar la jornada semanal de cuatro días, entre otras) para favorecer la conciliación laboral, personal y de los cuidados.",
    "29",
    "Dirección favorable a reducir la jornada, sin cifra ni rebaja de la jornada máxima legal: +1.",
  ),
  noPosition("amnistia", "«amnistía»"),
  noPosition("nuclear", "«nuclear»"),
  noPosition("gasto-defensa", "«militar», «defensa», «OTAN», «armamento»"),
  noPosition("impuesto-grandes-fortunas", "«patrimonio», «grandes fortunas», «riqueza» (solo fiscalidad «progresiva» genérica)"),
  noPosition("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  noPosition("inmigracion-competencias-cataluna", "«inmigración», «Cataluña», «competencias» (solo competencias de Navarra)"),
  noPosition("tauromaquia-patrimonio", "«tauromaquia», «toros», «corrida»"),
  noPosition(
    "prostitucion-abolicion",
    "«prostitución», «proxenetismo», «trata», «explotación sexual». Solo «Rechazo de la trata de personas y la explotación sexual» y «una alternativa laboral real a la prostitución, para quienes deseen salir de ella» (p. 115); nada sobre castigar al cliente o al proxeneta",
  ),
  noPosition("impuesto-banca", "«banca», «bancos», «entidades financieras», «gravamen» (solo colaboración con entidades financieras para el crédito, p. 22)"),
  noPosition("iva-primera-vivienda", "«IVA», «primera vivienda», «compra», «adquisición», «Transmisiones», «fiscalidad» junto a «vivienda» (solo pide «un IVA reducido en promoción de vivienda protegida de alquiler o proyectos de rehabilitación», p. 105, que no es la compra)"),
  noPosition("oficina-anticorrupcion", "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «Fiscalía», «conflicto de intereses», «malversación», «denunciantes» (solo el Plan de Lucha contra el Fraude Fiscal, p. 55, y actualizar el Consejo de Transparencia de Navarra, p. 156; ningún organismo contra la corrupción)"),
  noPosition(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana». Solo el apartado «Sahara» (p. 70): apoya «la realización de un referéndum como única solución a la situación de ocupación de su territorio que sufren los y las saharauis, por parte del Reino de Marruecos»; no trata la respuesta a Marruecos por Ceuta, así que no puntúa",
  ),
];
