"use client";

import { CHOROPLETH_FILLS, NO_DATA_FILL, binLabel, type ChoroplethScale } from "@/lib/maps/scale";
import { getDictionary } from "@/i18n/getDictionary";
import { useLocale } from "@/i18n/Link";

interface ChoroplethLegendProps {
  scale: ChoroplethScale;
  /** What one unit of the scale counts, e.g. "simpatizantes". */
  unit: string;
}

/**
 * Binned legend for the sequential ramp.
 *
 * Each swatch carries its own numeric range, so magnitude is never encoded by
 * colour alone — the ranges are readable in greyscale and by screen readers.
 */
export function ChoroplethLegend({ scale, unit }: ChoroplethLegendProps) {
  const m = getDictionary(useLocale()).map;
  if (scale.breaks.length === 0) return null;

  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {unit}
        </p>
        <div className="flex items-end">
          {/* One swatch per break, not per ramp step: with few distinct values
              the scale uses fewer classes and the legend must match it. */}
          {scale.breaks.map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className="block h-3 w-11 first:rounded-l-sm last:rounded-r-sm sm:w-14"
                style={{ background: CHOROPLETH_FILLS[i] }}
              />
              <span className="mt-1 text-[10px] tabular-nums text-muted-foreground sm:text-[11px]">
                {binLabel(scale, i)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pb-4">
        <span
          className="block h-3 w-6 rounded-sm border border-border"
          style={{ background: NO_DATA_FILL }}
        />
        <span className="text-[11px] text-muted-foreground">{m.noData}</span>
      </div>
    </div>
  );
}
