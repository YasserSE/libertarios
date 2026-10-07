/*
 * Textos de la página de resultado de «¿A quién votar? Objetivamente».
 *
 * Las cuatro tablas están completas: `ca`, `gl` y `eu` se tipan como
 * `ResultStrings`, así que una clave nueva en `es` sin traducir no compila.
 * ⚠️ Los textos ca, gl y eu son traducción automática PENDIENTE DE REVISIÓN
 * NATIVA (ver `docs/AFINIDAD-CAMBIOS.md`). Son textos políticamente sensibles:
 * una palabra con carga en una traducción rompe la neutralidad igual que en
 * castellano.
 *
 * Reglas de redacción (plan §1): a los partidos se les describe por lo que
 * dicen y votan, nunca por lo que «son»; sin adjetivos valorativos; un hueco
 * se llama hueco («datos insuficientes», «sin historial»), nunca 0.
 *
 * Sin React a propósito: la ruta de la imagen OG también lo importa y corre
 * con la condición react-server, donde `createContext` no existe. Por eso los
 * componentes reciben los textos por props.
 *
 * Vive aquí y no en `dictionaries/*.ts` porque los diccionarios generales los
 * posee otro paquete (WP9) y el módulo tiene que estar completo en cuatro
 * idiomas aunque el resto del sitio no lo esté.
 */
import { pick } from "./lang";

export type ResultLang = "es" | "ca" | "gl" | "eu";

