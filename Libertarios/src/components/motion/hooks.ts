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

/**
 * ¿Se puede animar la entrada de esto, ahora mismo?
 *
 * Falso en el servidor y en el primer pintado, así que el HTML sale con el
 * contenido en su estado final y las clases de animación se añaden después, en
 * un efecto de layout —antes de pintar, sin parpadeo—.
 *
 * Esto importa mucho más de lo que parece con `animation-fill-mode: backwards`.
 * Ese modo aplica el primer fotograma durante el retardo, y si la línea de
 * tiempo del documento no avanza —la pestaña está en segundo plano o la ventana
 * tapada— el elemento se queda en ese fotograma indefinidamente. Probándolo, el
 * cuadrante entero se quedó en blanco: dieciséis puntos en `opacity: 0` y la
 * animación en «running» sin avanzar un solo milisegundo. Si no vamos a animar,
 * no se pone la clase, y lo que queda es el gráfico completo.
 */
export function useAnimateOnMount(): boolean {
  const [ok, setOk] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (document.visibilityState !== "visible") return;
    setOk(true);

    // Y si la pestaña se va a segundo plano a media animación, se desarma: el
    // reloj se congelaría donde esté y volver dejaría los puntos a medio
    // aparecer. Sin la clase, lo que queda es el estado final. No se reanuda al
    // volver a propósito —repetir la entrada cada vez que cambias de pestaña
    // sería peor que no tenerla—.
    const onHide = () => {
      if (document.visibilityState !== "visible") setOk(false);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  return ok;
}
