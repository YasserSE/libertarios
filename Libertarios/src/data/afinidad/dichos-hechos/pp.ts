import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» del PP. No puntúa nunca.
 *
 * Criterio de selección (el mismo para todos los partidos): compromisos
 * explícitos y muy difundidos del partido o su líder, cumplidos e incumplidos,
 * cada uno con un hecho posterior verificable en fuente primaria. El PP
 * gobernó entre diciembre de 2011 y junio de 2018: los compromisos de la
 * investidura de 2011 se contrastan con lo que publicó el BOE.
 *
 * Comprobado el 2026-10-06:
 * - Citas copiadas literalmente del Diario de Sesiones del Congreso (PDF
 *   oficial; en estos Diarios la página impresa coincide con la del PDF) y del
 *   programa electoral de 2011 (PDF de pp.es; `page` es la página del PDF).
 *   La fecha del programa es la de modificación del PDF (31-10-2011).
 * - La única cita de prensa (Guardiola) va con enlace y copia de archive.org.
 * - Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es.
 * - Referencias BOE comprobadas con el XML de boe.es (título, fecha y, donde
 *   se resume el contenido, el artículo citado).
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";
const BOE = (id: string) => `https://www.boe.es/buscar/doc.php?id=${id}`;

const INVESTIDURA_2011 = {
  url: "https://www.congreso.es/public_oficiales/L10/CONG/DS/PL/PL_002.PDF",
  title:
    "Diario de Sesiones del Congreso de los Diputados, Pleno, X legislatura, núm. 2 (19-12-2011): debate de investidura de Mariano Rajoy Brey",
  date: "2011-12-19",
  kind: "diario-sesiones" as const,
};
const RAJOY = "Mariano Rajoy Brey";
const RAJOY_ROLE = "candidato a la Presidencia del Gobierno y presidente del PP";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "pp-irpf-2011",
    partyId: "pp",
    topic: "Subida del IRPF en 2012",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (réplica en el debate de investidura)`,
      date: "2011-12-19",
      text: "Yo tengo que decir que mi intención es no subir los impuestos, porque en un momento como este, y más a los pequeños y medianos empresarios o a las empresas, con las dificultades que están pasando, no me parece lo más razonable.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=26`, page: "26" },
    },
    did: {
      date: "2011-12-30",
      summary:
        "Once días después, el Consejo de Ministros aprobó el Real Decreto-ley 20/2011, cuya disposición final segunda añadió a la ley del IRPF un «gravamen complementario a la cuota íntegra estatal» para los ejercicios 2012 y 2013 y elevó las retenciones del 19 al 21 % en los pagos a cuenta citados en la norma.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2011-20638",
          title:
            "Real Decreto-ley 20/2011, de 30 de diciembre, de medidas urgentes en materia presupuestaria, tributaria y financiera para la corrección del déficit público",
          url: BOE("BOE-A-2011-20638"),
          date: "2011-12-31",
          role: "gobierno",
        },
      ],
    },
    verdict: "contradice",
    note: "La cita es una intención declarada («mi intención es no subir los impuestos»), no una promesa con plazo; se recoge por ser categórica y por la proximidad entre lo dicho y el decreto.",
    i18n: {
      ca: {
        topic: "Pujada de l'IRPF el 2012",
        summary: "Onze dies després, el Consell de Ministres va aprovar el Reial decret llei 20/2011, la disposició final segona del qual va afegir a la llei de l'IRPF un «gravamen complementario a la cuota íntegra estatal» per als exercicis 2012 i 2013 i va elevar les retencions del 19 al 21 % en els pagaments a compte citats en la norma.",
        note: "La cita és una intenció declarada («mi intención es no subir los impuestos»), no una promesa amb termini; es recull perquè és categòrica i per la proximitat entre el que es va dir i el decret.",
        role: "candidat a la Presidència del Govern i president del PP (rèplica en el debat d'investidura)",
      },
      gl: {
        topic: "Suba do IRPF en 2012",
        summary: "Once días despois, o Consello de Ministros aprobou o Real decreto-lei 20/2011, cuxa disposición derradeira segunda engadiu á lei do IRPF un «gravamen complementario a la cuota íntegra estatal» para os exercicios 2012 e 2013 e elevou as retencións do 19 ao 21 % nos pagamentos á conta citados na norma.",
        note: "A cita é unha intención declarada («mi intención es no subir los impuestos»), non unha promesa con prazo; recóllese por ser categórica e pola proximidade entre o dito e o decreto.",
        role: "candidato á Presidencia do Goberno e presidente do PP (réplica no debate de investidura)",
      },
      eu: {
        topic: "PFEZaren igoera 2012an",
        summary: "Hamaika egun geroago, Ministro Kontseiluak 20/2011 Errege Lege-dekretua onartu zuen; haren bigarren azken xedapenak «gravamen complementario a la cuota íntegra estatal» bat gehitu zion PFEZaren legeari 2012ko eta 2013ko ekitaldietarako, eta atxikipenak % 19tik % 21era igo zituen arauak aipatzen dituen konturako ordainketetan.",
        note: "Aipua adierazitako asmo bat da («mi intención es no subir los impuestos»), ez epea duen promesa bat; jasotzen da kategorikoa delako eta esandakoaren eta dekretuaren arteko hurbiltasunagatik.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (erreplika inbestidura-eztabaidan)",
      },
    },
  },
  {
    id: "pp-pensiones-2012",
    partyId: "pp",
    topic: "Actualización de las pensiones en 2012",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "el Gobierno dará cumplimiento a uno de sus grandes compromisos electorales: la actualización del poder adquisitivo de las pensiones a partir del 1 de enero de 2012.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=11`, page: "11" },
    },
    did: {
      date: "2012-11-30",
      summary:
        "El Real Decreto-ley 20/2011 (art. 5) subió las pensiones contributivas un 1 % para 2012. El Real Decreto-ley 28/2012 (art. 2) dejó «sin efecto para el ejercicio 2012 la actualización de las pensiones» prevista en la Ley General de la Seguridad Social, que compensaba la diferencia con el IPC.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2011-20638",
          title:
            "Real Decreto-ley 20/2011, de 30 de diciembre, de medidas urgentes en materia presupuestaria, tributaria y financiera para la corrección del déficit público",
          url: BOE("BOE-A-2011-20638"),
          date: "2011-12-31",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2012-14695",
          title: "Real Decreto-ley 28/2012, de 30 de noviembre, de medidas de consolidación y garantía del sistema de la Seguridad Social",
          url: BOE("BOE-A-2012-14695"),
          date: "2012-12-01",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Cumplió la subida desde el 1-1-2012 (1 %), pero once meses después suprimió por decreto la actualización de 2012 que la ley preveía para compensar la desviación del IPC.",
    i18n: {
      ca: {
        topic: "Actualització de les pensions el 2012",
        summary: "El Reial decret llei 20/2011 (art. 5) va apujar les pensions contributives un 1 % per al 2012. El Reial decret llei 28/2012 (art. 2) va deixar «sin efecto para el ejercicio 2012 la actualización de las pensiones» prevista en la Llei general de la Seguretat Social, que compensava la diferència amb l'IPC.",
        note: "Va complir la pujada des de l'1-1-2012 (1 %), però onze mesos després va suprimir per decret l'actualització del 2012 que la llei preveia per compensar la desviació de l'IPC.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Actualización das pensións en 2012",
        summary: "O Real decreto-lei 20/2011 (art. 5) subiu as pensións contributivas un 1 % para 2012. O Real decreto-lei 28/2012 (art. 2) deixou «sin efecto para el ejercicio 2012 la actualización de las pensiones» prevista na Lei xeral da Seguridade Social, que compensaba a diferenza co IPC.",
        note: "Cumpriu a suba desde o 1-1-2012 (1 %), pero once meses despois suprimiu por decreto a actualización de 2012 que a lei prevía para compensar a desviación do IPC.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Pentsioen eguneratzea 2012an",
        summary: "20/2011 Errege Lege-dekretuak (5. art.) kotizaziopeko pentsioak % 1 igo zituen 2012rako. 28/2012 Errege Lege-dekretuak (2. art.) «sin efecto para el ejercicio 2012 la actualización de las pensiones» utzi zuen; Gizarte Segurantzaren Lege Orokorrak aurreikusitako eguneratze hark KPIarekiko aldea konpentsatzen zuen.",
        note: "Igoera 1-1-2012tik aurrera bete zen (% 1), baina hamaika hilabete geroago dekretu bidez kendu zuen legeak KPIaren desbideratzea konpentsatzeko aurreikusten zuen 2012ko eguneratzea.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-reforma-laboral-2012",
    partyId: "pp",
    topic: "Reforma laboral",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "En la primera quincena de enero recibiremos sus propuestas y, en su caso, sus acuerdos y, una vez conocidos estos, remitiremos al Congreso de los Diputados un proyecto de reforma laboral en el primer trimestre del año 2012.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=13`, page: "13" },
    },
    did: {
      date: "2012-02-10",
      summary:
        "El Gobierno aprobó el Real Decreto-ley 3/2012, de medidas urgentes para la reforma del mercado laboral, el 10-2-2012. Tramitado como proyecto de ley, se publicó como Ley 3/2012 el 7-7-2012.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2012-2076",
          title: "Real Decreto-ley 3/2012, de 10 de febrero, de medidas urgentes para la reforma del mercado laboral",
          url: BOE("BOE-A-2012-2076"),
          date: "2012-02-11",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2012-9110",
          title: "Ley 3/2012, de 6 de julio, de medidas urgentes para la reforma del mercado laboral",
          url: BOE("BOE-A-2012-9110"),
          date: "2012-07-07",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "La reforma llegó en el primer trimestre, como se dijo, aunque por real decreto-ley y no como proyecto de ley remitido a la Cámara; se tramitó después como proyecto.",
    i18n: {
      ca: {
        topic: "Reforma laboral",
        summary: "El Govern va aprovar el Reial decret llei 3/2012, de mesures urgents per a la reforma del mercat laboral, el 10-2-2012. Tramitat com a projecte de llei, es va publicar com a Llei 3/2012 el 7-7-2012.",
        note: "La reforma va arribar el primer trimestre, com s'havia dit, tot i que per reial decret llei i no com a projecte de llei remès a la Cambra; després es va tramitar com a projecte.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Reforma laboral",
        summary: "O Goberno aprobou o Real decreto-lei 3/2012, de medidas urxentes para a reforma do mercado laboral, o 10-2-2012. Tramitado como proxecto de lei, publicouse como Lei 3/2012 o 7-7-2012.",
        note: "A reforma chegou no primeiro trimestre, como se dixera, aínda que por real decreto-lei e non como proxecto de lei remitido á Cámara; tramitouse despois como proxecto.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Lan-erreforma",
        summary: "Gobernuak lan-merkatua erreformatzeko premiazko neurriei buruzko 3/2012 Errege Lege-dekretua onartu zuen 10-2-2012an. Lege-proiektu gisa izapidetuta, 3/2012 Lege gisa argitaratu zen 7-7-2012an.",
        note: "Erreforma lehen hiruhilekoan iritsi zen, esan bezala, baina errege lege-dekretu bidez, eta ez Ganberari bidalitako lege-proiektu gisa; gero proiektu gisa izapidetu zen.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-ley-transparencia-2013",
    partyId: "pp",
    topic: "Ley de transparencia",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "Presentaremos en el primer trimestre de 2012 una ley de transparencia, buen gobierno y acceso a la información pública, como un derecho de los ciudadanos y un principio básico de la actuación de las administraciones.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=14`, page: "14" },
    },
    did: {
      date: "2013-12-09",
      summary:
        "El proyecto de ley (autor: Gobierno) se publicó en el Boletín Oficial de las Cortes Generales el 7-9-2012. Las Cortes lo aprobaron como Ley 19/2013, de 9 de diciembre, publicada en el BOE el 10-12-2013.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2013-12887",
          title: "Ley 19/2013, de 9 de diciembre, de transparencia, acceso a la información pública y buen gobierno",
          url: BOE("BOE-A-2013-12887"),
          date: "2013-12-10",
          role: "gobierno",
        },
        {
          kind: "iniciativa",
          title: "Proyecto de Ley de transparencia, acceso a la información pública y buen gobierno (121/000019)",
          url: "https://www.congreso.es/public_oficiales/L10/CONG/BOCG/A/BOCG-10-A-19-1.PDF",
          status: "Publicado en el BOCG, serie A, núm. 19-1 (autor: Gobierno)",
          date: "2012-09-07",
        },
      ],
    },
    verdict: "parcial",
    note: "La ley se aprobó, pero el proyecto entró en el Congreso en septiembre de 2012, no en el primer trimestre de 2012 como se había dicho.",
    i18n: {
      ca: {
        topic: "Llei de transparència",
        summary: "El projecte de llei (autor: Govern) es va publicar al Butlletí Oficial de les Corts Generals el 7-9-2012. Les Corts el van aprovar com a Llei 19/2013, de 9 de desembre, publicada al BOE el 10-12-2013.",
        note: "La llei es va aprovar, però el projecte va entrar al Congrés el setembre del 2012, no el primer trimestre del 2012 com s'havia dit.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Lei de transparencia",
        summary: "O proxecto de lei (autor: Goberno) publicouse no Boletín Oficial das Cortes Xerais o 7-9-2012. As Cortes aprobárono como Lei 19/2013, do 9 de decembro, publicada no BOE o 10-12-2013.",
        note: "A lei aprobouse, pero o proxecto entrou no Congreso en setembro de 2012, non no primeiro trimestre de 2012 como se dixera.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Gardentasun Legea",
        summary: "Lege-proiektua (egilea: Gobernua) Gorte Nagusien Aldizkari Ofizialean argitaratu zen 7-9-2012an. Gorteek abenduaren 9ko 19/2013 Lege gisa onartu zuten, eta BOEn argitaratu zen 10-12-2013an.",
        note: "Legea onartu zen, baina proiektua 2012ko irailean sartu zen Kongresuan, ez 2012ko lehen hiruhilekoan, esan zen bezala.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-aborto-2015",
    partyId: "pp",
    topic: "Reforma de la ley del aborto",
    said: {
      speaker: "Partido Popular",
      role: "programa electoral de las generales de 2011 («Lo que España necesita»)",
      date: "2011-10-31",
      text: "Cambiaremos el modelo de la actual regulación sobre el aborto para reforzar la protección del derecho a la vida, así como de las menores.",
      source: {
        url: "https://www.pp.es/storage/2013/11/5742-20111031195458.pdf#page=108",
        title: "Partido Popular — Programa electoral 2011 «Lo que España necesita. Más sociedad, mejor gobierno»",
        year: 2011,
        page: "108",
        kind: "programa",
      },
    },
    did: {
      date: "2015-09-21",
      summary:
        "La Ley Orgánica 11/2015 suprimió el apartado 4 del artículo 13 de la Ley Orgánica 2/2010 y exigió el consentimiento expreso de los representantes legales para la interrupción del embarazo de menores de edad. El resto de la Ley Orgánica 2/2010 siguió en vigor.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2015-10141",
          title:
            "Ley Orgánica 11/2015, de 21 de septiembre, para reforzar la protección de las menores y mujeres con capacidad modificada judicialmente en la interrupción voluntaria del embarazo",
          url: BOE("BOE-A-2015-10141"),
          date: "2015-09-22",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Se cumplió la parte de «las menores»; el modelo de regulación (plazos de la Ley Orgánica 2/2010) no se cambió durante los gobiernos del PP (2011-2018).",
    i18n: {
      ca: {
        topic: "Reforma de la llei de l'avortament",
        summary: "La Llei orgànica 11/2015 va suprimir l'apartat 4 de l'article 13 de la Llei orgànica 2/2010 i va exigir el consentiment exprés dels representants legals per a la interrupció de l'embaràs de menors d'edat. La resta de la Llei orgànica 2/2010 va continuar en vigor.",
        note: "Es va complir la part de «las menores»; el model de regulació (terminis de la Llei orgànica 2/2010) no es va canviar durant els governs del PP (2011-2018).",
        role: "programa electoral de les eleccions generals del 2011 («Lo que España necesita»)",
      },
      gl: {
        topic: "Reforma da lei do aborto",
        summary: "A Lei orgánica 11/2015 suprimiu o apartado 4 do artigo 13 da Lei orgánica 2/2010 e exixiu o consentimento expreso dos representantes legais para a interrupción do embarazo de menores de idade. O resto da Lei orgánica 2/2010 seguiu en vigor.",
        note: "Cumpriuse a parte de «las menores»; o modelo de regulación (prazos da Lei orgánica 2/2010) non se cambiou durante os gobernos do PP (2011-2018).",
        role: "programa electoral das xerais de 2011 («Lo que España necesita»)",
      },
      eu: {
        topic: "Abortuaren legearen erreforma",
        summary: "11/2015 Lege Organikoak 2/2010 Lege Organikoaren 13. artikuluaren 4. apartatua kendu zuen, eta legezko ordezkarien berariazko baimena eskatu zuen adingabeen haurdunaldia eteteko. 2/2010 Lege Organikoaren gainerakoak indarrean jarraitu zuen.",
        note: "«Las menores» zatia bete zen; erregulazio-eredua (2/2010 Lege Organikoaren epeak) ez zen aldatu PPren gobernuetan (2011-2018).",
        role: "2011ko hauteskunde orokorretako hauteskunde-programa («Lo que España necesita»)",
      },
    },
  },
  {
    id: "pp-amnistia-2023",
    partyId: "pp",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: "Alberto Núñez Feijóo",
      role: "candidato a la Presidencia del Gobierno y presidente del PP (discurso de investidura)",
      date: "2023-09-26",
      text: "Por esta convicción, ya les adelanto que en el proyecto que vengo a presentarles no figura la amnistía, no figura la autodeterminación de parte de la nación ni fórmulas análogas o equivalentes.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-4.PDF#page=6",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 4 (26-9-2023): debate de investidura",
        date: "2023-09-26",
        page: "6",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2024-03-14",
      summary:
        "Los 137 diputados del GP Popular votaron en contra del dictamen de la proposición de ley orgánica de amnistía el 14-3-2024 (aprobado por 178 a 172).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 30,
          date: "2024-03-14",
          number: 1,
          title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña (votación del nuevo dictamen)",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json`,
        },
      ],
    },
    verdict: "cumple",
    note: "Después, diputados y senadores del PP recurrieron la ley ante el Tribunal Constitucional (recurso 6436-2024, resuelto por la STC 137/2025, BOE-A-2025-15939).",
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "Els 137 diputats del GP Popular van votar en contra del dictamen de la proposició de llei orgànica d'amnistia el 14-3-2024 (aprovat per 178 a 172).",
        note: "Després, diputats i senadors del PP van recórrer la llei davant el Tribunal Constitucional (recurs 6436-2024, resolt per la STC 137/2025, BOE-A-2025-15939).",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "Os 137 deputados do GP Popular votaron en contra do ditame da proposición de lei orgánica de amnistía o 14-3-2024 (aprobado por 178 a 172).",
        note: "Despois, deputados e senadores do PP recorreron a lei ante o Tribunal Constitucional (recurso 6436-2024, resolto pola STC 137/2025, BOE-A-2025-15939).",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "GP Popularreko 137 diputatuek amnistiari buruzko lege organiko-proposamenaren irizpenaren aurka bozkatu zuten 14-3-2024an (178 baiezko eta 172 ezezkorekin onartu zen).",
        note: "Gero, PPko diputatuek eta senatariek legearen aurkako errekurtsoa jarri zuten Auzitegi Konstituzionalean (6436-2024 errekurtsoa, STC 137/2025 epaiak ebatzia, BOE-A-2025-15939).",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-extremadura-vox-2023",
    partyId: "pp",
    topic: "Entrada de Vox en el Gobierno de Extremadura",
    said: {
      speaker: "María Guardiola Martín",
      role: "presidenta del PP de Extremadura y candidata a la Presidencia de la Junta",
      date: "2023-06-20",
      text: "Yo no puedo dejar entrar en mi Gobierno a aquellos que niegan la violencia machista, a quienes usan el trazo gordo, a quienes están deshumanizando a los inmigrantes y a quienes despliegan una lona y tiran a una papelera la bandera LGTBI",
      source: {
        url: "https://www.publico.es/politica/guardiola-mi-palabra-importante-futuro-extremenos.html",
        title: "Público — «Guardiola: \"Mi palabra no es tan importante como el futuro de los extremeños\"» (30-6-2023)",
        date: "2023-06-30",
        archiveUrl:
          "https://web.archive.org/web/20251023152242/https://www.publico.es/politica/guardiola-mi-palabra-importante-futuro-extremenos.html",
        kind: "prensa",
      },
    },
    did: {
      date: "2023-07-20",
      summary:
        "Guardiola fue investida presidenta de la Junta el 14-7-2023 con 33 votos a favor (28 del PP y 5 de Vox). El 20-7-2023 nombró consejera de Gestión Forestal y Mundo Rural a María del Camino Limia Santiago (Decreto de la Presidenta 25/2023, DOE núm. 140), la consejera que el acuerdo de gobierno con Vox reservaba a ese partido (dato de prensa: ver nota).",
      evidence: [
        {
          kind: "otro-parlamento",
          chamber: "Asamblea de Extremadura",
          title: "Investidura de María Guardiola Martín como presidenta de la Junta de Extremadura (33 a favor: 28 PP y 5 Vox; 32 en contra)",
          date: "2023-07-14",
          vote: "si",
          url: "https://www.juntaex.es/w/maria-guardiola-investida-presidenta-de-la-junta-de-extremadura",
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-16406",
          title: "Real Decreto 648/2023, de 14 de julio, por el que se nombra Presidenta de la Comunidad Autónoma de Extremadura a doña María Guardiola Martín",
          url: BOE("BOE-A-2023-16406"),
          date: "2023-07-15",
          role: "gobierno",
        },
      ],
    },
    verdict: "contradice",
    note: "Frase pronunciada al romperse la primera negociación con Vox (la recoge también La Política Online el 20-6-2023: https://web.archive.org/web/20230620200518/https://www.lapoliticaonline.com/espana/comunidades-es/la-candidata-del-pp-a-la-presidencia-de-extremadura-no-puedo-dejar-entrar-en-mi-gobierno-a-aquellos-que-niegan-la-violencia-machista/). Nombramiento: https://doe.juntaex.es/pdfs/doe/2023/1400o/23030025.pdf. Que Limia fue la consejera propuesta por Vox consta en prensa (eldiario.es, 5-10-2023: https://www.eldiario.es/extremadura/politica/dimite-consejera-extremena-vox-gobierno-maria-guardiola_1_10574548.html), no en el decreto. Las cifras de la investidura son las de la nota oficial de la Junta.",
    i18n: {
      ca: {
        topic: "Entrada de Vox al Govern d'Extremadura",
        summary: "Guardiola va ser investida presidenta de la Junta el 14-7-2023 amb 33 vots a favor (28 del PP i 5 de Vox). El 20-7-2023 va nomenar consellera de Gestió Forestal i Món Rural María del Camino Limia Santiago (Decreto de la Presidenta 25/2023, DOE núm. 140), la consellera que l'acord de govern amb Vox reservava a aquest partit (dada de premsa: vegeu la nota).",
        note: "Frase pronunciada en trencar-se la primera negociació amb Vox (la recull també La Política Online el 20-6-2023: https://web.archive.org/web/20230620200518/https://www.lapoliticaonline.com/espana/comunidades-es/la-candidata-del-pp-a-la-presidencia-de-extremadura-no-puedo-dejar-entrar-en-mi-gobierno-a-aquellos-que-niegan-la-violencia-machista/). Nomenament: https://doe.juntaex.es/pdfs/doe/2023/1400o/23030025.pdf. Que Limia va ser la consellera proposada per Vox consta en premsa (eldiario.es, 5-10-2023: https://www.eldiario.es/extremadura/politica/dimite-consejera-extremena-vox-gobierno-maria-guardiola_1_10574548.html), no en el decret. Les xifres de la investidura són les de la nota oficial de la Junta.",
        role: "presidenta del PP d'Extremadura i candidata a la Presidència de la Junta",
      },
      gl: {
        topic: "Entrada de Vox no Goberno de Estremadura",
        summary: "Guardiola foi investida presidenta da Xunta o 14-7-2023 con 33 votos a favor (28 do PP e 5 de Vox). O 20-7-2023 nomeou conselleira de Xestión Forestal e Mundo Rural a María del Camino Limia Santiago (Decreto de la Presidenta 25/2023, DOE núm. 140), a conselleira que o acordo de goberno con Vox reservaba a ese partido (dato de prensa: ver nota).",
        note: "Frase pronunciada ao romper a primeira negociación con Vox (recóllea tamén La Política Online o 20-6-2023: https://web.archive.org/web/20230620200518/https://www.lapoliticaonline.com/espana/comunidades-es/la-candidata-del-pp-a-la-presidencia-de-extremadura-no-puedo-dejar-entrar-en-mi-gobierno-a-aquellos-que-niegan-la-violencia-machista/). Nomeamento: https://doe.juntaex.es/pdfs/doe/2023/1400o/23030025.pdf. Que Limia foi a conselleira proposta por Vox consta na prensa (eldiario.es, 5-10-2023: https://www.eldiario.es/extremadura/politica/dimite-consejera-extremena-vox-gobierno-maria-guardiola_1_10574548.html), non no decreto. As cifras da investidura son as da nota oficial da Xunta.",
        role: "presidenta do PP de Estremadura e candidata á Presidencia da Xunta",
      },
      eu: {
        topic: "Vox Extremadurako Gobernuan sartzea",
        summary: "Guardiola Juntako presidente izendatu zuten inbestidura-bozketan 14-7-2023an, 33 aldeko botorekin (28 PPrenak eta 5 Voxenak). 20-7-2023an, María del Camino Limia Santiago izendatu zuen Baso Kudeaketa eta Landa Inguruneko kontseilari (Decreto de la Presidenta 25/2023, DOE 140. zk.); Voxekin egindako gobernu-akordioak alderdi horrentzat gordetzen zuen kontseilaria zen (prentsako datua: ikus oharra).",
        note: "Voxekin lehen negoziazioa hautsi zenean esandako esaldia (La Política Online-k ere jasotzen du 20-6-2023an: https://web.archive.org/web/20230620200518/https://www.lapoliticaonline.com/espana/comunidades-es/la-candidata-del-pp-a-la-presidencia-de-extremadura-no-puedo-dejar-entrar-en-mi-gobierno-a-aquellos-que-niegan-la-violencia-machista/). Izendapena: https://doe.juntaex.es/pdfs/doe/2023/1400o/23030025.pdf. Limia Voxek proposatutako kontseilaria izan zela prentsan jasota dago (eldiario.es, 5-10-2023: https://www.eldiario.es/extremadura/politica/dimite-consejera-extremena-vox-gobierno-maria-guardiola_1_10574548.html), ez dekretuan. Inbestiduraren zifrak Juntaren ohar ofizialekoak dira.",
        role: "Extremadurako PPko presidentea eta Juntako presidentetzarako hautagaia",
      },
    },
  },
  // ─── Vivienda (añadido el 2026-10-07) ───────────────────────────────────
  // Mismo criterio que para el PSOE y sus socios (2018–2026). Ni la
  // investidura de 2011 ni el programa de 2011 ni el Plan Estatal 2013-2016
  // (RD 233/2013) fijan una cifra de viviendas que contrastar con datos de
  // resultado; los compromisos de vivienda comprobables del PP son fiscales y
  // normativos, y se contrastan con el BOE.
  {
    id: "pp-deduccion-vivienda-2011",
    partyId: "pp",
    topic: "Vivienda",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "recuperaremos la deducción en el impuesto por inversión en vivienda habitual.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=13`, page: "13" },
    },
    did: {
      date: "2012-12-28",
      summary:
        "El Real Decreto-ley 20/2011 restableció, con efectos desde el 1-1-2011, la deducción del 7,5 % por inversión en vivienda habitual (base máxima de 9.040 euros). La Ley 16/2012 la suprimió a partir del 1-1-2013, con un régimen transitorio para quien hubiera comprado antes.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2011-20638",
          title:
            "Real Decreto-ley 20/2011, de 30 de diciembre, de medidas urgentes en materia presupuestaria, tributaria y financiera para la corrección del déficit público",
          url: BOE("BOE-A-2011-20638"),
          date: "2011-12-31",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2012-15650",
          title:
            "Ley 16/2012, de 27 de diciembre, por la que se adoptan diversas medidas tributarias dirigidas a la consolidación de las finanzas públicas y al impulso de la actividad económica",
          url: BOE("BOE-A-2012-15650"),
          date: "2012-12-28",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Cumplió once días después (la deducción se recuperó para 2011 y 2012), pero un año más tarde la suprimió para las compras desde el 1-1-2013. Mismo patrón que «pp-pensiones-2012»: cumplido y revertido después.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El Reial decret llei 20/2011 va restablir, amb efectes des de l'1-1-2011, la deducció del 7,5 % per inversió en habitatge habitual (base màxima de 9.040 euros). La Llei 16/2012 la va suprimir a partir de l'1-1-2013, amb un règim transitori per a qui hagués comprat abans.",
        note: "Ho va complir onze dies després (la deducció es va recuperar per al 2011 i el 2012), però un any més tard la va suprimir per a les compres des de l'1-1-2013. Mateix patró que «pp-pensiones-2012»: complert i revertit després.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Vivenda",
        summary: "O Real decreto-lei 20/2011 restableceu, con efectos desde o 1-1-2011, a dedución do 7,5 % por investimento en vivenda habitual (base máxima de 9.040 euros). A Lei 16/2012 suprimiuna a partir do 1-1-2013, cun réxime transitorio para quen comprase antes.",
        note: "Cumpriuno once días despois (a dedución recuperouse para 2011 e 2012), pero un ano máis tarde suprimiuna para as compras desde o 1-1-2013. Mesmo patrón que «pp-pensiones-2012»: cumprido e revertido despois.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "20/2011 Errege Lege-dekretuak berrezarri zuen, 1-1-2011tik aurrerako ondorioekin, ohiko etxebizitzan egindako inbertsioagatiko % 7,5eko kenkaria (gehieneko oinarria: 9.040 euro). 16/2012 Legeak kendu egin zuen 1-1-2013tik aurrera, aurretik erosi zutenentzako trantsizio-araubide batekin.",
        note: "Hamaika egun geroago bete zuen (kenkaria 2011rako eta 2012rako berreskuratu zen), baina urtebete geroago kendu egin zuen 1-1-2013tik aurrerako erosketetarako. «pp-pensiones-2012» sarreraren eredu bera: bete, eta gero desegin.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-iva-vivienda-2011",
    partyId: "pp",
    topic: "Vivienda",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "se mantendrá el tipo superreducido en la adquisición de vivienda, pero únicamente si se trata de la vivienda habitual y con un límite en el precio de su adquisición.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=13`, page: "13" },
    },
    did: {
      date: "2011-12-31",
      summary:
        "El Real Decreto-ley 20/2011 (disposición final quinta, que da nueva redacción a la disposición transitoria cuarta del Real Decreto-ley 9/2011) mantuvo el tipo del 4 % para las entregas de viviendas «con vigencia exclusivamente hasta el 31 de diciembre de 2012», para toda vivienda, sin limitarlo a la habitual ni fijar un precio máximo.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2011-20638",
          title:
            "Real Decreto-ley 20/2011, de 30 de diciembre, de medidas urgentes en materia presupuestaria, tributaria y financiera para la corrección del déficit público",
          url: BOE("BOE-A-2011-20638"),
          date: "2011-12-31",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Se mantuvo el 4 % un año (2012), pero sin las dos condiciones anunciadas (solo vivienda habitual y con límite de precio), y con fecha de fin fijada en el propio decreto. El programa electoral de 2011 (p. 59 del PDF) ya decía «de forma transitoria».",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El Reial decret llei 20/2011 (disposició final cinquena, que dona nova redacció a la disposició transitòria quarta del Reial decret llei 9/2011) va mantenir el tipus del 4 % per als lliuraments d'habitatges «con vigencia exclusivamente hasta el 31 de diciembre de 2012», per a qualsevol habitatge, sense limitar-lo a l'habitual ni fixar un preu màxim.",
        note: "Es va mantenir el 4 % un any (2012), però sense les dues condicions anunciades (només habitatge habitual i amb límit de preu), i amb data de fi fixada en el mateix decret. El programa electoral del 2011 (p. 59 del PDF) ja deia «de forma transitoria».",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Vivenda",
        summary: "O Real decreto-lei 20/2011 (disposición derradeira quinta, que dá nova redacción á disposición transitoria cuarta do Real decreto-lei 9/2011) mantivo o tipo do 4 % para as entregas de vivendas «con vigencia exclusivamente hasta el 31 de diciembre de 2012», para toda vivenda, sen limitalo á habitual nin fixar un prezo máximo.",
        note: "Mantívose o 4 % un ano (2012), pero sen as dúas condicións anunciadas (só vivenda habitual e con límite de prezo), e con data de fin fixada no propio decreto. O programa electoral de 2011 (p. 59 do PDF) xa dicía «de forma transitoria».",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "20/2011 Errege Lege-dekretuak (bosgarren azken xedapena, 9/2011 Errege Lege-dekretuaren laugarren xedapen iragankorrari idazkera berria ematen diona) % 4ko tasa mantendu zuen etxebizitzen entregetarako, «con vigencia exclusivamente hasta el 31 de diciembre de 2012», etxebizitza guztietarako, ohikora mugatu gabe eta gehieneko preziorik finkatu gabe.",
        note: "% 4a urtebetez mantendu zen (2012), baina iragarritako bi baldintzarik gabe (ohiko etxebizitza soilik eta prezio-mugarekin), eta dekretuak berak finkatutako amaiera-datarekin. 2011ko hauteskunde-programak (PDFaren 59. or.) «de forma transitoria» zioen jada.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-alquiler-flexibilizacion-2011",
    partyId: "pp",
    topic: "Vivienda",
    said: {
      speaker: "Partido Popular",
      role: "programa electoral de las generales de 2011 («Lo que España necesita»)",
      date: "2011-10-31",
      text: "Dotaremos al contrato de arrendamiento de mayor flexibilidad y libertad de pactos. Incrementaremos la seguridad jurídica a las partes y agilizaremos los mecanismos de resolución de conflictos.",
      source: {
        url: "https://www.pp.es/storage/2013/11/5742-20111031195458.pdf#page=59",
        title: "Partido Popular — Programa electoral 2011 «Lo que España necesita. Más sociedad, mejor gobierno»",
        year: 2011,
        page: "59",
        kind: "programa",
      },
    },
    did: {
      date: "2013-06-05",
      summary:
        "La Ley 4/2013 modificó la Ley de Arrendamientos Urbanos «reforzando la libertad de pactos y dando prioridad a la voluntad de las partes» y redujo «de cinco a tres años la prórroga obligatoria y de tres a uno la prórroga tácita».",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2013-5941",
          title: "Ley 4/2013, de 4 de junio, de medidas de flexibilización y fomento del mercado del alquiler de viviendas",
          url: BOE("BOE-A-2013-5941"),
          date: "2013-06-05",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "El preámbulo del Real Decreto 233/2013 (BOE-A-2013-3780) la cita entre las «iniciativas legislativas» del Gobierno «actualmente en tramitación». La Ley 4/2013 no fija cifras de oferta de alquiler, así que no hay dato de resultado que contrastar.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La Llei 4/2013 va modificar la Llei d'arrendaments urbans «reforzando la libertad de pactos y dando prioridad a la voluntad de las partes» i va reduir «de cinco a tres años la prórroga obligatoria y de tres a uno la prórroga tácita».",
        note: "El preàmbul del Reial decret 233/2013 (BOE-A-2013-3780) la cita entre les «iniciativas legislativas» del Govern «actualmente en tramitación». La Llei 4/2013 no fixa xifres d'oferta de lloguer, de manera que no hi ha cap dada de resultat per contrastar.",
        role: "programa electoral de les eleccions generals del 2011 («Lo que España necesita»)",
      },
      gl: {
        topic: "Vivenda",
        summary: "A Lei 4/2013 modificou a Lei de arrendamentos urbanos «reforzando la libertad de pactos y dando prioridad a la voluntad de las partes» e reduciu «de cinco a tres años la prórroga obligatoria y de tres a uno la prórroga tácita».",
        note: "O preámbulo do Real decreto 233/2013 (BOE-A-2013-3780) cítaa entre as «iniciativas legislativas» do Goberno «actualmente en tramitación». A Lei 4/2013 non fixa cifras de oferta de alugamento, así que non hai dato de resultado que contrastar.",
        role: "programa electoral das xerais de 2011 («Lo que España necesita»)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "4/2013 Legeak Hiri Errentamenduen Legea aldatu zuen, «reforzando la libertad de pactos y dando prioridad a la voluntad de las partes», eta murriztu egin zuen «de cinco a tres años la prórroga obligatoria y de tres a uno la prórroga tácita».",
        note: "233/2013 Errege Dekretuaren hitzaurreak (BOE-A-2013-3780) Gobernuaren «iniciativas legislativas» artean aipatzen du, «actualmente en tramitación». 4/2013 Legeak ez du alokairu-eskaintzaren zifrarik finkatzen; beraz, ez dago emaitza-daturik egiaztatzeko.",
        role: "2011ko hauteskunde orokorretako hauteskunde-programa («Lo que España necesita»)",
      },
    },
  },
  {
    id: "pp-adjudicacion-hipotecaria-2011",
    partyId: "pp",
    topic: "Vivienda",
    said: {
      speaker: "Partido Popular",
      role: "programa electoral de las generales de 2011 («Lo que España necesita»)",
      date: "2011-10-31",
      text: "En el caso de ejecuciones hipotecarias aceleraremos la introducción de subastas judiciales electrónicas que permitan ampliar el número potencial de licitadores y, en ausencia de éstos, elevaremos el porcentaje del valor de tasación por el cual la entidad financiera pueda adjudicarse el inmueble.",
      source: {
        url: "https://www.pp.es/storage/2013/11/5742-20111031195458.pdf#page=60",
        title: "Partido Popular — Programa electoral 2011 «Lo que España necesita. Más sociedad, mejor gobierno»",
        year: 2011,
        page: "60",
        kind: "programa",
      },
    },
    did: {
      date: "2013-05-15",
      summary:
        "La Ley 1/2013 modificó el artículo 671 de la Ley de Enjuiciamiento Civil: si la subasta queda sin postor y se trata de la vivienda habitual del deudor, la adjudicación al acreedor se hace por el 70 % del valor de salida (o por el 60 % si lo que se le debe es inferior). Su preámbulo lo resume como elevar el porcentaje «del 60 por cien hasta un máximo del 70 por cien».",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2013-5073",
          title: "Ley 1/2013, de 14 de mayo, de medidas para reforzar la protección a los deudores hipotecarios, reestructuración de deuda y alquiler social",
          url: BOE("BOE-A-2013-5073"),
          date: "2013-05-15",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    note: "Solo se contrasta la segunda parte de la cita (porcentaje de adjudicación); las subastas electrónicas no se han comprobado aquí. `role: apoyo` porque no se ha verificado si la ley procede de un proyecto del Gobierno: es una ley de las Cortes de la X legislatura.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La Llei 1/2013 va modificar l'article 671 de la Llei d'enjudiciament civil: si la subhasta queda sense postor i es tracta de l'habitatge habitual del deutor, l'adjudicació al creditor es fa pel 70 % del valor de sortida (o pel 60 % si el que se li deu és inferior). El preàmbul ho resumeix com a elevar el percentatge «del 60 por cien hasta un máximo del 70 por cien».",
        note: "Només es contrasta la segona part de la cita (percentatge d'adjudicació); les subhastes electròniques no s'han comprovat aquí. `role: apoyo` perquè no s'ha verificat si la llei prové d'un projecte del Govern: és una llei de les Corts de la X legislatura.",
        role: "programa electoral de les eleccions generals del 2011 («Lo que España necesita»)",
      },
      gl: {
        topic: "Vivenda",
        summary: "A Lei 1/2013 modificou o artigo 671 da Lei de axuizamento civil: se a poxa queda sen licitador e se trata da vivenda habitual do debedor, a adxudicación ao acredor faise polo 70 % do valor de saída (ou polo 60 % se o que se lle debe é inferior). O seu preámbulo resúmeo como elevar a porcentaxe «del 60 por cien hasta un máximo del 70 por cien».",
        note: "Só se contrasta a segunda parte da cita (porcentaxe de adxudicación); as poxas electrónicas non se comprobaron aquí. `role: apoyo` porque non se verificou se a lei procede dun proxecto do Goberno: é unha lei das Cortes da X lexislatura.",
        role: "programa electoral das xerais de 2011 («Lo que España necesita»)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "1/2013 Legeak Prozedura Zibilaren Legearen 671. artikulua aldatu zuen: enkantean lizitatzailerik ez badago eta zordunaren ohiko etxebizitza bada, hartzekodunari irteera-balioaren % 70ean esleitzen zaio (edo % 60an, zor zaiona txikiagoa bada). Haren hitzaurreak honela laburtzen du: ehunekoa igotzea «del 60 por cien hasta un máximo del 70 por cien».",
        note: "Aipuaren bigarren zatia bakarrik egiaztatzen da (esleipen-ehunekoa); enkante elektronikoak ez dira hemen egiaztatu. `role: apoyo`, ez delako egiaztatu legea Gobernuaren proiektu batetik datorren: X. legealdiko Gorteen legea da.",
        role: "2011ko hauteskunde orokorretako hauteskunde-programa («Lo que España necesita»)",
      },
    },
  },
  // ─── Cuentas públicas, banca, justicia e impuestos (añadido el 2026-10-07) ─
  // Regla de profundidad: ≈ 2 entradas por año de gobierno del Estado (PP:
  // dic. 2011 – jun. 2018, ≈ 6,5 años → ≈ 13). Compromisos medibles con dato
  // oficial de resultado (Eurostat, Ministerio de Hacienda, Banco de España) o
  // con norma en el BOE. Datos de Eurostat: tabla gov_10dd_edpt1, actualización
  // del 22-4-2026 (series revisadas: no coinciden con las cifras publicadas en
  // su día). Citas: Diario de Sesiones (PDF), programa de 2011 (PDF de pp.es)
  // y transcripción oficial de La Moncloa.
  {
    id: "pp-deficit-2012",
    partyId: "pp",
    topic: "Reducción del déficit público en 2012",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2011-12-19",
      text: "Ese es el objetivo, ese es nuestro compromiso y a él nos vamos a atener: 16.500 millones de reducción de déficit en el año 2012.",
      source: { ...INVESTIDURA_2011, url: `${INVESTIDURA_2011.url}#page=10`, page: "10" },
    },
    did: {
      date: "2013-02-28",
      summary:
        "El Ministerio de Hacienda cifró el déficit de las Administraciones Públicas de 2012 en 70.822 millones de euros (6,74 % del PIB), frente a 95.266 millones (8,96 %) en 2011, con el desglose por subsectores «sin ayudas financieras». En la serie actual de Eurostat, que computa las ayudas a la banca como gasto, el déficit pasó de 103.575 millones (9,7 %) en 2011 a 119.094 millones (11,5 %) en 2012.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "«El conjunto de las Administraciones Públicas cerró 2012 con un déficit del 6,74% del PIB» (nota de prensa)",
          url: "https://www.hacienda.gob.es/es-ES/Prensa/En%20Portada/2013/Paginas/20130228_ejecucion2012.aspx",
          date: "2013-02-28",
          publisher: "Ministerio de Hacienda y Administraciones Públicas",
          value: "2012: −70.822 millones de euros (−6,74 % del PIB); 2011: −95.266 millones (−8,96 %)",
        },
        {
          kind: "dato-oficial",
          title: "Government deficit/surplus, debt and associated data (gov_10dd_edpt1), España, Administraciones Públicas (S13), B9",
          url: "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=es",
          date: "2012-12-31",
          publisher: "Eurostat",
          value: "2011: −103.575 millones de euros (−9,7 % del PIB); 2012: −119.094 millones (−11,5 %)",
        },
      ],
    },
    verdict: "parcial",
    note: "Sin las ayudas a la banca, el déficit bajó en 2012 más de lo comprometido (24.444 millones según las cifras de Hacienda de febrero de 2013). Con ellas, como las computa Eurostat, subió 15.519 millones. El objetivo con la UE que Rajoy asumió en la réplica (4,4 % del PIB, p. 26 del mismo Diario) se relajó al 6,3 % en 2012 y tampoco se alcanzó (6,74 % según Hacienda). Las cifras de Hacienda y Eurostat son de vintages distintos y no deben restarse entre sí.",
    i18n: {
      ca: {
        topic: "Reducció del dèficit públic el 2012",
        summary: "El Ministeri d'Hisenda va xifrar el dèficit de les administracions públiques del 2012 en 70.822 milions d'euros (6,74 % del PIB), davant de 95.266 milions (8,96 %) el 2011, amb el desglossament per subsectors «sin ayudas financieras». En la sèrie actual d'Eurostat, que computa les ajudes a la banca com a despesa, el dèficit va passar de 103.575 milions (9,7 %) el 2011 a 119.094 milions (11,5 %) el 2012.",
        note: "Sense les ajudes a la banca, el dèficit va baixar el 2012 més del que s'havia compromès (24.444 milions segons les xifres d'Hisenda de febrer del 2013). Amb les ajudes, tal com les computa Eurostat, va augmentar 15.519 milions. L'objectiu amb la UE que Rajoy va assumir en la rèplica (4,4 % del PIB, p. 26 del mateix Diari) es va relaxar al 6,3 % el 2012 i tampoc no es va assolir (6,74 % segons Hisenda). Les xifres d'Hisenda i d'Eurostat són de versions diferents i no s'han de restar entre si.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Redución do déficit público en 2012",
        summary: "O Ministerio de Facenda cifrou o déficit das administracións públicas de 2012 en 70.822 millóns de euros (6,74 % do PIB), fronte a 95.266 millóns (8,96 %) en 2011, co desagregamento por subsectores «sin ayudas financieras». Na serie actual de Eurostat, que computa as axudas á banca como gasto, o déficit pasou de 103.575 millóns (9,7 %) en 2011 a 119.094 millóns (11,5 %) en 2012.",
        note: "Sen as axudas á banca, o déficit baixou en 2012 máis do comprometido (24.444 millóns segundo as cifras de Facenda de febreiro de 2013). Con elas, tal como as computa Eurostat, subiu 15.519 millóns. O obxectivo coa UE que Rajoy asumiu na réplica (4,4 % do PIB, p. 26 do mesmo Diario) relaxouse ao 6,3 % en 2012 e tampouco se alcanzou (6,74 % segundo Facenda). As cifras de Facenda e de Eurostat son de versións distintas e non deben restarse entre si.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "Defizit publikoaren murrizketa 2012an",
        summary: "Ogasun Ministerioak 70.822 milioi eurotan (BPGaren % 6,74) zenbatetsi zuen administrazio publikoen 2012ko defizita, 2011ko 95.266 milioien (% 8,96) aldean, azpisektoreen araberako banakapenarekin, «sin ayudas financieras». Eurostaten egungo serian, bankuei emandako laguntzak gastu gisa zenbatzen baititu, defizita 103.575 milioitik (% 9,7) 2011n 119.094 milioira (% 11,5) igo zen 2012an.",
        note: "Bankuei emandako laguntzarik gabe, 2012an defizita konprometitutakoa baino gehiago jaitsi zen (24.444 milioi, Ogasunaren 2013ko otsaileko zifren arabera). Laguntzekin, Eurostatek zenbatzen dituen bezala, 15.519 milioi igo zen. Rajoyk erreplikan EBrekin hartutako helburua (BPGaren % 4,4, Egunkari bereko 26. or.) % 6,3ra malgutu zen 2012an, eta hori ere ez zen lortu (% 6,74, Ogasunaren arabera). Ogasunaren eta Eurostaten zifrak bertsio desberdinetakoak dira, eta ez dira bata bestetik kendu behar.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "pp-rescate-bancario-coste",
    partyId: "pp",
    topic: "Coste del rescate bancario para el contribuyente",
    said: {
      speaker: "Soraya Sáenz de Santamaría Antón",
      role: "vicepresidenta del Gobierno (rueda de prensa del Consejo de Ministros que aprobó el Real Decreto-ley 24/2012, de reestructuración y resolución de entidades de crédito)",
      date: "2012-08-31",
      text: "Se hace, además, con un objetivo --termino con este colofón, porque es de los más importantes--, básico y fundamental: que no cueste un euro al contribuyente",
      source: {
        url: "https://www.lamoncloa.gob.es/consejodeministros/Paginas/enlacetranscripciones/310812-enlacevice.aspx",
        title: "La Moncloa — Rueda de prensa posterior al Consejo de Ministros. Intervención de la vicepresidenta del Gobierno, Soraya Sáenz de Santamaría (31-8-2012)",
        date: "2012-08-31",
        kind: "gobierno",
      },
    },
    did: {
      date: "2018-12-31",
      summary:
        "Según el Banco de España, desde 2009 el FROB aportó 54.353 millones de euros en ayudas de capital a entidades bancarias y había recuperado 4.477 millones a 31-12-2018. Su estimación de los recursos netos aportados por el FROB, descontando lo recuperable y sumando las garantías, era de 42.561 millones.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Nota informativa sobre ayudas financieras en el proceso de reestructuración del sistema financiero español (2009-2018)",
          url: "https://www.bde.es/f/webbde/GAP/Secciones/SalaPrensa/NotasInformativas/Briefing_notes/es/notabe201119.pdf",
          date: "2019-11-20",
          publisher: "Banco de España",
          value: "FROB: 54.353 millones de euros en ayudas de capital, 4.477 millones recuperados y 42.561 millones de recursos netos estimados (datos a 31-12-2018)",
        },
      ],
    },
    verdict: "no-hecho",
    note: "El PP gobernó durante toda la reestructuración posterior a 2011 (2012-2018) y aprobó su marco legal, el Real Decreto-ley 24/2012 (BOE-A-2012-11247), así que el objetivo estaba en su mano en lo que dependía del Estado. Parte de las ayudas que cuenta el Banco de España son anteriores a diciembre de 2011 (p. ej., CajaSur, 800 millones), de los gobiernos del PSOE: la nota no las separa por año. Lo dicho era «un objetivo», no una garantía.",
    i18n: {
      ca: {
        topic: "Cost del rescat bancari per al contribuent",
        summary: "Segons el Banc d'Espanya, des del 2009 el FROB va aportar 54.353 milions d'euros en ajudes de capital a entitats bancàries i n'havia recuperat 4.477 milions a 31-12-2018. La seva estimació dels recursos nets aportats pel FROB, descomptant el que és recuperable i sumant-hi les garanties, era de 42.561 milions.",
        note: "El PP va governar durant tota la reestructuració posterior al 2011 (2012-2018) i en va aprovar el marc legal, el Reial decret llei 24/2012 (BOE-A-2012-11247), de manera que l'objectiu era a les seves mans en allò que depenia de l'Estat. Part de les ajudes que compta el Banc d'Espanya són anteriors a desembre del 2011 (p. ex., CajaSur, 800 milions), dels governs del PSOE: la nota no les separa per any. El que es va dir era «un objetivo», no una garantia.",
        role: "vicepresidenta del Govern (roda de premsa del Consell de Ministres que va aprovar el Reial decret llei 24/2012, de reestructuració i resolució d'entitats de crèdit)",
      },
      gl: {
        topic: "Custo do rescate bancario para o contribuínte",
        summary: "Segundo o Banco de España, desde 2009 o FROB achegou 54.353 millóns de euros en axudas de capital a entidades bancarias e recuperara 4.477 millóns a 31-12-2018. A súa estimación dos recursos netos achegados polo FROB, descontando o recuperable e sumando as garantías, era de 42.561 millóns.",
        note: "O PP gobernou durante toda a reestruturación posterior a 2011 (2012-2018) e aprobou o seu marco legal, o Real decreto-lei 24/2012 (BOE-A-2012-11247), así que o obxectivo estaba na súa man no que dependía do Estado. Parte das axudas que conta o Banco de España son anteriores a decembro de 2011 (p. ex., CajaSur, 800 millóns), dos gobernos do PSOE: a nota non as separa por ano. O dito era «un objetivo», non unha garantía.",
        role: "vicepresidenta do Goberno (rolda de prensa do Consello de Ministros que aprobou o Real decreto-lei 24/2012, de reestruturación e resolución de entidades de crédito)",
      },
      eu: {
        topic: "Banku-erreskatearen kostua zergadunarentzat",
        summary: "Espainiako Bankuaren arabera, 2009tik FROBek 54.353 milioi euro eman zizkien banku-erakundeei kapital-laguntzetan, eta 4.477 milioi berreskuratuak zituen 31-12-2018an. FROBek emandako baliabide garbien zenbatespena, berreskura daitekeena kenduta eta bermeak gehituta, 42.561 milioikoa zen.",
        note: "PPk gobernatu zuen 2011ren ondorengo berregituraketa osoan (2012-2018), eta haren lege-esparrua onartu zuen, 24/2012 Errege Lege-dekretua (BOE-A-2012-11247); beraz, helburua bere esku zegoen, Estatuaren mende zegoen neurrian. Espainiako Bankuak zenbatzen dituen laguntzen zati bat 2011ko abendua baino lehenagokoa da (adibidez, CajaSur, 800 milioi), PSOEren gobernuen garaikoa: oharrak ez ditu urteka bereizten. Esandakoa «un objetivo» zen, ez berme bat.",
        role: "Gobernuko presidenteordea (kreditu-erakundeak berregituratzeko eta ebazteko 24/2012 Errege Lege-dekretua onartu zuen Ministro Kontseiluaren ondorengo prentsaurrekoa)",
      },
    },
  },
  {
    id: "pp-cgpj-eleccion-jueces-2013",
    partyId: "pp",
    topic: "Elección de los vocales judiciales del CGPJ",
    said: {
      speaker: "Partido Popular",
      role: "programa electoral de las generales de 2011 («Lo que España necesita»)",
      date: "2011-10-31",
      text: "Promoveremos la reforma del sistema de elección de los vocales del Consejo General del Poder Judicial, para que, conforme a la Constitución, doce de sus veinte miembros sean elegidos de entre y por jueces y magistrados de todas las categorías.",
      source: {
        url: "https://www.pp.es/storage/2013/11/5742-20111031195458.pdf#page=179",
        title: "Partido Popular — Programa electoral 2011 «Lo que España necesita. Más sociedad, mejor gobierno»",
        year: 2011,
        page: "179",
        kind: "programa",
      },
    },
    did: {
      date: "2013-06-29",
      summary:
        "El Gobierno remitió el proyecto de ley orgánica de reforma del CGPJ (121/000041, BOCG 8-3-2013). La Ley Orgánica 4/2013 dispuso que «los veinte Vocales del Consejo General del Poder Judicial serán designados por las Cortes Generales» (art. 567): cada Cámara elige por tres quintos a diez vocales, seis de ellos del turno judicial entre candidatos que se presentan con avales de jueces o asociaciones.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2013-7061",
          title:
            "Ley Orgánica 4/2013, de 28 de junio, de reforma del Consejo General del Poder Judicial, por la que se modifica la Ley Orgánica 6/1985, de 1 de julio, del Poder Judicial",
          url: BOE("BOE-A-2013-7061"),
          date: "2013-06-29",
          role: "gobierno",
        },
        {
          kind: "iniciativa",
          title: "Proyecto de Ley Orgánica de reforma del Consejo General del Poder Judicial (121/000041)",
          url: "https://www.congreso.es/public_oficiales/L10/CONG/BOCG/A/BOCG-10-A-41-1.PDF",
          status: "Publicado en el BOCG, serie A, núm. 41-1 (proyecto de ley del Gobierno)",
          date: "2013-03-08",
        },
      ],
    },
    verdict: "contradice",
    note: "El programa prometía que los doce vocales judiciales los eligieran los propios jueces; la ley del Gobierno del PP mantuvo la elección de los veinte por el Congreso y el Senado. Los jueces solo intervienen avalando candidaturas.",
    i18n: {
      ca: {
        topic: "Elecció dels vocals judicials del CGPJ",
        summary: "El Govern va remetre el projecte de llei orgànica de reforma del CGPJ (121/000041, BOCG 8-3-2013). La Llei orgànica 4/2013 va disposar que «los veinte Vocales del Consejo General del Poder Judicial serán designados por las Cortes Generales» (art. 567): cada cambra elegeix per tres cinquenes parts deu vocals, sis dels quals del torn judicial, entre candidats que es presenten amb avals de jutges o d'associacions.",
        note: "El programa prometia que els dotze vocals judicials els escollissin els mateixos jutges; la llei del Govern del PP va mantenir l'elecció dels vint pel Congrés i el Senat. Els jutges només hi intervenen avalant candidatures.",
        role: "programa electoral de les eleccions generals del 2011 («Lo que España necesita»)",
      },
      gl: {
        topic: "Elección dos vogais xudiciais do CGPJ",
        summary: "O Goberno remitiu o proxecto de lei orgánica de reforma do CGPJ (121/000041, BOCG 8-3-2013). A Lei orgánica 4/2013 dispuxo que «los veinte Vocales del Consejo General del Poder Judicial serán designados por las Cortes Generales» (art. 567): cada cámara elixe por tres quintos dez vogais, seis deles da quenda xudicial, entre candidatos que se presentan con avais de xuíces ou asociacións.",
        note: "O programa prometía que os doce vogais xudiciais os elixisen os propios xuíces; a lei do Goberno do PP mantivo a elección dos vinte polo Congreso e o Senado. Os xuíces só interveñen avalando candidaturas.",
        role: "programa electoral das xerais de 2011 («Lo que España necesita»)",
      },
      eu: {
        topic: "CGPJko kide judizialen hautaketa",
        summary: "Gobernuak CGPJ erreformatzeko lege organikoaren proiektua bidali zuen (121/000041, BOCG 8-3-2013). 4/2013 Lege Organikoak xedatu zuen «los veinte Vocales del Consejo General del Poder Judicial serán designados por las Cortes Generales» (567. art.): ganbera bakoitzak hiru bosteneko gehiengoz hamar kide hautatzen ditu, horietatik sei txanda judizialekoak, epaileen edo elkarteen abalekin aurkezten diren hautagaien artean.",
        note: "Programak agintzen zuen hamabi kide judizialak epaileek beraiek hautatuko zituztela; PPren Gobernuaren legeak mantendu egin zuen hogeiak Kongresuak eta Senatuak hautatzea. Epaileek hautagaitzak abalatuz soilik parte hartzen dute.",
        role: "2011ko hauteskunde orokorretako hauteskunde-programa («Lo que España necesita»)",
      },
    },
  },
  {
    id: "pp-iva-criterio-caja-2013",
    partyId: "pp",
    topic: "IVA de caja para autónomos y pymes",
    said: {
      speaker: "Partido Popular",
      role: "programa electoral de las generales de 2011 («Lo que España necesita»)",
      date: "2011-10-31",
      text: "Modificaremos, de acuerdo con la normativa europea, el régimen del IVA para que autónomos y pymes no tengan que pagar el impuesto hasta que efectivamente se haya efectuado el cobro de las facturas correspondientes.",
      source: {
        url: "https://www.pp.es/storage/2013/11/5742-20111031195458.pdf#page=40",
        title: "Partido Popular — Programa electoral 2011 «Lo que España necesita. Más sociedad, mejor gobierno»",
        year: 2011,
        page: "40",
        kind: "programa",
      },
    },
    did: {
      date: "2013-09-28",
      summary:
        "La Ley 14/2013 (art. 23), procedente del proyecto del Gobierno 121/000052, creó el «régimen especial del criterio de caja» del IVA: optativo para quien no supere 2.000.000 de euros de volumen de operaciones, con devengo «en el momento del cobro total o parcial del precio» o, si no se cobra, el 31 de diciembre del año siguiente.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2013-10074",
          title: "Ley 14/2013, de 27 de septiembre, de apoyo a los emprendedores y su internacionalización",
          url: BOE("BOE-A-2013-10074"),
          date: "2013-09-28",
          role: "gobierno",
        },
        {
          kind: "iniciativa",
          title: "Proyecto de Ley de apoyo a los emprendedores y su internacionalización (121/000052)",
          url: "https://www.congreso.es/public_oficiales/L10/CONG/BOCG/A/BOCG-10-A-52-1.PDF",
          status: "Publicado en el BOCG, serie A, núm. 52-1 (proyecto de ley del Gobierno)",
          date: "2013-07-03",
        },
      ],
    },
    verdict: "cumple",
    note: "El límite de 2 millones y la fecha tope del 31 de diciembre del año siguiente son los que permite la normativa europea (lo explica el preámbulo de la ley), y el programa ya decía «de acuerdo con la normativa europea». El régimen es optativo y retrasa también la deducción del IVA soportado.",
    i18n: {
      ca: {
        topic: "IVA de caixa per a autònoms i pimes",
        summary: "La Llei 14/2013 (art. 23), procedent del projecte del Govern 121/000052, va crear el «régimen especial del criterio de caja» de l'IVA: opcional per a qui no superi 2.000.000 d'euros de volum d'operacions, amb meritació «en el momento del cobro total o parcial del precio» o, si no es cobra, el 31 de desembre de l'any següent.",
        note: "El límit de 2 milions i la data límit del 31 de desembre de l'any següent són els que permet la normativa europea (ho explica el preàmbul de la llei), i el programa ja deia «de acuerdo con la normativa europea». El règim és opcional i també endarrereix la deducció de l'IVA suportat.",
        role: "programa electoral de les eleccions generals del 2011 («Lo que España necesita»)",
      },
      gl: {
        topic: "IVE de caixa para autónomos e pemes",
        summary: "A Lei 14/2013 (art. 23), procedente do proxecto do Goberno 121/000052, creou o «régimen especial del criterio de caja» do IVE: opcional para quen non supere 2.000.000 de euros de volume de operacións, con devindicación «en el momento del cobro total o parcial del precio» ou, se non se cobra, o 31 de decembro do ano seguinte.",
        note: "O límite de 2 millóns e a data límite do 31 de decembro do ano seguinte son os que permite a normativa europea (explícao o preámbulo da lei), e o programa xa dicía «de acuerdo con la normativa europea». O réxime é opcional e atrasa tamén a dedución do IVE soportado.",
        role: "programa electoral das xerais de 2011 («Lo que España necesita»)",
      },
      eu: {
        topic: "Kutxa-irizpideko BEZa autonomoentzat eta ETEentzat",
        summary: "14/2013 Legeak (23. art.), Gobernuaren 121/000052 proiektutik datorrenak, BEZaren «régimen especial del criterio de caja» sortu zuen: aukerakoa 2.000.000 euroko eragiketa-bolumena gainditzen ez dutenentzat, eta sortzapena «en el momento del cobro total o parcial del precio» gertatzen da edo, kobratzen ez bada, hurrengo urteko abenduaren 31n.",
        note: "2 milioiko muga eta hurrengo urteko abenduaren 31ko azken data Europako araudiak baimentzen dituenak dira (legearen hitzaurreak azaltzen du), eta programak jada zioen «de acuerdo con la normativa europea». Araubidea aukerakoa da, eta jasandako BEZaren kenkaria ere atzeratzen du.",
        role: "2011ko hauteskunde orokorretako hauteskunde-programa («Lo que España necesita»)",
      },
    },
  },
  {
    id: "pp-senda-deficit-2017",
    partyId: "pp",
    topic: "Senda de déficit pactada con la UE (2016-2018)",
    said: {
      speaker: RAJOY,
      role: `${RAJOY_ROLE} (discurso de investidura)`,
      date: "2016-10-26",
      text: "es mi obligación velar por el cumplimiento de los compromisos adquiridos con Europa, respetar la senda de consolidación fiscal pactada con la Unión Europea y controlar el déficit público",
      source: {
        url: "https://www.congreso.es/public_oficiales/L12/CONG/DS/PL/DSCD-12-PL-12.PDF#page=9",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XII legislatura, núm. 12 (26-10-2016): debate de investidura de Mariano Rajoy Brey",
        date: "2016-10-26",
        page: "9",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2017-12-31",
      summary:
        "La senda que fijó el Consejo de la UE (Decisión (UE) 2017/984, art. 1: déficit del 4,6 % del PIB en 2016, del 3,1 % en 2017 y del 2,2 % en 2018) se cumplió en 2016 (4,2 %) y en 2017 (3,1 %), según la serie actual de Eurostat. En 2018 el déficit fue del 2,6 %: por debajo del 3 % que cerraba el procedimiento de déficit excesivo, pero por encima del 2,2 %.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Government deficit/surplus, debt and associated data (gov_10dd_edpt1), España, Administraciones Públicas (S13), B9",
          url: "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=es",
          date: "2017-12-31",
          publisher: "Eurostat",
          value: "2016: −4,2 % del PIB; 2017: −3,1 % (−35.903 millones de euros); 2018: −2,6 %",
        },
      ],
    },
    verdict: "cumple",
    note: "Objetivos de la Decisión (UE) 2017/984 del Consejo, de 8-8-2016 (DOUE L 148 de 10-6-2017; CELEX 32017D0984). 2016 y 2017 son años completos de gobierno del PP. El de 2018 se cerró con el Gobierno del PSOE desde junio, aunque con los presupuestos aprobados por el PP: no se cuenta ni a favor ni en contra.",
    i18n: {
      ca: {
        topic: "Senda de dèficit pactada amb la UE (2016-2018)",
        summary: "La senda que va fixar el Consell de la UE (Decisió (UE) 2017/984, art. 1: dèficit del 4,6 % del PIB el 2016, del 3,1 % el 2017 i del 2,2 % el 2018) es va complir el 2016 (4,2 %) i el 2017 (3,1 %), segons la sèrie actual d'Eurostat. El 2018 el dèficit va ser del 2,6 %: per sota del 3 % que tancava el procediment de dèficit excessiu, però per sobre del 2,2 %.",
        note: "Objectius de la Decisió (UE) 2017/984 del Consell, de 8-8-2016 (DOUE L 148 de 10-6-2017; CELEX 32017D0984). El 2016 i el 2017 són anys complets de govern del PP. El 2018 es va tancar amb el Govern del PSOE des del juny, tot i que amb els pressupostos aprovats pel PP: no es compta ni a favor ni en contra.",
        role: "candidat a la Presidència del Govern i president del PP (discurs d'investidura)",
      },
      gl: {
        topic: "Senda de déficit pactada coa UE (2016-2018)",
        summary: "A senda que fixou o Consello da UE (Decisión (UE) 2017/984, art. 1: déficit do 4,6 % do PIB en 2016, do 3,1 % en 2017 e do 2,2 % en 2018) cumpriuse en 2016 (4,2 %) e en 2017 (3,1 %), segundo a serie actual de Eurostat. En 2018 o déficit foi do 2,6 %: por debaixo do 3 % que pechaba o procedemento de déficit excesivo, pero por riba do 2,2 %.",
        note: "Obxectivos da Decisión (UE) 2017/984 do Consello, do 8-8-2016 (DOUE L 148 do 10-6-2017; CELEX 32017D0984). 2016 e 2017 son anos completos de goberno do PP. O de 2018 pechouse co Goberno do PSOE desde xuño, aínda que cos orzamentos aprobados polo PP: non se conta nin a favor nin en contra.",
        role: "candidato á Presidencia do Goberno e presidente do PP (discurso de investidura)",
      },
      eu: {
        topic: "EBrekin adostutako defizit-ibilbidea (2016-2018)",
        summary: "EBko Kontseiluak finkatutako ibilbidea ((EB) 2017/984 Erabakia, 1. art.: BPGaren % 4,6ko defizita 2016an, % 3,1ekoa 2017an eta % 2,2koa 2018an) bete egin zen 2016an (% 4,2) eta 2017an (% 3,1), Eurostaten egungo seriearen arabera. 2018an defizita % 2,6koa izan zen: gehiegizko defizitaren prozedura ixten zuen % 3aren azpitik, baina % 2,2aren gainetik.",
        note: "Kontseiluaren 8-8-2016ko (EB) 2017/984 Erabakiaren helburuak (DOUE L 148, 10-6-2017; CELEX 32017D0984). 2016 eta 2017 PPren gobernuko urte osoak dira. 2018koa PSOEren Gobernuarekin itxi zen, ekainetik aurrera, baina PPk onartutako aurrekontuekin: ez da ez alde ez aurka zenbatzen.",
        role: "Gobernuko presidentetzarako hautagaia eta PPko presidentea (inbestidura-hitzaldia)",
      },
    },
  },
];
