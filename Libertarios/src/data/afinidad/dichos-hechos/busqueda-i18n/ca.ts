/**
 * Registro de búsqueda de «Dijeron vs. hicieron» en catalán («Van dir vs. van
 * fer»). Misma forma y mismo orden que `DVH_KNOWN_GAPS` y `dvhSearchLog` de
 * `../busqueda.ts`, entrada a entrada.
 *
 * Traducción automática pendiente de revisión por una persona nativa. Las citas
 * literales entre «» (lo que dijeron políticos o documentos), los ids de
 * entrada y los títulos de documentos se dejan tal cual.
 */

import type { DvhSearchLogTranslation } from "../busqueda";

const SAME_DEBATE =
  "El «dit» és una intervenció en el mateix debat de la votació amb què es comparava: és anunciar el vot, no comprometre's (revisió del 2026-10-06).";

/** Mètode comú a ERC, Junts, EH Bildu, PNV i BNG (mateixa persona, mateixa cerca). */
const NACIONALISTAS_SEARCHED = [
  "Programa de les generals de 2023 creuat amb totes les votacions de la XV legislatura: no hi ha cap cas de signe contrari; només diferències de grau («parcial»).",
  "Els 201 Diaris de Sessions del Ple de la XV: cada frase dels seus portaveus que anuncia un vot, comparada amb el vot del grup aquell dia. En van sortir 8 discrepàncies aparents; totes eren esmenes o votacions de totalitat, en què votar «no» és coherent amb donar suport a la llei.",
  "Compromisos de cara al futur en aquests Diaris («votaremos… cuando», «nunca votaremos», «presentaremos», «mientras no»…): uns 190 resultats revisats a mà i contrastats amb votacions posteriors.",
  "Votacions en què el partit vota «sí» en un tràmit i «no» en un altre de la mateixa iniciativa: cap cas real (eren iniciatives diferents amb un títol semblant).",
];

