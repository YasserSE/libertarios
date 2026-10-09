import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Chapter } from "../chapters";
import type { Party } from "../data";
import { shortDate, type Dvh, type Programme, type Vote, type Votes } from "../build";
import { C, GROTESK, MONO } from "../theme";
import { ChapterTitle, Label, Src, Stamp, Tag, useEnter } from "./bits";

const quoteSize = (s: string) => {
  const n = s.split(/\s+/).length;
  return n <= 22 ? 47 : n <= 34 ? 40 : 34;
};

/* ── Gancho ─────────────────────────────────────────────────────────── */

export const HookBeat: React.FC<{ party: Party }> = ({ party }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tick = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const q = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 160 } });
  return (
    <>
      <div style={{ position: "absolute", left: 44, top: 54, font: `700 52px ${GROTESK}`, lineHeight: 1, ...useEnter(0) }}>
        Si el 29-N
        <br />
        votas…
      </div>

      <div
        style={{
          position: "absolute",
          left: 44,
          right: 44,
          top: 360,
          display: "flex",
          alignItems: "center",
          gap: 30,
          borderTop: `4px solid ${C.ink}`,
          borderBottom: `4px solid ${C.ink}`,
          padding: "28px 0",
          ...useEnter(6, { x: -80 }),
        }}
      >
        <div style={{ width: 150, height: 150, border: `6px solid ${C.ink}`, position: "relative", flex: "none", background: C.white }}>
          <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: -22, width: 194, height: 194 }}>
            <path
              d="M14 52 L40 80 L90 10"
              stroke={C.ink}
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="130"
              strokeDashoffset={130 * (1 - tick)}
            />
          </svg>
        </div>
        <div
          style={{
            width: 120,
            height: 120,
            background: party.color,
            border: `5px solid ${C.ink}`,
            color: C.white,
            font: `700 ${party.short.length > 3 ? 40 : 58}px ${GROTESK}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          {party.short}
        </div>
        <div style={{ font: `700 60px ${GROTESK}`, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: -2 }}>{party.name}</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 44,
          bottom: 60,
          fontFamily: GROTESK,
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 1.02,
          letterSpacing: -5,
          textTransform: "uppercase",
          opacity: interpolate(q, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(q, [0, 1], [1.25, 1])})`,
          transformOrigin: "left bottom",
        }}
      >
        ¿Qué te
        <br />
        <span style={{ background: C.teal, padding: "0 12px", border: `6px solid ${C.ink}`, display: "inline-block", lineHeight: 0.95 }}>
          cambia?
        </span>
      </div>
    </>
  );
};

/* ── Capítulo: programa + votación ──────────────────────────────────── */

const ProgrammeBlock: React.FC<{ programme: Programme; enterAt: number | null }> = ({ programme, enterAt }) => {
  const enter = useEnter(enterAt ?? -999);
  if (programme.kind === "none") {
    return (
      <div style={{ position: "absolute", left: 44, right: 44, top: 220, ...enter }}>
        <Label>EN SU PROGRAMA</Label>
        <div
          style={{
            marginTop: 18,
            border: `5px dashed ${C.ink}`,
            padding: "30px 28px",
            font: `700 44px ${GROTESK}`,
            lineHeight: 1.1,
            color: "rgba(20,26,36,.75)",
            minHeight: 210,
          }}
        >
          Sin posición.
          <div style={{ font: `500 30px ${GROTESK}`, marginTop: 14, lineHeight: 1.25 }}>{programme.reason}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 220, ...enter }}>
      <Label>EN SU PROGRAMA</Label>
      <div
        style={{
          marginTop: 16,
          borderLeft: `14px solid ${C.teal}`,
          padding: "6px 0 6px 26px",
          font: `700 ${quoteSize(programme.quote)}px ${GROTESK}`,
          lineHeight: 1.14,
          letterSpacing: -1,
        }}
      >
        «{programme.quote}»
      </div>
      <Src style={{ paddingLeft: 40 }}>{programme.source}</Src>
    </div>
  );
};

