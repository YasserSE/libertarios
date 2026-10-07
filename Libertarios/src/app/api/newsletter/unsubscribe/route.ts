import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";
import { syncUnsubscribed } from "@/lib/newsletter/brevo";
import { isUnsubscribeToken } from "@/lib/newsletter/schema";
import { unsubscribe } from "@/lib/newsletter/subscribers";

/**
 * Baja de un clic (RFC 8058) para la cabecera `List-Unsubscribe` de los
 * correos del boletín.
 *
 * - `POST ?t=<token>`: lo llama el propio cliente de correo (Gmail, Yahoo…)
 *   cuando la persona pulsa «Cancelar suscripción». Sin `Origin` ni cookies,
 *   así que no hay comprobación de mismo origen: la autorización es el token,
 *   que solo existe en los correos enviados a esa dirección.
 * - `GET`: un humano que pega la URL en el navegador. No da de baja (los
 *   escáneres hacen GET): redirige a la página con el botón.
 *
 * Responde 200 tanto si el token existía como si no: no hay nada que averiguar
 * desde fuera.
 */

const limiter = createRateLimiter({ limit: 20 });
const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: Request): Promise<Response> {
  if (!limiter.take(clientKey(request.headers))) return new Response(null, { status: 429, headers: NO_STORE });
  const token = new URL(request.url).searchParams.get("t");
  if (!isUnsubscribeToken(token)) return new Response(null, { status: 400, headers: NO_STORE });
  const res = await unsubscribe(token).catch(() => ({ status: "unavailable" as const }));
  if (res.status === "unavailable") return new Response(null, { status: 503, headers: NO_STORE });
  if (res.status === "ok") await syncUnsubscribed(res.email).catch(() => false);
  return new Response(null, { status: 200, headers: NO_STORE });
}

export function GET(request: Request): Response {
  const url = new URL(request.url);
  const token = url.searchParams.get("t");
  const target = new URL("/es/novedades/baja", url.origin);
  if (isUnsubscribeToken(token)) target.searchParams.set("t", token);
  return Response.redirect(target, 303);
}
