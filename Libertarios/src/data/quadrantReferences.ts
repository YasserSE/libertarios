/**
 * Puntos de referencia para el cuadrante.
 *
 * ── Calibración del eje económico ──────────────────────────────────────────
 *
 * La versión anterior era generosa: situaba a España en +28 y a Francia en +22,
 * es decir, del lado del libre mercado. Dos países con el Estado en torno a la
 * mitad del PIB no están del lado del libre mercado en ninguna escala honesta.
 * El eje ahora se ancla en el tamaño y el alcance del Estado, y el resultado es
 * deliberadamente exigente: **casi nada llega arriba**.
 *
 *   +100  Sin Estado (anarcocapitalismo). Nadie real está aquí.
 *    +70  Estado en torno al 15 % del PIB, regulación mínima.
 *    +40  Estado en torno al 25 %.
 *    +15  Estado en torno al 35 %.
 *      0  Estado en torno al 40 %. El punto medio no es «neutral»:
 *          es un Estado que ya gasta cuatro de cada diez euros.
 *    −25  Estado en torno al 48 %.
 *    −50  Estado por encima del 55 %.
 *   −100  Planificación central.
 *
 * El gasto público sobre PIB es el ancla porque es comparable y verificable; la
 * carga regulatoria y la libertad comercial ajustan la posición unos puntos
 * arriba o abajo. Estas bandas son una convención de este proyecto, no un
 * estándar publicado — pero al estar escritas, la posición de cada punto se
 * puede discutir contra un criterio en lugar de contra una intuición.
 *
 * ── Eje social ─────────────────────────────────────────────────────────────
 *
 * Libertades civiles efectivas: expresión, asociación, privacidad, autonomía
 * personal. Mismo espíritu: +100 exige no solo elecciones libres, sino ausencia
 * de castigo legal por conducta que no daña a terceros.
 *
 * ── Exactitud ──────────────────────────────────────────────────────────────
 *
 * Situar países, personas y partidos en dos ejes es siempre una interpretación.
 * Estas posiciones son **orientativas**: reproducen el orden relativo que
 * establecen las fuentes citadas en cada conjunto bajo las bandas de arriba. No
 * son puntuaciones publicadas por esas fuentes ni deben citarse como tales.
 */

export type ReferenceKind = "country" | "thinker" | "leader" | "party-es" | "party-eu";

export interface ReferencePoint {
  id: string;
  kind: ReferenceKind;
  /** Nombre completo, para el tooltip. */
  label: string;
  /** Nombre corto para pintar sobre el gráfico. */
  short: string;
  /** −100 (planificación central) a +100 (sin Estado). */
  economic: number;
  /** −100 (control social) a +100 (libertad personal). */
  social: number;
  /** Una o dos líneas de contexto. */
  note: string;
  /** Bandera para países; se usa como identidad visual. */
  emoji?: string;
  /** Color de marca del partido, para el distintivo. */
  color?: string;
  /** Iniciales del distintivo cuando no hay imagen. */
  initials?: string;
  /**
   * Ruta a un logotipo o ilustración en `public/`. Vacío por defecto: los
   * logotipos de partido y los retratos son material de terceros, así que hay
   * que aportarlos con su licencia. Ver `docs/REFERENCIAS.md`.
   */
  image?: string;
  /** Cargo o papel, para las fichas grandes. */
  role?: string;
  /** Marcado cuando la posición está genuinamente discutida. */
  contested?: boolean;
}

export interface ReferenceSet {
  kind: ReferenceKind;
  label: string;
  hint: string;
  /** De dónde sale el orden relativo. Se muestra en la interfaz. */
  basis: string;
  points: ReferencePoint[];
}

