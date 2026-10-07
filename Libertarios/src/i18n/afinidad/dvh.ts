/*
 * Textos de «Dijeron vs. hicieron» (tarjeta del resultado, página propia,
 * sección de la ficha de partido, enlaces del pie y de la portada, imagen OG).
 *
 * ca, gl y eu están completos (el tipo lo exige), pero son TRADUCCIONES
 * AUTOMÁTICAS PENDIENTES DE REVISIÓN HUMANA (ver `docs/AFINIDAD-CAMBIOS.md`).
 * Un `locale` que no sea de las cuatro lenguas (p. ej. `pt`) recibe el castellano.
 *
 * Reglas de redacción, más estrictas aquí que en el resto del módulo porque
 * esta sección compara a un partido consigo mismo:
 *  - Las etiquetas describen la relación entre la cita y el hecho («cumple»,
 *    «contradice», «parcial», «no lo hicieron»), nunca a quien habla: ni «miente», ni
 *    «incumple», ni «traición».
 *  - Sin adjetivos valorativos.
 *  - Siempre visibles el criterio de selección y los recuentos por etiqueta:
 *    lo que se elige enseñar ya es una forma de opinar, así que se enseña cómo
 *    se elige.
 *
 * Sin React y solo cadenas (sin funciones) a propósito: lo importa la ruta OG
 * (condición react-server) y las páginas de servidor se lo pasan tal cual a
 * componentes de cliente, que solo aceptan props serializables.
 */
import { pick } from "./lang";

