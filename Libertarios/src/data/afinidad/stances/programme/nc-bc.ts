import type { Stance } from "../../types";

/**
 * Nueva Canarias – Bloque Canarista — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Un Plan de País para vivir y crecer mejor», programa de NC-BC para
 * las elecciones autonómicas de Canarias del 28-5-2023 (PDF oficial en
 * nuevacanarias.org, 96 páginas).
 *
 * NC-BC sí concurrió a las generales de 2023 con un documento de «100
 * medidas» («Elegimos Canarias») que se presentó en campaña, pero no se ha
 * localizado publicado (ni en nuevacanarias.org, ni en su API de medios, ni en
 * Wayback). Por eso se usa el programa autonómico del mismo año. En las
 * europeas de 2024 fue en coalición con Sumar (programa de la coalición, no
 * propio). Cuando aparezca el de 2023 o el de 2026, rehacer por diff.
 *
 * `page` es la página del PDF (la numeración impresa va desfasada en una).
 */

const SOURCE = {
  url: "https://nuevacanarias.org/wp-content/uploads/2023/04/Programa_Electoral_2023.pdf",
  title: "Programa elecciones autonómicas de Canarias 2023 — Nueva Canarias-Bloque Canarista",
  year: 2023,
} as const;

const NOTE_ELECCION =
  "Programa de las autonómicas de Canarias de 2023; no se localizó publicado el programa propio de las generales de 2023.";

const none = (questionId: string, note: string): Stance => ({
  partyId: "nc-bc",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: { ...SOURCE },
    note: `${note} ${NOTE_ELECCION}`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "nc-bc",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Establecer límites a los precios de los alquileres, especialmente en zonas tensionadas con precios desorbitados que impiden el acceso a la vivienda.",
      source: { ...SOURCE, page: "40" },
      note: `Apartado 3.2.3 «Vivienda». ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "irpf-inflacion",
    "No trata la deflactación de la tarifa del IRPF. Buscado: «IRPF», «deflact», «inflación», «tramos»; el apartado fiscal (p. 51) habla de usar los tramos autonómicos del IRPF con carácter progresivo, no de actualizarlos con la inflación.",
  ),
  {
    partyId: "nc-bc",
    questionId: "jornada-37-5",
    programme: {
      position: 0,
      status: "verificado",
      reviewer: { position: 0, agrees: true },
      confidence: "media",
      quote:
        "Hay que abordar con rigor los debates sobre la reducción de la actual jornada laboral a otra de menos horas y/o menos días, que tiene efectos en el reparto del trabajo existente y en el bienestar de trabajadores y trabajadoras",
      source: { ...SOURCE, page: "71" },
      note: `Apartado 4.6 «Empleo». Propone debatir la reducción de jornada sin comprometerse con ella ni con una cifra: se codifica como 0 (ambivalencia expresa, tipo «estudiaremos»). ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none("amnistia", "No trata la amnistía. Buscado: «amnistía», «procés», «Cataluña»."),
  none("nuclear", "No menciona la energía nuclear. Buscado: «nuclear»; el capítulo de energía (5.2) trata solo de renovables en Canarias."),
  none(
    "gasto-defensa",
    "No trata el gasto militar. Buscado: «gasto militar», «defensa» (solo en otros sentidos), «militar» (solo invasión de Ucrania, p. 89), «OTAN», «armamento».",
  ),
  none(
    "impuesto-grandes-fortunas",
    "No trata un impuesto a las grandes fortunas. Buscado: «grandes fortunas», «patrimonio» (solo patrimonio natural/cultural), «riqueza»; el apartado fiscal (p. 51) pide progresividad sin medida concreta sobre el patrimonio.",
  ),
  none(
    "okupacion-desalojo",
    "No trata la ocupación ilegal ni el desalojo. Buscado: «okupa», «ocupación» (solo ocupación turística/territorial), «desalojo», «usurpación».",
  ),
  none(
    "inmigracion-competencias-cataluna",
    "No trata la delegación de competencias de inmigración a Cataluña. Buscado: «inmigración», «competencias», «Cataluña»; las referencias a migración (pp. 88-89) piden cogestión para Canarias, asunto distinto.",
  ),
  {
    partyId: "nc-bc",
    questionId: "tauromaquia-patrimonio",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -1, agrees: true },
      confidence: "media",
      quote: "El rechazo a la Tauromaquia, por considerarla una práctica cruenta.",
      source: { ...SOURCE, page: "46" },
      note: `Apartado 3.2.8 «Protección y Bienestar Animal». Rechaza la tauromaquia, pero no habla de su protección legal como patrimonio; confianza media. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "prisiones-agentes-autoridad",
    "No trata la condición de agentes de la autoridad de los funcionarios de prisiones. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad», «cárcel».",
  ),
  none("prostitucion-abolicion", "No trata la prostitución. Buscado: «prostitución», «proxenetismo», «trata», «explotación sexual»."),
  {
    partyId: "nc-bc",
    questionId: "impuesto-banca",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "compartimos con la Unión Europea la aplicación de tributos especiales para las grandes empresas energéticas y entidades bancarias, así como para las rentas más altas.",
      source: { ...SOURCE, page: "49" },
      note: `Introducción del apartado fiscal; sigue: «las fuerzas conservadoras […] miran para otro lado cuando se trata de hacer pagar a eléctricas o bancos, que están multiplicando sus beneficios indecentemente». Apoya los gravámenes especiales a la banca, pero no pide subirlos ni el 75 % sobre beneficios extraordinarios del enunciado: +1. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "registro-lobbies",
    "No trata la regulación de los lobbies. Buscado: «lobby», «grupos de interés», «grupos de presión», «registro de transparencia», «huella normativa», «puertas giratorias».",
  ),
  none(
    "iva-primera-vivienda",
    "No trata los impuestos de la compra de vivienda. Buscado: «IVA», «IGIC», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». Solo «Bonificaciones específicas en el acceso a la vivienda para favorecer la emancipación juvenil» (p. 43), sin decir si son fiscales ni referidas a la compra, y un balance de las deducciones del IRPF canario ya aprobadas (p. 50).",
  ),
];
