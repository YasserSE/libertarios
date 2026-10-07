/**
 * npm run newsletter:import-affiliates [-- --import | --send] [--batch=25] [--delay-ms=400] [--limit=300]
 *
 * Copia a «Novedades de Libertarios.eu» los correos de los simpatizantes ya
 * registrados (no borrados, no sintéticos), sin confirmar, y con `--send` les
 * envía el correo de re-permiso. SOLO lo ejecuta el dueño, a mano.
 *
 * Por defecto es una PRUEBA: imprime recuentos y no escribe ni envía nada.
 *
 * Variables (en el entorno o en `.env.local`, que el script de npm carga si
 * existe). Nunca se imprimen:
 *   SUPABASE_URL                 proyecto
 *   SUPABASE_SERVICE_ROLE_KEY    clave de servicio (las funciones de
 *                                importación no están concedidas a `anon`).
 *                                No va en Vercel ni en `.env.local` de la app:
 *                                pásala solo en esta orden.
 *   BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME   solo con --send
 *   NEXT_PUBLIC_SITE_URL         base de los enlaces (por defecto, producción)
 *
 * Ejemplo: SUPABASE_SERVICE_ROLE_KEY=… npm run newsletter:import-affiliates
 */
import { brevoConfigFrom, sendTransactionalEmail } from "@/lib/newsletter/brevo-core";
import { buildConfirmationEmail } from "@/lib/newsletter/email";
import { parseImportArgs, runLegacyImport, type ImportDeps } from "@/lib/newsletter/legacy-import";
import { SITE_URL } from "@/lib/site";

async function main(): Promise<number> {
  const opts = parseImportArgs(process.argv.slice(2));
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY. No se ha hecho nada.");
    return 1;
  }

  const brevo = brevoConfigFrom(process.env);
  if (opts.mode === "send" && !brevo) {
    console.error("--send necesita BREVO_API_KEY y BREVO_SENDER_EMAIL. No se ha hecho nada.");
    return 1;
  }

  console.log(`Modo: ${opts.mode} · lote ${opts.batchSize} · pausa ${opts.delayMs} ms · tope ${opts.limit} · enlaces a ${SITE_URL}`);

  const deps: ImportDeps = {
    async rpc(name, body) {
      const response = await fetch(`${url}/rest/v1/rpc/${name}`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    },
    async send(token) {
      if (!brevo) return false;
      const built = buildConfirmationEmail({
        siteUrl: SITE_URL,
        locale: token.locale,
        confirmToken: token.confirm_token,
        unsubscribeToken: token.unsubscribe_token,
        legacy: true,
      });
      return sendTransactionalEmail(brevo, { to: token.email, ...built });
    },
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    log: (line) => console.log(line),
  };

  const report = await runLegacyImport(opts, deps);
  console.log(`Hecho. Importados: ${report.imported} · enviados: ${report.sent} · fallidos: ${report.failed}`);
  return report.aborted ? 2 : 0;
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  },
);
