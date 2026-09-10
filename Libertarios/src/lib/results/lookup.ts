import "server-only";
import { UUID } from "@/lib/registration/register";
import type { SavedResult } from "@/lib/registration/schema";

/**
 * Recuperar el resultado guardado a partir del token de la persona.
 *
 * Corre en el servidor por la misma razón que el alta: la clave de Supabase no
 * baja al navegador. Usa la clave anónima —`result_by_token` es SECURITY
 * DEFINER y está concedida a `anon`— y devuelve solo la posición: la función de
 * Postgres no expone el correo, ni su hash, ni el id interno.
 *
 * Un token que no existe y un token mal formado devuelven lo mismo (`null`).
 * Distinguirlos por el mensaje convertiría esto en un oráculo con el que
 * confirmar tokens a fuerza de probar.
 */

function readConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

type Row = {
  economic: number;
  social: number;
  country_code: string;
  region_code: string | null;
  method: string;
  updated_at: string;
};

const inRange = (n: unknown) =>
  typeof n === "number" && Number.isInteger(n) && n >= -100 && n <= 100;

export async function fetchResultByToken(token: unknown): Promise<SavedResult | null> {
  if (typeof token !== "string" || !UUID.test(token)) return null;

  const config = readConfig();
  if (!config) return null;

  let response: Response;
  try {
    response = await fetch(`${config.url}/rest/v1/rpc/result_by_token`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_token: token }),
      cache: "no-store",
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    console.error("result_by_token failed", response.status, await response.text().catch(() => ""));
    return null;
  }

  const rows = (await response.json().catch(() => null)) as Row[] | null;
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || !inRange(row.economic) || !inRange(row.social)) return null;

  return {
    economic: row.economic,
    social: row.social,
    country: row.country_code,
    region: row.region_code ?? null,
    method: row.method === "manual" ? "manual" : "test",
    updatedAt: row.updated_at,
  };
}