const es = {
  pageTitle: "Tu resultado",
  loading: "Calculando tu resultado…",
  election: "Elecciones generales del 29 de noviembre de 2026",
  noData: "Los datos del test aún no están cargados. Vuelve en unos días.",
  invalidTitle: "Este enlace no contiene un resultado válido",
  invalidBody:
    "Puede estar cortado o ser de una versión anterior del cuestionario. Haz el test: son unos 3 minutos.",
  tooFewTitle: "Has respondido {n} de {total} afirmaciones",
  tooFewBody:
    "Con menos de {min} respuestas cualquier orden de partidos sería ruido. Responde algunas más para ver tu resultado.",
  retake: "Hacer el test",
  retakeAgain: "Repetir el test",
  staleNotice:
    "Los datos se han actualizado desde que se creó este enlace. El resultado se ha recalculado con los datos actuales.",
  headlineEyebrow: "Tu partido más afín",
  headlineTie: "Empate en primera posición",
  figureProgramme: "programa",
  figureRecord: "votos en el Congreso",
  insufficient: "datos insuficientes",
  noRecord: "sin historial en el Congreso",
  basedOn: "basado en {n} de {m} respuestas",
  basisProgramme: "Ordenado solo por programa: no hay votaciones suficientes para comparar.",
  basisRecord: "Ordenado solo por votaciones: el programa no trata suficientes de tus respuestas.",
  basisBoth: "El orden usa la media de programa y votos; las dos cifras se muestran por separado.",
  noUsable: "Ningún partido tiene datos suficientes sobre tus respuestas para compararlo.",
  rankingTitle: "Todos los partidos",
  rankingIntro: "Programa y votos, por separado. Sin dato no cuenta en contra.",
  tie: "empate",
  programmeYear: "programa {year}",
  programmeYearUpdate: "programa {year} — se actualizará con el de 2026",
  statusPending: "coalición por confirmar",
  coherence: "sus votos coinciden con su programa en {n} de {m}",
  showAll: "Ver todos los partidos ({n} más)",
  showLess: "Ver solo los que se presentan en tu comunidad",
  surpriseTitle: "Tu sorpresa",
  surpriseBody: "En {topic} coincides más con {party} que con {ref}.",
  // «Tu sorpresa» con su alcance: una medida concreta o el tema entero (solo
  // si el partido gana en dos o más preguntas del tema y en la media).
  surpriseMeasure: "En «{label}» coincides más con {party} que con {ref}.",
  surpriseMeasureContext:
    "Es una medida concreta. En el conjunto de {topic} coincides un {p} con {party} y un {r} con {ref}.",
  surpriseTopic: "En {topic} coincides más con {party} que con {ref} ({p} frente a {r}).",
  seeWhy: "Ver por qué",
  contradictionsCount: "{n} preguntas en las que se aleja de ti",
  contradictionsCountOne: "1 pregunta en la que se aleja de ti",
  onlyProgramme: "solo programa",
  rowDetails: "Detalles de {party}",
  partyPage: "Ficha del partido",
  legendTitle: "Leyenda",
  cell_match: "Coincide",
  cell_near: "A medias",
  cell_opposite: "Opuesta",
  cell_none: "Sin dato",
  cell_skipped: "No respondida",
  gridAsText: "Ver en texto, con todas las fuentes",
  gridCell: "{party} · {question}: {state}. Ver fuentes",
  gridYou: "Tú",
  pvrSame: "{n} de {m} en el mismo sentido",
  pvrDiffers: "distinto sentido",
  readMore: "Leer más",
  readLess: "Leer menos",
  contradictionsTitle: "Donde {party} te contradice",
  contradictionsIntroUsual: "Las preguntas en las que el partido que sueles votar más se aleja de tus respuestas.",
  contradictionsIntroTop: "Las preguntas en las que tu primer partido más se aleja de tus respuestas.",
  contradictionsNone: "No hay ninguna pregunta en la que se aleje dos puntos o más de tu respuesta.",
  you: "Tú",
  lensProgramme: "Programa",
  lensRecord: "Votos",
  pvrTitle: "Promesa frente a hechos",
  pvrIntro: "Lo que prometen frente a lo que votan.",
  pvrMeanGap: "Distancia media entre programa y votos: {gap} sobre 4, en {n} preguntas con ambos datos.",
  pvrNoPairs: "No hay preguntas con programa y votación a la vez.",
  pvrNoItems: "En las preguntas con ambos datos, programa y voto van en el mismo sentido.",
  said: "Lo que dijeron",
  promised: "Lo que prometieron",
  voted: "Lo que votaron",
  noQuote: "Sin cita recogida en la hemeroteca.",
  noProgramme: "El programa no trata este asunto o falta verificarlo.",
  noVote: "Sin votación registrada.",
  page: "pág. {page}",
  groupVote: "voto del grupo: {vote}",
  vote_si: "sí",
  vote_no: "no",
  vote_abstencion: "abstención",
  vote_ausente: "no votó",
  openCongreso: "ver en congreso.es",
  source: "fuente",
  video: "ver vídeo",
  videoFrom: "ver vídeo (desde {t})",
  archive: "copia archivada",
  breakdownTitle: "Pregunta a pregunta",
  breakdownIntro: "Toca un punto para ver sus fuentes.",
  // Temas del dataset (`Question.topic` es un identificador, no un texto).
  topics: {
    vivienda: "vivienda",
    impuestos: "impuestos",
    trabajo: "trabajo",
    seguridad: "seguridad",
    "modelo-territorial": "modelo territorial",
    energia: "energía",
    prostitucion: "prostitución",
    defensa: "defensa",
    banca: "banca",
    transparencia: "transparencia",
    corrupcion: "lucha contra la corrupción",
    exterior: "relaciones exteriores",
    cultura: "cultura",
  } as Record<string, string>,
  skipped: "No respondida",
  important: "Te importa",
  answer_m2: "Muy en contra",
  answer_m1: "En contra",
  answer_p1: "A favor",
  answer_p2: "Muy a favor",
  pos_m2: "muy en contra",
  pos_m1: "en contra",
  pos_0: "ni a favor ni en contra",
  pos_p1: "a favor",
  pos_p2: "muy a favor",
  noPosition: "sin posición",
  pending: "pendiente de verificar",
  contested: "posición discutida",
  seeSources: "ver fuentes",
  sourcesFor: "Fuentes de {party} en esta pregunta",
  noSources: "Sin fuentes verificadas para esta celda.",
  shareTitle: "Comparte tu resultado",
  shareIntro: "El enlace lleva tus respuestas, no tu nombre ni tu correo.",
  shareAnon: "Compartir sin decir mi partido",
  shareAnonHint: "Se comparte solo el test, sin tu resultado.",
  shareText: "Mi resultado en «¿A quién votar? Objetivamente»: {party} — programa {p}, votos {v}. ¿Y el tuyo?",
  shareTextGeneric:
    "«¿A quién votar? Objetivamente»: 15 afirmaciones, 3 minutos. Qué partido dice lo que tú piensas y cuál lo ha votado.",
  shareDocTitle: "¿A quién votar? Objetivamente",
  copyLink: "Copiar enlace",
  copied: "¡Copiado!",
  shareNative: "Compartir",
  copiedToast: "¡Enlace copiado al portapapeles!",
  copyError: "No se pudo copiar el enlace",
  shareError: "Error al compartir",
  notifyTitle: "Avísame cuando entren los programas de 2026",
  notifyBody: "Un solo correo, cuando estén. Lista aparte: no es una afiliación.",
  emailLabel: "Correo electrónico",
  consentLabel: "Acepto que se use mi correo solo para este aviso.",
  submit: "Avísame",
  sending: "Enviando…",
  success: "Hecho. Te avisaremos cuando estén los programas de 2026.",
  error: "No se pudo guardar. Inténtalo más tarde.",
  errorInvalidEmail: "Revisa el correo: no parece una dirección válida.",
  errorConsent: "Para avisarte necesitamos que marques la casilla de consentimiento.",
  ogTitle: "¿A quién votar? Objetivamente",
  ogSubtitle: "{n} medidas · 3 minutos · programa frente a votos · sin afiliación",
  ogMyResult: "Mi resultado",
  ogProgramme: "programa",
  ogRecord: "votos",
  ogSurprise: "me sorprendió coincidir con {party} en {topic}",
  // «Sigue explorando»: va al final, después del detalle, nunca antes del
  // ranking (plan, actualización §7). Dice quién está detrás del test sin
  // rodeos y describe cada página por lo que hace, no por lo que defiende.
  exploreEyebrow: "Sigue explorando",
  exploreTitle: "Otros tests de Libertarios.eu",
  exploreIntro:
    "Este test es un proyecto de Libertarios.eu. Si quieres seguir poniendo a prueba tus ideas, estos son los otros tests del sitio.",
  exploreLangNote: "Estas páginas están en castellano.",
  exploreQuadrantTitle: "Test del cuadrante político",
  exploreQuadrantBody:
    "Sitúa tus ideas en dos ejes, económico y social, y compáralas con países, partidos y pensadores.",
  exploreQuadrantShort: "Cuadrante político",
  exploreLearnTitle: "Desafía tus creencias",
  exploreLearnBody: "Ocho medidas que suenan justas. Adivina qué provocan y compruébalo con los estudios.",
  exploreLearnShort: "Desafía tus creencias",
  exploreMeasuresTitle: "Medidas y efectos",
  exploreMeasuresBody:
    "Qué buscan las medidas más debatidas y qué ha medido la evidencia después, con las fuentes.",
  exploreMeasuresShort: "Medidas y efectos",
  // Invitación al cuadrante (`QuadrantInvite`): se elige con las respuestas
  // de la persona a las preguntas de impuestos (`lib/afinidad/lean.ts`), nunca
  // con partidos. {n} = respuestas que han contado.
  inviteLibertadTitle: "Tus respuestas apuntan a más libertad económica.",
  inviteLibertadBody: "¿Y en lo personal? Descubre si tu perfil es libertario.",
  inviteIntervencionTitle: "Tus respuestas apuntan a más intervención económica.",
  inviteIntervencionBody: "¿Dónde estás en libertad personal?",
  inviteMixtoTitle: "¿Dónde estás en libertad económica y personal?",
  inviteMixtoBody: "Descúbrelo en 3 minutos.",
  inviteCta: "Hacer el test del cuadrante",
  inviteFootnote: "Calculado solo con tus {n} respuestas sobre impuestos; no se guarda.",
};

