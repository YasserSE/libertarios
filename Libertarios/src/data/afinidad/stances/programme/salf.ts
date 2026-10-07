import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Se Acabó La Fiesta (SALF). WP3.
 *
 * SALF no concurrió a las generales de 2023 (no existía) y no se ha localizado
 * un programa escrito para las europeas de 2024 (ni en la web del partido ni
 * en su copia de Wayback: solo páginas de apoderados y representantes). Se usa
 * el programa oficial más reciente: el «Contrato Electoral SALF Andalucía
 * 2026» (autonómicas del 17-5-2026), texto íntegro publicado como página web
 * en seacabolafiesta.com. Para las preguntas que ese texto no trata se ha
 * leído además el «Programa Electoral SALF Castilla y León 2026» (autonómicas
 * del 15-3-2026, PDF de 23 páginas); solo la celda «nuclear» sale de él.
 *
 * La web oficial devuelve 403 a descargas automáticas (Cloudflare); las citas
 * se han cotejado contra las copias de Wayback enlazadas en `archiveUrl`.
 */

const ANDALUCIA: Source = {
  url: "https://www.seacabolafiesta.com/programa-andalucia",
  title: "Contrato Electoral SALF Andalucía 2026 (programa de las elecciones al Parlamento de Andalucía)",
  date: "2026-05-17",
  year: 2026,
  archiveUrl: "https://web.archive.org/web/20260419033631/https://www.seacabolafiesta.com/programa-andalucia",
};

const CYL: Source = {
  url: "https://www.seacabolafiesta.com/images/Contrato_Electoral_SALF_CyL_2026.pdf",
  title: "Programa Electoral SALF Castilla y León 2026 (Contrato Electoral, elecciones a las Cortes de Castilla y León)",
  date: "2026-03-15",
  year: 2026,
  archiveUrl:
    "https://web.archive.org/web/20260228195438/https://www.seacabolafiesta.com/images/Contrato_Electoral_SALF_CyL_2026.pdf",
};

const ELECCION =
  "Programa de las autonómicas de Andalucía 2026; no concurrió a las generales de 2023 y no se ha localizado programa escrito de las europeas de 2024.";

/** El programa andaluz es una página web única, sin paginación. */
const WEB = "página web única (sin paginación)";

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "salf",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: ANDALUCIA,
    note: `${ELECCION} No trata el asunto. Leído íntegro el programa de Andalucía 2026 y el de Castilla y León 2026; buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "salf",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Frente a los topes que reducen la oferta, apostamos por incentivos para que esas viviendas salgan al mercado y bajen los precios.",
      source: { ...ANDALUCIA, page: `${WEB}; Eje 01 Vivienda, «Incentivos al alquiler asequible»` },
      note: `${ELECCION} Rechaza los topes de alquiler y propone incentivos en su lugar. El programa de Castilla y León 2026 (p. 3) dice lo mismo: «Frente a fracasos como los topes de alquiler (que reducen la oferta), apostamos por incentivos positivos».`,
    },
    record: null,
  },
  sinPosicion("irpf-inflacion", "IRPF, inflación, deflactar, tramos (solo propone tarifa autonómica del 0 % por debajo de 35.000 € y deducciones por hijo, que no es actualizar la tarifa con el IPC)"),
  sinPosicion("jornada-37-5", "jornada, 37,5, horas semanales (el de Castilla y León solo incentiva «jornadas compatibles» con la conciliación)"),
  sinPosicion("amnistia", "amnistía, procés, Cataluña"),
  {
    partyId: "salf",
    questionId: "nuclear",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Defensa de la energía nuclear y oposición al cierre de centrales: Desde Castilla y León exigiremos al Gobierno de España que paralice el calendario de cierres nucleares.",
      source: { ...CYL, page: "21" },
      note: "Programa de las autonómicas de Castilla y León 2026 (el de Andalucía 2026 no trata la energía nuclear); no concurrió a las generales de 2023. Página del PDF.",
    },
    record: null,
  },
  sinPosicion("gasto-defensa", "defensa, gasto militar, OTAN, Fuerzas Armadas"),
  {
    partyId: "salf",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "media",
      quote:
        "Deducción del \"Impuesto de Solidaridad Grandes Fortunas\" en sede de IRPF Quienes tributen por el impuesto estatal podrán deducirse la cantidad satisfecha en la cuota autonómica del IRPF andaluz.",
      source: { ...ANDALUCIA, page: `${WEB}; Eje 02 Bajada masiva de impuestos` },
      note: `${ELECCION} Título y texto de la misma medida. No propone suprimir el impuesto estatal, sino compensarlo íntegramente en el tramo autonómico, lo que lo neutraliza: −2 por la regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06; antes −1). En la misma sección: «Mantenemos la bonificación 100 % del Impuesto de Patrimonio».`,
    },
    record: null,
  },
  {
    partyId: "salf",
    questionId: "okupacion-desalojo",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote: "Ley autonómica anti-okupación: desalojo policial en 24 h Endurecimiento legal y desalojo policial en el máximo de 24 horas.",
      source: { ...ANDALUCIA, page: `${WEB}; Eje 01 Vivienda` },
      note: `${ELECCION} Título y texto de la misma medida. Propone desalojo policial (no judicial) en 24 horas: va más allá del enunciado en el mismo sentido; confianza media porque el mecanismo no es el del enunciado.`,
    },
    record: null,
  },
  sinPosicion("inmigracion-competencias-cataluna", "competencias de inmigración, Cataluña, Generalitat, delegación"),
  sinPosicion("tauromaquia-patrimonio", "toros, tauromaquia, patrimonio cultural"),
  sinPosicion("prisiones-agentes-autoridad", "prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad, cárcel"),
  sinPosicion("prostitucion-abolicion", "prostitución, proxenetismo, trata, explotación sexual"),
  sinPosicion("impuesto-banca", "banca, bancos, entidades financieras, gravamen temporal, beneficios extraordinarios"),
  sinPosicion(
    "registro-lobbies",
    "lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa (el programa de Andalucía dice que suprimir la publicidad institucional «libera al poder político de los grupos de presión económicos» y el de Castilla y León, p. 12, propone el «Fin de las subvenciones a partidos, sindicatos y lobbies»; ninguno habla de un registro de grupos de interés)",
  ),
  {
    partyId: "salf",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Eliminaremos todos los impuestos autonómicos (ITP, AJD…) en la compra de la primera vivienda habitual. Andalucía, paraíso fiscal de quien compra su primer hogar.",
      source: { ...ANDALUCIA, page: `${WEB}; Eje 01 Vivienda, «Cero impuestos autonómicos para la primera vivienda»` },
      note: `${ELECCION} Suprime los impuestos autonómicos de la compra de la primera vivienda (ITP y AJD), no el IVA, que es estatal: misma dirección en impuestos relacionados, +1. El programa de Castilla y León 2026 (p. 3) dice lo mismo: «Eliminaremos todos los impuestos autonómicos en la compra de la primera vivienda habitual (Impuesto de Transmisiones, Actos Jurídicos Documentados, etc.)». Ninguno de los dos menciona el IVA de la vivienda.`,
    },
    record: null,
  },
];
