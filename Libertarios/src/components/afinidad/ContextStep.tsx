"use client";

import type { ReactNode, RefObject } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ContextOption {
  value: string;
  label: string;
  /** Texto secundario (p. ej. «coalición por confirmar»). */
  detail?: string;
  /** Distintivo a la izquierda (el del partido, en el voto habitual). */
  avatar?: ReactNode;
}

/**
 * Paso de contexto opcional (comunidad, voto habitual).
 *
 * Rediseño: una rejilla de fichas en la tarjeta del test, con una sola línea
 * de explicación. Diecinueve comunidades en lista larga ocupaban tres
 * pantallas de móvil; en fichas de dos columnas caben en una.
 *
 * «Prefiero no decirlo» va primero y a todo el ancho: si estuviera al final,
 * el mensaje implícito sería «esto es obligatorio y saltarlo es la excepción»,
 * y es justo al revés. Elegir avanza solo, como en las preguntas.
 */
export function ContextStep({
  stepLabel,
  optionalLabel,
  title,
  help,
  options,
  selected,
  preferNotLabel,
  onSelect,
  onPreferNot,
  onBack,
  backLabel,
  nextLabel,
  onNext,
  headingRef,
  extra,
}: {
  stepLabel: string;
  optionalLabel: string;
  title: string;
  help: string;
  options: ContextOption[];
  selected: string | undefined;
  preferNotLabel: string;
  onSelect: (value: string) => void;
  onPreferNot: () => void;
  onBack?: () => void;
  backLabel: string;
  nextLabel: string;
  onNext: () => void;
  headingRef: RefObject<HTMLHeadingElement>;
  /** Contenido tras la rejilla (p. ej. «ver todos los partidos»). */
  extra?: ReactNode;
}) {
  const headingId = "afinidad-contexto";
  const chip = (opt: ContextOption, pressed: boolean, onClick: () => void, wide = false) => (
    <button
      key={opt.value}
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pressed
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
        wide && "col-span-full border-dashed",
      )}
    >
      {opt.avatar}
      <span className="min-w-0 flex-1">
        <span className="block leading-tight">{opt.label}</span>
        {opt.detail && <span className="block truncate text-[11px] font-normal text-muted-foreground">{opt.detail}</span>}
      </span>
      {pressed && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
    </button>
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <p aria-live="polite" className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
        {stepLabel} · {optionalLabel}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        id={headingId}
        className="font-display text-xl font-semibold leading-snug text-foreground outline-none sm:text-2xl"
      >
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{help}</p>

      <div role="group" aria-labelledby={headingId} className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {chip({ value: "", label: preferNotLabel }, false, onPreferNot, true)}
        {options.map((opt) => chip(opt, selected === opt.value, () => onSelect(opt.value)))}
      </div>
      {extra}

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-border pt-5">
        {onBack ? (
          <Button variant="ghost" size="sm" className="min-h-11" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Button>
        ) : (
          <span />
        )}
        <Button variant="outline" size="sm" className="min-h-11" onClick={onNext}>
          {nextLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
