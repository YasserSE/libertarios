/**
 * El mecanismo de cada medida, dibujado.
 *
 * No son ilustraciones decorativas ni fotos de banco: cada diagrama es el campo
 * `principle` de la medida puesto en dos ejes, que es justo lo que se puede
 * generalizar de ella. Quien no quiera leer tres párrafos ve en cuatro líneas
 * por qué un precio máximo no crea vivienda.
 *
 * Dos reglas que los mantienen honestos:
 *
 * 1. **El diagrama no puede afirmar más que el texto.** El del salario mínimo
 *    es el caso límite: la teoría dibuja un hueco de empleo perdido, pero la
 *    evidencia medida no lo respalda en subidas moderadas. Ese hueco va rayado
 *    y rotulado como discutido, no pintado como un hecho.
 * 2. **Son esquemas, no datos.** No hay cifras en los ejes porque no
 *    representan ninguna medición concreta. Las mediciones están en los casos,
 *    con su fuente.
 */

const PLOT = { left: 26, right: 196, top: 16, bottom: 112 };

/** Ejes, rótulos y nada más. Todos los diagramas comparten encuadre. */
function Frame({
  xLabel,
  yLabel,
  children,
}: {
  xLabel: string;
  yLabel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <line
        x1={PLOT.left}
        y1={PLOT.top}
        x2={PLOT.left}
        y2={PLOT.bottom}
        className="stroke-border"
        strokeWidth="1"
      />
      <line
        x1={PLOT.left}
        y1={PLOT.bottom}
        x2={PLOT.right}
        y2={PLOT.bottom}
        className="stroke-border"
        strokeWidth="1"
      />
      <text
        x={(PLOT.left + PLOT.right) / 2}
        y={PLOT.bottom + 24}
        textAnchor="middle"
        className="fill-muted-foreground text-[7px]"
      >
        {xLabel}
      </text>
      <text
        x={-PLOT.top}
        y={10}
        textAnchor="end"
        transform="rotate(-90)"
        className="fill-muted-foreground text-[7px]"
      >
        {yLabel}
      </text>
      {children}
    </>
  );
}

function Curve({ d, accent = false }: { d: string; accent?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth="1.6"
      className={accent ? "stroke-primary" : "stroke-foreground/45"}
    />
  );
}

function CurveLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="end"
      className="fill-foreground/60 text-[7px] font-semibold"
      style={{ paintOrder: "stroke", stroke: "hsl(var(--card))", strokeWidth: 2.5 }}
    >
      {children}
    </text>
  );
}

/** Rótulo con fondo, para que se lea aunque caiga sobre una línea. */
function Callout({
  x,
  y,
  anchor = "middle",
  tone = "primary",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  tone?: "primary" | "warn";
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`text-[7px] font-semibold ${
        tone === "warn" ? "fill-amber-600 dark:fill-amber-400" : "fill-primary"
      }`}
      style={{ paintOrder: "stroke", stroke: "hsl(var(--card))", strokeWidth: 2.5 }}
    >
      {children}
    </text>
  );
}

/** Línea de puntos horizontal: un precio fijado por norma, no por el mercado. */
function SetPrice({ y, label, tone = "primary" }: { y: number; label: string; tone?: "primary" | "warn" }) {
  return (
    <>
      <line
        x1={PLOT.left}
        y1={y}
        x2={PLOT.right}
        y2={y}
        strokeWidth="1.4"
        strokeDasharray="4 3"
        className={tone === "warn" ? "stroke-amber-500" : "stroke-primary"}
      />
      <Callout x={PLOT.left + 3} y={y - 4} anchor="start" tone={tone}>
        {label}
      </Callout>
    </>
  );
}

/**
 * Oferta y demanda de referencia, compartidas por varios diagramas.
 * Se cruzan en (111, 64).
 */
const DEMAND = `M ${PLOT.left} 24 L ${PLOT.right} 104`;
const SUPPLY = `M ${PLOT.left} 104 L ${PLOT.right} 24`;

