"use client";

import { useEffect, useRef, useState } from "react";

export interface TooltipDatum {
  title: string;
  subtitle?: string;
  rows: { label: string; value: string }[];
  hint?: string;
}

interface MapTooltipProps {
  datum: TooltipDatum | null;
  /** Viewport coordinates of the pointer. */
  x: number;
  y: number;
}

const OFFSET = 16;

/**
 * Pointer-following tooltip for the choropleths.
 *
 * Positioned in viewport coordinates and flipped near the edges so it never
 * runs off screen; measured after paint rather than guessed, so long territory
 * names still flip correctly.
 */
export function MapTooltip({ datum, x, y }: MapTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 220, h: 120 });

  useEffect(() => {
    if (!ref.current || !datum) return;
    const rect = ref.current.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
  }, [datum]);

  if (!datum) return null;

  const flipX = typeof window !== "undefined" && x + OFFSET + size.w > window.innerWidth - 8;
  const flipY = typeof window !== "undefined" && y + OFFSET + size.h > window.innerHeight - 8;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-50 min-w-[11rem] max-w-[16rem] rounded-xl border border-border/80 bg-popover/95 p-3 shadow-elevated backdrop-blur-md"
      style={{
        left: flipX ? x - OFFSET - size.w : x + OFFSET,
        top: flipY ? y - OFFSET - size.h : y + OFFSET,
      }}
    >
      <p className="font-display text-sm font-semibold leading-tight text-popover-foreground">
        {datum.title}
      </p>
      {datum.subtitle && (
        <p className="mt-0.5 text-xs text-muted-foreground">{datum.subtitle}</p>
      )}
      <dl className="mt-2 space-y-1">
        {datum.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="font-display text-xs font-semibold tabular-nums text-popover-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {datum.hint && (
        <p className="mt-2 border-t border-border/60 pt-2 text-[11px] font-medium text-primary">
          {datum.hint}
        </p>
      )}
    </div>
  );
}
