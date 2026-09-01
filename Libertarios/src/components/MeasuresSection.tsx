import { ArrowRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { MEASURES, STRENGTH_LABEL } from "@/data/measures";

const STRENGTH_STYLE: Record<string, string> = {
  sólida: "border-primary/30 bg-primary/10 text-primary",
  media: "border-border bg-muted text-muted-foreground",
  discutida: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

/**
 * Las medidas, en la portada.
 *
 * Cada sección de la home lleva a su página de Aprende —el cuadrante al test,
 * la comparativa a comparativas, los principios a /libertario— y esta era la
 * única que faltaba: a «Medidas y efectos» solo se llegaba por el menú.
 *
 * Se muestra el mecanismo, no la conclusión. `principle` es la frase que se
 * puede generalizar de cada medida, y es también lo que hace que la tarjeta
 * valga por sí sola aunque nadie pulse. La etiqueta de fuerza de la evidencia
 * viaja con ella a propósito: la del salario mínimo dice «discutida» ya desde
 * aquí, antes de que nadie entre a comprobarlo.
 */
export function MeasuresSection() {
  return (
    <section id="medidas" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <FlaskConical className="h-6 w-6 text-primary" />
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Qué pasa cuando se aplica
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cinco políticas que se proponen a menudo y qué han medido los estudios sobre lo que
            ocurre después. Con la fuente al lado y con lo que la evidencia no respalda, incluidas
            las veces que quien defiende el mercado afirma de más.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MEASURES.map((measure) => (
            <li key={measure.id}>
              <Link
                href={`/medidas#${measure.id}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {measure.area}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      STRENGTH_STYLE[measure.strength]
                    }`}
                  >
                    {STRENGTH_LABEL[measure.strength]}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-foreground">
                  {measure.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {measure.principle}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Ver la evidencia
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/medidas">
              Las cinco, con sus estudios
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