const es = {
  title: "Dijeron vs. hicieron",
  notScored: "No puntúa: no cambia tu resultado ni el orden de los partidos.",
  cardIntro: "Compromisos y lo que hicieron después. Incluye los cumplidos.",
  cardShown: "Se muestran las {n} más recientes.",
  usualVote: "el partido que sueles votar",
  said: "Lo que dijeron",
  did: "Lo que hicieron",
  verdict_cumple: "Cumple",
  verdict_contradice: "Contradice",
  verdict_parcial: "Parcial",
  "verdict_no-hecho": "No lo hicieron",
  verdictHelp_cumple: "Lo que hicieron coincide con lo que dijeron.",
  verdictHelp_contradice: "Lo que hicieron va en sentido contrario a lo que dijeron.",
  verdictHelp_parcial: "Lo que hicieron coincide en una parte; el matiz está en la nota.",
  "verdictHelp_no-hecho":
    "Podían hacerlo (gobernaban o lo firmaron en un acuerdo) y no ocurrió; la nota dice por qué podían.",
  counts: "{c} cumplidas · {x} contradichas · {p} parciales · {n} no hechas",
  countsLabel: "Recuento de entradas recogidas para {party}",
  none: "Sin entradas recogidas para este partido todavía.",
  inPreparationTitle: "En preparación",
  inPreparationBody:
    "Todavía no hay entradas publicadas. Cada una aparecerá cuando tenga la cita literal y el hecho, los dos con una fuente que cualquiera pueda abrir.",
  note: "Nota",
  source: "fuente",
  page: "pág. {page}",
  video: "ver vídeo",
  videoFrom: "ver vídeo (desde {t})",
  openCongreso: "ver en congreso.es",
  groupVote: "voto del grupo: {vote}",
  initiativeStatus: "estado: {status}",
  officialValue: "— {value}",
  officialPublisher: "dato oficial de {publisher}",
  vote_si: "sí",
  vote_no: "no",
  vote_abstencion: "abstención",
  vote_ausente: "no votó",
  share: "Compartir",
  shareAria: "Copiar el enlace a esta entrada",
  copied: "Enlace copiado",
  copyError: "No se pudo copiar el enlace",
  seeAll: "Ver todas las entradas de todos los partidos",
  seeParty: "Ver todas las de {party}",
  // Página propia
  pageIntro: "Lo que cada partido prometió y lo que hizo después. Con fuentes.",
  // Rediseño: entradas plegadas, criterios y registro en acordeones.
  details: "Ver detalle",
  showEntries: "Ver las {n} más recientes",
  officialData: "Dato oficial",
  sourceType_independiente: "Fuente independiente",
  "sourceType_estadistica-oficial": "Estadística oficial",
  sourceType_gobierno: "Dato del propio Gobierno",
  sourceTypeHelp_independiente:
    "Lo mide un organismo que no depende del Gobierno evaluado: AIReF, Tribunal de Cuentas, Banco de España, Eurostat, OCDE, Comisión Europea, FMI o un tribunal.",
  "sourceTypeHelp_estadistica-oficial":
    "Serie estadística o registro oficial con metodología publicada: INE, IGAE, Seguridad Social, estadísticas de un ministerio (no sus notas de prensa), BOE o ley de presupuestos.",
  sourceTypeHelp_gobierno:
    "Lo dice el propio Gobierno (nota de prensa, web de un ministerio, preámbulo, informe de La Moncloa). Se enseña, pero no basta para un «cumple».",
  criteria8:
    "Independencia de la fuente, igual para todos los partidos que han gobernado: cada dato oficial dice quién lo mide (fuente independiente, estadística oficial o dato del propio Gobierno). Un «cumple» no puede apoyarse solo en datos del propio Gobierno; si no hay otros, la etiqueta máxima es «parcial» y la nota lo dice: «solo hay datos del propio Gobierno».",
  showSearchLog: "Ver qué se buscó",
  showCriteria: "Ver los criterios",
  criteriaTitle: "Cómo se eligen las entradas",
  criteria1:
    "El mismo criterio para todos los partidos: un compromiso real —programa electoral, campaña, discurso de investidura, acuerdo de coalición o de investidura, o una promesa explícita sobre lo que harán— con un hecho posterior que se pueda comprobar.",
  criteria7:
    "Nunca cuenta como «lo que dijeron» una intervención en el mismo debate de la votación con la que se compara: eso es anunciar el voto, no comprometerse. No hay un plazo mínimo entre lo dicho y lo hecho: una promesa de investidura que se incumple once días después cuenta.",
  // Contexto por partido: quien gobierna tiene más ocasiones de cumplir o incumplir.
  governedIn: "Gobernó en el Estado: {periods}",
  governedScope: "(periodos desde 2011, los que cubren estas entradas)",
  neverGoverned: "No ha gobernado en el Estado",
  present: "hoy",
  notComparable:
    "Los recuentos no son comparables entre partidos: quien gobierna tiene más ocasiones de cumplir o incumplir.",
  // Registro de búsqueda (página propia)
  searchLogTitle: "Qué buscamos y por qué no entró",
  searchLogIntro:
    "Lo que se buscó para cada partido y lo que se descartó, con el motivo. Lo que no aparece aquí ni en la lista no se ha investigado.",
  searchLogSearched: "Qué se buscó",
  searchLogExcluded: "Qué no entró y por qué",
  searchLogNoExcluded: "Nada descartado con un motivo que anotar.",
  searchLogGapTitle: "Pendiente de investigar",
  searchLogGap:
    "Los compromisos de los gobiernos autonómicos (Generalitat, Gobierno Vasco, Xunta, Gobierno de Canarias, Gobierno de Navarra…) aún no se han investigado, salvo los dos de Coalición Canaria que aparecen en la lista. Hasta entonces, los partidos que gobiernan una comunidad tienen menos entradas de las que podrían tener.",
  criteria2:
    "Se incluyen los compromisos cumplidos, no solo los incumplidos: una lista solo de incumplimientos sería un sesgo de selección. La profundidad es proporcional al tiempo de gobierno en el Estado: se buscan unas dos entradas por año de gobierno (mínimo cuatro), con los compromisos medibles más visibles y su resultado en datos oficiales.",
  criteria3:
    "Cada entrada lleva la cita literal (hasta {n} palabras) con su fuente, y el hecho con su votación, su referencia del BOE u otra prueba enlazada.",
  criteria4:
    "La etiqueta (cumple, contradice, parcial o no lo hicieron) describe la relación entre la cita y el hecho. Cuando es «parcial», la nota explica qué parte.",
  criteria6:
    "«No lo hicieron» solo se usa si el partido podía hacerlo —gobernaba, o lo firmó en un acuerdo de coalición o de investidura— y hay prueba primaria de que no ocurrió: la ficha de la iniciativa en congreso.es caducada o rechazada, el plazo del propio acuerdo vencido, o el fin de la legislatura sin norma en el BOE. La nota explica por qué el partido podía hacerlo.",
  criteria5: "No puntúa: no cambia el resultado del test ni el orden de los partidos.",
  methodologyLink: "Criterios completos en la metodología",
  filtersLabel: "Filtrar entradas",
  filterParty: "Partido",
  filterVerdict: "Etiqueta",
  filterTopic: "Tema",
  all: "Todos",
  allVerdicts: "Todas",
  clearFilters: "Quitar filtros",
  resultsCount: "{n} entradas",
  noMatches: "Ninguna entrada con estos filtros.",
  byParty: "Recuento por partido",
  // Ficha de partido
  partySectionHelp: "Compromisos públicos de este partido y lo que hizo después. No puntúa.",
  // Portada («cómo funciona») y pie
  introBody:
    "Compromisos públicos de cada partido y lo que hicieron después, con fuentes. Incluye los cumplidos. No puntúa.",
  introLink: "Ver «Dijeron vs. hicieron»",
  footerLink: "Dijeron vs. hicieron",
  // Imagen OG
  ogSaid: "Lo que dijeron",
  ogDid: "Lo que hicieron",
  // Botones hacia «Dijeron vs. hicieron» (resultado y ficha)
  resultTitle: "¿Cumplen lo que dicen?",
  resultButton: "Ver {party}",
  partyButton: "Dijeron vs. hicieron de {party}",
  shareImage: "Imagen para compartir",
  // Píldora de la barra del módulo (`ModuleBar`): corta, cabe a 360 px.
  modulePill: "Dijeron vs. hicieron",
};

