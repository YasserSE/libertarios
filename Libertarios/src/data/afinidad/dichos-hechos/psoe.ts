import type { SaidVsDid } from "../types";

/**
 * «Dijeron vs. hicieron» del PSOE. No puntúa nunca.
 *
 * Criterio de selección (el mismo para todos los partidos): compromisos
 * explícitos y muy difundidos del partido o su líder, cumplidos e incumplidos,
 * cada uno con un hecho posterior verificable en fuente primaria.
 *
 * Comprobado el 2026-10-06:
 * - Citas copiadas literalmente del Diario de Sesiones (PDF oficial; `page` es
 *   la página impresa, que en este Diario coincide con la del PDF), de las
 *   transcripciones oficiales de La Moncloa y del acuerdo de coalición firmado
 *   (copia de psoe.es en archive.org: psoe.es bloquea la descarga directa).
 * - Votos recontados con `npm run afinidad:vote` sobre el JSON de congreso.es.
 * - Referencias BOE comprobadas con el XML de boe.es (título y fecha).
 */

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

const INVESTIDURA_2020 = {
  url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-2-C1.PDF",
  title:
    "Diario de Sesiones del Congreso de los Diputados, Pleno, XIV legislatura, núm. 2 (4-1-2020): debate de investidura, discurso del candidato",
  date: "2020-01-04",
  kind: "diario-sesiones" as const,
};
const SANCHEZ = "Pedro Sánchez Pérez-Castejón";

// ─── Vivienda (añadido el 2026-10-07) ─────────────────────────────────────
// Promesas de vivienda con cifra o plazo, contrastadas con datos oficiales
// (Ministerio de Vivienda, BOE, Presupuestos Generales del Estado). Mismo
// criterio que para el PP (2011–2018) y para los socios de coalición.

const INVESTIDURA_2023 = {
  url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-7.PDF",
  title:
    "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, núm. 7 (15-11-2023): debate de investidura, discurso del candidato",
  date: "2023-11-15",
  kind: "diario-sesiones" as const,
};
const ACUERDO_2019 = {
  url: "https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
  title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 2.9.1",
  date: "2019-12-30",
  archiveUrl:
    "https://web.archive.org/web/20200113183843/https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
  kind: "partido" as const,
};
const ACUERDO_2023 = {
  url: "https://movimientosumar.es/wp-content/uploads/2023/10/ACUERDO_GOBIERNO_COALICION_2023-DEF.pdf",
  title: "PSOE y SUMAR — Acuerdo de Gobierno de coalición progresista «España avanza» (24-10-2023), apartado 5",
  date: "2023-10-24",
  archiveUrl:
    "https://web.archive.org/web/20240809081819/https://movimientosumar.es/wp-content/uploads/2023/10/ACUERDO_GOBIERNO_COALICION_2023-DEF.pdf",
  kind: "partido" as const,
};
const ACUERDO_2023_SPEAKER = "PSOE y SUMAR (acuerdo de coalición)";
const ACUERDO_2023_ROLE = "acuerdo programático de Gobierno firmado por ambos partidos";
const MIVAU_PVAA = "https://www.mivau.gob.es/vivienda/plan-estatal-de-vivienda/plan-vivienda-alquiler-asequible";
const PGE_TOMO_VII = (year: string, file: string) =>
  `https://www.sepg.pap.hacienda.gob.es/Presup/${year}/MaestroTomos/PGE-ROM/doc/${file}`;
const DISOLUCION_2026 = {
  kind: "boe" as const,
  reference: "BOE-A-2026-20742",
  title: "Real Decreto 806/2026, de 5 de octubre, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones",
  url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742",
  date: "2026-10-06",
  role: "gobierno" as const,
};

