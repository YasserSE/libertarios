/**
 * Diccionario fuente.
 *
 * Es el único que está completo. Los demás idiomas declaran `DeepPartial` de
 * este tipo, así que TypeScript avisa si alguien inventa una clave que no
 * existe, y lo que no esté traducido cae aquí en tiempo de ejecución.
 */
export const es = {
  nav: {
    maps: "Mapas",
    mapsEurope: "Europa",
    mapsEuropeHint: "Simpatizantes país a país",
    mapsSpain: "España",
    mapsSpainHint: "Detalle por provincia",
    mapsData: "Datos y gráficos",
    mapsDataHint: "Demografía y cuadrante",
    test: "Test ideológico",
    learn: "Aprende",
    learnQuiz: "Suena justo. ¿Y luego qué?",
    learnQuizHint: "Adivina qué provoca cada medida",
    learnWhat: "¿Qué es ser libertario?",
    learnWhatHint: "Ideas base, sin etiquetas",
    learnCompare: "Comparativas",
    learnCompareHint: "Frente a otras corrientes",
    learnMeasures: "Medidas y efectos",
    learnMeasuresHint: "Qué pasa cuando se aplican",
    learnResources: "Recursos",
    learnResourcesHint: "Dónde leer sobre esto",
    project: "El proyecto",
    more: "Más",
    doTest: "Hacer el test",
    register: "Contarme",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Libertarios.eu — inicio",
    language: "Idioma",
  },

  hero: {
    demoBadge: "Cifras de ejemplo · el registro aún no está abierto",
    updatedOn: "Actualizado el",
    line1: "Somos más",
    line2: "de los que",
    line3: "parecemos.",
    subtitleEurope:
      "Ningún país europeo se acerca al Estado mínimo y casi ningún gobierno lo propone. Este mapa cuenta a quienes creen que debería existir esa opción.",
    subtitleSpain:
      "En España no hay un movimiento libertario organizado: hay personas sueltas que no saben cuántas son. Este mapa las cuenta, provincia a provincia.",
    ctaRegister: "Contarme",
    ctaTest: "Hacer el test",
    ctaLearn: "Desafía tus creencias",
    disclaimer:
      "No pertenecemos a ningún partido y no pedimos el voto. Sí queremos que esta posición exista en España: lo decimos y lo sostenemos con los datos.",
    statSupporters: "Simpatizantes",
    statSupportersEurope: "en toda Europa",
    statSupportersSpain: "en España",
    statGrowth: "Últimos 30 días",
    statGrowthHint: "más",
    statGrowthEmpty: "todavía sin registros publicados",
    statCountries: "Países",
    statCountriesHint: "con registros",
    statProvinces: "Provincias",
    statProvincesHint: "de 52 con registros",
    statEconomic: "Eje económico",
    statSocial: "Social",
  },

  map: {
    scopeEurope: "Europa",
    scopeSpain: "España",
    scopeLabel: "Ámbito del mapa",
    viewMap: "Mapa",
    viewTable: "Tabla",
    // «Toca o pasa», no «pasa el cursor»: la mitad de las visitas no tiene
    // cursor. Y el mínimo de cinco se dice aquí, donde se mira el mapa, porque
    // sin él un territorio gris se lee como «nadie» cuando puede haber cuatro.
    hintEurope:
      "Toca o pasa por un país para ver su ficha. España se abre por provincias. Un país con menos de 5 registros no se publica.",
    hintSpain:
      "Toca o pasa por una provincia para ver su ficha, o selecciónala para fijarla. Una provincia con menos de 5 registros no se publica.",
    countryDetailHint: "Toca para ver el detalle por provincia",
    belowMinimum: "Menos de 5 registros: no se publica para que nadie sea identificable.",
    emptyTitle: "Todavía no hay nada que pintar",
    emptyBodySpain:
      "Ninguna provincia llega aún a los 5 registros que hacen falta para publicarla. Las primeras aparecerán en cuanto se alcancen.",
    emptyBodyEurope:
      "Ningún país llega aún a los 5 registros que hacen falta para publicarlo. Los primeros aparecerán en cuanto se alcancen.",
    loading: "Cargando el mapa…",
    loadError: "No hemos podido cargar el mapa. Prueba la vista Tabla.",
    listTitleEurope: "El listado, país a país",
    listTitleSpain: "El listado, provincia a provincia",
    listShow: "Ver el listado",
    listHide: "Ocultar listado",
    listIntroSpain: "provincias con al menos 5 registros. Selecciona cualquiera para resaltarla en el mapa.",
    listIntroEurope: "países con al menos 5 registros. Selecciona cualquiera para resaltarlo en el mapa.",
    listEmpty: "El listado aparecerá cuando algún territorio llegue al mínimo de 5 registros.",
    aggregated: "Cifras agregadas y anónimas, con un mínimo de 5 registros por territorio —",
    rankOf: "Puesto {n} de {total} en Europa",
    meanPosition: "Cuadrante medio",
    countryPage: "Ver ficha del país",
    spainDetail: "Detalle de España",
    supporters: "Simpatizantes",
    perMillion: "Por millón hab.",
    last30: "Últimos 30 días",
    ofNational: "Del total nacional",
    noData: "Menos de 5 (no se publica)",
    clearSelection: "Quitar selección",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    reset: "Restablecer vista",
  },

  common: {
    seeMore: "Ver más",
    methodology: "ver metodología",
    orientative:
      "Posiciones orientativas, no puntuaciones oficiales de esas fuentes. Sirven para dar escala a tu resultado, no para zanjar debates.",
    contested: "Posición discutida.",
    compareWith: "Comparar con",
    economic: "Económico",
    social: "Social",
  },

  /** Aviso que ve quien navega en un idioma parcialmente traducido. */
  partial: {
    notice:
      "Esta sección todavía está en castellano. Estamos traduciendo el sitio por partes.",
  },
};

export type Dictionary = typeof es;
