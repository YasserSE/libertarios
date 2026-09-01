/**
 * Sequential colour scale for the choropleths.
 *
 * One hue (the brand teal), five steps, light -> dark. The steps were generated
 * against the brand hue and validated with the data-viz ordinal checks
 * (monotone OKLCH lightness, adjacent delta-L >= 0.06, lightest step >= 2:1 against
 * the chart surface) in both light and dark mode — see `--choro-*` in
 * `globals.css`. Do not hand-edit a step without re-validating the ramp.
 */

export const CHOROPLETH_STEPS = 5;

/** CSS custom properties, so the ramp flips with the theme without JS. */
export const CHOROPLETH_FILLS = [
  "var(--choro-1)",
  "var(--choro-2)",
  "var(--choro-3)",
  "var(--choro-4)",
  "var(--choro-5)",
] as const;

/** Territories with no affiliates read as absent, never as "few". */
export const NO_DATA_FILL = "var(--choro-empty)";

export interface ChoroplethScale {
  /** Upper bound (inclusive) of each bin; length === CHOROPLETH_STEPS. */
  breaks: number[];
  /** Bin index 0..4 for a value, or -1 when there is no data. */
  binOf: (value: number) => number;
  /** Fill for a value, resolving to the no-data colour at zero. */
  fillOf: (value: number) => string;
  max: number;
}

/**
 * Quantile bins over the non-zero values.
 *
 * Affiliate counts are heavily right-skewed (Madrid alone is ~17% of Spain), so
 * equal-interval bins would collapse 45 provinces into the lightest class and
 * show nothing. Quantiles keep every class populated and the map readable.
 */
export function createChoroplethScale(values: number[]): ChoroplethScale {
  const present = values.filter((v) => v > 0).sort((a, b) => a - b);

  if (present.length === 0) {
    return { breaks: [], binOf: () => -1, fillOf: () => NO_DATA_FILL, max: 0 };
  }

  const max = present[present.length - 1];

  // Never ask for more classes than there are distinct values: with fewer, the
  // quantiles collapse onto each other and the darkest bin ends up empty — which
  // would leave the largest territory painted a mid step.
  const distinct = Array.from(new Set(present)).sort((a, b) => a - b);
  const steps = Math.min(CHOROPLETH_STEPS, distinct.length);

  const breaks: number[] = [];
  for (let i = 1; i <= steps; i++) {
    const idx = Math.ceil((distinct.length * i) / steps) - 1;
    breaks.push(distinct[Math.min(Math.max(idx, 0), distinct.length - 1)]);
  }

  // Anchor the top bin to the maximum, then walk down enforcing strict increase.
  // Resolving ties downwards (rather than pushing upper breaks up) keeps the
  // largest value inside the darkest class.
  breaks[steps - 1] = max;
  for (let i = steps - 2; i >= 0; i--) {
    breaks[i] = Math.min(breaks[i], breaks[i + 1] - 1);
  }

  const binOf = (value: number) => {
    if (value <= 0) return -1;
    for (let i = 0; i < breaks.length; i++) if (value <= breaks[i]) return i;
    return breaks.length - 1;
  };

  return {
    breaks,
    binOf,
    fillOf: (value: number) => {
      const bin = binOf(value);
      return bin < 0 ? NO_DATA_FILL : CHOROPLETH_FILLS[bin];
    },
    max,
  };
}

/** Human-readable range for a legend swatch, e.g. "1–21" or "3.118+". */
export function binLabel(scale: ChoroplethScale, index: number): string {
  const lower = index === 0 ? 1 : scale.breaks[index - 1] + 1;
  const upper = scale.breaks[index];
  if (index === scale.breaks.length - 1) return `${format(lower)}+`;
  return lower === upper ? format(lower) : `${format(lower)}–${format(upper)}`;
}

const format = (n: number) => n.toLocaleString("es-ES");