export type ResultStrings = typeof es;

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const ca: ResultStrings = {
  pageTitle: "El teu resultat",
  loading: "Calculant el teu resultat…",
  election: "Eleccions generals del 29 de novembre de 2026",
  noData: "Les dades del test encara no s'han carregat. Torna d'aquí a uns dies.",
  invalidTitle: "Aquest enllaç no conté un resultat vàlid",
  invalidBody:
    "Pot estar tallat o ser d'una versió anterior del qüestionari. Fes el test: són uns 3 minuts.",
  tooFewTitle: "Has respost {n} de {total} afirmacions",
  tooFewBody:
    "Amb menys de {min} respostes qualsevol ordre de partits seria soroll. Respon-ne algunes més per veure el teu resultat.",
  retake: "Fer el test",
  retakeAgain: "Repetir el test",
  staleNotice:
    "Les dades s'han actualitzat des que es va crear aquest enllaç. El resultat s'ha recalculat amb les dades actuals.",
  headlineEyebrow: "El teu partit més afí",
  headlineTie: "Empat en primera posició",
  figureProgramme: "programa",
  figureRecord: "vots al Congrés",
  insufficient: "dades insuficients",
  noRecord: "sense historial al Congrés",
  basedOn: "basat en {n} de {m} respostes",
  basisProgramme: "Ordenat només pel programa: no hi ha prou votacions per comparar.",
  basisRecord: "Ordenat només per les votacions: el programa no tracta prou respostes teves.",
  basisBoth: "L'ordre fa servir la mitjana de programa i vots; les dues xifres es mostren per separat.",
  noUsable: "Cap partit no té prou dades sobre les teves respostes per comparar-lo.",
  rankingTitle: "Tots els partits",
  rankingIntro: "Programa i vots, per separat. Sense dada no compta en contra.",
  tie: "empat",
  programmeYear: "programa {year}",
  programmeYearUpdate: "programa {year} — s'actualitzarà amb el de 2026",
  statusPending: "coalició per confirmar",
  coherence: "els seus vots coincideixen amb el seu programa en {n} de {m}",
  showAll: "Veure tots els partits ({n} més)",
  showLess: "Veure només els que es presenten a la teva comunitat",
  surpriseTitle: "La teva sorpresa",
  surpriseBody: "En {topic} coincideixes més amb {party} que amb {ref}.",
  surpriseMeasure: "En «{label}» coincideixes més amb {party} que amb {ref}.",
  surpriseMeasureContext:
    "És una mesura concreta. En el conjunt de {topic} coincideixes un {p} amb {party} i un {r} amb {ref}.",
  surpriseTopic: "En {topic} coincideixes més amb {party} que amb {ref} ({p} davant {r}).",
  seeWhy: "Veure per què",
  contradictionsCount: "{n} preguntes en què s'allunya de tu",
  contradictionsCountOne: "1 pregunta en què s'allunya de tu",
  onlyProgramme: "només programa",
  rowDetails: "Detalls de {party}",
  partyPage: "Fitxa del partit",
  legendTitle: "Llegenda",
  cell_match: "Coincideix",
  cell_near: "A mitges",
  cell_opposite: "Oposada",
  cell_none: "Sense dada",
  cell_skipped: "No resposta",
  gridAsText: "Veure-ho en text, amb totes les fonts",
  gridCell: "{party} · {question}: {state}. Veure fonts",
  gridYou: "Tu",
  pvrSame: "{n} de {m} en el mateix sentit",
  pvrDiffers: "sentit diferent",
  readMore: "Llegir més",
  readLess: "Llegir menys",
  contradictionsTitle: "On {party} et contradiu",
  contradictionsIntroUsual: "Les preguntes en què el partit que acostumes a votar més s'allunya de les teves respostes.",
  contradictionsIntroTop: "Les preguntes en què el teu primer partit més s'allunya de les teves respostes.",
  contradictionsNone: "No hi ha cap pregunta en què s'allunyi dos punts o més de la teva resposta.",
  you: "Tu",
  lensProgramme: "Programa",
  lensRecord: "Vots",
  pvrTitle: "Promesa davant fets",
  pvrIntro: "El que prometen davant el que voten.",
  pvrMeanGap: "Distància mitjana entre programa i vots: {gap} sobre 4, en {n} preguntes amb les dues dades.",
  pvrNoPairs: "No hi ha preguntes amb programa i votació alhora.",
  pvrNoItems: "En les preguntes amb les dues dades, programa i vot van en el mateix sentit.",
  said: "El que van dir",
  promised: "El que van prometre",
  voted: "El que van votar",
  noQuote: "Sense cita recollida a l'hemeroteca.",
  noProgramme: "El programa no tracta aquest assumpte o falta verificar-ho.",
  noVote: "Sense votació registrada.",
  page: "pàg. {page}",
  groupVote: "vot del grup: {vote}",
  vote_si: "sí",
  vote_no: "no",
  vote_abstencion: "abstenció",
  vote_ausente: "no va votar",
  openCongreso: "veure a congreso.es",
  source: "font",
  video: "veure el vídeo",
  videoFrom: "veure el vídeo (des de {t})",
  archive: "còpia arxivada",
  breakdownTitle: "Pregunta a pregunta",
  breakdownIntro: "Toca un punt per veure'n les fonts.",
  topics: {
    vivienda: "habitatge", impuestos: "impostos", trabajo: "treball", seguridad: "seguretat",
    "modelo-territorial": "model territorial", energia: "energia", prostitucion: "prostitució",
    defensa: "defensa", banca: "banca", transparencia: "transparència", cultura: "cultura",
    corrupcion: "lluita contra la corrupció", exterior: "relacions exteriors",
  },
  skipped: "No resposta",
  important: "T'importa",
  answer_m2: "Molt en contra",
  answer_m1: "En contra",
  answer_p1: "A favor",
  answer_p2: "Molt a favor",
  pos_m2: "molt en contra",
  pos_m1: "en contra",
  pos_0: "ni a favor ni en contra",
  pos_p1: "a favor",
  pos_p2: "molt a favor",
  noPosition: "sense posició",
  pending: "pendent de verificar",
  contested: "posició discutida",
  seeSources: "veure fonts",
  sourcesFor: "Fonts de {party} en aquesta pregunta",
  noSources: "Sense fonts verificades per a aquesta cel·la.",
  shareTitle: "Comparteix el teu resultat",
  shareIntro: "L'enllaç porta les teves respostes, no el teu nom ni el teu correu.",
  shareAnon: "Compartir sense dir el meu partit",
  shareAnonHint: "Només es comparteix el test, sense el teu resultat.",
  shareText: "El meu resultat a «A qui votar? Objectivament»: {party} — programa {p}, vots {v}. I el teu?",
  shareTextGeneric:
    "«A qui votar? Objectivament»: 15 afirmacions, 3 minuts. Quin partit diu el que tu penses i quin ho ha votat.",
  shareDocTitle: "A qui votar? Objectivament",
  copyLink: "Copiar l'enllaç",
  copied: "Copiat!",
  shareNative: "Compartir",
  copiedToast: "Enllaç copiat al porta-retalls!",
  copyError: "No s'ha pogut copiar l'enllaç",
  shareError: "Error en compartir",
  notifyTitle: "Avisa'm quan arribin els programes de 2026",
  notifyBody: "Un sol correu, quan hi siguin. Llista a part: no és una afiliació.",
  emailLabel: "Correu electrònic",
  consentLabel: "Accepto que el meu correu s'utilitzi només per a aquest avís.",
  submit: "Avisa'm",
  sending: "Enviant…",
  success: "Fet. T'avisarem quan hi hagi els programes de 2026.",
  error: "No s'ha pogut desar. Torna-ho a provar més tard.",
  errorInvalidEmail: "Revisa el correu: no sembla una adreça vàlida.",
  errorConsent: "Per avisar-te cal que marquis la casella de consentiment.",
  ogTitle: "A qui votar? Objectivament",
  ogSubtitle: "{n} mesures · 3 minuts · programa davant vots · sense afiliació",
  ogMyResult: "El meu resultat",
  ogProgramme: "programa",
  ogRecord: "vots",
  ogSurprise: "em va sorprendre coincidir amb {party} en {topic}",
  exploreEyebrow: "Continua explorant",
  exploreTitle: "Altres tests de Libertarios.eu",
  exploreIntro:
    "Aquest test és un projecte de Libertarios.eu. Si vols continuar posant a prova les teves idees, aquests són els altres tests del web.",
  exploreLangNote: "Aquestes pàgines estan en castellà.",
  exploreQuadrantTitle: "Test del quadrant polític",
  exploreQuadrantBody:
    "Situa les teves idees en dos eixos, econòmic i social, i compara-les amb països, partits i pensadors.",
  exploreQuadrantShort: "Quadrant polític",
  exploreLearnTitle: "Desafia les teves creences",
  exploreLearnBody: "Vuit mesures que sonen justes. Endevina què provoquen i comprova-ho amb els estudis.",
  exploreLearnShort: "Desafia les teves creences",
  exploreMeasuresTitle: "Mesures i efectes",
  exploreMeasuresBody:
    "Què busquen les mesures més debatudes i què n'ha mesurat l'evidència després, amb les fonts.",
  exploreMeasuresShort: "Mesures i efectes",
  inviteLibertadTitle: "Les teves respostes apunten a més llibertat econòmica.",
  inviteLibertadBody: "I en l'àmbit personal? Descobreix si el teu perfil és llibertari.",
  inviteIntervencionTitle: "Les teves respostes apunten a més intervenció econòmica.",
  inviteIntervencionBody: "On et situes en llibertat personal?",
  inviteMixtoTitle: "On et situes en llibertat econòmica i personal?",
  inviteMixtoBody: "Descobreix-ho en 3 minuts.",
  inviteCta: "Fer el test del quadrant",
  inviteFootnote: "Calculat només amb les teves {n} respostes sobre impostos; no es desa.",
};

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const gl: ResultStrings = {
  pageTitle: "O teu resultado",
  loading: "Calculando o teu resultado…",
  election: "Eleccións xerais do 29 de novembro de 2026",
  noData: "Os datos do test aínda non están cargados. Volve dentro duns días.",
  invalidTitle: "Esta ligazón non contén un resultado válido",
  invalidBody:
    "Pode estar cortada ou ser dunha versión anterior do cuestionario. Fai o test: son uns 3 minutos.",
  tooFewTitle: "Respondiches {n} de {total} afirmacións",
  tooFewBody:
    "Con menos de {min} respostas calquera orde de partidos sería ruído. Responde algunhas máis para ver o teu resultado.",
  retake: "Facer o test",
  retakeAgain: "Repetir o test",
  staleNotice:
    "Os datos actualizáronse desde que se creou esta ligazón. O resultado recalculouse cos datos actuais.",
  headlineEyebrow: "O teu partido máis afín",
  headlineTie: "Empate na primeira posición",
  figureProgramme: "programa",
  figureRecord: "votos no Congreso",
  insufficient: "datos insuficientes",
  noRecord: "sen historial no Congreso",
  basedOn: "baseado en {n} de {m} respostas",
  basisProgramme: "Ordenado só polo programa: non hai votacións dabondo para comparar.",
  basisRecord: "Ordenado só polas votacións: o programa non trata dabondo as túas respostas.",
  basisBoth: "A orde usa a media de programa e votos; as dúas cifras móstranse por separado.",
  noUsable: "Ningún partido ten datos dabondo sobre as túas respostas para comparalo.",
  rankingTitle: "Todos os partidos",
  rankingIntro: "Programa e votos, por separado. Sen dato non conta en contra.",
  tie: "empate",
  programmeYear: "programa {year}",
  programmeYearUpdate: "programa {year} — actualizarase co de 2026",
  statusPending: "coalición por confirmar",
  coherence: "os seus votos coinciden co seu programa en {n} de {m}",
  showAll: "Ver todos os partidos ({n} máis)",
  showLess: "Ver só os que se presentan na túa comunidade",
  surpriseTitle: "A túa sorpresa",
  surpriseBody: "En {topic} coincides máis con {party} ca con {ref}.",
  surpriseMeasure: "En «{label}» coincides máis con {party} ca con {ref}.",
  surpriseMeasureContext:
    "É unha medida concreta. No conxunto de {topic} coincides un {p} con {party} e un {r} con {ref}.",
  surpriseTopic: "En {topic} coincides máis con {party} ca con {ref} ({p} fronte a {r}).",
  seeWhy: "Ver por que",
  contradictionsCount: "{n} preguntas nas que se afasta de ti",
  contradictionsCountOne: "1 pregunta na que se afasta de ti",
  onlyProgramme: "só programa",
  rowDetails: "Detalles de {party}",
  partyPage: "Ficha do partido",
  legendTitle: "Lenda",
  cell_match: "Coincide",
  cell_near: "A medias",
  cell_opposite: "Oposta",
  cell_none: "Sen dato",
  cell_skipped: "Non respondida",
  gridAsText: "Ver en texto, con todas as fontes",
  gridCell: "{party} · {question}: {state}. Ver fontes",
  gridYou: "Ti",
  pvrSame: "{n} de {m} no mesmo sentido",
  pvrDiffers: "sentido distinto",
  readMore: "Ler máis",
  readLess: "Ler menos",
  contradictionsTitle: "Onde {party} te contradí",
  contradictionsIntroUsual: "As preguntas nas que o partido que adoitas votar máis se afasta das túas respostas.",
  contradictionsIntroTop: "As preguntas nas que o teu primeiro partido máis se afasta das túas respostas.",
  contradictionsNone: "Non hai ningunha pregunta na que se afaste dous puntos ou máis da túa resposta.",
  you: "Ti",
  lensProgramme: "Programa",
  lensRecord: "Votos",
  pvrTitle: "Promesa fronte a feitos",
  pvrIntro: "O que prometen fronte ao que votan.",
  pvrMeanGap: "Distancia media entre programa e votos: {gap} sobre 4, en {n} preguntas con ambos os datos.",
  pvrNoPairs: "Non hai preguntas con programa e votación á vez.",
  pvrNoItems: "Nas preguntas con ambos os datos, programa e voto van no mesmo sentido.",
  said: "O que dixeron",
  promised: "O que prometeron",
  voted: "O que votaron",
  noQuote: "Sen cita recollida na hemeroteca.",
  noProgramme: "O programa non trata este asunto ou falta verificalo.",
  noVote: "Sen votación rexistrada.",
  page: "páx. {page}",
  groupVote: "voto do grupo: {vote}",
  vote_si: "si",
  vote_no: "non",
  vote_abstencion: "abstención",
  vote_ausente: "non votou",
  openCongreso: "ver en congreso.es",
  source: "fonte",
  video: "ver o vídeo",
  videoFrom: "ver o vídeo (desde {t})",
  archive: "copia arquivada",
  breakdownTitle: "Pregunta a pregunta",
  breakdownIntro: "Toca un punto para ver as súas fontes.",
  topics: {
    vivienda: "vivenda", impuestos: "impostos", trabajo: "traballo", seguridad: "seguridade",
    "modelo-territorial": "modelo territorial", energia: "enerxía", prostitucion: "prostitución",
    defensa: "defensa", banca: "banca", transparencia: "transparencia", cultura: "cultura",
    corrupcion: "loita contra a corrupción", exterior: "relacións exteriores",
  },
  skipped: "Non respondida",
  important: "Impórtache",
  answer_m2: "Moi en contra",
  answer_m1: "En contra",
  answer_p1: "A favor",
  answer_p2: "Moi a favor",
  pos_m2: "moi en contra",
  pos_m1: "en contra",
  pos_0: "nin a favor nin en contra",
  pos_p1: "a favor",
  pos_p2: "moi a favor",
  noPosition: "sen posición",
  pending: "pendente de verificar",
  contested: "posición discutida",
  seeSources: "ver fontes",
  sourcesFor: "Fontes de {party} nesta pregunta",
  noSources: "Sen fontes verificadas para esta cela.",
  shareTitle: "Comparte o teu resultado",
  shareIntro: "A ligazón leva as túas respostas, non o teu nome nin o teu correo.",
  shareAnon: "Compartir sen dicir o meu partido",
  shareAnonHint: "Compártese só o test, sen o teu resultado.",
  shareText: "O meu resultado en «A quen votar? Obxectivamente»: {party} — programa {p}, votos {v}. E o teu?",
  shareTextGeneric:
    "«A quen votar? Obxectivamente»: 15 afirmacións, 3 minutos. Que partido di o que ti pensas e cal o votou.",
  shareDocTitle: "A quen votar? Obxectivamente",
  copyLink: "Copiar a ligazón",
  copied: "Copiado!",
  shareNative: "Compartir",
  copiedToast: "Ligazón copiada no portapapeis!",
  copyError: "Non se puido copiar a ligazón",
  shareError: "Erro ao compartir",
  notifyTitle: "Avísame cando cheguen os programas de 2026",
  notifyBody: "Un só correo, cando estean. Lista á parte: non é unha afiliación.",
  emailLabel: "Correo electrónico",
  consentLabel: "Acepto que se use o meu correo só para este aviso.",
  submit: "Avísame",
  sending: "Enviando…",
  success: "Feito. Avisarémoste cando estean os programas de 2026.",
  error: "Non se puido gardar. Téntao máis tarde.",
  errorInvalidEmail: "Revisa o correo: non parece un enderezo válido.",
  errorConsent: "Para avisarte cómpre que marques a caixa de consentimento.",
  ogTitle: "A quen votar? Obxectivamente",
  ogSubtitle: "{n} medidas · 3 minutos · programa fronte a votos · sen afiliación",
  ogMyResult: "O meu resultado",
  ogProgramme: "programa",
  ogRecord: "votos",
  ogSurprise: "sorprendeume coincidir con {party} en {topic}",
  exploreEyebrow: "Segue explorando",
  exploreTitle: "Outros tests de Libertarios.eu",
  exploreIntro:
    "Este test é un proxecto de Libertarios.eu. Se queres seguir poñendo a proba as túas ideas, estes son os outros tests do sitio.",
  exploreLangNote: "Estas páxinas están en castelán.",
  exploreQuadrantTitle: "Test do cadrante político",
  exploreQuadrantBody:
    "Sitúa as túas ideas en dous eixos, económico e social, e compáraas con países, partidos e pensadores.",
  exploreQuadrantShort: "Cadrante político",
  exploreLearnTitle: "Desafía as túas crenzas",
  exploreLearnBody: "Oito medidas que soan xustas. Adiviña que provocan e compróbao cos estudos.",
  exploreLearnShort: "Desafía as túas crenzas",
  exploreMeasuresTitle: "Medidas e efectos",
  exploreMeasuresBody:
    "Que buscan as medidas máis debatidas e que mediu a evidencia despois, coas fontes.",
  exploreMeasuresShort: "Medidas e efectos",
  inviteLibertadTitle: "As túas respostas apuntan a máis liberdade económica.",
  inviteLibertadBody: "E no persoal? Descobre se o teu perfil é libertario.",
  inviteIntervencionTitle: "As túas respostas apuntan a máis intervención económica.",
  inviteIntervencionBody: "Onde estás en liberdade persoal?",
  inviteMixtoTitle: "Onde estás en liberdade económica e persoal?",
  inviteMixtoBody: "Descóbreo en 3 minutos.",
  inviteCta: "Facer o test do cadrante",
  inviteFootnote: "Calculado só coas túas {n} respostas sobre impostos; non se garda.",
};

