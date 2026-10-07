import type { Stance } from "../../types";
import { stances as viviendaTopeAlquiler } from "./vivienda-tope-alquiler";
import { stances as irpfInflacion } from "./irpf-inflacion";
import { stances as jornada375 } from "./jornada-37-5";
import { stances as prisionesAgentesAutoridad } from "./prisiones-agentes-autoridad";
import { stances as amnistia } from "./amnistia";
import { stances as nuclear } from "./nuclear";
import { stances as prostitucionAbolicion } from "./prostitucion-abolicion";
import { stances as gastoDefensa } from "./gasto-defensa";
import { stances as impuestoGrandesFortunas } from "./impuesto-grandes-fortunas";
import { stances as okupacionDesalojo } from "./okupacion-desalojo";
import { stances as ivaPrimeraVivienda } from "./iva-primera-vivienda";
import { stances as impuestoBanca } from "./impuesto-banca";
import { stances as registroLobbies } from "./registro-lobbies";
import { stances as inmigracionCompetenciasCataluna } from "./inmigracion-competencias-cataluna";
import { stances as tauromaquiaPatrimonio } from "./tauromaquia-patrimonio";

/**
 * Celdas de HECHOS, un fichero por pregunta (WP4).
 *
 * Lista de imports estática (mismo motivo que en `../programme/index.ts`): lo
 * que no está aquí no entra en el dataset, y añadirlo se ve en el diff.
 *
 * Cada fichero `<questionId>.ts` exporta `stances: Stance[]` con `record`
 * relleno y `programme: null`. `src/data/afinidad/index.ts` las une con las de
 * programa de la misma celda.
 *
 * ── Añade aquí tu fichero ──────────────────────────────────────────────────
 *   import { stances as vivienda } from "./vivienda";
 *   …y añade `vivienda` al array de abajo.
 */

// En el orden de `Question.order` (questions.ts), para que el diff sea legible.
export const recordStanceFiles: ReadonlyArray<readonly Stance[]> = [
  viviendaTopeAlquiler,
  irpfInflacion,
  jornada375,
  prisionesAgentesAutoridad,
  amnistia,
  nuclear,
  prostitucionAbolicion,
  gastoDefensa,
  impuestoGrandesFortunas,
  okupacionDesalojo,
  ivaPrimeraVivienda,
  impuestoBanca,
  registroLobbies,
  inmigracionCompetenciasCataluna,
  tauromaquiaPatrimonio,
];
