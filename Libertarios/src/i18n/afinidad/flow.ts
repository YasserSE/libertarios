/**
 * Textos del flujo de «¿A quién votar? Objetivamente» (intro, contexto,
 * preguntas, revisión, cabecera y pie).
 *
 * ca, gl y eu están completos (el tipo lo exige: no hay caída al castellano
 * clave a clave), pero son TRADUCCIONES AUTOMÁTICAS PENDIENTES DE REVISIÓN
 * HUMANA para que el módulo funcione en los cuatro idiomas desde el lanzamiento
 * (plan §«Idiomas»); una persona nativa debe revisarlas antes de publicar, y el
 * registro de esa revisión va en `docs/AFINIDAD-CAMBIOS.md`. Un `locale` que no
 * sea de las cuatro lenguas (p. ej. `pt`) recibe el castellano.
 *
 * Por qué un fichero aparte y no `dictionaries/*.ts`: el módulo tiene su propio
 * layout y su propio tono (neutral, sin la voz del sitio matriz), y los
 * diccionarios del sitio los mantiene otro paquete de trabajo (WP9). Si se
 * integran después, la forma de este objeto se puede copiar tal cual.
 *
 * Reglas del copy: neutral; ningún adjetivo valorativo sobre partidos; se
 * describe lo que dicen y votan, no lo que «son».
 */

import type { Question } from "@/data/afinidad/types";
import { AFINIDAD_LOCALES } from "@/i18n/config";
import { isAfinidadLang, type AfinidadLang } from "./lang";

export type { AfinidadLang };
/** Las cuatro lenguas del módulo (las mismas que `AFINIDAD_LOCALES` del sitio). */
export const AFINIDAD_LANGS: readonly AfinidadLang[] = AFINIDAD_LOCALES;

/** Idioma del módulo a partir del segmento `[locale]`; lo desconocido cae a `es`. */
export function resolveAfinidadLang(locale: string | null | undefined): AfinidadLang {
  return isAfinidadLang(locale) ? locale : "es";
}

/** Enunciado en el idioma pedido; si falta la traducción, el original. */
export function questionText(q: Question, lang: AfinidadLang): string {
  return q.text[lang] ?? q.text.es;
}

export interface FlowStrings {
  brand: string;
  meta: { title: string; description: string };
  header: { home: string };
  footer: {
    projectOf: string;
    notAffiliated: string;
    methodology: string;
    data: string;
    correct: string;
    nav: string;
  };
  intro: {
    election: string;
    title: string;
    /** Titular de la portada en dos partes; la segunda va resaltada. */
    heroLead: string;
    heroAccent: string;
    promise: (n: number) => string;
    minutes: string;
    notAffiliated: string;
    howTitle: string;
    programme: { title: string; body: string };
    record: { title: string; body: string };
    hemeroteca: { title: string; body: string };
    programmeYear: string;
    privacy: string;
    cta: string;
    resume: (answered: number, total: number) => string;
    restart: string;
    seeLast: string;
    lastTitle: string;
    lastBody: string;
    preparing: string;
    preparingBody: string;
    /** Distintivo junto al título: neutralidad y fuentes, en una línea. */
    badge: string;
    /** Una línea que lleva a «Dijeron vs. hicieron». */
    dvhTeaser: string;
  };
  /** Subnavegación del módulo (metodología, datos, dijeron vs. hicieron). */
  nav: { label: string };
  context: {
    step: (n: number, total: number) => string;
    optional: string;
    regionTitle: string;
    regionHelp: string;
    voteTitle: string;
    voteHelp: string;
    preferNot: string;
    otherVote: string;
    showAll: (n: number) => string;
    pendingCoalition: string;
    back: string;
    toQuestions: string;
  };
  question: {
    counter: (n: number, total: number) => string;
    answered: (n: number) => string;
    progressLabel: string;
    scale: { [-2]: string; [-1]: string; 1: string; 2: string };
    skip: string;
    important: string;
    importantHelp: string;
    keyboardHint: string;
    prev: string;
    next: string;
    toReview: string;
    restart: string;
    options: string;
  };
  review: {
    title: string;
    intro: string;
    unanswered: (n: number) => string;
    notEnough: (min: number, missing: number) => string;
    noAnswer: string;
    skipped: string;
    edit: string;
    important: string;
    whatItMeasures: string;
    submit: string;
    restart: string;
    /** Consentimiento explícito para el agregado anónimo (RGPD art. 9). */
    contribute: { label: string; info: string; more: string };
  };
  /** Selector de idioma de la cabecera. */
  languages: { label: string; names: Record<AfinidadLang, string> };
  empty: { title: string; body: string; back: string };
  /** Comunidades y ciudades autónomas por código INE (01–19). */
  regions: Record<string, string>;
}

