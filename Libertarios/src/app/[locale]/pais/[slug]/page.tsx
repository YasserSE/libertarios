import type { Metadata } from "next";
import { Link } from "@/i18n/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { EUROPE_COUNTRIES } from "@/data/geo/europe-countries";
import {
  getCountrySnapshotBySlug,
  getEuropeSnapshot,
  getRankedCountries,
} from "@/lib/affiliates/repository";
import { formatPerMillion } from "@/lib/affiliates/format";

/**
 * Per-country detail page.
 *
 * Countries without a subdivision map get this compact card instead of a
 * choropleth; when one gains regional data, point its slug at the scoped home
 * page the way `/spain` does.
 */

export function generateStaticParams() {
  return EUROPE_COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountrySnapshotBySlug(slug);
  if (!country) return { title: "País no encontrado — Libertarios.eu" };
  return {
    title: `${country.meta.name} — Libertarios.eu`,
    description: `Simpatizantes libertarios registrados en ${country.meta.name}. Datos agregados y anónimos.`,
  };
}

const nf = (n: number) => n.toLocaleString("es-ES");

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountrySnapshotBySlug(slug);
  if (!country) notFound();

  // Spain has a full province map; send it to the scoped home page instead.
  if (country.meta.hasRegionMap) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {country.meta.flag} {country.meta.name}
          </h1>
          <p className="max-w-md text-muted-foreground">
            {country.meta.name} tiene mapa propio por provincias.
          </p>
          <Button variant="cta" asChild>
            <Link href="/spain">
              Ver el mapa de {country.meta.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const europe = await getEuropeSnapshot();
  const ranked = await getRankedCountries();
  const share = europe.total > 0 ? country.count / europe.total : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-28">
        <div className="container max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al mapa de Europa
          </Link>

          <header className="mt-6">
            <p className="text-5xl">{country.meta.flag}</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground">
              {country.meta.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {country.count > 0
                ? `Puesto ${country.rank} de ${ranked.length} países con simpatizantes registrados en Europa.`
                : "Todavía no hay simpatizantes registrados en este país."}
            </p>
          </header>

          {country.count > 0 && (
            <>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Figure icon={<Users className="h-4 w-4" />} label="Simpatizantes" value={nf(country.count)} />
                <Figure label="Por millón hab." value={formatPerMillion(country.perMillion)} />
                <Figure
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Últimos 30 días"
                  value={`+${nf(country.growth30d)}`}
                />
                <Figure label="Del total europeo" value={`${(share * 100).toFixed(1)}%`} />
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Posición media en el cuadrante
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Media de las posiciones declaradas por los simpatizantes de {country.meta.name}, en
                  una escala de −100 (control estatal) a +100 (libertad individual).
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-muted-foreground">Eje económico</dt>
                    <dd className="font-display text-2xl font-bold tabular-nums text-foreground">
                      {country.position.economic > 0 ? "+" : ""}
                      {country.position.economic}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Eje social</dt>
                    <dd className="font-display text-2xl font-bold tabular-nums text-foreground">
                      {country.position.social > 0 ? "+" : ""}
                      {country.position.social}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          )}

          <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
            <h2 className="font-display text-lg font-semibold text-foreground">
              ¿Vives en {country.meta.name}?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Registra tu posición y ayuda a que el mapa refleje mejor el pensamiento libertario
              en Europa.
            </p>
            <Button variant="cta" className="mt-4" asChild>
              <Link href="/registro">
                Registrarme como simpatizante
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Figure({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 font-display text-2xl font-bold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
