/**
 * Reel de presentación de libertarios.eu. Aquí habla la web con su propia voz
 * (a diferencia de los Reels de partidos, que son neutrales): no es un
 * partido, no pide el voto y quiere dar visibilidad a las ideas libertarias.
 * Las afirmaciones sobre la web salen de Libertarios/src/i18n/dictionaries/es.ts
 * («No pertenecemos a ningún partido y no pedimos el voto…»). El cuadrante
 * es el de la web (Libertarios/src/components/InteractiveQuadrant.tsx): economía
 * en horizontal (intervención → libre mercado), sociedad en vertical (control →
 * libertad) y las mismas cuatro etiquetas.
 */
export type IntroScreen = "hook" | "axes" | "quadrant" | "who" | "inside" | "ending";

export const INTRO_RAIL = ["IZQ/DER", "DOS EJES", "MAPA", "QUIÉNES", "QUÉ HAY", "¿Y TÚ?"];

export const INTRO: { screen: IntroScreen; rail: number; script: string; min: number }[] = [
  { screen: "hook", rail: 0, min: 3, script: "¿Eres de izquierdas o de derechas? Mala pregunta." },
  {
    screen: "axes",
    rail: 1,
    min: 4,
    script: "Una sola línea no te describe. En política hay dos preguntas: cuánto decide el Estado sobre tu dinero, y cuánto sobre tu vida.",
  },
  {
    screen: "quadrant",
    rail: 2,
    min: 6,
    script:
      "Con esas dos preguntas salen cuatro esquinas. Libre en tu vida, pero no en tu dinero: liberal social. Libre en tu dinero, pero no en tu vida: autoritario de derecha. El Estado decide en las dos: autoritario de izquierda. Y libre en las dos: libertario.",
  },
  {
    screen: "who",
    rail: 3,
    min: 4,
    script: "Libertarios punto eu no es un partido. No pide el voto ni apoya a nadie. Solo quiere que estas ideas se vean y se debatan, con datos.",
  },
  {
    screen: "inside",
    rail: 4,
    min: 4,
    script: "Dentro tienes un test para saber dónde estás, medidas explicadas con sus datos, y un test neutral para comparar tus ideas con los partidos.",
  },
  { screen: "ending", rail: 5, min: 4.5, script: "¿Y tú, dónde estás? Haz el test en libertarios punto eu. Tienes el enlace en la bio." },
];
