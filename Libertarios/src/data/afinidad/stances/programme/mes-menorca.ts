import type { Confidence, Position, ProgrammeStance, Stance } from "../../types";

/**
 * Més per Menorca — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa electoral de Més per Menorca. Eleccions insulars i
 * autonòmiques de 2023» (88 págs.), en la sección de transparencia de
 * mespermenorca.cat («Maig-2023 consell i parlament»). No se ha localizado un
 * programa propio para las generales de 2023. Páginas = página del PDF
 * (coinciden con la numeración impresa). Citas literales en catalán con
 * traducción en la nota; cada cita se ha cotejado con el texto de su página.
 */

const SOURCE = {
  url: "https://www.mespermenorca.cat/ca/download/538/",
  title: "Més per Menorca — Programa electoral, eleccions insulars i autonòmiques de 2023",
  year: 2023,
};

const CONTEXT =
  "Programa de las elecciones al Parlament de les Illes Balears y al Consell Insular de Menorca 2023; no se ha localizado programa propio para las generales de 2023.";

/**
 * Revisión ciega del 2026-10-06 (docs/AFINIDAD-REVISION.md): posición que dio
 * el revisor a cada celda verificada viendo solo enunciado, cita y fuente, sin
 * la posición del codificador. `agrees` = diferencia ≤ 1 (docs/AFINIDAD-DATOS.md §4).
 */
const REVISOR: Record<string, Position> = {
  "vivienda-tope-alquiler": 2,
  "jornada-37-5": 0,
  "impuesto-grandes-fortunas": 1,
  "iva-primera-vivienda": 1,
  "oficina-anticorrupcion": 1,
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
  partyId: "mes-menorca",
  questionId,
  programme: { position, status: "verificado", ...revisor(questionId, position), confidence, quote, source: { ...SOURCE, page }, note: `${CONTEXT} ${note}` },
  record: null,
});

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "mes-menorca",
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
    2,
    "alta",
    "Amb la finalitat de fer l’accés a l’habitatge un dret real, impulsarem, per llei, la regulació dels preus del lloguer, amb preus màxims a les zones on més s’hagin disparat els preus en els darrers anys, i s’establiran en funció de les característiques de l’habitatge.",
    "43",
    "Traducción: «Con la finalidad de hacer del acceso a la vivienda un derecho real, impulsaremos, por ley, la regulación de los precios del alquiler, con precios máximos en las zonas donde más se hayan disparado los precios en los últimos años, y se establecerán en función de las características de la vivienda». Medida n.º 40.",
  ),
  noPosition("irpf-inflacion", "«IRPF», «deflactar», «inflació» (solo actualización de prestaciones con la inflación)"),
  verified(
    "jornada-37-5",
    0,
    "media",
    "Impulsarem l’estudi de les diferents opcions per a la implantació de la jornada laboral reduïda i la setmana laboral de quatre dies.",
    "9",
    "Traducción: «Impulsaremos el estudio de las diferentes opciones para la implantación de la jornada laboral reducida y la semana laboral de cuatro días». Compromiso de estudio, no de medida (regla «estudiaremos» de AFINIDAD-DATOS.md): 0. Medida n.º 49.",
  ),
  noPosition("amnistia", "«amnistia»"),
  noPosition("nuclear", "«nuclear»"),
  noPosition("gasto-defensa", "«militar», «exèrcit», «defensa», «OTAN»"),
  verified(
    "impuesto-grandes-fortunas",
    1,
    "media",
    "Impulsarem la creació d’un impost autonòmic sobre les grans fortunes.",
    "8",
    "Traducción: «Impulsaremos la creación de un impuesto autonómico sobre las grandes fortunas». Es autonómico, no estatal, y no fija umbral: +1. Medida n.º 34.",
  ),
  noPosition("okupacion-desalojo", "«okupació», «ocupació il·legal», «desallotjament»"),
  noPosition("inmigracion-competencias-cataluna", "«immigració», «Catalunya», «competències» (p. 51 pide para Baleares «les competències exclusives en immigració»; no trata Cataluña, no se extrapola)"),
  noPosition("tauromaquia-patrimonio", "«tauromàquia», «toros», «bous», «corrida»"),
  verified(
    "oficina-anticorrupcion",
    1,
    "media",
    "Vetlarem pel bon funcionament i la independència de l’Oficina Anticorrupció de les Illes Balears, dotant-la dels recursos humans, tècnics i econòmics necessaris.",
    "84",
    "Traducción: «Velaremos por el buen funcionamiento y la independencia de la Oficina Anticorrupción de las Illes Balears, dotándola de los recursos humanos, técnicos y económicos necesarios». Medida n.º 36 del apartado «Administració pública, transparència i bon govern». Refuerza como independiente un organismo anticorrupción autonómico, no estatal: +1. El texto extraído del PDF muestra los guiones como «·» («dotant·la»); se ha escrito el guion.",
  ),
  noPosition("prostitucion-abolicion", "«prostitució», «proxenetisme», «tràfic», «tracta», «explotació sexual»"),
  noPosition("impuesto-banca", "«banca», «bancs», «entitats financeres», «gravamen», «beneficis extraordinaris» (solo expropiación del uso de viviendas de entidades financieras, p. 43)"),
  noPosition(
    "ceuta-embajador-marruecos",
    "«Marroc», «Ceuta», «Melilla», «Sàhara», «frontera», «ambaixada», «sobirania», «integritat territorial», «duana». No menciona Marruecos, Ceuta ni Melilla; «sobirania» solo se refiere a la de los pueblos y de Menorca (pp. 81-82) y «ambaixador» al «ambaixador energètic» de los hoteles (p. 20)",
  ),
  verified(
    "iva-primera-vivienda",
    1,
    "baja",
    "Impulsarem una política fiscal que eviti l’especulació i afavoreixi l’accés a l’habitatge per part de les classes populars i treballadores. En aquest sentit, proposarem la reducció de l’impost de transmissions patrimonials per a l’adquisició d’immobles de baix import i gravarem amb un tipus molt més alt l’adquisició d’habitatges de luxe.",
    "43",
    "Medida 46. Traducción: «Impulsaremos una política fiscal que evite la especulación y favorezca el acceso a la vivienda de las clases populares y trabajadoras. En este sentido, propondremos la reducción del impuesto de transmisiones patrimoniales para la adquisición de inmuebles de bajo importe y gravaremos con un tipo mucho más alto la adquisición de viviendas de lujo». Rebaja el ITP (no el IVA) solo para compras de bajo importe y lo sube para las de lujo: parcial, +1, confianza baja. Se ha quitado el guion de partición («gra·varem»). Buscado también «IVA»: solo para productos menstruales (p. 45) y un tipo reducido por la insularidad (p. 83).",
  ),
];
