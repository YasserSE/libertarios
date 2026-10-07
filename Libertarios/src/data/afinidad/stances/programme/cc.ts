import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Coalición Canaria (CC). WP3.
 *
 * Fuente: manifiesto «Un objetivo común, la defensa de Canarias» (26-6-2023,
 * 14 páginas, en castellano), con 52 «Compromisos con Canarias» para las
 * generales del 23-7-2023. Lo firman CC y otras formaciones insulares que la
 * apoyaron en esas elecciones (Unidos por Gran Canaria, AHI, etc.). Es el
 * documento que la propia CC publica como programa del 23-J en su página de
 * programas electorales (coalicioncanaria.org/programas-electorales/); no se
 * ha encontrado otro programa de CC para esas generales. Al ser un
 * manifiesto centrado en Canarias, casi todas las preguntas quedan
 * `sin-posicion`.
 *
 * Páginas: página del PDF (coincide con la numeración impresa).
 */

const PROGRAMA: Source = {
  url: "https://coalicioncanaria.org/wp-content/uploads/cc-pdf/programas-electorales/00_COALICION%20POR%20CANARIAS.pdf",
  title: "Coalición Canaria y otros: Manifiesto «Un objetivo común, la defensa de Canarias» (generales 23-J 2023)",
  date: "2023-06-26",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230930233746/https://coalicioncanaria.org/wp-content/uploads/cc-pdf/programas-electorales/00_COALICION%20POR%20CANARIAS.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "cc",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Leído íntegro el manifiesto (14 páginas); buscado: ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  sinPosicion("vivienda-tope-alquiler", "«alquiler», «vivienda», «tensionad»"),
  sinPosicion(
    "irpf-inflacion",
    "«IRPF», «deflact», «inflación». Solo propone ampliar diez años la bonificación del 60 % del IRPF para residentes en La Palma (compromiso 14, p. 5)",
  ),
  sinPosicion("jornada-37-5", "«jornada», «horas semanales». El apartado de empleo (compromisos 15-17) no trata la jornada"),
  sinPosicion("amnistia", "«amnist», «Cataluña», «indult»"),
  sinPosicion("nuclear", "«nuclear». Solo trata renovables y transición energética en Canarias (compromisos 44-45)"),
  {
    partyId: "cc",
    questionId: "prostitucion-abolicion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Impulsaremos y apoyaremos medidas legales en contra de la trata de mujeres con fines de explotación sexual y la prostitución.",
      source: at("8"),
      note: "Compromiso 27, sobre violencia de género. Apoya medidas legales contra la prostitución, pero no dice si se castigaría a quien paga o a quien se lucra ni que no se sancione a quien la ejerce: dirección clara sin la medida concreta, +1.",
    },
    record: null,
  },
  sinPosicion("gasto-defensa", "«militar», «defensa», «OTAN»"),
  sinPosicion("impuesto-grandes-fortunas", "«patrimonio», «fortunas», «riqueza»"),
  sinPosicion("okupacion-desalojo", "«ocupación», «okupa», «desalojo»"),
  sinPosicion("impuesto-banca", "«banca», «bancos», «impuesto», «beneficios», «gravamen»"),
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupción», «anticorrupción», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «conflicto de intereses», «malversación», «denunciantes», «transparencia». «Agencia» solo aparece por la Agencia Tributaria estatal (p. 9)",
  ),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajada», «soberanía», «integridad territorial», «aduana». Programa anterior a la crisis de julio de 2026. Solo pide que Canarias esté presente, con representación propia, en las negociaciones del Estado con Marruecos sobre «la delimitación de los espacios marítimos y el control de los movimientos migratorios» (compromiso 13, p. 5); nada sobre Ceuta ni sobre presión diplomática a Marruecos",
  ),
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "«Cataluña», «competencias». Pide presencia de Canarias en las negociaciones con Marruecos sobre «el control de los movimientos migratorios» (compromiso 13, p. 5), nada sobre Cataluña",
  ),
  sinPosicion("tauromaquia-patrimonio", "«tauromaquia», «toros»"),
  sinPosicion("iva-primera-vivienda", "«IVA», «IGIC», «vivienda», «primera vivienda», «compra», «Transmisiones». El IVA solo aparece por el cobro de IVA en vez de IGIC en compras digitales (p. 11)"),
];
