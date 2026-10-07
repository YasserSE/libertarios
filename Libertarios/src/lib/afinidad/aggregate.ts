import "server-only";
import type { AfinidadResponseRow } from "./aggregate-rules";
import { callRpc, readSupabaseConfig } from "./rpc";

/**
 * Escritura en Supabase de las respuestas anónimas. (La lista de avisos,
 * `afinidad_notify`, ya no se escribe desde 0011: ver `src/lib/newsletter/`.)
 *
 * Mismo patrón que `src/lib/registration/register.ts`, y por las mismas razones:
 *
 * 1. **Corre en el servidor.** La petición a Supabase sale de Vercel, no del
 *    navegador: Supabase ve la IP del servidor, nunca la de la persona. Es
 *    parte de la promesa «sin IP», no solo una columna que no existe.
 * 2. **Clave anónima, nunca la de servicio.** `record_afinidad_response` es
 *    SECURITY DEFINER y está concedida a `anon`;
 *    con eso basta. Una clave de servicio aquí podría leer la lista de correos.
 * 3. **No se reenvía nada de la petición**: ni cabeceras, ni user agent, ni
 *    referer. El cuerpo es solo lo que valida `aggregate-rules.ts`.
 *
 * La lectura de agregados (`afinidad_aggregates`) no está aquí a propósito: es
 * interna, no se concede a `anon`, y cualquier código futuro que publique
 * cifras debe pasar antes por `isPublicationEmbargoed()`.
 */

export { isPublicationEmbargoed, K_ANONYMITY } from "./aggregate-rules";

export function isAggregateConfigured(): boolean {
  return readSupabaseConfig() !== null;
}

async function rpc(name: string, body: Record<string, unknown>): Promise<boolean> {
  return (await callRpc(name, body)).ok;
}

/** Guarda una respuesta anónima ya validada. Nunca lanza. */
export function persistAfinidadResponse(row: AfinidadResponseRow): Promise<boolean> {
  return rpc("record_afinidad_response", {
    p_dataset_version: row.datasetVersion,
    p_answers: row.answers,
    p_important: row.important,
    p_region: row.region,
    p_usual_vote: row.usualVote,
  });
}
