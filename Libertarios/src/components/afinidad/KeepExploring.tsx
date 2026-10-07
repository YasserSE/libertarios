"use client";

import NextLink from "next/link";
import { ArrowRight, Compass, FlaskConical, GraduationCap, type LucideIcon } from "lucide-react";
import { getResultStrings } from "@/i18n/afinidad/result";
import { EXPLORE_ITEMS, exploreFallsBack, exploreHref } from "@/lib/afinidad/explore";
import { track, type ExploreDestination } from "@/lib/afinidad/track";

/*
 * Enlaces de «¿A quién votar?» al resto de Libertarios.eu. Qué destinos y por
 * qué esos, en `src/lib/afinidad/explore.ts`.
 */

/** Icono de cada destino: el mismo que usa el sitio para esa página. */
const ICONS: Record<ExploreDestination, LucideIcon> = {
  cuadrante: Compass,
  aprende: GraduationCap,
  medidas: FlaskConical,
};

/** Desde dónde se pulsó: única propiedad del evento además del destino. */
type ExploreFrom = "resultado" | "pie" | "portada";

const onExplore = (id: ExploreDestination, from: ExploreFrom) => () =>
  track(`afinidad_explore_${id}`, { from });

/**
 * Bloque final del resultado: «Sigue explorando — Otros tests de
 * Libertarios.eu». Va el último, después del detalle por pregunta y de
 * compartir: quien llega hasta aquí ya ha visto su resultado entero, y ponerlo
 * antes sería mezclar el resultado neutral con una invitación del sitio.
 */
export function KeepExploring({ lang }: { lang: string }) {
  const t = getResultStrings(lang);
  // Aviso de idioma solo donde de verdad cambia (gl/eu → es).
  const fallsBack = exploreFallsBack(lang);
  return (
    <section
      aria-labelledby="afinidad-explora"
      data-testid="keep-exploring"
      className="rounded-2xl border border-border bg-card p-6 shadow-card"
    >
      <p className="text-sm font-medium text-muted-foreground">{t.exploreEyebrow}</p>
      <h2 id="afinidad-explora" className="mt-1 font-display text-lg font-semibold text-foreground">
        {t.exploreTitle}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {t.exploreIntro}
        {fallsBack && <> {t.exploreLangNote}</>}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {EXPLORE_ITEMS.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <li key={item.id}>
              <NextLink
                href={exploreHref(item.path, lang)}
                onClick={onExplore(item.id, "resultado")}
                data-explore={item.id}
                className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <span className="mt-2 flex items-center gap-1 text-base font-semibold text-foreground">
                  {item.title(t)}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body(t)}</span>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * Fila discreta «Otros tests de Libertarios.eu: …» para el pie del módulo y el
 * final de la portada. Es solo texto y enlaces: el flujo del test sigue sin
 * cabecera libertaria, y esto no debe competir con el botón de empezar.
 */
export function OtherTestsRow({
  lang,
  from,
  className = "",
}: {
  lang: string;
  from: Exclude<ExploreFrom, "resultado">;
  className?: string;
}) {
  const t = getResultStrings(lang);
  const link =
    "inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <nav aria-label={t.exploreTitle} data-testid={`other-tests-${from}`} className={className}>
      <ul className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <li>{t.exploreTitle}:</li>
        {EXPLORE_ITEMS.map((item, i) => (
          <li key={item.id} className="inline-flex items-center gap-x-2">
            {i > 0 && <span aria-hidden>·</span>}
            <NextLink href={exploreHref(item.path, lang)} onClick={onExplore(item.id, from)} className={link}>
              {item.short(t)}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
