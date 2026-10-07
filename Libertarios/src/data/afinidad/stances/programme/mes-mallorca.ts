import type { Confidence, Position, ProgrammeStance, Stance } from "../../types";

/**
 * Més per Mallorca — celdas de PROGRAMA (WP3).
 *
 * Fuentes (ambas alojadas en media.timtul.com, el gestor de contenidos que usa
 * mespermallorca.cat; enlaces descubiertos vía índice de la Wayback Machine y
 * descargados del servidor original el 2026-10-06):
 * - «Programa electoral 2023 de MÉS per Mallorca — Més que paraules»
 *   (autonómicas y Consell de Mallorca, 28-5-2023, 76 págs.): fuente de las
 *   celdas verificadas.
 * - «Un programa per viure millor. Eleccions estatals 23 de juliol de 2023»
 *   (capítulo balear de la coalición Sumar Més, 8 págs.): también revisado;
 *   no trata ninguno de los asuntos salvo vivienda (ver nota de esa celda).
 * Páginas = página del PDF (coinciden con la numeración impresa). Citas
 * literales en catalán con traducción en la nota.
 */

const SOURCE = {
  url: "https://media.timtul.com/media/web_mespermallorca/ProgramaMES2023_20230601110649.pdf",
  title: "MÉS per Mallorca — Programa electoral 2023 «Més que paraules» (Parlament i Consell)",
  year: 2023,
};

const GENERALES_2023 =
  "https://media.timtul.com/media/web_mespermallorca/Programa%20Sumar%20MES_20231020080512.pdf";

const CONTEXT =
  "Programa de las elecciones al Parlament de les Illes Balears y al Consell de Mallorca 2023. En las generales de 2023 concurrió en la coalición Sumar Més, cuyo programa balear («Un programa per viure millor», 8 págs.) también se ha revisado.";

/**
 * Revisión ciega del 2026-10-06 (docs/AFINIDAD-REVISION.md): posición que dio
 * el revisor a cada celda verificada viendo solo enunciado, cita y fuente, sin
 * la posición del codificador. `agrees` = diferencia ≤ 1 (docs/AFINIDAD-DATOS.md §4).
 */
