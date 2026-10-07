import type { Stance } from "../../types";

/**
 * Agrupación Socialista Gomera — celdas de PROGRAMA (WP3).
 *
 * PENDIENTE: no se ha localizado un programa electoral oficial publicado por
 * ASG (2023 ni posterior). Buscado el 2026-10-06: búsquedas web «Agrupación
 * Socialista Gomera programa electoral 2023 pdf» y «ASG Casimiro Curbelo
 * programa electoral Parlamento de Canarias 2023»; dominios probables
 * (asgomera.org, agrupacionsocialistagomera.org) no resuelven. Solo aparecen
 * el acuerdo de gobernabilidad CC-PP-ASG de 8-6-2023 (un pacto de gobierno,
 * no un programa, y por tanto no válido como fuente) y un «Programa Electoral
 * La Gomera» alojado en coalicioncanaria.org, que es de Coalición Canaria, no
 * de ASG. Ninguna celda puntúa hasta que aparezca el programa.
 */

const QUESTIONS = ["vivienda-tope-alquiler","irpf-inflacion","jornada-37-5","amnistia","nuclear","gasto-defensa","impuesto-grandes-fortunas","okupacion-desalojo","iva-primera-vivienda","inmigracion-competencias-cataluna","tauromaquia-patrimonio","prisiones-agentes-autoridad","prostitucion-abolicion","impuesto-banca","registro-lobbies"] as const;

const NOTE =
  "Pendiente: no se ha localizado un programa electoral oficial de ASG (búsqueda web del 2026-10-06; sin web oficial accesible). El acuerdo de gobierno CC-PP-ASG de 2023 no es un programa y no se usa.";

export const stances: Stance[] = QUESTIONS.map((questionId) => ({
  partyId: "asg",
  questionId,
  programme: {
    position: 0,
    status: "pendiente",
    confidence: "media",
    quote: "",
    source: { url: "", title: "" },
    note: NOTE,
  },
  record: null,
}));
