/**
 * Textos de «Novedades de Libertarios.eu»: el formulario (resultado del test,
 * registro y pie), las páginas de confirmación y baja, y el correo de
 * confirmación.
 *
 * Cuatro lenguas (es, ca, gl, eu) porque el formulario aparece dentro de
 * «¿A quién votar?», que existe en las cuatro. El resto de idiomas del sitio
 * (pt, fr, it, de) cae al castellano con `pick`, igual que `getDictionary`.
 *
 * Dos reglas de redacción que no son de estilo:
 *
 * - El boletín es **de Libertarios.eu**, no «del test». Quien usa una
 *   herramienta que se presenta como neutral tiene que saber que se apunta a
 *   otra cosa.
 * - La casilla es lo que da el consentimiento (LSSI art. 21, RGPD art. 7): sin
 *   marcar por defecto y con el texto entero, sin letra pequeña escondida.
 */
import { pick } from "@/i18n/afinidad/lang";

export interface NewsletterStrings {
  form: {
    title: string;
    /** Debajo del título en el resultado del test. */
    bodyTest: string;
    /** Debajo del título en el pie. */
    bodyFooter: string;
    emailLabel: string;
    emailPlaceholder: string;
    /** La casilla. Texto fijado por el dueño. */
    checkbox: string;
    /** Aclaración junto a la casilla del registro: es independiente. */
    registrationHint: string;
    privacyLink: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    errorInvalidEmail: string;
    errorConsent: string;
  };
  confirm: {
    metaTitle: string;
    title: string;
    body: string;
    button: string;
    doneTitle: string;
    doneBody: string;
  };
  unsubscribe: {
    metaTitle: string;
    title: string;
    body: string;
    button: string;
    doneTitle: string;
    doneBody: string;
  };
  invalidTitle: string;
  invalidBody: string;
  unavailable: string;
  backHome: string;
  email: {
    subject: string;
    subjectLegacy: string;
    greeting: string;
    /** Alta nueva (doble opt-in). */
    intro: string;
    /** Simpatizante ya registrado: correo de re-permiso. */
    introLegacy: string;
    button: string;
    ignore: string;
    ignoreLegacy: string;
    unsubscribe: string;
    footer: string;
  };
}

const es: NewsletterStrings = {
  form: {
    title: "Novedades de Libertarios.eu",
    bodyTest:
      "Esto es de Libertarios.eu, la web que publica este test, no del test: el correo no se guarda con tus respuestas ni con tu resultado.",
    bodyFooter: "Pocas, sin spam y baja en un clic.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    checkbox: "Quiero recibir novedades de Libertarios.eu (pocas, sin spam; baja en un clic).",
    registrationHint:
      "Aparte del registro: puedes registrarte sin marcarla. Si la marcas, te mandaremos un correo para confirmarlo.",
    privacyLink: "Qué hacemos con tu correo",
    submit: "Apuntarme",
    sending: "Enviando…",
    success: "Te hemos enviado un correo para confirmar. Hasta que pulses el enlace, no te escribiremos nada más.",
    error: "No se pudo guardar. Inténtalo más tarde.",
    errorInvalidEmail: "Revisa el correo: no parece una dirección válida.",
    errorConsent: "Para apuntarte, marca la casilla.",
  },
  confirm: {
    metaTitle: "Confirmar suscripción — Libertarios.eu",
    title: "Confirma tu suscripción",
    body: "Pulsa el botón para empezar a recibir las novedades de Libertarios.eu.",
    button: "Confirmar",
    doneTitle: "Hecho: ya estás dentro",
    doneBody: "Te escribiremos poco y solo sobre Libertarios.eu. Cada correo lleva un enlace para darte de baja.",
  },
  unsubscribe: {
    metaTitle: "Darse de baja — Libertarios.eu",
    title: "Darte de baja de las novedades",
    body: "Dejarás de recibir las novedades de Libertarios.eu. No cambia nada más: si te registraste en el mapa, ese registro sigue igual (para borrarlo, escríbenos).",
    button: "Darme de baja",
    doneTitle: "Hecho: ya no te escribiremos",
    doneBody: "Te hemos dado de baja. Si fue un error, puedes volver a apuntarte desde el pie de cualquier página.",
  },
  invalidTitle: "Este enlace no sirve",
  invalidBody: "Puede que ya se haya usado o que haya caducado. Si quieres, vuelve a apuntarte desde el pie de cualquier página.",
  unavailable: "No hemos podido completarlo ahora. Inténtalo de nuevo en unos minutos.",
  backHome: "Volver a la portada",
  email: {
    subject: "Confirma tu suscripción a las novedades de Libertarios.eu",
    subjectLegacy: "¿Seguimos escribiéndote? Confirma las novedades de Libertarios.eu",
    greeting: "Hola:",
    intro:
      "Alguien —esperamos que tú— ha pedido recibir las novedades de Libertarios.eu en esta dirección. Para confirmarlo, pulsa el enlace:",
    introLegacy:
      "Te registraste en Libertarios.eu y nos diste permiso para escribirte. Antes de mandarte nada, queremos confirmar que quieres recibir nuestras novedades (pocas, sin spam). Si es así, pulsa el enlace:",
    button: "Sí, quiero recibirlas",
    ignore: "Si no has sido tú, ignora este correo: sin confirmar no te escribiremos nada y borraremos la dirección en 30 días.",
    ignoreLegacy:
      "Si no haces nada, no te enviaremos novedades. Esto no cambia tu registro en el mapa.",
    unsubscribe: "No quiero recibir nada:",
    footer: "Libertarios.eu · contacto@libertarios.es",
  },
};

