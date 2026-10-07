import { dataset } from "@/data/afinidad";
import { validateDataset } from "@/lib/afinidad/schema";

/**
 * Datos abiertos de «¿A quién votar? Objetivamente»: el dataset completo, tal
 * cual lo usa el motor, en JSON y con licencia CC BY 4.0.
 *
 * Se genera estático en cada despliegue (`force-static`): los datos están en el
 * repositorio y solo cambian con un despliegue, así que no hay nada que
 * calcular por petición. `generatedAt` es, por tanto, la fecha de esa
 * generación; la que identifica el contenido es `version`.
 *
 * Los campos del dataset van en la raíz (no dentro de un sobre) para que el
 * mismo fichero valide con `datasetSchema` sin transformarlo: quien lo
 * descargue puede comprobarlo con el esquema publicado en el repositorio.
 */

export const dynamic = "force-static";

const LICENSE = {
  name: "CC BY 4.0",
  url: "https://creativecommons.org/licenses/by/4.0/",
  attribution: "«¿A quién votar? Objetivamente», equipo de Libertarios.eu",
};

export function GET() {
  const check = validateDataset(dataset);
  // Un dataset que no pasa el esquema no se publica a medias: se devuelve el
  // error para que se vea, en vez de servir celdas que el motor no aceptaría.
  if (!check.ok) {
    return Response.json(
      { error: "El dataset no supera la validación del esquema.", errors: check.errors },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
  const body = {
    name: "¿A quién votar? Objetivamente — datos abiertos",
    license: LICENSE.name,
    licenseUrl: LICENSE.url,
    attribution: LICENSE.attribution,
    publisher: "Equipo de Libertarios.eu (declarado en la metodología)",
    generatedAt: new Date().toISOString(),
    methodology: "/es/a-quien-votar/metodologia",
    schema: "https://github.com/YasserSE/libertarios/blob/main/Libertarios/src/lib/afinidad/schema.ts",
    ...check.data,
    // `quotes`, `saidVsDid` y `deputies` son opcionales en el tipo; en el fichero abierto
    // siempre aparecen (aunque vacíos) para que quien lo consuma no tenga que
    // distinguir «no hay» de «no se publicó».
    quotes: check.data.quotes ?? [],
    saidVsDid: check.data.saidVsDid ?? [],
    deputies: check.data.deputies ?? [],
  };
  return Response.json(body, {
    headers: {
      // Una hora en el navegador, un día en la CDN; se renueva en cada despliegue.
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      // Datos abiertos: que cualquier web o cuaderno pueda leerlos directamente.
      "Access-Control-Allow-Origin": "*",
    },
  });
}
