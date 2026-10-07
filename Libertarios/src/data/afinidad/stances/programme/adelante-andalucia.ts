import type { Stance } from "../../types";

/**
 * Adelante Andalucía — celdas de PROGRAMA (WP3).
 *
 * Fuente: programa electoral de Adelante Andalucía para las elecciones al
 * Parlamento de Andalucía del 17-5-2026 (PDF oficial enlazado desde
 * https://adelanteandalucia.org/programa/, 307 páginas). Es su programa más
 * reciente. En las generales de 2023 solo concurrió por la provincia de Cádiz;
 * no se ha usado aquel programa porque este es posterior.
 *
 * ⚠️ PENDIENTE (integración del 2026-10-06): Adelante Andalucía SÍ tiene
 * programa propio de las generales de 2023 y se puede descargar:
 * https://adelanteandalucia.org/wp-content/uploads/2023/07/programa-23J-3ed-comprimido.pdf
 * (85 páginas, enlazado desde https://adelanteandalucia.org/programa-elecciones-23j/;
 * hay además un «Decálogo»: …/2023/07/Decalogo-Adelante-Andalucia-Generales.pdf).
 * Trata al menos patrimonio y grandes fortunas, alquiler, nuclear y
 * prostitución. Según `docs/AFINIDAD-DATOS.md` §2, un partido con programa
 * propio de generales usa ese, así que este fichero debe recodificarse con el
 * de 2023 (y archivarlo en Wayback). No se ha hecho aún: las celdas de abajo
 * siguen saliendo del programa andaluz de 2026.
 *
 * Las páginas son las del PDF (coinciden con la numeración impresa).
 * Algunas páginas del PDF tienen mal codificados los acentos al extraer el
 * texto («úna», «a mbito»); en esas citas se ha normalizado solo la
 * acentuación, sin cambiar palabras (se indica en `note`).
 */

const SOURCE = {
  url: "https://adelanteandalucia.org/wp-content/uploads/2026/04/PROGRAMA-AA-2026-DEF.pdf",
  title: "Programa elecciones andaluzas 2026 — Adelante Andalucía",
  year: 2026,
} as const;

const NOTE_ELECCION =
  "Programa de las elecciones andaluzas de 2026; en las generales de 2023 Adelante Andalucía solo concurrió por Cádiz.";