const countries: ReferencePoint[] = [
  { id: "sg", kind: "country", emoji: "🇸🇬", label: "Singapur", short: "Singapur", economic: 60, social: -28, note: "Gasto público en torno al 18 % del PIB. Lo más cerca del extremo económico que hay, y con libertades civiles restringidas." },
  { id: "hk", kind: "country", emoji: "🇭🇰", label: "Hong Kong", short: "Hong Kong", economic: 55, social: -55, note: "Fue la economía más abierta del mundo; sus libertades civiles se desplomaron desde 2020." },
  { id: "ch", kind: "country", emoji: "🇨🇭", label: "Suiza", short: "Suiza", economic: 35, social: 60, note: "Estado en torno al 33 % del PIB y competencia fiscal entre cantones." },
  { id: "cl", kind: "country", emoji: "🇨🇱", label: "Chile", short: "Chile", economic: 30, social: 35, note: "Gasto público cercano al 27 %, el menor de Sudamérica." },
  { id: "ie", kind: "country", emoji: "🇮🇪", label: "Irlanda", short: "Irlanda", economic: 26, social: 55, note: "Fiscalidad societaria baja; el gasto sobre PIB engaña por la contabilidad multinacional." },
  { id: "ee", kind: "country", emoji: "🇪🇪", label: "Estonia", short: "Estonia", economic: 22, social: 55, note: "Estado en torno al 40 %, pero con regulación y trámites muy ligeros." },
  { id: "us", kind: "country", emoji: "🇺🇸", label: "Estados Unidos", short: "EE. UU.", economic: 20, social: 42, note: "Gasto público consolidado cerca del 38 %. Libre mercado relativo, no absoluto." },
  { id: "nz", kind: "country", emoji: "🇳🇿", label: "Nueva Zelanda", short: "N. Zelanda", economic: 18, social: 72, note: "Estado en torno al 40 % con administración sencilla." },
  { id: "ar", kind: "country", emoji: "🇦🇷", label: "Argentina", short: "Argentina", economic: 8, social: 38, note: "En plena reducción del gasto y desregulación desde 2024; su posición se está moviendo.", contested: true },
  { id: "jp", kind: "country", emoji: "🇯🇵", label: "Japón", short: "Japón", economic: 5, social: 40, note: "Estado en torno al 44 % y normas sociales estrictas sin coacción legal." },
  { id: "nl", kind: "country", emoji: "🇳🇱", label: "Países Bajos", short: "P. Bajos", economic: 2, social: 78, note: "Estado del 44 %. Referencia en libertades personales, no en tamaño del Estado." },
  { id: "sa", kind: "country", emoji: "🇸🇦", label: "Arabia Saudí", short: "A. Saudí", economic: 8, social: -85, note: "Economía dirigida por el Estado petrolero, sin libertades civiles." },
  { id: "gb", kind: "country", emoji: "🇬🇧", label: "Reino Unido", short: "R. Unido", economic: 0, social: 45, note: "Estado en torno al 45 % y regulación creciente del discurso." },
  { id: "in", kind: "country", emoji: "🇮🇳", label: "India", short: "India", economic: 0, social: 15, note: "Estado pequeño en gasto pero con una carga regulatoria enorme." },
  { id: "pl", kind: "country", emoji: "🇵🇱", label: "Polonia", short: "Polonia", economic: -5, social: 18, note: "Estado del 45 % con agenda social conservadora." },
  { id: "hu", kind: "country", emoji: "🇭🇺", label: "Hungría", short: "Hungría", economic: -8, social: -12, note: "Capitalismo de amiguetes y deriva iliberal." },
  { id: "se", kind: "country", emoji: "🇸🇪", label: "Suecia", short: "Suecia", economic: -12, social: 70, note: "Estado cerca del 49 %, compensado por mercados internos muy flexibles." },
  { id: "dk", kind: "country", emoji: "🇩🇰", label: "Dinamarca", short: "Dinamarca", economic: -12, social: 72, note: "Estado del 50 % sobre un mercado laboral desregulado." },
  { id: "de", kind: "country", emoji: "🇩🇪", label: "Alemania", short: "Alemania", economic: -18, social: 55, note: "Estado en torno al 49 % del PIB." },
  { id: "es", kind: "country", emoji: "🇪🇸", label: "España", short: "España", economic: -22, social: 55, note: "Estado en torno al 47 % del PIB. Libertades personales altas, Estado grande: no es un país de baja regulación." },
  { id: "br", kind: "country", emoji: "🇧🇷", label: "Brasil", short: "Brasil", economic: -25, social: 30, note: "Carga fiscal y regulatoria muy alta para su nivel de renta." },
  { id: "ru", kind: "country", emoji: "🇷🇺", label: "Rusia", short: "Rusia", economic: -30, social: -72, note: "Capitalismo de Estado con libertades suprimidas." },
  { id: "it", kind: "country", emoji: "🇮🇹", label: "Italia", short: "Italia", economic: -32, social: 45, note: "Estado por encima del 55 % del PIB." },
  { id: "cn", kind: "country", emoji: "🇨🇳", label: "China", short: "China", economic: -45, social: -85, note: "Mercado dirigido por el partido y vigilancia extensiva." },
  { id: "fr", kind: "country", emoji: "🇫🇷", label: "Francia", short: "Francia", economic: -48, social: 48, note: "Estado en torno al 57 % del PIB, de los mayores de la OCDE. Es el ejemplo de Estado grande con libertades civiles amplias." },
  { id: "ve", kind: "country", emoji: "🇻🇪", label: "Venezuela", short: "Venezuela", economic: -88, social: -62, note: "Controles de precios, expropiaciones y colapso productivo." },
  { id: "cu", kind: "country", emoji: "🇨🇺", label: "Cuba", short: "Cuba", economic: -92, social: -78, note: "Economía estatalizada y partido único." },
  { id: "kp", kind: "country", emoji: "🇰🇵", label: "Corea del Norte", short: "C. del Norte", economic: -100, social: -100, note: "El extremo de ambos ejes." },
];

