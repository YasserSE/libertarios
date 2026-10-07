import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de EH Bildu. WP3.
 *
 * Fuente: «Compromiso de Euskal Herria Bildu», documento programático de EH
 * Bildu para las generales del 23-7-2023 (16 páginas, en castellano),
 * publicado en ehbildu.eus y todavía en línea. Es el único texto de
 * programa para el 23-J que se ha encontrado en la web del partido; la copia
 * que difundió la prensa (elnacional.cat) es el mismo documento. Es breve:
 * la mayoría de las preguntas no se tratan y quedan `sin-posicion`.
 *
 * Páginas: página del PDF (el documento no lleva numeración impresa).
 */

const PROGRAMA: Source = {
  url: "https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf",
  title: "Compromiso de Euskal Herria Bildu (elecciones generales 23-J 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230726063554/https://ehbildu.eus/dokumentuak/23J-COMPROMISO-DE-EUSKAL-HERRIA-BILDU.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "eh-bildu",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Leído íntegro el documento (16 páginas); buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "eh-bildu",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote:
        "aprobar la Ley de Vivienda que limita los alquileres, declara zonas tensionadas y pone coto a los fondos buitre",
      source: at("2"),
      note: "Figura en la lista de logros de la legislatura anterior («Todo esto y mucho más hemos conseguido»), no como compromiso nuevo: respalda expresamente la limitación de alquileres en zonas tensionadas, de ahí confianza media. En la p. 4 propone además recuperar la prórroga automática de los alquileres «manteniendo condiciones y cuantías de renta».",
    },
    record: null,
  },
  sinPosicion("irpf-inflacion", "«IRPF», «deflact», «tramos». Solo propone actualizar el IPREM con el IPC (p. 7), no la tarifa del IRPF"),
  {
    partyId: "eh-bildu",
    questionId: "jornada-37-5",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "media",
      quote:
        "Reducción de la jornada laboral hasta las 32 horas semanales sin reducción salarial ni modificación de condiciones, respondiendo a la exigencia de la mayoría sindical vasca.",
      source: at("3"),
      note: "Propone ir más allá de las 37,5 horas (32) y sin reducción de salario: a favor de reducir la jornada legal. Confianza media porque la cifra no es la del enunciado.",
    },
    record: null,
  },
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana». No menciona Marruecos, Ceuta, Melilla ni el Sáhara; «soberanía» solo se refiere a Euskal Herria (pp. 1, 14, 16) y en migración pide el fin de las devoluciones en caliente y vías seguras en el Bidasoa (p. 11)",
  ),
  sinPosicion("amnistia", "«amnist», «Cataluña», «represión»"),
  sinPosicion("nuclear", "«nuclear», «centrales». El apartado de emergencia climática (p. 9) solo habla de renovables"),
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitución», «proxenet», «trata», «explotación sexual», «abolición». El apartado feminista (p. 10) habla de la violencia machista y del «derecho a decidir sobre nuestros cuerpos», sin mencionar la prostitución",
  ),
  sinPosicion("gasto-defensa", "«militar», «defensa», «OTAN», «armamento»"),
  {
    partyId: "eh-bildu",
    questionId: "impuesto-grandes-fortunas",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Aumentar la carga impositiva y convertir en permanentes los impuestos a la banca, energéticas y grandes fortunas, respetando la competencia y capacidad de nuestras haciendas forales en la gestión y recaudación de los mismos.",
      source: at("8"),
      note: "Hacer permanente el impuesto a las grandes fortunas, con gestión foral; no fija el umbral de 10 millones del enunciado: confianza media. Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): crear o mantener un impuesto a las grandes fortunas sin decir que sea estatal o sin umbral es +1 (antes +2).",
    },
    record: null,
  },
  sinPosicion("okupacion-desalojo", "«ocupación», «okupa», «desalojo», «desahucio»"),
  {
    partyId: "eh-bildu",
    questionId: "impuesto-banca",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Aumentar la carga impositiva y convertir en permanentes los impuestos a la banca, energéticas y grandes fortunas, respetando la competencia y capacidad de nuestras haciendas forales en la gestión y recaudación de los mismos.",
      source: at("8"),
      note: "Apartado «Política fiscal y desarrollo económico» (la misma frase se cita en «impuesto-grandes-fortunas»). Quiere subir y hacer permanente el impuesto a la banca, pero sin las cifras del enunciado (duplicar el gravamen y gravar al 75 % los beneficios extraordinarios): dirección clara sin la medida concreta, +1. En la p. 2 cita como logro «aprobar los impuestos a la Banca, las eléctricas y las grandes fortunas».",
    },
    record: null,
  },
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «fiscalía», «conflicto de intereses», «malversación», «denunciantes», «transparencia». Ninguna aparece; el único «mecanismo externo e independiente» que propone es de supervisión de las actuaciones policiales (p. 12)",
  ),
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "«Cataluña», «inmigración». Pide para Euskadi y Navarra la transferencia de «Migración» y de «Puertos y aeropuertos» (pp. 15-16), pero nada sobre Cataluña; no se extrapola",
  ),
  sinPosicion("tauromaquia-patrimonio", "«tauromaquia», «toros», «corridas»"),
  sinPosicion(
    "iva-primera-vivienda",
    "«IVA», «superreducido», «primera vivienda», «compra», «adquisición», «Transmisiones», «fiscal» junto a «vivienda». El IVA superreducido solo se pide para productos de higiene menstrual (p. 6)",
  ),
];
