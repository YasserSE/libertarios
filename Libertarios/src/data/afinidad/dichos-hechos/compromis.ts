import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Compromís. No puntúa.
 *
 * Voto atribuido por diputado (`../deputies.ts`): XIV, Joan Baldoví Roda (GP
 * Plural); XV, Àgueda Micó i Micó (GSUMAR hasta el 2-7-2025, Mixto desde el
 * 3-7-2025). El otro diputado de Compromís en la XV, Alberto Ibáñez Mezquita
 * (GSUMAR), no se atribuye en `deputies.ts`; su voto se anota en `note` cuando
 * difiere del de Micó.
 *
 * Citas copiadas el 2026-10-06 de la fuente abierta: Diario de Sesiones (PDF
 * oficial; `page` es la página impresa), programa electoral de 2019 de
 * Compromís (PDF oficial en imparables.compromis.net; la página impresa
 * coincide con la del PDF) y, en un caso, prensa con copia en archive.org.
 * Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es.
 *
 * Selección: compromisos explícitos con un hecho posterior verificable. No se
 * ha encontrado ningún caso de «contradice» que cumpla las reglas (cita literal
 * con fuente abierta + hecho con prueba primaria + lectura no discutida); ver
 * el informe de la investigación. Sin vídeo: no se ha comprobado un enlace
 * estable por intervención.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA_2019 = {
  url: "https://imparables.compromis.net/docs/programa_complet_VAL.pdf",
  title: "Compromís, Programa Electoral 2019 (Corts Valencianes y Eleccions Generals 2019)",
  year: 2019,
  kind: "programa" as const,
};

