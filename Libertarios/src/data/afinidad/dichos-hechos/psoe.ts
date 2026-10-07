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
 *
 * Revisado el 2026-10-07 con la regla de independencia de la fuente
 * (`AFINIDAD-DATOS.md` §5 bis): cada `dato-oficial` dice quién lo mide, y un
 * «cumple» no se apoya solo en cifras del propio Gobierno. Hechos judiciales
 * solo de documentos del Poder Judicial, con la situación procesal que dicen.
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
        "El Gobierno fijó el salario mínimo de 2023 en 1.080 euros al mes en 14 pagas (Real Decreto 99/2023), cuyo preámbulo declara alcanzado el 60 % del salario medio. Las mediciones independientes del salario bruto no llegan a esa cifra: Eurostat sitúa el salario mínimo en el 49,1 % del salario bruto mensual medio en 2023, y la OCDE en el 44,0 % del salario medio a tiempo completo. Con la Encuesta de Estructura Salarial del INE (salario medio anual de 28.049,94 euros en 2023), los 15.120 euros anuales son el 53,9 %.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-3982",
          title: "Real Decreto 99/2023, de 14 de febrero, por el que se fija el salario mínimo interprofesional para 2023",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-3982",
          date: "2023-02-15",
          role: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Minimum wages as a proportion of mean/median gross monthly earnings (earn_mw_avgr2), España, industria, construcción y servicios (B-S)",
          url: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_avgr2?geo=ES&format=JSON",
          date: "2023-12-31",
          publisher: "Eurostat",
          value: "Salario mínimo = 49,1 % del salario bruto mensual medio en 2023 (45,6 % en 2019; 51,9 % en 2025); 56,2 % del mediano en 2023",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Minimum relative to average wages of full-time workers (DSD_EARNINGS@MIN2AVE), España",
          url: "https://sdmx.oecd.org/public/rest/data/OECD.ELS.SAE,DSD_EARNINGS@MIN2AVE,/ESP.......?startPeriod=2015",
          date: "2023-12-31",
          publisher: "OCDE",
          value: "Salario mínimo = 43,97 % del salario medio a tiempo completo en 2023 (41,46 % en 2019; 46,25 % en 2025); 52,57 % del mediano en 2023",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Encuesta Anual de Estructura Salarial 2023, datos definitivos (nota de prensa del INE, p. 1)",
          url: "https://www.ine.es/dyngs/Prensa/EAES2023.pdf",
          date: "2025-05-28",
          publisher: "INE",
          value: "Salario medio anual: 28.049,94 euros por trabajador en 2023 (mediano: 23.349,00 euros)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "II Informe de la Comisión Asesora para el Análisis del Salario Mínimo Interprofesional (diciembre de 2022), pp. 11 y 13 del PDF",
          url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/trabajo14/Documents/2022/191222-Informe-SMI-2023.pdf",
          date: "2022-12-19",
          publisher: "Comisión Asesora del Ministerio de Trabajo y Economía Social (publicado por La Moncloa)",
          value: "60 % del «salario medio neto estimado en 2022, 1867€» de un trabajador a tiempo completo, «considerados ambos en términos netos»",
          sourceType: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Antes «cumple», apoyado solo en el preámbulo del real decreto (regla de independencia de la fuente, 2026-10-07). El 60 % solo sale con la medida que eligió el Gobierno: salario neto de un trabajador a tiempo completo, según su comisión asesora. Ninguna medida independiente del salario bruto medio llega al 60 % (Eurostat: 49,1 % en 2023 y 51,9 % en 2025; OCDE: 44,0 % y 46,2 %). La promesa decía «salario medio» sin precisar bruto o neto. El salario mínimo sí subió mucho respecto al salario medio (Eurostat: 37,9 % en 2018). El 53,9 % es un cálculo propio: 15.120 euros (1.080 × 14) entre el salario medio anual del INE, que incluye el tiempo parcial.",
    i18n: {
      ca: {
        topic: "Salari mínim al 60 % del salari mitjà",
        summary: "El Govern va fixar el salari mínim del 2023 en 1.080 euros al mes en 14 pagues (Reial decret 99/2023), el preàmbul del qual declara assolit el 60 % del salari mitjà. Les mesures independents del salari brut no arriben a aquesta xifra: Eurostat situa el salari mínim en el 49,1 % del salari brut mensual mitjà el 2023, i l'OCDE en el 44,0 % del salari mitjà a temps complet. Amb l'Enquesta d'Estructura Salarial de l'INE (salari mitjà anual de 28.049,94 euros el 2023), els 15.120 euros anuals són el 53,9 %.",
        note: "Abans «compleix», basat només en el preàmbul del reial decret (regla d'independència de la font, 2026-10-07). El 60 % només surt amb la mesura que va triar el Govern: salari net d'un treballador a temps complet, segons la seva comissió assessora. Cap mesura independent del salari brut mitjà no arriba al 60 % (Eurostat: 49,1 % el 2023 i 51,9 % el 2025; OCDE: 44,0 % i 46,2 %). La promesa deia «salari mitjà» sense precisar brut o net. El salari mínim sí que va pujar molt respecte al salari mitjà (Eurostat: 37,9 % el 2018). El 53,9 % és un càlcul propi: 15.120 euros (1.080 × 14) entre el salari mitjà anual de l'INE, que inclou el temps parcial.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Salario mínimo ao 60 % do salario medio",
        summary: "O Goberno fixou o salario mínimo de 2023 en 1.080 euros ao mes en 14 pagas (Real decreto 99/2023), cuxo preámbulo declara alcanzado o 60 % do salario medio. As medicións independentes do salario bruto non chegan a esa cifra: Eurostat sitúa o salario mínimo no 49,1 % do salario bruto mensual medio en 2023, e a OCDE no 44,0 % do salario medio a tempo completo. Coa Enquisa de Estrutura Salarial do INE (salario medio anual de 28.049,94 euros en 2023), os 15.120 euros anuais son o 53,9 %.",
        note: "Antes «cumpre», apoiado só no preámbulo do real decreto (regra de independencia da fonte, 2026-10-07). O 60 % só sae coa medida que escolleu o Goberno: salario neto dun traballador a tempo completo, segundo a súa comisión asesora. Ningunha medida independente do salario bruto medio chega ao 60 % (Eurostat: 49,1 % en 2023 e 51,9 % en 2025; OCDE: 44,0 % e 46,2 %). A promesa dicía «salario medio» sen precisar bruto ou neto. O salario mínimo si subiu moito respecto ao salario medio (Eurostat: 37,9 % en 2018). O 53,9 % é un cálculo propio: 15.120 euros (1.080 × 14) entre o salario medio anual do INE, que inclúe o tempo parcial.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Gutxieneko soldata batez besteko soldataren % 60an",
        summary: "Gobernuak 2023ko gutxieneko soldata hilean 1.080 eurotan finkatu zuen, 14 ordainalditan (99/2023 Errege Dekretua), eta haren hitzaurreak dio batez besteko soldataren % 60a lortu dela. Soldata gordinaren neurketa independenteak ez dira zifra horretara iristen: Eurostaten arabera, gutxieneko soldata hileko batez besteko soldata gordinaren % 49,1 zen 2023an, eta ELGAren arabera lanaldi osoko batez besteko soldataren % 44,0. INEren Soldata Egituraren Inkestarekin (2023an urteko batez besteko soldata 28.049,94 euro), urteko 15.120 euroak % 53,9 dira.",
        note: "Lehen «betetzen du», errege-dekretuaren hitzaurrean soilik oinarrituta (iturriaren independentziaren araua, 2026-10-07). % 60a Gobernuak aukeratutako neurriarekin baino ez da ateratzen: lanaldi osoko langile baten soldata garbia, bere aholku-batzordearen arabera. Batez besteko soldata gordinaren neurketa independente bakar bat ere ez da % 60ra iristen (Eurostat: % 49,1 2023an eta % 51,9 2025ean; ELGA: % 44,0 eta % 46,2). Promesak «batez besteko soldata» zioen, gordina ala garbia zehaztu gabe. Gutxieneko soldata asko igo zen batez besteko soldatarekiko (Eurostat: % 37,9 2018an). % 53,9 kalkulu propioa da: 15.120 euro (1.080 × 14) zati INEren urteko batez besteko soldata, lanaldi partziala barne.",
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
        "El Ministerio de Vivienda y Agenda Urbana cifra en 120.479 las viviendas «movilizadas en diferentes fases (desde entregadas a fase de construcción)» de su Plan de Vivienda en Alquiler Asequible, cuya meta sitúa en «más de 183.000 viviendas». «Movilizada» no es una categoría de ninguna estadística oficial. La serie estadística del propio Ministerio cuenta 32.444 viviendas protegidas terminadas (calificaciones definitivas) en toda España de 2024 al primer trimestre de 2026, de todas las administraciones y para venta o alquiler. El Tribunal de Cuentas constató que ninguna de las actuaciones del Plan que fiscalizó estaba terminada. Las Cortes se disolvieron el 6-10-2026.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Plan de Vivienda en Alquiler Asequible — viviendas asequibles movilizadas por el Gobierno",
          url: MIVAU_PVAA,
          date: "2025-12-05",
          publisher: "Ministerio de Vivienda y Agenda Urbana",
          value:
            "120.479 viviendas movilizadas (68.325 Entidad Estatal de Vivienda; 24.867 Plan de Recuperación; 9.489 Fondo Social de Vivienda; 8.300 Plan Estatal; 6.102 subvenciones directas; 3.396 préstamos ICO), frente a una meta de más de 183.000",
          sourceType: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Nota de prensa: «El Gobierno de España ya ha movilizado 80.745 viviendas del Plan de Vivienda en Alquiler Asequible»",
          url: "https://www.mivau.gob.es/recursos_mfom/sala_prensa/240813_np_mivau_pvaa_acc.pdf",
          date: "2024-08-13",
          publisher: "Ministerio de Vivienda y Agenda Urbana",
          value: "80.745 viviendas movilizadas, el 43,88 % del objetivo de habilitar 184.000",
          sourceType: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Vivienda y rehabilitación protegida — calificaciones definitivas (viviendas protegidas terminadas) por provincia, conjunto de datos VDP007_01, tabla 1.6 (suma de las 52 provincias)",
          url: "https://cdn.mivau.gob.es/portal-web-mivau/Datos_MIVAU/CSV/VDP007_01.csv",
          date: "2026-03-31",
          publisher: "Ministerio de Vivienda y Agenda Urbana (estadística)",
          value: "Viviendas protegidas terminadas en España: 8.847 (2023), 14.371 (2024), 12.858 (2025) y 5.215 (primer trimestre de 2026)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Tribunal de Cuentas — Informe de fiscalización n.º 1.640, sobre la actividad de SEPES en la ejecución de vivienda pública, 2018–2023 (conclusiones 25 y 26, pp. 86–92 impresas)",
          url: "https://www.congreso.es/docu/inf_fiscTC/LegXV/251-179.pdf",
          date: "2025-09-25",
          publisher: "Tribunal de Cuentas",
          value: "Plan de Vivienda en Alquiler Asequible: 18 actuaciones con unas 16.800 viviendas a 31-12-2023; «ninguna de las actuaciones analizadas había finalizado y en todas ellas se han producido incidencias y demoras importantes»; coste estimado +18 % entre 2022 y 2024",
          sourceType: "independiente",
        },
        DISOLUCION_2026,
      ],
    },
    verdict: "parcial",
    note:
      "Revisada el 2026-10-07 con la regla de independencia de la fuente; la etiqueta no cambia, pero ya no se apoya solo en el Ministerio. Las 120.479 viviendas «movilizadas» (el 66 % de 183.000) son la métrica del propio Gobierno e incluyen viviendas en construcción y fases previas; el Ministerio no publica cuántas se han entregado. Lo que mide la estadística oficial son viviendas protegidas terminadas: 32.444 desde 2024 en toda España, contando las de comunidades y ayuntamientos y las de venta, así que ni siquiera esa cifra es atribuible entera al compromiso. El Tribunal de Cuentas, sobre 15.300 viviendas del Plan que fiscalizó, no encontró ninguna actuación terminada y pone en duda «la eficacia de los resultados pretendidos». Se queda en «parcial» y no en «no lo hicieron» porque hay viviendas en marcha y alguna entregada según el Ministerio, pero la distancia con las 183.000 es mucho mayor que la que sugiere su cifra. El Ministerio dio 183.000 en su página y 184.000 en la nota de 2024.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El Ministeri d'Habitatge i Agenda Urbana xifra en 120.479 els habitatges «movilizadas en diferentes fases (desde entregadas a fase de construcción)» del seu Pla d'Habitatge en Lloguer Assequible, la meta del qual situa en «más de 183.000 viviendas». «Mobilitzat» no és una categoria de cap estadística oficial. La sèrie estadística del mateix Ministeri compta 32.444 habitatges protegits acabats (qualificacions definitives) a tot Espanya del 2024 al primer trimestre del 2026, de totes les administracions i per a venda o lloguer. El Tribunal de Comptes va constatar que cap de les actuacions del Pla que va fiscalitzar no estava acabada. Les Corts es van dissoldre el 6-10-2026.",
        note: "Revisada el 2026-10-07 amb la regla d'independència de la font; l'etiqueta no canvia, però ja no es basa només en el Ministeri. Els 120.479 habitatges «mobilitzats» (el 66 % de 183.000) són la mètrica del mateix Govern i inclouen habitatges en construcció i fases prèvies; el Ministeri no publica quants se n'han lliurat. El que mesura l'estadística oficial són habitatges protegits acabats: 32.444 des del 2024 a tot Espanya, comptant els de comunitats i ajuntaments i els de venda, de manera que ni tan sols aquesta xifra és atribuïble sencera al compromís. El Tribunal de Comptes, sobre 15.300 habitatges del Pla que va fiscalitzar, no va trobar cap actuació acabada i posa en dubte «la eficacia de los resultados pretendidos». Es queda en «parcial» i no en «no ho van fer» perquè hi ha habitatges en marxa i algun de lliurat segons el Ministeri, però la distància amb els 183.000 és molt més gran que la que suggereix la seva xifra. El Ministeri va donar 183.000 a la pàgina i 184.000 a la nota del 2024.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Vivenda",
        summary: "O Ministerio de Vivenda e Axenda Urbana cifra en 120.479 as vivendas «movilizadas en diferentes fases (desde entregadas a fase de construcción)» do seu Plan de Vivenda en Alugamento Accesible, cuxa meta sitúa en «más de 183.000 viviendas». «Mobilizada» non é unha categoría de ningunha estatística oficial. A serie estatística do propio Ministerio conta 32.444 vivendas protexidas rematadas (cualificacións definitivas) en toda España de 2024 ao primeiro trimestre de 2026, de todas as administracións e para venda ou alugamento. O Tribunal de Contas constatou que ningunha das actuacións do Plan que fiscalizou estaba rematada. As Cortes disolvéronse o 6-10-2026.",
        note: "Revisada o 2026-10-07 coa regra de independencia da fonte; a etiqueta non cambia, pero xa non se apoia só no Ministerio. As 120.479 vivendas «mobilizadas» (o 66 % de 183.000) son a métrica do propio Goberno e inclúen vivendas en construción e fases previas; o Ministerio non publica cantas se entregaron. O que mide a estatística oficial son vivendas protexidas rematadas: 32.444 desde 2024 en toda España, contando as de comunidades e concellos e as de venda, así que nin sequera esa cifra é atribuíble enteira ao compromiso. O Tribunal de Contas, sobre 15.300 vivendas do Plan que fiscalizou, non atopou ningunha actuación rematada e pon en dúbida «la eficacia de los resultados pretendidos». Queda en «parcial» e non en «non o fixeron» porque hai vivendas en marcha e algunha entregada segundo o Ministerio, pero a distancia coas 183.000 é moito maior que a que suxire a súa cifra. O Ministerio deu 183.000 na súa páxina e 184.000 na nota de 2024.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Etxebizitza eta Hiri Agendako Ministerioak 120.479tan zenbatesten ditu Alokairu Eskuragarriko Etxebizitza Planeko etxebizitza «movilizadas en diferentes fases (desde entregadas a fase de construcción)», eta helburua «más de 183.000 viviendas» da. «Mobilizatua» ez da inongo estatistika ofizialeko kategoria. Ministerioaren beraren serie estatistikoak 32.444 babes ofizialeko etxebizitza amaitu (behin betiko kalifikazioak) zenbatzen ditu Espainia osoan 2024tik 2026ko lehen hiruhilekora arte, administrazio guztienak eta salmentarako zein alokairurako. Kontuen Auzitegiak egiaztatu zuen fiskalizatu zituen Planeko jardueretako bat ere ez zegoela amaituta. Gorteak 6-10-2026an desegin ziren.",
        note: "2026-10-07an berrikusia, iturriaren independentziaren arauarekin; etiketa ez da aldatzen, baina jada ez da Ministerioan soilik oinarritzen. «Mobilizatutako» 120.479 etxebizitzak (183.000en % 66) Gobernuaren beraren neurria dira, eta eraikitzen ari diren etxebizitzak eta aurreko faseak barne hartzen dituzte; Ministerioak ez du argitaratzen zenbat entregatu diren. Estatistika ofizialak amaitutako babes ofizialeko etxebizitzak neurtzen ditu: 32.444 2024tik Espainia osoan, erkidegoenak eta udalenak eta salmentakoak barne; beraz, zifra hori ere ezin zaio osorik konpromisoari egotzi. Kontuen Auzitegiak, fiskalizatu zituen Planeko 15.300 etxebizitzetan, ez zuen amaitutako jarduerarik aurkitu, eta zalantzan jartzen du «la eficacia de los resultados pretendidos». «Partziala» geratzen da, eta ez «ez zuten egin», Ministerioaren arabera etxebizitzak martxan daudelako eta batzuk entregatu direlako, baina 183.000etarainoko aldea haren zifrak iradokitzen duena baino askoz handiagoa da. Ministerioak 183.000 eman zituen bere orrian eta 184.000 2024ko oharrean.",
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
        "La línea de avales se puso en marcha. Según la adenda del convenio entre el Ministerio de Vivienda y el ICO publicada en el BOE, a 31-10-2025 se habían formalizado 8.549 operaciones (6.119 de jóvenes y 2.430 de familias con menores a cargo), con 206,6 millones de euros avalados. La adenda prorroga hasta el 31-12-2027 el plazo para formalizar operaciones. La serie de datos abiertos del ICO cuenta 10.454 operaciones acumuladas a diciembre de 2025, con 255,9 millones de euros avalados.",
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
          sourceType: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Tabla de actividad mensual y acumulada de la Línea de Avales ICO-MIVAU para la adquisición de primera vivienda por CCAA, diciembre de 2025 (datos abiertos del ICO), fila «Total general»",
          url: "https://www.ico.es/documents/20124/1247246/Tabla+de+actividad+mensual+y+acumulada+de+la+Linea+de+Avales+ICO+MIVAU+para+la+adquisicion+de+primera+vivienda+por+CCAA+diciembre+2025.csv",
          date: "2025-12-31",
          publisher: "Instituto de Crédito Oficial (estadística de actividad)",
          value: "10.454 operaciones acumuladas; 255.864.390 euros avalados; 1.344.387.902 euros financiados",
          sourceType: "estadistica-oficial",
        },
      ],
    },
    verdict: "parcial",
    note:
      "La línea existe y funciona (creada por el art. 191 del Real Decreto-ley 5/2023, antes del acuerdo), pero a 31-10-2025 había 8.549 compras avaladas frente a «unas 50.000» (alrededor del 17 %), y solo 206,6 de los 2.500 millones de euros comprometidos en avales. El plazo para formalizar operaciones sigue abierto hasta el 31-12-2027, así que la cifra aún puede subir; no hay dato oficial posterior al 31-10-2025 localizado.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "La línia d'avals es va posar en marxa. Segons l'addenda del conveni entre el Ministeri d'Habitatge i l'ICO publicada al BOE, a 31-10-2025 s'havien formalitzat 8.549 operacions (6.119 de joves i 2.430 de famílies amb menors a càrrec), amb 206,6 milions d'euros avalats. L'addenda prorroga fins al 31-12-2027 el termini per formalitzar operacions. La sèrie de dades obertes de l'ICO compta 10.454 operacions acumulades al desembre del 2025, amb 255,9 milions d'euros avalats.",
        note: "Revisada el 2026-10-07 amb la regla d'independència de la font: la dada de l'addenda és del mateix Ministeri i de l'ICO; s'hi afegeix la sèrie estadística d'activitat de l'ICO, que al desembre del 2025 dona 10.454 operacions (al voltant del 21 % de 50.000). Aquesta sèrie, reconstruïda a 31-10-2025, dona 8.718 operacions i no 8.549 com l'addenda; no se n'ha trobat l'explicació. L'etiqueta no canvia. Revisada el 2026-10-07 con la regla de independencia de la fuente: el dato de la adenda es del propio Ministerio y del ICO; se añade la serie estadística de actividad del ICO, que a diciembre de 2025 da 10.454 operaciones (alrededor del 21 % de 50.000). Esa serie, reconstruida a 31-10-2025, da 8.718 operaciones y no 8.549 como la adenda; no se ha encontrado la explicación. La etiqueta no cambia. La línia existeix i funciona (creada per l'art. 191 del Reial decret llei 5/2023, abans de l'acord), però a 31-10-2025 hi havia 8.549 compres avalades davant de «unas 50.000» (al voltant del 17 %), i només 206,6 dels 2.500 milions d'euros compromesos en avals. El termini per formalitzar operacions continua obert fins al 31-12-2027, de manera que la xifra encara pot augmentar; no s'ha localitzat cap dada oficial posterior al 31-10-2025.",
        role: "acord programàtic de Govern signat pels dos partits",
      },
      gl: {
        topic: "Vivenda",
        summary: "A liña de avais púxose en marcha. Segundo a addenda do convenio entre o Ministerio de Vivenda e o ICO publicada no BOE, a 31-10-2025 formalizáranse 8.549 operacións (6.119 de mozos e 2.430 de familias con menores a cargo), con 206,6 millóns de euros avalados. A addenda prorroga ata o 31-12-2027 o prazo para formalizar operacións. A serie de datos abertos do ICO conta 10.454 operacións acumuladas a decembro de 2025, con 255,9 millóns de euros avalados.",
        note: "Revisada o 2026-10-07 coa regra de independencia da fonte: o dato da addenda é do propio Ministerio e do ICO; engádese a serie estatística de actividade do ICO, que a decembro de 2025 dá 10.454 operacións (arredor do 21 % de 50.000). Esa serie, reconstruída a 31-10-2025, dá 8.718 operacións e non 8.549 como a addenda; non se atopou a explicación. A etiqueta non cambia. A liña existe e funciona (creada polo art. 191 do Real decreto-lei 5/2023, antes do acordo), pero a 31-10-2025 había 8.549 compras avaladas fronte a «unas 50.000» (arredor do 17 %), e só 206,6 dos 2.500 millóns de euros comprometidos en avais. O prazo para formalizar operacións segue aberto ata o 31-12-2027, así que a cifra aínda pode subir; non se localizou ningún dato oficial posterior ao 31-10-2025.",
        role: "acordo programático de Goberno asinado polos dous partidos",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "Abal-lerroa martxan jarri zen. Etxebizitza Ministerioaren eta ICOren arteko hitzarmenaren BOEn argitaratutako eranskinaren arabera, 31-10-2025erako 8.549 eragiketa formalizatu ziren (6.119 gazteenak eta 2.430 adingabeak ardurapean dituzten familienak), 206,6 milioi euro abalaturekin. Eranskinak 31-12-2027ra arte luzatzen du eragiketak formalizatzeko epea. ICOren datu irekien serieak 10.454 eragiketa metatu zenbatzen ditu 2025eko abenduan, 255,9 milioi euro abalaturekin.",
        note: "2026-10-07an berrikusia, iturriaren independentziaren arauarekin: eranskineko datua Ministerioarena eta ICOrena berarena da; ICOren jarduera-serie estatistikoa gehitzen da, eta 2025eko abenduan 10.454 eragiketa ematen ditu (50.000en % 21 inguru). Serie horrek, 2025-10-31ra berreraikita, 8.718 eragiketa ematen ditu, eta ez 8.549 eranskinak bezala; ez da azalpenik aurkitu. Etiketa ez da aldatzen. Lerroa badago eta badabil (5/2023 Errege Lege-dekretuaren 191. artikuluak sortu zuen, akordioa baino lehen), baina 31-10-2025ean 8.549 erosketa abalatu zeuden, «unas 50.000» haien aldean (% 17 inguru), eta abaletan konprometitutako 2.500 milioi euroetatik 206,6 bakarrik. Eragiketak formalizatzeko epea irekita dago 31-12-2027ra arte, eta, beraz, zifra oraindik igo daiteke; ez da aurkitu 31-10-2025etik aurrerako datu ofizialik.",
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
      "Se comparan créditos iniciales del mismo programa presupuestario (261N), no gasto ejecutado: la ejecución no se ha contrastado. El presupuesto de 2019 era el de 2018 prorrogado (aprobado con el Gobierno del PP). La comparación llega a los PGE de 2023 (Ley 31/2022, BOE de 24-12-2022, fecha que se toma como la del hecho); los ejercicios posteriores no se han contrastado.",
    i18n: {
      ca: {
        topic: "Habitatge",
        summary: "El programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») va passar de 450,7 milions d'euros en el pressupost prorrogat del 2019 a 570,8 en els PGE del 2021, 771,5 en els del 2022 i 959,5 en els del 2023 (crèdits inicials). A més, des del 2021 els PGE inclouen programes d'habitatge finançats pel Mecanisme de Recuperació i Resiliència. Segons la liquidació del pressupost de la IGAE, la despesa realment reconeguda en la política d'habitatge va pujar de 411,5 milions d'euros el 2019 a 2.487,9 milions el 2023, tot i que aquell any només es va executar el 49,4 % dels crèdits definitius.",
        note: "Revisada el 2026-10-07 amb la regla d'independència de la font: es manté «compleix» perquè el compromís era augmentar la dotació i la despesa executada també va créixer (IGAE). Matís: el grau d'execució de la política d'habitatge va caure del 97,2 % el 2020 al 49,4 % el 2023 i al 32,7 % el 2024, i el Tribunal de Comptes assenyala que el 2023 el programa d'habitatges de lloguer social del Pla de Recuperació va reconèixer 294,8 dels seus 500 milions sense que el Ministeri informés del seu grau d'execució. Revisada el 2026-10-07 con la regla de independencia de la fuente: se mantiene «cumple» porque el compromiso era aumentar la dotación y el gasto ejecutado también creció (IGAE). Matiz: el grado de ejecución de la política de vivienda cayó del 97,2 % en 2020 al 49,4 % en 2023 y al 32,7 % en 2024, y el Tribunal de Cuentas señala que en 2023 el programa de viviendas de alquiler social del Plan de Recuperación reconoció 294,8 de sus 500 millones sin que el Ministerio informara de su grado de ejecución. Es comparen crèdits inicials del mateix programa pressupostari (261N), no despesa executada: l'execució no s'ha contrastat. El pressupost del 2019 era el del 2018 prorrogat (aprovat amb el Govern del PP). La comparació arriba fins als PGE del 2023 (Llei 31/2022, BOE del 24-12-2022, data que es pren com la del fet); els exercicis posteriors no s'han contrastat.",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Vivenda",
        summary: "O programa 261N («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») pasou de 450,7 millóns de euros no orzamento prorrogado de 2019 a 570,8 nos PGE de 2021, 771,5 nos de 2022 e 959,5 nos de 2023 (créditos iniciais). Ademais, desde 2021 os PGE inclúen programas de vivenda financiados polo Mecanismo de Recuperación e Resiliencia. Segundo a liquidación do orzamento da IGAE, o gasto realmente recoñecido na política de vivenda subiu de 411,5 millóns de euros en 2019 a 2.487,9 millóns en 2023, aínda que ese ano só se executou o 49,4 % dos créditos definitivos.",
        note: "Revisada o 2026-10-07 coa regra de independencia da fonte: mantense «cumpre» porque o compromiso era aumentar a dotación e o gasto executado tamén medrou (IGAE). Matiz: o grao de execución da política de vivenda caeu do 97,2 % en 2020 ao 49,4 % en 2023 e ao 32,7 % en 2024, e o Tribunal de Contas sinala que en 2023 o programa de vivendas de alugamento social do Plan de Recuperación recoñeceu 294,8 dos seus 500 millóns sen que o Ministerio informase do seu grao de execución. Compáranse créditos iniciais do mesmo programa orzamentario (261N), non gasto executado: a execución non se contrastou. O orzamento de 2019 era o de 2018 prorrogado (aprobado co Goberno do PP). A comparación chega ata os PGE de 2023 (Lei 31/2022, BOE do 24-12-2022, data que se toma como a do feito); os exercicios posteriores non se contrastaron.",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "Etxebizitza",
        summary: "261N programa («Promoción, administración y ayudas para rehabilitación y acceso a vivienda») 2019ko aurrekontu luzatuko 450,7 milioi eurotik 2021eko PGEetako 570,8ra, 2022koetako 771,5era eta 2023koetako 959,5era igo zen (hasierako kredituak). Gainera, 2021etik, PGEek Suspertze eta Erresilientzia Mekanismoak finantzatutako etxebizitza-programak dituzte. IGAEren aurrekontu-likidazioaren arabera, etxebizitza-politikan benetan aitortutako gastua 411,5 milioi eurotik (2019) 2.487,9 milioira (2023) igo zen, nahiz eta urte horretan behin betiko kredituen % 49,4 baino ez zen gauzatu.",
        note: "2026-10-07an berrikusia, iturriaren independentziaren arauarekin: «betetzen du» mantentzen da, konpromisoa zuzkidura handitzea zelako eta gauzatutako gastua ere hazi zelako (IGAE). Ñabardura: etxebizitza-politikaren gauzatze-maila % 97,2tik (2020) % 49,4ra (2023) eta % 32,7ra (2024) jaitsi zen, eta Kontuen Auzitegiak dio 2023an Suspertze Planeko alokairu sozialeko etxebizitzen programak bere 500 milioietatik 294,8 aitortu zituela, Ministerioak haren gauzatze-mailari buruzko informaziorik eman gabe. Aurrekontu-programa bereko (261N) hasierako kredituak alderatzen dira, ez gauzatutako gastua: gauzatzea ez da egiaztatu. 2019ko aurrekontua 2018koa zen, luzatuta (PPren Gobernuarekin onartua). Alderaketa 2023ko PGEetaraino iristen da (31/2022 Legea, 24-12-2022ko BOE; data hori hartzen da egitatearen datatzat); ondorengo ekitaldiak ez dira egiaztatu.",
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
    note: "Se contrasta la creación de la prestación. Su cobertura frente a los 850.000 hogares anunciados, medida por la AIReF, está en la entrada «psoe-imv-850000-hogares-2020».",
    i18n: {
      ca: {
        topic: "Ingrés mínim vital",
        summary: "El Govern va aprovar el Reial decret llei 20/2020, que crea l'ingrés mínim vital com a prestació no contributiva de la Seguretat Social. El decret es va tramitar després com a projecte de llei i es va publicar com a Llei 19/2021.",
        note: "Es contrasta la creació de la prestació. La seva cobertura davant de les 850.000 llars anunciades, mesurada per l'AIReF, és a l'entrada «psoe-imv-850000-hogares-2020».",
        role: "signants de l'acord de Govern de coalició",
      },
      gl: {
        topic: "Ingreso mínimo vital",
        summary: "O Goberno aprobou o Real decreto-lei 20/2020, que crea o ingreso mínimo vital como prestación non contributiva da Seguridade Social. O decreto tramitouse despois como proxecto de lei e publicouse como Lei 19/2021.",
        note: "Contrástase a creación da prestación. A súa cobertura fronte aos 850.000 fogares anunciados, medida pola AIReF, está na entrada «psoe-imv-850000-hogares-2020».",
        role: "asinantes do acordo de Goberno de coalición",
      },
      eu: {
        topic: "Bizitzeko gutxieneko diru-sarrera",
        summary: "Gobernuak 20/2020 Errege Lege-dekretua onartu zuen, bizitzeko gutxieneko diru-sarrera Gizarte Segurantzaren kotizaziorik gabeko prestazio gisa sortzen duena. Dekretua lege-proiektu gisa izapidetu zen gero, eta 19/2021 Lege gisa argitaratu.",
        note: "Prestazioaren sorrera egiaztatzen da. Iragarritako 850.000 etxeen aldean duen estaldura, AIReFek neurtua, «psoe-imv-850000-hogares-2020» sarreran dago.",
        role: "koalizio-Gobernuaren akordioaren sinatzaileak",
      },
    },
  },
  {
    id: "psoe-imv-850000-hogares-2020",
    partyId: "psoe",
    topic: "Ingreso mínimo vital",
    said: {
      speaker: "Ministerio de Inclusión, Seguridad Social y Migraciones (Gobierno presidido por Pedro Sánchez)",
      role: "nota del ministerio tras el Consejo de Ministros que aprobó el Real Decreto-ley 20/2020 (ministro: José Luis Escrivá)",
      date: "2020-05-29",
      text: "Llegará a 850.000 hogares en los que viven 2,3 millones de personas, con especial incidencia en los hogares en los que viven menores",
      source: {
        url: "https://www.inclusion.gob.es/w/el-gobierno-aprueba-la-creacion-de-un-ingreso-minimo-vital",
        title: "Ministerio de Inclusión, Seguridad Social y Migraciones — «El Gobierno aprueba la creación de un Ingreso Mínimo Vital» (29-5-2020), subtítulo",
        date: "2020-05-29",
        kind: "gobierno",
      },
    },
    did: {
      date: "2025-12-31",
      summary:
        "Según la Autoridad Independiente de Responsabilidad Fiscal (AIReF), a 31-12-2025 cobraban el ingreso mínimo vital 484.792 hogares en toda España (455.401 en territorio fiscal común, el 44,2 % de los hogares que podrían cobrarlo). El 52 % de los hogares con derecho no lo solicita. A finales de 2021 eran 284.000 hogares (el 40 % de los potenciales).",
      evidence: [
        {
          kind: "dato-oficial",
          title: "AIReF — Quinta opinión sobre el Ingreso Mínimo Vital (julio de 2026), pp. 9, 21 (nota 8), 26 y 28 del PDF",
          url: "https://www.airef.es/wp-content/uploads/2026/07/IMV/IMV_Opinion5.pdf",
          date: "2025-12-31",
          publisher: "Autoridad Independiente de Responsabilidad Fiscal (AIReF)",
          value: "484.792 hogares con IMV en toda España a 31-12-2025; 455.401 en territorio común = 44,2 % de 1.031.442 hogares potenciales; 52 % de los hogares elegibles no lo solicita",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "AIReF — Opinión 1/22 sobre el Ingreso Mínimo Vital (19-7-2022), pp. 7 y 10 del PDF",
          url: "https://www.airef.es/wp-content/uploads/2022/08/IMV/OPINION-AIREF-IMV.pdf",
          date: "2021-12-31",
          publisher: "Autoridad Independiente de Responsabilidad Fiscal (AIReF)",
          value: "284.000 hogares en diciembre de 2021 (40 % de unos 700.000 potenciales); 400.000 hogares con derecho no lo habían solicitado (57 %)",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "La Moncloa — nota de prensa del Ministerio de Inclusión sobre el ingreso mínimo vital en agosto de 2026 (7-9-2026)",
          url: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/paginas/2026/070926-ingreso-minimo-vital-agosto.aspx",
          date: "2026-09-07",
          publisher: "Ministerio de Inclusión, Seguridad Social y Migraciones (La Moncloa)",
          value: "«ha llegado en agosto a 893.820 hogares en los que viven 2.725.899 personas»",
          sourceType: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Añadida el 2026-10-07 con la regla de independencia de la fuente. La prestación existe y su alcance crece cada año, pero según la AIReF, cinco años y medio después llegaba a unos 485.000 hogares, el 57 % de los 850.000 anunciados, y más de la mitad de los hogares con derecho no la pide. La cifra del Gobierno de agosto de 2026 (893.820 hogares) no dice en la nota si incluye los hogares que solo cobran el complemento de ayuda para la infancia, que la AIReF cuenta aparte; por eso la etiqueta se apoya en la AIReF. Se atribuye al PSOE porque presidía el Gobierno que aprobó la prestación y nombró al ministro.",
    i18n: {
      ca: {
        topic: "Ingrés mínim vital",
        summary: "Segons l'Autoritat Independent de Responsabilitat Fiscal (AIReF), a 31-12-2025 cobraven l'ingrés mínim vital 484.792 llars a tot Espanya (455.401 en territori fiscal comú, el 44,2 % de les llars que podrien cobrar-lo). El 52 % de les llars amb dret no el sol·licita. A finals del 2021 eren 284.000 llars (el 40 % de les potencials).",
        note: "Afegida el 2026-10-07 amb la regla d'independència de la font. La prestació existeix i el seu abast creix cada any, però segons l'AIReF, cinc anys i mig després arribava a unes 485.000 llars, el 57 % de les 850.000 anunciades, i més de la meitat de les llars amb dret no la demana. La xifra del Govern d'agost del 2026 (893.820 llars) no diu a la nota si inclou les llars que només cobren el complement d'ajuda per a la infància, que l'AIReF compta a part; per això l'etiqueta es basa en l'AIReF. S'atribueix al PSOE perquè presidia el Govern que va aprovar la prestació i va nomenar el ministre.",
        role: "nota del ministeri després del Consell de Ministres que va aprovar el Reial decret llei 20/2020 (ministre: José Luis Escrivá)",
      },
      gl: {
        topic: "Ingreso mínimo vital",
        summary: "Segundo a Autoridade Independente de Responsabilidade Fiscal (AIReF), a 31-12-2025 cobraban o ingreso mínimo vital 484.792 fogares en toda España (455.401 en territorio fiscal común, o 44,2 % dos fogares que poderían cobralo). O 52 % dos fogares con dereito non o solicita. A finais de 2021 eran 284.000 fogares (o 40 % dos potenciais).",
        note: "Engadida o 2026-10-07 coa regra de independencia da fonte. A prestación existe e o seu alcance medra cada ano, pero segundo a AIReF, cinco anos e medio despois chegaba a uns 485.000 fogares, o 57 % dos 850.000 anunciados, e máis da metade dos fogares con dereito non a pide. A cifra do Goberno de agosto de 2026 (893.820 fogares) non di na nota se inclúe os fogares que só cobran o complemento de axuda para a infancia, que a AIReF conta á parte; por iso a etiqueta apóiase na AIReF. Atribúeselle ao PSOE porque presidía o Goberno que aprobou a prestación e nomeou o ministro.",
        role: "nota do ministerio tras o Consello de Ministros que aprobou o Real decreto-lei 20/2020 (ministro: José Luis Escrivá)",
      },
      eu: {
        topic: "Bizitzeko gutxieneko diru-sarrera",
        summary: "Erantzukizun Fiskalerako Agintaritza Independentearen (AIReF) arabera, 2025-12-31n 484.792 etxek kobratzen zuten bizitzeko gutxieneko diru-sarrera Espainia osoan (455.401 lurralde fiskal erkidean, hura kobra zezaketen etxeen % 44,2). Eskubidea duten etxeen % 52k ez du eskatzen. 2021aren amaieran 284.000 etxe ziren (potentzialen % 40).",
        note: "2026-10-07an gehitua, iturriaren independentziaren arauarekin. Prestazioa badago eta haren irismena urtero hazten da, baina AIReFen arabera, bost urte eta erdi geroago 485.000 etxe ingurura iristen zen, iragarritako 850.000en % 57ra, eta eskubidea duten etxeen erdiak baino gehiagok ez du eskatzen. Gobernuak 2026ko abuztuan emandako zifrak (893.820 etxe) ez du oharrean esaten haurrentzako laguntza-osagarria soilik kobratzen duten etxeak barne hartzen dituen, AIReFek bereiz zenbatzen baititu; horregatik, etiketa AIReFen oinarritzen da. PSOEri egozten zaio, prestazioa onartu zuen eta ministroa izendatu zuen Gobernuko burua zelako.",
        role: "ministerioaren oharra, 20/2020 Errege Lege-dekretua onartu zuen Ministro Kontseiluaren ondoren (ministroa: José Luis Escrivá)",
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
          sourceType: "estadistica-oficial",
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
          sourceType: "estadistica-oficial",
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
          sourceType: "estadistica-oficial",
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
        "Según Eurostat (notificación de abril de 2026), el déficit del conjunto de las Administraciones públicas fue del 3,3 % del PIB en 2023, del 3,2 % en 2024 y del 2,4 % en 2025; en euros, 50.027, 51.267 y 40.330 millones. La IGAE da cifras muy parecidas (3,52 %, 3,22 % y 2,39 %). La deuda pública bajó del 105,2 % al 100,7 % del PIB, pero subió de 1.575.377 a 1.698.225 millones de euros.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Government deficit/surplus, debt and associated data (gov_10dd_edpt1), España, Administraciones Públicas (S13), B9 y GD",
          url: "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=es",
          date: "2025-12-31",
          publisher: "Eurostat",
          value: "Déficit: −3,3 % del PIB en 2023 (−50.027 M€), −3,2 % en 2024 (−51.267 M€) y −2,4 % en 2025 (−40.330 M€); deuda: 105,2 %, 101,6 % y 100,7 % del PIB",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Recomendación del Consejo a España (documento 11121/26, basado en COM(2026) 209), considerandos 10 y 15",
          url: "https://data.consilium.europa.eu/doc/document/ST-11121-2026-INIT/en/pdf",
          date: "2026-07-03",
          publisher: "Consejo de la Unión Europea",
          value: "Gasto neto: +4,8 % en 2025, «above the recommended maximum growth rate» (desviación del 0,4 % del PIB en el año y del 0,1 % acumulada, dentro de la flexibilidad de la cláusula nacional de escape por gasto en defensa)",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Informe trimestral de las Administraciones Públicas, contabilidad nacional, cuarto trimestre de 2024",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/Cap_Trim/IT_4T_2024.pdf",
          date: "2024-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Necesidad de financiación de las AAPP: 3,52 % del PIB en 2023 y 3,15 % en 2024 (50.187 M€)",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Informe trimestral de las Administraciones Públicas, contabilidad nacional, cuarto trimestre de 2025 (revisión estadística 2024)",
          url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/Cap_Trim/IT_4T_2025.pdf",
          date: "2025-12-31",
          publisher: "Intervención General de la Administración del Estado (Ministerio de Hacienda)",
          value: "Necesidad de financiación de las AAPP: 3,22 % del PIB en 2024 (51.267 M€) y 2,39 % en 2025 (40.330 M€); sin el impacto de la DANA, 2,86 % y 2,18 %",
          sourceType: "estadistica-oficial",
        },
      ],
    },
    verdict: "cumple",
    note:
      "Contrastado con Eurostat (regla de independencia de la fuente, 2026-10-07): se mantiene «cumple». El compromiso era seguir reduciendo el déficit, sin cifra, y en porcentaje del PIB bajó cada año. Matices: en euros, el déficit de 2024 fue mayor que el de 2023; la deuda en euros siguió creciendo; y el Consejo de la UE señala que el gasto neto de 2025 creció por encima del máximo recomendado, aunque dentro de la flexibilidad por gasto en defensa. Parte del descenso de 2025 se debe, según la IGAE, a menores gastos extraordinarios (DANA y sentencias desfavorables). Las cifras de 2023 de Eurostat (3,3 %) y de la IGAE de 2024 (3,52 %) son de revisiones distintas.",
    i18n: {
      ca: {
        topic: "Reducció del dèficit públic",
        summary: "Segons Eurostat (notificació d'abril del 2026), el dèficit del conjunt de les administracions públiques va ser del 3,3 % del PIB el 2023, del 3,2 % el 2024 i del 2,4 % el 2025; en euros, 50.027, 51.267 i 40.330 milions. La IGAE dona xifres molt semblants (3,52 %, 3,22 % i 2,39 %). El deute públic va baixar del 105,2 % al 100,7 % del PIB, però va pujar de 1.575.377 a 1.698.225 milions d'euros.",
        note: "Contrastat amb Eurostat (regla d'independència de la font, 2026-10-07): es manté «compleix». El compromís era continuar reduint el dèficit, sense xifra, i en percentatge del PIB va baixar cada any. Matisos: en euros, el dèficit del 2024 va ser més gran que el del 2023; el deute en euros va continuar creixent; i el Consell de la UE assenyala que la despesa neta del 2025 va créixer per sobre del màxim recomanat, tot i que dins de la flexibilitat per despesa en defensa. Part del descens del 2025 es deu, segons la IGAE, a unes despeses extraordinàries menors (DANA i sentències desfavorables). Les xifres del 2023 d'Eurostat (3,3 %) i de la IGAE del 2024 (3,52 %) són de revisions diferents.",
        role: "candidat a la Presidència del Govern (discurs d'investidura)",
      },
      gl: {
        topic: "Redución do déficit público",
        summary: "Segundo Eurostat (notificación de abril de 2026), o déficit do conxunto das administracións públicas foi do 3,3 % do PIB en 2023, do 3,2 % en 2024 e do 2,4 % en 2025; en euros, 50.027, 51.267 e 40.330 millóns. A IGAE dá cifras moi parecidas (3,52 %, 3,22 % e 2,39 %). A débeda pública baixou do 105,2 % ao 100,7 % do PIB, pero subiu de 1.575.377 a 1.698.225 millóns de euros.",
        note: "Contrastado con Eurostat (regra de independencia da fonte, 2026-10-07): mantense «cumpre». O compromiso era seguir reducindo o déficit, sen cifra, e en porcentaxe do PIB baixou cada ano. Matices: en euros, o déficit de 2024 foi maior que o de 2023; a débeda en euros seguiu crecendo; e o Consello da UE sinala que o gasto neto de 2025 medrou por riba do máximo recomendado, aínda que dentro da flexibilidade por gasto en defensa. Parte do descenso de 2025 débese, segundo a IGAE, a menores gastos extraordinarios (DANA e sentenzas desfavorables). As cifras de 2023 de Eurostat (3,3 %) e da IGAE de 2024 (3,52 %) son de revisións distintas.",
        role: "candidato á Presidencia do Goberno (discurso de investidura)",
      },
      eu: {
        topic: "Defizit publikoaren murrizketa",
        summary: "Eurostaten arabera (2026ko apirileko jakinarazpena), administrazio publiko guztien defizita BPGaren % 3,3 izan zen 2023an, % 3,2 2024an eta % 2,4 2025ean; eurotan, 50.027, 51.267 eta 40.330 milioi. IGAEk oso antzeko zifrak ematen ditu (% 3,52, % 3,22 eta % 2,39). Zor publikoa BPGaren % 105,2tik % 100,7ra jaitsi zen, baina 1.575.377 milioi eurotik 1.698.225 milioira igo zen.",
        note: "Eurostatekin egiaztatua (iturriaren independentziaren araua, 2026-10-07): «betetzen du» mantentzen da. Konpromisoa defizita murrizten jarraitzea zen, zifrarik gabe, eta BPGaren ehunekotan urtero jaitsi zen. Ñabardurak: eurotan, 2024ko defizita 2023koa baino handiagoa izan zen; zorrak eurotan hazten jarraitu zuen; eta EBko Kontseiluak dio 2025eko gastu garbia gomendatutako gehienekoaren gainetik hazi zela, defentsa-gastuagatiko malgutasunaren barruan bada ere. IGAEren arabera, 2025eko jaitsieraren zati bat aparteko gastu txikiagoei zor zaie (DANA eta aurkako epaiak). Eurostaten 2023ko zifra (% 3,3) eta IGAEren 2024ko zifra (% 3,52) berrikuspen desberdinetakoak dira.",
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

  // ─── Corrupción (añadido el 2026-10-07) ─────────────────────────────────
  // Hechos judiciales solo de documentos del Poder Judicial (notas de la
  // Oficina de Comunicación del CGPJ con la resolución enlazada) y hechos
  // parlamentarios del Congreso y del Senado. Situación procesal tal como la
  // dice el documento; nada de prensa (lo descartado está en busqueda.ts).
  {
    id: "psoe-corrupcion-mocion-censura-2018",
    partyId: "psoe",
    topic: "Corrupción",
    said: {
      speaker: SANCHEZ,
      role: "candidato a la Presidencia del Gobierno (moción de censura, réplica al presidente del Gobierno)",
      date: "2018-05-31",
      text: "No hay ningún partido inmune a la corrupción. Lo que hay que hacer es prevenir esa corrupción, actuar cuando se produce esa corrupción y asumir las responsabilidades políticas cuando se produce esa corrupción.",
      source: {
        url: "https://www.congreso.es/public_oficiales/L12/CONG/DS/PL/DSCD-12-PL-126.PDF#page=32",
        title: "Diario de Sesiones del Congreso de los Diputados, Pleno, XII legislatura, núm. 126 (31-5-2018): moción de censura",
        date: "2018-05-31",
        page: "32",
        kind: "diario-sesiones",
      },
    },
    did: {
      date: "2026-06-22",
      summary:
        "El Tribunal Supremo condenó el 22-6-2026 (sentencia 418/2026, «caso mascarillas») a José Luis Ábalos, ministro de Fomento desde junio de 2018 y secretario de Organización del PSOE hasta julio de 2021, a 24 años y 3 meses de prisión, y a su exasesor Koldo García a 19 años, 8 meses y un día, por organización criminal, cohecho, malversación y tráfico de influencias. Antes, Ábalos había pasado del Grupo Socialista al Grupo Mixto (27-2-2024) y el Congreso había concedido el suplicatorio por unanimidad (22-1-2025). Santos Cerdán, secretario de Organización del PSOE hasta 2025, figura como investigado en la misma causa y está en libertad provisional desde el 19-11-2025.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Comunicación Poder Judicial — «El Tribunal Supremo condena al exministro José Luis Ábalos y a su exasesor Koldo García a 24 años y 19 años de prisión…» (Sentencia 418/2026, causa especial 20775/2020, ECLI:ES:TS:2026:2553)",
          url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-Tribunal-Supremo-condena-al-exministro-Jose-Luis-Abalos-y-a-su-exasesor-Koldo-Garcia-a-24-anos-y-19-anos-de-prision--respectivamente--por-delitos-de-organizacion-criminal--cohecho--malversacion-y-trafico-de-influencias",
          date: "2026-06-22",
          publisher: "Tribunal Supremo, Sala Segunda (nota de la Oficina de Comunicación del CGPJ)",
          value: "Ábalos: 24 años y 3 meses de prisión; Koldo García: 19 años, 8 meses y 1 día; «los tres acusados formaron una organización criminal con reparto de funciones que cometió graves delitos de corrupción» (unanimidad)",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Comunicación Poder Judicial — el instructor del Tribunal Supremo acuerda la prisión provisional comunicada y sin fianza de José Luis Ábalos y Koldo García",
          url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-instructor-del-Tribunal-Supremo-acuerda-la-prision-provisional-comunicada-y-sin-fianza-del-exministro-Jose-Luis-Abalos-y-de-su-exasesor-Koldo-Garcia-al-apreciar-riesgo-de-fuga",
          date: "2025-11-27",
          publisher: "Tribunal Supremo (nota de la Oficina de Comunicación del CGPJ)",
          value: "«prisión provisional, comunicada y sin fianza» de los investigados Ábalos y Koldo García por «riesgo de fuga»",
          sourceType: "independiente",
        },
        {
          kind: "dato-oficial",
          title: "Boletín Oficial de las Cortes Generales, Congreso, serie D, núm. 99 (5-3-2024), p. 8: composición de los grupos parlamentarios",
          url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-99.PDF#page=8",
          date: "2024-02-27",
          publisher: "Congreso de los Diputados",
          value: "Grupo Socialista: «Baja: ÁBALOS MECO, José Luis … 27-02-2024»; Grupo Mixto: alta el mismo día",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Congreso de los Diputados — nota sobre el suplicatorio de José Luis Ábalos (Pleno en sesión secreta, 22-1-2025)",
          url: "https://www.congreso.es/es/notas-de-prensa?_notasprensa_mvcPath=detalle&_notasprensa_notaId=47911",
          date: "2025-01-22",
          publisher: "Congreso de los Diputados",
          value: "Suplicatorio «aprobado por unanimidad» (votación secreta: no hay voto por grupo en datos abiertos)",
          sourceType: "estadistica-oficial",
        },
      ],
    },
    verdict: "parcial",
    note: "Añadida el 2026-10-07. «Actuar» y «asumir responsabilidades» se hicieron en parte y después de que actuara la justicia: salida de Ábalos del Grupo Socialista en 2024, suplicatorio aprobado con los votos socialistas y expulsión anunciada en la web del PSOE el 16-6-2025 («expulsar definitivamente del PSOE a José Luis Ábalos, una vez acabado el expediente»; copia de archive.org de psoe.es). «Prevenir» no: el Supremo da por probados delitos de corrupción de quien era ministro y número tres del partido, el mismo diputado que presentó esta moción de censura (DSCD-12-PL-126, p. 2). Presunción de inocencia: ni la sentencia ni la nota dicen si es firme; Cerdán no está condenado. La renuncia al escaño de Ábalos y la suspensión de militancia de 2024 solo constan en prensa y no se usan.",
    i18n: {
      ca: {
        topic: "Corrupció",
        summary: "El Tribunal Suprem va condemnar el 22-6-2026 (sentència 418/2026, «cas mascaretes») José Luis Ábalos, ministre de Foment des del juny del 2018 i secretari d'Organització del PSOE fins al juliol del 2021, a 24 anys i 3 mesos de presó, i el seu exassessor Koldo García a 19 anys, 8 mesos i un dia, per organització criminal, suborn, malversació i tràfic d'influències. Abans, Ábalos havia passat del Grup Socialista al Grup Mixt (27-2-2024) i el Congrés havia concedit el suplicatori per unanimitat (22-1-2025). Santos Cerdán, secretari d'Organització del PSOE fins al 2025, consta com a investigat en la mateixa causa i és en llibertat provisional des del 19-11-2025.",
        note: "Afegida el 2026-10-07. «Actuar» i «assumir responsabilitats» es van fer en part i després que actués la justícia: sortida d'Ábalos del Grup Socialista el 2024, suplicatori aprovat amb els vots socialistes i expulsió anunciada al web del PSOE el 16-6-2025 («expulsar definitivamente del PSOE a José Luis Ábalos, una vez acabado el expediente»; còpia d'archive.org de psoe.es). «Prevenir», no: el Suprem dona per provats delictes de corrupció de qui era ministre i número tres del partit, el mateix diputat que va presentar aquesta moció de censura (DSCD-12-PL-126, p. 2). Presumpció d'innocència: ni la sentència ni la nota diuen si és ferma; Cerdán no està condemnat. La renúncia a l'escó d'Ábalos i la suspensió de militància del 2024 només consten a la premsa i no s'utilitzen.",
        role: "candidat a la Presidència del Govern (moció de censura, rèplica al president del Govern)",
      },
      gl: {
        topic: "Corrupción",
        summary: "O Tribunal Supremo condenou o 22-6-2026 (sentenza 418/2026, «caso máscaras») a José Luis Ábalos, ministro de Fomento desde xuño de 2018 e secretario de Organización do PSOE ata xullo de 2021, a 24 anos e 3 meses de prisión, e ao seu exasesor Koldo García a 19 anos, 8 meses e un día, por organización criminal, suborno, malversación e tráfico de influencias. Antes, Ábalos pasara do Grupo Socialista ao Grupo Mixto (27-2-2024) e o Congreso concedera o suplicatorio por unanimidade (22-1-2025). Santos Cerdán, secretario de Organización do PSOE ata 2025, figura como investigado na mesma causa e está en liberdade provisional desde o 19-11-2025.",
        note: "Engadida o 2026-10-07. «Actuar» e «asumir responsabilidades» fixéronse en parte e despois de que actuase a xustiza: saída de Ábalos do Grupo Socialista en 2024, suplicatorio aprobado cos votos socialistas e expulsión anunciada na web do PSOE o 16-6-2025 («expulsar definitivamente del PSOE a José Luis Ábalos, una vez acabado el expediente»; copia de archive.org de psoe.es). «Previr», non: o Supremo dá por probados delitos de corrupción de quen era ministro e número tres do partido, o mesmo deputado que presentou esta moción de censura (DSCD-12-PL-126, p. 2). Presunción de inocencia: nin a sentenza nin a nota din se é firme; Cerdán non está condenado. A renuncia á acta de Ábalos e a suspensión de militancia de 2024 só constan na prensa e non se usan.",
        role: "candidato á Presidencia do Goberno (moción de censura, réplica ao presidente do Goberno)",
      },
      eu: {
        topic: "Ustelkeria",
        summary: "Auzitegi Gorenak 2026-06-22an kondenatu zuen (418/2026 epaia, «maskaren kasua») José Luis Ábalos, 2018ko ekainetik Sustapen ministroa eta 2021eko uztailera arte PSOEko Antolakuntza idazkaria, 24 urte eta 3 hilabeteko espetxe-zigorrera, eta haren aholkulari ohi Koldo García 19 urte, 8 hilabete eta egun bateko zigorrera, erakunde kriminala, eroskeria, bidegabeko erabilera eta influentzia-trafikoagatik. Lehenago, Ábalos Talde Sozialistatik Talde Mistora igaro zen (2024-02-27), eta Kongresuak aho batez eman zuen suplikatorioa (2025-01-22). Santos Cerdán, 2025era arte PSOEko Antolakuntza idazkaria, ikertu gisa ageri da kausa berean, eta behin-behineko askatasunean dago 2025-11-19tik.",
        note: "2026-10-07an gehitua. «Jardutea» eta «erantzukizunak hartzea» neurri batean egin ziren, eta justiziak jardun ondoren: Ábalos Talde Sozialistatik irten zen 2024an, suplikatorioa boto sozialistekin onartu zen, eta kanporatzea PSOEren webgunean iragarri zen 2025-06-16an («expulsar definitivamente del PSOE a José Luis Ábalos, una vez acabado el expediente»; psoe.es-en archive.org-eko kopia). «Prebenitzea», ez: Gorenak frogatutzat jotzen ditu ministroa eta alderdiko hirugarren kargua zenaren ustelkeria-delituak, zentsura-mozio hau aurkeztu zuen diputatu berberarenak (DSCD-12-PL-126, 2. or.). Errugabetasun-presuntzioa: ez epaiak ez oharrak ez dute esaten irmoa den; Cerdán ez dago kondenatuta. Ábalosek eserlekuari egindako uko egitea eta 2024ko militantzia-etetea prentsan baino ez daude jasota, eta ez dira erabiltzen.",
        role: "Gobernuko presidentetzarako hautagaia (zentsura-mozioa, Gobernuko presidenteari erreplika)",
      },
    },
  },
  {
    id: "psoe-comision-investigacion-koldo-2025",
    partyId: "psoe",
    topic: "Corrupción",
    said: {
      speaker: SANCHEZ,
      role: "secretario general del PSOE (comparecencia en la sede federal, crónica oficial del partido)",
      date: "2025-06-16",
      text: "No vamos a tapar la corrupción que surja en nuestras filas por muy dolorosa que sea",
      source: {
        url: "https://www.psoe.es/actualidad/noticias-actualidad/pedro-sanchez-anuncia-mas-medidas-contra-la-corrupcion-el-psoe-es-una-organizacion-limpia/",
        title: "PSOE — «Pedro Sánchez anuncia más medidas contra la corrupción: el PSOE es una organización limpia» (16-6-2025)",
        date: "2025-06-16",
        archiveUrl:
          "https://web.archive.org/web/20250705134941/https://www.psoe.es/actualidad/noticias-actualidad/pedro-sanchez-anuncia-mas-medidas-contra-la-corrupcion-el-psoe-es-una-organizacion-limpia/",
        kind: "partido",
      },
    },
    did: {
      date: "2026-10-06",
      summary:
        "La misma crónica anuncia «la creación de una comisión de Investigación para conocer toda la verdad del caso Koldo». El Grupo Socialista registró la solicitud al día siguiente (156/000011), pero quedó en la Junta de Portavoces desde el 24-6-2025 sin llegar al Pleno, y decayó con la disolución de las Cortes (6-10-2026). Antes, en 2024, el Grupo Socialista sí votó a favor de crear la comisión del Congreso sobre los contratos de material sanitario de la pandemia, y el Senado aprobó por unanimidad (259 votos) la que pidió el PP sobre el mismo asunto.",
      evidence: [
        {
          kind: "iniciativa",
          title: "Solicitud de creación de una Comisión de Investigación sobre las contrataciones públicas y demás aspectos relacionados con la operación Delorme y el informe de la UCO 96/2025 (156/000011, XV; López Álvarez, Patxi (GS) y 112 diputados)",
          url: "https://www.congreso.es/es/web/guest/iniciativas-organo?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=156/000011",
          status: "Junta de Portavoces (desde el 24-6-2025, sin votación en el Pleno al disolverse las Cortes)",
          date: "2025-06-24",
        },
        {
          kind: "votacion",
          legislature: "XV",
          session: 33,
          date: "2024-03-21",
          number: 14,
          title: "Solicitud de creación de una Comisión de Investigación sobre los procesos de contratación para la adquisición de material sanitario por parte de las Administraciones públicas durante la crisis pandémica (156/000005)",
          groupVote: "si",
          url: `${CONGRESO}/Leg15/Sesion033/20240321/Votacion014/VOT_20240321105720.json`,
        },
        {
          kind: "otro-parlamento",
          chamber: "Senado",
          title: "Comisión de Investigación del Senado solicitada por el Grupo Popular sobre la contratación de material sanitario (650/000002): 259 votos a favor de 259 emitidos (DS Senado, Pleno núm. 20, p. 90)",
          date: "2024-03-12",
          vote: "si",
          url: "https://www.congreso.es/public_oficiales/L15/SEN/DS/PL/DS_P_15_20.PDF#page=90",
        },
        DISOLUCION_2026,
      ],
    },
    verdict: "parcial",
    note: "Añadida el 2026-10-07. Lo que el PSOE podía hacer por sí mismo lo hizo: registrar la solicitud con 113 firmas del Grupo Socialista y votar a favor de las comisiones de 2024. La comisión prometida en 2025 no llegó a crearse: no consta en la ficha del Congreso quién impidió que pasara de la Junta de Portavoces al Pleno, y por eso no se etiqueta «no lo hicieron». El voto por grupo del Senado no está en datos abiertos; el resultado unánime implica el voto a favor de los senadores socialistas presentes.",
    i18n: {
      ca: {
        topic: "Corrupció",
        summary: "La mateixa crònica anuncia «la creación de una comisión de Investigación para conocer toda la verdad del caso Koldo». El Grup Socialista va registrar la sol·licitud l'endemà (156/000011), però va quedar a la Junta de Portaveus des del 24-6-2025 sense arribar al Ple, i va decaure amb la dissolució de les Corts (6-10-2026). Abans, el 2024, el Grup Socialista sí que va votar a favor de crear la comissió del Congrés sobre els contractes de material sanitari de la pandèmia, i el Senat va aprovar per unanimitat (259 vots) la que va demanar el PP sobre el mateix assumpte.",
        note: "Afegida el 2026-10-07. El que el PSOE podia fer per si mateix ho va fer: registrar la sol·licitud amb 113 signatures del Grup Socialista i votar a favor de les comissions del 2024. La comissió promesa el 2025 no es va arribar a crear: no consta a la fitxa del Congrés qui va impedir que passés de la Junta de Portaveus al Ple, i per això no s'etiqueta «no ho van fer». El vot per grup del Senat no és a les dades obertes; el resultat unànime implica el vot a favor dels senadors socialistes presents.",
        role: "secretari general del PSOE (compareixença a la seu federal, crònica oficial del partit)",
      },
      gl: {
        topic: "Corrupción",
        summary: "A mesma crónica anuncia «la creación de una comisión de Investigación para conocer toda la verdad del caso Koldo». O Grupo Socialista rexistrou a solicitude ao día seguinte (156/000011), pero quedou na Xunta de Voceiros desde o 24-6-2025 sen chegar ao Pleno, e decaeu coa disolución das Cortes (6-10-2026). Antes, en 2024, o Grupo Socialista si votou a favor de crear a comisión do Congreso sobre os contratos de material sanitario da pandemia, e o Senado aprobou por unanimidade (259 votos) a que pediu o PP sobre o mesmo asunto.",
        note: "Engadida o 2026-10-07. O que o PSOE podía facer por si mesmo fíxoo: rexistrar a solicitude con 113 sinaturas do Grupo Socialista e votar a favor das comisións de 2024. A comisión prometida en 2025 non chegou a crearse: non consta na ficha do Congreso quen impediu que pasase da Xunta de Voceiros ao Pleno, e por iso non se etiqueta «non o fixeron». O voto por grupo do Senado non está nos datos abertos; o resultado unánime implica o voto a favor dos senadores socialistas presentes.",
        role: "secretario xeral do PSOE (comparecencia na sede federal, crónica oficial do partido)",
      },
      eu: {
        topic: "Ustelkeria",
        summary: "Kronika berak «la creación de una comisión de Investigación para conocer toda la verdad del caso Koldo» iragartzen du. Talde Sozialistak hurrengo egunean erregistratu zuen eskaera (156/000011), baina Bozeramaileen Batzarrean geratu zen 2025-06-24tik, Osoko Bilkurara iritsi gabe, eta Gorteak desegitearekin bertan behera geratu zen (2026-10-06). Lehenago, 2024an, Talde Sozialistak pandemiako material sanitarioaren kontratuei buruzko Kongresuko batzordea sortzearen alde bozkatu zuen, eta Senatuak aho batez onartu zuen (259 boto) PPk gai berari buruz eskatutakoa.",
        note: "2026-10-07an gehitua. PSOEk berak egin zezakeena egin zuen: eskaera Talde Sozialistaren 113 sinadurarekin erregistratu eta 2024ko batzordeen alde bozkatu. 2025ean agindutako batzordea ez zen sortu: Kongresuaren fitxan ez dago jasota nork eragotzi zuen Bozeramaileen Batzarretik Osoko Bilkurara igarotzea, eta horregatik ez da «ez zuten egin» etiketatzen. Senatuko talde bakoitzaren botoa ez dago datu irekietan; aho batezko emaitzak esan nahi du bertan zeuden senatari sozialistek alde bozkatu zutela.",
        role: "PSOEko idazkari nagusia (agerraldia egoitza federalean, alderdiaren kronika ofiziala)",
      },
    },
  },

  // ─── Sáhara Occidental y Marruecos (añadido el 2026-10-07) ──────────────
  {
    id: "psoe-sahara-autodeterminacion-2019",
    partyId: "psoe",
    topic: "Sáhara Occidental",
    said: {
      speaker: "PSOE",
      role: "programa electoral de las generales del 28-4-2019",
      date: "2019-04-17",
      text: "Promoveremos la solución del conflicto de Sáhara Occidental a través del cumplimiento de las resoluciones de Naciones Unidas, que garantizan el derecho de autodeterminación del pueblo saharaui.",
      source: {
        url: "https://www.psoe.es/media-content/2019/04/PSOE-programa-electoral-elecciones-generales-28-de-abril-de-2019.pdf#page=143",
        title: "PSOE — Programa electoral, elecciones generales del 28 de abril de 2019",
        year: 2019,
        page: "143 del PDF (pp. 282–283 impresas)",
        archiveUrl:
          "https://web.archive.org/web/20190417002326/https://www.psoe.es/media-content/2019/04/PSOE-programa-electoral-elecciones-generales-28-de-abril-de-2019.pdf",
        kind: "programa",
      },
    },
    did: {
      date: "2022-04-07",
      summary:
        "El presidente del Gobierno escribió al rey de Marruecos el 14-3-2022 que «España considera la propuesta marroquí de autonomía presentada en 2007 como la base más seria, creíble y realista para la resolución de ese diferendo», y lo leyó en el Congreso. La declaración conjunta del 7-4-2022 lo repite. Ese mismo día el Congreso aprobó una proposición no de ley que «ratifica su apoyo a las resoluciones de la ONU y a la Misión de Naciones Unidas para el Referéndum en el Sáhara Occidental (MINURSO)»; el Grupo Socialista votó en contra (118 no, 1 sí). Las declaraciones conjuntas de 2023 y 2025 mantienen la posición.",
      evidence: [
        {
          kind: "dato-oficial",
          title: "Diario de Sesiones del Congreso, Pleno, XIV legislatura, núm. 174 (30-3-2022), p. 18: el presidente del Gobierno lee su carta al rey de Marruecos",
          url: "https://www.congreso.es/public_oficiales/L14/CONG/DS/PL/DSCD-14-PL-174.PDF#page=18",
          date: "2022-03-30",
          publisher: "Congreso de los Diputados (Diario de Sesiones)",
          value: "«España considera la propuesta marroquí de autonomía presentada en 2007 como la base más seria, creíble y realista para la resolución de ese diferendo»",
          sourceType: "estadistica-oficial",
        },
        {
          kind: "dato-oficial",
          title: "Declaración conjunta España–Marruecos (7-4-2022), punto 1",
          url: "https://www.lamoncloa.gob.es/presidente/actividades/Documents/2022/070422-declaracion-conjunta-Espana-Marruecos.pdf",
          date: "2022-04-07",
          publisher: "La Moncloa (Gobierno de España)",
          value: "«España considera la iniciativa de autonomía marroquí, presentada en 2007, como la base más seria, realista y creíble para resolver este diferendo.»",
          sourceType: "gobierno",
        },
        {
          kind: "votacion",
          legislature: "XIV",
          session: 171,
          date: "2022-04-07",
          number: 1,
          title: "Proposición no de Ley de los grupos GCUP-EC-GC, Republicano y EH Bildu relativa a la posición del Gobierno español en relación con el conflicto del Sáhara Occidental (162/000995)",
          groupVote: "no",
          url: `${CONGRESO}/Leg14/Sesion171/20220407/Votacion001/VOT_20230302191210.json`,
        },
        {
          kind: "dato-oficial",
          title: "Declaración conjunta de la XIII Reunión de Alto Nivel España–Marruecos (4-12-2025), punto 8",
          url: "https://www.lamoncloa.gob.es/presidente/actividades/Documents/2025/04122025-declaracion-conjunta-espana-marruecos.pdf",
          date: "2025-12-04",
          publisher: "La Moncloa (Gobierno de España)",
          value: "Reitera la posición de la declaración de 7-4-2022 y celebra la resolución 2797 del Consejo de Seguridad, que apoya negociar «tomando como base la propuesta de autonomía de Marruecos»",
          sourceType: "gobierno",
        },
      ],
    },
    verdict: "contradice",
    note: "Añadida el 2026-10-07 (antes descartada en el registro de búsqueda por «programa no explícito»: el programa de abril de 2019 sí lo es). El programa prometía resolver el conflicto con las resoluciones de la ONU «que garantizan el derecho de autodeterminación»; el Gobierno pasó a considerar el plan de autonomía marroquí «la base más seria». El presidente sostuvo en el mismo debate que «en mi carta reafirmo que Naciones Unidas es el marco» (DSCD-14-PL-174, p. 18). El programa del 10-N-2019 y el acuerdo de coalición no hablan del Sáhara; el de 2023 ya no menciona la autodeterminación. La proposición aprobada no habla de autodeterminación: ratifica las resoluciones de la ONU y la MINURSO. La única diputada socialista que votó sí fue Beatriz Carrillo de los Reyes; Unidas Podemos, socio de Gobierno, votó a favor.",
    i18n: {
      ca: {
        topic: "Sàhara Occidental",
        summary: "El president del Govern va escriure al rei del Marroc el 14-3-2022 que «España considera la propuesta marroquí de autonomía presentada en 2007 como la base más seria, creíble y realista para la resolución de ese diferendo», i ho va llegir al Congrés. La declaració conjunta del 7-4-2022 ho repeteix. Aquell mateix dia el Congrés va aprovar una proposició no de llei que «ratifica su apoyo a las resoluciones de la ONU y a la Misión de Naciones Unidas para el Referéndum en el Sáhara Occidental (MINURSO)»; el Grup Socialista hi va votar en contra (118 no, 1 sí). Les declaracions conjuntes del 2023 i el 2025 mantenen la posició.",
        note: "Afegida el 2026-10-07 (abans descartada al registre de cerca per «programa no explícit»: el programa d'abril del 2019 sí que ho és). El programa prometia resoldre el conflicte amb les resolucions de l'ONU «que garantizan el derecho de autodeterminación»; el Govern va passar a considerar el pla d'autonomia marroquí «la base más seria». El president va sostenir en el mateix debat que «en mi carta reafirmo que Naciones Unidas es el marco» (DSCD-14-PL-174, p. 18). El programa del 10-N-2019 i l'acord de coalició no parlen del Sàhara; el del 2023 ja no esmenta l'autodeterminació. La proposició aprovada no parla d'autodeterminació: ratifica les resolucions de l'ONU i la MINURSO. L'única diputada socialista que va votar sí va ser Beatriz Carrillo de los Reyes; Unidas Podemos, soci de Govern, hi va votar a favor.",
        role: "programa electoral de les generals del 28-4-2019",
      },
      gl: {
        topic: "Sáhara Occidental",
        summary: "O presidente do Goberno escribiulle ao rei de Marrocos o 14-3-2022 que «España considera la propuesta marroquí de autonomía presentada en 2007 como la base más seria, creíble y realista para la resolución de ese diferendo», e leuno no Congreso. A declaración conxunta do 7-4-2022 repíteo. Ese mesmo día o Congreso aprobou unha proposición non de lei que «ratifica su apoyo a las resoluciones de la ONU y a la Misión de Naciones Unidas para el Referéndum en el Sáhara Occidental (MINURSO)»; o Grupo Socialista votou en contra (118 non, 1 si). As declaracións conxuntas de 2023 e 2025 manteñen a posición.",
        note: "Engadida o 2026-10-07 (antes descartada no rexistro de busca por «programa non explícito»: o programa de abril de 2019 si o é). O programa prometía resolver o conflito coas resolucións da ONU «que garantizan el derecho de autodeterminación»; o Goberno pasou a considerar o plan de autonomía marroquí «la base más seria». O presidente sostivo no mesmo debate que «en mi carta reafirmo que Naciones Unidas es el marco» (DSCD-14-PL-174, p. 18). O programa do 10-N-2019 e o acordo de coalición non falan do Sáhara; o de 2023 xa non menciona a autodeterminación. A proposición aprobada non fala de autodeterminación: ratifica as resolucións da ONU e a MINURSO. A única deputada socialista que votou si foi Beatriz Carrillo de los Reyes; Unidas Podemos, socio de Goberno, votou a favor.",
        role: "programa electoral das xerais do 28-4-2019",
      },
      eu: {
        topic: "Mendebaldeko Sahara",
        summary: "Gobernuko presidenteak Marokoko erregeari idatzi zion 2022-03-14an «España considera la propuesta marroquí de autonomía presentada en 2007 como la base más seria, creíble y realista para la resolución de ese diferendo», eta Kongresuan irakurri zuen. 2022-04-07ko adierazpen bateratuak errepikatzen du. Egun berean, Kongresuak legez besteko proposamen bat onartu zuen, «ratifica su apoyo a las resoluciones de la ONU y a la Misión de Naciones Unidas para el Referéndum en el Sáhara Occidental (MINURSO)»; Talde Sozialistak aurka bozkatu zuen (118 ez, 1 bai). 2023ko eta 2025eko adierazpen bateratuek jarrera mantentzen dute.",
        note: "2026-10-07an gehitua (lehen bilaketa-erregistroan baztertua, «programa ez esplizitua» zelakoan: 2019ko apirilekoa bada esplizitua). Programak NBEren ebazpenekin gatazka konpontzea agintzen zuen, «que garantizan el derecho de autodeterminación»; Gobernuak Marokoko autonomia-plana «la base más seria» jotzera igaro zen. Presidenteak eztabaida berean esan zuen «en mi carta reafirmo que Naciones Unidas es el marco» (DSCD-14-PL-174, 18. or.). 2019ko azaroaren 10eko programak eta koalizio-akordioak ez dute Saharaz hitz egiten; 2023koak ez du jada autodeterminazioa aipatzen. Onartutako proposamenak ez du autodeterminazioaz hitz egiten: NBEren ebazpenak eta MINURSO berresten ditu. Bai bozkatu zuen diputatu sozialista bakarra Beatriz Carrillo de los Reyes izan zen; Unidas Podemosek, Gobernu-kideak, alde bozkatu zuen.",
        role: "2019-04-28ko hauteskunde orokorretarako programa",
      },
    },
  },
  {
    id: "psoe-aduanas-ceuta-melilla-2022",
    partyId: "psoe",
    topic: "Ceuta y Marruecos",
    said: {
      speaker: SANCHEZ,
      role: "presidente del Gobierno (rueda de prensa en Rabat tras la declaración conjunta con Marruecos)",
      date: "2022-04-07",
      text: "las mercancías también van a circular con normalidad, en régimen de expedición comercial a través de los respectivos puestos aduaneros.",
      source: {
        url: "https://www.lamoncloa.gob.es/presidente/intervenciones/Documents/2022/220407%20RDP%20DEL%20PG%20EN%20MARRUECOS.pdf",
        title: "La Moncloa — Transcripción de la rueda de prensa del presidente del Gobierno en Marruecos (7-4-2022)",
        date: "2022-04-07",
        page: "p. 3",
        kind: "gobierno",
      },
    },
    did: {
      date: "2025-12-04",
      summary:
        "La Agencia Tributaria adaptó en marzo de 2023 las instrucciones del documento único administrativo para las aduanas de Ceuta y Melilla. Según el ministro de Asuntos Exteriores en el Congreso, «el pasado 11 de febrero [de 2025] se restableció el paso oficial de mercancías entre Melilla y Marruecos, y también, por primera vez en nuestra historia, entre Ceuta y Marruecos», en «un proceso gradual y progresivo». La declaración conjunta de diciembre de 2025 celebra «la aplicación, en un marco concertado» de ese punto.",
      evidence: [
        {
          kind: "boe",
          reference: "BOE-A-2023-7502",
          title: "Resolución de 17 de marzo de 2023, del Departamento de Aduanas e Impuestos Especiales de la Agencia Estatal de Administración Tributaria, por la que se modifica la de 11 de julio de 2014, sobre formalidades aduaneras (documento único administrativo), para Ceuta y Melilla",
          url: "https://boe.es/boe/dias/2023/03/23/pdfs/BOE-A-2023-7502.pdf",
          date: "2023-03-23",
          role: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Diario de Sesiones del Congreso, Comisión de Asuntos Exteriores, XV legislatura, núm. 314 (5-5-2025), pp. 8 y 38: comparecencia del ministro de Asuntos Exteriores",
          url: "https://www.congreso.es/public_oficiales/L15/CONG/DS/CO/DSCD-15-CO-314.PDF#page=8",
          date: "2025-05-05",
          publisher: "Ministro de Asuntos Exteriores (en el Diario de Sesiones del Congreso)",
          value: "Paso oficial de mercancías restablecido el 11-2-2025 en Melilla y abierto en Ceuta; «Se trata de un proceso gradual y progresivo»",
          sourceType: "gobierno",
        },
        {
          kind: "dato-oficial",
          title: "Declaración conjunta de la XIII Reunión de Alto Nivel España–Marruecos (4-12-2025), punto 61",
          url: "https://www.lamoncloa.gob.es/presidente/actividades/Documents/2025/04122025-declaracion-conjunta-espana-marruecos.pdf",
          date: "2025-12-04",
          publisher: "La Moncloa (Gobierno de España)",
          value: "Ambos gobiernos «se felicitan por la aplicación, en un marco concertado, del punto 3» de la hoja de ruta de 2022",
          sourceType: "gobierno",
        },
      ],
    },
    verdict: "parcial",
    note: "Añadida el 2026-10-07. Solo hay datos del propio Gobierno sobre la circulación real de mercancías: no se ha encontrado una estadística oficial de mercancías por las aduanas de Ceuta y Melilla ni un informe independiente. La norma aduanera existe (BOE) y el Gobierno declara abierto el paso desde febrero de 2025, pero él mismo lo describe como gradual: la «normalidad» prometida en 2022 no está documentada. Las cifras de volumen que dio el ministro no son coherentes entre sí y no se citan. En abril de 2026 VOX pidió una comparecencia sobre un «cierre unilateral de las aduanas» por Marruecos (213/000820); es solo el título de la solicitud, no un hecho comprobado. Etiqueta máxima por la regla de independencia de la fuente: solo hay datos del propio Gobierno.",
    i18n: {
      ca: {
        topic: "Ceuta i el Marroc",
        summary: "L'Agència Tributària va adaptar el març del 2023 les instruccions del document únic administratiu per a les duanes de Ceuta i Melilla. Segons el ministre d'Afers Exteriors al Congrés, «el pasado 11 de febrero [de 2025] se restableció el paso oficial de mercancías entre Melilla y Marruecos, y también, por primera vez en nuestra historia, entre Ceuta y Marruecos», en «un proceso gradual y progresivo». La declaració conjunta del desembre del 2025 celebra «la aplicación, en un marco concertado» d'aquest punt.",
        note: "Afegida el 2026-10-07. Només hi ha dades del mateix Govern sobre la circulació real de mercaderies: no s'ha trobat cap estadística oficial de mercaderies per les duanes de Ceuta i Melilla ni cap informe independent. La norma duanera existeix (BOE) i el Govern declara obert el pas des del febrer del 2025, però ell mateix el descriu com a gradual: la «normalitat» promesa el 2022 no està documentada. Les xifres de volum que va donar el ministre no són coherents entre si i no se citen. L'abril del 2026 VOX va demanar una compareixença sobre un «cierre unilateral de las aduanas» pel Marroc (213/000820); és només el títol de la sol·licitud, no un fet comprovat. Etiqueta màxima per la regla d'independència de la font: només hi ha dades del mateix Govern.",
        role: "president del Govern (roda de premsa a Rabat després de la declaració conjunta amb el Marroc)",
      },
      gl: {
        topic: "Ceuta e Marrocos",
        summary: "A Axencia Tributaria adaptou en marzo de 2023 as instrucións do documento único administrativo para as aduanas de Ceuta e Melilla. Segundo o ministro de Asuntos Exteriores no Congreso, «el pasado 11 de febrero [de 2025] se restableció el paso oficial de mercancías entre Melilla y Marruecos, y también, por primera vez en nuestra historia, entre Ceuta y Marruecos», nun «proceso gradual y progresivo». A declaración conxunta de decembro de 2025 celebra «la aplicación, en un marco concertado» dese punto.",
        note: "Engadida o 2026-10-07. Só hai datos do propio Goberno sobre a circulación real de mercadorías: non se atopou unha estatística oficial de mercadorías polas aduanas de Ceuta e Melilla nin un informe independente. A norma aduaneira existe (BOE) e o Goberno declara aberto o paso desde febreiro de 2025, pero el mesmo descríbeo como gradual: a «normalidade» prometida en 2022 non está documentada. As cifras de volume que deu o ministro non son coherentes entre si e non se citan. En abril de 2026 VOX pediu unha comparecencia sobre un «cierre unilateral de las aduanas» por Marrocos (213/000820); é só o título da solicitude, non un feito comprobado. Etiqueta máxima pola regra de independencia da fonte: só hai datos do propio Goberno.",
        role: "presidente do Goberno (rolda de prensa en Rabat tras a declaración conxunta con Marrocos)",
      },
      eu: {
        topic: "Ceuta eta Maroko",
        summary: "Zerga Agentziak 2023ko martxoan egokitu zituen Ceutako eta Melillako aduanetarako administrazio-agiri bakarraren jarraibideak. Kanpo Arazoetako ministroak Kongresuan esan zuenez, «el pasado 11 de febrero [de 2025] se restableció el paso oficial de mercancías entre Melilla y Marruecos, y también, por primera vez en nuestra historia, entre Ceuta y Marruecos», «un proceso gradual y progresivo» batean. 2025eko abenduko adierazpen bateratuak puntu horren «la aplicación, en un marco concertado» ospatzen du.",
        note: "2026-10-07an gehitua. Gobernuaren beraren datuak baino ez daude salgaien benetako zirkulazioari buruz: ez da aurkitu Ceutako eta Melillako aduanetako salgaien estatistika ofizialik ez txosten independenterik. Aduana-araua badago (BOE), eta Gobernuak dio pasabidea irekita dagoela 2025eko otsailetik, baina berak mailakakotzat jotzen du: 2022an agindutako «normaltasuna» ez dago dokumentatuta. Ministroak emandako bolumen-zifrak ez datoz bat beren artean, eta ez dira aipatzen. 2026ko apirilean VOXek agerraldi bat eskatu zuen Marokok egindako «cierre unilateral de las aduanas» delakoaz (213/000820); eskaeraren izenburua baino ez da, ez egiaztatutako gertaera bat. Gehieneko etiketa, iturriaren independentziaren arauagatik: Gobernuaren beraren datuak baino ez daude.",
        role: "Gobernuko presidentea (prentsaurrekoa Rabaten, Marokorekiko adierazpen bateratuaren ondoren)",
      },
    },
  },
];
