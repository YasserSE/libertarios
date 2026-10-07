import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Vox. No puntúa nunca.
 *
 * Criterio de selección (el mismo para todos los partidos): compromisos
 * explícitos y muy difundidos del partido o su líder, cumplidos e incumplidos,
 * cada uno con un hecho posterior verificable en fuente primaria. Vox no ha
 * gobernado en el Estado; los hechos son votaciones y actos del Congreso.
 *
 * Todas las entradas son «cumple»: no se encontró un compromiso explícito de
 * Vox seguido de un acto verificable en sentido contrario. Lo descartado y por
 * qué está en el informe de la selección (no se rellena el hueco por simetría).
 *
 * Comprobado el 2026-10-06:
 * - Citas copiadas literalmente del Diario de Sesiones del Congreso (PDF
 *   oficial; página impresa = página del PDF) y del programa de 2023 (PDF de
 *   voxespana.es; página del PDF = impresa). La fecha del programa es la de
 *   modificación del PDF (13-7-2023). Las citas del programa deshacen los
 *   guiones de partición de fin de línea; nada más.
 * - Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es.
 *   La moción de censura de 2020 se votó por llamamiento y no tiene JSON: la
 *   prueba es el Diario de Sesiones y el BOCG.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";
const ABASCAL = "Santiago Abascal Conde";

const PROGRAMA = {
  url: "https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf",
  archiveUrl:
    "https://web.archive.org/web/20231116091643/https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf",
  title: "Vox — Programa electoral para las Elecciones Generales 23 de julio de 2023",
  year: 2023,
  kind: "programa" as const,
};
const PROGRAMA_DATE = "2023-07-13";
const programa = (page: number) => ({ ...PROGRAMA, url: `${PROGRAMA.url}#page=${page}`, page: String(page) });

