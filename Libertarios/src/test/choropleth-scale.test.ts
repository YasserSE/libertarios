import { describe, it, expect } from "vitest";
import {
  CHOROPLETH_FILLS,
  CHOROPLETH_STEPS,
  NO_DATA_FILL,
  binLabel,
  createChoroplethScale,
} from "@/lib/maps/scale";

describe("createChoroplethScale", () => {
  it("treats zero as no data rather than the lightest bin", () => {
    const scale = createChoroplethScale([0, 10, 20, 30, 40, 50]);
    expect(scale.binOf(0)).toBe(-1);
    expect(scale.fillOf(0)).toBe(NO_DATA_FILL);
  });

  it("produces one break per step, strictly increasing", () => {
    const scale = createChoroplethScale([1, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(scale.breaks).toHaveLength(CHOROPLETH_STEPS);
    for (let i = 1; i < scale.breaks.length; i++) {
      expect(scale.breaks[i]).toBeGreaterThan(scale.breaks[i - 1]);
    }
  });

  it("keeps every bin reachable on a heavily skewed distribution", () => {
    // Spain-shaped: one dominant territory, a long tail of small ones.
    const values = [3118, 2184, 1142, 764, 691, ...Array.from({ length: 40 }, (_, i) => i + 15)];
    const scale = createChoroplethScale(values);
    const used = new Set(values.filter((v) => v > 0).map((v) => scale.binOf(v)));
    expect(used.size).toBe(CHOROPLETH_STEPS);
  });

  it("puts the maximum in the darkest step of the full ramp", () => {
    const scale = createChoroplethScale([5, 50, 500, 5000, 9000, 12000]);
    expect(scale.breaks).toHaveLength(CHOROPLETH_STEPS);
    expect(scale.fillOf(12000)).toBe(CHOROPLETH_FILLS[CHOROPLETH_STEPS - 1]);
    expect(scale.max).toBe(12000);
  });

  it("uses fewer classes than the ramp when there are fewer distinct values", () => {
    const scale = createChoroplethScale([5, 50, 500, 5000]);
    expect(scale.breaks).toHaveLength(4);
    // The largest value must still land in the darkest class in use.
    expect(scale.binOf(5000)).toBe(scale.breaks.length - 1);
    expect(scale.fillOf(5000)).toBe(CHOROPLETH_FILLS[3]);
  });

  it("degrades safely when nothing has data", () => {
    const scale = createChoroplethScale([0, 0, 0]);
    expect(scale.breaks).toEqual([]);
    expect(scale.fillOf(0)).toBe(NO_DATA_FILL);
  });

  it("labels the last bin as open-ended and the rest as ranges", () => {
    const scale = createChoroplethScale([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(binLabel(scale, CHOROPLETH_STEPS - 1)).toMatch(/\+$/);
    expect(binLabel(scale, 0)).not.toMatch(/\+$/);
  });
});
