import { FileText, Vote } from "lucide-react";
import { pct, type ResultStrings } from "@/i18n/afinidad/result";

/**
 * Una barra fina de afinidad (programa o votos) en una sola línea: icono de la
 * lente, barra y cifra.
 *
 * Tres estados y ninguno se pinta como 0: con dato, «datos insuficientes» y
 * «sin historial en el Congreso». Una barra vacía con un 0 % al lado diría que
 * no coincides en nada con un partido del que simplemente no sabemos nada.
 *
 * Las dos lentes usan el color del sitio con distinta intensidad, nunca el
 * color del partido: el color de marca haría que los partidos de colores vivos
 * «pesaran» más a la vista. Lo que distingue las lentes es el icono (documento
 * / urna) además del tono.
 */
export type BarState = "ok" | "insufficient" | "no-record";

export function PartyBar({
  label,
  value,
  state,
  lens,
  t,
  hint,
  basedOn,
}: {
  label: string;
  value: number | null;
  state: BarState;
  lens: "programme" | "record";
  t: ResultStrings;
  /** Texto pequeño (p. ej. «programa 2023 — se actualizará…»); va en `title`. */
  hint?: string;
  /** «basado en X de Y respuestas»; va en `title` y en el detalle de la fila. */
  basedOn?: string;
}) {
  const shown = state === "ok" && value !== null;
  const fill = lens === "programme" ? "bg-primary/45" : "bg-primary";
  const Icon = lens === "programme" ? FileText : Vote;
  const text = shown ? pct(value) : state === "no-record" ? t.noRecord : t.insufficient;
  return (
    <div className="flex min-w-0 items-center gap-2" title={[label, basedOn, hint].filter(Boolean).join(" · ")}>
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      {shown ? (
        <div
          className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted"
          role="meter"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value * 100)}
          aria-valuetext={text}
        >
          <div
            className={`h-full rounded-full ${fill} transition-[width] duration-700 ease-out motion-reduce:transition-none`}
            style={{ width: `${Math.round(value * 100)}%` }}
          />
        </div>
      ) : (
        <span className="min-w-0 flex-1 truncate text-[11px] italic text-muted-foreground">
          <span className="sr-only">{label}: </span>
          <span data-state={state}>{text}</span>
        </span>
      )}
      {shown && (
        <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-foreground" data-state={state}>
          {text}
        </span>
      )}
    </div>
  );
}
