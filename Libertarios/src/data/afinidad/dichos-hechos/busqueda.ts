/**
 * Registro de búsqueda de «Dijeron vs. hicieron»: qué se buscó para cada
 * partido y qué se descartó, con el motivo. Se publica en la página
 * `/a-quien-votar/dijeron-vs-hicieron` («Qué buscamos y por qué no entró»).
 *
 * Por qué existe: lo que se elige enseñar ya es una forma de opinar. Si un
 * partido solo tiene entradas «cumple», quien lee tiene que poder ver que se
 * buscaron también incumplimientos y por qué no entraron, en vez de suponer que
 * no se buscaron.
 *
 * Fuente: los informes de los agentes que hicieron la selección (2026-10-06),
 * la revisión ciega (`docs/AFINIDAD-REVISION.md`, parte B) y las cabeceras de
 * cada fichero `<partyId>.ts` de esta carpeta. Solo hechos: qué se buscó, qué
 * se encontró y la regla por la que no entró. No es un fichero de entradas: no
 * va en `index.ts` ni pasa por `saidVsDidSchema`.
 */

export interface DvhSearchExclusion {
  /** Qué se encontró, en una frase. */
  what: string;
  /** La regla por la que no entró. */
  why: string;
}

export interface DvhSearchLog {
  partyId: string;
  /** Qué fuentes se recorrieron y cómo. */
  searched: string[];
  excluded: DvhSearchExclusion[];
}

/**
 * Traducción del registro a una lengua (`busqueda-i18n/<lengua>.ts`): misma
 * forma y mismo orden que el castellano (`DVH_KNOWN_GAPS` y `dvhSearchLog`),
 * entrada a entrada. Lo comprueba `afinidad-i18n.test.ts`.
 */
export interface DvhSearchLogTranslation {
  gaps: readonly string[];
  log: readonly DvhSearchLog[];
}

/** Lo que vale para todos: lo que no se ha investigado todavía. */
export const DVH_KNOWN_GAPS: readonly string[] = [
  "Compromisos de los gobiernos autonómicos (Generalitat, Gobierno Vasco, Xunta, Gobierno de Canarias, Gobierno de Navarra, juntas y consejos de gobierno de otras comunidades): exigen el diario oficial y el diario de sesiones de cada parlamento autonómico y no se han investigado, salvo las dos entradas de Coalición Canaria.",
  "Votaciones de investidura del Congreso: son por llamamiento y no tienen JSON en los datos abiertos, así que no sirven como prueba con el mismo estándar que el resto.",
];

const SAME_DEBATE =
  "Lo «dicho» es una intervención en el mismo debate de la votación con la que se comparaba: es anunciar el voto, no comprometerse (revisión del 2026-10-06).";

/** Método común a ERC, Junts, EH Bildu, PNV y BNG (misma persona, misma búsqueda). */
const NACIONALISTAS_SEARCHED = [
  "Programa de las generales de 2023 cruzado con todas las votaciones de la XV legislatura: no hay ningún caso de signo contrario; solo diferencias de grado («parcial»).",
  "Los 201 Diarios de Sesiones del Pleno de la XV: cada frase de sus portavoces que anuncia un voto, comparada con el voto del grupo ese día. Salieron 8 discrepancias aparentes; todas eran enmiendas o votaciones de totalidad, donde votar «no» es coherente con apoyar la ley.",
  "Compromisos hacia delante en esos Diarios («votaremos… cuando», «nunca votaremos», «presentaremos», «mientras no»…): unos 190 resultados revisados a mano y contrastados con votaciones posteriores.",
  "Votaciones en las que el partido vota «sí» en un trámite y «no» en otro de la misma iniciativa: ningún caso real (eran iniciativas distintas con título parecido).",
];

