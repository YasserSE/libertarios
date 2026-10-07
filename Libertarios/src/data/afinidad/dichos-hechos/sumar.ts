import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Sumar. No puntúa nunca.
 *
 * Criterio de selección (el mismo para todos los partidos): compromisos
 * explícitos y muy difundidos del partido, su líder o su portavoz, cumplidos e
 * incumplidos, cada uno con un hecho posterior verificable en fuente primaria.
 * «Sumar» = el grupo GSUMAR y Movimiento Sumar desde 2023; no se le atribuye
 * nada de la XIV (Unidas Podemos).
 *
 * Comprobado el 2026-10-06:
 * - Acuerdo de coalición PSOE–SUMAR: PDF de movimientosumar.es (metadatos de
 *   creación 24-10-2023; copia en archive.org). La página impresa coincide con
 *   la del PDF.
 * - Programa «Un programa para ti» (23-J-2023): PDF de movimientosumar.es,
 *   creado el 10-7-2023 y archivado el 12-7-2023; página impresa = PDF.
 * - Diario de Sesiones: PDF oficial, página impresa.
 * - Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es
 *   (fila «sumar»: GSUMAR sin los diputados de otros partidos).
 * - Referencias BOE comprobadas con el texto de boe.es (título y fecha).
 *
 * No se ha encontrado ningún «contradice» con un acto contrario documentado.
 * Los incumplimientos por ausencia de acto van como «no-hecho» solo si hay
 * prueba primaria (ficha de la iniciativa, disolución en el BOE): la «ley
 * mordaza». Quedan fuera el estatuto del becario (el Gobierno remitió el
 * proyecto en marzo de 2026: no es claro que dependiera de Sumar), la reforma
 * del despido, la herencia universal y la jornada de 32 horas (sin iniciativa
 * con ficha que citar).
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const ACUERDO = {
  url: "https://movimientosumar.es/wp-content/uploads/2023/10/ACUERDO_GOBIERNO_COALICION_2023-DEF.pdf",
  title: "PSOE y SUMAR — Acuerdo de Gobierno de coalición progresista «España avanza» (24-10-2023)",
  date: "2023-10-24",
  archiveUrl:
    "https://web.archive.org/web/20240809081819/https://movimientosumar.es/wp-content/uploads/2023/10/ACUERDO_GOBIERNO_COALICION_2023-DEF.pdf",
  kind: "partido" as const,
};
const ACUERDO_SPEAKER = "PSOE y SUMAR (acuerdo de coalición)";
const ACUERDO_ROLE = "acuerdo programático de Gobierno firmado por ambos partidos";
const ACUERDO_ROLE_I18N = { ca: "acord programàtic de Govern signat per tots dos partits", gl: "acordo programático de Goberno asinado por ambos os partidos", eu: "bi alderdiek sinatutako Gobernu-akordio programatikoa" } as const;

const PROGRAMA = {
  url: "https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf",
  title: "SUMAR — «Un programa para ti», programa electoral para las elecciones generales del 23-J-2023",
  year: 2023,
  archiveUrl:
    "https://web.archive.org/web/20230712065723/https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf",
  kind: "programa" as const,
};

