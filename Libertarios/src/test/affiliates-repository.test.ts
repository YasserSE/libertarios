import { describe, it, expect } from "vitest";
import {
  getCountrySnapshot,
  getCountrySnapshotBySlug,
  getEuropeSnapshot,
  getRankedCountries,
} from "@/lib/affiliates/repository";
import { formatPerMillion } from "@/lib/affiliates/format";
import { EUROPE_COUNTRIES, resolveCountry } from "@/data/geo/europe-countries";
import { SPAIN_PROVINCES, resolveProvince } from "@/data/geo/spain-provinces";

describe("affiliate repository", () => {
  it("derives Spain's total from its provinces", () => {
    const spain = getCountrySnapshot("ES")!;
    const fromRegions = spain.regions.reduce((a, r) => a + r.count, 0);
    expect(spain.count).toBe(fromRegions);
  });

  // A country with subdivisions must be exactly the sum of them — in the
  // database the aggregate can only be the sum, so a mock that derives the
  // country figure independently would disagree with production.
  it("aggregates every Spain-level figure from its provinces", () => {
    const spain = getCountrySnapshot("ES")!;

    expect(spain.growth30d).toBe(spain.regions.reduce((a, r) => a + r.growth30d, 0));

    const total = spain.count;
    const economic = Math.round(
      spain.regions.reduce((a, r) => a + r.position.economic * r.count, 0) / total,
    );
    const social = Math.round(
      spain.regions.reduce((a, r) => a + r.position.social * r.count, 0) / total,
    );
    expect(spain.position).toEqual({ economic, social });
  });

  it("ranks countries by count, Spain first", () => {
    const ranked = getRankedCountries();
    expect(ranked[0].code).toBe("ES");
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].count).toBeGreaterThanOrEqual(ranked[i].count);
    }
  });

  it("makes region shares sum to 1", () => {
    const spain = getCountrySnapshot("ES")!;
    const total = spain.regions.reduce((a, r) => a + r.share, 0);
    expect(total).toBeCloseTo(1, 6);
  });

  it("returns identical snapshots on repeated calls, so SSR and the client agree", () => {
    expect(getEuropeSnapshot()).toEqual(getEuropeSnapshot());
  });

  it("resolves a country by slug", () => {
    expect(getCountrySnapshotBySlug("espana")?.code).toBe("ES");
    expect(getCountrySnapshotBySlug("no-existe")).toBeUndefined();
  });

  it("keeps mean positions inside the quadrant's range", () => {
    for (const c of getEuropeSnapshot().countries) {
      expect(c.position.economic).toBeGreaterThanOrEqual(-100);
      expect(c.position.economic).toBeLessThanOrEqual(100);
      expect(c.position.social).toBeGreaterThanOrEqual(-100);
      expect(c.position.social).toBeLessThanOrEqual(100);
    }
  });
});

describe("geo registries", () => {
  it("has unique country codes, slugs and numeric ids", () => {
    for (const key of ["code", "slug", "numeric", "alpha3"] as const) {
      const values = EUROPE_COUNTRIES.map((c) => c[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("covers all 52 Spanish provinces with unique INE codes", () => {
    expect(SPAIN_PROVINCES).toHaveLength(52);
    expect(new Set(SPAIN_PROVINCES.map((p) => p.code)).size).toBe(52);
  });

  it("resolves TopoJSON features by numeric id and by name", () => {
    expect(resolveCountry({ id: "724" })?.code).toBe("ES");
    expect(resolveCountry({ id: 250 })?.code).toBe("FR");
    expect(resolveCountry({ properties: { name: "Czech Republic" } })?.code).toBe("CZ");
    expect(resolveCountry({ properties: { name: "Atlantis" } })).toBeUndefined();
  });

  it("resolves provinces by INE id and by every bilingual spelling", () => {
    expect(resolveProvince({ id: "28" })?.name).toBe("Madrid");
    expect(resolveProvince({ properties: { name: "Araba/Álava" } })?.code).toBe("01");
    expect(resolveProvince({ properties: { name: "Vizcaya" } })?.code).toBe("48");
    expect(resolveProvince({ properties: { name: "Coruña, A" } })?.code).toBe("15");
  });
});

describe("formatPerMillion", () => {
  it("never rounds a sparse country down to a bare 0", () => {
    // Ukraine: 15 affiliates over 37,9 M inhabitants.
    expect(formatPerMillion(0.4)).toBe("0,4");
    expect(formatPerMillion(0.04)).toBe("<0,1");
    expect(formatPerMillion(0)).toBe("0");
  });

  it("drops the decimal once it stops carrying information", () => {
    expect(formatPerMillion(9.4)).toBe("9,4");
    expect(formatPerMillion(315)).toBe("315");
  });

  it("gives every country with affiliates a non-zero reading", () => {
    for (const c of getRankedCountries()) {
      expect(formatPerMillion(c.perMillion)).not.toBe("0");
    }
  });
});
