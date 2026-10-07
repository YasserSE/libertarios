import type { Dataset, Party } from "@/data/afinidad/types";
import { computeAffinity } from "./score";
import { decodeResultParams } from "./encode";
import { visiblePartyIds } from "./select";

/**
 * Primer partido del resultado codificado en `sp` (`?r=&v=&ca=&vh=`), con el
 * mismo cálculo que la página y la imagen OG (ranking combinado, solo partidos
 * con datos suficientes). `null` si el enlace no se puede leer o no hay
 * respuestas suficientes: entonces el título de la vista previa es el genérico.
 */
export function resultLeader(sp: URLSearchParams, data: Dataset): Party | null {
  if (!sp.get("r") || data.questions.length === 0) return null;
  const decoded = decodeResultParams(sp, data.questions, {
    currentVersion: data.version,
    partyIds: data.parties.map((p) => p.id),
  });
  if (!decoded) return null;
  const { region, usualVote } = decoded.context;
  const partyIds = visiblePartyIds(data.parties, region, { include: usualVote ? [usualVote] : [] });
  const combined = computeAffinity(decoded.answers, data, "combined", { partyIds });
  if (!combined.enoughAnswers) return null;
  const top = combined.ranking.find((e) => e.usable);
  return top ? (data.parties.find((p) => p.id === top.partyId) ?? null) : null;
}
