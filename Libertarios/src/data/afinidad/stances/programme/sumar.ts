import type { ProgrammeStance, Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Sumar. WP3.
 *
 * Fuente: «Un programa para ti», programa electoral de SUMAR para las
 * generales del 23-J-2023 (PDF de 182 páginas en movimientosumar.es; misma
 * copia, byte a byte, en Wayback). Programa 2023: se rehará con el de 2026.
 *
 * En este PDF la página impresa coincide con la del PDF, así que `page` vale
 * para las dos. El texto se ha extraído página a página y cada cita se ha
 * cotejado contra su página. Solo se han deshecho los guiones de corte de
 * línea («ca-lendario» → «calendario») y un espacio de extracción en «37 ,5».
 */

const SUMAR_2023: Source = {
  url: "https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf",
  title: "SUMAR — «Un programa para ti», programa electoral para las elecciones generales del 23-J-2023",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230712065723/https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf",
};

const at = (page: number): Source => ({ ...SUMAR_2023, page: String(page) });

const cell = (questionId: string, programme: ProgrammeStance): Stance => ({
  partyId: "sumar",
  questionId,
  programme,
  record: null,
});

const sinPosicion = (questionId: string, busqueda: string): Stance =>
  cell(questionId, {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: SUMAR_2023,
    note: `El programa no trata el asunto. Texto completo (182 págs.) extraído y buscado: ${busqueda}.`,
  });

export const stances: Stance[] = [
  cell("vivienda-tope-alquiler", {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Desarrollaremos y haremos cumplir la declaración de mercado tensionado de la Ley por el Derecho a la Vivienda en todos los ámbitos geográficos que cumplan los requisitos que establece la Ley, aplicando así la regulación de alquileres a todas las zonas de mercado tensionado para garantizar la igualdad de todos los inquilinos en el ejercicio de sus derechos.",
    source: at(79),
    note: "Misma medida en la p. 77 (n.º 15) y en la p. 78 (n.º 19). La p. 77 (n.º 14) añade: «Modificaremos la Ley 12/2023 de Vivienda para incluir: […] regulación efectiva de precios del alquiler».",
  }),
  sinPosicion(
    "irpf-inflacion",
    "«deflact», «indexa», «tramos», «IRPF», «inflación». El IRPF aparece solo para subir tipos marginales y ampliar tramos desde 120.000 € (p. 17) y en medidas de vivienda; nada sobre actualizar la tarifa con la inflación",
  ),
  cell("jornada-37-5", {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Reordenaremos el tiempo de trabajo, incluyendo la reducción y la distribución de la jornada laboral, pero sin reducción de salario. En 2024 se establecerá por ley una jornada laboral máxima de 37,5 horas y se abrirá un proceso de diálogo social para seguir reduciendo la jornada hasta alcanzar las 32 horas semanales.",
    source: at(7),
    note: "Repetido en la p. 24 (capítulo «Trabajo decente»).",
  }),
  sinPosicion(
    "amnistia",
    "«amnist», «indult», «procés», «independentis», «desjudicializ». Solo elogia «la desjudicialización» en el marco de la mesa de diálogo (p. 121); el programa es anterior a la ley de amnistía",
  ),
  cell("nuclear", {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "alta",
    quote:
      "Sumar se compromete a mantener el calendario de cierre del parque nuclear español, aplicando una moratoria a cualquier nueva iniciativa nuclear",
    source: at(48),
  }),
  sinPosicion(
    "gasto-defensa",
    "«gasto militar», «gasto en defensa», «presupuesto», «OTAN», «armamento», «2 %». Solo propone revisar y auditar los Programas Especiales de Armamento «con el fin de dotarlos de mayor transparencia» (p. 139) y desplazar las garantías de la OTAN a una autonomía estratégica europea; nada sobre el nivel del gasto",
  ),
  cell("impuesto-grandes-fortunas", {
    position: 1,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Implementaremos un impuesto a las grandes fortunas de forma permanente, reforzando además su progresividad, hasta llegar a tipos impositivos de al menos el 4% para los patrimonios más elevados.",
    source: at(16),
    note: "No fija el umbral (10 millones del enunciado). En la p. 15 la «herencia universal» se financia «con un nuevo impuesto a las grandes fortunas». Regla de consistencia de AFINIDAD-DATOS.md §2 (2026-10-06): crear o mantener un impuesto a las grandes fortunas sin decir que sea estatal o sin umbral es +1 (antes +2).",
  }),
  sinPosicion(
    "okupacion-desalojo",
    "«ocupación», «okupa», «desalojo», «usurpación», «allanamiento». Solo menciona «el fenómeno de la ocupación» como ejemplo de inseguridad exagerada por la publicidad de la seguridad privada (p. 133); nada sobre el procedimiento de desalojo",
  ),
  sinPosicion(
    "inmigracion-competencias-cataluna",
    "«Generalitat», «Mossos», «competencias», «puertos y aeropuertos», «inmigración». Solo traspasar la gestión de puertos y aeropuertos para gestionarla con las ciudades (p. 82, en movilidad) y reforzar el autogobierno catalán en general (p. 121); nada sobre delegar la inmigración",
  ),
  cell("tauromaquia-patrimonio", {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "alta",
    quote: "Derogación de la Ley 18/2013 de protección cultural y patrimonial de la tauromaquia.",
    source: at(56),
  }),
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitu», «proxenet», «abolic», «tercería», «cliente», «trabajo sexual». Solo una ley integral contra la trata y «consolidar el Plan de Inserción sociolaboral dirigido a mujeres víctimas de trata y de explotación sexual y a mujeres en situación de prostitución» (p. 110); nada sobre castigar a quien paga ni el proxenetismo consentido",
  ),
  cell("iva-primera-vivienda", {
    position: -1,
    status: "verificado",
    reviewer: { position: -1, agrees: true },
    confidence: "media",
    quote:
      "Dicha proporción está por debajo de la media de los países de la Unión Europea (0,6% del PIB) y, además, durante décadas ha priorizado regresivas bonificaciones fiscales a la compraventa de viviendas, en lugar del desarrollo de viviendas públicas.",
    source: at(75),
    note: "Diagnóstico del apartado 5.2 «Derecho a la vivienda» (el sujeto es España). Critica las bonificaciones fiscales a la compraventa frente a la vivienda pública, pero no hay medida concreta sobre el IVA de la compra: −1, confianza media. Buscado también «IVA», «superreducido», «primera vivienda», «compra de vivienda», «Transmisiones»: las demás menciones de la compra son el bono de 1.000 € a hipotecados a tipo variable (pp. 8 y 79) y la compra pública de viviendas (pp. 76 y 79).",
  }),
  cell("impuesto-banca", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Mantendremos los impuestos extraordinarios sobre las empresas energéticas y financieras mientras se aprueba e implementa completamente la reforma integral del impuesto de sociedades.",
    source: at(16),
    note: "Sigue: «Es justo que quienes, por el contrario, se han beneficiado de la subida de los precios y de los tipos de interés contribuyan a sufragarlas.» Defiende el gravamen sobre los beneficios de la subida de tipos, pero se compromete a mantenerlo, no a subirlo ni a duplicarlo: +1. En las pp. 8, 77 y 79 se financia un bono hipotecario «con cargo al impuesto extraordinario a la banca».",
  }),
  cell("oficina-anticorrupcion", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "se mejorará la independencia, autonomía, funciones y recursos operativos de la autoridad pública creada en la débil transposición realizada por la Ley 2/2023 de 20 de febrero de la Directiva 2019/1937 de la Unión Europea.",
    source: at(17),
    note: "Medida 11 «Reducción del fraude fiscal y mejorar los instrumentos contra la corrupción»; la cita es el final de una frase larga que empieza con medidas contra el fraude fiscal. Refuerza como independiente un órgano estatal ya existente (la Autoridad Independiente de Protección del Informante de la Ley 2/2023) sin crear una oficina nueva ni concretar funciones de investigación o sanción: +1. Otras menciones: «mecanismos de prevención de la corrupción (buzón anónimo para las personas denunciantes)» (p. 119), «políticas de integridad y de rendición de cuentas» (p. 120) y, en el ámbito de la UE, «el fortalecimiento de la Oficina Europea de Lucha contra el Fraude» (p. 146). Buscado «corrup», «anticorrup», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «conflicto de intereses», «malversación», «denunciantes».",
  }),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «saharaui», «frontera», «embajad», «soberanía», «integridad territorial», «aduana», «Magreb». Programa anterior a la crisis de julio de 2026. Sobre el Sáhara (p. 141): dar «marcha atrás con celeridad al cambio de posición adoptado en 2022», apoyar la libre determinación y, desde la UE, «revisar, en consecuencia, los diferentes acuerdos entre la Unión Europea y Marruecos que puedan afectar al Sáhara Occidental»; es sobre el Sáhara, no sobre Ceuta, y no puntúa. Vecindad Sur (p. 141): «En situaciones de tensión, apostaremos por el diálogo, sin abandonar los valores y objetivos propios, evitando una política puramente reactiva», referido al Magreb en general, sin nombrar a Marruecos ni Ceuta. Frontera Sur (p. 149): poner fin a los acuerdos de externalización de fronteras con países que no garantizan los derechos humanos y que no se repita la masacre de Melilla de junio de 2022; es política migratoria, no presión a Marruecos por Ceuta",
  ),
];
