import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, FlaskConical, Target } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { MEASURES, STRENGTH_LABEL } from "@/data/measures";
import { MeasureDiagram } from "@/components/medidas/MeasureDiagram";

export const metadata: Metadata = {
  title: "Medidas y efectos — Libertarios.eu",
  description:
    "Qué buscan las medidas intervencionistas más comunes y qué muestra la evidencia sobre sus efectos reales. Con las fuentes y con lo que la evidencia no respalda.",
};

const STRENGTH_STYLE: Record<string, string> = {
  sólida: "border-primary/30 bg-primary/10 text-primary",
  media: "border-border bg-muted text-muted-foreground",
  discutida: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export default function MedidasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 pt-24">
        <section className="py-14 lg:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <FlaskConical className="h-7 w-7 text-primary" />
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Medidas y efectos
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ocho políticas que se proponen a menudo, qué buscan y qué han medido los estudios
                sobre lo que pasa después. Con la fuente al lado, para que no haya que fiarse.
              </p>

              {/*
                Sin esta advertencia la página sería un panfleto. Con ella es un
                argumento que aguanta que lo comprueben — y una de las ocho
                entradas dice, negro sobre blanco, que aquí nuestro propio bando
                afirma más de lo que la evidencia sostiene.
              */}
              <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-5 text-left">
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  Cómo leer esto
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Cada medida trae también <strong className="text-foreground">dónde la evidencia
                  no respalda la versión fuerte</strong>, incluidos los casos en los que quien
                  defiende el mercado exagera. El salario mínimo es el ejemplo más claro: la
                  literatura no dice lo que se suele afirmar. Si una sección así solo confirmara lo
                  que ya pensamos, no valdría nada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Índice fijo. Ocho medidas largas seguidas se leen como un muro; con
            los nombres siempre a la vista se sabe qué hay y se salta a lo que
            interesa. */}
        <nav
          aria-label="Medidas"
          className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-md"
        >
          <div className="container">
            <ul className="flex snap-x gap-2 overflow-x-auto py-3">
              {MEASURES.map((measure) => (
                <li key={measure.id} className="snap-start">
                  <a
                    href={`#${measure.id}`}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <span className="text-[10px] uppercase tracking-wide text-primary">
                      {measure.area}
                    </span>
                    {measure.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <section className="pb-8 pt-10">
          <div className="container">
            <div className="mx-auto max-w-5xl space-y-6">
              {MEASURES.map((measure) => (
                <article
                  key={measure.id}
                  id={measure.id}
                  className="scroll-mt-32 overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="border-b border-border p-6 lg:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {measure.area}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          STRENGTH_STYLE[measure.strength]
                        }`}
                      >
                        {STRENGTH_LABEL[measure.strength]}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
                      {measure.name}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {measure.goal}
                    </p>
                  </div>

                  {/* El mecanismo dibujado va arriba a la derecha, a la altura de
                      la evidencia que lo sostiene: se puede mirar el esquema y
                      leer los casos sin desplazarse entre uno y otro. */}
                  <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:p-7">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Qué muestra la evidencia
                      </p>
                      <p className="leading-relaxed text-muted-foreground">{measure.evidence}</p>

                      <ul className="mt-4 space-y-2.5">
                        {measure.cases.map((c) => (
                          <li
                            key={c.place}
                            className="rounded-xl border border-border bg-background p-4"
                          >
                            <p className="font-display text-sm font-semibold text-foreground">
                              {c.place}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                              {c.finding}
                            </p>
                            <p className="mt-2 text-[11px] italic text-muted-foreground">
                              {c.source}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <MeasureDiagram id={measure.id} />

                      <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                          <Target className="h-3.5 w-3.5" />
                          El mecanismo
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {measure.principle}
                        </p>
                      </div>

                      <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Dónde no vale simplificar
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {measure.disputed}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Los estudios citados son públicos y se pueden buscar por autor y año. Si encuentras
                uno que contradiga lo que hay aquí, escríbenos: corregirlo es más útil que tener
                razón.{" "}
                <Link href="/noticias" className="underline underline-offset-4 hover:text-foreground">
                  Las fuentes están en Recursos
                </Link>
                .
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-7 text-center">
              <h2 className="font-display text-xl font-semibold text-foreground">
                ¿Y tú qué opinas de todo esto?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Varias de estas medidas aparecen en el test. Contesta y verás dónde te deja.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="cta" asChild>
                  <Link href="/cuadrante">
                    Hacer el test
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/libertario">Las objeciones al libertarismo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
