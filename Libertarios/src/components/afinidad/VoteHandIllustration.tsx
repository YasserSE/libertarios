import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Ilustración de la portada de «¿A quién votar?»: una mano deja una papeleta
 * en una urna transparente.
 *
 * - Decorativa (`aria-hidden`, sin título): el texto de al lado ya lo dice todo.
 * - Solo tokens del sitio (`primary`, `card`, `foreground`, `border`) con las
 *   utilidades `fill-*`/`stroke-*`, así que se adapta sola al modo oscuro.
 * - Neutral: ni logotipos ni colores de partido. La papeleta lleva casillas y
 *   rayas, nada legible.
 * - Movimiento suave (la papeleta baja hacia la ranura y la ranura brilla) en
 *   `globals.css`, dentro de `prefers-reduced-motion: no-preference`; además
 *   `motion-reduce:animate-none`. Sin animación, lo que queda es el fotograma
 *   final: la papeleta ya entrando en la urna.
 *
 * La papeleta se recorta en la línea de la ranura con un `clipPath` aplicado
 * a un grupo QUIETO que envuelve al grupo animado: si el recorte estuviera en
 * el grupo que se mueve, se movería con él y la papeleta nunca «entraría».
 */
export function VoteHandIllustration({ className }: { className?: string }) {
  const clipId = `vote-slot-clip-${useId().replace(/:/g, "")}`;
  const motion = "motion-reduce:animate-none";

  // Geometría de la urna (cubo en perspectiva caballera).
  // Cara frontal 60..220 × 150..270; profundidad (+40, −24).
  const top = "60,150 220,150 260,126 100,126";
  const side = "220,150 260,126 260,246 220,270";
  const slot = "124,140.5 188,140.5 194,136.5 130,136.5";

  return (
    <svg
      viewBox="0 -44 320 344"
      aria-hidden="true"
      focusable="false"
      data-testid="vote-hand-illustration"
      className={cn("vote-hand-illustration block h-auto w-full", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          {/* Todo lo que queda por encima de la ranura. */}
          <rect x="0" y="-60" width="320" height="199" />
        </clipPath>
        {/* La manga se desvanece hacia arriba: el brazo «entra» en escena sin
            un corte recto. Coordenadas locales de la mano (eje −y = brazo). */}
        <linearGradient id={`${clipId}-fade`} gradientUnits="userSpaceOnUse" x1="0" y1="-112" x2="0" y2="-80">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <mask id={`${clipId}-sleeve`} maskUnits="userSpaceOnUse" x="-80" y="-200" width="160" height="220">
          <rect x="-80" y="-200" width="160" height="220" fill={`url(#${clipId}-fade)`} />
        </mask>
        <linearGradient id={`${clipId}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.16" />
          <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Fondo: círculo suave y destellos. */}
      <circle cx="166" cy="164" r="128" className="fill-primary/10" />
      <circle cx="166" cy="164" r="98" className="fill-primary/5" />
      <g className="stroke-primary/50" strokeWidth="2.5">
        <path d="M44 92v12M38 98h12" />
        <path d="M276 70v10M271 75h10" />
        <path d="M284 196v8M280 200h8" />
      </g>
      <circle cx="58" cy="208" r="3" className="fill-primary/40" />
      <circle cx="252" cy="44" r="2.5" className="fill-primary/40" />

      {/* Sombra en el suelo. */}
      <ellipse cx="164" cy="276" rx="118" ry="9" className="fill-foreground/10" />

      {/* Aristas traseras (se ven a través del cristal). */}
      <g className="stroke-primary/30" strokeWidth="2" strokeDasharray="4 5">
        <path d="M100 126V246" />
        <path d="M100 246H260" />
        <path d="M60 270L100 246" />
      </g>

      {/* Papeletas ya votadas en el fondo de la urna. */}
      <g className="fill-card stroke-foreground/40" strokeWidth="1.5">
        <g transform="rotate(-9 104 250)">
          <rect x="80" y="238" width="48" height="24" rx="3" />
          <path d="M88 246h12M88 252h20" />
        </g>
        <g transform="rotate(11 160 244)">
          <rect x="136" y="232" width="50" height="26" rx="3" />
          <path d="M144 240h14M144 247h24" />
        </g>
        <g transform="rotate(-4 196 252)">
          <rect x="176" y="244" width="40" height="20" rx="3" />
          <path d="M183 251h10M183 256h18" />
        </g>
      </g>

      {/* Cara lateral y frontal de cristal. */}
      <polygon points={side} className="fill-primary/20 stroke-primary" strokeWidth="2.5" />
      <rect x="60" y="150" width="160" height="120" rx="3" fill={`url(#${clipId}-glass)`} className="stroke-primary" strokeWidth="2.5" />

      {/* Reflejos del cristal. */}
      <g className="stroke-white/70 dark:stroke-white/25">
        <path d="M76 166v52" strokeWidth="5" />
        <path d="M89 166v18" strokeWidth="3.5" />
        <path d="M236 152l14-8" strokeWidth="3" />
      </g>

      {/* Tapa con la ranura y su brillo. */}
      <polygon points={top} className="fill-card stroke-primary" strokeWidth="2.5" />
      <ellipse
        cx="159"
        cy="138.5"
        rx="46"
        ry="9"
        className={cn("vote-slot-glow fill-primary/30", motion)}
      />
      <polygon points={slot} className="fill-foreground/80" />

      {/* Dedos por detrás de la papeleta y la papeleta, recortados en la ranura. */}
      <g clipPath={`url(#${clipId})`}>
        <g className={cn("vote-ballot-drop", motion)}>
          <g transform="translate(174 64) rotate(28)" className="fill-card stroke-foreground/80" strokeWidth="2.5">
            <rect x="-2" y="-22" width="13" height="30" rx="6.5" />
            <rect x="9" y="-24" width="12" height="28" rx="6" />
          </g>

          {/* La papeleta: casillas y rayas, nada legible. */}
          <g>
            <rect x="132" y="62" width="56" height="84" rx="4" className="fill-card stroke-foreground/80" strokeWidth="2.5" />
            <rect x="141" y="74" width="11" height="11" rx="2" className="stroke-primary" strokeWidth="2" />
            <path d="M143.5 79.5l2.6 2.6 5-5.6" className="stroke-primary" strokeWidth="2.4" />
            <path d="M158 77h20M158 82h13" className="stroke-foreground/35" strokeWidth="2" />
            <rect x="141" y="94" width="11" height="11" rx="2" className="stroke-foreground/40" strokeWidth="2" />
            <path d="M158 97h20M158 102h11" className="stroke-foreground/35" strokeWidth="2" />
            <rect x="141" y="114" width="11" height="11" rx="2" className="stroke-foreground/40" strokeWidth="2" />
            <path d="M158 117h20M158 122h15" className="stroke-foreground/35" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* Manga, palma y pulgar, por delante de la papeleta. */}
      <g className={cn("vote-ballot-drop", motion)}>
        <g transform="translate(174 64) rotate(28)" strokeWidth="2.5">
          <rect x="-26" y="-140" width="52" height="84" rx="8" mask={`url(#${clipId}-sleeve)`} className="fill-primary stroke-foreground/80" />
          <rect x="-28" y="-64" width="56" height="13" rx="5" className="fill-accent stroke-foreground/80" />
          <path
            d="M-21 -52h40c3 0 5 2 5 5v20c0 9-7 15-16 15h-14c-9 0-17-7-17-16v-19c0-3 1-5 2-5z"
            className="fill-card stroke-foreground/80"
          />
          {/* Pulgar delante de la papeleta. */}
          <rect x="-15" y="-26" width="13" height="32" rx="6.5" transform="rotate(-14 -8 -10)" className="fill-card stroke-foreground/80" />
        </g>
      </g>
    </svg>
  );
}
