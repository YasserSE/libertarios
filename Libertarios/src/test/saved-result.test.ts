import { describe, it, expect, beforeEach } from "vitest";
import { forgetStoredResult, readStoredResult, storeResult } from "@/lib/results/storage";

/** Marca de la primera versión, que ya no interpreta nadie. */
const LEGACY_KEY = "libertarios:registrado";

/**
 * Memoria del resultado en el navegador.
 *
 * Es lo que decide si volver al sitio te devuelve tu posición o un test en
 * blanco, así que los casos raros importan más de lo que parece: lo que hay
 * guardado puede venir de una versión anterior del sitio, de otra pestaña o de
 * alguien tocando la consola. Nada de eso debe romper la página.
 */
describe("resultado guardado en el navegador", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("devuelve lo que se guardó", () => {
    storeResult({ economic: 40, social: -25, token: "abc" });
    expect(readStoredResult()).toMatchObject({ economic: 40, social: -25, token: "abc" });
  });

  /**
   * Quien se registró antes de que existiera el enlace de recuperación solo
   * tiene esa marca antigua. Si siguiera abriendo el muro, no volvería a pedir
   * un token nunca: se ignora, y se limpia en cuanto hay algo mejor guardado.
   */
  it("limpia la marca de la primera versión", () => {
    window.localStorage.setItem(LEGACY_KEY, "1");
    storeResult({ economic: 0, social: 0, token: null });
    expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
  });

  /**
   * Repetir el test no debería costarte el enlace de recuperación: si esta vez
   * no llega token —base sin migrar, fallo de red— se conserva el anterior.
   */
  it("conserva el token anterior si el nuevo alta no devuelve ninguno", () => {
    storeResult({ economic: 10, social: 10, token: "tok" });
    storeResult({ economic: -10, social: 20, token: null });
    expect(readStoredResult()).toMatchObject({ economic: -10, social: 20, token: "tok" });
  });

  it("ignora lo que no sea una posición válida", () => {
    for (const raw of [
      "{}",
      "no es json",
      '{"economic":40}',
      '{"economic":"40","social":10}',
      '{"economic":101,"social":10}',
      '{"economic":1.5,"social":10}',
    ]) {
      window.localStorage.setItem("libertarios:resultado", raw);
      expect(readStoredResult(), `debería ignorar ${raw}`).toBeNull();
    }
  });

  it("no arrastra un token que no sea texto", () => {
    window.localStorage.setItem(
      "libertarios:resultado",
      '{"economic":5,"social":5,"token":{"a":1}}',
    );
    expect(readStoredResult()?.token).toBeUndefined();
  });

  it("olvidar no deja rastro", () => {
    window.localStorage.setItem(LEGACY_KEY, "1");
    storeResult({ economic: 5, social: 5, token: "tok" });
    forgetStoredResult();
    expect(readStoredResult()).toBeNull();
    expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
  });
});
