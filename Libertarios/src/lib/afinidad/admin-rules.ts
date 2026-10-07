import { z } from "zod";
import { AFINIDAD_EVENTS, EXPLORE_DESTINATIONS, SHARE_CHANNELS, type AfinidadEvent } from "./events";

/**
 * Reglas puras del panel `/admin/afinidad`: cookie, formatos de token, rango
 * de fechas y lectura del JSON de `afinidad_admin_stats`.
 *
 * Separado de `admin.ts` (que importa `server-only`) para poder probarlo.
 *
 * Flujo:
 *   token de administrador (largo, `afa_…`, emitido en SQL)
 *     → formulario → server action → `afinidad_admin_login`
 *     → sesión de 30 min (`afs_…`) en una cookie httpOnly
 *     → la página (Server Component) lee la cookie y llama a
 *       `afinidad_admin_stats` con la sesión.
 * Ni el token ni la sesión llegan nunca al JavaScript del navegador: no hay
 * componentes cliente en el panel y la cookie es httpOnly.
 */

/**
 * `__Host-`: el navegador solo la acepta con `Secure`, `Path=/` y sin
 * `Domain`, así que ningún subdominio puede plantar o pisar la cookie.
 * Chrome y Firefox tratan `http://localhost` como seguro, así que también
 * funciona en desarrollo.
 */
export const ADMIN_COOKIE = "__Host-afinidad_admin";

/** Igual que la sesión en la base (`afinidad_admin_login`). */
export const ADMIN_SESSION_SECONDS = 30 * 60;

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    // Strict: la cookie no viaja en ninguna navegación que venga de otro
    // sitio, ni siquiera un enlace. Junto con la comprobación de `Origin` de
    // las server actions, cierra el CSRF.
    sameSite: "strict" as const,
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  };
}

export const adminTokenSchema = z.string().trim().regex(/^afa_[0-9a-f]{64}$/);
export const adminSessionSchema = z.string().regex(/^afs_[0-9a-f]{64}$/);

/** Rangos que ofrece el panel, en días. */
export const RANGE_DAYS = [7, 30, 90, 180] as const;
export type RangeDays = (typeof RANGE_DAYS)[number];

export function parseRangeDays(value: unknown): RangeDays {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return (RANGE_DAYS as readonly number[]).includes(n) ? (n as RangeDays) : 30;
}

/** `{ from, to }` (YYYY-MM-DD, hora de Madrid) para los últimos `days` días. */
export function rangeFor(days: RangeDays, now: Date = new Date()): { from: string; to: string } {
  const to = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(now);
  const d = new Date(`${to}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - (days - 1));
  return { from: d.toISOString().slice(0, 10), to };
}

// ─── JSON de `afinidad_admin_stats` ─────────────────────────────────────────

const n = z.number().int().nonnegative();
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const short = z.string().max(64);

export const adminStatsSchema = z.object({
  from: day,
  to: day,
  k: n,
  event_totals: z.array(z.object({ event: short, n })),
  events_by_day: z.array(z.object({ day, event: short, n })),
  events_by_locale: z.array(z.object({ locale: short, event: short, n })),
  events_by_version: z.array(z.object({ version: short, event: short, n })),
  events_by_prop: z.array(z.object({ event: short, key: short, value: short, n })),
  responses: z.object({
    total: n,
    by_day: z.array(z.object({ day, n })),
    by_version: z.array(z.object({ version: short, n })),
    by_usual_vote: z.array(z.object({ usual_vote: short, n })),
    by_region: z.array(z.object({ region: short, n })),
    by_region_vote: z.array(z.object({ region: short, usual_vote: short, n })),
  }),
  rate_peaks: z.array(z.object({ scope: short, day, max_per_minute: n })),
});

export type AdminStats = z.infer<typeof adminStatsSchema>;

export function parseAdminStats(data: unknown): AdminStats | null {
  const parsed = adminStatsSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
}

// ─── Resumen para el panel ──────────────────────────────────────────────────

export interface AdminSummary {
  starts: number;
  completes: number;
  /** completes / starts, o null sin inicios. Puede pasar de 1 (ver nota en el panel). */
  completionRate: number | null;
  openShared: number;
  sourceOpens: number;
  contextDeclared: number;
  shares: { channel: (typeof SHARE_CHANNELS)[number]; n: number }[];
  explore: { destination: (typeof EXPLORE_DESTINATIONS)[number]; n: number }[];
  /** Por día: inicios y terminados, con todos los días del rango (0 si no hubo). */
  daily: { day: string; starts: number; completes: number; responses: number }[];
}

export function summarize(stats: AdminStats): AdminSummary {
  const total = (event: AfinidadEvent) => stats.event_totals.find((t) => t.event === event)?.n ?? 0;
  const starts = total("afinidad_start");
  const completes = total("afinidad_complete");

  const days: string[] = [];
  for (let d = new Date(`${stats.from}T12:00:00Z`); d.toISOString().slice(0, 10) <= stats.to; ) {
    days.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  const at = (dayKey: string, event: AfinidadEvent) =>
    stats.events_by_day.find((r) => r.day === dayKey && r.event === event)?.n ?? 0;

  return {
    starts,
    completes,
    completionRate: starts > 0 ? completes / starts : null,
    openShared: total("afinidad_open_shared"),
    sourceOpens: total("afinidad_source_open"),
    contextDeclared: total("afinidad_context_declared"),
    shares: SHARE_CHANNELS.map((channel) => ({ channel, n: total(`afinidad_share_${channel}`) })),
    explore: EXPLORE_DESTINATIONS.map((destination) => ({
      destination,
      n: total(`afinidad_explore_${destination}`),
    })),
    daily: days.map((dayKey) => ({
      day: dayKey,
      starts: at(dayKey, "afinidad_start"),
      completes: at(dayKey, "afinidad_complete"),
      responses: stats.responses.by_day.find((r) => r.day === dayKey)?.n ?? 0,
    })),
  };
}

/** Para mostrar el nombre de un evento sin el prefijo común. */
export function shortEventName(event: string): string {
  return (AFINIDAD_EVENTS as readonly string[]).includes(event) ? event.replace(/^afinidad_/, "") : event;
}
