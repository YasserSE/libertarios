import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getEuropeSnapshot } from "@/lib/affiliates/repository";

export const metadata: Metadata = {
  title: "Libertarios.eu — El mapa libertario de Europa",
  description:
    "Mapa interactivo de simpatizantes libertarios en Europa, país a país. Datos agregados y anónimos.",
  alternates: { canonical: "/europa" },
};

/**
 * La portada con el mapa abierto a toda Europa.
 *
 * Mismo componente que `/`, solo cambia el ámbito del mapa: son dos vistas de
 * la misma página, no dos páginas que haya que mantener en sincronía.
 */
export default async function EuropaPage() {
  // Se toca el agregado aquí para que la página se prerrenderice con las cifras.
  await getEuropeSnapshot();
  return <HomePage scope="europe" />;
}