const es: FlowStrings = {
  brand: "¿A quién votar? Objetivamente",
  meta: {
    title: "¿A quién votar? Objetivamente — Elecciones generales 29-N-2026",
    description:
      "15 afirmaciones, 3 minutos: qué partido dice lo que tú piensas y cuál lo ha votado. Con la fuente de cada dato.",
  },
  header: { home: "Inicio del test" },
  footer: {
    projectOf: "Un proyecto de",
    notAffiliated: "No afiliado a ningún partido",
    methodology: "Metodología",
    data: "Datos abiertos",
    correct: "Corregir un dato",
    nav: "Información del proyecto",
  },
  intro: {
    election: "Elecciones generales · 29 de noviembre de 2026",
    title: "¿A quién votar? Objetivamente",
    heroLead: "¿A quién votar?",
    heroAccent: "Objetivamente",
    promise: (n) =>
      `${n} afirmaciones, 3 minutos: qué partido dice lo que tú piensas y cuál lo ha votado.`,
    minutes: "3 minutos",
    notAffiliated: "No estamos afiliados a ningún partido.",
    howTitle: "Cómo funciona",
    programme: {
      title: "Programa",
      body: "Lo que prometen, con la página",
    },
    record: {
      title: "Votos en el Congreso",
      body: "Lo que votaron, con el enlace",
    },
    hemeroteca: {
      title: "Lo que dijeron",
      body: "Con fecha y fuente. No puntúa",
    },
    programmeYear:
      "Mientras no se publiquen los programas de 2026 se usan los de 2023, y se indica en cada dato.",
    privacy: "Sin registro. Tus respuestas se quedan en tu navegador.",
    cta: "Empezar",
    resume: (answered, total) => `Continuar (${answered} de ${total})`,
    restart: "Empezar de cero",
    seeLast: "Ver mi último resultado",
    lastTitle: "Ya hiciste el test",
    lastBody: "Puedes volver a ver tu resultado o repetirlo.",
    preparing: "Test en preparación",
    preparingBody:
      "Estamos verificando las fuentes de cada afirmación. Publicaremos el test cuando cada dato tenga su fuente.",
    badge: "Sin afiliación a ningún partido · Fuentes abiertas",
    dvhTeaser: "¿Cumplen lo que dicen? Compruébalo",
  },
  nav: { label: "Sobre este test" },
  context: {
    step: (n, total) => `Paso ${n} de ${total}`,
    optional: "Opcional",
    regionTitle: "¿En qué comunidad votas?",
    regionHelp: "Para incluir los partidos de tu comunidad.",
    voteTitle: "¿A quién sueles votar?",
    voteHelp:
      "Anónimo. No cambia el cálculo.",
    preferNot: "Prefiero no decirlo",
    otherVote: "Otro partido, en blanco o no voto",
    showAll: (n) => `Ver todos los partidos (${n} más)`,
    pendingCoalition: "coalición por confirmar",
    back: "Atrás",
    toQuestions: "Ir a las preguntas",
  },
  question: {
    counter: (n, total) => `Afirmación ${n} de ${total}`,
    answered: (n) => `${n} respondidas`,
    progressLabel: "Afirmaciones contestadas",
    scale: { [-2]: "Muy en contra", [-1]: "En contra", 1: "A favor", 2: "Muy a favor" },
    skip: "No sé",
    important: "Esto me importa",
    importantHelp: "Cuenta el doble",
    keyboardHint: "Teclas: 1–4 para responder, 5 = No sé, I = Esto me importa, flechas para moverte.",
    prev: "Anterior",
    next: "Siguiente",
    toReview: "Revisar respuestas",
    restart: "Reiniciar",
    options: "Respuestas",
  },
  review: {
    title: "Revisa tus respuestas",
    intro: "Toca una para cambiarla.",
    unanswered: (n) => `Te quedan ${n} sin responder. Puedes seguir: el cálculo solo usa lo que has contestado.`,
    notEnough: (min, missing) =>
      `Para dar un resultado hacen falta al menos ${min} respuestas. Te faltan ${missing}.`,
    noAnswer: "Sin responder",
    skipped: "No sé",
    edit: "Cambiar",
    important: "Esto me importa",
    whatItMeasures: "Qué mide",
    submit: "Ver mi resultado",
    restart: "Empezar de nuevo",
    contribute: {
      label: "Sumar mis respuestas, anónimas, a las estadísticas",
      info: "Sin correo ni IP, con la fecha truncada al día. Solo se publican agregados de 20 personas o más, y nunca entre el 24 y el 29 de noviembre. Si no lo marcas, no se guarda nada.",
      more: "¿Qué se guarda?",
    },
  },
  languages: {
    label: "Idioma",
    names: { es: "Castellano", ca: "Català", gl: "Galego", eu: "Euskara" },
  },
  empty: {
    title: "Test en preparación",
    body: "Aún no hay afirmaciones con todas sus fuentes verificadas. No publicamos preguntas sin fuente.",
    back: "Volver al inicio",
  },
  regions: {
    "01": "Andalucía",
    "02": "Aragón",
    "03": "Asturias",
    "04": "Illes Balears",
    "05": "Canarias",
    "06": "Cantabria",
    "07": "Castilla y León",
    "08": "Castilla-La Mancha",
    "09": "Cataluña",
    "10": "Comunitat Valenciana",
    "11": "Extremadura",
    "12": "Galicia",
    "13": "Comunidad de Madrid",
    "14": "Región de Murcia",
    "15": "Navarra",
    "16": "País Vasco",
    "17": "La Rioja",
    "18": "Ceuta",
    "19": "Melilla",
  },
};

