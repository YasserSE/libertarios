import { Link } from "@/i18n/Link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniQuadrant } from "@/components/aprende/MiniQuadrant";
import { IDEOLOGIES, LIBERTARIANISM } from "@/data/ideologies";

/**
 * Anticipo de la comparación, justo debajo del mapa.
 *
 * La versión anterior era una fila de etiquetas de colores con un botón «Ver
 * comparativas» que no enlazaba a ninguna parte, y los nombres y colores
 * estaban repetidos aquí a mano. Ahora sale del mismo modelo de dos ejes que el
 * test, el mapa y `/comparativas`, así que cada corriente aparece con su
 * posición real y no solo con su nombre.
 */
const FEATURED_IDS = ["socialdemocracia", "conservadurismo", "socialismo", "fascismo"];

const featured = [
  LIBERTARIANISM,
  ...FEATURED_IDS.map((id) => IDEOLOGIES.find((i) => i.id === id)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  ),
];

const sign = (n: number) => `${n > 0 ? "+" : ""}${n}`;

export function CompareSection() {
  return (
    <section id="comparativas" className="bg-card py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Comparar no es atacar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Las diferencias reales entre corrientes se ven mejor en los mismos dos ejes que en un
            debate. Cada una aquí con su posición, no con una etiqueta.
          </p>
          <p className="mt-4 font-medium text-foreground">
            Porque disentir no implica <span className="text-primary">deshumanizar</span>.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((item) => {
            const isLibertarian = item.id === LIBERTARIANISM.id;
            return (
              <li key={item.id}>
                <div
                  className={`flex h-full flex-col items-center gap-2.5 rounded-2xl border p-4 text-center ${
                    isLibertarian
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-background"
                  }`}
                >
                  <MiniQuadrant position={item.position} size={64} />
                  <p
                    className={`font-display text-sm font-semibold leading-tight ${
                      isLibertarian ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="font-display text-[11px] font-semibold tabular-nums text-muted-foreground">
                    E {sign(item.position.economic)} · S {sign(item.position.social)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cta" asChild>
            <Link href="/comparativas">
              Ver la comparación completa
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/comparativas#referentes">Ver referentes actuales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
