import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getEuropeSnapshot } from "@/lib/affiliates/repository";

export const metadata: Metadata = {
  title: "Libertarios.eu — El mapa libertario de Europa",
  description:
    "Mapa interactivo de simpatizantes libertarios en Europa. Datos agregados y anónimos, país a país.",
};

export default async function Page() {
  // Se toca el agregado aquí para que la página se prerrenderice con las cifras.
  await getEuropeSnapshot();
  return <HomePage scope="europe" />;
}