const REVISOR: Record<string, Position> = {
  "vivienda-tope-alquiler": 2,
  "jornada-37-5": 1,
  "nuclear": -1,
  "tauromaquia-patrimonio": -2,
  "prostitucion-abolicion": 1,
  "iva-primera-vivienda": 0,
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
  partyId: "mes-mallorca",
  questionId,
  programme: { position, status: "verificado", ...revisor(questionId, position), confidence, quote, source: { ...SOURCE, page }, note: `${CONTEXT} ${note}` },
  record: null,
});

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "mes-mallorca",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: { ...SOURCE },
    note: `${CONTEXT} Ninguno de los dos programas trata el asunto. Buscado: ${searched}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  verified(
    "vivienda-tope-alquiler",
    2,
    "alta",
    "Promourem la limitació dels increments dels preus del lloguer o l’establiment de lloguers màxims, tot dotant els municipis de capacitat de delimitar zones tensades amb rendes abusives.",
    "55",
    `Traducción: «Promoveremos la limitación de los incrementos de los precios del alquiler o el establecimiento de alquileres máximos, dotando a los municipios de capacidad de delimitar zonas tensionadas con rentas abusivas». En el programa de las generales de 2023 (${GENERALES_2023}, p. 6): «Modificarem la llei d’habitatge per baixar els preus de lloguer per no superar la taxa d’esforç del 30%».`,
  ),
  noPosition("irpf-inflacion", "«IRPF», «deflactar», «inflació» (solo deducciones autonómicas y pacto de rentas)"),
  verified(
    "jornada-37-5",
    1,
    "media",
    "Reclamarem a l’Estat la implantació de programes de jornada laboral de quatre dies.",
    "37",
    "Traducción: «Reclamaremos al Estado la implantación de programas de jornada laboral de cuatro días». Dirección favorable a reducir la jornada, sin rebaja concreta de la jornada máxima legal: +1. En el PDF hay un doble espacio tras «implantació».",
  ),
  noPosition("amnistia", "«amnistia»"),
  verified(
    "nuclear",
    -1,
    "media",
    "Impulsarem una fiscalitat diferent que bonifiqui les energies renovables i desanimi la producció i comercialització d’energies brutes com les fòssils, les d’incineració de residus i les nuclears.",
    "31",
    "Traducción: «Impulsaremos una fiscalidad diferente que bonifique las energías renovables y desanime la producción y comercialización de energías sucias como las fósiles, las de incineración de residuos y las nucleares». Contraria a la nuclear por vía fiscal, sin hablar del calendario de cierre: −1.",
  ),
  noPosition("gasto-defensa", "«militar», «exèrcit», «defensa», «OTAN», «armament»"),
  noPosition("impuesto-grandes-fortunas", "«grans fortunes», «impost sobre el patrimoni», «riquesa» (solo progresividad genérica)"),
  noPosition("okupacion-desalojo", "«okupació», «ocupació il·legal», «desallotjament»"),
  noPosition(
    "inmigracion-competencias-cataluna",
    "«immigració», «Catalunya», «ports i aeroports» (pide competencias exclusivas en puertos y aeropuertos para Baleares, sin tratar inmigración ni Cataluña)",
  ),
  verified(
    "tauromaquia-patrimonio",
    -2,
    "alta",
    "Recuperarem la lluita per a l’abolició total de la tauromàquia i reclamarem la sobirania plena del Govern de les Illes Balears per a legislar en temes de benestar animal.",
    "11",
    "Traducción: «Retomaremos la lucha por la abolición total de la tauromaquia y reclamaremos la soberanía plena del Govern de las Illes Balears para legislar en temas de bienestar animal».",
  ),
  noPosition(
    "oficina-anticorrupcion",
    "«corrupció», «anticorrupció», «antifrau», «integritat», «oficina», «agència», «autoritat independent», «Fiscalia Anticorrupció», «conflicte d’interessos», «malversació», «denunciants», «alertadors». En el apartado «Radicalitat democràtica» (p. 26) solo hay medidas generales: personar a la CAIB en los casos de corrupción, retirar honores a los condenados y «identificar i perseguir les conductes que utilitzin el servei públic com una oportunitat per afavorir negocis privats»; ninguna oficina o agencia anticorrupción. Las «oficinas» del programa son de evaluación pública (p. 28), planificación (p. 31) y otras materias",
  ),
  verified(
    "prostitucion-abolicion",
    1,
    "media",
    "Continuarem impulsant estratègies per a l’eliminació del consum de prostitució entre els joves de Balears, evitant sempre la criminalització de les dones que l’exerceixen.",
    "69",
    "Traducción: «Seguiremos impulsando estrategias para la eliminación del consumo de prostitución entre los jóvenes de Baleares, evitando siempre la criminalización de las mujeres que la ejercen». Va contra la demanda y no sanciona a quien la ejerce, pero no habla del Código Penal ni del proxenetismo: +1. En pp. 58, 61 y 73 hay además campañas y un plan contra la trata con fines de explotación sexual.",
  ),
  noPosition(
    "impuesto-banca",
    "«banca», «bancs», «entitats financeres», «gravamen», «beneficis extraordinaris» (p. 36: «Demanarem a l’Estat l’exercici d’un control sobre els beneficis extraordinaris empresarials que resultin de la inflació», sin mencionar la banca ni un impuesto)",
  ),
  noPosition(
    "ceuta-embajador-marruecos",
    "«Marroc», «Ceuta», «Melilla», «Sàhara», «frontera», «ambaixada», «sobirania», «integritat territorial», «duana». Ninguno de los dos programas menciona Marruecos, Ceuta o Melilla; «sobirania» solo aparece referida a las Illes Balears (fiscal, energética, de datos)",
  ),
  verified(
    "iva-primera-vivienda",
    0,
    "media",
    "Promourem que els impostos per la compravenda d’habitatges (IVA d’obra nova, ITP i AJD) siguin progressius per trams, en funció del patrimoni.",
    "56",
    "Traducción: «Promoveremos que los impuestos por la compraventa de viviendas (IVA de obra nueva, ITP y AJD) sean progresivos por tramos, en función del patrimonio». Trata el IVA de la compra de vivienda nueva, pero no propone bajarlo ni subirlo de forma general sino hacerlo progresivo según el patrimonio, y no lo liga a la primera vivienda: vía intermedia, 0. El programa balear de Sumar Més de las generales (8 págs.) solo pide un IVA propio reducido para las Baleares por la insularidad (p. 3), sin hablar de la vivienda.",
  ),
];