export const searchLogCa: DvhSearchLogTranslation = {
  gaps: [
    "Compromisos dels governs autonòmics (Generalitat, Govern Basc, Xunta, Govern de Canàries, Govern de Navarra, juntes i consells de govern d'altres comunitats): exigeixen el diari oficial i el diari de sessions de cada parlament autonòmic i no s'han investigat, excepte les dues entrades de Coalición Canaria.",
    "Votacions d'investidura del Congrés: són per crida i no tenen JSON a les dades obertes, de manera que no serveixen com a prova amb el mateix estàndard que la resta.",
  ],
  log: [
    {
      partyId: "psoe",
      searched: [
        "Discurs d'investidura de 2020 (Diari de Sessions), acords de coalició de 2019 i 2023, i declaracions i entrevistes del president amb transcripció oficial de La Moncloa.",
        "Cada compromís, contrastat amb el BOE i amb les votacions del Congrés (XIV i XV).",
        "Segona passada (2026-10-07), amb la regla de ≈ 2 entrades per any de govern de l'Estat (PSOE: des de juny de 2018, ≈ 8 anys, objectiu ≈ 16): discursos d'investidura de 2020 i 2023 i acords de coalició de 2019 i 2023 llegits sencers, més transcripcions de La Moncloa, contrastats amb la IGAE (dèficit), l'informe del Fons de Reserva de la Seguretat Social, el BOE (textos consolidats) i la relació de projectes de llei de la XV a les dades obertes del Congrés.",
      ],
      excluded: [
        { what: "Rehabilitar 500.000 habitatges per a l'eficiència energètica (acord PSOE-SUMAR de 2023, p. 29).", why: "L'acord no fixa termini, i no s'ha localitzat una sèrie oficial estatal que compti habitatges rehabilitats acabats amb un criteri únic: les ajudes les gestionen les comunitats autònomes amb programes diferents (Pla de Recuperació i Pla Estatal) i no se sumen en una xifra comparable." },
        { what: "Consolidar el Bono Alquiler Joven «para llegar a toda la población joven» (acord de 2023, p. 30) i «aumentar el bono para el alquiler» (investidura de 2023).", why: "«Llegar a toda la población joven» no té una xifra per contrastar, i el bo el resolen i el paguen les comunitats autònomes: no s'ha localitzat una dada oficial estatal de beneficiaris per any." },
        { what: "Elevar el parc públic de lloguer assequible «hasta el 20 % del parque total de vivienda» (acord de 2023, p. 29).", why: "El mateix acord ho situa «a medio y largo plazo», més enllà de la legislatura: no es pot donar per no fet en acabar aquesta. El que és mesurable de la legislatura (183.000 habitatges) ja té la seva entrada." },
        { what: "Habitatges de lloguer social finançats pel Pla de Recuperació (objectiu d'uns 20.000).", why: "És una fita del Pla que avalua la Comissió Europea, no un compromís del partit amb cita pròpia, i els seus habitatges ja compten dins dels 183.000 de l'entrada «psoe-vivienda-183000-2023» (24.867 «Plan de Recuperación» a la dada del Ministeri): seria comptar dues vegades el mateix." },
        { what: "Renovació del CGPJ i d'altres òrgans «mediante acuerdos parlamentarios de consenso» (acord de 2019, punt 2.11.1).", why: "El compromís és «promover acuerdos», que no es pot mesurar; el resultat (CGPJ renovat el juliol de 2024, Defensor del Poble el 2021) depenia de majories de tres cinquenes que incloïen el PP." },
        { what: "Temporalitat de l'ocupació i deute públic.", why: "No s'ha trobat a les investidures ni als acords un compromís amb xifra o objectiu comprovable; la temporalitat queda coberta per l'entrada de la reforma laboral." },
        { what: "Fites i desemborsaments del Pla de Recuperació.", why: "Són compromisos del Govern amb la Comissió Europea avaluats per ella a cada sol·licitud de pagament, no frases del partit; queden fora excepte quan una promesa pròpia els cita (habitatge)." },
        { what: "«Impulsaremos un nuevo modelo de financiación autonómica» (investidura i acord de 2023).", why: "No va com a entrada a part: és el mateix compromís que el de 2020 («psoe-financiacion-autonomica-2020») i es recull a la seva nota." },
        { what: "Canvi de posició sobre el Sàhara (2022).", why: "Va ser una carta al Govern del Marroc, no un acte publicat al BOE, i el programa no era explícit." },
        { what: "«No pactaré con Bildu».", why: "Massa vague per comprovar-ho amb un fet concret." },
        { what: "«Traeré a Puigdemont».", why: "No hi ha un acte del partit o del Govern que es pugui citar com a fet." },
        { what: "Limitar els aforaments (acord de coalició de 2019, punt 2.11.7).", why: "No es va remetre mai a les Corts: no hi ha fitxa d'iniciativa a congreso.es que serveixi de prova primària d'un «no ho van fer»." },
        { what: "Estatut del becari (acords de 2019 i 2023).", why: "El Govern va remetre el projecte el març de 2026 i va caducar sense majoria: no està clar que depengués del partit." },
      ],
    },
    {
      partyId: "pp",
      searched: [
        "Discurs d'investidura de Mariano Rajoy (19-12-2011) i programa de 2011, contrastats amb el que va publicar el BOE durant els seus governs (2011-2018).",
        "Investidura d'Alberto Núñez Feijóo (2023) i pacte de govern a Extremadura (2023).",
        "Segona passada (2026-10-07), amb la regla de ≈ 2 entrades per any de govern de l'Estat: investidures de Rajoy de 2011 i de 2016 (30-8 i 26-10), programa de 2011 i transcripcions de La Moncloa, contrastats amb dades oficials de resultat (Eurostat, Ministeri d'Hisenda, Banc d'Espanya) i amb el BOE i el BOCG.",
      ],
      excluded: [
        { what: "«20 millones de personas trabajando en la España de 2020» (investidura del 30-8-2016).", why: "El termini (2020) venç després que el PP deixés el Govern (juny de 2018): no es pot contrastar amb el que va fer." },
        { what: "Rebaixa de 2 punts de l'IRPF «tan pronto como alcancemos nuestro objetivo de reducir el déficit público por debajo del 3 %» (investidura del 30-8-2016).", why: "El dèficit va baixar del 3 % amb les dades de 2018 (2,6 %, Eurostat), que es van conèixer el 2019, quan el PP ja no governava: la condició no es va donar mentre la podia complir." },
        { what: "Pujada de l'IVA de 2012 (Reial decret llei 20/2012).", why: "Ni la investidura de 2011 ni el programa de 2011 tenen un compromís explícit sobre el tipus general de l'IVA; la frase «mi intención es no subir los impuestos» ja és a «pp-irpf-2011» i no es duplica." },
        { what: "Revaloració de les pensions del 0,25 % (Llei 23/2013).", why: "No es va trobar un compromís posterior a la investidura de 2011 que digui el contrari; el de 2012 ja és a «pp-pensiones-2012»." },
        { what: "Luis de Guindos (juny de 2012): el préstec europeu a la banca «no tendrá coste para los ciudadanos».", why: "Només consta a la premsa; es va fer servir la frase equivalent de la vicepresidenta del Govern amb transcripció oficial de La Moncloa («pp-rescate-bancario-coste»)." },
        { what: "Taxes judicials (Llei 10/2012).", why: "No hi ha un compromís previ sobre taxes judicials a la investidura ni al programa de 2011 amb què contrastar-les." },
        { what: "«No habrá referéndum» a Catalunya (2017).", why: "Si l'1-O va ser o no un referèndum està discutit; l'etiqueta seria una interpretació." },
      ],
    },
    {
      partyId: "vox",
      searched: [
        "Programa de les generals de 2023 i discursos de Santiago Abascal al Ple (moció de censura de 2020, investidures), contrastats amb les votacions de la XIV i la XV.",
        "Es van cercar expressament compromisos seguits d'un acte en sentit contrari.",
      ],
      excluded: [
        { what: "Abstenció en el decret dels fons europeus (2021).", why: "No hi havia un compromís previ explícit: l'etiqueta seria una interpretació." },
        { what: "Derogació de la llei de memòria a l'Aragó (Llei 1/2024).", why: "No es va trobar el text de l'acord PP-Vox ni una cita literal de Vox." },
        { what: "Sortida dels governs autonòmics el juliol de 2024 pel repartiment de menors migrants.", why: "Els decrets autonòmics no encaixen en cap tipus de prova de l'esquema (compromisos autonòmics encara sense investigar)." },
        { what: "Protocol antiavortament a Castella i Lleó.", why: "Els fets estan discutits." },
        { what: "Revaloració de pensions dins del decret òmnibus.", why: "La lectura està discutida (el decret barrejava diverses mesures)." },
      ],
    },
    {
      partyId: "sumar",
      searched: [
        "Acord de coalició PSOE-SUMAR (24-10-2023), programa de 2023 i Diari de Sessions, contrastats amb el BOE i les votacions de la XV.",
        "Incompliments per manca d'acte: només entren com a «no ho van fer» si hi ha prova primària (fitxa d'iniciativa, dissolució al BOE); així va entrar la «llei mordassa».",
        "Regla de profunditat (2026-10-07): ≈ 2 entrades per any de govern de l'Estat, mínim 4. Sumar governa en coalició des de novembre de 2023 (≈ 3 anys): objectiu ≈ 6. Ja en té 10, de manera que a la segona passada no se n'hi va afegir cap.",
      ],
      excluded: [
        { what: "Rehabilitació de 500.000 habitatges, Bono Alquiler Joven per a «toda la población joven» i parc públic del 20 % (acord PSOE-SUMAR de 2023, pp. 29-30).", why: "Els mateixos motius que en el PSOE, que va signar el mateix acord: sense termini o «a medio y largo plazo», o sense una dada oficial estatal comparable (les ajudes les gestionen les comunitats autònomes)." },
        { what: "Nou Estatut dels Treballadors (Sumar dirigia el Ministeri de Treball).", why: "L'acord de coalició de 2023 no el recull (només fixar a l'Estatut la pujada del salari mínim); la promesa és de la investidura de Pedro Sánchez i hi és com a entrada del PSOE. El programa de Sumar de 2023 no s'ha comprovat per a aquest punt." },
        { what: "Estatut del becari (acord de 2023).", why: "El Govern va remetre el projecte el març de 2026 i va caducar sense majoria: no està clar que depengués de Sumar." },
        { what: "Reforma de l'acomiadament (acord de 2023), herència universal i jornada de 32 hores (programa).", why: "No hi ha una iniciativa amb fitxa a congreso.es que serveixi de prova primària que no es va fer." },
        { what: "Despesa en defensa.", why: "El pla d'abril de 2025 va ser un acord del Consell de Ministres que no es va trobar al BOE, i la votació àncora (11-6-2026, Sumar «sí») és coherent amb el que va dir." },
        { what: "Programes d'armament (programa, p. 139).", why: "Massa general; per a l'embargament a Israel es va fer servir la intervenció de la seva portaveu al Ple." },
      ],
    },
    {
      partyId: "podemos",
      searched: [
        "Programa de les generals del 10-N-2019, acord de coalició de 2019 i Diari de Sessions, contrastats amb el BOE i les votacions de la XIV (grup GCUP-EC-GC) i la XV (vot per diputat).",
        "Regla de profunditat (2026-10-07): ≈ 2 entrades per any de govern de l'Estat, mínim 4. Unidas Podemos va governar en coalició de gener de 2020 a novembre de 2023 (≈ 4 anys): objectiu ≈ 8. Ja en té 8, de manera que a la segona passada no se n'hi va afegir cap.",
      ],
      excluded: [
        { what: "Nou Estatut dels Treballadors (acord de coalició de 2019, punt 1.2), que no es va fer a la XIV.", why: "Ja hi és com a entrada del PSOE amb la mateixa prova, i la cartera de Treball la portava Yolanda Díaz, de la quota d'Unidas Podemos però avui a Sumar: atribuir-ho a Podemos seria discutible." },
        { what: "Despesa militar: el grup GCUP-EC-GC va votar «sí» a la secció de Defensa dels Pressupostos de 2023.", why: "L'únic «no lo apoyaremos» explícit és de Jaume Asens (En Comú Podem, no Podemos) i només consta a la premsa; de Podemos només hi ha desacord, no un compromís." },
        { what: "Decret d'embargament d'armes d'octubre de 2025.", why: "Es va criticar, però no hi va haver una promesa explícita de votar-hi en contra." },
        { what: "Llei de mobilitat sostenible.", why: "Es va posar una condició i després el partit es va abstenir: l'etiqueta seria una interpretació." },
        { what: "Decrets d'habitatge de 2026.", why: "Se'n va demanar la retirada, però no hi va haver compromís de votar-hi en contra." },
        { what: "Discurs d'investidura de 2020 de Pablo Iglesias com a font.", why: "L'enllaç oficial del Diari de Sessions retornava error; es va fer servir el programa." },
        { what: "«Si quieren los votos de Podemos, tiene que haber impuesto a las grandes energéticas» (21-11-2024).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "erc",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Rufián (2015): «en 18 meses dejaré mi escaño».", why: "Ho lligava a la independència de Catalunya: si es va incomplir està discutit." },
        { what: "Estrems (25-11-2025): votarien a favor de tota proposta per frenar la pujada de l'habitatge i «nunca» en contra.", why: "Després van votar «no» a punts de mocions del PP sobre habitatge; si aquests punts tenien aquesta finalitat és una interpretació." },
        { what: "Derogar la «llei mordassa» (programa).", why: "Diu «derogar» i no es va comprovar si la proposició de 2024 la deroga sencera." },
        { what: "Compromisos del Govern de la Generalitat.", why: "Compromisos autonòmics encara sense investigar (DOGC i Parlament)." },
      ],
    },
    {
      partyId: "junts",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Nogueras (10-1-2024): «no els podem acompanyar»; Junts no va votar i els decrets van sortir.", why: "Ambigu: no van votar «sí»." },
        { what: "«Bloqueo de la legislatura» (finals de 2025).", why: "El mateix partit va dir que cinc lleis en quedaven fora i no es va trobar una font primària que les llisti." },
        { what: "«Mai votarem uns pressupostos…» i «sin nuestros siete votos no hay presupuestos».", why: "A la XV no es va votar cap pressupost: no es pot comprovar." },
        { what: "Madrenas (25-11-2025): «no ens trobaran avalant ni una sola mesura més».", why: "Van votar «no» als decrets d'habitatge del Govern però «sí» a tres punts d'una moció del PSOE: massa matisat per a una etiqueta." },
        { what: "Compromisos del Govern de la Generalitat.", why: "Compromisos autonòmics encara sense investigar (DOGC i Parlament)." },
      ],
    },
    {
      partyId: "eh-bildu",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Cita d'habitatge del programa de 2023.", why: "Enumera un assoliment passat, no un compromís, i la llei és anterior al programa." },
        { what: "Matute (8-4-2025) sobre el Concert Econòmic.", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "pnv",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Arrelament i repartiment de menors migrants.", why: "Ja no són entre les preguntes, i el compromís sobre l'arrelament no es correspon bé amb la votació." },
        { what: "Compromisos del Govern Basc.", why: "Compromisos autonòmics encara sense investigar (BOPV i Parlament Basc)." },
      ],
    },
    {
      partyId: "bng",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [],
    },
    {
      partyId: "cc",
      searched: [
        "Intervencions de la seva diputada al Congrés (XV) contrastades amb el seu vot, i compromisos de la investidura de Fernando Clavijo al Parlament de Canàries (2023) contrastats amb les normes publicades al BOE.",
      ],
      excluded: [
        { what: "Rebaixa de l'IGIC del 7 % al 5 %.", why: "El tipus continua al 7 %, però la promesa era condicionada («una vez constatemos la realidad de las cuentas») i la legislatura canària continua fins al 2027: encara no hi ha final de legislatura sense norma." },
        { what: "Canvi de vot a la investidura de 2023.", why: "Només consta a la premsa i està discutit." },
        { what: "Menors migrants no acompanyats.", why: "Les úniques declaracions eren del mateix dia de les votacions i no eren compromisos." },
        { what: "Rebaixa de l'impost de combustibles a La Palma, La Gomera i El Hierro.", why: "No es va trobar un acte al BOE." },
      ],
    },
    {
      partyId: "upn",
      searched: [
        "Intervencions del seu diputat al Ple de la XV contrastades amb el seu vot (atribuït per diputat). UPN no governa a Navarra des del 2019.",
      ],
      excluded: [
        { what: "Reforma laboral de 2022: la direcció va anunciar «sí» i els seus dos diputats van votar «no».", why: "Qui és «el partit» en aquest cas està discutit, i no hi ha atribució de diputats d'UPN per a la XIV." },
        { what: "Vot a la investidura de 2023.", why: "Votació per crida: el Diari no dona els noms." },
        { what: "Jornada de 37,5 hores i competències d'immigració per a Catalunya (2025).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "compromis",
      searched: [
        "Programa de 2019 (no va tenir programa propi de generals el 2023), intervencions de Joan Baldoví (XIV) i Àgueda Micó (XV) i premsa, contrastades amb el seu vot (atribuït per diputat).",
        "Es van cercar expressament compromisos incomplerts de Baldoví i Micó.",
      ],
      excluded: [
        { what: "Micó (març de 2025): votarien en contra de la llei d'immigració PSOE-Junts si no es tancaven els CIE; al setembre va votar «sí» a la presa en consideració.", why: "Només hi ha paràfrasis de premsa, la condició es referia a la negociació del text i no a la primera votació, i la llei no ha acabat el tràmit." },
        { what: "Baldoví (2020-2022): deixarien de donar suport al Govern si no complia amb el finançament autonòmic.", why: "Si el Govern va complir està discutit: els terminis es van ampliar per acord." },
        { what: "Vot contra la cinquena pròrroga de l'estat d'alarma (2020) i vot a favor de l'impost a la banca (2024).", why: "Són anuncis de vot seguits d'aquest vot, no compromisos sobre una cosa que s'havia de fer després." },
        { what: "Immigració (competències per a Catalunya) i tauromàquia (2025).", why: SAME_DEBATE },
        { what: "Oposició al Cupo basc (2017).", why: "És de la XII legislatura, que l'esquema de proves no cobreix." },
      ],
    },
  ],
};
