import type { SaidVsDid } from "../types";
import { saidVsDid as bng } from "./bng";
import { saidVsDid as cc } from "./cc";
import { saidVsDid as compromis } from "./compromis";
import { saidVsDid as ehBildu } from "./eh-bildu";
import { saidVsDid as erc } from "./erc";
import { saidVsDid as junts } from "./junts";
import { saidVsDid as pnv } from "./pnv";
import { saidVsDid as podemos } from "./podemos";
import { saidVsDid as pp } from "./pp";
import { saidVsDid as psoe } from "./psoe";
import { saidVsDid as sumar } from "./sumar";
import { saidVsDid as upn } from "./upn";
import { saidVsDid as vox } from "./vox";

/**
 * «Dijeron vs. hicieron», un fichero por partido. No puntúa nunca.
 *
 * Lista de imports estática (mismo motivo que en `../hemeroteca/index.ts`):
 * con imports dinámicos o `import.meta.glob`, un fichero roto o a medio
 * escribir entraría en el dataset sin que nadie lo hubiera registrado. Así,
 * cada fichero entra a mano y después de pasar `validateDataset`.
 *
 * Cada fichero `<partyId>.ts` exporta `saidVsDid: SaidVsDid[]`.
 *
 * ── Añade aquí tu fichero ──────────────────────────────────────────────────
 *   import { saidVsDid as pp } from "./pp";
 *   …y añade `pp` al array de abajo.
 */

// Registrados el 2026-10-06 tras pasar validateDataset (orden alfabético). Todos los ficheros
// de la carpeta están registrados; lo comprueba afinidad-dataset.test.ts.
export const saidVsDidFiles: ReadonlyArray<readonly SaidVsDid[]> = [
  bng,
  cc,
  compromis,
  ehBildu,
  erc,
  junts,
  pnv,
  podemos,
  pp,
  psoe,
  sumar,
  upn,
  vox,
];
