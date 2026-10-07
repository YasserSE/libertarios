import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» del PNV (grupo «GV (EAJ-PNV)»). No puntúa nunca.
 *
 * Criterio de selección (el mismo para ERC, Junts, EH Bildu, PNV y BNG):
 * compromisos explícitos del programa de 2023 («Con voz propia») o de sus
 * portavoces en el Pleno, cada uno con un hecho posterior en el Congreso (XV)
 * con su JSON de votación. Se buscaron también incumplimientos cruzando el
 * programa con las votaciones de la XV y comparando los anuncios de voto de sus
 * portavoces en los 201 Diarios de Sesiones del Pleno de la XV con el voto del
 * grupo. No apareció ningún «contradice» ni «parcial» con prueba primaria.
 *
 * Comprobado el 2026-10-06:
 * - Programa: citas copiadas del PDF (texto extraído y cotejado; ligaduras
 *   «ﬁ» normalizadas); `page` es la página del PDF, como en
 *   `stances/programme/pnv.ts`.
 * - Diario de Sesiones: cita del PDF oficial (página impresa = página del PDF).
 *   `videoUrl`: clip de la intervención (formato `v1/15<id del mp4>I`, de los
 *   datos abiertos de intervenciones; comprobado que redirige).
 * - Votos recontados sobre el JSON de datos abiertos de congreso.es; BOE
 *   comprobado con su texto en boe.es.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j",
  title: "EAJ-PNV: Con voz propia. Programa Electoral 23-J (elecciones generales 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230715101857/https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j",
  kind: "programa" as const,
};
const SPEAKER = "EAJ-PNV (programa electoral)";
const ROLE = "programa del PNV para las generales del 23-J-2023";
// Fecha de creación del PDF (metadatos: 7-7-2023).
const DATE = "2023-07-07";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "pnv-tribunal-constitucional-competencias",
    partyId: "pnv",
    topic: "Tribunal Constitucional como última instancia en conflictos de competencias",
    said: {
      speaker: "Maribel Vaquero Montero",
      role: "diputada del Grupo Parlamentario Vasco (EAJ-PNV), en pregunta al presidente del Gobierno",
      date: "2025-05-07",
      text: "Por ello, le anunciamos que presentaremos una proposición de ley orgánica para que el Tribunal Constitucional sea el último órgano que decida sobre las cuestiones competenciales y, para ello, le pediremos el apoyo de su grupo parlamentario.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-112.PDF#page=81",
        title: "DSCD Pleno núm. 112 (XV), 7-5-2025 — Sesión de control: pregunta sobre el control jurisdiccional del Tribunal Constitucional",
        date: "2025-05-07",
        page: "81",
        kind: "diario-sesiones",
      },
      videoUrl: "https://app.congreso.es/v1/15752112I",
    },
    did: {
      date: "2025-09-23",
      summary:
        "El Grupo Vasco registró la Proposición de Ley Orgánica de reforma de la Ley Orgánica del Tribunal Constitucional; sus 5 diputados votaron sí a la toma en consideración, aprobada por 179 votos a 170.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 133,
          date: "2025-09-23",
          number: 2,
          title:
            "Proposición de Ley del Grupo Parlamentario Vasco (EAJ-PNV), Orgánica de reforma de la Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion133/20250923/Votacion002/VOT_20250923211049.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Tribunal Constitucional com a última instància en conflictes de competències",
        summary: "El Grup Basc va registrar la proposició de llei orgànica de reforma de la Llei orgànica del Tribunal Constitucional; els seus 5 diputats van votar sí a la presa en consideració, aprovada per 179 vots a 170.",
        role: "diputada del Grup Parlamentari Basc (EAJ-PNV), en una pregunta al president del Govern",
      },
      gl: {
        topic: "Tribunal Constitucional como última instancia en conflitos de competencias",
        summary: "O Grupo Vasco rexistrou a proposición de lei orgánica de reforma da Lei orgánica do Tribunal Constitucional; os seus 5 deputados votaron si á toma en consideración, aprobada por 179 votos a 170.",
        role: "deputada do Grupo Parlamentario Vasco (EAJ-PNV), nunha pregunta ao presidente do Goberno",
      },
      eu: {
        topic: "Auzitegi Konstituzionala azken instantzia gisa eskumen-gatazketan",
        summary: "Euskal Taldeak Auzitegi Konstituzionalaren Lege Organikoa erreformatzeko lege organikoaren proposamena erregistratu zuen; haren 5 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan, eta 179 botorekin onartu zen, 170en aurka.",
        role: "Euskal Talde Parlamentarioko (EAJ-PNV) diputatua, Gobernuko presidenteari egindako galdera batean",
      },
    },
  },
  {
    id: "pnv-ley-secretos-oficiales",
    partyId: "pnv",
    topic: "Nueva Ley de Secretos Oficiales",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      text: "Por ello, propondremos una nueva Ley de Secretos Oficiales al igual que hicimos en la pasada legislatura y que no pudo ser tramitada por el bloqueo parlamentario a que fue sometida por el PP, el PSOE y Ciudadanos.",
      source: { ...PROGRAMA, page: "12" },
    },
    did: {
      date: "2024-02-27",
      summary:
        "El Grupo Vasco registró una proposición de ley de reforma de la Ley 9/1968 sobre secretos oficiales; sus 5 diputados votaron sí a la toma en consideración, aprobada por 176 votos a 169.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 24,
          date: "2024-02-27",
          number: 1,
          title:
            "Proposición de Ley del Grupo Parlamentario Vasco (EAJ-PNV), de reforma de la Ley 9/1968, de 5 de abril, sobre secretos oficiales. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion024/20240227/Votacion001/VOT_20240227205807.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Nova llei de secrets oficials",
        summary: "El Grup Basc va registrar una proposició de llei de reforma de la Llei 9/1968 sobre secrets oficials; els seus 5 diputats van votar sí a la presa en consideració, aprovada per 176 vots a 169.",
        role: "programa del PNV per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Nova lei de segredos oficiais",
        summary: "O Grupo Vasco rexistrou unha proposición de lei de reforma da Lei 9/1968 sobre segredos oficiais; os seus 5 deputados votaron si á toma en consideración, aprobada por 176 votos a 169.",
        role: "programa do PNV para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Sekretu Ofizialen Lege berria",
        summary: "Euskal Taldeak sekretu ofizialei buruzko 9/1968 Legea erreformatzeko lege-proposamena erregistratu zuen; haren 5 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan, eta 176 botorekin onartu zen, 169ren aurka.",
        role: "PNVren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "pnv-leyes-cni",
    partyId: "pnv",
    topic: "Control del CNI",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // Se refiere a su proposición de ley de la XIV para actualizar las leyes del CNI (apartado
      // «Actualización de las Leyes del CNI»).
      text: "tal y como pusimos de manifiesto en la pasada legislatura en la Proposición de Ley que presentamos y que fue rechazada por PSOE, PP y VOX, entre otros. EAJ-PNV la volverá a presentar la próxima legislatura.",
      source: { ...PROGRAMA, page: "13" },
    },
    did: {
      date: "2024-09-24",
      summary:
        "El Grupo Vasco registró una proposición de ley de modificación de la Ley 11/2002, reguladora del CNI, y de la Ley Orgánica 2/2002 de su control judicial previo; sus 5 diputados votaron sí a la toma en consideración, aprobada por 177 votos a 170.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 61,
          date: "2024-09-24",
          number: 1,
          title:
            "Proposición de Ley del Grupo Parlamentario Vasco (EAJ-PNV), de modificación de la Ley 11/2002, de 6 de mayo, reguladora del Centro Nacional de Inteligencia; y de la Ley Orgánica 2/2002, de 6 de mayo, reguladora del control judicial previo del Centro Nacional de Inteligencia. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion061/20240924/Votacion001/VOT_20240924203510.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Control del CNI",
        summary: "El Grup Basc va registrar una proposició de llei de modificació de la Llei 11/2002, reguladora del CNI, i de la Llei orgànica 2/2002 del seu control judicial previ; els seus 5 diputats van votar sí a la presa en consideració, aprovada per 177 vots a 170.",
        role: "programa del PNV per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Control do CNI",
        summary: "O Grupo Vasco rexistrou unha proposición de lei de modificación da Lei 11/2002, reguladora do CNI, e da Lei orgánica 2/2002 do seu control xudicial previo; os seus 5 deputados votaron si á toma en consideración, aprobada por 177 votos a 170.",
        role: "programa do PNV para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "CNIren kontrola",
        summary: "Euskal Taldeak CNI arautzen duen 11/2002 Legea eta haren aurretiazko kontrol judiziala arautzen duen 2/2002 Lege Organikoa aldatzeko lege-proposamena erregistratu zuen; haren 5 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan, eta 177 botorekin onartu zen, 170en aurka.",
        role: "PNVren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "pnv-gravamenes-banca-energia-como-impuestos",
    partyId: "pnv",
    questionId: "impuesto-banca",
    topic: "Gravámenes temporales a la banca y a las energéticas",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // Sigue (p. 17): «…que impiden su concertación con los Gobiernos de Euskadi y Nafarroa…».
      text: "En cuanto a las prestaciones patrimoniales no tributarias al sector energético y a la banca establecidas de forma temporal y extraordinaria, desde EAJ-PNV entendemos que las mismas, en caso de querer mantenerlas, deberían incluirse en una reforma tributaria y tramitarse como impuestos",
      source: { ...PROGRAMA, page: "16-17" },
    },
    did: {
      date: "2025-01-22",
      summary:
        "Los 5 diputados del Grupo Vasco votaron sí al dictamen de la ley que creó el Impuesto sobre el margen de intereses y comisiones de determinadas entidades financieras, con salvaguarda de los regímenes de Concierto y Convenio (21-11-2024), y no a convalidar el RDL 10/2024, que fijaba un gravamen temporal energético con naturaleza de «prestación patrimonial de carácter público no tributario» (22-1-2025).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 79,
          date: "2024-11-21",
          number: 62,
          title:
            "Votación del dictamen del Proyecto de Ley por la que se establecen un Impuesto Complementario para garantizar un nivel mínimo global de imposición para los grupos multinacionales y los grupos nacionales de gran magnitud, un Impuesto sobre el margen de intereses y comisiones de determinadas entidades financieras y otros.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion079/20241121/Votacion062/VOT_20241121173859.json`,
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 89,
          date: "2025-01-22",
          number: 2,
          title: "Real Decreto-ley 10/2024, de 23 de diciembre, para el establecimiento de un gravamen temporal energético durante el año 2025. Convalidación.",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion089/20250122/Votacion002/VOT_20250122154427.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2024-26694",
          title:
            "Ley 7/2024, de 20 de diciembre, por la que se establecen un Impuesto Complementario …, un Impuesto sobre el margen de intereses y comisiones de determinadas entidades financieras y un Impuesto sobre los líquidos para cigarrillos electrónicos …",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-26694",
          date: "2024-12-21",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Gravàmens temporals a la banca i a les energètiques",
        summary: "Els 5 diputats del Grup Basc van votar sí al dictamen de la llei que va crear l'impost sobre el marge d'interessos i comissions de determinades entitats financeres, amb salvaguarda dels règims de Concert i Conveni (21-11-2024), i no a convalidar el RDL 10/2024, que fixava un gravamen temporal energètic amb naturalesa de «prestación patrimonial de carácter público no tributario» (22-1-2025).",
        role: "programa del PNV per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Gravames temporais á banca e ás enerxéticas",
        summary: "Os 5 deputados do Grupo Vasco votaron si ao ditame da lei que creou o imposto sobre a marxe de xuros e comisións de determinadas entidades financeiras, con salvagarda dos réximes de Concerto e Convenio (21-11-2024), e non a convalidar o RDL 10/2024, que fixaba un gravame temporal enerxético con natureza de «prestación patrimonial de carácter público no tributario» (22-1-2025).",
        role: "programa do PNV para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Bankuei eta energia-enpresei aldi baterako kargak",
        summary: "Euskal Taldeko 5 diputatuek baiezkoa bozkatu zuten zenbait finantza-erakunderen interes- eta komisio-marjinaren gaineko zerga sortu zuen legearen irizpenean, Itun eta Hitzarmen ekonomikoen erregimenak babestuta (21-11-2024), eta ezezkoa RDL 10/2024 baliozkotzeko bozketan; dekretu horrek aldi baterako energia-karga bat ezartzen zuen, «prestación patrimonial de carácter público no tributario» izaerarekin (22-1-2025).",
        role: "PNVren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
];
