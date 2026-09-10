"use client";

/**
 * Lo que el navegador recuerda del resultado.
 *
 * Dos cosas distintas, y conviene no confundirlas:
 *
 *   * La **posición**, para que volver a `/cuadrante` no obligue a repetir
 *     veinte preguntas. Es una comodidad y solo vale en este dispositivo.
 *   * El **token**, que es lo que permite recuperar el resultado desde otro
 *     móvil u otro ordenador. Sin él, borrar el navegador equivale a perder el
 *     resultado aunque siga guardado en la base.
 *
 * Todo va envuelto en `try`: en ventana privada o con el almacenamiento
 * bloqueado, `localStorage` no solo viene vacío, lanza al tocarlo. Si falla, el
 * sitio sigue funcionando como si fuera la primera visita.
 */

const KEY = "libertarios:resultado";
/**
 * Clave de la primera versión: solo marcaba «ya se registró», sin posición ni
 * token. Ya no se lee —ver el comentario del muro en `cuadrante/page.tsx`— y
 * aquí solo se limpia, para no dejar rastro de un formato que nadie interpreta.
 */
const LEGACY_UNLOCKED_KEY = "libertarios:registrado";

export type StoredResult = {
  economic: number;
  social: number;
  /** Ausente si la base no devolvió token; entonces solo vale en este equipo. */
  token?: string;
  savedAt: string;
};

const valid = (n: unknown) =>
  typeof n === "number" && Number.isInteger(n) && n >= -100 && n <= 100;

export function readStoredResult(): StoredResult | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredResult>;
    if (!valid(parsed.economic) || !valid(parsed.social)) return null;
    return {
      economic: parsed.economic as number,
      social: parsed.social as number,
      token: typeof parsed.token === "string" ? parsed.token : undefined,
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function storeResult(result: { economic: number; social: number; token?: string | null }) {
  try {
    // El token anterior se conserva si esta vez no llega ninguno: perderlo
    // dejaría a la persona sin enlace de recuperación sin haber pedido nada.
    const previous = readStoredResult();
    const payload: StoredResult = {
      economic: result.economic,
      social: result.social,
      token: result.token ?? previous?.token,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
    window.localStorage.removeItem(LEGACY_UNLOCKED_KEY);
  } catch {
    // Sin almacenamiento no hay memoria entre visitas. La sesión actual sigue.
  }
}

export function forgetStoredResult() {
  try {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(LEGACY_UNLOCKED_KEY);
  } catch {
    // Nada que borrar.
  }
}