export type DvhStrings = typeof es;

// Traducción automática pendiente de revisión humana.
const ca: DvhStrings = {
  title: "Van dir vs. van fer",
  notScored: "No puntua: no canvia el teu resultat ni l'ordre dels partits.",
  cardIntro: "Compromisos i el que van fer després. Inclou els complerts.",
  cardShown: "Es mostren les {n} més recents.",
  usualVote: "el partit que acostumes a votar",
  said: "El que van dir",
  did: "El que van fer",
  verdict_cumple: "Compleix",
  verdict_contradice: "Contradiu",
  verdict_parcial: "Parcial",
  "verdict_no-hecho": "No ho van fer",
  verdictHelp_cumple: "El que van fer coincideix amb el que van dir.",
  verdictHelp_contradice: "El que van fer va en sentit contrari al que van dir.",
  verdictHelp_parcial: "El que van fer coincideix en una part; el matís és a la nota.",
  "verdictHelp_no-hecho":
    "Podien fer-ho (governaven o ho van signar en un acord) i no va passar; la nota explica per què podien.",
  counts: "{c} complertes · {x} contradites · {p} parcials · {n} no fetes",
  countsLabel: "Recompte d'entrades recollides per a {party}",
  none: "Encara no hi ha entrades recollides per a aquest partit.",
  inPreparationTitle: "En preparació",
  inPreparationBody:
    "Encara no hi ha entrades publicades. Cadascuna apareixerà quan tingui la cita literal i el fet, tots dos amb una font que qualsevol pugui obrir.",
  note: "Nota",
  source: "font",
  page: "pàg. {page}",
  video: "veure el vídeo",
  videoFrom: "veure el vídeo (des de {t})",
  openCongreso: "veure a congreso.es",
  groupVote: "vot del grup: {vote}",
  initiativeStatus: "estat: {status}",
  officialValue: "— {value}",
  officialPublisher: "dada oficial de {publisher}",
  vote_si: "sí",
  vote_no: "no",
  vote_abstencion: "abstenció",
  vote_ausente: "no va votar",
  share: "Compartir",
  shareAria: "Copiar l'enllaç a aquesta entrada",
  copied: "Enllaç copiat",
  copyError: "No s'ha pogut copiar l'enllaç",
  seeAll: "Veure totes les entrades de tots els partits",
  seeParty: "Veure totes les de {party}",
  pageIntro: "El que cada partit va prometre i el que va fer després. Amb fonts.",
  details: "Veure el detall",
  showEntries: "Veure les {n} més recents",
  officialData: "Dada oficial",
  sourceType_independiente: "Font independent",
  "sourceType_estadistica-oficial": "Estadística oficial",
  sourceType_gobierno: "Dada del mateix Govern",
  sourceTypeHelp_independiente:
    "La mesura un organisme que no depèn del Govern avaluat: AIReF, Tribunal de Comptes, Banc d'Espanya, Eurostat, OCDE, Comissió Europea, FMI o un tribunal.",
  "sourceTypeHelp_estadistica-oficial":
    "Sèrie estadística o registre oficial amb metodologia publicada: INE, IGAE, Seguretat Social, estadístiques d'un ministeri (no les seves notes de premsa), BOE o llei de pressupostos.",
  sourceTypeHelp_gobierno:
    "Ho diu el mateix Govern (nota de premsa, web d'un ministeri, preàmbul, informe de la Moncloa). Es mostra, però no n'hi ha prou per a un «compleix».",
  criteria8:
    "Independència de la font, igual per a tots els partits que han governat: cada dada oficial diu qui la mesura (font independent, estadística oficial o dada del mateix Govern). Un «compleix» no es pot basar només en dades del mateix Govern; si no n'hi ha d'altres, l'etiqueta màxima és «parcial» i la nota ho diu: «només hi ha dades del mateix Govern».",
  showSearchLog: "Veure què es va buscar",
  showCriteria: "Veure els criteris",
  criteriaTitle: "Com es trien les entrades",
  criteria1:
    "El mateix criteri per a tots els partits: un compromís real —programa electoral, campanya, discurs d'investidura, acord de coalició o d'investidura, o una promesa explícita sobre el que faran— amb un fet posterior que es pugui comprovar.",
  criteria7:
    "Mai no compta com a «el que van dir» una intervenció en el mateix debat de la votació amb què es compara: això és anunciar el vot, no comprometre-s'hi. No hi ha un termini mínim entre el que es diu i el que es fa: una promesa d'investidura que s'incompleix onze dies després compta.",
  governedIn: "Ha governat a l'Estat: {periods}",
  governedScope: "(períodes des del 2011, els que cobreixen aquestes entrades)",
  neverGoverned: "No ha governat a l'Estat",
  present: "avui",
  notComparable:
    "Els recomptes no són comparables entre partits: qui governa té més ocasions de complir o d'incomplir.",
  searchLogTitle: "Què hem buscat i per què no hi ha entrat",
  searchLogIntro:
    "El que es va buscar per a cada partit i el que es va descartar, amb el motiu. El que no apareix aquí ni a la llista no s'ha investigat.",
  searchLogSearched: "Què es va buscar",
  searchLogExcluded: "Què no hi va entrar i per què",
  searchLogNoExcluded: "No s'ha descartat res amb un motiu que calgui anotar.",
  searchLogGapTitle: "Pendent d'investigar",
  searchLogGap:
    "Els compromisos dels governs autonòmics (Generalitat, Govern Basc, Xunta, Govern de Canàries, Govern de Navarra…) encara no s'han investigat, llevat dels dos de Coalición Canaria que apareixen a la llista. Fins aleshores, els partits que governen una comunitat tenen menys entrades de les que podrien tenir.",
  criteria2:
    "S'hi inclouen els compromisos complerts, no només els incomplerts: una llista només d'incompliments seria un biaix de selecció. La profunditat és proporcional al temps de govern a l'Estat: es busquen unes dues entrades per any de govern (mínim quatre), amb els compromisos mesurables més visibles i el seu resultat en dades oficials.",
  criteria3:
    "Cada entrada porta la cita literal (fins a {n} paraules) amb la seva font, i el fet amb la seva votació, la seva referència del BOE o una altra prova enllaçada.",
  criteria4:
    "L'etiqueta (compleix, contradiu, parcial o no ho van fer) descriu la relació entre la cita i el fet. Quan és «parcial», la nota explica quina part.",
  criteria6:
    "«No ho van fer» només s'utilitza si el partit podia fer-ho —governava, o ho va signar en un acord de coalició o d'investidura— i hi ha prova primària que no va passar: la fitxa de la iniciativa a congreso.es caducada o rebutjada, el termini del mateix acord vençut, o el final de la legislatura sense norma al BOE. La nota explica per què el partit podia fer-ho.",
  criteria5: "No puntua: no canvia el resultat del test ni l'ordre dels partits.",
  methodologyLink: "Criteris complets a la metodologia",
  filtersLabel: "Filtrar les entrades",
  filterParty: "Partit",
  filterVerdict: "Etiqueta",
  filterTopic: "Tema",
  all: "Tots",
  allVerdicts: "Totes",
  clearFilters: "Treure els filtres",
  resultsCount: "{n} entrades",
  noMatches: "Cap entrada amb aquests filtres.",
  byParty: "Recompte per partit",
  partySectionHelp: "Compromisos públics d'aquest partit i el que va fer després. No puntua.",
  introBody:
    "Compromisos públics de cada partit i el que van fer després, amb fonts. Inclou els complerts. No puntua.",
  introLink: "Veure «Van dir vs. van fer»",
  footerLink: "Van dir vs. van fer",
  ogSaid: "El que van dir",
  ogDid: "El que van fer",
  resultTitle: "Compleixen el que diuen?",
  resultButton: "Veure {party}",
  partyButton: "Van dir vs. van fer de {party}",
  shareImage: "Imatge per compartir",
  modulePill: "Van dir vs. van fer",
};

