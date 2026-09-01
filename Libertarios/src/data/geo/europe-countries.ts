import type { CountryMeta } from "@/lib/affiliates/types";

/**
 * Registry of the European countries the map can render.
 *
 * `numeric` matches `geo.id` in the world-atlas TopoJSON we draw from, and
 * `geoName` is the fallback used when a build of that atlas omits ids.
 * Population figures are UN 2024 estimates in millions.
 */
export const EUROPE_COUNTRIES: CountryMeta[] = [
  { code: "AL", alpha3: "ALB", numeric: "008", name: "Albania", geoName: "Albania", slug: "albania", flag: "🇦🇱", populationM: 2.8, hasRegionMap: false },
  { code: "AD", alpha3: "AND", numeric: "020", name: "Andorra", geoName: "Andorra", slug: "andorra", flag: "🇦🇩", populationM: 0.08, hasRegionMap: false },
  { code: "AT", alpha3: "AUT", numeric: "040", name: "Austria", geoName: "Austria", slug: "austria", flag: "🇦🇹", populationM: 9.1, hasRegionMap: false },
  { code: "BY", alpha3: "BLR", numeric: "112", name: "Bielorrusia", geoName: "Belarus", slug: "bielorrusia", flag: "🇧🇾", populationM: 9.2, hasRegionMap: false },
  { code: "BE", alpha3: "BEL", numeric: "056", name: "Bélgica", geoName: "Belgium", slug: "belgica", flag: "🇧🇪", populationM: 11.7, hasRegionMap: false },
  { code: "BA", alpha3: "BIH", numeric: "070", name: "Bosnia y Herzegovina", geoName: "Bosnia and Herz.", slug: "bosnia-herzegovina", flag: "🇧🇦", populationM: 3.2, hasRegionMap: false },
  { code: "BG", alpha3: "BGR", numeric: "100", name: "Bulgaria", geoName: "Bulgaria", slug: "bulgaria", flag: "🇧🇬", populationM: 6.4, hasRegionMap: false },
  { code: "HR", alpha3: "HRV", numeric: "191", name: "Croacia", geoName: "Croatia", slug: "croacia", flag: "🇭🇷", populationM: 3.9, hasRegionMap: false },
  { code: "CY", alpha3: "CYP", numeric: "196", name: "Chipre", geoName: "Cyprus", slug: "chipre", flag: "🇨🇾", populationM: 1.3, hasRegionMap: false },
  { code: "CZ", alpha3: "CZE", numeric: "203", name: "Chequia", geoName: "Czechia", slug: "chequia", flag: "🇨🇿", populationM: 10.9, hasRegionMap: false },
  { code: "DK", alpha3: "DNK", numeric: "208", name: "Dinamarca", geoName: "Denmark", slug: "dinamarca", flag: "🇩🇰", populationM: 5.9, hasRegionMap: false },
  { code: "EE", alpha3: "EST", numeric: "233", name: "Estonia", geoName: "Estonia", slug: "estonia", flag: "🇪🇪", populationM: 1.4, hasRegionMap: false },
  { code: "FI", alpha3: "FIN", numeric: "246", name: "Finlandia", geoName: "Finland", slug: "finlandia", flag: "🇫🇮", populationM: 5.6, hasRegionMap: false },
  { code: "FR", alpha3: "FRA", numeric: "250", name: "Francia", geoName: "France", slug: "francia", flag: "🇫🇷", populationM: 68.4, hasRegionMap: false },
  { code: "DE", alpha3: "DEU", numeric: "276", name: "Alemania", geoName: "Germany", slug: "alemania", flag: "🇩🇪", populationM: 84.5, hasRegionMap: false },
  { code: "GR", alpha3: "GRC", numeric: "300", name: "Grecia", geoName: "Greece", slug: "grecia", flag: "🇬🇷", populationM: 10.4, hasRegionMap: false },
  { code: "HU", alpha3: "HUN", numeric: "348", name: "Hungría", geoName: "Hungary", slug: "hungria", flag: "🇭🇺", populationM: 9.6, hasRegionMap: false },
  { code: "IS", alpha3: "ISL", numeric: "352", name: "Islandia", geoName: "Iceland", slug: "islandia", flag: "🇮🇸", populationM: 0.4, hasRegionMap: false },
  { code: "IE", alpha3: "IRL", numeric: "372", name: "Irlanda", geoName: "Ireland", slug: "irlanda", flag: "🇮🇪", populationM: 5.3, hasRegionMap: false },
  { code: "IT", alpha3: "ITA", numeric: "380", name: "Italia", geoName: "Italy", slug: "italia", flag: "🇮🇹", populationM: 58.8, hasRegionMap: false },
  { code: "XK", alpha3: "XKX", numeric: "383", name: "Kosovo", geoName: "Kosovo", slug: "kosovo", flag: "🇽🇰", populationM: 1.8, hasRegionMap: false },
  { code: "LV", alpha3: "LVA", numeric: "428", name: "Letonia", geoName: "Latvia", slug: "letonia", flag: "🇱🇻", populationM: 1.9, hasRegionMap: false },
  { code: "LI", alpha3: "LIE", numeric: "438", name: "Liechtenstein", geoName: "Liechtenstein", slug: "liechtenstein", flag: "🇱🇮", populationM: 0.04, hasRegionMap: false },
  { code: "LT", alpha3: "LTU", numeric: "440", name: "Lituania", geoName: "Lithuania", slug: "lituania", flag: "🇱🇹", populationM: 2.9, hasRegionMap: false },
  { code: "LU", alpha3: "LUX", numeric: "442", name: "Luxemburgo", geoName: "Luxembourg", slug: "luxemburgo", flag: "🇱🇺", populationM: 0.7, hasRegionMap: false },
  { code: "MT", alpha3: "MLT", numeric: "470", name: "Malta", geoName: "Malta", slug: "malta", flag: "🇲🇹", populationM: 0.6, hasRegionMap: false },
  { code: "MD", alpha3: "MDA", numeric: "498", name: "Moldavia", geoName: "Moldova", slug: "moldavia", flag: "🇲🇩", populationM: 2.5, hasRegionMap: false },
  { code: "MC", alpha3: "MCO", numeric: "492", name: "Mónaco", geoName: "Monaco", slug: "monaco", flag: "🇲🇨", populationM: 0.04, hasRegionMap: false },
  { code: "ME", alpha3: "MNE", numeric: "499", name: "Montenegro", geoName: "Montenegro", slug: "montenegro", flag: "🇲🇪", populationM: 0.6, hasRegionMap: false },
  { code: "NL", alpha3: "NLD", numeric: "528", name: "Países Bajos", geoName: "Netherlands", slug: "paises-bajos", flag: "🇳🇱", populationM: 17.9, hasRegionMap: false },
  { code: "MK", alpha3: "MKD", numeric: "807", name: "Macedonia del Norte", geoName: "North Macedonia", slug: "macedonia-del-norte", flag: "🇲🇰", populationM: 1.8, hasRegionMap: false },
  { code: "NO", alpha3: "NOR", numeric: "578", name: "Noruega", geoName: "Norway", slug: "noruega", flag: "🇳🇴", populationM: 5.5, hasRegionMap: false },
  { code: "PL", alpha3: "POL", numeric: "616", name: "Polonia", geoName: "Poland", slug: "polonia", flag: "🇵🇱", populationM: 36.7, hasRegionMap: false },
  { code: "PT", alpha3: "PRT", numeric: "620", name: "Portugal", geoName: "Portugal", slug: "portugal", flag: "🇵🇹", populationM: 10.6, hasRegionMap: false },
  { code: "RO", alpha3: "ROU", numeric: "642", name: "Rumanía", geoName: "Romania", slug: "rumania", flag: "🇷🇴", populationM: 19.0, hasRegionMap: false },
  { code: "SM", alpha3: "SMR", numeric: "674", name: "San Marino", geoName: "San Marino", slug: "san-marino", flag: "🇸🇲", populationM: 0.03, hasRegionMap: false },
  { code: "RS", alpha3: "SRB", numeric: "688", name: "Serbia", geoName: "Serbia", slug: "serbia", flag: "🇷🇸", populationM: 6.6, hasRegionMap: false },
  { code: "SK", alpha3: "SVK", numeric: "703", name: "Eslovaquia", geoName: "Slovakia", slug: "eslovaquia", flag: "🇸🇰", populationM: 5.4, hasRegionMap: false },
  { code: "SI", alpha3: "SVN", numeric: "705", name: "Eslovenia", geoName: "Slovenia", slug: "eslovenia", flag: "🇸🇮", populationM: 2.1, hasRegionMap: false },
  { code: "ES", alpha3: "ESP", numeric: "724", name: "España", geoName: "Spain", slug: "espana", flag: "🇪🇸", populationM: 48.4, hasRegionMap: true },
  { code: "SE", alpha3: "SWE", numeric: "752", name: "Suecia", geoName: "Sweden", slug: "suecia", flag: "🇸🇪", populationM: 10.6, hasRegionMap: false },
  { code: "CH", alpha3: "CHE", numeric: "756", name: "Suiza", geoName: "Switzerland", slug: "suiza", flag: "🇨🇭", populationM: 8.9, hasRegionMap: false },
  { code: "UA", alpha3: "UKR", numeric: "804", name: "Ucrania", geoName: "Ukraine", slug: "ucrania", flag: "🇺🇦", populationM: 37.9, hasRegionMap: false },
  { code: "GB", alpha3: "GBR", numeric: "826", name: "Reino Unido", geoName: "United Kingdom", slug: "reino-unido", flag: "🇬🇧", populationM: 68.3, hasRegionMap: false },
];

