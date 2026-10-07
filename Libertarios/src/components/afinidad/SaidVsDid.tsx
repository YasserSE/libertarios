"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { ArrowRight, Check, ChevronDown, ImageIcon, Info, Link2, Play, Scale, X } from "lucide-react";
import { VERDICT_FILL, VERDICT_ICON } from "./dvhStyle";
import type { DidEvidence, Party, SaidVsDid } from "@/data/afinidad/types";
import {
  DVH_CARD_MAX,
  DVH_PARAMS,
  DVH_PATH,
  DVH_VERDICTS,
  countVerdicts,
  dvhAnchor,
  dvhOgHref,
  dvhPartyFilterHref,
  dvhShareHref,
  entriesForParty,
  filterEntries,
  isDvhVerdict,
  topicsOf,
  type DvhVerdict,
} from "@/lib/afinidad/dvh";
import { fmt, formatDate } from "@/i18n/afinidad/result";
import type { DvhStrings } from "@/i18n/afinidad/dvh";
import type { DvhSearchLog } from "@/data/afinidad/dichos-hechos/busqueda";
import { track } from "@/lib/afinidad/track";
import { cn } from "@/lib/utils";
import { PartyAvatar } from "./PartyBadge";
import { Disclosure, StackedBar } from "./ui";

/*
 * «Dijeron vs. hicieron» (petición del dueño: «historial de lo que dijeron vs
 * lo que hacen»).
 *
 * Decisiones de diseño, y por qué:
 *  - Las cuatro etiquetas llevan el MISMO estilo neutro y se distinguen por
 *    icono y texto. Verde para «cumple» y rojo para «contradice» convertirían
 *    una descripción en una nota moral; y quien no distingue colores tiene
 *    que poder leerla igual.
 *  - El recuento por etiqueta va siempre a la vista, también cuando una es 0:
 *    lo que se elige enseñar ya es una forma de opinar, así que se enseña
 *    cuántas hay de cada tipo para que se vea la selección.
 *  - Primero lo que dijeron y después lo que hicieron, en el orden en que
 *    pasó, sin comentario entre medias.
 */

/*
 * Rediseño «más visual, menos texto» (2026-10-07):
 *  - Recuentos como barra apilada con leyenda (icono + cifra + nombre). Los
 *    cuatro tramos son tonos de la misma tinta, no verde/rojo: la regla de
 *    arriba sigue en pie.
 *  - Cada entrada es un nodo de una línea de tiempo: icono de la etiqueta,
 *    partido, fecha y dos líneas («dijeron» → «hicieron»). La cita entera,
 *    las pruebas, la nota y «Compartir» van plegados en «Ver detalle», en el
 *    mismo `<article>` (el ancla `#dvh-<id>` sigue funcionando).
 *  - Un dato oficial se enseña como cifra grande: es la prueba, y una cifra
 *    se lee antes que una frase.
 */

export function VerdictBadge({ verdict, t }: { verdict: DvhVerdict; t: DvhStrings }) {
  const Icon = VERDICT_ICON[verdict];
  return (
    <span
      title={t[`verdictHelp_${verdict}`]}
      data-verdict={verdict}
      className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {t[`verdict_${verdict}`]}
    </span>
  );
}

/**
 * Recuento de las cuatro etiquetas como barra apilada. La frase completa
 * («N cumplidas · M contradichas…») va para el lector de pantalla y es la que
 * leen los tests; la leyenda visible repite las cuatro cifras con su icono.
 */
