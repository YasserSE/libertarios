"use client";

import type { RefObject } from "react";
import { ArrowLeft, ArrowRight, Check, ListChecks, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USER_POSITIONS, type Question } from "@/data/afinidad/types";
import { questionText, type AfinidadLang, type FlowStrings } from "@/i18n/afinidad/flow";
import { getResultStrings, topicLabel } from "@/i18n/afinidad/result";
import type { FlowValue } from "@/lib/afinidad/storage";
import { cn } from "@/lib/utils";
import { ImportanceToggle } from "./ImportanceToggle";

/**
 * Una afirmación con sus cuatro respuestas más «No sé».
 *
 * Rediseño: la tarjeta es la de `QuadrantTest` clase a clase (borde, sombra,
 * barra de progreso, tema en el color de marca, enunciado en `font-display`,
 * opciones numeradas, pie con Anterior / Reiniciar / Saltar), para que los dos
 * tests del sitio se lean como el mismo producto. Lo único propio es la
 * estrella de «Esto me importa», arriba a la derecha.
 *
 * Escala sin punto medio (plan, actualización 2026-10-06): «No sé» va aparte y
 * con borde discontinuo, porque no es el centro de la escala, es salir de ella.
 */
export function QuestionCard({
  question,
  lang,
  strings,
  index,
  total,
  visited,
  value,
  important,
  headingRef,
  onAnswer,
  onToggleImportant,
  onPrev,
  onNext,
  onReview,
  onRestart,
}: {
  question: Question;
  lang: AfinidadLang;
  strings: FlowStrings;
  index: number;
  total: number;
  /** Respondidas o marcadas «No sé»: lo que avanza la barra. */
  visited: number;
  value: FlowValue | undefined;
  important: boolean;
  headingRef: RefObject<HTMLHeadingElement>;
  onAnswer: (v: FlowValue) => void;
  onToggleImportant: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReview: () => void;
  onRestart: () => void;
}) {
  const s = strings.question;
  const isLast = index === total - 1;
  const headingId = "afinidad-enunciado";
  const topic = question.topic ? topicLabel(getResultStrings(lang), question.topic) : null;

  const option = (v: FlowValue, label: string, key: number) => {
    const selected = value === v;
    const isSkip = v === "skip";
    return (
      <button
        key={String(v)}
        type="button"
        aria-pressed={selected}
        onClick={() => onAnswer(v)}
        className={cn(
          "flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          selected
            ? "border-primary bg-primary/10 text-foreground"
            : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
          isSkip && !selected && "border-dashed",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold tabular-nums",
            selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5" /> : key}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="mb-6">
        {/* Región viva educada: anuncia en qué punto vas sin interrumpir la
            lectura del enunciado (que recibe el foco). */}
        <p aria-live="polite" className="mb-2 flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium text-foreground">{s.counter(index + 1, total)}</span>
          <span className="tabular-nums text-muted-foreground">{s.answered(visited)}</span>
        </p>
        <div
          role="progressbar"
          aria-label={s.progressLabel}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={visited}
          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(visited / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-1 flex items-start justify-between gap-3">
        <div className="min-w-0 pt-1">
          {topic && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">{topic}</p>}
          <h2
            ref={headingRef}
            tabIndex={-1}
            id={headingId}
            className="mb-6 font-display text-xl font-semibold leading-snug text-foreground outline-none sm:text-2xl"
          >
            {questionText(question, lang)}
          </h2>
        </div>
        <ImportanceToggle
          pressed={important}
          onToggle={onToggleImportant}
          label={s.important}
          help={s.importantHelp}
          showLabel
        />
      </div>

      {/*
        Botones con `aria-pressed`, no un `radiogroup`: el rol de radio promete
        que las flechas mueven la selección, y aquí las flechas cambian de
        afirmación (mismo criterio que `QuadrantTest`).
      */}
      <div role="group" aria-labelledby={headingId} className="space-y-2">
        {USER_POSITIONS.map((v, i) => option(v, s.scale[v], i + 1))}
        <div className="pt-1">{option("skip", s.skip, 5)}</div>
      </div>

      <p className="mt-4 hidden text-xs text-muted-foreground sm:block">{s.keyboardHint}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
        <Button variant="ghost" size="sm" className="min-h-11" onClick={onPrev} disabled={index === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {s.prev}
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" className="min-h-11" onClick={onRestart} disabled={visited === 0}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            {s.restart}
          </Button>
          {/* En la última hay que poder ir a la revisión aunque queden huecos:
              si no, saltarse una y llegar al final dejaba sin salida. */}
          {isLast || visited === total ? (
            <Button variant="cta" size="sm" className="min-h-11" onClick={onReview}>
              {s.toReview}
              <ListChecks className="h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="min-h-11" onClick={onNext}>
              {s.next}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
