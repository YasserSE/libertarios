import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de EH Bildu (grupo «GEH Bildu»). No puntúa nunca.
 *
 * Criterio de selección (el mismo para ERC, Junts, EH Bildu, PNV y BNG):
 * compromisos explícitos del programa de 2023 («Compromiso de Euskal Herria
 * Bildu») o del portavoz en el Pleno, cada uno con un hecho posterior en el
 * Congreso (XV) con su JSON de votación. Se buscaron también incumplimientos
 * cruzando el programa con las votaciones de la XV y comparando los anuncios de
 * voto de sus portavoces en los 201 Diarios de Sesiones del Pleno de la XV con
 * el voto del grupo. No apareció ningún «contradice» con prueba primaria.
 *
 * Comprobado el 2026-10-06:
 * - Programa: citas copiadas del PDF (texto extraído y cotejado); `page` es la
 *   página del PDF, como en `stances/programme/eh-bildu.ts`.
 * - Diario de Sesiones: cita del PDF oficial (página impresa = página del PDF).
 *   `videoUrl`: clip de la intervención (formato `v1/15<id del mp4>I`, de los
 *   datos abiertos de intervenciones; comprobado que redirige).
 * - Votos recontados sobre el JSON de datos abiertos de congreso.es.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf",
  title: "Compromiso de Euskal Herria Bildu (elecciones generales 23-J 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230726063554/https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf",
  kind: "programa" as const,
};
const SPEAKER = "EH Bildu (programa electoral)";
const ROLE = "programa de EH Bildu para las generales del 23-J-2023";
// Fecha de creación del PDF (metadatos: 6-7-2023).
const DATE = "2023-07-06";

