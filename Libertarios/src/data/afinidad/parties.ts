/**
 * Partidos de «¿A quién votar? Objetivamente» — generales del 29-N-2026
 * (Real Decreto 806/2026, BOE-A-2026-20742).
 *
 * CRITERIO DE INCLUSIÓN (decisión del dueño, publicado en la metodología):
 *   1. Escaño en el Congreso en la XV legislatura, o
 *   2. coalición que se presente el 29-N integrando a uno de ellos
 *      (`status: "por-confirmar"` hasta que conste registrada), o
 *   3. extraparlamentario con escaño en el Parlamento Europeo o en algún
 *      parlamento autonómico, o con ≥ 1 % del voto válido en las generales
 *      de 2023.
 * Nadie entra por afinidad con este sitio: el Partido Libertario (P-LIB) se ha
 * comprobado contra las tres ramas igual que los demás (ver al final).
 *
 * FUENTES DE ESCAÑO EN EL CONGRESO: fichero de datos abiertos de diputados en
 * activo de congreso.es (campos FORMACIONELECTORAL, GRUPOPARLAMENTARIO,
 * FECHAALTAENGRUPOPARLAMENTARIO), descargado el 2026-10-06, y los JSON de
 * votaciones. Podemos y Compromís no tienen formación electoral propia en ese
 * fichero (se presentaron en las listas de SUMAR), así que su pertenencia se
 * acredita con el BOCG, donde sus iniciativas se registran «a instancia de la
 * diputada de Podemos / de Compromís» (ver `deputies.ts`).
 *
 * `congressGroup`: cadena EXACTA del campo `grupo` de los JSON de votaciones de
 * congreso.es (comprobado en p. ej. Leg15/Sesion202/20260930/Votacion001):
 * «GS», «GP», «GVOX», «GSUMAR», «GR», «GJxCAT», «GEH Bildu», «GV (EAJ-PNV)»,
 * «GMx». Los partidos del Mixto llevan «GMx», pero su voto NO puede leerse del
 * grupo: se atribuye por diputado (`deputies.ts`).
 * `congressGroupByLegislature`: grupo en una legislatura concreta si no es el
 * de `congressGroup` (XIV: Podemos, Sumar y Frente Amplio → «GCUP-EC-GC»).
 *
 * BLOQUE (`bloc`, solo se usa para «tu sorpresa»). Regla:
 *   - «nacionalista»: partidos cuyo objetivo declarado es el autogobierno o la
 *     soberanía de una nación o pueblo distinto del español (ERC, Junts,
 *     EH Bildu, PNV, BNG, CC). Varios son también claramente de izquierda (ERC,
 *     EH Bildu, BNG) o de centroderecha (Junts, PNV, CC); se les asigna
 *     «nacionalista» porque su votante suele comparar dentro de ese eje y así
 *     la sorpresa «fuera de tu bloque» es más informativa.
 *   - «izquierda» / «derecha»: el resto, según el lado en que se sientan sus
 *     socios habituales de gobierno a nivel estatal o autonómico.
 *     Compromís (valencianista) → «izquierda»: no se define por la soberanía
 *     de otra nación y gobierna con la izquierda. UPN (regionalista foral) →
 *     «derecha»: se presentó en coalición con el PP en 2019 y vota con él.
 *     Adelante Andalucía (andalucista de izquierdas) → «izquierda» por la misma
 *     razón que Compromís; CHA, Més per Mallorca, Més per Menorca, NC-BC, CUP,
 *     Aliança Catalana y Geroa Bai → «nacionalista».
 *   - «otro»: plataformas provinciales, insulares o regionalistas sin bloque
 *     estable (Teruel Existe, ASG, AHI, PRC, UPL, Por Ávila, Soria ¡Ya!,
 *     Democracia Ourensana): han pactado a ambos lados.
 *   Es una convención editorial, no un dato: se publica para poder discutirla.
 *
 * COLORES: orientativos y reconocibles, no los oficiales de marca; solo se
 * usan con siglas, nunca con logotipos.
 *
 * `inGovernment`: solo Gobierno del Estado y solo los periodos que cubren las
 * votaciones ancla (XIV y XV) más el anterior inmediato; fechas del BOE de
 * nombramiento.
 */

import type { Party, Source } from "./types";

const CONGRESO_DIPUTADOS: Source = {
  url: "https://www.congreso.es/webpublica/opendata/diputados/DiputadosActivos__20261006050007.json",
  title: "Congreso de los Diputados — datos abiertos: diputados en activo (XV legislatura)",
  date: "2026-10-06",
};

const BOE_SANCHEZ_2018: Source = {
  url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2018-7400",
  title: "Real Decreto 354/2018, de 1 de junio, por el que se nombra Presidente del Gobierno a don Pedro Sánchez Pérez-Castejón",
  date: "2018-06-02",
};
const BOE_MINISTROS_2020: Source = {
  url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-416",
  title: "Real Decreto 8/2020, de 12 de enero, por el que se nombran Ministros del Gobierno",
  date: "2020-01-13",
};
const BOE_MINISTROS_2023: Source = {
  url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-23543",
  title: "Real Decreto 835/2023, de 20 de noviembre, por el que se nombran Ministros del Gobierno",
  date: "2023-11-21",
};

/** Traducción de la `recordNote` común a los extraparlamentarios (ver `extra`). */
const EXTRA_RECORD_NOTE_I18N = {
  ca: "Sense escó al Congrés: s'avalua només pel programa (i, si n'hi ha, per votacions verificables en altres parlaments).",
  gl: "Sen escano no Congreso: avalíase só polo programa (e, se as hai, por votacións verificables noutros parlamentos).",
  eu: "Kongresuan eserlekurik gabe: programaren arabera soilik ebaluatzen da (eta, baldin badaude, beste parlamentu batzuetako bozketa egiaztagarrien arabera).",
};

/**
 * Plantilla para extraparlamentarios: mismos campos, sin historial en el Congreso.
 * `i18n` lleva la traducción de `reason` (ca/gl/eu; pendiente de revisión nativa).
 */
