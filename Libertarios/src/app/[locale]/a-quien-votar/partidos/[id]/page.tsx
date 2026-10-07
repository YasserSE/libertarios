import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { coherence, effectivePosition, getStance } from "@/lib/afinidad/score";
import { entriesForParty } from "@/lib/afinidad/dvh";
import { afinidadMetadata, clip, ogImageUrl, questionCount } from "@/lib/afinidad/meta";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import { fmt, getResultStrings, rowLabel } from "@/i18n/afinidad/result";
import { CountUp } from "@/components/motion/CountUp";
import { PartyAvatar } from "@/components/afinidad/PartyBadge";
import { Disclosure } from "@/components/afinidad/ui";
import { afinidadLang, getTransparencyStrings } from "@/i18n/afinidad/transparency";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { DvhFocus, DvhPartyButton, PartySaidVsDid } from "@/components/afinidad/SaidVsDid";
import {
  InPreparation,
  PageShell,
  PositionScale,
  ProgrammeDetail,
  QuoteItem,
  RecordDetail,
  SourceLink,
  StatTile,
  TransparencyNav,
} from "../../_transparencia/ui";
import {
  formatPct,
  modulePath,
  questionText,
  sortedQuestions,
} from "../../_transparencia/links";

/**
 * Ficha de un partido: por qué está en el test, de dónde sale su historial y
 * cada posición con su fuente. Lo que se ve aquí es exactamente lo que usa el
 * motor; no hay resumen ni descripción del partido, porque describir lo que un
 * partido «es» ya sería tomar partido. Se le describe por lo que dice y vota.
 */

// Una ficha por partido del dataset. Con el dataset vacío no se genera
// ninguna; una visita a cualquier id enseña «en preparación» (ver abajo).
export function generateStaticParams() {
  return baseDataset.parties.map((p) => ({ id: p.id }));
}

