import { ArrowLeftRight, Check, CircleDashed, Contrast } from "lucide-react";
import type { DvhVerdict } from "@/lib/afinidad/dvh";

/* Icono y tono de cada etiqueta de «Dijeron vs. hicieron», compartidos por la
 * página propia, el resultado, la ficha y la portada. */

// «No lo hicieron»: un círculo vacío (no ocurrió), no una cruz, que leería
// como «mal».
export const VERDICT_ICON = { cumple: Check, contradice: ArrowLeftRight, parcial: Contrast, "no-hecho": CircleDashed } as const;

/** Tono de cada etiqueta en las barras: la misma tinta a distinta intensidad. */
export const VERDICT_FILL: Record<DvhVerdict, string> = {
  cumple: "bg-foreground/75",
  contradice: "bg-foreground/50",
  parcial: "bg-foreground/30",
  "no-hecho": "bg-foreground/15",
};
