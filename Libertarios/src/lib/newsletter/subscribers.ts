import "server-only";
import { callRpc, readSupabaseConfig } from "@/lib/afinidad/rpc";
import { NEWSLETTER_CONSENT_VERSION, type NewsletterInput } from "./schema";

/**
 * Escritura del boletín en Supabase, con la clave ANÓNIMA desde el servidor
 * (mismo patrón que `src/lib/afinidad/aggregate.ts`).
 *
 * Las tres funciones exigen además `NEWSLETTER_SERVER_KEY`: la de alta
 * devuelve el token de confirmación, y si bastara la clave anónima (que es
 * pública) cualquiera podría pedir el token de una dirección ajena y
 * confirmarla. Ver `0011_newsletter.sql`.
 *
 * Lo que sale hacia la base es solo correo, casilla, origen, idioma y versión
 * del texto. Nada del test.
 */

let warned = false;

function serverKey(): string | null {
  const key = process.env.NEWSLETTER_SERVER_KEY?.trim();
  if (!key) {
    if (!warned) {
      warned = true;
      console.warn("[newsletter] NEWSLETTER_SERVER_KEY no configurada: el boletín no puede guardar altas.");
    }
    return null;
  }
  return key;
}

export function isNewsletterConfigured(): boolean {
  return readSupabaseConfig() !== null && !!process.env.NEWSLETTER_SERVER_KEY?.trim();
}

export type SubscribeOutcome =
  | { ok: true; send: { confirmToken: string; unsubscribeToken: string } | null }
  | { ok: false };

/** Alta. `send` trae los tokens solo cuando hay que enviar un correo de confirmación. */
export async function subscribe(data: NewsletterInput): Promise<SubscribeOutcome> {
  const key = serverKey();
  if (!key) return { ok: false };
  const res = await callRpc("subscribe_newsletter", {
    p_server_key: key,
    p_email: data.email,
    p_consent: true,
    p_source: data.source,
    p_locale: data.locale,
    p_consent_text_version: NEWSLETTER_CONSENT_VERSION,
  });
  if (!res.ok) return { ok: false };
  const row = Array.isArray(res.data) ? res.data[0] : null;
  if (
    row &&
    typeof row === "object" &&
    typeof (row as Record<string, unknown>).confirm_token === "string" &&
    typeof (row as Record<string, unknown>).unsubscribe_token === "string"
  ) {
    const r = row as { confirm_token: string; unsubscribe_token: string };
    return { ok: true, send: { confirmToken: r.confirm_token, unsubscribeToken: r.unsubscribe_token } };
  }
  return { ok: true, send: null };
}

export type TokenOutcome = { status: "ok"; email: string } | { status: "invalid" } | { status: "unavailable" };

export async function confirm(token: string): Promise<TokenOutcome> {
  const key = serverKey();
  if (!key) return { status: "unavailable" };
  const res = await callRpc("confirm_newsletter", { p_server_key: key, p_token: token });
  if (!res.ok) return { status: "unavailable" };
  const row = Array.isArray(res.data) ? res.data[0] : null;
  const email = row && typeof row === "object" ? (row as Record<string, unknown>).email : null;
  return typeof email === "string" ? { status: "ok", email } : { status: "invalid" };
}

export async function unsubscribe(token: string): Promise<TokenOutcome> {
  const key = serverKey();
  if (!key) return { status: "unavailable" };
  const res = await callRpc("unsubscribe_newsletter", { p_server_key: key, p_token: token });
  if (!res.ok) return { status: "unavailable" };
  return typeof res.data === "string" ? { status: "ok", email: res.data } : { status: "invalid" };
}
