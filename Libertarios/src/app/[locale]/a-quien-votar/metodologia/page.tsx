import type { Metadata } from "next";
import { afinidadMetadata, ogImageUrl } from "@/lib/afinidad/meta";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import { Fragment, type ReactNode } from "react";
import NextLink from "next/link";
import { dataset as baseDataset } from "@/data/afinidad";
import { localizeDataset } from "@/lib/afinidad/localize";
import { DATASET_VERSION, type Party } from "@/data/afinidad/types";
import {
  MIN_LENS_ITEMS,
  SHRINK_K,
  SHRINK_PRIOR,
  shrunkMean,
  IMPORTANT_WEIGHT,
  MAX_DISTANCE,
  MIN_ANSWERS,
  NEUTRAL_PARTY_AGREEMENT,
  agreement,
} from "@/lib/afinidad/score";
import { MAX_HEMEROTECA_WORDS, MAX_QUOTE_WORDS } from "@/lib/afinidad/schema";
import {
  BLOC_COVERAGE_TOLERANCE,
  DOMINANCE_MAX_SHARE,
  DOMINANCE_MIN_SHARE,
  DOMINANCE_USERS,
  ITEM_MIN_PER_SIDE,
  PERFECT_VOTER_MIN_SCORE,
  RESPONSE_STYLE_MAX_GAP,
} from "@/lib/afinidad/checks";
import { getTransparencyStrings } from "@/i18n/afinidad/transparency";
import { getDvhStrings } from "@/i18n/afinidad/dvh";
import { getMethodologyStrings } from "@/i18n/afinidad/methodology";
import { fmt } from "@/i18n/afinidad/result";
import { DvhCriteria } from "@/components/afinidad/SaidVsDid";
import { countVerdicts } from "@/lib/afinidad/dvh";
import {
  PageShell,
  TransparencyNav,
} from "../_transparencia/ui";
import {
  CHANGELOG_URL,
  CODING_RULES_URL,
  CORRECTIONS_EMAIL,
  CORRECTIONS_MAILTO,
  JSON_PATH,
  REPO_URL,
  formatPct,
  formatPosition,
  modulePath,
  repoFile,
} from "../_transparencia/links";

/**
 * Metodología de «¿A quién votar? Objetivamente».
 *
 * Todas las cifras del método (umbral de cobertura, mínimo de respuestas, peso
 * de «Esto me importa», la fórmula del acuerdo) se importan del motor
 * (`score.ts`) y del esquema (`schema.ts`), y el ejemplo numérico se calcula
 * con la misma función `agreement()` que usa el resultado. Así el texto no
 * puede decir una cosa mientras el código hace otra: si alguien cambia una
 * constante, esta página cambia con ella y el test de transparencia lo vigila.
 *
 * La prosa vive en `src/i18n/afinidad/methodology.ts` (es, ca, gl, eu), con un
 * marcado mínimo (`{clave}`, `**negrita**`, `[enlace](clave)`) que interpreta
 * `rich()`: las cifras las pone siempre esta página desde las constantes.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTransparencyStrings(locale);
  return afinidadMetadata({
    locale,
    sub: "/metodologia",
    title: `${t.methodology.title} — ${t.appName}`,
    description: getMethodologyStrings(locale).metaDescription,
    siteName: t.appName,
    image: { url: ogImageUrl(locale), alt: getSeoStrings(locale).ogAlt },
  });
}

// ─── Ejemplo numérico ──────────────────────────────────────────────────────

/** La métrica que se descartó, para comparar. Solo ilustra; el motor no la usa. */
const oldAgreement = (u: number, p: number) => 1 - Math.abs(u - p) / MAX_DISTANCE;

type Row = { n: number; u: number; important: boolean; p: number };

/** Media ponderada con los pesos del motor. */
function weighted(rows: Row[], f: (u: number, p: number) => number) {
  const w = (r: Row) => (r.important ? IMPORTANT_WEIGHT : 1);
  const num = rows.reduce((s, r) => s + w(r) * f(r.u, r.p), 0);
  const den = rows.reduce((s, r) => s + w(r), 0);
  return num / den;
}

