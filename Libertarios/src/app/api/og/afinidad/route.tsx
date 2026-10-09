import { ImageResponse } from "next/og";
import { INSTAGRAM_HANDLE } from "@/lib/social";
import type { ReactNode } from "react";
import { dataset as baseDataset } from "@/data/afinidad";
import type { Dataset, Party } from "@/data/afinidad/types";
import { localizeDataset } from "@/lib/afinidad/localize";
import { computeAffinity, effectivePosition, surprise, type PartyAffinity } from "@/lib/afinidad/score";
import { decodeResultParams } from "@/lib/afinidad/encode";
import { visiblePartyIds } from "@/lib/afinidad/select";
import { fmt, formatDate, getResultStrings, measureLabel, pct, topicLabel, type ResultStrings } from "@/i18n/afinidad/result";
import { getDvhStrings, type DvhStrings } from "@/i18n/afinidad/dvh";
import { snippet } from "@/lib/afinidad/dvh";
import { getSeoStrings, type SeoStrings } from "@/i18n/afinidad/seo";

/**
 * Imagen OG de «¿A quién votar? Objetivamente» (1200×630).
 *
 * - Sin parámetros, o con `anon=1`: tarjeta genérica (titular, cuatro promesas
 *   e ilustración de la mano y la urna). Es la
 *   que acompaña a «compartir sin decir mi partido» y a la portada.
 * - Con `?r=…&v=…[&ca=…][&vh=…]`: los tres primeros partidos con sus DOS
 *   cifras —programa y votos— por separado, y «me sorprendió coincidir con Y
 *   en Z». Mismo cálculo que la página (`score.ts`), así que la vista previa no
 *   puede contradecir al resultado.
 * - Con `?dvh=<id>`: una entrada de «Dijeron vs. hicieron» (siglas del
 *   partido, fragmento de la cita, fragmento del hecho y la etiqueta en texto
 *   neutro). Un id desconocido da la tarjeta genérica.
 * - `l`: idioma de los textos (es/ca/gl/eu; el resto cae a castellano).
 *
 * Partidos con siglas sobre su color, nunca logotipos (marcas registradas).
 * Sin fuentes ni imágenes embebidas: la fuente por defecto de `next/og` basta
 * para el castellano y deja el paquete muy por debajo del límite de 500 KB.
 *
 * Un `r` corrupto no da error: da la tarjeta genérica. Una imagen rota en una
 * vista previa de WhatsApp no le sirve a nadie.
 */

const SIZE = { width: 1200, height: 630 };
const INK = "#14181c";
const MUTED = "#5b6670";
const BG = "#f6f7f8";
const LINE = "#dde1e5";
const BAR_PROG = "#7a8590";
const BAR_REC = "#2f4f6f";

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const t = getResultStrings(sp.get("l"));
  const seo = getSeoStrings(sp.get("l"));
  try {
    const dvhId = sp.get("dvh");
    // Textos del dataset (temas, resúmenes, etiquetas) en la lengua de la tarjeta.
    const dataset = localizeDataset(baseDataset, sp.get("l") ?? "es");
    const result =
      sp.get("anon") === "1" ? null : dvhId ? dvhCard(dataset, dvhId, sp.get("l"), t) : resultCard(dataset, sp, t);
    return new ImageResponse(result ?? genericCard(seo), {
      ...SIZE,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    });
  } catch {
    return new ImageResponse(genericCard(seo), SIZE);
  }
}

function hasRecord(partyId: string): boolean {
  return baseDataset.stances.some((s) => s.partyId === partyId && effectivePosition(s.record) !== null);
}

function figure(e: PartyAffinity | undefined, noRecord: boolean, t: ResultStrings): string {
  if (noRecord) return t.noRecord;
  return e && e.usable && e.score !== null ? pct(e.score) : t.insufficient;
}