// Traducción automática pendiente de revisión nativa (docs/AFINIDAD-CAMBIOS.md).
const eu: ResultStrings = {
  pageTitle: "Zure emaitza",
  loading: "Zure emaitza kalkulatzen…",
  election: "2026ko azaroaren 29ko hauteskunde orokorrak",
  noData: "Testaren datuak oraindik ez daude kargatuta. Itzuli egun batzuk barru.",
  invalidTitle: "Esteka honek ez du emaitza baliozkorik",
  invalidBody:
    "Moztuta egon daiteke, edo galdetegiaren aurreko bertsio batekoa izan. Egin testa: 3 minutu inguru dira.",
  tooFewTitle: "{total} baieztapenetatik {n} erantzun dituzu",
  tooFewBody:
    "{min} erantzun baino gutxiagorekin, alderdien edozein ordena zarata litzateke. Erantzun beste batzuk zure emaitza ikusteko.",
  retake: "Egin testa",
  retakeAgain: "Errepikatu testa",
  staleNotice:
    "Datuak eguneratu egin dira esteka hau sortu zenetik. Emaitza egungo datuekin kalkulatu da berriro.",
  headlineEyebrow: "Zuretzat alderdirik hurbilena",
  headlineTie: "Berdinketa lehen postuan",
  figureProgramme: "programa",
  figureRecord: "botoak Kongresuan",
  insufficient: "datu nahikorik ez",
  noRecord: "Kongresuan historiarik gabe",
  basedOn: "{n} / {m} erantzunetan oinarritua",
  basisProgramme: "Programaren arabera soilik ordenatua: ez dago bozketa nahikorik alderatzeko.",
  basisRecord: "Bozketen arabera soilik ordenatua: programak ez ditu zure erantzun nahikoak jorratzen.",
  basisBoth: "Ordenak programaren eta botoen batez bestekoa erabiltzen du; bi zifrak bereizita erakusten dira.",
  noUsable: "Alderdi batek ere ez du zure erantzunei buruzko datu nahikorik alderatu ahal izateko.",
  rankingTitle: "Alderdi guztiak",
  rankingIntro: "Programa eta botoak, bereizita. Daturik ez egoteak ez du kontra egiten.",
  tie: "berdinketa",
  programmeYear: "{year}ko programa",
  programmeYearUpdate: "{year}ko programa — 2026koarekin eguneratuko da",
  statusPending: "koalizioa berresteke",
  coherence: "haren botoak programarekin bat datoz: {n} / {m}",
  showAll: "Ikusi alderdi guztiak (beste {n})",
  showLess: "Ikusi zure erkidegoan aurkezten direnak soilik",
  surpriseTitle: "Zure ezustekoa",
  surpriseBody: "{topic} gaian {party}(r)ekin {ref}(r)ekin baino gehiago bat zatoz.",
  surpriseMeasure: "«{label}» neurrian {party}(r)ekin {ref}(r)ekin baino gehiago bat zatoz.",
  surpriseMeasureContext:
    "Neurri zehatz bat da. {topic} gai osoan {p} bat zatoz {party}(r)ekin eta {r} {ref}(r)ekin.",
  surpriseTopic: "{topic} gaian {party}(r)ekin {ref}(r)ekin baino gehiago bat zatoz ({p} / {r}).",
  seeWhy: "Ikusi zergatik",
  contradictionsCount: "Zuregandik urruntzen den {n} galdera",
  contradictionsCountOne: "Zuregandik urruntzen den galdera bat",
  onlyProgramme: "programa soilik",
  rowDetails: "{party}: xehetasunak",
  partyPage: "Alderdiaren fitxa",
  legendTitle: "Legenda",
  cell_match: "Bat dator",
  cell_near: "Erdizka",
  cell_opposite: "Kontrakoa",
  cell_none: "Daturik ez",
  cell_skipped: "Erantzun gabea",
  gridAsText: "Ikusi testu gisa, iturri guztiekin",
  gridCell: "{party} · {question}: {state}. Ikusi iturriak",
  gridYou: "Zu",
  pvrSame: "{n} / {m} norabide berean",
  pvrDiffers: "beste norabide batean",
  readMore: "Irakurri gehiago",
  readLess: "Irakurri gutxiago",
  contradictionsTitle: "{party}(e)k non kontraesaten zaituen",
  contradictionsIntroUsual: "Normalean bozkatzen duzun alderdia zure erantzunetatik gehien urruntzen den galderak.",
  contradictionsIntroTop: "Zure lehen alderdia zure erantzunetatik gehien urruntzen den galderak.",
  contradictionsNone: "Ez dago zure erantzunetik bi puntu edo gehiago urruntzen den galderarik.",
  you: "Zu",
  lensProgramme: "Programa",
  lensRecord: "Botoak",
  pvrTitle: "Promesak eta egintzak",
  pvrIntro: "Agintzen dutena eta bozkatzen dutena.",
  pvrMeanGap: "Programaren eta botoen arteko batez besteko distantzia: {gap} (0-4 eskalan), bi datuak dituzten {n} galderatan.",
  pvrNoPairs: "Ez dago programa eta bozketa aldi berean dituen galderarik.",
  pvrNoItems: "Bi datuak dituzten galderetan, programa eta botoa norabide berean doaz.",
  said: "Esan zutena",
  promised: "Agindu zutena",
  voted: "Bozkatu zutena",
  noQuote: "Ez dago hemerotekan jasotako aipurik.",
  noProgramme: "Programak ez du gai hau jorratzen, edo egiaztatzeke dago.",
  noVote: "Ez dago bozketarik erregistratuta.",
  page: "or. {page}",
  groupVote: "taldearen botoa: {vote}",
  vote_si: "bai",
  vote_no: "ez",
  vote_abstencion: "abstentzioa",
  vote_ausente: "ez zuen bozkatu",
  openCongreso: "ikusi congreso.es webgunean",
  source: "iturria",
  video: "ikusi bideoa",
  videoFrom: "ikusi bideoa (hemendik: {t})",
  archive: "artxibatutako kopia",
  breakdownTitle: "Galderaz galdera",
  breakdownIntro: "Sakatu puntu bat haren iturriak ikusteko.",
  topics: {
    vivienda: "etxebizitza", impuestos: "zergak", trabajo: "lana", seguridad: "segurtasuna",
    "modelo-territorial": "lurralde-eredua", energia: "energia", prostitucion: "prostituzioa",
    defensa: "defentsa", banca: "banka", transparencia: "gardentasuna", cultura: "kultura",
    corrupcion: "ustelkeriaren aurkako borroka", exterior: "kanpo-harremanak",
  },
  skipped: "Erantzun gabea",
  important: "Garrantzitsua zaizu",
  answer_m2: "Erabat aurka",
  answer_m1: "Aurka",
  answer_p1: "Alde",
  answer_p2: "Erabat alde",
  pos_m2: "erabat aurka",
  pos_m1: "aurka",
  pos_0: "ez alde ez aurka",
  pos_p1: "alde",
  pos_p2: "erabat alde",
  noPosition: "jarrerarik gabe",
  pending: "egiaztatzeke",
  contested: "jarrera eztabaidatua",
  seeSources: "ikusi iturriak",
  sourcesFor: "{party}(r)en iturriak galdera honetan",
  noSources: "Gelaxka honetarako ez dago iturri egiaztaturik.",
  shareTitle: "Partekatu zure emaitza",
  shareIntro: "Estekak zure erantzunak daramatza, ez zure izena edo helbide elektronikoa.",
  shareAnon: "Partekatu nire alderdia esan gabe",
  shareAnonHint: "Testa bakarrik partekatzen da, zure emaitzarik gabe.",
  shareText: "Nire emaitza «Nori bozkatu? Objektiboki» testean: {party} — programa {p}, botoak {v}. Eta zurea?",
  shareTextGeneric:
    "«Nori bozkatu? Objektiboki»: 15 baieztapen, 3 minutu. Zein alderdik dio zuk pentsatzen duzuna, eta zeinek bozkatu du.",
  shareDocTitle: "Nori bozkatu? Objektiboki",
  copyLink: "Kopiatu esteka",
  copied: "Kopiatuta!",
  shareNative: "Partekatu",
  copiedToast: "Esteka arbelean kopiatu da!",
  copyError: "Ezin izan da esteka kopiatu",
  shareError: "Errorea partekatzean",
  notifyTitle: "Abisatu 2026ko programak iristen direnean",
  notifyBody: "Mezu bakarra, prest daudenean. Zerrenda bereizia: ez da afiliazio bat.",
  emailLabel: "Helbide elektronikoa",
  consentLabel: "Onartzen dut nire helbide elektronikoa abisu honetarako soilik erabiltzea.",
  submit: "Abisatu",
  sending: "Bidaltzen…",
  success: "Eginda. 2026ko programak prest daudenean abisatuko dizugu.",
  error: "Ezin izan da gorde. Saiatu berriro geroago.",
  errorInvalidEmail: "Begiratu helbidea: ez dirudi baliozkoa.",
  errorConsent: "Abisatzeko, baimen-laukia markatu behar duzu.",
  ogTitle: "Nori bozkatu? Objektiboki",
  ogSubtitle: "{n} neurri · 3 minutu · programa eta botoak · afiliaziorik gabe",
  ogMyResult: "Nire emaitza",
  ogProgramme: "programa",
  ogRecord: "botoak",
  ogSurprise: "harritu ninduen {party}(r)ekin bat etortzeak {topic} gaian",
  exploreEyebrow: "Jarraitu arakatzen",
  exploreTitle: "Libertarios.eu-ren beste test batzuk",
  exploreIntro:
    "Test hau Libertarios.eu-ren proiektu bat da. Zure ideiak probatzen jarraitu nahi baduzu, hauek dira webguneko beste testak.",
  exploreLangNote: "Orri hauek gaztelaniaz daude.",
  exploreQuadrantTitle: "Koadrante politikoaren testa",
  exploreQuadrantBody:
    "Kokatu zure ideiak bi ardatzetan, ekonomikoan eta sozialean, eta alderatu herrialde, alderdi eta pentsalariekin.",
  exploreQuadrantShort: "Koadrante politikoa",
  exploreLearnTitle: "Zalantzan jarri zure sinesmenak",
  exploreLearnBody: "Zuzenak diruditen zortzi neurri. Asmatu zer eragiten duten eta egiaztatu ikerketekin.",
  exploreLearnShort: "Zalantzan jarri zure sinesmenak",
  exploreMeasuresTitle: "Neurriak eta ondorioak",
  exploreMeasuresBody:
    "Zer bilatzen duten neurri eztabaidatuenek eta zer neurtu duen ebidentziak gero, iturriekin.",
  exploreMeasuresShort: "Neurriak eta ondorioak",
  inviteLibertadTitle: "Zure erantzunek askatasun ekonomiko handiagoa adierazten dute.",
  inviteLibertadBody: "Eta alderdi pertsonalean? Jakin zure profila libertarioa den.",
  inviteIntervencionTitle: "Zure erantzunek esku-hartze ekonomiko handiagoa adierazten dute.",
  inviteIntervencionBody: "Non zaude askatasun pertsonalean?",
  inviteMixtoTitle: "Non zaude askatasun ekonomikoan eta pertsonalean?",
  inviteMixtoBody: "Jakin ezazu 3 minututan.",
  inviteCta: "Egin koadrantearen testa",
  inviteFootnote: "Zergei buruzko zure {n} erantzunekin bakarrik kalkulatua; ez da gordetzen.",
};

