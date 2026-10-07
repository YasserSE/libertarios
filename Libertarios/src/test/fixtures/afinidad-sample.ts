import type {
  Dataset,
  DeputyAttribution,
  Party,
  Position,
  ProgrammeStance,
  Question,
  Quote,
  RecordStance,
  SaidVsDid,
  Stance,
} from "@/data/afinidad/types";

/**
 * Dataset SINTÉTICO para los tests del motor y para que la UI pueda trabajar
 * antes de que existan los datos reales.
 *
 * Todo es ficticio: «Partido A/B/C», enunciados de prueba, programas en
 * example.org. Las URLs de votación siguen el patrón de datos abiertos de
 * congreso.es —porque el esquema lo exige— pero con sesiones 9xx inexistentes:
 * no apuntan a ninguna votación real. Aquí no debe entrar nunca un dato de un
 * partido real; para eso está `src/data/afinidad/`.
 *
 * Incluye a propósito los casos difíciles: una celda `sin-posicion`, una
 * `pendiente` y una `contested`, y un partido regional.
 */

const SAMPLE_DATE = "2024-01-10";

function anchor(n: number): Question["anchors"][number] {
  return {
    legislature: "XV",
    session: 900 + n,
    date: SAMPLE_DATE,
    number: n,
    title: `Votación ficticia ${n}`,
    url: `https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion${900 + n}/20240110/Votacion00${n}/`,
    agreeMeans: n % 2 === 0 ? "no" : "si",
  };
}

const question = (n: number, topic: string): Question => ({
  id: `q${n}`,
  order: n,
  topic,
  text: { es: `Afirmación de prueba ${n} sobre ${topic.toLowerCase()}.` },
  rationale: `Ítem sintético ${n} para los tests.`,
  anchors: [anchor(n)],
});

export const sampleQuestions: Question[] = [
  question(1, "Tema uno"),
  question(2, "Tema dos"),
  question(3, "Tema tres"),
  question(4, "Tema cuatro"),
  question(5, "Tema cinco"),
];

const party = (id: string, name: string, color: string, bloc: Party["bloc"], extra: Partial<Party> = {}): Party => ({
  id,
  name,
  short: name.replace("Partido ", "P"),
  color,
  initials: name.replace("Partido ", "P"),
  scope: "estatal",
  bloc,
  parliamentary: true,
  inclusionReason: "Partido ficticio de prueba.",
  inclusionSource: { url: "https://example.org/criterio", title: "Criterio ficticio" },
  status: "confirmada",
  ...extra,
});

export const sampleParties: Party[] = [
  party("partido-a", "Partido A", "#4c6ef5", "izquierda"),
  party("partido-b", "Partido B", "#f08c00", "derecha"),
  // Regional: solo se presenta en la CCAA 09 (código ficticio a efectos de test).
  party("partido-c", "Partido C", "#2f9e44", "nacionalista", {
    scope: "autonomica",
    regions: ["09"],
    status: "por-confirmar",
    recordNote: "Voto atribuido por diputado dentro de un grupo mixto ficticio.",
  }),
];

const prog = (partyId: string, n: number, position: Position): ProgrammeStance => ({
  position,
  status: "verificado",
  confidence: "alta",
  quote: `Texto ficticio del programa de ${partyId} sobre el ítem ${n}.`,
  source: { url: `https://example.org/${partyId}/programa.pdf`, title: "Programa ficticio", year: 2023, page: String(n) },
});

const rec = (n: number, position: Position): RecordStance => {
  const { agreeMeans, ...vote } = anchor(n);
  return {
    position,
    status: "verificado",
    confidence: "alta",
    evidence: [
      {
        kind: "votacion",
        ...vote,
        // Voto coherente con la posición dado el sentido del ancla (ver AFINIDAD-DATOS.md).
        groupVote: position === 0 ? "abstencion" : (position > 0) === (agreeMeans === "si") ? "si" : "no",
      },
    ],
  };
};

const cell = (
  partyId: string,
  n: number,
  programme: ProgrammeStance | null,
  record: RecordStance | null,
): Stance => ({ partyId, questionId: `q${n}`, programme, record });

/** Posiciones de referencia, para leer el fixture de un vistazo. */
//            q1  q2  q3  q4  q5
// A prog:    +2  -1  +1  -2  sin-posicion
// A hechos:  +2  -2  +1  -2  -1
// B prog:    -2  +2  -1  +1  contested (2 vs revisor 0 → 1)
// B hechos:  -2  +2  -2  +2  -1
// C prog:    +1  +1  -2   0  -1
// C hechos:  +1  pendiente -1 -1  +1   (C promete −1 en q5 y vota +1)
export const sampleStances: Stance[] = [
  cell("partido-a", 1, prog("partido-a", 1, 2), rec(1, 2)),
  cell("partido-a", 2, prog("partido-a", 2, -1), rec(2, -2)),
  cell("partido-a", 3, prog("partido-a", 3, 1), rec(3, 1)),
  cell("partido-a", 4, prog("partido-a", 4, -2), rec(4, -2)),
  cell(
    "partido-a",
    5,
    {
      position: 0,
      status: "sin-posicion",
      confidence: "alta",
      quote: "",
      source: { url: "https://example.org/partido-a/programa.pdf", title: "Programa ficticio" },
      note: "El programa ficticio no trata el asunto.",
    },
    rec(5, -1),
  ),

  cell("partido-b", 1, prog("partido-b", 1, -2), rec(1, -2)),
  cell("partido-b", 2, prog("partido-b", 2, 2), rec(2, 2)),
  cell("partido-b", 3, prog("partido-b", 3, -1), rec(3, -2)),
  cell("partido-b", 4, prog("partido-b", 4, 1), rec(4, 2)),
  cell(
    "partido-b",
    5,
    { ...prog("partido-b", 5, 2), status: "contested", confidence: "baja", reviewer: { position: 0, agrees: false } },
    rec(5, -1),
  ),

  cell("partido-c", 1, prog("partido-c", 1, 1), rec(1, 1)),
  cell("partido-c", 2, prog("partido-c", 2, 1), {
    position: 0,
    status: "pendiente",
    confidence: "baja",
    evidence: [],
    note: "Votación ficticia sin desglose por grupo en el fixture.",
  }),
  cell("partido-c", 3, prog("partido-c", 3, -2), rec(3, -1)),
  cell("partido-c", 4, prog("partido-c", 4, 0), rec(4, -1)),
  cell("partido-c", 5, prog("partido-c", 5, -1), rec(5, 1)),
];

