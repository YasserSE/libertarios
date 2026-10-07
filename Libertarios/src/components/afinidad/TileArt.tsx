/**
 * Dibujos pequeños de las tres tarjetas de la portada (programa, votos en el
 * Congreso, lo que dijeron). Decorativos (`aria-hidden`), con los tokens del
 * sitio y sin colores de partido: el hemiciclo usa el color primario y el
 * gris neutro, nunca una paleta que se pueda leer como «estos son tales».
 */
export type TileArtKind = "programme" | "record" | "hemeroteca";

const LINE = "stroke-foreground/70";

export function TileArt({ kind }: { kind: TileArtKind }) {
  return (
    <svg
      viewBox="0 0 96 64"
      aria-hidden="true"
      focusable="false"
      data-testid={`tile-art-${kind}`}
      className="h-16 w-24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "programme" && <Programme />}
      {kind === "record" && <Record />}
      {kind === "hemeroteca" && <Hemeroteca />}
    </svg>
  );
}

/** Un programa: dos páginas, una línea subrayada y un marcapáginas. */
function Programme() {
  return (
    <>
      <rect x="34" y="10" width="36" height="46" rx="3" className={`fill-card ${LINE}`} strokeWidth="2" transform="rotate(8 52 33)" />
      <path d="M28 6h26l8 8v40a3 3 0 0 1-3 3H28a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" className={`fill-card ${LINE}`} strokeWidth="2" />
      <path d="M54 6v8h8" className={LINE} strokeWidth="2" />
      <path d="M31 20h18M31 27h24M31 41h20M31 48h14" className="stroke-foreground/30" strokeWidth="2" />
      <rect x="30" y="31.5" width="26" height="6" rx="2" className="fill-primary/25" />
      <path d="M31 34.5h22" className="stroke-primary" strokeWidth="2" />
      <path d="M40 6v11l3-2.5 3 2.5V6" className="fill-primary stroke-primary" strokeWidth="1.5" />
    </>
  );
}

/** Votos en el Congreso: un hemiciclo de puntos neutros, unos resaltados. */
function Record() {
  const rows = [
    { r: 14, n: 7 },
    { r: 22, n: 10 },
    { r: 30, n: 13 },
  ];
  const dots: { x: number; y: number; on: boolean }[] = [];
  rows.forEach(({ r, n }, ri) => {
    for (let i = 0; i < n; i++) {
      const a = Math.PI - (i / (n - 1)) * Math.PI;
      // Un tramo continuo resaltado: «los que votaron sí», sin decir quiénes.
      const on = i / (n - 1) > 0.42 && i / (n - 1) < 0.85 + ri * 0.03;
      dots.push({ x: 48 + r * Math.cos(a), y: 50 - r * Math.sin(a), on });
    }
  });
  return (
    <>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x.toFixed(2)}
          cy={d.y.toFixed(2)}
          r="2.6"
          className={d.on ? "fill-primary" : "fill-foreground/25"}
        />
      ))}
      <rect x="40" y="50" width="16" height="7" rx="2" className={`fill-card ${LINE}`} strokeWidth="1.8" />
      <path d="M13 58h70" className="stroke-foreground/30" strokeWidth="2" />
    </>
  );
}

/** Lo que dijeron: un recorte de prensa y un bocadillo con la cita. */
function Hemeroteca() {
  return (
    <>
      <rect x="18" y="12" width="40" height="44" rx="3" className={`fill-card ${LINE}`} strokeWidth="2" transform="rotate(-6 38 34)" />
      <g transform="rotate(-6 38 34)">
        <rect x="23" y="18" width="30" height="7" rx="1.5" className="fill-foreground/20" />
        <path d="M23 31h13M23 37h13M23 43h13M40 31h13M40 37h13M40 43h9" className="stroke-foreground/30" strokeWidth="2" />
      </g>
      <path
        d="M52 14h28a5 5 0 0 1 5 5v15a5 5 0 0 1-5 5H64l-7 7v-7h-5a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5z"
        className="fill-primary/15 stroke-primary"
        strokeWidth="2"
      />
      <path d="M55 22h21M55 28h14" className="stroke-primary" strokeWidth="2" />
      <path d="M59 45h4" className="stroke-primary/60" strokeWidth="2" />
    </>
  );
}
