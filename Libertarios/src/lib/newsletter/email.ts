import { getNewsletterStrings } from "@/i18n/newsletter";

/**
 * Correo de confirmación (doble opt-in) y de re-permiso para simpatizantes ya
 * registrados. Puro: no envía nada, solo construye asunto, HTML, texto y
 * cabeceras. Lo usan la server action y el script de importación.
 *
 * HTML mínimo a propósito: sin imágenes, sin píxeles, sin estilos externos. El
 * texto plano va siempre al lado.
 *
 * El correo no lleva NADA del test (ni respuestas, ni resultado, ni partido):
 * solo el enlace de confirmación y el de baja.
 */

/** Idiomas con plantilla propia; el resto cae al castellano. */
const TEMPLATE_LOCALES = ["es", "ca", "gl", "eu"] as const;

export function templateLocale(locale: string): (typeof TEMPLATE_LOCALES)[number] {
  return (TEMPLATE_LOCALES as readonly string[]).includes(locale)
    ? (locale as (typeof TEMPLATE_LOCALES)[number])
    : "es";
}

export interface ConfirmationEmailInput {
  siteUrl: string;
  locale: string;
  confirmToken: string;
  unsubscribeToken: string;
  /** Re-permiso a un simpatizante importado, en vez de alta nueva. */
  legacy?: boolean;
  /** Dirección para la variante `mailto:` de List-Unsubscribe. */
  contactEmail?: string;
}

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
  headers: Record<string, string>;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function newsletterUrls(siteUrl: string, locale: string, confirmToken: string, unsubscribeToken: string) {
  const base = siteUrl.replace(/\/$/, "");
  const lang = templateLocale(locale);
  return {
    confirm: `${base}/${lang}/novedades/confirmar?t=${encodeURIComponent(confirmToken)}`,
    unsubscribePage: `${base}/${lang}/novedades/baja?t=${encodeURIComponent(unsubscribeToken)}`,
    /** RFC 8058: baja de un clic desde el propio cliente de correo (POST). */
    unsubscribeOneClick: `${base}/api/newsletter/unsubscribe?t=${encodeURIComponent(unsubscribeToken)}`,
  };
}

export function buildConfirmationEmail(input: ConfirmationEmailInput): BuiltEmail {
  const lang = templateLocale(input.locale);
  const t = getNewsletterStrings(lang).email;
  const urls = newsletterUrls(input.siteUrl, lang, input.confirmToken, input.unsubscribeToken);
  const subject = input.legacy ? t.subjectLegacy : t.subject;
  const intro = input.legacy ? t.introLegacy : t.intro;
  const ignore = input.legacy ? t.ignoreLegacy : t.ignore;
  const contact = input.contactEmail ?? "contacto@libertarios.es";

  const text = [
    t.greeting,
    "",
    intro,
    urls.confirm,
    "",
    ignore,
    "",
    `${t.unsubscribe} ${urls.unsubscribePage}`,
    "",
    "--",
    t.footer,
  ].join("\n");

  const p = 'style="margin:0 0 16px;line-height:1.5"';
  const html = `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#1a1a1a;background:#ffffff">
<div style="max-width:560px;margin:0 auto">
<p ${p}>${escapeHtml(t.greeting)}</p>
<p ${p}>${escapeHtml(intro)}</p>
<p ${p}><a href="${escapeHtml(urls.confirm)}" style="display:inline-block;padding:12px 20px;background:#1a1a1a;color:#ffffff;text-decoration:none;border-radius:6px">${escapeHtml(t.button)}</a></p>
<p ${p}><a href="${escapeHtml(urls.confirm)}" style="color:#1a1a1a;word-break:break-all">${escapeHtml(urls.confirm)}</a></p>
<p ${p}>${escapeHtml(ignore)}</p>
<p style="margin:24px 0 0;font-size:13px;color:#555;line-height:1.5">${escapeHtml(t.unsubscribe)} <a href="${escapeHtml(urls.unsubscribePage)}" style="color:#555">${escapeHtml(urls.unsubscribePage)}</a><br>${escapeHtml(t.footer)}</p>
</div>
</body>
</html>`;

  return {
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${urls.unsubscribeOneClick}>, <mailto:${contact}?subject=baja>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}
