"use client";

import NextLink from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fmt, getResultStrings, type ResultStrings } from "@/i18n/afinidad/result";
import { exploreFallsBack, exploreHref } from "@/lib/afinidad/explore";
import { economicLean, type EconomicLean } from "@/lib/afinidad/lean";
import { track } from "@/lib/afinidad/track";
import type { Answers, Question } from "@/data/afinidad/types";

/**
 * Invitación al test del cuadrante, justo antes de «Sigue explorando».
 *
 * El texto cambia según las respuestas de la persona a las preguntas de
 * impuestos (`economicLean`), y solo según eso: no recibe partidos, ni
 * ranking, ni voto habitual. Se calcula aquí, en el navegador, y no se guarda
 * ni se envía; el clic se cuenta como cualquier otro enlace de «Sigue
 * explorando» (`from: "resultado"`, el único valor que admite la lista blanca
 * para el resultado), sin la orientación.
 */

const COPY: Record<EconomicLean, (t: ResultStrings) => [string, string]> = {
  libertad: (t) => [t.inviteLibertadTitle, t.inviteLibertadBody],
  intervencion: (t) => [t.inviteIntervencionTitle, t.inviteIntervencionBody],
  mixto: (t) => [t.inviteMixtoTitle, t.inviteMixtoBody],
  unknown: (t) => [t.inviteMixtoTitle, t.inviteMixtoBody],
};

export function QuadrantInvite({
  answers,
  questions,
  lang,
}: {
  answers: Answers;
  questions: readonly Pick<Question, "id">[];
  lang: string;
}) {
  const t = getResultStrings(lang);
  const { lean, answered } = economicLean(answers, questions);
  const [title, body] = COPY[lean](t);
  return (
    <section
      aria-labelledby="afinidad-cuadrante"
      data-testid="quadrant-invite"
      data-lean={lean}
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Compass className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="afinidad-cuadrante" className="font-display text-lg font-semibold leading-snug text-foreground">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {body}
            {exploreFallsBack(lang) && <> {t.exploreLangNote}</>}
          </p>
        </div>
        <Button className="min-h-11 shrink-0 self-start sm:self-center" asChild>
          <NextLink
            href={exploreHref("/cuadrante", lang)}
            onClick={() => track("afinidad_explore_cuadrante", { from: "resultado" })}
          >
            {t.inviteCta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </NextLink>
        </Button>
      </div>
      {lean !== "unknown" && (
        <p data-testid="quadrant-invite-note" className="mt-3 text-xs text-muted-foreground">
          {fmt(t.inviteFootnote, { n: answered })}
        </p>
      )}
    </section>
  );
}
