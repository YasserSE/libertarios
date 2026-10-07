"use client";

import { useLocale } from "@/i18n/Link";
import { NewsletterForm } from "./NewsletterForm";
import { isNewsletterEnabled } from "@/lib/newsletter/enabled";

/** El formulario del boletín en el pie, con el idioma de la ruta. */
export function FooterNewsletter() {
  const locale = useLocale();
  if (!isNewsletterEnabled()) return null;
  return <NewsletterForm source="footer" locale={locale} variant="footer" />;
}
