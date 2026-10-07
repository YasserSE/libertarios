import { DATASET_VERSION } from "@/data/afinidad/types";
import { LOCALES } from "@/i18n/config";
import {
  EVENT_ENDPOINT,
  MAX_EVENTS_PER_BATCH,
  sanitizeEventProps,
  type AfinidadEvent,
  type EventProps,
} from "./events";

/**
 * Registro de uso de «¿A quién votar?»: sin cookies, sin banner y sin
 * terceros.
 *
 * Decisión del dueño: los eventos se guardan en nuestra propia base
 * (`afinidad_events`, migración 0009) y se miran en `/admin/afinidad`. Nada de
 * proveedores externos.
 *
 * Cómo viaja un evento:
 *   1. `track()` limpia las propiedades (`sanitizeEventProps`: solo la que
 *      admite ese evento y con un valor de la lista), emite un `CustomEvent` en
 *      `window` (para tests y para quien quiera escucharlo) y lo pone en cola.
 *   2. La cola se manda en lote a `POST /api/afinidad/event` a los 3 s, al
 *      llegar a 20 eventos o al ocultar la pestaña, con `navigator.sendBeacon`
 *      (sobrevive al cierre) o `fetch(…, { keepalive })` si no hay beacon.
 *   3. La ruta valida con zod y llama a `record_afinidad_events` con la clave
 *      anónima. La IP de quien envía no llega a la base.
 *
 * Nunca bloquea la interfaz ni lanza: cualquier error se traga.
 *
 * Qué NO se envía, por diseño: respuestas, «esto me importa», comunidad, voto
 * habitual, partidos, resultado, URL, referer ni ningún identificador. No hay
 * id de sesión ni nada guardado en el navegador para esto. Con «Global Privacy
 * Control» o «Do Not Track» activos no se envía nada.
 *
 * Regla para quien llame: solo contexto de interfaz (canal, desde dónde, qué
 * paso). Las propiedades no previstas se tiran aquí, en el servidor y en la
 * base, pero la responsabilidad es de quien llama.
 */

export type { AfinidadEvent, ShareChannel, ExploreDestination } from "./events";

/** Lo que aceptan los llamantes; se reduce a `EventProps` al limpiar. */
export type TrackProps = Record<string, string | number | boolean>;

/** Nombre del `CustomEvent` en `window`, por si alguien quiere escucharlo. */
export const TRACK_EVENT = "afinidad:track";

const FLUSH_DELAY_MS = 3000;

type Queued = { n: AfinidadEvent; p: EventProps };

let queue: Queued[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

/** Transporte sustituible en tests. Por defecto, beacon o fetch con keepalive. */
type Transport = (body: string) => void;

const defaultTransport: Transport = (body) => {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(EVENT_ENDPOINT, blob)) return;
    }
  } catch {
    // Sigue con fetch.
  }
  try {
    if (typeof fetch !== "function") return;
    void fetch(EVENT_ENDPOINT, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      credentials: "omit",
      cache: "no-store",
    }).catch(() => {});
  } catch {
    // La analítica nunca puede romper el test.
  }
};

let transport: Transport = defaultTransport;

/** Solo para tests: sustituye el envío. `null` restaura el de verdad. */
export function setTrackTransport(next: Transport | null): void {
  transport = next ?? defaultTransport;
}

/** ¿Pidió la persona que no se la registre? GPC o DNT, lo que haya. */
function optedOut(): boolean {
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean; doNotTrack?: string | null };
    return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
  } catch {
    return false;
  }
}

/** Idioma de la página, del primer segmento de la ruta; si no, castellano. */
function currentLocale(): string {
  try {
    const first = window.location.pathname.split("/")[1] ?? "";
    return (LOCALES as readonly string[]).includes(first) ? first : "es";
  } catch {
    return "es";
  }
}

/** Manda lo que haya en cola. Exportada para tests y para forzar el envío. */
export function flushTrackQueue(): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  while (queue.length > 0) {
    const batch = queue.slice(0, MAX_EVENTS_PER_BATCH);
    queue = queue.slice(MAX_EVENTS_PER_BATCH);
    try {
      transport(JSON.stringify({ v: DATASET_VERSION, l: currentLocale(), e: batch }));
    } catch {
      // Se pierde el lote; no se reintenta para no acumular.
    }
  }
}

function listenForHide() {
  if (listening) return;
  listening = true;
  // `pagehide` y `visibilitychange → hidden` son los últimos momentos fiables
  // para enviar en móvil; `unload` no se dispara en muchos navegadores.
  window.addEventListener("pagehide", flushTrackQueue);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushTrackQueue();
  });
}

export function track(event: AfinidadEvent, props?: TrackProps): void {
  if (typeof window === "undefined") return;
  try {
    const clean = sanitizeEventProps(event, props);
    const detail = { event, props: Object.keys(clean).length > 0 ? clean : undefined };
    window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail }));
    if (process.env.NODE_ENV === "development") console.debug("[track]", event, clean);

    if (optedOut()) return;
    queue.push({ n: event, p: clean });
    listenForHide();
    if (queue.length >= MAX_EVENTS_PER_BATCH) {
      flushTrackQueue();
    } else if (!timer) {
      timer = setTimeout(flushTrackQueue, FLUSH_DELAY_MS);
    }
  } catch {
    // La analítica nunca puede romper el test.
  }
}
