import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, GROTESK, MONO } from "../theme";

/** Entrada con muelle a partir del fotograma `at` (desplazamiento + opacidad). */
export const useEnter = (at: number, from: { x?: number; y?: number } = { y: 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 15, stiffness: 140 } });
  return {
    opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translate(${(from.x ?? 0) * (1 - s)}px, ${(from.y ?? 0) * (1 - s)}px)`,
  } as React.CSSProperties;
};

/** Sello de goma: cae grande y girado y se asienta. */
export const Stamp: React.FC<{
  at: number;
  style?: React.CSSProperties;
  top?: string;
  children: React.ReactNode;
  rotate?: number;
}> = ({ at, style, top, children, rotate = -9 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 220, mass: 0.7 } });
  if (frame < at) return null;
  const scale = interpolate(s, [0, 1], [2.4, 1]);
  return (
    <div
      style={{
        position: "absolute",
        border: `8px solid ${C.ink}`,
        background: C.mint,
        color: C.ink,
        borderRadius: 14,
        padding: "8px 22px",
        textAlign: "center",
        boxShadow: `6px 6px 0 ${C.ink}`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity: interpolate(s, [0, 0.25], [0, 1], { extrapolateRight: "clamp" }),
        ...style,
      }}
    >
      {top ? <div style={{ font: `700 22px ${MONO}`, letterSpacing: 2, textTransform: "uppercase" }}>{top}</div> : null}
      <div style={{ font: `700 44px ${MONO}`, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1.1 }}>{children}</div>
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ font: `700 24px ${MONO}`, letterSpacing: 2, ...style }}>▸ {children}</div>
);

export const Src: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ font: `500 21px ${MONO}`, color: C.muted, marginTop: 12, ...style }}>{children}</div>
);

export const Tag: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark = true }) => (
  <span
    style={{
      background: dark ? C.ink : C.mint,
      color: dark ? C.paper : C.ink,
      font: `700 22px ${MONO}`,
      padding: "6px 12px",
      letterSpacing: 1,
    }}
  >
    {children}
  </span>
);

export const ChapterTitle: React.FC<{ n: number; title: string; big: boolean }> = ({ n, title, big }) => (
  <div style={{ display: "flex", alignItems: big ? "flex-start" : "baseline", flexDirection: big ? "column" : "row", gap: big ? 0 : 18 }}>
    <span style={{ font: `700 30px ${MONO}`, color: C.deep }}>{String(n + 1).padStart(2, "0")} /</span>
    <span
      style={{
        fontFamily: GROTESK,
        fontWeight: 700,
        fontSize: big ? 120 : 64,
        lineHeight: 0.88,
        letterSpacing: big ? -5 : -2,
        textTransform: "uppercase",
      }}
    >
      {title}
    </span>
  </div>
);