export const saidVsDid: SaidVsDid[] = [
  {
    id: "eh-bildu-ley-mordaza",
    partyId: "eh-bildu",
    topic: "Derogación de la «ley mordaza» (Ley Orgánica de Protección de la Seguridad Ciudadana)",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      text: "Volveremos a plantear la derogación de la Ley Mordaza para acabar con todas sus medidas contrarias a la libertad de expresión y los derechos y libertades, que el Gobierno español se negó a modificar",
      source: { ...PROGRAMA, page: "12" },
    },
    did: {
      date: "2024-10-29",
      summary:
        "EH Bildu firmó, con los grupos Socialista, SUMAR y Vasco, la Proposición de Ley Orgánica de protección de las libertades y seguridad ciudadana; sus 6 diputados votaron sí a la toma en consideración, aprobada por 176 votos a 170.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 71,
          date: "2024-10-29",
          number: 1,
          title:
            "Proposición de Ley de los Grupos Parlamentarios Socialista, Plurinacional SUMAR, Euskal Herria Bildu y Vasco (EAJ-PNV), Orgánica de protección de las libertades y seguridad ciudadana. Toma en consideración.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion071/20241029/Votacion001/VOT_20241029212331.json`,
        },
      ],
    },
    verdict: "cumple",
    note: "El compromiso era volver a plantearla, y lo hizo. La ley no ha tenido votación final en el Pleno: en los datos abiertos de votaciones del Pleno no figura ninguna posterior al debate de totalidad del 12-12-2024 (comprobado hasta el 30-9-2026).",
    i18n: {
      ca: {
        topic: "Derogació de la «llei mordassa» (Llei orgànica de protecció de la seguretat ciutadana)",
        summary: "EH Bildu va signar, amb els grups Socialista, SUMAR i Basc, la proposició de llei orgànica de protecció de les llibertats i seguretat ciutadana; els seus 6 diputats van votar sí a la presa en consideració, aprovada per 176 vots a 170.",
        note: "El compromís era tornar-la a plantejar, i ho va fer. La llei no ha tingut votació final al Ple: a les dades obertes de votacions del Ple no n'hi consta cap de posterior al debat de totalitat del 12-12-2024 (comprovat fins al 30-9-2026).",
        role: "programa d'EH Bildu per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Derrogación da «lei mordaza» (Lei orgánica de protección da seguridade cidadá)",
        summary: "EH Bildu asinou, cos grupos Socialista, SUMAR e Vasco, a proposición de lei orgánica de protección das liberdades e seguridade cidadá; os seus 6 deputados votaron si á toma en consideración, aprobada por 176 votos a 170.",
        note: "O compromiso era volver propoñela, e fíxoo. A lei non tivo votación final no Pleno: nos datos abertos de votacións do Pleno non figura ningunha posterior ao debate de totalidade do 12-12-2024 (comprobado ata o 30-9-2026).",
        role: "programa de EH Bildu para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "«Mozal-legea» (Herritarren Segurtasuna Babesteko Lege Organikoa) indargabetzea",
        summary: "EH Bilduk, talde Sozialistarekin, SUMARekin eta Euskal Taldearekin batera, askatasunak eta herritarren segurtasuna babesteko lege organikoaren proposamena sinatu zuen; haren 6 diputatuek baiezkoa bozkatu zuten aintzat hartzeko bozketan, eta 176 botorekin onartu zen, 170en aurka.",
        note: "Konpromisoa berriro planteatzea zen, eta hala egin zuen. Legeak ez du azken bozketarik izan Osoko Bilkuran: Osoko Bilkurako bozketen datu irekietan ez da agertzen 12-12-2024ko osokotasuneko eztabaidaren ondorengo bozketarik (30-9-2026ra arte egiaztatua).",
        role: "EH Bilduren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "eh-bildu-impuestos-banca-energeticas",
    partyId: "eh-bildu",
    questionId: "impuesto-banca",
    topic: "Impuestos a la banca y a las energéticas",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      text: "Aumentar la carga impositiva y convertir en permanentes los impuestos a la banca, energéticas y grandes fortunas, respetando la competencia y capacidad de nuestras haciendas forales en la gestión y recaudación de los mismos.",
      source: { ...PROGRAMA, page: "8" },
    },
    did: {
      date: "2025-01-22",
      summary:
        "Los diputados de EH Bildu votaron sí a la toma en consideración de la proposición de Podemos para subir el gravamen a la banca (9-4-2024, rechazada), sí al dictamen de la ley que creó el Impuesto sobre el margen de intereses y comisiones de entidades financieras (21-11-2024) y sí a convalidar el RDL 10/2024 del gravamen temporal energético para 2025 (22-1-2025, derogado por 165 votos a 183).",
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
    note: "En la toma en consideración del 9-4-2024 votaron sí 5 de sus 6 diputados; el sexto no votó.",
    i18n: {
      ca: {
        topic: "Impostos a la banca i a les energètiques",
        summary: "Els diputats d'EH Bildu van votar sí a la presa en consideració de la proposició de Podemos per apujar el gravamen a la banca (9-4-2024, rebutjada), sí al dictamen de la llei que va crear l'impost sobre el marge d'interessos i comissions d'entitats financeres (21-11-2024) i sí a convalidar el RDL 10/2024 del gravamen temporal energètic per al 2025 (22-1-2025, derogat per 165 vots a 183).",
        note: "En la presa en consideració del 9-4-2024 van votar sí 5 dels seus 6 diputats; el sisè no va votar.",
        role: "programa d'EH Bildu per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Impostos á banca e ás enerxéticas",
        summary: "Os deputados de EH Bildu votaron si á toma en consideración da proposición de Podemos para subir o gravame á banca (9-4-2024, rexeitada), si ao ditame da lei que creou o imposto sobre a marxe de xuros e comisións de entidades financeiras (21-11-2024) e si a convalidar o RDL 10/2024 do gravame temporal enerxético para 2025 (22-1-2025, derrogado por 165 votos a 183).",
        note: "Na toma en consideración do 9-4-2024 votaron si 5 dos seus 6 deputados; o sexto non votou.",
        role: "programa de EH Bildu para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Bankuei eta energia-enpresei zergak",
        summary: "EH Bilduko diputatuek baiezkoa bozkatu zuten Podemosek bankuen gaineko karga igotzeko aurkeztutako proposamena aintzat hartzeko bozketan (9-4-2024, baztertua), finantza-erakundeen interes- eta komisio-marjinaren gaineko zerga sortu zuen legearen irizpenean (21-11-2024) eta 2025erako aldi baterako energia-karga ezarri zuen RDL 10/2024 baliozkotzeko bozketan (22-1-2025, indargabetua, 165 boto 183ren aurka).",
        note: "9-4-2024ko aintzat hartzeko bozketan, haren 6 diputatuetatik 5ek baiezkoa bozkatu zuten; seigarrenak ez zuen bozkatu.",
        role: "EH Bilduren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
  {
    id: "eh-bildu-jornada-32-horas",
    partyId: "eh-bildu",
    questionId: "jornada-37-5",
    topic: "Reducción de la jornada laboral",
    said: {
      speaker: SPEAKER,
      role: ROLE,
      date: DATE,
      text: "Reducción de la jornada laboral hasta las 32 horas semanales sin reducción salarial ni modificación de condiciones, respondiendo a la exigencia de la mayoría sindical vasca.",
      source: { ...PROGRAMA, page: "3" },
    },
    did: {
      date: "2025-09-10",
      summary:
        "Los diputados de EH Bildu votaron no a las enmiendas de devolución del proyecto de ley que reducía la jornada máxima a 37,5 horas semanales (5 no; 1 no votó). Las enmiendas se aprobaron por 178 votos a 170 y el proyecto decayó.",
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
    note: "El programa pide 32 horas; lo que se votó fue una reducción a 37,5 horas, que EH Bildu apoyó (votó contra devolver el proyecto). Mismo criterio que ERC (cuatro días) y BNG (35 h): apoyar una reducción menor que la prometida es «parcial», no «cumple».",
    i18n: {
      ca: {
        topic: "Reducció de la jornada laboral",
        summary: "Els diputats d'EH Bildu van votar no a les esmenes de devolució del projecte de llei que reduïa la jornada màxima a 37,5 hores setmanals (5 no; 1 no va votar). Les esmenes es van aprovar per 178 vots a 170 i el projecte va decaure.",
        note: "El programa demana 32 hores; el que es va votar va ser una reducció a 37,5 hores, a la qual EH Bildu va donar suport (va votar en contra de retornar el projecte). Mateix criteri que ERC (quatre dies) i el BNG (35 h): donar suport a una reducció més petita que la prometida és «parcial», no «compleix».",
        role: "programa d'EH Bildu per a les eleccions generals del 23-J-2023",
      },
      gl: {
        topic: "Redución da xornada laboral",
        summary: "Os deputados de EH Bildu votaron non ás emendas de devolución do proxecto de lei que reducía a xornada máxima a 37,5 horas semanais (5 non; 1 non votou). As emendas aprobáronse por 178 votos a 170 e o proxecto decaeu.",
        note: "O programa pide 32 horas; o que se votou foi unha redución a 37,5 horas, que EH Bildu apoiou (votou en contra de devolver o proxecto). Mesmo criterio que ERC (catro días) e o BNG (35 h): apoiar unha redución menor que a prometida é «parcial», non «cumpre».",
        role: "programa de EH Bildu para as eleccións xerais do 23-J-2023",
      },
      eu: {
        topic: "Lanaldiaren murrizketa",
        summary: "EH Bilduko diputatuek ezezkoa bozkatu zuten lanaldi maximoa astean 37,5 ordura murrizten zuen lege-proiektua itzultzeko zuzenketetan (5 ezezko; 1ek ez zuen bozkatu). Zuzenketak 178 botorekin onartu ziren, 170en aurka, eta proiektua bertan behera geratu zen.",
        note: "Programak 32 orduko astea eskatzen du; bozkatu zena 37,5 ordurako murrizketa izan zen, eta EH Bilduk babestu egin zuen (proiektua itzultzearen aurka bozkatu zuen). ERCren (lau egun) eta BNGren (35 h) kasuetako irizpide bera: agindutakoa baino murrizketa txikiagoa babestea «partziala» da, ez «betetzen du».",
        role: "EH Bilduren programa 23-J-2023ko hauteskunde orokorretarako",
      },
    },
  },
];
