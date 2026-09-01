"use client";

import { useState, type ReactNode } from "react";
import { Minus, Plus, Locate } from "lucide-react";
import { ChoroplethLegend } from "./ChoroplethLegend";
import type { ChoroplethScale } from "@/lib/maps/scale";
import { getDictionary } from "@/i18n/getDictionary";
import { useLocale } from "@/i18n/Link";

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
