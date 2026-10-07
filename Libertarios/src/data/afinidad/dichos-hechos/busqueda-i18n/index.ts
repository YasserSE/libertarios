import { DVH_KNOWN_GAPS, dvhSearchLog, type DvhSearchLogTranslation } from "../busqueda";
import { searchLogCa } from "./ca";
import { searchLogEu } from "./eu";
import { searchLogGl } from "./gl";

const BY_LANG: Record<string, DvhSearchLogTranslation> = {
  es: { gaps: DVH_KNOWN_GAPS, log: dvhSearchLog },
  ca: searchLogCa,
  gl: searchLogGl,
  eu: searchLogEu,
};

/**
 * Registro de búsqueda de «Dijeron vs. hicieron» en la lengua de la página;
 * cualquier otra cae al castellano. ca, gl y eu: traducción automática
 * pendiente de revisión humana (`docs/AFINIDAD-CAMBIOS.md`).
 */
export function getDvhSearchLog(locale: string | null | undefined): DvhSearchLogTranslation {
  return BY_LANG[locale ?? "es"] ?? BY_LANG.es;
}