// Traducción automática pendiente de revisión humana.
const ca: FlowStrings = {
  brand: "A qui votar? Objectivament",
  meta: {
    title: "A qui votar? Objectivament — Eleccions generals 29-N-2026",
    description:
      "15 afirmacions, 3 minuts: quin partit diu el que tu penses i quin ho ha votat. Amb la font de cada dada.",
  },
  header: { home: "Inici del test" },
  footer: {
    projectOf: "Un projecte de",
    notAffiliated: "No afiliat a cap partit",
    methodology: "Metodologia",
    data: "Dades obertes",
    correct: "Corregir una dada",
    nav: "Informació del projecte",
  },
  intro: {
    election: "Eleccions generals · 29 de novembre de 2026",
    title: "A qui votar? Objectivament",
    heroLead: "A qui votar?",
    heroAccent: "Objectivament",
    promise: (n) => `${n} afirmacions, 3 minuts: quin partit diu el que tu penses i quin ho ha votat.`,
    minutes: "3 minuts",
    notAffiliated: "No estem afiliats a cap partit.",
    howTitle: "Com funciona",
    programme: {
      title: "Programa",
      body: "El que prometen, amb la pàgina",
    },
    record: {
      title: "Vots al Congrés",
      body: "El que van votar, amb l'enllaç",
    },
    hemeroteca: {
      title: "El que van dir",
      body: "Amb data i font. No puntua",
    },
    programmeYear:
      "Mentre no es publiquin els programes del 2026 s'utilitzen els del 2023, i s'indica a cada dada.",
    privacy: "Sense registre. Les teves respostes es queden al teu navegador.",
    cta: "Començar",
    resume: (answered, total) => `Continuar (${answered} de ${total})`,
    restart: "Començar de zero",
    seeLast: "Veure el meu darrer resultat",
    lastTitle: "Ja has fet el test",
    lastBody: "Pots tornar a veure el resultat o repetir-lo.",
    preparing: "Test en preparació",
    preparingBody:
      "Estem verificant les fonts de cada afirmació. Publicarem el test quan cada dada tingui la seva font.",
    badge: "Sense afiliació a cap partit · Fonts obertes",
    dvhTeaser: "Compleixen el que diuen? Comprova-ho",
  },
  nav: { label: "Sobre aquest test" },
  context: {
    step: (n, total) => `Pas ${n} de ${total}`,
    optional: "Opcional",
    regionTitle: "A quina comunitat votes?",
    regionHelp: "Per incloure els partits de la teva comunitat.",
    voteTitle: "A qui acostumes a votar?",
    voteHelp:
      "Anònim. No canvia el càlcul.",
    preferNot: "Prefereixo no dir-ho",
    otherVote: "Un altre partit, en blanc o no voto",
    showAll: (n) => `Veure tots els partits (${n} més)`,
    pendingCoalition: "coalició per confirmar",
    back: "Enrere",
    toQuestions: "Anar a les preguntes",
  },
  question: {
    counter: (n, total) => `Afirmació ${n} de ${total}`,
    answered: (n) => `${n} respostes`,
    progressLabel: "Afirmacions contestades",
    scale: { [-2]: "Molt en contra", [-1]: "En contra", 1: "A favor", 2: "Molt a favor" },
    skip: "No ho sé",
    important: "Això m'importa",
    importantHelp: "Compta el doble",
    keyboardHint: "Tecles: 1–4 per respondre, 5 = No ho sé, I = Això m'importa, fletxes per moure't.",
    prev: "Anterior",
    next: "Següent",
    toReview: "Revisar respostes",
    restart: "Reiniciar",
    options: "Respostes",
  },
  review: {
    title: "Revisa les teves respostes",
    intro: "Toca'n una per canviar-la.",
    unanswered: (n) => `Te'n queden ${n} sense respondre. Pots continuar: el càlcul només fa servir el que has contestat.`,
    notEnough: (min, missing) =>
      `Per donar un resultat calen almenys ${min} respostes. Te'n falten ${missing}.`,
    noAnswer: "Sense resposta",
    skipped: "No ho sé",
    edit: "Canviar",
    important: "Això m'importa",
    whatItMeasures: "Què mesura",
    submit: "Veure el meu resultat",
    restart: "Tornar a començar",
    contribute: {
      label: "Sumar les meves respostes, anònimes, a les estadístiques",
      info: "Sense correu ni IP, amb la data truncada al dia. Només es publiquen agregats de 20 persones o més, i mai entre el 24 i el 29 de novembre. Si no ho marques, no es desa res.",
      more: "Què es desa?",
    },
  },
  languages: {
    label: "Idioma",
    names: { es: "Castellano", ca: "Català", gl: "Galego", eu: "Euskara" },
  },
  empty: {
    title: "Test en preparació",
    body: "Encara no hi ha afirmacions amb totes les fonts verificades. No publiquem preguntes sense font.",
    back: "Tornar a l'inici",
  },
  regions: {
    "01": "Andalusia",
    "02": "Aragó",
    "03": "Astúries",
    "04": "Illes Balears",
    "05": "Canàries",
    "06": "Cantàbria",
    "07": "Castella i Lleó",
    "08": "Castella-la Manxa",
    "09": "Catalunya",
    "10": "Comunitat Valenciana",
    "11": "Extremadura",
    "12": "Galícia",
    "13": "Comunitat de Madrid",
    "14": "Regió de Múrcia",
    "15": "Navarra",
    "16": "País Basc",
    "17": "La Rioja",
    "18": "Ceuta",
    "19": "Melilla",
  },
};

