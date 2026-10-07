"use client";

import type { RefObject } from "react";
import { ArrowRight, Info, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Question } from "@/data/afinidad/types";
import { questionText, type AfinidadLang, type FlowStrings } from "@/i18n/afinidad/flow";
import { getResultStrings, rowLabel } from "@/i18n/afinidad/result";
import type { FlowValue } from "@/lib/afinidad/storage";
import { cn } from "@/lib/utils";
import { ImportanceToggle } from "./ImportanceToggle";

/**
 * Revisión antes del resultado.
 *
 * Rediseño: una fila por afirmación —número, tema, tu respuesta como ficha y
 * la estrella— en vez de un bloque de texto por cada una. El enunciado va en
 * una línea (completo para el lector de pantalla, en la etiqueta del botón) y
 * «qué mide» queda plegado: sigue disponible aquí, después de responder y
 * nunca antes, que es lo que importa para no convertir el test en argumento.
 *
 * El botón de resultado se desactiva por debajo del mínimo de respuestas del
 * motor: dejar pasar para enseñar después «datos insuficientes» en todos los
 * partidos sería una pantalla vacía disfrazada de resultado.
 */
export function ReviewList({
  questions,
  lang,
  strings,
  values,
  important,
  answered,
  minAnswers,
  headingRef,
  onEdit,
  onToggleImportant,
  contribute,
  onContributeChange,
  onSubmit,
  onRestart,
}: {
  questions: Question[];
  lang: AfinidadLang;
  strings: FlowStrings;
  values: Record<string, FlowValue>;
  important: ReadonlySet<string>;
  answered: number;
  minAnswers: number;
  headingRef: RefObject<HTMLHeadingElement>;
  onEdit: (index: number) => void;
  onToggleImportant: (id: string) => void;
  /** Casilla de aportación anónima; desmarcada por defecto. */
  contribute: boolean;
  onContributeChange: (value: boolean) => void;
  onSubmit: () => void;
  onRestart: () => void;
}) {
  const s = strings.review;
  const rt = getResultStrings(lang);
  const label = (v: FlowValue | undefined) =>
    v === undefined ? s.noAnswer : v === "skip" ? s.skipped : strings.question.scale[v];
  const unanswered = questions.filter((q) => values[q.id] === undefined).length;
  const missing = Math.max(0, minAnswers - answered);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-xl font-semibold text-foreground outline-none sm:text-2xl"
      >
        {s.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{s.intro}</p>

      <div aria-live="polite">
        {missing > 0 ? (
          <p className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
            {s.notEnough(minAnswers, missing)}
          </p>
        ) : (
          unanswered > 0 && (
            <p className="mt-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
              {s.unanswered(unanswered)}
            </p>
          )
        )}
      </div>

      <ol className="mt-5 divide-y divide-border rounded-xl border border-border bg-background">
        {questions.map((q, i) => {
          const v = values[q.id];
          const answeredHere = v !== undefined && v !== "skip";
          const text = questionText(q, lang);
          return (
            <li key={q.id} className="flex items-center gap-2 px-2 py-1.5 sm:px-3">
              <button
                type="button"
                onClick={() => onEdit(i)}
                aria-label={`${s.edit}: ${i + 1}. ${text} — ${label(v)}`}
                title={q.rationale ? `${s.whatItMeasures}: ${q.rationale}` : undefined}
                className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-lg px-1 text-left hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {rowLabel(rt, q, lang)}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{text}</span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    answeredHere
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-dashed border-border text-muted-foreground",
                  )}
                >
                  {label(v)}
                </span>
              </button>
              {answeredHere ? (
                <ImportanceToggle
                  pressed={important.has(q.id)}
                  onToggle={() => onToggleImportant(q.id)}
                  label={s.important}
                  srContext={`${i + 1}. ${text}`}
                />
              ) : (
                <span className="w-11 shrink-0" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>

      {/*
        Aportación anónima al agregado. Las respuestas son opiniones políticas
        (RGPD art. 9): hace falta consentimiento explícito, así que es una
        casilla desmarcada. La frase es corta y el detalle de qué se guarda va
        plegado justo debajo, enlazado con `aria-describedby` para que el lector
        de pantalla lo lea al llegar a la casilla aunque esté cerrado.
      */}
      <div className="mt-5 rounded-xl border border-border bg-background p-3">
        <label className="flex min-h-11 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={contribute}
            onChange={(e) => onContributeChange(e.target.checked)}
            aria-describedby="afinidad-aporta-info"
            className="h-5 w-5 shrink-0 accent-[hsl(var(--primary))]"
          />
          <span className="text-sm font-medium text-foreground">{s.contribute.label}</span>
        </label>
        <details className="group pl-8">
          <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1 text-xs font-medium text-primary [&::-webkit-details-marker]:hidden">
            <Info className="h-3.5 w-3.5" aria-hidden />
            {s.contribute.more}
          </summary>
          <p id="afinidad-aporta-info" className="pb-1 text-xs leading-relaxed text-muted-foreground">
            {s.contribute.info}
          </p>
        </details>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
        <Button variant="ghost" size="sm" className="min-h-11" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          {s.restart}
        </Button>
        <Button variant="cta" size="lg" onClick={onSubmit} disabled={missing > 0}>
          {s.submit}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
