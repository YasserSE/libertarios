/**
 * Corrientes libertarias e ideologías con las que se compara.
 *
 * Todo lo de aquí usa **los mismos dos ejes y la misma calibración** que
 * `quadrantReferences.ts`. Antes cada sección de «Aprende» describía las cosas
 * con su propio vocabulario y sin coordenadas, así que el test, el cuadrante y
 * las páginas explicativas hablaban de lo mismo sin poder cruzarse.
 *
 * Cada entrada lleva su mejor versión (`steelman`) y su objeción más fuerte
 * (`objection`). Explicar una posición solo por su versión más favorable —o
 * solo por la más ridícula— es lo que produce las caricaturas que este proyecto
 * dice querer quitar.
 */

export interface Position {
  economic: number;
  social: number;
}

export interface Current {
  id: string;
  name: string;
  /** Una frase: qué defiende. */
  summary: string;
  position: Position;
  /** Hasta dónde llega el Estado según esta corriente. */
  state: string;
  /** Pensadores de `quadrantReferences` asociados, por id. */
  thinkers: string[];
  /** Su mejor argumento, expuesto como lo expondría quien la defiende. */
  steelman: string;
  /** La objeción más seria que se le hace, sin desactivarla. */
  objection: string;
}

/** Corrientes dentro del libertarismo, de más a menos Estado. */
export const LIBERTARIAN_CURRENTS: Current[] = [
  {
    id: "anarcocapitalismo",
    name: "Anarcocapitalismo",
    summary: "No debería existir el Estado: también la justicia y la seguridad se contratan.",
    position: { economic: 100, social: 80 },
    state: "Ninguno",
    thinkers: ["rothbard", "huerta-soto", "hoppe"],
    steelman:
      "Si el monopolio estatal empeora cualquier otro servicio, no hay razón para creer que la justicia y la seguridad sean la excepción. Ha habido órdenes legales policéntricos que funcionaron durante siglos.",
    objection:
      "Nadie ha mostrado cómo se evita que las agencias de seguridad privadas terminen fusionándose o guerreando entre sí: es decir, cómo no reaparece un Estado, pero sin elecciones.",
  },
  {
    id: "minarquismo",
    name: "Minarquismo",
    summary: "Un Estado mínimo, limitado a policía, tribunales y defensa.",
    position: { economic: 82, social: 72 },
    state: "Mínimo: justicia, orden y defensa",
    thinkers: ["nozick", "rand", "mises"],
    steelman:
      "Sin un árbitro con el monopolio de la fuerza no hay contratos exigibles, y sin contratos exigibles no hay mercado. El Estado mínimo es la condición del resto de las libertades, no su enemigo.",
    objection:
      "Ningún Estado mínimo se ha mantenido mínimo. Si el aparato coactivo existe, siempre habrá quien tenga incentivos para ampliarlo, y la historia sugiere que lo consigue.",
  },
  {
    id: "liberalismo-clasico",
    name: "Liberalismo clásico",
    summary: "Estado limitado, imperio de la ley y un suelo básico de protección.",
    position: { economic: 62, social: 62 },
    state: "Limitado, con red de seguridad mínima",
    thinkers: ["hayek", "friedman", "smith", "mill"],
    steelman:
      "Es la única variante que ha gobernado países reales. Acepta un suelo mínimo —Hayek y Friedman lo defendieron— porque la alternativa práctica no es la pureza doctrinal, sino un Estado mucho mayor.",
    objection:
      "Al admitir excepciones no fija dónde está el límite, y en la práctica ese límite se ha ido moviendo siempre en la misma dirección.",
  },
  {
    id: "paleolibertarismo",
    name: "Paleolibertarismo",
    summary: "Libertad económica junto a comunidades y valores tradicionales.",
    position: { economic: 88, social: -20 },
    state: "Mínimo, con orden social conservador",
    thinkers: ["hoppe", "roepke"],
    steelman:
      "La libertad no flota en el vacío: necesita familia, comunidad y normas compartidas que sostengan la cooperación sin necesidad de ley. Sin ese tejido, el hueco lo llena el Estado.",
    objection:
      "Si esas normas se sostienen mediante exclusión o coacción social, el individuo pierde libertad — solo que ejercida por su comunidad en vez de por el Estado.",
  },
  {
    id: "libertarismo-izquierda",
    name: "Libertarismo de izquierda",
    summary: "Propiedad de uno mismo, pero reparto justo de los recursos naturales.",
    position: { economic: 25, social: 85 },
    state: "Mínimo, con reparto de la renta de la tierra",
    thinkers: ["mill", "ostrom"],
    steelman:
      "Nadie fabricó la tierra ni los minerales. Aceptar la propiedad de uno mismo no obliga a aceptar que el primero en llegar se quede con recursos que no creó.",
    objection:
      "Repartir esa renta exige una autoridad que la calcule y la cobre — es decir, buena parte del Estado que se quería evitar.",
  },
];