const byNumeric = new Map(EUROPE_COUNTRIES.map((c) => [c.numeric, c]));
const byAlpha3 = new Map(EUROPE_COUNTRIES.map((c) => [c.alpha3, c]));
const byGeoName = new Map(EUROPE_COUNTRIES.map((c) => [c.geoName.toLowerCase(), c]));
const byCode = new Map(EUROPE_COUNTRIES.map((c) => [c.code, c]));
const bySlug = new Map(EUROPE_COUNTRIES.map((c) => [c.slug, c]));

/** Extra names some TopoJSON builds use for the same country. */
const GEO_NAME_ALIASES: Record<string, string> = {
  "czech republic": "CZ",
  "republic of serbia": "RS",
  "bosnia and herzegovina": "BA",
  "macedonia": "MK",
  "the netherlands": "NL",
  "republic of moldova": "MD",
  "russian federation": "RU",
  "united kingdom of great britain and northern ireland": "GB",
};

/**
 * Resolve a TopoJSON feature to a registry entry.
 * Tries the numeric id, then alpha-3, then the display name and its aliases.
 */
export function resolveCountry(geo: {
  id?: string | number;
  properties?: Record<string, unknown>;
}): CountryMeta | undefined {
  const id = geo.id != null ? String(geo.id).padStart(3, "0") : undefined;
  if (id && byNumeric.has(id)) return byNumeric.get(id);

  const alpha3 = geo.properties?.iso_a3 ?? geo.properties?.ISO_A3;
  if (typeof alpha3 === "string" && byAlpha3.has(alpha3)) return byAlpha3.get(alpha3);

  const name = geo.properties?.name ?? geo.properties?.NAME;
  if (typeof name === "string") {
    const key = name.toLowerCase();
    if (byGeoName.has(key)) return byGeoName.get(key);
    const aliased = GEO_NAME_ALIASES[key];
    if (aliased) return byCode.get(aliased);
  }
  return undefined;
}

export const getCountryByCode = (code: string) => byCode.get(code.toUpperCase());
export const getCountryBySlug = (slug: string) => bySlug.get(slug.toLowerCase());
