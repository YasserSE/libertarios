import type { Confidence, Position, ProgrammeStance, Stance } from "../../types";

/**
 * Foro Asturias — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa electoral FORO Asturias 2023-2027» (elecciones a la Junta
 * General del Principado del 28-5-2023, 125 págs.), en foroasturias.es. No se
 * ha localizado un programa propio de Foro para las generales de 2023. Páginas
 * = página del PDF (coinciden con «Página N de 125»). Cada cita se ha cotejado
 * con el texto de su página.
 */

const SOURCE = {
  url: "https://foroasturias.es/wp-content/uploads/2023/05/Programa-electoral-FORO-Asturias-20232027.pdf",
  title: "FORO Asturias — Programa electoral 2023-2027 (elecciones autonómicas)",
  year: 2023,
};

const CONTEXT =
  "Programa de las elecciones a la Junta General del Principado de Asturias 2023; no se ha localizado programa propio de Foro para las generales de 2023.";

/**
 * Revisión ciega del 2026-10-06 (docs/AFINIDAD-REVISION.md): posición que dio
 * el revisor a cada celda verificada viendo solo enunciado, cita y fuente, sin
 * la posición del codificador. `agrees` = diferencia ≤ 1 (docs/AFINIDAD-DATOS.md §4).
 */
const REVISOR: Record<string, Position> = {
  "irpf-inflacion": 1,
  "impuesto-grandes-fortunas": -2,
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
  partyId: "foro",
  questionId,
  programme: { position, status: "verificado", ...revisor(questionId, position), confidence, quote, source: { ...SOURCE, page }, note: `${CONTEXT} ${note}` },
  record: null,
});

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "foro",
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
  noPosition("vivienda-tope-alquiler", "«alquiler», «tensionada», «precio» (solo deducciones y vivienda protegida en alquiler)"),
  verified(
    "irpf-inflacion",
    1,
    "media",
    "Con el fin de prestar la necesaria ayuda a los asturianos para superar el proceso inflacionista en el que estamos inmersos, proponemos deflactar el tramo autonómico del IRPF y los importes correspondientes al mínimo personal y familiar aplicable para determinar el gravamen autonómico.",
    "37",
    "Deflactar solo el tramo autonómico y por la inflación del momento, no una actualización anual de toda la tarifa: +1.",
  ),
  noPosition("jornada-37-5", "«jornada», «37,5», «horas semanales»"),
  noPosition("amnistia", "«amnistía»"),
  noPosition("nuclear", "«nuclear» (solo vertidos de residuos nucleares en el Cantábrico)"),
  noPosition("gasto-defensa", "«militar», «defensa», «OTAN»"),
  verified(
    "impuesto-grandes-fortunas",
    -2,
    "media",
    "Eliminar la tributación por el Impuesto del Patrimonio, mediante la inclusión de una bonificación en cuota que alcance el 99% de la misma.",
    "39",
    "Se refiere al Impuesto sobre el Patrimonio cedido a Asturias. Una bonificación del 99 % equivale a suprimirlo: −2 por la regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06; antes −1).",
  ),
  noPosition("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  noPosition("inmigracion-competencias-cataluna", "«inmigración», «Cataluña», «competencias»"),
  noPosition("tauromaquia-patrimonio", "«tauromaquia», «toros», «corrida»"),
  noPosition(
    "oficina-anticorrupcion",
    "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «Fiscalía Anticorrupción», «conflicto de intereses», «malversación», «denunciantes». No aparece «corrupción» en todo el programa; «oficina» y «agencia» solo para atención al ciudadano, turismo y cooperación (pp. 9, 74, 84, 112), y «transparencia» solo de forma genérica",
  ),
  noPosition(
    "prostitucion-abolicion",
    "«prostitución», «proxenetismo», «trata», «explotación sexual». Solo propone vetar la publicidad institucional en medios «que realicen publicidad de la prostitución» (p. 81) y «un Plan contra la Explotación Sexual en el Principado de Asturias, encaminado a rescatar y ofrecer alternativas a las mujeres víctimas» (p. 82); nada sobre castigar al cliente o al proxeneta",
  ),
  noPosition("impuesto-banca", "«banca», «bancos», «entidades financieras», «gravamen», «beneficios extraordinarios»"),
  noPosition(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana». No menciona Marruecos, Ceuta ni Melilla; solo la cooperación con el pueblo saharaui y sus refugiados (p. 84), que no puntúa, y ventajas «aduaneras» de zonas francas en los puertos asturianos (p. 39)",
  ),
  noPosition(
    "iva-primera-vivienda",
    "«IVA», «superreducido», «primera vivienda», «Transmisiones», «Actos Jurídicos», «compra de una vivienda». No trata los impuestos de la compraventa; solo propone, para los concejos en riesgo de despoblación, una deducción autonómica en el IRPF del 5 % por adquisición, construcción o rehabilitación de vivienda habitual (p. 123), que es un impuesto sobre la renta y no se extrapola al IVA de la compra",
  ),
];
