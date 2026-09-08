import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

/**
 * Metadatos base de todo el sitio.
 *
 * Hasta aquí no había ninguna etiqueta Open Graph, así que cada enlace
 * compartido —WhatsApp, X, Telegram, Facebook— salía como una URL pelada: sin
 * título, sin descripción y sin imagen. En un proyecto que crece porque la
 * gente comparte su resultado, eso es el agujero más caro que tenía.
 *
 * `metadataBase` es lo que convierte las rutas relativas de imagen en absolutas.
 * Sin él, Next avisa y los rastreadores no resuelven la imagen.
 */
const SITE = "https://www.libertarios.eu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Libertarios.eu — El mapa libertario de España",
    template: "%s",
  },
  description:
    "En España no hay un movimiento libertario organizado: hay personas sueltas que no saben cuántas son. Este mapa las cuenta, provincia a provincia.",
  openGraph: {
    type: "website",
    siteName: "Libertarios.eu",
    locale: "es_ES",
    url: SITE,
    title: "Libertarios.eu — El mapa libertario de España",
    description:
      "En España no hay un movimiento libertario organizado: hay personas sueltas que no saben cuántas son. Este mapa las cuenta, provincia a provincia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Libertarios.eu — El mapa libertario de España",
    description:
      "Sitúate en dos ejes, comprueba qué provocan de verdad las políticas que suenan justas y cuéntate en el mapa.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
