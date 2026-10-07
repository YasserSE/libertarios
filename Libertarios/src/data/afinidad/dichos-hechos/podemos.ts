import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» de Podemos. No puntúa nunca.
 *
 * Criterio de selección (el mismo para todos los partidos): compromisos
 * explícitos y muy difundidos del partido, su líder o su portavoz, cumplidos e
 * incumplidos, cada uno con un hecho posterior verificable en fuente primaria.
 *
 * Atribución del voto: en la XIV, Podemos votaba dentro del grupo GCUP-EC-GC
 * (Unidas Podemos), compartido con IU y los Comuns, y estaba en el Gobierno de
 * coalición (enero 2020 – noviembre 2023). En la XV, voto por diputado
 * (`../deputies.ts`: Belarra, Velarde, Sánchez Serna, Santana; GMx desde el
 * 5-12-2023).
 *
 * Comprobado el 2026-10-06:
 * - Programa «Las razones siguen intactas» (generales del 10-N-2019): PDF de
 *   podemos.info (metadatos de creación 12-10-2019; copia en archive.org de
 *   14-1-2020). La página impresa coincide con la del PDF.
 * - Diario de Sesiones: PDF oficial, página impresa.
 * - Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es.
 *   La votación del dictamen de la Ley 38/2022 fue pública por llamamiento y
 *   no tiene JSON: se cita el Diario de Sesiones (nota de la entrada).
 * - Referencias BOE comprobadas con el texto de boe.es (título, fecha y, donde
 *   se resume el contenido, los artículos citados).
 *
 * No se ha encontrado ningún «contradice» con fuente primaria de Podemos y acto
 * contrario documentado. Descartados: (1) gasto militar — el grupo GCUP-EC-GC
 * votó «sí» a la sección 14 (Defensa) de los PGE 2023 (24-11-2022, votación
 * 402), pero el «no lo apoyaremos» de junio de 2022 es de Jaume Asens (En Comú
 * Podem, presidente del grupo) y solo consta en prensa; de Podemos solo hay
 * declaraciones de desacuerdo, no un compromiso. La «ley mordaza» no es un
 * «contradice» (ausencia de acto) sino un «no-hecho»: se cita el acuerdo de
 * coalición de 2019, firmado por Iglesias, y no la medida 154 del programa,
 * porque es el acuerdo lo que le daba el poder de hacerlo.
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const PROGRAMA = {
  url: "https://podemos.info/wp-content/uploads/2019/10/Podemos_programa_generales_10N.pdf",
  title: "Podemos — «Las razones siguen intactas», programa para las elecciones generales del 10-N-2019",
  date: "2019-10-12",
  year: 2019,
  archiveUrl:
    "https://web.archive.org/web/20200114160742/https://podemos.info/wp-content/uploads/2019/10/Podemos_programa_generales_10N.pdf",
  kind: "programa" as const,
};
const PROGRAMA_SPEAKER = "Podemos (programa electoral)";
const PROGRAMA_ROLE = "programa de Podemos para las generales del 10-N-2019";
const PROGRAMA_DATE = "2019-10-12";
const PROGRAMA_ROLE_I18N = { ca: "programa de Podemos per a les eleccions generals del 10-N-2019", gl: "programa de Podemos para as eleccións xerais do 10-N-2019", eu: "Podemosen programa, 10-N-2019ko hauteskunde orokorretarakoa" } as const;
const COALICION_ROLE_I18N = { ca: "signants de l'acord de Govern de coalició", gl: "asinantes do acordo de Goberno de coalición", eu: "koalizio-Gobernuaren akordioaren sinatzaileak" } as const;

// Vivienda (añadido el 2026-10-07): créditos del programa 261N de los PGE.
const ACUERDO_2019 = {
  url: "https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
  title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 2.9.1",
  date: "2019-12-30",
  archiveUrl:
    "https://web.archive.org/web/20200113183843/https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
  kind: "partido" as const,
};
const PGE_TOMO_VII = (year: string, file: string) =>
  `https://www.sepg.pap.hacienda.gob.es/Presup/${year}/MaestroTomos/PGE-ROM/doc/${file}`;

