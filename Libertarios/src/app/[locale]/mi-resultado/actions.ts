"use server";

import { fetchResultByToken } from "@/lib/results/lookup";
import type { SavedResult } from "@/lib/registration/schema";

/**
 * Consulta del propio resultado. Fina a propósito: la lógica está en
 * `lookup.ts`, que es código de servidor puro.
 */
export async function getSavedResult(token: unknown): Promise<SavedResult | null> {
  return fetchResultByToken(token);
}
