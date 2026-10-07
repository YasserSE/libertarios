"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";
import { isConfirmToken, isUnsubscribeToken, parseNewsletterForm, type NewsletterResult } from "@/lib/newsletter/schema";
import { confirm, subscribe, unsubscribe } from "@/lib/newsletter/subscribers";
import { sendConfirmation, syncConfirmed, syncUnsubscribed } from "@/lib/newsletter/brevo";

/**
 * Server actions de «Novedades de Libertarios.eu».
 *
 * - `subscribeNewsletter`: el formulario (resultado del test, registro, pie).
 *   Devuelve `{ ok: true }` o un código de error. **Nunca** devuelve el token
 *   de confirmación ni el de baja: esos solo viajan en el correo. Y responde
 *   lo mismo si la dirección era nueva, ya estaba o se ha frenado, para no
 *   revelar quién está suscrito.
 * - `confirmNewsletter` / `unsubscribeNewsletter`: el botón de las páginas
 *   `/novedades/confirmar` y `/novedades/baja`. Se confirma con un botón (POST)
 *   y no al abrir el enlace porque los antivirus de correo abren los enlaces
 *   solos: un GET que confirmara convertiría su visita en un «sí».
 */

const subscribeLimiter = createRateLimiter({ limit: 5 });
const tokenLimiter = createRateLimiter({ limit: 20 });

async function allowed(limiter: ReturnType<typeof createRateLimiter>): Promise<boolean> {
  try {
    return limiter.take(clientKey(await headers()));
  } catch {
    return true; // fuera de una petición (tests): sin límite
  }
}

export async function subscribeNewsletter(formData: FormData): Promise<NewsletterResult> {
  try {
    const parsed = parseNewsletterForm(formData);
    if (!parsed.ok) return parsed;
    if (!(await allowed(subscribeLimiter))) return { ok: false, error: "unavailable" };
    const saved = await subscribe(parsed.data);
    if (!saved.ok) return { ok: false, error: "unavailable" };
    if (saved.send) {
      // Si Brevo no está configurado o falla, la fila queda sin confirmar y no
      // se le escribe nada a nadie. A la persona se le responde igual.
      await sendConfirmation({
        email: parsed.data.email,
        locale: parsed.data.locale,
        confirmToken: saved.send.confirmToken,
        unsubscribeToken: saved.send.unsubscribeToken,
      });
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

function localeFrom(formData: FormData): string {
  const raw = formData.get("locale");
  return typeof raw === "string" && isLocale(raw) ? raw : "es";
}

export async function confirmNewsletter(formData: FormData): Promise<void> {
  const locale = localeFrom(formData);
  const token = formData.get("t");
  let state: "ok" | "invalido" | "error" = "invalido";
  if (isConfirmToken(token)) {
    if (!(await allowed(tokenLimiter))) {
      state = "error";
    } else {
      const res = await confirm(token).catch(() => ({ status: "unavailable" as const }));
      if (res.status === "ok") {
        state = "ok";
        await syncConfirmed(res.email).catch(() => false);
      } else {
        state = res.status === "invalid" ? "invalido" : "error";
      }
    }
  }
  // Sin el token en la URL final: no se queda en el historial ni en un referer.
  redirect(`/${locale}/novedades/confirmar?estado=${state}`);
}

export async function unsubscribeNewsletter(formData: FormData): Promise<void> {
  const locale = localeFrom(formData);
  const token = formData.get("t");
  let state: "ok" | "invalido" | "error" = "invalido";
  if (isUnsubscribeToken(token)) {
    if (!(await allowed(tokenLimiter))) {
      state = "error";
    } else {
      const res = await unsubscribe(token).catch(() => ({ status: "unavailable" as const }));
      if (res.status === "ok") {
        state = "ok";
        await syncUnsubscribed(res.email).catch(() => false);
      } else {
        state = res.status === "invalid" ? "invalido" : "error";
      }
    }
  }
  redirect(`/${locale}/novedades/baja?estado=${state}`);
}
