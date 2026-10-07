import type { Source, Stance } from "../../types";

/**
 * Celdas de PROGRAMA de Junts per Catalunya. WP3.
 *
 * Fuente: «Per Catalunya. Programa electoral» de Junts para las generales del
 * 23-7-2023 (151 páginas, en catalán), publicado en la web de campaña del
 * partido, janhihaprou.cat, que ya no existe. Se cita la versión
 * «Programa-Electoral-Junts-per-Catalunya-23J.pdf» guardada en Wayback el
 * 5-8-2023, la última que publicó el partido (había una anterior,
 * «Programa-Electoral.pdf», de 148 páginas). junts.cat no conserva copia
 * íntegra: la de 2023/08 en Wayback está truncada.
 *
 * Citas literales en catalán; la traducción al castellano va en `note`.
 * Páginas: página del PDF de esa versión (la numeración del índice impreso
 * no coincide con la del PDF).
 */

const PROGRAMA: Source = {
  url: "https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf",
  title: "Junts per Catalunya: Per Catalunya. Programa electoral (eleccions generals 23-J 2023)",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230805224113/https://janhihaprou.cat/app/uploads/2023/07/Programa-Electoral-Junts-per-Catalunya-23J.pdf",
};

const at = (page: string): Source => ({ ...PROGRAMA, page });

const sinPosicion = (questionId: string, busqueda: string): Stance => ({
  partyId: "junts",
  questionId,
  programme: {
    position: 0,
    status: "sin-posicion",
    confidence: "media",
    quote: "",
    source: PROGRAMA,
    note: `No trata el asunto. Buscado en el texto completo (151 páginas): ${busqueda}.`,
  },
  record: null,
});

