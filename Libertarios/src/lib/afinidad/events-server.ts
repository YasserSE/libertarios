import "server-only";
import type { EventBatch } from "./event-schema";
import { callRpc } from "./rpc";

/**
 * Escritura de eventos de uso en Supabase (`record_afinidad_events`, 0009).
 *
 * Con la clave anónima, desde el servidor, sin reenviar nada de la petición
 * original (ni IP, ni user agent, ni referer): el lote ya validado es lo único
 * que sale.
 *
 * En desarrollo no se escribe nada salvo con `AFINIDAD_EVENTS_DEV=1`:
 * `.env.local` apunta al proyecto de Supabase de verdad, y los clics de quien
 * desarrolla ensuciarían las cifras del panel.
 */
export function eventsEnabled(): boolean {
  return process.env.NODE_ENV === "production" || process.env.AFINIDAD_EVENTS_DEV === "1";
}

export async function persistEventBatch(batch: EventBatch): Promise<boolean> {
  if (!eventsEnabled()) return false;
  const result = await callRpc(
    "record_afinidad_events",
    {
      p_locale: batch.l,
      p_dataset_version: batch.v,
      p_events: batch.e.map(({ n, p }) => (Object.keys(p).length > 0 ? { e: n, p } : { e: n })),
    },
    { timeoutMs: 3000 },
  );
  return result.ok;
}
