/**
 * URL pública del sitio.
 *
 * Es la base de todas las URL absolutas de los metadatos (`metadataBase`,
 * `og:image`, `canonical`, JSON-LD). Los rastreadores de WhatsApp, X o
 * Telegram no resuelven rutas relativas, y una vista previa que apunta a
 * `localhost` no se ve en ningún sitio: por eso nunca se toma del `Host` de la
 * petición, sino de aquí.
 *
 * `NEXT_PUBLIC_SITE_URL` permite apuntar a otro dominio (un despliegue de
 * prueba); sin ella, el dominio de producción.
 */
const FALLBACK = "https://www.libertarios.eu";

function normalise(raw: string | undefined): string {
  if (!raw) return FALLBACK;
  try {
    const url = new URL(raw.trim());
    return url.origin;
  } catch {
    return FALLBACK;
  }
}

export const SITE_URL = normalise(process.env.NEXT_PUBLIC_SITE_URL);

/** URL absoluta a partir de una ruta del sitio (`/es/a-quien-votar`). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
