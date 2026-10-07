import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» del BNG. No puntúa nunca.
 *
 * El BNG no tiene grupo propio (Grupo Mixto): su voto es el de su único
 * diputado, Néstor Rego Candamil, leído nominalmente en cada JSON (misma regla
 * que `deputies.ts`); `groupVote` recoge ese voto.
 *
 * Criterio de selección (el mismo para ERC, Junts, EH Bildu, PNV y BNG):
 * compromisos explícitos del programa de 2023 o de su portavoz en el Pleno,
 * cada uno con un hecho posterior en el Congreso (XV) con su JSON de votación.
 * Se buscaron también incumplimientos cruzando el programa con las votaciones
 * de la XV y comparando los anuncios de voto de Rego en los 201 Diarios de
 * Sesiones del Pleno de la XV con su voto. No apareció ningún «contradice» con
 * prueba primaria.
 *
 * Comprobado el 2026-10-06: citas copiadas del PDF del programa (texto
 * extraído y cotejado); `page` es la página del PDF, como en
 * `stances/programme/bng.ts`. Traducción en comentario. Votos leídos del JSON
 * de datos abiertos de congreso.es.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf",
  title: "BNG: Programa Electoral Eleccións Xerais 2023 «Que Galiza Conte! Con Máis Forza!»",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230713120301/https://www.bng.gal/media/bnggaliza/files/2023/07/05/23_bng_xerais_programa.pdf",
  kind: "programa" as const,
};
const SPEAKER = "BNG (programa electoral)";
const ROLE = "programa del BNG para las generales del 23-J-2023";
// Fecha de creación del PDF (metadatos: 22-6-2023).
const DATE = "2023-06-22";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "bng-anular-aumento-gasto-militar",
    partyId: "bng",
    questionId: "gasto-defensa",
    topic: "Gasto militar",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Anular el compromiso del gobierno español de aumentar el gasto militar hasta llegar al 2 % del
      // PIB estatal, de manera que se destinen dichos fondos al incremento de diferentes partidas de
      // gasto social.» La frase empieza en la p. 66 y acaba en la 67.
      text: "Anular o compromiso do goberno español de aumentar o gasto militar até chegar a 2 % do PIB estatal, de maneira que se destinen ditos fondos ao incremento de diferentes partidas de gasto social.",
      source: { ...PROGRAMA, page: "66-67" },
    },
    did: {
      date: "2026-06-11",
      summary:
        "El BNG (Néstor Rego) presentó una moción para revertir las decisiones de incremento del gasto militar y votó sí a su punto 1, rechazado por 45 votos a favor y 302 en contra.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 185,
          date: "2026-06-11",
          number: 26,
          title:
            "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Punto 1.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Despesa militar",
        summary: "El BNG (Néstor Rego) va presentar una moció per revertir les decisions d'increment de la despesa militar i va votar sí al punt 1, rebutjat per 45 vots a favor i 302 en contra.",
        role: "programa del BNG per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Gasto militar",
        summary: "O BNG (Néstor Rego) presentou unha moción para reverter as decisións de incremento do gasto militar e votou si ao seu punto 1, rexeitado por 45 votos a favor e 302 en contra.",
        role: "programa do BNG para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Gastu militarra",
        summary: "BNGk (Néstor Rego) mozio bat aurkeztu zuen gastu militarra handitzeko erabakiak atzera botatzeko, eta baiezkoa bozkatu zuen haren 1. puntuan, zeina 45 aldeko botorekin eta 302 kontrakorekin baztertu baitzen.",
        role: "BNGren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "bng-impuestos-banca-energeticas",
    partyId: "bng",
    questionId: "impuesto-banca",
    topic: "Impuestos a la banca y a las energéticas",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Establecer la permanencia de los impuestos específicos a los beneficios de la banca, de las
      // grandes energéticas y a las grandes fortunas, reducir los límites de exención, aumentar su
      // progresividad y traspasar su gestión a Galicia.» Empieza en la p. 40 y acaba en la 41.
      text: "Estabelecer a permanencia dos impostos específicos aos beneficios da banca, das grandes enerxéticas e ás grandes fortunas, reducir os límites de exención, aumentar a súa progresividade e traspasar a súa xestión á Galiza.",
      source: { ...PROGRAMA, page: "40-41" },
    },
    did: {
      date: "2025-01-22",
      summary:
        "Néstor Rego votó sí a la toma en consideración de la proposición de Podemos para subir el gravamen a la banca (9-4-2024, rechazada), sí al dictamen de la ley que creó el Impuesto sobre el margen de intereses y comisiones de entidades financieras (21-11-2024) y sí a convalidar el RDL 10/2024 del gravamen temporal energético para 2025 (22-1-2025, derogado).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 34,
          date: "2024-04-09",
          number: 2,
          title:
            "Proposición de Ley del Grupo Parlamentario Mixto, para una correcta imposición de los beneficios caídos del cielo de la gran banca. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion034/20240409/Votacion002/VOT_20240409210632.json`,
        },
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
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion089/20250122/Votacion002/VOT_20250122154427.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Impostos a la banca i a les energètiques",
        summary: "Néstor Rego va votar sí a la presa en consideració de la proposició de Podemos per apujar el gravamen a la banca (9-4-2024, rebutjada), sí al dictamen de la llei que va crear l'impost sobre el marge d'interessos i comissions d'entitats financeres (21-11-2024) i sí a convalidar el RDL 10/2024 del gravamen temporal energètic per al 2025 (22-1-2025, derogat).",
        role: "programa del BNG per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Impostos á banca e ás enerxéticas",
        summary: "Néstor Rego votou si á toma en consideración da proposición de Podemos para subir o gravame á banca (9-4-2024, rexeitada), si ao ditame da lei que creou o imposto sobre a marxe de xuros e comisións de entidades financeiras (21-11-2024) e si a convalidar o RDL 10/2024 do gravame temporal enerxético para 2025 (22-1-2025, derrogado).",
        role: "programa do BNG para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Bankuei eta energia-enpresei zergak",
        summary: "Néstor Regok baiezkoa bozkatu zuen Podemosek bankuen gaineko karga igotzeko aurkeztutako proposamena aintzat hartzeko bozketan (9-4-2024, baztertua), finantza-erakundeen interes- eta komisio-marjinaren gaineko zerga sortu zuen legearen irizpenean (21-11-2024) eta 2025erako aldi baterako energia-karga ezarri zuen RDL 10/2024 baliozkotzeko bozketan (22-1-2025, indargabetua).",
        role: "BNGren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "bng-facilitar-regularizacion",
    partyId: "bng",
    topic: "Regularización de personas migrantes",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Impulsar las reformas legislativas necesarias para garantizar los derechos de la población
      // migrante (vivienda, trabajo, atención sanitaria, educación...) así como favorecer y facilitar los
      // procesos de regularización administrativa.» Empieza en la p. 19 y acaba en la 20.
      text: "Impulsar as reformas lexislativas necesarias para garantir os dereitos da poboación migrante (vivenda, traballo, atención sanitaria, educación...) así como favorecer e facilitar os procesos de regularización administrativa.",
      source: { ...PROGRAMA, page: "19-20" },
    },
    did: {
      date: "2024-04-09",
      summary:
        "Néstor Rego votó sí a la toma en consideración de la proposición de ley (ILP) para una regularización extraordinaria de personas extranjeras, aprobada por 310 votos a favor y 33 en contra.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 34,
          date: "2024-04-09",
          number: 1,
          title:
            "Proposición de Ley para una regularización extraordinaria para personas extranjeras en España (corresponde al número de expediente 120/000026/0000 de la XIV Legislatura). Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion034/20240409/Votacion001/VOT_20240409210631.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Regularització de persones migrants",
        summary: "Néstor Rego va votar sí a la presa en consideració de la proposició de llei (ILP) per a una regularització extraordinària de persones estrangeres, aprovada per 310 vots a favor i 33 en contra.",
        role: "programa del BNG per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Regularización de persoas migrantes",
        summary: "Néstor Rego votou si á toma en consideración da proposición de lei (ILP) para unha regularización extraordinaria de persoas estranxeiras, aprobada por 310 votos a favor e 33 en contra.",
        role: "programa do BNG para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Etorkinen erregularizazioa",
        summary: "Néstor Regok baiezkoa bozkatu zuen atzerritarren aparteko erregularizaziorako herri-ekimeneko lege-proposamena (ILP) aintzat hartzeko bozketan; 310 aldeko botorekin eta 33 kontrakorekin onartu zen.",
        role: "BNGren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "bng-jornada-35-horas",
    partyId: "bng",
    questionId: "jornada-37-5",
    topic: "Reducción de la jornada laboral",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Promover la implantación de la jornada laboral de 35 horas semanales sin reducción salarial.»
      text: "Promover a implantación da xornada laboral de 35 horas semanais sen redución salarial.",
      source: { ...PROGRAMA, page: "16" },
    },
    did: {
      date: "2025-09-10",
      summary:
        "Néstor Rego votó no a las enmiendas de devolución del proyecto de ley que reducía la jornada máxima a 37,5 horas semanales. Las enmiendas se aprobaron por 178 votos a 170 y el proyecto decayó.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 130,
          date: "2025-09-10",
          number: 10,
          title:
            "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión (Junts, VOX y PP).",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json`,
        },
      ],
    },
    verdict: "parcial",
    note: "El programa pide 35 horas; lo que se votó fue una reducción a 37,5 horas, que el BNG apoyó (votó contra devolver el proyecto). Mismo criterio que ERC (cuatro días) y EH Bildu (32 h): apoyar una reducción menor que la prometida es «parcial», no «cumple».",
    i18n: {
      ca: {
        topic: "Reducció de la jornada laboral",
        summary: "Néstor Rego va votar no a les esmenes de devolució del projecte de llei que reduïa la jornada màxima a 37,5 hores setmanals. Les esmenes es van aprovar per 178 vots a 170 i el projecte va decaure.",
        note: "El programa demana 35 hores; el que es va votar va ser una reducció a 37,5 hores, a la qual el BNG va donar suport (va votar en contra de retornar el projecte). Mateix criteri que ERC (quatre dies) i EH Bildu (32 h): donar suport a una reducció més petita que la prometida és «parcial», no «compleix».",
        role: "programa del BNG per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Redución da xornada laboral",
        summary: "Néstor Rego votou non ás emendas de devolución do proxecto de lei que reducía a xornada máxima a 37,5 horas semanais. As emendas aprobáronse por 178 votos a 170 e o proxecto decaeu.",
        note: "O programa pide 35 horas; o que se votou foi unha redución a 37,5 horas, que o BNG apoiou (votou en contra de devolver o proxecto). Mesmo criterio que ERC (catro días) e EH Bildu (32 h): apoiar unha redución menor que a prometida é «parcial», non «cumpre».",
        role: "programa do BNG para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Lanaldiaren murrizketa",
        summary: "Néstor Regok ezezkoa bozkatu zuen lanaldi maximoa astean 37,5 ordura murrizten zuen lege-proiektua itzultzeko zuzenketetan. Zuzenketak 178 botorekin onartu ziren, 170en aurka, eta proiektua bertan behera geratu zen.",
        note: "Programak 35 orduko astea eskatzen du; bozkatu zena 37,5 ordurako murrizketa izan zen, eta BNGk babestu egin zuen (proiektua itzultzearen aurka bozkatu zuen). ERCren (lau egun) eta EH Bilduren (32 h) kasuetako irizpide bera: agindutakoa baino murrizketa txikiagoa babestea «partziala» da, ez «betetzen du».",
        role: "BNGren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "bng-deflactar-irpf",
    partyId: "bng",
    questionId: "irpf-inflacion",
    topic: "Deflactar el IRPF",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Deflactar las tarifas del IRPF en función de la tasa de inflación en Galicia.»
      text: "Deflactar as tarifas do IRPF en función da taxa de inflación na Galiza.",
      source: { ...PROGRAMA, page: "39" },
    },
    did: {
      date: "2025-06-12",
      summary:
        "Ante dos proposiciones no de ley del PP para ajustar el IRPF a la inflación, Néstor Rego se abstuvo en la primera (9-4-2024) y votó sí en la segunda (12-6-2025).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 118,
          date: "2025-06-12",
          number: 1,
          title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para ajustar el IRPF por la inflación.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion118/20250612/Votacion001/VOT_20250612132238.json`,
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 34,
          date: "2024-04-09",
          number: 12,
          title:
            "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.",
          groupVote: "abstencion",
          url: `${CONGRESO}/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json`,
        },
      ],
    },
    verdict: "parcial",
    note: "Dos votaciones sobre lo mismo con distinto voto: abstención en 2024 y sí en 2025. Ambas son proposiciones no de ley de alcance estatal (no obligan al Gobierno); el programa lo refiere a la inflación en Galicia. Mismo criterio que Junts.",
    i18n: {
      ca: {
        topic: "Deflactar l'IRPF",
        summary: "Davant dues proposicions no de llei del PP per ajustar l'IRPF a la inflació, Néstor Rego es va abstenir en la primera (9-4-2024) i va votar sí en la segona (12-6-2025).",
        note: "Dues votacions sobre el mateix amb un vot diferent: abstenció el 2024 i sí el 2025. Totes dues són proposicions no de llei d'abast estatal (no obliguen el Govern); el programa ho refereix a la inflació a Galícia. Mateix criteri que Junts.",
        role: "programa del BNG per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Deflactar o IRPF",
        summary: "Ante dúas proposicións non de lei do PP para axustar o IRPF á inflación, Néstor Rego abstívose na primeira (9-4-2024) e votou si na segunda (12-6-2025).",
        note: "Dúas votacións sobre o mesmo con distinto voto: abstención en 2024 e si en 2025. Ambas son proposicións non de lei de alcance estatal (non obrigan o Goberno); o programa refíreo á inflación en Galicia. Mesmo criterio que Junts.",
        role: "programa do BNG para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "PFEZa deflaktatzea",
        summary: "PPk PFEZa inflaziora egokitzeko aurkeztutako legez besteko bi proposamenen aurrean, Néstor Rego abstenitu egin zen lehenengoan (9-4-2024) eta baiezkoa bozkatu zuen bigarrenean (12-6-2025).",
        note: "Gai berari buruzko bi bozketa, boto desberdinarekin: abstentzioa 2024an eta baiezkoa 2025ean. Biak dira estatu-mailako legez besteko proposamenak (ez dute Gobernua behartzen); programak Galiziako inflazioari lotzen dio. Juntsen kasuko irizpide bera.",
        role: "BNGren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
];
