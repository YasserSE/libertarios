import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getEuropeSnapshot } from "@/lib/affiliates/repository";

export const metadata: Metadata = {
  title: "Libertarios.eu — El mapa libertario de Europa",
  description:
    "Mapa interactivo de simpatizantes libertarios en Europa. Datos agregados y anónimos, país a país.",
};

export default function Page() {
  // Touch the snapshot here so the page is statically prerendered with figures.
  getEuropeSnapshot();
  return <HomePage scope="europe" />;
}
