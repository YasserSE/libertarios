import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Unión del Pueblo Navarro (UPN). WP3.
 *
 * Fuente: programa oficial de UPN para las generales del 23-7-2023
 * («Programa-Generales-23J_V2-1.pdf», 6 páginas, en castellano), publicado en
 * upn.org. En 2023 UPN se presentó en solitario, no en coalición con el PP
 * (Navarra Suma se disolvió en 2022): el propio documento habla de «Los
 * diputados y senadores de UPN» y no menciona ninguna coalición. Es un
 * programa breve, centrado en Navarra, y la mayoría de las preguntas no se
 * tratan.
 *
 * Páginas: página del PDF (coincide con la numeración impresa).
 */

const PROGRAMA: Source = {
  url: "https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf",
  title: "UPN: Programa Electoral Elecciones Generales 23 de julio 2023",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230727191605/https://www.upn.org/wp-content/uploads/2023/07/Programa-Generales-23J_V2-1.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "upn",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Leído íntegro el programa (6 páginas); buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  {
    partyId: "upn",
    questionId: "vivienda-tope-alquiler",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "media",
      quote:
        "Derogación de la Ley de Vivienda y respeto a las competencias que en la materia tiene la Comunidad Foral de Navarra.",
      source: at("6"),
      note: "Derogar la Ley 12/2023 elimina la limitación de rentas en zonas tensionadas, pero la cita no menciona el control de precios y une la derogación al respeto competencial de Navarra: confianza media.",
    },
    record: null,
  },
  {
    partyId: "upn",
    questionId: "irpf-inflacion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "alta",
      quote:
        "Combatir la inflación con medidas efectivas que alivien el bolsillo de los ciudadanos. Deflactar la tarifa del IRPF.",
      source: at("2"),
      note: "Objetivo específico n.º 2. Pide deflactar la tarifa, pero no se compromete a hacerlo cada año: +1 (mismo criterio que en el resto de partidos).",
    },
    record: null,
  },
  sinPosicion("jornada-37-5", "«jornada», «horas», «37,5». El apartado de empleo (p. 4) trata de contratos-programa, empleo juvenil y pensiones"),
  sinPosicion(
    "amnistia",
    "«amnist», «indult», «Cataluña». El programa es anterior a la ley (2024); solo pide que el Gobierno no dependa «ni de EH Bildu ni de los independentistas» (p. 2), sin hablar de amnistía",
  ),
  sinPosicion("nuclear", "«nuclear», «energía». Solo «Apuesta decidida por las energías renovables» (p. 5)"),
  sinPosicion("prostitucion-abolicion", "«prostitución», «proxenet», «trata», «explotación sexual»"),
  sinPosicion("gasto-defensa", "«defensa», «militar», «OTAN»"),
  sinPosicion(
    "impuesto-grandes-fortunas",
    "«patrimonio», «fortunas», «riqueza». Solo el objetivo genérico «Reducir impuestos» (p. 2)",
  ),
  {
    partyId: "upn",
    questionId: "okupacion-desalojo",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Establecimiento de normativa que garantice el reconocimiento efectivo a la propiedad privada de las viviendas y la lucha contra la ocupación ilegal.",
      source: at("6"),
      note: "Dirección clara contra la ocupación ilegal, sin medida concreta de desalojo ni plazo: +1.",
    },
    record: null,
  },
  sinPosicion(
    "impuesto-banca",
    "«banca», «bancos», «impuesto», «gravamen». Solo el objetivo genérico «Reducir impuestos» (p. 2) y un convenio para el acceso a servicios financieros en pequeñas poblaciones (p. 5)",
  ),
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «conflicto de intereses», «malversación», «denunciantes», «transparencia». Solo el lema genérico «Lucha contra la corrupción. UPN es el único partido que no tiene casos de corrupción.» (p. 2), sin organismo alguno",
  ),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana», «exterior». Programa anterior a la crisis de julio de 2026; lo único de acción exterior es el fomento de las exportaciones navarras (p. 5)",
  ),
  sinPosicion("inmigracion-competencias-cataluna", "«inmigración», «Cataluña», «competencias». Las competencias que trata son las de Navarra"),
  {
    partyId: "upn",
    questionId: "tauromaquia-patrimonio",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Decidida defensa del mundo rural, tanto de las actividades agrícolas y ganaderas como de la caza y la pesca, así como la tauromaquia.",
      source: at("5"),
      note: "Defensa explícita de la tauromaquia, pero sin mencionar su protección legal como patrimonio cultural (Ley 18/2013): +1.",
    },
    record: null,
  },
  sinPosicion(
    "iva-primera-vivienda",
    "«IVA», «vivienda», «primera vivienda», «compra», «Transmisiones», «impuestos». Solo el objetivo genérico «Reducir impuestos» (p. 2)",
  ),
];