/**
 * Con `?dvh=<id>` (el enlace de «Compartir» de una entrada), la vista previa
 * usa la imagen OG de esa entrada en lugar de la genérica. Leer
 * `searchParams` aquí hace la ficha dinámica; la página en sí no lo lee (el
 * resaltado de la entrada se hace en el cliente, `DvhFocus`).
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const t = getTransparencyStrings(locale);
  const seo = getSeoStrings(locale);
  const party = dataset.parties.find((p) => p.id === id);
  const sub = `/partidos/${encodeURIComponent(id)}`;
  const generic = { url: ogImageUrl(locale), alt: seo.ogAlt };
  if (!party) {
    return afinidadMetadata({ locale, sub, title: t.appName, description: fmt(seo.introDescription, { n: questionCount() }), siteName: t.appName, image: generic });
  }
  // Nombre largo → siglas, para que el título quepa en 60 caracteres.
  const longTitle = fmt(seo.partyTitle, { party: party.name });
  const title = longTitle.length <= 60 ? longTitle : fmt(seo.partyTitle, { party: party.short });
  const description = clip(fmt(seo.partyDescription, { party: party.short }), 155);

  const raw = (await searchParams)?.dvh;
  const dvhId = Array.isArray(raw) ? raw[0] : raw;
  const entry = dvhId ? (dataset.saidVsDid ?? []).find((e) => e.id === dvhId && e.partyId === party.id) : undefined;
  // Sin `?dvh=` (o con un id de otro partido): la ficha con la tarjeta genérica.
  // El canonical es siempre la ficha sin parámetros.
  if (!entry) return afinidadMetadata({ locale, sub, title, description, siteName: t.appName, image: generic });

  const dvh = getDvhStrings(locale);
  const ogTitle = clip(`${party.short} · ${dvh.title} · ${entry.topic}`, 90);
  return afinidadMetadata({
    locale,
    sub,
    title,
    description,
    ogTitle,
    ogDescription: clip(entry.did.summary, 155),
    siteName: t.appName,
    image: { url: ogImageUrl(locale, { dvh: entry.id }), alt: ogTitle },
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}

export default async function PartyPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const t = getTransparencyStrings(locale);
  const lang = afinidadLang(locale);

  // Sin datos todavía, un enlace a una ficha no debe dar 404 ni inventar un
  // partido: se dice que los datos están en preparación.
  if (dataset.parties.length === 0) {
    return (
      <PageShell>
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.appName}</p>
          <TransparencyNav locale={locale} t={t} />
        </header>
        <InPreparation t={t} />
      </PageShell>
    );
  }

  const party = dataset.parties.find((p) => p.id === id);
  if (!party) notFound();

  const coh = coherence(party.id, dataset);
  const dvh = getDvhStrings(locale);
  const rt = getResultStrings(locale);
  const questions = sortedQuestions(dataset);
  const quotes = (dataset.quotes ?? []).filter((q) => q.partyId === party.id);
  const deputies = (dataset.deputies ?? []).filter((d) => d.partyId === party.id);
  const questionById = new Map(questions.map((q) => [q.id, q]));
  const stances = questions.map((q) => ({ q, s: getStance(dataset, party.id, q.id) }));
  const withProgramme = stances.filter(({ s }) => effectivePosition(s?.programme) !== null).length;
  const withRecord = stances.filter(({ s }) => effectivePosition(s?.record) !== null).length;
  // Solo las de este partido viajan al cliente.
  const dvhEntries = entriesForParty(dataset.saidVsDid, party.id);
  const dvhCount = dvhEntries.length;

  return (
    <PageShell>
      <header className="space-y-6">
        <NextLink
          href={modulePath(locale, "/datos")}
          className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t.party.back}
        </NextLink>
        {/* Cabecera con el distintivo (siglas sobre su color, nunca el logo). */}
        <div className="flex flex-col items-center gap-3 text-center">
          <PartyAvatar party={party} size={72} />
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{party.name}</h1>
          <p className="text-sm text-muted-foreground">
            {party.short} · {party.scope === "estatal" ? t.party.scopeState : t.party.scopeRegional} ·{" "}
            {t.partyStatus[party.status]}
          </p>
        </div>
        {/* Cuatro cifras en lugar de ocho párrafos. */}
        <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <dt className="sr-only">{t.party.coherence}</dt>
            <dd>
              <StatTile
                value={coh.value === null ? "—" : <CountUp value={Math.round(coh.value * 100)} suffix={" %"} />}
                label={t.party.coherence}
              />
            </dd>
          </div>
          <div>
            <dt className="sr-only">{t.party.statProgramme}</dt>
            <dd>
              <StatTile value={`${withProgramme}/${questions.length}`} label={t.party.statProgramme} />
            </dd>
          </div>
          <div>
            <dt className="sr-only">{t.party.statRecord}</dt>
            <dd>
              <StatTile value={`${withRecord}/${questions.length}`} label={t.party.statRecord} />
            </dd>
          </div>
          <div>
            <dt className="sr-only">{t.party.statDvh}</dt>
            <dd>
              <StatTile value={dvhCount} label={t.party.statDvh} />
            </dd>
          </div>
        </dl>
        {/* Botón hacia sus entradas en «Dijeron vs. hicieron» (petición del
            dueño); la sección completa sigue más abajo. */}
        {dvhCount > 0 && (
          <div className="flex justify-center">
            <DvhPartyButton party={party} label={fmt(dvh.partyButton, { party: party.short })} lang={locale} />
          </div>
        )}
      </header>

      {/* La ficha completa —inclusión, grupo, gobierno, bloque, cómo se
          calcula la coherencia—, plegada: está, pero no delante. */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <Disclosure summary={t.party.profile}>
          <dl className="grid gap-3 sm:grid-cols-2">
            <Field label={t.party.inclusion}>
              <p>{party.inclusionReason}</p>
              <p className="mt-1">
                <SourceLink source={party.inclusionSource} t={t} />
              </p>
            </Field>
            <Field label={t.party.status}>{t.partyStatus[party.status]}</Field>
            <Field label={t.party.scope}>
              {party.scope === "estatal" ? t.party.scopeState : t.party.scopeRegional}
              {party.regions?.length ? ` (INE: ${party.regions.join(", ")})` : ""}
            </Field>
            <Field label={t.party.parliamentary}>
              {party.parliamentary ? t.party.parliamentaryYes : t.party.parliamentaryNo}
              {party.congressGroup ? ` · ${t.party.group}: ${party.congressGroup}` : ""}
            </Field>
            <Field label={t.party.recordNote}>
              {party.recordNote ?? (party.parliamentary ? (party.congressGroup ? `${t.party.group}: ${party.congressGroup}` : "—") : t.party.noRecord)}
            </Field>
            {party.inGovernment?.length ? (
              <Field label={t.party.government}>
                {party.inGovernment.map((g) => `${g.from} → ${g.to ?? "…"}`).join("; ")}
              </Field>
            ) : null}
            <Field label={t.party.coherence}>
              {coh.value === null ? (
                <span className="text-muted-foreground">{t.party.coherenceNone}</span>
              ) : (
                <>
                  <span className="font-mono tabular-nums">{formatPct(coh.value)}</span>{" "}
                  <span className="text-muted-foreground">({coh.items})</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{t.party.coherenceHelp}</span>
                </>
              )}
            </Field>
            <Field label={t.party.blocNote}>{t.bloc[party.bloc]}</Field>
          </dl>
        </Disclosure>
      </section>

      {/* Posiciones como rejilla de puntos: una fila por afirmación y dos
          columnas (programa, votos). Cada fila se abre con la cita y la
          votación. */}
      <section aria-labelledby="posiciones" className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 id="posiciones" className="font-display text-lg font-semibold text-foreground">
          {t.party.positions}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.party.positionsHelp}</p>
        {questions.length === 0 ? (
          <InPreparation t={t} />
        ) : (
          <div className="mt-4">
            <div aria-hidden className="grid grid-cols-[1fr_5.5rem_5.5rem] gap-2 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span />
              <span className="text-center">{t.lens.programme}</span>
              <span className="text-center">{t.lens.record}</span>
            </div>
            <ul className="divide-y divide-border">
              {stances.map(({ q, s }) => (
                <li key={q.id} id={q.id}>
                  <details className="group">
                    <summary className="grid min-h-11 cursor-pointer list-none grid-cols-[1fr_5.5rem_5.5rem] items-center gap-2 py-2 [&::-webkit-details-marker]:hidden">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="w-4 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{q.order}</span>
                        <span className="min-w-0 truncate text-sm font-medium text-foreground" title={questionText(q, lang)}>
                          {rowLabel(rt, q, lang)}
                        </span>
                      </span>
                      <span className="flex justify-center">
                        <span className="sr-only">{t.lens.programme}: </span>
                        <PositionScale cell={s?.programme} t={t} />
                      </span>
                      <span className="flex justify-center">
                        <span className="sr-only">{t.lens.record}: </span>
                        <PositionScale cell={s?.record} t={t} />
                      </span>
                    </summary>
                    <div className="space-y-3 pb-4 pl-6">
                      <p className="text-sm text-foreground">{questionText(q, lang)}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {t.lens.programme}
                          </p>
                          <ProgrammeDetail cell={s?.programme ?? null} t={t} />
                        </div>
                        <div>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {t.lens.record}
                          </p>
                          <RecordDetail cell={s?.record ?? null} t={t} />
                        </div>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby="hemeroteca" className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 id="hemeroteca" className="font-display text-lg font-semibold text-foreground">
          {t.party.quotes} <span className="text-sm font-normal tabular-nums text-muted-foreground">({quotes.length})</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.party.quotesHelp}</p>
        {quotes.length === 0 ? (
          <p className="mt-2 text-sm italic text-muted-foreground">{t.party.noQuotes}</p>
        ) : (
          <Disclosure summary={t.party.seeQuotes}>
            <ul className="space-y-2">
              {quotes.map((x, i) => {
                const q = questionById.get(x.questionId);
                return (
                  <QuoteItem key={i} q={x} t={t} context={q ? `${t.labels.question} ${q.order}: ${rowLabel(rt, q, lang)}` : undefined} />
                );
              })}
            </ul>
          </Disclosure>
        )}
      </section>

      {/* «Dijeron vs. hicieron» de este partido. Cada entrada tiene su ancla
          (`#dvh-<id>`): es el destino del botón «Compartir» de la entrada;
          con `?dvh=<id>`, `DvhFocus` la resalta y le abre el detalle. */}
      <section aria-labelledby="dijeron-vs-hicieron" className="space-y-3">
        <h2 id="dijeron-vs-hicieron" className="scroll-mt-24 font-display text-xl font-semibold text-foreground">
          {dvh.title}
        </h2>
        <p className="text-sm text-muted-foreground">{dvh.partySectionHelp}</p>
        <PartySaidVsDid party={party} entries={dvhEntries} t={dvh} lang={locale} />
        <DvhFocus />
      </section>

      {deputies.length > 0 ? (
        <section aria-labelledby="diputados" className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 id="diputados" className="font-display text-lg font-semibold text-foreground">
            {t.party.deputies}
          </h2>
          <Disclosure summary={`${deputies.length}`}>
            <ul className="space-y-1 text-sm text-foreground">
              {deputies.map((d) => (
                <li key={`${d.deputy}-${d.from}`}>
                  {d.deputy} · {d.group} · {t.labels.legislatureAbbr} {d.legislature} · {d.from} → {d.to ?? "…"} ·{" "}
                  <SourceLink source={d.source} t={t} />
                </li>
              ))}
            </ul>
          </Disclosure>
        </section>
      ) : null}
    </PageShell>
  );
}
