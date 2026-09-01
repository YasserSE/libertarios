/**
 * Idiomas del sitio.
 *
 * El castellano es la fuente: los diccionarios de los demás idiomas son
 * parciales a propósito y lo que falte cae a `es`. Eso permite traducir por
 * partes sin que ninguna pantalla se quede vacía, y añadir un idioma nuevo es
 * añadir una entrada aquí y un fichero en `dictionaries/`.
 */

export const LOCALES = ["es", "ca", "pt", "fr", "it", "de"] as const;
export type Locale = (typeof LOCALES)[number];

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
export function matchLocale(acceptLanguage: string | null): Locale {
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
    if (isLocale(primary)) return primary;
  }
  return DEFAULT_LOCALE;
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
