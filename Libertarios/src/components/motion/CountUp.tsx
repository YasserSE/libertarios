"use client";

import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "./hooks";

interface CountUpProps {
  value: number;
  /**
   * El formato se describe con datos, no con una función.
   *
   * Estos contadores se usan dentro de componentes de servidor, y una función
   * no cruza esa frontera: React no puede serializarla. Con prefijo y sufijo
   * se cubre todo lo que necesitamos —«+1.204», «49 %»— sin ese problema.
   */
  prefix?: string;
  suffix?: string;
  /** Separador de miles según la lengua activa. */
  locale?: string;
  durationMs?: number;
  className?: string;
}

/** Desaceleración: rápido al principio, se posa al final. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Un número que sube hasta su valor al entrar en pantalla.
 *
 * Tres decisiones que vienen de haberlo hecho mal primero:
 *
 * 1. **Solo se anima lo que ya está en pantalla al cargar.** La versión con
 *    observador dejaba a 0 los contadores que caían unos píxeles por debajo del
 *    pliegue: la etiqueta ya se veía y el dato de al lado decía cero. Lo que no
 *    entra de salida sale con su cifra puesta, y punto.
 * 2. **El HTML del servidor ya trae la cifra final.** Sin JavaScript, o para un
 *    buscador, el dato está. La puesta a cero ocurre antes de pintar, así que
 *    no se ve el salto. Y hay un tope de reloj por si `requestAnimationFrame`
 *    no llega a correr: pasado el tiempo de la animación, la cifra final va sí
 *    o sí. Una animación puede fallar; el dato no.
 * 3. **El lector de pantalla oye el valor una sola vez.** Si se leyera el texto
 *    animado, anunciaría cuarenta números seguidos.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  locale = "es-ES",
  durationMs = 900,
  className,
}: CountUpProps) {
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;

  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [running, setRunning] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduced || value === 0) return;
    // Animar algo que nadie está mirando no aporta nada y sí puede romperse:
    // el navegador congela `requestAnimationFrame` en pestañas de fondo.
    if (document.visibilityState !== "visible") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.top > window.innerHeight * 0.9) return;

    setDisplay(0);
    setRunning(true);
  }, [reduced]);

  useEffect(() => {
    if (!running) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(value * easeOut(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const backstop = window.setTimeout(() => setDisplay(value), durationMs + 400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(backstop);
    };
  }, [running, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{format(display)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
