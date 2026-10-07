/**
 * Las 15 afirmaciones de «¿A quién votar? Objetivamente» (generales del
 * 29-N-2026, Real Decreto 806/2026, BOE-A-2026-20742:
 * https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742).
 *
 * Reglas con las que se han elegido y redactado (ver `docs/AFINIDAD-PLAN.md`):
 *
 * - **Una medida concreta y votable por ítem**, no un valor abstracto: la escala
 *   es de 4 puntos sin punto medio, así que la persona tiene que poder ponerse
 *   de un lado sabiendo qué está apoyando.
 * - **Cada ítem tiene al menos una votación ancla real del Congreso** (XIV o XV),
 *   comprobada contra el JSON de datos abiertos de congreso.es el 2026-10-06.
 *   Sesión, fecha, número y título están copiados del propio JSON
 *   (`informacion.sesion`, `fecha`, `numeroVotacion`, `textoExpediente` +
 *   `textoSubGrupo`). `agreeMeans` dice qué voto equivale a estar de acuerdo
 *   con la afirmación tal como está escrita.
 * - **Equilibrio**: en cada votación ancla hay al menos dos de los partidos con
 *   escaño a cada lado (comprobado en el JSON; el detalle por grupo lo codifica
 *   WP4). Siete afirmaciones están redactadas en el sentido que defiende la
 *   izquierda y ocho en el que defiende la derecha, para que «estar de acuerdo
 *   con todo» no empuje hacia un bloque.
 * - **Discriminación** (revisión del 2026-10-06, `docs/AFINIDAD-PREGUNTAS.md`):
 *   se retiraron las cinco preguntas en las que casi todos los partidos votaban
 *   en dos bloques (eutanasia, autodeterminación registral, castellano
 *   vehicular, arraigo y reparto de menores; ver `rejectedCandidates`) y se
 *   sustituyeron por votaciones que dividen a partidos del mismo bloque (PP/VOX,
 *   PSOE/Sumar, Sumar/Podemos, ERC/EH Bildu, ERC/Junts, PNV/EH Bildu). En una
 *   segunda revisión del mismo día se cambió «seguro-ingresos-agrarios» (poco
 *   relieve público) por «iva-primera-vivienda», y «jornada-37-5» ganó una
 *   segunda ancla que separa PP de VOX.
 * - **Reparto temático**: vivienda (3), impuestos (2), banca, trabajo,
 *   seguridad, modelo territorial (2), energía, prostitución, defensa,
 *   transparencia, cultura.
 *
 * Votaciones de la XIV: los grupos de entonces no son los de ahora (Unidas
 * Podemos = GCUP-EC-GC, Junts y BNG estaban en el Grupo Plural, existía Cs). El
 * mapeo grupo→partido por legislatura es trabajo de WP4; aquí solo se fija la
 * votación.
 *
 * Votaciones «por llamamiento» (p. ej. la votación final de la amnistía del
 * 30-5-2024) no publican JSON nominal en datos abiertos; por eso se usan como
 * ancla votaciones que sí lo tienen.
 *
 * ⚠️ TRADUCCIONES: `ca`, `gl` y `eu` las ha hecho un agente, no una persona
 * nativa. Están PENDIENTES DE REVISIÓN HUMANA (registrar en
 * `docs/AFINIDAD-CAMBIOS.md`). Se ha intentado conservar la neutralidad y los
 * términos jurídicos (arraigo → arrelament / arraigamento / errotzea; IRPF →
 * PFEZ en euskera), pero no deben publicarse sin revisión.
 */

import type { Question } from "./types";

const CONGRESO = "https://www.congreso.es/webpublica/opendata/votaciones";