export const saidVsDid: SaidVsDid[] = [
  {
    id: "sumar-jornada-37-5-2023",
    partyId: "sumar",
    questionId: "jornada-37-5",
    topic: "Reducción de la jornada laboral a 37,5 horas",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Reduciremos la jornada laboral máxima legal sin reducción salarial para establecerla en 37 horas y media semanales. Su aplicación se producirá de forma progresiva reduciéndose hasta las 38,5 horas en 2024 y culminándose en 2025.",
      source: { ...ACUERDO, page: "11" },
    },
    did: {
      date: "2025-09-10",
      summary:
        "El proyecto de ley de reducción de la jornada a 37,5 horas, impulsado por el Ministerio de Trabajo (Yolanda Díaz), llegó al Pleno en 2025. El Congreso aprobó las enmiendas a la totalidad de devolución de Junts, Vox y PP (178 sí, 170 no); los 26 diputados de Sumar votaron en contra de la devolución.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 130,
          date: "2025-09-10",
          number: 10,
          title:
            "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json`,
        },
      ],
    },
    verdict: "parcial",
    note: "Sumar presentó la reforma desde el Gobierno y votó contra su devolución, pero la jornada no se redujo: no hubo paso a 38,5 horas en 2024 y el proyecto fue devuelto en 2025. Cumple en lo que dependía de su voto; el compromiso de resultado no se alcanzó.",
    i18n: {
      ca: {
        topic: "Reducció de la jornada laboral a 37,5 hores",
        summary: "El projecte de llei de reducció de la jornada a 37,5 hores, impulsat pel Ministeri de Treball (Yolanda Díaz), va arribar al Ple el 2025. El Congrés va aprovar les esmenes a la totalitat de devolució de Junts, Vox i PP (178 sí, 170 no); els 26 diputats de Sumar van votar en contra de la devolució.",
        note: "Sumar va presentar la reforma des del Govern i va votar contra la devolució, però la jornada no es va reduir: no hi va haver pas a 38,5 hores el 2024 i el projecte va ser retornat el 2025. Compleix en allò que depenia del seu vot; el compromís de resultat no es va assolir.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Redución da xornada laboral a 37,5 horas",
        summary: "O proxecto de lei de redución da xornada a 37,5 horas, impulsado polo Ministerio de Traballo (Yolanda Díaz), chegou ao Pleno en 2025. O Congreso aprobou as emendas á totalidade de devolución de Junts, Vox e PP (178 si, 170 non); os 26 deputados de Sumar votaron en contra da devolución.",
        note: "Sumar presentou a reforma desde o Goberno e votou contra a súa devolución, pero a xornada non se reduciu: non houbo paso a 38,5 horas en 2024 e o proxecto foi devolto en 2025. Cumpre no que dependía do seu voto; o compromiso de resultado non se alcanzou.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Lanaldiaren murrizketa 37,5 ordura",
        summary: "Lanaldia 37,5 ordura murrizteko lege-proiektua, Lan Ministerioak (Yolanda Díaz) bultzatua, 2025ean iritsi zen Osoko Bilkurara. Kongresuak Junts, Vox eta PPren itzultzeko osoko zuzenketak onartu zituen (178 bai, 170 ez); Sumarren 26 diputatuek itzulketaren aurka bozkatu zuten.",
        note: "Sumarrek Gobernutik aurkeztu zuen erreforma eta haren itzulketaren aurka bozkatu zuen, baina lanaldia ez zen murriztu: 2024an ez zen 38,5 ordura igaro, eta proiektua 2025ean itzuli zen. Bere botoaren mende zegoenean betetzen du; emaitzaren konpromisoa ez zen lortu.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-smi-60-2023",
    partyId: "sumar",
    topic: "Salario mínimo interprofesional",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "El SMI seguirá creciendo a lo largo de la legislatura para asegurar su poder adquisitivo, garantizándose en el Estatuto de los Trabajadores que aumentará acompasado al 60% del salario medio.",
      source: { ...ACUERDO, page: "11" },
    },
    did: {
      date: "2026-02-18",
      summary:
        "El Gobierno subió el SMI por real decreto cada año de la legislatura: 1.134 €/mes en 2024, 1.184 €/mes en 2025 y 1.221 €/mes en 2026. Los preámbulos dicen que «se mantiene el objetivo» del 60 % del salario medio. El artículo 27 del Estatuto de los Trabajadores no se ha modificado desde la Ley 3/2023.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2024-2251",
          title: "Real Decreto 145/2024, de 6 de febrero, por el que se fija el salario mínimo interprofesional para 2024",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-2251",
          date: "2024-02-07",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2025-2576",
          title: "Real Decreto 87/2025, de 11 de febrero, por el que se fija el salario mínimo interprofesional para 2025",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-2576",
          date: "2025-02-12",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2026-3815",
          title: "Real Decreto 126/2026, de 18 de febrero, por el que se fija el salario mínimo interprofesional para 2026",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-3815",
          date: "2026-02-19",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Cumplida la subida anual. No cumplida la segunda parte: la garantía del 60 % no se ha incorporado al Estatuto de los Trabajadores (texto consolidado del art. 27 en boe.es, BOE-A-2015-11430, última modificación por la Ley 3/2023, de 28 de febrero).",
    i18n: {
      ca: {
        topic: "Salari mínim interprofessional",
        summary: "El Govern va apujar l'SMI per reial decret cada any de la legislatura: 1.134 €/mes el 2024, 1.184 €/mes el 2025 i 1.221 €/mes el 2026. Els preàmbuls diuen que «se mantiene el objetivo» del 60 % del salari mitjà. L'article 27 de l'Estatut dels Treballadors no s'ha modificat des de la Llei 3/2023.",
        note: "Complerta la pujada anual. No complerta la segona part: la garantia del 60 % no s'ha incorporat a l'Estatut dels Treballadors (text consolidat de l'art. 27 a boe.es, BOE-A-2015-11430, darrera modificació per la Llei 3/2023, de 28 de febrer).",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Salario mínimo interprofesional",
        summary: "O Goberno subiu o SMI por real decreto cada ano da lexislatura: 1.134 €/mes en 2024, 1.184 €/mes en 2025 e 1.221 €/mes en 2026. Os preámbulos din que «se mantiene el objetivo» do 60 % do salario medio. O artigo 27 do Estatuto dos Traballadores non se modificou desde a Lei 3/2023.",
        note: "Cumprida a suba anual. Non cumprida a segunda parte: a garantía do 60 % non se incorporou ao Estatuto dos Traballadores (texto consolidado do art. 27 en boe.es, BOE-A-2015-11430, última modificación pola Lei 3/2023, do 28 de febreiro).",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Lanbide arteko gutxieneko soldata",
        summary: "Gobernuak legealdiko urte guztietan igo zuen lanbide arteko gutxieneko soldata (SMI) errege-dekretu bidez: 1.134 €/hilabete 2024an, 1.184 €/hilabete 2025ean eta 1.221 €/hilabete 2026an. Hitzaurreen arabera, batez besteko soldataren % 60ko helburuari eusten zaio («se mantiene el objetivo»). Langileen Estatutuaren 27. artikulua ez da aldatu 3/2023 Legez geroztik.",
        note: "Urteko igoera bete da. Bigarren zatia ez da bete: % 60ko bermea ez da Langileen Estatutuan sartu (27. artikuluaren testu bateratua boe.es-en, BOE-A-2015-11430; azken aldaketa otsailaren 28ko 3/2023 Legeak egina).",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-subsidio-desempleo-2023",
    partyId: "sumar",
    topic: "Reforma del subsidio por desempleo",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Simplificaremos y mejoraremos el nivel asistencial por desempleo, facilitando el acceso, la compatibilidad con el trabajo, dotándolo de las prestaciones suficientes y reforzando los incentivos al empleo.",
      source: { ...ACUERDO, page: "12" },
    },
    did: {
      date: "2024-06-20",
      summary:
        "El Gobierno aprobó el Real Decreto-ley 2/2024, del Ministerio de Trabajo, que amplía el acceso al subsidio (menores de 45 años sin cargas familiares, cotizaciones inferiores a seis meses) y crea el «complemento de apoyo al empleo» para compatibilizarlo con un trabajo. El Congreso lo convalidó con el voto a favor de Sumar.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2024-10235",
          title:
            "Real Decreto-ley 2/2024, de 21 de mayo, por el que se adoptan medidas urgentes para la simplificación y mejora del nivel asistencial de la protección por desempleo",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-10235",
          date: "2024-05-22",
          role: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 49,
          date: "2024-06-20",
          number: 19,
          title: "Convalidación o derogación de Reales Decretos-leyes. Real Decreto-ley 2/2024, de 21 de mayo (nivel asistencial de la protección por desempleo).",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion049/20240620/Votacion019/VOT_20240620132741.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Reforma del subsidi per desocupació",
        summary: "El Govern va aprovar el Reial decret llei 2/2024, del Ministeri de Treball, que amplia l'accés al subsidi (menors de 45 anys sense càrregues familiars, cotitzacions inferiors a sis mesos) i crea el «complement de suport a l'ocupació» per fer-lo compatible amb una feina. El Congrés el va convalidar amb el vot a favor de Sumar.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Reforma do subsidio por desemprego",
        summary: "O Goberno aprobou o Real decreto-lei 2/2024, do Ministerio de Traballo, que amplía o acceso ao subsidio (menores de 45 anos sen cargas familiares, cotizacións inferiores a seis meses) e crea o «complemento de apoio ao emprego» para compatibilizalo cun traballo. O Congreso convalidouno co voto a favor de Sumar.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Langabezia-sorospenaren erreforma",
        summary: "Gobernuak Lan Ministerioaren 2/2024 Errege Lege-dekretua onartu zuen; sorospenerako sarbidea zabaltzen du (familia-kargarik gabeko 45 urtetik beherakoak, sei hilabetetik beherako kotizazioak) eta «enplegurako laguntza-osagarria» sortzen du, lan batekin bateragarri egiteko. Kongresuak baliozkotu egin zuen, Sumarren aldeko botoarekin.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-permisos-nacimiento-2023",
    partyId: "sumar",
    topic: "Permisos de nacimiento y cuidado",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Extenderemos el permiso de paternidad y maternidad hasta las 20 semanas, […] con el objetivo de remunerar al menos 4 semanas por hijo/a del recientemente creado permiso parental de cuidados, a partir de agosto de 2024",
      source: { ...ACUERDO, page: "22" },
    },
    did: {
      date: "2025-07-29",
      summary:
        "El Real Decreto-ley 9/2025, a propuesta del Ministerio de Trabajo (Sumar), amplió el permiso de nacimiento y cuidado de 16 a 19 semanas por progenitor, dos de ellas para el cuidado hasta que el menor cumpla ocho años, retribuidas al 100 %. El Congreso lo convalidó el 9-9-2025 con el voto a favor de Sumar.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2025-15741",
          title: "Real Decreto-ley 9/2025, de 29 de julio, por el que se amplía el permiso de nacimiento y cuidado",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-15741",
          date: "2025-07-30",
          role: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 129,
          date: "2025-09-09",
          number: 3,
          title: "Convalidación o derogación de Reales Decretos-leyes. Real Decreto-ley 9/2025, de 29 de julio, por el que se amplía el permiso de nacimiento y cuidado.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion129/20250909/Votacion003/VOT_20250909221801.json`,
        },
      ],
    },
    verdict: "parcial",
    note: "19 semanas, no 20: el propio preámbulo dice que «el Gobierno se compromete a extender hasta las veinte semanas» en el futuro. En lugar de remunerar 4 semanas del permiso parental, el real decreto-ley añade 2 semanas retribuidas al permiso de nacimiento para el cuidado hasta los ocho años (con efectos desde el 2-8-2024) y deja el permiso parental de 8 semanas sin retribución (el preámbulo lo dice expresamente para el empleo público). La cita omite, marcado con […], el inciso intermedio sobre flexibilidad y la Directiva 2019/1158.",
    i18n: {
      ca: {
        topic: "Permisos de naixement i cura",
        summary: "El Reial decret llei 9/2025, a proposta del Ministeri de Treball (Sumar), va ampliar el permís de naixement i cura de 16 a 19 setmanes per progenitor, dues de les quals per a la cura fins que el menor faci vuit anys, retribuïdes al 100 %. El Congrés el va convalidar el 9-9-2025 amb el vot a favor de Sumar.",
        note: "19 setmanes, no 20: el mateix preàmbul diu que «el Gobierno se compromete a extender hasta las veinte semanas» en el futur. En lloc de remunerar 4 setmanes del permís parental, el reial decret llei afegeix 2 setmanes retribuïdes al permís de naixement per a la cura fins als vuit anys (amb efectes des del 2-8-2024) i deixa el permís parental de 8 setmanes sense retribució (el preàmbul ho diu expressament per a l'ocupació pública). La cita omet, marcat amb […], l'incís intermedi sobre flexibilitat i la Directiva 2019/1158.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Permisos de nacemento e coidado",
        summary: "O Real decreto-lei 9/2025, por proposta do Ministerio de Traballo (Sumar), ampliou o permiso de nacemento e coidado de 16 a 19 semanas por proxenitor, dúas delas para o coidado ata que o menor cumpra oito anos, retribuídas ao 100 %. O Congreso convalidouno o 9-9-2025 co voto a favor de Sumar.",
        note: "19 semanas, non 20: o propio preámbulo di que «el Gobierno se compromete a extender hasta las veinte semanas» no futuro. En lugar de remunerar 4 semanas do permiso parental, o real decreto-lei engade 2 semanas retribuídas ao permiso de nacemento para o coidado ata os oito anos (con efectos desde o 2-8-2024) e deixa o permiso parental de 8 semanas sen retribución (o preámbulo dio expresamente para o emprego público). A cita omite, marcado con […], o inciso intermedio sobre flexibilidade e a Directiva 2019/1158.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Jaiotza- eta zaintza-baimenak",
        summary: "Lan Ministerioak (Sumar) proposatuta, 9/2025 Errege Lege-dekretuak jaiotza- eta zaintza-baimena 16 astetik 19 astera luzatu zuen guraso bakoitzeko; horietako bi adingabeak zortzi urte bete arte zaintzeko dira, eta % 100ean ordaintzen dira. Kongresuak 2025-9-9an baliozkotu zuen, Sumarren aldeko botoarekin.",
        note: "19 aste, ez 20: hitzaurreak berak dio etorkizunean «el Gobierno se compromete a extender hasta las veinte semanas». Guraso-baimenaren 4 aste ordaindu beharrean, errege lege-dekretuak 2 aste ordaindu gehitzen dizkio jaiotza-baimenari, zortzi urte bete arte zaintzeko (2024-8-2tik aurrerako ondorioekin), eta 8 asteko guraso-baimena ordaindu gabe uzten du (hitzaurreak berariaz dio hori enplegu publikorako). Aipuak […] ikurrarekin markatuta kentzen du malgutasunari eta 2019/1158 Zuzentarauari buruzko tarteko zatia.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-gravamenes-banca-energia-2023",
    partyId: "sumar",
    topic: "Impuestos a la banca y a las energéticas",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Revisaremos los gravámenes sobre la banca y las empresas energéticas con el objetivo de readaptarlos y mantenerlos una vez que expire su periodo de aplicación actual,. para que ambos sectores sigan contribuyendo a la justicia fiscal y al sostenimiento del Estado de bienestar.",
      source: { ...ACUERDO, page: "38" },
    },
    did: {
      date: "2025-01-22",
      summary:
        "La Ley 7/2024 convirtió el gravamen a la banca en un impuesto sobre el margen de intereses y comisiones. El gravamen energético se prorrogó para 2025 por el Real Decreto-ley 10/2024, que el Congreso derogó el 22-1-2025 (165 sí, 183 no); Sumar votó a favor de convalidarlo.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2024-26694",
          title:
            "Ley 7/2024, de 20 de diciembre, por la que se establecen un Impuesto Complementario para garantizar un nivel mínimo global de imposición para los grupos multinacionales y los grupos nacionales de gran magnitud, un Impuesto sobre el margen de intereses y comisiones de determinadas entidades financieras…",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-26694",
          date: "2024-12-21",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2024-26916",
          title: "Real Decreto-ley 10/2024, de 23 de diciembre, para el establecimiento de un gravamen temporal energético durante el año 2025",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-26916",
          date: "2024-12-24",
          role: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 89,
          date: "2025-01-22",
          number: 2,
          title: "Convalidación o derogación de Reales Decretos-leyes. Real Decreto-ley 10/2024, de 23 de diciembre, para el establecimiento de un gravamen temporal energético durante el año 2025.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion089/20250122/Votacion002/VOT_20250122154427.json`,
        },
      ],
    },
    verdict: "parcial",
    note: "El impuesto a la banca se mantuvo (Ley 7/2024); el energético decayó al ser derogado el decreto (Resolución del Congreso de 22-1-2025, BOE-A-2025-1137). Sumar votó en el sentido de su compromiso en ambos casos. La cita conserva la errata «actual,.» del original.",
    i18n: {
      ca: {
        topic: "Impostos a la banca i a les energètiques",
        summary: "La Llei 7/2024 va convertir el gravamen a la banca en un impost sobre el marge d'interessos i comissions. El gravamen energètic es va prorrogar per al 2025 pel Reial decret llei 10/2024, que el Congrés va derogar el 22-1-2025 (165 sí, 183 no); Sumar va votar a favor de convalidar-lo.",
        note: "L'impost a la banca es va mantenir (Llei 7/2024); l'energètic va decaure en ser derogat el decret (Resolució del Congrés de 22-1-2025, BOE-A-2025-1137). Sumar va votar en el sentit del seu compromís en tots dos casos. La cita conserva l'errata «actual,.» de l'original.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Impostos á banca e ás enerxéticas",
        summary: "A Lei 7/2024 converteu o gravame á banca nun imposto sobre a marxe de xuros e comisións. O gravame enerxético prorrogouse para 2025 polo Real decreto-lei 10/2024, que o Congreso derrogou o 22-1-2025 (165 si, 183 non); Sumar votou a favor de convalidalo.",
        note: "O imposto á banca mantívose (Lei 7/2024); o enerxético decaeu ao ser derrogado o decreto (Resolución do Congreso do 22-1-2025, BOE-A-2025-1137). Sumar votou no sentido do seu compromiso en ambos os casos. A cita conserva a errata «actual,.» do orixinal.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Bankuei eta energia-enpresei zergak",
        summary: "7/2024 Legeak bankuen gaineko karga interes- eta komisio-marjinaren gaineko zerga bihurtu zuen. Energia-karga 2025erako luzatu zen 10/2024 Errege Lege-dekretuaren bidez, eta Kongresuak indargabetu egin zuen 2025-1-22an (165 bai, 183 ez); Sumarrek baliozkotzearen alde bozkatu zuen.",
        note: "Bankuen gaineko zergari eutsi zitzaion (7/2024 Legea); energiakoa iraungi egin zen, dekretua indargabetu zelako (Kongresuaren 2025-1-22ko Ebazpena, BOE-A-2025-1137). Sumarrek bere konpromisoaren norabidean bozkatu zuen bi kasuetan. Aipuak jatorrizkoaren «actual,.» akatsa gordetzen du.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-calendario-nuclear-2023",
    partyId: "sumar",
    questionId: "nuclear",
    topic: "Calendario de cierre de las centrales nucleares",
    said: {
      speaker: "SUMAR",
      role: "programa electoral para las generales de 2023",
      // Fecha de la primera copia pública comprobada (archive.org, 12-7-2023); el PDF se creó el 10-7-2023.
      date: "2023-07-12",
      text: "Sumar se compromete a mantener el calendario de cierre del parque nuclear español, aplicando una moratoria a cualquier nueva iniciativa nuclear, exigiendo revisiones e inversiones para garantizar la seguridad del proceso y subrayando la responsabilidad de los propietarios en el mismo.",
      source: { ...PROGRAMA, page: "48" },
    },
    did: {
      date: "2025-06-17",
      summary:
        "El Congreso tomó en consideración la proposición de ley del PP para garantizar la aportación de la energía nuclear (171 sí, 166 no, 7 abstenciones). Sumar votó en contra (25 no, 1 no vota).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 119,
          date: "2025-06-17",
          number: 1,
          title:
            "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.",
          groupVote: "no",
          url: `${CONGRESO}/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json`,
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Calendari de tancament de les centrals nuclears",
        summary: "El Congrés va prendre en consideració la proposició de llei del PP per garantir l'aportació de l'energia nuclear (171 sí, 166 no, 7 abstencions). Sumar hi va votar en contra (25 no, 1 no vota).",
        role: "programa electoral per a les eleccions generals del 2023",
      },
      gl: {
        topic: "Calendario de peche das centrais nucleares",
        summary: "O Congreso tomou en consideración a proposición de lei do PP para garantir a achega da enerxía nuclear (171 si, 166 non, 7 abstencións). Sumar votou en contra (25 non, 1 non vota).",
        role: "programa electoral para as eleccións xerais de 2023",
      },
      eu: {
        topic: "Zentral nuklearrak ixteko egutegia",
        summary: "Kongresuak aintzat hartu zuen PPren lege-proposamena, energia nuklearraren ekarpena bermatzekoa (171 bai, 166 ez, 7 abstentzio). Sumarrek aurka bozkatu zuen (25 ez, 1ek ez zuen bozkatu).",
        role: "2023ko hauteskunde orokorretarako hauteskunde-programa",
      },
    },
  },
  {
    id: "sumar-embargo-armas-israel-2025",
    partyId: "sumar",
    topic: "Embargo de armas a Israel",
    said: {
      speaker: "Gerardo Pisarello Prados",
      role: "presenta la proposición de ley de embargo por el GP Plurinacional SUMAR",
      date: "2025-05-20",
      text: "En cumplimiento de la convención contra el genocidio, de los mandatos de Naciones Unidas y de la Corte Internacional de Justicia, aprobemos un embargo de armas que establezca un precedente para Francia, para Alemania, para el Reino Unido y el resto de los países de Europa",
      source: {
        url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-116.PDF",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 116 (20-5-2025)",
        date: "2025-05-20",
        page: "p. 24",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2025-09-23",
      summary:
        "El Gobierno, del que forma parte Sumar, aprobó el Real Decreto-ley 10/2025, que prohíbe las exportaciones de material de defensa y doble uso a Israel y las importaciones de ese material desde Israel. El Congreso lo convalidó el 8-10-2025 (178 sí, 169 no) con los 26 votos de Sumar.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2025-18831",
          title:
            "Real Decreto-ley 10/2025, de 23 de septiembre, por el que se adoptan medidas urgentes contra el genocidio en Gaza y de apoyo a la población palestina",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-18831",
          date: "2025-09-24",
          role: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 136,
          date: "2025-10-08",
          number: 87,
          title:
            "Convalidación o derogación de Reales Decretos-leyes. Real Decreto-ley 10/2025, de 23 de septiembre, por el que se adoptan medidas urgentes contra el genocidio en Gaza y de apoyo a la población palestina.",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion136/20251008/Votacion087/VOT_20251008195359.json`,
        },
      ],
    },
    verdict: "cumple",
    note: "El embargo llegó por real decreto-ley del Gobierno, no por la proposición de ley de Sumar, y su disposición adicional primera permite que el Consejo de Ministros autorice transferencias de forma excepcional por «intereses generales nacionales».",
    i18n: {
      ca: {
        topic: "Embargament d'armes a Israel",
        summary: "El Govern, del qual forma part Sumar, va aprovar el Reial decret llei 10/2025, que prohibeix les exportacions de material de defensa i de doble ús a Israel i les importacions d'aquest material des d'Israel. El Congrés el va convalidar el 8-10-2025 (178 sí, 169 no) amb els 26 vots de Sumar.",
        note: "L'embargament va arribar per reial decret llei del Govern, no per la proposició de llei de Sumar, i la seva disposició addicional primera permet que el Consell de Ministres autoritzi transferències de manera excepcional per «intereses generales nacionales».",
        role: "presenta la proposició de llei d'embargament en nom del GP Plurinacional SUMAR",
      },
      gl: {
        topic: "Embargo de armas a Israel",
        summary: "O Goberno, do que forma parte Sumar, aprobou o Real decreto-lei 10/2025, que prohibe as exportacións de material de defensa e de dobre uso a Israel e as importacións dese material desde Israel. O Congreso convalidouno o 8-10-2025 (178 si, 169 non) cos 26 votos de Sumar.",
        note: "O embargo chegou por real decreto-lei do Goberno, non pola proposición de lei de Sumar, e a súa disposición adicional primeira permite que o Consello de Ministros autorice transferencias de forma excepcional por «intereses generales nacionales».",
        role: "presenta a proposición de lei de embargo en nome do GP Plurinacional SUMAR",
      },
      eu: {
        topic: "Israeli armen enbargoa",
        summary: "Gobernuak, Sumar barne dela, 10/2025 Errege Lege-dekretua onartu zuen; Israeli defentsa-materiala eta erabilera bikoitzeko materiala esportatzea eta material hori Israeldik inportatzea debekatzen du. Kongresuak 2025-10-8an baliozkotu zuen (178 bai, 169 ez), Sumarren 26 botoekin.",
        note: "Enbargoa Gobernuaren errege lege-dekretu baten bidez iritsi zen, ez Sumarren lege-proposamenaren bidez, eta haren lehen xedapen gehigarriak aukera ematen dio Ministro Kontseiluari salbuespenez transferentziak baimentzeko, «intereses generales nacionales» direla-eta.",
        role: "enbargo-lege-proposamena aurkezten du GP Plurinacional SUMARren izenean",
      },
    },
  },
  {
    id: "sumar-ley-mordaza-2023",
    partyId: "sumar",
    topic: "Reforma de la Ley de Seguridad Ciudadana («ley mordaza»)",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Reformaremos, y derogaremos, aquellos aspectos de la normativa vigente que limita los derechos de reunión y libertad de expresión (la «ley mordaza» y el Código Penal). En concreto, garantizaremos el ejercicio del derecho a la libertad de expresión y reunión pacífica.",
      source: { ...ACUERDO, page: "p. 43" },
    },
    did: {
      date: "2026-10-06",
      summary:
        "GSUMAR registró su propia proposición de reforma (122/000098), que no llegó a debatirse en el Pleno, y coescribió la proposición conjunta 122/000131, tomada en consideración el 29-10-2024 con el voto a favor de Sumar y en ponencia desde el 19-12-2024. Ninguna se aprobó antes de la disolución de las Cortes (6-10-2026); la Ley Orgánica 4/2015 sigue vigente.",
      evidence: [
        {
          kind: "iniciativa",
          title: "Proposición de Ley Orgánica de reforma de la Ley Orgánica 4/2015, de protección de la seguridad ciudadana (122/000098, XV, Grupo Plurinacional SUMAR)",
          url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=122/000098",
          status: "Pleno — Toma en consideración (pendiente de debate desde el 22-6-2024)",
          date: "2024-06-22",
        },
        {
          kind: "iniciativa",
          title: "Proposición de Ley Orgánica de protección de las libertades y seguridad ciudadana (122/000131, XV; autores: GS, GSUMAR, GEH Bildu, GV EAJ-PNV)",
          url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=122/000131",
          status: "Comisión de Interior — Informe (en ponencia desde el 19-12-2024, sin informe al disolverse las Cortes)",
          date: "2024-12-19",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 71,
          date: "2024-10-29",
          number: 1,
          title: "Toma en consideración de la Proposición de Ley Orgánica de protección de las libertades y seguridad ciudadana",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion071/20241029/Votacion001/VOT_20241029212331.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2026-20742",
          title: "Real Decreto 806/2026, de 5 de octubre, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742",
          date: "2026-10-06",
          role: "gobierno",
        },
      ],
    },
    verdict: "no-hecho",
    note:
      "Podía hacerlo: SUMAR firmó el compromiso en el acuerdo de Gobierno de coalición, tuvo ministros en el Gobierno toda la XV (que podía remitir un proyecto de ley) y es coautor de la proposición 122/000131, que reunió 176 votos en su toma en consideración. Su propia proposición 122/000098 quedó sin incluir en el orden del día del Pleno.",
    i18n: {
      ca: {
        topic: "Reforma de la Llei de seguretat ciutadana («llei mordassa»)",
        summary: "GSUMAR va registrar la seva pròpia proposició de reforma (122/000098), que no es va arribar a debatre al Ple, i va coescriure la proposició conjunta 122/000131, presa en consideració el 29-10-2024 amb el vot a favor de Sumar i en ponència des del 19-12-2024. Cap no es va aprovar abans de la dissolució de les Corts (6-10-2026); la Llei orgànica 4/2015 continua vigent.",
        note: "Podia fer-ho: SUMAR va signar el compromís a l'acord de Govern de coalició, va tenir ministres al Govern durant tota la XV (que podia remetre un projecte de llei) i és coautor de la proposició 122/000131, que va reunir 176 vots en la presa en consideració. La seva pròpia proposició 122/000098 no es va incloure a l'ordre del dia del Ple.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Reforma da Lei de seguridade cidadá («lei mordaza»)",
        summary: "GSUMAR rexistrou a súa propia proposición de reforma (122/000098), que non se chegou a debater no Pleno, e coescribiu a proposición conxunta 122/000131, tomada en consideración o 29-10-2024 co voto a favor de Sumar e en ponencia desde o 19-12-2024. Ningunha se aprobou antes da disolución das Cortes (6-10-2026); a Lei orgánica 4/2015 segue vixente.",
        note: "Podía facelo: SUMAR asinou o compromiso no acordo de Goberno de coalición, tivo ministros no Goberno durante toda a XV (que podía remitir un proxecto de lei) e é coautor da proposición 122/000131, que reuniu 176 votos na súa toma en consideración. A súa propia proposición 122/000098 quedou sen incluír na orde do día do Pleno.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Herritarren Segurtasunerako Legearen («mozal-legea») erreforma",
        summary: "GSUMARek bere erreforma-proposamena erregistratu zuen (122/000098), baina ez zen Osoko Bilkuran eztabaidatu; 122/000131 proposamen bateratuaren egilekidea ere izan zen: 2024-10-29an aintzat hartu zen, Sumarren aldeko botoarekin, eta 2024-12-19tik txostengintzan zegoen. Bat ere ez zen onartu Gorteak desegin aurretik (2026-10-6); 4/2015 Lege Organikoak indarrean jarraitzen du.",
        note: "Egin zezakeen: SUMARek koalizio-Gobernuaren akordioan sinatu zuen konpromisoa, ministroak izan zituen Gobernuan XV. legealdi osoan (Gobernuak lege-proiektu bat bidal zezakeen) eta 122/000131 proposamenaren egilekidea da; proposamen horrek 176 boto bildu zituen aintzat hartzeko bozketan. Bere 122/000098 proposamena ez zen Osoko Bilkuraren gai-zerrendan sartu.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "sumar-avales-ico-50000-2023",
    partyId: "sumar",
    topic: "Vivienda",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "Desarrollaremos y aplicaremos la nueva línea de avales del Instituto de Crédito Oficial (ICO) de 2.500 millones de euros para ayudar a los jóvenes menores de 35 años […] con el objetivo de posibilitar la adquisición de unas 50.000 viviendas.",
      source: { ...ACUERDO, url: `${ACUERDO.url}#page=30`, page: "30" },
    },
    did: {
      date: "2026-07-02",
      summary:
        "La línea de avales se puso en marcha. Según la adenda del convenio entre el Ministerio de Vivienda y el ICO publicada en el BOE, a 31-10-2025 se habían formalizado 8.549 operaciones (6.119 de jóvenes y 2.430 de familias con menores a cargo), con 206,6 millones de euros avalados. La adenda prorroga hasta el 31-12-2027 el plazo para formalizar operaciones.",
      evidence: [
        {
          kind: "dato-oficial",
          title:
            "Resolución de 23 de junio de 2026 por la que se publica la Adenda del Convenio entre el Ministerio de Vivienda y Agenda Urbana y el ICO para la «Línea de avales para la adquisición de primera vivienda» (BOE-A-2026-14404), expositivo",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-14404",
          date: "2025-10-31",
          publisher: "Ministerio de Vivienda y Agenda Urbana e ICO (publicado en el BOE)",
          value:
            "8.549 operaciones formalizadas (6.119 de jóvenes, 2.430 de familias con menores a cargo); avales por 206,6 millones de euros; financiación avalada de 1.091,4 millones de euros",
        },
      ],
    },
    verdict: "parcial",
    note:
      "La línea existe y funciona (creada por el art. 191 del Real Decreto-ley 5/2023, antes del acuerdo), pero a 31-10-2025 había 8.549 compras avaladas frente a «unas 50.000» (alrededor del 17 %), y solo 206,6 de los 2.500 millones de euros comprometidos en avales. El plazo para formalizar operaciones sigue abierto hasta el 31-12-2027, así que la cifra aún puede subir; no hay dato oficial posterior al 31-10-2025 localizado. SUMAR firmó el compromiso en el acuerdo de coalición; la línea la gestionan el Ministerio de Vivienda y Agenda Urbana y el ICO.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La línia d'avals es va posar en marxa. Segons l'addenda del conveni entre el Ministeri d'Habitatge i l'ICO publicada al BOE, a 31-10-2025 s'havien formalitzat 8.549 operacions (6.119 de joves i 2.430 de famílies amb menors a càrrec), amb 206,6 milions d'euros avalats. L'addenda prorroga fins al 31-12-2027 el termini per formalitzar operacions.",
        note: "La línia existeix i funciona (creada per l'art. 191 del Reial decret llei 5/2023, abans de l'acord), però a 31-10-2025 hi havia 8.549 compres avalades davant de «unas 50.000» (al voltant del 17 %), i només 206,6 dels 2.500 milions d'euros compromesos en avals. El termini per formalitzar operacions continua obert fins al 31-12-2027, de manera que la xifra encara pot augmentar; no s'ha localitzat cap dada oficial posterior al 31-10-2025. SUMAR va signar el compromís a l'acord de coalició; la línia la gestionen el Ministeri d'Habitatge i Agenda Urbana i l'ICO.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Vivenda",
        summary: "A liña de avais púxose en marcha. Segundo a addenda do convenio entre o Ministerio de Vivenda e o ICO publicada no BOE, a 31-10-2025 formalizáranse 8.549 operacións (6.119 de mozos e 2.430 de familias con menores a cargo), con 206,6 millóns de euros avalados. A addenda prorroga ata o 31-12-2027 o prazo para formalizar operacións.",
        note: "A liña existe e funciona (creada polo art. 191 do Real decreto-lei 5/2023, antes do acordo), pero a 31-10-2025 había 8.549 compras avaladas fronte a «unas 50.000» (arredor do 17 %), e só 206,6 dos 2.500 millóns de euros comprometidos en avais. O prazo para formalizar operacións segue aberto ata o 31-12-2027, así que a cifra aínda pode subir; non se localizou ningún dato oficial posterior ao 31-10-2025. SUMAR asinou o compromiso no acordo de coalición; a liña xestiónana o Ministerio de Vivenda e Axenda Urbana e o ICO.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Abal-lerroa martxan jarri zen. Etxebizitza Ministerioaren eta ICOren arteko hitzarmenaren eranskinaren arabera (BOEn argitaratua), 2025-10-31n 8.549 eragiketa formalizatuta zeuden (6.119 gazteenak eta 2.430 adingabeak ardurapean dituzten familienak), 206,6 milioi euroko abalekin. Eranskinak 2027-12-31ra arte luzatzen du eragiketak formalizatzeko epea.",
        note: "Lerroa badago eta martxan dago (5/2023 Errege Lege-dekretuaren 191. artikuluak sortua, akordioa baino lehen), baina 2025-10-31n 8.549 erosketa abalatu zeuden, «unas 50.000»-en aldean (% 17 inguru), eta abaletan konprometitutako 2.500 milioi euroetatik 206,6 baino ez. Eragiketak formalizatzeko epea 2027-12-31ra arte dago zabalik; beraz, zifra oraindik igo daiteke; ez da aurkitu 2025-10-31z geroztiko datu ofizialik. SUMARek koalizio-akordioan sinatu zuen konpromisoa; lerroa Etxebizitza eta Hiri Agenda Ministerioak eta ICOk kudeatzen dute.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },  {
    id: "sumar-indice-precios-alquiler-2023",
    partyId: "sumar",
    questionId: "vivienda-tope-alquiler",
    topic: "Vivienda",
    said: {
      speaker: ACUERDO_SPEAKER,
      role: ACUERDO_ROLE,
      date: "2023-10-24",
      text: "se definirá con carácter inmediato el índice de precios de referencia que permitan identificar los municipios y distritos que se consideran zonas tensionadas, para impulsar la puesta en marcha de la regulación de los precios de los alquileres.",
      source: { ...ACUERDO, url: `${ACUERDO.url}#page=29`, page: "29" },
    },
    did: {
      date: "2024-03-15",
      summary:
        "La Secretaría de Estado de Vivienda y Agenda Urbana publicó en el BOE el sistema de índices de precios de referencia del artículo 17.7 de la Ley de Arrendamientos Urbanos y, el mismo día, la relación de zonas de mercado residencial tensionado declaradas en el primer trimestre de 2024.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2024-5213",
          title:
            "Resolución de 14 de marzo de 2024, de la Secretaría de Estado de Vivienda y Agenda Urbana, por la que se determina el sistema de índices de precios de referencia a los efectos de lo establecido en el artículo 17.7 de la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-5213",
          date: "2024-03-15",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2024-5214",
          title:
            "Resolución de 14 de marzo de 2024, de la Secretaría de Estado de Vivienda y Agenda Urbana, por la que se publica la relación de zonas de mercado residencial tensionado declaradas en el primer trimestre de 2024",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-5214",
          date: "2024-03-15",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "«Con carácter inmediato»: el índice se publicó en el BOE casi cinco meses después del acuerdo (24-10-2023). En la Ley 12/2023 el índice sirve para limitar la renta en las zonas ya declaradas tensionadas; la declaración la hacen las comunidades autónomas.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La Secretaria d'Estat d'Habitatge i Agenda Urbana va publicar al BOE el sistema d'índexs de preus de referència de l'article 17.7 de la Llei d'arrendaments urbans i, el mateix dia, la relació de zones de mercat residencial tensionat declarades el primer trimestre del 2024.",
        note: "«Con carácter inmediato»: l'índex es va publicar al BOE gairebé cinc mesos després de l'acord (24-10-2023). En la Llei 12/2023 l'índex serveix per limitar la renda a les zones ja declarades tensionades; la declaració la fan les comunitats autònomes.",
        role: ACUERDO_ROLE_I18N.ca,
      },
      gl: {
        topic: "Vivenda",
        summary: "A Secretaría de Estado de Vivenda e Axenda Urbana publicou no BOE o sistema de índices de prezos de referencia do artigo 17.7 da Lei de arrendamentos urbanos e, o mesmo día, a relación de zonas de mercado residencial tensionado declaradas no primeiro trimestre de 2024.",
        note: "«Con carácter inmediato»: o índice publicouse no BOE case cinco meses despois do acordo (24-10-2023). Na Lei 12/2023 o índice serve para limitar a renda nas zonas xa declaradas tensionadas; a declaración fana as comunidades autónomas.",
        role: ACUERDO_ROLE_I18N.gl,
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Etxebizitza eta Hiri Agendako Estatu Idazkaritzak BOEn argitaratu zuen Hiri Errentamenduen Legearen 17.7 artikuluko erreferentziazko prezio-indizeen sistema eta, egun berean, 2024ko lehen hiruhilekoan deklaratutako bizitegi-merkatu tentsionatuko eremuen zerrenda.",
        note: "«Con carácter inmediato»: indizea akordioa baino ia bost hilabete geroago argitaratu zen BOEn (2023-10-24). 12/2023 Legean, indizeak tentsionatutzat deklaratutako eremuetan errenta mugatzeko balio du; deklarazioa autonomia-erkidegoek egiten dute.",
        role: ACUERDO_ROLE_I18N.eu,
      },
    },
  },];
