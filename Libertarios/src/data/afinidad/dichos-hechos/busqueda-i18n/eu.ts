/**
 * Registro de búsqueda de «Dijeron vs. hicieron» en euskera («Esan zutena eta
 * egin zutena»). Misma forma y mismo orden que `DVH_KNOWN_GAPS` y
 * `dvhSearchLog` de `../busqueda.ts`, entrada a entrada.
 *
 * Traducción automática pendiente de revisión por una persona nativa. Las citas
 * literales entre «» (lo que dijeron políticos o documentos), los ids de
 * entrada y los títulos de documentos se dejan tal cual.
 */

import type { DvhSearchLogTranslation } from "../busqueda";

const SAME_DEBATE =
  "«Esandakoa» alderatzen zen bozketaren eztabaida berean egindako hitzaldi bat da: botoa iragartzea da, ez konpromisoa hartzea (2026-10-06ko berrikuspena).";

/** ERC, Junts, EH Bildu, PNV eta BNGrentzat metodo bera (pertsona bera, bilaketa bera). */
const NACIONALISTAS_SEARCHED = [
  "2023ko hauteskunde orokorretako hauteskunde-programa XV. legealdiko bozketa guztiekin gurutzatuta: ez dago kontrako zentzuko kasurik; maila-aldeak baino ez («partziala»).",
  "XV. legealdiko Osoko Bilkuraren 201 Bilkuren Egunkariak: bozeramaileek botoa iragartzen duten esaldi bakoitza, egun horretan taldeak emandako botoarekin alderatuta. Itxurazko 8 desadostasun atera ziren; denak ziren zuzenketak edo osoko zuzenketen bozketak, eta horietan «ez» bozkatzea bat dator legea babestearekin.",
  "Etorkizunerako konpromisoak Egunkari horietan («votaremos… cuando», «nunca votaremos», «presentaremos», «mientras no»…): 190 emaitza inguru eskuz berrikusita eta geroko bozketekin kontrastatuta.",
  "Alderdiak ekimen bereko izapide batean «bai» eta beste batean «ez» bozkatzen duen bozketak: benetako kasurik ez (antzeko izenburua zuten ekimen desberdinak ziren).",
];

