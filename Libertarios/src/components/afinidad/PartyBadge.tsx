import type { Party } from "@/data/afinidad/types";
import type { ResultStrings } from "@/i18n/afinidad/result";

/**
 * Distintivo de partido: siglas sobre su color, nunca el logotipo.
 *
 * Los logotipos son marcas registradas (ver `docs/REFERENCIAS.md`) y además
 * pesan visualmente distinto unos de otros; un círculo del mismo tamaño para
 * todos es lo único que no favorece a nadie. Es el mismo criterio que
 * `ReferenceAvatar` en el cuadrante.
 */
export function PartyAvatar({ party, size = 32 }: { party: Party; size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        background: party.color,
        color: readableInk(party.color),
        fontSize: size * (party.initials.length > 3 ? 0.28 : 0.36),
      }}
      className="flex shrink-0 items-center justify-center rounded-full font-display font-bold leading-none ring-1 ring-border"
    >
      {party.initials}
    </span>
  );
}

/** Aviso de coalición aún no registrada; se enseña, no se esconde al partido. */
export function StatusBadge({ party, t }: { party: Party; t: ResultStrings }) {
  if (party.status !== "por-confirmar") return null;
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {t.statusPending}
    </span>
  );
}

export function PartyBadge({
  party,
  t,
  size = 32,
  showStatus = true,
}: {
  party: Party;
  t: ResultStrings;
  size?: number;
  showStatus?: boolean;
}) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <PartyAvatar party={party} size={size} />
      <span className="min-w-0">
        <span className="block truncate font-medium text-foreground">{party.name}</span>
        {showStatus && <StatusBadge party={party} t={t} />}
      </span>
    </span>
  );
}

/**
 * Negro o blanco según cuál contraste más con el color del partido: los hay
 * del amarillo al morado oscuro, y un texto fijo sería ilegible en alguno.
 */
function readableInk(hex: string): string {
  const v = hex.replace("#", "");
  if (v.length !== 6) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.45 ? "#101418" : "#ffffff";
}
