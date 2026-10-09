/**
 * Comprueba que lo que sale en pantalla es lo que dicen los datos:
 *  - las citas de programa son idénticas a la celda del conjunto de datos;
 *  - cada trozo de una cita de «dijo / hizo» recortada con «[…]» está literal en el original;
 *  - las etiquetas de veredicto son las de Libertarios/src/i18n/afinidad/dvh.ts;
 *  - cada votación mostrada tiene su `voteLabel` y coincide con el voto del grupo.
 * Uso: `npm run check` (todos los partidos del Root) o `npm run check -- pp`.
 */
import { readFileSync } from "node:fs";
import { buildReel } from "../src/build";
import { CHAPTERS } from "../src/chapters";
import { dvh, stance, VERDICT_LABEL } from "../src/data";
import { DVH_MAP } from "../src/dvh-map";

const ids = process.argv.slice(2).length ? process.argv.slice(2) : ["pp", "psoe", "vox", "sumar", "podemos"];
const errors: string[] = [];
const fail = (m: string) => errors.push(m);

const i18n = readFileSync(new URL("../../Libertarios/src/i18n/afinidad/dvh.ts", import.meta.url), "utf8");
for (const [k, v] of Object.entries(VERDICT_LABEL)) {
  if (!i18n.includes(`verdict_${k}: "${v}"`) && !i18n.includes(`"verdict_${k}": "${v}"`)) fail(`Etiqueta «${v}» (${k}) no coincide con dvh.ts`);
}

for (const id of ids) {
  const reel = buildReel(id);
  for (const b of reel.beats) {
    if (b.type === "programme" && b.programme.kind === "quote") {
      const ch = CHAPTERS[b.chapter];
      const cell = stance(id, ch.questionId)?.programme;
      if (cell?.quote !== b.programme.quote) fail(`${id}/${ch.key}: la cita del programa no es literal`);
    }
    if (b.type === "vote" && b.votes.kind === "votes") {
      const ch = CHAPTERS[b.chapter];
      const ev = stance(id, ch.questionId)?.record?.evidence ?? [];
      for (const v of b.votes.votes) {
        const e = ev.find((x) => x.date === v.date && ch.voteLabel[x.url] === v.label);
        if (!e || e.groupVote !== v.vote) fail(`${id}/${ch.key}: voto ${v.date} no cuadra con los datos`);
      }
    }
  }
  for (const [key, pick] of Object.entries(DVH_MAP[id] ?? {})) {
    if (!pick) continue;
    const e = dvh(pick.id);
    if (e.partyId !== id) fail(`${id}/${key}: ${pick.id} es de otro partido`);
    for (const part of pick.said.split("[…]").map((s) => s.trim()).filter(Boolean)) {
      if (!e.said.text.includes(part)) fail(`${id}/${key}: «${part}» no está literal en la cita de ${pick.id}`);
    }
    const ref = pick.didSource.match(/BOE-A-\d{4}-\d+/)?.[0];
    if (ref && !e.did.evidence.some((x) => x.reference === ref)) fail(`${id}/${key}: ${ref} no está entre las pruebas de ${pick.id}`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Datos en pantalla verificados para: ${ids.join(", ")}`);