const ca: NewsletterStrings = {
  form: {
    title: "Novetats de Libertarios.eu",
    bodyTest:
      "Això és de Libertarios.eu, el web que publica aquest test, no del test: el correu no es desa amb les teves respostes ni amb el teu resultat.",
    bodyFooter: "Poques, sense spam i baixa en un clic.",
    emailLabel: "Correu electrònic",
    emailPlaceholder: "tu@correu.cat",
    checkbox: "Vull rebre novetats de Libertarios.eu (poques, sense spam; baixa en un clic).",
    registrationHint:
      "A part del registre: et pots registrar sense marcar-la. Si la marques, t'enviarem un correu per confirmar-ho.",
    privacyLink: "Què fem amb el teu correu",
    submit: "Apuntar-me",
    sending: "Enviant…",
    success: "T'hem enviat un correu per confirmar. Fins que no hi facis clic, no t'escriurem res més.",
    error: "No s'ha pogut desar. Torna-ho a provar més tard.",
    errorInvalidEmail: "Revisa el correu: no sembla una adreça vàlida.",
    errorConsent: "Per apuntar-te, marca la casella.",
  },
  confirm: {
    metaTitle: "Confirmar la subscripció — Libertarios.eu",
    title: "Confirma la subscripció",
    body: "Prem el botó per començar a rebre les novetats de Libertarios.eu.",
    button: "Confirmar",
    doneTitle: "Fet: ja hi ets",
    doneBody: "T'escriurem poc i només sobre Libertarios.eu. Cada correu porta un enllaç per donar-te de baixa.",
  },
  unsubscribe: {
    metaTitle: "Donar-se de baixa — Libertarios.eu",
    title: "Donar-te de baixa de les novetats",
    body: "Deixaràs de rebre les novetats de Libertarios.eu. No canvia res més: si et vas registrar al mapa, aquest registre continua igual (per esborrar-lo, escriu-nos).",
    button: "Donar-me de baixa",
    doneTitle: "Fet: ja no t'escriurem",
    doneBody: "T'hem donat de baixa. Si ha estat un error, et pots tornar a apuntar des del peu de qualsevol pàgina.",
  },
  invalidTitle: "Aquest enllaç no serveix",
  invalidBody: "Potser ja s'ha fet servir o ha caducat. Si vols, torna't a apuntar des del peu de qualsevol pàgina.",
  unavailable: "No ho hem pogut completar ara. Torna-ho a provar d'aquí a uns minuts.",
  backHome: "Tornar a la portada",
  email: {
    subject: "Confirma la subscripció a les novetats de Libertarios.eu",
    subjectLegacy: "Continuem escrivint-te? Confirma les novetats de Libertarios.eu",
    greeting: "Hola:",
    intro:
      "Algú —esperem que tu— ha demanat rebre les novetats de Libertarios.eu en aquesta adreça. Per confirmar-ho, prem l'enllaç:",
    introLegacy:
      "Et vas registrar a Libertarios.eu i ens vas donar permís per escriure't. Abans d'enviar-te res, volem confirmar que vols rebre les nostres novetats (poques, sense spam). Si és així, prem l'enllaç:",
    button: "Sí, les vull rebre",
    ignore: "Si no has estat tu, ignora aquest correu: sense confirmar no t'escriurem res i esborrarem l'adreça d'aquí a 30 dies.",
    ignoreLegacy: "Si no fas res, no t'enviarem novetats. Això no canvia el teu registre al mapa.",
    unsubscribe: "No vull rebre res:",
    footer: "Libertarios.eu · contacto@libertarios.es",
  },
};

