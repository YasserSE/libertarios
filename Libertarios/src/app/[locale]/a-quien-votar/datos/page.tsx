import type { Metadata } from "next";
import { afinidadMetadata, clip, ogImageUrl } from "@/lib/afinidad/meta";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import NextLink from "next/link";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import type { Status } from "@/data/afinidad/types";
import { getStance } from "@/lib/afinidad/score";
import { afinidadLang, getTransparencyStrings } from "@/i18n/afinidad/transparency";
import { getResultStrings, topicLabel } from "@/i18n/afinidad/result";
import {
  InPreparation,
  MatrixValue,
  PageShell,
  ProgrammeDetail,
  QuoteItem,
  RecordDetail,
  StatusBadge,
  TransparencyNav,
} from "../_transparencia/ui";
import {
  JSON_PATH,
  LICENSE_URL,
  isEmptyDataset,
  modulePath,
  questionText,
  sortedQuestions,
} from "../_transparencia/links";

/**
 * Datos abiertos navegables: cada celda partido×pregunta con su cita, su
 * votación y su estado. Es la página que permite comprobar el resultado sin
 * fiarse de nosotros, por eso enseña los huecos (pendiente, sin posición) y
 * las discrepancias tal cual, en vez de esconderlos.
 *
 * Dos vistas sobre los mismos datos: una tabla compacta para recorrer de un
 * vistazo y, debajo, el detalle por pregunta con todas las fuentes. Meter citas
 * de 60 palabras en una tabla de 15 × 15 la haría ilegible.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTransparencyStrings(locale);
  return afinidadMetadata({
    locale,
    sub: "/datos",
    title: `${t.data.title} — ${t.appName}`,
    description: clip(t.data.intro, 155),
    siteName: t.appName,
    image: { url: ogImageUrl(locale), alt: getSeoStrings(locale).ogAlt },
  });
}

const STATUSES: Status[] = ["verificado", "contested", "pendiente", "sin-posicion"];

export default async function DatosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const t = getTransparencyStrings(locale);
  const rt = getResultStrings(locale);
  const lang = afinidadLang(locale);
  const empty = isEmptyDataset(dataset);
  const questions = sortedQuestions(dataset);
  const parties = dataset.parties;
  const quotes = dataset.quotes ?? [];

  return (
    <PageShell>
      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.appName}</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t.data.title}</h1>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">{t.data.intro}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={JSON_PATH}
            download="afinidad-datos.json"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 font-medium text-foreground hover:bg-muted"
          >
            {t.data.download}
          </a>
          <span className="text-muted-foreground">
            <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {t.data.license}
            </a>{" "}
            · {t.labels.version}: <code className="font-mono">{dataset.version}</code>
          </span>
        </div>
        <TransparencyNav locale={locale} t={t} />
      </header>

      {empty ? (
        <InPreparation t={t} />
      ) : (
        <>
          <section aria-labelledby="leyenda" className="space-y-2">
            <h2 id="leyenda" className="text-sm font-semibold text-foreground">
              {t.data.legend}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {STATUSES.map((s) => (
                <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <StatusBadge status={s} t={t} />
                  <span>{t.statusHelp[s]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tabla" className="space-y-3">
            <h2 id="tabla" className="font-display text-xl font-semibold text-foreground">
              {t.data.matrixTitle}
            </h2>
            <p className="text-sm text-muted-foreground">{t.data.matrixHelp}</p>
            {/* La tabla se desplaza dentro de su caja: en móvil no debe empujar la página en horizontal. */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{t.data.matrixTitle}</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="sticky left-0 bg-card p-3 text-xs font-semibold text-muted-foreground">
                      {t.labels.question}
                    </th>
                    {parties.map((p) => (
                      <th key={p.id} scope="col" className="p-3 text-xs font-semibold text-foreground">
                        <NextLink
                          href={modulePath(locale, `/partidos/${p.id}`)}
                          className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
                          title={p.name}
                        >
                          <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                          {p.short}
                        </NextLink>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id} className="border-b border-border last:border-0 align-top">
                      <th scope="row" className="sticky left-0 max-w-[14rem] bg-card p-3 text-xs font-medium text-foreground">
                        <a href={`#${q.id}`} className="underline-offset-2 hover:underline">
                          {q.order}. {topicLabel(rt, q.topic)}
                        </a>
                      </th>
                      {parties.map((p) => {
                        const s = getStance(dataset, p.id, q.id);
                        return (
                          <td key={p.id} className="p-3">
                            <div className="flex flex-col gap-0.5">
                              <MatrixValue cell={s?.programme} label={t.labels.matrixProgramme} t={t} />
                              <MatrixValue cell={s?.record} label={t.labels.matrixRecord} t={t} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="detalle" className="space-y-6">
            <h2 id="detalle" className="font-display text-xl font-semibold text-foreground">
              {t.data.detailTitle}
            </h2>
            {questions.map((q) => (
              <article key={q.id} id={q.id} className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 [overflow-wrap:anywhere] lg:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {q.order}. {topicLabel(rt, q.topic)}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{questionText(q, lang)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{q.rationale}</p>
                {q.anchors.length > 0 ? (
                  <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                    {q.anchors.map((a) => (
                      <li key={a.url}>
                        {t.labels.vote}:{" "}
                        <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                          {a.title}
                        </a>{" "}
                        ({a.date}) · {t.labels.agreeMeans.replace("{vote}", t.vote[a.agreeMeans])}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 divide-y divide-border">
                  {parties.map((p) => {
                    const s = getStance(dataset, p.id, q.id);
                    const pq = quotes.filter((x) => x.partyId === p.id && x.questionId === q.id);
                    return (
                      <div key={p.id} className="grid gap-3 py-4 md:grid-cols-[10rem_1fr_1fr]">
                        <NextLink
                          href={modulePath(locale, `/partidos/${p.id}`)}
                          className="flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-2 hover:underline"
                        >
                          <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
                          {p.name}
                        </NextLink>
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
                          {pq.length > 0 ? (
                            <div className="mt-3">
                              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                {t.lens.hemeroteca}
                              </p>
                              <ul className="space-y-2">
                                {pq.map((x, i) => (
                                  <QuoteItem key={i} q={x} t={t} />
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </PageShell>
  );
}
