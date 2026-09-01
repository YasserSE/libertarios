"use client";

import { useMemo, useState } from "react";
import { mockUsers } from "@/data/mockRegisteredUsers";
import {
  REFERENCE_SETS,
  type ReferenceKind,
  type ReferencePoint,
} from "@/data/quadrantReferences";
import { ReferenceAvatar } from "./maps/ReferenceAvatar";
import { useAnimateInView } from "./motion/hooks";

interface InteractiveQuadrantProps {
  userPosition?: { economic: number; social: number } | null;
  showAllUsers?: boolean;
  interactive?: boolean;
  onPositionChange?: (economic: number, social: number) => void;
  /** Capas de referencia activas al montar. */
  defaultLayers?: ReferenceKind[];
  /** Oculta el conmutador de capas (para usos incrustados). */
  showLayerControls?: boolean;
  /** Id de referencia a resaltar al abrir, p. ej. desde ?ref=milei. */
  focusId?: string | null;
}

/**
 * Marcadores por conjunto: una forma distinta para cada uno, un solo color.
 *
 * En un gráfico de dispersión cualquier par de puntos puede acabar lado a lado,
 * y con cuatro conjuntos simultáneos no hay cuatro tonos que se distingan con
 * garantías bajo daltonismo. La forma resuelve la identidad sin gastar el canal
 * de color, que aquí queda reservado para lo único que es del usuario: su
 * propia posición y la de los demás simpatizantes.
 */
const MARKERS: Record<ReferenceKind, (cx: number, cy: number, s: number) => string> = {
  country: (cx, cy, s) =>
    `M ${cx - s} ${cy} a ${s} ${s} 0 1 0 ${s * 2} 0 a ${s} ${s} 0 1 0 ${-s * 2} 0`,
  thinker: (cx, cy, s) =>
    `M ${cx} ${cy - s * 1.15} L ${cx + s} ${cy + s * 0.75} L ${cx - s} ${cy + s * 0.75} Z`,
  leader: (cx, cy, s) =>
    `M ${cx - s} ${cy} a ${s} ${s} 0 1 0 ${s * 2} 0 a ${s} ${s} 0 1 0 ${-s * 2} 0`,
  "party-es": (cx, cy, s) => `M ${cx - s} ${cy - s} h ${s * 2} v ${s * 2} h ${-s * 2} Z`,
  "party-eu": (cx, cy, s) =>
    `M ${cx} ${cy - s * 1.2} L ${cx + s * 1.2} ${cy} L ${cx} ${cy + s * 1.2} L ${cx - s * 1.2} ${cy} Z`,
};

/**
 * Nombres de cuadrante pegados al borde, no en su centro.
 *
 * En el centro caen justo donde se acumulan los puntos: con la capa de países
 * activa, «Libertario» quedaba enterrado bajo media Europa. El subtítulo se
 * eliminó porque repetía lo que ya dicen las etiquetas de los ejes.
 */
const QUADRANT_LABELS = [
  { x: 75, y: 7, label: "Libertario" },
  { x: 25, y: 7, label: "Liberal social" },
  { x: 25, y: 95.5, label: "Autoritario de izquierda" },
  { x: 75, y: 95.5, label: "Autoritario de derecha" },
];


/**
 * El distintivo real de una referencia, dibujado dentro del SVG.
 *
 * Antes cada punto era una forma abstracta y el nombre iba al lado; había que
 * leer para saber qué era cada cosa. Ahora la bandera, el logotipo o las
 * iniciales con el color del partido se pintan sobre el propio cuadrante, que
 * es donde se está mirando.
 *
 * Los emoji se pintan como `<text>`: el navegador los resuelve con su fuente de
 * color, así que no hacen falta 28 imágenes de bandera.
 */
function ReferenceMarker({
  point,
  cx,
  cy,
  hovered,
}: {
  point: ReferencePoint;
  cx: number;
  cy: number;
  hovered: boolean;
}) {
  const r = hovered ? 3.1 : 2.5;

  if (point.image) {
    const clipId = `clip-${point.id}`;
    return (
      <g>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <image
          href={point.image}
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--card))" strokeWidth="0.5" />
      </g>
    );
  }

  if (point.emoji) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-card"
          stroke={hovered ? "hsl(var(--foreground))" : "hsl(var(--border))"}
          strokeWidth={hovered ? 0.5 : 0.3}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: r * 1.5 }}
        >
          {point.emoji}
        </text>
      </g>
    );
  }

  // Partidos y pensadores: círculo con el color de marca y las iniciales.
  const fill = point.color ?? "hsl(var(--foreground))";
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={hovered ? "hsl(var(--foreground))" : "hsl(var(--card))"}
        strokeWidth={hovered ? 0.55 : 0.45}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={point.color ? readableInk(point.color) : "hsl(var(--card))"}
        style={{ fontSize: r * 0.82, fontWeight: 700 }}
      >
        {point.initials ?? point.short.slice(0, 2)}
      </text>
    </g>
  );
}

