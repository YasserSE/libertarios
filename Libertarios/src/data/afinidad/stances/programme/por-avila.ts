import type { Stance } from "../../types";

/**
 * Por Ávila (XAV) — celdas de PROGRAMA (WP3).
 *
 * Fuente: «Programa electoral. Elecciones Cortes Generales 23 de julio de
 * 2023» (20 págs.), en poravila.es (versión «actualizado 3 de julio»). Para las
 * autonómicas de 2026 solo se ha localizado un díptico, no un programa. Páginas
 * = página del PDF. Cada cita se ha cotejado con el texto de su página.
 */

const SOURCE = {
  url: "https://poravila.es/wp-content/uploads/2023/07/XAV_programaCortesGenerales2023actualizado3dejulio23.OK_.pdf",
  title: "Por Ávila — Programa electoral, elecciones Cortes Generales 23 de julio de 2023",
  year: 2023,
};

const noPosition = (questionId: string, searched: string): Stance => ({
  partyId: "por-avila",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: { ...SOURCE },
    note: `Programa de las generales de 2023. El programa no trata el asunto. Buscado: ${searched}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  noPosition("vivienda-tope-alquiler", "«alquiler», «vivienda», «tensionada»"),
  noPosition("irpf-inflacion", "«IRPF», «deflactar», «inflación» (solo rebaja del IRPF en municipios de menos de 10.000 habitantes)"),
  noPosition("jornada-37-5", "«jornada», «horas»"),
  noPosition("amnistia", "«amnistía», «independentismo» (solo «Defendemos la unidad territorial de España», sin mención a la amnistía)"),
  noPosition("nuclear", "«nuclear», «energía»"),
  noPosition("gasto-defensa", "«defensa», «militar», «OTAN» (solo pide una Unidad Militar de Emergencias en Ávila)"),
  noPosition("impuesto-grandes-fortunas", "«patrimonio», «fortunas», «impuesto»"),
  noPosition("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  noPosition("inmigracion-competencias-cataluna", "«inmigración», «Cataluña», «competencias»"),
  noPosition("tauromaquia-patrimonio", "«tauromaquia», «toros», «corrida»"),
  noPosition("prostitucion-abolicion", "«prostitución», «proxenetismo», «trata», «explotación sexual»"),
  noPosition("impuesto-banca", "«banca», «bancos», «entidades financieras», «gravamen»"),
  noPosition("iva-primera-vivienda", "«IVA», «vivienda», «primera vivienda», «compra», «Transmisiones», «impuestos»"),
  noPosition("oficina-anticorrupcion", "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «Fiscalía», «conflicto de intereses», «malversación», «denunciantes», «transparencia»"),
  noPosition("ceuta-embajador-marruecos", "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana» (solo «Defendemos la unidad territorial de España», p. 19, sin mención a Ceuta, Melilla ni Marruecos)"),
];
