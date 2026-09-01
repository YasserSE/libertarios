import { DEFAULT_LOCALE, type Locale } from "./config";
import { es, type Dictionary } from "./dictionaries/es";
import { ca } from "./dictionaries/ca";
import { pt } from "./dictionaries/pt";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import { de } from "./dictionaries/de";
import type { DeepPartial } from "./types";

const PARTIALS: Record<Locale, DeepPartial<Dictionary>> = { es, ca, pt, fr, it, de };

/**
 * Mezcla el diccionario del idioma sobre el castellano.
 *
 * Lo que falte cae a `es` en lugar de renderizar una clave vacía o el nombre de
 * la propia clave. Traducir el sitio por partes es la única forma realista de
 * hacerlo bien en seis idiomas, y esto permite publicar cada parte según se
 * termina sin dejar huecos por el camino.
 */
function merge<T>(base: T, override: DeepPartial<T>): T {
  if (!override) return base;
  const result = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const current = result[key];
    result[key] =
      value && typeof value === "object" && !Array.isArray(value) &&
      current && typeof current === "object" && !Array.isArray(current)
        ? merge(current, value as DeepPartial<typeof current>)
        : value;
  }
  return result as T;
}

const CACHE = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const cached = CACHE.get(locale);
  if (cached) return cached;
  const dict = locale === DEFAULT_LOCALE ? es : merge(es, PARTIALS[locale] ?? {});
  CACHE.set(locale, dict);
  return dict;
}

export type { Dictionary };
