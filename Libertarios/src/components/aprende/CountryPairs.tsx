import { Link } from "@/i18n/Link";
import { ArrowRight } from "lucide-react";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { COUNTRY_PAIRS } from "@/data/countryPairs";
import { REFERENCE_SETS, type ReferencePoint } from "@/data/quadrantReferences";

const ALL = REFERENCE_SETS.flatMap((set) => set.points);
const byId = (id: string) => ALL.find((p) => p.id === id);
const sign = (n: number) => `${n > 0 ? "+" : ""}${n}`;

function Side({ point, side }: { point: ReferencePoint; side: "liberal" | "statist" }) {
  const liberal = side === "liberal";
  return (
    <Link
      href={`/cuadrante?capas=${point.kind}&ref=${point.id}`}
      className={`group flex flex-1 flex-col rounded-2xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        liberal
          ? "border-primary/25 bg-primary/5 hover:border-primary/50"
          : "border-sky-500/25 bg-sky-500/[0.06] hover:border-sky-500/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <ReferenceAvatar point={point} size={40} />
        <div className="min-w-0">
          <p className="font-display font-semibold leading-tight text-foreground">{point.short}</p>
          {point.role && (
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{point.role}</p>
          )}
        </div>
      </div>
      <p className="mt-2 font-display text-xs font-semibold tabular-nums text-primary">
        E {sign(point.economic)} · S {sign(point.social)}
      </p>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{point.note}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Ver en el cuadrante
        <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

/**
 * Dos referentes enfrentados por cada idioma del sitio.
 *
 * Siempre del mismo país y, donde se ha podido, de la misma profesión: así la
 * diferencia entre ellos es de posición, no de contexto. Es la forma más rápida
 * de enseñar que los dos ejes no son una construcción de este proyecto.
 */
export function CountryPairs() {
  const pairs = COUNTRY_PAIRS.map((pair) => ({
    ...pair,
    liberalPoint: byId(pair.liberal),
    statistPoint: byId(pair.statist),
  })).filter((p) => p.liberalPoint && p.statistPoint);

  return (
    <section id="referentes-pais" className="scroll-mt-20 py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            La misma discusión, en cada idioma
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Dos economistas del mismo país que defienden lo contrario. Uno por cada lengua en la
            que hablamos: el eje no lo hemos inventado nosotros.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          {pairs.map((pair) => (
            <div key={pair.locale} className="rounded-3xl border border-border bg-card p-5 lg:p-6">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-lg leading-none">{pair.flag}</span>
                <h3 className="font-display text-lg font-bold text-foreground">{pair.country}</h3>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {pair.locale}
                </span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{pair.tension}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Side point={pair.liberalPoint!} side="liberal" />
                <Side point={pair.statistPoint!} side="statist" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
