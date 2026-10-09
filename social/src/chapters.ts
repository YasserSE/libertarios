/**
 * Capítulos del Reel. Son los mismos para todos los partidos (neutralidad):
 * cada uno apunta a una pregunta del test y explica en lenguaje llano qué se
 * votó en cada ancla. `voteLabel` va indexado por la URL del JSON de la
 * votación en congreso.es, y debe describir el título oficial sin
 * interpretarlo.
 */
export type Chapter = {
  key: "sueldo" | "casa" | "trabajo" | "pais";
  rail: string;
  title: string;
  questionId: string;
  voteLabel: Record<string, string>;
};

export const CHAPTERS: Chapter[] = [
  {
    key: "sueldo",
    rail: "SUELDO",
    title: "Tu sueldo",
    questionId: "irpf-inflacion",
    voteLabel: {
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json":
        "Deflactar el IRPF ajustándolo a la inflación",
    },
  },
  {
    key: "casa",
    rail: "CASA",
    title: "Tu casa",
    questionId: "vivienda-tope-alquiler",
    voteLabel: {
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json":
        "La Ley de vivienda, que permite topar el alquiler en zonas tensionadas",
    },
  },
  {
    key: "trabajo",
    rail: "TRABAJO",
    title: "Tu trabajo",
    questionId: "jornada-37-5",
    voteLabel: {
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json":
        "Devolver al Gobierno la ley de la jornada de 37,5 horas",
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json":
        "Reducir la jornada máxima legal (proposición no de ley)",
    },
  },
  {
    key: "pais",
    rail: "PAÍS",
    title: "Tu país",
    questionId: "inmigracion-competencias-cataluna",
    voteLabel: {
      "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion133/20250923/Votacion001/VOT_20250923211048.json":
        "La ley para delegar en Cataluña competencias de inmigración",
    },
  },
];
