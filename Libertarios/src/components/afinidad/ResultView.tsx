"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeftRight, FileText, Grid3x3, Info, ListOrdered, RotateCcw, Scale, Sparkles, Trophy, Vote } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { dataset as defaultDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { recordAfinidadResponse } from "@/app/[locale]/a-quien-votar/actions";
import { track } from "@/lib/afinidad/track";
import { readAfinidad, toAnswers } from "@/lib/afinidad/storage";
import { PARAM_CONTRIBUTE } from "./TestFlow";
import type { Dataset } from "@/data/afinidad/types";
import { contradictions, surprise } from "@/lib/afinidad/score";
import {
  PARAM_ANSWERS,
  decodeResultParams,
  encodeAnswers,
  encodeResultParams,
  type DecodedResult,
} from "@/lib/afinidad/encode";
import { hiddenCount, visiblePartyIds } from "@/lib/afinidad/select";
import { fmt, getResultStrings, pct, type ResultStrings } from "@/i18n/afinidad/result";
import { PartyAvatar, StatusBadge } from "./PartyBadge";
import { basedOnText, buildRanking, programmeBarState, programmeHint, Ranking, recordBarState, type PartyRow } from "./Ranking";
import { Surprise } from "./Surprise";
import { Contradictions } from "./Contradictions";
import { PromiseVsRecord } from "./PromiseVsRecord";
import { DvhPartyButton, SaidVsDidCard } from "./SaidVsDid";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { QuestionBreakdown } from "./QuestionBreakdown";
import { ShareCard } from "./ShareCard";
import { ResultNextSteps } from "./ResultNextSteps";
import { QuestionGrid } from "./QuestionGrid";
import { Disclosure, SectionCard } from "./ui";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { isNewsletterEnabled } from "@/lib/newsletter/enabled";
import { KeepExploring } from "./KeepExploring";
import { QuadrantInvite } from "./QuadrantInvite";
import type { BarState } from "./PartyBar";

/** Ruta del módulo; el idioma se antepone al construir enlaces absolutos. */
const BASE_PATH = "/a-quien-votar";

/** Columnas de partidos en la rejilla «pregunta a pregunta». */
const GRID_PARTIES = 6;

/**
 * Lee el enlace (`?r=&v=&ca=&vh=`) y pinta el resultado.
 *
 * Todo se calcula en el cliente a partir de la URL: no hay base de datos de
 * resultados, así que el mismo enlace da el mismo resultado en cualquier
 * dispositivo, y nadie guarda qué contestó cada persona.
 */