function extra(
  list: Array<{
    id: string; name: string; short: string; color: string; initials: string;
    regions?: string[]; bloc: Party["bloc"]; reason: string; source: Source;
    i18n: { ca: string; gl: string; eu: string };
  }>,
): Party[] {
  return list.map((p) => ({
    id: p.id,
    name: p.name,
    short: p.short,
    color: p.color,
    initials: p.initials,
    scope: p.regions ? "autonomica" : "estatal",
    ...(p.regions ? { regions: p.regions } : {}),
    bloc: p.bloc,
    parliamentary: false,
    status: "por-confirmar",
    inclusionReason: p.reason,
    inclusionSource: p.source,
    recordNote:
      "Sin escaño en el Congreso: se evalúa solo por programa (y, si las hay, votaciones verificables en otros parlamentos).",
    i18n: {
      ca: { inclusionReason: p.i18n.ca, recordNote: EXTRA_RECORD_NOTE_I18N.ca },
      gl: { inclusionReason: p.i18n.gl, recordNote: EXTRA_RECORD_NOTE_I18N.gl },
      eu: { inclusionReason: p.i18n.eu, recordNote: EXTRA_RECORD_NOTE_I18N.eu },
    },
  }));
}

export const parties: Party[] = [
  // ─── Con escaño en el Congreso XV ───────────────────────────────────────
  {
    id: "psoe",
    name: "Partido Socialista Obrero Español",
    short: "PSOE",
    color: "#E30613",
    initials: "PS",
    scope: "estatal",
    bloc: "izquierda",
    parliamentary: true,
    status: "confirmada",
    inclusionReason:
      "Escaño en el Congreso XV (Grupo Socialista; formaciones PSOE, PSC-PSOE, PSE-EE, PsdeG, PSIB y PSN).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GS",
    // Gobierno desde el nombramiento de Sánchez (RD 354/2018); sigue en funciones.
    inGovernment: [{ from: "2018-06-02", level: "estatal" }],
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura (Grup Socialista; formacions PSOE, PSC-PSOE, PSE-EE, PsdeG, PSIB i PSN).",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura (Grupo Socialista; formacións PSOE, PSC-PSOE, PSE-EE, PsdeG, PSIB e PSN).",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan (Talde Sozialista; PSOE, PSC-PSOE, PSE-EE, PsdeG, PSIB eta PSN formazioak).",
      },
    },
  },
  {
    id: "pp",
    name: "Partido Popular",
    short: "PP",
    color: "#1D84CE",
    initials: "PP",
    scope: "estatal",
    bloc: "derecha",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo Popular).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GP",
    // Rajoy: RD 1822/2011 (BOE-A-2011-19861) hasta el nombramiento de Sánchez (BOE-A-2018-7400).
    inGovernment: [{ from: "2011-12-21", to: "2018-06-02", level: "estatal" }],
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup Popular).",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo Popular).",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (Talde Popularra).",
      },
    },
  },
  {
    id: "vox",
    name: "Vox",
    short: "Vox",
    color: "#5AC035",
    initials: "VX",
    scope: "estatal",
    bloc: "derecha",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo VOX).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GVOX",
    recordNote:
      "Votaciones del grupo GVOX. Francisco Javier Ortega Smith (elegido por VOX) está en el Grupo Mixto desde el 17-7-2026: su voto desde esa fecha no se atribuye a Vox.",
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup VOX).",
        recordNote:
          "Votacions del grup GVOX. Francisco Javier Ortega Smith (elegit per VOX) és al Grup Mixt des del 17-7-2026: el seu vot des d'aquesta data no s'atribueix a Vox.",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo VOX).",
        recordNote:
          "Votacións do grupo GVOX. Francisco Javier Ortega Smith (elixido por VOX) está no Grupo Mixto desde o 17-7-2026: o seu voto desde esa data non se atribúe a Vox.",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (VOX Taldea).",
        recordNote:
          "GVOX taldearen bozketak. Francisco Javier Ortega Smith (VOXen zerrendan hautatua) Talde Mistoan dago 17-7-2026tik: data horretatik aurrerako botoa ez zaio Voxi egozten.",
      },
    },
  },
  {
    id: "sumar",
    name: "Sumar",
    short: "Sumar",
    color: "#E51C55",
    initials: "SU",
    scope: "estatal",
    bloc: "izquierda",
    parliamentary: true,
    status: "confirmada",
    inclusionReason:
      "Escaño en el Congreso XV (Grupo Plurinacional SUMAR). Para el 29-N se presenta previsiblemente dentro de «Frente Amplio» (ver esa entrada).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GSUMAR",
    // XIV: Sumar no existía; su historial es el del grupo de Unidas Podemos
    // (ver recordNote). Lo lee el recuento de votaciones (congreso-vote.ts).
    congressGroupByLegislature: { XIV: "GCUP-EC-GC" },
    inGovernment: [{ from: "2023-11-21", level: "estatal" }],
    recordNote:
      "Votaciones del grupo GSUMAR. Hasta el 5-12-2023 el grupo incluía a los diputados de Podemos, y hasta el 3-7-2025 a Àgueda Micó (Compromís); en esas fechas sus votos se separan por diputado. En la XIV Sumar no existía como partido: se usa el voto del grupo GCUP-EC-GC (Unidas Podemos, con IU y los Comuns), en el que estaba Yolanda Díaz; por eso esas celdas llevan confianza «media».",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura (Grup Plurinacional SUMAR). Per al 29-N es presenta previsiblement dins de «Frente Amplio» (vegeu aquesta entrada).",
        recordNote:
          "Votacions del grup GSUMAR. Fins al 5-12-2023 el grup incloïa els diputats de Podemos, i fins al 3-7-2025 Àgueda Micó (Compromís); en aquests períodes els seus vots se separen per diputat. A la XIV Sumar no existia com a partit: s'utilitza el vot del grup GCUP-EC-GC (Unidas Podemos, amb IU i els Comuns), del qual formava part Yolanda Díaz; per això aquestes cel·les tenen confiança «mitjana».",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura (Grupo Plurinacional SUMAR). Para o 29-N preséntase previsiblemente dentro de «Frente Amplio» (ver esa entrada).",
        recordNote:
          "Votacións do grupo GSUMAR. Ata o 5-12-2023 o grupo incluía os deputados de Podemos, e ata o 3-7-2025 Àgueda Micó (Compromís); nesas datas os seus votos sepáranse por deputado. Na XIV Sumar non existía como partido: úsase o voto do grupo GCUP-EC-GC (Unidas Podemos, con IU e os Comuns), no que estaba Yolanda Díaz; por iso esas celas levan confianza «media».",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan (SUMAR Talde Plurinazionala). 29-N hauteskundeetarako, aurreikuspenen arabera, «Frente Amplio»-ren barruan aurkeztuko da (ikus sarrera hori).",
        recordNote:
          "GSUMAR taldearen bozketak. 5-12-2023ra arte taldean zeuden Podemosen diputatuak, eta 3-7-2025era arte Àgueda Micó (Compromís); aldi horietan haien botoak diputatuz diputatu bereizten dira. XIV. legealdian Sumar ez zen alderdi gisa existitzen: GCUP-EC-GC taldearen botoa erabiltzen da (Unidas Podemos, IU eta Comunsekin), Yolanda Díaz talde horretan baitzegoen; horregatik gelaxka horiek konfiantza «ertaina» dute.",
      },
    },
  },
  {
    id: "podemos",
    name: "Podemos",
    short: "Podemos",
    color: "#6B2E68",
    initials: "PO",
    scope: "estatal",
    bloc: "izquierda",
    parliamentary: true,
    status: "confirmada",
    inclusionReason:
      "Escaño en el Congreso XV: elegidos en las listas de SUMAR, sus diputados pasaron al Grupo Mixto el 5-12-2023. En el BOCG la portavoz Ione Belarra firma como «diputada de Podemos».",
    inclusionSource: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-560.PDF",
      title: "BOCG, Congreso de los Diputados, serie D, núm. 560 (iniciativa 161/003584 «Diputada de Podemos»)",
    },
    congressGroup: "GMx",
    // XIV: grupo propio GCUP-EC-GC (Unidas Podemos). En la XV, Mixto → por diputado.
    congressGroupByLegislature: { XIV: "GCUP-EC-GC" },
    // Ministros de Unidas Podemos desde el RD 8/2020 hasta el nuevo Gobierno (RD 835/2023), que ya no los incluye.
    inGovernment: [{ from: "2020-01-13", to: "2023-11-21", level: "estatal" }],
    recordNote:
      "Sin grupo propio: voto atribuido por diputado (Belarra, Sánchez Serna, Velarde, Santana; Verstrynge hasta el 26-1-2024). Del 17-8-2023 al 5-12-2023 votaron dentro de GSUMAR. En la XIV, grupo GCUP-EC-GC (Unidas Podemos), compartido con IU y los Comuns.",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura: elegits a les llistes de SUMAR, els seus diputats van passar al Grup Mixt el 5-12-2023. Al BOCG la portaveu Ione Belarra signa com a «diputada de Podemos».",
        recordNote:
          "Sense grup propi: vot atribuït per diputat (Belarra, Sánchez Serna, Velarde, Santana; Verstrynge fins al 26-1-2024). Del 17-8-2023 al 5-12-2023 van votar dins de GSUMAR. A la XIV, grup GCUP-EC-GC (Unidas Podemos), compartit amb IU i els Comuns.",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura: elixidos nas listas de SUMAR, os seus deputados pasaron ao Grupo Mixto o 5-12-2023. No BOCG a voceira Ione Belarra asina como «diputada de Podemos».",
        recordNote:
          "Sen grupo propio: voto atribuído por deputado (Belarra, Sánchez Serna, Velarde, Santana; Verstrynge ata o 26-1-2024). Do 17-8-2023 ao 5-12-2023 votaron dentro de GSUMAR. Na XIV, grupo GCUP-EC-GC (Unidas Podemos), compartido con IU e os Comuns.",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan: SUMARen zerrendetan hautatuak, haren diputatuak Talde Mistora igaro ziren 5-12-2023an. BOCGn, Ione Belarra bozeramaileak «diputada de Podemos» gisa sinatzen du.",
        recordNote:
          "Talde propiorik gabe: botoa diputatuz diputatu egozten da (Belarra, Sánchez Serna, Velarde, Santana; Verstrynge 26-1-2024ra arte). 17-8-2023tik 5-12-2023ra GSUMARen barruan bozkatu zuten. XIV. legealdian, GCUP-EC-GC taldea (Unidas Podemos), IU eta Comunsekin partekatua.",
      },
    },
  },
  {
    id: "erc",
    name: "Esquerra Republicana",
    short: "ERC",
    color: "#FFB232",
    initials: "ER",
    scope: "autonomica",
    regions: ["09"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo Republicano).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GR",
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup Republicà).",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo Republicano).",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (Talde Errepublikanoa).",
      },
    },
  },
  {
    id: "junts",
    name: "Junts per Catalunya",
    short: "Junts",
    color: "#20C0B0",
    initials: "JU",
    scope: "autonomica",
    regions: ["09"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo Junts per Catalunya).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GJxCAT",
    recordNote: "En la XIV sus diputados estaban en el Grupo Plural (GPlu): voto atribuido por diputado.",
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup Junts per Catalunya).",
        recordNote: "A la XIV els seus diputats eren al Grup Plural (GPlu): vot atribuït per diputat.",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo Junts per Catalunya).",
        recordNote: "Na XIV os seus deputados estaban no Grupo Plural (GPlu): voto atribuído por deputado.",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (Junts per Catalunya Taldea).",
        recordNote:
          "XIV. legealdian haren diputatuak Talde Pluralean zeuden (GPlu): botoa diputatuz diputatu egozten da.",
      },
    },
  },
  {
    id: "eh-bildu",
    name: "EH Bildu",
    short: "Bildu",
    color: "#A8C523",
    initials: "EB",
    scope: "autonomica",
    regions: ["15", "16"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo Euskal Herria Bildu).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GEH Bildu",
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup Euskal Herria Bildu).",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo Euskal Herria Bildu).",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (Euskal Herria Bildu Taldea).",
      },
    },
  },
  {
    id: "pnv",
    name: "Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco",
    short: "PNV",
    color: "#2A8343",
    initials: "PN",
    scope: "autonomica",
    regions: ["16"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Grupo Vasco (EAJ-PNV)).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GV (EAJ-PNV)",
    i18n: {
      ca: {
        inclusionReason: "Escó al Congrés de la XV legislatura (Grup Basc (EAJ-PNV)).",
      },
      gl: {
        inclusionReason: "Escano no Congreso da XV lexislatura (Grupo Vasco (EAJ-PNV)).",
      },
      eu: {
        inclusionReason: "Eserlekua XV. legealdiko Kongresuan (Euskal Taldea (EAJ-PNV)).",
      },
    },
  },
  {
    id: "bng",
    name: "Bloque Nacionalista Galego",
    short: "BNG",
    color: "#76B3DD",
    initials: "BN",
    scope: "autonomica",
    regions: ["12"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Néstor Rego Candamil, formación electoral BNG, Grupo Mixto).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GMx",
    recordNote:
      "Sin grupo propio: voto atribuido por diputado (Néstor Rego Candamil). En la XIV estaba en el Grupo Plural (GPlu).",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura (Néstor Rego Candamil, formació electoral BNG, Grup Mixt).",
        recordNote:
          "Sense grup propi: vot atribuït per diputat (Néstor Rego Candamil). A la XIV era al Grup Plural (GPlu).",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura (Néstor Rego Candamil, formación electoral BNG, Grupo Mixto).",
        recordNote:
          "Sen grupo propio: voto atribuído por deputado (Néstor Rego Candamil). Na XIV estaba no Grupo Plural (GPlu).",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan (Néstor Rego Candamil, BNG hauteskunde-formazioa, Talde Mistoa).",
        recordNote:
          "Talde propiorik gabe: botoa diputatuz diputatu egozten da (Néstor Rego Candamil). XIV. legealdian Talde Pluralean zegoen (GPlu).",
      },
    },
  },
  {
    id: "cc",
    name: "Coalición Canaria",
    short: "CC",
    color: "#FFD200",
    initials: "CC",
    scope: "autonomica",
    regions: ["05"],
    bloc: "nacionalista",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Cristina Valido García, formación electoral CCa, Grupo Mixto).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GMx",
    recordNote:
      "Sin grupo propio: voto atribuido por diputado (Cristina Valido García; en la XIV, Ana Oramas, también en el Mixto).",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura (Cristina Valido García, formació electoral CCa, Grup Mixt).",
        recordNote:
          "Sense grup propi: vot atribuït per diputat (Cristina Valido García; a la XIV, Ana Oramas, també al Mixt).",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura (Cristina Valido García, formación electoral CCa, Grupo Mixto).",
        recordNote:
          "Sen grupo propio: voto atribuído por deputado (Cristina Valido García; na XIV, Ana Oramas, tamén no Mixto).",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan (Cristina Valido García, CCa hauteskunde-formazioa, Talde Mistoa).",
        recordNote:
          "Talde propiorik gabe: botoa diputatuz diputatu egozten da (Cristina Valido García; XIV. legealdian, Ana Oramas, hura ere Talde Mistoan).",
      },
    },
  },
  {
    id: "upn",
    name: "Unión del Pueblo Navarro",
    short: "UPN",
    color: "#2B3E8E",
    initials: "UP",
    scope: "autonomica",
    regions: ["15"],
    bloc: "derecha",
    parliamentary: true,
    status: "confirmada",
    inclusionReason: "Escaño en el Congreso XV (Alberto Catalán Higueras, formación electoral UPN, Grupo Mixto).",
    inclusionSource: CONGRESO_DIPUTADOS,
    congressGroup: "GMx",
    recordNote:
      "Sin grupo propio: voto atribuido por diputado (Alberto Catalán Higueras). En la XIV, Sergio Sayas y Carlos García Adanero fueron elegidos por Navarra Suma y UPN los expulsó en 2022; su voto en la XIV debe revisarse antes de atribuirlo a UPN.",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura (Alberto Catalán Higueras, formació electoral UPN, Grup Mixt).",
        recordNote:
          "Sense grup propi: vot atribuït per diputat (Alberto Catalán Higueras). A la XIV, Sergio Sayas i Carlos García Adanero van ser elegits per Navarra Suma i UPN els va expulsar el 2022; el seu vot a la XIV s'ha de revisar abans d'atribuir-lo a UPN.",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura (Alberto Catalán Higueras, formación electoral UPN, Grupo Mixto).",
        recordNote:
          "Sen grupo propio: voto atribuído por deputado (Alberto Catalán Higueras). Na XIV, Sergio Sayas e Carlos García Adanero foron elixidos por Navarra Suma e UPN expulsounos en 2022; o seu voto na XIV debe revisarse antes de atribuílo a UPN.",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan (Alberto Catalán Higueras, UPN hauteskunde-formazioa, Talde Mistoa).",
        recordNote:
          "Talde propiorik gabe: botoa diputatuz diputatu egozten da (Alberto Catalán Higueras). XIV. legealdian, Sergio Sayas eta Carlos García Adanero Navarra Sumaren zerrendan hautatu zituzten, eta UPNk 2022an kanporatu zituen; XIV. legealdiko haien botoa berrikusi egin behar da UPNri egotzi aurretik.",
      },
    },
  },
  {
    id: "compromis",
    name: "Compromís",
    short: "Compromís",
    color: "#E0701F",
    initials: "CO",
    scope: "autonomica",
    regions: ["10"],
    bloc: "izquierda",
    parliamentary: true,
    status: "confirmada",
    inclusionReason:
      "Escaño en el Congreso XV: Àgueda Micó, elegida en la lista de SUMAR por Valencia, está en el Grupo Mixto desde el 3-7-2025 y registra iniciativas «a instancia de la diputada de Compromís».",
    inclusionSource: {
      url: "https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-557.PDF",
      title: "BOCG, Congreso de los Diputados, serie D, núm. 557 («a instancia de la diputada de Compromís Àgueda Micó i Micó»)",
    },
    congressGroup: "GMx",
    recordNote:
      "Sin grupo propio: voto atribuido por diputada (Àgueda Micó, en GMx desde el 3-7-2025; antes, en GSUMAR). El otro diputado elegido en la lista Compromís-Sumar, Alberto Ibáñez Mezquita, sigue en GSUMAR y su voto no se atribuye a Compromís. En la XIV, Joan Baldoví (Grupo Plural).",
    i18n: {
      ca: {
        inclusionReason:
          "Escó al Congrés de la XV legislatura: Àgueda Micó, elegida a la llista de SUMAR per València, és al Grup Mixt des del 3-7-2025 i registra iniciatives «a instancia de la diputada de Compromís».",
        recordNote:
          "Sense grup propi: vot atribuït per diputada (Àgueda Micó, a GMx des del 3-7-2025; abans, a GSUMAR). L'altre diputat elegit a la llista Compromís-Sumar, Alberto Ibáñez Mezquita, continua a GSUMAR i el seu vot no s'atribueix a Compromís. A la XIV, Joan Baldoví (Grup Plural).",
      },
      gl: {
        inclusionReason:
          "Escano no Congreso da XV lexislatura: Àgueda Micó, elixida na lista de SUMAR por Valencia, está no Grupo Mixto desde o 3-7-2025 e rexistra iniciativas «a instancia de la diputada de Compromís».",
        recordNote:
          "Sen grupo propio: voto atribuído por deputada (Àgueda Micó, en GMx desde o 3-7-2025; antes, en GSUMAR). O outro deputado elixido na lista Compromís-Sumar, Alberto Ibáñez Mezquita, segue en GSUMAR e o seu voto non se atribúe a Compromís. Na XIV, Joan Baldoví (Grupo Plural).",
      },
      eu: {
        inclusionReason:
          "Eserlekua XV. legealdiko Kongresuan: Àgueda Micó, SUMARen zerrendan Valentziagatik hautatua, Talde Mistoan dago 3-7-2025etik, eta «a instancia de la diputada de Compromís» formularekin erregistratzen ditu ekimenak.",
        recordNote:
          "Talde propiorik gabe: botoa diputatuari egozten zaio (Àgueda Micó, GMx taldean 3-7-2025etik; lehen, GSUMARen). Compromís-Sumar zerrendan hautatutako beste diputatua, Alberto Ibáñez Mezquita, GSUMARen dago oraindik, eta haren botoa ez zaio Compromísi egozten. XIV. legealdian, Joan Baldoví (Talde Plurala).",
      },
    },
  },

  // ─── Coaliciones para el 29-N que integran partidos con escaño ─────────
  {
    id: "frente-amplio",
    name: "Frente Amplio",
    short: "Frente Amplio",
    color: "#C2185B",
    initials: "FA",
    scope: "estatal",
    bloc: "izquierda",
    parliamentary: false,
    status: "por-confirmar",
    inclusionReason:
      "Coalición anunciada para el 29-N por Movimiento Sumar, Izquierda Unida, Más Madrid y Catalunya en Comú, que integra al grupo con escaño GSUMAR. Pendiente de registro ante la Junta Electoral; la participación de Podemos no está cerrada.",
    inclusionSource: {
      url: "https://www.101tv.es/espana/sumar-izquierda-unida-mas-madrid-y-comuns-se-unen-bajo-el-nombre-de-frente-amplio-de-cara-a-las-elecciones-del-29-n/",
      title: "Sumar, Izquierda Unida, Más Madrid y Comuns se unen bajo el nombre de Frente Amplio de cara a las elecciones del 29-N (prensa; sustituir por la resolución de la Junta Electoral cuando se publique)",
      date: "2026-10-05",
    },
    congressGroup: "GSUMAR",
    // XIV: IU y los Comuns estaban en GCUP-EC-GC (ver recordNote).
    congressGroupByLegislature: { XIV: "GCUP-EC-GC" },
    recordNote:
      "Sin historial propio: sus «Hechos» son las votaciones del grupo GSUMAR (XV) y, en la XIV, del grupo GCUP-EC-GC (Unidas Podemos), del que formaban parte IU y los Comuns. No incluye a Podemos salvo que conste en el registro de la coalición.",
    i18n: {
      ca: {
        inclusionReason:
          "Coalició anunciada per al 29-N per Movimiento Sumar, Izquierda Unida, Más Madrid i Catalunya en Comú, que integra el grup amb escó GSUMAR. Pendent de registre davant la Junta Electoral; la participació de Podemos no està tancada.",
        recordNote:
          "Sense historial propi: els seus «Fets» són les votacions del grup GSUMAR (XV) i, a la XIV, del grup GCUP-EC-GC (Unidas Podemos), del qual formaven part IU i els Comuns. No inclou Podemos llevat que consti al registre de la coalició.",
      },
      gl: {
        inclusionReason:
          "Coalición anunciada para o 29-N por Movimiento Sumar, Izquierda Unida, Más Madrid e Catalunya en Comú, que integra o grupo con escano GSUMAR. Pendente de rexistro ante a Xunta Electoral; a participación de Podemos non está pechada.",
        recordNote:
          "Sen historial propio: os seus «Feitos» son as votacións do grupo GSUMAR (XV) e, na XIV, do grupo GCUP-EC-GC (Unidas Podemos), do que formaban parte IU e os Comuns. Non inclúe Podemos agás que conste no rexistro da coalición.",
      },
      eu: {
        inclusionReason:
          "Movimiento Sumarrek, Izquierda Unidak, Más Madridek eta Catalunya en Comúk 29-N hauteskundeetarako iragarritako koalizioa; eserlekua duen GSUMAR taldea biltzen du. Hauteskunde Batzordearen aurrean erregistratzeko zain dago; Podemosen parte-hartzea ez dago itxita.",
        recordNote:
          "Historial propiorik gabe: haren «Egitateak» GSUMAR taldearen bozketak dira (XV) eta, XIV. legealdian, GCUP-EC-GC taldearenak (Unidas Podemos), zeinetan IU eta Comunsak baitzeuden. Ez du Podemos barne hartzen, koalizioaren erregistroan hala jasotzen ez bada.",
      },
    },
  },
  // ─── Extraparlamentarios que cumplen el criterio ────────────────────────
  // Todos `status: "por-confirmar"`: cumplen el criterio de inclusión, pero
  // aún no consta que presenten candidatura el 29-N (proclamación de
  // candidaturas tras el 26-10-2026). Si no se presentan, se retiran.
  // Rama (c), ≥ 1 % en 2023: NINGÚN partido sin escaño la cumple (el mayor fue
  // PACMA, 169.237 votos, 0,69 % de 24.688.087 válidos; JEC, BOE-A-2023-18907).
  // IU, Más Madrid y Catalunya en Comú cumplen la rama (b), pero concurren
  // dentro de «Frente Amplio» y se representan con esa entrada.
  // Contigo Navarra, Por Andalucía, Unidas por Extremadura, Podemos-IU… son
  // coaliciones de partidos ya incluidos: no se añaden aparte.
  // Ceuta y Melilla (MDyC, Ceuta Ya!, CpM, Somos Melilla): sus asambleas no son
  // «parlamentos autonómicos» en sentido estricto. NO incluidos: decisión del
  // dueño pendiente.
  // ⚠️ Los escaños autonómicos marcados «fuente secundaria» se han comprobado
  // con prensa/Wikipedia y la web del parlamento; falta enlazar el acta o
  // boletín oficial de proclamación (tarea pendiente antes de publicar).
  ...extra([
    {
      id: "salf", name: "Se Acabó La Fiesta", short: "SALF", color: "#6D6E71", initials: "SA",
      bloc: "derecha",
      reason: "Escaño en el Parlamento Europeo: obtuvo 3 en 2024 (agrupación de electores «Se Acabó La Fiesta»); hoy conserva 1 (Luis «Alvise» Pérez). Los otros dos se pasaron al ECR como independientes.",
      source: { url: "https://www.europarl.europa.eu/meps/en/search/advanced?countryCode=ES", title: "Parlamento Europeo — diputados de España (Alvise Pérez, «Se Acabó la Fiesta»)", date: "2026-10-06" },
      i18n: { ca: "Escó al Parlament Europeu: en va obtenir 3 el 2024 (agrupació d'electors «Se Acabó La Fiesta»); avui en conserva 1 (Luis «Alvise» Pérez). Els altres dos van passar a l'ECR com a independents.", gl: "Escano no Parlamento Europeo: obtivo 3 en 2024 (agrupación de electores «Se Acabó La Fiesta»); hoxe conserva 1 (Luis «Alvise» Pérez). Os outros dous pasaron ao ECR como independentes.", eu: "Eserlekua Europako Parlamentuan: 3 lortu zituen 2024an («Se Acabó La Fiesta» hautesle-elkartea); gaur egun 1 du (Luis «Alvise» Pérez). Beste biak ECR taldera igaro ziren independente gisa." },
    },
    {
      id: "adelante-andalucia", name: "Adelante Andalucía", short: "Adelante", color: "#2E9E6A", initials: "AA",
      regions: ["01"], bloc: "izquierda",
      reason: "8 escaños en el Parlamento de Andalucía (elecciones del 17-5-2026).",
      source: { url: "https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00008_10000473.pdf", title: "BOJA nº 108, 8-6-2026: resultados proclamados por la Junta Electoral de Andalucía", date: "2026-06-08" },
      i18n: { ca: "8 escons al Parlament d'Andalusia (eleccions del 17-5-2026).", gl: "8 escanos no Parlamento de Andalucía (eleccións do 17-5-2026).", eu: "8 eserleku Andaluziako Parlamentuan (17-5-2026ko hauteskundeak)." },
    },
    {
      id: "cha", name: "Chunta Aragonesista", short: "CHA", color: "#E2001A", initials: "CH",
      regions: ["02"], bloc: "nacionalista",
      reason: "6 escaños en las Cortes de Aragón (elecciones del 8-2-2026). Además, un diputado en el Congreso XV elegido en la lista de SUMAR que sigue en GSUMAR.",
      source: { url: "https://www.aragon.es/portal-de-elecciones/resultados-electorales", title: "Gobierno de Aragón — resultados electorales, Cortes de Aragón 2026", date: "2026-02-25" },
      i18n: { ca: "6 escons a les Corts d'Aragó (eleccions del 8-2-2026). A més, un diputat al Congrés de la XV legislatura elegit a la llista de SUMAR que continua a GSUMAR.", gl: "6 escanos nas Cortes de Aragón (eleccións do 8-2-2026). Ademais, un deputado no Congreso da XV lexislatura elixido na lista de SUMAR que segue en GSUMAR.", eu: "6 eserleku Aragoiko Gorteetan (8-2-2026ko hauteskundeak). Gainera, diputatu bat XV. legealdiko Kongresuan, SUMARen zerrendan hautatua eta oraindik GSUMARen dagoena." },
    },
    {
      id: "aragon-existe", name: "Aragón Existe – Teruel Existe", short: "Teruel Existe", color: "#00843D", initials: "TE",
      regions: ["02"], bloc: "otro",
      reason: "2 escaños en las Cortes de Aragón (elecciones del 8-2-2026).",
      source: { url: "https://www.aragon.es/portal-de-elecciones/resultados-electorales", title: "Gobierno de Aragón — resultados electorales, Cortes de Aragón 2026", date: "2026-02-25" },
      i18n: { ca: "2 escons a les Corts d'Aragó (eleccions del 8-2-2026).", gl: "2 escanos nas Cortes de Aragón (eleccións do 8-2-2026).", eu: "2 eserleku Aragoiko Gorteetan (8-2-2026ko hauteskundeak)." },
    },
    {
      id: "foro", name: "Foro Asturias", short: "Foro", color: "#004A99", initials: "FO",
      regions: ["03"], bloc: "derecha",
      reason: "1 escaño en la Junta General del Principado de Asturias (elecciones del 28-5-2023).",
      source: { url: "https://www.jgpa.es/documents/11156/18491/Resultados+electorales+2023+%28XII+Legislatura%29/79394093-f262-4829-845a-faf8cc85fe30", title: "Junta General del Principado — resultados electorales 2023 (XII legislatura)" },
      i18n: { ca: "1 escó a la Junta General del Principat d'Astúries (eleccions del 28-5-2023).", gl: "1 escano na Xunta Xeral do Principado de Asturias (eleccións do 28-5-2023).", eu: "Eserleku 1 Asturiasko Printzerriko Batzar Nagusian (28-5-2023ko hauteskundeak)." },
    },
    {
      id: "mes-mallorca", name: "Més per Mallorca", short: "Més", color: "#C8102E", initials: "MM",
      regions: ["04"], bloc: "nacionalista",
      reason: "4 escaños en el Parlament de les Illes Balears (elecciones del 28-5-2023). Fuente secundaria.",
      source: { url: "https://www.parlamentib.es", title: "Parlament de les Illes Balears (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "4 escons al Parlament de les Illes Balears (eleccions del 28-5-2023). Font secundària.", gl: "4 escanos no Parlamento das Illas Baleares (eleccións do 28-5-2023). Fonte secundaria.", eu: "4 eserleku Balear Uharteetako Parlamentuan (28-5-2023ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "mes-menorca", name: "Més per Menorca", short: "MxMe", color: "#8DC63F", initials: "ME",
      regions: ["04"], bloc: "nacionalista",
      reason: "2 escaños en el Parlament de les Illes Balears (elecciones del 28-5-2023). Fuente secundaria.",
      source: { url: "https://www.parlamentib.es", title: "Parlament de les Illes Balears (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "2 escons al Parlament de les Illes Balears (eleccions del 28-5-2023). Font secundària.", gl: "2 escanos no Parlamento das Illas Baleares (eleccións do 28-5-2023). Fonte secundaria.", eu: "2 eserleku Balear Uharteetako Parlamentuan (28-5-2023ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "nc-bc", name: "Nueva Canarias – Bloque Canarista", short: "NC-BC", color: "#F39200", initials: "NC",
      regions: ["05"], bloc: "nacionalista",
      reason: "5 escaños en el Parlamento de Canarias (elecciones del 28-5-2023), según el registro oficial de diputados por grupo.",
      source: { url: "https://www.parcan.es/composicion/diputados/busqueda_por_grupo_parlamentario/11/", title: "Parlamento de Canarias — diputados por grupo parlamentario", date: "2026-10-06" },
      i18n: { ca: "5 escons al Parlament de Canàries (eleccions del 28-5-2023), segons el registre oficial de diputats per grup.", gl: "5 escanos no Parlamento de Canarias (eleccións do 28-5-2023), segundo o rexistro oficial de deputados por grupo.", eu: "5 eserleku Kanarietako Parlamentuan (28-5-2023ko hauteskundeak), diputatuen talde araberako erregistro ofizialaren arabera." },
    },
    {
      id: "asg", name: "Agrupación Socialista Gomera", short: "ASG", color: "#0072BC", initials: "AG",
      regions: ["05"], bloc: "otro",
      reason: "3 escaños en el Parlamento de Canarias (elecciones del 28-5-2023).",
      source: { url: "https://www.parcan.es/composicion/diputados/busqueda_por_grupo_parlamentario/11/", title: "Parlamento de Canarias — diputados por grupo parlamentario", date: "2026-10-06" },
      i18n: { ca: "3 escons al Parlament de Canàries (eleccions del 28-5-2023).", gl: "3 escanos no Parlamento de Canarias (eleccións do 28-5-2023).", eu: "3 eserleku Kanarietako Parlamentuan (28-5-2023ko hauteskundeak)." },
    },
    {
      id: "ahi", name: "Agrupación Herreña Independiente", short: "AHI", color: "#5B9BD5", initials: "AH",
      regions: ["05"], bloc: "otro",
      reason: "1 escaño en el Parlamento de Canarias (Raúl Acosta, Grupo Mixto; elecciones del 28-5-2023).",
      source: { url: "https://www.parcan.es/composicion/diputados/busqueda_por_grupo_parlamentario/11/", title: "Parlamento de Canarias — diputados por grupo parlamentario", date: "2026-10-06" },
      i18n: { ca: "1 escó al Parlament de Canàries (Raúl Acosta, Grup Mixt; eleccions del 28-5-2023).", gl: "1 escano no Parlamento de Canarias (Raúl Acosta, Grupo Mixto; eleccións do 28-5-2023).", eu: "Eserleku 1 Kanarietako Parlamentuan (Raúl Acosta, Talde Mistoa; 28-5-2023ko hauteskundeak)." },
    },
    {
      id: "prc", name: "Partido Regionalista de Cantabria", short: "PRC", color: "#9BBB59", initials: "PR",
      regions: ["06"], bloc: "otro",
      reason: "8 escaños en el Parlamento de Cantabria (elecciones del 28-5-2023). Fuente secundaria.",
      source: { url: "https://parlamento-cantabria.es", title: "Parlamento de Cantabria (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "8 escons al Parlament de Cantàbria (eleccions del 28-5-2023). Font secundària.", gl: "8 escanos no Parlamento de Cantabria (eleccións do 28-5-2023). Fonte secundaria.", eu: "8 eserleku Kantabriako Parlamentuan (28-5-2023ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "upl", name: "Unión del Pueblo Leonés", short: "UPL", color: "#7B2C83", initials: "UL",
      regions: ["07"], bloc: "otro",
      reason: "3 escaños en las Cortes de Castilla y León (elecciones del 15-3-2026). Fuente secundaria (la web oficial de resultados no cargó).",
      source: { url: "https://elecciones2026ccyl.es/es/resultados/cortes/0/30", title: "Junta de Castilla y León — resultados Cortes 2026 (no verificada en carga)" },
      i18n: { ca: "3 escons a les Corts de Castella i Lleó (eleccions del 15-3-2026). Font secundària (el web oficial de resultats no es va carregar).", gl: "3 escanos nas Cortes de Castela e León (eleccións do 15-3-2026). Fonte secundaria (a web oficial de resultados non cargou).", eu: "3 eserleku Gaztela eta Leongo Gorteetan (15-3-2026ko hauteskundeak). Bigarren mailako iturria (emaitzen webgune ofiziala ez zen kargatu)." },
    },
    {
      id: "por-avila", name: "Por Ávila", short: "XAV", color: "#00A19A", initials: "XA",
      regions: ["07"], bloc: "otro",
      reason: "1 escaño en las Cortes de Castilla y León (elecciones del 15-3-2026). Fuente secundaria.",
      source: { url: "https://elecciones2026ccyl.es/es/resultados/cortes/0/30", title: "Junta de Castilla y León — resultados Cortes 2026 (no verificada en carga)" },
      i18n: { ca: "1 escó a les Corts de Castella i Lleó (eleccions del 15-3-2026). Font secundària.", gl: "1 escano nas Cortes de Castela e León (eleccións do 15-3-2026). Fonte secundaria.", eu: "Eserleku 1 Gaztela eta Leongo Gorteetan (15-3-2026ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "soria-ya", name: "Soria ¡Ya!", short: "Soria ¡Ya!", color: "#4CAF50", initials: "SY",
      regions: ["07"], bloc: "otro",
      reason: "1 escaño en las Cortes de Castilla y León (elecciones del 15-3-2026). Fuente secundaria.",
      source: { url: "https://elecciones2026ccyl.es/es/resultados/cortes/0/30", title: "Junta de Castilla y León — resultados Cortes 2026 (no verificada en carga)" },
      i18n: { ca: "1 escó a les Corts de Castella i Lleó (eleccions del 15-3-2026). Font secundària.", gl: "1 escano nas Cortes de Castela e León (eleccións do 15-3-2026). Fonte secundaria.", eu: "Eserleku 1 Gaztela eta Leongo Gorteetan (15-3-2026ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "cup", name: "Candidatura d'Unitat Popular", short: "CUP", color: "#FFED00", initials: "CU",
      regions: ["09"], bloc: "nacionalista",
      reason: "4 escaños en el Parlament de Catalunya (elecciones del 12-5-2024). Fuente secundaria.",
      source: { url: "https://www.parlament.cat", title: "Parlament de Catalunya (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "4 escons al Parlament de Catalunya (eleccions del 12-5-2024). Font secundària.", gl: "4 escanos no Parlamento de Cataluña (eleccións do 12-5-2024). Fonte secundaria.", eu: "4 eserleku Kataluniako Parlamentuan (12-5-2024ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "alianca-catalana", name: "Aliança Catalana", short: "AC", color: "#1F3A68", initials: "AC",
      regions: ["09"], bloc: "nacionalista",
      reason: "2 escaños en el Parlament de Catalunya (elecciones del 12-5-2024). Fuente secundaria.",
      source: { url: "https://www.parlament.cat", title: "Parlament de Catalunya (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "2 escons al Parlament de Catalunya (eleccions del 12-5-2024). Font secundària.", gl: "2 escanos no Parlamento de Cataluña (eleccións do 12-5-2024). Fonte secundaria.", eu: "2 eserleku Kataluniako Parlamentuan (12-5-2024ko hauteskundeak). Bigarren mailako iturria." },
    },
    {
      id: "democracia-ourensana", name: "Democracia Ourensana", short: "DO", color: "#F7A600", initials: "DO",
      regions: ["12"], bloc: "otro",
      reason: "1 escaño en el Parlamento de Galicia (elecciones del 18-2-2024).",
      source: { url: "https://resultados2024.xunta.gal", title: "Xunta de Galicia — resultados eleccións ao Parlamento de Galicia 2024", date: "2024-02-18" },
      i18n: { ca: "1 escó al Parlament de Galícia (eleccions del 18-2-2024).", gl: "1 escano no Parlamento de Galicia (eleccións do 18-2-2024).", eu: "Eserleku 1 Galiziako Parlamentuan (18-2-2024ko hauteskundeak)." },
    },
    {
      id: "geroa-bai", name: "Geroa Bai", short: "Geroa Bai", color: "#E4032E", initials: "GB",
      regions: ["15"], bloc: "nacionalista",
      reason: "7 escaños en el Parlamento de Navarra (elecciones del 28-5-2023). Fuente secundaria. Integra al PNV en Navarra.",
      source: { url: "https://www.parlamentodenavarra.es", title: "Parlamento de Navarra (composición; pendiente enlazar acta oficial)" },
      i18n: { ca: "7 escons al Parlament de Navarra (eleccions del 28-5-2023). Font secundària. Integra el PNV a Navarra.", gl: "7 escanos no Parlamento de Navarra (eleccións do 28-5-2023). Fonte secundaria. Integra o PNV en Navarra.", eu: "7 eserleku Nafarroako Parlamentuan (28-5-2023ko hauteskundeak). Bigarren mailako iturria. Nafarroan PNV biltzen du." },
    },
  ]),

];

/**
 * La tabla diputado → partido para los partidos sin grupo propio vive en
 * `deputies.ts` (mismo paquete de trabajo, WP2).
 */

/*
 * PARTIDO LIBERTARIO (P-LIB) — comprobado contra las tres ramas el 2026-10-06:
 *   (a) Parlamento Europeo 2024: no figura entre las 33 candidaturas
 *       proclamadas por la Junta Electoral Central (BOE-A-2024-9687,
 *       https://www.boe.es/boe/dias/2024/05/14/pdfs/BOE-A-2024-9687.pdf).
 *   (b) Parlamentos autonómicos: ningún escaño en la composición vigente de
 *       los 17 parlamentos.
 *   (c) Generales 2023: no aparece ninguna candidatura «P-LIB» ni «Partido
 *       Libertario» en los resultados oficiales de la JEC (Cuadros I–III,
 *       BOE-A-2023-18907, https://www.boe.es/boe/dias/2023/09/01/pdfs/BOE-A-2023-18907.pdf),
 *       que listan hasta candidaturas de 115 votos.
 *   VEREDICTO: NO cumple el criterio y no se incluye. Si en el futuro lo
 *   cumpliera, entraría por la misma regla que cualquier otro.
 *
 * CIUDADANOS: no cumple ninguna rama (sin eurodiputados, sin escaños
 * autonómicos, no se presentó a las generales de 2023).
 */
