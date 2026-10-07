import { siteLocaleFor } from "@/i18n/config";
import type { ResultStrings } from "@/i18n/afinidad/result";
import type { ExploreDestination } from "./events";

/**
 * Destinos de «Sigue explorando»: los otros tests de Libertarios.eu (plan,
 * actualización §7: el test y el sitio se enlazan en los dos sentidos).
 *
 * Tres, elegidos porque son los otros «tests» del sitio y no sus páginas de
 * opinión: el cuadrante (posición en dos ejes), «Desafía tus creencias»
 * (`/aprende`, el quiz de medidas) y «Medidas y efectos» (`/medidas`). De las
 * dos páginas de comparación se elige `/medidas` y no `/comparativas`: quien
 * acaba de contestar sobre medidas concretas encuentra ahí medidas concretas
 * con su evidencia, mientras que `/comparativas` compara corrientes
 * ideológicas, que es otro nivel.
 *
 * Fuera del componente (sin React) para que pueda usarse desde cualquier sitio
 * y para que el fichero del componente solo exporte componentes.
 */
export interface ExploreItem {
  id: ExploreDestination;
  path: string;
  title: (t: ResultStrings) => string;
  body: (t: ResultStrings) => string;
  short: (t: ResultStrings) => string;
}

export const EXPLORE_ITEMS: readonly ExploreItem[] = [
  {
    id: "cuadrante",
    path: "/cuadrante",
    title: (t) => t.exploreQuadrantTitle,
    body: (t) => t.exploreQuadrantBody,
    short: (t) => t.exploreQuadrantShort,
  },
  {
    id: "aprende",
    path: "/aprende",
    title: (t) => t.exploreLearnTitle,
    body: (t) => t.exploreLearnBody,
    short: (t) => t.exploreLearnShort,
  },
  {
    id: "medidas",
    path: "/medidas",
    title: (t) => t.exploreMeasuresTitle,
    body: (t) => t.exploreMeasuresBody,
    short: (t) => t.exploreMeasuresShort,
  },
];

/**
 * Ruta absoluta de un destino del sitio para el idioma del módulo.
 *
 * El sitio no existe en gallego ni en euskera: desde `gl`/`eu` se enlaza a la
 * versión castellana en vez de a `/gl/cuadrante`, que sería castellano con la
 * etiqueta de otro idioma (y `noindex`).
 */
export function exploreHref(path: string, lang: string): string {
  return `/${siteLocaleFor(lang)}${path}`;
}

/** ¿El destino se va a leer en otro idioma que el del módulo? (gl/eu → es) */
export function exploreFallsBack(lang: string): boolean {
  return siteLocaleFor(lang) !== lang;
}
