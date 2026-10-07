import type { ProgrammeStance, Source, Stance } from "../../types";

/**
 * Vox — programa electoral de las generales del 23-J-2023 (WP3).
 *
 * Fuente: «Programa electoral para las Elecciones Generales 23 de julio de
 * 2023» (PDF de 178 páginas en voxespana.es, versión «con menos peso»,
 * accesible el 2026-10-06).
 *
 * `page` es la página del PDF, que coincide con la impresa. Las citas
 * deshacen los guiones de partición de fin de línea del maquetado
 * («conse- guir» → «conseguir»); no se ha cambiado nada más.
 *
 * Programa 2023 — se actualizará con el de 2026 (ver `docs/AFINIDAD-PLAN.md`).
 * Codificado según `docs/AFINIDAD-DATOS.md` §2. Revisión ciega hecha el 2026-10-06 (`reviewer` en cada celda que puntúa; ver `docs/AFINIDAD-REVISION.md`).
 */

const PROGRAMA: Source = {
  url: "https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf",
  archiveUrl:
    "https://web.archive.org/web/20231116091643/https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf",
  title: "Vox — Programa electoral para las Elecciones Generales 23 de julio de 2023",
  year: 2023,
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (note: string): ProgrammeStance => ({
  position: 0,
  status: "sin-posicion",
  confidence: "baja",
  quote: "",
  source: PROGRAMA,
  note,
});

const programme: Record<string, ProgrammeStance> = {
  "vivienda-tope-alquiler": {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "Derogaremos la Ley por el derecho a la vivienda aprobada por el gobierno de Sánchez, la cual no contribuirá a conseguir vivienda más asequible, hundirá el mercado del alquiler, altera el contenido esencial del derecho de propiedad consagrado en el artículo 33 de la Constitución y ampara la ocupación ilegal.",
    source: at("43"),
    note:
      "Medida 77. Derogar la Ley 12/2023 elimina la limitación de rentas en zonas tensionadas; la cita no nombra el control de precios: confianza media. En la lista de iniciativas pasadas (p. 44) figura una PNL de abril de 2021 que pedía «rechazar el control de precios del alquiler».",
  },
  "irpf-inflacion": sinPosicion(
    "Buscado «deflact», «inflación» junto a «IRPF», «tarifa», «indexa»; leída la sección fiscal (pp. 73-77). Propone sustituir la tarifa por un tipo único del 15 %/25 % (medida 148) y, en la 148.4, «tablas de actualización automática» para el ahorro (ganancias por inflación), no para los tramos de la tarifa general. Sin posición sobre deflactar los tramos.",
  ),
  "jornada-37-5": sinPosicion(
    "Buscado «37,5», «jornada», «horas semanales», «cuatro días»: solo una PNL pasada sobre cuidadores que reducen jornada (p. 166). Nada sobre la jornada máxima legal.",
  ),
  amnistia: sinPosicion(
    "El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación»: propone reintroducir sedición y malversación (pp. 16, 126) y prohibir indultos por delitos contra la integridad territorial (p. 127), pero no se pronuncia sobre una amnistía.",
  ),
  nuclear: {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Fomentaremos la inversión y actualización del parque de generación nuclear y promoveremos la extensión de la vida útil de las centrales nucleares existentes.",
    source: at("117"),
    note: "Medida 246.",
  },
  "gasto-defensa": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Aumentaremos la inversión en Defensa y aseguraremos sueldos dignos y ayudas a la movilidad geográfica y a la vivienda y alojamiento, que serán deducibles.",
    source: at("93"),
    note: "Medida 195. Propone aumentar, lo que incluye mantener el aumento ya aprobado.",
  },
  "impuesto-grandes-fortunas": {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "Suprimiremos el Impuesto sobre el Patrimonio, el Impuesto sobre Sucesiones y Donaciones y Plusvalías municipales en todo el territorio nacional, impuestos que suponen confiscaciones injustas, duplicadas o desproporcionadas del patrimonio de los españoles.",
    source: at("77"),
    note:
      "Medida 151. Suprime la imposición estatal sobre el patrimonio; no nombra el Impuesto Temporal de Solidaridad de las Grandes Fortunas: confianza media.",
  },
  "okupacion-desalojo": {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Tolerancia cero con la ocupación ilegal. Reformaremos tanto del Código Penal como de las Leyes de Enjuiciamiento Criminal y Civil para proteger real y efectivamente a los propietarios que sufren la acción de las mafias de ocupación o la entrada ilegal de un okupa en su vivienda.",
    source: at("40"),
    note:
      "Medida 64 (el «tanto del» es literal). Dirección clara a favor de acelerar la recuperación de la vivienda, pero sin plazo de 24 horas ni requisito de título: +1. Buscado «24 horas», «48 horas», «desalojo».",
  },
  "inmigracion-competencias-cataluna": sinPosicion(
    "El programa es anterior a la proposición PSOE-Junts de delegación. En p. 8 propone «la devolución inmediata al Estado de las competencias en Educación, Sanidad, Seguridad y Justicia», y en p. 91 un «Mando Integrado de Gestión de las Fronteras», pero no menciona competencias de inmigración ni su delegación a Cataluña. Se deja sin posición en lugar de extrapolar. Buscado «competencias», «Mossos», «delegación», «fronteras».",
  ),
  "tauromaquia-patrimonio": {
    position: 2,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "alta",
    quote:
      "Protección de las tradiciones populares, eventos religiosos y festejos taurinos propios de la España rural frente a los ataques del progresismo y el globalismo.",
    source: at("151"),
    note:
      "Medida 325. En la misma página, medida 327: «Apoyaremos con medidas fiscales y crediticias la tauromaquia y los espectáculos taurinos.»",
  },
  "prisiones-agentes-autoridad": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Los funcionarios de Prisiones serán agentes de autoridad y junto a los miembros de las FFAA y FCSE recibirán la adecuada instrucción y adiestramiento",
    source: at("90"),
    note:
      "Medida 184 (la frase sigue con medios y amparo legal). En la p. 129, medida 282: «Impulsaremos un nuevo plan penitenciario y un aumento del personal de equipamiento de los funcionarios de prisiones.»",
  },
  "prostitucion-abolicion": sinPosicion(
    "Buscado «prostitu», «proxenet», «abolic», «tercería», «trata», «explotación sexual», «cliente» en todo el PDF: solo una iniciativa sobre abusos y explotación sexual en centros de menores (p. 70). Nada sobre la prostitución ni el proxenetismo.",
  ),
  "iva-primera-vivienda": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Modificaremos la Ley del Impuesto sobre el Valor Añadido con el fin de eliminar el IVA en la adquisición de la primera vivienda habitual.",
    source: at("40"),
    note:
      "Medida 66; se repite en la 149 (p. 76: «eliminaremos el IVA para la adquisición de primera vivienda habitual»). Va más allá del 4 % (IVA cero), en el mismo sentido que el enunciado: +2. En la p. 44 el programa recuerda su proposición de ley de octubre de 2022 para «aplicar un tipo superreducido del 4% a la adquisición de aquel inmueble destinado a ser la primera vivienda habitual».",
  },
  "impuesto-banca": sinPosicion(
    "Buscado «banca», «bancos», «bancari», «entidades financieras», «gravamen», «impuesto extraordinario», «beneficios extraordinarios», «caídos del cielo» y leído el apartado fiscal (medidas 144-156, pp. 74-79): solo baja del Impuesto de Sociedades al 15 % (medida 150, p. 77). Nada sobre el gravamen a la banca.",
  ),
  "registro-lobbies": sinPosicion(
    "Buscado «lobby», «lobbies», «grupos de interés», «grupos de presión», «registro», «huella normativa», «puertas giratorias». «Lobbies» aparece solo como crítica a lobbies verdes, ecologistas o ideológicos (pp. 52, 108-110, 133) y las puertas giratorias en los consejos de las eléctricas (p. 119); nada sobre un registro de grupos de interés.",
  ),
};

export const stances: Stance[] = Object.entries(programme).map(([questionId, p]) => ({
  partyId: "vox",
  questionId,
  programme: p,
  record: null,
}));