// Una persona con tres respuestas frente a un partido ficticio.
const WORKED: Row[] = [
  { n: 1, u: 2, important: true, p: 1 },
  { n: 2, u: -1, important: false, p: 2 },
  { n: 3, u: 1, important: false, p: 0 },
];

// Por qué la métrica es direccional: una persona moderada (+1, −1) frente a
// tres partidos ficticios. Con la métrica antigua, el partido que no se moja
// empata con el que coincide con ella en las dos preguntas. Los nombres, en el
// mismo orden, están en `directional.contrast` de los textos.
const MODERATE = [1, -1];
const CONTRAST: number[][] = [
  [0, 0],
  [2, 2],
  [2, -2],
];
const asRows = (ps: number[]): Row[] => ps.map((p, i) => ({ n: i + 1, u: MODERATE[i], important: false, p }));

const pct = formatPct;
const num = (x: number) => x.toLocaleString("es-ES", { maximumFractionDigits: 3 });

/** El P-LIB se busca por sus identificadores habituales; no tiene trato propio. */
const isPLib = (p: Party) =>
  /^p-?lib$/i.test(p.id) || p.short.toUpperCase() === "P-LIB" || /partido libertario/i.test(p.name);

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

const ext = "underline underline-offset-2 hover:text-foreground";

/**
 * Interpreta el marcado de `methodology.ts`: `**negrita**` (puede llevar
 * `{clave}` dentro), `[texto](clave)` → `links[clave](texto)` y `{clave}` →
 * `nodes[clave]`. Lo que no se reconoce se deja tal cual.
 */
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\((\w+)\)|\{(\w+)\}/g;
type Links = Record<string, (text: string) => ReactNode>;
function rich(tpl: string, nodes: Record<string, ReactNode> = {}, links: Links = {}): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of Array.from(tpl.matchAll(TOKEN))) {
    if (m.index > last) out.push(tpl.slice(last, m.index));
    const key = `r${i++}`;
    if (m[1] !== undefined) out.push(<strong key={key}>{rich(m[1], nodes, links)}</strong>);
    else if (m[2] !== undefined) out.push(<Fragment key={key}>{links[m[3]] ? links[m[3]](m[2]) : m[2]}</Fragment>);
    else out.push(<Fragment key={key}>{m[4] in nodes ? nodes[m[4]] : m[0]}</Fragment>);
    last = m.index + m[0].length;
  }
  if (last < tpl.length) out.push(tpl.slice(last));
  return out;
}

/** Enlace externo en pestaña nueva, para `rich()`. */
const extLink = (href: string) => (text: string) => (
  <a href={href} className={ext} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);
const repoLink = (path: string) => extLink(repoFile(path));

