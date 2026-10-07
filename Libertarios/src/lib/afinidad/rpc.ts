import "server-only";

/**
 * Llamada a una función RPC de Supabase con la clave ANÓNIMA, desde el
 * servidor. Todo el módulo «¿A quién votar?» habla con la base así:
 *
 * - La petición sale de Vercel: Supabase ve la IP del servidor, nunca la de la
 *   persona. No se reenvía ninguna cabecera de la petición original.
 * - Nunca la clave de servicio: todas las funciones públicas son SECURITY
 *   DEFINER concedidas a `anon` y validan su entrada; la de administración
 *   exige además una sesión (`afinidad_admin_stats`).
 * - Nunca lanza: devuelve `{ ok: false }` y deja el detalle en el log, que no
 *   incluye los parámetros (podrían ser un token).
 */

/** Config leída al invocar, no al importar, para no romper el build sin variables. */
export function readSupabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export type RpcResult = { ok: true; data: unknown } | { ok: false };

/** Tiempo máximo por defecto: nada de esto debe frenar una página. */
const DEFAULT_TIMEOUT_MS = 4000;

export async function callRpc(
  name: string,
  body: Record<string, unknown>,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<RpcResult> {
  const config = readSupabaseConfig();
  if (!config) return { ok: false };
  try {
    const response = await fetch(`${config.url}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      // El cuerpo de error de PostgREST no repite los parámetros.
      console.error(`${name} failed`, response.status, await response.text().catch(() => ""));
      return { ok: false };
    }
    // Las funciones `void` responden 204 sin cuerpo.
    const text = await response.text();
    return { ok: true, data: text ? JSON.parse(text) : null };
  } catch (error) {
    console.error(`${name} failed`, error instanceof Error ? error.name : "error");
    return { ok: false };
  }
}
