import "server-only";
import { SITE_URL } from "@/lib/site";
import {
  addContactToList,
  brevoConfigFrom,
  removeContactFromList,
  sendTransactionalEmail,
  type BrevoConfig,
} from "./brevo-core";
import { buildConfirmationEmail } from "./email";

/**
 * Brevo desde el servidor de Next. La clave (`BREVO_API_KEY`) no es
 * `NEXT_PUBLIC_*` y este módulo es `server-only`: no puede llegar al navegador.
 *
 * Sin configuración no lanza: avisa en el log (una vez por proceso) y devuelve
 * `false`. La suscripción queda guardada sin confirmar, y sin confirmar no se
 * le escribe nada a nadie.
 */

let warned = false;

export function readBrevoConfig(): BrevoConfig | null {
  const config = brevoConfigFrom(process.env);
  if (!config && !warned) {
    warned = true;
    console.warn(
      "[newsletter] BREVO_API_KEY / BREVO_SENDER_EMAIL no configuradas: las altas se guardan sin confirmar y no se envía ningún correo.",
    );
  }
  return config;
}

export function isBrevoConfigured(): boolean {
  return brevoConfigFrom(process.env) !== null;
}

export async function sendConfirmation(args: {
  email: string;
  locale: string;
  confirmToken: string;
  unsubscribeToken: string;
}): Promise<boolean> {
  const config = readBrevoConfig();
  if (!config) return false;
  const built = buildConfirmationEmail({ siteUrl: SITE_URL, ...args });
  return sendTransactionalEmail(config, { to: args.email, ...built });
}

export async function syncConfirmed(email: string): Promise<boolean> {
  const config = readBrevoConfig();
  if (!config) return false;
  if (config.listId === null) {
    console.warn("[newsletter] BREVO_LIST_ID no configurada: confirmado en la base, no sincronizado con Brevo.");
    return false;
  }
  return addContactToList(config, email);
}

export async function syncUnsubscribed(email: string): Promise<boolean> {
  const config = readBrevoConfig();
  if (!config || config.listId === null) return false;
  return removeContactFromList(config, email);
}
