/**
 * La «L» con ojos: el personaje de los Reels de Instagram (social/), traído a
 * la web. Es decorativo (aria-hidden). Parpadea y respira solo si el usuario
 * no ha pedido reducir el movimiento (clases `mascot-*` en globals.css).
 *
 * - `peek`: asomado, para ponerlo sobre el borde de una tarjeta o junto a un titular.
 * - `point`: de pie, señalando hacia arriba a la izquierda.
 */
export function Mascot({
  pose = "peek",
  look = "down",
  className = "",
}: {
  pose?: "peek" | "point";
  look?: "down" | "left" | "right";
  className?: string;
}) {
  const ink = "hsl(var(--ink))";
  const paper = "hsl(var(--paper))";
  const teal = "hsl(var(--primary))";
  const dx = look === "left" ? -10 : look === "right" ? 10 : 0;
  const dy = look === "down" ? 12 : 4;

  if (pose === "point") {
    return (
      <svg aria-hidden="true" viewBox="0 0 230 300" className={`mascot-bob ${className}`}>
        <rect x="40" y="40" width="150" height="150" rx="10" fill={ink} />
        <path d="M90 72 v80 h55" stroke={teal} strokeWidth="24" fill="none" />
        <circle cx="85" cy="42" r="28" fill={paper} stroke={ink} strokeWidth="7" />
        <circle cx="148" cy="42" r="28" fill={paper} stroke={ink} strokeWidth="7" />
        <g className="mascot-blink">
          <circle cx="79" cy="31" r="11" fill={ink} />
          <circle cx="142" cy="31" r="11" fill={ink} />
        </g>
        <path d="M40 100 L4 34" stroke={ink} strokeWidth="14" strokeLinecap="round" />
        <path d="M190 120 L225 160" stroke={ink} strokeWidth="14" strokeLinecap="round" />
        <path d="M85 190 v70 h-24 M145 190 v70 h24" stroke={ink} strokeWidth="15" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 230 210" className={`mascot-bob ${className}`}>
      <rect x="30" y="50" width="170" height="160" rx="10" fill={ink} />
      <path d="M85 85 v80 h60" stroke={teal} strokeWidth="26" fill="none" />
      <circle cx="80" cy="55" r="32" fill={paper} stroke={ink} strokeWidth="7" />
      <circle cx="150" cy="55" r="32" fill={paper} stroke={ink} strokeWidth="7" />
      <g className="mascot-blink">
        <circle cx={80 + dx} cy={55 + dy} r="12" fill={ink} />
        <circle cx={150 + dx} cy={55 + dy} r="12" fill={ink} />
      </g>
      <path d="M30 150 q-20 10 -10 40 M200 150 q20 10 10 40" stroke={ink} strokeWidth="14" fill="none" strokeLinecap="round" />
    </svg>
  );
}
