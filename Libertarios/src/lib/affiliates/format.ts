/** Shared number formatting, so every surface renders a figure the same way. */

export const formatCount = (n: number) => n.toLocaleString("es-ES");

/**
 * Affiliates per million inhabitants.
 *
 * Rounding to an integer turns every sparse country into a flat "0 por millón",
 * which reads as "nobody" rather than "few" — Ukraine's 15 affiliates over
 * 37,9 M is 0,4, not 0. Below 10 we keep one decimal; above it the decimal is
 * noise.
 */
export function formatPerMillion(value: number): string {
  if (value <= 0) return "0";
  if (value < 0.1) return "<0,1";
  if (value < 10) return value.toLocaleString("es-ES", { maximumFractionDigits: 1 });
  return Math.round(value).toLocaleString("es-ES");
}
