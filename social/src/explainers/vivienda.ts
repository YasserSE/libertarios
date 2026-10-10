import type { Explainer } from "./types";

/**
 * «Vivienda: el problema real». Voz de la web (libertaria), con contrapunto.
 * Fuentes verificadas el 10-10-2026 contra los PDF originales:
 *  - BdE, Informe Anual 2025 (cap. 2): 240.000 hogares y 92.000 viviendas terminadas en 2025;
 *    déficit 2021-2025 de unas 750.000, un 52,5 % en seis provincias; 7,1 años de renta (jóvenes,
 *    esfuerzo potencial); «escasez de suelo edificable, lentitud en la ejecución y limitaciones de
 *    gestión de la planificación urbanística»; densificar: entre 1 y 1,2 millones en las seis grandes
 *    áreas; más de 3,8 millones de viviendas vacías (INE), 400.000 en municipios de más de 250.000 hab.
 *  - INE, IPV 4T 2025: +12,9 % anual.
 *  - BdE, Documento Ocasional 2432 (2024): más del 90 % de la vivienda habitual en alquiler a precio de
 *    mercado es de personas físicas; 8,1 % de sociedades (datos de 2021). Alemania 34 %, Francia 23 % (CBRE).
 *  - Topes al alquiler: San Francisco (Diamond, McQuade y Qian, AER 2019) y Estocolmo (Bostadsförmedlingen),
 *    recogidos en Libertarios/src/data/measures.ts. Buenos Aires:
 *    Zonaprop, oferta de pisos en alquiler en CABA +62 % en enero de 2024 frente a diciembre, tras derogar
 *    la ley de alquileres (citado por La Nación, 7-8-2026). Son anuncios publicados, no contratos.
 */
export const vivienda: Explainer = {
  id: "vivienda",
  header: "LIBERTARIOS.EU · VIVIENDA",
  rail: ["¿POR QUÉ?", "CASEROS", "FALTAN", "DÓNDE", "SALIDA", "¿Y TÚ?"],
  scenes: [
    {
      rail: 0,
      min: 4,
      script: "¿Por qué no hay forma de encontrar casa? ¿Los caseros? ¿Faltan casas? ¿O están donde no toca? Veámoslo.",
      scene: {
        kind: "questions",
        title: "¿Por qué no hay casa?",
        items: [
          { text: "¿Los caseros?", cue: "caseros" },
          { text: "¿Faltan casas?", cue: "faltan" },
          { text: "¿Dónde están?", cue: "están" },
        ],
        stamp: { text: "Veámoslo", cue: "veámoslo" },
      },
    },
    {
      rail: 1,
      min: 5,
      script: "Seguro que piensas que tu casero es un fondo. Pues no: nueve de cada diez pisos en alquiler son de particulares. Las empresas, solo un 8 %.",
      scene: {
        kind: "donut",
        title: "Tu casero no es un fondo",
        slices: [
          { label: "Particulares", value: 90, display: "+90 %", color: "teal", cue: "particulares" },
          { label: "Empresas", value: 8.1, display: "8 %", color: "ink", cue: "empresas" },
        ],
        note: "En Alemania, las empresas tienen el 34 %; en Francia, el 23 %.",
        source: "BdE · Documento Ocasional 2432 · datos de 2021",
      },
    },
    {
      rail: 1,
      min: 6,
      script: "Por eso topar el alquiler castiga al pequeño casero. Y ya se ha probado: en San Francisco se retiraron un 15 % de los pisos. En Estocolmo, nueve años de cola. Y en Buenos Aires, al quitar la ley, la oferta subió un 62 % en un mes.",
      scene: {
        kind: "stats",
        title: "Ya se ha probado",
        items: [
          { value: "−15 %", label: "San Francisco: pisos retirados del alquiler", cue: "francisco" },
          { value: "9 años", label: "Estocolmo: cola para un piso regulado", cue: "estocolmo" },
          { value: "+62 %", label: "Buenos Aires: pisos en alquiler al quitar la ley (1 mes)", cue: "buenos" },
        ],
        source: "AER 2019 · Bostadsförmedlingen · Zonaprop (anuncios)",
      },
    },
    {
      rail: 2,
      min: 4,
      script: "¿Faltan casas? En 2025 se formaron 240.000 hogares y solo se terminaron 92.000 casas.",
      scene: {
        kind: "vs",
        title: "2025",
        left: { value: "240.000", label: "hogares nuevos", n: 240 },
        right: { value: "92.000", label: "viviendas terminadas", n: 92, cue: "terminaron" },
        source: "Banco de España · Informe Anual 2025",
      },
    },
    {
      rail: 2,
      min: 4,
      script: "Desde 2021 faltan 750.000. Y un joven necesita siete años de sueldo, sin gastar nada, para comprar.",
      scene: {
        kind: "stats",
        title: "Faltan casas",
        items: [
          { value: "750.000", label: "viviendas de déficit desde 2021", cue: "750.000" },
          { value: "7,1 años", label: "de renta íntegra para que un joven compre", cue: "joven" },
        ],
        source: "Banco de España · Informe Anual 2025",
      },
    },
    {
      rail: 3,
      min: 6,
      script: "¿Y la ubicación? Hay 3,8 millones de casas vacías, pero solo una de cada diez en una gran ciudad. Y más de la mitad de las que faltan, en seis provincias.",
      scene: {
        kind: "provinces",
        title: "¿Dónde faltan?",
        value: "52,5 %",
        label: "del déficit, en seis provincias",
        items: ["Madrid", "Barcelona", "València", "Alicante", "Murcia", "Málaga"],
        cue: "seis",
        extra: { value: "1 de 10", label: "de las 3,8 millones de vacías está en una ciudad de más de 250.000 habitantes", cue: "vacías" },
        source: "BdE · Informe Anual 2025 · INE",
      },
    },
    {
      rail: 4,
      min: 5,
      script: "No es el casero: es que no se construye. Más suelo, permisos rápidos y construir más alto: donde ya se urbaniza, cabrían 1,2 millones de casas más.",
      scene: {
        kind: "stats",
        title: "La salida liberal",
        items: [
          { value: "Más suelo", label: "y permisos rápidos", cue: "suelo" },
          { value: "Más alto", label: "dejar construir más alto", cue: "alto" },
          { value: "1,2 M", label: "viviendas más, densificando suelo en desarrollo", cue: "cabrían" },
        ],
        source: "Banco de España · Informe Anual 2025",
      },
    },
    {
      rail: 5,
      min: 3.5,
      script: "Ahora ya sabes: no es el casero, es que no se construye. ¿Conoces a alguien buscando piso? Mándaselo. Y más vídeos así, en el perfil.",
      scene: { kind: "ending", title: ["¿Alguien", "buscando", "piso?"], cta: [], body: "Más vídeos con datos en el perfil.", shareTo: "Alguien que busca piso" },
    },
  ],
};
