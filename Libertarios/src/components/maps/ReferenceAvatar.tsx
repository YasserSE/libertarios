import type { ReferencePoint } from "@/data/quadrantReferences";

/**
 * Identidad visual de un punto de referencia.
 *
 * Tres casos, por orden de preferencia:
 *   1. `image` — el logotipo o la ilustración real, si se ha aportado.
 *   2. `emoji` — la bandera, para países.
 *   3. `initials` + `color` — un distintivo con el color de marca.
 *
 * El caso 3 es el que se ve hoy en partidos y pensadores: los logotipos de
 * partido son marcas registradas y los retratos tienen autor, así que el
 * proyecto no puede incluirlos sin licencia. En cuanto se coloque el fichero en
 * `public/referencias/` y se rellene `image`, aparece aquí sin tocar nada más.
 * Ver `docs/REFERENCIAS.md`.
 */
export function ReferenceAvatar({
  point,
  size = 28,
  className = "",
}: {
  point: ReferencePoint;
  size?: number;
  className?: string;
}) {
  const style = { width: size, height: size };

  if (point.image) {
    return (
      <img
        src={point.image}
        alt=""
        aria-hidden
        style={style}
        className={`shrink-0 rounded-full object-cover ring-1 ring-border ${className}`}
      />
    );
  }

  if (point.emoji) {
    return (
      <span
        style={{ ...style, fontSize: size * 0.62 }}
        aria-hidden
        className={`flex shrink-0 items-center justify-center rounded-full bg-muted leading-none ring-1 ring-border ${className}`}
      >
        {point.emoji}
      </span>
    );
  }

  const background = point.color ?? "hsl(var(--muted))";
  return (
    <span
      style={{
        ...style,
        background,
        fontSize: size * 0.36,
        // Los colores de marca van del amarillo del FDP al negro de la CDU, así
        // que el texto se elige por luminancia en lugar de fijarlo a blanco.
        color: readableInk(point.color),
      }}
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold leading-none ring-1 ring-border ${className}`}
    >
      {point.initials ?? point.short.slice(0, 2)}
    </span>
  );
}

/** Negro o blanco según cuál contraste más con el fondo. */
function readableInk(hex?: string): string {
  if (!hex) return "hsl(var(--muted-foreground))";
  const v = hex.replace("#", "");
  if (v.length !== 6) return "#fff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.45 ? "#101418" : "#ffffff";
}
