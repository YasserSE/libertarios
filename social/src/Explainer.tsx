import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { clipsFor, FPS, words, type VoClip } from "./build";
import { Background, Ballot } from "./components/Ballot";
import { EndingBeat } from "./components/Beats";
import { Character } from "./components/Character";
import { SceneView } from "./components/scenes";
import { evenTimings, Ticker, type WordTiming } from "./components/Ticker";
import { EXPLAINERS } from "./explainers";
import type { Explainer as ExplainerData } from "./explainers/types";
import { Axes, Who } from "./Intro";
import { BALLOT } from "./theme";

/** Toma continua: la pausa natural ya va dentro del audio, así que el respiro es mínimo. */
const LEAD = 0.05;
const TAIL = 0.1;
const ENDING_HOLD = 1.2;

export const explainerClips = (e: ExplainerData) => clipsFor(e.id, e.scenes.map((s) => s.script));

export const sceneFrames = (e: ExplainerData, i: number, clip: VoClip | null | undefined) => {
  const s = e.scenes[i];
  const hold = s.scene.kind === "ending" ? ENDING_HOLD : 0;
  const secs = clip ? Math.max(2.5, LEAD + clip.seconds + TAIL) : Math.max(s.min, words(s.script).length / 2.9 + 0.9);
  return Math.round((secs + hold) * FPS);
};

export const explainerFrames = (id: string) => {
  const e = EXPLAINERS[id];
  const clips = explainerClips(e);
  return e.scenes.reduce((n, _s, i) => n + sceneFrames(e, i, clips?.[i]), 0);
};

export const sceneTimings = (script: string, clip: VoClip | null | undefined, fps: number): WordTiming[] =>
  clip ? clip.words.map((w) => ({ word: w.word, start: Math.round((LEAD + w.t) * fps) })) : evenTimings(script, fps);

export const Explainer: React.FC<{ id: string }> = ({ id }) => {
  const { fps } = useVideoConfig();
  const e = EXPLAINERS[id];
  const clips = explainerClips(e);
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {e.scenes.map((s, i) => {
        const clip = clips?.[i] ?? null;
        const frames = sceneFrames(e, i, clip);
        const start = from;
        from += frames;
        const t = sceneTimings(s.script, clip, fps);
        const ending = s.scene.kind === "ending";
        return (
          <Sequence key={i} from={start} durationInFrames={frames} name={`${i} ${s.scene.kind}`}>
            <Ballot rail={e.rail} current={s.rail} showBadge={false} header={e.header}>
              <SceneView scene={s.scene} t={t} Axes={Axes} Who={Who} Ending={EndingBeat} />
            </Ballot>
            {ending ? (
              <Character x={BALLOT.left + 690} y={BALLOT.top + 940} pose="point" />
            ) : (
              <Character x={BALLOT.left + 650} y={58} look={s.scene.kind === "partyMap" || s.scene.kind === "receipt" ? 1 : 0} />
            )}
            {clip ? (
              <Sequence from={Math.round(LEAD * fps)} layout="none">
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
