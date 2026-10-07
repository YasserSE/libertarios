import type { Metadata } from "next";
import { AFINIDAD_LOCALES, AFINIDAD_SEGMENT, LOCALE_META } from "@/i18n/config";
import { getFlowStrings, resolveAfinidadLang } from "@/i18n/afinidad/flow";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import { fmt } from "@/i18n/afinidad/result";
import { dataset } from "@/data/afinidad";
import { absoluteUrl } from "@/lib/site";

/**
 * Metadatos comunes de las páginas de «¿A quién votar? Objetivamente».
 *
 * Por qué un único generador: Next fusiona los metadatos de layout y página de
 * forma SUPERFICIAL. Una página que declara `openGraph` sustituye el objeto
 * entero del layout, y una que no lo declara hereda el del layout, con su
 * `og:url` y su título de la portada. Cualquiera de los dos casos dejaba
 * vistas previas a medias (sin `og:locale`, con la URL de otra página, con la
 * imagen en castellano). Aquí cada página declara el bloque completo.
 *
 * Las URL de imagen y `og:url` van absolutas, construidas con `SITE_URL`
 * (nunca con el host de la petición): es lo que piden los rastreadores de
 * WhatsApp y X, y así no dependen de `metadataBase`.
 */

/** `og:locale` de cada idioma del módulo (formato `ll_CC`). */
export const OG_LOCALE: Record<(typeof AFINIDAD_LOCALES)[number], string> = {
  es: "es_ES",
  ca: "ca_ES",
  gl: "gl_ES",
  eu: "eu_ES",
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Ruta del módulo en un idioma: `afinidadPath("ca", "/datos")` → `/ca/a-quien-votar/datos`. */
export function afinidadPath(locale: string, sub = ""): string {
  return `/${locale}/${AFINIDAD_SEGMENT}${sub}`;
}

/**
 * URL absoluta de la imagen OG. `params` se copia tal cual (la ruta valida por
 * su cuenta) y siempre se añade `l` para que la imagen salga en el idioma de
 * la página.
 */
export function ogImageUrl(locale: string, params?: URLSearchParams | Record<string, string>): string {
  const sp = new URLSearchParams(params);
  sp.delete("l");
  sp.set("l", resolveAfinidadLang(locale));
  return absoluteUrl(`/api/og/afinidad?${sp.toString()}`);
}

export interface AfinidadMetaInput {
  locale: string;
  /** Subruta tras `/a-quien-votar` (`""`, `/resultado`, `/partidos/psoe`…). */
  sub: string;
  title: string;
  description: string;
  /** Título de la vista previa, si difiere del `<title>`. */
  ogTitle?: string;
  ogDescription?: string;
  image: { url: string; alt: string };
  /** Siempre `website`: «¿A quién votar?» es una herramienta, no un artículo. */
  siteName: string;
  /**
   * `true`: `canonical` y `hreflang` a las cuatro versiones de esta misma
   * subruta. Las páginas que no se indexan (resultado) no los llevan.
   */
  alternates?: boolean;
  noindex?: boolean;
}

export function afinidadMetadata(input: AfinidadMetaInput): Metadata {
  const lang = resolveAfinidadLang(input.locale);
  const path = afinidadPath(lang, input.sub);
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;
  const image = { url: input.image.url, ...OG_IMAGE_SIZE, alt: input.image.alt, type: "image/png" };

  const meta: Metadata = {
    title: input.title,
    description: input.description,
    openGraph: {
      type: "website",
      siteName: input.siteName,
      url: absoluteUrl(path),
      locale: OG_LOCALE[lang],
      alternateLocale: AFINIDAD_LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };

  if (input.alternates !== false && !input.noindex) {
    // hreflang propio: el layout del sitio no anuncia gl/eu (el resto del
    // sitio no está en esas lenguas), pero este módulo sí, completo en las
    // cuatro. `x-default` al castellano, la versión de referencia.
    const languages: Record<string, string> = Object.fromEntries(
      AFINIDAD_LOCALES.map((l) => [LOCALE_META[l].htmlLang, afinidadPath(l, input.sub)]),
    );
    languages["x-default"] = afinidadPath("es", input.sub);
    meta.alternates = { canonical: path, languages };
  }

  if (input.noindex) {
    // `noindex` en la etiqueta, no en robots.txt: los rastreadores de vistas
    // previas (WhatsApp, X, Telegram) tienen que poder leer la página para
    // sacar sus etiquetas OG.
    meta.robots = { index: false, follow: true };
    // Explícito: si no, se heredaría (fusión superficial) el del layout. Una
    // URL de resultado no es una versión de nada; la página de referencia es
    // la portada del test, como en `/test`.
    meta.alternates = { canonical: afinidadPath(lang) };
  }

  return meta;
}

/** Número de preguntas para los textos («15 preguntas»). */
export const questionCount = () => dataset.questions.length || 15;

/** Metadatos de la portada del test (y valor por defecto del módulo). */
export function introMetadata(locale: string): Metadata {
  const s = getFlowStrings(locale);
  const seo = getSeoStrings(locale);
  return afinidadMetadata({
    locale,
    sub: "",
    title: seo.introTitle,
    description: fmt(seo.introDescription, { n: questionCount() }),
    siteName: s.brand,
    image: { url: ogImageUrl(locale), alt: seo.ogAlt },
  });
}

/**
 * JSON-LD de la portada: una aplicación web gratuita, en el idioma de la
 * página, publicada por Libertarios.eu. Sin `aggregateRating` ni nada que no
 * se pueda respaldar.
 */
export function introJsonLd(locale: string): Record<string, unknown> {
  const lang = resolveAfinidadLang(locale);
  const s = getFlowStrings(lang);
  const seo = getSeoStrings(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: s.brand,
    headline: seo.introTitle,
    description: fmt(seo.introDescription, { n: questionCount() }),
    url: absoluteUrl(afinidadPath(lang)),
    inLanguage: LOCALE_META[lang].htmlLang,
    availableLanguage: AFINIDAD_LOCALES.map((l) => LOCALE_META[l].htmlLang),
    applicationCategory: "ReferenceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    image: ogImageUrl(lang),
    publisher: { "@type": "Organization", name: "Libertarios.eu", url: absoluteUrl("/") },
  };
}

/** Recorta a `max` caracteres en un límite de palabra, con «…». */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:·—-]+$/, "")}…`;
}