export const questions: Question[] = [
  {
    id: "vivienda-tope-alquiler",
    order: 1,
    topic: "vivienda",
    label: "tope al alquiler en zonas tensionadas",
    text: {
      es: "En las zonas declaradas tensionadas, la ley debe limitar el precio de los nuevos contratos de alquiler.",
      ca: "A les zones declarades tensionades, la llei ha de limitar el preu dels nous contractes de lloguer.",
      gl: "Nas zonas declaradas tensionadas, a lei debe limitar o prezo dos novos contratos de aluguer.",
      eu: "Tentsionatutzat jotako eremuetan, legeak alokairu-kontratu berrien prezioa mugatu behar du.",
    },
    rationale:
      "Mide si se apoya la intervención directa en el precio del alquiler. La Ley 12/2023, por el derecho a la vivienda, permite declarar zonas de mercado residencial tensionado y limitar en ellas la renta de los nuevos contratos. Ancla: votación del dictamen de esa ley en el Pleno (XIV).",
    anchors: [
      {
        legislature: "XIV",
        session: 256,
        date: "2023-04-27",
        number: 173,
        title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.",
        url: `${CONGRESO}/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "topall al lloguer en zones tensionades",
        rationale:
          "Mesura si es dona suport a la intervenció directa en el preu del lloguer. La Llei 12/2023, pel dret a l'habitatge, permet declarar zones de mercat residencial tensionat i limitar-hi la renda dels nous contractes. Àncora: votació del dictamen d'aquesta llei al Ple (XIV).",
      },
      gl: {
        label: "teito ao aluguer en zonas tensionadas",
        rationale:
          "Mide se se apoia a intervención directa no prezo do aluguer. A Lei 12/2023, polo dereito á vivenda, permite declarar zonas de mercado residencial tensionado e limitar nelas a renda dos novos contratos. Áncora: votación do ditame desa lei no Pleno (XIV).",
      },
      eu: {
        label: "alokairuaren muga eremu tentsionatuetan",
        rationale:
          "Alokairuaren prezioan zuzenean esku hartzearen aldeko jarrera neurtzen du. Etxebizitzarako eskubideari buruzko 12/2023 Legeak aukera ematen du bizitegi-merkatu tentsionatuko eremuak izendatzeko eta haietan kontratu berrien errenta mugatzeko. Aingura: lege horren irizpenaren bozketa Osoko Bilkuran (XIV).",
      },
    },
  },
  {
    id: "irpf-inflacion",
    order: 2,
    topic: "impuestos",
    label: "IRPF ligado a la inflación",
    text: {
      es: "Los tramos del IRPF deben actualizarse cada año con la inflación.",
      ca: "Els trams de l'IRPF s'han d'actualitzar cada any amb la inflació.",
      gl: "Os tramos do IRPF deben actualizarse cada ano coa inflación.",
      eu: "PFEZaren tarteak urtero eguneratu behar dira inflazioaren arabera.",
    },
    rationale:
      "Mide si se quiere evitar que el impuesto suba cuando los salarios solo compensan la subida de precios («deflactar» la tarifa). Ancla: proposición no de ley del GPP para deflactar el IRPF, votada en el Pleno (XV).",
    anchors: [
      {
        legislature: "XV",
        session: 34,
        date: "2024-04-09",
        number: 12,
        title:
          "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.",
        url: `${CONGRESO}/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "IRPF lligat a la inflació",
        rationale:
          "Mesura si es vol evitar que l'impost pugi quan els salaris només compensen la pujada de preus («deflactar» la tarifa). Àncora: proposició no de llei del GPP per deflactar l'IRPF, votada al Ple (XV).",
      },
      gl: {
        label: "IRPF ligado á inflación",
        rationale:
          "Mide se se quere evitar que o imposto suba cando os salarios só compensan a suba de prezos («deflactar» a tarifa). Áncora: proposición non de lei do GPP para deflactar o IRPF, votada no Pleno (XV).",
      },
      eu: {
        label: "PFEZa inflazioari lotuta",
        rationale:
          "Soldatek prezioen igoera besterik konpentsatzen ez dutenean zerga igo ez dadin saihestu nahi den neurtzen du (tarifa «deflaktatzea»). Aingura: GPPren legez besteko proposamena, PFEZa deflaktatzeko, Osoko Bilkuran bozkatua (XV).",
      },
    },
  },
  {
    id: "jornada-37-5",
    order: 3,
    topic: "trabajo",
    label: "jornada de 37,5 horas",
    text: {
      es: "La jornada laboral máxima legal debe bajar de 40 a 37,5 horas semanales, sin reducción de sueldo.",
      ca: "La jornada laboral màxima legal ha de baixar de 40 a 37,5 hores setmanals, sense reducció de sou.",
      gl: "A xornada laboral máxima legal debe baixar de 40 a 37,5 horas semanais, sen redución de soldo.",
      eu: "Legezko gehieneko lanaldia astean 40 ordutik 37,5 ordura jaitsi behar da, soldata murriztu gabe.",
    },
    rationale:
      "Mide si se apoya reducir por ley la jornada máxima. El proyecto de ley (BOCG-15-A-58-1) fija 37,5 horas semanales en cómputo anual y garantiza que no afecte a las retribuciones. Ancla: enmiendas a la totalidad de devolución de Junts, Vox y PP, aprobadas; votar «sí» a la devolución es estar en contra de la afirmación. Segunda ancla: PNL del GSUMAR que pedía reducir por ley la jornada máxima, empezando por 38,5 horas en 2024 (BOCG-15-D-96), aprobada con la abstención del PP y de Junts y el no de VOX y UPN.",
    anchors: [
      {
        legislature: "XV",
        session: 130,
        date: "2025-09-10",
        number: 10,
        title:
          "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.",
        url: `${CONGRESO}/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json`,
        agreeMeans: "no",
      },
      {
        legislature: "XV",
        session: 23,
        date: "2024-02-22",
        number: 2,
        title:
          "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.",
        url: `${CONGRESO}/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "jornada de 37,5 hores",
        rationale:
          "Mesura si es dona suport a reduir per llei la jornada màxima. El projecte de llei (BOCG-15-A-58-1) fixa 37,5 hores setmanals en còmput anual i garanteix que no afecti les retribucions. Àncora: esmenes a la totalitat de devolució de Junts, Vox i PP, aprovades; votar «sí» a la devolució és estar en contra de l'afirmació. Segona àncora: PNL del GSUMAR que demanava reduir per llei la jornada màxima, començant per 38,5 hores el 2024 (BOCG-15-D-96), aprovada amb l'abstenció del PP i de Junts i el no de VOX i UPN.",
      },
      gl: {
        label: "xornada de 37,5 horas",
        rationale:
          "Mide se se apoia reducir por lei a xornada máxima. O proxecto de lei (BOCG-15-A-58-1) fixa 37,5 horas semanais en cómputo anual e garante que non afecte ás retribucións. Áncora: emendas á totalidade de devolución de Junts, Vox e PP, aprobadas; votar «si» á devolución é estar en contra da afirmación. Segunda áncora: PNL do GSUMAR que pedía reducir por lei a xornada máxima, comezando por 38,5 horas en 2024 (BOCG-15-D-96), aprobada coa abstención do PP e de Junts e o non de VOX e UPN.",
      },
      eu: {
        label: "37,5 orduko lanaldia",
        rationale:
          "Gehieneko lanaldia legez murriztearen aldeko jarrera neurtzen du. Lege-proiektuak (BOCG-15-A-58-1) astean 37,5 ordu ezartzen ditu urteko zenbaketan, eta bermatzen du ordainsariei ez diela eragingo. Aingura: Juntsek, Voxek eta PPk aurkeztutako itzultzeko osoko zuzenketak, onartuak; itzultzearen alde «bai» bozkatzea baieztapenaren aurka egotea da. Bigarren aingura: GSUMARen legez besteko proposamena, gehieneko lanaldia legez murrizteko eskatzen zuena, 2024an 38,5 ordutik hasita (BOCG-15-D-96); onartu egin zen, PPren eta Juntsen abstentzioarekin eta VOXen eta UPNren ezezkoarekin.",
      },
    },
  },
  {
    id: "prisiones-agentes-autoridad",
    order: 4,
    topic: "seguridad",
    label: "prisiones: agentes de la autoridad",
    text: {
      es: "Los funcionarios de prisiones deben tener por ley la condición de agentes de la autoridad.",
      ca: "Els funcionaris de presons han de tenir per llei la condició d'agents de l'autoritat.",
      gl: "Os funcionarios de prisións deben ter por lei a condición de axentes da autoridade.",
      eu: "Espetxeetako funtzionarioek legez agintaritzaren agente izaera izan behar dute.",
    },
    rationale:
      "Mide el apoyo a reconocer por ley a los funcionarios de la Administración Penitenciaria como agentes de la autoridad (modificación del artículo 80 de la Ley Orgánica General Penitenciaria). Ancla: votación de conjunto de la proposición de ley orgánica en el Pleno (XV), aprobada por 323 votos a favor y 21 en contra. Separa a Sumar (sí) de Podemos, ERC, EH Bildu y BNG (no).",
    anchors: [
      {
        legislature: "XV",
        session: 185,
        date: "2026-06-11",
        number: 39,
        title:
          "Proposición de Ley Orgánica por la que se modifica el artículo ochenta de la Ley Orgánica 1/1979, de 26 de septiembre, General Penitenciaria, para reconocer, a efectos legales, el carácter de agentes de la autoridad a los funcionarios de la Administración Penitenciaria. Votación de conjunto, por tener la misma carácter orgánico.",
        url: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion039/VOT_20260611145750.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "presons: agents de l'autoritat",
        rationale:
          "Mesura el suport a reconèixer per llei els funcionaris de l'Administració Penitenciària com a agents de l'autoritat (modificació de l'article 80 de la Llei orgànica general penitenciària). Àncora: votació de conjunt de la proposició de llei orgànica al Ple (XV), aprovada per 323 vots a favor i 21 en contra. Separa Sumar (sí) de Podemos, ERC, EH Bildu i BNG (no).",
      },
      gl: {
        label: "prisións: axentes da autoridade",
        rationale:
          "Mide o apoio a recoñecer por lei os funcionarios da Administración Penitenciaria como axentes da autoridade (modificación do artigo 80 da Lei orgánica xeral penitenciaria). Áncora: votación de conxunto da proposición de lei orgánica no Pleno (XV), aprobada por 323 votos a favor e 21 en contra. Separa Sumar (si) de Podemos, ERC, EH Bildu e BNG (non).",
      },
      eu: {
        label: "espetxeak: agintaritzaren agenteak",
        rationale:
          "Espetxe Administrazioko funtzionarioak legez agintaritzaren agente gisa aitortzearen aldeko jarrera neurtzen du (Espetxeei buruzko Lege Organiko Orokorraren 80. artikuluaren aldaketa). Aingura: lege organikoaren proposamenaren testu osoaren bozketa Osoko Bilkuran (XV), 323 aldeko botoz eta 21 kontrakoz onartua. Sumar (bai) bereizten du Podemos, ERC, EH Bildu eta BNGtik (ez).",
      },
    },
  },
  {
    id: "amnistia",
    order: 5,
    topic: "modelo-territorial",
    label: "ley de amnistía",
    text: {
      es: "Fue acertado aprobar la ley de amnistía para las personas encausadas por el proceso independentista catalán.",
      ca: "Va ser encertat aprovar la llei d'amnistia per a les persones encausades pel procés independentista català.",
      gl: "Foi acertado aprobar a lei de amnistía para as persoas encausadas polo proceso independentista catalán.",
      eu: "Zuzena izan zen Kataluniako prozesu independentistagatik auzipetutako pertsonentzako amnistia-legea onartzea.",
    },
    rationale:
      "Mide el apoyo a la Ley Orgánica de amnistía (2024). Ancla: votación del nuevo dictamen en el Pleno del 14-3-2024. La votación final del 30-5-2024 fue pública por llamamiento y no tiene JSON nominal en datos abiertos; por eso no se usa como ancla.",
    anchors: [
      {
        legislature: "XV",
        session: 30,
        date: "2024-03-14",
        number: 1,
        title:
          "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.",
        url: `${CONGRESO}/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "llei d'amnistia",
        rationale:
          "Mesura el suport a la Llei orgànica d'amnistia (2024). Àncora: votació del nou dictamen al Ple del 14-3-2024. La votació final del 30-5-2024 va ser pública per crida i no té JSON nominal a les dades obertes; per això no s'utilitza com a àncora.",
      },
      gl: {
        label: "lei de amnistía",
        rationale:
          "Mide o apoio á Lei orgánica de amnistía (2024). Áncora: votación do novo ditame no Pleno do 14-3-2024. A votación final do 30-5-2024 foi pública por chamamento e non ten JSON nominal nos datos abertos; por iso non se usa como áncora.",
      },
      eu: {
        label: "amnistia-legea",
        rationale:
          "Amnistiari buruzko Lege Organikoaren (2024) aldeko jarrera neurtzen du. Aingura: irizpen berriaren bozketa 14-3-2024ko Osoko Bilkuran. 30-5-2024ko azken bozketa publikoa izan zen, deialdi bidezkoa, eta ez du JSON izendunik datu irekietan; horregatik ez da aingura gisa erabiltzen.",
      },
    },
  },
  {
    id: "nuclear",
    order: 6,
    topic: "energia",
    label: "alargar las nucleares",
    text: {
      es: "Las centrales nucleares deben seguir funcionando más allá del calendario de cierre previsto entre 2027 y 2035.",
      ca: "Les centrals nuclears han de continuar funcionant més enllà del calendari de tancament previst entre el 2027 i el 2035.",
      gl: "As centrais nucleares deben seguir funcionando alén do calendario de peche previsto entre 2027 e 2035.",
      eu: "Zentral nuklearrek funtzionatzen jarraitu behar dute 2027 eta 2035 artean aurreikusitako ixte-egutegitik haratago.",
    },
    rationale:
      "Mide la postura sobre el cierre nuclear programado (las fechas 2027-2035 figuran en la exposición de motivos de la proposición, BOCG-15-B-206-1). Ancla: toma en consideración de la proposición de ley del GPP sobre la energía nuclear, aprobada (XV).",
    anchors: [
      {
        legislature: "XV",
        session: 119,
        date: "2025-06-17",
        number: 1,
        title:
          "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.",
        url: `${CONGRESO}/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "allargar les nuclears",
        rationale:
          "Mesura la posició sobre el tancament nuclear programat (les dates 2027-2035 figuren a l'exposició de motius de la proposició, BOCG-15-B-206-1). Àncora: presa en consideració de la proposició de llei del GPP sobre l'energia nuclear, aprovada (XV).",
      },
      gl: {
        label: "alongar as nucleares",
        rationale:
          "Mide a postura sobre o peche nuclear programado (as datas 2027-2035 figuran na exposición de motivos da proposición, BOCG-15-B-206-1). Áncora: toma en consideración da proposición de lei do GPP sobre a enerxía nuclear, aprobada (XV).",
      },
      eu: {
        label: "zentral nuklearrak luzatzea",
        rationale:
          "Programatutako itxiera nuklearrari buruzko jarrera neurtzen du (2027-2035 datak proposamenaren zioen azalpenean ageri dira, BOCG-15-B-206-1). Aingura: GPPk energia nuklearrari buruz aurkeztutako lege-proposamena aintzat hartzea, onartua (XV).",
      },
    },
  },
  {
    id: "prostitucion-abolicion",
    order: 7,
    topic: "prostitucion",
    label: "castigar a quien paga por sexo",
    text: {
      es: "El Código Penal debe castigar a quien paga por sexo y a quien se lucra con la prostitución de otra persona aunque esta consienta, sin sancionar a quien la ejerce.",
      ca: "El Codi Penal ha de castigar qui paga per sexe i qui es lucra amb la prostitució d'una altra persona encara que aquesta hi consenti, sense sancionar qui l'exerceix.",
      gl: "O Código Penal debe castigar a quen paga por sexo e a quen se lucra coa prostitución doutra persoa aínda que esta consinta, sen sancionar a quen a exerce.",
      eu: "Kode Penalak zigortu egin behar ditu sexuagatik ordaintzen duena eta beste pertsona baten prostituziotik etekina ateratzen duena, hark baimena eman arren, prostituzioan aritzen dena zigortu gabe.",
    },
    rationale:
      "Mide el apoyo al modelo abolicionista de la prostitución. La proposición del PSOE (BOCG-15-B-89-1) castiga el proxenetismo aunque haya consentimiento (art. 187.2), la tercería locativa (art. 187 bis) y con multa a quien conviene actos sexuales a cambio de dinero (art. 187 ter), y excluye sancionar a la persona en situación de prostitución. Ancla: toma en consideración, rechazada (XV). El PP votó en contra; VOX y Podemos se abstuvieron.",
    anchors: [
      {
        legislature: "XV",
        session: 38,
        date: "2024-05-21",
        number: 2,
        title:
          "Proposición de Ley del Grupo Parlamentario Socialista, Orgánica por la que se modifica la Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal, para prohibir el proxenetismo en todas sus formas.",
        url: `${CONGRESO}/Leg15/Sesion038/20240521/Votacion002/VOT_20240521203902.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "castigar qui paga per sexe",
        rationale:
          "Mesura el suport al model abolicionista de la prostitució. La proposició del PSOE (BOCG-15-B-89-1) castiga el proxenetisme encara que hi hagi consentiment (art. 187.2), la terceria locativa (art. 187 bis) i, amb multa, qui acorda actes sexuals a canvi de diners (art. 187 ter), i exclou sancionar la persona en situació de prostitució. Àncora: presa en consideració, rebutjada (XV). El PP hi va votar en contra; VOX i Podemos es van abstenir.",
      },
      gl: {
        label: "castigar a quen paga por sexo",
        rationale:
          "Mide o apoio ao modelo abolicionista da prostitución. A proposición do PSOE (BOCG-15-B-89-1) castiga o proxenetismo aínda que haxa consentimento (art. 187.2), a tercería locativa (art. 187 bis) e, con multa, a quen concerta actos sexuais a cambio de diñeiro (art. 187 ter), e exclúe sancionar a persoa en situación de prostitución. Áncora: toma en consideración, rexeitada (XV). O PP votou en contra; VOX e Podemos abstivéronse.",
      },
      eu: {
        label: "sexuagatik ordaintzen duena zigortzea",
        rationale:
          "Prostituzioaren eredu abolizionistaren aldeko jarrera neurtzen du. PSOEren proposamenak (BOCG-15-B-89-1) proxenetismoa zigortzen du, baimena egon arren (187.2 art.), baita prostituziorako lokalak uztea ere (187 bis art.), eta isunarekin zigortzen du dirutruke sexu-harremanak adosten dituena (187 ter art.); prostituzio-egoeran dagoen pertsona zigortzea baztertzen du. Aingura: aintzat hartzea, baztertua (XV). PPk aurka bozkatu zuen; VOXek eta Podemosek abstentzioa egin zuten.",
      },
    },
  },
  {
    id: "gasto-defensa",
    order: 8,
    topic: "defensa",
    label: "mantener el aumento del gasto militar",
    text: {
      es: "España debe mantener el aumento del gasto militar aprobado en los últimos años.",
      ca: "Espanya ha de mantenir l'augment de la despesa militar aprovat en els darrers anys.",
      gl: "España debe manter o aumento do gasto militar aprobado nos últimos anos.",
      eu: "Espainiak azken urteetan onartutako gastu militarraren igoerari eutsi behar dio.",
    },
    rationale:
      "Mide la postura sobre el aumento del gasto en defensa. Ancla: punto 1 de la moción del BNG (BOCG-15-D-552), que pedía «revertir todas las decisiones que implicaron en los últimos dos años un incremento del gasto militar»; votar «sí» a ese punto es estar en contra de la afirmación.",
    anchors: [
      {
        legislature: "XV",
        session: 185,
        date: "2026-06-11",
        number: 26,
        title:
          "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.",
        url: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json`,
        agreeMeans: "no",
      },
    ],
    i18n: {
      ca: {
        label: "mantenir l'augment de la despesa militar",
        rationale:
          "Mesura la posició sobre l'augment de la despesa en defensa. Àncora: punt 1 de la moció del BNG (BOCG-15-D-552), que demanava «revertir todas las decisiones que implicaron en los últimos dos años un incremento del gasto militar»; votar «sí» a aquest punt és estar en contra de l'afirmació.",
      },
      gl: {
        label: "manter o aumento do gasto militar",
        rationale:
          "Mide a postura sobre o aumento do gasto en defensa. Áncora: punto 1 da moción do BNG (BOCG-15-D-552), que pedía «revertir todas las decisiones que implicaron en los últimos dos años un incremento del gasto militar»; votar «si» a ese punto é estar en contra da afirmación.",
      },
      eu: {
        label: "gastu militarraren igoerari eustea",
        rationale:
          "Defentsa-gastuaren igoerari buruzko jarrera neurtzen du. Aingura: BNGren mozioaren 1. puntua (BOCG-15-D-552), honako hau eskatzen zuena: «revertir todas las decisiones que implicaron en los últimos dos años un incremento del gasto militar» (azken bi urteetan gastu militarra handitu zuten erabaki guztiak atzera botatzea); puntu horren alde «bai» bozkatzea baieztapenaren aurka egotea da.",
      },
    },
  },
  {
    id: "impuesto-grandes-fortunas",
    order: 9,
    topic: "impuestos",
    label: "impuesto a patrimonios >10 M€",
    text: {
      es: "Debe existir un impuesto estatal específico sobre los patrimonios de más de 10 millones de euros.",
      ca: "Hi ha d'haver un impost estatal específic sobre els patrimonis de més de 10 milions d'euros.",
      gl: "Debe existir un imposto estatal específico sobre os patrimonios de máis de 10 millóns de euros.",
      eu: "Estatuko zerga berezi bat egon behar da 10 milioi eurotik gorako ondareen gainean.",
    },
    rationale:
      "Mide el apoyo a gravar específicamente las grandes fortunas. La proposición de ley de Unidas Podemos (BOCG-14-B-235-1) creaba un impuesto estatal y definía la gran fortuna a partir de 10 millones de euros. Ancla: toma en consideración, rechazada (XIV). El impuesto temporal de solidaridad de 2022 no se usa como ancla: su votación de dictamen no tiene JSON en datos abiertos y la ley mezclaba otros dos gravámenes.",
    anchors: [
      {
        legislature: "XIV",
        session: 184,
        date: "2022-06-07",
        number: 1,
        title:
          "Proposición de Ley del Grupo Parlamentario Confederal de Unidas Podemos-En Comú Podem-Galicia en Común, del Impuesto sobre la titularidad, tenencia, disponibilidad, disfrute o uso de bienes o derechos por personas con grandes fortunas.",
        url: `${CONGRESO}/Leg14/Sesion184/20220607/Votacion001/VOT_20230302184835.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "impost a patrimonis >10 M€",
        rationale:
          "Mesura el suport a gravar específicament les grans fortunes. La proposició de llei d'Unidas Podemos (BOCG-14-B-235-1) creava un impost estatal i definia la gran fortuna a partir de 10 milions d'euros. Àncora: presa en consideració, rebutjada (XIV). L'impost temporal de solidaritat del 2022 no s'utilitza com a àncora: la votació del dictamen no té JSON a les dades obertes i la llei barrejava dos gravàmens més.",
      },
      gl: {
        label: "imposto a patrimonios >10 M€",
        rationale:
          "Mide o apoio a gravar especificamente as grandes fortunas. A proposición de lei de Unidas Podemos (BOCG-14-B-235-1) creaba un imposto estatal e definía a gran fortuna a partir de 10 millóns de euros. Áncora: toma en consideración, rexeitada (XIV). O imposto temporal de solidariedade de 2022 non se usa como áncora: a súa votación de ditame non ten JSON nos datos abertos e a lei mesturaba outros dous gravames.",
      },
      eu: {
        label: "10 M€-tik gorako ondareen zerga",
        rationale:
          "Fortuna handiei berariaz zerga ezartzearen aldeko jarrera neurtzen du. Unidas Podemosen lege-proposamenak (BOCG-14-B-235-1) estatuko zerga bat sortzen zuen, eta fortuna handitzat jotzen zuen 10 milioi eurotik gorakoa. Aingura: aintzat hartzea, baztertua (XIV). 2022ko aldi baterako elkartasun-zerga ez da aingura gisa erabiltzen: haren irizpenaren bozketak ez du JSONik datu irekietan, eta legeak beste bi karga ere biltzen zituen.",
      },
    },
  },
  {
    id: "okupacion-desalojo",
    order: 10,
    topic: "vivienda",
    label: "desalojo de okupas en 24 h",
    text: {
      es: "Ante una ocupación ilegal de vivienda, el juez debe ordenar el desalojo si en 24 horas los ocupantes no acreditan un título legal.",
      ca: "Davant d'una ocupació il·legal d'habitatge, el jutge ha d'ordenar el desallotjament si en 24 hores els ocupants no acrediten un títol legal.",
      gl: "Ante unha ocupación ilegal de vivenda, o xuíz debe ordenar o desaloxo se en 24 horas os ocupantes non acreditan un título legal.",
      eu: "Etxebizitza bat legez kontra okupatzen denean, epaileak hustea agindu behar du, okupatzaileek 24 orduan titulu legalik egiaztatzen ez badute.",
    },
    rationale:
      "Mide el apoyo a un desalojo exprés. La proposición del GPP (BOCG-15-B-304-1, nuevo art. 764 bis LECrim) obliga al juez a requerir a los ocupantes para que desalojen o acrediten título en 24 horas y, si no, a ordenar el desalojo inmediato. Ancla: toma en consideración, aprobada (XV).",
    anchors: [
      {
        legislature: "XV",
        session: 179,
        date: "2026-05-19",
        number: 1,
        title:
          "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, Orgánica contra la ocupación ilegal de inmuebles y para la convivencia vecinal y la protección de la seguridad de las personas y cosas en las comunidades de propietarios.",
        url: `${CONGRESO}/Leg15/Sesion179/20260519/Votacion001/VOT_20260519203502.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "desallotjament d'okupes en 24 h",
        rationale:
          "Mesura el suport a un desallotjament exprés. La proposició del GPP (BOCG-15-B-304-1, nou art. 764 bis LECrim) obliga el jutge a requerir els ocupants perquè desallotgin o acreditin un títol en 24 hores i, si no ho fan, a ordenar el desallotjament immediat. Àncora: presa en consideració, aprovada (XV).",
      },
      gl: {
        label: "desaloxo de okupas en 24 h",
        rationale:
          "Mide o apoio a un desaloxo exprés. A proposición do GPP (BOCG-15-B-304-1, novo art. 764 bis LECrim) obriga o xuíz a requirir os ocupantes para que desaloxen ou acrediten título en 24 horas e, se non, a ordenar o desaloxo inmediato. Áncora: toma en consideración, aprobada (XV).",
      },
      eu: {
        label: "okupatutako etxea 24 orduan hustea",
        rationale:
          "Berehalako husteen aldeko jarrera neurtzen du. GPPren proposamenak (BOCG-15-B-304-1, LECrim-en 764 bis art. berria) epaileari agintzen dio okupatzaileei eskatzeko 24 orduan hustu dezaten edo titulua egiazta dezaten, eta, bestela, berehalako hustea agintzeko. Aingura: aintzat hartzea, onartua (XV).",
      },
    },
  },
  {
    id: "iva-primera-vivienda",
    order: 11,
    topic: "vivienda",
    label: "IVA del 4 % en la primera vivienda",
    text: {
      es: "El IVA de la compra de la primera vivienda nueva debe bajar del 10 % al 4 %.",
      ca: "L'IVA de la compra del primer habitatge nou ha de baixar del 10 % al 4 %.",
      gl: "O IVE da compra da primeira vivenda nova debe baixar do 10 % ao 4 %.",
      eu: "Lehen etxebizitza berria erosteko BEZa % 10etik % 4ra jaitsi behar da.",
    },
    rationale:
      "Mide si se apoya abaratar por la vía fiscal la compra de la primera vivienda. Ancla: punto 1.d de la moción del GPP sobre la política de vivienda (BOCG-15-D-585), votado por separado y aprobado: «Bajar el IVA de adquisición de la primera vivienda nueva del 10 % al 4 % […] y permitir el fraccionamiento del IVA y del ITP al ritmo del pago de la hipoteca». Sí de PP, VOX, ERC, PNV, BNG, Compromís y UPN; no de Sumar, Podemos y EH Bildu; abstención de PSOE, Junts y CC. Es una moción (no vinculante). Separa a ERC de EH Bildu, a Compromís y BNG de Sumar, a PNV de EH Bildu y al PSOE de Sumar.",
    anchors: [
      {
        legislature: "XV",
        session: 196,
        date: "2026-09-10",
        number: 10,
        title:
          "Moción consecuencia de interpelación urgente del Grupo Parlamentario Popular en el Congreso, sobre la política en materia de vivienda del Gobierno. Votación separada por puntos. Punto 1.d.",
        url: `${CONGRESO}/Leg15/Sesion196/20260910/Votacion010/VOT_20260910180642.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "IVA del 4 % en el primer habitatge",
        rationale:
          "Mesura si es dona suport a abaratir per la via fiscal la compra del primer habitatge. Àncora: punt 1.d de la moció del GPP sobre la política d'habitatge (BOCG-15-D-585), votat per separat i aprovat: «Bajar el IVA de adquisición de la primera vivienda nueva del 10 % al 4 % […] y permitir el fraccionamiento del IVA y del ITP al ritmo del pago de la hipoteca». Sí de PP, VOX, ERC, PNV, BNG, Compromís i UPN; no de Sumar, Podemos i EH Bildu; abstenció de PSOE, Junts i CC. És una moció (no vinculant). Separa ERC d'EH Bildu, Compromís i BNG de Sumar, PNV d'EH Bildu i el PSOE de Sumar.",
      },
      gl: {
        label: "IVE do 4 % na primeira vivenda",
        rationale:
          "Mide se se apoia abaratar pola vía fiscal a compra da primeira vivenda. Áncora: punto 1.d da moción do GPP sobre a política de vivenda (BOCG-15-D-585), votado por separado e aprobado: «Bajar el IVA de adquisición de la primera vivienda nueva del 10 % al 4 % […] y permitir el fraccionamiento del IVA y del ITP al ritmo del pago de la hipoteca». Si de PP, VOX, ERC, PNV, BNG, Compromís e UPN; non de Sumar, Podemos e EH Bildu; abstención de PSOE, Junts e CC. É unha moción (non vinculante). Separa ERC de EH Bildu, Compromís e BNG de Sumar, PNV de EH Bildu e o PSOE de Sumar.",
      },
      eu: {
        label: "% 4ko BEZa lehen etxebizitzan",
        rationale:
          "Lehen etxebizitzaren erosketa zerga bidez merkatzearen aldeko jarrera neurtzen du. Aingura: GPPk etxebizitza-politikari buruz aurkeztutako mozioaren 1.d puntua (BOCG-15-D-585), bereiz bozkatua eta onartua: «Bajar el IVA de adquisición de la primera vivienda nueva del 10 % al 4 % […] y permitir el fraccionamiento del IVA y del ITP al ritmo del pago de la hipoteca» (lehen etxebizitza berria erosteko BEZa % 10etik % 4ra jaistea […] eta BEZa eta ITP hipoteka ordaintzearen erritmoan zatikatzea ahalbidetzea). Alde: PP, VOX, ERC, PNV, BNG, Compromís eta UPN; aurka: Sumar, Podemos eta EH Bildu; abstentzioa: PSOE, Junts eta CC. Mozio bat da (ez loteslea). ERC eta EH Bildu bereizten ditu, baita Compromís eta BNG Sumarretik, PNV EH Bildutik eta PSOE Sumarretik ere.",
      },
    },
  },
  {
    id: "impuesto-banca",
    order: 12,
    topic: "banca",
    label: "subir el impuesto a la banca",
    text: {
      es: "Debe subirse el impuesto a la gran banca: duplicar el gravamen temporal sobre sus márgenes y gravar al 75 % los beneficios extraordinarios que obtiene por la subida de los tipos de interés.",
      ca: "S'ha d'apujar l'impost a la gran banca: duplicar el gravamen temporal sobre els seus marges i gravar al 75 % els beneficis extraordinaris que obté per la pujada dels tipus d'interès.",
      gl: "Debe subirse o imposto á gran banca: duplicar o gravame temporal sobre as súas marxes e gravar ao 75 % os beneficios extraordinarios que obtén pola suba dos tipos de xuro.",
      eu: "Banku handien zerga igo egin behar da: haien marjinen gaineko aldi baterako karga bikoiztu eta interes-tasen igoeragatik lortzen dituzten aparteko irabaziei % 75eko zerga ezarri.",
    },
    rationale:
      "Mide el apoyo a gravar más a la banca por los beneficios del alza de tipos. La proposición de Podemos (BOCG-15-B-65-1) eleva el gravamen temporal de la Ley 38/2022 del 4,8 % al 10 % de los márgenes de intereses y comisiones y añade un 75 % sobre los márgenes que superen en más de un 5 % los del primer semestre de 2022. Ancla: toma en consideración, rechazada (XV); el PSOE votó en contra y Junts se abstuvo.",
    anchors: [
      {
        legislature: "XV",
        session: 34,
        date: "2024-04-09",
        number: 2,
        title:
          "Proposición de Ley del Grupo Parlamentario Mixto, para una correcta imposición de los beneficios caídos del cielo de la gran banca.",
        url: `${CONGRESO}/Leg15/Sesion034/20240409/Votacion002/VOT_20240409210632.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "apujar l'impost a la banca",
        rationale:
          "Mesura el suport a gravar més la banca pels beneficis de la pujada de tipus. La proposició de Podemos (BOCG-15-B-65-1) eleva el gravamen temporal de la Llei 38/2022 del 4,8 % al 10 % dels marges d'interessos i comissions i hi afegeix un 75 % sobre els marges que superin en més d'un 5 % els del primer semestre del 2022. Àncora: presa en consideració, rebutjada (XV); el PSOE hi va votar en contra i Junts es va abstenir.",
      },
      gl: {
        label: "subir o imposto á banca",
        rationale:
          "Mide o apoio a gravar máis a banca polos beneficios da suba de tipos. A proposición de Podemos (BOCG-15-B-65-1) eleva o gravame temporal da Lei 38/2022 do 4,8 % ao 10 % das marxes de xuros e comisións e engade un 75 % sobre as marxes que superen en máis dun 5 % as do primeiro semestre de 2022. Áncora: toma en consideración, rexeitada (XV); o PSOE votou en contra e Junts abstívose.",
      },
      eu: {
        label: "bankuen zerga igotzea",
        rationale:
          "Interes-tasen igoeraren ondoriozko irabaziengatik bankuei zerga handiagoa ezartzearen aldeko jarrera neurtzen du. Podemosen proposamenak (BOCG-15-B-65-1) 38/2022 Legearen aldi baterako karga % 4,8tik % 10era igotzen du interesen eta komisioen marjinen gainean, eta % 75eko karga gehitzen du 2022ko lehen seihilekokoak % 5 baino gehiago gainditzen dituzten marjinen gainean. Aingura: aintzat hartzea, baztertua (XV); PSOEk aurka bozkatu zuen eta Juntsek abstentzioa egin zuen.",
      },
    },
  },
  {
    id: "registro-lobbies",
    order: 13,
    topic: "transparencia",
    label: "registro obligatorio de lobbies",
    text: {
      es: "Los grupos de interés (lobbies) que tratan con el Gobierno deben inscribirse en un registro público obligatorio, con multas si incumplen sus normas de conducta.",
      ca: "Els grups d'interès (lobbies) que tracten amb el Govern s'han d'inscriure en un registre públic obligatori, amb multes si incompleixen les seves normes de conducta.",
      gl: "Os grupos de interese (lobbies) que tratan co Goberno deben inscribirse nun rexistro público obrigatorio, con multas se incumpren as súas normas de conduta.",
      eu: "Gobernuarekin harremanak dituzten interes-taldeek (lobbyek) derrigorrezko erregistro publiko batean izena eman behar dute, eta isunak jaso jokabide-arauak betetzen ez badituzte.",
    },
    rationale:
      "Mide el apoyo a regular la actividad de los lobbies ante la Administración General del Estado. El Real Decreto-ley 21/2026 (BOE-A-2026-18148) creaba un Registro de grupos de interés público y obligatorio, principios de conducta, el informe de huella normativa y multas de 5.000 a 40.000 euros; también prohibía a los ex altos cargos hacer de lobby en su materia durante dos años. Ancla: convalidación, rechazada (XV), por lo que el decreto quedó derogado. Al ser un decreto-ley, el voto también puede reflejar el rechazo a regularlo por esa vía; se advierte al mostrar la votación.",
    anchors: [
      {
        legislature: "XV",
        session: 198,
        date: "2026-09-16",
        number: 16,
        title:
          "Real Decreto-ley 21/2026, de 25 de agosto, de transparencia e integridad de las actividades de los grupos de interés.",
        url: `${CONGRESO}/Leg15/Sesion198/20260916/Votacion016/VOT_20260916195406.json`,
        agreeMeans: "si",
      },
    ],
    i18n: {
      ca: {
        label: "registre obligatori de lobbies",
        rationale:
          "Mesura el suport a regular l'activitat dels lobbies davant l'Administració General de l'Estat. El Reial decret llei 21/2026 (BOE-A-2026-18148) creava un Registre de grups d'interès públic i obligatori, principis de conducta, l'informe d'empremta normativa i multes de 5.000 a 40.000 euros; també prohibia als ex alts càrrecs fer de lobby en el seu àmbit durant dos anys. Àncora: convalidació, rebutjada (XV), de manera que el decret va quedar derogat. Com que és un decret llei, el vot també pot reflectir el rebuig a regular-ho per aquesta via; s'adverteix en mostrar la votació.",
      },
      gl: {
        label: "rexistro obrigatorio de lobbies",
        rationale:
          "Mide o apoio a regular a actividade dos lobbies ante a Administración Xeral do Estado. O Real decreto-lei 21/2026 (BOE-A-2026-18148) creaba un Rexistro de grupos de interese público e obrigatorio, principios de conduta, o informe de pegada normativa e multas de 5.000 a 40.000 euros; tamén prohibía aos ex altos cargos facer de lobby na súa materia durante dous anos. Áncora: convalidación, rexeitada (XV), polo que o decreto quedou derrogado. Ao ser un decreto-lei, o voto tamén pode reflectir o rexeitamento a regulalo por esa vía; advírtese ao mostrar a votación.",
      },
      eu: {
        label: "lobbyen derrigorrezko erregistroa",
        rationale:
          "Estatuko Administrazio Orokorraren aurrean lobbyen jarduera arautzearen aldeko jarrera neurtzen du. 21/2026 Errege Lege-dekretuak (BOE-A-2026-18148) interes-taldeen erregistro publiko eta derrigorrezkoa sortzen zuen, baita jokabide-printzipioak, arau-aztarnaren txostena eta 5.000 eta 40.000 euro bitarteko isunak ere; gainera, goi-kargudun ohiei debekatzen zien bi urtez beren arloan lobby gisa jardutea. Aingura: baliozkotzea, baztertua (XV); beraz, dekretua indargabetuta geratu zen. Lege-dekretu bat zenez, botoak bide horretatik arautzearen aurkako jarrera ere adieraz dezake; bozketa erakustean ohartarazten da.",
      },
    },
  },
  {
    id: "inmigracion-competencias-cataluna",
    order: 14,
    topic: "modelo-territorial",
    label: "inmigración en Cataluña, en manos del Estado",
    text: {
      es: "El Estado debe seguir gestionando la inmigración en Cataluña, sin delegar en la Generalitat la tramitación de permisos de residencia y expulsiones ni el control de puertos y aeropuertos.",
      ca: "L'Estat ha de continuar gestionant la immigració a Catalunya, sense delegar a la Generalitat la tramitació de permisos de residència i expulsions ni el control de ports i aeroports.",
      gl: "O Estado debe seguir xestionando a inmigración en Cataluña, sen delegar na Generalitat a tramitación de permisos de residencia e expulsións nin o control de portos e aeroportos.",
      eu: "Estatuak Kataluniako immigrazioa kudeatzen jarraitu behar du, Generalitatean bizileku-baimenen eta kanporatzeen izapidetzea eta portu eta aireportuen kontrola eskuordetu gabe.",
    },
    rationale:
      "Mide la postura sobre descentralizar competencias de inmigración. La proposición de PSOE y Junts (BOCG-15-B-195-1) delegaba en Cataluña autorizaciones de residencia, parte de los procedimientos sancionadores con expulsión y funciones de los Mossos en puertos y aeropuertos. Ancla: toma en consideración, rechazada (XV); votar «sí» a la delegación es estar en contra de la afirmación.",
    anchors: [
      {
        legislature: "XV",
        session: 133,
        date: "2025-09-23",
        number: 1,
        title:
          "Proposición de Ley de los Grupos Parlamentarios Socialista y Junts per Catalunya, Orgánica de delegación en la Comunidad Autónoma de Cataluña de competencias estatales en materia de inmigración.",
        url: `${CONGRESO}/Leg15/Sesion133/20250923/Votacion001/VOT_20250923211048.json`,
        agreeMeans: "no",
      },
    ],
    i18n: {
      ca: {
        label: "immigració a Catalunya, en mans de l'Estat",
        rationale:
          "Mesura la posició sobre descentralitzar competències d'immigració. La proposició del PSOE i Junts (BOCG-15-B-195-1) delegava a Catalunya autoritzacions de residència, part dels procediments sancionadors amb expulsió i funcions dels Mossos en ports i aeroports. Àncora: presa en consideració, rebutjada (XV); votar «sí» a la delegació és estar en contra de l'afirmació.",
      },
      gl: {
        label: "inmigración en Cataluña, en mans do Estado",
        rationale:
          "Mide a postura sobre descentralizar competencias de inmigración. A proposición de PSOE e Junts (BOCG-15-B-195-1) delegaba en Cataluña autorizacións de residencia, parte dos procedementos sancionadores con expulsión e funcións dos Mossos en portos e aeroportos. Áncora: toma en consideración, rexeitada (XV); votar «si» á delegación é estar en contra da afirmación.",
      },
      eu: {
        label: "Kataluniako immigrazioa, Estatuaren esku",
        rationale:
          "Immigrazio-eskumenak deszentralizatzeari buruzko jarrera neurtzen du. PSOEren eta Juntsen proposamenak (BOCG-15-B-195-1) Kataluniaren esku uzten zituen bizileku-baimenak, kanporatzea dakarten zehapen-prozeduren zati bat eta Mossosen eginkizunak portu eta aireportuetan. Aingura: aintzat hartzea, baztertua (XV); eskuordetzearen alde «bai» bozkatzea baieztapenaren aurka egotea da.",
      },
    },
  },
  {
    id: "tauromaquia-patrimonio",
    order: 15,
    topic: "cultura",
    label: "tauromaquia como patrimonio",
    text: {
      es: "La tauromaquia debe seguir protegida por ley como patrimonio cultural.",
      ca: "La tauromàquia ha de continuar protegida per llei com a patrimoni cultural.",
      gl: "A tauromaquia debe seguir protexida por lei como patrimonio cultural.",
      eu: "Zezenketak legez babestuta jarraitu behar du ondare kultural gisa.",
    },
    rationale:
      "Mide la postura sobre la protección legal de los toros (Ley 18/2013). Ancla: toma en consideración de la iniciativa legislativa popular para derogarla, rechazada (XV); votar «sí» a la derogación es estar en contra de la afirmación. El PSOE se abstuvo.",
    anchors: [
      {
        legislature: "XV",
        session: 135,
        date: "2025-10-07",
        number: 1,
        title:
          "Proposición de Ley para la derogación de la Ley 18/2013, de 12 de noviembre, para la regulación de la Tauromaquia como patrimonio cultural.",
        url: `${CONGRESO}/Leg15/Sesion135/20251007/Votacion001/VOT_20251007214328.json`,
        agreeMeans: "no",
      },
    ],
    i18n: {
      ca: {
        label: "tauromàquia com a patrimoni",
        rationale:
          "Mesura la posició sobre la protecció legal dels toros (Llei 18/2013). Àncora: presa en consideració de la iniciativa legislativa popular per derogar-la, rebutjada (XV); votar «sí» a la derogació és estar en contra de l'afirmació. El PSOE es va abstenir.",
      },
      gl: {
        label: "tauromaquia como patrimonio",
        rationale:
          "Mide a postura sobre a protección legal dos touros (Lei 18/2013). Áncora: toma en consideración da iniciativa lexislativa popular para derrogala, rexeitada (XV); votar «si» á derrogación é estar en contra da afirmación. O PSOE abstívose.",
      },
      eu: {
        label: "zezenketa ondare gisa",
        rationale:
          "Zezenketaren babes legalari buruzko jarrera neurtzen du (18/2013 Legea). Aingura: hura indargabetzeko herri-ekimen legegilea aintzat hartzea, baztertua (XV); indargabetzearen alde «bai» bozkatzea baieztapenaren aurka egotea da. PSOEk abstentzioa egin zuen.",
      },
    },
  },
];

/**
 * Candidatos descartados, con el motivo. No se importan desde la UI; quedan
 * aquí para que la selección sea auditable.
 */
export const rejectedCandidates: Array<{
  id: string;
  statement: string;
  anchorUrl: string;
  reason: string;
}> = [
  {
    id: "salir-otan",
    statement: "España debe seguir siendo miembro de la OTAN.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion185/20260611/Votacion030/VOT_20260611145738.json`,
    reason:
      "Válido (punto 5 de la misma moción del BNG, 11-6-2026), pero duplica el tema de defensa; se prefirió el gasto militar por ser la decisión que está sobre la mesa.",
  },
  {
    id: "reforma-laboral-2022",
    statement: "La reforma laboral de 2022 debe mantenerse.",
    anchorUrl: `${CONGRESO}/Leg14/Sesion149/20220203/Votacion020/VOT_20230303100559.json`,
    reason:
      "La convalidación del RDL 32/2021 (175/174/0) mezcla muchas medidas y votaron en contra a la vez PP y Vox y socios del Gobierno (GR, GEH Bildu, GV (EAJ-PNV)): mediría apoyo al Gobierno más que una postura concreta. Trabajo se cubre con la jornada de 37,5 h.",
  },
  {
    id: "plurilinguismo-instituciones",
    statement:
      "Debe poder usarse cualquier lengua cooficial ante todas las instituciones del Estado.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion152/20251209/Votacion003/VOT_20251209205653.json`,
    reason:
      "Equilibrado (174/170, 9-12-2025), pero solapa con «castellano en la escuela» y con los dos ítems territoriales; el test se limita a 15.",
  },
  {
    id: "embargo-armas",
    statement:
      "La ley debe permitir decretar embargos de armas a países que violen el derecho internacional humanitario.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion112/20250520/Votacion002/VOT_20250520203911.json`,
    reason:
      "Equilibrado (176/171/0, 20-5-2025), pero es política exterior muy ligada a la coyuntura y aporta menos que defensa; el test se limita a 15. No se ha revisado el texto de la proposición.",
  },
  // ── Retiradas en la revisión de discriminación del 2026-10-06 ──────────────
  // Estaban en el cuestionario. Con la lente de hechos separaban poco: casi
  // todos los partidos votaban en dos bloques (PP+VOX frente al resto), así
  // que PP y VOX salían idénticos y Sumar, ERC, EH Bildu, Compromís y Frente
  // Amplio también. Detalle y cifras: docs/AFINIDAD-PREGUNTAS.md.
  {
    id: "eutanasia",
    statement:
      "La ley debe permitir la eutanasia a quien la solicite por sufrir una enfermedad grave e incurable o un padecimiento grave, crónico e imposibilitante.",
    anchorUrl: `${CONGRESO}/Leg14/Sesion085/20210318/Votacion012/VOT_20210318133141.json`,
    reason:
      "Retirada el 2026-10-06 por baja discriminación en hechos: 11 partidos a favor y solo PP y VOX en contra (22 pares de partidos separados, el mínimo del cuestionario, empatado con «autodeterminacion-sexo-registral», que daba exactamente las mismas posiciones). No separaba a ningún par dentro de un bloque.",
  },
  {
    id: "autodeterminacion-sexo-registral",
    statement:
      "Desde los 16 años, cualquier persona debe poder cambiar su sexo en el Registro Civil sin informes médicos ni psicológicos.",
    anchorUrl: `${CONGRESO}/Leg14/Sesion229/20221222/Votacion371/VOT_20230302133947.json`,
    reason:
      "Retirada el 2026-10-06 por baja discriminación en hechos: posiciones idénticas a «eutanasia» (11 a favor, PP y VOX en contra; 22 pares separados). No separaba a ningún par dentro de un bloque.",
  },
  {
    id: "castellano-vehicular",
    statement: "En Cataluña, al menos el 25 % de las clases debe impartirse en castellano.",
    anchorUrl: `${CONGRESO}/Leg14/Sesion186/20220609/Votacion053/VOT_20230302184525.json`,
    reason:
      "Retirada el 2026-10-06: incumplía el equilibrio por ítem en hechos (solo el PP a favor; VOX se abstuvo; 11 en contra) y separaba 23 pares. Era la única pregunta que distinguía PP de VOX, pero lo hacía con una abstención en una PNL de 2022. Había una segunda ancla posible con VOX a favor (moción consecuencia de interpelación del GVOX sobre la enseñanza del castellano, XIV, sesión 141, 16-12-2021, votación 2: PP y VOX sí, el resto no; Leg14/Sesion141/20211216/Votacion002), que arreglaba el equilibrio (PP +2, VOX +1), pero dejaba la pregunta igual de poco discriminante (PP+VOX frente a todos) y quitaba la única diferencia PP/VOX; se prefirió sustituirla por ítems que separan PP y VOX con más partidos a cada lado.",
  },
  {
    id: "arraigo",
    statement:
      "Debe suprimirse el arraigo como vía para que una persona extranjera en situación irregular obtenga la residencia legal.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion131/20250916/Votacion001/VOT_20250916211204.json`,
    reason:
      "Retirada el 2026-10-06 por baja discriminación en hechos: PP y VOX a favor, 11 en contra (35 pares separados) y la misma división que «menores-migrantes-reparto» con el signo cambiado. Contrapartida conocida: el cuestionario se queda sin pregunta específica de inmigración (la delegación de competencias a Cataluña sigue, pero es territorial).",
  },
  {
    id: "menores-migrantes-reparto",
    statement:
      "Cuando una comunidad autónoma supera su capacidad para acoger a menores migrantes no acompañados, el reparto entre las demás comunidades debe ser obligatorio.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion106/20250410/Votacion015/VOT_20250410155154.json`,
    reason:
      "Retirada el 2026-10-06 por baja discriminación en hechos: 11 a favor, PP y VOX en contra, UPN abstención (35 pares separados); repetía la división de «arraigo».",
  },
  {
    id: "regularizacion-extraordinaria",
    statement:
      "Debe aprobarse una regularización extraordinaria que conceda la residencia legal a las personas extranjeras que ya viven en España en situación irregular.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion095/20250226/Votacion007/VOT_20250226151629.json`,
    reason:
      "Candidata de inmigración preferida en la segunda revisión del 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md §8), no usada. Con la toma en consideración de la ILP (9-4-2024, 310/33) solo VOX estaba en contra; con la PNL de Podemos votada en los términos de la enmienda de Podemos, BNG, EH Bildu, ERC y Sumar (26-2-2025, 46/183/119; BOCG-15-D-296) sí hay dos lados (7 a favor, 6 en contra, PSOE abstención; 55 pares separados), pero todo el bloque de izquierda vota igual: en lugar de «seguro-ingresos-agrarios», ERC y EH Bildu quedaban idénticos en hechos y Compromís no ganaba a ningún usuario simulado (0 %, mínimo 2 %). Recuperable si otra pregunta separa a Compromís y a ERC/EH Bildu.",
  },
  // ── Retirada en la segunda revisión del 2026-10-06 (relieve público) ─────────
  {
    id: "seguro-ingresos-agrarios",
    statement:
      "Los seguros agrarios con ayuda pública deben poder cubrir también la caída de ingresos de agricultores y ganaderos, no solo los daños en la cosecha o el ganado.",
    anchorUrl: `${CONGRESO}/Leg15/Sesion167/20260324/Votacion002/VOT_20260324205013.json`,
    reason:
      "Retirada el 2026-10-06 (segunda revisión, docs/AFINIDAD-PREGUNTAS.md §8): discriminaba bien en hechos (53 pares separados; era la única que separaba ERC de EH Bildu y Compromís de Sumar), pero es un tema de poco relieve público y el test tiene que ser reconocible para cualquier votante. Se sustituye por «iva-primera-vivienda» (61 pares), que mantiene esas dos separaciones.",
  },
];