export interface Ideology {
  id: string;
  name: string;
  /** Clase de color de marca, para el distintivo. */
  color: string;
  position: Position;
  summary: string;
  keyPoints: string[];
  /** Comparación eje por eje. Frases cortas y del mismo tipo, para poder leerlas en paralelo. */
  comparisons: {
    propiedadPrivada: string;
    libertadEconomica: string;
    libertadIndividual: string;
    rolEstado: string;
    derechosSociales: string;
  };
  /**
   * Escala de 0 a 4 por aspecto, para poder comparar de un vistazo. La prosa
   * sola no se puede escanear: cinco frases distintas por fila no dicen cuál es
   * mayor que cuál.
   */
  ratings: {
    propiedadPrivada: number;
    libertadEconomica: number;
    libertadIndividual: number;
    rolEstado: number;
    derechosSociales: number;
  };
}

export const LIBERTARIANISM: Ideology = {
  id: "libertarismo",
  name: "Libertarismo",
  color: "bg-primary",
  position: { economic: 85, social: 75 },
  summary:
    "Prioriza la libertad individual y la propiedad privada, y limita el poder coactivo del Estado al mínimo o lo elimina.",
  keyPoints: [
    "Nadie puede iniciar el uso de la fuerza contra otro",
    "La propiedad legítimamente adquirida es inviolable",
    "El intercambio voluntario beneficia a ambas partes",
    "El Estado es un mal necesario, o ni siquiera necesario",
  ],
  comparisons: {
    propiedadPrivada: "Derecho inviolable",
    libertadEconomica: "Mercado sin intervención",
    libertadIndividual: "Máxima, con el límite de no agredir",
    rolEstado: "Mínimo o inexistente",
    derechosSociales: "Voluntarios, no obligatorios por ley",
  },
  ratings: {
    propiedadPrivada: 4,
    libertadEconomica: 4,
    libertadIndividual: 4,
    rolEstado: 0,
    derechosSociales: 1,
  },
};

