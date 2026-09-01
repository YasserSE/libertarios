/**
 * Medidas intervencionistas y lo que muestra la evidencia.
 *
 * Es la sección más fácil de escribir mal de todo el sitio. La versión perezosa
 * —«tope al alquiler, luego escasez, fin»— se desmonta en el primer comentario
 * y se lleva por delante la credibilidad del resto. Así que cada medida trae
 * cuatro cosas y las cuatro son obligatorias:
 *
 *   1. `goal`      — qué busca, contado como lo contaría quien la defiende.
 *   2. `evidence`  — qué han medido los estudios, con nombres para poder ir.
 *   3. `disputed`  — dónde la evidencia NO respalda la versión fuerte. Incluye
 *                    los casos en los que el propio liberalismo afirma de más.
 *   4. `principle` — el mecanismo económico, que es lo que se puede generalizar.
 *
 * Sin el punto 3 esto sería propaganda. Con él es un argumento que aguanta que
 * lo comprueben, que es justo lo que el proyecto promete.
 */

export interface Measure {
  id: string;
  name: string;
  /** Etiqueta corta del ámbito. */
  area: string;
  goal: string;
  evidence: string;
  /** Casos concretos con fuente citable. */
  cases: { place: string; finding: string; source: string }[];
  disputed: string;
  principle: string;
  /** Fuerza de la evidencia, para no dar todo por igual de firme. */
  strength: "sólida" | "media" | "discutida";
}

