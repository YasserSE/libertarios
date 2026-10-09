import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clipsFor, VO_LEAD, voiceFrames, type VoClip } from "./build";
import { Background, Ballot } from "./components/Ballot";
import { EndingBeat } from "./components/Beats";
import { Label, Stamp, useEnter } from "./components/bits";
import { Character } from "./components/Character";
import { evenTimings, Ticker, type WordTiming } from "./components/Ticker";
import { INTRO, INTRO_RAIL } from "./intro-script";
import { BALLOT, C, GROTESK, MONO } from "./theme";

const HEADER = "LIBERTARIOS.EU · QUÉ ES";

export const introClips = () => clipsFor("intro", INTRO.map((s) => s.script));
export const introFrames = () => {
  const clips = introClips();
  return INTRO.reduce((n, s, i) => n + voiceFrames(s.script, clips?.[i], s.min), 0);
};

/** Fotograma (relativo al beat) en que se dice la primera palabra que empieza por `w`, o `fallback`. */
const at = (t: WordTiming[], w: string, fallback: number) =>
  t.find((x) => x.word.toLowerCase().replace(/[^\p{L}]/gu, "").startsWith(w))?.start ?? fallback;

/* ── Pantallas ──────────────────────────────────────────────────────── */

const Hook: React.FC<{ t: WordTiming[] }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sway = Math.sin(frame / 9) * 120;
  const stampAt = at(t, "mala", 40);
  const line = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  return (
    <>
      <div style={{ position: "absolute", left: 44, right: 44, top: 60, font: `700 108px ${GROTESK}`, lineHeight: 0.92, letterSpacing: -4, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
        ¿Izquierda
        <br />o derecha?
      </div>
      <div style={{ position: "absolute", left: 44, right: 44, top: 470, opacity: line }}>
        <div style={{ display: "flex", justifyContent: "space-between", font: `700 30px ${MONO}`, marginBottom: 18 }}>
          <span>← IZQUIERDA</span>
          <span>DERECHA →</span>
        </div>
        <div style={{ height: 10, background: C.ink, transform: `scaleX(${line})` }} />
        <div
          style={{
            position: "absolute",
            top: 52,
            left: `calc(50% + ${frame < stampAt ? sway : 0}px - 22px)`,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: C.teal,
            border: `6px solid ${C.ink}`,
          }}
        />
      </div>
      <Stamp at={stampAt} rotate={-7} style={{ left: 160, top: 690 }}>
        <span style={{ fontSize: 64 }}>Mala pregunta</span>
      </Stamp>
    </>
  );
};

const Slider: React.FC<{ label: string; sub: string; enterAt: number; to: number }> = ({ label, sub, enterAt, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - enterAt - 10, fps, config: { damping: 12 } });
  return (
    <div style={{ marginTop: 44, ...useEnter(enterAt) }}>
      <div style={{ font: `700 64px ${GROTESK}`, letterSpacing: -2, textTransform: "uppercase" }}>{label}</div>
      <div style={{ font: `500 28px ${GROTESK}`, marginTop: 4 }}>{sub}</div>
      <div style={{ display: "flex", justifyContent: "space-between", font: `700 24px ${MONO}`, marginTop: 26 }}>
        <span>DECIDE EL ESTADO</span>
        <span>DECIDES TÚ</span>
      </div>
      <div style={{ position: "relative", height: 10, background: C.ink, marginTop: 12 }}>
        <div
          style={{
            position: "absolute",
            top: -18,
            left: `calc(${interpolate(s, [0, 1], [50, to])}% - 23px)`,
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: C.teal,
            border: `6px solid ${C.ink}`,
          }}
        />
      </div>
    </div>
  );
};

const Axes: React.FC<{ t: WordTiming[] }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 44, right: 44, top: 50, font: `700 76px ${GROTESK}`, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
      No es una línea.
      <br />
      <span style={{ background: C.teal, border: `5px solid ${C.ink}`, padding: "0 12px", display: "inline-block", marginTop: 14, lineHeight: 1 }}>Son dos.</span>
    </div>
    <div style={{ position: "absolute", left: 44, right: 44, top: 290 }}>
      <Slider label="Tu dinero" sub="Impuestos, negocios, precios, contratos" enterAt={at(t, "dinero", 40)} to={85} />
      <Slider label="Tu vida" sub="Qué dices, qué consumes, con quién vives" enterAt={at(t, "vida", 70)} to={85} />
    </div>
  </>
);

