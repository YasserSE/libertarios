"use client";

import { useMemo, useState } from "react";
import { Link, useLocale } from "@/i18n/Link";
import { getDictionary } from "@/i18n/getDictionary";
import { LOCALE_META } from "@/i18n/config";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Map as MapIcon, Play, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AffiliateSnapshot, CountrySnapshot } from "@/lib/affiliates/types";
import { EuropeMap } from "./EuropeMap";
import { SpainProvinceMap } from "./SpainProvinceMap";
import { TerritoryRanking, type RankingRow } from "./TerritoryRanking";
import { AffiliateDataTable, type TableRow } from "./AffiliateDataTable";
import { formatPerMillion } from "@/lib/affiliates/format";

export type MapScope = "europe" | "ES";

interface AffiliateMapSectionProps {
  europe: AffiliateSnapshot;
  spain: CountrySnapshot;
  scope: MapScope;
  /** Si el alta está operativa. Gobierna el aviso de cifras de ejemplo. */
  registrationOpen: boolean;
}

const nf = (n: number) => n.toLocaleString("es-ES");
const signed = (n: number) => `${n > 0 ? "+" : ""}${n}`;

/**
 * The map, as the page's hero.
 *
 * One component, two scopes: `/` shows Europe, `/spain` shows the identical
 * page with the map pre-filtered to Spain's provinces. The scope lives in the
 * URL so any view is shareable, and switching it is a client-side navigation.
 *
 * Hero and explorer are rendered together rather than as separate sections
 * because they share the selection: clicking a territory on the map has to
 * light up its row in the ranking below, and vice versa.
 */
