/**
 * Idiomas del módulo «¿A quién votar?» y caída al castellano.
 *
 * El castellano es obligatorio en toda tabla de textos (el tipo lo exige) y es
 * a donde cae cualquier idioma sin traducción: mejor un texto en castellano que
 * un hueco o el nombre de una clave. Mismo criterio que `getDictionary`.
 */
import type { Lang } from "@/data/afinidad/types";

/** Igual que `Lang` del dataset; alias para que los textos no dependan de él. */
export type AfinidadLang = Lang;

const LANGS: readonly AfinidadLang[] = ["es", "ca", "gl", "eu"];

export const isAfinidadLang = (value: unknown): value is AfinidadLang =>
  typeof value === "string" && (LANGS as readonly string[]).includes(value);

/**
 * El valor del idioma pedido, o el castellano si falta. `lang` admite
 * cualquier cadena (p. ej. el `locale` de la ruta, que puede ser `pt`): lo que
 * no sea una de las cuatro lenguas cae a `es`.
 */
export function pick<T>(table: Partial<Record<AfinidadLang, T>> & { es: T }, lang: string): T {
  if (isAfinidadLang(lang)) {
    const value = table[lang];
    if (value !== undefined) return value;
  }
  return table.es;
}
