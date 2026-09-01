import { Link } from "@/i18n/Link";
import { ArrowRight } from "lucide-react";
import { MiniQuadrant } from "@/components/aprende/MiniQuadrant";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { REFERENCE_SETS, type ReferencePoint } from "@/data/quadrantReferences";

/**
 * Una figura conocida por cada cuadrante, en fichas grandes.
 *
 * El punto no es enseñar libertarios: es enseñar que los cuatro cuadrantes
 * están ocupados por gente que se reconoce. Sánchez es lo contrario de un
 * libertario y Bukele es autoritario; están aquí precisamente por eso.
 *
 * Los grupos se asignan a mano en lugar de deducirlos del signo de las
 * coordenadas. Con el eje económico anclado en el tamaño del Estado, Orbán cae
 * en negativo y el rótulo automático lo llamaría «autoritario de izquierda»,
 * que es exactamente el tipo de etiqueta engañosa que este proyecto quiere
 * evitar. Por eso los cuadrantes se nombran aquí por lo que combinan, no por el
 * eje izquierda-derecha.
 */
interface QuadrantGroup {
  id: string;
  title: string;
  axes: string;
  meaning: string;
  ids: string[];
  accent: string;
}

const GROUPS: QuadrantGroup[] = [
  {
    id: "libertario",
    title: "Libertario",
    axes: "Libertad económica + libertad personal",
    meaning:
      "Reducir el Estado en la economía y también en la vida privada. Es el cuadrante menos poblado de la política real.",
    ids: ["milei", "rallo"],
    accent: "border-primary/30 bg-primary/5",
  },
  {
    id: "liberal-social",
    title: "Liberal social",
    axes: "Estado en la economía + libertad personal",
    meaning:
      "Amplía derechos civiles y a la vez amplía el gasto y la regulación. Es donde gobierna casi toda la izquierda europea.",
    ids: ["sanchez", "lula", "starmer"],
    accent: "border-sky-500/30 bg-sky-500/[0.06]",
  },
  {
    id: "estatista",
    title: "Autoritario estatista",
    axes: "Estado en la economía + control social",
    meaning:
      "El Estado dirige el mercado y además restringe libertades civiles. No es de izquierdas ni de derechas: cabe gente de ambos lados.",
    ids: ["orban", "xi", "lepen"],
    accent: "border-rose-500/30 bg-rose-500/[0.06]",
  },
  {
    id: "mercado-autoritario",
    title: "Autoritario de mercado",
    axes: "Libertad económica + control social",
    meaning:
      "Apertura a la inversión junto a mano dura, censura o restricción de derechos. Es el cuadrante que más se confunde con el libertario.",
    ids: ["bukele", "meloni", "trump"],
    accent: "border-slate-500/30 bg-slate-500/[0.06]",
  },
];

const ALL = REFERENCE_SETS.flatMap((set) => set.points);
const sign = (n: number) => `${n > 0 ? "+" : ""}${n}`;

function FigureCard({ point }: { point: ReferencePoint }) {
  return (
    <Link
      href={`/cuadrante?capas=${point.kind}&ref=${point.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start gap-4">
        {/* El retrato entra aquí en cuanto se rellene `image`; mientras tanto,
            el distintivo con el color de su partido. Ver docs/REFERENCIAS.md. */}
        <ReferenceAvatar point={point} size={64} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-tight text-foreground">
            {point.label}
          </p>
          {point.role && (
            <p className="mt-0.5 text-xs text-muted-foreground">{point.role}</p>
          )}
          <p className="mt-1.5 font-display text-xs font-semibold tabular-nums text-primary">
            Económico {sign(point.economic)} · Social {sign(point.social)}
          </p>
        </div>
        <MiniQuadrant position={point} size={52} className="hidden sm:block" />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{point.note}</p>

      {point.contested && (
        <p className="mt-2 text-[11px] italic text-muted-foreground">Posición discutida.</p>
      )}

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Ver en el cuadrante
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function QuadrantFigures() {
  return (
    <section id="referentes" className="scroll-mt-20 border-y border-border bg-card py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Una cara para cada cuadrante
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            No están aquí porque sean libertarios: la mayoría son justo lo contrario. Están para
            enseñar que los cuatro cuadrantes existen y que en cada uno gobierna alguien conocido.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-10">
          {GROUPS.map((group) => {
            const figures = group.ids
              .map((id) => ALL.find((p) => p.id === id))
              .filter((p): p is ReferencePoint => Boolean(p));

            return (
              <div key={group.id} className={`rounded-3xl border p-6 lg:p-8 ${group.accent}`}>
                <div className="mb-6 max-w-3xl">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {group.title}
                    </h3>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {group.axes}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{group.meaning}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {figures.map((point) => (
                    <FigureCard key={point.id} point={point} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Las posiciones son orientativas y se miden por política ejercida, no por lo que cada uno
          dice de sí mismo.{" "}
          <Link href="/cuadrante?capas=leader" className="underline underline-offset-4 hover:text-foreground">
            Verlos todos en el cuadrante
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
