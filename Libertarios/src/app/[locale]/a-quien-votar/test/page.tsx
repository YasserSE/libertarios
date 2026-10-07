import type { Metadata } from "next";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { TestFlow } from "@/components/afinidad/TestFlow";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { getFlowStrings } from "@/i18n/afinidad/flow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // El test en sí no se indexa: es un paso intermedio, y la página que debe
  // salir en buscadores es la portada. El canonical apunta allí.
  return {
    title: getFlowStrings(locale).meta.title,
    alternates: { canonical: `/${locale}/a-quien-votar` },
    robots: { index: false, follow: true },
  };
}

/**
 * Página del test. Con el dataset vacío (datos aún en verificación) el flujo
 * enseña «en preparación», nunca preguntas de relleno.
 *
 * Misma composición que el modo test de `/cuadrante`: el nombre del test
 * centrado, «← Volver» y la tarjeta en una columna de `max-w-2xl`.
 */
export default async function AfinidadTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const strings = getFlowStrings(locale);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-center font-display text-2xl font-bold text-foreground md:text-3xl">{strings.brand}</h1>
      <Button asChild variant="ghost" className="mb-4 min-h-11">
        <NextLink href={`/${locale}/a-quien-votar`}>← {strings.header.home}</NextLink>
      </Button>
      <TestFlow
        questions={dataset.questions}
        parties={dataset.parties}
        version={dataset.version}
        locale={locale}
      />
    </div>
  );
}
