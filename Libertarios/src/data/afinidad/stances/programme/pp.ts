import type { ProgrammeStance, Source, Stance } from "../../types";

/**
 * PP — programa electoral de las generales del 23-J-2023 (WP3).
 *
 * Fuente: «Programa electoral. Un proyecto al servicio de un gran país.
 * 365 medidas» (PDF de 112 páginas en pp.es, accesible el 2026-10-06).
 *
 * `page` es la página del PDF. La numeración impresa va 2 por detrás
 * (PDF 34 = impresa 32); cada nota da la impresa.
 *
 * Programa 2023 — se actualizará con el de 2026 (ver `docs/AFINIDAD-PLAN.md`).
 * Codificado según `docs/AFINIDAD-DATOS.md` §2. Revisión ciega hecha el 2026-10-06 (`reviewer` en cada celda que puntúa; ver `docs/AFINIDAD-REVISION.md`).
 */

const PROGRAMA: Source = {
  url: "https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf",
  archiveUrl:
    "https://web.archive.org/web/20250619072430/https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf",
  title: "PP — Programa electoral. Un proyecto al servicio de un gran país (generales 23-J-2023)",
  year: 2023,
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (note: string): ProgrammeStance => ({
  position: 0,
  status: "sin-posicion",
  confidence: "baja",
  quote: "",
  source: PROGRAMA,
  note,
});

const programme: Record<string, ProgrammeStance> = {
  "vivienda-tope-alquiler": {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "media",
    quote:
      "Derogaremos la ley de vivienda, que ha generado inseguridad jurídica y no resuelve ninguno de los problemas de fondo del mercado de la vivienda.",
    source: at("34"),
    note:
      "Derogar la Ley 12/2023 elimina el mecanismo de limitación de rentas en zonas tensionadas, pero la cita no menciona expresamente el control de precios: confianza media. Buscado también «tensionad», «control de precios», «precio del alquiler»: sin resultados. Página impresa 32.",
  },
  "irpf-inflacion": {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "alta",
    quote:
      "Corregiremos los efectos de la inflación en la tarifa del IRPF que supone una subida real de impuestos sobre la clase media.",
    source: at("23"),
    note:
      "Medida 41 («Aprobaremos un alivio fiscal inmediato a las familias»). Corrige la tarifa por la inflación, pero no se compromete a hacerlo cada año: +1. Página impresa 21.",
  },
  "jornada-37-5": sinPosicion(
    "Buscado «37,5», «jornada», «horas semanales», «cuatro días», «horario». Solo aparece la medida 163 (p. 53) sobre flexibilidad horaria y bolsa de horas «sin afectar ni a las horas trabajadas ni al salario»; nada sobre reducir la jornada máxima legal.",
  ),
  amnistia: sinPosicion(
    "El programa es anterior a la ley de amnistía (LO 1/2024). Buscado «amnist», «indult», «sedición», «malversación»: hay medidas para recuperar la sedición y la malversación (p. 72) y reformar la ley de indulto (p. 75), pero nada sobre una amnistía.",
  ),
  nuclear: {
    position: 1,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "PROPONDREMOS, CON EL VISTO BUENO DEL CONSEJO DE SEGURIDAD NUCLEAR, LA EXTENSIÓN DE LA VIDA ÚTIL DE LAS CENTRALES NUCLEARES EXISTENTES en nuestro país, en el marco de la normativa europea.",
    source: at("38"),
    note:
      "Medida 114. A favor de prorrogar, pero condicionado al visto bueno del CSN: +1 por la regla de compromiso condicionado (DATOS §2). Página impresa 36.",
  },
  "gasto-defensa": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "Cumpliremos el compromiso adquirido por los aliados de destinar un 2% del PIB nacional en seguridad y defensa.",
    source: at("103"),
    note: "Medida 335. Página impresa 101.",
  },
  "impuesto-grandes-fortunas": {
    position: -2,
    status: "verificado",
    reviewer: { position: -2, agrees: true },
    confidence: "alta",
    quote: "Eliminaremos el impuesto a las grandes fortunas",
    source: at("23"),
    note:
      "Medida 42. La frase sigue: «, y simplificaremos el IRPF y el Impuesto sobre Sociedades para las pymes». Página impresa 21.",
  },
  "okupacion-desalojo": {
    position: 2,
    status: "verificado",
    reviewer: { position: 2, agrees: true },
    confidence: "alta",
    quote:
      "AGILIZAREMOS LOS DESALOJOS PARA QUE PUEDAN REALIZARSE EN EL PLAZO MÁXIMO DE 24 HORAS desde el requerimiento si los ocupantes no acreditan en dicho plazo el título jurídico que legitime la permanencia en el inmueble",
    source: at("82"),
    note: "Medida 281; la medida 280 (misma página) repite el plazo de 24 horas. Página impresa 80.",
  },
  "inmigracion-competencias-cataluna": sinPosicion(
    "El programa es anterior a la proposición PSOE-Junts de delegación. Buscado «competencias» junto a inmigración/fronteras, «Mossos», «delegación»: las medidas de fronteras (p. 81) hablan de Policía Nacional y Guardia Civil, sin pronunciarse sobre delegar competencias a comunidades.",
  ),
  "tauromaquia-patrimonio": sinPosicion(
    "Buscado «taurin», «tauromaquia», «toros», «corrida», «festejos», «tradici», «patrimonio cultural inmaterial»: sin resultados. La medida 77 (p. 31) sobre la caza como «acervo cultural» no trata la tauromaquia.",
  ),
  "prostitucion-abolicion": sinPosicion(
    "Buscado «prostitu», «proxenet», «abolic», «tercería», «cliente», «explotación sexual». Lo único es la medida 205 (p. 62): una ley orgánica integral «DE LUCHA CONTRA LA TRATA CON FINES DE EXPLOTACIÓN SEXUAL», en la que «Perseguiremos a los proxenetas y el beneficio económico extraído de esta actividad por terceras personas»; se refiere a la trata, no a la prostitución consentida, ni a quien paga ni a quien la ejerce. No se extrapola.",
  ),
  "iva-primera-vivienda": {
    position: 1,
    status: "verificado",
    reviewer: { position: 1, agrees: true },
    confidence: "baja",
    quote:
      "Bonificaremos el Impuesto de Transmisiones y de Actos Jurídicos Documentados o el IBI por compra de una vivienda en el rural e impulsaremos políticas de rehabilitación de viviendas en los pueblos.",
    source: at("32"),
    note:
      "Medida 80 («fiscalidad específica en el medio rural»). Rebaja impuestos de la compra (ITP y AJD, o el IBI) solo para viviendas en el rural y no habla del IVA de la vivienda nueva: +1, confianza baja. Buscado también «IVA», «superreducido», «primera vivienda», «compra de vivienda»: el IVA solo aparece para la carne, pescados y conservas (medida 41, p. 23) y para la liquidación de las pymes (p. 15). Página impresa 30.",
  },
  "impuesto-banca": sinPosicion(
    "Buscado «banca», «bancos», «bancari», «entidades financieras», «gravamen», «impuestos temporales», «beneficios extraordinarios», «caídos del cielo» y leído el objetivo «Controlar el déficit y la deuda y reducir la presión fiscal» (pp. 23-24): ninguna mención al gravamen temporal sobre la banca. Solo «Eliminaremos el impuesto a las grandes fortunas» (p. 23), que es otro impuesto.",
  ),
  "oficina-anticorrupcion": sinPosicion(
    "Revisión ciega del 2026-10-07: la cita de la medida 248 (p. 76, impresa 74) —«REFORMAREMOS LA LEY REGULADORA DE LA PROTECCIÓN DE LAS PERSONAS QUE INFORMEN SOBRE INFRACCIONES NORMATIVAS Y DE LUCHA CONTRA LA CORRUPCIÓN para asegurar la independencia de las actuaciones y la no injerencia del Gobierno.»— no nombra ningún organismo; el revisor la consideró fuera de tema y, con el mismo criterio que en el resto de partidos, no puntúa. Nota original: Medida 248. La ley que cita (Ley 2/2023) es la que crea la Autoridad Independiente de Protección del Informante; reforzar la independencia de un órgano de control existente, sin crear una oficina nueva ni nombrar funciones de investigación o sanción: +1. En la p. 67 pide además «reguladores y órganos de control independientes» en general. Buscado también «corrup», «anticorrup», «antifraude», «integridad», «oficina», «agencia», «conflicto de intereses», «malversación» (medida 220, p. 72: recuperar el delito de malversación), «denunciantes». La extracción da «NORMA TIV AS» por el maquetado. Página impresa 74.",
  ),
  "ceuta-embajador-marruecos": sinPosicion(
    "Programa anterior a la crisis de julio de 2026. Buscado «Marruecos», «Ceuta», «Melilla», «Sáhara», «frontera», «embajad», «soberanía», «integridad territorial», «aduana», «Magreb». Aparece: medida 261 (p. 79), más apoyo del Estado y nueva financiación para Ceuta y Melilla como «única frontera terrestre de la Unión Europea en África»; p. 95, la sociedad que «ha sabido mantener un razonable equilibrio entre Marruecos y Argelia»; p. 101, «España debe recuperar una política exterior que haga compatible una relación de vecindad profunda y sólida con Marruecos y con Argelia» y medida 328, «UNA RELACIÓN EQUILIBRADA CON LOS PAÍSES DEL MAGREB» basada «en el respeto mutuo» y apoyo a la ONU en el Sáhara Occidental. Nada sobre presión diplomática a Marruecos ni exigencias sobre la frontera de Ceuta y Melilla; la «relación profunda y sólida» se plantea como equilibrio con Argelia, no como compromiso con la etapa de 2022 ni rechazo a la presión: no puntúa.",
  ),
};

export const stances: Stance[] = Object.entries(programme).map(([questionId, p]) => ({
  partyId: "pp",
  questionId,
  programme: p,
  record: null,
}));
