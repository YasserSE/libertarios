import "server-only";
import { createHash } from "node:crypto";
import { registrationSchema, type RegistrationResult } from "./schema";
import { getCountryByCode } from "@/data/geo/europe-countries";
import { getProvinceByCode } from "@/data/geo/spain-provinces";

/**
 * Alta de simpatizante contra Supabase.
 *
 * Tres decisiones que conviene no deshacer sin pensarlo:
 *
 * 1. **Corre en el servidor.** El email se guarda como SHA-256 con un pepper;
 *    si el pepper viajara al navegador dejaría de serlo y cualquiera podría
 *    comprobar si una dirección concreta está registrada probándola.
 * 2. **Usa la clave anónima, no la de servicio.** `register_affiliate` es
 *    SECURITY DEFINER y está concedida a `anon`, así que no hace falta más
 *    privilegio. Una clave de servicio aquí podría leer y borrar todo.
 * 3. **No guarda el email.** Solo su hash. Ni este código ni la base pueden
 *    recuperar la dirección; sirve para deduplicar y para que la persona pueda
 *    pedir su borrado, nada más.
 */



/** Config obligatoria. Se lee al invocar, no al importar, para no romper el build. */
function readConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const pepper = process.env.REGISTRATION_PEPPER;
  if (!url || !key || !pepper) return null;
  return { url: url.replace(/\/$/, ""), key, pepper };
}

/** ¿Está el alta operativa? Lo usa la interfaz para no prometer lo que no hay. */
export function isRegistrationConfigured(): boolean {
  return readConfig() !== null;
}

const hashEmail = (email: string, pepper: string) =>
  createHash("sha256").update(`${pepper}:${email}`, "utf8").digest("hex");

export async function registerAffiliate(input: unknown): Promise<RegistrationResult> {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }
  const data = parsed.data;

  // Los códigos se validan contra el registro propio antes de llegar a la base:
  // la clave de FK daría un error correcto pero ilegible para la persona.
  if (!getCountryByCode(data.country)) {
    return { ok: false, error: "País no reconocido" };
  }
  const region = data.country === "ES" && data.region ? data.region : null;
  if (region && !getProvinceByCode(region)) {
    return { ok: false, error: "Provincia no reconocida" };
  }

  const config = readConfig();
  if (!config) {
    return {
      ok: false,
      error: "El registro no está disponible ahora mismo. Inténtalo de nuevo más tarde.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${config.url}/rest/v1/rpc/register_affiliate`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // `\\x…` es como PostgREST espera un bytea en hexadecimal.
        p_email_hash: `\\x${hashEmail(data.email, config.pepper)}`,
        p_country: data.country,
        p_economic: data.economic,
        p_social: data.social,
        p_method: data.method,
        p_consent: true,
        p_region: region,
        p_age_range: data.ageRange ?? null,
        p_gender: data.gender ?? null,
        // La dirección en claro, además del hash. El hash sigue siendo la clave
        // única; esto es lo que permite escribir a quien se registra.
        p_email: data.email,
      }),
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "No hemos podido conectar. Revisa tu conexión e inténtalo de nuevo." };
  }

  if (!response.ok) {
    // El detalle de Postgres puede filtrar estructura interna, así que se
    // registra en el servidor y a la persona se le da un mensaje genérico.
    console.error("register_affiliate failed", response.status, await response.text().catch(() => ""));
    return { ok: false, error: "No hemos podido completar el registro. Inténtalo de nuevo." };
  }

  return { ok: true };
}
