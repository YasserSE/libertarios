"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Piezas visuales compartidas por el resultado, «Dijeron vs. hicieron» y la
 * ficha de partido tras el rediseño «más visual, menos texto».
 *
 * Regla común: lo visual va a la vista y el texto, a demanda. Para plegar se
 * usa `<details>` nativo y no un acordeón con JavaScript: el contenido sigue en
 * el HTML (buscadores, «buscar en la página», lectores de pantalla que lo
 * recorren), funciona sin hidratar y el teclado ya lo sabe abrir.
 */

/** Tarjeta de sección del resultado: la misma que usa `QuadrantResults`. */
export function SectionCard({
  title,
  icon: Icon,
  intro,
  children,
  className,
  id,
  testId,
}: {
  title?: string;
  icon?: LucideIcon;
  intro?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  testId?: string;
}) {
  return (
    <section
      id={id}
      data-testid={testId}
      className={cn("rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6", className)}
    >
      {title && (
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </span>
          )}
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
            {intro && <p className="text-sm text-muted-foreground">{intro}</p>}
          </div>
        </div>
      )}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
  );
}

/** «Ver por qué» y similares: un `<details>` con el aspecto del sitio. */
export function Disclosure({
  summary,
  children,
  className,
  summaryClassName,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  return (
    <details className={cn("group", className)}>
      <summary
        className={cn(
          "inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
          summaryClassName,
        )}
      >
        {summary}
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

/**
 * Texto recortado a `lines` líneas con «Leer más». El texto completo está
 * siempre en el DOM (solo se recorta con CSS): copiar, buscar y los lectores
 * de pantalla lo tienen entero.
 */
export function ClampText({
  children,
  lines = 2,
  more,
  less,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  lines?: 1 | 2 | 3;
  more: string;
  less: string;
  className?: string;
  as?: "p" | "blockquote";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const clamp = lines === 1 ? "line-clamp-1" : lines === 2 ? "line-clamp-2" : "line-clamp-3";
  return (
    <div>
      <Tag id={id} className={cn(className, !open && clamp)}>
        {children}
      </Tag>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-0.5 inline-flex min-h-8 items-center text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? less : more}
      </button>
    </div>
  );
}

export interface StackedSegment {
  key: string;
  value: number;
  label: string;
  /** Clase de fondo del tramo. */
  fill: string;
  icon?: LucideIcon;
}

/**
 * Barra apilada con su leyenda. Los tramos se distinguen por tono, y la
 * leyenda repite cada cifra con su icono y su nombre: el color nunca es la
 * única señal. Un recuento a cero sigue en la leyenda (lo que se elige
 * enseñar ya es una forma de opinar; se enseña que es cero).
 */
export function StackedBar({
  segments,
  label,
  showLegend = true,
  className,
}: {
  segments: StackedSegment[];
  label: string;
  showLegend?: boolean;
  className?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  return (
    <div className={className}>
      <div
        role="img"
        aria-label={`${label}: ${segments.map((s) => `${s.value} ${s.label}`).join(", ")}`}
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted"
      >
        {total > 0 &&
          segments
            .filter((s) => s.value > 0)
            .map((s) => (
              <span
                key={s.key}
                className={cn("h-full border-r-2 border-card last:border-r-0", s.fill)}
                style={{ width: `${(s.value / total) * 100}%` }}
              />
            ))}
      </div>
      {showLegend && (
        <ul aria-hidden className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          {segments.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.key} className="inline-flex items-center gap-1">
                <span className={cn("h-2 w-2 rounded-full", s.fill)} />
                {Icon && <Icon className="h-3 w-3" />}
                <span className="font-semibold tabular-nums text-foreground">{s.value}</span>
                {s.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
