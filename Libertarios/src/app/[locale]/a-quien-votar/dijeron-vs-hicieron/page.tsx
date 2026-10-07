import type { Metadata } from "next";
import { afinidadMetadata, ogImageUrl } from "@/lib/afinidad/meta";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import NextLink from "next/link";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { MAX_HEMEROTECA_WORDS } from "@/lib/afinidad/schema";
import { sortByDate } from "@/lib/afinidad/dvh";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { getTransparencyStrings } from "@/i18n/afinidad/transparency";
import { DvhCriteria, DvhSearchLogSection, SaidVsDidExplorer } from "@/components/afinidad/SaidVsDid";
import { getDvhSearchLog } from "@/data/afinidad/dichos-hechos/busqueda-i18n";
import { PageShell } from "../_transparencia/ui";
import { Disclosure } from "@/components/afinidad/ui";
import { modulePath } from "../_transparencia/links";

/**
 * «Dijeron vs. hicieron»: todas las entradas de todos los partidos, con filtros
 * por partido, etiqueta y tema, ordenadas por fecha.
 *
 * El criterio de selección va ARRIBA, antes de cualquier entrada: quien llega
 * aquí desde un enlace compartido tiene que saber primero que la lista incluye
 * lo cumplido y que se aplica igual a todos, y solo después leer un caso.
 *
 * La página es estática; los filtros viven en el cliente (ver
 * `SaidVsDidExplorer`).
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tt = getTransparencyStrings(locale);
  const seo = getSeoStrings(locale);
  return afinidadMetadata({
    locale,
    sub: "/dijeron-vs-hicieron",
    title: seo.dvhTitle,
    description: seo.dvhDescription,
    siteName: tt.appName,
    image: { url: ogImageUrl(locale), alt: seo.ogAlt },
  });
}

export default async function DijeronVsHicieronPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const t = getDvhStrings(locale);
  const entries = sortByDate(dataset.saidVsDid ?? []);
  const search = getDvhSearchLog(locale);

  return (
    <PageShell>
      {/* Cabecera como la del cuadrante: título centrado y una línea. */}
      <header className="text-center">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t.pageIntro}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t.notScored}</p>
      </header>

      {/* El criterio va ARRIBA, antes de cualquier entrada (quien llega desde un
          enlace compartido tiene que saber primero que la lista incluye lo
          cumplido y que se aplica igual a todos), pero plegado: el título se
          ve, los siete puntos se abren a demanda. */}
      <section aria-labelledby="criterios" className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 id="criterios" className="font-display text-lg font-semibold text-foreground">
          {t.criteriaTitle}
        </h2>
        <Disclosure summary={t.showCriteria}>
          <DvhCriteria t={t} maxWords={MAX_HEMEROTECA_WORDS} />
          <NextLink
            href={`${modulePath(locale, "/metodologia")}#dijeron-vs-hicieron`}
            className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
          >
            {t.methodologyLink} →
          </NextLink>
        </Disclosure>
      </section>

      <SaidVsDidExplorer entries={entries} parties={dataset.parties} t={t} lang={locale} />

      <DvhSearchLogSection log={search.log} gaps={search.gaps} parties={dataset.parties} t={t} />
    </PageShell>
  );
}
