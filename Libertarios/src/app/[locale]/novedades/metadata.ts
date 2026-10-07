import type { Metadata } from "next";
import { getNewsletterStrings } from "@/i18n/newsletter";

export type TokenPageKind = "confirm" | "unsubscribe";

/**
 * Metadatos de las páginas con token: `noindex` (una URL personal no pinta
 * nada en un buscador) y `no-referrer` (el token no sale en el referer de
 * ningún enlace que se pulse desde ahí).
 */
export function tokenPageMetadata(locale: string, kind: TokenPageKind): Metadata {
  const t = getNewsletterStrings(locale);
  return {
    title: kind === "confirm" ? t.confirm.metaTitle : t.unsubscribe.metaTitle,
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}