export const saidVsDid: SaidVsDid[] = [
  {
    id: "vox-mocion-censura-2020",
    partyId: "vox",
    topic: "Moción de censura de 2020",
    said: {
      speaker: ABASCAL,
      role: "presidente de Vox y del GP VOX (debate sobre el Consejo Europeo y el fondo de reconstrucción)",
      date: "2020-07-29",
      text: "Por eso les anuncio solemnemente, desde esta tribuna, que no nos queda más remedio que usar el instrumento de la moción de censura, que presentaremos en el mes de septiembre.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-39.PDF#page=20",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XIV legislatura, núm. 39 (29-7-2020)",
        date: "2020-07-29",
        page: "20",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2020-10-22",
      summary:
        "Abascal y otros 51 diputados del GP VOX firmaron el escrito de moción de censura el 29-9-2020; la Mesa la admitió el 6-10-2020. Se debatió el 21 y 22-10-2020 y fue rechazada con 52 votos a favor y 298 en contra.",
      evidence: [
        {
          kind: "otro-parlamento",
          chamber: "Congreso de los Diputados (votación pública por llamamiento, sin JSON en datos abiertos)",
          title: "Moción de censura 082/000001 con Santiago Abascal Conde como candidato: 52 a favor, 298 en contra",
          date: "2020-10-22",
          vote: "si",
          url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-56.PDF#page=56",
        },
        {
          kind: "iniciativa",
          title: "Moción de censura 082/000001 (autor: Abascal Conde, Santiago, y 51 diputados del GP VOX)",
          url: "https://www.congreso.es/public_oficiales/L14/CONG/BOCG/D/BOCG-14-D-156.PDF#page=5",
          status: "Admitida a trámite; escrito firmado el 29-9-2020 (BOCG, serie D, núm. 156)",
          date: "2020-10-06",
        },
      ],
    },
    verdict: "cumple",
    note: "El Diario de Sesiones da solo el recuento (votación por llamamiento); los 52 votos a favor coinciden con los 52 firmantes del GP VOX.",
    i18n: {
      ca: {
        topic: "Moció de censura del 2020",
        summary: "Abascal i 51 diputats més del GP VOX van signar l'escrit de moció de censura el 29-9-2020; la Mesa la va admetre el 6-10-2020. Es va debatre el 21 i el 22-10-2020 i va ser rebutjada amb 52 vots a favor i 298 en contra.",
        note: "El Diari de Sessions només dona el recompte (votació per crida); els 52 vots a favor coincideixen amb els 52 signants del GP VOX.",
        role: "president de Vox i del GP VOX (debat sobre el Consell Europeu i el fons de reconstrucció)",
      },
      gl: {
        topic: "Moción de censura de 2020",
        summary: "Abascal e outros 51 deputados do GP VOX asinaron o escrito de moción de censura o 29-9-2020; a Mesa admitiuna o 6-10-2020. Debateuse o 21 e o 22-10-2020 e foi rexeitada con 52 votos a favor e 298 en contra.",
        note: "O Diario de Sesións só dá o reconto (votación por chamamento); os 52 votos a favor coinciden cos 52 asinantes do GP VOX.",
        role: "presidente de Vox e do GP VOX (debate sobre o Consello Europeo e o fondo de reconstrución)",
      },
      eu: {
        topic: "2020ko zentsura-mozioa",
        summary: "Abascalek eta GP VOXeko beste 51 diputatuk zentsura-mozioaren idazkia sinatu zuten 2020-9-29an; Mahaiak 2020-10-6an onartu zuen. 2020-10-21ean eta 22an eztabaidatu zen, eta baztertu egin zen, 52 aldeko eta 298 kontrako botorekin.",
        note: "Bilkuren Egunkariak zenbaketa bakarrik ematen du (deialdi bidezko bozketa); aldeko 52 botoak bat datoz GP VOXeko 52 sinatzaileekin.",
        role: "Voxeko eta GP VOXeko presidentea (Europar Kontseiluari eta berreraikuntza-funtsari buruzko eztabaida)",
      },
    },
  },
  {
    id: "vox-amnistia-2023",
    partyId: "vox",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: ABASCAL,
      role: "presidente de Vox (debate de investidura de Pedro Sánchez)",
      date: "2023-11-15",
      text: "Vamos a utilizar todos los medios legítimos para oponernos a este [golpe] y lo vamos a hacer en los parlamentos, en los gobiernos regionales, en los tribunales, en todos los foros internacionales a los que tengamos acceso y, por supuesto, lo vamos a hacer en la calle.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-7.PDF#page=47",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 7 (15-11-2023): debate de investidura",
        date: "2023-11-15",
        page: "47",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2024-03-14",
      summary:
        "Los 33 diputados del GP VOX votaron en contra del dictamen de la proposición de ley orgánica de amnistía el 14-3-2024 (aprobado por 178 a 172).",
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
    note: "«[golpe]» va entre corchetes en el Diario: la Presidencia retiró la palabra (art. 104.3 del Reglamento). El voto cubre la parte parlamentaria del compromiso; con 33 diputados Vox no alcanza los 50 que exige un recurso de inconstitucionalidad.",
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "Els 33 diputats del GP VOX van votar en contra del dictamen de la proposició de llei orgànica d'amnistia el 14-3-2024 (aprovat per 178 a 172).",
        note: "«[golpe]» va entre claudàtors al Diari: la Presidència va retirar la paraula (art. 104.3 del Reglament). El vot cobreix la part parlamentària del compromís; amb 33 diputats Vox no arriba als 50 que exigeix un recurs d'inconstitucionalitat.",
        role: "president de Vox (debat d'investidura de Pedro Sánchez)",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "Os 33 deputados do GP VOX votaron en contra do ditame da proposición de lei orgánica de amnistía o 14-3-2024 (aprobado por 178 a 172).",
        note: "«[golpe]» vai entre corchetes no Diario: a Presidencia retirou a palabra (art. 104.3 do Regulamento). O voto cobre a parte parlamentaria do compromiso; con 33 deputados Vox non chega aos 50 que esixe un recurso de inconstitucionalidade.",
        role: "presidente de Vox (debate de investidura de Pedro Sánchez)",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "GP VOXeko 33 diputatuek amnistiari buruzko lege organikoaren proposamenaren irizpenaren aurka bozkatu zuten 2024-3-14an (178 aldeko eta 172 kontrako botorekin onartu zen).",
        note: "«[golpe]» kortxete artean dago Egunkarian: Lehendakaritzak hitza kendu zuen (Erregelamenduaren 104.3 art.). Botoak konpromisoaren zati parlamentarioa hartzen du; 33 diputaturekin Voxek ez ditu lortzen konstituzio-kontrakotasuneko errekurtso batek eskatzen dituen 50ak.",
        role: "Voxeko presidentea (Pedro Sánchezen inbestidura-eztabaida)",
      },
    },
  },
  {
    id: "vox-arraigo-2025",
    partyId: "vox",
    topic: "Supresión del arraigo",
    said: {
      speaker: "Vox",
      role: "programa electoral de las generales de 2023",
      date: PROGRAMA_DATE,
      text: "Supresión de la institución del arraigo como forma de regular la inmigración ilegal y revocación de las pasarelas rápidas para adquirir la nacionalidad española.",
      source: programa(103),
    },
    did: {
      date: "2025-09-16",
      summary:
        "El GP VOX defendió su proposición de ley orgánica para restringir la regularización a través del arraigo y sus 33 diputados votaron a favor de tomarla en consideración el 16-9-2025. Fue rechazada (169 a favor, 177 en contra).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 131,
          date: "2025-09-16",
          number: 1,
          title:
            "Toma en consideración de la Proposición de Ley del GP VOX, Orgánica de modificación de la Ley Orgánica 4/2000, para restringir la regularización de inmigrantes ilegales a través del arraigo",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion131/20250916/Votacion001/VOT_20250916211204.json`,
        },
      ],
    },
    verdict: "cumple",
    note: "En la defensa, Rocío de Meer (GP VOX): «Con esta proposición de ley se elimina la trampa del arraigo» (DSCD-15-PL-136, p. 5).",
    i18n: {
      ca: {
        topic: "Supressió de l'arrelament",
        summary: "El GP VOX va defensar la seva proposició de llei orgànica per restringir la regularització a través de l'arrelament i els seus 33 diputats van votar a favor de prendre-la en consideració el 16-9-2025. Va ser rebutjada (169 a favor, 177 en contra).",
        note: "En la defensa, Rocío de Meer (GP VOX): «Con esta proposición de ley se elimina la trampa del arraigo» (DSCD-15-PL-136, p. 5).",
        role: "programa electoral de les eleccions generals del 2023",
      },
      gl: {
        topic: "Supresión do arraigamento",
        summary: "O GP VOX defendeu a súa proposición de lei orgánica para restrinxir a regularización a través do arraigamento e os seus 33 deputados votaron a favor de tomala en consideración o 16-9-2025. Foi rexeitada (169 a favor, 177 en contra).",
        note: "Na defensa, Rocío de Meer (GP VOX): «Con esta proposición de ley se elimina la trampa del arraigo» (DSCD-15-PL-136, p. 5).",
        role: "programa electoral das eleccións xerais de 2023",
      },
      eu: {
        topic: "Errotzearen ezabaketa",
        summary: "GP VOXek errotzearen bidezko erregularizazioa murrizteko lege organikoaren proposamena defendatu zuen, eta haren 33 diputatuek aintzat hartzearen alde bozkatu zuten 2025-9-16an. Baztertu egin zen (169 alde, 177 aurka).",
        note: "Defentsan, Rocío de Meer (GP VOX): «Con esta proposición de ley se elimina la trampa del arraigo» (DSCD-15-PL-136, 5. or.).",
        role: "2023ko hauteskunde orokorretako hauteskunde-programa",
      },
    },
  },
  {
    id: "vox-nuclear-2025",
    partyId: "vox",
    questionId: "nuclear",
    topic: "Vida útil de las centrales nucleares",
    said: {
      speaker: "Vox",
      role: "programa electoral de las generales de 2023 (medida 246)",
      date: PROGRAMA_DATE,
      text: "Fomentaremos la inversión y actualización del parque de generación nuclear y promoveremos la extensión de la vida útil de las centrales nucleares existentes.",
      source: programa(117),
    },
    did: {
      date: "2025-06-17",
      summary:
        "Los 33 diputados del GP VOX votaron a favor de tomar en consideración la proposición de ley del GP Popular para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético (17-6-2025).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 119,
          date: "2025-06-17",
          number: 1,
          title:
            "Toma en consideración de la Proposición de Ley del GP Popular, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Vida útil de les centrals nuclears",
        summary: "Els 33 diputats del GP VOX van votar a favor de prendre en consideració la proposició de llei del GP Popular per garantir l'aportació de l'energia nuclear en la descarbonització del sistema energètic (17-6-2025).",
        role: "programa electoral de les eleccions generals del 2023 (mesura 246)",
      },
      gl: {
        topic: "Vida útil das centrais nucleares",
        summary: "Os 33 deputados do GP VOX votaron a favor de tomar en consideración a proposición de lei do GP Popular para garantir a achega da enerxía nuclear na descarbonización do sistema enerxético (17-6-2025).",
        role: "programa electoral das eleccións xerais de 2023 (medida 246)",
      },
      eu: {
        topic: "Zentral nuklearren bizitza erabilgarria",
        summary: "GP VOXeko 33 diputatuek GP Popularren lege-proposamena aintzat hartzearen alde bozkatu zuten; energia nuklearrak sistema energetikoaren deskarbonizazioan egiten duen ekarpena bermatzea zuen helburu (2025-6-17).",
        role: "2023ko hauteskunde orokorretako hauteskunde-programa (246. neurria)",
      },
    },
  },
  {
    id: "vox-tauromaquia-2025",
    partyId: "vox",
    questionId: "tauromaquia-patrimonio",
    topic: "Protección de la tauromaquia",
    said: {
      speaker: "Vox",
      role: "programa electoral de las generales de 2023 (medida 325)",
      date: PROGRAMA_DATE,
      text: "Protección de las tradiciones populares, eventos religiosos y festejos taurinos propios de la España rural frente a los ataques del progresismo y el globalismo.",
      source: programa(151),
    },
    did: {
      date: "2025-10-07",
      summary:
        "Los 33 diputados del GP VOX votaron en contra de tomar en consideración la proposición de ley de iniciativa popular para derogar la Ley 18/2013, que regula la tauromaquia como patrimonio cultural (7-10-2025).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 135,
          date: "2025-10-07",
          number: 1,
          title: "Toma en consideración de la Proposición de Ley (ILP) para la derogación de la Ley 18/2013, para la regulación de la Tauromaquia como patrimonio cultural",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion135/20251007/Votacion001/VOT_20251007214328.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Protecció de la tauromàquia",
        summary: "Els 33 diputats del GP VOX van votar en contra de prendre en consideració la proposició de llei d'iniciativa popular per derogar la Llei 18/2013, que regula la tauromàquia com a patrimoni cultural (7-10-2025).",
        role: "programa electoral de les eleccions generals del 2023 (mesura 325)",
      },
      gl: {
        topic: "Protección da tauromaquia",
        summary: "Os 33 deputados do GP VOX votaron en contra de tomar en consideración a proposición de lei de iniciativa popular para derrogar a Lei 18/2013, que regula a tauromaquia como patrimonio cultural (7-10-2025).",
        role: "programa electoral das eleccións xerais de 2023 (medida 325)",
      },
      eu: {
        topic: "Tauromakiaren babesa",
        summary: "GP VOXeko 33 diputatuek herri-ekimeneko lege-proposamena aintzat hartzearen aurka bozkatu zuten; tauromakia kultura-ondare gisa arautzen duen 18/2013 Legea indargabetzea zuen helburu (2025-10-7).",
        role: "2023ko hauteskunde orokorretako hauteskunde-programa (325. neurria)",
      },
    },
  },
];