const thinkers: ReferencePoint[] = [
  { id: "rothbard", kind: "thinker", initials: "MR", label: "Murray Rothbard", short: "Rothbard", economic: 100, social: 88, note: "Anarcocapitalismo: ni siquiera un Estado mínimo. El extremo del cuadrante existe porque alguien lo defendió." },
  { id: "huerta-soto", kind: "thinker", initials: "JH", label: "Jesús Huerta de Soto", short: "Huerta de Soto", economic: 96, social: 72, note: "Escuela austriaca española; anarcocapitalista." },
  { id: "mises", kind: "thinker", initials: "LM", label: "Ludwig von Mises", short: "Mises", economic: 88, social: 62, note: "El problema del cálculo económico bajo planificación." },
  { id: "rallo", kind: "thinker", role: "Economista, España", initials: "JR", label: "Juan Ramón Rallo", short: "Rallo", economic: 88, social: 75, note: "El economista liberal más leído en España. Anarcocapitalista en la teoría y muy crítico con el proteccionismo, también cuando viene de su propio bando." },
  { id: "hoppe", kind: "thinker", initials: "HH", label: "Hans-Hermann Hoppe", short: "Hoppe", economic: 96, social: -32, note: "Anarcocapitalista en lo económico, pero crítico de la democracia y partidario de comunidades excluyentes. Es la prueba de que el propio libertarismo se parte en el eje social.", contested: true },
  { id: "rand", kind: "thinker", initials: "AR", label: "Ayn Rand", short: "Rand", economic: 84, social: 55, note: "Objetivismo; Estado limitado a justicia, policía y defensa." },
  { id: "nozick", kind: "thinker", initials: "RN", label: "Robert Nozick", short: "Nozick", economic: 78, social: 82, note: "El Estado mínimo como el único justificable." },
  { id: "friedman", kind: "thinker", initials: "MF", label: "Milton Friedman", short: "Friedman", economic: 72, social: 68, note: "Monetarismo, cheque escolar y renta negativa: liberal, no anarquista." },
  { id: "sowell", kind: "thinker", initials: "TS", label: "Thomas Sowell", short: "Sowell", economic: 72, social: 35, note: "Incentivos y crítica a la ingeniería social." },
  { id: "hayek", kind: "thinker", initials: "FH", label: "Friedrich Hayek", short: "Hayek", economic: 62, social: 55, note: "Conocimiento disperso y orden espontáneo; admitía un suelo mínimo de renta." },
  { id: "roepke", kind: "thinker", initials: "WR", label: "Wilhelm Röpke", short: "Röpke", economic: 55, social: -38, note: "Ordoliberal, inspirador del milagro alemán. También defendió públicamente el apartheid sudafricano: mercado libre y orden social jerárquico." },
  { id: "lky", kind: "thinker", initials: "LK", label: "Lee Kuan Yew", short: "Lee Kuan Yew", economic: 48, social: -62, note: "No fue economista, sino el arquitecto del modelo de Singapur: apertura económica extrema con libertades civiles restringidas." },
  { id: "smith", kind: "thinker", initials: "AS", label: "Adam Smith", short: "Smith", economic: 48, social: 45, note: "Mercado con un papel definido para el Estado en justicia, defensa y obra pública." },
  { id: "mill", kind: "thinker", initials: "JM", label: "John Stuart Mill", short: "Mill", economic: 25, social: 88, note: "El principio del daño como único límite legítimo a la libertad." },
  { id: "ostrom", kind: "thinker", initials: "EO", label: "Elinor Ostrom", short: "Ostrom", economic: 10, social: 55, note: "Gestión comunitaria de recursos: ni mercado puro ni Estado." },
  { id: "list", kind: "thinker", initials: "FL", label: "Friedrich List", short: "List", economic: -42, social: -28, note: "Nacionalismo económico: aranceles e industria dirigida al servicio de la unidad nacional." },
  { id: "keynes", kind: "thinker", initials: "JK", label: "John Maynard Keynes", short: "Keynes", economic: -35, social: 55, note: "Intervención para sostener la demanda agregada." },
  { id: "sen", kind: "thinker", initials: "AS", label: "Amartya Sen", short: "Sen", economic: -45, social: 72, note: "El desarrollo entendido como libertad efectiva." },
  { id: "rawls", kind: "thinker", initials: "JR", label: "John Rawls", short: "Rawls", economic: -55, social: 72, note: "Justicia distributiva sobre libertades básicas iguales." },
  { id: "piketty", kind: "thinker", initials: "TP", label: "Thomas Piketty", short: "Piketty", economic: -72, social: 60, note: "Fiscalidad fuertemente progresiva contra la concentración de capital." },
  { id: "lange", kind: "thinker", initials: "OL", label: "Oskar Lange", short: "Lange", economic: -82, social: -52, note: "Su respuesta a Mises y Hayek en el debate del cálculo económico sostenía que una junta central podía fijar precios. Acabó sirviendo al régimen comunista polaco." },
  { id: "dobb", kind: "thinker", initials: "MD", label: "Maurice Dobb", short: "Dobb", economic: -90, social: -58, note: "Economista marxista de Cambridge; defensor de la planificación central soviética hasta el final." },
  { id: "bastiat", kind: "thinker", initials: "FB", role: "Economista, Francia 🇫🇷", label: "Frédéric Bastiat", short: "Bastiat", economic: 80, social: 70, note: "«La Ley» y la falacia de la ventana rota. El divulgador liberal más claro que ha dado Francia." },
  { id: "einaudi", kind: "thinker", initials: "LE", role: "Economista y presidente, Italia 🇮🇹", label: "Luigi Einaudi", short: "Einaudi", economic: 70, social: 60, note: "Liberal italiano y presidente de la República; estabilizó la lira tras la guerra." },
  { id: "erhard", kind: "thinker", initials: "LE", role: "Economista y canciller, Alemania 🇩🇪", label: "Ludwig Erhard", short: "Erhard", economic: 58, social: 50, note: "Padre de la economía social de mercado y del milagro alemán: liberalizó precios contra el criterio de los ocupantes aliados." },
  { id: "sala-i-martin", kind: "thinker", initials: "XS", role: "Economista, Cataluña 🏴", label: "Xavier Sala-i-Martín", short: "Sala-i-Martín", economic: 68, social: 65, note: "Economista catalán de Columbia; divulgador del crecimiento y crítico del intervencionismo." },
  { id: "guimaraes-pinto", kind: "thinker", initials: "CG", role: "Economista, Portugal 🇵🇹", label: "Carlos Guimarães Pinto", short: "Guimarães Pinto", economic: 72, social: 62, note: "Economista y fundador de Iniciativa Liberal, el partido que llevó el liberalismo al parlamento portugués." },
  { id: "torres-lopez", kind: "thinker", initials: "JT", role: "Economista, España 🇪🇸", label: "Juan Torres López", short: "Torres López", economic: -70, social: 58, note: "Economista heterodoxo español; ha asesorado a la izquierda en política fiscal y de vivienda." },
  { id: "navarro", kind: "thinker", initials: "VN", role: "Economista, Cataluña 🏴", label: "Vicenç Navarro", short: "Navarro", economic: -78, social: 60, note: "Catedrático catalán de políticas públicas; defensor de un Estado del bienestar de máximos." },
  { id: "louca", kind: "thinker", initials: "FL", role: "Economista, Portugal 🇵🇹", label: "Francisco Louçã", short: "Louçã", economic: -80, social: 62, note: "Economista y fundador del Bloco de Esquerda; crítico de la austeridad y de la troika." },
  { id: "gramsci", kind: "thinker", initials: "AG", role: "Filósofo político, Italia 🇮🇹", label: "Antonio Gramsci", short: "Gramsci", economic: -88, social: -15, note: "Hegemonía cultural: la idea de que el poder se sostiene en el consenso antes que en la fuerza. Su lugar en el eje social se discute.", contested: true },
  {
    id: "marx",
    kind: "thinker",
    initials: "KM",
    label: "Karl Marx",
    short: "Marx",
    economic: -100,
    social: 0,
    note: "Abolición de la propiedad privada de los medios de producción. Su lugar en el eje social se discute: escribió poco sobre libertades civiles, y los regímenes que lo invocaron las suprimieron.",
    contested: true,
  },
];


