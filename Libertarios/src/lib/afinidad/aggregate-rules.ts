import { z } from "zod";
import { AFINIDAD_LOCALES } from "@/i18n/config";
import type { Question } from "@/data/afinidad/types";
import { decodeResultParams } from "./encode";
import { MIN_ANSWERS } from "./score";

/**
 * Reglas puras de los agregados y de la lista de avisos.
 *
 * Viven separadas de `aggregate.ts` por lo mismo que `registration/schema.ts`
 * está separado de `register.ts`: aquel importa `server-only` y lanza en
 * cuanto se carga fuera del servidor —tests incluidos—. Esto se puede probar y
 * se puede importar desde cualquier sitio (también la comprobación de veda).
 */

// ─── Veda de sondeos (art. 69.7 LOREG) ──────────────────────────────────────

/**
 * «Durante los cinco días anteriores al de la votación queda prohibida la
 * publicación y difusión o reproducción de sondeos electorales». Para el
 * 29-N-2026 son del 24 al 28 de noviembre, y el propio día 29 hasta el cierre
 * de los colegios. En Canarias cierran a las 20:00 locales (21:00 peninsular):
 * la veda acaba con el último colegio, no con el primero.
 *
 * Un agregado «el N % de quienes hicieron el test coincide con X» no es un
 * sondeo en sentido técnico, pero se le parece lo bastante como para que la
 * Junta Electoral pueda verlo así; el dueño decidió no arriesgar.
 *
 * Offsets explícitos (+01:00): el 25-oct-2026 Madrid pasa a horario de
 * invierno, así que toda la ventana es CET. Escribirlo como instante evita que
 * el resultado dependa de la zona horaria del servidor (Vercel corre en UTC).
 */
export const EMBARGO_START = new Date("2026-11-24T00:00:00+01:00");
/** Inclusive: a las 21:00:00 peninsulares en punto todavía hay veda. */
export const EMBARGO_END = new Date("2026-11-29T21:00:00+01:00");

/**
 * ¿Está prohibido publicar agregados en este instante?
 *
 * Todo código que publique o difunda agregados (páginas, OG, JSON abierto,
 * redes) debe comprobarlo, y ante la duda (fecha inválida) se trata como veda.
 */
export function isPublicationEmbargoed(date: Date = new Date()): boolean {
  const t = date.getTime();
  if (Number.isNaN(t)) return true;
  return t >= EMBARGO_START.getTime() && t <= EMBARGO_END.getTime();
}

/** Mínimo de personas por celda para publicar un agregado. Igual que en la migración. */
export const K_ANONYMITY = 20;

// ─── Respuesta anónima ──────────────────────────────────────────────────────

/** Fila tal como la espera `record_afinidad_response`. Sin nada que identifique. */
export interface AfinidadResponseRow {
  datasetVersion: string;
  /** Por posición (`Question.order`); `null` = saltada. */
  answers: (number | null)[];
  important: boolean[];
  region: string | null;
  usualVote: string | null;
}

/** Un enlace de resultado razonable mide < 100 caracteres; esto corta abusos. */
const MAX_PARAMS_LENGTH = 512;

/**
 * Convierte los parámetros del enlace de resultado (`r=…&v=…[&ca=…][&vh=…]`)
 * en una fila para la base, o `null` si no debe guardarse.
 *
 * Se descarta, en vez de «arreglar», todo lo dudoso:
 *   * enlaces que no decodifican con `encode.ts` (cortados, editados);
 *   * versión distinta de la actual: las posiciones del array cambian de
 *     significado entre versiones y mezclarlas falsearía los agregados;
 *   * menos de `MIN_ANSWERS` respondidas: no habría resultado que mostrar.
 * Un voto habitual que no es un partido del dataset se descarta él solo; el
 * resto de la respuesta sigue valiendo.
 */
export function toResponseRow(
  encodedParams: unknown,
  opts: { questions: readonly Question[]; partyIds: readonly string[]; currentVersion: string },
): AfinidadResponseRow | null {
  if (typeof encodedParams !== "string" || encodedParams.length > MAX_PARAMS_LENGTH) return null;
  const params = new URLSearchParams(encodedParams.startsWith("?") ? encodedParams.slice(1) : encodedParams);

  const decoded = decodeResultParams(params, opts.questions, {
    currentVersion: opts.currentVersion,
    partyIds: opts.partyIds,
  });
  if (!decoded || decoded.stale || decoded.version !== opts.currentVersion) return null;

  const ordered = [...opts.questions].sort((a, b) => a.order - b.order);
  const answers: (number | null)[] = [];
  const important: boolean[] = [];
  for (const q of ordered) {
    const a = decoded.answers[q.id];
    if (!a || a === "skip") {
      answers.push(null);
      important.push(false);
    } else {
      answers.push(a.value);
      important.push(a.important);
    }
  }
  if (answers.filter((a) => a !== null).length < MIN_ANSWERS) return null;

  return {
    datasetVersion: opts.currentVersion,
    answers,
    important,
    region: decoded.context.region ?? null,
    usualVote: decoded.context.usualVote ?? null,
  };
}

// ─── «Avísame cuando cambien los programas» ─────────────────────────────────

/**
 * Códigos de error, no frases: el formulario está en cuatro idiomas y es él
 * quien los traduce. Un mensaje en castellano fijado aquí saldría tal cual en
 * la versión vasca.
 */
export type SubscribeError = "invalid-email" | "consent-required" | "unavailable";
export type SubscribeResult = { ok: true } | { ok: false; error: SubscribeError };

export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  /**
   * Consentimiento afirmativo. Una casilla HTML marcada llega como `"on"`; sin
   * marcar, no llega. Se aceptan solo `"on"` y `"true"`: cualquier otra cosa
   * (incluido `"false"`, que un formulario mal cableado podría mandar) es «no».
   */
  consent: z.enum(["on", "true"]),
  locale: z.enum(AFINIDAD_LOCALES).catch("es"),
});

export type SubscribeInput = z.output<typeof subscribeSchema>;

/** Lee el `FormData` del formulario (`email`, `consent`, `locale`). */
export function parseSubscribeForm(
  formData: FormData,
): { ok: true; data: SubscribeInput } | { ok: false; error: SubscribeError } {
  const raw = {
    email: formData.get("email"),
    consent: formData.get("consent"),
    locale: formData.get("locale"),
  };
  const parsed = subscribeSchema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };
  // El consentimiento manda sobre el correo: si falta, eso es lo que hay que
  // decirle a la persona, aunque además se haya equivocado al escribir.
  const consentFailed = parsed.error.issues.some((i) => i.path[0] === "consent");
  return { ok: false, error: consentFailed ? "consent-required" : "invalid-email" };
}
