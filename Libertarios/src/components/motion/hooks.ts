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
/** ¿Está el elemento dentro del alto visible, con un margen de cortesía? */
function intersectsViewport(node: Element, margin: number): boolean {
  const rect = node.getBoundingClientRect();
  const h = window.innerHeight || 0;
  return rect.top < h * (1 - margin) && rect.bottom > h * margin;
}

export function useInView<T extends Element>(
  margin = 0.1,
  threshold = 0.15,
  /**
   * Resolver el estado inicial antes de pintar.
   *
   * Lo necesita quien esconde el contenido para animarlo: sin esto se pinta un
   * fotograma con el elemento en su sitio, y al instante siguiente desaparece
   * para entrar de nuevo. Es un efecto aparte y no el efecto principal a
   * propósito: si `useInView` entero pasara a ser de layout, en `Reveal` se
   * resolvería `inView` antes que el armado y esos bloques dejarían de animarse
   * del todo.
   */
  immediate = false,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!immediate || inView) return;
    const node = ref.current;
    if (node && intersectsViewport(node, margin)) setInView(true);
  }, [immediate, inView, margin]);

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

    const check = () => {
      if (intersectsViewport(node, margin)) reveal();
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => entry.isIntersecting && reveal(), {
            rootMargin: `${-margin * 100}% 0px`,
            threshold,
          });

    function cleanup() {
      observer?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("visibilitychange", check);
    }

    if (intersectsViewport(node, margin)) {
      setInView(true);
      return;
    }
    observer?.observe(node);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    document.addEventListener("visibilitychange", check);
    return cleanup;
  }, [inView, margin, threshold]);

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
 * Dos condiciones, y las dos importan por motivos distintos.
 *
 * **Que se esté viendo.** Una animación de entrada solo tiene sentido si la
 * presencia el usuario. Atada al montaje, un cuadrante que vive a media página
 * se animaba mientras el lector estaba arriba del todo, y para cuando llegaba
 * ya había terminado: todo el trabajo, ninguno del efecto. Se arma cuando la
 * sección asoma por el borde inferior —el primer píxel, todavía fuera de la
 * vista— así que el movimiento ocurre justo mientras entra.
 *
 * **Que la pestaña esté visible.** Esto no es estética, es corrección. Con
 * `animation-fill-mode: backwards` el navegador aplica el primer fotograma
 * durante el retardo, y si la línea de tiempo del documento no avanza el
 * elemento se queda ahí indefinidamente. Probándolo con la pestaña en segundo
 * plano el cuadrante entero se quedó en blanco: dieciséis puntos en opacidad 0,
 * la animación en «running» y el reloj clavado en 0 ms. Por eso las clases se
 * añaden desde aquí y no en el marcado: si no vamos a animar, no se ponen, y lo
 * que queda es el gráfico completo. El HTML del servidor sale siempre entero.
 */
export function useAnimateInView<T extends Element>(entryWindowMs = 2200) {
  const { ref, inView } = useInView<T>(0, 0, true);
  const [visible, setVisible] = useState(false);
  const [entryOver, setEntryOver] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    // Si la pestaña se va a segundo plano a media animación, el reloj se
    // congela donde esté y volver dejaría los puntos a medio aparecer. Quitando
    // la clase queda el estado final. No se reanuda a propósito: repetir la
    // entrada cada vez que cambias de pestaña sería peor que no tenerla.
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  /**
   * La entrada se retira cuando ha terminado, y eso no es limpieza: es lo que
   * impide que se repita sola.
   *
   * Los puntos del cuadrante se reordenan para que el señalado quede encima de
   * los demás, y reordenar hijos de un SVG mueve el nodo en el DOM, lo que
   * reinicia su animación CSS. Con la clase puesta indefinidamente, cada clic y
   * cada paso del ratón volvían a lanzar la entrada de medio cuadrante. Pasada
   * la ventana de entrada la clase desaparece y el gráfico queda inerte.
   */
  const entering = visible && inView && !entryOver;

  useEffect(() => {
    if (!visible || !inView) return;
    const timer = window.setTimeout(() => setEntryOver(true), entryWindowMs);
    return () => window.clearTimeout(timer);
  }, [visible, inView, entryWindowMs]);

  return { ref, entering, animate: visible && inView };
}