export const IDEOLOGIES: Ideology[] = [
  {
    id: "socialdemocracia",
    name: "Socialdemocracia",
    color: "bg-rose-400",
    position: { economic: -45, social: 55 },
    summary:
      "Mantiene el mercado y la propiedad privada, pero los corrige con impuestos altos y servicios públicos universales.",
    keyPoints: [
      "Propiedad privada con fiscalidad progresiva alta",
      "Sanidad y educación públicas y universales",
      "Negociación colectiva y protección del empleo",
      "Mercado como motor, Estado como corrector",
    ],
    comparisons: {
      propiedadPrivada: "Reconocida, con carga fiscal alta",
      libertadEconomica: "Mercado con regulación amplia",
      libertadIndividual: "Amplia en lo personal",
      rolEstado: "Grande: redistribuye y provee",
      derechosSociales: "Amplios y garantizados por ley",
    },
    ratings: { propiedadPrivada: 3, libertadEconomica: 2, libertadIndividual: 3, rolEstado: 3, derechosSociales: 4 },
  },
  {
    id: "socialismo",
    name: "Socialismo",
    color: "bg-red-500",
    position: { economic: -72, social: 40 },
    summary:
      "Busca la propiedad pública o colectiva de los sectores clave y una redistribución profunda de la riqueza.",
    keyPoints: [
      "Propiedad pública de industrias estratégicas",
      "Redistribución mediante impuestos muy progresivos",
      "Planificación parcial de la economía",
      "Regulación extensa del mercado laboral y de precios",
    ],
    comparisons: {
      propiedadPrivada: "Limitada en sectores clave",
      libertadEconomica: "Mercado dirigido y planificación parcial",
      libertadIndividual: "Amplia en lo personal, estrecha en lo económico",
      rolEstado: "Muy grande: planifica y posee",
      derechosSociales: "Máximos, garantizados por ley",
    },
    ratings: { propiedadPrivada: 2, libertadEconomica: 1, libertadIndividual: 3, rolEstado: 4, derechosSociales: 4 },
  },
  {
    id: "comunismo",
    name: "Comunismo",
    color: "bg-red-700",
    position: { economic: -100, social: -50 },
    summary:
      "Aspira a una sociedad sin clases mediante la abolición de la propiedad privada de los medios de producción.",
    keyPoints: [
      "Abolición de la propiedad privada productiva",
      "Economía planificada centralmente",
      "Dictadura del proletariado como fase transitoria",
      "Sociedad sin clases ni Estado como objetivo final",
    ],
    comparisons: {
      propiedadPrivada: "Abolida en los medios de producción",
      libertadEconomica: "Planificación central",
      libertadIndividual: "Subordinada al colectivo",
      rolEstado: "Total en la fase transitoria",
      derechosSociales: "Los fija el colectivo",
    },
    ratings: { propiedadPrivada: 0, libertadEconomica: 0, libertadIndividual: 1, rolEstado: 4, derechosSociales: 3 },
  },
  {
    id: "conservadurismo",
    name: "Conservadurismo",
    color: "bg-sky-700",
    position: { economic: 15, social: -35 },
    summary:
      "Defiende el mercado y la propiedad, pero también el orden, la nación y las instituciones heredadas.",
    keyPoints: [
      "Propiedad privada y empresa como base del orden",
      "Instituciones y tradiciones como capital acumulado",
      "Autoridad, seguridad y cohesión nacional",
      "Cambio gradual antes que reforma radical",
    ],
    comparisons: {
      propiedadPrivada: "Derecho firme",
      libertadEconomica: "Mercado con excepciones nacionales",
      libertadIndividual: "Amplia, con límites morales y de orden",
      rolEstado: "Moderado, fuerte en seguridad",
      derechosSociales: "Selectivos, familia como primera red",
    },
    ratings: { propiedadPrivada: 4, libertadEconomica: 3, libertadIndividual: 2, rolEstado: 2, derechosSociales: 2 },
  },
  {
    id: "nacionalismo-economico",
    name: "Nacionalismo económico",
    color: "bg-amber-700",
    position: { economic: -40, social: -45 },
    summary:
      "Subordina el mercado al interés nacional: aranceles, industria protegida y control de fronteras.",
    keyPoints: [
      "Aranceles y protección de la industria propia",
      "Preferencia nacional en empleo y contratación pública",
      "Control estricto de la inmigración",
      "Soberanía por encima de acuerdos internacionales",
    ],
    comparisons: {
      propiedadPrivada: "Reconocida, subordinada al interés nacional",
      libertadEconomica: "Comercio restringido, mercado interno dirigido",
      libertadIndividual: "Condicionada a la cohesión nacional",
      rolEstado: "Grande y dirigista",
      derechosSociales: "Amplios, pero solo para nacionales",
    },
    ratings: { propiedadPrivada: 2, libertadEconomica: 1, libertadIndividual: 1, rolEstado: 4, derechosSociales: 2 },
  },
  {
    id: "fascismo",
    name: "Fascismo",
    color: "bg-slate-700",
    position: { economic: -55, social: -95 },
    summary:
      "Ultranacionalismo autoritario que subordina por completo al individuo al Estado y al líder.",
    keyPoints: [
      "El Estado por encima del individuo, sin excepción",
      "Líder con poder absoluto y partido único",
      "Supresión de la oposición y de la prensa libre",
      "Economía corporativista dirigida por el Estado",
    ],
    comparisons: {
      propiedadPrivada: "Nominal, revocable por el Estado",
      libertadEconomica: "Economía dirigida y corporativista",
      libertadIndividual: "Suprimida",
      rolEstado: "Totalitario",
      derechosSociales: "Concedidos y retirados a voluntad",
    },
    ratings: { propiedadPrivada: 1, libertadEconomica: 1, libertadIndividual: 0, rolEstado: 4, derechosSociales: 1 },
  },
  {
    id: "anarquismo",
    name: "Anarquismo (socialista)",
    color: "bg-neutral-800",
    position: { economic: -70, social: 90 },
    summary:
      "Rechaza el Estado igual que el libertarismo, pero también la propiedad privada de los medios de producción.",
    keyPoints: [
      "Abolición del Estado y de toda jerarquía impuesta",
      "Propiedad colectiva y autogestión",
      "Federaciones voluntarias en lugar de gobierno",
      "Acción directa antes que vía electoral",
    ],
    comparisons: {
      propiedadPrivada: "Rechazada en los medios de producción",
      libertadEconomica: "Sin mercado ni Estado: autogestión",
      libertadIndividual: "Máxima en lo personal",
      rolEstado: "Ninguno",
      derechosSociales: "Garantizados por la comunidad",
    },
    ratings: { propiedadPrivada: 0, libertadEconomica: 1, libertadIndividual: 4, rolEstado: 0, derechosSociales: 3 },
  },
  {
    id: "tecnocracia",
    name: "Tecnocracia",
    color: "bg-cyan-700",
    position: { economic: -30, social: -25 },
    summary:
      "Las decisiones públicas las toman expertos según criterios técnicos, no mayorías ni mercados.",
    keyPoints: [
      "Decisión por criterio experto y evidencia",
      "Desconfianza hacia el juicio del votante medio",
      "Planificación basada en datos e indicadores",
      "Instituciones independientes del ciclo electoral",
    ],
    comparisons: {
      propiedadPrivada: "Instrumental: se respeta si es eficiente",
      libertadEconomica: "Mercado corregido por diseño experto",
      libertadIndividual: "Limitada cuando choca con el óptimo técnico",
      rolEstado: "Grande y con amplia discrecionalidad",
      derechosSociales: "Los que el análisis coste-beneficio justifique",
    },
    ratings: { propiedadPrivada: 2, libertadEconomica: 2, libertadIndividual: 1, rolEstado: 3, derechosSociales: 2 },
  },
];

