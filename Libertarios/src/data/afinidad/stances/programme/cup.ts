import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de la Candidatura d'Unitat Popular (CUP). WP3.
 *
 * Fuente: programa oficial de la CUP – Per la Ruptura para las generales del
 * 23-7-2023 («AF_Programa-electoral_Congres-2023.pdf», 12 páginas, en
 * catalán), publicado en cup.cat y todavía en línea (la copia de Wayback es
 * idéntica byte a byte). Es un documento corto y de líneas generales: la
 * mayoría de las preguntas no se tratan y quedan `sin-posicion`.
 *
 * El programa de las autonómicas catalanas de 2024 (más reciente) solo se ha
 * encontrado en copias de prensa (beteve.cat, vilaweb.cat), no en la web del
 * partido; por eso no se ha usado.
 *
 * Citas literales en catalán; la traducción al castellano va en `note`.
 * Páginas: página del PDF (el documento no lleva numeración impresa).
 */

const PROGRAMA: Source = {
  url: "https://cup.cat/wp-content/uploads/2023/07/AF_Programa-electoral_Congres-2023.pdf",
  title: "CUP – Per la Ruptura: programa electoral, elecciones generales 2023",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230720183320/https://cup.cat/wp-content/uploads/2023/07/AF_Programa-electoral_Congres-2023.pdf",
};

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "cup",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Leído íntegro el programa de las generales de 2023 (12 páginas); buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "lloguer, preu, habitatge, zones tensionades. Solo dice que la ley de vivienda trae «petites millores» pero es «un instrument incapaç ni tan sols de frenar l'especulació» (p. 2) y «aturem l'especulació en els preus de [...] l'habitatge» (p. 8); ninguna de las dos se pronuncia sobre limitar la renta de los nuevos contratos",
  ),
  sinPosicion("irpf-inflacion", "IRPF, inflació, deflactar, trams"),
  sinPosicion(
    "jornada-37-5",
    "jornada, hores, 37,5. Solo aparece el lema «Treballem totes, treballem menys» (p. 10) en el apartado feminista, sin medida sobre la jornada legal",
  ),
  sinPosicion(
    "amnistia",
    "amnistia. El programa es anterior a la ley (2024) y pide el «lliure retorn a casa d'exiliats i empresonats polítics» (p. 7), sin mencionar una amnistía",
  ),
  {
    partyId: "cup",
    questionId: "nuclear",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -1, agrees: true },
      confidence: "media",
      quote:
        "Hem de virar cap a un model descarbonitzat, sense centrals nuclears, descentralitzat i d’autoproducció local d’energia renovable que permeti complir l’objectiu d’emissions de gasos d’efecte hivernacle zero l’any 2050.",
      source: { ...PROGRAMA, page: "9" },
      note: "Traducción: «Tenemos que virar hacia un modelo descarbonizado, sin centrales nucleares, descentralizado y de autoproducción local de energía renovable que permita cumplir el objetivo de emisiones de gases de efecto invernadero cero en 2050». Rechaza las nucleares como modelo; no habla del calendario de cierre (confianza media).",
    },
    record: null,
  },
  {
    partyId: "cup",
    questionId: "gasto-defensa",
    programme: {
      position: -1,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "media",
      quote:
        "Polítiques militaristes: intervenció en guerres imperialistes, venda d’armament, augment del pressupost destinat a les forces armades.",
      source: { ...PROGRAMA, page: "6" },
      note: "Traducción: «Políticas militaristas: intervención en guerras imperialistas, venta de armamento, aumento del presupuesto destinado a las fuerzas armadas». Enumera el aumento del gasto militar entre las consecuencias que rechaza de un gobierno del PP; en p. 2-3 critica «l'aprovació dels pressupostos amb més despesa militar de la història» y en p. 9 dice «No a l'OTAN». Rechazo claro sin compromiso concreto de revertirlo (−1).",
    },
    record: null,
  },
  sinPosicion(
    "impuesto-grandes-fortunas",
    "fortunes, patrimoni, impost. Solo dice «Cal avançar en la redistribució de la riquesa per mitjà de mesures impositives» (p. 10), sin mencionar un impuesto sobre grandes patrimonios",
  ),
  sinPosicion("okupacion-desalojo", "ocupació, desnonament, desallotjament"),
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "competències d'immigració, Generalitat, delegació. Defiende la independencia, no la delegación de competencias",
  ),
  sinPosicion(
    "tauromaquia-patrimonio",
    "toros, tauromàquia, correbous. Solo una mención genérica a los «drets dels animals no humans» (p. 10)",
  ),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "Marroc, marroquí, Ceuta, Melilla, Sàhara, frontera, ambaixada, sobirania, integritat territorial, duana. Denuncia la «massacre de migrants a Melilla per part de la policia marroquina» con la aquiescencia de la policía española y la «traïció» al pueblo saharaui (p. 3), y la actitud española ante la masacre de Melilla y la ocupación del Sáhara (p. 9); no propone ninguna medida ante Marruecos",
  ),
  sinPosicion("prostitucion-abolicion", "prostitució, proxenetisme, tràfic, tracta, explotació sexual"),
  sinPosicion(
    "impuesto-banca",
    "banca, bancs, impost, gravamen, beneficis extraordinaris. Critica el rescate bancario y pide que «els bancs retornin els milers de milions d'euros que l'Estat els va regalar» (p. 8), sin proponer un impuesto a la banca",
  ),
  sinPosicion(
    "oficina-anticorrupcion",
    "corrupció, anticorrupció, antifrau, integritat, oficina, agència, autoritat independent, fiscalia, malversació, denunciants. En «5. Fem fora la màfia» (p. 11) propone «estructures de participació» para el «control popular i directe» de los asuntos públicos como antídoto contra la corrupción, proteger a quien denuncie «les màfies» y auditar el fraude fiscal y las privatizaciones; ningún organismo estatal contra la corrupción",
  ),
  sinPosicion(
    "iva-primera-vivienda",
    "IVA, habitatge, primer habitatge, compra, adquisició, transmissions patrimonials, fiscalitat. No hay ninguna medida fiscal sobre la compra de vivienda",
  ),
];
