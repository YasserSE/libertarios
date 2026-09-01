import type { RegionMeta } from "@/lib/affiliates/types";

/**
 * The 50 Spanish provinces plus Ceuta and Melilla.
 *
 * `code` is the 2-digit INE province code, which is also the feature id in the
 * es-atlas TopoJSON we draw. `geoNames` lists every spelling that atlas (and
 * its bilingual variants) uses, so name-based matching never silently misses.
 */
export interface ProvinceMeta extends RegionMeta {
  geoNames: string[];
}

export const SPAIN_PROVINCES: ProvinceMeta[] = [
  { code: "01", name: "Álava", country: "ES", parent: "País Vasco", geoNames: ["Araba/Álava", "Álava", "Araba"] },
  { code: "02", name: "Albacete", country: "ES", parent: "Castilla-La Mancha", geoNames: ["Albacete"] },
  { code: "03", name: "Alicante", country: "ES", parent: "Comunidad Valenciana", geoNames: ["Alicante/Alacant", "Alacant/Alicante", "Alicante"] },
  { code: "04", name: "Almería", country: "ES", parent: "Andalucía", geoNames: ["Almería"] },
  { code: "05", name: "Ávila", country: "ES", parent: "Castilla y León", geoNames: ["Ávila"] },
  { code: "06", name: "Badajoz", country: "ES", parent: "Extremadura", geoNames: ["Badajoz"] },
  { code: "07", name: "Illes Balears", country: "ES", parent: "Illes Balears", geoNames: ["Balears, Illes", "Illes Balears", "Baleares"] },
  { code: "08", name: "Barcelona", country: "ES", parent: "Cataluña", geoNames: ["Barcelona"] },
  { code: "09", name: "Burgos", country: "ES", parent: "Castilla y León", geoNames: ["Burgos"] },
  { code: "10", name: "Cáceres", country: "ES", parent: "Extremadura", geoNames: ["Cáceres"] },
  { code: "11", name: "Cádiz", country: "ES", parent: "Andalucía", geoNames: ["Cádiz"] },
  { code: "12", name: "Castellón", country: "ES", parent: "Comunidad Valenciana", geoNames: ["Castellón/Castelló", "Castelló/Castellón", "Castellón"] },
  { code: "13", name: "Ciudad Real", country: "ES", parent: "Castilla-La Mancha", geoNames: ["Ciudad Real"] },
  { code: "14", name: "Córdoba", country: "ES", parent: "Andalucía", geoNames: ["Córdoba"] },
  { code: "15", name: "A Coruña", country: "ES", parent: "Galicia", geoNames: ["Coruña, A", "A Coruña", "La Coruña"] },
  { code: "16", name: "Cuenca", country: "ES", parent: "Castilla-La Mancha", geoNames: ["Cuenca"] },
  { code: "17", name: "Girona", country: "ES", parent: "Cataluña", geoNames: ["Girona"] },
  { code: "18", name: "Granada", country: "ES", parent: "Andalucía", geoNames: ["Granada"] },
  { code: "19", name: "Guadalajara", country: "ES", parent: "Castilla-La Mancha", geoNames: ["Guadalajara"] },
  { code: "20", name: "Gipuzkoa", country: "ES", parent: "País Vasco", geoNames: ["Gipuzkoa", "Guipúzcoa"] },
  { code: "21", name: "Huelva", country: "ES", parent: "Andalucía", geoNames: ["Huelva"] },
  { code: "22", name: "Huesca", country: "ES", parent: "Aragón", geoNames: ["Huesca"] },
  { code: "23", name: "Jaén", country: "ES", parent: "Andalucía", geoNames: ["Jaén"] },
  { code: "24", name: "León", country: "ES", parent: "Castilla y León", geoNames: ["León"] },
  { code: "25", name: "Lleida", country: "ES", parent: "Cataluña", geoNames: ["Lleida"] },
  { code: "26", name: "La Rioja", country: "ES", parent: "La Rioja", geoNames: ["Rioja, La", "La Rioja"] },
  { code: "27", name: "Lugo", country: "ES", parent: "Galicia", geoNames: ["Lugo"] },
  { code: "28", name: "Madrid", country: "ES", parent: "Comunidad de Madrid", geoNames: ["Madrid"] },
  { code: "29", name: "Málaga", country: "ES", parent: "Andalucía", geoNames: ["Málaga"] },
  { code: "30", name: "Murcia", country: "ES", parent: "Región de Murcia", geoNames: ["Murcia"] },
  { code: "31", name: "Navarra", country: "ES", parent: "Navarra", geoNames: ["Navarra"] },
  { code: "32", name: "Ourense", country: "ES", parent: "Galicia", geoNames: ["Ourense", "Orense"] },
  { code: "33", name: "Asturias", country: "ES", parent: "Asturias", geoNames: ["Asturias"] },
  { code: "34", name: "Palencia", country: "ES", parent: "Castilla y León", geoNames: ["Palencia"] },
  { code: "35", name: "Las Palmas", country: "ES", parent: "Canarias", geoNames: ["Palmas, Las", "Las Palmas"] },
  { code: "36", name: "Pontevedra", country: "ES", parent: "Galicia", geoNames: ["Pontevedra"] },
  { code: "37", name: "Salamanca", country: "ES", parent: "Castilla y León", geoNames: ["Salamanca"] },
  { code: "38", name: "Santa Cruz de Tenerife", country: "ES", parent: "Canarias", geoNames: ["Santa Cruz de Tenerife"] },
  { code: "39", name: "Cantabria", country: "ES", parent: "Cantabria", geoNames: ["Cantabria"] },
  { code: "40", name: "Segovia", country: "ES", parent: "Castilla y León", geoNames: ["Segovia"] },
  { code: "41", name: "Sevilla", country: "ES", parent: "Andalucía", geoNames: ["Sevilla"] },
  { code: "42", name: "Soria", country: "ES", parent: "Castilla y León", geoNames: ["Soria"] },
  { code: "43", name: "Tarragona", country: "ES", parent: "Cataluña", geoNames: ["Tarragona"] },
  { code: "44", name: "Teruel", country: "ES", parent: "Aragón", geoNames: ["Teruel"] },
  { code: "45", name: "Toledo", country: "ES", parent: "Castilla-La Mancha", geoNames: ["Toledo"] },
  { code: "46", name: "Valencia", country: "ES", parent: "Comunidad Valenciana", geoNames: ["Valencia/València", "València/Valencia", "Valencia"] },
  { code: "47", name: "Valladolid", country: "ES", parent: "Castilla y León", geoNames: ["Valladolid"] },
  { code: "48", name: "Bizkaia", country: "ES", parent: "País Vasco", geoNames: ["Bizkaia", "Vizcaya"] },
  { code: "49", name: "Zamora", country: "ES", parent: "Castilla y León", geoNames: ["Zamora"] },
  { code: "50", name: "Zaragoza", country: "ES", parent: "Aragón", geoNames: ["Zaragoza"] },
  { code: "51", name: "Ceuta", country: "ES", parent: "Ceuta", geoNames: ["Ceuta"] },
  { code: "52", name: "Melilla", country: "ES", parent: "Melilla", geoNames: ["Melilla"] },
];

const byCode = new Map(SPAIN_PROVINCES.map((p) => [p.code, p]));
const byGeoName = new Map(
  SPAIN_PROVINCES.flatMap((p) => p.geoNames.map((n) => [n.toLowerCase(), p] as const)),
);

/** Resolve an es-atlas feature to a province, by INE id first then by name. */
export function resolveProvince(geo: {
  id?: string | number;
  properties?: Record<string, unknown>;
}): ProvinceMeta | undefined {
  const id = geo.id != null ? String(geo.id).padStart(2, "0") : undefined;
  if (id && byCode.has(id)) return byCode.get(id);

  const name = geo.properties?.name ?? geo.properties?.NAME;
  if (typeof name === "string") return byGeoName.get(name.toLowerCase());
  return undefined;
}

export const getProvinceByCode = (code: string) => byCode.get(code);