/**
 * Líderes en ejercicio o recientes.
 *
 * Se puntúa **lo que impulsan**, no el país que heredaron: Macron liberaliza al
 * margen dentro del Estado más grande de la OCDE, y eso lo coloca en positivo
 * aunque Francia esté en −48. Mismo criterio que con los partidos —política
 * ejercida, no declarada—, así que las rebajas de impuestos anunciadas junto a
 * aranceles y más gasto no puntúan como liberalización.
 *
 * Solo hay una figura en el cuadrante libertario. No es un descuido de la
 * selección: es el estado real de la política occidental.
 */
const leaders: ReferencePoint[] = [
  { id: "milei", kind: "leader", role: "Presidente de Argentina", initials: "JM", color: "#7B3FA0", label: "Javier Milei 🇦🇷", short: "Milei", economic: 86, social: 28, note: "Recorte del gasto y desregulación a gran escala. Anarcocapitalista en la teoría, minarquista en la práctica; conservador en varias cuestiones sociales.", contested: true },
  { id: "modi", kind: "leader", role: "Primer ministro de India", initials: "NM", color: "#FF9933", label: "Narendra Modi 🇮🇳", short: "Modi", economic: 12, social: -30, note: "Liberalización parcial y digitalización, con nacionalismo hindú y presión sobre la prensa." },
  { id: "feijoo", kind: "leader", role: "Líder del PP, España", initials: "AF", color: "#1D84CE", label: "Alberto Núñez Feijóo 🇪🇸", short: "Feijóo", economic: 8, social: 0, note: "Bajada de impuestos en el programa sin reducción del gasto comprometida." },
  { id: "macron", kind: "leader", role: "Presidente de Francia", initials: "EM", color: "#FFEB00", label: "Emmanuel Macron 🇫🇷", short: "Macron", economic: 8, social: 48, note: "Reforma de pensiones y del mercado laboral dentro del Estado más grande de la OCDE." },
  { id: "meloni", kind: "leader", role: "Primera ministra de Italia", initials: "GM", color: "#1B3D6D", label: "Giorgia Meloni 🇮🇹", short: "Meloni", economic: 5, social: -45, note: "Continuidad fiscal con las reglas europeas y agenda social conservadora." },
  { id: "bukele", kind: "leader", role: "Presidente de El Salvador", initials: "NB", color: "#0099DC", label: "Nayib Bukele 🇸🇻", short: "Bukele", economic: 20, social: -72, note: "Apertura a la inversión y bitcoin como moneda legal, junto a un régimen de excepción con detenciones masivas y sin garantías." },
  { id: "trump", kind: "leader", role: "Presidente de Estados Unidos", initials: "DT", color: "#E81B23", label: "Donald Trump 🇺🇸", short: "Trump", economic: 0, social: -58, note: "Bajada de impuestos y desregulación sectorial, pero aranceles generalizados y sin recorte del gasto: en conjunto no es liberalización económica.", contested: true },
  { id: "abascal", kind: "leader", role: "Líder de Vox, España", initials: "SA", color: "#63BE21", label: "Santiago Abascal 🇪🇸", short: "Abascal", economic: 0, social: -62, note: "Proteccionismo agrario e industrial junto a gasto social propio; conservadurismo social marcado." },
  { id: "orban", kind: "leader", role: "Primer ministro de Hungría", initials: "VO", color: "#FF6A00", label: "Viktor Orbán 🇭🇺", short: "Orbán", economic: -15, social: -70, note: "Capitalismo de amiguetes, control de medios y reforma constitucional para consolidar el poder." },
  { id: "starmer", kind: "leader", role: "Primer ministro del Reino Unido", initials: "KS", color: "#E4003B", label: "Keir Starmer 🇬🇧", short: "Starmer", economic: -35, social: 45, note: "Laborismo fiscalmente contenido, con más gasto en servicios públicos." },
  { id: "lepen", kind: "leader", role: "Líder del RN, Francia", initials: "ML", color: "#0D378A", label: "Marine Le Pen 🇫🇷", short: "Le Pen", economic: -42, social: -62, note: "Proteccionismo, jubilación anticipada y preferencia nacional." },
  { id: "sanchez", kind: "leader", role: "Presidente del Gobierno, España", initials: "PS", color: "#E30613", label: "Pedro Sánchez 🇪🇸", short: "Sánchez", economic: -52, social: 55, note: "Ampliación del gasto público y del salario mínimo, junto a ampliación de derechos civiles." },
  { id: "lula", kind: "leader", role: "Presidente de Brasil", initials: "LL", color: "#C4122E", label: "Lula da Silva 🇧🇷", short: "Lula", economic: -62, social: 45, note: "Programas sociales amplios e intervención estatal en sectores estratégicos." },
  { id: "xi", kind: "leader", role: "Secretario general del PCCh, China", initials: "XJ", color: "#DE2910", label: "Xi Jinping 🇨🇳", short: "Xi Jinping", economic: -58, social: -92, note: "Reafirmación del control del partido sobre la economía y vigilancia extensiva." },
];

