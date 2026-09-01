"use server";

import { registerAffiliate } from "@/lib/registration/register";
import type { RegistrationResult } from "@/lib/registration/schema";

/**
 * Punto de entrada del formulario. Deliberadamente fino: la lógica y las
 * comprobaciones viven en `register.ts`, que es código de servidor puro y se
 * puede probar sin montar React.
 */
export async function submitRegistration(input: unknown): Promise<RegistrationResult> {
  return registerAffiliate(input);
}