const none = (questionId: string, note: string): Stance => ({
  partyId: "adelante-andalucia",
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
    partyId: "adelante-andalucia",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Bajada de los precios del alquiler y regulación obligatoria en zonas tensionadas mediante un índice público de carácter territorial, garantizando que los hogares no destinen más del 20% de su renta a la vivienda.",
      source: { ...SOURCE, page: "74" },
      note: `Propuesta 337 (ley de medidas urgentes de vivienda). ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "irpf-inflacion",
    "Sin mención a deflactar o indexar los tramos del IRPF a la inflación. Buscado: «IRPF», «deflact», «inflación», «tramos», «tarifa»; leídas las secciones 2.1.3–2.1.5 (pp. 144-149), que piden más progresividad (Propuestas 779, 787, 797) pero no tratan la actualización con la inflación.",
  ),
  {
    partyId: "adelante-andalucia",
    questionId: "jornada-37-5",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote:
        "Reducción progresiva de la jornada laboral a 32 horas semanales sin reducción salarial en todos los ámbitos laborales en el margen de 2 años para las grandes empresas y de 4 años para las pequeñas y medianas empresas.",
      source: { ...SOURCE, page: "190" },
      note: `Propuesta 1036 («Instar al Gobierno estatal a la regulación…»). Propone una reducción mayor (32 h) que la del enunciado (37,5 h), sin reducción salarial; confianza media por la diferencia de cifra. Acentos normalizados (la extracción del PDF da «Redúccio n»). ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "amnistia",
    "No trata la Ley de amnistía de 2024. Buscado: «amnistía» (única mención, p. 263: derogación de la Ley de Amnistía de 1977 para juzgar crímenes del franquismo, asunto distinto), «procés», «Cataluña».",
  ),
  {
    partyId: "adelante-andalucia",
    questionId: "nuclear",
    programme: {
      position: -1,
      status: "verificado",
      reviewer: { position: -1, agrees: true },
      confidence: "media",
      quote:
        "Eliminación de todas las subvenciones directas e indirectas, o incentivos a los combustibles fósiles y la energía nuclear , y establecer el coste real de todo el parque de generación energética incluyendo costes de residuos nucleares, de hidrocarburos, etc.",
      source: { ...SOURCE, page: "205" },
      note: `Propuesta 1130. No habla del calendario de cierre; dirección contraria a la nuclear (también Propuesta 1145, p. 208: sacar la nuclear de la taxonomía verde). Por eso −1. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  {
    partyId: "adelante-andalucia",
    questionId: "gasto-defensa",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Rechazar el plan de rearme europeo y el aumento del gasto militar en España por ser un paso más de la escalada militarista que profundiza en la política represiva y colonizadora de Europa",
      source: { ...SOURCE, page: "281" },
      note: `Propuesta 1485. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  {
    partyId: "adelante-andalucia",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Reformar el impuesto en los grandes patrimonios , reconvirtiéndolo como un impuesto sobre la riqueza, las grandes fortunas, la gran propiedad inmobiliaria y la posesión latifundista de la tierra.",
      source: { ...SOURCE, page: "146" },
      note: `Propuesta 782, dentro de «2.1.4 Política tributaria a nivel estatal» (p. 145). No fija el umbral de 10 millones del enunciado; confianza media. En el tramo autonómico propone además un impuesto a la riqueza con mínimo exento de 500.000 € (p. 149). ${NOTE_ELECCION} Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): crear o mantener un impuesto a las grandes fortunas sin decir que sea estatal o sin umbral es +1 (antes +2).`,
    },
    record: null,
  },
  none(
    "okupacion-desalojo",
    "No trata la ocupación ilegal ni el desalojo exprés. Buscado: «okupa», «ocupación», «usurpación», «desalojo», «desahucio» (solo aparece en el sentido de desahucios de inquilinos/hipotecados, pp. 72, 82, 222).",
  ),
  none(
    "inmigracion-competencias-cataluna",
    "No trata la delegación de competencias de inmigración a Cataluña. Buscado: «inmigración», «competencias», «Cataluña», «Generalitat»; leído el apartado 10.1.2 «Migraciones» (pp. 275-276).",
  ),
  {
    partyId: "adelante-andalucia",
    questionId: "tauromaquia-patrimonio",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Adelante Andalucía está en contra de todo tipo de maltrato animal, y la tauromaquia no es una excepción. No podemos entender esta práctica como un acto cultural o entretenimiento. La postura de Adelante Andalucía es clara: transición hacia la tauromaquia cero.",
      source: { ...SOURCE, page: "253" },
      note: `Apartado 7.6 «Tauromaquia»; siguen las Propuestas 1351-1355 (suprimir subvenciones, prohibir emisión en Canal Sur…). ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "prisiones-agentes-autoridad",
    "No trata la condición de agentes de la autoridad de los funcionarios de prisiones. Buscado: «prisiones», «penitenciari», «funcionarios de prisiones», «agentes de la autoridad»; leído el apartado 10.2 «Derechos civiles y prisiones» (pp. 279-280: malos tratos, salud mental en prisión, asumir la competencia de ejecución penitenciaria, transporte a las prisiones).",
  ),
  {
    partyId: "adelante-andalucia",
    questionId: "prostitucion-abolicion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Este Plan tendrá medidas encaminadas a erradicar el proxenetismo y la demanda creciente por parte de prostituidores, y será elaborado con la participación de las mujeres afectadas y de las organizaciones feministas.",
      source: { ...SOURCE, page: "231" },
      note: `Propuesta 1195 (Plan integral andaluz contra la trata y explotación), que incluye «protección integral y reparación para las mujeres en situación de prostitución» y «un plan de educación transversal para frenar la demanda de prostitución». Enfoque abolicionista (contra proxenetismo y demanda, protección de la mujer), pero con un plan autonómico y no con reforma del Código Penal: +1. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  {
    partyId: "adelante-andalucia",
    questionId: "impuesto-banca",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Impulsar una reforma general del sistema tributario a nivel estatal para que se garantice su progresividad, se aumente la presión fiscal sobre las rentas más altas, los grandes patrimonios y los márgenes de beneficios de las grandes empresas y bancos",
      source: { ...SOURCE, page: "145" },
      note: `Propuesta 777, dentro de «2.1.4 Política tributaria a nivel estatal». Pide más presión fiscal sobre los márgenes de los bancos, sin concretar el gravamen temporal ni el 75 % sobre beneficios extraordinarios del enunciado: +1. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  {
    partyId: "adelante-andalucia",
    questionId: "registro-lobbies",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Aprobación de una norma que regule la actividad de los grupos de interés que aporte transparencia al proceso de toma de decisiones que se dan en el ámbito público, fortalezca la prevención de conflictos de intereses, contribuya a la lucha contra la corrupción y refuerce los estándares de integridad pública.",
      source: { ...SOURCE, page: "215" },
      note: `Propuesta 1199 del apartado de transparencia (el número se repite en la p. 232 para otra medida). En la misma página pide publicar «La huella normativa» y «el informe de participación de los grupos de interés». Regulación autonómica de los lobbies, sin mencionar un registro obligatorio ni multas: +1. ${NOTE_ELECCION}`,
    },
    record: null,
  },
  none(
    "iva-primera-vivienda",
    "No trata los impuestos de la compra de vivienda. Buscado: «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». El IVA solo aparece para el reparto autonómico de impuestos (Propuestas 760 y 767) y para tipos reducidos de productos de primera necesidad, cultura e instrumentos musicales (Propuestas 780 y 1397, pp. 305-306); en vivienda, solo la exención del IBI de las viviendas públicas en alquiler (Propuesta 346).",
  ),
];
