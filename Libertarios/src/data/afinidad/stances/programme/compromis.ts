import type { Stance } from "../../types";
import { stances as sumar } from "./sumar";

/**
 * Celdas de PROGRAMA de Compromís. WP3.
 *
 * En las generales del 23-J-2023 Compromís concurrió en la coalición
 * Compromís-Sumar con el programa común de SUMAR («Un programa para ti»). No
 * se ha localizado un programa propio de Compromís para esas generales: lo
 * publicado en 28m.compromis.net es el programa de las autonómicas
 * valencianas del 28-M-2023, que no es válido aquí (solo programas de
 * generales, `docs/AFINIDAD-DATOS.md` §2), y en las europeas de 2024 también
 * fue dentro de Sumar. Se buscó en compromis.net, sus subdominios y Wayback.
 *
 * Por eso cada celda es la de `sumar.ts` (misma cita, página y posición) con
 * la nota de origen. Cuando Compromís publique programa propio para el 29-N,
 * este fichero se sustituye por celdas propias.
 */

const ORIGEN =
  "Compromís concurrió en la coalición Compromís-Sumar en 2023 con el programa de SUMAR; no consta programa propio para las generales.";

export const stances: Stance[] = sumar.map((s) => ({
  ...s,
  partyId: "compromis",
  programme: s.programme && {
    ...s.programme,
    note: s.programme.note ? `${ORIGEN} ${s.programme.note}` : ORIGEN,
  },
}));
