import type { ProgrammeStance, Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Podemos. WP3.
 *
 * En las generales del 23-J-2023 Podemos concurrió dentro de la coalición
 * SUMAR y no publicó programa propio. Su programa oficial posterior es el de
 * las europeas de 2024, «Por un futuro de paz y derechos» (PDF de 130 páginas
 * en podemos.info). Es el que se usa aquí, con `year: 2024`.
 *
 * Al ser un programa europeo, casi todas sus medidas se formulan como
 * directivas, estrategias o impuestos de la UE: cuando el texto marca una
 * dirección clara sobre el asunto del enunciado pero en el ámbito europeo, la
 * celda va con confianza media y, salvo compromiso explícito, ±1. Lo que no
 * trata va como «sin-posicion» (no se rellena con el programa de SUMAR 2023).
 *
 * podemos.info devuelve 403 a descargas automáticas; las citas se han cotejado
 * contra la copia de Wayback de `archiveUrl` (24-5-2024). La página impresa
 * coincide con la del PDF. Solo se han deshecho los guiones de corte de línea.
 */

const EUROPEAS_2024: Source = {
  url: "https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf",
  title: "Podemos — «Por un futuro de paz y derechos», programa electoral para las elecciones europeas de 2024",
  year: 2024,
  archiveUrl:
    "https://web.archive.org/web/20240524025157/https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf",
};

const CONTEXTO =
  "Programa de las europeas de 2024 (en las generales de 2023 Podemos concurrió en la coalición SUMAR, sin programa propio).";

const at = (page: number): Source => ({ ...EUROPEAS_2024, page: String(page) });

const cell = (questionId: string, programme: ProgrammeStance): Stance => ({
  partyId: "podemos",
  questionId,
  programme: { ...programme, note: programme.note ? `${CONTEXTO} ${programme.note}` : CONTEXTO },
  record: null,
});

const sinPosicion = (questionId: string, busqueda: string): Stance =>
  cell(questionId, {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: EUROPEAS_2024,
    note: `No trata el asunto. Texto completo (130 págs.) extraído y buscado: ${busqueda}.`,
  });

export const stances: Stance[] = [
  cell("vivienda-tope-alquiler", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Impulsaremos una directiva que prohiba que los fondos buitre puedan poseer viviendas y que regule y fije mecanismos de control sobre los precios de la vivienda en alquiler para que no superen el 30 % de los ingresos del hogar.",
    source: at(37),
    note: "Control de precios del alquiler propuesto como directiva europea, no como límite en zonas tensionadas de la ley española: +1.",
  }),
  sinPosicion("irpf-inflacion", "«IRPF», «deflact», «tramos», «inflación»; «tramos» solo aparece en la factura eléctrica progresiva"),
  cell("jornada-37-5", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Promoveremos la adopción de una estrategia europea y mecanismos para la reducción por parte de los gobiernos de la jornada laboral a 30 horas para tener más tiempo para vivir",
    source: at(39),
    note: "Propone ir más allá (30 horas) mediante una estrategia europea; no menciona las 37,5 horas ni el mantenimiento del salario: +1.",
  }),
  sinPosicion("amnistia", "«amnist», «Cataluña», «Generalitat», «procés»"),
  cell("nuclear", {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "No más energía nuclear de fisión. Promoveremos el establecimiento de una hoja de ruta para el abandono definitivo de la energía nuclear de fisión en la Unión Europea",
    source: at(77),
    note: "Compromiso de abandono definitivo, formulado para toda la UE; no habla del calendario español, de ahí confianza media. En la p. 64 también: «se establecerán objetivos de cierre de las centrales de carbón y de las centrales nucleares».",
  }),
  cell("gasto-defensa", {
    position: -1,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "Desde Podemos venimos trabajando, y seguiremos haciéndolo, por frenar la deriva hacia un régimen de guerra que obligue a los Estados a disparar su gasto militar y a activar sin freno la industria europea de la guerra.",
    source: at(6),
    note: "Dirección clara contra el aumento del gasto militar, sin medida concreta sobre el presupuesto español de defensa: −1. En la p. 123: «Más armamento no implica más seguridad ni mejor defensa».",
  }),
  cell("impuesto-grandes-fortunas", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "un impuesto europeo a las grandes fortunas, que complementará los gravámenes sobre el patrimonio de los estados y financiará directamente el presupuesto de la UE para establecer programas de garantía de los servicios públicos",
    source: at(58),
    note: "Propone un impuesto europeo que se suma a los estatales sobre el patrimonio; no propone ni fija umbral para uno estatal: +1.",
  }),
  cell("okupacion-desalojo", {
    position: -1,
    status: "verificado",
    reviewer: { position: -1, agrees: true },
    confidence: "media",
    quote:
      "Emplearemos todos los medios de la UE en garantizar que no se pueda desalojar ni desahuciar a ninguna persona ni a su familia en situación de vulnerabilidad sin que la Administración competente asegure un realojo en condiciones dignas, ya sea en casos de impago de alquileres o por ocupación en precario motivada por la falta de vivienda asequible.",
    source: at(38),
    note: "Condiciona el desalojo de ocupantes vulnerables a un realojo; no se pronuncia sobre el plazo de 24 horas ni sobre el resto de casos: −1.",
  }),
  sinPosicion("inmigracion-competencias-cataluna", "«Cataluña», «Generalitat», «competencias», «Mossos», «puertos»"),
  cell("tauromaquia-patrimonio", {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "Acabaremos con las ayudas y subvenciones públicas relacionadas con la tauromaquia y su excepcionalidad como eximente para el cumplimiento de las normas europeas sobre bienestar animal. También impulsaremos la prohibición de cualquier tipo de espectáculo que implique maltrato animal",
    source: at(73),
    note: "No cita la Ley 18/2013, pero propone acabar con la excepción legal de la tauromaquia y prohibir los espectáculos con maltrato animal, de ahí confianza media.",
  }),
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitu», «proxenet», «abolic», «tercería», «cliente», «trabajo sexual». Solo «Aumentar los fondos destinados a la lucha contra la trata, trata con fines de explotaciones sexual y mujeres en contextos de prostitución» y planes de inserción sociolaboral (p. 22); nada sobre castigar a quien paga ni el proxenetismo consentido",
  ),
  sinPosicion(
    "iva-primera-vivienda",
    "«IVA», «superreducido», «primera vivienda», «compra de vivienda», «adquisición», «Transmisiones» y «fiscal» junto a «vivienda». Solo aparecen la supresión de los privilegios fiscales de las SOCIMI y un impuesto al «flipping» (pp. 37 y 58) y la prohibición europea de comprar vivienda para no residir en ella (p. 38); nada sobre el IVA ni los impuestos de la compra de la primera vivienda",
  ),
  cell("impuesto-banca", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Aprobación de un impuesto extraordinario, a nivel europeo, para que la banca devuelva al menos la mitad de los beneficios extraordinarios obtenidos a causa de la subida de tipos del Banco Central Europeo.",
    source: { ...EUROPEAS_2024, page: "58-59" },
    note: "La frase empieza en la p. 58 y termina en la p. 59 (es una sola frase). Gravamen sobre los beneficios extraordinarios de la banca por la subida de tipos, pero a escala europea y sin las cifras del enunciado (duplicar el gravamen, 75 %): +1.",
  }),
  cell("oficina-anticorrupcion", {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "media",
    quote:
      "Se promoverá la conversión de la Oficina Europea de Lucha contra el Fraude (OLAF) en agencia europea, lo que aumentará sus recursos para investigar el fraude, la evasión y el blanqueo de capitales, y se reforzará su control democrático.",
    source: at(60),
    note: "Organismo con funciones de investigación, pero de ámbito europeo y sin hablar de independencia: +1. Lo repite en el «Plan Europeo contra la Corrupción» (pp. 16-17: «reforzaremos la Oficina Europea de Lucha contra el Fraude (OLAF), que se convertirá en agencia, y su control democrático»), donde también propone que la UE establezca «un cuerpo de policía especializado en delitos de corrupción y delitos financieros» y un programa de protección para quien denuncie la corrupción (también p. 18). Nada sobre un organismo estatal español. Buscado «corrup», «anticorrup», «antifraude», «integridad», «oficina», «agencia», «autoridad independiente», «conflicto de intereses», «malversación», «denunciantes».",
  }),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marruecos», «Ceuta», «Melilla», «Sáhara», «saharaui», «frontera», «embajad», «soberanía», «integridad territorial», «aduana», «Magreb». Programa anterior a la crisis de julio de 2026. Sobre el Sáhara (p. 117): critica respaldar «el plan de ocupación de Marruecos», apoya el referéndum, exige que la UE «ceje en su empeño de negociar los acuerdos de pesca en aguas saharauis con Marruecos» y relaciones de alto nivel con la RASD; es sobre el Sáhara, no sobre Ceuta, y no puntúa. Tras el «Moroccogate» (p. 15), investigar las influencias de Marruecos, Catar, Israel y Turquía en la UE y retirarles el acceso a sus edificios (injerencia en la UE, no Ceuta). Ceuta solo aparece por El Tarajal 2014 en el Día Europeo de las Víctimas de las Fronteras (p. 52). La nueva política de vecindad sur (p. 118) trata a la región como «socio estratégico» sin nombrar a Marruecos",
  ),
];
