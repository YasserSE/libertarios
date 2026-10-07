import type { Quote } from "../types";

/**
 * Hemeroteca de Sumar: lo que dijeron sus portavoces en el debate de la votación
 * ancla de cada pregunta. No puntúa. Todas las citas son literales, copiadas del
 * Diario de Sesiones del Congreso (PDF oficial) y comprobadas contra su texto el
 * 2026-10-06. `page` es la página impresa del Diario. `videoUrl` es el clip de la
 * intervención en el archivo audiovisual de congreso.es (identificador tomado de la
 * búsqueda de intervenciones de congreso.es y comprobado contra orador, fecha y
 * página del Diario; el clip empieza en la intervención, por eso no lleva `videoStart`).
 *
 * XIV legislatura: Sumar no existía; se citan diputados de En Comú Podem que
 * hablaron por el GP Confederal de Unidas Podemos (el grupo cuyo voto se usa
 * como historial de Sumar en la XIV, ver `recordNote`).
 */
export const quotes: Quote[] = [
  {
    partyId: "sumar",
    questionId: "amnistia",
    speaker: "Enrique Fernando Santiago Romero",
    role: "diputado del GP Plurinacional SUMAR en el debate",
    date: "2024-03-14",
    text: "en Cataluña, hay un elevadísimo consenso para avanzar en la normalización y sabemos, y también el Partido Popular lo sabe, que para normalizar se necesita la amnistía.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-32.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 32 (sesión plenaria núm. 30, 14-3-2024)",
      date: "2024-03-14",
      page: "p. 13",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15730172I",
    i18n: {
      ca: { role: "diputat del GP Plurinacional SUMAR en el debat" },
      gl: { role: "deputado do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARreko diputatua eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "irpf-inflacion",
    speaker: "Carlos Martín Urriza",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2024-04-09",
    text: "Beneficia a las rentas altas, porque nuestra tarifa es progresiva y, por tanto, si se rebaja la contribución fiscal en los primeros tramos de renta, beneficia a las rentas altas que se sitúan por encima.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-36.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 36 (sesión plenaria núm. 34, 9-4-2024)",
      date: "2024-04-09",
      page: "p. 52",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15731500I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "jornada-37-5",
    speaker: "Verónica Martínez Barbero",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2025-09-10",
    text: "la reducción de la jornada laboral es un acto de justicia histórica con la clase trabajadora que construyó nuestra democracia, pero también es la llave para dejar atrás la España en blanco y negro.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-135.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 135 (sesión plenaria núm. 130, 10-9-2025)",
      date: "2025-09-10",
      page: "p. 137",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15758439I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceira do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "nuclear",
    speaker: "Eloi Badia Casas",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2025-06-17",
    text: "si las centrales van a seguir operando, tendrán que demostrar que son seguras y, objetivamente, más competitivas que otras tecnologías.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-123.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 123 (sesión plenaria núm. 119, 17-6-2025)",
      date: "2025-06-17",
      page: "p. 21",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15755822I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "okupacion-desalojo",
    speaker: "Gerardo Pisarello Prados",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2026-05-19",
    text: "nos presentan hoy una ley que habla de desalojos en veinticuatro horas, de cortar el agua y la luz sin que sea delito, de impedir el empadronamiento, es decir, el acceso a sanidad, a educación, a servicios sociales, a familias en situación de extrema necesidad.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-185.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 185 (sesión plenaria núm. 179, 19-5-2026)",
      date: "2026-05-19",
      page: "p. 21",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15773353I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Aina Vidal Sáez",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2025-09-23",
    text: "No se delega en Junts, se delega en la Generalitat de Catalunya, una institución democrática que nos representa a todas.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-138.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 138 (sesión plenaria núm. 133, 23-9-2025)",
      date: "2025-09-23",
      page: "p. 23",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759120I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceira do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "tauromaquia-patrimonio",
    speaker: "Nahuel González López",
    role: "turno a favor de la toma en consideración, GP Plurinacional SUMAR",
    date: "2025-10-07",
    text: "No hablamos de prohibir, hablamos de quitarle el blindaje estatal, ese que la mantiene viva a base de subvenciones y privilegios.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-140.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 140 (sesión plenaria núm. 135, 7-10-2025)",
      date: "2025-10-07",
      page: "p. 6",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759950I",
    i18n: {
      ca: { role: "torn a favor de la presa en consideració, GP Plurinacional SUMAR" },
      gl: { role: "quenda a favor da toma en consideración, GP Plurinacional SUMAR" },
      eu: { role: "aintzat hartzearen aldeko txanda, GP Plurinacional SUMAR" },
    },
  },
  {
    // Debate de la moción el 10-6-2026; la votación ancla fue el 11-6-2026 (DSCD-15-PL-191).
    partyId: "sumar",
    questionId: "gasto-defensa",
    speaker: "Txema Guijarro García",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2026-06-10",
    text: "las partidas del gasto militar se han visto incrementadas especialmente en estos últimos tres años. Una circunstancia que, como usted bien sabe, señor Rego, nuestro grupo parlamentario desaprueba por todos los argumentos que acabo de exponer.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-190.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 190 (sesión plenaria núm. 184, 10-6-2026)",
      date: "2026-06-10",
      page: "p. 93",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15774762I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "prisiones-agentes-autoridad",
    speaker: "Fèlix Alonso Cantorné",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2026-06-11",
    text: "Si de verdad creemos que la cárcel debe servir para reinsertar, como nos obliga la Constitución, entonces estamos obligados a proteger y a dignificar a quienes lo hacen posible cada día. El funcionario de prisiones no es un carcelero, sino el primer eslabón de la reinserción",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-191.PDF#page=16",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 191 (sesión plenaria núm. 185, 11-6-2026)",
      date: "2026-06-11",
      page: "p. 16",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15775040I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "prostitucion-abolicion",
    speaker: "Gala Pin Ferrando",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2024-05-21",
    text: "las mujeres no necesitamos que nos tutelen, que nos infantilicen ni que nos paternalicen; las mujeres que ejercen el trabajo sexual tienen derecho a decidir sobre su vida.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-40.PDF#page=31",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 40 (sesión plenaria núm. 38, 21-5-2024)",
      date: "2024-05-21",
      page: "p. 31",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15733414I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceira do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "sumar",
    questionId: "registro-lobbies",
    speaker: "Carlos Martín Urriza",
    role: "portavoz del GP Plurinacional SUMAR en el debate",
    date: "2026-09-16",
    text: "Por eso es importante regular los grupos de interés, porque pone controles a las relaciones entre el poder económico y la Administración para dificultar que el interés general termine subordinado a los intereses de delincuentes.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-205.PDF#page=79",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 205 (sesión plenaria núm. 198, 16-9-2026)",
      date: "2026-09-16",
      page: "p. 79",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15778469I",
    i18n: {
      ca: { role: "portaveu del GP Plurinacional SUMAR en el debat" },
      gl: { role: "voceiro do GP Plurinacional SUMAR no debate" },
      eu: { role: "GP Plurinacional SUMARen bozeramailea eztabaidan" },
    },
  },
];
