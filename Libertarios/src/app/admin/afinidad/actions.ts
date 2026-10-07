"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminLogin, adminLogout } from "@/lib/afinidad/admin";
import { ADMIN_COOKIE, adminCookieOptions } from "@/lib/afinidad/admin-rules";
import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";

/**
 * Server actions del panel. El token viaja una sola vez, en el cuerpo POST del
 * formulario, de aquí a la base; no se guarda en ningún sitio de la app. Lo que
 * queda en la cookie es la sesión corta que devuelve la base.
 *
 * CSRF: Next compara `Origin` con `Host` en toda server action, y la cookie es
 * `SameSite=Strict`. El error es siempre el mismo («no válido»), sin
 * distinguir token inexistente, caducado, revocado o bloqueo.
 */

const PANEL = "/admin/afinidad";

/*
 * 5 intentos por minuto y cliente antes de llegar a la base. No protege el
 * token (244 bits: la fuerza bruta es inviable) sino el bloqueo global de la
 * base (20 fallos en 15 min): sin esto, un solo visitante del formulario
 * podría dejar fuera al dueño a base de intentos.
 */
const loginLimiter = createRateLimiter({ limit: 5 });

export async function loginAction(formData: FormData): Promise<void> {
  if (!loginLimiter.take(clientKey(await headers()))) redirect(`${PANEL}?error=1`);
  const session = await adminLogin(formData.get("token"));
  if (!session) redirect(`${PANEL}?error=1`);
  (await cookies()).set(ADMIN_COOKIE, session, adminCookieOptions());
  redirect(PANEL);
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  const session = store.get(ADMIN_COOKIE)?.value;
  if (session) await adminLogout(session);
  store.delete({ name: ADMIN_COOKIE, path: "/", secure: true, httpOnly: true, sameSite: "strict" });
  redirect(PANEL);
}
