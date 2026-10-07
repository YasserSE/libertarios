/**
 * Prosa de la página de metodología de «¿A quién votar? Objetivamente».
 *
 * El castellano es la fuente. Catalán, gallego y euskera son TRADUCCIONES
 * AUTOMÁTICAS PENDIENTES DE REVISIÓN NATIVA (ver `docs/AFINIDAD-CAMBIOS.md`):
 * la metodología es un punto prioritario de esa revisión, porque explica cómo
 * se calcula la afinidad y una palabra mal elegida cambia lo que se entiende.
 *
 * Marcado mínimo, sin React (lo interpreta la página):
 *  - `{clave}`: valor o nodo que pone la página (constantes del motor, cifras,
 *    versión…). Las cifras nunca se escriben aquí a mano.
 *  - `**texto**`: negrita (`<strong>`); puede contener `{clave}`.
 *  - `[texto](clave)`: enlace; la página decide a dónde apunta `clave`.
 */

export interface MethodologyStrings {
  metaDescription: string;
  intro: string;
  schema: string;
  who: { h: string; p1: string; p2: string; items: [string, string, string, string] };
  parties: {
    h: string;
    intro: string;
    conditions: [string, string, string];
    plibRule: string;
    plibPending: string;
    plibIncluded: string;
    plibExcluded: string;
    noSeat: string;
    bloc: string;
  };
  layers: {
    h: string;
    programmeTitle: string;
    programmeBody: string;
    factsTitle: string;
    factsBody: string;
    hemerotecaTitle: string;
    hemerotecaBody: string;
    separate: string;
  };
  dvh: { h: string; p1: string; verdicts: string; said: string; sources: string; counts: string; seeAll: string };
  coding: {
    h: string;
    p1: string;
    scaleIntro: string;
    thValue: string;
    thMeaning: string;
    scale: [string, string, string, string, string];
    rules: [string, string, string, string, string, string, string];
  };
  calc: {
    h: string;
    answers: string;
    perQuestion: string;
    same: string;
    opposite: string;
    neutral: string;
    weighted: string;
    exampleTitle: string;
    thAnswer: string;
    thParty: string;
    thAgreement: string;
    thWeight: string;
    question: string;
    important: string;
    formula: string;
    shrink: string;
    coverage: string;
    order: string;
    consistency: string;
  };
  directional: {
    h: string;
    p1: string;
    example: string;
    thParty: string;
    thPositions: string;
    thOld: string;
    thUsed: string;
    contrast: [string, string, string];
    p2: string;
  };
  programmes: { h: string; p: string };
  notMeasured: { h: string; items: [string, string, string, string, string] };
  tests: {
    h: string;
    intro: string;
    items: [string, string, string, string, string, string, string, string, string, string];
    outro: string;
  };
  usage: { h: string; p: string };
  loreg: { h: string; p: string };
  version: { h: string; current: string; corrections: string };
}

