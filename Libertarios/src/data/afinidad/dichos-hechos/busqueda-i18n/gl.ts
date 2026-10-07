/**
 * Registro de búsqueda de «Dijeron vs. hicieron» en gallego («Dixeron vs.
 * fixeron»). Misma forma y mismo orden que `DVH_KNOWN_GAPS` y `dvhSearchLog` de
 * `../busqueda.ts`, entrada a entrada.
 *
 * Traducción automática pendiente de revisión por una persona nativa. Las citas
 * literales entre «» (lo que dijeron políticos o documentos), los ids de
 * entrada y los títulos de documentos se dejan tal cual.
 */

import type { DvhSearchLogTranslation } from "../busqueda";

const SAME_DEBATE =
  "O «dito» é unha intervención no mesmo debate da votación coa que se comparaba: é anunciar o voto, non comprometerse (revisión do 2026-10-06).";

/** Método común a ERC, Junts, EH Bildu, PNV e BNG (mesma persoa, mesma busca). */
const NACIONALISTAS_SEARCHED = [
  "Programa das xerais de 2023 cruzado con todas as votacións da XV lexislatura: non hai ningún caso de signo contrario; só diferenzas de grao («parcial»).",
  "Os 201 Diarios de Sesións do Pleno da XV: cada frase dos seus portavoces que anuncia un voto, comparada co voto do grupo ese día. Saíron 8 discrepancias aparentes; todas eran emendas ou votacións de totalidade, onde votar «non» é coherente con apoiar a lei.",
  "Compromisos cara a diante neses Diarios («votaremos… cuando», «nunca votaremos», «presentaremos», «mientras no»…): uns 190 resultados revisados a man e contrastados con votacións posteriores.",
  "Votacións nas que o partido vota «si» nun trámite e «non» noutro da mesma iniciativa: ningún caso real (eran iniciativas distintas cun título parecido).",
];