export const MEASURES: Measure[] = [
  {
    id: "control-alquileres",
    name: "Topes al precio del alquiler",
    area: "Vivienda",
    strength: "sólida",
    goal:
      "Que una subida de precios no expulse de su barrio a quien lleva años viviendo en él. La necesidad es real: en las ciudades tensionadas el alquiler ha crecido muy por encima de los salarios.",
    evidence:
      "Es uno de los pocos asuntos con acuerdo amplio entre economistas de distintas escuelas. El tope protege a quien ya tiene contrato y reduce la vivienda disponible para todos los demás.",
    cases: [
      {
        place: "San Francisco",
        finding:
          "El control redujo un 20 % la probabilidad de que el inquilino protegido se mudara —funcionó para él— y a la vez los propietarios retiraron un 15 % de las viviendas del mercado de alquiler, lo que subió los precios en el resto de la ciudad.",
        source: "Diamond, McQuade y Qian, American Economic Review, 2019",
      },
      {
        place: "Estocolmo",
        finding:
          "Con alquileres regulados desde 1942, el acceso a un piso pasa por una cola municipal cuya espera media supera los nueve años.",
        source: "Bostadsförmedlingen, datos anuales de la cola de vivienda",
      },
      {
        place: "Cataluña",
        finding:
          "Tras la ley de contención de rentas de 2020, la oferta de vivienda en alquiler cayó en los municipios afectados; los precios bajaron en los contratos regulados y subieron fuera de ellos.",
        source: "García-Montalvo y Monràs, análisis del efecto de la ley catalana",
      },
    ],
    disputed:
      "Que protege al inquilino que ya está dentro no es discutible: está medido y es el efecto buscado. La discusión honesta es de reparto, no de mecanismo — quién paga la protección. La paga quien todavía no tiene contrato: jóvenes, quien llega de fuera, quien necesita mudarse.",
    principle:
      "Un precio máximo no crea vivienda. Reparte de otra manera la que ya existe, y a la vez reduce el incentivo a poner más en el mercado.",
  },
  {
    id: "salario-minimo",
    name: "Subidas fuertes del salario mínimo",
    area: "Trabajo",
    strength: "discutida",
    goal:
      "Que trabajar a jornada completa saque de la pobreza. En España el mínimo llevaba décadas muy por debajo de la media europea en relación al salario mediano.",
    evidence:
      "Aquí la evidencia NO respalda la versión fuerte que suele defender el liberalismo. Es el debate empírico más disputado de la economía laboral moderna, y lleva medio siglo sin cerrarse.",
    cases: [
      {
        place: "Nueva Jersey",
        finding:
          "El estudio que cambió el debate: comparando restaurantes de comida rápida a ambos lados de la frontera estatal, no encontró pérdida de empleo tras la subida. David Card recibió el Nobel en 2021 en parte por este trabajo.",
        source: "Card y Krueger, American Economic Review, 1994",
      },
      {
        place: "Estados Unidos, 138 subidas estatales",
        finding:
          "Revisión de todas las subidas estatales durante tres décadas: los empleos que desaparecían por debajo del nuevo mínimo reaparecían justo por encima. El efecto neto sobre el empleo total fue cercano a cero en subidas moderadas.",
        source: "Cengiz, Dube, Lindner y Zipperer, Quarterly Journal of Economics, 2019",
      },
      {
        place: "España, subida del 22 % en 2019",
        finding:
          "El Banco de España estimó una desaceleración del crecimiento del empleo en el colectivo directamente afectado, concentrada en los grupos con menos alternativas: jóvenes sin experiencia y mayores de 45 con baja cualificación.",
        source: "Banco de España, Documentos Ocasionales, 2019-2021",
      },
    ],
    disputed:
      "Decir «el salario mínimo destruye empleo» es afirmar más de lo que se sabe. En subidas moderadas el efecto medido sobre el empleo total es pequeño o nulo. Lo que sí aparece con regularidad es otra cosa: el coste, cuando existe, no se reparte — recae sobre quien tiene menos que ofrecer, que es justo a quien la medida pretendía ayudar.",
    principle:
      "Un precio mínimo por hora no cambia lo que esa hora produce. Cuando la distancia entre ambos es pequeña, se absorbe en márgenes y precios; cuando es grande, alguien deja de ser contratable.",
  },
  {
    id: "aranceles",
    name: "Aranceles para proteger la industria",
    area: "Comercio",
    strength: "sólida",
    goal:
      "Defender el empleo industrial propio de una competencia exterior con costes mucho más bajos. Es una preocupación legítima: las comarcas que perdieron su industria no se recuperaron solas.",
    evidence:
      "Los aranceles de 2018 en Estados Unidos son el experimento natural mejor medido que existe, y el resultado fue el mismo en estudios de equipos independientes.",
    cases: [
      {
        place: "Estados Unidos, 2018",
        finding:
          "El coste del arancel lo pagaron íntegramente importadores y consumidores estadounidenses, no los exportadores extranjeros. El precio de importación antes de aranceles no bajó.",
        source: "Amiti, Redding y Weinstein, Journal of Economic Perspectives, 2019",
      },
      {
        place: "Estados Unidos, empleo",
        finding:
          "El empleo ganado en las industrias protegidas fue menor que el perdido en las que usan esos productos como insumo, más el destruido por los aranceles de represalia sobre la agricultura.",
        source: "Flaaen y Pierce, Reserva Federal, 2019",
      },
    ],
    disputed:
      "Lo que sí sostiene la literatura es que la apertura comercial concentra las pérdidas en comarcas concretas mientras reparte las ganancias por todo el país. El «shock China» sobre el empleo industrial estadounidense está bien documentado (Autor, Dorn y Hanson). Que el arancel no lo arregle no significa que el problema no exista.",
    principle:
      "Un arancel es un impuesto al comprador nacional. Protege un empleo visible y encarece los insumos de muchos más que no se ven.",
  },
  {
    id: "licencias",
    name: "Licencias y colegios profesionales",
    area: "Regulación",
    strength: "media",
    goal:
      "Garantizar que quien ejerce un oficio sabe hacerlo. Nadie quiere un cirujano sin titular ni un piloto sin horas de vuelo.",
    evidence:
      "El efecto sobre los salarios de quien tiene la licencia está medido con claridad. El efecto sobre la calidad del servicio, en la mayoría de oficios, no aparece.",
    cases: [
      {
        place: "Estados Unidos",
        finding:
          "La licencia obligatoria eleva en torno a un 15 % el salario de quien la posee, sin mejora medible de la calidad en la mayoría de las ocupaciones estudiadas.",
        source: "Kleiner y Krueger, Journal of Labor Economics, 2013",
      },
      {
        place: "Unión Europea",
        finding:
          "Las profesiones reguladas varían enormemente entre países sin diferencias de calidad que lo justifiquen: un oficio que exige licencia en un Estado miembro se ejerce libremente en otro.",
        source: "Comisión Europea, evaluaciones de la Directiva de Servicios",
      },
    ],
    disputed:
      "En medicina, aviación o ingeniería estructural la restricción de entrada sí correlaciona con seguridad, y ahí casi nadie discute que deba existir. El desacuerdo es de alcance —cuántos oficios necesitan licencia— no de principio. Presentarlo como «toda licencia sobra» es una caricatura.",
    principle:
      "Restringir quién puede ofrecer un servicio sube su precio. Si además mejora la calidad puede compensar; si no, es una renta para quien ya está dentro.",
  },
  {
    id: "subvencion-demanda",
    name: "Subvencionar la demanda sin tocar la oferta",
    area: "Vivienda y educación",
    strength: "media",
    goal:
      "Hacer accesible algo caro dando dinero a quien no llega: ayudas al alquiler, becas, créditos para estudiar.",
    evidence:
      "Cuando la oferta no puede responder a corto plazo, buena parte de la ayuda termina absorbida por el precio en lugar de por el beneficiario.",
    cases: [
      {
        place: "Estados Unidos, crédito estudiantil",
        finding:
          "Por cada dólar adicional de préstamo federal subvencionado, la matrícula de las universidades subió alrededor de sesenta céntimos.",
        source: "Lucca, Nadauld y Shen, Reserva Federal de Nueva York, 2017",
      },
      {
        place: "España, bono de alquiler joven",
        finding:
          "Varios análisis del mercado observaron subidas de precio concentradas en el tramo de vivienda al que se dirigía la ayuda.",
        source: "Informes de portales inmobiliarios y del Banco de España",
      },
    ],
    disputed:
      "El efecto depende por completo de la elasticidad de la oferta. Donde se puede construir o ampliar plazas con rapidez, la ayuda llega a quien va dirigida. El problema no es ayudar: es ayudar a comprar algo cuya cantidad está bloqueada por otra vía —normalmente, por regulación del suelo—.",
    principle:
      "Si la cantidad no puede crecer, dar más dinero a los compradores solo sube el precio de lo que ya hay.",
  },
];

export const STRENGTH_LABEL: Record<Measure["strength"], string> = {
  sólida: "Evidencia sólida",
  media: "Evidencia media",
  discutida: "Evidencia discutida",
};
