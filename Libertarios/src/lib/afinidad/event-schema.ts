import { z } from "zod";
import {
  AFINIDAD_EVENTS,
  DATASET_VERSION_RE,
  EVENT_LOCALES,
  MAX_EVENTS_PER_BATCH,
  sanitizeEventProps,
  type AfinidadEvent,
  type EventProps,
} from "./events";

/**
 * Validación en el servidor del lote que manda `track()`:
 *
 *   { v: "2026.10.0", l: "es", e: [{ n: "afinidad_share_x", p: { anon: true } }, …] }
 *
 * Nombre de evento y forma del lote se validan estrictos (lo que no encaja se
 * rechaza entero); las propiedades se LIMPIAN en vez de rechazar, con la misma
 * función que el navegador, para que un cliente antiguo con una propiedad de
 * más no pierda el evento entero. Lo que llega a la base ya está limpio.
 */
export const eventBatchSchema = z
  .object({
    v: z.string().regex(DATASET_VERSION_RE),
    l: z.enum(EVENT_LOCALES),
    e: z
      .array(
        z
          .object({ n: z.enum(AFINIDAD_EVENTS), p: z.unknown().optional() })
          .strict()
          .transform(({ n, p }) => ({ n, p: sanitizeEventProps(n, p) })),
      )
      .min(1)
      .max(MAX_EVENTS_PER_BATCH),
  })
  .strict();

export interface EventBatch {
  v: string;
  l: (typeof EVENT_LOCALES)[number];
  e: { n: AfinidadEvent; p: EventProps }[];
}

export function parseEventBatch(input: unknown): EventBatch | null {
  const parsed = eventBatchSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}
