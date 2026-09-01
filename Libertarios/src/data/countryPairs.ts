/**
 * Parejas de referentes opuestos, una por cada idioma que habla el sitio.
 *
 * La idea es que en cada lengua haya dos economistas **del mismo país** que
 * defienden lo contrario. Sirve para dos cosas a la vez: aterriza el cuadrante
 * en nombres que el lector reconoce, y deja claro que el eje no es un invento
 * de este proyecto — es una discusión que en cada país ya tiene sus dos bandos.
 *
 * Los ids apuntan a `quadrantReferences`, así que las coordenadas y las notas no
 * se repiten aquí: si cambia una posición, cambia en los dos sitios.
 */

export interface CountryPair {
  /** Código de idioma al que corresponde. */
  locale: string;
  country: string;
  flag: string;
  /** Qué separa a los dos, en una frase. */
  tension: string;
  /** Id en `quadrantReferences` del lado liberal. */
  liberal: string;
  /** Id del lado intervencionista. */
  statist: string;
}

export const COUNTRY_PAIRS: CountryPair[] = [
  {
    locale: "es",
    country: "España",
    flag: "🇪🇸",
    tension:
      "Los dos son economistas españoles en activo y discrepan en casi todo: dónde poner el límite del gasto público y si el mercado de la vivienda se arregla construyendo o regulando.",
    liberal: "rallo",
    statist: "torres-lopez",
  },
  {
    locale: "fr",
    country: "Francia",
    flag: "🇫🇷",
    tension:
      "Siglo y medio los separa, pero encarnan la discusión francesa: Bastiat, que lo que no se ve importa más que lo que se ve; Piketty, que el capital se concentra solo si nadie lo impide.",
    liberal: "bastiat",
    statist: "piketty",
  },
  {
    locale: "de",
    country: "Alemania",
    flag: "🇩🇪",
    tension:
      "Erhard liberalizó los precios en 1948 contra el criterio de los aliados y desató el milagro alemán. Marx, un siglo antes y en el mismo idioma, había concluido lo contrario sobre la propiedad.",
    liberal: "erhard",
    statist: "marx",
  },
  {
    locale: "it",
    country: "Italia",
    flag: "🇮🇹",
    tension:
      "Einaudi estabilizó la lira y llegó a presidente de la República. Gramsci, desde la cárcel, escribió por qué eso no bastaba para cambiar quién manda.",
    liberal: "einaudi",
    statist: "gramsci",
  },
  {
    locale: "pt",
    country: "Portugal",
    flag: "🇵🇹",
    tension:
      "Los dos economistas que fundaron partidos opuestos: Guimarães Pinto llevó el liberalismo al parlamento con Iniciativa Liberal; Louçã hizo lo propio por la izquierda con el Bloco.",
    liberal: "guimaraes-pinto",
    statist: "louca",
  },
  {
    locale: "ca",
    country: "Cataluña",
    flag: "🏴󠁥󠁳󠁣󠁴󠁿",
    tension:
      "Dos catedráticos catalanes con diagnósticos incompatibles del mismo país: Sala-i-Martín mira al crecimiento y a los incentivos; Navarro, al tamaño y la cobertura del Estado del bienestar.",
    liberal: "sala-i-martin",
    statist: "navarro",
  },
];
