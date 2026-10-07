import type { Stance } from "../../types";
import { stances as adelanteAndalucia } from "./adelante-andalucia";
import { stances as ahi } from "./ahi";
import { stances as aliancaCatalana } from "./alianca-catalana";
import { stances as aragonExiste } from "./aragon-existe";
import { stances as asg } from "./asg";
import { stances as bng } from "./bng";
import { stances as cc } from "./cc";
import { stances as cha } from "./cha";
import { stances as compromis } from "./compromis";
import { stances as cup } from "./cup";
import { stances as democraciaOurensana } from "./democracia-ourensana";
import { stances as ehBildu } from "./eh-bildu";
import { stances as erc } from "./erc";
import { stances as foro } from "./foro";
import { stances as frenteAmplio } from "./frente-amplio";
import { stances as geroaBai } from "./geroa-bai";
import { stances as junts } from "./junts";
import { stances as mesMallorca } from "./mes-mallorca";
import { stances as mesMenorca } from "./mes-menorca";
import { stances as ncBc } from "./nc-bc";
import { stances as pnv } from "./pnv";
import { stances as podemos } from "./podemos";
import { stances as porAvila } from "./por-avila";
import { stances as pp } from "./pp";
import { stances as prc } from "./prc";
import { stances as psoe } from "./psoe";
import { stances as salf } from "./salf";
import { stances as soriaYa } from "./soria-ya";
import { stances as sumar } from "./sumar";
import { stances as upl } from "./upl";
import { stances as upn } from "./upn";
import { stances as vox } from "./vox";

/**
 * Celdas de PROGRAMA, un fichero por partido (WP3).
 *
 * Lista de imports estática y no un `import.meta.glob`/`require.context`:
 * Next, esbuild (scripts) y vitest la resuelven igual, y un fichero que no
 * está aquí no entra en el dataset, así que añadir un partido es un cambio
 * explícito y revisable en el diff.
 *
 * Cada fichero `<partyId>.ts` exporta `stances: Stance[]` con `programme`
 * relleno y `record: null`. `src/data/afinidad/index.ts` las une con las de
 * hechos de la misma celda.
 *
 * ── Añade aquí tu fichero ──────────────────────────────────────────────────
 *   import { stances as pp } from "./pp";
 *   …y añade `pp` al array de abajo.
 */

// Registrados el 2026-10-06 tras pasar validateDataset uno a uno (orden alfabético).
// Todos los ficheros de la carpeta están registrados; lo comprueba afinidad-dataset.test.ts.
export const programmeStanceFiles: ReadonlyArray<readonly Stance[]> = [
  adelanteAndalucia,
  ahi,
  aliancaCatalana,
  aragonExiste,
  asg,
  bng,
  cc,
  cha,
  compromis,
  cup,
  democraciaOurensana,
  ehBildu,
  erc,
  foro,
  frenteAmplio,
  geroaBai,
  junts,
  mesMallorca,
  mesMenorca,
  ncBc,
  pnv,
  podemos,
  porAvila,
  pp,
  prc,
  psoe,
  salf,
  soriaYa,
  sumar,
  upl,
  upn,
  vox,
];
