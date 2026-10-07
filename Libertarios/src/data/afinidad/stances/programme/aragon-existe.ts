import type { Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Aragón Existe – Teruel Existe (WP3).
 *
 * Fuente principal: programa oficial de Teruel Existe para las elecciones
 * generales del 23-J-2023 (29 páginas, PDF en teruelexiste.info). Es un
 * programa centrado en despoblación, servicios públicos e infraestructuras de
 * Teruel: no trata casi ninguno de los 15 asuntos del cuestionario.
 *
 * Se ha leído también el programa de las autonómicas de Aragón del 8-F-2026
 * (más reciente); solo aporta la celda de vivienda, que lleva su propia fuente.
 *
 * Páginas: número de página del PDF.
 */

const SOURCE = {
  url: "https://teruelexiste.info/wp-content/uploads/2023/07/Programa_23J-2023-_Teruel_Existe_-elecciones-generales.pdf",
  title: "Teruel Existe — Programa elecciones generales 23J 2023",
  year: 2023,
};

const SOURCE_2026 = {
  url: "https://teruelexiste.info/wp-content/uploads/2026/01/Programa-elecciones-autonomicas-8F-2026.-Teruel-Existe.pdf",
  title: "Teruel Existe — Programa elecciones autonómicas de Aragón 8F 2026",
  year: 2026,
};

const BOTH = "Leídos completos el programa de generales 2023 (29 págs.) y el de autonómicas de Aragón 2026 (30 págs.).";

function sinPosicion(questionId: string, searched: string): Stance {
  return {
    partyId: "aragon-existe",
    questionId,
    programme: {
      position: 0,
      status: "sin-posicion",
      confidence: "media",
      quote: "",
      source: { ...SOURCE },
      note: `No trata el asunto. ${BOTH} Buscado: ${searched}.`,
    },
    record: null,
  };
}

export const stances: Stance[] = [
  {
    partyId: "aragon-existe",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote:
        "Aplicaremos los topes al alquiler en los municipios turísticos de Aragón para garantizar el acceso a la vivienda.",
      source: { ...SOURCE_2026, page: "28" },
      note:
        "Programa de autonómicas de Aragón 2026, por la excepción de AFINIDAD-DATOS.md §2 (si el programa propio calla sobre un asunto y otro programa oficial reciente del mismo partido sí lo trata, se usa ese, diciéndolo): el programa de generales 2023 no habla de limitar rentas (solo vivienda pública y rehabilitación rural). +1 y no +2: los topes se limitan a municipios turísticos, no a «zonas tensionadas» en general. En la pág. 29 añade «Establecimiento de precios máximos de alquiler tasados por zonas» dentro del Banco Público de Vivienda Rural.",
    },
    record: null,
  },
  sinPosicion("irpf-inflacion", "IRPF, deflactar, inflación, tramos, impuesto, fiscalidad (solo «Tributación justa, general, equitativa y progresiva», pág. 5 de 2023, y fiscalidad rural)"),
  sinPosicion("jornada-37-5", "jornada, 37,5, horas semanales, tiempo de trabajo (solo «jornada continuada por cuidado de hijas/hijos», pág. 18 de 2023)"),
  sinPosicion("amnistia", "amnistía, procés, Cataluña"),
  sinPosicion("nuclear", "nuclear, centrales, cierre (solo renovables y autoconsumo)"),
  sinPosicion("gasto-defensa", "defensa, militar, OTAN, ejército"),
  sinPosicion("impuesto-grandes-fortunas", "grandes fortunas, patrimonio, riqueza (solo «Tributación justa, general, equitativa y progresiva», sin impuesto concreto)"),
  sinPosicion("okupacion-desalojo", "okupación, ocupación ilegal, desalojo, desahucio"),
  sinPosicion("inmigracion-competencias-cataluna", "competencias de inmigración, Generalitat, Cataluña, delegación"),
  sinPosicion("tauromaquia-patrimonio", "tauromaquia, toros, festejos taurinos, bous"),
  sinPosicion(
    "oficina-anticorrupcion",
    "corrupción, anticorrupción, antifraude, integridad, oficina, agencia, autoridad independiente, Fiscalía Anticorrupción, conflicto de intereses, malversación, denunciantes (pág. 6 de 2023 solo pide «garantizar la transparencia, la rendición de cuentas y unas políticas antifraude efectivas que acaben con la corrupción», sin organismo de prevención o investigación; la «Oficina de Defensa del Territorio», pág. 17 de 2026, es un servicio de apoyo a ayuntamientos rurales, otro asunto)",
  ),
  sinPosicion("prostitucion-abolicion", "prostitución, proxenetismo, trata, explotación sexual"),
  sinPosicion("impuesto-banca", "banca, bancos, entidades financieras, gravamen, beneficios extraordinarios"),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "Marruecos, Ceuta, Melilla, Sáhara, frontera, embajada, soberanía, integridad territorial, aduana (Marruecos solo aparece en el de autonómicas 2026, pág. 19, para rechazar «la competencia desleal de los acuerdos de libre comercio con terceros países (Mercosur y Marruecos)» y pedir cláusulas espejo a los productos agroalimentarios; nada sobre Ceuta, Melilla o la frontera)",
  ),
  {
    partyId: "aragon-existe",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "baja",
      quote:
        "en localidades de menos de 5.000 habitantes ubicadas en áreas o comarcas afectadas por la despoblación, los residentes y propietarios de rentas bajas y medias podrán quedar exentos del Impuesto de Bienes Inmuebles y ver reducido el impuesto de transmisiones patrimoniales para la compraventa de vivienda en un 80%.",
      source: { ...SOURCE, page: "12" },
      note: "Programa de generales 2023, apartado 7 («Fiscalidad diferenciada positiva»). Rebaja el ITP (no el IVA) de la compraventa de vivienda solo en municipios despoblados y para rentas bajas y medias: parcial, +1, confianza baja. El programa de autonómicas de 2026 (p. 12) dice lo mismo más corto: «Reduciremos el impuesto de transmisiones patrimoniales para viviendas en pequeños municipios». Ninguno de los dos menciona el IVA de la vivienda.",
    },
    record: null,
  },
];
