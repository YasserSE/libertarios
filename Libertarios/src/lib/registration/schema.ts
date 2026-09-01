import { z } from "zod";

/**
 * Forma y reglas de un alta.
 *
 * Vive separado de `register.ts` porque ese fichero importa `server-only` y
 * lanza en cuanto alguien lo carga fuera del servidor —incluidos los tests—.
 * El esquema es puro y se puede validar desde cualquier sitio.
 */

export const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"] as const;
export const GENDERS = ["hombre", "mujer", "no-binario", "otro", "prefiero-no-decir"] as const;

export const registrationSchema = z.object({
  email: z.string().trim().toLowerCase().email("Introduce un correo válido").max(254),
  /**
   * La posición política es categoría especial del art. 9 del RGPD: exige
   * consentimiento afirmativo. `literal(true)` rechaza también `"true"`, `1` y
   * `undefined`, que es justo lo que llegaría de un formulario mal cableado.
   */
  consent: z.literal(true, {
    errorMap: () => ({ message: "Necesitamos tu consentimiento explícito para registrarte" }),
  }),
  country: z.string().length(2).toUpperCase(),
  /** Código INE de provincia; solo aplica a España. */
  region: z.string().max(8).optional().nullable(),
  economic: z.number().int().min(-100).max(100),
  social: z.number().int().min(-100).max(100),
  method: z.enum(["test", "manual"]),
  ageRange: z.enum(AGE_RANGES).optional().nullable(),
  gender: z.enum(GENDERS).optional().nullable(),
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationResult = { ok: true } | { ok: false; error: string };
