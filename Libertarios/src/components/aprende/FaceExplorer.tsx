"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { ReferenceAvatar } from "@/components/maps/ReferenceAvatar";
import { useAnimateInView } from "@/components/motion/hooks";
import { REFERENCE_SETS, type ReferencePoint } from "@/data/quadrantReferences";

const ALL = REFERENCE_SETS.flatMap((set) => set.points);
const sign = (n: number) => `${n > 0 ? "+" : ""}${n}`;
/**
 * Los puntos se dibujan dentro de un margen, no contra el borde.
 *
 * La escala sigue siendo lineal y exacta —solo cambia el encuadre—, pero quien
 * cae en un extremo deja de quedar pegado al rótulo del eje. Sin esto, «Meloni»
 * y «Trump» se escribían encima de «CONTROL SOCIAL».
 */
const PAD = 7;
const SPAN = 100 - PAD * 2;
const toX = (economic: number) => PAD + ((economic + 100) / 200) * SPAN;
const toY = (social: number) => 100 - PAD - ((social + 100) / 200) * SPAN;

/**
 * Las caras, sobre el cuadrante, con su ficha al lado.
 *
 * Antes esta sección eran seis tarjetas sueltas que al pulsarlas te sacaban de
 * la página hacia el cuadrante grande. Dos problemas: no se veía la relación
 * entre ellas —que es justo lo que el cuadrante existe para enseñar— y para
 * comparar dos había que ir y volver.
 *
 * Ahora están dibujadas donde les toca y el clic abre la ficha aquí mismo, con
 * las medidas concretas que sostienen la posición. La coordenada deja de ser una
 * opinión nuestra y pasa a ser algo que el lector puede comprobar.
 */
