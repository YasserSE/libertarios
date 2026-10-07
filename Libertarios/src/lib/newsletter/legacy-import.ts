/**
 * Importación de simpatizantes ya registrados al boletín, y correo de
 * re-permiso. Lógica pura con dependencias inyectadas: el CLI
 * (`scripts/newsletter-import-affiliates.ts`) pone la conexión real y los
 * tests, una falsa.
 *
 * Tres modos, y el de por defecto no escribe nada:
 *
 *   (sin flags)  prueba: solo recuentos (`newsletter_legacy_counts`).
 *   --import     copia los correos como `legacy_affiliate`, sin confirmar.
 *                No envía nada.
 *   --send       --import + envía el correo de re-permiso por lotes, con
 *                pausa entre correos y un tope por ejecución.
 *
 * Nunca imprime direcciones: solo recuentos.
 */

import { LEGACY_CONSENT_VERSION } from "./schema";

export type ImportMode = "dry-run" | "import" | "send";

export interface ImportOptions {
  mode: ImportMode;
  /** Correos por lote pedido a la base (1–200). */
  batchSize: number;
  /** Pausa entre correos, en ms. */
  delayMs: number;
  /** Máximo de correos en esta ejecución. */
  limit: number;
}

export const DEFAULT_IMPORT_OPTIONS: ImportOptions = { mode: "dry-run", batchSize: 25, delayMs: 400, limit: 300 };

function intFlag(arg: string, name: string): number | null {
  const prefix = `--${name}=`;
  if (!arg.startsWith(prefix)) return null;
  const n = Number(arg.slice(prefix.length));
  return Number.isInteger(n) && n >= 0 ? n : null;
}

export function parseImportArgs(argv: readonly string[]): ImportOptions {
  const opts = { ...DEFAULT_IMPORT_OPTIONS };
  for (const arg of argv) {
    if (arg === "--send") opts.mode = "send";
    else if (arg === "--import" && opts.mode !== "send") opts.mode = "import";
    else {
      const batch = intFlag(arg, "batch");
      const delay = intFlag(arg, "delay-ms");
      const limit = intFlag(arg, "limit");
      if (batch !== null) opts.batchSize = Math.min(200, Math.max(1, batch));
      if (delay !== null) opts.delayMs = delay;
      if (limit !== null) opts.limit = limit;
    }
  }
  return opts;
}

export interface LegacyToken {
  email: string;
  locale: string;
  confirm_token: string;
  unsubscribe_token: string;
}

export interface ImportDeps {
  /** Llama a una función de la base con el rol de servicio. Lanza si falla. */
  rpc: (name: string, body: Record<string, unknown>) => Promise<unknown>;
  /** Envía el correo de re-permiso. `true` si Brevo lo aceptó. */
  send: (token: LegacyToken) => Promise<boolean>;
  sleep: (ms: number) => Promise<void>;
  log: (line: string) => void;
}

export interface ImportReport {
  mode: ImportMode;
  counts: Record<string, number>;
  imported: number;
  sent: number;
  failed: number;
  aborted: boolean;
}

/** Tras tantos fallos seguidos, se para: casi seguro es configuración, no un buzón. */
const MAX_CONSECUTIVE_FAILURES = 5;

export async function runLegacyImport(opts: ImportOptions, deps: ImportDeps): Promise<ImportReport> {
  const report: ImportReport = { mode: opts.mode, counts: {}, imported: 0, sent: 0, failed: 0, aborted: false };

  report.counts = ((await deps.rpc("newsletter_legacy_counts", {})) ?? {}) as Record<string, number>;
  deps.log(`Recuentos: ${JSON.stringify(report.counts)}`);

  if (opts.mode === "dry-run") {
    deps.log("Modo prueba: no se ha escrito ni enviado nada. Usa --import para copiar o --send para copiar y enviar.");
    return report;
  }

  report.imported = Number(
    await deps.rpc("newsletter_import_legacy_affiliates", { p_consent_text_version: LEGACY_CONSENT_VERSION }),
  ) || 0;
  deps.log(`Importados como legacy_affiliate (sin confirmar): ${report.imported}`);

  if (opts.mode === "import") {
    deps.log("No se ha enviado ningún correo. Usa --send para enviar el correo de re-permiso.");
    return report;
  }

  let consecutive = 0;
  while (report.sent + report.failed < opts.limit) {
    const want = Math.min(opts.batchSize, opts.limit - report.sent - report.failed);
    const batch = ((await deps.rpc("newsletter_issue_legacy_tokens", { p_limit: want })) ?? []) as LegacyToken[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const token of batch) {
      if (report.aborted) {
        // Lo que quedaba del lote vuelve a «pendiente» sin enviarse.
        await deps.rpc("newsletter_release_legacy_token", { p_email: token.email });
        continue;
      }
      const ok = await deps.send(token).catch(() => false);
      if (ok) {
        report.sent++;
        consecutive = 0;
      } else {
        report.failed++;
        consecutive++;
        await deps.rpc("newsletter_release_legacy_token", { p_email: token.email });
        if (consecutive >= MAX_CONSECUTIVE_FAILURES) report.aborted = true;
      }
      if (opts.delayMs > 0) await deps.sleep(opts.delayMs);
    }
    deps.log(`Enviados: ${report.sent} · fallidos (vuelven a pendiente): ${report.failed}`);
    if (report.aborted) {
      deps.log(`Parado tras ${MAX_CONSECUTIVE_FAILURES} fallos seguidos: revisa la configuración de Brevo.`);
      break;
    }
  }
  return report;
}
