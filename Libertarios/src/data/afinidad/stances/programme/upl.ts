import type { Stance } from "../../types";

/**
 * Unión del Pueblo Leonés — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa 2026 UPL autonómicas» (elecciones a las Cortes de Castilla
 * y León del 15-3-2026, 96 págs.), enlazado desde upl.es. Es el programa más
 * reciente; no se ha localizado un programa de UPL para las generales de 2023
 * (ni en upl.es ni por búsqueda web). Revisado con extracción de texto y
 * búsqueda por palabras clave: ninguno de los 15 asuntos aparece, así que todas
 * las celdas son `sin-posicion`.
 */

const SOURCE = {
  url: "https://www.upl.es/wp-content/uploads/2026/02/Programa-2026-UPL-autonomicas.pdf",
  title: "UPL — Programa elecciones autonómicas de Castilla y León 2026",
  year: 2026,
};

const CONTEXT =
  "Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de UPL para las generales de 2023.";

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "upl",
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
  noPosition("vivienda-tope-alquiler", "«alquiler», «tensionadas», «precio» (solo vivienda protegida y ayudas al alquiler)"),
  noPosition("irpf-inflacion", "«IRPF», «deflactar», «inflación» (solo rebajas del IRPF en el medio rural)"),
  noPosition("jornada-37-5", "«jornada», «37,5», «horas semanales»"),
  noPosition("amnistia", "«amnistía»"),
  noPosition("nuclear", "«nuclear»"),
  noPosition("gasto-defensa", "«militar», «defensa nacional», «OTAN», «armamento»"),
  noPosition("impuesto-grandes-fortunas", "«patrimonio» (solo patrimonio cultural), «grandes fortunas»"),
  noPosition("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  noPosition("inmigracion-competencias-cataluna", "«inmigración», «Cataluña»"),
  noPosition("tauromaquia-patrimonio", "«tauromaquia», «toros», «corrida» (solo aparece la localidad de Toro)"),
  noPosition("prisiones-agentes-autoridad", "«prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad»"),
  noPosition("prostitucion-abolicion", "«prostitución», «proxenetismo», «trata», «explotación sexual»"),
  noPosition("impuesto-banca", "«banca», «bancos», «entidades financieras», «gravamen» (solo «un mayor acceso a la banca en nuestras comarcas rurales», p. 93)"),
  noPosition("registro-lobbies", "«lobby», «grupos de interés», «grupos de presión», «registro de transparencia»"),
  {
    partyId: "upl",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "baja",
      quote:
        "Del mismo modo, propondremos la aplicación de rebajas fiscales en el Impuesto de Transmisiones Patrimoniales (ITP) para la compra de vivienda en el medio rural o para familias numerosas.",
      source: { ...SOURCE, page: "80" },
      note: `${CONTEXT} Rebaja el ITP (no el IVA) de la compra solo en el medio rural o para familias numerosas: parcial, +1, confianza baja. Buscado también «IVA», «primera vivienda», «Actos Jurídicos»: sin resultados sobre la vivienda.`,
    },
    record: null,
  },
];
