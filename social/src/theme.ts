import { loadFont as loadGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

export const C = {
  teal: "#119e83",
  deep: "#0c6f5b",
  ink: "#141a24",
  paper: "#f4f1e8",
  mint: "#c9f2e7",
  white: "#ffffff",
  muted: "#555b66",
};

export const GROTESK = loadGrotesk("normal", { weights: ["500", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const MONO = loadMono("normal", { weights: ["500", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;

/** Papeleta: posición en el lienzo 1080×1920 (deja libre la franja inferior de la interfaz de Instagram). */
export const BALLOT = { left: 70, top: 170, width: 940, height: 1280, head: 96, rail: 96 };
export const TICKER = { top: BALLOT.top + BALLOT.height + 20, height: 120 };