function resultCard(dataset: Dataset, sp: URLSearchParams, t: ResultStrings) {
  if (!sp.get("r") || dataset.questions.length === 0) return null;
  const decoded = decodeResultParams(sp, dataset.questions, {
    currentVersion: dataset.version,
    partyIds: dataset.parties.map((p) => p.id),
  });
  if (!decoded) return null;
  const { region, usualVote } = decoded.context;
  const partyIds = visiblePartyIds(dataset.parties, region, { include: usualVote ? [usualVote] : [] });
  const combined = computeAffinity(decoded.answers, dataset, "combined", { partyIds });
  if (!combined.enoughAnswers) return null;
  const top = combined.ranking.filter((e) => e.usable).slice(0, 3);
  if (top.length === 0) return null;

  const prog = new Map(computeAffinity(decoded.answers, dataset, "programme", { partyIds }).ranking.map((e) => [e.partyId, e]));
  const rec = new Map(computeAffinity(decoded.answers, dataset, "record", { partyIds }).ranking.map((e) => [e.partyId, e]));
  const partyBy = new Map(dataset.parties.map((p) => [p.id, p]));
  const usual = usualVote ? partyBy.get(usualVote) : undefined;
  const sur = surprise(combined, dataset, usual?.bloc, usual?.id);
  const surParty = sur ? partyBy.get(sur.partyId) : undefined;

  return (
    <Frame t={t}>
      <div style={{ display: "flex", fontSize: 30, color: MUTED, marginBottom: 18 }}>{t.ogMyResult}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {top.map((e) => {
          const party = partyBy.get(e.partyId)!;
          const noRec = !hasRecord(party.id);
          const p = prog.get(party.id);
          const r = rec.get(party.id);
          return (
            <div key={party.id} style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <Avatar party={party} />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: INK }}>
                  {party.name.length > 38 ? `${party.name.slice(0, 37)}…` : party.name}
                </div>
                <div style={{ display: "flex", gap: 28, marginTop: 6 }}>
                  <Metric label={t.ogProgramme} value={figure(p, false, t)} ratio={p?.usable ? p.score : null} color={BAR_PROG} />
                  <Metric label={t.ogRecord} value={figure(r, noRec, t)} ratio={!noRec && r?.usable ? r.score : null} color={BAR_REC} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {sur && surParty && (
        <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: INK }}>
          {/* Con el mismo alcance que la tarjeta: una medida se nombra como
              medida; el tema solo si el partido gana en varias preguntas del tema. */}
          «{fmt(t.ogSurprise, {
            party: surParty.short,
            topic:
              sur.scope === "tema"
                ? topicLabel(t, sur.topic)
                : measureLabel(
                    dataset.questions.find((q) => q.id === sur.questionId) ?? { text: { es: topicLabel(t, sur.topic) } },
                    sp.get("l") ?? "es",
                  ),
          })}»
        </div>
      )}
    </Frame>
  );
}

/**
 * Tarjeta de una entrada de «Dijeron vs. hicieron». La etiqueta va en texto y
 * con el mismo estilo para las tres: sin verde ni rojo, como en la página.
 */
function dvhCard(dataset: Dataset, id: string, lang: string | null, t: ResultStrings) {
  const e = (dataset.saidVsDid ?? []).find((x) => x.id === id);
  const party = e ? dataset.parties.find((p) => p.id === e.partyId) : undefined;
  if (!e || !party) return null;
  const d: DvhStrings = getDvhStrings(lang);
  const l = lang ?? "es";
  return (
    <Frame t={t}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6 }}>
        <Avatar party={party} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: INK }}>
            {party.name.length > 38 ? `${party.name.slice(0, 37)}…` : party.name}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
            {d.title} · {snippet(e.topic, 40)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: INK,
            border: `2px solid ${MUTED}`,
            borderRadius: 30,
            padding: "6px 22px",
          }}
        >
          {d[`verdict_${e.verdict}`]}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
        <div style={{ display: "flex", fontSize: 22, color: MUTED }}>
          {d.ogSaid} · {formatDate(e.said.date, l)} · {snippet(e.said.speaker, 40)}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: INK, marginTop: 6, lineHeight: 1.25 }}>
          «{snippet(e.said.text, 170)}»
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 22 }}>
        <div style={{ display: "flex", fontSize: 22, color: MUTED }}>
          {d.ogDid} · {formatDate(e.did.date, l)}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: INK, marginTop: 6, lineHeight: 1.25 }}>
          {snippet(e.did.summary, 150)}
        </div>
      </div>
    </Frame>
  );
}

