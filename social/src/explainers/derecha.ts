import type { Explainer } from "./types";

/**
 * «¿Se puede ser de derecha sin ser conservador?». Voz de la web.
 *  - El mapa usa las posiciones de Libertarios/src/data/quadrantReferences.ts, que la propia web
 *    llama «orientativas» (por política fiscal ejercida): se dice en pantalla.
 *  - «Ningún partido con escaño»: los partidos con escaño en el Congreso actual son los del conjunto
 *    de datos del test (datos abiertos del Congreso); P-LIB no está entre ellos.
 *  - «0 de 22»: se calcula igual que en Libertarios/src/components/AboutSection.tsx
 *    (partidos europeos con ≥ +50 en los dos ejes).
 */
export const derecha: Explainer = {
  id: "derecha",
  header: "LIBERTARIOS.EU · ¿DERECHA?",
  rail: ["¿SE PUEDE?", "DOS EJES", "MAPA", "NADIE", "QUIÉNES", "¿Y TÚ?"],
  scenes: [
    {
      rail: 0,
      min: 4,
      script: "¿Se puede ser de derecha sin ser conservador? Querer pagar menos impuestos… y que nadie te diga con quién casarte o qué fumar.",
      scene: {
        kind: "headline",
        lines: ["¿De derecha", "sin ser", "conservador?"],
        highlight: 2,
        sub: "Menos impuestos. Y que nadie te diga cómo vivir.",
        subCue: "impuestos",
      },
    },
    {
      rail: 1,
      min: 8,
      script: "Si piensas así, no eres facha ni progre. Es que hay dos preguntas, no una: cuánto decide el Estado sobre tu dinero… y cuánto sobre tu vida. Libre en las dos: eso es ser libertario. Y puede que lo seas sin saberlo.",
      scene: { kind: "axes" },
    },
    {
      rail: 2,
      min: 7,
      script: "Ahora busca en el mapa quién defiende eso en España. Arriba a la derecha… ningún partido con escaño. El único que está ahí, el Partido Libertario, no tiene ni uno.",
      scene: {
        kind: "partyMap",
        title: "Los partidos, en el mapa",
        note: "Posiciones orientativas de libertarios.eu, por política fiscal ejercida",
        emptyCue: "ningún",
        source: "libertarios.eu · método en la web",
      },
    },
    {
      rail: 3,
      min: 5,
      script: "En el Congreso, cero diputados de 350. Y de 22 partidos europeos que hemos analizado, ninguno defiende las dos libertades.",
      scene: {
        kind: "stats",
        title: "Sin representación",
        items: [
          { value: "0 de 350", label: "diputados libertarios en el Congreso", cue: "cero" },
          { value: "0 de 22", label: "partidos europeos con las dos libertades", cue: "europeos" },
        ],
        source: "Congreso (datos abiertos) · libertarios.eu",
      },
    },
    {
      rail: 4,
      min: 5,
      script: "En libertarios.eu no somos un partido ni te pedimos el voto. Solo queremos que estas ideas se vean, con datos.",
      scene: { kind: "who" },
    },
    {
      rail: 5,
      min: 3.5,
      script: "¿De derecha sin ser conservador? Se puede… pero hoy nadie te representa. ¿Conoces a alguien así? Mándaselo. Y más vídeos, en el perfil.",
      scene: { kind: "ending", title: ["¿Conoces a", "alguien", "así?"], cta: [], body: "Más vídeos en el perfil.", shareTo: "Ese amigo «de derechas» que no es conservador" },
    },
  ],
};