const gl: NewsletterStrings = {
  form: {
    title: "Novidades de Libertarios.eu",
    bodyTest:
      "Isto é de Libertarios.eu, a web que publica este test, non do test: o correo non se garda coas túas respostas nin co teu resultado.",
    bodyFooter: "Poucas, sen spam e baixa nun clic.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "teu@correo.gal",
    checkbox: "Quero recibir novidades de Libertarios.eu (poucas, sen spam; baixa nun clic).",
    registrationHint:
      "Á parte do rexistro: podes rexistrarte sen marcala. Se a marcas, mandarémosche un correo para confirmalo.",
    privacyLink: "Que facemos co teu correo",
    submit: "Apuntarme",
    sending: "Enviando…",
    success: "Mandámosche un correo para confirmar. Ata que premas a ligazón, non che escribiremos nada máis.",
    error: "Non se puido gardar. Téntao máis tarde.",
    errorInvalidEmail: "Revisa o correo: non parece un enderezo válido.",
    errorConsent: "Para apuntarte, marca a caixa.",
  },
  confirm: {
    metaTitle: "Confirmar a subscrición — Libertarios.eu",
    title: "Confirma a subscrición",
    body: "Preme o botón para comezar a recibir as novidades de Libertarios.eu.",
    button: "Confirmar",
    doneTitle: "Feito: xa estás dentro",
    doneBody: "Escribirémosche pouco e só sobre Libertarios.eu. Cada correo leva unha ligazón para darte de baixa.",
  },
  unsubscribe: {
    metaTitle: "Darse de baixa — Libertarios.eu",
    title: "Darte de baixa das novidades",
    body: "Deixarás de recibir as novidades de Libertarios.eu. Non cambia nada máis: se te rexistraches no mapa, ese rexistro segue igual (para borralo, escríbenos).",
    button: "Darme de baixa",
    doneTitle: "Feito: xa non che escribiremos",
    doneBody: "Démoste de baixa. Se foi un erro, podes volver apuntarte desde o pé de calquera páxina.",
  },
  invalidTitle: "Esta ligazón non serve",
  invalidBody: "Pode que xa se usase ou que caducase. Se queres, volve apuntarte desde o pé de calquera páxina.",
  unavailable: "Non puidemos completalo agora. Téntao de novo nuns minutos.",
  backHome: "Volver á portada",
  email: {
    subject: "Confirma a túa subscrición ás novidades de Libertarios.eu",
    subjectLegacy: "Seguimos escribíndoche? Confirma as novidades de Libertarios.eu",
    greeting: "Ola:",
    intro:
      "Alguén —agardamos que ti— pediu recibir as novidades de Libertarios.eu neste enderezo. Para confirmalo, preme a ligazón:",
    introLegacy:
      "Rexistrácheste en Libertarios.eu e déchesnos permiso para escribirche. Antes de mandarche nada, queremos confirmar que queres recibir as nosas novidades (poucas, sen spam). Se é así, preme a ligazón:",
    button: "Si, quero recibilas",
    ignore: "Se non fuches ti, ignora este correo: sen confirmar non che escribiremos nada e borraremos o enderezo en 30 días.",
    ignoreLegacy: "Se non fas nada, non che enviaremos novidades. Isto non cambia o teu rexistro no mapa.",
    unsubscribe: "Non quero recibir nada:",
    footer: "Libertarios.eu · contacto@libertarios.es",
  },
};