export function DvhCounts({
  entries,
  t,
  party,
  legend = true,
}: {
  entries: readonly SaidVsDid[];
  t: DvhStrings;
  party?: Party;
  legend?: boolean;
}) {
  const c = countVerdicts(entries);
  const text = fmt(t.counts, { c: c.cumple, x: c.contradice, p: c.parcial, n: c["no-hecho"] });
  return (
    <div>
      <StackedBar
        label={party ? fmt(t.countsLabel, { party: party.name }) : t.byParty}
        showLegend={legend}
        segments={DVH_VERDICTS.map((v) => ({
          key: v,
          value: c[v],
          label: t[`verdict_${v}`],
          fill: VERDICT_FILL[v],
          icon: VERDICT_ICON[v],
        }))}
      />
      <p
        className="sr-only"
        data-testid="dvh-counts"
        aria-label={party ? `${fmt(t.countsLabel, { party: party.name })}: ${text}` : undefined}
      >
        {text}
      </p>
    </div>
  );
}

/** Leyenda única para una rejilla de barras sin leyenda propia. */
export function VerdictLegend({ t }: { t: DvhStrings }) {
  return (
    <ul aria-hidden className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
      {DVH_VERDICTS.map((v) => {
        const Icon = VERDICT_ICON[v];
        return (
          <li key={v} className="inline-flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${VERDICT_FILL[v]}`} />
            <Icon className="h-3 w-3" />
            {t[`verdict_${v}`]}
          </li>
        );
      })}
    </ul>
  );
}

function EvidenceLine({ e, t, lang }: { e: DidEvidence; t: DvhStrings; lang: string }) {
  return (
    <li className="leading-snug">
      {e.kind === "dato-oficial" && (
        <span className="mb-1 block" data-testid="dvh-official-value">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.officialData}</span>
          <span className="block font-display text-2xl font-bold tabular-nums text-foreground">{e.value}</span>
        </span>
      )}
      <span className="text-foreground">{e.kind === "boe" ? `${e.reference} — ${e.title}` : e.title}</span>{" "}
      <span className="text-xs text-muted-foreground">
        {e.kind === "dato-oficial" && `· ${fmt(t.officialPublisher, { publisher: e.publisher })} `}
        · {formatDate(e.date, lang)}
        {e.kind === "votacion" && ` · ${fmt(t.groupVote, { vote: t[`vote_${e.groupVote}`] })}`}
        {e.kind === "otro-parlamento" && ` · ${e.chamber} · ${t[`vote_${e.vote}`]}`}
        {e.kind === "iniciativa" && ` · ${fmt(t.initiativeStatus, { status: e.status })}`}
        {" · "}
        <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
          {e.kind === "votacion" ? t.openCongreso : t.source}
        </a>
      </span>
    </li>
  );
}

/**
 * Copia el enlace a la entrada dentro de la ficha del partido. Solo copiar: el
 * enlace no lleva respuestas ni resultado, y el evento va sin propiedades.
 * Lleva `?dvh=<id>`: la ficha usa entonces la imagen OG de esta entrada (la
 * vista previa en WhatsApp enseña la cita y el hecho) y la resalta al abrir.
 */
