import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA del Bloque Nacionalista Galego (BNG). WP3.
 *
 * Fuente: «Que Galiza Conte! Con Máis Forza!», programa electoral del BNG
 * para las eleccións xerais del 23-7-2023 (68 páginas, en gallego),
 * publicado en bng.gal y todavía en línea. Hay también una versión de
 * lectura fácil («10 compromisos»), que no se ha usado.
 *
 * Citas literales en gallego; la traducción al castellano va en `note`.
 * Páginas: página del PDF (coincide con la numeración impresa). Cuando una
 * frase continúa en la página siguiente se indica el intervalo («19-20»): es
 * una sola frase cortada por el salto de página, no dos fragmentos unidos.
 */

const PROGRAMA: Source = {
  url: "https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf",
  title: "BNG: Programa Electoral Eleccións Xerais 2023 «Que Galiza Conte! Con Máis Forza!»",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230713120301/https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "bng",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Buscado en el texto completo (68 páginas): ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "«aluguer», «renda», «tensionad», «prezo». El apartado de vivienda (p. 15) pide más inversión, vivienda pública, contratos más largos y movilizar vivienda vacía, pero no limitar la renta de los contratos",
  ),
  {
    partyId: "bng",
    questionId: "irpf-inflacion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote: "Deflactar as tarifas do IRPF en función da taxa de inflación na Galiza.",
      source: at("39"),
      note: "Traducción: «Deflactar las tarifas del IRPF en función de la tasa de inflación en Galicia». Pide deflactar, pero no se compromete a hacerlo cada año (y lo refiere a la inflación gallega): +1, mismo criterio que en el resto de partidos.",
    },
    record: null,
  },
  {
    partyId: "bng",
    questionId: "jornada-37-5",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote: "Promover a implantación da xornada laboral de 35 horas semanais sen redución salarial.",
      source: at("16"),
      note: "Traducción: «Promover la implantación de la jornada laboral de 35 horas semanales sin reducción salarial». Va más allá de las 37,5 horas y sin bajar el sueldo; confianza media porque la cifra no es la del enunciado.",
    },
    record: null,
  },
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marrocos», «marroquí», «Ceuta», «Melilla», «Sáhara», «fronteira», «embaixada», «soberanía», «integridade territorial», «alfándega». Critica la asunción de la propuesta de Marruecos sobre el Sáhara y la «masacre de Melilla» (p. 5) y pide anular el cambio de posición sobre el Sáhara, condenar la «ocupación marroquí» e impulsar un referéndum de autodeterminación (p. 67); nada sobre una respuesta diplomática a Marruecos por Ceuta, Melilla o la frontera",
  ),
  sinPosicion(
    "amnistia",
    "«amnist», «Catalunya», «represaliad». «Amnistía» solo aparece para pedir la derogación de la Ley de Amnistía de 1977 (p. 28)",
  ),
  sinPosicion(
    "nuclear",
    "«nuclear», «centrais». Solo aparece el «peche das centrais» (de carbón, en el contexto de la transición justa gallega, p. 50) y los residuos nucleares de la Fosa Atlántica (p. 58); nada sobre el calendario de cierre nuclear",
  ),
  {
    partyId: "bng",
    questionId: "prostitucion-abolicion",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Impulsar medidas estratéxicas conducentes á abolición da prostitución desde unha perspectiva que puna e persiga o proxeneta e prostituidor, ficando as mulleres prostituídas libres de calquera criminalización, estigmatización ou aproximación moralista.",
      source: at("23"),
      note: "Traducción: «Impulsar medidas estratégicas conducentes a la abolición de la prostitución desde una perspectiva que castigue y persiga al proxeneta y al prostituidor, quedando las mujeres prostituidas libres de cualquier criminalización, estigmatización o aproximación moralista». Coincide con el enunciado: castigar a quien se lucra y a quien paga sin sancionar a quien la ejerce.",
    },
    record: null,
  },
  {
    partyId: "bng",
    questionId: "gasto-defensa",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Anular o compromiso do goberno español de aumentar o gasto militar até chegar a 2 % do PIB estatal, de maneira que se destinen ditos fondos ao incremento de diferentes partidas de gasto social.",
      source: at("66-67"),
      note: "Traducción: «Anular el compromiso del gobierno español de aumentar el gasto militar hasta llegar al 2 % del PIB estatal, de manera que se destinen dichos fondos al incremento de diferentes partidas de gasto social». La frase empieza en la p. 66 y acaba en la 67. En la misma lista (p. 67) pide también «a saída da OTAN».",
    },
    record: null,
  },
  {
    partyId: "bng",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Estabelecer a permanencia dos impostos específicos aos beneficios da banca, das grandes enerxéticas e ás grandes fortunas, reducir os límites de exención, aumentar a súa progresividade e traspasar a súa xestión á Galiza.",
      source: at("40-41"),
      note: "Traducción: «Establecer la permanencia de los impuestos específicos a los beneficios de la banca, de las grandes energéticas y a las grandes fortunas, reducir los límites de exención, aumentar su progresividad y traspasar su gestión a Galicia». Hacer permanente el impuesto a las grandes fortunas y ampliarlo; no fija el umbral de 10 millones: confianza media. La frase empieza en la p. 40 y acaba en la 41. Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): crear o mantener un impuesto a las grandes fortunas sin decir que sea estatal o sin umbral es +1 (antes +2).",
    },
    record: null,
  },
  sinPosicion("okupacion-desalojo", "«ocupación», «okupa», «desaloxo», «desafiuzamento»"),
  {
    partyId: "bng",
    questionId: "impuesto-banca",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Estabelecer a permanencia dos impostos específicos aos beneficios da banca, das grandes enerxéticas e ás grandes fortunas, reducir os límites de exención, aumentar a súa progresividade e traspasar a súa xestión á Galiza.",
      source: at("40-41"),
      note: "Traducción: «Establecer la permanencia de los impuestos específicos a los beneficios de la banca, de las grandes energéticas y a las grandes fortunas, reducir los límites de exención, aumentar su progresividad y traspasar su gestión a Galicia». Quiere mantener y endurecer el impuesto a la banca, pero sin las cifras del enunciado (duplicar el gravamen, 75 % sobre los beneficios extraordinarios): +1. La frase empieza en la p. 40 y acaba en la 41; es la misma que se cita en «impuesto-grandes-fortunas».",
    },
    record: null,
  },
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupción», «anticorrupción», «antifraude», «integridade», «oficina», «axencia», «autoridade independente», «fiscalía», «conflito de intereses», «malversación», «alertadores», «denunciantes». Las medidas «na loita contra a corrupción» (pp. 29-30) son inhabilitar a los cargos que cometan fraude fiscal, regular las puertas giratorias y las incompatibilidades y dar transparencia a la contratación pública; la única «Autoridade Independente» que propone es la de investigación de accidentes ferroviarios (p. 53). Ningún organismo contra la corrupción",
  ),
  sinPosicion("inmigracion-competencias-cataluna", "«Catalunya», «inmigración», «competencias». Las transferencias que pide son para Galicia"),
  sinPosicion("tauromaquia-patrimonio", "«tauromaquia», «touros», «corridas»"),
  sinPosicion(
    "iva-primera-vivienda",
    "«IVE», «superreducido», «primeira vivenda», «compra», «adquisición», «transmisións patrimoniais», «fiscalidade» junto a «vivenda». Solo «Reformular a fiscalidade sobre a vivenda con criterios redistributivos» (p. 15), sin decir en qué sentido ni hablar de la compra, y bajar al tramo superreducido el IVE de «bens e servizos esenciais» y culturales (p. 40), sin nombrar la vivenda"),
];
