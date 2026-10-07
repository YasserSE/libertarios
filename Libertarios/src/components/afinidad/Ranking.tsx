import type { Answers, Dataset, Party } from "@/data/afinidad/types";
import {
  computeAffinity,
  promiseVsRecord,
  type AffinityResult,
  type PartyAffinity,
} from "@/lib/afinidad/score";
import { fmt, type ResultStrings } from "@/i18n/afinidad/result";
import NextLink from "next/link";
import { ChevronDown, Clock, FileText, type LucideIcon } from "lucide-react";
import { PartyAvatar } from "./PartyBadge";
import { PartyBar, type BarState } from "./PartyBar";
import { CoherenceBadge } from "./CoherenceBadge";
import { hasRecord, programmeYear } from "./SourcePopover";

/** Año a partir del cual el programa ya es el de estas elecciones. */
const CURRENT_PROGRAMME_YEAR = 2026;
const EPS = 1e-9;

/** Todo lo que la página necesita de un partido, calculado una vez. */
export interface PartyRow {
  party: Party;
  /** Cifra que ordena (media de lentes, o la que haya). */
  combined: PartyAffinity;
  programme: PartyAffinity;
  record: PartyAffinity;
  hasRecord: boolean;
  programmeYear: number | null;
  /** Preguntas con programa y voto en el mismo sentido, de las que tienen ambos. */
  coherence: { matches: number; items: number };
  /** Posición mostrada; los empatados comparten número. `null` si no es comparable. */
  displayRank: number | null;
}

export interface RankingModel {
  combined: AffinityResult;
  rows: PartyRow[];
}

/**
 * Calcula las tres lentes y las une por partido, en el orden de la cifra
 * combinada (plan, actualización §4: media de programa y hechos si ambas
 * existen; solo programa si no hay historial).
 */
export function buildRanking(answers: Answers, dataset: Dataset, partyIds: readonly string[]): RankingModel {
  const combined = computeAffinity(answers, dataset, "combined", { partyIds });
  const prog = computeAffinity(answers, dataset, "programme", { partyIds });
  const rec = computeAffinity(answers, dataset, "record", { partyIds });
  const progBy = new Map(prog.ranking.map((e) => [e.partyId, e]));
  const recBy = new Map(rec.ranking.map((e) => [e.partyId, e]));
  const partyBy = new Map(dataset.parties.map((p) => [p.id, p]));
  const usableScores = combined.ranking.filter((e) => e.usable && e.score !== null).map((e) => e.score!);

  const rows = combined.ranking.map((e): PartyRow => {
    const pvr = promiseVsRecord(dataset, e.partyId);
    return {
      party: partyBy.get(e.partyId)!,
      combined: e,
      programme: progBy.get(e.partyId)!,
      record: recBy.get(e.partyId)!,
      hasRecord: hasRecord(dataset, e.partyId),
      programmeYear: programmeYear(dataset, e.partyId),
      // «Coincide» = no es un «prometen una cosa y votan otra» según el motor
      // (brecha ≥ 2 con cambio de signo). Un +2 frente a +1 es matiz, no
      // incoherencia, y contarlo como tal castigaría al que se moja.
      coherence: { matches: pvr.items - pvr.mismatches.length, items: pvr.items },
      displayRank:
        e.usable && e.score !== null ? 1 + usableScores.filter((s) => s > e.score! + EPS).length : null,
    };
  });
  return { combined, rows };
}

export function programmeBarState(row: PartyRow): BarState {
  return row.programme.usable ? "ok" : "insufficient";
}

export function recordBarState(row: PartyRow): BarState {
  if (!row.hasRecord) return "no-record";
  return row.record.usable ? "ok" : "insufficient";
}

export function programmeHint(row: PartyRow, t: ResultStrings): string | undefined {
  if (row.programmeYear === null) return undefined;
  return fmt(row.programmeYear < CURRENT_PROGRAMME_YEAR ? t.programmeYearUpdate : t.programmeYear, {
    year: row.programmeYear,
  });
}

