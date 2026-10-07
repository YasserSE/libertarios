import type { Bloc, Confidence, Lang, Party, Status } from "@/data/afinidad/types";

/**
 * Textos de las páginas de transparencia de «¿A quién votar? Objetivamente»:
 * metodología, datos abiertos y fichas de partido.
 *
 * El castellano es la fuente. Catalán, gallego y euskera están completos (el
 * tipo lo exige: no hay caída al castellano clave a clave), pero son
 * TRADUCCIONES AUTOMÁTICAS PENDIENTES DE REVISIÓN HUMANA: están listadas en
 * `docs/AFINIDAD-CAMBIOS.md` y no deben darse por buenas hasta que una persona
 * nativa las revise. En un test electoral una palabra mal traducida («en
 * contra» frente a «contrario») puede cambiar lo que se entiende.
 *
 * La prosa larga de la metodología vive en su propia tabla
 * (`methodology.ts`), traducida a las cuatro lenguas.
 *
 * Las notas técnicas de cada posición (`note` de programa y votación) se
 * mantienen en castellano a propósito; en los demás idiomas se rotulan con
 * `labels.stanceNote`, que lo dice.
 *
 * Viven aquí y no en `dictionaries/` porque esos diccionarios los toca WP9 y
 * estas páginas tienen que poder publicarse aunque WP9 aún no haya terminado.
 */

export interface TransparencyStrings {
  appName: string;
  madeBy: string;
  inPreparation: { title: string; body: string };
  nav: { methodology: string; data: string; json: string; changelog: string; corrections: string };
  /** Posición del partido respecto al enunciado, de −2 a +2. */
  position: Record<"-2" | "-1" | "0" | "1" | "2", string>;
  status: Record<Status, string>;
  statusHelp: Record<Status, string>;
  confidence: Record<Confidence, string>;
  partyStatus: Record<Party["status"], string>;
  bloc: Record<Bloc, string>;
  vote: Record<"si" | "no" | "abstencion" | "ausente", string>;
  lens: { programme: string; record: string; hemeroteca: string };
  labels: {
    noData: string;
    source: string;
    page: string;
    archive: string;
    note: string;
    reviewer: string;
    scoredAs: string;
    programmeYear: string;
    vote: string;
    voteOf: string;
    boe: string;
    otherChamber: string;
    video: string;
    contrasts: string;
    version: string;
    question: string;
    party: string;
    sheet: string;
    allQuestions: string;
    /** `{vote}` se sustituye por «Sí» o «No». */
    agreeMeans: string;
    /** Iniciales de la tabla partido × pregunta (programa / hechos). */
    matrixProgramme: string;
    matrixRecord: string;
    /** Abreviaturas de la referencia de una votación: legislatura, sesión, número. */
    legislatureAbbr: string;
    sessionAbbr: string;
    numberAbbr: string;
    /** Rótulo de la nota técnica de una posición (la nota va siempre en castellano). */
    stanceNote: string;
  };
  /** Papel del partido en una norma del BOE. */
  boeRole: Record<"gobierno" | "apoyo", string>;
  /** Asunto del correo de «Corregir un dato». */
  correctionsSubject: string;
  data: {
    title: string;
    intro: string;
    download: string;
    license: string;
    matrixTitle: string;
    matrixHelp: string;
    detailTitle: string;
    legend: string;
  };
  party: {
    back: string;
    inclusion: string;
    status: string;
    scope: string;
    scopeState: string;
    scopeRegional: string;
    parliamentary: string;
    parliamentaryYes: string;
    parliamentaryNo: string;
    recordNote: string;
    noRecord: string;
    group: string;
    government: string;
    blocNote: string;
    coherence: string;
    coherenceHelp: string;
    coherenceNone: string;
    positions: string;
    quotes: string;
    quotesHelp: string;
    noQuotes: string;
    deputies: string;
    notFound: string;
    /** Rediseño: cifras en tarjetas y ficha plegada. */
    statProgramme: string;
    statRecord: string;
    statDvh: string;
    profile: string;
    positionsHelp: string;
    seeQuotes: string;
  };
  methodology: {
    title: string;
  };
}

