/**
 * Generates the reference-data seed from the TypeScript geo registries, so the
 * database catalogue and the app can never drift apart. Run:
 *   npm run seed:gen
 */
import { EUROPE_COUNTRIES } from "@/data/geo/europe-countries";
import { SPAIN_PROVINCES } from "@/data/geo/spain-provinces";

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

const lines: string[] = [
  "-- GENERADO por scripts/gen-seed.ts — no editar a mano.",
  "-- Regenerar con: npm run seed:gen",
  "",
  "insert into public.countries (code, alpha3, numeric_code, name_es, geo_name, slug, flag, population, has_region_map) values",
];

lines.push(
  EUROPE_COUNTRIES.map(
    (c) =>
      `  (${q(c.code)}, ${q(c.alpha3)}, ${q(c.numeric)}, ${q(c.name)}, ${q(c.geoName)}, ` +
      `${q(c.slug)}, ${q(c.flag)}, ${Math.round(c.populationM * 1e6)}, ${c.hasRegionMap})`,
  ).join(",\n") +
    "\non conflict (code) do update set\n" +
    "  alpha3 = excluded.alpha3, numeric_code = excluded.numeric_code, name_es = excluded.name_es,\n" +
    "  geo_name = excluded.geo_name, slug = excluded.slug, flag = excluded.flag,\n" +
    "  population = excluded.population, has_region_map = excluded.has_region_map;\n",
);

lines.push("insert into public.regions (country_code, code, name, parent_name) values");
lines.push(
  SPAIN_PROVINCES.map(
    (p) => `  ('ES', ${q(p.code)}, ${q(p.name)}, ${q(p.parent)})`,
  ).join(",\n") +
    "\non conflict (country_code, code) do update set\n" +
    "  name = excluded.name, parent_name = excluded.parent_name;\n",
);

lines.push("insert into public.region_aliases (country_code, region_code, alias) values");
lines.push(
  SPAIN_PROVINCES.flatMap((p) => p.geoNames.map((a) => `  ('ES', ${q(p.code)}, ${q(a)})`)).join(
    ",\n",
  ) + "\non conflict (country_code, alias) do update set region_code = excluded.region_code;\n",
);

lines.push("select public.refresh_affiliate_stats();");

process.stdout.write(lines.join("\n") + "\n");