export function ResultFromUrl({ lang }: { lang: string }) {
  const params = useSearchParams();
  const decoded = useMemo(
    () =>
      params
        ? decodeResultParams(params, defaultDataset.questions, {
            currentVersion: defaultDataset.version,
            partyIds: defaultDataset.parties.map((p) => p.id),
          })
        : null,
    [params],
  );

  /*
   * Aportación anónima al agregado y analítica, una sola vez por visita.
   *
   * Solo se guarda con `&aporta=1`, que pone el flujo del test cuando la
   * persona lo acepta expresamente (son datos de opinión política, RGPD art.
   * 9). Abrir el enlace de otra persona nunca guarda nada: el parámetro se
   * quita de la barra de direcciones en cuanto se ha guardado, así que ni una
   * recarga ni el enlace que se copie de ahí vuelven a contarlo. El enlace que
   * ofrece «Compartir» tampoco lo lleva (se reconstruye con
   * `encodeResultParams`, que no lo conoce).
   */
  const done = useRef(false);
  useEffect(() => {
    if (done.current || !params || !decoded) return;
    done.current = true;
    const contributes = params.get(PARAM_CONTRIBUTE) === "1";
    if (contributes) {
      const clean = new URLSearchParams(params.toString());
      clean.delete(PARAM_CONTRIBUTE);
      void recordAfinidadResponse(clean.toString());
      try {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}?${clean.toString()}`);
      } catch {
        // Sin `history` (navegadores muy viejos) solo se pierde la limpieza.
      }
    }
    // ¿Es el resultado propio, recién terminado, o el enlace de otra persona?
    // El flujo del test deja en este navegador las respuestas con
    // `completed: true`; si coinciden con las del enlace, es el propio. Se
    // cuenta una vez por sesión y enlace, para que recargar no sume. El evento
    // no lleva propiedades: la versión la añade `track()` y las respuestas no
    // salen nunca.
    const r = params.get(PARAM_ANSWERS) ?? "";
    if (alreadyTracked(r)) return;
    track(contributes || isOwnResult(r) ? "afinidad_complete" : "afinidad_open_shared");
  }, [params, decoded]);

  return <ResultView dataset={localizeDataset(defaultDataset, lang)} decoded={decoded} lang={lang} />;
}

function isOwnResult(r: string): boolean {
  const stored = readAfinidad(defaultDataset.questions.map((q) => q.id));
  if (!stored?.completed) return false;
  try {
    return encodeAnswers(toAnswers(stored.values, stored.important), defaultDataset.questions) === r;
  } catch {
    return false;
  }
}

const TRACKED_KEY = "libertarios:afinidad:visto";

function alreadyTracked(r: string): boolean {
  try {
    const seen = window.sessionStorage.getItem(TRACKED_KEY);
    if (seen === r) return true;
    window.sessionStorage.setItem(TRACKED_KEY, r);
  } catch {
    // Sin almacenamiento de sesión se cuenta igualmente: es un evento, no un dato.
  }
  return false;
}

export interface ResultViewProps {
  dataset: Dataset;
  /** `null` si el enlace no trae un resultado válido para este cuestionario. */
  decoded: DecodedResult | null;
  lang: string;
  /** Origen para los enlaces de compartir; por defecto, `window.location.origin`. */
  origin?: string;
}

export function ResultView({ dataset, decoded, lang, origin: originProp }: ResultViewProps) {
  const t = getResultStrings(lang);
  const [showAll, setShowAll] = useState(false);
  // `window` no existe en el servidor: se lee tras montar para que el HTML del
  // servidor y el primer render del cliente coincidan.
  const [origin, setOrigin] = useState(originProp ?? "");
  useEffect(() => {
    if (!originProp && typeof window !== "undefined") setOrigin(window.location.origin);
  }, [originProp]);

  const partyBy = useMemo(() => new Map(dataset.parties.map((p) => [p.id, p])), [dataset]);

  const model = useMemo(() => {
    if (!decoded || dataset.questions.length === 0) return null;
    const { region, usualVote } = decoded.context;
    const opts = { showAll, include: usualVote ? [usualVote] : [] };
    const partyIds = visiblePartyIds(dataset.parties, region, opts);
    return {
      ranking: buildRanking(decoded.answers, dataset, partyIds),
      hidden: hiddenCount(dataset.parties, region, opts),
    };
  }, [decoded, dataset, showAll]);

  // ── Estados sin resultado ───────────────────────────────────────────────
  if (dataset.questions.length === 0) {
    return <Notice title={t.noData} t={t} />;
  }
  if (!decoded || !model) {
    return <Notice title={t.invalidTitle} body={t.invalidBody} t={t} />;
  }
  const { combined, rows } = model.ranking;
  if (!combined.enoughAnswers) {
    return (
      <Notice
        title={fmt(t.tooFewTitle, { n: combined.answered, total: dataset.questions.length })}
        body={fmt(t.tooFewBody, { min: combined.minAnswers })}
        t={t}
      />
    );
  }

  // ── Resultado ───────────────────────────────────────────────────────────
  const usable = rows.filter((r) => r.combined.usable);
  const leaders = usable.filter((r) => r.displayRank === 1);
  const usualVote = decoded.context.usualVote ? partyBy.get(decoded.context.usualVote) : undefined;
  const surpriseData = surprise(combined, dataset, usualVote?.bloc, usualVote?.id);
  // «Tu partido» es el voto habitual si lo dijiste; si no, el 1.º del ranking.
  const contradictionParty = usualVote ?? usable[0]?.party;
  const contradictionItems = contradictionParty
    ? contradictions(decoded.answers, dataset, contradictionParty.id)
    : [];
  const top3 = usable.slice(0, 3).map((r) => r.party);
  // «Dijeron vs. hicieron»: los tres primeros y, además, el voto habitual si
  // no está entre ellos. Es el partido sobre el que la persona más querrá
  // comprobar, y dejarlo fuera por no estar arriba lo escondería justo a ella.
  const dvhParties = usualVote && !top3.some((p) => p.id === usualVote.id) ? [...top3, usualVote] : top3;
  // Botones compactos junto al titular: el primero y, si lo dijiste y es
  // otro, el que sueles votar. La misma forma para los dos.
  const dvhButtons = [usable[0]?.party, usualVote].filter(
    (p, i, arr): p is NonNullable<typeof p> => !!p && arr.findIndex((q) => q?.id === p.id) === i,
  );
  const dvh = getDvhStrings(lang);

  const params = encodeResultParams(
    { answers: decoded.answers, context: decoded.context },
    dataset.questions,
    dataset.version,
  );
  const resultUrl = `${origin}/${lang}${BASE_PATH}/resultado?${params.toString()}`;
  const introUrl = `${origin}/${lang}${BASE_PATH}`;
  const first = usable[0];
  const resultText = first
    ? fmt(t.shareText, {
        party: first.party.name,
        p: figureText(programmeBarState(first), first.programme.score, t),
        v: figureText(recordBarState(first), first.record.score, t),
      })
    : null;

  // La rejilla «pregunta a pregunta»: los seis primeros comparables y, si no
  // está entre ellos, el partido que sueles votar (es el que más querrás ver).
  const gridParties = usable.slice(0, GRID_PARTIES).map((r) => r.party);
  if (usualVote && !gridParties.some((p) => p.id === usualVote.id)) gridParties.push(usualVote);

  return (
    <div className="space-y-6">
      {decoded.stale && (
        <p role="status" className="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/5 p-3 text-sm text-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          {t.staleNotice}
        </p>
      )}

      {/* 1. Titular: el partido, su distintivo y dos cifras grandes, separadas
          y del mismo tamaño. Fundirlas en una escondería precisamente lo que
          el test quiere enseñar. Mismo tratamiento que la cabecera de
          `QuadrantResults` (píldora de marca + cifras en tarjetas). */}
      {leaders.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-muted-foreground">{t.noUsable}</p>
        </SectionCard>
      ) : (
        <Headline leaders={leaders} t={t} answered={combined.answered} lang={lang} />
      )}

      {/* «¿Cumplen lo que dicen?»: solo botones (petición del dueño); la
          sección completa sigue plegada más abajo. No puntúa. */}
      {dvhButtons.length > 0 && (dataset.saidVsDid?.length ?? 0) > 0 && (
        <nav aria-label={dvh.resultTitle} data-testid="dvh-buttons" className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">{dvh.resultTitle}</span>
          {dvhButtons.map((p) => (
            <DvhPartyButton key={p.id} party={p} label={fmt(dvh.resultButton, { party: p.short })} lang={lang} />
          ))}
        </nav>
      )}

      {/* 2. Ranking: filas compactas, el detalle en cada fila. */}
      <SectionCard title={t.rankingTitle} intro={t.rankingIntro} icon={ListOrdered}>
        <Ranking rows={rows} answered={combined.answered} t={t} lang={lang} />
        {(model.hidden > 0 || showAll) && (
          <Button variant="ghost" className="mt-3 min-h-11" onClick={() => setShowAll((v) => !v)}>
            {showAll ? t.showLess : fmt(t.showAll, { n: model.hidden })}
          </Button>
        )}
      </SectionCard>

      {/* 2b. «¿Te sorprende tu resultado?»: compartir o hacer el cuadrante, justo tras el ranking. */}
      <ResultNextSteps lang={lang} />

      {/* 3–4. Las dos tarjetas destacadas, lado a lado en escritorio. */}
      {(surpriseData || contradictionParty) && (
        <div className="grid gap-6 md:grid-cols-2">
          {surpriseData && (
            <SectionCard title={t.surpriseTitle} icon={Sparkles}>
              <Surprise data={surpriseData} dataset={dataset} answers={decoded.answers} partyBy={partyBy} t={t} lang={lang} />
            </SectionCard>
          )}
          {contradictionParty && (
            <SectionCard
              title={fmt(t.contradictionsTitle, { party: contradictionParty.name })}
              intro={usualVote ? t.contradictionsIntroUsual : t.contradictionsIntroTop}
              icon={ArrowLeftRight}
            >
              <Contradictions items={contradictionItems} party={contradictionParty} dataset={dataset} t={t} lang={lang} />
            </SectionCard>
          )}
        </div>
      )}

      {/* 5. Compartir, pronto y a la vista: misma tarjeta que el cuadrante. */}
      <ShareCard
        resultUrl={resultUrl}
        introUrl={introUrl}
        resultText={resultText}
        leader={
          first
            ? {
                party: first.party,
                programme: figureText(programmeBarState(first), first.programme.score, t),
                record: figureText(recordBarState(first), first.record.score, t),
              }
            : null
        }
        t={t}
      />

      {/* 6. Pregunta a pregunta: la rejilla de puntos; la lista con todas las
          fuentes de todos los partidos, plegada debajo. */}
      <SectionCard title={t.breakdownTitle} intro={t.breakdownIntro} icon={Grid3x3}>
        <QuestionGrid dataset={dataset} answers={decoded.answers} parties={gridParties} t={t} lang={lang} />
        <Disclosure summary={t.gridAsText} className="mt-2">
          <QuestionBreakdown
            dataset={dataset}
            answers={decoded.answers}
            parties={rows.map((r) => r.party)}
            t={t}
            lang={lang}
          />
        </Disclosure>
      </SectionCard>

      {/* 7. Promesa vs. hechos */}
      {top3.length > 0 && (
        <SectionCard title={t.pvrTitle} intro={t.pvrIntro} icon={FileText}>
          <PromiseVsRecord parties={top3} dataset={dataset} t={t} lang={lang} />
        </SectionCard>
      )}

      {/* 7b. Dijeron vs. hicieron: justo después de «Promesa vs. hechos»
          porque es su continuación. No puntúa, y la tarjeta lo dice. */}
      {dvhParties.length > 0 && (
        <SectionCard title={dvh.title} intro={dvh.cardIntro} icon={Scale} id="dijeron-vs-hicieron" testId="dvh-result">
          <SaidVsDidCard
            parties={dvhParties}
            entries={dataset.saidVsDid}
            usualVoteId={usualVote?.id}
            t={dvh}
            lang={lang}
          />
        </SectionCard>
      )}

      {/* 8. Novedades de Libertarios.eu: después de todo el resultado, opcional
          y con casilla sin marcar. Es del sitio, no del test, y el formulario
          no recibe nada del resultado (ni respuestas, ni voto, ni comunidad):
          solo el idioma. Sustituye a «Avísame» (afinidad_notify, congelada en
          0011). */}
      <SectionCard>
        {isNewsletterEnabled() && <NewsletterForm source="test" locale={lang} />}
      </SectionCard>

      <div className="flex justify-center">
        <Button variant="outline" className="min-h-11" asChild>
          <Link href={`${BASE_PATH}/test`}>
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
            {t.retakeAgain}
          </Link>
        </Button>
      </div>

      {/* 9. Sigue explorando: otros tests de Libertarios.eu. El último bloque a
          propósito (plan, actualización §7): nunca por encima del ranking ni
          del detalle, para que el resultado neutral se lea entero antes de
          cualquier invitación del sitio que hace el test. La invitación al
          cuadrante va delante y se personaliza solo con las respuestas de
          impuestos de la persona (nunca con partidos); no se guarda. */}
      <QuadrantInvite answers={decoded.answers} questions={dataset.questions} lang={lang} />
      <KeepExploring lang={lang} />
    </div>
  );
}

function figureText(state: BarState, value: number | null, t: ResultStrings): string {
  if (state === "ok" && value !== null) return pct(value);
  return state === "no-record" ? t.noRecord : t.insufficient;
}

/**
 * El titular. Con empate en cabeza se nombran todos los empatados con el mismo
 * peso: elegir uno por orden alfabético sería decidir por la persona.
 */
function Headline({ leaders, t, answered, lang }: { leaders: PartyRow[]; t: ResultStrings; answered: number; lang: string }) {
  const tie = leaders.length > 1;
  const basis = leaders[0].combined.basis;
  return (
    <section
      data-testid="headline"
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center sm:p-8"
    >
      <p className="gradient-primary mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-sm font-semibold text-primary-foreground">
        <Trophy className="h-4 w-4" aria-hidden />
        {tie ? t.headlineTie : t.headlineEyebrow}
      </p>
      <div className="space-y-8">
        {leaders.map((row) => (
          <HeadlineParty key={row.party.id} row={row} t={t} answered={answered} lang={lang} />
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-md text-xs text-muted-foreground">
        {basis === "programa" ? t.basisProgramme : basis === "hechos" ? t.basisRecord : t.basisBoth}
      </p>
    </section>
  );
}

function HeadlineParty({ row, t, answered, lang }: { row: PartyRow; t: ResultStrings; answered: number; lang: string }) {
  const hint = programmeHint(row, t);
  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <PartyAvatar party={row.party} size={72} />
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{row.party.name}</h2>
          <StatusBadge party={row.party} t={t} />
        </div>
      </div>
      <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-3 sm:gap-4">
        <Figure
          label={t.figureProgramme}
          icon={FileText}
          state={programmeBarState(row)}
          value={row.programme.score}
          t={t}
          hint={hint}
          basedOn={basedOnText(row.programme, programmeBarState(row), answered, t)}
          lang={lang}
        />
        <Figure
          label={t.figureRecord}
          icon={Vote}
          state={recordBarState(row)}
          value={row.record.score}
          t={t}
          hint={row.party.recordNote}
          basedOn={basedOnText(row.record, recordBarState(row), answered, t)}
          lang={lang}
        />
      </div>
    </div>
  );
}

/** Una de las dos cifras del titular; mismas clases para las dos a propósito. */
function Figure({
  label,
  icon: Icon,
  state,
  value,
  t,
  hint,
  basedOn,
  lang,
}: {
  label: string;
  icon: typeof FileText;
  state: BarState;
  value: number | null;
  t: ResultStrings;
  hint?: string;
  basedOn?: string;
  lang: string;
}) {
  const shown = state === "ok" && value !== null;
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4 shadow-soft sm:p-5">
      <Icon className="mb-1 h-4 w-4 text-primary" aria-hidden />
      {shown ? (
        <CountUp
          value={Math.round(value * 100)}
          suffix={" %"}
          locale={`${lang}-ES`}
          className="font-display text-4xl font-bold tabular-nums text-foreground sm:text-5xl"
        />
      ) : (
        <p className="py-2 text-sm italic text-muted-foreground">{figureText(state, value, t)}</p>
      )}
      <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
      {basedOn && (
        <p className="mt-1 text-[11px] tabular-nums text-muted-foreground" data-testid="based-on">
          {basedOn}
        </p>
      )}
      {hint && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Mensaje claro + volver a hacer el test. Nunca un resultado inventado. */
function Notice({ title, body, t }: { title: string; body?: string; t: ResultStrings }) {
  return (
    <section role="status" className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      {body && <p className="mt-2 text-muted-foreground">{body}</p>}
      <Button variant="cta" className="mt-6" asChild>
        <Link href={`${BASE_PATH}/test`}>{t.retake}</Link>
      </Button>
    </section>
  );
}