const es: TransparencyStrings = {
  appName: "¿A quién votar? Objetivamente",
  madeBy: "Un proyecto del equipo de Libertarios.eu · No afiliado a ningún partido",
  inPreparation: {
    title: "Datos en preparación",
    body:
      "Todavía no hay posiciones publicadas. Preferimos enseñar esta página vacía a rellenarla con datos sin fuente: cada celda aparecerá cuando tenga un documento o una votación que cualquiera pueda abrir.",
  },
  nav: {
    methodology: "Metodología",
    data: "Datos abiertos",
    json: "Descargar JSON",
    changelog: "Registro de cambios",
    corrections: "Corregir un dato",
  },
  position: {
    "-2": "En contra",
    "-1": "En contra con matices",
    "0": "Posición intermedia",
    "1": "A favor con matices",
    "2": "A favor",
  },
  status: {
    verificado: "Verificado",
    pendiente: "Pendiente",
    "sin-posicion": "Sin posición",
    contested: "Codificación discrepante",
  },
  statusHelp: {
    verificado: "Con fuente abierta y revisión. Puntúa.",
    pendiente: "Aún no se ha encontrado o leído la fuente. No puntúa.",
    "sin-posicion": "La fuente no trata el asunto. No puntúa y no es un 0.",
    contested:
      "Dos codificaciones independientes difieren en más de un punto. Puntúa con la media de ambas.",
  },
  confidence: { alta: "Confianza alta", media: "Confianza media", baja: "Confianza baja" },
  partyStatus: {
    confirmada: "Candidatura confirmada",
    "por-confirmar": "Candidatura por confirmar",
  },
  bloc: {
    izquierda: "Izquierda",
    derecha: "Derecha",
    nacionalista: "Nacionalista",
    otro: "Otro",
  },
  vote: { si: "Sí", no: "No", abstencion: "Abstención", ausente: "Ausente" },
  lens: { programme: "Programa", record: "Hechos", hemeroteca: "Hemeroteca" },
  labels: {
    noData: "Sin dato",
    source: "Fuente",
    page: "pág.",
    archive: "copia archivada",
    note: "Nota",
    reviewer: "Revisión ciega",
    scoredAs: "Puntúa como",
    programmeYear: "Programa 2023 — se actualizará con el de 2026",
    vote: "Votación",
    voteOf: "Voto del grupo",
    boe: "BOE",
    otherChamber: "Otro parlamento",
    video: "Vídeo de la intervención",
    contrasts: "La cita y la votación van en sentidos distintos",
    version: "Versión de los datos",
    question: "Pregunta",
    party: "Partido",
    sheet: "Ficha",
    allQuestions: "Todas las preguntas",
    agreeMeans: "votar «{vote}» equivale a estar de acuerdo con el enunciado",
    matrixProgramme: "P",
    matrixRecord: "H",
    legislatureAbbr: "leg.",
    sessionAbbr: "ses.",
    numberAbbr: "nº",
    stanceNote: "Nota",
  },
  boeRole: { gobierno: "gobierno", apoyo: "apoyo" },
  correctionsSubject: "Corrección — ¿A quién votar? Objetivamente",
  data: {
    title: "Datos abiertos",
    intro:
      "Cada posición de cada partido en cada pregunta, con la cita del programa, la votación del Congreso y su estado de revisión. Lo que no tiene fuente aparece como hueco.",
    download: "Descargar el conjunto completo (JSON)",
    license: "Licencia CC BY 4.0: puedes reutilizarlo citando la fuente.",
    matrixTitle: "Tabla partido × pregunta",
    matrixHelp:
      "P = programa, H = hechos (votaciones). Las cifras van de −2 (en contra del enunciado) a +2 (a favor). Pulsa una pregunta para ver citas y votaciones.",
    detailTitle: "Detalle por pregunta",
    legend: "Estados",
  },
  party: {
    back: "Volver a los datos",
    inclusion: "Por qué está incluido",
    status: "Estado de la candidatura",
    scope: "Ámbito",
    scopeState: "Estatal",
    scopeRegional: "Autonómico",
    parliamentary: "Escaño en el Congreso (XV legislatura)",
    parliamentaryYes: "Sí",
    parliamentaryNo: "No",
    recordNote: "De dónde sale su historial",
    noRecord:
      "Sin escaño en el Congreso: no tiene votaciones que medir y se compara solo por programa.",
    group: "Grupo en el Congreso",
    government: "En el Gobierno",
    blocNote: "Bloque (solo se usa para la tarjeta «tu sorpresa»; no afecta a la puntuación)",
    coherence: "Coincidencia entre programa y votaciones",
    coherenceHelp:
      "1 − media de |programa − hechos| / 4, sobre las preguntas con ambos datos verificados.",
    coherenceNone: "No hay preguntas con programa y votación verificados a la vez.",
    positions: "Posiciones y fuentes",
    quotes: "Hemeroteca",
    quotesHelp: "Lo que dijeron, con fecha y fuente. No puntúa.",
    noQuotes: "Sin citas registradas.",
    deputies: "Diputados cuyo voto se atribuye a este partido",
    notFound: "No hay ningún partido con ese identificador en esta versión de los datos.",
    statProgramme: "posiciones de programa",
    statRecord: "posiciones por votos",
    statDvh: "dijeron vs. hicieron",
    profile: "Ficha del partido",
    positionsHelp: "De muy en contra a muy a favor. Toca una fila para ver la cita y la votación.",
    seeQuotes: "Ver citas",
  },
  methodology: {
    title: "Metodología",
  },
};


