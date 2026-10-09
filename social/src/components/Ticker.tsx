import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C, GROTESK, TICKER } from "../theme";

export type WordTiming = { word: string; start: number }; // start en fotogramas, relativo al beat

/** Reparto uniforme mientras no haya voz grabada: ~2,9 palabras/s desde 0,2 s. */
export const evenTimings = (script: string, fps: number): WordTiming[] =>
  script
    .replace(/[«»]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => ({ word, start: Math.round((0.2 + i / 2.9) * fps) }));

const MAX_CHARS = 24;

const chunk = (ws: WordTiming[]) => {
  const out: WordTiming[][] = [];
  let line: WordTiming[] = [];
  let len = 0;
  for (const w of ws) {
    if (line.length && len + w.word.length + 1 > MAX_CHARS) {
      out.push(line);
      line = [];
      len = 0;
    }
    line.push(w);
    len += w.word.length + 1;
    // corta después de un punto o interrogación para que cada frase empiece limpia
    if (/[.?!:]$/.test(w.word)) {
      out.push(line);
      line = [];
      len = 0;
    }
  }
  if (line.length) out.push(line);
  return out;
};

/** Franja negra de subtítulos tipo karaoke bajo la papeleta. */
export const Ticker: React.FC<{ timings: WordTiming[] }> = ({ timings }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = chunk(timings);
  const current = timings.filter((w) => w.start <= frame).length - 1;
  const lineIdx = Math.max(
    0,
    lines.findIndex((l) => l.some((w) => timings.indexOf(w) === current)),
  );
  const line = lines[lineIdx] ?? [];
  // una palabra sigue «activa» unos 0,35 s o hasta que llega la siguiente
  const active = (w: WordTiming, i: number) => {
    const next = timings[i + 1]?.start ?? w.start + fps * 0.35;
    return frame >= w.start && frame < Math.min(next, w.start + fps * 0.6);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: TICKER.top,
        height: TICKER.height,
        background: C.ink,
        display: "flex",
        alignItems: "center",
        padding: "0 56px",
        gap: 18,
        font: `700 60px ${GROTESK}`,
        letterSpacing: -1,
        whiteSpace: "nowrap",
      }}
    >
      {line.map((w) => {
        const i = timings.indexOf(w);
        const said = frame >= w.start;
        const on = active(w, i);
        return (
          <span
            key={i}
            style={{
              color: on ? C.ink : said ? C.paper : "rgba(244,241,232,.3)",
              background: on ? C.mint : "transparent",
              padding: on ? "0 14px" : 0,
              transform: on ? "rotate(-2deg)" : undefined,
              display: "inline-block",
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
