/**
 * Límite por cliente en memoria (ventana fija de un minuto).
 *
 * Postgres no puede limitar por persona: detrás de PostgREST ve la IP de
 * Vercel. Así que la primera barrera contra el spam está aquí, en la ruta,
 * con la IP que da la plataforma (`x-forwarded-for`, que en Vercel lo fija el
 * propio borde). La IP solo vive en este mapa durante un minuto: no se
 * escribe en ningún log ni sale hacia la base.
 *
 * Es por instancia (cada función serverless tiene su mapa), así que no es un
 * límite exacto sino un freno; el techo global de la base
 * (`afinidad_rate_take`) es lo que acota el daño de verdad.
 */
export interface RateLimiter {
  /** ¿Puede pasar? Suma `cost` al contador del cliente. */
  take(key: string, cost?: number, now?: number): boolean;
}

export function createRateLimiter({
  limit,
  windowMs = 60_000,
  maxKeys = 10_000,
}: {
  limit: number;
  windowMs?: number;
  maxKeys?: number;
}): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    take(key, cost = 1, now = Date.now()) {
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        // Memoria acotada: si se llena, se vacía entera. Durante un ataque con
        // muchas IP el límite se relaja un instante, pero nunca crece sin fin.
        if (hits.size >= maxKeys) hits.clear();
        hits.set(key, { count: cost, resetAt: now + windowMs });
        return cost <= limit;
      }
      entry.count += cost;
      return entry.count <= limit;
    },
  };
}

/** Clave del cliente para el límite. Nunca se guarda ni se registra. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
