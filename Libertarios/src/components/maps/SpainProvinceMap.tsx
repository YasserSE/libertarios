"use client";

import { useCallback, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { resolveProvince } from "@/data/geo/spain-provinces";
import type { RegionStats } from "@/lib/affiliates/types";
import { createChoroplethScale, type ChoroplethScale } from "@/lib/maps/scale";
import { MapTooltip, type TooltipDatum } from "./MapTooltip";
import { MapCanvas } from "./MapCanvas";
import { getDictionary } from "@/i18n/getDictionary";
import { useLocale } from "@/i18n/Link";

/**
 * Vendored from es-atlas (`es-atlas@0.6.0/es/provinces.json`) into `public/geo`.
 * Feature ids are INE province codes. Served from our own origin so the map
 * does not depend on a third-party CDN at render time — the previous
 * raw.githubusercontent URL had gone 404 and the map silently drew nothing.
 */
const SPAIN_GEO_URL = "/geo/es-provinces.json";

interface SpainProvinceMapProps {
  regions: RegionStats[];
  selected?: string | null;
  onSelect?: (code: string) => void;
}

/**
 * Choropleth of affiliates per Spanish province, on the same ramp as Europe.
 *
 * The Canary Islands sit ~1.100 km southwest of the mainland, so they get the
 * conventional inset rather than shrinking the peninsula to a third of the
 * frame. Both views share one projection-independent renderer and one scale, so
 * a province means the same colour wherever it is drawn.
 */
export function SpainProvinceMap({ regions, selected, onSelect }: SpainProvinceMapProps) {
  const dict = getDictionary(useLocale());
  const m = dict.map;
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipDatum | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const byCode = useMemo(() => new Map(regions.map((r) => [r.code, r])), [regions]);
  const scale = useMemo(
    () => createChoroplethScale(regions.map((r) => r.count)),
    [regions],
  );

  const showTooltip = useCallback(
    (stats: RegionStats, event: { clientX: number; clientY: number }) => {
      setPointer({ x: event.clientX, y: event.clientY });
      setTooltip({
        title: stats.meta.name,
        subtitle: stats.meta.parent,
        rows: [
          { label: m.supporters, value: stats.count.toLocaleString("es-ES") },
          { label: m.ofNational, value: `${(stats.share * 100).toFixed(1)}%` },
          { label: m.last30, value: `+${stats.growth30d.toLocaleString("es-ES")}` },
        ],
      });
    },
    [],
  );

  const clearTooltip = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  const provinces = (
    <Geographies geography={SPAIN_GEO_URL}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          const meta = resolveProvince(geo);
          const stats = meta ? byCode.get(meta.code) : undefined;

          if (!meta || !stats) {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                tabIndex={-1}
                style={{
                  default: {
                    fill: "var(--choro-empty)",
                    stroke: "var(--choro-stroke)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: { fill: "var(--choro-empty)", outline: "none" },
                  pressed: { fill: "var(--choro-empty)", outline: "none" },
                }}
              />
            );
          }

          const isActive = hovered === meta.code || selected === meta.code;
          const fill = scale.fillOf(stats.count);

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              tabIndex={0}
              role="button"
              aria-label={`${meta.name}: ${stats.count.toLocaleString("es-ES")} simpatizantes`}
              onMouseEnter={(e: React.MouseEvent) => {
                setHovered(meta.code);
                showTooltip(stats, e);
              }}
              onMouseMove={(e: React.MouseEvent) => setPointer({ x: e.clientX, y: e.clientY })}
              onMouseLeave={clearTooltip}
              onFocus={(e: React.FocusEvent<SVGPathElement>) => {
                const r = e.currentTarget.getBoundingClientRect();
                setHovered(meta.code);
                showTooltip(stats, {
                  clientX: r.left + r.width / 2,
                  clientY: r.top + r.height / 2,
                });
              }}
              onBlur={clearTooltip}
              onClick={() => onSelect?.(meta.code)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(meta.code);
                }
              }}
              style={{
                default: {
                  fill,
                  stroke: isActive ? "hsl(var(--foreground))" : "var(--choro-stroke)",
                  strokeWidth: isActive ? 1.4 : 0.6,
                  outline: "none",
                  transition: "fill 160ms ease, stroke-width 160ms ease",
                },
                hover: {
                  fill,
                  stroke: "hsl(var(--foreground))",
                  strokeWidth: 1.4,
                  outline: "none",
                  cursor: "pointer",
                },
                pressed: { fill, stroke: "hsl(var(--foreground))", outline: "none" },
              }}
            />
          );
        })
      }
    </Geographies>
  );

  return (
    <>
      <MapTooltip datum={tooltip} x={pointer.x} y={pointer.y} />

      <MapCanvas
        frame="h-[22rem] sm:h-[27rem] lg:h-[32rem] xl:h-[35rem]"
        scale={scale}
        unit={`${m.supporters} · ${m.scopeSpain}`}
        onPointerLeave={clearTooltip}
      >
        {({ zoom, center }) => (
          <>
            {/* Mainland, Balearics, Ceuta and Melilla */}
            <div className="absolute inset-0">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-2.6, 39.7], scale: 2500 }}
                width={800}
                height={640}
                className="h-full w-full"
              >
                <ZoomableGroup
                  center={center}
                  zoom={zoom}
                  minZoom={1}
                  maxZoom={6}
                  translateExtent={[
                    [-400, -320],
                    [1200, 960],
                  ]}
                >
                  {provinces}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Canary Islands inset — same scale, same colours, own frame. */}
            <div className="absolute bottom-3 left-3 w-[30%] max-w-[210px] overflow-hidden rounded-xl border border-border bg-background/70 backdrop-blur-sm">
              <div className="aspect-[3/2]">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ center: [-15.6, 28.3], scale: 2450 }}
                  width={300}
                  height={200}
                  className="h-full w-full"
                >
                  {provinces}
                </ComposableMap>
              </div>
              <span className="pointer-events-none absolute left-2 top-1.5 text-[10px] font-medium text-muted-foreground">
                Canarias
              </span>
            </div>
          </>
        )}
      </MapCanvas>
    </>
  );
}

export type { ChoroplethScale };
