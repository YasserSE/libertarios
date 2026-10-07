import type { Quote } from "../types";
import { quotes as bng } from "./bng";
import { quotes as cc } from "./cc";
import { quotes as compromis } from "./compromis";
import { quotes as ehBildu } from "./eh-bildu";
import { quotes as erc } from "./erc";
import { quotes as junts } from "./junts";
import { quotes as pnv } from "./pnv";
import { quotes as podemos } from "./podemos";
import { quotes as pp } from "./pp";
import { quotes as psoe } from "./psoe";
import { quotes as sumar } from "./sumar";
import { quotes as upn } from "./upn";
import { quotes as vox } from "./vox";

/**
 * Hemeroteca, un fichero por partido. No puntúa nunca.
 *
 * Lista de imports estática (mismo motivo que en `../stances/programme/index.ts`).
 * Cada fichero `<partyId>.ts` exporta `quotes: Quote[]`.
 *
 * ── Añade aquí tu fichero ──────────────────────────────────────────────────
 *   import { quotes as pp } from "./pp";
 *   …y añade `pp` al array de abajo.
 */

// Registrados el 2026-10-06 tras pasar validateDataset (orden alfabético). Todos los ficheros
// de la carpeta están registrados; lo comprueba afinidad-dataset.test.ts.
export const quoteFiles: ReadonlyArray<readonly Quote[]> = [
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
