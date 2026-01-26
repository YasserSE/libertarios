export interface QuadrantQuestion {
  id: number;
  text: string;
  axis: 'economic' | 'social';
  direction: 1 | -1; // 1 = agreement increases freedom, -1 = agreement decreases freedom
  insight?: string; // Brief insight shown after answering
}

export const quadrantQuestions: QuadrantQuestion[] = [
  // Economic axis questions (8 questions) - Thought-provoking
  {
    id: 1,
    text: "Un grupo reducido de expertos puede planificar mejor la economía que millones de personas tomando decisiones individuales cada día.",
    axis: 'economic',
    direction: -1,
    insight: "La economía emerge de millones de interacciones voluntarias, no de planes centralizados.",
  },
  {
    id: 2,
    text: "Cada individuo debería decidir cómo repartir los recursos según sus prioridades, no un comité central.",
    axis: 'economic',
    direction: 1,
    insight: "La escasez es un hecho de la realidad que nadie puede eliminar por decreto.",
  },
  {
    id: 3,
    text: "Cuando compras algo voluntariamente, tanto tú como el vendedor salen ganando.",
    axis: 'economic',
    direction: 1,
    insight: "El comercio voluntario es un juego de suma positiva: ambas partes se benefician.",
  },
  {
    id: 4,
    text: "Es justo que quien se esfuerza más, trabaja más horas y asume más riesgos tenga más recompensas.",
    axis: 'economic',
    direction: 1,
    insight: "Los incentivos importan: las personas responden a las consecuencias de sus acciones.",
  },
  {
    id: 5,
    text: "Preferiría elegir libremente entre varias opciones de servicio (educación, salud) antes que una única opción asignada por el Estado.",
    axis: 'economic',
    direction: 1,
    insight: "La competencia mejora la calidad; el monopolio elimina los incentivos para mejorar.",
  },
  {
    id: 6,
    text: "Cuando el gobierno impone precios máximos (por ejemplo, al alquiler), reduce la oferta de ese producto o servicio.",
    axis: 'economic',
    direction: 1,
    insight: "Los precios transmiten información; distorsionarlos crea escasez artificial.",
  },
  {
    id: 7,
    text: "Una persona conoce mejor sus propias necesidades y circunstancias que un funcionario que nunca la ha conocido.",
    axis: 'economic',
    direction: 1,
    insight: "El conocimiento está disperso en la sociedad; nadie puede centralizarlo todo.",
  },
  {
    id: 8,
    text: "Si prohibir algo crea mercados negros y violencia, la prohibición no es una buena solución.",
    axis: 'economic',
    direction: 1,
    insight: "Las consecuencias no intencionadas de las políticas suelen empeorar el problema original.",
  },
  // Social axis questions (8 questions) - Thought-provoking
  {
    id: 9,
    text: "Un adulto tiene derecho a tomar decisiones sobre su propio cuerpo que no afectan a nadie más, sin que otros se lo impidan por su 'propio bien'.",
    axis: 'social',
    direction: 1,
    insight: "La autonomía personal implica el derecho a tomar decisiones sobre uno mismo.",
  },
  {
    id: 10,
    text: "Prefiero una sociedad donde pueda expresar ideas impopulares sin miedo, antes que una donde solo se permitan las ideas 'correctas'.",
    axis: 'social',
    direction: 1,
    insight: "Todas las grandes ideas fueron impopulares al principio; la censura frena el progreso.",
  },
  {
    id: 11,
    text: "Confío en que el gobierno nunca abusará del poder de vigilar todo lo que hago 'por mi seguridad'.",
    axis: 'social',
    direction: -1,
    insight: "El poder tiende a corromperse; los controles existen para limitar ese riesgo.",
  },
  {
    id: 12,
    text: "Los padres deberían poder educar a sus hijos según sus propios valores, no según los valores que el Estado determine como correctos.",
    axis: 'social',
    direction: 1,
    insight: "La diversidad de pensamiento nace de la libertad de educar según convicciones propias.",
  },
  {
    id: 13,
    text: "Dos adultos no necesitan permiso del Estado para establecer un contrato o relación voluntaria de cualquier tipo.",
    axis: 'social',
    direction: 1,
    insight: "Los acuerdos voluntarios entre adultos no requieren aprobación de terceros.",
  },
  {
    id: 14,
    text: "La libertad de tomar mis propias decisiones, aunque implique riesgos, es más importante que la seguridad garantizada por el Estado.",
    axis: 'social',
    direction: 1,
    insight: "Quien renuncia a libertad por seguridad temporal no merece ninguna de las dos.",
  },
  {
    id: 15,
    text: "Si alguien tiene una opinión que me parece ofensiva, debería poder contraargumentar libremente en lugar de que el Estado la silencie.",
    axis: 'social',
    direction: 1,
    insight: "La mejor respuesta a las malas ideas son mejores ideas, no la censura.",
  },
  {
    id: 16,
    text: "Cada persona es dueña de sí misma y de su trabajo; la sociedad no tiene derecho sobre parte de su esfuerzo sin su consentimiento.",
    axis: 'social',
    direction: 1,
    insight: "La autopropiedad es la base de todos los demás derechos individuales.",
  },
];

export const answerOptions = [
  { value: -2, label: "Totalmente en desacuerdo" },
  { value: -1, label: "En desacuerdo" },
  { value: 0, label: "No estoy seguro/a" },
  { value: 1, label: "De acuerdo" },
  { value: 2, label: "Totalmente de acuerdo" },
];