/**
 * El mismo cuadrante que la web (InteractiveQuadrant.tsx): economía en
 * horizontal (intervención ← → libre mercado), sociedad en vertical (control
 * abajo, libertad arriba). Esquinas: Liberal social (arriba izq.), Libertario
 * (arriba der.), Autoritario de izquierda (abajo izq.), Autoritario de derecha
 * (abajo der.). Cada esquina se enciende cuando la voz la nombra.
 */
const Quadrant: React.FC<{ t: WordTiming[] }> = ({ t }) => {
  const cells = [
    { name: "LIBERAL SOCIAL", sub: "libre en tu vida,\nno en tu dinero", at: at(t, "liberal", 40), bg: "#d9ecf7" },
    { name: "LIBERTARIO", sub: "libre en las dos", at: at(t, "libertario", 200), bg: C.teal },
    { name: "AUTORITARIO DE IZQUIERDA", sub: "el Estado decide\nen las dos", at: at(t, "izquierda", 140), bg: "#f6dedb" },
    { name: "AUTORITARIO DE DERECHA", sub: "libre en tu dinero,\nno en tu vida", at: at(t, "derecha", 90), bg: "#e4e1d8" },
  ];
  const size = 370;
  const left = 130;
  const top = 200;
  const axis: React.CSSProperties = { position: "absolute", font: `700 22px ${MONO}`, whiteSpace: "nowrap" };
  return (
    <>
      <div style={{ position: "absolute", left: 44, top: 40, font: `700 64px ${GROTESK}`, letterSpacing: -2, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
        Cuatro esquinas
      </div>
      <div style={{ ...axis, left, width: size * 2, top: top - 34, textAlign: "center" }}>↑ LIBERTAD SOCIAL · TU VIDA</div>
      <div style={{ position: "absolute", left, top, width: size * 2, height: size * 2, display: "grid", gridTemplateColumns: "1fr 1fr", border: `6px solid ${C.ink}` }}>
        {cells.map((c, i) => (
          <QuadCell key={c.name} {...c} border={i} />
        ))}
      </div>
      <div style={{ ...axis, left, width: size * 2, top: top + size * 2 + 12, textAlign: "center" }}>↓ CONTROL SOCIAL</div>
      <div style={{ ...axis, left: left - 64, top, height: size * 2, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ transform: "rotate(-90deg)" }}>INTERVENCIÓN</span>
      </div>
      <div style={{ ...axis, left: left + size * 2 + 22, top, height: size * 2, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ transform: "rotate(90deg)" }}>LIBRE MERCADO · TU DINERO</span>
      </div>
    </>
  );
};

const QuadCell: React.FC<{ name: string; sub: string; at: number; bg: string; border: number }> = ({ name, sub, at: a, bg, border }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - a, fps, config: { damping: 13 } });
  const lit = frame >= a;
  return (
    <div
      style={{
        background: lit ? bg : C.paper,
        borderRight: border % 2 === 0 ? `4px solid ${C.ink}` : undefined,
        borderBottom: border < 2 ? `4px solid ${C.ink}` : undefined,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 26,
      }}
    >
      <div style={{ opacity: s, transform: `scale(${interpolate(s, [0, 1], [1.3, 1])})`, transformOrigin: "left center" }}>
        <div style={{ font: `700 ${name.length > 14 ? 36 : name.length > 10 ? 42 : 52}px ${GROTESK}`, letterSpacing: -1.5, lineHeight: 1 }}>{name}</div>
        <div style={{ font: `500 26px ${GROTESK}`, marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.2 }}>{sub}</div>
      </div>
    </div>
  );
};

const Who: React.FC<{ t: WordTiming[] }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 44, right: 44, top: 50, font: `700 84px ${GROTESK}`, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
      Qué es
      <br />
      libertarios.eu
    </div>
    <Stamp at={at(t, "partido", 30)} rotate={-6} style={{ left: 44, top: 330 }}>
      <span style={{ fontSize: 56 }}>Sin partido</span>
    </Stamp>
    <Stamp at={at(t, "voto", 60)} rotate={4} style={{ right: 44, top: 500 }}>
      <span style={{ fontSize: 50 }}>No pide el voto</span>
    </Stamp>
    <Stamp at={at(t, "ideas", 90)} rotate={-3} style={{ left: 60, top: 690 }}>
      <span style={{ fontSize: 50 }}>Ideas a la vista</span>
    </Stamp>
    <Stamp at={at(t, "datos", 120)} rotate={6} style={{ right: 70, top: 870 }}>
      <span style={{ fontSize: 56 }}>Con datos</span>
    </Stamp>
  </>
);