function RentCeiling() {
  // Con el tope en 88, la oferta llega hasta 60 y la demanda pide hasta 162.
  const cap = 88;
  return (
    <Frame xLabel="Viviendas en alquiler" yLabel="Precio">
      <rect x={60} y={cap - 3} width={102} height={6} className="fill-primary/15" />
      <Curve d={DEMAND} />
      <Curve d={SUPPLY} />
      <CurveLabel x={PLOT.right - 2} y={21}>
        Oferta
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={110}>
        Demanda
      </CurveLabel>
      <SetPrice y={cap} label="Tope legal" />
      <circle cx={60} cy={cap} r="2.6" className="fill-primary" />
      <circle cx={162} cy={cap} r="2.6" className="fill-primary" />
      <Callout x={111} y={cap + 15}>
        Escasez
      </Callout>
      <text x={60} y={PLOT.bottom + 11} textAnchor="middle" className="fill-muted-foreground text-[6.5px]">
        se ofrecen
      </text>
      <text x={162} y={PLOT.bottom + 11} textAnchor="middle" className="fill-muted-foreground text-[6.5px]">
        se buscan
      </text>
    </Frame>
  );
}

function MinimumWage() {
  // El suelo va por encima del cruce. El hueco entre lo que se contrataría y lo
  // que se busca se dibuja rayado, no macizo: la evidencia medida no lo
  // respalda en subidas moderadas y el diagrama no puede decir más que el texto.
  const floor = 40;
  return (
    <Frame xLabel="Horas de trabajo" yLabel="Salario">
      <defs>
        <pattern id="disputed-hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" className="stroke-amber-500/60" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect x={60} y={floor - 3} width={102} height={6} fill="url(#disputed-hatch)" />
      <Curve d={DEMAND} />
      <Curve d={SUPPLY} />
      <CurveLabel x={PLOT.right - 2} y={21}>
        Quien busca
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={110}>
        Quien contrata
      </CurveLabel>
      <SetPrice y={floor} label="Salario mínimo" tone="warn" />
      <Callout x={111} y={floor - 12} tone="warn">
        Efecto discutido
      </Callout>
      <text x={111} y={floor + 16} textAnchor="middle" className="fill-muted-foreground text-[6.5px]">
        pequeño o nulo en subidas moderadas
      </text>
    </Frame>
  );
}

function Tariff() {
  const world = 86;
  const tariffed = 52;
  return (
    <Frame xLabel="Cantidad importada" yLabel="Precio">
      <rect x={PLOT.left} y={tariffed} width={PLOT.right - PLOT.left} height={world - tariffed} className="fill-primary/10" />
      <Curve d={DEMAND} />
      <CurveLabel x={PLOT.right - 2} y={110}>
        Demanda
      </CurveLabel>
      <SetPrice y={world} label="Precio sin arancel" />
      <SetPrice y={tariffed} label="Con arancel" />
      <Callout x={PLOT.right - 6} y={(world + tariffed) / 2 + 2} anchor="end">
        Lo paga el comprador nacional
      </Callout>
    </Frame>
  );
}

function Licensing() {
  /*
   * Restringir la entrada desplaza la oferta ARRIBA y a la izquierda: al mismo
   * precio hay menos oferentes. La primera versión la desplazaba a la derecha,
   * que es justo lo contrario —más oferta— y habría dibujado un argumento
   * falso. Ambas curvas comparten pendiente; solo cambia la altura.
   */
  const demand = `M ${PLOT.left} 24 L ${PLOT.right} 104`;
  const freeSupply = `M ${PLOT.left} 108 L ${PLOT.right} 40`;
  const licensedSupply = `M ${PLOT.left} 88 L ${PLOT.right} 20`;

  return (
    <Frame xLabel="Servicio prestado" yLabel="Precio">
      <defs>
        <marker id="arrow-lic" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1 L 7 4 L 0 7 z" className="fill-primary" />
        </marker>
      </defs>
      <Curve d={demand} />
      <Curve d={freeSupply} />
      <Curve d={licensedSupply} accent />
      <CurveLabel x={PLOT.right - 2} y={30}>
        Con licencia
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={52}>
        Oferta
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={110}>
        Demanda
      </CurveLabel>
      {/* Los dos puntos de cruce y el salto entre ellos: menos cantidad, más precio. */}
      <circle cx={122} cy={69} r="2.6" className="fill-foreground/45" />
      <circle cx={100} cy={59} r="2.6" className="fill-primary" />
      <path d="M 116 66 L 106 61" className="stroke-primary" strokeWidth="1.2" markerEnd="url(#arrow-lic)" />
    </Frame>
  );
}