// Tradución automática pendente de revisión humana.
const gl: FlowStrings = {
  brand: "A quen votar? Obxectivamente",
  meta: {
    title: "A quen votar? Obxectivamente — Eleccións xerais 29-N-2026",
    description:
      "15 afirmacións, 3 minutos: que partido di o que ti pensas e cal o votou. Coa fonte de cada dato.",
  },
  header: { home: "Inicio do test" },
  footer: {
    projectOf: "Un proxecto de",
    notAffiliated: "Non afiliado a ningún partido",
    methodology: "Metodoloxía",
    data: "Datos abertos",
    correct: "Corrixir un dato",
    nav: "Información do proxecto",
  },
  intro: {
    election: "Eleccións xerais · 29 de novembro de 2026",
    title: "A quen votar? Obxectivamente",
    heroLead: "A quen votar?",
    heroAccent: "Obxectivamente",
    promise: (n) => `${n} afirmacións, 3 minutos: que partido di o que ti pensas e cal o votou.`,
    minutes: "3 minutos",
    notAffiliated: "Non estamos afiliados a ningún partido.",
    howTitle: "Como funciona",
    programme: {
      title: "Programa",
      body: "O que prometen, coa páxina",
    },
    record: {
      title: "Votos no Congreso",
      body: "O que votaron, coa ligazón",
    },
    hemeroteca: {
      title: "O que dixeron",
      body: "Con data e fonte. Non puntúa",
    },
    programmeYear:
      "Mentres non se publiquen os programas de 2026 úsanse os de 2023, e indícase en cada dato.",
    privacy: "Sen rexistro. As túas respostas quedan no teu navegador.",
    cta: "Comezar",
    resume: (answered, total) => `Continuar (${answered} de ${total})`,
    restart: "Comezar de cero",
    seeLast: "Ver o meu último resultado",
    lastTitle: "Xa fixeches o test",
    lastBody: "Podes volver ver o teu resultado ou repetilo.",
    preparing: "Test en preparación",
    preparingBody:
      "Estamos a verificar as fontes de cada afirmación. Publicaremos o test cando cada dato teña a súa fonte.",
    badge: "Sen afiliación a ningún partido · Fontes abertas",
    dvhTeaser: "Cumpren o que din? Compróbao",
  },
  nav: { label: "Sobre este test" },
  context: {
    step: (n, total) => `Paso ${n} de ${total}`,
    optional: "Opcional",
    regionTitle: "En que comunidade votas?",
    regionHelp: "Para incluír os partidos da túa comunidade.",
    voteTitle: "A quen adoitas votar?",
    voteHelp:
      "Anónimo. Non cambia o cálculo.",
    preferNot: "Prefiro non dicilo",
    otherVote: "Outro partido, en branco ou non voto",
    showAll: (n) => `Ver todos os partidos (${n} máis)`,
    pendingCoalition: "coalición por confirmar",
    back: "Atrás",
    toQuestions: "Ir ás preguntas",
  },
  question: {
    counter: (n, total) => `Afirmación ${n} de ${total}`,
    answered: (n) => `${n} respondidas`,
    progressLabel: "Afirmacións contestadas",
    scale: { [-2]: "Moi en contra", [-1]: "En contra", 1: "A favor", 2: "Moi a favor" },
    skip: "Non sei",
    important: "Isto impórtame",
    importantHelp: "Conta o dobre",
    keyboardHint: "Teclas: 1–4 para responder, 5 = Non sei, I = Isto impórtame, frechas para moverte.",
    prev: "Anterior",
    next: "Seguinte",
    toReview: "Revisar respostas",
    restart: "Reiniciar",
    options: "Respostas",
  },
  review: {
    title: "Revisa as túas respostas",
    intro: "Toca unha para cambiala.",
    unanswered: (n) => `Quédanche ${n} sen responder. Podes seguir: o cálculo só usa o que contestaches.`,
    notEnough: (min, missing) =>
      `Para dar un resultado fan falta polo menos ${min} respostas. Fáltanche ${missing}.`,
    noAnswer: "Sen responder",
    skipped: "Non sei",
    edit: "Cambiar",
    important: "Isto impórtame",
    whatItMeasures: "Que mide",
    submit: "Ver o meu resultado",
    restart: "Comezar de novo",
    contribute: {
      label: "Sumar as miñas respostas, anónimas, ás estatísticas",
      info: "Sen correo nin IP, coa data truncada ao día. Só se publican agregados de 20 persoas ou máis, e nunca entre o 24 e o 29 de novembro. Se non o marcas, non se garda nada.",
      more: "Que se garda?",
    },
  },
  languages: {
    label: "Idioma",
    names: { es: "Castellano", ca: "Català", gl: "Galego", eu: "Euskara" },
  },
  empty: {
    title: "Test en preparación",
    body: "Aínda non hai afirmacións con todas as súas fontes verificadas. Non publicamos preguntas sen fonte.",
    back: "Volver ao inicio",
  },
  regions: {
    "01": "Andalucía",
    "02": "Aragón",
    "03": "Asturias",
    "04": "Illas Baleares",
    "05": "Canarias",
    "06": "Cantabria",
    "07": "Castela e León",
    "08": "Castela-A Mancha",
    "09": "Cataluña",
    "10": "Comunidade Valenciana",
    "11": "Estremadura",
    "12": "Galicia",
    "13": "Comunidade de Madrid",
    "14": "Rexión de Murcia",
    "15": "Navarra",
    "16": "País Vasco",
    "17": "A Rioxa",
    "18": "Ceuta",
    "19": "Melilla",
  },
};

