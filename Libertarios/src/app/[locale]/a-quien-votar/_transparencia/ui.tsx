import NextLink from "next/link";
import type {
  Evidence,
  ProgrammeStance,
  Quote,
  RecordStance,
  Source,
  Status,
} from "@/data/afinidad/types";
import { effectivePosition } from "@/lib/afinidad/score";
import { positionLabel, type TransparencyStrings } from "@/i18n/afinidad/transparency";
import { CHANGELOG_URL, JSON_PATH, correctionsMailto, formatPosition, modulePath } from "./links";

/**
 * Piezas compartidas por metodología, datos y fichas de partido (WP8).
 *
 * Están en una carpeta con guion bajo para que el App Router no las trate como
 * ruta. Son componentes de servidor sin estado: las tres páginas se generan
 * estáticas y no necesitan JavaScript en el navegador para enseñar fuentes.
 *
 * Los colores son los tokens del tema (`border-border`, `text-muted-foreground`…)
 * para que el layout del segmento (`.theme-afinidad`, WP6) decida la paleta.
 * A propósito no se usa verde/rojo para «a favor»/«en contra»: un color con
 * carga positiva o negativa sería un juicio sobre la posición.
 */

// ─── Insignias ─────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<Status, string> = {
  verificado: "border-border bg-card text-foreground",
  pendiente: "border-dashed border-border bg-transparent text-muted-foreground",
  "sin-posicion": "border-dashed border-border bg-transparent text-muted-foreground",
  // Discrepancia: se marca con un borde más visible, no con un color de alarma.
  contested: "border-foreground/40 bg-muted text-foreground",
};

