import type { Quote } from "../types";

/**
 * Hemeroteca de Podemos: lo que dijeron sus portavoces en el debate de la votación
 * ancla de cada pregunta. No puntúa. Todas las citas son literales, copiadas del
 * Diario de Sesiones del Congreso (PDF oficial) y comprobadas contra su texto el
 * 2026-10-06. `page` es la página impresa del Diario. `videoUrl` es el clip de la
 * intervención en el archivo audiovisual de congreso.es (identificador tomado de la
 * búsqueda de intervenciones de congreso.es y comprobado contra orador, fecha y
 * página del Diario; el clip empieza en la intervención, por eso no lleva `videoStart`).
 *
 * XIV legislatura: Podemos votaba dentro del GP Confederal de Unidas Podemos;
 * se citan solo intervenciones de miembros de Podemos (Pilar Garrido,
 * coordinadora de Podemos Euskadi, e Irene Montero, ministra de Igualdad).
 */
export const quotes: Quote[] = [
  {
    partyId: "podemos",
    questionId: "amnistia",
    speaker: "Martina Velarde Gómez",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2024-03-14",
    text: "Hoy termina por fin la yincana parlamentaria para aprobar la ley de amnistía, que es el punto de partida para poder solucionar un conflicto de primer orden, que ha marcado la vida política de nuestro país desde hace más de una década.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-32.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 32 (sesión plenaria núm. 30, 14-3-2024)",
      date: "2024-03-14",
      page: "p. 4",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15730166I",
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "jornada-37-5",
    speaker: "Noemí Santana Perera",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2025-09-10",
    text: "Nosotras no podemos estar en contra de esta medida, pero creemos que se podía ir mucho más lejos. Nosotras vamos a apostar por una jornada laboral de 30 horas semanales, porque creemos que es lo justo.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-135.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 135 (sesión plenaria núm. 130, 10-9-2025)",
      date: "2025-09-10",
      page: "p. 143",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15758446I",
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "nuclear",
    speaker: "Martina Velarde Gómez",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2025-06-17",
    text: "Está claro que la industria nuclear no puede sobrevivir sin ser una carga para los contribuyentes.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-123.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 123 (sesión plenaria núm. 119, 17-6-2025)",
      date: "2025-06-17",
      page: "p. 13",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15755817I",
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "okupacion-desalojo",
    speaker: "Ione Belarra Urteaga",
    role: "secretaria general de Podemos, interviene por el Grupo Mixto en el debate",
    date: "2026-05-19",
    text: "Está usted confundiendo la okupación con el allanamiento. En este país, si le entran a alguien en la casa en la que vive, señor Sayas, y lo sabe perfectamente, viene la Policía inmediatamente y lo saca",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-185.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 185 (sesión plenaria núm. 179, 19-5-2026)",
      date: "2026-05-19",
      page: "p. 11",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15773348I",
    i18n: {
      ca: { role: "secretària general de Podemos, intervé pel Grup Mixt en el debat" },
      gl: { role: "secretaria xeral de Podemos, intervén polo Grupo Mixto no debate" },
      eu: { role: "Podemoseko idazkari nagusia, Talde Mistoaren izenean mintzatzen da eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Javier Sánchez Serna",
    role: "diputado de Podemos (Grupo Mixto) en el debate",
    date: "2025-09-23",
    text: "hoy no debatimos sobre el modelo de Estado o de competencias, hoy nos posicionamos frente a una nueva iniciativa que trata la inmigración como un peligro social.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-138.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 138 (sesión plenaria núm. 133, 23-9-2025)",
      date: "2025-09-23",
      page: "p. 18",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759116I",
    i18n: {
      ca: { role: "diputat de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputado de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "tauromaquia-patrimonio",
    speaker: "Martina Velarde Gómez",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2025-10-07",
    text: "La derogación supondría no solamente la protección de los animales, de los toros, sino también la devolución de la competencia a las autonomías.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-140.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 140 (sesión plenaria núm. 135, 7-10-2025)",
      date: "2025-10-07",
      page: "p. 10",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15759954I",
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "vivienda-tope-alquiler",
    speaker: "Pilar Garrido Gutiérrez",
    role: "diputada de Podemos, portavoz del GP Confederal de Unidas Podemos-En Comú Podem-Galicia en Común en el debate",
    date: "2023-04-27",
    text: "Esta ley cambia de paradigma. Por primera vez, desde el primer artículo aparece la vivienda como un bien esencial, como un derecho y no como un simple bien de mercado. Así, regula el control de los precios abusivos de los alquileres.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-265.PDF",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XIV legislatura, núm. 265 (sesión plenaria núm. 256, 27-4-2023)",
      date: "2023-04-27",
      page: "p. 31",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/14723329I",
    i18n: {
      ca: { role: "diputada de Podemos, portaveu del GP Confederal d'Unidas Podemos-En Comú Podem-Galicia en Común en el debat" },
      gl: { role: "deputada de Podemos, voceira do GP Confederal de Unidas Podemos-En Comú Podem-Galicia en Común no debate" },
      eu: { role: "Podemoseko diputatua, Unidas Podemos-En Comú Podem-Galicia en Común GP Konfederalaren bozeramailea eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "prostitucion-abolicion",
    speaker: "Martina Velarde Gómez",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2024-05-21",
    text: "Nosotras no podemos acompañarles, señoría del Partido Socialista, en una modificación penal que criminalice a las mujeres en contextos de prostitución o que, además, añada más riesgos a los que ya le impone el patriarcado.",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-40.PDF#page=25",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 40 (sesión plenaria núm. 38, 21-5-2024)",
      date: "2024-05-21",
      page: "p. 25",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15733409I",
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
  {
    partyId: "podemos",
    questionId: "impuesto-banca",
    speaker: "Ione Belarra Urteaga",
    role: "secretaria general de Podemos, defiende la proposición de ley del Grupo Mixto",
    date: "2024-04-09",
    text: "Para ello proponemos duplicar el gravamen excepcional de la gran banca y, también, como ya han hecho otros países europeos, aplicar un recargo del 75 % sobre los beneficios extraordinarios",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-36.PDF#page=22",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 36 (sesión plenaria núm. 34, 9-4-2024)",
      date: "2024-04-09",
      page: "p. 22",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15731474I",
    i18n: {
      ca: { role: "secretària general de Podemos, defensa la proposició de llei del Grup Mixt" },
      gl: { role: "secretaria xeral de Podemos, defende a proposición de lei do Grupo Mixto" },
      eu: { role: "Podemoseko idazkari nagusia, Talde Mistoaren lege-proposamena defendatzen du" },
    },
  },
  {
    partyId: "podemos",
    questionId: "oficina-anticorrupcion",
    speaker: "Martina Velarde Gómez",
    role: "diputada de Podemos (Grupo Mixto) en el debate",
    date: "2025-09-16",
    // Podemos votó «sí» a la toma en consideración; la cita va en sentido contrario.
    text: "el sistema bipartidista corrupto no se combate con una oficina anticorrupción, sino que hay que cambiarlo todo, de izquierda a derecha. ¿De qué nos sirve una ley que deja fuera de su ámbito de actuación la actividad de los partidos políticos, sus fundaciones o los grupos parlamentarios?",
    source: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-136.PDF#page=21",
      title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 136 (sesión plenaria núm. 131, 16-9-2025)",
      date: "2025-09-16",
      page: "p. 21",
      kind: "diario-sesiones",
    },
    videoUrl: "https://app.congreso.es/v1/15758682I",
    contrastsWithRecord: true,
    i18n: {
      ca: { role: "diputada de Podemos (Grup Mixt) en el debat" },
      gl: { role: "deputada de Podemos (Grupo Mixto) no debate" },
      eu: { role: "Podemoseko diputatua (Talde Mistoa) eztabaidan" },
    },
  },
];
