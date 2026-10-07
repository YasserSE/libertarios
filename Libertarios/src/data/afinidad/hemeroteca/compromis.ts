import type { Quote } from "../types";

/**
 * Hemeroteca de Compromís: lo que dijeron sus portavoces en el debate de la votación
 * ancla de cada pregunta. No puntúa. Todas las citas son literales, copiadas del
 * Diario de Sesiones del Congreso (PDF oficial) y comprobadas contra su texto el
 * 2026-10-06. `page` es la página impresa del Diario. `videoUrl` es el clip de la
 * intervención en el archivo audiovisual de congreso.es (identificador tomado de la
 * búsqueda de intervenciones de congreso.es y comprobado contra orador, fecha y
 * página del Diario; el clip empieza en la intervención, por eso no lleva `videoStart`).
 *
 * XIV legislatura: Joan Baldoví (Compromís) estaba en el GP Plural. XV: Àgueda
 * Micó, en el GP Plurinacional SUMAR hasta su paso al Grupo Mixto el 3-7-2025; la
 * única cita anterior (impuesto-banca, 9-4-2024) es de un turno que habló por SUMAR
 * y se marca así en `role`.
 */
export const quotes: Quote[] = [
  {
    partyId: "compromis",
    questionId: "jornada-37-5",
    speaker: "Àgueda Micó i Micó",
    role: "diputada de Compromís (Grupo Mixto) en el debate",
    date: "2025-09-10",
    // ES: «Reducir la jornada laboral no es un lujo, es un derecho fundamental del siglo XXI. (traducción del
    // propio Diario de Sesiones)»
    text: "Reduir la jornada laboral no és un luxe, és un dret fonamental del segle XXI.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-135.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 135 (sesión plenaria núm. 130, 10-9-2025)",
      date: "2025-09-10",
      page: "p. 141",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15758443I",
    i18n: {
      ca: { role: "diputada de Compromís (Grup Mixt) en el debat" },
      gl: { role: "deputada de Compromís (Grupo Mixto) no debate" },
      eu: { role: "Compromíseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "compromis",
    questionId: "okupacion-desalojo",
    speaker: "Àgueda Micó i Micó",
    role: "diputada de Compromís (Grupo Mixto) en el debate",
    date: "2026-05-19",
    text: "La mayoría de las viviendas okupadas son de bancos, de fondos buitres y de grandes tenedores, exactamente los mismos que okupan pisos y los mismos que hacen que se acumule la incertidumbre de nuestra gente más joven.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-185.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 185 (sesión plenaria núm. 179, 19-5-2026)",
      date: "2026-05-19",
      page: "p. 9",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15773345I",
    i18n: {
      ca: { role: "diputada de Compromís (Grup Mixt) en el debat" },
      gl: { role: "deputada de Compromís (Grupo Mixto) no debate" },
      eu: { role: "Compromíseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    // En esta votación el otro diputado de Compromís, Alberto Ibáñez Mezquita (GSUMAR), votó «no».
    partyId: "compromis",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Àgueda Micó i Micó",
    role: "diputada de Compromís (Grupo Mixto) en el debate",
    date: "2025-09-23",
    // ES: «Nosotros votaremos a favor de que se tome en cuenta esta proposición de ley porque creemos en el
    // autogobierno. (traducción del propio Diario de Sesiones)»
    text: "Nosaltres votarem a favor de la presa en consideració d’aquesta proposició de llei, perquè creguem en l’autogovern.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-138.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 138 (sesión plenaria núm. 133, 23-9-2025)",
      date: "2025-09-23",
      page: "p. 16",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759113I",
    i18n: {
      ca: { role: "diputada de Compromís (Grup Mixt) en el debat" },
      gl: { role: "deputada de Compromís (Grupo Mixto) no debate" },
      eu: { role: "Compromíseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "compromis",
    questionId: "tauromaquia-patrimonio",
    speaker: "Àgueda Micó i Micó",
    role: "diputada de Compromís (Grupo Mixto) en el debate",
    date: "2025-10-07",
    // ES: «La ILP es la prueba de que la ciudadanía tiene el poder real de provocar cambios reales, y por eso
    // votaremos a favor de esta derogación, porque la cultura no es tortura. (traducción del propio Diario de
    // Sesiones)»
    text: "La ILP és la prova que la ciutadania té el poder real de provocar canvis reals i, per això, votarem a favor d’esta derogació, perquè la cultura no és tortura.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-140.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 140 (sesión plenaria núm. 135, 7-10-2025)",
      date: "2025-10-07",
      page: "p. 8",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759951I",
    i18n: {
      ca: { role: "diputada de Compromís (Grup Mixt) en el debat" },
      gl: { role: "deputada de Compromís (Grupo Mixto) no debate" },
      eu: { role: "Compromíseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "compromis",
    questionId: "impuesto-grandes-fortunas",
    speaker: "Joan Baldoví Roda",
    role: "diputado de Compromís (GP Plural) en el debate",
    date: "2022-06-07",
    text: "el PSOE votará en contra de que los que más tienen ayuden y contribuyan, y ni siquiera votarán a favor de que se pueda tramitar",
    source: {
      url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-191.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XIV legislatura, núm. 191 (sesión plenaria núm. 184, 7-6-2022)",
      date: "2022-06-07",
      page: "p. 13",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/14706258I",
    i18n: {
      ca: { role: "diputat de Compromís (GP Plural) en el debat" },
      gl: { role: "deputado de Compromís (GP Plural) no debate" },
      eu: { role: "Compromíseko diputatua (GP Plural) eztabaidan" },
    },
  },
  {
    // En abril de 2024 Micó se sentaba en el GP Plurinacional SUMAR y habló en su turno; su voto se atribuye a
    // Compromís (deputies.ts).
    partyId: "compromis",
    questionId: "impuesto-banca",
    speaker: "Àgueda Micó i Micó",
    role: "diputada de Compromís, portavoz del GP Plurinacional SUMAR en el debate",
    date: "2024-04-09",
    // DSCD (p. 30), traducción del propio Diario: «Así que sí, claro que sí, estamos a favor de que se creen
    // impuestos para elevar la presión fiscal a quienes más tienen; impuestos que tiene que pagar la gran
    // banca»
    text: "I, per això, sí, clar que sí, estem a favor de que es facen impostos per elevar la pressió fiscal a qui més tenen; impostos que ha de pagar la gran banca",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-36.PDF#page=29",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 36 (sesión plenaria núm. 34, 9-4-2024)",
      date: "2024-04-09",
      page: "p. 29",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15731478I",
    i18n: {
      ca: { role: "diputada de Compromís, portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "deputada de Compromís, voceira do GP Plurinacional SUMAR no debate" },
      eu: { role: "Compromíseko diputatua, GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
];
