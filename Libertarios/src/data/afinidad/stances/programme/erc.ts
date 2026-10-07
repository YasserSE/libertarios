import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Esquerra Republicana (ERC). WP3.
 *
 * Fuente: «Defensa Catalunya! Eleccions espanyoles 2023. Programa electoral»
 * de ERC para las generales del 23-7-2023 (132 páginas, en catalán),
 * publicado en la web de campaña defensacatalunya.esquerrarepublicana.cat y
 * todavía en línea (el mismo fichero, byte a byte, está en
 * static.esquerra.cat/uploads/20230905/e2023-programa.pdf).
 *
 * Citas literales en catalán; la traducción al castellano va en `note`.
 * Páginas: página del PDF. La numeración impresa es una menos (la portada no
 * cuenta): la p. 52 del PDF lleva impreso «51».
 */

const PROGRAMA: Source = {
  url: "https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf",
  title: "ERC: Defensa Catalunya! Eleccions espanyoles 2023. Programa electoral",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230715192116/https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "erc",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Buscado en el texto completo (132 páginas): ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "erc",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Defensar la limitació i impulsar la reducció dels preus del lloguer. Cal garantir l’emancipació juvenil en llibertat. La lluita per la regulació dels preus de lloguer, defensada per Esquerra Republicana tant al Parlament de Catalunya com al Congrés dels Diputats s’ha de mantenir i assegurar la seva execució com a mesura estructural",
      source: at("52"),
      note: "Traducción: «Defender la limitación e impulsar la reducción de los precios del alquiler. Hay que garantizar la emancipación juvenil en libertad. La lucha por la regulación de los precios del alquiler, defendida por Esquerra Republicana tanto en el Parlament de Catalunya como en el Congreso de los Diputados, se tiene que mantener y asegurar su ejecución como medida estructural». Apartado de juventud. En la p. 114 pide además que las comunidades con competencias puedan regular «els preus de lloguer».",
    },
    record: null,
  },
  sinPosicion("irpf-inflacion", "«IRPF», «deflact», «inflació», «trams». El apartado fiscal (p. 70) pide más progresividad y nuevos tramos para las rentas altas, nada sobre deflactar"),
  {
    partyId: "erc",
    questionId: "jornada-37-5",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "També necessitem bastir un escut que protegeixi les classes treballadores davant els abusos del mercat, que recuperi instruments com els salaris de tramitació o l’autorització administrativa dels ERO, en reforci d’altres com la indemnització per acomiadament i implementi mesures com la jornada laboral de quatre dies.",
      source: at("53"),
      note: "Traducción: «También necesitamos construir un escudo que proteja a las clases trabajadoras de los abusos del mercado, que recupere instrumentos como los salarios de tramitación o la autorización administrativa de los ERE, refuerce otros como la indemnización por despido e implemente medidas como la jornada laboral de cuatro días». A favor de reducir el tiempo de trabajo, pero sin cifra de horas semanales ni mención al salario: +1.",
    },
    record: null,
  },
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marroc», «marroquí», «Ceuta», «Melilla», «Sàhara», «frontera», «ambaixada», «sobirania», «integritat territorial», «duana». Pide revertir el reconocimiento de la soberanía marroquí sobre el Sáhara Occidental (p. 14) y defender su autodeterminación (p. 29), poner fin a los acuerdos de externalización de fronteras con Marruecos, Mauritania, Mali y Senegal por falta de garantías de derechos humanos y acabar con las devoluciones en caliente en Ceuta y Melilla (p. 38), y eliminar los privilegios fiscales de Ceuta y Melilla (p. 80); nada sobre una respuesta diplomática a Marruecos por sus actuaciones en Ceuta, Melilla o la frontera",
  ),
  {
    partyId: "erc",
    questionId: "amnistia",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote: "Impuls d’una llei d’Amnistia, per acabar amb tota la repressió política contra l’independentisme",
      source: at("16"),
      note: "Traducción: «Impulso de una ley de Amnistía, para acabar con toda la represión política contra el independentismo». Primera medida del apartado «Mentrestant, en defensa de Catalunya al Congrés i al Senat» de Drets. También en el compromiso 2 de la p. 8.",
    },
    record: null,
  },
  sinPosicion(
    "nuclear",
    "«nuclear», «tancament», «centrals». Solo pide que el Estado contribuya al «Fons de Transició Nuclear» de la Generalitat (p. 103) y el Tratado de Prohibición de las Armas Nucleares (p. 14); nada sobre alargar o mantener el calendario de cierre",
  ),
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitució», «proxenet», «abolició», «explotació sexual». Solo medidas contra el tráfico de personas y la explotación sexual (ley orgánica contra la trata, p. 43; fondo de indemnización para las víctimas, p. 48), sin pronunciarse sobre castigar a quien paga ni el proxenetismo consentido",
  ),
  {
    partyId: "erc",
    questionId: "gasto-defensa",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Reduir la despesa militar espanyola, tant en efectius com en capacitat armamentística, per tal de revertir l’increment de l’última dècada.",
      source: at("30"),
      note: "Traducción: «Reducir el gasto militar español, tanto en efectivos como en capacidad armamentística, para revertir el incremento de la última década». En la misma página: «Reduir un 50% el pressupost anual del Ministeri de Defensa destinat a partides i programes armamentístics».",
    },
    record: null,
  },
  {
    partyId: "erc",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Combatre i revertir el dèficit fiscal i assegurar que els que més tenen contribueixin més al bé comú: lluitar contra el frau fiscal i l'evasió de capitals, crear impostos sobre les grans fortunes, les transaccions financeres o les emissions de CO2.",
      source: at("8"),
      note: "Traducción: «Combatir y revertir el déficit fiscal y asegurar que los que más tienen contribuyan más al bien común: luchar contra el fraude fiscal y la evasión de capitales, crear impuestos sobre las grandes fortunas, las transacciones financieras o las emisiones de CO2». Compromiso 7 del «Compromís en defensa de Catalunya». En la p. 70 propone «Millorar el funcionament de l’impost a les grans fortunes». No fija el umbral de 10 millones: confianza media. Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): crear o mantener un impuesto a las grandes fortunas sin decir que sea estatal o sin umbral es +1 (antes +2).",
    },
    record: null,
  },
  sinPosicion(
    "okupacion-desalojo",
    "«ocupació», «okupa», «desallotjament». Solo pide juicios de proporcionalidad antes de autorizar desahucios en domicilios con menores (p. 60), no sobre ocupaciones ilegales",
  ),
  {
    partyId: "erc",
    questionId: "impuesto-banca",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Per aquest motiu, Esquerra aposta per convertir els impostos extraordinaris a la banca i les empreses energètiques en figures permanents i que, conseqüentment, un 50% del recaptat es transfereix directament a les comunitats autònomes, atenent que son els principals responsables de la despesa social.",
      source: at("70"),
      note: "Traducción: «Por este motivo, Esquerra apuesta por convertir los impuestos extraordinarios a la banca y las empresas energéticas en figuras permanentes y que, consecuentemente, un 50 % de lo recaudado se transfiera directamente a las comunidades autónomas, ya que son las principales responsables del gasto social». Apartado «c) Consolidar de forma permanent les figures temporals d’impostos sobre els beneficis extraordinaris de la banca i les energètiques». Quiere mantener de forma permanente el gravamen a la banca, pero no habla de duplicarlo ni de gravar al 75 % los beneficios extraordinarios: misma dirección que el enunciado sin la subida concreta, +1.",
    },
    record: null,
  },
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupció», «anticorrupció», «antifrau», «integritat», «oficina», «agència», «autoritat independent», «fiscalia», «conflicte d’interessos», «malversació», «alertadors», «denunciants». Diagnostica una «corrupció estructural i institucionalitzada» y las «portes giratòries» (pp. 23-24), pide denunciar la adjudicación de contratos a empresas condenadas por corrupción (p. 27) y reformar la Ley 19/2013 de transparencia (p. 30); la Oficina Antifrau de Catalunya solo aparece por las conversaciones de su exdirector con el exministro del Interior (p. 26). Ningún organismo estatal de prevención o investigación de la corrupción",
  ),
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "«competències», «immigració», «Generalitat», «Mossos», «ports i aeroports». Pide traspasar la titularidad de puertos y aeropuertos como infraestructuras (p. 111) y, para la futura república, la «Regulació dels fluxos migratoris» (p. 37), pero no la delegación en la Generalitat de permisos, expulsiones o control fronterizo",
  ),
  {
    partyId: "erc",
    questionId: "tauromaquia-patrimonio",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote:
        "Derogar la llei 18/2013, de 12 de novembre, per la regulació de la Tauromàquia com patrimoni cultural per garantir que no es destinen recursos públics de cultura cap a la tortura animal.",
      source: at("117"),
      note: "Traducción: «Derogar la ley 18/2013, de 12 de noviembre, para la regulación de la Tauromaquia como patrimonio cultural para garantizar que no se destinan recursos públicos de cultura a la tortura animal». También en la p. 106: «Demanarem la derogació de la Llei 18/2013».",
    },
    record: null,
  },
  {
    partyId: "erc",
    questionId: "iva-primera-vivienda",
    programme: {
      position: -1,
      status: "verificado",
      reviewer: { position: -1, agrees: true },
      confidence: "baja",
      quote:
        "Durant el període de creixement econòmic es van introduir elevats incentius fiscals a la compra d’habitatge que van desincentivar el lloguer i, en canvi, quan va esclatar la crisi econòmica i moltes famílies tenien dificultats per fer front a les seves hipoteques, el govern va optar per rescatar els bancs abans que les famílies.",
      source: at("113-114"),
      note: "Traducción: «Durante el periodo de crecimiento económico se introdujeron elevados incentivos fiscales a la compra de vivienda que desincentivaron el alquiler y, en cambio, cuando estalló la crisis económica y muchas familias tenían dificultades para hacer frente a sus hipotecas, el gobierno optó por rescatar a los bancos antes que a las familias». Diagnóstico del apartado «Habitatge»: critica los incentivos fiscales a la compra porque desincentivaron el alquiler, sin propuesta sobre el IVA de la compra: −1, confianza baja. Una sola frase cortada por el salto de página (PDF 113-114, impresas 112-113); el extractor da «hip oteques». Buscado también «IVA», «primer habitatge», «compra d’habitatge», «transmissions patrimonials», «actes jurídics»: las medidas fiscales de vivienda son la deducción del alquiler en el IRPF y suprimir el visado por compra de inmuebles de 500.000 € (p. 115).",
    },
    record: null,
  },
];
