import type { Metadata } from "next";
import { MiResultadoClient } from "./MiResultadoClient";

export const metadata: Metadata = {
  title: "Mi resultado — Libertarios.eu",
  description: "Vuelve a ver la posición que guardaste al hacer el test.",
  // Un enlace personal no tiene por qué acabar en un buscador.
  robots: { index: false, follow: false },
};

export default function MiResultadoPage() {
  return <MiResultadoClient />;
}
