"use client";

import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Globe } from "lucide-react";

const WORLD_GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mock data for international supporters
const internationalSupporters = [
  { country: "Argentina", code: "ARG", count: 2847, flag: "🇦🇷" },
  { country: "Bolivia", code: "BOL", count: 1523, flag: "🇧🇴" },
  { country: "Perú", code: "PER", count: 1289, flag: "🇵🇪" },
  { country: "Venezuela", code: "VEN", count: 987, flag: "🇻🇪" },
  { country: "Colombia", code: "COL", count: 756, flag: "🇨🇴" },
  { country: "Ecuador", code: "ECU", count: 534, flag: "🇪🇨" },
  { country: "Chile", code: "CHL", count: 423, flag: "🇨🇱" },
  { country: "México", code: "MEX", count: 389, flag: "🇲🇽" },
  { country: "Cuba", code: "CUB", count: 312, flag: "🇨🇺" },
  { country: "Uruguay", code: "URY", count: 198, flag: "🇺🇾" },
  { country: "Paraguay", code: "PRY", count: 156, flag: "🇵🇾" },
  { country: "Estados Unidos", code: "USA", count: 145, flag: "🇺🇸" },
  { country: "Brasil", code: "BRA", count: 134, flag: "🇧🇷" },
  { country: "Italia", code: "ITA", count: 89, flag: "🇮🇹" },
  { country: "Alemania", code: "DEU", count: 67, flag: "🇩🇪" },
];

// Map ISO country names to our data
const countryNameMapping: Record<string, string> = {
  "Argentina": "ARG",
  "Bolivia": "BOL",
  "Peru": "PER",
  "Venezuela": "VEN",
  "Colombia": "COL",
  "Ecuador": "ECU",
  "Chile": "CHL",
  "Mexico": "MEX",
  "Cuba": "CUB",
  "Uruguay": "URY",
  "Paraguay": "PRY",
  "United States of America": "USA",
  "Brazil": "BRA",
  "Italy": "ITA",
  "Germany": "DEU",
  "Spain": "ESP",
};

export function InternationalMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const supportersByCode = useMemo(() => {
    const map: Record<string, { count: number; name: string }> = {};
    internationalSupporters.forEach((s) => {
      map[s.code] = { count: s.count, name: s.country };
    });
    return map;
  }, []);

  const maxCount = useMemo(() => {
    return Math.max(...internationalSupporters.map((s) => s.count), 1);
  }, []);

  const totalInternational = useMemo(() => {
    return internationalSupporters.reduce((acc, s) => acc + s.count, 0);
  }, []);

  const getCountryCode = (geoName: string): string | null => {
    return countryNameMapping[geoName] || null;
  };

  const getColor = (geoName: string): string => {
    if (geoName === "Spain") {
      return "hsl(var(--primary))";
    }
    
    const code = getCountryCode(geoName);
    if (!code || !supportersByCode[code]) {
      return "hsl(var(--muted))";
    }
    
    const count = supportersByCode[code].count;
    const intensity = Math.min(count / maxCount, 1);
    const opacity = 0.25 + intensity * 0.75;
    return `hsl(168 70% 45% / ${opacity})`;
  };

  const handleMouseEnter = (
    geo: { properties: { name: string } },
    event: React.MouseEvent
  ) => {
    const name = geo.properties.name;
    const code = getCountryCode(name);
    
    if (name === "Spain") {
      setTooltipContent("España: País de origen");
    } else if (code && supportersByCode[code]) {
      setTooltipContent(`${supportersByCode[code].name}: ${supportersByCode[code].count} simpatizantes`);
    } else {
      setTooltipContent(`${name}: Sin datos`);
    }
    
    setHoveredCountry(name);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltipContent("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground">
            Residentes internacionales
          </h4>
          <p className="text-sm text-muted-foreground">
            {totalInternational.toLocaleString()} simpatizantes de {internationalSupporters.length} países
          </p>
        </div>
      </div>

      {/* World Map */}
      <div className="relative w-full">
        {tooltipContent && (
          <div
            className="fixed z-50 px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-lg pointer-events-none"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 30,
            }}
          >
            {tooltipContent}
          </div>
        )}

        <div className="w-full aspect-[2/1]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [-40, 10],
              scale: 150,
            }}
            className="w-full h-full"
          >
            <ZoomableGroup center={[-40, 10]} zoom={1}>
              <Geographies geography={WORLD_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isHovered = hoveredCountry === geo.properties.name;
                    const isSpain = geo.properties.name === "Spain";
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => handleMouseEnter(geo, e)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            fill: getColor(geo.properties.name),
                            stroke: isSpain ? "hsl(var(--primary))" : "hsl(var(--border))",
                            strokeWidth: isSpain ? 1.5 : 0.3,
                            outline: "none",
                            transition: "all 0.2s ease",
                          },
                          hover: {
                            fill: isSpain ? "hsl(var(--primary))" : "hsl(168 70% 40%)",
                            stroke: "hsl(var(--primary))",
                            strokeWidth: 1,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "hsl(var(--primary))",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* Country ranking */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {internationalSupporters.slice(0, 10).map((country, index) => (
          <div
            key={country.code}
            className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-xl">{country.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {country.country}
              </p>
              <p className="text-xs text-muted-foreground">
                {country.count.toLocaleString()}
              </p>
            </div>
            <span className="text-xs font-medium text-primary">
              #{index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">España (origen)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-4 rounded bg-gradient-to-r from-primary/25 to-primary/100" />
          <span className="text-xs text-muted-foreground">Simpatizantes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-xs text-muted-foreground">Sin datos</span>
        </div>
      </div>
    </div>
  );
}
