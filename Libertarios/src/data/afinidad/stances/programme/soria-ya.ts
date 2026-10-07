import type { Stance } from "../../types";

/**
 * Soria ¡Ya! — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa Soria ¡Ya! 2026» (elecciones a las Cortes de Castilla y
 * León del 15-3-2026, fechado en febrero de 2026, 80 págs.), enlazado desde
 * soriaya.org/elecciones-cyl-2026/. Es el programa más reciente; no se ha
 * localizado un programa de Soria ¡Ya! para las generales de 2023. Programa
 * centrado en la provincia de Soria (despoblación, sanidad, infraestructuras):
 * ninguno de los 15 asuntos aparece, así que todas las celdas son
 * `sin-posicion`.
 */

const SOURCE = {
  url: "https://soriaya.org/wp-content/uploads/2026/03/Programa-Soria-Ya-2026.pdf",
  title: "Soria ¡Ya! — Programa elecciones autonómicas de Castilla y León 2026",
  year: 2026,
};

const CONTEXT =
  "Programa de las elecciones a las Cortes de Castilla y León 2026; no se ha localizado programa de Soria ¡Ya! para las generales de 2023.";

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "soria-ya",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: { ...SOURCE },
    note: `${CONTEXT} El programa no trata el asunto. Buscado: ${searched}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  noPosition("vivienda-tope-alquiler", "«alquiler», «tensionada», «precio» (solo vivienda pública y mediación en el alquiler)"),
  noPosition("irpf-inflacion", "«IRPF», «deflactar», «inflación», «tramo» (solo deducciones autonómicas por vivienda)"),
  noPosition("jornada-37-5", "«jornada», «horas»"),
  noPosition("amnistia", "«amnistía»"),
  noPosition("nuclear", "«nuclear» (solo un título de FP de medicina nuclear)"),
  noPosition("gasto-defensa", "«militar», «defensa», «OTAN» (solo el centro tecnológico de defensa «Numant-IA» en Soria)"),
  noPosition("impuesto-grandes-fortunas", "«patrimonio» (solo patrimonio cultural), «fortunas»"),
  noPosition("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  noPosition("inmigracion-competencias-cataluna", "«inmigración», «Cataluña»"),
  noPosition("tauromaquia-patrimonio", "«tauromaquia», «toros», «corrida»"),
  noPosition("prostitucion-abolicion", "«prostitución», «proxenetismo», «trata», «explotación sexual»"),
  noPosition("impuesto-banca", "«banca», «bancos», «entidades financieras», «gravamen»"),
  {
    partyId: "soria-ya",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "baja",
      quote:
        "Deducciones del Impuesto de Transmisiones Patrimoniales para compraventa de viviendas por debajo de 200.000 euros en municipios de menos de 10.000 habitantes o de 3.000 si distan menos de 30 kilómetros de la capital de provincia.",
      source: { ...SOURCE, page: "33" },
      note: `${CONTEXT} Apartado «06 Medidas tributarias». Rebaja el ITP (no el IVA) de la compra solo en municipios pequeños: parcial, +1, confianza baja. En la misma página propone un tipo especial del ITP del 0,01 % (4 % por encima de 200.000 €) y una bonificación del AJD cuando un menor de 45 años compra en esas poblaciones su primera vivienda habitual; en la p. 31, deducciones autonómicas en el IRPF por adquisición de la primera vivienda. No menciona el IVA de la vivienda.`,
    },
    record: null,
  },
  noPosition("oficina-anticorrupcion", "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «Fiscalía», «conflicto de intereses», «malversación», «denunciantes», «transparencia»"),
  noPosition("ceuta-embajador-marruecos", "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana»"),
];