export const saidVsDid: SaidVsDid[] = [
  {
    id: "podemos-solo-si-es-si-2022",
    partyId: "podemos",
    topic: "Ley de libertad sexual («solo sí es sí»)",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "Pasar del «No es no» al «Solo sí es sí». Aprobaremos una ley para la protección de la libertad sexual de todas las personas y la erradicación de las violencias sexuales",
      source: { ...PROGRAMA, page: "p. 27 (medida 57)" },
    },
    did: {
      date: "2022-08-25",
      summary:
        "El Ministerio de Igualdad (Irene Montero, de Podemos) impulsó el proyecto de Ley Orgánica de garantía integral de la libertad sexual. El grupo GCUP-EC-GC votó «sí» en la votación de conjunto final del Congreso (33 sí). Se publicó como Ley Orgánica 10/2022.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 196,
          date: "2022-08-25",
          number: 8,
          title: "Votación de conjunto del Proyecto de Ley Orgánica de garantía integral de la libertad sexual.",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion196/20220825/Votacion008/VOT_20230302181516.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2022-14630",
          title: "Ley Orgánica 10/2022, de 6 de septiembre, de garantía integral de la libertad sexual.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-14630",
          date: "2022-09-07",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "Voto del grupo GCUP-EC-GC (Unidas Podemos), compartido con IU y los Comuns. La ley se reformó en 2023 (LO 4/2023) a propuesta del PSOE; esa reforma no forma parte de esta entrada.",
    i18n: {
      ca: {
        topic: "Llei de llibertat sexual («només sí és sí»)",
        summary: "El Ministeri d'Igualtat (Irene Montero, de Podemos) va impulsar el projecte de llei orgànica de garantia integral de la llibertat sexual. El grup GCUP-EC-GC va votar «sí» en la votació de conjunt final del Congrés (33 sí). Es va publicar com a Llei orgànica 10/2022.",
        note: "Vot del grup GCUP-EC-GC (Unidas Podemos), compartit amb IU i els Comuns. La llei es va reformar el 2023 (LO 4/2023) a proposta del PSOE; aquesta reforma no forma part d'aquesta entrada.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Lei de liberdade sexual («só si é si»)",
        summary: "O Ministerio de Igualdade (Irene Montero, de Podemos) impulsou o proxecto de lei orgánica de garantía integral da liberdade sexual. O grupo GCUP-EC-GC votou «si» na votación de conxunto final do Congreso (33 si). Publicouse como Lei orgánica 10/2022.",
        note: "Voto do grupo GCUP-EC-GC (Unidas Podemos), compartido con IU e os Comuns. A lei reformouse en 2023 (LO 4/2023) por proposta do PSOE; esa reforma non forma parte desta entrada.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "Sexu-askatasunaren legea («baietza bakarrik da baietza»)",
        summary: "Berdintasun Ministerioak (Irene Montero, Podemos) bultzatu zuen sexu-askatasunaren berme osoari buruzko lege organikoaren proiektua. GCUP-EC-GC taldeak «bai» bozkatu zuen Kongresuko azken bozketa osoan (33 bai). 10/2022 Lege Organiko gisa argitaratu zen.",
        note: "GCUP-EC-GC taldearen botoa (Unidas Podemos), IUrekin eta Comunsekin partekatua. Legea 2023an aldatu zen (4/2023 LO), PSOEk proposatuta; erreforma hori ez dago sarrera honetan.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-ley-trans-2022",
    partyId: "podemos",
    topic: "Ley trans y LGTBI",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "aprobaremos dos leyes: […] y otra, una ley integral sobre la protección jurídica de las personas trans y el derecho a la libre determinación de la identidad sexual, identidad de género o expresión de género",
      source: { ...PROGRAMA, page: "p. 28 (medida 58)" },
    },
    did: {
      date: "2022-12-22",
      summary:
        "El Ministerio de Igualdad (Irene Montero, de Podemos) impulsó el proyecto de Ley para la igualdad real y efectiva de las personas trans y para la garantía de los derechos de las personas LGTBI. El grupo GCUP-EC-GC votó «sí» al dictamen en el Congreso (32 sí, 1 no vota). Se publicó como Ley 4/2023.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 229,
          date: "2022-12-22",
          number: 371,
          title:
            "Votación del dictamen del Proyecto de Ley para la igualdad real y efectiva de las personas trans y para la garantía de los derechos de las personas LGTBI.",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion229/20221222/Votacion371/VOT_20230302133947.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-5366",
          title:
            "Ley 4/2023, de 28 de febrero, para la igualdad real y efectiva de las personas trans y para la garantía de los derechos de las personas LGTBI.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-5366",
          date: "2023-03-01",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "El programa hablaba de dos leyes (una LGTBI y otra trans); se aprobó una sola que reúne ambas materias. Voto del grupo GCUP-EC-GC, compartido con IU y los Comuns.",
    i18n: {
      ca: {
        topic: "Llei trans i LGTBI",
        summary: "El Ministeri d'Igualtat (Irene Montero, de Podemos) va impulsar el projecte de llei per a la igualtat real i efectiva de les persones trans i per a la garantia dels drets de les persones LGTBI. El grup GCUP-EC-GC va votar «sí» al dictamen al Congrés (32 sí, 1 no vota). Es va publicar com a Llei 4/2023.",
        note: "El programa parlava de dues lleis (una LGTBI i una altra de trans); se'n va aprovar una de sola que reuneix totes dues matèries. Vot del grup GCUP-EC-GC, compartit amb IU i els Comuns.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Lei trans e LGTBI",
        summary: "O Ministerio de Igualdade (Irene Montero, de Podemos) impulsou o proxecto de lei para a igualdade real e efectiva das persoas trans e para a garantía dos dereitos das persoas LGTBI. O grupo GCUP-EC-GC votou «si» ao ditame no Congreso (32 si, 1 non vota). Publicouse como Lei 4/2023.",
        note: "O programa falaba de dúas leis (unha LGTBI e outra trans); aprobouse unha soa que reúne ambas as materias. Voto do grupo GCUP-EC-GC, compartido con IU e os Comuns.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "Trans eta LGTBI legea",
        summary: "Berdintasun Ministerioak (Irene Montero, Podemos) bultzatu zuen pertsona transen berdintasun erreal eta eraginkorrerako eta LGTBI pertsonen eskubideak bermatzeko lege-proiektua. GCUP-EC-GC taldeak «bai» bozkatu zuen Kongresuko irizpenean (32 bai, 1ek ez zuen bozkatu). 4/2023 Lege gisa argitaratu zen.",
        note: "Programak bi legeri buruz hitz egiten zuen (bat LGTBI eta beste bat trans); bakar bat onartu zen, bi gaiak biltzen dituena. GCUP-EC-GC taldearen botoa, IUrekin eta Comunsekin partekatua.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-tope-alquiler-2023",
    partyId: "podemos",
    questionId: "vivienda-tope-alquiler",
    topic: "Control de precios del alquiler",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "Intervenir el mercado del alquiler para impedir subidas abusivas mediante el control de precios y garantizar un alquiler estable y seguro para personas inquilinas y pequeñas propietarias.",
      source: { ...PROGRAMA, page: "p. 90 (medida 203)" },
    },
    did: {
      date: "2023-04-27",
      summary:
        "El grupo GCUP-EC-GC votó «sí» al dictamen del Proyecto de Ley por el derecho a la vivienda (33 sí). La Ley 12/2023 permite declarar zonas de mercado residencial tensionado y, en ellas, limita la renta de los nuevos contratos a la del contrato anterior (modificación del artículo 17 de la Ley de Arrendamientos Urbanos).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 256,
          date: "2023-04-27",
          number: 173,
          title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-12203",
          title: "Ley 12/2023, de 24 de mayo, por el derecho a la vivienda.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12203",
          date: "2023-05-25",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "La medida 203 añadía habilitar a los ayuntamientos; en la Ley 12/2023 la declaración de zona tensionada corresponde a la Administración competente en vivienda. Voto del grupo GCUP-EC-GC, compartido con IU y los Comuns.",
    i18n: {
      ca: {
        topic: "Control de preus del lloguer",
        summary: "El grup GCUP-EC-GC va votar «sí» al dictamen del projecte de llei pel dret a l'habitatge (33 sí). La Llei 12/2023 permet declarar zones de mercat residencial tensionat i, en aquestes zones, limita la renda dels contractes nous a la del contracte anterior (modificació de l'article 17 de la Llei d'arrendaments urbans).",
        note: "La mesura 203 afegia habilitar els ajuntaments; en la Llei 12/2023 la declaració de zona tensionada correspon a l'Administració competent en habitatge. Vot del grup GCUP-EC-GC, compartit amb IU i els Comuns.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Control de prezos do aluguer",
        summary: "O grupo GCUP-EC-GC votou «si» ao ditame do proxecto de lei polo dereito á vivenda (33 si). A Lei 12/2023 permite declarar zonas de mercado residencial tensionado e, nelas, limita a renda dos novos contratos á do contrato anterior (modificación do artigo 17 da Lei de arrendamentos urbanos).",
        note: "A medida 203 engadía habilitar os concellos; na Lei 12/2023 a declaración de zona tensionada correspóndelle á Administración competente en vivenda. Voto do grupo GCUP-EC-GC, compartido con IU e os Comuns.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "Alokairuaren prezioen kontrola",
        summary: "GCUP-EC-GC taldeak «bai» bozkatu zuen etxebizitzarako eskubideari buruzko lege-proiektuaren irizpenean (33 bai). 12/2023 Legeak bizitegi-merkatu tentsionatuko eremuak deklaratzea ahalbidetzen du, eta, eremu horietan, kontratu berrien errenta aurreko kontratuarenera mugatzen du (Hiri Errentamenduen Legearen 17. artikuluaren aldaketa).",
        note: "203. neurriak udalak gaitzea gehitzen zuen; 12/2023 Legean, eremu tentsionatuaren deklarazioa etxebizitzan eskumena duen Administrazioari dagokio. GCUP-EC-GC taldearen botoa, IUrekin eta Comunsekin partekatua.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-pensiones-ipc-2021",
    partyId: "podemos",
    topic: "Revalorización de las pensiones con el IPC y factor de sostenibilidad",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "Estableceremos la actualización por ley de las pensiones al IPC de manera inmediata […] Derogar el mal llamado factor de sostenibilidad",
      source: { ...PROGRAMA, page: "p. 83 (medidas 194 y 195)" },
    },
    did: {
      date: "2021-12-02",
      summary:
        "El grupo GCUP-EC-GC votó «sí» al dictamen del Proyecto de Ley de garantía del poder adquisitivo de las pensiones (29 sí, 1 abstención, 4 no votan). La Ley 21/2021 revaloriza las pensiones cada año con la media del IPC de los doce meses previos a diciembre y deroga el artículo 211 de la Ley General de la Seguridad Social (factor de sostenibilidad).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 138,
          date: "2021-12-02",
          number: 83,
          title:
            "Proyecto de Ley de garantía del poder adquisitivo de las pensiones y de otras medidas de refuerzo de la sostenibilidad financiera y social del sistema público de pensiones. Votación del Dictamen de la Comisión.",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion138/20211202/Votacion083/VOT_20230303120316.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-21652",
          title:
            "Ley 21/2021, de 28 de diciembre, de garantía del poder adquisitivo de las pensiones y de otras medidas de refuerzo de la sostenibilidad financiera y social del sistema público de pensiones.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-21652",
          date: "2021-12-29",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "La ley sustituye el factor de sostenibilidad por un «mecanismo de equidad intergeneracional». La medida 194 añadía «buscaremos blindar esta garantía constitucionalizándola»; no ha habido reforma constitucional en ese sentido. Voto del grupo GCUP-EC-GC, compartido con IU y los Comuns.",
    i18n: {
      ca: {
        topic: "Revaloració de les pensions amb l'IPC i factor de sostenibilitat",
        summary: "El grup GCUP-EC-GC va votar «sí» al dictamen del projecte de llei de garantia del poder adquisitiu de les pensions (29 sí, 1 abstenció, 4 no voten). La Llei 21/2021 revalora les pensions cada any amb la mitjana de l'IPC dels dotze mesos anteriors a desembre i deroga l'article 211 de la Llei general de la Seguretat Social (factor de sostenibilitat).",
        note: "La llei substitueix el factor de sostenibilitat per un «mecanisme d'equitat intergeneracional». La mesura 194 afegia «buscaremos blindar esta garantía constitucionalizándola»; no hi ha hagut cap reforma constitucional en aquest sentit. Vot del grup GCUP-EC-GC, compartit amb IU i els Comuns.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Revalorización das pensións co IPC e factor de sustentabilidade",
        summary: "O grupo GCUP-EC-GC votou «si» ao ditame do proxecto de lei de garantía do poder adquisitivo das pensións (29 si, 1 abstención, 4 non votan). A Lei 21/2021 revaloriza as pensións cada ano coa media do IPC dos doce meses anteriores a decembro e derroga o artigo 211 da Lei xeral da Seguridade Social (factor de sustentabilidade).",
        note: "A lei substitúe o factor de sustentabilidade por un «mecanismo de equidade interxeracional». A medida 194 engadía «buscaremos blindar esta garantía constitucionalizándola»; non houbo reforma constitucional nese sentido. Voto do grupo GCUP-EC-GC, compartido con IU e os Comuns.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "Pentsioak KPIaren arabera eguneratzea eta iraunkortasun-faktorea",
        summary: "GCUP-EC-GC taldeak «bai» bozkatu zuen pentsioen erosahalmena bermatzeko lege-proiektuaren irizpenean (29 bai, abstentzio 1, 4k ez zuten bozkatu). 21/2021 Legeak urtero eguneratzen ditu pentsioak, abenduaren aurreko hamabi hilabeteetako KPIaren batez bestekoarekin, eta Gizarte Segurantzaren Lege Orokorraren 211. artikulua indargabetzen du (iraunkortasun-faktorea).",
        note: "Legeak iraunkortasun-faktorearen ordez «belaunaldien arteko ekitate-mekanismoa» ezartzen du. 194. neurriak hau gehitzen zuen: «buscaremos blindar esta garantía constitucionalizándola»; ez da izan norabide horretako konstituzio-erreformarik. GCUP-EC-GC taldearen botoa, IUrekin eta Comunsekin partekatua.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-reforma-laboral-2022",
    partyId: "podemos",
    topic: "Derogación de las reformas laborales de 2010 y 2012",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "Derogar la reforma laboral de Zapatero de 2010 y la de Rajoy de 2012.",
      source: { ...PROGRAMA, page: "p. 74 (medida 161)" },
    },
    did: {
      date: "2022-02-03",
      summary:
        "El Gobierno de coalición aprobó el Real Decreto-ley 32/2021, que modifica, entre otros, los artículos 11, 12, 15, 16, 42, 47, 84.2 y 86 del Estatuto de los Trabajadores. El grupo GCUP-EC-GC votó «sí» a su convalidación (34 sí; resultado 175–174).",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 149,
          date: "2022-02-03",
          number: 20,
          title:
            "Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral, la garantía de la estabilidad en el empleo y la transformación del mercado de trabajo.",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion149/20220203/Votacion020/VOT_20230303100559.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-21788",
          title:
            "Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral, la garantía de la estabilidad en el empleo y la transformación del mercado de trabajo.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-21788",
          date: "2021-12-30",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "El decreto cambia la contratación temporal, recupera la ultraactividad de los convenios (art. 86) y limita la prioridad del convenio de empresa (art. 84.2), pero no deroga las reformas de 2010 y 2012: no modifica, por ejemplo, el artículo 56 del Estatuto (indemnización por despido improcedente) ni el 52 (despido objetivo). Voto del grupo GCUP-EC-GC, compartido con IU y los Comuns.",
    i18n: {
      ca: {
        topic: "Derogació de les reformes laborals del 2010 i el 2012",
        summary: "El Govern de coalició va aprovar el Reial decret llei 32/2021, que modifica, entre d'altres, els articles 11, 12, 15, 16, 42, 47, 84.2 i 86 de l'Estatut dels Treballadors. El grup GCUP-EC-GC va votar «sí» a la convalidació (34 sí; resultat 175–174).",
        note: "El decret canvia la contractació temporal, recupera la ultraactivitat dels convenis (art. 86) i limita la prioritat del conveni d'empresa (art. 84.2), però no deroga les reformes del 2010 i el 2012: no modifica, per exemple, l'article 56 de l'Estatut (indemnització per acomiadament improcedent) ni el 52 (acomiadament objectiu). Vot del grup GCUP-EC-GC, compartit amb IU i els Comuns.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Derrogación das reformas laborais de 2010 e 2012",
        summary: "O Goberno de coalición aprobou o Real decreto-lei 32/2021, que modifica, entre outros, os artigos 11, 12, 15, 16, 42, 47, 84.2 e 86 do Estatuto dos Traballadores. O grupo GCUP-EC-GC votou «si» á súa convalidación (34 si; resultado 175–174).",
        note: "O decreto cambia a contratación temporal, recupera a ultraactividade dos convenios (art. 86) e limita a prioridade do convenio de empresa (art. 84.2), pero non derroga as reformas de 2010 e 2012: non modifica, por exemplo, o artigo 56 do Estatuto (indemnización por despedimento improcedente) nin o 52 (despedimento obxectivo). Voto do grupo GCUP-EC-GC, compartido con IU e os Comuns.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "2010eko eta 2012ko lan-erreformak indargabetzea",
        summary: "Koalizio-Gobernuak 32/2021 Errege Lege-dekretua onartu zuen; besteak beste, Langileen Estatutuaren 11., 12., 15., 16., 42., 47., 84.2 eta 86. artikuluak aldatzen ditu. GCUP-EC-GC taldeak «bai» bozkatu zuen baliozkotzean (34 bai; emaitza 175–174).",
        note: "Dekretuak aldi baterako kontratazioa aldatzen du, hitzarmenen ultraaktibitatea berreskuratzen du (86. art.) eta enpresa-hitzarmenaren lehentasuna mugatzen du (84.2 art.), baina ez ditu 2010eko eta 2012ko erreformak indargabetzen: ez du aldatzen, adibidez, Estatutuaren 56. artikulua (bidegabeko kaleratzeagatiko kalte-ordaina) ezta 52.a ere (kaleratze objektiboa). GCUP-EC-GC taldearen botoa, IUrekin eta Comunsekin partekatua.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-grandes-fortunas-2022",
    partyId: "podemos",
    questionId: "impuesto-grandes-fortunas",
    topic: "Impuesto a las grandes fortunas",
    said: {
      speaker: PROGRAMA_SPEAKER,
      role: PROGRAMA_ROLE,
      date: PROGRAMA_DATE,
      text: "Crear un impuesto para las grandes fortunas, con el fin de recaudar un 1 % del PIB de patrimonios superiores a un millón de euros, y de forma progresiva.",
      source: { ...PROGRAMA, page: "p. 109 (medida 261)" },
    },
    did: {
      date: "2022-11-24",
      summary:
        "El Congreso aprobó por llamamiento (186 sí, 152 no, 10 abstenciones), con el voto «sí» de los diputados de Podemos, el dictamen de la proposición de ley (expediente 122/000247) que crea el Impuesto Temporal de Solidaridad de las Grandes Fortunas. La Ley 38/2022 grava, con tipos del 1,7 %, 2,1 % y 3,5 %, los patrimonios netos de más de 3.000.000 de euros durante dos ejercicios, y permite deducir la cuota pagada del Impuesto sobre el Patrimonio.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2022-22684",
          title:
            "Ley 38/2022, de 27 de diciembre, para el establecimiento de gravámenes temporales energético y de entidades de crédito y establecimientos financieros de crédito y por la que se crea el impuesto temporal de solidaridad de las grandes fortunas, y se modifican determinadas normas tributarias.",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-22684",
          date: "2022-12-28",
          role: "apoyo",
        },
      ],
    },
    verdict: "parcial",
    note: "La votación del dictamen (24-11-2022) fue pública por llamamiento y no tiene JSON en los datos abiertos; consta en el Diario de Sesiones, XIV, núm. 226, pp. 65-69 (https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-226.PDF), con Belarra, Montero y Echenique entre los «sí». Diferencias con la medida 261: umbral de 3 millones (no 1), tipos menores (el programa pedía del 2 % al 3,5 %), carácter temporal y complementario del Impuesto sobre el Patrimonio en vez de sustituirlo.",
    i18n: {
      ca: {
        topic: "Impost a les grans fortunes",
        summary: "El Congrés va aprovar per crida (186 sí, 152 no, 10 abstencions), amb el vot «sí» dels diputats de Podemos, el dictamen de la proposició de llei (expedient 122/000247) que crea l'Impost temporal de solidaritat de les grans fortunes. La Llei 38/2022 grava, amb tipus de l'1,7 %, el 2,1 % i el 3,5 %, els patrimonis nets de més de 3.000.000 d'euros durant dos exercicis, i permet deduir la quota pagada de l'Impost sobre el patrimoni.",
        note: "La votació del dictamen (24-11-2022) va ser pública per crida i no té JSON a les dades obertes; consta al Diari de Sessions, XIV, núm. 226, pp. 65-69 (https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-226.PDF), amb Belarra, Montero i Echenique entre els «sí». Diferències amb la mesura 261: llindar de 3 milions (no 1), tipus més baixos (el programa demanava del 2 % al 3,5 %), caràcter temporal i complementari de l'Impost sobre el patrimoni en lloc de substituir-lo.",
        role: PROGRAMA_ROLE_I18N.ca,
      },
      gl: {
        topic: "Imposto ás grandes fortunas",
        summary: "O Congreso aprobou por chamamento (186 si, 152 non, 10 abstencións), co voto «si» dos deputados de Podemos, o ditame da proposición de lei (expediente 122/000247) que crea o Imposto temporal de solidariedade das grandes fortunas. A Lei 38/2022 grava, con tipos do 1,7 %, 2,1 % e 3,5 %, os patrimonios netos de máis de 3.000.000 de euros durante dous exercicios, e permite deducir a cota pagada do Imposto sobre o patrimonio.",
        note: "A votación do ditame (24-11-2022) foi pública por chamamento e non ten JSON nos datos abertos; consta no Diario de Sesións, XIV, núm. 226, pp. 65-69 (https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-226.PDF), con Belarra, Montero e Echenique entre os «si». Diferenzas coa medida 261: limiar de 3 millóns (non 1), tipos menores (o programa pedía do 2 % ao 3,5 %), carácter temporal e complementario do Imposto sobre o patrimonio en vez de substituílo.",
        role: PROGRAMA_ROLE_I18N.gl,
      },
      eu: {
        topic: "Aberastasun handien gaineko zerga",
        summary: "Kongresuak deialdi bidezko bozketa publikoan onartu zuen (186 bai, 152 ez, 10 abstentzio), Podemoseko diputatuen «bai» botoarekin, Aberastasun Handien Elkartasunerako Aldi Baterako Zerga sortzen duen lege-proposamenaren irizpena (122/000247 espedientea). 38/2022 Legeak % 1,7, % 2,1 eta % 3,5eko tasekin zergapetzen ditu 3.000.000 eurotik gorako ondare garbiak bi ekitalditan, eta Ondarearen gaineko Zergan ordaindutako kuota kentzeko aukera ematen du.",
        note: "Irizpenaren bozketa (2022-11-24) deialdi bidezko bozketa publikoa izan zen, eta ez du JSONik datu irekietan; Bilkuren Egunkarian jasota dago, XIV, 226. zk., 65-69 or. (https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-226.PDF), eta Belarra, Montero eta Echenique «bai»-en artean daude. 261. neurriarekiko aldeak: 3 milioiko atalasea (ez 1), tasa txikiagoak (programak % 2tik % 3,5era eskatzen zuen), aldi baterakoa eta Ondarearen gaineko Zergaren osagarria, hura ordeztu beharrean.",
        role: PROGRAMA_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-ley-mordaza-2019",
    partyId: "podemos",
    topic: "Sustituir la Ley de Seguridad Ciudadana («ley mordaza»)",
    said: {
      speaker: "Pablo Iglesias Turrión (Unidas Podemos) y Pedro Sánchez Pérez-Castejón (PSOE)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Aprobaremos una nueva Ley de seguridad ciudadana, que sustituya a la “Ley mordaza\" para garantizar el ejercicio del derecho a la libertad de expresión y reunión pacífica. Esta nueva legislación, que verá la luz a la mayor brevedad, estará basada en una concepción progresista de la seguridad ciudadana",
      source: {
        url: "https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
        title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 5.6",
        date: "2019-12-30",
        page: "p. 31 (p. 32 del PDF)",
        archiveUrl:
          "https://web.archive.org/web/20200113183843/https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
        kind: "partido",
      },
    },
    did: {
      date: "2023-05-30",
      summary:
        "El Gobierno de coalición, con ministros de Podemos, no aprobó ningún proyecto de ley de seguridad ciudadana en la XIV. La proposición de ley del PNV que se tramitaba decayó al rechazar la Comisión de Interior su dictamen (14-3-2023), y la legislatura terminó con la disolución de las Cortes (30-5-2023). La Ley Orgánica 4/2015 sigue vigente.",
      evidence: [
        {
          kind: "iniciativa",
          title: "Proposición de Ley Orgánica de reforma de la Ley Orgánica 4/2015, de protección de la seguridad ciudadana (122/000003, XIV, Grupo Vasco EAJ-PNV)",
          url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=122/000003",
          status: "Rechazado: la Comisión de Interior rechazó el dictamen (18 a favor, 19 en contra)",
          date: "2023-03-14",
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-12663",
          title: "Real Decreto 400/2023, de 29 de mayo, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12663",
          date: "2023-05-30",
          role: "gobierno",
        },
      ],
    },
    verdict: "no-hecho",
    note:
      "Podía hacerlo: Unidas Podemos firmó el compromiso en el acuerdo de coalición y Podemos tuvo una vicepresidencia y ministerios en el Gobierno toda la XIV (el Gobierno podía remitir un proyecto de ley). El voto por grupo del dictamen de 2023 en Comisión no está en datos abiertos; solo el resultado (DSCD-14-CO-864, p. 36). En la XV, ya fuera del Gobierno, Podemos votó sí a la toma en consideración de la proposición 122/000131 (29-10-2024).",
    i18n: {
      ca: {
        topic: "Substituir la Llei de seguretat ciutadana («llei mordassa»)",
        summary: "El Govern de coalició, amb ministres de Podemos, no va aprovar cap projecte de llei de seguretat ciutadana durant la XIV. La proposició de llei del PNV que es tramitava va decaure quan la Comissió d'Interior en va rebutjar el dictamen (14-3-2023), i la legislatura va acabar amb la dissolució de les Corts (30-5-2023). La Llei orgànica 4/2015 continua vigent.",
        note: "Podia fer-ho: Unidas Podemos va signar el compromís a l'acord de coalició i Podemos va tenir una vicepresidència i ministeris al Govern durant tota la XIV (el Govern podia remetre un projecte de llei). El vot per grup del dictamen del 2023 en comissió no és a les dades obertes; només el resultat (DSCD-14-CO-864, p. 36). A la XV, ja fora del Govern, Podemos va votar sí a la presa en consideració de la proposició 122/000131 (29-10-2024).",
        role: COALICION_ROLE_I18N.ca,
      },
      gl: {
        topic: "Substituír a Lei de seguridade cidadá («lei mordaza»)",
        summary: "O Goberno de coalición, con ministros de Podemos, non aprobou ningún proxecto de lei de seguridade cidadá na XIV. A proposición de lei do PNV que se tramitaba decaeu ao rexeitar a Comisión de Interior o seu ditame (14-3-2023), e a lexislatura rematou coa disolución das Cortes (30-5-2023). A Lei orgánica 4/2015 segue vixente.",
        note: "Podía facelo: Unidas Podemos asinou o compromiso no acordo de coalición e Podemos tivo unha vicepresidencia e ministerios no Goberno durante toda a XIV (o Goberno podía remitir un proxecto de lei). O voto por grupo do ditame de 2023 en comisión non está nos datos abertos; só o resultado (DSCD-14-CO-864, p. 36). Na XV, xa fóra do Goberno, Podemos votou si á toma en consideración da proposición 122/000131 (29-10-2024).",
        role: COALICION_ROLE_I18N.gl,
      },
      eu: {
        topic: "Herritarren Segurtasunerako Legea («mozal-legea») ordeztea",
        summary: "Koalizio-Gobernuak, Podemoseko ministroekin, ez zuen herritarren segurtasunari buruzko lege-proiekturik onartu XIV. legealdian. Izapidetzen ari zen PNVren lege-proposamena iraungi egin zen Barne Batzordeak haren irizpena baztertu zuenean (2023-3-14), eta legealdia Gorteak desegitearekin amaitu zen (2023-5-30). 4/2015 Lege Organikoak indarrean jarraitzen du.",
        note: "Egin zezakeen: Unidas Podemosek koalizio-akordioan sinatu zuen konpromisoa, eta Podemosek presidenteordetza bat eta ministerioak izan zituen Gobernuan XIV. legealdi osoan (Gobernuak lege-proiektu bat bidal zezakeen). 2023ko irizpenaren talde bakoitzeko botoa Batzordean ez dago datu irekietan; emaitza bakarrik (DSCD-14-CO-864, 36. or.). XV. legealdian, Gobernutik kanpo zegoela, Podemosek baiezkoa bozkatu zuen 122/000131 proposamena aintzat hartzeko bozketan (2024-10-29).",
        role: COALICION_ROLE_I18N.eu,
      },
    },
  },
  {
    id: "podemos-presupuesto-vivienda-2019",
    partyId: "podemos",
    topic: "Vivienda",
    said: {
      speaker: "Pablo Iglesias Turrión (Unidas Podemos) y Pedro Sánchez Pérez-Castejón (PSOE)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Impulsaremos la política de Vivienda con un incremento en la dotación de recursos. […] Para combatir esta situación se propone ampliar progresivamente el presupuesto actual en materia de Vivienda.",
      source: { ...ACUERDO_2019, page: "p. 17 (p. 18 del PDF)" },
    },
    did: {
      date: "2022-12-24",
      summary:
        "El programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») pasó de 450,7 millones de euros en el presupuesto prorrogado de 2019 a 570,8 en los PGE de 2021, 771,5 en los de 2022 y 959,5 en los de 2023 (créditos iniciales). Además, desde 2021 los PGE incluyen programas de vivienda financiados por el Mecanismo de Recuperación y Resiliencia. Según la liquidación del presupuesto de la IGAE, el gasto realmente reconocido en la política de vivienda subió de 411,5 millones de euros en 2019 a 2.487,9 millones en 2023, aunque ese año solo se ejecutó el 49,4 % de los créditos definitivos.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "PGE 2019 prorrogado — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2019Prorroga", "L_19P_E_G7.PDF"),
          date: "2019-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 450.652,67 miles de euros (p. 77 del PDF)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2021 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2021Ley", "L_21_E_G7.PDF"),
          date: "2021-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 570.768,27 miles de euros; programa 260A (Mecanismo de Recuperación y Resiliencia): 1.651.000,00 miles de euros (p. 91 del PDF)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2022 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2022Ley", "L_22_E_G7.PDF"),
          date: "2022-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 771.485,51 miles de euros; 26BA (C02.I01): 1.389.000,00; 26BB (C02.I02): 500.000,00 (p. 112 del PDF)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2023 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2023Ley", "L_23_E_G7.PDF"),
          date: "2023-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 959.526,75 miles de euros; 26BA (C02.I01): 1.980.000,00; 26BB (C02.I02): 500.000,00 (p. 112 del PDF)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Liquidación del Presupuesto del Estado 2019, política de gasto 26 «Acceso a la vivienda y fomento de la edificación» (pp. 40 y 44)",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadPublica/CPE/EjecucionPresupuestaria/Documents/LIQUIDACION%20ESTADO_2019%20(INTERNET).pdf",
          date: "2019-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Créditos definitivos: 534.685 miles de euros; obligaciones reconocidas: 411.481 miles (77,0 %)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Liquidación del Presupuesto del Estado 2023, política de gasto 26 «Acceso a la vivienda y fomento de la edificación» (pp. 41 y 46)",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadPublica/CPE/EjecucionPresupuestaria/Documents/LIQUIDACION%20ESTADO_2023%20(INTERNET).pdf",
          date: "2023-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Créditos definitivos: 5.033.525 miles de euros; obligaciones reconocidas: 2.487.911 miles (49,4 %)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Tribunal de Cuentas — Informe de fiscalización n.º 1.673, sobre el grado de ejecución de los programas de gasto del Plan de Recuperación del área de gasto 2, ejercicios 2022 y 2023 (pp. 39–41 impresas)",
          url: "https://www.congreso.es/docu/inf_fiscTC/LegXV/251-211.pdf",
          date: "2026-03-25",
          publisher: "Tribunal de Cuentas",
          value: "Programa 26BB (viviendas de alquiler social del Plan de Recuperación), 2023: 500 millones de crédito inicial y 294,8 millones de obligaciones; «sin que se haya aportado ninguna información por parte del Ministerio sobre su grado de ejecución»",
          sourceType: "independiente",
        },
      ],
    },
    verdict: "cumple",
    note:
      "Se comparan créditos iniciales del mismo programa presupuestario (261N), no gasto ejecutado: la ejecución no se ha contrastado. El presupuesto de 2019 era el de 2018 prorrogado (aprobado con el Gobierno del PP). La comparación llega a los PGE de 2023 (Ley 31/2022, BOE de 24-12-2022, fecha que se toma como la del hecho); los ejercicios posteriores no se han contrastado. Unidas Podemos firmó el compromiso y formó parte del Gobierno que presentó los PGE de 2021, 2022 y 2023.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») va passar de 450,7 milions d'euros en el pressupost prorrogat del 2019 a 570,8 en els PGE del 2021, 771,5 en els del 2022 i 959,5 en els del 2023 (crèdits inicials). A més, des del 2021 els PGE inclouen programes d'habitatge finançats pel Mecanisme de Recuperació i Resiliència. Segons la liquidació del pressupost de la IGAE, la despesa realment reconeguda en la política d'habitatge va pujar de 411,5 milions d'euros el 2019 a 2.487,9 milions el 2023, tot i que aquell any només es va executar el 49,4 % dels crèdits definitius.",
        note: "Revisada el 2026-10-07 amb la regla d'independència de la font: es manté «compleix» perquè el compromís era augmentar la dotació i la despesa executada també va créixer (IGAE). Matís: el grau d'execució de la política d'habitatge va caure del 97,2 % el 2020 al 49,4 % el 2023 i al 32,7 % el 2024, i el Tribunal de Comptes assenyala que el 2023 el programa d'habitatges de lloguer social del Pla de Recuperació va reconèixer 294,8 dels seus 500 milions sense que el Ministeri informés del seu grau d'execució. Revisada el 2026-10-07 con la regla de independencia de la fuente: se mantiene «cumple» porque el compromiso era aumentar la dotación y el gasto ejecutado también creció (IGAE). Matiz: el grado de ejecución de la política de vivienda cayó del 97,2 % en 2020 al 49,4 % en 2023 y al 32,7 % en 2024, y el Tribunal de Cuentas señala que en 2023 el programa de viviendas de alquiler social del Plan de Recuperación reconoció 294,8 de sus 500 millones sin que el Ministerio informara de su grado de ejecución. Es comparen crèdits inicials del mateix programa pressupostari (261N), no despesa executada: l'execució no s'ha contrastat. El pressupost del 2019 era el del 2018 prorrogat (aprovat amb el Govern del PP). La comparació arriba als PGE del 2023 (Llei 31/2022, BOE de 24-12-2022, data que es pren com la del fet); els exercicis posteriors no s'han contrastat. Unidas Podemos va signar el compromís i va formar part del Govern que va presentar els PGE del 2021, el 2022 i el 2023.",
        role: COALICION_ROLE_I18N.ca,
      },
      gl: {
        topic: "Vivenda",
        summary: "O programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») pasou de 450,7 millóns de euros no orzamento prorrogado de 2019 a 570,8 nos PGE de 2021, 771,5 nos de 2022 e 959,5 nos de 2023 (créditos iniciais). Ademais, desde 2021 os PGE inclúen programas de vivenda financiados polo Mecanismo de Recuperación e Resiliencia. Segundo a liquidación do orzamento da IGAE, o gasto realmente recoñecido na política de vivenda subiu de 411,5 millóns de euros en 2019 a 2.487,9 millóns en 2023, aínda que ese ano só se executou o 49,4 % dos créditos definitivos.",
        note: "Revisada o 2026-10-07 coa regra de independencia da fonte: mantense «cumpre» porque o compromiso era aumentar a dotación e o gasto executado tamén medrou (IGAE). Matiz: o grao de execución da política de vivenda caeu do 97,2 % en 2020 ao 49,4 % en 2023 e ao 32,7 % en 2024, e o Tribunal de Contas sinala que en 2023 o programa de vivendas de alugamento social do Plan de Recuperación recoñeceu 294,8 dos seus 500 millóns sen que o Ministerio informase do seu grao de execución. Compáranse créditos iniciais do mesmo programa orzamentario (261N), non gasto executado: a execución non se contrastou. O orzamento de 2019 era o de 2018 prorrogado (aprobado co Goberno do PP). A comparación chega aos PGE de 2023 (Lei 31/2022, BOE do 24-12-2022, data que se toma como a do feito); os exercicios posteriores non se contrastaron. Unidas Podemos asinou o compromiso e formou parte do Goberno que presentou os PGE de 2021, 2022 e 2023.",
        role: COALICION_ROLE_I18N.gl,
      },
      eu: {
        topic: "Etxebizitza",
        summary: "261N programa («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») 2019ko aurrekontu luzatuko 450,7 milioi eurotik 2021eko PGEetako 570,8ra, 2022ko 771,5era eta 2023ko 959,5era igo zen (hasierako kredituak). Gainera, 2021etik PGEek Suspertze eta Erresilientzia Mekanismoak finantzatutako etxebizitza-programak dituzte. IGAEren aurrekontu-likidazioaren arabera, etxebizitza-politikan benetan aitortutako gastua 411,5 milioi eurotik (2019) 2.487,9 milioira (2023) igo zen, nahiz eta urte horretan behin betiko kredituen % 49,4 baino ez zen gauzatu.",
        note: "2026-10-07an berrikusia, iturriaren independentziaren arauarekin: «betetzen du» mantentzen da, konpromisoa zuzkidura handitzea zelako eta gauzatutako gastua ere hazi zelako (IGAE). Ñabardura: etxebizitza-politikaren gauzatze-maila % 97,2tik (2020) % 49,4ra (2023) eta % 32,7ra (2024) jaitsi zen, eta Kontuen Auzitegiak dio 2023an Suspertze Planeko alokairu sozialeko etxebizitzen programak bere 500 milioietatik 294,8 aitortu zituela, Ministerioak haren gauzatze-mailari buruzko informaziorik eman gabe. Aurrekontu-programa bereko (261N) hasierako kredituak alderatzen dira, ez gauzatutako gastua: gauzatzea ez da egiaztatu. 2019ko aurrekontua 2018koa zen, luzatua (PPren Gobernuarekin onartua). Alderaketa 2023ko PGEetaraino iristen da (31/2022 Legea, 2022-12-24ko BOE, egitatearen datatzat hartzen dena); ondorengo ekitaldiak ez dira egiaztatu. Unidas Podemosek sinatu zuen konpromisoa, eta 2021eko, 2022ko eta 2023ko PGEak aurkeztu zituen Gobernuko kide izan zen.",
        role: COALICION_ROLE_I18N.eu,
      },
    },
  },
];
