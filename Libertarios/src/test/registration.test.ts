import { describe, it, expect } from "vitest";
import { registrationSchema } from "@/lib/registration/schema";
import { resolveProvince } from "@/data/geo/spain-provinces";

/**
 * Validación del alta.
 *
 * Antes de esto, `/registro` hacía `console.log` con los datos y enseñaba una
 * pantalla de éxito: todo el mundo creía haberse registrado y no se guardaba
 * nada. Estas pruebas fijan las condiciones que ahora tienen que cumplirse para
 * que una fila llegue a la base.
 */
describe("validación del registro", () => {
  const valid = {
    email: "persona@ejemplo.com",
    consent: true,
    country: "ES",
    region: "28",
    economic: 40,
    social: 55,
    method: "test",
    ageRange: "25-34",
    gender: "mujer",
  };

  it("acepta un alta completa", () => {
    expect(registrationSchema.safeParse(valid).success).toBe(true);
  });

  it("normaliza el correo, para que la deduplicación funcione", () => {
    const parsed = registrationSchema.parse({ ...valid, email: "  Persona@Ejemplo.COM " });
    expect(parsed.email).toBe("persona@ejemplo.com");
  });

  /**
   * La posición política es categoría especial del art. 9 del RGPD: sin
   * consentimiento afirmativo no puede guardarse. Se comprueba dos veces —aquí
   * y en la propia función de Postgres— para que no dependa de una sola capa.
   */
  it("rechaza el alta sin consentimiento explícito", () => {
    for (const consent of [false, undefined, null, "true", 1]) {
      expect(registrationSchema.safeParse({ ...valid, consent }).success).toBe(false);
    }
  });

  it("rechaza correos mal formados", () => {
    for (const email of ["", "sin-arroba", "a@b", "a@.com", "@ejemplo.com"]) {
      expect(registrationSchema.safeParse({ ...valid, email }).success).toBe(false);
    }
  });

  it("mantiene la posición dentro del cuadrante", () => {
    for (const economic of [-101, 101, 1.5, Number.NaN]) {
      expect(registrationSchema.safeParse({ ...valid, economic }).success).toBe(false);
    }
    for (const social of [-101, 101]) {
      expect(registrationSchema.safeParse({ ...valid, social }).success).toBe(false);
    }
  });

  it("solo admite los dos métodos de posicionamiento", () => {
    expect(registrationSchema.safeParse({ ...valid, method: "otro" }).success).toBe(false);
    expect(registrationSchema.safeParse({ ...valid, method: "manual" }).success).toBe(true);
  });

  it("deja opcionales los datos demográficos", () => {
    const parsed = registrationSchema.safeParse({
      ...valid,
      ageRange: undefined,
      gender: undefined,
    });
    expect(parsed.success).toBe(true);
  });

  /**
   * El formulario ofrece nombres de provincia y la base guarda códigos INE. Si
   * la traducción falla, el alta se guarda sin provincia y la persona
   * desaparece del mapa.
   */
  it("traduce todos los nombres de provincia del formulario a código INE", () => {
    const delFormulario = [
      "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
      "Badajoz", "Baleares", "Barcelona", "Bizkaia", "Burgos", "Cáceres", "Cádiz",
      "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca",
      "Gipuzkoa", "Girona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén",
      "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga",
      "Melilla", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra",
      "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria",
      "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Zamora", "Zaragoza",
    ];
    for (const name of delFormulario) {
      const province = resolveProvince({ properties: { name } });
      expect(province, `sin código INE para «${name}»`).toBeDefined();
      expect(province!.code).toMatch(/^\d{2}$/);
    }
  });
});