const es: MethodologyStrings = {
  metaDescription:
    "Quién hace el test, qué partidos entran y por qué, de dónde salen las posiciones, cómo se calcula la afinidad y cómo comprobarlo.",
  intro:
    "Esta página explica de dónde sale cada número del test y cómo comprobarlo. Las cifras que aparecen aquí se leen del mismo código que calcula tu resultado.",
  schema: "esquema",
  who: {
    h: "Quién hace este test",
    p1: "Lo hace el **equipo de Libertarios.eu**, un sitio con una línea editorial libertaria. Lo decimos aquí y en el pie de cada página porque es lo primero que conviene saber de un test electoral, y porque descubrirlo después restaría más confianza que decirlo ahora. El proyecto no está afiliado a ningún partido.",
    p2: "Que lo haga un equipo con opiniones no obliga a fiarse de él. El test está construido para poder comprobarse sin hacerlo:",
    items: [
      "cada posición de cada partido lleva su fuente (cita literal del programa o votación del Congreso), y están todas en la página de [datos abiertos](data) y en un [fichero JSON](json) descargable con licencia CC BY 4.0;",
      "el código que calcula el resultado y las pruebas de neutralidad son públicos en [el repositorio](repo);",
      "la regla para decidir qué partidos entran es la misma para todos, incluido el P-LIB;",
      "las correcciones se registran en público, con fecha y motivo.",
    ],
  },
  parties: {
    h: "Qué partidos entran",
    intro: "Un partido entra si cumple una de estas condiciones, comprobable con una fuente oficial:",
    conditions: [
      "tiene escaño en el **Congreso de la XV legislatura**;",
      "es una **coalición registrada para las generales del 29 de noviembre de 2026** que integra a partidos del punto 1. Mientras no conste su registro aparece como «candidatura por confirmar», y su historial es el del grupo parlamentario del que procede, dicho así en su ficha;",
      "es un partido sin escaño en el Congreso que tiene **escaño en el Parlamento Europeo o en algún parlamento autonómico**, o que obtuvo **al menos el 1 % de los votos** en las generales de 2023.",
    ],
    plibRule:
      "**El Partido Libertario (P-LIB) se somete a la misma regla**: entra si la cumple y no entra si no la cumple, sin excepción por ser cercano a quien hace el test.",
    plibPending: "La decisión se publicará con la primera versión de los datos, junto con su fuente.",
    plibIncluded: "En esta versión de los datos está incluido por este motivo: {reason}",
    plibExcluded: "Con los datos de esta versión no cumple ninguna de las tres condiciones y no aparece en el test.",
    noSeat:
      "Los partidos sin escaño en el Congreso no tienen votaciones que medir: se comparan solo por programa, y el resultado lo indica. Los partidos que se presentan en una sola comunidad aparecen si indicas esa comunidad al empezar, o con «ver todos».",
    bloc: "Cada partido tiene asignado un bloque (izquierda, derecha, nacionalista u otro) que solo sirve para la tarjeta «tu sorpresa»: no interviene en ningún porcentaje. El bloque de cada partido figura en su ficha y en el JSON.",
  },
  layers: {
    h: "Tres capas de información",
    programmeTitle: "1. Programa",
    programmeBody:
      "Lo que el partido promete en su programa electoral oficial. Cita literal de hasta {maxQuote} palabras, con documento y página. **Puntúa** en la barra «Programa».",
    factsTitle: "2. Hechos: votaciones en el Congreso",
    factsBody:
      "Lo que votó su grupo (o sus diputados) en la votación del Congreso ligada a cada pregunta, con enlace a los datos abiertos de congreso.es. **Puntúa** en la barra «Hechos».",
    hemerotecaTitle: "3. Hemeroteca",
    hemerotecaBody:
      "Lo que dijeron sus portavoces, preferentemente en el Diario de Sesiones del debate de esa votación. Cita literal de hasta {maxWords} palabras con fecha y fuente. **No puntúa**: se enseña junto a lo que votaron.",
    separate:
      "Programa y Hechos se calculan y se muestran **por separado**. Si un partido promete una cosa y vota otra, se ve como dos barras distintas, en vez de quedar escondido en una media.",
  },
  dvh: {
    h: "Dijeron vs. hicieron: criterios",
    p1: "Además de las tres capas, el test recoge compromisos públicos de cada partido y lo que hizo después. Cada entrada tiene dos partes: **lo que dijeron** (quién, cuándo, cita literal de hasta {maxWords} palabras y su fuente) y **lo que hicieron** (fecha, descripción del hecho sin adjetivos y al menos una prueba enlazada: votación del Congreso con el mismo patrón de URL que los Hechos, referencia del BOE, otra votación parlamentaria, la ficha oficial de una iniciativa con su estado o un dato estadístico oficial —INE, ministerios, Tribunal de Cuentas, AIReF— con su organismo, fecha y valor; este último solo existe aquí y nunca puntúa). El esquema rechaza una entrada si el hecho es anterior a la cita.",
    verdicts:
      "La etiqueta tiene cuatro valores: **cumple** (hicieron lo que dijeron), **contradice** (hicieron lo contrario), **parcial** (una parte; el esquema exige una nota que diga cuál) y **no lo hicieron** (podían hacerlo y no ocurrió; el esquema exige una nota que diga por qué podían). Esta última existe porque, sin ella, solo contarían como incumplimiento los actos contrarios, y eso pesaría más sobre quien gobierna que sobre quien promete y no ejecuta; por eso solo se aplica a quien tenía el poder de hacerlo. Las cuatro se muestran con el mismo estilo, sin colores de aprobado o suspenso, y junto a cada partido se enseña siempre el recuento de las cuatro, para que se vea qué se ha seleccionado. Ahora mismo hay {total} entradas ({cumple} cumple, {contradice} contradice, {parcial} parcial, {noHecho} no lo hicieron).",
    sources:
      "**Independencia de la fuente** (regla del 2026-10-07, la misma para todos los partidos que han gobernado: PSOE, PP, Unidas Podemos y Sumar). Cada dato oficial lleva una etiqueta que dice quién lo mide: **fuente independiente** (AIReF, Tribunal de Cuentas, Banco de España, Eurostat, OCDE, Comisión Europea o Consejo de la UE, FMI, tribunales, evaluaciones oficiales de universidades), **estadística oficial** (INE, series de la IGAE, estadísticas de la Seguridad Social o de un ministerio con metodología publicada —no sus notas de prensa—, texto consolidado del BOE, créditos de una ley de presupuestos) o **dato del propio Gobierno** (notas de prensa, páginas web de un ministerio, preámbulos de decretos, informes de La Moncloa, autoevaluaciones). Un gobierno no se evalúa a sí mismo: un «cumple» necesita al menos un dato independiente o de estadística oficial. Si solo hay cifras del propio Gobierno, la etiqueta máxima es «parcial» y la nota lo dice («solo hay datos del propio Gobierno»). Las cifras del Gobierno no se esconden: se enseñan con su etiqueta. El esquema lo comprueba por máquina.",
    said: "**Qué cuenta como «lo que dijeron».** Solo un compromiso real: el programa electoral, la campaña, un discurso de investidura, un acuerdo de coalición o de investidura, o una promesa explícita sobre lo que el partido hará. Nunca una intervención en el mismo debate de la votación con la que se compara: eso es anunciar el voto, no comprometerse. No hay un plazo mínimo entre lo dicho y lo hecho: una promesa de investidura incumplida once días después cuenta (corrección del 2026-10-06, ver AFINIDAD-REVISION.md).",
    counts:
      "**Los recuentos no son comparables entre partidos.** Quien gobierna tiene más ocasiones de cumplir o incumplir, así que junto a cada recuento se dice si el partido ha gobernado en el Estado y cuándo. La página de la sección publica, partido a partido, qué se buscó y qué se descartó con su motivo («Qué buscamos y por qué no entró»). Hueco conocido: los compromisos de los gobiernos autonómicos (Generalitat, Gobierno Vasco, Canarias…) aún no se han investigado.",
    seeAll: "[Ver todas las entradas](all).",
  },
  coding: {
    h: "Cómo se codifica cada posición",
    p1: "Resumen de las reglas; el texto completo está en [AFINIDAD-DATOS.md](rules). La regla que está por encima de todas: **sin fuente que cualquiera pueda abrir no hay posición**. Un hueco se enseña como hueco; nunca se rellena por lo que «se deduce» de la ideología de un partido ni por lo que vota su socio.",
    scaleIntro: "Cada posición va de −2 a +2 respecto al enunciado de la pregunta (no respecto a izquierda o derecha):",
    thValue: "Valor",
    thMeaning: "Significado",
    scale: [
      "A favor de lo que dice el enunciado, sin condiciones.",
      "A favor con condiciones, matices o de forma parcial.",
      "Posición intermedia expresa: abstención en la votación o texto que se declara ambivalente. No es «no lo menciona».",
      "En contra con condiciones, matices o de forma parcial.",
      "En contra, sin condiciones.",
    ],
    rules: [
      "**Programa**: solo el programa electoral oficial. Prensa, entrevistas o Wikipedia no sirven como fuente de posición. Si el programa no trata el asunto, la celda es «sin posición» y no puntúa.",
      "**Votaciones**: votar en el sentido del enunciado es +2, en contra −2, abstención 0 (puntúa, porque es una posición expresada en el pleno). **No votar no es una posición**: una ausencia no puntúa.",
      "Si el partido votó dividido cuenta la mayoría; si esa mayoría no llega a dos tercios, la posición se acerca un punto a 0. Con varias votaciones en sentidos distintos se usa ±1 y se explica en la nota.",
      "Partidos sin grupo propio (en el Grupo Mixto): su voto se atribuye diputado a diputado, con fuente para cada atribución y respetando los cambios de grupo.",
      "Medidas aprobadas por el Gobierno sin votación (real decreto o acuerdo publicado en el BOE) cuentan solo para los partidos que estaban en el Gobierno en esa fecha.",
      "**Revisión ciega**: una segunda persona o agente codifica la misma cita sin ver la primera posición. Si difieren en más de un punto, la celda se marca «codificación discrepante», puntúa con la media de las dos y se muestra marcada.",
      "Las celdas «pendiente» (fuente aún no encontrada) y «sin posición» **no puntúan nunca** y se ven como hueco, no como 0.",
    ],
  },
  calc: {
    h: "Cómo se calcula tu afinidad",
    answers:
      "Respondes a cada afirmación en cuatro puntos (muy en contra −2, en contra −1, a favor +1, muy a favor +2) o la saltas con «No sé». No hay punto medio: así un salto no puede confundirse con una respuesta tibia. Las preguntas saltadas no cuentan.",
    perQuestion: "Para cada pregunta, el acuerdo con un partido va de 0 a 1:",
    same: "si tu respuesta y la posición del partido tienen **el mismo signo**: acuerdo = 1 − |tu respuesta − posición| / {den} (entre {min} y 1);",
    opposite: "si tienen **signo contrario**: acuerdo = {value};",
    neutral: "si el partido tiene un 0 expreso (abstención o ambivalencia): acuerdo = {value}.",
    weighted:
      "La afinidad es la media de esos acuerdos, ponderada: las preguntas que marcas con «Esto me importa» pesan **×{weight}**, el resto ×1.",
    exampleTitle: "Ejemplo con un partido ficticio",
    thAnswer: "Tu respuesta",
    thParty: "Partido",
    thAgreement: "Acuerdo",
    thWeight: "Peso",
    question: "Pregunta {n}",
    important: "(me importa)",
    formula: "Afinidad = ({terms} + {k} × {prior}) / ({weights} + {k}) = {score}.",
    shrink:
      "**Pocas respuestas, cifra prudente.** A la media se le suman siempre {kStrong} respuestas «neutras» con acuerdo {prior}: afinidad = (Σ peso × acuerdo + {k} × {prior}) / (Σ peso + {k}). Con muchas respuestas apenas cambia nada; con pocas, la cifra se acerca al {priorPct}. Por ejemplo, **5 de 5 coincidencias no es un 100 %**: es ({min} + {k} × {prior}) / ({min} + {k}) = {five}, mientras que 15 de 15 es un {fifteen}. Cinco aciertos pueden salir por azar con más facilidad que quince, y sin esta corrección los partidos de los que sabemos poco ganaban más a menudo solo por eso. La cifra que ves es ya la corregida: es la estimación honesta con los datos que hay.",
    coverage:
      "**Cobertura**: para que un partido aparezca con porcentaje en una lente (programa o votos), debe tener posición verificada en al menos {coverage} de las preguntas que respondiste, sea cual sea el porcentaje que eso suponga. Junto a cada barra se dice siempre en cuántas se basa («basado en X de Y respuestas»), para que se vea cuándo una cifra descansa en pocas preguntas. Por debajo de {min} aparece como «datos insuficientes», nunca como 0: así tres coincidencias perfectas no pueden ganar a quince respuestas al 90 %. Además hacen falta al menos {minAnswers} respuestas para dar un resultado: con menos, cualquier orden sería ruido.",
    order:
      "El orden por defecto usa la media de Programa y Hechos cuando ambas tienen datos suficientes; si un partido no tiene historial en el Congreso, solo Programa, y el resultado lo dice. Las dos cifras se muestran siempre por separado. Los empates exactos se marcan como empate.",
    consistency:
      "En cada ficha de partido figura también la coincidencia entre su programa y sus votaciones: 1 − la diferencia media |programa − hechos| / {max}, sobre las preguntas que tienen los dos datos.",
  },
  directional: {
    h: "Por qué se cuenta primero el lado",
    p1: "La fórmula habitual, acuerdo = 1 − |respuesta − posición| / {max}, premia a quien no se moja: un partido con todo a 0 queda siempre a media distancia de cualquiera. En una simulación con usuarios sintéticos, esa fórmula daba al partido del centro **el 72 % de las victorias** y relegaba sistemáticamente a los partidos de los extremos de ambos lados, contestara lo que contestara la gente. Por eso se descartó.",
    example: "Ejemplo: una persona responde +1 y −1 a dos preguntas, frente a tres partidos ficticios.",
    thParty: "Partido",
    thPositions: "Posiciones",
    thOld: "Fórmula descartada",
    thUsed: "Fórmula usada",
    contrast: ["Partido ficticio «todo 0»", "Partido ficticio «siempre +2»", "Partido ficticio «+2, −2»"],
    p2: "Con la fórmula descartada, el partido que no toma posición empata con el que coincide con la persona en las dos preguntas. Con la fórmula usada, coincidir en el lado es lo que más cuenta, y la intensidad afina dentro de ese lado.",
  },
  programmes: {
    h: "Programas de 2023 hasta que se publiquen los de 2026",
    p: "Las elecciones del 29 de noviembre se convocaron el 6 de octubre de 2026 y los partidos aún no han publicado sus programas. Hasta entonces se usan los **programas de las generales de 2023**, con la etiqueta visible «{label}» en cada cita. Cuando se publiquen los nuevos, se revisarán las celdas una a una y cada cambio quedará en el registro.",
  },
  notMeasured: {
    h: "Lo que este test no mide",
    items: [
      "Votaciones del Senado.",
      "Votaciones de los parlamentos autonómicos (salvo, cuando se indique, para partidos sin escaño en el Congreso).",
      "Decisiones del Gobierno publicadas en el BOE sin votación en el Congreso, para los partidos que no estaban en el Gobierno.",
      "Partidos sin escaño en el Congreso: no tienen historial de votaciones y se comparan solo por programa.",
      "Asuntos fuera de las preguntas del test, la gestión de gobierno o las personas candidatas.",
    ],
  },
  tests: {
    h: "Pruebas de neutralidad",
    intro:
      "Estas comprobaciones se ejecutan sobre el código y sobre los datos. Están en [checks.ts](checks), [afinidad-score.test.ts](scoreTest) y [afinidad-dataset.test.ts](datasetTest), y cualquiera puede ejecutarlas con {npmTest}.",
    items: [
      "Quien responde exactamente lo que dice un partido lo tiene primero y con al menos un {score} (no el 100 %: la cifra se corrige hacia el neutro con pocas respuestas); si dos partidos son indistinguibles, se avisa.",
      "Quien responde lo contrario de un partido lo tiene el último.",
      "Cambiar de signo todas las respuestas y todas las posiciones no cambia el orden: el motor trata igual los dos lados.",
      "Contestar lo mismo a todo (siempre +2, siempre −1…) no produce un ganador claro: entre el primero y la mediana hay como mucho {gap} puntos.",
      "En cada pregunta hay al menos {n} partidos a favor y {n} en contra.",
      "Ningún partido tiene todas sus posiciones del mismo signo.",
      "La cobertura de datos de cada bloque está a ±{tolerance} puntos de la media.",
      "Lo verificado tiene cita y enlace; las celdas pendientes o sin posición no cambian el resultado.",
      "Dominancia: con {users} usuarios al azar y {users} moderados sintéticos, ningún partido comparable gana a más del {maxShare} ni a menos del {minShare}. «Comparable» es el partido con dato en al menos {lens} preguntas en alguna de las dos lentes; el que no llega no compite (sale «datos insuficientes» para todo el mundo) y su hueco lo mide la prueba de cobertura.",
      "Un partido con 3 posiciones coincidentes no supera a uno que coincide al 90 % en 15.",
    ],
    outro:
      "Si una de estas pruebas falla con los datos reales, no se corrige tocando posiciones: se revisa la redacción de la pregunta o se busca la fuente que falta.",
  },
  usage: {
    h: "Qué registramos del uso",
    p: "Para saber si el test funciona contamos, en nuestra propia base de datos y sin servicios de terceros, unos pocos eventos: empezar y terminar el test, abrir una fuente, compartir (y por qué canal), declarar o no el contexto opcional, pulsar «Sigue explorando», abrir «Dijeron vs. hicieron» y copiar el enlace de una de sus entradas (sin decir cuál). Cada evento guarda solo su nombre, el idioma, la versión de los datos y la hora en punto. **No guarda tus respuestas, tu comunidad, tu voto habitual, ningún partido ni tu resultado**, ni IP, ni navegador, ni cookies o identificadores: no hay forma de unir dos eventos de la misma persona. Si tu navegador envía «Global Privacy Control» o «Do Not Track», no se registra nada. Los eventos se borran a los 180 días.",
  },
  loreg: {
    h: "Periodo de veda (LOREG, art. 69.7)",
    p: "Guardamos de forma anónima las respuestas de quien lo acepta (sin correo, sin IP, con la fecha truncada al día). Entre el **24 y el 29 de noviembre de 2026** no se publicará ningún agregado del tipo «qué partido gana en el test», en aplicación del artículo 69.7 de la Ley Orgánica del Régimen Electoral General. Fuera de ese periodo, cualquier dato agregado se publicará solo con grupos de al menos 20 personas y avisando de que no es una muestra representativa.",
  },
  version: {
    h: "Versión de los datos y correcciones",
    current:
      "Versión actual: {version}. Cada cambio de datos o de método, con su fecha y motivo, está en el [registro de cambios](changelog). Los enlaces compartidos llevan la versión: si los datos cambian, el resultado se recalcula y se avisa.",
    corrections:
      "¿Has encontrado un dato mal codificado, una cita incompleta o una fuente caída? Escríbenos a {email} indicando partido, pregunta y la fuente que lo demuestra. Las correcciones aceptadas se publican en el registro; las rechazadas, con el motivo.",
  },
};