/** Hemeroteca ficticia: dice una cosa y la votación ficticia otra. */
export const sampleQuotes: Quote[] = [
  {
    partyId: "partido-b",
    questionId: "q5",
    speaker: "Portavoz ficticia",
    role: "Portavoz en el debate",
    date: SAMPLE_DATE,
    text: "Texto ficticio de una intervención a favor de la medida del ítem 5.",
    source: {
      kind: "diario-sesiones",
      url: "https://example.org/diario-sesiones-ficticio.pdf",
      title: "Diario de Sesiones ficticio",
      date: SAMPLE_DATE,
      page: "12",
    },
    contrastsWithRecord: true,
  },
];

export const sampleDeputies: DeputyAttribution[] = [
  {
    legislature: "XV",
    deputy: "Diputada Ficticia, Una",
    partyId: "partido-c",
    group: "GMx",
    from: "2023-08-17",
    source: { url: "https://example.org/diputados-ficticios", title: "Ficha ficticia", date: "2023-08-17" },
  },
];

/**
 * «Dijeron vs. hicieron» ficticio: una entrada de cada etiqueta (también
 * «no-hecho» con prueba de tipo «iniciativa»), repartidas entre dos partidos, para probar recuentos, filtros y orden por fecha. No va
 * dentro de `sampleDataset` para no cambiar lo que ven los demás tests; quien
 * lo necesite lo añade con `{ ...sampleDataset, saidVsDid: sampleSaidVsDid }`.
 */
export const sampleSaidVsDid: SaidVsDid[] = [
  {
    id: "partido-a-ficticio-1",
    partyId: "partido-a",
    questionId: "q1",
    topic: "Vivienda",
    said: {
      speaker: "Portavoz ficticio A",
      role: "Portavoz",
      date: "2023-05-02",
      text: "Texto ficticio de un compromiso del Partido A.",
      source: { kind: "partido", url: "https://example.org/partido-a/nota.html", title: "Nota ficticia A", date: "2023-05-02" },
      videoUrl: "https://example.org/video-a",
      videoStart: "00:12:30",
    },
    did: {
      date: "2024-01-10",
      summary: "Hecho ficticio que coincide con el compromiso.",
      evidence: [{ ...rec(1, 2).evidence[0] }],
    },
    verdict: "cumple",
  },
  {
    id: "partido-a-ficticio-2",
    partyId: "partido-a",
    topic: "Defensa",
    said: {
      speaker: "Portavoz ficticio A",
      date: "2022-03-01",
      text: "Segundo texto ficticio del Partido A.",
      source: { kind: "prensa", url: "https://example.org/prensa-a", title: "Prensa ficticia" },
    },
    did: {
      date: "2023-02-01",
      summary: "Hecho ficticio en un BOE ficticio.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-99999",
          title: "Norma ficticia",
          url: "https://example.org/boe-ficticio",
          date: "2023-02-01",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Matiz ficticio: se hizo una parte.",
  },
  {
    id: "partido-b-ficticio-1",
    partyId: "partido-b",
    questionId: "q5",
    topic: "Vivienda",
    said: {
      speaker: "Portavoz ficticia B",
      date: "2023-09-01",
      text: "Texto ficticio de un compromiso del Partido B.",
      source: { kind: "diario-sesiones", url: "https://example.org/ds-b.pdf", title: "Diario ficticio", page: "7" },
    },
    did: {
      date: "2024-01-10",
      summary: "Hecho ficticio en sentido contrario.",
      evidence: [{ ...rec(5, -1).evidence[0] }],
    },
    verdict: "contradice",
  },
  {
    id: "partido-b-ficticio-2",
    partyId: "partido-b",
    topic: "Pensiones",
    said: {
      speaker: "Portavoz ficticia B",
      date: "2023-11-20",
      text: "Texto ficticio de un compromiso de gobierno del Partido B.",
      source: { kind: "gobierno", url: "https://example.org/acuerdo-b.pdf", title: "Acuerdo ficticio", date: "2023-11-20" },
    },
    did: {
      date: "2025-06-30",
      summary: "La iniciativa ficticia caducó sin votarse.",
      evidence: [
        {
          kind: "iniciativa",
          title: "Proyecto de ley ficticio",
          url: "https://example.org/iniciativa-ficticia",
          status: "Caducado",
          date: "2025-06-30",
        },
      ],
    },
    verdict: "no-hecho",
    note: "Nota ficticia: el Partido B gobernaba y lo firmó en el acuerdo ficticio.",
  },
];

export const sampleDataset: Dataset = {
  version: "fixture-1",
  parties: sampleParties,
  questions: sampleQuestions,
  stances: sampleStances,
  quotes: sampleQuotes,
  deputies: sampleDeputies,
};