export const COMPARISON_ASPECTS = [
  { key: "propiedadPrivada", label: "Propiedad privada" },
  { key: "libertadEconomica", label: "Libertad económica" },
  { key: "libertadIndividual", label: "Libertad individual" },
  { key: "rolEstado", label: "Tamaño del Estado" },
  { key: "derechosSociales", label: "Derechos sociales garantizados" },
] as const;

export type ComparisonAspect = (typeof COMPARISON_ASPECTS)[number]["key"];

/**
 * Objeciones al libertarismo, con la respuesta que se les da.
 *
 * Una página que solo expone la mejor versión de su propia posición no explica:
 * convence a quien ya estaba convencido. Estas son las críticas que de verdad
 * se hacen, no versiones fáciles de rebatir.
 */
export const OBJECTIONS = [
  {
    objection: "Sin Estado, el poder no desaparece: lo ocupa quien más tiene.",
    detail:
      "Si se retira el árbitro público, la asimetría de poder entre un trabajador y una gran empresa no se corrige sola. El contrato es voluntario en el papel, no siempre en la práctica.",
    answer:
      "La respuesta libertaria es que buena parte de esa asimetría la crea el propio Estado —licencias, barreras de entrada, rescates— y que la competencia real la reduce. Es una respuesta discutible: no explica los casos donde el poder de mercado se acumula sin ayuda pública.",
  },
  {
    objection: "Hay bienes que el mercado no provee: aire limpio, defensa, investigación básica.",
    detail:
      "Son bienes de los que nadie puede ser excluido, así que a cada individuo le sale a cuenta no pagar y beneficiarse igual. El resultado es que no se producen.",
    answer:
      "Se han documentado provisiones privadas de faros, carreteras o normas técnicas. Pero el problema del free rider es real y ni los propios economistas austriacos lo consideran resuelto en todos los casos.",
  },
  {
    objection: "La igualdad de oportunidades no existe si se hereda todo desde el minuto uno.",
    detail:
      "Dos personas con el mismo talento y esfuerzo terminan en sitios muy distintos según dónde nacieron. Llamar «mérito» al resultado oculta el punto de partida.",
    answer:
      "El libertarismo responde que corregirlo exige coacción sobre familias que no han hecho nada malo, y que la movilidad social depende más de la apertura del mercado que de la redistribución. El desacuerdo aquí es de valores, no de datos.",
  },
  {
    objection: "Los países más libres económicamente tienen Estados considerables.",
    detail:
      "Suiza, Dinamarca o Nueva Zelanda encabezan los índices de libertad económica con Estados que gastan entre un tercio y la mitad del PIB. Ningún país próspero se acerca al Estado mínimo.",
    answer:
      "Se responde que son libres a pesar del tamaño de su Estado, no gracias a él, y que la calidad institucional pesa más que el gasto. Es la objeción empírica más difícil de sortear: el modelo no se ha probado nunca a escala nacional.",
  },
  {
    objection: "El principio de no agresión no resuelve los casos difíciles.",
    detail:
      "¿Contamina agresión? ¿Y un despido que deja a alguien sin poder pagar el tratamiento? ¿Y los niños? El principio parece claro hasta que hay que aplicarlo.",
    answer:
      "Se recurre a la teoría de derechos de propiedad para resolverlos caso por caso, y existe una literatura amplia. Pero la existencia de esa literatura demuestra que el principio, por sí solo, no es autoevidente.",
  },
];
