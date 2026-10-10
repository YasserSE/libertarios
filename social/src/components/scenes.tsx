/**
 * Pantallas de los vídeos explicativos (src/explainers). Todas reciben los
 * tiempos de la voz (`t`) y hacen aparecer cada elemento con su palabra (`cue`).
 * Coordenadas relativas al área de contenido de la papeleta (928 × 1076).
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { parties } from "../data";
import type { DvhRow, GridRow, ReceiptLine, Scene } from "../explainers/types";
import { C, GROTESK, MONO } from "../theme";
import { Stamp, Src, useEnter } from "./bits";
import type { WordTiming } from "./Ticker";
import { getReferenceSet } from "../../../Libertarios/src/data/quadrantReferences";

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Fotograma en que la voz dice la primera palabra que empieza por `cue` (o `fallback`). */
export const cueAt = (t: WordTiming[], cue: string | undefined, fallback: number) => {
  if (!cue) return fallback;
  const c = norm(cue);
  return t.find((w) => norm(w.word).startsWith(c))?.start ?? fallback;
};

const party = (id: string) => parties.find((p) => p.id === id)!;

const Title: React.FC<{ children: React.ReactNode; top?: number; size?: number }> = ({ children, top = 40, size = 64 }) => (
  <div style={{ position: "absolute", left: 44, right: 44, top, font: `700 ${size}px ${GROTESK}`, letterSpacing: -2, lineHeight: 0.95, textTransform: "uppercase", ...useEnter(0, { x: -50 }) }}>
    {children}
  </div>
);

const Source: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Src style={{ position: "absolute", left: 44, right: 44, bottom: 16, fontSize: 19 }}>Fuente: {children}</Src>
);

const pop = (frame: number, fps: number, at: number) => spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 170 } });

const Badge: React.FC<{ id: string; size?: number }> = ({ id, size = 30 }) => {
  const p = party(id);
  return (
    <span style={{ background: p.color, color: C.white, border: `4px solid ${C.ink}`, padding: "4px 12px", font: `700 ${size}px ${GROTESK}`, whiteSpace: "nowrap" }}>
      {p.short}
    </span>
  );
};

/* ── Preguntas del gancho ───────────────────────────────────────────── */

const Questions: React.FC<{ s: Extract<Scene, { kind: "questions" }>; t: WordTiming[] }> = ({ s, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <Title size={80}>{s.title}</Title>
      {s.items.map((it, i) => {
        const p = pop(frame, fps, cueAt(t, it.cue, 20 + i * 25));
        return (
          <div
            key={it.text}
            style={{
              position: "absolute",
              left: i % 2 ? 160 : 60,
              top: 250 + i * 220,
              border: `6px solid ${C.ink}`,
              background: C.white,
              boxShadow: `-12px 12px 0 ${C.ink}`,
              padding: "26px 40px",
              font: `700 70px ${GROTESK}`,
              letterSpacing: -2,
              opacity: interpolate(p, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
              transform: `rotate(${i % 2 ? 2.5 : -2.5}deg) scale(${interpolate(p, [0, 1], [0.6, 1])})`,
            }}
          >
            {it.text}
          </div>
        );
      })}
      {s.stamp ? (
        <Stamp at={cueAt(t, s.stamp.cue, 90)} rotate={-8} style={{ right: 50, bottom: 70 }}>
          <span style={{ fontSize: 58 }}>{s.stamp.text}</span>
        </Stamp>
      ) : null}
    </>
  );
};

/* ── Dos cifras enfrentadas ─────────────────────────────────────────── */

const Vs: React.FC<{ s: Extract<Scene, { kind: "vs" }>; t: WordTiming[] }> = ({ s, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(s.left.n, s.right.n);
  const H = 500;
  const col = (side: "left" | "right") => {
    const d = s[side];
    const at = side === "left" ? 6 : cueAt(t, s.right.cue, 50);
    const g = pop(frame, fps, at);
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: H + 220 }}>
        <div style={{ font: `700 76px ${GROTESK}`, letterSpacing: -3, opacity: g }}>{d.value}</div>
        <div
          style={{
            width: 250,
            height: (H * d.n * g) / max,
            background: side === "left" ? C.teal : C.ink,
            border: `6px solid ${C.ink}`,
            boxShadow: `-10px 10px 0 ${C.ink}`,
            marginTop: 14,
          }}
        />
        <div style={{ font: `700 32px ${GROTESK}`, marginTop: 18, textAlign: "center", opacity: g }}>{d.label}</div>
      </div>
    );
  };
  return (
    <>
      <Title size={110}>{s.title}</Title>
      <div style={{ position: "absolute", left: 44, right: 44, top: 160, display: "flex", gap: 40 }}>
        {col("left")}
        {col("right")}
      </div>
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Cifras grandes en lista ────────────────────────────────────────── */

const Stats: React.FC<{ s: Extract<Scene, { kind: "stats" }>; t: WordTiming[] }> = ({ s, t }) => (
  <>
    <Title>{s.title}</Title>
    <div style={{ position: "absolute", left: 44, right: 44, top: 170, display: "flex", flexDirection: "column", gap: s.items.length > 3 ? 18 : 34 }}>
      {s.items.map((it, i) => (
        <StatCard key={it.label} value={it.value} label={it.label} at={cueAt(t, it.cue, 10 + i * 30)} />
      ))}
    </div>
    <Source>{s.source}</Source>
  </>
);

const StatCard: React.FC<{ value: string; label: string; at: number }> = ({ value, label, at }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28, border: `5px solid ${C.ink}`, background: C.white, boxShadow: `-10px 10px 0 ${C.ink}`, padding: "22px 26px", ...useEnter(at, { x: 90, y: 0 }) }}>
    <span style={{ font: `700 ${value.length > 8 ? 60 : 76}px ${GROTESK}`, letterSpacing: -3, background: C.teal, border: `4px solid ${C.ink}`, padding: "2px 16px", whiteSpace: "nowrap" }}>{value}</span>
    <span style={{ font: `700 32px ${GROTESK}`, lineHeight: 1.15 }}>{label}</span>
  </div>
);

