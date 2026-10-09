import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { beatFrames, buildReel, voFor, VO_LEAD, type Beat } from "./build";
import { Background, Ballot } from "./components/Ballot";
import { ChapterBeat, DvhBeat, EndingBeat, HookBeat } from "./components/Beats";
import { Character } from "./components/Character";
import { evenTimings, Ticker } from "./components/Ticker";
import { BALLOT } from "./theme";

export type ReelProps = { partyId: string };

const chapterOf = (b: Beat, total: number) =>
  b.type === "hook" ? -1 : b.type === "ending" ? total : b.chapter;

export const Reel: React.FC<ReelProps> = ({ partyId }) => {
  const { fps } = useVideoConfig();
  const reel = buildReel(partyId);
  const vo = voFor(reel);
  const lead = Math.round(VO_LEAD * fps);
  let from = 0;

  return (
    <AbsoluteFill>
      <Background />
      {reel.beats.map((b, i) => {
        const clip = vo?.[i] ?? null;
        const frames = beatFrames(b, clip);
        const timings = clip
          ? clip.words.map((w) => ({ word: w.word, start: lead + Math.round(w.t * fps) }))
          : evenTimings(b.script, fps);
        const start = from;
        from += frames;
        const current = chapterOf(b, reel.chapters.length);
        const ch = current >= 0 && current < reel.chapters.length ? reel.chapters[current] : null;
        const stampAt = b.type === "vote" ? [14] : b.type === "dvh" ? [Math.round(frames * 0.66)] : [];

        return (
          <Sequence key={i} from={start} durationInFrames={frames} name={`${i} ${b.type}`}>
            <Ballot party={reel.party} rail={[...reel.chapters.map((c) => c.rail), "¿Y TÚ?"]} current={current} showBadge={b.type !== "hook" && b.type !== "ending"}>
              {b.type === "hook" ? <HookBeat party={reel.party} /> : null}
              {b.type === "programme" && ch ? <ChapterBeat chapter={ch} n={b.chapter} programme={b.programme} votes={null} /> : null}
              {b.type === "vote" && ch ? <ChapterBeat chapter={ch} n={b.chapter} programme={b.programme} votes={b.votes} /> : null}
              {b.type === "dvh" && ch ? <DvhBeat chapter={ch} n={b.chapter} dvh={b.dvh} frames={frames} /> : null}
              {b.type === "ending" ? <EndingBeat /> : null}
            </Ballot>
            {b.type === "ending" ? (
              <Character x={BALLOT.left + 690} y={BALLOT.top + 940} pose="point" />
            ) : (
              <Character x={BALLOT.left + 500} y={58} look={b.type === "dvh" ? 1 : 0} jumpAt={stampAt} />
            )}
            {clip ? (
              <Sequence from={lead} layout="none">
                <Audio src={staticFile(clip.file)} />
              </Sequence>
            ) : null}
            <Ticker timings={timings} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
