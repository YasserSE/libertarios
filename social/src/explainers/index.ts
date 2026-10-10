import { derecha } from "./derecha";
import { impuestos } from "./impuestos";
import { impuestosPartidos } from "./impuestos-partidos";
import { corrupcionPartidos, inmigracionPartidos, pensionesPartidos, sanidadEducacionPartidos, seguridadPartidos } from "./topic-partidos";
import type { Explainer } from "./types";
import { vivienda } from "./vivienda";
import { viviendaPartidos } from "./vivienda-partidos";

export const EXPLAINERS: Record<string, Explainer> = {
  vivienda,
  derecha,
  impuestos,
  "vivienda-partidos": viviendaPartidos,
  "impuestos-partidos": impuestosPartidos,
  "pensiones-partidos": pensionesPartidos,
  "seguridad-partidos": seguridadPartidos,
  "inmigracion-partidos": inmigracionPartidos,
  "sanidad-educacion-partidos": sanidadEducacionPartidos,
  "corrupcion-partidos": corrupcionPartidos,
};
