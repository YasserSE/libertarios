import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, LOCALE_META, SITE_LOCALES, isLocale } from "@/i18n/config";

/**
 * Capa por idioma.
 *
 * `generateStaticParams` prerenderiza los seis, y `lang` sale del propio
 * segmento para que lectores de pantalla y buscadores lean el idioma correcto
 * —el `layout` raíz tenía `lang="es"` fijo, que en la versión alemana sería
 * sencillamente falso—.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      canonical: `/${locale}`,
      // Solo los idiomas en que el sitio está traducido: `/gl` y `/eu` sirven
      // el castellano, y anunciarlos como versiones gallega y vasca sería
      // contenido duplicado con etiqueta falsa. El layout de `/a-quien-votar`
      // declara sus propias alternativas (es, ca, gl, eu).
      languages: Object.fromEntries(
        SITE_LOCALES.map((l) => [LOCALE_META[l].htmlLang, `/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div lang={LOCALE_META[locale].htmlLang} className="contents">
      {children}
    </div>
  );
}
