import type { Explainer, ReceiptLine } from "./types";

/**
 * «El ticket de tus impuestos». Voz de la web.
 *
 * Ejemplo: 30.000 € brutos al año, soltero, sin hijos, Comunidad de Madrid, 2026.
 *  - Cotizaciones 2026 (Orden PJC/297/2026), contrato indefinido:
 *      trabajador 6,50 % = contingencias comunes 4,70 + desempleo 1,55 + FP 0,10 + MEI 0,15;
 *      empresa 30,65 % = contingencias comunes 23,60 + desempleo 5,50 + FP 0,60 + MEI 0,75 + FOGASA 0,20
 *      (sin accidentes de trabajo, que dependen de la actividad: se avisa en pantalla).
 *  - IRPF: escala estatal 2026 (9,5 / 12 / 15 % hasta 35.200 €) + escala de Madrid (8,5 / 10,7 / 12,8 %),
 *    gastos deducibles de 2.000 €, sin reducción por rendimientos del trabajo (rendimiento neto
 *    > 19.747,50 €), mínimo personal 5.550 € (estatal) y 5.777,55 € (Madrid, Ley 8/2022). Comprobado
 *    contra guiafiscal.es (base 25.000 € → 4.306 €; este método da 4.321 €). Se redondea con «≈».
 *  - Reparto: IGAE, COFOG 2024 (P), gasto de las AAPP 725.001 M€; intereses de la deuda: Eurostat
 *    (gov_10a_main, D41 pagados, 2024) 38.793 M€, dentro de «servicios públicos generales».
 *    «Como si se repartiera como el gasto total»: las cotizaciones van a la Seguridad Social; se avisa.
 */
const GROSS = 30_000;
const EMPLOYEE_RATE = 0.065;
const EMPLOYER_RATE = 0.3065;

const scale = (base: number, brackets: [number, number][]) => {
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    if (base <= prev) break;
    tax += (Math.min(base, limit) - prev) * rate;
    prev = limit;
  }
  return tax;
};
const STATE: [number, number][] = [[12_450, 0.095], [20_200, 0.12], [35_200, 0.15], [60_000, 0.185], [300_000, 0.225], [Infinity, 0.245]];
const MADRID: [number, number][] = [[13_362.22, 0.085], [19_004.63, 0.107], [35_425.68, 0.128], [57_320.4, 0.174], [Infinity, 0.205]];

export const employee = GROSS * EMPLOYEE_RATE;
export const employer = GROSS * EMPLOYER_RATE;
const base = GROSS - employee - 2_000;
export const irpf = scale(base, STATE) - scale(5_550, STATE) + scale(base, MADRID) - scale(5_777.55, MADRID);
export const taxes = employee + employer + irpf;
export const laborCost = GROSS + employer;

/** COFOG 2024 (M€). */
export const COFOG = {
  total: 725_001,
  pensiones: 165_050 + 35_425, // 10.2 edad avanzada + 10.3 supérstites
  salud: 102_942,
  educacion: 65_862,
  otrasSociales: 297_532 - 165_050 - 35_425, // resto de la división 10
  asuntosEconomicos: 80_908,
  serviciosGenerales: 92_551,
  intereses: 38_793, // Eurostat, D41; parte de servicios generales
  ordenPublico: 28_628,
  ocioCultura: 19_193,
  medioAmbiente: 15_539,
  defensa: 14_233,
  vivienda: 7_613,
};