export const dvhSearchLog: readonly DvhSearchLog[] = [
  {
    partyId: "psoe",
    searched: [
      "Discurso de investidura de 2020 (Diario de Sesiones), acuerdos de coalición de 2019 y 2023, y declaraciones y entrevistas del presidente con transcripción oficial de La Moncloa.",
      "Cada compromiso, contrastado con el BOE y con las votaciones del Congreso (XIV y XV).",
      "Segunda pasada (2026-10-07), con la regla de ≈ 2 entradas por año de gobierno del Estado (PSOE: desde junio de 2018, ≈ 8 años, objetivo ≈ 16): discursos de investidura de 2020 y 2023 y acuerdos de coalición de 2019 y 2023 leídos enteros, más transcripciones de La Moncloa, contrastados con la IGAE (déficit), el informe del Fondo de Reserva de la Seguridad Social, el BOE (textos consolidados) y la relación de proyectos de ley de la XV en los datos abiertos del Congreso.",
      "Tercera pasada (2026-10-07), regla de independencia de la fuente: cada dato oficial clasificado (independiente, estadística oficial o del propio Gobierno) y contrastado con AIReF (ingreso mínimo vital), Eurostat y OCDE (salario mínimo, déficit y deuda), INE, Consejo de la UE, Tribunal de Cuentas (vivienda y Plan de Recuperación), liquidación del presupuesto de la IGAE, serie de vivienda protegida del Ministerio y datos abiertos del ICO. Se añadieron corrupción (Tribunal Supremo, Congreso y Senado), Sáhara Occidental y aduanas de Ceuta y Melilla.",
    ],
    excluded: [
      { what: "Rehabilitar 500.000 viviendas para la eficiencia energética (acuerdo PSOE-SUMAR de 2023, p. 29).", why: "El acuerdo no fija plazo, y no se ha localizado una serie oficial estatal que cuente viviendas rehabilitadas terminadas con un criterio único: las ayudas las gestionan las comunidades autónomas con programas distintos (Plan de Recuperación y Plan Estatal) y no se suman en una cifra comparable." },
      { what: "Consolidar el Bono Alquiler Joven «para llegar a toda la población joven» (acuerdo de 2023, p. 30) y «aumentar el bono para el alquiler» (investidura de 2023).", why: "«Llegar a toda la población joven» no tiene una cifra que contrastar, y el bono lo resuelven y pagan las comunidades autónomas: no se ha localizado un dato oficial estatal de beneficiarios por año." },
      { what: "Elevar el parque público de alquiler asequible «hasta el 20 % del parque total de vivienda» (acuerdo de 2023, p. 29).", why: "El propio acuerdo lo sitúa «a medio y largo plazo», más allá de la legislatura: no se puede dar por incumplido al terminar esta. Lo medible de la legislatura (183.000 viviendas) ya tiene su entrada." },
      { what: "Viviendas en alquiler social financiadas por el Plan de Recuperación (objetivo de unas 20.000).", why: "Es un hito del Plan que evalúa la Comisión Europea, no un compromiso del partido con cita propia, y sus viviendas ya cuentan dentro de las 183.000 de la entrada «psoe-vivienda-183000-2023» (24.867 «Plan de Recuperación» en el dato del Ministerio): sería contar dos veces lo mismo." },
      { what: "Renovación del CGPJ y de otros órganos «mediante acuerdos parlamentarios de consenso» (acuerdo de 2019, punto 2.11.1).", why: "El compromiso es «promover acuerdos», que no se puede medir; el resultado (CGPJ renovado en julio de 2024, Defensor del Pueblo en 2021) dependía de mayorías de tres quintos que incluían al PP." },
      { what: "Temporalidad del empleo y deuda pública.", why: "No se ha encontrado en las investiduras ni en los acuerdos un compromiso con cifra u objetivo comprobable; la temporalidad está cubierta por la entrada de la reforma laboral." },
      { what: "Hitos y desembolsos del Plan de Recuperación.", why: "Son compromisos del Gobierno con la Comisión Europea evaluados por ella en cada solicitud de pago, no frases del partido; quedan fuera salvo cuando una promesa propia los cita (vivienda)." },
      { what: "«Impulsaremos un nuevo modelo de financiación autonómica» (investidura y acuerdo de 2023).", why: "No va como entrada aparte: es el mismo compromiso que la de 2020 («psoe-financiacion-autonomica-2020») y se recoge en su nota." },
      { what: "«No pactaré con Bildu».", why: "Demasiado vago para comprobarlo contra un hecho concreto." },
      { what: "«Traeré a Puigdemont».", why: "No hay un acto del partido o del Gobierno que citar como hecho." },
      { what: "Limitar los aforamientos (acuerdo de coalición de 2019, punto 2.11.7).", why: "Nunca se remitió a las Cortes: no hay ficha de iniciativa en congreso.es que sirva de prueba primaria de un «no lo hicieron»." },
      { what: "Estatuto del becario (acuerdos de 2019 y 2023).", why: "El Gobierno remitió el proyecto en marzo de 2026 y caducó sin mayoría: no está claro que dependiera del partido." },
      { what: "Reforma de la fiscalidad del gasóleo (hito 388 del Plan de Recuperación): la Comisión Europea redujo definitivamente 197.971.828 euros del apoyo a España por considerarlo no cumplido (Decisión C(2026) 5646).", why: "Es un compromiso del Gobierno con la Comisión Europea; no se ha localizado una cita del partido, de una investidura o de un acuerdo de coalición con la que contrastarlo." },
      { what: "Viviendas de alquiler social del Plan de Recuperación: el Consejo de la UE rebajó el objetivo de 20.000 a 17.365 (enero de 2026) y la Comisión propuso 15.718 (agosto de 2026), alegando la inflación.", why: "Mismo motivo que el hito anterior de vivienda: es un compromiso con la Comisión, sus viviendas ya cuentan en «psoe-vivienda-183000-2023», y la evaluación del objetivo final aún no está publicada." },
      { what: "Intervención socialista en el debate de la proposición sobre el Sáhara (6-4-2022): «el Grupo Socialista está de acuerdo con lo que se pide»; al día siguiente votó en contra.", why: SAME_DEBATE },
      { what: "Crisis de Ceuta de mayo de 2021 y devolución de menores de agosto de 2021, declarada ilegal por el Tribunal Supremo (ECLI:ES:TS:2024:114); frase del ministro del Interior «Nosotros aplicamos la ley en todo momento» (25-6-2021).", why: "La frase describe hechos pasados (las devoluciones de mayo), no es un compromiso, y la sentencia juzga las de agosto: no hay «lo que dijeron» con el que comparar." },
      { what: "Suspensión de militancia y petición del acta a Ábalos (2024), fecha de la renuncia a su escaño, fecha de la dimisión de Santos Cerdán y auditoría externa anunciada el 16-6-2025.", why: "Solo constan en prensa, o no se ha encontrado un documento primario del partido, del Congreso o del Poder Judicial que los pruebe." },
      { what: "Compromisos contra la corrupción en la investidura de 2023 y «tolerancia cero».", why: "El discurso de 2023 (DSCD-15-PL-7) no contiene un compromiso explícito contra la corrupción, y «tolerancia cero» no aparece en la moción de censura de 2018 ni en esa investidura." },
      { what: "Comunicado del Gabinete Real de Marruecos (18-3-2022) que publicó la carta del presidente.", why: "No se pudo abrir en una fuente oficial; se usa la lectura de la carta por el propio presidente en el Diario de Sesiones (DSCD-14-PL-174, p. 18)." },
    ],
  },
  {
    partyId: "pp",
    searched: [
      "Discurso de investidura de Mariano Rajoy (19-12-2011) y programa de 2011, contrastados con lo que publicó el BOE durante sus gobiernos (2011-2018).",
      "Investidura de Alberto Núñez Feijóo (2023) y pacto de gobierno en Extremadura (2023).",
      "Segunda pasada (2026-10-07), con la regla de ≈ 2 entradas por año de gobierno del Estado: investiduras de Rajoy de 2011 y de 2016 (30-8 y 26-10), programa de 2011 y transcripciones de La Moncloa, contrastados con datos oficiales de resultado (Eurostat, Ministerio de Hacienda, Banco de España) y con el BOE y el BOCG.",
      "Tercera pasada (2026-10-07), regla de independencia de la fuente: el déficit de 2012 se apoya ahora en Eurostat (serie de déficit y tabla de ayudas al sector financiero), no en la nota de Hacienda. Se añadió corrupción con el Diario de Sesiones de la comparecencia de Rajoy del 1-8-2013, votaciones del Congreso, el BOE y notas del Poder Judicial; y se buscaron compromisos sobre Ceuta, Marruecos y el Sáhara.",
    ],
    excluded: [
      { what: "«20 millones de personas trabajando en la España de 2020» (investidura del 30-8-2016).", why: "El plazo (2020) vence después de que el PP dejara el Gobierno (junio de 2018): no se puede contrastar con lo que hizo." },
      { what: "Rebaja de 2 puntos del IRPF «tan pronto como alcancemos nuestro objetivo de reducir el déficit público por debajo del 3 %» (investidura del 30-8-2016).", why: "El déficit bajó del 3 % con los datos de 2018 (2,6 %, Eurostat), que se conocieron en 2019, cuando el PP ya no gobernaba: la condición no se dio mientras podía cumplirla." },
      { what: "Subida del IVA de 2012 (Real Decreto-ley 20/2012).", why: "Ni la investidura de 2011 ni el programa de 2011 tienen un compromiso explícito sobre el tipo general del IVA; la frase «mi intención es no subir los impuestos» ya está en «pp-irpf-2011» y no se duplica." },
      { what: "Revalorización de las pensiones del 0,25 % (Ley 23/2013).", why: "No se encontró un compromiso posterior a la investidura de 2011 que diga lo contrario; el de 2012 ya está en «pp-pensiones-2012»." },
      { what: "Luis de Guindos (junio de 2012): el préstamo europeo a la banca «no tendrá coste para los ciudadanos».", why: "Solo consta en prensa; se usó la frase equivalente de la vicepresidenta del Gobierno con transcripción oficial de La Moncloa («pp-rescate-bancario-coste»)." },
      { what: "Tasas judiciales (Ley 10/2012).", why: "No hay un compromiso previo sobre tasas judiciales en la investidura ni en el programa de 2011 con el que contrastarlas." },
      { what: "«No habrá referéndum» en Cataluña (2017).", why: "Si el 1-O fue o no un referéndum está discutido; la etiqueta sería una interpretación." },
      { what: "Sentencia de Gürtel (SAN 20/2018, confirmada por la STS 507/2020): el PP, condenado como partícipe a título lucrativo; y obras de la sede de Génova pagadas en B (STS 1033/2024), con el PP como responsable civil subsidiario.", why: "Los hechos (1999–2008) son anteriores a los compromisos de 2011 y 2013 y no son actos del partido posteriores a lo que dijo; además, el Supremo recuerda que la condena a título lucrativo «presupone» la inocencia." },
      { what: "Sentencia del juicio de Kitchen.", why: "No se ha encontrado en una fuente primaria; la entrada «pp-verdad-barcenas-kitchen-2013» usa la situación procesal del auto de apertura de juicio oral (acusados)." },
      { what: "Compromisos sobre Ceuta, Marruecos o el Sáhara Occidental (2011–2018).", why: "No se encontró un compromiso explícito del PP con un resultado documentado en fuente primaria." },
    ],
  },
  {
    partyId: "vox",
    searched: [
      "Programa de las generales de 2023 y discursos de Santiago Abascal en el Pleno (moción de censura de 2020, investiduras), contrastados con las votaciones de la XIV y la XV.",
      "Se buscaron expresamente compromisos seguidos de un acto en sentido contrario.",
    ],
    excluded: [
      { what: "Abstención en el decreto de los fondos europeos (2021).", why: "No había un compromiso previo explícito: la etiqueta sería una interpretación." },
      { what: "Derogación de la ley de memoria en Aragón (Ley 1/2024).", why: "No se encontró el texto del acuerdo PP-Vox ni una cita literal de Vox." },
      { what: "Salida de los gobiernos autonómicos en julio de 2024 por el reparto de menores migrantes.", why: "Los decretos autonómicos no encajan en ningún tipo de prueba del esquema (compromisos autonómicos aún sin investigar)." },
      { what: "Protocolo antiaborto en Castilla y León.", why: "Los hechos están discutidos." },
      { what: "Revalorización de pensiones dentro del decreto ómnibus.", why: "La lectura está discutida (el decreto mezclaba varias medidas)." },
    ],
  },
  {
    partyId: "sumar",
    searched: [
      "Acuerdo de coalición PSOE-SUMAR (24-10-2023), programa de 2023 y Diario de Sesiones, contrastados con el BOE y las votaciones de la XV.",
      "Incumplimientos por falta de acto: solo entran como «no lo hicieron» si hay prueba primaria (ficha de iniciativa, disolución en el BOE); así entró la «ley mordaza».",
      "Regla de profundidad (2026-10-07): ≈ 2 entradas por año de gobierno del Estado, mínimo 4. Sumar gobierna en coalición desde noviembre de 2023 (≈ 3 años): objetivo ≈ 6. Ya tiene 10, así que en la segunda pasada no se añadió ninguna.",
      "Regla de independencia de la fuente (2026-10-07): los datos oficiales de sus entradas (línea de avales del ICO) se contrastaron con la serie estadística de actividad del ICO; ninguna etiqueta cambia.",
    ],
    excluded: [
      { what: "Rehabilitación de 500.000 viviendas, Bono Alquiler Joven para «toda la población joven» y parque público del 20 % (acuerdo PSOE-SUMAR de 2023, pp. 29-30).", why: "Mismos motivos que en el PSOE, que firmó el mismo acuerdo: sin plazo o «a medio y largo plazo», o sin un dato oficial estatal comparable (las ayudas las gestionan las comunidades autónomas)." },
      { what: "Nuevo Estatuto de los Trabajadores (Sumar dirigía el Ministerio de Trabajo).", why: "El acuerdo de coalición de 2023 no lo recoge (solo fijar en el Estatuto la subida del salario mínimo); la promesa es de la investidura de Pedro Sánchez y está como entrada del PSOE. El programa de Sumar de 2023 no se ha comprobado para este punto." },
      { what: "Estatuto del becario (acuerdo de 2023).", why: "El Gobierno remitió el proyecto en marzo de 2026 y caducó sin mayoría: no está claro que dependiera de Sumar." },
      { what: "Reforma del despido (acuerdo de 2023), herencia universal y jornada de 32 horas (programa).", why: "No hay una iniciativa con ficha en congreso.es que sirva de prueba primaria de que no se hizo." },
      { what: "Gasto en defensa.", why: "El plan de abril de 2025 fue un acuerdo del Consejo de Ministros que no se encontró en el BOE, y la votación ancla (11-6-2026, Sumar «sí») es coherente con lo que dijo." },
      { what: "Programas de armamento (programa, p. 139).", why: "Demasiado general; para el embargo a Israel se usó la intervención de su portavoz en el Pleno." },
    ],
  },
  {
    partyId: "podemos",
    searched: [
      "Programa de las generales del 10-N-2019, acuerdo de coalición de 2019 y Diario de Sesiones, contrastados con el BOE y las votaciones de la XIV (grupo GCUP-EC-GC) y la XV (voto por diputado).",
      "Regla de profundidad (2026-10-07): ≈ 2 entradas por año de gobierno del Estado, mínimo 4. Unidas Podemos gobernó en coalición de enero de 2020 a noviembre de 2023 (≈ 4 años): objetivo ≈ 8. Ya tiene 8, así que en la segunda pasada no se añadió ninguna.",
      "Regla de independencia de la fuente (2026-10-07): el presupuesto de vivienda se contrastó con la liquidación del presupuesto de la IGAE (gasto ejecutado) y con el Tribunal de Cuentas; la etiqueta no cambia.",
    ],
    excluded: [
      { what: "Nuevo Estatuto de los Trabajadores (acuerdo de coalición de 2019, punto 1.2), que no se hizo en la XIV.", why: "Ya está como entrada del PSOE con la misma prueba, y la cartera de Trabajo la llevaba Yolanda Díaz, de la cuota de Unidas Podemos pero hoy en Sumar: atribuírselo a Podemos sería discutible." },
      { what: "Gasto militar: el grupo GCUP-EC-GC votó «sí» a la sección de Defensa de los Presupuestos de 2023.", why: "El único «no lo apoyaremos» explícito es de Jaume Asens (En Comú Podem, no Podemos) y solo consta en prensa; de Podemos solo hay desacuerdo, no un compromiso." },
      { what: "Decreto de embargo de armas de octubre de 2025.", why: "Se criticó, pero no hubo una promesa explícita de votar en contra." },
      { what: "Ley de Movilidad Sostenible.", why: "Se puso una condición y después el partido se abstuvo: la etiqueta sería una interpretación." },
      { what: "Decretos de vivienda de 2026.", why: "Se pidió retirarlos, pero no hubo compromiso de votar en contra." },
      { what: "Discurso de investidura de 2020 de Pablo Iglesias como fuente.", why: "El enlace oficial del Diario de Sesiones devolvía error; se usó el programa." },
      { what: "«Si quieren los votos de Podemos, tiene que haber impuesto a las grandes energéticas» (21-11-2024).", why: SAME_DEBATE },
    ],
  },
  {
    partyId: "erc",
    searched: NACIONALISTAS_SEARCHED,
    excluded: [
      { what: "Rufián (2015): «en 18 meses dejaré mi escaño».", why: "Lo ligaba a la independencia de Cataluña: si se incumplió está discutido." },
      { what: "Estrems (25-11-2025): votarían a favor de toda propuesta para frenar la subida de la vivienda y «nunca» en contra.", why: "Después votaron «no» a puntos de mociones del PP sobre vivienda; si esos puntos tenían ese fin es una interpretación." },
      { what: "Derogar la «ley mordaza» (programa).", why: "Dice «derogar» y no se comprobó si la proposición de 2024 la deroga entera." },
      { what: "Compromisos del Govern de la Generalitat.", why: "Compromisos autonómicos aún sin investigar (DOGC y Parlament)." },
    ],
  },
  {
    partyId: "junts",
    searched: NACIONALISTAS_SEARCHED,
    excluded: [
      { what: "Nogueras (10-1-2024): «no els podem acompanyar»; Junts no votó y los decretos salieron.", why: "Ambiguo: no votaron «sí»." },
      { what: "«Bloqueo de la legislatura» (finales de 2025).", why: "El propio partido dijo que cinco leyes quedaban fuera y no se encontró una fuente primaria que las liste." },
      { what: "«Mai votarem uns pressupostos…» y «sin nuestros siete votos no hay presupuestos».", why: "En la XV no se votó ningún presupuesto: no se puede comprobar." },
      { what: "Madrenas (25-11-2025): «no ens trobaran avalant ni una sola mesura més».", why: "Votaron «no» a los decretos de vivienda del Gobierno pero «sí» a tres puntos de una moción del PSOE: demasiado matizado para una etiqueta." },
      { what: "Compromisos del Govern de la Generalitat.", why: "Compromisos autonómicos aún sin investigar (DOGC y Parlament)." },
    ],
  },
  {
    partyId: "eh-bildu",
    searched: NACIONALISTAS_SEARCHED,
    excluded: [
      { what: "Cita de vivienda del programa de 2023.", why: "Enumera un logro pasado, no un compromiso, y la ley es anterior al programa." },
      { what: "Matute (8-4-2025) sobre el Concierto Económico.", why: SAME_DEBATE },
    ],
  },
  {
    partyId: "pnv",
    searched: NACIONALISTAS_SEARCHED,
    excluded: [
      { what: "Arraigo y reparto de menores migrantes.", why: "Ya no están entre las preguntas, y el compromiso sobre arraigo no se corresponde bien con la votación." },
      { what: "Compromisos del Gobierno Vasco.", why: "Compromisos autonómicos aún sin investigar (BOPV y Parlamento Vasco)." },
    ],
  },
  {
    partyId: "bng",
    searched: NACIONALISTAS_SEARCHED,
    excluded: [],
  },
  {
    partyId: "cc",
    searched: [
      "Intervenciones de su diputada en el Congreso (XV) contrastadas con su voto, y compromisos de la investidura de Fernando Clavijo en el Parlamento de Canarias (2023) contrastados con las normas publicadas en el BOE.",
    ],
    excluded: [
      { what: "Rebaja del IGIC del 7 % al 5 %.", why: "El tipo sigue en el 7 %, pero la promesa era condicionada («una vez constatemos la realidad de las cuentas») y la legislatura canaria sigue hasta 2027: aún no hay fin de legislatura sin norma." },
      { what: "Cambio de voto en la investidura de 2023.", why: "Solo consta en prensa y está discutido." },
      { what: "Menores migrantes no acompañados.", why: "Las únicas declaraciones eran del mismo día de las votaciones y no eran compromisos." },
      { what: "Rebaja del impuesto de combustibles en La Palma, La Gomera y El Hierro.", why: "No se encontró un acto en el BOE." },
    ],
  },
  {
    partyId: "upn",
    searched: [
      "Intervenciones de su diputado en el Pleno de la XV contrastadas con su voto (atribuido por diputado). UPN no gobierna en Navarra desde 2019.",
    ],
    excluded: [
      { what: "Reforma laboral de 2022: la dirección anunció «sí» y sus dos diputados votaron «no».", why: "Quién es «el partido» en ese caso está discutido, y no hay atribución de diputados de UPN para la XIV." },
      { what: "Voto en la investidura de 2023.", why: "Votación por llamamiento: el Diario no da los nombres." },
      { what: "Jornada de 37,5 horas y competencias de inmigración para Cataluña (2025).", why: SAME_DEBATE },
    ],
  },
  {
    partyId: "compromis",
    searched: [
      "Programa de 2019 (no tuvo programa propio de generales en 2023), intervenciones de Joan Baldoví (XIV) y Àgueda Micó (XV) y prensa, contrastadas con su voto (atribuido por diputado).",
      "Se buscaron expresamente compromisos incumplidos de Baldoví y Micó.",
    ],
    excluded: [
      { what: "Micó (marzo de 2025): votarían en contra de la ley de inmigración PSOE-Junts si no se cerraban los CIE; en septiembre votó «sí» a la toma en consideración.", why: "Solo hay paráfrasis de prensa, la condición se refería a la negociación del texto y no a la primera votación, y la ley no ha terminado su trámite." },
      { what: "Baldoví (2020-2022): dejarían de apoyar al Gobierno si no cumplía con la financiación autonómica.", why: "Si el Gobierno cumplió está discutido: los plazos se ampliaron por acuerdo." },
      { what: "Voto contra la quinta prórroga del estado de alarma (2020) y voto a favor del impuesto a la banca (2024).", why: "Son anuncios de voto seguidos de ese voto, no compromisos sobre algo que hacer después." },
      { what: "Inmigración (competencias para Cataluña) y tauromaquia (2025).", why: SAME_DEBATE },
      { what: "Oposición al Cupo vasco (2017).", why: "Es de la XII legislatura, que el esquema de pruebas no cubre." },
    ],
  },
];