// Traducción automática pendiente de revisión humana (ver docs/AFINIDAD-CAMBIOS.md).
const ca: TransparencyStrings = {
  appName: "A qui votar? Objectivament",
  madeBy: "Un projecte de l'equip de Libertarios.eu · No afiliat a cap partit",
  inPreparation: {
    title: "Dades en preparació",
    body:
      "Encara no hi ha posicions publicades. Preferim mostrar aquesta pàgina buida que omplir-la amb dades sense font: cada cel·la apareixerà quan tingui un document o una votació que qualsevol pugui obrir.",
  },
  nav: {
    methodology: "Metodologia",
    data: "Dades obertes",
    json: "Descarregar JSON",
    changelog: "Registre de canvis",
    corrections: "Corregir una dada",
  },
  position: {
    "-2": "En contra",
    "-1": "En contra amb matisos",
    "0": "Posició intermèdia",
    "1": "A favor amb matisos",
    "2": "A favor",
  },
  status: {
    verificado: "Verificat",
    pendiente: "Pendent",
    "sin-posicion": "Sense posició",
    contested: "Codificació discrepant",
  },
  statusHelp: {
    verificado: "Amb font oberta i revisió. Puntua.",
    pendiente: "Encara no s'ha trobat o llegit la font. No puntua.",
    "sin-posicion": "La font no tracta l'assumpte. No puntua i no és un 0.",
    contested:
      "Dues codificacions independents difereixen en més d'un punt. Puntua amb la mitjana de totes dues.",
  },
  confidence: { alta: "Confiança alta", media: "Confiança mitjana", baja: "Confiança baixa" },
  partyStatus: { confirmada: "Candidatura confirmada", "por-confirmar": "Candidatura per confirmar" },
  bloc: {
    izquierda: "Esquerra",
    derecha: "Dreta",
    nacionalista: "Nacionalista",
    otro: "Altre",
  },
  vote: { si: "Sí", no: "No", abstencion: "Abstenció", ausente: "Absent" },
  lens: { programme: "Programa", record: "Fets", hemeroteca: "Hemeroteca" },
  labels: {
    noData: "Sense dada",
    source: "Font",
    page: "pàg.",
    archive: "còpia arxivada",
    note: "Nota",
    reviewer: "Revisió cega",
    scoredAs: "Puntua com a",
    programmeYear: "Programa 2023 — s'actualitzarà amb el del 2026",
    vote: "Votació",
    voteOf: "Vot del grup",
    boe: "BOE",
    otherChamber: "Un altre parlament",
    video: "Vídeo de la intervenció",
    contrasts: "La cita i la votació van en sentits diferents",
    version: "Versió de les dades",
    question: "Pregunta",
    party: "Partit",
    sheet: "Fitxa",
    allQuestions: "Totes les preguntes",
    agreeMeans: "votar «{vote}» equival a estar d'acord amb l'enunciat",
    matrixProgramme: "P",
    matrixRecord: "F",
    legislatureAbbr: "leg.",
    sessionAbbr: "ses.",
    numberAbbr: "núm.",
    stanceNote: "Nota tècnica (en castellà)",
  },
  boeRole: { gobierno: "govern", apoyo: "suport" },
  correctionsSubject: "Correcció — A qui votar? Objectivament",
  data: {
    title: "Dades obertes",
    intro:
      "Cada posició de cada partit en cada pregunta, amb la cita del programa, la votació del Congrés i el seu estat de revisió. El que no té font apareix com a buit.",
    download: "Descarregar el conjunt complet (JSON)",
    license: "Llicència CC BY 4.0: pots reutilitzar-lo citant-ne la font.",
    matrixTitle: "Taula partit × pregunta",
    matrixHelp:
      "P = programa, F = fets (votacions). Les xifres van de −2 (en contra de l'enunciat) a +2 (a favor). Prem una pregunta per veure'n les cites i les votacions.",
    detailTitle: "Detall per pregunta",
    legend: "Estats",
  },
  party: {
    back: "Tornar a les dades",
    inclusion: "Per què hi és inclòs",
    status: "Estat de la candidatura",
    scope: "Àmbit",
    scopeState: "Estatal",
    scopeRegional: "Autonòmic",
    parliamentary: "Escó al Congrés (XV legislatura)",
    parliamentaryYes: "Sí",
    parliamentaryNo: "No",
    recordNote: "D'on surt el seu historial",
    noRecord:
      "Sense escó al Congrés: no té votacions per mesurar i només es compara pel programa.",
    group: "Grup al Congrés",
    government: "Al Govern",
    blocNote: "Bloc (només s'utilitza per a la targeta «la teva sorpresa»; no afecta la puntuació)",
    coherence: "Coincidència entre programa i votacions",
    coherenceHelp:
      "1 − mitjana de |programa − fets| / 4, sobre les preguntes amb totes dues dades verificades.",
    coherenceNone: "No hi ha preguntes amb programa i votació verificats alhora.",
    positions: "Posicions i fonts",
    quotes: "Hemeroteca",
    quotesHelp: "El que van dir, amb data i font. No puntua.",
    noQuotes: "Sense cites registrades.",
    deputies: "Diputats el vot dels quals s'atribueix a aquest partit",
    notFound: "No hi ha cap partit amb aquest identificador en aquesta versió de les dades.",
    statProgramme: "posicions de programa",
    statRecord: "posicions per vots",
    statDvh: "van dir vs. van fer",
    profile: "Fitxa del partit",
    positionsHelp: "De molt en contra a molt a favor. Toca una fila per veure la cita i la votació.",
    seeQuotes: "Veure les cites",
  },
  methodology: {
    title: "Metodologia",
  },
};