export function AffiliateMapSection({
  europe,
  spain,
  scope,
  registrationOpen,
}: AffiliateMapSectionProps) {
  const router = useRouter();
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.hero;
  const m = dict.map;
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "table">("map");
  // Cuarenta y cuatro países en tres columnas empujaban el resto de la home
  // fuera de la pantalla. El mapa ya cuenta la historia; el listado es para
  // quien viene a buscar una cifra concreta.
  const [rankingOpen, setRankingOpen] = useState(false);

  const isSpain = scope === "ES";
  const activeCountries = useMemo(
    () => europe.countries.filter((c) => c.count > 0),
    [europe.countries],
  );

  const headline = isSpain
    ? { total: spain.count, growth: spain.growth30d, position: spain.position }
    : { total: europe.total, growth: europe.growth30d, position: europe.position };

  const territories = isSpain
    ? spain.regions.filter((r) => r.count > 0).length
    : activeCountries.length;

  const rankingRows: RankingRow[] = useMemo(() => {
    if (isSpain) {
      return spain.regions
        .filter((r) => r.count > 0)
        .map((r) => ({
          code: r.code,
          label: r.meta.name,
          sublabel: r.meta.parent,
          count: r.count,
          share: r.share,
        }));
    }
    return activeCountries.map((c) => ({
      code: c.code,
      label: `${c.meta.flag}  ${c.meta.name}`,
      sublabel: `${formatPerMillion(c.perMillion)} por millón hab.`,
      count: c.count,
      share: europe.total > 0 ? c.count / europe.total : 0,
    }));
  }, [isSpain, spain.regions, activeCountries, europe.total]);

  const tableRows: TableRow[] = useMemo(() => {
    if (isSpain) {
      return spain.regions.map((r) => ({
        code: r.code,
        territory: r.meta.name,
        group: r.meta.parent,
        count: r.count,
        share: r.share,
        growth30d: r.growth30d,
      }));
    }
    return activeCountries.map((c) => ({
      code: c.code,
      territory: `${c.meta.flag} ${c.meta.name}`,
      group: `${formatPerMillion(c.perMillion)} / millón`,
      count: c.count,
      share: europe.total > 0 ? c.count / europe.total : 0,
      growth30d: c.growth30d,
    }));
  }, [isSpain, spain.regions, activeCountries, europe.total]);

  const detail = useMemo(() => {
    if (!selected) return null;
    if (isSpain) {
      const r = spain.regions.find((x) => x.code === selected);
      return r
        ? {
            title: r.meta.name,
            subtitle: r.meta.parent,
            count: r.count,
            growth30d: r.growth30d,
            position: r.position,
            secondary: { label: "Del total nacional", value: `${(r.share * 100).toFixed(1)}%` },
            href: null as string | null,
          }
        : null;
    }
    const c = europe.countries.find((x) => x.code === selected);
    return c
      ? {
          title: `${c.meta.flag} ${c.meta.name}`,
          subtitle: `Puesto ${activeCountries.findIndex((x) => x.code === c.code) + 1} de ${activeCountries.length} en Europa`,
          count: c.count,
          growth30d: c.growth30d,
          position: c.position,
          secondary: { label: "Por millón hab.", value: formatPerMillion(c.perMillion) },
          href: `/pais/${c.meta.slug}`,
        }
      : null;
  }, [selected, isSpain, spain.regions, europe.countries, activeCountries]);

  const toggle = (code: string) => setSelected((cur) => (cur === code ? null : code));
  const handleCountrySelect = (code: string) => {
    if (code === "ES") {
      router.push("/spain", { scroll: false });
      return;
    }
    toggle(code);
  };
  const handleRankingSelect = isSpain ? toggle : handleCountrySelect;

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section
        id="mapa"
        className="gradient-hero relative scroll-mt-16 overflow-hidden pb-16 pt-24 lg:pb-24 lg:pt-28"
      >
        {/* Soft field behind the map. Purely atmospheric — no data meaning. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        />

        <div className="container relative">
          {/*
            On mobile the map must not sit below a full screen of copy — the map
            IS the hero. Explicit grid placement keeps one DOM order while the
            phone reads headline → map → actions, and the desktop reads
            headline+actions on the left with the map spanning both rows.
          */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:grid-rows-[1fr_1fr] lg:items-center lg:gap-x-14 lg:gap-y-6">
            {/* Headline */}
            <div className="order-1 lg:col-start-1 lg:row-start-1 lg:self-end">
              {/*
                El aviso se ata al estado real del alta en lugar de escribirse a
                mano: mientras nadie pueda registrarse, las cifras son de ejemplo
                y hay que decirlo donde se leen. En cuanto el registro funcione,
                desaparece solo — sin que nadie tenga que acordarse de quitarlo,
                que es como acaban quedándose los avisos falsos.
              */}
              {registrationOpen ? (
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-primary" />
                  </span>
                  {t.updatedOn}{" "}
                  {new Date(europe.updatedAt).toLocaleDateString(LOCALE_META[locale].htmlLang, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              ) : (
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-amber-500" />
                  </span>
                  {t.demoBadge}
                </p>
              )}

              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
                <span className="block">{t.line1}</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(190 70% 45%) 50%, hsl(var(--primary)) 100%)",
                  }}
                >
                  {t.line2}
                </span>
                <span className="block">{t.line3}</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
{isSpain ? t.subtitleSpain : t.subtitleEurope}
              </p>
            </div>

            {/* Actions and headline figures */}
            <div className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" size="lg" className="group" asChild>
                  <Link href="/registro">
                    {t.ctaRegister}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link href="/cuadrante">
                    <Play />
                    {t.ctaTest}
                  </Link>
                </Button>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-7">
                <Figure
                  value={nf(headline.total)}
                  label={t.statSupporters}
                  hint={isSpain ? t.statSupportersSpain : t.statSupportersEurope}
                />
                <Figure
                  value={`+${nf(headline.growth)}`}
                  label={t.statGrowth}
                  hint={`${((headline.growth / headline.total) * 100).toFixed(1)}% ${t.statGrowthHint}`}
                />
                <Figure
                  value={nf(territories)}
                  label={isSpain ? t.statProvinces : t.statCountries}
                  hint={isSpain ? t.statProvincesHint : t.statCountriesHint}
                />
                <Figure
                  value={signed(headline.position.economic)}
                  label={t.statEconomic}
                  hint={`${t.statSocial} ${signed(headline.position.social)}`}
                />
              </dl>

              <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
{t.disclaimer}
              </p>
            </div>

            {/* Map */}
            <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <ScopeSwitch scope={scope} />
                <ViewToggle view={view} onChange={setView} />
              </div>

              {view === "map" ? (
                isSpain ? (
                  <SpainProvinceMap
                    regions={spain.regions}
                    selected={selected}
                    onSelect={toggle}
                  />
                ) : (
                  <EuropeMap
                    countries={europe.countries}
                    selected={selected}
                    onSelect={handleCountrySelect}
                  />
                )
              ) : (
                <AffiliateDataTable
                  rows={tableRows}
                  groupLabel={isSpain ? "Comunidad" : "Densidad"}
                />
              )}

              <p className="mt-3 text-xs text-muted-foreground">
{isSpain ? m.hintSpain : m.hintEurope}
              </p>

              {detail && <DetailCard {...detail} onClear={() => setSelected(null)} />}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- explorer */}
      <section id="ranking" className="scroll-mt-16 border-y border-border bg-card py-10 lg:py-14">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {isSpain ? m.listTitleSpain : m.listTitleEurope}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {territories} {isSpain ? "provincias" : "países"} con simpatizantes registrados.
                Selecciona cualquiera para resaltarlo en el mapa.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                variant={rankingOpen ? "outline" : "cta"}
                size="sm"
                onClick={() => setRankingOpen((v) => !v)}
                aria-expanded={rankingOpen}
                aria-controls="ranking-listado"
              >
                {rankingOpen ? m.listHide : m.listShow}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${rankingOpen ? "rotate-180" : ""}`}
                />
              </Button>
              {!isSpain && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/spain" scroll={false}>
                    {m.spainDetail}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div
            id="ranking-listado"
            hidden={!rankingOpen}
            className="mt-8 gap-x-8 [column-fill:balance] md:columns-2 xl:columns-3"
          >
            <TerritoryRanking
              rows={rankingRows}
              selected={selected}
              onSelect={handleRankingSelect}
            />
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Cifras agregadas y anónimas. Son datos de ejemplo: ninguna persona se ha registrado
            todavía —{" "}
            <Link href="/proyecto" className="underline underline-offset-4 hover:text-foreground">
              ver metodología
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function Figure({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-display text-2xl font-bold tabular-nums text-foreground lg:text-3xl">
        {value}
      </dd>
      <dd className="text-xs text-muted-foreground">{hint}</dd>
    </div>
  );
}

function ScopeSwitch({ scope }: { scope: MapScope }) {
  const m = getDictionary(useLocale()).map;
  const options: { key: MapScope; label: string; href: string }[] = [
    { key: "europe", label: m.scopeEurope, href: "/" },
    { key: "ES", label: `🇪🇸 ${m.scopeSpain}`, href: "/spain" },
  ];

  return (
    <div
      role="tablist"
      aria-label={m.scopeLabel}
      className="inline-flex rounded-full border border-border bg-background p-1 shadow-soft"
    >
      {options.map((opt) => {
        const active = scope === opt.key;
        return (
          <Link
            key={opt.key}
            href={opt.href}
            scroll={false}
            role="tab"
            aria-selected={active}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: "map" | "table";
  onChange: (v: "map" | "table") => void;
}) {
  const m = getDictionary(useLocale()).map;
  const options = [
    { key: "map" as const, label: m.viewMap, icon: MapIcon },
    { key: "table" as const, label: m.viewTable, icon: Table2 },
  ];
  return (
    <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
      {options.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={view === key}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            view === key
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

function DetailCard({
  title,
  subtitle,
  count,
  growth30d,
  position,
  secondary,
  href,
  onClear,
}: {
  title: string;
  subtitle: string;
  count: number;
  growth30d: number;
  position: { economic: number; social: number };
  secondary: { label: string; value: string };
  href: string | null;
  onClear: () => void;
}) {
  return (
    <div className="animate-scale-in mt-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Quitar selección
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <dt className="text-[11px] text-muted-foreground">Simpatizantes</dt>
          <dd className="font-display text-xl font-bold tabular-nums text-foreground">
            {nf(count)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-muted-foreground">{secondary.label}</dt>
          <dd className="font-display text-xl font-bold tabular-nums text-foreground">
            {secondary.value}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-muted-foreground">Últimos 30 días</dt>
          <dd className="font-display text-xl font-bold tabular-nums text-foreground">
            +{nf(growth30d)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-muted-foreground">Cuadrante medio</dt>
          <dd className="font-display text-xl font-bold tabular-nums text-foreground">
            {signed(position.economic)} / {signed(position.social)}
          </dd>
        </div>
      </dl>

      {href && (
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link href={href} scroll={false}>
            Ver ficha del país
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      )}
    </div>
  );
}
