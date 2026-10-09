import React from "react";
import { Composition } from "remotion";
import { buildReel, FPS, reelFrames } from "./build";
import { IntroPost, partySlides, PartyPost, POST, SLIDE } from "./Carousel";
import { Intro, introFrames } from "./Intro";
import { INTRO } from "./intro-script";
import { Reel } from "./Reel";

/** Partidos de ámbito estatal con escaño: misma plantilla para todos. */
export const PARTIES = ["pp", "psoe", "vox", "sumar", "podemos"];

export const Root: React.FC = () => (
  <>
    <Composition id="post-intro" component={IntroPost} width={POST.width} height={POST.height} fps={FPS} durationInFrames={INTRO.length * SLIDE} />
    {PARTIES.map((id) => (
      <Composition
        key={`post-${id}`}
        id={`post-${id}`}
        component={PartyPost}
        width={POST.width}
        height={POST.height}
        fps={FPS}
        durationInFrames={partySlides(id).count * SLIDE}
        defaultProps={{ partyId: id }}
      />
    ))}
    <Composition id="reel-intro" component={Intro} width={1080} height={1920} fps={FPS} durationInFrames={introFrames()} />
    {PARTIES.map((id) => (
      <Composition
        key={id}
        id={`reel-${id}`}
        component={Reel}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={reelFrames(buildReel(id))}
        defaultProps={{ partyId: id }}
      />
    ))}
  </>
);
