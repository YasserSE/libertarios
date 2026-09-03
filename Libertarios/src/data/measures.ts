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

/**
 * La parte de test: una pregunta con dos o tres salidas, y la respuesta.
 *
 * `everyday` es la pieza que hace que esto no sea un gráfico más. El mecanismo
 * en abstracto no convence a nadie; la habitación de sobra que no compensa
 * alquilar, sí. Y `humane` va **antes** que la corrección a propósito: si el
 * lector nota que se ridiculiza la intención de la medida, deja de leer, y con
 * razón. La intención casi siempre es buena; lo que falla es el resultado.
 */
export interface MeasureQuiz {
  question: string;
  /** Dos o tres salidas. La primera suele ser la intuitiva. */
  options: string[];
  /** Índice de la que sostiene la evidencia. */
  correct: number;
  /** Ejemplo cotidiano, en segunda persona, sin jerga. */
  everyday: string;
  /** Lo que queda cuando se olvida el ejemplo. */
  lesson: string;
}

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
  quiz: MeasureQuiz;
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
    quiz: {
      question:
        "En una ciudad donde el alquiler sube más que los sueldos se aprueba un tope legal al precio. Dos años después, ¿qué se encuentra quien todavía está buscando piso?",
      options: [
        "Encuentra lo mismo, más barato",
        "Encuentra menos pisos, y fuera del tope más caros",
      ],
      correct: 1,
      everyday:
        "Imagina que tienes una habitación de sobra. Alquilarla da un dinero, pero también quita intimidad, ata a un contrato y trae líos si el inquilino no paga. A cierto precio compensa. Si por ley ese precio baja lo suficiente, llega un punto en que no: la dejas vacía, la usas de trastero o la pones para estancias cortas. No has hecho nada raro ni egoísta; simplemente ya no te sale a cuenta. Multiplica esa misma decisión por miles de propietarios y eso es la oferta que desaparece del mercado.",
      lesson:
        "Un precio no es solo lo que paga el comprador: es la señal que decide cuánta gente está dispuesta a ofrecer algo. Fijarlo por debajo protege de verdad a quien ya tiene contrato, y encarece la entrada para quien todavía no lo tiene: los jóvenes, quien llega de fuera, quien necesita mudarse.",
    },
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
    quiz: {
      question:
        "Se sube el salario mínimo un 20 %. Según la literatura económica de las últimas tres décadas, ¿qué le pasa al empleo total?",
      options: [
        "Cae con claridad: si algo se encarece, se compra menos",
        "Apenas cambia; en subidas moderadas el efecto medido es pequeño o nulo",
      ],
      correct: 1,
      everyday:
        "Esta es la pregunta en la que se equivoca nuestro propio bando, y por eso está aquí. «El salario mínimo destruye empleo» suena a sentido común y se repite mucho, pero cuando se ha medido —comparando restaurantes a ambos lados de una frontera estatal, o repasando 138 subidas en tres décadas— los empleos que desaparecían por debajo del nuevo mínimo reaparecían justo por encima. David Card recibió el Nobel en 2021 en parte por ese trabajo.",
      lesson:
        "Lo que sí aparece con regularidad no es cuánto empleo se pierde, sino quién lo pierde: el coste, cuando existe, recae sobre quien tiene menos que ofrecer —jóvenes sin experiencia, mayores con baja cualificación—, que es justo a quien la medida pretendía ayudar. Afirmar más que eso es afirmar más de lo que se sabe.",
    },
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
    quiz: {
      question:
        "Se ponen aranceles a un producto importado para proteger a la industria nacional. ¿Quién acaba pagando ese arancel?",
      options: [
        "El exportador extranjero, que tiene que bajar su precio para seguir vendiendo",
        "Los importadores y los consumidores del propio país",
      ],
      correct: 1,
      everyday:
        "Piensa en un taller que compra acero. El arancel encarece el acero importado, así que el taller paga más por su materia prima y sube sus precios, o gana menos. El empleo que se salva en la acería sale en el periódico; el que no se crea en los cientos de talleres que usan acero, no sale en ninguna parte. Por eso una medida así puede ser popular y costosa a la vez.",
      lesson:
        "Un arancel es un impuesto al comprador nacional. Protege un empleo visible y encarece los insumos de muchos más que no se ven. Que no lo arregle no significa que el problema no exista: la apertura comercial concentra las pérdidas en comarcas concretas y reparte las ganancias por todo el país, y eso está bien documentado.",
    },
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
    quiz: {
      question:
        "Muchos oficios exigen licencia o colegiación para ejercer. De los dos efectos que se le suponen, ¿cuál se mide con claridad?",
      options: [
        "Que mejora la calidad del servicio que recibe el cliente",
        "Que sube el salario de quien ya tiene la licencia",
      ],
      correct: 1,
      everyday:
        "Nadie quiere un cirujano sin titular ni un piloto sin horas de vuelo, y ahí casi nadie discute la licencia. La pregunta es otra: ¿y un florista? ¿Un guía turístico? ¿Un peluquero? En un país europeo el oficio exige examen, tasa y años de espera; en el de al lado se ejerce libremente, y nadie ha detectado que los turistas estén peor guiados.",
      lesson:
        "Restringir quién puede ofrecer un servicio sube su precio. Si además mejora la calidad, puede compensar; si no, es una renta para quien ya está dentro. El desacuerdo razonable es de alcance —cuántos oficios necesitan licencia— y no de principio.",
    },
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
    quiz: {
      question:
        "Se aprueba un bono de alquiler para jóvenes en una ciudad donde, por regulación del suelo, no se puede construir más. ¿Qué pasa con el precio del alquiler?",
      options: [
        "Baja lo que cubre el bono: el joven paga menos de su bolsillo",
        "Sube, y buena parte del bono acaba en el precio",
      ],
      correct: 1,
      everyday:
        "Imagina una subasta de diez pisos con cien pujadores. Si el Estado da 250 € a cada pujador, siguen siendo diez pisos y cien pujadores: lo único que ha cambiado es cuánto puede pujar cada uno. El dinero no llega al inquilino, llega al precio. Y donde sí se puede construir o abrir plazas con rapidez, la misma ayuda sí llega a quien va dirigida — el problema no es ayudar, es ayudar a comprar algo cuya cantidad está bloqueada por otra vía.",
      lesson:
        "Si la cantidad no puede crecer, dar más dinero a los compradores solo sube el precio de lo que ya hay. Antes de subvencionar la demanda hay que preguntarse si la oferta puede responder; si no puede, la ayuda cambia de manos por el camino.",
    },
  },
  {
    id: "control-precios",
    name: "Congelar el precio de lo básico",
    area: "Precios",
    strength: "sólida",
    goal:
      "Que una subida de precios no deje a nadie sin comer ni sin luz. Cuando la cesta de la compra sube un 15 % en un año, pedir que el Estado la congele es lo primero que se le ocurre a cualquiera, y no es una idea absurda: el daño es inmediato y recae sobre quien menos margen tiene.",
    evidence:
      "Es de los experimentos más repetidos de la historia económica, con el mismo resultado en países y siglos muy distintos: al precio fijado no se encuentra el producto. Lo que aparece son colas, racionamiento y un mercado paralelo donde sí se consigue, más caro.",
    cases: [
      {
        place: "Estados Unidos, 1971-1974",
        finding:
          "La congelación de precios de Nixon vino seguida de desabastecimiento en varios sectores. El episodio más recordado es el de la carne en 1973: estanterías vacías y ganaderos reteniendo animales a la espera de que se levantara el tope.",
        source: "Registros de la Cost of Living Council y prensa de la época",
      },
      {
        place: "Venezuela, desde 2003",
        finding:
          "El control de precios sobre alimentos y productos de higiene convivió con escasez crónica de esos mismos productos, colas para comprarlos y un mercado paralelo generalizado.",
        source: "Encuesta Nacional de Condiciones de Vida (ENCOVI)",
      },
    ],
    disputed:
      "Un tope temporal sobre un bien concreto, en una emergencia y con la oferta ya comprometida, puede evitar un abuso puntual sin provocar escasez, y hay economistas serios que lo defienden en ese supuesto estrecho. La discusión honesta es cuánto dura «temporal»: el problema aparece cuando el tope se mantiene y la oferta tiene tiempo de reaccionar.",
    principle:
      "El precio es información condensada. Recoge la sequía del agricultor, el flete que subió, la fábrica que cerró y lo que cada comprador está dispuesto a ceder. Ningún comité tiene acceso a esos millones de datos dispersos; al fijar la cifra por decreto no se corrige el precio, se apaga la señal.",
    quiz: {
      question:
        "Los alimentos básicos suben con fuerza y el Gobierno congela su precio por ley. Unos meses después, ¿qué se encuentra la gente en el supermercado?",
      options: [
        "Los mismos productos, a un precio que por fin pueden pagar",
        "Huecos en las estanterías, y el producto disponible por otras vías más caras",
      ],
      correct: 1,
      everyday:
        "Piensa en una panadería a la que la harina le sube un 30 %. Si puede subir el pan, sube el pan, y esa subida es un aviso: a los compradores les dice «gasta con tino», y a otros productores «aquí se gana dinero, ponte a producir harina». Si el pan no puede subir, la panadería no recibe ese aviso ni lo transmite: hace menos barras, cierra antes o deja de hacer el pan que menos margen deja. El precio no ha desaparecido; lo pagas en cola, en calidad o buscándolo en otro sitio.",
      lesson:
        "No hay mejor decisor de precios que el propio mercado, y no por fe en él, sino por un problema de información: nadie reúne lo que saben millones de compradores y vendedores a la vez. Congelar un precio no elimina la escasez, la esconde y la reparte peor — por proximidad a la cola, por contactos, por suerte.",
    },
  },
  {
    id: "subvenciones-cultura",
    name: "Subvencionar la cultura",
    area: "Cultura",
    strength: "discutida",
    goal:
      "Que la creación no dependa solo de lo que se vende. Hay obras que importan y nunca van a llenar una sala, y una sociedad que solo produce lo rentable pierde algo real. La intención es de las más defendibles de esta lista.",
    evidence:
      "Lo que la literatura encuentra con más frecuencia no es que la cultura reciba menos dinero, sino que una parte del dinero público sustituye al privado en vez de sumarse: al aumentar la subvención bajan las donaciones y el patrocinio. Es el efecto llamado desplazamiento, y en las artes se mide de forma parcial, no total. Junto a eso hay un dato español que conviene mirar sin dramatismo y sin taparlo: la mayoría de las películas que se estrenan no encuentran público.",
    cases: [
      {
        place: "Orquestas sinfónicas de Estados Unidos",
        finding:
          "Al aumentar la financiación pública de una orquesta, las donaciones privadas que recibía bajaban: el dinero público desplazaba parte del privado en lugar de atraerlo.",
        source: "Arthur C. Brooks, Nonprofit and Voluntary Sector Quarterly, 1999",
      },
      {
        place: "Bienes públicos, en laboratorio",
        finding:
          "Cuando la aportación obligatoria a un bien común sube, la voluntaria baja, aunque no llega a compensarse del todo. El desplazamiento es real y es parcial.",
        source: "James Andreoni, American Economic Review, 1993",
      },
      {
        place: "Cine español, 2025",
        finding:
          "De las 727 películas españolas exhibidas, 282 —el 39,5 %— no llegaron a 100 espectadores y 530 no llegaron a 1.000. Las diez más vistas se llevaron el 54,8 % de todos los espectadores, y solo una superó el millón. La cifra la publica el propio ICAA y cualquiera puede comprobarla.",
        source: "ICAA, Recaudación y espectadores del cine español en 2025",
      },
      {
        place: "España, presupuesto frente a taquilla",
        finding:
          "En 2023 las ayudas a la cinematografía del Ministerio de Cultura fueron de 116,9 millones de euros. Las películas españolas recaudaron 81,5 millones en las salas del país, y 147,4 contando el resto del mundo.",
        source: "Ministerio de Cultura e ICAA, datos de 2023",
      },
    ],
    disputed:
      "Aquí hay tres cosas que no cuadran con la versión fuerte, y las tres importan. El desplazamiento medido es parcial: el dinero público sí aumenta el total, solo que menos de lo que su cifra sugiere. Hay una parte —patrimonio, archivos, restauración— donde el argumento del mercado es débil de verdad, porque el beneficiario aún no ha nacido y no puede pagar. Y con el cine, el titular fácil se cae al mirar los años seguidos: desde 2016, salvo la pandemia, la recaudación mundial del cine español ha superado el total de las subvenciones que recibe. Añádase que «películas exhibidas» incluye estrenos testimoniales y que no todas están subvencionadas. Lo que sí queda en pie es la pregunta de quién decide.",
    principle:
      "Una subvención no solo añade dinero: cambia a quién hay que convencer. Quien vive de la taquilla responde ante su público; quien vive de la convocatoria responde ante quien la firma. Ninguno de los dos incentivos es neutral, pero solo uno de ellos se suele presentar como si lo fuera.",
    quiz: {
      question:
        "Se duplica el presupuesto público de subvenciones a la cultura. ¿Qué pasa con el dinero total que recibe el sector?",
      options: [
        "Sube igual que la subvención: es dinero nuevo que antes no estaba",
        "Sube menos, porque parte del dinero público sustituye a donaciones y patrocinio",
      ],
      correct: 1,
      everyday:
        "Imagina una sala pequeña que se mantiene con cien socios que pagan una cuota. Llega una subvención que cubre la mitad del presupuesto. Algunos socios piensan, con toda la lógica del mundo, que ya la están pagando con sus impuestos y dejan de aportar. La sala no ha ganado el doble: ha ganado algo menos y, de paso, ha cambiado de jefe. Antes tenía que convencer a cien vecinos; ahora tiene que convencer a un jurado y volver a convencerlo cada año.\n\nEse cambio de jefe se ve en los números del cine español. En 2025 se exhibieron 727 películas y 282 no llegaron a cien espectadores: no a cien mil, a cien. Cuando el dinero llega antes de que exista el público, encontrarlo deja de ser la condición para hacer la película y pasa a ser un extra. Nadie está engañando a nadie; el sistema premia rellenar bien una convocatoria, y eso es lo que se aprende a hacer.",
      lesson:
        "Una subvención no solo añade dinero: cambia a quién hay que convencer. Quien vive de la taquilla responde ante su público; quien vive de la convocatoria responde ante quien la firma.\n\nY esta es de las más discutibles de las ocho, así que va con su freno: el desplazamiento medido es parcial, en patrimonio el argumento del mercado es flojo de verdad, y desde 2016 el cine español ha recaudado en el mundo más de lo que recibe en ayudas. Lo que aguanta no es «sobra el dinero público», sino que la subvención no elige cultura, elige qué cultura — y traslada esa decisión del público a un comité.",
    },
  },
  {
    id: "ayuda-sin-evaluar",
    name: "Cooperación que no se mide",
    area: "Cooperación",
    strength: "media",
    goal:
      "Que quien nació en el peor sitio posible tenga una oportunidad. Es la intención más difícil de discutir de toda la lista, y quien la defiende no necesita disculparse por ella: hay intervenciones de cooperación con efectos enormes y bien medidos, y han salvado millones de vidas.",
    evidence:
      "Lo que está documentado no es que la cooperación no funcione. Es que, en la mayoría de los casos, no se mide de una forma que permita saberlo. Los exámenes de pares del CAD de la OCDE llevan años señalando lo mismo sobre la cooperación española: el seguimiento y la evaluación quedan por detrás de la planificación y la ejecución.",
    cases: [
      {
        place: "España, exámenes del CAD de la OCDE",
        finding:
          "Los exámenes de pares señalan que la evaluación ocupa un lugar secundario frente a planificar y ejecutar, y recomiendan decidir de forma más estratégica qué se evalúa y cómo se aprende de los resultados.",
        source: "OCDE, exámenes de pares de la cooperación española (2011 y 2022)",
      },
      {
        place: "Cuando sí se mide",
        finding:
          "El giro hacia los ensayos aleatorizados mostró que los efectos varían enormemente entre programas parecidos: algunos con muy buena prensa apenas mueven la aguja y otros son extraordinariamente eficaces. Sin medir no hay forma de distinguirlos, y la intuición no basta.",
        source: "Banerjee, Duflo y Kremer, Premio Nobel de Economía 2019",
      },
      {
        place: "«Mujeres, Café y Clima», Etiopía",
        finding:
          "Circuló que el Gobierno español gastaba más de un millón de euros en café con perspectiva de género. La cifra real: la Unión Europea aportó 1.000.000 € y la AECID 118.000 €, y no salía del plan de igualdad. La crítica viral era engañosa — y, mientras se discutía el titular, nadie preguntó si el proyecto había funcionado.",
        source: "BOE-A-2021-20031 y verificación de Maldita.es, 2022",
      },
    ],
    disputed:
      "Esta es la que más fácil sería exagerar, así que conviene decirlo claro: «no se mide» no es «no funciona». Hay intervenciones con efectos grandes y bien establecidos —tratamientos antiparasitarios, mosquiteras, transferencias directas de dinero— y negarlo sería tan poco riguroso como lo contrario. Evaluar con rigor cuesta dinero y no siempre es proporcionado para una subvención pequeña. Lo que no se sostiene es opinar con seguridad, en cualquiera de las dos direcciones, sobre programas de los que no hay datos.",
    principle:
      "Cuando quien paga no es quien recibe el servicio, se rompe el circuito que en cualquier otra actividad avisa de que algo no va: el cliente que no vuelve. El contribuyente no puede dejar de pagar y el beneficiario no eligió el programa. Sin ese aviso automático, comprobar si el dinero llegó deja de ser una necesidad y pasa a ser una virtud opcional.",
    quiz: {
      question:
        "Sobre los proyectos de cooperación al desarrollo que financia España, ¿qué es lo que mejor describe la situación?",
      options: [
        "Se evalúa su impacto y los resultados se publican",
        "En la mayoría de los casos no se mide de forma que permita saber si funcionaron",
      ],
      correct: 1,
      everyday:
        "En 2022 circuló que el Gobierno se gastaba más de un millón de euros en producir café «con perspectiva de género» en Etiopía. El dato correcto era otro: la Unión Europea puso 1.000.000 € y la AECID 118.000 €. La crítica era engañosa, y la desmintió un verificador.\n\nPero fíjate en lo que no pasó en toda esa discusión. Se habló del titular, de la cifra y de si sonaba ridículo o no. Nadie preguntó lo único que importaba: ¿mejoró la vida de alguien? Ese dato no estaba en el debate porque, sencillamente, no suele estar.",
      lesson:
        "La afirmación honesta no es «la cooperación no sirve» — hay programas con efectos enormes y bien medidos. Es que, sin medir, opinar es gratis en las dos direcciones, y por eso el debate se queda siempre en la anécdota más llamativa.\n\nEl mecanismo es el mismo que en la cultura y explica por qué no es mala fe de nadie: cuando quien paga no es quien recibe el servicio, falta el aviso que en cualquier otra actividad llega solo — el cliente que no vuelve. Sin ese aviso, comprobar si el dinero llegó deja de ser una necesidad y pasa a ser opcional.",
    },
  },
];

export const STRENGTH_LABEL: Record<Measure["strength"], string> = {
  sólida: "Evidencia sólida",
  media: "Evidencia media",
  discutida: "Evidencia discutida",
};
