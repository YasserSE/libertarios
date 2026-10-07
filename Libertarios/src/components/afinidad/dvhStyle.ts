import { ArrowLeftRight, Check, CircleDashed, Contrast } from "lucide-react";
import type { DvhVerdict } from "@/lib/afinidad/dvh";

/* Icono y tono de cada etiqueta de «Dijeron vs. hicieron», compartidos por la
 * página propia, el resultado, la ficha y la portada. */

// «No lo hicieron»: un círculo vacío (no ocurrió), no una cruz, que leería
// como «mal».
export const VERDICT_ICON = { cumple: Check, contradice: ArrowLeftRight, parcial: Contrast, "no-hecho": CircleDashed } as const;

/**
 * Color de cada etiqueta. Cuatro tonos distintos para que se distingan de un
 * vistazo (petición del dueño); el icono y el texto siguen al lado para quien
 * no distingue colores. Mismo color para todos los partidos: el color es de
 * la etiqueta, nunca del partido.
 */
export const VERDICT_FILL: Record<DvhVerdict, string> = {
  cumple: "bg-emerald-500",
  parcial: "bg-amber-400",
  contradice: "bg-red-500",
  "no-hecho": "bg-violet-500",
};

/** Insignia: fondo suave, borde y texto del mismo tono (claro y oscuro). */
export const VERDICT_BADGE: Record<DvhVerdict, string> = {
  cumple:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  parcial:
    "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  contradice:
    "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
  "no-hecho":
    "border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
};

/** Icono suelto (nodo de la línea de tiempo, chips de filtro). */
export const VERDICT_ICON_COLOR: Record<DvhVerdict, string> = {
  cumple: "text-emerald-600 dark:text-emerald-400",
  parcial: "text-amber-600 dark:text-amber-400",
  contradice: "text-red-600 dark:text-red-400",
  "no-hecho": "text-violet-600 dark:text-violet-400",
};
