"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * «Esto me importa»: duplica el peso de la pregunta en el cálculo.
 *
 * Rediseño: una estrella que se rellena, no un botón con frase. Es el gesto
 * que la gente ya conoce de «favorito», y libera la tarjeta de texto. El
 * nombre accesible sigue siendo la frase entera (con «cuenta el doble» como
 * `title`), y el estado no depende solo del color: la estrella pasa de
 * contorno a rellena y `aria-pressed` lo anuncia.
 *
 * Un botón con `aria-pressed` y no una casilla, porque se activa también con
 * la tecla I y un interruptor de dos estados es exactamente eso.
 */
export function ImportanceToggle({
  pressed,
  onToggle,
  label,
  help,
  srContext,
  showLabel = false,
}: {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  help?: string;
  /** Para lectores de pantalla en listas: a qué afirmación se refiere. */
  srContext?: string;
  /** Texto visible junto a la estrella (desde `sm`). */
  showLabel?: boolean;
  /** @deprecated El rediseño ya es compacto siempre; se acepta por compatibilidad. */
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={srContext ? `${label} — ${srContext}` : label}
      title={help ? `${label} · ${help}` : label}
      onClick={onToggle}
      className={cn(
        "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pressed
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      <Star
        className={cn("h-5 w-5 shrink-0 transition-transform motion-safe:duration-200", pressed && "fill-current motion-safe:scale-110")}
        aria-hidden
      />
      {showLabel && (
        <span aria-hidden className="hidden pr-1 sm:inline">
          {label}
        </span>
      )}
    </button>
  );
}