/**
 * Tarjeta genérica (portada, «compartir sin decir mi partido», enlaces sin
 * resultado legible): titular en dos líneas, las cuatro promesas en
 * píldoras y, a la derecha, la ilustración de la portada simplificada (mano y
 * urna transparente, sin partidos ni colores de partido). Los colores son los
 * del sitio en modo claro, escritos a mano: aquí no hay variables CSS.
 */
function genericCard(seo: SeoStrings) {
  const n = baseDataset.questions.length || 15;
  const pills = fmt(seo.ogLine, { n }).split(" · ");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: `linear-gradient(135deg, ${SITE_BG} 0%, #ffffff 55%, ${SITE_ACCENT} 100%)`,
        fontFamily: "sans-serif",
        borderBottom: `12px solid ${SITE_PRIMARY}`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", position: "absolute", right: 64, bottom: 24, fontSize: 22, color: SITE_INK_SOFT }}>
        Instagram {INSTAGRAM_HANDLE}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 0 0 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: SITE_PRIMARY,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div style={{ display: "flex", fontSize: 28, color: SITE_INK_SOFT, fontWeight: 600 }}>Libertarios.eu</div>
          <div
            style={{
              display: "flex",
              marginLeft: 8,
              fontSize: 22,
              color: SITE_PRIMARY_DARK,
              background: SITE_ACCENT,
              borderRadius: 999,
              padding: "6px 16px",
              fontWeight: 600,
            }}
          >
            {seo.ogKicker}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: SITE_INK, lineHeight: 1.04 }}>
          {seo.ogHeadlineLead}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: SITE_PRIMARY, lineHeight: 1.04 }}>
          {seo.ogHeadlineAccent}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36, maxWidth: 640 }}>
          {pills.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                fontSize: 26,
                color: SITE_INK_SOFT,
                background: "#ffffff",
                border: `2px solid ${SITE_LINE}`,
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 470, paddingRight: 36 }}>
        <OgBallotArt />
      </div>
    </div>
  );
}

const SITE_PRIMARY = "#0f9379"; // hsl(168 80% 32%)
const SITE_PRIMARY_DARK = "#0d6e5c";
const SITE_ACCENT = "#e8f8f4"; // hsl(168 70% 95%)
const SITE_BG = "#f8fafb";
const SITE_INK = "#131a22";
const SITE_INK_SOFT = "#3d4a55";
const SITE_LINE = "#dde4ea";

/**
 * Versión estática y simplificada de `VoteHandIllustration`: la papeleta ya
 * entrando por la ranura (se dibuja solo hasta la ranura, sin recortes), sin
 * animación ni máscaras, que el renderizador de `next/og` no necesita.
 */
