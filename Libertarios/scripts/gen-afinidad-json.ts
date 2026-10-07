/**
 * Genera el JSON abierto del dataset de afinidad desde el TypeScript, para que
 * los datos publicados y los que usa la web no puedan divergir. Ejecutar:
 *   npm run afinidad:json
 *
 * Escribe `public/afinidad/datos-<versión>.json`. Un fichero por versión (y no
 * uno que se sobrescribe) porque los enlaces compartidos llevan `?v=` y quien
 * cite un resultado debe poder bajar exactamente los datos con que se calculó.
 *
 * Se niega a escribir si el dataset no pasa el esquema: publicar con licencia
 * abierta un dato que no tiene fuente sería peor que no publicar.
 *
 * Sin marca de tiempo en el contenido: regenerar la misma versión da el mismo
 * fichero byte a byte, y el diff de git solo enseña cambios de datos.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { dataset, assemblyProblems } from "@/data/afinidad";
import { validateDataset } from "@/lib/afinidad/schema";

const SITE = "https://www.libertarios.eu";

function main() {
  const v = validateDataset(dataset);
  const errors = [...assemblyProblems, ...(v.ok ? [] : v.errors)];
  if (errors.length) {
    console.error(`El dataset no pasa el esquema (${errors.length} errores); no se publica:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const out = {
    // Cabecera de licencia y procedencia (CC BY 4.0 exige atribución: se dice cómo).
    title: "¿A quién votar? Objetivamente — posiciones de los partidos",
    description:
      "Posición de cada partido en cada afirmación, por programa electoral y por votaciones en el Congreso, con la fuente de cada celda.",
    version: dataset.version,
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    attribution: "Libertarios.eu — «¿A quién votar? Objetivamente» (www.libertarios.eu/a-quien-votar)",
    publisher: "Libertarios.eu",
    homepage: `${SITE}/es/a-quien-votar`,
    methodology: `${SITE}/es/a-quien-votar/metodologia`,
    corrections: `${SITE}/es/a-quien-votar/metodologia`,
    notes: [
      "Solo puntúan las celdas «verificado» y «contested»; «pendiente» y «sin-posicion» se publican pero no cuentan.",
      "Mientras no existan los programas de 2026 se usan los de 2023 (campo source.year).",
      "Las citas de hemeroteca («quotes») no puntúan nunca.",
      "«Dijeron vs. hicieron» («saidVsDid») no puntúa nunca; incluye compromisos cumplidos e incumplidos con el mismo criterio para todos los partidos.",
    ],
    counts: {
      parties: dataset.parties.length,
      questions: dataset.questions.length,
      stances: dataset.stances.length,
      quotes: (dataset.quotes ?? []).length,
      saidVsDid: (dataset.saidVsDid ?? []).length,
      deputies: (dataset.deputies ?? []).length,
    },
    data: dataset,
  };

  const dir = resolve(process.cwd(), "public/afinidad");
  mkdirSync(dir, { recursive: true });
  const file = `${dir}/datos-${dataset.version}.json`;
  writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
  console.log(`Escrito public/afinidad/datos-${dataset.version}.json (${out.counts.stances} celdas).`);
  if (dataset.stances.length === 0) console.log("Aviso: el dataset está vacío todavía.");
}

main();
