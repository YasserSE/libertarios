import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";

/**
 * La «L» con ojos. `look` mueve las pupilas (-1 izquierda, 1 derecha, 0 abajo
 * hacia la papeleta) y `jumpAt` son fotogramas en los que da un saltito
 * (cuando cae un sello).
 */
export const Character: React.FC<{
  x: number;
  y: number;
  size?: number;
  look?: number;
  jumpAt?: number[];
  pose?: "peek" | "point";
}> = ({ x, y, size = 230, look = 0, jumpAt = [], pose = "peek" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const jump = jumpAt.reduce((acc, f) => {
    if (frame < f) return acc;
    const s = spring({ frame: frame - f, fps, config: { damping: 9, stiffness: 180 } });
    return acc + Math.sin(Math.min(s, 1) * Math.PI) * 26;
  }, 0);
  const breathe = Math.sin(frame / 14) * 3;

  // parpadeo cada ~3,5 s
  const t = frame % 105;
  const blink = t > 100 ? interpolate(t, [100, 102, 105], [1, 0.1, 1], { extrapolateRight: "clamp" }) : 1;

  const px = look * 10;
  const py = look === 0 ? 12 : 4;
  const k = size / 230;

  if (pose === "point") {
    const wave = Math.sin(frame / 6) * 8;
    return (
      <svg style={{ position: "absolute", left: x, top: y - jump - breathe }} width={230 * k} height={300 * k} viewBox="0 0 230 300">
        <rect x="40" y="40" width="150" height="150" rx="10" fill={C.ink} />
        <path d="M90 72 v80 h55" stroke={C.teal} strokeWidth="24" fill="none" />
        <circle cx="85" cy="42" r="28" fill={C.paper} stroke={C.ink} strokeWidth="7" />
        <circle cx="148" cy="42" r="28" fill={C.paper} stroke={C.ink} strokeWidth="7" />
        <ellipse cx="79" cy="31" rx="11" ry={11 * blink} fill={C.ink} />
        <ellipse cx="142" cy="31" rx="11" ry={11 * blink} fill={C.ink} />
        <path d={`M40 100 L${0 + wave / 2} ${30 + wave}`} stroke={C.ink} strokeWidth="14" strokeLinecap="round" />
        <path d="M190 120 L225 160" stroke={C.ink} strokeWidth="14" strokeLinecap="round" />
        <path d="M85 190 v70 h-24 M145 190 v70 h24" stroke={C.ink} strokeWidth="15" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg style={{ position: "absolute", left: x, top: y - jump - breathe }} width={230 * k} height={200 * k} viewBox="0 0 230 200">
      <rect x="30" y="50" width="170" height="160" rx="10" fill={C.ink} />
      <path d="M85 85 v80 h60" stroke={C.teal} strokeWidth="26" fill="none" />
      <circle cx="80" cy="55" r="32" fill={C.paper} stroke={C.ink} strokeWidth="7" />
      <circle cx="150" cy="55" r="32" fill={C.paper} stroke={C.ink} strokeWidth="7" />
      <ellipse cx={80 + px} cy={55 + py} rx="12" ry={12 * blink} fill={C.ink} />
      <ellipse cx={150 + px} cy={55 + py} rx="12" ry={12 * blink} fill={C.ink} />
      <path d="M30 150 q-20 10 -10 40 M200 150 q20 10 10 40" stroke={C.ink} strokeWidth="14" fill="none" strokeLinecap="round" />
    </svg>
  );
};