const Inside: React.FC<{ t: WordTiming[] }> = ({ t }) => {
  const items = [
    { k: "test", title: "Test ideológico", sub: "Dónde estás en el mapa de cuatro esquinas.", fb: 30 },
    { k: "medidas", title: "Medidas, con datos", sub: "Qué buscan, qué dicen los datos y qué se discute.", fb: 70 },
    { k: "neutral", title: "¿A quién votar?", sub: "Tus ideas frente a programas y votaciones. Neutral.", fb: 110 },
  ];
  return (
    <>
      <div style={{ position: "absolute", left: 44, top: 50, font: `700 84px ${GROTESK}`, letterSpacing: -3, textTransform: "uppercase", ...useEnter(0, { x: -60 }) }}>
        Qué hay dentro
      </div>
      <div style={{ position: "absolute", left: 44, right: 44, top: 210, display: "flex", flexDirection: "column", gap: 34 }}>
        {items.map((it, i) => (
          <Card key={it.k} n={i + 1} title={it.title} sub={it.sub} enterAt={at(t, it.k, it.fb)} />
        ))}
      </div>
    </>
  );
};

const Card: React.FC<{ n: number; title: string; sub: string; enterAt: number }> = ({ n, title, sub, enterAt }) => (
  <div style={{ border: `5px solid ${C.ink}`, background: C.white, boxShadow: `-10px 10px 0 ${C.ink}`, padding: "26px 30px", display: "flex", gap: 26, alignItems: "center", ...useEnter(enterAt, { x: 80, y: 0 }) }}>
    <span style={{ font: `700 60px ${MONO}`, background: C.teal, border: `4px solid ${C.ink}`, padding: "0 16px" }}>{n}</span>
    <div>
      <div style={{ font: `700 48px ${GROTESK}`, letterSpacing: -1 }}>{title}</div>
      <div style={{ font: `500 28px ${GROTESK}`, marginTop: 6, lineHeight: 1.2 }}>{sub}</div>
    </div>
  </div>
);

/** Una pantalla suelta (para el carrusel), con los tiempos de su voz si los hay. */
export const IntroScreenView: React.FC<{ screen: (typeof INTRO)[number]["screen"]; compact?: boolean }> = ({ screen, compact }) => {
  const { fps } = useVideoConfig();
  const i = INTRO.findIndex((s) => s.screen === screen);
  const clip = introClips()?.[i];
  const lead = Math.round(VO_LEAD * fps);
  const t = clip ? clip.words.map((w) => ({ word: w.word, start: lead + Math.round(w.t * fps) })) : evenTimings(INTRO[i].script, fps);
  if (screen === "hook") return <Hook t={t} />;
  if (screen === "axes") return <Axes t={t} />;
  if (screen === "quadrant") return <Quadrant t={t} />;
  if (screen === "who") return <Who t={t} />;
  if (screen === "inside") return <Inside t={t} />;
  return <EndingBeat title={["¿Y tú,", "dónde", "estás?"]} cta={["Haz el", "test"]} body={compact ? "" : "20 preguntas y tu sitio en el mapa de cuatro esquinas."} />;
};

/* ── Composición ────────────────────────────────────────────────────── */

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const clips = introClips();
  const lead = Math.round(VO_LEAD * fps);
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {INTRO.map((s, i) => {
        const clip: VoClip | null = clips?.[i] ?? null;
        const frames = voiceFrames(s.script, clip, s.min);
        const start = from;
        from += frames;
        const t = clip ? clip.words.map((w) => ({ word: w.word, start: lead + Math.round(w.t * fps) })) : evenTimings(s.script, fps);
        return (
          <Sequence key={i} from={start} durationInFrames={frames} name={`${i} ${s.screen}`}>
            <Ballot rail={INTRO_RAIL} current={s.rail} showBadge={false} header={HEADER}>
              {s.screen === "hook" ? <Hook t={t} /> : null}
              {s.screen === "axes" ? <Axes t={t} /> : null}
              {s.screen === "quadrant" ? <Quadrant t={t} /> : null}
              {s.screen === "who" ? <Who t={t} /> : null}
              {s.screen === "inside" ? <Inside t={t} /> : null}
              {s.screen === "ending" ? <EndingBeat title={["¿Y tú,", "dónde", "estás?"]} cta={["Haz el", "test"]} body="20 preguntas y tu sitio en el mapa de cuatro esquinas." /> : null}
            </Ballot>
            {s.screen === "ending" ? (
              <Character x={BALLOT.left + 690} y={BALLOT.top + 940} pose="point" />
            ) : (
              <Character x={BALLOT.left + 500} y={58} look={s.screen === "quadrant" ? 1 : 0} />
            )}
            {clip ? (
              <Sequence from={lead} layout="none">
                <Audio src={staticFile(clip.file)} />
              </Sequence>
            ) : null}
            <Ticker timings={t} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