function DemandSubsidy() {
  /*
   * Curvas propias y no las compartidas: la demanda desplazada tiene que caber
   * por encima de la original sin salirse del encuadre, y con las de referencia
   * se cortaba contra el borde superior.
   */
  const fixedQ = 118;
  const demand = `M ${PLOT.left} 40 L ${PLOT.right} 108`;
  const subsidised = `M ${PLOT.left} 16 L ${PLOT.right} 84`;

  return (
    <Frame xLabel="Plazas disponibles" yLabel="Precio">
      <defs>
        <marker id="arrow-sub" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1 L 7 4 L 0 7 z" className="fill-primary" />
        </marker>
      </defs>
      <line x1={fixedQ} y1={PLOT.top} x2={fixedQ} y2={PLOT.bottom} strokeWidth="1.6" className="stroke-foreground/45" />
      <Curve d={demand} />
      <Curve d={subsidised} accent />
      <CurveLabel x={fixedQ - 4} y={PLOT.top + 8}>
        Oferta fija
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={110}>
        Demanda
      </CurveLabel>
      <CurveLabel x={PLOT.right - 2} y={80}>
        Con la ayuda
      </CurveLabel>
      <circle cx={fixedQ} cy={77} r="2.6" className="fill-foreground/45" />
      <circle cx={fixedQ} cy={53} r="2.6" className="fill-primary" />
      <path d="M 138 76 L 138 58" className="stroke-primary" strokeWidth="1.2" markerEnd="url(#arrow-sub)" />
      <Callout x={142} y={50} anchor="start">
        Sube el precio
      </Callout>
      <text x={fixedQ} y={PLOT.bottom + 11} textAnchor="middle" className="fill-muted-foreground text-[6.5px]">
        misma cantidad
      </text>
    </Frame>
  );
}

const DIAGRAMS: Record<string, { render: () => React.ReactNode; caption: string; alt: string }> = {
  "control-alquileres": {
    render: RentCeiling,
    caption:
      "Con el precio por debajo del que igualaría las dos curvas, se ofrecen menos viviendas de las que se buscan. El tope no crea vivienda: reparte de otra manera la que ya hay.",
    alt: "Esquema de oferta y demanda de alquiler con un tope de precio por debajo del punto de cruce, que abre un hueco entre las viviendas que se ofrecen y las que se buscan.",
  },
  "salario-minimo": {
    render: MinimumWage,
    caption:
      "La teoría dibuja aquí un hueco. La evidencia medida no lo encuentra en subidas moderadas, por eso va rayado: el diagrama no puede afirmar más que los estudios.",
    alt: "Esquema de mercado laboral con un salario mínimo por encima del punto de cruce; el hueco teórico aparece rayado y rotulado como efecto discutido.",
  },
  aranceles: {
    render: Tariff,
    caption:
      "El arancel se suma al precio de importación. La franja es lo que sube, y lo pagan importadores y consumidores del propio país, no el exportador extranjero.",
    alt: "Esquema con el precio de importación y el precio con arancel; la franja entre ambos marca el sobrecoste que asume el comprador nacional.",
  },
  licencias: {
    render: Licensing,
    caption:
      "Restringir quién puede ofrecer el servicio desplaza la oferta y sube el precio. Si además mejorase la calidad podría compensar; en la mayoría de oficios estudiados no se mide esa mejora.",
    alt: "Esquema de oferta y demanda donde la curva de oferta se desplaza a la izquierda al restringir la entrada, elevando el precio.",
  },
  "subvencion-demanda": {
    render: DemandSubsidy,
    caption:
      "Con la cantidad bloqueada, la ayuda desplaza la demanda pero no la oferta: sube el precio y el número de plazas se queda igual.",
    alt: "Esquema con una oferta vertical y la demanda desplazada a la derecha: el precio sube y la cantidad no cambia.",
  },
};

export function MeasureDiagram({ id }: { id: string }) {
  const diagram = DIAGRAMS[id];
  if (!diagram) return null;

  return (
    <figure className="rounded-2xl border border-border bg-card p-4">
      <svg viewBox="0 0 210 144" className="w-full" role="img" aria-label={diagram.alt}>
        {diagram.render()}
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