// Itzulpen automatikoa, giza berrikuspenaren zain (pendiente de revisión humana).
const eu: FlowStrings = {
  brand: "Nori bozkatu? Objektiboki",
  meta: {
    title: "Nori bozkatu? Objektiboki — Hauteskunde orokorrak 2026-11-29",
    description:
      "15 baieztapen, 3 minutu: zein alderdik dio zuk pentsatzen duzuna eta zeinek bozkatu duen. Datu bakoitzaren iturriarekin.",
  },
  header: { home: "Testaren hasiera" },
  footer: {
    projectOf: "Proiektu honen egilea:",
    notAffiliated: "Ez dago inongo alderdiri lotuta",
    methodology: "Metodologia",
    data: "Datu irekiak",
    correct: "Datu bat zuzendu",
    nav: "Proiektuari buruzko informazioa",
  },
  intro: {
    election: "Hauteskunde orokorrak · 2026ko azaroaren 29a",
    title: "Nori bozkatu? Objektiboki",
    heroLead: "Nori bozkatu?",
    heroAccent: "Objektiboki",
    promise: (n) =>
      `${n} baieztapen, 3 minutu: zein alderdik dio zuk pentsatzen duzuna eta zeinek bozkatu duen.`,
    minutes: "3 minutu",
    notAffiliated: "Ez gaude inongo alderdiri lotuta.",
    howTitle: "Nola funtzionatzen du",
    programme: {
      title: "Programa",
      body: "Agintzen dutena, orrialdearekin",
    },
    record: {
      title: "Botoak Kongresuan",
      body: "Bozkatu zutena, estekarekin",
    },
    hemeroteca: {
      title: "Esan zutena",
      body: "Data eta iturriarekin. Ez du puntuatzen",
    },
    programmeYear:
      "2026ko programak argitaratu arte 2023koak erabiltzen dira, eta datu bakoitzean adierazten da.",
    privacy: "Erregistrorik gabe. Zure erantzunak zure nabigatzailean geratzen dira.",
    cta: "Hasi",
    resume: (answered, total) => `Jarraitu (${answered} / ${total})`,
    restart: "Hasieratik hasi",
    seeLast: "Ikusi nire azken emaitza",
    lastTitle: "Testa egin duzu jada",
    lastBody: "Zure emaitza berriro ikus dezakezu edo testa errepikatu.",
    preparing: "Testa prestatzen",
    preparingBody:
      "Baieztapen bakoitzaren iturriak egiaztatzen ari gara. Testa argitaratuko dugu datu bakoitzak bere iturria duenean.",
    badge: "Inongo alderdiri lotu gabe · Iturri irekiak",
    dvhTeaser: "Esaten dutena betetzen dute? Egiaztatu",
  },
  nav: { label: "Test honi buruz" },
  context: {
    step: (n, total) => `${n}. urratsa / ${total}`,
    optional: "Aukerakoa",
    regionTitle: "Zein erkidegotan bozkatzen duzu?",
    regionHelp: "Zure erkidegoko alderdiak sartzeko.",
    voteTitle: "Nori bozkatu ohi diozu?",
    voteHelp:
      "Anonimoa. Ez du kalkulua aldatzen.",
    preferNot: "Nahiago dut ez esan",
    otherVote: "Beste alderdi bat, zuriz edo ez dut bozkatzen",
    showAll: (n) => `Ikusi alderdi guztiak (${n} gehiago)`,
    pendingCoalition: "berresteko dagoen koalizioa",
    back: "Atzera",
    toQuestions: "Galderetara joan",
  },
  question: {
    counter: (n, total) => `${n}. baieztapena / ${total}`,
    answered: (n) => `${n} erantzunda`,
    progressLabel: "Erantzundako baieztapenak",
    scale: { [-2]: "Erabat aurka", [-1]: "Aurka", 1: "Alde", 2: "Erabat alde" },
    skip: "Ez dakit",
    important: "Hau garrantzitsua da niretzat",
    importantHelp: "Bikoitza balio du",
    keyboardHint: "Teklak: 1–4 erantzuteko, 5 = Ez dakit, I = Garrantzitsua, geziak mugitzeko.",
    prev: "Aurrekoa",
    next: "Hurrengoa",
    toReview: "Erantzunak berrikusi",
    restart: "Berrabiarazi",
    options: "Erantzunak",
  },
  review: {
    title: "Berrikusi zure erantzunak",
    intro: "Ukitu bat aldatzeko.",
    unanswered: (n) => `${n} erantzun gabe dituzu. Jarrai dezakezu: kalkuluak erantzundakoa bakarrik erabiltzen du.`,
    notEnough: (min, missing) =>
      `Emaitza bat emateko gutxienez ${min} erantzun behar dira. ${missing} falta zaizkizu.`,
    noAnswer: "Erantzun gabe",
    skipped: "Ez dakit",
    edit: "Aldatu",
    important: "Garrantzitsua",
    whatItMeasures: "Zer neurtzen du",
    submit: "Ikusi nire emaitza",
    restart: "Berriro hasi",
    contribute: {
      label: "Nire erantzunak modu anonimoan eman estatistiketarako",
      info: "Posta elektronikorik eta IPrik gabe, data egunera mugatuta. 20 pertsona edo gehiagoko agregatuak bakarrik argitaratzen dira, eta inoiz ez azaroaren 24tik 29ra bitartean. Markatzen ez baduzu, ez da ezer gordetzen.",
      more: "Zer gordetzen da?",
    },
  },
  languages: {
    label: "Hizkuntza",
    names: { es: "Castellano", ca: "Català", gl: "Galego", eu: "Euskara" },
  },
  empty: {
    title: "Testa prestatzen",
    body: "Oraindik ez dago iturri guztiak egiaztatuta dituen baieztapenik. Ez dugu iturririk gabeko galderarik argitaratzen.",
    back: "Hasierara itzuli",
  },
  regions: {
    "01": "Andaluzia",
    "02": "Aragoi",
    "03": "Asturias",
    "04": "Balear Uharteak",
    "05": "Kanariak",
    "06": "Kantabria",
    "07": "Gaztela eta Leon",
    "08": "Gaztela-Mantxa",
    "09": "Katalunia",
    "10": "Valentziako Erkidegoa",
    "11": "Extremadura",
    "12": "Galizia",
    "13": "Madrilgo Erkidegoa",
    "14": "Murtziako Eskualdea",
    "15": "Nafarroa",
    "16": "Euskadi",
    "17": "Errioxa",
    "18": "Ceuta",
    "19": "Melilla",
  },
};

export const flowStrings: Record<AfinidadLang, FlowStrings> = { es, ca, gl, eu };

/** Textos del flujo para un `[locale]` cualquiera; lo desconocido cae a `es`. */
export function getFlowStrings(locale: string | null | undefined): FlowStrings {
  return flowStrings[resolveAfinidadLang(locale)];
}

/** Las cuatro tablas sin mezclar, para el test de completitud (`afinidad-i18n.test.ts`). */
export const FLOW_TABLES = { es, ca, gl, eu } as const;
