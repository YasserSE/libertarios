import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Aliança Catalana. WP3.
 *
 * Aliança Catalana no concurrió a las generales de 2023. Fuente: su programa
 * oficial para las elecciones al Parlament de Catalunya del 12-5-2024
 * («Programa-electoral-2024.pdf», 32 páginas, en catalán), enlazado desde
 * aliancacatalana.cat/programa-electoral-2024/. La web devuelve 403 a
 * descargas automáticas; las citas se han cotejado con la copia de Wayback de
 * `archiveUrl`.
 *
 * Citas literales en catalán; la traducción al castellano va en `note`.
 * Páginas: página del PDF (coincide con la numeración impresa al pie).
 * El extractor de texto añade un espacio antes del punto tras las negritas
 * («lloguer .»); en las citas se ha quitado ese espacio.
 */

const PROGRAMA: Source = {
  url: "https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf",
  title: "Aliança Catalana: programa electoral, elecciones al Parlament de Catalunya 2024",
  date: "2024-05-12",
  year: 2024,
  archiveUrl:
    "https://web.archive.org/web/20240428024640/https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf",
};

const ELECCION = "Programa de las autonómicas catalanas de 2024; no concurrió a las generales de 2023.";

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "alianca-catalana",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `${ELECCION} No trata el asunto. Leído el programa completo (32 páginas) y buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "alianca-catalana",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Els preus prohibitius del lloguer no s’eviten limitant-los amb lleis que només provoquen reducció d’oferta, economia submergida i conseqüents pujades de preus, sinó augmentant-ne l’oferta i oferint seguretat jurídica als propietaris. Per aquest motiu, tombarem la llei de limitació de preus del lloguer.",
      source: { ...PROGRAMA, page: "16" },
      note: `${ELECCION} Traducción: «Los precios prohibitivos del alquiler no se evitan limitándolos con leyes que solo provocan reducción de oferta, economía sumergida y consiguientes subidas de precios, sino aumentando la oferta y ofreciendo seguridad jurídica a los propietarios. Por este motivo, tumbaremos la ley de limitación de precios del alquiler». El mismo texto aparece también en la p. 15 (apartado de Barcelona).`,
    },
    record: null,
  },
  {
    partyId: "alianca-catalana",
    questionId: "irpf-inflacion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "per tal de protegir el poder adquisitiu dels nostres ciutadans i evitar que la inflació es mengi els ingressos de les nostres famílies, proposem reduir el nombre de trams de l’IRPF i deflactar-lo",
      source: { ...PROGRAMA, page: "6" },
      note: `${ELECCION} Traducción: «para proteger el poder adquisitivo de nuestros ciudadanos y evitar que la inflación se coma los ingresos de nuestras familias, proponemos reducir el número de tramos del IRPF y deflactarlo». No dice expresamente «cada año» (confianza media). Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): «deflactar» sin decir que sea cada año es +1 (antes +2).`,
    },
    record: null,
  },
  sinPosicion("jornada-37-5", "jornada, hores setmanals, 37,5 (solo menciona la conciliación en la Generalitat, p. 8)"),
  sinPosicion("amnistia", "amnistia, repressió, encausats (el programa defiende una declaración unilateral de independencia, p. 1, pero no habla de la amnistía)"),
  {
    partyId: "alianca-catalana",
    questionId: "nuclear",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Entenem que el futur de l’energia rau en una combinació de les energies renovables i de l’energia nuclear.",
      source: { ...PROGRAMA, page: "16" },
      note: `${ELECCION} Traducción: «Entendemos que el futuro de la energía reside en una combinación de las energías renovables y de la energía nuclear». Apuesta por nuevos reactores modulares (SMR) en Ascó y Vandellós y por «la força verda de la nuclear», pero no se pronuncia sobre el calendario de cierre de las centrales existentes: +1.`,
    },
    record: null,
  },
  sinPosicion("gasto-defensa", "despesa militar, defensa, OTAN (solo propone «un exèrcit» para la Cataluña independiente, p. 30)"),
  {
    partyId: "alianca-catalana",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "media",
      quote: "suprimir impostos contraris a l’estalvi com successions i patrimoni.",
      source: { ...PROGRAMA, page: "6" },
      note: `${ELECCION} Traducción: «suprimir impuestos contrarios al ahorro como sucesiones y patrimonio». Se refiere al impuesto sobre el patrimonio que gestiona la Generalitat, no a un impuesto estatal específico sobre grandes fortunas (confianza media).`,
    },
    record: null,
  },
  {
    partyId: "alianca-catalana",
    questionId: "okupacion-desalojo",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "pel que fa a les ocupacions, creiem imprescindible modificar el CP per adoptar una mesura cautelar de desallotjament immediat en un termini de 48 hores quan l’ocupant no pot aportar un títol de possessió legítim",
      source: { ...PROGRAMA, page: "10" },
      note: `${ELECCION} Traducción: «en cuanto a las ocupaciones, creemos imprescindible modificar el CP para adoptar una medida cautelar de desalojo inmediato en un plazo de 48 horas cuando el ocupante no pueda aportar un título de posesión legítimo». Mismo mecanismo que el enunciado con 48 h en lugar de 24 h (confianza media).`,
    },
    record: null,
  },
  {
    partyId: "alianca-catalana",
    questionId: "inmigracion-competencias-cataluna",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "creiem que quan un immigrant delinqueix, se l’ha de repatriar. En aquest cas, mentre no siguem un estat independent, cal exigir el traspàs de les competències en immigració.",
      source: { ...PROGRAMA, page: "11" },
      note: `${ELECCION} Traducción: «creemos que cuando un inmigrante delinque, se le tiene que repatriar. En este caso, mientras no seamos un estado independiente, hay que exigir el traspaso de las competencias en inmigración». Pide el traspaso a la Generalitat: en contra de que el Estado siga gestionándolas.`,
    },
    record: null,
  },
  sinPosicion("tauromaquia-patrimonio", "toros, tauromàquia, correbous, bous"),
  {
    partyId: "alianca-catalana",
    questionId: "prisiones-agentes-autoridad",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "volem que els treballadors de presons siguin reconeguts com a agents de l’autoritat, tal com fan els països del nostre entorn europeu.",
      source: { ...PROGRAMA, page: "12" },
      note: `${ELECCION} Traducción: «queremos que los trabajadores de prisiones sean reconocidos como agentes de la autoridad, tal como hacen los países de nuestro entorno europeo». Apartado «11. Presons» (pp. 11-13); en Cataluña las prisiones son de la Generalitat, pero la medida coincide con el enunciado.`,
    },
    record: null,
  },
  sinPosicion("prostitucion-abolicion", "prostitució, proxenetisme, tràfic, tracta, explotació sexual"),
  sinPosicion("impuesto-banca", "banca, bancs, entitats financeres, impost, gravamen (solo «bancs d'aliments», p. 2)"),
  sinPosicion("registro-lobbies", "lobbies, grups d'interès, grups de pressió, registre de transparència"),
  {
    partyId: "alianca-catalana",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "A més a més, per facilitar l’accés a l’habitatge dels més joves, eliminarem l’Impost sobre Transmissions Patrimonials en la compra del primer habitatge i el reduirem en la resta de casos.",
      source: { ...PROGRAMA, page: "15" },
      note: `${ELECCION} Traducción: «Además, para facilitar el acceso a la vivienda de los más jóvenes, eliminaremos el Impuesto sobre Transmisiones Patrimoniales en la compra de la primera vivienda y lo reduciremos en el resto de casos». Rebaja el impuesto autonómico de la compra de la primera vivienda (el ITP, que grava la de segunda mano), no el IVA de la vivienda nueva: misma dirección, +1. El mismo texto se repite en el apartado «14. Habitatge» (pp. 15-16). Buscado también «IVA»: no aparece referido a la vivienda.`,
    },
    record: null,
  },
];
