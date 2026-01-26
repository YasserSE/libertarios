"use client";

import { useMemo } from "react";
import { mockUsers } from "@/data/mockRegisteredUsers";

interface InteractiveQuadrantProps {
  userPosition?: { economic: number; social: number } | null;
  showAllUsers?: boolean;
  interactive?: boolean;
  onPositionChange?: (economic: number, social: number) => void;
}

export function InteractiveQuadrant({
  userPosition,
  showAllUsers = true,
  interactive = false,
  onPositionChange,
}: InteractiveQuadrantProps) {
  
  const quadrantLabels = useMemo(() => [
    { x: 75, y: 25, label: "Libertario", sublabel: "Libre mercado + Libertad social" },
    { x: 25, y: 25, label: "Liberal social", sublabel: "Intervención + Libertad social" },
    { x: 25, y: 75, label: "Autoritario de izquierda", sublabel: "Intervención + Control social" },
    { x: 75, y: 75, label: "Autoritario de derecha", sublabel: "Libre mercado + Control social" },
  ], []);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onPositionChange) return;
    
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const y = 100 - ((e.clientY - rect.top) / rect.height) * 200;
    
    onPositionChange(
      Math.round(Math.max(-100, Math.min(100, x))),
      Math.round(Math.max(-100, Math.min(100, y)))
    );
  };

  const toSvgX = (economic: number) => ((economic + 100) / 200) * 100;
  const toSvgY = (social: number) => 100 - ((social + 100) / 200) * 100;

  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${interactive ? 'cursor-crosshair' : ''}`}
        onClick={handleClick}
      >
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" className="fill-card" rx="4" />
        
        {/* Spain silhouette as background */}
        <g transform="translate(15, 15) scale(0.7)">
          <path
            d="M 15 20 
               C 15 12, 25 8, 40 10 
               L 60 8 
               C 75 6, 90 12, 95 20 
               L 98 35 
               C 100 50, 95 65, 88 80 
               L 82 95 
               C 75 108, 60 115, 45 115 
               L 25 110 
               C 12 106, 5 98, 3 85 
               L 0 55 
               C -2 35, 5 22, 15 20 Z"
            className="fill-primary/[0.07]"
          />
        </g>
        
        {/* Quadrant backgrounds with subtle colors */}
        <rect x="50" y="0" width="50" height="50" className="fill-primary/5" />
        <rect x="0" y="0" width="50" height="50" className="fill-blue-500/5" />
        <rect x="0" y="50" width="50" height="50" className="fill-red-500/5" />
        <rect x="50" y="50" width="50" height="50" className="fill-slate-500/5" />
        
        {/* Grid lines */}
        <line x1="50" y1="0" x2="50" y2="100" className="stroke-border" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.3" />
        
        {/* Subtle grid */}
        {[25, 75].map((pos) => (
          <g key={pos}>
            <line x1={pos} y1="0" x2={pos} y2="100" className="stroke-border/30" strokeWidth="0.15" strokeDasharray="1,1" />
            <line x1="0" y1={pos} x2="100" y2={pos} className="stroke-border/30" strokeWidth="0.15" strokeDasharray="1,1" />
          </g>
        ))}
        
        {/* Axis labels */}
        <text x="50" y="3" textAnchor="middle" className="fill-muted-foreground text-[2.5px] font-medium">
          LIBERTAD SOCIAL
        </text>
        <text x="50" y="99" textAnchor="middle" className="fill-muted-foreground text-[2.5px] font-medium">
          AUTORITARISMO
        </text>
        <text x="2" y="50" textAnchor="start" className="fill-muted-foreground text-[2.5px] font-medium" transform="rotate(-90, 2, 50)">
          INTERVENCIÓN
        </text>
        <text x="98" y="50" textAnchor="end" className="fill-muted-foreground text-[2.5px] font-medium" transform="rotate(90, 98, 50)">
          LIBRE MERCADO
        </text>
        
        {/* Quadrant labels */}
        {quadrantLabels.map((label, i) => (
          <g key={i}>
            <text
              x={label.x}
              y={label.y - 2}
              textAnchor="middle"
              className="fill-foreground/70 text-[2.2px] font-semibold"
            >
              {label.label}
            </text>
            <text
              x={label.x}
              y={label.y + 1}
              textAnchor="middle"
              className="fill-muted-foreground text-[1.5px]"
            >
              {label.sublabel}
            </text>
          </g>
        ))}
        
        {/* All registered users as dots */}
        {showAllUsers && mockUsers.map((user, i) => (
          <circle
            key={user.id}
            cx={toSvgX(user.economic)}
            cy={toSvgY(user.social)}
            r="0.6"
            className="fill-primary/30"
            style={{ 
              animationDelay: `${i * 0.002}s`,
            }}
          />
        ))}
        
        {/* User position marker */}
        {userPosition && (
          <g>
            {/* Glow effect */}
            <circle
              cx={toSvgX(userPosition.economic)}
              cy={toSvgY(userPosition.social)}
              r="4"
              className="fill-primary/20 animate-pulse"
            />
            {/* Main marker */}
            <circle
              cx={toSvgX(userPosition.economic)}
              cy={toSvgY(userPosition.social)}
              r="2"
              className="fill-primary stroke-primary-foreground"
              strokeWidth="0.5"
            />
            {/* Center dot */}
            <circle
              cx={toSvgX(userPosition.economic)}
              cy={toSvgY(userPosition.social)}
              r="0.8"
              className="fill-primary-foreground"
            />
          </g>
        )}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <span className="text-muted-foreground">Simpatizantes registrados</span>
        </div>
        {userPosition && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-foreground font-medium">Tu posición</span>
          </div>
        )}
      </div>
    </div>
  );
}
