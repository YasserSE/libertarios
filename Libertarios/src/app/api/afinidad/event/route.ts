import { parseEventBatch } from "@/lib/afinidad/event-schema";
import { MAX_EVENT_BODY_BYTES } from "@/lib/afinidad/events";
import { persistEventBatch } from "@/lib/afinidad/events-server";
import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";

/**
 * POST /api/afinidad/event — recibe los lotes de `track()`.
 *
 * Barreras, en orden de lo más barato a lo más caro:
 *   1. Solo mismo origen (`Origin` / `Sec-Fetch-Site`): otra web no puede usar
 *      los navegadores de sus visitas para inflar los contadores.
 *   2. 30 envíos por minuto y cliente (en memoria, ver `rate-limit.ts`).
 *   3. Cuerpo ≤ 4 KB, JSON, y esquema zod: nombres de la lista blanca,
 *      propiedades limpiadas, ≤ 20 eventos.
 *   4. En la base, `record_afinidad_events` valida otra vez y aplica un techo
 *      global por minuto.
 *
 * Responde 204 sin cuerpo cuando acepta (se haya guardado o no: quien envía no
 * tiene nada que hacer con esa información) y un código de error si no.
 */

const limiter = createRateLimiter({ limit: 30 });

const NO_STORE = { "Cache-Control": "no-store" };
const reply = (status: number) => new Response(null, { status, headers: NO_STORE });

function isSameOrigin(request: Request): boolean {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true; // navegadores antiguos o `sendBeacon` sin Origin
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) return reply(403);
  if (!limiter.take(clientKey(request.headers))) return reply(429);

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_EVENT_BODY_BYTES) return reply(413);

  let text: string;
  try {
    text = await request.text();
  } catch {
    return reply(400);
  }
  if (new TextEncoder().encode(text).length > MAX_EVENT_BODY_BYTES) return reply(413);

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return reply(400);
  }
  const batch = parseEventBatch(json);
  if (!batch) return reply(400);

  await persistEventBatch(batch);
  return reply(204);
}
