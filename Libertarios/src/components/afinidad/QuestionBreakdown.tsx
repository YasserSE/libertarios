"use client";

import type { Answers, Dataset, Party } from "@/data/afinidad/types";
import { cellPosition, getStance } from "@/lib/afinidad/score";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { answerLabel, positionLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { PartyAvatar } from "./PartyBadge";
import { SourcePopover, questionText } from "./SourcePopover";

/**
 * Pregunta a pregunta: tu respuesta y lo que dice y vota cada partido, con
 * todas las fuentes. Es la parte que convierte el resultado en algo
 * verificable; por eso salen también las preguntas que saltaste y las celdas
 * sin dato, con su nombre («sin posición», «pendiente»), en vez de omitirlas.
 */
export function QuestionBreakdown({
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
  const label = (cell: { status: string } | null | undefined, position: number | null) => {
    if (position !== null) return positionLabel(t, position);
    if (cell?.status === "pendiente") return t.pending;
    return t.noPosition;
  };

  return (
    <Accordion type="multiple" className="w-full">
      {questions.map((q) => {
        const a = answers[q.id];
        const answered = a && a !== "skip";
        return (
          <AccordionItem key={q.id} value={q.id}>
            <AccordionTrigger className="gap-3 text-left text-sm">
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-foreground">
                  <span className="mr-2 tabular-nums text-muted-foreground">{q.order}.</span>
                  {questionText(q, lang)}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {t.you}: {answered ? answerLabel(t, a.value) : t.skipped}
                  {answered && a.important && ` · ${t.important}`}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {q.rationale && <p className="mb-3 text-xs text-muted-foreground">{q.rationale}</p>}
              <ul className="divide-y divide-border">
                {parties.map((p) => {
                  const stance = getStance(dataset, p.id, q.id);
                  const prog = cellPosition(dataset, p.id, q.id, "programme");
                  const rec = cellPosition(dataset, p.id, q.id, "record");
                  return (
                    <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                      <span className="flex min-w-0 items-center gap-2">
                        <PartyAvatar party={p} size={24} />
                        <span className="truncate text-sm font-medium text-foreground">{p.short}</span>
                      </span>
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>
                          {t.lensProgramme}: <span className="text-foreground">{label(stance?.programme, prog)}</span>
                        </span>
                        <span>
                          {t.lensRecord}:{" "}
                          <span className="text-foreground">{label(stance?.record, rec)}</span>
                        </span>
                        <SourcePopover party={p} question={q} stance={stance} quotes={dataset.quotes} t={t} lang={lang} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
