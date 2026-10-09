import type { Chapter } from "./chapters";

/**
 * Lo que dice la voz cuando en pantalla está la cita del programa: un resumen
 * en llano de esa cita, sin añadir nada que no diga. Se escribe a mano por
 * partido y capítulo y se revisa antes de publicar (la cita literal sigue en
 * pantalla). Si falta, la voz dice solo «Esto promete en su programa».
 */
export const PROGRAMME_VOICE: Record<string, Partial<Record<Chapter["key"], string>>> = {
  pp: {
    sueldo: "En su programa promete corregir el IRPF por la inflación, para que no suban los impuestos a la clase media.",
    casa: "En su programa promete derogar la ley de vivienda.",
  },
  psoe: {
    casa: "En su programa promete desarrollar medidas para contener el precio de la vivienda.",
    trabajo: "En su programa promete seguir con el plan piloto para reducir la jornada sin bajar el sueldo.",
  },
  vox: {
    casa: "En su programa promete derogar la ley de vivienda, que según Vox hundirá el alquiler y ampara la ocupación ilegal.",
  },
  sumar: {
    casa: "En su programa promete aplicar el control del alquiler en todas las zonas tensionadas.",
    trabajo: "En su programa promete una jornada máxima de 37 horas y media por ley, sin bajar el sueldo, y llegar después a 32.",
  },
  podemos: {
    casa: "En su programa europeo propone una directiva que limite el alquiler al 30 % de los ingresos del hogar.",
    trabajo: "En su programa europeo propone reducir la jornada a 30 horas.",
  },
};
