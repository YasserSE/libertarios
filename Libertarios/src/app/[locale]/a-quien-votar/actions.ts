"use server";

import { headers } from "next/headers";
import { dataset } from "@/data/afinidad";
import { persistAfinidadResponse } from "@/lib/afinidad/aggregate";
import { toResponseRow } from "@/lib/afinidad/aggregate-rules";
import { clientKey, createRateLimiter } from "@/lib/afinidad/rate-limit";

/**
 * Server actions de «¿A quién votar?».
 *
 * Finas a propósito, como `registro/actions.ts`: la validación vive en
 * `aggregate-rules.ts` (puro, probado) y la escritura en `aggregate.ts`.
 *
 * Un fichero `"use server"` solo puede exportar funciones async, por eso
 * `isPublicationEmbargoed` no se exporta desde aquí sino desde
 * `@/lib/afinidad/aggregate-rules` (y se reexporta en `aggregate.ts`).
 */

/*
 * Una server action es un endpoint POST público: cualquiera puede llamarla en
 * bucle sin pasar por la interfaz. Primer freno, por IP y en memoria (ver
 * `rate-limit.ts`; la IP no se guarda ni se reenvía). El segundo es el techo
 * global por minuto de la base (`afinidad_rate_take`).
 */
const responseLimiter = createRateLimiter({ limit: 10 });

async function allowed(limiter: ReturnType<typeof createRateLimiter>): Promise<boolean> {
  try {
    return limiter.take(clientKey(await headers()));
  } catch {
    return true; // fuera de una petición (tests): sin límite
  }
}

/**
 * Guarda una respuesta anónima a partir de los parámetros del enlace de
 * resultado (`r=…&v=…[&ca=…][&vh=…]`, con o sin `?`).
 *
 * Pensada para llamarse sin esperar (`void recordAfinidadResponse(qs)`): nunca
 * lanza y no devuelve nada que la interfaz deba enseñar. Que falle el guardado
 * de un agregado no puede estropear el resultado de nadie.
 *
 * Solo debe llamarse una vez por test completado, y después de que la persona
 * haya visto el texto que explica qué se guarda (decisión de consentimiento:
 * ver el informe de WP9).
 */
export async function recordAfinidadResponse(encodedParams: string): Promise<void> {
  try {
    const row = toResponseRow(encodedParams, {
      questions: dataset.questions,
      partyIds: dataset.parties.map((p) => p.id),
      currentVersion: dataset.version,
    });
    if (!row) return;
    if (!(await allowed(responseLimiter))) return;
    await persistAfinidadResponse(row);
  } catch {
    // Silencio deliberado: ver arriba.
  }
}

/*
 * «Avísame cuando cambien los programas» (`subscribeAfinidad` →
 * `afinidad_notify`) se retiró en la migración 0011: el resultado ofrece ahora
 * el boletín «Novedades de Libertarios.eu» (`src/app/[locale]/novedades/actions.ts`).
 */
