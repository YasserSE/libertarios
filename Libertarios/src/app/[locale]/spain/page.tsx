import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Libertarios.eu — El mapa libertario de España",
  description:
    "Mapa interactivo de simpatizantes libertarios en España, provincia a provincia. Datos agregados y anónimos.",
  alternates: { canonical: "/spain" },
};

/**
 * The home page pre-filtered to Spain.
 *
 * Same component as `/`, only the map scope differs — so this URL is a
 * shareable deep link into the Spanish view rather than a separate page to
 * keep in sync.
 */
export default function SpainPage() {
  return <HomePage scope="ES" />;
}