const partiesEs: ReferencePoint[] = [
  { id: "plib", kind: "party-es", initials: "PL", color: "#E8B923", label: "Partido Libertario (P-LIB)", short: "P-LIB", economic: 85, social: 78, note: "El único partido español explícitamente libertario. Extraparlamentario." },
  { id: "cs", kind: "party-es", initials: "Cs", color: "#EB6109", label: "Ciudadanos (histórico)", short: "Cs", economic: 30, social: 48, note: "Liberalismo de centro, favorable al Estado del bienestar. Lo más cerca del liberalismo que llegó al Congreso. Sin representación desde 2023." },
  { id: "pp", kind: "party-es", initials: "PP", color: "#1D84CE", label: "Partido Popular", short: "PP", economic: 8, social: -2, note: "Retórica de bajada de impuestos, gestión de Estado grande: el gasto público no bajó en sus mandatos." },
  { id: "junts", kind: "party-es", initials: "Ju", color: "#00C3B2", label: "Junts", short: "Junts", economic: 2, social: 12, note: "Centroderecha independentista, favorable a la empresa catalana." },
  { id: "vox", kind: "party-es", initials: "Vo", color: "#63BE21", label: "Vox", short: "Vox", economic: 0, social: -62, note: "Baja impuestos en el programa, pero proteccionista y partidario de un Estado fuerte en gasto social propio. Liberal no es." },
  { id: "pnv", kind: "party-es", initials: "PN", color: "#009540", label: "PNV", short: "PNV", economic: -5, social: 32, note: "Democracia cristiana vasca; concierto económico propio." },
  { id: "psoe", kind: "party-es", initials: "PS", color: "#E30613", label: "PSOE", short: "PSOE", economic: -48, social: 52, note: "Socialdemocracia; ampliación del gasto y de derechos civiles." },
  { id: "erc", kind: "party-es", initials: "ER", color: "#FFB232", label: "ERC", short: "ERC", economic: -58, social: 58, note: "Izquierda independentista catalana." },
  { id: "sumar", kind: "party-es", initials: "Su", color: "#E4007C", label: "Sumar", short: "Sumar", economic: -72, social: 68, note: "Coalición de izquierdas; intervención en precios y vivienda." },
  { id: "bildu", kind: "party-es", initials: "EB", color: "#A5CF4E", label: "EH Bildu", short: "Bildu", economic: -78, social: 55, note: "Izquierda abertzale." },
  { id: "podemos", kind: "party-es", initials: "Po", color: "#6A2E68", label: "Podemos", short: "Podemos", economic: -85, social: 62, note: "Izquierda transformadora; nacionalizaciones y control de precios." },
];