// Tradución automática pendente de revisión humana (ver docs/AFINIDAD-CAMBIOS.md).
const gl: TransparencyStrings = {
  appName: "A quen votar? Obxectivamente",
  madeBy: "Un proxecto do equipo de Libertarios.eu · Non afiliado a ningún partido",
  inPreparation: {
    title: "Datos en preparación",
    body:
      "Aínda non hai posicións publicadas. Preferimos amosar esta páxina baleira a enchela con datos sen fonte: cada cela aparecerá cando teña un documento ou unha votación que calquera poida abrir.",
  },
  nav: {
    methodology: "Metodoloxía",
    data: "Datos abertos",
    json: "Descargar JSON",
    changelog: "Rexistro de cambios",
    corrections: "Corrixir un dato",
  },
  position: {
    "-2": "En contra",
    "-1": "En contra con matices",
    "0": "Posición intermedia",
    "1": "A favor con matices",
    "2": "A favor",
  },
  status: {
    verificado: "Verificado",
    pendiente: "Pendente",
    "sin-posicion": "Sen posición",
    contested: "Codificación discrepante",
  },
  statusHelp: {
    verificado: "Con fonte aberta e revisión. Puntúa.",
    pendiente: "Aínda non se atopou ou non se leu a fonte. Non puntúa.",
    "sin-posicion": "A fonte non trata o asunto. Non puntúa e non é un 0.",
    contested:
      "Dúas codificacións independentes difiren en máis dun punto. Puntúa coa media de ambas.",
  },
  confidence: { alta: "Confianza alta", media: "Confianza media", baja: "Confianza baixa" },
  partyStatus: { confirmada: "Candidatura confirmada", "por-confirmar": "Candidatura por confirmar" },
  bloc: {
    izquierda: "Esquerda",
    derecha: "Dereita",
    nacionalista: "Nacionalista",
    otro: "Outro",
  },
  vote: { si: "Si", no: "Non", abstencion: "Abstención", ausente: "Ausente" },
  lens: { programme: "Programa", record: "Feitos", hemeroteca: "Hemeroteca" },
  labels: {
    noData: "Sen dato",
    source: "Fonte",
    page: "páx.",
    archive: "copia arquivada",
    note: "Nota",
    reviewer: "Revisión cega",
    scoredAs: "Puntúa como",
    programmeYear: "Programa 2023 — actualizarase co de 2026",
    vote: "Votación",
    voteOf: "Voto do grupo",
    boe: "BOE",
    otherChamber: "Outro parlamento",
    video: "Vídeo da intervención",
    contrasts: "A cita e a votación van en sentidos distintos",
    version: "Versión dos datos",
    question: "Pregunta",
    party: "Partido",
    sheet: "Ficha",
    allQuestions: "Todas as preguntas",
    agreeMeans: "votar «{vote}» equivale a estar de acordo co enunciado",
    matrixProgramme: "P",
    matrixRecord: "F",
    legislatureAbbr: "lex.",
    sessionAbbr: "ses.",
    numberAbbr: "n.º",
    stanceNote: "Nota técnica (en castelán)",
  },
  boeRole: { gobierno: "goberno", apoyo: "apoio" },
  correctionsSubject: "Corrección — A quen votar? Obxectivamente",
  data: {
    title: "Datos abertos",
    intro:
      "Cada posición de cada partido en cada pregunta, coa cita do programa, a votación do Congreso e o seu estado de revisión. O que non ten fonte aparece como un oco.",
    download: "Descargar o conxunto completo (JSON)",
    license: "Licenza CC BY 4.0: podes reutilizalo citando a fonte.",
    matrixTitle: "Táboa partido × pregunta",
    matrixHelp:
      "P = programa, F = feitos (votacións). As cifras van de −2 (en contra do enunciado) a +2 (a favor). Preme nunha pregunta para ver citas e votacións.",
    detailTitle: "Detalle por pregunta",
    legend: "Estados",
  },
  party: {
    back: "Volver aos datos",
    inclusion: "Por que está incluído",
    status: "Estado da candidatura",
    scope: "Ámbito",
    scopeState: "Estatal",
    scopeRegional: "Autonómico",
    parliamentary: "Escano no Congreso (XV lexislatura)",
    parliamentaryYes: "Si",
    parliamentaryNo: "Non",
    recordNote: "De onde sae o seu historial",
    noRecord:
      "Sen escano no Congreso: non ten votacións que medir e compárase só polo programa.",
    group: "Grupo no Congreso",
    government: "No Goberno",
    blocNote: "Bloque (só se usa para a tarxeta «a túa sorpresa»; non afecta á puntuación)",
    coherence: "Coincidencia entre programa e votacións",
    coherenceHelp:
      "1 − media de |programa − feitos| / 4, sobre as preguntas con ambos os datos verificados.",
    coherenceNone: "Non hai preguntas con programa e votación verificados á vez.",
    positions: "Posicións e fontes",
    quotes: "Hemeroteca",
    quotesHelp: "O que dixeron, con data e fonte. Non puntúa.",
    noQuotes: "Sen citas rexistradas.",
    deputies: "Deputados cuxo voto se atribúe a este partido",
    notFound: "Non hai ningún partido con ese identificador nesta versión dos datos.",
    statProgramme: "posicións de programa",
    statRecord: "posicións por votos",
    statDvh: "dixeron vs. fixeron",
    profile: "Ficha do partido",
    positionsHelp: "De moi en contra a moi a favor. Toca unha fila para ver a cita e a votación.",
    seeQuotes: "Ver as citas",
  },
  methodology: {
    title: "Metodoloxía",
  },
};