// Tradución automática pendente de revisión humana.
const gl: DvhStrings = {
  title: "Dixeron vs. fixeron",
  notScored: "Non puntúa: non cambia o teu resultado nin a orde dos partidos.",
  cardIntro: "Compromisos e o que fixeron despois. Inclúe os cumpridos.",
  cardShown: "Amósanse as {n} máis recentes.",
  usualVote: "o partido que adoitas votar",
  said: "O que dixeron",
  did: "O que fixeron",
  verdict_cumple: "Cumpre",
  verdict_contradice: "Contradí",
  verdict_parcial: "Parcial",
  "verdict_no-hecho": "Non o fixeron",
  verdictHelp_cumple: "O que fixeron coincide co que dixeron.",
  verdictHelp_contradice: "O que fixeron vai en sentido contrario ao que dixeron.",
  verdictHelp_parcial: "O que fixeron coincide nunha parte; o matiz está na nota.",
  "verdictHelp_no-hecho":
    "Podían facelo (gobernaban ou asinárono nun acordo) e non ocorreu; a nota explica por que podían.",
  counts: "{c} cumpridas · {x} contraditas · {p} parciais · {n} non feitas",
  countsLabel: "Reconto de entradas recollidas para {party}",
  none: "Aínda non hai entradas recollidas para este partido.",
  inPreparationTitle: "En preparación",
  inPreparationBody:
    "Aínda non hai entradas publicadas. Cada unha aparecerá cando teña a cita literal e o feito, os dous cunha fonte que calquera poida abrir.",
  note: "Nota",
  source: "fonte",
  page: "páx. {page}",
  video: "ver o vídeo",
  videoFrom: "ver o vídeo (desde {t})",
  openCongreso: "ver en congreso.es",
  groupVote: "voto do grupo: {vote}",
  initiativeStatus: "estado: {status}",
  officialValue: "— {value}",
  officialPublisher: "dato oficial de {publisher}",
  vote_si: "si",
  vote_no: "non",
  vote_abstencion: "abstención",
  vote_ausente: "non votou",
  share: "Compartir",
  shareAria: "Copiar a ligazón a esta entrada",
  copied: "Ligazón copiada",
  copyError: "Non se puido copiar a ligazón",
  seeAll: "Ver todas as entradas de todos os partidos",
  seeParty: "Ver todas as de {party}",
  pageIntro: "O que cada partido prometeu e o que fixo despois. Con fontes.",
  details: "Ver detalle",
  showEntries: "Ver as {n} máis recentes",
  officialData: "Dato oficial",
  sourceType_independiente: "Fonte independente",
  "sourceType_estadistica-oficial": "Estatística oficial",
  sourceType_gobierno: "Dato do propio Goberno",
  sourceTypeHelp_independiente:
    "Mídeo un organismo que non depende do Goberno avaliado: AIReF, Tribunal de Contas, Banco de España, Eurostat, OCDE, Comisión Europea, FMI ou un tribunal.",
  "sourceTypeHelp_estadistica-oficial":
    "Serie estatística ou rexistro oficial con metodoloxía publicada: INE, IGAE, Seguridade Social, estatísticas dun ministerio (non as súas notas de prensa), BOE ou lei de orzamentos.",
  sourceTypeHelp_gobierno:
    "Dio o propio Goberno (nota de prensa, web dun ministerio, preámbulo, informe da Moncloa). Amósase, pero non abonda para un «cumpre».",
  criteria8:
    "Independencia da fonte, igual para todos os partidos que gobernaron: cada dato oficial di quen o mide (fonte independente, estatística oficial ou dato do propio Goberno). Un «cumpre» non pode apoiarse só en datos do propio Goberno; se non hai outros, a etiqueta máxima é «parcial» e a nota dio: «só hai datos do propio Goberno».",
  showSearchLog: "Ver que se buscou",
  showCriteria: "Ver os criterios",
  criteriaTitle: "Como se escollen as entradas",
  criteria1:
    "O mesmo criterio para todos os partidos: un compromiso real —programa electoral, campaña, discurso de investidura, acordo de coalición ou de investidura, ou unha promesa explícita sobre o que farán— cun feito posterior que se poida comprobar.",
  criteria7:
    "Nunca conta como «o que dixeron» unha intervención no mesmo debate da votación coa que se compara: iso é anunciar o voto, non comprometerse. Non hai un prazo mínimo entre o dito e o feito: unha promesa de investidura que se incumpre once días despois conta.",
  governedIn: "Gobernou no Estado: {periods}",
  governedScope: "(períodos desde 2011, os que cobren estas entradas)",
  neverGoverned: "Non gobernou no Estado",
  present: "hoxe",
  notComparable:
    "Os recontos non son comparables entre partidos: quen goberna ten máis ocasións de cumprir ou incumprir.",
  searchLogTitle: "Que buscamos e por que non entrou",
  searchLogIntro:
    "O que se buscou para cada partido e o que se descartou, co motivo. O que non aparece aquí nin na lista non se investigou.",
  searchLogSearched: "Que se buscou",
  searchLogExcluded: "Que non entrou e por que",
  searchLogNoExcluded: "Nada descartado cun motivo que anotar.",
  searchLogGapTitle: "Pendente de investigar",
  searchLogGap:
    "Os compromisos dos gobernos autonómicos (Generalitat, Goberno Vasco, Xunta, Goberno de Canarias, Goberno de Navarra…) aínda non se investigaron, agás os dous de Coalición Canaria que aparecen na lista. Ata entón, os partidos que gobernan unha comunidade teñen menos entradas das que poderían ter.",
  criteria2:
    "Inclúense os compromisos cumpridos, non só os incumpridos: unha lista só de incumprimentos sería un nesgo de selección. A profundidade é proporcional ao tempo de goberno no Estado: búscanse unhas dúas entradas por ano de goberno (mínimo catro), cos compromisos medibles máis visibles e o seu resultado en datos oficiais.",
  criteria3:
    "Cada entrada leva a cita literal (ata {n} palabras) coa súa fonte, e o feito coa súa votación, a súa referencia do BOE ou outra proba ligada.",
  criteria4:
    "A etiqueta (cumpre, contradí, parcial ou non o fixeron) describe a relación entre a cita e o feito. Cando é «parcial», a nota explica que parte.",
  criteria6:
    "«Non o fixeron» só se usa se o partido podía facelo —gobernaba, ou asinouno nun acordo de coalición ou de investidura— e hai proba primaria de que non ocorreu: a ficha da iniciativa en congreso.es caducada ou rexeitada, o prazo do propio acordo vencido, ou o fin da lexislatura sen norma no BOE. A nota explica por que o partido podía facelo.",
  criteria5: "Non puntúa: non cambia o resultado do test nin a orde dos partidos.",
  methodologyLink: "Criterios completos na metodoloxía",
  filtersLabel: "Filtrar entradas",
  filterParty: "Partido",
  filterVerdict: "Etiqueta",
  filterTopic: "Tema",
  all: "Todos",
  allVerdicts: "Todas",
  clearFilters: "Quitar os filtros",
  resultsCount: "{n} entradas",
  noMatches: "Ningunha entrada con estes filtros.",
  byParty: "Reconto por partido",
  partySectionHelp: "Compromisos públicos deste partido e o que fixo despois. Non puntúa.",
  introBody:
    "Compromisos públicos de cada partido e o que fixeron despois, con fontes. Inclúe os cumpridos. Non puntúa.",
  introLink: "Ver «Dixeron vs. fixeron»",
  footerLink: "Dixeron vs. fixeron",
  ogSaid: "O que dixeron",
  ogDid: "O que fixeron",
  resultTitle: "Cumpren o que din?",
  resultButton: "Ver {party}",
  partyButton: "Dixeron vs. fixeron de {party}",
  shareImage: "Imaxe para compartir",
  modulePill: "Dixeron vs. fixeron",
};

