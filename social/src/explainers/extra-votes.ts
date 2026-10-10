import type { ExtraVote } from "./party-video";

/**
 * Votaciones y promesas que no están en el test y que se han buscado para los
 * vídeos «lo que prometen y lo que votan» (2026-10-10).
 *  - Votos: datos abiertos del Congreso (XV legislatura), contados por partido con
 *    `npm run afinidad:vote` de Libertarios/ (Podemos se cuenta por sus diputados del Grupo Mixto).
 *  - Promesas: cita literal del programa con la página del PDF. Programas de 2023,
 *    salvo Podemos (europeas 2024, el mismo que usa el test). Sin cita clara → «sin».
 * `npm run check` comprueba que la voz de cada vídeo cuadra con estas filas.
 */
const B = "https://www.congreso.es/webpublica/opendata/votaciones/Leg15";
const PP = "PP, programa 23-J 2023";
const PSOE = "PSOE, programa 23-J 2023";
const VOX = "Vox, programa 23-J 2023";
const SUMAR = "Sumar, programa 23-J 2023";
const PODEMOS = "Podemos, programa europeas 2024";
const sin = { promise: "sin" } as const;

export const EXTRA: Record<string, ExtraVote> = {
  /* ── Pensiones ── */
  "pensiones-omnibus-2026": {
    id: "pensiones-omnibus-2026",
    question: "Convalidar el decreto que subía las pensiones un 2,7 % en 2026, junto a otras medidas.",
    date: "2026-01-27",
    title: "Convalidación del Real Decreto-ley 16/2025 (derogado, 171-178)",
    url: `${B}/Sesion156/20260127/Votacion001/VOT_20260127153134.json`,
    votes: { pp: "no", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {
      pp: { promise: "favor", quote: "GARANTIZAREMOS LA REVALORIZACIÓN DE LAS PENSIONES EN EL MARCO DEL PACTO DE TOLEDO.", source: `${PP}, p. 19-20` },
      psoe: { promise: "favor", quote: "Garantizaremos ante cualquier circunstancia el poder adquisitivo de todas las pensiones con arreglo al IPC.", source: `${PSOE}, p. 170` },
      vox: sin,
      sumar: { promise: "favor", quote: "…se siga haciendo mediante ley, de acuerdo, como mínimo, con la subida del IPC para asegurar su poder adquisitivo.", source: `${SUMAR}, p. 34` },
      podemos: { promise: "favor", quote: "…garantizar que los Estados cumplen con su obligación de dar acceso a unas pensiones suficientes y actualizadas", source: `${PODEMOS}, p. 42` },
    },
  },
  "pensiones-revalorizacion-2026": {
    id: "pensiones-revalorizacion-2026",
    question: "Convalidar el decreto que sube las pensiones un 2,7 % en 2026.",
    date: "2026-02-26",
    title: "Convalidación del Real Decreto-ley 3/2026 (317-33)",
    url: `${B}/Sesion164/20260226/Votacion023/VOT_20260226153430.json`,
    votes: { pp: "si", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {} as ExtraVote["promises"], // las mismas que el decreto de enero (abajo)
  },
  "pension-y-trabajo-2025": {
    id: "pension-y-trabajo-2025",
    question: "Mejorar la compatibilidad de la pensión de jubilación con el trabajo.",
    date: "2025-01-22",
    title: "Convalidación del Real Decreto-ley 11/2024 (298-51)",
    url: `${B}/Sesion089/20250122/Votacion003/VOT_20250122154429.json`,
    votes: { pp: "si", psoe: "si", vox: "no", sumar: "si", podemos: "no" },
    promises: { pp: sin, psoe: sin, vox: sin, sumar: sin, podemos: sin },
  },

  /* ── Inmigración ── */
  "regularizacion-ilp-2024": {
    id: "regularizacion-ilp-2024",
    question: "Tramitar la iniciativa popular para una regularización extraordinaria de extranjeros.",
    date: "2024-04-09",
    title: "Toma en consideración de la ILP de regularización extraordinaria (310-33)",
    url: `${B}/Sesion034/20240409/Votacion001/VOT_20240409210631.json`,
    votes: { pp: "si", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {
      pp: sin,
      psoe: sin,
      vox: { promise: "contra", quote: "cualquier inmigrante que llegue ilegalmente nunca podrá regularizar su situación en España", source: `${VOX}, p. 101` },
      sumar: { promise: "favor", quote: "…que introduzca un procedimiento de regularización permanente", source: `${SUMAR}, p. 104` },
      podemos: sin,
    },
  },
  "arraigo-vox-2025": {
    id: "arraigo-vox-2025",
    question: "Tramitar la ley de Vox para restringir la regularización a través del arraigo.",
    date: "2025-09-16",
    title: "Toma en consideración de la proposición de Vox sobre el arraigo (169-177)",
    url: `${B}/Sesion131/20250916/Votacion001/VOT_20250916211204.json`,
    votes: { pp: "si", psoe: "no", vox: "si", sumar: "no", podemos: "no" },
    promises: {
      pp: sin,
      psoe: { promise: "contra", quote: "…se centra en la actualización de las actuales figuras de arraigo y la creación de nuevas", source: `${PSOE}, p. 256` },
      vox: { promise: "favor", quote: "Supresión de la institución del arraigo como forma de regular la inmigración ilegal", source: `${VOX}, p. 103` },
      sumar: { promise: "contra", quote: "…que introduzca un procedimiento de regularización permanente", source: `${SUMAR}, p. 104` },
      podemos: sin,
    },
  },
  "reparto-menores-2024": {
    id: "reparto-menores-2024",
    question: "Tramitar la reforma para repartir entre comunidades a los menores migrantes no acompañados.",
    date: "2024-07-23",
    title: "Toma en consideración de la reforma de la Ley de Extranjería (171-177)",
    url: `${B}/Sesion056/20240723/Votacion063/VOT_20240723221735.json`,
    votes: { pp: "no", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {
      pp: sin,
      psoe: sin,
      vox: { promise: "contra", quote: "Todos los menores extranjeros no acompañados deben ser repatriados con sus padres a sus países de origen de forma inmediata", source: `${VOX}, p. 101` },
      sumar: { promise: "favor", quote: "Promoveremos un pacto de Estado para la acogida y la atención de niños, niñas y adolescentes migrantes no acompañados", source: `${SUMAR}, p. 96` },
      podemos: sin,
    },
  },

  /* ── Sanidad y educación ── */
  "agencia-salud-publica-2025": {
    id: "agencia-salud-publica-2025",
    question: "Crear la Agencia Estatal de Salud Pública.",
    date: "2025-03-20",
    title: "Dictamen del Proyecto de Ley de la Agencia Estatal de Salud Pública (167-176)",
    url: `${B}/Sesion101/20250320/Votacion019/VOT_20250320125720.json`,
    votes: { pp: "no", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {
      pp: { promise: "favor", quote: "RETOMAREMOS LA CREACIÓN DE LA AGENCIA ESTATAL DE SALUD PÚBLICA…", source: `${PP}, p. 45` },
      psoe: { promise: "favor", quote: "Continuaremos impulsando la creación de la Agencia Estatal de Salud Pública…", source: `${PSOE}, p. 194` },
      vox: sin,
      sumar: sin,
      podemos: sin,
    },
  },
  "tarjeta-sanitaria-2024": {
    id: "tarjeta-sanitaria-2024",
    question: "Tramitar la ley de Vox para una tarjeta sanitaria válida en toda España.",
    date: "2024-11-26",
    title: "Toma en consideración de la proposición de Vox sobre la tarjeta sanitaria (32-174, 134 abst.)",
    url: `${B}/Sesion080/20241126/Votacion003/VOT_20241126173408.json`,
    votes: { pp: "abstencion", psoe: "no", vox: "si", sumar: "no", podemos: "no" },
    promises: {
      pp: { promise: "favor", quote: "IMPULSAREMOS LA CREACIÓN DE UNA TARJETA SOCIAL Y SANITARIA UNIFICADA…", source: `${PP}, p. 57` },
      psoe: sin, // promete historia clínica accesible en todo el territorio, no la tarjeta: no se le atribuye
      vox: { promise: "favor", quote: "…una tarjeta sanitaria única; unificación de la historia clínica y farmacéutica digital…", source: `${VOX}, p. 56` },
      sumar: sin,
      podemos: sin,
    },
  },
  "escuelas-0-3-2026": {
    id: "escuelas-0-3-2026",
    question: "Red pública de 0 a 3 años, menos alumnos por aula y sin cheques para plazas privadas.",
    date: "2026-05-20",
    title: "Moción sobre política educativa (Belarra), texto transaccional (169-170)",
    url: `${B}/Sesion180/20260520/Votacion006/VOT_20260520142328.json`,
    votes: { pp: "no", psoe: "si", vox: "no", sumar: "si", podemos: "si" },
    promises: {
      pp: { promise: "favor", quote: "LA EDUCACIÓN DE 0 A 3 AÑOS SERÁ UNIVERSAL Y GRATUITA…", source: `${PP}, p. 48` },
      psoe: { promise: "favor", quote: "Universalizar un primer ciclo de educación infantil (0 a 3 años) de calidad…", source: `${PSOE}, p. 177` },
      vox: { promise: "favor", quote: "Apoyaremos a los ayuntamientos para garantizar guarderías gratuitas…", source: `${VOX}, p. 164` },
      sumar: { promise: "favor", quote: "…plazas gratuitas y de calidad… reduciendo las ratios de alumnado por aula…", source: `${SUMAR}, p. 94` },
      podemos: { promise: "favor", quote: "Cobertura universal, pública y gratuita de la educación de 0 a 3 años en toda Europa.", source: `${PODEMOS}, p. 29` },
    },
  },

  /* ── Seguridad ── */
  "multirreincidencia-2026": {
    id: "multirreincidencia-2026",
    question: "Más castigo para quien acumula hurtos y pequeños delitos (votación final).",
    date: "2026-03-26",
    title: "Votación de conjunto de la ley de multirreincidencia, enmiendas del Senado (272-71)",
    url: `${B}/Sesion169/20260326/Votacion056/VOT_20260326165143.json`,
    votes: { pp: "si", psoe: "si", vox: "no", sumar: "no", podemos: "no" },
    promises: {
      pp: { promise: "favor", quote: "REFORMAREMOS EL CÓDIGO PENAL EN LO REFERENTE A LA MULTIRREINCIDENCIA en hurtos y estafas…", source: `${PP}, p. 81` },
      psoe: sin,
      vox: { promise: "favor", quote: "Lucha contra las pandillas y bandas callejeras, el tráfico de drogas y la pequeña delincuencia", source: `${VOX}, p. 103` },
      sumar: { promise: "contra", quote: "La visión neoliberal, que lo fía todo… al «punitivismo mágico», debe ser sustituida…", source: `${SUMAR}, p. 130` },
      podemos: sin,
    },
  },
  "equiparacion-policia-2024": {
    id: "equiparacion-policia-2024",
    question: "Equiparar el sueldo de Policía Nacional y Guardia Civil con el de las policías autonómicas.",
    date: "2024-10-16",
    title: "Proposición no de ley del PP sobre equiparación salarial, punto 1 (171-174)",
    url: `${B}/Sesion068/20241016/Votacion001/VOT_20241017130151.json`,
    votes: { pp: "si", psoe: "no", vox: "si", sumar: "no", podemos: "no" },
    promises: {
      pp: { promise: "favor", quote: "CULMINAREMOS EL \"ACUERDO DE EQUIPARACIÓN SALARIAL\"…", source: `${PP}, p. 80` },
      psoe: sin,
      vox: { promise: "favor", quote: "se garantizará la equiparación salarial real entre el Cuerpo Nacional de Policía, Guardia Civil y policías autonómicas", source: `${VOX}, p. 10` },
      sumar: sin,
      podemos: sin,
    },
  },
  "petaqueo-2025": {
    id: "petaqueo-2025",
    question: "Tramitar la ley para castigar el suministro de gasolina a las narcolanchas.",
    date: "2025-06-17",
    title: "Toma en consideración de la proposición de Vox sobre el «petaqueo» (171-172)",
    url: `${B}/Sesion119/20250617/Votacion002/VOT_20250617203252.json`,
    votes: { pp: "si", psoe: "no", vox: "si", sumar: "no", podemos: "no" },
    promises: {
      pp: sin,
      psoe: sin,
      vox: { promise: "favor", quote: "Un nuevo Código Penal… elevarán las penas para… los delitos más graves (… narcotráfico…)", source: `${VOX}, p. 93` },
      sumar: sin,
      podemos: sin,
    },
  },

  /* ── Corrupción ── */
  "lobbies-2026": {
    id: "lobbies-2026",
    question: "Convalidar el decreto que crea un registro público de lobbies (grupos de interés).",
    date: "2026-09-16",
    title: "Convalidación del Real Decreto-ley 21/2026, de grupos de interés (derogado, 155-179)",
    url: `${B}/Sesion198/20260916/Votacion016/VOT_20260916195406.json`,
    votes: { pp: "no", psoe: "si", vox: "no", sumar: "si", podemos: "abstencion" },
    promises: {
      pp: { promise: "favor", quote: "SE PROCEDERÁ A UNA REGULACIÓN DE LOS LOBBIES Y HUELLA LEGISLATIVA…", source: `${PP}, p. 74` },
      psoe: { promise: "favor", quote: "Aprobaremos la Ley de Lobbies para dar transparencia a las actividades de los grupos de interés, creando un registro público y gratuito…", source: `${PSOE}, p. 243` },
      vox: sin,
      sumar: { promise: "favor", quote: "Promoveremos la regulación de los grupos de interés, limitando su influencia y estableciendo la difusión pública obligatoria de sus actividades.", source: `${SUMAR}, p. 146` },
      podemos: { promise: "favor", quote: "Freno y control a los lobbies… Impulsaremos medidas para limitar y controlar las actividades de los lobbies.", source: `${PODEMOS}, p. 15` },
    },
  },
};
EXTRA["pensiones-revalorizacion-2026"].promises = EXTRA["pensiones-omnibus-2026"].promises;
