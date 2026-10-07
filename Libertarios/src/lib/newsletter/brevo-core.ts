/**
 * Cliente mínimo de la API de Brevo (https://api.brevo.com/v3), sin estado y
 * sin leer variables de entorno: recibe la configuración explícita. Así lo
 * pueden usar tanto el servidor de Next (`brevo.ts`, `server-only`) como el
 * script de importación, que corre en Node fuera de Next.
 *
 * Nunca lanza y nunca registra la clave ni la dirección de correo: devuelve
 * `true`/`false` y deja en el log el código de estado.
 */

export const BREVO_API = "https://api.brevo.com/v3";

export interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  /** Lista de contactos del boletín. Sin ella, no se sincroniza nada. */
  listId: number | null;
}

/** Lee la configuración de un objeto tipo `process.env`. `null` si falta lo esencial. */
export function brevoConfigFrom(env: Record<string, string | undefined>): BrevoConfig | null {
  const apiKey = env.BREVO_API_KEY?.trim();
  const senderEmail = env.BREVO_SENDER_EMAIL?.trim();
  if (!apiKey || !senderEmail) return null;
  const list = Number(env.BREVO_LIST_ID);
  return {
    apiKey,
    senderEmail,
    senderName: env.BREVO_SENDER_NAME?.trim() || "Libertarios.eu",
    listId: Number.isInteger(list) && list > 0 ? list : null,
  };
}

type FetchLike = typeof fetch;

async function call(
  config: BrevoConfig,
  path: string,
  body: unknown,
  label: string,
  fetchImpl: FetchLike = fetch,
): Promise<boolean> {
  try {
    const response = await fetchImpl(`${BREVO_API}${path}`, {
      method: "POST",
      headers: {
        "api-key": config.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      // `AbortSignal.timeout` existe en Node 18+; el guard es para entornos sin él.
      signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(8000) : undefined,
    });
    if (!response.ok) {
      // El cuerpo de error de Brevo no repite la clave; puede repetir el
      // correo, así que solo se registra el código.
      console.error(`[newsletter] Brevo ${label} failed`, response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[newsletter] Brevo ${label} failed`, error instanceof Error ? error.name : "error");
    return false;
  }
}

export interface TransactionalEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
}

/** POST /smtp/email. */
export function sendTransactionalEmail(
  config: BrevoConfig,
  email: TransactionalEmail,
  fetchImpl?: FetchLike,
): Promise<boolean> {
  return call(
    config,
    "/smtp/email",
    {
      sender: { name: config.senderName, email: config.senderEmail },
      to: [{ email: email.to }],
      subject: email.subject,
      htmlContent: email.html,
      textContent: email.text,
      headers: email.headers,
      tags: ["newsletter-confirm"],
    },
    "send",
    fetchImpl,
  );
}

/**
 * POST /contacts: alta (o actualización) del contacto en la lista del boletín.
 * Solo el correo: ningún atributo. Nada de posición, territorio ni resultado.
 */
export function addContactToList(config: BrevoConfig, email: string, fetchImpl?: FetchLike): Promise<boolean> {
  if (config.listId === null) return Promise.resolve(false);
  return call(config, "/contacts", { email, listIds: [config.listId], updateEnabled: true }, "add contact", fetchImpl);
}

/** POST /contacts/lists/{id}/contacts/remove. */
export function removeContactFromList(config: BrevoConfig, email: string, fetchImpl?: FetchLike): Promise<boolean> {
  if (config.listId === null) return Promise.resolve(false);
  return call(config, `/contacts/lists/${config.listId}/contacts/remove`, { emails: [email] }, "remove contact", fetchImpl);
}