const partiesEu: ReferencePoint[] = [
  { id: "konfederacja", kind: "party-eu", initials: "Kf", color: "#203C79", label: "Konfederacja 🇵🇱", short: "Konfederacja", economic: 58, social: -38, note: "Lo más cerca del liberalismo económico con representación en Europa; socialmente muy conservador." },
  { id: "fdp", kind: "party-eu", initials: "FDP", color: "#FFED00", label: "FDP 🇩🇪", short: "FDP", economic: 42, social: 52, note: "Liberales alemanes; freno de deuda y libertades civiles." },
  { id: "vvd", kind: "party-eu", initials: "VVD", color: "#FF7F00", label: "VVD 🇳🇱", short: "VVD", economic: 32, social: 42, note: "Liberalismo conservador neerlandés." },
  { id: "tory", kind: "party-eu", initials: "Cv", color: "#0087DC", label: "Conservative Party 🇬🇧", short: "Tories", economic: 18, social: 5, note: "El gasto público británico creció bajo sus gobiernos." },
  { id: "renaissance", kind: "party-eu", initials: "Re", color: "#FFEB00", label: "Renaissance 🇫🇷", short: "Renaissance", economic: 12, social: 48, note: "Centro liberal francés, dentro del Estado más grande de la OCDE." },
  { id: "reform", kind: "party-eu", initials: "Rf", color: "#12B6CF", label: "Reform UK 🇬🇧", short: "Reform UK", economic: 12, social: -50, note: "Derecha británica antisistema." },
  { id: "cdu", kind: "party-eu", initials: "CDU", color: "#151515", label: "CDU/CSU 🇩🇪", short: "CDU/CSU", economic: 10, social: 10, note: "Democracia cristiana; economía social de mercado." },
  { id: "d66", kind: "party-eu", initials: "D66", color: "#01AE52", label: "D66 🇳🇱", short: "D66", economic: 0, social: 75, note: "Liberalismo social neerlandés." },
  { id: "fdi", kind: "party-eu", initials: "FdI", color: "#1B3D6D", label: "Fratelli d'Italia 🇮🇹", short: "FdI", economic: -5, social: -52, note: "Conservadurismo nacional italiano." },
  { id: "lega", kind: "party-eu", initials: "Lg", color: "#008FD7", label: "Lega 🇮🇹", short: "Lega", economic: -8, social: -58, note: "Derecha regionalista italiana; tipo único fiscal y proteccionismo a la vez." },
  { id: "fidesz", kind: "party-eu", initials: "Fi", color: "#FF6A00", label: "Fidesz 🇭🇺", short: "Fidesz", economic: -15, social: -70, note: "Nacional-conservadurismo con fuerte intervención estatal." },
  { id: "sd", kind: "party-eu", initials: "SD", color: "#DDDD00", label: "Sverigedemokraterna 🇸🇪", short: "SD", economic: -18, social: -58, note: "Derecha nacional sueca, defensora del Estado del bienestar." },
  { id: "pvv", kind: "party-eu", initials: "PVV", color: "#003F7D", label: "PVV 🇳🇱", short: "PVV", economic: -25, social: -58, note: "Derecha radical neerlandesa; gasto social alto." },
  { id: "rn", kind: "party-eu", initials: "RN", color: "#0D378A", label: "Rassemblement National 🇫🇷", short: "RN", economic: -40, social: -62, note: "Proteccionismo y jubilación anticipada: económicamente intervencionista." },
  { id: "labour", kind: "party-eu", initials: "La", color: "#E4003B", label: "Labour 🇬🇧", short: "Labour", economic: -45, social: 50, note: "Laborismo británico." },
  { id: "spd", kind: "party-eu", initials: "SPD", color: "#E3000F", label: "SPD 🇩🇪", short: "SPD", economic: -50, social: 55, note: "Socialdemocracia alemana." },
  { id: "gruene", kind: "party-eu", initials: "Gr", color: "#46962B", label: "Bündnis 90/Die Grünen 🇩🇪", short: "Grüne", economic: -52, social: 78, note: "Verdes alemanes; regulación ambiental intensa." },
  { id: "m5s", kind: "party-eu", initials: "M5S", color: "#FFD400", label: "Movimento 5 Stelle 🇮🇹", short: "M5S", economic: -55, social: 30, note: "Renta de ciudadanía y populismo de difícil encaje." },
  { id: "pis", kind: "party-eu", initials: "PiS", color: "#0B4EA2", label: "PiS 🇵🇱", short: "PiS", economic: -55, social: -68, note: "Conservadurismo social con transferencias sociales muy amplias." },
  { id: "sf", kind: "party-eu", initials: "SF", color: "#326760", label: "Sinn Féin 🇮🇪", short: "Sinn Féin", economic: -65, social: 45, note: "Izquierda republicana irlandesa." },
  { id: "linke", kind: "party-eu", initials: "Li", color: "#BE3075", label: "Die Linke 🇩🇪", short: "Die Linke", economic: -82, social: 60, note: "Izquierda alemana." },
  { id: "lfi", kind: "party-eu", initials: "LFI", color: "#CC2443", label: "La France Insoumise 🇫🇷", short: "LFI", economic: -85, social: 52, note: "Izquierda radical francesa." },
];