export const saidVsDid: SaidVsDid[] = [
  {
    id: "compromis-reforma-laboral-2022",
    partyId: "compromis",
    topic: "Trabajo",
    said: {
      speaker: "Compromís",
      role: "programa electoral, apartado «Ocupació — Eleccions Generals 2019»",
      // Fecha de creación del PDF (metadatos: 26-4-2019), antes de las generales del 28-A-2019.
      date: "2019-04-26",
      // ES: «Derogar la reforma laboral impulsada en 2012 por el Partido Popular y promover una nueva
      // propuesta que se base en una planificación a largo plazo y que cuente con el apoyo irrenunciable
      // de los agentes sociales.»
      text: "Derogar la reforma laboral impulsada l’any 2012 pel Partit Popular i promoure una nova proposta que es base en una planificació a llarg termini i que compte amb el suport irrenunciable dels agents socials.",
      source: { ...PROGRAMA_2019, page: "p. 91, medida 17" },
    },
    did: {
      date: "2022-02-03",
      summary:
        "Joan Baldoví votó sí a la convalidación del Real Decreto-ley 32/2021 de reforma laboral, acordado por el Gobierno con CCOO, UGT, CEOE y CEPYME. El decreto modifica el Estatuto de los Trabajadores y deroga preceptos concretos; no deroga la Ley 3/2012.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 149,
          date: "2022-02-03",
          number: 20,
          title:
            "Convalidación del Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral, la garantía de la estabilidad en el empleo y la transformación del mercado de trabajo",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion149/20220203/Votacion020/VOT_20230303100559.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-21788",
          title:
            "Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral, la garantía de la estabilidad en el empleo y la transformación del mercado de trabajo",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-21788",
          date: "2021-12-30",
          role: "apoyo",
        },
      ],
    },
    verdict: "parcial",
    note:
      "Se cumple la segunda parte (una reforma nueva con el acuerdo de los agentes sociales: el preámbulo del RDL cita el acuerdo de 23-12-2021 con CEOE, CEPYME, CCOO y UGT). No se cumple la derogación: la disposición derogatoria única solo deroga preceptos concretos del Estatuto de los Trabajadores (art. 12.3, DA 15.ª.1-2, DA 16.ª y 21.ª) y no deroga la Ley 3/2012. Convalidación aprobada 175-174.",
    i18n: {
      ca: {
        topic: "Treball",
        summary: "Joan Baldoví va votar sí a la convalidació del Reial decret llei 32/2021 de reforma laboral, acordat pel Govern amb CCOO, UGT, CEOE i CEPYME. El decret modifica l'Estatut dels treballadors i deroga preceptes concrets; no deroga la Llei 3/2012.",
        note: "Es compleix la segona part (una reforma nova amb l'acord dels agents socials: el preàmbul del RDL cita l'acord del 23-12-2021 amb CEOE, CEPYME, CCOO i UGT). No es compleix la derogació: la disposició derogatòria única només deroga preceptes concrets de l'Estatut dels treballadors (art. 12.3, DA 15.ª.1-2, DA 16.ª i 21.ª) i no deroga la Llei 3/2012. Convalidació aprovada per 175-174.",
        role: "programa electoral, apartat «Ocupació — Eleccions Generals 2019»",
      },
      gl: {
        topic: "Traballo",
        summary: "Joan Baldoví votou si á convalidación do Real decreto-lei 32/2021 de reforma laboral, acordado polo Goberno con CCOO, UGT, CEOE e CEPYME. O decreto modifica o Estatuto dos traballadores e derroga preceptos concretos; non derroga a Lei 3/2012.",
        note: "Cúmprese a segunda parte (unha reforma nova co acordo dos axentes sociais: o preámbulo do RDL cita o acordo do 23-12-2021 con CEOE, CEPYME, CCOO e UGT). Non se cumpre a derrogación: a disposición derrogatoria única só derroga preceptos concretos do Estatuto dos traballadores (art. 12.3, DA 15.ª.1-2, DA 16.ª e 21.ª) e non derroga a Lei 3/2012. Convalidación aprobada por 175-174.",
        role: "programa electoral, apartado «Ocupació — Eleccions Generals 2019»",
      },
      eu: {
        topic: "Lana",
        summary: "Joan Baldovík baiezkoa bozkatu zuen lan-erreformari buruzko 32/2021 Errege Lege-dekretua baliozkotzeko bozketan; Gobernuak CCOO, UGT, CEOE eta CEPYMErekin adostu zuen dekretu hori. Dekretuak Langileen Estatutua aldatzen du eta manu jakin batzuk indargabetzen ditu; ez du 3/2012 Legea indargabetzen.",
        note: "Bigarren zatia betetzen da (gizarte-eragileekin adostutako erreforma berria: RDLaren hitzaurreak CEOE, CEPYME, CCOO eta UGTrekin 23-12-2021ean egindako akordioa aipatzen du). Indargabetzea ez da betetzen: xedapen indargabetzaile bakarrak Langileen Estatutuko manu jakin batzuk baino ez ditu indargabetzen (12.3 art., DA 15.ª.1-2, DA 16.ª eta 21.ª), eta ez du 3/2012 Legea indargabetzen. Baliozkotzea 175-174 onartu zen.",
        role: "hauteskunde-programa, «Ocupació — Eleccions Generals 2019» atala",
      },
    },
  },
  {
    id: "compromis-vivienda-zonas-tensionadas-2023",
    partyId: "compromis",
    questionId: "vivienda-tope-alquiler",
    topic: "Vivienda",
    said: {
      speaker: "Compromís",
      role: "programa electoral, apartado «Habitatge — Eleccions Generals 2019»",
      date: "2019-04-26",
      // ES: «Permitiremos a ayuntamientos y comunidades autónomas regular los precios de la vivienda en
      // determinadas zonas urbanas.»
      text: "Permetrem a ajuntaments i comunitats autònomes regular els preus de l’habitatge en determinades zones urbanes.",
      source: { ...PROGRAMA_2019, page: "p. 102" },
    },
    did: {
      date: "2023-04-27",
      summary:
        "Joan Baldoví votó sí al dictamen del proyecto de ley por el derecho a la vivienda (Ley 12/2023), que regula la declaración de zonas de mercado residencial tensionado por las administraciones competentes en vivienda y la limitación de rentas en ellas.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 256,
          date: "2023-04-27",
          number: 173,
          title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-12203",
          title: "Ley 12/2023, de 24 de mayo, por el derecho a la vivienda",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12203",
          date: "2023-05-25",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    note:
      "Art. 18 de la Ley 12/2023: declaran las zonas «las Administraciones competentes en materia de vivienda»; la limitación de la renta en esas zonas está en el art. 17.6 de la LAU, en la redacción de su disposición final primera.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "Joan Baldoví va votar sí al dictamen del projecte de llei pel dret a l'habitatge (Llei 12/2023), que regula la declaració de zones de mercat residencial tensionat per part de les administracions competents en habitatge i la limitació de rendes en aquestes zones.",
        note: "Art. 18 de la Llei 12/2023: declaren les zones «las Administraciones competentes en materia de vivienda»; la limitació de la renda en aquestes zones és a l'art. 17.6 de la LAU, en la redacció de la seva disposició final primera.",
        role: "programa electoral, apartat «Habitatge — Eleccions Generals 2019»",
      },
      gl: {
        topic: "Vivenda",
        summary: "Joan Baldoví votou si ao ditame do proxecto de lei polo dereito á vivenda (Lei 12/2023), que regula a declaración de zonas de mercado residencial tensionado polas administracións competentes en vivenda e a limitación de rendas nelas.",
        note: "Art. 18 da Lei 12/2023: declaran as zonas «las Administraciones competentes en materia de vivienda»; a limitación da renda nesas zonas está no art. 17.6 da LAU, na redacción da súa disposición derradeira primeira.",
        role: "programa electoral, apartado «Habitatge — Eleccions Generals 2019»",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Joan Baldovík baiezkoa bozkatu zuen etxebizitzarako eskubidearen lege-proiektuaren irizpenean (12/2023 Legea); lege horrek arautzen ditu etxebizitza-arloko administrazio eskudunek bizitegi-merkatu tentsionatuko eremuak deklaratzea eta eremu horietan errentak mugatzea.",
        note: "12/2023 Legearen 18. art.: eremuak «las Administraciones competentes en materia de vivienda» deklaratzen dituzte; eremu horietako errenta-muga LAUren 17.6 art.-an dago, lege horren lehen azken xedapenak emandako idazketan.",
        role: "hauteskunde-programa, «Habitatge — Eleccions Generals 2019» atala",
      },
    },
  },
  {
    id: "compromis-nuclear-2025",
    partyId: "compromis",
    questionId: "nuclear",
    topic: "Energía",
    said: {
      speaker: "Compromís",
      role: "programa electoral, apartado «Canvi climàtic — Eleccions Generals 2019», medidas para el primer año de legislatura",
      date: "2019-04-26",
      // ES: «Plan de cierre programado de todas las centrales nucleares y de gestión de los residuos
      // conforme vaya caducando su licencia de actividad.»
      text: "Pla de tancament programat de totes les centrals nuclears i de gestió dels residus conforme vaja caducant la seua llicència d’activitat",
      source: { ...PROGRAMA_2019, page: "p. 128, medida 7" },
    },
    did: {
      date: "2025-06-17",
      summary:
        "Àgueda Micó votó no a la toma en consideración de la proposición de ley del GP Popular para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 119,
          date: "2025-06-17",
          number: 1,
          title:
            "Toma en consideración de la Proposición de Ley del GP Popular para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json`,
        },
      ],
    },
    verdict: "cumple",
    note:
      "Compromiso del programa de 2019; el voto es de la XV legislatura. Alberto Ibáñez Mezquita (Compromís, GSUMAR) también votó no.",
    i18n: {
      ca: {
        topic: "Energia",
        summary: "Àgueda Micó va votar no a la presa en consideració de la proposició de llei del GP Popular per garantir l'aportació de l'energia nuclear a la descarbonització del sistema energètic.",
        note: "És un compromís del programa del 2019; el vot és de la XV legislatura. Alberto Ibáñez Mezquita (Compromís, GSUMAR) també va votar no.",
        role: "programa electoral, apartat «Canvi climàtic — Eleccions Generals 2019», mesures per al primer any de legislatura",
      },
      gl: {
        topic: "Enerxía",
        summary: "Àgueda Micó votou non á toma en consideración da proposición de lei do GP Popular para garantir a achega da enerxía nuclear na descarbonización do sistema enerxético.",
        note: "Compromiso do programa de 2019; o voto é da XV lexislatura. Alberto Ibáñez Mezquita (Compromís, GSUMAR) tamén votou non.",
        role: "programa electoral, apartado «Canvi climàtic — Eleccions Generals 2019», medidas para o primeiro ano de lexislatura",
      },
      eu: {
        topic: "Energia",
        summary: "Àgueda Micók ezezkoa bozkatu zuen GP Popularrak sistema energetikoaren deskarbonizazioan energia nuklearraren ekarpena bermatzeko aurkeztutako lege-proposamena aintzat hartzeko bozketan.",
        note: "2019ko programako konpromisoa da; botoa XV. legealdikoa da. Alberto Ibáñez Mezquitak (Compromís, GSUMAR) ere ezezkoa bozkatu zuen.",
        role: "hauteskunde-programa, «Canvi climàtic — Eleccions Generals 2019» atala, legealdiko lehen urterako neurriak",
      },
    },
  },
  {
    id: "compromis-gasto-militar-2025",
    partyId: "compromis",
    questionId: "gasto-defensa",
    topic: "Defensa",
    said: {
      speaker: "Àgueda Micó i Micó",
      role: "portavoz de Compromís en el Congreso",
      date: "2025-03-15",
      text: "Lo que tenemos claro (en el grupo parlamentario) es que no queremos ni vamos a dar apoyo a un aumento del gasto militar y de defensa",
      source: {
        url: "https://theobjective.com/espana/politica/2025-03-15/compromis-sumar-rechazar-gasto-militar/",
        title: "The Objective, «Compromís afirma que no necesita libertad de voto en Sumar para rechazar el gasto militar»",
        date: "2025-03-15",
        archiveUrl:
          "https://web.archive.org/web/20250315132931/https://theobjective.com/espana/politica/2025-03-15/compromis-sumar-rechazar-gasto-militar/",
        kind: "prensa",
      },
    },
    did: {
      date: "2026-06-11",
      summary:
        "Àgueda Micó votó sí al punto 1 de la moción del Grupo Mixto (Sr. Rego Candamil) relativa a la reversión de las decisiones sobre el incremento del gasto militar.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 185,
          date: "2026-06-11",
          number: 26,
          title:
            "Moción consecuencia de interpelación urgente del GP Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar — punto 1",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json`,
        },
      ],
    },
    verdict: "cumple",
    note:
      "El aumento de 2025 lo aprobó el Consejo de Ministros sin votación en el Congreso; esta es la votación del Pleno localizada sobre ese aumento. Alberto Ibáñez Mezquita (Compromís, GSUMAR) también votó sí.",
    i18n: {
      ca: {
        topic: "Defensa",
        summary: "Àgueda Micó va votar sí al punt 1 de la moció del Grup Mixt (Sr. Rego Candamil) relativa a la reversió de les decisions sobre l'increment de la despesa militar.",
        note: "L'augment del 2025 el va aprovar el Consell de Ministres sense votació al Congrés; aquesta és la votació del Ple localitzada sobre aquest augment. Alberto Ibáñez Mezquita (Compromís, GSUMAR) també va votar sí.",
        role: "portaveu de Compromís al Congrés",
      },
      gl: {
        topic: "Defensa",
        summary: "Àgueda Micó votou si ao punto 1 da moción do Grupo Mixto (Sr. Rego Candamil) relativa á reversión das decisións sobre o incremento do gasto militar.",
        note: "O aumento de 2025 aprobouno o Consello de Ministros sen votación no Congreso; esta é a votación do Pleno localizada sobre ese aumento. Alberto Ibáñez Mezquita (Compromís, GSUMAR) tamén votou si.",
        role: "voceira de Compromís no Congreso",
      },
      eu: {
        topic: "Defentsa",
        summary: "Àgueda Micók baiezkoa bozkatu zuen Talde Mistoaren (Rego Candamil jn.) mozioaren 1. puntuan; gastu militarra handitzeko erabakiak atzera botatzeari buruzkoa zen mozioa.",
        note: "2025eko igoera Ministro Kontseiluak onartu zuen, Kongresuan bozketarik egin gabe; hau da igoera horri buruz Osoko Bilkuran aurkitu den bozketa. Alberto Ibáñez Mezquitak (Compromís, GSUMAR) ere baiezkoa bozkatu zuen.",
        role: "Compromísen bozeramailea Kongresuan",
      },
    },
  },
];