export const saidVsDid: SaidVsDid[] = [
  {
    id: "psoe-amnistia-2022",
    partyId: "psoe",
    questionId: "amnistia",
    topic: "Amnistía a los encausados por el procés",
    said: {
      speaker: SANCHEZ,
      role: "presidente del Gobierno y secretario general del PSOE (entrevista en laSexta, «Al Rojo Vivo»)",
      date: "2022-11-10",
      text: "El independentismo lo que pide, y lo saben ustedes y lo saben los telespectadores, es la amnistía. Algo que, desde luego, este gobierno no va a aceptar y que desde luego no entra en la legislación ni en la Constitución Española.",
      source: {
        url: "https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2022/221110%20TRANSCRIPCI%C3%93N%20PG%20LA%20SEXTA.pdf",
        title: "La Moncloa — Transcripción de la entrevista del presidente del Gobierno en laSexta (10-11-2022)",
        date: "2022-11-10",
        page: "p. 4",
        archiveUrl:
          "https://web.archive.org/web/20251109223924/https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2022/221110%20TRANSCRIPCI%C3%93N%20PG%20LA%20SEXTA.pdf",
        kind: "gobierno",
      },
    },
    did: {
      date: "2024-03-14",
      summary:
        "El Grupo Socialista registró la proposición de ley orgánica de amnistía y sus 120 diputados votaron a favor del dictamen el 14-3-2024. La ley se publicó como Ley Orgánica 1/2024 el 11-6-2024.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XV",
          session: 30,
          date: "2024-03-14",
          number: 1,
          title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña — votación del nuevo dictamen",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2024-11776",
          title: "Ley Orgánica 1/2024, de 10 de junio, de amnistía para la normalización institucional, política y social en Cataluña",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-11776",
          date: "2024-06-11",
          role: "apoyo",
        },
      ],
    },
    verdict: "contradice",
    note:
      "La aprobación definitiva en el Congreso (30-5-2024, tras el veto del Senado) no figura en los JSON de datos abiertos de ese día; se enlaza la votación del dictamen y el BOE. `role: apoyo` porque fue proposición del grupo parlamentario, no proyecto del Gobierno.",
    i18n: {
      ca: {
        topic: "Amnistia als encausats pel procés",
        summary: "El Grup Socialista va registrar la proposició de llei orgànica d'amnistia i els seus 120 diputats van votar a favor del dictamen el 14-3-2024. La llei es va publicar com a Llei orgànica 1/2024 l'11-6-2024.",
        note: "L'aprovació definitiva al Congrés (30-5-2024, després del veto del Senat) no figura en els JSON de dades obertes d'aquell dia; s'enllacen la votació del dictamen i el BOE. `role: apoyo` perquè va ser una proposició del grup parlamentari, no un projecte del Govern.",
        role: "president del Govern i secretari general del PSOE (entrevista a laSexta, «Al Rojo Vivo»)",
      },
      gl: {
        topic: "Amnistía para os encausados polo procés",
        summary: "O Grupo Socialista rexistrou a proposición de lei orgánica de amnistía e os seus 120 deputados votaron a favor do ditame o 14-3-2024. A lei publicouse como Lei orgánica 1/2024 o 11-6-2024.",
        note: "A aprobación definitiva no Congreso (30-5-2024, tras o veto do Senado) non figura nos JSON de datos abertos dese día; enlázanse a votación do ditame e o BOE. `role: apoyo` porque foi unha proposición do grupo parlamentario, non un proxecto do Goberno.",
        role: "presidente do Goberno e secretario xeral do PSOE (entrevista en laSexta, «Al Rojo Vivo»)",
      },
      eu: {
        topic: "Proceseko auzipetuentzako amnistia",
        summary: "Talde Sozialistak amnistiari buruzko lege organiko-proposamena erregistratu zuen, eta haren 120 diputatuek irizpenaren alde bozkatu zuten 14-3-2024an. Legea 1/2024 Lege Organiko gisa argitaratu zen 11-6-2024an.",
        note: "Kongresuko behin betiko onespena (30-5-2024, Senatuaren betoaren ondoren) ez dago egun horretako datu irekien JSONetan; irizpenaren bozketa eta BOE estekatzen dira. `role: apoyo`, talde parlamentarioaren proposamena izan zelako, ez Gobernuaren proiektua.",
        role: "Gobernuko presidentea eta PSOEko idazkari nagusia (laSextan egindako elkarrizketa, «Al Rojo Vivo»)",
      },
    },
  },
  {
    id: "psoe-indultos-proces-2019",
    partyId: "psoe",
    topic: "Indultos a los condenados por el procés",
    said: {
      speaker: SANCHEZ,
      role: "presidente del Gobierno en funciones (declaración institucional tras la sentencia del Tribunal Supremo)",
      date: "2019-10-14",
      text: "como corresponde en un Estado Social y Democrático de Derecho el acatamiento de la misma significa su cumplimiento. Reitero, significa su íntegro cumplimiento.",
      source: {
        url: "https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2019/20191014%20PG%20Declaraci%C3%B3n%20institucional%20Sentencia.pdf",
        title: "La Moncloa — Declaración institucional del presidente del Gobierno en funciones tras la sentencia del procés (14-10-2019)",
        date: "2019-10-14",
        archiveUrl:
          "https://web.archive.org/web/20261006211731/https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2019/20191014%20PG%20Declaraci%C3%B3n%20institucional%20Sentencia.pdf",
        kind: "gobierno",
      },
    },
    did: {
      date: "2021-06-22",
      summary:
        "El Consejo de Ministros aprobó nueve reales decretos (456/2021 a 464/2021) que indultan a los condenados la pena privativa de libertad pendiente de cumplimiento, con la condición de no cometer delito grave en seis años.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2021-10467",
          title: "Real Decreto 460/2021, de 22 de junio, por el que se indulta a don Oriol Junqueras i Vies",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-10467",
          date: "2021-06-23",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-10463",
          title: "Real Decreto 456/2021, de 22 de junio, por el que se indulta a doña Dolors Bassa i Coll",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-10463",
          date: "2021-06-23",
          role: "gobierno",
        },
      ],
    },
    verdict: "contradice",
    note:
      "Los nueve reales decretos son BOE-A-2021-10463 a BOE-A-2021-10471 (BOE de 23-6-2021). Indultan la prisión pendiente; no las penas de inhabilitación.",
    i18n: {
      ca: {
        topic: "Indults als condemnats pel procés",
        summary: "El Consell de Ministres va aprovar nou reials decrets (456/2021 a 464/2021) que indulten als condemnats la pena privativa de llibertat pendent de complir, amb la condició de no cometre cap delicte greu en sis anys.",
        note: "Els nou reials decrets són BOE-A-2021-10463 a BOE-A-2021-10471 (BOE del 23-6-2021). Indulten la presó pendent; no les penes d'inhabilitació.",
        role: "president del Govern en funcions (declaració institucional després de la sentència del Tribunal Suprem)",
      },
      gl: {
        topic: "Indultos aos condenados polo procés",
        summary: "O Consello de Ministros aprobou nove reais decretos (456/2021 a 464/2021) que lles indultan aos condenados a pena privativa de liberdade pendente de cumprimento, coa condición de non cometeren delito grave en seis anos.",
        note: "Os nove reais decretos son BOE-A-2021-10463 a BOE-A-2021-10471 (BOE do 23-6-2021). Indultan a prisión pendente; non as penas de inhabilitación.",
        role: "presidente do Goberno en funcións (declaración institucional tras a sentenza do Tribunal Supremo)",
      },
      eu: {
        topic: "Proceseko kondenatuentzako indultuak",
        summary: "Ministro Kontseiluak bederatzi errege-dekretu onartu zituen (456/2021etik 464/2021era); haien bidez, kondenatuei betetzeke zuten askatasun-gabetzeko zigorra indultatu zitzaien, sei urtean delitu larririk ez egiteko baldintzarekin.",
        note: "Bederatzi errege-dekretuak BOE-A-2021-10463tik BOE-A-2021-10471ra bitartekoak dira (23-6-2021eko BOE). Betetzeke zegoen espetxe-zigorra indultatzen dute; ez, ordea, gaitasungabetze-zigorrak.",
        role: "jarduneko Gobernuko presidentea (adierazpen instituzionala, Auzitegi Gorenaren epaiaren ondoren)",
      },
    },
  },
  {
    id: "psoe-reforma-laboral-2019",
    partyId: "psoe",
    topic: "Derogación de la reforma laboral de 2012",
    said: {
      speaker: "Pedro Sánchez Pérez-Castejón (PSOE) y Pablo Iglesias Turrión (Unidas Podemos)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Derogaremos la reforma laboral. Recuperaremos los derechos laborales arrebatados por la reforma laboral de 2012.",
      source: {
        url: "https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
        title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 1.3",
        date: "2019-12-30",
        page: "p. 3 (p. 4 del PDF)",
        archiveUrl:
          "https://web.archive.org/web/20200113183843/https://www.psoe.es/media-content/2019/12/30122019-Coalici%C3%B3n-progresista.pdf",
        kind: "partido",
      },
    },
    did: {
      date: "2022-02-03",
      summary:
        "El Gobierno aprobó el Real Decreto-ley 32/2021, que restablece la vigencia del convenio denunciado mientras se negocia otro (art. 86 ET) y retira el salario de la prioridad del convenio de empresa (art. 84.2 ET). El Grupo Socialista votó a favor de su convalidación. Antes, la Ley 1/2020 derogó el despido por faltas de asistencia (art. 52.d ET).",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2021-21788",
          title: "Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral, la garantía de la estabilidad en el empleo y la transformación del mercado de trabajo",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-21788",
          date: "2021-12-30",
          role: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XIV",
          session: 149,
          date: "2022-02-03",
          number: 20,
          title: "Convalidación del Real Decreto-ley 32/2021 (reforma laboral)",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion149/20220203/Votacion020/VOT_20230303100559.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2020-7937",
          title: "Ley 1/2020, de 15 de julio, por la que se deroga el despido objetivo por faltas de asistencia al trabajo establecido en el artículo 52.d) del Estatuto de los Trabajadores",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-7937",
          date: "2020-07-16",
          role: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note:
      "Se revirtieron los tres puntos que el propio acuerdo calificaba de urgentes (despido por absentismo, ultraactividad y prioridad del convenio de empresa en salario), pero la reforma de 2012 no se derogó en su conjunto: el RDL 32/2021 modifica el Estatuto de los Trabajadores y no restablece, por ejemplo, la indemnización por despido improcedente anterior a 2012.",
    i18n: {
      ca: {
        topic: "Derogació de la reforma laboral del 2012",
        summary: "El Govern va aprovar el Reial decret llei 32/2021, que restableix la vigència del conveni denunciat mentre se'n negocia un altre (art. 86 ET) i treu el salari de la prioritat del conveni d'empresa (art. 84.2 ET). El Grup Socialista va votar a favor de la seva convalidació. Abans, la Llei 1/2020 va derogar l'acomiadament per faltes d'assistència (art. 52.d ET).",
        note: "Es van revertir els tres punts que el mateix acord qualificava d'urgents (acomiadament per absentisme, ultraactivitat i prioritat del conveni d'empresa en salari), però la reforma del 2012 no es va derogar en conjunt: el RDL 32/2021 modifica l'Estatut dels Treballadors i no restableix, per exemple, la indemnització per acomiadament improcedent anterior al 2012.",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Derrogación da reforma laboral de 2012",
        summary: "O Goberno aprobou o Real decreto-lei 32/2021, que restablece a vixencia do convenio denunciado mentres se negocia outro (art. 86 ET) e retira o salario da prioridade do convenio de empresa (art. 84.2 ET). O Grupo Socialista votou a favor da súa convalidación. Antes, a Lei 1/2020 derrogou o despedimento por faltas de asistencia (art. 52.d ET).",
        note: "Revertéronse os tres puntos que o propio acordo cualificaba de urxentes (despedimento por absentismo, ultraactividade e prioridade do convenio de empresa en salario), pero a reforma de 2012 non se derrogou no seu conxunto: o RDL 32/2021 modifica o Estatuto dos Traballadores e non restablece, por exemplo, a indemnización por despedimento improcedente anterior a 2012.",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "2012ko lan-erreformaren indargabetzea",
        summary: "Gobernuak 32/2021 Errege Lege-dekretua onartu zuen: salatutako hitzarmenaren indarraldia berrezartzen du beste bat negoziatzen den bitartean (ET, 86. art.), eta soldata enpresa-hitzarmenaren lehentasunetik kentzen du (ET, 84.2 art.). Talde Sozialistak haren baliozkotzearen alde bozkatu zuen. Lehenago, 1/2020 Legeak indargabetu zuen lanera ez joateagatiko kaleratzea (ET, 52.d art.).",
        note: "Akordioak berak premiazkotzat jotzen zituen hiru puntuak desegin ziren (absentismoagatiko kaleratzea, ultraaktibitatea eta enpresa-hitzarmenaren lehentasuna soldatan), baina 2012ko erreforma ez zen osorik indargabetu: RDL 32/2021 dekretuak Langileen Estatutua aldatzen du, eta ez du berrezartzen, adibidez, 2012 aurreko bidegabeko kaleratzeagatiko kalte-ordaina.",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },
  {
    id: "psoe-smi-60-2020",
    partyId: "psoe",
    topic: "Salario mínimo al 60 % del salario medio",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2020-01-04",
      text: "gracias a ese diálogo social fijaremos el horizonte de alcanzar el objetivo de que el salario mínimo al final de la legislatura sea del 60 % del salario medio en nuestro país.",
      source: { ...INVESTIDURA_2020, page: "p. 14" },
    },
    did: {
      date: "2023-02-15",
      summary:
        "El Gobierno fijó el salario mínimo interprofesional de 2023 por Real Decreto 99/2023. Su preámbulo declara que con él «se culmina el objetivo de que el salario mínimo interprofesional alcance el 60 por ciento del salario medio en 2023».",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-3982",
          title: "Real Decreto 99/2023, de 14 de febrero, por el que se fija el salario mínimo interprofesional para 2023",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-3982",
          date: "2023-02-15",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "El 60 % es la cifra que el propio Gobierno declara en el preámbulo, con base en el informe de la Comisión Asesora para el Análisis del SMI.",
    i18n: {
      ca: {
        topic: "Salari mínim al 60 % del salari mitjà",
        summary: "El Govern va fixar el salari mínim interprofessional del 2023 pel Reial decret 99/2023. El preàmbul declara que amb aquest decret «se culmina el objetivo de que el salario mínimo interprofesional alcance el 60 por ciento del salario medio en 2023».",
        note: "El 60 % és la xifra que el mateix Govern declara al preàmbul, sobre la base de l'informe de la Comissió Assessora per a l'Anàlisi de l'SMI.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Salario mínimo ao 60 % do salario medio",
        summary: "O Goberno fixou o salario mínimo interprofesional de 2023 polo Real decreto 99/2023. O seu preámbulo declara que con el «se culmina el objetivo de que el salario mínimo interprofesional alcance el 60 por ciento del salario medio en 2023».",
        note: "O 60 % é a cifra que o propio Goberno declara no preámbulo, con base no informe da Comisión Asesora para a Análise do SMI.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Gutxieneko soldata batez besteko soldataren % 60an",
        summary: "Gobernuak 2023ko lanbide arteko gutxieneko soldata finkatu zuen 99/2023 Errege Dekretuaren bidez. Haren hitzaurreak dioenez, horrekin «se culmina el objetivo de que el salario mínimo interprofesional alcance el 60 por ciento del salario medio en 2023».",
        note: "% 60 hori Gobernuak berak adierazten du hitzaurrean, SMIaren Azterketarako Aholku Batzordearen txostenean oinarrituta.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-tope-alquiler-2020",
    partyId: "psoe",
    questionId: "vivienda-tope-alquiler",
    topic: "Tope a las subidas del alquiler en zonas tensionadas",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2020-01-04",
      text: "Vamos a frenar las subidas abusivas de los alquileres al poner techo en zonas de mercado tensionado y vamos a reforzar el marco competencial de las entidades locales para que puedan actuar en este ámbito.",
      source: { ...INVESTIDURA_2020, page: "p. 20" },
    },
    did: {
      date: "2023-04-27",
      summary:
        "El Gobierno presentó el proyecto de Ley por el derecho a la vivienda, que permite limitar la renta de los contratos de alquiler en zonas declaradas de mercado tensionado. El Grupo Socialista votó a favor del dictamen; se publicó como Ley 12/2023.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 256,
          date: "2023-04-27",
          number: 173,
          title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2023-12203",
          title: "Ley 12/2023, de 24 de mayo, por el derecho a la vivienda",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12203",
          date: "2023-05-25",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Límit a les pujades del lloguer en zones tensionades",
        summary: "El Govern va presentar el projecte de Llei pel dret a l'habitatge, que permet limitar la renda dels contractes de lloguer en zones declarades de mercat tensionat. El Grup Socialista va votar a favor del dictamen; es va publicar com a Llei 12/2023.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Teito ás subidas do alugamento en zonas tensionadas",
        summary: "O Goberno presentou o proxecto de Lei polo dereito á vivenda, que permite limitar a renda dos contratos de alugamento en zonas declaradas de mercado tensionado. O Grupo Socialista votou a favor do ditame; publicouse como Lei 12/2023.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Alokairuaren igoerei muga eremu tentsionatuetan",
        summary: "Gobernuak Etxebizitzarako eskubideari buruzko Legearen proiektua aurkeztu zuen; horren bidez, merkatu tentsionatuko eremu deklaratuetan alokairu-kontratuen errenta muga daiteke. Talde Sozialistak irizpenaren alde bozkatu zuen; 12/2023 Lege gisa argitaratu zen.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-eutanasia-2020",
    partyId: "psoe",
    topic: "Regulación de la eutanasia",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2020-01-04",
      text: "Aprobaremos en este sentido, como hemos anunciado públicamente, la regulación de la eutanasia que reconozca el derecho a una muerte digna.",
      source: { ...INVESTIDURA_2020, page: "p. 21" },
    },
    did: {
      date: "2021-03-18",
      summary:
        "La proposición de ley orgánica del Grupo Socialista se aprobó en la votación de conjunto tras las enmiendas del Senado, con el voto a favor de los 120 diputados socialistas; se publicó como Ley Orgánica 3/2021.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 85,
          date: "2021-03-18",
          number: 12,
          title: "Proposición de Ley Orgánica de regulación de la eutanasia — votación de conjunto",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion085/20210318/Votacion012/VOT_20210318133141.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-4628",
          title: "Ley Orgánica 3/2021, de 24 de marzo, de regulación de la eutanasia",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-4628",
          date: "2021-03-25",
          role: "apoyo",
        },
      ],
    },
    verdict: "cumple",
    i18n: {
      ca: {
        topic: "Regulació de l'eutanàsia",
        summary: "La proposició de llei orgànica del Grup Socialista es va aprovar en la votació de conjunt després de les esmenes del Senat, amb el vot a favor dels 120 diputats socialistes; es va publicar com a Llei orgànica 3/2021.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Regulación da eutanasia",
        summary: "A proposición de lei orgánica do Grupo Socialista aprobouse na votación de conxunto tras as emendas do Senado, co voto a favor dos 120 deputados socialistas; publicouse como Lei orgánica 3/2021.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Eutanasiaren erregulazioa",
        summary: "Talde Sozialistaren lege organiko-proposamena osoko bozketan onartu zen, Senatuaren zuzenketen ondoren, 120 diputatu sozialisten aldeko botoarekin; 3/2021 Lege Organiko gisa argitaratu zen.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-ley-mordaza-2019",
    partyId: "psoe",
    topic: "Sustituir la Ley de Seguridad Ciudadana («ley mordaza»)",
    said: {
      speaker: "Pedro Sánchez Pérez-Castejón (PSOE) y Pablo Iglesias Turrión (Unidas Podemos)",
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
      date: "2026-10-06",
      summary:
        "El Gobierno no aprobó ningún proyecto de ley de seguridad ciudadana en la XIV ni en la XV. En la XIV, la proposición de ley del PNV decayó al rechazar la Comisión de Interior su dictamen (14-3-2023). En la XV, la proposición coescrita por el Grupo Socialista se tomó en consideración (29-10-2024, GS sí) y quedó en ponencia hasta la disolución de las Cortes (6-10-2026). La Ley Orgánica 4/2015 sigue vigente.",
      evidence: [
        {
          kind: "iniciativa",
          title: "Proposición de Ley Orgánica de reforma de la Ley Orgánica 4/2015, de protección de la seguridad ciudadana (122/000003, XIV, Grupo Vasco EAJ-PNV)",
          url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=122/000003",
          status: "Rechazado: la Comisión de Interior rechazó el dictamen (18 a favor, 19 en contra)",
          date: "2023-03-14",
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
      "Podía hacerlo: el PSOE presidió el Gobierno toda la XIV y la XV (podía aprobar y remitir un proyecto de ley), firmó este compromiso en el acuerdo de coalición de 2019 y lo repitió en el de 2023 con SUMAR, y en la XV es coautor de la proposición 122/000131, que reunió 176 votos en su toma en consideración. El voto por grupo del dictamen de 2023 en Comisión no está en datos abiertos; solo el resultado (DSCD-14-CO-864, p. 36).",
    i18n: {
      ca: {
        topic: "Substituir la Llei de seguretat ciutadana («llei mordassa»)",
        summary: "El Govern no va aprovar cap projecte de llei de seguretat ciutadana ni a la XIV ni a la XV. A la XIV, la proposició de llei del PNV va decaure quan la Comissió d'Interior en va rebutjar el dictamen (14-3-2023). A la XV, la proposició coescrita pel Grup Socialista es va prendre en consideració (29-10-2024, GS sí) i va quedar en ponència fins a la dissolució de les Corts (6-10-2026). La Llei orgànica 4/2015 continua vigent.",
        note: "Podia fer-ho: el PSOE va presidir el Govern tota la XIV i la XV (podia aprovar i remetre un projecte de llei), va signar aquest compromís en l'acord de coalició del 2019 i el va repetir en el del 2023 amb SUMAR, i a la XV és coautor de la proposició 122/000131, que va reunir 176 vots en la presa en consideració. El vot per grup del dictamen del 2023 en comissió no és a les dades obertes; només el resultat (DSCD-14-CO-864, p. 36).",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Substituír a Lei de seguridade cidadá («lei mordaza»)",
        summary: "O Goberno non aprobou ningún proxecto de lei de seguridade cidadá na XIV nin na XV. Na XIV, a proposición de lei do PNV decaeu ao rexeitar a Comisión de Interior o seu ditame (14-3-2023). Na XV, a proposición coescrita polo Grupo Socialista tomouse en consideración (29-10-2024, GS si) e quedou en relatorio ata a disolución das Cortes (6-10-2026). A Lei orgánica 4/2015 segue vixente.",
        note: "Podía facelo: o PSOE presidiu o Goberno toda a XIV e a XV (podía aprobar e remitir un proxecto de lei), asinou este compromiso no acordo de coalición de 2019 e repetiuno no de 2023 con SUMAR, e na XV é coautor da proposición 122/000131, que reuniu 176 votos na súa toma en consideración. O voto por grupo do ditame de 2023 en comisión non está nos datos abertos; só o resultado (DSCD-14-CO-864, p. 36).",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "Herritarren Segurtasunerako Legea («mozal-legea») ordeztea",
        summary: "Gobernuak ez zuen herritarren segurtasunari buruzko lege-proiekturik onartu, ez XIV. legealdian, ez XV.ean. XIV.ean, PNVren lege-proposamena bertan behera geratu zen Barne Batzordeak haren irizpena baztertu zuenean (14-3-2023). XV.ean, Talde Sozialistak beste talde batzuekin batera idatzitako proposamena aintzat hartu zen (29-10-2024, GS: bai), eta txostengintzan geratu zen Gorteak desegin arte (6-10-2026). 4/2015 Lege Organikoak indarrean jarraitzen du.",
        note: "Egin zezakeen: PSOEk Gobernuburutza izan zuen XIV. eta XV. legealdi osoetan (lege-proiektu bat onartu eta bidal zezakeen), konpromiso hau 2019ko koalizio-akordioan sinatu zuen eta 2023koan errepikatu zuen SUMARekin, eta XV.ean 122/000131 proposamenaren egilekidea da; proposamen horrek 176 boto lortu zituen aintzat hartzeko bozketan. 2023ko irizpenaren talde bakoitzaren botoa batzordean ez dago datu irekietan; emaitza bakarrik (DSCD-14-CO-864, 36. or.).",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },
  {
    id: "psoe-vivienda-183000-2023",
    partyId: "psoe",
    topic: "Vivienda",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2023-11-15",
      text: "vamos a acometer la habilitación de 183 000 viviendas públicas para alquiler asequible, que prometimos también hace unos meses.",
      source: { ...INVESTIDURA_2023, url: `${INVESTIDURA_2023.url}#page=14`, page: "14" },
    },
    did: {
      date: "2026-10-06",
      summary:
        "El Ministerio de Vivienda y Agenda Urbana cifra en 120.479 las viviendas «movilizadas en diferentes fases (desde entregadas a fase de construcción)» de su Plan de Vivienda en Alquiler Asequible, cuya meta sitúa en «más de 183.000 viviendas» «a lo largo de la reciente legislatura». En agosto de 2024 eran 80.745. Las Cortes se disolvieron el 6-10-2026.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Plan de Vivienda en Alquiler Asequible — viviendas asequibles movilizadas por el Gobierno",
          url: MIVAU_PVAA,
          date: "2025-12-05",
          publisher: "Ministerio de Vivienda y Agenda Urbana",
          value:
            "120.479 viviendas movilizadas (68.325 Entidad Estatal de Vivienda; 24.867 Plan de Recuperación; 9.489 Fondo Social de Vivienda; 8.300 Plan Estatal; 6.102 subvenciones directas; 3.396 préstamos ICO), frente a una meta de más de 183.000",
        },
        {
          kind: "dato-oficial",
          title: "Nota de prensa: «El Gobierno de España ya ha movilizado 80.745 viviendas del Plan de Vivienda en Alquiler Asequible»",
          url: "https://www.mivau.gob.es/recursos_mfom/sala_prensa/240813_np_mivau_pvaa_acc.pdf",
          date: "2024-08-13",
          publisher: "Ministerio de Vivienda y Agenda Urbana",
          value: "80.745 viviendas movilizadas, el 43,88 % del objetivo de habilitar 184.000",
        },
        DISOLUCION_2026,
      ],
    },
    verdict: "parcial",
    note:
      "Con la propia métrica del Ministerio, al final de la legislatura constan 120.479 de más de 183.000 (alrededor del 66 %). «Movilizada» no es «terminada»: incluye viviendas en construcción y fases previas, y el Ministerio no publica en esa página cuántas se han entregado. La fecha del dato es la de la última modificación de la página (5-12-2025); la cifra seguía siendo la misma al consultarla el 7-10-2026. El objetivo figura como 183.000 en la página y 184.000 en la nota de 2024.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El Ministeri d'Habitatge i Agenda Urbana xifra en 120.479 els habitatges mobilitzats del seu Pla d'Habitatge en Lloguer Assequible, «en diferentes fases (desde entregadas a fase de construcción)», i en situa la meta en «más de 183.000 viviendas» «a lo largo de la reciente legislatura». L'agost del 2024 eren 80.745. Les Corts es van dissoldre el 6-10-2026.",
        note: "Amb la mateixa mètrica del Ministeri, al final de la legislatura consten 120.479 de més de 183.000 (al voltant del 66 %). «Mobilitzat» no vol dir «acabat»: inclou habitatges en construcció i fases prèvies, i el Ministeri no publica en aquesta pàgina quants se n'han lliurat. La data de la dada és la de l'última modificació de la pàgina (5-12-2025); la xifra continuava sent la mateixa en consultar-la el 7-10-2026. L'objectiu figura com a 183.000 a la pàgina i com a 184.000 a la nota del 2024.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Vivenda",
        summary: "O Ministerio de Vivenda e Axenda Urbana cifra en 120.479 as vivendas mobilizadas do seu Plan de Vivenda en Alugamento Accesible, «en diferentes fases (desde entregadas a fase de construcción)», e sitúa a meta en «más de 183.000 viviendas» «a lo largo de la reciente legislatura». En agosto de 2024 eran 80.745. As Cortes disolvéronse o 6-10-2026.",
        note: "Coa propia métrica do Ministerio, ao final da lexislatura constan 120.479 de máis de 183.000 (arredor do 66 %). «Mobilizada» non é «rematada»: inclúe vivendas en construción e fases previas, e o Ministerio non publica nesa páxina cantas se entregaron. A data do dato é a da última modificación da páxina (5-12-2025); a cifra seguía a ser a mesma ao consultala o 7-10-2026. O obxectivo figura como 183.000 na páxina e 184.000 na nota de 2024.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Etxebizitza eta Hiri Agendako Ministerioaren arabera, Alokairu Eskuragarriko Etxebizitza Planean 120.479 etxebizitza mobilizatu dira, «en diferentes fases (desde entregadas a fase de construcción)», eta helburua «más de 183.000 viviendas» da, «a lo largo de la reciente legislatura». 2024ko abuztuan 80.745 ziren. Gorteak 6-10-2026an desegin ziren.",
        note: "Ministerioaren beraren neurriaren arabera, legealdiaren amaieran 120.479 daude, 183.000tik gorako helburutik (% 66 inguru). «Mobilizatua» ez da «amaitua»: eraikitzen ari diren etxebizitzak eta aurreko faseak barne hartzen ditu, eta Ministerioak ez du orri horretan argitaratzen zenbat entregatu diren. Datuaren data orriaren azken aldaketarena da (5-12-2025); zifra bera zen 7-10-2026an kontsultatu zenean. Helburua 183.000 da orrian, eta 184.000 2024ko oharrean.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-avales-ico-50000-2023",
    partyId: "psoe",
    topic: "Vivienda",
    said: {
      speaker: ACUERDO_2023_SPEAKER,
      role: ACUERDO_2023_ROLE,
      date: "2023-10-24",
      text: "Desarrollaremos y aplicaremos la nueva línea de avales del Instituto de Crédito Oficial (ICO) de 2.500 millones de euros para ayudar a los jóvenes menores de 35 años […] con el objetivo de posibilitar la adquisición de unas 50.000 viviendas.",
      source: { ...ACUERDO_2023, url: `${ACUERDO_2023.url}#page=30`, page: "30" },
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
      "La línea existe y funciona (creada por el art. 191 del Real Decreto-ley 5/2023, antes del acuerdo), pero a 31-10-2025 había 8.549 compras avaladas frente a «unas 50.000» (alrededor del 17 %), y solo 206,6 de los 2.500 millones de euros comprometidos en avales. El plazo para formalizar operaciones sigue abierto hasta el 31-12-2027, así que la cifra aún puede subir; no hay dato oficial posterior al 31-10-2025 localizado.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La línia d'avals es va posar en marxa. Segons l'addenda del conveni entre el Ministeri d'Habitatge i l'ICO publicada al BOE, a 31-10-2025 s'havien formalitzat 8.549 operacions (6.119 de joves i 2.430 de famílies amb menors a càrrec), amb 206,6 milions d'euros avalats. L'addenda prorroga fins al 31-12-2027 el termini per formalitzar operacions.",
        note: "La línia existeix i funciona (creada per l'art. 191 del Reial decret llei 5/2023, abans de l'acord), però a 31-10-2025 hi havia 8.549 compres avalades davant de «unas 50.000» (al voltant del 17 %), i només 206,6 dels 2.500 milions d'euros compromesos en avals. El termini per formalitzar operacions continua obert fins al 31-12-2027, de manera que la xifra encara pot augmentar; no s'ha localitzat cap dada oficial posterior al 31-10-2025.",
        role: "acord programàtic de Govern signat pels dos partits",
      },
      gl: {
        topic: "Vivenda",
        summary: "A liña de avais púxose en marcha. Segundo a addenda do convenio entre o Ministerio de Vivenda e o ICO publicada no BOE, a 31-10-2025 formalizáranse 8.549 operacións (6.119 de mozos e 2.430 de familias con menores a cargo), con 206,6 millóns de euros avalados. A addenda prorroga ata o 31-12-2027 o prazo para formalizar operacións.",
        note: "A liña existe e funciona (creada polo art. 191 do Real decreto-lei 5/2023, antes do acordo), pero a 31-10-2025 había 8.549 compras avaladas fronte a «unas 50.000» (arredor do 17 %), e só 206,6 dos 2.500 millóns de euros comprometidos en avais. O prazo para formalizar operacións segue aberto ata o 31-12-2027, así que a cifra aínda pode subir; non se localizou ningún dato oficial posterior ao 31-10-2025.",
        role: "acordo programático de Goberno asinado polos dous partidos",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Abal-lerroa martxan jarri zen. Etxebizitza Ministerioaren eta ICOren arteko hitzarmenaren BOEn argitaratutako eranskinaren arabera, 31-10-2025erako 8.549 eragiketa formalizatu ziren (6.119 gazteenak eta 2.430 adingabeak ardurapean dituzten familienak), 206,6 milioi euro abalaturekin. Eranskinak 31-12-2027ra arte luzatzen du eragiketak formalizatzeko epea.",
        note: "Lerroa badago eta badabil (5/2023 Errege Lege-dekretuaren 191. artikuluak sortu zuen, akordioa baino lehen), baina 31-10-2025ean 8.549 erosketa abalatu zeuden, «unas 50.000» haien aldean (% 17 inguru), eta abaletan konprometitutako 2.500 milioi euroetatik 206,6 bakarrik. Eragiketak formalizatzeko epea irekita dago 31-12-2027ra arte, eta, beraz, zifra oraindik igo daiteke; ez da aurkitu 31-10-2025etik aurrerako datu ofizialik.",
        role: "bi alderdiek sinatutako Gobernu-akordio programatikoa",
      },
    },
  },
  {
    id: "psoe-indice-precios-alquiler-2023",
    partyId: "psoe",
    questionId: "vivienda-tope-alquiler",
    topic: "Vivienda",
    said: {
      speaker: ACUERDO_2023_SPEAKER,
      role: ACUERDO_2023_ROLE,
      date: "2023-10-24",
      text: "se definirá con carácter inmediato el índice de precios de referencia que permitan identificar los municipios y distritos que se consideran zonas tensionadas, para impulsar la puesta en marcha de la regulación de los precios de los alquileres.",
      source: { ...ACUERDO_2023, url: `${ACUERDO_2023.url}#page=29`, page: "29" },
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
        role: "acord programàtic de Govern signat pels dos partits",
      },
      gl: {
        topic: "Vivenda",
        summary: "A Secretaría de Estado de Vivenda e Axenda Urbana publicou no BOE o sistema de índices de prezos de referencia do artigo 17.7 da Lei de arrendamentos urbanos e, o mesmo día, a relación de zonas de mercado residencial tensionado declaradas no primeiro trimestre de 2024.",
        note: "«Con carácter inmediato»: o índice publicouse no BOE case cinco meses despois do acordo (24-10-2023). Na Lei 12/2023 o índice serve para limitar a renda nas zonas xa declaradas tensionadas; a declaración fana as comunidades autónomas.",
        role: "acordo programático de Goberno asinado polos dous partidos",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Etxebizitza eta Hiri Agendako Estatu Idazkaritzak BOEn argitaratu zuen Hiri Errentamenduen Legearen 17.7 artikuluko erreferentziazko prezio-indizeen sistema, eta, egun berean, 2024ko lehen hiruhilekoan deklaratutako bizitegi-merkatu tentsionatuko eremuen zerrenda.",
        note: "«Con carácter inmediato»: indizea akordioa sinatu eta ia bost hilabetera argitaratu zen BOEn (24-10-2023). 12/2023 Legean, indizeak dagoeneko tentsionatutzat deklaratutako eremuetan errenta mugatzeko balio du; deklarazioa autonomia-erkidegoek egiten dute.",
        role: "bi alderdiek sinatutako Gobernu-akordio programatikoa",
      },
    },
  },
  {
    id: "psoe-presupuesto-vivienda-2019",
    partyId: "psoe",
    topic: "Vivienda",
    said: {
      speaker: "Pedro Sánchez Pérez-Castejón (PSOE) y Pablo Iglesias Turrión (Unidas Podemos)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Impulsaremos la política de Vivienda con un incremento en la dotación de recursos. […] Para combatir esta situación se propone ampliar progresivamente el presupuesto actual en materia de Vivienda.",
      source: { ...ACUERDO_2019, page: "p. 17 (p. 18 del PDF)" },
    },
    did: {
      date: "2022-12-24",
      summary:
        "El programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») pasó de 450,7 millones de euros en el presupuesto prorrogado de 2019 a 570,8 en los PGE de 2021, 771,5 en los de 2022 y 959,5 en los de 2023 (créditos iniciales). Además, desde 2021 los PGE incluyen programas de vivienda financiados por el Mecanismo de Recuperación y Resiliencia.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "PGE 2019 prorrogado — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2019Prorroga", "L_19P_E_G7.PDF"),
          date: "2019-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 450.652,67 miles de euros (p. 77 del PDF)",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2021 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2021Ley", "L_21_E_G7.PDF"),
          date: "2021-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 570.768,27 miles de euros; programa 260A (Mecanismo de Recuperación y Resiliencia): 1.651.000,00 miles de euros (p. 91 del PDF)",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2022 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2022Ley", "L_22_E_G7.PDF"),
          date: "2022-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 771.485,51 miles de euros; 26BA (C02.I01): 1.389.000,00; 26BB (C02.I02): 500.000,00 (p. 112 del PDF)",
        },
        {
          kind: "dato-oficial",
          title: "PGE 2023 — Presupuesto por programas y memoria de objetivos, tomo VII (sección 17), resumen orgánico por programas, cap. 1 a 9",
          url: PGE_TOMO_VII("PGE2023Ley", "L_23_E_G7.PDF"),
          date: "2023-01-01",
          publisher: "Ministerio de Hacienda (Secretaría de Estado de Presupuestos y Gastos)",
          value: "Programa 261N: 959.526,75 miles de euros; 26BA (C02.I01): 1.980.000,00; 26BB (C02.I02): 500.000,00 (p. 112 del PDF)",
        },
      ],
    },
    verdict: "cumple",
    note:
      "Se comparan créditos iniciales del mismo programa presupuestario (261N), no gasto ejecutado: la ejecución no se ha contrastado. El presupuesto de 2019 era el de 2018 prorrogado (aprobado con el Gobierno del PP). La comparación llega a los PGE de 2023 (Ley 31/2022, BOE de 24-12-2022, fecha que se toma como la del hecho); los ejercicios posteriores no se han contrastado.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») va passar de 450,7 milions d'euros en el pressupost prorrogat del 2019 a 570,8 en els PGE del 2021, 771,5 en els del 2022 i 959,5 en els del 2023 (crèdits inicials). A més, des del 2021 els PGE inclouen programes d'habitatge finançats pel Mecanisme de Recuperació i Resiliència.",
        note: "Es comparen crèdits inicials del mateix programa pressupostari (261N), no despesa executada: l'execució no s'ha contrastat. El pressupost del 2019 era el del 2018 prorrogat (aprovat amb el Govern del PP). La comparació arriba fins als PGE del 2023 (Llei 31/2022, BOE del 24-12-2022, data que es pren com la del fet); els exercicis posteriors no s'han contrastat.",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Vivenda",
        summary: "O programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») pasou de 450,7 millóns de euros no orzamento prorrogado de 2019 a 570,8 nos PGE de 2021, 771,5 nos de 2022 e 959,5 nos de 2023 (créditos iniciais). Ademais, desde 2021 os PGE inclúen programas de vivenda financiados polo Mecanismo de Recuperación e Resiliencia.",
        note: "Compáranse créditos iniciais do mesmo programa orzamentario (261N), non gasto executado: a execución non se contrastou. O orzamento de 2019 era o de 2018 prorrogado (aprobado co Goberno do PP). A comparación chega ata os PGE de 2023 (Lei 31/2022, BOE do 24-12-2022, data que se toma como a do feito); os exercicios posteriores non se contrastaron.",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "261N programa («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») 2019ko aurrekontu luzatuko 450,7 milioi eurotik 2021eko PGEetako 570,8ra, 2022koetako 771,5era eta 2023koetako 959,5era igo zen (hasierako kredituak). Gainera, 2021etik, PGEek Suspertze eta Erresilientzia Mekanismoak finantzatutako etxebizitza-programak dituzte.",
        note: "Aurrekontu-programa bereko (261N) hasierako kredituak alderatzen dira, ez gauzatutako gastua: gauzatzea ez da egiaztatu. 2019ko aurrekontua 2018koa zen, luzatuta (PPren Gobernuarekin onartua). Alderaketa 2023ko PGEetaraino iristen da (31/2022 Legea, 24-12-2022ko BOE; data hori hartzen da egitatearen datatzat); ondorengo ekitaldiak ez dira egiaztatu.",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },

  // ─── Profundidad proporcional al tiempo de gobierno (añadido el 2026-10-07) ───
  // Regla de método: ≈ 2 entradas por año de gobierno del Estado (mínimo 4).
  // El PSOE gobierna desde junio de 2018 (≈ 8 años): objetivo ≈ 16. Se añaden
  // los compromisos medibles más visibles de investiduras y acuerdos de
  // coalición, cumplidos e incumplidos, contrastados con BOE, IGAE, Seguridad
  // Social y la relación de proyectos de ley de datos abiertos del Congreso.
  {
    id: "psoe-pensiones-ipc-2020",
    partyId: "psoe",
    topic: "Revalorización de las pensiones con el IPC por ley",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2020-01-04",
      text: "Vamos a actualizar mediante ley las pensiones conforme al coste de la vida, al IPC",
      source: { ...INVESTIDURA_2020, page: "p. 20" },
    },
    did: {
      date: "2021-12-29",
      summary:
        "El Gobierno remitió el Proyecto de Ley de garantía del poder adquisitivo de las pensiones; el Grupo Socialista votó a favor del dictamen (118 sí). La Ley 21/2021 revaloriza cada año las pensiones contributivas con la media del IPC de los doce meses previos a diciembre.",
      evidence: [
        {
          kind: "votacion",
          legislature: "XIV",
          session: 138,
          date: "2021-12-02",
          number: 83,
          title:
            "Proyecto de Ley de garantía del poder adquisitivo de las pensiones y de otras medidas de refuerzo de la sostenibilidad financiera y social del sistema público de pensiones — votación del dictamen",
          groupVote: "si",
          url: `${CONGRESO}/Leg14/Sesion138/20211202/Votacion083/VOT_20230303120316.json`,
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-21652",
          title:
            "Ley 21/2021, de 28 de diciembre, de garantía del poder adquisitivo de las pensiones y de otras medidas de refuerzo de la sostenibilidad financiera y social del sistema público de pensiones",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-21652",
          date: "2021-12-29",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "Solo se contrasta la actualización por ley con el IPC; la segunda parte de la frase (subir el poder adquisitivo de las pensiones mínimas y no contributivas) no se ha contrastado y por eso no se cita.",
    i18n: {
      ca: {
        topic: "Revaloració de les pensions amb l'IPC per llei",
        summary: "El Govern va remetre el projecte de llei de garantia del poder adquisitiu de les pensions; el Grup Socialista va votar a favor del dictamen (118 sí). La Llei 21/2021 revalora cada any les pensions contributives amb la mitjana de l'IPC dels dotze mesos anteriors a desembre.",
        note: "Només es contrasta l'actualització per llei amb l'IPC; la segona part de la frase (augmentar el poder adquisitiu de les pensions mínimes i no contributives) no s'ha contrastat i per això no se cita.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Revalorización das pensións co IPC por lei",
        summary: "O Goberno remitiu o proxecto de lei de garantía do poder adquisitivo das pensións; o Grupo Socialista votou a favor do ditame (118 si). A Lei 21/2021 revaloriza cada ano as pensións contributivas coa media do IPC dos doce meses anteriores a decembro.",
        note: "Só se contrasta a actualización por lei co IPC; a segunda parte da frase (subir o poder adquisitivo das pensións mínimas e non contributivas) non se contrastou e por iso non se cita.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Pentsioak KPIaren arabera eguneratzea legez",
        summary: "Gobernuak pentsioen erosahalmena bermatzeko lege-proiektua bidali zuen; Talde Sozialistak irizpenaren alde bozkatu zuen (118 bai). 21/2021 Legeak urtero eguneratzen ditu kotizaziopeko pentsioak, abenduaren aurreko hamabi hilabeteetako KPIaren batez bestekoarekin.",
        note: "Legez KPIaren arabera eguneratzea bakarrik egiaztatzen da; esaldiaren bigarren zatia (gutxieneko pentsioen eta kotizaziorik gabeko pentsioen erosahalmena igotzea) ez da egiaztatu, eta horregatik ez da aipatzen.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-ingreso-minimo-vital-2019",
    partyId: "psoe",
    topic: "Ingreso mínimo vital",
    said: {
      speaker: "Pedro Sánchez Pérez-Castejón (PSOE) y Pablo Iglesias Turrión (Unidas Podemos)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Desarrollaremos el Ingreso Mínimo Vital como prestación de Seguridad Social. […] posteriormente mediante un mecanismo general de garantía de renta para familias sin ingresos o con ingresos bajos.",
      source: {
        ...ACUERDO_2019,
        title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 2.4.2",
        page: "p. 15 (p. 16 del PDF)",
      },
    },
    did: {
      date: "2021-12-21",
      summary:
        "El Gobierno aprobó el Real Decreto-ley 20/2020, que crea el ingreso mínimo vital como prestación no contributiva de la Seguridad Social. El decreto se tramitó después como proyecto de ley y se publicó como Ley 19/2021.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2020-5493",
          title: "Real Decreto-ley 20/2020, de 29 de mayo, por el que se establece el ingreso mínimo vital",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-5493",
          date: "2020-06-01",
          role: "gobierno",
        },
        {
          kind: "boe",
          reference: "BOE-A-2021-21007",
          title: "Ley 19/2021, de 20 de diciembre, por la que se establece el ingreso mínimo vital",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-21007",
          date: "2021-12-21",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "Se contrasta la creación de la prestación, no su cobertura ni su gestión (número de beneficiarios frente a los previstos), que no se han medido aquí.",
    i18n: {
      ca: {
        topic: "Ingrés mínim vital",
        summary: "El Govern va aprovar el Reial decret llei 20/2020, que crea l'ingrés mínim vital com a prestació no contributiva de la Seguretat Social. El decret es va tramitar després com a projecte de llei i es va publicar com a Llei 19/2021.",
        note: "Es contrasta la creació de la prestació, no la cobertura ni la gestió (nombre de beneficiaris davant dels previstos), que no s'han mesurat aquí.",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Ingreso mínimo vital",
        summary: "O Goberno aprobou o Real decreto-lei 20/2020, que crea o ingreso mínimo vital como prestación non contributiva da Seguridade Social. O decreto tramitouse despois como proxecto de lei e publicouse como Lei 19/2021.",
        note: "Contrástase a creación da prestación, non a súa cobertura nin a súa xestión (número de beneficiarios fronte aos previstos), que non se mediron aquí.",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "Bizitzeko gutxieneko diru-sarrera",
        summary: "Gobernuak 20/2020 Errege Lege-dekretua onartu zuen, bizitzeko gutxieneko diru-sarrera Gizarte Segurantzaren kotizaziorik gabeko prestazio gisa sortzen duena. Dekretua lege-proiektu gisa izapidetu zen gero, eta 19/2021 Lege gisa argitaratu.",
        note: "Prestazioaren sorrera egiaztatzen da, ez haren estaldura edo kudeaketa (onuradunen kopurua aurreikusitakoen aldean); horiek ez dira hemen neurtu.",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },
  {
    id: "psoe-lomce-2019",
    partyId: "psoe",
    topic: "Derogación de la LOMCE",
    said: {
      speaker: "Pedro Sánchez Pérez-Castejón (PSOE) y Pablo Iglesias Turrión (Unidas Podemos)",
      role: "firmantes del acuerdo de Gobierno de coalición",
      date: "2019-12-30",
      text: "Aprobaremos una Ley Básica de Educación, que derogue la LOMCE y sus consecuencias negativas, que blinde la educación pública como eje vertebrador del sistema educativo",
      source: {
        ...ACUERDO_2019,
        title: "Coalición progresista. Un nuevo acuerdo para España (acuerdo PSOE–Unidas Podemos, 30-12-2019), punto 2.1.1",
        page: "p. 9 (p. 10 del PDF)",
      },
    },
    did: {
      date: "2020-12-30",
      summary:
        "El Gobierno remitió el proyecto que se publicó como Ley Orgánica 3/2020 (LOMLOE). Su disposición derogatoria única dice: «Queda derogada la Ley Orgánica 8/2013, de 9 de diciembre para la mejora de la calidad educativa».",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2020-17264",
          title: "Ley Orgánica 3/2020, de 29 de diciembre, por la que se modifica la Ley Orgánica 2/2006, de 3 de mayo, de Educación",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-17264",
          date: "2020-12-30",
          role: "gobierno",
        },
      ],
    },
    verdict: "cumple",
    note: "Es una ley que modifica la LOE de 2006, no una «Ley Básica de Educación» nueva, pero deroga expresamente la LOMCE, que es el compromiso medible.",
    i18n: {
      ca: {
        topic: "Derogació de la LOMCE",
        summary: "El Govern va remetre el projecte que es va publicar com a Llei orgànica 3/2020 (LOMLOE). La disposició derogatòria única diu: «Queda derogada la Ley Orgánica 8/2013, de 9 de diciembre para la mejora de la calidad educativa».",
        note: "És una llei que modifica la LOE del 2006, no una «Ley Básica de Educación» nova, però deroga expressament la LOMCE, que és el compromís mesurable.",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Derrogación da LOMCE",
        summary: "O Goberno remitiu o proxecto que se publicou como Lei orgánica 3/2020 (LOMLOE). A súa disposición derrogatoria única di: «Queda derogada la Ley Orgánica 8/2013, de 9 de diciembre para la mejora de la calidad educativa».",
        note: "É unha lei que modifica a LOE de 2006, non unha «Ley Básica de Educación» nova, pero derroga expresamente a LOMCE, que é o compromiso medible.",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "LOMCEren indargabetzea",
        summary: "Gobernuak bidali zuen 3/2020 Lege Organiko gisa (LOMLOE) argitaratu zen proiektua. Haren xedapen indargabetzaile bakarrak dio: «Queda derogada la Ley Orgánica 8/2013, de 9 de diciembre para la mejora de la calidad educativa».",
        note: "2006ko LOE aldatzen duen legea da, ez «Ley Básica de Educación» berri bat, baina berariaz indargabetzen du LOMCE, eta hori da konpromiso neurgarria.",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },
  {
    id: "psoe-financiacion-autonomica-2020",
    partyId: "psoe",
    topic: "Nuevo modelo de financiación autonómica",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2020-01-04",
      text: "Esta será, además, en coherencia, señorías —como hemos anunciado en nuestro acuerdo de coalición progresista—, la legislatura de la financiación autonómica.",
      source: { ...INVESTIDURA_2020, page: "p. 24" },
    },
    did: {
      date: "2023-05-30",
      summary:
        "La XIV legislatura terminó con la disolución de las Cortes (30-5-2023) sin una ley que sustituya el sistema de financiación de las comunidades autónomas de régimen común. La Ley 22/2009, que lo regula, sigue vigente y sin derogar.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-12663",
          title: "Real Decreto 400/2023, de 29 de mayo, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-12663",
          date: "2023-05-30",
          role: "gobierno",
        },
        {
          kind: "dato-oficial",
          title:
            "Ley 22/2009, de 18 de diciembre, por la que se regula el sistema de financiación de las Comunidades Autónomas de régimen común (BOE-A-2009-20375), texto consolidado",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-20375",
          date: "2026-10-05",
          publisher: "Agencia Estatal Boletín Oficial del Estado",
          value: "Vigente: estatus de derogación «N» en los metadatos del BOE (actualizados el 5-10-2026)",
        },
      ],
    },
    verdict: "no-hecho",
    note:
      "Podía hacerlo: el PSOE presidía el Gobierno, que es quien puede remitir un proyecto de ley, y lo firmó en el acuerdo de coalición de 2019. El propio candidato advirtió en la misma frase que necesitaría a «la bancada conservadora». El compromiso se repitió en la investidura de 2023 («vamos a impulsar un nuevo modelo de financiación autonómica», DSCD-15-PL-7, p. 17) y en el acuerdo con SUMAR; al disolverse las Cortes el 6-10-2026 la Ley 22/2009 seguía vigente. Los proyectos de la XV sobre «recursos de los sistemas de financiación territorial» (121/000065 y 121/000100) proceden de reales decretos-ley y no sustituyen el sistema.",
    i18n: {
      ca: {
        topic: "Nou model de finançament autonòmic",
        summary: "La XIV legislatura va acabar amb la dissolució de les Corts (30-5-2023) sense cap llei que substituís el sistema de finançament de les comunitats autònomes de règim comú. La Llei 22/2009, que el regula, continua vigent i sense derogar.",
        note: "Podia fer-ho: el PSOE presidia el Govern, que és qui pot remetre un projecte de llei, i ho va signar en l'acord de coalició del 2019. El mateix candidat va advertir en la mateixa frase que necessitaria «la bancada conservadora». El compromís es va repetir en la investidura del 2023 («vamos a impulsar un nuevo modelo de financiación autonómica», DSCD-15-PL-7, p. 17) i en l'acord amb SUMAR; en dissoldre's les Corts el 6-10-2026, la Llei 22/2009 continuava vigent. Els projectes de la XV sobre «recursos de los sistemas de financiación territorial» (121/000065 i 121/000100) provenen de reials decrets llei i no substitueixen el sistema.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Novo modelo de financiamento autonómico",
        summary: "A XIV lexislatura rematou coa disolución das Cortes (30-5-2023) sen unha lei que substituíse o sistema de financiamento das comunidades autónomas de réxime común. A Lei 22/2009, que o regula, segue vixente e sen derrogar.",
        note: "Podía facelo: o PSOE presidía o Goberno, que é quen pode remitir un proxecto de lei, e asinouno no acordo de coalición de 2019. O propio candidato advertiu na mesma frase que necesitaría «la bancada conservadora». O compromiso repetiuse na investidura de 2023 («vamos a impulsar un nuevo modelo de financiación autonómica», DSCD-15-PL-7, p. 17) e no acordo con SUMAR; ao disolvérense as Cortes o 6-10-2026, a Lei 22/2009 seguía vixente. Os proxectos da XV sobre «recursos de los sistemas de financiación territorial» (121/000065 e 121/000100) proceden de reais decretos-lei e non substitúen o sistema.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Finantzaketa autonomikoaren eredu berria",
        summary: "XIV. legealdia Gorteak desegitearekin amaitu zen (30-5-2023), erregimen erkideko autonomia-erkidegoen finantzaketa-sistema ordezkatuko zuen legerik gabe. Sistema hori arautzen duen 22/2009 Legeak indarrean jarraitzen du, indargabetu gabe.",
        note: "Egin zezakeen: PSOEk Gobernuburutza zuen, eta Gobernuak bidal dezake lege-proiektu bat; gainera, 2019ko koalizio-akordioan sinatu zuen. Hautagaiak berak ohartarazi zuen esaldi berean «la bancada conservadora» beharko zuela. Konpromisoa 2023ko inbestiduran errepikatu zen («vamos a impulsar un nuevo modelo de financiación autonómica», DSCD-15-PL-7, 17. or.) eta SUMARekiko akordioan; Gorteak 6-10-2026an desegin zirenean, 22/2009 Legeak indarrean jarraitzen zuen. XV. legealdiko «recursos de los sistemas de financiación territorial» gaiari buruzko proiektuak (121/000065 eta 121/000100) errege lege-dekretuetatik datoz, eta ez dute sistema ordezkatzen.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-estatuto-trabajadores-2023",
    partyId: "psoe",
    topic: "Nuevo Estatuto de los Trabajadores",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2023-11-15",
      text: "Por eso, les anuncio que esta legislatura será la legislatura del nuevo Estatuto de los Trabajadores",
      source: { ...INVESTIDURA_2023, url: `${INVESTIDURA_2023.url}#page=12`, page: "12" },
    },
    did: {
      date: "2026-10-06",
      summary:
        "El Gobierno no remitió al Congreso ningún proyecto de nuevo Estatuto de los Trabajadores en la XV legislatura. Los tres proyectos de ley de la XV que tocan el Estatuto modifican artículos concretos del texto refundido de 2015 (transposición de la Directiva 2019/1152, extinción por incapacidad permanente y permiso de nacimiento). Las Cortes se disolvieron el 6-10-2026 con el Real Decreto Legislativo 2/2015 vigente.",
      evidence: [
        {
          kind: "iniciativa",
          title:
            "Relación de proyectos de ley de la XV legislatura (datos abiertos del Congreso, fichero ProyectosDeLey, 7-10-2026)",
          url: "https://www.congreso.es/es/opendata/iniciativas",
          status:
            "Ningún proyecto de nuevo Estatuto de los Trabajadores entre los 115 proyectos de la XV; solo modificaciones parciales del texto de 2015 (121/000008, 121/000033 y 121/000069)",
          date: "2026-10-07",
        },
        {
          kind: "dato-oficial",
          title:
            "Real Decreto Legislativo 2/2015, de 23 de octubre, por el que se aprueba el texto refundido de la Ley del Estatuto de los Trabajadores (BOE-A-2015-11430), texto consolidado",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
          date: "2026-10-05",
          publisher: "Agencia Estatal Boletín Oficial del Estado",
          value: "Vigente: estatus de derogación «N» en los metadatos del BOE (actualizados el 5-10-2026)",
        },
        DISOLUCION_2026,
      ],
    },
    verdict: "no-hecho",
    note:
      "Podía hacerlo: el PSOE presidió el Gobierno toda la XV, y aprobar y remitir un proyecto de ley es competencia del Consejo de Ministros. El Ministerio de Trabajo estaba en manos de SUMAR, socio de coalición. Era también un compromiso del acuerdo de coalición de 2019 (punto 1.2, «Elaboraremos un nuevo Estatuto de los Trabajadores del siglo XXI») que tampoco se cumplió en la XIV.",
    i18n: {
      ca: {
        topic: "Nou Estatut dels Treballadors",
        summary: "El Govern no va remetre al Congrés cap projecte de nou Estatut dels Treballadors en la XV legislatura. Els tres projectes de llei de la XV que afecten l'Estatut modifiquen articles concrets del text refós del 2015 (transposició de la Directiva 2019/1152, extinció per incapacitat permanent i permís de naixement). Les Corts es van dissoldre el 6-10-2026 amb el Reial decret legislatiu 2/2015 vigent.",
        note: "Podia fer-ho: el PSOE va presidir el Govern tota la XV, i aprovar i remetre un projecte de llei és competència del Consell de Ministres. El Ministeri de Treball era en mans de SUMAR, soci de coalició. També era un compromís de l'acord de coalició del 2019 (punt 1.2, «Elaboraremos un nuevo Estatuto de los Trabajadores del siglo XXI») que tampoc no es va complir a la XIV.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Novo Estatuto dos Traballadores",
        summary: "O Goberno non remitiu ao Congreso ningún proxecto de novo Estatuto dos Traballadores na XV lexislatura. Os tres proxectos de lei da XV que tocan o Estatuto modifican artigos concretos do texto refundido de 2015 (transposición da Directiva 2019/1152, extinción por incapacidade permanente e permiso de nacemento). As Cortes disolvéronse o 6-10-2026 co Real decreto lexislativo 2/2015 vixente.",
        note: "Podía facelo: o PSOE presidiu o Goberno toda a XV, e aprobar e remitir un proxecto de lei é competencia do Consello de Ministros. O Ministerio de Traballo estaba en mans de SUMAR, socio de coalición. Era tamén un compromiso do acordo de coalición de 2019 (punto 1.2, «Elaboraremos un nuevo Estatuto de los Trabajadores del siglo XXI») que tampouco se cumpriu na XIV.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Langileen Estatutu berria",
        summary: "Gobernuak ez zion Kongresuari Langileen Estatutu berriaren proiekturik bidali XV. legealdian. Estatutua ukitzen duten XV.eko hiru lege-proiektuek 2015eko testu bateginaren artikulu zehatzak aldatzen dituzte (2019/1152 Zuzentarauaren transposizioa, ezintasun iraunkorragatiko azkentzea eta jaiotza-baimena). Gorteak 6-10-2026an desegin ziren, 2/2015 Legegintzako Errege Dekretua indarrean zegoela.",
        note: "Egin zezakeen: PSOEk Gobernuburutza izan zuen XV. legealdi osoan, eta lege-proiektu bat onartzea eta bidaltzea Ministro Kontseiluaren eskumena da. Lan Ministerioa SUMARen esku zegoen, koalizio-kidearen esku. 2019ko koalizio-akordioko konpromisoa ere bazen (1.2 puntua, «Elaboraremos un nuevo Estatuto de los Trabajadores del siglo XXI»), eta XIV.ean ere ez zen bete.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-fondo-reserva-5000-2023",
    partyId: "psoe",
    topic: "Aportaciones al Fondo de Reserva de la Seguridad Social",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2023-11-15",
      text: "Y vamos a hacer algo muy importante: cumplir con el mandato del Pacto de Toledo, que nos decía […] que lógicamente tenía que revalorizar las pensiones conforme al IPC, pero también destinar al Fondo de reserva de la Seguridad Social 5000 millones de euros cada año",
      source: { ...INVESTIDURA_2023, url: `${INVESTIDURA_2023.url}#page=13`, page: "13" },
    },
    did: {
      date: "2025-12-31",
      summary:
        "Según el informe de la Seguridad Social a las Cortes, las dotaciones acumuladas al Fondo de Reserva pasaron de 56.986 millones de euros (2023) a 60.590 (2024) y 64.963 (2025): 3.604 millones aportados en 2024 y 4.373 en 2025, casi todo de la cotización finalista del Mecanismo de Equidad Intergeneracional (3.577 y 4.356 millones). El saldo del Fondo a 31-12-2025 era de 14.069,81 millones.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Fondo de Reserva de la Seguridad Social — Informe a las Cortes Generales, evolución y situación a 31 de diciembre de 2025",
          url: "https://www.seg-social.es/descarga/es/15072026",
          date: "2025-12-31",
          publisher: "Ministerio de Inclusión, Seguridad Social y Migraciones",
          value:
            "Dotaciones acumuladas: 56.986 M€ (2023), 60.590 M€ (2024), 64.963 M€ (2025); dotaciones del MEI: 2.218 M€ (2023), 3.577 M€ (2024), 4.356 M€ (2025); saldo a 31-12-2025: 14.069,81 M€ (0,83 % del PIB)",
        },
      ],
    },
    verdict: "parcial",
    note:
      "El Fondo recibió aportaciones todos los años, crecientes, pero por debajo de los 5.000 millones anuales anunciados: 3.604 millones en 2024 (≈ 72 %) y 4.373 en 2025 (≈ 87 %). Las aportaciones anuales se calculan como diferencia de las dotaciones acumuladas de la tabla «Evolución del FRSS» del informe (p. 17 impresa). El dato de 2026 no está publicado.",
    i18n: {
      ca: {
        topic: "Aportacions al Fons de Reserva de la Seguretat Social",
        summary: "Segons l'informe de la Seguretat Social a les Corts, les dotacions acumulades al Fons de Reserva van passar de 56.986 milions d'euros (2023) a 60.590 (2024) i 64.963 (2025): 3.604 milions aportats el 2024 i 4.373 el 2025, gairebé tot de la cotització finalista del Mecanisme d'Equitat Intergeneracional (3.577 i 4.356 milions). El saldo del Fons a 31-12-2025 era de 14.069,81 milions.",
        note: "El Fons va rebre aportacions cada any, creixents, però per sota dels 5.000 milions anuals anunciats: 3.604 milions el 2024 (≈ 72 %) i 4.373 el 2025 (≈ 87 %). Les aportacions anuals es calculen com a diferència de les dotacions acumulades de la taula «Evolución del FRSS» de l'informe (p. 17 impresa). La dada del 2026 no està publicada.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Achegas ao Fondo de Reserva da Seguridade Social",
        summary: "Segundo o informe da Seguridade Social ás Cortes, as dotacións acumuladas ao Fondo de Reserva pasaron de 56.986 millóns de euros (2023) a 60.590 (2024) e 64.963 (2025): 3.604 millóns achegados en 2024 e 4.373 en 2025, case todo da cotización finalista do Mecanismo de Equidade Interxeracional (3.577 e 4.356 millóns). O saldo do Fondo a 31-12-2025 era de 14.069,81 millóns.",
        note: "O Fondo recibiu achegas todos os anos, crecentes, pero por debaixo dos 5.000 millóns anuais anunciados: 3.604 millóns en 2024 (≈ 72 %) e 4.373 en 2025 (≈ 87 %). As achegas anuais calcúlanse como diferenza das dotacións acumuladas da táboa «Evolución del FRSS» do informe (p. 17 impresa). O dato de 2026 non está publicado.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Gizarte Segurantzaren Erreserba Funtsari egindako ekarpenak",
        summary: "Gizarte Segurantzak Gorteei egindako txostenaren arabera, Erreserba Funtsari metatutako zuzkidurak 56.986 milioi eurotik (2023) 60.590era (2024) eta 64.963ra (2025) igo ziren: 3.604 milioi ekarri ziren 2024an eta 4.373 2025ean, ia dena Belaunaldien arteko Ekitate Mekanismoaren xede jakineko kotizaziotik (3.577 eta 4.356 milioi). Funtsaren saldoa 31-12-2025ean 14.069,81 milioikoa zen.",
        note: "Funtsak urtero jaso zituen ekarpenak, gero eta handiagoak, baina iragarritako urteko 5.000 milioien azpitik: 3.604 milioi 2024an (≈ % 72) eta 4.373 2025ean (≈ % 87). Urteko ekarpenak txostenaren «Evolución del FRSS» taulako zuzkidura metatuen arteko aldea kalkulatuz lortzen dira (inprimatutako 17. or.). 2026ko datua ez dago argitaratuta.",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-deficit-2023",
    partyId: "psoe",
    topic: "Reducción del déficit público",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (discurso de investidura)",
      date: "2023-11-15",
      text: "queremos hacerlo además al tiempo que seguimos reduciendo el déficit público, porque este es un Gobierno comprometido con la disciplina fiscal.",
      source: { ...INVESTIDURA_2023, url: `${INVESTIDURA_2023.url}#page=14`, page: "14" },
    },
    did: {
      date: "2025-12-31",
      summary:
        "Según la Intervención General de la Administración del Estado (contabilidad nacional), el déficit del conjunto de las Administraciones públicas fue del 3,52 % del PIB en 2023, del 3,22 % en 2024 (3,15 % antes de la revisión estadística de 2024) y del 2,39 % en 2025.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Informe trimestral de las Administraciones Públicas, contabilidad nacional, cuarto trimestre de 2024",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/Cap_Trim/IT_4T_2024.pdf",
          date: "2024-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Necesidad de financiación de las AAPP: 3,52 % del PIB en 2023 y 3,15 % en 2024 (50.187 M€)",
        },
        {
          kind: "dato-oficial",
          title: "Informe trimestral de las Administraciones Públicas, contabilidad nacional, cuarto trimestre de 2025 (revisión estadística 2024)",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/Cap_Trim/IT_4T_2025.pdf",
          date: "2025-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Necesidad de financiación de las AAPP: 3,22 % del PIB en 2024 (51.267 M€) y 2,39 % en 2025 (40.330 M€); sin el impacto de la DANA, 2,86 % y 2,18 %",
        },
      ],
    },
    verdict: "cumple",
    note:
      "El compromiso era seguir reduciendo el déficit, sin cifra: bajó cada año. No se contrasta aquí con los objetivos numéricos comunicados a la Comisión Europea ni con la deuda pública. Parte del descenso de 2025 se debe, según la IGAE, a menores gastos extraordinarios (DANA y sentencias desfavorables).",
    i18n: {
      ca: {
        topic: "Reducció del dèficit públic",
        summary: "Segons la Intervenció General de l'Administració de l'Estat (comptabilitat nacional), el dèficit del conjunt de les administracions públiques va ser del 3,52 % del PIB el 2023, del 3,22 % el 2024 (3,15 % abans de la revisió estadística del 2024) i del 2,39 % el 2025.",
        note: "El compromís era continuar reduint el dèficit, sense xifra: va baixar cada any. No es contrasta aquí amb els objectius numèrics comunicats a la Comissió Europea ni amb el deute públic. Part del descens del 2025 es deu, segons la IGAE, a unes despeses extraordinàries menors (DANA i sentències desfavorables).",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Redución do déficit público",
        summary: "Segundo a Intervención Xeral da Administración do Estado (contabilidade nacional), o déficit do conxunto das administracións públicas foi do 3,52 % do PIB en 2023, do 3,22 % en 2024 (3,15 % antes da revisión estatística de 2024) e do 2,39 % en 2025.",
        note: "O compromiso era seguir reducindo o déficit, sen cifra: baixou cada ano. Non se contrasta aquí cos obxectivos numéricos comunicados á Comisión Europea nin coa débeda pública. Parte do descenso de 2025 débese, segundo a IGAE, a menores gastos extraordinarios (DANA e sentenzas desfavorables).",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Defizit publikoaren murrizketa",
        summary: "Estatuko Administrazioaren Kontu-hartzailetza Nagusiaren arabera (kontabilitate nazionala), administrazio publiko guztien defizita BPGaren % 3,52 izan zen 2023an, % 3,22 2024an (% 3,15 2024ko berrikuspen estatistikoaren aurretik) eta % 2,39 2025ean.",
        note: "Konpromisoa defizita murrizten jarraitzea zen, zifrarik gabe: urtero jaitsi zen. Hemen ez da alderatzen Europako Batzordeari jakinarazitako zenbakizko helburuekin, ezta zor publikoarekin ere. IGAEren arabera, 2025eko jaitsieraren zati bat aparteko gastu txikiagoei zor zaie (DANA eta aurkako epaiak).",
        role: "Gobernuko presidentetzarako hautagaia (inbestidura-hitzaldia)",
      },
    },
  },
  {
    id: "psoe-presupuestos-2026",
    partyId: "psoe",
    topic: "Presentar los Presupuestos Generales del Estado",
    said: {
      speaker: SANCHEZ,
      role: "presidente del Gobierno y secretario general del PSOE (rueda de prensa de balance del curso político, respuesta a si se comprometía a presentar presupuestos)",
      date: "2025-07-28",
      text: "Sobre la primera, sí. El Gobierno de España presentará los Presupuestos Generales del Estado para el año 2026.",
      source: {
        url: "https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2025/20250728-TRANSCRIPCION-RP-PG-BALANCE.pdf",
        title: "La Moncloa — Transcripción de la rueda de prensa del presidente del Gobierno de balance del curso político (28-7-2025)",
        date: "2025-07-28",
        page: "p. 17",
        kind: "gobierno",
      },
    },
    did: {
      date: "2026-10-06",
      summary:
        "Ningún proyecto de Ley de Presupuestos Generales del Estado entró en el Congreso en la XV legislatura: no hubo presupuestos para 2024, 2025 ni 2026, y siguieron prorrogados los de 2023 (Ley 31/2022). Las Cortes se disolvieron el 6-10-2026.",
      evidence: [
        {
          kind: "iniciativa",
          title:
            "Relación de proyectos de ley de la XV legislatura (datos abiertos del Congreso, fichero ProyectosDeLey, 7-10-2026)",
          url: "https://www.congreso.es/es/opendata/iniciativas",
          status: "Ningún proyecto de Ley de Presupuestos Generales del Estado entre los 115 proyectos de ley de la XV",
          date: "2026-10-07",
        },
        {
          kind: "boe",
          reference: "BOE-A-2022-22128",
          title: "Ley 31/2022, de 23 de diciembre, de Presupuestos Generales del Estado para el año 2023",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2022-22128",
          date: "2022-12-24",
          role: "gobierno",
        },
        DISOLUCION_2026,
      ],
    },
    verdict: "no-hecho",
    note:
      "Podía hacerlo: elaborar y presentar los Presupuestos es competencia exclusiva del Gobierno (art. 134.1 de la Constitución) y no requiere mayoría parlamentaria; que luego se aprobaran es otra cuestión. El Consejo de Ministros aprobó el límite de gasto no financiero en noviembre de 2025 (lo dice el presidente en la sesión de control del 19-11-2025, transcripción de La Moncloa: https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2025/20251119-sesion-control-preguntas-pg.pdf), pero el proyecto no llegó a remitirse. La Ley 31/2022 se enlaza para fechar los últimos presupuestos aprobados.",
    i18n: {
      ca: {
        topic: "Presentar els Pressupostos Generals de l'Estat",
        summary: "Cap projecte de llei de pressupostos generals de l'Estat no va entrar al Congrés en la XV legislatura: no hi va haver pressupostos per al 2024, el 2025 ni el 2026, i es van mantenir prorrogats els del 2023 (Llei 31/2022). Les Corts es van dissoldre el 6-10-2026.",
        note: "Podia fer-ho: elaborar i presentar els pressupostos és competència exclusiva del Govern (art. 134.1 de la Constitució) i no requereix majoria parlamentària; que després s'aprovessin és una altra qüestió. El Consell de Ministres va aprovar el límit de despesa no financera el novembre del 2025 (ho diu el president en la sessió de control del 19-11-2025, transcripció de La Moncloa: https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2025/20251119-sesion-control-preguntas-pg.pdf), però el projecte no es va arribar a remetre. S'enllaça la Llei 31/2022 per datar els últims pressupostos aprovats.",
        role: "president del Govern i secretari general del PSOE (roda de premsa de balanç del curs polític, resposta a si es comprometia a presentar pressupostos)",
      },
      gl: {
        topic: "Presentar os Orzamentos Xerais do Estado",
        summary: "Ningún proxecto de lei de orzamentos xerais do Estado entrou no Congreso na XV lexislatura: non houbo orzamentos para 2024, 2025 nin 2026, e seguiron prorrogados os de 2023 (Lei 31/2022). As Cortes disolvéronse o 6-10-2026.",
        note: "Podía facelo: elaborar e presentar os orzamentos é competencia exclusiva do Goberno (art. 134.1 da Constitución) e non require maioría parlamentaria; que despois se aprobasen é outra cuestión. O Consello de Ministros aprobou o límite de gasto non financeiro en novembro de 2025 (dio o presidente na sesión de control do 19-11-2025, transcrición de La Moncloa: https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2025/20251119-sesion-control-preguntas-pg.pdf), pero o proxecto non chegou a remitirse. Enlázase a Lei 31/2022 para datar os últimos orzamentos aprobados.",
        role: "presidente do Goberno e secretario xeral do PSOE (rolda de prensa de balance do curso político, resposta a se se comprometía a presentar orzamentos)",
      },
      eu: {
        topic: "Estatuko Aurrekontu Orokorrak aurkeztea",
        summary: "XV. legealdian ez zen Estatuko Aurrekontu Orokorren lege-proiekturik sartu Kongresuan: ez zen aurrekonturik izan 2024rako, 2025erako ez 2026rako, eta 2023koak luzatuta jarraitu zuten (31/2022 Legea). Gorteak 6-10-2026an desegin ziren.",
        note: "Egin zezakeen: aurrekontuak egitea eta aurkeztea Gobernuaren eskumen esklusiboa da (Konstituzioaren 134.1 art.), eta ez du gehiengo parlamentariorik behar; gero onartzea beste kontu bat da. Ministro Kontseiluak finantzarioa ez den gastuaren muga onartu zuen 2025eko azaroan (presidenteak dio 19-11-2025eko kontrol-saioan; La Moncloaren transkripzioa: https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2025/20251119-sesion-control-preguntas-pg.pdf), baina proiektua ez zen bidali. 31/2022 Legea estekatzen da onartutako azken aurrekontuak datatzeko.",
        role: "Gobernuko presidentea eta PSOEko idazkari nagusia (ikasturte politikoaren balantzeari buruzko prentsaurrekoa; aurrekontuak aurkezteko konpromisoa hartzen ote zuen galderari erantzuna)",
      },
    },
  },
];
