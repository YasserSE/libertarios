import { z } from "zod";
import { LOCALES } from "@/i18n/config";

/**
 * Validación pura del boletín «Novedades de Libertarios.eu».
 *
 * Aparte de `subscribers.ts` (server-only) para poder probarla sin servidor.
 *
 * Lo que entra en una suscripción es SOLO esto: correo, casilla, origen e
 * idioma. `parseNewsletterForm` lee esos cuatro campos por nombre y nada más,
 * así que aunque un formulario mal cableado (o alguien a mano) mande respuestas
 * del test, resultado o voto habitual, no llegan a la base.
 */

/**
 * Versión del texto de la casilla. Se guarda con cada alta como prueba de qué
 * se aceptó: si cambia `checkbox` en `src/i18n/newsletter.ts`, sube esta.
 */
export const NEWSLETTER_CONSENT_VERSION = "nl-2026-10-07";

/**
 * Versión del consentimiento de los simpatizantes importados: el texto del
 * registro («se guarde mi correo con el fin de que Libertarios.eu pueda
 * escribirme…»), vigente desde la migración 0006.
 */
export const LEGACY_CONSENT_VERSION = "registro-2026-10";

/** Orígenes que admite la web. `legacy_affiliate` solo lo pone la importación. */
export const NEWSLETTER_SOURCES = ["test", "registro", "footer"] as const;
export type NewsletterSource = (typeof NEWSLETTER_SOURCES)[number];

/** Token del enlace de confirmación (`nlc_` + 64 hex). */
export const CONFIRM_TOKEN_RE = /^nlc_[0-9a-f]{64}$/;
/** Token de baja (UUID de Postgres). */
export const UNSUBSCRIBE_TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const newsletterFormSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  /**
   * La casilla. Marcada llega como `"on"`; sin marcar, no llega. Solo `"on"` y
   * `"true"` cuentan como sí: `"false"` o cualquier otra cosa es no.
   */
  consent: z.enum(["on", "true"]),
  source: z.enum(NEWSLETTER_SOURCES),
  locale: z.enum(LOCALES).catch("es"),
});

export type NewsletterInput = z.output<typeof newsletterFormSchema>;

export type NewsletterError = "invalid-email" | "consent-required" | "unavailable";
export type NewsletterResult = { ok: true } | { ok: false; error: NewsletterError };

export function parseNewsletterForm(
  formData: FormData,
): { ok: true; data: NewsletterInput } | { ok: false; error: NewsletterError } {
  const raw = {
    email: formData.get("email"),
    consent: formData.get("consent"),
    source: formData.get("source"),
    locale: formData.get("locale"),
  };
  const parsed = newsletterFormSchema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };
  const failed = new Set(parsed.error.issues.map((i) => i.path[0]));
  // Sin casilla, eso es lo primero que hay que decir.
  if (failed.has("consent")) return { ok: false, error: "consent-required" };
  if (failed.has("email")) return { ok: false, error: "invalid-email" };
  // Origen manipulado: no es culpa de la persona, mensaje genérico.
  return { ok: false, error: "unavailable" };
}

export const isConfirmToken = (v: unknown): v is string => typeof v === "string" && CONFIRM_TOKEN_RE.test(v);
export const isUnsubscribeToken = (v: unknown): v is string =>
  typeof v === "string" && UNSUBSCRIBE_TOKEN_RE.test(v);
