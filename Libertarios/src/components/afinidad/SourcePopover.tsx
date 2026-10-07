"use client";

import type { ReactNode } from "react";
import type {
  Dataset,
  Party,
  ProgrammeStance,
  Question,
  Quote,
  RecordStance,
  Stance,
  VoteEvidence,
} from "@/data/afinidad/types";
import { effectivePosition } from "@/lib/afinidad/score";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fmt, formatDate, positionLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { track } from "@/lib/afinidad/track";
import { HemerotecaQuote } from "./HemerotecaQuote";

/*
 * Todo lo que enseña una fuente vive aquí, para que la cita del programa o la
 * votación se pinten igual en «Promesa vs. hechos», en el desglose y en el
 * popover. Una misma celda con dos formatos distintos invita a pensar que son
 * dos datos distintos.
 */

/** Año del programa con el que puntúa el partido (el más frecuente entre sus celdas). */
export function programmeYear(dataset: Dataset, partyId: string): number | null {
  const counts = new Map<number, number>();
  for (const s of dataset.stances) {
    if (s.partyId !== partyId || !s.programme || effectivePosition(s.programme) === null) continue;
    const y = s.programme.source.year ?? (s.programme.source.date ? Number(s.programme.source.date.slice(0, 4)) : NaN);
    if (Number.isFinite(y)) counts.set(y, (counts.get(y) ?? 0) + 1);
  }
  let best: number | null = null;
  for (const [y, n] of Array.from(counts)) if (best === null || n > counts.get(best)! || (n === counts.get(best) && y > best)) best = y;
  return best;
}

/** Enunciado en el idioma de la página, con caída al castellano. */
export function questionText(q: Question, lang: string): string {
  return (q.text as Record<string, string | undefined>)[lang] ?? q.text.es;
}

/** ¿Tiene el partido alguna celda de Hechos que puntúe? Si no, «sin historial», nunca 0. */
export function hasRecord(dataset: Dataset, partyId: string): boolean {
  return dataset.stances.some((s) => s.partyId === partyId && effectivePosition(s.record) !== null);
}

export function votesOf(record: RecordStance | null | undefined): VoteEvidence[] {
  return (record?.evidence ?? []).filter((e): e is VoteEvidence => e.kind === "votacion");
}

/** Estado de una celda que no puntúa (o que puntúa con reservas). */
function statusNote(cell: ProgrammeStance | RecordStance | null | undefined, t: ResultStrings): string | null {
  if (!cell || cell.status === "sin-posicion") return t.noPosition;
  if (cell.status === "pendiente") return t.pending;
  if (cell.status === "contested") return t.contested;
  return null;
}

