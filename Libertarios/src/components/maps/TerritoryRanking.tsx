"use client";

export interface RankingRow {
  code: string;
  label: string;
  sublabel?: string;
  count: number;
  share: number;
}

interface TerritoryRankingProps {
  rows: RankingRow[];
  selected?: string | null;
  onSelect?: (code: string) => void;
  onHover?: (code: string | null) => void;
}

/**
 * Ranked bars for the territories on the map.
 *
 * One hue for every bar: length already encodes magnitude, so spending the
 * colour channel on it again would say nothing new. Every row is direct-labelled
 * with its count, which is also what makes the sub-3:1 lightest map bins legible.
 */
export function TerritoryRanking({ rows, selected, onSelect, onHover }: TerritoryRankingProps) {
  const max = rows.length > 0 ? rows[0].count : 1;

  return (
    <ol className="space-y-1">
      {rows.map((row, i) => {
        const isActive = selected === row.code;
        return (
          <li key={row.code} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => onSelect?.(row.code)}
              onMouseEnter={() => onHover?.(row.code)}
              onMouseLeave={() => onHover?.(null)}
              onFocus={() => onHover?.(row.code)}
              onBlur={() => onHover?.(null)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive ? "bg-accent" : "hover:bg-accent/60"
              }`}
            >
              <span className="w-4 shrink-0 text-right font-display text-xs font-semibold tabular-nums text-muted-foreground">
                {i + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium text-foreground">{row.label}</span>
                  <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-foreground">
                    {row.count.toLocaleString("es-ES")}
                  </span>
                </span>

                {/* 3px mark, 4px rounded end, anchored to a full-width track. */}
                <span className="mt-1.5 block h-[3px] w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.max((row.count / max) * 100, 1.5)}%` }}
                  />
                </span>

                <span className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11px] text-muted-foreground">
                    {row.sublabel}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                    {(row.share * 100).toFixed(1)}%
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
