"use client";

import type { Dataset, Party } from "@/data/afinidad/types";
import { getStance, type Contradiction } from "@/lib/afinidad/score";
import { answerLabel, fmt, positionLabel, rowLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { SourcePopover, questionText } from "./SourcePopover";
import { Disclosure } from "./ui";

/**
 * «Donde tu partido te contradice»: las preguntas de mayor distancia entre tu
 * respuesta y lo que el partido dice o vota (`contradictions()`).
 *
 * A la vista: cuántas y cuáles (fichas con el rótulo corto). Plegado: tu
 * respuesta frente a la suya, pregunta a pregunta, con la fuente a un clic.
 * Se enuncia como distancia entre dos posiciones, no como juicio del partido.
 */
export function Contradictions({
  items,
  party,
  dataset,
  t,
  lang,
}: {
  items: Contradiction[];
  party: Party;
  dataset: Dataset;
  t: ResultStrings;
  lang: string;
}) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t.contradictionsNone}</p>;
  const qs = items
    .map((c) => ({ c, q: dataset.questions.find((q) => q.id === c.questionId) }))
    .filter((x): x is { c: Contradiction; q: NonNullable<typeof x.q> } => !!x.q);
  return (
    <div className="space-y-3">
      <p className="font-display text-base font-semibold text-foreground">
        {items.length === 1 ? t.contradictionsCountOne : fmt(t.contradictionsCount, { n: items.length })}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {qs.map(({ q }) => (
          <li key={q.id} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
            {rowLabel(t, q, lang)}
          </li>
        ))}
      </ul>
      <Disclosure summary={t.seeWhy}>
        <ul className="space-y-2">
          {qs.map(({ c, q }) => (
            <li key={c.questionId} className="rounded-lg border border-border bg-background p-3">
              <p className="text-sm text-foreground">{questionText(q, lang)}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  {t.you}: <span className="font-medium text-foreground">{answerLabel(t, c.answer)}</span>
                  {c.important && <span> ({t.important.toLowerCase()})</span>}
                  {" · "}
                  {party.short} ({c.lens === "record" ? t.lensRecord : t.lensProgramme}):{" "}
                  <span className="font-medium text-foreground">{positionLabel(t, c.position)}</span>
                </span>
                <SourcePopover
                  party={party}
                  question={q}
                  stance={getStance(dataset, party.id, q.id)}
                  quotes={dataset.quotes}
                  t={t}
                  lang={lang}
                />
              </div>
            </li>
          ))}
        </ul>
      </Disclosure>
    </div>
  );
}
