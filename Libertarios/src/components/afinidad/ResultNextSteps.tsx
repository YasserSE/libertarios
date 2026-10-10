"use client";

import NextLink from "next/link";
import { Compass, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResultStrings } from "@/i18n/afinidad/result";
import { exploreHref } from "@/lib/afinidad/explore";
import { track } from "@/lib/afinidad/track";

/** Ancla de la tarjeta de compartir (ShareCard). */
export const SHARE_ANCHOR = "compartir";

/**
 * «¿Te sorprende tu resultado?»: justo después del ranking (petición del
 * dueño, 10-10-2026). Dos salidas: compartir el resultado (baja a la tarjeta
 * de compartir) o hacer el test del cuadrante. Va después del ranking, nunca
 * antes: el resultado neutral se lee primero.
 */
export function ResultNextSteps({ lang }: { lang: string }) {
  const t = getResultStrings(lang);
  return (
    <section
      aria-labelledby="afinidad-siguiente"
      data-testid="result-next"
      className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card sm:p-6"
    >
      <h2 id="afinidad-siguiente" className="font-display text-xl font-semibold text-foreground">
        {t.nextTitle}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{t.nextBody}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button variant="cta" className="min-h-11" asChild>
          <a href={`#${SHARE_ANCHOR}`}>
            <Share2 className="h-4 w-4" aria-hidden />
            {t.nextShare}
          </a>
        </Button>
        <Button variant="heroOutline" className="min-h-11" asChild>
          <NextLink
            href={exploreHref("/cuadrante", lang)}
            onClick={() => track("afinidad_explore_cuadrante", { from: "resultado" })}
          >
            <Compass className="h-4 w-4" aria-hidden />
            {t.inviteCta}
          </NextLink>
        </Button>
      </div>
    </section>
  );
}