const share = (m: number) => (taxes * m) / COFOG.total;
const eur = (n: number) => `${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
const approx = (n: number, step = 50) => `≈ ${`${Math.round(n / step) * step}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

const payLines: ReceiptLine[] = [
  { label: "COTIZ. EMPRESA", amount: approx(employer), cue: "esos" },
  { label: "SEG. SOCIAL (TÚ)", amount: approx(employee), cue: "seguridad" },
  { label: "IRPF", amount: approx(irpf), cue: "irpf" },
];

/** «Lo que siempre se dice»: pensiones, sanidad, educación y seguridad (orden público + defensa). */
export const BIG_FOUR = COFOG.pensiones + COFOG.salud + COFOG.educacion + COFOG.ordenPublico + COFOG.defensa;
export const bigShare = BIG_FOUR / COFOG.total;
const restEur = taxes * (1 - bigShare);
/** Supuesto ilustrativo: ese resto a la mitad y todo el ahorro te llega (incluida la parte de la empresa). */
export const extraPerMonth = restEur / 2 / 12;
const netPerMonth = (GROSS - employee - irpf) / 12;
export const extraPct = (extraPerMonth / netPerMonth) * 100;

const restLines: ReceiptLine[] = [
  { label: "PARO Y OTRAS AYUDAS", amount: eur(share(COFOG.otrasSociales)), cue: "paro" },
  { label: "ADMINISTRACIÓN", amount: eur(share(COFOG.serviciosGenerales)), cue: "administración" },
  { label: "· INTERESES DEUDA", amount: eur(share(COFOG.intereses)), cue: "intereses", sub: true, strong: true },
  { label: "SUBVENCIONES Y OBRAS", amount: eur(share(COFOG.asuntosEconomicos)), cue: "subvenciones" },
  { label: "OCIO Y CULTURA", amount: eur(share(COFOG.ocioCultura)), dim: true },
  { label: "MEDIO AMBIENTE", amount: eur(share(COFOG.medioAmbiente)), dim: true },
  { label: "VIVIENDA", amount: eur(share(COFOG.vivienda)), dim: true },
];

const pct = Math.round((taxes / laborCost) * 100);
const k = (n: number, step = 50) => `${Math.round(n / step) * step}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const big = Math.round(bigShare * 100);

/** Día del año hasta el que trabajas para pagar impuestos (sin IVA). `npm run check` exige que caiga a finales de mayo. */
export const taxDay = Math.round((taxes / laborCost) * 365);
export const interestPerMonth = Math.round(share(COFOG.intereses) / 12 / 5) * 5;

export const impuestos: Explainer = {
  id: "impuestos",
  header: "LIBERTARIOS.EU · TUS IMPUESTOS",
  rail: ["TICKET", "CUENTA", "¿A DÓNDE?", "EL RESTO", "¿Y TÚ?"],
  scenes: [
    {
      rail: 0,
      min: 3.5,
      script: "Imagina que al pagar tus impuestos te dieran un ticket, como en un restaurante. Nunca te lo dan. Así que lo hemos hecho nosotros.",
      scene: {
        kind: "receipt",
        title: "TICKET · TUS IMPUESTOS",
        meta: ["SUELDO: 30.000 €… ¿SEGURO?", "CAMARERO: EL ESTADO"],
        lines: [{ label: "· · ·", amount: "¿?", dim: true }],
        stamp: { line: 0, text: "Nunca te lo dan", cue: "nunca" },
        source: "libertarios.eu",
      },
    },
    {
      rail: 1,
      min: 5,
      script: `Con 30.000 euros brutos, tu trabajo cuesta ${k(laborCost, 100)}. Esos ${k(employer, 100)} los paga tu empresa… y ni los ves en la nómina.`,
      scene: {
        kind: "receipt",
        title: "TICKET · TUS IMPUESTOS",
        meta: ["SUELDO BRUTO: 30.000 €/AÑO", `COSTE DE TU TRABAJO: ${approx(laborCost, 100)}`],
        lines: [payLines[0]],
        stamp: { line: 0, text: "No sale en tu nómina", cue: "nómina" },
        source: "Orden PJC/297/2026 · sin accidentes de trabajo",
      },
    },
    {
      rail: 1,
      min: 5,
      script: `Súmale Seguridad Social e IRPF: casi ${k(taxes, 1000)} euros al año. Trabajas de enero a finales de mayo solo para pagarlos.`,
      scene: {
        kind: "receipt",
        title: "TICKET · TUS IMPUESTOS",
        meta: ["SUELDO BRUTO: 30.000 €/AÑO", `EL ${pct} % DE LO QUE CUESTA TU TRABAJO`],
        lines: payLines,
        total: { label: "TOTAL", amount: approx(taxes, 100), cue: "casi" },
        stamp: { line: 6, text: "Enero → finales de mayo", cue: "enero" },
        source: "Orden PJC/297/2026 · escalas IRPF 2026 · sin IVA · cálculo propio",
      },
    },
    {
      rail: 2,
      min: 5,
      script: `¿Y a dónde van? Siempre nos dicen: pensiones, sanidad, educación y seguridad. Es verdad… pero eso es el ${big} %.`,
      scene: {
        kind: "vs",
        title: "¿A dónde van?",
        left: { value: `${big} %`, label: "pensiones, sanidad, educación y seguridad", n: big },
        right: { value: `${100 - big} %`, label: "todo lo demás", n: 100 - big, cue: "verdad" },
        source: "IGAE · COFOG 2024 · gasto de todas las administraciones",
      },
    },
    {
      rail: 3,
      min: 6,
      script: `¿Y el otro ${100 - big} %? Paro y otras ayudas, administración, intereses de la deuda, subvenciones a empresas… Solo en intereses, ${interestPerMonth} euros al mes.`,
      scene: {
        kind: "receipt",
        title: `¿Y EL OTRO ${100 - big} %?`,
        meta: [`DE TUS ${approx(taxes, 100)}`, "REPARTIDOS COMO EL GASTO PÚBLICO"],
        lines: restLines,
        total: { label: "TODO LO DEMÁS", amount: approx(restEur, 100), cue: "solo" },
        stamp: { line: 10.3, text: `Intereses: ${eur(share(COFOG.intereses))} · ${interestPerMonth} €/mes`, cue: "solo" },
        source: "IGAE · COFOG 2024 · Eurostat (intereses)",
      },
    },
    {
      rail: 3,
      min: 6,
      script: `No todo sobra: ahí va el paro. Pero si ese ${100 - big} % se redujera a la mitad, te quedarían unos ${k(extraPerMonth, 10)} euros más al mes. Un ${Math.floor(extraPct)} % más de sueldo.`,
      scene: {
        kind: "stats",
        title: "¿Y si fuera la mitad?",
        items: [
          { value: `+${k(extraPerMonth, 10)} €`, label: "más al mes en tu bolsillo", cue: "quedarían" },
          { value: `+${Math.floor(extraPct)} %`, label: "más de sueldo neto", cue: "sueldo" },
        ],
        source: "cálculo propio · supuesto: ese resto a la mitad y todo el ahorro llega a ti",
      },
    },
    {
      rail: 4,
      min: 3.5,
      script: "Ahora ya tienes el ticket. ¿Conoces a alguien que no sabe cuánto paga? Mándaselo. Y más vídeos, en el perfil.",
      scene: { kind: "ending", title: ["¿Sabe", "cuánto", "paga?"], cta: [], body: "Más vídeos en el perfil.", shareTo: "Alguien que no sabe cuánto paga" },
    },
  ],
};
