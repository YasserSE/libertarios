/**
 * Carruseles para publicación (1080×1350). Cada fotograma es una diapositiva:
 *   npx remotion still src/index.ts post-pp out/post/pp-01.png --frame=0   (siguiente: --frame=1000…)
 * (i = número de diapositiva × SLIDE). Reutiliza las piezas del Reel congeladas en su estado final (<Freeze>).
 */
import React from "react";
import { AbsoluteFill, Freeze, useCurrentFrame } from "remotion";
import { buildReel } from "./build";
import { Background, Ballot } from "./components/Ballot";
import { ChapterBeat, DvhBeat, EndingBeat, HookBeat } from "./components/Beats";
import { Character } from "./components/Character";
import { INTRO, INTRO_RAIL } from "./intro-script";
import { explainerClips, sceneTimings } from "./Explainer";
import { EXPLAINERS } from "./explainers";
import { SceneView } from "./components/scenes";
import { Axes, Who } from "./Intro";
import { IntroScreenView } from "./Intro";
import { C, MONO } from "./theme";

export const POST = { width: 1080, height: 1350, top: 110, ballotHeight: 1180 };
const SETTLED = 600; // fotograma en el que todas las animaciones ya han terminado
/** Cada diapositiva ocupa SLIDE fotogramas (Freeze no puede pasar de la duración); se renderiza --frame=i*SLIDE. */
export const SLIDE = 1000;

/* ── Partidos ───────────────────────────────────────────────────────── */

/** Diapositivas de un partido: portada, y por capítulo «programa + voto» y, si hay, «dijo / hizo»; cierre. */
export const partySlides = (partyId: string) => {
  const reel = buildReel(partyId);
  const slides = reel.beats.filter((b) => b.type !== "programme");
  return { reel, slides, count: slides.length };
};

export const PartyPost: React.FC<{ partyId: string }> = ({ partyId }) => {
  const i = Math.floor(useCurrentFrame() / SLIDE);
  const { reel, slides, count } = partySlides(partyId);
  const b = slides[i];
  const rail = [...reel.chapters.map((c) => c.rail), "¿Y TÚ?"];
  const current = b.type === "hook" ? -1 : b.type === "ending" ? reel.chapters.length : b.chapter;
  const ch = "chapter" in b ? reel.chapters[b.chapter] : null;
  return (
    <AbsoluteFill>
      <Background />
      <Freeze frame={SETTLED}>
        <Ballot party={reel.party} rail={rail} current={current} showBadge={b.type !== "hook" && b.type !== "ending"} top={POST.top} height={POST.ballotHeight}>
          {b.type === "hook" ? <HookBeat party={reel.party} /> : null}
          {b.type === "vote" && ch ? <ChapterBeat chapter={ch} n={b.chapter} programme={b.programme} votes={b.votes} /> : null}
          {b.type === "dvh" && ch ? <DvhBeat chapter={ch} n={b.chapter} dvh={b.dvh} frames={300} compact /> : null}
          {b.type === "ending" ? <EndingBeat body="" /> : null}
        </Ballot>
        {b.type === "ending" ? <Character x={760} y={POST.top + 760} pose="point" /> : <Character x={570} y={POST.top - 112} size={200} />}
      </Freeze>
      <PageDots n={count} i={i} />
    </AbsoluteFill>
  );
};

/* ── Presentación ───────────────────────────────────────────────────── */

export const IntroPost: React.FC = () => {
  const slide = Math.floor(useCurrentFrame() / SLIDE);
  const s = INTRO[slide];
  return (
    <AbsoluteFill>
      <Background />
      <Freeze frame={SETTLED}>
        <Ballot rail={INTRO_RAIL} current={s.rail} showBadge={false} header="LIBERTARIOS.EU · QUÉ ES" top={POST.top} height={POST.ballotHeight}>
          <IntroScreenView screen={s.screen} compact />
        </Ballot>
        {s.screen === "ending" ? <Character x={760} y={POST.top + 760} pose="point" /> : <Character x={570} y={POST.top - 112} size={200} />}
      </Freeze>
      <PageDots n={INTRO.length} i={slide} />
    </AbsoluteFill>
  );
};

/* ── Vídeos explicativos: una diapositiva por escena ─────────────────── */

export const ExplainerPost: React.FC<{ id: string }> = ({ id }) => {
  const i = Math.floor(useCurrentFrame() / SLIDE);
  const e = EXPLAINERS[id];
  const s = e.scenes[i];
  const clip = explainerClips(e)?.[i];
  const t = sceneTimings(s.script, clip, 30);
  const ending = s.scene.kind === "ending";
  return (
    <AbsoluteFill>
      <Background />
      <Freeze frame={SETTLED}>
        <Ballot rail={e.rail} current={s.rail} showBadge={false} header={e.header} top={POST.top} height={POST.ballotHeight}>
          <SceneView scene={s.scene.kind === "ending" ? { ...s.scene, body: "" } : s.scene} t={t} Axes={Axes} Who={Who} Ending={EndingBeat} />
        </Ballot>
        {ending ? <Character x={760} y={POST.top + 760} pose="point" /> : <Character x={720} y={POST.top - 112} size={200} />}
      </Freeze>
      <PageDots n={e.scenes.length} i={i} />
    </AbsoluteFill>
  );
};

const PageDots: React.FC<{ n: number; i: number }> = ({ n, i }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
    {Array.from({ length: n }, (_, k) => (
      <span key={k} style={{ width: k === i ? 34 : 14, height: 14, background: k === i ? C.ink : C.paper, border: `3px solid ${C.ink}` }} />
    ))}
    {i < n - 1 ? <span style={{ font: `700 22px ${MONO}`, color: C.ink, marginLeft: 12 }}>DESLIZA →</span> : null}
  </div>
);
