import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { MEASURES } from "@/data/measures";

/**
 * La entrada al test, justo después del cuadrante.
 *
 * El orden de la portada cuenta algo: primero te sitúas en los dos ejes, y
 * enseguida se te pregunta por una política concreta. Situarse es una opinión
 * sobre uno mismo; acertar o fallar aquí es comprobable, y esa es la diferencia
 * que el proyecto quiere enseñar.
 *
 * Se muestra la pregunta de verdad, jugable, no una tarjeta que dice «tenemos
 * un test». Pulsar una opción abre `/aprende` con esa respuesta ya elegida, así
 * que el primer clic ya devuelve algo en lugar de pedir otro clic.
 */
const FIRST = MEASURES.find((m) => m.id === "control-alquileres")!;

export function LearnSection() {
  return (
    <section id="aprende" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <GraduationCap className="h-6 w-6 text-primary" />
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Suena justo. ¿Y luego qué pasa?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Ya sabes dónde te sitúas. Ahora ocho medidas que se proponen para arreglar un daño
            real: adivina qué provocan y compruébalo con los estudios. Una de las ocho va contra
            nosotros.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 lg:p-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pregunta 1 de 8 · {FIRST.area}
          </p>
          <h3 className="font-display text-lg font-bold leading-snug text-foreground md:text-xl">
            {FIRST.quiz.question}
          </h3>

          <div className="mt-5 space-y-3">
            {FIRST.quiz.options.map((option, i) => (
              <Link
                key={option}
                href={`/aprende?p=0&r=${i}`}
                className="flex w-full items-start gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground/40 text-[10px] font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-relaxed text-foreground">{option}</span>
              </Link>
            ))}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Elige una y verás la respuesta, con el mecanismo y los estudios detrás.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/aprende">
              Ver las ocho
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