/**
 * «basado en X de Y respuestas» bajo cada barra (programa y votos): la cifra se
 * enseña desde MIN_LENS_ITEMS respuestas con dato, así que hay que decir
 * siempre en cuántas se apoya. Sin historial no hay nada que contar.
 */
export function basedOnText(entry: PartyRow["programme"], state: BarState, answered: number, t: ResultStrings) {
  return state === "no-record" ? undefined : fmt(t.basedOn, { n: entry.items, m: answered });
}

/** Icono con nombre accesible: el `title` para ratón, el texto oculto para lector de pantalla. */
export function IconBadge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span
      title={label}
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground"
    >
      <Icon className="h-3 w-3" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

/**
 * El ranking en filas compactas: puesto, distintivo, nombre, dos barras finas
 * (programa y votos) y la cifra. Lo que antes eran líneas de texto bajo cada
 * barra —en cuántas respuestas se basa, el año del programa, la nota del
 * historial, la coherencia— está en el desplegable de la fila: sigue a un
 * toque, pero ya no compite con las barras.
 */
export function Ranking({
  rows,
  answered,
  t,
  lang,
}: {
  rows: PartyRow[];
  answered: number;
  t: ResultStrings;
  lang: string;
}) {
  return (
    <ol className="space-y-2" aria-label={t.rankingTitle}>
      {rows.map((row) => {
        const usable = row.combined.usable;
        const progState = programmeBarState(row);
        const recState = recordBarState(row);
        const progBased = basedOnText(row.programme, progState, answered, t);
        const recBased = basedOnText(row.record, recState, answered, t);
        const hint = programmeHint(row, t);
        return (
          <li
            key={row.party.id}
            data-party={row.party.id}
            data-usable={usable}
            className={`rounded-xl border border-border bg-background transition-colors hover:border-primary/30 ${usable ? "" : "opacity-60"}`}
          >
            <details className="group">
              <summary
                className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
              >
                <span className="w-5 shrink-0 text-right font-display text-sm font-semibold tabular-nums text-muted-foreground">
                  {row.displayRank ?? "—"}
                </span>
                <PartyAvatar party={row.party} size={32} />
                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-foreground">{row.party.name}</span>
                    {row.party.status === "por-confirmar" && <IconBadge icon={Clock} label={t.statusPending} />}
                    {usable && row.combined.basis === "programa" && row.hasRecord && (
                      <IconBadge icon={FileText} label={t.onlyProgramme} />
                    )}
                    {usable && row.combined.tie && (
                      <span className="shrink-0 rounded-full border border-border px-1.5 text-[10px] font-medium text-foreground">
                        {t.tie}
                      </span>
                    )}
                    {!usable && <span className="shrink-0 text-[11px] italic text-muted-foreground">{t.insufficient}</span>}
                  </span>
                  <span className="mt-1.5 grid gap-1 sm:grid-cols-2 sm:gap-4">
                    <PartyBar lens="programme" label={t.lensProgramme} value={row.programme.score} state={progState} t={t} hint={hint} basedOn={progBased} />
                    <PartyBar lens="record" label={t.lensRecord} value={row.record.score} state={recState} t={t} hint={row.party.recordNote} basedOn={recBased} />
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="space-y-1.5 px-3 pb-3 pl-[4.25rem] text-xs text-muted-foreground">
                <p className="flex flex-wrap gap-x-3 gap-y-0.5">
                  <span>
                    {t.lensProgramme}: {progBased && <span data-testid="based-on">{progBased}</span>}
                  </span>
                  {recBased !== undefined && (
                    <span>
                      {t.lensRecord}: <span data-testid="based-on">{recBased}</span>
                    </span>
                  )}
                </p>
                {hint && <p>{hint}</p>}
                {row.party.recordNote && <p>{row.party.recordNote}</p>}
                <CoherenceBadge matches={row.coherence.matches} items={row.coherence.items} t={t} />
                <p>
                  <NextLink
                    href={`/${lang}/a-quien-votar/partidos/${row.party.id}`}
                    className="inline-flex min-h-9 items-center font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {t.partyPage} →
                  </NextLink>
                </p>
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
