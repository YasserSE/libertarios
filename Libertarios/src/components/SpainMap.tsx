"use client";

import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { mockUsers } from "@/data/mockRegisteredUsers";

const GEO_URL = "https://raw.githubusercontent.com/martgnz/es-atlas/master/es/provincias.json";

// Map province names from TopoJSON to our data
const provinceNameMapping: Record<string, string> = {
  "Araba/Álava": "Vitoria",
  "Álava": "Vitoria",
  "Alacant/Alicante": "Alicante",
  "Alicante/Alacant": "Alicante",
  "Almería": "Almería",
  "Ávila": "Ávila",
  "Badajoz": "Badajoz",
  "Balears, Illes": "Palma",
  "Illes Balears": "Palma",
  "Barcelona": "Barcelona",
  "Burgos": "Burgos",
  "Cáceres": "Cáceres",
  "Cádiz": "Cádiz",
  "Castelló/Castellón": "Castellón",
  "Castellón/Castelló": "Castellón",
  "Ciudad Real": "Ciudad Real",
  "Córdoba": "Córdoba",
  "Coruña, A": "La Coruña",
  "A Coruña": "La Coruña",
  "Cuenca": "Cuenca",
  "Girona": "Girona",
  "Granada": "Granada",
  "Guadalajara": "Guadalajara",
  "Gipuzkoa": "San Sebastián",
  "Guipúzcoa": "San Sebastián",
  "Huelva": "Huelva",
  "Huesca": "Huesca",
  "Jaén": "Jaén",
  "León": "León",
  "Lleida": "Lleida",
  "Rioja, La": "Logroño",
  "La Rioja": "Logroño",
  "Lugo": "Lugo",
  "Madrid": "Madrid",
  "Málaga": "Málaga",
  "Murcia": "Murcia",
  "Navarra": "Pamplona",
  "Ourense": "Ourense",
  "Asturias": "Oviedo",
  "Palencia": "Palencia",
  "Palmas, Las": "Las Palmas",
  "Las Palmas": "Las Palmas",
  "Pontevedra": "Pontevedra",
  "Salamanca": "Salamanca",
  "Santa Cruz de Tenerife": "Tenerife",
  "Cantabria": "Santander",
  "Segovia": "Segovia",
  "Sevilla": "Sevilla",
  "Soria": "Soria",
  "Tarragona": "Tarragona",
  "Teruel": "Teruel",
  "Toledo": "Toledo",
  "València/Valencia": "Valencia",
  "Valencia/València": "Valencia",
  "Valladolid": "Valladolid",
  "Bizkaia": "Bilbao",
  "Vizcaya": "Bilbao",
  "Zamora": "Zamora",
  "Zaragoza": "Zaragoza",
  "Ceuta": "Ceuta",
  "Melilla": "Melilla",
};

export function SpainMap() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate users per province
  const usersByProvince = useMemo(() => {
    const counts: Record<string, number> = {};
    mockUsers.forEach((user) => {
      counts[user.province] = (counts[user.province] || 0) + 1;
    });
    return counts;
  }, []);

  const maxUsers = useMemo(() => {
    return Math.max(...Object.values(usersByProvince), 1);
  }, [usersByProvince]);

  const getProvinceCount = (geoName: string): number => {
    // Try direct match first
    if (usersByProvince[geoName]) {
      return usersByProvince[geoName];
    }
    // Try mapped name
    const mappedName = provinceNameMapping[geoName];
    if (mappedName && usersByProvince[mappedName]) {
      return usersByProvince[mappedName];
    }
    return 0;
  };

  const getColor = (geoName: string): string => {
    const count = getProvinceCount(geoName);
    if (count === 0) return "hsl(var(--muted))";
    
    const intensity = Math.min(count / maxUsers, 1);
    // From light primary to full primary
    const opacity = 0.2 + intensity * 0.8;
    return `hsl(var(--primary) / ${opacity})`;
  };

  const handleMouseEnter = (
    geo: { properties: { name: string } },
    event: React.MouseEvent
  ) => {
    const name = geo.properties.name;
    const count = getProvinceCount(name);
    setHoveredProvince(name);
    setTooltipContent(`${name}: ${count} simpatizantes`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
    setTooltipContent("");
  };

  return (
    <div className="relative w-full">
      {/* Tooltip */}
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

      {/* Map */}
      <div className="w-full aspect-[4/3] max-w-3xl mx-auto">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [-3.7, 40.4],
            scale: 2200,
          }}
          className="w-full h-full"
        >
          <ZoomableGroup center={[-3.7, 40.4]} zoom={1}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHovered = hoveredProvince === geo.properties.name;
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
                          stroke: "hsl(var(--border))",
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "all 0.2s ease",
                        },
                        hover: {
                          fill: "hsl(var(--primary))",
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

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <span className="text-sm text-muted-foreground">Simpatizantes</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-xs text-muted-foreground">0</span>
        </div>
        <div className="w-24 h-4 rounded bg-gradient-to-r from-primary/20 to-primary" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{maxUsers}+</span>
        </div>
      </div>
    </div>
  );
}