const DICTS: Record<ResultLang, ResultStrings> = { es, ca, gl, eu };

export function isResultLang(v: string | null | undefined): v is ResultLang {
  return v === "es" || v === "ca" || v === "gl" || v === "eu";
}

/**
 * Textos para un idioma. Acepta cualquier cadena porque el idioma llega de la
 * ruta o de `?l=` en la imagen OG, y un idioma del sitio sin traducción del
 * módulo (pt, fr…) cae entero al castellano. Las cuatro tablas están completas
 * (el tipo `ResultStrings` lo exige), así que no hay mezcla clave a clave.
 */
export function getResultStrings(locale: string | null | undefined): ResultStrings {
  return pick<ResultStrings>(DICTS, locale ?? "es");
}

/** Sustituye `{clave}` por su valor. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/**
 * Porcentaje entero con espacio fino delante del signo, como manda la RAE.
 * Se redondea a entero a propósito: un decimal sugeriría una precisión que
 * quince preguntas no tienen.
 */
export function pct(value: number): string {
  return `${Math.round(value * 100)}\u202f%`;
}

/** Etiqueta de una respuesta de la persona (escala de 4 puntos). */
export function answerLabel(t: ResultStrings, value: number): string {
  return value <= -2 ? t.answer_m2 : value < 0 ? t.answer_m1 : value >= 2 ? t.answer_p2 : t.answer_p1;
}

