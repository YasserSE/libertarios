import type { Quote } from "../types";

/**
 * Hemeroteca de Junts per Catalunya.
 *
 * XV legislatura: Grupo Parlamentario Junts per Catalunya («GJxCAT»).
 * XIV legislatura: sus diputados se sentaban en el Grupo Plural («GPlu»); la
 * atribución por diputado está en `../deputies.ts`.
 *
 * Todas las citas salen del Diario de Sesiones del Congreso (Pleno) del debate
 * de la votación ancla, copiadas literalmente del PDF oficial y comprobadas
 * contra el texto de la página citada. Las intervenciones en catalán se citan
 * en el original; la traducción al castellano que imprime el propio DSCD va en
 * un comentario. `videoUrl` es el clip de la intervención en congreso.es.
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
    partyId: "junts",
    questionId: "amnistia",
    speaker: "Josep Maria Cervera Pinart",
    role: "Diputado del Grupo Parlamentario Junts per Catalunya",
    date: "2024-03-14",
    // DSCD (p. 9): «Ese difícil y poco entendido «no» nos lleva hoy a aprobar la mejor ley de amnistía
    // posible. Una amnistía integral que no deja a ningún independentista fuera y que es de aplicación
    // inmediata.»
    text: "Aquell difícil i poc entès «no» ens porta avui a aprovar la millor llei d’amnistia possible: una amnistia integral que no deixa cap independentista fora i que és d’aplicació immediata",
    source: dscd(15, "32", 8, "2024-03-14", "DSCD Pleno núm. 32 (XV), 14-3-2024 — Proposición de Ley Orgánica de amnistía"),
    videoUrl: "https://app.congreso.es/v1/15730169I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputado do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "jornada-37-5",
    speaker: "Míriam Nogueras i Camero",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2025-09-10",
    // DSCD (p. 134): «Para la peluquería, la carnicería, la gestoría, el electricista o el agricultor,
    // esta ley supondría un sobrecoste de más de 1000 euros por trabajador; para un banco, señora Díaz,
    // solo 100 euros; y para la Administración pública, solo 59.»
    text: "Per la perruqueria, la carnisseria, la gestoria, l’electricista o el pagès, aquesta llei suposaria un sobrecost de més de 1000 euros per treballador. Per un banc, senyora Díaz, només 100 euros i per a l’administració pública, només 59.",
    source: dscd(15, "135", 134, "2025-09-10", "DSCD Pleno núm. 135 (XV), 10-9-2025 — Enmiendas a la totalidad al Proyecto de Ley de reducción de la jornada"),
    videoUrl: "https://app.congreso.es/v1/15758436I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "inmigracion-competencias-cataluna",
    speaker: "Míriam Nogueras i Camero",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2025-09-23",
    // DSCD (p. 10): «El debate de hoy, estimadas señorías de VOX, de Podemos y del Grupo Popular, es si
    // Cataluña debe disponer de las competencias en materia de inmigración. Sí. Lo que estamos
    // proponiendo es más autogobierno, más poder político para Cataluña»
    text: "El debat avui, senyors del PP, senyors de VOX i senyors de Podem, és si Catalunya ha de disposar o no de les competències en matèria d’immigració. Sí, el que estem proposant és més autogovern, més poder polític per a Catalunya",
    source: dscd(15, "138", 8, "2025-09-23", "DSCD Pleno núm. 138 (XV), 23-9-2025 — Proposición de Ley Orgánica de delegación en Cataluña de competencias en inmigración"),
    videoUrl: "https://app.congreso.es/v1/15759109I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "okupacion-desalojo",
    speaker: "Marta Madrenas i Mir",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2026-05-19",
    // DSCD (p. 16): «No, las okupaciones existen, generan conflictos reales, inseguridad jurídica,
    // degradan comunidades y, en muchos casos, alimentan actividades delictivas organizadas. Y negar esta
    // realidad no es ser más progresista; es irresponsabilidad.»
    text: "No, les okupacions existeixen, generen conflictes reals, inseguretat jurídica, degraden comunitats i en molts casos alimenten activitats delictives organitzades. I negar aquesta realitat no és ser més progressista. És irresponsabilitat.",
    source: dscd(15, "185", 15, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773351I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "okupacion-desalojo",
    speaker: "Marta Madrenas i Mir",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2026-05-19",
    // DSCD (p. 17): «También queremos decir claramente que la proposición del Grupo Popular nos genera
    // dudas importantes, porque nosotros no defendemos la resignación ante las okupaciones, en ningún
    // caso, pero tampoco pasarse de la raya.» (Junts se abstuvo en la toma en consideración.)
    text: "Ara bé, també direm clarament que la proposició del Partit Popular ens genera dubtes importants, perquè nosaltres no defensem la resignació davant les okupacions, en cap cas, però tampoc legislacions passades de volta.",
    source: dscd(15, "185", 15, "2026-05-19", "DSCD Pleno núm. 185 (XV), 19-5-2026 — Proposición de Ley Orgánica del GP contra la ocupación ilegal"),
    videoUrl: "https://app.congreso.es/v1/15773351I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "vivienda-tope-alquiler",
    speaker: "Mariona Illamola Dausà",
    role: "Diputada de Junts per Catalunya (Grupo Parlamentario Plural)",
    date: "2023-04-27",
    text: "La experiencia demuestra, pues, que el problema no se soluciona conteniendo precios, sino con más oferta y mejorando el poder adquisitivo. Por eso, mantenemos nuestras enmiendas al respecto. La contención puede ser una medida adecuada en algunos momentos en situación de emergencia, pero no puede ser una solución estructural.",
    source: dscd(14, "265", 23, "2023-04-27", "DSCD Pleno núm. 265 (XIV), 27-4-2023 — Proyecto de Ley por el derecho a la vivienda"),
    videoUrl: "https://app.congreso.es/v1/14723323I",
    i18n: {
      ca: { role: "Diputada de Junts per Catalunya (Grup Parlamentari Plural)" },
      gl: { role: "Deputada de Junts per Catalunya (Grupo Parlamentario Plural)" },
      eu: { role: "Junts per Catalunyako diputatua (Talde Parlamentario Plurala)" },
    },
  },
  {
    partyId: "junts",
    questionId: "nuclear",
    speaker: "Pilar Calvo Gómez",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2025-06-17",
    // DSCD (p. 17): «hay que analizar todos los escenarios: que la transición ecológica no llegue a
    // tiempo a determinados territorios y haya que extender la vida útil de algunas centrales.»
    // (Junts se abstuvo en la toma en consideración.)
    text: "I és que s’han d’analitzar tots els escenaris, que la transició ecològica no arribi a temps en determinats territoris i s’hagi d’estendre la vida útil d’algunes centrals.",
    source: dscd(15, "123", 16, "2025-06-17", "DSCD Pleno núm. 123 (XV), 17-6-2025 — Proposición de Ley del GP sobre la aportación de la energía nuclear"),
    videoUrl: "https://app.congreso.es/v1/15755820I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "prisiones-agentes-autoridad",
    speaker: "Marta Madrenas i Mir",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2026-06-11",
    // DSCD (p. 8), traducción del propio Diario: «En Junts siempre hemos defendido que los trabajadores
    // penitenciarios merecen este reconocimiento. Es necesario reforzar su estatus jurídico y reconocer la
    // autoridad que necesitan cada día para el ejercicio de sus funciones.»
    text: "Junts sempre hem defensat que els treballadors penitenciaris mereixen aquest reconeixement. És necessari reforçar el seu estatus jurídic i reconèixer l’autoritat que els cal cada dia per a l’exercici de les seves funcions.",
    source: dscd(15, "191", 7, "2026-06-11", "DSCD Pleno núm. 191 (XV), 11-6-2026 — Dictamen de la Proposición de Ley Orgánica que reconoce a los funcionarios de prisiones como agentes de la autoridad (art. 80 LOGP)"),
    videoUrl: "https://app.congreso.es/v1/15775016I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    // La cita empieza en la p. 28 y termina en la p. 29.
    partyId: "junts",
    questionId: "prostitucion-abolicion",
    speaker: "Pilar Calvo Gómez",
    role: "Diputada del Grupo Parlamentario Junts per Catalunya",
    date: "2024-05-21",
    // DSCD (p. 29), traducción del propio Diario: «Pero también les decía que esta iniciativa del
    // abolicionismo más punitivo no va a acabar con la prostitución, sino que enviará a la que se ejercía en
    // espacios regulados, los conocidos de tercería locativa, a la clandestinidad, tal y como expuso en su
    // informe Amnistía Internacional.»
    text: "Però també els deia que aquesta iniciativa de l’abolicionisme més punitiu no acabarà amb la prostitució, sinó que enviarà la que s’exercia en espais regulats, els coneguts de terceria locativa, a la clandestinitat, com va exposar en el seu informe Amnistia Internacional.",
    source: dscd(15, "40", 28, "2024-05-21", "DSCD Pleno núm. 40 (XV), 21-5-2024 — Proposición de Ley Orgánica del GS para prohibir el proxenetismo en todas sus formas (toma en consideración)"),
    videoUrl: "https://app.congreso.es/v1/15733412I",
    i18n: {
      ca: { role: "Diputada del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputada do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
  {
    partyId: "junts",
    questionId: "registro-lobbies",
    speaker: "Josep Pagès i Massó",
    role: "Diputado del Grupo Parlamentario Junts per Catalunya",
    date: "2026-09-16",
    // DSCD (p. 76), traducción del propio Diario: «Nosotros, señor ministro, estamos totalmente de acuerdo en
    // que las grandes empresas y los profesionales del lobby pasen por el tubo, ¡y tanto!, pero lo que no
    // vamos a aceptar es que las pequeñas empresas, las entidades y asociaciones de nuestro tejido social
    // tengan que pasar por el mismo tubo.»
    text: "Nosaltres, senyor ministre, estem totalment d’acord en que les grans empreses i els professionals del lobby passin pel tubo. I tant! Ara el que no acceptarem és que les petites empreses, les entitats i associacions del nostre teixit social, hagin de passar pel mateix tubo.",
    source: dscd(15, "205", 74, "2026-09-16", "DSCD Pleno núm. 205 (XV), 16-9-2026 — Convalidación del Real Decreto-ley 21/2026, de transparencia e integridad de los grupos de interés"),
    videoUrl: "https://app.congreso.es/v1/15778467I",
    i18n: {
      ca: { role: "Diputat del Grup Parlamentari Junts per Catalunya" },
      gl: { role: "Deputado do Grupo Parlamentario Junts per Catalunya" },
      eu: { role: "Junts per Catalunya Talde Parlamentarioko diputatua" },
    },
  },
];