export const searchLogEu: DvhSearchLogTranslation = {
  gaps: [
    "Autonomia-erkidegoetako gobernuen konpromisoak (Generalitat, Eusko Jaurlaritza, Xunta, Kanarietako Gobernua, Nafarroako Gobernua, beste erkidego batzuetako gobernu-batzordeak eta -kontseiluak): legebiltzar autonomiko bakoitzaren aldizkari ofiziala eta bilkuren egunkaria behar dira, eta ez dira ikertu, Coalición Canariaren bi sarrerak izan ezik.",
    "Kongresuko inbestidura-bozketak: deialdi bidezkoak dira eta ez dute JSONik datu irekietan; beraz, ez dute balio froga gisa gainerakoen estandar berarekin.",
  ],
  log: [
    {
      partyId: "psoe",
      searched: [
        "2020ko inbestidura-hitzaldia (Bilkuren Egunkaria), 2019ko eta 2023ko koalizio-akordioak, eta presidentearen adierazpenak eta elkarrizketak, La Moncloaren transkripzio ofizialarekin.",
        "Konpromiso bakoitza, BOErekin eta Kongresuko bozketekin kontrastatuta (XIV eta XV).",
        "Bigarren pasada (2026-10-07), Estatuko gobernu-urte bakoitzeko ≈ 2 sarreraren arauarekin (PSOE: 2018ko ekainetik, ≈ 8 urte, helburua ≈ 16): 2020ko eta 2023ko inbestidura-hitzaldiak eta 2019ko eta 2023ko koalizio-akordioak osorik irakurrita, gehi La Moncloaren transkripzioak, IGAErekin (defizita), Gizarte Segurantzaren Erreserba Funtsaren txostenarekin, BOErekin (testu bateginak) eta Kongresuaren datu irekietako XV. legealdiko lege-proiektuen zerrendarekin kontrastatuta.",
      ],
      excluded: [
        { what: "500.000 etxebizitza birgaitzea energia-eraginkortasunerako (2023ko PSOE-SUMAR akordioa, 29. or.).", why: "Akordioak ez du eperik finkatzen, eta ez da aurkitu amaitutako etxebizitza birgaituak irizpide bakarrarekin zenbatzen dituen Estatuko serie ofizialik: laguntzak autonomia-erkidegoek kudeatzen dituzte programa desberdinekin (Suspertze Plana eta Estatuko Plana), eta ez dira zifra konparagarri batean batzen." },
        { what: "Bono Alquiler Joven sendotzea «para llegar a toda la población joven» (2023ko akordioa, 30. or.) eta «aumentar el bono para el alquiler» (2023ko inbestidura).", why: "«Llegar a toda la población joven» ez du kontrastatzeko zifrarik, eta bonoa autonomia-erkidegoek ebazten eta ordaintzen dute: ez da aurkitu urteko onuradunen Estatuko datu ofizialik." },
        { what: "Alokairu eskuragarriko parke publikoa «hasta el 20 % del parque total de vivienda» igotzea (2023ko akordioa, 29. or.).", why: "Akordioak berak «a medio y largo plazo» kokatzen du, legealditik haratago: ezin da egin gabekotzat jo legealdi hau amaitzean. Legealdian neur daitekeena (183.000 etxebizitza) badu dagoeneko bere sarrera." },
        { what: "Suspertze Planak finantzatutako gizarte-alokairuko etxebizitzak (20.000 inguruko helburua).", why: "Europako Batzordeak ebaluatzen duen Planaren mugarri bat da, ez alderdiaren konpromiso bat aipamen propioarekin, eta haren etxebizitzak dagoeneko «psoe-vivienda-183000-2023» sarrerako 183.000en barruan zenbatzen dira (24.867 «Plan de Recuperación» Ministerioaren datuan): gauza bera bi aldiz zenbatzea litzateke." },
        { what: "CGPJ eta beste organo batzuk berritzea «mediante acuerdos parlamentarios de consenso» (2019ko akordioa, 2.11.1 puntua).", why: "Konpromisoa «promover acuerdos» da, eta hori ezin da neurtu; emaitza (CGPJ 2024ko uztailean berritua, Herriaren Defendatzailea 2021ean) PP barne hartzen zuten bost hirureneko gehiengoen menpe zegoen." },
        { what: "Enpleguaren behin-behinekotasuna eta zor publikoa.", why: "Ez da aurkitu inbestiduretan ez akordioetan zifra edo helburu egiaztagarria duen konpromisorik; behin-behinekotasuna lan-erreformaren sarrerak hartzen du." },
        { what: "Suspertze Planaren mugarriak eta ordainketak.", why: "Gobernuak Europako Batzordearekin hartutako konpromisoak dira, Batzordeak berak ordainketa-eskaera bakoitzean ebaluatuak, ez alderdiaren esaldiak; kanpoan geratzen dira, alderdiaren beraren promesa batek aipatzen dituenean izan ezik (etxebizitza)." },
        { what: "«Impulsaremos un nuevo modelo de financiación autonómica» (2023ko inbestidura eta akordioa).", why: "Ez doa sarrera bereizi gisa: 2020koaren konpromiso bera da («psoe-financiacion-autonomica-2020») eta haren oharrean jasotzen da." },
        { what: "Saharari buruzko jarrera-aldaketa (2022).", why: "Marokoko Gobernuari bidalitako gutun bat izan zen, ez BOEn argitaratutako egintza bat, eta hauteskunde-programa ez zen esplizitua." },
        { what: "«No pactaré con Bildu».", why: "Lausoegia egitate zehatz batekin egiaztatzeko." },
        { what: "«Traeré a Puigdemont».", why: "Ez dago egitate gisa aipa daitekeen alderdiaren edo Gobernuaren egintzarik." },
        { what: "Aforamenduak mugatzea (2019ko koalizio-akordioa, 2.11.7 puntua).", why: "Ez zen inoiz Gorteetara bidali: ez dago congreso.es-en ekimen-fitxarik «ez zuten egin» baten lehen mailako froga izan daitekeenik." },
        { what: "Bekadunaren estatutua (2019ko eta 2023ko akordioak).", why: "Gobernuak 2026ko martxoan bidali zuen proiektua, eta gehiengorik gabe iraungi zen: ez dago argi alderdiaren menpe zegoen." },
      ],
    },
    {
      partyId: "pp",
      searched: [
        "Mariano Rajoyren inbestidura-hitzaldia (2011-12-19) eta 2011ko hauteskunde-programa, haren gobernuetan (2011-2018) BOEk argitaratutakoarekin kontrastatuta.",
        "Alberto Núñez Feijóoren inbestidura (2023) eta Extremadurako gobernu-ituna (2023).",
        "Bigarren pasada (2026-10-07), Estatuko gobernu-urte bakoitzeko ≈ 2 sarreraren arauarekin: Rajoyren 2011ko eta 2016ko inbestidurak (8-30 eta 10-26), 2011ko hauteskunde-programa eta La Moncloaren transkripzioak, emaitzei buruzko datu ofizialekin (Eurostat, Ogasun Ministerioa, Espainiako Bankua) eta BOErekin eta BOCGrekin kontrastatuta.",
      ],
      excluded: [
        { what: "«20 millones de personas trabajando en la España de 2020» (2016-8-30eko inbestidura).", why: "Epea (2020) PPk Gobernua utzi ondoren (2018ko ekaina) amaitzen da: ezin da egin zuenarekin kontrastatu." },
        { what: "PFEZa 2 puntu jaistea «tan pronto como alcancemos nuestro objetivo de reducir el déficit público por debajo del 3 %» (2016-8-30eko inbestidura).", why: "Defizita % 3tik behera jaitsi zen 2018ko datuekin (% 2,6, Eurostat), eta datu horiek 2019an ezagutu ziren, PP jada gobernatzen ez zegoenean: baldintza ez zen bete hura betetzeko aukera zuen bitartean." },
        { what: "2012ko BEZaren igoera (20/2012 Errege Lege-dekretua).", why: "Ez 2011ko inbestidurak ez 2011ko hauteskunde-programak ez dute BEZaren tasa orokorrari buruzko konpromiso esplizitorik; «mi intención es no subir los impuestos» esaldia «pp-irpf-2011»n dago dagoeneko eta ez da bikoizten." },
        { what: "Pentsioen % 0,25eko errebalorizazioa (23/2013 Legea).", why: "Ez zen aurkitu 2011ko inbestiduraren ondoren kontrakoa esaten duen konpromisorik; 2012koa «pp-pensiones-2012»n dago dagoeneko." },
        { what: "Luis de Guindos (2012ko ekaina): bankuentzako Europako maileguak «no tendrá coste para los ciudadanos».", why: "Prentsan baino ez dago jasota; Gobernuko presidenteordearen esaldi baliokidea erabili zen, La Moncloaren transkripzio ofizialarekin («pp-rescate-bancario-coste»)." },
        { what: "Tasa judizialak (10/2012 Legea).", why: "Ez dago tasa judizialei buruzko aurretiko konpromisorik 2011ko inbestiduran ez hauteskunde-programan, haiekin kontrastatzeko." },
        { what: "«No habrá referéndum» Katalunian (2017).", why: "Urriaren 1ekoa erreferenduma izan zen ala ez eztabaidagai dago; etiketa interpretazio bat litzateke." },
      ],
    },
    {
      partyId: "vox",
      searched: [
        "2023ko hauteskunde orokorretako hauteskunde-programa eta Santiago Abascalen hitzaldiak Osoko Bilkuran (2020ko zentsura-mozioa, inbestidurak), XIV. eta XV. legealdietako bozketekin kontrastatuta.",
        "Berariaz bilatu ziren kontrako zentzuko egintza batek jarraitutako konpromisoak.",
      ],
      excluded: [
        { what: "Abstentzioa Europako funtsen dekretuan (2021).", why: "Ez zegoen aurretiko konpromiso esplizitorik: etiketa interpretazio bat litzateke." },
        { what: "Aragoiko memoria-legea indargabetzea (1/2024 Legea).", why: "Ez zen aurkitu PP-Vox akordioaren testua ez Voxen aipamen literalik." },
        { what: "Autonomia-erkidegoetako gobernuetatik irtetea 2024ko uztailean, adingabe migratzaileen banaketagatik.", why: "Dekretu autonomikoak ez dira eskemaren froga-motetako batean ere sartzen (konpromiso autonomikoak oraindik ikertu gabe)." },
        { what: "Abortuaren aurkako protokoloa Gaztela eta Leonen.", why: "Egitateak eztabaidagai daude." },
        { what: "Pentsioen errebalorizazioa dekretu omnibusaren barruan.", why: "Irakurketa eztabaidagai dago (dekretuak hainbat neurri nahasten zituen)." },
      ],
    },
    {
      partyId: "sumar",
      searched: [
        "PSOE-SUMAR koalizio-akordioa (2023-10-24), 2023ko hauteskunde-programa eta Bilkuren Egunkaria, BOErekin eta XV. legealdiko bozketekin kontrastatuta.",
        "Egintzarik ezagatiko ez-betetzeak: lehen mailako frogarik badago bakarrik sartzen dira «ez zuten egin» gisa (ekimen-fitxa, disoluzioa BOEn); horrela sartu zen «mozal-legea».",
        "Sakontasun-araua (2026-10-07): Estatuko gobernu-urte bakoitzeko ≈ 2 sarrera, gutxienez 4. Sumarrek koalizioan gobernatzen du 2023ko azarotik (≈ 3 urte): helburua ≈ 6. Dagoeneko 10 ditu; beraz, bigarren pasadan ez zen bat ere gehitu.",
      ],
      excluded: [
        { what: "500.000 etxebizitza birgaitzea, Bono Alquiler Joven «toda la población joven»entzat eta % 20ko parke publikoa (2023ko PSOE-SUMAR akordioa, 29-30. or.).", why: "PSOEren arrazoi berberak, akordio bera sinatu baitzuen: eperik gabe edo «a medio y largo plazo», edo Estatuko datu ofizial konparagarririk gabe (laguntzak autonomia-erkidegoek kudeatzen dituzte)." },
        { what: "Langileen Estatutu berria (Sumarrek zuzentzen zuen Lan Ministerioa).", why: "2023ko koalizio-akordioak ez du jasotzen (Estatutuan gutxieneko soldataren igoera finkatzea baino ez); promesa Pedro Sánchezen inbestidurakoa da eta PSOEren sarrera gisa dago. Sumarren 2023ko hauteskunde-programa ez da egiaztatu puntu honetarako." },
        { what: "Bekadunaren estatutua (2023ko akordioa).", why: "Gobernuak 2026ko martxoan bidali zuen proiektua, eta gehiengorik gabe iraungi zen: ez dago argi Sumarren menpe zegoen." },
        { what: "Kaleratzearen erreforma (2023ko akordioa), herentzia unibertsala eta 32 orduko lanaldia (hauteskunde-programa).", why: "Ez dago congreso.es-en fitxa duen ekimenik egin ez zelako lehen mailako froga izan daitekeenik." },
        { what: "Defentsa-gastua.", why: "2025eko apirileko plana Ministro Kontseiluaren erabaki bat izan zen, BOEn aurkitu ez zena, eta aingura-bozketa (2026-6-11, Sumar «bai») bat dator esan zuenarekin." },
        { what: "Armagintza-programak (hauteskunde-programa, 139. or.).", why: "Orokorregia; Israeli ezarritako enbargorako, haren bozeramaileak Osoko Bilkuran egindako hitzaldia erabili zen." },
      ],
    },
    {
      partyId: "podemos",
      searched: [
        "2019ko azaroaren 10eko hauteskunde orokorretako hauteskunde-programa, 2019ko koalizio-akordioa eta Bilkuren Egunkaria, BOErekin eta XIV. (GCUP-EC-GC taldea) eta XV. (diputatuz diputatuko botoa) legealdietako bozketekin kontrastatuta.",
        "Sakontasun-araua (2026-10-07): Estatuko gobernu-urte bakoitzeko ≈ 2 sarrera, gutxienez 4. Unidas Podemosek koalizioan gobernatu zuen 2020ko urtarriletik 2023ko azarora (≈ 4 urte): helburua ≈ 8. Dagoeneko 8 ditu; beraz, bigarren pasadan ez zen bat ere gehitu.",
      ],
      excluded: [
        { what: "Langileen Estatutu berria (2019ko koalizio-akordioa, 1.2 puntua), XIV. legealdian egin ez zena.", why: "PSOEren sarrera gisa dago dagoeneko froga berarekin, eta Lan Ministerioa Yolanda Díazek zeraman, Unidas Podemosen kuotakoa baina gaur egun Sumarren: Podemosi egoztea eztabaidagarria litzateke." },
        { what: "Gastu militarra: GCUP-EC-GC taldeak «bai» bozkatu zuen 2023ko Aurrekontuetako Defentsa atalean.", why: "«No lo apoyaremos» esplizitu bakarra Jaume Asensena da (En Comú Podem, ez Podemos) eta prentsan baino ez dago jasota; Podemosen aldetik desadostasuna baino ez dago, ez konpromisorik." },
        { what: "2025eko urriko arma-enbargoaren dekretua.", why: "Kritikatu zen, baina ez zegoen aurka bozkatzeko promesa esplizitorik." },
        { what: "Mugikortasun Iraunkorraren Legea.", why: "Baldintza bat jarri zen eta gero alderdiak abstentzioa egin zuen: etiketa interpretazio bat litzateke." },
        { what: "2026ko etxebizitza-dekretuak.", why: "Erretiratzeko eskatu zen, baina ez zegoen aurka bozkatzeko konpromisorik." },
        { what: "Pablo Iglesiasen 2020ko inbestidura-hitzaldia iturri gisa.", why: "Bilkuren Egunkariaren esteka ofizialak errorea ematen zuen; hauteskunde-programa erabili zen." },
        { what: "«Si quieren los votos de Podemos, tiene que haber impuesto a las grandes energéticas» (2024-11-21).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "erc",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Rufián (2015): «en 18 meses dejaré mi escaño».", why: "Kataluniaren independentziari lotzen zion: bete zen ala ez eztabaidagai dago." },
        { what: "Estrems (2025-11-25): etxebizitzaren garestitzea geldiarazteko proposamen guztien alde bozkatuko zuten eta «nunca» aurka.", why: "Gero «ez» bozkatu zuten PPren etxebizitzari buruzko mozioen puntu batzuetan; puntu horiek helburu hori zuten ala ez interpretazio bat da." },
        { what: "«Mozal-legea» indargabetzea (hauteskunde-programa).", why: "«Indargabetu» dio, eta ez zen egiaztatu 2024ko proposamenak osorik indargabetzen duen." },
        { what: "Generalitateko Gobernuaren konpromisoak.", why: "Konpromiso autonomikoak oraindik ikertu gabe (DOGC eta Parlament)." },
      ],
    },
    {
      partyId: "junts",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Nogueras (2024-1-10): «no els podem acompanyar»; Juntsek ez zuen bozkatu eta dekretuak aurrera atera ziren.", why: "Anbiguoa: ez zuten «bai» bozkatu." },
        { what: "«Bloqueo de la legislatura» (2025aren amaiera).", why: "Alderdiak berak esan zuen bost lege kanpoan geratzen zirela, eta ez zen aurkitu horiek zerrendatzen dituen lehen mailako iturririk." },
        { what: "«Mai votarem uns pressupostos…» eta «sin nuestros siete votos no hay presupuestos».", why: "XV. legealdian ez zen aurrekonturik bozkatu: ezin da egiaztatu." },
        { what: "Madrenas (2025-11-25): «no ens trobaran avalant ni una sola mesura més».", why: "«Ez» bozkatu zuten Gobernuaren etxebizitza-dekretuetan, baina «bai» PSOEren mozio bateko hiru puntutan: ñabarduratuegia etiketa baterako." },
        { what: "Generalitateko Gobernuaren konpromisoak.", why: "Konpromiso autonomikoak oraindik ikertu gabe (DOGC eta Parlament)." },
      ],
    },
    {
      partyId: "eh-bildu",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "2023ko hauteskunde-programako etxebizitzari buruzko aipamena.", why: "Iraganeko lorpen bat zerrendatzen du, ez konpromiso bat, eta legea hauteskunde-programa baino lehenagokoa da." },
        { what: "Matute (2025-4-8) Ekonomia Itunari buruz.", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "pnv",
      searched: NACIONALISTAS_SEARCHED,
      excluded: [
        { what: "Errotzea eta adingabe migratzaileen banaketa.", why: "Jada ez daude galderen artean, eta errotzeari buruzko konpromisoa ez dator ondo bat bozketarekin." },
        { what: "Eusko Jaurlaritzaren konpromisoak.", why: "Konpromiso autonomikoak oraindik ikertu gabe (EHAA eta Eusko Legebiltzarra)." },
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
        "Haren diputatuak Kongresuan (XV) egindako hitzaldiak bere botoarekin kontrastatuta, eta Fernando Clavijoren Kanarietako Parlamentuko inbestidurako konpromisoak (2023) BOEn argitaratutako arauekin kontrastatuta.",
      ],
      excluded: [
        { what: "IGICa % 7tik % 5era jaistea.", why: "Tasak % 7an jarraitzen du, baina promesa baldintzapean zegoen («una vez constatemos la realidad de las cuentas») eta Kanarietako legealdiak 2027ra arte jarraitzen du: oraindik ez dago araurik gabeko legealdi-amaierarik." },
        { what: "Botoaren aldaketa 2023ko inbestiduran.", why: "Prentsan baino ez dago jasota, eta eztabaidagai dago." },
        { what: "Lagunik gabeko adingabe migratzaileak.", why: "Adierazpen bakarrak bozketen egun berekoak ziren, eta ez ziren konpromisoak." },
        { what: "Erregaien gaineko zerga jaistea La Palman, La Gomeran eta El Hierron.", why: "Ez zen aurkitu BOEko egintzarik." },
      ],
    },
    {
      partyId: "upn",
      searched: [
        "Haren diputatuak XV. legealdiko Osoko Bilkuran egindako hitzaldiak bere botoarekin kontrastatuta (diputatuz diputatu egotzia). UPNk ez du Nafarroan gobernatzen 2019tik.",
      ],
      excluded: [
        { what: "2022ko lan-erreforma: zuzendaritzak «bai» iragarri zuen eta haren bi diputatuek «ez» bozkatu zuten.", why: "Kasu horretan «alderdia» nor den eztabaidagai dago, eta ez dago UPNko diputatuen egozpenik XIV. legealdirako." },
        { what: "Botoa 2023ko inbestiduran.", why: "Deialdi bidezko bozketa: Egunkariak ez ditu izenak ematen." },
        { what: "37,5 orduko lanaldia eta immigrazio-eskumenak Kataluniarentzat (2025).", why: SAME_DEBATE },
      ],
    },
    {
      partyId: "compromis",
      searched: [
        "2019ko hauteskunde-programa (2023an ez zuen hauteskunde orokorretarako programa propiorik izan), Joan Baldovíren (XIV) eta Àgueda Micóren (XV) hitzaldiak eta prentsa, haren botoarekin kontrastatuta (diputatuz diputatu egotzia).",
        "Berariaz bilatu ziren Baldovík eta Micók bete gabeko konpromisoak.",
      ],
      excluded: [
        { what: "Micó (2025eko martxoa): PSOE-Juntsen immigrazio-legearen aurka bozkatuko zuten AIZak (CIE) ixten ez baziren; irailean «bai» bozkatu zuen aintzat hartzearen alde.", why: "Prentsako parafrasiak baino ez daude, baldintza testuaren negoziazioari zegokion eta ez lehen bozketari, eta legeak ez du bere izapidea amaitu." },
        { what: "Baldoví (2020-2022): Gobernuari babesa emateari utziko ziotela finantzaketa autonomikoa betetzen ez bazuen.", why: "Gobernuak bete zuen ala ez eztabaidagai dago: epeak akordioz luzatu ziren." },
        { what: "Alarma-egoeraren bosgarren luzapenaren aurkako botoa (2020) eta bankuen gaineko zergaren aldeko botoa (2024).", why: "Boto-iragarpenak dira eta ondoren boto hori eman zen, ez gero zerbait egiteko konpromisoak." },
        { what: "Immigrazioa (eskumenak Kataluniarentzat) eta tauromakia (2025).", why: SAME_DEBATE },
        { what: "Euskal Kupoaren aurkako jarrera (2017).", why: "XII. legealdikoa da, eta froga-eskemak ez du legealdi hori hartzen." },
      ],
    },
  ],
};