const STAMP_WORD: Record<Vote["vote"], { top: string; main: string }> = {
  si: { top: "votó", main: "SÍ" },
  no: { top: "votó", main: "NO" },
  abstencion: { top: "se", main: "ABSTUVO" },
  "no-vota": { top: "", main: "NO VOTÓ" },
};
const VOTE_WORD: Record<Vote["vote"], string> = { si: "sí", no: "no", abstencion: "abstención", "no-vota": "no votó" };

export const ChapterBeat: React.FC<{
  chapter: Chapter;
  n: number;
  programme: Programme;
  votes: Votes | null;
}> = ({ chapter, n, programme, votes }) => {
  const isVote = votes !== null;
  const enterTitle = useEnter(isVote ? -999 : 0, { x: -60 });
  const enterVote = useEnter(isVote ? 0 : -999, { y: 120 });
  const v0 = votes?.kind === "votes" ? votes.votes[0] : null;
  const rest = votes?.kind === "votes" ? votes.votes.slice(1) : [];

  return (
    <>
      <div style={{ position: "absolute", left: 44, top: 44, ...enterTitle }}>
        <ChapterTitle n={n} title={chapter.title} big />
      </div>
      <ProgrammeBlock programme={programme} enterAt={isVote ? null : 10} />

      {isVote ? (
        <div style={{ position: "absolute", left: 44, right: 44, bottom: 40, borderTop: `4px dashed ${C.ink}`, paddingTop: 28, ...enterVote }}>
          <Label>EN EL CONGRESO</Label>
          {v0 ? (
            <>
              <div style={{ font: `700 40px ${GROTESK}`, marginTop: 14, lineHeight: 1.15, maxWidth: 560 }}>{v0.label}</div>
              <Src>{shortDate(v0.date)} · voto del grupo</Src>
              {rest.map((v) => (
                <Src key={v.date} style={{ maxWidth: 600 }}>
                  También: {v.label} ({shortDate(v.date)}): {VOTE_WORD[v.vote]}
                </Src>
              ))}
              <Stamp at={14} top={STAMP_WORD[v0.vote].top} style={{ right: 6, bottom: 20 }}>
                <span style={{ font: `700 ${v0.vote === "si" || v0.vote === "no" ? 88 : 40}px ${GROTESK}`, letterSpacing: 0 }}>
                  {STAMP_WORD[v0.vote].main}
                </span>
              </Stamp>
            </>
          ) : (
            <div style={{ font: `700 40px ${GROTESK}`, marginTop: 14, color: "rgba(20,26,36,.75)" }}>
              {votes?.kind === "none" ? votes.reason : ""}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

/* ── Capítulo: dijo / hizo ──────────────────────────────────────────── */

export const DvhBeat: React.FC<{ chapter: Chapter; n: number; dvh: Dvh; frames: number; compact?: boolean }> = ({ chapter, n, dvh, frames, compact }) => {
  const gapAt = Math.round(frames * 0.36);
  const didAt = gapAt + 8;
  const stampAt = Math.round(frames * 0.66);
  const card: React.CSSProperties = { position: "relative", border: `5px solid ${C.ink}`, background: C.white, padding: "24px 28px" };
  const qs = (t: string) => quoteSize(t) - (compact ? 9 : 2);
  return (
    <>
      <div style={{ position: "absolute", left: 44, top: 34, ...useEnter(0, { x: -40 }) }}>
        <ChapterTitle n={n} title={chapter.title} big={false} />
      </div>
      <Label style={{ position: "absolute", left: 44, top: 136 }}>DIJO / HIZO</Label>

      <div style={{ position: "absolute", left: 44, right: 44, top: 189, bottom: 18, display: "flex", flexDirection: "column", gap: compact ? 18 : 26 }}>
        <div style={{ ...card, ...useEnter(4) }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Tag>LO QUE DIJERON</Tag>
            <span style={{ font: `700 22px ${MONO}` }}>{shortDate(dvh.saidDate)}</span>
          </div>
          <div style={{ font: `700 ${qs(dvh.said)}px ${GROTESK}`, lineHeight: 1.18, marginTop: 16, letterSpacing: -0.5 }}>«{dvh.said}»</div>
          <Src>{dvh.saidWho}</Src>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, font: `700 40px ${GROTESK}`, ...useEnter(gapAt, { x: -40 }) }}>
          <span style={{ fontSize: 60, lineHeight: 1 }}>↓</span>
          <span style={{ background: C.mint, border: `4px solid ${C.ink}`, padding: "2px 14px" }}>{dvh.gap}</span>
        </div>

        <div style={{ ...card, ...useEnter(didAt) }}>
          <Tag>LO QUE HICIERON</Tag>
          <div style={{ font: `700 ${qs(dvh.did)}px ${GROTESK}`, lineHeight: 1.18, marginTop: 16, letterSpacing: -0.5 }}>{dvh.did}</div>
          <Src>
            {shortDate(dvh.didDate)} · {dvh.didSource}
          </Src>
          <Stamp at={stampAt} rotate={-8} style={{ right: -18, top: -62 }}>
            {dvh.verdictLabel}
          </Stamp>
        </div>

        {dvh.note ? (
          <Src style={{ marginTop: "auto", fontSize: 19, ...useEnter(stampAt + 6, { y: 10 }) }}>Nota: {dvh.note}</Src>
        ) : null}
      </div>
    </>
  );
};

/* ── Final ──────────────────────────────────────────────────────────── */

export const EndingBeat: React.FC<{ title?: string[]; cta?: string[]; body?: string }> = ({
  title = ["¿Quieres", "saber", "más?"],
  cta = ["¿A quién", "votar?"],
  body = "15 preguntas. Tus respuestas, comparadas con programas y votaciones.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + Math.max(0, Math.sin((frame - 30) / 7)) * 0.03 * (frame > 30 ? 1 : 0);
  const cardIn = spring({ frame: frame - 14, fps, config: { damping: 12 } });
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 54,
          fontFamily: GROTESK,
          fontWeight: 700,
          fontSize: 118,
          lineHeight: 0.92,
          letterSpacing: -5,
          textTransform: "uppercase",
          ...useEnter(0, { x: -60 }),
        }}
      >
        {title.map((l, i) => (
          <React.Fragment key={i}>
            {i ? <br /> : null}
            {l}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 44,
          right: 44,
          top: 464,
          border: `6px solid ${C.ink}`,
          background: C.white,
          boxShadow: `-12px 12px 0 ${C.ink}`,
          opacity: interpolate(cardIn, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${(1 - cardIn) * 80}px) scale(${pulse})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderBottom: `4px solid ${C.ink}`, background: C.paper }}>
          <span style={{ width: 18, height: 18, border: `3px solid ${C.ink}`, borderRadius: "50%" }} />
          <span style={{ width: 18, height: 18, border: `3px solid ${C.ink}`, borderRadius: "50%" }} />
          <span style={{ flex: 1, marginLeft: 10, border: `3px solid ${C.ink}`, padding: "6px 14px", font: `700 26px ${MONO}` }}>libertarios.eu</span>
        </div>
        <div style={{ padding: "30px 30px 34px", display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ font: `700 80px ${GROTESK}`, lineHeight: 1 }}>→</span>
          <span
            style={{
              font: `700 72px ${GROTESK}`,
              letterSpacing: -3,
              lineHeight: 0.95,
              background: C.teal,
              border: `5px solid ${C.ink}`,
              padding: "8px 18px",
            }}
          >
            {cta.map((l, i) => (
              <React.Fragment key={i}>
                {i ? <br /> : null}
                {l}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>

      {body ? (
        <div style={{ position: "absolute", left: 44, right: 300, top: 818, font: `700 30px ${GROTESK}`, lineHeight: 1.2, ...useEnter(30) }}>
          {body}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 44,
          bottom: 70,
          background: C.ink,
          color: C.mint,
          font: `700 40px ${MONO}`,
          letterSpacing: 2,
          padding: "12px 22px",
          transform: "rotate(-2deg)",
          ...useEnter(36, { y: 30 }),
        }}
      >
        ↗ LINK EN LA BIO
      </div>
      <Src style={{ position: "absolute", left: 44, bottom: 16, fontSize: 20, color: C.ink, ...useEnter(44, { y: 10 }) }}>
        Test neutral · gratis · no pedimos el voto
      </Src>
    </>
  );
};

