import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Coalición Canaria. No puntúa nunca.
 *
 * CC preside el Gobierno de Canarias desde julio de 2023 (Fernando Clavijo,
 * en coalición con el PP): los compromisos autonómicos de su investidura se
 * contrastan con las normas publicadas. En el Congreso, su diputada Cristina
 * Valido García (Grupo Mixto; atribución en `../deputies.ts`).
 *
 * Solo dos entradas, ambas «cumple». Lo descartado y por qué (rebaja del
 * IGIC, cambio de voto en la investidura de 2023, menores migrantes) está en
 * el informe de la selección.
 *
 * Comprobado el 2026-10-06: citas copiadas literalmente del Diario de Sesiones
 * del Congreso y del Diario de Sesiones del Parlamento de Canarias (PDF
 * oficiales; página impresa = página del PDF); voto recontado con
 * `npm run afinidad:vote`; referencia BOE comprobada con el XML de boe.es.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "cc-amnistia-2023",
    partyId: "cc",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: "Cristina Valido García",
      role: "Diputada de Coalición Canaria (Grupo Parlamentario Mixto), en el debate de investidura de Pedro Sánchez",
      date: "2023-11-16",
      text: "Y todo ello sin claudicar a nuestro planteamiento de negativa a esa amnistía que seguimos diciendo que rechazamos por los motivos y por las formas.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-8.PDF#page=35",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 8 (16-11-2023): debate de investidura",
        date: "2023-11-16",
        page: "35",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2024-03-14",
      summary: "Valido votó en contra del dictamen de la proposición de ley orgánica de amnistía el 14-3-2024 (aprobado por 178 a 172).",
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
    note: "La cita es del debate de la investidura de Pedro Sánchez, que CC negoció con el PSOE; en ella mantiene su rechazo a la amnistía, y así votó después.",
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "Valido va votar en contra del dictamen de la proposició de llei orgànica d'amnistia el 14-3-2024 (aprovat per 178 a 172).",
        note: "La cita és del debat de la investidura de Pedro Sánchez, que CC va negociar amb el PSOE; s'hi manté el rebuig a l'amnistia, i així va votar després.",
        role: "Diputada de Coalición Canaria (Grup Parlamentari Mixt), en el debat d'investidura de Pedro Sánchez",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "Valido votou en contra do ditame da proposición de lei orgánica de amnistía o 14-3-2024 (aprobado por 178 a 172).",
        note: "A cita é do debate da investidura de Pedro Sánchez, que CC negociou co PSOE; nela mantén o seu rexeitamento á amnistía, e así votou despois.",
        role: "Deputada de Coalición Canaria (Grupo Parlamentario Mixto), no debate de investidura de Pedro Sánchez",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "Validok amnistiaren lege organikoaren proposamenaren irizpenaren aurka bozkatu zuen 14-3-2024an (178 botorekin onartu zen, 172ren aurka).",
        note: "Aipua Pedro Sánchezen inbestidura-eztabaidakoa da; CCk PSOErekin negoziatu zuen inbestidura hori. Bertan amnistiaren aurkako jarrera mantentzen du, eta horrela bozkatu zuen gero.",
        role: "Coalición Canariako diputatua (Talde Mistoa), Pedro Sánchezen inbestidura-eztabaidan",
      },
    },
  },
  {
    id: "cc-sucesiones-canarias-2023",
    partyId: "cc",
    topic: "Bonificación del impuesto de sucesiones y donaciones en Canarias",
    said: {
      speaker: "Fernando Clavijo Batlle",
      role: "candidato de Coalición Canaria a la Presidencia de Canarias (discurso de investidura)",
      date: "2023-07-11",
      text: "Aprobaremos, además, la bonificación al 99 % del impuesto de sucesiones y donaciones.",
      source: {
        url: "https://www.parcan.es/files/pub/diarios/11l/003/ds003.pdf#page=6",
        title: "Diario de Sesiones del Parlamento de Canarias, XI legislatura, núm. 3 (11-7-2023): investidura",
        date: "2023-07-11",
        page: "6",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2023-09-04",
      summary:
        "El Gobierno de Canarias aprobó el Decreto-ley 5/2023, que fija una bonificación del 99,9 % de la cuota del impuesto sobre sucesiones y donaciones para los grupos de parentesco I, II y III (adquisiciones mortis causa y seguros de vida).",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-23402",
          title: "Decreto-ley 5/2023, de 4 de septiembre, por el que se modifican las bonificaciones en la cuota tributaria del Impuesto sobre sucesiones y donaciones (Canarias)",
          url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-23402",
          date: "2023-11-20",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "Gobierno de coalición CC-PP presidido por Clavijo. La bonificación aprobada (99,9 %) es algo mayor que la anunciada (99 %).",
    i18n: {
      ca: {
        topic: "Bonificació de l'impost de successions i donacions a Canàries",
        summary: "El Govern de Canàries va aprovar el Decret llei 5/2023, que fixa una bonificació del 99,9 % de la quota de l'impost sobre successions i donacions per als grups de parentiu I, II i III (adquisicions mortis causa i assegurances de vida).",
        note: "Govern de coalició CC-PP presidit per Clavijo. La bonificació aprovada (99,9 %) és una mica més alta que l'anunciada (99 %).",
        role: "candidat de Coalición Canaria a la Presidència de Canàries (discurs d'investidura)",
      },
      gl: {
        topic: "Bonificación do imposto de sucesións e doazóns en Canarias",
        summary: "O Goberno de Canarias aprobou o Decreto-lei 5/2023, que fixa unha bonificación do 99,9 % da cota do imposto sobre sucesións e doazóns para os grupos de parentesco I, II e III (adquisicións mortis causa e seguros de vida).",
        note: "Goberno de coalición CC-PP presidido por Clavijo. A bonificación aprobada (99,9 %) é algo maior que a anunciada (99 %).",
        role: "candidato de Coalición Canaria á Presidencia de Canarias (discurso de investidura)",
      },
      eu: {
        topic: "Kanarietako oinordetza- eta dohaintza-zergaren hobaria",
        summary: "Kanarietako Gobernuak 5/2023 Lege-dekretua onartu zuen; oinordetza- eta dohaintza-zergaren kuotaren % 99,9ko hobaria ezartzen du I., II. eta III. ahaidetasun-taldeentzat (mortis causa eskuratzeak eta bizi-aseguruak).",
        note: "Clavijok zuzentzen duen CC-PP koalizio-gobernua. Onartutako hobaria (% 99,9) iragarritakoa (% 99) baino zertxobait handiagoa da.",
        role: "Coalición Canariaren hautagaia Kanarietako Lehendakaritzarako (inbestidura-hitzaldia)",
      },
    },
  },
];
