import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModuleBar } from "@/components/afinidad/ModuleBar";
import { getFlowStrings } from "@/i18n/afinidad/flow";
import { introMetadata } from "@/lib/afinidad/meta";

/**
 * Layout de «¿A quién votar? Objetivamente».
 *
 * Rediseño (2026-10-07, decisión del dueño: «tiene otro formato, no se parece
 * al test oficial»): el módulo deja su cabecera mínima, su pie y la paleta gris
 * `.theme-afinidad`, y usa la cabecera, el pie y los colores del sitio, igual
 * que `/cuadrante`. Lo que distinguía al módulo como herramienta sin afiliación
 * pasa a `ModuleBar`: un distintivo y los enlaces a método, datos y «Dijeron
 * vs. hicieron», en todas las páginas del módulo.
 *
 * La cabecera es fija (`fixed`), de ahí el `pt-24` del contenido, como en
 * `/cuadrante`.
 */

/**
 * Metadatos por defecto del módulo, que son los de la portada del test. Cada
 * subpágina declara los suyos completos con el mismo generador
 * (`afinidadMetadata`): la fusión de Next es superficial y heredar el
 * `openGraph` de aquí les pondría el `og:url` y el título de la portada.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return introMetadata(locale);
}

export default async function AfinidadLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const strings = getFlowStrings(locale);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="contenido" className="pb-16 pt-24">
        <div className="container">
          <ModuleBar locale={locale} strings={strings} />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
