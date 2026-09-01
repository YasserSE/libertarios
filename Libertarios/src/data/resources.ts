/**
 * Directorio de recursos externos.
 *
 * Todo lo de aquí es **real y verificable**: enlaces a sitios que existen, con
 * contenido de acceso libre. Lo que había antes en esta página era un catálogo
 * inventado —vídeos y artículos que no existían, con contadores de visitas
 * fabricados y fotos de banco de imágenes— presentado como una biblioteca de
 * contenidos propia. Eso no es una carencia de diseño: es afirmar algo falso en
 * una página que promete «perspectiva objetiva».
 *
 * Norma para añadir: solo entra lo que se puede abrir. Nada de fichas de
 * contenido que no existe, nada de métricas que no se miden.
 */

export type ResourceGroup = "amigas" | "fundamentos" | "espanol" | "datos" | "contraste";

export interface Resource {
  title: string;
  org: string;
  url: string;
  description: string;
  /** "libro" | "enciclopedia" | "institución" | "datos" | "curso" */
  format: string;
  /** Marca lo gratuito y en abierto. */
  free: boolean;
}

export interface ResourceSection {
  id: ResourceGroup;
  label: string;
  intro: string;
  items: Resource[];
}

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "amigas",
    label: "Webs amigas",
    intro:
      "Cuatro proyectos que hacen con otros datos lo que este hace con el mapa: enseñar cifras públicas de forma que se entiendan. Dos de ellos no son liberales; están porque el trabajo es bueno.",
    items: [
      {
        title: "¿Dónde van mis impuestos?",
        org: "Fundación Civio",
        url: "https://dondevanmisimpuestos.es/politicas#view=functional&year=2023",
        description:
          "Los Presupuestos Generales del Estado desglosados por política de gasto. Abre directamente la vista funcional: cuánto va a sanidad, a deuda, a defensa o a pensiones.",
        format: "Herramienta",
        free: true,
      },
      {
        title: "¿A dónde van mis impuestos?",
        org: "Proyecto independiente",
        url: "https://www.adondevanmisimpuestos.com/",
        description:
          "La misma idea llevada a lo personal: además del desglose de los presupuestos, calcula cuánto pagas tú de IRPF y de impuestos indirectos.",
        format: "Herramienta",
        free: true,
      },
      {
        title: "Contratación pública",
        org: "Fundación Civio",
        url: "https://quiencobralaobra.es",
        description:
          "Investigación sobre adjudicaciones y contratos públicos: quién cobra qué, con qué irregularidades y por qué procedimiento.",
        format: "Investigación",
        free: true,
      },
      {
        title: "Value School",
        org: "Value School",
        url: "https://www.valueschool.es",
        description:
          "Formación financiera en abierto: ahorro, inversión y cómo funciona el dinero. Sin producto que vender.",
        format: "Formación",
        free: true,
      },
    ],
  },
  {
    id: "fundamentos",
    label: "Para empezar",
    intro:
      "Textos clásicos y enciclopedias de acceso libre. Si nunca has leído nada del tema, empieza por Bastiat: son sesenta páginas y no hace falta saber economía.",
    items: [
      {
        title: "Online Library of Liberty",
        org: "Liberty Fund",
        url: "https://oll.libertyfund.org",
        description:
          "Biblioteca digital con las obras completas de Bastiat, Locke, Mill, Smith y Tocqueville en dominio público.",
        format: "Biblioteca",
        free: true,
      },
      {
        title: "The Concise Encyclopedia of Economics",
        org: "Econlib",
        url: "https://www.econlib.org/library/CEE.html",
        description:
          "Entradas breves escritas por economistas académicos sobre conceptos concretos. Útil para comprobar un término suelto.",
        format: "Enciclopedia",
        free: true,
      },
      {
        title: "Literatura de la Escuela Austriaca",
        org: "Mises Institute",
        url: "https://mises.org/library",
        description:
          "Mises, Hayek, Rothbard y Hazlitt en descarga libre. Es una fuente de parte: publica desde la posición austriaca, no sobre ella.",
        format: "Biblioteca",
        free: true,
      },
      {
        title: "Investigación y análisis de políticas",
        org: "Cato Institute",
        url: "https://www.cato.org",
        description:
          "Think tank libertario estadounidense. Publica estudios sobre políticas concretas, con datos y metodología abiertos.",
        format: "Institución",
        free: true,
      },
    ],
  },
  {
    id: "espanol",
    label: "En español",
    intro: "Instituciones y materiales en castellano, por si el inglés es una barrera.",
    items: [
      {
        title: "Mises Hispano",
        org: "Mises Institute",
        url: "https://mises.org/es",
        description: "Traducciones al español de artículos y libros de la escuela austriaca.",
        format: "Biblioteca",
        free: true,
      },
      {
        title: "Instituto Juan de Mariana",
        org: "IJM",
        url: "https://www.juandemariana.org",
        description:
          "Think tank español de orientación liberal. Publica informes sobre fiscalidad, gasto público y regulación en España.",
        format: "Institución",
        free: true,
      },
      {
        title: "Fundación para el Avance de la Libertad",
        org: "Fundalib",
        url: "https://fundalib.org",
        description:
          "Elabora índices de libertad económica por comunidades autónomas y municipios españoles.",
        format: "Datos",
        free: true,
      },
    ],
  },
  {
    id: "datos",
    label: "Datos e índices",
    intro:
      "Las fuentes que usa este proyecto para calibrar el cuadrante. Si quieres discutir una posición del mapa, discútela contra estas.",
    items: [
      {
        title: "Economic Freedom of the World",
        org: "Fraser Institute",
        url: "https://www.fraserinstitute.org/economic-freedom",
        description:
          "El índice de libertad económica más usado en investigación académica. Serie desde 1970 y datos descargables.",
        format: "Datos",
        free: true,
      },
      {
        title: "Index of Economic Freedom",
        org: "Heritage Foundation",
        url: "https://www.heritage.org/index/",
        description:
          "Índice anual por países, con desglose en carga fiscal, gasto público y libertad regulatoria.",
        format: "Datos",
        free: true,
      },
      {
        title: "V-Dem",
        org: "Universidad de Gotemburgo",
        url: "https://v-dem.net",
        description:
          "La base de datos más detallada sobre calidad democrática y libertades civiles. Es la referencia del eje social del cuadrante.",
        format: "Datos",
        free: true,
      },
      {
        title: "Freedom in the World",
        org: "Freedom House",
        url: "https://freedomhouse.org",
        description: "Informe anual sobre derechos políticos y libertades civiles por país.",
        format: "Datos",
        free: true,
      },
      {
        title: "Chapel Hill Expert Survey",
        org: "CHES",
        url: "https://www.chesdata.eu",
        description:
          "Encuesta a politólogos que sitúa a los partidos europeos en el eje económico y en el eje GAL-TAN. Es la estructura que usa este proyecto para colocar partidos.",
        format: "Datos",
        free: true,
      },
      {
        title: "Human Progress",
        org: "Cato Institute",
        url: "https://humanprogress.org",
        description:
          "Series largas sobre pobreza, esperanza de vida y desarrollo. Fuente de parte, pero con los datos originales enlazados.",
        format: "Datos",
        free: true,
      },
    ],
  },
  {
    id: "contraste",
    label: "La otra parte",
    intro:
      "Leer solo a los propios es la forma más rápida de no entender el debate. Estas fuentes no son libertarias, y por eso están aquí.",
    items: [
      {
        title: "Our World in Data",
        org: "Universidad de Oxford",
        url: "https://ourworldindata.org",
        description:
          "Datos sobre desigualdad, sanidad y clima sin agenda ideológica declarada. Útil precisamente por no tomar partido.",
        format: "Datos",
        free: true,
      },
      {
        title: "Teoría de la justicia — John Rawls",
        org: "Online Library of Liberty (contexto)",
        url: "https://oll.libertyfund.org",
        description:
          "El contraargumento filosófico más serio al libertarismo. Nozick escribió «Anarquía, Estado y utopía» respondiéndole.",
        format: "Libro",
        free: false,
      },
      {
        title: "Trabajos de Thomas Piketty",
        org: "World Inequality Lab",
        url: "https://wid.world",
        description:
          "Base de datos sobre concentración de riqueza. Es la evidencia central de quien defiende la fiscalidad muy progresiva.",
        format: "Datos",
        free: true,
      },
    ],
  },
];

export const ALL_RESOURCES = RESOURCE_SECTIONS.flatMap((s) =>
  s.items.map((item) => ({ ...item, group: s.id })),
);
