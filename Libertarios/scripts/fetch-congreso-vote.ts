/**
 * Descarga una votación del Congreso y enseña el recuento por grupo, por
 * partido y por diputado. Es la herramienta de quien codifica los hechos (WP4):
 * el voto que se escribe en `stances/record/<pregunta>.ts` sale de aquí, y el
 * validador (`afinidad:verify`) lo recuenta con el mismo código.
 *
 *   npm run afinidad:vote -- <url>
 *   npm run afinidad:vote -- <url> --json      # salida en JSON
 *   npm run afinidad:vote -- copia.json --leg=XV   # fichero local, sin red
 *
 * <url> puede ser:
 * - el fichero: …/Leg15/Sesion202/20260930/Votacion001/VOT_20260930153547.json
 * - el directorio de la votación (el que exige el esquema en el dataset):
 *   …/Leg15/Sesion202/20260930/Votacion001/  → se busca el JSON en la página
 *   de datos abiertos de ese día, porque el directorio no se puede listar.
 */
import { readFileSync } from "node:fs";
import { parties } from "@/data/afinidad/parties";
import { deputies } from "@/data/afinidad/deputies";
import {
  checkVoteInfo,
  findVoteFiles,
  formatVoteReport,
  isCongresoVoteJson,
  listingUrl,
  majority,
  parseVoteUrl,
  tallyByGroup,
  tallyByParty,
  type CongresoVoteJson,
} from "./lib/congreso-vote";
import { PoliteFetcher } from "./lib/polite-fetch";

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "-");
  const asJson = args.includes("--json");
  const target = args.find((a) => !a.startsWith("--"));
  if (!target) {
    console.error("Uso: npm run afinidad:vote -- <url de la votación o del VOT_….json> [--json]");
    process.exit(2);
  }

  const ref = parseVoteUrl(target);
  let json: unknown;
  let jsonUrl = target;

  if (!/^https?:\/\//.test(target)) {
    // Fichero local (útil para trabajar sin red con una copia guardada).
    json = JSON.parse(readFileSync(target, "utf8"));
  } else {
    if (!ref) {
      console.error("La URL no sigue el patrón …/opendata/votaciones/Leg{NN}/Sesion{N}/{AAAAMMDD}/Votacion{NNN}/");
      process.exit(2);
    }
    const http = new PoliteFetcher({ concurrency: 1 });
    if (!/\.json(\?|$)/i.test(target)) {
      const page = await http.get(listingUrl(ref));
      if (!page.ok || !page.body) {
        console.error(`No se pudo abrir la página de datos abiertos del día (${page.status || page.error}).`);
        process.exit(1);
      }
      const files = findVoteFiles(new TextDecoder().decode(page.body), ref);
      if (!files.json) {
        console.error(
          files.png || files.pdf
            ? "La votación existe pero el Congreso no publica JSON (¿pública por llamamiento?). Ficheros: " +
                [files.pdf, files.png].filter(Boolean).join(" ")
            : `No aparece esa votación en ${listingUrl(ref)}`,
        );
        process.exit(1);
      }
      jsonUrl = files.json;
    }
    const res = await http.get(jsonUrl);
    if (!res.ok || !res.body) {
      console.error(`Error al descargar ${jsonUrl}: ${res.status || res.error}`);
      process.exit(1);
    }
    json = JSON.parse(new TextDecoder().decode(res.body));
  }

  if (!isCongresoVoteJson(json)) {
    console.error("La respuesta no tiene la forma de una votación del Congreso (informacion + votaciones).");
    process.exit(1);
  }
  const vote: CongresoVoteJson = json;
  // Con fichero local no hay URL de la que sacar la legislatura: `--leg=XIV`.
  const legArg = args.find((a) => a.startsWith("--leg="))?.slice(6);
  const legislature = ref?.legislature ?? (legArg === "XIV" ? "XIV" : "XV");

  if (ref) {
    const mismatch = checkVoteInfo(vote, ref);
    if (mismatch.length) console.error(`¡Ojo! La URL y el JSON no coinciden: ${mismatch.join("; ")}`);
  }

  if (asJson) {
    const groups = tallyByGroup(vote);
    const byParty = tallyByParty(vote, legislature, parties, deputies);
    const out = {
      url: jsonUrl,
      legislature,
      informacion: vote.informacion,
      totales: vote.totales,
      grupos: Object.fromEntries(Object.entries(groups).map(([g, t]) => [g, { ...t, mayoria: majority(t) }])),
      partidos: Object.fromEntries(
        Object.entries(byParty.byParty).map(([p, e]) => [p, { ...e.tally, mayoria: majority(e.tally), via: e.via }]),
      ),
      mixtoSinAtribuir: byParty.unattributedMixto,
      diputados: vote.votaciones,
    };
    process.stdout.write(JSON.stringify(out, null, 2) + "\n");
    return;
  }
  process.stdout.write(formatVoteReport(vote, { url: jsonUrl, legislature, parties, deputies }) + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
