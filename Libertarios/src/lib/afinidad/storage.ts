import {
  USER_POSITIONS,
  type AnswerContext,
  type Answers,
  type UserPosition,
} from "@/data/afinidad/types";
import { INE_REGION } from "./schema";

/**
 * Lo que el navegador recuerda del test «¿A quién votar?».
 *
 * Sirve para dos cosas: retomar el test si se cierra la pestaña a mitad (en el
 * móvil pasa constantemente: llega un WhatsApp y se pierde la página) y volver
 * a ver el último resultado sin repetir las preguntas. Solo vive en este
 * dispositivo: no se manda a ningún servidor, y por eso puede guardar el voto
 * habitual sin problema de privacidad.
 *
 * Clave propia (`libertarios:afinidad`), separada de la del cuadrante: son
 * productos distintos y borrar uno no debe borrar el otro.
 *
 * Todo va envuelto en `try`: en ventana privada o con el almacenamiento
 * bloqueado, `localStorage` lanza al tocarlo. Si falla, el test funciona igual,
 * solo que sin memoria entre visitas.
 */

export const STORAGE_KEY = "libertarios:afinidad";

/** Respuesta en curso: posición o «No sé». La importancia va aparte. */
export type FlowValue = UserPosition | "skip";

export interface StoredAfinidad {
  /** Versión del dataset con la que se respondió. */
  version: string;
  values: Record<string, FlowValue>;
  /**
   * Preguntas marcadas «Esto me importa». Va separado de `values` porque se
   * puede marcar antes de responder (es lo natural: primero decides que te
   * importa, después contestas), y entonces aún no hay respuesta donde ponerlo.
   */
  important: string[];
  context: AnswerContext;
  /** Ya pasó (o saltó) los dos pasos de contexto. */
  contextDone: boolean;
  /** Llegó al resultado: el intro ofrece verlo de nuevo en vez de continuar. */
  completed: boolean;
  savedAt: string;
}

const isValue = (v: unknown): v is FlowValue =>
  v === "skip" || (typeof v === "number" && (USER_POSITIONS as readonly number[]).includes(v));

const PARTY_ID_RE = /^[a-z0-9-]{1,32}$/;

/**
 * Lee lo guardado, validándolo todo: puede venir de una versión anterior del
 * cuestionario, de otra pestaña o de alguien tocando la consola. Si se pasan
 * `questionIds`, se descartan las respuestas a preguntas que ya no existen; así
 * un cambio de dataset no deja respuestas huérfanas que luego nadie pinta.
 */
export function readAfinidad(questionIds?: readonly string[]): StoredAfinidad | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAfinidad> | null;
    if (!parsed || typeof parsed !== "object") return null;

    const known = questionIds ? new Set(questionIds) : null;
    const keep = (id: string) => !known || known.has(id);

    const values: Record<string, FlowValue> = {};
    if (parsed.values && typeof parsed.values === "object") {
      for (const [id, v] of Object.entries(parsed.values)) {
        if (keep(id) && isValue(v)) values[id] = v;
      }
    }
    const important = Array.isArray(parsed.important)
      ? parsed.important.filter((id): id is string => typeof id === "string" && keep(id))
      : [];

    const context: AnswerContext = {};
    const ctx = parsed.context;
    if (ctx && typeof ctx === "object") {
      if (typeof ctx.region === "string" && INE_REGION.test(ctx.region)) context.region = ctx.region;
      if (typeof ctx.usualVote === "string" && PARTY_ID_RE.test(ctx.usualVote)) context.usualVote = ctx.usualVote;
    }

    return {
      version: typeof parsed.version === "string" ? parsed.version : "",
      values,
      important: Array.from(new Set(important)),
      context,
      contextDone: parsed.contextDone === true,
      completed: parsed.completed === true,
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function storeAfinidad(state: Omit<StoredAfinidad, "savedAt">): void {
  try {
    const payload: StoredAfinidad = { ...state, savedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Sin almacenamiento no hay memoria entre visitas. La sesión actual sigue.
  }
}

export function forgetAfinidad(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada que borrar.
  }
}

/**
 * Respuestas en el formato del motor y de `encode.ts`. Una pregunta marcada
 * importante pero respondida con «No sé» no pesa: no hay nada que pesar.
 */
export function toAnswers(values: Record<string, FlowValue>, important: Iterable<string>): Answers {
  const imp = new Set(important);
  const out: Answers = {};
  for (const [id, v] of Object.entries(values)) {
    out[id] = v === "skip" ? "skip" : { value: v, important: imp.has(id) };
  }
  return out;
}

/** Respondidas de verdad (sin contar «No sé»), que es lo que exige el motor. */
export function countAnswered(values: Record<string, FlowValue>): number {
  return Object.values(values).filter((v) => v !== "skip").length;
}