function OgBallotArt() {
  const P = SITE_PRIMARY;
  const INKL = "#2b3640";
  return (
    <svg width="430" height="462" viewBox="0 -44 320 344" fill="none">
      <defs>
        <linearGradient id="sleeve" gradientUnits="userSpaceOnUse" x1="0" y1="-112" x2="0" y2="-80">
          <stop offset="0" stopColor={P} stopOpacity="0" />
          <stop offset="1" stopColor={P} stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx="166" cy="164" r="128" fill={P} fillOpacity="0.1" />
      <circle cx="166" cy="164" r="98" fill={P} fillOpacity="0.06" />
      <path d="M44 92v12M38 98h12M276 70v10M271 75h10M284 196v8M280 200h8" stroke={P} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="164" cy="276" rx="118" ry="9" fill={INKL} fillOpacity="0.1" />
      <path d="M100 126V246M100 246H260M60 270L100 246" stroke={P} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 5" />
      <g fill="#ffffff" stroke={INKL} strokeOpacity="0.45" strokeWidth="1.5">
        <rect x="80" y="238" width="48" height="24" rx="3" transform="rotate(-9 104 250)" />
        <rect x="136" y="232" width="50" height="26" rx="3" transform="rotate(11 160 244)" />
        <rect x="176" y="244" width="40" height="20" rx="3" transform="rotate(-4 196 252)" />
      </g>
      <polygon points="220,150 260,126 260,246 220,270" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="60" y="150" width="160" height="120" rx="3" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="2.5" />
      <path d="M76 166v52" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" />
      <path d="M89 166v18" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="60,150 220,150 260,126 100,126" fill="#ffffff" stroke={P} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="159" cy="138.5" rx="46" ry="9" fill={P} fillOpacity="0.3" />
      <polygon points="124,140.5 188,140.5 194,136.5 130,136.5" fill={INKL} />
      <path d="M132 139V66a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v73" fill="#ffffff" stroke={INKL} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="141" y="74" width="11" height="11" rx="2" stroke={P} strokeWidth="2" />
      <path d="M143.5 79.5l2.6 2.6 5-5.6" stroke={P} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="141" y="94" width="11" height="11" rx="2" stroke={INKL} strokeOpacity="0.45" strokeWidth="2" />
      <rect x="141" y="114" width="11" height="11" rx="2" stroke={INKL} strokeOpacity="0.45" strokeWidth="2" />
      <path d="M158 77h20M158 82h13M158 97h20M158 102h11M158 117h20M158 122h15" stroke={INKL} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(174 64) rotate(28)" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="-26" y="-140" width="52" height="84" rx="8" fill="url(#sleeve)" />
        <rect x="-28" y="-64" width="56" height="13" rx="5" fill={SITE_ACCENT} stroke={INKL} />
        <path d="M-21 -52h40c3 0 5 2 5 5v20c0 9-7 15-16 15h-14c-9 0-17-7-17-16v-19c0-3 1-5 2-5z" fill="#ffffff" stroke={INKL} />
        <rect x="-15" y="-26" width="13" height="32" rx="6.5" transform="rotate(-14 -8 -10)" fill="#ffffff" stroke={INKL} />
      </g>
    </svg>
  );
}

function Frame({ t, generic = false, children }: { t: ResultStrings; generic?: boolean; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: generic ? "center" : "flex-start",
        background: BG,
        padding: "48px 64px",
        fontFamily: "sans-serif",
        borderBottom: `10px solid ${LINE}`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", position: "absolute", right: 64, bottom: 20, fontSize: 22, color: MUTED }}>
        Instagram {INSTAGRAM_HANDLE}
      </div>
      {!generic && <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: MUTED, marginBottom: 6 }}>{t.ogTitle}</div>}
      {children}
    </div>
  );
}

function Avatar({ party }: { party: Party }) {
  return (
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 42,
        background: party.color,
        color: ink(party.color),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: party.initials.length > 3 ? 24 : 30,
        fontWeight: 800,
        border: `2px solid ${LINE}`,
      }}
    >
      {party.initials}
    </div>
  );
}

function Metric({ label, value, ratio, color }: { label: string; value: string; ratio: number | null; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 420 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: MUTED }}>
        <span>{label}</span>
        <span style={{ color: ratio === null ? MUTED : INK, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ display: "flex", height: 12, background: LINE, borderRadius: 6, marginTop: 6 }}>
        {ratio !== null && (
          <div style={{ display: "flex", width: `${Math.round(ratio * 100)}%`, background: color, borderRadius: 6 }} />
        )}
      </div>
    </div>
  );
}

/** Negro o blanco según el contraste con el color del partido. */
function ink(hex: string): string {
  const v = hex.replace("#", "");
  if (v.length !== 6) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.45 ? "#101418" : "#ffffff";
}
