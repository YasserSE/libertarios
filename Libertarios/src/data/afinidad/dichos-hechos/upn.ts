import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de UPN. No puntúa nunca.
 *
 * Solo XV legislatura: su diputado, Alberto Catalán Higueras, se sienta en el
 * Grupo Mixto (atribución en `../deputies.ts`). UPN no gobierna en Navarra
 * desde 2019, así que no hay actos de gobierno con los que contrastar.
 *
 * La entrada que queda es «cumple». La revisión ciega del 2026-10-06 quitó las
 * dos que contrastaban lo dicho en un debate con el voto de ese mismo debate
 * (jornada, competencias de inmigración): una intervención en el mismo debate
 * de la votación es anunciar el voto, no un compromiso (ver
 * `docs/AFINIDAD-DATOS.md` §5 bis y `busqueda.ts`).
 *
 * Comprobado el 2026-10-06: citas copiadas literalmente del Diario de Sesiones
 * (PDF oficial; página impresa = página del PDF); votos recontados con
 * `npm run afinidad:vote` (voto atribuido por diputado). `videoUrl` es el clip
 * de la intervención en congreso.es (sesión y fecha del enlace comprobadas).
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";
const CATALAN = "Alberto Catalán Higueras";
const ROLE = "Diputado de UPN (Grupo Parlamentario Mixto)";

const dscd = (num: string, page: number, date: string, title: string) => ({
  url: `https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-${num}.PDF#page=${page}`,
  title,
  date,
  page: String(page),
  kind: "diario-sesiones" as const,
});

export const saidVsDid: SaidVsDid[] = [
  {
    id: "upn-amnistia-2023",
    partyId: "upn",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: CATALAN,
      role: `${ROLE}, en el debate de investidura de Alberto Núñez Feijóo`,
      date: "2023-09-27",
      text: "tampoco consideramos desde Unión del Pueblo Navarro que se pueda negociar ni pactar con prófugos de la justicia ni que se pueda recurrir a indultos, amnistías, consultas o referéndums de autodeterminación totalmente ilegales",
      source: dscd("5", 25, "2023-09-27", "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 5 (27-9-2023): debate de investidura"),
    },
    did: {
      date: "2024-03-14",
      summary: "Catalán votó en contra del dictamen de la proposición de ley orgánica de amnistía el 14-3-2024 (aprobado por 178 a 172).",
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
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "Catalán va votar en contra del dictamen de la proposició de llei orgànica d'amnistia el 14-3-2024 (aprovat per 178 a 172).",
        role: "Diputat d'UPN (Grup Parlamentari Mixt), en el debat d'investidura d'Alberto Núñez Feijóo",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "Catalán votou en contra do ditame da proposición de lei orgánica de amnistía o 14-3-2024 (aprobado por 178 a 172).",
        role: "Deputado de UPN (Grupo Parlamentario Mixto), no debate de investidura de Alberto Núñez Feijóo",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "Catalánek amnistiari buruzko lege organikoaren proposamenaren irizpenaren aurka bozkatu zuen 2024-3-14an (178 aldeko eta 172 kontrako botorekin onartu zen).",
        role: "UPNko diputatua (Talde Mistoa), Alberto Núñez Feijóoren inbestidura-eztabaidan",
      },
    },
  },
];