function ShareEntry({ entry, t, lang }: { entry: SaidVsDid; t: DvhStrings; lang: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const [url, setUrl] = useState("");
  const onClick = async () => {
    const href = `${window.location.origin}${dvhShareHref(lang, entry)}`;
    setUrl(href);
    track("afinidad_share_dvh");
    try {
      await navigator.clipboard.writeText(href);
      setState("copied");
    } catch {
      setState("error");
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={t.shareAria}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Link2 className="h-3.5 w-3.5" aria-hidden />
        {t.share}
      </button>
      <a
        href={dvhOgHref(lang, entry.id)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ImageIcon className="h-3.5 w-3.5" aria-hidden />
        {t.shareImage}
      </a>
      <span role="status" className="text-xs text-muted-foreground">
        {state === "copied" ? t.copied : state === "error" ? (
          <>
            {t.copyError}: <span className="break-all">{url}</span>
          </>
        ) : null}
      </span>
    </div>
  );
}

/**
 * Contexto del partido junto a su recuento: si ha gobernado en el Estado y
 * cuándo. Sin él, un recuento con más «contradice» se leería como «miente
 * más», cuando lo que suele haber detrás es que tuvo más ocasiones.
 */
export function GovernmentContext({ party, t, lang }: { party: Party; t: DvhStrings; lang: string }) {
  const periods = party.inGovernment ?? [];
  return (
    <p className="text-[11px] text-muted-foreground" data-testid="dvh-government" data-dvh-government={party.id}>
      {periods.length === 0 ? (
        t.neverGoverned
      ) : (
        <>
          {fmt(t.governedIn, {
            periods: periods
              .map((g) => `${formatDate(g.from, lang)} – ${g.to ? formatDate(g.to, lang) : t.present}`)
              .join("; "),
          })}{" "}
          <span>{t.governedScope}</span>
        </>
      )}
    </p>
  );
}

/** Aviso visible: los recuentos no se comparan entre partidos. */
export function NotComparableNote({ t }: { t: DvhStrings }) {
  return (
    <p className="flex items-start gap-1.5 text-xs text-muted-foreground" data-testid="dvh-not-comparable">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{t.notComparable}</span>
    </p>
  );
}

/**
 * Una entrada como nodo de la línea de tiempo: etiqueta (icono en el nodo),
 * partido, fecha, «dijeron» → «hicieron» en una línea cada uno y el detalle
 * plegado. Primero lo que dijeron y después lo que hicieron, sin comentario.
 */
export function SaidVsDidItem({
  entry,
  t,
  lang,
  party,
}: {
  entry: SaidVsDid;
  t: DvhStrings;
  lang: string;
  /** Si se pasa, se nombra el partido (listas con varios partidos). */
  party?: Party;
}) {
  const { said, did } = entry;
  const videoLabel = said.videoStart ? fmt(t.videoFrom, { t: said.videoStart }) : t.video;
  const Icon = VERDICT_ICON[entry.verdict];
  return (
    <article
      id={dvhAnchor(entry.id)}
      data-dvh={entry.id}
      className="relative scroll-mt-24 rounded-xl pb-5 pl-10 transition-shadow last:pb-0 data-[focus=true]:bg-primary/5 data-[focus=true]:ring-2 data-[focus=true]:ring-primary/40 sm:pl-11"
    >
      {/* Nodo de la línea de tiempo: la etiqueta como icono (el texto va al lado). */}
      <span
        aria-hidden
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft"
      >
        <Icon className="h-4 w-4" />
      </span>

      <header className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        {party && (
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            <PartyAvatar party={party} size={20} />
            {party.short}
          </span>
        )}
        <time dateTime={said.date}>{formatDate(said.date, lang)}</time>
        <span aria-hidden className="hidden sm:inline">·</span>
        <span className="order-last basis-full font-medium text-foreground sm:order-none sm:basis-auto">{entry.topic}</span>
        <span className="ml-auto">
          <VerdictBadge verdict={entry.verdict} t={t} />
        </span>
      </header>

      <div className="mt-2 space-y-1 text-sm">
        <p className="line-clamp-2 text-foreground sm:line-clamp-1">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t.said}</span>
          «{said.text}»
        </p>
        <p className="line-clamp-2 text-foreground sm:line-clamp-1">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">→ {t.did}</span>
          {did.summary}
        </p>
      </div>

      <Disclosure summary={t.details} className="mt-1">
        <ol className="space-y-4 rounded-xl border border-border bg-background p-3">
          <li>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t.said} · <time dateTime={said.date}>{formatDate(said.date, lang)}</time>
            </p>
            <div className="mt-1 flex items-start gap-3">
              <blockquote className="min-w-0 flex-1 text-sm leading-relaxed text-foreground">«{said.text}»</blockquote>
              {said.videoUrl && (
                <a
                  href={said.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={videoLabel}
                  title={videoLabel}
                  className="gradient-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary-foreground shadow-soft transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />
                </a>
              )}
            </div>
            <p className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{said.speaker}</span>
              {said.role && <span>· {said.role}</span>}
              <a href={said.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                {said.source.title}
                {said.source.page ? ` (${fmt(t.page, { page: said.source.page })})` : ""}
              </a>
            </p>
          </li>
          <li>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t.did} · <time dateTime={did.date}>{formatDate(did.date, lang)}</time>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{did.summary}</p>
            <ul className="mt-1 space-y-1 text-sm">
              {did.evidence.map((e, i) => (
                <EvidenceLine key={i} e={e} t={t} lang={lang} />
              ))}
            </ul>
          </li>
          {entry.note && (
            <li className="text-xs text-muted-foreground">
              {t.note}: {entry.note}
            </li>
          )}
          <li>
            <ShareEntry entry={entry} t={t} lang={lang} />
          </li>
        </ol>
      </Disclosure>
    </article>
  );
}

/** Línea vertical que une los nodos. */
function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-2 left-4 top-2 w-px bg-border" />
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * Tarjeta del resultado: los tres primeros partidos y el voto habitual. Cada
 * partido con su barra de recuento completa aunque solo se enseñen las
 * entradas más recientes.
 */
export function SaidVsDidCard({
  parties,
  entries,
  usualVoteId,
  t,
  lang,
}: {
  parties: Party[];
  entries: readonly SaidVsDid[] | undefined;
  usualVoteId?: string;
  t: DvhStrings;
  lang: string;
}) {
  const all = entries ?? [];
  if (all.length === 0) {
    return (
      <div role="status" className="rounded-xl border border-dashed border-border p-4">
        <p className="text-sm font-medium text-foreground">{t.inPreparationTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.inPreparationBody}</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.notScored}</p>
      <NotComparableNote t={t} />
      {parties.map((party) => {
        const mine = entriesForParty(all, party.id);
        return (
          <section key={party.id} className="rounded-xl border border-border bg-background p-4" data-dvh-party={party.id}>
            <div className="flex flex-wrap items-center gap-2">
              <PartyAvatar party={party} size={28} />
              <span className="font-medium text-foreground">{party.name}</span>
              {party.id === usualVoteId && (
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  {t.usualVote}
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1">
              <DvhCounts entries={mine} t={t} party={party} />
              <GovernmentContext party={party} t={t} lang={lang} />
            </div>
            {mine.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{t.none}</p>
            ) : (
              // En el resultado, las entradas plegadas: la barra ya dice cuántas
              // hay de cada tipo, y cuatro partidos con tres entradas abiertas
              // eran la sección más larga de la página.
              <Disclosure summary={fmt(t.showEntries, { n: Math.min(mine.length, DVH_CARD_MAX) })} className="mt-2">
                <Timeline>
                  {mine.slice(0, DVH_CARD_MAX).map((e) => (
                    <SaidVsDidItem key={e.id} entry={e} t={t} lang={lang} />
                  ))}
                </Timeline>
                {mine.length > DVH_CARD_MAX && (
                  <NextLink
                    href={`/${lang}/a-quien-votar/partidos/${party.id}#dijeron-vs-hicieron`}
                    className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
                  >
                    {fmt(t.seeParty, { party: party.short })} →
                  </NextLink>
                )}
              </Disclosure>
            )}
          </section>
        );
      })}
      <NextLink
        href={`/${lang}${DVH_PATH}`}
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
      >
        {t.seeAll} →
      </NextLink>
    </div>
  );
}

/**
 * Botón compacto hacia las entradas de un partido en la página propia
 * (filtrada). Lo usan el resultado y la ficha: la sección completa sigue
 * plegada más abajo, y esto solo la hace fácil de encontrar.
 */
export function DvhPartyButton({ party, label, lang }: { party: Party; label: string; lang: string }) {
  return (
    <NextLink
      href={dvhPartyFilterHref(lang, party.id)}
      data-dvh-button={party.id}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-card px-4 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Scale className="h-4 w-4 text-primary" aria-hidden />
      <PartyAvatar party={party} size={20} />
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
    </NextLink>
  );
}

/** Una ficha de filtro: botón con `aria-pressed`, 44 px de alto. */
function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pressed
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
      {pressed && <Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
    </button>
  );
}

function ChipGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
      <span aria-hidden className="w-16 shrink-0 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/**
 * Página propia: todas las entradas con filtros por partido, etiqueta y tema.
 *
 * Rediseño: los filtros son fichas (un toque, sin desplegables) y la lista es
 * una línea de tiempo. Los filtros se leen de la URL tras montar y se
 * reflejan en ella con `replaceState`, sin pasar por el router: así la
 * página sigue siendo estática y un enlace con `?partido=…` abre ya filtrado.
 */
export function SaidVsDidExplorer({
  entries,
  parties,
  t,
  lang,
}: {
  entries: SaidVsDid[];
  parties: Party[];
  t: DvhStrings;
  lang: string;
}) {
  const [party, setParty] = useState("");
  const [verdict, setVerdict] = useState<DvhVerdict | "">("");
  const [topic, setTopic] = useState("");
  const ready = useRef(false);

  const partyBy = useMemo(() => new Map(parties.map((p) => [p.id, p])), [parties]);
  // Solo partidos con alguna entrada, en el orden del dataset (no por recuento:
  // ordenar por «más contradicciones» sería un ranking que no queremos hacer).
  const withEntries = useMemo(
    () => parties.filter((p) => entries.some((e) => e.partyId === p.id)),
    [parties, entries],
  );
  const topics = useMemo(() => topicsOf(entries), [entries]);
  const shown = useMemo(
    () => filterEntries(entries, { party: party || undefined, verdict: verdict || undefined, topic: topic || undefined }),
    [entries, party, verdict, topic],
  );

  // Una vez por visita a la página: es el único evento de «abrir».
  useEffect(() => {
    track("afinidad_dvh_open");
    try {
      const sp = new URLSearchParams(window.location.search);
      const p = sp.get(DVH_PARAMS.party) ?? "";
      const v = sp.get(DVH_PARAMS.verdict) ?? "";
      const tp = sp.get(DVH_PARAMS.topic) ?? "";
      if (partyBy.has(p)) setParty(p);
      if (isDvhVerdict(v)) setVerdict(v);
      if (topics.includes(tp)) setTopic(tp);
    } catch {
      // Sin URL legible se empieza sin filtros.
    }
    ready.current = true;
    // Solo al montar: los filtros iniciales vienen de la URL una vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    try {
      const sp = new URLSearchParams(window.location.search);
      const set = (k: string, v: string) => (v ? sp.set(k, v) : sp.delete(k));
      set(DVH_PARAMS.party, party);
      set(DVH_PARAMS.verdict, verdict);
      set(DVH_PARAMS.topic, topic);
      const qs = sp.toString();
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
    } catch {
      // Sin `history` solo se pierde poder copiar la URL filtrada.
    }
  }, [party, verdict, topic]);

  if (entries.length === 0) {
    return (
      <section role="status" className="rounded-2xl border border-dashed border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">{t.inPreparationTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.inPreparationBody}</p>
      </section>
    );
  }

  const filtered = party || verdict || topic;
  // Pulsar la ficha activa la quita: un filtro se deshace con el mismo gesto.
  const toggle = <T extends string>(current: T | "", value: T, set: (v: T | "") => void) =>
    set(current === value ? "" : value);

  return (
    <div className="space-y-6">
      <section aria-labelledby="dvh-recuento" className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="dvh-recuento" className="font-display text-lg font-semibold text-foreground">
            {t.byParty}
          </h2>
          <VerdictLegend t={t} />
        </div>
        <div className="mt-1">
          <NotComparableNote t={t} />
        </div>
        <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {withEntries.map((p) => (
            <li key={p.id} className="min-w-0" data-dvh-count={p.id}>
              <span className="mb-1.5 flex items-center gap-2">
                <PartyAvatar party={p} size={22} />
                <span className="truncate text-sm font-medium text-foreground">{p.short}</span>
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {entries.filter((e) => e.partyId === p.id).length}
                </span>
              </span>
              <DvhCounts entries={entries.filter((e) => e.partyId === p.id)} t={t} party={p} legend={false} />
              <GovernmentContext party={p} t={t} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={t.filtersLabel} className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
        <ChipGroup label={t.filterParty}>
          <FilterChip pressed={!party} onClick={() => setParty("")}>
            {t.all}
          </FilterChip>
          {withEntries.map((p) => (
            <FilterChip key={p.id} pressed={party === p.id} onClick={() => toggle(party, p.id, setParty)}>
              <PartyAvatar party={p} size={20} />
              <span title={p.name}>{p.short}</span>
              <span className="sr-only"> ({p.name})</span>
            </FilterChip>
          ))}
        </ChipGroup>
        <ChipGroup label={t.filterVerdict}>
          <FilterChip pressed={!verdict} onClick={() => setVerdict("")}>
            {t.allVerdicts}
          </FilterChip>
          {DVH_VERDICTS.map((v) => {
            const Icon = VERDICT_ICON[v];
            return (
              <FilterChip key={v} pressed={verdict === v} onClick={() => toggle(verdict, v, setVerdict)}>
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {t[`verdict_${v}`]}
              </FilterChip>
            );
          })}
        </ChipGroup>
        {/* Los temas son casi uno por entrada: a la vista serían un muro de
            fichas. Plegados, con el elegido en el título. */}
        <details className="group" open={topic !== "" || undefined}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground [&::-webkit-details-marker]:hidden">
            {t.filterTopic}
            <span className="normal-case tracking-normal text-foreground">{topic || `${t.all} (${topics.length})`}</span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <ChipGroup label={t.filterTopic}>
            <FilterChip pressed={!topic} onClick={() => setTopic("")}>
              {t.all}
            </FilterChip>
            {topics.map((tp) => (
              <FilterChip key={tp} pressed={topic === tp} onClick={() => toggle(topic, tp, setTopic)}>
                {tp}
              </FilterChip>
            ))}
          </ChipGroup>
        </details>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p role="status" className="text-sm font-medium text-foreground" data-testid="dvh-results-count">
          {fmt(t.resultsCount, { n: shown.length })}
        </p>
        {filtered && (
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-primary hover:bg-accent"
            onClick={() => {
              setParty("");
              setVerdict("");
              setTopic("");
            }}
          >
            <X className="h-4 w-4" aria-hidden />
            {t.clearFilters}
          </button>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">{t.noMatches}</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
          <Timeline>
            {shown.map((e) => (
              <SaidVsDidItem key={e.id} entry={e} t={t} lang={lang} party={partyBy.get(e.partyId)} />
            ))}
          </Timeline>
        </div>
      )}
    </div>
  );
}

/** Sección de la ficha de partido: barra de recuento y todas sus entradas. */
export function PartySaidVsDid({
  party,
  entries,
  t,
  lang,
}: {
  party: Party;
  entries: readonly SaidVsDid[] | undefined;
  t: DvhStrings;
  lang: string;
}) {
  const mine = entriesForParty(entries, party.id);
  return (
    <div className="space-y-3">
      <DvhCounts entries={mine} t={t} party={party} />
      <GovernmentContext party={party} t={t} lang={lang} />
      <NotComparableNote t={t} />
      {mine.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">{t.none}</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-5">
          <Timeline>
            {mine.map((e) => (
              <SaidVsDidItem key={e.id} entry={e} t={t} lang={lang} />
            ))}
          </Timeline>
        </div>
      )}
      <NextLink
        href={`/${lang}${DVH_PATH}?${DVH_PARAMS.party}=${encodeURIComponent(party.id)}`}
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline"
      >
        {t.seeAll}
      </NextLink>
    </div>
  );
}

/**
 * Con `?dvh=<id>` en la URL (el enlace de «Compartir»), resalta esa entrada,
 * le abre el detalle y la trae a la vista. Se lee en el cliente: la ficha no
 * necesita el parámetro para pintarse.
 */
export function DvhFocus() {
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("dvh");
      if (!id) return;
      const el = document.getElementById(dvhAnchor(id));
      if (!el) return;
      el.setAttribute("data-focus", "true");
      el.querySelector("details")?.setAttribute("open", "");
      el.scrollIntoView?.({ block: "start" });
    } catch {
      // Sin URL legible no se resalta nada.
    }
  }, []);
  return null;
}