// Traducción automática pendiente de revisión nativa.
const ca: MethodologyStrings = {
  metaDescription:
    "Qui fa el test, quins partits hi entren i per què, d'on surten les posicions, com es calcula l'afinitat i com comprovar-ho.",
  intro:
    "Aquesta pàgina explica d'on surt cada número del test i com comprovar-ho. Les xifres que apareixen aquí es llegeixen del mateix codi que calcula el teu resultat.",
  schema: "esquema",
  who: {
    h: "Qui fa aquest test",
    p1: "El fa l'**equip de Libertarios.eu**, un lloc amb una línia editorial llibertària. Ho diem aquí i al peu de cada pàgina perquè és el primer que convé saber d'un test electoral, i perquè descobrir-ho després restaria més confiança que dir-ho ara. El projecte no està afiliat a cap partit.",
    p2: "Que el faci un equip amb opinions no obliga a refiar-se'n. El test està construït perquè es pugui comprovar sense fer-ho:",
    items: [
      "cada posició de cada partit porta la seva font (cita literal del programa o votació del Congrés), i totes són a la pàgina de [dades obertes](data) i en un [fitxer JSON](json) descarregable amb llicència CC BY 4.0;",
      "el codi que calcula el resultat i les proves de neutralitat són públics al [repositori](repo);",
      "la regla per decidir quins partits hi entren és la mateixa per a tots, inclòs el P-LIB;",
      "les correccions es registren en públic, amb data i motiu.",
    ],
  },
  parties: {
    h: "Quins partits hi entren",
    intro: "Un partit hi entra si compleix una d'aquestes condicions, comprovable amb una font oficial:",
    conditions: [
      "té escó al **Congrés de la XV legislatura**;",
      "és una **coalició registrada per a les generals del 29 de novembre de 2026** que integra partits del punt 1. Mentre no consti el seu registre apareix com a «candidatura per confirmar», i el seu historial és el del grup parlamentari del qual prové, i així es diu a la seva fitxa;",
      "és un partit sense escó al Congrés que té **escó al Parlament Europeu o en algun parlament autonòmic**, o que va obtenir **almenys l'1 % dels vots** a les generals del 2023.",
    ],
    plibRule:
      "**El Partido Libertario (P-LIB) se sotmet a la mateixa regla**: hi entra si la compleix i no hi entra si no la compleix, sense cap excepció per ser proper a qui fa el test.",
    plibPending: "La decisió es publicarà amb la primera versió de les dades, juntament amb la seva font.",
    plibIncluded: "En aquesta versió de les dades hi és inclòs per aquest motiu: {reason}",
    plibExcluded:
      "Amb les dades d'aquesta versió no compleix cap de les tres condicions i no apareix al test.",
    noSeat:
      "Els partits sense escó al Congrés no tenen votacions per mesurar: es comparen només pel programa, i el resultat ho indica. Els partits que es presenten en una sola comunitat apareixen si indiques aquesta comunitat en començar, o amb «veure'ls tots».",
    bloc: "Cada partit té assignat un bloc (esquerra, dreta, nacionalista o altre) que només serveix per a la targeta «la teva sorpresa»: no intervé en cap percentatge. El bloc de cada partit figura a la seva fitxa i al JSON.",
  },
  layers: {
    h: "Tres capes d'informació",
    programmeTitle: "1. Programa",
    programmeBody:
      "El que el partit promet al seu programa electoral oficial. Cita literal de fins a {maxQuote} paraules, amb document i pàgina. **Puntua** a la barra «Programa».",
    factsTitle: "2. Fets: votacions al Congrés",
    factsBody:
      "El que va votar el seu grup (o els seus diputats) a la votació del Congrés vinculada a cada pregunta, amb enllaç a les dades obertes de congreso.es. **Puntua** a la barra «Fets».",
    hemerotecaTitle: "3. Hemeroteca",
    hemerotecaBody:
      "El que van dir els seus portaveus, preferentment al Diari de Sessions del debat d'aquella votació. Cita literal de fins a {maxWords} paraules amb data i font. **No puntua**: es mostra al costat del que van votar.",
    separate:
      "Programa i Fets es calculen i es mostren **per separat**. Si un partit promet una cosa i en vota una altra, es veu com dues barres diferents, en lloc de quedar amagat en una mitjana.",
  },
  dvh: {
    h: "Van dir vs. van fer: criteris",
    p1: "A més de les tres capes, el test recull compromisos públics de cada partit i el que va fer després. Cada entrada té dues parts: **el que van dir** (qui, quan, cita literal de fins a {maxWords} paraules i la seva font) i **el que van fer** (data, descripció del fet sense adjectius i almenys una prova enllaçada: votació del Congrés amb el mateix patró d'URL que els Fets, referència del BOE, una altra votació parlamentària, la fitxa oficial d'una iniciativa amb el seu estat o una dada estadística oficial —INE, ministeris, Tribunal de Comptes, AIReF— amb el seu organisme, data i valor; aquesta darrera només existeix aquí i mai no puntua). L'esquema rebutja una entrada si el fet és anterior a la cita.",
    verdicts:
      "L'etiqueta té quatre valors: **compleix** (van fer el que van dir), **contradiu** (van fer el contrari), **parcial** (una part; l'esquema exigeix una nota que digui quina) i **no ho van fer** (podien fer-ho i no va passar; l'esquema exigeix una nota que digui per què podien). Aquesta darrera existeix perquè, sense ella, només comptarien com a incompliment els actes contraris, i això pesaria més sobre qui governa que sobre qui promet i no executa; per això només s'aplica a qui tenia el poder de fer-ho. Les quatre es mostren amb el mateix estil, sense colors d'aprovat o suspens, i al costat de cada partit es mostra sempre el recompte de les quatre, perquè es vegi què s'ha seleccionat. Ara mateix hi ha {total} entrades ({cumple} compleix, {contradice} contradiu, {parcial} parcial, {noHecho} no ho van fer).",
    sources:
      "**Independència de la font** (regla del 2026-10-07, la mateixa per a tots els partits que han governat: PSOE, PP, Unidas Podemos i Sumar). Cada dada oficial porta una etiqueta que diu qui la mesura: **font independent** (AIReF, Tribunal de Comptes, Banc d'Espanya, Eurostat, OCDE, Comissió Europea o Consell de la UE, FMI, tribunals, avaluacions oficials d'universitats), **estadística oficial** (INE, sèries de la IGAE, estadístiques de la Seguretat Social o d'un ministeri amb metodologia publicada —no les seves notes de premsa—, text consolidat del BOE, crèdits d'una llei de pressupostos) o **dada del mateix Govern** (notes de premsa, pàgines web d'un ministeri, preàmbuls de decrets, informes de la Moncloa, autoavaluacions). Un govern no s'avalua a si mateix: un «compleix» necessita almenys una dada independent o d'estadística oficial. Si només hi ha xifres del mateix Govern, l'etiqueta màxima és «parcial» i la nota ho diu («només hi ha dades del mateix Govern»). Les xifres del Govern no s'amaguen: es mostren amb la seva etiqueta. L'esquema ho comprova per màquina.",
    said: "**Què compta com a «el que van dir».** Només un compromís real: el programa electoral, la campanya, un discurs d'investidura, un acord de coalició o d'investidura, o una promesa explícita sobre el que el partit farà. Mai una intervenció en el mateix debat de la votació amb què es compara: això és anunciar el vot, no comprometre's. No hi ha un termini mínim entre el que es diu i el que es fa: una promesa d'investidura incomplerta onze dies després compta (correcció del 2026-10-06, vegeu AFINIDAD-REVISION.md).",
    counts:
      "**Els recomptes no són comparables entre partits.** Qui governa té més ocasions de complir o incomplir, de manera que al costat de cada recompte es diu si el partit ha governat a l'Estat i quan. La pàgina de la secció publica, partit per partit, què es va buscar i què es va descartar amb el seu motiu («Què vam buscar i per què no hi va entrar»). Buit conegut: els compromisos dels governs autonòmics (Generalitat, Govern Basc, Canàries…) encara no s'han investigat.",
    seeAll: "[Veure totes les entrades](all).",
  },
  coding: {
    h: "Com es codifica cada posició",
    p1: "Resum de les regles; el text complet és a [AFINIDAD-DATOS.md](rules). La regla que és per damunt de totes: **sense una font que qualsevol pugui obrir no hi ha posició**. Un buit es mostra com a buit; mai no s'omple amb el que «es dedueix» de la ideologia d'un partit ni amb el que vota el seu soci.",
    scaleIntro:
      "Cada posició va de −2 a +2 respecte a l'enunciat de la pregunta (no respecte a esquerra o dreta):",
    thValue: "Valor",
    thMeaning: "Significat",
    scale: [
      "A favor del que diu l'enunciat, sense condicions.",
      "A favor amb condicions, matisos o de manera parcial.",
      "Posició intermèdia expressa: abstenció a la votació o text que es declara ambivalent. No és «no ho esmenta».",
      "En contra amb condicions, matisos o de manera parcial.",
      "En contra, sense condicions.",
    ],
    rules: [
      "**Programa**: només el programa electoral oficial. La premsa, les entrevistes o la Viquipèdia no serveixen com a font de posició. Si el programa no tracta l'assumpte, la cel·la és «sense posició» i no puntua.",
      "**Votacions**: votar en el sentit de l'enunciat és +2, en contra −2, abstenció 0 (puntua, perquè és una posició expressada al ple). **No votar no és una posició**: una absència no puntua.",
      "Si el partit va votar dividit compta la majoria; si aquesta majoria no arriba a dos terços, la posició s'acosta un punt a 0. Amb diverses votacions en sentits diferents s'usa ±1 i s'explica a la nota.",
      "Partits sense grup propi (al Grup Mixt): el seu vot s'atribueix diputat a diputat, amb font per a cada atribució i respectant els canvis de grup.",
      "Mesures aprovades pel Govern sense votació (reial decret o acord publicat al BOE) compten només per als partits que eren al Govern en aquella data.",
      "**Revisió cega**: una segona persona o agent codifica la mateixa cita sense veure la primera posició. Si difereixen en més d'un punt, la cel·la es marca «codificació discrepant», puntua amb la mitjana de les dues i es mostra marcada.",
      "Les cel·les «pendent» (font encara no trobada) i «sense posició» **no puntuen mai** i es veuen com a buit, no com a 0.",
    ],
  },
  calc: {
    h: "Com es calcula la teva afinitat",
    answers:
      "Respons cada afirmació en quatre punts (molt en contra −2, en contra −1, a favor +1, molt a favor +2) o la saltes amb «No ho sé». No hi ha punt mitjà: així un salt no es pot confondre amb una resposta tèbia. Les preguntes saltades no compten.",
    perQuestion: "Per a cada pregunta, l'acord amb un partit va de 0 a 1:",
    same: "si la teva resposta i la posició del partit tenen **el mateix signe**: acord = 1 − |la teva resposta − posició| / {den} (entre {min} i 1);",
    opposite: "si tenen **signe contrari**: acord = {value};",
    neutral: "si el partit té un 0 exprés (abstenció o ambivalència): acord = {value}.",
    weighted:
      "L'afinitat és la mitjana d'aquests acords, ponderada: les preguntes que marques amb «Això m'importa» pesen **×{weight}**, la resta ×1.",
    exampleTitle: "Exemple amb un partit fictici",
    thAnswer: "La teva resposta",
    thParty: "Partit",
    thAgreement: "Acord",
    thWeight: "Pes",
    question: "Pregunta {n}",
    important: "(m'importa)",
    formula: "Afinitat = ({terms} + {k} × {prior}) / ({weights} + {k}) = {score}.",
    shrink:
      "**Poques respostes, xifra prudent.** A la mitjana s'hi sumen sempre {kStrong} respostes «neutres» amb acord {prior}: afinitat = (Σ pes × acord + {k} × {prior}) / (Σ pes + {k}). Amb moltes respostes gairebé no canvia res; amb poques, la xifra s'acosta al {priorPct}. Per exemple, **5 de 5 coincidències no és un 100 %**: és ({min} + {k} × {prior}) / ({min} + {k}) = {five}, mentre que 15 de 15 és un {fifteen}. Cinc encerts poden sortir per atzar amb més facilitat que quinze, i sense aquesta correcció els partits dels quals sabem poc guanyaven més sovint només per això. La xifra que veus ja és la corregida: és l'estimació honesta amb les dades que hi ha.",
    coverage:
      "**Cobertura**: perquè un partit aparegui amb percentatge en una lent (programa o vots), ha de tenir posició verificada en almenys {coverage} de les preguntes que has respost, sigui quin sigui el percentatge que això suposi. Al costat de cada barra es diu sempre en quantes es basa («basat en X de Y respostes»), perquè es vegi quan una xifra es recolza en poques preguntes. Per sota de {min} apareix com a «dades insuficients», mai com a 0: així tres coincidències perfectes no poden guanyar quinze respostes al 90 %. A més, calen almenys {minAnswers} respostes per donar un resultat: amb menys, qualsevol ordre seria soroll.",
    order:
      "L'ordre per defecte usa la mitjana de Programa i Fets quan totes dues tenen prou dades; si un partit no té historial al Congrés, només Programa, i el resultat ho diu. Les dues xifres es mostren sempre per separat. Els empats exactes es marquen com a empat.",
    consistency:
      "A cada fitxa de partit figura també la coincidència entre el seu programa i les seves votacions: 1 − la diferència mitjana |programa − fets| / {max}, sobre les preguntes que tenen les dues dades.",
  },
  directional: {
    h: "Per què es compta primer el costat",
    p1: "La fórmula habitual, acord = 1 − |resposta − posició| / {max}, premia qui no es mulla: un partit amb tot a 0 queda sempre a mitja distància de qualsevol. En una simulació amb usuaris sintètics, aquesta fórmula donava al partit del centre **el 72 % de les victòries** i relegava sistemàticament els partits dels extrems de tots dos costats, contestés el que contestés la gent. Per això es va descartar.",
    example: "Exemple: una persona respon +1 i −1 a dues preguntes, davant de tres partits ficticis.",
    thParty: "Partit",
    thPositions: "Posicions",
    thOld: "Fórmula descartada",
    thUsed: "Fórmula usada",
    contrast: ["Partit fictici «tot 0»", "Partit fictici «sempre +2»", "Partit fictici «+2, −2»"],
    p2: "Amb la fórmula descartada, el partit que no pren posició empata amb el que coincideix amb la persona en les dues preguntes. Amb la fórmula usada, coincidir en el costat és el que més compta, i la intensitat afina dins d'aquest costat.",
  },
  programmes: {
    h: "Programes del 2023 fins que es publiquin els del 2026",
    p: "Les eleccions del 29 de novembre es van convocar el 6 d'octubre de 2026 i els partits encara no han publicat els seus programes. Fins aleshores s'usen els **programes de les generals del 2023**, amb l'etiqueta visible «{label}» a cada cita. Quan es publiquin els nous, es revisaran les cel·les una per una i cada canvi quedarà al registre.",
  },
  notMeasured: {
    h: "El que aquest test no mesura",
    items: [
      "Votacions del Senat.",
      "Votacions dels parlaments autonòmics (llevat, quan s'indiqui, per a partits sense escó al Congrés).",
      "Decisions del Govern publicades al BOE sense votació al Congrés, per als partits que no eren al Govern.",
      "Partits sense escó al Congrés: no tenen historial de votacions i es comparen només pel programa.",
      "Assumptes fora de les preguntes del test, la gestió de govern o les persones candidates.",
    ],
  },
  tests: {
    h: "Proves de neutralitat",
    intro:
      "Aquestes comprovacions s'executen sobre el codi i sobre les dades. Són a [checks.ts](checks), [afinidad-score.test.ts](scoreTest) i [afinidad-dataset.test.ts](datasetTest), i qualsevol les pot executar amb {npmTest}.",
    items: [
      "Qui respon exactament el que diu un partit el té primer i amb almenys un {score} (no el 100 %: la xifra es corregeix cap al neutre amb poques respostes); si dos partits són indistingibles, s'avisa.",
      "Qui respon el contrari d'un partit el té l'últim.",
      "Canviar de signe totes les respostes i totes les posicions no canvia l'ordre: el motor tracta igual tots dos costats.",
      "Contestar el mateix a tot (sempre +2, sempre −1…) no produeix un guanyador clar: entre el primer i la mediana hi ha com a màxim {gap} punts.",
      "A cada pregunta hi ha almenys {n} partits a favor i {n} en contra.",
      "Cap partit no té totes les seves posicions del mateix signe.",
      "La cobertura de dades de cada bloc és a ±{tolerance} punts de la mitjana.",
      "El que està verificat té cita i enllaç; les cel·les pendents o sense posició no canvien el resultat.",
      "Dominància: amb {users} usuaris a l'atzar i {users} moderats sintètics, cap partit comparable no guanya en més del {maxShare} ni en menys del {minShare}. «Comparable» és el partit amb dada en almenys {lens} preguntes en alguna de les dues lents; el que no hi arriba no competeix (surt «dades insuficients» per a tothom) i el seu buit el mesura la prova de cobertura.",
      "Un partit amb 3 posicions coincidents no supera un que coincideix al 90 % en 15.",
    ],
    outro:
      "Si una d'aquestes proves falla amb les dades reals, no es corregeix tocant posicions: es revisa la redacció de la pregunta o es busca la font que falta.",
  },
  usage: {
    h: "Què registrem de l'ús",
    p: "Per saber si el test funciona comptem, a la nostra pròpia base de dades i sense serveis de tercers, uns quants esdeveniments: començar i acabar el test, obrir una font, compartir (i per quin canal), declarar o no el context opcional, prémer «Continua explorant», obrir «Van dir vs. van fer» i copiar l'enllaç d'una de les seves entrades (sense dir quina). Cada esdeveniment desa només el seu nom, l'idioma, la versió de les dades i l'hora en punt. **No desa les teves respostes, la teva comunitat, el teu vot habitual, cap partit ni el teu resultat**, ni IP, ni navegador, ni galetes o identificadors: no hi ha manera d'unir dos esdeveniments de la mateixa persona. Si el teu navegador envia «Global Privacy Control» o «Do Not Track», no es registra res. Els esdeveniments s'esborren al cap de 180 dies.",
  },
  loreg: {
    h: "Període de veda (LOREG, art. 69.7)",
    p: "Desem de manera anònima les respostes de qui ho accepta (sense correu, sense IP, amb la data truncada al dia). Entre el **24 i el 29 de novembre de 2026** no es publicarà cap agregat del tipus «quin partit guanya al test», en aplicació de l'article 69.7 de la Llei orgànica del règim electoral general. Fora d'aquest període, qualsevol dada agregada es publicarà només amb grups d'almenys 20 persones i avisant que no és una mostra representativa.",
  },
  version: {
    h: "Versió de les dades i correccions",
    current:
      "Versió actual: {version}. Cada canvi de dades o de mètode, amb la seva data i motiu, és al [registre de canvis](changelog). Els enllaços compartits porten la versió: si les dades canvien, el resultat es recalcula i s'avisa.",
    corrections:
      "Has trobat una dada mal codificada, una cita incompleta o una font caiguda? Escriu-nos a {email} indicant partit, pregunta i la font que ho demostra. Les correccions acceptades es publiquen al registre; les rebutjades, amb el motiu.",
  },
};

