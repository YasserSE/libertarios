import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Junts per Catalunya (grupo «GJxCAT»). No puntúa
 * nunca.
 *
 * Criterio de selección (el mismo para ERC, Junts, EH Bildu, PNV y BNG):
 * compromisos explícitos del programa de 2023 o de la portavoz en el Pleno,
 * cada uno con un hecho posterior en el Congreso (XV) con su JSON de votación.
 * Se buscaron también incumplimientos cruzando el programa con las votaciones
 * de la XV y comparando los anuncios de voto de los portavoces de Junts en los
 * 201 Diarios de Sesiones del Pleno de la XV con el voto del grupo. No apareció
 * ningún «contradice» con prueba primaria.
 *
 * Comprobado el 2026-10-06:
 * - Programa: citas copiadas del PDF (texto extraído y cotejado); `page` es la
 *   página del PDF, como en `stances/programme/junts.ts`.
 * - Diario de Sesiones: cita del PDF oficial (la página impresa coincide con la
 *   del PDF). El DSCD imprime la intervención en catalán y su traducción; la
 *   traducción del propio DSCD va en comentario. `videoUrl`: clip de la
 *   intervención en el archivo audiovisual (formato `v1/15<id del mp4>I`,
 *   tomado de los datos abiertos de intervenciones y comprobado que redirige).
 * - Votos recontados sobre el JSON de datos abiertos de congreso.es; BOE
 *   comprobado con su sumario de datos abiertos.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf",
  title: "Junts per Catalunya: Per Catalunya. Programa electoral (eleccions generals 23-J 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230805224113/https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf",
  kind: "programa" as const,
};
const SPEAKER = "Junts per Catalunya (programa electoral)";
const ROLE = "programa de Junts para las generales del 23-J-2023";
// Fecha de creación del PDF (metadatos: 19-7-2023).
const DATE = "2023-07-19";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "junts-pensiones-si-okupaciones-no-2026",
    partyId: "junts",
    questionId: "okupacion-desalojo",
    topic: "Revalorización de las pensiones y suspensión de desahucios (decretos de 2026)",
    said: {
      speaker: "Míriam Nogueras i Camero",
      role: "portavoz del Grupo Parlamentario Junts per Catalunya",
      date: "2026-01-27",
      // Traducción del DSCD (p. 15): «Votaremos que sí a la revalorización de las pensiones cuando las
      // presenten sin el chantaje de mantener y permitir las okupaciones y los impagos que sufren miles
      // de familias de Cataluña.» Lo dijo en el debate del RDL 16/2025, que Junts votó en contra ese día.
      text: "Votarem que sí a la revalorització de les pensions quan les presentin, sense el xantatge de mantenir i permetre les okupacions i els impagaments que pateixen milers de famílies de Catalunya.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-161.PDF#page=13",
        title:
          "DSCD Pleno núm. 161 (XV), 27-1-2026 — Convalidación del Real Decreto-ley 16/2025 (prórroga de medidas de vulnerabilidad social, pensiones)",
        date: "2026-01-27",
        page: "13",
        kind: "diario-sesiones",
      },
      videoUrl: "https://app.congreso.es/v1/15766866I",
    },
    did: {
      date: "2026-02-26",
      summary:
        "El Gobierno separó las medidas en dos decretos. Los 7 diputados de Junts votaron sí a convalidar el RDL 3/2026 (revalorización de las pensiones) y no a convalidar el RDL 2/2026, que prorroga hasta el 31-12-2026 la suspensión de desahucios y lanzamientos de personas vulnerables.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 164,
          date: "2026-02-26",
          number: 23,
          title:
            "Real Decreto-ley 3/2026, de 3 de febrero, para la revalorización de las pensiones públicas y otras medidas urgentes en materia de Seguridad Social. Convalidación.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion164/20260226/Votacion023/VOT_20260226153430.json`,
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 164,
          date: "2026-02-26",
          number: 22,
          title:
            "Real Decreto-ley 2/2026, de 3 de febrero, por el que se adoptan medidas urgentes para hacer frente a situaciones de vulnerabilidad social, en materia tributaria y relativas a los recursos de los sistemas de financiación territorial. Convalidación.",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion164/20260226/Votacion022/VOT_20260226153428.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2026-2548",
          title:
            "Real Decreto-ley 3/2026, de 3 de febrero, para la revalorización de las pensiones públicas y otras medidas urgentes en materia de Seguridad Social",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-2548",
          date: "2026-02-04",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Revalorització de les pensions i suspensió de desnonaments (decrets del 2026)",
        summary: "El Govern va separar les mesures en dos decrets. Els 7 diputats de Junts van votar sí a convalidar el RDL 3/2026 (revalorització de les pensions) i no a convalidar el RDL 2/2026, que prorroga fins al 31-12-2026 la suspensió de desnonaments i llançaments de persones vulnerables.",
        role: "portaveu del Grup Parlamentari Junts per Catalunya",
      },
      gl: {
        topic: "Revalorización das pensións e suspensión de desafiuzamentos (decretos de 2026)",
        summary: "O Goberno separou as medidas en dous decretos. Os 7 deputados de Junts votaron si a convalidar o RDL 3/2026 (revalorización das pensións) e non a convalidar o RDL 2/2026, que prorroga ata o 31-12-2026 a suspensión de desafiuzamentos e lanzamentos de persoas vulnerables.",
        role: "voceira do Grupo Parlamentario Junts per Catalunya",
      },
      eu: {
        topic: "Pentsioen errebalorizazioa eta etxe-kanporatzeen etendura (2026ko dekretuak)",
        summary: "Gobernuak neurriak bi dekretutan banandu zituen. Juntsen 7 diputatuek baiezkoa bozkatu zuten RDL 3/2026 baliozkotzeko (pentsioen errebalorizazioa) eta ezezkoa RDL 2/2026 baliozkotzeko; azken horrek 31-12-2026ra arte luzatzen du pertsona kalteberen etxe-kanporatzeen eta botatzeen etendura.",
        role: "Junts per Catalunya Talde Parlamentarioko bozeramailea",
      },
    },
  },
  {
    id: "junts-desalojo-48-horas",
    partyId: "junts",
    questionId: "okupacion-desalojo",
    topic: "Desalojo rápido en ocupaciones ilegales",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «En primer lugar, se proponen medidas de tipo procesal como el desalojo cautelar en 48 horas en
      // los supuestos de ocupaciones que perturben la convivencia o que tengan carácter delincuencial y
      // en las que los ocupantes no acrediten el título de posesión correspondiente.»
      text: "En primer lloc, es proposen mesures de tipus processal com el desallotjament cautelar en 48 hores en els supòsits d’ocupacions que pertorbin la convivència o que tinguin caràcter delinqüencial i en les quals els ocupants no acreditin el títol de possessió corresponent.",
      source: { ...PROGRAMA, page: "129" },
    },
    did: {
      date: "2025-03-18",
      summary:
        "Junts registró una proposición de ley orgánica de medidas urgentes contra la ocupación ilegal de inmuebles; sus 7 diputados votaron sí a la toma en consideración, aprobada por 300 votos a favor y 44 en contra.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 99,
          date: "2025-03-18",
          number: 1,
          title:
            "Proposición de Ley del Grupo Parlamentario Junts per Catalunya, de medidas urgentes para hacer frente a la ocupación ilegal de inmuebles (Orgánica). Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion099/20250318/Votacion001/VOT_20250318201321.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Desallotjament ràpid en ocupacions il·legals",
        summary: "Junts va registrar una proposició de llei orgànica de mesures urgents contra l'ocupació il·legal d'immobles; els seus 7 diputats van votar sí a la presa en consideració, aprovada per 300 vots a favor i 44 en contra.",
        role: "programa de Junts per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Desaloxo rápido en ocupacións ilegais",
        summary: "Junts rexistrou unha proposición de lei orgánica de medidas urxentes contra a ocupación ilegal de inmobles; os seus 7 deputados votaron si á toma en consideración, aprobada por 300 votos a favor e 44 en contra.",
        role: "programa de Junts para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Legez kanpoko okupazioetan hustuketa azkarra",
        summary: "Juntsek higiezinen legez kanpoko okupazioari aurre egiteko premiazko neurrien lege organikoaren proposamena erregistratu zuen; haren 7 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan, eta 300 aldeko botorekin eta 44 kontrakorekin onartu zen.",
        role: "Juntsen programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "junts-multirreincidencia",
    partyId: "junts",
    topic: "Multirreincidencia en hurtos (Código Penal)",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «La multirreincidencia. Hay que modificar el Código Penal para combatir la reincidencia en los
      // hurtos para hacer frente al clima de inseguridad ciudadana que genera la actividad delictiva de
      // unas pocas personas que, a pesar de su reincidencia, son detenidas y liberadas reiteradamente por
      // los cuerpos de seguridad.»
      text: "La multireincidència. Cal modificar el Codi Penal per combatre la reincidència en els furts per fer front al clima d’inseguretat ciutadana que genera l’activitat delictiva d’unes poques persones que, malgrat la seva reincidència, són detingudes i alliberades reiteradament pels cossos de seguretat.",
      source: { ...PROGRAMA, page: "129" },
    },
    did: {
      date: "2026-03-26",
      summary:
        "Junts registró una proposición de ley orgánica en materia de multirreincidencia que modifica el Código Penal; sus 7 diputados votaron sí a la toma en consideración (17-9-2024, 304 a favor) y a la votación de conjunto (26-3-2026, 272 a favor y 71 en contra).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 169,
          date: "2026-03-26",
          number: 56,
          title:
            "Votación de conjunto de la Proposición de Ley Orgánica en materia de multirreincidencia, por la que se modifica la Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal, y la Ley de Enjuiciamiento Criminal.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion169/20260326/Votacion056/VOT_20260326165143.json`,
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 59,
          date: "2024-09-17",
          number: 2,
          title:
            "Proposición de Ley del Grupo Parlamentario Junts per Catalunya, Orgánica en materia de multirreincidencia, por la que se modifica la Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion059/20240917/Votacion002/VOT_20240917204417.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Multireincidència en furts (Codi penal)",
        summary: "Junts va registrar una proposició de llei orgànica en matèria de multireincidència que modifica el Codi penal; els seus 7 diputats van votar sí a la presa en consideració (17-9-2024, 304 a favor) i a la votació de conjunt (26-3-2026, 272 a favor i 71 en contra).",
        role: "programa de Junts per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Multirreincidencia en furtos (Código penal)",
        summary: "Junts rexistrou unha proposición de lei orgánica en materia de multirreincidencia que modifica o Código penal; os seus 7 deputados votaron si á toma en consideración (17-9-2024, 304 a favor) e na votación de conxunto (26-3-2026, 272 a favor e 71 en contra).",
        role: "programa de Junts para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Ebasketetako multierreinzidentzia (Zigor Kodea)",
        summary: "Juntsek multierreinzidentziari buruzko lege organikoaren proposamena erregistratu zuen, Zigor Kodea aldatzen duena; haren 7 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan (17-9-2024, 304 aldeko) eta osotasuneko bozketan (26-3-2026, 272 aldeko eta 71 kontrako).",
        role: "Juntsen programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "junts-funcionarios-prisiones-agentes-autoridad",
    partyId: "junts",
    topic: "Funcionarios de prisiones como agentes de la autoridad",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Hay que promover las modificaciones legislativas necesarias para reconocer al colectivo de los
      // funcionarios de prisiones catalanes la condición de agentes de la autoridad.»
      text: "Cal promoure les modificacions legislatives necessàries per reconèixer al col·lectiu dels funcionaris de presons catalans la condició d’agents de l'autoritat.",
      source: { ...PROGRAMA, page: "128" },
    },
    did: {
      date: "2026-06-11",
      summary:
        "Los 7 diputados de Junts votaron sí a la votación de conjunto de la proposición de ley orgánica que modifica el artículo 80 de la Ley General Penitenciaria para reconocer el carácter de agentes de la autoridad a los funcionarios de la Administración Penitenciaria (323 a favor, 21 en contra).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 185,
          date: "2026-06-11",
          number: 39,
          title:
            "Proposición de Ley Orgánica por la que se modifica el artículo ochenta de la Ley Orgánica 1/1979, de 26 de septiembre, General Penitenciaria, para reconocer, a efectos legales, el carácter de agentes de la autoridad a los funcionarios de la Administración Penitenciaria. Votación de conjunto.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion039/VOT_20260611145750.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Funcionaris de presons com a agents de l'autoritat",
        summary: "Els 7 diputats de Junts van votar sí en la votació de conjunt de la proposició de llei orgànica que modifica l'article 80 de la Llei general penitenciària per reconèixer el caràcter d'agents de l'autoritat als funcionaris de l'Administració penitenciària (323 a favor, 21 en contra).",
        role: "programa de Junts per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Funcionarios de prisións como axentes da autoridade",
        summary: "Os 7 deputados de Junts votaron si na votación de conxunto da proposición de lei orgánica que modifica o artigo 80 da Lei xeral penitenciaria para recoñecer o carácter de axentes da autoridade aos funcionarios da Administración penitenciaria (323 a favor, 21 en contra).",
        role: "programa de Junts para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Espetxeetako funtzionarioak agintaritzaren agente gisa",
        summary: "Juntsen 7 diputatuek baiezkoa bozkatu zuten Espetxeetako Lege Orokorraren 80. artikulua aldatzen duen lege organikoaren proposamenaren osotasuneko bozketan; proposamenak Espetxe Administrazioko funtzionarioei agintaritzaren agente izaera aitortzen die (323 aldeko, 21 kontrako).",
        role: "Juntsen programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "junts-deflactar-impuestos",
    partyId: "junts",
    questionId: "irpf-inflacion",
    topic: "Deflactar el IRPF",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      // «Compromiso de deflactar las escalas impositivas de todos los impuestos a la inflación.»
      text: "Compromís de deflactar les escales impositives de tots els impostos a la inflació",
      source: { ...PROGRAMA, page: "60" },
    },
    did: {
      date: "2025-06-12",
      summary:
        "Ante dos proposiciones no de ley del PP para ajustar el IRPF a la inflación, los 7 diputados de Junts se abstuvieron en la primera (9-4-2024) y votaron sí en la segunda (12-6-2025).",
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
    note: "Dos votaciones sobre lo mismo con distinto voto: abstención en 2024 y sí en 2025. Ambas son proposiciones no de ley (no obligan al Gobierno); ninguna ley de deflactación llegó a votarse en el Pleno de la XV.",
    i18n: {
      ca: {
        topic: "Deflactar l'IRPF",
        summary: "Davant dues proposicions no de llei del PP per ajustar l'IRPF a la inflació, els 7 diputats de Junts es van abstenir en la primera (9-4-2024) i van votar sí en la segona (12-6-2025).",
        note: "Dues votacions sobre el mateix amb un vot diferent: abstenció el 2024 i sí el 2025. Totes dues són proposicions no de llei (no obliguen el Govern); cap llei de deflactació no es va arribar a votar al Ple de la XV legislatura.",
        role: "programa de Junts per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Deflactar o IRPF",
        summary: "Ante dúas proposicións non de lei do PP para axustar o IRPF á inflación, os 7 deputados de Junts abstivéronse na primeira (9-4-2024) e votaron si na segunda (12-6-2025).",
        note: "Dúas votacións sobre o mesmo con distinto voto: abstención en 2024 e si en 2025. Ambas son proposicións non de lei (non obrigan o Goberno); ningunha lei de deflactación chegou a votarse no Pleno da XV lexislatura.",
        role: "programa de Junts para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "PFEZa deflaktatzea",
        summary: "PPk PFEZa inflaziora egokitzeko aurkeztutako legez besteko bi proposamenen aurrean, Juntsen 7 diputatuak abstenitu egin ziren lehenengoan (9-4-2024) eta baiezkoa bozkatu zuten bigarrenean (12-6-2025).",
        note: "Gai berari buruzko bi bozketa, boto desberdinarekin: abstentzioa 2024an eta baiezkoa 2025ean. Biak dira legez besteko proposamenak (ez dute Gobernua behartzen); XV. legealdiko Osoko Bilkuran ez zen deflaktazio-legerik bozkatu.",
        role: "Juntsen programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
];