export function StatusBadge({ status, t }: { status: Status; t: TransparencyStrings }) {
  return (
    <span
      title={t.statusHelp[status]}
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status]}`}
    >
      {t.status[status]}
    </span>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

/** Cifra compacta de la tabla: posición que puntúa o el estado si no puntúa. */
export function MatrixValue({
  cell,
  label,
  t,
}: {
  cell: ProgrammeStance | RecordStance | null | undefined;
  label: string;
  t: TransparencyStrings;
}) {
  const pos = effectivePosition(cell);
  const text = pos === null ? (cell ? t.status[cell.status] : t.labels.noData) : formatPosition(pos);
  const title = pos === null ? text : `${positionLabel(t, pos)}${cell?.status === "contested" ? ` · ${t.status.contested}` : ""}`;
  return (
    <span className="flex items-baseline gap-1 whitespace-nowrap" title={title}>
      <span className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</span>
      <span
        className={
          pos === null
            ? "text-[11px] italic text-muted-foreground"
            : `font-mono text-sm tabular-nums text-foreground${cell?.status === "contested" ? " underline decoration-dotted" : ""}`
        }
      >
        {text}
      </span>
    </span>
  );
}

// ─── Fuentes ───────────────────────────────────────────────────────────────

export function SourceLink({ source, t }: { source: Source; t: TransparencyStrings }) {
  const when = source.date ?? (source.year ? String(source.year) : undefined);
  return (
    <span className="text-xs text-muted-foreground">
      {t.labels.source}:{" "}
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
        {source.title}
      </a>
      {source.page ? `, ${t.labels.page} ${source.page}` : ""}
      {when ? ` (${when})` : ""}
      {source.archiveUrl ? (
        <>
          {" · "}
          <a href={source.archiveUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {t.labels.archive}
          </a>
        </>
      ) : null}
    </span>
  );
}

function PositionLine({
  cell,
  t,
}: {
  cell: ProgrammeStance | RecordStance;
  t: TransparencyStrings;
}) {
  const scored = effectivePosition(cell);
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <StatusBadge status={cell.status} t={t} />
      {scored !== null ? (
        <span className="text-sm text-foreground">
          <span className="font-mono tabular-nums">{formatPosition(scored)}</span> · {positionLabel(t, scored)}
        </span>
      ) : null}
      <Pill>{t.confidence[cell.confidence]}</Pill>
    </div>
  );
}

/** Lo que dice el programa: posición, cita literal y documento con página. */
export function ProgrammeDetail({ cell, t }: { cell: ProgrammeStance | null; t: TransparencyStrings }) {
  if (!cell) return <p className="text-sm italic text-muted-foreground">{t.labels.noData}</p>;
  const year = cell.source.year ?? (cell.source.date ? Number(cell.source.date.slice(0, 4)) : undefined);
  return (
    <div className="space-y-1.5">
      <PositionLine cell={cell} t={t} />
      {/* Etiqueta visible mientras se usen los programas de 2023 (plan, actualización 2026-10-06). */}
      {year === 2023 ? <p className="text-[11px] text-muted-foreground">{t.labels.programmeYear}</p> : null}
      {cell.status === "contested" && cell.reviewer ? (
        <p className="text-xs text-muted-foreground">
          {formatPosition(cell.position)} / {t.labels.reviewer}: {formatPosition(cell.reviewer.position)} →{" "}
          {t.labels.scoredAs} {formatPosition((cell.position + cell.reviewer.position) / 2)}
        </p>
      ) : null}
      {cell.quote ? (
        <blockquote className="border-l-2 border-border pl-3 text-sm italic leading-relaxed text-foreground">
          «{cell.quote}»
        </blockquote>
      ) : null}
      {cell.source.url ? <SourceLink source={cell.source} t={t} /> : null}
      {cell.note ? <StanceNote note={cell.note} t={t} /> : null}
    </div>
  );
}

/**
 * Nota técnica de una posición. Se escribe y se mantiene solo en castellano
 * (son notas de trabajo sobre la fuente); en los demás idiomas el rótulo lo
 * avisa y el texto lleva `lang="es"` para que el lector de pantalla lo lea bien.
 */
function StanceNote({ note, t }: { note: string; t: TransparencyStrings }) {
  return (
    <p className="text-xs text-muted-foreground">
      {t.labels.stanceNote}: <span lang="es">{note}</span>
    </p>
  );
}

function EvidenceItem({ e, t }: { e: Evidence; t: TransparencyStrings }) {
  const link = (href: string, text: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
      {text}
    </a>
  );
  if (e.kind === "votacion") {
    return (
      <li className="text-xs text-muted-foreground">
        {t.labels.vote}: {link(e.url, e.title)} ({e.date}, {t.labels.legislatureAbbr} {e.legislature}, {t.labels.sessionAbbr} {e.session},{" "}
        {t.labels.numberAbbr} {e.number}) ·{" "}
        {t.labels.voteOf}: <strong className="text-foreground">{t.vote[e.groupVote]}</strong>
      </li>
    );
  }
  if (e.kind === "boe") {
    return (
      <li className="text-xs text-muted-foreground">
        {t.labels.boe}: {link(e.url, `${e.reference} — ${e.title}`)} ({e.date}, {t.boeRole[e.role]})
      </li>
    );
  }
  return (
    <li className="text-xs text-muted-foreground">
      {t.labels.otherChamber} ({e.chamber}): {link(e.url, e.title)} ({e.date}) ·{" "}
      <strong className="text-foreground">{t.vote[e.vote]}</strong>
    </li>
  );
}

/** Lo que votaron: posición derivada y cada votación con su enlace. */
export function RecordDetail({ cell, t }: { cell: RecordStance | null; t: TransparencyStrings }) {
  if (!cell) return <p className="text-sm italic text-muted-foreground">{t.labels.noData}</p>;
  return (
    <div className="space-y-1.5">
      <PositionLine cell={cell} t={t} />
      {cell.evidence.length > 0 ? (
        <ul className="space-y-1">
          {cell.evidence.map((e, i) => (
            <EvidenceItem key={i} e={e} t={t} />
          ))}
        </ul>
      ) : null}
      {cell.note ? <StanceNote note={cell.note} t={t} /> : null}
    </div>
  );
}

/** `context` = a qué pregunta se refiere, cuando la lista no va ya agrupada por pregunta. */
export function QuoteItem({ q, t, context }: { q: Quote; t: TransparencyStrings; context?: string }) {
  return (
    <li className="rounded-xl border border-border bg-background p-3">
      {context ? <p className="mb-1 text-xs text-muted-foreground">{context}</p> : null}
      <blockquote className="text-sm italic leading-relaxed text-foreground">«{q.text}»</blockquote>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {q.speaker}
        {q.role ? `, ${q.role}` : ""} · {q.date}
      </p>
      <div className="mt-1">
        <SourceLink source={q.source} t={t} />
      </div>
      {q.videoUrl ? (
        <p className="mt-1 text-xs text-muted-foreground">
          <a href={q.videoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {t.labels.video}
          </a>
          {q.videoStart ? ` (${q.videoStart})` : ""}
        </p>
      ) : null}
      {q.contrastsWithRecord ? <p className="mt-1 text-xs font-medium text-foreground">{t.labels.contrasts}</p> : null}
    </li>
  );
}

// ─── Marco de página ───────────────────────────────────────────────────────

/** Navegación entre las páginas de transparencia y el JSON. */
export function TransparencyNav({ locale, t }: { locale: string; t: TransparencyStrings }) {
  const cls = "underline underline-offset-2 hover:text-foreground";
  return (
    <nav aria-label={t.appName} className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
      <NextLink href={modulePath(locale, "/metodologia")} className={cls}>
        {t.nav.methodology}
      </NextLink>
      <NextLink href={modulePath(locale, "/datos")} className={cls}>
        {t.nav.data}
      </NextLink>
      <a href={JSON_PATH} className={cls} download="afinidad-datos.json">
        {t.nav.json}
      </a>
      <a href={CHANGELOG_URL} className={cls} target="_blank" rel="noopener noreferrer">
        {t.nav.changelog}
      </a>
      <a href={correctionsMailto(t.correctionsSubject)} className={cls}>
        {t.nav.corrections}
      </a>
    </nav>
  );
}

/** Estado vacío: se dice que faltan datos, no se rellena con ejemplos. */
export function InPreparation({ t }: { t: TransparencyStrings }) {
  return (
    <section role="status" className="rounded-2xl border border-dashed border-border bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">{t.inPreparation.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.inPreparation.body}</p>
    </section>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  // Sin relleno vertical propio: el layout del módulo ya deja sitio a la
  // cabecera fija del sitio (`pt-24`) y pone el contenedor.
  return <div className="mx-auto max-w-5xl space-y-10">{children}</div>;
}

// ─── Rediseño visual ───────────────────────────────────────────────────────

/**
 * Posición de un partido en miniatura: cinco puntos de −2 a +2 con el suyo
 * relleno (con media de una discrepancia, los dos vecinos). Sin dato, un guion
 * con el estado escrito: un hueco no es un 0.
 */
export function PositionScale({
  cell,
  t,
}: {
  cell: ProgrammeStance | RecordStance | null | undefined;
  t: TransparencyStrings;
}) {
  const pos = effectivePosition(cell);
  if (pos === null) {
    return (
      <span className="text-[11px] italic text-muted-foreground">{cell ? t.status[cell.status] : t.labels.noData}</span>
    );
  }
  const on = (p: number) => Math.abs(p - pos) < 0.51;
  return (
    <span className="inline-flex items-center gap-1" title={`${formatPosition(pos)} · ${positionLabel(t, pos)}`}>
      <span className="sr-only">
        {formatPosition(pos)} · {positionLabel(t, pos)}
      </span>
      {[-2, -1, 0, 1, 2].map((p) => (
        <span
          key={p}
          aria-hidden
          className={`rounded-full ${p === 0 ? "h-1.5 w-1.5" : "h-2.5 w-2.5"} ${
            on(p) ? "bg-primary ring-2 ring-primary/25" : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </span>
  );
}

/** Una cifra grande con su rótulo, como las tarjetas de datos del sitio. */
export function StatTile({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center shadow-soft">
      <div className="font-display text-3xl font-bold tabular-nums text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