export const searchLogGl: DvhSearchLogTranslation = {
  gaps: [
    "Compromisos dos gobernos autonómicos (Generalitat, Goberno Vasco, Xunta, Goberno de Canarias, Goberno de Navarra, xuntas e consellos de goberno doutras comunidades): esixen o diario oficial e o diario de sesións de cada parlamento autonómico e non se investigaron, agás as dúas entradas de Coalición Canaria.",
    "Votacións de investidura do Congreso: son por chamamento e non teñen JSON nos datos abertos, polo que non serven como proba co mesmo estándar que o resto.",
  ],
  log: [
    {
      partyId: "psoe",
      searched: [
        "Discurso de investidura de 2020 (Diario de Sesións), acordos de coalición de 2019 e 2023, e declaracións e entrevistas do presidente con transcrición oficial da Moncloa.",
        "Cada compromiso, contrastado co BOE e coas votacións do Congreso (XIV e XV).",
        "Segunda pasada (2026-10-07), coa regra de ≈ 2 entradas por ano de goberno do Estado (PSOE: desde xuño de 2018, ≈ 8 anos, obxectivo ≈ 16): discursos de investidura de 2020 e 2023 e acordos de coalición de 2019 e 2023 lidos enteiros, máis transcricións da Moncloa, contrastados coa IGAE (déficit), o informe do Fondo de Reserva da Seguridade Social, o BOE (textos consolidados) e a relación de proxectos de lei da XV nos datos abertos do Congreso.",
      ],
      excluded: [
        { what: "Rehabilitar 500.000 vivendas para a eficiencia enerxética (acordo PSOE-SUMAR de 2023, p. 29).", why: "O acordo non fixa prazo, e non se localizou unha serie oficial estatal que conte vivendas rehabilitadas rematadas cun criterio único: as axudas xestiónanas as comunidades autónomas con programas distintos (Plan de Recuperación e Plan Estatal) e non se suman nunha cifra comparable." },
        { what: "Consolidar o Bono Alquiler Joven «para llegar a toda la población joven» (acordo de 2023, p. 30) e «aumentar el bono para el alquiler» (investidura de 2023).", why: "«Llegar a toda la población joven» non ten unha cifra que contrastar, e o bono resólveno e págano as comunidades autónomas: non se localizou un dato oficial estatal de beneficiarios por ano." },
        { what: "Elevar o parque público de aluguer accesible «hasta el 20 % del parque total de vivienda» (acordo de 2023, p. 29).", why: "O propio acordo sitúao «a medio y largo plazo», máis alá da lexislatura: non se pode dar por non feito ao rematar esta. O medible da lexislatura (183.000 vivendas) xa ten a súa entrada." },
        { what: "Vivendas en aluguer social financiadas polo Plan de Recuperación (obxectivo dunhas 20.000).", why: "É un fito do Plan que avalía a Comisión Europea, non un compromiso do partido con cita propia, e as súas vivendas xa contan dentro das 183.000 da entrada «psoe-vivienda-183000-2023» (24.867 «Plan de Recuperación» no dato do Ministerio): sería contar dúas veces o mesmo." },
        { what: "Renovación do CGPJ e doutros órganos «mediante acuerdos parlamentarios de consenso» (acordo de 2019, punto 2.11.1).", why: "O compromiso é «promover acuerdos», que non se pode medir; o resultado (CGPJ renovado en xullo de 2024, Defensor del Pueblo en 2021) dependía de maiorías de tres quintos que incluían o PP." },
        { what: "Temporalidade do emprego e débeda pública.", why: "Non se atopou nas investiduras nin nos acordos un compromiso con cifra ou obxectivo comprobable; a temporalidade está cuberta pola entrada da reforma laboral." },
        { what: "Fitos e desembolsos do Plan de Recuperación.", why: "Son compromisos do Goberno coa Comisión Europea avaliados por ela en cada solicitude de pagamento, non frases do partido; quedan fóra agás cando unha promesa propia os cita (vivenda)." },
        { what: "«Impulsaremos un nuevo modelo de financiación autonómica» (investidura e acordo de 2023).", why: "Non vai como entrada á parte: é o mesmo compromiso que a de 2020 («psoe-financiacion-autonomica-2020») e recóllese na súa nota." },
        { what: "Cambio de posición sobre o Sáhara (2022).", why: "Foi unha carta ao Goberno de Marrocos, non un acto publicado no BOE, e o programa non era explícito." },
        { what: "«No pactaré con Bildu».", why: "Demasiado vago para comprobalo contra un feito concreto." },
        { what: "«Traeré a Puigdemont».", why: "Non hai un acto do partido ou do Goberno que citar como feito." },
        { what: "Limitar os aforamentos (acordo de coalición de 2019, punto 2.11.7).", why: "Nunca se remitiu ás Cortes: non hai ficha de iniciativa en congreso.es que sirva de proba primaria dun «non o fixeron»." },
        { what: "Estatuto do bolseiro (acordos de 2019 e 2023).", why: "O Goberno remitiu o proxecto en marzo de 2026 e caducou sen maioría: non está claro que dependese do partido." },
      ],
    },
    {
      partyId: "pp",
      searched: [
        "Discurso de investidura de Mariano Rajoy (19-12-2011) e programa de 2011, contrastados co que publicou o BOE durante os seus gobernos (2011-2018).",
        "Investidura de Alberto Núñez Feijóo (2023) e pacto de goberno en Estremadura (2023).",
        "Segunda pasada (2026-10-07), coa regra de ≈ 2 entradas por ano de goberno do Estado: investiduras de Rajoy de 2011 e de 2016 (30-8 e 26-10), programa de 2011 e transcricións da Moncloa, contrastados con datos oficiais de resultado (Eurostat, Ministerio de Facenda, Banco de España) e co BOE e o BOCG.",
      ],
      excluded: [
        { what: "«20 millones de personas trabajando en la España de 2020» (investidura do 30-8-2016).", why: "O prazo (2020) vence despois de que o PP deixase o Goberno (xuño de 2018): non se pode contrastar co que fixo." },
        { what: "Rebaixa de 2 puntos do IRPF «tan pronto como alcancemos nuestro objetivo de reducir el déficit público por debajo del 3 %» (investidura do 30-8-2016).", why: "O déficit baixou do 3 % cos datos de 2018 (2,6 %, Eurostat), que se coñeceron en 2019, cando o PP xa non gobernaba: a condición non se deu mentres a podía cumprir." },
        { what: "Suba do IVE de 2012 (Real decreto-lei 20/2012).", why: "Nin a investidura de 2011 nin o programa de 2011 teñen un compromiso explícito sobre o tipo xeral do IVE; a frase «mi intención es no subir los impuestos» xa está en «pp-irpf-2011» e non se duplica." },
        { what: "Revalorización das pensións do 0,25 % (Lei 23/2013).", why: "Non se atopou un compromiso posterior á investidura de 2011 que diga o contrario; o de 2012 xa está en «pp-pensiones-2012»." },
        { what: "Luis de Guindos (xuño de 2012): o préstamo europeo á banca «no tendrá coste para los ciudadanos».", why: "Só consta na prensa; usouse a frase equivalente da vicepresidenta do Goberno con transcrición oficial da Moncloa («pp-rescate-bancario-coste»)." },
        { what: "Taxas xudiciais (Lei 10/2012).", why: "Non hai un compromiso previo sobre taxas xudiciais na investidura nin no programa de 2011 co que contrastalas." },
        { what: "«No habrá referéndum» en Cataluña (2017).", why: "Se o 1-O foi ou non un referendo está discutido; a etiqueta sería unha interpretación." },
      ],
    },
    {
      partyId: "vox",
      searched: [
        "Programa das xerais de 2023 e discursos de Santiago Abascal no Pleno (moción de censura de 2020, investiduras), contrastados coas votacións da XIV e a XV.",
        "Buscáronse expresamente compromisos seguidos dun acto en sentido contrario.",
      ],
      excluded: [
        { what: "Abstención no decreto dos fondos europeos (2021).", why: "Non había un compromiso previo explícito: a etiqueta sería unha interpretación." },
        { what: "Derrogación da lei de memoria en Aragón (Lei 1/2024).", why: "Non se atopou o texto do acordo PP-Vox nin unha cita literal de Vox." },
        { what: "Saída dos gobernos autonómicos en xullo de 2024 polo reparto de menores migrantes.", why: "Os decretos autonómicos non encaixan en ningún tipo de proba do esquema (compromisos autonómicos aínda sen investigar)." },
        { what: "Protocolo antiaborto en Castela e León.", why: "Os feitos están discutidos." },
        { what: "Revalorización de pensións dentro do decreto ómnibus.", why: "A lectura está discutida (o decreto mesturaba varias medidas)." },
      ],
    },
    {
      partyId: "sumar",
      searched: [
        "Acordo de coalición PSOE-SUMAR (24-10-2023), programa de 2023 e Diario de Sesións, contrastados co BOE e as votacións da XV.",
        "Incumprimentos por falta de acto: só entran como «non o fixeron» se hai proba primaria (ficha de iniciativa, disolución no BOE); así entrou a «lei mordaza».",
        "Regra de profundidade (2026-10-07): ≈ 2 entradas por ano de goberno do Estado, mínimo 4. Sumar goberna en coalición desde novembro de 2023 (≈ 3 anos): obxectivo ≈ 6. Xa ten 10, así que na segunda pasada non se engadiu ningunha.",
      ],
      excluded: [
        { what: "Rehabilitación de 500.000 vivendas, Bono Alquiler Joven para «toda la población joven» e parque público do 20 % (acordo PSOE-SUMAR de 2023, pp. 29-30).", why: "Os mesmos motivos que no PSOE, que asinou o mesmo acordo: sen prazo ou «a medio y largo plazo», ou sen un dato oficial estatal comparable (as axudas xestiónanas as comunidades autónomas)." },
        { what: "Novo Estatuto dos Traballadores (Sumar dirixía o Ministerio de Traballo).", why: "O acordo de coalición de 2023 non o recolle (só fixar no Estatuto a suba do salario mínimo); a promesa é da investidura de Pedro Sánchez e está como entrada do PSOE. O programa de Sumar de 2023 non se comprobou para este punto." },
        { what: "Estatuto do bolseiro (acordo de 2023).", why: "O Goberno remitiu o proxecto en marzo de 2026 e caducou sen maioría: non está claro que dependese de Sumar." },
        { what: "Reforma do despedimento (acordo de 2023), herdanza universal e xornada de 32 horas (programa).", why: "Non hai unha iniciativa con ficha en congreso.es que sirva de proba primaria de que non se fixo." },
        { what: "Gasto en defensa.", why: "O plan de abril de 2025 foi un acordo do Consello de Ministros que non se atopou no BOE, e a votación áncora (11-6-2026, Sumar «si») é coherente co que dixo." },
        { what: "Programas de armamento (programa, p. 139).", why: "Demasiado xeral; para o embargo a Israel usouse a intervención da súa portavoz no Pleno." },
      ],
    },
    {
      partyId: "podemos",
      searched: [
        "Programa das xerais do 10-N-2019, acordo de coalición de 2019 e Diario de Sesións, contrastados co BOE e as votacións da XIV (grupo GCUP-EC-GC) e a XV (voto por deputado).",
        "Regra de profundidade (2026-10-07): ≈ 2 entradas por ano de goberno do Estado, mínimo 4. Unidas Podemos gobernou en coalición de xaneiro de 2020 a novembro de 2023 (≈ 4 anos): obxectivo ≈ 8. Xa ten 8, así que na segunda pasada non se engadiu ningunha.",
      ],
      excluded: [
        { what: "Novo Estatuto dos Traballadores (acordo de coalición de 2019, punto 1.2), que non se fixo na XIV.", why: "Xa está como entrada do PSOE coa mesma proba, e a carteira de Traballo levábaa Yolanda Díaz, da cota de Unidas Podemos pero hoxe en Sumar: atribuírllo a Podemos sería discutible." },
        { what: "Gasto militar: o grupo GCUP-EC-GC votou «si» á sección de Defensa dos Orzamentos de 2023.", why: "O único «no lo apoyaremos» explícito é de Jaume Asens (En Comú Podem, non Podemos) e só consta na prensa; de Podemos só hai desacordo, non un compromiso." },
        { what: "Decreto de embargo de armas de outubro de 2025.", why: "Criticouse, pero non houbo unha promesa explícita de votar en contra." },
        { what: "Lei de mobilidade sustentable.", why: "Púxose unha condición e despois o partido abstívose: a etiqueta sería unha interpretación." },
        { what: "Decretos de vivenda de 2026.", why: "Pediuse retiralos, pero non houbo compromiso de votar en contra." },
        { what: "Discurso de investidura de 2020 de Pablo Iglesias como fonte.", why: "A ligazón oficial do Diario de Sesións devolvía erro; usouse o programa." },
        { what: "«Si quieren los votos de Podemos, tiene que haber impuesto a las grandes energéticas» (21-11-2024).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "erc",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Rufián (2015): «en 18 meses dejaré mi escaño».", why: "Ligábao á independencia de Cataluña: se se incumpriu está discutido." },
        { what: "Estrems (25-11-2025): votarían a favor de toda proposta para frear a suba da vivenda e «nunca» en contra.", why: "Despois votaron «non» a puntos de mocións do PP sobre vivenda; se eses puntos tiñan ese fin é unha interpretación." },
        { what: "Derrogar a «lei mordaza» (programa).", why: "Di «derrogar» e non se comprobou se a proposición de 2024 a derroga enteira." },
        { what: "Compromisos do Govern da Generalitat.", why: "Compromisos autonómicos aínda sen investigar (DOGC e Parlament)." },
      ],
    },
    {
      partyId: "junts",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Nogueras (10-1-2024): «no els podem acompanyar»; Junts non votou e os decretos saíron.", why: "Ambiguo: non votaron «si»." },
        { what: "«Bloqueo de la legislatura» (finais de 2025).", why: "O propio partido dixo que cinco leis quedaban fóra e non se atopou unha fonte primaria que as liste." },
        { what: "«Mai votarem uns pressupostos…» e «sin nuestros siete votos no hay presupuestos».", why: "Na XV non se votou ningún orzamento: non se pode comprobar." },
        { what: "Madrenas (25-11-2025): «no ens trobaran avalant ni una sola mesura més».", why: "Votaron «non» aos decretos de vivenda do Goberno pero «si» a tres puntos dunha moción do PSOE: demasiado matizado para unha etiqueta." },
        { what: "Compromisos do Govern da Generalitat.", why: "Compromisos autonómicos aínda sen investigar (DOGC e Parlament)." },
      ],
    },
    {
      partyId: "eh-bildu",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Cita de vivenda do programa de 2023.", why: "Enumera un logro pasado, non un compromiso, e a lei é anterior ao programa." },
        { what: "Matute (8-4-2025) sobre o Concerto Económico.", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "pnv",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Arraigamento e reparto de menores migrantes.", why: "Xa non están entre as preguntas, e o compromiso sobre arraigamento non se corresponde ben coa votación." },
        { what: "Compromisos do Goberno Vasco.", why: "Compromisos autonómicos aínda sen investigar (BOPV e Parlamento Vasco)." },
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
        "Intervencións da súa deputada no Congreso (XV) contrastadas co seu voto, e compromisos da investidura de Fernando Clavijo no Parlamento de Canarias (2023) contrastados coas normas publicadas no BOE.",
      ],
      excluded: [
        { what: "Rebaixa do IGIC do 7 % ao 5 %.", why: "O tipo segue no 7 %, pero a promesa era condicionada («una vez constatemos la realidad de las cuentas») e a lexislatura canaria segue ata 2027: aínda non hai fin de lexislatura sen norma." },
        { what: "Cambio de voto na investidura de 2023.", why: "Só consta na prensa e está discutido." },
        { what: "Menores migrantes non acompañados.", why: "As únicas declaracións eran do mesmo día das votacións e non eran compromisos." },
        { what: "Rebaixa do imposto de combustibles na Palma, na Gomera e no Hierro.", why: "Non se atopou un acto no BOE." },
      ],
    },
    {
      partyId: "upn",
      searched: [
        "Intervencións do seu deputado no Pleno da XV contrastadas co seu voto (atribuído por deputado). UPN non goberna en Navarra desde 2019.",
      ],
      excluded: [
        { what: "Reforma laboral de 2022: a dirección anunciou «si» e os seus dous deputados votaron «non».", why: "Quen é «o partido» nese caso está discutido, e non hai atribución de deputados de UPN para a XIV." },
        { what: "Voto na investidura de 2023.", why: "Votación por chamamento: o Diario non dá os nomes." },
        { what: "Xornada de 37,5 horas e competencias de inmigración para Cataluña (2025).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "compromis",
      searched: [
        "Programa de 2019 (non tivo programa propio de xerais en 2023), intervencións de Joan Baldoví (XIV) e Àgueda Micó (XV) e prensa, contrastadas co seu voto (atribuído por deputado).",
        "Buscáronse expresamente compromisos incumpridos de Baldoví e Micó.",
      ],
      excluded: [
        { what: "Micó (marzo de 2025): votarían en contra da lei de inmigración PSOE-Junts se non se pechaban os CIE; en setembro votou «si» á toma en consideración.", why: "Só hai paráfrases de prensa, a condición referíase á negociación do texto e non á primeira votación, e a lei non rematou a súa tramitación." },
        { what: "Baldoví (2020-2022): deixarían de apoiar o Goberno se non cumpría co financiamento autonómico.", why: "Se o Goberno cumpriu está discutido: os prazos ampliáronse por acordo." },
        { what: "Voto contra a quinta prórroga do estado de alarma (2020) e voto a favor do imposto á banca (2024).", why: "Son anuncios de voto seguidos dese voto, non compromisos sobre algo que facer despois." },
        { what: "Inmigración (competencias para Cataluña) e tauromaquia (2025).", why: SAME_DEBATE },
        { what: "Oposición ao Cupo vasco (2017).", why: "É da XII lexislatura, que o esquema de probas non cobre." },
      ],
    },
  ],
};
