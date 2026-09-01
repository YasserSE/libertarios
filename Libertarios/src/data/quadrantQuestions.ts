export interface QuadrantQuestion {
  id: number;
  text: string;
  axis: "economic" | "social";
  /**
   * +1 → estar de acuerdo desplaza hacia la libertad individual.
   * −1 → estar de acuerdo desplaza hacia la intervención del Estado.
   */
  direction: 1 | -1;
  /** Tema, para agrupar la revisión de respuestas al terminar. */
  topic: string;
  /** Qué mide el enunciado. Se muestra al revisar, nunca antes de responder. */
  rationale: string;
}

/**
 * Instrumento de posicionamiento en dos ejes.
 *
 * Tres reglas de diseño, porque la versión anterior fallaba en las tres y el
 * resultado salía predeterminado:
 *
 * 1. **Claves equilibradas.** Cinco ítems por eje puntúan hacia la libertad al
 *    estar de acuerdo y cinco hacia la intervención. Antes 15 de 16 puntuaban en
 *    la misma dirección, así que quien tiende a asentir —un sesgo de respuesta
 *    bien documentado— salía libertario sin que sus ideas influyeran.
 * 2. **Ítems que discriminan.** Un enunciado que casi nadie rechaza («confío en
 *    que el gobierno nunca abusará de vigilarme») no aporta información: mueve a
 *    todo el mundo en el mismo sentido. Cada ítem de aquí recoge un desacuerdo
 *    real entre personas razonables.
 * 3. **Sin argumentar mientras se responde.** Los razonamientos aparecen al
 *    revisar el test, no entre pregunta y pregunta, para no condicionar las
 *    respuestas siguientes.
 */