/* ── Sellos ─────────────────────────────────────────────────────────── */

const Stamps: React.FC<{ s: Extract<Scene, { kind: "stamps" }>; t: WordTiming[] }> = ({ s, t }) => (
  <>
    <Title size={76}>{s.title}</Title>
    {s.items.map((it, i) => (
      <Stamp key={it.text} at={cueAt(t, it.cue, 20 + i * 30)} rotate={[-7, 5, -4][i % 3]} style={{ left: [60, 300, 110][i % 3], top: 300 + i * 210 }}>
        <span style={{ fontSize: 66 }}>{it.text}</span>
      </Stamp>
    ))}
    <Source>{s.source}</Source>
  </>
);

/* ── Donut ──────────────────────────────────────────────────────────── */

const Donut: React.FC<{ s: Extract<Scene, { kind: "donut" }>; t: WordTiming[] }> = ({ s, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const R = 200;
  const L = 2 * Math.PI * R;
  const fill = { ink: C.ink, teal: C.teal, mint: C.mint };
  let acc = 0;
  return (
    <>
      <Title size={72}>{s.title}</Title>
      <svg style={{ position: "absolute", left: 464 - 270, top: 150 }} width={540} height={540} viewBox="-270 -270 540 540">
        <circle r={R} fill="none" stroke="#e4e1d8" strokeWidth={110} />
        {s.slices.map((sl, i) => {
          const g = spring({ frame: frame - cueAt(t, sl.cue, 10 + i * 30), fps, config: { damping: 18 } });
          const len = (L * sl.value * g) / 100;
          const off = (L * acc) / 100;
          acc += sl.value;
          return (
            <circle
              key={sl.label}
              r={R}
              fill="none"
              stroke={fill[sl.color]}
              strokeWidth={110}
              strokeDasharray={`${len} ${L}`}
              strokeDashoffset={-off}
              transform="rotate(-90)"
            />
          );
        })}
        <circle r={R + 55} fill="none" stroke={C.ink} strokeWidth={6} />
        <circle r={R - 55} fill={C.paper} stroke={C.ink} strokeWidth={6} />
      </svg>
      <div style={{ position: "absolute", left: 44, right: 44, top: 720, display: "flex", gap: 24 }}>
        {s.slices.map((sl, i) => (
          <div key={sl.label} style={{ flex: 1, border: `5px solid ${C.ink}`, background: C.white, padding: "16px 20px", ...useEnter(cueAt(t, sl.cue, 10 + i * 30)) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 30, height: 30, background: fill[sl.color], border: `4px solid ${C.ink}` }} />
              <span style={{ font: `700 64px ${GROTESK}`, letterSpacing: -2 }}>{sl.display}</span>
            </div>
            <div style={{ font: `700 30px ${GROTESK}`, marginTop: 4 }}>{sl.label}</div>
          </div>
        ))}
      </div>
      {s.note ? <Src style={{ position: "absolute", left: 44, right: 44, top: 892, fontSize: 22, color: C.ink }}>{s.note}</Src> : null}
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Un caso con su cifra ───────────────────────────────────────────── */

const Case: React.FC<{ s: Extract<Scene, { kind: "case" }>; t: WordTiming[] }> = ({ s, t }) => {
  const at = cueAt(t, s.cue, 30);
  return (
    <>
      <Title size={76}>{s.title}</Title>
      <div style={{ position: "absolute", left: 44, right: 44, top: 200, border: `6px solid ${C.ink}`, background: C.white, boxShadow: `-14px 14px 0 ${C.ink}`, padding: "34px 36px", ...useEnter(at) }}>
        <div style={{ font: `700 26px ${MONO}`, letterSpacing: 2 }}>▸ CASO REAL</div>
        <div style={{ font: `700 72px ${GROTESK}`, letterSpacing: -2, marginTop: 10 }}>{s.place}</div>
        <div style={{ display: "inline-block", font: `700 170px ${GROTESK}`, letterSpacing: -6, background: C.teal, border: `5px solid ${C.ink}`, padding: "0 22px", marginTop: 20, lineHeight: 1.05 }}>{s.figure}</div>
        <div style={{ font: `700 40px ${GROTESK}`, marginTop: 24, lineHeight: 1.18 }}>{s.text}</div>
      </div>
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Dónde: provincias ──────────────────────────────────────────────── */

const Provinces: React.FC<{ s: Extract<Scene, { kind: "provinces" }>; t: WordTiming[] }> = ({ s, t }) => {
  const at = cueAt(t, s.cue, 20);
  return (
    <>
      <Title size={72}>{s.title}</Title>
      <div style={{ position: "absolute", left: 44, right: 44, top: 150, display: "flex", alignItems: "baseline", gap: 22, ...useEnter(at) }}>
        <span style={{ font: `700 124px ${GROTESK}`, letterSpacing: -5, background: C.teal, border: `5px solid ${C.ink}`, padding: "0 18px", lineHeight: 1.05, whiteSpace: "nowrap" }}>{s.value}</span>
        <span style={{ font: `700 34px ${GROTESK}`, lineHeight: 1.15 }}>{s.label}</span>
      </div>
      <div style={{ position: "absolute", left: 44, right: 44, top: 390, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {s.items.map((p, i) => (
          <div key={p} style={{ border: `4px solid ${C.ink}`, background: C.white, padding: "14px 16px", font: `700 32px ${GROTESK}`, textAlign: "center", ...useEnter(at + 6 + i * 4, { y: 20 }) }}>
            {p}
          </div>
        ))}
      </div>
      {s.extra ? (
        <div style={{ position: "absolute", left: 44, right: 44, top: 640, borderTop: `4px dashed ${C.ink}`, paddingTop: 28, ...useEnter(cueAt(t, s.extra.cue, 120)) }}>
          <div style={{ font: `700 24px ${MONO}`, letterSpacing: 2 }}>▸ ¿Y LAS VACÍAS?</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 14 }}>
            <span style={{ font: `700 ${s.extra.value.length > 7 ? 84 : 110}px ${GROTESK}`, letterSpacing: -4, whiteSpace: "nowrap" }}>{s.extra.value}</span>
            <span style={{ font: `700 30px ${GROTESK}`, lineHeight: 1.2 }}>{s.extra.label}</span>
          </div>
        </div>
      ) : null}
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Titular ────────────────────────────────────────────────────────── */

const Headline: React.FC<{ s: Extract<Scene, { kind: "headline" }>; t: WordTiming[] }> = ({ s, t }) => (
  <>
    <div style={{ position: "absolute", left: 44, right: 44, top: 90, font: `700 116px ${GROTESK}`, lineHeight: 1.0, letterSpacing: -5, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
      {s.lines.map((l, i) => (
        <div key={i}>
          {i === s.highlight ? <span style={{ background: C.teal, border: `6px solid ${C.ink}`, padding: "0 14px", display: "inline-block", lineHeight: 0.95, marginTop: 10 }}>{l}</span> : l}
        </div>
      ))}
    </div>
    {s.sub ? (
      <div style={{ position: "absolute", left: 44, right: 120, top: 640, font: `700 44px ${GROTESK}`, lineHeight: 1.2, ...useEnter(cueAt(t, s.subCue, 30)) }}>{s.sub}</div>
    ) : null}
  </>
);

/* ── Mapa de partidos (cuadrante de la web) ─────────────────────────── */

const SEATS = new Set(["pp", "psoe", "vox", "sumar", "podemos", "junts", "pnv", "erc", "bildu"]);

const PartyMap: React.FC<{ s: Extract<Scene, { kind: "partyMap" }>; t: WordTiming[] }> = ({ s, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const size = 740;
  const left = 94;
  const top = 160;
  const pts = getReferenceSet("party-es")!.points;
  const x = (e: number) => ((e + 100) / 200) * size;
  const y = (so: number) => size - ((so + 100) / 200) * size;
  const empty = cueAt(t, s.emptyCue, 150);
  const lit = frame >= empty - 10;
  return (
    <>
      <Title size={60}>{s.title}</Title>
      <div style={{ position: "absolute", left, top, width: size, height: size, border: `6px solid ${C.ink}`, background: C.white }}>
        <div style={{ position: "absolute", left: size / 2, top: 0, width: size / 2, height: size / 2, background: lit ? C.mint : "#eef6f3", transition: "none" }} />
        <div style={{ position: "absolute", left: size / 2, top: 0, bottom: 0, borderLeft: `4px solid ${C.ink}` }} />
        <div style={{ position: "absolute", top: size / 2, left: 0, right: 0, borderTop: `4px solid ${C.ink}` }} />
        <div style={{ position: "absolute", right: 14, top: 12, font: `700 26px ${GROTESK}` }}>LIBERTARIO</div>
        {pts
          .filter((p) => p.id !== "cs")
          .map((p, i) => {
            const g = pop(frame, fps, 10 + i * 4);
            const seat = SEATS.has(p.id);
            return (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  left: x(p.economic) - 34,
                  top: y(p.social) - 34,
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: seat ? p.color : C.white,
                  border: seat ? `4px solid ${C.ink}` : `4px dashed ${C.ink}`,
                  color: seat ? C.white : C.ink,
                  font: `700 24px ${GROTESK}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${g})`,
                }}
              >
                {p.initials}
              </div>
            );
          })}
      </div>
      <div style={{ position: "absolute", left, width: size, top: top - 32, textAlign: "center", font: `700 20px ${MONO}` }}>↑ LIBERTAD SOCIAL · TU VIDA</div>
      <div style={{ position: "absolute", left, width: size, top: top + size + 10, display: "flex", justifyContent: "space-between", font: `700 20px ${MONO}` }}>
        <span>← INTERVENCIÓN</span>
        <span>LIBRE MERCADO · TU DINERO →</span>
      </div>
      <Stamp at={empty} rotate={-6} style={{ left: left + size / 2 + 6, top: top + 190 }}>
        <span style={{ fontSize: 30 }}>Ningún partido</span>
        <br />
        <span style={{ fontSize: 30 }}>con escaño</span>
      </Stamp>
      <Src style={{ position: "absolute", left: 44, right: 44, top: top + size + 44, fontSize: 19, color: C.ink }}>
        {s.note} · círculo discontinuo: P-LIB, sin escaño
      </Src>
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Ticket ─────────────────────────────────────────────────────────── */

const Receipt: React.FC<{ s: Extract<Scene, { kind: "receipt" }>; t: WordTiming[] }> = ({ s, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16 } });
  // Las líneas que la voz no nombra salen en orden, justo después de la anterior.
  const times: number[] = [];
  s.lines.forEach((l, i) => {
    const spoken = l.cue ? cueAt(t, l.cue, -1) : -1;
    times.push(spoken >= 0 ? spoken : (i ? times[i - 1] : 3) + 5);
  });
  const lineAt = (_l: ReceiptLine, i: number) => times[i];
  const zig = "polygon(" + Array.from({ length: 41 }, (_, i) => `${i * 2.5}% ${i % 2 ? 100 : 97.5}%`).join(",") + ",100% 0,0 0)";
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 104,
          width: 720,
          top: 24,
          background: C.white,
          boxShadow: `-14px 14px 0 rgba(20,26,36,.85)`,
          padding: "34px 40px 60px",
          font: `500 28px ${MONO}`,
          clipPath: zig,
          transform: `translateY(${(1 - enter) * -120}px)`,
        }}
      >
        <div style={{ textAlign: "center", font: `700 32px ${MONO}`, letterSpacing: 2 }}>{s.title}</div>
        {s.meta.map((m) => (
          <div key={m} style={{ textAlign: "center", fontSize: 21, marginTop: 6, color: C.muted }}>
            {m}
          </div>
        ))}
        <div style={{ borderTop: `4px dashed ${C.ink}`, margin: "18px 0 12px" }} />
        {s.lines.map((l, i) => {
          const shown = frame >= lineAt(l, i);
          return (
            <div
              key={l.label + i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 10px",
                marginLeft: l.sub ? 26 : 0,
                fontWeight: l.strong ? 700 : 500,
                background: l.strong && shown ? C.mint : "transparent",
                color: l.dim ? "rgba(20,26,36,.45)" : C.ink,
                opacity: shown ? 1 : 0,
                fontSize: s.lines.length > 8 ? 25 : 30,
                position: "relative",
              }}
            >
              <span>{l.label}</span>
              <span>{l.amount}</span>
            </div>
          );
        })}
        {s.total ? (
          <>
            <div style={{ borderTop: `4px dashed ${C.ink}`, margin: "14px 0 10px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", font: `700 40px ${MONO}`, opacity: frame >= cueAt(t, s.total.cue, 40) ? 1 : 0 }}>
              <span>{s.total.label}</span>
              <span>{s.total.amount}</span>
            </div>
          </>
        ) : null}
        <div style={{ textAlign: "center", fontSize: 20, marginTop: 26, color: C.muted, letterSpacing: 2 }}>* GRACIAS POR SU VISITA *</div>
      </div>
      {s.stamp ? (
        <Stamp at={cueAt(t, s.stamp.cue, 30)} rotate={-7} style={{ right: 30, top: 186 + s.stamp.line * (s.lines.length > 8 ? 43 : 52) }}>
          <span style={{ fontSize: 34 }}>{s.stamp.text}</span>
        </Stamp>
      ) : null}
      <Source>{s.source}</Source>
    </>
  );
};

/* ── Rejilla de partidos: programa y voto ───────────────────────────── */

const PROMISE: Record<GridRow["promise"], { mark: string; text: string }> = {
  favor: { mark: "✓", text: "A favor" },
  contra: { mark: "✗", text: "En contra" },
  sin: { mark: "–", text: "Sin posición" },
};
const VOTE: Record<NonNullable<GridRow["vote"]>, string> = { si: "SÍ", no: "NO", abstencion: "ABST.", "no-vota": "NO VOTÓ" };

const PartyGrid: React.FC<{ s: Extract<Scene, { kind: "partyGrid" }>; t: WordTiming[] }> = ({ s, t }) => (
  <>
    <Title size={64}>{s.title}</Title>
    <div style={{ position: "absolute", left: 44, right: 44, top: 125, border: `4px solid ${C.ink}`, background: C.white, padding: "14px 18px", font: `700 28px ${GROTESK}`, lineHeight: 1.2, ...useEnter(2) }}>
      «{s.question}»
    </div>
    <div style={{ position: "absolute", left: 44, right: 44, top: 270, display: "grid", gridTemplateColumns: "230px 1fr 190px", font: `700 22px ${MONO}`, letterSpacing: 2, padding: "0 6px" }}>
      <span />
      <span>EN SU PROGRAMA</span>
      <span style={{ textAlign: "center" }}>VOTÓ</span>
    </div>
    <div style={{ position: "absolute", left: 44, right: 44, top: 310, display: "flex", flexDirection: "column", gap: 16 }}>
      {s.rows.map((r, i) => (
        <GridRowView key={r.partyId} r={r} at={cueAt(t, r.cue, 12 + i * 10)} />
      ))}
    </div>
    <Source>{s.source}</Source>
  </>
);

const GridRowView: React.FC<{ r: GridRow; at: number }> = ({ r, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = pop(frame, fps, at + 4);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "230px 1fr 190px", alignItems: "center", border: `4px solid ${C.ink}`, background: C.white, padding: "14px 6px 14px 16px", minHeight: 108, ...useEnter(at, { x: 60, y: 0 }) }}>
      <span>
        <Badge id={r.partyId} size={34} />
      </span>
      <span style={{ font: `700 34px ${GROTESK}`, display: "flex", alignItems: "center", gap: 14, color: r.promise === "sin" ? "rgba(20,26,36,.55)" : C.ink }}>
        <span style={{ font: `700 40px ${GROTESK}`, width: 44, textAlign: "center" }}>{PROMISE[r.promise].mark}</span>
        {PROMISE[r.promise].text}
      </span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        {r.vote ? (
          <span
            style={{
              border: `5px solid ${C.ink}`,
              borderRadius: 10,
              background: r.vote === "si" ? C.mint : r.vote === "no" ? C.paper : "#e4e1d8",
              font: `700 ${r.vote === "si" || r.vote === "no" ? 46 : 30}px ${GROTESK}`,
              padding: "2px 16px",
              transform: `rotate(-6deg) scale(${interpolate(g, [0, 1], [1.8, 1])})`,
              opacity: interpolate(g, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
              boxShadow: `4px 4px 0 ${C.ink}`,
            }}
          >
            {VOTE[r.vote]}
          </span>
        ) : (
          <span style={{ font: `700 22px ${MONO}` }}>SIN ESCAÑO</span>
        )}
      </span>
    </div>
  );
};

/* ── Dijo / hizo, uno por partido ───────────────────────────────────── */

const DvhList: React.FC<{ s: Extract<Scene, { kind: "dvhList" }>; t: WordTiming[] }> = ({ s, t }) => (
  <>
    <Title size={60}>{s.title}</Title>
    <div style={{ position: "absolute", left: 44, right: 44, top: 140, display: "flex", flexDirection: "column", gap: 18 }}>
      {s.rows.map((r, i) => (
        <DvhRowView key={r.partyId} r={r} at={cueAt(t, r.cue, 10 + i * 12)} />
      ))}
    </div>
    <Source>{s.source}</Source>
  </>
);

const DvhRowView: React.FC<{ r: DvhRow; at: number }> = ({ r, at }) => (
  <div style={{ border: `4px solid ${C.ink}`, background: r.verdict ? C.white : "#ecebe4", padding: "16px 18px", display: "grid", gridTemplateColumns: "190px 1fr", gap: 12, alignItems: "center", minHeight: 140, ...useEnter(at, { x: 60, y: 0 }) }}>
    <span>
      <Badge id={r.partyId} size={32} />
    </span>
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ font: `700 30px ${GROTESK}`, lineHeight: 1.12 }}>{r.topic}</span>
        {r.verdict ? (
          <span style={{ border: `5px solid ${C.ink}`, background: C.mint, borderRadius: 10, font: `700 26px ${MONO}`, letterSpacing: 1, padding: "4px 12px", textTransform: "uppercase", transform: "rotate(-5deg)", whiteSpace: "nowrap" }}>
            {r.verdict}
          </span>
        ) : null}
      </div>
      <div style={{ font: `500 22px ${MONO}`, color: C.muted, marginTop: 8 }}>{r.counts}</div>
    </div>
  </div>
);

/* ── Selector ───────────────────────────────────────────────────────── */

export const SceneView: React.FC<{ scene: Scene; t: WordTiming[]; Axes: React.FC<{ t: WordTiming[] }>; Who: React.FC<{ t: WordTiming[] }>; Ending: React.FC<{ title?: string[]; cta?: string[]; body?: string; shareTo?: string }> }> = ({
  scene,
  t,
  Axes,
  Who,
  Ending,
}) => {
  switch (scene.kind) {
    case "questions":
      return <Questions s={scene} t={t} />;
    case "vs":
      return <Vs s={scene} t={t} />;
    case "stats":
      return <Stats s={scene} t={t} />;
    case "stamps":
      return <Stamps s={scene} t={t} />;
    case "donut":
      return <Donut s={scene} t={t} />;
    case "case":
      return <Case s={scene} t={t} />;
    case "provinces":
      return <Provinces s={scene} t={t} />;
    case "headline":
      return <Headline s={scene} t={t} />;
    case "axes":
      return <Axes t={t} />;
    case "partyMap":
      return <PartyMap s={scene} t={t} />;
    case "receipt":
      return <Receipt s={scene} t={t} />;
    case "partyGrid":
      return <PartyGrid s={scene} t={t} />;
    case "dvhList":
      return <DvhList s={scene} t={t} />;
    case "who":
      return <Who t={t} />;
    case "ending":
      return <Ending title={scene.title} cta={scene.cta} body={scene.body} shareTo={scene.shareTo} />;
  }
};