/**
 * Etiqueta de la posición de un partido. Una celda `contested` puntúa con la
 * media (puede ser 0,5 o 1,5): se redondea solo para el texto, alejándose del
 * cero, porque la media de dos codificaciones del mismo lado sigue en ese lado.
 */
export function positionLabel(t: ResultStrings, position: number): string {
  const r = position === 0 ? 0 : Math.sign(position) * Math.ceil(Math.abs(position) - 1e-9);
  const clamped = Math.max(-2, Math.min(2, r));
  return [t.pos_m2, t.pos_m1, t.pos_0, t.pos_p1, t.pos_p2][clamped + 2];
}

const DATE_LOCALES: Record<ResultLang, string> = { es: "es-ES", ca: "ca-ES", gl: "gl-ES", eu: "eu-ES" };

/**
 * Fecha AAAA-MM-DD legible. En UTC para que la misma votación no salga con un
 * día de diferencia según la zona horaria de quien la mira; si la cadena no es
 * una fecha, se devuelve tal cual antes que inventar otra.
 */
export function formatDate(iso: string, locale: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  const tag = DATE_LOCALES[isResultLang(locale) ? locale : "es"];
  try {
    return new Intl.DateTimeFormat(tag, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
  } catch {
    return iso;
  }
}

/** Nombre legible de un tema (`Question.topic` es un identificador). */
export function topicLabel(t: ResultStrings, topic: string): string {
  return t.topics[topic] ?? topic.replace(/-/g, " ");
}

/**
 * Nombre corto de una medida. `label` llega ya en la lengua de la página
 * (`localizeDataset` lo traduce, o lo quita si falta la traducción); si no
 * hay, el enunciado en la lengua pedida.
 */
export function measureLabel(
  q: { label?: string; text: { es: string } & Partial<Record<string, string>> },
  lang: string,
): string {
  return q.label ?? q.text[lang] ?? q.text.es;
}

/**
 * La frase de «Tu sorpresa» con su alcance. Con una sola pregunta se nombra la
 * medida y se añade el contexto del tema; el tema entero solo cuando el
 * partido gana en varias preguntas del tema y también en la media.
 */
export function surpriseSentence(
  t: ResultStrings,
  s: {
    scope: "medida" | "tema";
    topic: string;
    topicAgreement: { party: number | null; reference: number | null };
  },
  names: { party: string; ref: string; label: string },
): { main: string; context: string | null } {
  const topic = topicLabel(t, s.topic);
  const { party, reference } = s.topicAgreement;
  if (s.scope === "tema" && party !== null && reference !== null) {
    return {
      main: fmt(t.surpriseTopic, { topic, party: names.party, ref: names.ref, p: pct(party), r: pct(reference) }),
      context: null,
    };
  }
  return {
    main: fmt(t.surpriseMeasure, { label: names.label, party: names.party, ref: names.ref }),
    context:
      party !== null && reference !== null
        ? fmt(t.surpriseMeasureContext, { topic, party: names.party, ref: names.ref, p: pct(party), r: pct(reference) })
        : null,
  };
}

/**
 * Rótulo de una fila (revisión, rejilla del resultado, ficha de partido): la
 * medida (`label`, ya localizada por `localizeDataset`) o, si no la hay en esa
 * lengua, el tema traducido, para no mezclar idiomas en una lista entera. El
 * enunciado completo va siempre al lado o en la etiqueta accesible.
 *
 * Fuera del castellano solo se usa `label` si es la traducción de esa lengua:
 * una pregunta sin localizar (con la etiqueta castellana) cae al tema.
 */
export function rowLabel(
  t: ResultStrings,
  q: { label?: string; topic: string; i18n?: unknown },
  lang: string,
): string {
  return q.label && (lang === "es" || isLocalizedLabel(q, lang)) ? q.label : topicLabel(t, q.topic);
}

function isLocalizedLabel(q: { label?: string; i18n?: unknown }, lang: string): boolean {
  const tr = (q.i18n as Partial<Record<string, { label?: string }>> | undefined)?.[lang];
  return tr?.label === q.label;
}

/** Las cuatro tablas sin mezclar, para el test de completitud (`afinidad-i18n.test.ts`). */
export const RESULT_TABLES = { es, ca, gl, eu } as const;
