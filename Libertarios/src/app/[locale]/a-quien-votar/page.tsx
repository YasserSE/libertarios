import { Intro } from "@/components/afinidad/Intro";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { introJsonLd } from "@/lib/afinidad/meta";

/**
 * Portada del test. Solo pasa al cliente lo que la portada necesita (las
 * preguntas, para reconstruir el enlace del último resultado), no el dataset
 * entero con las posiciones de los partidos.
 *
 * El JSON-LD (`WebApplication`) va aquí y no en el layout: describe la
 * portada, no cada subpágina. `<` se escapa para que ningún texto pueda
 * cerrar la etiqueta `<script>`.
 */
export default async function AfinidadIntroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const jsonLd = JSON.stringify(introJsonLd(locale)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Intro locale={locale} questions={dataset.questions} version={dataset.version} />
    </>
  );
}
