/**
 * Vídeos explicativos (formato «papeleta», FORMATO.md §9): una lista de escenas,
 * cada una con su guion de voz y lo que enseña. `cue` es la palabra del guion
 * con la que aparece cada elemento (se sincroniza con la voz).
 */
export type Src = string;

export type Scene =
  | { kind: "questions"; title: string; items: { text: string; cue: string }[]; stamp?: { text: string; cue: string } }
  | { kind: "vs"; title: string; left: { value: string; label: string; n: number }; right: { value: string; label: string; n: number; cue: string }; source: Src }
  | { kind: "stats"; title: string; items: { value: string; label: string; cue: string }[]; source: Src }
  | { kind: "stamps"; title: string; items: { text: string; cue: string }[]; source: Src }
  | { kind: "donut"; title: string; slices: { label: string; value: number; display: string; color: "ink" | "teal" | "mint"; cue: string }[]; note?: string; source: Src }
  | { kind: "case"; title: string; place: string; figure: string; text: string; cue: string; source: Src }
  | { kind: "provinces"; title: string; value: string; label: string; items: string[]; cue: string; extra?: { value: string; label: string; cue: string }; source: Src }
  | { kind: "headline"; lines: string[]; highlight?: number; sub?: string; subCue?: string }
  | { kind: "axes" }
  | { kind: "partyMap"; title: string; note: string; emptyCue: string; source: Src }
  | { kind: "receipt"; title: string; meta: string[]; lines: ReceiptLine[]; total?: { label: string; amount: string; cue: string }; stamp?: { line: number; text: string; cue: string }; source: Src }
  | { kind: "partyGrid"; title: string; question: string; rows: GridRow[]; source: Src }
  | { kind: "dvhList"; title: string; rows: DvhRow[]; source: Src }
  | { kind: "who" }
  | { kind: "ending"; title: string[]; cta: string[]; body: string; shareTo?: string };

export type ReceiptLine = { label: string; amount: string; cue?: string; strong?: boolean; sub?: boolean; dim?: boolean };
export type GridRow = { partyId: string; promise: "favor" | "contra" | "sin"; vote: "si" | "no" | "abstencion" | "no-vota" | null; cue: string };
export type DvhRow = { partyId: string; topic: string; verdict: string | null; counts: string; cue: string };

export type ExplainerScene = { rail: number; script: string; min: number; scene: Scene };

export type Explainer = {
  id: string;
  header: string;
  rail: string[];
  scenes: ExplainerScene[];
};
