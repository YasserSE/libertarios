import { LOCALES } from "@/i18n/config";

/**
 * Reglas de los eventos de uso de «¿A quién votar?»: qué eventos existen, qué
 * propiedad puede llevar cada uno y cómo se limpia lo que llega.
 *
 * Es la misma lista blanca que `record_afinidad_event` en la última migración
 * que la redefine (`supabase/migrations/0010_afinidad_events_dvh.sql`, que
 * amplía la de 0009); un test compara las dos.
 *
 * Puro y sin zod: lo importa `track.ts`, que va en el bundle del navegador.
 * El esquema zod del servidor está en `event-schema.ts`.
 *
 * Por qué tan poco: son registros de USO, no de opinión. Nada de respuestas,
 * comunidad, voto habitual, partidos ni resultados: eso es opinión política
 * (art. 9 RGPD) y con la hora y el idioma podría acabar describiendo a una
 * persona. Las únicas propiedades dicen cómo se usó la interfaz.
 */

export const SHARE_CHANNELS = ["whatsapp", "x", "telegram", "copy", "native"] as const;
export type ShareChannel = (typeof SHARE_CHANNELS)[number];

/**
 * Destinos de «Sigue explorando» (otros tests de Libertarios.eu). Se cuentan
 * aparte para saber si el enlace al resto del sitio interesa o estorba; el
 * evento lleva solo el destino y desde dónde se pulsó, nunca el resultado.
 */
export const EXPLORE_DESTINATIONS = ["cuadrante", "aprende", "medidas"] as const;
export type ExploreDestination = (typeof EXPLORE_DESTINATIONS)[number];

/** Literal a mano (no generado) para que `z.enum` y TypeScript vean la lista exacta. */
export const AFINIDAD_EVENTS = [
  "afinidad_start",
  "afinidad_complete",
  "afinidad_open_shared",
  "afinidad_context_declared",
  "afinidad_source_open",
  "afinidad_share_whatsapp",
  "afinidad_share_x",
  "afinidad_share_telegram",
  "afinidad_share_copy",
  "afinidad_share_native",
  "afinidad_explore_cuadrante",
  "afinidad_explore_aprende",
  "afinidad_explore_medidas",
  // «Dijeron vs. hicieron»: abrir la página y copiar el enlace de una entrada.
  // Sin propiedades: ni qué partido ni qué entrada (eso diría qué interesa a
  // quien lo mira).
  "afinidad_dvh_open",
  "afinidad_share_dvh",
] as const satisfies readonly (
  | "afinidad_start"
  | "afinidad_complete"
  | "afinidad_open_shared"
  | "afinidad_context_declared"
  | "afinidad_source_open"
  | `afinidad_share_${ShareChannel}`
  | `afinidad_explore_${ExploreDestination}`
  | "afinidad_dvh_open"
  | "afinidad_share_dvh"
)[];

export type AfinidadEvent = (typeof AFINIDAD_EVENTS)[number];

/** Desde dónde se pulsó «Sigue explorando». */
export const EXPLORE_FROM = ["resultado", "pie", "portada"] as const;
/** Qué paso de contexto se declaró (no QUÉ se declaró). */
export const CONTEXT_STEPS = ["region", "vote"] as const;

/** Propiedades posibles, todas opcionales; cada evento admite como mucho una. */
export interface EventProps {
  /** Compartir: ¿con el enlace anónimo (sin voto habitual)? */
  anon?: boolean;
  from?: (typeof EXPLORE_FROM)[number];
  step?: (typeof CONTEXT_STEPS)[number];
}

export function isAfinidadEvent(value: unknown): value is AfinidadEvent {
  return typeof value === "string" && (AFINIDAD_EVENTS as readonly string[]).includes(value);
}

/** Qué clave admite cada evento. */
export function allowedPropFor(event: AfinidadEvent): keyof EventProps | null {
  // Va antes del prefijo `afinidad_share_`: compartir una entrada no tiene
  // versión «anónima» (el enlace no lleva respuestas), así que no lleva nada.
  if (event === "afinidad_share_dvh") return null;
  if (event.startsWith("afinidad_share_")) return "anon";
  if (event.startsWith("afinidad_explore_")) return "from";
  if (event === "afinidad_context_declared") return "step";
  return null;
}

/**
 * Deja solo la propiedad que admite el evento, y solo si su valor es uno de
 * los permitidos. Todo lo demás se tira sin avisar: un `usual_vote`, un
 * `region` o un texto libre que alguien añadiera por error no salen nunca del
 * navegador (y si salieran, el servidor y la base los rechazan otra vez).
 */
export function sanitizeEventProps(event: AfinidadEvent, props: unknown): EventProps {
  if (!props || typeof props !== "object" || Array.isArray(props)) return {};
  const key = allowedPropFor(event);
  if (!key) return {};
  const value = (props as Record<string, unknown>)[key];
  switch (key) {
    case "anon":
      return typeof value === "boolean" ? { anon: value } : {};
    case "from":
      return (EXPLORE_FROM as readonly unknown[]).includes(value)
        ? { from: value as EventProps["from"] }
        : {};
    case "step":
      return (CONTEXT_STEPS as readonly unknown[]).includes(value)
        ? { step: value as EventProps["step"] }
        : {};
  }
}

/** Máximo de eventos por envío. Igual que `record_afinidad_events`. */
export const MAX_EVENTS_PER_BATCH = 20;
/** Tamaño máximo del cuerpo de un envío, en bytes. */
export const MAX_EVENT_BODY_BYTES = 4096;
/** Mismo patrón de versión que la base. */
export const DATASET_VERSION_RE = /^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$/;

export const EVENT_LOCALES = LOCALES;

/** Ruta que recibe los lotes. */
export const EVENT_ENDPOINT = "/api/afinidad/event";
