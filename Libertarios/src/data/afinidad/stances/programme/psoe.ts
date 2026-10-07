import type { ProgrammeStance, Source, Stance } from "../../types";

/**
 * PSOE — programa electoral de las generales del 23-J-2023 (WP3).
 *
 * Fuente: «Programa electoral. Elecciones generales 23 julio 2023» (PDF de
 * 272 páginas, fechado «Madrid 7 de julio 2023»). La URL original de psoe.es
 * ya no sirve el PDF (devuelve HTML); la copia de Wayback Machine del
 * 2023-07-09 es la que se ha leído.
 *
 * `page` es la página del PDF. La numeración impresa va entre 2 y 8 páginas
 * por detrás (p. ej. PDF 221 = impresa «/215»); cada nota da la impresa.
 *
 * Programa 2023 — se actualizará con el de 2026 (ver `docs/AFINIDAD-PLAN.md`).
 * Codificado según `docs/AFINIDAD-DATOS.md` §2. Revisión ciega hecha el 2026-10-06 (`reviewer` en cada celda que puntúa; ver `docs/AFINIDAD-REVISION.md`).
 */

const PROGRAMA: Source = {
  url: "https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf",
  archiveUrl:
    "https://web.archive.org/web/20230709064011/https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf",
  title: "PSOE — Programa electoral. Elecciones generales 23 julio 2023",
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
    position: 2,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote: "Desarrollaremos las medidas contempladas para la contención de los precios de la vivienda.",
    source: at("221"),
    note:
      "Compromiso de «activar y desarrollar los instrumentos previstos en la ley» (Ley 12/2023, por el derecho a la vivienda), entre ellos «controlar subidas de precios abusivas» (misma página). No menciona expresamente las zonas tensionadas ni los nuevos contratos: confianza media. Página impresa 215.",
  },
  "irpf-inflacion": sinPosicion(
    "Buscado «deflact», «inflación» junto a «IRPF», «tarifa del IRPF», «indexa» en todo el PDF y leído el apartado de fiscalidad (pp. 37-39). Las menciones al IRPF son mínimos por descendientes, desgravación por hijo y cuenta ahorro vivienda; nada sobre actualizar tramos con la inflación.",
  ),
  "jornada-37-5": {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Continuaremos impulsando el proyecto piloto de reducción de jornada laboral para empresas industriales con medidas destinadas a la reducción de las jornadas laborales sin merma salarial.",
    source: at("50"),
    note:
      "Dirección clara (reducir jornada sin merma salarial) pero limitada a un proyecto piloto en empresas industriales; no propone bajar la jornada máxima legal ni cita las 37,5 h. Buscado también «37,5», «horas semanales», «jornada». Página impresa 48.",
  },
  amnistia: sinPosicion(
    "El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación», «procés», «referéndum»: solo aparece una referencia histórica al proceso independentista y al art. 155 (p. 228), sin posición sobre una amnistía.",
  ),
  nuclear: {
    position: -1,
    status: "verificado",
    reviewer: { position: -1, agrees: true },
    confidence: "media",
    quote:
      "Este nuevo plan integrará las necesidades para la gestión de residuos radioactivos y las futuras necesidades en el desmantelamiento ordenado y progresivo de las centrales nucleares.",
    source: at("74-75"),
    note:
      "La frase empieza en la p. 74 y termina en la p. 75 del PDF (es una sola frase). Va precedida de «Aprobaremos el 7º Plan General de Residuos Radioactivos.» Asume el desmantelamiento, pero no menciona el calendario 2027-2035 ni rechaza expresamente prorrogar: −1. Páginas impresas 71-72.",
  },
  "gasto-defensa": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Reforzaremos el presupuesto específico de Defensa que permita desarrollar los proyectos de planeamiento y programas del Ministerio, así como el cumplimiento del incremento de las inversiones de Defensa en el marco de los compromisos internacionales asumidos por España.",
    source: at("270"),
    note: "En p. 269 el programa presume de haber «doblado el presupuesto que la derecha destinaba a la Defensa». Página impresa 262.",
  },
  "impuesto-grandes-fortunas": {
    position: 0,
    status: "verificado",
    reviewer: { position: 0, agrees: true },
    confidence: "media",
    quote:
      "Evaluaremos los resultados del Impuesto Temporal de Solidaridad de las Grandes Fortunas y, en su caso, avanzaremos en el debate sobre la tributación de la riqueza en el marco del modelo de financiación autonómica para acabar con la competencia fiscal desleal entre territorios.",
    source: at("39"),
    note:
      "Posición explícitamente abierta («Evaluaremos… y, en su caso, avanzaremos en el debate»): ni compromiso de mantener el impuesto ni de suprimirlo. Codificado 0 por ambivalencia textual (DATOS §1, ejemplo «estudiaremos»). Página impresa 37.",
  },
  "okupacion-desalojo": {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "alta",
    quote:
      "En particular, se impulsará la reforma Legislativa normativa para garantizar el desalojo de los ocupas ilegales en un plazo máximo de 48 horas.",
    source: at("251"),
    note:
      "Mismo asunto, pero con plazo de 48 horas en lugar de 24 y sin mencionar la acreditación de título: +1 (compromiso parcial). Página impresa 244.",
  },
  "inmigracion-competencias-cataluna": sinPosicion(
    "El programa es anterior a la proposición PSOE-Junts de delegación (2024-2025). Buscado «competencias» junto a inmigración/extranjería/fronteras, «Mossos», «delegación», «149»: sin resultados sobre competencias de inmigración.",
  ),
  "tauromaquia-patrimonio": sinPosicion(
    "Buscado «taurin», «tauromaquia», «toros», «corrida», «festejos», «patrimonio cultural inmaterial»: sin resultados.",
  ),
  "prisiones-agentes-autoridad": sinPosicion(
    "Buscado «penitenci», «prisiones», «prisión», «cárcel», «presos», «agente(s) de la autoridad», «funcionarios de prisiones» en todo el PDF. Solo aparece «Fortaleceremos las políticas resocializadoras de nuestro sistema penitenciario para evitar la reincidencia» (p. 238); nada sobre la condición de agentes de la autoridad de los funcionarios de prisiones.",
  ),
  "prostitucion-abolicion": {
    position: 2,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Aboliremos la prostitución. Desarrollaremos una ley para prohibir el proxenetismo en todas sus formas, que incluya el castigo de la tercería locativa y la sanción a los proxenetas.",
    source: at("158"),
    note:
      "En la p. 157 el PSOE se declara «abolicionista de la prostitución». Compromiso concreto con el proxenetismo en todas sus formas y la tercería locativa, pero la cita no menciona expresamente multar a quien paga ni no sancionar a quien ejerce (sí habla de «víctimas» y «personas prostituidas»): confianza media. Buscado también «cliente», «demanda», «comprador». Página impresa 153.",
  },
  "iva-primera-vivienda": sinPosicion(
    "Buscado «IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «Actos Jurídicos» y «fiscal» junto a «vivienda». Lo que aparece sobre la compra no son impuestos de la compraventa: avales ICO del 20 % de la hipoteca para jóvenes (pp. 130 y 226) y una cuenta de ahorro para la primera vivienda exenta en el IRPF (p. 226). El IVA reducido solo se menciona para otros productos (higiene femenina, p. 138; sin gluten, p. 203). Nada sobre el IVA, el ITP ni el AJD de la compra de vivienda.",
  ),
  "impuesto-banca": {
    position: 0,
    status: "verificado",
    reviewer: { position: 0, agrees: true },
    confidence: "media",
    quote:
      "Evaluaremos la prórroga y ajustes de los gravámenes temporales sobre la banca y energéticas, para que ambos sectores sigan contribuyendo a la justicia fiscal y al sostenimiento del Estado de bienestar.",
    source: at("39"),
    note:
      "Posición explícitamente abierta («Evaluaremos la prórroga y ajustes»): no se compromete a subir el gravamen ni a añadir uno sobre beneficios extraordinarios, tampoco a suprimirlo. Codificado 0 por ambivalencia textual, como «impuesto-grandes-fortunas» (misma página). Página impresa 37.",
  },
  "registro-lobbies": {
    position: 2,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Aprobaremos la Ley de Lobbies para dar transparencia a las actividades de los grupos de interés, creando un registro público y gratuito que permita monitorizar las actividades de influencia que se ejercen sobre el personal empleado público.",
    source: at("243"),
    note:
      "Compromiso concreto con una ley de lobbies y un registro público; no dice expresamente que sea obligatorio ni menciona multas: confianza media. Repetido en la p. 246 («Aprobaremos las leyes de transparencia de grupos de interés…») y en la p. 247 (huella normativa). Página impresa 236.",
  },
};

export const stances: Stance[] = Object.entries(programme).map(([questionId, p]) => ({
  partyId: "psoe",
  questionId,
  programme: p,
  record: null,
}));
