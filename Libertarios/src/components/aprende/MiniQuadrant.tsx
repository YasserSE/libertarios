import type { Position } from "@/data/ideologies";

/**
 * Cuadrante en miniatura para incrustar en una tarjeta.
 *
 * Existe para que cada corriente e ideología de «Aprende» se sitúe en **los
 * mismos dos ejes** que el test y el mapa. Antes cada sección describía las
 * cosas con su propio vocabulario y sin coordenadas, así que no había forma de
 * cruzar «minarquismo» con lo que te sale en el test.
 */
export function MiniQuadrant({
  position,
  size = 72,
  className = "",
}: {
  position: Position;
  size?: number;
  className?: string;
}) {
  const x = ((position.economic + 100) / 200) * 100;
  const y = 100 - ((position.social + 100) / 200) * 100;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`shrink-0 rounded-md ring-1 ring-border ${className}`}
      role="img"
      aria-label={`Posición en el cuadrante: económico ${position.economic > 0 ? "+" : ""}${
        position.economic
      }, social ${position.social > 0 ? "+" : ""}${position.social}.`}
    >
      <rect width="100" height="100" className="fill-card" />
      <rect x="50" y="0" width="50" height="50" className="fill-primary/[0.10]" />
      <rect x="0" y="0" width="50" height="50" className="fill-sky-500/[0.08]" />
      <rect x="0" y="50" width="50" height="50" className="fill-rose-500/[0.08]" />
      <rect x="50" y="50" width="50" height="50" className="fill-slate-500/[0.08]" />
      <line x1="50" y1="0" x2="50" y2="100" className="stroke-border" strokeWidth="1.4" />
      <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="1.4" />
      <circle cx={x} cy={y} r="11" className="fill-primary/25" />
      <circle cx={x} cy={y} r="6" className="fill-primary" stroke="hsl(var(--card))" strokeWidth="2" />
    </svg>
  );
}

/** Las dos coordenadas en texto, para acompañar al mini cuadrante. */
export function PositionLabel({ position }: { position: Position }) {
  const sign = (n: number) => `${n > 0 ? "+" : ""}${n}`;
  return (
    <span className="font-display text-xs font-semibold tabular-nums text-muted-foreground">
      Económico {sign(position.economic)} · Social {sign(position.social)}
    </span>
  );
}