/**
 * Criterios de selección; los mismos en la página propia y en la metodología.
 * `maxWords` llega por props (de `schema.ts`) para no meter zod en el paquete
 * del navegador por una cifra.
 */
export function DvhCriteria({ t, maxWords }: { t: DvhStrings; maxWords: number }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
      <li>{t.criteria1}</li>
      <li>{t.criteria7}</li>
      <li>{t.criteria2}</li>
      <li>{fmt(t.criteria3, { n: maxWords })}</li>
      <li>{t.criteria4}</li>
      <li>{t.criteria6}</li>
      <li>{t.criteria5}</li>
    </ul>
  );
}

/**
 * «Qué buscamos y por qué no entró»: por partido, qué se buscó y qué se
 * descartó con su motivo (`dichos-hechos/busqueda.ts`), más los huecos que aún
 * no se han investigado. Plegado por partido para no tapar la lista.
 */
export function DvhSearchLogSection({
  log,
  gaps,
  parties,
  t,
}: {
  log: readonly DvhSearchLog[];
  gaps: readonly string[];
  parties: Party[];
  t: DvhStrings;
}) {
  const partyBy = new Map(parties.map((p) => [p.id, p]));
  // En el orden del dataset, como el recuento por partido.
  const rows = parties.flatMap((p) => log.filter((l) => l.partyId === p.id));
  return (
    <section aria-labelledby="dvh-busqueda" className="space-y-2 rounded-2xl border border-border bg-card p-5 shadow-card">
      <h2 id="dvh-busqueda" className="font-display text-lg font-semibold text-foreground">
        {t.searchLogTitle}
      </h2>
      <p className="text-sm text-muted-foreground">{t.searchLogIntro}</p>
      {/* Plegado: es el registro de trabajo, no lo que viene a ver la mayoría. */}
      <Disclosure summary={t.showSearchLog}>
        <div className="space-y-3">
      <div className="space-y-2">
        {rows.map((l) => {
          const party = partyBy.get(l.partyId);
          if (!party) return null;
          return (
            <details key={l.partyId} className="rounded-lg border border-border bg-background p-3" data-dvh-search={l.partyId}>
              <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
                <PartyAvatar party={party} size={20} />
                {party.name}
                <span className="text-xs font-normal text-muted-foreground">({l.excluded.length})</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.searchLogSearched}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                    {l.searched.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.searchLogExcluded}</p>
                  {l.excluded.length === 0 ? (
                    <p className="mt-1 italic text-muted-foreground">{t.searchLogNoExcluded}</p>
                  ) : (
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {l.excluded.map((x, i) => (
                        <li key={i}>
                          <span className="text-foreground">{x.what}</span>{" "}
                          <span className="text-muted-foreground">{x.why}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      <div className="rounded-lg border border-dashed border-border p-3" data-testid="dvh-known-gaps">
        <p className="text-sm font-medium text-foreground">{t.searchLogGapTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.searchLogGap}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {gaps.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>
        </div>
      </Disclosure>
    </section>
  );
}
