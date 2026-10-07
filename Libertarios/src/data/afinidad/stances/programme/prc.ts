import type { Stance } from "../../types";

/**
 * Celdas de PROGRAMA del Partido Regionalista de Cantabria (WP3).
 *
 * El PRC no concurrió a las generales de 2023 (acuerdo de su Ejecutiva del
 * 8-6-2023: https://prc.es/web_prc/docs/230608_Ejecutiva_no.pdf). Se usa su
 * programa oficial más reciente: «Programa electoral 2023 · 2027 Cantabria»,
 * de las autonómicas del 28-5-2023 (187 páginas).
 *
 * El PDF original (https://prc.es/programa_electoral_prc.pdf) ya no está en la
 * web del partido (404 el 2026-10-06); se enlaza la copia de la Wayback Machine
 * del 13-5-2023, en plena campaña. Ojo: la captura del 1-6-2023 de la misma URL
 * es un fichero distinto y truncado; la buena es la de mayo.
 *
 * Páginas: número de página del PDF (la paginación impresa va 13 por detrás:
 * pág. PDF 184 = pág. impresa 171).
 */

const SOURCE = {
  url: "https://web.archive.org/web/20230513223924/https://prc.es/programa_electoral_prc.pdf",
  title: "PRC — Programa electoral 2023 · 2027 Cantabria (elecciones autonómicas de 2023)",
  year: 2023,
  archiveUrl: "https://web.archive.org/web/20230513223924/https://prc.es/programa_electoral_prc.pdf",
};

const CONTEXT = "Programa de autonómicas de Cantabria 2023; no concurrió a las generales de 2023. Leído el programa completo (187 págs.).";

function sinPosicion(questionId: string, searched: string): Stance {
  return {
    partyId: "prc",
    questionId,
    programme: {
      position: 0,
      status: "sin-posicion",
      confidence: "media",
      quote: "",
      source: { ...SOURCE },
      note: `No trata el asunto. ${CONTEXT} Buscado: ${searched}.`,
    },
    record: null,
  };
}

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "alquiler, precio, renta, tope, limitar, zonas tensionadas (págs. 181-184: parque público de alquiler, VPO con precio máximo tasado y «mecanismos legales y constitucionales para controlar la especulación», pero nada sobre limitar la renta de contratos privados)",
  ),
  sinPosicion(
    "irpf-inflacion",
    "IRPF, deflactar, inflación, tramos (pág. 79 propone «ajustar la tarifa autonómica del impuesto para atenuar la excesiva progresividad», que no es la actualización anual con la inflación)",
  ),
  sinPosicion("jornada-37-5", "jornada, 37,5, horas semanales, tiempo de trabajo"),
  sinPosicion("amnistia", "amnistía, procés, Cataluña"),
  sinPosicion("nuclear", "nuclear, centrales nucleares, cierre"),
  sinPosicion("gasto-defensa", "defensa (solo en sentido genérico), militar, OTAN, ejército, gasto en defensa"),
  sinPosicion(
    "impuesto-grandes-fortunas",
    "grandes fortunas, impuesto de solidaridad, patrimonio. Duda: en la pág. 78 propone «bonificar al 100 por ciento el Impuesto sobre Patrimonio en Cantabria» para evitar la deslocalización fiscal; trata el impuesto autonómico, no un impuesto estatal específico sobre patrimonios de más de 10 millones, así que no se codifica para no inferir",
  ),
  {
    partyId: "prc",
    questionId: "okupacion-desalojo",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote:
        "Proceder al desalojo de la vivienda ocupada en situación de flagrante delito o, en caso de que no lo sea, en 24 horas por parte de la Policía.",
      source: { ...SOURCE, page: "184" },
      note:
        `${CONTEXT} Apartado «El problema de la ocupación de vivienda» (págs. 183-184; pág. impresa 171), entre las medidas que el PRC dice haber impulsado en el Parlamento de Cantabria para reclamar al Gobierno de España. Confianza media: pide desalojo en 24 horas por la Policía, no por orden judicial como dice el enunciado.`,
    },
    record: null,
  },
  sinPosicion("inmigracion-competencias-cataluna", "competencias de inmigración, Generalitat, Cataluña"),
  sinPosicion("tauromaquia-patrimonio", "tauromaquia, toros, taurino"),
  sinPosicion("prisiones-agentes-autoridad", "prisiones, penitenciario, funcionarios de prisiones, agentes de la autoridad (pág. 161 solo menciona una oficina judicial en el Centro Penitenciario de El Dueso)"),
  {
    partyId: "prc",
    questionId: "prostitucion-abolicion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Los regionalistas nos posicionamos a favor de desarrollar políticas de prevención para atajar las causas de la explotación sexual y prostitución, estableciendo medidas que disuadan la demanda, medidas que contribuyan a la reducción de la oferta y disminución de las redes de trata y tráfico de mujeres.",
      source: { ...SOURCE, page: "140" },
      note:
        `${CONTEXT} Apartado «La violencia machista, una lacra a erradicar» (pág. impresa 127). Sigue: «la prostitución es una forma de violencia de género», con planes de alternativa habitacional y recuperación para las mujeres. Postura abolicionista que busca disuadir la demanda, pero sin hablar del Código Penal, de sancionar al cliente o al proxeneta: +1. Guion de partición de línea quitado («ata-jar»).`,
    },
    record: null,
  },
  sinPosicion("impuesto-banca", "banca, bancos, entidades financieras, gravamen, beneficios extraordinarios"),
  sinPosicion("registro-lobbies", "lobbies, grupos de interés, grupos de presión, registro de transparencia, huella normativa"),
  {
    partyId: "prc",
    questionId: "iva-primera-vivienda",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "En el caso del Impuesto de Transmisiones Patrimoniales y Actos Jurídicos Documentados y con el fin de facilitar el acceso a la adquisición de primera vivienda habitual, proponemos tipos impositivos reducidos para jóvenes menores de 38 años, familias numerosas y personas con discapacidad para las compras de vivienda habitual.",
      source: { ...SOURCE, page: "79" },
      note:
        `${CONTEXT} Pág. impresa 66. Rebaja los impuestos autonómicos de la compra de la primera vivienda (ITP y AJD) para algunos colectivos; no habla del IVA de la vivienda nueva: parcial, +1. En la pág. 81 concreta ampliar de 30 a 38 años la edad para el tipo reducido del 5 % del ITP. Se han quitado los guiones de partición de línea («Documenta-dos», «propo-nemos»).`,
    },
    record: null,
  },
];
