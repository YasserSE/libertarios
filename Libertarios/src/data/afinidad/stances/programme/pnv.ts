import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de EAJ-PNV. WP3.
 *
 * Fuente: «Con voz propia. Programa Electoral 23-J» de EAJ-PNV para las
 * generales del 23-7-2023 (52 páginas, en castellano), publicado en la
 * sección de documentos de eaj-pnv.eus y todavía en línea.
 *
 * Páginas: página del PDF (coincide con la numeración impresa).
 */

const PROGRAMA: Source = {
  url: "https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j",
  title: "EAJ-PNV: Con voz propia. Programa Electoral 23-J (elecciones generales 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230715101857/https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "pnv",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Buscado en el texto completo (52 páginas): ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "«alquiler», «tensionad», «precio», «arrendamiento». El apartado de vivienda (p. 45) aboga por «políticas que fomenten el alquiler y la promoción de vivienda pública» y rechaza «las propuestas que erosionen nuestro autogobierno», sin pronunciarse sobre limitar la renta",
  ),
  sinPosicion("irpf-inflacion", "«IRPF», «deflact», «tramos»; el IPC solo aparece referido a las pensiones (pp. 32-33)"),
  sinPosicion("jornada-37-5", "«jornada», «horas semanales», «tiempo de trabajo». El capítulo de empleo (pp. 28-31) no trata la jornada máxima"),
  sinPosicion(
    "prisiones-agentes-autoridad",
    "«prisión», «penitenciari», «funcionarios», «agentes de la autoridad». Solo habla de los derechos de las personas presas y de humanizar el sistema penitenciario (p. 7) y rechaza la prisión permanente revisable (p. 10); nada sobre los funcionarios de prisiones",
  ),
  sinPosicion("amnistia", "«amnist», «Cataluña», «indult». «Amnistía» solo aparece referida a la ley de 1977 (p. 9)"),
  sinPosicion("nuclear", "«nuclear», «centrales». El capítulo de energía (pp. 19-23) solo trata renovables, redes e hidrógeno"),
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitución», «proxenet», «abolición», «explotación sexual». Solo pide una «Ley integral contra la trata de personas» (p. 11) y una ley integral de trata con perspectiva de género (p. 47)",
  ),
  sinPosicion(
    "gasto-defensa",
    "«gasto militar», «defensa», «OTAN», «armamento». Solo apoya la Política Exterior y de Seguridad Común de la UE y la «Brújula Estratégica» (p. 35), sin hablar del gasto militar español",
  ),
  sinPosicion(
    "impuesto-grandes-fortunas",
    "«fortunas», «patrimonio», «riqueza». El apartado fiscal (pp. 16-17) pide progresividad y que los nuevos impuestos estatales se concierten con las haciendas forales, sin pronunciarse sobre un impuesto a las grandes fortunas",
  ),
  sinPosicion("okupacion-desalojo", "«ocupación», «okupa», «desalojo», «desahucio»"),
  sinPosicion(
    "impuesto-banca",
    "«banca», «gravamen», «beneficios extraordinarios», «tipos de interés». Sobre los gravámenes temporales a la banca y a las energéticas solo dice que, «en caso de querer mantenerlas», deberían tramitarse como impuestos y no como prestaciones patrimoniales no tributarias, para poder concertarlos con las haciendas forales (pp. 16-17); no se pronuncia sobre subirlos",
  ),
  {
    partyId: "pnv",
    questionId: "registro-lobbies",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "media",
      quote:
        "Regulación de los lobbies, estableciendo medidas efectivas para la máxima transparencia de su actividad, y en concreto de sus interacciones y relaciones con las y los cargos públicos y representantes políticos.",
      source: at("13"),
      note: "Apartado «Ética en la acción pública». A favor de regular los lobbies y hacer transparentes sus contactos con cargos públicos, pero no concreta un registro obligatorio ni sanciones: +1.",
    },
    record: null,
  },
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "«Cataluña», «competencias», «inmigración». Pide la «Transferencia a la CAV de las políticas migratorias» (p. 11), pero nada sobre Cataluña; no se extrapola",
  ),
  sinPosicion("tauromaquia-patrimonio", "«tauromaquia», «toros», «taurin»"),
  sinPosicion(
    "iva-primera-vivienda",
    "«IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones», «fiscal» junto a «vivienda». Solo propone «una revisión del listado de bienes y servicios como de los tipos general, reducido y superreducido» del IVA (p. 17), sin mencionar la vivienda",
  ),
];
