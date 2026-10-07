"use client";

import { Check, Minus, Star, X } from "lucide-react";
import type { Answers, Dataset, Party, UserPosition } from "@/data/afinidad/types";
import { USER_POSITIONS } from "@/data/afinidad/types";
import { agreement, cellPosition, getStance } from "@/lib/afinidad/score";
import { answerLabel, fmt, rowLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { cn } from "@/lib/utils";
import { PartyAvatar } from "./PartyBadge";
import { SourcePopover, questionText } from "./SourcePopover";

export type CellState = "match" | "near" | "opposite" | "none" | "skipped";

/**
 * Estado de una celda partido × pregunta respecto a TU respuesta.
 *
 * Se usa la misma función de acuerdo que el motor (`agreement`), con la media
 * de las lentes que tengan dato: mismo lado → «coincide» (≥ 0,75), partido en
 * 0 o lentes en sentidos distintos → «a medias», lado contrario → «opuesta».
 * Así el punto dice lo mismo que la cifra del ranking, no otra cosa.
 */
export function cellState(dataset: Dataset, partyId: string, questionId: string, answer: UserPosition | null): CellState {
  if (answer === null) return "skipped";
  const positions = (["programme", "record"] as const)
    .map((lens) => cellPosition(dataset, partyId, questionId, lens))
    .filter((p): p is number => p !== null);
  if (positions.length === 0) return "none";
  const a = positions.reduce((s, p) => s + agreement(answer, p), 0) / positions.length;
  if (a >= 0.75) return "match";
  if (a > 0) return "near";
  return "opposite";
}

/** El punto de una celda. Forma e icono distintos por estado: el color no es la única señal. */
export function CellGlyph({ state, className }: { state: CellState; className?: string }) {
  const base = "flex h-6 w-6 items-center justify-center rounded-full";
  if (state === "match")
    return (
      <span className={cn(base, "bg-primary text-primary-foreground", className)}>
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  if (state === "near")
    return (
      <span
        className={cn(base, "border-2 border-primary", className)}
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)) 50%, transparent 50%)" }}
      />
    );
  if (state === "opposite")
    return (
      <span className={cn(base, "border-2 border-muted-foreground/60 text-muted-foreground", className)}>
        <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  if (state === "skipped") return <span className={cn(base, "text-muted-foreground/50", className)}>·</span>;
  return (
    <span className={cn(base, "border border-dashed border-border text-muted-foreground/70", className)}>
      <Minus className="h-3 w-3" aria-hidden />
    </span>
  );
}

const STATE_LABEL: Record<CellState, keyof ResultStrings> = {
  match: "cell_match",
  near: "cell_near",
  opposite: "cell_opposite",
  none: "cell_none",
  skipped: "cell_skipped",
};

/** Tu respuesta en miniatura: cuatro puntos de «muy en contra» a «muy a favor». */
function YouScale({ value, important, t }: { value: UserPosition | null; important: boolean; t: ResultStrings }) {
  return (
    <span className="flex items-center justify-center gap-0.5" title={value === null ? t.skipped : answerLabel(t, value)}>
      <span className="sr-only">{value === null ? t.skipped : answerLabel(t, value)}</span>
      {USER_POSITIONS.map((p) => (
        <span
          key={p}
          aria-hidden
          className={cn(
            "h-2 w-2 rounded-full",
            value === p ? "bg-foreground" : "bg-muted-foreground/20",
            p === 1 && "ml-1",
          )}
        />
      ))}
      {important && <Star className="ml-0.5 h-3 w-3 fill-primary text-primary" aria-label={t.important} />}
    </span>
  );
}

/**
 * Pregunta a pregunta, como rejilla: filas = afirmaciones (rótulo corto),
 * columnas = tus primeros partidos, celda = un punto que dice si ese partido
 * coincide contigo en esa medida. Tocar un punto abre sus fuentes.
 *
 * Sustituye a la lista de texto como vista principal (dueño: «poco visual»);
 * la lista sigue debajo, plegada, con todas las fuentes de todos los
 * partidos. En móvil la rejilla se desplaza en horizontal dentro de la
 * tarjeta, con la columna de rótulos fija.
 */
export function QuestionGrid({
  dataset,
  answers,
  parties,
  t,
  lang,
}: {
  dataset: Dataset;
  answers: Answers;
  parties: Party[];
  t: ResultStrings;
  lang: string;
}) {
  const questions = [...dataset.questions].sort((a, b) => a.order - b.order);
  return (
    <div>
      {/* `relative`: los rótulos `sr-only` son `position: absolute`; sin un
          ancestro posicionado escapaban del recorte horizontal y ensanchaban
          la página entera en móvil. */}
      <div className="relative -mx-1 overflow-x-auto px-1 pb-1">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">{t.breakdownTitle}</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-card" />
              {/* En móvil «Tú» va bajo el rótulo de cada fila: así caben cuatro
                  partidos sin desplazar la rejilla. */}
              <th scope="col" className="hidden px-1 pb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:table-cell">
                {t.gridYou}
              </th>
              {parties.map((p) => (
                <th key={p.id} scope="col" className="px-0.5 pb-2" title={p.name}>
                  <span className="flex justify-center">
                    <PartyAvatar party={p} size={28} />
                  </span>
                  <span className="sr-only">{p.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => {
              const a = answers[q.id];
              const value = a && a !== "skip" ? a.value : null;
              const label = rowLabel(t, q, lang);
              return (
                <tr key={q.id} className="group">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-[7.5rem] max-w-[7.5rem] border-t border-border bg-card py-1 pr-2 align-middle sm:w-auto sm:max-w-none"
                    title={questionText(q, lang)}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{q.order}</span>
                      <span className="line-clamp-2 text-xs font-medium leading-tight text-foreground">{label}</span>
                    </span>
                    <span className="ml-5 mt-0.5 flex sm:hidden">
                      <YouScale value={value} important={!!(a && a !== "skip" && a.important)} t={t} />
                    </span>
                  </th>
                  <td className="hidden border-t border-border px-1 text-center align-middle sm:table-cell" aria-hidden>
                    <YouScale value={value} important={!!(a && a !== "skip" && a.important)} t={t} />
                  </td>
                  {parties.map((p) => {
                    const state = cellState(dataset, p.id, q.id, value);
                    const stateText = t[STATE_LABEL[state]] as string;
                    return (
                      <td key={p.id} className="border-t border-border p-0 text-center align-middle" data-cell={`${p.id}|${q.id}`} data-state={state}>
                        <SourcePopover
                          party={p}
                          question={q}
                          stance={getStance(dataset, p.id, q.id)}
                          quotes={dataset.quotes}
                          t={t}
                          lang={lang}
                          trigger={<CellGlyph state={state} />}
                          triggerLabel={fmt(t.gridCell, { party: p.name, question: `${q.order}. ${label}`, state: stateText })}
                          triggerClassName="mx-auto flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label={t.legendTitle}>
        {(["match", "near", "opposite", "none"] as const).map((s) => (
          <li key={s} className="inline-flex items-center gap-1.5">
            <CellGlyph state={s} className="h-4 w-4 [&_svg]:h-2.5 [&_svg]:w-2.5" />
            {t[STATE_LABEL[s]] as string}
          </li>
        ))}
      </ul>
    </div>
  );
}