/** Negro o blanco según cuál contraste más con el color de marca. */
function readableInk(hex: string): string {
  const v = hex.replace("#", "");
  if (v.length !== 6) return "#fff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.45 ? "#101418" : "#ffffff";
}

const toX = (economic: number) => ((economic + 100) / 200) * 100;
const toY = (social: number) => 100 - ((social + 100) / 200) * 100;

export function InteractiveQuadrant({
  userPosition,
  showAllUsers = true,
  interactive = false,
  onPositionChange,
  defaultLayers = [],
  showLayerControls = true,
  focusId = null,
}: InteractiveQuadrantProps) {
  const { ref: quadrantRef, entering, animate } = useAnimateInView<HTMLDivElement>();
  const [activeKinds, setActiveKinds] = useState<ReferenceKind[]>(defaultLayers);
  // Con una capa de referencia activa de salida, la nube estorba más que ayuda.
  const [showUsers, setShowUsers] = useState(showAllUsers && defaultLayers.length === 0);
  const [hovered, setHovered] = useState<ReferencePoint | null>(
    () =>
      REFERENCE_SETS.flatMap((set) => set.points).find((p) => p.id === focusId) ?? null,
  );

  const activeSets = useMemo(
    () => REFERENCE_SETS.filter((s) => activeKinds.includes(s.kind)),
    [activeKinds],
  );

  // Con un solo conjunto los nombres caben; con varios se pisan, así que sólo se
  // muestra el del punto sobre el que estás.
  const showLabels = activeSets.length === 1;

  /**
   * Posición vertical de cada etiqueta, esquivando las ya colocadas.
   *
   * Al endurecer la escala los puntos se agruparon hacia el centro y los
   * nombres empezaron a solaparse («EspañaAlemania»). Se recorren de arriba
   * abajo y cada etiqueta baja en saltos hasta encontrar hueco; el punto no se
   * mueve, sólo su nombre.
   */
  const labelY = useMemo(() => {
    if (!showLabels) return new Map<string, number>();
    const placed: { x: number; y: number }[] = [];
    const result = new Map<string, number>();
    const points = [...activeSets.flatMap((s) => s.points)].sort(
      (a, b) => toY(a.social) - toY(b.social),
    );
    for (const point of points) {
      const cx = toX(point.economic);
      let y = toY(point.social) + 0.7;
      while (placed.some((q) => Math.abs(q.y - y) < 2.3 && Math.abs(q.x - cx) < 22)) {
        y += 2.4;
      }
      placed.push({ x: cx, y });
      result.set(point.id, y);
    }
    return result;
  }, [activeSets, showLabels]);

  /**
   * Cuándo entra cada punto, escalonado de izquierda a derecha.
   *
   * El orden es el del eje económico, no el del array ni el del pintado: la
   * nube se posa barriendo el cuadrante, que se lee como un gesto, en vez de
   * parpadear en desorden. Y se calcula aparte del `sort` del pintado —que
   * cambia al pasar el ratón— para que el retardo no dependa de dónde esté el
   * cursor.
   */
  const enterDelay = useMemo(() => {
    const points = activeSets.flatMap((set) => set.points);
    const order = [...points].sort((a, b) => a.economic - b.economic);
    const step = order.length > 24 ? 12 : 22;
    return new Map(order.map((p, i) => [p.id, Math.min(i * step, 700)]));
  }, [activeSets]);

  const toggleKind = (kind: ReferenceKind) =>
    setActiveKinds((cur) =>
      cur.includes(kind) ? cur.filter((k) => k !== kind) : [...cur, kind],
    );

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onPositionChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const y = 100 - ((e.clientY - rect.top) / rect.height) * 200;
    onPositionChange(
      Math.round(Math.max(-100, Math.min(100, x))),
      Math.round(Math.max(-100, Math.min(100, y))),
    );
  };

  return (
    <div>
      {showLayerControls && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Comparar con
          </span>
          {REFERENCE_SETS.map((set) => {
            const active = activeKinds.includes(set.kind);
            return (
              <button
                key={set.kind}
                type="button"
                onClick={() => toggleKind(set.kind)}
                aria-pressed={active}
                title={set.hint}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <svg viewBox="0 0 8 8" className="h-2.5 w-2.5" aria-hidden>
                  <path
                    d={MARKERS[set.kind](4, 4, 3)}
                    fill={active ? "currentColor" : "hsl(var(--muted-foreground))"}
                  />
                </svg>
                {set.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowUsers((v) => !v)}
            aria-pressed={showUsers}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              showUsers
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-primary/50" />
            Simpatizantes
          </button>
        </div>
      )}

      <div ref={quadrantRef} className="relative mx-auto aspect-square w-full max-w-2xl">
        <svg
          viewBox="0 0 100 100"
          className={`h-full w-full ${interactive ? "cursor-crosshair" : ""}`}
          onClick={handleClick}
          role="img"
          aria-label="Cuadrante político de dos ejes: libertad económica en horizontal y libertad social en vertical."
        >
          <rect x="0" y="0" width="100" height="100" className="fill-card" rx="3" />

          {/* Fondos de cuadrante, muy tenues: orientan sin competir con los datos. */}
          <rect x="50" y="0" width="50" height="50" className="fill-primary/[0.06]" />
          <rect x="0" y="0" width="50" height="50" className="fill-sky-500/[0.05]" />
          <rect x="0" y="50" width="50" height="50" className="fill-rose-500/[0.05]" />
          <rect x="50" y="50" width="50" height="50" className="fill-slate-500/[0.05]" />

          {[12.5, 25, 37.5, 62.5, 75, 87.5].map((pos) => (
            <g key={pos}>
              <line x1={pos} y1="0" x2={pos} y2="100" className="stroke-border/40" strokeWidth="0.12" />
              <line x1="0" y1={pos} x2="100" y2={pos} className="stroke-border/40" strokeWidth="0.12" />
            </g>
          ))}
          <g className={entering ? "quadrant-axis" : ""} style={{ transformOrigin: "50px 50px" }}>
            <line x1="50" y1="0" x2="50" y2="100" className="stroke-border" strokeWidth="0.35" />
            <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.35" />
          </g>

          <text x="50" y="3.2" textAnchor="middle" className="fill-muted-foreground text-[2.4px] font-medium">
            LIBERTAD SOCIAL
          </text>
          <text x="50" y="98.5" textAnchor="middle" className="fill-muted-foreground text-[2.4px] font-medium">
            CONTROL SOCIAL
          </text>
          <text x="2.4" y="50" textAnchor="middle" className="fill-muted-foreground text-[2.4px] font-medium" transform="rotate(-90, 2.4, 50)">
            INTERVENCIÓN
          </text>
          <text x="97.6" y="50" textAnchor="middle" className="fill-muted-foreground text-[2.4px] font-medium" transform="rotate(90, 97.6, 50)">
            LIBRE MERCADO
          </text>

          {QUADRANT_LABELS.map((q) => (
            <text
              key={q.label}
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className="fill-foreground/35 text-[2.1px] font-semibold"
            >
              {q.label}
            </text>
          ))}

          {showUsers &&
            mockUsers.map((user) => (
              <circle
                key={user.id}
                cx={toX(user.economic)}
                cy={toY(user.social)}
                r={activeSets.length > 0 ? 0.4 : 0.5}
                // The cloud is the subject when nothing else is plotted, and
                // context the moment a reference layer goes on top of it.
                className={activeSets.length > 0 ? "fill-primary/[0.12]" : "fill-primary/25"}
              />
            ))}

          {/* El punto señalado se dibuja el último para quedar por encima de los
              que lo rodean; con distintivos de tamaño real el solape importa. */}
          {activeSets
            .flatMap((set) => set.points)
            .sort((a, b) => Number(hovered?.id === a.id) - Number(hovered?.id === b.id))
            .map((point) => {
              const cx = toX(point.economic);
              const cy = toY(point.social);
              const isHovered = hovered?.id === point.id;
              return (
                <g
                  key={point.id}
                  onMouseEnter={() => setHovered(point)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(point)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${point.label}. Económico ${point.economic}, social ${point.social}. ${point.note}`}
                  className={`cursor-help focus:outline-none ${entering ? "quadrant-point" : ""}`}
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    animationDelay: entering ? `${enterDelay.get(point.id) ?? 0}ms` : undefined,
                  }}
                >
                  {/* Diana invisible: el distintivo es pequeño, el objetivo no. */}
                  <circle cx={cx} cy={cy} r="3.2" fill="transparent" />
                  <g
                    className="quadrant-marker"
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      transform: isHovered ? "scale(1.22)" : "scale(1)",
                    }}
                  >
                    <ReferenceMarker point={point} cx={cx} cy={cy} hovered={isHovered} />
                  </g>
                  {(showLabels || isHovered) && (
                    <text
                      // Past ~70% of the width the label would run off the
                      // viewBox and get clipped, so it flips to the other side.
                      x={cx > 70 ? cx - 3.4 : cx + 3.4}
                      y={isHovered && !showLabels ? cy + 0.7 : (labelY.get(point.id) ?? cy + 0.7)}
                      textAnchor={cx > 70 ? "end" : "start"}
                      className={`text-[1.9px] ${
                        isHovered ? "fill-foreground font-semibold" : "fill-foreground/75"
                      }`}
                      style={{ paintOrder: "stroke", stroke: "hsl(var(--card))", strokeWidth: 0.7 }}
                    >
                      {point.short}
                    </text>
                  )}
                </g>
              );
            })}

          {userPosition && (
            <g
              className={`pointer-events-none ${entering ? "quadrant-you" : ""}`}
              style={{
                transformOrigin: `${toX(userPosition.economic)}px ${toY(userPosition.social)}px`,
              }}
            >
              <circle
                cx={toX(userPosition.economic)}
                cy={toY(userPosition.social)}
                r="3.6"
                className={`fill-primary/25 ${animate ? "quadrant-you-halo" : ""}`}
                style={{
                  transformOrigin: `${toX(userPosition.economic)}px ${toY(userPosition.social)}px`,
                }}
              />
              <circle
                cx={toX(userPosition.economic)}
                cy={toY(userPosition.social)}
                r="1.9"
                className="fill-primary"
                stroke="hsl(var(--card))"
                strokeWidth="0.6"
              />
            </g>
          )}
        </svg>

        {hovered && (
          <div
            key={hovered.id}
            className={`pointer-events-none absolute z-20 w-52 -translate-x-1/2 rounded-xl border border-border bg-popover/95 p-3 shadow-elevated backdrop-blur-md ${
              animate ? "fade-in" : ""
            }`}
            style={{
              left: `${Math.min(Math.max(toX(hovered.economic), 16), 84)}%`,
              top: `${toY(hovered.social)}%`,
              transform: `translate(-50%, ${toY(hovered.social) > 55 ? "calc(-100% - 12px)" : "12px"})`,
            }}
          >
            <div className="flex items-start gap-2.5">
              <ReferenceAvatar point={hovered} size={30} />
              <p className="font-display text-sm font-semibold leading-tight text-popover-foreground">
                {hovered.label}
              </p>
            </div>
            <p className="mt-2 text-xs leading-snug text-muted-foreground">{hovered.note}</p>
            <p className="mt-2 font-display text-xs font-semibold tabular-nums text-primary">
              Económico {hovered.economic > 0 ? "+" : ""}
              {hovered.economic} · Social {hovered.social > 0 ? "+" : ""}
              {hovered.social}
            </p>
            {hovered.contested && (
              <p className="mt-1.5 text-[11px] italic text-muted-foreground">Posición discutida.</p>
            )}
          </div>
        )}
      </div>

      {activeSets.map((set) => (
        <div key={set.kind} className="mx-auto mt-6 max-w-2xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {set.label}
          </p>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {[...set.points]
              .sort((a, b) => b.economic - a.economic)
              .map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onMouseEnter={() => setHovered(point)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(point)}
                  onBlur={() => setHovered(null)}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    hovered?.id === point.id ? "bg-accent" : "hover:bg-accent/60"
                  }`}
                >
                  <ReferenceAvatar point={point} size={22} />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                    {point.short}
                  </span>
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                    {point.economic > 0 ? "+" : ""}
                    {point.economic}
                  </span>
                </button>
              ))}
          </div>
        </div>
      ))}

      {activeSets.length > 0 && (
        <div className="mx-auto mt-6 max-w-2xl space-y-1.5 border-t border-border pt-4">
          {activeSets.map((set) => (
            <p key={set.kind} className="flex gap-2 text-[11px] leading-snug text-muted-foreground">
              <svg viewBox="0 0 8 8" className="mt-1 h-2 w-2 shrink-0" aria-hidden>
                <path d={MARKERS[set.kind](4, 4, 3)} className="fill-foreground/70" />
              </svg>
              <span>
                <strong className="font-medium text-foreground">{set.label}:</strong> {set.basis}
              </span>
            </p>
          ))}
          <p className="pt-1 text-[11px] italic leading-snug text-muted-foreground">
            Posiciones orientativas, no puntuaciones oficiales de esas fuentes. Sirven para dar
            escala a tu resultado, no para zanjar debates.
          </p>
        </div>
      )}
    </div>
  );
}