const eu: NewsletterStrings = {
  form: {
    title: "Libertarios.eu-ren berriak",
    bodyTest:
      "Hau Libertarios.eu-rena da, test hau argitaratzen duen webgunearena, ez testarena: helbidea ez da zure erantzunekin edo emaitzarekin gordetzen.",
    bodyFooter: "Gutxi, spamik gabe eta klik batean baja.",
    emailLabel: "Helbide elektronikoa",
    emailPlaceholder: "zure@helbidea.eus",
    checkbox: "Libertarios.eu-ren berriak jaso nahi ditut (gutxi, spamik gabe; klik batean baja).",
    registrationHint:
      "Erregistrotik aparte: markatu gabe ere erregistra zaitezke. Markatzen baduzu, mezu bat bidaliko dizugu berresteko.",
    privacyLink: "Zer egiten dugun zure helbidearekin",
    submit: "Izena eman",
    sending: "Bidaltzen…",
    success: "Mezu bat bidali dizugu berresteko. Estekan klik egin arte, ez dizugu ezer gehiago idatziko.",
    error: "Ezin izan da gorde. Saiatu berriro geroago.",
    errorInvalidEmail: "Begiratu helbidea: ez dirudi baliozkoa.",
    errorConsent: "Izena emateko, markatu laukia.",
  },
  confirm: {
    metaTitle: "Harpidetza berretsi — Libertarios.eu",
    title: "Berretsi zure harpidetza",
    body: "Sakatu botoia Libertarios.eu-ren berriak jasotzen hasteko.",
    button: "Berretsi",
    doneTitle: "Eginda: barruan zaude",
    doneBody: "Gutxitan idatziko dizugu, eta Libertarios.eu-ri buruz bakarrik. Mezu bakoitzak baja emateko esteka bat du.",
  },
  unsubscribe: {
    metaTitle: "Baja eman — Libertarios.eu",
    title: "Berrietatik baja eman",
    body: "Ez duzu Libertarios.eu-ren berririk jasoko. Ez da beste ezer aldatzen: maparen erregistroan izena eman bazenuen, berdin jarraitzen du (ezabatzeko, idatzi iezaguzu).",
    button: "Baja eman",
    doneTitle: "Eginda: ez dizugu gehiago idatziko",
    doneBody: "Baja eman dizugu. Akats bat izan bada, edozein orriren oinetik izena eman dezakezu berriro.",
  },
  invalidTitle: "Esteka honek ez du balio",
  invalidBody: "Agian dagoeneko erabili da edo iraungi egin da. Nahi baduzu, eman izena berriro edozein orriren oinetik.",
  unavailable: "Ezin izan dugu orain osatu. Saiatu berriro minutu batzuk barru.",
  backHome: "Itzuli hasierara",
  email: {
    subject: "Berretsi Libertarios.eu-ren berrietarako harpidetza",
    subjectLegacy: "Idazten jarraitzea nahi duzu? Berretsi Libertarios.eu-ren berriak",
    greeting: "Kaixo:",
    intro:
      "Norbaitek —zuk, espero dugu— Libertarios.eu-ren berriak helbide honetan jasotzea eskatu du. Berresteko, sakatu esteka:",
    introLegacy:
      "Libertarios.eu-n erregistratu zinen eta idazteko baimena eman zenigun. Ezer bidali aurretik, gure berriak (gutxi, spamik gabe) jaso nahi dituzula berretsi nahi dugu. Hala bada, sakatu esteka:",
    button: "Bai, jaso nahi ditut",
    ignore: "Zu izan ez bazara, ez egin kasurik mezu honi: berretsi gabe ez dizugu ezer idatziko, eta helbidea 30 egunean ezabatuko dugu.",
    ignoreLegacy: "Ezer egiten ez baduzu, ez dizugu berririk bidaliko. Honek ez du maparen erregistroa aldatzen.",
    unsubscribe: "Ez dut ezer jaso nahi:",
    footer: "Libertarios.eu · contacto@libertarios.es",
  },
};

export const NEWSLETTER_TABLES = { es, ca, gl, eu } as const;

/** Textos del idioma pedido; cualquier otro (pt, fr…) cae al castellano. */
export function getNewsletterStrings(locale: string | null | undefined): NewsletterStrings {
  return pick(NEWSLETTER_TABLES, locale ?? "es");
}
