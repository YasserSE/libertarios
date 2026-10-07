import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de ERC (Grupo Parlamentario Republicano, «GR»). No
 * puntúa nunca.
 *
 * Criterio de selección (el mismo para ERC, Junts, EH Bildu, PNV y BNG):
 * compromisos explícitos del programa de 2023 o del portavoz en el Pleno, cada
 * uno con un hecho posterior en el Congreso (XV) con su JSON de votación. Se
 * buscaron también incumplimientos: (1) cruzando todo el programa con las
 * votaciones de la XV y (2) rastreando en los 201 Diarios de Sesiones del Pleno
 * de la XV los anuncios de voto de los portavoces de ERC y comparándolos con el
 * voto del grupo. No apareció ningún «contradice» con prueba primaria.
 *
 * Comprobado el 2026-10-06:
 * - Citas copiadas del PDF del programa (texto extraído y cotejado con
 *   normalización de espacios); `page` es la página del PDF (la impresa es una
 *   menos, como en `stances/programme/erc.ts`). Traducción en comentario.
 * - Votos recontados sobre el JSON de datos abiertos de congreso.es.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf",
  title: "ERC: Defensa Catalunya! Eleccions espanyoles 2023. Programa electoral",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230715192116/https://defensacatalunya.esquerrarepublicana.cat/documents/e2023-programa.pdf",
  kind: "programa" as const,
};
const SPEAKER = "Esquerra Republicana (programa electoral)";
const ROLE = "programa de ERC para las generales del 23-J-2023";
// Fecha de creación del PDF (metadatos: 11-7-2023).
const DATE = "2023-07-11";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "erc-regularizacion-extraordinaria-ilp",
    partyId: "erc",
    topic: "Regularización extraordinaria de personas extranjeras (ILP)",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Regularizar a las personas en situación administrativa irregular, incluidas las personas
      // inexpulsables, con base en la Iniciativa Legislativa Popular llevada a cabo por el movimiento
      // Regularización Ya!»
      text: "Regularitzar a les persones en situació administrativa irregular, incloses les persones inexpulsables, en base a la Iniciativa Legislativa Popular portada a terme pel moviment Regularització Ja!",
      source: { ...PROGRAMA, page: "41" },
    },
    did: {
      date: "2024-04-09",
      summary:
        "Los 7 diputados del Grupo Republicano votaron sí a la toma en consideración de la proposición de ley (ILP) para una regularización extraordinaria de personas extranjeras, que salió adelante por 310 votos a favor y 33 en contra.",
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
        topic: "Regularització extraordinària de persones estrangeres (ILP)",
        summary: "Els 7 diputats del Grup Republicà van votar sí a la presa en consideració de la proposició de llei (ILP) per a una regularització extraordinària de persones estrangeres, que va tirar endavant per 310 vots a favor i 33 en contra.",
        role: "programa d'ERC per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Regularización extraordinaria de persoas estranxeiras (ILP)",
        summary: "Os 7 deputados do Grupo Republicano votaron si á toma en consideración da proposición de lei (ILP) para unha regularización extraordinaria de persoas estranxeiras, que saíu adiante por 310 votos a favor e 33 en contra.",
        role: "programa de ERC para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Atzerritarren aparteko erregularizazioa (ILP)",
        summary: "Talde Errepublikanoko 7 diputatuek baiezkoa bozkatu zuten atzerritarren aparteko erregularizaziorako herri-ekimeneko lege-proposamena (ILP) aintzat hartzeko bozketan; 310 aldeko botorekin eta 33 kontrakorekin onartu zen.",
        role: "ERCren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "erc-reducir-gasto-militar",
    partyId: "erc",
    questionId: "gasto-defensa",
    topic: "Gasto militar",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Reducir el gasto militar español, tanto en efectivos como en capacidad armamentística, para
      // revertir el incremento de la última década.»
      text: "Reduir la despesa militar espanyola, tant en efectius com en capacitat armamentística, per tal de revertir l’increment de l’última dècada.",
      source: { ...PROGRAMA, page: "30" },
    },
    did: {
      date: "2026-06-11",
      summary:
        "Los 7 diputados del Grupo Republicano votaron sí al punto 1 de la moción del BNG para revertir las decisiones de incremento del gasto militar. La moción se rechazó por 45 votos a favor y 302 en contra.",
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
        summary: "Els 7 diputats del Grup Republicà van votar sí al punt 1 de la moció del BNG per revertir les decisions d'increment de la despesa militar. La moció es va rebutjar per 45 vots a favor i 302 en contra.",
        role: "programa d'ERC per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Gasto militar",
        summary: "Os 7 deputados do Grupo Republicano votaron si ao punto 1 da moción do BNG para reverter as decisións de incremento do gasto militar. A moción foi rexeitada por 45 votos a favor e 302 en contra.",
        role: "programa de ERC para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Gastu militarra",
        summary: "Talde Errepublikanoko 7 diputatuek baiezkoa bozkatu zuten BNGk gastu militarra handitzeko erabakiak atzera botatzeko aurkeztutako mozioaren 1. puntuan. Mozioa 45 aldeko botorekin eta 302 kontrakorekin baztertu zen.",
        role: "ERCren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "erc-amnistia-programa-2023",
    partyId: "erc",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Impulso de una ley de Amnistía, para acabar con toda la represión política contra el
      // independentismo.» Apartado «Mentrestant, en defensa de Catalunya al Congrés i al Senat».
      text: "Impuls d’una llei d’Amnistia, per acabar amb tota la repressió política contra l’independentisme",
      source: { ...PROGRAMA, page: "16" },
    },
    did: {
      date: "2024-03-14",
      summary:
        "Los 7 diputados del Grupo Republicano votaron sí al nuevo dictamen de la Proposición de Ley Orgánica de amnistía, aprobado por 178 votos a favor y 172 en contra. La ley se publicó como Ley Orgánica 1/2024.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 30,
          date: "2024-03-14",
          number: 1,
          title:
            "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2024-11776",
          title: "Ley Orgánica 1/2024, de 10 de junio, de amnistía para la normalización institucional, política y social en Cataluña",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-11776",
          date: "2024-06-11",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "Els 7 diputats del Grup Republicà van votar sí al nou dictamen de la proposició de llei orgànica d'amnistia, aprovat per 178 vots a favor i 172 en contra. La llei es va publicar com a Llei orgànica 1/2024.",
        role: "programa d'ERC per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "Os 7 deputados do Grupo Republicano votaron si ao novo ditame da proposición de lei orgánica de amnistía, aprobado por 178 votos a favor e 172 en contra. A lei publicouse como Lei orgánica 1/2024.",
        role: "programa de ERC para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "Talde Errepublikanoko 7 diputatuek baiezkoa bozkatu zuten amnistiaren lege organikoaren proposamenaren irizpen berrian, eta 178 aldeko botorekin eta 172 kontrakorekin onartu zen. Legea 1/2024 Lege Organiko gisa argitaratu zen.",
        role: "ERCren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "erc-jornada-cuatro-dias",
    partyId: "erc",
    questionId: "jornada-37-5",
    topic: "Reducción de la jornada laboral",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «También necesitamos construir un escudo que proteja a las clases trabajadoras de los abusos del
      // mercado, que recupere instrumentos como los salarios de tramitación o la autorización
      // administrativa de los ERE, refuerce otros como la indemnización por despido e implemente medidas
      // como la jornada laboral de cuatro días.»
      text: "També necessitem bastir un escut que protegeixi les classes treballadores davant els abusos del mercat, que recuperi instruments com els salaris de tramitació o l’autorització administrativa dels ERO, en reforci d’altres com la indemnització per acomiadament i implementi mesures com la jornada laboral de quatre dies.",
      source: { ...PROGRAMA, page: "53" },
    },
    did: {
      date: "2025-09-10",
      summary:
        "Los 7 diputados del Grupo Republicano votaron no a las enmiendas de devolución del proyecto de ley que reducía la jornada máxima a 37,5 horas semanales. Las enmiendas se aprobaron por 178 votos a 170 y el proyecto decayó.",
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
    note: "El programa pide la jornada de cuatro días; lo que se votó fue una reducción a 37,5 horas, que ERC apoyó (votó contra devolver el proyecto). Mismo criterio que EH Bildu (32 h) y BNG (35 h): apoyar una reducción menor que la prometida es «parcial», no «cumple».",
    i18n: {
      ca: {
        topic: "Reducció de la jornada laboral",
        summary: "Els 7 diputats del Grup Republicà van votar no a les esmenes de devolució del projecte de llei que reduïa la jornada màxima a 37,5 hores setmanals. Les esmenes es van aprovar per 178 vots a 170 i el projecte va decaure.",
        note: "El programa demana la jornada de quatre dies; el que es va votar va ser una reducció a 37,5 hores, a la qual ERC va donar suport (va votar en contra de retornar el projecte). Mateix criteri que EH Bildu (32 h) i el BNG (35 h): donar suport a una reducció més petita que la prometida és «parcial», no «compleix».",
        role: "programa d'ERC per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Redución da xornada laboral",
        summary: "Os 7 deputados do Grupo Republicano votaron non ás emendas de devolución do proxecto de lei que reducía a xornada máxima a 37,5 horas semanais. As emendas aprobáronse por 178 votos a 170 e o proxecto decaeu.",
        note: "O programa pide a xornada de catro días; o que se votou foi unha redución a 37,5 horas, que ERC apoiou (votou en contra de devolver o proxecto). Mesmo criterio que EH Bildu (32 h) e o BNG (35 h): apoiar unha redución menor que a prometida é «parcial», non «cumpre».",
        role: "programa de ERC para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Lanaldiaren murrizketa",
        summary: "Talde Errepublikanoko 7 diputatuek ezezkoa bozkatu zuten lanaldi maximoa astean 37,5 ordura murrizten zuen lege-proiektua itzultzeko zuzenketetan. Zuzenketak 178 botorekin onartu ziren, 170en aurka, eta proiektua bertan behera geratu zen.",
        note: "Programak lau eguneko lanaldia eskatzen du; bozkatu zena 37,5 ordurako murrizketa izan zen, eta ERCk babestu egin zuen (proiektua itzultzearen aurka bozkatu zuen). EH Bilduren (32 h) eta BNGren (35 h) kasuetako irizpide bera: agindutakoa baino murrizketa txikiagoa babestea «partziala» da, ez «betetzen du».",
        role: "ERCren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
];
