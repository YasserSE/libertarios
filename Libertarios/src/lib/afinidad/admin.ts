import "server-only";
import { adminSessionSchema, adminTokenSchema, parseAdminStats, type AdminStats } from "./admin-rules";
import { callRpc } from "./rpc";

/**
 * Acceso de administración a las cifras de «¿A quién votar?», con la clave
 * anónima y sin clave de servicio en la app.
 *
 * La autorización está en la base: `afinidad_admin_login` canjea un token de
 * administrador (guardado como SHA-256, revocable, con caducidad) por una
 * sesión de 30 min, y `afinidad_admin_stats` solo devuelve algo con una sesión
 * válida. Aunque alguien sacara la clave anónima, sin token no ve nada.
 *
 * Nada de esto se importa desde un componente cliente.
 */

/** Canjea el token por una sesión. `null` si no vale (sin decir por qué). */
export async function adminLogin(token: unknown): Promise<string | null> {
  const parsed = adminTokenSchema.safeParse(token);
  if (!parsed.success) return null;
  const result = await callRpc("afinidad_admin_login", { p_token: parsed.data });
  if (!result.ok) return null;
  const session = adminSessionSchema.safeParse(result.data);
  return session.success ? session.data : null;
}

export async function fetchAdminStats(
  session: string,
  range: { from: string; to: string },
): Promise<AdminStats | null> {
  if (!adminSessionSchema.safeParse(session).success) return null;
  const result = await callRpc(
    "afinidad_admin_stats",
    { p_session: session, p_from: range.from, p_to: range.to },
    { timeoutMs: 10_000 },
  );
  return result.ok ? parseAdminStats(result.data) : null;
}

export async function adminLogout(session: string): Promise<void> {
  if (!adminSessionSchema.safeParse(session).success) return;
  await callRpc("afinidad_admin_logout", { p_session: session });
}