export const quadrantQuestions: QuadrantQuestion[] = [
  // ─── Eje económico ────────────────────────────────────────────── 5 × (+1)
  {
    id: 1,
    text: "Si se limita por ley el precio del alquiler, con el tiempo habrá menos viviendas disponibles para alquilar.",
    axis: "economic",
    direction: 1,
    topic: "Precios y mercados",
    rationale:
      "Mide si atribuyes a los controles de precios efectos secundarios sobre la oferta, o si los ves como una protección eficaz.",
  },
  {
    id: 2,
    text: "Que una persona gane mucho dinero no implica que se lo haya quitado a otra.",
    axis: "economic",
    direction: 1,
    topic: "Riqueza y desigualdad",
    rationale:
      "Distingue entre ver la economía como un juego de suma cero y verla como creación de valor.",
  },
  {
    id: 3,
    text: "Prefiero poder elegir entre varios proveedores de un servicio esencial, aunque eso signifique que no todos ofrezcan lo mismo.",
    axis: "economic",
    direction: 1,
    topic: "Servicios públicos",
    rationale: "Contrapone la competencia y la elección frente a la provisión uniforme garantizada.",
  },
  {
    id: 4,
    text: "Subir mucho el salario mínimo puede dejar sin empleo a los trabajadores con menos experiencia.",
    axis: "economic",
    direction: 1,
    topic: "Mercado laboral",
    rationale:
      "Un desacuerdo empírico real entre economistas; separa a quien prioriza el efecto sobre el empleo de quien prioriza el suelo salarial.",
  },
  {
    id: 5,
    text: "Reducir impuestos y trámites a las empresas termina beneficiando también a quien no tiene ninguna.",
    axis: "economic",
    direction: 1,
    topic: "Fiscalidad",
    rationale: "Mide si esperas efectos difundidos de la actividad empresarial o los ves concentrados.",
  },

  // ─── Eje económico ────────────────────────────────────────────── 5 × (−1)
  {
    id: 6,
    text: "El Estado debería garantizar a toda persona adulta unos ingresos mínimos, trabaje o no.",
    axis: "economic",
    direction: -1,
    topic: "Redistribución",
    rationale: "Mide hasta dónde llega, para ti, la responsabilidad colectiva sobre el sustento individual.",
  },
  {
    id: 7,
    text: "Hay servicios, como la sanidad o la educación, que deberían prestarse únicamente desde lo público.",
    axis: "economic",
    direction: -1,
    topic: "Servicios públicos",
    rationale: "Contrapeso directo del ítem sobre elección de proveedor: mide lo mismo desde el otro lado.",
  },
  {
    id: 8,
    text: "Sin una regulación estatal fuerte, las grandes empresas acabarían abusando de consumidores y trabajadores.",
    axis: "economic",
    direction: -1,
    topic: "Regulación",
    rationale:
      "Distingue a quien confía en la competencia y la reputación como disciplina de quien la ve insuficiente sin ley.",
  },
  {
    id: 9,
    text: "Es legítimo que el Estado ponga un límite a cuánta riqueza puede llegar a acumular una sola persona.",
    axis: "economic",
    direction: -1,
    topic: "Riqueza y desigualdad",
    rationale: "Mide si la desigualdad te parece un problema en sí mismo o solo cuando nace de un privilegio.",
  },
  {
    id: 10,
    text: "En una crisis, el Estado debería intervenir los precios de los bienes básicos para que nadie especule.",
    axis: "economic",
    direction: -1,
    topic: "Precios y mercados",
    rationale: "Contrapeso del ítem sobre el alquiler, aplicado a una situación de emergencia.",
  },

  // ─── Eje social ───────────────────────────────────────────────── 5 × (+1)
  {
    id: 11,
    text: "Un adulto debería poder consumir cualquier sustancia bajo su responsabilidad, aunque se perjudique.",
    axis: "social",
    direction: 1,
    topic: "Autonomía personal",
    rationale: "Caso límite de la autonomía individual: hasta dónde llega el derecho a hacerse daño a uno mismo.",
  },
  {
    id: 12,
    text: "Debería poder expresarse públicamente una opinión que ofenda a mucha gente sin que la ley lo castigue.",
    axis: "social",
    direction: 1,
    topic: "Libertad de expresión",
    rationale: "Sitúa el límite legal de la expresión, no el límite social o moral.",
  },
  {
    id: 13,
    text: "Una persona con una enfermedad incurable debería poder decidir cómo y cuándo termina su vida.",
    axis: "social",
    direction: 1,
    topic: "Autonomía personal",
    rationale: "Mide la autonomía sobre el propio cuerpo en la decisión más definitiva de todas.",
  },
  {
    id: 14,
    text: "Quien quiera venir a trabajar y vivir aquí debería poder hacerlo con pocas trabas administrativas.",
    axis: "social",
    direction: 1,
    topic: "Movilidad y fronteras",
    rationale:
      "Un eje donde libertarios y conservadores suelen separarse; sin él, el cuadrante no distingue entre ambos.",
  },
  {
    id: 15,
    text: "Una familia debería poder educar a sus hijos fuera del sistema escolar oficial si así lo prefiere.",
    axis: "social",
    direction: 1,
    topic: "Educación",
    rationale: "Contrapone la autoridad de la familia frente al criterio común fijado por el Estado.",
  },

  // ─── Eje social ───────────────────────────────────────────────── 5 × (−1)
  {
    id: 16,
    text: "El Estado debería poder acceder a comunicaciones privadas cuando busca prevenir un atentado.",
    axis: "social",
    direction: -1,
    topic: "Privacidad y seguridad",
    rationale:
      "El intercambio clásico entre privacidad y seguridad, planteado en el caso en que la seguridad más pesa.",
  },
  {
    id: 17,
    text: "Ciertos valores y tradiciones compartidas merecen protegerse por ley, aunque eso limite algunas libertades individuales.",
    axis: "social",
    direction: -1,
    topic: "Comunidad y tradición",
    rationale: "Distingue el conservadurismo social del liberalismo social, que en lo económico pueden coincidir.",
  },
  {
    id: 18,
    text: "Es razonable que la ley prohíba contenidos que puedan dañar la convivencia.",
    axis: "social",
    direction: -1,
    topic: "Libertad de expresión",
    rationale: "Contrapeso del ítem sobre opiniones ofensivas, formulado desde la protección de la convivencia.",
  },
  {
    id: 19,
    text: "El Estado debería desincentivar hábitos poco saludables mediante impuestos o prohibiciones.",
    axis: "social",
    direction: -1,
    topic: "Autonomía personal",
    rationale: "Mide tu tolerancia al paternalismo cuando la conducta perjudica sobre todo a quien la practica.",
  },
  {
    id: 20,
    text: "Ante un aumento de la delincuencia, prefiero más vigilancia policial aunque suponga menos privacidad.",
    axis: "social",
    direction: -1,
    topic: "Privacidad y seguridad",
    rationale: "Repite el intercambio privacidad-seguridad en un contexto cotidiano, no excepcional.",
  },
];

export const answerOptions = [
  { value: -2, label: "Muy en desacuerdo" },
  { value: -1, label: "En desacuerdo" },
  { value: 0, label: "Ni una cosa ni otra" },
  { value: 1, label: "De acuerdo" },
  { value: 2, label: "Muy de acuerdo" },
];

/** Máxima puntuación absoluta por ítem, para normalizar. */
export const MAX_ANSWER = 2;

export interface QuadrantScore {
  economic: number;
  social: number;
  answeredEconomic: number;
  answeredSocial: number;
}

/**
 * Convierte respuestas en una posición de −100 a +100 por eje.
 *
 * Divide por los ítems **respondidos**, no por el total: la versión anterior
 * trataba una pregunta sin responder como un 0 explícito, así que saltarse
 * ítems arrastraba el resultado hacia el centro y lo hacía parecer moderado.
 */
export function scoreQuadrant(answers: Record<number, number>): QuadrantScore {
  const totals = {
    economic: { sum: 0, n: 0 },
    social: { sum: 0, n: 0 },
  };

  for (const q of quadrantQuestions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;
    totals[q.axis].sum += answer * q.direction;
    totals[q.axis].n += 1;
  }

  const normalise = (sum: number, n: number) =>
    n === 0 ? 0 : Math.round((sum / (n * MAX_ANSWER)) * 100);

  return {
    economic: normalise(totals.economic.sum, totals.economic.n),
    social: normalise(totals.social.sum, totals.social.n),
    answeredEconomic: totals.economic.n,
    answeredSocial: totals.social.n,
  };
}
