/**
 * Comprueba que lo que sale en pantalla es lo que dicen los datos:
 *  - las citas de programa son idénticas a la celda del conjunto de datos;
 *  - cada trozo de una cita de «dijo / hizo» recortada con «[…]» está literal en el original;
 *  - las etiquetas de veredicto son las de Libertarios/src/i18n/afinidad/dvh.ts;
 *  - cada votación mostrada tiene su `voteLabel` y coincide con el voto del grupo.
 * Uso: `npm run check` (todos los partidos del Root) o `npm run check -- pp`.
 */
import { readFileSync } from "node:fs";
import { EXTRA } from "../src/explainers/extra-votes";
import { buildReel } from "../src/build";
import { CHAPTERS } from "../src/chapters";
import { dvh, parties, stance, VERDICT_LABEL } from "../src/data";
import { GOV_DVH, grid, PARTIES } from "../src/explainers/vivienda-partidos";
import { IMPUESTOS_GOV } from "../src/explainers/impuestos-partidos";
import { bigShare, extraPct, extraPerMonth, taxDay } from "../src/explainers/impuestos";
import { getReferenceSet } from "../../Libertarios/src/data/quadrantReferences";
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

/* ── Vídeos explicativos ─────────────────────────────────────────────
 * Lo que dice la voz de «Vivienda: lo que dicen y lo que hacen» tiene que
 * coincidir con las filas que salen de los datos.
 */
{
  const expect: Record<string, Record<string, [string, string]>> = {
    "vivienda-tope-alquiler": { psoe: ["favor", "si"], sumar: ["favor", "si"], podemos: ["favor", "si"], pp: ["contra", "no"], vox: ["contra", "no"] },
    "iva-primera-vivienda": { pp: ["*", "si"], vox: ["*", "si"], sumar: ["*", "no"], podemos: ["*", "no"], psoe: ["*", "abstencion"] },
    "okupacion-desalojo": { pp: ["*", "si"], vox: ["*", "si"], psoe: ["favor", "no"], sumar: ["*", "no"], podemos: ["*", "no"] },
  };
  for (const [q, byParty] of Object.entries(expect)) {
    for (const r of grid(q, {})) {
      const [promise, vote] = byParty[r.partyId];
      if (promise !== "*" && r.promise !== promise) fail(`vivienda-partidos/${q}/${r.partyId}: programa ${r.promise}, la voz dice ${promise}`);
      if (r.vote !== vote) fail(`vivienda-partidos/${q}/${r.partyId}: voto ${r.vote}, la voz dice ${vote}`);
    }
  }
  // «El ticket de tus impuestos»: lo que dice la voz sobre los cálculos
  if (taxDay < 141 || taxDay > 151) fail(`impuestos: el día ${taxDay} ya no es «finales de mayo»`);
  if (Math.abs(bigShare - 0.568) > 0.01) fail(`impuestos: pensiones+sanidad+educación+seguridad = ${(bigShare * 100).toFixed(1)} %`);
  if (Math.round(extraPerMonth / 10) * 10 !== 280 || Math.floor(extraPct) !== 14) fail(`impuestos: «unos 280 € más al mes, un 14 % más» ya no cuadra (${extraPerMonth.toFixed(0)} €, ${extraPct.toFixed(1)} %)`);
  // «Cuando gobiernan»: la voz dice «a medias» para los dos y cita 183.000 y 32.000 (32.444)
  for (const id of Object.values(GOV_DVH)) if (dvh(id)?.verdict !== "parcial") fail(`vivienda-partidos/${id}: ya no es «parcial»`);
  const psoe = JSON.stringify(dvh(GOV_DVH.psoe));
  if (!psoe.includes("183.000") || !psoe.includes("32.444")) fail("vivienda-partidos: cambian las cifras de las 183.000 viviendas");
  // «Impuestos: lo que prometen y lo que votan»
  {
    const exp: Record<string, Record<string, [string, string]>> = {
      "irpf-inflacion": { pp: ["favor", "si"], vox: ["*", "si"], psoe: ["*", "no"], sumar: ["*", "no"], podemos: ["*", "no"] },
      "impuesto-grandes-fortunas": { sumar: ["favor", "si"], podemos: ["favor", "si"], pp: ["contra", "no"], vox: ["contra", "no"], psoe: ["*", "no"] },
      "impuesto-banca": { sumar: ["favor", "si"], podemos: ["favor", "si"], psoe: ["*", "no"], pp: ["*", "no"], vox: ["*", "no"] },
    };
    for (const [q, byParty] of Object.entries(exp))
      for (const r of grid(q, {})) {
        const [promise, vote] = byParty[r.partyId];
        if (promise !== "*" && r.promise !== promise) fail(`impuestos-partidos/${q}/${r.partyId}: programa ${r.promise}, la voz dice ${promise}`);
        if (r.vote !== vote) fail(`impuestos-partidos/${q}/${r.partyId}: voto ${r.vote}, la voz dice ${vote}`);
      }
    if (dvh(IMPUESTOS_GOV.pp).verdict !== "contradice") fail("impuestos-partidos: Rajoy/IRPF ya no es «contradice»");
    if (dvh(IMPUESTOS_GOV.psoe).verdict !== "no-hecho") fail("impuestos-partidos: Presupuestos 2026 ya no es «no lo hicieron»");
  }
  // Votaciones buscadas para los vídeos por temas: deben coincidir con el recuento guardado
  // (`data/votes/<id>.json`, salida de `npm run afinidad:vote` sobre los datos abiertos del Congreso).
  for (const v of Object.values(EXTRA)) {
    const tally = JSON.parse(readFileSync(new URL(`../data/votes/${v.id}.json`, import.meta.url), "utf8"));
    if (tally.url !== v.url) fail(`extra/${v.id}: la URL no coincide con el recuento`);
    for (const id of PARTIES) if (tally.partidos[id]?.mayoria?.vote !== v.votes[id]) fail(`extra/${v.id}/${id}: el recuento dice ${tally.partidos[id]?.mayoria?.vote}, el vídeo dice ${v.votes[id]}`);
    if (Object.keys(v.promises).length !== 5) fail(`extra/${v.id}: faltan promesas`);
    for (const pr of Object.values(v.promises)) if (pr.promise !== "sin" && (!pr.quote || !pr.source)) fail(`extra/${v.id}: promesa sin cita o sin página`);
  }
  // «Corrupción»: oficina anticorrupción (test) y «dijo / hizo»
  {
    const exp: Record<string, string> = { psoe: "si", sumar: "si", podemos: "si", pp: "no", vox: "no" };
    for (const r of grid("oficina-anticorrupcion", {})) if (r.vote !== exp[r.partyId]) fail(`corrupcion/oficina/${r.partyId}: voto ${r.vote}`);
    if (grid("oficina-anticorrupcion", {}).find((r) => r.partyId === "vox")?.promise !== "favor") fail("corrupcion: la voz dice que Vox prometía crear una oficina");
    if (dvh("pp-verdad-barcenas-kitchen-2013").verdict !== "contradice") fail("corrupcion: Kitchen ya no es «contradice»");
    if (dvh("psoe-comision-investigacion-koldo-2025").verdict !== "parcial") fail("corrupcion: Koldo ya no es «parcial»");
    if (!JSON.stringify(dvh("psoe-corrupcion-mocion-censura-2018")).includes("24 años")) fail("corrupcion: la condena de Ábalos ya no dice «24 años»");
    if (dvh("psoe-sahara-autodeterminacion-2019").verdict !== "contradice") fail("seguridad: Sáhara ya no es «contradice»");
    const ceuta: Record<string, string> = { pp: "si", vox: "si", sumar: "si", psoe: "no", podemos: "no" };
    for (const r of grid("ceuta-embajador-marruecos", {})) if (r.vote !== ceuta[r.partyId]) fail(`seguridad/ceuta/${r.partyId}: voto ${r.vote}`);
  }
  if (PARTIES.length !== 5) fail("vivienda-partidos: deben ser cinco partidos");

  // «¿De derecha sin ser conservador?»: 0 de 22 y ningún libertario con escaño
  const eu = getReferenceSet("party-eu")!.points;
  if (eu.length !== 22 || eu.some((p) => p.economic >= 50 && p.social >= 50)) fail("derecha: ya no es «0 de 22»");
  if (parties.some((p) => p.id === "plib" || /libertari/i.test(p.name))) fail("derecha: hay un partido libertario con escaño en los datos");
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Datos en pantalla verificados para: ${ids.join(", ")}`);
