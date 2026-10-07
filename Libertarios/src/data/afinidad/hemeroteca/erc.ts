import type { Quote } from "../types";

/**
 * Hemeroteca de ERC (Grupo Parlamentario Republicano, «GR»).
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla de cada pregunta, copiadas literalmente del PDF oficial y
 * comprobadas contra el texto de la página citada. Las intervenciones en catalán
 * se citan en el original, tal como las imprime el DSCD; la traducción al
 * castellano que publica el propio DSCD va en un comentario. `videoUrl` es el
 * clip de la intervención en el archivo audiovisual de congreso.es (el clip
 * empieza en la intervención, por eso no lleva `videoStart`).
 */

const dscd = (leg: 14 | 15, num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L${leg}/CONG/DS/PL/DSCD-${leg}-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

export const quotes: Quote[] = [
  {
    partyId: "erc",
    questionId: "vivienda-tope-alquiler",
    speaker: "Pilar Vallugera Balañà",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2023-04-27",
    text: "¡Que solo contenemos las rentas! ¡Que no les vamos a decir que lo alquilen un 50 % más barato! Lo único que hacemos en grandes tenedores es referirnos a un índice, y en pequeños propietarios, vincularlos al contrato anterior.",
    source: dscd(14, "265", 30, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda"),
    videoUrl: "https://app.congreso.es/v1/14723328I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "irpf-inflacion",
    speaker: "Jordi Salvador i Duch",
    role: "Diputado del Grupo Parlamentario Republicano",
    date: "2024-04-09",
    // DSCD (p. 52): «Claro que hay que deflactor [sic] el IRPF, le doy la razón, pero selectivamente,
    // y yo diría que dentro de una reforma fiscal nítidamente progresista y mucho mayor. Traiga usted
    // una propuesta de ley en este sentido y se la votaremos.» (ERC votó «no» a la PNL.)
    text: "És clar que cal deflactar l’IRPF, li dono la raó. Però selectivament jo hi afegiria, «dins d’una reforma fiscal nítidament progressista i molt major». Porti’m vostè una proposta de llei en aquest sentit i, possiblement, la votarem.",
    source: dscd(15, "36", 51, "2024-04-09", "DSCD Pleno núm. 36 (XV), 9-4-2024 — PNL del GP para deflactar el IRPF"),
    videoUrl: "https://app.congreso.es/v1/15731499I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Republicà" },
      gl: { role: "Deputado do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "jornada-37-5",
    speaker: "Jordi Salvador i Duch",
    role: "Diputado del Grupo Parlamentario Republicano",
    date: "2025-09-10",
    // DSCD (p. 149): «Por ella votaré que sí a esta reforma de la jornada laboral. (Aplausos). Porque para ella
    // sí era importante esa media hora de trabajo.»
    text: "Per a ella votaré que sí a aquesta reforma de jornada de treball, perquè per ella sí que era important aquesta mitja hora de treball.",
    source: dscd(15, "135", 147, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758449I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Republicà" },
      gl: { role: "Deputado do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "amnistia",
    speaker: "Pilar Vallugera Balañà",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2024-03-14",
    // DSCD (p. 11): «No hubo delito, no hubo golpe de Estado, no hubo malversación y, por descontado,
    // no ha habido esta locura de terrorismo.»
    text: "perquè no hi va haver delicte, i l’amnistia repara que no hi va haver delicte, no hi va haver cop d’estat, no hi ha hagut malversacions i, per descomptat, no hi ha hagut aquesta bogeria de terrorisme.",
    source: dscd(15, "32", 10, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730170I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Gabriel Rufián Romero",
    role: "Diputado del Grupo Parlamentario Republicano",
    date: "2025-09-23",
    text: "no son unas competencias para la derecha catalana, por suerte, son unas competencias para una nación, para Cataluña.",
    source: dscd(15, "138", 21, "2025-09-23", "DSCD Pleno núm. 138 (XV), 23-9-2025 — Proposición de Ley Orgánica de delegación en Cataluña de competencias en inmigración"),
    videoUrl: "https://app.congreso.es/v1/15759119I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Republicà" },
      gl: { role: "Deputado do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "okupacion-desalojo",
    speaker: "Etna Estrems Fayos",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2026-05-19",
    // DSCD (p. 20): «Por eso, mientras ustedes debaten sobre cortarles suministros a Mariano o a Trinidad
    // y evitar empadronamientos de personas vulnerables, nosotros seguiremos trabajando para combatir la
    // especulación y defender el derecho a una vivienda asequible para todos. Ese es el verdadero problema.»
    text: "Per això, mentre vostès debaten sobre tallar-li els subministraments a en Mariano o la Trinidad, i evitar empadronaments de persones vulnerables, nosaltres continuarem treballant per combatre l’especulació i garantir el dret a l’accés a un habitatge assequible per a tothom, que aquest és el veritable problema.",
    source: dscd(15, "185", 19, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773352I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "gasto-defensa",
    speaker: "Teresa Jordà i Roura",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2026-06-10",
    // DSCD (p. 91): «Y, si ahora recaudamos más, eso está muy bien, pero la pregunta que se plantea
    // entonces es muy sencilla: ¿este dinero recaudado lo vamos a destinar a reconstruir el Estado del
    // bienestar o bien a alimentar la carrera armamentista?»
    text: "I si ara tenim més recaptació, que està molt bé, la pregunta és molt senzilla: aquesta recaptació la destinarem a reconstruir l’estat del benestar o a alimentar la cursa armamentística?",
    source: dscd(15, "190", 90, "2026-06-10", "DSCD Pleno núm. 190 (XV), 10-6-2026 — Moción del GMx (Sr. Rego Candamil) sobre la reversión del incremento del gasto militar"),
    videoUrl: "https://app.congreso.es/v1/15774761I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "prostitucion-abolicion",
    speaker: "Pilar Vallugera Balañà",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2024-05-21",
    text: "Por tanto, hasta que no haya ley de trata y no haya derogación de la ley de extranjería, no nos van a encontrar en ninguna penalización de ninguna estrategia económica de las mujeres.",
    source: dscd(15, "40", 31, "2024-05-21", "DSCD Pleno núm. 40 (XV), 21-5-2024 — Proposición de Ley Orgánica del GS para prohibir el proxenetismo en todas sus formas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15733413I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "impuesto-banca",
    speaker: "Inés Granollers Cunillera",
    role: "Diputada del Grupo Parlamentario Republicano",
    date: "2024-04-09",
    // DSCD (p. 27), traducción del propio Diario: «En definitiva, damos apoyo a la presente iniciativa porque
    // es oportuna y porque es necesaria, y seguiremos trabajando para ir más allá en la defensa de los
    // intereses de la ciudadanía ante los abusos usureros de las grandes entidades bancarias.»
    text: "En definitiva, donarem suport a la present iniciativa perquè és oportuna, perquè és necessària, i seguirem treballant per anar més enllà en la defensa dels interessos de la ciutadania contra els abusos usurers de les grans entitats bancàries.",
    source: dscd(15, "36", 26, "2024-04-09", "DSCD Pleno núm. 36 (XV), 9-4-2024 — Proposición de Ley del GMx sobre los beneficios caídos del cielo de la gran banca (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15731477I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Republicà" },
      gl: { role: "Deputada do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
  {
    partyId: "erc",
    questionId: "oficina-anticorrupcion",
    speaker: "Francesc-Marc Álvaro Vidal",
    role: "Diputado del Grupo Parlamentario Republicano",
    date: "2025-09-16",
    // DSCD (p. 28), traducción del propio Diario: «Nosotros, en Esquerra, votaremos a favor de la tramitación
    // de esta proposición, pero somos escépticos en cuanto al recorrido que pueda tener.»
    text: "Bé, nosaltres, Esquerra, votarem a favor de tramitar aquesta proposició, però som escèptic sobre el recorregut que pugui tenir.",
    source: dscd(15, "136", 27, "2025-09-16", "DSCD Pleno núm. 136 (XV), 16-9-2025 — Proposición de Ley del GSUMAR de creación de la Oficina de prevención de la corrupción (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15758686I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Republicà" },
      gl: { role: "Deputado do Grupo Parlamentario Republicano" },
      eu: { role: "Talde Parlamentario Errepublikanoko diputatua" },
    },
  },
];
