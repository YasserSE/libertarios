import { fmt, type ResultStrings } from "@/i18n/afinidad/result";

/**
 * «Sus votos coinciden con su programa en N de M».
 *
 * Un recuento y no un porcentaje ni una nota: «8 de 10» deja ver sobre cuántas
 * preguntas se mide, y no suena a calificación. Sin pares programa–voto no se
 * pinta nada: «0 de 0» parecería un suspenso.
 */
export function CoherenceBadge({ matches, items, t }: { matches: number; items: number; t: ResultStrings }) {
  if (items === 0) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
      {fmt(t.coherence, { n: matches, m: items })}
    </span>
  );
}