export function ProgrammeSource({
  stance,
  t,
  showPosition = false,
}: {
  stance: ProgrammeStance | null | undefined;
  t: ResultStrings;
  showPosition?: boolean;
}) {
  const position = effectivePosition(stance);
  if (!stance || position === null) {
    return <p className="text-sm text-muted-foreground">{t.noProgramme}</p>;
  }
  const note = statusNote(stance, t);
  const year = stance.source.year ?? stance.source.date?.slice(0, 4);
  return (
    <div className="text-sm">
      {showPosition && (
        <p className="mb-1 text-xs text-muted-foreground">
          {t.lensProgramme}: <span className="font-medium text-foreground">{positionLabel(t, position)}</span>
          {note && <span> · {note}</span>}
        </p>
      )}
      {stance.quote && <blockquote className="leading-relaxed text-foreground">«{stance.quote}»</blockquote>}
      <p className="mt-1 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
        <a
          href={stance.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {stance.source.title}
          {year ? ` (${year})` : ""}
        </a>
        {stance.source.page && <span>{fmt(t.page, { page: stance.source.page })}</span>}
        {stance.source.archiveUrl && (
          <a
            href={stance.source.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {t.archive}
          </a>
        )}
      </p>
    </div>
  );
}

export function RecordSource({
  stance,
  t,
  lang,
  showPosition = false,
}: {
  stance: RecordStance | null | undefined;
  t: ResultStrings;
  lang: string;
  showPosition?: boolean;
}) {
  const position = effectivePosition(stance);
  if (!stance || position === null) {
    return <p className="text-sm text-muted-foreground">{t.noVote}</p>;
  }
  const note = statusNote(stance, t);
  return (
    <div className="text-sm">
      {showPosition && (
        <p className="mb-1 text-xs text-muted-foreground">
          {t.lensRecord}: <span className="font-medium text-foreground">{positionLabel(t, position)}</span>
          {note && <span> · {note}</span>}
        </p>
      )}
      <ul className="space-y-1.5">
        {stance.evidence.map((e, i) => (
          <li key={i} className="leading-snug">
            <span className="text-foreground">{e.title}</span>{" "}
            <span className="text-xs text-muted-foreground">
              · {formatDate(e.date, lang)}
              {e.kind === "votacion" && (
                <>
                  {" · "}
                  {fmt(t.groupVote, { vote: t[`vote_${e.groupVote}`] })}
                </>
              )}
              {e.kind === "otro-parlamento" && ` · ${e.chamber} · ${t[`vote_${e.vote}`]}`}
              {e.kind === "boe" && ` · ${e.reference}`}
              {" · "}
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {e.kind === "votacion" ? t.openCongreso : t.source}
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * «Ver fuentes»: todo lo que sostiene una celda partido×pregunta, a un clic.
 * Programa, votaciones y hemeroteca, en ese orden, cada uno con su enlace.
 */
export function SourcePopover({
  party,
  question,
  stance,
  quotes = [],
  t,
  lang,
  trigger,
  triggerClassName,
  triggerLabel,
}: {
  party: Party;
  question: Question;
  stance: Stance | undefined;
  quotes?: Quote[];
  t: ResultStrings;
  lang: string;
  /** Contenido del disparador (p. ej. el punto de la rejilla); por defecto, «ver fuentes». */
  trigger?: ReactNode;
  triggerClassName?: string;
  /** Nombre accesible del disparador. */
  triggerLabel?: string;
}) {
  const cellQuotes = quotes.filter((q) => q.partyId === party.id && q.questionId === question.id);
  return (
    // Abrir una fuente es la señal de que el resultado se está comprobando; se
    // cuenta sin decir cuál (partido y pregunta revelarían opinión).
    <Popover onOpenChange={(open) => open && track("afinidad_source_open")}>
      <PopoverTrigger
        className={
          triggerClassName ??
          "inline-flex min-h-9 items-center text-xs font-medium text-primary underline underline-offset-2 hover:no-underline"
        }
        aria-label={triggerLabel ?? `${t.seeSources}: ${party.name}`}
      >
        {trigger ?? t.seeSources}
      </PopoverTrigger>
      <PopoverContent className="max-h-[70vh] w-[min(92vw,26rem)] space-y-3 overflow-y-auto" align="end">
        <p className="text-sm font-semibold text-foreground">{fmt(t.sourcesFor, { party: party.name })}</p>
        {/* El enunciado completo: desde la rejilla solo se veía su rótulo corto. */}
        <p className="text-xs text-muted-foreground">
          {question.order}. {questionText(question, lang)}
        </p>
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.promised}</p>
          <ProgrammeSource stance={stance?.programme} t={t} showPosition />
        </section>
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.voted}</p>
          <RecordSource stance={stance?.record} t={t} lang={lang} showPosition />
          {party.recordNote && <p className="mt-1 text-xs text-muted-foreground">{party.recordNote}</p>}
        </section>
        {cellQuotes.length > 0 && (
          <section className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.said}</p>
            {cellQuotes.map((q, i) => (
              <HemerotecaQuote key={i} quote={q} t={t} lang={lang} />
            ))}
          </section>
        )}
      </PopoverContent>
    </Popover>
  );
}