// Itzulpen automatikoa, giza berrikuspenaren zain.
const eu: DvhStrings = {
  title: "Esan zutena eta egin zutena",
  notScored: "Ez du puntuatzen: ez du zure emaitza aldatzen, ezta alderdien ordena ere.",
  cardIntro: "Konpromisoak eta gero egin zutena. Betetakoak ere sartzen dira.",
  cardShown: "Azken {n} sarrerak erakusten dira.",
  usualVote: "normalean bozkatzen duzun alderdia",
  said: "Esan zutena",
  did: "Egin zutena",
  verdict_cumple: "Betetzen du",
  verdict_contradice: "Kontraesaten du",
  verdict_parcial: "Partziala",
  "verdict_no-hecho": "Ez zuten egin",
  verdictHelp_cumple: "Egin zutena bat dator esan zutenarekin.",
  verdictHelp_contradice: "Egin zutena esan zutenaren kontrako norabidean doa.",
  verdictHelp_parcial: "Egin zutena zati batean dator bat; ñabardura oharrean dago.",
  "verdictHelp_no-hecho":
    "Egin zezaketen (gobernuan zeuden edo akordio batean sinatu zuten) eta ez zen gertatu; oharrak azaltzen du zergatik zuten egiteko aukera.",
  counts: "{c} beteta · {x} kontraesanda · {p} partzial · {n} egin gabe",
  countsLabel: "{party}(r)entzat bildutako sarreren zenbaketa",
  none: "Oraindik ez dago sarrerarik alderdi honentzat.",
  inPreparationTitle: "Prestatzen",
  inPreparationBody:
    "Oraindik ez dago sarrerarik argitaratuta. Bakoitza agertuko da aipamen literala eta egitatea dituenean, biak edonork ireki dezakeen iturri batekin.",
  note: "Oharra",
  source: "iturria",
  page: "or. {page}",
  video: "bideoa ikusi",
  videoFrom: "bideoa ikusi (hasiera: {t})",
  openCongreso: "congreso.es-en ikusi",
  groupVote: "taldearen botoa: {vote}",
  initiativeStatus: "egoera: {status}",
  officialValue: "— {value}",
  officialPublisher: "datu ofiziala: {publisher}",
  vote_si: "bai",
  vote_no: "ez",
  vote_abstencion: "abstentzioa",
  vote_ausente: "ez zuen bozkatu",
  share: "Partekatu",
  shareAria: "Sarrera honetarako esteka kopiatu",
  copied: "Esteka kopiatuta",
  copyError: "Ezin izan da esteka kopiatu",
  seeAll: "Ikusi alderdi guztien sarrera guztiak",
  seeParty: "Ikusi {party}(r)en guztiak",
  pageIntro: "Alderdi bakoitzak agindu zuena eta gero egin zuena. Iturriekin.",
  details: "Xehetasuna ikusi",
  showEntries: "Ikusi azken {n} sarrerak",
  officialData: "Datu ofiziala",
  sourceType_independiente: "Iturri independentea",
  "sourceType_estadistica-oficial": "Estatistika ofiziala",
  sourceType_gobierno: "Gobernuaren beraren datua",
  sourceTypeHelp_independiente:
    "Ebaluatutako Gobernuaren menpe ez dagoen erakunde batek neurtzen du: AIReF, Kontuen Auzitegia, Espainiako Bankua, Eurostat, OCDE, Europako Batzordea, NDF edo auzitegi bat.",
  "sourceTypeHelp_estadistica-oficial":
    "Metodologia argitaratua duen serie estatistikoa edo erregistro ofiziala: INE, IGAE, Gizarte Segurantza, ministerio baten estatistikak (ez haren prentsa-oharrak), BOE edo aurrekontu-legea.",
  sourceTypeHelp_gobierno:
    "Gobernuak berak dio (prentsa-oharra, ministerio baten webgunea, hitzaurrea, Moncloaren txostena). Erakusten da, baina ez da nahikoa «betetzen du» baterako.",
  criteria8:
    "Iturriaren independentzia, berdina gobernatu duten alderdi guztientzat: datu ofizial bakoitzak dio nork neurtzen duen (iturri independentea, estatistika ofiziala edo Gobernuaren beraren datua). «Betetzen du» bat ezin da Gobernuaren beraren datuetan soilik oinarritu; beste daturik ez badago, etiketa gorena «partziala» da, eta oharrak hala dio: «Gobernuaren beraren datuak baino ez daude».",
  showSearchLog: "Ikusi zer bilatu zen",
  showCriteria: "Ikusi irizpideak",
  criteriaTitle: "Nola aukeratzen dira sarrerak",
  criteria1:
    "Irizpide bera alderdi guztientzat: benetako konpromiso bat —hauteskunde-programa, kanpaina, inbestidura-hitzaldia, koalizio- edo inbestidura-akordioa, edo egingo dutenari buruzko promesa esplizitu bat— eta geroago egiaztatu daitekeen egitate bat.",
  criteria7:
    "Konparatzen den bozketaren eztabaida berean egindako esku-hartze bat ez da inoiz «esan zutena» gisa hartzen: hori botoa iragartzea da, ez konpromisoa hartzea. Ez dago gutxieneko eperik esandakoaren eta egindakoaren artean: hamaika egun geroago betetzen ez den inbestidura-promesa bat ere kontatzen da.",
  governedIn: "Estatuan gobernatu du: {periods}",
  governedScope: "(2011tik aurrerako aldiak, sarrera hauek hartzen dituztenak)",
  neverGoverned: "Ez du Estatuan gobernatu",
  present: "gaur",
  notComparable:
    "Zenbaketak ez dira alderdien artean konparagarriak: gobernatzen duenak aukera gehiago ditu betetzeko edo ez betetzeko.",
  searchLogTitle: "Zer bilatu genuen eta zergatik ez zen sartu",
  searchLogIntro:
    "Alderdi bakoitzerako bilatu zena eta baztertu zena, arrazoiarekin. Hemen edo zerrendan agertzen ez dena ez da ikertu.",
  searchLogSearched: "Zer bilatu zen",
  searchLogExcluded: "Zer ez zen sartu eta zergatik",
  searchLogNoExcluded: "Ez da ezer baztertu idazteko moduko arrazoi batekin.",
  searchLogGapTitle: "Ikertzeko dago",
  searchLogGap:
    "Autonomia-gobernuen konpromisoak (Generalitat, Eusko Jaurlaritza, Xunta, Kanarietako Gobernua, Nafarroako Gobernua…) oraindik ez dira ikertu, zerrendan agertzen diren Coalición Canariaren biak izan ezik. Bitartean, erkidego bat gobernatzen duten alderdiek izan litzaketenak baino sarrera gutxiago dituzte.",
  criteria2:
    "Betetako konpromisoak ere sartzen dira, ez bakarrik bete gabeak: bete gabeak bakarrik dituen zerrenda bat hautapen-alborapena litzateke. Sakontasuna Estatuko gobernu-denboraren araberakoa da: gobernu-urte bakoitzeko bi sarrera inguru bilatzen dira (gutxienez lau), konpromiso neurgarri ikusgarrienekin eta datu ofizialetako emaitzarekin.",
  criteria3:
    "Sarrera bakoitzak aipamen literala dauka (gehienez {n} hitz) bere iturriarekin, eta egitatea bere bozketarekin, BOEko erreferentziarekin edo estekatutako beste froga batekin.",
  criteria4:
    "Etiketak (betetzen du, kontraesaten du, partziala edo ez zuten egin) aipamenaren eta egitatearen arteko harremana deskribatzen du. «Partziala» denean, oharrak azaltzen du zein zati.",
  criteria6:
    "«Ez zuten egin» alderdiak egin zezakeenean bakarrik erabiltzen da —gobernuan zegoen, edo koalizio- edo inbestidura-akordio batean sinatu zuen— eta ez zela gertatu dioen lehen mailako froga dagoenean: congreso.es-eko ekimenaren fitxa iraungita edo baztertuta, akordioaren beraren epea amaituta, edo legealdiaren amaiera BOEn araurik gabe. Oharrak azaltzen du zergatik zuen alderdiak egiteko aukera.",
  criteria5: "Ez du puntuatzen: ez du testaren emaitza aldatzen, ezta alderdien ordena ere.",
  methodologyLink: "Irizpide osoak metodologian",
  filtersLabel: "Sarrerak iragazi",
  filterParty: "Alderdia",
  filterVerdict: "Etiketa",
  filterTopic: "Gaia",
  all: "Guztiak",
  allVerdicts: "Guztiak",
  clearFilters: "Iragazkiak kendu",
  resultsCount: "{n} sarrera",
  noMatches: "Ez dago sarrerarik iragazki hauekin.",
  byParty: "Zenbaketa alderdika",
  partySectionHelp: "Alderdi honen konpromiso publikoak eta gero egin zuena. Ez du puntuatzen.",
  introBody:
    "Alderdi bakoitzaren konpromiso publikoak eta gero egin zutena, iturriekin. Betetakoak ere sartzen dira. Ez du puntuatzen.",
  introLink: "Ikusi «Esan zutena eta egin zutena»",
  footerLink: "Esan zutena eta egin zutena",
  ogSaid: "Esan zutena",
  ogDid: "Egin zutena",
  resultTitle: "Esaten dutena betetzen dute?",
  resultButton: "Ikusi {party}",
  partyButton: "{party}: esan zutena eta egin zutena",
  shareImage: "Partekatzeko irudia",
  modulePill: "Esanak eta eginak",
};

const DICTS = { es, ca, gl, eu } as const;

/** Textos para un idioma; un `locale` que no sea de las cuatro lenguas (p. ej. `pt`) recibe el castellano. */
export function getDvhStrings(locale: string | null | undefined): DvhStrings {
  return pick<DvhStrings>(DICTS, locale ?? "es");
}

/** Las cuatro tablas sin mezclar, para el test de completitud (`afinidad-i18n.test.ts`). */
export const DVH_TABLES = { es, ca, gl, eu } as const;
