"use client";

import type { Dataset, Party } from "@/data/afinidad/types";
import { getStance, promiseVsRecord } from "@/lib/afinidad/score";
import { fmt, rowLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { HemerotecaQuote } from "./HemerotecaQuote";
import { PartyBadge } from "./PartyBadge";
import { ProgrammeSource, RecordSource, questionText } from "./SourcePopover";
import { Disclosure, StackedBar } from "./ui";

/** Preguntas por partido; más convierte la tarjeta en un listado que nadie lee. */
const MAX_ITEMS = 3;

/**
 * «Promesa vs. hechos» para los tres primeros partidos.
 *
 * Rediseño: por partido, una barra con cuántas preguntas tienen programa y
 * voto en el mismo sentido y cuántas no, y las medidas en sentido distinto
 * como fichas. Lo que dijeron, prometieron y votaron, plegado.
 *
 * El orden dentro de cada medida sigue siendo «Lo que dijeron» → «Lo que
 * prometieron» → «Lo que votaron», el orden en que ocurrieron las cosas. No se
 * escribe «incumplió» ni «mintió»: se ponen las tres fuentes en fila.
 *
 * Qué preguntas salen: primero las de programa y voto en sentido contrario
 * (`promiseVsRecord().mismatches`), luego las que tienen cita de hemeroteca.
 */
export function PromiseVsRecord({
  parties,
  dataset,
  t,
  lang,
}: {
  parties: Party[];
  dataset: Dataset;
  t: ResultStrings;
  lang: string;
}) {
  const quotes = dataset.quotes ?? [];
  return (
    <div className="space-y-3">
      {parties.map((party) => {
        const pvr = promiseVsRecord(dataset, party.id);
        const partyQuotes = quotes.filter((q) => q.partyId === party.id);
        const mismatchIds = new Set(pvr.mismatches.map((m) => m.questionId));
        const ids: string[] = pvr.mismatches.map((m) => m.questionId);
        // Las citas marcadas como contrastadas con el voto, antes que el resto.
        const quoted = [...partyQuotes].sort(
          (a, b) => Number(!!b.contrastsWithRecord) - Number(!!a.contrastsWithRecord),
        );
        for (const q of quoted) if (!ids.includes(q.questionId)) ids.push(q.questionId);
        const shown = ids
          .map((id) => dataset.questions.find((q) => q.id === id))
          .filter((q): q is NonNullable<typeof q> => !!q)
          .slice(0, MAX_ITEMS);
        const same = pvr.items - pvr.mismatches.length;

        return (
          <section key={party.id} className="rounded-xl border border-border bg-background p-4" data-party={party.id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PartyBadge party={party} t={t} size={28} />
              {pvr.items > 0 && (
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {fmt(t.pvrSame, { n: same, m: pvr.items })}
                </span>
              )}
            </div>
            {pvr.items > 0 ? (
              <StackedBar
                className="mt-2"
                label={t.pvrTitle}
                showLegend={false}
                segments={[
                  { key: "same", value: same, label: t.cell_match, fill: "bg-primary" },
                  { key: "diff", value: pvr.mismatches.length, label: t.pvrDiffers, fill: "bg-muted-foreground/40" },
                ]}
              />
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">{t.pvrNoPairs}</p>
            )}
            {shown.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {shown.map((q) => (
                  <li
                    key={q.id}
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                      mismatchIds.has(q.id) ? "border-foreground/30 text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    {rowLabel(t, q, lang)}
                    {mismatchIds.has(q.id) && <span className="sr-only"> ({t.pvrDiffers})</span>}
                  </li>
                ))}
              </ul>
            )}

            {(shown.length > 0 || pvr.meanGap !== null) && (
              <Disclosure summary={t.seeWhy} className="mt-1">
                <p className="mb-2 text-xs text-muted-foreground">
                  {pvr.meanGap === null
                    ? t.pvrNoPairs
                    : fmt(t.pvrMeanGap, { gap: pvr.meanGap.toFixed(1).replace(".", ","), n: pvr.items })}
                </p>
                {shown.length === 0 && pvr.items > 0 && <p className="text-sm text-muted-foreground">{t.pvrNoItems}</p>}
                <div className="space-y-3">
                  {shown.map((question) => {
                    const stance = getStance(dataset, party.id, question.id);
                    const said = partyQuotes.filter((q) => q.questionId === question.id);
                    return (
                      <article key={question.id} className="rounded-lg border border-border bg-card p-3">
                        <p className="text-sm font-medium text-foreground">{questionText(question, lang)}</p>
                        <ol className="mt-3 space-y-3">
                          <li>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.said}</p>
                            {said.length > 0 ? (
                              <div className="space-y-2">
                                {said.map((q, i) => (
                                  <HemerotecaQuote key={i} quote={q} t={t} lang={lang} />
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">{t.noQuote}</p>
                            )}
                          </li>
                          <li>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.promised}</p>
                            <ProgrammeSource stance={stance?.programme} t={t} showPosition />
                          </li>
                          <li>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.voted}</p>
                            <RecordSource stance={stance?.record} t={t} lang={lang} showPosition />
                            {party.recordNote && <p className="mt-1 text-xs text-muted-foreground">{party.recordNote}</p>}
                          </li>
                        </ol>
                      </article>
                    );
                  })}
                </div>
              </Disclosure>
            )}
          </section>
        );
      })}
    </div>
  );
}
