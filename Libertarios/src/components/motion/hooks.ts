"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** `useLayoutEffect` avisa en SSR; en servidor no hay layout que medir. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ¿El sistema pide menos movimiento?
 *
 * No es un detalle opcional: los números que corren y los bloques que se
 * desplazan provocan mareo real a quien tiene trastornos vestibulares. Con esta
 * preferencia activada todo aparece ya en su sitio, sin transición.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true); // Por defecto, lo prudente.

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * ¿El elemento ha entrado en pantalla alguna vez?
 *
 * Una sola vez: si se reanimara cada vez que vuelve a entrar, bajar y subir la
 * página convertiría el sitio en una feria.
 *
 * Lleva una red de seguridad deliberada. Con solo un IntersectionObserver, si
 * este no llega a disparar —Chrome lo frena en pestañas en segundo plano, y así
 * pasó al probarlo— el bloque se queda en `opacity: 0` para siempre: la cifra
 * desaparece de la página. Una animación puede fallar; el contenido no. Por eso
 * además se comprueba la geometría a mano al montar, al hacer scroll y al
 * volver a la pestaña.
 */
export function useInView<T extends Element>(margin = 0.1) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
      cleanup();
    };

    /** ¿Está ya dentro del alto visible, con un margen de cortesía? */
    const visibleNow = () => {
      const rect = node.getBoundingClientRect();
      const h = window.innerHeight || 0;
      return rect.top < h * (1 - margin) && rect.bottom > h * margin;
    };
    const check = () => {
      if (visibleNow()) reveal();
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => entry.isIntersecting && reveal(), {
            rootMargin: `${-margin * 100}% 0px`,
            threshold: 0.15,
          });

    function cleanup() {
      observer?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("visibilitychange", check);
    }

    if (visibleNow()) {
      setInView(true);
      return;
    }
    observer?.observe(node);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    document.addEventListener("visibilitychange", check);
    return cleanup;
  }, [inView, margin]);

  return { ref, inView };
}

/**
 * El estado de una animación de entrada, en un solo sitio.
 *
 * Devuelve `settled`: **falso solo mientras la animación está pendiente**, y
 * verdadero en todos los demás casos —movimiento reducido, pestaña en segundo
 * plano, sin JavaScript, observador que no dispara—. Los componentes pintan el
 * estado final cuando es verdadero, así que ninguna de esas situaciones puede
 * dejar una cifra a cero o un bloque transparente.
 *
 * Lo de la pestaña no es teórico: al probarlo en segundo plano Chrome congeló
 * `requestAnimationFrame` a mitad de la cuenta y frenó el observador. Animar
 * algo que nadie está mirando no aporta nada y sí puede romperse, así que si la
 * pestaña no está visible al montar, no se anima.
 */
export function useEnterAnimation<T extends Element>() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<T>();
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    setArmed(true);
  }, [reduced]);

  return { ref, armed, settled: !armed || inView };
}