// Tradución automática pendente de revisión nativa.
const gl: MethodologyStrings = {
  metaDescription:
    "Quen fai o test, que partidos entran e por que, de onde saen as posicións, como se calcula a afinidade e como comprobalo.",
  intro:
    "Esta páxina explica de onde sae cada número do test e como comprobalo. As cifras que aparecen aquí lense do mesmo código que calcula o teu resultado.",
  schema: "esquema",
  who: {
    h: "Quen fai este test",
    p1: "Faino o **equipo de Libertarios.eu**, un sitio cunha liña editorial libertaria. Dicímolo aquí e no pé de cada páxina porque é o primeiro que convén saber dun test electoral, e porque descubrilo despois restaría máis confianza que dicilo agora. O proxecto non está afiliado a ningún partido.",
    p2: "Que o faga un equipo con opinións non obriga a fiarse del. O test está construído para poder comprobarse sen facelo:",
    items: [
      "cada posición de cada partido leva a súa fonte (cita literal do programa ou votación do Congreso), e están todas na páxina de [datos abertos](data) e nun [ficheiro JSON](json) descargable con licenza CC BY 4.0;",
      "o código que calcula o resultado e as probas de neutralidade son públicos no [repositorio](repo);",
      "a regra para decidir que partidos entran é a mesma para todos, incluído o P-LIB;",
      "as correccións rexístranse en público, con data e motivo.",
    ],
  },
  parties: {
    h: "Que partidos entran",
    intro: "Un partido entra se cumpre unha destas condicións, comprobable cunha fonte oficial:",
    conditions: [
      "ten escano no **Congreso da XV lexislatura**;",
      "é unha **coalición rexistrada para as xerais do 29 de novembro de 2026** que integra partidos do punto 1. Mentres non conste o seu rexistro aparece como «candidatura por confirmar», e o seu historial é o do grupo parlamentario do que procede, e así se di na súa ficha;",
      "é un partido sen escano no Congreso que ten **escano no Parlamento Europeo ou nalgún parlamento autonómico**, ou que obtivo **polo menos o 1 % dos votos** nas xerais de 2023.",
    ],
    plibRule:
      "**O Partido Libertario (P-LIB) sométese á mesma regra**: entra se a cumpre e non entra se non a cumpre, sen excepción por ser próximo a quen fai o test.",
    plibPending: "A decisión publicarase coa primeira versión dos datos, xunto coa súa fonte.",
    plibIncluded: "Nesta versión dos datos está incluído por este motivo: {reason}",
    plibExcluded: "Cos datos desta versión non cumpre ningunha das tres condicións e non aparece no test.",
    noSeat:
      "Os partidos sen escano no Congreso non teñen votacións que medir: compáranse só polo programa, e o resultado indícao. Os partidos que se presentan nunha soa comunidade aparecen se indicas esa comunidade ao comezar, ou con «ver todos».",
    bloc: "Cada partido ten asignado un bloque (esquerda, dereita, nacionalista ou outro) que só serve para a tarxeta «a túa sorpresa»: non intervén en ningunha porcentaxe. O bloque de cada partido figura na súa ficha e no JSON.",
  },
  layers: {
    h: "Tres capas de información",
    programmeTitle: "1. Programa",
    programmeBody:
      "O que o partido promete no seu programa electoral oficial. Cita literal de ata {maxQuote} palabras, con documento e páxina. **Puntúa** na barra «Programa».",
    factsTitle: "2. Feitos: votacións no Congreso",
    factsBody:
      "O que votou o seu grupo (ou os seus deputados) na votación do Congreso ligada a cada pregunta, con ligazón aos datos abertos de congreso.es. **Puntúa** na barra «Feitos».",
    hemerotecaTitle: "3. Hemeroteca",
    hemerotecaBody:
      "O que dixeron os seus voceiros, preferentemente no Diario de Sesións do debate desa votación. Cita literal de ata {maxWords} palabras con data e fonte. **Non puntúa**: amósase xunto ao que votaron.",
    separate:
      "Programa e Feitos calcúlanse e amósanse **por separado**. Se un partido promete unha cousa e vota outra, vese como dúas barras distintas, en vez de quedar agochado nunha media.",
  },
  dvh: {
    h: "Dixeron vs. fixeron: criterios",
    p1: "Ademais das tres capas, o test recolle compromisos públicos de cada partido e o que fixo despois. Cada entrada ten dúas partes: **o que dixeron** (quen, cando, cita literal de ata {maxWords} palabras e a súa fonte) e **o que fixeron** (data, descrición do feito sen adxectivos e polo menos unha proba ligada: votación do Congreso co mesmo patrón de URL que os Feitos, referencia do BOE, outra votación parlamentaria, a ficha oficial dunha iniciativa co seu estado ou un dato estatístico oficial —INE, ministerios, Tribunal de Contas, AIReF— co seu organismo, data e valor; este último só existe aquí e nunca puntúa). O esquema rexeita unha entrada se o feito é anterior á cita.",
    verdicts:
      "A etiqueta ten catro valores: **cumpre** (fixeron o que dixeron), **contradí** (fixeron o contrario), **parcial** (unha parte; o esquema esixe unha nota que diga cal) e **non o fixeron** (podían facelo e non ocorreu; o esquema esixe unha nota que diga por que podían). Esta última existe porque, sen ela, só contarían como incumprimento os actos contrarios, e iso pesaría máis sobre quen goberna que sobre quen promete e non executa; por iso só se aplica a quen tiña o poder de facelo. As catro amósanse co mesmo estilo, sen cores de aprobado ou suspenso, e xunto a cada partido amósase sempre a reconta das catro, para que se vexa que se seleccionou. Agora mesmo hai {total} entradas ({cumple} cumpre, {contradice} contradí, {parcial} parcial, {noHecho} non o fixeron).",
    sources:
      "**Independencia da fonte** (regra do 2026-10-07, a mesma para todos os partidos que gobernaron: PSOE, PP, Unidas Podemos e Sumar). Cada dato oficial leva unha etiqueta que di quen o mide: **fonte independente** (AIReF, Tribunal de Contas, Banco de España, Eurostat, OCDE, Comisión Europea ou Consello da UE, FMI, tribunais, avaliacións oficiais de universidades), **estatística oficial** (INE, series da IGAE, estatísticas da Seguridade Social ou dun ministerio con metodoloxía publicada —non as súas notas de prensa—, texto consolidado do BOE, créditos dunha lei de orzamentos) ou **dato do propio Goberno** (notas de prensa, páxinas web dun ministerio, preámbulos de decretos, informes da Moncloa, autoavaliacións). Un goberno non se avalía a si mesmo: un «cumpre» necesita polo menos un dato independente ou de estatística oficial. Se só hai cifras do propio Goberno, a etiqueta máxima é «parcial» e a nota dio («só hai datos do propio Goberno»). As cifras do Goberno non se agochan: amósanse coa súa etiqueta. O esquema compróbao por máquina.",
    said: "**Que conta como «o que dixeron».** Só un compromiso real: o programa electoral, a campaña, un discurso de investidura, un acordo de coalición ou de investidura, ou unha promesa explícita sobre o que o partido fará. Nunca unha intervención no mesmo debate da votación coa que se compara: iso é anunciar o voto, non comprometerse. Non hai un prazo mínimo entre o dito e o feito: unha promesa de investidura incumprida once días despois conta (corrección do 2026-10-06, ver AFINIDAD-REVISION.md).",
    counts:
      "**As recontas non son comparables entre partidos.** Quen goberna ten máis ocasións de cumprir ou incumprir, así que xunto a cada reconta dise se o partido gobernou no Estado e cando. A páxina da sección publica, partido a partido, que se buscou e que se descartou co seu motivo («Que buscamos e por que non entrou»). Oco coñecido: os compromisos dos gobernos autonómicos (Generalitat, Goberno Vasco, Canarias…) aínda non se investigaron.",
    seeAll: "[Ver todas as entradas](all).",
  },
  coding: {
    h: "Como se codifica cada posición",
    p1: "Resumo das regras; o texto completo está en [AFINIDAD-DATOS.md](rules). A regra que está por riba de todas: **sen fonte que calquera poida abrir non hai posición**. Un oco amósase como oco; nunca se enche co que «se deduce» da ideoloxía dun partido nin co que vota o seu socio.",
    scaleIntro:
      "Cada posición vai de −2 a +2 respecto ao enunciado da pregunta (non respecto a esquerda ou dereita):",
    thValue: "Valor",
    thMeaning: "Significado",
    scale: [
      "A favor do que di o enunciado, sen condicións.",
      "A favor con condicións, matices ou de forma parcial.",
      "Posición intermedia expresa: abstención na votación ou texto que se declara ambivalente. Non é «non o menciona».",
      "En contra con condicións, matices ou de forma parcial.",
      "En contra, sen condicións.",
    ],
    rules: [
      "**Programa**: só o programa electoral oficial. A prensa, as entrevistas ou a Wikipedia non serven como fonte de posición. Se o programa non trata o asunto, a cela é «sen posición» e non puntúa.",
      "**Votacións**: votar no sentido do enunciado é +2, en contra −2, abstención 0 (puntúa, porque é unha posición expresada no pleno). **Non votar non é unha posición**: unha ausencia non puntúa.",
      "Se o partido votou dividido conta a maioría; se esa maioría non chega a dous terzos, a posición achégase un punto a 0. Con varias votacións en sentidos distintos úsase ±1 e explícase na nota.",
      "Partidos sen grupo propio (no Grupo Mixto): o seu voto atribúese deputado a deputado, con fonte para cada atribución e respectando os cambios de grupo.",
      "Medidas aprobadas polo Goberno sen votación (real decreto ou acordo publicado no BOE) contan só para os partidos que estaban no Goberno nesa data.",
      "**Revisión cega**: unha segunda persoa ou axente codifica a mesma cita sen ver a primeira posición. Se difiren en máis dun punto, a cela márcase «codificación discrepante», puntúa coa media das dúas e amósase marcada.",
      "As celas «pendente» (fonte aínda non atopada) e «sen posición» **non puntúan nunca** e vense como oco, non como 0.",
    ],
  },
  calc: {
    h: "Como se calcula a túa afinidade",
    answers:
      "Respondes a cada afirmación en catro puntos (moi en contra −2, en contra −1, a favor +1, moi a favor +2) ou sáltala con «Non sei». Non hai punto medio: así un salto non se pode confundir cunha resposta morna. As preguntas saltadas non contan.",
    perQuestion: "Para cada pregunta, o acordo cun partido vai de 0 a 1:",
    same: "se a túa resposta e a posición do partido teñen **o mesmo signo**: acordo = 1 − |a túa resposta − posición| / {den} (entre {min} e 1);",
    opposite: "se teñen **signo contrario**: acordo = {value};",
    neutral: "se o partido ten un 0 expreso (abstención ou ambivalencia): acordo = {value}.",
    weighted:
      "A afinidade é a media deses acordos, ponderada: as preguntas que marcas con «Isto impórtame» pesan **×{weight}**, o resto ×1.",
    exampleTitle: "Exemplo cun partido ficticio",
    thAnswer: "A túa resposta",
    thParty: "Partido",
    thAgreement: "Acordo",
    thWeight: "Peso",
    question: "Pregunta {n}",
    important: "(impórtame)",
    formula: "Afinidade = ({terms} + {k} × {prior}) / ({weights} + {k}) = {score}.",
    shrink:
      "**Poucas respostas, cifra prudente.** Á media súmanselle sempre {kStrong} respostas «neutras» con acordo {prior}: afinidade = (Σ peso × acordo + {k} × {prior}) / (Σ peso + {k}). Con moitas respostas apenas cambia nada; con poucas, a cifra achégase ao {priorPct}. Por exemplo, **5 de 5 coincidencias non é un 100 %**: é ({min} + {k} × {prior}) / ({min} + {k}) = {five}, mentres que 15 de 15 é un {fifteen}. Cinco acertos poden saír por azar con máis facilidade ca quince, e sen esta corrección os partidos dos que sabemos pouco gañaban máis a miúdo só por iso. A cifra que ves xa é a corrixida: é a estimación honesta cos datos que hai.",
    coverage:
      "**Cobertura**: para que un partido apareza con porcentaxe nunha lente (programa ou votos), debe ter posición verificada en polo menos {coverage} das preguntas que respondiches, sexa cal sexa a porcentaxe que iso supoña. Xunto a cada barra dise sempre en cantas se basea («baseado en X de Y respostas»), para que se vexa cando unha cifra descansa en poucas preguntas. Por debaixo de {min} aparece como «datos insuficientes», nunca como 0: así tres coincidencias perfectas non poden gañar a quince respostas ao 90 %. Ademais fan falta polo menos {minAnswers} respostas para dar un resultado: con menos, calquera orde sería ruído.",
    order:
      "A orde por defecto usa a media de Programa e Feitos cando ambas teñen datos suficientes; se un partido non ten historial no Congreso, só Programa, e o resultado dío. As dúas cifras amósanse sempre por separado. Os empates exactos márcanse como empate.",
    consistency:
      "En cada ficha de partido figura tamén a coincidencia entre o seu programa e as súas votacións: 1 − a diferenza media |programa − feitos| / {max}, sobre as preguntas que teñen os dous datos.",
  },
  directional: {
    h: "Por que se conta primeiro o lado",
    p1: "A fórmula habitual, acordo = 1 − |resposta − posición| / {max}, premia a quen non se molla: un partido con todo a 0 queda sempre a media distancia de calquera. Nunha simulación con usuarios sintéticos, esa fórmula daba ao partido do centro **o 72 % das vitorias** e relegaba sistematicamente os partidos dos extremos de ambos os lados, contestase o que contestase a xente. Por iso descartouse.",
    example: "Exemplo: unha persoa responde +1 e −1 a dúas preguntas, fronte a tres partidos ficticios.",
    thParty: "Partido",
    thPositions: "Posicións",
    thOld: "Fórmula descartada",
    thUsed: "Fórmula usada",
    contrast: ["Partido ficticio «todo 0»", "Partido ficticio «sempre +2»", "Partido ficticio «+2, −2»"],
    p2: "Coa fórmula descartada, o partido que non toma posición empata co que coincide coa persoa nas dúas preguntas. Coa fórmula usada, coincidir no lado é o que máis conta, e a intensidade afina dentro dese lado.",
  },
  programmes: {
    h: "Programas de 2023 ata que se publiquen os de 2026",
    p: "As eleccións do 29 de novembro convocáronse o 6 de outubro de 2026 e os partidos aínda non publicaron os seus programas. Ata entón úsanse os **programas das xerais de 2023**, coa etiqueta visible «{label}» en cada cita. Cando se publiquen os novos, revisaranse as celas unha a unha e cada cambio quedará no rexistro.",
  },
  notMeasured: {
    h: "O que este test non mide",
    items: [
      "Votacións do Senado.",
      "Votacións dos parlamentos autonómicos (agás, cando se indique, para partidos sen escano no Congreso).",
      "Decisións do Goberno publicadas no BOE sen votación no Congreso, para os partidos que non estaban no Goberno.",
      "Partidos sen escano no Congreso: non teñen historial de votacións e compáranse só polo programa.",
      "Asuntos fóra das preguntas do test, a xestión de goberno ou as persoas candidatas.",
    ],
  },
  tests: {
    h: "Probas de neutralidade",
    intro:
      "Estas comprobacións execútanse sobre o código e sobre os datos. Están en [checks.ts](checks), [afinidad-score.test.ts](scoreTest) e [afinidad-dataset.test.ts](datasetTest), e calquera pode executalas con {npmTest}.",
    items: [
      "Quen responde exactamente o que di un partido teno primeiro e con polo menos un {score} (non o 100 %: a cifra corríxese cara ao neutro con poucas respostas); se dous partidos son indistinguibles, avísase.",
      "Quen responde o contrario dun partido teno o último.",
      "Cambiar de signo todas as respostas e todas as posicións non cambia a orde: o motor trata igual os dous lados.",
      "Contestar o mesmo a todo (sempre +2, sempre −1…) non produce un gañador claro: entre o primeiro e a mediana hai como moito {gap} puntos.",
      "En cada pregunta hai polo menos {n} partidos a favor e {n} en contra.",
      "Ningún partido ten todas as súas posicións do mesmo signo.",
      "A cobertura de datos de cada bloque está a ±{tolerance} puntos da media.",
      "O verificado ten cita e ligazón; as celas pendentes ou sen posición non cambian o resultado.",
      "Dominancia: con {users} usuarios ao chou e {users} moderados sintéticos, ningún partido comparable gaña a máis do {maxShare} nin a menos do {minShare}. «Comparable» é o partido con dato en polo menos {lens} preguntas nalgunha das dúas lentes; o que non chega non compite (sae «datos insuficientes» para todo o mundo) e o seu oco mídeo a proba de cobertura.",
      "Un partido con 3 posicións coincidentes non supera a un que coincide ao 90 % en 15.",
    ],
    outro:
      "Se unha destas probas falla cos datos reais, non se corrixe tocando posicións: revísase a redacción da pregunta ou búscase a fonte que falta.",
  },
  usage: {
    h: "Que rexistramos do uso",
    p: "Para saber se o test funciona contamos, na nosa propia base de datos e sen servizos de terceiros, uns poucos eventos: comezar e rematar o test, abrir unha fonte, compartir (e por que canle), declarar ou non o contexto opcional, premer «Segue explorando», abrir «Dixeron vs. fixeron» e copiar a ligazón dunha das súas entradas (sen dicir cal). Cada evento garda só o seu nome, o idioma, a versión dos datos e a hora en punto. **Non garda as túas respostas, a túa comunidade, o teu voto habitual, ningún partido nin o teu resultado**, nin IP, nin navegador, nin cookies ou identificadores: non hai forma de unir dous eventos da mesma persoa. Se o teu navegador envía «Global Privacy Control» ou «Do Not Track», non se rexistra nada. Os eventos bórranse aos 180 días.",
  },
  loreg: {
    h: "Período de veda (LOREG, art. 69.7)",
    p: "Gardamos de forma anónima as respostas de quen o acepta (sen correo, sen IP, coa data truncada ao día). Entre o **24 e o 29 de novembro de 2026** non se publicará ningún agregado do tipo «que partido gaña no test», en aplicación do artigo 69.7 da Lei orgánica do réxime electoral xeral. Fóra dese período, calquera dato agregado publicarase só con grupos de polo menos 20 persoas e avisando de que non é unha mostra representativa.",
  },
  version: {
    h: "Versión dos datos e correccións",
    current:
      "Versión actual: {version}. Cada cambio de datos ou de método, coa súa data e motivo, está no [rexistro de cambios](changelog). As ligazóns compartidas levan a versión: se os datos cambian, o resultado recalcúlase e avísase.",
    corrections:
      "Atopaches un dato mal codificado, unha cita incompleta ou unha fonte caída? Escríbenos a {email} indicando partido, pregunta e a fonte que o demostra. As correccións aceptadas publícanse no rexistro; as rexeitadas, co motivo.",
  },
};

