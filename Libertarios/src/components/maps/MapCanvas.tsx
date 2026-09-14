"use client";

import { useState, type ReactNode } from "react";
import { Loader2, Minus, Plus, Locate, MapPinOff } from "lucide-react";
import { ChoroplethLegend } from "./ChoroplethLegend";
import type { ChoroplethScale } from "@/lib/maps/scale";
import { getDictionary } from "@/i18n/getDictionary";
import { useLocale } from "@/i18n/Link";
import type { GeoStatus } from "./useGeoJson";

interface MapCanvasProps {
  /**
   * Tailwind sizing classes for the plot area. Prefer explicit heights over
   * aspect ratios: the map column is much wider in the hero than on /datos, and
   * an aspect ratio there produces a frame taller than the viewport.
   */
  frame: string;
  scale: ChoroplethScale;
  unit: string;
  initialCenter?: [number, number];
  onPointerLeave?: () => void;
  /** Estado de la descarga del TopoJSON; gobierna el aviso sobre el mapa. */
  status?: GeoStatus;
  /**
   * Mensaje cuando no hay ningún territorio publicable. Va sobre el mapa —no
   * debajo— porque es la explicación de por qué todo está gris, y tiene que
   * verse en el mismo sitio donde se mira el gris.
   */
  empty?: { title: string; body: string } | null;
  children: (state: { zoom: number; center: [number, number] }) => ReactNode;
}

const ZOOM_STEP = 1.5;
const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

/**
 * Shared shell for the choropleths: surface, zoom controls and legend.
 *
 * Keeps the two maps visually identical so switching scope feels like the same
 * object changing, not a different component.
 */
export function MapCanvas({
  frame,
  scale,
  unit,
  initialCenter = [0, 0],
  onPointerLeave,
  status = "ready",
  empty = null,
  children,
}: MapCanvasProps) {
  const m = getDictionary(useLocale()).map;
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(initialCenter);

  const reset = () => {
    setZoom(1);
    setCenter(initialCenter);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      {/* Recessive grid backdrop — gives the landmass something to sit on
          without adding a second data-bearing colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 78%)",
        }}
      />

      <div className={`relative ${frame}`} onMouseLeave={onPointerLeave}>
        {children({ zoom, center })}

        {/*
          Los tres avisos comparten sitio y estilo porque son la misma cosa
          para quien mira: «el mapa no enseña datos, y esta es la razón». El
          de carga y el de error son transitorios; el de vacío se queda, y por
          eso deja pasar el puntero: el mapa gris sigue siendo explorable.
        */}
        {status === "loading" && (
          <div
            role="status"
            className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-[2px]"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow-soft">
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
              {m.loading}
            </p>
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="absolute inset-0 flex items-center justify-center p-6">
            <p className="max-w-xs rounded-2xl border border-border bg-background/95 px-5 py-4 text-center text-sm text-foreground shadow-card">
              {m.loadError}
            </p>
          </div>
        )}
        {status === "ready" && empty && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-sm rounded-2xl border border-border bg-background/95 px-5 py-4 text-center shadow-card">
              <MapPinOff className="mx-auto mb-2 h-5 w-5 text-muted-foreground" aria-hidden />
              <p className="font-display text-sm font-semibold text-foreground">{empty.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{empty.body}</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-xl border border-border bg-background/85 p-1 shadow-soft backdrop-blur">
        <ZoomButton
          label={m.zoomIn}
          onClick={() => setZoom((z) => Math.min(z * ZOOM_STEP, MAX_ZOOM))}
          disabled={zoom >= MAX_ZOOM}
        >
          <Plus className="h-4 w-4" />
        </ZoomButton>
        <ZoomButton
          label={m.zoomOut}
          onClick={() => setZoom((z) => Math.max(z / ZOOM_STEP, MIN_ZOOM))}
          disabled={zoom <= MIN_ZOOM}
        >
          <Minus className="h-4 w-4" />
        </ZoomButton>
        <ZoomButton label={m.reset} onClick={reset} disabled={zoom === 1}>
          <Locate className="h-4 w-4" />
        </ZoomButton>
      </div>

      <div className="border-t border-border bg-background/40 px-5 py-4">
        <ChoroplethLegend scale={scale} unit={unit} />
      </div>
    </div>
  );
}

function ZoomButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