export default async function MetodologiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dataset = localizeDataset(baseDataset, locale);
  const t = getTransparencyStrings(locale);
  const m = getMethodologyStrings(locale);
  const parties = dataset.parties;
  const plib = parties.find(isPLib);
  const workedWeights0 = WORKED.reduce((s, r) => s + (r.important ? IMPORTANT_WEIGHT : 1), 0);
  const workedScore = shrunkMean(weighted(WORKED, agreement) * workedWeights0, workedWeights0);
  const dvh = getDvhStrings(locale);
  const dvhCounts = countVerdicts(dataset.saidVsDid ?? []);
  const workedWeights = workedWeights0;

  return (
    <PageShell>
      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.appName}</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t.methodology.title}
        </h1>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">{m.intro}</p>
        <TransparencyNav locale={locale} t={t} />
        <p className="text-xs text-muted-foreground">
          {t.labels.version}: <code className="font-mono">{dataset.version}</code>
          {dataset.version !== DATASET_VERSION ? (
            <>
              {" "}
              ({m.schema} <code className="font-mono">{DATASET_VERSION}</code>)
            </>
          ) : null}
        </p>
      </header>

      <div className="space-y-12 leading-relaxed text-muted-foreground [&_strong]:text-foreground">
        {/* ── Quién ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="quien" className="space-y-3">
          <H2 id="quien">{m.who.h}</H2>
          <p>{rich(m.who.p1)}</p>
          <p>{m.who.p2}</p>
          <ul className="list-disc space-y-1 pl-5">
            {m.who.items.map((item, i) => (
              <li key={i}>
                {rich(item, {}, {
                  data: (text) => (
                    <NextLink href={modulePath(locale, "/datos")} className={ext}>
                      {text}
                    </NextLink>
                  ),
                  json: (text) => (
                    <a href={JSON_PATH} className={ext}>
                      {text}
                    </a>
                  ),
                  repo: extLink(REPO_URL),
                })}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Partidos ──────────────────────────────────────────────────── */}
        <section aria-labelledby="partidos" className="space-y-3">
          <H2 id="partidos">{m.parties.h}</H2>
          <p>{m.parties.intro}</p>
          <ol className="list-decimal space-y-1 pl-5">
            {m.parties.conditions.map((c, i) => (
              <li key={i}>{rich(c)}</li>
            ))}
          </ol>
          <p>
            {rich(m.parties.plibRule)}{" "}
            {parties.length === 0
              ? m.parties.plibPending
              : plib
                ? fmt(m.parties.plibIncluded, { reason: plib.inclusionReason })
                : m.parties.plibExcluded}
          </p>
          <p>{m.parties.noSeat}</p>
          <p>{m.parties.bloc}</p>
          {parties.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {parties.map((p) => (
                <li key={p.id}>
                  <NextLink href={modulePath(locale, `/partidos/${p.id}`)} className={`font-medium text-foreground ${ext}`}>
                    {p.name}
                  </NextLink>
                  : {p.inclusionReason}
                  {p.status === "por-confirmar" ? ` (${t.partyStatus["por-confirmar"].toLowerCase()})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic">{t.inPreparation.title}.</p>
          )}
        </section>

        {/* ── Capas ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="capas" className="space-y-3">
          <H2 id="capas">{m.layers.h}</H2>
          <dl className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4">
              <dt className="font-semibold text-foreground">{m.layers.programmeTitle}</dt>
              <dd className="mt-1 text-sm">{rich(m.layers.programmeBody, { maxQuote: MAX_QUOTE_WORDS })}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <dt className="font-semibold text-foreground">{m.layers.factsTitle}</dt>
              <dd className="mt-1 text-sm">{rich(m.layers.factsBody)}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <dt className="font-semibold text-foreground">{m.layers.hemerotecaTitle}</dt>
              <dd className="mt-1 text-sm">{rich(m.layers.hemerotecaBody, { maxWords: MAX_HEMEROTECA_WORDS })}</dd>
            </div>
          </dl>
          <p>{rich(m.layers.separate)}</p>
        </section>

        {/* ── Dijeron vs. hicieron ───────────────────────────────────────── */}
        <section aria-labelledby="dijeron-vs-hicieron" className="space-y-3">
          <H2 id="dijeron-vs-hicieron">{m.dvh.h}</H2>
          <p>{rich(m.dvh.p1, { maxWords: MAX_HEMEROTECA_WORDS })}</p>
          <DvhCriteria t={dvh} maxWords={MAX_HEMEROTECA_WORDS} />
          <p>
            {rich(m.dvh.verdicts, {
              total: <strong data-testid="dvh-total">{dvhCounts.total}</strong>,
              cumple: dvhCounts.cumple,
              contradice: dvhCounts.contradice,
              parcial: dvhCounts.parcial,
              noHecho: dvhCounts["no-hecho"],
            })}
          </p>
          <p>{rich(m.dvh.said)}</p>
          <p>{rich(m.dvh.sources)}</p>
          <p>{rich(m.dvh.counts)}</p>
          <p>
            {rich(m.dvh.seeAll, {}, {
              all: (text) => (
                <NextLink href={modulePath(locale, "/dijeron-vs-hicieron")} className={ext}>
                  {text}
                </NextLink>
              ),
            })}
          </p>
        </section>

        {/* ── Codificación ──────────────────────────────────────────────── */}
        <section aria-labelledby="codificacion" className="space-y-3">
          <H2 id="codificacion">{m.coding.h}</H2>
          <p>{rich(m.coding.p1, {}, { rules: extLink(CODING_RULES_URL) })}</p>
          <p>{m.coding.scaleIntro}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="py-2 pr-4">{m.coding.thValue}</th>
                  <th className="py-2">{m.coding.thMeaning}</th>
                </tr>
              </thead>
              <tbody>
                {(["+2", "+1", "0", "−1", "−2"] as const).map((v, i) => (
                  <tr key={v} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 font-mono text-foreground">{v}</td>
                    <td className="py-2">{m.coding.scale[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="list-disc space-y-1 pl-5">
            {m.coding.rules.map((r, i) => (
              <li key={i}>{rich(r)}</li>
            ))}
          </ul>
        </section>

        {/* ── Cálculo ───────────────────────────────────────────────────── */}
        <section aria-labelledby="calculo" className="space-y-3">
          <H2 id="calculo">{m.calc.h}</H2>
          <p>{m.calc.answers}</p>
          <p>{m.calc.perQuestion}</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{rich(m.calc.same, { den: 2 * MAX_DISTANCE, min: num(agreement(2, 1)) })}</li>
            <li>{rich(m.calc.opposite, { value: num(agreement(2, -2)) })}</li>
            <li>{rich(m.calc.neutral, { value: num(NEUTRAL_PARTY_AGREEMENT) })}</li>
          </ul>
          <p>{rich(m.calc.weighted, { weight: IMPORTANT_WEIGHT })}</p>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="font-semibold text-foreground">{m.calc.exampleTitle}</p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground">
                    <th className="py-2 pr-3"></th>
                    <th className="py-2 pr-3">{m.calc.thAnswer}</th>
                    <th className="py-2 pr-3">{m.calc.thParty}</th>
                    <th className="py-2 pr-3">{m.calc.thAgreement}</th>
                    <th className="py-2">{m.calc.thWeight}</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKED.map((r) => (
                    <tr key={r.n} className="border-b border-border last:border-0">
                      <td className="py-2 pr-3">{fmt(m.calc.question, { n: r.n })}</td>
                      <td className="py-2 pr-3 font-mono">
                        {formatPosition(r.u)}
                        {r.important ? ` ${m.calc.important}` : ""}
                      </td>
                      <td className="py-2 pr-3 font-mono">{formatPosition(r.p)}</td>
                      <td className="py-2 pr-3 font-mono" data-testid="worked-agreement">
                        {num(agreement(r.u, r.p))}
                      </td>
                      <td className="py-2 font-mono">×{r.important ? IMPORTANT_WEIGHT : 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm">
              {rich(m.calc.formula, {
                terms: WORKED.map((r) => `${r.important ? IMPORTANT_WEIGHT : 1} × ${num(agreement(r.u, r.p))}`).join(" + "),
                k: SHRINK_K,
                prior: num(SHRINK_PRIOR),
                weights: workedWeights,
                score: <strong data-testid="worked-score">{pct(workedScore)}</strong>,
              })}
            </p>
          </div>

          <p>
            {rich(m.calc.shrink, {
              kStrong: <strong data-testid="shrink-k">{SHRINK_K}</strong>,
              k: SHRINK_K,
              prior: num(SHRINK_PRIOR),
              priorPct: pct(SHRINK_PRIOR),
              min: MIN_LENS_ITEMS,
              five: <strong data-testid="shrink-five">{pct(shrunkMean(MIN_LENS_ITEMS, MIN_LENS_ITEMS))}</strong>,
              fifteen: <strong data-testid="shrink-fifteen">{pct(shrunkMean(15, 15))}</strong>,
            })}
          </p>

          <p>
            {rich(m.calc.coverage, {
              coverage: <strong data-testid="coverage">{MIN_LENS_ITEMS}</strong>,
              min: MIN_LENS_ITEMS,
              minAnswers: <strong data-testid="min-answers">{MIN_ANSWERS}</strong>,
            })}
          </p>
          <p>{m.calc.order}</p>
          <p>{rich(m.calc.consistency, { max: MAX_DISTANCE })}</p>
        </section>

        {/* ── Por qué direccional ───────────────────────────────────────── */}
        <section aria-labelledby="direccional" className="space-y-3">
          <H2 id="direccional">{m.directional.h}</H2>
          <p>{rich(m.directional.p1, { max: MAX_DISTANCE })}</p>
          <p>{m.directional.example}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="py-2 pr-3">{m.directional.thParty}</th>
                  <th className="py-2 pr-3">{m.directional.thPositions}</th>
                  <th className="py-2 pr-3">{m.directional.thOld}</th>
                  <th className="py-2">{m.directional.thUsed}</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST.map((positions, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3">{m.directional.contrast[i]}</td>
                    <td className="py-2 pr-3 font-mono">{positions.map(formatPosition).join(", ")}</td>
                    <td className="py-2 pr-3 font-mono">{pct(weighted(asRows(positions), oldAgreement))}</td>
                    <td className="py-2 font-mono">{pct(weighted(asRows(positions), agreement))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>{m.directional.p2}</p>
        </section>

        {/* ── Programas 2023 ────────────────────────────────────────────── */}
        <section aria-labelledby="programas" className="space-y-3">
          <H2 id="programas">{m.programmes.h}</H2>
          <p>{rich(m.programmes.p, { label: t.labels.programmeYear })}</p>
        </section>

        {/* ── Lo que no se mide ─────────────────────────────────────────── */}
        <section aria-labelledby="no-medido" className="space-y-3">
          <H2 id="no-medido">{m.notMeasured.h}</H2>
          <ul className="list-disc space-y-1 pl-5">
            {m.notMeasured.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ── Pruebas ───────────────────────────────────────────────────── */}
        <section aria-labelledby="pruebas" className="space-y-3">
          <H2 id="pruebas">{m.tests.h}</H2>
          <p>
            {rich(
              m.tests.intro,
              { npmTest: <code className="font-mono">npm test</code> },
              {
                checks: repoLink("src/lib/afinidad/checks.ts"),
                scoreTest: repoLink("src/test/afinidad-score.test.ts"),
                datasetTest: repoLink("src/test/afinidad-dataset.test.ts"),
              },
            )}
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            {m.tests.items.map((item, i) => (
              <li key={i}>
                {rich(item, {
                  score: pct(PERFECT_VOTER_MIN_SCORE),
                  gap: <span data-testid="style-gap">{Math.round(RESPONSE_STYLE_MAX_GAP * 100)}</span>,
                  n: ITEM_MIN_PER_SIDE,
                  tolerance: Math.round(BLOC_COVERAGE_TOLERANCE * 100),
                  users: DOMINANCE_USERS.toLocaleString("es-ES"),
                  maxShare: <span data-testid="dominance-max">{formatPct(DOMINANCE_MAX_SHARE)}</span>,
                  minShare: <span data-testid="dominance-min">{formatPct(DOMINANCE_MIN_SHARE)}</span>,
                  lens: MIN_LENS_ITEMS,
                })}
              </li>
            ))}
          </ol>
          <p>{m.tests.outro}</p>
        </section>

        {/* ── Registro de uso ───────────────────────────────────────────── */}
        <section aria-labelledby="uso" className="space-y-3">
          <H2 id="uso">{m.usage.h}</H2>
          <p>{rich(m.usage.p)}</p>
        </section>

        {/* ── LOREG ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="loreg" className="space-y-3">
          <H2 id="loreg">{m.loreg.h}</H2>
          <p>{rich(m.loreg.p)}</p>
        </section>

        {/* ── Versión y correcciones ────────────────────────────────────── */}
        <section aria-labelledby="version" className="space-y-3">
          <H2 id="version">{m.version.h}</H2>
          <p>
            {rich(
              m.version.current,
              { version: <code className="font-mono text-foreground">{dataset.version}</code> },
              { changelog: extLink(CHANGELOG_URL) },
            )}
          </p>
          <p>
            {rich(m.version.corrections, {
              email: (
                <a href={CORRECTIONS_MAILTO} className={ext}>
                  {CORRECTIONS_EMAIL}
                </a>
              ),
            })}
          </p>
        </section>
      </div>
    </PageShell>
  );
}
