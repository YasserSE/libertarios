import type { Metadata } from "next";
import { RegistroClient } from "./RegistroClient";
import { isRegistrationConfigured } from "@/lib/registration/register";

export const metadata: Metadata = {
  title: "Contarme — Libertarios.eu",
  description:
    "Registra tu posición de forma anónima y agregada. Sin militancia, sin listas públicas y sin correos.",
};

/**
 * Envoltorio de servidor.
 *
 * Comprueba que el alta esté configurada antes de pintar el formulario. Sin
 * esto, alguien podía rellenar cuatro pasos y descubrir en el último que no se
 * puede guardar — que es exactamente lo que hacía la versión anterior, solo que
 * sin avisar nunca.
 */
export default function RegistroPage() {
  return <RegistroClient configured={isRegistrationConfigured()} />;
}
