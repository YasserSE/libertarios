/**
 * Idiomas del sitio.
 *
 * El castellano es la fuente: los diccionarios de los demás idiomas son
 * parciales a propósito y lo que falte cae a `es`. Eso permite traducir por
 * partes sin que ninguna pantalla se quede vacía, y añadir un idioma nuevo es
 * añadir una entrada aquí y un fichero en `dictionaries/`.
 */

export const LOCALES = ["es", "ca", "pt", "fr", "it", "de", "gl", "eu"] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Idiomas en los que existe el sitio libertario (portada, mapa, cuadrante…).
 *
 * `gl` y `eu` se añadieron para «¿A quién votar?» (`/a-quien-votar`), que debe
 * estar completo en las cuatro lenguas oficiales. El resto del sitio no está
 * traducido a ellas y cae al castellano. Por eso esta lista, y no `LOCALES`, es
 * la que alimenta el selector de la cabecera, los `hreflang` del sitio y la
 * detección automática: ofrecer «Galego» para acabar leyendo castellano
 * prometería algo que no hay, y anunciar a los buscadores una versión gallega
 * que es la castellana duplicada es contenido duplicado con etiqueta falsa.
 */
export const SITE_LOCALES = ["es", "ca", "pt", "fr", "it", "de"] as const satisfies readonly Locale[];

/**
 * Idiomas del módulo «¿A quién votar?»: las cuatro lenguas oficiales. Es lo
 * que debe ofrecer su propio selector y sus `hreflang`. El portugués, el
 * francés, etc. no se ofrecen allí porque el cuestionario no existe en ellos.
 */
export const AFINIDAD_LOCALES = ["es", "ca", "gl", "eu"] as const satisfies readonly Locale[];

/** Primer segmento (tras el idioma) de las rutas del módulo de afinidad. */
export const AFINIDAD_SEGMENT = "a-quien-votar";

/** Cookie con la elección explícita de idioma (la escribe el selector). */
export const LOCALE_COOKIE = "libertarios-locale";

export const DEFAULT_LOCALE: Locale = "es";

export interface LocaleMeta {
  code: Locale;
  /** Nombre en su propio idioma, que es como se pone en un selector. */
  label: string;
  /** Etiqueta corta para el conmutador. */
  short: string;
  flag: string;
  /** Código BCP-47 para `lang` y `hreflang`. */
  htmlLang: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  es: { code: "es", label: "Español", short: "ES", flag: "🇪🇸", htmlLang: "es-ES" },
  ca: { code: "ca", label: "Català", short: "CA", flag: "🏴󠁥󠁳󠁣󠁴󠁿", htmlLang: "ca-ES" },
  pt: { code: "pt", label: "Português", short: "PT", flag: "🇵🇹", htmlLang: "pt-PT" },
  fr: { code: "fr", label: "Français", short: "FR", flag: "🇫🇷", htmlLang: "fr-FR" },
  it: { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹", htmlLang: "it-IT" },
  de: { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪", htmlLang: "de-DE" },
  // Galicia y Euskadi no tienen bandera en Unicode (solo existen las
  // secuencias de etiqueta de Escocia, Inglaterra y Gales): se deja vacío en
  // vez de poner una que no es.
  gl: { code: "gl", label: "Galego", short: "GL", flag: "", htmlLang: "gl-ES" },
  eu: { code: "eu", label: "Euskara", short: "EU", flag: "", htmlLang: "eu-ES" },
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/**
 * Idioma preferido a partir de la cabecera `Accept-Language`.
 *
 * Se compara solo la parte primaria (`pt-BR` → `pt`): a alguien con el
 * navegador en portugués de Brasil le sirve el portugués, y no tener esa
 * tolerancia significaría mandarlo al castellano por un sufijo.
 */
export function matchLocale(
  acceptLanguage: string | null,
  /**
   * Idiomas entre los que elegir. Por defecto los del sitio: a quien tiene el
   * navegador en gallego y entra en `/spain` no se le manda a `/gl/spain`,
   * que sería castellano con `lang="gl"`. Dentro de `/a-quien-votar` se pasa
   * `AFINIDAD_LOCALES`.
   */
  candidates: readonly Locale[] = SITE_LOCALES,
): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((x) => x.tag && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const primary = tag.split("-")[0];
    if (isLocale(primary) && candidates.includes(primary)) return primary;
  }
  return DEFAULT_LOCALE;
}

/** ¿La ruta (con o sin prefijo de idioma) pertenece a «¿A quién votar?»? */
export function isAfinidadPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] && isLocale(segments[0]) ? segments[1] : segments[0];
  return first === AFINIDAD_SEGMENT;
}

/** Sustituye el segmento de idioma de una ruta, conservando el resto. */
export function localisePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}

/**
 * Idioma del sitio al que enlazar desde «¿A quién votar?».
 *
 * El módulo existe en gallego y euskera, el resto del sitio no: un enlace desde
 * `/gl/a-quien-votar` a `/gl/cuadrante` abriría la página en castellano con
 * `lang="gl"` (y `noindex`). Se manda directamente a la versión castellana, que
 * es lo que la persona va a leer de todos modos.
 */
export function siteLocaleFor(locale: string): (typeof SITE_LOCALES)[number] {
  return (SITE_LOCALES as readonly string[]).includes(locale)
    ? (locale as (typeof SITE_LOCALES)[number])
    : DEFAULT_LOCALE as (typeof SITE_LOCALES)[number];
}

/**
 * Idioma de «¿A quién votar?» al que enlazar desde el sitio.
 *
 * Simétrico de `siteLocaleFor`: el cuestionario no existe en portugués,
 * francés, italiano ni alemán, así que desde `/pt/...` se enlaza a
 * `/es/a-quien-votar` en vez de a una página castellana etiquetada como
 * portuguesa.
 */
export function afinidadLocaleFor(locale: string): (typeof AFINIDAD_LOCALES)[number] {
  return (AFINIDAD_LOCALES as readonly string[]).includes(locale)
    ? (locale as (typeof AFINIDAD_LOCALES)[number])
    : DEFAULT_LOCALE as (typeof AFINIDAD_LOCALES)[number];
}

/** Ruta absoluta (con idioma) a la portada de «¿A quién votar?». */
export function afinidadHref(locale: string): string {
  return `/${afinidadLocaleFor(locale)}/${AFINIDAD_SEGMENT}`;
}