export function FaceExplorer({ ids, title, intro }: { ids: string[]; title: string; intro: string }) {
  const points = ids
    .map((id) => ALL.find((p) => p.id === id))
    .filter((p): p is ReferencePoint => Boolean(p));

  const { ref: quadrantRef, entering } = useAnimateInView<HTMLDivElement>();
  const [selectedId, setSelectedId] = useState(points[0]?.id ?? null);
  const selected = points.find((p) => p.id === selectedId) ?? points[0];

  /**
   * Posición vertical de cada nombre, esquivando los ya colocados.
   *
   * Sánchez y Lula caen a cinco puntos uno del otro y sus etiquetas se
   * solapaban hasta hacerse ilegibles. El punto no se mueve —eso falsearía la
   * coordenada—, solo baja su nombre hasta encontrar hueco.
   */
  const labelY = useMemo(() => {
    // Los obstáculos son las otras etiquetas **y los propios distintivos**: la
    // primera versión solo esquivaba etiquetas, y el nombre de Sánchez acababa
    // escrito encima del círculo de Lula.
    const blocked = [
      // Las bandas de los rótulos de eje, arriba y abajo.
      { x: 50, y: 4, halfHeight: 4 },
      { x: 50, y: 98, halfHeight: 4 },
      ...points.map((p) => ({
        x: toX(p.economic),
        y: toY(p.social),
        halfHeight: 4.6,
      })),
    ];
    const result = new Map<string, number>();

    for (const point of [...points].sort((a, b) => toY(a.social) - toY(b.social))) {
      const cx = toX(point.economic);
      // Debajo por defecto; arriba cuando el borde inferior queda cerca, que es
      // lo que recortaba el nombre de quien cae en la franja más autoritaria.
      const below = toY(point.social) + 6;
      const direction = below > 92 ? -1 : 1;
      let y = direction === 1 ? below : toY(point.social) - 5.2;
      while (
        blocked.some(
          (q) => Math.abs(q.x - cx) < 14 && Math.abs(q.y - y) < q.halfHeight,
        )
      ) {
        y += 3.6 * direction;
      }
      blocked.push({ x: cx, y, halfHeight: 2.8 });
      result.set(point.id, y);
    }
    return result;
  }, [points]);

  /** El mismo barrido que en el cuadrante grande: entran de izquierda a derecha. */
  const enterDelay = useMemo(() => {
    const order = [...points].sort((a, b) => a.economic - b.economic);
    return new Map(order.map((p, i) => [p.id, i * 45]));
  }, [points]);

  return (
    <section id="caras" className="scroll-mt-20 py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Cuadrante */}
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
            <div ref={quadrantRef} className="relative mx-auto aspect-square w-full max-w-xl">
              <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={title}>
                <rect width="100" height="100" className="fill-background" rx="3" />
                <rect x="50" y="0" width="50" height="50" className="fill-primary/[0.07]" />
                <rect x="0" y="0" width="50" height="50" className="fill-sky-500/[0.06]" />
                <rect x="0" y="50" width="50" height="50" className="fill-rose-500/[0.06]" />
                <rect x="50" y="50" width="50" height="50" className="fill-slate-500/[0.06]" />
                {[25, 75].map((pos) => (
                  <g key={pos}>
                    <line x1={pos} y1="0" x2={pos} y2="100" className="stroke-border/50" strokeWidth="0.15" />
                    <line x1="0" y1={pos} x2="100" y2={pos} className="stroke-border/50" strokeWidth="0.15" />
                  </g>
                ))}
                <line x1="50" y1="0" x2="50" y2="100" className="stroke-border" strokeWidth="0.4" />
                <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.4" />

                <text x="50" y="4" textAnchor="middle" className="fill-muted-foreground text-[2.6px] font-medium">
                  LIBERTAD SOCIAL
                </text>
                <text x="50" y="98" textAnchor="middle" className="fill-muted-foreground text-[2.6px] font-medium">
                  CONTROL SOCIAL
                </text>
                <text x="3" y="50" textAnchor="middle" className="fill-muted-foreground text-[2.6px] font-medium" transform="rotate(-90, 3, 50)">
                  INTERVENCIÓN
                </text>
                <text x="97" y="50" textAnchor="middle" className="fill-muted-foreground text-[2.6px] font-medium" transform="rotate(90, 97, 50)">
                  LIBRE MERCADO
                </text>

                {/* El seleccionado se pinta el último para quedar por encima. */}
                {[...points]
                  .sort((a, b) => Number(a.id === selected?.id) - Number(b.id === selected?.id))
                  .map((point) => {
                    const cx = toX(point.economic);
                    const cy = toY(point.social);
                    const active = point.id === selected?.id;
                    const r = active ? 4.6 : 3.1;
                    return (
                      <g
                        key={point.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`${point.label}. Económico ${point.economic}, social ${point.social}.`}
                        aria-pressed={active}
                        onClick={() => setSelectedId(point.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedId(point.id);
                          }
                        }}
                        className={`cursor-pointer focus:outline-none ${
                          entering ? "quadrant-point" : ""
                        }`}
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          animationDelay: entering ? `${enterDelay.get(point.id) ?? 0}ms` : undefined,
                        }}
                      >
                        <circle cx={cx} cy={cy} r="6" fill="transparent" />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={point.color ?? "hsl(var(--foreground))"}
                          stroke={active ? "hsl(var(--foreground))" : "hsl(var(--background))"}
                          strokeWidth={active ? 0.9 : 0.7}
                          className="transition-all duration-300 ease-out"
                        />
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#fff"
                          className="transition-all duration-300 ease-out"
                          style={{ fontSize: r * 0.75, fontWeight: 700 }}
                        >
                          {point.initials ?? point.short.slice(0, 2)}
                        </text>
                        <text
                          x={cx}
                          y={labelY.get(point.id) ?? cy + r + 3}
                          textAnchor="middle"
                          className={`text-[2.6px] ${active ? "fill-foreground font-semibold" : "fill-foreground/70"}`}
                          style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: 1 }}
                        >
                          {point.short}
                        </text>
                      </g>
                    );
                  })}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {points.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setSelectedId(point.id)}
                  aria-pressed={point.id === selected?.id}
                  className={`inline-flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    point.id === selected?.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ReferenceAvatar point={point} size={18} />
                  {point.short}
                </button>
              ))}
            </div>
          </div>

          {/* Ficha */}
          {selected && (
            /* Sin animación al cambiar de referente. Relanzarla en cada clic
               convertía en un aspaviento algo que se hace muchas veces
               seguidas: el contenido cambia y se lee, que es lo que se busca. */
            <div className="rounded-3xl border border-border bg-card p-6 lg:p-7">
              <div className="flex items-start gap-4">
                <ReferenceAvatar point={selected} size={56} />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold leading-tight text-foreground">
                    {selected.label}
                  </h3>
                  {selected.role && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{selected.role}</p>
                  )}
                  <p className="mt-1.5 font-display text-sm font-semibold tabular-nums text-primary">
                    Económico {sign(selected.economic)} · Social {sign(selected.social)}
                  </p>
                </div>
              </div>

              <p className="mt-5 leading-relaxed text-muted-foreground">{selected.note}</p>

              {selected.contested && (
                <p className="mt-2 text-xs italic text-muted-foreground">
                  Posición discutida: hay lecturas razonables que la sitúan en otro punto.
                </p>
              )}

              {selected.policies && selected.policies.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <ListChecks className="h-3.5 w-3.5" />
                    Por qué está ahí
                  </p>
                  <ul className="space-y-2">
                    {selected.policies.map((policy) => (
                      <li
                        key={policy}
                        className="flex gap-2.5 rounded-lg bg-background px-3 py-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {policy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button variant="outline" size="sm" className="mt-6" asChild>
                <Link href={`/cuadrante?capas=${selected.kind}&ref=${selected.id}`}>
                  Verlo entre todos los referentes
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
