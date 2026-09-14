import { describe, it, expect } from "vitest";
import { formatPublishedCount } from "@/lib/affiliates/format";

/**
 * Cómo se imprime un recuento que viene de las vistas públicas.
 */
describe("formatPublishedCount", () => {
  /**
   * Las vistas suprimen a cero por debajo de cinco registros, así que ese cero
   * no significa «nadie»: imprimirlo como «0» le decía a quien acababa de
   * registrarse en Soria que su provincia estaba vacía.
   */
  it("un territorio suprimido sale como «<5», nunca como 0", () => {
    expect(formatPublishedCount(0)).toBe("<5");
  });

  /**
   * El castellano no agrupa los millares de cuatro cifras —CLDR fija
   * `minimumGroupingDigits=2` para `es`—, así que «3118» se escribe sin punto y
   * el separador no aparece hasta las cinco. Se fija aquí porque parece un
   * error y no lo es: sin esta prueba, alguien lo «arregla» y rompe el formato.
   */
  it("agrupa los millares como manda el castellano", () => {
    expect(formatPublishedCount(5)).toBe("5");
    expect(formatPublishedCount(3118)).toBe("3118");
    expect(formatPublishedCount(13118)).toBe("13.118");
  });
});