export const stances: Stance[] = [
  sinPosicion(
    "vivienda-tope-alquiler",
    "«lloguer», «preu», «tensiona», «índex de referència». El apartado de vivienda (pp. 96-99) propone incentivos fiscales para quien alquile por debajo del índice de referencia, reformar la LAU con «contractes indefinits voluntaris» y, si no, transferir a Cataluña la legislación de arrendamientos; no se pronuncia sobre limitar por ley la renta de los nuevos contratos",
  ),
  {
    partyId: "junts",
    questionId: "irpf-inflacion",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote: "Compromís de deflactar les escales impositives de tots els impostos a la inflació",
      source: at("60"),
      note: "Traducción: «Compromiso de deflactar las escalas impositivas de todos los impuestos a la inflación». Incluye la tarifa del IRPF, pero no dice que sea cada año: +1, mismo criterio que en el resto de partidos.",
    },
    record: null,
  },
  sinPosicion("jornada-37-5", "«jornada», «hores setmanals», «setmana laboral». Solo aparecen las reducciones de jornada por cuidado de hijos (p. 115)"),
  sinPosicion(
    "ceuta-embajador-marruecos",
    "«Marroc», «marroquí», «Ceuta», «Melilla», «Sàhara», «frontera», «ambaixada», «sobirania», «integritat territorial», «duana». No menciona Marruecos, Ceuta ni Melilla; solo exige cumplir las resoluciones de la ONU y las sentencias del TJUE sobre el Sáhara (p. 30) y critica el uso de las embajadas contra la acción exterior catalana (p. 31)",
  ),
  {
    partyId: "junts",
    questionId: "amnistia",
    programme: {
      position: 2,
      status: "verificado",
      reviewer: { position: 2, agrees: true },
      confidence: "alta",
      quote:
        "Llei d’amnistia. D’acord amb el mandat del Parlament de Catalunya, la resolució del conflicte amb Espanya implica aconseguir l’amnistia per a tots els represaliats i represaliades.",
      source: at("25"),
      note: "Traducción: «Ley de amnistía. De acuerdo con el mandato del Parlament de Catalunya, la resolución del conflicto con España implica conseguir la amnistía para todos los represaliados y represaliadas».",
    },
    record: null,
  },
  {
    partyId: "junts",
    questionId: "nuclear",
    programme: {
      position: 0,
      status: "pendiente",
      confidence: "baja",
      quote: "",
      source: at("90"),
      note: "Dudoso. En la p. 90 hay un epígrafe «Mix elèctric i al tancament de les nuclears» («Mix eléctrico y cierre de las nucleares») seguido solo de medidas para potenciar las renovables, y en la p. 91 propone «Treure la nuclear i la gran hidràulica de la subhasta elèctrica». El epígrafe parece dar por hecho el cierre, pero no hay ninguna frase que diga si las centrales deben cerrar en el calendario previsto o seguir funcionando. Necesita revisión humana; mientras tanto no puntúa.",
    },
    record: null,
  },
  sinPosicion(
    "prostitucion-abolicion",
    "«prostitució», «proxenet», «abolició», «explotació sexual». Solo una estrategia europea para los menores no acompañados y las «víctimes de les xarxes del tràfic de persones» (p. 111)",
  ),
  sinPosicion(
    "gasto-defensa",
    "«despesa militar», «defensa», «OTAN», «armament». Señales en ambos sentidos y ninguna sobre el nivel de gasto: pide que España cumpla «els seus compromisos com a membre de l’OTAN» con Ucrania (p. 31) y, a la vez, «Revisar, en profunditat, el model de defensa i els seus programes especials d’armament» y avanzar hacia un ejército europeo (p. 135). No se codifica",
  ),
  sinPosicion(
    "impuesto-grandes-fortunas",
    "«fortunes», «patrimoni», «riquesa», «impost». El apartado fiscal (pp. 58-61) pide bajar la presión sobre rentas del trabajo y pymes y una tasa digital, nada sobre un impuesto a las grandes fortunas",
  ),
  {
    partyId: "junts",
    questionId: "okupacion-desalojo",
    programme: {
      position: 1,
      status: "verificado",
      reviewer: { position: 1, agrees: true },
      confidence: "alta",
      quote:
        "En primer lloc, es proposen mesures de tipus processal com el desallotjament cautelar en 48 hores en els supòsits d’ocupacions que pertorbin la convivència o que tinguin caràcter delinqüencial i en les quals els ocupants no acreditin el títol de possessió corresponent.",
      source: at("129"),
      note: "Traducción: «En primer lugar, se proponen medidas de tipo procesal como el desalojo cautelar en 48 horas en los supuestos de ocupaciones que perturben la convivencia o que tengan carácter delincuencial y en las que los ocupantes no acrediten el título de posesión correspondiente». Desalojo exprés si no acreditan título, pero en 48 horas, solo para ocupaciones conflictivas y «En tot cas, s’atendran les situacions de vulnerabilitat»: +1.",
    },
    record: null,
  },
  sinPosicion(
    "impuesto-banca",
    "«banca», «bancs», «impost», «beneficis extraordinaris», «gravamen». El apartado fiscal (pp. 58-61) no menciona el gravamen a la banca; sobre el sector solo pide estimular la competencia bancaria y la licencia bancaria del Institut Català de Finances (p. 62)",
  ),
  sinPosicion(
    "oficina-anticorrupcion",
    "«corrupció», «anticorrupció», «antifrau», «integritat», «oficina», «agència», «autoritat independent», «fiscalia», «conflicte d’interessos», «malversació», «alertadors», «denunciants». Pide reformar el delito de malversación «d’acord amb els estàndards europeus en matèria de corrupció» y una nueva ley de secretos oficiales que «doni transparència a la corrupció» (p. 24); la única «autoritat independent» que propone es el Consell de l’Audiovisual de Catalunya (p. 115). Ningún organismo de prevención o investigación de la corrupción",
  ),
  {
    partyId: "junts",
    questionId: "inmigracion-competencias-cataluna",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -1, agrees: true },
      confidence: "media",
      quote: "Que Catalunya pugui decidir amb relació als fluxos migratoris.",
      source: at("110"),
      note: "Traducción: «Que Cataluña pueda decidir en relación con los flujos migratorios». Medida del apartado «Fluxos migratoris i acollida de refugiats». En la p. 133 pide además que la Guardia Civil y la Policía Nacional dejen de ejercer en Cataluña «les competències que ara exerceixen, que seran assumides pels cossos de seguretat catalans». No detalla permisos, expulsiones ni puertos y aeropuertos: confianza media.",
    },
    record: null,
  },
  {
    partyId: "junts",
    questionId: "tauromaquia-patrimonio",
    programme: {
      position: -2,
      status: "verificado",
      reviewer: { position: -2, agrees: true },
      confidence: "alta",
      quote: "Proposarem la derogació de la declaració de la tauromàquia com a patrimoni cultural.",
      source: at("149"),
      note: "Traducción: «Propondremos la derogación de la declaración de la tauromaquia como patrimonio cultural».",
    },
    record: null,
  },
  sinPosicion(
    "iva-primera-vivienda",
    "«IVA», «primer habitatge», «compra d’habitatge», «adquisició», «transmissions patrimonials», «actes jurídics», «fiscalitat» junto a «habitatge». El IVA de vivienda solo aparece para la promoción de viviendas de alquiler en suelo cedido en derecho de superficie (p. 98); para el primer habitatge propone avales del ICO a la entrada hipotecaria de los jóvenes (p. 101), no rebajas de impuestos de la compra",
  ),
];