// Itzulpen automatikoa, giza berrikuspenaren zain (ver docs/AFINIDAD-CAMBIOS.md).
const eu: TransparencyStrings = {
  appName: "Nori bozkatu? Objektiboki",
  madeBy: "Libertarios.eu taldearen proiektua · Ez dago inongo alderdiri lotuta",
  inPreparation: {
    title: "Datuak prestatzen",
    body:
      "Oraindik ez dago jarrerarik argitaratuta. Nahiago dugu orri hau hutsik erakutsi iturririk gabeko datuekin bete baino: gelaxka bakoitza edonork ireki dezakeen dokumentu edo bozketa bat duenean agertuko da.",
  },
  nav: {
    methodology: "Metodologia",
    data: "Datu irekiak",
    json: "JSONa deskargatu",
    changelog: "Aldaketen erregistroa",
    corrections: "Datu bat zuzendu",
  },
  position: {
    "-2": "Aurka",
    "-1": "Aurka, ñabardurekin",
    "0": "Tarteko jarrera",
    "1": "Alde, ñabardurekin",
    "2": "Alde",
  },
  status: {
    verificado: "Egiaztatua",
    pendiente: "Zain",
    "sin-posicion": "Jarrerarik gabe",
    contested: "Kodeketa desberdina",
  },
  statusHelp: {
    verificado: "Iturri irekiarekin eta berrikusita. Puntuatzen du.",
    pendiente: "Iturria ez da oraindik aurkitu edo irakurri. Ez du puntuatzen.",
    "sin-posicion": "Iturriak ez du gaia jorratzen. Ez du puntuatzen, eta ez da 0 bat.",
    contested:
      "Bi kodeketa independenteren artean puntu bat baino gehiagoko aldea dago. Bien batez bestekoarekin puntuatzen du.",
  },
  confidence: { alta: "Konfiantza handia", media: "Konfiantza ertaina", baja: "Konfiantza txikia" },
  partyStatus: { confirmada: "Hautagaitza berretsia", "por-confirmar": "Berresteko dagoen hautagaitza" },
  bloc: {
    izquierda: "Ezkerra",
    derecha: "Eskuina",
    nacionalista: "Nazionalista",
    otro: "Beste bat",
  },
  vote: { si: "Bai", no: "Ez", abstencion: "Abstentzioa", ausente: "Ez zegoen" },
  lens: { programme: "Programa", record: "Egitateak", hemeroteca: "Hemeroteka" },
  labels: {
    noData: "Daturik ez",
    source: "Iturria",
    page: "or.",
    archive: "artxibatutako kopia",
    note: "Oharra",
    reviewer: "Berrikuspen itsua",
    scoredAs: "Honela puntuatzen du:",
    programmeYear: "2023ko programa — 2026koarekin eguneratuko da",
    vote: "Bozketa",
    voteOf: "Taldearen botoa",
    boe: "BOE",
    otherChamber: "Beste parlamentu bat",
    video: "Esku-hartzearen bideoa",
    contrasts: "Aipamena eta bozketa norabide desberdinetan doaz",
    version: "Datuen bertsioa",
    question: "Galdera",
    party: "Alderdia",
    sheet: "Fitxa",
    allQuestions: "Galdera guztiak",
    agreeMeans: "«{vote}» bozkatzea baieztapenarekin ados egotearen baliokidea da",
    matrixProgramme: "P",
    matrixRecord: "E",
    legislatureAbbr: "leg.",
    sessionAbbr: "bilk.",
    numberAbbr: "zk.",
    stanceNote: "Ohar teknikoa (gaztelaniaz)",
  },
  boeRole: { gobierno: "gobernua", apoyo: "babesa" },
  correctionsSubject: "Zuzenketa — Nori bozkatu? Objektiboki",
  data: {
    title: "Datu irekiak",
    intro:
      "Alderdi bakoitzaren jarrera galdera bakoitzean, programaren aipamenarekin, Kongresuko bozketarekin eta berrikuspen-egoerarekin. Iturririk ez duena hutsune gisa agertzen da.",
    download: "Multzo osoa deskargatu (JSON)",
    license: "CC BY 4.0 lizentzia: berrerabil dezakezu iturria aipatuz.",
    matrixTitle: "Alderdia × galdera taula",
    matrixHelp:
      "P = programa, E = egitateak (bozketak). Zifrak −2tik (baieztapenaren aurka) +2ra (alde) doaz. Sakatu galdera bat aipamenak eta bozketak ikusteko.",
    detailTitle: "Xehetasuna galderaka",
    legend: "Egoerak",
  },
  party: {
    back: "Datuetara itzuli",
    inclusion: "Zergatik dagoen sartuta",
    status: "Hautagaitzaren egoera",
    scope: "Esparrua",
    scopeState: "Estatukoa",
    scopeRegional: "Autonomikoa",
    parliamentary: "Eserlekua Kongresuan (XV. legealdia)",
    parliamentaryYes: "Bai",
    parliamentaryNo: "Ez",
    recordNote: "Nondik datorren bere historiala",
    noRecord:
      "Kongresuan eserlekurik gabe: ez du neurtzeko bozketarik, eta programaren arabera bakarrik konparatzen da.",
    group: "Taldea Kongresuan",
    government: "Gobernuan",
    blocNote: "Blokea («Zure ezustekoa» txartelean bakarrik erabiltzen da; ez du puntuazioan eraginik)",
    coherence: "Programaren eta bozketen arteko bat-etortzea",
    coherenceHelp:
      "1 − |programa − egitateak|-en batez bestekoa / 4, bi datuak egiaztatuta dituzten galderetan.",
    coherenceNone: "Ez dago programa eta bozketa aldi berean egiaztatuta dituen galderarik.",
    positions: "Jarrerak eta iturriak",
    quotes: "Hemeroteka",
    quotesHelp: "Esan zutena, data eta iturriarekin. Ez du puntuatzen.",
    noQuotes: "Ez dago aipamenik erregistratuta.",
    deputies: "Botoa alderdi honi egozten zaion diputatuak",
    notFound: "Ez dago identifikatzaile hori duen alderdirik datuen bertsio honetan.",
    statProgramme: "programako jarrerak",
    statRecord: "botoen araberako jarrerak",
    statDvh: "esan zutena eta egin zutena",
    profile: "Alderdiaren fitxa",
    positionsHelp: "Erabat aurkatik erabat aldera. Ukitu errenkada bat aipamena eta bozketa ikusteko.",
    seeQuotes: "Ikusi aipamenak",
  },
  methodology: {
    title: "Metodologia",
  },
};

const TABLES: Record<Lang, TransparencyStrings> = { es, ca, gl, eu };

const isLang = (l: string): l is Lang => l === "es" || l === "ca" || l === "gl" || l === "eu";

/** Idioma del módulo para un `locale` del sitio; cualquier otro cae a `es`. */
export function afinidadLang(locale: string): Lang {
  return isLang(locale) ? locale : "es";
}

/** Textos para un idioma; un `locale` que no sea de las cuatro lenguas (p. ej. `pt`) recibe el castellano. */
export function getTransparencyStrings(locale: string): TransparencyStrings {
  return TABLES[afinidadLang(locale)];
}

/** Etiqueta de una posición (también medias de `contested`, p. ej. 0,5). */
export function positionLabel(t: TransparencyStrings, position: number): string {
  const rounded = Math.max(-2, Math.min(2, Math.round(position)));
  return t.position[String(rounded) as keyof TransparencyStrings["position"]];
}

/** Las cuatro tablas sin mezclar, para el test de completitud (`afinidad-i18n.test.ts`). */
export const TRANSPARENCY_TABLES = { es, ca, gl, eu } as const;
