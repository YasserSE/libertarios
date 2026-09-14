"use client";

import { useCallback, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { resolveCountry } from "@/data/geo/europe-countries";
import type { CountryStats } from "@/lib/affiliates/types";
import { createChoroplethScale } from "@/lib/maps/scale";
import { formatPerMillion, formatPublishedCount } from "@/lib/affiliates/format";
import { MapTooltip, type TooltipDatum } from "./MapTooltip";
import { MapCanvas } from "./MapCanvas";
import { useGeoJson } from "./useGeoJson";
import { cooperativeZoom } from "./cooperativeZoom";
import { getDictionary } from "@/i18n/getDictionary";
import { useLocale } from "@/i18n/Link";

/**
 * Vendored from world-atlas@2 into `public/geo`. Feature ids are ISO 3166-1
 * numeric codes, which is what `resolveCountry` matches on. Served from our own
 * origin so the map never depends on a third-party CDN being reachable.
 */
const WORLD_GEO_URL = "/geo/world-countries-110m.json";

interface EuropeMapProps {
  countries: CountryStats[];
  /** Code of the country currently highlighted, if any. */
  selected?: string | null;
  onSelect?: (code: string) => void;
}

/**
 * Choropleth of affiliates per European country.
 *
 * Countries outside the registry are still drawn, but recessively — they give
 * the eye a coastline to read Europe by without competing with the data.
 */
export function EuropeMap({ countries, selected, onSelect }: EuropeMapProps) {
  const dict = getDictionary(useLocale());
  const m = dict.map;
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipDatum | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const geo = useGeoJson(WORLD_GEO_URL);

  const byCode = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries],
  );
  const scale = useMemo(
    () => createChoroplethScale(countries.map((c) => c.count)),
    [countries],
  );

  const showTooltip = useCallback(
    (stats: CountryStats, event: { clientX: number; clientY: number }) => {
      setPointer({ x: event.clientX, y: event.clientY });
      setTooltip({
        title: `${stats.meta.flag} ${stats.meta.name}`,
        // Un cero de las vistas es «menos de cinco», no «nadie»: ver source.ts.
        subtitle: stats.count === 0 ? m.belowMinimum : undefined,
        rows:
          stats.count === 0
            ? []
            : [
                { label: m.supporters, value: stats.count.toLocaleString("es-ES") },
                { label: m.perMillion, value: formatPerMillion(stats.perMillion) },
                { label: m.last30, value: `+${stats.growth30d.toLocaleString("es-ES")}` },
              ],
        hint: stats.meta.hasRegionMap ? m.countryDetailHint : undefined,
      });
    },
    [m],
  );

  const clearTooltip = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <>
      <MapTooltip datum={tooltip} x={pointer.x} y={pointer.y} />

      <MapCanvas
        frame="h-[22rem] sm:h-[27rem] lg:h-[32rem] xl:h-[35rem]"
        scale={scale}
        unit={`${m.supporters} · ${dict.map.scopeEurope}`}
        onPointerLeave={clearTooltip}
        status={geo.status}
        empty={
          scale.breaks.length === 0 ? { title: m.emptyTitle, body: m.emptyBodyEurope } : null
        }
      >
        {({ zoom, center }) => (
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            // Rotated so the centroid of the drawn countries — not the
            // geographic centre of Europe — lands in the middle of the frame,
            // and scaled to fill it without clipping Iceland or Cyprus.
            projectionConfig={{ rotate: [-16, -55, 0], scale: 1080 }}
            width={800}
            height={700}
            className="h-full w-full"
            // Un dedo baja la página; el pellizco lo recibe d3 (ver cooperativeZoom).
            style={{ touchAction: "pan-y" }}
          >
            <ZoomableGroup
              center={center}
              zoom={zoom}
              minZoom={1}
              maxZoom={6}
              filterZoomEvent={cooperativeZoom}
              translateExtent={[
                [-400, -350],
                [1200, 1050],
              ]}
            >
              {geo.data && (
              <Geographies geography={geo.data}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const meta = resolveCountry(geo);
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
                              strokeWidth: 0.4,
                              opacity: 0.45,
                              outline: "none",
                            },
                            hover: { fill: "var(--choro-empty)", opacity: 0.45, outline: "none" },
                            pressed: { fill: "var(--choro-empty)", outline: "none" },
                          }}
                        />
                      );
                    }

                    const isActive = hovered === meta.code || selected === meta.code;
                    const fill = scale.fillOf(stats.count);
                    // Con menos de cinco no hay ficha que abrir, pero sí hay
                    // algo que decir; por eso se puede enfocar aunque no se
                    // pueda seleccionar.
                    const interactive = stats.count > 0;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        tabIndex={0}
                        role={interactive ? "button" : undefined}
                        aria-label={`${meta.name}: ${formatPublishedCount(stats.count)} ${m.supporters.toLowerCase()}`}
                        onMouseEnter={(e: React.MouseEvent) => {
                          setHovered(meta.code);
                          showTooltip(stats, e);
                        }}
                        onMouseMove={(e: React.MouseEvent) =>
                          setPointer({ x: e.clientX, y: e.clientY })
                        }
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
                        onClick={() => interactive && onSelect?.(meta.code)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (interactive && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            onSelect?.(meta.code);
                          }
                        }}
                        style={{
                          default: {
                            fill,
                            // A 2px surface ring keeps adjacent fills from reading
                            // as one shape where borders touch.
                            stroke: isActive ? "hsl(var(--foreground))" : "var(--choro-stroke)",
                            strokeWidth: isActive ? 1.4 : 0.5,
                            outline: "none",
                            transition: "fill 160ms ease, stroke-width 160ms ease",
                          },
                          hover: {
                            fill,
                            stroke: "hsl(var(--foreground))",
                            strokeWidth: 1.4,
                            outline: "none",
                            cursor: interactive ? "pointer" : "default",
                          },
                          pressed: { fill, stroke: "hsl(var(--foreground))", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              )}
            </ZoomableGroup>
          </ComposableMap>
        )}
      </MapCanvas>
    </>
  );
}
