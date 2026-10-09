import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Party } from "../data";
import { BALLOT, C, GROTESK, MONO } from "../theme";

export const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.teal,
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 28px)",
    }}
  />
);

export const PartyBadge: React.FC<{ party: Party; size?: number }> = ({ party, size = 26 }) => (
  <span
    style={{
      background: party.color,
      color: C.white,
      border: `4px solid ${C.ink}`,
      padding: "2px 12px",
      font: `700 ${size}px ${MONO}`,
    }}
  >
    {party.short}
  </span>
);

/**
 * La hoja de la papeleta con cabecera y fila de casillas de progreso.
 * `current` es el índice del capítulo en curso (-1 gancho, chapters.length final).
 * `children` se pinta en el área de contenido (coordenadas relativas a la hoja).
 */
export const Ballot: React.FC<{
  party?: Party;
  rail: string[];
  current: number;
  showBadge: boolean;
  header?: string;
  top?: number;
  height?: number;
  children: React.ReactNode;
}> = ({ party, rail: items, current, showBadge, header = "PAPELETA · GENERALES", top = BALLOT.top, height = BALLOT.height, children }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: BALLOT.left,
        top,
        width: BALLOT.width,
        height,
        background: C.paper,
        border: `6px solid ${C.ink}`,
        boxShadow: `-18px 18px 0 ${C.ink}`,
        color: C.ink,
        fontFamily: GROTESK,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: BALLOT.head,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 34px",
          font: `700 24px ${MONO}`,
          letterSpacing: 1,
          borderBottom: `5px dashed ${C.ink}`,
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "inline-flex",
              width: 44,
              height: 44,
              background: C.teal,
              border: `4px solid ${C.ink}`,
              font: `700 28px ${GROTESK}`,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            L
          </span>
          {header}
        </span>
        {showBadge && party ? <PartyBadge party={party} /> : null}
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: BALLOT.head, bottom: BALLOT.rail }}>{children}</div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: BALLOT.rail,
          borderTop: `5px dashed ${C.ink}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 20px",
        }}
      >
        {items.map((label, i) => (
          <RailItem key={label} label={label} state={i < current ? "done" : i === current ? "now" : "todo"} />
        ))}
      </div>
    </div>
  );
};

const RailItem: React.FC<{ label: string; state: "done" | "now" | "todo" }> = ({ label, state }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tick = state === "todo" ? 0 : state === "done" ? 1 : spring({ frame: frame - 6, fps, config: { damping: 12 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        font: `700 22px ${MONO}`,
        color: state === "todo" ? "rgba(20,26,36,.4)" : C.ink,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          border: `4px solid ${C.ink}`,
          background: state === "done" ? C.ink : state === "now" ? C.mint : C.paper,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M3 13 L9 19 L21 5"
            fill="none"
            stroke={state === "done" ? C.teal : C.ink}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
            strokeDashoffset={30 * (1 - tick)}
          />
        </svg>
      </span>
      {label}
    </div>
  );
};