// Itzulpen automatikoa, jatorrizko hiztunek berrikusteko zain.
const eu: MethodologyStrings = {
  metaDescription:
    "Nork egiten duen testa, zein alderdi sartzen diren eta zergatik, nondik ateratzen diren jarrerak, nola kalkulatzen den afinitatea eta nola egiaztatu.",
  intro:
    "Orri honek azaltzen du nondik ateratzen den testeko zenbaki bakoitza eta nola egiaztatu. Hemen agertzen diren zifrak zure emaitza kalkulatzen duen kode beretik irakurtzen dira.",
  schema: "eskema",
  who: {
    h: "Nork egiten du test hau",
    p1: "**Libertarios.eu-ko taldeak** egiten du, ildo editorial libertarioa duen gune batek. Hemen eta orri bakoitzaren oinean esaten dugu, hauteskunde-test bati buruz jakin beharreko lehen gauza delako, eta geroago jakiteak orain esateak baino konfiantza gehiago kenduko lukeelako. Proiektua ez dago inongo alderdiri afiliatuta.",
    p2: "Iritziak dituen talde batek egiteak ez du behartzen hartaz fidatzera. Testa fidatu gabe egiaztatu ahal izateko eraiki da:",
    items: [
      "alderdi bakoitzaren jarrera bakoitzak bere iturria du (programaren aipamen literala edo Kongresuko bozketa), eta guztiak daude [datu irekien](data) orrian eta CC BY 4.0 lizentziadun [JSON fitxategi](json) deskargagarri batean;",
      "emaitza kalkulatzen duen kodea eta neutraltasun-probak publikoak dira [biltegian](repo);",
      "zein alderdi sartzen diren erabakitzeko araua bera da guztientzat, P-LIB barne;",
      "zuzenketak publikoki erregistratzen dira, data eta arrazoiarekin.",
    ],
  },
  parties: {
    h: "Zein alderdi sartzen dira",
    intro: "Alderdi bat sartzen da baldintza hauetako bat betetzen badu, iturri ofizial batekin egiazta daitekeena:",
    conditions: [
      "eserlekua du **XV. legealdiko Kongresuan**;",
      "**2026ko azaroaren 29ko hauteskunde orokorretarako erregistratutako koalizioa** da, eta 1. puntuko alderdiak biltzen ditu. Erregistroa jasota ez dagoen bitartean «berresteko dagoen hautagaitza» gisa agertzen da, eta bere historiala datorren talde parlamentarioarena da, eta hala adierazten da bere fitxan;",
      "Kongresuan eserlekurik ez duen alderdia da, baina **eserlekua du Europako Parlamentuan edo autonomia-erkidegoren bateko parlamentuan**, edo **botoen % 1 gutxienez** lortu zuen 2023ko hauteskunde orokorretan.",
    ],
    plibRule:
      "**Partido Libertario (P-LIB) ere arau berberaren mende dago**: betetzen badu sartzen da, eta betetzen ez badu ez da sartzen, testa egiten duenarengandik hurbil egoteagatik salbuespenik gabe.",
    plibPending: "Erabakia datuen lehen bertsioarekin argitaratuko da, bere iturriarekin batera.",
    plibIncluded: "Datuen bertsio honetan sartuta dago arrazoi honengatik: {reason}",
    plibExcluded:
      "Bertsio honetako datuekin ez du hiru baldintzetako bat ere betetzen, eta ez da testean agertzen.",
    noSeat:
      "Kongresuan eserlekurik ez duten alderdiek ez dute neurtzeko bozketarik: programaren arabera soilik alderatzen dira, eta emaitzak hala adierazten du. Erkidego bakar batean aurkezten diren alderdiak agertzen dira hastean erkidego hori adierazten baduzu, edo «guztiak ikusi» aukerarekin.",
    bloc: "Alderdi bakoitzari bloke bat esleitzen zaio (ezkerra, eskuina, nazionalista edo beste bat), eta «zure ustekabea» txartelerako baino ez du balio: ez du inongo ehunekotan eraginik. Alderdi bakoitzaren blokea bere fitxan eta JSONean ageri da.",
  },
  layers: {
    h: "Hiru informazio-geruza",
    programmeTitle: "1. Programa",
    programmeBody:
      "Alderdiak bere hauteskunde-programa ofizialean agintzen duena. Gehienez {maxQuote} hitzeko aipamen literala, dokumentuarekin eta orrialdearekin. «Programa» barran **puntuatzen du**.",
    factsTitle: "2. Egitateak: Kongresuko bozketak",
    factsBody:
      "Bere taldeak (edo bere diputatuek) galdera bakoitzari lotutako Kongresuko bozketan bozkatu zuena, congreso.es-eko datu irekietarako estekarekin. «Egitateak» barran **puntuatzen du**.",
    hemerotecaTitle: "3. Hemeroteka",
    hemerotecaBody:
      "Bere bozeramaileek esan zutena, ahal dela bozketa horren eztabaidako Bilkuren Egunkarian. Gehienez {maxWords} hitzeko aipamen literala, datarekin eta iturriarekin. **Ez du puntuatzen**: bozkatu zutenaren ondoan erakusten da.",
    separate:
      "Programa eta Egitateak **bereizita** kalkulatzen eta erakusten dira. Alderdi batek gauza bat agintzen badu eta beste bat bozkatzen badu, bi barra desberdin gisa ikusten da, batez besteko batean ezkutatuta geratu beharrean.",
  },
  dvh: {
    h: "Esan zutena eta egin zutena: irizpideak",
    p1: "Hiru geruzez gain, testak alderdi bakoitzaren konpromiso publikoak eta gero egin zuena jasotzen ditu. Sarrera bakoitzak bi zati ditu: **esan zutena** (nork, noiz, gehienez {maxWords} hitzeko aipamen literala eta haren iturria) eta **egin zutena** (data, egitatearen deskribapena adjektiborik gabe eta gutxienez estekatutako froga bat: Kongresuko bozketa, Egitateen URL eredu berarekin; BOEko erreferentzia; beste bozketa parlamentario bat; ekimen baten fitxa ofiziala bere egoerarekin; edo datu estatistiko ofizial bat —INE, ministerioak, Kontuen Auzitegia, AIReF— bere erakundearekin, datarekin eta balioarekin; azken hori hemen bakarrik dago eta ez du inoiz puntuatzen). Eskemak sarrera bat baztertzen du egitatea aipamena baino lehenagokoa bada.",
    verdicts:
      "Etiketak lau balio ditu: **betetzen du** (esan zutena egin zuten), **kontraesaten du** (kontrakoa egin zuten), **partziala** (zati bat; eskemak zein zati den esaten duen oharra eskatzen du) eta **ez zuten egin** (egin zezaketen eta ez zen gertatu; eskemak zergatik zezaketen esaten duen oharra eskatzen du). Azken hori badago, hura gabe kontrako ekintzak bakarrik zenbatuko liratekeelako ez-betetzetzat, eta horrek gehiago pisatuko lukeelako gobernatzen duenaren gainean agindu eta gauzatzen ez duenaren gainean baino; horregatik, hori egiteko ahalmena zuenari bakarrik aplikatzen zaio. Laurak estilo berarekin erakusten dira, gainditu edo suspentsoko kolorerik gabe, eta alderdi bakoitzaren ondoan beti erakusten da lauren zenbaketa, zer hautatu den ikus dadin. Une honetan {total} sarrera daude ({cumple} betetzen du, {contradice} kontraesaten du, {parcial} partziala, {noHecho} ez zuten egin).",
    sources:
      "**Iturriaren independentzia** (2026-10-07ko araua, berdina gobernatu duten alderdi guztientzat: PSOE, PP, Unidas Podemos eta Sumar). Datu ofizial bakoitzak nork neurtzen duen dioen etiketa bat darama: **iturri independentea** (AIReF, Kontuen Auzitegia, Espainiako Bankua, Eurostat, OCDE, Europako Batzordea edo EBko Kontseilua, NDF, auzitegiak, unibertsitateen ebaluazio ofizialak), **estatistika ofiziala** (INE, IGAEren serieak, Gizarte Segurantzaren edo ministerio baten estatistikak metodologia argitaratuarekin —ez haren prentsa-oharrak—, BOEko testu bateratua, aurrekontu-lege baten kredituak) edo **Gobernuaren beraren datua** (prentsa-oharrak, ministerio baten webguneak, dekretuen hitzaurreak, Moncloaren txostenak, autoebaluazioak). Gobernu batek ez du bere burua ebaluatzen: «betetzen du» batek gutxienez datu independente bat edo estatistika ofizialeko bat behar du. Gobernuaren beraren zifrak baino ez badaude, etiketa gorena «partziala» da, eta oharrak hala dio («Gobernuaren beraren datuak baino ez daude»). Gobernuaren zifrak ez dira ezkutatzen: beren etiketarekin erakusten dira. Eskemak makinaz egiaztatzen du.",
    said: "**Zer hartzen den «esan zutena» gisa.** Benetako konpromiso bat bakarrik: hauteskunde-programa, kanpaina, inbestidura-hitzaldi bat, koalizio- edo inbestidura-akordio bat, edo alderdiak egingo duenari buruzko promesa esplizitu bat. Inoiz ez alderatzen den bozketaren eztabaida bereko esku-hartze bat: hori botoa iragartzea da, ez konpromisoa hartzea. Ez dago gutxieneko eperik esandakoaren eta egindakoaren artean: hamaika egun geroago bete gabe geratutako inbestidura-promesa bat ere zenbatzen da (2026-10-06ko zuzenketa, ikus AFINIDAD-REVISION.md).",
    counts:
      "**Zenbaketak ez dira alderdien artean alderagarriak.** Gobernatzen duenak aukera gehiago ditu betetzeko edo ez betetzeko; beraz, zenbaketa bakoitzaren ondoan esaten da alderdiak Estatuan gobernatu duen eta noiz. Atalaren orriak argitaratzen du, alderdiz alderdi, zer bilatu zen eta zer baztertu zen, arrazoiarekin («Zer bilatu genuen eta zergatik ez zen sartu»). Hutsune ezaguna: autonomia-erkidegoetako gobernuen konpromisoak (Generalitat, Eusko Jaurlaritza, Kanariak…) oraindik ez dira ikertu.",
    seeAll: "[Sarrera guztiak ikusi](all).",
  },
  coding: {
    h: "Nola kodetzen den jarrera bakoitza",
    p1: "Arauen laburpena; testu osoa [AFINIDAD-DATOS.md](rules) fitxategian dago. Guztien gainetik dagoen araua: **edonork ireki dezakeen iturririk gabe ez dago jarrerarik**. Hutsune bat hutsune gisa erakusten da; ez da inoiz betetzen alderdi baten ideologiatik «ondorioztatzen» denarekin, ezta haren bazkideak bozkatzen duenarekin ere.",
    scaleIntro:
      "Jarrera bakoitza −2tik +2ra doa galderaren enuntziatuari dagokionez (ez ezkerrari edo eskuinari dagokionez):",
    thValue: "Balioa",
    thMeaning: "Esanahia",
    scale: [
      "Enuntziatuak dioenaren alde, baldintzarik gabe.",
      "Alde, baldintzekin, ñabardurekin edo partzialki.",
      "Tarteko jarrera adierazia: bozketan abstentzioa edo anbibalentetzat jotzen den testua. Ez da «ez du aipatzen».",
      "Aurka, baldintzekin, ñabardurekin edo partzialki.",
      "Aurka, baldintzarik gabe.",
    ],
    rules: [
      "**Programa**: hauteskunde-programa ofiziala bakarrik. Prentsak, elkarrizketek edo Wikipediak ez dute balio jarreraren iturri gisa. Programak gaia jorratzen ez badu, gelaxka «jarrerarik gabe» da eta ez du puntuatzen.",
      "**Bozketak**: enuntziatuaren norabidean bozkatzea +2 da, aurka −2, abstentzioa 0 (puntuatzen du, osoko bilkuran adierazitako jarrera delako). **Ez bozkatzea ez da jarrera bat**: ez egoteak ez du puntuatzen.",
      "Alderdiak zatituta bozkatu bazuen, gehiengoa zenbatzen da; gehiengo horrek bi herenera iristen ez bada, jarrera puntu bat hurbiltzen da 0ra. Norabide desberdinetako hainbat bozketa badaude, ±1 erabiltzen da eta oharrean azaltzen da.",
      "Talde propiorik gabeko alderdiak (Talde Mistoan): haien botoa diputatuz diputatu esleitzen da, esleipen bakoitzerako iturriarekin eta talde-aldaketak errespetatuz.",
      "Gobernuak bozketarik gabe onartutako neurriak (errege-dekretua edo BOEn argitaratutako akordioa) data horretan Gobernuan zeuden alderdientzat bakarrik zenbatzen dira.",
      "**Berrikuspen itsua**: bigarren pertsona edo agente batek aipamen bera kodetzen du lehen jarrera ikusi gabe. Puntu batean baino gehiagoan desberdintzen badira, gelaxka «kodeketa desberdina» gisa markatzen da, bien batez bestekoarekin puntuatzen du eta markatuta erakusten da.",
      "«Zain» dauden gelaxkek (iturria oraindik aurkitu gabe) eta «jarrerarik gabe» daudenek **ez dute inoiz puntuatzen**, eta hutsune gisa ikusten dira, ez 0 gisa.",
    ],
  },
  calc: {
    h: "Nola kalkulatzen den zure afinitatea",
    answers:
      "Baieztapen bakoitzari lau mailatan erantzuten diozu (erabat aurka −2, aurka −1, alde +1, erabat alde +2) edo «Ez dakit» aukerarekin saltatzen duzu. Ez dago erdiko mailarik: horrela, saltatze bat ezin da erantzun epel batekin nahastu. Saltatutako galderak ez dira zenbatzen.",
    perQuestion: "Galdera bakoitzean, alderdi batekiko adostasuna 0tik 1era doa:",
    same: "zure erantzunak eta alderdiaren jarrerak **zeinu bera** badute: adostasuna = 1 − |zure erantzuna − jarrera| / {den} ({min} eta 1 artean);",
    opposite: "**kontrako zeinua** badute: adostasuna = {value};",
    neutral: "alderdiak 0 adierazia badu (abstentzioa edo anbibalentzia): adostasuna = {value}.",
    weighted:
      "Afinitatea adostasun horien batez besteko haztatua da: «Hau garrantzitsua da niretzat» markatzen dituzun galderek **×{weight}** pisatzen dute, gainerakoek ×1.",
    exampleTitle: "Adibidea alderdi fikziozko batekin",
    thAnswer: "Zure erantzuna",
    thParty: "Alderdia",
    thAgreement: "Adostasuna",
    thWeight: "Pisua",
    question: "{n}. galdera",
    important: "(garrantzitsua)",
    formula: "Afinitatea = ({terms} + {k} × {prior}) / ({weights} + {k}) = {score}.",
    shrink:
      "**Erantzun gutxi, zifra zuhurra.** Batez bestekoari beti gehitzen zaizkio {kStrong} erantzun «neutro», {prior} adostasunarekin: afinitatea = (Σ pisua × adostasuna + {k} × {prior}) / (Σ pisua + {k}). Erantzun askorekin ia ez da ezer aldatzen; gutxirekin, zifra {priorPct} baliorantz hurbiltzen da. Adibidez, **5etik 5 bat etortzea ez da % 100**: ({min} + {k} × {prior}) / ({min} + {k}) = {five} da, eta 15etik 15, berriz, {fifteen}. Bost asmatze errazago atera daitezke zoriz hamabost baino, eta zuzenketa hori gabe gutxi dakigun alderdiek maizago irabazten zuten horregatik bakarrik. Ikusten duzun zifra zuzendua da jada: dauden datuekin egin daitekeen estimazio zintzoa da.",
    coverage:
      "**Estaldura**: alderdi bat lente batean (programa edo botoak) ehunekoarekin ager dadin, erantzun dituzun galderetatik gutxienez {coverage} galderatan egiaztatutako jarrera izan behar du, horrek dakarren ehunekoa edozein dela ere. Barra bakoitzaren ondoan beti esaten da zenbatetan oinarritzen den («Y erantzunetatik Xetan oinarritua»), zifra bat galdera gutxitan oinarritzen denean ikus dadin. {min} galdera baino gutxiagorekin «datu nahikorik ez» gisa agertzen da, inoiz ez 0 gisa: horrela, hiru bat-etortze perfektuk ezin diote irabazi % 90ean bat datozen hamabost erantzuni. Gainera, gutxienez {minAnswers} erantzun behar dira emaitza bat emateko: gutxiagorekin, edozein ordena zarata litzateke.",
    order:
      "Lehenetsitako ordenak Programaren eta Egitateen batez bestekoa erabiltzen du biek datu nahikoa dutenean; alderdi batek Kongresuan historialik ez badu, Programa bakarrik, eta emaitzak hala dio. Bi zifrak beti bereizita erakusten dira. Berdinketa zehatzak berdinketa gisa markatzen dira.",
    consistency:
      "Alderdi bakoitzaren fitxan bere programaren eta bere bozketen arteko bat-etortzea ere ageri da: 1 − |programa − egitateak| batez besteko aldea / {max}, bi datuak dituzten galderen gainean.",
  },
  directional: {
    h: "Zergatik zenbatzen den lehenik aldea",
    p1: "Ohiko formulak, adostasuna = 1 − |erantzuna − jarrera| / {max}, saritu egiten du bustitzen ez dena: dena 0n duen alderdia beti dago edonorengandik erdiko distantzian. Erabiltzaile sintetikoekin egindako simulazio batean, formula horrek erdiko alderdiari ematen zion **garaipenen % 72** eta sistematikoki baztertzen zituen bi aldeetako muturretako alderdiak, jendeak edozer erantzunda ere. Horregatik baztertu zen.",
    example: "Adibidea: pertsona batek +1 eta −1 erantzuten die bi galderei, hiru alderdi fikziozkoren aurrean.",
    thParty: "Alderdia",
    thPositions: "Jarrerak",
    thOld: "Baztertutako formula",
    thUsed: "Erabilitako formula",
    contrast: [
      "Alderdi fikziozkoa «dena 0»",
      "Alderdi fikziozkoa «beti +2»",
      "Alderdi fikziozkoa «+2, −2»",
    ],
    p2: "Baztertutako formularekin, jarrerarik hartzen ez duen alderdiak berdinketa egiten du bi galderetan pertsonarekin bat datorrenarekin. Erabilitako formularekin, aldean bat etortzea da gehien zenbatzen duena, eta intentsitateak alde horren barruan doitzen du.",
  },
  programmes: {
    h: "2023ko programak, 2026koak argitaratu arte",
    p: "Azaroaren 29ko hauteskundeak 2026ko urriaren 6an deitu ziren, eta alderdiek oraindik ez dituzte beren programak argitaratu. Ordura arte **2023ko hauteskunde orokorretako programak** erabiltzen dira, aipamen bakoitzean «{label}» etiketa ikusgai dutela. Berriak argitaratzen direnean, gelaxkak banan-banan berrikusiko dira eta aldaketa bakoitza erregistroan geratuko da.",
  },
  notMeasured: {
    h: "Test honek neurtzen ez duena",
    items: [
      "Senatuko bozketak.",
      "Autonomia-erkidegoetako parlamentuetako bozketak (Kongresuan eserlekurik ez duten alderdientzat, hala adierazten denean izan ezik).",
      "Gobernuak BOEn argitaratutako erabakiak, Kongresuan bozkatu gabeak, Gobernuan ez zeuden alderdientzat.",
      "Kongresuan eserlekurik ez duten alderdiak: ez dute bozketa-historialik, eta programaren arabera soilik alderatzen dira.",
      "Testeko galderetatik kanpoko gaiak, gobernu-kudeaketa edo hautagaiak.",
    ],
  },
  tests: {
    h: "Neutraltasun-probak",
    intro:
      "Egiaztapen hauek kodearen eta datuen gainean exekutatzen dira. Hemen daude: [checks.ts](checks), [afinidad-score.test.ts](scoreTest) eta [afinidad-dataset.test.ts](datasetTest), eta edonork exekuta ditzake {npmTest} erabiliz.",
    items: [
      "Alderdi batek dioena zehatz-mehatz erantzuten duenak lehenengo du alderdi hori, gutxienez {score} lortuta (ez % 100: zifra neutrorantz zuzentzen da erantzun gutxirekin); bi alderdi bereizezinak badira, ohartarazi egiten da.",
      "Alderdi baten kontrakoa erantzuten duenak azkena du alderdi hori.",
      "Erantzun guztien eta jarrera guztien zeinua aldatzeak ez du ordena aldatzen: motorrak berdin tratatzen ditu bi aldeak.",
      "Guztiari gauza bera erantzuteak (beti +2, beti −1…) ez du irabazle argirik sortzen: lehenengoaren eta medianaren artean gehienez {gap} puntu daude.",
      "Galdera bakoitzean gutxienez {n} alderdi daude alde eta {n} aurka.",
      "Ez dago jarrera guztiak zeinu berekoak dituen alderdirik.",
      "Bloke bakoitzaren datu-estaldura batez bestekotik ±{tolerance} puntura dago.",
      "Egiaztatutakoak aipamena eta esteka ditu; zain dauden edo jarrerarik gabeko gelaxkek ez dute emaitza aldatzen.",
      "Nagusitasuna: ausazko {users} erabiltzailerekin eta {users} erabiltzaile moderatu sintetikorekin, alderdi alderagarri batek ere ez du irabazten {maxShare} baino gehiagotan ezta {minShare} baino gutxiagotan ere. «Alderagarria» da bi lenteetako batean gutxienez {lens} galderatan datua duen alderdia; iristen ez dena ez da lehiatzen (denontzat «datu nahikorik ez» ateratzen da) eta haren hutsunea estaldura-probak neurtzen du.",
      "Bat datozen 3 jarrera dituen alderdi batek ez du gainditzen 15etan % 90ean bat datorren bat.",
    ],
    outro:
      "Proba horietako batek benetako datuekin huts egiten badu, ez da zuzentzen jarrerak ukituz: galderaren idazkera berrikusten da edo falta den iturria bilatzen da.",
  },
  usage: {
    h: "Erabileratik zer erregistratzen dugun",
    p: "Testak funtzionatzen duen jakiteko, gure datu-base propioan eta hirugarrenen zerbitzurik gabe, gertaera gutxi batzuk zenbatzen ditugu: testa hastea eta amaitzea, iturri bat irekitzea, partekatzea (eta zein kanaletatik), aukerako testuingurua adieraztea edo ez, «Jarraitu arakatzen» sakatzea, «Esan zutena eta egin zutena» irekitzea eta haren sarreretako baten esteka kopiatzea (zein den esan gabe). Gertaera bakoitzak bere izena, hizkuntza, datuen bertsioa eta ordu borobila baino ez ditu gordetzen. **Ez ditu gordetzen zure erantzunak, zure erkidegoa, zure ohiko botoa, inongo alderdirik ezta zure emaitza ere**, ezta IPa, nabigatzailea, cookieak edo identifikatzaileak ere: ez dago pertsona bereko bi gertaera lotzeko modurik. Zure nabigatzaileak «Global Privacy Control» edo «Do Not Track» bidaltzen badu, ez da ezer erregistratzen. Gertaerak 180 egunera ezabatzen dira.",
  },
  loreg: {
    h: "Debeku-aldia (LOREG, 69.7 art.)",
    p: "Onartzen dutenen erantzunak modu anonimoan gordetzen ditugu (posta elektronikorik gabe, IPrik gabe, data egunera mozturik). **2026ko azaroaren 24tik 29ra** ez da argitaratuko «zein alderdik irabazten du testean» motako agregaturik, Hauteskunde Araubide Orokorraren Lege Organikoaren 69.7 artikulua aplikatuz. Aldi horretatik kanpo, edozein datu agregatu gutxienez 20 pertsonako taldeekin bakarrik argitaratuko da, eta lagin adierazgarria ez dela ohartaraziz.",
  },
  version: {
    h: "Datuen bertsioa eta zuzenketak",
    current:
      "Uneko bertsioa: {version}. Datuen edo metodoaren aldaketa bakoitza, bere data eta arrazoiarekin, [aldaketen erregistroan](changelog) dago. Partekatutako estekek bertsioa daramate: datuak aldatzen badira, emaitza berriro kalkulatzen da eta ohartarazi egiten da.",
    corrections:
      "Gaizki kodetutako daturen bat, aipamen osatugaberen bat edo erorita dagoen iturriren bat aurkitu duzu? Idatzi iezaguzu {email} helbidera, alderdia, galdera eta hori frogatzen duen iturria adieraziz. Onartutako zuzenketak erregistroan argitaratzen dira; baztertutakoak, arrazoiarekin.",
  },
};

const TABLES: Record<string, MethodologyStrings> = { es, ca, gl, eu };

/** Textos de la metodología para un idioma; cualquier otro cae al castellano. */
export function getMethodologyStrings(locale: string | null | undefined): MethodologyStrings {
  return (locale && Object.hasOwn(TABLES, locale) ? TABLES[locale] : undefined) ?? es;
}

/** Las cuatro tablas sin mezclar, para el test de completitud. */
export const METHODOLOGY_TABLES = { es, ca, gl, eu } as const;