export const REFERENCE_SETS: ReferenceSet[] = [
  {
    kind: "country",
    label: "Países",
    hint: "28 países",
    basis:
      "Gasto público sobre PIB como ancla, ajustado por carga regulatoria y libertad comercial (Fraser, Heritage); eje social según libertades civiles efectivas (V-Dem, Freedom House).",
    points: countries,
  },
  {
    kind: "thinker",
    label: "Economistas y figuras",
    hint: "32 pensadores, los cuatro cuadrantes",
    basis:
      "Lectura de su obra publicada. Es el conjunto más interpretativo de los cuatro: nadie escribió su propia coordenada. Cubre los cuatro cuadrantes a propósito — hay economistas defendiendo cada combinación de los dos ejes, no solo la libertaria.",
    points: thinkers,
  },
  {
    kind: "leader",
    label: "Líderes actuales",
    hint: "14 gobernantes y candidatos",
    basis:
      "Política impulsada y ejercida, medida con las mismas bandas que el resto: el eje económico mira gasto, aranceles y regulación, no los anuncios. Solo una figura cae en el cuadrante libertario, y eso es un dato, no un sesgo de la selección.",
    points: leaders,
  },
  {
    kind: "party-es",
    label: "Partidos españoles",
    hint: "11 partidos",
    basis:
      "Estructura del Chapel Hill Expert Survey (eje económico y eje GAL-TAN), corregida por política fiscal ejercida y no solo declarada.",
    points: partiesEs,
  },
  {
    kind: "party-eu",
    label: "Partidos europeos",
    hint: "22 partidos",
    basis:
      "Misma estructura aplicada a partidos con representación parlamentaria en sus países.",
    points: partiesEu,
  },
];

const ALL_POINTS = REFERENCE_SETS.flatMap((s) => s.points);

export const getReferenceSet = (kind: ReferenceKind) =>
  REFERENCE_SETS.find((s) => s.kind === kind);

/** Referencias más cercanas a una posición, para contextualizar un resultado. */
export function nearestReferences(
  position: { economic: number; social: number },
  { kinds, limit = 3 }: { kinds?: ReferenceKind[]; limit?: number } = {},
): (ReferencePoint & { distance: number })[] {
  const pool = kinds ? ALL_POINTS.filter((p) => kinds.includes(p.kind)) : ALL_POINTS;
  return pool
    .map((p) => ({
      ...p,
      distance: Math.hypot(p.economic - position.economic, p.social - position.social),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
