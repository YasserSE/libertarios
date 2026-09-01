"use client";

import type { ElementType, ReactNode } from "react";
import { useEnterAnimation } from "./hooks";

interface RevealProps {
  children: ReactNode;
  /** Retardo en ms, para escalonar una rejilla. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Aparición al entrar en pantalla: sube unos píxeles y se funde.
 *
 * La regla que ordena todo lo demás: **el contenido nunca depende de la
 * animación para verse**. El HTML del servidor sale visible, y solo se esconde
 * en el cliente cuando ya sabemos que vamos a animarlo —en un efecto de layout,
 * antes de pintar, así que no hay parpadeo—. Si el JavaScript no llega, no se
 * ejecuta o el observador no dispara, lo que queda es la página entera, no un
 * hueco en blanco.
 *
 * Con `prefers-reduced-motion` no hay transición ninguna: aparece y ya.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const { ref, armed, settled } = useEnterAnimation<HTMLDivElement>();
  const hidden = !settled;

  return (
    <Tag
      ref={ref}
      className={`${armed ? "transition-[opacity,transform] duration-700 ease-out " : ""}${
        hidden ? "translate-y-4 opacity-0 " : ""
      }${className}`}
      style={armed ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
